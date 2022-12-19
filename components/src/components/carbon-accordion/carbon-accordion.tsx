import {Event, Component, h, Host, Method, Prop, State, EventEmitter} from '@stencil/core';
import '@carbon/web-components/dist/accordion.min.js';

export interface CarbonAccordionOptions {
  align?: 'start' | 'end';
  open?: boolean;
  value?: Array<{ label: string; content: string; }>;

}

@Component({
  tag: 'carbon-accordion',
  styleUrl: 'carbon-accordion.css',
})

export class CarbonAccordion {


  @State()
  @Prop()
  options: CarbonAccordionOptions = {};

  @Prop() value: Array<{ label: string; content: string; }> | undefined = this.options?.value


  @Prop() open: boolean = this.options?.open;

  @Event({
    eventName: 'open',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonAccordionOptions) {
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
        <bx-accordion>
          {

            [...(this.options?.value || [])].map(item =>
              <bx-accordion-item title-text={item.label}>
              <p>
                {item.content}
              </p>
            </bx-accordion-item>
            )
          }

        </bx-accordion>
      </Host>
    );
  }
}
