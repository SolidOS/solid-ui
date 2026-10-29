import { ShowDialogEvent as e } from "./events/show-dialog.esm.js";
import t from "./Dialog.esm.js";
// src/lib/dialogs/helpers.ts
function n(n, r) {
	let i = new n();
	Object.assign(i, r?.props);
	let a = new t(i, r);
	return document.dispatchEvent(new e(a)), a.element;
}
export { n as showDialog };

//# sourceMappingURL=helpers.esm.js.map