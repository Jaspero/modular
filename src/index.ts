import {initializeCSSUtil} from './utils/css.util';

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
