/**  UI code for individual messages: display them, edit them
 *
 * @packageDocumentation
 */

/* global $rdf */
import { insertMessageIntoTable } from './infinite'
import { messageToolbar, sentimentStripLinked } from './messageTools'
import { findBookmarkDocument } from './bookmarks'
import { mostRecentVersion, originalVersion, allVersions } from './chatLogic'
import * as debug from '../debug'
import { icons } from '../iconBase'
import { store, authn } from 'solid-logic'
import { ensureLoggedIn } from '../login/login'
import { media } from '../media/index'
import * as ns from '../ns'
import * as pad from '../pad'
import * as style from '../style'
import * as utils from '../utils'
import * as widgets from '../widgets'
import { getBlankMsg, verifySignature, SEC } from './signature'
import { getPublicKey } from './keys'

const dom = window.document
const messageBodyStyle = style.messageBodyStyle

const label = utils.label

/**
 * elementForImageURI
 * HTML component for an image
 * @param imageUri
 * @param options { inlineImageHeightEms }
 * @returns HTMLAnchorElement For Image
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

function nickname (person) {
  const s = store.any(person, ns.foaf('nick'))
  if (s) return '' + s.value
  return '' + label(person)
}

/**
 * creatorAndDate
 * Displays creator and date for a chat message
 * inside the `td1` element
 * @param td1
 * @param creator
 * @param date
 * @param message
 * @returns HTMLAnchorElement For Image
 */
export function creatorAndDate (td1, creator, date, message) {
  const nickAnchor = td1.appendChild(anchor(nickname(creator), creator))
  if (creator.uri) {
    store.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (
      _ok,
      _body
    ) {
      nickAnchor.textContent = nickname(creator)
    })
  }
  td1.appendChild(dom.createElement('br'))
  td1.appendChild(anchor(date, message))
}

/**
 * creatorAndDateHorizontal
 * Horizontally displays creator and date for a chat message
 * inside the `td1` element
 * @param td1
 * @param creator
 * @param date
 * @param message
 * @returns HTMLAnchorElement For Image
 */
export function creatorAndDateHorizontal (td1, creator, date, message) {
  const nickAnchor = td1.appendChild(anchor(label(creator), creator))
  if (creator.uri) {
    store.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (
      _ok,
      _body
    ) {
      nickAnchor.textContent = nickname(creator)
    })
  }
  const dateBit = td1.appendChild(anchor(date, message))
  dateBit.style.fontSize = '80%'
  dateBit.style.marginLeft = '1em'
  td1.appendChild(dom.createElement('br'))
}

/**
 * renderMessageRow
 * Renders a chat message, read-only mode
 * @param channelObject
 * @param message
 * @param fresh
 * @param options
 * @param userContext
 * @returns Message Row HTML Table Element
 */
