import { g as e, o as t, p as n, u as r } from "./components-DrP7BOrs.js";
//#region ~icons/app/solid-emblem
var i = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg width=\"100%\" height=\"100%\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 352 322\"><g fill=\"none\"><path fill=\"#fff\" d=\"m87.973 282.353-60.732-105.33a31.6 31.6 0 0 1 0-31.538L87.973 40.233c5.646-9.784 16.08-15.795 27.321-15.795H236.68c11.266 0 21.727 6.011 27.321 15.795l60.758 105.304a31.6 31.6 0 0 1 0 31.537l-60.732 105.33c-5.646 9.784-16.08 15.795-27.321 15.795H115.372a31.85 31.85 0 0 1-27.4-15.846\"/><path fill=\"#7c4dff\" d=\"m93.151 275.197-57.115-99.06c-5.308-9.185-5.308-20.504 0-29.663l57.115-99.086a29.74 29.74 0 0 1 25.734-14.857h114.23c10.59 0 20.426 5.646 25.734 14.857l57.167 99.034c5.308 9.185 5.308 20.504 0 29.663l-57.141 99.138a29.74 29.74 0 0 1-25.734 14.858H118.937a29.79 29.79 0 0 1-25.786-14.884\"/><path fill=\"#f7f7f7\" d=\"M118.469 142.233h117.534a2.65 2.65 0 0 0 2.654-2.654v-22.04c0-14.65-11.891-26.54-26.54-26.54h-70.568c-20.53-.026-37.157 16.6-37.157 37.13-.026 7.833 6.27 14.104 14.077 14.104m11.527 97.368h70.229c21.207 0 38.432-17.225 38.432-38.432 0-7.078-5.724-12.828-12.828-12.828H106.942a2.537 2.537 0 0 0-2.55 2.55v23.054c-.026 14.181 11.475 25.656 25.604 25.656\"/><path fill=\"#f7f7f7\" d=\"m109.596 139.319 87.663 87.662c5.802 5.803 15.196 5.803 20.998 0l15.196-15.196c5.803-5.802 5.803-15.196 0-20.998l-87.637-87.663c-5.802-5.802-15.196-5.802-20.998 0l-15.196 15.196c-5.855 5.803-5.855 15.222-.026 20.999\"/><path fill=\"#444\" d=\"m198.69 228.464-51.495-40.123h11.397zm-54.33-126.797 40.565 40.566h13.765z\" opacity=\".3\"/></g><script/></svg>\n";
	}
};
customElements.get("icon-app-solid-emblem") || customElements.define("icon-app-solid-emblem", i);
//#endregion
//#region src/components/solid-emblem/SolidEmblem.styles.css
var a = n`:host{display:inline-flex}`, o, s, c, l, u;
function d(e, t, n) {
	return (t = p(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function f(e, t, n, r, i, a) {
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
		function g(e) {
			if (!m(e)) throw TypeError("Attempted to access private element on non-instance");
		}
		var _, v = t[0], y = t[3], b = !l;
		if (!b) {
			n || Array.isArray(v) || (v = [v]);
			var x = {}, S = [], C = i === 3 ? "get" : i === 4 || p ? "set" : "value";
			d ? (f || p ? x = {
				get: h(function() {
					return y(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : x[C] = y, f || h(x[C], r, i === 2 ? "" : C)) : f || (x = Object.getOwnPropertyDescriptor(e, r));
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
					var M = k.access = { has: d ? m.bind() : function(e) {
						return r in e;
					} };
					if (A && (M.get = A), j && (M.set = j), w = E.call(D, p ? {
						get: x.get,
						set: x.set
					} : x[C], k), p) {
						if (typeof w == "object" && w) (_ = c(w.get, "accessor.get")) && (x.get = _), (_ = c(w.set, "accessor.set")) && (x.set = _), (_ = c(w.init, "accessor.init")) && S.push(_);
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
	var f = Object.create(d ?? null), m = function(e, t, n, r) {
		var i, a, o = [], c = function(t) {
			return g(t) === e;
		}, u = /* @__PURE__ */ new Map();
		function d(e) {
			e && o.push(s.bind(null, e));
		}
		for (var f = 0; f < t.length; f++) {
			var m = t[f];
			if (Array.isArray(m)) {
				var h = m[1], _ = m[2], v = m.length > 3, y = 16 & h, b = !!(8 & h), x = (h &= 7) == 0, S = _ + "/" + b;
				if (!x && !v) {
					var C = u.get(S);
					if (!0 === C || C === 3 && h !== 4 || C === 4 && h !== 3) throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + _);
					u.set(S, !(h > 2) || h);
				}
				l(b ? e : e.prototype, m, y, v ? "#" + _ : p(_), h, r, b ? a ||= [] : i ||= [], o, b, v, x, h === 1, b && v ? c : n);
			}
		}
		return d(i), d(a), o;
	}(e, t, i, f);
	return n.length || u(e, f), {
		e: m,
		get c() {
			var t = [];
			return n.length && [u(l(e, [n], r, e.name, 5, f, t), f), s.bind(null, t, e)];
		}
	};
}
function p(e) {
	var t = m(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function m(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function h(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function g(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function _(e) {
	return e;
}
l = [e("solid-ui-solid-emblem")];
var v;
new (u = (s = class extends t {
	render() {
		return r`<icon-app-solid-emblem></icon-app-solid-emblem>`;
	}
}, [v, c] = f(s, [], l, 0, void 0, t).c, s), o = class extends _ {
	constructor() {
		super(v), d(this, "styles", a), c();
	}
}, d(o, u, void 0), o)();
//#endregion
//#region src/components/solid-emblem/index.ts
var y = v;
//#endregion
export { v as n, y as t };

//# sourceMappingURL=solid-emblem-D4ItOckU.js.map