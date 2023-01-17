import {ModularInstance} from './instance';
import {ComponentOptions, View} from './interfaces/view.interface';
import {ModularSchema} from './schema';
import {get} from './utils/json-pointer.util';

interface ViewRow<Options, Fields extends keyof Options> {
  align?: 'start' | 'center' | 'end';
  container?: string;
  items: View<Options, Fields>[];
}

type Events = 'change';

export class ModularView<Options = ComponentOptions, Fields extends keyof Options = keyof Options> {

  public elements: Array<{
    key: string;
    element: HTMLElement;
    options?: any;
    optionsCalled: boolean;
  }> = [];

  private _schema: ModularSchema;
  private readonly _views: ViewRow<Options, Fields>[];

  constructor(
    configuration: {
      schema: ModularSchema;
      views: ViewRow<Options, Fields>[];
    }
  ) {
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
        this.elements.map(e => (e.element as any).getValue())
      );

      return values.reduce((acc, cur, index) => {
        acc[this.elements[index].key] = cur;
        return acc
      }, {});
    };

    const dispatchEvents = async (event: Events) => {
      const value = await getValue();
      _eventCallbacks.forEach(e => {
        if (e.event === event) {
          e.callback(value);
        }
      })
    }

    const r = {
      getValue,
      addEventListener,
      removeEventListener,
      destroy: () => {
        container.remove();
      }
    };

    for (const row of this._views) {

      const rowContainer = document.createElement(row.container || 'div');
      rowContainer.style.display = 'flex';
      rowContainer.style.flexWrap = 'wrap';
      rowContainer.style.width = '100%';

      for (const view of row.items) {
        const element = document.createElement(`modular-${view.component as string}`);

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

        element.style.padding = '0.5rem';
        element.style.boxSizing = 'border-box';
        element.addEventListener('value', () => dispatchEvents('change'));
        
        let el = element as any;
        let optionsCalled = false;

        if (el.setOptions) {
          el.setOptions?.(view.options);
          optionsCalled = true;
        }

        if (view.field) {
          (element as any)?.setValue?.(get(instance.value, view.field));
        }

        (element as any)?.setInstance?.(instance);

        (element as any)?.setRender?.(r);

        // @ts-ignore
        if (view.field && element.getValue) {
          this.elements.push({
            key: view.field.replace(/^\//, ''),
            options: view.options,
            optionsCalled,
            element
          });
        }

        rowContainer.appendChild(element);
      }

      container.appendChild(rowContainer);
    }

    parentElement.appendChild(container);

    // todo: return cleanup function
    return r;
  }
}
