import {Component, Event, EventEmitter, h, Host, Method, Prop, State, Element} from '@stencil/core';
import '@carbon/web-components/dist/button.min.js';
import '@carbon/web-components/dist/inline-loading.min.js';
import {get} from '../../utils/json-pointer.util';
import { HostElement } from '@stencil/core/internal';

export interface CarbonSubmitOptions {
  value?: string;
  label?: string;
  href?: string;
  kind?: string;
  disabled?: boolean;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  form?: {
    pointer: string;
    key?: string;
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

  @Element()
  el: HostElement;

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

  formEl: HTMLFormElement;

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

  componentDidRender() {

    if (this.formEl) {
      return;
    }

    const formEl = this.el.parentElement;

    if (formEl.nodeName === 'FORM') {
      this.formEl = formEl as HTMLFormElement;
      formEl.addEventListener('submit', e => {
        e.preventDefault();
        this.submit().catch();
      })
    }
  }

  async submit() {
    if (this.loading) {
      return;
    }

    const data = {};
    const form = this.options?.form;
    for (const item of form) {

      if (!item.key) {
        item.key = item.pointer.replace(/^\//, '');
      }

      data[item.key] = get(this.instance.value, item.pointer);
    }

    const url = this.options?.href || '/';
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

  // TODO: Events dispatching multiple times
  async handleSubmit() {
    if (this.formEl) {
      // TODO: Maybe this needs polyfilling
      this.formEl.dispatchEvent(new CustomEvent('submit', {bubbles: true, cancelable: true}));
      return;
    }

    this.submit().catch();
  }

  render() {
    return (
      <Host>
        <bx-btn type="submit" kind={this.options?.kind} onClick={() => this.handleSubmit()}>
          {
            this.loading
              ? <bx-inline-loading description={this.options.loadingText ?? 'Submitting...'}></bx-inline-loading>
              : this.state === 'finished'
                ? <bx-inline-loading status="finished"></bx-inline-loading>
                : this.state === 'error'
                  ? <bx-inline-loading status="error"></bx-inline-loading>
                  : (this.options?.label || 'Submit')
          }
        </bx-btn>
      </Host>
    );
  }
}
