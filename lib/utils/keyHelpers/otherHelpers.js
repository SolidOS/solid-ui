"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRootIfPreferencesExist = void 0;
var _solidLogic = require("solid-logic");
var ns = _interopRequireWildcard(require("../../ns"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// Will rename this file later. We will probably be using solid-logic anyway
// moved it out so I can mock

var getRootIfPreferencesExist = exports.getRootIfPreferencesExist = function getRootIfPreferencesExist(webId) {
  var _store$any, _root;
  var root = (_store$any = _solidLogic.store.any(webId, ns.space('preferencesFile'), null, webId.doc())) === null || _store$any === void 0 ? void 0 : _store$any.value;
  root = (_root = root) === null || _root === void 0 ? void 0 : _root.split('/').slice(0, -2).join('/');
  if (!root) throw new Error("prefererencesFile is expected to exist in ".concat(webId));
  return root;
};
//# sourceMappingURL=otherHelpers.js.map