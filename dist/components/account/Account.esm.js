import { DEFAULT_AUTH_CONTEXT as e, authContext as t } from "../../lib/auth/context.esm.js";
import { customElement as n } from "../../lib/components/decorators.esm.js";
import r from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../../_virtual/~icons/lucide/chevron-down.esm.js";
import "../../_virtual/~icons/svg-spinners/180-ring.esm.js";
import "../button/index.esm.js";
import "../../lib/auth/index.esm.js";
import "../avatar/index.esm.js";
import "../login-button/index.esm.js";
import "../logout-button/index.esm.js";
import "../menu-item/index.esm.js";
import "../menu/index.esm.js";
import "../signup-button/index.esm.js";
import "../../_virtual/~icons/lucide/log-in.esm.js";
import "../../_virtual/~icons/lucide/log-out.esm.js";
import "../../_virtual/~icons/lucide/user.esm.js";
import i from "./Account.styles.esm.js";
import { consume as a } from "@lit/context";
import { html as o, nothing as s } from "lit";
import { property as c } from "lit/decorators.js";
//#region src/components/account/Account.ts
var l, u, d, f, p, m, h, g, _, v, y, b, x;
function S(e, t, n) {
	C(e, t), t.set(e, n);
}
function C(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function w(e, t, n) {
	return e.set(E(e, t), n), n;
}
function T(e, t) {
	return e.get(E(e, t));
}
function E(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function D(e, t, n) {
	return (t = k(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function O(e, t, n, r, i, a) {
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
				get: j(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || j(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
					var M = O.access = { has: d ? m.bind() : function(e) {
						return r in e;
					} };
					if (k && (M.get = k), A && (M.set = A), C = T.call(E, p ? {
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
			return M(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : k(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function k(e) {
	var t = A(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function A(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function j(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function M(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function N(e) {
	return e;
}
h = [n("solid-ui-account")];
var P;
new (b = (d = /*#__PURE__*/ new WeakMap(), f = /*#__PURE__*/ new WeakMap(), x = (g = c({ type: Array }), v = a({
	context: t,
	subscribe: !0
}), "menuItems"), u = class extends r {
	constructor(...t) {
		super(...t), S(this, d, (p(this), _(this, []))), S(this, f, y(this, e)), D(this, "unsubscribeSessionUpdated", void 0);
	}
	get [x]() {
		return T(d, this);
	}
	set menuItems(e) {
		w(d, this, e);
	}
	get auth() {
		return T(f, this);
	}
	set auth(e) {
		w(f, this, e);
	}
	connectedCallback() {
		super.connectedCallback(), this.unsubscribeSessionUpdated = this.auth.onSessionUpdated(() => this.requestUpdate());
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.unsubscribeSessionUpdated?.();
	}
	render() {
		return this.auth.initialized ? this.auth.account ? o`
        <solid-ui-menu placement="bottom-end">
            <button type="button" slot="trigger">
                <solid-ui-avatar></solid-ui-avatar>
                <icon-lucide-chevron-down slot="right-icon"></icon-lucide-chevron-down>
            </button>

            ${this.menuItems.map((e) => o`
                <solid-ui-menu-item .href=${e.href ?? s} ?selected=${e.selected} @solid-ui-select=${() => e.onSelected?.()}>
                    ${e.label}
                </solid-ui-menu-item>
            `)}
            <solid-ui-logout-button>
                <solid-ui-menu-item slot="trigger">
                    <icon-lucide-log-out slot="left-icon"></icon-lucide-log-out>
                    Sign out
                </solid-ui-menu-item>
            </solid-ui-logout-button>
        </solid-ui-menu>
    ` : o`
        <solid-ui-login-button>
            <solid-ui-button slot="trigger">
                <icon-lucide-user slot="left-icon"></icon-lucide-user>
                Log In
            </solid-ui-button>
        </solid-ui-login-button>
        <solid-ui-signup-button>
            <solid-ui-button slot="trigger" variant="outline">
                <icon-lucide-log-in slot="left-icon"></icon-lucide-log-in>
                Sign Up
            </solid-ui-button>
        </solid-ui-signup-button>
      ` : o`
        <icon-svg-spinners-180-ring></icon-svg-spinners-180-ring>
      `;
	}
}, {e: [_, y, p], c: [P, m]} = O(u, [[
	g,
	1,
	"menuItems"
], [
	v,
	1,
	"auth"
]], h, 0, void 0, r), u), l = class extends N {
	constructor() {
		super(P), D(this, "styles", i), D(this, "states", {
			initializing: (e) => !e.auth.initialized,
			loggedIn: (e) => !!e.auth.account
		}), m();
	}
}, D(l, b, void 0), l)();
//#endregion
export { P as default };

//# sourceMappingURL=Account.esm.js.map