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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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