"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thread = thread;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = require("../authn/index");

var _iconBase = require("../iconBase");

var _logic = require("../logic");

var _index2 = require("../media/index");

var ns = _interopRequireWildcard(require("../ns"));

var pad = _interopRequireWildcard(require("../pad"));

var $rdf = _interopRequireWildcard(require("rdflib"));

var style = _interopRequireWildcard(require("../style"));

var utils = _interopRequireWildcard(require("../utils"));

var widgets = _interopRequireWildcard(require("../widgets"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Contains the [[thread]] function
 * @packageDocumentation
 */
// pull in first avoid cross-refs
var UI = {
  authn: _index.authn,
  icons: _iconBase.icons,
  ns: ns,
  media: _index2.media,
  pad: pad,
  store: _logic.store,
  style: style,
  utils: utils,
  widgets: widgets
};
/**
 * HTML component for a chat thread
 */

function thread(dom, store, subject, messageStore, options) {
  store = store || UI.store;
  messageStore = messageStore.doc(); // No hash

  var ns = UI.ns;
  var WF = $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#');
  var DCT = $rdf.Namespace('http://purl.org/dc/terms/');
  options = options || {};
  var newestFirst = !!options.newestFirst;
  var messageBodyStyle = 'white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;'; // 'font-size: 100%; margin: 0.1em 1em 0.1em 1em;  background-color: white; white-space: pre-wrap; padding: 0.1em;'

  var div = dom.createElement('div'); // eslint-disable-next-line prefer-const

  var messageTable; // Shared by initial build and addMessageFromBindings

  var me;
  var updater = UI.store.updater;

  var anchor = function anchor(text, term) {
    // If there is no link return an element anyway
    var a = dom.createElement('a');

    if (term && term.uri) {
      a.setAttribute('href', term.uri);
      a.addEventListener('click', UI.widgets.openHrefInOutlineMode, true);
      a.setAttribute('style', 'color: #3B5998; text-decoration: none; '); // font-weight: bold
    }

    a.textContent = text;
    return a;
  };

  var mention = function mention(message, style) {
    var pre = dom.createElement('pre');
    pre.setAttribute('style', style || 'color: grey');
    div.appendChild(pre);
    pre.appendChild(dom.createTextNode(message));
    return pre;
  };

  var announce = {
    log: function log(message) {
      mention(message, 'color: #111;');
    },
    warn: function warn(message) {
      mention(message, 'color: #880;');
    },
    error: function error(message) {
      mention(message, 'color: #800;');
    }
  };
  /**
   * Form for a new message
   */

  var newMessageForm = function newMessageForm() {
    var form = dom.createElement('tr');
    var lhs = dom.createElement('td');
    var middle = dom.createElement('td');
    var rhs = dom.createElement('td');
    form.appendChild(lhs);
    form.appendChild(middle);
    form.appendChild(rhs);
    form.AJAR_date = '9999-01-01T00:00:00Z'; // ISO format for field sort

    var sendMessage = function sendMessage() {
      // titlefield.setAttribute('class','pendingedit')
      // titlefield.disabled = true
      field.setAttribute('class', 'pendingedit');
      field.disabled = true;

      var _appendMsg = appendMsg(field.value),
          message = _appendMsg.message,
          dateStamp = _appendMsg.dateStamp,
          sts = _appendMsg.sts;

      var sendComplete = function sendComplete(uri, success, body) {
        if (!success) {
          form.appendChild(UI.widgets.errorMessageBlock(dom, 'Error writing message: ' + body));
        } else {
          var bindings = {
            '?msg': message,
            '?content': store.literal(field.value),
            '?date': dateStamp,
            '?creator': me
          };
          renderMessage(bindings, false); // not green

          field.value = ''; // clear from out for reuse

          field.setAttribute('class', '');
          field.disabled = false;
        }
      };

      updater.update([], sts, sendComplete);
    };

    form.appendChild(dom.createElement('br'));
    var field, sendButton;

    var turnOnInput = function turnOnInput() {
      creatorAndDate(lhs, me, '', null);
      field = dom.createElement('textarea');
      middle.innerHTML = '';
      middle.appendChild(field);
      field.rows = 3; // field.cols = 40

      field.setAttribute('style', messageBodyStyle + 'background-color: #eef;');
      field.addEventListener('keyup', function (e) {
        // User preference?
        if (e.keyCode === 13) {
          if (!e.altKey) {
            // Alt-Enter just adds a new line
            sendMessage();
          }
        }
      }, false);
      rhs.innerHTML = '';
      sendButton = UI.widgets.button(dom, UI.icons.iconBase + 'noun_383448.svg', 'Send');
      sendButton.setAttribute('style', UI.style.buttonStyle + 'float: right;');
      sendButton.addEventListener('click', sendMessage, false);
      rhs.appendChild(sendButton);
    };

    var context = {
      div: middle,
      dom: dom
    };
    UI.authn.logIn(context).then(function (context) {
      me = context.me;
      turnOnInput();
    });
    return form;
  };
  /* const sendMessage = function (oldMsg, options) { // alain
    // titlefield.setAttribute('class','pendingedit')
    // titlefield.disabled = true
    field.setAttribute('class', 'pendingedit')
    field.disabled = true
    const sts = []
    const now = new Date()
    const timestamp = '' + now.getTime()
    const dateStamp = $rdf.term(now)
    // http://www.w3schools.com/jsref/jsref_obj_date.asp
    const message = store.sym(messageStore.uri + '#' + 'Msg' + timestamp)
     if (options === 'edit' || options === 'delete') {
      sts.push(
        new $rdf.Statement(mostRecentVersion(oldMsg), DCT('isReplacedBy'), message, messageStore)
      )
    } else {
      sts.push(
        new $rdf.Statement(subject, ns.wf('message'), message, messageStore)
      )
    }
    // sts.push(new $rdf.Statement(message, ns.dc('title'), store.literal(titlefield.value), messageStore))
    const msgBody = options !== 'delete' ? field.value : `message deleted\nby ${nick(me)}`
    sts.push(
      new $rdf.Statement(
        message,
        ns.sioc('content'),
        store.literal(msgBody),
        messageStore
      )
    )
    sts.push(
      new $rdf.Statement(message, DCT('created'), dateStamp, messageStore)
    )
    if (me) {
      sts.push(
        new $rdf.Statement(message, ns.foaf('maker'), me, messageStore)
      )
    }
     const sendComplete = function (uri, success, body) {
      if (!success) {
        form.appendChild(
          UI.widgets.errorMessageBlock(dom, 'Error writing message: ' + body)
        )
      } else {
        const bindings = {
          '?msg': message,
          '?content': store.literal(field.value),
          '?date': dateStamp,
          '?creator': me
        }
        renderMessage(bindings, false) // not green
         field.value = '' // clear from out for reuse
        field.setAttribute('class', '')
        field.disabled = false
      }
    }
    updater.update([], sts, sendComplete)
  } */


  var appendMsg = function appendMsg(fieldValue) {
    var oldMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    // alain
    var sts = [];
    var now = new Date();
    var timestamp = '' + now.getTime();
    var dateStamp = $rdf.term(now); // http://www.w3schools.com/jsref/jsref_obj_date.asp

    var message = store.sym(messageStore.uri + '#' + 'Msg' + timestamp);

    if (options === 'edit' || options === 'delete') {
      sts.push(new $rdf.Statement(mostRecentVersion(oldMsg), DCT('isReplacedBy'), message, messageStore));
    } else {
      sts.push(new $rdf.Statement(subject, ns.wf('message'), message, messageStore));
    } // sts.push(new $rdf.Statement(message, ns.dc('title'), store.literal(titlefield.value), messageStore))


    var msgBody = options !== 'delete' ? fieldValue : "message deleted\nby ".concat(nick(me));
    sts.push(new $rdf.Statement(message, ns.sioc('content'), store.literal(msgBody), messageStore));
    sts.push(new $rdf.Statement(message, DCT('created'), dateStamp, messageStore));

    if (me) {
      sts.push(new $rdf.Statement(message, ns.foaf('maker'), me, messageStore));
    }

    return {
      message: message,
      dateStamp: dateStamp,
      sts: sts
    };
  };

  function nick(person) {
    var s = UI.store.any(person, UI.ns.foaf('nick'));
    if (s) return '' + s.value;
    return '' + utils.label(person);
  }

  function creatorAndDate(td1, creator, date, message) {
    var nickAnchor = td1.appendChild(anchor(nick(creator), creator));

    if (creator.uri) {
      UI.store.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (_ok, _body) {
        nickAnchor.textContent = nick(creator);
      });
    }

    td1.appendChild(dom.createElement('br'));
    td1.appendChild(anchor(date, message));
  } // ///////////////////////////////////////////////////////////////////////


  function syncMessages(about, messageTable) {
    var displayed = {};
    var ele, ele2;

    for (ele = messageTable.firstChild; ele; ele = ele.nextSibling) {
      if (ele.AJAR_subject) {
        displayed[ele.AJAR_subject.uri] = true;
      }
    }

    var messages = store.each(about, ns.wf('message'));
    var stored = {};
    messages.forEach(function (m) {
      stored[m.uri] = true;

      if (!displayed[m.uri]) {
        addMessage(m);
      }
    }); // eslint-disable-next-line space-in-parens

    for (ele = messageTable.firstChild; ele;) {
      ele2 = ele.nextSibling;

      if (ele.AJAR_subject && !stored[ele.AJAR_subject.uri]) {
        messageTable.removeChild(ele);
      }

      ele = ele2;
    }
  }

  var mostRecentVersion = function mostRecentVersion(message) {
    var msg = message; // const listMsg = []

    while (msg) {
      // listMsg.push(msg)
      msg = store.statementsMatching(message, DCT('isReplacedBy'));
    }

    return msg;
  };

  var _deleteMessage = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(message) {
      var deletions;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return store.connectedStatements(message, messageStore);

            case 2:
              deletions = _context.sent;
              updater.update(deletions, [], function (uri, ok, body) {
                if (!ok) {
                  announce.error('Cant delete messages:' + body);
                } else {
                  syncMessages(subject, messageTable);
                }
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function _deleteMessage(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var addMessage = function addMessage(message) {
    var bindings = {
      '?msg': message,
      '?creator': store.any(message, ns.foaf('maker')),
      '?date': store.any(message, DCT('created')),
      '?content': store.any(message, ns.sioc('content'))
    };
    renderMessage(bindings, true); // fresh from elsewhere
  };

  var renderMessage = function renderMessage(bindings, fresh) {
    var creator = bindings['?creator'];
    var message = bindings['?msg'];
    var date = bindings['?date'];
    var content = bindings['?content'];
    var dateString = date.value;
    var tr = dom.createElement('tr');
    tr.AJAR_date = dateString;
    tr.AJAR_subject = message;
    var done = false;

    for (var ele = messageTable.firstChild;; ele = ele.nextSibling) {
      if (!ele) {
        // empty
        break;
      }

      if (dateString > ele.AJAR_date && newestFirst || dateString < ele.AJAR_date && !newestFirst) {
        messageTable.insertBefore(tr, ele);
        done = true;
        break;
      }
    }

    if (!done) {
      messageTable.appendChild(tr);
    }

    var td1 = dom.createElement('td');
    tr.appendChild(td1);
    creatorAndDate(td1, creator, UI.widgets.shortDate(dateString), message);
    var td2 = dom.createElement('td');
    tr.appendChild(td2);
    var pre = dom.createElement('p');
    pre.setAttribute('style', messageBodyStyle + (fresh ? 'background-color: #e8ffe8;' : 'background-color: #white;'));
    td2.appendChild(pre);
    pre.textContent = content.value;
    var td3 = dom.createElement('td');
    tr.appendChild(td3);
    var delButton = dom.createElement('button');
    td3.appendChild(delButton);
    delButton.textContent = '-';
    tr.setAttribute('class', 'hoverControl'); // See tabbedtab.css (sigh global CSS)

    delButton.setAttribute('class', 'hoverControlHide');
    delButton.setAttribute('style', 'color: red;');
    delButton.addEventListener('click', function (_event) {
      td3.removeChild(delButton); // Ask -- are you sure?

      var cancelButton = dom.createElement('button');
      cancelButton.textContent = 'cancel';
      td3.appendChild(cancelButton).addEventListener('click', function (_event) {
        td3.removeChild(sureButton);
        td3.removeChild(cancelButton);
        td3.appendChild(delButton);
      }, false);
      var sureButton = dom.createElement('button');
      sureButton.textContent = 'Delete message';
      td3.appendChild(sureButton).addEventListener('click', function (_event) {
        // alain test for delete or edit depending on me = maker
        td3.removeChild(sureButton);
        td3.removeChild(cancelButton); // deleteMessage(message) // alain or sendMessage(message, 'delete' or 'edit') //alain

        if (me.value === store.any(message, ns.foaf('maker')).value) {
          var _appendMsg2 = appendMsg(),
              sts = _appendMsg2.sts; // alain


          updater.update([], sts);
        }
      }, false);
    }, false);
  }; // Messages with date, author etc


  messageTable = dom.createElement('table');
  messageTable.fresh = false;
  div.appendChild(messageTable);
  messageTable.setAttribute('style', 'width: 100%;'); // fill that div!

  var tr = newMessageForm();

  if (newestFirst) {
    messageTable.insertBefore(tr, messageTable.firstChild); // If newestFirst
  } else {
    messageTable.appendChild(tr); // not newestFirst
  }

  var query; // Do this with a live query to pull in messages from web

  if (options.query) {
    query = options.query;
  } else {
    query = new $rdf.Query('Messages');
    var v = {}; // semicolon needed

    var vs = ['msg', 'date', 'creator', 'content'];
    vs.forEach(function (x) {
      query.vars.push(v[x] = $rdf.variable(x));
    });
    query.pat.add(subject, WF('message'), v.msg);
    query.pat.add(v.msg, ns.dct('created'), v.date);
    query.pat.add(v.msg, ns.foaf('maker'), v.creator);
    query.pat.add(v.msg, ns.sioc('content'), v.content);
  }

  function doneQuery() {
    messageTable.fresh = true; // any new are fresh and so will be greenish
  }

  store.query(query, renderMessage, undefined, doneQuery);

  div.refresh = function () {
    syncMessages(subject, messageTable);
  }; // syncMessages(subject, messageTable) // no the query will do this async


  return div;
}
//# sourceMappingURL=thread.js.map