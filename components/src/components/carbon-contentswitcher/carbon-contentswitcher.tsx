import { Component, Event, EventEmitter, h, Host, Prop, State, Method } from '@stencil/core';
import '@carbon/web-components/dist/content-switcher.min.js';

export interface CarbonContentSwitcherOptions {
  size?: string;
  values?: any[];
}

@Component({
  tag: 'carbon-contentswitcher',
  styleUrl: 'carbon-contentswitcher.css',
})
export class CarbonContentSwitcher {
  @State()
  @Prop()
  options: CarbonContentSwitcherOptions = {};

  @Event({
    eventName: 'open',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonContentSwitcherOptions) {
    this.options = options;
  }

  render() {
    return (
      <Host>
        <bx-content-switcher size="sm">
          {
            [...(this.options?.values || [])].map(item =>
              <bx-content-switcher-item selected={item.selected}>{item.label}</bx-content-switcher-item>
            )
          }
        </bx-content-switcher>
      </Host>
    );
  }
}
