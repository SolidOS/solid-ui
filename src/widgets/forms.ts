/*       F O R M S
 *
 *      A Vanilla Dom implementation of the form language
 */

/* global alert */

import { st, sym, UpdateManager, Collection, Literal, NamedNode, IndexedFormula } from 'rdflib'
import { iconBase } from '../iconBase'
import uiStore from '../store'
import ns from '../ns'
import { formBorderColor, formHeadingColor, textInputStyle, multilineTextInputStyle } from '../style'
import { debug, info } from '../log'

import { errorMessageBlock } from './error'
import { button, propertyTriage, allClassURIs, deleteButtonWithCheck, removeButton, linkButton } from './buttons'
import { syncTableToArrayReOrdered, label, labelWithOntology } from '../utils'

const checkMarkCharacter = '\u2713'
const cancelCharacter = '\u2715'
const dashCharacter = '-'

export const field = {} // Form field functions by URI of field type.
export const fieldParams = {}

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
 ** @param {Node} store The web document in which the data is
 ** @param {function(ok, errorMessage)} callbackFunction Called when data is changed?
 **
 ** @returns {Element} The HTML widget created
 */
field[ns.ui('Form').uri] = field[
  ns.ui('Group').uri
] = function (dom: HTMLDocument, container: Element | undefined, already: { }, subject: NamedNode, form: NamedNode, store: NamedNode, callbackFunction: (ok: boolean, errorMessage: string) => void) {
  const kb = uiStore
  var box = dom.createElement('div')
  box.setAttribute('style', `padding-left: 2em; border: 0.05em solid ${formBorderColor};`) // Indent a group
  if (container) container.appendChild(box)

  // Prevent loops
  var key = subject.toNT() + '|' + form.toNT()

  if (already[key]) {
    // been there done that
    box.appendChild(dom.createTextNode('Group: see above ' + key))
    var plist = [(st as any)(subject, ns.owl('sameAs'), subject)] // @@ need prev subject
    ;(dom as any).outlineManager.appendPropertyTRs(box, plist)
    return box
  }
  // box.appendChild(dom.createTextNode('Group: first time, key: '+key))
  var already2 = {}
  for (var x in already) already2[x] = 1
  already2[key] = 1

  var parts = kb.any(form, ns.ui('parts'))
  var p2
  if (parts) {
    if (!parts.elements) {
      throw new Error('Form parts should be an RDF collection, see https://solid.github.io/solid-ui/examples/forms/')
    }
    p2 = parts.elements
  } else {
    parts = kb.each(form, ns.ui('part')) //  Warning: unordered
    p2 = sortBySequence(parts)
  }

  if (!parts) {
    box.appendChild(errorMessageBlock(dom, 'No parts to form! '))
    return dom
  }
  var eles = []
  var original = []
  for (var i = 0; i < p2.length; i++) {
    var field = p2[i]
    var t = mostSpecificClassURI(field) // Field type
    if (t === ns.ui('Options').uri) {
      var dep = kb.any(field, ns.ui('dependingOn'))
      if (dep && kb.any(subject, dep)) (original as any)[i] = kb.any(subject, dep).toNT()
    }

    var fn = fieldFunction(dom, field)

    var itemChanged = function (ok, body) {
      if (ok) {
        for (var j = 0; j < p2.length; j++) {
          // This is really messy.
          var field = p2[j]
          var t = mostSpecificClassURI(field) // Field type
          if (t === ns.ui('Options').uri) {
            var dep = kb.any(field, ns.ui('dependingOn'))
            var newOne = fn(
              dom,
              box,
              already,
              subject,
              field,
              store,
              callbackFunction
            )
            box.removeChild(newOne)
            box.insertBefore(newOne, eles[j])
            box.removeChild(eles[j])
            ;(original as any)[j] = kb.any(subject, dep).toNT()
            ;(eles as any)[j] = newOne
          }
        }
      }
      callbackFunction(ok, body)
    }
    ;(eles as any).push(fn(dom, box, already2, subject, field, store, itemChanged))
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
 ** @param {Node} store The web document in which the data is
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
  store,
  callbackFunction
) {
  const kb = uiStore
  var box = dom.createElement('div')
  // box.setAttribute('style', 'padding-left: 2em; border: 0.05em dotted purple;')  // Indent Options
  if (container) container.appendChild(box)

  var dependingOn = kb.any(form, ns.ui('dependingOn'))
  if (!dependingOn) {
    dependingOn = ns.rdf('type')
  } // @@ default to type (do we want defaults?)
  var cases = kb.each(form, ns.ui('case'))
  if (!cases) {
    box.appendChild(errorMessageBlock(dom, 'No cases to Options form. '))
  }
  var values
  if (dependingOn.sameTerm(ns.rdf('type'))) {
    values = kb.findTypeURIs(subject)
  } else {
    var value = kb.any(subject, dependingOn)
    if (value === undefined) {
      box.appendChild(
        errorMessageBlock(
          dom,
          "Can't select subform as no value of: " + dependingOn
        )
      )
    } else {
      values = {}
      values[value.uri] = true
    }
  }
  // @@ Add box.refresh() to sync fields with values
  for (var i = 0; i < cases.length; i++) {
    var c = cases[i]
    var tests = kb.each(c, ns.ui('for')) // There can be multiple 'for'
    for (var j = 0; j < tests.length; j++) {
      if (values[tests[j].uri]) {
        var field = kb.the(c, ns.ui('use'))
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
            store,
            callbackFunction
          )
        }
        break
      }
    }
  }
  return box
}

/**          Multiple field: zero or more similar subFields
 **
 ** @param {Document} dom The HTML Document object aka Document Object Model
 ** @param {Element?} container  If present, the created widget will be appended to this
 ** @param {Map} already A hash table of (form, subject) kept to prevent recursive forms looping
 ** @param {Node} subject The thing about which the form displays/edits data
 ** @param {Node} form The form or field to be rendered
 ** @param {Node} store The web document in which the data is
 ** @param {function(ok, errorMessage)} callbackFunction Called when data is changed?
 **
 ** @returns {Element} The HTML widget created
 */
