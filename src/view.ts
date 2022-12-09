import {ModularInstance} from './instance';
import {ComponentOptions, View} from './interfaces/view.interface';
import {ModularSchema} from './schema';
import {get} from './utils/json-pointer.util';

interface ViewRow<Options, Fields extends keyof Options> {
  align?: 'start' | 'center' | 'end';
  items: View<Options, Fields>[];
}

export class ModularView<Options = ComponentOptions, Fields extends keyof Options = keyof Options> {
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

  public render(options: {
    parentElement: HTMLElement,
    instance: ModularInstance
  }) {
    const {parentElement, instance} = options;
    // const elements: HTMLElement[] = [];

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';

    for (const row of this._views) {

      const rowContainer = document.createElement('div');
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
        element.addEventListener('value', (value: any) => {
          console.log('Value', value);
        });
        (element as any)?.setOptions?.(view.options);
        (element as any)?.setValue?.(get(instance.value, view.field));
        rowContainer.appendChild(element);


      }

      container.appendChild(rowContainer);
    }

    parentElement.appendChild(container);

    // todo: return cleanup function
    return {
      getValue: () => {
        const value: {
          [key: string]: any
        } = {};

        // TODO:
        // for (const element of elements) {
        //   const field = element.getValue();
        //   value[field] = (element as any)?.getValue?.();
        // }

        return value;
      },
      destroy: () => {
        container.remove();
      }
    }
  }
}
