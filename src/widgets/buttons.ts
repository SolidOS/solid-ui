import { IndexedFormula, NamedNode } from 'rdflib'

/**
 * UI Widgets such as buttons
 * @packageDocumentation
 */

/* global alert */

const $rdf = require('rdflib')

var UI = {
  icons: require('../iconBase'),
  log: require('../log'),
  ns: require('../ns'),
  store: require('../store'),
  style: require('../style')
  // widgets: widgets // @@
}

const utils = require('../utils')

const error = require('./error')
const dragAndDrop = require('./dragAndDrop')

const cancelIconURI = UI.icons.iconBase + 'noun_1180156.svg' // black X
const checkIconURI = UI.icons.iconBase + 'noun_1180158.svg' // green checkmark; Continue

export type StatusAreaContext = {
  statusArea?: HTMLElement
  div?: HTMLElement
  dom?: HTMLDocument
}
function getStatusArea (context?: StatusAreaContext) {
  var box = (context && context.statusArea) || (context && context.div) || null
  if (box) return box
  let dom = context && context.dom
  if (!dom && typeof document !== 'undefined') {
    dom = document
  }
  if (dom) {
    var body = dom.getElementsByTagName('body')[0]
    ;(box as unknown as HTMLElement) = dom.createElement('div')
    body.insertBefore((box as unknown as HTMLElement), body.firstElementChild)
    if (context) {
      context.statusArea = (box as unknown as HTMLElement)
    }
    return box
  }
  return null
}

/**
 * Display an error message block
 */
function complain (context: StatusAreaContext | undefined, err: string) {
  if (!err) return // only if error
  var ele = getStatusArea(context)
  console.log('Complaint: ' + err)
  if (ele) ele.appendChild(error.errorMessageBlock((context && context.dom) || document, err))
  else alert(err)
}

// var UI.ns = require('./ns.js')
// var utilsModule = require('./utils')
// var aclControlModule = require('./acl-control')

// paneUtils = {}

/**
 * Remove all the children of an HTML element
 */
function clearElement (ele: HTMLElement) {
  while (ele.firstChild) {
    ele.removeChild(ele.firstChild)
  }
  return ele
}

/**
 * To figure out the log URI from the full URI used to invoke the reasoner
 */
function extractLogURI (fullURI) {
  var logPos = fullURI.search(/logFile=/)
  var rulPos = fullURI.search(/&rulesFile=/)
  return fullURI.substring(logPos + 8, rulPos)
}

/**
 * @@@ TODO This needs to be changed to local time
 * noTime  - only give date, no time
 */
function shortDate (str, noTime) {
  if (!str) return '???'
  var month = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  try {
    var nowZ = new Date().toISOString()
    // var nowZ = $rdf.term(now).value
    // var n = now.getTimezoneOffset() // Minutes
    if (str.slice(0, 10) === nowZ.slice(0, 10) && !noTime) {
      return str.slice(11, 16)
    }
    if (str.slice(0, 4) === nowZ.slice(0, 4)) {
      return (
        month[parseInt(str.slice(5, 7), 10) - 1] +
        ' ' +
        parseInt(str.slice(8, 10), 10)
      )
    }
    return str.slice(0, 10)
  } catch (e) {
    return 'shortdate:' + e
  }
}

/**
 * Format a date and time
 * @param date for instance `new Date()`
 * @param format  for instance '{FullYear}-{Month}-{Date}T{Hours}:{Minutes}:{Seconds}.{Milliseconds}'
 * @returns for instance '2000-01-15T23:14:23.002'
 */
function formatDateTime (date, format) {
  return format
    .split('{')
    .map(function (s) {
      var k = s.split('}')[0]
      var width = { Milliseconds: 3, FullYear: 4 }
      var d = { Month: 1 }
      return s
        ? ('000' + (date['get' + k]() + (d[k] || 0))).slice(-(width[k] || 2)) + s.split('}')[1]
        : ''
    })
    .join('')
}

/**
 * Get a string representation of the current time
 * @returns for instance '2000-01-15T23:14:23.002'
 */
function timestamp () {
  return formatDateTime(
    new Date(),
    '{FullYear}-{Month}-{Date}T{Hours}:{Minutes}:{Seconds}.{Milliseconds}'
  )
}

/**
 * Get a short string representation of the current time
 * @returns for instance '23:14:23.002'
 */
function shortTime () {
  return formatDateTime(
    new Date(),
    '{Hours}:{Minutes}:{Seconds}.{Milliseconds}'
  )
}

// ///////////////////// Handy UX widgets

/**
 * Sets the best name we have and looks up a better one
 */
