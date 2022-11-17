"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getClasses = getClasses;
exports.getStylesheet = getStylesheet;
var _jss = require("jss");
var _jssPresetDefault = _interopRequireDefault(require("jss-preset-default"));
/**
 * Contains [[getClasses]] and [[getStylesheet]] functions,
 * usable as wrappers around JSS (A CSS authoring tool).
 * See https://cssinjs.org/
 * @packageDocumentation
 */

var stylesheetsMap = new Map();

/**
 * returns a StyleSheet object.
 * See https://cssinjs.org/ for more info about JSS.
 * (despite the name, see https://github.com/solidos/solid-ui/issues/199)
 */
function getClasses(insertionPoint, styles) {
  var stylesheet = getStylesheet(insertionPoint);
  return stylesheet.createStyleSheet(styles).attach();
}

/**
 * returns a JSS object.
 * See https://cssinjs.org/ for more info about JSS.
 * (despite the name, see https://github.com/solidos/solid-ui/issues/199)
 */
function getStylesheet(insertionPoint) {
  var cachedStylesheet = stylesheetsMap.get(insertionPoint);
  if (cachedStylesheet) {
    return cachedStylesheet;
  }
  var stylesheet = (0, _jss.create)({
    insertionPoint: insertionPoint,
    plugins: (0, _jssPresetDefault["default"])().plugins
  });
  stylesheetsMap.set(insertionPoint, stylesheet);
  return stylesheet;
}
//# sourceMappingURL=index.js.map