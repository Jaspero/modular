import {Event, Component, h, Host, Method, Prop, State, EventEmitter, Watch} from '@stencil/core';
import '@carbon/web-components/dist/input.min.js';

export interface CarbonInputOptions {
  label?: string;
  hint?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
}

@Component({
  tag: 'carbon-input',
  styleUrl: 'carbon-input.css',
})
export class CarbonInput {

  @State()
  @Prop()
  options: CarbonInputOptions = {};

  @Watch('options')
  parseMyObjectProp(options: string) {
    return JSON.parse(options);
  }

  @Prop() value: string = this.options?.value;

  @Event({
    eventName: 'value',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonInputOptions) {
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

  render() {
    return (
      <Host>
        <bx-input
          type={this.options?.type}
          disabled={this.options?.disabled}
          placeholder={this.options?.placeholder}
          value={this.value}
          onInput={(event) => this.handleChange(event)}>
          {this.options?.label && <span slot="label-text">{this.options.label}</span>}
          {this.options?.hint && <span slot="helper-text">{this.options.hint}</span>}
        </bx-input>
      </Host>
    );
  }
}
