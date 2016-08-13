/**
* General purpose utility functions used in the panes
* oshani@csail.mit.edu
*
* Includes form-oriented widgets  timbl@w3.org
*
* sign-in sign-up widgets are in signin.js
*
*  Note... For pointers to posssible text-editing code, see
*  http://stackoverflow.com/questions/6756407/what-contenteditable-editors
*/

// var aclModule = require('./acl.js')

var widgetModule = module.exports = {}

var UI = {
  icons: require('./iconBase.js'),
  log: require('./log'),
  ns: require('./ns'),
  store: require('./store'),
  utils: require('./utils'),
  widgets: widgetModule
}
//var UI.ns = require('./ns.js')
// var utilsModule = require('./utils')
// var aclControlModule = require('./acl-control')

// paneUtils = {}
widgetModule.field = {} // Form field functions by URI of field type.

widgetModule.clearElement = function (ele) {
  while (ele.firstChild) {
    ele.removeChild(ele.firstChild)
  }
  return ele
}

// To figure out the log URI from the full URI used to invoke the reasoner
widgetModule.extractLogURI = function (fullURI) {
  var logPos = fullURI.search(/logFile=/)
  var rulPos = fullURI.search(/&rulesFile=/)
  return fullURI.substring(logPos + 8, rulPos)
}

// @@@ This needs to be changed to local timee
widgetModule.shortDate = function (str) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  if (!str) return '???'
  var month = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]
  try {
    var now = new Date()
    var nowZ = $rdf.term(now).value
    // var n = now.getTimezoneOffset() // Minutes
    if (str.slice(0, 10) === nowZ.slice(0, 10)) return str.slice(11, 16)
    if (str.slice(0, 4) === nowZ.slice(0, 4)) {
      return (month[parseInt(str.slice(5, 7), 10) - 1] + ' ' + parseInt(str.slice(8, 10), 10))
    }
    return str.slice(0, 10)
  } catch (e) {
    return 'shortdate:' + e
  }
}

widgetModule.formatDateTime = function (date, format) {
  return format.split('{').map(function (s) {
    var k = s.split('}')[0]
    var width = {'Milliseconds': 3, 'FullYear': 4}
    var d = {'Month': 1}
    return s ? ('000' + (date['get' + k]() + (d[k] || 0))).slice(-(width[k] || 2)) + s.split('}')[1] : ''
  }).join('')
}

widgetModule.timestamp = function () {
  return widgetModule.formatDateTime(new Date(), '{FullYear}-{Month}-{Date}T{Hours}:{Minutes}:{Seconds}.{Milliseconds}')
}
widgetModule.shortTime = function () {
  return widgetModule.formatDateTime(new Date(), '{Hours}:{Minutes}:{Seconds}.{Milliseconds}')
}

widgetModule.newThing = function (store) {
  var now = new Date()
  // http://www.w3schools.com/jsref/jsref_obj_date.asp
  return $rdf.sym(store.uri + '#' + 'id' + ('' + now.getTime()))
}

// ///////////////////// Handy UX widgets

// Sets the best name we have and looks up a better one
//
widgetModule.setName = function (element, x) {
  var kb = UI.store
  var ns = UI.ns
  var findName = function (x) {
    var name = kb.any(x, ns.vcard('fn')) || kb.any(x, ns.foaf('name')) ||
      kb.any(x, ns.vcard('organization-name'))
    return name ? name.value : null
  }
  var name = x.sameTerm(ns.foaf('Agent')) ? 'Everyone' : findName(x)
  element.textContent = name || UI.utils.label(x)
  if (!name && x.uri) { // Note this is only a fetch, not a lookUP of all sameAs etc
    kb.fetcher.nowOrWhenFetched(x, undefined, function (ok) {
      element.textContent = (ok ? '' : '? ') + (findName(x) || UI.utils.label(x))
    })
  }
}

// Set of suitable images
widgetModule.imagesOf = function (x, kb) {
  var ns = UI.ns
  return (kb.each(x, ns.sioc('avatar'))
    .concat(kb.each(x, ns.foaf('img')))
    .concat(kb.each(x, ns.vcard('logo')))
    .concat(kb.each(x, ns.vcard('photo')))
    .concat(kb.each(x, ns.foaf('depiction'))))
}
// Best logo or avater or photo etc to represent someone or some group etc
//

widgetModule.setImage = function (element, x) {
  var kb = UI.store
  var ns = UI.ns
  var iconDir = UI.icons.iconBase
  //var fallback = iconDir + 'noun_15059.svg' // Person
  var fallback = iconDir + 'noun_10636.svg' // Circle
  var findImage = function (x) {
    if (x.sameTerm(ns.foaf('Agent')) || x.sameTerm(ns.rdf('Resource'))) {
      return iconDir + 'noun_98053.svg' // Globe
    }
    var image = kb.any(x, ns.sioc('avatar')) ||
      kb.any(x, ns.foaf('img')) ||
      kb.any(x, ns.vcard('logo')) ||
      kb.any(x, ns.vcard('hasPhoto')) ||
      kb.any(x, ns.vcard('photo')) ||
      kb.any(x, ns.foaf('depiction'))
    return image ? image.uri : null
  }

  var findImageByClass = function (x) {
    var types = kb.findTypeURIs(x)
    if (ns.solid('AppProvider').uri in types) {
      return iconDir + 'noun_15177.svg' // App
    }
    if (x.uri && x.uri.split('/').length === 4 && !(x.uri.split('/')[1]) && !(x.uri.split('/')[3])) {
      return iconDir + 'noun_15177.svg' // App -- this is an origin
    }
    if (ns.solid('AppProviderClass').uri in types) {
      return iconDir + 'noun_144.svg' // App Whitelist @@@ ICON (three apps ?)
    }
    if (ns.vcard('Group').uri in types || ns.rdfs('Class').uri in types) {
      return iconDir + 'noun_339237.svg' // Group of people
    }
    if (ns.vcard('Individual').uri in types ||
        ns.foaf('Person').uri in types) {
      return iconDir + 'noun_339237.svg' // Group of people
    }
    if (ns.vcard('AddressBook').uri in types) {
      return iconDir + 'noun_15695.svg'
    }
    if (ns.meeting('Meeting').uri in types) {
      return iconDir + 'noun_66617.svg'
    }
    return fallback
  }

  var uri = findImage(x)
  element.setAttribute('src', uri || findImageByClass(x))
  if (!uri && x.uri) {
    kb.fetcher.nowOrWhenFetched(x, undefined, function (ok) {
      element.setAttribute('src', findImage(x) || findImageByClass(x))
    })
  }
}

// Delete button with a check you really mean it
//
//   @@ Supress check if command key held down?
//
widgetModule.deleteButtonWithCheck = function (dom, container, noun, deleteFunction) {
  var delButton = dom.createElement('button')
  container.appendChild(delButton)
  delButton.textContent = '-'

  container.setAttribute('class', 'hoverControl') // See tabbedtab.css (sigh global CSS)
  delButton.setAttribute('class', 'hoverControlHide')
  delButton.setAttribute('style', 'color: red; margin-right: 0.3em; foat:right; text-align:right')
  delButton.addEventListener('click', function (e) {
    container.removeChild(delButton) // Ask -- are you sure?
    var cancelButton = dom.createElement('button')
    cancelButton.textContent = 'cancel'
    container.appendChild(cancelButton).addEventListener('click', function (e) {
      container.removeChild(sureButton)
      container.removeChild(cancelButton)
      container.appendChild(delButton)
    }, false)
    var sureButton = dom.createElement('button')
    sureButton.textContent = 'Delete ' + noun
    container.appendChild(sureButton).addEventListener('click', function (e) {
      container.removeChild(sureButton)
      container.removeChild(cancelButton)
      deleteFunction()
    }, false)
  }, false)
  return delButton
}

