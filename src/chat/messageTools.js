/**
 * Tools for doing things with a message
 * Let us be creative here.  Allow all sorts of things to
 * be done to a message - linking to new or old objects in an open way
 *
 * Ideas: Bookmark, Like, star, pin at top of chat, reply as new thread,
 * If you made it originally: edit, delete, attach
 * @packageDocumentation
 */
/* global $rdf */

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
import { renderBookmarksButton } from './bookmarks'
import { infiniteMessageArea } from './infinite.js'
import { renderMessage, creatorAndDate } from './message'
import * as debug from '../debug'

const UI = { authn, icons, ns, media, pad, rdf, store, style, utils, widgets }
const dom = window.document

// THE UNUSED ICONS are here as reminders for possible future functionality
// const BOOKMARK_ICON = 'noun_45961.svg'
// const HEART_ICON = 'noun_130259.svg' -> Add this to my (private) favorites
// const MENU_ICON = 'noun_897914.svg'
// const PAPERCLIP_ICON = 'noun_25830.svg' -> add attachments to this message
// const PIN_ICON = 'noun_562340.svg'  -> pin this message permanently in the chat UI
const PENCIL_ICON = 'noun_253504.svg' // edit a message
// const SPANNER_ICON = 'noun_344563.svg' -> settings
const THUMBS_UP_ICON = 'noun_1384132.svg'
const THUMBS_DOWN_ICON = 'noun_1384135.svg'

// module.export = { messageTools, sentimentStripLinked, sentimentStrip }

// @@@@ use the one in rdflib.js when it is avaiable and delete this
function updatePromise (del, ins) {
  return new Promise(function (resolve, reject) {
    store.updater.update(del, ins, function (uri, ok, errorBody) {
      if (!ok) {
        reject(new Error(errorBody))
      } else {
        resolve()
      }
    }) // callback
  }) // promise
}

function mostRecentVersion (message) {
  let msg = message
  while (msg) {
    message = msg
    msg = store.any(message, ns.dct('isReplacedBy'))
  }
  if (store.any(message, ns.schema('dateDeleted'))) {
    return ns.schema('dateDeleted') // message has been deleted
  }
  return message // message original or modified content
}

/**
 * Emoji in Unicode
 */

const emoji = {}
emoji[ns.schema('AgreeAction')] = '👍'
emoji[ns.schema('DisagreeAction')] = '👎'
emoji[ns.schema('EndorseAction')] = '⭐️'
emoji[ns.schema('LikeAction')] = '❤️'

/**
 * Create strip of sentiments expressed
 */
export function sentimentStrip (target, doc) { // alain seems not used
  const actions = (mostRecentVersion(target).value !== ns.schema('dateDeleted').value) ? store.each(null, ns.schema('target'), target, doc) : []
  const sentiments = actions.map(a => store.any(a, ns.rdf('type'), null, doc))
  sentiments.sort()
  const strings = sentiments.map(x => emoji[x] || '')
  return dom.createTextNode(strings.join(' '))
}
/**
 * Create strip of sentiments expressed, with hyperlinks
 *
 * @param target {NamedNode} - The thing about which they are expressed
 * @param doc {NamedNode} - The document in which they are expressed
 */
export function sentimentStripLinked (target, doc) {
  const strip = dom.createElement('span')
  function refresh () {
    strip.innerHTML = ''
    const actions = (mostRecentVersion(target).uri !== ns.schema('dateDeleted').uri) ? store.each(null, ns.schema('target'), target, doc) : []
    const sentiments = actions.map(a => [
      store.any(a, ns.rdf('type'), null, doc),
      store.any(a, ns.schema('agent'), null, doc)
    ])
    sentiments.sort()
    sentiments.forEach(ss => {
      const [theClass, agent] = ss
      let res
      if (agent) {
        res = dom.createElement('a')
        res.setAttribute('href', agent.uri)
      } else {
        res = dom.createTextNode('')
      }
      res.textContent = emoji[theClass] || '*'
      strip.appendChild(res)
    })
  }
  refresh()
  strip.refresh = refresh
  return strip
}

