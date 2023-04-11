/**
 * Functions related to chat and bookmarks
 * @packageDocumentation
 */

import * as debug from '../debug'
import { icons } from '../iconBase'
import { media } from '../media/index'
import * as ns from '../ns'
import * as pad from '../pad'
import * as rdf from 'rdflib' // pull in first avoid cross-refs
import * as style from '../style'
import * as utils from '../utils'
import * as widgets from '../widgets'
import { store, registerInTypeIndex, authn } from 'solid-logic'
import { findAppInstances } from '../login/login'

const UI = { icons, ns, media, pad, rdf, style, utils, widgets }
const $rdf = UI.rdf

const BOOK = $rdf.Namespace('http://www.w3.org/2002/01/bookmark#')
const BOOKMARK_ICON = 'noun_45961.svg'

const label = utils.label
const dom = window.document || null

/** Create a resource if it really does not exist
 *  Be absolutely sure something does not exist before creating a new empty file
 * as otherwise existing could  be deleted.
 * @param doc {NamedNode} - The resource
 */
function createIfNotExists (doc) {
  return new Promise(function (resolve, reject) {
    store.fetcher.load(doc).then(
      response => {
        debug.log('createIfNotExists doc exists, all good ' + doc)
        // store.fetcher.webOperation('HEAD', doc.uri).then(response => {
        resolve(response)
      },
      err => {
        if (err.response.status === 404) {
          debug.log(
            'createIfNotExists doc does NOT exist, will create... ' + doc
          )

          store.fetcher
            .webOperation('PUT', doc.uri, {
              data: '',
              contentType: 'text/turtle'
            })
            .then(
              response => {
                // fetcher.requested[doc.uri] = 'done' // do not need to read ??  but no headers
                delete store.fetcher.requested[doc.uri] // delete cached 404 error
                debug.log('createIfNotExists doc created ok ' + doc)
                resolve(response)
              },
              err => {
                debug.log('createIfNotExists doc FAILED: ' + doc + ': ' + err)
                reject(err)
              }
            )
        } else {
          debug.log(
            'createIfNotExists doc load error NOT 404:  ' + doc + ': ' + err
          )
          reject(err)
        }
      }
    )
  })
}

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

/*         Bookmarking
 */
/** Find a user's bookmarks
 */
export async function findBookmarkDocument (userContext) {
  const theClass = BOOK('Bookmark')
  const fileTail = 'bookmarks.ttl'
  const isPublic = true

  await findAppInstances(userContext, theClass, isPublic) // public -- only look for public links

  if (userContext.instances && userContext.instances.length > 0) {
    userContext.bookmarkDocument = userContext.instances[0]
    if (userContext.instances.length > 1) {
      debug.warn('More than one bookmark file! ' + userContext.instances) // @@ todo - deal with > 1
      // Note: should pick up community bookmarks as well
    }
  } else {
    if (userContext.publicProfile) {
      // publicProfile or preferencesFile
      const newBookmarkFile = $rdf.sym(
        userContext.publicProfile.dir().uri + fileTail
      )
      try {
        debug.log('Creating new bookmark file ' + newBookmarkFile)
        await createIfNotExists(newBookmarkFile)
      } catch (e) {
        debug.warn("Can't make fresh bookmark file:" + e)
        return userContext
      }
      await registerInTypeIndex(
        newBookmarkFile,
        userContext.index,
        theClass
      )
      userContext.bookmarkDocument = newBookmarkFile
    } else {
      debug.warn('You seem to have no bookmark file and not even a profile file.')
    }
  }
  return userContext
}

/** Add a bookmark
 */

async function addBookmark (context, target) {
  /* like
 @prefix terms: <http://purl.org/dc/terms/>.
 @prefix bookm: <http://www.w3.org/2002/01/bookmark#>.
 @prefix n0: <http://xmlns.com/foaf/0.1/>.
 <> terms:references <#0.5534145389246576>.
 <#0.5534145389246576>
   a bookm:Bookmark;
   terms:created "2019-01-26T20:26:44.374Z"^^XML:dateTime;
   terms:title "Herons";
   bookm:recalls wiki:Heron;
   n0:maker c:me.
  */
  let title = ''
  const me = authn.currentUser() // If already logged on
  if (!me) throw new Error('Must be logged on to add Bookmark')

  const author = store.any(target, ns.foaf('maker'))
  title =
    label(author) + ': ' + store.anyValue(target, ns.sioc('content')).slice(0, 80) // @@ add chat title too?
  const bookmarkDoc = context.bookmarkDocument
  const bookmark = UI.widgets.newThing(bookmarkDoc, title)
  const ins = [
    $rdf.st(bookmarkDoc, UI.ns.dct('references'), bookmark, bookmarkDoc),
    $rdf.st(bookmark, UI.ns.rdf('type'), BOOK('Bookmark'), bookmarkDoc),
    $rdf.st(bookmark, UI.ns.dct('created'), new Date(), bookmarkDoc),
    $rdf.st(bookmark, BOOK('recalls'), target, bookmarkDoc),
    $rdf.st(bookmark, UI.ns.foaf('maker'), me, bookmarkDoc),
    $rdf.st(bookmark, UI.ns.dct('title'), title, bookmarkDoc)
  ]
  try {
    await updatePromise([], ins) // 20190118A
  } catch (e) {
    const msg = 'Making bookmark: ' + e
    debug.warn(msg)
    return null
  }
  return bookmark
}

export async function toggleBookmark (userContext, target, bookmarkButton) {
  await store.fetcher.load(userContext.bookmarkDocument)
  const bookmarks = store.each(
    null,
    BOOK('recalls'),
    target,
    userContext.bookmarkDocument
  )
  if (bookmarks.length) {
    // delete
    if (!confirm('Delete bookmark on this?' + bookmarks.length)) return
    for (let i = 0; i < bookmarks.length; i++) {
      try {
        await updatePromise(store.connectedStatements(bookmarks[i]), [])
        bookmarkButton.style.backgroundColor = 'white'
        debug.log('Bookmark deleted: ' + bookmarks[i])
      } catch (e) {
        debug.error('Cant delete bookmark:' + e)
        debug.warn('Cannot delete bookmark:' + e)
      }
    }
  } else {
    const bookmark = await addBookmark(userContext, target)
    bookmarkButton.style.backgroundColor = 'yellow'
    debug.log('Bookmark added: ' + bookmark)
  }
}

export async function renderBookmarksButton (userContext, target) {
  async function setBookmarkButtonColor (bookmarkButton) {
    await store.fetcher.load(userContext.bookmarkDocument)
    const bookmarked = store.any(
      null,
      BOOK('recalls'),
      bookmarkButton.target,
      userContext.bookmarkDocument
    )
    bookmarkButton.style = UI.style.buttonStyle
    if (bookmarked) bookmarkButton.style.backgroundColor = 'yellow'
  }

  let bookmarkButton
  if (userContext.bookmarkDocument) {
    bookmarkButton = UI.widgets.button(
      dom,
      UI.icons.iconBase + BOOKMARK_ICON,
      label(BOOK('Bookmark')),
      () => {
        toggleBookmark(userContext, target, bookmarkButton)
      }
    )
    bookmarkButton.target = target
    await setBookmarkButtonColor(bookmarkButton)
    return bookmarkButton
  }
}
