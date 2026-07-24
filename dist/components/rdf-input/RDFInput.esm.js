import e from "../../lib/ns.esm.js";
import { label as t } from "../../utils/label.esm.js";
import "../../utils/index.esm.js";
import { generateId as n } from "../../lib/components/ids.esm.js";
import { customElement as r } from "../../lib/components/decorators.esm.js";
import i from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../input/index.esm.js";
import { mostSpecificClassURI as a } from "../../lib/forms/rdfFormsHelper.esm.js";
import { fieldParams as o } from "../../lib/forms/fieldParams.esm.js";
import { DEFAULT_STORE as s, storeContext as c } from "../../lib/forms/store/StoreContext.esm.js";
import { Literal as l, st as u } from "rdflib";
import { consume as d } from "@lit/context";
import { property as f, state as p } from "lit/decorators.js";
import { html as m } from "lit/html.js";
//#region src/components/rdf-input/RDFInput.ts
var h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j;
function M(e, t, n) {
	return (t = z(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function N(e, t, n) {
	P(e, t), t.set(e, n);
}
function P(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function F(e, t, n) {
	return e.set(L(e, t), n), n;
}
function I(e, t) {
	return e.get(L(e, t));
}
function L(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function R(e, t, n, r, i, a) {
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
				get: V(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || V(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return H(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : z(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function z(e) {
	var t = B(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function B(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function V(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function H(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
v = [r("solid-ui-rdf-input")];
var U, W = /*#__PURE__*/ new WeakMap(), G = /*#__PURE__*/ new WeakMap(), K = /*#__PURE__*/ new WeakMap(), q = /*#__PURE__*/ new WeakMap(), J = /*#__PURE__*/ new WeakMap(), Y = /*#__PURE__*/ new WeakMap();
j = (y = d({
	context: c,
	subscribe: !0
}), x = f({
	attribute: !1,
	type: Object
}), C = f({
	attribute: !1,
	type: Object
}), T = f({ type: Number }), D = p(), k = f({
	type: Boolean,
	reflect: !0
}), "storeContext"), h = class extends i {
	get [j]() {
		return I(W, this);
	}
	set storeContext(e) {
		F(W, this, e);
	}
	get formSubject() {
		return I(G, this);
	}
	set formSubject(e) {
		F(G, this, e);
	}
	get dataSubject() {
		return I(K, this);
	}
	set dataSubject(e) {
		F(K, this, e);
	}
	get storeVersion() {
		return I(q, this);
	}
	set storeVersion(e) {
		F(q, this, e);
	}
	get localInputValue() {
		return I(J, this);
	}
	set localInputValue(e) {
		F(J, this, e);
	}
	get readonly() {
		return I(Y, this);
	}
	set readonly(e) {
		F(Y, this, e);
	}
	constructor() {
		super(), N(this, W, (g(this), b(this, s))), N(this, G, S(this, null)), N(this, K, w(this, null)), N(this, q, E(this, 0)), N(this, J, O(this, null)), M(this, "_updateInFlight", !1), M(this, "_pendingUpdateValue", null), N(this, Y, A(this, !0)), this.id = n();
	}
	render() {
		let t = this.getDocument(this.formSubject), n = this.getFormProperty(this.formSubject, e.ui("property"), t), r = this.getInputLabel(this.formSubject, n, t), i = this.getReadOnly(this.readonly, this.formSubject, t), s = this.formSubject ? a(this.storeContext.store, this.formSubject) : void 0, c = s ? o[s] ?? {} : {}, l = c.type ?? "text", u = this.getSelectedTerm(this.dataSubject, n, this.formSubject, c), d = i ? "" : this.defaultInputValue(c), f = this._updateInFlight || this._pendingUpdateValue !== null ? this.localInputValue ?? "" : this.termToInputValue(u);
		return m`
      <solid-ui-input
        label="${r}"
        name="name-${this.id}"
        .value=${f}
        .placeholder=${d}
        type="${l}"
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
	getInputLabel(n, r, i) {
		if (!n) return "";
		let a = this.storeContext.store.any(n, e.ui("label"), null, i), o = r ? t(r, !0) : "";
		return a ? a.value : o;
	}
	getReadOnly(t, n, r) {
		return n && t === !1 ? !!this.storeContext.store.anyJS(n, e.ui("suppressEmptyUneditable"), null, r) : t;
	}
	getSelectedTerm(t, n, r, i) {
		let a = r ? this.storeContext.store.any(r, e.ui("default")) : void 0;
		return !n || !t ? a : this.storeContext.store.any(t, n) || a;
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
		let t = this._pendingUpdateValue;
		this._pendingUpdateValue = null, this._updateInFlight = !0;
		let n = this.getFormProperty(this.formSubject, e.ui("property"), this.getDocument(this.formSubject));
		if (!n || !this.dataSubject) {
			this._updateInFlight = !1, this.localInputValue = "";
			return;
		}
		let r = this.getDocument(this.dataSubject);
		if (r && this.storeContext.store.updater?.editable(r) === !1) {
			this._updateInFlight = !1;
			return;
		}
		let i = this.storeContext.store.statementsMatching(this.dataSubject, n), s = [];
		if (t) {
			let r, c = this.formSubject ? a(this.storeContext.store, this.formSubject) : void 0, d = c ? o[c] ?? {} : {};
			d.namedNode ? r = this.storeContext.store.sym(t) : d.defaultInputValue ? (r = encodeURIComponent(t.replace(/ /g, "")), r = this.storeContext.store.sym(d.defaultInputValue + r)) : r = d.dt ? new l(t.trim(), void 0, e.xsd(d.dt)) : new l(t), s = i.map((e) => u(e.subject, e.predicate, r, e.why)), s.length === 0 && (s = [u(this.dataSubject, n, r, this.getDocument(this.dataSubject))]);
		}
		try {
			await this.storeContext.store.updater.updateMany(i, s), this.storeVersion += 1;
		} catch (e) {
			console.error("RDFInput update failed", e);
		} finally {
			this._updateInFlight = !1;
		}
		this._pendingUpdateValue !== null && await this.runPendingUpdate();
	}
}, {e: [b, S, w, E, O, A, g], c: [U, _]} = R(h, [
	[
		y,
		1,
		"storeContext"
	],
	[
		x,
		1,
		"formSubject"
	],
	[
		C,
		1,
		"dataSubject"
	],
	[
		T,
		1,
		"storeVersion"
	],
	[
		D,
		1,
		"localInputValue"
	],
	[
		k,
		1,
		"readonly"
	]
], v, 0, void 0, i), _();
//#endregion
export { U as default };

//# sourceMappingURL=RDFInput.esm.js.map