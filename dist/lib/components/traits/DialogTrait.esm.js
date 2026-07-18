import { CloseDialogEvent as e } from "../../dialogs/events/close-dialog.esm.js";
//#region src/lib/components/traits/DialogTrait.ts
function t(e, t, r) {
	return (t = n(t)) in e ? Object.defineProperty(e, t, {
		value: r,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = r, e;
}
function n(e) {
	var t = r(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function r(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var i = class {
	constructor(e, n) {
		t(this, "target", void 0), t(this, "config", void 0), this.target = e, this.config = n;
	}
	close(t) {
		window.dispatchEvent(new e(this.config.getContext().id, t));
	}
};
//#endregion
export { i as default };

//# sourceMappingURL=DialogTrait.esm.js.map