"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.creatorAndDate = creatorAndDate;
exports.creatorAndDateHorizontal = creatorAndDateHorizontal;
exports.elementForImageURI = elementForImageURI;
exports.renderMessageEditor = renderMessageEditor;
exports.renderMessageRow = renderMessageRow;
exports.switchToEditor = switchToEditor;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _infinite = require("./infinite");
var _messageTools = require("./messageTools");
var _bookmarks = require("./bookmarks");
var _chatLogic = require("./chatLogic");
var debug = _interopRequireWildcard(require("../debug"));
var _iconBase = require("../iconBase");
var _solidLogic = require("solid-logic");
var _login = require("../login/login");
var _index = require("../media/index");
var ns = _interopRequireWildcard(require("../ns"));
var pad = _interopRequireWildcard(require("../pad"));
var style = _interopRequireWildcard(require("../style"));
var utils = _interopRequireWildcard(require("../utils"));
var widgets = _interopRequireWildcard(require("../widgets"));
var _signature = require("./signature");
var _keys = require("./keys");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } /**  UI code for individual messages: display them, edit them
 *
 * @packageDocumentation
 */ /* global $rdf */
var dom = window.document;
var messageBodyStyle = style.messageBodyStyle;
var label = utils.label;

/**
 * elementForImageURI
 * HTML component for an image
 * @param imageUri
 * @param options { inlineImageHeightEms }
 * @returns HTMLAnchorElement For Image
 */
function elementForImageURI(imageUri, options) {
  var img = dom.createElement('img');
  var height = '10';
  if (options.inlineImageHeightEms) {
    height = ('' + options.inlineImageHeightEms).trim();
  }
  img.setAttribute('style', 'max-height: ' + height + 'em; border-radius: 1em; margin: 0.7em;');
  // widgets.makeDropTarget(img, handleURIsDroppedOnMugshot, droppedFileHandler)
  if (imageUri) img.setAttribute('src', imageUri);
  var anchor = dom.createElement('a');
  anchor.setAttribute('href', imageUri);
  anchor.setAttribute('target', 'images');
  anchor.appendChild(img);
  widgets.makeDraggable(img, $rdf.sym(imageUri));
  return anchor;
}
var anchor = function anchor(text, term) {
  // If there is no link return an element anyway
  var a = dom.createElement('a');
  if (term && term.uri) {
    a.setAttribute('href', term.uri);
    a.addEventListener('click', widgets.openHrefInOutlineMode, true);
    a.setAttribute('style', 'color: #3B5998; text-decoration: none; '); // font-weight: bold
  }
  a.textContent = text;
  return a;
};
function nickname(person) {
  var s = _solidLogic.store.any(person, ns.foaf('nick'));
  if (s) return '' + s.value;
  return '' + label(person);
}

/**
 * creatorAndDate
 * Displays creator and date for a chat message
 * inside the `td1` element
 * @param td1
 * @param creator
 * @param date
 * @param message
 * @returns HTMLAnchorElement For Image
 */
function creatorAndDate(td1, creator, date, message) {
  var nickAnchor = td1.appendChild(anchor(nickname(creator), creator));
  if (creator.uri) {
    _solidLogic.store.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (_ok, _body) {
      nickAnchor.textContent = nickname(creator);
    });
  }
  td1.appendChild(dom.createElement('br'));
  td1.appendChild(anchor(date, message));
}

/**
 * creatorAndDateHorizontal
 * Horizontally displays creator and date for a chat message
 * inside the `td1` element
 * @param td1
 * @param creator
 * @param date
 * @param message
 * @returns HTMLAnchorElement For Image
 */
function creatorAndDateHorizontal(td1, creator, date, message) {
  var nickAnchor = td1.appendChild(anchor(label(creator), creator));
  if (creator.uri) {
    _solidLogic.store.fetcher.nowOrWhenFetched(creator.doc(), undefined, function (_ok, _body) {
      nickAnchor.textContent = nickname(creator);
    });
  }
  var dateBit = td1.appendChild(anchor(date, message));
  dateBit.style.fontSize = '80%';
  dateBit.style.marginLeft = '1em';
  td1.appendChild(dom.createElement('br'));
}

/**
 * renderMessageRow
 * Renders a chat message, read-only mode
 * @param channelObject
 * @param message
 * @param fresh
 * @param options
 * @param userContext
 * @returns Message Row HTML Table Element
 */
