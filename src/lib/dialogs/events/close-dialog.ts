const EVENT_NAME = 'solid-ui:close-dialog' as const

export class CloseDialogEvent extends Event {
  static readonly eventName = EVENT_NAME

  constructor (public id: string, public data?: unknown) {
    super(CloseDialogEvent.eventName, { bubbles: true, composed: true })
  }
}

declare global {
  interface GlobalEventHandlersEventMap {
    [EVENT_NAME]: CloseDialogEvent
  }
}
