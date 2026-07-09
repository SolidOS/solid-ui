import { html, nothing, type PropertyValues } from 'lit'
import { property, state } from 'lit/decorators.js'
import { customElement, FormControlComponent } from '@/lib/components'

import styles from './PhotoCapture.styles.css'

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

@customElement('solid-ui-photo-capture')
export default class PhotoCapture extends FormControlComponent<File> {
  static styles = styles

  @property({ type: String, reflect: true })
  accessor label = 'Take Photo'

  @property({ type: String, reflect: true })
  accessor heading = 'Take a photo'

  @property({ type: String, attribute: 'capture-label', reflect: true })
  accessor captureLabel = 'Take Photo'

  @property({ type: String, attribute: 'confirm-label', reflect: true })
  accessor confirmLabel = 'Use Photo'

  @property({ type: String, attribute: 'retake-label', reflect: true })
  accessor retakeLabel = 'Retake'

  @property({ type: String, attribute: 'cancel-label', reflect: true })
  accessor cancelLabel = 'Cancel'

  @property({ type: String, reflect: true })
  accessor presentation: PresentationMode = 'inline'

  @property({ type: String, reflect: true })
  accessor theme: ThemeMode = 'light'

  @property({ type: String, attribute: 'facing-mode', reflect: true })
  accessor facingMode = 'user'

  @property({ type: String, reflect: true })
  accessor constraints = ''

  @property({ type: String, attribute: 'capture-format', reflect: true })
  accessor captureFormat = DEFAULT_CAPTURE_FORMAT

  @property({ type: Number, attribute: 'capture-quality' })
  accessor captureQuality: number | undefined = undefined

  @property({ type: Boolean, reflect: true })
  accessor open = false

  @property({ type: Boolean, attribute: 'show-trigger', reflect: true })
  accessor showTrigger = false

  @property({ type: Boolean, attribute: 'show-cancel-button', reflect: true })
  accessor showCancelButton = true

  @property({ type: Boolean, attribute: 'auto-close-on-capture' })
  accessor autoCloseOnCapture = false

  @property({ type: String, attribute: 'file-name-prefix', reflect: true })
  accessor fileNamePrefix = ''

  @property({ attribute: false })
  accessor mediaConstraints: MediaStreamConstraints | undefined = undefined

  @state()
  accessor errorMessage = ''

  @state()
  accessor previewUrl = ''

  @state()
  accessor startingPreview = false

  protected controlElement = null

  private _stream: MediaStream | null = null

  private readonly _handleFormReset = () => {
    this._clearValue({ emitEvents: false })
    if (this.open) {
      this._queuePreviewStart()
    }
  }

  get form (): HTMLFormElement | null {
    return this.internals?.form ?? null
  }

  get validationMessage (): string {
    return (typeof this.internals?.validationMessage === 'string' ? this.internals.validationMessage : '') || (this.required && !this.value ? 'Please capture a photo.' : '')
  }

  get willValidate (): boolean {
    return typeof this.internals?.willValidate === 'boolean' ? this.internals.willValidate : !this.disabled
  }

  checkValidity (): boolean {
    if (this.internals && typeof this.internals.checkValidity === 'function') {
      return this.internals.checkValidity()
    }

    return !(this.required && !this.value)
  }

  reportValidity (): boolean {
    if (this.internals && typeof this.internals.reportValidity === 'function') {
      return this.internals.reportValidity()
    }
    return this.checkValidity()
  }

  disconnectedCallback () {
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

  protected willUpdate (changed: PropertyValues<this>) {
    super.willUpdate(changed)

    if (changed.has('value')) {
      const normalizedValue = this.value instanceof File ? this.value : null
      if (normalizedValue !== this.value) {
        this.value = normalizedValue
        return
      }
      this._syncPreviewFromValue(normalizedValue)
    }
  }

  protected updated (changed: PropertyValues<this>) {
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
      !this.startingPreview &&
      (changed.has('open') || changed.has('presentation') || changed.has('previewUrl') || changed.has('value'))
    ) {
      this._queuePreviewStart()
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
    this.errorMessage = message
    this.dispatchEvent(new CustomEvent<PhotoCaptureErrorDetail>('error', {
      detail: { error, message },
      bubbles: true,
      composed: true
    }))
  }

  private _syncPreviewFromValue (file: File | null) {
    this._revokePreviewUrl()
    if (!file) return
    this._stopStream()
    this.previewUrl = URL.createObjectURL(file)
  }

  private _clearValue (options: { emitEvents: boolean }) {
    this.value = null
    this.errorMessage = ''
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
    if (!this.open || this.value || this.startingPreview) return
    if (!navigator.mediaDevices?.getUserMedia) {
      this._emitError(new Error('navigator.mediaDevices.getUserMedia not available'), 'Camera access is not available in this browser')
      return
    }

    this.startingPreview = true
    this.errorMessage = ''

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
      this.startingPreview = false
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
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl)
    }
    this.previewUrl = ''
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
    this.errorMessage = ''
  }

  private async _retakePhoto () {
    this._clearValue({ emitEvents: true })
    await this._startPreview()
  }

  private _confirmPhoto () {
    if (!this.value || !this.previewUrl) return

    this._dispatchValueEvents()

    this.dispatchEvent(new CustomEvent<PhotoCapturedDetail>('photo-captured', {
      detail: {
        file: this.value,
        blob: this.value,
        objectUrl: this.previewUrl,
        contentType: this.value.type || this.captureFormat || DEFAULT_CAPTURE_FORMAT
      },
      bubbles: true,
      composed: true
    }))

    this.controlTrait.setValue(this.value)

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
    if (this.previewUrl) {
      return html`<img class="capture-preview" part="preview-image" src="${this.previewUrl}" alt="Captured photo preview" />`
    }

    return html`<video class="capture-preview" part="preview-video" autoplay playsinline muted></video>`
  }

  private _renderStatus () {
    if (this.errorMessage) {
      return html`<div class="status error" part="error-message">${this.errorMessage}</div>`
    }

    if (this.startingPreview) {
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
              ?disabled="${this.startingPreview || !this._stream}"
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
