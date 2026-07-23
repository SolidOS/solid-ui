import { c as e, f as t, h as n, p as r, u as i } from "./solid-logic.esm-BrMdCG2_.js";
import { b as a, c as o, g as s, i as c, o as l, p as u, r as d, u as f, x as p } from "./components-DrP7BOrs.js";
import { t as m } from "./query-BYu9q8lA.js";
import { t as h } from "./dialogs-CeHuLUo5.js";
import "./chevron-down-ujxRg3MD.js";
import "./dialog-BjOy97fH.js";
import "./button-1tlC3ieB.js";
import "./dialog-content-DcD_s3hK.js";
import "./dialog-footer-CHgSH7G5.js";
import "./combobox-Dx_FqbMc.js";
import "./combobox-option-B-twy1Zn.js";
//#region src/lib/auth/Account.ts
var g = class {
	webId;
	avatarUrl;
	constructor(e, t) {
		this.webId = e, this.avatarUrl = t;
	}
}, _ = class {
	initialized = !1;
	account = null;
	async login() {
		throw Error("Can't use auth, missing context provider");
	}
	async signup() {
		throw Error("Can't use auth, missing context provider");
	}
	async logout() {
		throw Error("Can't use auth, missing context provider");
	}
	onSessionUpdated() {
		return () => void 0;
	}
}, v = new _(), y = p(Symbol("auth")), b = u`.error-message{color:var(--solid-ui-color-error);font-size:var(--solid-ui-font-size-sm);text-align:center;width:100%;font-weight:500}solid-ui-combobox{width:100%}solid-ui-button{flex:1}`, x, S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, L, R, z, B, V, H, U, W, G;
function K(e, t, n) {
	ee(e, t), t.set(e, n);
}
function ee(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function q(e, t, n) {
	return e.set(Y(e, t), n), n;
}
function J(e, t) {
	return e.get(Y(e, t));
}
function Y(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function X(e, t, n) {
	return (t = Z(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function te(e, t, n, r, i, a) {
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
				get: Q(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Q(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return re(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : Z(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function Z(e) {
	var t = ne(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ne(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Q(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function re(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function ie(e) {
	return e;
}
j = [s("solid-ui-login-modal")];
var $;
new (W = (C = /*#__PURE__*/ new WeakMap(), w = /*#__PURE__*/ new WeakMap(), T = /*#__PURE__*/ new WeakMap(), E = /*#__PURE__*/ new WeakMap(), D = /*#__PURE__*/ new WeakMap(), O = /*#__PURE__*/ new WeakMap(), G = (M = c({
	type: String,
	reflect: !0
}), P = d(), I = d(), R = d(), B = a({
	context: y,
	subscribe: !0
}), H = m("solid-ui-dialog"), "issuerUrl"), S = class extends l {
	constructor(...e) {
		super(...e), K(this, C, (k(this), N(this, ""))), K(this, w, F(this, "")), K(this, T, L(this, !1)), K(this, E, z(this, !1)), K(this, D, V(this, v)), K(this, O, U(this, null));
	}
	get [G]() {
		return J(C, this);
	}
	set issuerUrl(e) {
		q(C, this, e);
	}
	get issuerInputValue() {
		return J(w, this);
	}
	set issuerInputValue(e) {
		q(w, this, e);
	}
	get failed() {
		return J(T, this);
	}
	set failed(e) {
		q(T, this, e);
	}
	get submitting() {
		return J(E, this);
	}
	set submitting(e) {
		q(E, this, e);
	}
	get auth() {
		return J(D, this);
	}
	set auth(e) {
		q(D, this, e);
	}
	get dialog() {
		return J(O, this);
	}
	set dialog(e) {
		q(O, this, e);
	}
	connectedCallback() {
		super.connectedCallback(), this.issuerInputValue = typeof localStorage < "u" && localStorage.getItem("loginIssuer") || this.issuerUrl || "";
	}
	render() {
		let e = i();
		return f`
        <solid-ui-dialog title="Select an identity provider">
            <form @submit=${this.onSubmit}>
                <solid-ui-dialog-content>
                    <solid-ui-combobox label="Solid Identity Provider" .value=${this.issuerInputValue} @input=${this.onIssuerInputChange}>
                        ${e.map((e) => f`<solid-ui-combobox-option value="${e.uri}">${e.name}</solid-ui-combobox-option>`)}
                    </solid-ui-combobox>

                    ${this.failed ? f`<p class="error-message">Something went wrong</p>` : o}
                </solid-ui-dialog-content>

                <solid-ui-dialog-footer>
                    <solid-ui-button
                        variant="secondary"
                        @click="${() => this.dialog?.close()}"
                    >
                        Cancel
                    </solid-ui-button>
                    <solid-ui-button
                        ?disabled=${!this.issuerInputValue || this.submitting}
                        ?loading=${this.submitting}
                        type="submit"
                    >
                        Login
                    </solid-ui-button>
                </solid-ui-dialog-footer>
            </form>
        </solid-ui-dialog>
    `;
	}
	onIssuerInputChange(e) {
		this.issuerInputValue = String(e.target.value);
	}
	async onSubmit(e) {
		if (e.preventDefault(), this.failed = !1, this.issuerInputValue) {
			this.submitting = !0;
			try {
				await this.auth.login(this.issuerInputValue);
			} catch (e) {
				console.error(e), this.failed = !0;
			} finally {
				this.submitting = !1;
			}
		}
	}
}, {e: [N, F, L, z, V, U, k], c: [$, A]} = te(S, [
	[
		M,
		1,
		"issuerUrl"
	],
	[
		P,
		1,
		"issuerInputValue"
	],
	[
		I,
		1,
		"failed"
	],
	[
		R,
		1,
		"submitting"
	],
	[
		B,
		1,
		"auth"
	],
	[
		H,
		1,
		"dialog"
	]
], j, 0, void 0, l), S), x = class extends ie {
	constructor() {
		super($), X(this, "styles", b), A();
	}
}, X(x, W, void 0), x)();
//#endregion
//#region src/components/login-modal/index.ts
var ae = $, oe = "https://solidproject.org/get_a_pod";
function se(e) {
	let r = t.store, i = r.sym(e), a = r.any(i, n.sioc("avatar")) || r.any(i, n.foaf("img")) || r.any(i, n.vcard("logo")) || r.any(i, n.vcard("hasPhoto")) || r.any(i, n.vcard("photo")) || r.any(i, n.foaf("depiction"));
	return a ? a.value : void 0;
}
var ce = class {
	_initialized = !1;
	profileLoaded = !1;
	listeners = [];
	constructor(e = oe) {
		this.signupUrl = e;
	}
	async initialize() {
		await e.checkUser(), this._initialized = !0, this.listeners.forEach((e) => e());
	}
	async loadProfile() {
		this.profileLoaded || !this.account || (this.profileLoaded = !0, await t.profile.loadMe(), this.listeners.forEach((e) => e()));
	}
	get initialized() {
		return this._initialized;
	}
	get account() {
		let e = r.webId ?? r.info?.webId;
		return !(r.isActive ?? r.info?.isLoggedIn ?? !!e) || !e ? null : new g(e, se(e));
	}
	async login(e) {
		if (!e) {
			h(ae);
			return;
		}
		t.store.updater.flagAuthorizationMetadata();
		let n = new URL(window.location.href).hash;
		n && window.localStorage.setItem("preLoginRedirectHash", n), window.localStorage.setItem("loginIssuer", e);
		let i = new URL(window.location.href);
		i.hash = "", await r.login(e, i.href);
	}
	async signup() {
		window.open(this.signupUrl, "_blank", "noopener,noreferrer");
	}
	async logout() {
		await r.logout();
	}
	onSessionUpdated(e) {
		let t = r, n = () => {
			e();
		};
		return this.listeners.push(n), typeof t.addEventListener == "function" ? t.addEventListener("sessionStateChange", n) : (r.events.on("login", n), r.events.on("logout", n), r.events.on("sessionRestore", n)), () => {
			this.listeners = this.listeners.filter((e) => e !== n), typeof t.removeEventListener == "function" ? t.removeEventListener("sessionStateChange", n) : (r.events.off("login", n), r.events.off("logout", n), r.events.off("sessionRestore", n));
		};
	}
};
//#endregion
export { v as a, g as c, $ as i, ce as n, y as o, ae as r, _ as s, oe as t };

//# sourceMappingURL=auth-CuOD2rHp.js.map