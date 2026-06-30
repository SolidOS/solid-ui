import { StoreContext } from '@/lib/forms/store/StoreContext'
import * as rdf from 'rdflib'
import { LiveStore } from 'rdflib'

export default class StorybookStore implements StoreContext {
  public store: LiveStore = createStore()
}

function createStore (): rdf.LiveStore {
  const store = rdf.graph() as LiveStore
  store.updater = new rdf.UpdateManager(store) // Add real-time live updates store.updater
  store.features = [] // disable automatic node merging on store load
  return store
}
