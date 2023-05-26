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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* export const getPodRoot = async (webId: NamedNode) => {
  const webIdURL = new URL(webId.uri)
  // find storages in webId document
  await store.fetcher.load(webId.uri)
  const storages = store.each(webId, ns.space('storage'), null, webId.doc())
  var podRoot: NamedNode | undefined
  if (!storages?.length) {
    // find storage recursively in webId URL
    let path = webIdURL.pathname
    while (path.length) {
      path = path.substring(0, path.lastIndexOf('/'))
      podRoot = store.sym(webIdURL.origin + path + '/')
      const res = await store.fetcher.webOperation('HEAD', podRoot.uri)
      if (res.headers.get('link')?.includes(ns.space('Storage').value)) break
      if (!path) debug.warn(`Current user storage not found for\n${webId}`)
    }
  } else {
    // give preference to storage in webId root
    podRoot = storages.find((storage) => webIdURL.origin === new URL(storage.value).origin) as NamedNode
    if (!podRoot) podRoot = storages[0] as NamedNode
  }

  return podRoot as NamedNode
} */

var pubKeyUrl = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(webId) {
    var _store$any, _parentSettings;
    var parentSettings;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          parentSettings = (_store$any = _solidLogic.store.any(webId, ns.space('preferencesFile'), null, webId.doc())) === null || _store$any === void 0 ? void 0 : _store$any.value;
          parentSettings = (_parentSettings = parentSettings) === null || _parentSettings === void 0 ? void 0 : _parentSettings.split('/').slice(0, -2).join('/');
          if (parentSettings) {
            _context.next = 4;
            break;
          }
          throw new Error("prefererencesFile is expected to exist in ".concat(webId.doc));
        case 4:
          return _context.abrupt("return", "".concat(parentSettings, "/profile/keys/publicKey.ttl"));
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function pubKeyUrl(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.pubKeyUrl = pubKeyUrl;
function getExistingPublicKey(_x2, _x3) {
  return _getExistingPublicKey.apply(this, arguments);
}
function _getExistingPublicKey() {
  _getExistingPublicKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(webId, publicKeyUrl) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return getKeyIfExists(webId, publicKeyUrl, 'publicKey');
        case 2:
          return _context3.abrupt("return", _context3.sent);
        case 3:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getExistingPublicKey.apply(this, arguments);
}
var privKeyUrl = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(webId) {
    var _store$any2, _settings;
    var settings;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          settings = (_store$any2 = _solidLogic.store.any(webId, ns.space('preferencesFile'), null, webId.doc())) === null || _store$any2 === void 0 ? void 0 : _store$any2.value;
          settings = (_settings = settings) === null || _settings === void 0 ? void 0 : _settings.split('/').slice(0, -1).join('/');
          if (settings) {
            _context2.next = 4;
            break;
          }
          throw new Error("prefererencesFile is expected to exist in ".concat(webId.doc));
        case 4:
          return _context2.abrupt("return", "".concat(settings, "/keys/privateKey.ttl"));
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function privKeyUrl(_x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.privKeyUrl = privKeyUrl;
function getExistingPrivateKey(_x5, _x6) {
  return _getExistingPrivateKey.apply(this, arguments);
}
function _getExistingPrivateKey() {
  _getExistingPrivateKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(webId, privateKeyUrl) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return getKeyIfExists(webId, privateKeyUrl, 'privateKey');
        case 2:
          return _context4.abrupt("return", _context4.sent);
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getExistingPrivateKey.apply(this, arguments);
}
function getKeyIfExists(_x7, _x8, _x9) {
  return _getKeyIfExists.apply(this, arguments);
}
function _getKeyIfExists() {
  _getKeyIfExists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(webId, keyUrl, keyType) {
    var key;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return _solidLogic.store.fetcher.load(keyUrl);
        case 3:
          key = _solidLogic.store.any(webId, ns.solid(keyType)); // store.sym(CERT + keyType))
          return _context5.abrupt("return", key === null || key === void 0 ? void 0 : key.value);
        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          if (!(_context5.t0.response.status === 404)) {
            _context5.next = 24;
            break;
          }
          debug.log('createIfNotExists: doc does NOT exist, will create... ' + keyUrl);
          _context5.prev = 11;
          _context5.next = 14;
          return _solidLogic.store.fetcher.webOperation('PUT', keyUrl, {
            data: '',
            contentType: 'text/turtle'
          });
        case 14:
          _context5.next = 20;
          break;
        case 16:
          _context5.prev = 16;
          _context5.t1 = _context5["catch"](11);
          debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + _context5.t1);
          throw _context5.t1;
        case 20:
          delete _solidLogic.store.fetcher.requested[keyUrl]; // delete cached 404 error
          // debug.log('createIfNotExists doc created ok ' + doc)
          return _context5.abrupt("return", undefined);
        case 24:
          debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + _context5.t0);
          throw _context5.t0;
        case 26:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 7], [11, 16]]);
  }));
  return _getKeyIfExists.apply(this, arguments);
}
//# sourceMappingURL=accessData.js.map