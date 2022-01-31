import { DataBrowserContext } from 'pane-registry'
import { LiveStore } from 'rdflib'

export function createDataBrowserContext (
  dom: HTMLDocument,
  store: LiveStore
): DataBrowserContext {
  return {
    dom,
    getOutliner: jest.fn(),
    session: {
      paneRegistry: {
        list: [],
        paneForIcon: [],
        paneForPredicate: [],
        register: jest.fn(),
        byName: jest.fn()
      },
      store
    }
  }
}
