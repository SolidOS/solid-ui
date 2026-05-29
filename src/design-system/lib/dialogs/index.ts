import { TemplateResult } from 'lit'
import { ShowDialogEvent } from './events/show-dialog'
import Dialog from './Dialog'

export function showDialog (template: TemplateResult) {
  document.dispatchEvent(new ShowDialogEvent(new Dialog(template)))
}
