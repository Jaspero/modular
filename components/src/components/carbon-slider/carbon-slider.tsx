import {Event, Component, h, Host, Method, Prop, State, EventEmitter, Watch} from '@stencil/core';
import '@carbon/web-components/dist/slider.min.js';

export interface CarbonSliderOptions {
  label?: string;
  value?: number;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

@Component({
  tag: 'carbon-slider',
  styleUrl: 'carbon-slider.css',
})
export class CarbonSlider {

  @State()
  @Prop()
  options: CarbonSliderOptions = {};

  @Watch('options')
  parseMyObjectProp(options: string) {
    return JSON.parse(options);
  }

  @Prop() value: number = this.options?.value;

  @Event({
    eventName: 'value',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonSliderOptions) {
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
        <bx-slider
          disabled={this.options?.disabled}
          value={this.value}
          label-text={this.options?.label || ''}
          max={this.options?.max || 100}
          min={this.options?.min || 0}
          step={this.options?.step || 1}
          onInput={(event) => this.handleChange(event)}>
        </bx-slider>
      </Host>
    );
  }
}
