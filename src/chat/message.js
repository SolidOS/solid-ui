/**
 * Contains the [[renderMessage]] function,
 * along with [[elementForImageURI]],
 * [[creatorAndDate]], and [[creatorAndDateHorizontal]]
 * @packageDocumentation
 */

/* global $rdf */

import { messageToolbar, sentimentStripLinked } from './messageTools'

import { authn } from '../authn/index'
import { icons } from '../iconBase'
import { store } from '../logic'
import { media } from '../media/index'
import ns from '../ns'
import * as pad from '../pad'
import * as rdf from 'rdflib' // pull in first avoid cross-refs
import style from '../style'
import utils from '../utils'
import widgets from '../widgets'

const UI = { authn, icons, ns, media, pad, rdf, store, style, utils, widgets }

const dom = UI.dom || window.document
// const kb = UI.store

const messageBodyStyle = UI.style.messageBodyStyle

const label = UI.utils.label

/**
 * HTML component for an image
 */
export function elementForImageURI (imageUri, options) {
  const img = dom.createElement('img')
  let height = '10'
  if (options.inlineImageHeightEms) {
    height = ('' + options.inlineImageHeightEms).trim()
  }
  img.setAttribute(
    'style',
    'max-height: ' + height + 'em; border-radius: 1em; margin: 0.7em;'
  )
  // UI.widgets.makeDropTarget(img, handleURIsDroppedOnMugshot, droppedFileHandler)
  if (imageUri) img.setAttribute('src', imageUri)
  const anchor = dom.createElement('a')
  anchor.setAttribute('href', imageUri)
  anchor.setAttribute('target', 'images')
  anchor.appendChild(img)
  UI.widgets.makeDraggable(img, $rdf.sym(imageUri))
  return anchor
}

const anchor = function (text, term) {
  // If there is no link return an element anyway
  const a = dom.createElement('a')
  if (term && term.uri) {
    a.setAttribute('href', term.uri)
    a.addEventListener('click', UI.widgets.openHrefInOutlineMode, true)
    a.setAttribute('style', 'color: #3B5998; text-decoration: none; ') // font-weight: bold
  }
  a.textContent = text
  return a
}

function nick (person) {
  const s = UI.store.any(person, UI.ns.foaf('nick'))
  if (s) return '' + s.value
  return '' + label(person)
}

/**
 * Displays creator and date for a chat message
 * inside the `td1` element
 */
export function creatorAndDate (td1, creator, date, message) {
  const nickAnchor = td1.appendChild(anchor(nick(creator), creator))
  if (creator.uri) {
    UI.store.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (
      _ok,
      _body
    ) {
      nickAnchor.textContent = nick(creator)
    })
  }
  td1.appendChild(dom.createElement('br'))
  td1.appendChild(anchor(date, message))
}

/**
 * Horizontally displays creator and date for a chat message
 * inside the `td1` element
 */
export function creatorAndDateHorizontal (td1, creator, date, message) {
  const nickAnchor = td1.appendChild(anchor(label(creator), creator))
  if (creator.uri) {
    UI.store.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (
      _ok,
      _body
    ) {
      nickAnchor.textContent = nick(creator)
    })
  }
  const dateBit = td1.appendChild(anchor(date, message))
  dateBit.style.fontSize = '80%'
  dateBit.style.marginLeft = '1em'
  td1.appendChild(dom.createElement('br'))
}

/**
 * Renders a chat message inside a `messageTable`
 */
