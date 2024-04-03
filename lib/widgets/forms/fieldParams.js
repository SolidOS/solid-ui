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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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