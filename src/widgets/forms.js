/*       F O R M S
 *
 *      A Vanilla Dom implementation of the form language
 */
/* eslint-disable multiline-ternary */

/* global alert */

import * as buttons from './buttons'
import { fieldParams } from './forms/fieldParams'
import { field, mostSpecificClassURI, fieldFunction } from './forms/fieldFunction'
import { setFieldStyle } from './forms/formStyle'
import * as debug from '../debug'
import { errorMessageBlock } from './error'
import { basicField, fieldLabel, fieldStore, renderNameValuePair } from './forms/basic'
import { autocompleteField } from './forms/autocomplete/autocompleteField'
import * as style from '../style'

import { icons } from '../iconBase'
import * as log from '../log'
import * as ns from '../ns'
import * as $rdf from 'rdflib'
import { store } from 'solid-logic'
import * as utils from '../utils'
import * as widgets from '../widgets'
export { basicField, fieldLabel, fieldStore, renderNameValuePair } from './forms/basic' // Note default export

export { field } from './forms/fieldFunction'
export { fieldParams } from './forms/fieldParams'

const checkMarkCharacter = '\u2713'
const cancelCharacter = '\u2715'
const dashCharacter = '-'
const kb = store

field[ns.ui('AutocompleteField').uri] = autocompleteField

// ///////////////////////////////////////////////////////////////////////

/*                                  Form Field implementations
 **
 */
/**          Group of different fields
 **
 **  One type of form field is an ordered Group of other fields.
 **  A Form is actually just the same as a group.
 **
 ** @param {Document} dom The HTML Document object aka Document Object Model
 ** @param {Element?} container  If present, the created widget will be appended to this
 ** @param {Map} already A hash table of (form, subject) kept to prevent recursive forms looping
 ** @param {Node} subject The thing about which the form displays/edits data
 ** @param {Node} form The form or field to be rendered
 ** @param {Node} dataDoc The web document in which the data is
 ** @param {function(ok, errorMessage)} callbackFunction Called when data is changed?
 **
 ** @returns {Element} The HTML widget created
 */
function refreshOpionsSubfieldinGroup (dom, already, subject, dataDoc, callbackFunction, groupDiv, subfields) {
  const eles = groupDiv.children
  for (let j = 0; j < subfields.length; j++) {
    // This is really messy.
    const field = subfields[j]
    const t = mostSpecificClassURI(field) // Field type
    if (t === ns.ui('Options').uri) {
      const optionsRender = fieldFunction(dom, field)
      const newOne = optionsRender(
        dom,
        null,
        already,
        subject,
        field,
        dataDoc,
        callbackFunction
      )
      debug.log('Refreshing Options field by replacing it.') // better to support actual refresh
      groupDiv.insertBefore(newOne, eles[j])
      groupDiv.removeChild(eles[j + 1]) // Remove the old one
    }
  }
}

field[ns.ui('Form').uri] = field[ns.ui('Group').uri] =
    function (dom, container, already, subject, form, dataDoc, callbackFunction) {
      const box = dom.createElement('div')
      const ui = ns.ui
      if (container) container.appendChild(box)

      // Prevent loops
      const key = subject.toNT() + '|' + form.toNT()
      if (already[key]) {
        // been there done that
        box.appendChild(dom.createTextNode('Group: see above ' + key))
        const plist = [$rdf.st(subject, ns.owl('sameAs'), subject)] // @@ need prev subject
        dom.outlineManager.appendPropertyTRs(box, plist)
        return box
      }
      const already2 = {}
      for (const x in already) already2[x] = 1
      already2[key] = 1
      const formDoc = form.doc ? form.doc() : null // @@ if blank no way to know
      const weight0 = kb.any(form, ui('weight'), null, formDoc) // Say 0-3
      const weight = weight0 ? Number(weight0.value) : 1
      if (weight > 3 || weight < 0) return box.appendChild(errorMessageBlock(dom, `Form Group weight ${weight} should be 0-3`))

      box.setAttribute('style', style.formGroupStyle[weight]) // Indent a group
      box.style.display = 'flex'
      box.style.flexDirection = 'column'
      box.class = 'form-weight-' + weight

      let parts = kb.any(form, ui('parts'), null, formDoc)
      let subfields
      if (parts) {
        subfields = parts.elements
      } else {
        parts = kb.each(form, ui('part'), null, formDoc) //  Warning: unordered
        subfields = sortBySequence(parts)
      }
      if (!parts) {
        return box.appendChild(errorMessageBlock(dom, 'No parts to form! '))
      }

      for (let i = 0; i < subfields.length; i++) {
        const field = subfields[i]
        const subFieldFunction = fieldFunction(dom, field) //

        const itemChanged = function (ok, body) {
          if (ok && body && body.widget && body.widget === 'select') {
            refreshOpionsSubfieldinGroup(dom, already, subject, dataDoc, callbackFunction, box, subfields)
          }
          callbackFunction(ok, { widget: 'group', change: body })
        }
        box.appendChild(subFieldFunction(dom, null, already2, subject, field, dataDoc, itemChanged))
      }
      return box
    }

/**          Options field: Select one or more cases
 **
 ** @param {Document} dom The HTML Document object aka Document Object Model
 ** @param {Element?} container  If present, the created widget will be appended to this
 ** @param {Map} already A hash table of (form, subject) kept to prevent recursive forms looping
 ** @param {Node} subject The thing about which the form displays/edits data
 ** @param {Node} form The form or field to be rendered
 ** @param {Node} dataDoc The web document in which the data is
 ** @param {function(ok, errorMessage)} callbackFunction Called when data is changed?
 **
 ** @returns {Element} The HTML widget created
 */

