"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preventBrowserDropEvents = preventBrowserDropEvents;
exports.preventDrag = preventDrag;
exports.handleDrop = handleDrop;
exports.shortNameForFolder = shortNameForFolder;
exports.ACLControlBox5 = ACLControlBox5;
exports.setGlobalWindow = setGlobalWindow;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var ns = _interopRequireWildcard(require("../ns"));

var utils = _interopRequireWildcard(require("../utils"));

var _acl = require("./acl");

var _accessController = require("./access-controller");

var _jss = require("../jss");

var _styles = require("./styles");

var _debug = require("../debug");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Functions for rendering the ACL User Interface.
 * See https://github.com/solid/userguide/blob/main/views/sharing/userguide.md#view
 * for a screenshot.
 * @packageDocumentation
 */
var global = window;
var preventBrowserDropEventsDone = Symbol('prevent double triggering of drop event');
/**
 * See https://coshx.com/preventing-drag-and-drop-disasters-with-a-chrome-userscript
 * Without this dropping anything onto a browser page will cause chrome etc to jump to diff page
 * throwing away all the user's work.
 *
 * In apps which may use drag and drop, this utility takes care of the fact
 * by default in a browser, an uncaught user drop into a browser window
 * causes the browser to lose all its work in that window and navigate to another page
 *
 * @param document  The DOM
 * @returns void
 */

function preventBrowserDropEvents(document) {
  (0, _debug.log)('preventBrowserDropEvents called.');

  if (typeof global !== 'undefined') {
    if (global[preventBrowserDropEventsDone]) return;
    global[preventBrowserDropEventsDone] = true;
  }

  document.addEventListener('drop', handleDrop, false);
  document.addEventListener('dragenter', preventDrag, false);
  document.addEventListener('dragover', preventDrag, false);
}
/** @internal */


function preventDrag(e) {
  e.stopPropagation();
  e.preventDefault();
}
/** @internal */


function handleDrop(e) {
  if (e.dataTransfer.files.length > 0) {
    if (!global.confirm('Are you sure you want to drop this file here? (Cancel opens it in a new tab)')) {
      e.stopPropagation();
      e.preventDefault();
      (0, _debug.log)('@@@@ document-level DROP suppressed: ' + e.dataTransfer.dropEffect);
    }
  }
}
/**
 * Get a folder's own filename in the directory tree. Also works for
 * domain names; the URL protocol ('https://') acts as the tree root
 * with short name '/' (see also test/unit/acl/acl-control.test.ts).
 *
 * ```typescript
 * shortNameForFolder($rdf.namedNode('http://example.com/some/folder/'))
 * // 'folder'
 *
 * shortNameForFolder($rdf.namedNode('http://example.com/some/folder'))
 * // 'folder'
 *
 * shortNameForFolder($rdf.namedNode('http://example.com/'))
 * // 'example.com'
 *
 * shortNameForFolder($rdf.namedNode('http://example.com'))
 * // 'example.com'
 *
 * shortNameForFolder($rdf.namedNode('http://'))
 * // '/'
 * ```
 *
 * It also works with relative URLs:
 * ```typescript
 * shortNameForFolder($rdf.namedNode('../folder/'))
 * // 'folder'
 * ```
 *
 * @param x  RDF Node for the folder URL
 * @returns  Short name for the folder
 */


function shortNameForFolder(x) {
  var str = x.uri; // Strip the trailing slash

  if (str.slice(-1) === '/') {
    str = str.slice(0, -1);
  } // Remove the path if present, keeping only the part
  // after the last slash.


  var slash = str.lastIndexOf('/');

  if (slash >= 0) {
    str = str.slice(slash + 1);
  } // Return the folder's filename, or '/' if nothing found
  // (but see https://github.com/solid/solid-ui/issues/196
  // regarding whether this happens at the domain root or
  // not)


  return str || '/';
}
/**
 * A wrapper that retrieves ACL data and uses it
 * to render an [[AccessController]] component.
 * Presumably the '5' is a version number of some sort,
 * but all we know is it was already called ACLControlBox5
 * when it was introduced into solid-ui in
 * https://github.com/solid/solid-ui/commit/948b874bd93e7bf5160e6e224821b888f07d15f3#diff-4192a29f38a0ababd563b36b47eba5bbR54
 */


