import {ModularInstance} from './instance';
import {ComponentOptions, View} from './interfaces/view.interface';
import {ModularSchema} from './schema';
import {get} from './utils/json-pointer.util';
import {mergeDeep} from './utils/merge-deep';

export interface ViewRow<Options, Fields extends keyof Options> {
  align?: 'start' | 'center' | 'end';
  container?: string;
  id?: string;
  classes?: string[];
  items: View<Options, Fields>[];
}

export interface ModuleRender {
  getValue: (elements?: ModuleViewElement[]) => Promise<any>;
  addEventListener: (event: Events, callback: (value?: any) => void) => void;
  save: (id?: string, elements?: ModuleViewElement[]) => Promise<void>;
  removeEventListener: (event: Events, callback: (value?: any) => void) => void;
  destroy: () => void;
  setValue: (value: any) => void;
  validity: {[key: string]: boolean};
  isValid: () => boolean;
}

export interface ModuleViewElement {
  key?: string;
  element: HTMLElement;
  options?: any;
  optionsCalled: boolean;
  save?: (id: any) => Promise<void>;
  getValue?: () => any;
};

type Events = 'change';

export class ModularView<Options = ComponentOptions, Fields extends keyof Options = keyof Options> {

  public elements: ModuleViewElement[] = [];
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
  }): ModuleRender {
    const {parentElement, instance} = options;
    
    this.elements = [];

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';

    const _eventCallbacks: Array<{event: string, callback: (value?: any, elements?: ModuleViewElement[]) => void}> = [];
    const _hiddenChecks: {
      [key: string]: Array<{
        element: HTMLElement;
        check: (value?: any) => boolean;
      }>
    } = {};

    const addEventListener = (event: Events, callback: (value?: any, elements?: ModuleViewElement[]) => void) => {
      _eventCallbacks.push({event, callback});
    };

    const removeEventListener = (event: Events, callback: (value?: any) => void) => {
      const index = _eventCallbacks.findIndex(it => it.event === event && callback === callback);

      if (index !== -1) {
        _eventCallbacks.splice(index, 1);
      }
    };

    const getValue = async (elements: ModuleViewElement[] = this.elements) => {

      const els = elements.filter(e => e.key);

      const values = await Promise.all(
        els
          .map(e => e?.getValue!())
      );

      const result: any = {};

      for (let i = 0; i < values.length; i++) {
        const el = els[i];
        const value = values[i];

        if (el.key) {
          const keys = el.key.split('/');
        
          keys.reduce(
            (r: any, e, j) =>
              r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? value : {}) : []),
            result
          );
        }
      }

      return mergeDeep(instance.value, result);
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
        } else {
          el.value = valueForField;
        }
      }
    };

    const dispatchEvents = async (event: Events) => {
      const value = await getValue();
      _eventCallbacks.forEach(e => {
        if (e.event === event) {
          e.callback(value, this.elements);
        }
      })
    }

    const save = async (
      id?: string,
      elements: ModuleViewElement[] = this.elements
    ) => {
      await Promise.all(
        elements
          .filter(e => e.key)
          .map((e) => (e.save && e.save(id)))
      );
    }

    const validity: {[key: string]: boolean} = {};

    const isValid = () => {
      for (const key in validity) {
        if (!validity[key]) {
          return false;
        }
      }

      return true;
    }

    const r: ModuleRender = {
      getValue,
      addEventListener,
      save,
      removeEventListener,
      destroy: () => container.remove(),
      setValue,
      validity,
      isValid,
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
        const key = view.field ? view.field.replace(/^\//, '') : undefined;

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

          if (key) {
            if (_hiddenChecks[view.field]?.length) {
              _hiddenChecks[view.field].forEach(({element, check}) =>
                element.style.display = check(value) ? 'block' : 'none'
              );
            }
  
            validity[key] = (element as HTMLInputElement).checkValidity ? (element as HTMLInputElement).checkValidity() : true;
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
          ...key && {key},
          options: view.options,
          optionsCalled,
          element
        });

        rowContainer.appendChild(element);
      }

      container.appendChild(rowContainer);
    }

    parentElement.appendChild(container);

    setTimeout(() => {
      this.elements.forEach((e: any) => {
        if (e.element.save) {
          e.save = e.element.save;
        }

        if (e.element.getValue) {
          e.getValue = e.element.getValue;
        }

        if (e.element.checkValidity) {
          validity[e.key] = e.element.checkValidity();
        }
      });
    });

    // todo: return cleanup function
    return r;
  }
}
