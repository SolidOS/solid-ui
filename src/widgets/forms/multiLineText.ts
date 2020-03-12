import { Node, IndexedFormula, st, NamedNode } from 'rdflib'
import store from '../../store'
import ns from '../../ns'
import { multilineTextInputStyle } from '../../style'
import { label } from '../../utils'

import { errorMessageBlock } from '../error'
import { fieldStore, fieldLabel } from './basic'

export function makeDescription (
  dom: HTMLDocument,
  kb: IndexedFormula,
  subject: Node,
  predicate: Node,
  doc: Node,
  callbackFunction: (ok: boolean, errorMessage: string) => void
) {
  const group = dom.createElement('div')

  const sts = kb.statementsMatching(subject, predicate, null, doc) // Only one please
  if (sts.length > 1) {
    return errorMessageBlock(
      dom,
      'Should not be ' + sts.length + ' i.e. >1 ' + predicate + ' of ' + subject
    )
  }
  const desc = sts.length ? sts[0].object.value : undefined

  const field = dom.createElement('textarea')
  group.appendChild(field)
  field.rows = desc ? desc.split('\n').length + 2 : 2
  field.cols = 80
  const style = multilineTextInputStyle ||
    'font-size:100%; white-space: pre-wrap; background-color: white;' +
    ' border: 0.07em solid gray; padding: 1em 0.5em; margin: 1em 1em;'
  field.setAttribute('style', style)
  if (sts.length) {
    field.value = desc as string
  } else {
    // Unless you can make the predicate label disappear with the first click then this is over-cute
    // field.value = label(predicate); // Was"enter a description here"
    field.select() // Select it ready for user input -- doesn't work
  }

  ;(group as any).refresh = function () {
    const v = kb.any(subject, predicate, null, doc)
    if (v && v.value !== field.value) {
      field.value = v.value // don't touch widget if no change
      // @@ this is the place to color the field from the user who chanaged it
    }
  }
  let submit
  function saveChange (_e) {
    submit.disabled = true
    submit.setAttribute('style', 'visibility: hidden; float: right;') // Keep UI clean
    field.disabled = true
    field.setAttribute('style', style + 'color: gray;') // pending
    const ds = kb.statementsMatching(subject, predicate, null, doc)
    const is = st(subject, predicate, field.value, doc)
    store.updater.update(ds, is, function (uri, ok, body) {
      if (ok) {
        field.setAttribute('style', style + 'color: black;')
        field.disabled = false
      } else {
        group.appendChild(
          errorMessageBlock(
            dom,
            'Error (while saving change to ' + (doc as NamedNode).uri + '): ' + body
          )
        )
      }
      if (callbackFunction) {
        callbackFunction(ok, body)
      }
    })
  }

  const br = dom.createElement('br')
  group.appendChild(br)

  const editable = store.updater.editable((doc as NamedNode).uri)
  if (editable) {
    submit = dom.createElement('input')
    submit.setAttribute('type', 'submit')
    submit.disabled = true // until the filled has been modified
    submit.setAttribute('style', 'visibility: hidden; float: right;') // Keep UI clean
    submit.value = 'Save ' + label(predicate) // @@ I18n
    group.appendChild(submit)

    field.addEventListener(
      'keyup',
      function (_e) {
        // Green means has been changed, not saved yet
        field.setAttribute('style', style + 'color: green;')
        if (submit) {
          submit.disabled = false
          submit.setAttribute('style', 'float: right;') // Remove visibility: hidden
        }
      },
      true
    )
    field.addEventListener('change', saveChange, true)
    submit.addEventListener('click', saveChange, false)
  } else {
    field.disabled = true
  }
  return group
}

/**
 * Multiline Text field
 */
export function multiLineTextField (
  dom: HTMLDocument,
  container: HTMLElement | undefined,
  already: { },
  subject: Node,
  form: Node,
  doc: Node,
  callbackFunction: (ok: boolean, errorMessage: string) => void
): HTMLElement {
  const kb = store
  const property = kb.any(form, ns.ui('property'))
  if (!property) {
    return errorMessageBlock(dom, 'No property to text field: ' + form)
  }
  const box = dom.createElement('div')
  box.appendChild(fieldLabel(dom, property, form))
  doc = fieldStore(subject, property, doc)
  const field = makeDescription(
    dom,
    kb,
    subject,
    property,
    doc,
    callbackFunction
  )
  // box.appendChild(dom.createTextNode('<-@@ subj:'+subject+', prop:'+property))
  box.appendChild(field)
  if (container) container.appendChild(box)
  return box
}
