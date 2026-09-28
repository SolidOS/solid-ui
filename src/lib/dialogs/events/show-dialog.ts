import Dialog from '../Dialog'

const EVENT_NAME = 'solid-ui:show-dialog' as const

export class ShowDialogEvent extends Event {
  static readonly eventName = EVENT_NAME

  constructor (public dialog: Dialog) {
    super(ShowDialogEvent.eventName, { bubbles: true, composed: true })
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    [EVENT_NAME]: ShowDialogEvent
  }
}
