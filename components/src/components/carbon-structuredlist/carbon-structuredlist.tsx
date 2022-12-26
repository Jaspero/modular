import {Event, Component, h, Host, Method, Prop, State, EventEmitter} from '@stencil/core';
import '@carbon/web-components/dist/structured-list.min.js';

export interface CarbonStructuredListOptions {
  open?: boolean;
  value?: Array<{ columnName: string; rowName: string; content: string; }>;

}

@Component({
  tag: 'carbon-structuredlist',
  styleUrl: 'carbon-structuredlist.css',
})

export class CarbonStructuredList {
  @State()
  @Prop()
  options: CarbonStructuredListOptions = {};

  @Prop() value: Array<{ columnName: string; rowName: string; content: string; }> | undefined = this.options?.value


  @Prop() open: boolean = this.options?.open;

  @Event({
    eventName: 'open',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonStructuredListOptions) {
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
        <bx-structured-list>
          <bx-structured-list-head>
            <bx-structured-list-header-row>
              {
                [...(this.options?.value || [])].map((item) => {
                  return (
                    <bx-strucutred-list-header-cell>{item.columnName}</bx-strucutred-list-header-cell>
                  )
                })
              }
            </bx-structured-list-header-row>
          </bx-structured-list-head>
          <bx-structured-list-body>

            {
              [...(this.options?.value || [])].map((item) => {
                return (
                  <bx-structured-list-row>
                    <bx-structured-list-cell>{item.rowName}</bx-structured-list-cell>
                    <bx-structured-list-cell>{item.rowName}</bx-structured-list-cell>
                    <bx-structured-list-cell>{item.content}</bx-structured-list-cell>
                  </bx-structured-list-row>
                )
              })
            }

          </bx-structured-list-body>
        </bx-structured-list>

      </Host>
    );
  }
}