field[ns.ui('Multiple').uri] = function (
  dom,
  container,
  already,
  subject,
  form,
  store,
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
  async function addItem (object?) {
    if (!object) object = newThing(store) // by default just add new nodes
    if (ordered) {
      createListIfNecessary() // Sets list and unsavedList
      list.elements.push(object)
      await saveListThenRefresh()
    } else {
      const toBeInserted = [st(subject, property, object, store)]
      try {
        await kb.updater.update([], toBeInserted)
      } catch (err) {
        const msg = 'Error adding to unordered multiple: ' + err
        box.appendChild(errorMessageBlock(dom, msg))
        console.error(msg)
      }
      refresh() // 20191213
    }
  }

  /** Make a dom representation for an item
   * @param {Event} anyEvent if used as an event handler
   * @param {Node} object The RDF object to be represented by this item.
   */
  function renderItem (object) {
    async function deleteThisItem () {
      if (ordered) {
        console.log('pre delete: ' + debugString(list.elements))
        for (let i = 0; i < list.elements.length; i++) {
          if (list.elements[i].sameTerm(object)) {
            list.elements.splice(i, 1)
            await saveListThenRefresh()
            return
          }
        }
      } else {
        // unordered
        if (kb.holds(subject, property, object)) {
          var del = [st(subject, property, object, store)]
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
      console.log('pre move: ' + debugString(list.elements))
      for (var i = 0; i < list.elements.length; i++) {
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
    function itemDone (uri, ok, message) {
      console.log(`Item ${uri} done callback for item ${object.uri.slice(-7)}`)
      if (!ok) { // when does this happen? errors typically deal with upstream
        console.error('  Item done callback: Error: ' + message)
      } else {
        linkDone(uri, ok, message)
      }
      /*  Put this as a function and call it from only one place
      var ins, del
      // alert('Multiple: item calklback.' + uri)
      if (ok) {
        // @@@ Check IT hasnt alreday been written in
        if (ordered) {
          list = kb.any(subject, property, null, store)
          if (!list) {
            list = new Collection([object])
            ins = [st(subject, property, list)] // Will this work?
          } else {
            const oldList = new Collection(list.elments)
            list.append(object)
            del = [st(subject, property, oldList)] // If this doesn't work, kb.saveBack(store)
            ins = [st(subject, property, list)]
          }
        } else {
          if (!kb.holds(subject, property, object, store)) {
            ins = [st(subject, property, object, store)]
          }
          kb.updater.update(del, ins, linkDone)
        }
      } else {
        box.appendChild(
          errorMessageBlock(dom, 'Multiple: item failed: ' + body)
        )
        callbackFunction(ok, message)
      }
      */
    }
    var linkDone = function (uri, ok, message) {
      return callbackFunction(ok, message)
    }

    // if (!object) object = newThing(store)
    debug('Multiple: render object: ' + object)
    // var tr = box.insertBefore(dom.createElement('tr'), tail)
    // var ins = []
    // var del = []

    var fn = fieldFunction(dom, element)
    var subField = fn(dom, null, already, object, element, store, itemDone) // p2 was: body.  moving to not passing that
    subField.subject = object // Keep a back pointer between the DOM array and the RDF objects

    // delete button and move buttons
    if (kb.updater.editable(store.uri)) {
      deleteButtonWithCheck(dom, subField, label(property),
        deleteThisItem)
      if (ordered) {
        subField.appendChild(
          button(
            dom, iconBase + 'noun_1369237.svg', 'Move Up',
            async event => moveThisItem(event, true))
        )
        subField.appendChild(
          button(
            dom, iconBase + 'noun_1369241.svg', 'Move Down',
            async event => moveThisItem(event, false))
        )
      }
    }
    return subField // unused
  } // renderItem

  /// ///////// Body of form field implementation

  var plusIconURI = iconBase + 'noun_19460_green.svg' // white plus in green circle

  const kb = uiStore
  kb.updater = kb.updater || new UpdateManager(kb)
  var box = dom.createElement('table')
  // We don't indent multiple as it is a sort of a prefix of the next field and has contents of one.
  // box.setAttribute('style', 'padding-left: 2em; border: 0.05em solid green;')  // Indent a multiple
  if (container) container.appendChild(box)

  const orderedNode = kb.any(form, ns.ui('ordered'))
  const ordered = orderedNode ? (Node as any).toJS(orderedNode) : false

  var property = kb.any(form, ns.ui('property'))
  if (!property) {
    box.appendChild(
      errorMessageBlock(dom, 'No property to multiple: ' + form)
    ) // used for arcs in the data
    return box
  }
  var min = kb.any(form, ns.ui('min')) // This is the minimum number -- default 0
  min = min ? 0 + min.value : 0
  // var max = kb.any(form, ns.ui('max')) // This is the minimum number
  // max = max ? max.value : 99999999

  var element = kb.any(form, ns.ui('part')) // This is the form to use for each one
  if (!element) {
    box.appendChild(
      errorMessageBlock(dom, 'No part to multiple: ' + form)
    )
    return box
  }

  var body = box.appendChild(dom.createElement('tr')) // 20191207
  var list // The RDF collection which keeps the ordered version
  var values // Initial values - an array.  Even when no list yet.

  // var unsavedList = false // Flag that
  if (ordered) {
    list = kb.any(subject, property)
    if (list) {
      values = list.elements
    } else {
      // unsavedList = true
      values = []
    }
  } else {
    values = kb.each(subject, property)
    list = null
  }
  // Add control on the bottom for adding more items
  if (kb.updater.editable(store.uri)) {
    var tail = box.appendChild(dom.createElement('tr'))
    tail.style.padding = '0.5em'
    var img = tail.appendChild(dom.createElement('img'))
    img.setAttribute('src', plusIconURI) //  plus sign
    img.setAttribute('style', 'margin: 0.2em; width: 1.5em; height:1.5em')
    img.title = 'Click to add one or more ' + label(property)
    var prompt = tail.appendChild(dom.createElement('span'))
    prompt.textContent =
      (values.length === 0 ? 'Add one or more ' : 'Add more ') +
      label(property)
    tail.addEventListener('click', async _eventNotUsed => {
      await addItem()
    }, true)
  }

  function createListIfNecessary () {
    if (!list) {
      list = new Collection([])
      kb.add(subject, property, list, store)
    }
  }

  async function saveListThenRefresh () {
    console.log('save list: ' + debugString(list.elements)) // 20191214

    createListIfNecessary()
    try {
      await kb.fetcher.putBack(store)
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
      const li = kb.the(subject, property)
      vals = li ? li.elements : []
    } else {
      vals = kb.each(subject, property)
      vals.sort() // achieve consistency on each refresh
    }
    syncTableToArrayReOrdered(body, vals, renderItem)
  }
  body.refresh = refresh // Allow live update
  refresh()

  async function asyncStuff () {
    var extra = min - values.length
    if (extra > 0) {
      for (var j = 0; j < extra; j++) {
        console.log('Adding extra: min ' + min)
        await addItem() // Add blanks if less than minimum
      }
      await saveListThenRefresh()
    }
    // if (unsavedList) {
    //     await saveListThenRefresh() // async
    // }
  }
  asyncStuff().then(
    () => { console.log(' Multiple render: async stuff ok') },
    (err) => { console.error(' Multiple render: async stuff fails. #### ', err) }
  ) // async

  return box
} // Multiple

/*          Text field
 **
 */
// For possible date popups see e.g. http://www.dynamicdrive.com/dynamicindex7/jasoncalendar.htm
// or use HTML5: http://www.w3.org/TR/2011/WD-html-markup-20110113/input.date.html
//

fieldParams[ns.ui('ColorField').uri] = {
  size: 9,
  type: 'color',
  dt: 'color'
} // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
fieldParams[
  ns.ui('ColorField').uri
].pattern = /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/

fieldParams[ns.ui('DateField').uri] = {
  size: 20,
  type: 'date',
  dt: 'date'
}
fieldParams[
  ns.ui('DateField').uri
].pattern = /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/

fieldParams[ns.ui('DateTimeField').uri] = {
  size: 20,
  type: 'date',
  dt: 'dateTime'
}
fieldParams[
  ns.ui('DateTimeField').uri
].pattern = /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/

fieldParams[ns.ui('TimeField').uri] = {
  size: 10,
  type: 'time',
  dt: 'time'
}
fieldParams[
  ns.ui('TimeField').uri
].pattern = /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/

fieldParams[ns.ui('IntegerField').uri] = {
  size: 12,
  style: 'text-align: right',
  dt: 'integer'
}
fieldParams[ns.ui('IntegerField').uri].pattern = /^\s*-?[0-9]+\s*$/

fieldParams[ns.ui('DecimalField').uri] = {
  size: 12,
  style: 'text-align: right',
  dt: 'decimal'
}
fieldParams[
  ns.ui('DecimalField').uri
].pattern = /^\s*-?[0-9]*(\.[0-9]*)?\s*$/

fieldParams[ns.ui('FloatField').uri] = {
  size: 12,
  style: 'text-align: right',
  dt: 'float'
}
fieldParams[
  ns.ui('FloatField').uri
].pattern = /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/

fieldParams[ns.ui('SingleLineTextField').uri] = {}
fieldParams[ns.ui('NamedNodeURIField').uri] = { namedNode: true }
fieldParams[ns.ui('TextField').uri] = {}

fieldParams[ns.ui('PhoneField').uri] = { size: 20, uriPrefix: 'tel:' }
fieldParams[ns.ui('PhoneField').uri].pattern = /^\+?[\d-]+[\d]*$/

fieldParams[ns.ui('EmailField').uri] = {
  size: 30,
  uriPrefix: 'mailto:'
}
fieldParams[ns.ui('EmailField').uri].pattern = /^\s*.*@.*\..*\s*$/ // @@ Get the right regexp here

/** Render a basic form field
 *
 ** @param {Document} dom The HTML Document object aka Document Object Model
 ** @param {Element?} container  If present, the created widget will be appended to this
 ** @param {Map} already A hash table of (form, subject) kept to prevent recursive forms looping
 ** @param {Node} subject The thing about which the form displays/edits data
 ** @param {Node} form The form or field to be rendered
 ** @param {Node} store The web document in which the data is
 ** @param {function(ok, errorMessage)} callbackFunction Called when data is changed?
 **
 ** @returns {Element} The HTML widget created
 **
 ** The same function is used for many similar one-value fields, with different
 ** regexps used to validate.
 */
function basicField (
  dom: HTMLDocument,
  container: HTMLElement | undefined,
  already,
  subject: NamedNode,
  form: NamedNode,
  store: NamedNode,
  callbackFunction: (ok: boolean, errorMessage: string) => void
) {
  const kb = uiStore

  var box = dom.createElement('tr')
  if (container) container.appendChild(box)
  var lhs = dom.createElement('td')
  lhs.setAttribute('class', 'formFieldName')
  lhs.setAttribute('style', '  vertical-align: middle;')
  box.appendChild(lhs)
  var rhs = dom.createElement('td')
  rhs.setAttribute('class', 'formFieldValue')
  box.appendChild(rhs)

  var property = kb.any(form, ns.ui('property'))
  if (!property) {
    box.appendChild(
      dom.createTextNode('Error: No property given for text field: ' + form)
    )
    return box
  }
  lhs.appendChild(fieldLabel(dom, property, form))
  var uri = mostSpecificClassURI(form)
  var params = fieldParams[uri]
  if (params === undefined) params = {} // non-bottom field types can do this
  var style = params.style || textInputStyle || 'font-size: 100%; margin: 0.1em; padding: 0.1em;'
  // box.appendChild(dom.createTextNode(' uri='+uri+', pattern='+ params.pattern))
  var field = dom.createElement('input')
  ;(field as any).style = textInputStyle // Do we have to override length etc?
  rhs.appendChild(field)
  field.setAttribute('type', params.type ? params.type : 'text')

  var size = kb.any(form, ns.ui('size')) // Form has precedence
  field.setAttribute(
    'size',
    size ? '' + size : params.size ? '' + params.size : '20'
  )
  var maxLength = kb.any(form, ns.ui('maxLength'))
  field.setAttribute('maxLength', maxLength ? '' + maxLength : '4096')

  store = store || fieldStore(subject, property, store)

  var obj = kb.any(subject, property, undefined, store)
  if (!obj) {
    obj = kb.any(form, ns.ui('default'))
  }
  if (obj && obj.uri && params.uriPrefix) {
    // eg tel: or mailto:
    field.value = decodeURIComponent(obj.uri.replace(params.uriPrefix, '')) // should have no spaces but in case
      .replace(/ /g, '')
  } else if (obj) {
    field.value = obj.value || obj.uri || ''
  }
  field.setAttribute('style', style)

  if (!kb.updater.editable(store.uri)) {
    field.readOnly = true // was: disabled. readOnly is better
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
      var ds = kb.statementsMatching(subject, property) // remove any multiple values
      var result
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
      var is = ds.map(st => st(st.subject, st.predicate, result, st.why)) // can include >1 doc
      if (is.length === 0) {
        // or none
        is = [st(subject, property, result, store)]
      }

      function updateMany (ds, is: { why: { uri: string } }[], callback) {
        var docs: any[] = []
        is.forEach(st => {
          if (!docs.includes(st.why.uri)) docs.push(st.why.uri)
        })
        ds.forEach(st => {
          if (!docs.includes(st.why.uri)) docs.push(st.why.uri)
        })
        if (docs.length === 0) {
          throw new Error('updateMany has no docs to patch')
        }
        if (docs.length === 1) {
          return kb.updater.update(ds, is, callback)
        }
        // return kb.updater.update(ds, is, callback)

        const doc = docs.pop()
        const is1 = is.filter(st => st.why.uri === doc)
        const is2 = is.filter(st => st.why.uri !== doc)
        const ds1 = ds.filter(st => st.why.uri === doc)
        const ds2 = ds.filter(st => st.why.uri !== doc)
        kb.updater.update(ds1, is1, function (uri, ok, body) {
          if (ok) {
            updateMany(ds2, is2, callback)
          } else {
            console.log('Update many failed on: ' + doc)
            callback(uri, ok, body)
          }
        })
      }

      updateMany(ds, is, function (uri, ok, body) {
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
  store,
  callbackFunction
) {
  const kb = uiStore
  var property = kb.any(form, ns.ui('property'))
  if (!property) {
    return errorMessageBlock(dom, 'No property to text field: ' + form)
  }
  const box = dom.createElement('div')
  box.appendChild(fieldLabel(dom, property, form))
  store = fieldStore(subject, property, store)
  var field = makeDescription(
    dom,
    kb,
    subject,
    property,
    store,
    callbackFunction
  )
  // box.appendChild(dom.createTextNode('<-@@ subj:'+subject+', prop:'+property))
  box.appendChild(field)
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
  store,
  callbackFunction,
  tristate
) {
  const kb = uiStore
  var property = kb.any(form, ns.ui('property'))
  if (!property) {
    const errorBlock = errorMessageBlock(
      dom,
      'No property to boolean field: ' + form
    )
    if (container) container.appendChild(errorBlock)
    return errorBlock
  }
  var lab = kb.any(form, ns.ui('label'))
  if (!lab) lab = label(property, true) // Init capital
  store = fieldStore(subject, property, store)
  var state = kb.any(subject, property)
  if (state === undefined) {
    state = false
  } // @@ sure we want that -- or three-state?
  // debug('store is '+store)
  var ins = (st as any)(subject, property, true, store)
  var del = (st as any)(subject, property, false, store)
  var box = buildCheckboxForm(dom, kb, lab, del, ins, form, store, tristate)
  if (container) container.appendChild(box)
  return box
}
field[ns.ui('BooleanField').uri] = function (
  dom,
  container,
  already,
  subject,
  form,
  store,
  callbackFunction
) {
  return booleanField(
    dom,
    container,
    already,
    subject,
    form,
    store,
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
  store,
  callbackFunction
) {
  return booleanField(
    dom,
    container,
    already,
    subject,
    form,
    store,
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
  store,
  callbackFunction
) {
  const kb = uiStore

  var category = kb.any(form, ns.ui('category'))
  if (!category) {
    return errorMessageBlock(dom, 'No category for classifier: ' + form)
  }
  debug('Classifier: store=' + store)
  var checkOptions = function (ok, body) {
    if (!ok) return callbackFunction(ok, body)

    /*
    var parent = kb.any(undefined, ns.ui('part'), form)
    if (!parent) return callbackFunction(ok, body)
    var kids = kb.each(parent, ns.ui('part')); // @@@@@@@@@ Garbage
    kids = kids.filter(function(k){return kb.any(k, ns.rdf('type'), ns.ui('Options'))})
    if (kids.length) debug('Yes, found related options: '+kids[0])
    */
    return callbackFunction(ok, body)
  }
  var box = makeSelectForNestedCategory(
    dom,
    kb,
    subject,
    category,
    store,
    checkOptions
  )
  if (container) container.appendChild(box)
  return box
}

/**         Choice field
 **
 **  Not nested.  Generates a link to something from a given class.
 **  Optional subform for the thing selected.
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
  store,
  callbackFunction
) {
  const kb = uiStore
  var multiple = false
  var p
  var box = dom.createElement('tr')
  if (container) container.appendChild(box)
  var lhs = dom.createElement('td')
  box.appendChild(lhs)
  var rhs = dom.createElement('td')
  box.appendChild(rhs)
  var property = kb.any(form, ns.ui('property'))
  if (!property) {
    return errorMessageBlock(dom, 'No property for Choice: ' + form)
  }
  lhs.appendChild(fieldLabel(dom, property, form))
  var from = kb.any(form, ns.ui('from'))
  if (!from) {
    return errorMessageBlock(dom, "No 'from' for Choice: " + form)
  }
  var subForm = kb.any(form, ns.ui('use')) // Optional
  var possible: any[] = []
  var possibleProperties
  var np = '--' + label(property) + '-?'
  var opts: any = { multiple: multiple, nullLabel: np, disambiguate: false }
  possible = kb.each(undefined, ns.rdf('type'), from)
  for (var x in kb.findMembersNT(from)) {
    possible.push(kb.fromNT(x))
    // box.appendChild(dom.createTextNode("RDFS: adding "+x))
  } // Use rdfs
  // debug("%%% Choice field: possible.length 1 = "+possible.length)
  if (from.sameTerm(ns.rdfs('Class'))) {
    for (p in allClassURIs()) possible.push(kb.sym(p))
    // debug("%%% Choice field: possible.length 2 = "+possible.length)
  } else if (from.sameTerm(ns.rdf('Property'))) {
    possibleProperties = propertyTriage(kb)
    for (p in possibleProperties.op) possible.push(kb.fromNT(p))
    for (p in possibleProperties.dp) possible.push(kb.fromNT(p))
    opts.disambiguate = true // This is a big class, and the labels won't be enough.
  } else if (from.sameTerm(ns.owl('ObjectProperty'))) {
    possibleProperties = propertyTriage(kb)
    for (p in possibleProperties.op) possible.push(kb.fromNT(p))
    opts.disambiguate = true
  } else if (from.sameTerm(ns.owl('DatatypeProperty'))) {
    possibleProperties = propertyTriage(kb)
    for (p in possibleProperties.dp) possible.push(kb.fromNT(p))
    opts.disambiguate = true
  }
  var object = kb.any(subject, property)
  function addSubForm () {
    object = kb.any(subject, property)
    fieldFunction(dom, subForm)(
      dom,
      rhs,
      already,
      object,
      subForm,
      store,
      callbackFunction
    )
  }
  // box.appendChild(dom.createTextNode('Choice: subForm='+subForm))
  var possible2 = sortByLabel(possible)
  if (kb.any(form, ns.ui('canMintNew'))) {
    opts.mint = '* New *' // @@ could be better
    opts.subForm = subForm
  }
  var selector = makeSelectForOptions(
    dom,
    kb,
    subject,
    property,
    possible2,
    opts,
    store,
    callbackFunction
  )
  rhs.appendChild(selector)
  if (object && subForm) addSubForm()
  return box
}

//          Documentation - non-interactive fields
//

fieldParams[ns.ui('Comment').uri] = {
  element: 'p',
  style: `padding: 0.1em 1.5em; color: ${formHeadingColor}; white-space: pre-wrap;`
}
fieldParams[ns.ui('Heading').uri] = {
  element: 'h3',
  style: `font-size: 110%; color: ${formHeadingColor};`
}

field[ns.ui('Comment').uri] = field[
  ns.ui('Heading').uri
] = function (
  dom,
  container,
  already,
  subject,
  form,
  _store,
  _callbackFunction
) {
  const kb = uiStore
  var contents = kb.any(form, ns.ui('contents'))
  if (!contents) contents = 'Error: No contents in comment field.'

  var uri = mostSpecificClassURI(form)
  var params = fieldParams[uri]
  if (params === undefined) {
    params = {}
  } // non-bottom field types can do this

  var box = dom.createElement('div')
  if (container) container.appendChild(box)
  var p = box.appendChild(dom.createElement(params.element))
  p.textContent = contents

  var style = kb.any(form, ns.ui('style'))
  if (style === undefined) {
    style = params.style ? params.style : ''
  }
  if (style) p.setAttribute('style', style)

  return box
}

/// ////////////// Form-related functions

/** Which class of field is this?
 * @param x a field
 * @returns the URI of the most specific class
 */

export function mostSpecificClassURI (x) {
  const kb = uiStore
  var ft = kb.findTypeURIs(x)
  var bot = kb.bottomTypeURIs(ft) // most specific
  var bots: any[] = []
  for (var b in bot) bots.push(b)
  // if (bots.length > 1) throw "Didn't expect "+x+" to have multiple bottom types: "+bots
  return bots[0]
}

export function fieldFunction (dom, field) {
  const uri = mostSpecificClassURI(field) // What type
  // const uri = field.uri
  var fun = field[uri]
  debug(
    'paneUtils: Going to implement field ' + field + ' of type ' + uri
  )
  if (!fun) {
    return function () {
      return errorMessageBlock(
        dom,
        'No handler for field ' + field + ' of type ' + uri
      )
    }
  }
  return fun
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
  store,
  callbackFunction
) {
  var b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.innerHTML = 'Edit ' + label(ns.ui('Form'))
  b.addEventListener(
    'click',
    function (_e) {
      var ff = appendForm(
        dom,
        container,
        {},
        form,
        ns.ui('FormForm'),
        store,
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
  dom: HTMLDocument,
  container: HTMLElement,
  already,
  subject: NamedNode,
  form: NamedNode,
  store: NamedNode,
  itemDone: () => void
) {
  return fieldFunction(dom, form)(
    dom,
    container,
    already,
    subject,
    form,
    store,
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
  var explicit = kb.each(undefined, ns.rdf('range'), c)
  ;[
    ns.rdfs('comment'),
    ns.dc('title'), // Generic things
    ns.foaf('name'),
    ns.foaf('homepage')
  ].map(function (x) {
    explicit.push(x)
  })
  var members = kb.each(undefined, ns.rdf('type'), c)
  if (members.length > 60) members = members.slice(0, 60) // Array supports slice?
  var used = {}
  for (var i = 0; i < (members.length > 60 ? 60 : members.length); i++) {
    kb.statementsMatching(members[i], undefined, undefined).map(function (st) {
      used[st.predicate.uri] = true
    })
  }
  explicit.map(function (p) {
    used[p.uri] = true
  })
  var result: any[] = []
  for (var uri in used) {
    result.push(kb.sym(uri))
  }
  return result
}

/** Find the closest class
* @param kb The store
* @param cla - the URI of the class
* @param prop
*/
export function findClosest (kb: IndexedFormula, cla: NamedNode | string, prop: NamedNode): NamedNode[] {
  var agenda: NamedNode[] = [kb.sym(cla)] // ordered - this is breadth first search
  while (agenda.length > 0) {
    var c = agenda.shift() // first
    // if (c.uri && (c.uri == ns.owl('Thing').uri || c.uri == ns.rdf('Resource').uri )) continue
    var lists: NamedNode[] = kb.each(c, prop) as NamedNode[]
    debug('Lists for ' + c + ', ' + prop + ': ' + lists.length)
    if (lists.length !== 0) return lists
    var supers = kb.each(c, ns.rdfs('subClassOf'))
    for (var i = 0; i < supers.length; i++) {
      agenda.push(supers[i] as NamedNode)
      debug('findClosest: add super: ' + supers[i])
    }
  }
  return []
}

// Which forms apply to a given existing subject?

export function formsFor (subject) {
  const kb = uiStore

  debug('formsFor: subject=' + subject)
  var t = kb.findTypeURIs(subject)
  var t1
  for (t1 in t) {
    debug('   type: ' + t1)
  }
  var bottom = kb.bottomTypeURIs(t) // most specific
  var candidates: any[] = []
  for (var b in bottom) {
    // Find the most specific
    debug('candidatesFor: trying bottom type =' + b)
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
  var p2 = list.map(function (p) {
    var k = uiStore.any(p, ns.ui('sequence'))
    return [k || 9999, p]
  })
  p2.sort(function (a, b) {
    return a[0] - b[0]
  })
  return p2.map(function (pair) {
    return pair[1]
  })
}

export function sortByLabel (list) {
  var p2 = list.map(function (p) {
    return [label(p).toLowerCase(), p]
  })
  p2.sort()
  return p2.map(function (pair) {
    return pair[1]
  })
}

/** Button to add a new whatever using a form
//
// @param form - optional form , else will look for one
// @param store - optional store else will prompt for one (unimplemented)
*/
export function newButton (
  dom: HTMLDocument,
  kb: IndexedFormula,
  subject: NamedNode,
  predicate: NamedNode,
  theClass: NamedNode,
  form: NamedNode,
  store: NamedNode,
  callbackFunction
) {
  var b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.innerHTML = 'New ' + label(theClass)
  b.addEventListener(
    'click',
    function (_e) {
      ;(b.parentNode as HTMLElement).appendChild(
        promptForNew(
          dom,
          kb,
          subject,
          predicate,
          theClass,
          form,
          store,
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
// @param store - The web document being edited
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
  store,
  callbackFunction
) {
  var box = dom.createElement('form')

  if (!form) {
    var lists = findClosest(kb, theClass.uri, ns.ui('creationForm'))
    if (lists.length === 0) {
      var p = box.appendChild(dom.createElement('p'))
      p.textContent =
        'I am sorry, you need to provide information about a ' +
        label(theClass) +
        " but I don't know enough information about those to ask you."
      var b = box.appendChild(dom.createElement('button'))
      b.setAttribute('type', 'button')
      b.setAttribute('style', 'float: right;')
      b.innerHTML = 'Goto ' + label(theClass)
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
    debug('lists[0] is ' + lists[0])
    form = lists[0] // Pick any one
  }
  debug('form is ' + form)
  box.setAttribute('style', `border: 0.05em solid ${formBorderColor}; color: ${formBorderColor}`) // @@color?
  box.innerHTML = '<h3>New ' + label(theClass) + '</h3>'

  var formFunction = fieldFunction(dom, form)
  var object = newThing(store)
  var gotButton = false
  var itemDone = function (ok, body) {
    if (!ok) return callbackFunction(ok, body)
    var insertMe: any[] = []
    if (subject && !kb.holds(subject, predicate, object, store)) {
      insertMe.push(st(subject, predicate, object, store))
    }
    if (subject && !kb.holds(object, ns.rdf('type'), theClass, store)) {
      insertMe.push(st(object, ns.rdf('type'), theClass, store))
    }
    if (insertMe.length) {
      uiStore.updater.update([], insertMe, linkDone)
    } else {
      callbackFunction(true, body)
    }
    if (!gotButton) {
      gotButton = box.appendChild(linkButton(dom, object))
    }
    // tabulator.outline.GotoSubject(object, true, undefined, true, undefined)
  }
  function linkDone (uri, ok, body) {
    return callbackFunction(ok, body)
  }
  info('paneUtils Object is ' + object)
  var f = formFunction(dom, box, {}, object, form, store, itemDone)
  var rb = removeButton(dom, f)
  rb.setAttribute('style', 'float: right;')
  box.AJAR_subject = object
  return box
}

export function makeDescription (
  dom: HTMLDocument,
  kb: IndexedFormula,
  subject: NamedNode,
  predicate: NamedNode,
  store: NamedNode,
  callbackFunction: (ok: boolean, errorMessage: string) => void
) {
  var group = dom.createElement('div')

  var sts = kb.statementsMatching(subject, predicate, null, store) // Only one please
  if (sts.length > 1) {
    return errorMessageBlock(
      dom,
      'Should not be ' + sts.length + ' i.e. >1 ' + predicate + ' of ' + subject
    )
  }
  var desc = sts.length ? sts[0].object.value : undefined

  var field = dom.createElement('textarea')
  group.appendChild(field)
  field.rows = desc ? desc.split('\n').length + 2 : 2
  field.cols = 80
  var style = multilineTextInputStyle ||
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
    var v = kb.any(subject, predicate, null, store)
    if (v && v.value !== field.value) {
      field.value = v.value // don't touch widget if no change
      // @@ this is the place to color the field from the user who chanaged it
    }
  }
  function saveChange (_e) {
    submit.disabled = true
    submit.setAttribute('style', 'visibility: hidden; float: right;') // Keep UI clean
    field.disabled = true
    field.setAttribute('style', style + 'color: gray;') // pending
    var ds = kb.statementsMatching(subject, predicate, null, store)
    var is = st(subject, predicate, field.value, store)
    uiStore.updater.update(ds, is, function (uri, ok, body) {
      if (ok) {
        field.setAttribute('style', style + 'color: black;')
        field.disabled = false
      } else {
        group.appendChild(
          errorMessageBlock(
            dom,
            'Error (while saving change to ' + store.uri + '): ' + body
          )
        )
      }
      if (callbackFunction) {
        callbackFunction(ok, body)
      }
    })
  }

  var br = dom.createElement('br')
  group.appendChild(br)

  var editable = uiStore.updater.editable(store.uri)
  if (editable) {
    var submit = dom.createElement('input')
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

/** Make SELECT element to select options
//
// @param subject - a term, the subject of the statement(s) being edited.
// @param predicate - a term, the predicate of the statement(s) being edited
// @param possible - a list of terms, the possible value the object can take
// @param options.multiple - Boolean - Whether more than one at a time is allowed
// @param options.nullLabel - a string to be displayed as the
//                        option for none selected (for non multiple)
// @param options.mint - User may create thing if this sent to the prompt string eg "New foo"
// @param options.subForm - If mint, then the form to be used for minting the new thing
// @param store - The web document being edited
// @param callbackFunction - takes (boolean ok, string errorBody)
*/
export function makeSelectForOptions (
  dom,
  kb,
  subject,
  predicate,
  possible,
  options,
  store,
  callbackFunction
) {
  debug('Select list length now ' + possible.length)
  var n = 0
  var uris = {} // Count them
  var editable = uiStore.updater.editable(store.uri)

  for (var i = 0; i < possible.length; i++) {
    var sub = possible[i] // @@ Maybe; make this so it works with blank nodes too
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
  debug('makeSelectForOptions: store=' + store)

  var getActual = function () {
    actual = {}
    if (predicate.sameTerm(ns.rdf('type'))) {
      actual = kb.findTypeURIs(subject)
    } else {
      kb.each(subject, predicate, null, store).map(function (x) {
        actual[x.uri] = true
      })
    }
    return actual
  }
  var actual = getActual()

  // var newObject = null

  var onChange = function (_e) {
    select.disabled = true // until data written back - gives user feedback too
    var ds: any[] = []
    var is: any[] = []
    var removeValue = function (t) {
      if (kb.holds(subject, predicate, t, store)) {
        ds.push(st(subject, predicate, t, store))
      }
    }
    for (var i = 0; i < select.options.length; i++) {
      var opt = select.options[i]
      if (opt.selected && opt.AJAR_mint) {
        var newObject
        if (options.mintClass) {
          var thisForm = promptForNew(
            dom,
            kb,
            subject,
            predicate,
            options.mintClass,
            null,
            store,
            function (ok, body) {
              if (!ok) {
                callbackFunction(ok, body) // @@ if ok, need some form of refresh of the select for the new thing
              }
            }
          )
          select.parentNode.appendChild(thisForm)
          newObject = thisForm.AJAR_subject
        } else {
          newObject = newThing(store)
        }
        is.push(st(subject, predicate, newObject, store))
        if (options.mintStatementsFun) {
          is = is.concat(options.mintStatementsFun(newObject))
        }
      }
      if (!opt.AJAR_uri) continue // a prompt or mint
      if (opt.selected && !(opt.AJAR_uri in actual)) {
        // new class
        is.push(st(subject, predicate, kb.sym(opt.AJAR_uri), store))
      }
      if (!opt.selected && opt.AJAR_uri in actual) {
        // old class
        removeValue(kb.sym(opt.AJAR_uri))
        // ds.push(st(subject, predicate, kb.sym(opt.AJAR_uri), store ))
      }
      if (opt.selected) select.currentURI = opt.AJAR_uri
    }
    var sel = select.subSelect // All subclasses must also go
    while (sel && sel.currentURI) {
      removeValue(kb.sym(sel.currentURI))
      sel = sel.subSelect
    }
    sel = select.superSelect // All superclasses are redundant
    while (sel && sel.currentURI) {
      removeValue(kb.sym(sel.currentURI))
      sel = sel.superSelect
    }
    function doneNew (ok, body) {
      callbackFunction(ok, body)
    }
    info('selectForOptions: stote = ' + store)
    uiStore.updater.update(ds, is, function (uri, ok, body) {
      actual = getActual() // refresh
      // kb.each(subject, predicate, null, store).map(function(x){actual[x.uri] = true})
      if (ok) {
        select.disabled = false // data written back
        if (newObject) {
          var fn = fieldFunction(dom, options.subForm)
          fn(
            dom,
            select.parentNode,
            {},
            newObject,
            options.subForm,
            store,
            doneNew
          )
        }
      }
      if (callbackFunction) callbackFunction(ok, body)
    })
  }

  var select = dom.createElement('select')
  select.setAttribute('style', 'margin: 0.6em 1.5em;')
  if (options.multiple) select.setAttribute('multiple', 'true')
  select.currentURI = null

  select.refresh = function () {
    actual = getActual() // refresh
    for (var i = 0; i < select.children.length; i++) {
      var option = select.children[i]
      if (option.AJAR_uri) {
        option.selected = option.AJAR_uri in actual
      }
    }
    select.disabled = false // unlocked any conflict we had got into
  }

  for (var uri in uris) {
    var c = kb.sym(uri)
    var option = dom.createElement('option')
    if (options.disambiguate) {
      option.appendChild(dom.createTextNode(labelWithOntology(c, true))) // Init. cap
    } else {
      option.appendChild(dom.createTextNode(label(c, true))) // Init.
    }
    var backgroundColor = kb.any(
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
    var mint = dom.createElement('option')
    mint.appendChild(dom.createTextNode(options.mint))
    mint.AJAR_mint = true // Flag it
    select.insertBefore(mint, select.firstChild)
  }
  if (select.currentURI == null && !options.multiple) {
    var prompt = dom.createElement('option')
    prompt.appendChild(dom.createTextNode(options.nullLabel))
    select.insertBefore(prompt, select.firstChild)
    prompt.selected = true
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
  store,
  callbackFunction
) {
  var du = kb.any(category, ns.owl('disjointUnionOf'))
  var subs
  var multiple = false
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
    { multiple: multiple, nullPrompt: '--classify--' },
    store,
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
  store,
  callbackFunction
) {
  var container = dom.createElement('span') // Container
  var child: any = null
  var select
  var onChange = function (ok, body) {
    if (ok) update()
    callbackFunction(ok, body)
  }
  select = makeSelectForCategory(
    dom,
    kb,
    subject,
    category,
    store,
    onChange
  )
  container.appendChild(select)
  var update = function () {
    // info("Selected is now: "+select.currentURI)
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
        store,
        callbackFunction
      )
      select.subSelect = child.firstChild
      select.subSelect.superSelect = select
      container.appendChild(child)
    }
  }
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
export function buildCheckboxForm (dom, kb, lab, del, ins, form, store, tristate) {
  // 20190115
  var box = dom.createElement('div')
  var tx = dom.createTextNode(lab)
  var editable = uiStore.updater.editable(store.uri)
  tx.style =
    'colour: black; font-size: 100%; padding-left: 0.5 em; padding-right: 0.5 em;'
  box.appendChild(tx)
  var input
  input = dom.createElement('button')

  input.setAttribute(
    'style',
    'font-size: 150%; height: 1.2em; width: 1.2em; background-color: #eef; margin: 0.1em'
  )
  box.appendChild(input)

  function fix (x) {
    if (!x) return [] // no statements
    if (x.object) {
      if (!x.why) {
        x.why = store // be back-compaitible  with old code
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
    var state: any = holdsAll(ins)
    var displayState = state
    if (del.length) {
      var negation = holdsAll(del)
      if (state && negation) {
        box.appendChild(
          errorMessageBlock(
            dom,
            'Inconsistent data in store!\n' + ins + ' and\n' + del
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
      false: cancelCharacter,
      null: dashCharacter
    }[displayState]
  }

  refresh()
  if (!editable) return box

  var boxHandler = function (_e) {
    tx.style = 'color: #bbb;' // grey -- not saved yet
    var toDelete = input.state === true ? ins : input.state === false ? del : []
    input.newState =
      input.state === null
        ? true
        : input.state === true
          ? false
          : tristate
            ? null
            : true

    var toInsert =
      input.newState === true ? ins : input.newState === false ? del : []
    console.log(`  Deleting  ${toDelete}`)
    console.log(`  Inserting ${toInsert}`)
    uiStore.updater.update(toDelete, toInsert, function (
      uri,
      success,
      errorBody
    ) {
      if (!success) {
        if (toDelete.why) {
          var hmmm = kb.holds(
            toDelete.subject,
            toDelete.predicate,
            toDelete.object,
            toDelete.why
          )
          if (hmmm) {
            console.log(' @@@@@ weird if 409 - does hold statement')
          }
        }
        tx.style = 'color: #black; background-color: #fee;'
        box.appendChild(
          errorMessageBlock(
            dom,
            `Checkbox: Error updating store from ${input.state} to ${
              input.newState
            }:\n\n${errorBody}`
          )
        )
      } else {
        tx.style = 'color: #black;'
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

export function fieldLabel (dom, property, form) {
  var lab = uiStore.any(form, ns.ui('label'))
  if (!lab) lab = label(property, true) // Init capital
  if (property === undefined) {
    return dom.createTextNode('@@Internal error: undefined property')
  }
  var anchor = dom.createElement('a')
  if (property.uri) anchor.setAttribute('href', property.uri)
  anchor.setAttribute('style', 'color: #3B5998; text-decoration: none;') // Not too blue and no underline
  anchor.textContent = lab
  return anchor
}

export function fieldStore (subject, predicate, def) {
  var sts = uiStore.statementsMatching(subject, predicate)
  if (sts.length === 0) return def // can used default as no data yet
  if (
    sts.length > 0 &&
    sts[0].why.uri &&
    uiStore.updater.editable(sts[0].why.uri, uiStore)
  ) {
    return uiStore.sym(sts[0].why.uri)
  }
  return def
}

/** Mint local ID using timestamp
 * @param {NamedNode} doc - the document in which the ID is to be generated
 */
export function newThing (doc) {
  var now = new Date()
  return sym(doc.uri + '#' + 'id' + ('' + now.getTime()))
}
