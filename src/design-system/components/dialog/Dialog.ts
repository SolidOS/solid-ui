import { consume } from '@lit/context'
import { html } from 'lit'
import { customElement, query } from 'lit/decorators.js'
import WebComponent from '../../../primitives/lib/WebComponent'
import styles from './Dialog.styles.css'
import { DialogContext, dialogContext } from '../../lib/dialogs/context'
import { CloseDialogEvent } from '../../lib/dialogs/events/close-dialog'

@customElement('solid-ui-dialog')
export default class Dialog extends WebComponent {
  static styles = styles

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
    return html`
        <dialog>
            <slot></slot>
        </dialog>
    `
  }
}
