import { createContext } from '@lit/context'
import { LiveStore } from 'rdflib'
import NoopStore from './NoopStore'

export interface StoreContext {
  store: LiveStore
}

export const DEFAULT_STORE = new NoopStore()
export const storeContext = createContext<StoreContext>(Symbol('storeContext'))
