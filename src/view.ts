import {ModularInstance} from './instance';
import {ComponentOptions, View} from './interfaces/view.interface';
import {ModularSchema} from './schema';
import {get} from './utils/json-pointer.util';

export interface ViewRow<Options, Fields extends keyof Options> {
  align?: 'start' | 'center' | 'end';
  container?: string;
  id?: string;
  classes?: string[];
  items: View<Options, Fields>[];
}

type Events = 'change';

export class ModularView<Options = ComponentOptions, Fields extends keyof Options = keyof Options> {

  public elements: Array<{
    key?: string;
    element: HTMLElement;
    options?: any;
    optionsCalled: boolean;
  }> = [];
  public componentPrefix: string;

  private _schema: ModularSchema;
  private readonly _views: ViewRow<Options, Fields>[];

  constructor(
    configuration: {
      componentPrefix?: string;
      schema: ModularSchema;
      views: ViewRow<Options, Fields>[];
    }
  ) {
    this.componentPrefix = (configuration.hasOwnProperty('componentPrefix') ? configuration.componentPrefix : 'modular-') as string;
    this._schema = configuration.schema;
    this._views = configuration.views;
  }

  public setOptions() {
    this.elements.forEach(el => {
      if (!el.optionsCalled) {
        // @ts-ignore
        el.element?.setOptions?.(el.options);
      }
    })
  }

  public render(options: {
    parentElement: HTMLElement,
    instance: ModularInstance,
    container?: string
  }) {
    const {parentElement, instance} = options;
    
    this.elements = [];

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';

    const _eventCallbacks: Array<{event: string, callback: (value?: any) => void}> = [];
    const _hiddenChecks: {
      [key: string]: Array<{
        element: HTMLElement;
        check: (value?: any) => boolean;
      }>
    } = {};

    const addEventListener = (event: Events, callback: (value?: any) => void) => {
      _eventCallbacks.push({event, callback});
    };

    const removeEventListener = (event: Events, callback: (value?: any) => void) => {
      const index = _eventCallbacks.findIndex(it => it.event === event && callback === callback);

      if (index !== -1) {
        _eventCallbacks.splice(index, 1);
      }
    };

    const getValue = async () => {
      const values = await Promise.all(
        this.elements
          .filter(e => e.key)
          .map(e => (e.element as any).getValue())
      );

      instance.value = values.reduce((acc, cur, index) => {
        const el = this.elements[index];
        if (el.key) {
          acc[el.key] = cur;
        }
        return acc
      }, instance.value);

      return instance.value;
    };

    const setValue = (value: any) => {
      for (const element of this.elements) {
        if (!element.key) {
          continue;
        }

        const valueForField = get(value, '/' + element.key);
        const el = element.element as any;

        if (el.setValue) {
          el.setValue(valueForField);
        }
      }
    };

    const dispatchEvents = async (event: Events) => {
      const value = await getValue();
      _eventCallbacks.forEach(e => {
        if (e.event === event) {
          e.callback(value);
        }
      })
    }

    const save = async (id?: string) => {
      await Promise.all(
        this.elements
          .filter(e => e.key)
          .map(async (e: any) => {
            (e.element.save && await e.element.save(id))
          })
      );
    }

    const r = {
      getValue,
      addEventListener,
      save,
      removeEventListener,
      destroy: () => container.remove(),
      setValue,
    };

    for (const row of this._views) {

      const rowContainer = document.createElement(row.container || 'div');
      rowContainer.style.display = 'flex';
      rowContainer.style.flexWrap = 'wrap';
      rowContainer.style.width = '100%';

      if (row.id) {
        rowContainer.id = row.id;
      }

      if (row.classes) {
        rowContainer.classList.add(...row.classes);
      }

      for (const view of row.items) {
        const element = document.createElement(this.componentPrefix + (view.component as string));

        if (!view.columns) {
          element.classList.add(`modular-util-col-12`);
        } else if (typeof view.columns === 'number') {
          element.classList.add(`modular-util-col-${view.columns}`);
        } else {
          if (view.columns?.desktop) {
            element.classList.add(`modular-util-col-${view.columns.desktop}`);
          }

          if (view.columns?.tablet) {
            element.classList.add(`modular-util-col-m-${view.columns.tablet}`);
          }
 
          if (view.columns?.mobile) {
            element.classList.add(`modular-util-col-s-${view.columns.mobile}`);
          }
        }

        if (view.hidden) {

          view.hidden.deps.forEach(dep => {
            if (!_hiddenChecks[dep]) {
              _hiddenChecks[dep] = [];
            }

            _hiddenChecks[dep].push({element, check: view.hidden!.check});
          });

          if (!view.hidden.check(instance.value)) {
            element.style.display = 'none';
          }
        }

        element.style.padding = '0.5rem';
        element.style.boxSizing = 'border-box';
        element.addEventListener('value', async () => {
          const value = await getValue();
          if (view.field && _hiddenChecks[view.field]?.length) {
            _hiddenChecks[view.field].forEach(({element, check}) =>
              element.style.display = check(value) ? 'block' : 'none'
            );
          }

          dispatchEvents('change');
        });
        
        let el = element as any;
        let optionsCalled = false;

        if (el.setOptions) {
          el.setOptions?.(view.options);
          optionsCalled = true;
        }
        
        /**
         * If the element doesn't have a "setOptions" method
         * we make the assumption that all of the options should
         * be assigned to the element directly
         */
        else if (view.options) {
          for (const key in view.options) {
            // @ts-ignore
            el[key] = view.options[key];
          }
        }

        if (view.field) {

          const entryValue = get(instance.value, view.field);

          if (el.setValue) {
            el.setValue(entryValue);
          }
          
          /**
           * If the element doesn't have a "setValue" method we again
           * assume it should be assigned to the element directly
           */
          else {
            el.value = entryValue;
          }
        }

        el.setInstance?.(instance);

        el.setRender?.(r);

        this.elements.push({
          ...view.field && {key: view.field.replace(/^\//, '')},
          options: view.options,
          optionsCalled,
          element
        });

        rowContainer.appendChild(element);
      }

      container.appendChild(rowContainer);
    }

    parentElement.appendChild(container);

    // todo: return cleanup function
    return r;
  }
}
