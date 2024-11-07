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
  import "@jaspero/web-components/dist/select.wc.js";
  import "@jaspero/web-components/dist/select.css";
  import "@jaspero/web-components/dist/input.css";
  import "@jaspero/web-components/dist/file-upload.wc.js";
  import "@jaspero/web-components/dist/file-upload.css";

  let containerElement: HTMLDivElement;
  let containerElement1: HTMLDivElement;

  const initialValue = {
    title: "",
    meta: {
      title: 10,
    },
  };

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
              component: "jp-select",
              field: "/type",
              options: {
                label: "Type",
                options: [
                  { value: "1", label: "Option 1" },
                  { value: "2", label: "Option 2" },
                  { value: "3", label: "Option 3" },
                ],
              },
            },
            {
              component: "jp-select",
              field: "/event",
              options: {
                label: "Event",
                name: "event",
                required: true,
                options: [
                  { value: "A", label: "Option 1" },
                  { value: "B", label: "Option 2" },
                  { value: "C", label: "Option 3" },
                ],
              },
              hidden: {
                deps: ["/type"],
                check: (value: { type: string }) => value.type === "1",
              },
            },
            {
              component: "jp-input",
              field: "/title",
              id: "title",
              options: {
                label: "Title",
                required: true,
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
              component: "jp-file-upload",
              field: "/meta/image",
              options: {
                label: "Meta Image",
              },
            },
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
            },
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

    // const render2 = view2.render({
    //   parentElement: containerElement1,
    //   instance: instance2,
    // });

    // render2.addEventListener("change", (value) => {
    //   console.log("value 2", value);
    // });
  });

  function submit() {
    console.log('Submit')
  }
</script>

<form on:submit|preventDefault={submit}>
  <p>Form 1</p>
  <div bind:this={containerElement} />
  <button type="submit">Submit</button>
</form>
<!-- 
<p>Form 2</p>
<div bind:this={containerElement1} /> -->
