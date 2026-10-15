//#region src/components/access-control-modal/helpers.ts
function e(e) {
	try {
		let t = new URL(e);
		return (t.protocol === "http:" || t.protocol === "https:") && !!t.hostname;
	} catch {
		return !1;
	}
}
function t(t) {
	if (!e(t)) return !1;
	let n = new URL(t);
	return n.pathname === "/" && !n.search && !n.hash && !n.username && !n.password;
}
function n(t) {
	let n = t.trim();
	if (n && !e(n)) try {
		let e = new URL(`https://${n}`), t = e.protocol === "http:" || e.protocol === "https:", r = e.pathname === "/" && !e.search && !e.hash, i = e.hostname.includes(".") || e.hostname.includes(":");
		return t && r && i && !e.username && !e.password ? e.origin : void 0;
	} catch {
		return;
	}
}
function r(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = t(r);
		e && !n.has(e) && n.set(e, r);
	}
	return [...n.values()];
}
function i(e) {
	return r(e, (e) => e.value);
}
//#endregion
export { r as dedupeByKey, i as dedupeComboboxOptions, e as isAbsoluteHttpUri, t as isOriginUrl, n as normalizeOriginInput };

//# sourceMappingURL=helpers.esm.js.map