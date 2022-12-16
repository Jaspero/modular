import {AfterViewInit, Component, ElementRef, Injectable, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import loader, {Monaco} from '@monaco-editor/loader';
import {BehaviorSubject, catchError, of, startWith, Subscription, switchMap, tap} from 'rxjs';
import {ModularSchema, ModularView, registerComponent} from '@jaspero/modular';
import {CarbonInput} from '@jaspero/modular-components/dist/components/carbon-input';
import {CarbonSelect} from '@jaspero/modular-components/dist/components/carbon-select';
import {CarbonChart} from '@jaspero/modular-components/dist/components/carbon-chart';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import {editor} from "monaco-editor";

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
  values: any[] = [];
  currentValue = '';

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
                    $ref: 'rules',
                  },
                  views: {
                    type: 'array'
                  }
                },
                required: ['id']
              }
            },
            {
              uri: 'database-service',
              schema: {
                properties: {
                  service: {
                    type: 'string',
                    enum: ['database']
                  },
                  function: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        enum: [
                          'createdocument',
                          'updatedocument',
                          'deletedocument',
                          'createdocuments',
                          'updatedocuments',
                          'deletedocuments',
                        ]
                      },
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
                  }
                }
              }
            },
            {
              uri: 'email-service',
              schema: {
                properties: {
                  service: {
                    type: 'string',
                    enum: ['email']
                  },
                  function: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        enum: [
                          'sendemail'
                        ]
                      },
                      context: {
                        type: 'object',
                        properties: {
                          message: {
                            type: 'string',
                          },
                          to: {
                            type: 'string'
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              uri: 'storage-service',
              schema: {
                properties: {
                  service: {
                    type: 'string',
                    enum: ['storage']
                  },
                  function: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        enum: [
                          'createfile',
                          'updatefile',
                          'deletefile',
                          'createfolder',
                          'updatefolder',
                          'deletefolder',
                        ]
                      },
                      context: {
                        type: 'object',
                        properties: {
                          choose_file: {
                            type: 'string',
                            enum: ['file1', 'file2', 'file3']
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              uri: 'transcription-service',
              schema: {
                properties: {
                  service: {
                    type: 'string',
                    enum: ['transcription']
                  },
                  function: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        enum: [
                          'transcribe',
                        ]
                      },
                      context: {
                        type: 'object',
                        properties: {
                          type: {
                            enum: ['text to speech', 'speech to text']
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              uri: 'user-manager-service',
              schema: {
                properties: {
                  service: {
                    type: 'string',
                    enum: ['user-manager']
                  },
                  function: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        enum: [
                          'createuser',
                          'updateuser',
                          'deleteuser',
                        ]
                      },
                      context: {
                        type: 'object',
                        properties: {
                          choose_user: {
                            type: 'string',
                            enum: ['user1', 'user2', 'user3']
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              uri: 'push-notifications-service',
              schema: {
                properties: {
                  service: {
                    type: 'string',
                    enum: ['push-notifications']
                  },
                  function: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        enum: [
                          'sendpushnotification',
                        ]
                      },
                      context: {
                        type: 'object',
                        properties: {
                          to: {
                            type: 'string',
                            enum: ['all', 'selected']
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              uri: 'messaging-service',
              schema: {
                properties: {
                  service: {
                    type: 'string',
                    enum: ['messaging']
                  },
                  function: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        enum: [
                          'sendmessage',
                          'createconversation',
                          'deleteconversation',
                          'addprincipal',
                          'removeprincipal',
                        ]
                      },
                      context: {
                        type: 'object',
                        properties: {
                          with: {
                            type: 'string',
                            enum: ['user1', 'user2', 'user3']
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              uri: 'payments-service',
              schema: {
                properties: {
                  service: {
                    type: 'string',
                    enum: ['payments']
                  },
                  function: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        enum: [
                          'charge', 'payout'
                        ]
                      },
                      context: {
                        type: 'object',
                        properties: {
                          charge: {
                            type: 'object',
                            properties: {
                              who_to_charge: {
                                type: 'string',
                                enum: ['user1', 'user2', 'user3']
                              },
                              amount: {
                                type: 'number',
                                enum: [10, 100, 1000, 10000, 100000]
                              },
                              what_is_charged: {
                                type: 'string',
                                enum: ['storage', 'database', 'messaging', 'transcription']
                              },
                              how_is_charged: {
                                type: 'string',
                                enum: ['one-time', 'recurring']
                              }
                            }
                          },
                          payout: {
                            type: 'object',
                            properties: {
                              who_to_payout: {
                                type: 'string',
                                enum: ['user1', 'user2', 'user3']
                              },
                              amount: {
                                type: 'number',
                                enum: [10, 100, 1000, 10000, 100000]
                              },
                              how_is_paid: {
                                type: 'string',
                                enum: ['one-time', 'in installments']
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            {
              uri: 'json-schema',
              schema: {
                type: 'object',
                properties: {
                  properties: {
                    type: 'object',
                    patternProperties: {
                      '.*': {
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
                    }

                  }

                }
              },


            },
            {
              uri: 'rules',
              schema:
                {
                  type: 'array',
                  items: {
                    type: 'object',
                    anyOf: [
                      {
                        properties: {
                          id: {
                            type: 'string'
                          },
                          description: {
                            type: 'string'
                          },
                          trigger: {
                            type: 'string',
                            enum: ['onCreate', 'onUpdate', 'onDelete'],
                            default: 'onCreate'
                          },
                          needs: {
                            type: 'string'
                          }
                        }
                      },
                      {
                        $ref: 'database-service'
                      },
                      {
                        $ref: 'email-service'
                      },
                      {
                        $ref: 'storage-service'
                      },
                      {
                        $ref: 'transcription-service'
                      },
                      {
                        $ref: 'user-manager-service'
                      },
                      {
                        $ref: 'push-notifications-service'
                      },
                      {
                        $ref: 'messaging-service'
                      },
                      {
                        $ref: 'payments-service'
                      }
                    ]
                  },
                }
            }
          ]
        });

        const editor = monaco.editor.create(this.editorElement.nativeElement, options);
        const valueEditor = monaco.editor.create(this.valueEditorElement.nativeElement, options);
        editor.setValue(`{\n\t\n}`);
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

          //   this.control.valueChanges.subscribe((value) => {
          //   contentInsideTab.push(value)
          // });
          this.control.valueChanges.subscribe((value) => {
            this.currentValue = value;
          });

          console.log(this.currentValue);

      }
    );
  }

  tabs$ = new BehaviorSubject(['Collections']);
  selected = new FormControl(0);

  addTab() {
    let text;
    let nameOfTab = prompt("Please enter the name of your tab", "Tab");
    if (nameOfTab == null || nameOfTab == "") {
      text = "User cancelled the prompt.";
    } else {
      text = nameOfTab;
    }
    this.tabs$.next([...this.tabs$.getValue(), text]);

  }
  selectTab() {
    console.log(this.currentValue);
    if(this.currentValue != null || this.currentValue != '{}') {
      this.values.push(this.currentValue)
    }
    console.log(this.values);
  }

  removeTab(index: number) {
    this.tabs$.value.splice(index, 1);
  }

  ngAfterViewInit() {
    console.log(this.iframeElement);

    registerComponent('carbon-input', CarbonInput);
    registerComponent('carbon-select', CarbonSelect);
    registerComponent('carbon-chart', CarbonChart);

    let viewInstance: any = null;

    this.controlSubscription = this.control.valueChanges.pipe(
      startWith(this.control.value),
      tap((value: string) => {

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
        catchError((error: { message: any; }) => {
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
        catchError((error: { message: any; }) => {
          this.snack.open(error.message, 'Dismiss', {
            duration: 3000
          });
          return of(true);
        })
      );
    }
  }

  onRender(el: any) {
    console.log(el)
  }
}
