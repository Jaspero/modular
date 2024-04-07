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
  let containerElement1: HTMLDivElement;

  const initialValue = {
    title: 7,
    meta: {
      title: 10
    }
  }

  onMount(() => {
    // TODO: Better solution
    window.ModularSchema = ModularSchema;
    window.ModularView = ModularView;

    const schema = new ModularSchema({});

    const instance = schema.createInstance(initialValue);
    const instance2 = schema.createInstance(initialValue);

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
              field: "/meta/image",
              options: {
                label: "Meta Image",
              },
            }
          ],
        },
      ],
    });

    const view2 = new ModularView({
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

    render.addEventListener("change", (value) => {
      console.log("value 1", value);
    });

    const render2 = view2.render({
      parentElement: containerElement1,
      instance: instance2,
    });

    render2.addEventListener("change", (value) => {
      console.log("value 2", value);
    });
  });
</script>

<p>Form 1</p>
<div bind:this={containerElement} />

<p>Form 2</p>
<div bind:this={containerElement1} />
