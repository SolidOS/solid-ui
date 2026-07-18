import { o as e, r as t } from "./components-Bp5jfkEz.js";
import { c as n } from "./lit-C4H1jI4q.js";
//#region src/components/dialog-footer/DialogFooter.styles.css
var r = n`:host{border-top:1px solid var(--solid-ui-color-slate-200);justify-content:space-between;align-items:center;gap:15px;padding:15px;display:flex}`, i, a, o, s, c;
function l(e, t, n) {
	return (t = d(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function u(e, t, n, r, i, a) {
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
	function l(e, t, n, r, i, a, s, l, u, d, f, m, h) {
		function g(e) {
			if (!h(e)) throw TypeError("Attempted to access private element on non-instance");
		}
		var _, v = t[0], y = t[3], b = !l;
		if (!b) {
			n || Array.isArray(v) || (v = [v]);
			var x = {}, S = [], C = i === 3 ? "get" : i === 4 || m ? "set" : "value";
			d ? (f || m ? x = {
				get: p(function() {
					return y(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : x[C] = y, f || p(x[C], r, i === 2 ? "" : C)) : f || (x = Object.getOwnPropertyDescriptor(e, r));
		}
		for (var w = e, T = v.length - 1; T >= 0; T -= n ? 2 : 1) {
			var E = v[T], D = n ? v[T - 1] : void 0, O = {}, k = {
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
				if (b) (_ = c(E.call(D, w, k), "class decorators", "return")) && (w = _);
				else {
					var A, j;
					k.static = u, k.private = d, d ? i === 2 ? A = function(e) {
						return g(e), x.value;
					} : (i < 4 && (A = o(x, "get", g)), i !== 3 && (j = o(x, "set", g))) : (A = function(e) {
						return e[r];
					}, (i < 2 || i === 4) && (j = function(e, t) {
						e[r] = t;
					}));
					var M = k.access = { has: d ? h.bind() : function(e) {
						return r in e;
					} };
					if (A && (M.get = A), j && (M.set = j), w = E.call(D, m ? {
						get: x.get,
						set: x.set
					} : x[C], k), m) {
						if (typeof w == "object" && w) (_ = c(w.get, "accessor.get")) && (x.get = _), (_ = c(w.set, "accessor.set")) && (x.set = _), (_ = c(w.init, "accessor.init")) && S.push(_);
						else if (w !== void 0) throw TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
					} else c(w, (f ? "field" : "method") + " decorators", "return") && (f ? S.push(w) : x[C] = w);
				}
			} finally {
				O.v = !0;
			}
		}
		return (f || m) && l.push(function(e, t) {
			for (var n = S.length - 1; n >= 0; n--) t = S[n].call(e, t);
			return t;
		}), f || b || (d ? m ? l.push(o(x, "get"), o(x, "set")) : l.push(i === 2 ? x[C] : o.call.bind(x[C])) : Object.defineProperty(e, r, x)), w;
	}
	function u(e, t) {
		return Object.defineProperty(e, Symbol.metadata || Symbol.for("Symbol.metadata"), {
			configurable: !0,
			enumerable: !0,
			value: t
		});
	}
	if (arguments.length >= 6) var f = a[Symbol.metadata || Symbol.for("Symbol.metadata")];
	var h = Object.create(f ?? null), g = function(e, t, n, r) {
		var i, a, o = [], c = function(t) {
			return m(t) === e;
		}, u = /* @__PURE__ */ new Map();
		function f(e) {
			e && o.push(s.bind(null, e));
		}
		for (var p = 0; p < t.length; p++) {
			var h = t[p];
			if (Array.isArray(h)) {
				var g = h[1], _ = h[2], v = h.length > 3, y = 16 & g, b = !!(8 & g), x = (g &= 7) == 0, S = _ + "/" + b;
				if (!x && !v) {
					var C = u.get(S);
					if (!0 === C || C === 3 && g !== 4 || C === 4 && g !== 3) throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + _);
					u.set(S, !(g > 2) || g);
				}
				l(b ? e : e.prototype, h, y, v ? "#" + _ : d(_), g, r, b ? a ||= [] : i ||= [], o, b, v, x, g === 1, b && v ? c : n);
			}
		}
		return f(i), f(a), o;
	}(e, t, i, h);
	return n.length || u(e, h), {
		e: g,
		get c() {
			var t = [];
			return n.length && [u(l(e, [n], r, e.name, 5, h, t), h), s.bind(null, t, e)];
		}
	};
}
function d(e) {
	var t = f(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function f(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function p(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function m(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function h(e) {
	return e;
}
s = [e("solid-ui-dialog-footer")];
var g;
new (c = (a = class extends t {}, [g, o] = u(a, [], s, 0, void 0, t).c, a), i = class extends h {
	constructor() {
		super(g), l(this, "styles", r), o();
	}
}, l(i, c, void 0), i)();
//#endregion
//#region src/components/dialog-footer/index.ts
var _ = g;
//#endregion
export { g as n, _ as t };

//# sourceMappingURL=dialog-footer-BNCarTa9.js.map