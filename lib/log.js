"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.msg = msg;
exports.warn = warn;
exports.debug = debug;
exports.info = info;
exports.error = error;
exports.success = success;
exports.alert = alert;
exports.clear = clear;
exports.setLevel = setLevel;
exports.dumpHTML = dumpHTML;
exports.logAscending = logAscending;
exports.logDescending = logDescending;
exports.escapeForXML = escapeForXML;
exports.setInternals = setInternals;
exports.LogLevel = void 0;
// ///////////////////////  Logging
//
// bitmask levels
// const TNONE = 0

/** @internal */
var TERROR = 1;
/** @internal */

var TWARN = 2;
/** @internal */

var TMESG = 4;
/** @internal */

var TSUCCESS = 8;
/** @internal */

var TINFO = 16;
/** @internal */

var TDEBUG = 32;
/** @internal */

var TALL = 63;
/** @internal */

var LogLevel;
/** @internal */

exports.LogLevel = LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["Error"] = TERROR] = "Error";
  LogLevel[LogLevel["Warning"] = TWARN] = "Warning";
  LogLevel[LogLevel["Message"] = TMESG] = "Message";
  LogLevel[LogLevel["Success"] = TSUCCESS] = "Success";
  LogLevel[LogLevel["Info"] = TINFO] = "Info";
  LogLevel[LogLevel["Debug"] = TDEBUG] = "Debug";
  LogLevel[LogLevel["All"] = TALL] = "All";
})(LogLevel || (exports.LogLevel = LogLevel = {}));

var _level = TERROR + TWARN + TMESG;
/** @internal */


var _ascending = false;
/** @internal */

var _dom = document; // must be able to override for tests

/** @internal */

var _window = window; // must be able to override for tests

/** @internal */

function log(str) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TMESG;
  var typestr = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'mesg';
  if (!(_level & type)) return; // bitmask

  if (typeof _dom !== 'undefined') {
    var logArea = _dom.getElementById('status');

    if (!logArea) return;

    var addendum = _dom.createElement('span');

    addendum.setAttribute('class', typestr);
    var now = new Date();
    addendum.innerHTML = "".concat(now.getHours(), ":").concat(now.getMinutes(), ":").concat(now.getSeconds(), " [").concat(typestr, "] ").concat(escapeForXML(str), "<br/>");

    if (_ascending) {
      logArea.insertBefore(addendum, logArea.firstChild);
    } else {
      logArea.appendChild(addendum);
    }
  } else if (typeof console !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log(str);
  }
}
/**
 * Adds a message to the element with id "status". The messages are prepended with
 * time and type of message, in this case [mesg].
 */


function msg(message) {
  log(message);
}
/**
 * Adds a warning message to the element with id "status". The messages are
 * prepended with time and type of message, in this case [warn].
 */


function warn(message) {
  log(message, TWARN, 'warn');
}
/**
 * Adds a debugging message to the element with id "status". The messages are
 * prepended with time and type of message, in this case [dbug].
 */


function debug(message) {
  log(message, TDEBUG, 'dbug');
}
/**
 * Adds a info message to the element with id "status". The messages are
 * prepended with time and type of message, in this case [info].
 */


function info(message) {
  log(message, TINFO, 'info');
}
/**
 * Adds a error to the element with id "status". The messages are
 * prepended with time and type of message, in this case [eror].
 */


function error(message) {
  log(message, TERROR, 'eror');
}
/**
 * Adds a success message to the element with id "status". The messages are
 * prepended with time and type of message, in this case [good].
 */


function success(message) {
  log(message, TSUCCESS, 'good');
}
/**
 * Uses the global alert to send an alert. If global alert is not available, it
 * will output the message using the method [[warning]]s.
 */


function alert(message) {
  if (_window && typeof _window.alert !== 'undefined') {
    _window.alert(message);
  } else {
    warn(message);
  }
}
/**
 * Will clear the content of the element with id "status".
 */


function clear() {
  var _dom2;

  var logArea = (_dom2 = _dom) === null || _dom2 === void 0 ? void 0 : _dom2.getElementById('status');
  if (!logArea) return;
  logArea.innerHTML = '';
}
/**
 * Lets you configure which types of messages will be shown. The module uses
 * [bitmask](https://en.wikipedia.org/wiki/Mask_(computing)) to filter which
 * types of messages should be shown. E.g. if you only want warning messages
 * to be shown, pass 2 to the function, if you want warning and success to be
 * shown, pass 10 (2+8). By passing the sum of all, 63, you'll show all
 * types of messages.
 *
 * - Error: 1
 * - Warning: 2
 * - Message: 4
 * - Success: 8
 * - Info: 16
 * - Debug: 32
 */


function setLevel(level) {
  _level = TALL;
  debug('Log level is now ' + level);
  _level = level;
}
/**
 * Will dump the current HTML using the [[debug]] method.
 */


function dumpHTML() {
  var _dom3, _dom3$body;

  if (!_dom) return;
  var level = _level;
  _level = TALL;
  debug(((_dom3 = _dom) === null || _dom3 === void 0 ? void 0 : (_dom3$body = _dom3.body) === null || _dom3$body === void 0 ? void 0 : _dom3$body.innerHTML) || '');
  _level = level;
}
/**
 * Will start prepending messages the list of log messages.
 */


function logAscending() {
  _ascending = true;
}
/**
 * Will start appending messages the list of log messages. (This is default
 * behavior.)
 */


function logDescending() {
  _ascending = false;
}
/** @internal */


function escapeForXML(str) {
  // can be replaced with function utils module when migrating
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
/** @internal */


function setInternals(window, document) {
  _window = window;
  _dom = document;
}
//# sourceMappingURL=log.js.map