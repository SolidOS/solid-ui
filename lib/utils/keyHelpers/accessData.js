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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
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
  _getExistingPublicKey = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(webId, publicKeyUrl) {
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 1;
          return getKeyIfExists(webId, publicKeyUrl, 'publicKey');
        case 1:
          return _context.abrupt("return", _context.sent);
        case 2:
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
  _getExistingPrivateKey = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(webId, privateKeyUrl) {
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 1;
          return getKeyIfExists(webId, privateKeyUrl, 'privateKey');
        case 1:
          return _context2.abrupt("return", _context2.sent);
        case 2:
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
  _getKeyIfExists = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(webId, keyUrl, keyType) {
    var key, _t, _t2;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 1;
          return _solidLogic.store.fetcher.load(keyUrl);
        case 1:
          key = _solidLogic.store.any(webId, ns.solid(keyType)); // store.sym(CERT + keyType))
          return _context3.abrupt("return", key === null || key === void 0 ? void 0 : key.value);
        case 2:
          _context3.prev = 2;
          _t = _context3["catch"](0);
          if (!(_t.response.status === 404)) {
            _context3.next = 7;
            break;
          }
          debug.log('createIfNotExists: doc does NOT exist, will create... ' + keyUrl);
          _context3.prev = 3;
          _context3.next = 4;
          return _solidLogic.store.fetcher.webOperation('PUT', keyUrl, {
            data: '',
            contentType: 'text/turtle'
          });
        case 4:
          _context3.next = 6;
          break;
        case 5:
          _context3.prev = 5;
          _t2 = _context3["catch"](3);
          debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + _t2);
          throw _t2;
        case 6:
          delete _solidLogic.store.fetcher.requested[keyUrl]; // delete cached 404 error
          // debug.log('createIfNotExists doc created ok ' + doc)
          return _context3.abrupt("return", undefined);
        case 7:
          debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + _t);
          throw _t;
        case 8:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 2], [3, 5]]);
  }));
  return _getKeyIfExists.apply(this, arguments);
}
//# sourceMappingURL=accessData.js.map