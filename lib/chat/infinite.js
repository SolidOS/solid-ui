"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.desktopNotification = desktopNotification;
exports.infiniteMessageArea = infiniteMessageArea;
exports.insertMessageIntoTable = insertMessageIntoTable;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var $rdf = _interopRequireWildcard(require("rdflib"));
var _solidLogic = require("solid-logic");
var debug = _interopRequireWildcard(require("../debug"));
var _iconBase = require("../iconBase");
var ns = _interopRequireWildcard(require("../ns"));
var widgets = _interopRequireWildcard(require("../widgets"));
var _chatLogic = require("./chatLogic");
var _message = require("./message");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } /**
 * Contains the [[infiniteMessageArea]] class
 * @packageDocumentation
 */ // import { findBookmarkDocument } from './bookmarks'
// pull in first avoid cross-refs
// import * as style from '../style'
// import * as utils from '../utils'
// import * as pad from '../pad'
// import { DateFolder } from './dateFolder'
// const UI = { authn, icons, ns, media, pad, $rdf, store, style, utils, widgets }

function desktopNotification(str) {
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    debug.warn('This browser does no t support desktop notification');
  } else if (Notification.permission === 'granted') {
    // Let's check whether notificatio n permissions have already been granted
    // eslint-disable-next-line no-new
    new Notification(str);
  } else if (Notification.permission !== 'denied') {
    // Otherwise, we need to ask the user for permission
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        // eslint-disable-next-line no-new
        new Notification(str);
      }
    });
  }
  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

/**
 * Renders a chat message inside a `messageTable`
 */
function insertMessageIntoTable(_x, _x2, _x3, _x4, _x5, _x6) {
  return _insertMessageIntoTable.apply(this, arguments);
}
/**
 * Common code for a chat (discussion area of messages about something)
 * This version runs over a series of files for different time periods
 *
 * Parameters for the whole chat like its title are stored on
 * index.ttl#this and the chats messages are stored in YYYY/MM/DD/chat.ttl
 *
 * Use to import store as param 2, now ignores it and uses the UI main store
 *
 * Options include:

 - shiftEnterSendsMessage: Use shift/enter to send message, Enter to add newline, instead of the reverse.
 - authorDateOnLeft:  Display the author's anme and date of the message in the left column instead of first above the content
 - selectedMessage: Display one message highlighted with the chat around it
 - solo: By itelf on a webpage, so user scroll anywhere in the web page scan scroll the chat.
 - newestFirst: Arrange the chat messages chronologically newest at the top insted of at the bottom
 - infinite:  Use infinite scroll
 - showDeletedMessages: Show messages which have been delted as "deleted message". Otherwise hide them.
 - expandImagesInline: If a URI by itself in a message looks like an image URI, replace it with the image
 - inlineImageHeightEms: The height (in ems) of images expaned from their URIs in the chat.

 */
