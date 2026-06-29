import { createContext } from '@lit/context'
import { LiveStore } from 'rdflib'
import { solidLogicSingleton } from 'solid-logic'

export interface FormsContext {
  store: LiveStore
}

export const DEFAULT_STORE: LiveStore = solidLogicSingleton.store
export const formsContext = createContext<FormsContext>(Symbol('rdfForms'))
