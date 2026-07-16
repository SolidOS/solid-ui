import { html } from 'lit'
import { property } from 'lit/decorators.js'
import { customElement, FormControlComponent } from '@/lib/components'
import { showDialog } from '@/lib/dialogs'

import PhotoCaptureModal from '@/components/photo-capture-modal'

@customElement('solid-ui-photo-capture')
export default class PhotoCapture extends FormControlComponent<File> {
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

  @property({ type: String, attribute: 'facing-mode', reflect: true })
  accessor facingMode = 'user'

  @property({ type: String, reflect: true })
  accessor constraints = ''

  @property({ type: String, attribute: 'capture-format', reflect: true })
  accessor captureFormat = 'image/png'

  @property({ type: Number, attribute: 'capture-quality' })
  accessor captureQuality: number | undefined = undefined

  @property({ type: Boolean, attribute: 'show-cancel-button', reflect: true })
  accessor showCancelButton = true

  @property({ type: String, attribute: 'file-name-prefix', reflect: true })
  accessor fileNamePrefix = ''

  @property({ attribute: false })
  accessor mediaConstraints: MediaStreamConstraints | undefined = undefined

  protected controlElement = null

  protected render () {
    return html`
        <slot name="trigger" @click=${this.onClick}>
            <solid-ui-button ?disabled="${this.disabled}">${this.label}</solid-ui-button>
        </slot>
    `
  }

  private onClick () {
    showDialog(PhotoCaptureModal, {
      props: {
        name: this.name,
        heading: this.heading,
        captureLabel: this.captureLabel,
        confirmLabel: this.confirmLabel,
        retakeLabel: this.retakeLabel,
        cancelLabel: this.cancelLabel,
        fileNamePrefix: this.fileNamePrefix,
        mediaConstraints: this.mediaConstraints,
        constraints: this.constraints,
        captureFormat: this.captureFormat,
        captureQuality: this.captureQuality,
        showCancelButton: this.showCancelButton,
        facingMode: this.facingMode,
      },
      onClose: value => this.controlTrait.setValue(value ?? null)
    })
  }
}
