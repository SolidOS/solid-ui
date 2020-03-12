import { st, Node } from 'rdflib'
import store from '../../store'
import ns from '../../ns'
import { errorMessageBlock } from '../error'
import { label } from '../../utils'
import { fieldStore } from './basic'
import { buildCheckboxForm } from './checkbox'

/**
 * Boolean field and Tri-state version (true/false/null)
 *
 * @@ todo: remove tristate param
 */
export function booleanField (
  dom: HTMLDocument,
  container: HTMLElement | undefined,
  already,
  subject: Node,
  form: Node,
  doc: Node,
  callbackFunction: (ok: boolean, errorMessage: string) => void,
  tristate: boolean
): HTMLElement {
  const kb = store
  const property = kb.any(form, ns.ui('property'))
  if (!property) {
    const errorBlock = errorMessageBlock(
      dom,
      'No property to boolean field: ' + form
    )
    if (container) container.appendChild(errorBlock)
    return errorBlock
  }
  let lab = kb.any(form, ns.ui('label'))
  if (!lab) lab = label(property, true) // Init capital
  doc = fieldStore(subject, property, doc)
  let state = kb.any(subject, property)
  if (state === undefined) {
    state = false
  } // @@ sure we want that -- or three-state?
  // debug('doc is '+doc)
  const ins = (st as any)(subject, property, true, doc)
  const del = (st as any)(subject, property, false, doc)
  const box = buildCheckboxForm(dom, kb, lab, del, ins, form, doc, tristate)
  if (container) container.appendChild(box)
  return box
}
