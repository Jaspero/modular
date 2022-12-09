import {AfterViewInit, Component, ElementRef, Injectable, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import loader, {Monaco} from '@monaco-editor/loader';
import {catchError, of, startWith, Subscription, switchMap, tap} from 'rxjs';
import {ModularSchema, ModularView, registerComponent} from '@jaspero/modular';
import {CarbonInput} from '@jaspero/modular-components/dist/components/carbon-input';
import {CarbonSelect} from '@jaspero/modular-components/dist/components/carbon-select';
import {CarbonChart} from '@jaspero/modular-components/dist/components/carbon-chart';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  monaco: Monaco;

  control: FormControl;

  @ViewChild('editor')
  editorElement: ElementRef;

  @ViewChild('valueEditor')
  valueEditorElement: ElementRef;

  @ViewChild('iframe')
  iframeElement: ElementRef;

  @ViewChild('render')
  renderElement: ElementRef;

  controlSubscription: Subscription;

  constructor(
    private snack: MatSnackBar,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
    this.control = new FormControl<string>('');
    loader.init().then(monaco => {

        this.monaco = monaco;
        const options = {
          language: 'json',
          theme: 'vs-dark',
          automaticLayout: true,
          value: '',

        };


        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
          validate: true,
          schemas: [
            {
              uri: 'editor',
              fileMatch: ['*'],
              schema: {
                type: 'object',
                properties: {
                  id: {
                    type: 'string'
                  },
                  schema: {
                    $ref: 'json-schema'
                  },
                  rules: {
                    $ref: 'rules'
                  },
                  views: {
                    type: 'array'
                  }
                },
                required: ['id']
              }
            },
            {
              uri: 'json-schema',
              schema: {
                type: 'object',
                patternProperties: {
                  '^.*$': {
                    anyOf: [
                      {
                        type: 'object',
                        properties: {
                          type: {
                            enum: ['string', 'number', 'boolean', null]
                          },
                        },
                      },
                      {
                        type: 'object',
                        properties: {
                          type: {
                            enum: ['object']
                          },
                          properties: {
                            $ref: 'json-schema'
                          }
                        },
                      },
                      {
                        type: 'object',
                        properties: {
                          type: {
                            enum: ['array']
                          },
                          items: {
                            type: 'object',
                            properties: {
                              $ref: 'json-schema'
                            }
                          }
                        },
                      },
                    ]
                  }
                },
                'additionalProperties': false
              }
            },
            {
              uri: 'rules',
              schema:
                {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                      },
                      function: {
                        type: 'object',
                        oneOf: [
                          {
                            properties: {
                              id: {const: 'createdocument'},
                              context: {
                                type: 'object',
                                properties: {
                                  destination: {
                                    type: 'string',
                                    enum: ['orders', 'invoices', 'users']
                                  }
                                }
                              }
                            }
                          },
                          {
                            properties: {
                              id: {const: 'deletedocument'},
                              context: {
                                type: 'object',
                                properties: {
                                  example: {
                                    type: 'string',
                                    enum: ['one', 'two']
                                  }
                                }
                              }
                            }
                          }
                        ]
                      },

                      instance: {
                        type: 'string',
                        enum: [
                          'small', 'medium', 'large'
                        ]
                      },
                    }
                  }
                }
            }
          ]
        });

        const editor = monaco.editor.create(this.editorElement.nativeElement, options);
        const valueEditor = monaco.editor.create(this.valueEditorElement.nativeElement, options);
        // editor.setValue(`{\n\t\n}`);
        // editor.setValue(`{\n\t"schema": {\n\t\t"name": {\n\t\t\t"type": "string"\n\t\t}\n\t}\n}`);
        editor.setValue(`{
    "id": "users",
    "schema": {
        "name": {
            "type": "string"
        },
        "surname": {
            "type": "string"
        },
        "sales": {
            "type": "object",
            "properties": {
                "data": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    }
                },
                "labels": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            }
        }
    },
    "views": [
        {
            "align": "center",
            "items": [
                {
                    "field": "/name",
                    "component": "carbon-input",
                    "options": {
                        "label": "Name"
                    }
                },
                {
                    "field": "/surname",
                    "component": "carbon-input",
                    "options": {
                        "label": "Surname",
                        "hint": "This is a hint"
                    }
                },
                {
                    "field": "/sales",
                    "component": "carbon-chart",
                    "options": {
                        "label": "Sales per month"
                    }
                }
            ]
        }
    ],
    "rules": [
        {
            "function": {
                "id": "createdocument",
                "context": {
                    "destination": "invoices"
                }
            }
        }
    ]
}
`);
        valueEditor.setValue(`{
    "name": "John",
    "surname": "Doe",
    "sales": {
        "data": [10, 5, 20, 17, 3, 22, 90, 20, 3, 40, 5, 6, 2, 2, 2],
        "labels":  ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    }
}`);

        const handleChange = () => {
          const editorValue = editor.getValue();
          const valueEditorValue = valueEditor.getValue();
          try {
            const value1 = JSON.parse(editorValue);
            const value2 = JSON.parse(valueEditorValue);
            this.control.setValue(JSON.stringify({
              ...value1,
              ...{
                value: value2
              }
            }));
          } catch (e) {
            this.control.setValue('{}');
          }
        }

        setTimeout(() => {
          handleChange();
        }, 500);

        const model = editor.getModel();
        model.onDidChangeContent(() => {
          handleChange();
        });

        const valueModel = valueEditor.getModel();
        valueModel.onDidChangeContent(() => {
          handleChange();
        });

      }
    );
  }

  ngAfterViewInit() {
    console.log(this.iframeElement);

    registerComponent('carbon-input', CarbonInput);
    registerComponent('carbon-select', CarbonSelect);
    registerComponent('carbon-chart', CarbonChart);

    let viewInstance: any = null;

    this.controlSubscription = this.control.valueChanges.pipe(
      startWith(this.control.value),
      tap((value) => {

        let json = null;
        try {
          json = JSON.parse(value);
        } catch (error) {
          return;
        }

        if (!json || !json.schema || !json.views) {
          return;
        }


        const schema = new ModularSchema({
          properties: json.schema
        });

        const instance = schema.createInstance(json.value || {});

        const view = new ModularView({
          schema,
          views: json.views
        });

        viewInstance?.destroy();

        viewInstance = view.render({
          instance,
          parentElement: this.renderElement.nativeElement
        });
      })
    ).subscribe();

  }

  ngOnDestroy() {
    this.controlSubscription.unsubscribe();
  }

  saveDocument() {
    return () => {
      return of(true).pipe(
        switchMap(() => {
          const value = JSON.parse(this.control?.value?.value || '{}');
          console.log('Sending to /api/document', value);
          return this.http.post('http://localhost:3000/api/document', value);
        }),
        tap(() => {
          this.snack.open('Document saved', 'Dismiss', {
            duration: 3000
          });
        }),
        catchError((error) => {
          this.snack.open(error.message, 'Dismiss', {
            duration: 3000
          });
          return of(true);
        })
      );
    }
  }

  saveSchema() {
    return () => {
      return of(true).pipe(
        switchMap(() => {
          const value = {
            ...(JSON.parse(this.control?.value || '{}'))
          };

          if (typeof value.value === 'string') {
            value.value = JSON.parse(value.value);
          }

          delete value.value;

          console.log('Sending to /api/collection', value);
          return this.http.post('http://localhost:3000/api/collection', value);
        }),
        tap(() => {
          this.snack.open('Schema saved', 'Dismiss', {
            duration: 3000
          });
        }),
        catchError((error) => {
          this.snack.open(error.message, 'Dismiss', {
            duration: 3000
          });
          return of(true);
        })
      );
    }
  }
}
