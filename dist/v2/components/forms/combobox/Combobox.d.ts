import { LitElement } from 'lit';
import { ComboboxSuggestion } from './comboboxTypes';
export declare class Combobox extends LitElement {
    private static _nextId;
    private _popupPortalHost;
    private _popupPortalRoot;
    private _popupPortalContainer;
    private readonly _handleDocumentPointerDown;
    private readonly _handleViewportChange;
    suggestionProvider?: (query: string) => Promise<ComboboxSuggestion[]>;
    static properties: {
        label: {
            type: StringConstructor;
            reflect: boolean;
        };
        placeholder: {
            type: StringConstructor;
            reflect: boolean;
        };
        theme: {
            type: StringConstructor;
            reflect: boolean;
        };
        layout: {
            type: StringConstructor;
            reflect: boolean;
        };
        value: {
            type: StringConstructor;
            reflect: boolean;
        };
        inputValue: {
            type: StringConstructor;
        };
        options: {
            type: ArrayConstructor;
            attribute: boolean;
        };
        _popupOpen: {
            state: boolean;
        };
        _activeIndex: {
            state: boolean;
        };
    };
    static styles: import("lit").CSSResult[];
    label: string;
    placeholder: string;
    theme: 'light' | 'dark';
    options: Array<ComboboxSuggestion>;
    layout: 'desktop' | 'mobile';
    value: string;
    inputValue: string;
    _popupOpen: boolean;
    _activeIndex: number;
    private readonly _inputId;
    private readonly _listboxId;
    private _suggestionRequestId;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    private _getPopupPortalContainer;
    private _ensurePopupPortal;
    private _detachPopupPortal;
    private _updatePopupPosition;
    private _openPopup;
    private _closePopup;
    protected updated(changedProperties: Map<string, unknown>): void;
    private _getSelectedIndex;
    private _getSelectedOption;
    private _getDisplayedOptions;
    private _getActiveOption;
    private _loadSuggestions;
    private _handleInputChange;
    private _handleInputKeydown;
    private _getOptionId;
    private _selectValueFromDropdown;
    private _selectActiveOption;
    private _renderPopup;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=Combobox.d.ts.map