import { LitElement, css, html, nothing, type PropertyValues } from 'lit'
/* The original code was written by Sir Tim Berners-Lee. It was made into a
web component by AI Model GPT-5.4
Prompt: Take the code from src/media/media-capture.ts and make it a
web component. Make it work in forms as well as not. Make it
configurable and follow LoginButton. */
export interface PhotoCapturedDetail {
  file: File
  blob: Blob
  objectUrl: string
  contentType: string
}

export interface PhotoCaptureErrorDetail {
  error: unknown
  message: string
}

export interface PhotoCaptureOpenChangeDetail {
  open: boolean
}

export interface PhotoCaptureValueDetail {
  value: File | null
}

type PresentationMode = 'inline' | 'dialog'
type ThemeMode = 'light' | 'dark'

const DEFAULT_CAPTURE_FORMAT = 'image/png'

export class PhotoCapture extends LitElement {
  static formAssociated = true

  static properties = {
    label: { type: String, reflect: true },
    heading: { type: String, reflect: true },
    captureLabel: { type: String, attribute: 'capture-label', reflect: true },
    confirmLabel: { type: String, attribute: 'confirm-label', reflect: true },
    retakeLabel: { type: String, attribute: 'retake-label', reflect: true },
    cancelLabel: { type: String, attribute: 'cancel-label', reflect: true },
    presentation: { type: String, reflect: true },
    theme: { type: String, reflect: true },
    facingMode: { type: String, attribute: 'facing-mode', reflect: true },
    constraints: { type: String, reflect: true },
    captureFormat: { type: String, attribute: 'capture-format', reflect: true },
    captureQuality: { type: Number, attribute: 'capture-quality' },
    open: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    name: { type: String, reflect: true },
    required: { type: Boolean, reflect: true },
    showTrigger: { type: Boolean, attribute: 'show-trigger', reflect: true },
    showCancelButton: { type: Boolean, attribute: 'show-cancel-button', reflect: true },
    autoCloseOnCapture: { type: Boolean, attribute: 'auto-close-on-capture' },
    fileNamePrefix: { type: String, attribute: 'file-name-prefix', reflect: true },
    value: { attribute: false },
    mediaConstraints: { attribute: false },
    _errorMessage: { state: true },
    _previewUrl: { state: true },
    _startingPreview: { state: true }
  }

  static styles = css`
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
  `

  declare label: string
  declare heading: string
  declare captureLabel: string
  declare confirmLabel: string
  declare retakeLabel: string
  declare cancelLabel: string
  declare presentation: PresentationMode
  declare theme: ThemeMode
  declare facingMode: string
  declare constraints: string
  declare captureFormat: string
  declare captureQuality?: number
  declare open: boolean
  declare disabled: boolean
  declare name: string
  declare required: boolean
  declare showTrigger: boolean
  declare showCancelButton: boolean
  declare autoCloseOnCapture: boolean
  declare fileNamePrefix: string
  declare mediaConstraints?: MediaStreamConstraints
  declare _errorMessage: string
  declare _previewUrl: string
  declare _startingPreview: boolean

  private _value: File | null = null
  private _stream: MediaStream | null = null
  private readonly _internals: ElementInternals | null
  private _associatedForm: HTMLFormElement | null = null
  private readonly _handleFormData = (event: Event) => {
    const formData = (event as Event & { formData?: FormData }).formData
    if (!formData || !this.name || !this.value || this.disabled) return
    formData.append(this.name, this.value, this.value.name)
  }

  private readonly _handleFormReset = () => {
    this._clearValue({ emitEvents: false })
    if (this.open) {
      this._queuePreviewStart()
    }
  }

  private get _supportsFormInternals (): boolean {
    return !!this._internals && typeof this._internals.setFormValue === 'function'
  }

  constructor () {
    super()
    this.label = 'Take Photo'
    this.heading = 'Take a photo'
    this.captureLabel = 'Take Photo'
    this.confirmLabel = 'Use Photo'
    this.retakeLabel = 'Retake'
    this.cancelLabel = 'Cancel'
    this.presentation = 'inline'
    this.theme = 'light'
    this.facingMode = 'environment'
    this.constraints = ''
    this.captureFormat = DEFAULT_CAPTURE_FORMAT
    this.captureQuality = undefined
    this.open = true
    this.disabled = false
    this.name = ''
    this.required = false
    this.showTrigger = false
    this.showCancelButton = true
    this.autoCloseOnCapture = false
    this.fileNamePrefix = ''
    this.mediaConstraints = undefined
    this._errorMessage = ''
    this._previewUrl = ''
    this._startingPreview = false
    this._internals = typeof this.attachInternals === 'function' ? this.attachInternals() : null
  }

