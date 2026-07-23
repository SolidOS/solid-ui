import e from "../../lib/ns.esm.js";
import { customElement as t } from "../../lib/components/decorators.esm.js";
import n from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import { fetchData as r, findForm as i, sortBySequence as a } from "../../lib/forms/rdfFormsHelper.esm.js";
import { DEFAULT_STORE as o, storeContext as s } from "../../lib/forms/store/StoreContext.esm.js";
import "../rdf-input/index.esm.js";
import { sym as c } from "rdflib";
import { consume as l } from "@lit/context";
import { property as u, state as d } from "lit/decorators.js";
import { html as f } from "lit/html.js";
//#region src/components/rdf-form/RDFForm.ts
var p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j;
function M(e, t, n) {
	N(e, t), t.set(e, n);
}
function N(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function P(e, t, n) {
	return e.set(I(e, t), n), n;
}
function F(e, t) {
	return e.get(I(e, t));
}
function I(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function L(e, t, n, r, i, a) {
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
				get: B(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || B(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return V(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : R(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function R(e) {
	var t = z(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function z(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function B(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function V(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
var H = {
	fromAttribute(e) {
		if (!e) return null;
		try {
			return new URL(e);
		} catch {
			return null;
		}
	},
	toAttribute(e) {
		return e || null;
	}
}, U = (e) => e?.href ?? "";
g = [t("solid-ui-rdf-form")];
var W, G = /*#__PURE__*/ new WeakMap(), K = /*#__PURE__*/ new WeakMap(), q = /*#__PURE__*/ new WeakMap(), J = /*#__PURE__*/ new WeakMap(), Y = /*#__PURE__*/ new WeakMap(), X = /*#__PURE__*/ new WeakMap(), Z = /*#__PURE__*/ new WeakMap();
j = (_ = l({
	context: s,
	subscribe: !0
}), y = u({ attribute: !1 }), x = d(), C = d(), T = d(), D = u({ converter: H }), k = u({ converter: H }), "storeContext"), p = class extends n {
	constructor(...e) {
		super(...e), M(this, G, (m(this), v(this, o))), M(this, K, b(this, null)), M(this, q, S(this, !0)), M(this, J, w(this, 0)), M(this, Y, E(this, !1)), M(this, X, O(this, null)), M(this, Z, A(this, null));
	}
	get [j]() {
		return F(G, this);
	}
	set storeContext(e) {
		P(G, this, e);
	}
	get passedInStore() {
		return F(K, this);
	}
	set passedInStore(e) {
		P(K, this, e);
	}
	get currentStore() {
		return this.passedInStore ?? this.storeContext.store;
	}
	get entireDataIsReadonly() {
		return F(q, this);
	}
	set entireDataIsReadonly(e) {
		P(q, this, e);
	}
	get _loadVersion() {
		return F(J, this);
	}
	set _loadVersion(e) {
		P(J, this, e);
	}
	get _documentsLoaded() {
		return F(Y, this);
	}
	set _documentsLoaded(e) {
		P(Y, this, e);
	}
	get formUrl() {
		return F(X, this);
	}
	set formUrl(e) {
		P(X, this, e);
	}
	get subjectUrl() {
		return F(Z, this);
	}
	set subjectUrl(e) {
		P(Z, this, e);
	}
	render() {
		if (!this._documentsLoaded) return f``;
		let t = this.currentStore, n = U(this.subjectUrl);
		n && t.updater?.editable(n) !== void 0 && t.updater?.editable(n) !== !1 && (this.entireDataIsReadonly = !1);
		let r = i(this.currentStore, U(this.formUrl));
		if (!r) throw Error("No ui:Form found in " + U(this.formUrl));
		let o = c(U(this.formUrl));
		return f`
      <form>
        ${(a(t, t.each(r, e.ui("parts"), null, o)) || []).flatMap((e) => e && typeof e == "object" && "elements" in e && Array.isArray(e.elements) ? e.elements : [e]).map((n) => {
			let r = t.each(n, e.rdf("type"), null, o)[0], i = r ? r.value || String(r) : n.value || String(n), a = i.lastIndexOf("#");
			return {
				value: n,
				fieldValue: a >= 0 ? i.slice(a + 1) : i
			};
		}).map((e) => {
			switch (e.fieldValue) {
				case "PhoneField":
				case "EmailField":
				case "ColorField":
				case "DateField":
				case "DateTimeField":
				case "TimeField":
				case "NumericField":
				case "IntegerField":
				case "DecimalField":
				case "FloatField":
				case "TextField":
				case "SingleLineTextField":
				case "NamedNodeURIField": return f` <solid-ui-rdf-input 
                  .formSubject=${c(e.value)} 
                  .dataSubject=${c(n)}
                  .storeVersion=${this._loadVersion}
                  .readonly=${this.entireDataIsReadonly}
                ></solid-ui-rdf-input>
                <br>`;
				case "MultiLineTextField": return f`<input .rdf=${e}></input>`;
				case "BooleanField": return f`<input .rdf=${e}></input>`;
				case "TristateField": return f`<input .rdf=${e}></input>`;
				case "Classifier": return f`<input .rdf=${e}></input>`;
				case "Choice": return f`<input .rdf=${e}></input>`;
				case "Multiple": return f`<input .rdf=${e}></input>`;
				case "Options": return f`<input .rdf=${e}></input>`;
				case "AutocompleteField": return f`<input .rdf=${e}></input>`;
				case "Comment":
				case "Heading": return f`<input .rdf=${e}></input>`;
				default: return f`<div>Unknown part type: ${e}</div>`;
			}
		})}
      </form>
    `;
	}
	willUpdate(e) {
		super.willUpdate(e), (e.has("formUrl") || e.has("subjectUrl") || e.has("passedInStore")) && this.loadDocumentsIfNeeded();
	}
	async loadDocumentsIfNeeded() {
		let e = this.currentStore, t = U(this.formUrl), n = U(this.subjectUrl);
		if (!(!t || !n)) try {
			await r(e, t), await r(e, n), this._loadVersion += 1, this._documentsLoaded = !0;
		} catch (e) {
			console.error("Failed to load RDF documents", e);
		}
	}
}, {e: [v, b, S, w, E, O, A, m], c: [W, h]} = L(p, [
	[
		_,
		1,
		"storeContext"
	],
	[
		y,
		1,
		"passedInStore"
	],
	[
		x,
		1,
		"entireDataIsReadonly"
	],
	[
		C,
		1,
		"_loadVersion"
	],
	[
		T,
		1,
		"_documentsLoaded"
	],
	[
		D,
		1,
		"formUrl"
	],
	[
		k,
		1,
		"subjectUrl"
	]
], g, 0, void 0, n), h();
//#endregion
export { W as default };

//# sourceMappingURL=RDFForm.esm.js.map