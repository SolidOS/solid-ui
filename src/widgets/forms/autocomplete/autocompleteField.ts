/* Form field for doing autocompleete
 */
import * as ns from '../../../ns'
import { store } from 'solid-logic'
import * as widgets from '../../../widgets'
import * as style from '../../../style'
import { renderAutocompleteControl } from './autocompleteBar'
import { QueryParameters } from './publicData'
import { NamedNode, BlankNode, Literal, Variable, st } from 'rdflib'
import { AutocompleteOptions } from './autocompletePicker'
/**
  * Render a autocomplete form field
  *
  * The autocomplete form searches for an object in a definitive public database,
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
  * @param ui:category The class of objects to be searched, if fixed (else dep on class of subject)
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
  callbackFunction: (_ok: boolean, _errorMessage: string) => void
): HTMLElement {
  async function addOneIdAndRefresh (result:NamedNode | Literal, name: Literal) {
    if (!name) {
      throw new Error('autocompleteField:  No name set.')
    }
    const oldValue = kb.the(subject, property as any, null, doc)
    if (oldValue) {
      const oldName = kb.any(oldValue as any, labelProperty as any, null, doc)
      if (oldValue.equals(result) && oldName && oldName.sameTerm(name)) {
        // console.log('No change: same values.')
        return
      }
    }
    const deletables = oldValue
      ? kb.statementsMatching(subject, property as any, oldValue, doc)
        .concat(kb.statementsMatching(oldValue as any, labelProperty as any, null, doc))
      : []
    // console.log('autocompleteField Deletables ' + deletables.map(st => st.toNT()))
    const insertables = [st(subject, property as any, result, doc),
      st(result as any, labelProperty as any, name, doc)] // @@ track the language of the  name too!
    // console.log(`AC form: ${deletables.length} to delete and ${insertables.length} to insert`)
    try {
      // console.log('@@@ AC updating ', deletables, insertables)
      await kb.updater?.updateMany(deletables, insertables)
    } catch (err) {
      callbackFunction(false, err)
      box.appendChild(widgets.errorMessageBlock(dom, 'Autocomplete form data update error:' + err, null, err))
      return
    }
    callbackFunction(true, '')
  }

  async function deleteOne (_result:NamedNode | Literal, _name: Literal) {
    const oldValue = kb.the(subject, property as any, null, doc)
    if (!oldValue) {
      callbackFunction(false, 'NO data to elete')
      box.appendChild(widgets.errorMessageBlock(dom, 'Autocomplete delete: no old data!'))
      return
    }
    // const oldName = kb.any(oldValue as any, labelProperty as any, null, doc)
    const deletables = kb.statementsMatching(subject, property as any, oldValue, doc)
      .concat(kb.statementsMatching(oldValue as any, labelProperty as any, null, doc))
    // console.log('autocompleteField Deletables ' + deletables.map(st => st.toNT()))
    const insertables = []
    // console.log(`AC form delete: ${deletables.length} to delete and ${insertables.length} to insert`)
    try {
      // console.log('@@@ AC updating ', deletables, insertables)
      await kb.updater?.updateMany(deletables, insertables)
    } catch (err) {
      const e2 = new Error('Autocomplete form data delete error:' + err)
      callbackFunction(false, err)
      box.appendChild(widgets.errorMessageBlock(dom, e2, null, err))
      return
    }
    callbackFunction(true, '') // changed
  }

  if (subject.termType !== 'NamedNode') {
    throw new Error('Sorry this field only works on NamedNode subjects (for editable)')
  }
  const kb = store
  const formDoc = form.doc ? form.doc() : null // @@ if blank no way to know

  const box = dom.createElement('div')
  if (container) container.appendChild(box)
  const lhs = dom.createElement('div')
  lhs.setAttribute('class', 'formFieldName')
  lhs.setAttribute('style', style.formFieldNameBoxStyle)
  box.appendChild(lhs)
  const rhs = dom.createElement('div')
  rhs.setAttribute('class', 'formFieldValue')
  box.appendChild(rhs)

  const property = kb.any(form, ns.ui('property'))
  if (!property) {
    return box.appendChild(
      widgets.errorMessageBlock(dom, 'Error: No property given for autocomplete field: ' + form)
    )
  }
  const labelProperty = kb.any(form, ns.ui('labelProperty')) || ns.schema('name')

  // Parse the data source into query options

  const dataSource = kb.any(form, ns.ui('dataSource')) as NamedNode | undefined
  if (!dataSource) {
    // console.log('@@ connectedStatements ACF ', kb.connectedStatements(form).map(x => x.toNT()).join('\n'))
    return box.appendChild(
      widgets.errorMessageBlock(dom, 'Error: No data source given for autocomplete field: ' + form)
    )
  }
  const queryParams:QueryParameters = {
    // targetClass: kb.any(dataSource, ns.ui('targetClass'), null, dataSource.doc()) as NamedNode | undefined,
    label: kb.anyJS(dataSource, ns.schema('name'), null, dataSource.doc()),
    logo: (kb.any(dataSource, ns.schema('logo'), null, dataSource.doc())) as NamedNode | undefined
  }

  // @@ Should we pass the target class in from the data source definition or use a current type of the subject
  const targetClass = (kb.any(form, ns.ui('targetClass'), null, form.doc()) || // class in form takes pecedence
      kb.any(dataSource, ns.ui('targetClass'), null, dataSource.doc())) as NamedNode | undefined
  if (targetClass) {
    queryParams.targetClass = targetClass
  }

  queryParams.objectURIBase = (kb.any(dataSource, ns.ui('objectURIBase'), null, dataSource.doc()) || undefined) as NamedNode | undefined

  /*
  if (!queryParams.targetClass) {
    const klass = kb.any(subject, ns.rdf('type')) as NamedNode | undefined
    // @@ be more selective of which class if many
    // @@ todo: Take ALL classes,  and compare them with those the data source knows about
    // with translation where necessary.  Find most specific of the classes for the search.
    if (!klass) throw new Error('Autocomplete: No class specified or is current type of' + subject)
    queryParams.targetClass = klass
  }
  */
  const endpoint = kb.anyJS(dataSource, ns.ui('endpoint'), null, dataSource.doc()) as string | undefined
  if (endpoint) { // SPARQL
    queryParams.endpoint = endpoint

    queryParams.searchByNameQuery = kb.anyJS(dataSource, ns.ui('searchByNameQuery'), null, dataSource.doc())
    if (!queryParams.searchByNameQuery) {
      return box.appendChild(
        widgets.errorMessageBlock(dom, 'Error: No searchByNameQuery given for endpoint data Source: ' + form))
    }
    queryParams.insitituteDetailsQuery = kb.anyJS(dataSource, ns.ui('insitituteDetailsQuery'), null, dataSource.doc())
  } else {
    // return box.appendChild(
    //  widgets.errorMessageBlock(dom, 'Error: No SPARQL endpoint given for autocomplete field: ' + form))
    const searchByNameURI = kb.anyJS(dataSource, ns.ui('searchByNameURI'))
    if (!searchByNameURI) {
      return box.appendChild(
        widgets.errorMessageBlock(dom, 'Error: No searchByNameURI OR sparql endpoint given for dataSource: ' + dataSource)
      )
    }
    queryParams.searchByNameURI = searchByNameURI
  }
  // It can be cleaner to just remove empty fields if you can't edit them anyway
  const suppressEmptyUneditable = kb.anyJS(form, ns.ui('suppressEmptyUneditable'), null, formDoc)
  const editable = kb.updater?.editable((doc as NamedNode).uri)

  const autocompleteOptions:AutocompleteOptions = { // cancelButton?: HTMLElement,
    permanent: true,
    targetClass: queryParams.targetClass, // @@ simplify?
    queryParams
  }

  autocompleteOptions.size = kb.anyJS(form, ns.ui('size'), null, formDoc) || undefined

  let obj = kb.any(subject, property as any, undefined, doc)
  if (!obj) {
    obj = kb.any(form, ns.ui('default'))
    if (obj) {
      autocompleteOptions.currentObject = obj as NamedNode
      autocompleteOptions.currentName = kb.any(autocompleteOptions.currentObject, labelProperty, null, doc) as Literal
    } else { // No data or default. Should we suprress the whole field?
      if (suppressEmptyUneditable && !editable) {
        box.style.display = 'none' // clutter removal
        return box
      }
    }
  } else { // get object and name from target data:
    autocompleteOptions.currentObject = obj as NamedNode
    autocompleteOptions.currentName = kb.any(autocompleteOptions.currentObject, labelProperty, null, doc) as Literal
  }

  lhs.appendChild(widgets.fieldLabel(dom, property as any, form))

  const barOptions = {
    editable,
    dbLookup: true
  }

  renderAutocompleteControl(dom, subject as NamedNode, barOptions, autocompleteOptions, addOneIdAndRefresh, deleteOne).then((control) => {
    rhs.appendChild(control)
  }, (err) => {
    rhs.appendChild(widgets.errorMessageBlock(dom, `Error rendering autocomplete ${form}: ${err}`, '#fee', err)) //
  })
  return box
}

// ends
