import e from "./Dialog.esm.js";
import { ShowDialogEvent as t } from "./events/show-dialog.esm.js";
//#region src/lib/dialogs/helpers.ts
function n(n, r) {
	let i = new n();
	Object.assign(i, r?.props);
	let a = new e(i, r);
	return document.dispatchEvent(new t(a)), a.element;
}
//#endregion
export { n as showDialog };

//# sourceMappingURL=helpers.esm.js.map