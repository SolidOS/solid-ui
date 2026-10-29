import { log as e } from "../../../lib/debug.esm.js";
import { style as t } from "../../../lib/style.esm.js";
import n from "../../../lib/styleConstants.esm.js";
import { errorMessageBlock as r } from "../../error.esm.js";
import "../../index.esm.js";
import { bindingToTerm as i, queryPublicDataByName as a } from "./publicData.esm.js";
import { defaultPreferredLanguages as o, filterByLanguage as s, getPreferredLanguages as c } from "./language.esm.js";
import { store as l } from "solid-logic";
// src/widgets/forms/autocomplete/autocompletePicker.ts
var u = 4, d = 20, f = 40;
function p(e, t) {
	e.style.display = t ? "" : "none";
}
async function m(m, h, g, _) {
	function v(n) {
		let i = B.appendChild(m.createElement("tr"));
		e(n);
		let a = Error(n);
		i.appendChild(r(m, a, "pink")), t.setStyle(i, "autocompleteRowStyle"), i.style.padding = "1em";
	}
	function y(t, n) {
		e("Auto complete: finish! " + t), t.termType === "Literal" && h.queryParams.objectURIBase && (t = l.sym(h.queryParams.objectURIBase.value + t.value)), w(), _(t, n);
	}
	async function b(t, n) {
		g.acceptButton ? (g.acceptButton.disbaled = !1, p(g.acceptButton, !0), H.value = n.value, R = n, z = t, e("Auto complete: name: " + n), e("Auto complete: waiting for accept " + t), w()) : (p(g.cancelButton, !0), y(t, n));
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
			n = await a(e, A, t || o, h.queryParams);
		} catch (e) {
			v("Error querying db of organizations: " + e), N = !1;
			return;
		}
		return M = n.length < 200, F = M ? e : void 0, w(), s(n, t) || [];
	}
	function D(e, t) {
		return (t || []).filter((t) => C(e, t.name.value));
	}
	async function O() {
		function n(n) {
			let r = m.createElement("tr");
			t.setStyle(r, "autocompleteRowStyle"), r.setAttribute("style", "padding: 0.3em;"), r.style.color = P ? "#080" : "#088", r.textContent = n.name.value;
			let a = i(n.subject), o = i(n.name);
			return r.addEventListener("click", async (t) => {
				e("       click row textContent: " + r.textContent), e("       click name: " + o.value), a && o && b(a, o);
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
		let a = await c(), o = H.value.trim().toLowerCase();
		if (o.length < u) w(), I = d;
		else {
			P && F && o.startsWith(F) || (e(`   Querying database at "${o}" cf last "${F}".`), j = await E(o, a) || []);
			let t = D(o, j);
			M && t.length <= f && (I = t.length), P = M && t.length <= I, e(` Filter:"${o}" lastBindings: ${j.length}, slimmed to ${t.length}; rows: ${I}, Enough? ${M}, All displayed? ${P}`);
			let s = t.slice(0, I);
			s.sort(r), w();
			for (let e of s) B.appendChild(n(e));
			t.length === 1 && b(i(t[0].subject), i(t[0].name));
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
	t.setStyle(V, "autocompleteRowStyle");
	let H = V.appendChild(m.createElement("td")).appendChild(m.createElement("input"));
	H.setAttribute("type", "text"), k();
	let U = h.size || n.textInputSize || 20;
	H.setAttribute("size", U), H.setAttribute("data-testid", "autocomplete-input");
	let W = t.textInputStyle || "border: 0.1em solid #444; border-radius: 0.5em; width: 100%; font-size: 100%; padding: 0.1em 0.6em";
	return H.setAttribute("style", W), H.addEventListener("keyup", function(e) {
		e.keyCode === 13 && x(e);
	}, !1), H.addEventListener("input", T), L;
}
export { m as renderAutoComplete, p as setVisible };

//# sourceMappingURL=autocompletePicker.esm.js.map