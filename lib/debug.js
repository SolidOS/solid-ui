"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = error;
exports.log = log;
exports.trace = trace;
exports.warn = warn;
function log() {
  var _console;
  // eslint-disable-next-line no-console
  (_console = console).log.apply(_console, arguments);
}
function warn() {
  var _console2;
  // eslint-disable-next-line no-console
  (_console2 = console).warn.apply(_console2, arguments);
}
function error() {
  var _console3;
  // eslint-disable-next-line no-console
  (_console3 = console).error.apply(_console3, arguments);
}
function trace() {
  var _console4;
  // eslint-disable-next-line no-console
  (_console4 = console).trace.apply(_console4, arguments);
}
//# sourceMappingURL=debug.js.map