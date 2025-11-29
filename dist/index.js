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
https://github.com/solidos/solid
*/
'use strict';
/**
 * Provides a Solid client helper object (which exposes various static modules).
 * @module UI.js
 * @main UI.js
 */
/**
 * @class UI
 * @static
 */
// REMOVE @ts-ignore as you migrate files to TypeScript
// @ts-ignore
import ns from './ns';
import { acl, aclControl } from './acl/index';
import { create } from './create/index';
// @ts-ignore
import { icons } from './iconBase';
import * as language from './widgets/forms/autocomplete/language';
import * as log from './log';
import { matrix } from './matrix/index';
import { media } from './media/index';
// @ts-ignore
import { messageArea } from './messageArea';
// @ts-ignore
import { infiniteMessageArea } from './chat/infinite';
// @ts-ignore
import * as pad from './pad';
// @ts-ignore
import * as participation from './participation';
// @ts-ignore
import * as preferences from './preferences';
// @ts-ignore
import { style } from './style';
// @ts-ignore
import { renderTableViewPane as table } from './table';
import * as tabs from './tabs';
// @ts-ignore
import * as utils from './utils';
import * as login from './login/login';
import * as widgets from './widgets/index';
import { initHeader } from './header';
import { initFooter } from './footer';
import * as createTypes from './create/types';
const dom = window ? window.document : null; // Idea that UI.dom can be adapted in non-browser environments
if (typeof window !== 'undefined') {
    ;
    window.UI = {
        ns,
        acl,
        aclControl,
        create,
        createTypes,
        dom,
        icons,
        language,
        log,
        login,
        matrix,
        media,
        messageArea,
        infiniteMessageArea,
        pad,
        participation,
        preferences,
        style,
        table,
        tabs,
        utils,
        widgets,
        initHeader,
        initFooter
    }; // Simpler access by non-node scripts
}
// this variables are directly used in the storybook
export { ns, acl, aclControl, create, createTypes, dom, icons, language, log, login, matrix, media, messageArea, infiniteMessageArea, pad, participation, preferences, style, table, tabs, utils, widgets, initHeader, initFooter };
//# sourceMappingURL=index.js.map