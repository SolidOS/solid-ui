import { html } from 'lit'
import { showDialog } from '@/lib/dialogs'

import '@/components/button'
import SampleModal from './docs/sample-modal'

/**
 * Solid UI implements a Dialog System that allows to render dialogs dynamically, instead of declaring them inline.
 *
 * This works using `<solid-ui-dialogs-root>` to orchestrate the opening and closing of dialogs under the hood. If
 * you're using `<solid-ui-provider>`, it comes configured out of the box.
 */
const meta = {
  title: 'Advanced/Dialogs',
  parameters: {
    docs: {
      source: {
        language: 'ts',
        code: `
            import { customElement, DialogComponent, showDialog } from 'solid-ui'
            import { html } from 'lit'
            import { property } from 'lit/decorators.js'

            import 'solid-ui/components/button'
            import 'solid-ui/components/dialog'
            import 'solid-ui/components/dialog-content'
            import 'solid-ui/components/dialog-footer'

            @customElement('solid-ui-sample-modal')
            export class SampleModal extends DialogComponent<'red' | 'green' | 'blue'> {
                @property({ type: String })
                accessor message: string = ''

                protected render () {
                    return html\`
                        <solid-ui-dialog title=\${this.title}>
                            <solid-ui-dialog-content>
                                \${this.message}
                            </solid-ui-dialog-content>
                            <solid-ui-dialog-footer>
                                <solid-ui-button @click=\${() => this.close('red')}>Red</solid-ui-button>
                                <solid-ui-button @click=\${() => this.close('green')}>Green</solid-ui-button>
                                <solid-ui-button @click=\${() => this.close('blue')}>Blue</solid-ui-button>
                            </solid-ui-dialog-footer>
                        </solid-ui-dialog>
                    \`
                }
            }

            await showDialog(SampleModal, {
                props: {
                    message: 'Choose your favorite color:',
                },
                onClose: (result) => alert(\`You chose \${result || 'none'}!\`),
            });
        `
      }
    }
  },
} as const

export const Primary = {
  render: () => html`
    <solid-ui-button @click=${() => showDialog(SampleModal, {
        props: {
            message: 'Choose your favorite color:',
        },
        onClose: (result) => alert(`You chose ${result || 'none'}!`),
    })}>Open Modal</solid-ui-button>
  `
}

export default meta
