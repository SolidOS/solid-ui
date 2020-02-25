"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.infiniteMessageArea = infiniteMessageArea;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _dateFolder = _interopRequireDefault(require("./dateFolder"));

/**
 * Contains the [[infiniteMessageArea]] class
 * @packageDocumentation
 */

/* global alert $rdf */
// @@ trace20190428T1745
var SERVER_MKDIRP_BUG = true;
var UI = {
  authn: require('../authn/authn'),
  icons: require('../iconBase'),
  log: require('../log'),
  ns: require('../ns'),
  media: require('../media-capture'),
  pad: require('../pad'),
  rdf: require('rdflib'),
  store: require('../store'),
  style: require('../style'),
  utils: require('../utils'),
  widgets: require('../widgets')
}; // const utils = require('./utils')

var _require = require('./message'),
    renderMessage = _require.renderMessage,
    creatorAndDate = _require.creatorAndDate;

var bookmarks = require('./bookmarks'); // module.exports = module.exports || {}
// module.exports.infiniteMessageArea =


function createIfNotExists(_x) {
  return _createIfNotExists.apply(this, arguments);
}

function _createIfNotExists() {
  _createIfNotExists = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee16(doc) {
    var contentType,
        data,
        fetcher,
        response,
        _args16 = arguments;
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            contentType = _args16.length > 1 && _args16[1] !== undefined ? _args16[1] : 'text/turtle';
            data = _args16.length > 2 && _args16[2] !== undefined ? _args16[2] : '';
            fetcher = UI.store.fetcher;
            _context16.prev = 3;
            _context16.next = 6;
            return fetcher.load(doc);

          case 6:
            response = _context16.sent;
            _context16.next = 29;
            break;

          case 9:
            _context16.prev = 9;
            _context16.t0 = _context16["catch"](3);

            if (!(_context16.t0.response.status === 404)) {
              _context16.next = 27;
              break;
            }

            console.log('createIfNotExists: doc does NOT exist, will create... ' + doc);
            _context16.prev = 13;
            _context16.next = 16;
            return fetcher.webOperation('PUT', doc.uri, {
              data: data,
              contentType: contentType
            });

          case 16:
            response = _context16.sent;
            _context16.next = 23;
            break;

          case 19:
            _context16.prev = 19;
            _context16.t1 = _context16["catch"](13);
            console.log('createIfNotExists doc FAILED: ' + doc + ': ' + _context16.t1);
            throw _context16.t1;

          case 23:
            delete fetcher.requested[doc.uri]; // delete cached 404 error
            // console.log('createIfNotExists doc created ok ' + doc)

            return _context16.abrupt("return", response);

          case 27:
            console.log('createIfNotExists doc load error NOT 404:  ' + doc + ': ' + _context16.t0);
            throw _context16.t0;

          case 29:
            return _context16.abrupt("return", response);

          case 30:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, null, [[3, 9], [13, 19]]);
  }));
  return _createIfNotExists.apply(this, arguments);
}