field[ns.ui('Options').uri] = function (
  dom,
  container,
  already,
  subject,
  form,
  dataDoc,
  callbackFunction
) {
  const kb = store
  const box = dom.createElement('div')
  const formDoc = form.doc ? form.doc() : null // @@ if blank no way to know

  const ui = ns.ui
  if (container) container.appendChild(box)

  let dependingOn = kb.any(form, ui('dependingOn'))
  if (!dependingOn) {
    dependingOn = ns.rdf('type')
  } // @@ default to type (do we want defaults?)
  const cases = kb.each(form, ui('case'), null, formDoc)
  if (!cases) {
    box.appendChild(errorMessageBlock(dom, 'No cases to Options form. '))
  }
  let values
  if (dependingOn.sameTerm(ns.rdf('type'))) {
    values = Object.keys(kb.findTypeURIs(subject)).map(uri => $rdf.sym(uri)) // Use RDF-S inference
  } else {
    values = kb.each(subject, dependingOn)
  }
  if (values.length === 0) {
    box.appendChild(
      errorMessageBlock(
        dom,
        "Can't select subform as no value of: " + dependingOn
      )
    )
  } else {
    for (let i = 0; i < cases.length; i++) {
      const c = cases[i]
      const tests = kb.each(c, ui('for'), null, formDoc) // There can be multiple 'for'
      let match = false
      for (let j = 0; j < tests.length; j++) {
        for (const value of values) {
          const test = tests[j]
          if (value.sameTerm(tests) ||
            (value.termType === test.termType && value.value === test.value)) {
            match = true
          }
        }
      }
      if (match) {
        const field = kb.the(c, ui('use'))
        if (!field) {
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
            field,
            dataDoc,
            callbackFunction
          )
        }
        break
      }
    }
  }
  // @@ Add box.refresh() to sync fields with values
  return box
}

/**          Multiple field: zero or more similar subFields
 **
 ** @param {Document} dom The HTML Document object aka Document Object Model
 ** @param {Element?} container  If present, the created widget will be appended to this
 ** @param {Map} already A hash table of (form, subject) kept to prevent recursive forms looping
 ** @param {Node} subject The thing about which the form displays/edits data
 ** @param {Node} form The form or field to be rendered
 ** @param {Node} dataDoc The web document in which the data is
 ** @param {function(ok, errorMessage)} callbackFunction Called when data is changed?
 **
 ** @returns {Element} The HTML widget created
 **
 ** Form properties:
 **      @param {Boolean} reverse Make e reverse arc in the data OPS not SPO
 **      @param {NamedNode} property The property to be written in the data
 **      @param {Boolean} ordered Is the list an ordered one where the user defined the order
 */
