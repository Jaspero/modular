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
  import './style.css';
  import "@jaspero/web-components/dist/input.wc.js";
  import "@jaspero/web-components/dist/select.wc.js";
  import "@jaspero/web-components/dist/select.css";
  import "@jaspero/web-components/dist/input.css";
  import "@jaspero/web-components/dist/file-upload.wc.js";
  import "@jaspero/web-components/dist/file-upload.css";

  let containerElement: HTMLDivElement;
  let render: any;

  let initialValue = {
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

    const view = new ModularView({
      componentPrefix: "",
      schema,
      views: [
        {
          items: [
            {
              component: 'jp-input',
              field: '/title',
              options: {
                label: 'Title',
                name: 'title',
                required: true
              }
            },
            {
              component: 'jp-select',
              field: '/navigationType',
              options: {
                label: 'Navigation Type',
                name: 'navigationType',
                required: true,
                options: [
                  {
                    label: 'Screen',
                    value: 'screen'
                  },
                  {
                    label: 'Brand',
                    value: 'brand'
                  }
                ]
              }
            },
            {
              component: 'jp-select',
              field: '/routeTo',
              options: {
                label: 'Route To',
                name: 'routeTo',
                required: true,
                options: [
                  { value: 'Settings', label: 'Settings' },
                  { value: 'SearchStack', label: 'SearchStack' }
                ]
              },
              hidden: {
                deps: ['/navigationType'],
                check: (value: { navigationType: string }) => value.navigationType !== 'brand'
              }
            },
            {
              component: 'jp-select',
              field: '/screen',
              options: {
                label: 'Screen',
                name: 'screen',
                required: true,
                options: [
                  { value: 'Search', label: 'Search' },
                  { value: 'SingleEvent', label: 'SingleEvent' }
                ]
              },
              hidden: {
                deps: ['/routeTo'],
                check: (value: { routeTo: string }) => value.routeTo === 'SearchStack'
              }
            },
            {
              component: 'jp-select',
              field: '/paramId',
              options: {
                label: 'Event',
                name: 'paramId',
                options: [{value: 'event', label: 'event'}]
              },
              hidden: {
                deps: ['/screen'],
                check: (value: { screen: string }) => value.screen === 'SingleEvent'
              }
            },
            {
              component: 'jp-select',
              field: '/brand',
              options: {
                label: 'Brand',
                name: 'brand',
                required: true,
                options: [{value: 'event', label: 'Brand'}]
              },
              hidden: {
                deps: ['/navigationType'],
                check: (value: { navigationType: string }) => value.navigationType !== 'screen'
              }
            },
            {
              component: 'jp-input',
              field: '/promotionalTitle',
              options: {
                label: 'Promotional Title',
                name: 'promotionalTitle',
                required: true
              },
              hidden: {
                deps: ['/navigationType'],
                check: (value: { navigationType: string }) => value.navigationType !== 'screen'
              }
            },
            {
              component: 'jp-textarea',
              field: '/promotionalDescription',
              options: {
                label: 'Promotional Description',
                name: 'promotionalDescription',
                required: true
              },
              hidden: {
                deps: ['/navigationType'],
                check: (value: { navigationType: string }) => value.navigationType !== 'screen'
              }
            },
            {
              component: 'jp-input',
              field: '/promotionalImage',
              options: {
                label: 'Promotional Image',
                name: 'promotionalImage',
                required: true
              },
              hidden: {
                deps: ['/navigationType'],
                check: (value: { navigationType: string }) => value.navigationType !== 'screen'
              }
            },
            {
              component: 'jp-select',
              field: '/event',
              options: {
                label: 'Brand Event',
                name: 'event',
                required: true,
                options: [{value: 'event', label: 'event'}]
              },
              hidden: {
                deps: ['/navigationType'],
                check: (value: { navigationType: string }) => value.navigationType === 'brand'
              }
            }
          ],
        },
      ],
    });

    render = view.render({
      parentElement: containerElement,
      instance,
    });

    render.addEventListener("change", (value) => {
      console.log("value 1", value);
      initialValue = value;
    });
  });

  async function submit() {
    console.log('Submit')
    console.log(222, await render.getValue())
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
