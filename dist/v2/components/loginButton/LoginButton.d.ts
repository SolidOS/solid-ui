import { LitElement } from 'lit';
export declare class LoginButton extends LitElement {
    static properties: {
        label: {
            type: StringConstructor;
            reflect: boolean;
        };
        theme: {
            type: StringConstructor;
            reflect: boolean;
        };
        issuerUrl: {
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
        _popupOpen: {
            state: boolean;
        };
        _issuerInputValue: {
            state: boolean;
        };
        _dropdownOpen: {
            state: boolean;
        };
    };
    static styles: import("lit").CSSResult;
    label: string;
    theme: 'light' | 'dark';
    issuerUrl: string;
    icon: string;
    layout: 'desktop' | 'mobile';
    _popupOpen: boolean;
    _issuerInputValue: string;
    _dropdownOpen: boolean;
    private _issuerInputId;
    private _errorMsg;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _openPopup;
    private _closePopup;
    updated(): void;
    private _loginToIssuer;
    private _loginComplete;
    private _handleGoClick;
    private _toggleDropdown;
    private _selectIssuerFromDropdown;
    private _handleInputChange;
    private _handleInputKeydown;
    private _renderPopup;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=LoginButton.d.ts.map