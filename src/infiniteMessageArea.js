//  Common code for a discussion are a of messages about something
//   This version runs over a series of files for different time periods
//
//  Parameters for the whole chat like its title are stred on
//  index.ttl#this and the chats messages are stored in YYYY/MM/DD/chat.ttl
//
var UI = {
  authn: require('./signin'),
  icons: require('./iconBase'),
  log: require('./log'),
  ns: require('./ns'),
  pad: require('./'),
  rdf: require('rdflib'),
  store: require('./store'),
  style: require('./style'),
  widgets: require('./widgets')
}

const utils = require('./utils')

// var buttonStyle = 'font-size: 100%; margin: 0.8em; padding:0.5em; background-color: white;'

module.exports = function (dom, kb, subject, options) {
  kb = kb || UI.store
  var ns = UI.ns
  var WF = $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#')
  var DCT = $rdf.Namespace('http://purl.org/dc/terms/')

  options = options || {}

  var newestFirst = !!options.newestFirst

  var messageBodyStyle = 'white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;'
  // 'font-size: 100%; margin: 0.1em 1em 0.1em 1em;  background-color: white; white-space: pre-wrap; padding: 0.1em;'

  var div = dom.createElement('div')
  // var messageTable // Shared by initial build and addMessageFromBindings
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
    var pre = dom.createElement('pre')
    pre.setAttribute('style', style || 'color: grey')
    div.appendChild(pre)
    pre.appendChild(dom.createTextNode(message))
    return pre
  }

  var announce = {
    log: function (message) { mention(message, 'color: #111;') },
    warn: function (message) { mention(message, 'color: #880;') },
    error: function (message) { mention(message, 'color: #800;') }
  }

  function createIfNotExists (doc) {
    return new Promise(function (resolve, reject) {
      kb.fetcher.load(doc).then(response => {
      // kb.fetcher.webOperation('HEAD', doc.uri).then(response => {
        resolve(response)
      }, err => {
        if (err.response.status === 404) {
          kb.fetcher.webOperation('PUT', doc.uri, {data: '', contentType: 'text/turtle'}).then(response => {
            resolve(response)
          }, err => {
            reject(err)
          })
        } else {
          reject(err)
        }
      })
    })
  }
  //       Form for a new message
  //
  var newMessageForm = function () {
    var form = dom.createElement('tr')
    var lhs = dom.createElement('td')
    var middle = dom.createElement('td')
    var rhs = dom.createElement('td')
    form.appendChild(lhs)
    form.appendChild(middle)
    form.appendChild(rhs)
    form.AJAR_date = '9999-01-01T00:00:00Z' // ISO format for field sort

    var sendMessage = function () {
      // titlefield.setAttribute('class','pendingedit')
      // titlefield.disabled = true
      field.setAttribute('class', 'pendingedit')
      field.disabled = true
      var sts = []
      var now = new Date()
      var timestamp = '' + now.getTime()
      var dateStamp = $rdf.term(now)
      let chatDocument = chatDocumentFromDate(now)

      var message = kb.sym(chatDocument.uri + '#' + 'Msg' + timestamp)

      sts.push(new $rdf.Statement(subject, ns.wf('message'), message, chatDocument))
      // sts.push(new $rdf.Statement(message, ns.dc('title'), kb.literal(titlefield.value), chatDocument))
      sts.push(new $rdf.Statement(message, ns.sioc('content'), kb.literal(field.value), chatDocument))
      sts.push(new $rdf.Statement(message, DCT('created'), dateStamp, chatDocument))
      if (me) sts.push(new $rdf.Statement(message, ns.foaf('maker'), me, chatDocument))

      var sendComplete = function (uri, success, body) {
        if (!success) {
          form.appendChild(UI.widgets.errorMessageBlock(
            dom, 'Error writing message: ' + body))
        } else {
          var bindings = { '?msg': message,
            '?content': kb.literal(field.value),
            '?date': dateStamp,
            '?creator': me}
          renderMessage(messageTable, bindings, false) // not green

          field.value = '' // clear from out for reuse
          field.setAttribute('class', '')
          field.disabled = false
        }
      }
      updater.update([], sts, sendComplete)
    }
    form.appendChild(dom.createElement('br'))

    var field, sendButton
    var turnOnInput = function () {
      creatorAndDate(lhs, me, '', null)

      field = dom.createElement('textarea')
      middle.innerHTML = ''
      middle.appendChild(field)
      field.rows = 3
      // field.cols = 40
      field.setAttribute('style', messageBodyStyle + 'background-color: #eef;')

      field.addEventListener('keyup', function (e) { // User preference?
        if (e.keyCode === 13) {
          if (!e.altKey) { // Alt-Enter just adds a new line
            sendMessage()
          }
        }
      }, false)

      rhs.innerHTML = ''
      sendButton = UI.widgets.button(dom, UI.icons.iconBase + 'noun_383448.svg', 'Send')
      sendButton.setAttribute('style', UI.style.buttonStyle + 'float: right;')
      sendButton.addEventListener('click', sendMessage, false)
      rhs.appendChild(sendButton)
    }

    let context = {div: middle, dom: dom}
    UI.authn.logIn(context).then(context => {
      me = context.me
      turnOnInput()
    })

    return form
  }

  function nick (person) {
    var s = UI.store.any(person, UI.ns.foaf('nick'))
    if (s) return '' + s.value
    return '' + utils.label(person)
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
    var messages = kb.each(about, ns.wf('message'))
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
        syncMessages(subject, messageTable)
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
    renderMessage(messageTable, bindings, true) // fresh from elsewhere
  }

  var renderMessage = function (messageTable, bindings, fresh) {
    var creator = bindings['?creator']
    var message = bindings['?msg']
    var date = bindings['?date']
    var content = bindings['?content']

    var dateString = date.value
    var tr = dom.createElement('tr')
    tr.AJAR_date = dateString
    tr.AJAR_subject = message

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

    var td2 = dom.createElement('td')
    tr.appendChild(td2)
    var pre = dom.createElement('p')
    pre.setAttribute('style', messageBodyStyle +
      (fresh ? 'background-color: #e8ffe8;' : 'background-color: #white;'))
    td2.appendChild(pre)
    pre.textContent = content.value

    var td3 = dom.createElement('td')
    tr.appendChild(td3)

    var delButton = dom.createElement('button')
    td3.appendChild(delButton)
    delButton.textContent = '-'

    tr.setAttribute('class', 'hoverControl') // See tabbedtab.css (sigh global CSS)
    delButton.setAttribute('class', 'hoverControlHide')
    delButton.setAttribute('style', 'color: red;')
    delButton.addEventListener('click', function (e) {
      td3.removeChild(delButton) // Ask -- are you sure?
      var cancelButton = dom.createElement('button')
      cancelButton.textContent = 'cancel'
      td3.appendChild(cancelButton).addEventListener('click', function (e) {
        td3.removeChild(sureButton)
        td3.removeChild(cancelButton)
        td3.appendChild(delButton)
      }, false)
      var sureButton = dom.createElement('button')
      sureButton.textContent = 'Delete message'
      td3.appendChild(sureButton).addEventListener('click', function (e) {
        td3.removeChild(sureButton)
        td3.removeChild(cancelButton)
        deleteMessage(message)
      }, false)
    }, false)
  }

  function insertPreviousMessages (event) {
    let date = new Date(earliestDate.getTime() - 86400000) // day in mssecs
    let newMessageTable = createMessageTable(date, false) // not live
    if (newestFirst) { // put on bottom
      div.appendChild(newMessageTable)
    } else { // put on top as we scroll back
      div.insertBefore(newMessageTable, div.firstChild)
    }
    // earliestMessageTable = newMessageTable
    earliestDate = date
  }