// A TR to repreent a draggable person, etc in a list
//
//
widgetModule.personTR = function (dom, pred, obj, options) {
  var tr = dom.createElement('tr')
  options = options || {}
  tr.predObj = [pred.uri, obj.uri]
  var td1 = tr.appendChild(dom.createElement('td'))
  var td2 = tr.appendChild(dom.createElement('td'))
  var td3 = tr.appendChild(dom.createElement('td'))

  var agent = obj
  var image = td1.appendChild(dom.createElement('img'))
  td1.setAttribute('style', 'width:4em; padding:0.5em; height: 4em;')
  td2.setAttribute('style', 'text-align:left;')
  td3.setAttribute('style', 'width:2em; padding:0.5em; height: 4em;')
  image.setAttribute('style', 'width: 3em; height: 3em; margin: 0.1em; border-radius: 1em;')
  widgetModule.setImage(image, agent)

  widgetModule.setName(td2, agent)
  if (options.deleteFunction) {
    widgetModule.deleteButtonWithCheck(dom, td3, 'person', options.deleteFunction)
  }
  if (options.link !== false) {
    var anchor = td3.appendChild(dom.createElement('a'))
    anchor.setAttribute('href', obj.uri)
    anchor.classList.add('HoverControlHide')
    var linkImage = anchor.appendChild(dom.createElement('img'))
    linkImage.setAttribute('src', UI.icons.originalIconBase + 'go-to-this.png')
    td3.appendChild(dom.createElement('br'))
  }
  if (options.draggable !== false) { // default is on
    tr.setAttribute('draggable', 'true') // allow a person to be dragged to diff role

    tr.addEventListener('dragstart', function (e) {
      tr.style.fontWeight = 'bold'
      // e.dataTransfer.dropEffect = 'move'
      // e.dataTransfer.effectAllowed = 'all'  // same as default
      e.dataTransfer.setData('text/uri-list', obj.uri)
      e.dataTransfer.setData('text/plain', obj.uri)
      e.dataTransfer.setData('text/html', tr.outerHTML)
      console.log('Dragstart: ' + tr + ' -> ' + obj + 'de: ' + e.dataTransfer.dropEffect)
    }, false)

    tr.addEventListener('drag', function (e) {
      e.preventDefault()
      e.stopPropagation()
      // e.dataTransfer.dropEffect = 'copy'
      // e.dataTransfer.setData("text/uri-list", obj)
      console.log('Drag: dropEffect: ' + e.dataTransfer.dropEffect)
    }, false)

    // icons/go-to-this.png

    tr.addEventListener('dragend', function (e) {
      tr.style.fontWeight = 'normal'
      console.log('Dragend dropeffect: ' + e.dataTransfer.dropEffect)
      console.log('Dragend: ' + tr + ' -> ' + obj)
    }, false)
  }
  return tr
}

// ///////////////////////////////////////////////////////////////////////

/*                                  Form Field implementations
**
*/
/*          Group of different fields
**
*/
widgetModule.field[UI.ns.ui('Form').uri] =
  widgetModule.field[UI.ns.ui('Group').uri] = function (
    dom, container, already, subject, form, store, callback) {
    var kb = UI.store
    var box = dom.createElement('div')
    box.setAttribute('style', 'padding-left: 2em; border: 0.05em solid brown;') // Indent a group
    var ui = UI.ns.ui
    container.appendChild(box)

    // Prevent loops
    var key = subject.toNT() + '|' + form.toNT()
    if (already[key]) { // been there done that
      box.appendChild(dom.createTextNode('Group: see above ' + key))
      var plist = [$rdf.st(subject, UI.ns.owl('sameAs'), subject)] // @@ need prev subject
      UI.outline.appendPropertyTRs(box, plist)
      return box
    }
    // box.appendChild(dom.createTextNode("Group: first time, key: "+key))
    var already2 = {}
    for (var x in already) already2[x] = 1
    already2[key] = 1

    var parts = kb.each(form, ui('part'))
    if (!parts) {
      box.appendChild(widgetModule.errorMessageBlock(dom,
        'No parts to form! '))
      return dom
    }
    var p2 = widgetModule.sortBySequence(parts)
    var eles = []
    var original = []
    for (var i = 0; i < p2.length; i++) {
      var field = p2[i]
      var t = widgetModule.bottomURI(field) // Field type
      if (t === ui('Options').uri) {
        var dep = kb.any(field, ui('dependingOn'))
        if (dep && kb.any(subject, dep)) original[i] = kb.any(subject, dep).toNT()
      }

      var fn = widgetModule.fieldFunction(dom, field)

      var itemChanged = function (ok, body) {
        if (ok) {
          for (var j = 0; j < p2.length; j++) { // This is really messy.
            var field = (p2[j])
            var t = widgetModule.bottomURI(field) // Field type
            if (t === ui('Options').uri) {
              var dep = kb.any(field, ui('dependingOn'))
              //                       if (dep && kb.any(subject, dep) && (kb.any(subject, dep).toNT() != original[j])) { // changed
              if (1) { // assume changed
                var newOne = fn(dom, box, already, subject, field, store, callback)
                box.removeChild(newOne)
                box.insertBefore(newOne, eles[j])
                box.removeChild(eles[j])
                original[j] = kb.any(subject, dep).toNT()
                eles[j] = newOne
              }
            }
          }
        }
        callback(ok, body)
      }
      eles.push(fn(dom, box, already2, subject, field, store, itemChanged))
    }
    return box
}

/*          Options: Select one or more cases
**
*/
widgetModule.field[UI.ns.ui('Options').uri] = function (
  dom, container, already, subject, form, store, callback) {
  var kb = UI.store
  var box = dom.createElement('div')
  // box.setAttribute('style', 'padding-left: 2em; border: 0.05em dotted purple;')  // Indent Options
  var ui = UI.ns.ui
  container.appendChild(box)

  var dependingOn = kb.any(form, ui('dependingOn'))
  if (!dependingOn) {
    dependingOn = UI.ns.rdf('type')
  } // @@ default to type (do we want defaults?)
  var cases = kb.each(form, ui('case'))
  if (!cases) {
    box.appendChild(widgetModule.errorMessageBlock(dom,
      'No cases to Options form. '))
  }
  var values
  if (dependingOn.sameTerm(UI.ns.rdf('type'))) {
    values = kb.findTypeURIs(subject)
  } else {
    var value = kb.any(subject, dependingOn)
    if (value === undefined) {
      box.appendChild(widgetModule.errorMessageBlock(dom,
        "Can't select subform as no value of: " + dependingOn))
    } else {
      values = {}
      values[value.uri] = true
    }
  }
  // @@ Add box.refresh() to sync fields with values
  for (var i = 0; i < cases.length; i++) {
    var c = cases[i]
    var tests = kb.each(c, ui('for')) // There can be multiple 'for'
    for (var j = 0; j < tests.length; j++) {
      if (values[tests[j].uri]) {
        var field = kb.the(c, ui('use'))
        if (!field) {
          box.appendChild(widgetModule.errorMessageBlock(dom,
            "No 'use' part for case in form " + form))
          return box
        } else {
          widgetModule.appendForm(dom, box, already, subject, field, store, callback)
        }
        break
      }
    }
  }
  return box
}

