"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldParams = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ns = _interopRequireDefault(require("../../ns"));

var _style = require("../../style");

var _fieldParams;

/**
 * The fieldParams object defines various constants
 * for use in various form fields. Depending on the
 * field in questions, different values may be read
 * from here.
 */
var fieldParams = (_fieldParams = {}, (0, _defineProperty2["default"])(_fieldParams, _ns["default"].ui('ColorField').uri, {
  size: 9,
  type: 'color',
  dt: 'color',
  pattern: /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/
}), (0, _defineProperty2["default"])(_fieldParams, _ns["default"].ui('DateField').uri, {
  size: 20,
  type: 'date',
  dt: 'date',
  pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/
}), (0, _defineProperty2["default"])(_fieldParams, _ns["default"].ui('DateTimeField').uri, {
  size: 20,
  type: 'date',
  dt: 'dateTime',
  pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/
}), (0, _defineProperty2["default"])(_fieldParams, _ns["default"].ui('TimeField').uri, {
  size: 10,
  type: 'time',
  dt: 'time',
  pattern: /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/
}), (0, _defineProperty2["default"])(_fieldParams, _ns["default"].ui('IntegerField').uri, {
  size: 12,
  style: 'text-align: right',
  dt: 'integer',
  pattern: /^\s*-?[0-9]+\s*$/
}), (0, _defineProperty2["default"])(_fieldParams, _ns["default"].ui('DecimalField').uri, {
  size: 12,
  style: 'text-align: right',
  dt: 'decimal',
  pattern: /^\s*-?[0-9]*(\.[0-9]*)?\s*$/
}), (0, _defineProperty2["default"])(_fieldParams, _ns["default"].ui('FloatField').uri, {
  size: 12,
  style: 'text-align: right',
  dt: 'float',
  pattern: /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/
}), (0, _defineProperty2["default"])(_fieldParams, _ns["default"].ui('SingleLineTextField').uri, {}), (0, _defineProperty2["default"])(_fieldParams, _ns["default"].ui('NamedNodeURIField').uri, {
  namedNode: true
}), (0, _defineProperty2["default"])(_fieldParams, _ns["default"].ui('TextField').uri, {}), (0, _defineProperty2["default"])(_fieldParams, _ns["default"].ui('PhoneField').uri, {
  size: 20,
  uriPrefix: 'tel:',
  pattern: /^\+?[\d-]+[\d]*$/
}), (0, _defineProperty2["default"])(_fieldParams, _ns["default"].ui('EmailField').uri, {
  size: 30,
  uriPrefix: 'mailto:',
  pattern: /^\s*.*@.*\..*\s*$/ // @@ Get the right regexp here

}), (0, _defineProperty2["default"])(_fieldParams, _ns["default"].ui('Comment').uri, {
  element: 'p',
  style: _style.commentStyle // was `padding: 0.1em 1.5em; color: ${formHeadingColor}; white-space: pre-wrap;`

}), (0, _defineProperty2["default"])(_fieldParams, _ns["default"].ui('Heading').uri, {
  element: 'h3',
  style: _style.formHeadingStyle // was: `font-size: 110%; font-weight: bold; color: ${formHeadingColor}; padding: 0.2em;`

}), _fieldParams);
exports.fieldParams = fieldParams;
//# sourceMappingURL=fieldParams.js.map