  get value (): File | null {
    return this._value
  }

  set value (nextValue: File | null) {
    const normalizedValue = nextValue instanceof File ? nextValue : null
    const previousValue = this._value
    if (previousValue === normalizedValue) return

    this._value = normalizedValue
    this._syncPreviewFromValue(normalizedValue)
    this._syncFormValue()
    this._syncValidity()
    this.requestUpdate('value', previousValue)
  }

  get form (): HTMLFormElement | null {
    return (this._supportsFormInternals ? this._internals?.form : null) ?? this._associatedForm
  }

  get validationMessage (): string {
    return (typeof this._internals?.validationMessage === 'string' ? this._internals.validationMessage : '') || (this.required && !this.value ? 'Please capture a photo.' : '')
  }

  get willValidate (): boolean {
    return typeof this._internals?.willValidate === 'boolean' ? this._internals.willValidate : !this.disabled
  }

  checkValidity (): boolean {
    if (this._internals && typeof this._internals.checkValidity === 'function') {
      return this._internals.checkValidity()
    }
    return !(this.required && !this.value)
  }

  reportValidity (): boolean {
    if (this._internals && typeof this._internals.reportValidity === 'function') {
      return this._internals.reportValidity()
    }
    return this.checkValidity()
  }

  connectedCallback () {
    super.connectedCallback()
    this._syncAssociatedForm()
    this._syncFormValue()
    this._syncValidity()
  }

  disconnectedCallback () {
    this._syncAssociatedForm(null)
    this._stopStream()
    this._revokePreviewUrl()
    super.disconnectedCallback()
  }

  formResetCallback () {
    this._handleFormReset()
  }

  formDisabledCallback (disabled: boolean) {
    this.disabled = disabled
  }

  protected updated (changed: PropertyValues<this>) {
    this._syncAssociatedForm()

    if (this.presentation === 'dialog') {
      const dialog = this.shadowRoot?.querySelector('dialog') as HTMLDialogElement | null
      if (dialog) {
        if (this.open && !dialog.open) {
          dialog.showModal()
        } else if (!this.open && dialog.open) {
          dialog.close()
        }
      }
    }

    if (changed.has('open') && !this.open) {
      this._stopStream()
    }

    if (
      this.open &&
      !this.value &&
      !this._stream &&
      !this._startingPreview &&
      (changed.has('open') || changed.has('presentation') || changed.has('_previewUrl') || changed.has('value'))
    ) {
      this._queuePreviewStart()
    }

    if (changed.has('name') || changed.has('disabled') || changed.has('value')) {
      this._syncFormValue()
    }

    if (changed.has('required') || changed.has('disabled') || changed.has('value')) {
      this._syncValidity()
    }

    if (this._stream) {
      const video = this.shadowRoot?.querySelector('video.capture-preview') as HTMLVideoElement | null
      if (video && video.srcObject !== this._stream) {
        video.srcObject = this._stream
      }
    }
  }

  private _setOpen (open: boolean) {
    if (this.open === open) return
    this.open = open
    this.dispatchEvent(new CustomEvent<PhotoCaptureOpenChangeDetail>('open-change', {
      detail: { open },
      bubbles: true,
      composed: true
    }))
  }

  private _emitError (error: unknown, message = 'Unable to access the camera') {
    this._errorMessage = message
    this.dispatchEvent(new CustomEvent<PhotoCaptureErrorDetail>('error', {
      detail: { error, message },
      bubbles: true,
      composed: true
    }))
  }

  private _syncAssociatedForm (nextForm = this.closest('form') as HTMLFormElement | null) {
    if (this._associatedForm === nextForm) return

    if (this._associatedForm) {
      this._associatedForm.removeEventListener('formdata', this._handleFormData)
      this._associatedForm.removeEventListener('reset', this._handleFormReset)
    }

    this._associatedForm = nextForm

    if (this._associatedForm && !this._supportsFormInternals) {
      this._associatedForm.addEventListener('formdata', this._handleFormData)
      this._associatedForm.addEventListener('reset', this._handleFormReset)
    }
  }