/*          Multiple similar fields (unordered)
**
*/
widgetModule.field[UI.ns.ui('Multiple').uri] = function (
  dom, container, already, subject, form, store, callback) {
  var kb = UI.store
  kb.updater = kb.updater || new $rdf.UpdateManager(kb)
  var box = dom.createElement('table')
  // We don't indent multiple as it is a sort of a prefix o fthe next field and has contents of one.
  // box.setAttribute('style', 'padding-left: 2em; border: 0.05em solid green;')  // Indent a multiple
  var ui = UI.ns.ui
  var i
  container.appendChild(box)
  var property = kb.any(form, ui('property'))
  if (!property) {
    box.appendChild(widgetModule.errorMessageBlock(dom,
      'No property to multiple: ' + form)) // used for arcs in the data
    return box
  }
  var min = kb.any(form, ui('min')) // This is the minimum number -- default 0
  min = min ? min.value : 0
  var max = kb.any(form, ui('max')) // This is the minimum number
  max = max ? max.value : 99999999

  var element = kb.any(form, ui('part')) // This is the form to use for each one
  if (!element) {
    box.appendChild(widgetModule.errorMessageBlock(dom, 'No part to multiple: ' + form))
    return box
  }

  var count = 0
  // box.appendChild(dom.createElement('h3')).textContent = "Fields:".
  var body = box.appendChild(dom.createElement('tr'))
  var tail = box.appendChild(dom.createElement('tr'))
  var img = tail.appendChild(dom.createElement('img'))
  img.setAttribute('src', UI.icons.originalIconBase + 'tango/22-list-add.png') // blue plus
  img.setAttribute('style', 'margin: 0.2em;') // blue plus
  img.title = 'Click to add one or more ' + UI.utils.label(property)
  var prompt = tail.appendChild(dom.createElement('span'))

  var addItem = function (e, object) {
    UI.log.debug('Multiple add: ' + object)
    ++count
    if (!object) object = widgetModule.newThing(store)
    var tr = box.insertBefore(dom.createElement('tr'), tail)
    var itemDone = function (ok, body) {
      if (ok) { // @@@ Check IT hasnt alreday been written in
        if (!kb.holds(subject, property, object)) {
          var ins = [$rdf.st(subject, property, object, store)]
          kb.updater.update([], ins, linkDone)
        }
      } else {
        tr.appendChild(widgetModule.errorMessageBlock(dom, 'Multiple: item failed: ' + body))
        callback(ok, body)
      }
    }
    var linkDone = function (uri, ok, body) {
      return callback(ok, body)
    }
    var fn = widgetModule.fieldFunction(dom, element)
    // box.appendChild(dom.createTextNode('multiple object: '+object ))
    fn(dom, body, already, object, element, store, itemDone)
  }

  var values = kb.each(subject, property)
  prompt.textContent = (values.length === 0 ? 'Add one or more ' : 'Add more ') +
    UI.utils.label(property)

  values.map(function (obj) { addItem(null, obj) })

  for (i = values.length; i < min; i++) {
    addItem() // Add blanks if less than minimum
  }

  tail.addEventListener('click', addItem, true) // img.addEventListener('click', addItem, true)
  return box
}

/*          Text field
**
*/
// For possible date popups see e.g. http://www.dynamicdrive.com/dynamicindex7/jasoncalendar.htm
// or use HTML5: http://www.w3.org/TR/2011/WD-html-markup-20110113/input.date.html
//

widgetModule.fieldParams = {}

widgetModule.fieldParams[UI.ns.ui('ColorField').uri] = {
'size': 9 }
widgetModule.fieldParams[UI.ns.ui('ColorField').uri].pattern =
  /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/

widgetModule.fieldParams[UI.ns.ui('DateField').uri] = {
'size': 20, 'type': 'date', 'dt': 'date'}
widgetModule.fieldParams[UI.ns.ui('DateField').uri].pattern =
  /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/

widgetModule.fieldParams[UI.ns.ui('DateTimeField').uri] = {
'size': 20, 'type': 'date', 'dt': 'dateTime'}
widgetModule.fieldParams[UI.ns.ui('DateTimeField').uri].pattern =
  /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/

widgetModule.fieldParams[UI.ns.ui('TimeField').uri] = {
'size': 10, 'type': 'time', 'dt': 'time'}
widgetModule.fieldParams[UI.ns.ui('TimeField').uri].pattern =
  /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/

widgetModule.fieldParams[UI.ns.ui('IntegerField').uri] = {
'size': 12, 'style': 'text-align: right', 'dt': 'integer' }
widgetModule.fieldParams[UI.ns.ui('IntegerField').uri].pattern =
  /^\s*-?[0-9]+\s*$/

widgetModule.fieldParams[UI.ns.ui('DecimalField').uri] = {
'size': 12, 'style': 'text-align: right', 'dt': 'decimal' }
widgetModule.fieldParams[UI.ns.ui('DecimalField').uri].pattern =
  /^\s*-?[0-9]*(\.[0-9]*)?\s*$/

widgetModule.fieldParams[UI.ns.ui('FloatField').uri] = {
'size': 12, 'style': 'text-align: right', 'dt': 'float' }
widgetModule.fieldParams[UI.ns.ui('FloatField').uri].pattern =
  /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/

  widgetModule.fieldParams[UI.ns.ui('SingleLineTextField').uri] = { }
  widgetModule.fieldParams[UI.ns.ui('NamedNodeURIField').uri] = { namedNode: true}
widgetModule.fieldParams[UI.ns.ui('TextField').uri] = { }

widgetModule.fieldParams[UI.ns.ui('PhoneField').uri] = { 'size': 12, 'uriPrefix': 'tel:' }
widgetModule.fieldParams[UI.ns.ui('PhoneField').uri].pattern =
  /^\s*\+?[ 0-9-]+[0-9]\s*$/

widgetModule.fieldParams[UI.ns.ui('EmailField').uri] = { 'size': 20, 'uriPrefix': 'mailto:' }
widgetModule.fieldParams[UI.ns.ui('EmailField').uri].pattern =
  /^\s*.*@.*\..*\s*$/ // @@ Get the right regexp here

widgetModule.field[UI.ns.ui('PhoneField').uri] =
  widgetModule.field[UI.ns.ui('EmailField').uri] =
    widgetModule.field[UI.ns.ui('ColorField').uri] =
      widgetModule.field[UI.ns.ui('DateField').uri] =
        widgetModule.field[UI.ns.ui('DateTimeField').uri] =
          widgetModule.field[UI.ns.ui('TimeField').uri] =
            widgetModule.field[UI.ns.ui('NumericField').uri] =
              widgetModule.field[UI.ns.ui('IntegerField').uri] =
                widgetModule.field[UI.ns.ui('DecimalField').uri] =
                  widgetModule.field[UI.ns.ui('FloatField').uri] =
                    widgetModule.field[UI.ns.ui('TextField').uri] =
                      widgetModule.field[UI.ns.ui('SingleLineTextField').uri] =
                        widgetModule.field[UI.ns.ui('NamedNodeURIField').uri] = function (
                        dom, container, already, subject, form, store, callback) {
                        var ui = UI.ns.ui
                        var kb = UI.store

                        var box = dom.createElement('tr')
                        container.appendChild(box)
                        var lhs = dom.createElement('td')
                        lhs.setAttribute('class', 'formFieldName')
                        lhs.setAttribute('style', '  vertical-align: middle;')
                        box.appendChild(lhs)
                        var rhs = dom.createElement('td')
                        rhs.setAttribute('class', 'formFieldValue')
                        box.appendChild(rhs)

                        var property = kb.any(form, ui('property'))
                        if (!property) {
                          box.appendChild(dom.createTextNode('Error: No property given for text field: ' + form))
                          return box
                        }
                        lhs.appendChild(widgetModule.fieldLabel(dom, property, form))
                        var uri = widgetModule.bottomURI(form)
                        var params = widgetModule.fieldParams[uri]
                        if (params === undefined) params = {} // non-bottom field types can do this
                        var style = params.style || 'font-size: 100%; margin: 0.1em; padding: 0.1em;'
                        // box.appendChild(dom.createTextNode(' uri='+uri+', pattern='+ params.pattern))
                        var field = dom.createElement('input')
                        rhs.appendChild(field)
                        field.setAttribute('type', params.type ? params.type : 'text')

                        var size = kb.any(form, ui('size')) // Form has precedence
                        field.setAttribute('size', size ? '' + size : (params.size ? '' + params.size : '20'))
                        var maxLength = kb.any(form, ui('maxLength'))
                        field.setAttribute('maxLength', maxLength ? '' + maxLength : '4096')

                        store = store || widgetModule.fieldStore(subject, property, store)

                        var obj = kb.any(subject, property, undefined, store)
                        if (!obj) {
                          obj = kb.any(form, ui('default'))
                          if (obj) kb.add(subject, property, obj, store)
                        }
                        if (obj) {
                          field.value = obj.value || obj.uri
                        }
                        field.setAttribute('style', style)
                        field.addEventListener('keyup', function (e) {
                          if (params.pattern) {
                            field.setAttribute('style', style + (
                              field.value.match(params.pattern)
                                ? 'color: green;' : 'color: red;')) }
                        }, true)
                        field.addEventListener('change', function (e) { // i.e. lose focus with changed data
                          if (params.pattern && !field.value.match(params.pattern)) return
                          field.disabled = true // See if this stops getting two dates from fumbling e.g the chrome datepicker.
                          field.setAttribute('style', style + 'color: gray;') // pending
                          var ds = kb.statementsMatching(subject, property) // remove any multiple values
                          // var newObj = params.uriPrefix ? kb.sym(params.uriPrefix + field.value.replace(/ /g, ''))
                          //  : kb.literal(field.value, params.dt)
                          var result
                          if (params.namedNode) {
                            result = kb.sym(field.value)
                          } else {
                            result = params.parse ? params.parse(field.value) : field.value
                          }
                          var is = $rdf.st(subject, property, result , store) // @@ Explicitly put the datatype in.
                          kb.updater.update(ds, is, function (uri, ok, body) {
                            if (ok) {
                              field.disabled = false
                              field.setAttribute('style', 'color: black;')
                            } else {
                              box.appendChild(widgetModule.errorMessageBlock(dom, body))
                            }
                            callback(ok, body)
                          })
                        }, true)
                        return box
}

