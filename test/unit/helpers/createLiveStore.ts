import { fetcher, graph, UpdateManager } from 'rdflib'
import { LiveStore } from 'pane-registry'

export function createLiveStore (): LiveStore { // will change this to LiveStore when pane-registry is updated
  const store = graph()
  fetcher(store, {})
  store.updater = new UpdateManager()
  return store as LiveStore
}
