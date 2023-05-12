/**
 * Tools for doing things with a message
 * Let us be creative here.  Allow all sorts of things to
 * be done to a message - linking to new or old objects in an open way
 *
 * Ideas: Bookmark, Like, star, pin at top of chat, reply as new thread,
 * If you made it originally: edit, delete, attach
 * @packageDocumentation
 */
import * as debug from '../debug'
import { icons } from '../iconBase'
// import { media } from '../media/index'
import * as ns from '../ns'
// import * as pad from '../pad'
import * as rdf from 'rdflib' // pull in first avoid cross-refs
// import * as style from '../style'
import * as utils from '../utils'
import * as widgets from '../widgets'
import { renderBookmarksButton } from './bookmarks'
import { authn, store } from 'solid-logic'

import { allVersions, mostRecentVersion, isDeleted } from './chatLogic'
import { switchToEditor } from './message'

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
const REPLY_ICON = 'noun-reply-5506924.svg'
/**
 * Emoji in Unicode
 */
const emojiMap = {}
emojiMap[ns.schema('AgreeAction')] = '👍'
emojiMap[ns.schema('DisagreeAction')] = '👎'
emojiMap[ns.schema('EndorseAction')] = '⭐️'
emojiMap[ns.schema('LikeAction')] = '❤️'

export function emojiFromActionClass (action) {
  return emojiMap[action] || null
}

export function ActionClassFromEmoji (emoji) {
  for (const a in emojiMap) {
    if (emojiMap[a] === emoji) {
      return rdf.sym(a.slice(1, -1)) // remove < >
    }
  }
  return null
}

// Allow the action to give its own emoji as content,
// or get the emoji from the class of action.
export function emojiFromAction (action) {
  const content = store.any(action, ns.sioc('content'), null, action.doc())
  if (content) return content
  const klass = store.any(action, ns.rdf('type'), null, action.doc())
  if (klass) {
    const em = emojiFromActionClass(klass)
    if (em) return em
  }
  return '⬜️'
}

/**
 * Create strip of sentiments expressed
 */
export async function sentimentStrip (target, doc) { // alain: seems not used
  const versions = await allVersions(target)
  debug.log('sentimentStrip Versions for ' + target, versions)
  const actions = versions.map(version => store.each(null, ns.schema('target'), version, doc)).flat()
  debug.log('sentimentStrip: Actions for ' + target, actions)
  const strings = actions.map(action => emojiFromAction(action) || '')
  return dom.createTextNode(strings.join(' '))
}
/**
 * Create strip of sentiments expressed, with hyperlinks
 *
 * @param target {NamedNode} - The thing about which they are expressed
 * @param doc {NamedNode} - The document in which they are expressed
 */
export async function sentimentStripLinked (target, doc) {
  const strip = dom.createElement('span')
  async function refresh () {
    strip.innerHTML = ''
    if (isDeleted(target)) return strip
    const versions = await allVersions(target)
    debug.log('sentimentStripLinked: Versions for ' + target, versions)
    const actions = versions.map(version => store.each(null, ns.schema('target'), version, doc)).flat()
    debug.log('sentimentStripLinked: Actions for ' + target, actions)
    if (actions.length === 0) return strip
    const sentiments = actions.map(a => [
      store.any(a, ns.rdf('type'), null, doc),
      store.any(a, ns.sioc('content'), null, doc),
      store.any(a, ns.schema('agent'), null, doc)
    ])
    debug.log('  Actions sentiments ', sentiments)
    sentiments.sort()
    sentiments.forEach(ss => {
      const [theClass, content, agent] = ss
      let res
      if (agent) {
        res = dom.createElement('a')
        res.setAttribute('href', agent.uri)
      } else {
        res = dom.createTextNode('')
      }
      res.textContent = content || emojiMap[theClass] || '⬜️'
      strip.appendChild(res)
    })
    debug.log('  Actions strip ', strip)
  }
  refresh().then(debug.log('sentimentStripLinked: sentimentStripLinked async refreshed'))
  strip.refresh = refresh
  return strip
}
/**
 * Creates a message toolbar component
 */