function renderMessageRow(_x, _x2, _x3, _x4, _x5) {
  return _renderMessageRow.apply(this, arguments);
} // END OF RENDERMESSAGE
function _renderMessageRow() {
  _renderMessageRow = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(channelObject, message, fresh, options, userContext) {
    var unsignedMessage, colorizeByAuthor, creator, date, latestVersion, latestVersionCreator, msgId, content, versions, replies, thread, straightReplies, _iterator2, _step2, reply, signature, msg, originalMessage, edited, sortDate, messageRow, td1, img, bothDates, td2, text, isURI, para, isImage, _img, anc, bgcolor, getBgColor, strip, td3, toolsButton;
    return _regenerator["default"].wrap(function _callee9$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          getBgColor = function _getBgColor(fresh) {
            return fresh ? '#e8ffe8' : 'white';
          };
          unsignedMessage = false;
          colorizeByAuthor = options.colorizeByAuthor === '1' || options.colorizeByAuthor === true; // const id = store.any(latestVersion, ns.sioc('id'))
          // const replies = store.each(latestVersion, ns.sioc('has_reply'))
          creator = _solidLogic.store.any(message, ns.foaf('maker'));
          date = _solidLogic.store.any(message, ns.dct('created'));
          _context10.next = 7;
          return (0, _chatLogic.mostRecentVersion)(message);
        case 7:
          latestVersion = _context10.sent;
          latestVersionCreator = _solidLogic.store.any(latestVersion, ns.foaf('maker')); // use latest content if same owner, else use original
          // this is may be too strict. Should we find latest valid version if any ?
          msgId = creator.uri === (latestVersionCreator === null || latestVersionCreator === void 0 ? void 0 : latestVersionCreator.uri) ? latestVersion : message;
          content = _solidLogic.store.any(msgId, ns.sioc('content'));
          _context10.next = 13;
          return (0, _chatLogic.allVersions)(msgId);
        case 13:
          versions = _context10.sent;
          if (versions.length > 1) {
            debug.log('renderMessageRow versions: ', versions.join(',  '));
          }
          // be tolerant in accepting replies on any version of a message
          replies = versions.map(function (version) {
            return _solidLogic.store.each(version, ns.sioc('has_reply'));
          }).flat();
          thread = null;
          straightReplies = [];
          _iterator2 = _createForOfIteratorHelper(replies);
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              reply = _step2.value;
              if (_solidLogic.store.holds(reply, ns.rdf('type'), ns.sioc('Thread'))) {
                thread = reply;
                debug.log('renderMessageRow: found thread: ' + thread);
              } else {
                straightReplies.push(reply);
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          if (straightReplies.length > 1) {
            debug.log('renderMessageRow: found normal replies: ', straightReplies);
          }
          if (!thread) {
            // thread = store.any(message, ns.sioc('has_reply'))
            thread = _solidLogic.store.any(null, ns.sioc('has_member'), message);
          }
          // debug.log('@@@@ is thread' + thread)

          // get signature
          signature = _solidLogic.store.any(msgId, $rdf.sym("".concat(_signature.SEC, "proofValue"))); // set proof message object
          msg = (0, _signature.getBlankMsg)();
          msg.id = msgId.uri;
          msg.created = _solidLogic.store.any(msgId, ns.dct('created')).value;
          msg.content = content.value;
          msg.maker = creator.uri;

          // verify signature
          if (!(signature !== null && signature !== void 0 && signature.value)) {
            // unsigned message
            unsignedMessage = true;
            debug.warn(msgId.uri + ' is unsigned'); // TODO replace with UI (colored message ?)
          } else {
            // signed message, get public key and check signature
            (0, _keys.getPublicKey)(creator).then(function (publicKey) {
              // debug.log(creator.uri + '\n' + msg.created + '\n' + msg.id + '\n' + publicKey)
              if (!publicKey) {
                debug.warn('message is signed but ' + creator.uri + ' is missing publicKey');
              }
              // check that publicKey is a valid hex string
              var regex = /[0-9A-Fa-f]{6}/g;
              if (!(publicKey !== null && publicKey !== void 0 && publicKey.match(regex))) debug.warn('invalid publicKey hex string\n' + creator.uri + '\n' + publicKey);
              // verify signature
              else if (signature !== null && signature !== void 0 && signature.value && !(0, _signature.verifySignature)(signature === null || signature === void 0 ? void 0 : signature.value, msg, publicKey)) debug.warn('invalid signature\n' + msg.id);
            });
          }
          _context10.next = 31;
          return (0, _chatLogic.originalVersion)(message);
        case 31:
          originalMessage = _context10.sent;
          edited = !message.sameTerm(originalMessage); // @@ load it first  @@   Or display the new data at the old date.
          // @@@ kludge!
          sortDate = _solidLogic.store.the(originalMessage, ns.dct('created'), null, originalMessage.doc()) || _solidLogic.store.the(message, ns.dct('created'), null, message.doc()); // In message
          messageRow = dom.createElement('tr');
          if (unsignedMessage) messageRow.setAttribute('style', 'background-color: red');
          messageRow.AJAR_date = sortDate.value;
          messageRow.AJAR_subject = message;
          td1 = dom.createElement('td');
          messageRow.appendChild(td1);
          if (!options.authorDateOnLeft) {
            img = dom.createElement('img');
            img.setAttribute('style', 'max-height: 2.5em; max-width: 2.5em; border-radius: 0.5em; margin: auto;');
            widgets.setImage(img, creator);
            td1.appendChild(img);
          } else {
            creatorAndDate(td1, creator, widgets.shortDate(sortDate.value), message);
          }
          bothDates = widgets.shortDate(sortDate.value);
          if (edited) {
            bothDates += ' ... ' + widgets.shortDate(date.value);
          }

          // Render the content ot the message itself
          td2 = messageRow.appendChild(dom.createElement('td'));
          if (!options.authorDateOnLeft) {
            creatorAndDateHorizontal(td2, creator, bothDates,
            // widgets.shortDate(dateString)
            message);
          }
          text = content ? content.value.trim() : '??? no content?';
          isURI = /^https?:\/[^ <>]*$/i.test(text);
          para = null;
          if (isURI) {
            isImage = /\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(text); // @@ Should use content-type not URI
            if (isImage && options.expandImagesInline) {
              _img = elementForImageURI(text, options);
              td2.appendChild(_img);
            } else {
              // Link but not Image
              anc = td2.appendChild(dom.createElement('a'));
              para = anc.appendChild(dom.createElement('p'));
              anc.href = text;
              para.textContent = text;
              td2.appendChild(anc);
            }
          } else {
            // text
            para = dom.createElement('p');
            td2.appendChild(para);
            para.textContent = text;
          }
          if (para) {
            bgcolor = colorizeByAuthor ? pad.lightColorHash(creator) : getBgColor(fresh);
            para.setAttribute('style', messageBodyStyle + 'background-color: ' + bgcolor + ';');
          }
          _context10.next = 52;
          return (0, _messageTools.sentimentStripLinked)(message, message.doc());
        case 52:
          strip = _context10.sent;
          if (strip.children.length) {
            td2.appendChild(dom.createElement('br'));
            td2.appendChild(strip);
          }

          // Message tool bar button
          td3 = dom.createElement('td');
          messageRow.appendChild(td3);
          toolsButton = widgets.button(dom, _iconBase.icons.iconBase + 'noun_243787.svg', '...');
          td3.appendChild(toolsButton);
          toolsButton.addEventListener('click', /*#__PURE__*/function () {
            var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(_event) {
              var toolsTR, tools, toolsTD;
              return _regenerator["default"].wrap(function _callee8$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    if (!messageRow.toolTR) {
                      _context9.next = 4;
                      break;
                    }
                    // already got a toolbar? Toogle
                    messageRow.parentNode.removeChild(messageRow.toolTR);
                    delete messageRow.toolTR;
                    return _context9.abrupt("return");
                  case 4:
                    toolsTR = dom.createElement('tr');
                    _context9.next = 7;
                    return (0, _messageTools.messageToolbar)(message, messageRow, _objectSpread(_objectSpread({}, userContext), {}, {
                      chatOptions: options
                    }), channelObject);
                  case 7:
                    tools = _context9.sent;
                    tools.style = 'border: 0.05em solid #888; border-radius: 0 0 0.7em 0.7em;  border-top: 0; height:3.5em; background-color: #fff;'; // @@ fix
                    if (messageRow.nextSibling) {
                      messageRow.parentElement.insertBefore(toolsTR, messageRow.nextSibling);
                    } else {
                      messageRow.parentElement.appendChild(toolsTR);
                    }
                    messageRow.toolTR = toolsTR;
                    toolsTR.appendChild(dom.createElement('td')); // left
                    toolsTD = toolsTR.appendChild(dom.createElement('td'));
                    toolsTR.appendChild(dom.createElement('td')); // right
                    toolsTD.appendChild(tools);
                  case 15:
                  case "end":
                    return _context9.stop();
                }
              }, _callee8);
            }));
            return function (_x20) {
              return _ref4.apply(this, arguments);
            };
          }());
          if (thread && options.showThread) {
            // debug.log('  message has thread ' + thread)
            td3.appendChild(widgets.button(dom, _iconBase.icons.iconBase + 'noun_1180164.svg',
            // right arrow .. @@ think of stg better
            'see thread', function (_e) {
              // debug.log('@@@@ Calling showThread thread ' + thread)
              options.showThread(thread, options);
            }));
          }
          return _context10.abrupt("return", messageRow);
        case 61:
        case "end":
          return _context10.stop();
      }
    }, _callee9);
  }));
  return _renderMessageRow.apply(this, arguments);
}
function switchToEditor(_x6, _x7, _x8, _x9) {
  return _switchToEditor.apply(this, arguments);
}
/*       Control for a new message -- or editing an old message ***************
 *
 */
