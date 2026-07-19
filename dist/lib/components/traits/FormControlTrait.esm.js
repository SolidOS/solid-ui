import { generateId as e } from "../ids.esm.js";
import "../index.esm.js";
import { html as t, nothing as n } from "lit";
//#region src/lib/components/traits/FormControlTrait.ts
function r(e, t, n) {
	return (t = i(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function i(e) {
	var t = a(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function a(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var o = class {
	constructor(t, n) {
		r(this, "controlId", void 0), r(this, "labelId", void 0), r(this, "target", void 0), r(this, "config", void 0), this.config = n, this.controlId = `control-${e()}`, this.labelId = `label-${this.controlId}`, this.target = t;
	}
	firstUpdated() {
		this.config.getInternals().setFormValue(this.target.value ?? ""), this.updateValidity();
	}
	updated(e) {
		(e.has("value") || e.has("required")) && this.updateValidity();
	}
	formResetCallback() {
		this.target.value = "", this.config.getInternals().setFormValue(""), this.updateValidity();
	}
	renderLabel() {
		return this.target.label ? t`<label id="${this.labelId}" for="${this.controlId}">${this.target.label}</label>` : n;
	}
	onInput() {
		this.setValue(this.config.getControlElement()?.value ?? null);
	}
	onSubmit() {
		this.config.getInternals().form?.requestSubmit();
	}
	setValue(e) {
		this.target.value = e, this.config.getInternals().setFormValue(this.target.value ?? ""), this.target.dispatchEvent(new InputEvent("input", {
			bubbles: !0,
			composed: !0
		}));
	}
	updateValidity() {
		let e = this.config.getInternals();
		this.target.required && (this.target.value ?? "") === "" ? e.setValidity({ valueMissing: !0 }, "Please fill out this field.", this.config.getControlElement() ?? void 0) : e.setValidity({});
	}
};
//#endregion
export { o as default };

//# sourceMappingURL=FormControlTrait.esm.js.map