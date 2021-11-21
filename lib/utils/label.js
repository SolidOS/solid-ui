"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.label = label;

var log = _interopRequireWildcard(require("../log"));

var _logic = require("../logic");

var ns = _interopRequireWildcard(require("../ns"));

var rdf = _interopRequireWildcard(require("rdflib"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// pull in first avoid cross-refs
var UI = {
  log: log,
  ns: ns,
  rdf: rdf,
  store: _logic.store
}; // This ubiquitous function returns the best label for a thing
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
  } // Default to label just generated from the URI


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
  if (hash >= 0) return cleanUp(s.slice(hash + 1)); // Eh? Why not do this? e.g. dc:title needs it only trim URIs, not rdfs:labels

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
} // Hard coded known label predicates
//  @@ TBD: Add subproperties of rdfs:label


function getWellKnownLabel(thing) {
  return _logic.store.any(thing, UI.ns.ui('label')) || // Prioritize ui:label
  _logic.store.any(thing, UI.ns.link('message')) || _logic.store.any(thing, UI.ns.vcard('fn')) || _logic.store.any(thing, UI.ns.foaf('name')) || _logic.store.any(thing, UI.ns.dct('title')) || _logic.store.any(thing, UI.ns.dc('title')) || _logic.store.any(thing, UI.ns.rss('title')) || _logic.store.any(thing, UI.ns.contact('fullName')) || _logic.store.any(thing, _logic.store.sym('http://www.w3.org/2001/04/roadmap/org#name')) || _logic.store.any(thing, UI.ns.cal('summary')) || _logic.store.any(thing, UI.ns.foaf('nick')) || _logic.store.any(thing, UI.ns.as('name')) || _logic.store.any(thing, UI.ns.schema('name')) || _logic.store.any(thing, UI.ns.rdfs('label'));
}
//# sourceMappingURL=label.js.map