/*          Multiline Text field
**
*/

widgetModule.field[UI.ns.ui('MultiLineTextField').uri] = function (
  dom, container, already, subject, form, store, callback) {
  var ui = UI.ns.ui
  var kb = UI.store
  var property = kb.any(form, ui('property'))
  if (!property) {
    return widgetModule.errorMessageBlock(dom,
      'No property to text field: ' + form)
  }
  container.appendChild(widgetModule.fieldLabel(dom, property, form))
  store = widgetModule.fieldStore(subject, property, store)
  var box = widgetModule.makeDescription(dom, kb, subject, property, store, callback)
  // box.appendChild(dom.createTextNode('<-@@ subj:'+subject+', prop:'+property))
  container.appendChild(box)
  return box
}

/*          Boolean field
**
*/

widgetModule.field[UI.ns.ui('BooleanField').uri] = function (
  dom, container, already, subject, form, store, callback) {
  var ui = UI.ns.ui
  var kb = UI.store
  var property = kb.any(form, ui('property'))
  if (!property) {
    return container.appendChild(widgetModule.errorMessageBlock(dom,
      'No property to boolean field: ' + form))
  }
  var lab = kb.any(form, ui('label'))
  if (!lab) lab = UI.utils.label(property, true) // Init capital
  store = widgetModule.fieldStore(subject, property, store)
  var state = kb.any(subject, property)
  if (state === undefined) { state = false } // @@ sure we want that -- or three-state?
  // UI.log.debug('store is '+store)
  var ins = $rdf.st(subject, property, true, store)
  var del = $rdf.st(subject, property, false, store)
  var box = widgetModule.buildCheckboxForm(dom, kb, lab, del, ins, form, store)
  container.appendChild(box)
  return box
}

/*          Classifier field
**
**  Nested categories
**
** @@ To do: If a classification changes, then change any dependent Options fields.
*/

widgetModule.field[UI.ns.ui('Classifier').uri] = function (
  dom, container, already, subject, form, store, callback) {
  var kb = UI.store
  var ui = UI.ns.ui
  var category = kb.any(form, ui('category'))
  if (!category) {
    return widgetModule.errorMessageBlock(dom, 'No category for classifier: ' + form)
  }
  UI.log.debug('Classifier: store=' + store)
  var checkOptions = function (ok, body) {
    if (!ok) return callback(ok, body)

    /*
    var parent = kb.any(undefined, ui('part'), form)
    if (!parent) return callback(ok, body)
    var kids = kb.each(parent, ui('part')); // @@@@@@@@@ Garbage
    kids = kids.filter(function(k){return kb.any(k, ns.rdf('type'), ui('Options'))})
    if (kids.length) UI.log.debug('Yes, found related options: '+kids[0])
    */
    return callback(ok, body)
  }
  var box = widgetModule.makeSelectForNestedCategory(dom, kb, subject, category, store, checkOptions)
  container.appendChild(box)
  return box
}

/*          Choice field
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

widgetModule.field[UI.ns.ui('Choice').uri] = function (
  dom, container, already, subject, form, store, callback) {
  var ui = UI.ns.ui
  var ns = UI.ns
  var kb = UI.store
  var p
  var box = dom.createElement('tr')
  container.appendChild(box)
  var lhs = dom.createElement('td')
  box.appendChild(lhs)
  var rhs = dom.createElement('td')
  box.appendChild(rhs)
  var property = kb.any(form, ui('property'))
  if (!property) {
    return widgetModule.errorMessageBlock(dom, 'No property for Choice: ' + form)
  }
  lhs.appendChild(widgetModule.fieldLabel(dom, property, form))
  var from = kb.any(form, ui('from'))
  if (!from) {
    return widgetModule.errorMessageBlock(dom, "No 'from' for Choice: " + form)
  }
  var subForm = kb.any(form, ui('use')) // Optional
  var possible = []
  var opts = { 'multiple': multiple, 'nullLabel': np, 'disambiguate': false }
  possible = kb.each(undefined, ns.rdf('type'), from)
  for (var x in kb.findMembersNT(from)) {
    possible.push(kb.fromNT(x))
  // box.appendChild(dom.createTextNode("RDFS: adding "+x))
  } // Use rdfs
  // UI.log.debug("%%% Choice field: possible.length 1 = "+possible.length)
  if (from.sameTerm(ns.rdfs('Class'))) {
    for (p in widgetModule.allClassURIs()) possible.push(kb.sym(p))
  // UI.log.debug("%%% Choice field: possible.length 2 = "+possible.length)
  } else if (from.sameTerm(ns.rdf('Property'))) {
    possibleProperties = widgetModule.propertyTriage()
    for (p in possibleProperties.op) possible.push(kb.fromNT(p))
    for (p in possibleProperties.dp) possible.push(kb.fromNT(p))
    opts.disambiguate = true // This is a big class, and the labels won't be enough.
  } else if (from.sameTerm(ns.owl('ObjectProperty'))) {
    possibleProperties = widgetModule.propertyTriage()
    for (p in possibleProperties.op) possible.push(kb.fromNT(p))
    opts.disambiguate = true
  } else if (from.sameTerm(ns.owl('DatatypeProperty'))) {
    possibleProperties =  widgetModule.propertyTriage()
    for (p in possibleProperties.dp) possible.push(kb.fromNT(p))
    opts.disambiguate = true
  }
  var object = kb.any(subject, property)
  function addSubForm (ok, body) {
    object = kb.any(subject, property)
    widgetModule.fieldFunction(dom, subForm)(dom, rhs, already,
      object, subForm, store, callback)
  }
  var multiple = false
  // box.appendChild(dom.createTextNode('Choice: subForm='+subForm))
  var possible2 = widgetModule.sortByLabel(possible)
  var np = '--' + UI.utils.label(property) + '-?'
  if (kb.any(form, ui('canMintNew'))) {
    opts['mint'] = '* New *' // @@ could be better
    opts['subForm'] = subForm
  }
  var selector = widgetModule.makeSelectForOptions(
    dom, kb, subject, property,
    possible2, opts, store, callback)
  rhs.appendChild(selector)
  if (object && subForm) addSubForm(true, '')
  return box
}

//          Documentation - non-interactive fields
//

widgetModule.fieldParams[UI.ns.ui('Comment').uri] = {
  'element': 'p',
'style': 'padding: 0.1em 1.5em; color: brown; white-space: pre-wrap;'}
widgetModule.fieldParams[UI.ns.ui('Heading').uri] = {
'element': 'h3', 'style': 'font-size: 110%; color: brown;' }

widgetModule.field[UI.ns.ui('Comment').uri] =
  widgetModule.field[UI.ns.ui('Heading').uri] = function (
    dom, container, already, subject, form, store, callback) {
    var ui = UI.ns.ui
    var kb = UI.store
    var contents = kb.any(form, ui('contents'))
    if (!contents) contents = 'Error: No contents in comment field.'

    var uri = widgetModule.bottomURI(form)
    var params = widgetModule.fieldParams[uri]
    if (params === undefined) { params = {} }; // non-bottom field types can do this

    var box = dom.createElement('div')
    container.appendChild(box)
    var p = box.appendChild(dom.createElement(params['element']))
    p.textContent = contents

    var style = kb.any(form, ui('style'))
    if (style === undefined) { style = params.style ? params.style : '' }
    if (style) p.setAttribute('style', style)

    return box
}

// /////////////////////////////////////////////////////////////////////////////

// Event Handler for links within solid apps.
//
// Note that native links have consraints in Firefox, they
// don't work with local files for instance (2011)
//
widgetModule.openHrefInOutlineMode = function (e) {
  e.preventDefault()
  e.stopPropagation()
  var target = UI.utils.getTarget(e)
  var uri = target.getAttribute('href')
  if (!uri) console.log('No href found \n')
  // subject term, expand, pane, solo, referrer
  // dump('click on link to:' +uri+'\n')
  if (UI.outline){
    UI.outline.GotoSubject(UI.store.sym(uri), true, undefined, true, undefined)
  } else if (window && window.UI && window.UI.outline ){
    window.UI.outline.GotoSubject(UI.store.sym(uri), true, undefined, true, undefined)
  } else {
    console.log("ERROR: Can't access outline manager in this config")
  }
  //UI.outline.GotoSubject(UI.store.sym(uri), true, undefined, true, undefined)
}

// We make a URI in the annotation store out of the URI of the thing to be annotated.
//
// @@ Todo: make it a personal preference.
//
widgetModule.defaultAnnotationStore = function (subject) {
  if (subject.uri === undefined) return undefined
  var s = subject.uri
  if (s.slice(0, 7) !== 'http://') return undefined
  s = s.slice(7) // Remove
  var hash = s.indexOf('#')
  if (hash >= 0) s = s.slice(0, hash) // Strip trailing
  else {
    var slash = s.lastIndexOf('/')
    if (slash < 0) return undefined
    s = s.slice(0, slash)
  }
  return UI.store.sym('http://tabulator.org/wiki/annnotation/' + s)
}

widgetModule.fieldStore = function (subject, predicate, def) {
  var sts = UI.store.statementsMatching(subject, predicate)
  if (sts.length === 0) return def // can used default as no data yet
  if (sts.length > 0 && sts[0].why.uri && UI.store.updater.editable(sts[0].why.uri, UI.store)) {
    return UI.store.sym(sts[0].why.uri)
  }
  return null // Can't edit
}

widgetModule.allClassURIs = function () {
  var set = {}
  UI.store.statementsMatching(undefined, UI.ns.rdf('type'), undefined)
    .map(function (st) { if (st.object.uri) set[st.object.uri] = true })
  UI.store.statementsMatching(undefined, UI.ns.rdfs('subClassOf'), undefined)
    .map(function (st) {
      if (st.object.uri) set[st.object.uri] = true
      if (st.subject.uri) set[st.subject.uri] = true
    })
  UI.store.each(undefined, UI.ns.rdf('type'), UI.ns.rdfs('Class'))
    .map(function (c) { if (c.uri) set[c.uri] = true })
  return set
}

//  Figuring which propertites could by be used
//
widgetModule.propertyTriage = function () {
  var possibleProperties = {}
  // if (possibleProperties === undefined) possibleProperties = {}
  var kb = UI.store
  var dp = {}
  var op = {}
  var no = 0
  var nd = 0
  var nu = 0
  var pi = kb.predicateIndex // One entry for each pred
  for (var p in pi) {
    var object = pi[p][0].object
    if (object.termType === 'literal') {
      dp[p] = true
      nd++
    } else {
      op[p] = true
      no++
    }
  } // If nothing discovered, then could be either:
  var ps = kb.each(undefined, UI.ns.rdf('type'), UI.ns.rdf('Property'))
  for (var i = 0; i < ps.length; i++) {
    p = ps[i].toNT()
    UI.log.debug('propertyTriage: unknown: ' + p)
    if (!op[p] && !dp[p]) { dp[p] = true; op[p] = true; nu++ }
  }
  possibleProperties.op = op
  possibleProperties.dp = dp
  UI.log.info('propertyTriage: ' + no + ' non-lit, ' + nd + ' literal. ' + nu + ' unknown.')
  return possibleProperties
}

widgetModule.fieldLabel = function (dom, property, form) {
  var lab = UI.store.any(form, UI.ns.ui('label'))
  if (!lab) lab = UI.utils.label(property, true) // Init capital
  if (property === undefined) { return dom.createTextNode('@@Internal error: undefined property') }
  var anchor = dom.createElement('a')
  if (property.uri) anchor.setAttribute('href', property.uri)
  anchor.setAttribute('style', 'color: #3B5998; text-decoration: none;') // Not too blue and no underline
  anchor.textContent = lab
  return anchor
}

/*                      General purpose widgets
**
*/