function setName (element, x) {
  var kb = UI.store
  var ns = UI.ns
  var findName = function (x) {
    var name =
      kb.any(x, ns.vcard('fn')) ||
      kb.any(x, ns.foaf('name')) ||
      kb.any(x, ns.vcard('organization-name'))
    return name ? name.value : null
  }
  var name = x.sameTerm(ns.foaf('Agent')) ? 'Everyone' : findName(x)
  element.textContent = name || utils.label(x)
  if (!name && x.uri) {
    // Note this is only a fetch, not a lookUP of all sameAs etc
    kb.fetcher.nowOrWhenFetched(x.doc(), undefined, function (_ok) {
      element.textContent = findName(x) || utils.label(x) // had: (ok ? '' : '? ') +
    })
  }
}

// Set of suitable images
function imagesOf (x, kb) {
  var ns = UI.ns
  return kb
    .each(x, ns.sioc('avatar'))
    .concat(kb.each(x, ns.foaf('img')))
    .concat(kb.each(x, ns.vcard('logo')))
    .concat(kb.each(x, ns.vcard('photo')))
    .concat(kb.each(x, ns.foaf('depiction')))
}
// Best logo or avater or photo etc to represent someone or some group etc
//

const iconForClass = {
  // Potentially extendable by other apps, panes, etc
  // Relative URIs to the iconBase
  'solid:AppProviderClass': 'noun_144.svg', //  @@ classs name should not contain 'Class'
  'solid:AppProvider': 'noun_15177.svg', // @@
  'solid:Pod': 'noun_Cabinet_1434380.svg',
  'vcard:Group': 'noun_339237.svg',
  'vcard:Organization': 'noun_143899.svg',
  'vcard:Individual': 'noun_15059.svg',
  'schema:Person': 'noun_15059.svg',
  'foaf:Person': 'noun_15059.svg',
  'foaf:Agent': 'noun_98053.svg',
  'acl:AuthenticatedAgent': 'noun_99101.svg',
  'prov:SoftwareAgent': 'noun_Robot_849764.svg', // Bot
  'vcard:AddressBook': 'noun_15695.svg',
  'trip:Trip': 'noun_581629.svg',
  'meeting:LongChat': 'noun_1689339.svg',
  'meeting:Meeting': 'noun_66617.svg',
  'meeting:Project': 'noun_1036577.svg',
  'ui:Form': 'noun_122196.svg',
  'rdfs:Class': 'class-rectangle.svg', // For RDF developers
  'rdf:Property': 'property-diamond.svg',
  'owl:Ontology': 'noun_classification_1479198.svg'
}

function tempSite (x) {
  // use only while one in rdflib fails with origins 2019
  var str = x.uri.split('#')[0]
  var p = str.indexOf('//')
  if (p < 0) throw new Error('This URI does not have a web site part (origin)')
  var q = str.indexOf('/', p + 2)
  if (q < 0) {
    // no third slash?
    return str.slice(0) + '/' // Add slash to a bare origin
  } else {
    return str.slice(0, q + 1)
  }
}

/**
 * Find an image for this thing as a class
 */
function findImageFromURI (x) {
  const iconDir = UI.icons.iconBase

  // Special cases from URI scheme:
  if (x.uri) {
    if (
      x.uri.split('/').length === 4 &&
      !x.uri.split('/')[1] &&
      !x.uri.split('/')[3]
    ) {
      return iconDir + 'noun_15177.svg' // App -- this is an origin
    }
    // Non-HTTP URI types imply types
    if (x.uri.startsWith('message:') || x.uri.startsWith('mid:')) {
      // message: is aapple bug-- should be mid:
      return iconDir + 'noun_480183.svg' // envelope  noun_567486
    }
    if (x.uri.startsWith('mailto:')) {
      return iconDir + 'noun_567486.svg' // mailbox - an email desitination
    }
    // For HTTP(s) documents, we could look at the MIME type if we know it.
    if (x.uri.startsWith('https:') && x.uri.indexOf('#') < 0) {
      return tempSite(x) + 'favicon.ico' // was x.site().uri + ...
      // Todo: make the docuent icon a fallback for if the favicon does not exist
      // todo: pick up a possible favicon for the web page istelf from a link
      // was: return iconDir + 'noun_681601.svg' // document - under solid assumptions
    }
    return null
  }

  return iconDir + 'noun_10636_grey.svg' // Grey Circle -  some thing
}

