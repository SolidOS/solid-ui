"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatChannel = void 0;
exports._createIfNotExists = _createIfNotExists;
exports.isDeleted = isDeleted;
exports.isHidden = isHidden;
exports.isReplaced = isReplaced;
exports.mostRecentVersion = mostRecentVersion;
exports.nick = nick;
exports.originalVersion = originalVersion;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var debug = _interopRequireWildcard(require("../debug"));

var _index = require("../authn/index");

var _dateFolder = require("./dateFolder");

var _logic = require("../logic");

var ns = _interopRequireWildcard(require("../ns"));

var $rdf = _interopRequireWildcard(require("rdflib"));

var utils = _interopRequireWildcard(require("../utils"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Contains the [[ChatChannel]] class and logic for Solid Chat
 * @packageDocumentation
 */
// pull in first avoid cross-refs

/* The Solid logic for a 'LongChat'
*/

/**
 * Common code for a chat (discussion area of messages about something)
 * This version runs over a series of files for different time periods
 *
 * Parameters for the whole chat like its title are stored on
 * index.ttl#this and the chats messages are stored in YYYY/MM/DD/chat.ttl
 *
 */
var ChatChannel = /*#__PURE__*/function () {
  function ChatChannel(channel, options) {
    (0, _classCallCheck2["default"])(this, ChatChannel);
    this.channel = channel;
    this.channelRoot = channel.doc();
    this.options = options;
    this.dateFolder = new _dateFolder.DateFolder(this.channelRoot, 'chat.ttl');
    this.div = null; // : HTMLElement
  }
  /* Store a new message in the web,
  */


  (0, _createClass2["default"])(ChatChannel, [{
    key: "createMessage",
    value: function () {
      var _createMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(text) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this.updateMessage(text));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createMessage(_x) {
        return _createMessage.apply(this, arguments);
      }

      return createMessage;
    }()
    /* Store a new message in the web,
      as a replacement for an existing one.
      The old one iis left, and the two are linked
    */

  }, {
    key: "updateMessage",
    value: function () {
      var _updateMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(text) {
        var oldMsg,
            deleteIt,
            sts,
            now,
            timestamp,
            dateStamp,
            chatDocument,
            message,
            me,
            msg,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                oldMsg = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;
                deleteIt = _args2.length > 2 ? _args2[2] : undefined;
                sts = [];
                now = new Date();
                timestamp = '' + now.getTime();
                dateStamp = $rdf.term(now);
                chatDocument = oldMsg ? oldMsg.doc() : this.dateFolder.leafDocumentFromDate(now);
                message = _logic.store.sym(chatDocument.uri + '#' + 'Msg' + timestamp); // const content = store.literal(text)

                me = _index.authn.currentUser(); // If already logged on

                if (oldMsg) {
                  // edit message replaces old one
                  sts.push($rdf.st(mostRecentVersion(oldMsg), ns.dct('isReplacedBy'), message, chatDocument));

                  if (deleteIt) {
                    sts.push($rdf.st(message, ns.schema('dateDeleted'), dateStamp, chatDocument));
                  }
                } else {
                  // link new message to channel
                  sts.push($rdf.st(this.channel, ns.wf('message'), message, chatDocument));
                }

                sts.push($rdf.st(message, ns.sioc('content'), _logic.store.literal(text), chatDocument));
                sts.push($rdf.st(message, ns.dct('created'), dateStamp, chatDocument));

                if (me) {
                  sts.push($rdf.st(message, ns.foaf('maker'), me, chatDocument));
                }

                _context2.prev = 13;
                _context2.next = 16;
                return _logic.store.updater.update([], sts);

              case 16:
                _context2.next = 24;
                break;

              case 18:
                _context2.prev = 18;
                _context2.t0 = _context2["catch"](13);
                msg = 'Error saving chat message: ' + _context2.t0;
                debug.warn(msg);
                alert(msg);
                throw new Error(msg);

              case 24:
                return _context2.abrupt("return", message);

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[13, 18]]);
      }));

      function updateMessage(_x2) {
        return _updateMessage.apply(this, arguments);
      }

      return updateMessage;
    }()
    /* Mark a message as deleted
    * Wee add a new version of the message,m witha deletion flag (deletion date)
    * so that the deletion can be revoked by adding another non-deleted update
    */

  }, {
    key: "deleteMessage",
    value: function () {
      var _deleteMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(message) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this.updateMessage('(message deleted)', message, true));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function deleteMessage(_x3) {
        return _deleteMessage.apply(this, arguments);
      }

      return deleteMessage;
    }()
  }]);
  return ChatChannel;
}(); // class ChatChannel


exports.ChatChannel = ChatChannel;

function originalVersion(message) {
  var msg = message;

  while (msg) {
    message = msg;
    msg = _logic.store.any(null, ns.dct('isReplacedBy'), message, message.doc());
  }

  return message;
}

function mostRecentVersion(message) {
  var msg = message;

  while (msg) {
    message = msg;
    msg = _logic.store.any(message, ns.dct('isReplacedBy'), null, message.doc());
  }

  return message;
}

function isDeleted(message) {
  return _logic.store.holds(message, ns.schema('dateDeleted'), null, message.doc());
}

function isReplaced(message) {
  return _logic.store.holds(message, ns.dct('isReplacedBy'), null, message.doc());
}

function isHidden(message) {
  return this.isDeleted(message) || this.isReplaced(message);
} // A Nickname for a person


function nick(person) {
  var s = _logic.store.any(person, ns.foaf('nick'));

  if (s) return '' + s.value;
  return '' + utils.label(person);
}

function _createIfNotExists(_x4) {
  return _createIfNotExists2.apply(this, arguments);
} // ends


function _createIfNotExists2() {
  _createIfNotExists2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(doc) {
    var contentType,
        data,
        response,
        _args4 = arguments;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            contentType = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : 'text/turtle';
            data = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : '';
            _context4.prev = 2;
            _context4.next = 5;
            return _logic.store.fetcher.load(doc);

          case 5:
            response = _context4.sent;
            _context4.next = 28;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](2);

            if (!(_context4.t0.response.status === 404)) {
              _context4.next = 26;
              break;
            }

            debug.log('createIfNotExists: doc does NOT exist, will create... ' + doc);
            _context4.prev = 12;
            _context4.next = 15;
            return _logic.store.fetcher.webOperation('PUT', doc.uri, {
              data: data,
              contentType: contentType
            });

          case 15:
            response = _context4.sent;
            _context4.next = 22;
            break;

          case 18:
            _context4.prev = 18;
            _context4.t1 = _context4["catch"](12);
            debug.log('createIfNotExists doc FAILED: ' + doc + ': ' + _context4.t1);
            throw _context4.t1;

          case 22:
            delete _logic.store.fetcher.requested[doc.uri]; // delete cached 404 error
            // debug.log('createIfNotExists doc created ok ' + doc)

            return _context4.abrupt("return", response);

          case 26:
            debug.log('createIfNotExists doc load error NOT 404:  ' + doc + ': ' + _context4.t0);
            throw _context4.t0;

          case 28:
            return _context4.abrupt("return", response);

          case 29:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 8], [12, 18]]);
  }));
  return _createIfNotExists2.apply(this, arguments);
}
//# sourceMappingURL=chatLogic.js.map