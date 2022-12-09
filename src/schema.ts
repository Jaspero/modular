import {JSONSchema} from './interfaces/json-schema.interface';
import {ModularInstance} from './instance';

export class ModularSchema {
  private _schema: JSONSchema;

  constructor(
    schema: JSONSchema
  ) {
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

    return new ModularSchema(schema);
  }
}
