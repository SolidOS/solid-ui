import e from "../ns.esm.js";
import { sym as t } from "rdflib";
//#region src/lib/forms/rdfFormsHelper.ts
async function n(e, n) {
	let r = t(n);
	return e.holds(void 0, void 0, void 0, r) && e.removeStatements(e.statementsMatching(void 0, void 0, void 0, r)), await e.fetcher.load(n, {
		force: !0,
		clearPreviousData: !0
	});
}
function r(t, n) {
	let r = n.map((n) => {
		let r = t.any(n, e.ui("sequence")), i = r ? Number(r.value) : 9999;
		return [Number.isNaN(i) ? 9999 : i, n];
	});
	return r.sort((e, t) => e[0] - t[0]), r.map((e) => e[1]);
}
function i(e, t) {
	let n = e.findTypeURIs(t), r = e.bottomTypeURIs(n), i = [];
	for (let e in r) i.push(e);
	return i[0];
}
function a(n, r) {
	let i = r.split("#")[0], a = r.includes("#") ? r.split("#")[1] : null;
	if (a) {
		let r = t(i + "#" + a);
		if (n.holds(r, e.rdf("type"), e.ui("Form"))) return r;
	}
	return n.each(null, e.rdf("type"), e.ui("Form")).find((e) => e.termType === "NamedNode") || null;
}
//#endregion
export { n as fetchData, a as findForm, i as mostSpecificClassURI, r as sortBySequence };

//# sourceMappingURL=rdfFormsHelper.esm.js.map