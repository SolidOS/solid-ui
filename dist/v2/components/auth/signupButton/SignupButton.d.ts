import { LitElement } from 'lit';
export declare class SignupButton extends LitElement {
    static properties: {
        label: {
            type: StringConstructor;
            reflect: boolean;
        };
        theme: {
            type: StringConstructor;
            reflect: boolean;
        };
        signupUrl: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        icon: {
            type: StringConstructor;
            reflect: boolean;
        };
        layout: {
            type: StringConstructor;
            reflect: boolean;
        };
    };
    static styles: import("lit").CSSResult;
    label: string;
    theme: 'light' | 'dark';
    signupUrl: string;
    icon: string;
    layout: 'desktop' | 'mobile';
    constructor();
    private _handleClick;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=SignupButton.d.ts.map