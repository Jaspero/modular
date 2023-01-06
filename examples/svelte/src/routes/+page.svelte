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
      properties: {
        createdOn: { type: "number" },
        name: { type: "string" },
        active: { type: "number" },
        "functions.activeFunctions": { type: "number" },
        "functions.maxFunctions": { type: "number" },
        status: { type: "boolean" },
      },
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
              component: "carbon-table",
              options: {
                size: "short",
                colorSchema: "zebra",
                columns: [
                  {
                    label: "Name",
                    id: "name",
                  },
                  {
                    label: "Date",
                    id: "createdOn",
                    pipes: [
                      {
                        name: "date",
                        options: {
                          format: "dd/MM/yyyy",
                        },
                      },
                    ],
                  },
                  {
                    label: "Functions",
                    id: "functions.activeFunctions",
                  },
                  {
                    label: "Max Functions",
                    id: "functions.maxFunctions",
                  },
                  {
                    label: "Status",
                    id: "status",
                    component: "carbon-toggle",
                    options: {}
                  },
                  {
                    label: 'Active',
                    id: 'active',
                  }
                ],
                value: [
                  {
                    name: "John",
                    status: true,
                    createdOn: Date.now(),
                    "functions.activeFunctions": 1,
                    "functions.maxFunctions": 10,
                    active: 1,
                  },
                  {
                    name: "John",
                    status: true,
                    createdOn: Date.now(),
                    "functions.activeFunctions": 1,
                    "functions.maxFunctions": 10,
                    active: 1,
                  },
                  {
                    name: "John",
                    status: true,
                    createdOn: Date.now(),
                    "functions.activeFunctions": 1,
                    "functions.maxFunctions": 10,
                    active: 1,
                  },
                ],
              },
            },
          ],
        },
      ],
    } as any);

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
