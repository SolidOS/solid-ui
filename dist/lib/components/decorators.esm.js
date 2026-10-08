//#region src/lib/components/decorators.ts
function e(e, t) {
	customElements.get(e) || customElements.define(e, t);
}
function t(t) {
	return (n, r) => {
		r ? r.addInitializer(() => e(t, n)) : e(t, n);
	};
}
//#endregion
export { t as customElement };

//# sourceMappingURL=decorators.esm.js.map