import { TemplateResult } from 'lit'
import { generateId } from '@/lib/components'

export default class Dialog {
  public readonly id: string
  public readonly template: TemplateResult
  public readonly element: Promise<HTMLElement>
  private _resolveElement!: (element: HTMLElement) => void

  constructor (template: TemplateResult) {
    this.id = generateId()
    this.template = template
    this.element = new Promise(resolve => {
      this._resolveElement = resolve
    })
  }

  setElement (element: HTMLElement) {
    this._resolveElement(element)
  }
}
