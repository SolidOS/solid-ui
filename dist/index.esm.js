import e from "./lib/ns.esm.js";
import { log_exports as t } from "./lib/log.esm.js";
import { utils_exports as n } from "./utils/index.esm.js";
import { style as r } from "./lib/style.esm.js";
import { icons as i } from "./lib/iconBase.esm.js";
import { language_exports as a } from "./widgets/forms/autocomplete/language.esm.js";
import { widgets_exports as o } from "./widgets/index.esm.js";
import { login_exports as s } from "./login/login.esm.js";
import { acl as c, aclControl as l } from "./acl/index.esm.js";
import { create as u } from "./create/index.esm.js";
import { matrix as d } from "./matrix/index.esm.js";
import { media as f } from "./media/index.esm.js";
import { messageArea as p } from "./lib/messageArea.esm.js";
import { participation_exports as m } from "./lib/participation.esm.js";
import { pad_exports as h } from "./lib/pad.esm.js";
import { infiniteMessageArea as g } from "./chat/infinite.esm.js";
import { preferences_exports as _ } from "./lib/preferences.esm.js";
import { renderTableViewPane as v } from "./lib/table.esm.js";
import { tabs_exports as y } from "./lib/tabs.esm.js";
import { initHeader as b } from "./header/index.esm.js";
import { initFooter as x } from "./footer/index.esm.js";
import { types_exports as S } from "./create/types.esm.js";
import C from "./lib/auth/Account.esm.js";
import w from "./lib/auth/NoopAuth.esm.js";
import { DEFAULT_AUTH_CONTEXT as T, authContext as E } from "./lib/auth/context.esm.js";
import { generateId as D } from "./lib/components/ids.esm.js";
import { DEFAULT_DIALOG_CONTEXT as O, dialogContext as k } from "./lib/dialogs/context.esm.js";
import { customElement as A } from "./lib/components/decorators.esm.js";
import { CloseDialogEvent as j } from "./lib/dialogs/events/close-dialog.esm.js";
import M from "./lib/components/traits/DialogTrait.esm.js";
import N from "./lib/components/web-component/WebComponent.esm.js";
import P from "./lib/components/dialog-component/DialogComponent.esm.js";
import F from "./lib/components/traits/FormControlTrait.esm.js";
import "./lib/components/index.esm.js";
import I from "./lib/dialogs/Dialog.esm.js";
import { ShowDialogEvent as L } from "./lib/dialogs/events/show-dialog.esm.js";
import { showDialog as R } from "./lib/dialogs/helpers.esm.js";
import "./lib/dialogs/index.esm.js";
import z, { DEFAULT_SIGNUP_URL as B } from "./lib/auth/SolidAuth.esm.js";
import "./lib/auth/index.esm.js";
//#region src/index.ts
var V = typeof window < "u" ? window.document : null;
//#endregion
export { C as Account, j as CloseDialogEvent, T as DEFAULT_AUTH_CONTEXT, O as DEFAULT_DIALOG_CONTEXT, B as DEFAULT_SIGNUP_URL, I as Dialog, P as DialogComponent, M as DialogTrait, F as FormControlTrait, w as NoopAuth, L as ShowDialogEvent, z as SolidAuth, N as WebComponent, c as acl, l as aclControl, E as authContext, u as create, S as createTypes, A as customElement, k as dialogContext, V as dom, D as generateId, i as icons, g as infiniteMessageArea, x as initFooter, b as initHeader, a as language, t as log, s as login, d as matrix, f as media, p as messageArea, e as ns, h as pad, m as participation, _ as preferences, R as showDialog, r as style, v as table, y as tabs, n as utils, o as widgets };

//# sourceMappingURL=index.esm.js.map