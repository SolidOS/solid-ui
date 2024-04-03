"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.label = label;
var log = _interopRequireWildcard(require("../log"));
var _solidLogic = require("solid-logic");
var ns = _interopRequireWildcard(require("../ns"));
var rdf = _interopRequireWildcard(require("rdflib"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
// pull in first avoid cross-refs

var UI = {
  log: log,
  ns: ns,
  rdf: rdf
};

// This ubiquitous function returns the best label for a thing
//
// The hacks in this code make a major difference to the usability
function label(thing) {
  var initialCap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  function doCap(label) {
    if (initialCap) {
      return label.slice(0, 1).toUpperCase() + label.slice(1);
    }
    return label;
  }
  function cleanUp(label) {
    var result = '';
    if (label.slice(-1) === '/') label = label.slice(0, -1); // chop trailing slash
    for (var i = 0; i < label.length; i++) {
      if (label[i] === '_' || label[i] === '-') {
        result += ' ';
        continue;
      }
      result += label[i];
      if (i + 1 < label.length && label[i].toUpperCase() !== label[i] && label[i + 1].toLowerCase() !== label[i + 1]) {
        result += ' ';
      }
    }
    if (result.slice(0, 4) === 'has ') result = result.slice(4);
    return doCap(result);
  }
  var label = getWellKnownLabel(thing);
  if (label) {
    return doCap(label.value);
  }

  // Default to label just generated from the URI

  if (thing.termType === 'BlankNode') {
    return '...';
  }
  if (thing.termType === 'Collection') {
    return '(' + thing.elements.length + ')';
  }
  var s = thing.uri;
  if (typeof s === 'undefined') return thing.toString(); // can't be a symbol
  // s = decodeURI(s) // This can crash is random valid @ signs are presentation
  // The idea was to clean up eg URIs encoded in query strings
  // Also encoded character in what was filenames like @ [] {}
  try {
    s = s.split('/').map(decodeURIComponent).join('/'); // If it is properly encoded
  } catch (e) {
    // try individual decoding of ASCII code points
    for (var i = s.length - 3; i > 0; i--) {
      var hex = '0123456789abcefABCDEF'; // The while upacks multiple layers of encoding
      while (s[i] === '%' && hex.indexOf(s[i + 1]) >= 0 && hex.indexOf(s[i + 2]) >= 0) {
        s = s.slice(0, i) + String.fromCharCode(parseInt(s.slice(i + 1, i + 3), 16)) + s.slice(i + 3);
      }
    }
  }
  s = slice(s, '/profile/card#me');
  s = slice(s, '#this');
  s = slice(s, '#me');
  var hash = s.indexOf('#');
  if (hash >= 0) return cleanUp(s.slice(hash + 1));

  // Eh? Why not do this? e.g. dc:title needs it only trim URIs, not rdfs:labels
  var slash = s.lastIndexOf('/', s.length - 2); // (len-2) excludes trailing slash
  if (slash >= 0 && slash < thing.uri.length) return cleanUp(s.slice(slash + 1));
  return doCap(decodeURIComponent(thing.uri));
}
function slice(s, suffix) {
  var length = suffix.length * -1;
  if (s.slice(length) === suffix) {
    return s.slice(0, length);
  }
  return s;
}

// Hard coded known label predicates
//  @@ TBD: Add subproperties of rdfs:label
function getWellKnownLabel(thing) {
  return _solidLogic.store.any(thing, UI.ns.ui('label')) ||
  // Prioritize ui:label
  _solidLogic.store.any(thing, UI.ns.link('message')) || _solidLogic.store.any(thing, UI.ns.vcard('fn')) || _solidLogic.store.any(thing, UI.ns.foaf('name')) || _solidLogic.store.any(thing, UI.ns.dct('title')) || _solidLogic.store.any(thing, UI.ns.dc('title')) || _solidLogic.store.any(thing, UI.ns.rss('title')) || _solidLogic.store.any(thing, UI.ns.contact('fullName')) || _solidLogic.store.any(thing, _solidLogic.store.sym('http://www.w3.org/2001/04/roadmap/org#name')) || _solidLogic.store.any(thing, UI.ns.cal('summary')) || _solidLogic.store.any(thing, UI.ns.foaf('nick')) || _solidLogic.store.any(thing, UI.ns.as('name')) || _solidLogic.store.any(thing, UI.ns.schema('name')) || _solidLogic.store.any(thing, UI.ns.rdfs('label')) || _solidLogic.store.any(thing, _solidLogic.store.sym('http://www.w3.org/2004/02/skos/core#prefLabel'));
}
//# sourceMappingURL=label.js.map