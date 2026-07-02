import { sym, LiveStore, parse } from 'rdflib'
import type { Term } from 'rdflib/lib/tf-types'
// eslint-disable-next-line camelcase
import type { Quad_Subject, NamedNode } from 'rdflib/lib/tf-types'
import ns from '../../lib/ns'

const baseUri = 'https://solidos.github.io/solid-ui/src/ontology/'

export function loadDocument (
  store: LiveStore,
  documentSource: string,
  documentName: string,
  documentURI?: string,
  preferRemote = false
) {
  const finalDocumentUri = documentURI || baseUri + documentName   // Full URI to the file
  const document = sym(finalDocumentUri)      // rdflib NamedNode for the document

  if (store.holds(undefined, undefined, undefined, document)) {
    store.removeStatements(store.statementsMatching(undefined, undefined, undefined, document))
  }

  const parseSource = () => {
    return new Promise<void>((resolve, reject) => {
      parse(documentSource, store, finalDocumentUri, 'text/turtle', (err) => {
        if (err) {
          console.error('Parse document error for ', finalDocumentUri, err)
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  if (preferRemote && documentURI) {
    return store.fetcher.load(documentURI, {
      force: true,
      clearPreviousData: true,
    }).then(() => {}).catch((err) => {
      if (documentSource && documentSource.trim().length > 0) {
        return parseSource()
      }
      throw err
    })
  }

  if (documentSource && documentSource.trim().length > 0) {
    return parseSource()
  }

  if (documentURI) {
    return store.fetcher.load(documentURI, {
      force: true,
      clearPreviousData: true,
    }).then(() => {})
  }

  return Promise.reject(new Error(`No document source or URI for ${documentName}`))
}

export async function fetchData (
  store: LiveStore,
  documentURI: string
) {
  const document = sym(documentURI)      // rdflib NamedNode for the document

  if (store.holds(undefined, undefined, undefined, document)) {
    store.removeStatements(store.statementsMatching(undefined, undefined, undefined, document))
  }

  return await store.fetcher.load(documentURI, {
    force: true,
    clearPreviousData: true,
  })
}

export function sortBySequence (
  store: LiveStore,
  list: Term[]
) {
  const subfields = list.map((p) => {
    const k = store.any(p as any, ns.ui('sequence'))
    const seq = k ? Number((k as { value: string }).value) : 9999
    return [Number.isNaN(seq) ? 9999 : seq, p] as const
  })

  subfields.sort((a, b) => a[0] - b[0])

  return subfields.map(pair => pair[1])
}

/**
 * Which class of field is this? Relies on http://www.w3.org/2000/01/rdf-schema#subClassOf and
 * https://linkeddata.github.io/rdflib.js/doc/classes/formula.html#bottomtypeuris
 * to find the most specific RDF type if there are multiple.
 *
 * @param subject a form field, e.g. `namedNode('https://timbl.com/timbl/Public/Test/Forms/individualForm.ttl#fullNameField')`
 * @returns the URI of the most specific known class, e.g. `http://www.w3.org/ns/ui#SingleLineTextField`
 */
// eslint-disable-next-line camelcase
export function mostSpecificClassURI (store: LiveStore, subject: Quad_Subject): string {
  const typeUri = store.findTypeURIs(subject)
  const specificTypes = store.bottomTypeURIs(typeUri) // most specific
  const finalTypes: any[] = []
  for (const t in specificTypes) finalTypes.push(t)
  // if (finalTypes.length > 1) throw "Didn't expect "+subject+" to have multiple bottom types: "+finalTypes
  return finalTypes[0]
}

// Find the first ui:Form node in a store, optionally matching a fragment.
// code based on Jeff Zucker's sol-components: https://github.com/jeff-zucker/sol-components (core/form-utils.js)
export function findForm (store: LiveStore, sourceUri: string): NamedNode | null {
  const docUrl = sourceUri.split('#')[0]
  const fragment = sourceUri.includes('#') ? sourceUri.split('#')[1] : null
  if (fragment) {
    const candidate = sym(docUrl + '#' + fragment)
    if (store.holds(candidate, ns.rdf('type'), ns.ui('Form'))) return candidate
  }
  const forms = store.each(null, ns.rdf('type'), ns.ui('Form'))
  const found = forms.find((term) => term.termType === 'NamedNode')
  return found ? (found as NamedNode) : null
}
