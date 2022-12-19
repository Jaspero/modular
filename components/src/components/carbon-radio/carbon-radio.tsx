import {Component, Event, EventEmitter, h, Host, Method, Prop, State} from '@stencil/core';
import '@carbon/web-components/dist/radio-button.min.js';

export interface CarbonRadioOptions {
  name?: string;
  label?: string;
  labelPosition?: 'left' | 'right';
  orientation?: 'vertical' | 'horizontal';
  value?: string;
  disabled?: boolean;
  items: {
    label: string;
    value: string;
    disabled?: boolean;
  }[];
}

@Component({
  tag: 'carbon-radio',
  styleUrl: 'carbon-radio.css',
  shadow: true,
})
export class CarbonRadio {

  @State() options: CarbonRadioOptions = {
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
  setOptions(options: CarbonRadioOptions) {
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
        {this.options?.label && <span slot="label-text">{this.options.label}</span>}
        <bx-radio-button-group
          name={this.options?.name || ''}
          label-position={this.options?.labelPosition || 'right'}
          orientation={this.options?.orientation || 'vertical'}
          disabled={this.options?.disabled}
          value={this.value}
          onInput={(event) => this.handleChange(event)}>
        {
          [...(this.options?.items || [])].map(item =>
            <bx-radio-button value={item.value} label-text={item.label} disabled={item.disabled}></bx-radio-button>
          )
        }
        </bx-radio-button-group>
      </Host>
    );
  }
}
