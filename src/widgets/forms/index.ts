/**
 * F O R M S
 *
 * A Vanilla Dom implementation of the form language
 */

import { st, IndexedFormula, Node, NamedNode } from 'rdflib'
import store from '../../store'
import ns from '../../ns'
import { formBorderColor, formHeadingColor } from '../../style'
import { debug, info } from '../../log'

import { errorMessageBlock } from '../error'
import { propertyTriage, allClassURIs, removeButton, linkButton } from '../buttons'
import { label, labelWithOntology } from '../../utils'
import { multipleField } from './multiple'
import { Group } from './group'
import { field, mostSpecificClassURI, fieldFunction, appendForm, newThing } from './fieldFunction'
import { optionsField } from './options'
import { fieldParams } from './fieldParams'
import { basicField, fieldStore, fieldLabel } from './basic'
import { multiLineTextField } from './multiLineText'
import { buildCheckboxForm } from './checkbox'

// exporting these from module files for unit testing:
export { sortBySequence } from './group'
export { field, mostSpecificClassURI, fieldFunction, appendForm, newThing } from './fieldFunction'
export { fieldParams } from './fieldParams'
export { basicField, fieldStore, fieldLabel } from './basic'
export { makeDescription } from './multiLineText'
export { buildCheckboxForm } from './checkbox'

field[ns.ui('Form').uri] = field[
  ns.ui('Group').uri
] = Group

field[ns.ui('Options').uri] = optionsField
field[ns.ui('Multiple').uri] = multipleField

field[ns.ui('PhoneField').uri] = basicField
field[ns.ui('EmailField').uri] = basicField
field[ns.ui('ColorField').uri] = basicField
field[ns.ui('DateField').uri] = basicField
field[ns.ui('DateTimeField').uri] = basicField
field[ns.ui('TimeField').uri] = basicField
field[ns.ui('NumericField').uri] = basicField
field[ns.ui('IntegerField').uri] = basicField
field[ns.ui('DecimalField').uri] = basicField
field[ns.ui('FloatField').uri] = basicField
field[ns.ui('TextField').uri] = basicField
field[ns.ui('SingleLineTextField').uri] = basicField
field[ns.ui('NamedNodeURIField').uri] = basicField

field[ns.ui('MultiLineTextField').uri] = multiLineTextField

/**
 * Boolean field and Tri-state version (true/false/null)
 *
 * @@ todo: remove tristate param
 */
