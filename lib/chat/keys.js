"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePrivateKey = generatePrivateKey;
exports.generatePublicKey = generatePublicKey;
exports.getPrivateKey = getPrivateKey;
exports.getPublicKey = getPublicKey;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var debug = _interopRequireWildcard(require("../debug"));
var _secp256k = require("@noble/curves/secp256k1");
var _utils = require("@noble/hashes/utils");
var ns = _interopRequireWildcard(require("../ns"));
var _solidLogic = require("solid-logic");
var $rdf = _interopRequireWildcard(require("rdflib"));
var _accessData = require("../utils/keyHelpers/accessData");
var _acl = require("../utils/keyHelpers/acl");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function generatePrivateKey() {
  return (0, _utils.bytesToHex)(_secp256k.schnorr.utils.randomPrivateKey());
}
function generatePublicKey(privateKey) {
  return (0, _utils.bytesToHex)(_secp256k.schnorr.getPublicKey(privateKey));
}

/**
 * getPublicKey
 * used for displaying messages in chat, therefore does not
 * create a new key if not found
 * @param webId
 * @returns string | undefined
 */
function getPublicKey(_x) {
  return _getPublicKey.apply(this, arguments);
}
function _getPublicKey() {
  _getPublicKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(webId) {
    var publicKeyDoc, key;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _solidLogic.store.fetcher.load(webId);
        case 2:
          _context2.next = 4;
          return (0, _accessData.pubKeyUrl)(webId);
        case 4:
          publicKeyDoc = _context2.sent;
          _context2.prev = 5;
          _context2.next = 8;
          return _solidLogic.store.fetcher.load(publicKeyDoc);
        case 8:
          // url.href)
          key = _solidLogic.store.any(webId, ns.solid('publicKey'));
          return _context2.abrupt("return", key === null || key === void 0 ? void 0 : key.value);
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](5);
          return _context2.abrupt("return", undefined);
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[5, 12]]);
  }));
  return _getPublicKey.apply(this, arguments);
}
function getPrivateKey(_x2) {
  return _getPrivateKey.apply(this, arguments);
}
function _getPrivateKey() {
  _getPrivateKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(webId) {
    var publicKeyDoc, privateKeyDoc, publicKey, privateKey, validPublicKey, del, add, newPublicKey, keyContainer;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _solidLogic.store.fetcher.load(webId);
        case 2:
          _context3.next = 4;
          return (0, _accessData.pubKeyUrl)(webId);
        case 4:
          publicKeyDoc = _context3.sent;
          _context3.next = 7;
          return (0, _accessData.privKeyUrl)(webId);
        case 7:
          privateKeyDoc = _context3.sent;
          _context3.next = 10;
          return (0, _accessData.getExistingPublicKey)(webId, publicKeyDoc);
        case 10:
          publicKey = _context3.sent;
          _context3.next = 13;
          return (0, _accessData.getExistingPrivateKey)(webId, privateKeyDoc);
        case 13:
          privateKey = _context3.sent;
          // is publicKey valid ?
          validPublicKey = true;
          if (privateKey && publicKey !== generatePublicKey(privateKey)) {
            if (confirm('This is strange the publicKey is not valid for\n' + (webId === null || webId === void 0 ? void 0 : webId.uri) + '\'shall we repair keeping the private key ?')) validPublicKey = false;
          }

          // create key pair or repair publicKey
          if (!(!privateKey || !publicKey || !validPublicKey)) {
            _context3.next = 34;
            break;
          }
          del = [];
          add = [];
          if (privateKey) {
            _context3.next = 24;
            break;
          }
          // add = []
          privateKey = generatePrivateKey();
          add = [$rdf.st(webId, ns.solid('privateKey'), $rdf.literal(privateKey), _solidLogic.store.sym(privateKeyDoc))];
          _context3.next = 24;
          return saveKey(privateKeyDoc, [], add, webId.uri);
        case 24:
          if (!(!publicKey || !validPublicKey)) {
            _context3.next = 31;
            break;
          }
          del = [];
          // delete invalid public key
          if (publicKey) {
            del = [$rdf.st(webId, ns.solid('publicKey'), $rdf.lit(publicKey), _solidLogic.store.sym(publicKeyDoc))];
            debug.log(del);
          }
          // update new valid key
          newPublicKey = generatePublicKey(privateKey);
          add = [$rdf.st(webId, ns.solid('publicKey'), $rdf.literal(newPublicKey), _solidLogic.store.sym(publicKeyDoc))];
          _context3.next = 31;
          return saveKey(publicKeyDoc, del, add);
        case 31:
          keyContainer = privateKeyDoc.substring(0, privateKeyDoc.lastIndexOf('/') + 1);
          _context3.next = 34;
          return (0, _acl.setAcl)(keyContainer, (0, _acl.keyContainerAclBody)(webId.uri));
        case 34:
          return _context3.abrupt("return", privateKey);
        case 35:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getPrivateKey.apply(this, arguments);
}
var deleteKeyAcl = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(keyDoc) {
    var keyAclDoc, response;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _solidLogic.store.fetcher.load(keyDoc);
        case 2:
          keyAclDoc = _solidLogic.store.any(_solidLogic.store.sym(keyDoc), _solidLogic.store.sym('http://www.iana.org/assignments/link-relations/acl'));
          if (!keyAclDoc) {
            _context.next = 16;
            break;
          }
          _context.prev = 4;
          _context.next = 7;
          return _solidLogic.store.fetcher.webOperation('DELETE', keyAclDoc.value);
        case 7:
          response = _context.sent;
          // this may fail if webId is not an owner
          debug.log('delete ' + keyAclDoc.value + ' ' + response.status); // should test 404 and 2xx
          _context.next = 16;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](4);
          if (!(_context.t0.response.status !== 404)) {
            _context.next = 15;
            break;
          }
          throw new Error(_context.t0);
        case 15:
          debug.log('delete ' + keyAclDoc.value + ' ' + _context.t0.response.status); // should test 404 and 2xx
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[4, 11]]);
  }));
  return function deleteKeyAcl(_x3) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * delete acl if keydoc exists
 * create/edit keyDoc
 * set keyDoc acl
 */
function saveKey(_x4, _x5, _x6) {
  return _saveKey.apply(this, arguments);
}
function _saveKey() {
  _saveKey = (0, _asyncToGenerator2["default"])(function (keyDoc, del, add) {
    var me = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
    return /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      var aclBody;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return deleteKeyAcl(keyDoc);
          case 2:
            _context4.next = 4;
            return _solidLogic.store.updater.updateMany(del, add);
          case 4:
            // or a promise store.updater.update ?
            // create READ only ACL
            aclBody = (0, _acl.keyAclBody)(keyDoc, me);
            _context4.next = 7;
            return (0, _acl.setAcl)(keyDoc, aclBody);
          case 7:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    })();
  });
  return _saveKey.apply(this, arguments);
}
//# sourceMappingURL=keys.js.map