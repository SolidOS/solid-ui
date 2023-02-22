/**
 * Contains the [[infiniteMessageArea]] class
 * @packageDocumentation
 */
// import { findBookmarkDocument } from './bookmarks'
import * as $rdf from 'rdflib' // pull in first avoid cross-refs
import { store } from 'solid-logic'
import * as debug from '../debug'
import { icons } from '../iconBase'
import * as ns from '../ns'
// import * as style from '../style'
// import * as utils from '../utils'
import * as widgets from '../widgets'
// import * as pad from '../pad'
// import { DateFolder } from './dateFolder'
import { ChatChannel, isDeleted, mostRecentVersion } from './chatLogic'
import { renderMessageEditor, renderMessageRow } from './message'

// const UI = { authn, icons, ns, media, pad, $rdf, store, style, utils, widgets }

export function desktopNotification (str) {
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    debug.warn('This browser does no t support desktop notification')
  } else if (Notification.permission === 'granted') {
    // Let's check whether notificatio n permissions have already been granted
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
export function insertMessageIntoTable (channelObject, messageTable, message, fresh, options, userContext) {
  const messageRow = renderMessageRow(channelObject,
    message,
    fresh,
    options,
    userContext
  )

  // const message = messageRow.AJAR_subject
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
 *
 * Options include:

 - shiftEnterSendsMessage: Use shift/enter to send message, Enter to add newline, instead of the reverse.
 - authorDateOnLeft:  Display the author's anme and date of the message in the left column instead of first above the content
 - selectedMessage: Display one message highlighted with the chat around it
 - solo: By itelf on a webpage, so user scroll anywhere in the web page scan scroll the chat.
 - newestFirst: Arrange the chat messages chronologically newest at the top insted of at the bottom
 - infinite:  Use infinite scroll
 - showDeletedMessages: Show messages which have been delted as "deleted message". Otherwise hide them.
 - expandImagesInline: If a URI by itself in a message looks like an image URI, replace it with the image
 - inlineImageHeightEms: The height (in ems) of images expaned from their URIs in the chat.

 */
export async function infiniteMessageArea (dom, wasStore, chatChannel, options) {
  // ///////////////////////////////////////////////////////////////////////

  function syncMessages (chatChannel, messageTable) {
    const displayed = {}
    let ele, ele2
    for (ele = messageTable.firstChild; ele; ele = ele.nextSibling) {
      if (ele.AJAR_subject) {
        displayed[ele.AJAR_subject.uri] = true
      }
    }

    const messages = store
      .statementsMatching(
        chatChannel,
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

  // Called once per original message displayed
  function addMessage (message, messageTable) {
    const latest = mostRecentVersion(message)
    // const content = store.any(latest, ns.sioc('content'))
    if (isDeleted(latest) && !options.showDeletedMessages) {
      return // ignore deleted messaged -- @@ could also leave a placeholder
    }
    if (options.thread) { // only show things in thread
      const thread = store.any(message, ns.sioc('has_container'), null, message.doc())
      if (message.sameTerm(options.thread)) {
        // console.log(' displaying root of thread ' + thread)
      } else if (thread.sameTerm(options.thread)) {
        // console.log(' displaying body of thread ' + thread)
      } else {
        return // suppress message not in thread
      }
    }

    // const replyTo = store.any(message, ns.sioc('reply_of'), null, message.doc())
    // @@ best thing to do with a reply?  Move to after the thing replied to and shift right?
    // Sort by originalMessageDate, reply number?

    insertMessageIntoTable(channelObject,
      messageTable,
      message,
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
    let scrollBackbutton
    let scrollForwardButton

    /// /////////////////   Scroll down adding more above

    async function extendBackwards () {
      const done = await insertPreviousMessages(true)
      if (done) {
        if (scrollBackbutton) {
          scrollBackbutton.firstChild.setAttribute(
            'src',
            icons.iconBase + 'noun_T-Block_1114655_000000.svg'
          ) // T
          scrollBackbutton.disabled = true
        }
        messageTable.initial = true
      } else {
        messageTable.extendedBack = true
      }
      setScrollBackbuttonIcon()
      return done
    }

    function setScrollBackbuttonIcon () {
      if (!scrollBackbutton) {
        return
      }
      const sense = messageTable.extendedBack ? !newestFirst : newestFirst
      const scrollBackIcon = messageTable.initial
        ? 'noun_T-Block_1114655_000000.svg'
        : getScrollbackIcon(sense)
      scrollBackbutton.firstChild.setAttribute(
        'src',
        icons.iconBase + scrollBackIcon
      )

      function getScrollbackIcon (sense) {
        return sense ? 'noun_1369241.svg' : 'noun_1369237.svg'
      }
    }

    async function scrollBackbuttonHandler (_event) {
      if (messageTable.extendedBack) {
        removePreviousMessages(true, messageTable)
        messageTable.extendedBack = false
        setScrollBackbuttonIcon()
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
    options.authorDateOnLeft = true
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
      const scrollBackbuttonTR = dom.createElement('tr')
      const scrollBackbuttonCell = scrollBackbuttonTR.appendChild(
        dom.createElement('td')
      )
      // up traingles: noun_1369237.svg
      // down triangles: noun_1369241.svg
      const scrollBackIcon = newestFirst
        ? 'noun_1369241.svg'
        : 'noun_1369237.svg' // down and up arrows respoctively
      scrollBackbutton = widgets.button(
        dom,
        icons.iconBase + scrollBackIcon,
        'Previous messages ...'
      )
      scrollBackbuttonCell.style = 'width:3em; height:3em;'
      scrollBackbutton.addEventListener('click', scrollBackbuttonHandler, false)
      messageTable.extendedBack = false
      scrollBackbuttonCell.appendChild(scrollBackbutton)
      setScrollBackbuttonIcon()

      const dateCell = scrollBackbuttonTR.appendChild(dom.createElement('td'))
      dateCell.style =
        'text-align: center; vertical-align: middle; color: #888; font-style: italic;'
      dateCell.textContent = widgets.shortDate(date.toISOString(), true) // no time, only date

      // @@@@@@@@@@@ todo move this button to other end of  message cell, o
      const scrollForwardButtonCell = scrollBackbuttonTR.appendChild(
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
        messageTable.insertBefore(scrollBackbuttonTR, messageTable.firstChild) // If not newestFirst
      } else {
        messageTable.appendChild(scrollBackbuttonTR) //  newestFirst
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
      // https://github.com/solidos/solid-ui/issues/366
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
  options.authorDateOnLeft = false // @@ make a user optiosn
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
