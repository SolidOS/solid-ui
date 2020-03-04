import { fetcher, graph, IndexedFormula, UpdateManager } from 'rdflib'

export function createLiveStore (): IndexedFormula { // will change this to LiveStore when pane-registry is updated
  const store = graph()
  fetcher(store, {})
  store.updater = new UpdateManager()
  return store
}