/* Find something we have as explict image data for the thing
*/
function findImage (thing) {
  const kb = UI.store
  const ns = UI.ns
  const iconDir = UI.icons.iconBase
  if (thing.sameTerm(ns.foaf('Agent')) || thing.sameTerm(ns.rdf('Resource'))) {
    return iconDir + 'noun_98053.svg' // Globe
  }
  const image =
    kb.any(thing, ns.sioc('avatar')) ||
    kb.any(thing, ns.foaf('img')) ||
    kb.any(thing, ns.vcard('logo')) ||
    kb.any(thing, ns.vcard('hasPhoto')) ||
    kb.any(thing, ns.vcard('photo')) ||
    kb.any(thing, ns.foaf('depiction'))
  return image ? image.uri : null
}

/**
 * Do the best you can with the data available
 *
 * @return {Boolean} Are we happy with this icon?
 * Sets src AND STYLE of the image.
 */
function trySetImage (element, thing, iconForClassMap) {
  const kb = UI.store

  const explitImage = findImage(thing)
  if (explitImage) {
    element.setAttribute('src', explitImage)
    return true
  }
  // This is one of the classes we know about - the class itself?
  const typeIcon = iconForClassMap[thing.uri]
  if (typeIcon) {
    element.setAttribute('src', typeIcon)
    element.style = UI.style.classIconStyle
    // element.style.border = '0.1em solid green;'
    // element.style.backgroundColor = '#eeffee' // pale green
    return true
  }
  const schemeIcon = findImageFromURI(thing)
  if (schemeIcon) {
    element.setAttribute('src', schemeIcon)
    return true // happy with this -- don't look it up
  }

  // Do we have a generic icon for something in any class its in?
  const types = kb.findTypeURIs(thing)
  for (var typeURI in types) {
    if (iconForClassMap[typeURI]) {
      element.setAttribute('src', iconForClassMap[typeURI])
      return false // maybe we can do better
    }
  }
  element.setAttribute('src', UI.icons.iconBase + 'noun_10636_grey.svg') // Grey Circle -  some thing
  return false // we can do better
}

// ToDo: Also add icons for *properties* like  home, work, email, range, domain, comment,
//

function setImage (element, thing) { // 20191230a
  const kb = UI.store
  const ns = UI.ns

  var iconForClassMap = {}
  for (var k in iconForClass) {
    const pref = k.split(':')[0]
    const id = k.split(':')[1]
    const klass = ns[pref](id)
    iconForClassMap[klass.uri] = $rdf.uri.join(iconForClass[k], UI.icons.iconBase)
  }

  const happy = trySetImage(element, thing, iconForClassMap)
  if (!happy && thing.uri) {
    kb.fetcher.nowOrWhenFetched(thing.doc(), undefined, (ok) => {
      if (ok) {
        trySetImage(element, thing, iconForClassMap)
      }
    })
  }
}

// If a web page then a favicon with a fallback to
// See eg http://stackoverflow.com/questions/980855/inputting-a-default-image
function faviconOrDefault (dom, x) {
  var image = dom.createElement('img')
  image.style = UI.style.iconStyle
  var isOrigin = function (x) {
    if (!x.uri) return false
    var parts = x.uri.split('/')
    return parts.length === 3 || (parts.length === 4 && parts[3] === '')
  }
  image.setAttribute(
    'src',
    UI.icons.iconBase + (isOrigin(x) ? 'noun_15177.svg' : 'noun_681601.svg') // App symbol vs document
  )
  if (x.uri && x.uri.startsWith('https:') && x.uri.indexOf('#') < 0) {
    var res = dom.createElement('object') // favico with a fallback of a default image if no favicon
    res.setAttribute('data', tempSite(x) + 'favicon.ico')
    res.setAttribute('type', 'image/x-icon')
    res.appendChild(image) // fallback
    return res
  } else {
    setImage(image, x)
    return image
  }
}

