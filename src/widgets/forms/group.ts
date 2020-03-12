import { st, Node, Collection } from 'rdflib'
import store from '../../store'
import ns from '../../ns'
import { formBorderColor } from '../../style'

import { errorMessageBlock } from '../error'
import { FieldFunction, mostSpecificClassURI, fieldFunction } from './fieldFunction'

export function sortBySequence (list: Node[]): Node[] {
  const p2 = list.map(function (p: Node) {
    const k = store.any(p, ns.ui('sequence'))
    return [k || 9999, p]
  })
  p2.sort(function (a, b) {
    return a[0] - b[0]
  })
  return p2.map(function (pair) {
    return pair[1]
  })
}

/**
 * Group of different fields
 *
 * One type of form field is an ordered Group of other fields.
 * A Form is actually just the same as a group.
 *
 * @param dom The HTML Document object aka Document Object Model
 * @param container  If present, the created widget will be appended to this
 * @param already A hash table of (form, subject) kept to prevent recursive forms looping
 * @param subject The thing about which the form displays/edits data
 * @param form The form or field to be rendered
 * @param doc The web document in which the data is
 * @param callbackFunction Called when data is changed?
 *
 * @returns The HTML widget created
 */
export function Group (dom: HTMLDocument, container: HTMLElement | undefined, already: { }, subject: Node, form: Node, doc: Node, callbackFunction: (ok: boolean, errorMessage: string) => void): HTMLElement {
  const kb = store
  const box = dom.createElement('div')
  box.setAttribute('style', `padding-left: 2em; border: 0.05em solid ${formBorderColor};`) // Indent a group
  if (container) container.appendChild(box)

  // Prevent loops
  const key = subject.toNT() + '|' + form.toNT()

  if (already[key]) {
    // been there done that
    box.appendChild(dom.createTextNode('Group: see above ' + key))
    const plist = [(st as any)(subject, ns.owl('sameAs'), subject)] // @@ need prev subject
    ;(dom as any).outlineManager.appendPropertyTRs(box, plist)
    return box
  }
  // box.appendChild(dom.createTextNode('Group: first time, key: '+key))
  const already2 = {}
  for (const x in already) already2[x] = 1
  already2[key] = 1

  const partsCollection: Collection = kb.any(form, ns.ui('parts'))
  let parts: Node[]
  if (partsCollection) {
    if (!partsCollection.elements) {
      throw new Error('Form parts should be an RDF collection, see https://solid.github.io/solid-ui/examples/forms/')
    }
    parts = partsCollection.elements
  } else {
    const unordered: Node[] = kb.each(form, ns.ui('part'))
    parts = sortBySequence(unordered)
  }

  if (!parts) {
    box.appendChild(errorMessageBlock(dom, 'No parts to form! '))
    return box
  }
  const eles: HTMLElement[] = []
  const original: HTMLElement[] = []
  for (let i = 0; i < parts.length; i++) {
    const formField = parts[i]
    const t = mostSpecificClassURI(formField) // Field type
    if (t === ns.ui('Options').uri) {
      const dep = kb.any(formField, ns.ui('dependingOn'))
      if (dep && kb.any(subject, dep)) (original as any)[i] = kb.any(subject, dep).toNT()
    }

    const fn: FieldFunction = fieldFunction(dom, formField)

    const itemChanged = function (ok, body) {
      if (ok) {
        for (let j = 0; j < parts.length; j++) {
          // This is really messy.
          const formPart = parts[j]
          const t = mostSpecificClassURI(formPart) // Field type
          if (t === ns.ui('Options').uri) {
            const dep = kb.any(formPart, ns.ui('dependingOn'))
            const newOne = fn(
              dom,
              box,
              already,
              subject,
              formPart,
              doc,
              callbackFunction
            )
            box.removeChild(newOne)
            box.insertBefore(newOne, eles[j])
            box.removeChild(eles[j])
            original[j] = kb.any(subject, dep).toNT()
            eles[j] = newOne
          }
        }
      }
      callbackFunction(ok, body)
    }
    eles.push(fn(dom, box, already2, subject, formField, doc, itemChanged))
  }
  return box
}
