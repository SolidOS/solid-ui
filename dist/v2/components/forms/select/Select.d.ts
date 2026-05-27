import { LitElement } from 'lit';
import { SelectOption } from '../shared/optionTypes';
export declare class Select extends LitElement {
    private static _nextId;
    private _popupPortalHost;
    private _popupPortalRoot;
    private _popupPortalContainer;
    private readonly _handleDocumentPointerDown;
    private readonly _handleViewportChange;
    static properties: {
        label: {
            type: StringConstructor;
            reflect: boolean;
        };
        theme: {
            type: StringConstructor;
            reflect: boolean;
        };
        options: {
            type: ArrayConstructor;
            attribute: boolean;
        };
        layout: {
            type: StringConstructor;
            reflect: boolean;
        };
        value: {
            type: StringConstructor;
            reflect: boolean;
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
    theme: 'light' | 'dark';
    options: Array<SelectOption>;
    layout: 'desktop' | 'mobile';
    value: string;
    _popupOpen: boolean;
    _activeIndex: number;
    private readonly _listboxId;
    constructor();
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(): void;
    private _getPopupPortalContainer;
    private _ensurePopupPortal;
    private _detachPopupPortal;
    private _updatePopupPosition;
    private _closePopup;
    private _getSelectedIndex;
    private _getSelectedOption;
    private _getDisplayedOptions;
    private _getActiveOption;
    private _selectValueFromDropdown;
    private _selectActiveOption;
    private _openPopup;
    private _handleTriggerKeydown;
    private _getOptionId;
    private _renderPopup;
    render(): import("lit-html").TemplateResult<1>;
}
//# sourceMappingURL=Select.d.ts.map