// Delete button with a check you really mean it
//
//   @@ Supress check if command key held down?
//
function deleteButtonWithCheck (
  dom,
  container,
  noun,
  deleteFunction
) {
  var minusIconURI = UI.icons.iconBase + 'noun_2188_red.svg' // white minus in red #cc0000 circle

  // var delButton = dom.createElement('button')

  var img = dom.createElement('img')
  img.setAttribute('src', minusIconURI) //  plus sign
  img.setAttribute('style', 'margin: 0.2em; width: 1em; height:1em')
  img.title = 'Remove this ' + noun
  var deleteButtonElt = img

  container.appendChild(deleteButtonElt)
  container.setAttribute('class', 'hoverControl') // See tabbedtab.css (sigh global CSS)
  deleteButtonElt.setAttribute('class', 'hoverControlHide')
  // delButton.setAttribute('style', 'color: red; margin-right: 0.3em; foat:right; text-align:right')
  deleteButtonElt.addEventListener(
    'click',
    function (_event) {
      container.removeChild(deleteButtonElt) // Ask -- are you sure?
      var cancelButtonElt = dom.createElement('button')
      // cancelButton.textContent = 'cancel'
      cancelButtonElt.setAttribute('style', UI.style.buttonStyle)
      var img = cancelButtonElt.appendChild(dom.createElement('img'))
      img.setAttribute('src', cancelIconURI)
      img.setAttribute('style', UI.style.buttonStyle)

      container.appendChild(cancelButtonElt).addEventListener(
        'click',
        function (_event) {
          container.removeChild(sureButtonElt)
          container.removeChild(cancelButtonElt)
          container.appendChild(deleteButtonElt)
        },
        false
      )
      var sureButtonElt = dom.createElement('button')
      sureButtonElt.textContent = 'Delete ' + noun
      sureButtonElt.setAttribute('style', UI.style.buttonStyle)
      container.appendChild(sureButtonElt).addEventListener(
        'click',
        function (_event) {
          container.removeChild(sureButtonElt)
          container.removeChild(cancelButtonElt)
          deleteFunction()
        },
        false
      )
    },
    false
  )
  return deleteButtonElt
}

/*  Make a button
 *
 * @param dom - the DOM document object
 * @Param iconURI - the URI of theb icon to use
 * @param text - the tooltip text or possibly button contents text
 * @param handler <function> - A handler to called when button is clicked
 *
 * @returns <dDomElement> - the button
 */
function button (dom: HTMLDocument, iconURI: string, text: string, handler: (event: any) => void) {
  var button = dom.createElement('button')
  button.setAttribute('type', 'button')
  button.setAttribute('style', UI.style.buttonStyle)
  // button.innerHTML = text  // later, user preferences may make text preferred for some
  var img = button.appendChild(dom.createElement('img'))
  img.setAttribute('src', iconURI)
  img.setAttribute('style', 'width: 2em; height: 2em;') // trial and error. 2em disappears
  img.title = text
  if (handler) {
    button.addEventListener('click', handler, false)
  }
  return button
}

/*  Make a cancel button
 *
 * @param dom - the DOM document object
 * @param handler <function> - A handler to called when button is clicked
 *
 * @returns <dDomElement> - the button
 */
function cancelButton (dom: HTMLDocument, handler: (event: any) => void) {
  return button(dom, cancelIconURI, 'Cancel', handler)
}

/*  Make a continue button
 *
 * @param dom - the DOM document object
 * @param handler <function> - A handler to called when button is clicked
 *
 * @returns <dDomElement> - the button
 */
function continueButton (dom: HTMLDocument, handler: (event: any) => void) {
  return button(dom, checkIconURI, 'Continue', handler)
}

/* Grab a name for a new thing
 *
 * Form to get the name of a new thing before we create it
 * @params klass  Misspelt to avoid clashing with the JavaScript keyword
 * @returns: a promise of (a name or null if cancelled)
 */
function askName (
  dom: HTMLDocument,
  kb: IndexedFormula,
  container: HTMLDocument,
  predicate?: NamedNode,
  klass?: NamedNode,
  noun?: string) {
  // eslint-disable-next-line promise/param-names
  return new Promise(function (resolve, _reject) {
    var form = dom.createElement('div') // form is broken as HTML behaviour can resurface on js error
    // classLabel = utils.label(ns.vcard('Individual'))
    predicate = predicate || UI.ns.foaf('name') // eg 'name' in user's language
    noun = noun || (klass ? utils.label(klass) : '  ') // eg 'folder' in users's language
    var prompt = noun + ' ' + utils.label(predicate) + ': '
    form.appendChild(dom.createElement('p')).textContent = prompt
    var namefield = dom.createElement('input')
    namefield.setAttribute('type', 'text')
    namefield.setAttribute('size', '100')
    namefield.setAttribute('maxLength', '2048') // No arbitrary limits
    namefield.setAttribute('style', UI.style.textInputStyle)
    namefield.select() // focus next user input
    form.appendChild(namefield)
    container.appendChild(form)

    // namefield.focus()

    function gotName () {
      ((form as HTMLElement).parentNode as HTMLElement).removeChild(form)
      resolve(namefield.value.trim())
    }

    namefield.addEventListener('keyup', function (e) {
      if (e.keyCode === 13) {
        gotName()
      }
    }, false)

    form.appendChild(dom.createElement('br'))

    form.appendChild(cancelButton(dom, function (_event) {
      ((form as HTMLElement).parentNode as HTMLElement).removeChild(form)
      resolve(null)
    }))

    form.appendChild(continueButton(dom, function (_event) {
      gotName()
    }))
    namefield.focus()
  }) // Promise
}

