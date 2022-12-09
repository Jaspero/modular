export class ModularInputt extends HTMLElement {
  constructor() {
    super();

    // this.innerText = '123';
    this.attachShadow({ mode: 'open' });
    if (!this.shadowRoot) {
      return;
    }
    this.shadowRoot.innerHTML = `<h1>123</h1>`;

    // this.value = 'pero';
  }
  // constructor() {
  //   super();
  //
  //   this.addEventListener('change', this.changeHandler)
  // }
  //
  // changeHandler(value) {
  //   console.log(value);
  // };
  //
  // disconnectedCallback() {
  //   this.removeEventListener('change', this.changeHandler);
  // }

  // static get extends() {
  //   return 'input';
  // };
}
