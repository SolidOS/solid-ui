import e from "../../../lib/ns.esm.js";
import { label as t } from "../../../utils/label.esm.js";
import { icons as n } from "../../../lib/iconBase.esm.js";
import { makeDropTarget as r } from "../../dragAndDrop.esm.js";
import { store as i } from "solid-logic";
import "../../index.esm.js";
import { askName as a, button as o, cancelButton as s, continueButton as c, deleteButtonWithCheck as l } from "../../buttons.esm.js";
import "../../../utils/index.esm.js";
import { renderAutoComplete as u, setVisible as d } from "./autocompletePicker.esm.js";
// src/widgets/forms/autocomplete/autocompleteBar.ts
var f = "Solid ID", p = n.iconBase + "noun_34653_green.svg", m = n.iconBase + "noun_Search_875351.svg", h = n.iconBase + "noun_253504.svg";
async function g(n, g, _, v, y, b) {
	async function x(e, t) {
		return v.permanent ? (d(M, !0), d(D, !1), d(O, !1)) : C(), y(e, t);
	}
	async function S(t) {
		let r = await a(n, i, L, e.vcard("url"), void 0, f);
		if (r) return y(g, r);
	}
	function C() {
		I &&= (L.removeChild(I), void 0);
	}
	async function w() {
		I = n.createElement("div"), I.setAttribute("style", "display: flex; flex-flow: wrap;"), I.appendChild(await u(n, v, F, x)), I.appendChild(D), I.appendChild(O), I.appendChild(M), I.appendChild(k), L.appendChild(I);
	}
	async function T(e) {
		I ? (L.removeChild(I), I = void 0) : await w();
	}
	async function E(e) {
		for (let t of e) await y(g, t);
	}
	let D = c(n);
	D.setAttribute("data-testid", "accept-button");
	let O = s(n);
	O.setAttribute("data-testid", "cancel-button");
	let k = n.createElement("div"), A = v.targetClass ? t(v.targetClass) : "item", j = l(n, k, A, b);
	j.setAttribute("data-testid", "delete-button");
	let M = o(n, h, "Edit", (e) => {
		N = !N, P();
	});
	M.setAttribute("data-testid", "edit-button");
	let N = !0;
	function P() {
		N ? (d(M, !1), d(D, !1), d(O, !1)) : (d(M, !0), d(D, !1), d(O, !1));
	}
	let F = {
		acceptButton: D,
		cancelButton: O,
		editButton: M,
		deleteButton: j
	}, I, L = n.createElement("div");
	if (L.style.display = "flex", L.style.flexDirection = "row", (v.permanent || v.currentObject) && await w(), _.editable) {
		if (L.style.width = "100%", _.manualURIEntry) {
			let e = L.appendChild(o(n, p, _.idNoun, S));
			r(e, E, void 0);
		}
		_.dbLookup && !v.currentObject && !v.permanent && L.appendChild(o(n, m, _.idNoun, T));
	}
	return P(), L;
}
export { g as renderAutocompleteControl };

//# sourceMappingURL=autocompleteBar.esm.js.map