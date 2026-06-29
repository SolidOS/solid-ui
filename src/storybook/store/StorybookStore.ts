import { StoreContext } from '@/lib/forms/store/StoreContext'
import * as rdf from 'rdflib'
import { LiveStore } from 'rdflib'

export default class StorybookStore implements StoreContext {
  public store: LiveStore = rdf.graph() as LiveStore
}
