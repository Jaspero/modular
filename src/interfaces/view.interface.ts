import {
    CarbonInputOptions,
    CarbonSelectOptions,
    CarbonChartOptions,
    CarbonCheckboxOptions,
    CarbonTableOptions,
    CarbonTextareaOptions,
    CarbonRadioOptions,
    CarbonAccordionOptions,
    CarbonBreadcrumbOptions,
    CarbonButtonOptions,
    CarbonFileUploaderOptions,
    CarbonStructuredListOptions,
    CarbonTabsOptions,
} from '@jaspero/modular-components';


export enum Components {
    CarbonInput = 'carbon-input',
    CarbonSelect = 'carbon-select',
    CarbonChart = 'carbon-chart',
    CarbonDatepicker = 'carbon-datepicker',
    CarbonTable = 'carbon-table',
    CarbonTextarea = 'carbon-textarea',
    CarbonCheckbox = 'carbon-checkbox',
    CarbonRadio = 'carbon-radio',
    CarbonSlider = 'carbon-slider',
    CarbonToggle = 'carbon-toggle',
    CarbonAccordion = 'carbon-accordion',
    CarbonBreadcrumb = 'carbon-breadcrumb',
    CarbonButton = 'carbon-button',

    CarbonFileUploader = 'carbon-fileuploader',
    CarbonStructuredList = 'carbon-structuredlist',
    CarbonTabs = 'carbon-tabs',
}

export interface ComponentOptions {
    [Components.CarbonInput]: CarbonInputOptions;
    [Components.CarbonSelect]: CarbonSelectOptions;
    [Components.CarbonChart]: CarbonChartOptions;
    [Components.CarbonDatepicker]: CarbonDatePicker;
    [Components.CarbonTable]: CarbonTableOptions;
    [Components.CarbonTextarea]: CarbonTextareaOptions;
    [Components.CarbonCheckbox]: CarbonCheckboxOptions;
    [Components.CarbonRadio]: CarbonRadioOptions;
    [Components.CarbonAccordion]: CarbonAccordionOptions;
    [Components.CarbonBreadcrumb]: CarbonBreadcrumbOptions;
    [Components.CarbonButton]: CarbonButtonOptions;

    [Components.CarbonFileUploader]: CarbonFileUploaderOptions;
    [Components.CarbonStructuredList]: CarbonStructuredListOptions;

    [Components.CarbonTabs]: CarbonTabsOptions;
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
