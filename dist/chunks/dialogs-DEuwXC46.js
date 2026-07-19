import { f as e } from "./components-BD458q30.js";
import { t } from "./show-dialog-eEW5yRBv.js";
//#region src/lib/dialogs/Dialog.ts
var n = class {
	id;
	element;
	config;
	constructor(t, n = {}) {
		this.id = e(), this.config = n, this.element = t;
	}
	closed(e) {
		this.config.onClose?.(e);
	}
};
//#endregion
//#region src/lib/dialogs/helpers.ts
function r(e, r) {
	let i = new e();
	Object.assign(i, r?.props);
	let a = new n(i, r);
	return document.dispatchEvent(new t(a)), a.element;
}
//#endregion
export { n, r as t };

//# sourceMappingURL=dialogs-DEuwXC46.js.map