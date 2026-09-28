import { LiveStore, NamedNode } from 'rdflib'

export function getGraph (subject?: NamedNode) {
  return subject?.doc ? subject.doc() : undefined
}

export function getFormProperty (store: LiveStore, subject: NamedNode | undefined, property: NamedNode, graph?: any): NamedNode | undefined {
  if (!subject) return undefined
  return store.any(subject, property, null, graph) as NamedNode | undefined
}
