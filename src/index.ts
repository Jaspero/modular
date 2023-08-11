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


export * from './utils/css.util';
