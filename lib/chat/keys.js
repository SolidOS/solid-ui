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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
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
  _getPublicKey = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(webId) {
    var publicKeyDoc, key, _t2;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 1;
          return _solidLogic.store.fetcher.load(webId);
        case 1:
          _context2.next = 2;
          return (0, _accessData.pubKeyUrl)(webId);
        case 2:
          publicKeyDoc = _context2.sent;
          _context2.prev = 3;
          _context2.next = 4;
          return _solidLogic.store.fetcher.load(publicKeyDoc);
        case 4:
          // url.href)
          key = _solidLogic.store.any(webId, ns.solid('publicKey'));
          return _context2.abrupt("return", key === null || key === void 0 ? void 0 : key.value);
        case 5:
          _context2.prev = 5;
          _t2 = _context2["catch"](3);
          return _context2.abrupt("return", undefined);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[3, 5]]);
  }));
  return _getPublicKey.apply(this, arguments);
}
function getPrivateKey(_x2) {
  return _getPrivateKey.apply(this, arguments);
}
function _getPrivateKey() {
  _getPrivateKey = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(webId) {
    var publicKeyDoc, privateKeyDoc, publicKey, privateKey, validPublicKey, del, add, newPublicKey, keyContainer;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 1;
          return _solidLogic.store.fetcher.load(webId);
        case 1:
          _context3.next = 2;
          return (0, _accessData.pubKeyUrl)(webId);
        case 2:
          publicKeyDoc = _context3.sent;
          _context3.next = 3;
          return (0, _accessData.privKeyUrl)(webId);
        case 3:
          privateKeyDoc = _context3.sent;
          _context3.next = 4;
          return (0, _accessData.getExistingPublicKey)(webId, publicKeyDoc);
        case 4:
          publicKey = _context3.sent;
          _context3.next = 5;
          return (0, _accessData.getExistingPrivateKey)(webId, privateKeyDoc);
        case 5:
          privateKey = _context3.sent;
          // is publicKey valid ?
          validPublicKey = true;
          if (privateKey && publicKey !== generatePublicKey(privateKey)) {
            if (confirm('This is strange the publicKey is not valid for\n' + (webId === null || webId === void 0 ? void 0 : webId.uri) + '\'shall we repair keeping the private key ?')) validPublicKey = false;
          }

          // create key pair or repair publicKey
          if (!(!privateKey || !publicKey || !validPublicKey)) {
            _context3.next = 8;
            break;
          }
          del = [];
          add = [];
          if (privateKey) {
            _context3.next = 6;
            break;
          }
          // add = []
          privateKey = generatePrivateKey();
          add = [$rdf.st(webId, ns.solid('privateKey'), $rdf.literal(privateKey), _solidLogic.store.sym(privateKeyDoc))];
          _context3.next = 6;
          return saveKey(privateKeyDoc, [], add, webId.uri);
        case 6:
          if (!(!publicKey || !validPublicKey)) {
            _context3.next = 7;
            break;
          }
          del = [];
          // delete invalid public key
          if (publicKey) {
            del = [$rdf.st(webId, ns.solid('publicKey'), $rdf.lit(publicKey), _solidLogic.store.sym(publicKeyDoc))];
            debug.log('delete invalid publicKey ' + del);
          }
          // update new valid key
          newPublicKey = generatePublicKey(privateKey);
          add = [$rdf.st(webId, ns.solid('publicKey'), $rdf.literal(newPublicKey), _solidLogic.store.sym(publicKeyDoc))];
          _context3.next = 7;
          return saveKey(publicKeyDoc, del, add);
        case 7:
          keyContainer = privateKeyDoc.substring(0, privateKeyDoc.lastIndexOf('/') + 1);
          _context3.next = 8;
          return (0, _acl.setAcl)(keyContainer, (0, _acl.keyContainerAclBody)(webId.uri));
        case 8:
          return _context3.abrupt("return", privateKey);
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getPrivateKey.apply(this, arguments);
}
var deleteKeyAcl = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(keyDoc) {
    var keyAclDoc, response, _t;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 1;
          return _solidLogic.store.fetcher.load(keyDoc);
        case 1:
          keyAclDoc = _solidLogic.store.any(_solidLogic.store.sym(keyDoc), _solidLogic.store.sym('http://www.iana.org/assignments/link-relations/acl'));
          if (!keyAclDoc) {
            _context.next = 6;
            break;
          }
          _context.prev = 2;
          _context.next = 3;
          return _solidLogic.store.fetcher.webOperation('DELETE', keyAclDoc.value);
        case 3:
          response = _context.sent;
          // this may fail if webId is not an owner
          debug.log('delete keyAcl' + keyAclDoc.value + ' ' + response.status); // should test 404 and 2xx
          _context.next = 6;
          break;
        case 4:
          _context.prev = 4;
          _t = _context["catch"](2);
          if (!(_t.response.status !== 404)) {
            _context.next = 5;
            break;
          }
          throw new Error(_t);
        case 5:
          debug.log('delete keyAcl' + keyAclDoc.value + ' ' + _t.response.status); // should test 404 and 2xx
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 4]]);
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
      return _regenerator["default"].wrap(function (_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 1;
            return deleteKeyAcl(keyDoc);
          case 1:
            _context4.next = 2;
            return _solidLogic.store.updater.updateMany(del, add);
          case 2:
            // or a promise store.updater.update ?
            // create READ only ACL
            aclBody = (0, _acl.keyAclBody)(keyDoc, me);
            _context4.next = 3;
            return (0, _acl.setAcl)(keyDoc, aclBody);
          case 3:
          case "end":
            return _context4.stop();
        }
      }, _callee4);
    })();
  });
  return _saveKey.apply(this, arguments);
}
//# sourceMappingURL=keys.js.map