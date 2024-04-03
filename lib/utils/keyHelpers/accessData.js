"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExistingPrivateKey = getExistingPrivateKey;
exports.getExistingPublicKey = getExistingPublicKey;
exports.getKeyIfExists = getKeyIfExists;
exports.pubKeyUrl = exports.privKeyUrl = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var debug = _interopRequireWildcard(require("../../debug"));
var _solidLogic = require("solid-logic");
var ns = _interopRequireWildcard(require("../../ns"));
var _otherHelpers = require("./otherHelpers");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var pubKeyUrl = exports.pubKeyUrl = function pubKeyUrl(webId) {
  var url;
  try {
    var root = (0, _otherHelpers.getRootIfPreferencesExist)(webId);
    url = "".concat(root, "/profile/keys/publicKey.ttl");
  } catch (err) {
    debug.error(err);
  }
  return url;
};
var privKeyUrl = exports.privKeyUrl = function privKeyUrl(webId) {
  var url;
  try {
    var root = (0, _otherHelpers.getRootIfPreferencesExist)(webId);
    url = "".concat(root, "/settings/keys/privateKey.ttl");
  } catch (err) {
    debug.error(err);
  }
  return url;
};
function getExistingPublicKey(_x, _x2) {
  return _getExistingPublicKey.apply(this, arguments);
}
function _getExistingPublicKey() {
  _getExistingPublicKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(webId, publicKeyUrl) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return getKeyIfExists(webId, publicKeyUrl, 'publicKey');
        case 2:
          return _context.abrupt("return", _context.sent);
        case 3:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getExistingPublicKey.apply(this, arguments);
}
function getExistingPrivateKey(_x3, _x4) {
  return _getExistingPrivateKey.apply(this, arguments);
}
function _getExistingPrivateKey() {
  _getExistingPrivateKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(webId, privateKeyUrl) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return getKeyIfExists(webId, privateKeyUrl, 'privateKey');
        case 2:
          return _context2.abrupt("return", _context2.sent);
        case 3:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getExistingPrivateKey.apply(this, arguments);
}
function getKeyIfExists(_x5, _x6, _x7) {
  return _getKeyIfExists.apply(this, arguments);
}
function _getKeyIfExists() {
  _getKeyIfExists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(webId, keyUrl, keyType) {
    var key;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _solidLogic.store.fetcher.load(keyUrl);
        case 3:
          key = _solidLogic.store.any(webId, ns.solid(keyType)); // store.sym(CERT + keyType))
          return _context3.abrupt("return", key === null || key === void 0 ? void 0 : key.value);
        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          if (!(_context3.t0.response.status === 404)) {
            _context3.next = 24;
            break;
          }
          debug.log('createIfNotExists: doc does NOT exist, will create... ' + keyUrl);
          _context3.prev = 11;
          _context3.next = 14;
          return _solidLogic.store.fetcher.webOperation('PUT', keyUrl, {
            data: '',
            contentType: 'text/turtle'
          });
        case 14:
          _context3.next = 20;
          break;
        case 16:
          _context3.prev = 16;
          _context3.t1 = _context3["catch"](11);
          debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + _context3.t1);
          throw _context3.t1;
        case 20:
          delete _solidLogic.store.fetcher.requested[keyUrl]; // delete cached 404 error
          // debug.log('createIfNotExists doc created ok ' + doc)
          return _context3.abrupt("return", undefined);
        case 24:
          debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + _context3.t0);
          throw _context3.t0;
        case 26:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 7], [11, 16]]);
  }));
  return _getKeyIfExists.apply(this, arguments);
}
//# sourceMappingURL=accessData.js.map