  private _syncFormValue () {
    if (!this._supportsFormInternals) return
    const internals = this._internals
    if (!internals) return
    if (this.disabled || !this.name || !this.value) {
      internals.setFormValue(null)
      return
    }
    internals.setFormValue(this.value)
  }

  private _syncValidity () {
    if (!this._internals || !this._supportsFormInternals || typeof this._internals.setValidity !== 'function') return
    if (this.disabled || !this.required || this.value) {
      this._internals.setValidity({})
      return
    }
    this._internals.setValidity({ valueMissing: true }, 'Please capture a photo.')
  }

  private _syncPreviewFromValue (file: File | null) {
    this._revokePreviewUrl()
    if (!file) return
    this._stopStream()
    this._previewUrl = URL.createObjectURL(file)
  }

  private _clearValue (options: { emitEvents: boolean }) {
    this.value = null
    this._errorMessage = ''
    if (options.emitEvents) {
      this._dispatchValueEvents()
    }
  }

  private _dispatchValueEvents () {
    const detail = { value: this.value }
    this.dispatchEvent(new CustomEvent<PhotoCaptureValueDetail>('input', {
      detail,
      bubbles: true,
      composed: true
    }))
    this.dispatchEvent(new CustomEvent<PhotoCaptureValueDetail>('change', {
      detail,
      bubbles: true,
      composed: true
    }))
  }

  private _fileExtensionForMimeType (mimeType: string): string {
    switch (mimeType) {
      case 'image/jpeg':
        return 'jpg'
      case 'image/webp':
        return 'webp'
      case 'image/gif':
        return 'gif'
      default:
        return 'png'
    }
  }

  private _createFileFromBlob (blob: Blob): File {
    const contentType = blob.type || this.captureFormat || DEFAULT_CAPTURE_FORMAT
    const extension = this._fileExtensionForMimeType(contentType)
    const safePrefix = (this.fileNamePrefix || this.name || 'photo').trim() || 'photo'
    return new File([blob], `${safePrefix}-${Date.now()}.${extension}`, { type: contentType })
  }

  private _queuePreviewStart () {
    this._startPreview().catch(() => undefined)
  }

  private _resolveMediaConstraints (): MediaStreamConstraints {
    if (this.mediaConstraints) {
      return this.mediaConstraints
    }
    if (this.constraints) {
      try {
        return JSON.parse(this.constraints) as MediaStreamConstraints
      } catch (error) {
        throw new Error(`Invalid constraints JSON: ${(error as Error).message}`)
      }
    }

    return {
      video: this.facingMode
        ? { facingMode: { ideal: this.facingMode } }
        : true
    }
  }

  private async _startPreview () {
    if (!this.open || this.value || this._startingPreview) return
    if (!navigator.mediaDevices?.getUserMedia) {
      this._emitError(new Error('navigator.mediaDevices.getUserMedia not available'), 'Camera access is not available in this browser')
      return
    }

    this._startingPreview = true
    this._errorMessage = ''

    try {
      const stream = await navigator.mediaDevices.getUserMedia(this._resolveMediaConstraints())
      if (!this.open) {
        stream.getTracks().forEach(track => track.stop())
        return
      }
      this._stream = stream
      this.requestUpdate()
      await this.updateComplete
      const video = this.shadowRoot?.querySelector('video.capture-preview') as HTMLVideoElement | null
      if (video) {
        video.srcObject = stream
        await video.play?.().catch(() => undefined)
      }
    } catch (error) {
      this._emitError(error, (error as Error)?.message || 'Unable to start the camera preview')
    } finally {
      this._startingPreview = false
    }
  }

  private _stopStream () {
    if (!this._stream) return
    this._stream.getTracks().forEach(track => track.stop())
    this._stream = null
    const video = this.shadowRoot?.querySelector('video.capture-preview') as HTMLVideoElement | null
    if (video) {
      video.srcObject = null
    }
  }

  private _revokePreviewUrl () {
    if (this._previewUrl) {
      URL.revokeObjectURL(this._previewUrl)
    }
    this._previewUrl = ''
  }

  private async _captureSnapshot () {
    const video = this.shadowRoot?.querySelector('video.capture-preview') as HTMLVideoElement | null
    if (!video) return

    const width = video.videoWidth || video.clientWidth || 640
    const height = video.videoHeight || video.clientHeight || 480
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    if (!context) {
      this._emitError(new Error('Canvas 2D context unavailable'), 'Unable to capture a photo in this browser')
      return
    }

    context.drawImage(video, 0, 0, width, height)

    const blob = await new Promise<Blob | null>(resolve => {
      canvas.toBlob(resolve, this.captureFormat || DEFAULT_CAPTURE_FORMAT, this.captureQuality)
    })

    if (!blob) {
      this._emitError(new Error('Camera snapshot failed'), 'Unable to create an image from the current camera frame')
      return
    }

    this.value = this._createFileFromBlob(blob)
    this._errorMessage = ''
  }

