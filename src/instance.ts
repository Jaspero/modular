import {ModularSchema} from './schema';
import Ajv from 'ajv';

export class ModularInstance {
  private _schema: ModularSchema;
  private _ajv: Ajv;

  constructor(
    configuration: {
      schema: ModularSchema,
      value: any
    }
  ) {
    this._ajv = new Ajv();
    this._schema = configuration.schema;
    this._value = configuration.value;
  }

  private _value: any = {};

  get value() {
    return this._value;
  }

  set value(val: any) {
    this._value = val;
  }

  public update(value: any, options?: {
    merge?: boolean
  }) {
    if (options?.merge) {
      this._value = {
        ...this._value,
        ...value
      };
    } else {
      this._value = value;
    }
  }

  public valid() {
    const validate = this._ajv.compile(this._schema.schema);
    /**
     * TODO:
     * Fetch error list using validate.errors
     */
    return validate(this._value);
  }
}
