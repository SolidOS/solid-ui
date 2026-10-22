import { ShowDialogEvent } from './events/show-dialog'
import Dialog, { DialogConfig } from './Dialog'
import type WebComponent from '@/lib/components/web-component/WebComponent'
import { getCustomElementTagName, type GetWebComponentMetadata, type WebComponentConstructor } from '@/lib/components/web-component/WebComponent'

export type GetDialogResult<T, TFallback = unknown> = GetWebComponentMetadata<T> extends { dialogResult: infer TResult } ? TResult : TFallback

export function showDialog<T extends WebComponent> (
  DialogComponent: WebComponentConstructor<T>,
  config?: DialogConfig<GetDialogResult<T>> & { props?: Partial<T> }
): T {
  const element = document.createElement(getCustomElementTagName(DialogComponent)) as T

  Object.assign(element, config?.props)

  const dialog = new Dialog(element, config)

  document.dispatchEvent(new ShowDialogEvent(dialog))

  return dialog.element as T
}