function booleanField (
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
field[ns.ui('BooleanField').uri] = function (
  dom: HTMLDocument,
  container: HTMLElement | undefined,
  already: { },
  subject: Node,
  form: Node,
  doc: Node,
  callbackFunction: (ok: boolean, errorMessage: string) => void
): HTMLElement {
  return booleanField(
    dom,
    container,
    already,
    subject,
    form,
    doc,
    callbackFunction,
    false
  )
}

field[ns.ui('TristateField').uri] = function (
  dom: HTMLDocument,
  container: HTMLElement | undefined,
  already: { },
  subject: Node,
  form: Node,
  doc: Node,
  callbackFunction: (ok: boolean, errorMessage: string) => void
): HTMLElement {
  return booleanField(
    dom,
    container,
    already,
    subject,
    form,
    doc,
    callbackFunction,
    true
  )
}

/**
 * Classifier field
 *
 * Nested categories
 *
 * @@ To do: If a classification changes, then change any dependent Options fields.
 */
field[ns.ui('Classifier').uri] = function (
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
field[ns.ui('Choice').uri] = function (
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

/**
 * Non-interactive fields
 */
fieldParams[ns.ui('Comment').uri] = {
  element: 'p',
  style: `padding: 0.1em 1.5em; color: ${formHeadingColor}; white-space: pre-wrap;`
}
fieldParams[ns.ui('Heading').uri] = {
  element: 'h3',
  style: `font-size: 110%; color: ${formHeadingColor};`
}

field[ns.ui('Comment').uri] = field[
  ns.ui('Heading').uri
] = function (
  dom,
  container,
  already,
  subject,
  form,
  _doc,
  _callbackFunction
) {
  const kb = store
  let contents = kb.any(form, ns.ui('contents'))
  if (!contents) contents = 'Error: No contents in comment field.'

  const uri = mostSpecificClassURI(form)
  let params = fieldParams[uri]
  if (params === undefined) {
    params = {}
  } // non-bottom field types can do this

  const box = dom.createElement('div')
  if (container) container.appendChild(box)
  const p = box.appendChild(dom.createElement(params.element))
  p.textContent = contents

  let style = kb.any(form, ns.ui('style'))
  if (style === undefined) {
    style = params.style ? params.style : ''
  }
  if (style) p.setAttribute('style', style)

  return box
}

/**
 * A button for editing a form (in place, at the moment)
 *
 * When editing forms, make it yellow, when editing thr form form, pink
 * Help people understand how many levels down they are.
 */
export function editFormButton (
  dom,
  container,
  form,
  doc,
  callbackFunction
) {
  const b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.innerHTML = 'Edit ' + label(ns.ui('Form'))
  b.addEventListener(
    'click',
    function (_e) {
      const ff = appendForm(
        dom,
        container,
        {},
        form,
        ns.ui('FormForm'),
        doc,
        callbackFunction
      )
      ff.setAttribute(
        'style',
        ns.ui('FormForm').sameTerm(form)
          ? 'background-color: #fee;'
          : 'background-color: #ffffe7;'
      )
      b.parentNode.removeChild(b)
    },
    true
  )
  return b
}

/**
 * Find list of properties for class
 *
 * Three possible sources: Those mentioned in schemas, which exludes many
 * those which occur in the data we already have, and those predicates we
 * have come across anywhere and which are not explicitly excluded from
 * being used with this class.
 */
export function propertiesForClass (kb: IndexedFormula, theClass: Node) {
  const explicit = kb.each(undefined, ns.rdf('range'), theClass)
  ;[
    ns.rdfs('comment'),
    ns.dc('title'), // Generic things
    ns.foaf('name'),
    ns.foaf('homepage')
  ].map(function (x) {
    explicit.push(x)
  })
  let members = kb.each(undefined, ns.rdf('type'), theClass)
  if (members.length > 60) members = members.slice(0, 60) // Array supports slice?
  const used = {}
  for (let i = 0; i < (members.length > 60 ? 60 : members.length); i++) {
    kb.statementsMatching(members[i], undefined, undefined).map(function (st) {
      used[(st.predicate as NamedNode).uri] = true
    })
  }
  explicit.map(function (p) {
    used[(p as NamedNode).uri] = true
  })
  const result: any[] = []
  for (const uri in used) {
    result.push(kb.sym(uri))
  }
  return result
}

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

export type SelectOptions = {
  multiple?: boolean,
  nullLabel?: string,
  mint?: string,
  mintClass?: Node,
  mintStatementsFun?: any,
  subForm?: Node,
  disambiguate?: boolean
}

/**
 * Make SELECT element to select options
 *
 * @param subject a term, the subject of the statement(s) being edited.
 * @param predicate a term, the predicate of the statement(s) being edited
 * @param possible a list of terms, the possible value the object can take
 * @param options.multiple Boolean - Whether more than one at a time is allowed
 * @param options.nullLabel a string to be displayed as the option for none selected (for non multiple)
 * @param options.mint User may create thing if this sent to the prompt string eg "New foo"
 * @param options.mintClass ?
 * @param optins.mintStatementsFun ?
 * @param options.subForm If mint, then the form to be used for minting the new thing
 * @param options.disambiguate ?
 * @param doc The web document being edited
 * @param callbackFunction takes (boolean ok, string errorBody)
 */
export function makeSelectForOptions (
  dom: HTMLDocument,
  kb: IndexedFormula,
  subject: Node,
  predicate: Node,
  possible: NamedNode[],
  options: SelectOptions,
  doc: Node,
  callbackFunction: (ok: boolean, errorMessage: string) => void
) {
  debug('Select list length now ' + possible.length)
  let n = 0
  const uris = {} // Count them
  const editable = store.updater.editable((doc as NamedNode).uri)

  for (let i = 0; i < possible.length; i++) {
    const sub = possible[i] // @@ Maybe; make this so it works with blank nodes too
    if (!sub.uri) console.warn(`makeSelectForOptions: option does not have an uri: ${sub}, with predicate: ${predicate}`)
    if (!sub.uri || sub.uri in uris) continue
    uris[sub.uri] = true
    n++
  } // uris is now the set of possible options
  if (n === 0 && !options.mint) {
    return errorMessageBlock(
      dom,
      "Can't do selector with no options, subject= " +
        subject +
        ' property = ' +
        predicate +
        '.'
    )
  }
  debug('makeSelectForOptions: doc=' + doc)

  const getActual = function () {
    let ret = {}
    if (predicate.sameTerm(ns.rdf('type'))) {
      ret = kb.findTypeURIs(subject)
    } else {
      kb.each(subject, predicate, null, doc).map(function (x: Node) {
        ret[(x as NamedNode).uri] = true
      })
    }
    return ret
  }
  let actual = getActual()

  // const newObject = null

  const onChange = function (_e) {
    let newObject
    ;(select as any).disabled = true // until data written back - gives user feedback too
    const ds: any[] = []
    let is: any[] = []
    const removeValue = function (t) {
      if (kb.holds(subject, predicate, t, doc)) {
        ds.push(st(subject, predicate, t, doc))
      }
    }
    for (let i = 0; i < (select as any).options.length; i++) {
      const opt = (select as any).options[i]
      if (opt.selected && (opt as any).AJAR_mint) {
        let newObject
        if (options.mintClass) {
          const thisForm = promptForNew(
            dom,
            kb,
            subject,
            predicate,
            options.mintClass,
            null,
            doc,
            function (ok, body) {
              if (!ok) {
                callbackFunction(ok, body) // @@ if ok, need some form of refresh of the select for the new thing
              }
            }
          )
          ;(select.parentNode as HTMLElement).appendChild(thisForm)
          newObject = thisForm.AJAR_subject
        } else {
          newObject = newThing(doc)
        }
        is.push(st(subject, predicate, newObject, doc))
        if (options.mintStatementsFun) {
          is = is.concat(options.mintStatementsFun(newObject))
        }
      }
      if (!(opt as any).AJAR_uri) continue // a prompt or mint
      if (opt.selected && !((opt as any).AJAR_uri in actual)) {
        // new class
        is.push(st(subject, predicate, kb.sym((opt as any).AJAR_uri), doc))
      }
      if (!opt.selected && (opt as any).AJAR_uri in actual) {
        // old class
        removeValue(kb.sym((opt as any).AJAR_uri))
        // ds.push(st(subject, predicate, kb.sym((opt as any).AJAR_uri), doc ))
      }
      if (opt.selected) (select as any).currentURI = (opt as any).AJAR_uri
    }
    let sel = (select as any).subSelect // All subclasses must also go
    while (sel && (sel as any).currentURI) {
      removeValue(kb.sym((sel as any).currentURI))
      sel = sel.subSelect
    }
    sel = (select as any).superSelect // All superclasses are redundant
    while (sel && (sel as any).currentURI) {
      removeValue(kb.sym((sel as any).currentURI))
      sel = sel.superSelect
    }
    function doneNew (ok, body) {
      callbackFunction(ok, body)
    }
    info('selectForOptions: doc = ' + doc)
    store.updater.update(ds, is, function (uri, ok, body) {
      actual = getActual() // refresh
      // kb.each(subject, predicate, null, doc).map(function(x){actual[x.uri] = true})
      if (ok) {
        ;(select as any).disabled = false // data written back
        if (newObject) {
          const fn = fieldFunction(dom, options.subForm as Node)
          fn(
            dom,
            select.parentNode as HTMLElement,
            {},
            newObject,
            (options as any).subForm,
            doc,
            doneNew
          )
        }
      }
      if (callbackFunction) callbackFunction(ok, body)
    })
  }

  const select: HTMLSelectElement = dom.createElement('select')
  select.setAttribute('style', 'margin: 0.6em 1.5em;')
  if (options.multiple) {
    select.setAttribute('multiple', 'true')
  }
  (select as any).currentURI = null

  ;(select as any).refresh = function () {
    actual = getActual() // refresh
    for (let i = 0; i < select.children.length; i++) {
      const option: HTMLOptionElement = select.children[i] as HTMLOptionElement
      if ((option as any).AJAR_uri) {
        option.selected = (option as any).AJAR_uri in actual
      }
    }
    select.disabled = false // unlocked any conflict we had got into
  }

  for (const uri in uris) {
    const c = kb.sym(uri)
    const option = dom.createElement('option')
    if (options.disambiguate) {
      option.appendChild(dom.createTextNode(labelWithOntology(c, true))) // Init. cap
    } else {
      option.appendChild(dom.createTextNode(label(c, true))) // Init.
    }
    const backgroundColor = kb.any(
      c,
      kb.sym('http://www.w3.org/ns/ui#backgroundColor')
    )
    if (backgroundColor) {
      option.setAttribute(
        'style',
        'background-color: ' + backgroundColor.value + '; '
      )
    }
    (option as any).AJAR_uri = uri
    if (uri in actual) {
      option.setAttribute('selected', 'true')
      ;(select as any).currentURI = uri
      // dump("Already in class: "+ uri+"\n")
    }
    select.appendChild(option)
  }
  if (editable && options.mint) {
    const mint = dom.createElement('option')
    mint.appendChild(dom.createTextNode(options.mint))
    ;(mint as any).AJAR_mint = true // Flag it
    select.insertBefore(mint, select.firstChild)
  }
  if ((select as any).currentURI == null && !options.multiple) {
    const prompt = dom.createElement('option')
    prompt.appendChild(dom.createTextNode(options.nullLabel as string))
    select.insertBefore(prompt, select.firstChild)
    prompt.selected = true
  }
  if (editable) {
    select.addEventListener('change', onChange, false)
  }
  return select
} // makeSelectForOptions

// Make SELECT element to select subclasses
//
// If there is any disjoint union it will so a mutually exclusive dropdown
// Failing that it will do a multiple selection of subclasses.
// Callback takes (boolean ok, string errorBody)

export function makeSelectForCategory (
  dom,
  kb,
  subject,
  category,
  doc,
  callbackFunction
) {
  const du = kb.any(category, ns.owl('disjointUnionOf'))
  let subs
  let multiple = false
  if (!du) {
    subs = kb.each(undefined, ns.rdfs('subClassOf'), category)
    multiple = true
  } else {
    subs = du.elements
  }
  debug('Select list length ' + subs.length)
  if (subs.length === 0) {
    return errorMessageBlock(
      dom,
      "Can't do " +
        (multiple ? 'multiple ' : '') +
        'selector with no subclasses of category: ' +
        category
    )
  }
  if (subs.length === 1) {
    return errorMessageBlock(
      dom,
      "Can't do " +
        (multiple ? 'multiple ' : '') +
        'selector with only 1 subclass of category: ' +
        category +
        ':' +
        subs[1]
    )
  }
  return makeSelectForOptions(
    dom,
    kb,
    subject,
    ns.rdf('type'),
    subs,
    { multiple: multiple, nullLabel: '--classify--' },
    doc,
    callbackFunction
  )
}

/**
 * Make SELECT element to select subclasses recurively
 *
 * It will so a mutually exclusive dropdown, with another if there are nested
 * disjoint unions.
 *
 * @param  callbackFunction takes (boolean ok, string errorBody)
 */
export function makeSelectForNestedCategory (
  dom: HTMLDocument,
  kb: IndexedFormula,
  subject: Node,
  category: Node,
  doc: Node,
  callbackFunction: (ok: boolean, errorMessage: string) => void
): HTMLElement {
  const container = dom.createElement('span') // Container
  let child: any = null
  const onChange = function (ok, body) {
    if (ok) update()
    callbackFunction(ok, body)
  }
  const select = makeSelectForCategory(
    dom,
    kb,
    subject,
    category,
    doc,
    onChange
  )
  container.appendChild(select)
  const update = function () {
    // info("Selected is now: "+(select as any).currentURI)
    if (child) {
      container.removeChild(child)
      child = null
    }
    if (
      (select as any).currentURI &&
      kb.any(kb.sym((select as any).currentURI), ns.owl('disjointUnionOf'))
    ) {
      child = makeSelectForNestedCategory(
        dom,
        kb,
        subject,
        kb.sym((select as any).currentURI),
        doc,
        callbackFunction
      )
      ;(select as any).subSelect = child.firstChild
      ;(select as any).subSelect.superSelect = select
      container.appendChild(child)
    }
  }
  update()
  return container
}
