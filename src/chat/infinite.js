/**
 * Contains the [[infiniteMessageArea]] class
 * @packageDocumentation
 */
import { authn } from '../authn/index'
import * as debug from '../debug'
import { icons } from '../iconBase'
import { store } from '../logic'
import { media } from '../media/index'
import * as ns from '../ns'
import * as pad from '../pad'
import { DateFolder } from './dateFolder'
import { renderMessage, creatorAndDate } from './message'
import { findBookmarkDocument } from './bookmarks'

import * as $rdf from 'rdflib' // pull in first avoid cross-refs
import * as style from '../style'
import * as utils from '../utils'
import * as widgets from '../widgets'

const UI = { authn, icons, ns, media, pad, $rdf, store, style, utils, widgets }

/* global alert */

const SERVER_MKDIRP_BUG = false // Set false timbl 2021-10-31 should be fixed by now

export async function createIfNotExists (doc, contentType = 'text/turtle', data = '') {
  const fetcher = UI.store.fetcher
  let response
  try {
    response = await fetcher.load(doc)
  } catch (err) {
    if (err.response.status === 404) {
      debug.log(
        'createIfNotExists: doc does NOT exist, will create... ' + doc
      )
      try {
        response = await fetcher.webOperation('PUT', doc.uri, {
          data,
          contentType
        })
      } catch (err) {
        debug.log('createIfNotExists doc FAILED: ' + doc + ': ' + err)
        throw err
      }
      delete fetcher.requested[doc.uri] // delete cached 404 error
      // debug.log('createIfNotExists doc created ok ' + doc)
      return response
    } else {
      debug.log(
        'createIfNotExists doc load error NOT 404:  ' + doc + ': ' + err
      )
      throw err
    }
  }
  // debug.log('createIfNotExists: doc exists, all good: ' + doc)
  return response
}

export function desktopNotification (str) {
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    debug.warn('This browser does not support desktop notification')
  } else if (Notification.permission === 'granted') {
    // Let's check whether notification permissions have already been granted
    // eslint-disable-next-line no-new
    new Notification(str)
  } else if (Notification.permission !== 'denied') {
    // Otherwise, we need to ask the user for permission
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        // eslint-disable-next-line no-new
        new Notification(str)
      }
    })
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

/**
 * Common code for a chat (discussion area of messages about something)
 * This version runs over a series of files for different time periods
 *
 * Parameters for the whole chat like its title are stored on
 * index.ttl#this and the chats messages are stored in YYYY/MM/DD/chat.ttl
 */
