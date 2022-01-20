/**
 * Contains the [[ChatChannel]] class
 * @packageDocumentation
 */

import { store } from '../logic'

import * as ns from '../ns'
import * as $rdf from 'rdflib' // pull in first avoid cross-refs

const kb = store

/* The Solid logic for a 'LongChat'
*/
export class ChatChannel {
  constructor (channelRoot, options) {
    this.channelRoot = channelRoot
    this.options = options
    this.dateFolder = new DateFolder(channelRoot)
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
    const message = kb.sym(chatDocument.uri + '#' + 'Msg' + timestamp)
    const content = kb.literal(newContent)

    if (oldMsg) { // edit message
      sts.push(
        new $rdf.Statement(mostRecentVersion(oldMsg), ns.dct('isReplacedBy'), message, chatDocument)
      )
    } else {
      sts.push( // new message
        new $rdf.Statement(chatChannel, ns.wf('message'), message, chatDocument)
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
  }
  return { message, dateStamp, content, chatDocument, sts }


  deleteMessage  (newContent, oldMsg = null) {
    const sts = []
    const now = new Date()
    const timestamp = '' + now.getTime()
    const dateStamp = $rdf.term(now)

    const chatDocument = oldMsg.doc()

    sts.push(
      new $rdf.Statement(mostRecentVersion(oldMsg), ns.schema('dateDeleted'), dateStamp, chatDocument)
    )

    sts.push(
      new $rdf.Statement(mostRecentVersion(oldMsg), ns.schema('dateDeleted'), dateStamp, chatDocument)
    )

    return
  }

} // class ChatChannel

export function  mostRecentVersion (message) {
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
