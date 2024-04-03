"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionClassFromEmoji = ActionClassFromEmoji;
exports.emojiFromAction = emojiFromAction;
exports.emojiFromActionClass = emojiFromActionClass;
exports.messageToolbar = messageToolbar;
exports.sentimentStrip = sentimentStrip;
exports.sentimentStripLinked = sentimentStripLinked;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var debug = _interopRequireWildcard(require("../debug"));
var _iconBase = require("../iconBase");
var ns = _interopRequireWildcard(require("../ns"));
var rdf = _interopRequireWildcard(require("rdflib"));
var utils = _interopRequireWildcard(require("../utils"));
var widgets = _interopRequireWildcard(require("../widgets"));
var _bookmarks = require("./bookmarks");
var _solidLogic = require("solid-logic");
var _chatLogic = require("./chatLogic");
var _message = require("./message");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * Tools for doing things with a message
 * Let us be creative here.  Allow all sorts of things to
 * be done to a message - linking to new or old objects in an open way
 *
 * Ideas: Bookmark, Like, star, pin at top of chat, reply as new thread,
 * If you made it originally: edit, delete, attach
 * @packageDocumentation
 */

// import { media } from '../media/index'

// import * as pad from '../pad'
// pull in first avoid cross-refs
// import * as style from '../style'

var dom = window.document;

// THE UNUSED ICONS are here as reminders for possible future functionality
// const BOOKMARK_ICON = 'noun_45961.svg'
// const HEART_ICON = 'noun_130259.svg' -> Add this to my (private) favorites
// const MENU_ICON = 'noun_897914.svg'
// const PAPERCLIP_ICON = 'noun_25830.svg' -> add attachments to this message
// const PIN_ICON = 'noun_562340.svg'  -> pin this message permanently in the chat UI
var PENCIL_ICON = 'noun_253504.svg'; // edit a message
// const SPANNER_ICON = 'noun_344563.svg' -> settings
var THUMBS_UP_ICON = 'noun_1384132.svg';
var THUMBS_DOWN_ICON = 'noun_1384135.svg';
var REPLY_ICON = 'noun-reply-5506924.svg';
/**
 * Emoji in Unicode
 */
var emojiMap = {};
emojiMap[ns.schema('AgreeAction')] = '👍';
emojiMap[ns.schema('DisagreeAction')] = '👎';
emojiMap[ns.schema('EndorseAction')] = '⭐️';
emojiMap[ns.schema('LikeAction')] = '❤️';
function emojiFromActionClass(action) {
  return emojiMap[action] || null;
}
function ActionClassFromEmoji(emoji) {
  for (var a in emojiMap) {
    if (emojiMap[a] === emoji) {
      return rdf.sym(a.slice(1, -1)); // remove < >
    }
  }
  return null;
}

// Allow the action to give its own emoji as content,
// or get the emoji from the class of action.
function emojiFromAction(action) {
  var content = _solidLogic.store.any(action, ns.sioc('content'), null, action.doc());
  if (content) return content;
  var klass = _solidLogic.store.any(action, ns.rdf('type'), null, action.doc());
  if (klass) {
    var em = emojiFromActionClass(klass);
    if (em) return em;
  }
  return '⬜️';
}

/**
 * Create strip of sentiments expressed
 */
function sentimentStrip(_x, _x2) {
  return _sentimentStrip.apply(this, arguments);
}
/**
 * Create strip of sentiments expressed, with hyperlinks
 *
 * @param target {NamedNode} - The thing about which they are expressed
 * @param doc {NamedNode} - The document in which they are expressed
 */
function _sentimentStrip() {
  _sentimentStrip = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(target, doc) {
    var versions, actions, strings;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _chatLogic.allVersions)(target);
        case 2:
          versions = _context.sent;
          // debug.log('sentimentStrip Versions for ' + target, versions)
          actions = versions.map(function (version) {
            return _solidLogic.store.each(null, ns.schema('target'), version, doc);
          }).flat(); // debug.log('sentimentStrip: Actions for ' + target, actions)
          strings = actions.map(function (action) {
            return emojiFromAction(action) || '';
          });
          return _context.abrupt("return", dom.createTextNode(strings.join(' ')));
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _sentimentStrip.apply(this, arguments);
}
function sentimentStripLinked(_x3, _x4) {
  return _sentimentStripLinked.apply(this, arguments);
}
/**
 * Creates a message toolbar component
 */
