import { a as e, o as t } from "./auth-eA0awhwS.js";
import { b as n, g as r, o as i, u as a } from "./components-DrP7BOrs.js";
import "./button-1tlC3ieB.js";
//#region src/components/logout-button/LogoutButton.ts
var o, s, c, l, u, d, f;
function p(e, t, n) {
	m(e, t), t.set(e, n);
}
function m(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function h(e, t, n) {
	return e.set(_(e, t), n), n;
}
function g(e, t) {
	return e.get(_(e, t));
}
function _(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function v(e, t, n, r, i, a) {
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
			var b = {}, S = [], C = i === 3 ? "get" : i === 4 || p ? "set" : "value";
			d ? (f || p ? b = {
				get: x(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[C] = v, f || x(b[C], r, i === 2 ? "" : C)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
						if (typeof w == "object" && w) (g = c(w.get, "accessor.get")) && (b.get = g), (g = c(w.set, "accessor.set")) && (b.set = g), (g = c(w.init, "accessor.init")) && S.push(g);
						else if (w !== void 0) throw TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
					} else c(w, (f ? "field" : "method") + " decorators", "return") && (f ? S.push(w) : b[C] = w);
				}
			} finally {
				O.v = !0;
			}
		}
		return (f || p) && l.push(function(e, t) {
			for (var n = S.length - 1; n >= 0; n--) t = S[n].call(e, t);
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
			return S(t) === e;
		}, u = /* @__PURE__ */ new Map();
		function d(e) {
			e && o.push(s.bind(null, e));
		}
		for (var f = 0; f < t.length; f++) {
			var p = t[f];
			if (Array.isArray(p)) {
				var m = p[1], h = p[2], g = p.length > 3, _ = 16 & m, v = !!(8 & m), b = (m &= 7) == 0, x = h + "/" + v;
				if (!b && !g) {
					var C = u.get(x);
					if (!0 === C || C === 3 && m !== 4 || C === 4 && m !== 3) throw Error("Attempted to decorate a public method/accessor that has the same name as a previously decorated public method/accessor. This is not currently supported by the decorators plugin. Property name was: " + h);
					u.set(x, !(m > 2) || m);
				}
				l(v ? e : e.prototype, p, _, g ? "#" + h : y(h), m, r, v ? a ||= [] : i ||= [], o, v, g, b, m === 1, v && g ? c : n);
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
function y(e) {
	var t = b(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function b(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function x(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function S(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
l = [r("solid-ui-logout-button")];
var C, w = /*#__PURE__*/ new WeakMap();
f = (u = n({
	context: t,
	subscribe: !0
}), "auth"), o = class extends i {
	constructor(...t) {
		super(...t), p(this, w, (s(this), d(this, e)));
	}
	get [f]() {
		return g(w, this);
	}
	set auth(e) {
		h(w, this, e);
	}
	render() {
		return a`
      <slot name="trigger" @click=${this.onClick}>
        <solid-ui-button>
            <slot>
                Log Out
            </slot>
        </solid-ui-button>
      </slot>
    `;
	}
	click() {
		this.auth.logout();
	}
	onClick(e) {
		e.preventDefault(), this.click();
	}
}, {e: [d, s], c: [C, c]} = v(o, [[
	u,
	1,
	"auth"
]], l, 0, void 0, i), c();
//#endregion
//#region src/components/logout-button/index.ts
var T = C;
//#endregion
export { C as n, T as t };

//# sourceMappingURL=logout-button-Ce13Fnwn.js.map