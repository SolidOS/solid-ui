"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFieldStyle = setFieldStyle;

var ns = _interopRequireWildcard(require("../../ns"));

var _logic = require("../../logic");

var _fieldParams = require("./fieldParams");

var _fieldFunction = require("./fieldFunction");

var STYLE_URI_PREFIX = 'https://www.w3.org/ns/css#';
/* eslint-disable no-console */

function setFieldStyle(ele, field) {
  var classUri = (0, _fieldFunction.mostSpecificClassURI)(field);
  var params = _fieldParams.fieldParams[classUri] || {};

  var style = _logic.kb.any(field, ns.ui('style'));

  if (!style) {
    if (params.style) {
      ele.setAttribute('style', params.style);
    }

    return;
  }

  if (style.termType === 'Literal') {
    if (style) ele.setAttribute('style', style.value);
  } else {
    var sts = _logic.kb.statementsMatching(style, null, null, field.doc());

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