import {Event, Component, h, Host, Method, Prop, State, EventEmitter, Watch} from '@stencil/core';
import '@carbon/web-components/dist/textarea.min.js';

export interface CarbonTextareaOptions {
  label?: string;
  hint?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  rows?: number;
  cols?: number;
  colorSchema?: 'regular' | 'light';
}

@Component({
  tag: 'carbon-textarea',
  styleUrl: 'carbon-textarea.css',
})
export class CarbonTextarea {

  constructor() {
    console.log('CarbonTextarea');
  }

  @State()
  @Prop()
  options: CarbonTextareaOptions = {};

  @Watch('options')
  parseMyObjectProp(options: string) {
    console.log('parseMyObjectProp', options);
    return JSON.parse(options);
    // if (typeof options === 'string') {
    //   // this.options = JSON.parse(options);
    // }
  }

  @Prop() value: string = this.options?.value;

  @Event({
    eventName: 'value',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonTextareaOptions) {
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

  render() {
    return (
      <Host>
        <bx-textarea
          disabled={this.options?.disabled}
          placeholder={this.options?.placeholder}
          value={this.value}
          cols={this.options?.cols || 50}
          rows={this.options?.rows || 4}
          onInput={(event) => this.handleChange(event)}>
          {this.options?.label && <span slot="label-text">{this.options.label}</span>}
          {this.options?.hint && <span slot="helper-text">{this.options.hint}</span>}
        </bx-textarea>
      </Host>
    );
  }
}
