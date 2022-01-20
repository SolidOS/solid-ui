/**
 * Contains the [[insertMessageIntoTable]] function,
 * along with [[elementForImageURI]],
 * [[creatorAndDate]], and [[creatorAndDateHorizontal]]
 * @packageDocumentation
 */

/* global $rdf */
import { insertMessageIntoTable } from './infinite'

import { messageToolbar, sentimentStripLinked } from './messageTools'
import { findBookmarkDocument } from './bookmarks'

import { authn } from '../authn/index'
import { icons } from '../iconBase'
import { store } from '../logic'
import { media } from '../media/index'
import * as ns from '../ns'
import * as pad from '../pad'
import * as rdf from 'rdflib' // pull in first avoid cross-refs
import * as style from '../style'
import * as utils from '../utils'
import * as widgets from '../widgets'

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
 * Renders a chat message
 */
export function renderMessageRow (
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

/*       Control for a new message -- or editing an old message
 */
export function renderMessageEditor (messageTable, userContext, options, date, originalMessage) {
  const messageEditor = dom.createElement('tr')
  const lhs = dom.createElement('td')
  const middle = dom.createElement('td')
  const rhs = dom.createElement('td')
  messageEditor.appendChild(lhs)
  messageEditor.appendChild(middle)
  messageEditor.appendChild(rhs)
  messageEditor.AJAR_date = date || '9999-01-01T00:00:00Z' // ISO format for field sort
  let field, sendButton

  async function sendMessage (text) {
    const now = new Date()
    await addNewChatDocumentIfNewDay(now)

    if (!text) {
      field.setAttribute('style', messageBodyStyle + 'color: #bbb;') // pendingedit
      field.disabled = true
    }
    const { message, dateStamp, content, chatDocument, sts } = appendMsg(text || field.value)

    function sendComplete () {
      const bindings = {
        '?msg': message,
        '?content': content,
        '?date': dateStamp,
        '?creator': me
      }
      insertMessageIntoTable(messageTable, bindings, false, options, userContext) // not green

      if (originalMessage) { // editing another message
        messageEditor.parentNode.removeChild(messageEditor)
      } else {
        if (!text) {
          field.value = '' // clear from out for reuse
          field.setAttribute('style', messageBodyStyle)
          field.disabled = false
          field.scrollIntoView(newestFirst) // allign bottom (top)
          field.focus() // Start typing next line immediately
          field.select()
        }
      }
    }

    try {
      await updater.update([], sts)
    } catch (err) {
      messageEditor.appendChild(
        UI.widgets.errorMessageBlock(dom, 'Error writing message: ' + err)
      )
      return
    }
    sendComplete()
  } // sendMessage

  messageEditor.appendChild(dom.createElement('br'))

  //    DRAG AND DROP
  function droppedFileHandler (files) {
    const base = messageTable.chatDocument.dir().uri
    UI.widgets.uploadFiles(
      kb.fetcher,
      files,
      base + 'Files',
      base + 'Pictures',
      async function (theFile, destURI) {
        // @@@@@@ Wait for eachif several
        await sendMessage(destURI)
      }
    )
  }

  // When a set of URIs are dropped on the field
  const droppedURIHandler = async function (uris) {
    for (const uri of uris) {
      await sendMessage(uri)
    }
  }

  // When we are actually logged on
  function turnOnInput () {
    if (options.menuHandler && menuButton) {
      const menuOptions = {
        me,
        dom,
        div,
        newBase: messageTable.chatDocument.dir().uri
      }
      menuButton.addEventListener(
        'click',
        event => {
          options.menuHandler(event, chatChannel, menuOptions)
        },
        false
      )
    }

    // Turn on message input
    creatorAndDate(lhs, me, '', null)

    field = dom.createElement('textarea')
    middle.innerHTML = ''
    middle.appendChild(field)
    field.rows = 3
    // field.cols = 40
    field.setAttribute('style', messageBodyStyle + 'background-color: #eef;')

    // Trap the Enter BEFORE it is used ti make a newline
    field.addEventListener(
      'keydown',
      async function (e) {
        // User preference?
        if (e.keyCode === 13) {
          if (!e.altKey) {
            // Alt-Enter just adds a new line
            await sendMessage()
          }
        }
      },
      false
    )
    UI.widgets.makeDropTarget(field, droppedURIHandler, droppedFileHandler)

    rhs.innerHTML = ''
    sendButton = UI.widgets.button(
      dom,
      UI.icons.iconBase + 'noun_383448.svg',
      'Send'
    )
    sendButton.setAttribute('style', UI.style.buttonStyle + 'float: right;')
    sendButton.addEventListener('click', _event => sendMessage(), false)
    rhs.appendChild(sendButton)

    const chatDocument = dateFolder.leafDocumentFromDate(new Date())
    let imageDoc

    function getImageDoc () {
      imageDoc = $rdf.sym(
        chatDocument.dir().uri + 'Image_' + Date.now() + '.png'
      )
      return imageDoc
    }

    async function tookPicture (imageDoc) {
      if (imageDoc) {
        await sendMessage(imageDoc.uri)
      }
    }

    middle.appendChild(
      UI.media.cameraButton(dom, UI.store, getImageDoc, tookPicture)
    )

    UI.pad.recordParticipation(chatChannel, chatChannel.doc()) // participation =
  } // turn on inpuut

  const context = { div: middle, dom: dom }
  UI.authn.logIn(context).then(context => {
    // me = context.me
    turnOnInput()
    Object.assign(context, userContext)
    findBookmarkDocument(context).then(context => {
      // console.log('Bookmark file: ' + context.bookmarkDocument)
    })
  })

  return messageEditor
}
