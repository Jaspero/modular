import {Event, Component, h, Host, Method, Prop, State, EventEmitter} from '@stencil/core';
import '@carbon/web-components/dist/button.min.js';

export interface CarbonButtonOptions {
  value?: string;
  label?: string;
  href?: string;
  kind?: string;
  disabled?: boolean;
  type?: string;
}

@Component({
  tag: 'carbon-button',
  styleUrl: 'carbon-button.css',
})
export class CarbonButton {
  @State()
  @Prop()
  options: CarbonButtonOptions = {};

  @Prop() value: string = this.options?.value

  @Event({
    eventName: 'open',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonButtonOptions) {
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
        <bx-btn kind={this.options?.kind} href={this.options?.href} type={this.options?.type || 'button'}>
          {this.options?.label}
        </bx-btn>
      </Host>
    );
  }
}
