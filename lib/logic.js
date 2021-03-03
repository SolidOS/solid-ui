"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.solidLogicSingleton = void 0;

var debug = _interopRequireWildcard(require("./debug"));

var _solidAuthClient = _interopRequireDefault(require("solid-auth-client"));

var _solidLogic = require("solid-logic");

// This module of solid-ui has a main quadstore for the app to use
//
var solidLogicSingleton = new _solidLogic.SolidLogic({
  fetch: _solidAuthClient["default"].fetch
}, _solidAuthClient["default"]);
exports.solidLogicSingleton = solidLogicSingleton;
debug.log('Unique quadstore initialized.'); // ends
//# sourceMappingURL=logic.js.map