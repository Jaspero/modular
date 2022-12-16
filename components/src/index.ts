export * from './components';

export { CarbonInputOptions } from './components/carbon-input/carbon-input';
export { CarbonSelectOptions } from './components/carbon-select/carbon-select';
export { CarbonChartOptions } from './components/carbon-chart/carbon-chart';
export { CarbonDatePickerOptions } from './components/carbon-datepicker/carbon-datepicker';

declare global {
  interface CarbonInput {}
  interface CarbonSelect {}
  interface CarbonChart {}
  interface CarbonDatePicker {}
}
