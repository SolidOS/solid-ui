import { html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import WebComponent from '../../../primitives/lib/WebComponent'
import Dialog from '../../lib/dialogs/Dialog'
import { ShowDialogEvent } from '../../lib/dialogs/events/show-dialog'

import '../dialog-provider/DialogProvider'
import { CloseDialogEvent } from '../../lib/dialogs/events/close-dialog'

@customElement('solid-ui-dialogs-root')
export default class DialogsRoot extends WebComponent {
  @state()
  private accessor dialogs: Dialog[] = []

  connectedCallback (): void {
    super.connectedCallback()

    window.addEventListener(ShowDialogEvent.eventName, (event) => {
      event.stopImmediatePropagation()

      this.dialogs = [...this.dialogs, event.dialog]
    })

    window.addEventListener(CloseDialogEvent.eventName, (event) => {
      event.stopPropagation()

      this.dialogs = this.dialogs.filter(dialog => dialog.id !== event.id)
    })
  }

  protected render () {
    return html`${this.dialogs.map(dialog => html`<solid-ui-dialog-provider dialogId="${dialog.id}">${dialog.template}</solid-ui-dialog-provider>`)}`
  }
}
