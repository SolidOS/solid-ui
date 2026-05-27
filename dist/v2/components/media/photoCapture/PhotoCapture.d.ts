import { LitElement, type PropertyValues } from 'lit';
export interface PhotoCapturedDetail {
    file: File;
    blob: Blob;
    objectUrl: string;
    contentType: string;
}
export interface PhotoCaptureErrorDetail {
    error: unknown;
    message: string;
}
export interface PhotoCaptureOpenChangeDetail {
    open: boolean;
}
export interface PhotoCaptureValueDetail {
    value: File | null;
}
type PresentationMode = 'inline' | 'dialog';
type ThemeMode = 'light' | 'dark';
export declare class PhotoCapture extends LitElement {
    static formAssociated: boolean;
    static properties: {
        label: {
            type: StringConstructor;
            reflect: boolean;
        };
        heading: {
            type: StringConstructor;
            reflect: boolean;
        };
        captureLabel: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        confirmLabel: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        retakeLabel: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        cancelLabel: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        presentation: {
            type: StringConstructor;
            reflect: boolean;
        };
        theme: {
            type: StringConstructor;
            reflect: boolean;
        };
        facingMode: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        constraints: {
            type: StringConstructor;
            reflect: boolean;
        };
        captureFormat: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        captureQuality: {
            type: NumberConstructor;
            attribute: string;
        };
        open: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        disabled: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        name: {
            type: StringConstructor;
            reflect: boolean;
        };
        required: {
            type: BooleanConstructor;
            reflect: boolean;
        };
        showTrigger: {
            type: BooleanConstructor;
            attribute: string;
            reflect: boolean;
        };
        showCancelButton: {
            type: BooleanConstructor;
            attribute: string;
            reflect: boolean;
        };
        autoCloseOnCapture: {
            type: BooleanConstructor;
            attribute: string;
        };
        fileNamePrefix: {
            type: StringConstructor;
            attribute: string;
            reflect: boolean;
        };
        value: {
            attribute: boolean;
        };
        mediaConstraints: {
            attribute: boolean;
        };
        _errorMessage: {
            state: boolean;
        };
        _previewUrl: {
            state: boolean;
        };
        _startingPreview: {
            state: boolean;
        };
    };
    static styles: import("lit").CSSResult;
    label: string;
    heading: string;
    captureLabel: string;
    confirmLabel: string;
    retakeLabel: string;
    cancelLabel: string;
    presentation: PresentationMode;
    theme: ThemeMode;
    facingMode: string;
    constraints: string;
    captureFormat: string;
    captureQuality?: number;
    open: boolean;
    disabled: boolean;
    name: string;
    required: boolean;
    showTrigger: boolean;
    showCancelButton: boolean;
    autoCloseOnCapture: boolean;
    fileNamePrefix: string;
    mediaConstraints?: MediaStreamConstraints;
    _errorMessage: string;
    _previewUrl: string;
    _startingPreview: boolean;
    private _value;
    private _stream;
    private readonly _internals;
    private _associatedForm;
    private readonly _handleFormData;
    private readonly _handleFormReset;
    private get _supportsFormInternals();
    constructor();
    get value(): File | null;
    set value(nextValue: File | null);
    get form(): HTMLFormElement | null;
    get validationMessage(): string;
    get willValidate(): boolean;
    checkValidity(): boolean;
    reportValidity(): boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    formResetCallback(): void;
    formDisabledCallback(disabled: boolean): void;
    protected updated(changed: PropertyValues<this>): void;
    private _setOpen;
    private _emitError;
    private _syncAssociatedForm;
    private _syncFormValue;
    private _syncValidity;
    private _syncPreviewFromValue;
    private _clearValue;
    private _dispatchValueEvents;
    private _fileExtensionForMimeType;
    private _createFileFromBlob;
    private _queuePreviewStart;
    private _resolveMediaConstraints;
    private _startPreview;
    private _stopStream;
    private _revokePreviewUrl;
    private _captureSnapshot;
    private _retakePhoto;
    private _confirmPhoto;
    private _handleCancel;
    private _openCapture;
    private _renderViewport;
    private _renderStatus;
    private _renderActions;
    private _renderPanel;
    render(): import("lit-html").TemplateResult<1>;
}
export {};
//# sourceMappingURL=PhotoCapture.d.ts.map