"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldParams = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var ns = _interopRequireWildcard(require("../../ns"));
var _style = require("../../style");
var _fieldParams;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
/**
 * The fieldParams object defines various constants
 * for use in various form fields. Depending on the
 * field in questions, different values may be read
 * from here.
 */
var fieldParams = exports.fieldParams = (_fieldParams = {}, (0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])(_fieldParams, ns.ui('ColorField').uri, {
  size: 9,
  type: 'color',
  style: 'height: 3em;',
  // around 1.5em is padding
  dt: 'color',
  pattern: /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/
}), ns.ui('DateField').uri, {
  size: 20,
  type: 'date',
  dt: 'date',
  pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/
}), ns.ui('DateTimeField').uri, {
  size: 20,
  type: 'datetime-local',
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime
  dt: 'dateTime',
  pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/
}), ns.ui('TimeField').uri, {
  size: 10,
  type: 'time',
  dt: 'time',
  pattern: /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/
}), ns.ui('IntegerField').uri, {
  size: 12,
  style: 'text-align: right;',
  dt: 'integer',
  pattern: /^\s*-?[0-9]+\s*$/
}), ns.ui('DecimalField').uri, {
  size: 12,
  style: 'text-align: right;',
  dt: 'decimal',
  pattern: /^\s*-?[0-9]*(\.[0-9]*)?\s*$/
}), ns.ui('FloatField').uri, {
  size: 12,
  style: 'text-align: right;',
  dt: 'float',
  pattern: /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/
}), ns.ui('SingleLineTextField').uri, {}), ns.ui('NamedNodeURIField').uri, {
  namedNode: true
}), ns.ui('TextField').uri, {}), (0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])((0, _defineProperty2["default"])(_fieldParams, ns.ui('PhoneField').uri, {
  size: 20,
  uriPrefix: 'tel:',
  pattern: /^\+?[\d-]+[\d]*$/
}), ns.ui('EmailField').uri, {
  size: 30,
  uriPrefix: 'mailto:',
  pattern: /^\s*.*@.*\..*\s*$/ // @@ Get the right regexp here
}), ns.ui('Group').uri, {
  style: _style.formGroupStyle
}), ns.ui('Comment').uri, {
  element: 'p',
  style: _style.commentStyle
}), ns.ui('Heading').uri, {
  element: 'h3',
  style: _style.formHeadingStyle
}));
//# sourceMappingURL=fieldParams.js.map