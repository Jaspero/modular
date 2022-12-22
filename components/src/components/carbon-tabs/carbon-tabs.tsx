import {Event, h, Host, Method, Prop, State, EventEmitter, Component} from '@stencil/core';
import '@carbon/web-components/dist/tabs.min.js';
export interface CarbonTabsOptions {
  open?: boolean;
  value?: Array<{ tabTarget: string; tabId: string; tabName: string; isDisabled: boolean; tabContent: string; value: string; }>;

}

@Component({
  tag: 'carbon-tabs',
  styleUrl: 'carbon-tabs.css',
})

export class CarbonTabs {


  @State()
  @Prop()
  options: CarbonTabsOptions = {};

  @Prop() value: Array<{ tabTarget: string; tabId: string; tabName: string; isDisabled: boolean; tabContent: string; value: string; }> | undefined = this.options?.value


  @Prop() open: boolean = this.options?.open;

  @Event({
    eventName: 'open',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonTabsOptions) {
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
    console.log(this.options?.value);
    return (
      <Host>
        <bx-tabs trigger-content="Select an item" value="staging">
          {
            [...(this.options?.value || [])].map((item) => {
              return (
                <bx-tab id={item.tabId} target={item.tabTarget} value={item.value}>{item.tabName}</bx-tab>
              )
            })
          }
        </bx-tabs>
        <div class="bx-ce-demo-devenv--tab-panels">
          {
            [...(this.options?.value || [])].map((item) => {
              return (

                <div id={item.tabTarget} role="tabpanel" aria-labelledby={item.tabId} hidden>
                  <h4>{item.tabName} options</h4>
                  <p>
                    {item.tabContent}
                  </p>
                </div>
              )
            })
          }
        </div>

      </Host>
    )
      ;
  }
}