/*
  function loadMessageTable (messageTable, chatDocument) {
    var query
    // Do this with a live query to pull in messages from web
    if (options.query) {
      query = options.query
    } else {
      query = new $rdf.Query('Messages')
      var v = {}
      var vs = ['msg', 'date', 'creator', 'content']
      vs.map(function (x) {
        query.vars.push(v[x] = $rdf.variable(x))
      })
      query.pat.add(subject, WF('message'), v['msg'], chatDocument)
      query.pat.add(v['msg'], ns.dct('created'), v['date'], chatDocument)
      query.pat.add(v['msg'], ns.foaf('maker'), v['creator'], chatDocument)
      query.pat.add(v['msg'], ns.sioc('content'), v['content'], chatDocument)
    }
    function doneQuery () {
      messageTable.fresh = true // any new are fresh and so will be greenish
    }
    function renderMessageHere (bindings) {
      renderMessage(messageTable, bindings)
    }
    kb.query(query, renderMessageHere, undefined, doneQuery)
  }
*/
  function loadMessageTable2 (messageTable, chatDocument) {
    kb.fetcher.load(chatDocument).then(response => {
      let sts = kb.statementsMatching(null, WF('message'), null, chatDocument)
      sts.forEach(st => {
        addMessage(st.object, messageTable)
      })
      messageTable.fresh = true
    }, err => {
      let statusTR = messageTable.appendChild(dom.createElement('tr'))
      statusTR.appendChild(UI.widgets.errorMessageBlock(dom, err, 'pink'))
    })
  }

  function chatDocumentFromDate (date) {
    let isoDate = date.toISOString() // Like "2018-05-07T17:42:46.576Z"
    var path = isoDate.split('T')[0].replace('-', '/') //  Like "2018/05/07"
    path = subject.dir().uri + path + '/chat.ttl'
    return $rdf.sym(path)
  }

  function createMessageTable (date, live) {
    var messageTable = dom.createElement('table')
    var chatDocument = chatDocumentFromDate(date)

    messageTable.fresh = false
    messageTable.setAttribute('style', 'width: 100%;') // fill that div!

    if (live) {
      var tr = newMessageForm()
      if (newestFirst) {
        messageTable.insertBefore(tr, messageTable.firstChild) // If newestFirst
      } else {
        messageTable.appendChild(tr) // not newestFirst
      }
    }

    /// ///// Infinite scroll
    //
    // @@ listen for swipe past end event not just button
    if (options.infinite) {
      let moreButtonTR = dom.createElement('tr')
      // up traingles: noun_1369237.svg
      // down triangles: noun_1369241.svg
      let moreIcon = newestFirst ? 'noun_1369241.svg' : 'noun_1369237.svg' // @@ Find   down and up arrows respoctively
      let moreButton = UI.widgets.button(dom, UI.icons.iconBase + moreIcon, 'Previous messages ...')
      // moreButton.setAttribute('style', UI.style.buttonStyle)
      moreButton.addEventListener('click', insertPreviousMessages, false)
      let moreButtonCell = moreButtonTR.appendChild(dom.createElement('td'))
      moreButtonCell.appendChild(moreButton)
      moreButtonCell.style = 'width:3em; height:3em;'

      let dateCell = moreButtonTR.appendChild(dom.createElement('td'))
      dateCell.style = 'text-align: center; color: #888; font-style: italic;'
      dateCell.textContent = UI.widgets.shortDate(date.toISOString())

      let menuIcon = 'noun_897914.svg' // or maybe dots noun_243787.svg
      let menuButton = UI.widgets.button(dom, UI.icons.iconBase + menuIcon, 'Menu ...')
      // menuButton.setAttribute('style', UI.style.buttonStyle)
      menuButton.addEventListener('click', insertPreviousMessages, false)
      let menuButtonCell = moreButtonTR.appendChild(dom.createElement('td'))
      menuButtonCell.appendChild(menuButton)
      menuButtonCell.style = 'width:3em; height:3em;'

      if (!newestFirst) { // opposite end from the entry field
        messageTable.insertBefore(moreButtonTR, messageTable.firstChild) // If not newestFirst
      } else {
        messageTable.appendChild(moreButtonTR) //  newestFirst
      }
    }
    loadMessageTable2(messageTable, chatDocument)
    return messageTable
  } // createMessageTable

  var now = new Date()
  var messageTable, earliestDate
  var chatDocument = chatDocumentFromDate(now)
  createIfNotExists(chatDocument).then(respopnse => {
    messageTable = createMessageTable(now, true)
    div.appendChild(messageTable)
    // var earliestMessageTable = messageTable
    earliestDate = now

    div.refresh = function () { // only the last messageTable is live
      syncMessages(subject, messageTable)
    }// The short chat version fors live update in the pane but we do it in the widget
    kb.updater.addDownstreamChangeListener(chatDocument, div.refresh) // Live update
  }, err => {
    div.appendChild(UI.widgets.errorMessageBlock(
      dom, 'Problem accessing chat log file: ' + err))
  })

  return div
}
