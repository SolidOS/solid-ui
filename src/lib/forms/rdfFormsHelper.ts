import { sym, LiveStore, parse } from 'rdflib'
import type { Term } from 'rdflib/lib/tf-types'
// eslint-disable-next-line camelcase
import type { Quad_Subject } from 'rdflib/lib/tf-types'
import ns from '../../lib/ns'

const baseUri = 'https://solidos.github.io/solid-ui/src/ontology/'

// we need to load into the store some additional information about Social Media accounts
export function loadDocument (
  store: LiveStore,
  documentSource: string,
  documentName: string,
  documentURI?: string
) {
  const finalDocumentUri = documentURI || baseUri + documentName   // Full URI to the file
  const document = sym(finalDocumentUri)      // rdflib NamedNode for the document

  if (store.holds(undefined, undefined, undefined, document)) {
    store.removeStatements(store.statementsMatching(undefined, undefined, undefined, document))
  }
  // we are using the social media form because it contains the information we need
  // the form can be used for both use cases: create UI for edit and render UI for display
  parse(documentSource, store, finalDocumentUri, 'text/turtle', (err) => {
    if (err) {
      console.error('loadDocument parse error for', finalDocumentUri, err)
    }
  })
}

export function sortBySequence (
  store: LiveStore,
  list: Term[]
) {
  const subfields = list
    .filter(
      // eslint-disable-next-line camelcase
      (p): p is Quad_Subject =>
        p.termType === 'NamedNode' ||
        p.termType === 'BlankNode' ||
        p.termType === 'Variable'
    )
    .map((p) => {
      const k = store.any(p, ns.ui('sequence'))
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
