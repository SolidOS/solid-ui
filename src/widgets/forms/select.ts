import { st, IndexedFormula, Node, NamedNode } from 'rdflib'
import store from '../../store'
import ns from '../../ns'
import { debug, info } from '../../log'

import { errorMessageBlock } from '../error'
import { label, labelWithOntology } from '../../utils'
import { fieldFunction, newThing } from './fieldFunction'
import { promptForNew } from './promptForNew'

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

export type SelectOptions = {
  multiple?: boolean,
  nullLabel?: string,
  mint?: string,
  mintClass?: Node,
  mintStatementsFun?: any,
  subForm?: Node,
  disambiguate?: boolean
}

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