widgetModule.errorMessageBlock = function (dom, msg, backgroundColor) {
  var div = dom.createElement('div')
  div.setAttribute('style', 'padding: 0.5em; border: 0.5px solid black; background-color: ' +
    (backgroundColor || '#fee') + '; color:black;')
  div.textContent = msg
  return div
}

widgetModule.bottomURI = function (x) {
  var kb = UI.store
  var ft = kb.findTypeURIs(x)
  var bot = kb.bottomTypeURIs(ft) // most specific
  var bots = []
  for (var b in bot) bots.push(b)
  // if (bots.length > 1) throw "Didn't expect "+x+" to have multiple bottom types: "+bots
  return bots[0]
}

widgetModule.fieldFunction = function (dom, field) {
  var uri = widgetModule.bottomURI(field)
  var fun = widgetModule.field[uri]
  UI.log.debug('paneUtils: Going to implement field ' + field + ' of type ' + uri)
  if (!fun) {
    return function () {
      return widgetModule.errorMessageBlock(dom, 'No handler for field ' + field + ' of type ' + uri)
    }
  }
  return fun
}

// A button for editing a form (in place, at the moment)
//
//  When editing forms, make it yellow, when editing thr form form, pink
// Help people understand how many levels down they are.
//
widgetModule.editFormButton = function (dom, container, form, store, callback) {
  var b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.innerHTML = 'Edit ' + UI.utils.label(UI.ns.ui('Form'))
  b.addEventListener('click', function (e) {
    var ff = widgetModule.appendForm(dom, container,
      {}, form, UI.ns.ui('FormForm'), store, callback)
    ff.setAttribute('style', UI.ns.ui('FormForm').sameTerm(form)
      ? 'background-color: #fee;' : 'background-color: #ffffe7;')
    container.removeChild(b)
  }, true)
  return b
}

// A button for jumping
//
widgetModule.linkButton = function (dom, object) {
  var b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.textContent = 'Goto ' + UI.utils.label(object)
  b.addEventListener('click', function (e) {
    // b.parentNode.removeChild(b)
    UI.outline.GotoSubject(object, true, undefined, true, undefined)
  }, true)
  return b
}

widgetModule.removeButton = function (dom, element) {
  var b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.textContent = '✕' // MULTIPLICATION X
  b.addEventListener('click', function (e) {
    element.parentNode.removeChild(element)
  }, true)
  return b
}

widgetModule.appendForm = function (dom, container, already, subject, form, store, itemDone) {
  return widgetModule.fieldFunction(dom, form)(
    dom, container, already, subject, form, store, itemDone)
}

//          Find list of properties for class
//
// Three possible sources: Those mentioned in schemas, which exludes many
// those which occur in the data we already have, and those predicates we
// have come across anywahere and which are not explicitly excluded from
// being used with this class.
//

widgetModule.propertiesForClass = function (kb, c) {
  var ns = UI.ns
  var explicit = kb.each(undefined, ns.rdf('range'), c)
  ;[ ns.rdfs('comment'), ns.dc('title'), // Generic things
    ns.foaf('name'), ns.foaf('homepage')]
    .map(function (x) { explicit.push(x) })
  var members = kb.each(undefined, ns.rdf('type'), c)
  if (members.length > 60) members = members.slice(0, 60) // Array supports slice?
  var used = {}
  for (var i = 0; i < (members.length > 60 ? 60 : members.length); i++) {
    kb.statementsMatching(members[i], undefined, undefined)
      .map(function (st) { used[st.predicate.uri] = true })
  }
  explicit.map(function (p) { used[p.uri] = true })
  var result = []
  for (var uri in used) {
    result.push(kb.sym(uri))
  }
  return result
}

