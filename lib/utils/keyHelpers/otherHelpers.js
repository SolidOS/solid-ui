"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRootIfPreferencesExist = void 0;
var _solidLogic = require("solid-logic");
var ns = _interopRequireWildcard(require("../../ns"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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