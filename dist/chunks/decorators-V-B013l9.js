// src/lib/components/decorators.ts
function e(e, t) {
	customElements.get(e) || customElements.define(e, t);
}
function t(t) {
	return (n, r) => {
		r ? r.addInitializer(() => e(t, n)) : e(t, n);
	};
}
export { t };

//# sourceMappingURL=decorators-V-B013l9.js.map