import { I as e, S as t, m as n, x as r } from "./index.esm-CyyOkz04.js";
import { t as i, u as a } from "./style-CjYxsW7j.js";
import { b as o, g as s, i as c, o as l, r as u, u as d, x as f, y as p } from "./components-DrP7BOrs.js";
import "./input-CFDN76Y5.js";
//#region src/lib/forms/rdfFormsHelper.ts
async function m(e, t) {
	let n = r(t);
	return e.holds(void 0, void 0, void 0, n) && e.removeStatements(e.statementsMatching(void 0, void 0, void 0, n)), await e.fetcher.load(t, {
		force: !0,
		clearPreviousData: !0
	});
}
function h(e, t) {
	let r = t.map((t) => {
		let r = e.any(t, n.ui("sequence")), i = r ? Number(r.value) : 9999;
		return [Number.isNaN(i) ? 9999 : i, t];
	});
	return r.sort((e, t) => e[0] - t[0]), r.map((e) => e[1]);
}
function g(e, t) {
	let n = e.findTypeURIs(t), r = e.bottomTypeURIs(n), i = [];
	for (let e in r) i.push(e);
	return i[0];
}
function _(e, t) {
	let i = t.split("#")[0], a = t.includes("#") ? t.split("#")[1] : null;
	if (a) {
		let t = r(i + "#" + a);
		if (e.holds(t, n.rdf("type"), n.ui("Form"))) return t;
	}
	return e.each(null, n.rdf("type"), n.ui("Form")).find((e) => e.termType === "NamedNode") || null;
}
//#endregion
//#region src/lib/forms/fieldParams.ts
var v = {
	[n.ui("ColorField").uri]: {
		size: 9,
		type: "color",
		style: "height: 3em;",
		dt: "color",
		pattern: /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/
	},
	[n.ui("DateField").uri]: {
		size: 20,
		type: "date",
		dt: "date",
		pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/
	},
	[n.ui("DateTimeField").uri]: {
		size: 20,
		type: "datetime-local",
		dt: "dateTime",
		pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/
	},
	[n.ui("TimeField").uri]: {
		size: 10,
		type: "time",
		dt: "time",
		pattern: /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/
	},
	[n.ui("IntegerField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "integer",
		pattern: /^\s*-?[0-9]+\s*$/
	},
	[n.ui("DecimalField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "decimal",
		pattern: /^\s*-?[0-9]*(\.[0-9]*)?\s*$/
	},
	[n.ui("FloatField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "float",
		pattern: /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/
	},
	[n.ui("SingleLineTextField").uri]: {},
	[n.ui("NamedNodeURIField").uri]: { namedNode: !0 },
	[n.ui("TextField").uri]: {},
	[n.ui("PhoneField").uri]: {
		size: 20,
		defaultInputValue: "tel:",
		pattern: /^\+?[\d-]+[\d]*$/
	},
	[n.ui("EmailField").uri]: {
		size: 30,
		defaultInputValue: "mailto:",
		pattern: /^\s*.*@.*\..*\s*$/
	},
	[n.ui("Group").uri]: { style: i.formGroupStyle },
	[n.ui("Comment").uri]: {
		element: "p",
		style: i.commentStyle
	},
	[n.ui("Heading").uri]: {
		element: "h3",
		style: i.formHeadingStyle
	}
}, y = new class {
	get store() {
		throw Error("Cannot use RDF forms without a store");
	}
}(), b = f(Symbol("storeContext")), x, S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, L;
function R(e, t, n) {
	return (t = G(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function z(e, t, n) {
	B(e, t), t.set(e, n);
}
function B(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function V(e, t, n) {
	return e.set(U(e, t), n), n;
}
function H(e, t) {
	return e.get(U(e, t));
}
function U(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function W(e, t, n, r, i, a) {
	function o(e, t, n) {
		return function(r, i) {
			return n && n(r), e[t].call(r, i);
		};
	}
	function s(e, t) {
		for (var n = 0; n < e.length; n++) e[n].call(t);
		return t;
	}
	function c(e, t, n, r) {
		if (typeof e != "function" && (r || e !== void 0)) throw TypeError(t + " must " + (n || "be") + " a function" + (r ? "" : " or undefined"));
		return e;
	}
	function l(e, t, n, r, i, a, s, l, u, d, f, p, m) {
		function h(e) {
			if (!m(e)) throw TypeError("Attempted to access private element on non-instance");
		}
		var g, _ = t[0], v = t[3], y = !l;
		if (!y) {
			n || Array.isArray(_) || (_ = [_]);
			var b = {}, x = [], S = i === 3 ? "get" : i === 4 || p ? "set" : "value";
			d ? (f || p ? b = {
				get: K(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || K(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
		}
		for (var C = e, w = _.length - 1; w >= 0; w -= n ? 2 : 1) {
			var T = _[w], E = n ? _[w - 1] : void 0, D = {}, O = {
				kind: [
					"field",
					"accessor",
					"method",
					"getter",
					"setter",
					"class"
				][i],
				name: r,
				metadata: a,
				addInitializer: function(e, t) {
					if (e.v) throw Error("attempted to call addInitializer after decoration was finished");
					c(t, "An initializer", "be", !0), s.push(t);
				}.bind(null, D)
			};
			try {
				if (y) (g = c(T.call(E, C, O), "class decorators", "return")) && (C = g);
				else {
					var k, A;
					O.static = u, O.private = d, d ? i === 2 ? k = function(e) {
						return h(e), b.value;
					} : (i < 4 && (k = o(b, "get", h)), i !== 3 && (A = o(b, "set", h))) : (k = function(e) {
						return e[r];
					}, (i < 2 || i === 4) && (A = function(e, t) {
						e[r] = t;
					}));
					var j = O.access = { has: d ? m.bind() : function(e) {
						return r in e;
					} };
					if (k && (j.get = k), A && (j.set = A), C = T.call(E, p ? {
						get: b.get,
						set: b.set
					} : b[S], O), p) {
						if (typeof C == "object" && C) (g = c(C.get, "accessor.get")) && (b.get = g), (g = c(C.set, "accessor.set")) && (b.set = g), (g = c(C.init, "accessor.init")) && x.push(g);
						else if (C !== void 0) throw TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
					} else c(C, (f ? "field" : "method") + " decorators", "return") && (f ? x.push(C) : b[S] = C);
				}
			} finally {
				D.v = !0;
			}
		}
		return (f || p) && l.push(function(e, t) {
			for (var n = x.length - 1; n >= 0; n--) t = x[n].call(e, t);
			return t;
		}), f || y || (d ? p ? l.push(o(b, "get"), o(b, "set")) : l.push(i === 2 ? b[S] : o.call.bind(b[S])) : Object.defineProperty(e, r, b)), C;
	}
	function u(e, t) {
		return Object.defineProperty(e, Symbol.metadata || Symbol.for("Symbol.metadata"), {
			configurable: !0,
			enumerable: !0,
			value: t
		});
	}
	if (arguments.length >= 6) var d = a[Symbol.metadata || Symbol.for("Symbol.metadata")];
	var f = Object.create(d ?? null), p = function(e, t, n, r) {
		var i, a, o = [], c = function(t) {
			return te(t) === e;
		}, u = /* @__PURE__ */ new Map();
		function d(e) {
			e && o.push(s.bind(null, e));
		}
		for (var f = 0; f < t.length; f++) {
			var p = t[f];
			if (Array.isArray(p)) {
				var m = p[1], h = p[2], g = p.length > 3, _ = 16 & m, v = !!(8 & m), y = (m &= 7) == 0, b = h + "/" + v;
				if (!y && !g) {
					var x = u.get(b);
					if (!0 === x || x === 3 && m !== 4 || x === 4 && m !== 3) throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + h);
					u.set(b, !(m > 2) || m);
				}
				l(v ? e : e.prototype, p, _, g ? "#" + h : G(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
			}
		}
		return d(i), d(a), o;
	}(e, t, i, f);
	return n.length || u(e, f), {
		e: p,
		get c() {
			var t = [];
			return n.length && [u(l(e, [n], r, e.name, 5, f, t), f), s.bind(null, t, e)];
		}
	};
}
function G(e) {
	var t = ee(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ee(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function K(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function te(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
w = [s("solid-ui-rdf-input")];
var q, J = /*#__PURE__*/ new WeakMap(), Y = /*#__PURE__*/ new WeakMap(), X = /*#__PURE__*/ new WeakMap(), Z = /*#__PURE__*/ new WeakMap(), Q = /*#__PURE__*/ new WeakMap(), $ = /*#__PURE__*/ new WeakMap();
L = (T = o({
	context: b,
	subscribe: !0
}), D = c({
	attribute: !1,
	type: Object
}), k = c({
	attribute: !1,
	type: Object
}), j = c({ type: Number }), N = u(), F = c({
	type: Boolean,
	reflect: !0
}), "storeContext"), x = class extends l {
	get [L]() {
		return H(J, this);
	}
	set storeContext(e) {
		V(J, this, e);
	}
	get formSubject() {
		return H(Y, this);
	}
	set formSubject(e) {
		V(Y, this, e);
	}
	get dataSubject() {
		return H(X, this);
	}
	set dataSubject(e) {
		V(X, this, e);
	}
	get storeVersion() {
		return H(Z, this);
	}
	set storeVersion(e) {
		V(Z, this, e);
	}
	get localInputValue() {
		return H(Q, this);
	}
	set localInputValue(e) {
		V(Q, this, e);
	}
	get readonly() {
		return H($, this);
	}
	set readonly(e) {
		V($, this, e);
	}
	constructor() {
		super(), z(this, J, (S(this), E(this, y))), z(this, Y, O(this, null)), z(this, X, A(this, null)), z(this, Z, M(this, 0)), z(this, Q, P(this, null)), R(this, "_updateInFlight", !1), R(this, "_pendingUpdateValue", null), z(this, $, I(this, !0)), this.id = p();
	}
	render() {
		let e = this.getDocument(this.formSubject), t = this.getFormProperty(this.formSubject, n.ui("property"), e), r = this.getInputLabel(this.formSubject, t, e), i = this.getReadOnly(this.readonly, this.formSubject, e), a = this.formSubject ? g(this.storeContext.store, this.formSubject) : void 0, o = a ? v[a] ?? {} : {}, s = o.type ?? "text", c = this.getSelectedTerm(this.dataSubject, t, this.formSubject, o), l = i ? "" : this.defaultInputValue(o), u = this._updateInFlight || this._pendingUpdateValue !== null ? this.localInputValue ?? "" : this.termToInputValue(c);
		return d`
      <solid-ui-input
        label="${r}"
        name="name-${this.id}"
        .value=${u}
        .placeholder=${l}
        type="${s}"
        ?readonly=${i}
        @input=${this.updateData}
      ></solid-ui-input>`;
	}
	getDocument(e) {
		return e?.doc ? e.doc() : void 0;
	}
	getFormProperty(e, t, n) {
		if (e) return this.storeContext.store.any(e, t, null, n);
	}
	getInputLabel(e, t, r) {
		if (!e) return "";
		let i = this.storeContext.store.any(e, n.ui("label"), null, r), o = t ? a(t, !0) : "";
		return i ? i.value : o;
	}
	getReadOnly(e, t, r) {
		return t && e === !1 ? !!this.storeContext.store.anyJS(t, n.ui("suppressEmptyUneditable"), null, r) : e;
	}
	getSelectedTerm(e, t, r, i) {
		let a = r ? this.storeContext.store.any(r, n.ui("default")) : void 0;
		return !t || !e ? a : this.storeContext.store.any(e, t) || a;
	}
	termToInputValue(e) {
		if (!e || !("value" in e) || !e.value) return "";
		try {
			return decodeURIComponent(e.value);
		} catch {
			return String(e.value);
		}
	}
	defaultInputValue(e = {}) {
		return (e.defaultInputValue ?? "").replace(/ /g, "");
	}
	async updateData(e) {
		let t = e.target.value;
		this.localInputValue = t, this._pendingUpdateValue = t, !this._updateInFlight && await this.runPendingUpdate();
	}
	async runPendingUpdate() {
		if (this._pendingUpdateValue === null) return;
		let r = this._pendingUpdateValue;
		this._pendingUpdateValue = null, this._updateInFlight = !0;
		let i = this.getFormProperty(this.formSubject, n.ui("property"), this.getDocument(this.formSubject));
		if (!i || !this.dataSubject) {
			this._updateInFlight = !1, this.localInputValue = "";
			return;
		}
		let a = this.getDocument(this.dataSubject);
		if (a && this.storeContext.store.updater?.editable(a) === !1) {
			this._updateInFlight = !1;
			return;
		}
		let o = this.storeContext.store.statementsMatching(this.dataSubject, i), s = [];
		if (r) {
			let a, c = this.formSubject ? g(this.storeContext.store, this.formSubject) : void 0, l = c ? v[c] ?? {} : {};
			l.namedNode ? a = this.storeContext.store.sym(r) : l.defaultInputValue ? (a = encodeURIComponent(r.replace(/ /g, "")), a = this.storeContext.store.sym(l.defaultInputValue + a)) : a = l.dt ? new e(r.trim(), void 0, n.xsd(l.dt)) : new e(r), s = o.map((e) => t(e.subject, e.predicate, a, e.why)), s.length === 0 && (s = [t(this.dataSubject, i, a, this.getDocument(this.dataSubject))]);
		}
		try {
			await this.storeContext.store.updater.updateMany(o, s), this.storeVersion += 1;
		} catch (e) {
			console.error("RDFInput update failed", e);
		} finally {
			this._updateInFlight = !1;
		}
		this._pendingUpdateValue !== null && await this.runPendingUpdate();
	}
}, {e: [E, O, A, M, P, I, S], c: [q, C]} = W(x, [
	[
		T,
		1,
		"storeContext"
	],
	[
		D,
		1,
		"formSubject"
	],
	[
		k,
		1,
		"dataSubject"
	],
	[
		j,
		1,
		"storeVersion"
	],
	[
		N,
		1,
		"localInputValue"
	],
	[
		F,
		1,
		"readonly"
	]
], w, 0, void 0, l), C();
//#endregion
//#region src/components/rdf-input/index.ts
var ne = q;
//#endregion
export { m as a, b as i, q as n, _ as o, y as r, h as s, ne as t };

//# sourceMappingURL=rdf-input-n73oeSkf.js.map