function ACLControlBox5(subject, context, noun, kb) {
  var dom = context.dom;
  var doc = subject.doc(); // The ACL is actually to the doc describing the thing

  var classes = (0, _jss.getClasses)(dom.head, _styles.styles).classes;
  var container = dom.createElement('div');
  container.classList.add(classes.aclControlBoxContainer);
  var header = container.appendChild(dom.createElement('h1'));
  header.textContent = "Sharing for ".concat(noun, " ").concat(utils.label(subject));
  header.classList.add(classes.aclControlBoxHeader);
  var status = container.appendChild(dom.createElement('div'));
  status.classList.add(classes.aclControlBoxStatus);

  try {
    loadController(doc, kb, subject, noun, context, classes, dom, status).then(function (controller) {
      return container.appendChild(controller.render());
    });
  } catch (error) {
    status.innerText = error;
  }

  return container;
}

function loadController(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8) {
  return _loadController.apply(this, arguments);
}

function _loadController() {
  _loadController = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(doc, kb, subject, noun, context, classes, dom, status) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", new Promise(function (resolve, reject) {
              return (0, _acl.getACLorDefault)(doc, /*#__PURE__*/function () {
                var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(ok, isDirectACL, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc) {
                  var targetDirectory, targetIsProtected, prospectiveDefaultHolder, getController;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          getController = function _getController(prospectiveDefaultHolder) {
                            return new _accessController.AccessController(subject, noun, context, status, classes, targetIsProtected, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc, prospectiveDefaultHolder, kb, dom);
                          };

                          if (ok) {
                            _context.next = 3;
                            break;
                          }

                          return _context.abrupt("return", reject(new Error("Error reading ".concat(isDirectACL ? '' : ' default ', "ACL. status ").concat(targetDoc, ": ").concat(targetACLDoc))));

                        case 3:
                          targetDirectory = getDirectory(targetDoc);
                          targetIsProtected = isStorage(targetDoc, targetACLDoc, kb) || hasProtectedAcl(targetDoc);

                          if (!(!targetIsProtected && targetDirectory)) {
                            _context.next = 16;
                            break;
                          }

                          _context.prev = 6;
                          _context.next = 9;
                          return (0, _acl.getProspectiveHolder)(targetDirectory);

                        case 9:
                          prospectiveDefaultHolder = _context.sent;
                          return _context.abrupt("return", resolve(getController(prospectiveDefaultHolder)));

                        case 13:
                          _context.prev = 13;
                          _context.t0 = _context["catch"](6);
                          // No need to show this error in status, but good to warn about it in console
                          (0, _debug.warn)(_context.t0);

                        case 16:
                          return _context.abrupt("return", resolve(getController()));

                        case 17:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, null, [[6, 13]]);
                }));

                return function (_x9, _x10, _x11, _x12, _x13, _x14) {
                  return _ref.apply(this, arguments);
                };
              }());
            }));

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadController.apply(this, arguments);
}

function getDirectory(doc) {
  var str = doc.uri.split('#')[0];
  var p = str.slice(0, -1).lastIndexOf('/');
  var q = str.indexOf('//');
  return q >= 0 && p < q + 2 || p < 0 ? null : str.slice(0, p + 1);
}

function isStorage(doc, aclDoc, store) {
  // @@ TODO: The methods used for targetIsStorage are HACKs - it should not be relied upon, and work is
  // @@ underway to standardize a behavior that does not rely upon this hack
  // @@ hopefully fixed as part of https://github.com/solid/data-interoperability-panel/issues/10
  return store.holds(doc, ns.rdf('type'), ns.space('Storage'), aclDoc);
}

function hasProtectedAcl(targetDoc) {
  // @@ TODO: This is hacky way of knowing whether or not a certain ACL file can be removed
  // Hopefully we'll find a better, standardized solution to this - https://github.com/solid/specification/issues/37
  return targetDoc.uri === targetDoc.site().uri;
}
/** @internal */


function setGlobalWindow(window) {
  global = window;
}
//# sourceMappingURL=acl-control.js.map