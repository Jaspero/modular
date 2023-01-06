import '@carbon/web-components/dist/data-table.min.js';
import '@carbon/web-components/dist/button.min.js';
import '@carbon/web-components/dist/pagination.min.js';
import { Component, Event, EventEmitter, h, Host, Method, Prop, State, Element } from '@stencil/core';
import { HostElement } from '@stencil/core/internal';

export interface CarbonTableOptions {
  size?: 'compact' | 'short' | 'regular' | 'tall';
  colorSchema?: 'regular' | 'zebra';
  columns?: Array<{ label: string; id: string, pipes?: any[] }>;
  value?: any[];
  pagination?: {
    pageSize?: number;
    start?: number;
    total?: number;
    sizeOptions?: number[];
  };
  search?: {
    disabled?: boolean;
    placeholder?: string;
  };
  button?: {
    disabled?: boolean;
    label: string;
    url: string;
    useHistory?: boolean;
  };
  overflowMenu?: {
    disabled?: boolean;
    items: Array<{
      label: string;
      url: string;
    }>;
  };
  fromEndpoint?: {
    url: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Array<{
      key: string;
      value: string;
    }>;
  };
}

@Component({
  tag: 'carbon-table',
  styleUrl: 'carbon-table.css'
})
export class CarbonTable {

  @Element() el: HostElement
  @State() options: CarbonTableOptions = {};
  @Prop() value: any[] = this.options?.value;

  @Event({
    eventName: 'value',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  start = 0;
  @State() total = 0;
  @State() data: any[];

  startChange;
  selectChange;
  pipeMap = {
    date: (value) => new Date(value).toLocaleDateString(),
    title: (value) => value.charAt(0).toUpperCase() + value.slice(1),
    currency: (value, options: any = {}) => new Intl.NumberFormat(options.local || 'en-US', { style: options.style || 'currency', currency: options.currency || 'USD' }).format(value),
  }

  @Method()
  setOptions(options: CarbonTableOptions) {
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

  getValue(value: any, column: any) {
    if (column.pipes) {
      column.pipes.forEach(pipe => {
        value = this.pipeMap[pipe.name](value, pipe.options);
      });
    }
    return value || '';
  }

  componentWillLoad() {
    if (this.options.fromEndpoint) {
      this.loadData()
        .catch(console.error);
    }
  }

  componentDidRender() {
    const paginationEl = this.el.querySelector('bx-pagination');

    if (paginationEl) {

      if (this.startChange) {
        paginationEl.removeEventListener('bx-pagination-changed-current', this.startChange);
      }

      if (this.selectChange) {
        paginationEl.removeEventListener('bx-page-sizes-select-changed', this.selectChange)
      }

      this.startChange = change => {
        this.start = change.detail.start;
        this.loadData().catch();
      };

      this.selectChange = change => {
        this.options.pagination.pageSize = change.detail.value;
        this.loadData().catch();
      };

      paginationEl.addEventListener('bx-pagination-changed-current', this.startChange);
      paginationEl.addEventListener('bx-page-sizes-select-changed', this.selectChange);
    }
  }

  async loadData() {
    const url = new URL(this.options.fromEndpoint.url);

    url.searchParams.set('start', (this.start || 0).toString());
    url.searchParams.set('page-size', (this.options.pagination?.pageSize || 5).toString());

    const res = await fetch(url.toString());

    const { rows, total } = await res.json();

    this.data = rows;
    this.total = total;
  }

  buttonClick(event: MouseEvent) {
    if (!this.options.button.useHistory) {
      return;
    }

    if (event.ctrlKey) {
      window.open(this.options.button.url, '_blank');
      return;
    }

    const { state } = history;
    history.pushState(state, '', this.options.button.url);
    dispatchEvent(new PopStateEvent('popstate', { state }));
  }

  render() {

    const rows = this.options.fromEndpoint ? (this.data || []) : this.options.value;

    return (
      <Host>
        {
          (this.options.search || this.options.button) && (
            <bx-table-toolbar>
              <bx-table-toolbar-content>
                {
                  this.options.search && (
                    <bx-table-toolbar-search disabled={this.options.search.disabled} placeholder={this.options.search.placeholder}></bx-table-toolbar-search>
                  )
                }
                {
                  this.options.button && (
                    <bx-btn
                      disabled={this.options.button.disabled}
                      href={!this.options.button.useHistory && this.options.button.url}
                      onClick={e => this.buttonClick(e)}>
                      {this.options.button.label}
                    </bx-btn>
                  )
                }
              </bx-table-toolbar-content>
            </bx-table-toolbar>
          )
        }
        <bx-table size={this.options?.size || 'regular'}>
          <bx-table-head>
            <bx-table-header-row>
              {
                [...(this.options?.columns || [])].map(item =>
                  <bx-table-header-cell>{item.label}</bx-table-header-cell>
                )
              }
            </bx-table-header-row>
          </bx-table-head>
          <bx-table-body color-schema={this.options?.colorSchema || 'regular'}>
            {
              [...(rows || [])].map(row =>
                <bx-table-row>
                  {
                    [...(this.options?.columns || [])].map(col =>
                      <bx-table-cell>{this.getValue(row[col.id], col)}</bx-table-cell>
                    )
                  }
                </bx-table-row>
              )
            }
          </bx-table-body>
        </bx-table>
        {
          this.options.pagination && (
            <bx-pagination start={this.options.pagination.start || 0} total={this.total} page-size={this.options.pagination.pageSize || 5}>
              {
                this.options.pagination.sizeOptions?.length && (
                  <bx-page-sizes-select slot="page-sizes-select">
                    {[...(this.options.pagination.sizeOptions || [])].map(row => <option value={row}>{row}</option>)}
                  </bx-page-sizes-select>
                )
              }
              <bx-pages-select></bx-pages-select>
            </bx-pagination>
          )
        }
      </Host>
    );
  }
}