field[ns.ui('Multiple').uri] = function (
  dom,
  container,
  already,
  subject,
  form,
  dataDoc,
  callbackFunction
) {
  /** Diagnostic function
  */
  function debugString (values) {
    return values.map(x => x.toString().slice(-7)).join(', ')
  }

  /** Add an item to the local quadstore not the UI or the web
  *
   * @param {Node} object The RDF object to be represented by this item.
   */
  async function addItem () {
    const object = newThing(dataDoc) // by default just add new nodes
    if (ordered) {
      createListIfNecessary() // Sets list and unsavedList
      list.elements.push(object)
      await saveListThenRefresh()
    } else {
      // eslint-disable-next-line multiline-ternary
      const toBeInserted = reverse ? [$rdf.st(object, property, subject, dataDoc)] : [$rdf.st(subject, property, object, dataDoc)]
      try {
        await kb.updater.update([], toBeInserted)
      } catch (err) {
        const msg = 'Error adding to unordered multiple: ' + err
        box.appendChild(errorMessageBlock(dom, msg))
        debug.error(msg)
      }
      refresh()
    }
  }

  /** Make a dom representation for an item
   * @param {Event} anyEvent if used as an event handler
   * @param {Node} object The RDF object to be represented by this item.
   */
  function renderItem (object) {
    async function deleteThisItem () {
      if (ordered) {
        debug.log('pre delete: ' + debugString(list.elements))
        for (let i = 0; i < list.elements.length; i++) {
          if (list.elements[i].sameTerm(object)) {
            list.elements.splice(i, 1)
            await saveListThenRefresh()
            return
          }
        }
      } else {
        // unordered
        if (kb.holds(subject, property, object, dataDoc)) {
          const del = [$rdf.st(subject, property, object, dataDoc)]
          kb.updater.update(del, [], function (uri, ok, message) {
            if (ok) {
              body.removeChild(subField)
            } else {
              body.appendChild(
                errorMessageBlock(
                  dom,
                  'Multiple: delete failed: ' + message
                )
              )
            }
          })
        }
      }
    }

    /** Move the object up or down in the ordered list
     * @param {Event} anyEvent if used as an event handler
     * @param {Boolean} upwards Move this up (true) or down (false).
     */
    async function moveThisItem (event, upwards) {
      // @@ possibly, allow shift+click to do move to top or bottom?
      debug.log('pre move: ' + debugString(list.elements))
      let i
      for (i = 0; i < list.elements.length; i++) {
        // Find object in array
        if (list.elements[i].sameTerm(object)) {
          break
        }
      }
      if (i === list.elements.length) {
        alert('list move: not found element for ' + object)
      }
      if (upwards) {
        if (i === 0) {
          alert('@@ boop - already at top   -temp message') // @@ make boop sound
          return
        }
        list.elements.splice(i - 1, 2, list.elements[i], list.elements[i - 1])
      } else {
        // downwards
        if (i === list.elements.length - 1) {
          alert('@@ boop - already at bottom   -temp message') // @@ make boop sound
          return
        }
        list.elements.splice(i, 2, list.elements[i + 1], list.elements[i])
      }
      await saveListThenRefresh()
    }
    /* A subField has been filled in
    *
    * One possibility is to not actually make the link to the thing until
    * this callback happens to avoid widow links
     */
    function itemDone (ok, message) {
      debug.log(`Item done callback for item ${object.toString()}`)
      if (!ok) { // when does this happen? errors typically deal with upstream
        debug.error('  Item done callback: Error: ' + message)
      }
      callbackFunction(ok, message)
    }

    log.debug('Multiple: render object: ' + object)

    const fn = fieldFunction(dom, element)
    const subField = fn(dom, null, already, object, element, dataDoc, itemDone) // subfields was: body.  moving to not passing that
    subField.subject = object // Keep a back pointer between the DOM array and the RDF objects

    // delete button and move buttons
    if (kb.updater.editable(dataDoc.uri)) {
      buttons.deleteButtonWithCheck(dom, subField, utils.label(property),
        deleteThisItem)
      if (ordered) { // Add controsl in a frame
        const frame = dom.createElement('div')
        frame.style.display = 'grid'
        frame.style.gridTemplateColumns = 'auto 3em'
        frame.style.gridTemplateRows = '50% 50%'
        const moveUpButton = buttons.button(
          dom, icons.iconBase + 'noun_1369237.svg', 'Move Up',
          async event => moveThisItem(event, true))
        const moveDownButton = buttons.button(
          dom, icons.iconBase + 'noun_1369241.svg', 'Move Down',
          async event => moveThisItem(event, false))
        const shim = dom.createElement('div')
        shim.appendChild(subField) // Subfield has its own layout
        frame.appendChild(shim)

        frame.appendChild(moveUpButton)
        frame.appendChild(moveDownButton)
        moveUpButton.style.gridColumn = 2
        moveDownButton.style.gridColumn = 2
        moveUpButton.style.gridRow = 1
        moveDownButton.style.padding = '0em' // don't take too much space
        moveUpButton.style.padding = '0em'

        moveDownButton.style.gridRow = 2
        shim.style.gridColumn = 1
        shim.style.gridRowStart = 'span 2' // Cover both rows
        // shim.style.gridRowEnd = 2 // Cover both rows
        return frame
      }
    }
    return subField // unused
  } // renderItem

  /// ///////// Body of Multiple form field implementation

  const plusIconURI = icons.iconBase + 'noun_19460_green.svg' // white plus in green circle

  const kb = store
  const formDoc = form.doc ? form.doc() : null // @@ if blank no way to know

  const box = (dom.createElement('div'))
  const shim = box // no  shim
  // We don't indent multiple as it is a sort of a prefix of the next field and has contents of one.
  // box.setAttribute('style', 'padding-left: 2em; border: 0.05em solid green;')  // Indent a multiple
  const ui = ns.ui
  if (container) container.appendChild(box)

  const orderedNode = kb.any(form, ui('ordered'))
  const ordered = orderedNode ? $rdf.Node.toJS(orderedNode) : false

  const property = kb.any(form, ui('property'))
  const reverse = kb.anyJS(form, ui('reverse'), null, formDoc)
  if (!property) {
    box.appendChild(
      errorMessageBlock(dom, 'No property to multiple: ' + form)
    ) // used for arcs in the data
    return shim
  }
  let min = kb.any(form, ui('min')) // This is the minimum number -- default 0
  min = min ? 0 + min.value : 0

  const element = kb.any(form, ui('part')) // This is the form to use for each one
  if (!element) {
    box.appendChild(
      errorMessageBlock(dom, 'No part to multiple: ' + form)
    )
    return shim
  }

  const body = box.appendChild(dom.createElement('div'))
  body.style.display = 'flex'

  body.style.flexDirection = 'column'
  let list // The RDF collection which keeps the ordered version or null
  let values // Initial values - always an array.  Even when no list yet.
  values = reverse ? kb.any(null, property, subject, dataDoc) : kb.any(subject, property, null, dataDoc)
  if (ordered) {
    list = reverse ? kb.any(null, property, subject, dataDoc) : kb.any(subject, property, null, dataDoc)
    if (list) {
      values = list.elements
    } else {
      values = []
    }
  } else {
    values = reverse ? kb.each(null, property, subject, dataDoc) : kb.each(subject, property, null, dataDoc)
    list = null
  }
  // Add control on the bottom for adding more items
  if (kb.updater.editable(dataDoc.uri)) {
    const tail = box.appendChild(dom.createElement('div'))
    tail.style.padding = '0.5em'
    let label = kb.any(form, ui('label'))
    if (!label) label = utils.label(property, true) // Init capital
    const img = tail.appendChild(dom.createElement('img'))
    img.setAttribute('src', plusIconURI) //  plus sign
    img.setAttribute('style', 'margin: 0.2em; width: 1.5em; height:1.5em')
    img.title = 'Click to add one or more ' + label
    const prompt = dom.createElement('span')
    prompt.textContent =
      (values.length === 0 ? 'Add one or more ' : 'Add more ') +
      utils.predicateLabel(property, reverse)
    tail.addEventListener('click', async _eventNotUsed => {
      await addItem()
    }, true)
    tail.appendChild(prompt)
  }

  function createListIfNecessary () {
    if (!list) {
      list = new $rdf.Collection()
      if (reverse) {
        kb.add(list, property, subject, dataDoc)
      } else {
        kb.add(subject, property, list, dataDoc)
      }
    }
  }

  async function saveListThenRefresh () {
    debug.log('save list: ' + debugString(list.elements)) // 20191214

    createListIfNecessary()
    try {
      await kb.fetcher.putBack(dataDoc)
    } catch (err) {
      box.appendChild(
        errorMessageBlock(dom, 'Error trying to put back a list: ' + err)
      )
      return
    }
    refresh()
  }

  function refresh () {
    let vals
    if (ordered) {
      const li = reverse ? kb.the(null, property, subject, dataDoc) : kb.the(subject, property, null, dataDoc)
      vals = li ? li.elements : []
    } else {
      vals = reverse ? kb.each(null, property, subject, dataDoc) : kb.each(subject, property, null, dataDoc)
      vals.sort() // achieve consistency on each refresh
    }
    utils.syncTableToArrayReOrdered(body, vals, renderItem)
  }
  body.refresh = refresh // Allow live update
  refresh()

  async function asyncStuff () {
    const extra = min - values.length
    if (extra > 0) {
      for (let j = 0; j < extra; j++) {
        debug.log('Adding extra: min ' + min)
        await addItem() // Add blanks if less than minimum
      }
      await saveListThenRefresh()
    }
  }
  asyncStuff().then(
    () => { debug.log(' Multiple render: async stuff ok') },
    (err) => { debug.error(' Multiple render: async stuff fails. #### ', err) }
  ) // async

  return shim
} // Multiple

/*          Text field
 **
 */
// For possible date popups see e.g. http://www.dynamicdrive.com/dynamicindex7/jasoncalendar.htm
// or use HTML5: http://www.w3.org/TR/2011/WD-html-markup-20110113/input.date.html
//

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

/*          Multiline Text field
 **
 */

