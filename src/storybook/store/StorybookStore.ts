import * as rdf from 'rdflib'
import { LiveStore } from 'rdflib'

export default function StorybookStore (): LiveStore {
  return createStore()
}

function createStore (): rdf.LiveStore {
  const store = rdf.graph() as LiveStore
  store.updater = new rdf.UpdateManager(store) // Add real-time live updates store.updater
  store.fetcher = new rdf.Fetcher(store) // Add fetcher for loading RDF data
  store.features = [] // disable automatic node merging on store load
  return store
}
