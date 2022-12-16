import {ModularSchema, ModularView, registerComponent} from '@jaspero/modular';
import {CarbonInput} from '@jaspero/modular-components/dist/components/carbon-input';

// console.log(CarbonInputOptions);


function setup() {
  // console.log(1);
  registerComponent('carbon-input', CarbonInput);
  console.log(CarbonInput);

  const schema = new ModularSchema({
    properties: {
      name: {
        type: 'string'
      }
    }
  });

  const instance = schema.createInstance({
    name: 'John'
  });

// instance.on('change', (data) => {

  const view = new ModularView({
    schema,
    views: [
      {
        items: [
          {
            field: '/name',
            component: 'carbon-input',
            options: {
              label: 'Name'
            }
          }
        ]
      }
    ]
  });

  view.render({
    parentElement: document.querySelector('#input-demo'),
    instance
  });
}

console.log(1);
document.readyState === 'complete' ? setup() : window.addEventListener('load', setup);