// ////////////////////////////////////////////////////////////////

// A little link icon
//
//
function linkIcon (dom, subject, iconURI?) {
  var anchor = dom.createElement('a')
  anchor.setAttribute('href', subject.uri)
  if (subject.uri.startsWith('http')) {
    // If diff web page
    anchor.setAttribute('target', '_blank') // open in a new tab or window
  } // as mailboxes and mail messages do not need new browser window
  var img = anchor.appendChild(dom.createElement('img'))
  img.setAttribute(
    'src',
    iconURI || UI.icons.originalIconBase + 'go-to-this.png'
  )
  img.setAttribute('style', 'margin: 0.3em;')
  return anchor
}

// A TR to repreent a draggable person, etc in a list
//
// pred is unused param at the moment
//
function personTR (dom, pred, obj, options) {
  var tr = dom.createElement('tr')
  options = options || {}
  // tr.predObj = [pred.uri, obj.uri]   moved to acl-control
  var td1 = tr.appendChild(dom.createElement('td'))
  var td2 = tr.appendChild(dom.createElement('td'))
  var td3 = tr.appendChild(dom.createElement('td'))

  // var image = td1.appendChild(dom.createElement('img'))
  var image = faviconOrDefault(dom, obj)

  td1.setAttribute('style', 'vertical-align: middle; width:2.5em; padding:0.5em; height: 2.5em;')
  td2.setAttribute('style', 'vertical-align: middle; text-align:left;')
  td3.setAttribute('style', 'vertical-align: middle; width:2em; padding:0.5em; height: 4em;')
  td1.appendChild(image)

  setName(td2, obj)
  if (options.deleteFunction) {
    deleteButtonWithCheck(dom, td3, options.noun || 'one', options.deleteFunction)
  }
  if (obj.uri) {
    // blank nodes need not apply
    if (options.link !== false) {
      var anchor = td3.appendChild(linkIcon(dom, obj))
      anchor.classList.add('HoverControlHide')
      td3.appendChild(dom.createElement('br'))
    }
    if (options.draggable !== false) {
      // default is on
      image.setAttribute('draggable', 'false') // Stop the image being dragged instead - just the TR
      dragAndDrop.makeDraggable(tr, obj)
    }
  }
  tr.subject = obj
  return tr
}

// Refresh a DOM tree recursively

function refreshTree (root) {
  if (root.refresh) {
    root.refresh()
    return
  }
  for (var i = 0; i < root.children.length; i++) {
    refreshTree(root.children[i])
  }
}

/**
 * Options argument for [[attachmentList]] function
 */
export type attachmentListOptions = {
  doc?: NamedNode
  modify?: boolean
  promptIcon?: string
  predicate?: NamedNode
  noun?: string
}

/**
 * Component that displays a list of resources, for instance
 * the attachments of a message, or the various documents related
 * to a meeting.
 * Accepts dropping URLs onto it to add attachments to it.
 */
function attachmentList (dom: HTMLDocument, subject: NamedNode, div: HTMLElement, options?: attachmentListOptions) {
  options = options || {}
  var doc = options.doc || subject.doc()
  if (options.modify === undefined) options.modify = true
  var modify = options.modify
  var promptIcon: string = options.promptIcon || (UI.icons.iconBase + 'noun_748003.svg' as string) //    target
  // var promptIcon = options.promptIcon || (UI.icons.iconBase + 'noun_25830.svg') //  paperclip
  var predicate = options.predicate || UI.ns.wf('attachment')
  var noun = options.noun || 'attachment'

  var kb = UI.store
  var attachmentOuter = div.appendChild(dom.createElement('table'))
  attachmentOuter.setAttribute('style', 'margin-top: 1em; margin-bottom: 1em;')
  var attachmentOne = attachmentOuter.appendChild(dom.createElement('tr'))
  var attachmentLeft = attachmentOne.appendChild(dom.createElement('td'))
  var attachmentRight = attachmentOne.appendChild(dom.createElement('td'))
  var attachmentTable = attachmentRight.appendChild(dom.createElement('table'))
  attachmentTable.appendChild(dom.createElement('tr')) // attachmentTableTop

  var deleteAttachment = function (target) {
    kb.updater.update($rdf.st(subject, predicate, target, doc), [], function (
      uri,
      ok,
      errorBody,
      _xhr
    ) {
      if (ok) {
        refresh()
      } else {
        complain(undefined, 'Error deleting one: ' + errorBody)
      }
    })
  }
  var createNewRow = function (target) {
    var theTarget = target
    var opt: any = { noun: noun }
    if (modify) {
      opt.deleteFunction = function () {
        deleteAttachment(theTarget)
      }
    }
    return personTR(dom, predicate, target, opt)
  }
  var refresh = ((attachmentTable as any).refresh = function () {
    var things = kb.each(subject, predicate)
    things.sort()
    utils.syncTableToArray(attachmentTable, things, createNewRow)
  })
  ;(attachmentOuter as any).refresh = refresh // Participate in downstream changes
  refresh()

  var droppedURIHandler = function (uris) {
    var ins: any = []
    uris.map(function (u) {
      var target = $rdf.sym(u) // Attachment needs text label to disinguish I think not icon.
      console.log('Dropped on attachemnt ' + u) // icon was: UI.icons.iconBase + 'noun_25830.svg'
      ins.push($rdf.st(subject, predicate, target, doc))
    })
    kb.updater.update([], ins, function (uri, ok, errorBody, _xhr) {
      if (ok) {
        refresh()
      } else {
        complain(undefined, 'Error adding one: ' + errorBody)
      }
    })
  }
  if (modify) {
    var paperclip = attachmentLeft.appendChild(dom.createElement('img'))
    paperclip.setAttribute('src', promptIcon)
    paperclip.setAttribute('style', 'width; 2em; height: 2em; margin: 0.5em;')
    paperclip.setAttribute('draggable', 'false')

    dragAndDrop.makeDropTarget(attachmentLeft, droppedURIHandler)
  }
  return attachmentOuter
}

