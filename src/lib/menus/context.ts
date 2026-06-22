import { createContext } from '@lit/context'

export interface MenuContext {
  readonly id: string
}

export const menuContext = createContext<MenuContext>(Symbol('menu'))