// @param cla - the URI of the class
// @proap
widgetModule.findClosest = function findClosest (kb, cla, prop) {
  var agenda = [kb.sym(cla)] // ordered - this is breadth first search
  while (agenda.length > 0) {
    var c = agenda.shift() // first
    // if (c.uri && (c.uri == ns.owl('Thing').uri || c.uri == ns.rdf('Resource').uri )) continue
    var lists = kb.each(c, prop)
    UI.log.debug('Lists for ' + c + ', ' + prop + ': ' + lists.length)
    if (lists.length !== 0) return lists
    var supers = kb.each(c, UI.ns.rdfs('subClassOf'))
    for (var i = 0; i < supers.length; i++) {
      agenda.push(supers[i])
      UI.log.debug('findClosest: add super: ' + supers[i])
    }
  }
  return []
}

// Which forms apply to a given existing subject?

widgetModule.formsFor = function (subject) {
  var ns = UI.ns
  var kb = UI.store

  UI.log.debug('formsFor: subject=' + subject)
  var t = kb.findTypeURIs(subject)
  var t1
  for (t1 in t) { UI.log.debug('   type: ' + t1) }
  var bottom = kb.bottomTypeURIs(t) // most specific
  var forms = []
  for (var b in bottom) {
    // Find the most specific
    UI.log.debug('formsFor: trying bottom type =' + b)
    forms = forms.concat(widgetModule.findClosest(kb, b, ns.ui('creationForm')))
    forms = forms.concat(widgetModule.findClosest(kb, b, ns.ui('annotationForm')))
  }
  UI.log.debug('formsFor: subject=' + subject + ', forms=')
  return forms
}

widgetModule.sortBySequence = function (list) {
  var p2 = list.map(function (p) {
    var k = UI.store.any(p, UI.ns.ui('sequence'))
    return [k || 9999, p]
  })
  p2.sort(function (a, b) { return a[0] - b[0]})
  return p2.map(function (pair) { return pair[1]})
}

widgetModule.sortByLabel = function (list) {
  var p2 = list.map(function (p) { return [UI.utils.label(p).toLowerCase(), p] })
  p2.sort()
  return p2.map(function (pair) { return pair[1]})
}

// Button to add a new whatever using a form
//
// @param form - optional form , else will look for one
// @param store - optional store else will prompt for one (unimplemented)

widgetModule.newButton = function (dom, kb, subject, predicate, theClass, form, store, callback) {
  var b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.innerHTML = 'New ' + UI.utils.label(theClass)
  b.addEventListener('click', function (e) {
    b.parentNode.appendChild(widgetModule.promptForNew(
      dom, kb, subject, predicate, theClass, form, store, callback))
  }, false)
  return b
}

//      Prompt for new object of a given class
//
//
// @param dom - the document DOM for the user interface
// @param kb - the graph which is the knowledge base we are working with
// @param subject - a term, Thing this should be linked to when made. Optional.
// @param predicate - a term, the relationship for the subject link. Optional.
// @param theClass - an RDFS class containng the object about which the new information is.
// @param form  - the form to be used when a new one. null means please find one.
// @param store - The web document being edited
// @param callback - takes (boolean ok, string errorBody)
// @returns a dom object with the form DOM

widgetModule.promptForNew = function (dom, kb, subject, predicate, theClass, form, store, callback) {
  var ns = UI.ns
  var box = dom.createElement('form')

  if (!form) {
    var lists = widgetModule.findClosest(kb, theClass.uri, ns.ui('creationForm'))
    if (lists.length === 0) {
      var p = box.appendChild(dom.createElement('p'))
      p.textContent = 'I am sorry, you need to provide information about a ' +
        UI.utils.label(theClass) + " but I don't know enough information about those to ask you."
      var b = box.appendChild(dom.createElement('button'))
      b.setAttribute('type', 'button')
      b.setAttribute('style', 'float: right;')
      b.innerHTML = 'Goto ' + UI.utils.label(theClass)
      b.addEventListener('click', function (e) {
        UI.outline.GotoSubject(theClass, true, undefined, true, undefined)
      }, false)
      return box
    }
    UI.log.debug('lists[0] is ' + lists[0])
    form = lists[0] // Pick any one
  }
  UI.log.debug('form is ' + form)
  box.setAttribute('style', 'border: 0.05em solid brown; color: brown')
  box.innerHTML = '<h3>New ' + UI.utils.label(theClass) + '</h3>'

  var formFunction = widgetModule.fieldFunction(dom, form)
  var object = widgetModule.newThing(store)
  var gotButton = false
  var itemDone = function (ok, body) {
    if (!ok) return callback(ok, body)
    var insertMe = []
    if (subject && !kb.holds(subject, predicate, object, store)) {
      insertMe.push($rdf.st(subject, predicate, object, store))
    }
    if (subject && !kb.holds(object, ns.rdf('type'), theClass, store)) {
      insertMe.push($rdf.st(object, ns.rdf('type'), theClass, store))
    }
    if (insertMe.length) {
      UI.store.updater.update([], insertMe, linkDone)
    } else {
      callback(true, body)
    }
    if (!gotButton) {
      gotButton = box.appendChild(
        widgetModule.linkButton(dom, object))
    }
  // tabulator.outline.GotoSubject(object, true, undefined, true, undefined)
  }
  var linkDone = function (uri, ok, body) {
    return callback(ok, body)
  }
  UI.log.info('paneUtils Object is ' + object)
  var f = formFunction(dom, box, {}, object, form, store, itemDone)
  var rb = widgetModule.removeButton(dom, f)
  rb.setAttribute('style', 'float: right;')
  box.AJAR_subject = object
  return box
}

//      Description text area
//
// Make a box to demand a description or display existing one
//
// @param dom - the document DOM for the user interface
// @param kb - the graph which is the knowledge base we are working with
// @param subject - a term, the subject of the statement(s) being edited.
// @param predicate - a term, the predicate of the statement(s) being edited
// @param store - The web document being edited
// @param callback - takes (boolean ok, string errorBody)

widgetModule.makeDescription = function (dom, kb, subject, predicate, store, callback) {
  var group = dom.createElement('div')

  var sts = kb.statementsMatching(subject, predicate, undefined) // Only one please
  if (sts.length > 1) {
    return widgetModule.errorMessageBlock(dom,
      'Should not be ' + sts.length + ' i.e. >1 ' + predicate + ' of ' + subject)
  }
  var desc = sts.length ? sts[0].object.value : undefined

  var field = dom.createElement('textarea')
  group.appendChild(field)
  field.rows = desc ? desc.split('\n').length + 2 : 2
  field.cols = 80
  var style = 'font-size:100%; white-space: pre-wrap; background-color: white;' +
    ' border: 0.07em solid gray; padding: 1em 0.5em; margin: 1em 1em;'
  field.setAttribute('style', style)
  if (sts.length) {
    field.value = desc
  } else {
    // Unless you can make the predicate label disappear with the first click then this is over-cute
    // field.value = UI.utils.label(predicate); // Was"enter a description here"
    field.select() // Select it ready for user input -- doesn't work
  }

  group.refresh = function () {
    var v = kb.any(subject, predicate)
    if (v && (v.value !== field.value)) {
      field.value = v.value // don't touch widget if no change
    // @@ this is the place to color the field from the user who chanaged it
    }
  }

  var br = dom.createElement('br')
  group.appendChild(br)
  var submit = dom.createElement('input')
  submit.setAttribute('type', 'submit')
  submit.disabled = true // until the filled has been modified
  submit.setAttribute('style', 'visibility: hidden; float: right;') // Keep UI clean
  submit.value = 'Save ' + UI.utils.label(predicate) // @@ I18n
  group.appendChild(submit)

  var saveChange = function (e) {
    submit.disabled = true
    submit.setAttribute('style', 'visibility: hidden; float: right;') // Keep UI clean
    field.disabled = true
    field.setAttribute('style', style + 'color: gray;') // pending
    var ds = kb.statementsMatching(subject, predicate)
    var is = $rdf.st(subject, predicate, field.value, store)
    UI.store.updater.update(ds, is, function (uri, ok, body) {
      if (ok) {
        field.setAttribute('style', style + 'color: black;')
        field.disabled = false
      } else {
        group.appendChild(widgetModule.errorMessageBlock(dom,
          'Error (while saving change to ' + store.uri + '): ' + body))
      }
      if (callback) { callback(ok, body) }
    })
  }

  field.addEventListener('keyup', function (e) { // Green means has been changed, not saved yet
    field.setAttribute('style', style + 'color: green;')
    if (submit) {
      submit.disabled = false
      submit.setAttribute('style', 'float: right;') // Remove visibility: hidden
    }
  }, true)

  field.addEventListener('change', saveChange, true)

  submit.addEventListener('click', saveChange, false)

  return group
}

