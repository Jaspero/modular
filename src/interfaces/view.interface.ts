import {CarbonInputOptions, CarbonSelectOptions, CarbonChartOptions} from '@jaspero/modular-components';

export enum Components {
  CarbonInput = 'carbon-input',
  CarbonSelect = 'carbon-select',
  CarbonChart = 'carbon-chart',
}

export interface ComponentOptions {
  [Components.CarbonInput]: CarbonInputOptions;
  [Components.CarbonSelect]: CarbonSelectOptions;
  [Components.CarbonChart]: CarbonChartOptions;
}

export interface ViewInterface<OPTIONS, FIELD extends keyof OPTIONS> {
  field: string;
  component: FIELD;
  options?: OPTIONS[FIELD];
  columns?: {
    desktop?: number;
    tablet?: number;
    mobile?: number;
  } | number;
}

export type View<OPTIONS = ComponentOptions, FIELD extends keyof OPTIONS = keyof OPTIONS> = FIELD extends keyof OPTIONS ? ViewInterface<OPTIONS, FIELD> : never;
