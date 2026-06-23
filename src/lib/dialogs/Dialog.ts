import { TemplateResult } from 'lit'
import { generateId } from '@/lib/components'

export interface DialogConfig {
  onClose?(data?: unknown): void
}

export default class Dialog {
  public readonly id: string
  public readonly template: TemplateResult
  public readonly element: Promise<HTMLElement>
  public readonly config: DialogConfig
  private _resolveElement!: (element: HTMLElement) => void

  constructor (template: TemplateResult, config: DialogConfig = {}) {
    this.id = generateId()
    this.template = template
    this.config = config
    this.element = new Promise(resolve => {
      this._resolveElement = resolve
    })
  }

  setElement (element: HTMLElement) {
    this._resolveElement(element)
  }

  closed (data?: unknown) {
    this.config.onClose?.(data)
  }
}
