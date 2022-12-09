import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'code_editor';
  schema: any;
  constructor() {
    this.schema = {
      "$schema": "http://json-schema.org/draft-07/schema#"
    }
  }
}
