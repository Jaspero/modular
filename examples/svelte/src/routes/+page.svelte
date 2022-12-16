<script lang="ts">
  /**
   * Must be able to serialize to JSON
   */

  import {Components, ModularSchema, ModularView, registerComponent} from '@jaspero/modular';
  import {onMount} from 'svelte';
  import {CarbonInput} from '@jaspero/modular-components/dist/components/carbon-input';
  import {CarbonSelect} from '@jaspero/modular-components/dist/components/carbon-select';
  import {CarbonDatepicker} from '@jaspero/modular-components/dist/components/carbon-datepicker';
    import { CarbonRadio } from '@jaspero/modular-components/dist/types/components/carbon-radio/carbon-radio';
    import { CarbonCheckbox } from '@jaspero/modular-components/dist/types/components/carbon-checkbox/carbon-checkbox';

  let containerElement: HTMLDivElement;

  onMount(() => {
    registerComponent('carbon-input', CarbonInput);
    registerComponent('carbon-select', CarbonSelect);
    registerComponent('carbon-datepicker', CarbonDatepicker);
    registerComponent('carbon-radio', CarbonRadio);
    registerComponent('carbon-checkbox', CarbonCheckbox);

    const schema = new ModularSchema({
      properties: {
        name: {
          type: 'string'
        },
        gender: {
          enum: ['male', 'female', 'other']
        }
      },
      required: ['name']
    });

    const instance = schema.createInstance({
      name: 'John',
      gender: 'female',
      date: '2022-05-05'
    });

    const view = new ModularView({
      schema,
      views: [
        {
          align: 'center',
          items: [
            {
              field: '/name',
              component: 'carbon-input',
              options: {
                label: 'Name'
              },
              columns: {
                desktop: 6
              }
            },
            {
              field: '/gender',
              component: 'carbon-select',
              columns: {
                desktop: 6,
                tablet: 12
              },
              options: {
                label: 'Gender',
                items: [
                  {
                    label: 'Male',
                    value: 'male'
                  },
                  {
                    label: 'Female',
                    value: 'female'
                  },
                  {
                    label: 'Other',
                    value: 'other'
                  }
                ]
              }
            },
            {
              field: '/date',
              component: Components.CarbonDatepicker,
              columns: {
                desktop: 6,
                tablet: 12
              },
              options: {
                kind: 'single'
              }
            }
          ]
        },
        {
          justify: 'center',
          items: [
            {
              field: '/name',
              component: 'carbon-input',
              options: {
                label: 'Name'
              },
              columns: {
                desktop: 6,
                tablet: 12,
                mobile: 12
              }
            }
          ]
        }
      ]
    });

    const instanceRender = view.render({
      parentElement: containerElement,
      instance
    });
  });

</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<div bind:this={containerElement}></div>