// /////////////////////////////////////////////////////////////////////////////

// Event Handler for links within solid apps.
//
// Note that native links have consraints in Firefox, they
// don't work with local files for instance (2011)
//
function openHrefInOutlineMode (e) {
  e.preventDefault()
  e.stopPropagation()
  var target = utils.getTarget(e)
  var uri = target.getAttribute('href')
  if (!uri) return console.log('openHrefInOutlineMode: No href found!\n')
  const dom = window.document
  if ((dom as any).outlineManager) {
    // @@ TODO Remove the use of document as a global object
    ;(dom as any).outlineManager.GotoSubject(UI.store.sym(uri), true, undefined, true, undefined)
  } else if (window && (window as any).panes && (window as any).panes.getOutliner) {
    // @@ TODO Remove the use of window as a global object
    ;(window as any).panes
      .getOutliner()
      .GotoSubject(UI.store.sym(uri), true, undefined, true, undefined)
  } else {
    console.log('ERROR: Can\'t access outline manager in this config')
  }
  // dom.outlineManager.GotoSubject(UI.store.sym(uri), true, undefined, true, undefined)
}

// We make a URI in the annotation store out of the URI of the thing to be annotated.
//
// @@ Todo: make it a personal preference.
//
function defaultAnnotationStore (subject) {
  if (subject.uri === undefined) return undefined
  var s = subject.uri
  if (s.slice(0, 7) !== 'http://') return undefined
  s = s.slice(7) // Remove
  var hash = s.indexOf('#')
  if (hash >= 0) s = s.slice(0, hash)
  // Strip trailing
  else {
    var slash = s.lastIndexOf('/')
    if (slash < 0) return undefined
    s = s.slice(0, slash)
  }
  return UI.store.sym('http://tabulator.org/wiki/annnotation/' + s)
}

/**
 * Retrieve all RDF class URIs from solid-ui's RDF store
 * @returns an object `ret` such that `Object.keys(ret)` is
 * the list of all class URIs.
 */
function allClassURIs (): { [uri: string]: boolean } {
  var set = {}
  UI.store
    .statementsMatching(undefined, UI.ns.rdf('type'), undefined)
    .map(function (st) {
      if (st.object.uri) set[st.object.uri] = true
    })
  UI.store
    .statementsMatching(undefined, UI.ns.rdfs('subClassOf'), undefined)
    .map(function (st) {
      if (st.object.uri) set[st.object.uri] = true
      if (st.subject.uri) set[st.subject.uri] = true
    })
  UI.store
    .each(undefined, UI.ns.rdf('type'), UI.ns.rdfs('Class'))
    .map(function (c) {
      if (c.uri) set[c.uri] = true
    })
  return set
}

/**
 * Figuring which properties we know about
 *
 * When the user inputs an RDF property, like for a form field
 * or when specifying the relationship between two arbitrary things,
 * then er can prompt them with properties the session knows about
 *
 * TODO: Look again by catching this somewhere. (On the kb?)
 * TODO: move to diff module? Not really a button.
 * @param {Store} kb The quadstore to be searched.
 */

