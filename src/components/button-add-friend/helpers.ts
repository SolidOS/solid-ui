import { LiveStore } from 'rdflib'

type PrefixCapable = {
  setPrefixForURI?: (prefix: string, uri: string) => void
  namespaces?: Record<string, string>
  store?: PrefixCapable
}

const STANDARD_MUTATION_PREFIXES: Record<string, string> = {
  rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
  vcard: 'http://www.w3.org/2006/vcard/ns#',
  foaf: 'http://xmlns.com/foaf/0.1/',
  solid: 'http://www.w3.org/ns/solid/terms#',
  schema: 'http://schema.org/',
  org: 'http://www.w3.org/ns/org#',
  owl: 'http://www.w3.org/2002/07/owl#',
  dc: 'http://purl.org/dc/elements/1.1/'
}

function registerStorePrefix(target: PrefixCapable | undefined, prefix: string, uri: string): void {
  if (!target) return
  if (typeof target.setPrefixForURI === 'function') {
    target.setPrefixForURI(prefix, uri)
    return
  }
  if (!target.namespaces) {
    target.namespaces = {}
  }
  target.namespaces[prefix] = uri
}

function getStoreUpdater(store: LiveStore): PrefixCapable | undefined {
  return store.updater as PrefixCapable | undefined
}

export function ensureStandardMutationPrefixes(store: LiveStore | undefined): void {
  if (!store) return

  const updater = getStoreUpdater(store)
  const nestedStore = (updater as { store?: PrefixCapable } | undefined)?.store
  const targets: Array<PrefixCapable | undefined> = [store as PrefixCapable, updater, nestedStore]

  Object.entries(STANDARD_MUTATION_PREFIXES).forEach(([prefix, uri]) => {
    targets.forEach((target) => {
      registerStorePrefix(target, prefix, uri)
    })
  })
}
