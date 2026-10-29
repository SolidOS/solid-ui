import { allClassURIs as e, button as t, continueButton as n, deleteButtonWithCheck as r, linkButton as i, propertyTriage as a, removeButton as o } from "./buttons.esm.js";
import { fieldParams as s } from "./forms/fieldParams.esm.js";
import { label as c } from "../utils/label.esm.js";
import { field as l, fieldFunction as u, mostSpecificClassURI as d } from "./forms/fieldFunction.esm.js";
import { setFieldStyle as f } from "./forms/formStyle.esm.js";
import { error as p, log as m, warn as h } from "../lib/debug.esm.js";
import { errorMessageBlock as g } from "./error.esm.js";
import { basicField as _, fieldLabel as v, fieldStore as y, renderNameValuePair as b } from "./forms/basic.esm.js";
import { autocompleteField as x } from "./forms/autocomplete/autocompleteField.esm.js";
import { style as S } from "../lib/style.esm.js";
import C from "../lib/styleConstants.esm.js";
import { icons as w } from "../lib/iconBase.esm.js";
import { debug as T, info as E } from "../lib/log.esm.js";
import D from "../lib/ns.esm.js";
import { labelWithOntology as O, syncTableToArrayReOrdered as ee } from "../utils/index.esm.js";
import { IconicMultiSelect as k } from "./multiSelect.esm.js";
import "./index.esm.js";
import * as A from "rdflib";
import { store as j } from "solid-logic";
// src/widgets/forms.js
var M = "✓", N = "✕", P = "-", F = j;
l[D.ui("AutocompleteField").uri] = x;
function I(e, t, n, r, i, a, o) {
	let s = a.children;
	for (let c = 0; c < o.length; c++) {
		let l = o[c];
		if (d(l) === D.ui("Options").uri) {
			let o = u(e, l)(e, null, t, n, l, r, i);
			m("Refreshing Options field by replacing it."), a.insertBefore(o, s[c]), a.removeChild(s[c + 1]);
		}
	}
}
l[D.ui("Form").uri] = l[D.ui("Group").uri] = function(e, t, n, r, i, a, o) {
	let s = e.createElement("div"), c = D.ui;
	if (t && t.appendChild(s), !i) return;
	let l = r.toNT() + "|" + i.toNT();
	if (n[l]) return s.appendChild(e.createTextNode("Group: see above " + l)), s;
	let d = {};
	for (let e in n) d[e] = 1;
	d[l] = 1;
	let f = i.doc ? i.doc() : null, p = F.any(i, c("weight"), null, f), m = p ? Number(p.value) : 1;
	if (m > 3 || m < 0) return s.appendChild(g(e, `Form Group weight ${m} should be 0-3`));
	s.setAttribute("style", S.formGroupStyle[m]), s.style.display = "flex", s.style.flexDirection = "column", s.class = "form-weight-" + m;
	let h = F.any(i, c("parts"), null, f), _;
	if (h ? _ = h.elements : (h = F.each(i, c("part"), null, f), _ = U(h)), !h) return s.appendChild(g(e, "No parts to form! "));
	for (let t = 0; t < _.length; t++) {
		let i = _[t], c = u(e, i);
		s.appendChild(c(e, null, d, r, i, a, function(t, i) {
			t && i && i.widget && i.widget === "select" && I(e, n, r, a, o, s, _), o(t, {
				widget: "group",
				change: i
			});
		}));
	}
	return s;
}, l[D.ui("Options").uri] = function(e, t, n, r, i, a, o) {
	let s = j, c = e.createElement("div"), l = i.doc ? i.doc() : null, u = D.ui;
	t && t.appendChild(c);
	let d = s.any(i, u("dependingOn"));
	d ||= D.rdf("type");
	let f = s.each(i, u("case"), null, l);
	f || c.appendChild(g(e, "No cases to Options form. "));
	let p;
	p = d.sameTerm(D.rdf("type")) ? Object.keys(s.findTypeURIs(r)).map((e) => A.sym(e)) : s.each(r, d);
	for (let t = 0; t < f.length; t++) {
		let d = f[t], m = s.each(d, u("for"), null, l), h = !1;
		for (let e = 0; e < m.length; e++) for (let t of p) {
			let n = m[e];
			(t.sameTerm(m) || t.termType === n.termType && t.value === n.value) && (h = !0);
		}
		if (h) {
			let t = s.the(d, u("use"));
			if (t) B(e, c, n, r, t, a, o);
			else return c.appendChild(g(e, "No \"use\" part for case in form " + i)), c;
			break;
		}
	}
	return c;
}, l[D.ui("Multiple").uri] = function(e, n, i, a, o, s, l) {
	function d(e) {
		return e.map((e) => e.toString().slice(-7)).join(", ");
	}
	async function f() {
		let t = Z(s);
		if (E) R(), I.elements.push(t), await z();
		else {
			let n = k ? [A.st(t, O, a, s)] : [A.st(a, O, t, s)];
			try {
				await v.updater.update([], n);
			} catch (t) {
				let n = "Error adding to unordered multiple: " + t;
				b.appendChild(g(e, n)), p(n);
			}
			B();
		}
	}
	function h(n) {
		async function o() {
			if (E) {
				m("pre delete: " + d(I.elements));
				for (let e = 0; e < I.elements.length; e++) if (I.elements[e].sameTerm(n)) {
					I.elements.splice(e, 1), await z();
					return;
				}
			} else if (v.holds(a, O, n, s)) {
				let t = [A.st(a, O, n, s)];
				v.updater.update(t, [], function(t, n, r) {
					n ? F.removeChild(h) : F.appendChild(g(e, "Multiple: delete failed: " + r));
				});
			}
		}
		async function c(e, t) {
			m("pre move: " + d(I.elements));
			let r = 0;
			for (; r < I.elements.length && !I.elements[r].sameTerm(n); r++);
			if (r === I.elements.length && alert("list move: not found element for " + n), t) {
				if (r === 0) {
					alert("@@ boop - already at top   -temp message");
					return;
				}
				I.elements.splice(r - 1, 2, I.elements[r], I.elements[r - 1]);
			} else {
				if (r === I.elements.length - 1) {
					alert("@@ boop - already at bottom   -temp message");
					return;
				}
				I.elements.splice(r, 2, I.elements[r + 1], I.elements[r]);
			}
			await z();
		}
		function f(e, t) {
			m(`Item done callback for item ${n.toString()}`), e || p("  Item done callback: Error: " + t), l(e, t);
		}
		T("Multiple: render object: " + n);
		let h = u(e, P)(e, null, i, n, P, s, f);
		if (h.subject = n, v.updater.editable(s.uri) && (r(e, h, M, o), E)) {
			let n = e.createElement("div");
			n.style.display = "grid", n.style.gridTemplateColumns = "auto 3em", n.style.gridTemplateRows = "50% 50%";
			let r = t(e, w.iconBase + "noun_1369237.svg", "Move Up", async (e) => c(e, !0)), i = t(e, w.iconBase + "noun_1369241.svg", "Move Down", async (e) => c(e, !1)), a = e.createElement("div");
			return a.appendChild(h), n.appendChild(a), n.appendChild(r), n.appendChild(i), r.style.gridColumn = 2, i.style.gridColumn = 2, r.style.gridRow = 1, i.style.padding = "0em", r.style.padding = "0em", i.style.gridRow = 2, a.style.gridColumn = 1, a.style.gridRowStart = "span 2", n;
		}
		return h;
	}
	let _ = w.iconBase + "noun_19460_green.svg", v = j, y = o.doc ? o.doc() : null, b = e.createElement("div"), x = b, S = D.ui;
	n && n.appendChild(b);
	let C = v.any(o, S("ordered")), E = C ? A.Node.toJS(C) : !1, O = v.any(o, S("property")), k = v.anyJS(o, S("reverse"), null, y);
	if (!O) return b.appendChild(g(e, "No property to multiple: " + o)), x;
	let M = v.any(o, S("label"));
	M ||= c(O);
	let N = v.any(o, S("min"));
	N = N ? 0 + N.value : 0;
	let P = v.any(o, S("part"));
	if (!P) return b.appendChild(g(e, "No part to multiple: " + o)), x;
	let F = b.appendChild(e.createElement("div"));
	F.style.display = "flex", F.style.flexDirection = "column";
	let I, L;
	if (L = k ? v.any(null, O, a, s) : v.any(a, O, null, s), E ? (I = k ? v.any(null, O, a, s) : v.any(a, O, null, s), L = I ? I.elements : []) : (L = k ? v.each(null, O, a, s) : v.each(a, O, null, s), I = null), v.updater.editable(s.uri)) {
		let t = b.appendChild(e.createElement("div"));
		t.style.padding = "0.5em";
		let n = t.appendChild(e.createElement("img"));
		n.setAttribute("src", _), n.setAttribute("style", "margin: 0.2em; width: 1.5em; height:1.5em"), n.title = "Click to add another " + M;
		let r = e.createElement("span");
		r.textContent = (L.length === 0 ? "Add another " : "Add ") + M, t.addEventListener("click", async (e) => {
			await f();
		}, !0), t.appendChild(r);
	}
	function R() {
		I || (I = new A.Collection(), k ? v.add(I, O, a, s) : v.add(a, O, I, s));
	}
	async function z() {
		m("save list: " + d(I.elements)), R();
		try {
			await v.fetcher.putBack(s);
		} catch (t) {
			b.appendChild(g(e, "Error trying to put back a list: " + t));
			return;
		}
		B();
	}
	function B() {
		let e;
		if (E) {
			let t = k ? v.the(null, O, a, s) : v.the(a, O, null, s);
			e = t ? t.elements : [];
		} else e = k ? v.each(null, O, a, s) : v.each(a, O, null, s), e.sort();
		ee(F, e, h);
	}
	F.refresh = B, B();
	async function V() {
		let e = N - L.length;
		if (e > 0) {
			for (let t = 0; t < e; t++) m("Adding extra: min " + N), await f();
			await z();
		}
	}
	return V().then(() => {
		m(" Multiple render: async stuff ok");
	}, (e) => {
		p(" Multiple render: async stuff fails. #### ", e);
	}), x;
}, l[D.ui("PhoneField").uri] = _, l[D.ui("EmailField").uri] = _, l[D.ui("ColorField").uri] = _, l[D.ui("DateField").uri] = _, l[D.ui("DateTimeField").uri] = _, l[D.ui("TimeField").uri] = _, l[D.ui("NumericField").uri] = _, l[D.ui("IntegerField").uri] = _, l[D.ui("DecimalField").uri] = _, l[D.ui("FloatField").uri] = _, l[D.ui("TextField").uri] = _, l[D.ui("SingleLineTextField").uri] = _, l[D.ui("NamedNodeURIField").uri] = _, l[D.ui("MultiLineTextField").uri] = function(e, t, n, r, i, a, o) {
	let s = D.ui, c = j, l = i.doc ? i.doc() : null, u = c.any(i, s("property"));
	if (!u) return g(e, "No property to text field: " + i);
	let d = e.createElement("div");
	d.style.display = "flex", d.style.flexDirection = "row";
	let f = d.appendChild(e.createElement("div"));
	f.style.width = C.formFieldNameBoxWidth;
	let p = d.appendChild(e.createElement("div"));
	f.appendChild(v(e, u, i)), a = y(r, u, a);
	let m = c.anyJS(r, u, null, a) || "", h = c.updater.editable(a.uri), _ = i && c.anyJS(i, D.ui("suppressEmptyUneditable"), null, l);
	!h && _ && m === "" && (d.style.display = "none");
	let b = K(e, c, r, u, a, o);
	return p.appendChild(b), t && t.appendChild(d), d;
};
function L(e, t, n, r, i, a, o, s) {
	let l = D.ui, u = j, d = u.any(i, l("property"));
	if (!d) {
		let n = g(e, "No property to boolean field: " + i);
		return t && t.appendChild(n), n;
	}
	let f = u.any(i, l("label"));
	f ||= c(d, !0), a = y(r, d, a);
	let p = u.any(r, d);
	p === void 0 && (p = !1);
	let m = A.st(r, d, !0, a), h = A.st(r, d, !1, a), _ = X(e, u, f, h, m, i, a, s);
	return t && t.appendChild(_), _;
}
l[D.ui("BooleanField").uri] = function(e, t, n, r, i, a, o) {
	return L(e, t, n, r, i, a, o, !1);
}, l[D.ui("TristateField").uri] = function(e, t, n, r, i, a, o) {
	return L(e, t, n, r, i, a, o, !0);
}, l[D.ui("Classifier").uri] = function(e, t, n, r, i, a, o) {
	let s = j, c = D.ui, l = s.any(i, c("category"));
	if (!l) return g(e, "No category for classifier: " + i);
	T("Classifier: dataDoc=" + a);
	let u = function(e, t) {
		return o(e || e, t);
	}, d = e.createElement("div");
	d.setAttribute("class", "classifierBox");
	let f = e.createElement("div");
	f.setAttribute("class", "formFieldName classifierBox-label"), f.appendChild(v(e, l, i)), d.appendChild(f);
	let p = e.createElement("div");
	p.setAttribute("class", "formFieldValue classifierBox-selectBox");
	let m = Y(e, s, r, l, a, u);
	if (m && m.querySelectorAll) {
		let e = m.querySelectorAll("select");
		e.length && !s.updater.editable(a.uri) && e.forEach((e) => {
			e.readOnly = !0, e.style = S.textInputStyleUneditable;
		});
	}
	return p.appendChild(m), d.appendChild(p), t && t.appendChild(d), d;
}, l[D.ui("Choice").uri] = function(t, n, r, i, o, s, c) {
	let l = D.ui, u = j, d = o.doc ? o.doc() : null, f, p = t.createElement("div");
	p.setAttribute("class", "choiceBox"), n && n.appendChild(p);
	let m = t.createElement("div");
	m.setAttribute("class", "formFieldName choiceBox-label"), p.appendChild(m);
	let h = t.createElement("div");
	h.setAttribute("class", "formFieldValue choiceBox-selectBox"), p.appendChild(h);
	let _ = u.any(o, l("property"));
	if (!_) return p.appendChild(g(t, "No property for Choice: " + o));
	m.appendChild(v(t, _, o));
	let y = u.any(o, l("from"));
	if (!y) return g(t, "No 'from' for Choice: " + o);
	let b = u.any(o, l("use")), x = {
		form: o,
		subForm: b,
		disambiguate: !1
	};
	function S(t) {
		let n = [], r;
		n = u.each(void 0, D.rdf("type"), y, d);
		for (let e in ie(u, y, t)) n.push(u.fromNT(e));
		if (y.sameTerm(D.rdfs("Class"))) for (f in e()) n.push(u.sym(f));
		else if (y.sameTerm(D.rdf("Property"))) {
			for (f in r = a(u), r.op) n.push(u.fromNT(f));
			for (f in r.dp) n.push(u.fromNT(f));
			x.disambiguate = !0;
		} else if (y.sameTerm(D.owl("ObjectProperty"))) {
			for (f in r = a(u), r.op) n.push(u.fromNT(f));
			x.disambiguate = !0;
		} else if (y.sameTerm(D.owl("DatatypeProperty"))) {
			for (f in r = a(u), r.dp) n.push(u.fromNT(f));
			x.disambiguate = !0;
		}
		return n;
	}
	u.any(o, l("canMintNew")) && (x.mint = "* Create new *");
	let C = u.any(o, l("multiselect"));
	C && (x.multiSelect = !0);
	let w = u.each(o, l("search-full-store")).length ? null : s, T;
	return h.refresh = function() {
		let e = u.each(i, _, null, s).map((e) => e.value), n = S(w);
		if (n.push(e), n = W(n), T = Q(t, h, u, i, _, n, e, y, x, s, c), h.innerHTML = "", h.appendChild(T), C) {
			let n = new k({
				placeholder: T.selected,
				select: T,
				container: h,
				textField: "textField",
				valueField: "valueField"
			});
			n.init(), n.subscribe(function(n) {
				if (n.action === "REMOVE_OPTION" && (e = e.filter(function(e) {
					return e !== n.value;
				})), n.action === "CLEAR_ALL_OPTIONS" && (e = []), n.action === "ADD_OPTION") {
					if ((n.value + "").includes("Create new")) {
						let n = Z(s), r = [];
						r.push(A.st(i, _, u.sym(n), s)), y && r.push(A.st(n, D.rdf("type"), u.sym(y), s)), b && R(t, h, {}, A.sym(n), b, s, function(i, a) {
							i ? (u.updater.update([], r, function(e, n, r) {
								n || h.appendChild(g(t, "Error updating select: " + r));
							}), e.push(n), c && c(i, {
								widget: "select",
								event: "new"
							})) : h.appendChild(g(t, "Error updating data in field of select: " + a));
						});
					} else e.push(n.value);
				}
				T.update(e);
			});
		}
	}, h.refresh(), T && T.refresh && T.refresh(), p;
};
function R(e, t, n, r, i, a, o) {
	u(e, i)(e, t, n, r, i, a, o);
}
l[D.ui("Comment").uri] = l[D.ui("Heading").uri] = function(e, t, n, r, i, a, o) {
	let c = D.ui, l = j, u = l.any(i, c("contents"));
	u ||= "Error: No contents in comment field.";
	let p = i.doc ? i.doc() : null, m = d(i), h = s[m] || {}, g = e.createElement("div");
	t && t.appendChild(g);
	let _ = g.appendChild(e.createElement(h.element));
	_.textContent = u, f(_, i);
	let v = l.anyJS(i, D.ui("suppressIfUneditable"), null, p), y = l.updater.editable(a.uri);
	return v && !y && (g.style.display = "none"), g;
};
function z(e, t, n, r, i) {
	let a = e.createElement("button");
	return a.setAttribute("type", "button"), a.innerHTML = "Edit " + c(D.ui("Form")), a.addEventListener("click", function(o) {
		B(e, t, {}, n, D.ui("FormForm"), r, i).setAttribute("style", D.ui("FormForm").sameTerm(n) ? "background-color: #fee;" : "background-color: #ffffe7;"), a.parentNode.removeChild(a);
	}, !0), a;
}
function B(e, t, n, r, i, a, o) {
	return u(e, i)(e, t, n, r, i, a, o);
}
function V(e, t) {
	let n = e.each(void 0, D.rdf("range"), t);
	[
		D.rdfs("comment"),
		D.dc("title"),
		D.foaf("name"),
		D.foaf("homepage")
	].forEach(function(e) {
		n.push(e);
	});
	let r = e.each(void 0, D.rdf("type"), t);
	r.length > 60 && (r = r.slice(0, 60));
	let i = {};
	for (let t = 0; t < (r.length > 60 ? 60 : r.length); t++) e.statementsMatching(r[t], void 0, void 0).forEach(function(e) {
		i[e.predicate.uri] = !0;
	});
	n.forEach(function(e) {
		i[e.uri] = !0;
	});
	let a = [];
	for (let t in i) a.push(e.sym(t));
	return a;
}
function H(e, t, n) {
	let r = [e.sym(t)];
	for (; r.length > 0;) {
		let t = r.shift(), i = e.each(t, n);
		if (T("Lists for " + t + ", " + n + ": " + i.length), i.length !== 0) return i;
		let a = e.each(t, D.rdfs("subClassOf"));
		for (let e = 0; e < a.length; e++) r.push(a[e]), T("findClosest: add super: " + a[e]);
	}
	return [];
}
function te(e) {
	let t = j;
	T("formsFor: subject=" + e);
	let n = t.findTypeURIs(e), r;
	for (r in n) T("   type: " + r);
	let i = t.bottomTypeURIs(n), a = [];
	for (let e in i) T("candidatesFor: trying bottom type =" + e), a = a.concat(H(t, e, D.ui("creationForm"))), a = a.concat(H(t, e, D.ui("annotationForm")));
	return a;
}
function U(e) {
	let t = e.map(function(e) {
		return [F.any(e, D.ui("sequence")) || 9999, e];
	});
	return t.sort(function(e, t) {
		return e[0] - t[0];
	}), t.map(function(e) {
		return e[1];
	});
}
function W(e) {
	let t = e.map(function(e) {
		return [c(e).toLowerCase(), e];
	});
	return t.sort(), t.map(function(e) {
		return e[1];
	});
}
function ne(e, t, n, r, i, a, o, s) {
	let l = e.createElement("button");
	return l.setAttribute("type", "button"), l.innerHTML = "New " + c(i), l.addEventListener("click", function(c) {
		l.parentNode.appendChild(G(e, t, n, r, i, a, o, s));
	}, !1), l;
}
function G(e, t, n, r, a, s, l, d) {
	let f = e.createElement("form");
	if (!s) {
		let n = H(t, a.uri, D.ui("creationForm"));
		if (n.length === 0) {
			let t = f.appendChild(e.createElement("p"));
			t.textContent = "I am sorry, you need to provide information about a " + c(a) + " but I don't know enough information about those to ask you.";
			let n = f.appendChild(e.createElement("button"));
			return n.setAttribute("type", "button"), n.setAttribute("style", "float: right;"), n.innerHTML = "Goto " + c(a), n.addEventListener("click", function(t) {
				e.outlineManager.GotoSubject(a, !0, void 0, !0, void 0);
			}, !1), f;
		}
		T("lists[0] is " + n[0]), s = n[0];
	}
	T("form is " + s), f.setAttribute("style", `border: 0.05em solid ${C.formBorderColor}; color: ${C.formBorderColor}`), f.innerHTML = "<h3>New " + c(a) + "</h3>";
	let p = u(e, s), m = Z(l), h = !1, g = function(o, s) {
		if (!o) return d(o, s);
		let c = [];
		n && !t.holds(n, r, m, l) && c.push(A.st(n, r, m, l)), n && !t.holds(m, D.rdf("type"), a, l) && c.push(A.st(m, D.rdf("type"), a, l)), c.length ? t.updater.update([], c, _) : d(!0, s), h ||= f.appendChild(i(e, m));
	};
	function _(e, t, n) {
		return d(t, n);
	}
	E("paneUtils Object is " + m);
	let v = p(e, f, {}, m, s, l, g);
	return o(e, v).setAttribute("style", "float: right;"), f.AJAR_subject = m, f;
}
function K(e, t, r, i, a, o) {
	let s = e.createElement("div"), c = t.anyJS(r, i, null, a) || "", l = e.createElement("textarea");
	s.appendChild(l), l.rows = c ? c.split("\n").length + 2 : 2, l.cols = 80, l.setAttribute("style", S.multilineTextInputStyle), c === null ? l.select() : l.value = c, s.refresh = function() {
		let e = t.any(r, i, null, a);
		e && e.value !== l.value && (l.value = e.value);
	};
	function u(n) {
		f.disabled = !0, f.setAttribute("style", "visibility: hidden; float: right;"), l.disabled = !0, l.style.color = C.textInputColorPending;
		let c = t.statementsMatching(r, i, null, a), u = A.st(r, i, l.value, a);
		t.updater.update(c, u, function(t, n, r) {
			n ? (l.style.color = C.textInputColor, l.disabled = !1) : s.appendChild(g(e, "Error (while saving change to " + a.uri + "): " + r)), o && o(n, r);
		});
	}
	let d = t.updater.editable(a.uri), f;
	return d ? (f = n(e, u), f.disabled = !0, f.style.visibility = "hidden", f.style.float = "right", s.appendChild(f), l.addEventListener("keyup", function(e) {
		l.style.color = "green", f && (f.disabled = !1, f.style.visibility = "");
	}, !0), l.addEventListener("change", u, !0)) : (l.disabled = !0, l.style.backgroundColor = C.textInputBackgroundColorUneditable), s;
}
function q(e, t, n, r, i, a, o, s) {
	T("Select list length now " + i.length);
	let l = 0, d = {}, f = t.updater.editable(o.uri);
	for (let e = 0; e < i.length; e++) {
		let t = i[e];
		t.uri || h(`makeSelectForClassifierOptions: option does not have an uri: ${t}, with predicate: ${r}`), !t.uri || t.uri in d || (d[t.uri] = !0, l++);
	}
	if (l === 0 && !a.mint) return g(e, "Can't do selector with no options, subject= " + n + " property = " + r + ".");
	T("makeSelectForClassifierOptions: dataDoc=" + o);
	let p, m = function() {
		return p = {}, r.sameTerm(D.rdf("type")) ? p = t.findTypeURIs(n) : t.each(n, r, null, o).forEach(function(e) {
			p[e.uri] = !0;
		}), p;
	};
	p = m();
	let _ = function(i) {
		v.disabled = !0;
		let c = [], l = [], d = function(e) {
			t.holds(n, r, e, o) && c.push(A.st(n, r, e, o));
		}, f;
		for (let i = 0; i < v.options.length; i++) {
			let c = v.options[i];
			if (c.selected && c.AJAR_mint) {
				if (a.mintClass) {
					let i = G(e, t, n, r, a.mintClass, null, o, function(e, t) {
						e || s(e, t, { change: "new" });
					});
					v.parentNode.appendChild(i), f = i.AJAR_subject;
				} else f = Z(o);
				l.push(A.st(n, r, f, o)), a.mintStatementsFun && (l = l.concat(a.mintStatementsFun(f)));
			}
			c.AJAR_uri && (c.selected && !(c.AJAR_uri in p) && l.push(A.st(n, r, t.sym(c.AJAR_uri), o)), !c.selected && c.AJAR_uri in p && d(t.sym(c.AJAR_uri)), c.selected && (v.currentURI = c.AJAR_uri));
		}
		let h = v.subSelect;
		for (; h && h.currentURI;) d(t.sym(h.currentURI)), h = h.subSelect;
		for (h = v.superSelect; h && h.currentURI;) d(t.sym(h.currentURI)), h = h.superSelect;
		function _(e, t) {
			s(e, {
				widget: "select",
				event: "new"
			});
		}
		E("makeSelectForClassifierOptions: data doc = " + o), t.updater.update(c, l, function(t, n, r) {
			if (p = m(), n) v.disabled = !1, f && u(e, a.subForm)(e, v.parentNode, {}, f, a.subForm, o, _);
			else return v.parentNode.appendChild(g(e, "Error updating data in select: " + r));
			s && s(n, {
				widget: "select",
				event: "change"
			});
		});
	}, v = e.createElement("select");
	v.setAttribute("style", S.formSelectStyle), a.multiple && v.setAttribute("multiple", "true"), v.currentURI = null, v.refresh = function() {
		p = m();
		for (let e = 0; e < v.children.length; e++) {
			let t = v.children[e];
			t.AJAR_uri && (t.selected = t.AJAR_uri in p);
		}
		v.disabled = !1;
	};
	for (let n in d) {
		let r = t.sym(n), i = e.createElement("option");
		a.disambiguate ? i.appendChild(e.createTextNode(O(r, !0))) : i.appendChild(e.createTextNode(c(r, !0)));
		let o = t.any(r, t.sym("http://www.w3.org/ns/ui#backgroundColor"));
		o && i.setAttribute("style", "background-color: " + o.value + "; "), i.AJAR_uri = n, n in p && (i.setAttribute("selected", "true"), v.currentURI = n), v.appendChild(i);
	}
	if (f && a.mint) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(a.mint)), t.AJAR_mint = !0, v.insertBefore(t, v.firstChild);
	}
	if (v.currentURI == null && !a.multiple) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(a.nullLabel)), v.insertBefore(t, v.firstChild), t.selected = !0;
	}
	return f && v.addEventListener("change", _, !1), v;
}
function re(e, t, n, r, i, a, o, s) {
	T("Select list length now " + i.length);
	let l = 0, u = {}, d = t.updater.editable(o.uri);
	for (let e = 0; e < i.length; e++) {
		let t = i[e];
		t.uri || h(`makeSelectForOptions: option does not have an uri: ${t}, with predicate: ${r}`), !t.uri || t.uri in u || (u[t.uri] = !0, l++);
	}
	if (l === 0) return g(e, "Can't do selector with no options, subject= " + n + " property = " + r + ".");
	T("makeSelectForOptions: dataDoc=" + o);
	let f, p = function() {
		return f = {}, r.sameTerm(D.rdf("type")) ? f = t.findTypeURIs(n) : t.each(n, r, null, o).forEach(function(e) {
			e.uri && (f[e.uri] = !0);
		}), f;
	};
	f = p();
	let m = function(i) {
		_.disabled = !0;
		let a = [], c = [], l = function(e) {
			t.holds(n, r, e, o) && a.push(A.st(n, r, e, o));
		};
		for (let e = 0; e < _.options.length; e++) {
			let i = _.options[e];
			i.AJAR_uri && (i.selected && !(i.AJAR_uri in f) && c.push(A.st(n, r, t.sym(i.AJAR_uri), o)), !i.selected && i.AJAR_uri in f && l(t.sym(i.AJAR_uri)), i.selected && (_.currentURI = i.AJAR_uri));
		}
		let u = _.subSelect;
		for (; u && u.currentURI;) l(t.sym(u.currentURI)), u = u.subSelect;
		for (u = _.superSelect; u && u.currentURI;) l(t.sym(u.currentURI)), u = u.superSelect;
		E("selectForOptions: data doc = " + o), t.updater.update(a, c, function(t, n, r) {
			if (f = p(), n) _.disabled = !1;
			else return _.parentNode.appendChild(g(e, "Error updating data in select: " + r));
			s && s(n, {
				widget: "select",
				event: "change"
			});
		});
	}, _ = e.createElement("select");
	_.setAttribute("style", S.formSelectStyle), _.currentURI = null, _.refresh = function() {
		f = p();
		for (let e = 0; e < _.children.length; e++) {
			let t = _.children[e];
			t.AJAR_uri && (t.selected = t.AJAR_uri in f);
		}
		_.disabled = !1;
	};
	for (let n in u) {
		let r = t.sym(n), i = e.createElement("option");
		a.disambiguate ? i.appendChild(e.createTextNode(O(r, !0))) : i.appendChild(e.createTextNode(c(r, !0)));
		let o = t.any(r, t.sym("http://www.w3.org/ns/ui#backgroundColor"));
		o && i.setAttribute("style", "background-color: " + o.value + "; "), i.AJAR_uri = n, n in f && (i.setAttribute("selected", "true"), _.currentURI = n), _.appendChild(i);
	}
	if (!_.currentURI) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(a.nullLabel)), _.insertBefore(t, _.firstChild), t.selected = !0;
	}
	return d && _.addEventListener("change", m, !1), _;
}
function J(e, t, n, r, i, a) {
	let o = t.any(r, D.owl("disjointUnionOf")), s, c = !1;
	return o ? s = o.elements : (s = t.each(void 0, D.rdfs("subClassOf"), r), c = !0), T("Select list length " + s.length), s.length === 0 ? g(e, "Can't do " + (c ? "multiple " : "") + "selector with no subclasses of category: " + r) : s.length === 1 ? g(e, "Can't do " + (c ? "multiple " : "") + "selector with only 1 subclass of category: " + r + ":" + s[1]) : q(e, t, n, D.rdf("type"), s, {
		multiple: c,
		nullLabel: "* Select type *"
	}, i, a);
}
function Y(e, t, n, r, i, a) {
	function o() {
		c &&= (s.removeChild(c), null), u.currentURI && t.any(t.sym(u.currentURI), D.owl("disjointUnionOf")) && (c = Y(e, t, n, t.sym(u.currentURI), i, a), u.subSelect = c.firstChild, u.subSelect.superSelect = u, s.appendChild(c));
	}
	let s = e.createElement("span"), c = null;
	function l(e, t) {
		e && o(), a(e, t);
	}
	let u = J(e, t, n, r, i, l);
	return s.appendChild(u), o(), s;
}
function X(e, t, n, r, i, a, o, s) {
	let c = e.createElement("div"), l = b(e, t, c, a, n), u = t.updater.editable(o.uri), d = e.createElement("button"), f = d;
	d.style = S.checkboxInputStyle, l.appendChild(d);
	function p(e) {
		if (!e) return [];
		if (e.object) return e.why ||= o, [e];
		if (e instanceof Array) return e;
		throw Error("buildCheckboxForm: bad param " + e);
	}
	i = p(i), r = p(r);
	function h(e) {
		return e.filter((e) => !t.holds(e.subject, e.predicate, e.object, e.why)).length === 0;
	}
	function _() {
		let n = h(i), o = n;
		if (r.length) {
			let l = h(r);
			if (n && l) return c.appendChild(g(e, "Inconsistent data in dataDoc!\n" + i + " and\n" + r)), c;
			if (!n && !l) {
				n = null;
				let e = t.any(a, D.ui("default"));
				o = e ? e.value === "1" : s ? null : !1;
			}
		}
		d.state = n, d.textContent = {
			true: M,
			false: s ? N : " ",
			null: P
		}[o];
	}
	if (_(), !u) return c;
	let v = !1;
	return d.addEventListener("click", function(n) {
		if (v) return;
		v = !0, d.disabled = !0;
		let a = !1, o = function() {
			return !a && (a = !0, v = !1, d.disabled = !1, !0);
		}, l = function(t) {
			f.style.color = "#000", f.style.backgroundColor = "#fee", c.appendChild(g(e, `Checkbox: Error updating dataDoc from ${d.state} to ${d.newState}:\n\n${t}`));
		};
		f.style.color = "#bbb";
		let u = d.state === !0 ? i : d.state === !1 ? r : [];
		d.newState = d.state === null ? !0 : d.state === !0 ? !1 : !s || null;
		let p = d.newState === !0 ? i : d.newState === !1 ? r : [];
		m(`  Deleting  ${u}`), m(`  Inserting ${p}`);
		try {
			let e = t.updater.update(u, p, function(e, n, r) {
				o() && (n ? (f.style.color = "#000", d.state = d.newState, d.textContent = {
					true: M,
					false: N,
					null: P
				}[d.state]) : (u.why && t.holds(u.subject, u.predicate, u.object, u.why) && m(" @@@@@ weird if 409 - does hold statement"), l(r)));
			});
			e && typeof e.then == "function" && e.catch(function(e) {
				o() && l(e instanceof Error ? e.message : e);
			}).finally(function() {
				o();
			});
		} catch (e) {
			throw o(), e;
		}
	}, !1), c;
}
function Z(e) {
	let t = /* @__PURE__ */ new Date();
	return A.sym(e.uri + "#id" + ("" + t.getTime()));
}
function Q(e, t, n, r, i, a, o, s, l, u, d) {
	let f = {}, p = n.updater.editable(u.uri);
	for (let e = 0; e < a.length; e++) {
		let t = a[e];
		!t.uri || t.uri in f || (f[t.uri] = !0);
	}
	if (Object.keys(f).length === 0 && !l.mint) return g(e, "Can't do selector with no options, subject= " + r + " property = " + i + ".");
	T("makeSelectForChoice: dataDoc=" + u);
	function m() {
		let e = "--- choice ---";
		return i && i.termType !== "BlankNode" && (e = "* Select for property: " + c(i) + " *"), r && r.termType !== "BlankNode" && (e = "* Select for " + c(r, !0) + " *"), e;
	}
	function h() {
		let t = e.createElement("option");
		return t.appendChild(e.createTextNode(m())), t.disabled = !0, t.value = !0, t.hidden = !0, t.selected = !0, t;
	}
	let _ = function(e) {
		t.removeChild(t.lastChild), v.refresh();
	}, v = e.createElement("select");
	v.setAttribute("style", S.formSelectStyle), v.setAttribute("id", "formSelect"), v.currentURI = null;
	for (let e in f) v.appendChild(y(e));
	if (p && l.mint) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(l.mint)), t.AJAR_mint = !0, v.insertBefore(t, v.firstChild);
	}
	v.children.length === 0 && v.insertBefore(h(), v.firstChild), v.update = function(t) {
		o = t;
		let a = [], c = [], l = function(e) {
			n.holds(r, i, e, u) && a.push(A.st(r, i, e, u));
		}, f = function(e) {
			n.holds(r, i, e, u) || c.push(A.st(r, i, e, u)), s && !n.holds(e, D.rdf("type"), n.sym(s), u) && c.push(A.st(e, D.rdf("type"), n.sym(s), u));
		}, p = n.each(r, i, null, u).map((e) => e.value);
		for (let e of p) $(e, o) || l(A.sym(e));
		for (let e of o) e in p || f(A.sym(e));
		n.updater.update(a, c, function(t, n, r) {
			if (!n) return v.parentNode.appendChild(g(e, "Error updating data in select: " + r));
			v.refresh(), d && d(n, {
				widget: "select",
				event: "change"
			});
		});
	}, v.refresh = function() {
		v.disabled = !0;
		let a = [], c;
		for (let t = 0; t < v.options.length; t++) {
			let f = v.options[t];
			if (f.selected && f.AJAR_mint) {
				if (l.mintClass) {
					let t = G(e, n, r, i, s, l.subForm, u, function(e, t) {
						e || d(e, t, { change: "new" });
					});
					v.parentNode.appendChild(t), c = t.AJAR_subject;
				} else c = Z(u);
				a.push(A.st(r, i, n.sym(c), u)), s && a.push(A.st(c, D.rdf("type"), n.sym(s), u)), l.mintStatementsFun && (a = a.concat(l.mintStatementsFun(c))), v.currentURI = c;
			}
			f.AJAR_uri && (f.selected && $(f.AJAR_uri, o) && (v.currentURI = f.AJAR_uri), $(f.AJAR_uri, o) || f.removeAttribute("selected"), $(f.AJAR_uri, o) && f.setAttribute("selected", "true"));
		}
		E("selectForOptions: data doc = " + u), v.currentURI && l.subForm && !l.multiSelect && R(e, t, {}, A.sym(v.currentURI), l.subForm, u, function(r, i) {
			r ? (n.updater.update([], a, function(n, r, i) {
				r || t.appendChild(g(e, "Error updating select: " + i));
			}), d && d(r, {
				widget: "select",
				event: "new"
			})) : t.appendChild(g(e, "Error updating data in field of select: " + i));
		}), v.disabled = !1;
	};
	function y(t) {
		let r = e.createElement("option"), i = n.sym(t), a;
		a = l.disambiguate ? O(i, !0) : c(i, !0), r.appendChild(e.createTextNode(a)), r.setAttribute("value", t);
		let s = n.any(i, n.sym("http://www.w3.org/ns/ui#backgroundColor"));
		return s && r.setAttribute("style", "background-color: " + s.value + "; "), r.AJAR_uri = t, $(i.value, o) && r.setAttribute("selected", "true"), r;
	}
	return p && v.addEventListener("change", _, !1), v;
}
function $(e, t) {
	let n = 0;
	for (; n < t.length; n++) if (t[n] === e) return !0;
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
export { B as appendForm, _ as basicField, X as buildCheckboxForm, z as editFormButton, l as field, u as fieldFunction, v as fieldLabel, s as fieldParams, y as fieldStore, H as findClosest, te as formsFor, K as makeDescription, J as makeSelectForCategory, Q as makeSelectForChoice, q as makeSelectForClassifierOptions, Y as makeSelectForNestedCategory, re as makeSelectForOptions, d as mostSpecificClassURI, ne as newButton, Z as newThing, G as promptForNew, V as propertiesForClass, b as renderNameValuePair, W as sortByLabel, U as sortBySequence };

//# sourceMappingURL=forms.esm.js.map