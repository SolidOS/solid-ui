/**
 * Contains the [[infiniteMessageArea]] class
 * @packageDocumentation
 */
// import { authn } from '../authn/index'
import * as debug from '../debug'
import { icons } from '../iconBase'
import { store } from '../logic'
// import { media } from '../media/index'
import * as ns from '../ns'
// import * as pad from '../pad'
// import { DateFolder } from './dateFolder'
import { mostRecentVersion, ChatChannel } from './chatLogic'
import { renderMessageEditor, renderMessageRow } from './message'
// import { findBookmarkDocument } from './bookmarks'

import * as $rdf from 'rdflib' // pull in first avoid cross-refs
// import * as style from '../style'
// import * as utils from '../utils'
import * as widgets from '../widgets'

// const UI = { authn, icons, ns, media, pad, $rdf, store, style, utils, widgets }

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
 * Renders a chat message inside a `messageTable`
 */
export function insertMessageIntoTable (channelObject, messageTable, bindings, fresh, options, userContext) {
  const messageRow = renderMessageRow(channelObject,
    bindings,
    fresh,
    options,
    userContext
  )
  const message = messageRow.AJAR_subject
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
    const dateString = messageRow.AJAR_date
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
}

/**
 * Common code for a chat (discussion area of messages about something)
 * This version runs over a series of files for different time periods
 *
 * Parameters for the whole chat like its title are stored on
 * index.ttl#this and the chats messages are stored in YYYY/MM/DD/chat.ttl
 *
 * Use to import store as param 2, now ignores it and uses the UI main store
 */
