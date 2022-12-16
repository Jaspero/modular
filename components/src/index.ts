export * from './components';

export { CarbonInputOptions } from './components/carbon-input/carbon-input';
export { CarbonSelectOptions } from './components/carbon-select/carbon-select';
export { CarbonChartOptions } from './components/carbon-chart/carbon-chart';
export { CarbonDatePickerOptions } from './components/carbon-datepicker/carbon-datepicker';

export { CarbonCheckboxOptions } from './components/carbon-checkbox/carbon-checkbox';
export { CarbonRadioOptions } from './components/carbon-radio/carbon-radio';
export { CarbonSliderOptions } from './components/carbon-slider/carbon-slider';
export { CarbonTextareaOptions } from './components/carbon-textarea/carbon-textarea';
export { CarbonTableOptions } from './components/carbon-table/carbon-table';
export { CarbonToggleOptions } from './components/carbon-toggle/carbon-toggle';
 
declare global {
  interface CarbonInput {}
  interface CarbonSelect {}
  interface CarbonChart {}
  interface CarbonDatePicker {}
  interface CarbonCheckbox {}
  interface CarnbonRadio {}
  interface CarbonSlider {}
  interface CarbonTextarea {}
  interface CarbonTable {}
  interface CarbonToggle {}
}
