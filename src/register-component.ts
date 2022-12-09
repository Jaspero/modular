export function registerComponent(name: string, component: CustomElementConstructor) {
  if (!window.modular) {
    window.modular = {
      components: {}
    };
  }

  if (!customElements.get(name)) {
    customElements.define(`modular-${name}`, component);

    window.modular.components[name] = component;
  }
}
