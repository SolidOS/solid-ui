/**
 * Provides a Solid client helper object (which exposes various static modules).
 * @module solidUi.js
 * @main solidUi.js
 */
/**
 * @class SolidUi
 * @static
 */
import * as rdf from 'rdflib';
import * as ns from './ns';
import { acl, aclControl } from './acl/index';
import { authn } from './authn/index';
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
import { solidLogicSingleton } from './logic';
import * as style from './style';
import { renderTableViewPane as table } from './table';
import * as tabs from './tabs';
import * as utils from './utils';
import * as widgets from './widgets/index';
import versionInfo from './versionInfo';
import { initHeader } from './header';
import { initFooter } from './footer';
declare const dom: Document | null;
declare const store: rdf.LiveStore;
export { ns, rdf, acl, aclControl, authn, create, dom, icons, language, log, matrix, media, messageArea, infiniteMessageArea, pad, participation, preferences, solidLogicSingleton, store, style, table, tabs, utils, widgets, versionInfo, initHeader, initFooter };
//# sourceMappingURL=index.d.ts.map