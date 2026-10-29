import { log as e } from "./debug.esm.js";
import { icons as t } from "./iconBase.esm.js";
import { label as n } from "../utils/label.esm.js";
import { log_exports as r } from "./log.esm.js";
import i from "./ns.esm.js";
import { getTarget as a, utils_exports as o } from "../utils/index.esm.js";
import { widgets_exports as s } from "../widgets/index.esm.js";
import * as c from "rdflib";
import { store as l } from "solid-logic";
// src/lib/table.js
var u = {
	icons: t,
	log: r,
	ns: i,
	utils: o,
	widgets: s
};
function d(t, r) {
	let i = r.sourceDocument, o = r.tableClass, s = r.query, d = u.ns, f = l, p = {}, ee = {
		"http://www.w3.org/2002/07/owl#sameAs": !0,
		"http://www.w3.org/1999/02/22-rdf-syntax-ns#type": !0
	}, m = {
		"http://www.w3.org/2001/XMLSchema#decimal": !0,
		"http://www.w3.org/2001/XMLSchema#float": !0,
		"http://www.w3.org/2001/XMLSchema#double": !0,
		"http://www.w3.org/2001/XMLSchema#integer": !0,
		"http://www.w3.org/2001/XMLSchema#nonNegativeInteger": !0,
		"http://www.w3.org/2001/XMLSchema#positiveInteger": !0,
		"http://www.w3.org/2001/XMLSchema#nonPositiveInteger": !0,
		"http://www.w3.org/2001/XMLSchema#negativeInteger": !0,
		"http://www.w3.org/2001/XMLSchema#long": !0,
		"http://www.w3.org/2001/XMLSchema#int": !0,
		"http://www.w3.org/2001/XMLSchema#short": !0,
		"http://www.w3.org/2001/XMLSchema#byte": !0,
		"http://www.w3.org/2001/XMLSchema#unsignedLong": !0,
		"http://www.w3.org/2001/XMLSchema#unsignedInt": !0,
		"http://www.w3.org/2001/XMLSchema#unsignedShort": !0,
		"http://www.w3.org/2001/XMLSchema#unsignedByte": !0
	}, te = {
		"http://www.w3.org/2001/XMLSchema#dateTime": !0,
		"http://www.w3.org/2001/XMLSchema#date": !0
	}, ne = {
		"http://xmlns.com/foaf/0.1/Image": !0,
		"http://purl.org/dc/terms/Image": !0
	}, h = r.keyVariable || "?_row", g = 0, _, v, y, b, x = null, S = null, C = t.createElement("div");
	C.className = "tableViewPane", C.appendChild(re());
	let w = t.createElement("div");
	C.appendChild(w), C.refresh = function() {
		Z(T.query, T.logicalRows, T.columns, T);
	};
	let T;
	if (s) T = $(s), w.appendChild(T);
	else {
		let e = I();
		_ = e[0], v = e[1], o || y.appendChild(le(_, v)), S = Ce(v), E(S || _);
	}
	return C;
	function re() {
		let e = t.createElement("table");
		e.setAttribute("class", "toolbar");
		let n = t.createElement("tr");
		return y = t.createElement("td"), n.appendChild(y), b = t.createElement("td"), n.appendChild(b), e.appendChild(n), e;
	}
	function ie(e, t) {
		let n = t.getColumns();
		for (let t = 0; t < n.length; ++t) {
			let r = f.variable("_col" + t);
			e.vars.push(r), n[t].setVariable(r);
		}
	}
	function ae(e, t, n) {
		let r = n.type;
		r ||= f.variable("_any"), e.pat.add(t, u.ns.rdf("type"), r);
	}
	function oe(e, t, n) {
		let r = n.getColumns();
		for (let n = 0; n < r.length; ++n) {
			let i = r[n], a = f.formula();
			a.add(t, i.predicate, i.getVariable()), e.pat.optional.push(a);
		}
	}
	function se(e) {
		let t = new c.Query(), n = f.variable(h.slice(1));
		return ie(t, e), ae(t, n, e), oe(t, n, e), t;
	}
	function E(e) {
		D(b), b.appendChild(de(e)), ce(se(e), e);
	}
	function ce(e, t) {
		x && (x.running = !1);
		let n = $(e, t);
		D(w), w.appendChild(n), x = e;
	}
	function D(e) {
		for (; e.childNodes.length > 0;) e.removeChild(e.childNodes[0]);
	}
	function O(e) {
		this.type = e, this.columns = null, this.allColumns = [], this.useCount = 0, this.getAllColumns = function() {
			return this.allColumns;
		}, this.getColumns = function() {
			if (!this.columns) {
				let e = this.getAllColumns();
				this.columns = e.slice(0, 7);
			}
			return this.columns;
		}, this.getUnusedColumns = function() {
			let e = this.getAllColumns(), t = this.getColumns(), n = [];
			for (let r = 0; r < e.length; ++r) t.indexOf(e[r]) === -1 && n.push(e[r]);
			return n;
		}, this.addColumn = function(e) {
			this.columns.push(e);
		}, this.removeColumn = function(e) {
			this.columns = this.columns.filter(function(t) {
				return t !== e;
			});
		}, this.getLabel = function() {
			return n(this.type);
		}, this.addUse = function() {
			this.useCount += 1;
		};
	}
	function k() {
		this.useCount = 0, this.checkedAnyValues = !1, this.possiblyLiteral = !0, this.possiblyNumber = !0, this.constraints = [], this.checkValue = function(e) {
			let t = e.termType;
			this.possiblyLiteral && t !== "Literal" && t !== "NamedNode" ? (this.possiblyNumber = !1, this.possiblyLiteral = !1) : this.possiblyNumber && (t === "Literal" && e.value.match(/^-?\d+(\.\d*)?$/) || (this.possiblyNumber = !1)), this.checkedAnyValues = !0;
		}, this.getVariable = function() {
			return this.variable;
		}, this.setVariable = function(e) {
			this.variable = e;
		}, this.getKey = function() {
			return this.variable.toString();
		}, this.addUse = function() {
			this.useCount += 1;
		}, this.getHints = function() {
			return r && r.hints && this.variable && r.hints[this.variable.toNT()] ? r.hints[this.variable.toNT()] : {};
		}, this.getLabel = function() {
			return this.getHints().label ? this.getHints().label : this.predicate ? this.predicate.sameTerm(d.rdf("type")) && this.superClass ? n(this.superClass, !0) : n(this.predicate) : this.variable ? this.variable.toString() : "unlabeled column?";
		}, this.setPredicate = function(e, t, n) {
			t ? (this.inverse = e, this.constraints = this.constraints.concat(f.each(e, u.ns.rdfs("domain"))), e.sameTerm(d.rdfs("subClassOf")) && n.termType === "NamedNode" && (this.superClass = n, this.alternatives = f.each(void 0, d.rdfs("subClassOf"), n))) : (this.predicate = e, this.constraints = this.constraints.concat(f.each(e, u.ns.rdfs("range"))));
		}, this.getConstraints = function() {
			return this.constraints;
		}, this.filterFunction = function() {
			return !0;
		}, this.sortKey = function() {
			return this.getLabel().toLowerCase();
		}, this.isImageColumn = function() {
			for (let e = 0; e < this.constraints.length; e++) if (this.constraints[e].uri in ne) return !0;
			return !1;
		};
	}
	function A(e, t) {
		let n = [];
		for (let r in e) {
			let i = e[r];
			(!t || t(r, i)) && n.push(i);
		}
		return n;
	}
	function j(e, n) {
		let r = t.createElement("option");
		return r.setAttribute("value", n), r.appendChild(t.createTextNode(e)), r;
	}
	function le(e, n) {
		let r = t.createElement("div");
		r.appendChild(t.createTextNode("Select type: "));
		let i = t.createElement("select");
		i.appendChild(j("All types", "null"));
		for (let e in n) i.appendChild(j(n[e].getLabel(), e));
		return i.addEventListener("click", function() {
			let t;
			t = i.value === "null" ? e : n[i.value], ue(t);
		}, !1), r.appendChild(i), r;
	}
	function ue(e) {
		E(e);
	}
	function de(e) {
		let n = t.createElement("div"), r = e.getUnusedColumns();
		if (r.sort(function(e, t) {
			let n = e.sortKey(), r = t.sortKey();
			return (n > r) - (n < r);
		}), r.length > 0) {
			n.appendChild(t.createTextNode("Add column: "));
			let i = t.createElement("select");
			i.appendChild(j("", "-1"));
			for (let e = 0; e < r.length; ++e) {
				let t = r[e];
				i.appendChild(j(t.getLabel(), "" + e));
			}
			n.appendChild(i), i.addEventListener("click", function() {
				let t = Number(i.value);
				t >= 0 && (e.addColumn(r[t]), E(e));
			}, !1);
		}
		return n;
	}
	function fe(e, t) {
		for (let n in e) {
			let r = e[n];
			if (r.variable.toNT() === t) return r;
		}
		throw Error(`getColumnForVariable: no column for variable ${t}`);
	}
	function pe(e, t) {
		let n;
		return t.uri in e ? n = e[t.uri] : (n = new k(), n.setPredicate(t), e[t.uri] = n), n;
	}
	function M(e, t) {
		let n;
		return t.uri in e ? n = e[t.uri] : (n = new O(t), e[t.uri] = n), n;
	}
	function N() {
		let e = {}, t = f.statementsMatching(void 0, u.ns.rdf("type"), o, i), n = {};
		for (let r = 0; r < t.length; ++r) {
			let i = t[r].object;
			if (i.termType !== "NamedNode") continue;
			let a = M(e, i);
			i.uri in n || (n[i.uri] = []), n[i.uri].push(t[r].subject), a.addUse();
		}
		return [n, e];
	}
	function P(e, t) {
		let n = f.statementsMatching(e, void 0, void 0, i), r = {};
		for (let e = 0; e < n.length; ++e) {
			let i = n[e].predicate;
			if (i.uri in ee) continue;
			let a = pe(t, i);
			a.checkValue(n[e].object), r[i.uri] = a;
		}
		return r;
	}
	function F(e, t) {
		let n = {};
		for (let e = 0; e < t.length; ++e) {
			let r = P(t[e], n);
			for (let e in r) r[e].addUse();
		}
		let r = A(n);
		L(r), e.allColumns = r;
	}
	function I() {
		let e, t, n = N();
		e = n[0], t = n[1];
		for (let n in e) {
			let r = e[n], i = t[n];
			F(i, r);
		}
		return [new O(null), A(t)];
	}
	function L(e) {
		function t(e, t) {
			return (e.useCount < t.useCount) - (e.useCount > t.useCount);
		}
		e.sort(t);
	}
	function R(e, n) {
		let r = t.createElement("a");
		return r.appendChild(t.createTextNode("[x]")), r.addEventListener("click", function() {
			e.removeColumn(n), E(e);
		}, !1), r;
	}
	function z(e, n) {
		let r = t.createElement("tr"), i = t.createElement("th");
		r.appendChild(i);
		for (let i = 0; i < e.length; ++i) {
			let a = t.createElement("th"), o = e[i];
			a.appendChild(t.createTextNode(o.getLabel())), n && a.appendChild(R(n, o)), r.appendChild(a);
		}
		return r;
	}
	function me(e, t, n, r) {
		let i = t.getKey();
		if (e.sort(function(e, t) {
			let a = null, o = null;
			i in e.values && (a = e.values[i][0]), i in t.values && (o = t.values[i][0]);
			let s = n(a, o);
			return r ? -s : s;
		}), e.length) {
			let t = e[0]._htmlRow.parentNode;
			for (let n = 0; n < e.length; ++n) t.removeChild(e[n]._htmlRow);
			for (let n = 0; n < e.length; ++n) t.appendChild(e[n]._htmlRow);
		}
	}
	function B(e, t) {
		let n = !0;
		for (let r = 0; r < t.length; ++r) {
			let i = t[r], a = i.getKey(), o = null;
			if (a in e.values && (o = e.values[a][0]), !i.filterFunction(o)) {
				n = !1;
				break;
			}
		}
		let r = e._htmlRow;
		n ? r.style.display = "" : r.style.display = "none";
	}
	function V(e, t) {
		for (let n = 0; n < e.length; ++n) {
			let r = e[n];
			B(r, t);
		}
	}
	function H(e, t, r) {
		function i(e) {
			return e ? e.termType === "Literal" ? e.value.toLowerCase() : e.termType === "NamedNode" ? n(e).toLowerCase() : e.value.toLowerCase() : "";
		}
		function a(e, t) {
			let n = i(e), r = i(t);
			return n < r ? -1 : +(n > r);
		}
		me(e, t, a, r);
	}
	function U(e, r, i) {
		let a = t.createElement("div"), o = t.createElement("input");
		o.setAttribute("type", "text"), o.style.width = "70%", a.appendChild(o);
		let s = t.createElement("span");
		s.appendChild(t.createTextNode("▼")), s.addEventListener("click", function() {
			H(e, i, !1);
		}, !1), a.appendChild(s);
		let c = t.createElement("span");
		c.appendChild(t.createTextNode("▲")), c.addEventListener("click", function() {
			H(e, i, !0);
		}, !1), a.appendChild(c);
		let l = null;
		return i.filterFunction = function(e) {
			if (!l) return !0;
			if (e) {
				let t;
				return t = e.termType === "Literal" ? e.value : e.termType === "NamedNode" ? n(e) : "", t.toLowerCase().indexOf(l) >= 0;
			}
			return !1;
		}, o.addEventListener("keyup", function() {
			l = o.value === "" ? null : o.value.toLowerCase(), V(e, r);
		}, !1), a;
	}
	function W(e, r, i, a) {
		let o = t.createElement("div"), s = t.createElement("select"), c = {};
		for (let e = 0; e < a.length; ++e) {
			let t = a[e];
			c[t.uri] = !0;
		}
		let l = q(i).initialSelection;
		l && (c = l), s.setAttribute("multiple", "true");
		for (let e = 0; e < a.length; ++e) {
			let t = a[e], r = j(n(t), e);
			c[t.uri] && (r.selected = !0), s.appendChild(r);
		}
		return o.appendChild(s), i.filterFunction = function(e) {
			return !c || e && c[e.uri];
		}, s.addEventListener("click", function() {
			{
				c = {};
				let e = s.options;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], r = Number(n.value);
					e[t].selected && (c[a[r].uri] = !0);
				}
			}
			V(e, r);
		}, !0), o;
	}
	function G(e, n, r) {
		let i = t.createElement("div"), a = t.createElement("input");
		a.setAttribute("type", "text"), a.style.width = "40px", i.appendChild(a);
		let o = t.createElement("input");
		o.setAttribute("type", "text"), o.style.width = "40px", i.appendChild(o);
		let s = null, c = null;
		r.filterFunction = function(e) {
			return e &&= Number(e), !(s && (!e || e < s) || c && (!e || e > c));
		};
		function l() {
			s = a.value === "" ? null : Number(a.value), c = o.value === "" ? null : Number(o.value), V(e, n);
		}
		return a.addEventListener("keyup", l, !1), o.addEventListener("keyup", l, !1), i;
	}
	function he(e, t, n) {
		return n.checkedAnyValues && n.possiblyNumber ? G(e, t, n) : n.possiblyLiteral ? U(e, t, n) : null;
	}
	function ge(e, t, n) {
		if (n.superClass && n.alternatives.length > 0) return W(e, t, n, n.alternatives);
		let r = n.getConstraints(), i;
		for (let a = 0; a < r.length; a++) {
			if (i = r[a], n.checkedAnyValues && n.possiblyNumber || i.uri in m) return G(e, t, n);
			if (i.uri === "http://www.w3.org/2000/01/rdf-schema#Literal") return U(e, t, n);
			let o = f.each(i, u.ns.owl("oneOf"));
			if (o.length > 0) return W(e, t, n, o.elements);
		}
		return he(e, t, n);
	}
	function _e(e, n) {
		let r = t.createElement("tr");
		r.className = "selectors", r.appendChild(t.createElement("td"));
		for (let i = 0; i < n.length; ++i) {
			let a = t.createElement("td"), o = ge(e, n, n[i]);
			o && a.appendChild(o), r.appendChild(a);
		}
		return r;
	}
	function K(n, r, i) {
		i ||= {};
		let o = t.createElement("a"), s = i.linkFunction;
		return o.setAttribute("href", n), o.appendChild(t.createTextNode(r)), s ? o.addEventListener("click", function(t) {
			t.preventDefault(), t.stopPropagation();
			let n = a(t).getAttribute("href");
			n || e("No href found \n"), s(n);
		}, !0) : o.addEventListener("click", u.widgets.openHrefInOutlineMode, !0), o;
	}
	function ve(e, t) {
		let r = !1;
		return e.uri && (r = e.uri.match(/^mailto:(.*)/)), r ? K(e.uri, r[1], t) : K(e.uri, n(e), t);
	}
	function ye(e) {
		let n = t.createElement("img");
		return n.setAttribute("src", e.uri), n.style.height = "40px", n;
	}
	function q(e) {
		return r && r.hints && e.variable && r.hints[e.variable.toNT()] ? r.hints[e.variable.toNT()] : {};
	}
	function J(e, n) {
		let r = q(n), i = r.cellFormat;
		if (i) switch (i) {
			case "shortDate": return t.createTextNode(u.widgets.shortDate(e.value));
		}
		else if (e.termType === "Literal") {
			if (e.datatype) {
				if (te[e.datatype.uri]) return t.createTextNode(u.widgets.shortDate(e.value));
				if (m[e.datatype.uri]) {
					let n = t.createElement("span");
					return n.textContent = e.value, n.setAttribute("style", "text-align: right"), n;
				}
			}
			return t.createTextNode(e.value);
		} else if (e.termType === "NamedNode" && n.isImageColumn()) return ye(e);
		else if (e.termType === "NamedNode" || e.termType === "BlankNode") return ve(e, r);
		else if (e.termType === "Collection") {
			let r = t.createElement("span");
			return r.appendChild(t.createTextNode("[")), e.elements.forEach(function(e) {
				r.appendChild(J(e, n)), r.appendChild(t.createTextNode(", "));
			}), r.removeChild(r.lastChild), r.appendChild(t.createTextNode("]")), r;
		} else return t.createTextNode("unknown termtype '" + e.termType + "'!");
	}
	function be(e, n, r, i) {
		let a = t.createElement("td");
		n._subject && "uri" in n._subject && a.appendChild(K(n._subject.uri, "→")), e.appendChild(a);
		for (let i = 0; i < r.length; ++i) {
			let a = r[i], o = t.createElement("td"), s, c = a.getKey();
			if (c in n.values) {
				let e = n.values[c], r = !1;
				n.originalValues && n.originalValues[c] && e.length !== n.originalValues[c].length && (r = !0);
				for (let i = 0; i < e.length; ++i) {
					let l = e[i];
					n.originalValues && n.originalValues[c] && n.originalValues[c].length > i && (s = n.originalValues[c][i], l.toString() !== s.toString() && (r = !0)), o.appendChild(J(l, a)), i !== e.length - 1 && o.appendChild(t.createTextNode(",\n")), r && (o.style.background = "#efe");
				}
			}
			e.appendChild(o);
		}
		return n._htmlRow = e, e;
	}
	function Y(e, t) {
		let n = null;
		if (e.termType === "Literal") n = "value";
		else if (e.termType === "NamedNode") n = "uri";
		else return t.indexOf(e) >= 0;
		let r = 0;
		for (; r < t.length; ++r) if (t[r].termType === e.termType && t[r][n] === e[n]) return !0;
		return !1;
	}
	function xe(e, t, n) {
		let r, i = !1;
		for (r in n) {
			let t = n[r];
			r in e.values || (e.values[r] = []), Y(t, e.values[r]) || (e.values[r].push(t), i = !0);
		}
		i && (D(e._htmlRow), be(e._htmlRow, e, t)), B(e, t);
	}
	function X(e) {
		if ("uri" in e) return e.uri;
		if ("_subject_id" in e) return e._subject_id;
		{
			let t = "" + g;
			return e._subject_id = t, ++g, t;
		}
	}
	function Z(n, i, a, o) {
		n.running = !0;
		let s = Date.now(), c = t.createElement("tr");
		o.appendChild(c), c.textContent = "Loading ...";
		for (let e = 0; e < i.length; e++) i[e].original = !0, i[e].originalValues || (i[e].originalValues = i[e].values), i[e].values = {};
		f.query(n, function(e) {
			if (!n.running) return;
			c.textContent += ".";
			let r = null, s = null, l;
			if (h in e && (s = e[h], l = X(s), l in p && (r = p[l])), !r) {
				let e = t.createElement("tr");
				o.appendChild(e), r = {
					_htmlRow: e,
					_subject: s,
					values: {}
				}, i.push(r), s && (p[l] = r);
			}
			delete r.original, xe(r, a, e);
		}, void 0, function() {
			c && c.parentNode && c.parentNode.removeChild && (c.parentNode.removeChild(c), c = null);
			let t = Date.now() - s;
			e("Query done: " + i.length + " rows, " + t + "ms");
			for (let t = i.length - 1; t >= 0; t--) if (i[t].original) {
				e("   deleting row " + i[t]._subject);
				let n = i[t]._htmlRow;
				n.parentNode.removeChild(n), delete p[X(i[t]._subject)], i.splice(t, 1);
			}
			r.sortBy && H(i, fe(a, r.sortBy), r.sortReverse), r.onDone && r.onDone(C);
		});
	}
	function Q(e, t) {
		u.log.debug(">> processing formula");
		for (let n = 0; n < t.statements.length; ++n) {
			let r = t.statements[n];
			if (r.predicate.termType === "NamedNode" && r.object.termType === "Variable") {
				let t = r.object.toString();
				t in e && e[t].setPredicate(r.predicate, !1, r.subject);
			}
			if (r.predicate.termType === "NamedNode" && r.subject.termType === "Variable") {
				let t = r.subject.toString();
				t in e && e[t].setPredicate(r.predicate, !0, r.object);
			}
		}
		for (let n = 0; n < t.optional.length; ++n) u.log.debug("recurse to optional subformula " + n), Q(e, t.optional[n]);
		u.log.debug("<< finished processing formula");
	}
	function Se(e) {
		let t = [], n = {};
		for (let r = 0; r < e.vars.length; ++r) {
			let i = new k(), a = e.vars[r];
			u.log.debug("column " + r + " : " + a), i.setVariable(a), n[a] = i, t.push(i);
		}
		return Q(n, e.pat), t;
	}
	function $(e, n) {
		let r;
		r = s ? Se(e) : n.getColumns();
		let i = [], a = t.createElement("table");
		return a.appendChild(z(r, n)), a.appendChild(_e(i, r)), a.logicalRows = i, a.columns = r, a.query = e, Z(e, i, r, a), a;
	}
	function Ce(e) {
		let t = -1, n = null, r;
		for (r in e) {
			let i = e[r];
			i.useCount > t && (n = i, t = i.useCount);
		}
		return n;
	}
}
export { d as renderTableViewPane };

//# sourceMappingURL=table.esm.js.map