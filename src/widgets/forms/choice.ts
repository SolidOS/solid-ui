import { Node } from 'rdflib'
import store from '../../store'
import ns from '../../ns'
import { errorMessageBlock } from '../error'
import { propertyTriage, allClassURIs } from '../buttons'
import { label } from '../../utils'
import { fieldFunction } from './fieldFunction'
import { fieldLabel } from './basic'
import { makeSelectForOptions } from './select'

export function sortByLabel (list) {
  const p2 = list.map(function (p) {
    return [label(p).toLowerCase(), p]
  })
  p2.sort()
  return p2.map(function (pair) {
    return pair[1]
  })
}

/**
 * Choice field
 *
 * Not nested.  Generates a link to something from a given class.
 * Optional subform for the thing selected.
 * Alternative implementatons could be:
 * * pop-up menu (as here)
 * * radio buttons
 * * auto-complete typing
 *
 * Todo: Deal with multiple. Maybe merge with multiple code.
 */
export function choiceField (
  dom: HTMLDocument,
  container: HTMLElement | undefined,
  already: { },
  subject: Node,
  form: Node,
  doc: Node,
  callbackFunction: (ok: boolean, errorMessage: string) => void
): HTMLElement {
  const kb = store
  const multiple = false
  let p
  const box = dom.createElement('tr')
  if (container) container.appendChild(box)
  const lhs = dom.createElement('td')
  box.appendChild(lhs)
  const rhs = dom.createElement('td')
  box.appendChild(rhs)
  const property = kb.any(form, ns.ui('property'))
  if (!property) {
    return errorMessageBlock(dom, 'No property for Choice: ' + form)
  }
  lhs.appendChild(fieldLabel(dom, property, form))
  const from = kb.any(form, ns.ui('from'))
  if (!from) {
    return errorMessageBlock(dom, "No 'from' for Choice: " + form)
  }
  const subForm = kb.any(form, ns.ui('use')) // Optional
  let possible: any[] = []
  let possibleProperties
  const np = '--' + label(property) + '-?'
  const opts: any = { multiple: multiple, nullLabel: np, disambiguate: false }
  possible = kb.each(undefined, ns.rdf('type'), from)
  for (const x in kb.findMembersNT(from)) {
    possible.push(kb.fromNT(x))
    // box.appendChild(dom.createTextNode("RDFS: adding "+x))
  } // Use rdfs
  // debug("%%% Choice field: possible.length 1 = "+possible.length)
  if (from.sameTerm(ns.rdfs('Class'))) {
    for (p in allClassURIs()) possible.push(kb.sym(p))
    // debug("%%% Choice field: possible.length 2 = "+possible.length)
  } else if (from.sameTerm(ns.rdf('Property'))) {
    possibleProperties = propertyTriage(kb)
    for (p in possibleProperties.op) possible.push(kb.fromNT(p))
    for (p in possibleProperties.dp) possible.push(kb.fromNT(p))
    opts.disambiguate = true // This is a big class, and the labels won't be enough.
  } else if (from.sameTerm(ns.owl('ObjectProperty'))) {
    possibleProperties = propertyTriage(kb)
    for (p in possibleProperties.op) possible.push(kb.fromNT(p))
    opts.disambiguate = true
  } else if (from.sameTerm(ns.owl('DatatypeProperty'))) {
    possibleProperties = propertyTriage(kb)
    for (p in possibleProperties.dp) possible.push(kb.fromNT(p))
    opts.disambiguate = true
  }
  let object = kb.any(subject, property)
  function addSubForm () {
    object = kb.any(subject, property)
    fieldFunction(dom, subForm)(
      dom,
      rhs,
      already,
      object,
      subForm,
      doc,
      callbackFunction
    )
  }
  // box.appendChild(dom.createTextNode('Choice: subForm='+subForm))
  const possible2 = sortByLabel(possible)
  if (kb.any(form, ns.ui('canMintNew'))) {
    opts.mint = '* New *' // @@ could be better
    opts.subForm = subForm
  }
  const selector = makeSelectForOptions(
    dom,
    kb,
    subject,
    property,
    possible2,
    opts,
    doc,
    callbackFunction
  )
  rhs.appendChild(selector)
  if (object && subForm) addSubForm()
  return box
}
