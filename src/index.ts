import {initializeCSSUtil} from './utils/css.util';
import {CarbonInput} from '@jaspero/modular-components/dist/components/carbon-input';
import {CarbonSelect} from '@jaspero/modular-components/dist/components/carbon-select';
import {registerComponent} from './register-component';

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
export * from './interfaces/json-schema.interface';
export * from './interfaces/view.interface';

/**
 * Classes
 */
export * from './schema';
export * from './instance';
export * from './view';
export * from './register-component';

initializeCSSUtil();

registerComponent('carbon-input', CarbonInput);
registerComponent('carbon-select', CarbonSelect);
