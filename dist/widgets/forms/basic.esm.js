import e from "../../lib/ns.esm.js";
import { label as t } from "../../utils/label.esm.js";
import "../../utils/index.esm.js";
import n from "../../lib/styleConstants.esm.js";
import { style as r } from "../../lib/style.esm.js";
import { errorMessageBlock as i } from "../error.esm.js";
import { fieldParams as a } from "./fieldParams.esm.js";
import { mostSpecificClassURI as o } from "./fieldFunction.esm.js";
import { Literal as s, st as c } from "rdflib";
import { solidLogicSingleton as l } from "solid-logic";
//#region src/widgets/forms/basic.ts
var u = l.store;
function d(t, a, o, s, c) {
	o.style.display = "flex", o.style.flexDirection = "row";
	let l = o.appendChild(t.createElement("div"));
	l.style.width = n.formFieldNameBoxWidth;
	let u = o.appendChild(t.createElement("div"));
	return l.setAttribute("class", "formFieldName"), l.setAttribute("style", r.formFieldNameBoxStyle), u.setAttribute("class", "formFieldValue"), c ? l.appendChild(t.createTextNode(c)) : a.any(s, e.ui("property")) ? l.appendChild(f(t, a.any(s, e.ui("property")), s)) : (u.appendChild(i(t, "No property or label given for form field: " + s)), l.appendChild(t.createTextNode("???"))), u;
}
function f(n, r, i) {
	let a = u.any(i, e.ui("label"));
	if (a ||= t(r, !0), r === void 0) return n.createTextNode("@@Internal error: undefined property");
	let o = n.createElement("a");
	return r.uri && o.setAttribute("href", r.uri), o.setAttribute("style", "color: #3B5998; text-decoration: none;"), o.textContent = a, o;
}
function p(e, t, n) {
	let r = u.statementsMatching(e, t);
	if (r.length === 0) return n;
	if (!u.updater) throw Error("Store has no updater");
	return r.length > 0 && r[0].why.value && u.updater.editable(r[0].why.value, u) ? u.sym(r[0].why.value) : n;
}
function m(t, l, f, m, h, g, _) {
	let v = u, y = h.doc ? h.doc() : null, b = t.createElement("div"), x = v.any(h, e.ui("property"));
	if (l && l.appendChild(b), !x) return b.appendChild(i(t, "Error: No property given for text field: " + h));
	let S = d(t, v, b, h), C = v.anyJS(h, e.ui("suppressEmptyUneditable"), null, y), w = a[o(h)];
	w === void 0 && (w = { style: "" });
	let T = w.style || "", E = r.textInputStyle + T, D = t.createElement("input");
	D.style = E, S.appendChild(D), D.setAttribute("type", w.type ? w.type : "text");
	let O = (D.getAttribute("type") || "").toLowerCase(), k = O === "date" || O === "datetime-local", A = v.anyJS(h, e.ui("size")) || n.textInputSize || 20;
	D.setAttribute("size", A);
	let j = v.any(h, e.ui("maxLength"));
	D.setAttribute("maxLength", j ? "" + j : n.basicMaxLength), g ||= p(m, x, g);
	let M = v.any(m, x, void 0, g);
	if (M ||= v.any(h, e.ui("default")), M && M.value && w.uriPrefix ? D.value = decodeURIComponent(M.value.replace(w.uriPrefix, "")).replace(/ /g, "") : M && (D.value = M.value || M.value || ""), D.setAttribute("style", E), !v.updater) throw Error("kb has no updater");
	return v.updater.editable(g.uri) ? (D.addEventListener("keyup", function(e) {
		w.pattern && D.setAttribute("style", E + (D.value.match(w.pattern) ? "color: green;" : "color: red;"));
	}, !0), D.addEventListener("change", function(n) {
		if (k && t.activeElement === D) {
			D.dataset && (D.dataset.deferredChange = "true");
			return;
		}
		if (w.pattern && !D.value.match(w.pattern)) return;
		let r = !k;
		r && (D.disabled = !0), D.setAttribute("style", E + "color: gray;");
		let a = v.statementsMatching(m, x), o;
		w.namedNode ? o = v.sym(D.value) : w.uriPrefix ? (o = encodeURIComponent(D.value.replace(/ /g, "")), o = v.sym(w.uriPrefix + D.value)) : o = w.dt ? new s(D.value.trim(), void 0, e.xsd(w.dt)) : new s(D.value);
		let l = a.map((e) => c(e.subject, e.predicate, o, e.why));
		l.length === 0 && (l = [c(m, x, o, g)]);
		function u(e, t, n) {
			let r = [];
			/* istanbul ignore next */
			if (t.forEach((e) => {
				r.includes(e.why.uri) || r.push(e.why.uri);
			}), e.forEach((e) => {
				/* istanbul ignore next */
				r.includes(e.why.uri) || r.push(e.why.uri);
			}), r.length === 0) throw Error("updateMany has no docs to patch");
			if (!v.updater) throw Error("kb has no updater");
			if (r.length === 1) return v.updater.update(e, t, n);
			let i = r.pop(), a = t.filter((e) => e.why.uri === i), o = t.filter((e) => e.why.uri !== i), s = e.filter((e) => e.why.uri === i), c = e.filter((e) => e.why.uri !== i);
			v.updater.update(s, a, function(e, t, r) {
				t ? u(c, o, n) : n(e, t, r);
			});
		}
		u(a, l, function(e, n, a) {
			n ? (r && (D.disabled = !1), D.setAttribute("style", E)) : b.appendChild(i(t, a)), _(n, a);
		});
	}, !0), D.addEventListener("blur", function(e) {
		if (k && D.dataset && D.dataset.deferredChange === "true") {
			delete D.dataset.deferredChange;
			let e = new Event("change", { bubbles: !0 });
			D.dispatchEvent(e);
		}
	}, !0), b) : (D.readOnly = !0, D.style = r.textInputStyleUneditable + T, C && D.value === "" && (b.style.display = "none"), b);
}
//#endregion
export { m as basicField, f as fieldLabel, p as fieldStore, d as renderNameValuePair };

//# sourceMappingURL=basic.esm.js.map