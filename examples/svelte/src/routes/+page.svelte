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
  import "@jaspero/web-components/dist/input.wc.js";

  let containerElement: HTMLDivElement;

  onMount(() => {
    // TODO: Better solution
    window.ModularSchema = ModularSchema;
    window.ModularView = ModularView;

    const schema = new ModularSchema({});

    const instance = schema.createInstance({});

    const view = new ModularView({
      componentPrefix: "",
      schema,
      views: [
        {
          items: [
            {
              component: "jp-input",
              field: "/title",
              id: "title",
              options: {
                label: "Title",
              },
            },
            {
              component: "jp-input",
              field: "/meta/title",
              id: "meta.title",
              options: {
                label: "Meta Title",
              },
            },
            {
              component: "jp-input",
              field: "/meta/keywords",
              options: {
                label: "Meta Keywords",
              },
            }
          ],
        },
      ],
    });

    const render = view.render({
      parentElement: containerElement,
      instance,
    });

    render.setValue({
      meta: {
        title: 'cool',
        keywords: 'bla'
      }
    })

    render.addEventListener("change", (value) => {
      console.log("the final", value);
    });
  });
</script>

<p>Rendered content</p>
<div bind:this={containerElement} />