field[ns.ui('MultiLineTextField').uri] = function (
  dom,
  container,
  already,
  subject,
  form,
  dataDoc,
  callbackFunction
) {
  const ui = ns.ui
  const kb = store
  const formDoc = form.doc ? form.doc() : null // @@ if blank no way to know

  const property = kb.any(form, ui('property'))
  if (!property) {
    return errorMessageBlock(dom, 'No property to text field: ' + form)
  }
  const box = dom.createElement('div')
  box.style.display = 'flex'
  box.style.flexDirection = 'row'
  const left = box.appendChild(dom.createElement('div'))
  left.style.width = style.formFieldNameBoxWidth
  const right = box.appendChild(dom.createElement('div'))

  left.appendChild(fieldLabel(dom, property, form))
  dataDoc = fieldStore(subject, property, dataDoc)

  const text = kb.anyJS(subject, property, null, dataDoc) || ''
  const editable = kb.updater.editable(dataDoc.uri)
  const suppressEmptyUneditable = form && kb.anyJS(form, ns.ui('suppressEmptyUneditable'), null, formDoc)

  if (!editable && suppressEmptyUneditable && text === '') {
    box.style.display = 'none'
  }
  const field = makeDescription(
    dom,
    kb,
    subject,
    property,
    dataDoc,
    callbackFunction
  )
  right.appendChild(field)
  if (container) container.appendChild(box)
  return box
}

/*          Boolean field  and Tri-state version (true/false/null)
 **
 ** @@ todo: remove tristate param
 */
function booleanField (
  dom,
  container,
  already,
  subject,
  form,
  dataDoc,
  callbackFunction,
  tristate
) {
  const ui = ns.ui
  const kb = store
  const property = kb.any(form, ui('property'))
  if (!property) {
    const errorBlock = errorMessageBlock(
      dom,
      'No property to boolean field: ' + form
    )
    if (container) container.appendChild(errorBlock)
    return errorBlock
  }
  let lab = kb.any(form, ui('label'))
  if (!lab) lab = utils.label(property, true) // Init capital
  dataDoc = fieldStore(subject, property, dataDoc)
  let state = kb.any(subject, property)
  if (state === undefined) {
    state = false
  } // @@ sure we want that -- or three-state?
  const ins = $rdf.st(subject, property, true, dataDoc)
  const del = $rdf.st(subject, property, false, dataDoc)
  const box = buildCheckboxForm(dom, kb, lab, del, ins, form, dataDoc, tristate)
  if (container) container.appendChild(box)
  return box
}
field[ns.ui('BooleanField').uri] = function (
  dom,
  container,
  already,
  subject,
  form,
  dataDoc,
  callbackFunction
) {
  return booleanField(
    dom,
    container,
    already,
    subject,
    form,
    dataDoc,
    callbackFunction,
    false
  )
}

field[ns.ui('TristateField').uri] = function (
  dom,
  container,
  already,
  subject,
  form,
  dataDoc,
  callbackFunction
) {
  return booleanField(
    dom,
    container,
    already,
    subject,
    form,
    dataDoc,
    callbackFunction,
    true
  )
}

/*          Classifier field
 **
 **  Nested categories
 **
 ** @@ To do: If a classification changes, then change any dependent Options fields.
 */

field[ns.ui('Classifier').uri] = function (
  dom,
  container,
  already,
  subject,
  form,
  dataDoc,
  callbackFunction
) {
  const kb = store
  const ui = ns.ui
  const category = kb.any(form, ui('category'))
  if (!category) {
    return errorMessageBlock(dom, 'No category for classifier: ' + form)
  }
  log.debug('Classifier: dataDoc=' + dataDoc)
  const checkOptions = function (ok, body) {
    if (!ok) return callbackFunction(ok, body)
    return callbackFunction(ok, body)
  }
  const box = makeSelectForNestedCategory(
    dom,
    kb,
    subject,
    category,
    dataDoc,
    checkOptions
  )
  if (container) container.appendChild(box)
  return box
}

/**         Choice field
 **
 **  Not nested.  Generates a link to something from a given class.
 **  Optional subform for the thing selected.
 **  Generates a subForm based on a ui:use form
 **  Will look like:
 ** <div id=dropDownDiv>
 **   <div id=labelOfDropDown>
 **   <div id=selectDiv>
 **     <select id=dropDownSelect>
 **       <option> ....
 **     <subForm>
 **  Alternative implementatons caould be:
 ** -- pop-up menu (as here)
 ** -- radio buttons
 ** -- auto-complete typing
 **
 ** Todo: Deal with multiple.  Maybe merge with multiple code.
 */

field[ns.ui('Choice').uri] = function (
  dom,
  container,
  already,
  subject,
  form,
  dataDoc,
  callbackFunction
) {
  const ui = ns.ui
  const kb = store
  const formDoc = form.doc ? form.doc() : null // @@ if blank no way to know

  let p
  const box = dom.createElement('div')
  box.setAttribute('class', 'choiceBox')
  // Set flexDirection column?
  if (container) container.appendChild(box)
  const lhs = dom.createElement('div')
  lhs.setAttribute('class', 'formFieldName choiceBox-label')
  box.appendChild(lhs)
  const rhs = dom.createElement('div')
  rhs.setAttribute('class', 'formFieldValue choiceBox-selectBox')
  box.appendChild(rhs)
  const property = kb.any(form, ui('property'))
  if (!property) {
    return box.appendChild(errorMessageBlock(dom, 'No property for Choice: ' + form))
  }
  lhs.appendChild(fieldLabel(dom, property, form))
  const uiFrom = kb.any(form, ui('from'))
  if (!uiFrom) {
    return errorMessageBlock(dom, "No 'from' for Choice: " + form)
  }
  const subForm = kb.any(form, ui('use')) // Optional
  const follow = kb.anyJS(form, ui('follow'), null, formDoc) // data doc moves to new subject?
  let possible = []
  let possibleProperties
  let multiple = false
  let firstSelectOptionText = '* Select for ' + utils.label(subject, true) + ' *'
  // if we do NOT have a container it means it is a ui:Multiple
  // only important for the first option text in select
  if (!container) {
    multiple = true
    firstSelectOptionText = utils.label(subject, true)
  }
  const opts = { form, subForm, multiple, firstSelectOptionText, disambiguate: false }
  possible = kb.each(undefined, ns.rdf('type'), uiFrom, formDoc)
  for (const x in kb.findMembersNT(uiFrom)) {
    possible.push(kb.fromNT(x))
  } // Use rdfs

  if (uiFrom.sameTerm(ns.rdfs('Class'))) {
    for (p in buttons.allClassURIs()) possible.push(kb.sym(p))
    // log.debug("%%% Choice field: possible.length 2 = "+possible.length)
  } else if (uiFrom.sameTerm(ns.rdf('Property'))) {
    possibleProperties = buttons.propertyTriage(kb)
    for (p in possibleProperties.op) possible.push(kb.fromNT(p))
    for (p in possibleProperties.dp) possible.push(kb.fromNT(p))
    opts.disambiguate = true // This is a big class, and the labels won't be enough.
  } else if (uiFrom.sameTerm(ns.owl('ObjectProperty'))) {
    possibleProperties = buttons.propertyTriage(kb)
    for (p in possibleProperties.op) possible.push(kb.fromNT(p))
    opts.disambiguate = true
  } else if (uiFrom.sameTerm(ns.owl('DatatypeProperty'))) {
    possibleProperties = buttons.propertyTriage(kb)
    for (p in possibleProperties.dp) possible.push(kb.fromNT(p))
    opts.disambiguate = true
  }
  const sortedPossible = sortByLabel(possible)
  // TODO: this checks for any occurrence, regardless of true or false setting
  if (kb.any(form, ui('canMintNew'))) {
    opts.mint = '* Create new *' // @@ could be better
  }
  const selector = makeSelectForOptions(
    dom,
    kb,
    subject,
    property,
    sortedPossible,
    uiFrom,
    opts,
    dataDoc,
    callbackFunction
  )
  rhs.appendChild(selector)
  let object
  if (selector.currentURI) {
    object = $rdf.sym(selector.currentURI)
  } else {
    object = kb.any(subject, property)
  }
  if (object && subForm) {
    removeNextSiblingsAfterElement(selector)
    addSubFormChoice(dom, rhs, already, object, subForm, follow ? object.doc() : dataDoc, callbackFunction)
  }

  return box
}

