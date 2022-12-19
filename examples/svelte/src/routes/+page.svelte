<script lang="ts">
    /**
     * Must be able to serialize to JSON
     */

    import {
        ModularSchema,
        ModularView,
        registerComponent
    } from "@jaspero/modular";
    import {CarbonCheckbox} from "@jaspero/modular-components/dist/components/carbon-checkbox";
    import {CarbonDatepicker} from "@jaspero/modular-components/dist/components/carbon-datepicker";
    import {CarbonInput} from "@jaspero/modular-components/dist/components/carbon-input";
    import {CarbonRadio} from "@jaspero/modular-components/dist/components/carbon-radio";
    import {CarbonSelect} from "@jaspero/modular-components/dist/components/carbon-select";
    import {CarbonSlider} from "@jaspero/modular-components/dist/components/carbon-slider";
    import {CarbonTable} from "@jaspero/modular-components/dist/components/carbon-table";
    import {CarbonTextarea} from "@jaspero/modular-components/dist/components/carbon-textarea";
    import {CarbonToggle} from "@jaspero/modular-components/dist/components/carbon-toggle";
    import {onMount} from "svelte";
    import {CarbonAccordion} from "@jaspero/modular-components/dist/components/carbon-accordion";
    import {CarbonBreadcrumb} from "@jaspero/modular-components/dist/components/carbon-breadcrumb";

    let containerElement: HTMLDivElement;

    onMount(() => {
        registerComponent("carbon-input", CarbonInput);
        registerComponent("carbon-select", CarbonSelect);
        registerComponent("carbon-datepicker", CarbonDatepicker);
        registerComponent("carbon-radio", CarbonRadio);
        registerComponent("carbon-checkbox", CarbonCheckbox);
        registerComponent("carbon-toggle", CarbonToggle);
        registerComponent("carbon-slider", CarbonSlider);
        registerComponent("carbon-textarea", CarbonTextarea);
        registerComponent("carbon-table", CarbonTable);
        registerComponent("carbon-accordion", CarbonAccordion);
        registerComponent("carbon-breadcrumb", CarbonBreadcrumb);
        const schema = new ModularSchema({
            properties: {
                name: {
                    type: "string",
                },
                gender: {
                    enum: ["male", "female", "other"],
                },
                check: {
                    type: "boolean"
                }
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
                            component: "carbon-checkbox",
                            options: {
                                label: "Name",
                            }
                        },
                        {
                            field: "/check",
                            component: "carbon-toggle",
                            options: {
                                label: "Name",
                                checkedText: "Cool",
                                uncheckedText: "Bla"
                            }
                        },
                        {
                            field: "/check",
                            component: "carbon-slider",
                            options: {
                                label: "Name",
                                min: 10,
                                max: 50
                            }
                        },
                        {
                            field: '/check',
                            component: 'carbon-radio',
                            options: {
                                label: 'Bla',
                                orientation: 'vertical',
                                name: 'cool',
                                items: [
                                    {
                                        value: 'one',
                                        label: 'One'
                                    },
                                    {
                                        value: 'two',
                                        label: 'Two'
                                    },
                                    {
                                        value: 'three',
                                        label: 'Three',
                                        disabled: true
                                    }
                                ]
                            }
                        },
                        {
                            field: '/check',
                            component: 'carbon-table',
                            options: {
                                columns: [
                                    {
                                        label: 'One',
                                        id: 'one'
                                    },
                                    {
                                        label: 'Two',
                                        id: 'two'
                                    }
                                ],
                                rows: [
                                    {
                                        one: '1',
                                        two: '2'
                                    },
                                    {
                                        one: '1',
                                        two: '2'
                                    }
                                ]
                            }
                        },
                        {
                            field: '/check',
                            component: 'carbon-accordion',
                            options: {
                                value: [
                                    {
                                        label: 'One',
                                        content: 'Content'
                                    },
                                    {
                                        label: 'Two',
                                        content: 'Content'
                                    }
                                ]

                            }
                        },
                        {
                            field: '/check',
                            component: 'carbon-breadcrumb',
                            options: {
                                value: [
                                    {
                                        label: 'youtube',
                                        link: 'https://youtube.com'
                                    },
                                    {
                                        label: 'github',
                                        link: 'https://github.com'
                                    }
                                ]
                            }
                        }
                    ]
                }
            ],
        } as any);

        view.render({
            parentElement: containerElement,
            instance,
        });
    });
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

<div bind:this={containerElement}/>