// Make SELECT element to select options
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
// @param callback - takes (boolean ok, string errorBody)

widgetModule.makeSelectForOptions = function (dom, kb, subject, predicate,
  possible, options, store, callback) {
  UI.log.debug('Select list length now ' + possible.length)
  var n = 0
  var uris = {} // Count them
  for (var i = 0; i < possible.length; i++) {
    var sub = possible[i]
    // UI.log.debug('Select element: '+ sub)
    if (sub.uri in uris) continue
    uris[sub.uri] = true; n++
  } // uris is now the set of possible options
  if (n === 0 && !options.mint) {
    return widgetModule.errorMessageBlock(dom,
      "Can't do selector with no options, subject= " + subject + ' property = ' + predicate + '.')
  }
  UI.log.debug('makeSelectForOptions: store=' + store)

  var getActual = function () {
    actual = {}
    if (predicate.sameTerm(UI.ns.rdf('type'))) {
      actual = kb.findTypeURIs(subject)
    } else {
      kb.each(subject, predicate).map(function (x) { actual[x.uri] = true })
    }
    return actual
  }
  var actual = getActual()

  // var newObject = null

  var onChange = function (e) {
    select.disabled = true // until data written back - gives user feedback too
    var ds = []
    var is = []
    var removeValue = function (t) {
      if (kb.holds(subject, predicate, t, store)) {
        ds.push($rdf.st(subject, predicate, t, store))
      }
    }
    for (var i = 0; i < select.options.length; i++) {
      var opt = select.options[i]
      if (opt.selected && opt.AJAR_mint) {
        var newObject
        if (options.mintClass) {
          var thisForm = widgetModule.promptForNew(dom, kb, subject, predicate, options.mintClass, null, store, function (ok, body) {
            if (!ok) {
              callback(ok, body) // @@ if ok, need some form of refresh of the select for the new thing
            }
          })
          select.parentNode.appendChild(thisForm)
          newObject = thisForm.AJAR_subject
        } else {
          newObject = widgetModule.newThing(store)
        }
        is.push($rdf.st(subject, predicate, newObject, store))
        if (options.mintStatementsFun) is = is.concat(options.mintStatementsFun(newObject))
      }
      if (!opt.AJAR_uri) continue // a prompt or mint
      if (opt.selected && !(opt.AJAR_uri in actual)) { // new class
        is.push($rdf.st(subject, predicate, kb.sym(opt.AJAR_uri), store))
      }
      if (!opt.selected && opt.AJAR_uri in actual) { // old class
        removeValue(kb.sym(opt.AJAR_uri))
      // ds.push($rdf.st(subject, predicate, kb.sym(opt.AJAR_uri), store ))
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
      callback(ok, body)
    }
    UI.log.info('selectForOptions: stote = ' + store)
    UI.store.updater.update(ds, is,
      function (uri, ok, body) {
        actual = getActual() // refresh
        // kb.each(subject, predicate).map(function(x){actual[x.uri] = true})
        if (ok) {
          select.disabled = false // data written back
          if (newObject) {
            var fn = widgetModule.fieldFunction(dom, options.subForm)
            fn(dom, select.parentNode, {}, newObject, options.subForm, store, doneNew)
          }
        }
        if (callback) callback(ok, body)
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
        option.selected = (option.AJAR_uri in actual)
      }
    }
    select.disabled = false // unlocked any conflict we had got into
  }

  for (var uri in uris) {
    var c = kb.sym(uri)
    var option = dom.createElement('option')
    if (options.disambiguate) {
      option.appendChild(dom.createTextNode(UI.utils.labelWithOntology(c, true))) // Init. cap
    } else {
      option.appendChild(dom.createTextNode(UI.utils.label(c, true))) // Init.
    }
    var backgroundColor = kb.any(c, kb.sym('http://www.w3.org/ns/ui#backgroundColor'))
    if (backgroundColor) option.setAttribute('style', 'background-color: ' + backgroundColor.value + '; ')
    option.AJAR_uri = uri
    if (uri in actual) {
      option.setAttribute('selected', 'true')
      select.currentURI = uri
    // dump("Already in class: "+ uri+"\n")
    }
    select.appendChild(option)
  }
  if (options.mint) {
    var mint = dom.createElement('option')
    mint.appendChild(dom.createTextNode(options.mint))
    mint.AJAR_mint = true // Flag it
    select.insertBefore(mint, select.firstChild)
  }
  if ((select.currentURI == null) && !options.multiple) {
    var prompt = dom.createElement('option')
    prompt.appendChild(dom.createTextNode(options.nullLabel))
    select.insertBefore(prompt, select.firstChild)
    prompt.selected = true
  }
  select.addEventListener('change', onChange, false)
  return select
} // makeSelectForOptions

// Make SELECT element to select subclasses
//
// If there is any disjoint union it will so a mutually exclusive dropdown
// Failing that it will do a multiple selection of subclasses.
// Callback takes (boolean ok, string errorBody)

widgetModule.makeSelectForCategory = function (dom, kb, subject, category, store, callback) {
  var log = UI.log
  var du = kb.any(category, UI.ns.owl('disjointUnionOf'))
  var subs
  var multiple = false
  if (!du) {
    subs = kb.each(undefined, UI.ns.rdfs('subClassOf'), category)
    multiple = true
  } else {
    subs = du.elements
  }
  log.debug('Select list length ' + subs.length)
  if (subs.length === 0) {
    return widgetModule.errorMessageBlock(dom,
      "Can't do " + (multiple ? 'multiple ' : '') + 'selector with no subclasses of category: ' + category)
  }
  if (subs.length === 1) {
    return widgetModule.errorMessageBlock(dom,
      "Can't do " + (multiple ? 'multiple ' : '') +
      'selector with only 1 subclass of category: ' + category + ':' + subs[1])
  }
  return widgetModule.makeSelectForOptions(dom, kb, subject, UI.ns.rdf('type'), subs,
    { 'multiple': multiple, 'nullPrompt': '--classify--' }, store, callback)
}

// Make SELECT element to select subclasses recurively
//
// It will so a mutually exclusive dropdown, with another if there are nested
// disjoint unions.
// Callback takes (boolean ok, string errorBody)

widgetModule.makeSelectForNestedCategory = function (
  dom, kb, subject, category, store, callback) {
  var container = dom.createElement('span') // Container
  var child = null
  var select
  var onChange = function (ok, body) {
    if (ok) update()
    callback(ok, body)
  }
  select = widgetModule.makeSelectForCategory(
    dom, kb, subject, category, store, onChange)
  container.appendChild(select)
  var update = function () {
    // UI.log.info("Selected is now: "+select.currentURI)
    if (child) {
      container.removeChild(child)
      child = null
    }
    if (select.currentURI && kb.any(kb.sym(select.currentURI), UI.ns.owl('disjointUnionOf'))) {
      child = widgetModule.makeSelectForNestedCategory(
        dom, kb, subject, kb.sym(select.currentURI), store, callback)
      select.subSelect = child.firstChild
      select.subSelect.superSelect = select
      container.appendChild(child)
    }
  }
  update()
  return container
}

/*  Build a checkbox from a given statement
**
**  If the source document is editable, make the checkbox editable
**
*/
widgetModule.buildCheckboxForm = function (dom, kb, lab, del, ins, form, store) {
  var box = dom.createElement('div')
  var tx = dom.createTextNode(lab)
  var editable = UI.store.updater.editable(store.uri)
  tx.style = 'colour: black; font-size: 100%; padding-left: 0.5 em; padding-right: 0.5 em;'
  box.appendChild(tx)
  var input = dom.createElement('input')
  box.appendChild(input)
  input.setAttribute('type', 'checkbox')
  input.setAttribute('style', 'margin: 0.7em')

  var state = kb.holds(ins.subject, ins.predicate, ins.object, store)
  if (del) {
    var negation = kb.holds(del.subject, del.predicate, del.object, store)
    if (state && negation) {
      box.appendChild(widgetModule.errorMessageBlock(dom,
        'Inconsistent data in store!\n' + ins + ' and\n' + del))
      return box
    }
    if (!state && !negation) {
      state = !!kb.any(form, UI.ns.ui('default'))
    }
  }

  input.checked = state
  if (!editable) return box

  var boxHandler = function (e) {
    tx.style = 'color: #bbb;'
    var toInsert, toDelete
    if (this.checked) {
      toInsert = ins
      toDelete = (del && negation) ? del : []
      UI.store.updater.update(del && negation ? del : [], ins, function (uri, success, error_body) {
        if (!success) {
          tx.style = 'color: #black; background-color: #fee;'
          box.appendChild(widgetModule.errorMessageBlock(dom,
            'Error updating store (setting boolean, checked) :\n\n' + error_body))
          input.checked = false // rollback UI
          return
        } else {
          tx.style = 'color: #black;'
          state = true
          negation = false
        }
      })
    } else { // unchecked
      toInsert = del
      toDelete = kb.statementsMatching(ins.subject, ins.predicate, ins.object, store)
      UI.store.updater.update(toDelete, toInsert, function (uri, success, error_body) {
        tx.className = 'question'
        if (!success) {
          tx.style = 'color: #black; background-color: #fee;'
          box.appendChild(widgetModule.errorMessageBlock(dom,
            'Error updating store (unchecked):\n\n' + error_body))
          input.checked = false // rollback UI
          return
        } else {
          tx.style = 'color: #black;'
          state = false
          negation = !!del
        }
      })
    }
  }
  input.addEventListener('click', boxHandler, false)
  return box
}

// /////////////////////////////////////// Random I/O widgets /////////////

// ////              Column Header Buttons
//
//  These are for selecting different modes, sources,styles, etc.
//
/*
widgetModule.headerButtons = function (dom, kb, name, words) {
    var box = dom.createElement('table')
    var i, word, s = '<tr>'
    box.setAttribute('style', 'width: 90%; height: 1.5em')
    for (i=0; i<words.length; i++) {
        s += '<td><input type="radio" name="' + name + '" id="' + words[i] + '" value='
    }
    box.innerHTML = s + '</tr>'

}
*/
// ////////////////////////////////////////////////////////////
//
//     selectorPanel
//
//  A vertical panel for selecting connections to left or right.
//
//   @param inverse means this is the object rather than the subject
//
widgetModule.selectorPanel = function (dom, kb, type,
  predicate, inverse, possible, options, callback, linkCallback) {
  return widgetModule.selectorPanelRefresh(dom.createElement('div'),
    dom, kb, type, predicate, inverse, possible, options, callback, linkCallback)
}

widgetModule.selectorPanelRefresh = function (list, dom, kb, type,
  predicate, inverse, possible, options, callback, linkCallback) {
  var style0 = 'border: 0.1em solid #ddd; border-bottom: none; width: 95%; height: 2em; padding: 0.5em;'
  var selected = null
  list.innerHTML = ''

  var refreshItem = function (box, x) { // Scope to hold item and x
    var item, image

    var setStyle = function () {
      var already = (inverse) ? kb.each(undefined, predicate, x)
        : kb.each(x, predicate)
      iconDiv.setAttribute('class', already.length === 0 ? 'hideTillHover' : '') // See tabbedtab.css
      image.setAttribute('src', options.connectIcon || (UI.icons.iconBase + 'noun_25830.svg'))
      image.setAttribute('title', already.length ? already.length : 'attach')
    }
    var f = widgetModule.index.twoLine.widgetForClass(type)
    item = f(dom, x)
    item.setAttribute('style', style0)

    var nav = dom.createElement('div')
    nav.setAttribute('class', 'hideTillHover') // See tabbedtab.css
    nav.setAttribute('style', 'float:right; width:10%')

    var a = dom.createElement('a')
    a.setAttribute('href', x.uri)
    a.setAttribute('style', 'float:right')
    nav.appendChild(a).textContent = '>'
    box.appendChild(nav)

    var iconDiv = dom.createElement('div')
    iconDiv.setAttribute('style', (inverse ? 'float:left;' : 'float:right;') + ' width:30px;')
    image = dom.createElement('img')
    setStyle()
    iconDiv.appendChild(image)
    box.appendChild(iconDiv)

    item.addEventListener('click', function (event) {
      if (selected === item) { // deselect
        item.setAttribute('style', style0)
        selected = null
      } else {
        if (selected) selected.setAttribute('style', style0)
        item.setAttribute('style', style0 + 'background-color: #ccc; color:black;')
        selected = item
      }
      callback(x, event, selected === item)
      setStyle()
    }, false)

    image.addEventListener('click', function (event) {
      linkCallback(x, event, inverse, setStyle)
    }, false)

    box.appendChild(item)
    return box
  }

  for (var i = 0; i < possible.length; i++) {
    var box = dom.createElement('div')
    list.appendChild(box)
    refreshItem(box, possible[i])
  }
  return list
}

// ###########################################################################
//
//      Small compact views of things
//
widgetModule.index = {}
widgetModule.index.line = {} // Approx 80em
widgetModule.index.twoLine = {} // Approx 40em * 2.4em

// ///////////////////////////////////////////////////////////////////////////
// We need these for anything which is a subject of an attachment.
//
// These should be moved to type-dependeent UI code. Related panes maybe

widgetModule.index.twoLine[''] = function (dom, x) { // Default
  var box = dom.createElement('div')
  box.textContent = (UI.utils.label(x))
  return box
}

widgetModule.index.twoLine.widgetForClass = function (c) {
  var widget = widgetModule.index.twoLine[c.uri]
  var kb = UI.store
  if (widget) return widget
  var sup = kb.findSuperClassesNT(c)
  for (var cl in sup) {
    widget = widgetModule.index.twoLine[kb.fromNT(cl).uri]
    if (widget) return widget
  }
  return widgetModule.index.twoLine['']
}

widgetModule.index.twoLine['http://www.w3.org/2000/10/swap/pim/qif#Transaction'] = function (dom, x) {
  var failed = ''
  var enc = function (p) {
    var y = UI.store.any(x, UI.ns.qu(p))
    if (!y) failed += '@@ No value for ' + p + '! '
    return y ? UI.utils.escapeForXML(y.value) : '?' // @@@@
  }
  var box = dom.createElement('table')
  box.innerHTML = '<tr><td colspan="2">' + enc('payee') +
    '</td></tr>\n<tr><td><td>' + enc('date').slice(0, 10) +
    '</td><td style="text-align: right;">' + enc('amount') + '</td></tr>'
  if (failed) {
    box.innerHTML = '<tr><td><a href="' +
      UI.utils.escapeForXML(x.uri) + '">' +
      UI.utils.escapeForXML(failed) + '</a></td></tr>'
  }
  return box
}

widgetModule.index.twoLine['http://www.w3.org/ns/pim/trip#Trip'] = function (dom, x) {
  var enc = function (p) {
    var y = UI.store.any(x, p)
    return y ? UI.utils.escapeForXML(y.value) : '?'
  }
  var box = dom.createElement('table')
  box.innerHTML = '<tr><td colspan="2">' + enc(UI.ns.dc('title')) +
    '</td></tr>\n<tr style="color: #777"><td><td>' +
    enc(UI.ns.cal('dtstart')) + '</td><td>' + enc(UI.ns.cal('dtend')) +
    '</td></tr>'
  return box
}

// Stick a stylesheet link the document if not already there
UI.widgets.addStyleSheet = function(dom, href) {
  var links = dom.querySelectorAll('link');
  for (i=0; i<links.length; i++){
    if ((links[i].getAttribute('rel') ||'') === 'stylesheet'
    && (links[i].getAttribute('href') ||'') === href ) return ;
  }
  var link = dom.createElement("link")
  link.setAttribute("rel", "stylesheet")
  link.setAttribute("type", "text/css")
  link.setAttribute("href", href)
  dom.getElementsByTagName("head")[0].appendChild(link)
}

// Figure (or guess) whether this is an immage
// In future, containers may give content type information about contents too.
//
UI.widgets.isImage = function(file){
  var imageExtensions = {'jpg': 1, 'png':1, 'jpeg':1, 'gif':1}
  return  (UI.ns.dct('Image') in UI.store.findTypeURIs(file)
        || file.uri.split('.').slice(-1)[0] in imageExtensions) // @@cheating
}
// ends
