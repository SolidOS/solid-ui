"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fieldParams = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var ns = _interopRequireWildcard(require("../../ns"));

var _style = require("../../style");

var _fieldParams;

/**
 * The fieldParams object defines various constants
 * for use in various form fields. Depending on the
 * field in questions, different values may be read
 * from here.
 */
var fieldParams = (_fieldParams = {}, (0, _defineProperty2["default"])(_fieldParams, ns.ui('ColorField').uri, {
  size: 9,
  type: 'color',
  dt: 'color',
  pattern: /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/
}), (0, _defineProperty2["default"])(_fieldParams, ns.ui('DateField').uri, {
  size: 20,
  type: 'date',
  dt: 'date',
  pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/
}), (0, _defineProperty2["default"])(_fieldParams, ns.ui('DateTimeField').uri, {
  size: 20,
  type: 'date',
  dt: 'dateTime',
  pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/
}), (0, _defineProperty2["default"])(_fieldParams, ns.ui('TimeField').uri, {
  size: 10,
  type: 'time',
  dt: 'time',
  pattern: /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/
}), (0, _defineProperty2["default"])(_fieldParams, ns.ui('IntegerField').uri, {
  size: 12,
  style: 'text-align: right',
  dt: 'integer',
  pattern: /^\s*-?[0-9]+\s*$/
}), (0, _defineProperty2["default"])(_fieldParams, ns.ui('DecimalField').uri, {
  size: 12,
  style: 'text-align: right',
  dt: 'decimal',
  pattern: /^\s*-?[0-9]*(\.[0-9]*)?\s*$/
}), (0, _defineProperty2["default"])(_fieldParams, ns.ui('FloatField').uri, {
  size: 12,
  style: 'text-align: right',
  dt: 'float',
  pattern: /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/
}), (0, _defineProperty2["default"])(_fieldParams, ns.ui('SingleLineTextField').uri, {}), (0, _defineProperty2["default"])(_fieldParams, ns.ui('NamedNodeURIField').uri, {
  namedNode: true
}), (0, _defineProperty2["default"])(_fieldParams, ns.ui('TextField').uri, {}), (0, _defineProperty2["default"])(_fieldParams, ns.ui('PhoneField').uri, {
  size: 20,
  uriPrefix: 'tel:',
  pattern: /^\+?[\d-]+[\d]*$/
}), (0, _defineProperty2["default"])(_fieldParams, ns.ui('EmailField').uri, {
  size: 30,
  uriPrefix: 'mailto:',
  pattern: /^\s*.*@.*\..*\s*$/ // @@ Get the right regexp here

}), (0, _defineProperty2["default"])(_fieldParams, ns.ui('Group').uri, {
  style: _style.formGroupStyle
}), (0, _defineProperty2["default"])(_fieldParams, ns.ui('Comment').uri, {
  element: 'p',
  style: _style.commentStyle // was `padding: 0.1em 1.5em; color: ${formHeadingColor}; white-space: pre-wrap;`

}), (0, _defineProperty2["default"])(_fieldParams, ns.ui('Heading').uri, {
  element: 'h3',
  style: _style.formHeadingStyle // was: `font-size: 110%; font-weight: bold; color: ${formHeadingColor}; padding: 0.2em;`

}), _fieldParams);
exports.fieldParams = fieldParams;
//# sourceMappingURL=fieldParams.js.map