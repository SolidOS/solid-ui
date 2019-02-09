//  Common code for a discussion are a of messages about something
//   This version runs over a series of files for different time periods
//
//  Parameters for the whole chat like its title are stred on
//  index.ttl#this and the chats messages are stored in YYYY/MM/DD/chat.ttl
//
/* global alert confirm */
var UI = {
  authn: require('./signin'),
  icons: require('./iconBase'),
  log: require('./log'),
  ns: require('./ns'),
  media: require('./media-capture'),
  pad: require('./pad'),
  rdf: require('rdflib'),
  store: require('./store'),
  style: require('./style'),
  utils: require('./utils'),
  widgets: require('./widgets')
}

// const utils = require('./utils')
const label = UI.utils.label

// THE UNUSED ICONS are here as reminders for possible future functionality
const BOOKMARK_ICON = 'noun_45961.svg'
// const HEART_ICON = 'noun_130259.svg' -> Add this to my (private) favorites
// const MENU_ICON = 'noun_897914.svg'
// const PAPERCLIP_ICON = 'noun_25830.svg' -> add attachments to this message
// const PIN_ICON = 'noun_562340.svg'  -> pin this message permanently in the chat UI
// const PENCIL_ICON = 'noun_253504.svg'
// const SPANNER_ICON = 'noun_344563.svg' -> settings
const THUMBS_UP_ICON = 'noun_1384132.svg'
const THUMBS_DOWN_ICON = 'noun_1384135.svg'

