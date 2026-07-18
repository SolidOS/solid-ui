import { label as e } from "../utils/label.esm.js";
import "../utils/index.esm.js";
import * as t from "rdflib";
import { solidLogicSingleton as n } from "solid-logic";
//#region src/matrix/matrix.ts
var r = n.store;
function i(n, i, a, o, s, c, l) {
	let u = n.createElement("table"), d = n.createElement("tr");
	d.appendChild(n.createElement("td")).setAttribute("class", "MatrixCorner"), u.appendChild(d), u.lastHeader = d;
	let f = [], p = [], m = function(t, n, r, i) {
		for (; t.firstChild;) t.removeChild(t.firstChild);
		t.setAttribute("style", ""), t.style.textAlign = "center", c.cellFunction ? c.cellFunction(t, n, r, i) : (t.textContent = e(i), t.setAttribute("style", "padding: 0.3em")), delete t.old;
	}, h = function(i) {
		let a = i.toNT();
		if (p[a]) return p[a];
		let o = n.createElement("tr"), s = o.appendChild(n.createElement("td"));
		s.setAttribute("style", "padding: 0.3em;"), s.textContent = e(i), i.termType === "NamedNode" && r.fetcher.nowOrWhenFetched(i.uri.split("#")[0], void 0, function(t, n, r) {
			t && (s.textContent = e(i));
		});
		for (let e = 0; e < f.length; e++) m(o.appendChild(n.createElement("td")), t.fromNT(f[e]), i, null);
		o.dataValueNT = a, p[a] = o;
		for (let e = u.lastHeader.nextSibling; e; e = e.nextSibling) if (a > e.dataValueNT && c && c.yDecreasing || a < e.dataValueNT && !(c && c.yDecreasing)) return u.insertBefore(o, e);
		return u.appendChild(o);
	}, g = function(r) {
		let i = r.toNT(), a = null;
		for (let e = 0; e < f.length; e++) {
			if (f[e] === i) return e;
			if (i > f[e] && c.xDecreasing || i < f[e] && !c.xDecreasing) {
				f = f.slice(0, e).concat([i]).concat(f.slice(e)), a = e;
				break;
			}
		}
		a === null && (a = f.length, f.push(i));
		for (let i = u.firstChild; i; i = i.nextSibling) {
			let o = i.dataValueNT, s = n.createElement("td");
			if (s.style.textAlign = "center", i === u.firstChild ? s.textContent = e(r) : m(s, r, t.fromNT(o), null), a === f.length - 1) i.appendChild(s);
			else {
				let e = i.firstChild;
				for (let t = 0; t < a + 1; t++) e = e.nextSibling;
				i.insertBefore(s, e);
			}
		}
		return a;
	}, _ = function() {
		for (let e = 1; e < u.children.length; e++) {
			let t = u.children[e];
			for (let e = 1; e < t.children.length; e++) t.children[e].old = !0;
		}
	}, v = function() {
		let e, n, r = [], i = [];
		if (c.set_y) for (let e = 0; e < c.set_y.length; e++) i[c.set_y[e]] = !0;
		if (c.set_x) for (let e = 0; e < c.set_x.length; e++) r[g(c.set_x[e]) + 1] = !0;
		for (let a = 1; a < u.children.length; a++) {
			e = u.children[a];
			for (let a = 1; a < e.children.length; a++) if (n = e.children[a], n.old) {
				let r = t.fromNT(e.dataValueNT), i = t.fromNT(f[a - 1]);
				m(n, i, r, null);
			} else i[e.dataValueNT] = !0, r[a] = !0;
		}
		for (let t = 0; t < u.children.length; t++) if (e = u.children[t], t > 0 && !i[e.dataValueNT]) delete p[e.dataValueNT], u.removeChild(e);
		else for (let t = e.children.length - 1; t > 0; t--) {
			let n = e.children[t];
			r[t] || e.removeChild(n);
		}
		let a = [];
		for (let e = 0; e < f.length; e++) r[e + 1] && a.push(f[e]);
		f = a;
	};
	u.refresh = function() {
		_(), r.query(i, y, void 0, v);
	};
	let y = function(e) {
		let t = e[a.toString()], n = e[o.toString()], r = e[s.toString()], i = h(n), c = g(t), l = i.children[c + 1];
		m(l, t, n, r);
	};
	if (c.set_y) for (let e = 0; e < c.set_y.length; e++) h(c.set_y[e]);
	if (c.set_x) for (let e = 0; e < c.set_x.length; e++) g(c.set_x[e]);
	return r.query(i, y, void 0, l), u;
}
//#endregion
export { i as matrixForQuery };

//# sourceMappingURL=matrix.esm.js.map