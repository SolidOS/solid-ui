"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorMessageBlock = errorMessageBlock;
var _widgets = require("../widgets");
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
  })).style = 'width: 2em; height: 2em; align: right;';
  div.setAttribute('style', 'margin: 0.1em; padding: 0.5em; border: 0.05em solid gray; background-color: ' + (backgroundColor || '#fee') + '; color:black;');
  return div;
}
//# sourceMappingURL=error.js.map