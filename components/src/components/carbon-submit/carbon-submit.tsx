import {Component, Event, EventEmitter, h, Host, Method, Prop, State} from '@stencil/core';
import '@carbon/web-components/dist/button.min.js';
import '@carbon/web-components/dist/inline-loading.min.js';
import {get} from '../../utils/json-pointer.util';

export interface CarbonSubmitOptions {
  value?: string;
  label?: string;
  href?: string;
  kind?: string;
  disabled?: boolean;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  form?: {
    pointer: string;
    key: string;
  }[];
  duration?: number;
  loadingText?: string;
}

@Component({
  tag: 'carbon-submit',
  styleUrl: 'carbon-submit.css',
})

export class CarbonSubmit {

  instance: any;

  @State()
  loading = false;

  @State()
  state: 'idle' | 'error' | 'finished' = 'idle';

  @State()
  @Prop()
  options: CarbonSubmitOptions = {};

  @Prop() value: string = this.options?.value

  @Event({
    eventName: 'open',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonSubmitOptions) {
    this.options = options;
  }

  @Method()
  setValue(value: any) {
    this.value = value;
  }

  @Method()
  setInstance(instance) {
    this.instance = instance;
  }

  handleChange(event) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }

  async handleSubmit() {
    if (this.loading) {
      return;
    }

    const data = {};
    const form = this.options?.form;
    for (const item of form) {
      data[item.key] = get(this.instance.value, item.pointer);
    }

    const url = this.options?.href;
    const method = this.options?.method || 'GET';
    const body = method === 'GET' ? null : JSON.stringify(data);
    const headers = {
      'Content-Type': 'application/json',
    };

    this.loading = true;
    await fetch(url, {
      method,
      body,
      headers,
    }).then(() => {
      this.state = 'finished';
    }).catch((error) => {
      this.state = 'error';
      console.error('Error:', error);
    });
    this.loading = false;

    setTimeout(() => {
      this.state = 'idle';
    }, this.options?.duration || 2000);
  }

  render() {
    return (
      <Host>
        <bx-btn kind={this.options?.kind} onClick={() => this.handleSubmit()}>
          {this.loading
            ? <bx-inline-loading description={this.options.loadingText ?? 'Submitting...'}></bx-inline-loading>
            : this.state === 'finished'
              ? <bx-inline-loading status="finished"></bx-inline-loading>
              : this.state === 'error'
                ? <bx-inline-loading status="error"></bx-inline-loading>
                : this.options?.label
          }
        </bx-btn>
      </Host>
    );
  }
}