/**
     * Removes all sibling elements after specified
     * @param {HTMLElement} currentElement
     * @private
  */
function removeNextSiblingsAfterElement (currentElement) {
  while (currentElement.nextElementSibling) {
    currentElement.nextElementSibling.remove()
  }
}

function addSubFormChoice (dom, selectDiv, already, subject, subForm, dataDoc, callbackFunction) {
  fieldFunction(dom, subForm)(
    dom,
    selectDiv,
    already,
    subject,
    subForm,
    dataDoc,
    callbackFunction
  )
}

//          Documentation - non-interactive fields
//

field[ns.ui('Comment').uri] = field[
  ns.ui('Heading').uri
] = function (
  dom,
  container,
  already,
  subject,
  form,
  dataDoc,
  _callbackFunction
) {
  const ui = ns.ui
  const kb = store
  let contents = kb.any(form, ui('contents'))
  if (!contents) contents = 'Error: No contents in comment field.'
  const formDoc = form.doc ? form.doc() : null // @@ if blank no way to know

  const uri = mostSpecificClassURI(form)
  const params = fieldParams[uri] || {}

  const box = dom.createElement('div')
  if (container) container.appendChild(box)
  const p = box.appendChild(dom.createElement(params.element))
  p.textContent = contents

  setFieldStyle(p, form)

  // Some headings and prompts are only useful to guide user input
  const suppressIfUneditable = kb.anyJS(form, ns.ui('suppressIfUneditable'), null, formDoc)
  const editable = kb.updater.editable(dataDoc.uri)
  if (suppressIfUneditable && !editable) {
    box.style.display = 'none'
  }
  return box
}

