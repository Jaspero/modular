import {Event, Component, h, Host, Method, Prop, State, EventEmitter} from '@stencil/core';
import '@carbon/web-components/dist/file-uploader.min.js';

export interface CarbonFileUploaderOptions {
  value?: any;
  helperText?: string;
  labelText?: string;
  styles?: string;

  size?: number;

  state?: string;

  deleteAssistiveText?: string;
  uploadingAssistiveText?: string;
  uploadedAssistiveText?: string;

  validityMessage?: string;
  accept?: string[];
  multiple?: boolean;

}

@Component({
  tag: 'carbon-fileuploader',
  styleUrl: 'carbon-fileuploader.css',
})

export class CarbonFileUploader {


  @State()
  @Prop()
  options: CarbonFileUploaderOptions = {};

  @Prop() value: any = this.options?.value



  @Event({
    eventName: 'open',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) valueChange: EventEmitter<any>;

  @Method()
  setOptions(options: CarbonFileUploaderOptions) {
    this.options = options;
  }

  @Method()
  setValue(value: any) {
    this.value = value;
  }

  handleChange(event) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
  }

  render() {
    return (
      <Host>
        <bx-file-uploader helper-text={this.options?.helperText} label-text={this.options?.labelText}>
          <bx-file-drop-container>
            Drag and drop files here to upload
          </bx-file-drop-container>
        </bx-file-uploader>
      </Host>
    );
  }
}
