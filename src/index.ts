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

// REMOVE @ts-ignore as you migrate files to TypeScript
import * as rdf from 'rdflib' // pull in first avoid cross-refs
// @ts-ignore
import * as ns from './ns'
// @ts-ignore
import * as acl from './acl'
// @ts-ignore
import * as aclControl from './acl-control'
// @ts-ignore
import * as authn from './signin'
// @ts-ignore
import * as create from './create'
// @ts-ignore
import * as icons from './iconBase'
// @ts-ignore
import * as log from './log'
// @ts-ignore
import * as matrix from './matrix'
// @ts-ignore
import * as media from './media-capture'
// @ts-ignore
import * as messageArea from './messageArea'
// @ts-ignore
import { infiniteMessageArea } from './chat/infinite'
// @ts-ignore
import * as pad from './pad'
// @ts-ignore
import * as preferences from './preferences'
// @ts-ignore
import * as store from './store'
// @ts-ignore
import * as style from './style'
// @ts-ignore
import * as table from './table'
// @ts-ignore
import * as tabs from './tabs'
// @ts-ignore
import * as utils from './utils'
// @ts-ignore
import * as widgets from './widgets'

const UI = {
  ns,
  rdf,
  acl,
  aclControl,
  authn,
  create,
  dom: window.document, // Idea that UI.dom can be adapted in non-browser environments
  icons,
  log,
  matrix,
  media,
  messageArea,
  infiniteMessageArea,
  pad,
  preferences,
  store,
  style,
  table,
  tabs,
  utils,
  widgets
}

if (typeof window !== 'undefined') {
  ;(<any>window).UI = UI // Simpler access by non-node scripts
}
export default UI
