import e from "../../../lib/ns.esm.js";
import { style as t } from "../../../lib/style.esm.js";
import { errorMessageBlock as n } from "../../error.esm.js";
import { fieldLabel as r } from "../basic.esm.js";
import { renderAutocompleteControl as i } from "./autocompleteBar.esm.js";
import "../../index.esm.js";
import { st as a } from "rdflib";
import { store as o } from "solid-logic";
//#region src/widgets/forms/autocomplete/autocompleteField.ts
function s(s, c, l, u, d, f, p) {
	async function m(e, t) {
		if (!t) throw Error("autocompleteField:  No name set.");
		let r = g.the(u, x, null, f);
		if (r) {
			let n = g.any(r, S, null, f);
			if (r.equals(e) && n && n.sameTerm(t)) return;
		}
		let i = r ? g.statementsMatching(u, x, r, f).concat(g.statementsMatching(r, S, null, f)) : [], o = [a(u, x, e, f), a(e, S, t, f)];
		try {
			await g.updater?.updateMany(i, o);
		} catch (e) {
			p(!1, e), v.appendChild(n(s, "Autocomplete form data update error:" + e, null, e));
			return;
		}
		p(!0, "");
	}
	async function h(e, t) {
		let r = g.the(u, x, null, f);
		if (!r) {
			p(!1, "NO data to elete"), v.appendChild(n(s, "Autocomplete delete: no old data!"));
			return;
		}
		let i = g.statementsMatching(u, x, r, f).concat(g.statementsMatching(r, S, null, f)), a = [];
		try {
			await g.updater?.updateMany(i, a);
		} catch (e) {
			let t = /* @__PURE__ */ Error("Autocomplete form data delete error:" + e);
			p(!1, e), v.appendChild(n(s, t, null, e));
			return;
		}
		p(!0, "");
	}
	if (u.termType !== "NamedNode") throw Error("Sorry this field only works on NamedNode subjects (for editable)");
	let g = o, _ = d.doc ? d.doc() : null, v = s.createElement("div");
	c && c.appendChild(v);
	let y = s.createElement("div");
	y.setAttribute("class", "formFieldName"), y.setAttribute("style", t.formFieldNameBoxStyle), v.appendChild(y);
	let b = s.createElement("div");
	b.setAttribute("class", "formFieldValue"), v.appendChild(b);
	let x = g.any(d, e.ui("property"));
	if (!x) return v.appendChild(n(s, "Error: No property given for autocomplete field: " + d));
	let S = g.any(d, e.ui("labelProperty")) || e.schema("name"), C = g.any(d, e.ui("dataSource"));
	if (!C) return v.appendChild(n(s, "Error: No data source given for autocomplete field: " + d));
	let w = {
		label: g.anyJS(C, e.schema("name"), null, C.doc()),
		logo: g.any(C, e.schema("logo"), null, C.doc())
	}, T = g.any(d, e.ui("targetClass"), null, d.doc()) || g.any(C, e.ui("targetClass"), null, C.doc());
	T && (w.targetClass = T), w.objectURIBase = g.any(C, e.ui("objectURIBase"), null, C.doc()) || void 0;
	let E = g.anyJS(C, e.ui("endpoint"), null, C.doc());
	if (E) {
		if (w.endpoint = E, w.searchByNameQuery = g.anyJS(C, e.ui("searchByNameQuery"), null, C.doc()), !w.searchByNameQuery) return v.appendChild(n(s, "Error: No searchByNameQuery given for endpoint data Source: " + d));
		w.insitituteDetailsQuery = g.anyJS(C, e.ui("insitituteDetailsQuery"), null, C.doc());
	} else {
		let t = g.anyJS(C, e.ui("searchByNameURI"));
		if (!t) return v.appendChild(n(s, "Error: No searchByNameURI OR sparql endpoint given for dataSource: " + C));
		w.searchByNameURI = t;
	}
	let D = g.anyJS(d, e.ui("suppressEmptyUneditable"), null, _), O = g.updater?.editable(f.uri), k = {
		permanent: !0,
		targetClass: w.targetClass,
		queryParams: w
	};
	k.size = g.anyJS(d, e.ui("size"), null, _) || void 0;
	let A = g.any(u, x, void 0, f);
	if (A) k.currentObject = A, k.currentName = g.any(k.currentObject, S, null, f);
	else if (A = g.any(d, e.ui("default")), A) k.currentObject = A, k.currentName = g.any(k.currentObject, S, null, f);
	else if (D && !O) return v.style.display = "none", v;
	return y.appendChild(r(s, x, d)), i(s, u, {
		editable: O,
		dbLookup: !0
	}, k, m, h).then((e) => {
		b.appendChild(e);
	}, (e) => {
		b.appendChild(n(s, `Error rendering autocomplete ${d}: ${e}`, "#fee", e));
	}), v;
}
//#endregion
export { s as autocompleteField };

//# sourceMappingURL=autocompleteField.esm.js.map