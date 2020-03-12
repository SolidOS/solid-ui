/**
 * F O R M S
 *
 * A Vanilla Dom implementation of the form language
 */

import { IndexedFormula, Node, NamedNode } from 'rdflib'
import ns from '../../ns'
import { multipleField } from './multiple'
import { Group } from './group'
import { field } from './fieldFunction'
import { optionsField } from './options'
import { basicField } from './basic'
import { multiLineTextField } from './multiLineText'
import { booleanField } from './boolean'
import { classifierField } from './classifier'
import { choiceField } from './choice'
import { commentField } from './comment'

// exporting these from module files for unit testing:
export { sortBySequence } from './group'
export { field, mostSpecificClassURI, fieldFunction, appendForm, newThing } from './fieldFunction'
export { fieldParams } from './fieldParams'
export { basicField, fieldStore, fieldLabel } from './basic'
export { makeDescription } from './multiLineText'
export { buildCheckboxForm } from './checkbox'
export { promptForNew, newButton, formsFor, findClosest } from './promptForNew'
export { makeSelectForOptions, makeSelectForCategory, makeSelectForNestedCategory } from './select'
export { sortByLabel } from './choice'
export { editFormButton } from './editForm'

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

field[ns.ui('Classifier').uri] = classifierField
field[ns.ui('Choice').uri] = choiceField
field[ns.ui('Comment').uri] = field[
  ns.ui('Heading').uri
] = commentField

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
