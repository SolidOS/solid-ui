/*  Buttons
*/
import { IndexedFormula, NamedNode, st, sym, uri, Util } from 'rdflib'
import { icons } from '../iconBase'
import ns from '../ns'
import { style } from '../style'
import * as debug from '../debug'
import { info } from '../log'
import { uploadFiles, makeDraggable, makeDropTarget } from './dragAndDrop'
import { store } from 'solid-logic'
import * as utils from '../utils'
import newPersonIconDataURI from '../newperson'
import '../v2/components/actions/button'
import { errorMessageBlock } from './error'
import { addClickListenerToElement, createImageDiv, wrapDivInATR } from './widgetHelpers'
import { linkIcon, createLinkForURI } from './buttons/iconLinks'
import { lucideIcons } from '../icons/lucide'

/**
 * UI Widgets such as buttons
 * @packageDocumentation
 */

/* global alert */

const { iconBase } = icons

const cancelIconURI = lucideIcons.x // lucide x (was noun_1180156.svg)
const checkIconURI = lucideIcons.check // lucide check (was noun_1180158.svg)

export type StatusAreaContext = {
  statusArea?: HTMLElement
  div?: HTMLElement
  dom?: HTMLDocument
}
export type ButtonType = 'Primary' | 'Secondary'

export type ButtonWidgetOptions = {
  buttonColor?: ButtonType,
  needsBorder?: boolean
}

export type RenderAsDivOptions = {
  image?: HTMLImageElement,
  title?: string,
  deleteFunction?: () => void,
  link?: boolean,
  noun?: string,
  draggable?: boolean,
  clickable?: boolean,
  onClickFunction?: () => void,
  wrapInATR?: boolean
}

export type AttachmentSupportingInfo = string | HTMLElement | null | undefined
export type RenderSupportingInfo = (target: NamedNode, dom: HTMLDocument) => AttachmentSupportingInfo
export type AttachmentInlineInfo = string | HTMLElement | null | undefined
export type RenderNameSuffix = (target: NamedNode, dom: HTMLDocument) => AttachmentInlineInfo

