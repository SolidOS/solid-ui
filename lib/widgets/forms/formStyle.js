"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setFieldStyle = setFieldStyle;

var ns = _interopRequireWildcard(require("../../ns"));

var _logic = require("../../logic");

var _fieldParams = require("./fieldParams");

var _fieldFunction = require("./fieldFunction");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var STYLE_URI_PREFIX = 'https://www.w3.org/ns/css/attribute#';
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