"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIfNotExists = createIfNotExists;
exports.desktopNotification = desktopNotification;
exports.infiniteMessageArea = infiniteMessageArea;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _index = require("../authn/index");

var debug = _interopRequireWildcard(require("../debug"));

var _iconBase = require("../iconBase");

var _logic = require("../logic");

var _index2 = require("../media/index");

var ns = _interopRequireWildcard(require("../ns"));

var pad = _interopRequireWildcard(require("../pad"));

var _dateFolder = require("./dateFolder");

var _message = require("./message");

var _bookmarks = require("./bookmarks");

var $rdf = _interopRequireWildcard(require("rdflib"));

var style = _interopRequireWildcard(require("../style"));

var utils = _interopRequireWildcard(require("../utils"));

var widgets = _interopRequireWildcard(require("../widgets"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var UI = {
  authn: _index.authn,
  icons: _iconBase.icons,
  ns: ns,
  media: _index2.media,
  pad: pad,
  $rdf: $rdf,
  store: _logic.store,
  style: style,
  utils: utils,
  widgets: widgets
};
/* global alert */

var SERVER_MKDIRP_BUG = true;

function createIfNotExists(_x) {
  return _createIfNotExists.apply(this, arguments);
}

function _createIfNotExists() {
  _createIfNotExists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(doc) {
    var contentType,
        data,
        fetcher,
        response,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            contentType = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'text/turtle';
            data = _args.length > 2 && _args[2] !== undefined ? _args[2] : '';
            fetcher = UI.store.fetcher;
            _context.prev = 3;
            _context.next = 6;
            return fetcher.load(doc);

          case 6:
            response = _context.sent;
            _context.next = 29;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](3);

            if (!(_context.t0.response.status === 404)) {
              _context.next = 27;
              break;
            }

            debug.log('createIfNotExists: doc does NOT exist, will create... ' + doc);
            _context.prev = 13;
            _context.next = 16;
            return fetcher.webOperation('PUT', doc.uri, {
              data: data,
              contentType: contentType
            });

          case 16:
            response = _context.sent;
            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t1 = _context["catch"](13);
            debug.log('createIfNotExists doc FAILED: ' + doc + ': ' + _context.t1);
            throw _context.t1;

          case 23:
            delete fetcher.requested[doc.uri]; // delete cached 404 error
            // debug.log('createIfNotExists doc created ok ' + doc)

            return _context.abrupt("return", response);

          case 27:
            debug.log('createIfNotExists doc load error NOT 404:  ' + doc + ': ' + _context.t0);
            throw _context.t0;

          case 29:
            return _context.abrupt("return", response);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 9], [13, 19]]);
  }));
  return _createIfNotExists.apply(this, arguments);
}

function desktopNotification(str) {
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    debug.warn('This browser does not support desktop notification');
  } else if (Notification.permission === 'granted') {
    // Let's check whether notification permissions have already been granted
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
  } // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.

}
/**
 * Common code for a chat (discussion area of messages about something)
 * This version runs over a series of files for different time periods
 *
 * Parameters for the whole chat like its title are stored on
 * index.ttl#this and the chats messages are stored in YYYY/MM/DD/chat.ttl
 */


function infiniteMessageArea(_x2, _x3, _x4, _x5) {
  return _infiniteMessageArea.apply(this, arguments);
}

