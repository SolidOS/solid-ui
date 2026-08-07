import e from "../lib/ns.esm.js";
import { debug as t, info as n } from "../lib/log.esm.js";
import { label as r } from "../utils/label.esm.js";
import { labelWithOntology as i, syncTableToArrayReOrdered as a } from "../utils/index.esm.js";
import { error as o, log as s, warn as c } from "../lib/debug.esm.js";
import l from "../lib/styleConstants.esm.js";
import { style as u } from "../lib/style.esm.js";
import { errorMessageBlock as d } from "./error.esm.js";
import { icons as f } from "../lib/iconBase.esm.js";
import { allClassURIs as p, button as m, continueButton as h, deleteButtonWithCheck as g, linkButton as _, propertyTriage as v, removeButton as y } from "./buttons.esm.js";
import { fieldParams as b } from "./forms/fieldParams.esm.js";
import { field as x, fieldFunction as S, mostSpecificClassURI as C } from "./forms/fieldFunction.esm.js";
import { setFieldStyle as w } from "./forms/formStyle.esm.js";
import { basicField as T, fieldLabel as E, fieldStore as D, renderNameValuePair as O } from "./forms/basic.esm.js";
import { autocompleteField as k } from "./forms/autocomplete/autocompleteField.esm.js";
import { IconicMultiSelect as A } from "./multiSelect.esm.js";
import "./index.esm.js";
import * as j from "rdflib";
import { store as M } from "solid-logic";
//#region src/widgets/forms.js
var N = "✓", P = "✕", F = "-", I = M;
x[e.ui("AutocompleteField").uri] = k;
function L(t, n, r, i, a, o, c) {
	let l = o.children;
	for (let u = 0; u < c.length; u++) {
		let d = c[u];
		if (C(d) === e.ui("Options").uri) {
			let e = S(t, d)(t, null, n, r, d, i, a);
			s("Refreshing Options field by replacing it."), o.insertBefore(e, l[u]), o.removeChild(l[u + 1]);
		}
	}
}
x[e.ui("Form").uri] = x[e.ui("Group").uri] = function(t, n, r, i, a, o, s) {
	let c = t.createElement("div"), l = e.ui;
	if (n && n.appendChild(c), !a) return;
	let f = i.toNT() + "|" + a.toNT();
	if (r[f]) return c.appendChild(t.createTextNode("Group: see above " + f)), c;
	let p = {};
	for (let e in r) p[e] = 1;
	p[f] = 1;
	let m = a.doc ? a.doc() : null, h = I.any(a, l("weight"), null, m), g = h ? Number(h.value) : 1;
	if (g > 3 || g < 0) return c.appendChild(d(t, `Form Group weight ${g} should be 0-3`));
	c.setAttribute("style", u.formGroupStyle[g]), c.style.display = "flex", c.style.flexDirection = "column", c.class = "form-weight-" + g;
	let _ = I.any(a, l("parts"), null, m), v;
	if (_ ? v = _.elements : (_ = I.each(a, l("part"), null, m), v = W(_)), !_) return c.appendChild(d(t, "No parts to form! "));
	for (let e = 0; e < v.length; e++) {
		let n = v[e], a = S(t, n);
		c.appendChild(a(t, null, p, i, n, o, function(e, n) {
			e && n && n.widget && n.widget === "select" && L(t, r, i, o, s, c, v), s(e, {
				widget: "group",
				change: n
			});
		}));
	}
	return c;
}, x[e.ui("Options").uri] = function(t, n, r, i, a, o, s) {
	let c = M, l = t.createElement("div"), u = a.doc ? a.doc() : null, f = e.ui;
	n && n.appendChild(l);
	let p = c.any(a, f("dependingOn"));
	p ||= e.rdf("type");
	let m = c.each(a, f("case"), null, u);
	m || l.appendChild(d(t, "No cases to Options form. "));
	let h;
	h = p.sameTerm(e.rdf("type")) ? Object.keys(c.findTypeURIs(i)).map((e) => j.sym(e)) : c.each(i, p);
	for (let e = 0; e < m.length; e++) {
		let n = m[e], p = c.each(n, f("for"), null, u), g = !1;
		for (let e = 0; e < p.length; e++) for (let t of h) {
			let n = p[e];
			(t.sameTerm(p) || t.termType === n.termType && t.value === n.value) && (g = !0);
		}
		if (g) {
			let e = c.the(n, f("use"));
			if (e) V(t, l, r, i, e, o, s);
			else return l.appendChild(d(t, "No \"use\" part for case in form " + a)), l;
			break;
		}
	}
	return l;
}, x[e.ui("Multiple").uri] = function(n, i, c, l, u, p, h) {
	function _(e) {
		return e.map((e) => e.toString().slice(-7)).join(", ");
	}
	async function v() {
		let e = Q(p);
		if (O) z(), L.elements.push(e), await B();
		else {
			let t = A ? [j.st(e, k, l, p)] : [j.st(l, k, e, p)];
			try {
				await x.updater.update([], t);
			} catch (e) {
				let t = "Error adding to unordered multiple: " + e;
				w.appendChild(d(n, t)), o(t);
			}
			V();
		}
	}
	function y(e) {
		async function r() {
			if (O) {
				s("pre delete: " + _(L.elements));
				for (let t = 0; t < L.elements.length; t++) if (L.elements[t].sameTerm(e)) {
					L.elements.splice(t, 1), await B();
					return;
				}
			} else if (x.holds(l, k, e, p)) {
				let t = [j.st(l, k, e, p)];
				x.updater.update(t, [], function(e, t, r) {
					t ? I.removeChild(u) : I.appendChild(d(n, "Multiple: delete failed: " + r));
				});
			}
		}
		async function i(t, n) {
			s("pre move: " + _(L.elements));
			let r;
			for (r = 0; r < L.elements.length && !L.elements[r].sameTerm(e); r++);
			if (r === L.elements.length && alert("list move: not found element for " + e), n) {
				if (r === 0) {
					alert("@@ boop - already at top   -temp message");
					return;
				}
				L.elements.splice(r - 1, 2, L.elements[r], L.elements[r - 1]);
			} else {
				if (r === L.elements.length - 1) {
					alert("@@ boop - already at bottom   -temp message");
					return;
				}
				L.elements.splice(r, 2, L.elements[r + 1], L.elements[r]);
			}
			await B();
		}
		function a(t, n) {
			s(`Item done callback for item ${e.toString()}`), t || o("  Item done callback: Error: " + n), h(t, n);
		}
		t("Multiple: render object: " + e);
		let u = S(n, F)(n, null, c, e, F, p, a);
		if (u.subject = e, x.updater.editable(p.uri) && (g(n, u, N, r), O)) {
			let e = n.createElement("div");
			e.style.display = "grid", e.style.gridTemplateColumns = "auto 3em", e.style.gridTemplateRows = "50% 50%";
			let t = m(n, f.iconBase + "noun_1369237.svg", "Move Up", async (e) => i(e, !0)), r = m(n, f.iconBase + "noun_1369241.svg", "Move Down", async (e) => i(e, !1)), a = n.createElement("div");
			return a.appendChild(u), e.appendChild(a), e.appendChild(t), e.appendChild(r), t.style.gridColumn = 2, r.style.gridColumn = 2, t.style.gridRow = 1, r.style.padding = "0em", t.style.padding = "0em", r.style.gridRow = 2, a.style.gridColumn = 1, a.style.gridRowStart = "span 2", e;
		}
		return u;
	}
	let b = f.iconBase + "noun_19460_green.svg", x = M, C = u.doc ? u.doc() : null, w = n.createElement("div"), T = w, E = e.ui;
	i && i.appendChild(w);
	let D = x.any(u, E("ordered")), O = D ? j.Node.toJS(D) : !1, k = x.any(u, E("property")), A = x.anyJS(u, E("reverse"), null, C);
	if (!k) return w.appendChild(d(n, "No property to multiple: " + u)), T;
	let N = x.any(u, E("label"));
	N ||= r(k);
	let P = x.any(u, E("min"));
	P = P ? 0 + P.value : 0;
	let F = x.any(u, E("part"));
	if (!F) return w.appendChild(d(n, "No part to multiple: " + u)), T;
	let I = w.appendChild(n.createElement("div"));
	I.style.display = "flex", I.style.flexDirection = "column";
	let L, R;
	if (R = A ? x.any(null, k, l, p) : x.any(l, k, null, p), O ? (L = A ? x.any(null, k, l, p) : x.any(l, k, null, p), R = L ? L.elements : []) : (R = A ? x.each(null, k, l, p) : x.each(l, k, null, p), L = null), x.updater.editable(p.uri)) {
		let e = w.appendChild(n.createElement("div"));
		e.style.padding = "0.5em";
		let t = e.appendChild(n.createElement("img"));
		t.setAttribute("src", b), t.setAttribute("style", "margin: 0.2em; width: 1.5em; height:1.5em"), t.title = "Click to add another " + N;
		let r = n.createElement("span");
		r.textContent = (R.length === 0 ? "Add another " : "Add ") + N, e.addEventListener("click", async (e) => {
			await v();
		}, !0), e.appendChild(r);
	}
	function z() {
		L || (L = new j.Collection(), A ? x.add(L, k, l, p) : x.add(l, k, L, p));
	}
	async function B() {
		s("save list: " + _(L.elements)), z();
		try {
			await x.fetcher.putBack(p);
		} catch (e) {
			w.appendChild(d(n, "Error trying to put back a list: " + e));
			return;
		}
		V();
	}
	function V() {
		let e;
		if (O) {
			let t = A ? x.the(null, k, l, p) : x.the(l, k, null, p);
			e = t ? t.elements : [];
		} else e = A ? x.each(null, k, l, p) : x.each(l, k, null, p), e.sort();
		a(I, e, y);
	}
	I.refresh = V, V();
	async function H() {
		let e = P - R.length;
		if (e > 0) {
			for (let t = 0; t < e; t++) s("Adding extra: min " + P), await v();
			await B();
		}
	}
	return H().then(() => {
		s(" Multiple render: async stuff ok");
	}, (e) => {
		o(" Multiple render: async stuff fails. #### ", e);
	}), T;
}, x[e.ui("PhoneField").uri] = T, x[e.ui("EmailField").uri] = T, x[e.ui("ColorField").uri] = T, x[e.ui("DateField").uri] = T, x[e.ui("DateTimeField").uri] = T, x[e.ui("TimeField").uri] = T, x[e.ui("NumericField").uri] = T, x[e.ui("IntegerField").uri] = T, x[e.ui("DecimalField").uri] = T, x[e.ui("FloatField").uri] = T, x[e.ui("TextField").uri] = T, x[e.ui("SingleLineTextField").uri] = T, x[e.ui("NamedNodeURIField").uri] = T, x[e.ui("MultiLineTextField").uri] = function(t, n, r, i, a, o, s) {
	let c = e.ui, u = M, f = a.doc ? a.doc() : null, p = u.any(a, c("property"));
	if (!p) return d(t, "No property to text field: " + a);
	let m = t.createElement("div");
	m.style.display = "flex", m.style.flexDirection = "row";
	let h = m.appendChild(t.createElement("div"));
	h.style.width = l.formFieldNameBoxWidth;
	let g = m.appendChild(t.createElement("div"));
	h.appendChild(E(t, p, a)), o = D(i, p, o);
	let _ = u.anyJS(i, p, null, o) || "", v = u.updater.editable(o.uri), y = a && u.anyJS(a, e.ui("suppressEmptyUneditable"), null, f);
	!v && y && _ === "" && (m.style.display = "none");
	let b = q(t, u, i, p, o, s);
	return g.appendChild(b), n && n.appendChild(m), m;
};
function R(t, n, i, a, o, s, c, l) {
	let u = e.ui, f = M, p = f.any(o, u("property"));
	if (!p) {
		let e = d(t, "No property to boolean field: " + o);
		return n && n.appendChild(e), e;
	}
	let m = f.any(o, u("label"));
	m ||= r(p, !0), s = D(a, p, s);
	let h = f.any(a, p);
	h === void 0 && (h = !1);
	let g = j.st(a, p, !0, s), _ = j.st(a, p, !1, s), v = Z(t, f, m, _, g, o, s, l);
	return n && n.appendChild(v), v;
}
x[e.ui("BooleanField").uri] = function(e, t, n, r, i, a, o) {
	return R(e, t, n, r, i, a, o, !1);
}, x[e.ui("TristateField").uri] = function(e, t, n, r, i, a, o) {
	return R(e, t, n, r, i, a, o, !0);
}, x[e.ui("Classifier").uri] = function(n, r, i, a, o, s, c) {
	let l = M, f = e.ui, p = l.any(o, f("category"));
	if (!p) return d(n, "No category for classifier: " + o);
	t("Classifier: dataDoc=" + s);
	let m = function(e, t) {
		return c(e || e, t);
	}, h = n.createElement("div");
	h.setAttribute("class", "classifierBox");
	let g = n.createElement("div");
	g.setAttribute("class", "formFieldName classifierBox-label"), g.appendChild(E(n, p, o)), h.appendChild(g);
	let _ = n.createElement("div");
	_.setAttribute("class", "formFieldValue classifierBox-selectBox");
	let v = X(n, l, a, p, s, m);
	if (v && v.querySelectorAll) {
		let e = v.querySelectorAll("select");
		e.length && !l.updater.editable(s.uri) && e.forEach((e) => {
			e.readOnly = !0, e.style = u.textInputStyleUneditable;
		});
	}
	return _.appendChild(v), h.appendChild(_), r && r.appendChild(h), h;
}, x[e.ui("Choice").uri] = function(t, n, r, i, a, o, s) {
	let c = e.ui, l = M, u = a.doc ? a.doc() : null, f, m = t.createElement("div");
	m.setAttribute("class", "choiceBox"), n && n.appendChild(m);
	let h = t.createElement("div");
	h.setAttribute("class", "formFieldName choiceBox-label"), m.appendChild(h);
	let g = t.createElement("div");
	g.setAttribute("class", "formFieldValue choiceBox-selectBox"), m.appendChild(g);
	let _ = l.any(a, c("property"));
	if (!_) return m.appendChild(d(t, "No property for Choice: " + a));
	h.appendChild(E(t, _, a));
	let y = l.any(a, c("from"));
	if (!y) return d(t, "No 'from' for Choice: " + a);
	let b = l.any(a, c("use")), x = {
		form: a,
		subForm: b,
		disambiguate: !1
	};
	function S(t) {
		let n = [], r;
		n = l.each(void 0, e.rdf("type"), y, u);
		for (let e in ie(l, y, t)) n.push(l.fromNT(e));
		if (y.sameTerm(e.rdfs("Class"))) for (f in p()) n.push(l.sym(f));
		else if (y.sameTerm(e.rdf("Property"))) {
			for (f in r = v(l), r.op) n.push(l.fromNT(f));
			for (f in r.dp) n.push(l.fromNT(f));
			x.disambiguate = !0;
		} else if (y.sameTerm(e.owl("ObjectProperty"))) {
			for (f in r = v(l), r.op) n.push(l.fromNT(f));
			x.disambiguate = !0;
		} else if (y.sameTerm(e.owl("DatatypeProperty"))) {
			for (f in r = v(l), r.dp) n.push(l.fromNT(f));
			x.disambiguate = !0;
		}
		return n;
	}
	l.any(a, c("canMintNew")) && (x.mint = "* Create new *");
	let C = l.any(a, c("multiselect"));
	C && (x.multiSelect = !0);
	let w = l.each(a, c("search-full-store")).length ? null : o, T;
	return g.refresh = function() {
		let n = l.each(i, _, null, o).map((e) => e.value), r = S(w);
		if (r.push(n), r = G(r), T = re(t, g, l, i, _, r, n, y, x, o, s), g.innerHTML = "", g.appendChild(T), C) {
			let r = new A({
				placeholder: T.selected,
				select: T,
				container: g,
				textField: "textField",
				valueField: "valueField"
			});
			r.init(), r.subscribe(function(r) {
				if (r.action === "REMOVE_OPTION" && (n = n.filter(function(e) {
					return e !== r.value;
				})), r.action === "CLEAR_ALL_OPTIONS" && (n = []), r.action === "ADD_OPTION") {
					if ((r.value + "").includes("Create new")) {
						let r = Q(o), a = [];
						a.push(j.st(i, _, l.sym(r), o)), y && a.push(j.st(r, e.rdf("type"), l.sym(y), o)), b && z(t, g, {}, j.sym(r), b, o, function(e, i) {
							e ? (l.updater.update([], a, function(e, n, r) {
								n || g.appendChild(d(t, "Error updating select: " + r));
							}), n.push(r), s && s(e, {
								widget: "select",
								event: "new"
							})) : g.appendChild(d(t, "Error updating data in field of select: " + i));
						});
					} else n.push(r.value);
				}
				T.update(n);
			});
		}
	}, g.refresh(), T && T.refresh && T.refresh(), m;
};
function z(e, t, n, r, i, a, o) {
	S(e, i)(e, t, n, r, i, a, o);
}
x[e.ui("Comment").uri] = x[e.ui("Heading").uri] = function(t, n, r, i, a, o, s) {
	let c = e.ui, l = M, u = l.any(a, c("contents"));
	u ||= "Error: No contents in comment field.";
	let d = a.doc ? a.doc() : null, f = C(a), p = b[f] || {}, m = t.createElement("div");
	n && n.appendChild(m);
	let h = m.appendChild(t.createElement(p.element));
	h.textContent = u, w(h, a);
	let g = l.anyJS(a, e.ui("suppressIfUneditable"), null, d), _ = l.updater.editable(o.uri);
	return g && !_ && (m.style.display = "none"), m;
};
function B(t, n, i, a, o) {
	let s = t.createElement("button");
	return s.setAttribute("type", "button"), s.innerHTML = "Edit " + r(e.ui("Form")), s.addEventListener("click", function(r) {
		V(t, n, {}, i, e.ui("FormForm"), a, o).setAttribute("style", e.ui("FormForm").sameTerm(i) ? "background-color: #fee;" : "background-color: #ffffe7;"), s.parentNode.removeChild(s);
	}, !0), s;
}
function V(e, t, n, r, i, a, o) {
	return S(e, i)(e, t, n, r, i, a, o);
}
function H(t, n) {
	let r = t.each(void 0, e.rdf("range"), n);
	[
		e.rdfs("comment"),
		e.dc("title"),
		e.foaf("name"),
		e.foaf("homepage")
	].forEach(function(e) {
		r.push(e);
	});
	let i = t.each(void 0, e.rdf("type"), n);
	i.length > 60 && (i = i.slice(0, 60));
	let a = {};
	for (let e = 0; e < (i.length > 60 ? 60 : i.length); e++) t.statementsMatching(i[e], void 0, void 0).forEach(function(e) {
		a[e.predicate.uri] = !0;
	});
	r.forEach(function(e) {
		a[e.uri] = !0;
	});
	let o = [];
	for (let e in a) o.push(t.sym(e));
	return o;
}
function U(n, r, i) {
	let a = [n.sym(r)];
	for (; a.length > 0;) {
		let r = a.shift(), o = n.each(r, i);
		if (t("Lists for " + r + ", " + i + ": " + o.length), o.length !== 0) return o;
		let s = n.each(r, e.rdfs("subClassOf"));
		for (let e = 0; e < s.length; e++) a.push(s[e]), t("findClosest: add super: " + s[e]);
	}
	return [];
}
function ee(n) {
	let r = M;
	t("formsFor: subject=" + n);
	let i = r.findTypeURIs(n), a;
	for (a in i) t("   type: " + a);
	let o = r.bottomTypeURIs(i), s = [];
	for (let n in o) t("candidatesFor: trying bottom type =" + n), s = s.concat(U(r, n, e.ui("creationForm"))), s = s.concat(U(r, n, e.ui("annotationForm")));
	return s;
}
function W(t) {
	let n = t.map(function(t) {
		return [I.any(t, e.ui("sequence")) || 9999, t];
	});
	return n.sort(function(e, t) {
		return e[0] - t[0];
	}), n.map(function(e) {
		return e[1];
	});
}
function G(e) {
	let t = e.map(function(e) {
		return [r(e).toLowerCase(), e];
	});
	return t.sort(), t.map(function(e) {
		return e[1];
	});
}
function te(e, t, n, i, a, o, s, c) {
	let l = e.createElement("button");
	return l.setAttribute("type", "button"), l.innerHTML = "New " + r(a), l.addEventListener("click", function(r) {
		l.parentNode.appendChild(K(e, t, n, i, a, o, s, c));
	}, !1), l;
}
function K(i, a, o, s, c, u, d, f) {
	let p = i.createElement("form");
	if (!u) {
		let n = U(a, c.uri, e.ui("creationForm"));
		if (n.length === 0) {
			let e = p.appendChild(i.createElement("p"));
			e.textContent = "I am sorry, you need to provide information about a " + r(c) + " but I don't know enough information about those to ask you.";
			let t = p.appendChild(i.createElement("button"));
			return t.setAttribute("type", "button"), t.setAttribute("style", "float: right;"), t.innerHTML = "Goto " + r(c), t.addEventListener("click", function(e) {
				i.outlineManager.GotoSubject(c, !0, void 0, !0, void 0);
			}, !1), p;
		}
		t("lists[0] is " + n[0]), u = n[0];
	}
	t("form is " + u), p.setAttribute("style", `border: 0.05em solid ${l.formBorderColor}; color: ${l.formBorderColor}`), p.innerHTML = "<h3>New " + r(c) + "</h3>";
	let m = S(i, u), h = Q(d), g = !1, v = function(t, n) {
		if (!t) return f(t, n);
		let r = [];
		o && !a.holds(o, s, h, d) && r.push(j.st(o, s, h, d)), o && !a.holds(h, e.rdf("type"), c, d) && r.push(j.st(h, e.rdf("type"), c, d)), r.length ? a.updater.update([], r, b) : f(!0, n), g ||= p.appendChild(_(i, h));
	};
	function b(e, t, n) {
		return f(t, n);
	}
	n("paneUtils Object is " + h);
	let x = m(i, p, {}, h, u, d, v);
	return y(i, x).setAttribute("style", "float: right;"), p.AJAR_subject = h, p;
}
function q(e, t, n, r, i, a) {
	let o = e.createElement("div"), s = t.anyJS(n, r, null, i) || "", c = e.createElement("textarea");
	o.appendChild(c), c.rows = s ? s.split("\n").length + 2 : 2, c.cols = 80, c.setAttribute("style", u.multilineTextInputStyle), s === null ? c.select() : c.value = s, o.refresh = function() {
		let e = t.any(n, r, null, i);
		e && e.value !== c.value && (c.value = e.value);
	};
	function f(s) {
		m.disabled = !0, m.setAttribute("style", "visibility: hidden; float: right;"), c.disabled = !0, c.style.color = l.textInputColorPending;
		let u = t.statementsMatching(n, r, null, i), f = j.st(n, r, c.value, i);
		t.updater.update(u, f, function(t, n, r) {
			n ? (c.style.color = l.textInputColor, c.disabled = !1) : o.appendChild(d(e, "Error (while saving change to " + i.uri + "): " + r)), a && a(n, r);
		});
	}
	let p = t.updater.editable(i.uri), m;
	return p ? (m = h(e, f), m.disabled = !0, m.style.visibility = "hidden", m.style.float = "right", o.appendChild(m), c.addEventListener("keyup", function(e) {
		c.style.color = "green", m && (m.disabled = !1, m.style.visibility = "");
	}, !0), c.addEventListener("change", f, !0)) : (c.disabled = !0, c.style.backgroundColor = l.textInputBackgroundColorUneditable), o;
}
function J(a, o, s, l, f, p, m, h) {
	t("Select list length now " + f.length);
	let g = 0, _ = {}, v = o.updater.editable(m.uri);
	for (let e = 0; e < f.length; e++) {
		let t = f[e];
		t.uri || c(`makeSelectForClassifierOptions: option does not have an uri: ${t}, with predicate: ${l}`), !(!t.uri || t.uri in _) && (_[t.uri] = !0, g++);
	}
	if (g === 0 && !p.mint) return d(a, "Can't do selector with no options, subject= " + s + " property = " + l + ".");
	t("makeSelectForClassifierOptions: dataDoc=" + m);
	let y, b = function() {
		return y = {}, l.sameTerm(e.rdf("type")) ? y = o.findTypeURIs(s) : o.each(s, l, null, m).forEach(function(e) {
			y[e.uri] = !0;
		}), y;
	};
	y = b();
	let x = function(e) {
		C.disabled = !0;
		let t = [], r = [], i = function(e) {
			o.holds(s, l, e, m) && t.push(j.st(s, l, e, m));
		}, c;
		for (let e = 0; e < C.options.length; e++) {
			let t = C.options[e];
			if (t.selected && t.AJAR_mint) {
				if (p.mintClass) {
					let e = K(a, o, s, l, p.mintClass, null, m, function(e, t) {
						e || h(e, t, { change: "new" });
					});
					C.parentNode.appendChild(e), c = e.AJAR_subject;
				} else c = Q(m);
				r.push(j.st(s, l, c, m)), p.mintStatementsFun && (r = r.concat(p.mintStatementsFun(c)));
			}
			t.AJAR_uri && (t.selected && !(t.AJAR_uri in y) && r.push(j.st(s, l, o.sym(t.AJAR_uri), m)), !t.selected && t.AJAR_uri in y && i(o.sym(t.AJAR_uri)), t.selected && (C.currentURI = t.AJAR_uri));
		}
		let u = C.subSelect;
		for (; u && u.currentURI;) i(o.sym(u.currentURI)), u = u.subSelect;
		for (u = C.superSelect; u && u.currentURI;) i(o.sym(u.currentURI)), u = u.superSelect;
		function f(e, t) {
			h(e, {
				widget: "select",
				event: "new"
			});
		}
		n("makeSelectForClassifierOptions: data doc = " + m), o.updater.update(t, r, function(e, t, n) {
			if (y = b(), t) C.disabled = !1, c && S(a, p.subForm)(a, C.parentNode, {}, c, p.subForm, m, f);
			else return C.parentNode.appendChild(d(a, "Error updating data in select: " + n));
			h && h(t, {
				widget: "select",
				event: "change"
			});
		});
	}, C = a.createElement("select");
	C.setAttribute("style", u.formSelectStyle), p.multiple && C.setAttribute("multiple", "true"), C.currentURI = null, C.refresh = function() {
		y = b();
		for (let e = 0; e < C.children.length; e++) {
			let t = C.children[e];
			t.AJAR_uri && (t.selected = t.AJAR_uri in y);
		}
		C.disabled = !1;
	};
	for (let e in _) {
		let t = o.sym(e), n = a.createElement("option");
		p.disambiguate ? n.appendChild(a.createTextNode(i(t, !0))) : n.appendChild(a.createTextNode(r(t, !0)));
		let s = o.any(t, o.sym("http://www.w3.org/ns/ui#backgroundColor"));
		s && n.setAttribute("style", "background-color: " + s.value + "; "), n.AJAR_uri = e, e in y && (n.setAttribute("selected", "true"), C.currentURI = e), C.appendChild(n);
	}
	if (v && p.mint) {
		let e = a.createElement("option");
		e.appendChild(a.createTextNode(p.mint)), e.AJAR_mint = !0, C.insertBefore(e, C.firstChild);
	}
	if (C.currentURI == null && !p.multiple) {
		let e = a.createElement("option");
		e.appendChild(a.createTextNode(p.nullLabel)), C.insertBefore(e, C.firstChild), e.selected = !0;
	}
	return v && C.addEventListener("change", x, !1), C;
}
function ne(a, o, s, l, f, p, m, h) {
	t("Select list length now " + f.length);
	let g = 0, _ = {}, v = o.updater.editable(m.uri);
	for (let e = 0; e < f.length; e++) {
		let t = f[e];
		t.uri || c(`makeSelectForOptions: option does not have an uri: ${t}, with predicate: ${l}`), !(!t.uri || t.uri in _) && (_[t.uri] = !0, g++);
	}
	if (g === 0) return d(a, "Can't do selector with no options, subject= " + s + " property = " + l + ".");
	t("makeSelectForOptions: dataDoc=" + m);
	let y, b = function() {
		return y = {}, l.sameTerm(e.rdf("type")) ? y = o.findTypeURIs(s) : o.each(s, l, null, m).forEach(function(e) {
			e.uri && (y[e.uri] = !0);
		}), y;
	};
	y = b();
	let x = function(e) {
		S.disabled = !0;
		let t = [], r = [], i = function(e) {
			o.holds(s, l, e, m) && t.push(j.st(s, l, e, m));
		};
		for (let e = 0; e < S.options.length; e++) {
			let t = S.options[e];
			t.AJAR_uri && (t.selected && !(t.AJAR_uri in y) && r.push(j.st(s, l, o.sym(t.AJAR_uri), m)), !t.selected && t.AJAR_uri in y && i(o.sym(t.AJAR_uri)), t.selected && (S.currentURI = t.AJAR_uri));
		}
		let c = S.subSelect;
		for (; c && c.currentURI;) i(o.sym(c.currentURI)), c = c.subSelect;
		for (c = S.superSelect; c && c.currentURI;) i(o.sym(c.currentURI)), c = c.superSelect;
		n("selectForOptions: data doc = " + m), o.updater.update(t, r, function(e, t, n) {
			if (y = b(), t) S.disabled = !1;
			else return S.parentNode.appendChild(d(a, "Error updating data in select: " + n));
			h && h(t, {
				widget: "select",
				event: "change"
			});
		});
	}, S = a.createElement("select");
	S.setAttribute("style", u.formSelectStyle), S.currentURI = null, S.refresh = function() {
		y = b();
		for (let e = 0; e < S.children.length; e++) {
			let t = S.children[e];
			t.AJAR_uri && (t.selected = t.AJAR_uri in y);
		}
		S.disabled = !1;
	};
	for (let e in _) {
		let t = o.sym(e), n = a.createElement("option");
		p.disambiguate ? n.appendChild(a.createTextNode(i(t, !0))) : n.appendChild(a.createTextNode(r(t, !0)));
		let s = o.any(t, o.sym("http://www.w3.org/ns/ui#backgroundColor"));
		s && n.setAttribute("style", "background-color: " + s.value + "; "), n.AJAR_uri = e, e in y && (n.setAttribute("selected", "true"), S.currentURI = e), S.appendChild(n);
	}
	if (!S.currentURI) {
		let e = a.createElement("option");
		e.appendChild(a.createTextNode(p.nullLabel)), S.insertBefore(e, S.firstChild), e.selected = !0;
	}
	return v && S.addEventListener("change", x, !1), S;
}
function Y(n, r, i, a, o, s) {
	let c = r.any(a, e.owl("disjointUnionOf")), l, u = !1;
	return c ? l = c.elements : (l = r.each(void 0, e.rdfs("subClassOf"), a), u = !0), t("Select list length " + l.length), l.length === 0 ? d(n, "Can't do " + (u ? "multiple " : "") + "selector with no subclasses of category: " + a) : l.length === 1 ? d(n, "Can't do " + (u ? "multiple " : "") + "selector with only 1 subclass of category: " + a + ":" + l[1]) : J(n, r, i, e.rdf("type"), l, {
		multiple: u,
		nullLabel: "* Select type *"
	}, o, s);
}
function X(t, n, r, i, a, o) {
	function s() {
		l &&= (c.removeChild(l), null), d.currentURI && n.any(n.sym(d.currentURI), e.owl("disjointUnionOf")) && (l = X(t, n, r, n.sym(d.currentURI), a, o), d.subSelect = l.firstChild, d.subSelect.superSelect = d, c.appendChild(l));
	}
	let c = t.createElement("span"), l = null;
	function u(e, t) {
		e && s(), o(e, t);
	}
	let d = Y(t, n, r, i, a, u);
	return c.appendChild(d), s(), c;
}
function Z(t, n, r, i, a, o, c, l) {
	let f = t.createElement("div"), p = O(t, n, f, o, r), m = n.updater.editable(c.uri), h = t.createElement("button"), g = h;
	h.style = u.checkboxInputStyle, p.appendChild(h);
	function _(e) {
		if (!e) return [];
		if (e.object) return e.why ||= c, [e];
		if (e instanceof Array) return e;
		throw Error("buildCheckboxForm: bad param " + e);
	}
	a = _(a), i = _(i);
	function v(e) {
		return e.filter((e) => !n.holds(e.subject, e.predicate, e.object, e.why)).length === 0;
	}
	function y() {
		let r = v(a), s = r;
		if (i.length) {
			let c = v(i);
			if (r && c) return f.appendChild(d(t, "Inconsistent data in dataDoc!\n" + a + " and\n" + i)), f;
			if (!r && !c) {
				r = null;
				let t = n.any(o, e.ui("default"));
				s = t ? t.value === "1" : l ? null : !1;
			}
		}
		h.state = r, h.textContent = {
			true: N,
			false: l ? P : " ",
			null: F
		}[s];
	}
	if (y(), !m) return f;
	let b = !1;
	return h.addEventListener("click", function(e) {
		if (b) return;
		b = !0, h.disabled = !0;
		let r = !1, o = function() {
			return !r && (r = !0, b = !1, h.disabled = !1, !0);
		}, c = function(e) {
			g.style.color = "#000", g.style.backgroundColor = "#fee", f.appendChild(d(t, `Checkbox: Error updating dataDoc from ${h.state} to ${h.newState}:\n\n${e}`));
		};
		g.style.color = "#bbb";
		let u = h.state === !0 ? a : h.state === !1 ? i : [];
		h.newState = h.state === null ? !0 : h.state === !0 ? !1 : !l || null;
		let p = h.newState === !0 ? a : h.newState === !1 ? i : [];
		s(`  Deleting  ${u}`), s(`  Inserting ${p}`);
		try {
			let e = n.updater.update(u, p, function(e, t, r) {
				o() && (t ? (g.style.color = "#000", h.state = h.newState, h.textContent = {
					true: N,
					false: P,
					null: F
				}[h.state]) : (u.why && n.holds(u.subject, u.predicate, u.object, u.why) && s(" @@@@@ weird if 409 - does hold statement"), c(r)));
			});
			e && typeof e.then == "function" && e.catch(function(e) {
				o() && c(e instanceof Error ? e.message : e);
			}).finally(function() {
				o();
			});
		} catch (e) {
			throw o(), e;
		}
	}, !1), f;
}
function Q(e) {
	let t = /* @__PURE__ */ new Date();
	return j.sym(e.uri + "#id" + ("" + t.getTime()));
}
function re(a, o, s, c, l, f, p, m, h, g, _) {
	let v = {}, y = s.updater.editable(g.uri);
	for (let e = 0; e < f.length; e++) {
		let t = f[e];
		!t.uri || t.uri in v || (v[t.uri] = !0);
	}
	if (Object.keys(v).length === 0 && !h.mint) return d(a, "Can't do selector with no options, subject= " + c + " property = " + l + ".");
	t("makeSelectForChoice: dataDoc=" + g);
	function b() {
		let e = "--- choice ---";
		return l && l.termType !== "BlankNode" && (e = "* Select for property: " + r(l) + " *"), c && c.termType !== "BlankNode" && (e = "* Select for " + r(c, !0) + " *"), e;
	}
	function x() {
		let e = a.createElement("option");
		return e.appendChild(a.createTextNode(b())), e.disabled = !0, e.value = !0, e.hidden = !0, e.selected = !0, e;
	}
	let S = function(e) {
		o.removeChild(o.lastChild), C.refresh();
	}, C = a.createElement("select");
	C.setAttribute("style", u.formSelectStyle), C.setAttribute("id", "formSelect"), C.currentURI = null;
	for (let e in v) C.appendChild(w(e));
	if (y && h.mint) {
		let e = a.createElement("option");
		e.appendChild(a.createTextNode(h.mint)), e.AJAR_mint = !0, C.insertBefore(e, C.firstChild);
	}
	C.children.length === 0 && C.insertBefore(x(), C.firstChild), C.update = function(t) {
		p = t;
		let n = [], r = [], i = function(e) {
			s.holds(c, l, e, g) && n.push(j.st(c, l, e, g));
		}, o = function(t) {
			s.holds(c, l, t, g) || r.push(j.st(c, l, t, g)), m && !s.holds(t, e.rdf("type"), s.sym(m), g) && r.push(j.st(t, e.rdf("type"), s.sym(m), g));
		}, u = s.each(c, l, null, g).map((e) => e.value);
		for (let e of u) $(e, p) || i(j.sym(e));
		for (let e of p) e in u || o(j.sym(e));
		s.updater.update(n, r, function(e, t, n) {
			if (!t) return C.parentNode.appendChild(d(a, "Error updating data in select: " + n));
			C.refresh(), _ && _(t, {
				widget: "select",
				event: "change"
			});
		});
	}, C.refresh = function() {
		C.disabled = !0;
		let t = [], r;
		for (let n = 0; n < C.options.length; n++) {
			let i = C.options[n];
			if (i.selected && i.AJAR_mint) {
				if (h.mintClass) {
					let e = K(a, s, c, l, m, h.subForm, g, function(e, t) {
						e || _(e, t, { change: "new" });
					});
					C.parentNode.appendChild(e), r = e.AJAR_subject;
				} else r = Q(g);
				t.push(j.st(c, l, s.sym(r), g)), m && t.push(j.st(r, e.rdf("type"), s.sym(m), g)), h.mintStatementsFun && (t = t.concat(h.mintStatementsFun(r))), C.currentURI = r;
			}
			i.AJAR_uri && (i.selected && $(i.AJAR_uri, p) && (C.currentURI = i.AJAR_uri), $(i.AJAR_uri, p) || i.removeAttribute("selected"), $(i.AJAR_uri, p) && i.setAttribute("selected", "true"));
		}
		n("selectForOptions: data doc = " + g), C.currentURI && h.subForm && !h.multiSelect && z(a, o, {}, j.sym(C.currentURI), h.subForm, g, function(e, n) {
			e ? (s.updater.update([], t, function(e, t, n) {
				t || o.appendChild(d(a, "Error updating select: " + n));
			}), _ && _(e, {
				widget: "select",
				event: "new"
			})) : o.appendChild(d(a, "Error updating data in field of select: " + n));
		}), C.disabled = !1;
	};
	function w(e) {
		let t = a.createElement("option"), n = s.sym(e), o;
		o = h.disambiguate ? i(n, !0) : r(n, !0), t.appendChild(a.createTextNode(o)), t.setAttribute("value", e);
		let c = s.any(n, s.sym("http://www.w3.org/ns/ui#backgroundColor"));
		return c && t.setAttribute("style", "background-color: " + c.value + "; "), t.AJAR_uri = e, $(n.value, p) && t.setAttribute("selected", "true"), t;
	}
	return y && C.addEventListener("change", S, !1), C;
}
function $(e, t) {
	let n;
	for (n = 0; n < t.length; n++) if (t[n] === e) return !0;
	return !1;
}
function ie(e, t, n) {
	let r, i, a, o, s, c, l, u, d, f, p, m = {};
	m[t.toNT()] = !0;
	let h = {}, g = e.transitiveClosure(m, e.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf"), !0);
	for (let t in g) {
		s = e.statementsMatching(null, e.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), e.fromNT(t), n);
		for (let e = 0, t = s.length; e < t; e++) f = s[e], h[f.subject.toNT()] = f;
		c = e.each(null, e.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#domain"), e.fromNT(t), n);
		for (let t = 0, i = c.length; t < i; t++) for (o = c[t], l = e.statementsMatching(null, o, null, n), a = 0, r = l.length; a < r; a++) f = l[a], h[f.subject.toNT()] = f;
		u = e.each(null, e.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#range"), e.fromNT(t), n);
		for (let t = 0, r = u.length; t < r; t++) for (o = u[t], d = e.statementsMatching(null, o, null, n), p = 0, i = d.length; p < i; p++) f = d[p], h[f.object.toNT()] = f;
	}
	return h;
}
//#endregion
export { V as appendForm, T as basicField, Z as buildCheckboxForm, B as editFormButton, x as field, S as fieldFunction, E as fieldLabel, b as fieldParams, D as fieldStore, U as findClosest, ee as formsFor, q as makeDescription, Y as makeSelectForCategory, re as makeSelectForChoice, J as makeSelectForClassifierOptions, X as makeSelectForNestedCategory, ne as makeSelectForOptions, C as mostSpecificClassURI, te as newButton, Q as newThing, K as promptForNew, H as propertiesForClass, O as renderNameValuePair, G as sortByLabel, W as sortBySequence };

//# sourceMappingURL=forms.esm.js.map