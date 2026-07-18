import { DataBrowserContext } from 'pane-registry'
import { LiveStore } from 'rdflib'
import { vi } from 'vitest'

export function createDataBrowserContext (
  dom: HTMLDocument,
  store: LiveStore
): DataBrowserContext {
  return {
    dom,
    getOutliner: vi.fn(),
    session: {
      logic: {} as any,
      paneRegistry: {
        list: [],
        paneForIcon: [],
        paneForPredicate: [],
        register: vi.fn(),
        byName: vi.fn()
      },
      store
    }
  }
}