function _infiniteMessageArea() {
  _infiniteMessageArea = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(dom, kb, chatChannel, options) {
    var ns, WF, DCT, newestFirst, dateFolder, messageBodyStyle, div, menuButton, statusArea, userContext, me, updater, newMessageForm, syncMessages, addMessage, insertPreviousMessages, _insertPreviousMessages, removePreviousMessages, createMessageTable, _createMessageTable, renderMessageTable, addNewTableIfNewDay, _addNewTableIfNewDay, appendCurrentMessages, _appendCurrentMessages, liveMessageTable, earliest, latest, lock, loadMoreWhereNeeded, _loadMoreWhereNeeded, loadInitialContent, _loadInitialContent;

    return _regenerator["default"].wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            _loadInitialContent = function _loadInitialContent3() {
              _loadInitialContent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
                var yank, fixScroll, live, selectedDocument, now, todayDocument, selectedMessageTable, selectedDate;
                return _regenerator["default"].wrap(function _callee16$(_context16) {
                  while (1) {
                    switch (_context16.prev = _context16.next) {
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
                          selectedMessageTable.selectedElement.scrollIntoView({
                            block: 'center'
                          });
                        };

                        if (options.selectedMessage) {
                          selectedDocument = options.selectedMessage.doc();
                          now = new Date();
                          todayDocument = dateFolder.leafDocumentFromDate(now);
                          live = todayDocument.sameTerm(selectedDocument);
                        }

                        if (!(options.selectedMessage && !live)) {
                          _context16.next = 15;
                          break;
                        }

                        selectedDate = dateFolder.dateFromLeafDocument(selectedDocument);
                        _context16.next = 7;
                        return createMessageTable(selectedDate, live);

                      case 7:
                        selectedMessageTable = _context16.sent;
                        div.appendChild(selectedMessageTable);
                        earliest.messageTable = selectedMessageTable;
                        latest.messageTable = selectedMessageTable;
                        yank();
                        setTimeout(yank, 1000); // @@ kludge - restore position distubed by other cHANGES

                        _context16.next = 19;
                        break;

                      case 15:
                        _context16.next = 17;
                        return appendCurrentMessages();

                      case 17:
                        earliest.messageTable = liveMessageTable;
                        latest.messageTable = liveMessageTable;

                      case 19:
                        _context16.next = 21;
                        return loadMoreWhereNeeded(null, fixScroll);

                      case 21:
                        div.addEventListener('scroll', loadMoreWhereNeeded);

                        if (options.solo) {
                          document.body.addEventListener('scroll', loadMoreWhereNeeded);
                        }

                      case 23:
                      case "end":
                        return _context16.stop();
                    }
                  }
                }, _callee16);
              }));
              return _loadInitialContent.apply(this, arguments);
            };

            loadInitialContent = function _loadInitialContent2() {
              return _loadInitialContent.apply(this, arguments);
            };

            _loadMoreWhereNeeded = function _loadMoreWhereNeeded3() {
              _loadMoreWhereNeeded = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(event, fixScroll) {
                var freeze, magicZone, done, scrollBottom, scrollTop;
                return _regenerator["default"].wrap(function _callee15$(_context15) {
                  while (1) {
                    switch (_context15.prev = _context15.next) {
                      case 0:
                        if (!lock) {
                          _context15.next = 2;
                          break;
                        }

                        return _context15.abrupt("return");

                      case 2:
                        lock = true;
                        freeze = !fixScroll;
                        magicZone = 150; // const top = div.scrollTop
                        // const bottom = div.scrollHeight - top - div.clientHeight

                      case 5:
                        if (!(div.scrollTop < magicZone && earliest.messageTable && !earliest.messageTable.initial && earliest.messageTable.extendBackwards)) {
                          _context15.next = 21;
                          break;
                        }

                        if (!(div.scrollHeight === 0)) {
                          _context15.next = 10;
                          break;
                        }

                        // console.log('    chat/loadMoreWhereNeeded: trying later...')
                        setTimeout(loadMoreWhereNeeded, 2000); // couple be less

                        lock = false;
                        return _context15.abrupt("return");

                      case 10:
                        // console.log('    chat/loadMoreWhereNeeded: Going now')
                        scrollBottom = div.scrollHeight - div.scrollTop;
                        debug.log('infinite scroll: adding above: top ' + div.scrollTop);
                        _context15.next = 14;
                        return earliest.messageTable.extendBackwards();

                      case 14:
                        done = _context15.sent;

                        if (freeze) {
                          div.scrollTop = div.scrollHeight - scrollBottom;
                        }

                        if (fixScroll) fixScroll();

                        if (!done) {
                          _context15.next = 19;
                          break;
                        }

                        return _context15.abrupt("break", 21);

                      case 19:
                        _context15.next = 5;
                        break;

                      case 21:
                        if (!(options.selectedMessage && // we started in the middle not at the bottom
                        div.scrollHeight - div.scrollTop - div.clientHeight < magicZone && // we are scrolled right to the bottom
                        latest.messageTable && !latest.messageTable["final"] && // there is more data to come
                        latest.messageTable.extendForwards)) {
                          _context15.next = 33;
                          break;
                        }

                        scrollTop = div.scrollTop;
                        debug.log('infinite scroll: adding below: bottom: ' + (div.scrollHeight - div.scrollTop - div.clientHeight));
                        _context15.next = 26;
                        return latest.messageTable.extendForwards();

                      case 26:
                        done = _context15.sent;

                        // then add more data on the bottom
                        if (freeze) {
                          div.scrollTop = scrollTop; // while adding below keep same things in view
                        }

                        if (fixScroll) fixScroll();

                        if (!done) {
                          _context15.next = 31;
                          break;
                        }

                        return _context15.abrupt("break", 33);

                      case 31:
                        _context15.next = 21;
                        break;

                      case 33:
                        lock = false;

                      case 34:
                      case "end":
                        return _context15.stop();
                    }
                  }
                }, _callee15);
              }));
              return _loadMoreWhereNeeded.apply(this, arguments);
            };

            loadMoreWhereNeeded = function _loadMoreWhereNeeded2(_x18, _x19) {
              return _loadMoreWhereNeeded.apply(this, arguments);
            };

            _appendCurrentMessages = function _appendCurrentMessage2() {
              _appendCurrentMessages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14() {
                var now, chatDocument, messageTable;
                return _regenerator["default"].wrap(function _callee14$(_context14) {
                  while (1) {
                    switch (_context14.prev = _context14.next) {
                      case 0:
                        now = new Date();
                        chatDocument = dateFolder.leafDocumentFromDate(now);
                        /*   Don't actually make the documemnt until a message is sent  @@@@@ WHEN SERVER FIXED
                         * currently server won't patch to a file ina non-existent directory
                         */

                        /*
                        if (SERVER_MKDIRP_BUG) {
                          try {
                            await createIfNotExists(chatDocument)
                          } catch (e) {
                            div.appendChild(UI.widgets.errorMessageBlock(
                              dom, 'Problem accessing chat file: ' + e))
                            return
                          }
                        }
                        */
                        /// ///////////////////////////////////////////////////////////

                        _context14.next = 4;
                        return createMessageTable(now, true);

                      case 4:
                        messageTable = _context14.sent;
                        div.appendChild(messageTable);

                        div.refresh = function () {
                          // only the last messageTable is live
                          addNewTableIfNewDay(new Date()).then(function () {
                            syncMessages(chatChannel, messageTable);
                            desktopNotification(chatChannel);
                          });
                        }; // The short chat version fors live update in the pane but we do it in the widget


                        kb.updater.addDownstreamChangeListener(chatDocument, div.refresh); // Live update

                        liveMessageTable = messageTable;
                        latest.messageTable = liveMessageTable;
                        return _context14.abrupt("return", messageTable);

                      case 11:
                      case "end":
                        return _context14.stop();
                    }
                  }
                }, _callee14);
              }));
              return _appendCurrentMessages.apply(this, arguments);
            };

            appendCurrentMessages = function _appendCurrentMessage() {
              return _appendCurrentMessages.apply(this, arguments);
            };

            _addNewTableIfNewDay = function _addNewTableIfNewDay3() {
              _addNewTableIfNewDay = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(now) {
                var newChatDocument, oldChatDocument, sts;
                return _regenerator["default"].wrap(function _callee13$(_context13) {
                  while (1) {
                    switch (_context13.prev = _context13.next) {
                      case 0:
                        // let now = new Date()
                        // @@ Remove listener from previous table as it is now static
                        newChatDocument = dateFolder.leafDocumentFromDate(now);

                        if (newChatDocument.sameTerm(latest.messageTable.chatDocument)) {
                          _context13.next = 7;
                          break;
                        }

                        // It is a new day
                        if (liveMessageTable.inputRow) {
                          liveMessageTable.removeChild(liveMessageTable.inputRow);
                          delete liveMessageTable.inputRow;
                        }

                        oldChatDocument = latest.messageTable.chatDocument;
                        _context13.next = 6;
                        return appendCurrentMessages();

                      case 6:
                        // Adding a link in the document will ping listeners to add the new block too
                        if (!kb.holds(oldChatDocument, ns.rdfs('seeAlso'), newChatDocument, oldChatDocument)) {
                          sts = [$rdf.st(oldChatDocument, ns.rdfs('seeAlso'), newChatDocument, oldChatDocument)];
                          updater.update([], sts, function (ok, body) {
                            if (!ok) {
                              alert('Unable to link old message block to new one.' + body);
                            }
                          });
                        }

                      case 7:
                      case "end":
                        return _context13.stop();
                    }
                  }
                }, _callee13);
              }));
              return _addNewTableIfNewDay.apply(this, arguments);
            };

            addNewTableIfNewDay = function _addNewTableIfNewDay2(_x17) {
              return _addNewTableIfNewDay.apply(this, arguments);
            };

            renderMessageTable = function _renderMessageTable(date, live) {
              var scrollBackButton;
              var scrollForwardButton; /// /////////////////   Scroll down adding more above

              function extendBackwards() {
                return _extendBackwards.apply(this, arguments);
              }

              function _extendBackwards() {
                _extendBackwards = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
                  var done;
                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return insertPreviousMessages(true);

                        case 2:
                          done = _context7.sent;

                          if (done) {
                            if (scrollBackButton) {
                              scrollBackButton.firstChild.setAttribute('src', UI.icons.iconBase + 'noun_T-Block_1114655_000000.svg'); // T

                              scrollBackButton.disabled = true;
                            }

                            messageTable.initial = true;
                          } else {
                            messageTable.extendedBack = true;
                          }

                          setScrollBackButtonIcon();
                          return _context7.abrupt("return", done);

                        case 6:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }));
                return _extendBackwards.apply(this, arguments);
              }

              function setScrollBackButtonIcon() {
                if (!scrollBackButton) {
                  return;
                }

                var sense = messageTable.extendedBack ? !newestFirst : newestFirst;
                var scrollBackIcon = messageTable.initial ? 'noun_T-Block_1114655_000000.svg' : getScrollbackIcon(sense);
                scrollBackButton.firstChild.setAttribute('src', UI.icons.iconBase + scrollBackIcon);

                function getScrollbackIcon(sense) {
                  return sense ? 'noun_1369241.svg' : 'noun_1369237.svg';
                }
              }

              function scrollBackButtonHandler(_x15) {
                return _scrollBackButtonHandler.apply(this, arguments);
              } /// ////////////// Scroll up adding more below


              function _scrollBackButtonHandler() {
                _scrollBackButtonHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(_event) {
                  return _regenerator["default"].wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          if (!messageTable.extendedBack) {
                            _context8.next = 6;
                            break;
                          }

                          removePreviousMessages(true, messageTable);
                          messageTable.extendedBack = false;
                          setScrollBackButtonIcon();
                          _context8.next = 8;
                          break;

                        case 6:
                          _context8.next = 8;
                          return extendBackwards();

                        case 8:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                }));
                return _scrollBackButtonHandler.apply(this, arguments);
              }

              function extendForwards() {
                return _extendForwards.apply(this, arguments);
              }

              function _extendForwards() {
                _extendForwards = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
                  var done;
                  return _regenerator["default"].wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          _context9.next = 2;
                          return insertPreviousMessages(false);

                        case 2:
                          done = _context9.sent;

                          if (done) {
                            scrollForwardButton.firstChild.setAttribute('src', UI.icons.iconBase + 'noun_T-Block_1114655_000000.svg');
                            scrollForwardButton.disabled = true;
                            messageTable["final"] = true;
                          } else {
                            messageTable.extendedForwards = true;
                          }

                          setScrollForwardButtonIcon();
                          return _context9.abrupt("return", done);

                        case 6:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                }));
                return _extendForwards.apply(this, arguments);
              }

              function setScrollForwardButtonIcon() {
                var sense = messageTable.extendedForwards ? !newestFirst : newestFirst; // noun_T-Block_1114657_000000.svg

                var scrollForwardIcon = messageTable["final"] ? 'noun_T-Block_1114657_000000.svg' : getScrollForwardButtonIcon(sense);
                scrollForwardButton.firstChild.setAttribute('src', UI.icons.iconBase + scrollForwardIcon);

                function getScrollForwardButtonIcon(sense) {
                  return !sense ? 'noun_1369241.svg' : 'noun_1369237.svg';
                }
              }

              function scrollForwardButtonHandler(_x16) {
                return _scrollForwardButtonHandler.apply(this, arguments);
              } /// ///////////////////////


              function _scrollForwardButtonHandler() {
                _scrollForwardButtonHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(_event) {
                  return _regenerator["default"].wrap(function _callee10$(_context10) {
                    while (1) {
                      switch (_context10.prev = _context10.next) {
                        case 0:
                          if (!messageTable.extendedForwards) {
                            _context10.next = 6;
                            break;
                          }

                          removePreviousMessages(false, messageTable);
                          messageTable.extendedForwards = false;
                          setScrollForwardButtonIcon();
                          _context10.next = 9;
                          break;

                        case 6:
                          _context10.next = 8;
                          return extendForwards();

                        case 8:
                          // async
                          latest.messageTable.scrollIntoView(newestFirst);

                        case 9:
                        case "end":
                          return _context10.stop();
                      }
                    }
                  }, _callee10);
                }));
                return _scrollForwardButtonHandler.apply(this, arguments);
              }

              var messageTable = dom.createElement('table');
              messageTable.extendBackwards = extendBackwards; // Make function available to scroll stuff

              messageTable.extendForwards = extendForwards; // Make function available to scroll stuff

              messageTable.date = date;
              var chatDocument = dateFolder.leafDocumentFromDate(date);
              messageTable.chatDocument = chatDocument;
              messageTable.fresh = false;
              messageTable.setAttribute('style', 'width: 100%;'); // fill that div!

              if (live) {
                messageTable["final"] = true;
                liveMessageTable = messageTable;
                latest.messageTable = messageTable;
                var tr = newMessageForm(messageTable);

                if (newestFirst) {
                  messageTable.insertBefore(tr, messageTable.firstChild); // If newestFirst
                } else {
                  messageTable.appendChild(tr); // not newestFirst
                }

                messageTable.inputRow = tr;
              } /// ///// Infinite scroll
              //
              // @@ listen for swipe past end event not just button


              if (options.infinite) {
                var scrollBackButtonTR = dom.createElement('tr');
                var scrollBackButtonCell = scrollBackButtonTR.appendChild(dom.createElement('td')); // up traingles: noun_1369237.svg
                // down triangles: noun_1369241.svg

                var scrollBackIcon = newestFirst ? 'noun_1369241.svg' : 'noun_1369237.svg'; // down and up arrows respoctively

                scrollBackButton = UI.widgets.button(dom, UI.icons.iconBase + scrollBackIcon, 'Previous messages ...');
                scrollBackButtonCell.style = 'width:3em; height:3em;';
                scrollBackButton.addEventListener('click', scrollBackButtonHandler, false);
                messageTable.extendedBack = false;
                scrollBackButtonCell.appendChild(scrollBackButton);
                setScrollBackButtonIcon();
                var dateCell = scrollBackButtonTR.appendChild(dom.createElement('td'));
                dateCell.style = 'text-align: center; vertical-align: middle; color: #888; font-style: italic;';
                dateCell.textContent = UI.widgets.shortDate(date.toISOString(), true); // no time, only date
                // @@@@@@@@@@@ todo move this button to other end of  message cell, o

                var scrollForwardButtonCell = scrollBackButtonTR.appendChild(dom.createElement('td'));
                var scrollForwardIcon = newestFirst ? 'noun_1369241.svg' : 'noun_1369237.svg'; // down and up arrows respoctively

                scrollForwardButton = UI.widgets.button(dom, UI.icons.iconBase + scrollForwardIcon, 'Later messages ...');
                scrollForwardButtonCell.appendChild(scrollForwardButton);
                scrollForwardButtonCell.style = 'width:3em; height:3em;';
                scrollForwardButton.addEventListener('click', scrollForwardButtonHandler, false);
                messageTable.extendedForward = false;
                setScrollForwardButtonIcon();
                messageTable.extendedForwards = false;

                if (!newestFirst) {
                  // opposite end from the entry field
                  messageTable.insertBefore(scrollBackButtonTR, messageTable.firstChild); // If not newestFirst
                } else {
                  messageTable.appendChild(scrollBackButtonTR); //  newestFirst
                }
              }

              var sts = kb.statementsMatching(null, WF('message'), null, chatDocument);

              if (!live && sts.length === 0) {// not todays
                // no need buttomns at the moment
                // messageTable.style.visibility = 'collapse' // Hide files with no messages
              }

              sts.forEach(function (st) {
                addMessage(st.object, messageTable);
              });
              messageTable.fresh = true; // loadMessageTable(messageTable, chatDocument)

              messageTable.fresh = false;
              return messageTable;
            };

            _createMessageTable = function _createMessageTable3() {
              _createMessageTable = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(date, live) {
                var chatDocument, messageTable, statusTR;
                return _regenerator["default"].wrap(function _callee12$(_context12) {
                  while (1) {
                    switch (_context12.prev = _context12.next) {
                      case 0:
                        debug.log('   createMessageTable for  ' + date);
                        chatDocument = dateFolder.leafDocumentFromDate(date);
                        _context12.prev = 2;
                        _context12.next = 5;
                        return kb.fetcher.load(chatDocument);

                      case 5:
                        _context12.next = 19;
                        break;

                      case 7:
                        _context12.prev = 7;
                        _context12.t0 = _context12["catch"](2);
                        messageTable = dom.createElement('table');
                        statusTR = messageTable.appendChild(dom.createElement('tr')); // ### find status in exception

                        if (!(_context12.t0.response && _context12.t0.response.status && _context12.t0.response.status === 404)) {
                          _context12.next = 16;
                          break;
                        }

                        debug.log('Error 404 for chat file ' + chatDocument);
                        return _context12.abrupt("return", renderMessageTable(date, live));

                      case 16:
                        debug.log('*** Error NON 404 for chat file ' + chatDocument);
                        statusTR.appendChild(UI.widgets.errorMessageBlock(dom, _context12.t0, 'pink'));

                      case 18:
                        return _context12.abrupt("return", statusTR);

                      case 19:
                        return _context12.abrupt("return", renderMessageTable(date, live));

                      case 20:
                      case "end":
                        return _context12.stop();
                    }
                  }
                }, _callee12, null, [[2, 7]]);
              }));
              return _createMessageTable.apply(this, arguments);
            };

            createMessageTable = function _createMessageTable2(_x13, _x14) {
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
              _insertPreviousMessages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(backwards) {
                var extremity, date, live, todayDoc, doc, newMessageTable;
                return _regenerator["default"].wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
                      case 0:
                        extremity = backwards ? earliest : latest;
                        date = extremity.messageTable.date; // day in mssecs

                        _context11.next = 4;
                        return dateFolder.loadPrevious(date, backwards);

                      case 4:
                        date = _context11.sent;
                        // backwards
                        debug.log("insertPreviousMessages: from ".concat(backwards ? 'backwards' : 'forwards', " loadPrevious: ").concat(date));

                        if (!(!date && !backwards && !liveMessageTable)) {
                          _context11.next = 9;
                          break;
                        }

                        _context11.next = 9;
                        return appendCurrentMessages();

                      case 9:
                        if (date) {
                          _context11.next = 11;
                          break;
                        }

                        return _context11.abrupt("return", true);

                      case 11:
                        // done
                        live = false;

                        if (!backwards) {
                          todayDoc = dateFolder.leafDocumentFromDate(new Date());
                          doc = dateFolder.leafDocumentFromDate(date);
                          live = doc.sameTerm(todayDoc); // Is this todays?
                        }

                        _context11.next = 15;
                        return createMessageTable(date, live);

                      case 15:
                        newMessageTable = _context11.sent;
                        extremity.messageTable = newMessageTable; // move pointer to earliest

                        if (backwards ? newestFirst : !newestFirst) {
                          // put on bottom or top
                          div.appendChild(newMessageTable);
                        } else {
                          // put on top as we scroll back
                          div.insertBefore(newMessageTable, div.firstChild);
                        }

                        return _context11.abrupt("return", live);

                      case 19:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              }));
              return _insertPreviousMessages.apply(this, arguments);
            };

            insertPreviousMessages = function _insertPreviousMessag(_x12) {
              return _insertPreviousMessages.apply(this, arguments);
            };

            addMessage = function _addMessage(message, messageTable) {
              var bindings = {
                '?msg': message,
                '?creator': kb.any(message, ns.foaf('maker')),
                '?date': kb.any(message, DCT('created')),
                '?content': kb.any(message, ns.sioc('content'))
              };
              (0, _message.renderMessage)(messageTable, bindings, messageTable.fresh, options, userContext); // fresh from elsewhere
            };

            syncMessages = function _syncMessages(about, messageTable) {
              var displayed = {};
              var ele, ele2;

              for (ele = messageTable.firstChild; ele; ele = ele.nextSibling) {
                if (ele.AJAR_subject) {
                  displayed[ele.AJAR_subject.uri] = true;
                }
              }

              var messages = kb.statementsMatching(about, ns.wf('message'), null, messageTable.chatDocument).map(function (st) {
                return st.object;
              });
              var stored = {};
              messages.forEach(function (m) {
                stored[m.uri] = true;

                if (!displayed[m.uri]) {
                  addMessage(m, messageTable);
                }
              }); // eslint-disable-next-line space-in-parens

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
                  UI.widgets.refreshTree(ele); // Things inside may have changed too
                }
              }
            };

            newMessageForm = function _newMessageForm(messageTable) {
              var form = dom.createElement('tr');
              var lhs = dom.createElement('td');
              var middle = dom.createElement('td');
              var rhs = dom.createElement('td');
              form.appendChild(lhs);
              form.appendChild(middle);
              form.appendChild(rhs);
              form.AJAR_date = '9999-01-01T00:00:00Z'; // ISO format for field sort

              var field, sendButton;

              function sendMessage(_x6) {
                return _sendMessage.apply(this, arguments);
              } // sendMessage


              function _sendMessage() {
                _sendMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(text) {
                  var now, sts, timestamp, dateStamp, chatDocument, message, content, sendComplete;
                  return _regenerator["default"].wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          sendComplete = function _sendComplete() {
                            var bindings = {
                              '?msg': message,
                              '?content': content,
                              '?date': dateStamp,
                              '?creator': me
                            };
                            (0, _message.renderMessage)(liveMessageTable, bindings, false, options, userContext); // not green

                            if (!text) {
                              field.value = ''; // clear from out for reuse

                              field.setAttribute('style', messageBodyStyle);
                              field.disabled = false;
                              field.scrollIntoView(newestFirst); // allign bottom (top)

                              field.focus(); // Start typing next line immediately

                              field.select();
                            }
                          };

                          now = new Date();
                          _context6.next = 4;
                          return addNewTableIfNewDay(now);

                        case 4:
                          if (!text) {
                            field.setAttribute('style', messageBodyStyle + 'color: #bbb;'); // pendingedit

                            field.disabled = true;
                          }

                          sts = [];
                          timestamp = '' + now.getTime();
                          dateStamp = $rdf.term(now);
                          chatDocument = dateFolder.leafDocumentFromDate(now);
                          message = kb.sym(chatDocument.uri + '#' + 'Msg' + timestamp);
                          content = kb.literal(text || field.value); // if (text) field.value = text  No - don't destroy half-finsihed user input

                          sts.push(new $rdf.Statement(chatChannel, ns.wf('message'), message, chatDocument));
                          sts.push(new $rdf.Statement(message, ns.sioc('content'), content, chatDocument));
                          sts.push(new $rdf.Statement(message, DCT('created'), dateStamp, chatDocument));

                          if (me) {
                            sts.push(new $rdf.Statement(message, ns.foaf('maker'), me, chatDocument));
                          }

                          if (!(SERVER_MKDIRP_BUG && (kb.fetcher.requested[chatDocument.uri] === undefined || kb.fetcher.requested[chatDocument.uri] === 404))) {
                            _context6.next = 19;
                            break;
                          }

                          debug.log('@@@ SERVER_MKDIRP_BUG: Should only happen once: create chat file: ' + chatDocument);
                          _context6.next = 19;
                          return createIfNotExists(chatDocument);

                        case 19:
                          _context6.prev = 19;
                          _context6.next = 22;
                          return updater.update([], sts);

                        case 22:
                          _context6.next = 28;
                          break;

                        case 24:
                          _context6.prev = 24;
                          _context6.t0 = _context6["catch"](19);
                          form.appendChild(UI.widgets.errorMessageBlock(dom, 'Error writing message: ' + _context6.t0));
                          return _context6.abrupt("return");

                        case 28:
                          sendComplete();

                        case 29:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6, null, [[19, 24]]);
                }));
                return _sendMessage.apply(this, arguments);
              }

              form.appendChild(dom.createElement('br')); //    DRAG AND DROP

              function droppedFileHandler(files) {
                var base = messageTable.chatDocument.dir().uri;
                UI.widgets.uploadFiles(kb.fetcher, files, base + 'Files', base + 'Pictures', /*#__PURE__*/function () {
                  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(theFile, destURI) {
                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.next = 2;
                            return sendMessage(destURI);

                          case 2:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x7, _x8) {
                    return _ref.apply(this, arguments);
                  };
                }());
              } // When a set of URIs are dropped on the field


              var droppedURIHandler = /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(uris) {
                  var _iterator, _step, uri;

                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
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
                    }
                  }, _callee3, null, [[1, 11, 14, 17]]);
                }));

                return function droppedURIHandler(_x9) {
                  return _ref2.apply(this, arguments);
                };
              }(); // When we are actually logged on


              function turnOnInput() {
                if (options.menuHandler && menuButton) {
                  var menuOptions = {
                    me: me,
                    dom: dom,
                    div: div,
                    newBase: messageTable.chatDocument.dir().uri
                  };
                  menuButton.addEventListener('click', function (event) {
                    options.menuHandler(event, chatChannel, menuOptions);
                  }, false);
                } // Turn on message input


                (0, _message.creatorAndDate)(lhs, me, '', null);
                field = dom.createElement('textarea');
                middle.innerHTML = '';
                middle.appendChild(field);
                field.rows = 3; // field.cols = 40

                field.setAttribute('style', messageBodyStyle + 'background-color: #eef;'); // Trap the Enter BEFORE it is used ti make a newline

                field.addEventListener('keydown', /*#__PURE__*/function () {
                  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(e) {
                    return _regenerator["default"].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            if (!(e.keyCode === 13)) {
                              _context4.next = 4;
                              break;
                            }

                            if (e.altKey) {
                              _context4.next = 4;
                              break;
                            }

                            _context4.next = 4;
                            return sendMessage();

                          case 4:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x10) {
                    return _ref3.apply(this, arguments);
                  };
                }(), false);
                UI.widgets.makeDropTarget(field, droppedURIHandler, droppedFileHandler);
                rhs.innerHTML = '';
                sendButton = UI.widgets.button(dom, UI.icons.iconBase + 'noun_383448.svg', 'Send');
                sendButton.setAttribute('style', UI.style.buttonStyle + 'float: right;');
                sendButton.addEventListener('click', function (_event) {
                  return sendMessage();
                }, false);
                rhs.appendChild(sendButton);
                var chatDocument = dateFolder.leafDocumentFromDate(new Date());
                var imageDoc;

                function getImageDoc() {
                  imageDoc = kb.sym(chatDocument.dir().uri + 'Image_' + Date.now() + '.png');
                  return imageDoc;
                }

                function tookPicture(_x11) {
                  return _tookPicture.apply(this, arguments);
                }

                function _tookPicture() {
                  _tookPicture = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(imageDoc) {
                    return _regenerator["default"].wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
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
                      }
                    }, _callee5);
                  }));
                  return _tookPicture.apply(this, arguments);
                }

                middle.appendChild(UI.media.cameraButton(dom, kb, getImageDoc, tookPicture));
                UI.pad.recordParticipation(chatChannel, chatChannel.doc()); // participation =
              } // turn on inpuut


              var context = {
                div: middle,
                dom: dom
              };
              UI.authn.logIn(context).then(function (context) {
                me = context.me;
                turnOnInput();
                Object.assign(context, userContext);
                (0, _bookmarks.findBookmarkDocument)(context).then(function (context) {
                  debug.log('Bookmark file: ' + context.bookmarkDocument);
                });
              });
              return form;
            };

            kb = kb || UI.store;
            ns = UI.ns;
            WF = $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#');
            DCT = $rdf.Namespace('http://purl.org/dc/terms/'); // const POSIX = $rdf.Namespace('http://www.w3.org/ns/posix/stat#')

            options = options || {};
            newestFirst = options.newestFirst === '1' || options.newestFirst === true; // hack for now

            dateFolder = new _dateFolder.DateFolder(chatChannel, 'chat.ttl');
            options.authorAboveContent = true; // var participation // An object tracking users use and prefs

            messageBodyStyle = UI.style.messageBodyStyle; // var messageBodyStyle = 'white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;'
            // 'font-size: 100%; margin: 0.1em 1em 0.1em 1em;  background-color: white; white-space: pre-wrap; padding: 0.1em;'

            div = dom.createElement('div');
            statusArea = div.appendChild(dom.createElement('div'));
            userContext = {
              dom: dom,
              statusArea: statusArea,
              div: statusArea
            }; // logged on state, pointers to user's stuff

            updater = UI.store.updater;
            /** Does a file exist on the web?
             * @returns {Boolean}
             */

            /*
            async function documentExists (doc) {
              try {
                await kb.fetcher.load(doc)
              } catch (err) {
                if (err.response.status === 404) {
                  return false
                } else {
                  debug.log('documentExists: doc load error NOT 404:  ' + doc + ': ' + err)
                  throw err
                }
              }
              return true
            }
            */

            /*       Form for a new message
             */

            earliest = {
              messageTable: null
            }; // Stuff about each end of the loaded days

            latest = {
              messageTable: null
            };
            lock = false;
            _context17.next = 35;
            return loadInitialContent();

          case 35:
            return _context17.abrupt("return", div);

          case 36:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17);
  }));
  return _infiniteMessageArea.apply(this, arguments);
}
//# sourceMappingURL=infinite.js.map