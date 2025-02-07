/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { CarbonAccordionOptions } from "./components/carbon-accordion/carbon-accordion";
import { CarbonBreadcrumbOptions } from "./components/carbon-breadcrumb/carbon-breadcrumb";
import { CarbonButtonOptions } from "./components/carbon-button/carbon-button";
import { CarbonChartOptions } from "./components/carbon-chart/carbon-chart";
import { CarbonCheckboxOptions } from "./components/carbon-checkbox/carbon-checkbox";
import { CarbonContentSwitcherOptions } from "./components/carbon-contentswitcher/carbon-contentswitcher";
import { CarbonDatePickerOptions } from "./components/carbon-datepicker/carbon-datepicker";
import { CarbonFileUploaderOptions } from "./components/carbon-fileuploader/carbon-fileuploader";
import { CarbonInputOptions } from "./components/carbon-input/carbon-input";
import { CarbonObjectArrayOptions } from "./components/carbon-object-array/carbon-object-array";
import { CarbonRadioOptions } from "./components/carbon-radio/carbon-radio";
import { CarbonSelectOptions } from "./components/carbon-select/carbon-select";
import { CarbonSliderOptions } from "./components/carbon-slider/carbon-slider";
import { CarbonStructuredListOptions } from "./components/carbon-structuredlist/carbon-structuredlist";
import { CarbonSubmitOptions } from "./components/carbon-submit/carbon-submit";
import { CarbonTableOptions } from "./components/carbon-table/carbon-table";
import { CarbonTabsOptions } from "./components/carbon-tabs/carbon-tabs";
import { CarbonTextareaOptions } from "./components/carbon-textarea/carbon-textarea";
import { CarbonToggleOptions } from "./components/carbon-toggle/carbon-toggle";
import { TabViewsOptions } from "./components/tab-views/tab-views";
export namespace Components {
    interface CarbonAccordion {
        "open": boolean;
        "options": CarbonAccordionOptions;
        "setOptions": (options: CarbonAccordionOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": Array<{ label: string; content: string; }> | undefined;
    }
    interface CarbonBreadcrumb {
        "open": boolean;
        "options": CarbonBreadcrumbOptions;
        "setOptions": (options: CarbonBreadcrumbOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": Array<{ label: string; link: string; }> | undefined;
    }
    interface CarbonButton {
        "options": CarbonButtonOptions;
        "setOptions": (options: CarbonButtonOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": string;
    }
    interface CarbonChart {
        "setOptions": (options: CarbonChartOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": {
    data: number[],
    labels: string[]
  };
    }
    interface CarbonCheckbox {
        "options": CarbonCheckboxOptions;
        "setOptions": (options: CarbonCheckboxOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": boolean;
    }
    interface CarbonContentswitcher {
        "options": CarbonContentSwitcherOptions;
        "setOptions": (options: CarbonContentSwitcherOptions) => Promise<void>;
    }
    interface CarbonDatepicker {
        "getValue": () => Promise<number>;
        "setOptions": (options: CarbonDatePickerOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": string;
    }
    interface CarbonFileuploader {
        "options": CarbonFileUploaderOptions;
        "setOptions": (options: CarbonFileUploaderOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": any;
    }
    interface CarbonInput {
        "getValue": () => Promise<string>;
        "options": CarbonInputOptions;
        "setOptions": (options: CarbonInputOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": string;
    }
    interface CarbonObjectArray {
        "getValue": () => Promise<any[]>;
        "options": CarbonObjectArrayOptions;
        "setOptions": (options: CarbonObjectArrayOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": any[];
    }
    interface CarbonRadio {
        "getValue": () => Promise<string>;
        "setOptions": (options: CarbonRadioOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": string;
    }
    interface CarbonSelect {
        "getValue": () => Promise<string>;
        "setOptions": (options: CarbonSelectOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": string;
    }
    interface CarbonSlider {
        "getValue": () => Promise<number>;
        "options": CarbonSliderOptions;
        "setOptions": (options: CarbonSliderOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": number;
    }
    interface CarbonStructuredlist {
        "open": boolean;
        "options": CarbonStructuredListOptions;
        "setOptions": (options: CarbonStructuredListOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": Array<{ columnName: string; rowName: string; content: string; }> | undefined;
    }
    interface CarbonSubmit {
        "options": CarbonSubmitOptions;
        "setInstance": (instance: any) => Promise<void>;
        "setOptions": (options: CarbonSubmitOptions) => Promise<void>;
        "setRender": (render: any) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": string;
    }
    interface CarbonTable {
        "setOptions": (options: CarbonTableOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": any[];
    }
    interface CarbonTabs {
        "open": boolean;
        "options": CarbonTabsOptions;
        "setOptions": (options: CarbonTabsOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": Array<{ tabTarget: string; tabId: string; tabName: string; isDisabled: boolean; tabContent: string; value: string; }> | undefined;
    }
    interface CarbonTextarea {
        "getValue": () => Promise<string>;
        "options": CarbonTextareaOptions;
        "setOptions": (options: CarbonTextareaOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": string;
    }
    interface CarbonToggle {
        "getValue": () => Promise<boolean>;
        "options": CarbonToggleOptions;
        "setOptions": (options: CarbonToggleOptions) => Promise<void>;
        "setValue": (value: any) => Promise<void>;
        "value": boolean;
    }
    interface TabViews {
        "options": TabViewsOptions;
        "setOptions": (options: TabViewsOptions) => Promise<void>;
    }
}
export interface CarbonAccordionCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonAccordionElement;
}
export interface CarbonBreadcrumbCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonBreadcrumbElement;
}
export interface CarbonButtonCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonButtonElement;
}
export interface CarbonChartCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonChartElement;
}
export interface CarbonCheckboxCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonCheckboxElement;
}
export interface CarbonContentswitcherCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonContentswitcherElement;
}
export interface CarbonDatepickerCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonDatepickerElement;
}
export interface CarbonFileuploaderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonFileuploaderElement;
}
export interface CarbonInputCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonInputElement;
}
export interface CarbonObjectArrayCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonObjectArrayElement;
}
export interface CarbonRadioCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonRadioElement;
}
export interface CarbonSelectCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonSelectElement;
}
export interface CarbonSliderCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonSliderElement;
}
export interface CarbonStructuredlistCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonStructuredlistElement;
}
export interface CarbonSubmitCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonSubmitElement;
}
export interface CarbonTableCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonTableElement;
}
export interface CarbonTabsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonTabsElement;
}
export interface CarbonTextareaCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonTextareaElement;
}
export interface CarbonToggleCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLCarbonToggleElement;
}
declare global {
    interface HTMLCarbonAccordionElement extends Components.CarbonAccordion, HTMLStencilElement {
    }
    var HTMLCarbonAccordionElement: {
        prototype: HTMLCarbonAccordionElement;
        new (): HTMLCarbonAccordionElement;
    };
    interface HTMLCarbonBreadcrumbElement extends Components.CarbonBreadcrumb, HTMLStencilElement {
    }
    var HTMLCarbonBreadcrumbElement: {
        prototype: HTMLCarbonBreadcrumbElement;
        new (): HTMLCarbonBreadcrumbElement;
    };
    interface HTMLCarbonButtonElement extends Components.CarbonButton, HTMLStencilElement {
    }
    var HTMLCarbonButtonElement: {
        prototype: HTMLCarbonButtonElement;
        new (): HTMLCarbonButtonElement;
    };
    interface HTMLCarbonChartElement extends Components.CarbonChart, HTMLStencilElement {
    }
    var HTMLCarbonChartElement: {
        prototype: HTMLCarbonChartElement;
        new (): HTMLCarbonChartElement;
    };
    interface HTMLCarbonCheckboxElement extends Components.CarbonCheckbox, HTMLStencilElement {
    }
    var HTMLCarbonCheckboxElement: {
        prototype: HTMLCarbonCheckboxElement;
        new (): HTMLCarbonCheckboxElement;
    };
    interface HTMLCarbonContentswitcherElement extends Components.CarbonContentswitcher, HTMLStencilElement {
    }
    var HTMLCarbonContentswitcherElement: {
        prototype: HTMLCarbonContentswitcherElement;
        new (): HTMLCarbonContentswitcherElement;
    };
    interface HTMLCarbonDatepickerElement extends Components.CarbonDatepicker, HTMLStencilElement {
    }
    var HTMLCarbonDatepickerElement: {
        prototype: HTMLCarbonDatepickerElement;
        new (): HTMLCarbonDatepickerElement;
    };
    interface HTMLCarbonFileuploaderElement extends Components.CarbonFileuploader, HTMLStencilElement {
    }
    var HTMLCarbonFileuploaderElement: {
        prototype: HTMLCarbonFileuploaderElement;
        new (): HTMLCarbonFileuploaderElement;
    };
    interface HTMLCarbonInputElement extends Components.CarbonInput, HTMLStencilElement {
    }
    var HTMLCarbonInputElement: {
        prototype: HTMLCarbonInputElement;
        new (): HTMLCarbonInputElement;
    };
    interface HTMLCarbonObjectArrayElement extends Components.CarbonObjectArray, HTMLStencilElement {
    }
    var HTMLCarbonObjectArrayElement: {
        prototype: HTMLCarbonObjectArrayElement;
        new (): HTMLCarbonObjectArrayElement;
    };
    interface HTMLCarbonRadioElement extends Components.CarbonRadio, HTMLStencilElement {
    }
    var HTMLCarbonRadioElement: {
        prototype: HTMLCarbonRadioElement;
        new (): HTMLCarbonRadioElement;
    };
    interface HTMLCarbonSelectElement extends Components.CarbonSelect, HTMLStencilElement {
    }
    var HTMLCarbonSelectElement: {
        prototype: HTMLCarbonSelectElement;
        new (): HTMLCarbonSelectElement;
    };
    interface HTMLCarbonSliderElement extends Components.CarbonSlider, HTMLStencilElement {
    }
    var HTMLCarbonSliderElement: {
        prototype: HTMLCarbonSliderElement;
        new (): HTMLCarbonSliderElement;
    };
    interface HTMLCarbonStructuredlistElement extends Components.CarbonStructuredlist, HTMLStencilElement {
    }
    var HTMLCarbonStructuredlistElement: {
        prototype: HTMLCarbonStructuredlistElement;
        new (): HTMLCarbonStructuredlistElement;
    };
    interface HTMLCarbonSubmitElement extends Components.CarbonSubmit, HTMLStencilElement {
    }
    var HTMLCarbonSubmitElement: {
        prototype: HTMLCarbonSubmitElement;
        new (): HTMLCarbonSubmitElement;
    };
    interface HTMLCarbonTableElement extends Components.CarbonTable, HTMLStencilElement {
    }
    var HTMLCarbonTableElement: {
        prototype: HTMLCarbonTableElement;
        new (): HTMLCarbonTableElement;
    };
    interface HTMLCarbonTabsElement extends Components.CarbonTabs, HTMLStencilElement {
    }
    var HTMLCarbonTabsElement: {
        prototype: HTMLCarbonTabsElement;
        new (): HTMLCarbonTabsElement;
    };
    interface HTMLCarbonTextareaElement extends Components.CarbonTextarea, HTMLStencilElement {
    }
    var HTMLCarbonTextareaElement: {
        prototype: HTMLCarbonTextareaElement;
        new (): HTMLCarbonTextareaElement;
    };
    interface HTMLCarbonToggleElement extends Components.CarbonToggle, HTMLStencilElement {
    }
    var HTMLCarbonToggleElement: {
        prototype: HTMLCarbonToggleElement;
        new (): HTMLCarbonToggleElement;
    };
    interface HTMLTabViewsElement extends Components.TabViews, HTMLStencilElement {
    }
    var HTMLTabViewsElement: {
        prototype: HTMLTabViewsElement;
        new (): HTMLTabViewsElement;
    };
    interface HTMLElementTagNameMap {
        "carbon-accordion": HTMLCarbonAccordionElement;
        "carbon-breadcrumb": HTMLCarbonBreadcrumbElement;
        "carbon-button": HTMLCarbonButtonElement;
        "carbon-chart": HTMLCarbonChartElement;
        "carbon-checkbox": HTMLCarbonCheckboxElement;
        "carbon-contentswitcher": HTMLCarbonContentswitcherElement;
        "carbon-datepicker": HTMLCarbonDatepickerElement;
        "carbon-fileuploader": HTMLCarbonFileuploaderElement;
        "carbon-input": HTMLCarbonInputElement;
        "carbon-object-array": HTMLCarbonObjectArrayElement;
        "carbon-radio": HTMLCarbonRadioElement;
        "carbon-select": HTMLCarbonSelectElement;
        "carbon-slider": HTMLCarbonSliderElement;
        "carbon-structuredlist": HTMLCarbonStructuredlistElement;
        "carbon-submit": HTMLCarbonSubmitElement;
        "carbon-table": HTMLCarbonTableElement;
        "carbon-tabs": HTMLCarbonTabsElement;
        "carbon-textarea": HTMLCarbonTextareaElement;
        "carbon-toggle": HTMLCarbonToggleElement;
        "tab-views": HTMLTabViewsElement;
    }
}
declare namespace LocalJSX {
    interface CarbonAccordion {
        "onOpen"?: (event: CarbonAccordionCustomEvent<any>) => void;
        "open"?: boolean;
        "options"?: CarbonAccordionOptions;
        "value"?: Array<{ label: string; content: string; }> | undefined;
    }
    interface CarbonBreadcrumb {
        "onOpen"?: (event: CarbonBreadcrumbCustomEvent<any>) => void;
        "open"?: boolean;
        "options"?: CarbonBreadcrumbOptions;
        "value"?: Array<{ label: string; link: string; }> | undefined;
    }
    interface CarbonButton {
        "onOpen"?: (event: CarbonButtonCustomEvent<any>) => void;
        "options"?: CarbonButtonOptions;
        "value"?: string;
    }
    interface CarbonChart {
        "onValue"?: (event: CarbonChartCustomEvent<any>) => void;
        "value"?: {
    data: number[],
    labels: string[]
  };
    }
    interface CarbonCheckbox {
        "onValue"?: (event: CarbonCheckboxCustomEvent<any>) => void;
        "options"?: CarbonCheckboxOptions;
        "value"?: boolean;
    }
    interface CarbonContentswitcher {
        "onOpen"?: (event: CarbonContentswitcherCustomEvent<any>) => void;
        "options"?: CarbonContentSwitcherOptions;
    }
    interface CarbonDatepicker {
        "onValue"?: (event: CarbonDatepickerCustomEvent<any>) => void;
        "value"?: string;
    }
    interface CarbonFileuploader {
        "onOpen"?: (event: CarbonFileuploaderCustomEvent<any>) => void;
        "options"?: CarbonFileUploaderOptions;
        "value"?: any;
    }
    interface CarbonInput {
        "onValue"?: (event: CarbonInputCustomEvent<any>) => void;
        "options"?: CarbonInputOptions;
        "value"?: string;
    }
    interface CarbonObjectArray {
        "onValue"?: (event: CarbonObjectArrayCustomEvent<any>) => void;
        "options"?: CarbonObjectArrayOptions;
        "value"?: any[];
    }
    interface CarbonRadio {
        "onValue"?: (event: CarbonRadioCustomEvent<any>) => void;
        "value"?: string;
    }
    interface CarbonSelect {
        "onValue"?: (event: CarbonSelectCustomEvent<any>) => void;
        "value"?: string;
    }
    interface CarbonSlider {
        "onValue"?: (event: CarbonSliderCustomEvent<any>) => void;
        "options"?: CarbonSliderOptions;
        "value"?: number;
    }
    interface CarbonStructuredlist {
        "onOpen"?: (event: CarbonStructuredlistCustomEvent<any>) => void;
        "open"?: boolean;
        "options"?: CarbonStructuredListOptions;
        "value"?: Array<{ columnName: string; rowName: string; content: string; }> | undefined;
    }
    interface CarbonSubmit {
        "onOpen"?: (event: CarbonSubmitCustomEvent<any>) => void;
        "options"?: CarbonSubmitOptions;
        "value"?: string;
    }
    interface CarbonTable {
        "onValue"?: (event: CarbonTableCustomEvent<any>) => void;
        "value"?: any[];
    }
    interface CarbonTabs {
        "onOpen"?: (event: CarbonTabsCustomEvent<any>) => void;
        "open"?: boolean;
        "options"?: CarbonTabsOptions;
        "value"?: Array<{ tabTarget: string; tabId: string; tabName: string; isDisabled: boolean; tabContent: string; value: string; }> | undefined;
    }
    interface CarbonTextarea {
        "onValue"?: (event: CarbonTextareaCustomEvent<any>) => void;
        "options"?: CarbonTextareaOptions;
        "value"?: string;
    }
    interface CarbonToggle {
        "onValue"?: (event: CarbonToggleCustomEvent<any>) => void;
        "options"?: CarbonToggleOptions;
        "value"?: boolean;
    }
    interface TabViews {
        "options"?: TabViewsOptions;
    }
    interface IntrinsicElements {
        "carbon-accordion": CarbonAccordion;
        "carbon-breadcrumb": CarbonBreadcrumb;
        "carbon-button": CarbonButton;
        "carbon-chart": CarbonChart;
        "carbon-checkbox": CarbonCheckbox;
        "carbon-contentswitcher": CarbonContentswitcher;
        "carbon-datepicker": CarbonDatepicker;
        "carbon-fileuploader": CarbonFileuploader;
        "carbon-input": CarbonInput;
        "carbon-object-array": CarbonObjectArray;
        "carbon-radio": CarbonRadio;
        "carbon-select": CarbonSelect;
        "carbon-slider": CarbonSlider;
        "carbon-structuredlist": CarbonStructuredlist;
        "carbon-submit": CarbonSubmit;
        "carbon-table": CarbonTable;
        "carbon-tabs": CarbonTabs;
        "carbon-textarea": CarbonTextarea;
        "carbon-toggle": CarbonToggle;
        "tab-views": TabViews;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "carbon-accordion": LocalJSX.CarbonAccordion & JSXBase.HTMLAttributes<HTMLCarbonAccordionElement>;
            "carbon-breadcrumb": LocalJSX.CarbonBreadcrumb & JSXBase.HTMLAttributes<HTMLCarbonBreadcrumbElement>;
            "carbon-button": LocalJSX.CarbonButton & JSXBase.HTMLAttributes<HTMLCarbonButtonElement>;
            "carbon-chart": LocalJSX.CarbonChart & JSXBase.HTMLAttributes<HTMLCarbonChartElement>;
            "carbon-checkbox": LocalJSX.CarbonCheckbox & JSXBase.HTMLAttributes<HTMLCarbonCheckboxElement>;
            "carbon-contentswitcher": LocalJSX.CarbonContentswitcher & JSXBase.HTMLAttributes<HTMLCarbonContentswitcherElement>;
            "carbon-datepicker": LocalJSX.CarbonDatepicker & JSXBase.HTMLAttributes<HTMLCarbonDatepickerElement>;
            "carbon-fileuploader": LocalJSX.CarbonFileuploader & JSXBase.HTMLAttributes<HTMLCarbonFileuploaderElement>;
            "carbon-input": LocalJSX.CarbonInput & JSXBase.HTMLAttributes<HTMLCarbonInputElement>;
            "carbon-object-array": LocalJSX.CarbonObjectArray & JSXBase.HTMLAttributes<HTMLCarbonObjectArrayElement>;
            "carbon-radio": LocalJSX.CarbonRadio & JSXBase.HTMLAttributes<HTMLCarbonRadioElement>;
            "carbon-select": LocalJSX.CarbonSelect & JSXBase.HTMLAttributes<HTMLCarbonSelectElement>;
            "carbon-slider": LocalJSX.CarbonSlider & JSXBase.HTMLAttributes<HTMLCarbonSliderElement>;
            "carbon-structuredlist": LocalJSX.CarbonStructuredlist & JSXBase.HTMLAttributes<HTMLCarbonStructuredlistElement>;
            "carbon-submit": LocalJSX.CarbonSubmit & JSXBase.HTMLAttributes<HTMLCarbonSubmitElement>;
            "carbon-table": LocalJSX.CarbonTable & JSXBase.HTMLAttributes<HTMLCarbonTableElement>;
            "carbon-tabs": LocalJSX.CarbonTabs & JSXBase.HTMLAttributes<HTMLCarbonTabsElement>;
            "carbon-textarea": LocalJSX.CarbonTextarea & JSXBase.HTMLAttributes<HTMLCarbonTextareaElement>;
            "carbon-toggle": LocalJSX.CarbonToggle & JSXBase.HTMLAttributes<HTMLCarbonToggleElement>;
            "tab-views": LocalJSX.TabViews & JSXBase.HTMLAttributes<HTMLTabViewsElement>;
        }
    }
}
