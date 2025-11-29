// ///////////////////////  Logging
//
// bitmask levels
// const TNONE = 0
/** @internal */
const TERROR = 1;
/** @internal */
const TWARN = 2;
/** @internal */
const TMESG = 4;
/** @internal */
const TSUCCESS = 8;
/** @internal */
const TINFO = 16;
/** @internal */
const TDEBUG = 32;
/** @internal */
const TALL = 63;
/** @internal */
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Error"] = 1] = "Error";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Message"] = 4] = "Message";
    LogLevel[LogLevel["Success"] = 8] = "Success";
    LogLevel[LogLevel["Info"] = 16] = "Info";
    LogLevel[LogLevel["Debug"] = 32] = "Debug";
    LogLevel[LogLevel["All"] = 63] = "All";
})(LogLevel || (LogLevel = {}));
/** @internal */
let _level = TERROR + TWARN + TMESG;
/** @internal */
let _ascending = false;
/** @internal */
let _dom = document; // must be able to override for tests
/** @internal */
let _window = window; // must be able to override for tests
/** @internal */
function log(str, type = TMESG, typestr = 'mesg') {
    if (!(_level & type))
        return; // bitmask
    if (typeof _dom !== 'undefined') {
        const logArea = _dom.getElementById('status');
        if (!logArea)
            return;
        const addendum = _dom.createElement('span');
        addendum.setAttribute('class', typestr);
        const now = new Date();
        addendum.innerHTML = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} [${typestr}] ${escapeForXML(str)}<br/>`;
        if (_ascending) {
            logArea.insertBefore(addendum, logArea.firstChild);
        }
        else {
            logArea.appendChild(addendum);
        }
    }
    else if (typeof console !== 'undefined') {
        console.log(str);
    }
}
/**
 * Adds a message to the element with id "status". The messages are prepended with
 * time and type of message, in this case [mesg].
 */
export function msg(message) {
    log(message);
}
/**
 * Adds a warning message to the element with id "status". The messages are
 * prepended with time and type of message, in this case [warn].
 */
export function warn(message) {
    log(message, TWARN, 'warn');
}
/**
 * Adds a debugging message to the element with id "status". The messages are
 * prepended with time and type of message, in this case [dbug].
 */
export function debug(message) {
    log(message, TDEBUG, 'dbug');
}
/**
 * Adds a info message to the element with id "status". The messages are
 * prepended with time and type of message, in this case [info].
 */
export function info(message) {
    log(message, TINFO, 'info');
}
/**
 * Adds a error to the element with id "status". The messages are
 * prepended with time and type of message, in this case [eror].
 */
export function error(message) {
    log(message, TERROR, 'eror');
}
/**
 * Adds a success message to the element with id "status". The messages are
 * prepended with time and type of message, in this case [good].
 */
export function success(message) {
    log(message, TSUCCESS, 'good');
}
/**
 * Uses the global alert to send an alert. If global alert is not available, it
 * will output the message using the method [[warning]]s.
 */
export function alert(message) {
    if (_window && typeof _window.alert !== 'undefined') {
        _window.alert(message);
    }
    else {
        warn(message);
    }
}
/**
 * Will clear the content of the element with id "status".
 */
export function clear() {
    const logArea = _dom === null || _dom === void 0 ? void 0 : _dom.getElementById('status');
    if (!logArea)
        return;
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
export function setLevel(level) {
    _level = TALL;
    debug('Log level is now ' + level);
    _level = level;
}
/**
 * Will dump the current HTML using the [[debug]] method.
 */
export function dumpHTML() {
    var _a;
    if (!_dom)
        return;
    const level = _level;
    _level = TALL;
    debug(((_a = _dom === null || _dom === void 0 ? void 0 : _dom.body) === null || _a === void 0 ? void 0 : _a.innerHTML) || '');
    _level = level;
}
/**
 * Will start prepending messages the list of log messages.
 */
export function logAscending() {
    _ascending = true;
}
/**
 * Will start appending messages the list of log messages. (This is default
 * behavior.)
 */
export function logDescending() {
    _ascending = false;
}
/** @internal */
export function escapeForXML(str) {
    // can be replaced with function utils module when migrating
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
/** @internal */
export function setInternals(window, document) {
    _window = window;
    _dom = document;
}
//# sourceMappingURL=log.js.map