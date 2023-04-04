/**
 * Contains the [[ChatChannel]] class and logic for Solid Chat
 * @packageDocumentation
 */

import * as debug from '../debug'
import { DateFolder } from './dateFolder'
import { store, authn } from 'solid-logic'
import * as ns from '../ns'
import * as $rdf from 'rdflib' // pull in first avoid cross-refs
import * as utils from '../utils'

/* The Solid logic for a 'LongChat'
*/
/**
 * Common code for a chat (discussion area of messages about something)
 * This version runs over a series of files for different time periods
 *
 * Parameters for the whole chat like its title are stored on
 * index.ttl#this and the chats messages are stored in YYYY/MM/DD/chat.ttl
 *
 */

export class ChatChannel {
  constructor (channel, options) {
    this.channel = channel
    this.channelRoot = channel.doc()
    this.options = options
    this.dateFolder = new DateFolder(this.channelRoot, 'chat.ttl')
    this.div = null // : HTMLElement
  }

  /* Store a new message in the web,
  */
  async createMessage (text) {
    return this.updateMessage(text)
  }

  /* Store a new message in the web,
    as a replacement for an existing one.
    The old one iis left, and the two are linked
  */
  async updateMessage (text, oldMsg = null, deleteIt, thread = null) {
    const sts = []
    const now = new Date()
    const timestamp = '' + now.getTime()
    const dateStamp = $rdf.term(now)
    const chatDocument = oldMsg ? oldMsg.doc() : this.dateFolder.leafDocumentFromDate(now)
    const message = store.sym(chatDocument.uri + '#' + 'Msg' + timestamp)
    // const content = store.literal(text)

    const me = authn.currentUser() // If already logged on

    if (oldMsg) { // edit message replaces old one
      sts.push($rdf.st(await mostRecentVersion(oldMsg), ns.dct('isReplacedBy'), message, chatDocument))
      if (deleteIt) {
        sts.push($rdf.st(message, ns.schema('dateDeleted'), dateStamp, chatDocument))
      }
    } else { // link new message to channel
      sts.push($rdf.st(this.channel, ns.wf('message'), message, chatDocument))
    }
    sts.push(
      $rdf.st(message, ns.sioc('content'), store.literal(text), chatDocument)
    )
    sts.push(
      $rdf.st(message, ns.dct('created'), dateStamp, chatDocument)
    )
    if (me) {
      sts.push($rdf.st(message, ns.foaf('maker'), me, chatDocument))
    }
    if (thread) {
      sts.push($rdf.st(thread, ns.sioc('has_member'), message, chatDocument))
      if (!thread.doc().sameTerm(message.doc())) {
        sts.push($rdf.st(thread, ns.sioc('has_member'), message, thread.doc()))
      }
    }
    try {
      await store.updater.updateMany([], sts)
    } catch (err) {
      const msg = 'Error saving chat message: ' + err
      debug.warn(msg)
      alert(msg)
      throw new Error(msg)
    }
    return message
  }

  /* Mark a message as deleted
  * Wee add a new version of the message,m witha deletion flag (deletion date)
  * so that the deletion can be revoked by adding another non-deleted update
  */
  async deleteMessage (message) {
    return this.updateMessage('(message deleted)', message, true)
  }

  // Create a new thread of replies to the thread root message
  //  or returns one which already exists

  async createThread (threadRoot) {
    const already = store.each(threadRoot, ns.sioc('has_reply'), null, threadRoot.doc())
      .filter(thread => store.holds(thread, ns.rdf('type'), ns.sioc('Thread'), thread.doc()))
    if (already.length > 0) return already[0]

    const thread = $rdf.sym(threadRoot.uri + '-thread')
    const insert = [
      $rdf.st(thread, ns.rdf('type'), ns.sioc('Thread'), thread.doc()),
      $rdf.st(threadRoot, ns.sioc('has_reply'), thread, thread.doc())
    ]
    await store.updater.update([], insert)
    return thread
  }
} // class ChatChannel

// ////////// Utility functions

// Have to not loop forever if fed loops
export async function allVersions (message) {
  const versions = [message]
  const done = {}
  done[message.ur] = true
  let m = message
  while (true) { // earlier?
    const prev = store.any(null, ns.dct('isReplacedBy'), m, m.doc())
    if (!prev || done[prev.uri]) break
    await store.fetcher.load(prev)
    versions.unshift(prev)
    done[prev.uri] = true
    m = prev
  }
  m = message
  while (true) { // later?
    const next = store.any(m, ns.dct('isReplacedBy'), null, m.doc())
    if (!next || done[next.uri]) break
    versions.push(next)
    done[next.uri] = true
    m = next
  }
  return versions
}

export async function originalVersion (message) {
  let msg = message
  const done = {}
  // done[message.ur] = true
  while (msg) {
      if (done[msg.uri]) {
          console.error('originalVersion: verion loop' + message)
          return message
      }
      done[msg.uri] = true
    message = msg
    await store.fetcher.load(message)
    msg = store.any(null, ns.dct('isReplacedBy'), message, message.doc())
  }
  return message
}

export async function mostRecentVersion (message) {
  let msg = message
  const done = {}
  while (msg) {
      if (done[msg.uri]) {
          console.error('mostRecentVersion: verion loop' + message)
          return message
      }
    done[msg.uri] = true
    message = msg
    await store.fetcher.load(message)
    msg = store.any(message, ns.dct('isReplacedBy'), null, message.doc())
  }
  return message
}

export function isDeleted (message) {
  return store.holds(message, ns.schema('dateDeleted'), null, message.doc())
}

export function isReplaced (message) {
  return store.holds(message, ns.dct('isReplacedBy'), null, message.doc())
}

export function isHidden (message) {
  return this.isDeleted(message) || this.isReplaced(message)
}

// A Nickname for a person

export function nick (person) {
  const s = store.any(person, ns.foaf('nick'))
  if (s) return '' + s.value
  return '' + utils.label(person)
}

export async function _createIfNotExists (doc, contentType = 'text/turtle', data = '') {
  let response
  try {
    response = await store.fetcher.load(doc)
  } catch (err) {
    if (err.response.status === 404) {
      debug.log(
        'createIfNotExists: doc does NOT exist, will create... ' + doc
      )
      try {
        response = await store.fetcher.webOperation('PUT', doc.uri, {
          data,
          contentType
        })
      } catch (err) {
        debug.log('createIfNotExists doc FAILED: ' + doc + ': ' + err)
        throw err
      }
      delete store.fetcher.requested[doc.uri] // delete cached 404 error
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
// ends
