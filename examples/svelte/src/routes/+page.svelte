<script lang="ts">
  /**
   * Must be able to serialize to JSON
   */
  import { ModularSchema, ModularView } from "@jaspero/modular";
  import { onMount } from "svelte";

  let containerElement: HTMLDivElement;

  onMount(() => {
    const schema = new ModularSchema({
      properties: {
        name: {
          type: "string",
        },
        gender: {
          enum: ["male", "female", "other"],
        },
        check: {
          type: "boolean",
        },
      },
      required: ["name"],
    });

    const instance = schema.createInstance({
      name: "John",
      gender: "female",
      date: "2022-05-05",
    });

    const view = new ModularView({
      schema,
      views: [
        {
          justify: "center",
          items: [
            {
              field: "/check",
              component: "carbon-submit",
              options: {
                label: "Click me",
                kind: "primary",
                href: "https://github.com",
                disabled: false,
                method: 'POST',
                loadingText: 'Loading...',
                form: [
                  {
                    key: 'name',
                    pointer: '/name'
                  },
                  {
                    key: 'check2',
                    pointer: '/check'
                  }
                ]
              },
            },
            {
              field: "/check",
              component: "carbon-checkbox",
              options: {
                label: "Name",
              },
            },
            {
              field: "/check",
              component: "carbon-toggle",
              options: {
                label: "Name",
                checkedText: "Cool",
                uncheckedText: "Bla",
              },
            },
            {
              field: "/check",
              component: "carbon-slider",
              options: {
                label: "Name",
                min: 10,
                max: 50,
              },
            },
            {
              field: "/check",
              component: "carbon-radio",
              options: {
                label: "Bla",
                orientation: "vertical",
                name: "cool",
                items: [
                  {
                    value: "one",
                    label: "One",
                  },
                  {
                    value: "two",
                    label: "Two",
                  },
                  {
                    value: "three",
                    label: "Three",
                    disabled: true,
                  },
                ],
              },
            },
            {
              field: "/check",
              component: "carbon-table",
              options: {
                size: 'compact',
                colorSchema: 'zebra',
                search: {
                  placeholder: 'Search'
                },
                button: {
                  label: 'Add New',
                  url: '/new'
                },
                pagination: {
                  sizeOptions: [
                    5,
                    10,
                    15,
                    20
                  ],
                  total: 1000
                },
                fromEndpoint: {
                  url: 'http://localhost:2001/api/documents/pagination/invoices'
                },
                columns: [
                  {
                    label: "ID",
                    id: "_id",
                  },
                  {
                    label: "Name",
                    id: "name",
                  },
                ]
              }
            },
            {
              field: "/check",
              component: "carbon-accordion",
              options: {
                value: [
                  {
                    label: "One",
                    content: "Content",
                  },
                  {
                    label: "Two",
                    content: "Content",
                  },
                ],
              },
            },
            {
              field: "/check",
              component: "carbon-breadcrumb",
              options: {
                value: [
                  {
                    label: "youtube",
                    link: "https://youtube.com",
                  },
                  {
                    label: "github",
                    link: "https://github.com",
                  },
                ],
              },
            },
            {
              field: "/check",
              component: "carbon-fileuploader",
              options: {
                helperText: "Upload your favourite image",
                labelText: "Upload",
                accept: ["image/*"],
                multiple: true,
              },
            },
          ],
        },
      ],
    } as any);

    view.render({
      parentElement: containerElement,
      instance,
    });
  });
</script>

<div bind:this={containerElement} />
