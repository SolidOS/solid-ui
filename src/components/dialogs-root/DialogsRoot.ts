import { customElement, WebComponent } from '@/lib/components'
import { html } from 'lit'
import { state } from 'lit/decorators.js'
import Dialog from '@/lib/dialogs/Dialog'
import { ShowDialogEvent } from '@/lib/dialogs/events/show-dialog'
import { CloseDialogEvent } from '@/lib/dialogs/events/close-dialog'

import '@/components/dialog-provider/DialogProvider'

@customElement('solid-ui-dialogs-root')
export default class DialogsRoot extends WebComponent {
  @state()
  private accessor dialogs: Dialog[] = []

  connectedCallback (): void {
    super.connectedCallback()

    this.addGlobalEventListener(ShowDialogEvent.eventName, (event) => {
      event.stopImmediatePropagation()

      this.dialogs = [...this.dialogs, event.dialog]
    })

    this.addGlobalEventListener(CloseDialogEvent.eventName, (event) => {
      event.stopImmediatePropagation()

      const dialog = this.dialogs.find(dialog => dialog.id === event.id)
      this.dialogs = this.dialogs.filter(dialog => dialog.id !== event.id)

      dialog?.closed(event.data)
    })
  }

  protected render () {
    return html`${this.dialogs.map(dialog => html`
        <solid-ui-dialog-provider
            dialogId="${dialog.id}"
            @mounted=${(event) => dialog.setElement(event.detail)}
        >
            ${dialog.template}
        </solid-ui-dialog-provider>
    `)}`
  }
}
