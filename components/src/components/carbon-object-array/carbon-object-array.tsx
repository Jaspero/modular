// import { ModularSchema, ModularView } from '@jaspero/modular';
import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { HostElement } from '@stencil/core/internal';
import '@carbon/web-components/dist/button.min.js';

export interface CarbonObjectArrayOptions {
  properties?: any;
  views?: any[];
  label?: string;
  description?: string;
  addLabel?: string;
}

@Component({
  tag: 'carbon-object-array',
  styleUrl: 'carbon-object-array.css',
})
export class CarbonObjectArray {

  @State()
  @Prop()
  options: CarbonObjectArrayOptions = {};

  // TODO: These should be things from modular
  schema: any;
  view: any;
  itemsEl: HTMLDivElement;

  @Element()
  hostEl: HostElement;

  @Watch('options')
  parseMyObjectProp(options: string) {
    return JSON.parse(options);
  }

  @Prop() value: any[] = [];

  @Event({
    eventName: 'value',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonObjectArrayOptions) {
    this.options = options;
  }

  @Method()
  setValue(value: any) {
    this.value = value;
  }

  @Method()
  async getValue() {
    return this.value;
  }

  handleChange(event) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }

  componentDidRender() {
    // @ts-ignore
    this.schema = new window.ModularSchema(this.options.properties || {});
    // @ts-ignore
    this.view = new window.ModularView({ schema: this.schema, views: this.options.views || [] });
    this.itemsEl = this.hostEl.querySelector('.items');

    if (this.value?.length) {
      this.value.forEach((val, index) =>
        this.addElement(val, index)
      );
    } else {
      this.value = [];
    }
  }

  addElement(item: any, index = null) {
    const instance = this.schema.createInstance(item);

    if (index === null) {
      index = this.value.length;
      this.value.push(item);
    }

    const wrapperElement = document.createElement('div');
    const parentElement = document.createElement('div');
    const deleteButtonWrapperElement = document.createElement('div');
    const deleteButton = document.createElement('bx-btn');

    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('type', 'button');
    deleteButton.setAttribute('kind', 'danger');
    deleteButton.addEventListener('click', () => this.removeItem(index));

    parentElement.classList.add('items-parent');

    wrapperElement.classList.add('items-wrapper');

    deleteButtonWrapperElement.classList.add('delete-button-wrapper');

    deleteButtonWrapperElement.appendChild(deleteButton);

    wrapperElement.appendChild(parentElement);
    wrapperElement.appendChild(deleteButtonWrapperElement);

    this.itemsEl.appendChild(wrapperElement);
    const render = this.view.render({ parentElement, instance });

    render.addEventListener('change', value => {
      this.value[index] = value;
    });
  }

  newItem() {
    this.addElement({});
  }

  removeItem(index: number) {
    this.itemsEl.removeChild(this.itemsEl.children[index]);
    this.value.splice(index, 1);
    this.valueChange.emit(this.value);
  }

  render() {
    return (
      <Host>
        {this.options.label && (<p class="label">{this.options.label}</p>)}
        {this.options.description && (<p class="description">{this.options.description}</p>)}
        <div class="items"></div>
        <bx-btn onClick={() => this.newItem()} type="button">
          {this.options.addLabel || 'Add'}
        </bx-btn>
      </Host>
    );
  }
}
