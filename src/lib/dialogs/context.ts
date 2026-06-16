import { createContext } from '@lit/context'

export interface DialogContext {
  readonly id: string
}

export const dialogContext = createContext<DialogContext>(Symbol('dialog'))
