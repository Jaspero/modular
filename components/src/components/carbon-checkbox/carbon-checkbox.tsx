import {Event, Component, h, Host, Method, Prop, State, EventEmitter, Watch} from '@stencil/core';
import '@carbon/web-components/dist/checkbox.min.js';


export interface CarbonCheckboxOptions {
  label?: string;
  value?: boolean;
  disabled?: boolean;
}


@Component({
  tag: 'carbon-checkbox',
  styleUrl: 'carbon-checkbox.css',
})
export class CarbonCheckbox {
  @State()
  @Prop()
  options: CarbonCheckboxOptions = {};

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
  setOptions(options: CarbonCheckboxOptions) {
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
        <bx-checkbox label-text={this.options?.label || ''} disabled={this.options?.disabled} value={this.value} onInput={(event) => this.handleChange(event)}></bx-checkbox>
      </Host>
    );
  }
}
