import { Node } from 'rdflib'
import store from '../../store'
import ns from '../../ns'
import { errorMessageBlock } from '../error'
import { appendForm } from './fieldFunction'

/**
 * Options field: Select one or more cases
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
export function optionsField (
  dom: HTMLDocument,
  container: HTMLElement | undefined,
  already: { },
  subject: Node,
  form: Node,
  doc: Node,
  callbackFunction: (ok: boolean, errorMessage: string) => void
): HTMLElement {
  const kb = store
  const box = dom.createElement('div')
  // box.setAttribute('style', 'padding-left: 2em; border: 0.05em dotted purple;')  // Indent Options
  if (container) container.appendChild(box)

  let dependingOn = kb.any(form, ns.ui('dependingOn'))
  if (!dependingOn) {
    dependingOn = ns.rdf('type')
  } // @@ default to type (do we want defaults?)
  const cases = kb.each(form, ns.ui('case'))
  if (!cases) {
    box.appendChild(errorMessageBlock(dom, 'No cases to Options form. '))
  }
  let values: { [uri: string]: boolean }
  if (dependingOn.sameTerm(ns.rdf('type'))) {
    values = kb.findTypeURIs(subject)
  } else {
    values = {}
    const matches = kb.each(subject, dependingOn)
    if (!matches.length) {
      box.appendChild(
        errorMessageBlock(
          dom,
          "Can't select subform as no value of: " + dependingOn
        )
      )
    } else {
      matches.forEach((match: Node) => {
        values[match.value] = true
      })
    }
  }
  // @@ Add box.refresh() to sync fields with values
  for (let i = 0; i < cases.length; i++) {
    const c = cases[i]
    const tests = kb.each(c, ns.ui('for')) // There can be multiple 'for'
    for (let j = 0; j < tests.length; j++) {
      if (values[tests[j].uri]) {
        const fieldToAppend = kb.the(c, ns.ui('use'))
        if (!fieldToAppend) {
          box.appendChild(
            errorMessageBlock(
              dom,
              'No "use" part for case in form ' + form
            )
          )
          return box
        } else {
          appendForm(
            dom,
            box,
            already,
            subject,
            fieldToAppend,
            doc,
            callbackFunction
          )
        }
        break
      }
    }
  }
  return box
}
