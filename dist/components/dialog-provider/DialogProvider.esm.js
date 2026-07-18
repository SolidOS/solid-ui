import { dialogContext as e } from "../../lib/dialogs/context.esm.js";
import { customElement as t } from "../../lib/components/decorators.esm.js";
import n from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import { provide as r } from "@lit/context";
import { property as i } from "lit/decorators.js";
//#region src/components/dialog-provider/DialogProvider.ts
var a, o, s, c, l, u, d, f, p;
function m(e, t, n) {
	h(e, t), t.set(e, n);
}
function h(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function g(e, t, n) {
	return e.set(v(e, t), n), n;
}
function _(e, t) {
	return e.get(v(e, t));
}
function v(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function y(e, t, n, r, i, a) {
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
			var b = {}, x = [], C = i === 3 ? "get" : i === 4 || p ? "set" : "value";
			d ? (f || p ? b = {
				get: S(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[C] = v, f || S(b[C], r, i === 2 ? "" : C)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
		}
		for (var w = e, T = _.length - 1; T >= 0; T -= n ? 2 : 1) {
			var E = _[T], D = n ? _[T - 1] : void 0, O = {}, k = {
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
				}.bind(null, O)
			};
			try {
				if (y) (g = c(E.call(D, w, k), "class decorators", "return")) && (w = g);
				else {
					var A, j;
					k.static = u, k.private = d, d ? i === 2 ? A = function(e) {
						return h(e), b.value;
					} : (i < 4 && (A = o(b, "get", h)), i !== 3 && (j = o(b, "set", h))) : (A = function(e) {
						return e[r];
					}, (i < 2 || i === 4) && (j = function(e, t) {
						e[r] = t;
					}));
					var M = k.access = { has: d ? m.bind() : function(e) {
						return r in e;
					} };
					if (A && (M.get = A), j && (M.set = j), w = E.call(D, p ? {
						get: b.get,
						set: b.set
					} : b[C], k), p) {
						if (typeof w == "object" && w) (g = c(w.get, "accessor.get")) && (b.get = g), (g = c(w.set, "accessor.set")) && (b.set = g), (g = c(w.init, "accessor.init")) && x.push(g);
						else if (w !== void 0) throw TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
					} else c(w, (f ? "field" : "method") + " decorators", "return") && (f ? x.push(w) : b[C] = w);
				}
			} finally {
				O.v = !0;
			}
		}
		return (f || p) && l.push(function(e, t) {
			for (var n = x.length - 1; n >= 0; n--) t = x[n].call(e, t);
			return t;
		}), f || y || (d ? p ? l.push(o(b, "get"), o(b, "set")) : l.push(i === 2 ? b[C] : o.call.bind(b[C])) : Object.defineProperty(e, r, b)), w;
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
			return C(t) === e;
		}, u = /* @__PURE__ */ new Map();
		function d(e) {
			e && o.push(s.bind(null, e));
		}
		for (var f = 0; f < t.length; f++) {
			var p = t[f];
			if (Array.isArray(p)) {
				var m = p[1], h = p[2], g = p.length > 3, _ = 16 & m, v = !!(8 & m), y = (m &= 7) == 0, x = h + "/" + v;
				if (!y && !g) {
					var S = u.get(x);
					if (!0 === S || S === 3 && m !== 4 || S === 4 && m !== 3) throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + h);
					u.set(x, !(m > 2) || m);
				}
				l(v ? e : e.prototype, p, _, g ? "#" + h : b(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function b(e) {
	var t = x(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function x(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function S(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function C(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
c = [t("solid-ui-dialog-provider")];
var w, T = /*#__PURE__*/ new WeakMap(), E = /*#__PURE__*/ new WeakMap();
p = (l = i({
	type: String,
	reflect: !0
}), d = r({ context: e }), "dialogId"), a = class extends n {
	constructor(...e) {
		super(...e), m(this, T, (o(this), u(this))), m(this, E, f(this, { id: "" }));
	}
	get [p]() {
		return _(T, this);
	}
	set dialogId(e) {
		g(T, this, e);
	}
	get dialog() {
		return _(E, this);
	}
	set dialog(e) {
		g(E, this, e);
	}
	willUpdate(e) {
		super.willUpdate(e), e.has("dialogId") && this.dialogId && (this.dialog = { id: this.dialogId });
	}
	firstUpdated() {
		let e = this.shadowRoot?.querySelector("slot");
		this.dispatchEvent(new CustomEvent("mounted", {
			bubbles: !0,
			composed: !0,
			detail: e?.assignedElements()[0]
		}));
	}
}, {e: [u, f, o], c: [w, s]} = y(a, [[
	l,
	1,
	"dialogId"
], [
	d,
	1,
	"dialog"
]], c, 0, void 0, n), s();
//#endregion
export { w as default };

//# sourceMappingURL=DialogProvider.esm.js.map