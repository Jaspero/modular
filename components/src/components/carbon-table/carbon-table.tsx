import '@carbon/web-components/dist/data-table.min.js';
import { Component, Event, EventEmitter, h, Host, Method, Prop, State } from '@stencil/core';

export interface CarbonTableOptions {
  size?: 'compact' | 'short' | 'regular' | 'tall';
  colorSchema?: 'regular' | 'zebra';
  columns?: Array<{ label: string; id: string }>;
  rows?: any[];
  value?: any;
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

  render() {
    return (
      <Host>
        <bx-table size={this.options?.size || 'regular'}>
          <bx-table-head>
            <bx-table-header-row>
              {
                [...(this.options?.columns || [])].map(item =>
                  <bx-table-header-cell>{item.label}</bx-table-header-cell>
                )
              }
            </bx-table-header-row>
          </bx-table-head>
          <bx-table-body color-schema={this.options?.colorSchema || 'regular'}>
            {
              [...(this.options?.rows || [])].map(row =>
                <bx-table-row>
                  {
                    [...(this.options?.columns || [])].map(col =>
                      <bx-table-cell>{row[col.id] || '-'}</bx-table-cell>
                    )
                  }
                </bx-table-row>
              )
            }
          </bx-table-body>
        </bx-table>
      </Host>
    );
  }
}
