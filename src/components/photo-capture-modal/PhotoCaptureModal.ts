import { customElement, DialogComponent } from '@/lib/components'
import { html, PropertyValues, nothing } from 'lit'
import { property, state } from 'lit/decorators.js'

import '@/components/button'
import '@/components/dialog'
import '@/components/dialog-content'
import '@/components/dialog-footer'

import styles from './PhotoCaptureModal.styles.css'

@customElement('solid-ui-photo-capture-modal')
export default class PhotoCaptureModal extends DialogComponent<File> {
  static styles = styles

  @property({ type: String, reflect: true })
  accessor name = ''

  @property({ type: String, reflect: true })
  accessor heading = 'Take a photo'

  @property({ type: String, reflect: true })
  accessor captureLabel = 'Take Photo'

  @property({ type: String, reflect: true })
  accessor confirmLabel = 'Use Photo'

  @property({ type: String, reflect: true })
  accessor retakeLabel = 'Retake'

  @property({ type: String, attribute: 'cancel-label', reflect: true })
  accessor cancelLabel = 'Cancel'

  @property({ type: String, attribute: 'file-name-prefix', reflect: true })
  accessor fileNamePrefix = ''

  @property({ attribute: false })
  accessor mediaConstraints: MediaStreamConstraints | undefined = undefined

  @property({ type: String, reflect: true })
  accessor constraints = ''

  @property({ type: String, attribute: 'capture-format', reflect: true })
  accessor captureFormat = 'image/png'

  @property({ type: Number, attribute: 'capture-quality' })
  accessor captureQuality: number | undefined = undefined

  @property({ type: Boolean, attribute: 'show-cancel-button', reflect: true })
  accessor showCancelButton = true

  @property({ type: String, attribute: 'facing-mode', reflect: true })
  accessor facingMode = 'user'

  @state()
  accessor errorMessage = ''

  @state()
  accessor previewUrl = ''

  @state()
  accessor startingPreview = false

  @state()
  accessor value: File | null = null

  private stream: MediaStream | null = null

  disconnectedCallback () {
    this.stopStream()
    this.revokePreviewUrl()
    super.disconnectedCallback()
  }

  protected willUpdate (changed: PropertyValues<this>) {
    super.willUpdate(changed)

    if (changed.has('value')) {
      const normalizedValue = this.value instanceof File ? this.value : null

      if (normalizedValue !== this.value) {
        this.value = normalizedValue

        return
      }

      this.syncPreviewFromValue(normalizedValue)
    }
  }

  protected updated (changed: PropertyValues<this>) {
    if (
      !this.value &&
      !this.stream &&
      !this.startingPreview &&
      (changed.has('previewUrl') || changed.has('value'))
    ) {
      this.queuePreviewStart()
    }

    if (this.stream) {
      const video = this.shadowRoot?.querySelector<HTMLVideoElement>('video')

      if (video && video.srcObject !== this.stream) {
        video.srcObject = this.stream
      }
    }
  }

  protected render () {
    return html`
        <solid-ui-dialog title=${this.heading}>
            <solid-ui-dialog-content>
                ${this.renderViewport()}
                ${this.renderStatus()}
            </solid-ui-dialog-content>
            <solid-ui-dialog-footer>
                ${this.showCancelButton
                    ? html`<solid-ui-button variant="secondary" @click=${() => this.close()}>${this.cancelLabel}</solid-ui-button>`
                    : nothing
                }

                ${this.value
                  ? html`
                    <solid-ui-button @click=${this.onRetake}>${this.retakeLabel}</solid-ui-button>
                    <solid-ui-button @click=${this.onConfirm}>${this.confirmLabel}</solid-ui-button>
                  `
                  : html`
                    <solid-ui-button
                        ?disabled=${this.startingPreview || !this.stream}
                        @click=${this.onCapture}
                    >
                        ${this.captureLabel}
                    </solid-ui-button>
                  `
                }
            </solid-ui-dialog-footer>
        </solid-ui-dialog>
    `
  }

  private renderViewport () {
    const contents = this.previewUrl
      ? html`<img src="${this.previewUrl}" alt="Captured photo preview" />`
      : html`<video autoplay playsinline muted></video>`

    return html`<div class="viewport">${contents}</div>`
  }

  private renderStatus () {
    if (this.errorMessage) {
      return html`<div class="status error">${this.errorMessage}</div>`
    }

    if (this.startingPreview) {
      return html`<div class="status">Opening camera…</div>`
    }

    if (!this.value) {
      return html`<div class="status">Preview the camera and take a photo when ready.</div>`
    }

    return html`<div class="status">Review the photo before confirming it.</div>`
  }

  private onRetake () {
    this.clearValue()
    this.queuePreviewStart()
  }

  private onConfirm () {
    if (!this.value) {
      return
    }

    this.close(this.value)
  }

  private async onCapture () {
    const video = this.shadowRoot?.querySelector<HTMLVideoElement>('video')

    if (!video) {
      return
    }

    const width = video.videoWidth || video.clientWidth || 640
    const height = video.videoHeight || video.clientHeight || 480
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')

    if (!context) {
      this.errorMessage = 'Unable to capture a photo in this browser'

      return
    }

    context.drawImage(video, 0, 0, width, height)

    const blob = await new Promise<Blob | null>(resolve => {
      canvas.toBlob(resolve, this.captureFormat, this.captureQuality)
    })

    if (!blob) {
      this.errorMessage = 'Unable to create an image from the current camera frame'

      return
    }

    this.value = this.createFileFromBlob(blob)
    this.errorMessage = ''
  }

  private createFileFromBlob (blob: Blob): File {
    const contentType = blob.type || this.captureFormat
    const extension = this.fileExtensionForMimeType(contentType)
    const safePrefix = (this.fileNamePrefix || this.name || 'photo').trim() || 'photo'

    return new File([blob], `${safePrefix}-${Date.now()}.${extension}`, { type: contentType })
  }

  private fileExtensionForMimeType (mimeType: string): string {
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

  private queuePreviewStart () {
    this.startPreview().catch(() => undefined)
  }

  private stopStream () {
    if (!this.stream) {
      return
    }

    this.stream.getTracks().forEach(track => track.stop())
    this.stream = null

    const video = this.shadowRoot?.querySelector<HTMLVideoElement>('video')

    if (video) {
      video.srcObject = null
    }
  }

  private syncPreviewFromValue (file: File | null) {
    this.revokePreviewUrl()

    if (!file) {
      return
    }

    this.stopStream()
    this.previewUrl = URL.createObjectURL(file)
  }

  private clearValue () {
    this.value = null
    this.errorMessage = ''
  }

  private revokePreviewUrl () {
    if (this.previewUrl) {
      URL.revokeObjectURL(this.previewUrl)
    }

    this.previewUrl = ''
  }

  private async startPreview () {
    if (this.value || this.startingPreview) {
      return
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      this.errorMessage = 'Camera access is not available in this browser'

      return
    }

    this.startingPreview = true
    this.errorMessage = ''

    try {
      const stream = await navigator.mediaDevices.getUserMedia(this.resolveMediaConstraints())

      this.stream = stream
      this.requestUpdate()

      await this.updateComplete

      const video = this.shadowRoot?.querySelector<HTMLVideoElement>('video')

      if (video) {
        video.srcObject = stream

        await video.play?.().catch(() => undefined)
      }
    } catch (error) {
      this.errorMessage = (error as Error)?.message || 'Unable to start the camera preview'
    } finally {
      this.startingPreview = false
    }
  }

  private resolveMediaConstraints (): MediaStreamConstraints {
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
}
