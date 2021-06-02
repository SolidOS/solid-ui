"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profile = exports.chat = exports.authn = exports.kb = exports.store = exports.solidLogicSingleton = void 0;

var debug = _interopRequireWildcard(require("./debug"));

var _solidAuthClient = _interopRequireDefault(require("solid-auth-client"));

var _solidLogic = require("solid-logic");

// This module of solid-ui has a main quadstore for the app to use
//
var solidLogicSingleton = new _solidLogic.SolidLogic({
  fetch: _solidAuthClient["default"].fetch
}, _solidAuthClient["default"]); // Make this directly accessible as it is what you need most of the time

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