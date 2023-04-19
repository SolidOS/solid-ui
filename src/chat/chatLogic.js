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
import { getBlankMsg, signMsg, SEC } from './signature'
import { getPrivateKey } from './keys'

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
  async updateMessage (text, oldMsg = null, deleteIt) {
    const sts = []
    const now = new Date()
    const timestamp = '' + now.getTime()
    const dateStamp = $rdf.term(now)
    const chatDocument = oldMsg ? oldMsg.doc() : this.dateFolder.leafDocumentFromDate(now)
    const message = store.sym(chatDocument.uri + '#' + 'Msg' + timestamp)
    // const content = store.literal(text)

    const me = authn.currentUser() // If already logged on

    const msg = getBlankMsg
    msg.id = message
    if (oldMsg) { // edit message replaces old one
      const oldMsgMaker = store.any(oldMsg, ns.foaf('maker')) // may not be needed here, but needed on READ
      if (oldMsgMaker.uri === me.uri) {
        sts.push($rdf.st(mostRecentVersion(oldMsg), ns.dct('isReplacedBy'), message, chatDocument))
        if (deleteIt) { // we need to add a specific signature, else anyone can delete a msg ?
          sts.push($rdf.st(message, ns.schema('dateDeleted'), dateStamp, chatDocument))
          msg.dateDeleted = dateStamp
        }
      } else {
        const errMsg = 'Error you cannot delete/edit a message from someone else : \n' + oldMsgMaker.uri
        debug.warn(errMsg)
        alert(errMsg)
        throw new Error(errMsg)
      }
    } else { // link new message to channel
      sts.push($rdf.st(this.channel, ns.wf('message'), message, chatDocument))
    }
    sts.push(
      $rdf.st(message, ns.sioc('content'), store.literal(text), chatDocument)
    )
    msg.content = text

    sts.push(
      $rdf.st(message, ns.dct('created'), dateStamp, chatDocument)
    )
    msg.created = dateStamp
    if (me) {
      sts.push($rdf.st(message, ns.foaf('maker'), me, chatDocument))
      msg.maker = me
      // privateKey the cached private key of me, cache should be deleted after a certain time
      const privateKey = await getPrivateKey(me)
      sts.push($rdf.st(message, $rdf.sym(`${SEC}Proof`), $rdf.sym(signMsg(msg, privateKey), chatDocument)))
    }
    try {
      await store.updater.update([], sts)
    } catch (err) {
      const errMsg = 'Error saving chat message: ' + err
      debug.warn(errMsg)
      alert(errMsg)
      throw new Error(errMsg)
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
} // class ChatChannel

export function originalVersion (message) {
  let msg = message
  while (msg) {
    message = msg
    msg = store.any(null, ns.dct('isReplacedBy'), message, message.doc())
  }
  return message
}

export function mostRecentVersion (message) {
  let msg = message
  while (msg) {
    message = msg
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
