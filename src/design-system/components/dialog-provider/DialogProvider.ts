import { provide } from '@lit/context'
import { customElement } from '../../../primitives/lib/customElement'
import { property } from 'lit/decorators.js'
import WebComponent from '../../../primitives/lib/WebComponent'
import { DialogContext, dialogContext } from '../../lib/dialogs/context'

@customElement('solid-ui-dialog-provider')
export default class DialogProvider extends WebComponent {
  @property({ type: String, reflect: true })
  accessor dialogId: string | undefined

  @provide({ context: dialogContext })
  private accessor dialog: DialogContext = { id: '' }

  protected willUpdate (changedProperties: Map<string, any>) {
    super.willUpdate(changedProperties)

    if (changedProperties.has('dialogId') && this.dialogId) {
      this.dialog = { id: this.dialogId }
    }
  }

  protected firstUpdated () {
    const slot = this.shadowRoot?.lastChild as HTMLSlotElement | undefined

    this.dispatchEvent(new CustomEvent('mounted', { bubbles: true, composed: true, detail: slot?.assignedElements()[0] }))
  }
}
