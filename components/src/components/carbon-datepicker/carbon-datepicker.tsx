import { Event, Component, h, Host, Method, Prop, State, EventEmitter } from '@stencil/core';
import '@carbon/web-components/dist/date-picker.min.js';


export interface CarbonDatePickerOptions {
  label?: string;
  hint?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  format?: string;
  kind?: 'single' | 'simple'
}


@Component({
  tag: 'carbon-datepicker',
  styleUrl: 'carbon-datepicker.css',
})
export class CarbonDatePicker {


  @State() options: CarbonDatePickerOptions = {};

  @Prop() value: string = this.options?.value;

  @Event({
    eventName: 'value',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonDatePickerOptions) {
    this.options = options;
  }

  @Method()
  setValue(value: any) {
    this.value = value;
  }

  @Method()
  async getValue() {
    return new Date(this.value).getTime();
  }

  handleChange(event) {
    this.value = event.target.value;
    this.valueChange.emit(new Date(this.value).getTime());
  }

  render() {
    return (
      <Host>
        <bx-date-picker>
          <bx-date-picker-input
            date-format={this.options?.format || "DD/mm/yyyy"}
            kind="single"
            label-text="Date Picker label"
            disabled={this.options?.disabled}
            placeholder={this.options?.format || "DD/mm/yyyy"}
            value={this.value}
            onInput={(event) => this.handleChange(event)}>
            {this.options?.label && <span slot="label-text">{this.options.label}</span>}
            {this.options?.hint && <span slot="helper-text">{this.options.hint}</span>}
          </bx-date-picker-input>
        </bx-date-picker>
      </Host>
    );
  }
}
