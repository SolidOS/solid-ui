import { i as e, m as t, n, r } from "./index.esm-Bu7WXI60.js";
import { b as i, c as a, g as o, i as s, o as c, p as l, r as u, u as d, x as f } from "./components-BHoVP7zE.js";
import { t as p } from "./query-BYu9q8lA.js";
import { t as m } from "./dialogs-D2n-R0lI.js";
import "./chevron-down-ujxRg3MD.js";
import "./dialog-D9Ellvjx.js";
import "./button-CnmrOsEf.js";
import "./dialog-content-B2FmmQvH.js";
import "./dialog-footer-CxjoqQJF.js";
import "./combobox-D3eGdicW.js";
import "./combobox-option-BcXpUnWu.js";
//#region node_modules/solid-logic/dist/issuer/issuerLogic.esm.js
var h = [
	{
		name: "Solid Community",
		uri: "https://solidcommunity.net"
	},
	{
		name: "Solid Web",
		uri: "https://solidweb.org"
	},
	{
		name: "Solid Web ME",
		uri: "https://solidweb.me"
	},
	{
		name: "Inrupt.com",
		uri: "https://login.inrupt.com"
	}
];
function g() {
	let e = [...h], { host: t, origin: n } = new URL(location.href);
	return e.map(({ uri: e }) => new URL(e).host).includes(t) || e.unshift({
		name: t,
		uri: n
	}), e;
}
//#endregion
//#region src/lib/auth/Account.ts
var _ = class {
	webId;
	avatarUrl;
	constructor(e, t) {
		this.webId = e, this.avatarUrl = t;
	}
}, v = class {
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
}, y = new v(), b = f(Symbol("auth")), x = l`.error-message{color:var(--solid-ui-color-error);font-size:var(--solid-ui-font-size-sm);text-align:center;width:100%;font-weight:500}solid-ui-combobox{width:100%}solid-ui-button{flex:1}`, S, C, w, T, E, D, O, k, A, j, M, N, P, F, ee, I, L, R, z, B, V, H, U, W, G;
function K(e, t, n) {
	te(e, t), t.set(e, n);
}
function te(e, t) {
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
function ne(e, t, n, r, i, a) {
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
			return ie(t) === e;
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
	var t = re(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function re(e, t) {
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
function ie(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function ae(e) {
	return e;
}
M = [o("solid-ui-login-modal")];
var $;
new (W = (w = /*#__PURE__*/ new WeakMap(), T = /*#__PURE__*/ new WeakMap(), E = /*#__PURE__*/ new WeakMap(), D = /*#__PURE__*/ new WeakMap(), O = /*#__PURE__*/ new WeakMap(), k = /*#__PURE__*/ new WeakMap(), G = (N = s({
	type: String,
	reflect: !0
}), F = u(), I = u(), R = u(), B = i({
	context: b,
	subscribe: !0
}), H = p("solid-ui-dialog"), "issuerUrl"), C = class extends c {
	constructor(...e) {
		super(...e), K(this, w, (A(this), P(this, ""))), K(this, T, ee(this, "")), K(this, E, L(this, !1)), K(this, D, z(this, !1)), K(this, O, V(this, y)), K(this, k, U(this, null));
	}
	get [G]() {
		return J(w, this);
	}
	set issuerUrl(e) {
		q(w, this, e);
	}
	get issuerInputValue() {
		return J(T, this);
	}
	set issuerInputValue(e) {
		q(T, this, e);
	}
	get failed() {
		return J(E, this);
	}
	set failed(e) {
		q(E, this, e);
	}
	get submitting() {
		return J(D, this);
	}
	set submitting(e) {
		q(D, this, e);
	}
	get auth() {
		return J(O, this);
	}
	set auth(e) {
		q(O, this, e);
	}
	get dialog() {
		return J(k, this);
	}
	set dialog(e) {
		q(k, this, e);
	}
	connectedCallback() {
		super.connectedCallback(), this.issuerInputValue = typeof localStorage < "u" && localStorage.getItem("loginIssuer") || this.issuerUrl || "";
	}
	render() {
		let e = g();
		return d`
        <solid-ui-dialog title="Select an identity provider">
            <form @submit=${this.onSubmit}>
                <solid-ui-dialog-content>
                    <solid-ui-combobox label="Solid Identity Provider" .value=${this.issuerInputValue} @input=${this.onIssuerInputChange}>
                        ${e.map((e) => d`<solid-ui-combobox-option value="${e.uri}">${e.name}</solid-ui-combobox-option>`)}
                    </solid-ui-combobox>

                    ${this.failed ? d`<p class="error-message">Something went wrong</p>` : a}
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
}, {e: [P, ee, L, z, V, U, A], c: [$, j]} = ne(C, [
	[
		N,
		1,
		"issuerUrl"
	],
	[
		F,
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
], M, 0, void 0, c), C), S = class extends ae {
	constructor() {
		super($), X(this, "styles", x), j();
	}
}, X(S, W, void 0), S)();
//#endregion
//#region src/components/login-modal/index.ts
var oe = $, se = "https://solidproject.org/get_a_pod";
function ce(n) {
	let r = e.store, i = r.sym(n), a = r.any(i, t.sioc("avatar")) || r.any(i, t.foaf("img")) || r.any(i, t.vcard("logo")) || r.any(i, t.vcard("hasPhoto")) || r.any(i, t.vcard("photo")) || r.any(i, t.foaf("depiction"));
	return a ? a.value : void 0;
}
var le = class {
	_initialized = !1;
	profileLoaded = !1;
	listeners = [];
	constructor(e = se) {
		this.signupUrl = e;
	}
	async initialize() {
		await r.checkUser(), this._initialized = !0, this.listeners.forEach((e) => e());
	}
	async loadProfile() {
		this.profileLoaded || !this.account || (this.profileLoaded = !0, await e.profile.loadMe(), this.listeners.forEach((e) => e()));
	}
	get initialized() {
		return this._initialized;
	}
	get account() {
		let e = n.webId ?? n.info?.webId;
		return !(n.isActive ?? n.info?.isLoggedIn ?? !!e) || !e ? null : new _(e, ce(e));
	}
	async login(t) {
		if (!t) {
			m(oe);
			return;
		}
		e.store.updater.flagAuthorizationMetadata();
		let r = new URL(window.location.href).hash;
		r && window.localStorage.setItem("preLoginRedirectHash", r), window.localStorage.setItem("loginIssuer", t);
		let i = new URL(window.location.href);
		i.hash = "", await n.login(t, i.href);
	}
	async signup() {
		window.open(this.signupUrl, "_blank", "noopener,noreferrer");
	}
	async logout() {
		await n.logout();
	}
	onSessionUpdated(e) {
		let t = n, r = () => {
			e();
		};
		return this.listeners.push(r), typeof t.addEventListener == "function" ? t.addEventListener("sessionStateChange", r) : (n.events.on("login", r), n.events.on("logout", r), n.events.on("sessionRestore", r)), () => {
			this.listeners = this.listeners.filter((e) => e !== r), typeof t.removeEventListener == "function" ? t.removeEventListener("sessionStateChange", r) : (n.events.off("login", r), n.events.off("logout", r), n.events.off("sessionRestore", r));
		};
	}
};
//#endregion
export { y as a, _ as c, $ as i, g as l, le as n, b as o, oe as r, v as s, se as t };

//# sourceMappingURL=auth-DdvFEHuV.js.map