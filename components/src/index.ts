export * from './components';

export { CarbonInputOptions } from './components/carbon-input/carbon-input';
export { CarbonSelectOptions } from './components/carbon-select/carbon-select';

declare global {
  interface CarbonInput {}
  interface CarbonSelect {}
}
