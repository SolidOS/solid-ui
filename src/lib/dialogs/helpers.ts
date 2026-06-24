import { TemplateResult } from 'lit'
import { ShowDialogEvent } from './events/show-dialog'
import Dialog, { DialogConfig } from './Dialog'

export function showDialog<T extends HTMLElement = HTMLElement> (template: TemplateResult, config: DialogConfig = {}): Promise<T> {
  const dialog = new Dialog(template, config)

  document.dispatchEvent(new ShowDialogEvent(dialog))

  return dialog.element as Promise<T>
}
