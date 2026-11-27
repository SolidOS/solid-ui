import { Literal as e, st as t } from "rdflib";
import { solidLogicSingleton as n } from "solid-logic";
import r from "../../lib/ns.esm.js";
import { label as i } from "../../utils/label.esm.js";
import { style as a } from "../../lib/style.esm.js";
import o from "../../lib/styleConstants.esm.js";
import "../../utils/index.esm.js";
import { errorMessageBlock as s } from "../error.esm.js";
import { mostSpecificClassURI as c } from "./fieldFunction.esm.js";
import { fieldParams as l } from "./fieldParams.esm.js";
// src/widgets/forms/basic.ts
var u = n.store;
function d(e, t, n, i, c) {
	n.style.display = "flex", n.style.flexDirection = "row";
	let l = n.appendChild(e.createElement("div"));
	l.style.width = o.formFieldNameBoxWidth;
	let u = n.appendChild(e.createElement("div"));
	return l.setAttribute("class", "formFieldName"), l.setAttribute("style", a.formFieldNameBoxStyle), u.setAttribute("class", "formFieldValue"), c ? l.appendChild(e.createTextNode(c)) : t.any(i, r.ui("property")) ? l.appendChild(f(e, t.any(i, r.ui("property")), i)) : (u.appendChild(s(e, "No property or label given for form field: " + i)), l.appendChild(e.createTextNode("???"))), u;
}
function f(e, t, n) {
	let a = u.any(n, r.ui("label"));
	if (a ||= i(t, !0), t === void 0) return e.createTextNode("@@Internal error: undefined property");
	let o = e.createElement("a");
	return t.uri && o.setAttribute("href", t.uri), o.setAttribute("style", "color: #3B5998; text-decoration: none;"), o.textContent = a, o;
}
function p(e, t, n) {
	let r = u.statementsMatching(e, t);
	if (r.length === 0) return n;
	if (!u.updater) throw Error("Store has no updater");
	return r.length > 0 && r[0].why.value && u.updater.editable(r[0].why.value, u) ? u.sym(r[0].why.value) : n;
}
function m(n, i, f, m, h, g, _) {
	let v = u, y = h.doc ? h.doc() : null, b = n.createElement("div"), x = v.any(h, r.ui("property"));
	if (i && i.appendChild(b), !x) return b.appendChild(s(n, "Error: No property given for text field: " + h));
	let S = d(n, v, b, h), C = v.anyJS(h, r.ui("suppressEmptyUneditable"), null, y), w = c(h), T = l[w];
	T === void 0 && (T = { style: "" });
	let E = T.style || "", D = a.textInputStyle + E, O = n.createElement("input");
	O.style = D, S.appendChild(O), O.setAttribute("type", T.type ? T.type : "text");
	let k = (O.getAttribute("type") || "").toLowerCase(), A = k === "date" || k === "datetime-local", j = v.anyJS(h, r.ui("size")) || o.textInputSize || 20;
	O.setAttribute("size", j);
	let M = v.any(h, r.ui("maxLength"));
	O.setAttribute("maxLength", M ? "" + M : o.basicMaxLength), g ||= p(m, x, g);
	let N = v.any(m, x, void 0, g);
	if (N ||= v.any(h, r.ui("default")), N && N.value && T.uriPrefix ? O.value = decodeURIComponent(N.value.replace(T.uriPrefix, "")).replace(/ /g, "") : N && 
	/* istanbul ignore next */
	(O.value = N.value || N.value || ""), O.setAttribute("style", D), !v.updater) throw Error("kb has no updater");
	return v.updater.editable(g.uri) ? (O.addEventListener("keyup", function(e) {
		T.pattern && O.setAttribute("style", D + (O.value.match(T.pattern) ? "color: green;" : "color: red;"));
	}, !0), O.addEventListener("change", function(i) {
		if (A && n.activeElement === O) {
			O.dataset && (O.dataset.deferredChange = "true");
			return;
		}
		if (T.pattern && !O.value.match(T.pattern)) return;
		let a = !A;
		a && (O.disabled = !0), O.setAttribute("style", D + "color: gray;");
		let o = v.statementsMatching(m, x), c;
		T.namedNode ? c = v.sym(O.value) : T.uriPrefix ? (c = encodeURIComponent(O.value.replace(/ /g, "")), c = v.sym(T.uriPrefix + O.value)) : c = T.dt ? new e(O.value.trim(), void 0, r.xsd(T.dt)) : new e(O.value);
		let l = o.map((e) => t(e.subject, e.predicate, c, e.why));
		l.length === 0 && (l = [t(m, x, c, g)]);
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
		u(o, l, function(e, t, r) {
			t ? (a && (O.disabled = !1), O.setAttribute("style", D)) : b.appendChild(s(n, r)), _(t, r);
		});
	}, !0), O.addEventListener("blur", function(e) {
		if (A && O.dataset && O.dataset.deferredChange === "true") {
			delete O.dataset.deferredChange;
			let e = new Event("change", { bubbles: !0 });
			O.dispatchEvent(e);
		}
	}, !0), b) : (O.readOnly = !0, O.style = a.textInputStyleUneditable + E, C && O.value === "" && (b.style.display = "none"), b);
}
export { m as basicField, f as fieldLabel, p as fieldStore, d as renderNameValuePair };

//# sourceMappingURL=basic.esm.js.map