function _switchToEditor() {
  _switchToEditor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(messageRow, message, channelObject, userContext) {
    var messageTable, editRow;
    return _regenerator["default"].wrap(function _callee10$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          messageTable = messageRow.parentNode;
          _context11.t0 = renderMessageEditor;
          _context11.t1 = channelObject;
          _context11.t2 = messageTable;
          _context11.t3 = userContext;
          _context11.t4 = channelObject.options;
          _context11.next = 8;
          return (0, _chatLogic.mostRecentVersion)(message);
        case 8:
          _context11.t5 = _context11.sent;
          editRow = (0, _context11.t0)(_context11.t1, _context11.t2, _context11.t3, _context11.t4, _context11.t5);
          messageTable.insertBefore(editRow, messageRow);
          editRow.originalRow = messageRow;
          messageRow.style.visibility = 'hidden'; // Hide the original message. unhide if user cancels edit
        case 13:
        case "end":
          return _context11.stop();
      }
    }, _callee10);
  }));
  return _switchToEditor.apply(this, arguments);
}
function renderMessageEditor(channelObject, messageTable, userContext, options, originalMessage) {
  function revertEditing(messageEditor) {
    messageEditor.originalRow.style.visibility = 'visible'; // restore read-only version
    messageEditor.parentNode.removeChild(messageEditor);
  }
  function handleFieldInput(_x10) {
    return _handleFieldInput.apply(this, arguments);
  }
  function _handleFieldInput() {
    _handleFieldInput = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_event) {
      return _regenerator["default"].wrap(function _callee5$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return sendMessage(field.value, true);
          case 2:
          case "end":
            return _context6.stop();
        }
      }, _callee5);
    }));
    return _handleFieldInput.apply(this, arguments);
  }
  function sendMessage(_x11, _x12) {
    return _sendMessage.apply(this, arguments);
  } // sendMessage
  //    DRAG AND DROP
  function _sendMessage() {
    _sendMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(text, fromMainField) {
      var sendComplete, _sendComplete, message, statusArea;
      return _regenerator["default"].wrap(function _callee7$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _sendComplete = function _sendComplete3() {
              _sendComplete = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(message, _text2) {
                var oldRow;
                return _regenerator["default"].wrap(function _callee6$(_context7) {
                  while (1) switch (_context7.prev = _context7.next) {
                    case 0:
                      _context7.next = 2;
                      return (0, _infinite.insertMessageIntoTable)(channelObject, messageTable, message, false, options, userContext);
                    case 2:
                      // not green

                      if (originalMessage) {
                        // editing another message
                        oldRow = messageEditor.originalRow; // oldRow.style.display = '' // restore read-only version, re-attack
                        if (oldRow.parentNode) {
                          oldRow.parentNode.removeChild(oldRow); // No longer needed old version
                        } else {
                          debug.warn('No parentNode on old message ' + oldRow.textContent);
                          oldRow.style.backgroundColor = '#fee';
                          oldRow.style.visibility = 'hidden'; // @@ FIX THIS AND REMOVE FROM DOM INSTEAD
                        }
                        messageEditor.parentNode.removeChild(messageEditor); // no longer need editor
                      } else {
                        if (fromMainField) {
                          field.value = ''; // clear from out for reuse
                          field.setAttribute('style', messageBodyStyle);
                          field.disabled = false;
                          field.scrollIntoView(options.newestFirst); // allign bottom (top)
                          field.focus(); // Start typing next line immediately
                          field.select();
                        }
                      }
                      // await channelObject.div.refresh() // Add new day if nec  @@ add back
                    case 3:
                    case "end":
                      return _context7.stop();
                  }
                }, _callee6);
              }));
              return _sendComplete.apply(this, arguments);
            };
            sendComplete = function _sendComplete2(_x18, _x19) {
              return _sendComplete.apply(this, arguments);
            }; // const me = authn.currentUser() // Must be logged on or wuld have got login button
            if (fromMainField) {
              field.setAttribute('style', messageBodyStyle + 'color: #bbb;'); // pendingedit
              field.disabled = true;
            }
            _context8.prev = 3;
            _context8.next = 6;
            return channelObject.updateMessage(text, originalMessage, null, options.thread);
          case 6:
            message = _context8.sent;
            _context8.next = 14;
            break;
          case 9:
            _context8.prev = 9;
            _context8.t0 = _context8["catch"](3);
            statusArea = userContext.statusArea || messageEditor;
            statusArea.appendChild(widgets.errorMessageBlock(dom, 'Error writing message: ' + _context8.t0));
            return _context8.abrupt("return");
          case 14:
            _context8.next = 16;
            return sendComplete(message, text);
          case 16:
          case "end":
            return _context8.stop();
        }
      }, _callee7, null, [[3, 9]]);
    }));
    return _sendMessage.apply(this, arguments);
  }
  function droppedFileHandler(files) {
    var base = messageTable.chatDocument.dir().uri;
    widgets.uploadFiles(_solidLogic.store.fetcher, files, base + 'Files', base + 'Pictures', /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(theFile, destURI) {
        return _regenerator["default"].wrap(function _callee$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return sendMessage(destURI);
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee);
      }));
      return function (_x13, _x14) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  // When a set of URIs are dropped on the field
  var droppedURIHandler = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(uris) {
      var _iterator, _step, uri;
      return _regenerator["default"].wrap(function _callee2$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _iterator = _createForOfIteratorHelper(uris);
            _context3.prev = 1;
            _iterator.s();
          case 3:
            if ((_step = _iterator.n()).done) {
              _context3.next = 9;
              break;
            }
            uri = _step.value;
            _context3.next = 7;
            return sendMessage(uri);
          case 7:
            _context3.next = 3;
            break;
          case 9:
            _context3.next = 14;
            break;
          case 11:
            _context3.prev = 11;
            _context3.t0 = _context3["catch"](1);
            _iterator.e(_context3.t0);
          case 14:
            _context3.prev = 14;
            _iterator.f();
            return _context3.finish(14);
          case 17:
          case "end":
            return _context3.stop();
        }
      }, _callee2, null, [[1, 11, 14, 17]]);
    }));
    return function droppedURIHandler(_x15) {
      return _ref2.apply(this, arguments);
    };
  }();

  // When we are actually logged on
  function turnOnInput() {
    function getImageDoc() {
      imageDoc = $rdf.sym(chatDocument.dir().uri + 'Image_' + Date.now() + '.png');
      return imageDoc;
    }
    function tookPicture(_x16) {
      return _tookPicture.apply(this, arguments);
    } // Body of turnOnInput
    function _tookPicture() {
      _tookPicture = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(imageDoc) {
        return _regenerator["default"].wrap(function _callee4$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              if (!imageDoc) {
                _context5.next = 3;
                break;
              }
              _context5.next = 3;
              return sendMessage(imageDoc.uri);
            case 3:
            case "end":
              return _context5.stop();
          }
        }, _callee4);
      }));
      return _tookPicture.apply(this, arguments);
    }
    var menuButton;
    if (options.menuHandler) {
      var _menuButton = widgets.button(dom, _iconBase.icons.iconBase + 'noun_243787.svg', 'More');
      _menuButton.setAttribute('style', style.buttonStyle + 'float: right;');
      // menuButton.addEventListener('click', _event => sendMessage(), false) (done in turnoninput)
      rhs.appendChild(_menuButton);
    }
    if (options.menuHandler && menuButton) {
      var _me = _solidLogic.authn.currentUser();
      var menuOptions = {
        me: _me,
        dom: dom,
        div: null,
        // @@ was: div
        newBase: messageTable.chatDocument.dir().uri
      };
      menuButton.addEventListener('click', function (event) {
        options.menuHandler(event, channelObject.chatChannel, menuOptions);
      }, false);
    }
    var me = _solidLogic.authn.currentUser(); // If already logged on
    creatorAndDate(lhs, me, '', null);
    field = dom.createElement('textarea');
    middle.innerHTML = '';
    middle.appendChild(field);
    field.rows = 3;
    if (originalMessage) {
      field.value = _solidLogic.store.anyValue(originalMessage, ns.sioc('content'), null, originalMessage.doc());
    }
    // field.cols = 40
    field.setAttribute('style', messageBodyStyle + 'background-color: #eef;');

    // Trap the Enter BEFORE it is used ti make a newline

    field.addEventListener('keydown', /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(e) {
        return _regenerator["default"].wrap(function _callee3$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(e.code === 'Enter')) {
                _context4.next = 4;
                break;
              }
              if (!(!e.shiftKey && !options.shiftEnterSendsMessage || e.shiftKey && options.shiftEnterSendsMessage)) {
                _context4.next = 4;
                break;
              }
              _context4.next = 4;
              return handleFieldInput(e);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee3);
      }));
      return function (_x17) {
        return _ref3.apply(this, arguments);
      };
    }(), false);
    widgets.makeDropTarget(field, droppedURIHandler, droppedFileHandler);
    rhs.innerHTML = '';
    sendButton = widgets.button(dom, sendIcon, 'Send');
    sendButton.style["float"] = 'right';
    sendButton.addEventListener('click', function (_event) {
      return handleFieldInput();
    }, false);
    rhs.appendChild(sendButton);
    if (originalMessage) {
      // Are we editing another message?
      var cancelButton = rhs.appendChild(widgets.cancelButton(dom));
      cancelButton.style["float"] = 'left';
      // cancelButton.firstChild.style.opacity = '0.3' // moved to buttons
      cancelButton.addEventListener('click', function (_event) {
        return revertEditing(messageEditor);
      }, false);
      rhs.appendChild(cancelButton);
    }
    var chatDocument = channelObject.dateFolder.leafDocumentFromDate(new Date());
    var imageDoc;
    middle.appendChild(_index.media.cameraButton(dom, _solidLogic.store, getImageDoc, tookPicture));
    pad.recordParticipation(channelObject.channel, channelObject.channel.doc()); // participation =
  } // turn on inpuut

  // Body of renderMessageEditor

  var sortDate, sendIcon;
  if (originalMessage) {
    sortDate = _solidLogic.store.anyValue(originalMessage, ns.dct('created'), null, originalMessage.doc());
    // text = store.anyValue(originalMessage, ns.sioc('content'), null, originalMessage.doc())
    sendIcon = _iconBase.icons.iconBase + 'noun_1180158.svg'; // Green check
    // cancelIcon = icons.iconBase + 'noun_1180156.svg' // Black cross
  } else {
    sendIcon = _iconBase.icons.iconBase + 'noun_383448.svg';
    sortDate = '9999-01-01T00:00:00Z'; // ISO format for field sort
    // text = ''
  }
  var messageEditor = dom.createElement('tr');
  var lhs = dom.createElement('td');
  var middle = dom.createElement('td');
  var rhs = dom.createElement('td');
  messageEditor.appendChild(lhs);
  messageEditor.appendChild(middle);
  messageEditor.appendChild(rhs);
  messageEditor.AJAR_date = sortDate;
  // messageEditor.appendChild(dom.createElement('br'))

  var field, sendButton;
  var context = {
    div: middle,
    dom: dom
  };
  (0, _login.ensureLoggedIn)(context).then(function (context) {
    // me = context.me
    turnOnInput();
    Object.assign(context, userContext);
    (0, _bookmarks.findBookmarkDocument)(context).then(function (_context) {
      // debug.log('Bookmark file: ' + context.bookmarkDocument)
    });
  });
  return messageEditor;
} // renderMessageEditor
//# sourceMappingURL=message.js.map