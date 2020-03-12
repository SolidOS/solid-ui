
import { st, IndexedFormula, Node, NamedNode } from 'rdflib'
import store from '../../store'
import ns from '../../ns'
import { formBorderColor } from '../../style'
import { debug, info } from '../../log'
import { removeButton, linkButton } from '../buttons'
import { label } from '../../utils'
import { fieldFunction, newThing } from './fieldFunction'

/** Find the closest class
* @param kb The store
* @param cla - the URI of the class
* @param prop
*/
export function findClosest (kb: IndexedFormula, cla: NamedNode | string, prop: Node): Node[] {
  const agenda: Node[] = [kb.sym(cla)] // ordered - this is breadth first search
  while (agenda.length > 0) {
    const c = agenda.shift() // first
    // if (c.uri && (c.uri == ns.owl('Thing').uri || c.uri == ns.rdf('Resource').uri )) continue
    const lists: Node[] = kb.each(c, prop) as Node[]
    debug('Lists for ' + c + ', ' + prop + ': ' + lists.length)
    if (lists.length !== 0) return lists
    const supers = kb.each(c, ns.rdfs('subClassOf'))
    for (let i = 0; i < supers.length; i++) {
      agenda.push(supers[i] as Node)
      debug('findClosest: add super: ' + supers[i])
    }
  }
  return []
}

// Which forms apply to a given existing subject?

export function formsFor (subject: Node) {
  const kb = store

  debug('formsFor: subject=' + subject)
  const t = kb.findTypeURIs(subject)
  let t1
  for (t1 in t) {
    debug('   type: ' + t1)
  }
  const bottom = kb.bottomTypeURIs(t) // most specific
  let candidates: any[] = []
  for (const b in bottom) {
    // Find the most specific
    debug('candidatesFor: trying bottom type =' + b)
    candidates = candidates.concat(
      findClosest(kb, b, ns.ui('creationForm'))
    )
    candidates = candidates.concat(
      findClosest(kb, b, ns.ui('annotationForm'))
    )
  }
  return candidates
}

/**
 * Button to add a new whatever using a form
 *
 * @param form - optional form , else will look for one
 * @param doc - optional doc else will prompt for one (unimplemented)
 */
export function newButton (
  dom: HTMLDocument,
  kb: IndexedFormula,
  subject: Node,
  predicate: Node,
  theClass: Node,
  form: Node,
  doc: Node,
  callbackFunction
): HTMLElement {
  const b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.innerHTML = 'New ' + label(theClass)
  b.addEventListener(
    'click',
    function (_e) {
      ;(b.parentNode as HTMLElement).appendChild(
        promptForNew(
          dom,
          kb,
          subject,
          predicate,
          theClass,
          form,
          doc,
          callbackFunction
        )
      )
    },
    false
  )
  return b
}

/**
 * Prompt for new object of a given class
 *
 * @param dom - the document DOM for the user interface
 * @param kb - the graph which is the knowledge base we are working with
 * @param subject - a term, Thing this should be linked to when made. Optional.
 * @param predicate - a term, the relationship for the subject link. Optional.
 * @param theClass - an RDFS class containng the object about which the new information is.
 * @param form  - the form to be used when a new one. null means please find one.
 * @param doc - The web document being edited
 * @param callbackFunction - takes (boolean ok, string errorBody)
 * @returns a dom object with the form DOM
 */
export function promptForNew (
  dom: HTMLDocument,
  kb: IndexedFormula,
  subject: Node,
  predicate: Node,
  theClass: Node,
  form: Node | null,
  doc: Node,
  callbackFunction: (ok: boolean, errorMessage: string) => void
) {
  const box = dom.createElement('form')

  if (!form) {
    const lists = findClosest(kb, (theClass as NamedNode).uri, ns.ui('creationForm'))
    if (lists.length === 0) {
      const p = box.appendChild(dom.createElement('p'))
      p.textContent =
        'I am sorry, you need to provide information about a ' +
        label(theClass) +
        " but I don't know enough information about those to ask you."
      const b = box.appendChild(dom.createElement('button'))
      b.setAttribute('type', 'button')
      b.setAttribute('style', 'float: right;')
      b.innerHTML = 'Goto ' + label(theClass)
      b.addEventListener(
        'click',
        function (_e) {
          (dom as any).outlineManager.GotoSubject(
            theClass,
            true,
            undefined,
            true,
            undefined
          )
        },
        false
      )
      return box
    }
    debug('lists[0] is ' + lists[0])
    form = lists[0] // Pick any one
  }
  debug('form is ' + form)
  box.setAttribute('style', `border: 0.05em solid ${formBorderColor}; color: ${formBorderColor}`) // @@color?
  box.innerHTML = '<h3>New ' + label(theClass) + '</h3>'

  const formFunction = fieldFunction(dom, form)
  const object = newThing(doc)
  let gotButton: HTMLElement | false = false
  const itemDone = function (ok, body) {
    if (!ok) return callbackFunction(ok, body)
    const insertMe: any[] = []
    if (subject && !kb.holds(subject, predicate, object, doc)) {
      insertMe.push(st(subject, predicate, object, doc))
    }
    if (subject && !kb.holds(object, ns.rdf('type'), theClass, doc)) {
      insertMe.push(st(object, ns.rdf('type'), theClass, doc))
    }
    if (insertMe.length) {
      store.updater.update([], insertMe, linkDone)
    } else {
      callbackFunction(true, body)
    }
    if (!gotButton) {
      gotButton = box.appendChild(linkButton(dom, object as NamedNode))
    }
    // tabulator.outline.GotoSubject(object, true, undefined, true, undefined)
  }
  function linkDone (uri, ok, body) {
    return callbackFunction(ok, body)
  }
  info('paneUtils Object is ' + object)
  const f = formFunction(dom, box, {}, object, form, doc, itemDone)
  const rb = removeButton(dom, f)
  rb.setAttribute('style', 'float: right;')
  box.AJAR_subject = object
  return box
}
