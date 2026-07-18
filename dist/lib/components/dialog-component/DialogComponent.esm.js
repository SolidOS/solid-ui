import { DEFAULT_DIALOG_CONTEXT as e, dialogContext as t } from "../../dialogs/context.esm.js";
import n from "../traits/DialogTrait.esm.js";
import r from "../web-component/WebComponent.esm.js";
import "../web-component/index.esm.js";
import { consume as i } from "@lit/context";
//#region src/lib/components/dialog-component/DialogComponent.ts
var a, o, s, c, l;
function u(e, t, n) {
	d(e, t), t.set(e, n);
}
function d(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function f(e, t, n) {
	return (t = _(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function p(e, t, n) {
	return e.set(h(e, t), n), n;
}
function m(e, t) {
	return e.get(h(e, t));
}
function h(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function g(e, t, n, r, i, a) {
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
		var g, _ = t[0], v = t[3], b = !l;
		if (!b) {
			n || Array.isArray(_) || (_ = [_]);
			var x = {}, S = [], C = i === 3 ? "get" : i === 4 || p ? "set" : "value";
			d ? (f || p ? x = {
				get: y(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : x[C] = v, f || y(x[C], r, i === 2 ? "" : C)) : f || (x = Object.getOwnPropertyDescriptor(e, r));
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
				if (b) (g = c(E.call(D, w, k), "class decorators", "return")) && (w = g);
				else {
					var A, j;
					k.static = u, k.private = d, d ? i === 2 ? A = function(e) {
						return h(e), x.value;
					} : (i < 4 && (A = o(x, "get", h)), i !== 3 && (j = o(x, "set", h))) : (A = function(e) {
						return e[r];
					}, (i < 2 || i === 4) && (j = function(e, t) {
						e[r] = t;
					}));
					var M = k.access = { has: d ? m.bind() : function(e) {
						return r in e;
					} };
					if (A && (M.get = A), j && (M.set = j), w = E.call(D, p ? {
						get: x.get,
						set: x.set
					} : x[C], k), p) {
						if (typeof w == "object" && w) (g = c(w.get, "accessor.get")) && (x.get = g), (g = c(w.set, "accessor.set")) && (x.set = g), (g = c(w.init, "accessor.init")) && S.push(g);
						else if (w !== void 0) throw TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
					} else c(w, (f ? "field" : "method") + " decorators", "return") && (f ? S.push(w) : x[C] = w);
				}
			} finally {
				O.v = !0;
			}
		}
		return (f || p) && l.push(function(e, t) {
			for (var n = S.length - 1; n >= 0; n--) t = S[n].call(e, t);
			return t;
		}), f || b || (d ? p ? l.push(o(x, "get"), o(x, "set")) : l.push(i === 2 ? x[C] : o.call.bind(x[C])) : Object.defineProperty(e, r, x)), w;
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
			return b(t) === e;
		}, u = /* @__PURE__ */ new Map();
		function d(e) {
			e && o.push(s.bind(null, e));
		}
		for (var f = 0; f < t.length; f++) {
			var p = t[f];
			if (Array.isArray(p)) {
				var m = p[1], h = p[2], g = p.length > 3, v = 16 & m, y = !!(8 & m), x = (m &= 7) == 0, S = h + "/" + y;
				if (!x && !g) {
					var C = u.get(S);
					if (!0 === C || C === 3 && m !== 4 || C === 4 && m !== 3) throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + h);
					u.set(S, !(m > 2) || m);
				}
				l(y ? e : e.prototype, p, v, g ? "#" + h : _(h), m, r, y ? a ||= [] : i ||= [], o, y, g, x, m === 1, y && g ? c : n);
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
function _(e) {
	var t = v(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function v(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function y(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function b(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
var x = /*#__PURE__*/ new WeakMap();
l = (s = i({
	context: t,
	subscribe: !0
}), "dialogTrait");
var S = class extends r {
	get context() {
		return m(x, this);
	}
	set context(e) {
		p(x, this, e);
	}
	constructor() {
		super(), f(this, l, void o(this)), u(this, x, c(this, e)), this.dialogTrait = this.addTrait(new n(this, { getContext: () => this.context }));
	}
	close(e) {
		this.dialogTrait.close(e);
	}
};
a = S, [c, o] = g(a, [[
	s,
	1,
	"context"
]], [], 0, void 0, r).e;
//#endregion
export { S as default };

//# sourceMappingURL=DialogComponent.esm.js.map