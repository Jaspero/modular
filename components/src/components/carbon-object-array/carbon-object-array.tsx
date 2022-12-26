// import { ModularSchema, ModularView } from '@jaspero/modular';
import { Component, Element, Event, EventEmitter, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { HostElement } from '@stencil/core/internal';
import '@carbon/web-components/dist/button.min.js';

export interface CarbonObjectArrayOptions {
  properties?: any;
  value?: any[];
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

  @Prop() value: any[] = this.options?.value || [];

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

  handleChange(event) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }

  componentDidRender() {
    console.log('loaded');
    // @ts-ignore
    this.schema = new window.ModularSchema(this.options.properties || {});
    // @ts-ignore
    this.view = new window.ModularView({ schema: this.schema, views: this.options.views || [] });
    this.itemsEl = this.hostEl.querySelector('.items');

    if (this.options.value?.length) {
      this.options.value.forEach(val => {
        this.addElement(val);
      });
    }
  }

  addElement(item: any) {
    console.log(item);
    const instance = this.schema.createInstance(item);

    const wrapperElement = document.createElement('div');
    const parentElement = document.createElement('div');
    const deleteButton = document.createElement('bx-btn');

    deleteButton.innerText = 'Delete';
    deleteButton.setAttribute('kind', 'danger');

    wrapperElement.appendChild(parentElement);
    wrapperElement.appendChild(deleteButton);

    this.itemsEl.appendChild(wrapperElement);
    this.view.render({ parentElement, instance });
  }

  newItem() {
    this.addElement({});
  }

  render() {
    return (
      <Host>
        {this.options.label && (<p class="label">{this.options.label}</p>)}
        {this.options.description && (<p class="description">{this.options.description}</p>)}
        <div class="items"></div>
        <bx-btn onClick={() => this.newItem()}>
          {this.options.addLabel || 'Add'}
        </bx-btn>
      </Host>
    );
  }
}
