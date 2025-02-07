import {Event, Component, h, Host, Method, Prop, State, EventEmitter, Watch} from '@stencil/core';
import '@carbon/web-components/dist/toggle.min.js';

export interface CarbonToggleOptions {
  label?: string;
  value?: boolean;
  disabled?: boolean;

  checkedText?: string;
  uncheckedText?: string;
  size?: 'regular' | 'small'
}

@Component({
  tag: 'carbon-toggle',
  styleUrl: 'carbon-toggle.css',
})
export class CarbonToggle {

  @State()
  @Prop()
  options: CarbonToggleOptions = {};

  @Watch('options')
  parseMyObjectProp(options: string) {
    return JSON.parse(options);
  }

  @Prop() value: boolean = this.options?.value;

  @Event({
    eventName: 'value',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonToggleOptions) {
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
        <bx-toggle
          disabled={this.options?.disabled}
          value={this.value}
          checked-text={this.options?.checkedText || 'On'}
          unchecked-text={this.options?.uncheckedText || 'Off'}
          size={this.options?.size || 'regular'}
          onInput={(event) => this.handleChange(event)}>
          {this.options?.label && <span slot="label-text">{this.options.label}</span>}
        </bx-toggle>
      </Host>
    );
  }
}
