import { y as e } from "./components-s2INdWKd.js";
import { t } from "./show-dialog-DBCaJRII.js";
// src/lib/dialogs/Dialog.ts
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
// src/lib/dialogs/helpers.ts
function r(e, r) {
	let i = new e();
	Object.assign(i, r?.props);
	let a = new n(i, r);
	return document.dispatchEvent(new t(a)), a.element;
}
export { n, r as t };

//# sourceMappingURL=dialogs-DrjXBAEy.js.map