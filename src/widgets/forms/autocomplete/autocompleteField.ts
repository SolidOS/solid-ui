/* Form field for doing autocompleete
 */
import { ns, style, widgets, store } from 'solid-ui'

// import { renderAutoComplete } from './autocompletePicker'
import { renderAutocompleteControl } from './autocompletBar'

import { NamedNode, BlankNode, Variable, st } from 'rdflib'

/**
 * Render a autocomplete form field
 *
 * The same function is used for many similar one-value fields, with different
 * regexps used to validate.
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
// eslint-disable-next-line complexity
export function autocompleteField (
  dom: HTMLDocument,
  container: HTMLElement | undefined,
  already,
  subject: NamedNode | BlankNode | Variable,
  form: NamedNode,
  doc: NamedNode | undefined,
  callbackFunction: (ok: boolean, errorMessage: string) => void
): HTMLElement {
  async function addOneIdAndRefresh (result, _name) {
    const ds = kb.statementsMatching(subject, property as any) // remove any multiple values

    let is = ds.map(statement => st(statement.subject, statement.predicate, result, statement.why)) // can include >1 doc
    if (is.length === 0) {
      // or none
      is = [st(subject, property as any, result, doc)]
    }
    try {
      await kb.updater.updateMany(ds, is)
    } catch (err) {
      callbackFunction(false, err)
      box.appendChild(widgets.errorMessageBlock(dom, 'Autocomplete form data write error:' + err))
      return
    }
    callbackFunction(true, '')
  }

  const kb = store
  const formDoc = form.doc ? form.doc() : null // @@ if blank no way to know

  const box = dom.createElement('tr')
  if (container) container.appendChild(box)
  const lhs = dom.createElement('td')
  lhs.setAttribute('class', 'formFieldName')
  lhs.setAttribute('style', '  vertical-align: middle;')
  box.appendChild(lhs)
  const rhs = dom.createElement('td')
  rhs.setAttribute('class', 'formFieldValue')
  box.appendChild(rhs)

  const property = kb.any(form, ns.ui('property'))
  if (!property) {
    box.appendChild(
      dom.createTextNode('Error: No property given for autocomplete field: ' + form)
    )
    return box
  }
  const searchClass = kb.any(form, ns.ui('searchClass'))
  if (!searchClass) {
    return box.appendChild(
      dom.createTextNode('Error: No searchClass given for autocomplete field: ' + form)
    )
  }
  const endPoint = kb.any(form, ns.ui('endPoint'))
  if (!endPoint) {
    return box.appendChild(
      dom.createTextNode('Error: No SPARQL endPoint given for autocomplete field: ' + form)
    )
  }
  const queryTemplate = kb.any(form, ns.ui('queryTemplate'))
  if (!queryTemplate) {
    box.appendChild(
      dom.createTextNode('Error: No queryTemplate given for autocomplete field: ' + form)
    )
    return box
  }
  // It can be cleaner to just remove empty fields if you can't edit them anyway
  const suppressEmptyUneditable = kb.anyJS(form, ns.ui('suppressEmptyUneditable'), null, formDoc)
  const editable = kb.updater.editable((doc as NamedNode).uri)
  lhs.appendChild(widgets.fieldLabel(dom, property as any, form))
  const uri = widgets.mostSpecificClassURI(form)
  let params = widgets.fieldParams[uri]
  if (params === undefined) params = {} // non-bottom field types can do this
  // const theStyle = params.style || style.textInputStyle
  const klass = kb.the(form, ns.ui('category'), null, formDoc)
  /*
  { label: string;
    logo: string;
    searchByNameQuery?: string;
    searchByNameURI?: string;
    insitituteDetailsQuery?: string;
    endPoint?: string;
    class: object
  }
*/

  const searchByNameQuery = kb.the(form, ns.ui('searchByNameQuery'), null, formDoc)
  const queryParams = {
    label: 'from form',
    logo: '',
    class: klass,
    endPoint: endPoint.uri,
    searchByNameQuery
  }

  const options = { // cancelButton?: HTMLElement,
    // acceptButton?: HTMLElement,
    class: klass,
    queryParams
  }

  rhs.appendChild(await renderAutocompleteControl(dom, subject, options, addOneIdAndRefresh))

  // @@ set existing value is any
  // renderAutoComplete(dom, options, addOneIdAndRefresh).then(acWiget => rhs.appendChild(acWiget))

  const field = dom.createElement('input')
  ;(field as any).style = style.textInputStyle // Do we have to override length etc?
  rhs.appendChild(field)
  field.setAttribute('type', params.type ? params.type : 'text')

  const size = kb.any(form, ns.ui('size')) // Form has precedence
  field.setAttribute(
    'size',
    size ? '' + size : params.size ? '' + params.size : '20'
  )
  const maxLength = kb.any(form, ns.ui('maxLength'))
  field.setAttribute('maxLength', maxLength ? '' + maxLength : '4096')

  doc = doc || widgets.fieldStore(subject, property as any, doc)

  let obj = kb.any(subject, property as any, undefined, doc)
  if (!obj) {
    obj = kb.any(form, ns.ui('default'))
  }
  if (obj) {
    field.value = obj.value || ''
  }
  field.setAttribute('style', style)
  if (!kb.updater) {
    throw new Error('kb has no updater')
  }
  if (!editable) {
    field.readOnly = true // was: disabled. readOnly is better
    ;(field as any).style = style.textInputStyleUneditable
    // backgroundColor = textInputBackgroundColorUneditable
    if (suppressEmptyUneditable && field.value === '') {
      box.style.display = 'none' // clutter
    }
    return box
  }

  return box
}

// ends
