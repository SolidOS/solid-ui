import { LitElement } from 'lit';
export declare class Button extends LitElement {
    static properties: {
        label: {
            type: StringConstructor;
            reflect: boolean;
        };
        type: {
            type: StringConstructor;
            reflect: boolean;
        };
        disabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        selected: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        ariaLabel: {
            type: StringConstructor;
            attribute: string;
        };
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        variant: {
            type: StringConstructor;
            reflect: boolean;
        };
        size: {
            type: StringConstructor;
            reflect: boolean;
        };
        theme: {
            type: StringConstructor;
            reflect: boolean;
        };
        fullWidth: {
            type: BooleanConstructor;
            attribute: string;
            reflect: boolean;
        };
        icon: {
            type: StringConstructor;
            reflect: boolean;
        };
        iconPosition: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        contentAlign: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        handleClick: {
            attribute: boolean;
        };
        _hasSlottedIcon: {
            state: boolean;
        };
    };
    static styles: import("lit").CSSResult;
    label: string;
    type: 'button' | 'submit' | 'reset';
    disabled: boolean;
    selected: boolean;
    ariaLabel: string;
    name: string;
    value: string;
    variant: 'primary' | 'secondary' | 'icon';
    size: 'sm' | 'md' | 'lg';
    theme: 'light' | 'dark';
    fullWidth: boolean;
    icon: string;
    iconPosition: 'start' | 'end';
    contentAlign: 'start' | 'center' | 'end';
    handleClick?: (event: MouseEvent) => void;
    _hasSlottedIcon: boolean;
    private _iconSlotObserver?;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _handleButtonClick;
    private _handleIconSlotChange;
    private _syncSlottedIconPresence;
    private _renderIcon;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=Button.d.ts.map