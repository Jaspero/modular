<script lang="ts">
  /**
   * Must be able to serialize to JSON
   */
  import {
    ModularInstance,
    ModularSchema,
    ModularView,
  } from "@jaspero/modular";
  import { onMount } from "svelte";

  let containerElement: HTMLDivElement;

  onMount(() => {
    // TODO: Better solution
    window.ModularSchema = ModularSchema;
    window.ModularView = ModularView;

    const schema = new ModularSchema({
    });

    const instance = schema.createInstance({});

    const view = new ModularView({
      schema,
      views: [
        {
          justify: "center",
          container: "form",
          items: [
            {
              component: "carbon-contentswitcher",
              options: {
                values: [
                  {
                    label: "One",
                    selected: true
                  },
                  {
                    label: "Two",
                    selected: false
                  },
                ],
              }
            }
          ]
        }
      ]
    });

    // const view = new ModularView({
    //   schema,
    //   views: [
    //     {
    //       justify: "center",
    //       container: "form",
    //       items: [
    //         {
    //           component: "carbon-table",
    //           options: {
    //             size: "short",
    //             colorSchema: "zebra",
    //             columns: [
    //               {
    //                 label: "Name",
    //                 id: "name",
    //                 pipes: [
    //                   {
    //                     name: 'title'
    //                   }
    //                 ]
    //               },
    //               {
    //                 label: "Date",
    //                 id: "createdOn",
    //                 pipes: [
    //                   {
    //                     name: "date",
    //                     options: {
    //                       format: "MM/dd",
    //                     },
    //                   },
    //                 ],
    //               },
    //               {
    //                 label: "Functions",
    //                 id: "functions.activeFunctions",
    //               },
    //               {
    //                 label: "Max Functions",
    //                 id: "functions.maxFunctions",
    //               },
    //               {
    //                 label: "Status",
    //                 id: "status",
    //                 pipes: [
    //                   {
    //                     name: 'custom',
    //                     options: `(value) => \`<input type="checkbox" \${value ? 'checked' : ''} >\``
    //                   }
    //                 ]
    //               },
    //               {
    //                 label: 'Active',
    //                 id: 'active',
    //                 pipes: [
    //                   {
    //                     name: 'timeSince',
    //                     options: {
    //                       unit: 'months'
    //                     }
    //                   }
    //                 ]
    //               }
    //             ],
    //             value: [
    //               {
    //                 name: "asdasd",
    //                 status: true,
    //                 createdOn: Date.now(),
    //                 "functions.activeFunctions": 1,
    //                 "functions.maxFunctions": 10,
    //                 active: 1623019940773,
    //               },
    //               {
    //                 name: "qwe",
    //                 status: false,
    //                 createdOn: Date.now(),
    //                 "functions.activeFunctions": 1,
    //                 "functions.maxFunctions": 10,
    //                 active: 1623019940773,
    //               },
    //               {
    //                 name: "dasd",
    //                 status: true,
    //                 createdOn: Date.now(),
    //                 "functions.activeFunctions": 1,
    //                 "functions.maxFunctions": 10,
    //                 active: 1623019940773,
    //               },
    //             ],
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // } as any);

    const render = view.render({
      parentElement: containerElement,
      instance,
    });

    render.addEventListener("change", (value) => {
      console.log("the final", value);
    });
  });
</script>

<p>Rendered content</p>
<div bind:this={containerElement} />
