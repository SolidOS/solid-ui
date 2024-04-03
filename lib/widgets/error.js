"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorMessageBlock = errorMessageBlock;
var _widgets = require("../widgets");
var style = _interopRequireWildcard(require("../style"));
var _styleConstants = _interopRequireDefault(require("../styleConstants"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/**
 * Create an error message block
 * @param dom The DOM on which dom.createElement will be called
 * @param err The error message string to display (or an error object)
 * @param backgroundColor Background color. Default: '#fee'
 * @param err2 Is the second param is a string, you can put the original Error in here
 * @returns A div element with the err string
 *
 * This will return a DOM element you can put in the UI as a notice for the user
 *  Meanwhile the stack is dumped to the console for the developer, so you actually know
 *  where it happened!
 */
/* eslint-disable no-console */

function errorMessageBlock(dom, err, backgroundColor, err2) {
  var div = dom.createElement('div');

  /* tslint:disable-next-line */ // Too complex for TS?
  // @ts-ignore
  var errorObject = err2 || err instanceof Error ? err : null;
  if (errorObject) {
    console.error("errorMessageBlock: ".concat(errorObject, " at: ").concat(errorObject.stack || '??'), errorObject); // @@ pick one
    div.textContent = errorObject.message;
  } else {
    div.textContent = err;
  }
  div.appendChild((0, _widgets.cancelButton)(dom, function () {
    if (div.parentNode) div.parentNode.removeChild(div);
  })).style = style.errorCancelButton;
  div.setAttribute('style', style.errorMessageBlockStyle);
  div.style.backgroundColor = backgroundColor || _styleConstants["default"].defaultErrorBackgroundColor;
  return div;
}
//# sourceMappingURL=error.js.map