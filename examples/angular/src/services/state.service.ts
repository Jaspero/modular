import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class StateService {

  constructor() {
  }

  page: 'home' | 'code-editor' | undefined;
}
