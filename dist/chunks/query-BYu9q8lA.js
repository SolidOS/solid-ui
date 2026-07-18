//#region node_modules/@lit/reactive-element/decorators/base.js
var e = (e, t, n) => (n.configurable = !0, n.enumerable = !0, Reflect.decorate && typeof t != "object" && Object.defineProperty(e, t, n), n);
//#endregion
//#region node_modules/@lit/reactive-element/decorators/query.js
function t(t, n) {
	return (r, i, a) => {
		let o = (e) => e.renderRoot?.querySelector(t) ?? null;
		if (n) {
			let { get: t, set: n } = typeof i == "object" ? r : a ?? (() => {
				let e = Symbol();
				return {
					get() {
						return this[e];
					},
					set(t) {
						this[e] = t;
					}
				};
			})();
			return e(r, i, { get() {
				let e = t.call(this);
				return e === void 0 && (e = o(this), (e !== null || this.hasUpdated) && n.call(this, e)), e;
			} });
		}
		return e(r, i, { get() {
			return o(this);
		} });
	};
}
//#endregion
export { t };

//# sourceMappingURL=query-BYu9q8lA.js.map