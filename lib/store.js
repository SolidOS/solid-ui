"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var debug = _interopRequireWildcard(require("./debug"));

var _solidAuthClient = require("solid-auth-client");

// This module of solid-ui has a main quadstore for the app to use
//
var rdf = require('rdflib');

var store = module.exports = rdf.graph(); // Make a Quad store

rdf.fetcher(store, {
  fetch: _solidAuthClient.fetch
}); // Attach a web I/O module, store.fetcher

store.updater = new rdf.UpdateManager(store); // Add real-time live updates store.updater

debug.log('Unique quadstore initialized.'); // ends
//# sourceMappingURL=store.js.map