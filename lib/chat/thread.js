"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.thread = thread;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _iconBase = require("../iconBase");
var _solidLogic = require("solid-logic");
var _index = require("../media/index");
var ns = _interopRequireWildcard(require("../ns"));
var login = _interopRequireWildcard(require("../login/login"));
var pad = _interopRequireWildcard(require("../pad"));
var $rdf = _interopRequireWildcard(require("rdflib"));
var style = _interopRequireWildcard(require("../style"));
var utils = _interopRequireWildcard(require("../utils"));
var widgets = _interopRequireWildcard(require("../widgets"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t8 in e) "default" !== _t8 && {}.hasOwnProperty.call(e, _t8) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t8)) && (i.get || i.set) ? o(f, _t8, i) : f[_t8] = e[_t8]); return f; })(e, t); }
/**
 * Contains the [[thread]] function
 * @packageDocumentation
 */

// pull in first avoid cross-refs

var UI = {
  icons: _iconBase.icons,
  ns: ns,
  media: _index.media,
  pad: pad,
  style: style,
  utils: utils,
  widgets: widgets
};

/**
 * HTML component for a chat thread
 */
function thread(dom, kb, subject, messageStore, options) {
  kb = kb || _solidLogic.store;
  messageStore = messageStore.doc(); // No hash
  var ns = UI.ns;
  var WF = $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#');
  var DCT = $rdf.Namespace('http://purl.org/dc/terms/');
  options = options || {};
  var newestFirst = !!options.newestFirst;
  var messageBodyStyle = 'white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;';
  // 'font-size: 100%; margin: 0.1em 1em 0.1em 1em;  background-color: white; white-space: pre-wrap; padding: 0.1em;'

  var div = dom.createElement('div');
  // eslint-disable-next-line prefer-const
  var messageTable;
  var me;
  var updater = _solidLogic.store.updater;
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

    var sendMessage = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var _yield$appendMsg, message, dateStamp, sts, sendComplete;
        return _regenerator["default"].wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              // titlefield.setAttribute('class','pendingedit')
              // titlefield.disabled = true
              field.setAttribute('class', 'pendingedit');
              field.disabled = true;
              _context2.next = 1;
              return appendMsg(field.value);
            case 1:
              _yield$appendMsg = _context2.sent;
              message = _yield$appendMsg.message;
              dateStamp = _yield$appendMsg.dateStamp;
              sts = _yield$appendMsg.sts;
              sendComplete = /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(uri, success, body) {
                  var bindings;
                  return _regenerator["default"].wrap(function (_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        if (!success) {
                          form.appendChild(UI.widgets.errorMessageBlock(dom, 'Error writing message: ' + body));
                        } else {
                          bindings = {
                            '?msg': message,
                            '?content': _solidLogic.store.literal(field.value),
                            '?date': dateStamp,
                            '?creator': me
                          };
                          renderMessage(bindings, false); // not green

                          field.value = ''; // clear from out for reuse
                          field.setAttribute('class', '');
                          field.disabled = false;
                        }
                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));
                return function sendComplete(_x, _x2, _x3) {
                  return _ref2.apply(this, arguments);
                };
              }();
              _context2.next = 2;
              return updater.updateMany([], sts, sendComplete);
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      return function sendMessage() {
        return _ref.apply(this, arguments);
      };
    }();
    form.appendChild(dom.createElement('br'));
    var field, sendButton;
    var turnOnInput = function turnOnInput() {
      creatorAndDate(lhs, me, '', null);
      field = dom.createElement('textarea');
      middle.innerHTML = '';
      middle.appendChild(field);
      field.rows = 3;
      // field.cols = 40
      field.setAttribute('style', messageBodyStyle + 'background-color: #eef;');
      field.addEventListener('keyup', /*#__PURE__*/function () {
        var _ref3 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(e) {
          return _regenerator["default"].wrap(function (_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                if (!(e.keyCode === 13)) {
                  _context3.next = 1;
                  break;
                }
                if (e.altKey) {
                  _context3.next = 1;
                  break;
                }
                _context3.next = 1;
                return sendMessage();
              case 1:
              case "end":
                return _context3.stop();
            }
          }, _callee3);
        }));
        return function (_x4) {
          return _ref3.apply(this, arguments);
        };
      }(), false);
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
    login.ensureLoggedIn(context).then(function (context) {
      me = context.me;
      turnOnInput();
    });
    return form;
  };
  var appendMsg = /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2["default"])(function (fieldValue) {
      var oldMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      return /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var sts, now, timestamp, dateStamp, message, msgBody, _t, _t2, _t3, _t4, _t5, _t6, _t7;
        return _regenerator["default"].wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              // alain
              sts = [];
              now = new Date();
              timestamp = '' + now.getTime();
              dateStamp = $rdf.term(now); // http://www.w3schools.com/jsref/jsref_obj_date.asp
              message = _solidLogic.store.sym(messageStore.uri + '#' + 'Msg' + timestamp);
              if (!(options === 'edit' || options === 'delete')) {
                _context4.next = 2;
                break;
              }
              _t = sts;
              _t2 = $rdf.Statement;
              _context4.next = 1;
              return mostRecentVersion(oldMsg);
            case 1:
              _t3 = _context4.sent;
              _t4 = DCT('isReplacedBy');
              _t5 = message;
              _t6 = messageStore;
              _t7 = new _t2(_t3, _t4, _t5, _t6);
              _t.push.call(_t, _t7);
              _context4.next = 3;
              break;
            case 2:
              sts.push(new $rdf.Statement(subject, ns.wf('message'), message, messageStore));
            case 3:
              // sts.push(new $rdf.Statement(message, ns.dc('title'), store.literal(titlefield.value), messageStore))
              msgBody = options !== 'delete' ? fieldValue : "message deleted\nby ".concat(nick(me));
              sts.push(new $rdf.Statement(message, ns.sioc('content'), _solidLogic.store.literal(msgBody), messageStore));
              sts.push(new $rdf.Statement(message, DCT('created'), dateStamp, messageStore));
              if (me) {
                sts.push(new $rdf.Statement(message, ns.foaf('maker'), me, messageStore));
              }
              return _context4.abrupt("return", {
                message: message,
                dateStamp: dateStamp,
                sts: sts
              });
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      })();
    });
    return function appendMsg(_x5) {
      return _ref4.apply(this, arguments);
    };
  }();
  function nick(person) {
    var s = _solidLogic.store.any(person, UI.ns.foaf('nick'));
    if (s) return '' + s.value;
    return '' + utils.label(person);
  }
  function creatorAndDate(td1, creator, date, message) {
    var nickAnchor = td1.appendChild(anchor(nick(creator), creator));
    if (creator.uri) {
      _solidLogic.store.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (_ok, _body) {
        nickAnchor.textContent = nick(creator);
      });
    }
    td1.appendChild(dom.createElement('br'));
    td1.appendChild(anchor(date, message));
  }

  // ///////////////////////////////////////////////////////////////////////

  function syncMessages(about, messageTable) {
    var displayed = {};
    var ele, ele2;
    for (ele = messageTable.firstChild; ele; ele = ele.nextSibling) {
      if (ele.AJAR_subject) {
        displayed[ele.AJAR_subject.uri] = true;
      }
    }
    var messages = _solidLogic.store.each(about, ns.wf('message'));
    var stored = {};
    messages.forEach(function (m) {
      stored[m.uri] = true;
      if (!displayed[m.uri]) {
        addMessage(m);
      }
    });

    // eslint-disable-next-line space-in-parens
    for (ele = messageTable.firstChild; ele;) {
      ele2 = ele.nextSibling;
      if (ele.AJAR_subject && !stored[ele.AJAR_subject.uri]) {
        messageTable.removeChild(ele);
      }
      ele = ele2;
    }
  }
  var mostRecentVersion = function mostRecentVersion(message) {
    var msg = message;
    // const listMsg = []
    while (msg) {
      message = msg;
      // listMsg.push(msg)
      msg = _solidLogic.store.statementsMatching(message, DCT('isReplacedBy'));
    }
    return message;
  };
  var _deleteMessage = /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(message) {
      var deletions;
      return _regenerator["default"].wrap(function (_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 1;
            return _solidLogic.store.connectedStatements(message, messageStore);
          case 1:
            deletions = _context5.sent;
            _context5.next = 2;
            return updater.updateMany(deletions, [], function (uri, ok, body) {
              if (!ok) {
                announce.error('Cant delete messages:' + body);
              } else {
                syncMessages(subject, messageTable);
              }
            });
          case 2:
          case "end":
            return _context5.stop();
        }
      }, _callee5);
    }));
    return function _deleteMessage(_x6) {
      return _ref5.apply(this, arguments);
    };
  }();
  var addMessage = /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(message) {
      var bindings;
      return _regenerator["default"].wrap(function (_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            bindings = {
              '?msg': message,
              '?creator': _solidLogic.store.any(message, ns.foaf('maker')),
              '?date': _solidLogic.store.any(message, DCT('created')),
              '?content': _solidLogic.store.any(message, ns.sioc('content'))
            };
            _context6.next = 1;
            return renderMessage(bindings, true);
          case 1:
          case "end":
            return _context6.stop();
        }
      }, _callee6);
    }));
    return function addMessage(_x7) {
      return _ref6.apply(this, arguments);
    };
  }();
  var renderMessage = /*#__PURE__*/function () {
    var _ref7 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(bindings, fresh) {
      var creator, message, date, content, dateString, tr, done, ele, td1, td2, pre, td3, delButton;
      return _regenerator["default"].wrap(function (_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            creator = bindings['?creator'];
            message = bindings['?msg'];
            date = bindings['?date'];
            content = bindings['?content'];
            dateString = date.value;
            tr = dom.createElement('tr');
            tr.AJAR_date = dateString;
            tr.AJAR_subject = message;
            done = false;
            ele = messageTable.firstChild;
          case 1:
            if (ele) {
              _context9.next = 2;
              break;
            }
            return _context9.abrupt("continue", 4);
          case 2:
            if (!(dateString > ele.AJAR_date && newestFirst || dateString < ele.AJAR_date && !newestFirst)) {
              _context9.next = 3;
              break;
            }
            messageTable.insertBefore(tr, ele);
            done = true;
            return _context9.abrupt("continue", 4);
          case 3:
            ele = ele.nextSibling;
            _context9.next = 1;
            break;
          case 4:
            if (!done) {
              messageTable.appendChild(tr);
            }
            td1 = dom.createElement('td');
            tr.appendChild(td1);
            creatorAndDate(td1, creator, UI.widgets.shortDate(dateString), message);
            td2 = dom.createElement('td');
            tr.appendChild(td2);
            pre = dom.createElement('p');
            pre.setAttribute('style', messageBodyStyle + (fresh ? 'background-color: #e8ffe8;' : 'background-color: #white;'));
            td2.appendChild(pre);
            pre.textContent = content.value;
            td3 = dom.createElement('td');
            tr.appendChild(td3);
            delButton = dom.createElement('button');
            td3.appendChild(delButton);
            delButton.textContent = '-';
            tr.setAttribute('class', 'hoverControl'); // See tabbedtab.css (sigh global CSS)
            delButton.setAttribute('class', 'hoverControlHide');
            delButton.setAttribute('style', 'color: red;');
            delButton.addEventListener('click', /*#__PURE__*/function () {
              var _ref8 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(_event) {
                var cancelButton, sureButton;
                return _regenerator["default"].wrap(function (_context8) {
                  while (1) switch (_context8.prev = _context8.next) {
                    case 0:
                      td3.removeChild(delButton); // Ask -- are you sure?
                      cancelButton = dom.createElement('button');
                      cancelButton.textContent = 'cancel';
                      td3.appendChild(cancelButton).addEventListener('click', function (_event) {
                        td3.removeChild(sureButton);
                        td3.removeChild(cancelButton);
                        td3.appendChild(delButton);
                      }, false);
                      sureButton = dom.createElement('button');
                      sureButton.textContent = 'Delete message';
                      td3.appendChild(sureButton).addEventListener('click', /*#__PURE__*/function () {
                        var _ref9 = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(_event) {
                          var _yield$appendMsg2, sts;
                          return _regenerator["default"].wrap(function (_context7) {
                            while (1) switch (_context7.prev = _context7.next) {
                              case 0:
                                // alain: test for delete or edit depending on me = maker
                                td3.removeChild(sureButton);
                                td3.removeChild(cancelButton);
                                // deleteMessage(message) // alain or sendMessage(message, 'delete' or 'edit') //alain
                                if (!(me.value === _solidLogic.store.any(message, ns.foaf('maker')).value)) {
                                  _context7.next = 2;
                                  break;
                                }
                                _context7.next = 1;
                                return appendMsg();
                              case 1:
                                _yield$appendMsg2 = _context7.sent;
                                sts = _yield$appendMsg2.sts;
                                _context7.next = 2;
                                return updater.updateMany([], sts);
                              case 2:
                              case "end":
                                return _context7.stop();
                            }
                          }, _callee7);
                        }));
                        return function (_x1) {
                          return _ref9.apply(this, arguments);
                        };
                      }(), false);
                    case 1:
                    case "end":
                      return _context8.stop();
                  }
                }, _callee8);
              }));
              return function (_x0) {
                return _ref8.apply(this, arguments);
              };
            }(), false);
          case 5:
          case "end":
            return _context9.stop();
        }
      }, _callee9);
    }));
    return function renderMessage(_x8, _x9) {
      return _ref7.apply(this, arguments);
    };
  }();

  // Messages with date, author etc

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
  var query;
  // Do this with a live query to pull in messages from web
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
  _solidLogic.store.query(query, renderMessage, undefined, doneQuery);
  div.refresh = function () {
    syncMessages(subject, messageTable);
  };
  // syncMessages(subject, messageTable) // no the query will do this async
  return div;
}
//# sourceMappingURL=thread.js.map