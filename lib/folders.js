"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFolder = deleteFolder;
exports.deleteRecursive = deleteRecursive;
var debug = _interopRequireWildcard(require("./debug"));
var _iconBase = require("./iconBase");
var _solidLogic = require("solid-logic");
var ns = _interopRequireWildcard(require("./ns"));
var rdf = _interopRequireWildcard(require("rdflib"));
var style = _interopRequireWildcard(require("./style"));
var widgets = _interopRequireWildcard(require("./widgets"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
/**      UI To Delete Folder and content
 *
 */
/* global confirm */

// pull in first avoid cross-refs

var UI = {
  icons: _iconBase.icons,
  ns: ns,
  rdf: rdf,
  style: style,
  widgets: widgets
};
function deleteRecursive(kb, folder) {
  return new Promise(function (resolve, _reject) {
    kb.fetcher.load(folder).then(function () {
      var promises = kb.each(folder, ns.ldp('contains')).map(function (file) {
        if (kb.holds(file, ns.rdf('type'), ns.ldp('BasicContainer'))) {
          return deleteRecursive(kb, file);
        } else {
          debug.log('deleteRecirsive file: ' + file);
          if (!confirm(' Really DELETE File ' + file)) {
            throw new Error('User aborted delete file');
          }
          return kb.fetcher.webOperation('DELETE', file.uri);
        }
      });
      debug.log('deleteRecirsive folder: ' + folder);
      if (!confirm(' Really DELETE folder ' + folder)) {
        throw new Error('User aborted delete file');
      }
      promises.push(kb.fetcher.webOperation('DELETE', folder.uri));
      Promise.all(promises).then(function (_res) {
        resolve();
      });
    });
  });
}

/** Iterate over files depth first
 *
 * @param folder - The folder whose contents we iterate over
 * @param store - The quadstore
 * @param action - returns a promise.  All the promises must be resolved
 */
function forAllFiles(folder, kb, action) {
  return new Promise(function (resolve, _reject) {
    kb.fetcher.load(folder).then(function () {
      var promises = kb.each(folder, ns.ldp('contains')).map(function (file) {
        if (kb.holds(file, ns.rdf('type'), ns.ldp('BasicContainer'))) {
          return forAllFiles(file, kb, action);
        } else {
          return action(file);
        }
      });
      promises.push(action(folder));
      Promise.all(promises).then(function (_res) {
        resolve();
      });
    });
  });
}

/** Delete Folder and contents
 *
 * @param {NamedNode} folder - The LDP container to be deleted
 * @param {DOMElement} containingElement - Where to put the user interface
 * @param {IndexedForumula} store - Quadstore (optional)
 * @param {Document} dom - The browser 'document' gloabl or equivalent (or iuse global)
 * @returns {DOMElement} - The control which has eben inserted in the
 */
/* global document */
function deleteFolder(folder, store, dom) {
  store = store || _solidLogic.solidLogicSingleton.store;
  if (typeof docuent !== 'undefined') {
    dom = dom || document;
  }
  var div = dom.createElement('div');
  var table = div.appendChild(dom.createElement('table'));
  var mainTR = table.appendChild(dom.createElement('tr'));
  mainTR.appendChild(dom.createElement('td')); // mainTD

  var p = mainTR.appendChild(dom.createElement('p'));
  p.textContent = "Are you sure you want to delete the folder ".concat(folder, "? This cannot be undone.");
  var buttonsTR = table.appendChild(dom.createElement('tr'));
  var buttonsTD1 = buttonsTR.appendChild(dom.createElement('td'));
  buttonsTR.appendChild(dom.createElement('td')); // buttonsTD2
  var buttonsTD3 = buttonsTR.appendChild(dom.createElement('td'));
  var cancel = buttonsTD1.appendChild(UI.widgets.cancelButton(dom));
  cancel.addEventListener('click', function (_event) {
    div.parentNode.removeChild(div);
  }, false);
  var doit = buttonsTD3.appendChild(UI.widgets.button(dom, UI.icons.iconBase + 'noun_925021.svg', 'Yes, delete'));
  doit.addEventListener('click', function (_event) {
    deleteThem(folder).then(function () {
      debug.log('All deleted.');
    });
  }, false);
  function deleteThem(folder) {
    return forAllFiles(folder, function (file) {
      return store.fetcher.webOperation('DELETE', file.uri);
    });
  }
  var count = 0;
  forAllFiles(folder, store, function () {
    count += 1;
  }) // Count files
  .then(function () {
    var msg = ' Files to delete: ' + count;
    debug.log(msg);
    p.textContent += msg;
  });
  return div;
}
//# sourceMappingURL=folders.js.map