// A button for editing a form (in place, at the moment)
//
//  When editing forms, make it yellow, when editing thr form form, pink
// Help people understand how many levels down they are.
//
export function editFormButton (
  dom,
  container,
  form,
  dataDoc,
  callbackFunction
) {
  const b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.innerHTML = 'Edit ' + utils.label(ns.ui('Form'))
  b.addEventListener(
    'click',
    function (_e) {
      const ff = appendForm(
        dom,
        container,
        {},
        form,
        ns.ui('FormForm'),
        dataDoc,
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

export function appendForm (
  dom,
  container,
  already,
  subject,
  form,
  dataDoc,
  itemDone
) {
  return fieldFunction(dom, form)(
    dom,
    container,
    already,
    subject,
    form,
    dataDoc,
    itemDone
  )
}

/**          Find list of properties for class
//
// Three possible sources: Those mentioned in schemas, which exludes many
// those which occur in the data we already have, and those predicates we
// have come across anywhere and which are not explicitly excluded from
// being used with this class.
*/

export function propertiesForClass (kb, c) {
  const explicit = kb.each(undefined, ns.rdf('range'), c)
  ;[
    ns.rdfs('comment'),
    ns.dc('title'), // Generic things
    ns.foaf('name'),
    ns.foaf('homepage')
  ].forEach(function (x) {
    explicit.push(x)
  })
  let members = kb.each(undefined, ns.rdf('type'), c)
  if (members.length > 60) members = members.slice(0, 60) // Array supports slice?
  const used = {}
  for (let i = 0; i < (members.length > 60 ? 60 : members.length); i++) {
    kb.statementsMatching(members[i], undefined, undefined).forEach(function (st) {
      used[st.predicate.uri] = true
    })
  }
  explicit.forEach(function (p) {
    used[p.uri] = true
  })
  const result = []
  for (const uri in used) {
    result.push(kb.sym(uri))
  }
  return result
}

/** Find the closest class
* @param kb The quad store
* @param cla - the URI of the class
* @param prop
*/
export function findClosest (kb, cla, prop) {
  const agenda = [kb.sym(cla)] // ordered - this is breadth first search
  while (agenda.length > 0) {
    const c = agenda.shift() // first
    const lists = kb.each(c, prop)
    log.debug('Lists for ' + c + ', ' + prop + ': ' + lists.length)
    if (lists.length !== 0) return lists
    const supers = kb.each(c, ns.rdfs('subClassOf'))
    for (let i = 0; i < supers.length; i++) {
      agenda.push(supers[i])
      log.debug('findClosest: add super: ' + supers[i])
    }
  }
  return []
}

// Which forms apply to a given existing subject?

export function formsFor (subject) {
  const kb = store

  log.debug('formsFor: subject=' + subject)
  const t = kb.findTypeURIs(subject)
  let t1
  for (t1 in t) {
    log.debug('   type: ' + t1)
  }
  const bottom = kb.bottomTypeURIs(t) // most specific
  let candidates = []
  for (const b in bottom) {
    // Find the most specific
    log.debug('candidatesFor: trying bottom type =' + b)
    candidates = candidates.concat(
      findClosest(kb, b, ns.ui('creationForm'))
    )
    candidates = candidates.concat(
      findClosest(kb, b, ns.ui('annotationForm'))
    )
  }
  return candidates
}

export function sortBySequence (list) {
  const subfields = list.map(function (p) {
    const k = kb.any(p, ns.ui('sequence'))
    return [k || 9999, p]
  })
  subfields.sort(function (a, b) {
    return a[0] - b[0]
  })
  return subfields.map(function (pair) {
    return pair[1]
  })
}

export function sortByLabel (list) {
  const subfields = list.map(function (p) {
    return [utils.label(p).toLowerCase(), p]
  })
  subfields.sort()
  return subfields.map(function (pair) {
    return pair[1]
  })
}

/** Button to add a new whatever using a form
//
// @param form - optional form , else will look for one
// @param dataDoc - optional dataDoc else will prompt for one (unimplemented)
*/
export function newButton (
  dom,
  kb,
  subject,
  predicate,
  theClass,
  form,
  dataDoc,
  callbackFunction
) {
  const b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.innerHTML = 'New ' + utils.label(theClass)
  b.addEventListener(
    'click',
    function (_e) {
      b.parentNode.appendChild(
        promptForNew(
          dom,
          kb,
          subject,
          predicate,
          theClass,
          form,
          dataDoc,
          callbackFunction
        )
      )
    },
    false
  )
  return b
}

/**      Prompt for new object of a given class
//
// @param dom - the document DOM for the user interface
// @param kb - the graph which is the knowledge base we are working with
// @param subject - a term, Thing this should be linked to when made. Optional.
// @param predicate - a term, the relationship for the subject link. Optional.
// @param theClass - an RDFS class containng the object about which the new information is.
// @param form  - the form to be used when a new one. null means please find one.
// @param dataDoc - The web document being edited
// @param callbackFunction - takes (boolean ok, string errorBody)
// @returns a dom object with the form DOM
*/
export function promptForNew (
  dom,
  kb,
  subject,
  predicate,
  theClass,
  form,
  dataDoc,
  callbackFunction
) {
  const box = dom.createElement('form')

  if (!form) {
    const lists = findClosest(kb, theClass.uri, ns.ui('creationForm'))
    if (lists.length === 0) {
      const p = box.appendChild(dom.createElement('p'))
      p.textContent =
        'I am sorry, you need to provide information about a ' +
        utils.label(theClass) +
        " but I don't know enough information about those to ask you."
      const b = box.appendChild(dom.createElement('button'))
      b.setAttribute('type', 'button')
      b.setAttribute('style', 'float: right;')
      b.innerHTML = 'Goto ' + utils.label(theClass)
      b.addEventListener(
        'click',
        function (_e) {
          dom.outlineManager.GotoSubject(
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
    log.debug('lists[0] is ' + lists[0])
    form = lists[0] // Pick any one
  }
  log.debug('form is ' + form)
  box.setAttribute('style', `border: 0.05em solid ${style.formBorderColor}; color: ${style.formBorderColor}`) // @@color?
  box.innerHTML = '<h3>New ' + utils.label(theClass) + '</h3>'

  const formFunction = fieldFunction(dom, form)
  const object = newThing(dataDoc)
  let gotButton = false
  const itemDone = function (ok, body) {
    if (!ok) return callbackFunction(ok, body)
    const insertMe = []
    if (subject && !kb.holds(subject, predicate, object, dataDoc)) {
      insertMe.push($rdf.st(subject, predicate, object, dataDoc))
    }
    if (subject && !kb.holds(object, ns.rdf('type'), theClass, dataDoc)) {
      insertMe.push($rdf.st(object, ns.rdf('type'), theClass, dataDoc))
    }
    if (insertMe.length) {
      kb.updater.update([], insertMe, linkDone)
    } else {
      callbackFunction(true, body)
    }
    if (!gotButton) {
      gotButton = box.appendChild(buttons.linkButton(dom, object))
    }
  }
  function linkDone (uri, ok, body) {
    return callbackFunction(ok, body)
  }
  log.info('paneUtils Object is ' + object)
  const f = formFunction(dom, box, {}, object, form, dataDoc, itemDone)
  const rb = buttons.removeButton(dom, f)
  rb.setAttribute('style', 'float: right;')
  box.AJAR_subject = object
  return box
}

export function makeDescription (
  dom,
  kb,
  subject,
  predicate,
  dataDoc,
  callbackFunction
) {
  const group = dom.createElement('div')
  const desc = kb.anyJS(subject, predicate, null, dataDoc) || ''

  const field = dom.createElement('textarea')
  group.appendChild(field)
  field.rows = desc ? desc.split('\n').length + 2 : 2
  field.cols = 80

  field.setAttribute('style', style.multilineTextInputStyle)
  if (desc !== null) {
    field.value = desc
  } else {
    // Unless you can make the predicate label disappear with the first click then this is over-cute
    // field.value = utils.label(predicate); // Was"enter a description here" @@ possibly: add prompt which disappears
    field.select() // Select it ready for user input -- doesn't work
  }

  group.refresh = function () {
    const v = kb.any(subject, predicate, null, dataDoc)
    if (v && v.value !== field.value) {
      field.value = v.value // don't touch widget if no change
      // @@ this is the place to color the field from the user who chanaged it
    }
  }
  function saveChange (_e) {
    submit.disabled = true
    submit.setAttribute('style', 'visibility: hidden; float: right;') // Keep UI clean
    field.disabled = true
    field.style.color = style.textInputColorPending // setAttribute('style', style + 'color: gray;') // pending
    const ds = kb.statementsMatching(subject, predicate, null, dataDoc)
    const is = $rdf.st(subject, predicate, field.value, dataDoc)
    kb.updater.update(ds, is, function (uri, ok, body) {
      if (ok) {
        field.style.color = style.textInputColor
        field.disabled = false
      } else {
        group.appendChild(
          errorMessageBlock(
            dom,
            'Error (while saving change to ' + dataDoc.uri + '): ' + body
          )
        )
      }
      if (callbackFunction) {
        callbackFunction(ok, body)
      }
    })
  }

  const editable = kb.updater.editable(dataDoc.uri)
  let submit
  if (editable) {
    submit = widgets.continueButton(dom, saveChange)
    submit.disabled = true // until the filled has been modified
    submit.style.visibility = 'hidden'
    submit.style.float = 'right'
    group.appendChild(submit)

    field.addEventListener(
      'keyup',
      function (_e) {
        // Green means has been changed, not saved yet
        field.style.color = 'green' // setAttribute('style', style + 'color: green;')
        if (submit) {
          submit.disabled = false
          submit.style.visibility = '' // Remove visibility: hidden
        }
      },
      true
    )
    field.addEventListener('change', saveChange, true)
  } else {
    field.disabled = true // @@ change color too
    field.style.backgroundColor = style.textInputBackgroundColorUneditable
  }
  return group
}

/** Make SELECT element to select options
//
// @param subject - a term, the subject of the statement(s) being edited.
// @param predicate - a term, the predicate of the statement(s) being edited
// @param possible - a list of terms, the possible value the object can take
// @param options.multiple - Boolean - Whether more than one at a time is allowed
// @param options.firstSelectOptionText - a string to be displayed as the
//                        option for none selected (for non multiple)
// @param options.mint - User may create thing if this sent to the prompt string eg "New foo"
// @param options.subForm - If mint, then the form to be used for minting the new thing
// @param dataDoc - The web document being edited
// @param callbackFunction - takes (boolean ok, string errorBody)
*/
export function makeSelectForOptions (
  dom,
  kb,
  subject,
  predicate,
  possible,
  uiFrom,
  options,
  dataDoc,
  callbackFunction
) {
  log.debug('Select list length now ' + possible.length)
  let n = 0
  const uris = {} // Count them
  const editable = kb.updater.editable(dataDoc.uri)

  for (let i = 0; i < possible.length; i++) {
    const sub = possible[i] // @@ Maybe; make this so it works with blank nodes too
    if (!sub.uri) debug.warn(`makeSelectForOptions: option does not have an uri: ${sub}, with predicate: ${predicate}`)
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

  log.debug('makeSelectForOptions: dataDoc=' + dataDoc)
  let actual
  const getActual = function () {
    actual = {}
    if (predicate.sameTerm(ns.rdf('type'))) {
      actual = kb.findTypeURIs(subject)
    } else {
      kb.each(subject, predicate, null, dataDoc).forEach(function (x) {
        if (x.uri) {
          actual[x.uri] = true
        }
      })
    }
    return actual
  }
  actual = getActual()

  const onChange = function (_e) {
    const ds = []
    let is = []
    const removeValue = function (t) {
      if (kb.holds(subject, predicate, t, dataDoc)) {
        ds.push($rdf.st(subject, predicate, t, dataDoc))
      }
    }
    let newObject
    for (let i = 0; i < select.options.length; i++) {
      const opt = select.options[i]
      if (opt.selected && opt.AJAR_mint) {
        // not sure if this 'if' is used because I cannot find mintClass
        if (options.mintClass) {
          const thisForm = promptForNew(
            dom,
            kb,
            subject,
            predicate,
            options.mintClass,
            null,
            dataDoc,
            function (ok, body) {
              if (!ok) {
                callbackFunction(ok, body, { change: 'new' }) // @@ if ok, need some form of refresh of the select for the new thing
              }
            }
          )
          select.parentNode.appendChild(thisForm)
          newObject = thisForm.AJAR_subject
        } else {
          newObject = newThing(dataDoc)
        }
        is.push($rdf.st(subject, predicate, kb.sym(newObject), dataDoc))
        if (uiFrom) is.push($rdf.st(newObject, ns.rdf('type'), kb.sym(uiFrom), dataDoc))

        // not sure if this 'if' is used because I cannot find mintStatementsFun
        if (options.mintStatementsFun) {
          is = is.concat(options.mintStatementsFun(newObject))
        }
        select.currentURI = newObject
      }
      if (!opt.AJAR_uri) continue // a prompt or mint
      if (opt.selected && !(opt.AJAR_uri in actual)) {
        // new class
        is.push($rdf.st(subject, predicate, kb.sym(opt.AJAR_uri), dataDoc))
        select.currentURI = opt.AJAR_uri
      }
      if (opt.selected) select.currentURI = opt.AJAR_uri
    }
    let sel = select.subSelect // All subclasses must also go
    while (sel && sel.currentURI) {
      removeValue(kb.sym(sel.currentURI))
      sel = sel.subSelect
    }
    sel = select.superSelect // All superclasses are redundant
    while (sel && sel.currentURI) {
      removeValue(kb.sym(sel.currentURI))
      sel = sel.superSelect
    }
    log.info('selectForOptions: data doc = ' + dataDoc)
    // refresh subForm
    removeNextSiblingsAfterElement(select)
    addSubFormChoice(dom, select.parentNode, {}, $rdf.sym(select.currentURI), options.subForm, dataDoc, function (ok, body) {
      if (ok) {
        kb.updater.update(ds, is, function (uri, success, errorBody) {
          actual = getActual() // refresh
          if (!success) select.parentNode.appendChild(errorMessageBlock(dom, 'Error updating select: ' + errorBody))
        })
        if (callbackFunction) callbackFunction(ok, { widget: 'select', event: 'new' })
      } else {
        select.parentNode.appendChild(errorMessageBlock(dom, 'Error updating data in field of select: ' + body))
      }
    })
  }

  const select = dom.createElement('select')
  select.setAttribute('style', style.formSelectSTyle)
  // if (options.multiple) select.setAttribute('multiple', 'true') // use case merged with ui:Multiple
  select.currentURI = null

  select.refresh = function () {
    actual = getActual() // refresh
    for (let i = 0; i < select.children.length; i++) {
      const option = select.children[i]
      if (option.AJAR_uri) {
        option.selected = option.AJAR_uri in actual
      }
    }
    select.disabled = false // unlocked any conflict we had got into
  }

  for (const uri in uris) {
    const c = kb.sym(uri)
    const option = dom.createElement('option')
    if (options.disambiguate) {
      option.appendChild(dom.createTextNode(utils.labelWithOntology(c, true))) // Init. cap
    } else {
      option.appendChild(dom.createTextNode(utils.label(c, true))) // Init.
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
    option.AJAR_uri = uri
    if (uri in actual) {
      option.setAttribute('selected', 'true')
      select.currentURI = uri
      // dump("Already in class: "+ uri+"\n")
    }
    select.appendChild(option)
  }
  if (editable && options.mint) {
    const mint = dom.createElement('option')
    mint.appendChild(dom.createTextNode(options.mint))
    mint.AJAR_mint = true // Flag it
    select.insertBefore(mint, select.firstChild)
  }
  if (!select.currentURI && options.multiple) {
    const prompt = dom.createElement('option')
    prompt.appendChild(dom.createTextNode(options.firstSelectOptionText))
    prompt.disabled = true
    prompt.value = true
    prompt.hidden = true
    prompt.selected = true
    select.insertBefore(prompt, select.firstChild)
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
  dataDoc,
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
  log.debug('Select list length ' + subs.length)
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
    null,
    { multiple },
    dataDoc,
    callbackFunction
  )
}

/** Make SELECT element to select subclasses recurively
//
// It will so a mutually exclusive dropdown, with another if there are nested
// disjoint unions.
//
// @param  callbackFunction takes (boolean ok, string errorBody)
*/
export function makeSelectForNestedCategory (
  dom,
  kb,
  subject,
  category,
  dataDoc,
  callbackFunction
) {
  function update () {
    if (child) {
      container.removeChild(child)
      child = null
    }
    if (
      select.currentURI &&
      kb.any(kb.sym(select.currentURI), ns.owl('disjointUnionOf'))
    ) {
      child = makeSelectForNestedCategory(
        dom,
        kb,
        subject,
        kb.sym(select.currentURI),
        dataDoc,
        callbackFunction
      )
      select.subSelect = child.firstChild
      select.subSelect.superSelect = select
      container.appendChild(child)
    }
  }

  const container = dom.createElement('span') // Container
  let child = null

  function onChange (ok, body) {
    if (ok) update()
    callbackFunction(ok, body)
  }
  // eslint-disable-next-line prefer-const
  const select = makeSelectForCategory(
    dom,
    kb,
    subject,
    category,
    dataDoc,
    onChange
  )
  container.appendChild(select)
  update()
  return container
}

/*  Build a checkbox from a given statement(s)
 **
 **  If the source document is editable, make the checkbox editable
 **
 **  ins and sel are either statements *or arrays of statements* which should be
 **  made if the checkbox is checed and unchecked respectively.
 **  tristate: Allow ins, or del, or neither
 */
export function buildCheckboxForm (dom, kb, lab, del, ins, form, dataDoc, tristate) {
  const box = dom.createElement('div')
  const rhs = renderNameValuePair(dom, kb, box, form, lab)
  const editable = kb.updater.editable(dataDoc.uri)

  const input = dom.createElement('button')
  const colorCarrier = input
  input.style = style.checkboxInputStyle
  rhs.appendChild(input)

  function fix (x) {
    if (!x) return [] // no statements
    if (x.object) {
      if (!x.why) {
        x.why = dataDoc // be back-compaitible  with old code
      }
      return [x] // one statements
    }
    if (x instanceof Array) return x
    throw new Error('buildCheckboxForm: bad param ' + x)
  }
  ins = fix(ins)
  del = fix(del)

  function holdsAll (a) {
    const missing = a.filter(
      st => !kb.holds(st.subject, st.predicate, st.object, st.why)
    )
    return missing.length === 0
  }
  function refresh () {
    let state = holdsAll(ins)
    let displayState = state
    if (del.length) {
      const negation = holdsAll(del)
      if (state && negation) {
        box.appendChild(
          widgets.errorMessageBlock(
            dom,
            'Inconsistent data in dataDoc!\n' + ins + ' and\n' + del
          )
        )
        return box
      }
      if (!state && !negation) {
        state = null
        const defa = kb.any(form, ns.ui('default'))
        displayState = defa ? defa.value === '1' : tristate ? null : false
      }
    }
    input.state = state
    input.textContent = {
      true: checkMarkCharacter,
      false: tristate ? cancelCharacter : ' ', // Just use blank when not tristate
      null: dashCharacter
    }[displayState]
  }

  refresh()
  if (!editable) return box

  const boxHandler = function (_e) {
    colorCarrier.style.color = '#bbb' // grey -- not saved yet
    const toDelete = input.state === true ? ins : input.state === false ? del : []
    input.newState =
      input.state === null
        ? true
        : input.state === true
          ? false
          : tristate
            ? null
            : true

    const toInsert =
      input.newState === true ? ins : input.newState === false ? del : []
    debug.log(`  Deleting  ${toDelete}`)
    debug.log(`  Inserting ${toInsert}`)
    kb.updater.update(toDelete, toInsert, function (
      uri,
      success,
      errorBody
    ) {
      if (!success) {
        if (toDelete.why) {
          const hmmm = kb.holds(
            toDelete.subject,
            toDelete.predicate,
            toDelete.object,
            toDelete.why
          )
          if (hmmm) {
            debug.log(' @@@@@ weird if 409 - does hold statement')
          }
        }
        colorCarrier.style.color = '#000'
        colorCarrier.style.backgroundColor = '#fee'
        box.appendChild(
          errorMessageBlock(
            dom,
            `Checkbox: Error updating dataDoc from ${input.state} to ${
              input.newState
            }:\n\n${errorBody}`
          )
        )
      } else {
        colorCarrier.style.color = '#000'
        input.state = input.newState
        input.textContent = {
          true: checkMarkCharacter,
          false: cancelCharacter,
          null: dashCharacter
        }[input.state] // @@
      }
    })
  }
  input.addEventListener('click', boxHandler, false)
  return box
}
/*
export function fieldLabel (dom, property, form) {
  let lab = kb.any(form, ns.ui('label'))
  if (!lab) lab = utils.label(property, true) // Init capital
  if (property === undefined) {
    return dom.createTextNode('@@Internal error: undefined property')
  }
  const anchor = dom.createElement('a')
  if (property.uri) anchor.setAttribute('href', property.uri)
  anchor.setAttribute('style', style.fieldLabelStyle) // Not too blue and no underline
  anchor.textContent = lab
  return anchor
}

export function fieldStore (subject, predicate, def) {
  const sts = kb.statementsMatching(subject, predicate)
  if (sts.length === 0) return def // can used default as no data yet
  if (
    sts.length > 0 &&
    sts[0].why.uri &&
    kb.updater.editable(sts[0].why.uri)
  ) {
    return kb.sym(sts[0].why.uri)
  }
  return def
}
*/
/** Mint local ID using timestamp
 * @param {NamedNode} doc - the document in which the ID is to be generated
 */
export function newThing (doc) {
  const now = new Date()
  return $rdf.sym(doc.uri + '#' + 'id' + ('' + now.getTime()))
}