export async function infiniteMessageArea (dom, wasStore, chatChannel, options) {
  // ///////////////////////////////////////////////////////////////////////

  function syncMessages (about, messageTable) {
    const displayed = {}
    let ele, ele2
    for (ele = messageTable.firstChild; ele; ele = ele.nextSibling) {
      if (ele.AJAR_subject) {
        displayed[ele.AJAR_subject.uri] = true
      }
    }

    const messages = store
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
        widgets.refreshTree(ele) // Things inside may have changed too
      }
    }
  } // syncMessages

  function addMessage (message, messageTable) {
    let content
    if (store.any(mostRecentVersion(message))) {
      content = store.any(mostRecentVersion(message), ns.sioc('content'))
    } else {
      content = store.literal('message deleted')
    }
    const bindings = {
      '?msg': message,
      '?creator': store.any(message, ns.foaf('maker')),
      '?date': store.any(message, ns.dct('created')),
      '?content': content // store.any(mostRecentVersion(message), ns.sioc('content'))
    }
    insertMessageIntoTable(channelObject,
      messageTable,
      bindings,
      messageTable.fresh,
      options,
      userContext
    ) // fresh from elsewhere
  }

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
      await store.fetcher.load(chatDocument)
    } catch (err) {
      const messageTable = dom.createElement('table')
      const statusTR = messageTable.appendChild(dom.createElement('tr')) // ### find status in exception
      if (err.response && err.response.status && err.response.status === 404) {
        debug.log('Error 404 for chat file ' + chatDocument)
        return renderMessageTable(date, live) // no mssage file is fine.. will be craeted later
        // statusTR.appendChild(widgets.errorMessageBlock(dom, 'no message file', 'white'))
      } else {
        debug.log('*** Error NON 404 for chat file ' + chatDocument)
        statusTR.appendChild(widgets.errorMessageBlock(dom, err, 'pink'))
      }
      return statusTR
    }
    return renderMessageTable(date, live)
  }

  function renderMessageTable (date, live) {
    let scrollBacstoreutton
    let scrollForwardButton

    /// /////////////////   Scroll down adding more above

    async function extendBackwards () {
      const done = await insertPreviousMessages(true)
      if (done) {
        if (scrollBacstoreutton) {
          scrollBacstoreutton.firstChild.setAttribute(
            'src',
            icons.iconBase + 'noun_T-Block_1114655_000000.svg'
          ) // T
          scrollBacstoreutton.disabled = true
        }
        messageTable.initial = true
      } else {
        messageTable.extendedBack = true
      }
      setScrollBacstoreuttonIcon()
      return done
    }

    function setScrollBacstoreuttonIcon () {
      if (!scrollBacstoreutton) {
        return
      }
      const sense = messageTable.extendedBack ? !newestFirst : newestFirst
      const scrollBackIcon = messageTable.initial
        ? 'noun_T-Block_1114655_000000.svg'
        : getScrollbackIcon(sense)
      scrollBacstoreutton.firstChild.setAttribute(
        'src',
        icons.iconBase + scrollBackIcon
      )

      function getScrollbackIcon (sense) {
        return sense ? 'noun_1369241.svg' : 'noun_1369237.svg'
      }
    }

    async function scrollBacstoreuttonHandler (_event) {
      if (messageTable.extendedBack) {
        removePreviousMessages(true, messageTable)
        messageTable.extendedBack = false
        setScrollBacstoreuttonIcon()
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
          icons.iconBase + 'noun_T-Block_1114655_000000.svg'
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
        icons.iconBase + scrollForwardIcon
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
    /*
    options = options || {}
    options.authorAboveContent = true
    const newestFirst = options.newestFirst === '1' || options.newestFirst === true // hack for now
    const channelObject = new ChatChannel(chatChannel, options)
    const dateFolder = channelObject.dateFolder

    const div = dom.createElement('div')
    const statusArea = div.appendChild(dom.createElement('div'))
    const userContext = { dom, statusArea, div: statusArea } // logged on state, pointers to user's stuff

*/
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
      const tr = renderMessageEditor(channelObject, messageTable, userContext, options)
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
      const scrollBacstoreuttonTR = dom.createElement('tr')
      const scrollBacstoreuttonCell = scrollBacstoreuttonTR.appendChild(
        dom.createElement('td')
      )
      // up traingles: noun_1369237.svg
      // down triangles: noun_1369241.svg
      const scrollBackIcon = newestFirst
        ? 'noun_1369241.svg'
        : 'noun_1369237.svg' // down and up arrows respoctively
      scrollBacstoreutton = widgets.button(
        dom,
        icons.iconBase + scrollBackIcon,
        'Previous messages ...'
      )
      scrollBacstoreuttonCell.style = 'width:3em; height:3em;'
      scrollBacstoreutton.addEventListener('click', scrollBacstoreuttonHandler, false)
      messageTable.extendedBack = false
      scrollBacstoreuttonCell.appendChild(scrollBacstoreutton)
      setScrollBacstoreuttonIcon()

      const dateCell = scrollBacstoreuttonTR.appendChild(dom.createElement('td'))
      dateCell.style =
        'text-align: center; vertical-align: middle; color: #888; font-style: italic;'
      dateCell.textContent = widgets.shortDate(date.toISOString(), true) // no time, only date

      // @@@@@@@@@@@ todo move this button to other end of  message cell, o
      const scrollForwardButtonCell = scrollBacstoreuttonTR.appendChild(
        dom.createElement('td')
      )
      const scrollForwardIcon = newestFirst
        ? 'noun_1369241.svg'
        : 'noun_1369237.svg' // down and up arrows respoctively
      scrollForwardButton = widgets.button(
        dom,
        icons.iconBase + scrollForwardIcon,
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
        messageTable.insertBefore(scrollBacstoreuttonTR, messageTable.firstChild) // If not newestFirst
      } else {
        messageTable.appendChild(scrollBacstoreuttonTR) //  newestFirst
      }
    }

    const sts = store.statementsMatching(null, ns.wf('message'), null, chatDocument)
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

  async function addNewChatDocumentIfNewDay () {
    // @@ Remove listener from previous table as it is now static
    const newChatDocument = dateFolder.leafDocumentFromDate(new Date())
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
        !store.holds(
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
        try {
          store.updater.update([], sts)
        } catch (err) {
          alert('Unable to link old chat file to new one:' + err)
        }
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

    /// ///////////////////////////////////////////////////////////
    const messageTable = await createMessageTable(now, true)
    div.appendChild(messageTable)
    div.refresh = async function () {
      // only the last messageTable is live
      await addNewChatDocumentIfNewDay(new Date())
      syncMessages(chatChannel, messageTable) // @@ livemessagetable??
      desktopNotification(chatChannel)
    } // The short chat version the live update listening is done in the pane but we do it in the widget @@
    store.updater.addDownstreamChangeListener(chatDocument, div.refresh) // Live update
    liveMessageTable = messageTable
    latest.messageTable = liveMessageTable
    return messageTable
  }

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

  // Body of main function

  options = options || {}
  options.authorAboveContent = true
  const newestFirst = options.newestFirst === '1' || options.newestFirst === true // hack for now

  const channelObject = new ChatChannel(chatChannel, options)
  const dateFolder = channelObject.dateFolder

  const div = dom.createElement('div')
  channelObject.div = div

  const statusArea = div.appendChild(dom.createElement('div'))
  const userContext = { dom, statusArea, div: statusArea } // logged on state, pointers to user's stuff

  // const messageTable = dom.createElement('table') // @@ check does this go in renderMessageTable

  let liveMessageTable
  const earliest = { messageTable: null } // Stuff about each end of the loaded days
  const latest = { messageTable: null }

  let lock = false

  await loadInitialContent()
  return div
}