  private async _retakePhoto () {
    this._clearValue({ emitEvents: true })
    await this._startPreview()
  }

  private _confirmPhoto () {
    if (!this.value || !this._previewUrl) return

    this._dispatchValueEvents()

    this.dispatchEvent(new CustomEvent<PhotoCapturedDetail>('photo-captured', {
      detail: {
        file: this.value,
        blob: this.value,
        objectUrl: this._previewUrl,
        contentType: this.value.type || this.captureFormat || DEFAULT_CAPTURE_FORMAT
      },
      bubbles: true,
      composed: true
    }))

    if (this.autoCloseOnCapture) {
      this._setOpen(false)
    }
  }

  private _handleCancel () {
    this._stopStream()
    this._clearValue({ emitEvents: false })
    this._setOpen(false)
    this.dispatchEvent(new CustomEvent('cancel', {
      bubbles: true,
      composed: true
    }))
  }

  private _openCapture () {
    if (this.disabled) return
    this._setOpen(true)
  }

  private _renderViewport () {
    if (this._previewUrl) {
      return html`<img class="capture-preview" part="preview-image" src="${this._previewUrl}" alt="Captured photo preview" />`
    }

    return html`<video class="capture-preview" part="preview-video" autoplay playsinline muted></video>`
  }

  private _renderStatus () {
    if (this._errorMessage) {
      return html`<div class="status error" part="error-message">${this._errorMessage}</div>`
    }

    if (this._startingPreview) {
      return html`<div class="status" part="status-message">Opening camera…</div>`
    }

    if (!this.value) {
      return html`<div class="status" part="status-message">Preview the camera and take a photo when ready.</div>`
    }

    return html`<div class="status" part="status-message">Review the photo before confirming it.</div>`
  }

  private _renderActions () {
    return html`
      <div class="actions" part="actions">
        ${this.showCancelButton
          ? html`
            <button
              class="cancel-button"
              part="cancel-button"
              type="button"
              @click="${this._handleCancel}"
            >${this.cancelLabel}</button>
          `
          : nothing}

        ${this.value
          ? html`
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
          `
          : html`
            <button
              class="action-button action-button--primary"
              part="capture-button"
              type="button"
              ?disabled="${this._startingPreview || !this._stream}"
              @click="${this._captureSnapshot}"
            >${this.captureLabel}</button>
          `}
      </div>
    `
  }

  private _renderPanel () {
    return html`
      <div class="panel" part="panel">
        <div class="panel-header" part="header">
          <h2 class="panel-heading" part="heading"><slot name="heading">${this.heading}</slot></h2>
          ${this.showCancelButton
            ? html`
              <button
                class="close-button"
                part="close-button"
                type="button"
                aria-label="${this.cancelLabel}"
                @click="${this._handleCancel}"
              >&times;</button>
            `
            : nothing}
        </div>
        <div class="viewport" part="viewport">${this._renderViewport()}</div>
        ${this._renderStatus()}
        ${this._renderActions()}
      </div>
    `
  }

  render () {
    const trigger = this.showTrigger || this.presentation === 'dialog'

    return html`
      ${trigger
        ? html`
          <button
            class="trigger-button"
            part="trigger-button"
            type="button"
            ?disabled="${this.disabled}"
            @click="${this._openCapture}"
          ><slot>${this.label}</slot></button>
        `
        : nothing}

      ${this.presentation === 'dialog'
        ? html`
          <dialog
            class="dialog"
            part="dialog"
            aria-modal="true"
            aria-label="${this.heading}"
            @cancel="${(event: Event) => { event.preventDefault(); this._handleCancel() }}"
            @click="${(event: MouseEvent) => {
              if (event.target === event.currentTarget) {
                this._handleCancel()
              }
            }}"
          >
            ${this.open ? this._renderPanel() : nothing}
          </dialog>
        `
        : html`
          <div class="inline-root" part="inline-root" ?hidden="${!this.open}">
            ${this.open ? this._renderPanel() : nothing}
          </div>
        `}
    `
  }
}
