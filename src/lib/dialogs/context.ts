import { createContext } from '@lit/context'
import { generateId } from '@/lib/components/ids'

export interface DialogContext {
  readonly id: string
}

export const DEFAULT_DIALOG_CONTEXT = { id: `noop-${generateId()}` } satisfies DialogContext
export const dialogContext = createContext<DialogContext>(Symbol('dialog'))
