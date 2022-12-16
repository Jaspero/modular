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

  constructor() {
    console.log('CarbonToggle');
  }

  @State()
  @Prop()
  options: CarbonToggleOptions = {};

  @Watch('options')
  parseMyObjectProp(options: string) {
    console.log('parseMyObjectProp', options);
    return JSON.parse(options);
    // if (typeof options === 'string') {
    //   // this.options = JSON.parse(options);
    // }
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
          lable-text={this.options?.label || ''}
          onInput={(event) => this.handleChange(event)}>
        </bx-toggle>
      </Host>
    );
  }
}
