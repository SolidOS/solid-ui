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
var _dateFolder = require("./dateFolder");
var _solidLogic = require("solid-logic");
var ns = _interopRequireWildcard(require("../ns"));
var $rdf = _interopRequireWildcard(require("rdflib"));
var utils = _interopRequireWildcard(require("../utils"));
var _signature = require("./signature");
var _keys = require("./keys");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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
var ChatChannel = exports.ChatChannel = /*#__PURE__*/function () {
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
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.updateMessage(text));
            case 1:
            case "end":
              return _context.stop();
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
      var _updateMessage = (0, _asyncToGenerator2["default"])(function (text) {
        var _this = this;
        var oldMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var deleteIt = arguments.length > 2 ? arguments[2] : undefined;
        return /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
          var sts, now, timestamp, dateStamp, chatDocument, message, me, msg, oldMsgMaker, errMsg, privateKey, sig, _errMsg;
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                sts = [];
                now = new Date();
                timestamp = '' + now.getTime();
                dateStamp = $rdf.term(now);
                chatDocument = oldMsg ? oldMsg.doc() : _this.dateFolder.leafDocumentFromDate(now);
                message = _solidLogic.store.sym(chatDocument.uri + '#' + 'Msg' + timestamp); // const content = store.literal(text)
                me = _solidLogic.authn.currentUser(); // If already logged on
                msg = (0, _signature.getBlankMsg)();
                msg.id = message.uri;
                if (!oldMsg) {
                  _context2.next = 22;
                  break;
                }
                // edit message replaces old one
                oldMsgMaker = _solidLogic.store.any(oldMsg, ns.foaf('maker')); // may not be needed here, but needed on READ
                if (!(oldMsgMaker.uri === me.uri)) {
                  _context2.next = 16;
                  break;
                }
                sts.push($rdf.st(mostRecentVersion(oldMsg), ns.dct('isReplacedBy'), message, chatDocument));
                if (deleteIt) {
                  // we need to add a specific signature, else anyone can delete a msg ?
                  sts.push($rdf.st(message, ns.schema('dateDeleted'), dateStamp, chatDocument));
                }
                _context2.next = 20;
                break;
              case 16:
                errMsg = 'Error you cannot delete/edit a message from someone else : \n' + oldMsgMaker.uri;
                debug.warn(errMsg);
                alert(errMsg);
                throw new Error(errMsg);
              case 20:
                _context2.next = 23;
                break;
              case 22:
                // link new message to channel
                sts.push($rdf.st(_this.channel, ns.wf('message'), message, chatDocument));
              case 23:
                sts.push($rdf.st(message, ns.sioc('content'), _solidLogic.store.literal(text), chatDocument));
                msg.content = text;
                sts.push($rdf.st(message, ns.dct('created'), dateStamp, chatDocument));
                msg.created = dateStamp.value;
                if (!me) {
                  _context2.next = 35;
                  break;
                }
                sts.push($rdf.st(message, ns.foaf('maker'), me, chatDocument));
                msg.maker = me.uri;
                // privateKey the cached private key of me, cached in store
                _context2.next = 32;
                return (0, _keys.getPrivateKey)(me);
              case 32:
                privateKey = _context2.sent;
                // me.uri)
                sig = (0, _signature.signMsg)(msg, privateKey);
                sts.push($rdf.st(message, $rdf.sym("".concat(_signature.SEC, "proofValue")), $rdf.lit(sig), chatDocument));
              case 35:
                _context2.prev = 35;
                _context2.next = 38;
                return _solidLogic.store.updater.update([], sts);
              case 38:
                _context2.next = 46;
                break;
              case 40:
                _context2.prev = 40;
                _context2.t0 = _context2["catch"](35);
                _errMsg = 'Error saving chat message: ' + _context2.t0;
                debug.warn(_errMsg);
                alert(_errMsg);
                throw new Error(_errMsg);
              case 46:
                return _context2.abrupt("return", message);
              case 47:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[35, 40]]);
        })();
      });
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
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.updateMessage('(message deleted)', message, true));
            case 1:
            case "end":
              return _context3.stop();
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
function originalVersion(message) {
  var msg = message;
  while (msg) {
    message = msg;
    msg = _solidLogic.store.any(null, ns.dct('isReplacedBy'), message, message.doc());
  }
  return message;
}
function mostRecentVersion(message) {
  var msg = message;
  while (msg) {
    message = msg;
    msg = _solidLogic.store.any(message, ns.dct('isReplacedBy'), null, message.doc());
  }
  return message;
}
function isDeleted(message) {
  return _solidLogic.store.holds(message, ns.schema('dateDeleted'), null, message.doc());
}
function isReplaced(message) {
  return _solidLogic.store.holds(message, ns.dct('isReplacedBy'), null, message.doc());
}
function isHidden(message) {
  return this.isDeleted(message) || this.isReplaced(message);
}

// A Nickname for a person

function nick(person) {
  var s = _solidLogic.store.any(person, ns.foaf('nick'));
  if (s) return '' + s.value;
  return '' + utils.label(person);
}
function _createIfNotExists(_x4) {
  return _createIfNotExists2.apply(this, arguments);
} // ends
function _createIfNotExists2() {
  _createIfNotExists2 = (0, _asyncToGenerator2["default"])(function (doc) {
    var contentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'text/turtle';
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    return /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var response;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _solidLogic.store.fetcher.load(doc);
          case 3:
            response = _context4.sent;
            _context4.next = 26;
            break;
          case 6:
            _context4.prev = 6;
            _context4.t0 = _context4["catch"](0);
            if (!(_context4.t0.response.status === 404)) {
              _context4.next = 24;
              break;
            }
            debug.log('createIfNotExists: doc does NOT exist, will create... ' + doc);
            _context4.prev = 10;
            _context4.next = 13;
            return _solidLogic.store.fetcher.webOperation('PUT', doc.uri, {
              data: data,
              contentType: contentType
            });
          case 13:
            response = _context4.sent;
            _context4.next = 20;
            break;
          case 16:
            _context4.prev = 16;
            _context4.t1 = _context4["catch"](10);
            debug.log('createIfNotExists doc FAILED: ' + doc + ': ' + _context4.t1);
            throw _context4.t1;
          case 20:
            delete _solidLogic.store.fetcher.requested[doc.uri]; // delete cached 404 error
            // debug.log('createIfNotExists doc created ok ' + doc)
            return _context4.abrupt("return", response);
          case 24:
            debug.log('createIfNotExists doc load error NOT 404:  ' + doc + ': ' + _context4.t0);
            throw _context4.t0;
          case 26:
            return _context4.abrupt("return", response);
          case 27:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 6], [10, 16]]);
    })();
  });
  return _createIfNotExists2.apply(this, arguments);
}
//# sourceMappingURL=chatLogic.js.map