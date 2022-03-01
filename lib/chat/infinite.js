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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Contains the [[infiniteMessageArea]] class
 * @packageDocumentation
 */
// import { findBookmarkDocument } from './bookmarks'
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
  } // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.

}
/**
 * Renders a chat message inside a `messageTable`
 */


function insertMessageIntoTable(channelObject, messageTable, message, fresh, options, userContext) {
  var messageRow = (0, _message.renderMessageRow)(channelObject, message, fresh, options, userContext); // const message = messageRow.AJAR_subject

  if (options.selectedMessage && options.selectedMessage.sameTerm(message)) {
    messageRow.style.backgroundColor = 'yellow';
    options.selectedElement = messageRow;
    messageTable.selectedElement = messageRow;
  }

  var done = false;

  for (var ele = messageTable.firstChild;; ele = ele.nextSibling) {
    if (!ele) {
      // empty
      break;
    }

    var newestFirst = options.newestfirst === true;
    var dateString = messageRow.AJAR_date;

    if (dateString > ele.AJAR_date && newestFirst || dateString < ele.AJAR_date && !newestFirst) {
      messageTable.insertBefore(messageRow, ele);
      done = true;
      break;
    }
  }

  if (!done) {
    messageTable.appendChild(messageRow);
  }
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


function infiniteMessageArea(_x, _x2, _x3, _x4) {
  return _infiniteMessageArea.apply(this, arguments);
}

function _infiniteMessageArea() {
  _infiniteMessageArea = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(dom, wasStore, chatChannel, options) {
    var syncMessages, addMessage, insertPreviousMessages, _insertPreviousMessages, removePreviousMessages, createMessageTable, _createMessageTable, renderMessageTable, addNewChatDocumentIfNewDay, _addNewChatDocumentIfNewDay, appendCurrentMessages, _appendCurrentMessages, loadMoreWhereNeeded, _loadMoreWhereNeeded, loadInitialContent, _loadInitialContent, newestFirst, channelObject, dateFolder, div, statusArea, userContext, liveMessageTable, earliest, latest, lock;

    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _loadInitialContent = function _loadInitialContent3() {
              _loadInitialContent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
                var yank, fixScroll, live, selectedDocument, now, todayDocument, selectedMessageTable, selectedDate;
                return _regenerator["default"].wrap(function _callee11$(_context11) {
                  while (1) {
                    switch (_context11.prev = _context11.next) {
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
                          _context11.next = 15;
                          break;
                        }

                        selectedDate = dateFolder.dateFromLeafDocument(selectedDocument);
                        _context11.next = 7;
                        return createMessageTable(selectedDate, live);

                      case 7:
                        selectedMessageTable = _context11.sent;
                        div.appendChild(selectedMessageTable);
                        earliest.messageTable = selectedMessageTable;
                        latest.messageTable = selectedMessageTable;
                        yank();
                        setTimeout(yank, 1000); // @@ kludge - restore position distubed by other cHANGES

                        _context11.next = 19;
                        break;

                      case 15:
                        _context11.next = 17;
                        return appendCurrentMessages();

                      case 17:
                        earliest.messageTable = liveMessageTable;
                        latest.messageTable = liveMessageTable;

                      case 19:
                        _context11.next = 21;
                        return loadMoreWhereNeeded(null, fixScroll);

                      case 21:
                        div.addEventListener('scroll', loadMoreWhereNeeded);

                        if (options.solo) {
                          document.body.addEventListener('scroll', loadMoreWhereNeeded);
                        }

                      case 23:
                      case "end":
                        return _context11.stop();
                    }
                  }
                }, _callee11);
              }));
              return _loadInitialContent.apply(this, arguments);
            };

            loadInitialContent = function _loadInitialContent2() {
              return _loadInitialContent.apply(this, arguments);
            };

            _loadMoreWhereNeeded = function _loadMoreWhereNeeded3() {
              _loadMoreWhereNeeded = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(event, fixScroll) {
                var freeze, magicZone, done, scrollBottom, scrollTop;
                return _regenerator["default"].wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        if (!lock) {
                          _context10.next = 2;
                          break;
                        }

                        return _context10.abrupt("return");

                      case 2:
                        lock = true;
                        freeze = !fixScroll;
                        magicZone = 150; // const top = div.scrollTop
                        // const bottom = div.scrollHeight - top - div.clientHeight

                      case 5:
                        if (!(div.scrollTop < magicZone && earliest.messageTable && !earliest.messageTable.initial && earliest.messageTable.extendBackwards)) {
                          _context10.next = 21;
                          break;
                        }

                        if (!(div.scrollHeight === 0)) {
                          _context10.next = 10;
                          break;
                        }

                        // console.log('    chat/loadMoreWhereNeeded: trying later...')
                        setTimeout(loadMoreWhereNeeded, 2000); // couple be less

                        lock = false;
                        return _context10.abrupt("return");

                      case 10:
                        // console.log('    chat/loadMoreWhereNeeded: Going now')
                        scrollBottom = div.scrollHeight - div.scrollTop;
                        debug.log('infinite scroll: adding above: top ' + div.scrollTop);
                        _context10.next = 14;
                        return earliest.messageTable.extendBackwards();

                      case 14:
                        done = _context10.sent;

                        if (freeze) {
                          div.scrollTop = div.scrollHeight - scrollBottom;
                        }

                        if (fixScroll) fixScroll();

                        if (!done) {
                          _context10.next = 19;
                          break;
                        }

                        return _context10.abrupt("break", 21);

                      case 19:
                        _context10.next = 5;
                        break;

                      case 21:
                        if (!(options.selectedMessage && // we started in the middle not at the bottom
                        div.scrollHeight - div.scrollTop - div.clientHeight < magicZone && // we are scrolled right to the bottom
                        latest.messageTable && !latest.messageTable["final"] && // there is more data to come
                        latest.messageTable.extendForwards)) {
                          _context10.next = 33;
                          break;
                        }

                        scrollTop = div.scrollTop;
                        debug.log('infinite scroll: adding below: bottom: ' + (div.scrollHeight - div.scrollTop - div.clientHeight));
                        _context10.next = 26;
                        return latest.messageTable.extendForwards();

                      case 26:
                        done = _context10.sent;

                        // then add more data on the bottom
                        if (freeze) {
                          div.scrollTop = scrollTop; // while adding below keep same things in view
                        }

                        if (fixScroll) fixScroll();

                        if (!done) {
                          _context10.next = 31;
                          break;
                        }

                        return _context10.abrupt("break", 33);

                      case 31:
                        _context10.next = 21;
                        break;

                      case 33:
                        lock = false;

                      case 34:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10);
              }));
              return _loadMoreWhereNeeded.apply(this, arguments);
            };

            loadMoreWhereNeeded = function _loadMoreWhereNeeded2(_x10, _x11) {
              return _loadMoreWhereNeeded.apply(this, arguments);
            };

            _appendCurrentMessages = function _appendCurrentMessage2() {
              _appendCurrentMessages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
                var now, chatDocument, messageTable;
                return _regenerator["default"].wrap(function _callee9$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        now = new Date();
                        chatDocument = dateFolder.leafDocumentFromDate(now); /// ///////////////////////////////////////////////////////////

                        _context9.next = 4;
                        return createMessageTable(now, true);

                      case 4:
                        messageTable = _context9.sent;
                        div.appendChild(messageTable);
                        div.refresh = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
                          return _regenerator["default"].wrap(function _callee8$(_context8) {
                            while (1) {
                              switch (_context8.prev = _context8.next) {
                                case 0:
                                  _context8.next = 2;
                                  return addNewChatDocumentIfNewDay(new Date());

                                case 2:
                                  syncMessages(chatChannel, messageTable); // @@ livemessagetable??

                                  desktopNotification(chatChannel);

                                case 4:
                                case "end":
                                  return _context8.stop();
                              }
                            }
                          }, _callee8);
                        })); // The short chat version the live update listening is done in the pane but we do it in the widget @@

                        _solidLogic.store.updater.addDownstreamChangeListener(chatDocument, div.refresh); // Live update


                        liveMessageTable = messageTable;
                        latest.messageTable = liveMessageTable;
                        return _context9.abrupt("return", messageTable);

                      case 11:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, _callee9);
              }));
              return _appendCurrentMessages.apply(this, arguments);
            };

            appendCurrentMessages = function _appendCurrentMessage() {
              return _appendCurrentMessages.apply(this, arguments);
            };

            _addNewChatDocumentIfNewDay = function _addNewChatDocumentIf2() {
              _addNewChatDocumentIfNewDay = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
                var newChatDocument, oldChatDocument, sts;
                return _regenerator["default"].wrap(function _callee7$(_context7) {
                  while (1) {
                    switch (_context7.prev = _context7.next) {
                      case 0:
                        // @@ Remove listener from previous table as it is now static
                        newChatDocument = dateFolder.leafDocumentFromDate(new Date());

                        if (newChatDocument.sameTerm(latest.messageTable.chatDocument)) {
                          _context7.next = 7;
                          break;
                        }

                        // It is a new day
                        if (liveMessageTable.inputRow) {
                          liveMessageTable.removeChild(liveMessageTable.inputRow);
                          delete liveMessageTable.inputRow;
                        }

                        oldChatDocument = latest.messageTable.chatDocument;
                        _context7.next = 6;
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
                        return _context7.stop();
                    }
                  }
                }, _callee7);
              }));
              return _addNewChatDocumentIfNewDay.apply(this, arguments);
            };

            addNewChatDocumentIfNewDay = function _addNewChatDocumentIf() {
              return _addNewChatDocumentIfNewDay.apply(this, arguments);
            };

            renderMessageTable = function _renderMessageTable(date, live) {
              var scrollBackbutton;
              var scrollForwardButton; /// /////////////////   Scroll down adding more above

              function extendBackwards() {
                return _extendBackwards.apply(this, arguments);
              }

              function _extendBackwards() {
                _extendBackwards = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                  var done;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return insertPreviousMessages(true);

                        case 2:
                          done = _context.sent;

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
                          return _context.abrupt("return", done);

                        case 6:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }));
                return _extendBackwards.apply(this, arguments);
              }

              function setScrollBackbuttonIcon() {
                if (!scrollBackbutton) {
                  return;
                }

                var sense = messageTable.extendedBack ? !newestFirst : newestFirst;
                var scrollBackIcon = messageTable.initial ? 'noun_T-Block_1114655_000000.svg' : getScrollbackIcon(sense);
                scrollBackbutton.firstChild.setAttribute('src', _iconBase.icons.iconBase + scrollBackIcon);

                function getScrollbackIcon(sense) {
                  return sense ? 'noun_1369241.svg' : 'noun_1369237.svg';
                }
              }

              function scrollBackbuttonHandler(_x8) {
                return _scrollBackbuttonHandler.apply(this, arguments);
              } /// ////////////// Scroll up adding more below


              function _scrollBackbuttonHandler() {
                _scrollBackbuttonHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_event) {
                  return _regenerator["default"].wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          if (!messageTable.extendedBack) {
                            _context2.next = 6;
                            break;
                          }

                          removePreviousMessages(true, messageTable);
                          messageTable.extendedBack = false;
                          setScrollBackbuttonIcon();
                          _context2.next = 8;
                          break;

                        case 6:
                          _context2.next = 8;
                          return extendBackwards();

                        case 8:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));
                return _scrollBackbuttonHandler.apply(this, arguments);
              }

              function extendForwards() {
                return _extendForwards.apply(this, arguments);
              }

              function _extendForwards() {
                _extendForwards = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                  var done;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return insertPreviousMessages(false);

                        case 2:
                          done = _context3.sent;

                          if (done) {
                            scrollForwardButton.firstChild.setAttribute('src', _iconBase.icons.iconBase + 'noun_T-Block_1114655_000000.svg');
                            scrollForwardButton.disabled = true;
                            messageTable["final"] = true;
                          } else {
                            messageTable.extendedForwards = true;
                          }

                          setScrollForwardButtonIcon();
                          return _context3.abrupt("return", done);

                        case 6:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));
                return _extendForwards.apply(this, arguments);
              }

              function setScrollForwardButtonIcon() {
                var sense = messageTable.extendedForwards ? !newestFirst : newestFirst; // noun_T-Block_1114657_000000.svg

                var scrollForwardIcon = messageTable["final"] ? 'noun_T-Block_1114657_000000.svg' : getScrollForwardButtonIcon(sense);
                scrollForwardButton.firstChild.setAttribute('src', _iconBase.icons.iconBase + scrollForwardIcon);

                function getScrollForwardButtonIcon(sense) {
                  return !sense ? 'noun_1369241.svg' : 'noun_1369237.svg';
                }
              }

              function scrollForwardButtonHandler(_x9) {
                return _scrollForwardButtonHandler.apply(this, arguments);
              } /// ///////////////////////

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


              function _scrollForwardButtonHandler() {
                _scrollForwardButtonHandler = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_event) {
                  return _regenerator["default"].wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          if (!messageTable.extendedForwards) {
                            _context4.next = 6;
                            break;
                          }

                          removePreviousMessages(false, messageTable);
                          messageTable.extendedForwards = false;
                          setScrollForwardButtonIcon();
                          _context4.next = 9;
                          break;

                        case 6:
                          _context4.next = 8;
                          return extendForwards();

                        case 8:
                          // async
                          latest.messageTable.scrollIntoView(newestFirst);

                        case 9:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
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
                var tr = (0, _message.renderMessageEditor)(channelObject, messageTable, userContext, options);

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
                var scrollBackbuttonTR = dom.createElement('tr');
                var scrollBackbuttonCell = scrollBackbuttonTR.appendChild(dom.createElement('td')); // up traingles: noun_1369237.svg
                // down triangles: noun_1369241.svg

                var scrollBackIcon = newestFirst ? 'noun_1369241.svg' : 'noun_1369237.svg'; // down and up arrows respoctively

                scrollBackbutton = widgets.button(dom, _iconBase.icons.iconBase + scrollBackIcon, 'Previous messages ...');
                scrollBackbuttonCell.style = 'width:3em; height:3em;';
                scrollBackbutton.addEventListener('click', scrollBackbuttonHandler, false);
                messageTable.extendedBack = false;
                scrollBackbuttonCell.appendChild(scrollBackbutton);
                setScrollBackbuttonIcon();
                var dateCell = scrollBackbuttonTR.appendChild(dom.createElement('td'));
                dateCell.style = 'text-align: center; vertical-align: middle; color: #888; font-style: italic;';
                dateCell.textContent = widgets.shortDate(date.toISOString(), true); // no time, only date
                // @@@@@@@@@@@ todo move this button to other end of  message cell, o

                var scrollForwardButtonCell = scrollBackbuttonTR.appendChild(dom.createElement('td'));
                var scrollForwardIcon = newestFirst ? 'noun_1369241.svg' : 'noun_1369237.svg'; // down and up arrows respoctively

                scrollForwardButton = widgets.button(dom, _iconBase.icons.iconBase + scrollForwardIcon, 'Later messages ...');
                scrollForwardButtonCell.appendChild(scrollForwardButton);
                scrollForwardButtonCell.style = 'width:3em; height:3em;';
                scrollForwardButton.addEventListener('click', scrollForwardButtonHandler, false);
                messageTable.extendedForward = false;
                setScrollForwardButtonIcon();
                messageTable.extendedForwards = false;

                if (!newestFirst) {
                  // opposite end from the entry field
                  messageTable.insertBefore(scrollBackbuttonTR, messageTable.firstChild); // If not newestFirst
                } else {
                  messageTable.appendChild(scrollBackbuttonTR); //  newestFirst
                }
              }

              var sts = _solidLogic.store.statementsMatching(null, ns.wf('message'), null, chatDocument);

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
              _createMessageTable = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(date, live) {
                var chatDocument, messageTable, statusTR;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        debug.log('   createMessageTable for  ' + date);
                        chatDocument = dateFolder.leafDocumentFromDate(date);
                        _context6.prev = 2;
                        _context6.next = 5;
                        return _solidLogic.store.fetcher.load(chatDocument);

                      case 5:
                        _context6.next = 19;
                        break;

                      case 7:
                        _context6.prev = 7;
                        _context6.t0 = _context6["catch"](2);
                        messageTable = dom.createElement('table');
                        statusTR = messageTable.appendChild(dom.createElement('tr')); // ### find status in exception

                        if (!(_context6.t0.response && _context6.t0.response.status && _context6.t0.response.status === 404)) {
                          _context6.next = 16;
                          break;
                        }

                        debug.log('Error 404 for chat file ' + chatDocument);
                        return _context6.abrupt("return", renderMessageTable(date, live));

                      case 16:
                        debug.log('*** Error NON 404 for chat file ' + chatDocument);
                        statusTR.appendChild(widgets.errorMessageBlock(dom, _context6.t0, 'pink'));

                      case 18:
                        return _context6.abrupt("return", statusTR);

                      case 19:
                        return _context6.abrupt("return", renderMessageTable(date, live));

                      case 20:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6, null, [[2, 7]]);
              }));
              return _createMessageTable.apply(this, arguments);
            };

            createMessageTable = function _createMessageTable2(_x6, _x7) {
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
              _insertPreviousMessages = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(backwards) {
                var extremity, date, live, todayDoc, doc, newMessageTable;
                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        extremity = backwards ? earliest : latest;
                        date = extremity.messageTable.date; // day in mssecs

                        _context5.next = 4;
                        return dateFolder.loadPrevious(date, backwards);

                      case 4:
                        date = _context5.sent;
                        // backwards
                        debug.log("insertPreviousMessages: from ".concat(backwards ? 'backwards' : 'forwards', " loadPrevious: ").concat(date));

                        if (!(!date && !backwards && !liveMessageTable)) {
                          _context5.next = 9;
                          break;
                        }

                        _context5.next = 9;
                        return appendCurrentMessages();

                      case 9:
                        if (date) {
                          _context5.next = 11;
                          break;
                        }

                        return _context5.abrupt("return", true);

                      case 11:
                        // done
                        live = false;

                        if (!backwards) {
                          todayDoc = dateFolder.leafDocumentFromDate(new Date());
                          doc = dateFolder.leafDocumentFromDate(date);
                          live = doc.sameTerm(todayDoc); // Is this todays?
                        }

                        _context5.next = 15;
                        return createMessageTable(date, live);

                      case 15:
                        newMessageTable = _context5.sent;
                        extremity.messageTable = newMessageTable; // move pointer to earliest

                        if (backwards ? newestFirst : !newestFirst) {
                          // put on bottom or top
                          div.appendChild(newMessageTable);
                        } else {
                          // put on top as we scroll back
                          div.insertBefore(newMessageTable, div.firstChild);
                        }

                        return _context5.abrupt("return", live);

                      case 19:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));
              return _insertPreviousMessages.apply(this, arguments);
            };

            insertPreviousMessages = function _insertPreviousMessag(_x5) {
              return _insertPreviousMessages.apply(this, arguments);
            };

            addMessage = function _addMessage(message, messageTable) {
              var latest = (0, _chatLogic.mostRecentVersion)(message); // const content = store.any(latest, ns.sioc('content'))

              if ((0, _chatLogic.isDeleted)(latest) && !options.showDeletedMessages) {
                return; // ignore deleted messaged -- @@ could also leave a placeholder
              }

              insertMessageIntoTable(channelObject, messageTable, message, messageTable.fresh, options, userContext); // fresh from elsewhere
            };

            syncMessages = function _syncMessages(about, messageTable) {
              var displayed = {};
              var ele, ele2;

              for (ele = messageTable.firstChild; ele; ele = ele.nextSibling) {
                if (ele.AJAR_subject) {
                  displayed[ele.AJAR_subject.uri] = true;
                }
              }

              var messages = _solidLogic.store.statementsMatching(about, ns.wf('message'), null, messageTable.chatDocument).map(function (st) {
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
                  widgets.refreshTree(ele); // Things inside may have changed too
                }
              }
            };

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
            // const messageTable = dom.createElement('table') // @@ check does this go in renderMessageTable

            earliest = {
              messageTable: null
            }; // Stuff about each end of the loaded days

            latest = {
              messageTable: null
            };
            lock = false;
            _context12.next = 30;
            return loadInitialContent();

          case 30:
            return _context12.abrupt("return", div);

          case 31:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _infiniteMessageArea.apply(this, arguments);
}
//# sourceMappingURL=infinite.js.map