export async function messageToolbar (message, messageRow, userContext, channelObject) {
  async function deleteMessage () {
    const author = store.any(message, ns.foaf('maker'))
    if (!me) {
      alert('You can\'t delete the message, you are not logged in.')
    } else if (me.sameTerm(author)) {
      try {
        await channelObject.deleteMessage(message)
      } catch (err) {
        const msg = 'Error deleting messaage ' + err
        debug.warn(msg)
        alert(msg)
        const area = userContext.statusArea || messageRow.parentNode
        area.appendChild(widgets.errorMessageBlock(dom, msg))
      }
      messageRow.parentNode.removeChild(messageRow)
    } else {
      alert('You can\'t delete the message, you are not logged in as the author, ' + author)
    }
    closeToolbar()
  }

  async function editMessage (messageRow) {
    if (me.value === store.any(message, ns.foaf('maker')).value) {
      closeToolbar() // edit is a one-off action
      await switchToEditor(messageRow, message, channelObject, userContext)
    }
  }

  async function replyInThread () {
    const thread = await channelObject.createThread(message)
    const options = userContext.chatOptions
    if (!options) throw new Error('replyInThread: missing options')
    options.showThread(thread, options)
    closeToolbar() // a one-off action
  }

  // alain: TODO allow chat owner to fully delete message + sentiments and replacing messages

  const div = dom.createElement('div')
  // is message deleted ?
  if (await mostRecentVersion(message).value === ns.schema('dateDeleted').value) return div
  function closeToolbar () {
    div.parentElement.parentElement.removeChild(div.parentElement) // remive the TR
  }

  async function deleteThingThen (x) {
    await store.updater.update(store.connectedStatements(x), [])
  }

  // Things only the original author can do
  let me = authn.currentUser() // If already logged on
  if (me && store.holds(message, ns.foaf('maker'), me)) {
    // button to delete the message
    div.appendChild(widgets.deleteButtonWithCheck(dom, div, 'message', deleteMessage))
    // button to edit the message
    div.appendChild(widgets.button(dom, icons.iconBase + PENCIL_ICON, 'edit', () => editMessage(messageRow)))
  } // if mine
  // Things anyone can do if they have a bookmark list async
  /*
 var bookmarkButton = await bookmarks.renderBookmarksButton(userContext)
 if (bookmarkButton) {
   div.appendChild(bookmarkButton)
 }
 */
  // Things anyone can do if they have a bookmark list

  renderBookmarksButton(userContext).then(bookmarkButton => {
    if (bookmarkButton) div.appendChild(bookmarkButton)
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
    const button = widgets.button(
      dom,
      icon,
      utils.label(actionClass),
      async function (_event) {
        if (action) {
          await deleteThingThen(action)
          action = null
          setColor()
        } else {
          // no action
          action = widgets.newThing(doc)
          const insertMe = [
            rdf.st(action, ns.schema('agent'), context.me, doc),
            rdf.st(action, ns.rdf('type'), actionClass, doc),
            rdf.st(action, ns.schema('target'), target, doc)
          ]
          await store.updater.update([], insertMe)
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
              // widgets.refreshTree(button.parentNode) // requires them all to be immediate siblings
              widgets.refreshTree(messageRow) // requires them all to be immediate siblings
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
  me = authn.currentUser() // If already logged on

  if (me && (await mostRecentVersion(message).value !== ns.schema('dateDeleted').value)) {
    const context1 = { me, dom, div }
    div.appendChild(
      sentimentButton(
        context1,
        message, // @@ TODO use widgets.sentimentButton
        icons.iconBase + THUMBS_UP_ICON,
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
        icons.iconBase + THUMBS_DOWN_ICON,
        ns.schema('DisagreeAction'),
        message.doc(),
        [ns.schema('AgreeAction')]
      )
    )
  }
  // Reply buttton

  if (store.any(message, ns.dct('created'))) { // Looks like a messsage? Bar can be used for other things
    div.appendChild(widgets.button(dom, icons.iconBase + REPLY_ICON, 'Reply in thread', async () => {
      await replyInThread()
    }))
  }
  // X button to remove the tool UI itself
  const cancelButton = div.appendChild(widgets.cancelButton(dom))
  cancelButton.style.float = 'right'
  cancelButton.firstChild.style.opacity = '0.3'
  cancelButton.addEventListener('click', closeToolbar)
  return div
}
