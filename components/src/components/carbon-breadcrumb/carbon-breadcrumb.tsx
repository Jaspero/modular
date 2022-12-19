import {Event, Component, h, Host, Method, Prop, State, EventEmitter} from '@stencil/core';
import '@carbon/web-components/dist/breadcrumb.min.js';

export interface CarbonBreadcrumbOptions {
  align?: 'start' | 'end';
  open?: boolean;
  value?: Array<{ label: string; link: string; }>;

}

@Component({
  tag: 'carbon-breadcrumb',
  styleUrl: 'carbon-breadcrumb.css',
})

export class CarbonBreadcrumb {


  @State()
  @Prop()
  options: CarbonBreadcrumbOptions = {};

  @Prop() value: Array<{ label: string; link: string; }> | undefined = this.options?.value


  @Prop() open: boolean = this.options?.open;

  @Event({
    eventName: 'open',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonBreadcrumbOptions) {
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
        <bx-breadcrumb>
          {

            [...(this.options?.value || [])].map(item =>
              <bx-breadcrumb-item>
                <bx-breadcrumb-link href={item.link}>
                  {item.label}
                </bx-breadcrumb-link>
              </bx-breadcrumb-item>
            )
          }

        </bx-breadcrumb>
      </Host>
    );
  }
}
