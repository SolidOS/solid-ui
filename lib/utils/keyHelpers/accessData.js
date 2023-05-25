"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExistingPrivateKey = getExistingPrivateKey;
exports.getExistingPublicKey = getExistingPublicKey;
exports.getKeyIfExists = getKeyIfExists;
exports.pubKeyUrl = exports.privKeyUrl = exports.getPodRoot = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var debug = _interopRequireWildcard(require("../../debug"));
var _solidLogic = require("solid-logic");
var ns = _interopRequireWildcard(require("../../ns"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var getPodRoot = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(webId) {
    var webIdURL, storages, podRoot, path, _res$headers$get, res;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          webIdURL = new URL(webId.uri); // find storages in webId document
          _context.next = 3;
          return _solidLogic.store.fetcher.load(webId.uri);
        case 3:
          storages = _solidLogic.store.each(webId, ns.space('storage'), null, webId.doc());
          if (storages !== null && storages !== void 0 && storages.length) {
            _context.next = 19;
            break;
          }
          // find storage recursively in webId URL
          path = webIdURL.pathname;
        case 6:
          if (!path.length) {
            _context.next = 17;
            break;
          }
          path = path.substring(0, path.lastIndexOf('/'));
          podRoot = _solidLogic.store.sym(webIdURL.origin + path + '/');
          _context.next = 11;
          return _solidLogic.store.fetcher.webOperation('HEAD', podRoot.uri);
        case 11:
          res = _context.sent;
          if (!((_res$headers$get = res.headers.get('link')) !== null && _res$headers$get !== void 0 && _res$headers$get.includes(ns.space('Storage').value))) {
            _context.next = 14;
            break;
          }
          return _context.abrupt("break", 17);
        case 14:
          if (!path) debug.warn("Current user storage not found for\n".concat(webId));
          _context.next = 6;
          break;
        case 17:
          _context.next = 21;
          break;
        case 19:
          // give preference to storage in webId root
          podRoot = storages.find(function (storage) {
            return webIdURL.origin === new URL(storage.value).origin;
          });
          if (!podRoot) podRoot = storages[0];
        case 21:
          return _context.abrupt("return", podRoot);
        case 22:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function getPodRoot(_x) {
    return _ref.apply(this, arguments);
  };
}();
exports.getPodRoot = getPodRoot;
var pubKeyUrl = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(webId) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return getPodRoot(webId);
        case 3:
          _context2.t0 = _context2.sent.value;
          return _context2.abrupt("return", _context2.t0 + 'profile/keys/publicKey.ttl');
        case 7:
          _context2.prev = 7;
          _context2.t1 = _context2["catch"](0);
          throw new Error(_context2.t1);
        case 10:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 7]]);
  }));
  return function pubKeyUrl(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.pubKeyUrl = pubKeyUrl;
function getExistingPublicKey(_x3, _x4) {
  return _getExistingPublicKey.apply(this, arguments);
}
function _getExistingPublicKey() {
  _getExistingPublicKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(webId, publicKeyUrl) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return getKeyIfExists(webId, publicKeyUrl, 'publicKey');
        case 2:
          return _context4.abrupt("return", _context4.sent);
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getExistingPublicKey.apply(this, arguments);
}
var privKeyUrl = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(webId) {
    var _store$any, _settings;
    var settings, _settings2, podRoot;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          settings = (_store$any = _solidLogic.store.any(webId, ns.space('preferencesFile'), null, webId.doc())) === null || _store$any === void 0 ? void 0 : _store$any.value;
          settings = (_settings = settings) === null || _settings === void 0 ? void 0 : _settings.split('/').slice(0, -1).join('/');
          _context3.prev = 2;
          _context3.next = 5;
          return getPodRoot(webId);
        case 5:
          podRoot = _context3.sent;
          if ((_settings2 = settings) !== null && _settings2 !== void 0 && _settings2.startsWith(podRoot.value)) {
            _context3.next = 8;
            break;
          }
          throw new Error("/settings/ is expected to be in ".concat(podRoot.value));
        case 8:
          return _context3.abrupt("return", "".concat(settings, "/keys/privateKey.ttl"));
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](2);
          throw new Error(_context3.t0);
        case 14:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[2, 11]]);
  }));
  return function privKeyUrl(_x5) {
    return _ref3.apply(this, arguments);
  };
}();
exports.privKeyUrl = privKeyUrl;
function getExistingPrivateKey(_x6, _x7) {
  return _getExistingPrivateKey.apply(this, arguments);
}
function _getExistingPrivateKey() {
  _getExistingPrivateKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(webId, privateKeyUrl) {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return getKeyIfExists(webId, privateKeyUrl, 'privateKey');
        case 2:
          return _context5.abrupt("return", _context5.sent);
        case 3:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _getExistingPrivateKey.apply(this, arguments);
}
function getKeyIfExists(_x8, _x9, _x10) {
  return _getKeyIfExists.apply(this, arguments);
}
function _getKeyIfExists() {
  _getKeyIfExists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(webId, keyUrl, keyType) {
    var key;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _solidLogic.store.fetcher.load(keyUrl);
        case 3:
          key = _solidLogic.store.any(webId, ns.solid(keyType)); // store.sym(CERT + keyType))
          return _context6.abrupt("return", key === null || key === void 0 ? void 0 : key.value);
        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          if (!(_context6.t0.response.status === 404)) {
            _context6.next = 24;
            break;
          }
          debug.log('createIfNotExists: doc does NOT exist, will create... ' + keyUrl);
          _context6.prev = 11;
          _context6.next = 14;
          return _solidLogic.store.fetcher.webOperation('PUT', keyUrl, {
            data: '',
            contentType: 'text/turtle'
          });
        case 14:
          _context6.next = 20;
          break;
        case 16:
          _context6.prev = 16;
          _context6.t1 = _context6["catch"](11);
          debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + _context6.t1);
          throw _context6.t1;
        case 20:
          delete _solidLogic.store.fetcher.requested[keyUrl]; // delete cached 404 error
          // debug.log('createIfNotExists doc created ok ' + doc)
          return _context6.abrupt("return", undefined);
        case 24:
          debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + _context6.t0);
          throw _context6.t0;
        case 26:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 7], [11, 16]]);
  }));
  return _getKeyIfExists.apply(this, arguments);
}
//# sourceMappingURL=accessData.js.map