export async function infiniteMessageArea (dom, kb, chatChannel, options) {
  kb = kb || UI.store
  const ns = UI.ns
  const WF = $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#')
  const DCT = $rdf.Namespace('http://purl.org/dc/terms/')
  // const POSIX = $rdf.Namespace('http://www.w3.org/ns/posix/stat#')

  options = options || {}

  const newestFirst = options.newestFirst === '1' || options.newestFirst === true // hack for now

  const dateFolder = new DateFolder(chatChannel, 'chat.ttl')

  options.authorAboveContent = true

  // var participation // An object tracking users use and prefs
  const messageBodyStyle = UI.style.messageBodyStyle

  // var messageBodyStyle = 'white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;'
  // 'font-size: 100%; margin: 0.1em 1em 0.1em 1em;  background-color: white; white-space: pre-wrap; padding: 0.1em;'

  const div = dom.createElement('div')
  let menuButton
  const statusArea = div.appendChild(dom.createElement('div'))
  const userContext = { dom, statusArea, div: statusArea } // logged on state, pointers to user's stuff
  let me

  const updater = UI.store.updater

  /** Does a file exist on the web?
   * @returns {Boolean}
   */
  /*
  async function documentExists (doc) {
    try {
      await kb.fetcher.load(doc)
    } catch (err) {
      if (err.response.status === 404) {
        return false
      } else {
        debug.log('documentExists: doc load error NOT 404:  ' + doc + ': ' + err)
        throw err
      }
    }
    return true
  }
*/

  /*       Form for a new message
   */
  function newMessageForm (messageTable) {
    const form = dom.createElement('tr')
    const lhs = dom.createElement('td')
    const middle = dom.createElement('td')
    const rhs = dom.createElement('td')
    form.appendChild(lhs)
    form.appendChild(middle)
    form.appendChild(rhs)
    form.AJAR_date = '9999-01-01T00:00:00Z' // ISO format for field sort
    let field, sendButton

    async function sendMessage (text) {
      const now = new Date()
      await addNewTableIfNewDay(now)

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
        renderMessage(liveMessageTable, bindings, false, options, userContext) // not green

        if (!text) {
          field.value = '' // clear from out for reuse
          field.setAttribute('style', messageBodyStyle)
          field.disabled = false
          field.scrollIntoView(newestFirst) // allign bottom (top)
          field.focus() // Start typing next line immediately
          field.select()
        }
      }

      if (
        SERVER_MKDIRP_BUG &&
        (kb.fetcher.requested[chatDocument.uri] === undefined ||
          kb.fetcher.requested[chatDocument.uri] === 404)
      ) {
        debug.log(
          '@@@ SERVER_MKDIRP_BUG: Should only happen once: create chat file: ' +
          chatDocument
        )
        await createIfNotExists(chatDocument)
        // Otherwise, create the document, if necessary, with a PATCH:
      }
      try {
        await updater.update([], sts)
      } catch (err) {
        form.appendChild(
          UI.widgets.errorMessageBlock(dom, 'Error writing message: ' + err)
        )
        return
      }
      sendComplete()
    } // sendMessage

    form.appendChild(dom.createElement('br'))

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
        imageDoc = kb.sym(
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
        UI.media.cameraButton(dom, kb, getImageDoc, tookPicture)
      )

      UI.pad.recordParticipation(chatChannel, chatChannel.doc()) // participation =
    } // turn on inpuut

    const context = { div: middle, dom: dom }
    UI.authn.logIn(context).then(context => {
      me = context.me
      turnOnInput()
      Object.assign(context, userContext)
      findBookmarkDocument(context).then(context => {
        debug.log('Bookmark file: ' + context.bookmarkDocument)
      })
    })

    return form
  }

  // ///////////////////////////////////////////////////////////////////////

  const appendMsg = function (newContent, oldMsg = {}, options = '') {
    const sts = []
    const now = new Date()
    const timestamp = '' + now.getTime()
    const dateStamp = $rdf.term(now)
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
    const chatDocument = options ? oldMsg.doc() : dateFolder.leafDocumentFromDate(now)
    const message = kb.sym(chatDocument.uri + '#' + 'Msg' + timestamp)
    const content = kb.literal(newContent)

    if (oldMsg && options === 'delete') {
      sts.push(
        new $rdf.Statement(replacingMsg(oldMsg), ns.schema('dateDeleted'), dateStamp, chatDocument)
      )
    } else {
      if (oldMsg && options === 'edit') {
        sts.push(
          new $rdf.Statement(replacingMsg(oldMsg), ns.dct('isReplacedBy'), message, chatDocument)
        )
      }
      sts.push(
        new $rdf.Statement(
          message,
          ns.sioc('content'),
          kb.literal(newContent),
          chatDocument
        )
      )
      sts.push(
        new $rdf.Statement(message, ns.dct('created'), dateStamp, chatDocument)
      )
      if (me) {
        sts.push(
          new $rdf.Statement(message, ns.foaf('maker'), me, chatDocument)
        )
      }
      return { message, dateStamp, content, chatDocument, sts }
    }
  }

  function nick (person) {
    const s = UI.store.any(person, UI.ns.foaf('nick'))
    if (s) return '' + s.value
    return '' + utils.label(person)
  }

  function syncMessages (about, messageTable) {
    const displayed = {}
    let ele, ele2
    for (ele = messageTable.firstChild; ele; ele = ele.nextSibling) {
      if (ele.AJAR_subject) {
        displayed[ele.AJAR_subject.uri] = true
      }
    }

    const messages = kb
      .statementsMatching(
        about,
        ns.wf('message'),
        null,
        messageTable.chatDocument
      )
      .map(st => {
        return st.object
      })
    const stored = {}
    messages.forEach(function (m) {
      stored[m.uri] = true
      if (!displayed[m.uri]) {
        addMessage(m, messageTable)
      }
    })

    // eslint-disable-next-line space-in-parens
    for (ele = messageTable.firstChild; ele;) {
      ele2 = ele.nextSibling
      if (ele.AJAR_subject && !stored[ele.AJAR_subject.uri]) {
        messageTable.removeChild(ele)
      }
      ele = ele2
    }
    for (ele = messageTable.firstChild; ele; ele = ele.nextSibling) {
      if (ele.AJAR_subject) {
        // Refresh thumbs up etc
        UI.widgets.refreshTree(ele) // Things inside may have changed too
      }
    }
  } // syncMessages

  function addMessage (message, messageTable) {
    let content
    if (kb.any(replacingMsg(message))) {
      content = kb.any(replacingMsg(message), ns.sioc('content'))
    } else {
      content = kb.literal('message deleted')
    }
    const bindings = {
      '?msg': message,
      '?creator': kb.any(message, ns.foaf('maker')),
      '?date': kb.any(message, DCT('created')),
      '?content': content // kb.any(replacingMsg(message), ns.sioc('content'))
    }
    renderMessage(
      messageTable,
      bindings,
      messageTable.fresh,
      options,
      userContext
    ) // fresh from elsewhere
  }

  const replacingMsg = function (message) {
    let msg = message
    while (msg) {
      message = msg
      msg = kb.any(message, DCT('isReplacedBy'))
    }
    if (kb.any(message, ns.schema('dateDeleted'))) {
      return ns.schema('dateDeleted') // message has been deleted
    }
    return message
  }
  // ////////

  /* Add a new messageTable at the top/bottom
   */
  async function insertPreviousMessages (backwards) {
    const extremity = backwards ? earliest : latest
    let date = extremity.messageTable.date // day in mssecs

    date = await dateFolder.loadPrevious(date, backwards) // backwards
    debug.log(
      `insertPreviousMessages: from ${
        backwards ? 'backwards' : 'forwards'
      } loadPrevious: ${date}`
    )
    if (!date && !backwards && !liveMessageTable) {
      await appendCurrentMessages() // If necessary skip to today and add that
    }
    if (!date) return true // done
    let live = false
    if (!backwards) {
      const todayDoc = dateFolder.leafDocumentFromDate(new Date())
      const doc = dateFolder.leafDocumentFromDate(date)
      live = doc.sameTerm(todayDoc) // Is this todays?
    }
    const newMessageTable = await createMessageTable(date, live)
    extremity.messageTable = newMessageTable // move pointer to earliest
    if (backwards ? newestFirst : !newestFirst) {
      // put on bottom or top
      div.appendChild(newMessageTable)
    } else {
      // put on top as we scroll back
      div.insertBefore(newMessageTable, div.firstChild)
    }
    return live // not done
  }

  /* Remove message tables earlier than this one
   */
  function removePreviousMessages (backwards, messageTable) {
    if (backwards ? newestFirst : !newestFirst) {
      // it was put on bottom
      while (messageTable.nextSibling) {
        div.removeChild(messageTable.nextSibling)
      }
    } else {
      // it was put on top as we scroll back
      while (messageTable.previousSibling) {
        div.removeChild(messageTable.previousSibling)
      }
    }
    const extr = backwards ? earliest : latest
    extr.messageTable = messageTable
  }

  /* Load and render message table
   ** @returns DOM element generates
   */
  async function createMessageTable (date, live) {
    debug.log('   createMessageTable for  ' + date)
    const chatDocument = dateFolder.leafDocumentFromDate(date)
    try {
      await kb.fetcher.load(chatDocument)
    } catch (err) {
      const messageTable = dom.createElement('table')
      const statusTR = messageTable.appendChild(dom.createElement('tr')) // ### find status in exception
      if (err.response && err.response.status && err.response.status === 404) {
        debug.log('Error 404 for chat file ' + chatDocument)
        return renderMessageTable(date, live) // no mssage file is fine.. will be craeted later
        // statusTR.appendChild(UI.widgets.errorMessageBlock(dom, 'no message file', 'white'))
      } else {
        debug.log('*** Error NON 404 for chat file ' + chatDocument)
        statusTR.appendChild(UI.widgets.errorMessageBlock(dom, err, 'pink'))
      }
      return statusTR
    }
    return renderMessageTable(date, live)
  }

  function renderMessageTable (date, live) {
    let scrollBackButton
    let scrollForwardButton

    /// /////////////////   Scroll down adding more above

    async function extendBackwards () {
      const done = await insertPreviousMessages(true)
      if (done) {
        if (scrollBackButton) {
          scrollBackButton.firstChild.setAttribute(
            'src',
            UI.icons.iconBase + 'noun_T-Block_1114655_000000.svg'
          ) // T
          scrollBackButton.disabled = true
        }
        messageTable.initial = true
      } else {
        messageTable.extendedBack = true
      }
      setScrollBackButtonIcon()
      return done
    }

    function setScrollBackButtonIcon () {
      if (!scrollBackButton) {
        return
      }
      const sense = messageTable.extendedBack ? !newestFirst : newestFirst
      const scrollBackIcon = messageTable.initial
        ? 'noun_T-Block_1114655_000000.svg'
        : getScrollbackIcon(sense)
      scrollBackButton.firstChild.setAttribute(
        'src',
        UI.icons.iconBase + scrollBackIcon
      )

      function getScrollbackIcon (sense) {
        return sense ? 'noun_1369241.svg' : 'noun_1369237.svg'
      }
    }

    async function scrollBackButtonHandler (_event) {
      if (messageTable.extendedBack) {
        removePreviousMessages(true, messageTable)
        messageTable.extendedBack = false
        setScrollBackButtonIcon()
      } else {
        await extendBackwards()
      }
    }

    /// ////////////// Scroll up adding more below

    async function extendForwards () {
      const done = await insertPreviousMessages(false)
      if (done) {
        scrollForwardButton.firstChild.setAttribute(
          'src',
          UI.icons.iconBase + 'noun_T-Block_1114655_000000.svg'
        )
        scrollForwardButton.disabled = true
        messageTable.final = true
      } else {
        messageTable.extendedForwards = true
      }
      setScrollForwardButtonIcon()
      return done
    }

    function setScrollForwardButtonIcon () {
      const sense = messageTable.extendedForwards ? !newestFirst : newestFirst // noun_T-Block_1114657_000000.svg
      const scrollForwardIcon = messageTable.final
        ? 'noun_T-Block_1114657_000000.svg'
        : getScrollForwardButtonIcon(sense)
      scrollForwardButton.firstChild.setAttribute(
        'src',
        UI.icons.iconBase + scrollForwardIcon
      )

      function getScrollForwardButtonIcon (sense) {
        return !sense ? 'noun_1369241.svg' : 'noun_1369237.svg'
      }
    }

    async function scrollForwardButtonHandler (_event) {
      if (messageTable.extendedForwards) {
        removePreviousMessages(false, messageTable)
        messageTable.extendedForwards = false
        setScrollForwardButtonIcon()
      } else {
        await extendForwards() // async
        latest.messageTable.scrollIntoView(newestFirst)
      }
    }

    /// ///////////////////////

    const messageTable = dom.createElement('table')
    messageTable.extendBackwards = extendBackwards // Make function available to scroll stuff
    messageTable.extendForwards = extendForwards // Make function available to scroll stuff

    messageTable.date = date
    const chatDocument = dateFolder.leafDocumentFromDate(date)
    messageTable.chatDocument = chatDocument

    messageTable.fresh = false
    messageTable.setAttribute('style', 'width: 100%;') // fill that div!
    if (live) {
      messageTable.final = true
      liveMessageTable = messageTable
      latest.messageTable = messageTable
      const tr = newMessageForm(messageTable)
      if (newestFirst) {
        messageTable.insertBefore(tr, messageTable.firstChild) // If newestFirst
      } else {
        messageTable.appendChild(tr) // not newestFirst
      }
      messageTable.inputRow = tr
    }

    /// ///// Infinite scroll
    //
    // @@ listen for swipe past end event not just button
    if (options.infinite) {
      const scrollBackButtonTR = dom.createElement('tr')
      const scrollBackButtonCell = scrollBackButtonTR.appendChild(
        dom.createElement('td')
      )
      // up traingles: noun_1369237.svg
      // down triangles: noun_1369241.svg
      const scrollBackIcon = newestFirst
        ? 'noun_1369241.svg'
        : 'noun_1369237.svg' // down and up arrows respoctively
      scrollBackButton = UI.widgets.button(
        dom,
        UI.icons.iconBase + scrollBackIcon,
        'Previous messages ...'
      )
      scrollBackButtonCell.style = 'width:3em; height:3em;'
      scrollBackButton.addEventListener('click', scrollBackButtonHandler, false)
      messageTable.extendedBack = false
      scrollBackButtonCell.appendChild(scrollBackButton)
      setScrollBackButtonIcon()

      const dateCell = scrollBackButtonTR.appendChild(dom.createElement('td'))
      dateCell.style =
        'text-align: center; vertical-align: middle; color: #888; font-style: italic;'
      dateCell.textContent = UI.widgets.shortDate(date.toISOString(), true) // no time, only date

      // @@@@@@@@@@@ todo move this button to other end of  message cell, o
      const scrollForwardButtonCell = scrollBackButtonTR.appendChild(
        dom.createElement('td')
      )
      const scrollForwardIcon = newestFirst
        ? 'noun_1369241.svg'
        : 'noun_1369237.svg' // down and up arrows respoctively
      scrollForwardButton = UI.widgets.button(
        dom,
        UI.icons.iconBase + scrollForwardIcon,
        'Later messages ...'
      )
      scrollForwardButtonCell.appendChild(scrollForwardButton)
      scrollForwardButtonCell.style = 'width:3em; height:3em;'
      scrollForwardButton.addEventListener(
        'click',
        scrollForwardButtonHandler,
        false
      )
      messageTable.extendedForward = false
      setScrollForwardButtonIcon()

      messageTable.extendedForwards = false

      if (!newestFirst) {
        // opposite end from the entry field
        messageTable.insertBefore(scrollBackButtonTR, messageTable.firstChild) // If not newestFirst
      } else {
        messageTable.appendChild(scrollBackButtonTR) //  newestFirst
      }
    }

    const sts = kb.statementsMatching(null, WF('message'), null, chatDocument)
    if (!live && sts.length === 0) {
      // not todays
      // no need buttomns at the moment
      // messageTable.style.visibility = 'collapse' // Hide files with no messages
    }
    sts.forEach(st => {
      addMessage(st.object, messageTable)
    })
    messageTable.fresh = true

    // loadMessageTable(messageTable, chatDocument)
    messageTable.fresh = false
    return messageTable
  } // renderMessageTable

  async function addNewTableIfNewDay (now) {
    // let now = new Date()
    // @@ Remove listener from previous table as it is now static
    const newChatDocument = dateFolder.leafDocumentFromDate(now)
    if (!newChatDocument.sameTerm(latest.messageTable.chatDocument)) {
      // It is a new day
      if (liveMessageTable.inputRow) {
        liveMessageTable.removeChild(liveMessageTable.inputRow)
        delete liveMessageTable.inputRow
      }
      const oldChatDocument = latest.messageTable.chatDocument
      await appendCurrentMessages()
      // Adding a link in the document will ping listeners to add the new block too
      if (
        !kb.holds(
          oldChatDocument,
          ns.rdfs('seeAlso'),
          newChatDocument,
          oldChatDocument
        )
      ) {
        const sts = [
          $rdf.st(
            oldChatDocument,
            ns.rdfs('seeAlso'),
            newChatDocument,
            oldChatDocument
          )
        ]
        updater.update([], sts, function (ok, body) {
          if (!ok) {
            alert('Unable to link old message block to new one.' + body)
          }
        })
      }
    }
  }

  /*
  function messageCount () {
    var n = 0
    const tables = div.children
    for (let i = 0; i < tables.length; i++) {
      n += tables[i].children.length - 1
      // debug.log('    table length:' + tables[i].children.length)
    }
    return n
  }
*/

  /* Add the live message block with entry field for today
   */
  async function appendCurrentMessages () {
    const now = new Date()
    const chatDocument = dateFolder.leafDocumentFromDate(now)

    /*   Don't actually make the documemnt until a message is sent  @@@@@ WHEN SERVER FIXED
     * currently server won't patch to a file ina non-existent directory
     */
    /*
    if (SERVER_MKDIRP_BUG) {
      try {
        await createIfNotExists(chatDocument)
      } catch (e) {
        div.appendChild(UI.widgets.errorMessageBlock(
          dom, 'Problem accessing chat file: ' + e))
        return
      }
    }
    */
    /// ///////////////////////////////////////////////////////////
    const messageTable = await createMessageTable(now, true)
    div.appendChild(messageTable)
    div.refresh = function () {
      // only the last messageTable is live
      addNewTableIfNewDay(new Date()).then(() => {
        syncMessages(chatChannel, messageTable)
        desktopNotification(chatChannel)
      })
    } // The short chat version fors live update in the pane but we do it in the widget
    kb.updater.addDownstreamChangeListener(chatDocument, div.refresh) // Live update
    liveMessageTable = messageTable
    latest.messageTable = liveMessageTable
    return messageTable
  }

  let liveMessageTable
  const earliest = { messageTable: null } // Stuff about each end of the loaded days
  const latest = { messageTable: null }

  let lock = false

  async function loadMoreWhereNeeded (event, fixScroll) {
    if (lock) return
    lock = true
    const freeze = !fixScroll
    const magicZone = 150
    // const top = div.scrollTop
    // const bottom = div.scrollHeight - top - div.clientHeight
    let done

    while (
      div.scrollTop < magicZone &&
      earliest.messageTable &&
      !earliest.messageTable.initial &&
      earliest.messageTable.extendBackwards
    ) {
      // If this has been called before the element is actually in the
      // user's DOM tree, then this scrollTop check won't work -> loop forever
      // https://github.com/solid/solid-ui/issues/366
      if (div.scrollHeight === 0) {
        // console.log('    chat/loadMoreWhereNeeded: trying later...')
        setTimeout(loadMoreWhereNeeded, 2000) // couple be less
        lock = false
        return // abandon now, do later
      }
      // console.log('    chat/loadMoreWhereNeeded: Going now')
      const scrollBottom = div.scrollHeight - div.scrollTop
      debug.log('infinite scroll: adding above: top ' + div.scrollTop)
      done = await earliest.messageTable.extendBackwards()
      if (freeze) {
        div.scrollTop = div.scrollHeight - scrollBottom
      }
      if (fixScroll) fixScroll()
      if (done) break
    }
    while (
      options.selectedMessage && // we started in the middle not at the bottom
      div.scrollHeight - div.scrollTop - div.clientHeight < magicZone && // we are scrolled right to the bottom
      latest.messageTable &&
      !latest.messageTable.final && // there is more data to come
      latest.messageTable.extendForwards
    ) {
      const scrollTop = div.scrollTop
      debug.log(
        'infinite scroll: adding below: bottom: ' +
        (div.scrollHeight - div.scrollTop - div.clientHeight)
      )
      done = await latest.messageTable.extendForwards() // then add more data on the bottom
      if (freeze) {
        div.scrollTop = scrollTop // while adding below keep same things in view
      }
      if (fixScroll) fixScroll()
      if (done) break
    }
    lock = false
  }

  async function loadInitialContent () {
    function yank () {
      selectedMessageTable.selectedElement.scrollIntoView({ block: 'center' })
    }

    // During initial load ONLY keep scroll to selected thing or bottom
    function fixScroll () {
      if (options.selectedElement) {
        options.selectedElement.scrollIntoView({ block: 'center' }) // align tops or bottoms
      } else {
        if (liveMessageTable.inputRow.scrollIntoView) {
          liveMessageTable.inputRow.scrollIntoView(newestFirst) // align tops or bottoms
        }
      }
    }

    let live, selectedDocument
    if (options.selectedMessage) {
      selectedDocument = options.selectedMessage.doc()
      const now = new Date()
      const todayDocument = dateFolder.leafDocumentFromDate(now)
      live = todayDocument.sameTerm(selectedDocument)
    }
    let selectedMessageTable
    if (options.selectedMessage && !live) {
      const selectedDate = dateFolder.dateFromLeafDocument(selectedDocument)
      selectedMessageTable = await createMessageTable(selectedDate, live)
      div.appendChild(selectedMessageTable)
      earliest.messageTable = selectedMessageTable
      latest.messageTable = selectedMessageTable
      yank()
      setTimeout(yank, 1000) // @@ kludge - restore position distubed by other cHANGES
    } else {
      // Live end
      await appendCurrentMessages()
      earliest.messageTable = liveMessageTable
      latest.messageTable = liveMessageTable
    }

    await loadMoreWhereNeeded(null, fixScroll)
    div.addEventListener('scroll', loadMoreWhereNeeded)
    if (options.solo) {
      document.body.addEventListener('scroll', loadMoreWhereNeeded)
    }
  }

  await loadInitialContent()
  return div
}
