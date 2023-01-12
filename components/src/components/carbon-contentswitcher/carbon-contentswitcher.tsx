import { Component, Event, EventEmitter, h, Host, Prop, State } from '@stencil/core';
import '@carbon/web-components/dist/content-switcher.min.js';

export interface CarbonContentSwitcherOptions {
  value?: string;
  label?: string;
  href?: string;
  kind?: string;
  disabled?: boolean;
  type?: string;
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

  render() {
    return (
      <Host>
        <bx-content-switcher size="sm">
          <bx-content-switcher-item selected={true} text="Latest news">qwe</bx-content-switcher-item>
          <bx-content-switcher-item text="Trending">abc</bx-content-switcher-item>
        </bx-content-switcher>
      </Host>
    );
  }
}
