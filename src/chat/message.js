/**  UI code for individual messages: display them, edit them
 *
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
// import * as rdf from 'rdflib' // pull in first avoid cross-refs
import * as style from '../style'
import * as utils from '../utils'
import * as widgets from '../widgets'

// const UI = { authn, icons, ns, media, pad, rdf, store, style, utils, widgets }

const dom = window.document

// const store = store

const messageBodyStyle = style.messageBodyStyle

const label = utils.label

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
  // widgets.makeDropTarget(img, handleURIsDroppedOnMugshot, droppedFileHandler)
  if (imageUri) img.setAttribute('src', imageUri)
  const anchor = dom.createElement('a')
  anchor.setAttribute('href', imageUri)
  anchor.setAttribute('target', 'images')
  anchor.appendChild(img)
  widgets.makeDraggable(img, $rdf.sym(imageUri))
  return anchor
}

const anchor = function (text, term) {
  // If there is no link return an element anyway
  const a = dom.createElement('a')
  if (term && term.uri) {
    a.setAttribute('href', term.uri)
    a.addEventListener('click', widgets.openHrefInOutlineMode, true)
    a.setAttribute('style', 'color: #3B5998; text-decoration: none; ') // font-weight: bold
  }
  a.textContent = text
  return a
}

function nick (person) {
  const s = store.any(person, ns.foaf('nick'))
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
    store.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (
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
    store.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (
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
 * Renders a chat message, read-only mode
 */
export function renderMessageRow (channelObject, bindings, fresh, options, userContext) {
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
    widgets.setImage(img, creator)
    td1.appendChild(img)
  } else {
    creatorAndDate(td1, creator, widgets.shortDate(dateString), message)
  }

  // Render the content ot the message itself
  const td2 = messageRow.appendChild(dom.createElement('td'))

  if (options.authorAboveContent) {
    creatorAndDateHorizontal(
      td2,
      creator,
      widgets.shortDate(dateString),
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
      ? pad.lightColorHash(creator)
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
  const toolsButton = widgets.button(
    dom,
    icons.iconBase + 'noun_243787.svg',
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
    const tools = messageToolbar(message, messageRow, userContext, channelObject)
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
export function renderMessageEditor (channelObject, messageTable, userContext, options, originalMessage) {
  async function sendMessage (text) {
    function revertEditing (messageEditor) {
      messageEditor.originalRow.style.display = 'block' // restore read-only version
      messageEditor.parentNode.removeChild(messageEditor)
    }
    await channelObject.div.refresh() // Add new day if nec
    const me = authn.currentUser() // Must be logged on or wuld have got login button
    if (!text) {
      field.setAttribute('style', messageBodyStyle + 'color: #bbb;') // pendingedit
      field.disabled = true
    }
    const { message, dateStamp, content, _chatDocument, sts } = await channelObject.createMessage(text || field.value)

    function sendComplete () {
      const bindings = {
        '?msg': message,
        '?content': content,
        '?date': dateStamp,
        '?creator': me
      }
      insertMessageIntoTable(channelObject, messageTable, bindings, false, options, userContext) // not green

      if (originalMessage) { // editing another message
        revertEditing(messageEditor)
      } else {
        if (!text) {
          field.value = '' // clear from out for reuse
          field.setAttribute('style', messageBodyStyle)
          field.disabled = false
          field.scrollIntoView(options.newestFirst) // allign bottom (top)
          field.focus() // Start typing next line immediately
          field.select()
        }
      }
    }
    try {
      await store.updater.update([], sts)
    } catch (err) {
      messageEditor.appendChild(
        widgets.errorMessageBlock(dom, 'Error writing message: ' + err)
      )
      return
    }
    sendComplete()
  } // sendMessage

  //    DRAG AND DROP
  function droppedFileHandler (files) {
    const base = messageTable.chatDocument.dir().uri
    widgets.uploadFiles(
      store.fetcher,
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

    // Body of turnOnInput

    let menuButton
    if (options.menuHandler) {
      const menuButton = widgets.button(
        dom, icons.iconBase + 'noun_243787.svg', 'More')
      menuButton.setAttribute('style', style.buttonStyle + 'float: right;')
      // menuButton.addEventListener('click', _event => sendMessage(), false) (done in turnoninput)
      rhs.appendChild(menuButton)
    }

    if (options.menuHandler && menuButton) {
      const me = authn.currentUser()
      const menuOptions = {
        me,
        dom,
        div: null, // @@ was: div
        newBase: messageTable.chatDocument.dir().uri
      }
      menuButton.addEventListener(
        'click',
        event => {
          options.menuHandler(event, channelObject.chatChannel, menuOptions)
        },
        false
      )
    }

    const me = authn.currentUser() // If already logged on
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
    widgets.makeDropTarget(field, droppedURIHandler, droppedFileHandler)

    rhs.innerHTML = ''
    sendButton = widgets.button(
      dom,
      icons.iconBase + 'noun_383448.svg',
      'Send'
    )
    sendButton.setAttribute('style', style.buttonStyle + 'float: right;')
    sendButton.addEventListener('click', _event => sendMessage(), false)
    rhs.appendChild(sendButton)

    const chatDocument = channelObject.dateFolder.leafDocumentFromDate(new Date())
    let imageDoc

    middle.appendChild(
      media.cameraButton(dom, store, getImageDoc, tookPicture)
    )

    pad.recordParticipation(channelObject.chatChannel, channelObject.chatChannel.doc()) // participation =
  } // turn on inpuut

  // Body of renderMessageEditor

  let sortDate
  if (originalMessage) {
    sortDate = store.anyValue(originalMessage, ns.dct('created'), null, originalMessage.doc())
  } else {
    sortDate = '9999-01-01T00:00:00Z' // ISO format for field sort
  }
  const messageEditor = dom.createElement('tr')
  const lhs = dom.createElement('td')
  const middle = dom.createElement('td')
  const rhs = dom.createElement('td')
  messageEditor.appendChild(lhs)
  messageEditor.appendChild(middle)
  messageEditor.appendChild(rhs)
  messageEditor.AJAR_date = sortDate
  messageEditor.appendChild(dom.createElement('br'))

  let field, sendButton
  const context = { div: middle, dom: dom }

  authn.logIn(context).then(context => {
    // me = context.me
    turnOnInput()
    Object.assign(context, userContext)
    findBookmarkDocument(context).then(_context => {
      // console.log('Bookmark file: ' + context.bookmarkDocument)
    })
  })

  return messageEditor
} // renderMessageEditor
