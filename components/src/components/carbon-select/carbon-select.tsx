import {Component, Event, EventEmitter, h, Host, Method, Prop, State} from '@stencil/core';
import '@carbon/web-components/dist/select.min.js';

export interface CarbonSelectOptions {
  label?: string;
  hint?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  items: {
    label: string;
    value: string;
  }[];
}

@Component({
  tag: 'carbon-select',
  styleUrl: 'carbon-select.css',
  shadow: true,
})
export class CarbonSelect {

  @State() options: CarbonSelectOptions = {
    items: []
  };

  @Prop() value: string = this.options.value;

  @Event({
    eventName: 'value',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonSelectOptions) {
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
        <bx-select helper-text={this.options?.hint} label-text={this.options?.label}
                   placeholder={this.options?.placeholder} disabled={this.options?.disabled} value={this.value}
                   onInput={(event) => this.handleChange(event)}>
          {this.options?.items.map(item => <bx-select-item value={item.value}>{item.label}</bx-select-item>)}
        </bx-select>
      </Host>
    );
  }
}
