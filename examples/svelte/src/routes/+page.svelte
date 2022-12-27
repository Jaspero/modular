<script lang="ts">
  /**
   * Must be able to serialize to JSON
   */
  import { ModularSchema, ModularView } from "@jaspero/modular";
  import { onMount } from "svelte";

  let containerElement: HTMLDivElement;

  onMount(() => {

    // TODO: Better solution
    window.ModularSchema = ModularSchema;
    window.ModularView = ModularView;

    const schema = new ModularSchema({
      properties: {
        name: {type: 'string'},
        people: {type: 'array'}
      },
      required: ["name"],
    });

    const instance = schema.createInstance({
      name: "John",
      people: [
        {firstName: 'pero'}
      ]
    });

    const view = new ModularView({
      schema,
      views: [
        {
          justify: "center",
          container: 'form',
          items: [
            {
              field: '/name',
              component: 'carbon-input',
              columns: 6
            },
            {
              field: "/people",
              component: "carbon-object-array",
              options: {
                label: 'People',
                description: `Please list some people`,
                addLabel: 'Add person',
                properties: {
                  firstName: {type: 'string'},
                  lastName: {type: 'string'} 
                },
                views: [
                  {
                    items: [
                      {
                        field: '/firstName',
                        component: 'carbon-input',
                        columns: 6,
                        options: {
                          label: 'First Name'
                        }
                      },
                      {
                        field: '/lastName',
                        component: 'carbon-input',
                        columns: 6,
                        options: {
                          label: 'Last Name'
                        }
                      }
                    ]
                  }
                ]
              },
            },
            {
              field: '/name',
              component: 'carbon-submit',
              options: {
                method: 'POST',
                form: [
                  {pointer: '/name'},
                  {pointer: '/people'}
                ]
              }
            }
          ],
        },
      ],
    } as any);

    const render = view.render({
      parentElement: containerElement,
      instance
    });

    render.addEventListener('change', value => {
      console.log('the final', value);
    })
  });
</script>

<p>Rendered content</p>
<div bind:this={containerElement} />
