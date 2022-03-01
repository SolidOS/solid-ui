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
'use strict';
/**
 * Provides a Solid client helper object (which exposes various static modules).
 * @module solidUi.js
 * @main solidUi.js
 */

/**
 * @class SolidUi
 * @static
 */
// REMOVE @ts-ignore as you migrate files to TypeScript

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "acl", {
  enumerable: true,
  get: function get() {
    return _index.acl;
  }
});
Object.defineProperty(exports, "aclControl", {
  enumerable: true,
  get: function get() {
    return _index.aclControl;
  }
});
Object.defineProperty(exports, "authn", {
  enumerable: true,
  get: function get() {
    return _solidLogic.authn;
  }
});
Object.defineProperty(exports, "create", {
  enumerable: true,
  get: function get() {
    return _index2.create;
  }
});
exports.dom = exports.createTypes = void 0;
Object.defineProperty(exports, "icons", {
  enumerable: true,
  get: function get() {
    return _iconBase.icons;
  }
});
Object.defineProperty(exports, "infiniteMessageArea", {
  enumerable: true,
  get: function get() {
    return _infinite.infiniteMessageArea;
  }
});
Object.defineProperty(exports, "initFooter", {
  enumerable: true,
  get: function get() {
    return _footer.initFooter;
  }
});
Object.defineProperty(exports, "initHeader", {
  enumerable: true,
  get: function get() {
    return _header.initHeader;
  }
});
exports.login = exports.log = exports.language = void 0;
Object.defineProperty(exports, "matrix", {
  enumerable: true,
  get: function get() {
    return _index3.matrix;
  }
});
Object.defineProperty(exports, "media", {
  enumerable: true,
  get: function get() {
    return _index4.media;
  }
});
Object.defineProperty(exports, "messageArea", {
  enumerable: true,
  get: function get() {
    return _messageArea.messageArea;
  }
});
exports.rdf = exports.preferences = exports.participation = exports.pad = exports.ns = void 0;
Object.defineProperty(exports, "store", {
  enumerable: true,
  get: function get() {
    return _solidLogic.store;
  }
});
exports.style = void 0;
Object.defineProperty(exports, "table", {
  enumerable: true,
  get: function get() {
    return _table.renderTableViewPane;
  }
});
exports.utils = exports.tabs = void 0;
Object.defineProperty(exports, "versionInfo", {
  enumerable: true,
  get: function get() {
    return _versionInfo["default"];
  }
});
exports.widgets = void 0;

var rdf = _interopRequireWildcard(require("rdflib"));

exports.rdf = rdf;

var ns = _interopRequireWildcard(require("./ns"));

exports.ns = ns;

var _index = require("./acl/index");

var _index2 = require("./create/index");

var _iconBase = require("./iconBase");

var language = _interopRequireWildcard(require("./widgets/forms/autocomplete/language"));

exports.language = language;

var log = _interopRequireWildcard(require("./log"));

exports.log = log;

var _index3 = require("./matrix/index");

var _index4 = require("./media/index");

var _messageArea = require("./messageArea");

var _infinite = require("./chat/infinite");

var pad = _interopRequireWildcard(require("./pad"));

exports.pad = pad;

var participation = _interopRequireWildcard(require("./participation"));

exports.participation = participation;

var preferences = _interopRequireWildcard(require("./preferences"));

exports.preferences = preferences;

var style = _interopRequireWildcard(require("./style"));

exports.style = style;

var _table = require("./table");

var tabs = _interopRequireWildcard(require("./tabs"));

exports.tabs = tabs;

var utils = _interopRequireWildcard(require("./utils"));

exports.utils = utils;

var login = _interopRequireWildcard(require("./login/login"));

exports.login = login;

var widgets = _interopRequireWildcard(require("./widgets/index"));

exports.widgets = widgets;

var _versionInfo = _interopRequireDefault(require("./versionInfo"));

var _header = require("./header");

var _footer = require("./footer");

var createTypes = _interopRequireWildcard(require("./create/types"));

exports.createTypes = createTypes;

var _solidLogic = require("solid-logic");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// pull in first avoid cross-refs
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
// @ts-ignore
var dom = window ? window.document : null; // Idea that UI.dom can be adapted in non-browser environments

exports.dom = dom;

if (typeof window !== 'undefined') {
  ;
  window.UI = {
    authn: _solidLogic.authn,
    store: _solidLogic.store,
    ns: ns,
    rdf: rdf,
    acl: _index.acl,
    aclControl: _index.aclControl,
    create: _index2.create,
    createTypes: createTypes,
    dom: dom,
    icons: _iconBase.icons,
    language: language,
    log: log,
    login: login,
    matrix: _index3.matrix,
    media: _index4.media,
    messageArea: _messageArea.messageArea,
    infiniteMessageArea: _infinite.infiniteMessageArea,
    pad: pad,
    participation: participation,
    preferences: preferences,
    style: style,
    table: _table.renderTableViewPane,
    tabs: tabs,
    utils: utils,
    widgets: widgets,
    versionInfo: _versionInfo["default"],
    initHeader: _header.initHeader,
    initFooter: _footer.initFooter
  }; // Simpler access by non-node scripts
} // this variables are directly used in the storybook
//# sourceMappingURL=index.js.map