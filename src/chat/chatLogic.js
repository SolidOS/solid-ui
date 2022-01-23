/**
 * Contains the [[ChatChannel]] class and logic for Solid Chat
 * @packageDocumentation
 */

import * as debug from '../debug'
import { authn } from '../authn/index'
import { DateFolder } from './dateFolder'
import { store } from '../logic'
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
  constructor (channelRoot, options) {
    this.channelRoot = channelRoot
    this.options = options
    this.dateFolder = new DateFolder(channelRoot, 'chat.ttl')
  }

  /* Store a new message in the web,
    optionally as a replacement for an existing one.
    The old one iis left, and the two are linked
  */
  async createMessage (newContent, oldMsg = null) {
    const sts = []
    const now = new Date()
    const timestamp = '' + now.getTime()
    const dateStamp = $rdf.term(now)
    const chatDocument = oldMsg ? oldMsg.doc() : this.dateFolder.leafDocumentFromDate(now)
    const message = store.sym(chatDocument.uri + '#' + 'Msg' + timestamp)
    const content = store.literal(newContent)

    const me = authn.currentUser() // If already logged on

    if (oldMsg) { // edit message
      sts.push(
        new $rdf.Statement(mostRecentVersion(oldMsg), ns.dct('isReplacedBy'), message, chatDocument)
      )
    } else {
      sts.push( // new message
        new $rdf.Statement(this.chatChannel, ns.wf('message'), message, chatDocument)
      )
    }
    sts.push(
      new $rdf.Statement(
        message,
        ns.sioc('content'),
        store.literal(newContent),
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

  async deleteMessage (message) {
    const sts = []
    const dateStamp = $rdf.term(new Date())
    const chatDocument = message.doc()
    sts.push(
      new $rdf.Statement(mostRecentVersion(message), ns.schema('dateDeleted'), dateStamp, chatDocument)
    )
    sts.push(
      new $rdf.Statement(mostRecentVersion(message), ns.schema('dateDeleted'), dateStamp, chatDocument)
    )
    try {
      store.updater.update([], sts)
    } catch (err) {
      const msg = 'Error deleting chat essage: ' + err
      alert(msg)
    }
  } // method
} // class ChatChannel

export function mostRecentVersion (message) {
  let msg = message
  while (msg) {
    message = msg
    msg = store.any(message, ns.dct('isReplacedBy'))
  }
  if (store.any(message, ns.schema('dateDeleted'))) {
    return ns.schema('dateDeleted') // message has been deleted
  }
  return message
}

// A Nickname for a person

export function nick (person) {
  const s = store.any(person, ns.foaf('nick'))
  if (s) return '' + s.value
  return '' + utils.label(person)
}

export async function createIfNotExists (doc, contentType = 'text/turtle', data = '') {
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