function getStatusArea (context?: StatusAreaContext) {
  let box = (context && context.statusArea) || (context && context.div) || null
  if (box) return box
  let dom = context && context.dom
  if (!dom && typeof document !== 'undefined') {
    dom = document
  }
  if (dom) {
    const body = dom.getElementsByTagName('body')[0]
    box = dom.createElement('div')
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
export function complain (context?: StatusAreaContext, err?: string) {
  if (!err) return // only if error
  const ele = getStatusArea(context)
  debug.log('Complaint: ' + err)
  if (ele) ele.appendChild(errorMessageBlock((context && context.dom) || document, err))
  else alert(err)
}

/**
 * Remove all the children of an HTML element
 */
export function clearElement (ele: HTMLElement) {
  while (ele.firstChild) {
    ele.removeChild(ele.firstChild)
  }
  return ele
}

/**
 * To figure out the log URI from the full URI used to invoke the reasoner
 */
export function extractLogURI (fullURI) {
  const logPos = fullURI.search(/logFile=/)
  const rulPos = fullURI.search(/&rulesFile=/)
  return fullURI.substring(logPos + 8, rulPos)
}

/**
 * By default, converts e.g. '2020-02-19T19:35:28.557Z' to '19:35'
 * if today is 19 Feb 2020, and to 'Feb 19' if not.
 * @@@ TODO This needs to be changed to local time
 * @param noTime Return a string like 'Feb 19' even if it's today.
 */
export function shortDate (str?: string, noTime?: boolean): string {
  if (!str) return '???'
  const month = [
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
    const nowZ = new Date().toISOString()
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
export function formatDateTime (date: Date, format: string): string {
  return format
    .split('{')
    .map(function (s) {
      const k = s.split('}')[0]
      const width = { Milliseconds: 3, FullYear: 4 }
      const d = { Month: 1 }
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
export function timestamp (): string {
  return formatDateTime(
    new Date(),
    '{FullYear}-{Month}-{Date}T{Hours}:{Minutes}:{Seconds}.{Milliseconds}'
  )
}

/**
 * Get a short string representation of the current time
 * @returns for instance '23:14:23.002'
 */
export function shortTime (): string {
  return formatDateTime(
    new Date(),
    '{Hours}:{Minutes}:{Seconds}.{Milliseconds}'
  )
}

// ///////////////////// Handy UX widgets

/**
 * Sets the best name we have and looks up a better one
 */
export function setName (element: HTMLElement, x: NamedNode) {
  const kb = store
  const findName = function (x) {
    const name =
      kb.any(x, ns.vcard('fn')) ||
      kb.any(x, ns.foaf('name')) ||
      kb.any(x, ns.vcard('organization-name'))
    return name ? name.value : null
  }
  const name = x.sameTerm(ns.foaf('Agent')) ? 'Everyone' : findName(x)
  element.textContent = name || utils.label(x)
  if (!name && x.uri) {
    if (!kb.fetcher) {
      throw new Error('kb has no fetcher')
    }
    // Note this is only a fetch, not a lookUP of all sameAs etc
    kb.fetcher.nowOrWhenFetched(x.doc(), undefined, function (_ok) {
      element.textContent = findName(x) || utils.label(x) // had: (ok ? '' : '? ') +
    })
  }
}

/**
 * Set of suitable images
 * See also [[findImage]]
 * @param x The thing for which we want to find an image
 * @param kb The RDF store to look in
 * @returns It goes looking for triples in `kb`,
 *          `(subject: x), (predicate: see list below) (object: image-url)`
 *          to find any image linked from the thing with one of the following
 *          predicates (in order):
 *          * ns.sioc('avatar')
 *          * ns.foaf('img')
 *          * ns.vcard('logo')
 *          * ns.vcard('hasPhoto')
 *          * ns.vcard('photo')
 *          * ns.foaf('depiction')

 */
export function imagesOf (x: NamedNode | null, kb: IndexedFormula): any[] {
  return kb
    .each(x, ns.sioc('avatar'))
    .concat(kb.each(x, ns.foaf('img')))
    .concat(kb.each(x, ns.vcard('logo')))
    .concat(kb.each(x, ns.vcard('hasPhoto')))
    .concat(kb.each(x, ns.vcard('photo')))
    .concat(kb.each(x, ns.foaf('depiction')))
}

/**
 * Best logo or avatar or photo etc to represent someone or some group etc
 */
export const iconForClass = {
  // Map from CURIE → icon. May be either an iconBase-relative filename (legacy)
  // or a full URL (e.g. data: URI from lucide). The setImage() helper below
  // detects "data:" prefixes and skips the iconBase join.
  'solid:AppProviderClass': lucideIcons.appWindow, // was noun_144.svg
  'solid:AppProvider': lucideIcons.appWindow, // was noun_15177.svg
  'solid:Pod': lucideIcons.database, // was noun_Cabinet_1434380.svg
  'vcard:Group': lucideIcons.users, // was noun_339237.svg (the filled-group icon)
  'vcard:Organization': lucideIcons.building2, // was noun_143899.svg
  // TEMP HACK: Use locally bundled icon; switch to solid-assets icon mapping soon.
  'vcard:Individual': newPersonIconDataURI,
  'schema:Person': newPersonIconDataURI,
  'foaf:Person': newPersonIconDataURI,
  'foaf:Agent': lucideIcons.globe, // was noun_98053.svg
  'acl:AuthenticatedAgent': lucideIcons.userCheck, // was noun_99101.svg
  'prov:SoftwareAgent': lucideIcons.bot, // was noun_Robot_849764.svg
  'vcard:AddressBook': lucideIcons.bookUser, // was noun_15695.svg
  'trip:Trip': lucideIcons.route, // was noun_581629.svg
  'meeting:LongChat': lucideIcons.messagesSquare, // the stacked-chat icon (was noun_1689339.svg)
  'meeting:Meeting': lucideIcons.usersRound, // was noun_66617.svg
  'meeting:Project': lucideIcons.briefcase, // was noun_1036577.svg
  'ui:Form': lucideIcons.formInput, // was noun_122196.svg
  'rdfs:Class': 'class-rectangle.svg', // For RDF developers — left as legacy
  'rdf:Property': 'property-diamond.svg',
  'owl:Ontology': 'noun_classification_1479198.svg',
  'wf:Tracker': lucideIcons.formInput, // was noun_122196.svg
  'wf:Task': 'noun_17020_gray-tick.svg',
  'wf:Open': 'noun_17020_sans-tick.svg',
  'wf:Closed': 'noun_17020.svg'
}

/**
 * Returns the origin of the URI of a NamedNode
 */
function tempSite (x: NamedNode) {
  // use only while one in rdflib fails with origins 2019
  const str = x.uri.split('#')[0]
  const p = str.indexOf('//')
  if (p < 0) throw new Error('This URI does not have a web site part (origin)')
  const q = str.indexOf('/', p + 2)
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
export function findImageFromURI (x: NamedNode | string): string | null {
  const iconDir = iconBase

  // Special cases from URI scheme:
  if (typeof x !== 'string' && x.uri) {
    if (
      x.uri.split('/').length === 4 &&
      !x.uri.split('/')[1] &&
      !x.uri.split('/')[3]
    ) {
      return lucideIcons.appWindow // App (origin); was noun_15177.svg
    }
    // Non-HTTP URI types imply types
    if (x.uri.startsWith('message:') || x.uri.startsWith('mid:')) {
      // message: is apple bug-- should be mid:
      return lucideIcons.mail // was noun_480183.svg
    }
    if (x.uri.startsWith('mailto:')) {
      return lucideIcons.mail // mailto target; was noun_567486.svg (mailbox)
    }
    // For HTTP(s) documents, we could look at the MIME type if we know it.
    if (x.uri.startsWith('https:') && x.uri.indexOf('#') < 0) {
      return tempSite(x) + 'favicon.ico' // was x.site().uri + ...
      // Todo: make the document icon a fallback for if the favicon does not exist
      // todo: pick up a possible favicon for the web page itself from a link
      // was: return iconDir + 'noun_681601.svg' // document - under solid assumptions
    }
    return null
  }

  return iconDir + 'noun_10636_grey.svg' // Grey Circle -  some thing
}

/**
 * Find something we have as explicit image data for the thing
 * See also [[imagesOf]]
 * @param thing The thing for which we want to find an image
 * @returns The URL of a globe icon if thing equals `ns.foaf('Agent')`
 *          or `ns.rdf('Resource')`. Otherwise, it goes looking for
 *          triples in `store`,
 *          `(subject: thing), (predicate: see list below) (object: image-url)`
 *          to find any image linked from the thing with one of the following
 *          predicates (in order):
 *          * ns.sioc('avatar')
 *          * ns.foaf('img')
 *          * ns.vcard('logo')
 *          * ns.vcard('hasPhoto')
 *          * ns.vcard('photo')
 *          * ns.foaf('depiction')
 */
export function findImage (thing: NamedNode): string {
  const kb = store
  if (thing.sameTerm(ns.foaf('Agent')) || thing.sameTerm(ns.rdf('Resource'))) {
    return lucideIcons.globe // was noun_98053.svg
  }
  const image =
    kb.any(thing, ns.sioc('avatar')) ||
    kb.any(thing, ns.foaf('img')) ||
    kb.any(thing, ns.vcard('logo')) ||
    kb.any(thing, ns.vcard('hasPhoto')) ||
    kb.any(thing, ns.vcard('photo')) ||
    kb.any(thing, ns.foaf('depiction'))
  return image ? (image as any).uri : null as any
}

/**
 * Do the best you can with the data available
 *
 * @return {Boolean} Are we happy with this icon?
 * Sets src AND STYLE of the image.
 */
function trySetImage (element, thing, iconForClassMap) {
  const kb = store

  const explitImage = findImage(thing)
  if (explitImage) {
    element.setAttribute('src', explitImage)
    return true
  }
  // This is one of the classes we know about - the class itself?
  const typeIcon = iconForClassMap[thing.uri]
  if (typeIcon) {
    element.setAttribute('src', typeIcon)
    element.style = style.classIconStyle
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
  for (const typeURI in types) {
    if (iconForClassMap[typeURI]) {
      element.setAttribute('src', iconForClassMap[typeURI])
      return false // maybe we can do better
    }
  }
  element.setAttribute('src', lucideIcons.circle) // lucide circle (was noun_10636_grey.svg)
  return false // we can do better
}

/**
 * ToDo: Also add icons for *properties* like  home, work, email, range, domain, comment,
 */
export function setImage (element: HTMLElement, thing: NamedNode) { // 20191230a
  const kb = store

  const iconForClassMap = {}
  for (const k in iconForClass) {
    const pref = k.split(':')[0]
    const id = k.split(':')[1]
    const theClass = ns[pref](id)
    const iconRef = iconForClass[k]
    /* Temporary hack for a new design icon */
    if (iconRef.startsWith('data:')) {
      iconForClassMap[theClass.uri] = iconRef
    } else {
      iconForClassMap[theClass.uri] = uri.join(iconRef, iconBase)
    }
  }

  const happy = trySetImage(element, thing, iconForClassMap)
  if (!happy && thing.uri) {
    if (!kb.fetcher) {
      throw new Error('kb has no fetcher')
    }
    kb.fetcher.nowOrWhenFetched(thing.doc(), undefined, (ok) => {
      if (ok) {
        trySetImage(element, thing, iconForClassMap)
      }
    })
  }
}

// If a web page, then a favicon, with a fallback to ???
// See, e.g., http://stackoverflow.com/questions/980855/inputting-a-default-image
export function faviconOrDefault (dom: HTMLDocument, x: NamedNode) {
  const image = dom.createElement('img')
  ;(image as any).style = style.iconStyle
  const isOrigin = function (x) {
    if (!x.uri) return false
    const parts = x.uri.split('/')
    return parts.length === 3 || (parts.length === 4 && parts[3] === '')
  }
  image.setAttribute(
    'src',
    isOrigin(x) ? lucideIcons.appWindow : lucideIcons.formInput // App vs document; were noun_15177.svg / noun_681601.svg
  )
  if (x.uri && x.uri.startsWith('https:') && x.uri.indexOf('#') < 0) {
    const res = dom.createElement('object') // favico with a fallback of a default image if no favicon
    res.setAttribute('data', tempSite(x) + 'favicon.ico')
    res.setAttribute('type', 'image/x-icon')
    res.appendChild(image) // fallback
    return res
  } else {
    setImage(image, x)
    return image
  }
}

/* Two-option dialog pop-up
*/

function renderDeleteConfirmPopup (dom, refererenceElement, prompt, deleteFunction) {
  function removePopup () {
    refererenceElement.parentElement.removeChild(refererenceElement)
  }
  function removePopupAndDoDeletion () {
    removePopup()
    deleteFunction()
  }
  const popup = dom.createElement('div')
  popup.style = style.confirmPopupStyle
  popup.style.position = 'absolute'
  popup.style.top = '-1em' // try leaving original button clear

  popup.style.display = 'grid'
  popup.style.gridTemplateColumns = 'auto auto'
  const affirm = dom.createElement('div')
  affirm.style.gridColumn = '1/2'
  affirm.style.gridRow = '1' // @@ sigh; TS. could pass number in fact
  const cancel = dom.createElement('div')
  cancel.style.gridColumn = '1/2'
  cancel.style.gridRow = '2'

  const xButton = cancelButton(dom, removePopup)
  popup.appendChild(xButton)
  xButton.style.gridColumn = '1'
  xButton.style.gridRow = '2'

  const cancelPrompt = popup.appendChild(dom.createElement('button'))
  cancelPrompt.style = style.buttonStyle
  cancelPrompt.style.gridRow = '2'
  cancelPrompt.style.gridColumn = '2'
  cancelPrompt.textContent = 'Cancel' // @@ I18n

  const affirmIcon = button(dom, lucideIcons.trash2, 'Delete it') // lucide trash-2 (was noun_925021.svg)
  popup.appendChild(affirmIcon)
  affirmIcon.style.gridRow = '1'
  affirmIcon.style.gridColumn = '1'

  const sureButtonElt = popup.appendChild(dom.createElement('button'))
  sureButtonElt.style = style.buttonStyle
  sureButtonElt.style.gridRow = '1'
  sureButtonElt.style.gridColumn = '2'
  sureButtonElt.textContent = prompt
  popup.appendChild(sureButtonElt)

  affirmIcon.addEventListener('click', removePopupAndDoDeletion)
  sureButtonElt.addEventListener('click', removePopupAndDoDeletion)

  // xButton.addEventListener('click', removePopup)
  cancelPrompt.addEventListener('click', removePopup)

  return popup
}
/**
 * Delete button with a check you really mean it
 * @@ Supress check if command key held down?
 */
export function deleteButtonWithCheck (
  dom: HTMLDocument,
  container: HTMLElement,
  noun: string,
  deleteFunction: () => any
) {
  function createPopup () {
    const refererenceElement = dom.createElement('div')
    container.insertBefore(refererenceElement, deleteButton)
    refererenceElement.style.position = 'relative' // Needed as reference for popup
    refererenceElement.appendChild(renderDeleteConfirmPopup(dom, refererenceElement, prompt, deleteFunction))
  }
  const minusIconURI = lucideIcons.circleMinus // lucide circle-minus (was noun_2188_red.svg)
  const deleteButton = dom.createElement('img')
  deleteButton.setAttribute('src', minusIconURI)

  deleteButton.setAttribute('style', style.smallButtonStyle) // @@tsc - would set deleteButton.style
  deleteButton.style.float = 'right' // Historically this has alwaus floated right

  const prompt = 'Remove this ' + noun
  deleteButton.title = prompt
  // @@ In an ideal world, make use of hover an accessibility option
  deleteButton.classList.add('hoverControlHide')

  deleteButton.addEventListener('click', createPopup)

  container.classList.add('hoverControl')
  container.appendChild(deleteButton)
  deleteButton.setAttribute('data-testid', 'deleteButtonWithCheck')
  return deleteButton // or button div?  caller may change size of image
}

/*  Make a button
 *
 * @param dom - the DOM document object
 * @Param iconURI - the URI of the icon to use (if any)
 * @param text - the tooltip text or possibly button contents text
 * @param handler <function> - A handler to called when button is clicked
 *
 * @returns <dDomElement> - the button
 */
export function button (dom: HTMLDocument, iconURI: string | undefined, text: string,
  handler?: (_event: any) => void,
  options: ButtonWidgetOptions = { buttonColor: 'Primary', needsBorder: false }) {
  if (iconURI) {
    // Icon buttons stay as plain <button> elements (icon variant is handled elsewhere).
    const button = dom.createElement('button')
    button.setAttribute('type', 'button')
    const img = button.appendChild(dom.createElement('img'))
    img.setAttribute('src', iconURI)
    img.setAttribute('style', 'width: 2em; height: 2em;') // trial and error. 2em disappears
    img.title = text
    button.setAttribute('style', style.buttonStyle)
    if (handler) {
      button.addEventListener('click', handler, false)
    }
    return button
  }

  // Text buttons now use the <solid-ui-button> design-system component.
  // buttonColor 'Primary' (the default) -> variant="primary", 'Secondary' -> variant="secondary".
  const button = dom.createElement('solid-ui-button')
  button.setAttribute('type', 'button')
  button.setAttribute(
    'variant',
    options.buttonColor === 'Secondary' ? 'secondary' : 'primary'
  )
  button.textContent = text.toLocaleUpperCase()
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
export function cancelButton (dom: HTMLDocument, handler: (_event?: any) => void) {
  const b = button(dom, cancelIconURI, 'Cancel', handler)
  if (b.firstChild) { // sigh for tsc
    (b.firstChild as HTMLElement).style.opacity = '0.3' // Black X is too harsh: current language is grey X
  }
  return b
}

/*  Make a continue button
 *
 * @param dom - the DOM document object
 * @param handler <function> - A handler to called when button is clicked
 *
 * @returns <dDomElement> - the button
 */
export function continueButton (dom: HTMLDocument, handler: (_event: any) => void) {
  return button(dom, checkIconURI, 'Continue', handler)
}

/* Grab a name for a new thing
 *
 * Form to get the name of a new thing before we create it
 * @params theClass  Misspelt to avoid clashing with the JavaScript keyword
 * @returns: a promise of (a name or null if cancelled)
 */
export function askName (
  dom: HTMLDocument,
  kb: IndexedFormula,
  container: HTMLDivElement,
  predicate?: NamedNode,
  theClass?: NamedNode,
  noun?: string) {
  return new Promise(function (resolve, _reject) {
    const form = dom.createElement('div') // form is broken as HTML behaviour can resurface on js error
    // classLabel = utils.label(ns.vcard('Individual'))
    predicate = predicate || ns.foaf('name') // eg 'name' in user's language
    noun = noun || (theClass ? utils.label(theClass) : '  ') // eg 'folder' in users's language
    const prompt = noun + ' ' + utils.label(predicate) + ': '
    form.appendChild(dom.createElement('p')).textContent = prompt
    const namefield = dom.createElement('input')
    namefield.setAttribute('type', 'text')
    namefield.setAttribute('size', '100')
    namefield.setAttribute('maxLength', '2048') // No arbitrary limits
    namefield.setAttribute('style', style.textInputStyle)
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

/**
 * A TR to represent a draggable person, etc in a list
 *
 * pred is unused param at the moment
 */
export const personTR = renderAsRow // The legacy name is used in a lot of places

export function renderAsRow (dom: HTMLDocument, pred: NamedNode, obj: NamedNode, options: any): HTMLTableRowElement {
  const tr = dom.createElement('tr')
  options = options || {}
  // tr.predObj = [pred.uri, obj.uri]   moved to acl-control
  const td1 = tr.appendChild(dom.createElement('td'))
  const td2 = tr.appendChild(dom.createElement('td'))
  const td3 = tr.appendChild(dom.createElement('td'))

  // const image = td1.appendChild(dom.createElement('img'))
  const image = options.image || faviconOrDefault(dom, obj)

  td1.setAttribute('style', 'vertical-align: middle; width:2.5em; padding:0.5em; height: 2.5em;')
  td2.setAttribute('style', 'vertical-align: middle; text-align:left;')
  td3.setAttribute('style', 'vertical-align: middle; width:2em; padding:0.5em; height: 4em;')
  td1.appendChild(image)

  const nameLine = td2.appendChild(dom.createElement('div'))
  const nameText = nameLine.appendChild(dom.createElement('span'))
  if (options.title) {
    nameText.textContent = options.title
  } else {
    setName(nameText, obj) // This is async
  }

  if (typeof options.renderNameSuffix === 'function') {
    const inlineInfo = options.renderNameSuffix(obj, dom)
    if (inlineInfo) {
      const nameSuffix = nameLine.appendChild(dom.createElement('span'))
      nameSuffix.setAttribute('style', 'margin-left: 0.4em; opacity: 0.8;')
      if (typeof inlineInfo === 'string') {
        nameSuffix.textContent = inlineInfo
      } else {
        nameSuffix.appendChild(inlineInfo)
      }
    }
  }

  if (typeof options.renderSupportingInfo === 'function') {
    const supportingInfo = options.renderSupportingInfo(obj, dom)
    if (supportingInfo) {
      const supportingLine = td2.appendChild(dom.createElement('div'))
      supportingLine.setAttribute('style', 'font-size: 90%; opacity: 0.8;')
      if (typeof supportingInfo === 'string') {
        supportingLine.textContent = supportingInfo
      } else {
        supportingLine.appendChild(supportingInfo)
      }
    }
  }

  if (options.deleteFunction) {
    deleteButtonWithCheck(dom, td3, options.noun || 'one', options.deleteFunction)
  }
  if (obj.uri) {
    // blank nodes need not apply
    if (options.link !== false) {
      const anchor = td3.appendChild(linkIcon(dom, obj))
      anchor.classList.add('HoverControlHide')
      td3.appendChild(dom.createElement('br'))
    }
    if (options.draggable !== false) {
      // default is on
      image.setAttribute('draggable', 'false') // Stop the image being dragged instead - just the TR
      makeDraggable(tr, obj)
    }
  }
  ;(tr as any).subject = obj
  return tr
}

/* A helper function for renderAsDiv
*  creates the NameDiv for the person
*  Note: could not move it to the helper file because they call exported functions
*  from buttons
*  @internal exporting this only for unit tests
*/
export function createNameDiv (dom: HTMLDocument, div: HTMLDivElement, title: string | undefined, obj: NamedNode) {
  const nameDiv = div.appendChild(dom.createElement('div'))
  if (title) {
    nameDiv.textContent = title
  } else {
    setName(nameDiv, obj) // This is async
  }
}
/* A helper function for renderAsDiv
*  creates the linkDiv for the person
*  Note: could not move it to the helper file because they call exported functions
*  from buttons
* @internal exporting this only for unit tests
*/
export function createLinkDiv (dom: HTMLDocument, div: HTMLDivElement, obj: NamedNode, options: RenderAsDivOptions) {
  const linkDiv = div.appendChild(dom.createElement('div'))
  linkDiv.setAttribute('style', style.linkDivStyle)

  if (options.deleteFunction) {
    deleteButtonWithCheck(dom, linkDiv, options.noun || 'one', options.deleteFunction)
  }

  if (obj.uri) {
    // blank nodes need not apply
    if (options.link !== false) {
      createLinkForURI(dom, linkDiv, obj)
    }

    makeDraggable(div, obj)
  }
}
/**
 * A Div to represent a draggable person, etc in a list
 * configurable to add an onClick listener
 */
export function renderAsDiv (dom: HTMLDocument, obj: NamedNode, options: RenderAsDivOptions): HTMLElement {
  const div = dom.createElement('div')
  div.setAttribute('style', style.renderAsDivStyle)

  options = options || {}
  const image = options.image || faviconOrDefault(dom, obj)
  createImageDiv(dom, div, image)
  createNameDiv(dom, div, options.title, obj)
  createLinkDiv(dom, div, obj, options)

  if (options.clickable && options.onClickFunction) {
    addClickListenerToElement(div, options.onClickFunction)
  }

  // to be compatible with the SolidOS table layout
  if (options.wrapInATR) {
    const tr = wrapDivInATR(dom, div, obj)
    return tr
  }
  return div
}

/**
 * Refresh a DOM tree recursively
 */
export function refreshTree (root: any): void {
  if (root.refresh) {
    root.refresh()
    return
  }
  for (let i = 0; i < root.children.length; i++) {
    refreshTree(root.children[i])
  }
}

/**
 * Options argument for [[attachmentList]] function
 */
/* The following options renderSupportingInfo and renderNameSuffix
    were generated by AI Model: GPT-5.3-Codex */
/* Prompt: Add two options one renderSupportingInfo to allow the caller to add some additional information
   to be displayed below the name. Also add renderNameSuffix to allow the caller to add pronouns or other suffixes to the name. */
export type attachmentListOptions = {
  doc?: NamedNode
  modify?: boolean
  promptIcon?: string
  predicate?: NamedNode
  uploadFolder?: NamedNode
  noun?: string
  renderSupportingInfo?: RenderSupportingInfo
  renderNameSuffix?: RenderNameSuffix
}

/**
 * Component that displays a list of resources, for instance
 * the attachments of a message, or the various documents related
 * to a meeting.
 * Accepts dropping URLs onto it to add attachments to it.
 */
export function attachmentList (dom: HTMLDocument, subject: NamedNode, div: HTMLElement, options: attachmentListOptions = {}) {
  // options = options || {}
  const docsWaitingForRowRefresh = new Set<string>()
  const hasAsyncEnrichedRowOptions = !!(options.renderSupportingInfo || options.renderNameSuffix)

  const deleteAttachment = function (target) {
    if (!kb.updater) {
      throw new Error('kb has no updater')
    }

    kb.updater.update(st(subject, predicate, target, doc) as any, [], function (
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

  function createNewRow (target) {
    const theTarget = target
    const opt: any = { noun }
    opt.renderSupportingInfo = options.renderSupportingInfo
    opt.renderNameSuffix = options.renderNameSuffix

    if (hasAsyncEnrichedRowOptions && target?.uri && kb.fetcher) {
      const targetDoc = target.doc()
      const requestState = targetDoc?.uri ? kb.fetcher.requested?.[targetDoc.uri] : undefined
      const shouldWaitForFetch = requestState !== 'done' && requestState !== 'failed'
      if (targetDoc?.uri && shouldWaitForFetch && !docsWaitingForRowRefresh.has(targetDoc.uri)) {
        docsWaitingForRowRefresh.add(targetDoc.uri)
        // Root fix: these row options can depend on async profile data, so rerender once fetch completes.
        kb.fetcher.nowOrWhenFetched(targetDoc, undefined, () => {
          docsWaitingForRowRefresh.delete(targetDoc.uri)
          refresh()
        })
      }
    }

    if (modify) {
      opt.deleteFunction = function () {
        deleteAttachment(theTarget)
      }
    }
    return personTR(dom, predicate, target, opt)
  }

  const refresh = function () {
    const things = kb.each(subject, predicate)
    things.sort()
    utils.syncTableToArray(
      attachmentTable,
      things,
      createNewRow,
      hasAsyncEnrichedRowOptions
        ? function (row, thing) {
          // When row content depends on async profile data, recreate matched rows on refresh.
          const replacement = createNewRow(thing)
          return replacement
        }
        : undefined
    )
  }

  function droppedURIHandler (uris) {
    const ins: any = []
    uris.forEach(function (u) {
      const target = sym(u) // Attachment needs text label to disinguish I think not icon.
      debug.log('Dropped on attachemnt ' + u) // icon was: iconBase + 'noun_25830.svg'
      ins.push(st(subject, predicate, target, doc))
    })
    if (!kb.updater) {
      throw new Error('kb has no updater')
    }

    kb.updater.update([], ins, function (uri, ok, errorBody, _xhr) {
      if (ok) {
        refresh()
      } else {
        complain(undefined, 'Error adding one: ' + errorBody)
      }
    })
  }

  function droppedFileHandler (files) {
    uploadFiles(
      kb.fetcher,
      files,
      options.uploadFolder?.uri, // Files
      options.uploadFolder?.uri, // Pictures
      function (theFile, destURI) {
        const ins = [st(subject, predicate, kb.sym(destURI), doc)]
        if (!kb.updater) {
          throw new Error('kb has no updater')
        }
        kb.updater.update([], ins, function (uri, ok, errorBody, _xhr) {
          if (ok) {
            refresh()
          } else {
            complain(undefined, 'Error adding link to uploaded file: ' + errorBody)
          }
        })
      }
    )
  }

  const doc = options.doc || subject.doc()
  if (options.modify === undefined) options.modify = true
  const modify = options.modify
  const promptIcon: string = options.promptIcon || (lucideIcons.target as string) // lucide target (was noun_748003.svg)
  // const promptIcon = options.promptIcon || (iconBase + 'noun_25830.svg') //  paperclip
  const predicate = options.predicate || ns.wf('attachment')
  const noun = options.noun || 'attachment'

  const kb = store
  const attachmentOuter = div.appendChild(dom.createElement('table'))
  attachmentOuter.setAttribute('style', 'margin-top: 1em; margin-bottom: 1em;')
  const attachmentOne = attachmentOuter.appendChild(dom.createElement('tr'))
  const attachmentLeft = attachmentOne.appendChild(dom.createElement('td'))
  const attachmentRight = attachmentOne.appendChild(dom.createElement('td'))
  const attachmentTable = attachmentRight.appendChild(dom.createElement('table'))
  attachmentTable.appendChild(dom.createElement('tr')) // attachmentTableTop

  ;(attachmentOuter as any).refresh = refresh // Participate in downstream changes
  // ;(attachmentTable as any).refresh = refresh   <- outer should be best?

  refresh()

  if (modify) {
    // const buttonStyle = 'width; 2em; height: 2em; margin: 0.5em; padding: 0.1em;'
    const paperclip = button(dom, promptIcon, 'Drop attachments here')
    // paperclip.style = buttonStyle // @@ needed?  default has white background
    attachmentLeft.appendChild(paperclip)
    const fhandler = options.uploadFolder ? droppedFileHandler : null
    makeDropTarget(paperclip, droppedURIHandler, fhandler) // beware missing the wire of the paparclip!
    const paperclipImage = paperclip.querySelector('img')
    if (paperclipImage) {
      makeDropTarget(paperclipImage, droppedURIHandler, fhandler)
    }
    makeDropTarget(attachmentLeft, droppedURIHandler, fhandler) // just the outer won't do it

    if (options.uploadFolder) { // Addd an explicit file upload button as well
      const buttonDiv = fileUploadButtonDiv(dom, droppedFileHandler)
      attachmentLeft.appendChild(buttonDiv)
      // buttonDiv.children[1].style =  buttonStyle
    }
  }
  return attachmentOuter
}

// /////////////////////////////////////////////////////////////////////////////

/**
 * Event Handler for links within solid apps.
 *
 * Note that native links have constraints in Firefox, they
 * don't work with local files for instance (2011)
 */
export function openHrefInOutlineMode (e: Event) {
  e.preventDefault()
  e.stopPropagation()
  const target = utils.getTarget(e)
  const uri = target.getAttribute('href')
  if (!uri) return debug.log('openHrefInOutlineMode: No href found!\n')
  const dom = window.document
  if ((dom as any).outlineManager) {
    // @@ TODO Remove the use of document as a global object
    // TODO fix dependency cycle to solid-panes by calling outlineManager
    ;(dom as any).outlineManager.GotoSubject(store.sym(uri), true, undefined, true, undefined)
  } else if (window && (window as any).panes && (window as any).panes.getOutliner) {
    // @@ TODO Remove the use of window as a global object
    ;(window as any).panes
      .getOutliner()
      .GotoSubject(store.sym(uri), true, undefined, true, undefined)
  } else {
    debug.log('ERROR: Can\'t access outline manager in this config')
  }
  // dom.outlineManager.GotoSubject(store.sym(uri), true, undefined, true, undefined)
}

/**
 * Make a URI in the Tabulator.org annotation store out of the URI of the thing to be annotated.
 *
 * @@ Todo: make it a personal preference.
 */
export function defaultAnnotationStore (subject:NamedNode):NamedNode | undefined {
  if (subject.uri === undefined) return undefined
  let s = subject.uri
  if (s.slice(0, 7) !== 'http://') return undefined
  s = s.slice(7) // Remove
  const hash = s.indexOf('#')
  if (hash >= 0) s = s.slice(0, hash)
  // Strip trailing
  else {
    const slash = s.lastIndexOf('/')
    if (slash < 0) return undefined
    s = s.slice(0, slash)
  }
  return store.sym('http://tabulator.org/wiki/annnotation/' + s)
}

/**
 * Retrieve all RDF class URIs from solid-ui's RDF store
 * @returns an object `ret` such that `Object.keys(ret)` is
 * the list of all class URIs.
 */
export function allClassURIs (): { [uri: string]: boolean } {
  const set = {}
  store
    .statementsMatching(undefined, ns.rdf('type'), undefined)
    .forEach(function (st) {
      if (st.object.value) set[st.object.value] = true
    })
  store
    .statementsMatching(undefined, ns.rdfs('subClassOf'), undefined)
    .forEach(function (st) {
      if (st.object.value) set[st.object.value] = true
      if (st.subject.value) set[st.subject.value] = true
    })
  store
    .each(undefined, ns.rdf('type'), ns.rdfs('Class'))
    .forEach(function (c) {
      if (c.value) set[c.value] = true
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

export function propertyTriage (kb: IndexedFormula): any {
  const possibleProperties: any = {}
  // if (possibleProperties === undefined) possibleProperties = {}
  // const kb = store
  const dp = {}
  const op = {}
  let no = 0
  let nd = 0
  let nu = 0
  const pi = (kb as any).predicateIndex // One entry for each pred
  for (const p in pi) {
    const object = pi[p][0].object
    if (object.termType === 'Literal') {
      dp[p] = true
      nd++
    } else {
      op[p] = true
      no++
    }
  } // If nothing discovered, then could be either:
  const ps = kb.each(undefined, ns.rdf('type'), ns.rdf('Property'))
  for (let i = 0; i < ps.length; i++) {
    const p = ps[i].toNT()
    if (!op[p] && !dp[p]) {
      dp[p] = true
      op[p] = true
      nu++
    }
  }
  possibleProperties.op = op
  possibleProperties.dp = dp
  info(`propertyTriage: ${no} non-lit, ${nd} literal. ${nu} unknown.`)
  return possibleProperties
}

/**
 * General purpose widgets
 */

/**
 * A button for jumping
 */
export function linkButton (dom: HTMLDocument, object: NamedNode): HTMLElement {
  const b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.textContent = 'Goto ' + utils.label(object)
  b.addEventListener('click', function (_event) {
    // b.parentNode.removeChild(b)
    // TODO fix dependency cycle to solid-panes by calling outlineManager
    ;(dom as any).outlineManager.GotoSubject(object, true, undefined, true, undefined)
  }, true)
  return b
}

/**
 * A button to remove some other element from the page
 */
export function removeButton (dom: HTMLDocument, element: HTMLElement) {
  const b = dom.createElement('button')
  b.setAttribute('type', 'button')
  b.textContent = '✕' // MULTIPLICATION X
  b.addEventListener('click', function (_event) {
    ;(element as any).parentNode.removeChild(element)
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
    const box = dom.createElement('table')
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
export function selectorPanel (
  dom: HTMLDocument,
  kb: IndexedFormula,
  type: NamedNode,
  predicate: NamedNode,
  inverse: boolean,
  possible: NamedNode[],
  options: { connectIcon?: string },
  callbackFunction: (_x: NamedNode, _e: Event, _selected: boolean) => void,
  linkCallback: (_x: NamedNode, _e: Event, _inverse: boolean, _setStyleFunction: () => void) => void
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

export function selectorPanelRefresh (
  list: HTMLElement,
  dom: HTMLDocument,
  kb: IndexedFormula,
  type: NamedNode,
  predicate: NamedNode,
  inverse: boolean,
  possible: NamedNode[],
  options: { connectIcon?: string },
  callbackFunction: (_x: NamedNode, _e: Event, _selected: boolean) => void,
  linkCallback: (_x: NamedNode, _e: Event, _inverse: boolean, _setStyleFunction: () => void) => void
) {
  const style0 =
    'border: 0.1em solid #ddd; border-bottom: none; width: 95%; height: 2em; padding: 0.5em;'
  let selected: any = null
  list.innerHTML = ''

  const refreshItem = function (box: HTMLElement, x: NamedNode) {
    // Scope to hold item and x
    let item: any
    // eslint-disable-next-line prefer-const
    let image: HTMLImageElement

    const setStyle = function () {
      const already = inverse
        ? kb.each(undefined, predicate, x)
        : kb.each(x, predicate)
      iconDiv.setAttribute('class', already.length === 0 ? 'hideTillHover' : '') // See tabbedtab.css
      image.setAttribute(
        'src',
        options.connectIcon || lucideIcons.paperclip // was noun_25830.svg
      )
      image.setAttribute('title', already.length ? already.length : 'attach' as any)
    }
    const f = index.twoLine.widgetForClass(type)
    // eslint-disable-next-line prefer-const
    item = f(dom, x)
    item.setAttribute('style', style0)

    const nav = dom.createElement('div')
    nav.setAttribute('class', 'hideTillHover') // See tabbedtab.css
    nav.setAttribute('style', 'float:right; width:10%')

    const a = dom.createElement('a')
    a.setAttribute('href', x.uri)
    a.setAttribute('style', 'float:right')
    nav.appendChild(a).textContent = '>'
    box.appendChild(nav)

    const iconDiv = dom.createElement('div')
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

  for (let i = 0; i < possible.length; i++) {
    const box = dom.createElement('div')
    list.appendChild(box)
    refreshItem(box, possible[i])
  }
  return list
}

// ###########################################################################
//
//      Small compact views of things
//
export let index: any = {}
// ///////////////////////////////////////////////////////////////////////////
// We need these for anything which is a subject of an attachment.
//
// These should be moved to type-dependeent UI code. Related panes maybe

function twoLineDefault (dom: HTMLDocument, x: NamedNode): HTMLElement {
  // Default
  const box = dom.createElement('div')
  box.textContent = utils.label(x)
  return box
}

/**
 * Find a function that can create a widget for a given class
 * @param c The RDF class for which we want a widget generator function
 */
function twoLineWidgetForClass (c: NamedNode): (_dom: HTMLDocument, _x: NamedNode) => HTMLElement {
  let widget = index.twoLine[c.uri]
  const kb = store
  if (widget) return widget
  const sup = kb.findSuperClassesNT(c)
  for (const cl in sup) {
    widget = index.twoLine[kb.fromNT(cl).uri]
    if (widget) return widget
  }
  return index.twoLine['']
}

/**
 * Display a transaction
 * @param x Should have attributes through triples in store:
 *          * ns.qu('payee') -> a named node
 *          * ns.qu('date) -> a literal
 *          * ns.qu('amount') -> a literal
 */
function twoLineTransaction (dom: HTMLDocument, x: NamedNode): HTMLElement {
  let failed = ''
  const enc = function (p) {
    const y = store.any(x, ns.qu(p))
    if (!y) failed += '@@ No value for ' + p + '! '
    return y ? utils.escapeForXML(y.value) : '?' // @@@@
  }
  const box = dom.createElement('table')
  box.innerHTML = `
      <tr>
      <td colspan="2"> ${enc('payee')}</td>
      < /tr>
      < tr >
      <td>${enc('date').slice(0, 10)}</td>
      <td style = "text-align: right;">${enc('amount')}</td>
      </tr>`
  if (failed) {
    box.innerHTML = `
      <tr>
        <td><a href="${utils.escapeForXML(x.uri)}">${utils.escapeForXML(failed)}</a></td>
      </tr>`
  }
  return box
}

/**
 * Display a trip
 * @param x Should have attributes through triples in store:
 *          * ns.dc('title') -> a literal
 *          * ns.cal('dtstart') -> a literal
 *          * ns.cal('dtend') -> a literal
 */
function twoLineTrip (
  dom: HTMLDocument,
  x: NamedNode
): HTMLElement {
  const enc = function (p) {
    const y = store.any(x, p)
    return y ? utils.escapeForXML(y.value) : '?'
  }
  const box = dom.createElement('table')
  box.innerHTML = `
    <tr>
      <td colspan="2">${enc(ns.dc('title'))}</td>
    </tr>
    <tr style="color: #777">
      <td>${enc(ns.cal('dtstart'))}</td>
      <td>${enc(ns.cal('dtend'))}</td>
    </tr>`
  return box
}

/**
 * Stick a stylesheet link the document if not already there
 */
export function addStyleSheet (dom: HTMLDocument, href: string): void {
  const links = dom.querySelectorAll('link')
  for (let i = 0; i < links.length; i++) {
    if (
      (links[i].getAttribute('rel') || '') === 'stylesheet' &&
      (links[i].getAttribute('href') || '') === href
    ) {
      return
    }
  }
  const link = dom.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  dom.getElementsByTagName('head')[0].appendChild(link)
}

// Figure (or guess) whether this is an image, etc
//
export function isAudio (file?: NamedNode) {
  return isImage(file, 'audio')
}
export function isVideo (file?: NamedNode) {
  return isImage(file, 'video')
}
/**
 *
 */
export function isImage (file?: NamedNode, kind?: string): boolean {
  const dcCLasses = {
    audio: 'http://purl.org/dc/dcmitype/Sound',
    image: 'http://purl.org/dc/dcmitype/Image',
    video: 'http://purl.org/dc/dcmitype/MovingImage'
  }
  const what = kind || 'image'
  // See https://github.com/linkeddata/rdflib.js/blob/e367d5088c/src/formula.ts#L554
  //
  const typeURIs = store.findTypeURIs(file as any)
  // See https://github.com/linkeddata/rdflib.js/blob/d5000f/src/utils-js.js#L14
  // e.g.'http://www.w3.org/ns/iana/media-types/audio'
  const prefix: string = Util.mediaTypeClass(what + '/*').uri.split('*')[0]
  for (const t in typeURIs) {
    if (t.startsWith(prefix)) return true
  }
  if (dcCLasses[what] in typeURIs) return true
  return false
}

/**
 * File upload button
 * @param dom The DOM aka document
 * @param  droppedFileHandler Same handler function as drop, takes array of file objects
 * @returns {Element} - a div with a button and a inout in it
 * The input is hidden, as it is uglky - the user clicks on the nice icons and fires the input.
 */
// See https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
export function fileUploadButtonDiv (
  dom: HTMLDocument,
  droppedFileHandler: (_files: FileList) => void
) {
  const div = dom.createElement('div')
  const input = div.appendChild(dom.createElement('input'))
  input.setAttribute('type', 'file')
  input.setAttribute('multiple', 'true')
  input.addEventListener(
    'change',
    (event: any) => {
      debug.log('File drop event: ', event)
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

  ;(input as any).style = 'display:none'
  const buttonElt = div.appendChild(
    button(
      dom,
      lucideIcons.upload, // was noun_Upload_76574_000000.svg
      'Upload files',
      _event => {
        input.click()
      }
    )
  )
  makeDropTarget(buttonElt, null, droppedFileHandler) // Can also just drop on button
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
