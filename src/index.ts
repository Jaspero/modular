import { CarbonCheckbox } from '@jaspero/modular-components/dist/components/carbon-checkbox';
import { CarbonDatepicker } from '@jaspero/modular-components/dist/components/carbon-datepicker';
import { CarbonInput } from '@jaspero/modular-components/dist/components/carbon-input';
import { CarbonRadio } from '@jaspero/modular-components/dist/components/carbon-radio';
import { CarbonSelect } from '@jaspero/modular-components/dist/components/carbon-select';
import { CarbonSlider } from '@jaspero/modular-components/dist/components/carbon-slider';
import { CarbonTable } from '@jaspero/modular-components/dist/components/carbon-table';
import { CarbonToggle } from '@jaspero/modular-components/dist/components/carbon-toggle';
import { registerComponent } from './register-component';
import { initializeCSSUtil } from './utils/css.util';
import {CarbonButton} from '@jaspero/modular-components/dist/components/carbon-button';
import {CarbonSubmit} from '@jaspero/modular-components/dist/components/carbon-submit';

declare global {
  interface Window {
    modular: {
      components: {
        [key: string]: CustomElementConstructor;
      };
    };
  }
}

/**
 * Types
 */
export * from './instance';
export * from './interfaces/json-schema.interface';
export * from './interfaces/view.interface';
export * from './register-component';
/**
 * Classes
 */
export * from './schema';
export * from './view';


initializeCSSUtil();

registerComponent('carbon-input', CarbonInput);
registerComponent('carbon-submit', CarbonSubmit);
registerComponent('carbon-button', CarbonButton);
registerComponent('carbon-select', CarbonSelect);
registerComponent('carbon-radio', CarbonRadio);
registerComponent('carbon-slider', CarbonSlider);
registerComponent('carbon-table', CarbonTable);
registerComponent('carbon-checkbox', CarbonCheckbox);
registerComponent('carbon-toggle', CarbonToggle);
registerComponent('carbon-datepicker', CarbonDatepicker);
