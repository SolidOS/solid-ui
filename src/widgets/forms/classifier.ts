import { Node } from 'rdflib'
import store from '../../store'
import ns from '../../ns'
import { debug } from '../../log'

import { errorMessageBlock } from '../error'
import { makeSelectForNestedCategory } from './select'

/**
 * Classifier field
 *
 * Nested categories
 *
 * @@ To do: If a classification changes, then change any dependent Options fields.
 */
export function classifierField (
  dom: HTMLDocument,
  container: HTMLElement | undefined,
  already: { },
  subject: Node,
  form: Node,
  doc: Node,
  callbackFunction: (ok: boolean, errorMessage: string) => void
): HTMLElement {
  const kb = store

  const category = kb.any(form, ns.ui('category'))
  if (!category) {
    return errorMessageBlock(dom, 'No category for classifier: ' + form)
  }
  debug('Classifier: doc=' + doc)
  const checkOptions = function (ok, body) {
    if (!ok) return callbackFunction(ok, body)

    /*
    const parent = kb.any(undefined, ns.ui('part'), form)
    if (!parent) return callbackFunction(ok, body)
    const kids = kb.each(parent, ns.ui('part')); // @@@@@@@@@ Garbage
    kids = kids.filter(function(k){return kb.any(k, ns.rdf('type'), ns.ui('Options'))})
    if (kids.length) debug('Yes, found related options: '+kids[0])
    */
    return callbackFunction(ok, body)
  }
  const box = makeSelectForNestedCategory(
    dom,
    kb,
    subject,
    category,
    doc,
    checkOptions
  )
  if (container) container.appendChild(box)
  return box
}
