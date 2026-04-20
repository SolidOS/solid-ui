import { store } from 'solid-logic'
import * as ns from '../../ns'
import { NamedNode } from 'rdflib'
// Will rename this file later. We will probably be using solid-logic anyway
// moved it out so I can mock

export const getRootIfPreferencesExist = (webId: NamedNode) => {
  let root = store.any(webId, ns.space('preferencesFile'), null, webId.doc())?.value
  root = root?.split('/').slice(0, -2).join('/')
  if (!root) throw new Error(`prefererencesFile is expected to exist in ${webId}`)
  return root
}
