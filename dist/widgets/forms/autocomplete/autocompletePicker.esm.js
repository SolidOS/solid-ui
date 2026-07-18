import { log as e } from "../../../lib/debug.esm.js";
import t from "../../../lib/styleConstants.esm.js";
import { style as n } from "../../../lib/style.esm.js";
import { errorMessageBlock as r } from "../../error.esm.js";
import { defaultPreferredLanguages as i, filterByLanguage as a, getPreferredLanguages as o } from "./language.esm.js";
import { bindingToTerm as s, queryPublicDataByName as c } from "./publicData.esm.js";
import "../../index.esm.js";
import { store as l } from "solid-logic";
//#region src/widgets/forms/autocomplete/autocompletePicker.ts
var u = 4, d = 20, f = 40;
function p(e, t) {
	e.style.display = t ? "" : "none";
}
async function m(m, h, g, _) {
	function v(t) {
		let i = B.appendChild(m.createElement("tr"));
		e(t);
		let a = Error(t);
		i.appendChild(r(m, a, "pink")), n.setStyle(i, "autocompleteRowStyle"), i.style.padding = "1em";
	}
	function y(t, n) {
		e("Auto complete: finish! " + t), t.termType === "Literal" && h.queryParams.objectURIBase && (t = l.sym(h.queryParams.objectURIBase.value + t.value)), w(), _(t, n);
	}
	async function b(t, n) {
		if (g.acceptButton) {
			g.acceptButton.disbaled = !1, p(g.acceptButton, !0), H.value = n.value, R = n, z = t, e("Auto complete: name: " + n), e("Auto complete: waiting for accept " + t), w();
			return;
		}
		p(g.cancelButton, !0), y(t, n);
	}
	async function x(e) {
		R && H.value === R.value && y(z, R);
	}
	async function S(t) {
		e("Auto complete: Canceled by user! "), h.permanent ? k() : L.parentNode && L.parentNode.removeChild(L);
	}
	function C(e, t) {
		let n = e.split(" ");
		for (let e = 0; e < n.length; e++) {
			let r = n[e];
			if (t.toLowerCase().indexOf(r) < 0) return !1;
		}
		return !0;
	}
	function w() {
		for (; B.children.length > 1;) B.removeChild(B.lastChild);
	}
	async function T(e) {
		p(g.cancelButton, !0), O();
	}
	async function E(e, t) {
		let n;
		try {
			n = await c(e, A, t || i, h.queryParams);
		} catch (e) {
			v("Error querying db of organizations: " + e), N = !1;
			return;
		}
		return M = n.length < 200, F = M ? e : void 0, w(), a(n, t);
	}
	function D(e, t) {
		return t.filter((t) => C(e, t.name.value));
	}
	async function O() {
		function t(t) {
			let r = m.createElement("tr");
			n.setStyle(r, "autocompleteRowStyle"), r.setAttribute("style", "padding: 0.3em;"), r.style.color = P ? "#080" : "#088", r.textContent = t.name.value;
			let i = s(t.subject), a = s(t.name);
			return r.addEventListener("click", async (t) => {
				e("       click row textContent: " + r.textContent), e("       click name: " + a.value), i && a && b(i, a);
			}), r;
		}
		function r(e, t) {
			return t.name.value > e.name.value ? 1 : t.name.name < e.name.value ? -1 : 0;
		}
		if (N) {
			e(`Ignoring "${H.value}" because of lock `);
			return;
		}
		e(`Setting lock at "${H.value}"`), N = !0;
		let i = await o(), a = H.value.trim().toLowerCase();
		if (a.length < u) w(), I = d;
		else {
			(!P || !F || !a.startsWith(F)) && (e(`   Querying database at "${a}" cf last "${F}".`), j = await E(a, i));
			let n = D(a, j);
			M && n.length <= f && (I = n.length), P = M && n.length <= I, e(` Filter:"${a}" lastBindings: ${j.length}, slimmed to ${n.length}; rows: ${I}, Enough? ${M}, All displayed? ${P}`);
			let o = n.slice(0, I);
			o.sort(r), w();
			for (let e of o) B.appendChild(t(e));
			n.length === 1 && b(s(n[0].subject), s(n[0].name));
		}
		N = !1;
	}
	function k() {
		h.currentObject ? (H.value = h.currentName ? h.currentName.value : "??? wot no name for " + h.currentObject, R = h.currentName, F = h.currentName ? h.currentName.value : void 0, z = h.currentObject) : (H.value = "", F = void 0, z = void 0), g.deleteButton && p(g.deleteButton, !!h.currentObject), g.acceptButton && p(g.acceptButton, !1), g.editButton && p(g.editButton, !0), g.cancelButton && p(g.cancelButton, !1), N = !1, w();
	}
	let A = h.targetClass;
	if (!A) throw Error("renderAutoComplete: missing targetClass");
	g.acceptButton && g.acceptButton.addEventListener("click", x, !1), g.cancelButton && g.cancelButton.addEventListener("click", S, !1);
	let j, M = !1, N = !1, P = !1, F, I = d, L = m.createElement("div"), R, z, B = L.appendChild(m.createElement("table"));
	B.setAttribute("data-testid", "autocomplete-table"), B.setAttribute("style", "max-width: 30em; margin: 0.5em;");
	let V = B.appendChild(m.createElement("tr"));
	n.setStyle(V, "autocompleteRowStyle");
	let H = V.appendChild(m.createElement("td")).appendChild(m.createElement("input"));
	H.setAttribute("type", "text"), k();
	let U = h.size || t.textInputSize || 20;
	H.setAttribute("size", U), H.setAttribute("data-testid", "autocomplete-input");
	let W = n.textInputStyle || "border: 0.1em solid #444; border-radius: 0.5em; width: 100%; font-size: 100%; padding: 0.1em 0.6em";
	return H.setAttribute("style", W), H.addEventListener("keyup", function(e) {
		e.keyCode === 13 && x(e);
	}, !1), H.addEventListener("input", T), L;
}
//#endregion
export { m as renderAutoComplete, p as setVisible };

//# sourceMappingURL=autocompletePicker.esm.js.map