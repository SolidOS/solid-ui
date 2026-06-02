import { consume } from '@lit/context'
import { html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import WebComponent from '../../../primitives/lib/WebComponent'
import styles from './Dialog.styles.css'
import { DialogContext, dialogContext } from '../../lib/dialogs/context'
import { CloseDialogEvent } from '../../lib/dialogs/events/close-dialog'

import '~icons/lucide/x'
import '../dialog-header'
import '../button'

@customElement('solid-ui-dialog')
export default class Dialog extends WebComponent {
  static styles = styles

  @property({ type: String, reflect: true })
  accessor title = ''

  @query('dialog')
  private accessor nativeDialog: HTMLDialogElement | null = null

  @consume({ context: dialogContext, subscribe: true })
  private accessor context!: DialogContext

  public close () {
    if (!this.context) {
      throw new Error('Dialog context missing')
    }

    window.dispatchEvent(new CloseDialogEvent(this.context.id))
  }

  protected firstUpdated () {
    if (!this.nativeDialog) {
      return
    }

    this.nativeDialog.showModal()
    this.nativeDialog.addEventListener('close', () => this.close())
  }

  protected render () {
    const header = this.title
      ? html`
        <solid-ui-dialog-header>
            <h1>${this.title}</h1>

            <solid-ui-button variant="ghost" @click=${this.close}>
                <span class="sr-only">Close</span>
                <icon-lucide-x slot="icon"></icon-lucide-x>
            </solid-ui-button>
        </solid-ui-dialog-header>
        `
      : nothing

    return html`
        <dialog>
            <slot name="header">${header}</slot>
            <slot></slot>
            <slot name="footer"></slot>
        </dialog>
    `
  }
}
