import { TemplateResult } from 'lit'
import { generateId } from '../ids'

export default class Dialog {
  public readonly id: string
  public readonly template: TemplateResult

  constructor (template: TemplateResult) {
    this.id = generateId()
    this.template = template
  }
}
