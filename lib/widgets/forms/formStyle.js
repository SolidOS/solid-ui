"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFieldStyle = setFieldStyle;
var ns = _interopRequireWildcard(require("../../ns"));
var _solidLogic = require("solid-logic");
var _fieldParams = require("./fieldParams");
var _fieldFunction = require("./fieldFunction");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var STYLE_URI_PREFIX = 'https://www.w3.org/ns/css#';

/* eslint-disable no-console */

function setFieldStyle(ele, field) {
  var classUri = (0, _fieldFunction.mostSpecificClassURI)(field);
  var params = _fieldParams.fieldParams[classUri] || {};
  var style = _solidLogic.store.any(field, ns.ui('style'));
  if (!style) {
    if (params.style) {
      ele.setAttribute('style', params.style);
    }
    return;
  }
  if (style.termType === 'Literal') {
    if (style) ele.setAttribute('style', style.value);
  } else {
    var sts = _solidLogic.store.statementsMatching(style, null, null, field.doc());
    sts.forEach(function (st) {
      if (st.predicate.uri && st.predicate.uri.startsWith(STYLE_URI_PREFIX)) {
        var cssAttribute = st.predicate.uri.slice(STYLE_URI_PREFIX.length);
        try {
          ele.style[cssAttribute] = st.object.value;
        } catch (err) {
          console.warn("setFieldStyle: Error setting element style ".concat(cssAttribute, " to \"").concat(st.object.value, "\""));
          console.warn("setFieldStyle:   ... Element tagName was \"".concat(ele.tagName || '???', "\""));
        }
      }
    });
  }
}
//# sourceMappingURL=formStyle.js.map