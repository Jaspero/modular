import { Component, h, Host, Method, Prop, State, Element } from '@stencil/core';

export interface TabView {
  title: string;
  disabled?: boolean;
  schema: any;
  views?: any[];
}

export interface TabViewsOptions {
  views?: TabView[];
}

@Component({
  tag: 'tab-views',
  styleUrls: ['tab-views.css']
})
export class TabViews {

  @Element()
  hostEl: HTMLDivElement;

  @State()
  @Prop()
  options: TabViewsOptions = {};

  @State()
  activeView: TabView;

  _cachedViews: {
    [key: string]: {
      schema: any;
      view: any;
      instance: any;
    }
  } = {};
  _renderEl: HTMLDivElement;

  @Method()
  setOptions(options: TabViewsOptions) {
    this.options = options;
  }

  componentDidRender() {
    this._renderEl = this.hostEl.querySelector('.tab-view-render');

    if (this.options.views?.length && !this.activeView) {
      this.changeActiveView(this.options.views[0]);
    }
  }

  changeActiveView(view: TabView) {

    if (this.activeView) {
      this.cleanRender();
    }

    this.activeView = view;

    if (!this.activeView.views?.length) {
      return;
    }

    if (!this._cachedViews[this.activeView.title]) {
      // @ts-ignore
      const schema = new window.ModularSchema(this.activeView?.schema?.properties || {});
      // @ts-ignore
      const view = new window.ModularView({ schema: this.schema, views: this.activeView.views || [] });

      const instance = schema.createInstance({});

      this._cachedViews[this.activeView.title] = {schema, view, instance};
    }

    this._cachedViews[this.activeView.title].view.render({
      parentElement: this._renderEl,
      instance: this._cachedViews[this.activeView.title].instance
    });
  }

  private isActiveView(view: TabView) {
    return view === this.activeView;
  }

  private cleanRender() {
    if (this._renderEl.children.length) {
      this._renderEl.removeChild(this._renderEl.children[0]);
    }
  }

  render() {
    return (
      <Host>
        <div class="tab-views">
          <div class="tab-views-inner">
            {...this.options.views.map(view => (
              <button type="button" class={{'tab-views-inner-tab': true, active: this.isActiveView(view)}} onClick={() => this.changeActiveView(view)}>{view.title}</button>
            ))}
          </div>
        </div>
        <div class="tab-view-render"></div>
      </Host>
    );
  }
}
