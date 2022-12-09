import {CarbonInputOptions} from '@jaspero/modular-components';

export enum Components {
  CarbonInput = 'carbon-input',
  CarbonSelect = 'carbon-select'
}

export interface ComponentOptions {
  [Components.CarbonInput]: CarbonInputOptions;
  [Components.CarbonSelect]: any;
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
