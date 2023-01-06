import { Component, h, Host, Method, Prop, State } from '@stencil/core';

export interface TabView {
  title: string;
  disabled?: boolean;
  view?: any;
}

export interface TabViewsOptions {
  views?: TabView[];
}

@Component({
  tag: 'tab-views',
  styleUrl: 'tab-views.css',
})
export class TabViews {

  @State()
  @Prop()
  options: TabViewsOptions = {};

  @Method()
  setOptions(options: TabViewsOptions) {
    this.options = options;
  }

  render() {
    return (
      <Host>
        <div class="tabs">
          {...this.options.views.map(view =>(
            <div class="tab">{view.title}</div>
          ))}
        </div>
      </Host>
    );
  }
}
