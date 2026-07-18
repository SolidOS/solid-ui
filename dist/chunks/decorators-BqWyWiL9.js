import { o as e, s as t } from "./lit-C4H1jI4q.js";
//#region node_modules/@lit/reactive-element/decorators/property.js
var n = {
	attribute: !0,
	type: String,
	converter: t,
	reflect: !1,
	hasChanged: e
}, r = (e = n, t, r) => {
	let { kind: i, metadata: a } = r, o = globalThis.litPropertyMetadata.get(a);
	if (o === void 0 && globalThis.litPropertyMetadata.set(a, o = /* @__PURE__ */ new Map()), i === "setter" && ((e = Object.create(e)).wrapped = !0), o.set(r.name, e), i === "accessor") {
		let { name: n } = r;
		return {
			set(r) {
				let i = t.get.call(this);
				t.set.call(this, r), this.requestUpdate(n, i, e, !0, r);
			},
			init(t) {
				return t !== void 0 && this.C(n, void 0, e, t), t;
			}
		};
	}
	if (i === "setter") {
		let { name: n } = r;
		return function(r) {
			let i = this[n];
			t.call(this, r), this.requestUpdate(n, i, e, !0, r);
		};
	}
	throw Error("Unsupported decorator location: " + i);
};
function i(e) {
	return (t, n) => typeof n == "object" ? r(e, t, n) : ((e, t, n) => {
		let r = t.hasOwnProperty(n);
		return t.constructor.createProperty(n, e), r ? Object.getOwnPropertyDescriptor(t, n) : void 0;
	})(e, t, n);
}
//#endregion
//#region node_modules/@lit/reactive-element/decorators/state.js
function a(e) {
	return i({
		...e,
		state: !0,
		attribute: !1
	});
}
//#endregion
export { i as n, a as t };

//# sourceMappingURL=decorators-BqWyWiL9.js.map