export async function renderMessageRow (channelObject, message, fresh, options, userContext) {
  let unsignedMessage = false
  const colorizeByAuthor =
    options.colorizeByAuthor === '1' || options.colorizeByAuthor === true

  // const id = store.any(latestVersion, ns.sioc('id'))
  // const replies = store.each(latestVersion, ns.sioc('has_reply'))

  const creator = store.any(message, ns.foaf('maker'))
  const date = store.any(message, ns.dct('created'))
  const latestVersion = await mostRecentVersion(message)
  debug.log('@@@@ alain mostRecentVersion')
  debug.log(message)
  debug.log(latestVersion)
  const latestVersionCreator = store.any(latestVersion, ns.foaf('maker'))

  // use latest content if same owner, else use original
  // this is may be too strict. Should we find latest valid version if any ?
  debug.log('@@@@ alain creator')
  debug.log(creator)
  debug.log(latestVersionCreator)
  const msgId = creator.uri === latestVersionCreator?.uri ? latestVersion : message
  const content = store.any(msgId, ns.sioc('content'))

  const versions = await allVersions(msgId)
  if (versions.length > 1) {
    debug.log('renderMessageRow versions: ', versions.join(',  '))
  }
  // be tolerant in accepting replies on any version of a message
  const replies = versions.map(version => store.each(version, ns.sioc('has_reply'))).flat()

  let thread = null
  const straightReplies = []
  for (const reply of replies) {
    if (store.holds(reply, ns.rdf('type'), ns.sioc('Thread'))) {
      thread = reply
      debug.log('renderMessageRow: found thread: ' + thread)
    } else {
      straightReplies.push(reply)
    }
  }
  if (straightReplies.length > 1) {
    debug.log('renderMessageRow: found normal replies: ', straightReplies)
  }
  debug.log('@@@@ is thread')
  if (!thread) {
    // thread = store.any(message, ns.sioc('has_reply'))
    thread = store.any(null, ns.sioc('has_member'), message)
  }
  // get signature
  const signature = store.any(msgId, $rdf.sym(`${SEC}proofValue`))

  // set proof message object
  const msg = getBlankMsg()
  msg.id = msgId.uri
  msg.created = store.any(msgId, ns.dct('created')).value
  msg.content = content.value
  msg.maker = creator.uri

  // verify signature
  if (!signature?.value) { // unsigned message
    unsignedMessage = true
    debug.warn(msgId.uri + ' is unsigned') // TODO replace with UI (colored message ?)
  } else { // signed message, get public key and check signature
    getPublicKey(creator).then(publicKey => {
      debug.log(creator.uri + '\n' + msg.created + '\n' + msg.id + '\n' + publicKey)
      if (!publicKey) {
        debug.warn('message is signed but ' + creator.uri + ' is missing publicKey')
      }
      // check that publicKey is a valid hex string
      const regex = /[0-9A-Fa-f]{6}/g
      if (!publicKey?.match(regex)) debug.warn('invalid publicKey hex string\n' + creator.uri + '\n' + publicKey)
      // verify signature
      else if (signature?.value && !verifySignature(signature?.value, msg, publicKey)) debug.warn('invalid signature\n' + msg.id)
    })
  }

  const originalMessage = await originalVersion(message)
  const edited = !message.sameTerm(originalMessage)
  // @@ load it first  @@   Or display the new data at the old date.
  // @@@ kludge!
  const sortDate = store.the(originalMessage, ns.dct('created'), null, originalMessage.doc()) || store.the(message, ns.dct('created'), null, message.doc())
  // In message

  const messageRow = dom.createElement('tr')
  if (unsignedMessage) messageRow.setAttribute('style', 'background-color: red')
  messageRow.AJAR_date = sortDate.value
  messageRow.AJAR_subject = message

  const td1 = dom.createElement('td')
  messageRow.appendChild(td1)
  if (!options.authorDateOnLeft) {
    const img = dom.createElement('img')
    img.setAttribute(
      'style',
      'max-height: 2.5em; max-width: 2.5em; border-radius: 0.5em; margin: auto;'
    )
    widgets.setImage(img, creator)
    td1.appendChild(img)
  } else {
    creatorAndDate(td1, creator, widgets.shortDate(sortDate.value), message)
  }
  let bothDates = widgets.shortDate(sortDate.value)
  if (edited) {
    bothDates += ' ... ' + widgets.shortDate(date.value)
  }

  // Render the content ot the message itself
  const td2 = messageRow.appendChild(dom.createElement('td'))

  if (!options.authorDateOnLeft) {
    creatorAndDateHorizontal(
      td2,
      creator,
      bothDates, // widgets.shortDate(dateString)
      message
    )
  }
  const text = content ? content.value.trim() : '??? no content?'
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
  const strip = await sentimentStripLinked(message, message.doc())
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
  toolsButton.addEventListener('click', async function (_event) {
    if (messageRow.toolTR) {
      // already got a toolbar? Toogle
      messageRow.parentNode.removeChild(messageRow.toolTR)
      delete messageRow.toolTR
      return
    }
    const toolsTR = dom.createElement('tr')
    const tools = await messageToolbar(message, messageRow, { ...userContext, chatOptions: options }, channelObject)
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
  if (thread && options.showThread) {
    debug.log('  message has thread ' + thread)
    td3.appendChild(widgets.button(
      dom,
      icons.iconBase + 'noun_1180164.svg', // right arrow .. @@ think of stg better
      'see thread',
      _e => {
        debug.log('@@@@ Calling showThread thread ' + thread)
        options.showThread(thread, options)
      }
    ))
  }
  return messageRow
} // END OF RENDERMESSAGE

export async function switchToEditor (messageRow, message, channelObject, userContext) {
  const messageTable = messageRow.parentNode
  const editRow = renderMessageEditor(channelObject, messageTable, userContext,
    channelObject.options, await mostRecentVersion(message))
  messageTable.insertBefore(editRow, messageRow)
  editRow.originalRow = messageRow
  messageRow.style.visibility = 'hidden' // Hide the original message. unhide if user cancels edit
}
/*       Control for a new message -- or editing an old message ***************
 *
 */
export function renderMessageEditor (channelObject, messageTable, userContext, options, originalMessage) {
  function revertEditing (messageEditor) {
    messageEditor.originalRow.style.visibility = 'visible' // restore read-only version
    messageEditor.parentNode.removeChild(messageEditor)
  }

  async function handleFieldInput (_event) {
    await sendMessage(field.value, true)
  }

  async function sendMessage (text, fromMainField) {
    async function sendComplete (message, _text2) {
      // const dateStamp = store.any(message, ns.dct('created'), null, message.doc())
      // const content = $rdf.literal(text2)
      await insertMessageIntoTable(channelObject, messageTable, message, false, options, userContext) // not green

      if (originalMessage) { // editing another message
        const oldRow = messageEditor.originalRow
        // oldRow.style.display = '' // restore read-only version, re-attack
        if (oldRow.parentNode) {
          oldRow.parentNode.removeChild(oldRow) // No longer needed old version
        } else {
          debug.warn('No parentNode on old message ' + oldRow.textContent)
          oldRow.style.backgroundColor = '#fee'
          oldRow.style.visibility = 'hidden' // @@ FIX THIS AND REMOVE FROM DOM INSTEAD
        }
        messageEditor.parentNode.removeChild(messageEditor) // no longer need editor
      } else {
        if (fromMainField) {
          field.value = '' // clear from out for reuse
          field.setAttribute('style', messageBodyStyle)
          field.disabled = false
          field.scrollIntoView(options.newestFirst) // allign bottom (top)
          field.focus() // Start typing next line immediately
          field.select()
        }
      }
      // await channelObject.div.refresh() // Add new day if nec  @@ add back
    }

    // const me = authn.currentUser() // Must be logged on or wuld have got login button
    if (fromMainField) {
      field.setAttribute('style', messageBodyStyle + 'color: #bbb;') // pendingedit
      field.disabled = true
    }

    let message
    try {
      message = await channelObject.updateMessage(text, originalMessage, null, options.thread)
    } catch (err) {
      const statusArea = userContext.statusArea || messageEditor
      statusArea.appendChild(
        widgets.errorMessageBlock(dom, 'Error writing message: ' + err)
      )
      return
    }
    await sendComplete(message, text)
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
        // @@@@@@ Wait for each if several
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
    if (originalMessage) {
      field.value = store.anyValue(originalMessage, ns.sioc('content'), null, originalMessage.doc())
    }
    // field.cols = 40
    field.setAttribute('style', messageBodyStyle + 'background-color: #eef;')

    // Trap the Enter BEFORE it is used ti make a newline

    field.addEventListener(
      'keydown',
      async function (e) {
        // User preference?
        if (e.code === 'Enter') {
        // if (e.keyCode === 13) { // deprocated https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
          if ((!e.shiftKey && !options.shiftEnterSendsMessage) || (e.shiftKey && options.shiftEnterSendsMessage)) {
            // Shift-Enter just adds a new line
            // (note alt-enter doesn't add newline anyway on my setup - so have to use shift.
            await handleFieldInput(e)
          }
        }
      },
      false
    )

    widgets.makeDropTarget(field, droppedURIHandler, droppedFileHandler)

    rhs.innerHTML = ''

    sendButton = widgets.button(dom, sendIcon, 'Send')
    sendButton.style.float = 'right'
    sendButton.addEventListener('click', _event => handleFieldInput(), false)
    rhs.appendChild(sendButton)

    if (originalMessage) { // Are we editing another message?
      const cancelButton = rhs.appendChild(widgets.cancelButton(dom))
      cancelButton.style.float = 'left'
      // cancelButton.firstChild.style.opacity = '0.3' // moved to buttons
      cancelButton.addEventListener('click', _event => revertEditing(messageEditor), false)
      rhs.appendChild(cancelButton)
    }

    const chatDocument = channelObject.dateFolder.leafDocumentFromDate(new Date())
    let imageDoc

    middle.appendChild(
      media.cameraButton(dom, store, getImageDoc, tookPicture)
    )

    pad.recordParticipation(channelObject.channel, channelObject.channel.doc()) // participation =
  } // turn on inpuut

  // Body of renderMessageEditor

  let sortDate, sendIcon
  if (originalMessage) {
    sortDate = store.anyValue(originalMessage, ns.dct('created'), null, originalMessage.doc())
    // text = store.anyValue(originalMessage, ns.sioc('content'), null, originalMessage.doc())
    sendIcon = icons.iconBase + 'noun_1180158.svg' // Green check
    // cancelIcon = icons.iconBase + 'noun_1180156.svg' // Black cross
  } else {
    sendIcon = icons.iconBase + 'noun_383448.svg'
    sortDate = '9999-01-01T00:00:00Z' // ISO format for field sort
    // text = ''
  }
  const messageEditor = dom.createElement('tr')
  const lhs = dom.createElement('td')
  const middle = dom.createElement('td')
  const rhs = dom.createElement('td')
  messageEditor.appendChild(lhs)
  messageEditor.appendChild(middle)
  messageEditor.appendChild(rhs)
  messageEditor.AJAR_date = sortDate
  // messageEditor.appendChild(dom.createElement('br'))

  let field, sendButton
  const context = { div: middle, dom }

  ensureLoggedIn(context).then(context => {
    // me = context.me
    turnOnInput()
    Object.assign(context, userContext)
    findBookmarkDocument(context).then(_context => {
      // debug.log('Bookmark file: ' + context.bookmarkDocument)
    })
  })

  return messageEditor
} // renderMessageEditor
