import e from "../../../lib/ns.esm.js";
import { label as t } from "../../../utils/label.esm.js";
import "../../../utils/index.esm.js";
import { makeDropTarget as n } from "../../dragAndDrop.esm.js";
import { icons as r } from "../../../lib/iconBase.esm.js";
import { askName as i, button as a, cancelButton as o, continueButton as s, deleteButtonWithCheck as c } from "../../buttons.esm.js";
import { renderAutoComplete as l, setVisible as u } from "./autocompletePicker.esm.js";
import "../../index.esm.js";
import { store as d } from "solid-logic";
//#region src/widgets/forms/autocomplete/autocompleteBar.ts
var f = "Solid ID", p = r.iconBase + "noun_34653_green.svg", m = r.iconBase + "noun_Search_875351.svg", h = r.iconBase + "noun_253504.svg";
async function g(r, g, _, v, y, b) {
	async function x(e, t) {
		return v.permanent ? (u(M, !0), u(D, !1), u(O, !1)) : C(), y(e, t);
	}
	async function S(t) {
		let n = await i(r, d, L, e.vcard("url"), void 0, f);
		if (n) return y(g, n);
	}
	function C() {
		I &&= (L.removeChild(I), void 0);
	}
	async function w() {
		I = r.createElement("div"), I.setAttribute("style", "display: flex; flex-flow: wrap;"), I.appendChild(await l(r, v, F, x)), I.appendChild(D), I.appendChild(O), I.appendChild(M), I.appendChild(k), L.appendChild(I);
	}
	async function T(e) {
		I ? (L.removeChild(I), I = void 0) : await w();
	}
	async function E(e) {
		for (let t of e) await y(g, t);
	}
	let D = s(r);
	D.setAttribute("data-testid", "accept-button");
	let O = o(r);
	O.setAttribute("data-testid", "cancel-button");
	let k = r.createElement("div"), A = v.targetClass ? t(v.targetClass) : "item", j = c(r, k, A, b);
	j.setAttribute("data-testid", "delete-button");
	let M = a(r, h, "Edit", (e) => {
		N = !N, P();
	});
	M.setAttribute("data-testid", "edit-button");
	let N = !0;
	function P() {
		N ? (u(M, !1), u(D, !1), u(O, !1)) : (u(M, !0), u(D, !1), u(O, !1));
	}
	let F = {
		acceptButton: D,
		cancelButton: O,
		editButton: M,
		deleteButton: j
	}, I, L = r.createElement("div");
	if (L.style.display = "flex", L.style.flexDirection = "row", (v.permanent || v.currentObject) && await w(), _.editable) {
		if (L.style.width = "100%", _.manualURIEntry) {
			let e = L.appendChild(a(r, p, _.idNoun, S));
			n(e, E, void 0);
		}
		_.dbLookup && !v.currentObject && !v.permanent && L.appendChild(a(r, m, _.idNoun, T));
	}
	return P(), L;
}
//#endregion
export { g as renderAutocompleteControl };

//# sourceMappingURL=autocompleteBar.esm.js.map