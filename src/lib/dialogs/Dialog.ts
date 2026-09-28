import { generateId } from '@/lib/components'

export interface DialogConfig<T = unknown> {
  onClose?(data?: T): void
}

export default class Dialog {
  public readonly id: string
  public readonly element: HTMLElement
  public readonly config: DialogConfig

  constructor (element: HTMLElement, config: DialogConfig = {}) {
    this.id = generateId()
    this.config = config
    this.element = element
  }

  closed (data?: unknown) {
    this.config.onClose?.(data)
  }
}
