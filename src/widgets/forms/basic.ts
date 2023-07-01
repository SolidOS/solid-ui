import { BlankNode, Literal, NamedNode, Node, st, Store, Variable } from 'rdflib'
import { solidLogicSingleton } from 'solid-logic'
import * as ns from '../../ns'
import { formFieldNameBoxStyle, textInputStyle, textInputStyleUneditable } from '../../style'
import styleConstants from '../../styleConstants'
import { label } from '../../utils'
import { errorMessageBlock } from '../error'
import { mostSpecificClassURI } from './fieldFunction'
import { fieldParams } from './fieldParams'

const store = solidLogicSingleton.store

/*  Style and create a name, value pair
*/
export function renderNameValuePair (dom: HTMLDocument, kb: Store, box: HTMLElement, form: NamedNode, label?: string):HTMLElement {
  // const property = kb.any(form, ns.ui('property'))
  box.style.display = 'flex'
  box.style.flexDirection = 'row'
  const lhs = box.appendChild(dom.createElement('div'))
  lhs.style.width = styleConstants.formFieldNameBoxWidth
  const rhs = box.appendChild(dom.createElement('div'))

  lhs.setAttribute('class', 'formFieldName')
  lhs.setAttribute('style', formFieldNameBoxStyle)
  rhs.setAttribute('class', 'formFieldValue')
  if (label) {
    lhs.appendChild(dom.createTextNode(label))
  } else if (kb.any(form, ns.ui('property'))) { // Assume more space for error on right
    lhs.appendChild(fieldLabel(dom, kb.any(form, ns.ui('property')) as NamedNode, form))
  } else {
    rhs.appendChild(errorMessageBlock(dom, 'No property or label given for form field: ' + form))
    lhs.appendChild(dom.createTextNode('???'))
  }
  return rhs
}

/**
 * Create an anchor element with a label as the anchor text.
 *
 * @param dom The DOM
 * @param property href for the anchor element
 * @param fieldInQuestion field to produce a label for
 *
 * @internal exporting this only for unit tests
 */
export function fieldLabel (dom: HTMLDocument, property: NamedNode | undefined, fieldInQuestion: Node): HTMLElement | Text {
  let lab = store.any(fieldInQuestion as any, ns.ui('label'))
  if (!lab) lab = label(property, true) // Init capital
  if (property === undefined) {
    return dom.createTextNode('@@Internal error: undefined property')
  }
  const anchor = dom.createElement('a')
  /* istanbul ignore next */
  if (property.uri) anchor.setAttribute('href', property.uri)
  anchor.setAttribute('style', 'color: #3B5998; text-decoration: none;') // Not too blue and no underline
  anchor.textContent = lab as any
  return anchor
}

/**
 * Returns the document for the first quad that matches
 * the subject and predicate provided, or default if that
 * store is not editable.
 *
 * @param subject Subject about which we want to find an editable RDF document
 * @param predicate Predicate about which we want to find an editable RDF document
 * @param def default RDF document to return if none found
 *
 * @internal exporting this only for unit tests
 */
export function fieldStore (subject: NamedNode | BlankNode | Variable, predicate: NamedNode | Variable, def: NamedNode | undefined): NamedNode | undefined {
  const sts = store.statementsMatching(subject, predicate)
  if (sts.length === 0) return def // can used default as no data yet
  if (!store.updater) {
    throw new Error('Store has no updater')
  }
  if (
    sts.length > 0 &&
    sts[0].why.value &&
    store.updater.editable(sts[0].why.value, store)
  ) {
    return store.sym(sts[0].why.value)
  }
  return def
}

