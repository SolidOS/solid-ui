/******/ var __webpack_modules__ = ({

/***/ 3604
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* binding */ PhotoCapture)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6161);

/* The original code was written by Sir Tim Berners-Lee. It was made into a
web component by AI Model GPT-5.4
Prompt: Take the code from src/media/media-capture.ts and make it a
web component. Make it work in forms as well as not. Make it
configurable and follow LoginButton. */

const DEFAULT_CAPTURE_FORMAT = 'image/png';
class PhotoCapture extends lit__WEBPACK_IMPORTED_MODULE_0__/* .LitElement */ .WF {
  static formAssociated = true;
  static properties = {
    label: {
      type: String,
      reflect: true
    },
    heading: {
      type: String,
      reflect: true
    },
    captureLabel: {
      type: String,
      attribute: 'capture-label',
      reflect: true
    },
    confirmLabel: {
      type: String,
      attribute: 'confirm-label',
      reflect: true
    },
    retakeLabel: {
      type: String,
      attribute: 'retake-label',
      reflect: true
    },
    cancelLabel: {
      type: String,
      attribute: 'cancel-label',
      reflect: true
    },
    presentation: {
      type: String,
      reflect: true
    },
    theme: {
      type: String,
      reflect: true
    },
    facingMode: {
      type: String,
      attribute: 'facing-mode',
      reflect: true
    },
    constraints: {
      type: String,
      reflect: true
    },
    captureFormat: {
      type: String,
      attribute: 'capture-format',
      reflect: true
    },
    captureQuality: {
      type: Number,
      attribute: 'capture-quality'
    },
    open: {
      type: Boolean,
      reflect: true
    },
    disabled: {
      type: Boolean,
      reflect: true
    },
    name: {
      type: String,
      reflect: true
    },
    required: {
      type: Boolean,
      reflect: true
    },
    showTrigger: {
      type: Boolean,
      attribute: 'show-trigger',
      reflect: true
    },
    showCancelButton: {
      type: Boolean,
      attribute: 'show-cancel-button',
      reflect: true
    },
    autoCloseOnCapture: {
      type: Boolean,
      attribute: 'auto-close-on-capture'
    },
    fileNamePrefix: {
      type: String,
      attribute: 'file-name-prefix',
      reflect: true
    },
    value: {
      attribute: false
    },
    mediaConstraints: {
      attribute: false
    },
    _errorMessage: {
      state: true
    },
    _previewUrl: {
      state: true
    },
    _startingPreview: {
      state: true
    }
  };
  static styles = (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .css */ .AH)`
    :host {
      display: block;
      --photo-capture-trigger-background: var(--lavender-900, #7c4cff);
      --photo-capture-trigger-text: var(--color-header-text, #ffffff);
      --photo-capture-surface: var(--color-background, #ffffff);
      --photo-capture-text: var(--gray-900, #101828);
      --photo-capture-muted-text: var(--gray-600, #4a5565);
      --photo-capture-border: var(--gray-200, #e5e7eb);
      --photo-capture-hover: var(--gray-100, #f3f4f6);
      --photo-capture-shadow: var(--box-shadow-sm, 0 1px 4px rgba(0, 0, 0, 0.12));
      --photo-capture-overlay: rgba(0, 0, 0, 0.6);
      --photo-capture-frame-max-width: 260px;
      --photo-capture-radius: 8px;
      --photo-capture-button-radius: var(--border-radius-base, 0.3125rem);
      --photo-capture-gap: var(--spacing-2xs, 0.625rem);
      color: var(--photo-capture-text);
      box-sizing: border-box;
    }

    :host([theme='dark']) {
      --photo-capture-surface: var(--gray-900, #111827);
      --photo-capture-text: var(--white, #ffffff);
      --photo-capture-muted-text: var(--gray-300, #d1d5dc);
      --photo-capture-border: var(--gray-700, #364153);
      --photo-capture-hover: rgba(255, 255, 255, 0.08);
      --photo-capture-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }

    .trigger-button,
    .action-button,
    .cancel-button,
    .close-button {
      font: inherit;
      cursor: pointer;
    }

    .trigger-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 35px;
      padding: 0.5rem 0.9rem;
      border: none;
      border-radius: var(--photo-capture-button-radius);
      background: var(--photo-capture-trigger-background);
      color: var(--photo-capture-trigger-text);
      transition: transform 0.2s ease;
    }

    .trigger-button:active {
      transform: translateY(1px);
    }

    .trigger-button:disabled,
    .action-button:disabled,
    .cancel-button:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }

    .inline-root[hidden] {
      display: none;
    }

    .dialog {
      border: none;
      padding: 0;
      background: transparent;
      outline: none;
      overflow: visible;
      max-width: none;
      max-height: none;
    }

    .dialog::backdrop {
      background: var(--photo-capture-overlay);
    }

    .panel {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--photo-capture-gap);
      width: min(100%, 340px);
      padding: 1rem;
      border: 1px solid var(--photo-capture-border);
      border-radius: var(--photo-capture-radius);
      background: var(--photo-capture-surface);
      color: var(--photo-capture-text);
      box-shadow: var(--photo-capture-shadow);
    }

    .panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.5rem;
      width: 100%;
    }

    .panel-heading {
      margin: 0;
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.4;
    }

    .close-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 1.75rem;
      height: 1.75rem;
      padding: 0;
      border: none;
      border-radius: 999px;
      background: transparent;
      color: var(--photo-capture-muted-text);
      font-size: 1.125rem;
      line-height: 1;
    }

    .close-button:hover,
    .close-button:focus-visible,
    .action-button:hover,
    .action-button:focus-visible,
    .cancel-button:hover,
    .cancel-button:focus-visible {
      background: var(--photo-capture-hover);
    }

    .viewport {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: 200px;
      border-radius: 0.5rem;
      overflow: hidden;
      background: color-mix(in srgb, var(--photo-capture-surface) 92%, #000 8%);
    }

    .viewport video,
    .viewport img {
      display: block;
      width: 100%;
      max-width: var(--photo-capture-frame-max-width);
      height: auto;
      border-radius: 0.5rem;
      margin: 0 auto;
      object-fit: cover;
    }

    .status {
      width: 100%;
      text-align: center;
      color: var(--photo-capture-muted-text);
      font-size: 0.875rem;
    }

    .status.error {
      color: var(--color-error, #b00020);
    }

    .actions {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: var(--photo-capture-gap);
      width: 100%;
    }

    .action-button,
    .cancel-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-height: 2.25rem;
      padding: 0.45rem 0.85rem;
      border-radius: var(--photo-capture-button-radius);
      border: 1px solid var(--photo-capture-border);
      background: var(--photo-capture-surface);
      color: var(--photo-capture-text);
      font-size: var(--font-size-xxs, 0.75rem);
      font-weight: var(--font-weight-xbold, 700);
      line-height: 1.5;
    }

    .action-button--primary {
      background: var(--photo-capture-trigger-background);
      color: var(--photo-capture-trigger-text);
      border-color: transparent;
    }
  `;
  _value = null;
  _stream = null;
  _internals;
  _associatedForm = null;
  _handleFormData = event => {
    const formData = event.formData;
    if (!formData || !this.name || !this.value || this.disabled) return;
    formData.append(this.name, this.value, this.value.name);
  };
  _handleFormReset = () => {
    this._clearValue({
      emitEvents: false
    });
    if (this.open) {
      this._queuePreviewStart();
    }
  };
  get _supportsFormInternals() {
    return !!this._internals && typeof this._internals.setFormValue === 'function';
  }
  constructor() {
    super();
    this.label = 'Take Photo';
    this.heading = 'Take a photo';
    this.captureLabel = 'Take Photo';
    this.confirmLabel = 'Use Photo';
    this.retakeLabel = 'Retake';
    this.cancelLabel = 'Cancel';
    this.presentation = 'inline';
    this.theme = 'light';
    this.facingMode = 'user';
    this.constraints = '';
    this.captureFormat = DEFAULT_CAPTURE_FORMAT;
    this.captureQuality = undefined;
    this.open = false;
    this.disabled = false;
    this.name = '';
    this.required = false;
    this.showTrigger = false;
    this.showCancelButton = true;
    this.autoCloseOnCapture = false;
    this.fileNamePrefix = '';
    this.mediaConstraints = undefined;
    this._errorMessage = '';
    this._previewUrl = '';
    this._startingPreview = false;
    this._internals = typeof this.attachInternals === 'function' ? this.attachInternals() : null;
  }
  get value() {
    return this._value;
  }
  set value(nextValue) {
    const normalizedValue = nextValue instanceof File ? nextValue : null;
    const previousValue = this._value;
    if (previousValue === normalizedValue) return;
    this._value = normalizedValue;
    this._syncPreviewFromValue(normalizedValue);
    this._syncFormValue();
    this._syncValidity();
    this.requestUpdate('value', previousValue);
  }
  get form() {
    return (this._supportsFormInternals ? this._internals?.form : null) ?? this._associatedForm;
  }
  get validationMessage() {
    return (typeof this._internals?.validationMessage === 'string' ? this._internals.validationMessage : '') || (this.required && !this.value ? 'Please capture a photo.' : '');
  }
  get willValidate() {
    return typeof this._internals?.willValidate === 'boolean' ? this._internals.willValidate : !this.disabled;
  }
  checkValidity() {
    if (this._internals && typeof this._internals.checkValidity === 'function') {
      return this._internals.checkValidity();
    }
    return !(this.required && !this.value);
  }
  reportValidity() {
    if (this._internals && typeof this._internals.reportValidity === 'function') {
      return this._internals.reportValidity();
    }
    return this.checkValidity();
  }
  connectedCallback() {
    super.connectedCallback();
    this._syncAssociatedForm();
    this._syncFormValue();
    this._syncValidity();
  }
  disconnectedCallback() {
    this._syncAssociatedForm(null);
    this._stopStream();
    this._revokePreviewUrl();
    super.disconnectedCallback();
  }
  formResetCallback() {
    this._handleFormReset();
  }
  formDisabledCallback(disabled) {
    this.disabled = disabled;
  }
  updated(changed) {
    this._syncAssociatedForm();
    if (this.presentation === 'dialog') {
      const dialog = this.shadowRoot?.querySelector('dialog');
      if (dialog) {
        if (this.open && !dialog.open) {
          dialog.showModal();
        } else if (!this.open && dialog.open) {
          dialog.close();
        }
      }
    }
    if (changed.has('open') && !this.open) {
      this._stopStream();
    }
    if (this.open && !this.value && !this._stream && !this._startingPreview && (changed.has('open') || changed.has('presentation') || changed.has('_previewUrl') || changed.has('value'))) {
      this._queuePreviewStart();
    }
    if (changed.has('name') || changed.has('disabled') || changed.has('value')) {
      this._syncFormValue();
    }
    if (changed.has('required') || changed.has('disabled') || changed.has('value')) {
      this._syncValidity();
    }
    if (this._stream) {
      const video = this.shadowRoot?.querySelector('video.capture-preview');
      if (video && video.srcObject !== this._stream) {
        video.srcObject = this._stream;
      }
    }
  }
  _setOpen(open) {
    if (this.open === open) return;
    this.open = open;
    this.dispatchEvent(new CustomEvent('open-change', {
      detail: {
        open
      },
      bubbles: true,
      composed: true
    }));
  }
  _emitError(error, message = 'Unable to access the camera') {
    this._errorMessage = message;
    this.dispatchEvent(new CustomEvent('error', {
      detail: {
        error,
        message
      },
      bubbles: true,
      composed: true
    }));
  }
  _syncAssociatedForm(nextForm = this.closest('form')) {
    if (this._associatedForm === nextForm) return;
    if (this._associatedForm) {
      this._associatedForm.removeEventListener('formdata', this._handleFormData);
      this._associatedForm.removeEventListener('reset', this._handleFormReset);
    }
    this._associatedForm = nextForm;
    if (this._associatedForm && !this._supportsFormInternals) {
      this._associatedForm.addEventListener('formdata', this._handleFormData);
      this._associatedForm.addEventListener('reset', this._handleFormReset);
    }
  }
  _syncFormValue() {
    if (!this._supportsFormInternals) return;
    const internals = this._internals;
    if (!internals) return;
    if (this.disabled || !this.name || !this.value) {
      internals.setFormValue(null);
      return;
    }
    internals.setFormValue(this.value);
  }
  _syncValidity() {
    if (!this._internals || !this._supportsFormInternals || typeof this._internals.setValidity !== 'function') return;
    if (this.disabled || !this.required || this.value) {
      this._internals.setValidity({});
      return;
    }
    this._internals.setValidity({
      valueMissing: true
    }, 'Please capture a photo.');
  }
  _syncPreviewFromValue(file) {
    this._revokePreviewUrl();
    if (!file) return;
    this._stopStream();
    this._previewUrl = URL.createObjectURL(file);
  }
  _clearValue(options) {
    this.value = null;
    this._errorMessage = '';
    if (options.emitEvents) {
      this._dispatchValueEvents();
    }
  }
  _dispatchValueEvents() {
    const detail = {
      value: this.value
    };
    this.dispatchEvent(new CustomEvent('input', {
      detail,
      bubbles: true,
      composed: true
    }));
    this.dispatchEvent(new CustomEvent('change', {
      detail,
      bubbles: true,
      composed: true
    }));
  }
  _fileExtensionForMimeType(mimeType) {
    switch (mimeType) {
      case 'image/jpeg':
        return 'jpg';
      case 'image/webp':
        return 'webp';
      case 'image/gif':
        return 'gif';
      default:
        return 'png';
    }
  }
  _createFileFromBlob(blob) {
    const contentType = blob.type || this.captureFormat || DEFAULT_CAPTURE_FORMAT;
    const extension = this._fileExtensionForMimeType(contentType);
    const safePrefix = (this.fileNamePrefix || this.name || 'photo').trim() || 'photo';
    return new File([blob], `${safePrefix}-${Date.now()}.${extension}`, {
      type: contentType
    });
  }
  _queuePreviewStart() {
    this._startPreview().catch(() => undefined);
  }
  _resolveMediaConstraints() {
    if (this.mediaConstraints) {
      return this.mediaConstraints;
    }
    if (this.constraints) {
      try {
        return JSON.parse(this.constraints);
      } catch (error) {
        throw new Error(`Invalid constraints JSON: ${error.message}`);
      }
    }
    return {
      video: this.facingMode ? {
        facingMode: {
          ideal: this.facingMode
        }
      } : true
    };
  }
  async _startPreview() {
    if (!this.open || this.value || this._startingPreview) return;
    if (!navigator.mediaDevices?.getUserMedia) {
      this._emitError(new Error('navigator.mediaDevices.getUserMedia not available'), 'Camera access is not available in this browser');
      return;
    }
    this._startingPreview = true;
    this._errorMessage = '';
    try {
      const stream = await navigator.mediaDevices.getUserMedia(this._resolveMediaConstraints());
      if (!this.open) {
        stream.getTracks().forEach(track => track.stop());
        return;
      }
      this._stream = stream;
      this.requestUpdate();
      await this.updateComplete;
      const video = this.shadowRoot?.querySelector('video.capture-preview');
      if (video) {
        video.srcObject = stream;
        await video.play?.().catch(() => undefined);
      }
    } catch (error) {
      this._emitError(error, error?.message || 'Unable to start the camera preview');
    } finally {
      this._startingPreview = false;
    }
  }
  _stopStream() {
    if (!this._stream) return;
    this._stream.getTracks().forEach(track => track.stop());
    this._stream = null;
    const video = this.shadowRoot?.querySelector('video.capture-preview');
    if (video) {
      video.srcObject = null;
    }
  }
  _revokePreviewUrl() {
    if (this._previewUrl) {
      URL.revokeObjectURL(this._previewUrl);
    }
    this._previewUrl = '';
  }
  async _captureSnapshot() {
    const video = this.shadowRoot?.querySelector('video.capture-preview');
    if (!video) return;
    const width = video.videoWidth || video.clientWidth || 640;
    const height = video.videoHeight || video.clientHeight || 480;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) {
      this._emitError(new Error('Canvas 2D context unavailable'), 'Unable to capture a photo in this browser');
      return;
    }
    context.drawImage(video, 0, 0, width, height);
    const blob = await new Promise(resolve => {
      canvas.toBlob(resolve, this.captureFormat || DEFAULT_CAPTURE_FORMAT, this.captureQuality);
    });
    if (!blob) {
      this._emitError(new Error('Camera snapshot failed'), 'Unable to create an image from the current camera frame');
      return;
    }
    this.value = this._createFileFromBlob(blob);
    this._errorMessage = '';
  }
  async _retakePhoto() {
    this._clearValue({
      emitEvents: true
    });
    await this._startPreview();
  }
  _confirmPhoto() {
    if (!this.value || !this._previewUrl) return;
    this._dispatchValueEvents();
    this.dispatchEvent(new CustomEvent('photo-captured', {
      detail: {
        file: this.value,
        blob: this.value,
        objectUrl: this._previewUrl,
        contentType: this.value.type || this.captureFormat || DEFAULT_CAPTURE_FORMAT
      },
      bubbles: true,
      composed: true
    }));
    if (this.autoCloseOnCapture) {
      this._setOpen(false);
    }
  }
  _handleCancel() {
    this._stopStream();
    this._clearValue({
      emitEvents: false
    });
    this._setOpen(false);
    this.dispatchEvent(new CustomEvent('cancel', {
      bubbles: true,
      composed: true
    }));
  }
  _openCapture() {
    if (this.disabled) return;
    this._setOpen(true);
  }
  _renderViewport() {
    if (this._previewUrl) {
      return (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`<img class="capture-preview" part="preview-image" src="${this._previewUrl}" alt="Captured photo preview" />`;
    }
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`<video class="capture-preview" part="preview-video" autoplay playsinline muted></video>`;
  }
  _renderStatus() {
    if (this._errorMessage) {
      return (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`<div class="status error" part="error-message">${this._errorMessage}</div>`;
    }
    if (this._startingPreview) {
      return (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`<div class="status" part="status-message">Opening camera…</div>`;
    }
    if (!this.value) {
      return (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`<div class="status" part="status-message">Preview the camera and take a photo when ready.</div>`;
    }
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`<div class="status" part="status-message">Review the photo before confirming it.</div>`;
  }
  _renderActions() {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
      <div class="actions" part="actions">
        ${this.showCancelButton ? (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
            <button
              class="cancel-button"
              part="cancel-button"
              type="button"
              @click="${this._handleCancel}"
            >${this.cancelLabel}</button>
          ` : lit__WEBPACK_IMPORTED_MODULE_0__/* .nothing */ .s6}

        ${this.value ? (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
            <button
              class="action-button"
              part="retake-button"
              type="button"
              @click="${this._retakePhoto}"
            >${this.retakeLabel}</button>
            <button
              class="action-button action-button--primary"
              part="confirm-button"
              type="button"
              @click="${this._confirmPhoto}"
            >${this.confirmLabel}</button>
          ` : (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
            <button
              class="action-button action-button--primary"
              part="capture-button"
              type="button"
              ?disabled="${this._startingPreview || !this._stream}"
              @click="${this._captureSnapshot}"
            >${this.captureLabel}</button>
          `}
      </div>
    `;
  }
  _renderPanel() {
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
      <div class="panel" part="panel">
        <div class="panel-header" part="header">
          <h2 class="panel-heading" part="heading"><slot name="heading">${this.heading}</slot></h2>
          ${this.showCancelButton ? (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
              <button
                class="close-button"
                part="close-button"
                type="button"
                aria-label="${this.cancelLabel}"
                @click="${this._handleCancel}"
              >&times;</button>
            ` : lit__WEBPACK_IMPORTED_MODULE_0__/* .nothing */ .s6}
        </div>
        <div class="viewport" part="viewport">${this._renderViewport()}</div>
        ${this._renderStatus()}
        ${this._renderActions()}
      </div>
    `;
  }
  render() {
    const trigger = this.showTrigger || this.presentation === 'dialog';
    return (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
      ${trigger ? (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
          <button
            class="trigger-button"
            part="trigger-button"
            type="button"
            ?disabled="${this.disabled}"
            @click="${this._openCapture}"
          ><slot>${this.label}</slot></button>
        ` : lit__WEBPACK_IMPORTED_MODULE_0__/* .nothing */ .s6}

      ${this.presentation === 'dialog' ? (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
          <dialog
            class="dialog"
            part="dialog"
            aria-modal="true"
            aria-label="${this.heading}"
            @cancel="${event => {
      event.preventDefault();
      this._handleCancel();
    }}"
            @click="${event => {
      if (event.target === event.currentTarget) {
        this._handleCancel();
      }
    }}"
          >
            ${this.open ? this._renderPanel() : lit__WEBPACK_IMPORTED_MODULE_0__/* .nothing */ .s6}
          </dialog>
        ` : (0,lit__WEBPACK_IMPORTED_MODULE_0__/* .html */ .qy)`
          <div class="inline-root" part="inline-root" ?hidden="${!this.open}">
            ${this.open ? this._renderPanel() : lit__WEBPACK_IMPORTED_MODULE_0__/* .nothing */ .s6}
          </div>
        `}
    `;
  }
}

/***/ },

/***/ 3826
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AH: () => (/* binding */ i),
/* harmony export */   Rf: () => (/* binding */ S),
/* harmony export */   sk: () => (/* binding */ c)
/* harmony export */ });
/* unused harmony exports CSSResult, supportsAdoptingStyleSheets, unsafeCSS */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;class n{constructor(t,e,o){if(this._$cssResult$=!0,o!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o.set(s,t))}return t}toString(){return this.cssText}}const r=t=>new n("string"==typeof t?t:t+"",void 0,s),i=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n(o,t,s)},S=(s,o)=>{if(e)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o)}},c=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r(e)})(t):t;
//# sourceMappingURL=css-tag.js.map


/***/ },

/***/ 8760
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AH: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.AH),
/* harmony export */   mN: () => (/* binding */ y)
/* harmony export */ });
/* unused harmony exports defaultConverter, notEqual */
/* harmony import */ var _css_tag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3826);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i,defineProperty:e,getOwnPropertyDescriptor:h,getOwnPropertyNames:r,getOwnPropertySymbols:o,getPrototypeOf:n}=Object,a=globalThis,c=a.trustedTypes,l=c?c.emptyScript:"",p=a.reactiveElementPolyfillSupport,d=(t,s)=>t,u={toAttribute(t,s){switch(s){case Boolean:t=t?l:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},f=(t,s)=>!i(t,s),b={attribute:!0,type:String,converter:u,reflect:!1,useDefault:!1,hasChanged:f};Symbol.metadata??=Symbol("metadata"),a.litPropertyMetadata??=new WeakMap;class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b){if(s.state&&(s.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=!0),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e(this.prototype,t,h)}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t}};return{get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(d("elementProperties")))return;const t=n(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(d("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(d("properties"))){const t=this.properties,s=[...r(t),...o(t)];for(const i of s)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift((0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__/* .getCompatibleStyle */ .sk)(s))}else void 0!==s&&i.push((0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__/* .getCompatibleStyle */ .sk)(s));return i}static _$Eu(t,s){const i=s.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return (0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__/* .adoptStyles */ .Rf)(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,s,i){this._$AK(t,i)}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&!0===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null}}requestUpdate(t,s,i,e=!1,h){if(void 0!==t){const r=this.constructor;if(!1===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),!0!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),!0===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];!0!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e)}}let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(s)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}}y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[d("elementProperties")]=new Map,y[d("finalized")]=new Map,p?.({ReactiveElement:y}),(a.reactiveElementVersions??=[]).push("2.1.2");
//# sourceMappingURL=reactive-element.js.map


/***/ },

/***/ 5228
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AH: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.AH),
/* harmony export */   WF: () => (/* binding */ i),
/* harmony export */   qy: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.qy),
/* harmony export */   s6: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.s6)
/* harmony export */ });
/* unused harmony export _$LE */
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8760);
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6752);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__/* .ReactiveElement */ .mN{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=(0,lit_html__WEBPACK_IMPORTED_MODULE_1__/* .render */ .XX)(r,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return lit_html__WEBPACK_IMPORTED_MODULE_1__/* .noChange */ .c0}}i._$litElement$=!0,i["finalized"]=!0,s.litElementHydrateSupport?.({LitElement:i});const o=s.litElementPolyfillSupport;o?.({LitElement:i});const n={_$AK:(t,e,r)=>{t._$AK(e,r)},_$AL:t=>t._$AL};(s.litElementVersions??=[]).push("4.2.2");
//# sourceMappingURL=lit-element.js.map


/***/ },

/***/ 6752
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   XX: () => (/* binding */ D),
/* harmony export */   c0: () => (/* binding */ E),
/* harmony export */   qy: () => (/* binding */ b),
/* harmony export */   s6: () => (/* binding */ A)
/* harmony export */ });
/* unused harmony exports _$LH, mathml, svg */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i=t=>t,s=t.trustedTypes,e=s?s.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o,r=`<${n}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),w=x(2),T=x(3),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o+x):s+o+(-2===d?i:x)}return[V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t)}else t.startsWith(o)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o),i=t.length-1;if(i>0){r.textContent=s?s.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c())}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else{let t=-1;for(;-1!==(t=r.data.indexOf(o,t+1));)d.push({type:7,index:l}),t+=o.length-1}l++}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(!1),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,!0);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n]}o!==r?.index&&(h=P.nextNode(),o++)}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else{const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e)}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(!1,!0,s);t!==this._$AB;){const s=i(t).nextSibling;i(t).remove(),t=s}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A}_$AI(t,i=this,s,e){const h=this.strings;let o=!1;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else{const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r}o&&!e&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t)}}const j={M:h,P:o,A:n,C:1,L:N,R,D:d,V:M,I:k,H,N:L,U:z,B:I,F:Z},B=t.litHtmlPolyfillSupport;B?.(S,k),(t.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{})}return h._$AI(t),h};
//# sourceMappingURL=lit-html.js.map


/***/ },

/***/ 6161
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AH: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.AH),
/* harmony export */   WF: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.WF),
/* harmony export */   qy: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.qy),
/* harmony export */   s6: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.s6)
/* harmony export */ });
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8760);
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6752);
/* harmony import */ var lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5228);

//# sourceMappingURL=index.js.map


/***/ }

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   v: () => (/* reexport safe */ _PhotoCapture__WEBPACK_IMPORTED_MODULE_0__.v)
/* harmony export */ });
/* harmony import */ var _PhotoCapture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3604);


const PHOTO_CAPTURE_TAG_NAME = 'solid-ui-photo-capture';
if (!customElements.get(PHOTO_CAPTURE_TAG_NAME)) {
  customElements.define(PHOTO_CAPTURE_TAG_NAME, _PhotoCapture__WEBPACK_IMPORTED_MODULE_0__/* .PhotoCapture */ .v);
}
const __webpack_exports__PhotoCapture = __webpack_exports__.v;
export { __webpack_exports__PhotoCapture as PhotoCapture };

//# sourceMappingURL=index.esm.js.map