function _insertMessageIntoTable() {
  _insertMessageIntoTable = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(channelObject, messageTable, message, fresh, options, userContext) {
    var messageRow, done, ele, newestFirst, dateString;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _message.renderMessageRow)(channelObject, message, fresh, options, userContext);
        case 2:
          messageRow = _context.sent;
          // const message = messageRow.AJAR_subject
          if (options.selectedMessage && options.selectedMessage.sameTerm(message)) {
            messageRow.style.backgroundColor = 'yellow';
            options.selectedElement = messageRow;
            messageTable.selectedElement = messageRow;
          }
          done = false;
          ele = messageTable.firstChild;
        case 6:
          if (ele) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("break", 17);
        case 8:
          newestFirst = options.newestfirst === true;
          dateString = messageRow.AJAR_date;
          if (!(dateString > ele.AJAR_date && newestFirst || dateString < ele.AJAR_date && !newestFirst)) {
            _context.next = 14;
            break;
          }
          messageTable.insertBefore(messageRow, ele);
          done = true;
          return _context.abrupt("break", 17);
        case 14:
          ele = ele.nextSibling;
          _context.next = 6;
          break;
        case 17:
          if (!done) {
            messageTable.appendChild(messageRow);
          }
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _insertMessageIntoTable.apply(this, arguments);
}
function infiniteMessageArea(_x7, _x8, _x9, _x10) {
  return _infiniteMessageArea.apply(this, arguments);
}
function _infiniteMessageArea() {
  _infiniteMessageArea = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(dom, wasStore, chatChannel, options) {
    var syncMessages, _syncMessages, addMessage, _addMessage, insertPreviousMessages, _insertPreviousMessages, removePreviousMessages, createMessageTable, _createMessageTable, renderMessageTable, _renderMessageTable, addNewChatDocumentIfNewDay, _addNewChatDocumentIfNewDay, appendCurrentMessages, _appendCurrentMessages, loadMoreWhereNeeded, _loadMoreWhereNeeded, loadInitialContent, _loadInitialContent, newestFirst, channelObject, dateFolder, div, statusArea, userContext, liveMessageTable, threadRootMessage, earliest, latest, thread, threadTime, lock;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _loadInitialContent = function _loadInitialContent3() {
            _loadInitialContent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
              var yank, fixScroll, live, selectedDocument, threadRootDocument, initialDocment, now, todayDocument, selectedMessageTable, selectedDate;
              return _regenerator["default"].wrap(function _callee14$(_context14) {
                while (1) switch (_context14.prev = _context14.next) {
                  case 0:
                    fixScroll = function _fixScroll() {
                      if (options.selectedElement) {
                        options.selectedElement.scrollIntoView({
                          block: 'center'
                        }); // align tops or bottoms
                      } else {
                        if (liveMessageTable.inputRow.scrollIntoView) {
                          liveMessageTable.inputRow.scrollIntoView(newestFirst); // align tops or bottoms
                        }
                      }
                    };
                    yank = function _yank() {
                      if (selectedMessageTable && selectedMessageTable.selectedElement) {
                        selectedMessageTable.selectedElement.scrollIntoView({
                          block: 'center'
                        });
                      }
                    }; // During initial load ONLY keep scroll to selected thing or bottom
                    if (options.selectedMessage) {
                      selectedDocument = options.selectedMessage.doc();
                    }
                    if (threadRootMessage) {
                      threadRootDocument = threadRootMessage.doc();
                    }
                    initialDocment = selectedDocument || threadRootDocument;
                    if (initialDocment) {
                      now = new Date();
                      todayDocument = dateFolder.leafDocumentFromDate(now);
                      live = todayDocument.sameTerm(initialDocment);
                    }
                    if (!(initialDocment && !live)) {
                      _context14.next = 18;
                      break;
                    }
                    selectedDate = dateFolder.dateFromLeafDocument(initialDocment);
                    _context14.next = 10;
                    return createMessageTable(selectedDate, live);
                  case 10:
                    selectedMessageTable = _context14.sent;
                    div.appendChild(selectedMessageTable);
                    earliest.messageTable = selectedMessageTable;
                    latest.messageTable = selectedMessageTable;
                    yank();
                    setTimeout(yank, 1000); // @@ kludge - restore position distubed by other cHANGES
                    _context14.next = 22;
                    break;
                  case 18:
                    _context14.next = 20;
                    return appendCurrentMessages();
                  case 20:
                    earliest.messageTable = liveMessageTable;
                    latest.messageTable = liveMessageTable;
                  case 22:
                    _context14.next = 24;
                    return loadMoreWhereNeeded(null, fixScroll);
                  case 24:
                    div.addEventListener('scroll', loadMoreWhereNeeded);
                    if (options.solo) {
                      document.body.addEventListener('scroll', loadMoreWhereNeeded);
                    }
                  case 26:
                  case "end":
                    return _context14.stop();
                }
              }, _callee14);
            }));
            return _loadInitialContent.apply(this, arguments);
          };
          loadInitialContent = function _loadInitialContent2() {
            return _loadInitialContent.apply(this, arguments);
          };
          _loadMoreWhereNeeded = function _loadMoreWhereNeeded3() {
            _loadMoreWhereNeeded = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(event, fixScroll) {
              var freeze, magicZone, done, scrollBottom, scrollTop;
              return _regenerator["default"].wrap(function _callee13$(_context13) {
                while (1) switch (_context13.prev = _context13.next) {
                  case 0:
                    if (!lock) {
                      _context13.next = 2;
                      break;
                    }
                    return _context13.abrupt("return");
                  case 2:
                    lock = true;
                    freeze = !fixScroll;
                    magicZone = 150; // const top = div.scrollTop
                    // const bottom = div.scrollHeight - top - div.clientHeight
                  case 5:
                    if (!(div.scrollTop < magicZone && earliest.messageTable && !earliest.messageTable.initial && earliest.messageTable.extendBackwards)) {
                      _context13.next = 20;
                      break;
                    }
                    if (!(div.scrollHeight === 0)) {
                      _context13.next = 10;
                      break;
                    }
                    // debug.log('    chat/loadMoreWhereNeeded: trying later...')
                    setTimeout(loadMoreWhereNeeded, 2000); // couple be less
                    lock = false;
                    return _context13.abrupt("return");
                  case 10:
                    // debug.log('    chat/loadMoreWhereNeeded: Going now')
                    scrollBottom = div.scrollHeight - div.scrollTop; // debug.log('infinite scroll: adding above: top ' + div.scrollTop)
                    _context13.next = 13;
                    return earliest.messageTable.extendBackwards();
                  case 13:
                    done = _context13.sent;
                    if (freeze) {
                      div.scrollTop = div.scrollHeight - scrollBottom;
                    }
                    if (fixScroll) fixScroll();
                    if (!done) {
                      _context13.next = 18;
                      break;
                    }
                    return _context13.abrupt("break", 20);
                  case 18:
                    _context13.next = 5;
                    break;
                  case 20:
                    if (!(options.selectedMessage &&
                    // we started in the middle not at the bottom
                    div.scrollHeight - div.scrollTop - div.clientHeight < magicZone &&
                    // we are scrolled right to the bottom
                    latest.messageTable && !latest.messageTable["final"] &&
                    // there is more data to come
                    latest.messageTable.extendForwards)) {
                      _context13.next = 31;
                      break;
                    }
                    scrollTop = div.scrollTop;
                    /* debug.log(
                      'infinite scroll: adding below: bottom: ' +
                      (div.scrollHeight - div.scrollTop - div.clientHeight)
                    ) */
                    _context13.next = 24;
                    return latest.messageTable.extendForwards();
                  case 24:
                    done = _context13.sent;
                    // then add more data on the bottom
                    if (freeze) {
                      div.scrollTop = scrollTop; // while adding below keep same things in view
                    }
                    if (fixScroll) fixScroll();
                    if (!done) {
                      _context13.next = 29;
                      break;
                    }
                    return _context13.abrupt("break", 31);
                  case 29:
                    _context13.next = 20;
                    break;
                  case 31:
                    lock = false;
                  case 32:
                  case "end":
                    return _context13.stop();
                }
              }, _callee13);
            }));
            return _loadMoreWhereNeeded.apply(this, arguments);
          };
          loadMoreWhereNeeded = function _loadMoreWhereNeeded2(_x20, _x21) {
            return _loadMoreWhereNeeded.apply(this, arguments);
          };
          _appendCurrentMessages = function _appendCurrentMessage2() {
            _appendCurrentMessages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
              var now, chatDocument, messageTable;
              return _regenerator["default"].wrap(function _callee12$(_context12) {
                while (1) switch (_context12.prev = _context12.next) {
                  case 0:
                    now = new Date();
                    chatDocument = dateFolder.leafDocumentFromDate(now); /// ///////////////////////////////////////////////////////////
                    _context12.next = 4;
                    return createMessageTable(now, true);
                  case 4:
                    messageTable = _context12.sent;
                    div.appendChild(messageTable);
                    div.refresh = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
                      return _regenerator["default"].wrap(function _callee11$(_context11) {
                        while (1) switch (_context11.prev = _context11.next) {
                          case 0:
                            _context11.next = 2;
                            return addNewChatDocumentIfNewDay(new Date());
                          case 2:
                            _context11.next = 4;
                            return syncMessages(chatChannel, messageTable);
                          case 4:
                            // @@ livemessagetable??
                            desktopNotification(chatChannel);
                          case 5:
                          case "end":
                            return _context11.stop();
                        }
                      }, _callee11);
                    })); // The short chat version the live update listening is done in the pane but we do it in the widget @@
                    _solidLogic.store.updater.addDownstreamChangeListener(chatDocument, div.refresh); // Live update
                    liveMessageTable = messageTable;
                    latest.messageTable = liveMessageTable;
                    return _context12.abrupt("return", messageTable);
                  case 11:
                  case "end":
                    return _context12.stop();
                }
              }, _callee12);
            }));
            return _appendCurrentMessages.apply(this, arguments);
          };
          appendCurrentMessages = function _appendCurrentMessage() {
            return _appendCurrentMessages.apply(this, arguments);
          };
          _addNewChatDocumentIfNewDay = function _addNewChatDocumentIf2() {
            _addNewChatDocumentIfNewDay = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
              var newChatDocument, oldChatDocument, sts;
              return _regenerator["default"].wrap(function _callee10$(_context10) {
                while (1) switch (_context10.prev = _context10.next) {
                  case 0:
                    // @@ Remove listener from previous table as it is now static
                    newChatDocument = dateFolder.leafDocumentFromDate(new Date());
                    if (newChatDocument.sameTerm(latest.messageTable.chatDocument)) {
                      _context10.next = 7;
                      break;
                    }
                    // It is a new day
                    if (liveMessageTable.inputRow) {
                      liveMessageTable.removeChild(liveMessageTable.inputRow);
                      delete liveMessageTable.inputRow;
                    }
                    oldChatDocument = latest.messageTable.chatDocument;
                    _context10.next = 6;
                    return appendCurrentMessages();
                  case 6:
                    // Adding a link in the document will ping listeners to add the new block too
                    if (!_solidLogic.store.holds(oldChatDocument, ns.rdfs('seeAlso'), newChatDocument, oldChatDocument)) {
                      sts = [$rdf.st(oldChatDocument, ns.rdfs('seeAlso'), newChatDocument, oldChatDocument)];
                      try {
                        _solidLogic.store.updater.update([], sts);
                      } catch (err) {
                        alert('Unable to link old chat file to new one:' + err);
                      }
                    }
                  case 7:
                  case "end":
                    return _context10.stop();
                }
              }, _callee10);
            }));
            return _addNewChatDocumentIfNewDay.apply(this, arguments);
          };
          addNewChatDocumentIfNewDay = function _addNewChatDocumentIf() {
            return _addNewChatDocumentIfNewDay.apply(this, arguments);
          };
          _renderMessageTable = function _renderMessageTable3() {
            _renderMessageTable = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(date, live) {
              var scrollBackbutton, scrollForwardButton, extendBackwards, _extendBackwards, setScrollBackbuttonIcon, extendForwards, _extendForwards, setScrollForwardButtonIcon, scrollForwardButtonHandler, _scrollForwardButtonHandler, messageTable, chatDocument, tr, test, titleTR, scrollBackbuttonCell, dateCell, scrollForwardButtonCell, sts, _iterator2, _step2, st;
              return _regenerator["default"].wrap(function _callee9$(_context9) {
                while (1) switch (_context9.prev = _context9.next) {
                  case 0:
                    _scrollForwardButtonHandler = function _scrollForwardButtonH2() {
                      _scrollForwardButtonHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(_event) {
                        return _regenerator["default"].wrap(function _callee8$(_context8) {
                          while (1) switch (_context8.prev = _context8.next) {
                            case 0:
                              if (!messageTable.extendedForwards) {
                                _context8.next = 6;
                                break;
                              }
                              removePreviousMessages(false, messageTable);
                              messageTable.extendedForwards = false;
                              setScrollForwardButtonIcon();
                              _context8.next = 9;
                              break;
                            case 6:
                              _context8.next = 8;
                              return extendForwards();
                            case 8:
                              // async
                              latest.messageTable.scrollIntoView(newestFirst);
                            case 9:
                            case "end":
                              return _context8.stop();
                          }
                        }, _callee8);
                      }));
                      return _scrollForwardButtonHandler.apply(this, arguments);
                    };
                    scrollForwardButtonHandler = function _scrollForwardButtonH(_x22) {
                      return _scrollForwardButtonHandler.apply(this, arguments);
                    };
                    setScrollForwardButtonIcon = function _setScrollForwardButt() {
                      if (!scrollForwardButton) return;
                      var sense = messageTable.extendedForwards ? !newestFirst : newestFirst; // noun_T-Block_1114657_000000.svg
                      var scrollForwardIcon = messageTable["final"] ? 'noun_T-Block_1114657_000000.svg' : getScrollForwardButtonIcon(sense);
                      scrollForwardButton.firstChild.setAttribute('src', _iconBase.icons.iconBase + scrollForwardIcon);
                      function getScrollForwardButtonIcon(sense) {
                        return !sense ? 'noun_1369241.svg' : 'noun_1369237.svg';
                      }
                    };
                    _extendForwards = function _extendForwards3() {
                      _extendForwards = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
                        var done;
                        return _regenerator["default"].wrap(function _callee7$(_context7) {
                          while (1) switch (_context7.prev = _context7.next) {
                            case 0:
                              _context7.next = 2;
                              return insertPreviousMessages(false);
                            case 2:
                              done = _context7.sent;
                              return _context7.abrupt("return", done);
                            case 4:
                            case "end":
                              return _context7.stop();
                          }
                        }, _callee7);
                      }));
                      return _extendForwards.apply(this, arguments);
                    };
                    extendForwards = function _extendForwards2() {
                      return _extendForwards.apply(this, arguments);
                    };
                    setScrollBackbuttonIcon = function _setScrollBackbuttonI() {
                      if (!scrollBackbutton) {
                        return;
                      }
                      var sense = messageTable.extendedBack ? !newestFirst : newestFirst;
                      var scrollBackIcon = messageTable.initial ? 'noun_T-Block_1114655_000000.svg' : getScrollbackIcon(sense);
                      scrollBackbutton.firstChild.setAttribute('src', _iconBase.icons.iconBase + scrollBackIcon);
                      function getScrollbackIcon(sense) {
                        return sense ? 'noun_1369241.svg' : 'noun_1369237.svg';
                      }
                    };
                    _extendBackwards = function _extendBackwards3() {
                      _extendBackwards = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
                        var done;
                        return _regenerator["default"].wrap(function _callee6$(_context6) {
                          while (1) switch (_context6.prev = _context6.next) {
                            case 0:
                              _context6.next = 2;
                              return insertPreviousMessages(true);
                            case 2:
                              done = _context6.sent;
                              if (done) {
                                if (scrollBackbutton) {
                                  scrollBackbutton.firstChild.setAttribute('src', _iconBase.icons.iconBase + 'noun_T-Block_1114655_000000.svg'); // T
                                  scrollBackbutton.disabled = true;
                                }
                                messageTable.initial = true;
                              } else {
                                messageTable.extendedBack = true;
                              }
                              setScrollBackbuttonIcon();
                              return _context6.abrupt("return", done);
                            case 6:
                            case "end":
                              return _context6.stop();
                          }
                        }, _callee6);
                      }));
                      return _extendBackwards.apply(this, arguments);
                    };
                    extendBackwards = function _extendBackwards2() {
                      return _extendBackwards.apply(this, arguments);
                    };
                    scrollBackbutton = null; // was let
                    scrollForwardButton = null; // was let
                    /// /////////////////   Scroll down adding more above
                    /// ////////////// Scroll up adding more below
                    /// ///////////////////////
                    /*
                    options = options || {}
                    options.authorDateOnLeft = true
                    const newestFirst = options.newestFirst === '1' || options.newestFirst === true // hack for now
                    const channelObject = new ChatChannel(chatChannel, options)
                    const dateFolder = channelObject.dateFolder
                     const div = dom.createElement('div')
                    const statusArea = div.appendChild(dom.createElement('div'))
                    const userContext = { dom, statusArea, div: statusArea } // logged on state, pointers to user's stuff
                    */
                    // debug.log('Options for called message Area', options)
                    messageTable = dom.createElement('table');
                    messageTable.style.width = '100%'; // fill the pane div
                    messageTable.extendBackwards = extendBackwards; // Make function available to scroll stuff
                    messageTable.extendForwards = extendForwards; // Make function available to scroll stuff

                    messageTable.date = date;
                    chatDocument = dateFolder.leafDocumentFromDate(date);
                    messageTable.chatDocument = chatDocument;
                    messageTable.fresh = false;
                    messageTable.setAttribute('style', 'width: 100%;'); // fill that div!
                    if (live) {
                      messageTable["final"] = true;
                      liveMessageTable = messageTable;
                      latest.messageTable = messageTable;
                      tr = (0, _message.renderMessageEditor)(channelObject, messageTable, userContext, options);
                      if (newestFirst) {
                        messageTable.insertBefore(tr, messageTable.firstChild); // If newestFirst
                      } else {
                        messageTable.appendChild(tr); // not newestFirst
                      }
                      messageTable.inputRow = tr;
                    }

                    /// ///// Infinite scroll
                    //
                    // @@ listen for swipe past end event not just button
                    test = true;
                    if (test) {
                      // ws options.infinite but need for non-infinite
                      titleTR = dom.createElement('tr');
                      scrollBackbuttonCell = titleTR.appendChild(dom.createElement('td')); // up traingles: noun_1369237.svg
                      // down triangles: noun_1369241.svg
                      /*
                      const scrollBackIcon = newestFirst
                        ? 'noun_1369241.svg'
                        : 'noun_1369237.svg' // down and up arrows respoctively
                      scrollBackbutton = widgets.button(
                        dom,
                        icons.iconBase + scrollBackIcon,
                        'Previous messages ...'
                      )
                      scrollBackbuttonCell.style = 'width:3em; height:3em;'
                      scrollBackbutton.addEventListener('click', scrollBackbuttonHandler, false)
                      messageTable.extendedBack = false
                      scrollBackbuttonCell.appendChild(scrollBackbutton)
                      setScrollBackbuttonIcon()
                      */
                      dateCell = titleTR.appendChild(dom.createElement('td'));
                      dateCell.style = 'text-align: center; vertical-align: middle; color: #888; font-style: italic;';
                      dateCell.textContent = widgets.shortDate(date.toISOString(), true); // no time, only date

                      // @@@@@@@@@@@ todo move this button to other end of  message cell, o
                      scrollForwardButtonCell = titleTR.appendChild(dom.createElement('td'));
                      if (options.includeRemoveButton) {
                        scrollForwardButtonCell.appendChild(widgets.cancelButton(dom, function (_e) {
                          div.parentNode.removeChild(div);
                        }));
                      }
                      /*
                      const scrollForwardIcon = newestFirst
                        ? 'noun_1369241.svg'
                        : 'noun_1369237.svg' // down and up arrows respoctively
                      scrollForwardButton = widgets.button(
                        dom,
                        icons.iconBase + scrollForwardIcon,
                        'Later messages ...'
                      )
                      scrollForwardButtonCell.appendChild(scrollForwardButton)
                      scrollForwardButtonCell.style = 'width:3em; height:3em;'
                      scrollForwardButton.addEventListener(
                        'click',
                        scrollForwardButtonHandler,
                        false
                      )
                      messageTable.extendedForward = false
                      setScrollForwardButtonIcon()
                      */
                      messageTable.extendedForwards = false;
                      if (!newestFirst) {
                        // opposite end from the entry field
                        messageTable.insertBefore(titleTR, messageTable.firstChild); // If not newestFirst
                      } else {
                        messageTable.appendChild(titleTR); //  newestFirst
                      }
                    }
                    sts = _solidLogic.store.statementsMatching(null, ns.wf('message'), null, chatDocument);
                    if (!live && sts.length === 0) {
                      // not todays
                      // no need buttomns at the moment
                      // messageTable.style.visibility = 'collapse' // Hide files with no messages
                    }
                    _iterator2 = _createForOfIteratorHelper(sts);
                    _context9.prev = 25;
                    _iterator2.s();
                  case 27:
                    if ((_step2 = _iterator2.n()).done) {
                      _context9.next = 33;
                      break;
                    }
                    st = _step2.value;
                    _context9.next = 31;
                    return addMessage(st.object, messageTable);
                  case 31:
                    _context9.next = 27;
                    break;
                  case 33:
                    _context9.next = 38;
                    break;
                  case 35:
                    _context9.prev = 35;
                    _context9.t0 = _context9["catch"](25);
                    _iterator2.e(_context9.t0);
                  case 38:
                    _context9.prev = 38;
                    _iterator2.f();
                    return _context9.finish(38);
                  case 41:
                    messageTable.fresh = true; // message table updated with insertMessageIntoTable()
                    return _context9.abrupt("return", messageTable);
                  case 43:
                  case "end":
                    return _context9.stop();
                }
              }, _callee9, null, [[25, 35, 38, 41]]);
            }));
            return _renderMessageTable.apply(this, arguments);
          };
          renderMessageTable = function _renderMessageTable2(_x18, _x19) {
            return _renderMessageTable.apply(this, arguments);
          };
          _createMessageTable = function _createMessageTable3() {
            _createMessageTable = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(date, live) {
              var chatDocument, messageTable, statusTR;
              return _regenerator["default"].wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    // debug.log('   createMessageTable for  ' + date)
                    chatDocument = dateFolder.leafDocumentFromDate(date);
                    _context5.prev = 1;
                    _context5.next = 4;
                    return _solidLogic.store.fetcher.createIfNotExists(chatDocument);
                  case 4:
                    _context5.next = 19;
                    break;
                  case 6:
                    _context5.prev = 6;
                    _context5.t0 = _context5["catch"](1);
                    messageTable = dom.createElement('table');
                    statusTR = messageTable.appendChild(dom.createElement('tr')); // ### find status in exception
                    if (!(_context5.t0.response && _context5.t0.response.status && _context5.t0.response.status === 404)) {
                      _context5.next = 16;
                      break;
                    }
                    _context5.next = 13;
                    return renderMessageTable(date, live);
                  case 13:
                    return _context5.abrupt("return", _context5.sent);
                  case 16:
                    debug.log('*** Error NON 404 for chat file ' + chatDocument);
                    statusTR.appendChild(widgets.errorMessageBlock(dom, _context5.t0, 'pink'));
                  case 18:
                    return _context5.abrupt("return", statusTR);
                  case 19:
                    _context5.next = 21;
                    return renderMessageTable(date, live);
                  case 21:
                    return _context5.abrupt("return", _context5.sent);
                  case 22:
                  case "end":
                    return _context5.stop();
                }
              }, _callee5, null, [[1, 6]]);
            }));
            return _createMessageTable.apply(this, arguments);
          };
          createMessageTable = function _createMessageTable2(_x16, _x17) {
            return _createMessageTable.apply(this, arguments);
          };
          removePreviousMessages = function _removePreviousMessag(backwards, messageTable) {
            if (backwards ? newestFirst : !newestFirst) {
              // it was put on bottom
              while (messageTable.nextSibling) {
                div.removeChild(messageTable.nextSibling);
              }
            } else {
              // it was put on top as we scroll back
              while (messageTable.previousSibling) {
                div.removeChild(messageTable.previousSibling);
              }
            }
            var extr = backwards ? earliest : latest;
            extr.messageTable = messageTable;
          };
          _insertPreviousMessages = function _insertPreviousMessag2() {
            _insertPreviousMessages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(backwards) {
              var extremity, date, live, todayDoc, doc, newMessageTable;
              return _regenerator["default"].wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    extremity = backwards ? earliest : latest;
                    date = extremity.messageTable.date; // day in mssecs
                    // Are we at the top of a thread?
                    if (!(backwards && earliest.limit && date <= earliest.limit)) {
                      _context4.next = 7;
                      break;
                    }
                    if (liveMessageTable) {
                      _context4.next = 6;
                      break;
                    }
                    _context4.next = 6;
                    return appendCurrentMessages();
                  case 6:
                    return _context4.abrupt("return", true);
                  case 7:
                    _context4.next = 9;
                    return dateFolder.loadPrevious(date, backwards);
                  case 9:
                    date = _context4.sent;
                    if (!(!date && !backwards && !liveMessageTable)) {
                      _context4.next = 13;
                      break;
                    }
                    _context4.next = 13;
                    return appendCurrentMessages();
                  case 13:
                    if (date) {
                      _context4.next = 15;
                      break;
                    }
                    return _context4.abrupt("return", true);
                  case 15:
                    // done
                    live = false;
                    if (!backwards) {
                      todayDoc = dateFolder.leafDocumentFromDate(new Date());
                      doc = dateFolder.leafDocumentFromDate(date);
                      live = doc.sameTerm(todayDoc); // Is this todays?
                    }
                    _context4.next = 19;
                    return createMessageTable(date, live);
                  case 19:
                    newMessageTable = _context4.sent;
                    extremity.messageTable = newMessageTable; // move pointer to earliest
                    if (backwards ? newestFirst : !newestFirst) {
                      // put on bottom or top
                      div.appendChild(newMessageTable);
                    } else {
                      // put on top as we scroll back
                      div.insertBefore(newMessageTable, div.firstChild);
                    }
                    return _context4.abrupt("return", live);
                  case 23:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return _insertPreviousMessages.apply(this, arguments);
          };
          insertPreviousMessages = function _insertPreviousMessag(_x15) {
            return _insertPreviousMessages.apply(this, arguments);
          };
          _addMessage = function _addMessage3() {
            _addMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(message, messageTable) {
              var thread, id;
              return _regenerator["default"].wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    if (!((0, _chatLogic.isDeleted)(message) && !options.showDeletedMessages)) {
                      _context3.next = 2;
                      break;
                    }
                    return _context3.abrupt("return");
                  case 2:
                    /* if (isReplaced(message)) { //
                      return // this is old version
                    } */
                    thread = _solidLogic.store.any(null, ns.sioc('has_member'), message, message.doc());
                    id = _solidLogic.store.any(message, ns.sioc('id'), null, message.doc());
                    if (id && !thread) {
                      thread = _solidLogic.store.any(null, ns.sioc('has_member'), id, message.doc());
                    }
                    if (!options.thread) {
                      _context3.next = 15;
                      break;
                    }
                    if (!_solidLogic.store.holds(message, ns.sioc('has_reply'), options.thread)) {
                      _context3.next = 9;
                      break;
                    }
                    _context3.next = 13;
                    break;
                  case 9:
                    if (!(thread && thread.sameTerm(options.thread))) {
                      _context3.next = 12;
                      break;
                    }
                    _context3.next = 13;
                    break;
                  case 12:
                    return _context3.abrupt("return");
                  case 13:
                    _context3.next = 19;
                    break;
                  case 15:
                    if (!thread) {
                      _context3.next = 19;
                      break;
                    }
                    return _context3.abrupt("return");
                  case 19:
                    if (messageTable.fresh) {
                      _context3.next = 22;
                      break;
                    }
                    _context3.next = 22;
                    return insertMessageIntoTable(channelObject, messageTable, message, messageTable.fresh, options, userContext);
                  case 22:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return _addMessage.apply(this, arguments);
          };
          addMessage = function _addMessage2(_x13, _x14) {
            return _addMessage.apply(this, arguments);
          };
          _syncMessages = function _syncMessages3() {
            _syncMessages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(chatChannel, messageTable) {
              var displayed, ele, ele2, messages, stored, _iterator, _step, m;
              return _regenerator["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    displayed = {};
                    for (ele = messageTable.firstChild; ele; ele = ele.nextSibling) {
                      if (ele.AJAR_subject) {
                        displayed[ele.AJAR_subject.uri] = true;
                      }
                    }
                    messages = _solidLogic.store.each(chatChannel, ns.wf('message'), null, messageTable.chatDocument);
                    stored = {};
                    _iterator = _createForOfIteratorHelper(messages);
                    _context2.prev = 5;
                    _iterator.s();
                  case 7:
                    if ((_step = _iterator.n()).done) {
                      _context2.next = 15;
                      break;
                    }
                    m = _step.value;
                    stored[m.uri] = true;
                    if (displayed[m.uri]) {
                      _context2.next = 13;
                      break;
                    }
                    _context2.next = 13;
                    return addMessage(m, messageTable);
                  case 13:
                    _context2.next = 7;
                    break;
                  case 15:
                    _context2.next = 20;
                    break;
                  case 17:
                    _context2.prev = 17;
                    _context2.t0 = _context2["catch"](5);
                    _iterator.e(_context2.t0);
                  case 20:
                    _context2.prev = 20;
                    _iterator.f();
                    return _context2.finish(20);
                  case 23:
                    // eslint-disable-next-line space-in-parens
                    for (ele = messageTable.firstChild; ele;) {
                      ele2 = ele.nextSibling;
                      if (ele.AJAR_subject && !stored[ele.AJAR_subject.uri]) {
                        messageTable.removeChild(ele);
                      }
                      ele = ele2;
                    }
                    for (ele = messageTable.firstChild; ele; ele = ele.nextSibling) {
                      if (ele.AJAR_subject) {
                        // Refresh thumbs up etc
                        widgets.refreshTree(ele); // Things inside may have changed too
                      }
                    }
                  case 25:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2, null, [[5, 17, 20, 23]]);
            }));
            return _syncMessages.apply(this, arguments);
          };
          syncMessages = function _syncMessages2(_x11, _x12) {
            return _syncMessages.apply(this, arguments);
          }; // ///////////////////////////////////////////////////////////////////////
          // syncMessages
          // Called once per original message displayed
          /* Add a new messageTable at the top/bottom
            */
          /* Remove message tables earlier than this one
           */
          /* Load and render message table
           ** @returns DOM element generates
           */
          // renderMessageTable
          /*
          function messageCount () {
            var n = 0
            const tables = div.children
            for (let i = 0; i < tables.length; i++) {
              n += tables[i].children.length - 1
              // debug.log('    table length:' + tables[i].children.length)
            }
            return n
          }
          */
          /* Add the live message block with entry field for today
           */
          // Body of main function
          options = options || {};
          options.authorDateOnLeft = false; // @@ make a user optiosn
          newestFirst = options.newestFirst === '1' || options.newestFirst === true; // hack for now
          channelObject = new _chatLogic.ChatChannel(chatChannel, options);
          dateFolder = channelObject.dateFolder;
          div = dom.createElement('div');
          channelObject.div = div;
          statusArea = div.appendChild(dom.createElement('div'));
          userContext = {
            dom: dom,
            statusArea: statusArea,
            div: statusArea
          }; // logged on state, pointers to user's stuff
          earliest = {
            messageTable: null
          }; // Stuff about each end of the loaded days
          latest = {
            messageTable: null
          };
          if (options.thread) {
            thread = options.thread;
            threadRootMessage = _solidLogic.store.any(null, ns.sioc('has_reply'), thread, thread.doc());
            if (threadRootMessage) {
              threadTime = _solidLogic.store.any(threadRootMessage, ns.dct('created'), null, threadRootMessage.doc());
              if (threadTime) {
                earliest.limit = new Date(threadTime.value);
                // debug.log(' infinite: thread start at ' + earliest.limit)
              }
            }
          }
          lock = false;
          _context15.next = 34;
          return loadInitialContent();
        case 34:
          return _context15.abrupt("return", div);
        case 35:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return _infiniteMessageArea.apply(this, arguments);
}
//# sourceMappingURL=infinite.js.map