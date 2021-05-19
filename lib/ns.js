"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _solidNamespace = _interopRequireDefault(require("solid-namespace"));

var $rdf = _interopRequireWildcard(require("rdflib"));

// Namespaces we commonly use and have common prefixes for around Solid
//
// Delegate to this which takes RDFlib as param.
module.exports = (0, _solidNamespace["default"])($rdf); // export * from ns2
// ends
//# sourceMappingURL=ns.js.map