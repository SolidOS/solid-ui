import { sym as e } from "rdflib";
import t from "../ns.esm.js";
// src/lib/forms/rdfFormsHelper.ts
async function n(t, n) {
	let r = e(n);
	return t.holds(void 0, void 0, void 0, r) && t.removeStatements(t.statementsMatching(void 0, void 0, void 0, r)), await t.fetcher.load(n, {
		force: !0,
		clearPreviousData: !0
	});
}
function r(e, n) {
	let r = n.map((n) => {
		let r = e.any(n, t.ui("sequence")), i = r ? Number(r.value) : 9999;
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
		let r = e(i + "#" + a);
		if (n.holds(r, t.rdf("type"), t.ui("Form"))) return r;
	}
	return n.each(null, t.rdf("type"), t.ui("Form")).find((e) => e.termType === "NamedNode") || null;
}
export { n as fetchData, a as findForm, i as mostSpecificClassURI, r as sortBySequence };

//# sourceMappingURL=rdfFormsHelper.esm.js.map