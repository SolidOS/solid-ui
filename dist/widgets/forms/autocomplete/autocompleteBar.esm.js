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
		return v.permanent ? (u(j, !0), u(D, !1), u(O, !1)) : C(), y(e, t);
	}
	async function S(t) {
		let n = await i(r, d, I, e.vcard("url"), void 0, f);
		if (n) return y(g, n);
	}
	function C() {
		F &&= (I.removeChild(F), void 0);
	}
	async function w() {
		F = r.createElement("div"), F.setAttribute("style", "display: flex; flex-flow: wrap;"), F.appendChild(await l(r, v, P, x)), F.appendChild(D), F.appendChild(O), F.appendChild(j), F.appendChild(k), I.appendChild(F);
	}
	async function T(e) {
		F ? (I.removeChild(F), F = void 0) : await w();
	}
	async function E(e) {
		for (let t of e) await y(g, t);
	}
	let D = s(r);
	D.setAttribute("data-testid", "accept-button");
	let O = o(r);
	O.setAttribute("data-testid", "cancel-button");
	let k = r.createElement("div"), A = c(r, k, v.targetClass ? t(v.targetClass) : "item", b);
	A.setAttribute("data-testid", "delete-button");
	let j = a(r, h, "Edit", (e) => {
		M = !M, N();
	});
	j.setAttribute("data-testid", "edit-button");
	let M = !0;
	function N() {
		M ? (u(j, !1), u(D, !1), u(O, !1)) : (u(j, !0), u(D, !1), u(O, !1));
	}
	let P = {
		acceptButton: D,
		cancelButton: O,
		editButton: j,
		deleteButton: A
	}, F, I = r.createElement("div");
	return I.style.display = "flex", I.style.flexDirection = "row", (v.permanent || v.currentObject) && await w(), _.editable && (I.style.width = "100%", _.manualURIEntry && n(I.appendChild(a(r, p, _.idNoun, S)), E, void 0), _.dbLookup && !v.currentObject && !v.permanent && I.appendChild(a(r, m, _.idNoun, T))), N(), I;
}
//#endregion
export { g as renderAutocompleteControl };

//# sourceMappingURL=autocompleteBar.esm.js.map