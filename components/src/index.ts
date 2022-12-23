export * from './components';
export { CarbonChartOptions } from './components/carbon-chart/carbon-chart';
export { CarbonCheckboxOptions } from './components/carbon-checkbox/carbon-checkbox';
export { CarbonDatePickerOptions } from './components/carbon-datepicker/carbon-datepicker';
export { CarbonInputOptions } from './components/carbon-input/carbon-input';
export { CarbonRadioOptions } from './components/carbon-radio/carbon-radio';
export { CarbonSelectOptions } from './components/carbon-select/carbon-select';
export { CarbonSliderOptions } from './components/carbon-slider/carbon-slider';
export { CarbonTableOptions } from './components/carbon-table/carbon-table';
export { CarbonTextareaOptions } from './components/carbon-textarea/carbon-textarea';
export { CarbonToggleOptions } from './components/carbon-toggle/carbon-toggle';
export { CarbonAccordionOptions } from './components/carbon-accordion/carbon-accordion';
export { CarbonBreadcrumbOptions } from './components/carbon-breadcrumb/carbon-breadcrumb';
export { CarbonButtonOptions } from './components/carbon-button/carbon-button';
export { CarbonFileUploaderOptions } from './components/carbon-fileuploader/carbon-fileuploader';
export { CarbonStructuredListOptions } from './components/carbon-structuredlist/carbon-structuredlist';
export { CarbonTabsOptions } from './components/carbon-tabs/carbon-tabs';
export { CarbonSubmitOptions } from './components/carbon-submit/carbon-submit';

declare global {
  interface CarbonInput { }
  interface CarbonSelect { }
  interface CarbonChart { }
  interface CarbonDatePicker { }
  interface CarbonCheckbox { }
  interface CarbonRadio { }
  interface CarbonSlider { }
  interface CarbonTextarea { }
  interface CarbonTable { }
  interface CarbonToggle { }
  interface CarbonAccordion { }
  interface CarbonBreadcrumb { }
  interface CarbonButton { }
  interface CarbonFileUploader { }
  interface CarbonSubmit { }

  interface CarbonStructuredList { }

  interface CarbonTabs { }

}