function _sentimentStripLinked() {
  _sentimentStripLinked = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(target, doc) {
    var strip, refresh, _refresh;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _refresh = function _refresh3() {
            _refresh = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
              var versions, actions, sentiments;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    strip.innerHTML = '';
                    if (!(0, _chatLogic.isDeleted)(target)) {
                      _context2.next = 3;
                      break;
                    }
                    return _context2.abrupt("return", strip);
                  case 3:
                    _context2.next = 5;
                    return (0, _chatLogic.allVersions)(target);
                  case 5:
                    versions = _context2.sent;
                    // debug.log('sentimentStripLinked: Versions for ' + target, versions)
                    actions = versions.map(function (version) {
                      return _solidLogic.store.each(null, ns.schema('target'), version, doc);
                    }).flat(); // debug.log('sentimentStripLinked: Actions for ' + target, actions)
                    if (!(actions.length === 0)) {
                      _context2.next = 9;
                      break;
                    }
                    return _context2.abrupt("return", strip);
                  case 9:
                    sentiments = actions.map(function (a) {
                      return [_solidLogic.store.any(a, ns.rdf('type'), null, doc), _solidLogic.store.any(a, ns.sioc('content'), null, doc), _solidLogic.store.any(a, ns.schema('agent'), null, doc)];
                    }); // debug.log('  Actions sentiments ', sentiments)
                    sentiments.sort();
                    sentiments.forEach(function (ss) {
                      var _ss = (0, _slicedToArray2["default"])(ss, 3),
                        theClass = _ss[0],
                        content = _ss[1],
                        agent = _ss[2];
                      var res;
                      if (agent) {
                        res = dom.createElement('a');
                        res.setAttribute('href', agent.uri);
                      } else {
                        res = dom.createTextNode('');
                      }
                      res.textContent = content || emojiMap[theClass] || '⬜️';
                      strip.appendChild(res);
                    });
                    // debug.log('  Actions strip ', strip)
                  case 12:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return _refresh.apply(this, arguments);
          };
          refresh = function _refresh2() {
            return _refresh.apply(this, arguments);
          };
          strip = dom.createElement('span');
          refresh().then(debug.log('sentimentStripLinked: sentimentStripLinked async refreshed'));
          strip.refresh = refresh;
          return _context3.abrupt("return", strip);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _sentimentStripLinked.apply(this, arguments);
}
function messageToolbar(_x5, _x6, _x7, _x8) {
  return _messageToolbar.apply(this, arguments);
}
function _messageToolbar() {
  _messageToolbar = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(message, messageRow, userContext, channelObject) {
    var deleteMessage, _deleteMessage, editMessage, _editMessage, replyInThread, _replyInThread, div, closeToolbar, deleteThingThen, _deleteThingThen, me, sentimentButton, context1, cancelButton;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          sentimentButton = function _sentimentButton(context, target, icon, actionClass, doc, mutuallyExclusive) {
            function setColor() {
              button.style.backgroundColor = action ? 'yellow' : 'white';
            }
            var button = widgets.button(dom, icon, utils.label(actionClass), /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_event) {
                var insertMe, dirty, i, a;
                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      if (!action) {
                        _context4.next = 7;
                        break;
                      }
                      _context4.next = 3;
                      return deleteThingThen(action);
                    case 3:
                      action = null;
                      setColor();
                      _context4.next = 25;
                      break;
                    case 7:
                      // no action
                      action = widgets.newThing(doc);
                      insertMe = [rdf.st(action, ns.schema('agent'), context.me, doc), rdf.st(action, ns.rdf('type'), actionClass, doc), rdf.st(action, ns.schema('target'), target, doc)];
                      _context4.next = 11;
                      return _solidLogic.store.updater.update([], insertMe);
                    case 11:
                      setColor();
                      if (!mutuallyExclusive) {
                        _context4.next = 25;
                        break;
                      }
                      // Delete incompative sentiments
                      dirty = false;
                      i = 0;
                    case 15:
                      if (!(i < mutuallyExclusive.length)) {
                        _context4.next = 24;
                        break;
                      }
                      a = existingAction(mutuallyExclusive[i]);
                      if (!a) {
                        _context4.next = 21;
                        break;
                      }
                      _context4.next = 20;
                      return deleteThingThen(a);
                    case 20:
                      // but how refresh? refreshTree the parent?
                      dirty = true;
                    case 21:
                      i++;
                      _context4.next = 15;
                      break;
                    case 24:
                      if (dirty) {
                        // widgets.refreshTree(button.parentNode) // requires them all to be immediate siblings
                        widgets.refreshTree(messageRow); // requires them all to be immediate siblings
                      }
                    case 25:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4);
              }));
              return function (_x11) {
                return _ref.apply(this, arguments);
              };
            }());
            function existingAction(actionClass) {
              var actions = _solidLogic.store.each(null, ns.schema('agent'), context.me, doc).filter(function (x) {
                return _solidLogic.store.holds(x, ns.rdf('type'), actionClass, doc);
              }).filter(function (x) {
                return _solidLogic.store.holds(x, ns.schema('target'), target, doc);
              });
              return actions.length ? actions[0] : null;
            }
            function refresh() {
              action = existingAction(actionClass);
              setColor();
            }
            var action;
            button.refresh = refresh; // If the file changes, refresh live
            refresh();
            return button;
          };
          _deleteThingThen = function _deleteThingThen3() {
            _deleteThingThen = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(x) {
              return _regenerator["default"].wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    _context9.next = 2;
                    return _solidLogic.store.updater.update(_solidLogic.store.connectedStatements(x), []);
                  case 2:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9);
            }));
            return _deleteThingThen.apply(this, arguments);
          };
          deleteThingThen = function _deleteThingThen2(_x10) {
            return _deleteThingThen.apply(this, arguments);
          };
          closeToolbar = function _closeToolbar() {
            div.parentElement.parentElement.removeChild(div.parentElement); // remive the TR
          };
          _replyInThread = function _replyInThread3() {
            _replyInThread = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
              var thread, options;
              return _regenerator["default"].wrap(function _callee8$(_context8) {
                while (1) switch (_context8.prev = _context8.next) {
                  case 0:
                    _context8.next = 2;
                    return channelObject.createThread(message);
                  case 2:
                    thread = _context8.sent;
                    options = userContext.chatOptions;
                    if (options) {
                      _context8.next = 6;
                      break;
                    }
                    throw new Error('replyInThread: missing options');
                  case 6:
                    options.showThread(thread, options);
                    closeToolbar(); // a one-off action
                  case 8:
                  case "end":
                    return _context8.stop();
                }
              }, _callee8);
            }));
            return _replyInThread.apply(this, arguments);
          };
          replyInThread = function _replyInThread2() {
            return _replyInThread.apply(this, arguments);
          };
          _editMessage = function _editMessage3() {
            _editMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(messageRow) {
              return _regenerator["default"].wrap(function _callee7$(_context7) {
                while (1) switch (_context7.prev = _context7.next) {
                  case 0:
                    if (!(me.value === _solidLogic.store.any(message, ns.foaf('maker')).value)) {
                      _context7.next = 4;
                      break;
                    }
                    closeToolbar(); // edit is a one-off action
                    _context7.next = 4;
                    return (0, _message.switchToEditor)(messageRow, message, channelObject, userContext);
                  case 4:
                  case "end":
                    return _context7.stop();
                }
              }, _callee7);
            }));
            return _editMessage.apply(this, arguments);
          };
          editMessage = function _editMessage2(_x9) {
            return _editMessage.apply(this, arguments);
          };
          _deleteMessage = function _deleteMessage3() {
            _deleteMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
              var author, msg, area;
              return _regenerator["default"].wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    author = _solidLogic.store.any(message, ns.foaf('maker'));
                    if (me) {
                      _context6.next = 5;
                      break;
                    }
                    alert('You can\'t delete the message, you are not logged in.');
                    _context6.next = 22;
                    break;
                  case 5:
                    if (!me.sameTerm(author)) {
                      _context6.next = 21;
                      break;
                    }
                    _context6.prev = 6;
                    _context6.next = 9;
                    return channelObject.deleteMessage(message);
                  case 9:
                    _context6.next = 18;
                    break;
                  case 11:
                    _context6.prev = 11;
                    _context6.t0 = _context6["catch"](6);
                    msg = 'Error deleting messaage ' + _context6.t0;
                    debug.warn(msg);
                    alert(msg);
                    area = userContext.statusArea || messageRow.parentNode;
                    area.appendChild(widgets.errorMessageBlock(dom, msg));
                  case 18:
                    messageRow.parentNode.removeChild(messageRow);
                    _context6.next = 22;
                    break;
                  case 21:
                    alert('You can\'t delete the message, you are not logged in as the author, ' + author);
                  case 22:
                    closeToolbar();
                  case 23:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6, null, [[6, 11]]);
            }));
            return _deleteMessage.apply(this, arguments);
          };
          deleteMessage = function _deleteMessage2() {
            return _deleteMessage.apply(this, arguments);
          }; // alain: TODO allow chat owner to fully delete message + sentiments and replacing messages
          div = dom.createElement('div'); // is message deleted ?
          _context10.next = 13;
          return (0, _chatLogic.mostRecentVersion)(message).value;
        case 13:
          _context10.t0 = _context10.sent;
          _context10.t1 = ns.schema('dateDeleted').value;
          if (!(_context10.t0 === _context10.t1)) {
            _context10.next = 17;
            break;
          }
          return _context10.abrupt("return", div);
        case 17:
          // Things only the original author can do
          me = _solidLogic.authn.currentUser(); // If already logged on
          if (me && _solidLogic.store.holds(message, ns.foaf('maker'), me)) {
            // button to delete the message
            div.appendChild(widgets.deleteButtonWithCheck(dom, div, 'message', deleteMessage));
            // button to edit the message
            div.appendChild(widgets.button(dom, _iconBase.icons.iconBase + PENCIL_ICON, 'edit', function () {
              return editMessage(messageRow);
            }));
          } // if mine
          // Things anyone can do if they have a bookmark list async
          /*
          var bookmarkButton = await bookmarks.renderBookmarksButton(userContext)
          if (bookmarkButton) {
           div.appendChild(bookmarkButton)
          }
          */
          // Things anyone can do if they have a bookmark list

          (0, _bookmarks.renderBookmarksButton)(userContext).then(function (bookmarkButton) {
            if (bookmarkButton) div.appendChild(bookmarkButton);
          });

          /**   Button to allow user to express a sentiment (like, endorse, etc) about a target
           *
           * @param context {Object} - Provide dom and me
           * @param target {NamedNode} - The thing the user expresses an opnion about
           * @param icon {uristring} - The icon to be used for the button
           * @param actionClass {NamedNode} - The RDF class  - typically a subclass of schema:Action
           * @param doc - {NamedNode} - the Solid document iunto which the data should be written
           * @param mutuallyExclusive {Array<NamedNode>} - Any RDF classes of sentimentswhich are mutiually exclusive
           */

          // THUMBS_UP_ICON
          // https://schema.org/AgreeAction
          me = _solidLogic.authn.currentUser(); // If already logged on
          _context10.t2 = me;
          if (!_context10.t2) {
            _context10.next = 28;
            break;
          }
          _context10.next = 25;
          return (0, _chatLogic.mostRecentVersion)(message).value;
        case 25:
          _context10.t3 = _context10.sent;
          _context10.t4 = ns.schema('dateDeleted').value;
          _context10.t2 = _context10.t3 !== _context10.t4;
        case 28:
          if (!_context10.t2) {
            _context10.next = 32;
            break;
          }
          context1 = {
            me: me,
            dom: dom,
            div: div
          };
          div.appendChild(sentimentButton(context1, message,
          // @@ TODO use widgets.sentimentButton
          _iconBase.icons.iconBase + THUMBS_UP_ICON, ns.schema('AgreeAction'), message.doc(), [ns.schema('DisagreeAction')]));
          // Thumbs down
          div.appendChild(sentimentButton(context1, message, _iconBase.icons.iconBase + THUMBS_DOWN_ICON, ns.schema('DisagreeAction'), message.doc(), [ns.schema('AgreeAction')]));
        case 32:
          // Reply buttton

          if (_solidLogic.store.any(message, ns.dct('created'))) {
            // Looks like a messsage? Bar can be used for other things
            div.appendChild(widgets.button(dom, _iconBase.icons.iconBase + REPLY_ICON, 'Reply in thread', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
              return _regenerator["default"].wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return replyInThread();
                  case 2:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5);
            }))));
          }
          // X button to remove the tool UI itself
          cancelButton = div.appendChild(widgets.cancelButton(dom));
          cancelButton.style["float"] = 'right';
          cancelButton.firstChild.style.opacity = '0.3';
          cancelButton.addEventListener('click', closeToolbar);
          return _context10.abrupt("return", div);
        case 38:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return _messageToolbar.apply(this, arguments);
}
//# sourceMappingURL=messageTools.js.map