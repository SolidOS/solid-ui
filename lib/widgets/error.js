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
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
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