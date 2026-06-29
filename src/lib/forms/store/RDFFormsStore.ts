import { LiveStore } from 'rdflib'
import { StoreContext } from './StoreContext'

export default class RDFFormsStore implements StoreContext {
  get store (): LiveStore {
    throw new Error('Can\'t use RDF forms without a store')
  }
}
