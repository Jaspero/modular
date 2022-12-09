import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {CodeEditorComponent} from "./components/code-editor/code-editor.component";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MonacoEditorModule} from "ng-monaco-editor";
import {MatButtonModule} from '@angular/material/button';
import {LoadClickModule} from '@jaspero/ng-helpers';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpClient, HttpClientModule} from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'code-editor',
        component: CodeEditorComponent
      },
      {
        path: 'block-code-editor',
        component: CodeEditorComponent
      },

      {
        path: '**',
        redirectTo: '/code-editor'
      }
    ]
  }
];

const COMPONENTS = [
  DashboardComponent,
  CodeEditorComponent,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    CodeEditorComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    HttpClientModule,

    /**
     * Material
     */
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
    MonacoEditorModule,
    MatButtonModule,
    LoadClickModule
  ],
  providers: [
    MatSnackBar
  ]
})
export class DashboardModule {
}
