import { generateId as e } from "../components/ids.esm.js";
import "../components/index.esm.js";
//#region src/lib/dialogs/Dialog.ts
var t = class {
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
export { t as default };

//# sourceMappingURL=Dialog.esm.js.map