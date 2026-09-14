import { createContext } from '@lit/context'
import { LiveStore } from 'rdflib'
import NoopStore from './NoopStore'

export type StoreContext = LiveStore

export const DEFAULT_STORE: LiveStore = NoopStore
export const storeContext = createContext<LiveStore>(Symbol('storeContext'))
