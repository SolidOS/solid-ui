import { customElement, WebComponent } from '@/lib/components'
import { html } from 'lit'
import { state, query } from 'lit/decorators.js'
import type PhotoCapture from '@/components/photo-capture'

import '@/components/photo-capture'

import styles from './PhotoCaptureSandbox.styles.css'

@customElement('solid-ui-photo-capture-sandbox')
export default class PhotoCaptureSandbox extends WebComponent {
  static styles = styles

  @state()
  private accessor imageUrl: string | null = null

  @query('solid-ui-photo-capture')
  private accessor photoCapture: PhotoCapture | null = null

  protected render () {
    const photoCapture = html`
        <solid-ui-photo-capture
            heading="PhotoCapture Sandbox"
            confirm-label="Use the photo"
            @input=${this.onInput}
        ></solid-ui-photo-capture>
    `

    if (this.imageUrl) {
      return html`
            ${photoCapture}

            <p>The photo you captured:</p>
            <img src=${this.imageUrl} alt="Captured photo" />
        `
    }

    return html`
        <p>Use the following button to capture a photo:</p>

        ${photoCapture}
    `
  }

  private onInput () {
    const file = this.photoCapture?.value ?? null

    this.imageUrl = file ? URL.createObjectURL(file) : null
  }
}
