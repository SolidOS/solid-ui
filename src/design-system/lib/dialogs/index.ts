import { TemplateResult } from 'lit'
import { ShowDialogEvent } from './events/show-dialog'
import Dialog from './Dialog'

export function showDialog<T extends HTMLElement = HTMLElement> (template: TemplateResult): Promise<T> {
  const dialog = new Dialog(template)

  document.dispatchEvent(new ShowDialogEvent(dialog))

  return dialog.element as Promise<T>
}
