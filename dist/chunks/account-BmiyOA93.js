import { a as e, o as t } from "./auth-DCNP14Le.js";
import { b as n, c as r, g as i, i as a, o, p as s, u as c } from "./components-BHoVP7zE.js";
import "./chevron-down-ujxRg3MD.js";
import "./button-CnmrOsEf.js";
import "./avatar-Cdvs2NRL.js";
import "./login-button-CpRHRrk6.js";
import "./logout-button-BEMe5xJN.js";
import "./menu-item-BdCkmJol.js";
import "./menu-BiqIAf-j.js";
import "./signup-button-Dufhi_Hi.js";
//#region ~icons/lucide/log-in
var l = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m10 17l5-5l-5-5m5 5H3m12-9h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4\"/></svg>";
	}
};
customElements.get("icon-lucide-log-in") || customElements.define("icon-lucide-log-in", l);
//#endregion
//#region ~icons/lucide/log-out
var u = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/></svg>";
	}
};
customElements.get("icon-lucide-log-out") || customElements.define("icon-lucide-log-out", u);
//#endregion
//#region ~icons/lucide/user
var d = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/></g></svg>";
	}
};
customElements.get("icon-lucide-user") || customElements.define("icon-lucide-user", d);
//#endregion
//#region src/components/account/Account.styles.css
var f = s`:host{--image-size:1.875rem;flex-direction:row;gap:10px;display:inline-flex}:host([data-state-initializing]){& icon-svg-spinners-180-ring{width:var(--image-size);height:var(--image-size)}}:host([data-state-loggedIn]){--padding:4px;--border-width:1px;& button{background-color:var(--solid-ui-color-body-grey);padding:var(--padding);border-radius:calc((var(--image-size) + 2 * var(--padding) + 2 * var(--border-width)) / 2);color:var(--solid-ui-color-white);justify-content:center;align-items:center;gap:5px;display:inline-flex;& solid-ui-avatar{width:var(--image-size);height:var(--image-size);border:var(--border-width) solid var(--solid-ui-color-white);border-radius:50%}& icon-lucide-chevron-down{width:16px;height:16px}}}`, p, m, h, g, _, v, y, b, x, S, C, w, T;
function E(e, t, n) {
	D(e, t), t.set(e, n);
}
function D(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function O(e, t, n) {
	return e.set(A(e, t), n), n;
}
function k(e, t) {
	return e.get(A(e, t));
}
function A(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function j(e, t, n) {
	return (t = N(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function M(e, t, n, r, i, a) {
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
				get: F(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || F(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return I(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : N(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function N(e) {
	var t = P(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function P(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function F(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function I(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function L(e) {
	return e;
}
y = [i("solid-ui-account")];
var R;
new (w = (h = /*#__PURE__*/ new WeakMap(), g = /*#__PURE__*/ new WeakMap(), T = (b = a({ type: Array }), S = n({
	context: t,
	subscribe: !0
}), "menuItems"), m = class extends o {
	constructor(...t) {
		super(...t), E(this, h, (_(this), x(this, []))), E(this, g, C(this, e)), j(this, "unsubscribeSessionUpdated", void 0);
	}
	get [T]() {
		return k(h, this);
	}
	set menuItems(e) {
		O(h, this, e);
	}
	get auth() {
		return k(g, this);
	}
	set auth(e) {
		O(g, this, e);
	}
	connectedCallback() {
		super.connectedCallback(), this.unsubscribeSessionUpdated = this.auth.onSessionUpdated(() => this.requestUpdate());
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.unsubscribeSessionUpdated?.();
	}
	render() {
		return this.auth.initialized ? this.auth.account ? c`
        <solid-ui-menu placement="bottom-end">
            <button type="button" slot="trigger">
                <solid-ui-avatar></solid-ui-avatar>
                <icon-lucide-chevron-down slot="right-icon"></icon-lucide-chevron-down>
            </button>

            ${this.menuItems.map((e) => c`
                <solid-ui-menu-item .href=${e.href ?? r} ?selected=${e.selected} @solid-ui-select=${() => e.onSelected?.()}>
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
    ` : c`
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
      ` : c`
        <icon-svg-spinners-180-ring></icon-svg-spinners-180-ring>
      `;
	}
}, {e: [x, C, _], c: [R, v]} = M(m, [[
	b,
	1,
	"menuItems"
], [
	S,
	1,
	"auth"
]], y, 0, void 0, o), m), p = class extends L {
	constructor() {
		super(R), j(this, "styles", f), j(this, "states", {
			initializing: (e) => !e.auth.initialized,
			loggedIn: (e) => !!e.auth.account
		}), v();
	}
}, j(p, w, void 0), p)();
//#endregion
//#region src/components/account/index.ts
var z = R;
//#endregion
export { R as n, z as t };

//# sourceMappingURL=account-BmiyOA93.js.map