import { DataBrowserContext, list, paneForIcon, paneForPredicate, register, byName } from 'pane-registry'
import { IndexedFormula } from 'rdflib'

export function createDataBrowserContext (
  dom: HTMLDocument,
  store: IndexedFormula
): DataBrowserContext {
  return {
    dom,
    getOutliner: jest.fn(),
    session: {
      paneRegistry: { list, paneForIcon, paneForPredicate, register, byName },
      store
    }
  }
}
