"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = exports.solidLogicSingleton = exports.profile = exports.kb = exports.chat = exports.authn = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var debug = _interopRequireWildcard(require("./debug"));

var _authSession = _interopRequireDefault(require("./authn/authSession"));

var _solidLogic = require("solid-logic");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// This module of solid-ui has a main quadstore for the app to use
//
function thisFetch(_x, _x2) {
  return _thisFetch.apply(this, arguments);
}

function _thisFetch() {
  _thisFetch = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url, requestInit) {
    var omitCreds;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            omitCreds = requestInit && requestInit.credentials && requestInit.credentials === 'omit';

            if (!(_authSession["default"].info.webId && !omitCreds)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", _authSession["default"].fetch(url, requestInit));

          case 5:
            return _context.abrupt("return", window.fetch(url, requestInit));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _thisFetch.apply(this, arguments);
}

var solidLogicSingleton = new _solidLogic.SolidLogic({
  fetch: thisFetch
}, _authSession["default"]); // Make this directly accessible as it is what you need most of the time

exports.solidLogicSingleton = solidLogicSingleton;
var store = solidLogicSingleton.store;
exports.store = store;
var kb = store; // Very commonly used synonym of store - Knowledge Base

exports.kb = kb;
var authn = solidLogicSingleton.authn;
exports.authn = authn;
var chat = solidLogicSingleton.chat; // export const language = solidLogicSingleton.language // Does not work

exports.chat = chat;
var profile = solidLogicSingleton.profile;
exports.profile = profile;
debug.log('Unique quadstore initialized.'); // ends
//# sourceMappingURL=logic.js.map