/**
 * Creates a message toolbar component
 */
export function messageToolbar (message, messageRow, userContext) {

  async function deleteMessage () {
    if (me.value === store.any(message, ns.foaf('maker')).value) {
      const { sts } = appendMsg('message deleted', message, 'delete')
      await UI.store.updater.update([], sts) // alain: can sendMessage() do the refresh ?
      // para.textContent = 'message deleted'
    }
    closeToolbar()
  }

  async function editMessage () {
    if (me.value === store.any(message, ns.foaf('maker')).value) {
      closeToolbar() // edit is a one-off action
      const table = messageRow.parentNode
      const editRow = renderMessageEditor(messageTable, userContext, options, date, message)
      table.insertBefore(editRow, messageRow)
      editRow.originalRow = messageRow
      messsageRow.style.display = 'none' // Hide the original message. unhide if user cancels edit
    }
  }

  // alain TODO allow chat owner to fully delete message + sentiments and replacing messages

  /* if (mostRecentVersion(message).value === ns.schema('dateDeleted').value) {
    // TODO only admin can do : delete completely message and replacements
    // find message and replacements
    const admin
    if (me && (me.uri === admin)) {
      const messageArray = [message]
      const msg = message
      while(msg) {
        message = msg
        messageArray.push(message)
        msg = store.any(message, ns.dct('isReplacedBy'))
      }
      if (alert('confirm you want to completely remove this deleted message')) {
        messageArray.map(msg => deleteThingThen(msg))
      }
    }
    return
  } */
  const div = dom.createElement('div')
  // is message deleted ?
  if (mostRecentVersion(message).value === ns.schema('dateDeleted').value) return div
  function closeToolbar () {
    div.parentElement.parentElement.removeChild(div.parentElement) // remive the TR
  }

  async function deleteThingThen (x) {
    await updatePromise(store.connectedStatements(x), [])
  }

  // Things only the original author can do
  let me = UI.authn.currentUser() // If already logged on
  if (me && store.holds(message, ns.foaf('maker'), me)) {
    // button to delete the message
    const deleteButton = UI.widgets.deleteButtonWithCheck(
      dom,
      div,
      'message', deleteMessage
    )
    div.appendChild(deleteButton)
  } // if mine

  function appendMsg (newContent, oldMsg = {}, options = '') {
    const sts = []
    const now = new Date()
    const timestamp = '' + now.getTime()
    const dateStamp = $rdf.term(now)
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
    // const message = store.sym(messageStore.uri + '#' + 'Msg' + timestamp)

    const chatDocument = oldMsg.doc() // options ? oldMsg.doc() : dateFolder.leafDocumentFromDate(now)
    const message = store.sym(chatDocument.uri + '#' + 'Msg' + timestamp)
    const content = store.literal(newContent)

    if (oldMsg && options === 'delete') {
      sts.push(
        new $rdf.Statement(mostRecentVersion(oldMsg), ns.schema('dateDeleted'), dateStamp, chatDocument)
      )
    } else {
      if (oldMsg && options === 'edit') {
        sts.push(
          new $rdf.Statement(mostRecentVersion(oldMsg), ns.dct('isReplacedBy'), message, chatDocument)
        )
      }
      sts.push(
        new $rdf.Statement(
          message,
          ns.sioc('content'),
          content,
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
    }
    return { message, dateStamp, content, chatDocument, sts }
  }

  function nick (person) {
    const s = UI.store.any(person, UI.ns.foaf('nick'))
    if (s) return '' + s.value
    return '' + utils.label(person)
  }

  // Things anyone can do if they have a bookmark list async
  /*
 var bookmarstoreutton = await bookmarks.renderBookmarksButton(userContext)
 if (bookmarstoreutton) {
   div.appendChild(bookmarstoreutton)
 }
 */
  // Things anyone can do if they have a bookmark list

  renderBookmarksButton(userContext).then(bookmarstoreutton => {
    if (bookmarstoreutton) div.appendChild(bookmarstoreutton)
  })

  /**   Button to allow user to express a sentiment (like, endorse, etc) about a target
   *
   * @param context {Object} - Provide dom and me
   * @param target {NamedNode} - The thing the user expresses an opnion about
   * @param icon {uristring} - The icon to be used for the button
   * @param actionClass {NamedNode} - The RDF class  - typically a subclass of schema:Action
   * @param doc - {NamedNode} - the Solid document iunto which the data should be written
   * @param mutuallyExclusive {Array<NamedNode>} - Any RDF classes of sentimentswhich are mutiually exclusive
   */
  function sentimentButton (
    context,
    target,
    icon,
    actionClass,
    doc,
    mutuallyExclusive
  ) {
    function setColor () {
      button.style.backgroundColor = action ? 'yellow' : 'white'
    }
    const button = UI.widgets.button(
      dom,
      icon,
      UI.utils.label(actionClass),
      async function (_event) {
        if (action) {
          await deleteThingThen(action)
          action = null
          setColor()
        } else {
          // no action
          action = UI.widgets.newThing(doc)
          const insertMe = [
            $rdf.st(action, ns.schema('agent'), context.me, doc),
            $rdf.st(action, ns.rdf('type'), actionClass, doc),
            $rdf.st(action, ns.schema('target'), target, doc)
          ]
          await updatePromise([], insertMe)
          setColor()

          if (mutuallyExclusive) {
            // Delete incompative sentiments
            let dirty = false
            for (let i = 0; i < mutuallyExclusive.length; i++) {
              const a = existingAction(mutuallyExclusive[i])
              if (a) {
                await deleteThingThen(a) // but how refresh? refreshTree the parent?
                dirty = true
              }
            }
            if (dirty) {
              // UI.widgets.refreshTree(button.parentNode) // requires them all to be immediate siblings
              UI.widgets.refreshTree(messageRow) // requires them all to be immediate siblings
            }
          }
        }
      }
    )
    function existingAction (actionClass) {
      const actions = store
        .each(null, ns.schema('agent'), context.me, doc)
        .filter(x => store.holds(x, ns.rdf('type'), actionClass, doc))
        .filter(x => store.holds(x, ns.schema('target'), target, doc))
      return actions.length ? actions[0] : null
    }
    function refresh () {
      action = existingAction(actionClass)
      setColor()
    }
    let action
    button.refresh = refresh // If the file changes, refresh live
    refresh()
    return button
  }

  // THUMBS_UP_ICON
  // https://schema.org/AgreeAction
  me = UI.authn.currentUser() // If already logged on
  // debug.log('Actions 3' + mostRecentVersion(message).value + ' ' + ns.schema('dateDeleted').value + ' ' + (mostRecentVersion(message).value !== ns.schema('dateDeleted').value))

  if (me && (mostRecentVersion(message).value !== ns.schema('dateDeleted').value)) {
    const context1 = { me, dom, div }
    div.appendChild(
      sentimentButton(
        context1,
        message, // @@ TODO use UI.widgets.sentimentButton
        UI.icons.iconBase + THUMBS_UP_ICON,
        ns.schema('AgreeAction'),
        message.doc(),
        [ns.schema('DisagreeAction')]
      )
    )
    // Thumbs down
    div.appendChild(
      sentimentButton(
        context1,
        message,
        UI.icons.iconBase + THUMBS_DOWN_ICON,
        ns.schema('DisagreeAction'),
        message.doc(),
        [ns.schema('AgreeAction')]
      )
    )
  }
  // X button to remove the tool UI itself
  const cancelButton = div.appendChild(UI.widgets.cancelButton(dom))
  cancelButton.style.float = 'right'
  cancelButton.firstChild.style.opacity = '0.3'
  cancelButton.addEventListener('click', closeToolbar)
  return div
}
