/**
 * Provides a Solid client helper object (which exposes various static modules).
 * @module UI.js
 * @main UI.js
 */
/**
 * @class UI
 * @static
 */
import ns from './ns';
import { acl, aclControl } from './acl/index';
import { create } from './create/index';
import { icons } from './iconBase';
import * as language from './widgets/forms/autocomplete/language';
import * as log from './log';
import { matrix } from './matrix/index';
import { media } from './media/index';
import { messageArea } from './messageArea';
import { infiniteMessageArea } from './chat/infinite';
import * as pad from './pad';
import * as participation from './participation';
import * as preferences from './preferences';
import { style } from './style';
import { renderTableViewPane as table } from './table';
import * as tabs from './tabs';
import * as utils from './utils';
import * as login from './login/login';
import * as widgets from './widgets/index';
import { initHeader } from './header';
import { initFooter } from './footer';
import * as createTypes from './create/types';
declare const dom: Document | null;
export { ns, acl, aclControl, create, createTypes, dom, icons, language, log, login, matrix, media, messageArea, infiniteMessageArea, pad, participation, preferences, style, table, tabs, utils, widgets, initHeader, initFooter };
export type { CreateContext, NewAppInstanceOptions } from './create/types';
//# sourceMappingURL=index.d.ts.map