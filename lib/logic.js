"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.solidLogicSingleton = void 0;

var debug = _interopRequireWildcard(require("./debug"));

var _solidAuthClient = require("solid-auth-client");

var _solidLogicMoveMe = require("./solid-logic-move-me");

// This module of solid-ui has a main quadstore for the app to use
//
// import { SolidLogic } from 'solid-logic'
var solidLogicSingleton = new _solidLogicMoveMe.SolidLogic({
  fetch: _solidAuthClient.fetch
});
exports.solidLogicSingleton = solidLogicSingleton;
debug.log('Unique quadstore initialized.'); // ends
//# sourceMappingURL=logic.js.map