/**
 * Contains the [[ChatChannel]] class
 * @packageDocumentation
 */

import { DateFolder } from './dateFolder'
import { store } from '../logic'
import * as ns from '../ns'
import * as $rdf from 'rdflib' // pull in first avoid cross-refs

const store = store

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
    const message = store.sym(chatDocument.uri + '#' + 'Msg' + timestamp)
    const content = store.literal(newContent)

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
    msg = store.any(message, ns.dct('isReplacedBy'))
  }
  if (store.any(message, ns.schema('dateDeleted'))) {
    return ns.schema('dateDeleted') // message has been deleted
  }
  return message
}

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
