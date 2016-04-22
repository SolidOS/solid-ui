//  Common code for a discussion are a of messages about something
//
var messageArea = function (dom, kb, subject, messageStore, options) {
  kb = kb || tabulator.kb
  var ns = tabulator.ns
  var WF = $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#')
  var DCT = $rdf.Namespace('http://purl.org/dc/terms/')

  options = options || {}

  var newestFirst = !!options.newestFirst

  var messageBodyStyle = 'width: 90%; font-size:100%; background-color: white; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em'
  // 'font-size: 100%; margin: 0.1em 1em 0.1em 1em;  background-color: white; white-space: pre-wrap; padding: 0.1em;'

  var div = dom.createElement('div')
  var messageTable // Shared by initial build and addMessageFromBindings

  var me_uri = tabulator.preferences.get('me')
  var me = me_uri ? kb.sym(me_uri) : null

  var updater = tabulator.updater || tabulator.updater || new tabulator.rdf.UpdateManager(kb)

  var anchor = function (text, term) { // If there is no link return an element anyway
    var a = dom.createElement('a')
    if (term.uri) {
      a.setAttribute('href', term.uri)
      a.addEventListener('click', tabulator.panes.utils.openHrefInOutlineMode, true)
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
      // http://www.w3schools.com/jsref/jsref_obj_date.asp
      var message = kb.sym(messageStore.uri + '#' + 'Msg' + timestamp)

      sts.push(new $rdf.Statement(subject, ns.wf('message'), message, messageStore))
      // sts.push(new $rdf.Statement(message, ns.dc('title'), kb.literal(titlefield.value), messageStore))
      sts.push(new $rdf.Statement(message, ns.sioc('content'), kb.literal(field.value), messageStore))
      sts.push(new $rdf.Statement(message, DCT('created'), dateStamp, messageStore))
      if (me) sts.push(new $rdf.Statement(message, ns.foaf('maker'), me, messageStore))

      var sendComplete = function (uri, success, body) {
        if (!success) {
          form.appendChild(tabulator.panes.utils.errorMessageBlock(
            dom, 'Error writing message: ' + body))
        } else {
          var bindings = { '?msg': message,
            '?content': kb.literal(field.value),
            '?date': dateStamp,
          '?creator': me}
          renderMessage(bindings)

          field.value = '' // clear from out for reuse
          field.setAttribute('class', '')
          field.disabled = false
        }
      }
      updater.update([], sts, sendComplete)
    }
    // form.addEventListener('submit', sendMessage, false)
    // form.setAttribute('onsubmit', "function xx(){return false;}")
    form.appendChild(dom.createElement('br'))

    var field = dom.createElement('textarea')
    middle.appendChild(field)
    field.rows = 3
    // field.cols = 40
    field.setAttribute('style', messageBodyStyle)

    var submit = dom.createElement('button')
    // submit.disabled = true // until the filled has been modified
    submit.textContent = 'send' // @@ I18n
    submit.setAttribute('style', 'float: right;')
    submit.addEventListener('click', sendMessage, false)
    rhs.appendChild(submit)

    return form
  }

  var nick = function (person) {
    var s = tabulator.kb.any(person, tabulator.ns.foaf('nick'))
    if (s) return '' + s.value
    return '' + tabulator.Util.label(person)
  }

  // ///////////////////////////////////////////////////////////////////////

  var syncMessages = function (about, messageTable) {
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
        addMessage(m)
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

  var addMessage = function (message) {
    var bindings = {
      '?msg': message,
      '?creator': kb.any(message, ns.foaf('maker')),
      '?date': kb.any(message, DCT('created')),
      '?content': kb.any(message, ns.sioc('content'))
    }
    renderMessage(bindings)
  }

  var renderMessage = function (bindings) {
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

    var nickAnchor = td1.appendChild(anchor(nick(creator), creator))
    if (creator.uri) {
      tabulator.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (ok, body) {
        nickAnchor.textContent = nick(creator)
      })
    }
    td1.appendChild(dom.createElement('br'))
    td1.appendChild(anchor(tabulator.panes.utils.shortDate(dateString), message))

    var td2 = dom.createElement('td')
    tr.appendChild(td2)
    var pre = dom.createElement('p')
    pre.setAttribute('style', messageBodyStyle)
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

  // Messages with date, author etc

  messageTable = dom.createElement('table')
  div.appendChild(messageTable)
  messageTable.setAttribute('style', 'width: 100%;') // fill that div!

  if (tabulator.preferences.get('me')) {
    var tr = newMessageForm()
    if (newestFirst) {
      messageTable.insertBefore(tr, messageTable.firstChild) // If newestFirst
    } else {
      messageTable.appendChild(tr) // not newestFirst
    }
  }

  var query
  // Do this with a live query to pull in messages from web
  if (options.query) {
    query = options.query
  } else {
    query = new $rdf.Query('Messages')
    var v = {}; // semicolon needed
    ['msg', 'date', 'creator', 'content'].map(function (x) {
      query.vars.push(v[x] = $rdf.variable(x))
    })
    query.pat.add(subject, WF('message'), v['msg'])
    query.pat.add(v['msg'], ns.dct('created'), v['date'])
    query.pat.add(v['msg'], ns.foaf('maker'), v['creator'])
    query.pat.add(v['msg'], ns.sioc('content'), v['content'])
  }

  kb.query(query, renderMessage)
  div.refresh = function () {
    syncMessages(subject, messageTable)
  }
  return div
}

if (typeof tabulator !== 'undefined' && tabulator.panes && tabulator.panes.utils) {
  tabulator.panes.utils.messageArea = messageArea
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = messageArea
}