module.exports = function (dom, kb, chatChannel, options) {
  kb = kb || UI.store
  const ns = UI.ns
  const WF = $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#')
  const DCT = $rdf.Namespace('http://purl.org/dc/terms/')
  const BOOK = $rdf.Namespace('http://www.w3.org/2002/01/bookmark#')
  // const POSIX = $rdf.Namespace('http://www.w3.org/ns/posix/stat#')

  options = options || {}

  var newestFirst = options.newestFirst === '1' || options.newestFirst === true // hack for now
  var colorizeByAuthor = options.colorizeByAuthor === '1' || options.colorizeByAuthor === true

  // var participation // An object tracking users use and prefs
  const messageBodyStyle = UI.style.messageBodyStyle

  // var messageBodyStyle = 'white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;'
  // 'font-size: 100%; margin: 0.1em 1em 0.1em 1em;  background-color: white; white-space: pre-wrap; padding: 0.1em;'

  var div = dom.createElement('div')
  var menuButton
  const statusArea = div.appendChild(dom.createElement('div'))
  var userContext = {dom, statusArea, div: statusArea} // logged on state, pointers to user's stuff
  var me

  var updater = UI.store.updater

  var anchor = function (text, term) { // If there is no link return an element anyway
    var a = dom.createElement('a')
    if (term && term.uri) {
      a.setAttribute('href', term.uri)
      a.addEventListener('click', UI.widgets.openHrefInOutlineMode, true)
      a.setAttribute('style', 'color: #3B5998; text-decoration: none; ') // font-weight: bold
    }
    a.textContent = text
    return a
  }

  var mention = function mention (message, style) {
    console.log(message)
    var pre = dom.createElement('pre')
    pre.setAttribute('style', style || 'color: grey;')
    pre.appendChild(dom.createTextNode(message))
    statusArea.appendChild(pre)
  }

  var announce = {
    log: function (message) { mention(message, 'color: #111;') },
    warn: function (message) { mention(message, 'color: #880;') },
    error: function (message) { mention(message, 'color: #800;') }
  }

  // @@@@ use the one in rdflib.js when it is avaiable and delete this
  function updatePromise (del, ins) {
    return new Promise(function (resolve, reject) {
      kb.updater.update(del, ins, function (uri, ok, errorBody) {
        if (!ok) {
          reject(new Error(errorBody))
        } else {
          resolve()
        }
      }) // callback
    }) // promise
  }

 /** Create a resource if it really does not exist
  *  Be absolutely sure something does not exist before creating a new empty file
  * as otherwise existing could  be deleted.
  * @param doc {NamedNode} - The resource
 */
  function createIfNotExists (doc) {
    return new Promise(function (resolve, reject) {
      kb.fetcher.load(doc).then(response => {
        console.log('createIfNotExists doc exists, all good ' + doc)
      // kb.fetcher.webOperation('HEAD', doc.uri).then(response => {
        resolve(response)
      }, err => {
        if (err.response.status === 404) {
          console.log('createIfNotExists doc does NOT exist, will create... ' + doc)

          kb.fetcher.webOperation('PUT', doc.uri, {data: '', contentType: 'text/turtle'}).then(response => {
            // fetcher.requested[doc.uri] = 'done' // do not need to read ??  but no headers
            delete kb.fetcher.requested[doc.uri] // delete cached 404 error
            console.log('createIfNotExists doc created ok ' + doc)
            resolve(response)
          }, err => {
            console.log('createIfNotExists doc FAILED: ' + doc + ': ' + err)
            reject(err)
          })
        } else {
          console.log('createIfNotExists doc load error NOT 404:  ' + doc + ': ' + err)
          reject(err)
        }
      })
    })
  }

 /*         Bookmarking
 */
/** Find a user's bookmarks
*/
  async function findBookmarkDocument (context) {
    const klass = BOOK('Bookmark')
    const fileTail = 'bookmarks.ttl'
    const isPublic = true

    await UI.authn.findAppInstances(context, klass, isPublic) // public -- only look for public links
    if (context.instances && context.instances.length > 0) {
      context.bookmarkDocument = context.instances[0]
      if (context.instances.length > 1) {
        alert('More than one bookmark file! ' + context.instances)
      }
    } else {
      if (userContext.publicProfile) { // publicProfile or preferencesFile
        var newBookmarkFile = $rdf.sym(userContext.publicProfile.dir().uri + fileTail)
        try {
          console.log('Creating new bookmark file ' + newBookmarkFile)
          await createIfNotExists(newBookmarkFile)
        } catch (e) {
          announce.error('Can\'t make fresh bookmark file:' + e)
          return context
        }
        await UI.authn.registerInTypeIndex(userContext, newBookmarkFile, klass, true) // public
        context.bookmarkDocument = newBookmarkFile
      } else {
        alert('You seem to have no bookmark file and not even a profile file.')
      }
    }
    return context
  }

  /** Add a bookmark
  */

  async function addBookmark (context, chatChannel) {
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
    var title = ''
    var author = kb.any(chatChannel, ns.foaf('maker'))
    title = label(author) + ': ' +
            kb.anyValue(chatChannel, ns.sioc('content')).slice(0, 80) // @@ add chat title too?
    const bookmarkDoc = context.bookmarkDocument
    const bookmark = UI.widgets.newThing(bookmarkDoc, title)
    const ins = [
      $rdf.st(bookmarkDoc, UI.ns.dct('references'), bookmark, bookmarkDoc),
      $rdf.st(bookmark, UI.ns.rdf('type'), BOOK('Bookmark'), bookmarkDoc),
      $rdf.st(bookmark, UI.ns.dct('created'), new Date(), bookmarkDoc),
      $rdf.st(bookmark, BOOK('recalls'), chatChannel, bookmarkDoc),
      $rdf.st(bookmark, UI.ns.foaf('maker'), me, bookmarkDoc),
      $rdf.st(bookmark, UI.ns.dct('title'), title, bookmarkDoc)
    ]
    try {
      await updatePromise([], ins) // 20190118A
    } catch (e) {
      let msg = 'Making bookmark: ' + e
      announce.error(msg)
      return null
    }
    return bookmark
  }

  /*  Strip of sentiments expressed
  */
  function sentimentStrip (target, doc) {
    var emoji = {}
    emoji[ns.schema('AgreeAction')] = '👍'
    emoji[ns.schema('DisagreeAction')] = '👎'
    emoji[ns.schema('EndorseAction')] = '⭐️'
    emoji[ns.schema('LikeAction')] = '❤️'

    const actions = kb.each(null, ns.schema('target'), target, doc)
    const sentiments = actions.map(a => kb.any(a, ns.rdf('type'), null, doc))
    sentiments.sort()
    const strings = sentiments.map(x => emoji[x] || '')
    return strings.join(' ')
  }

 /*    Tools for doing things with a message
  *  Let is be cretiev here.  Allow all sorts of things to
  * be done to a message - linking to new or old objects in an open way
  *
  * Ideas: Bookmark, Like, star, pin at top of chat, reply as new thread,
  * If you made it originally:  edit, delete, attach
 */
  function messageTools (message) {
    const div = dom.createElement('div')
    function closeToolbar () {
      div.parentElement.parentElement.removeChild(div.parentElement) // remive the TR
    }

    async function setBookmarkButtonColor () {
      await kb.fetcher.load(userContext.bookmarkDocument)
      let bookmarked = kb.any(null, BOOK('recalls'), message, userContext.bookmarkDocument)
      bookmarkButton.style = UI.style.buttonStyle
      if (bookmarked) bookmarkButton.style.backgroundColor = 'yellow'
    }

    async function deleteThingThen (x) {
      let sts = kb.connectedStatements(x)
      await updatePromise(sts, [])
    }

    async function toggleBookmark (userContext, message) {
      await kb.fetcher.load(userContext.bookmarkDocument)
      let bookmarks = kb.each(null, BOOK('recalls'), message, userContext.bookmarkDocument)
      if (bookmarks.length) { // delete
        if (!confirm('Delete bookmark on this message?' + bookmarks.length)) return
        for (let i = 0; i < bookmarks.length; i++) {
          try {
            await deleteThingThen(bookmarks[i])
            bookmarkButton.style.backgroundColor = 'white'
            console.log('Bookmark deleted: ' + bookmarks[i])
          } catch (e) {
            announce.error('Cant delete bookmark:' + e)
          }
        }
      } else {
        let bookmark = await addBookmark(userContext, message)
        bookmarkButton.style.backgroundColor = 'yellow'
        console.log('Bookmark added: ' + bookmark)
      }
    }

    // Things only the original author can do
    if (me && kb.holds(message, ns.foaf('maker'), me)) {
      // button to delete the message
      const deleteButton = UI.widgets.deleteButtonWithCheck(dom, div, 'message', function () {
        deleteMessage(message)
        closeToolbar()
      })
      div.appendChild(deleteButton)
    } // if mine

    // Things anyone can do if they have a bookmark list
    var bookmarkButton
    if (userContext.bookmarkDocument) {
      bookmarkButton = UI.widgets.button(dom, UI.icons.iconBase + BOOKMARK_ICON,
         label(BOOK('Bookmark')), () => {
           toggleBookmark(userContext, message)
         })
      setBookmarkButtonColor()
      div.appendChild(bookmarkButton)
    }

    /**   Button to allow user to express a sentiment (like, endorse, etc) about a target
     *
     * @param context {Object} - Provide dom and me
     * @param target {NamedNode} - The thing the user expresses an opnion about
     * @param icon {uristring} - The icon to be used for the button
     * @param actionClass {NamedNode} - The RDF class  - typically a subclass of schema:Action
     * @param doc - {NamedNode} - the Solid document iunto which the data should be written
     * @param mutuallyExclusive {Array<NamedNode>} - Any RDF classes of sentimentswhich are mutiually exclusive
    */
    function sentimentButton (context, target, icon, actionClass, doc, mutuallyExclusive) {
      function setColor () {
        button.style.backgroundColor = action ? 'yellow' : 'white'
      }
      var button = UI.widgets.button(dom, icon, UI.utils.label(actionClass), async function (event) {
        if (action) {
          await deleteThingThen(action)
          action = null
          setColor()
        } else { // no action
          action = UI.widgets.newThing(doc)
          var insertMe = [
            $rdf.st(action, ns.schema('agent'), context.me, doc),
            $rdf.st(action, ns.rdf('type'), actionClass, doc),
            $rdf.st(action, ns.schema('target'), target, doc)
          ]
          await updatePromise([], insertMe)
          setColor()

          if (mutuallyExclusive) { // Delete incompative sentiments
            var dirty = false
            for (let i = 0; i < mutuallyExclusive.length; i++) {
              let a = existingAction(mutuallyExclusive[i])
              if (a) {
                await deleteThingThen(a) // but how refresh? refreshTree the parent?
                dirty = true
              }
            }
            if (dirty) {
              UI.widgets.refreshTree(button.parentNode) // requires them all to be immediate siblings
            }
          }
        }
      })
      function existingAction (actionClass) {
        var actions = kb.each(null, ns.schema('agent'), context.me, doc)
        .filter(x => kb.holds(x, ns.rdf('type'), actionClass, doc))
        .filter(x => kb.holds(x, ns.schema('target'), target, doc))
        return actions.length ? actions[0] : null
      }
      function refresh () {
        action = existingAction(actionClass)
        setColor()
      }
      var action
      button.refresh = refresh // If the file changes, refresh live
      refresh()
      return button
    }

    // THUMBS_UP_ICON
    // https://schema.org/AgreeAction
    me = me || UI.authn.currentUser() // If already logged on
    if (me) { // Things yo mnust be logged in fo
      var context1 = {me, dom, div}
      div.appendChild(sentimentButton(context1, message, // @@ use UI.widgets.sentimentButton
        UI.icons.iconBase + THUMBS_UP_ICON,
        ns.schema('AgreeAction'),
        message.doc(),
        [ns.schema('DisagreeAction')]
      ))
        // Thumbs down
      div.appendChild(sentimentButton(context1, message,
        UI.icons.iconBase + THUMBS_DOWN_ICON,
        ns.schema('DisagreeAction'),
         message.doc(),
         [ns.schema('AgreeAction')]
       ))
    }
    // X button to remove the tool UI itself
    const cancelButton = div.appendChild(UI.widgets.cancelButton(dom))
    cancelButton.style.float = 'right'
    cancelButton.firstChild.style.opacity = '0.3'
    cancelButton.addEventListener('click', closeToolbar)
    return div
  }
  /*       Form for a new message
  */
  function newMessageForm (messageTable) {
    var form = dom.createElement('tr')
    var lhs = dom.createElement('td')
    var middle = dom.createElement('td')
    var rhs = dom.createElement('td')
    form.appendChild(lhs)
    form.appendChild(middle)
    form.appendChild(rhs)
    form.AJAR_date = '9999-01-01T00:00:00Z' // ISO format for field sort
    var field, sendButton

    function sendMessage (text) {
      var now = new Date()
      addNewTableIfNewDay(now).then(() => {
        if (!text) {
          field.setAttribute('style', messageBodyStyle + 'color: #bbb;') // pendingedit
          field.disabled = true
        }
        var sts = []
        var timestamp = '' + now.getTime()
        var dateStamp = $rdf.term(now)
        let chatDocument = chatDocumentFromDate(now)

        var message = kb.sym(chatDocument.uri + '#' + 'Msg' + timestamp)
        var content = kb.literal(text || field.value)
        // if (text) field.value = text  No - don't destroy half-finsihed user input

        sts.push(new $rdf.Statement(chatChannel, ns.wf('message'), message, chatDocument))
        sts.push(new $rdf.Statement(message, ns.sioc('content'), content, chatDocument))
        sts.push(new $rdf.Statement(message, DCT('created'), dateStamp, chatDocument))
        if (me) sts.push(new $rdf.Statement(message, ns.foaf('maker'), me, chatDocument))

        var sendComplete = function (uri, success, body) {
          if (!success) {
            form.appendChild(UI.widgets.errorMessageBlock(
              dom, 'Error writing message: ' + body))
          } else {
            var bindings = { '?msg': message,
              '?content': content,
              '?date': dateStamp,
              '?creator': me}
            renderMessage(liveMessageTable, bindings, false) // not green

            if (!text) {
              field.value = '' // clear from out for reuse
              field.setAttribute('style', messageBodyStyle)
              field.disabled = false
              field.scrollIntoView(newestFirst) // allign bottom (top)
              field.focus() // Start typing next line immediately
              field.select()
            }
          }
        }
        updater.update([], sts, sendComplete)
      }) // then
    } // sendMessage

    form.appendChild(dom.createElement('br'))

    //    DRAG AND DROP
    function droppedFileHandler (files) {
      let base = messageTable.chatDocument.dir().uri
      UI.widgets.uploadFiles(kb.fetcher, files, base + 'Files', base + 'Pictures',
        function (theFile, destURI) { // @@@@@@ Wait for eachif several
          sendMessage(destURI)
        })
    }

    // When a set of URIs are dropped on the field
    var droppedURIHandler = function (uris) {
      sendMessage(uris[0]) // @@@@@ wait
    }

    // When we are actually logged on
    function turnOnInput () {
      if (options.menuHandler && menuButton) {
        let menuOptions = { me, dom, div, newBase: messageTable.chatDocument.dir().uri }
        menuButton.addEventListener('click',
          event => { options.menuHandler(event, chatChannel, menuOptions) }
          , false)
      }

      // Turn on message input
      creatorAndDate(lhs, me, '', null)

      field = dom.createElement('textarea')
      middle.innerHTML = ''
      middle.appendChild(field)
      field.rows = 3
      // field.cols = 40
      field.setAttribute('style', messageBodyStyle + 'background-color: #eef;')

      // Trap the Enter BEFORE it is used ti make a newline
      field.addEventListener('keydown', function (e) { // User preference?
        if (e.keyCode === 13) {
          if (!e.altKey) { // Alt-Enter just adds a new line
            sendMessage()
          }
        }
      }, false)
      UI.widgets.makeDropTarget(field, droppedURIHandler, droppedFileHandler)

      rhs.innerHTML = ''
      sendButton = UI.widgets.button(dom, UI.icons.iconBase + 'noun_383448.svg', 'Send')
      sendButton.setAttribute('style', UI.style.buttonStyle + 'float: right;')
      sendButton.addEventListener('click', ev => sendMessage(), false)
      rhs.appendChild(sendButton)

      const chatDocument = chatDocumentFromDate(new Date())
      var imageDoc
      function getImageDoc () {
        imageDoc = kb.sym(chatDocument.dir().uri + 'Image_' + Date.now() + '.png')
        return imageDoc
      }
      function tookPicture (imageDoc) {
        if (imageDoc) {
          sendMessage(imageDoc.uri)
        }
      }
      middle.appendChild(UI.media.cameraButton(dom, kb, getImageDoc, tookPicture))

      UI.pad.recordParticipation(chatChannel, chatChannel.doc()) // participation =
    } // turn on inpuut

    let context = {div: middle, dom: dom}
    UI.authn.logIn(context).then(context => {
      me = context.me
      turnOnInput()
      userContext = context
      findBookmarkDocument(context).then(context => {
        console.log('Bookmark file: ' + context.bookmarkDocument)
      })
    })

    return form
  }

  function nick (person) {
    var s = UI.store.any(person, UI.ns.foaf('nick'))
    if (s) return '' + s.value
    return '' + label(person)
  }

  function creatorAndDate (td1, creator, date, message) {
    var nickAnchor = td1.appendChild(anchor(nick(creator), creator))
    if (creator.uri) {
      UI.store.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (ok, body) {
        nickAnchor.textContent = nick(creator)
      })
    }
    td1.appendChild(dom.createElement('br'))
    td1.appendChild(anchor(date, message))
  }

  // ///////////////////////////////////////////////////////////////////////

  function syncMessages (about, messageTable) {
    var displayed = {}
    var ele, ele2
    for (ele = messageTable.firstChild; ele; ele = ele.nextSibling) {
      if (ele.AJAR_subject) {
        displayed[ele.AJAR_subject.uri] = true
      }
    }

    var messages = kb.statementsMatching(
      about, ns.wf('message'), null, messageTable.chatDocument).map(st => { return st.object })
    var stored = {}
    messages.map(function (m) {
      stored[m.uri] = true
      if (!displayed[m.uri]) {
        addMessage(m, messageTable)
      }
    })

    for (ele = messageTable.firstChild; ele;) {
      ele2 = ele.nextSibling
      if (ele.AJAR_subject && !stored[ele.AJAR_subject.uri]) {
        messageTable.removeChild(ele)
      }
      ele = ele2
    }
  }

  var deleteMessage = function (message) {
    var deletions = kb.statementsMatching(message).concat(
      kb.statementsMatching(undefined, undefined, message))
    updater.update(deletions, [], function (uri, ok, body) {
      if (!ok) {
        announce.error('Cant delete messages:' + body)
      } else {
        syncMessages(chatChannel, liveMessageTable)
      }
    })
  }

  var addMessage = function (message, messageTable) {
    var bindings = {
      '?msg': message,
      '?creator': kb.any(message, ns.foaf('maker')),
      '?date': kb.any(message, DCT('created')),
      '?content': kb.any(message, ns.sioc('content'))
    }
    renderMessage(messageTable, bindings, messageTable.fresh) // fresh from elsewhere
  }

  function elementForImageURI (imageUri, options) {
    let img = dom.createElement('img')
    let height = '10'
    if (options.inlineImageHeightEms) {
      height = ('' + options.inlineImageHeightEms).trim()
    }
    img.setAttribute('style', 'max-height: ' + height + 'em; border-radius: 1em; margin: 0.7em;')
    // UI.widgets.makeDropTarget(img, handleURIsDroppedOnMugshot, droppedFileHandler)
    if (imageUri) img.setAttribute('src', imageUri)
    let anchor = dom.createElement('a')
    anchor.setAttribute('href', imageUri)
    anchor.setAttribute('target', 'images')
    anchor.appendChild(img)
    UI.widgets.makeDraggable(img, $rdf.sym(imageUri))
    return anchor
  }

  function renderMessage (messageTable, bindings, fresh) {
    var creator = bindings['?creator']
    var message = bindings['?msg']
    var date = bindings['?date']
    var content = bindings['?content']

    var dateString = date.value
    var tr = dom.createElement('tr')
    tr.AJAR_date = dateString
    tr.AJAR_subject = message

    if (options.selectedMessage && options.selectedMessage.sameTerm(message)) {
      tr.style.backgroundColor = 'yellow'
      options.selectedElement = tr
      messageTable.selectedElement = tr
    }

    var done = false
    for (var ele = messageTable.firstChild; ; ele = ele.nextSibling) {
      if (!ele) { // empty
        break
      }
      if (((dateString > ele.AJAR_date) && newestFirst) ||
        ((dateString < ele.AJAR_date) && !newestFirst)) {
        messageTable.insertBefore(tr, ele)
        done = true
        break
      }
    }
    if (!done) {
      messageTable.appendChild(tr)
    }

    var td1 = dom.createElement('td')
    tr.appendChild(td1)
    creatorAndDate(td1, creator, UI.widgets.shortDate(dateString), message)

    var td2 = tr.appendChild(dom.createElement('td'))
    let text = content.value.trim()
    let isURI = (/^https?:\/[^ <>]*$/i).test(text)
    let para = null
    if (isURI) {
      var isImage = (/\.(gif|jpg|jpeg|tiff|png|svg)$/i).test(text) // @@ Should use content-type not URI
      if (isImage && options.expandImagesInline) {
        let img = elementForImageURI(text, options)
        td2.appendChild(img)
      } else { // Link but not Image
        let anc = td2.appendChild(dom.createElement('a'))
        para = anc.appendChild(dom.createElement('p'))
        anc.href = text
        para.textContent = text
        td2.appendChild(anc)
      }
    } else { // text
      para = dom.createElement('p')
      td2.appendChild(para)
      para.textContent = text
    }
    if (para) {
      var bgcolor = colorizeByAuthor
          ? UI.pad.lightColorHash(creator)
          : (fresh ? '#e8ffe8' : 'white')
      para.setAttribute('style', messageBodyStyle + 'background-color: ' + bgcolor + ';')
    }

    var td3 = dom.createElement('td')
    tr.appendChild(td3)

    // Message tool bar button

    var toolsButton = UI.widgets.button(dom, UI.icons.iconBase + 'noun_243787.svg', '...')
    td3.appendChild(toolsButton)
    td3.appendChild(dom.createTextNode(sentimentStrip(message, message.doc())))
    toolsButton.addEventListener('click', function (e) {
      if (tr.toolTR) { // already got a toolbar? Toogle
        tr.parentNode.removeChild(tr.toolTR)
        delete tr.toolTR
        return
      }
      const toolsTR = dom.createElement('tr')
      const tools = messageTools(message)
      tools.style = 'border: 0.1em solid #888; border-radius: 0 0 0.7em 0.7em;  border-top: 0; height:3.5em; background-color: #fff;' // @@ fix
      if (tr.nextSibling) {
        tr.parentElement.insertBefore(toolsTR, tr.nextSibling)
      } else {
        tr.parentElement.appendChild(toolsTR)
      }
      tr.toolTR = toolsTR
      toolsTR.appendChild(dom.createElement('td')) // left
      const toolsTD = toolsTR.appendChild(dom.createElement('td'))
      toolsTR.appendChild(dom.createElement('td')) // right
      toolsTD.appendChild(tools)
    })
  }

  /* Add a new messageTable at the top/bottom
  */
  async function insertPreviousMessages (backwards) {
    let extremity = backwards ? earliest : latest
    let date = extremity.messageTable.date// day in mssecs

    date = await loadPrevious(date, backwards) // backwards
    console.log(`insertPreviousMessages: from ${backwards ? 'backwards' : 'forwards'} loadPrevious: ${date}`)
    if (!date && !backwards && !liveMessageTable) {
      await appendCurrentMessages()  // If necessary skip to today and add that
    }
    if (!date) return true // done
    var live = false
    if (!backwards) {
      let todayDoc = chatDocumentFromDate(new Date())
      let doc = chatDocumentFromDate(date)
      live = doc.sameTerm(todayDoc) // Is this todays?
    }
    let newMessageTable = await createMessageTable(date, live)
    extremity.messageTable = newMessageTable // move pointer to earliest
    if (backwards ? newestFirst : !newestFirst) { // put on bottom or top
      div.appendChild(newMessageTable)
    } else { // put on top as we scroll back
      div.insertBefore(newMessageTable, div.firstChild)
    }
    return live // not done
  }
  /* Remove message tables earlier than this one
  */
  function removePreviousMessages (backwards, messageTable) {
    if (backwards ? newestFirst : !newestFirst) { // it was put on bottom
      while (messageTable.nextSibling) {
        div.removeChild(messageTable.nextSibling)
      }
    } else { // it was put on top as we scroll back
      while (messageTable.previousSibling) {
        div.removeChild(messageTable.previousSibling)
      }
    }
    let extr = backwards ? earliest : latest
    extr.messageTable = messageTable
  }

  /* Generate the chat document (rdf object) from date
  * @returns: <NamedNode> - document
  */
  function chatDocumentFromDate (date) {
    let isoDate = date.toISOString() // Like "2018-05-07T17:42:46.576Z"
    var path = isoDate.split('T')[0].replace(/-/g, '/') //  Like "2018/05/07"
    path = chatChannel.dir().uri + path + '/chat.ttl'
    return $rdf.sym(path)
  }

  /* Generate a date object from the chat file name
  */
  function dateFromChatDocument (doc) {
    const head = chatChannel.dir().uri.length
    const str = doc.uri.slice(head, head + 10).replace(/\//g, '-')
    // let date = new Date(str + 'Z') // GMT - but fails in FF - invalid format :-(
    let date = new Date(str) // not explicitly UTC but is assumed so in spec
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
    console.log('Date for ' + doc + ':' + date.toISOString())
    return date
  }

  /* LOad and render message table
  ** @returns DOM element generates
  */
  async function createMessageTable (date, live) {
    console.log('   createMessageTable for  ' + date)
    const chatDocument = chatDocumentFromDate(date)
    try {
      await kb.fetcher.load(chatDocument)
    } catch (err) {
      let messageTable = (dom.createElement('table'))
      let statusTR = messageTable.appendChild(dom.createElement('tr')) // ### find status in exception
      if (err.response && err.response.status && err.response.status === 404) {
        statusTR.appendChild(UI.widgets.errorMessageBlock(dom, 'no messages', 'white'))
      } else {
        statusTR.appendChild(UI.widgets.errorMessageBlock(dom, err, 'pink'))
      }
      return statusTR
    }
    return renderMessageTable(date, live)
  }

  function renderMessageTable (date, live) {
    var scrollBackButton
    var scrollForwardButton

/// /////////////////   Scrooll down adding more above

    async function extendBackwards () {
      let done = await insertPreviousMessages(true)
      if (done) {
        scrollBackButton.firstChild.setAttribute('src', UI.icons.iconBase + 'noun_T-Block_1114655_000000.svg') // T
        scrollBackButton.disabled = true
        messageTable.initial = true
      } else {
        messageTable.extendedBack = true
      }
      setScrollBackButtonIcon()
      return done
    }
    function setScrollBackButtonIcon () {
      let sense = messageTable.extendedBack ? !newestFirst : newestFirst
      let scrollBackIcon = messageTable.initial ? 'noun_T-Block_1114655_000000.svg'
        : (sense ? 'noun_1369241.svg' : 'noun_1369237.svg')
      scrollBackButton.firstChild.setAttribute('src', UI.icons.iconBase + scrollBackIcon)
    }
    async function scrollBackButtonHandler (event) {
      if (messageTable.extendedBack) {
        removePreviousMessages(true, messageTable)
        messageTable.extendedBack = false
        setScrollBackButtonIcon()
      } else {
        await extendBackwards()
      }
    }

    /// ////////////// Scroll up adding more below

    async function extendForwards () {
      let done = await insertPreviousMessages(false)
      if (done) {
        scrollForwardButton.firstChild.setAttribute('src', UI.icons.iconBase + 'noun_T-Block_1114655_000000.svg')
        scrollForwardButton.disabled = true
        messageTable.final = true
      } else {
        messageTable.extendedForwards = true
      }
      setScrollForwardButtonIcon()
      return done
    }
    function setScrollForwardButtonIcon () {
      let sense = messageTable.extendedForwards ? !newestFirst : newestFirst // noun_T-Block_1114657_000000.svg
      let scrollForwardIcon = messageTable.final ? 'noun_T-Block_1114657_000000.svg'
        : (!sense ? 'noun_1369241.svg' : 'noun_1369237.svg')
      scrollForwardButton.firstChild.setAttribute('src', UI.icons.iconBase + scrollForwardIcon)
    }
    async function scrollForwardButtonHandler (event) {
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

    var messageTable = dom.createElement('table')

    messageTable.extendBackwards = extendBackwards // Make function available to scroll stuff
    messageTable.extendForwards = extendForwards // Make function available to scroll stuff
    // var messageButton
    messageTable.date = date
    var chatDocument = chatDocumentFromDate(date)
    messageTable.chatDocument = chatDocument

    messageTable.fresh = false
    messageTable.setAttribute('style', 'width: 100%;') // fill that div!

    if (live) {
      messageTable.final = true
      liveMessageTable = messageTable
      latest.messageTable = messageTable
      var tr = newMessageForm(messageTable)
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
      let scrollBackButtonTR = dom.createElement('tr')
      // up traingles: noun_1369237.svg
      // down triangles: noun_1369241.svg
      let scrollBackIcon = newestFirst ? 'noun_1369241.svg' : 'noun_1369237.svg' // down and up arrows respoctively
      scrollBackButton = UI.widgets.button(dom, UI.icons.iconBase + scrollBackIcon, 'Previous messages ...')
      let scrollBackButtonCell = scrollBackButtonTR.appendChild(dom.createElement('td'))
      scrollBackButtonCell.style = 'width:3em; height:3em;'
      scrollBackButton.addEventListener('click', scrollBackButtonHandler, false)
      messageTable.extendedBack = false
      scrollBackButtonCell.appendChild(scrollBackButton)
      setScrollBackButtonIcon()

      let dateCell = scrollBackButtonTR.appendChild(dom.createElement('td'))
      dateCell.style = 'text-align: center; vertical-align: middle; color: #888; font-style: italic;'
      dateCell.textContent = UI.widgets.shortDate(date.toISOString(), true) // no time, only date

      // @@@@@@@@@@@ todo move this button to other end of  message cell, o
      let scrollForwardButtonCell = scrollBackButtonTR.appendChild(dom.createElement('td'))
      let scrollForwardIcon = newestFirst ? 'noun_1369241.svg' : 'noun_1369237.svg' // down and up arrows respoctively
      scrollForwardButton = UI.widgets.button(dom, UI.icons.iconBase + scrollForwardIcon, 'Later messages ...')
      scrollForwardButtonCell.appendChild(scrollForwardButton)
      scrollForwardButtonCell.style = 'width:3em; height:3em;'
      scrollForwardButton.addEventListener('click', scrollForwardButtonHandler, false)
      messageTable.extendedForward = false
      setScrollForwardButtonIcon()

      messageTable.extendedForwards = false

      if (!newestFirst) { // opposite end from the entry field
        messageTable.insertBefore(scrollBackButtonTR, messageTable.firstChild) // If not newestFirst
      } else {
        messageTable.appendChild(scrollBackButtonTR) //  newestFirst
      }
    }

    let sts = kb.statementsMatching(null, WF('message'), null, chatDocument)
    if (!live && sts.length === 0) { // not todays
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

/* Track back through the YYYY/MM/DD tree to find the previous/next day
**
*/
  async function loadPrevious (date, backwards) {
    async function previousPeriod (file, level) {
      function younger (x) {
        if (backwards ? x.uri >= file.uri : x.uri <= file.uri) return false // later than we want or same -- looking for different
        return true
      }
      function suitable (x) {
        let tail = x.uri.slice(0, -1).split('/').slice(-1)[0]
        if (!'0123456789'.includes(tail[0])) return false // not numeric
        return true
        // return kb.anyValue(chatDocument, POSIX('size')) !== 0 // empty file?
      }
      async function lastNonEmpty (siblings) {
        siblings = siblings.filter(suitable)
        siblings.sort() // chronological order
        if (!backwards) siblings.reverse()
        if (level !== 3) return siblings.pop() // only length chck final leverl
        while (siblings.length) {
          let folder = siblings.pop()
          let chatDocument = kb.sym(folder.uri + 'chat.ttl')
          await kb.fetcher.load(chatDocument)
          // files can have seealso links. skip ones with no messages with a date
          if (kb.statementsMatching(null, DCT('created'), null, chatDocument).length > 0) {
            return folder
          }
        }
        return null
      }
      // console.log('  previousPeriod level' + level + ' file ' + file)
      const parent = file.dir()
      await kb.fetcher.load(parent)
      var siblings = kb.each(parent, ns.ldp('contains'))
      siblings = siblings.filter(younger)
      let folder = await lastNonEmpty(siblings)
      if (folder) return folder

      if (level === 0) return null // 3:day, 2:month, 1: year  0: no

      const uncle = await previousPeriod(parent, level - 1)
      if (!uncle) return null // reached first ever
      await kb.fetcher.load(uncle)
      var cousins = kb.each(uncle, ns.ldp('contains'))
      let result = await lastNonEmpty(cousins)
      return result
    } // previousPeriod

    let folder = chatDocumentFromDate(date).dir()
    let found = await previousPeriod(folder, 3)
    if (found) {
      let doc = kb.sym(found.uri + 'chat.ttl')
      return dateFromChatDocument(doc)
    }
    return null
  }

  async function addNewTableIfNewDay (now) {
    // let now = new Date()
    // @@ Remove listener from previous table as it is now static
    let newChatDocument = chatDocumentFromDate(now)
    if (!newChatDocument.sameTerm(latest.messageTable.chatDocument)) { // It is a new day
      if (liveMessageTable.inputRow) {
        liveMessageTable.removeChild(liveMessageTable.inputRow)
        delete liveMessageTable.inputRow
      }
      var oldChatDocument = latest.messageTable.chatDocument
      await appendCurrentMessages()
      // Adding a link in the document will ping listeners to add the new block too
      if (!kb.holds(oldChatDocument, ns.rdfs('seeAlso'), newChatDocument, oldChatDocument)) {
        let sts = [$rdf.st(oldChatDocument, ns.rdfs('seeAlso'), newChatDocument, oldChatDocument)]
        updater.update([], sts, function (ok, body) {
          if (!ok) {
            alert('Unable to link old message block to new one.' + body)
          }
        })
      }
    }
  }
/*
  function messageCount () {
    var n = 0
    const tables = div.children
    for (let i = 0; i < tables.length; i++) {
      n += tables[i].children.length - 1
      // console.log('    table length:' + tables[i].children.length)
    }
    return n
  }
*/
/* Add the live message block with entry field for today
*/
  async function appendCurrentMessages () {
    var now = new Date()
    var chatDocument = chatDocumentFromDate(now)
    try {
      await createIfNotExists(chatDocument)
    } catch (e) {
      div.appendChild(UI.widgets.errorMessageBlock(
        dom, 'Problem accessing chat file: ' + e))
      return
    }
    const messageTable = await createMessageTable(now, true)
    div.appendChild(messageTable)
    div.refresh = function () { // only the last messageTable is live
      addNewTableIfNewDay(new Date()).then(() => { syncMessages(chatChannel, messageTable) })
    } // The short chat version fors live update in the pane but we do it in the widget
    kb.updater.addDownstreamChangeListener(chatDocument, div.refresh) // Live update
    liveMessageTable = messageTable
    latest.messageTable = liveMessageTable
    return messageTable
  }

  var liveMessageTable
  var earliest = {messageTable: null}  // Stuff about each end of the loaded days
  var latest = {messageTable: null}

  var lock = false
  async function loadMoreWhereNeeded (event, fixScroll) {
    if (lock) return
    lock = true
    const freeze = !fixScroll
    const magicZone = 150
    // const top = div.scrollTop
    // const bottom = div.scrollHeight - top - div.clientHeight
    var done

    while (div.scrollTop < magicZone &&
        earliest.messageTable &&
        !earliest.messageTable.initial &&
        earliest.messageTable.extendBackwards) {
      let scrollBottom = div.scrollHeight - div.scrollTop
      console.log('infinite scroll: adding above: top ' + div.scrollTop)
      done = await earliest.messageTable.extendBackwards()
      if (freeze) {
        div.scrollTop = div.scrollHeight - scrollBottom
      }
      if (fixScroll) fixScroll()
      if (done) break
    }
    while (options.selectedMessage && // we started in the middle not at the bottom
        div.scrollHeight - div.scrollTop - div.clientHeight < magicZone && // we are scrolled right to the bottom
        latest.messageTable &&
        !latest.messageTable.final && // there is more data to come
        latest.messageTable.extendForwards) {
      let scrollTop = div.scrollTop
      console.log('infinite scroll: adding below: bottom: ' + (div.scrollHeight - div.scrollTop - div.clientHeight))
      done = await latest.messageTable.extendForwards() // then add more data on the bottom
      if (freeze) {
        div.scrollTop = scrollTop // while adding below keep same things in view
      }
      if (fixScroll) fixScroll()
      if (done) break
    }
    lock = false
  }

  async function go () {
    function yank () {
      selectedMessageTable.selectedElement.scrollIntoView({block: 'center'})
    }

    // During initial load ONLY keep scroll to selected thing or bottom
    function fixScroll () {
      if (options.selectedElement) {
        options.selectedElement.scrollIntoView({block: 'center'}) // allign tops or bopttoms
      } else {
        liveMessageTable.inputRow.scrollIntoView(newestFirst) // allign tops or bopttoms
      }
    }

    var live
    if (options.selectedMessage) {
      var selectedDocument = options.selectedMessage.doc()
      var now = new Date()
      var todayDocument = chatDocumentFromDate(now)
      live = todayDocument.sameTerm(selectedDocument)
    }
    if (options.selectedMessage && !live) {
      var selectedDate = dateFromChatDocument(selectedDocument)
      var selectedMessageTable = await createMessageTable(selectedDate, live)
      div.appendChild(selectedMessageTable)
      earliest.messageTable = selectedMessageTable
      latest.messageTable = selectedMessageTable
      yank()
      setTimeout(yank, 1000) // @@ kludge - restore position distubed by other cHANGES
    } else { // Live end
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
  go()
  return div
}
