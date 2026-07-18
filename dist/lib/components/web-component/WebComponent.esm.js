import e from "./WebComponent.styles.esm.js";
import { LitElement as t, html as n } from "lit";
//#region src/lib/components/web-component/WebComponent.ts
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
var o = Symbol("WebComponentMetadata"), s = class extends t {
	constructor(...e) {
		super(...e), r(this, o, void 0), r(this, "internals", void 0), r(this, "globalListeners", []), r(this, "traits", []);
	}
	static finalizeStyles(t) {
		return [e, ...super.finalizeStyles(t)];
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		for (let [e, t] of this.globalListeners) window.removeEventListener(e, t);
		this.globalListeners = [];
	}
	addTrait(e) {
		return this.traits.push(e), e;
	}
	firstUpdated() {
		this.forwardMethodCall("firstUpdated");
	}
	updated(e) {
		this.forwardMethodCall("updated", e);
	}
	formResetCallback() {
		this.forwardMethodCall("formResetCallback");
	}
	willUpdate(e) {
		super.willUpdate(e);
		let t = this.static().states;
		if (t) for (let [e, n] of Object.entries(t)) this.toggleAttribute(`data-state-${e}`, !!n(this));
	}
	addGlobalEventListener(e, t) {
		this.globalListeners.push([e, t]), window.addEventListener(e, t);
	}
	render() {
		return n`<slot></slot>`;
	}
	getInternals() {
		return this.internals ??= this.attachInternals(), this.internals;
	}
	static() {
		return this.constructor;
	}
	forwardMethodCall(e, ...t) {
		for (let n of this.traits) n[e]?.(...t);
	}
};
r(s, "states", void 0);
//#endregion
export { s as default };

//# sourceMappingURL=WebComponent.esm.js.map