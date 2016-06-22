/*
The MIT License (MIT)

Copyright (c) 2015-2016 Solid

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


If you would like to know more about the solid Solid project, please see
https://github.com/solid/solid
*/
'use strict'
/**
 * Provides a Solid client helper object (which exposes various static modules).
 * @module solidUi.js
 * @main solidUi.js
 */

/**
 * @class SolidUi
 * @static
 */

var rdf = require('rdflib') // pull in first avoid cross-refs
var ns = require('./lib/ns.js')

var UI = {
  acl: require('./lib/acl'),
  aclControl: require('./lib/acl-control'),
  icons: require('./lib/iconBase.js'),
  log: require('./lib/log.js'),
  matrix: require('./lib/matrix'),
  messageArea: require('./lib/messageArea'),
  ns: ns,
  pad: require('./lib/pad'),
  rdf:  rdf,
  signin: require('./lib/signin'),
  store: require('./lib/store'),
  table: require('./lib/table'),
  tabs: require('./lib/tabs'),
  utils: require('./lib/utils'),
  widgets: require('./lib/widgets')
}

module.exports = UI