function propertyTriage (kb) {
  var possibleProperties: any = {}
  // if (possibleProperties === undefined) possibleProperties = {}
  // var kb = UI.store
  var dp = {}
  var op = {}
  var no = 0
  var nd = 0
  var nu = 0
  var pi = kb.predicateIndex // One entry for each pred
  for (var p in pi) {
    var object = pi[p][0].object
    if (object.termType === 'Literal') {
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
    // UI.log.debug('propertyTriage: unknown: ' + p)
    if (!op[p] && !dp[p]) {
      dp[p] = true
      op[p] = true
      nu++
    }
  }
  possibleProperties.op = op
  possibleProperties.dp = dp
  UI.log.info(`propertyTriage: ${no} non-lit, ${nd} literal. ${nu} unknown.`)
  return possibleProperties
}

/**
 * General purpose widgets
 */

// A button for jumping
//
function linkButton (dom, object) {
  var b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.textContent = 'Goto ' + utils.label(object)
  b.addEventListener('click', function (_event) {
    // b.parentNode.removeChild(b)
    dom.outlineManager.GotoSubject(object, true, undefined, true, undefined)
  }, true)
  return b
}

function removeButton (dom, element) {
  var b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.textContent = '✕' // MULTIPLICATION X
  b.addEventListener('click', function (_event) {
    element.parentNode.removeChild(element)
  }, true)
  return b
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
// @param callbackFunction - takes (boolean ok, string errorBody)

// /////////////////////////////////////// Random I/O widgets /////////////

// ////              Column Header Buttons
//
//  These are for selecting different modes, sources,styles, etc.
//
/*
buttons.headerButtons = function (dom, kb, name, words) {
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
function selectorPanel (
  dom,
  kb,
  type,
  predicate,
  inverse,
  possible,
  options,
  callbackFunction,
  linkCallback
) {
  return selectorPanelRefresh(
    dom.createElement('div'),
    dom,
    kb,
    type,
    predicate,
    inverse,
    possible,
    options,
    callbackFunction,
    linkCallback
  )
}

function selectorPanelRefresh (
  list,
  dom,
  kb,
  type,
  predicate,
  inverse,
  possible,
  options,
  callbackFunction,
  linkCallback
) {
  var style0 =
    'border: 0.1em solid #ddd; border-bottom: none; width: 95%; height: 2em; padding: 0.5em;'
  var selected: any = null
  list.innerHTML = ''

  var refreshItem = function (box, x) {
    // Scope to hold item and x
    var item, image

    var setStyle = function () {
      var already = inverse
        ? kb.each(undefined, predicate, x)
        : kb.each(x, predicate)
      iconDiv.setAttribute('class', already.length === 0 ? 'hideTillHover' : '') // See tabbedtab.css
      image.setAttribute(
        'src',
        options.connectIcon || UI.icons.iconBase + 'noun_25830.svg'
      )
      image.setAttribute('title', already.length ? already.length : 'attach')
    }
    var f = index.twoLine.widgetForClass(type)
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
    iconDiv.setAttribute(
      'style',
      (inverse ? 'float:left;' : 'float:right;') + ' width:30px;'
    )
    image = dom.createElement('img')
    setStyle()
    iconDiv.appendChild(image)
    box.appendChild(iconDiv)

    item.addEventListener('click', function (event) {
      if (selected === item) {
        // deselect
        item.setAttribute('style', style0)
        selected = null
      } else {
        if (selected) selected.setAttribute('style', style0)
        item.setAttribute(
          'style',
          style0 + 'background-color: #ccc; color:black;'
        )
        selected = item
      }
      callbackFunction(x, event, selected === item)
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
let index: any = {}
// ///////////////////////////////////////////////////////////////////////////
// We need these for anything which is a subject of an attachment.
//
// These should be moved to type-dependeent UI code. Related panes maybe

function twoLineDefault (dom, x) {
  // Default
  var box = dom.createElement('div')
  box.textContent = utils.label(x)
  return box
}

function twoLineWidgetForClass (c) {
  var widget = index.twoLine[c.uri]
  var kb = UI.store
  if (widget) return widget
  var sup = kb.findSuperClassesNT(c)
  for (var cl in sup) {
    widget = index.twoLine[kb.fromNT(cl).uri]
    if (widget) return widget
  }
  return index.twoLine['']
}

function twoLineTransaction (dom, x) {
  var failed = ''
  var enc = function (p) {
    var y = UI.store.any(x, UI.ns.qu(p))
    if (!y) failed += '@@ No value for ' + p + '! '
    return y ? utils.escapeForXML(y.value) : '?' // @@@@
  }
  var box = dom.createElement('table')
  box.innerHTML = `
    <tr>
      <td colspan="2">${enc('payee')}</td>
    </tr>
    <tr>
      <td>${enc('date').slice(0, 10)}</td>
      <td style="text-align: right;">${enc('amount')}</td>
    </tr>`
  if (failed) {
    box.innerHTML = `
      <tr>
        <td><a href="${utils.escapeForXML(x.uri)}">${utils.escapeForXML(failed)}</a></td>
      </tr>`
  }
  return box
}

function twoLineTrip (
  dom,
  x
) {
  var enc = function (p) {
    var y = UI.store.any(x, p)
    return y ? utils.escapeForXML(y.value) : '?'
  }
  var box = dom.createElement('table')
  box.innerHTML = `
    <tr>
      <td colspan="2">${enc(UI.ns.dc('title'))}</td>
    </tr>
    <tr style="color: #777">
      <td>${enc(UI.ns.cal('dtstart'))}</td>
      <td>${enc(UI.ns.cal('dtend'))}</td>
    </tr>`
  return box
}

/**
 * Stick a stylesheet link the document if not already there
 */
function addStyleSheet (dom: HTMLDocument, href: string): void {
  var links = dom.querySelectorAll('link')
  for (var i = 0; i < links.length; i++) {
    if (
      (links[i].getAttribute('rel') || '') === 'stylesheet' &&
      (links[i].getAttribute('href') || '') === href
    ) {
      return
    }
  }
  var link = dom.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  dom.getElementsByTagName('head')[0].appendChild(link)
}

// Figure (or guess) whether this is an image, etc
//
function isAudio (file) {
  return isImage(file, 'audio')
}
function isVideo (file) {
  return isImage(file, 'video')
}
function isImage (file, kind) {
  var dcCLasses = {
    audio: 'http://purl.org/dc/dcmitype/Sound',
    image: 'http://purl.org/dc/dcmitype/Image',
    video: 'http://purl.org/dc/dcmitype/MovingImage'
  }
  var what = kind || 'image'
  var typeURIs = UI.store.findTypeURIs(file)
  var prefix = $rdf.Util.mediaTypeClass(what + '/*').uri.split('*')[0]
  for (var t in typeURIs) {
    if (t.startsWith(prefix)) return true
  }
  if (dcCLasses[what] in typeURIs) return true
  return false
}

/**
 * File upload button
 * @param dom The DOM aka document
 * @param  display:none - Same handler function as drop, takes array of file objects
 * @returns {Element} - a div with a button and a inout in it
 * The input is hidden, as it is uglky - the user clicks on the nice icons and fires the input.
 */
// See https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
function fileUploadButtonDiv (
  dom,
  droppedFileHandler
) {
  const div = dom.createElement('div')
  const input = div.appendChild(dom.createElement('input'))
  input.setAttribute('type', 'file')
  input.setAttribute('multiple', 'true')
  input.addEventListener(
    'change',
    event => {
      console.log('File drop event: ', event)
      if (event.files) {
        droppedFileHandler(event.files)
      } else if (event.target && event.target.files) {
        droppedFileHandler(event.target.files)
      } else {
        alert('Sorry no files .. internal error?')
      }
    },
    false
  )

  input.style = 'display:none'
  const buttonElt = div.appendChild(
    button(
      dom,
      UI.icons.iconBase + 'noun_Upload_76574_000000.svg',
      'Upload files',
      _event => {
        input.click()
      }
    )
  )
  dragAndDrop.makeDropTarget(buttonElt, null, droppedFileHandler) // Can also just drop on button
  return div
}

index = {
  line: { // Approx 80em
  },
  twoLine: { // Approx 40em * 2.4em
    '': twoLineDefault,
    'http://www.w3.org/2000/10/swap/pim/qif#Transaction': twoLineTransaction,
    'http://www.w3.org/ns/pim/trip#Trip': twoLineTrip,
    widgetForClass: twoLineWidgetForClass
  }
}

module.exports = {
  addStyleSheet,
  allClassURIs,
  askName,
  attachmentList,
  button,
  cancelButton,
  clearElement,
  complain,
  continueButton,
  defaultAnnotationStore,
  deleteButtonWithCheck,
  extractLogURI,
  formatDateTime,
  faviconOrDefault,
  fileUploadButtonDiv,
  findImage,
  findImageFromURI,
  iconForClass,
  imagesOf,
  index,
  isAudio,
  isImage,
  isVideo,
  linkButton,
  linkIcon,
  openHrefInOutlineMode,
  personTR,
  propertyTriage,
  refreshTree,
  removeButton,
  shortDate,
  shortTime,
  selectorPanel,
  selectorPanelRefresh,
  setImage,
  setName,
  tempSite,
  timestamp
}
