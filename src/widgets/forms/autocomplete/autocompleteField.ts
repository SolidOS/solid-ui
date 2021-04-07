/* Form field for doing autocompleete
 */
import { ns, widgets, store } from '../../../index'

// import { renderAutoComplete } from './autocompletePicker'
import { renderAutocompleteControl } from './autocompleteBar'
import { QueryParameters } from './publicData'
import { NamedNode, BlankNode, Variable, st } from 'rdflib'
import { AutocompleteOptions } from './autocompletePicker'
/**
  * Render a autocomplete form field
  *
  * Teh autocomplete form searches for an iobject in a definitive public database,
  * and allows the user to search for it by name, displaying a list of objects whose names match
  * the input to date, and letting  the user either click on one of the list,
  * or just go on untill there is only one.  The process then returns two values,
  * the URiI of the object and its name.
  *
  * @param dom The HTML Document object aka Document Object Model
  * @param container  If present, the created widget will be appended to this
  * @param already A hash table of (form, subject) kept to prevent recursive forms looping
  * @param subject The thing about which the form displays/edits data
  * @param form The form or field to be rendered
  * @param doc The web document in which the data is
  * @param callbackFunction Called when data is changed so other parts can be refreshed.
  *
  * Form properties:
  * @param ui:property  The property to store the object itself
  * @param ui:labelProperty The property used to store the name of the object
  * @param ui:categoory The class of objects to be searched, if fixed (else dep on class of subject)
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
    const deletables = kb.statementsMatching(subject, property as any, null, null) // remove any multiple values in any doc

    let insertables = deletables.map(statement => st(statement.subject, statement.predicate, result, statement.why)) // can include >1 doc
    if (insertables.length === 0) {
      // or none
      insertables = [st(subject, property as any, result, doc)]
    }
    try {
      await kb.updater.updateMany(deletables, insertables)
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
    return box.appendChild(
      widgets.errorMessageBlock(dom, 'Error: No property given for autocomplete field: ' + form)
    )
  }
  const labelProperty = kb.any(form, ns.ui('labelProperty')) || ns.schema('name')

  const searchClass = kb.any(form, ns.ui('searchClass'))
  if (!searchClass) {
    return box.appendChild(
      widgets.errorMessageBlock(dom, 'Error: No searchClass given for autocomplete field: ' + form)
    )
  }
  // Parse the data source into query options

  const dataSource = kb.any(form, ns.ui('dataSource')) as NamedNode | undefined
  if (!dataSource) {
    return box.appendChild(
      widgets.errorMessageBlock(dom, 'Error: No data source given for autocomplete field: ' + form)
    )
  }
  const queryParams:QueryParameters = {
    targetClass: kb.any(dataSource, ns.ui('targetClass'), null, dataSource.doc()),
    label: kb.anyJS(dataSource, ns.schema('name'), null, dataSource.doc()),
    logo: kb.anyJS(dataSource, ns.schema('logo'), null, dataSource.doc())
  }
  if (!queryParams.targetClass) {
    queryParams.targetClass = kb.any(subject, ns.rdf('type')) as NamedNode | undefined // @@ be more selective of which class if many
  }
  const endPoint = kb.any(dataSource, ns.ui('endPoint'), null, dataSource.doc()) as NamedNode | undefined
  if (endPoint) { // SPARQL
    queryParams.endpoint = endPoint

    queryParams.searchByNameQuery = kb.anyJS(dataSource, ns.ui('searchByNameQuery'), null, dataSource.doc())
    if (!queryParams.searchByNameQuery) {
      return box.appendChild(
        widgets.errorMessageBlock(dom, 'Error: No searchByNameQuery given for data Source: ' + form))
    }
    queryParams.insitituteDetailsQuery = kb.anyJS(dataSource, ns.ui('insitituteDetailsQuery'), null, dataSource.doc())
  } else {
    return box.appendChild(
      widgets.errorMessageBlock(dom, 'Error: No SPARQL endPoint given for autocomplete field: ' + form))
  }
  const queryTemplate = kb.any(form, ns.ui('queryTemplate'))
  if (!queryTemplate) {
    return box.appendChild(
      widgets.errorMessageBlock(dom, 'Error: No queryTemplate given for autocomplete field: ' + form)
    )
  }
  // It can be cleaner to just remove empty fields if you can't edit them anyway
  const suppressEmptyUneditable = kb.anyJS(form, ns.ui('suppressEmptyUneditable'), null, formDoc)
  const editable = kb.updater.editable((doc as NamedNode).uri)

  // @@ Should we pass the target class in from the data source definition or use a current type of the subject
  const autocompleteOptions:AutocompleteOptions = { // cancelButton?: HTMLElement,
    // acceptButton?: HTMLElement,
    targetClass: queryParams.targetClass, // @@ simplify?
    queryParams
  }
  let obj = kb.any(subject, property as any, undefined, doc)
  if (!obj) {
    obj = kb.any(form, ns.ui('default'))
    if (obj) {
      autocompleteOptions.currentObject = obj as NamedNode
      autocompleteOptions.currentName = kb.anyJS(autocompleteOptions.currentObject, labelProperty, null, form.doc())
    } else { // No data or default. Should we suprress the whole field?
      if (suppressEmptyUneditable && !editable) {
        box.style.display = 'none' // clutter removal
        return box
      }
    }
  } else { // get object and name from target data:
    autocompleteOptions.currentObject = obj as NamedNode
    autocompleteOptions.currentName = kb.anyJS(autocompleteOptions.currentObject, labelProperty, null, subject.doc())
  }

  lhs.appendChild(widgets.fieldLabel(dom, property as any, form))

  const barOptions = {
    editable: kb.updater.editable(doc.uri, kb),
    permanent: true,
    dbLookup: false
  }
  renderAutocompleteControl(dom, subject, barOptions, autocompleteOptions, addOneIdAndRefresh).then((control) => {
    // console.log('Async load of autocomplete field control finished:' + control)
    rhs.appendChild(control)
  }, (err) => {
    rhs.appendChild(widgets.errorMessageBlock(dom, `Error rendering autocomplete${form}: ${err}`))
  })

  /*
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
*/
  return box
}

// ends
