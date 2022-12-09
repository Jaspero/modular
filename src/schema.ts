import {JSONSchema} from './interfaces/json-schema.interface';
import Ajv from 'ajv';
import {ModularInstance} from './instance';
// const {validate} = require('jsonschema');
// var validate = require('jsonschema').validate;

export class ModularSchema {
  private _schema: JSONSchema;

  private _ajv: Ajv;

  constructor(
    schema: JSONSchema
  ) {
    this._ajv = new Ajv();
    this._schema = schema;
  }

  get schema() {
    return this._schema;
  }

  public createInstance(value: any) {
    return new ModularInstance({
      schema: this,
      value
    });
  }

  public static fromJSON(value: {
    [key: string]: any
  }) {
    const schema = Object.keys(value || {}).reduce((acc, key) => {
      (acc.properties as any)[key] = {
        type: Array.isArray(value[key]) ? 'array' : typeof value[key]
      };

      return acc;
    }, {
      properties: {}
    });
    console.log(schema);

    return new ModularSchema(schema);
  }
}
