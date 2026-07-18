import { DEFAULT_AUTH_CONTEXT as e, authContext as t } from "../../lib/auth/context.esm.js";
import { customElement as n } from "../../lib/components/decorators.esm.js";
import r from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../../lib/auth/index.esm.js";
import "../../_virtual/~icons/lucide/circle-user.esm.js";
import i from "./Avatar.styles.esm.js";
import { consume as a } from "@lit/context";
import { html as o } from "lit";
//#region src/components/avatar/Avatar.ts
var s, c, l, u, d, f, p, m, h, g;
function _(e, t, n) {
	v(e, t), t.set(e, n);
}
function v(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function y(e, t, n) {
	return e.set(x(e, t), n), n;
}
function b(e, t) {
	return e.get(x(e, t));
}
function x(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function S(e, t, n) {
	return (t = w(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function C(e, t, n, r, i, a) {
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
				get: E(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || E(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
		}
		for (var C = e, w = _.length - 1; w >= 0; w -= n ? 2 : 1) {
			var T = _[w], D = n ? _[w - 1] : void 0, O = {}, k = {
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
				if (y) (g = c(T.call(D, C, k), "class decorators", "return")) && (C = g);
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
					if (A && (M.get = A), j && (M.set = j), C = T.call(D, p ? {
						get: b.get,
						set: b.set
					} : b[S], k), p) {
						if (typeof C == "object" && C) (g = c(C.get, "accessor.get")) && (b.get = g), (g = c(C.set, "accessor.set")) && (b.set = g), (g = c(C.init, "accessor.init")) && x.push(g);
						else if (C !== void 0) throw TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
					} else c(C, (f ? "field" : "method") + " decorators", "return") && (f ? x.push(C) : b[S] = C);
				}
			} finally {
				O.v = !0;
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
			return D(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : w(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function w(e) {
	var t = T(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function T(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function E(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function D(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function O(e) {
	return e;
}
f = [n("solid-ui-avatar")];
var k;
new (h = (l = /*#__PURE__*/ new WeakMap(), g = (p = a({
	context: t,
	subscribe: !0
}), "auth"), c = class extends r {
	constructor(...t) {
		super(...t), _(this, l, (u(this), m(this, e))), S(this, "unsubscribeSessionUpdated", void 0);
	}
	get [g]() {
		return b(l, this);
	}
	set auth(e) {
		y(l, this, e);
	}
	connectedCallback() {
		super.connectedCallback(), this.auth.loadProfile?.(), this.unsubscribeSessionUpdated = this.auth.onSessionUpdated(() => {
			this.auth.loadProfile?.(), this.requestUpdate();
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.unsubscribeSessionUpdated?.();
	}
	render() {
		return this.auth.account?.avatarUrl ? o`
        <img src="${this.auth.account?.avatarUrl}" alt="" />
    ` : o`
          <icon-lucide-circle-user></icon-lucide-circle-user>
      `;
	}
}, {e: [m, u], c: [k, d]} = C(c, [[
	p,
	1,
	"auth"
]], f, 0, void 0, r), c), s = class extends O {
	constructor() {
		super(k), S(this, "styles", i), S(this, "states", { fallback: (e) => !e.auth.account?.avatarUrl }), d();
	}
}, S(s, h, void 0), s)();
//#endregion
export { k as default };

//# sourceMappingURL=Avatar.esm.js.map