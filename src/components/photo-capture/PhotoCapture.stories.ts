import { html } from 'lit'

import './docs/photo-capture-sandbox'

const meta = {
  title: 'Advanced/PhotoCapture',
  parameters: {
    docs: {
      source: {
        language: 'ts',
        code: `
            import { customElement, WebComponent } from 'solid-ui'
            import { html } from 'lit'
            import { state, query } from 'lit/decorators.js'

            import PhotoCapture from 'solid-ui/components/photo-capture'

            import styles from './PhotoCaptureSandbox.styles.css'

            @customElement('my-photo-capture-sandbox')
            export default class PhotoCaptureSandbox extends WebComponent {
                static styles = styles

                @state()
                private accessor imageUrl: string | null = null

                @query('solid-ui-photo-capture')
                private accessor photoCapture: PhotoCapture | null = null

                protected render () {
                    const photoCapture = html\`
                        <solid-ui-photo-capture
                            heading="PhotoCapture Sandbox"
                            confirm-label="Use the photo"
                            @input=\${this.onInput}
                        ></solid-ui-photo-capture>
                    \`

                    if (this.imageUrl) {
                        return html\`
                            \${photoCapture}

                            <p>The photo you captured:</p>
                            <img src=\${this.imageUrl} alt="Captured photo" />
                        \`
                    }

                    return html\`
                        <p>Use the following button to capture a photo:</p>

                        \${photoCapture}
                    \`
                }

                private onInput () {
                    const file = this.photoCapture?.value ?? null

                    this.imageUrl = file ? URL.createObjectURL(file) : null
                }
            }
        `
      }
    }
  }
} as const

export const Primary = {
  render: () => html`<solid-ui-photo-capture-sandbox></solid-ui-photo-capture-sandbox>`,
}

export default meta