export function renderMessage (
  messageTable,
  bindings,
  fresh,
  options,
  userContext
) {
  const colorizeByAuthor =
    options.colorizeByAuthor === '1' || options.colorizeByAuthor === true

  const creator = bindings['?creator']
  const message = bindings['?msg']
  const date = bindings['?date']
  const content = bindings['?content']

  const dateString = date.value
  const messageRow = dom.createElement('tr')
  messageRow.AJAR_date = dateString
  messageRow.AJAR_subject = message

  if (options.selectedMessage && options.selectedMessage.sameTerm(message)) {
    messageRow.style.backgroundColor = 'yellow'
    options.selectedElement = messageRow
    messageTable.selectedElement = messageRow
  }

  let done = false
  for (let ele = messageTable.firstChild; ; ele = ele.nextSibling) {
    if (!ele) {
      // empty
      break
    }
    const newestFirst = options.newestfirst === true
    if (
      (dateString > ele.AJAR_date && newestFirst) ||
      (dateString < ele.AJAR_date && !newestFirst)
    ) {
      messageTable.insertBefore(messageRow, ele)
      done = true
      break
    }
  }
  if (!done) {
    messageTable.appendChild(messageRow)
  }

  const td1 = dom.createElement('td')
  messageRow.appendChild(td1)
  if (options.authorAboveContent) {
    const img = dom.createElement('img')
    img.setAttribute(
      'style',
      'max-height: 2.5em; max-width: 2.5em; border-radius: 0.5em; margin: auto;'
    )
    UI.widgets.setImage(img, creator)
    td1.appendChild(img)
  } else {
    creatorAndDate(td1, creator, UI.widgets.shortDate(dateString), message)
  }

  // Render the content ot the message itself
  const td2 = messageRow.appendChild(dom.createElement('td'))

  if (options.authorAboveContent) {
    creatorAndDateHorizontal(
      td2,
      creator,
      UI.widgets.shortDate(dateString),
      message
    )
  }
  const text = content.value.trim()
  const isURI = /^https?:\/[^ <>]*$/i.test(text)
  let para = null
  if (isURI) {
    const isImage = /\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(text) // @@ Should use content-type not URI
    if (isImage && options.expandImagesInline) {
      const img = elementForImageURI(text, options)
      td2.appendChild(img)
    } else {
      // Link but not Image
      const anc = td2.appendChild(dom.createElement('a'))
      para = anc.appendChild(dom.createElement('p'))
      anc.href = text
      para.textContent = text
      td2.appendChild(anc)
    }
  } else {
    // text
    para = dom.createElement('p')
    td2.appendChild(para)
    para.textContent = text
  }
  if (para) {
    const bgcolor = colorizeByAuthor
      ? UI.pad.lightColorHash(creator)
      : getBgColor(fresh)
    para.setAttribute(
      'style',
      messageBodyStyle + 'background-color: ' + bgcolor + ';'
    )
  }

  function getBgColor (fresh) {
    return fresh ? '#e8ffe8' : 'white'
  }

  // Sentiment strip
  const strip = sentimentStripLinked(message, message.doc())
  if (strip.children.length) {
    td2.appendChild(dom.createElement('br'))
    td2.appendChild(strip)
  }

  // Message tool bar button
  const td3 = dom.createElement('td')
  messageRow.appendChild(td3)
  const toolsButton = UI.widgets.button(
    dom,
    UI.icons.iconBase + 'noun_243787.svg',
    '...'
  )
  td3.appendChild(toolsButton)
  toolsButton.addEventListener('click', function (_event) {
    if (messageRow.toolTR) {
      // already got a toolbar? Toogle
      messageRow.parentNode.removeChild(messageRow.toolTR)
      delete messageRow.toolTR
      return
    }
    const toolsTR = dom.createElement('tr')
    const tools = messageToolbar(message, messageRow, userContext)
    tools.style =
      'border: 0.05em solid #888; border-radius: 0 0 0.7em 0.7em;  border-top: 0; height:3.5em; background-color: #fff;' // @@ fix
    if (messageRow.nextSibling) {
      messageRow.parentElement.insertBefore(toolsTR, messageRow.nextSibling)
    } else {
      messageRow.parentElement.appendChild(toolsTR)
    }
    messageRow.toolTR = toolsTR
    toolsTR.appendChild(dom.createElement('td')) // left
    const toolsTD = toolsTR.appendChild(dom.createElement('td'))
    toolsTR.appendChild(dom.createElement('td')) // right
    toolsTD.appendChild(tools)
  })
  return messageRow
}
