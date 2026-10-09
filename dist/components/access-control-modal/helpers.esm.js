//#region src/components/access-control-modal/helpers.ts
function e(e) {
	return e.startsWith("http://") || e.startsWith("https://");
}
function t(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = t(r);
		e && !n.has(e) && n.set(e, r);
	}
	return [...n.values()];
}
function n(e) {
	return t(e, (e) => e.value);
}
//#endregion
export { t as dedupeByKey, n as dedupeComboboxOptions, e as isHttpUri };

//# sourceMappingURL=helpers.esm.js.map