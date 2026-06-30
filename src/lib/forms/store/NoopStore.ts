import { LiveStore } from 'rdflib'
import { StoreContext } from './StoreContext'

export default class NoopStore implements StoreContext {
  get store (): LiveStore {
    throw new Error('Can not use RDF forms without a store')
  }
}