/**
 * Render a basic form field
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
export function basicField (
  dom: HTMLDocument,
  container: HTMLElement | undefined,
  already,
  subject: NamedNode | BlankNode | Variable,
  form: NamedNode,
  doc: NamedNode | undefined,
  callbackFunction: (_ok: boolean, _errorMessage: string) => void
): HTMLElement {
  const kb = store
  const formDoc = form.doc ? form.doc() : null // @@ if blank no way to know

  const box = dom.createElement('div')

  const property = kb.any(form, ns.ui('property'))
  if (container) container.appendChild(box)
  if (!property) {
    return box.appendChild(
      errorMessageBlock(dom, 'Error: No property given for text field: ' + form)
    )
  }
  const rhs = renderNameValuePair(dom, kb, box, form)

  // It can be cleaner to just remove empty fields if you can't edit them anyway
  const suppressEmptyUneditable = kb.anyJS(form, ns.ui('suppressEmptyUneditable'), null, formDoc)

  const uri = mostSpecificClassURI(form)
  let params = fieldParams[uri]
  if (params === undefined) params = { style: '' } // non-bottom field types can do this
  const paramStyle = params.style || ''
  const style = textInputStyle + paramStyle
  const field = dom.createElement('input')
  ;(field as any).style = style
  rhs.appendChild(field)
  field.setAttribute('type', params.type ? params.type : 'text')

  const size = kb.anyJS(form, ns.ui('size')) || styleConstants.textInputSize || 20
  field.setAttribute('size', size)

  const maxLength = kb.any(form, ns.ui('maxLength'))
  field.setAttribute('maxLength', maxLength ? '' + maxLength : '4096')

  doc = doc || fieldStore(subject, property as any, doc)

  let obj = kb.any(subject, property as any, undefined, doc)
  if (!obj) {
    obj = kb.any(form, ns.ui('default'))
  }
  if (obj && obj.value && params.uriPrefix) {
    // eg tel: or mailto:
    field.value = decodeURIComponent(obj.value.replace(params.uriPrefix, '')) // should have no spaces but in case
      .replace(/ /g, '')
  } else if (obj) {
    /* istanbul ignore next */
    field.value = obj.value || obj.value || ''
  }
  field.setAttribute('style', style)
  if (!kb.updater) {
    throw new Error('kb has no updater')
  }
  if (!kb.updater.editable((doc as NamedNode).uri)) {
    field.readOnly = true // was: disabled. readOnly is better
    ;(field as any).style = textInputStyleUneditable + paramStyle
    if (suppressEmptyUneditable && field.value === '') {
      box.style.display = 'none' // clutter
    }
    return box
  }

  // read-write:
  field.addEventListener(
    'keyup',
    function (_e) {
      if (params.pattern) {
        field.setAttribute(
          'style',
          style +
            (field.value.match(params.pattern)
              ? 'color: green;'
              : 'color: red;')
        )
      }
    },
    true
  )
  field.addEventListener(
    'change',
    function (_e) {
      // i.e. lose focus with changed data
      if (params.pattern && !field.value.match(params.pattern)) return
      field.disabled = true // See if this stops getting two dates from fumbling e.g the chrome datepicker.
      field.setAttribute('style', style + 'color: gray;') // pending
      const ds = kb.statementsMatching(subject, property as any) // remove any multiple values
      let result
      if (params.namedNode) {
        result = kb.sym(field.value)
      } else if (params.uriPrefix) {
        result = encodeURIComponent(field.value.replace(/ /g, ''))
        result = kb.sym(params.uriPrefix + field.value)
      } else {
        if (params.dt) {
          result = new Literal(
            field.value.trim(),
            undefined,
            ns.xsd(params.dt)
          )
        } else {
          result = new Literal(field.value)
        }
      }
      let is = ds.map(statement => st(statement.subject, statement.predicate, result, statement.why)) // can include >1 doc
      if (is.length === 0) {
        // or none
        is = [st(subject, property as any, result, doc)]
      }

      function updateMany (ds, is: { why: { uri: string } }[], callback) {
        const docs: any[] = []
        is.forEach(st => {
          if (!docs.includes(st.why.uri)) docs.push(st.why.uri)
        })
        ds.forEach(st => {
          /* istanbul ignore next */
          if (!docs.includes(st.why.uri)) docs.push(st.why.uri)
        })
        /* istanbul ignore next */
        if (docs.length === 0) {
          throw new Error('updateMany has no docs to patch')
        }
        if (!kb.updater) {
          throw new Error('kb has no updater')
        }
        if (docs.length === 1) {
          return kb.updater.update(ds, is as any, callback)
        }
        // return kb.updater.update(ds, is, callback)

        const doc = docs.pop()
        const is1 = is.filter(st => st.why.uri === doc)
        const is2 = is.filter(st => st.why.uri !== doc)
        const ds1 = ds.filter(st => st.why.uri === doc)
        const ds2 = ds.filter(st => st.why.uri !== doc)
        kb.updater.update(ds1, is1 as any, function (uri, ok, body) {
          if (ok) {
            updateMany(ds2, is2, callback)
          } else {
            callback(uri, ok, body)
          }
        })
      }

      updateMany(ds, is as any, function (uri, ok, body) {
        // kb.updater.update(ds, is, function (uri, ok, body) {
        if (ok) {
          field.disabled = false
          field.setAttribute('style', style)
        } else {
          box.appendChild(errorMessageBlock(dom, body))
        }
        callbackFunction(ok, body)
      })
    },
    true
  )
  return box
}
