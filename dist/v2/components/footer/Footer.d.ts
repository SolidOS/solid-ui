import { LitElement } from 'lit';
import type { LiveStore, NamedNode } from 'rdflib';
export declare class Footer extends LitElement {
    static properties: {
        theme: {
            type: StringConstructor;
            reflect: boolean;
        };
        layout: {
            type: StringConstructor;
            reflect: boolean;
        };
        position: {
            type: StringConstructor;
            reflect: boolean;
        };
        top: {
            type: StringConstructor;
            reflect: boolean;
        };
        right: {
            type: StringConstructor;
            reflect: boolean;
        };
        bottom: {
            type: StringConstructor;
            reflect: boolean;
        };
        left: {
            type: StringConstructor;
            reflect: boolean;
        };
        store: {
            type: ObjectConstructor;
            attribute: boolean;
        };
        _user: {
            state: boolean;
        };
    };
    static styles: import("lit").CSSResult;
    theme: 'light' | 'dark';
    layout: 'desktop' | 'mobile';
    position: 'static' | 'absolute' | 'relative' | 'fixed' | 'sticky';
    top: string;
    right: string;
    bottom: string;
    left: string;
    store: LiveStore | null;
    _user: NamedNode | null;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    updated(changedProperties: Map<string, unknown>): void;
    private _updatePositionStyles;
    private _updateFooter;
    render(): import("lit-html").TemplateResult<1>;
    private _renderFooterContent;
}
//# sourceMappingURL=Footer.d.ts.map