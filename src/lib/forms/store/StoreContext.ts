import { createContext } from '@lit/context'
import { LiveStore } from 'rdflib'
import RDFFormsStore from './RDFFormsStore'

export interface StoreContext {
  store: LiveStore
}

export const DEFAULT_STORE = new RDFFormsStore()
export const storeContext = createContext<StoreContext>(Symbol('storeContext'))
