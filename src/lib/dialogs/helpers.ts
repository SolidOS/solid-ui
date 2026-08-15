import { ShowDialogEvent } from './events/show-dialog'
import Dialog, { DialogConfig } from './Dialog'
import type WebComponent from '@/lib/components/web-component/WebComponent'
import type { GetWebComponentMetadata, WebComponentConstructor } from '@/lib/components/web-component/WebComponent'

export type GetDialogResult<T, TFallback = unknown> = GetWebComponentMetadata<T> extends { dialogResult: infer TResult } ? TResult : TFallback

export function showDialog<T extends WebComponent> (
  DialogComponent: WebComponentConstructor<T>,
  config?: DialogConfig<GetDialogResult<T>> & { props?: Partial<T> }
): T {
  const element = new DialogComponent()

  Object.assign(element, config?.props)

  const dialog = new Dialog(element, config)

  document.dispatchEvent(new ShowDialogEvent(dialog))

  return dialog.element as T
}
