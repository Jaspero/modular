import {Component, Element, Event, EventEmitter, h, Host, Method, Prop, State} from '@stencil/core';
import '@carbon/web-components/dist/data-table.min.js';

export interface CarbonTableOptions {
  value?: {
    data: number[];
    labels: string[];
  };
  label?: string;
}

@Component({
  tag: 'carbon-table',
  styleUrl: 'carbon-table.css'
})
export class CarbonTable {

  @State() options: CarbonTableOptions = {};

  @Prop() value: {
    data: number[],
    labels: string[]
  } = this.options?.value;

  @Event({
    eventName: 'value',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Element()
  private element: HTMLElement;
  private canvas: HTMLCanvasElement;

  @Method()
  setOptions(options: CarbonTableOptions) {
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

  componentDidLoad() {
    this.canvas = this.element.querySelector('canvas');
    this.canvas.width = 400;
    this.canvas.height = 300;
  }

  render() {
    return (
      <Host>
        <div style={{position: 'relative', height: '65vh', width: '100%'}}>
          <canvas width="400" height="300"/>
        </div>
      </Host>
    );
  }
}
