import { C as e, L as t, S as n, h as r } from "./solid-logic.esm-BrMdCG2_.js";
import { t as i, u as a } from "./style-DMYSNcEw.js";
import { b as o, g as s, i as c, o as l, u, x as d, y as f } from "./components-DrP7BOrs.js";
import "./input-CFDN76Y5.js";
//#region src/lib/forms/rdfFormsHelper.ts
async function p(e, t) {
	let r = n(t);
	return e.holds(void 0, void 0, void 0, r) && e.removeStatements(e.statementsMatching(void 0, void 0, void 0, r)), await e.fetcher.load(t, {
		force: !0,
		clearPreviousData: !0
	});
}
function m(e, t) {
	let n = t.map((t) => {
		let n = e.any(t, r.ui("sequence")), i = n ? Number(n.value) : 9999;
		return [Number.isNaN(i) ? 9999 : i, t];
	});
	return n.sort((e, t) => e[0] - t[0]), n.map((e) => e[1]);
}
function h(e, t) {
	let n = e.findTypeURIs(t), r = e.bottomTypeURIs(n), i = [];
	for (let e in r) i.push(e);
	return i[0];
}
function g(e, t) {
	let i = t.split("#")[0], a = t.includes("#") ? t.split("#")[1] : null;
	if (a) {
		let t = n(i + "#" + a);
		if (e.holds(t, r.rdf("type"), r.ui("Form"))) return t;
	}
	return e.each(null, r.rdf("type"), r.ui("Form")).find((e) => e.termType === "NamedNode") || null;
}
//#endregion
//#region src/lib/forms/fieldParams.ts
var _ = {
	[r.ui("ColorField").uri]: {
		size: 9,
		type: "color",
		style: "height: 3em;",
		dt: "color",
		pattern: /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/
	},
	[r.ui("DateField").uri]: {
		size: 20,
		type: "date",
		dt: "date",
		pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/
	},
	[r.ui("DateTimeField").uri]: {
		size: 20,
		type: "datetime-local",
		dt: "dateTime",
		pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/
	},
	[r.ui("TimeField").uri]: {
		size: 10,
		type: "time",
		dt: "time",
		pattern: /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/
	},
	[r.ui("IntegerField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "integer",
		pattern: /^\s*-?[0-9]+\s*$/
	},
	[r.ui("DecimalField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "decimal",
		pattern: /^\s*-?[0-9]*(\.[0-9]*)?\s*$/
	},
	[r.ui("FloatField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "float",
		pattern: /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/
	},
	[r.ui("SingleLineTextField").uri]: {},
	[r.ui("NamedNodeURIField").uri]: { namedNode: !0 },
	[r.ui("TextField").uri]: {},
	[r.ui("PhoneField").uri]: {
		size: 20,
		defaultInputValue: "tel:",
		pattern: /^\+?[\d-]+[\d]*$/
	},
	[r.ui("EmailField").uri]: {
		size: 30,
		defaultInputValue: "mailto:",
		pattern: /^\s*.*@.*\..*\s*$/
	},
	[r.ui("Group").uri]: { style: i.formGroupStyle },
	[r.ui("Comment").uri]: {
		element: "p",
		style: i.commentStyle
	},
	[r.ui("Heading").uri]: {
		element: "h3",
		style: i.formHeadingStyle
	}
}, v = new class {
	get store() {
		throw Error("Cannot use RDF forms without a store");
	}
}(), y = d(Symbol("storeContext")), b, x, S, C, w, T, E, D, O, k, A, j, M, N, P;
function F(e, t, n) {
	return (t = H(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function I(e, t, n) {
	L(e, t), t.set(e, n);
}
function L(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function R(e, t, n) {
	return e.set(B(e, t), n), n;
}
function z(e, t) {
	return e.get(B(e, t));
}
function B(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function V(e, t, n, r, i, a) {
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
				get: W(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || W(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return G(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : H(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function H(e) {
	var t = U(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function U(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function W(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function G(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
C = [s("solid-ui-rdf-input")];
var K, q = /*#__PURE__*/ new WeakMap(), J = /*#__PURE__*/ new WeakMap(), Y = /*#__PURE__*/ new WeakMap(), X = /*#__PURE__*/ new WeakMap(), Z = /*#__PURE__*/ new WeakMap();
P = (w = o({
	context: y,
	subscribe: !0
}), E = c({
	attribute: !1,
	type: Object
}), O = c({
	attribute: !1,
	type: Object
}), A = c({ type: Number }), M = c({
	type: Boolean,
	reflect: !0
}), "storeContext"), b = class extends l {
	get [P]() {
		return z(q, this);
	}
	set storeContext(e) {
		R(q, this, e);
	}
	get formSubject() {
		return z(J, this);
	}
	set formSubject(e) {
		R(J, this, e);
	}
	get dataSubject() {
		return z(Y, this);
	}
	set dataSubject(e) {
		R(Y, this, e);
	}
	get storeVersion() {
		return z(X, this);
	}
	set storeVersion(e) {
		R(X, this, e);
	}
	get readonly() {
		return z(Z, this);
	}
	set readonly(e) {
		R(Z, this, e);
	}
	constructor() {
		super(), I(this, q, (x(this), T(this, v))), I(this, J, D(this, null)), I(this, Y, k(this, null)), I(this, X, j(this, 0)), F(this, "_updateInFlight", !1), F(this, "_pendingUpdateValue", null), I(this, Z, N(this, !0)), this.id = f();
	}
	render() {
		let e = this.getDocument(this.formSubject), t = this.getFormProperty(this.formSubject, r.ui("property"), e), n = this.getInputLabel(this.formSubject, t, e), i = this.getReadOnly(this.readonly, this.formSubject, e), a = this.formSubject ? h(this.storeContext.store, this.formSubject) : void 0, o = a ? _[a] ?? {} : {}, s = o.type ?? "text", c = this.getSelectedTerm(this.dataSubject, t, this.formSubject, o), l = i ? "" : this.defaultInputValue(o), d = this.termToInputValue(c);
		return u`
      <solid-ui-input
        label="${n}"
        name="name-${this.id}"
        .value=${d}
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
	getInputLabel(e, t, n) {
		if (!e) return "";
		let i = this.storeContext.store.any(e, r.ui("label"), null, n), o = t ? a(t, !0) : "";
		return i ? i.value : o;
	}
	getReadOnly(e, t, n) {
		return t && e === !1 ? !!this.storeContext.store.anyJS(t, r.ui("suppressEmptyUneditable"), null, n) : e;
	}
	getSelectedTerm(e, t, n, i) {
		let a = n ? this.storeContext.store.any(n, r.ui("default")) : void 0;
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
		this._pendingUpdateValue = t, !this._updateInFlight && await this.runPendingUpdate();
	}
	async runPendingUpdate() {
		if (this._pendingUpdateValue === null) return;
		let n = this._pendingUpdateValue;
		this._pendingUpdateValue = null, this._updateInFlight = !0;
		let i = this.getFormProperty(this.formSubject, r.ui("property"), this.getDocument(this.formSubject));
		if (!i || !this.dataSubject) {
			this._updateInFlight = !1;
			return;
		}
		let a = this.getDocument(this.dataSubject);
		if (a && this.storeContext.store.updater?.editable(a) === !1) {
			this._updateInFlight = !1;
			return;
		}
		let o = this.storeContext.store.statementsMatching(this.dataSubject, i), s = [];
		if (n) {
			let a, c = this.formSubject ? h(this.storeContext.store, this.formSubject) : void 0, l = c ? _[c] ?? {} : {};
			l.namedNode ? a = this.storeContext.store.sym(n) : l.defaultInputValue ? (a = encodeURIComponent(n.replace(/ /g, "")), a = this.storeContext.store.sym(l.defaultInputValue + a)) : a = l.dt ? new t(n.trim(), void 0, r.xsd(l.dt)) : new t(n), s = o.map((t) => e(t.subject, t.predicate, a, t.why)), s.length === 0 && (s = [e(this.dataSubject, i, a, this.getDocument(this.dataSubject))]);
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
}, {e: [T, D, k, j, N, x], c: [K, S]} = V(b, [
	[
		w,
		1,
		"storeContext"
	],
	[
		E,
		1,
		"formSubject"
	],
	[
		O,
		1,
		"dataSubject"
	],
	[
		A,
		1,
		"storeVersion"
	],
	[
		M,
		1,
		"readonly"
	]
], C, 0, void 0, l), S();
//#endregion
//#region src/components/rdf-input/index.ts
var Q = K;
//#endregion
export { p as a, y as i, K as n, g as o, v as r, m as s, Q as t };

//# sourceMappingURL=rdf-input-DFZw8gOT.js.map