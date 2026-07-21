import { customElement, DialogComponent } from '@/lib/components'
import { html } from 'lit'
import { property } from 'lit/decorators.js'

import '@/components/button'
import '@/components/dialog'
import '@/components/dialog-content'
import '@/components/dialog-footer'

@customElement('solid-ui-sample-modal')
export default class SampleModal extends DialogComponent<'red' | 'green' | 'blue'> {
    @property({ type: String })
    accessor message: string = ''

    protected render () {
      return html`
        <solid-ui-dialog title="Sample Modal">
            <solid-ui-dialog-content>
                ${this.message}
            </solid-ui-dialog-content>
            <solid-ui-dialog-footer>
                <solid-ui-button @click=${() => this.close('red')}>Red</solid-ui-button>
                <solid-ui-button @click=${() => this.close('green')}>Green</solid-ui-button>
                <solid-ui-button @click=${() => this.close('blue')}>Blue</solid-ui-button>
            </solid-ui-dialog-footer>
        </solid-ui-dialog>
    `
    }
}