function desktopNotification(str) {
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    console.warn('This browser does not support desktop notification');
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


function infiniteMessageArea(dom, kb, chatChannel, options) {
  kb = kb || UI.store;
  var ns = UI.ns;
  var WF = $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#');
  var DCT = $rdf.Namespace('http://purl.org/dc/terms/'); // const POSIX = $rdf.Namespace('http://www.w3.org/ns/posix/stat#')

  options = options || {};
  var newestFirst = options.newestFirst === '1' || options.newestFirst === true; // hack for now

  var dateFolder = new _dateFolder["default"](chatChannel, 'chat.ttl');
  options.authorAboveContent = true; // var participation // An object tracking users use and prefs

  var messageBodyStyle = UI.style.messageBodyStyle; // var messageBodyStyle = 'white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;'
  // 'font-size: 100%; margin: 0.1em 1em 0.1em 1em;  background-color: white; white-space: pre-wrap; padding: 0.1em;'

  var div = dom.createElement('div');
  var menuButton;
  var statusArea = div.appendChild(dom.createElement('div'));
  var userContext = {
    dom: dom,
    statusArea: statusArea,
    div: statusArea
  }; // logged on state, pointers to user's stuff

  var me;
  var updater = UI.store.updater;
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
        console.log('documentExists: doc load error NOT 404:  ' + doc + ': ' + err)
        throw err
      }
    }
    return true
  }
  */

  /*       Form for a new message
   */

  function newMessageForm(messageTable) {
    var form = dom.createElement('tr');
    var lhs = dom.createElement('td');
    var middle = dom.createElement('td');
    var rhs = dom.createElement('td');
    form.appendChild(lhs);
    form.appendChild(middle);
    form.appendChild(rhs);
    form.AJAR_date = '9999-01-01T00:00:00Z'; // ISO format for field sort

    var field, sendButton;

    function sendMessage(_x2) {
      return _sendMessage.apply(this, arguments);
    } // sendMessage


    function _sendMessage() {
      _sendMessage = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee5(text) {
        var now, sts, timestamp, dateStamp, chatDocument, message, content, sendComplete;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                sendComplete = function _ref4() {
                  var bindings = {
                    '?msg': message,
                    '?content': content,
                    '?date': dateStamp,
                    '?creator': me
                  };
                  renderMessage(liveMessageTable, bindings, false, options, userContext); // not green

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
                _context5.next = 4;
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
                  _context5.next = 19;
                  break;
                }

                console.log('@@@ SERVER_MKDIRP_BUG: Should only happen once: create chat file: ' + chatDocument);
                _context5.next = 19;
                return createIfNotExists(chatDocument);

              case 19:
                _context5.prev = 19;
                _context5.next = 22;
                return updater.update([], sts);

              case 22:
                _context5.next = 28;
                break;

              case 24:
                _context5.prev = 24;
                _context5.t0 = _context5["catch"](19);
                form.appendChild(UI.widgets.errorMessageBlock(dom, 'Error writing message: ' + _context5.t0));
                return _context5.abrupt("return");

              case 28:
                sendComplete();

              case 29:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[19, 24]]);
      }));
      return _sendMessage.apply(this, arguments);
    }

    form.appendChild(dom.createElement('br')); //    DRAG AND DROP

    function droppedFileHandler(files) {
      var base = messageTable.chatDocument.dir().uri;
      UI.widgets.uploadFiles(kb.fetcher, files, base + 'Files', base + 'Pictures',
      /*#__PURE__*/
      function () {
        var _ref = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee(theFile, destURI) {
          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return sendMessage(destURI);

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x3, _x4) {
          return _ref.apply(this, arguments);
        };
      }());
    } // When a set of URIs are dropped on the field


    var droppedURIHandler =
    /*#__PURE__*/
    function () {
      var _ref2 = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2(uris) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, uri;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context2.prev = 3;
                _iterator = uris[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context2.next = 12;
                  break;
                }

                uri = _step.value;
                _context2.next = 9;
                return sendMessage(uri);

              case 9:
                _iteratorNormalCompletion = true;
                _context2.next = 5;
                break;

              case 12:
                _context2.next = 18;
                break;

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](3);
                _didIteratorError = true;
                _iteratorError = _context2.t0;

              case 18:
                _context2.prev = 18;
                _context2.prev = 19;

                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }

              case 21:
                _context2.prev = 21;

                if (!_didIteratorError) {
                  _context2.next = 24;
                  break;
                }

                throw _iteratorError;

              case 24:
                return _context2.finish(21);

              case 25:
                return _context2.finish(18);

              case 26:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[3, 14, 18, 26], [19,, 21, 25]]);
      }));

      return function droppedURIHandler(_x5) {
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


      creatorAndDate(lhs, me, '', null);
      field = dom.createElement('textarea');
      middle.innerHTML = '';
      middle.appendChild(field);
      field.rows = 3; // field.cols = 40

      field.setAttribute('style', messageBodyStyle + 'background-color: #eef;'); // Trap the Enter BEFORE it is used ti make a newline

      field.addEventListener('keydown',
      /*#__PURE__*/
      function () {
        var _ref3 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee3(e) {
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!(e.keyCode === 13)) {
                    _context3.next = 4;
                    break;
                  }

                  if (e.altKey) {
                    _context3.next = 4;
                    break;
                  }

                  _context3.next = 4;
                  return sendMessage();

                case 4:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x6) {
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

      function tookPicture(_x7) {
        return _tookPicture.apply(this, arguments);
      }

      function _tookPicture() {
        _tookPicture = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee4(imageDoc) {
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  if (!imageDoc) {
                    _context4.next = 3;
                    break;
                  }

                  _context4.next = 3;
                  return sendMessage(imageDoc.uri);

                case 3:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
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
      bookmarks.findBookmarkDocument(context).then(function (context) {
        console.log('Bookmark file: ' + context.bookmarkDocument);
      });
    });
    return form;
  } // ///////////////////////////////////////////////////////////////////////


  function syncMessages(about, messageTable) {
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
    messages.map(function (m) {
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
  } // syncMessages


  var addMessage = function addMessage(message, messageTable) {
    var bindings = {
      '?msg': message,
      '?creator': kb.any(message, ns.foaf('maker')),
      '?date': kb.any(message, DCT('created')),
      '?content': kb.any(message, ns.sioc('content'))
    };
    renderMessage(messageTable, bindings, messageTable.fresh, options, userContext); // fresh from elsewhere
  }; // ////////

  /* Add a new messageTable at the top/bottom
   */


  function insertPreviousMessages(_x8) {
    return _insertPreviousMessages.apply(this, arguments);
  }
  /* Remove message tables earlier than this one
   */


  function _insertPreviousMessages() {
    _insertPreviousMessages = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee10(backwards) {
      var extremity, date, live, todayDoc, doc, newMessageTable;
      return _regenerator["default"].wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              extremity = backwards ? earliest : latest;
              date = extremity.messageTable.date; // day in mssecs

              _context10.next = 4;
              return dateFolder.loadPrevious(date, backwards);

            case 4:
              date = _context10.sent;
              // backwards
              console.log("insertPreviousMessages: from ".concat(backwards ? 'backwards' : 'forwards', " loadPrevious: ").concat(date));

              if (!(!date && !backwards && !liveMessageTable)) {
                _context10.next = 9;
                break;
              }

              _context10.next = 9;
              return appendCurrentMessages();

            case 9:
              if (date) {
                _context10.next = 11;
                break;
              }

              return _context10.abrupt("return", true);

            case 11:
              // done
              live = false;

              if (!backwards) {
                todayDoc = dateFolder.leafDocumentFromDate(new Date());
                doc = dateFolder.leafDocumentFromDate(date);
                live = doc.sameTerm(todayDoc); // Is this todays?
              }

              _context10.next = 15;
              return createMessageTable(date, live);

            case 15:
              newMessageTable = _context10.sent;
              extremity.messageTable = newMessageTable; // move pointer to earliest

              if (backwards ? newestFirst : !newestFirst) {
                // put on bottom or top
                div.appendChild(newMessageTable);
              } else {
                // put on top as we scroll back
                div.insertBefore(newMessageTable, div.firstChild);
              }

              return _context10.abrupt("return", live);

            case 19:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    }));
    return _insertPreviousMessages.apply(this, arguments);
  }

  function removePreviousMessages(backwards, messageTable) {
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
  }
  /* Load and render message table
   ** @returns DOM element generates
   */


  function createMessageTable(_x9, _x10) {
    return _createMessageTable.apply(this, arguments);
  }

  function _createMessageTable() {
    _createMessageTable = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee11(date, live) {
      var chatDocument, messageTable, statusTR;
      return _regenerator["default"].wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              console.log('   createMessageTable for  ' + date);
              chatDocument = dateFolder.leafDocumentFromDate(date);
              _context11.prev = 2;
              _context11.next = 5;
              return kb.fetcher.load(chatDocument);

            case 5:
              _context11.next = 19;
              break;

            case 7:
              _context11.prev = 7;
              _context11.t0 = _context11["catch"](2);
              messageTable = dom.createElement('table');
              statusTR = messageTable.appendChild(dom.createElement('tr')); // ### find status in exception

              if (!(_context11.t0.response && _context11.t0.response.status && _context11.t0.response.status === 404)) {
                _context11.next = 16;
                break;
              }

              console.log('Error 404 for chat file ' + chatDocument);
              return _context11.abrupt("return", renderMessageTable(date, live));

            case 16:
              console.log('*** Error NON 404 for chat file ' + chatDocument);
              statusTR.appendChild(UI.widgets.errorMessageBlock(dom, _context11.t0, 'pink'));

            case 18:
              return _context11.abrupt("return", statusTR);

            case 19:
              return _context11.abrupt("return", renderMessageTable(date, live));

            case 20:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, null, [[2, 7]]);
    }));
    return _createMessageTable.apply(this, arguments);
  }

  function renderMessageTable(date, live) {
    var scrollBackButton;
    var scrollForwardButton; /// /////////////////   Scroll down adding more above

    function extendBackwards() {
      return _extendBackwards.apply(this, arguments);
    }

    function _extendBackwards() {
      _extendBackwards = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee6() {
        var done;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return insertPreviousMessages(true);

              case 2:
                done = _context6.sent;

                if (done) {
                  scrollBackButton.firstChild.setAttribute('src', UI.icons.iconBase + 'noun_T-Block_1114655_000000.svg'); // T

                  scrollBackButton.disabled = true;
                  messageTable.initial = true;
                } else {
                  messageTable.extendedBack = true;
                }

                setScrollBackButtonIcon();
                return _context6.abrupt("return", done);

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));
      return _extendBackwards.apply(this, arguments);
    }

    function setScrollBackButtonIcon() {
      var sense = messageTable.extendedBack ? !newestFirst : newestFirst;
      var scrollBackIcon = messageTable.initial ? 'noun_T-Block_1114655_000000.svg' : getScrollbackIcon(sense);
      scrollBackButton.firstChild.setAttribute('src', UI.icons.iconBase + scrollBackIcon);

      function getScrollbackIcon(sense) {
        return sense ? 'noun_1369241.svg' : 'noun_1369237.svg';
      }
    }

    function scrollBackButtonHandler(_x11) {
      return _scrollBackButtonHandler.apply(this, arguments);
    } /// ////////////// Scroll up adding more below


    function _scrollBackButtonHandler() {
      _scrollBackButtonHandler = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee7(_event) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!messageTable.extendedBack) {
                  _context7.next = 6;
                  break;
                }

                removePreviousMessages(true, messageTable);
                messageTable.extendedBack = false;
                setScrollBackButtonIcon();
                _context7.next = 8;
                break;

              case 6:
                _context7.next = 8;
                return extendBackwards();

              case 8:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));
      return _scrollBackButtonHandler.apply(this, arguments);
    }

    function extendForwards() {
      return _extendForwards.apply(this, arguments);
    }

    function _extendForwards() {
      _extendForwards = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee8() {
        var done;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return insertPreviousMessages(false);

              case 2:
                done = _context8.sent;

                if (done) {
                  scrollForwardButton.firstChild.setAttribute('src', UI.icons.iconBase + 'noun_T-Block_1114655_000000.svg');
                  scrollForwardButton.disabled = true;
                  messageTable["final"] = true;
                } else {
                  messageTable.extendedForwards = true;
                }

                setScrollForwardButtonIcon();
                return _context8.abrupt("return", done);

              case 6:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
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

    function scrollForwardButtonHandler(_x12) {
      return _scrollForwardButtonHandler.apply(this, arguments);
    } /// ///////////////////////


    function _scrollForwardButtonHandler() {
      _scrollForwardButtonHandler = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee9(_event) {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!messageTable.extendedForwards) {
                  _context9.next = 6;
                  break;
                }

                removePreviousMessages(false, messageTable);
                messageTable.extendedForwards = false;
                setScrollForwardButtonIcon();
                _context9.next = 9;
                break;

              case 6:
                _context9.next = 8;
                return extendForwards();

              case 8:
                // async
                latest.messageTable.scrollIntoView(newestFirst);

              case 9:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));
      return _scrollForwardButtonHandler.apply(this, arguments);
    }

    var messageTable = dom.createElement('table');
    messageTable.extendBackwards = extendBackwards; // Make function available to scroll stuff

    messageTable.extendForwards = extendForwards; // Make function available to scroll stuff
    // var messageButton

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
  } // renderMessageTable


  function addNewTableIfNewDay(_x13) {
    return _addNewTableIfNewDay.apply(this, arguments);
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


  function _addNewTableIfNewDay() {
    _addNewTableIfNewDay = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee12(now) {
      var newChatDocument, oldChatDocument, sts;
      return _regenerator["default"].wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              // let now = new Date()
              // @@ Remove listener from previous table as it is now static
              newChatDocument = dateFolder.leafDocumentFromDate(now);

              if (newChatDocument.sameTerm(latest.messageTable.chatDocument)) {
                _context12.next = 7;
                break;
              }

              // It is a new day
              if (liveMessageTable.inputRow) {
                liveMessageTable.removeChild(liveMessageTable.inputRow);
                delete liveMessageTable.inputRow;
              }

              oldChatDocument = latest.messageTable.chatDocument;
              _context12.next = 6;
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
              return _context12.stop();
          }
        }
      }, _callee12);
    }));
    return _addNewTableIfNewDay.apply(this, arguments);
  }

  function appendCurrentMessages() {
    return _appendCurrentMessages.apply(this, arguments);
  }

  function _appendCurrentMessages() {
    _appendCurrentMessages = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee13() {
      var now, chatDocument, messageTable;
      return _regenerator["default"].wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
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

              _context13.next = 4;
              return createMessageTable(now, true);

            case 4:
              messageTable = _context13.sent;
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
              return _context13.abrupt("return", messageTable);

            case 11:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    }));
    return _appendCurrentMessages.apply(this, arguments);
  }

  var liveMessageTable;
  var earliest = {
    messageTable: null
  }; // Stuff about each end of the loaded days

  var latest = {
    messageTable: null
  };
  var lock = false;

  function loadMoreWhereNeeded(_x14, _x15) {
    return _loadMoreWhereNeeded.apply(this, arguments);
  }

  function _loadMoreWhereNeeded() {
    _loadMoreWhereNeeded = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee14(event, fixScroll) {
      var freeze, magicZone, done, scrollBottom, scrollTop;
      return _regenerator["default"].wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              if (!lock) {
                _context14.next = 2;
                break;
              }

              return _context14.abrupt("return");

            case 2:
              lock = true;
              freeze = !fixScroll;
              magicZone = 150; // const top = div.scrollTop
              // const bottom = div.scrollHeight - top - div.clientHeight

            case 5:
              if (!(div.scrollTop < magicZone && earliest.messageTable && !earliest.messageTable.initial && earliest.messageTable.extendBackwards)) {
                _context14.next = 17;
                break;
              }

              scrollBottom = div.scrollHeight - div.scrollTop;
              console.log('infinite scroll: adding above: top ' + div.scrollTop);
              _context14.next = 10;
              return earliest.messageTable.extendBackwards();

            case 10:
              done = _context14.sent;

              if (freeze) {
                div.scrollTop = div.scrollHeight - scrollBottom;
              }

              if (fixScroll) fixScroll();

              if (!done) {
                _context14.next = 15;
                break;
              }

              return _context14.abrupt("break", 17);

            case 15:
              _context14.next = 5;
              break;

            case 17:
              if (!(options.selectedMessage && // we started in the middle not at the bottom
              div.scrollHeight - div.scrollTop - div.clientHeight < magicZone && // we are scrolled right to the bottom
              latest.messageTable && !latest.messageTable["final"] && // there is more data to come
              latest.messageTable.extendForwards)) {
                _context14.next = 29;
                break;
              }

              scrollTop = div.scrollTop;
              console.log('infinite scroll: adding below: bottom: ' + (div.scrollHeight - div.scrollTop - div.clientHeight));
              _context14.next = 22;
              return latest.messageTable.extendForwards();

            case 22:
              done = _context14.sent;

              // then add more data on the bottom
              if (freeze) {
                div.scrollTop = scrollTop; // while adding below keep same things in view
              }

              if (fixScroll) fixScroll();

              if (!done) {
                _context14.next = 27;
                break;
              }

              return _context14.abrupt("break", 29);

            case 27:
              _context14.next = 17;
              break;

            case 29:
              lock = false;

            case 30:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    }));
    return _loadMoreWhereNeeded.apply(this, arguments);
  }

  function go() {
    return _go.apply(this, arguments);
  }

  function _go() {
    _go = (0, _asyncToGenerator2["default"])(
    /*#__PURE__*/
    _regenerator["default"].mark(function _callee15() {
      var yank, fixScroll, live, selectedDocument, now, todayDocument, selectedDate, selectedMessageTable;
      return _regenerator["default"].wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              fixScroll = function _ref6() {
                if (options.selectedElement) {
                  options.selectedElement.scrollIntoView({
                    block: 'center'
                  }); // allign tops or bopttoms
                } else {
                  liveMessageTable.inputRow.scrollIntoView(newestFirst); // allign tops or bopttoms
                }
              };

              yank = function _ref5() {
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
                _context15.next = 15;
                break;
              }

              selectedDate = dateFolder.dateFromLeafDocument(selectedDocument);
              _context15.next = 7;
              return createMessageTable(selectedDate, live);

            case 7:
              selectedMessageTable = _context15.sent;
              div.appendChild(selectedMessageTable);
              earliest.messageTable = selectedMessageTable;
              latest.messageTable = selectedMessageTable;
              yank();
              setTimeout(yank, 1000); // @@ kludge - restore position distubed by other cHANGES

              _context15.next = 19;
              break;

            case 15:
              _context15.next = 17;
              return appendCurrentMessages();

            case 17:
              earliest.messageTable = liveMessageTable;
              latest.messageTable = liveMessageTable;

            case 19:
              _context15.next = 21;
              return loadMoreWhereNeeded(null, fixScroll);

            case 21:
              div.addEventListener('scroll', loadMoreWhereNeeded);

              if (options.solo) {
                document.body.addEventListener('scroll', loadMoreWhereNeeded);
              }

            case 23:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    }));
    return _go.apply(this, arguments);
  }

  go();
  return div;
}
//# sourceMappingURL=infinite.js.map