import { h as e, i as t, m as n, n as r, r as i } from "./index.esm-AZPmKqjU.js";
import { b as a, c as o, g as s, i as c, o as l, p as u, r as d, u as f, x as p } from "./components-BHoVP7zE.js";
import { t as m } from "./query-BYu9q8lA.js";
import { t as h } from "./dialogs-D2n-R0lI.js";
import "./chevron-down-ujxRg3MD.js";
import "./dialog-D9Ellvjx.js";
import "./button-CnmrOsEf.js";
import "./dialog-content-B2FmmQvH.js";
import "./dialog-footer-CxjoqQJF.js";
import "./combobox-BZ9n8wQw.js";
import "./combobox-option-BcXpUnWu.js";
//#region node_modules/solid-logic/dist/issuer/issuerLogic.esm.js
var g = [
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
function _() {
	let e = [...g], { host: t, origin: n } = new URL(location.href);
	return e.map(({ uri: e }) => new URL(e).host).includes(t) || e.unshift({
		name: t,
		uri: n
	}), e;
}
//#endregion
//#region src/lib/auth/Account.ts
var v = class {
	webId;
	avatarUrl;
	constructor(e, t) {
		this.webId = e, this.avatarUrl = t;
	}
}, y = class {
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
}, b = new y(), x = p(Symbol("auth")), S = u`.error-message{color:var(--solid-ui-color-error);font-size:var(--solid-ui-font-size-sm);text-align:center;width:100%;font-weight:500}solid-ui-combobox{width:100%}solid-ui-button{flex:1}`, C, w, T, E, D, O, k, A, j, ee, M, N, P, F, I, L, R, z, B, V, H, U, W, G, K;
function q(e, t, n) {
	te(e, t), t.set(e, n);
}
function te(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function J(e, t, n) {
	return e.set(X(e, t), n), n;
}
function Y(e, t) {
	return e.get(X(e, t));
}
function X(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function Z(e, t, n) {
	return (t = Q(t)) in e ? Object.defineProperty(e, t, {
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
				get: ie(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || ie(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return ae(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : Q(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function Q(e) {
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
function ie(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function ae(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function oe(e) {
	return e;
}
M = [s("solid-ui-login-modal")];
var $;
new (G = (T = /*#__PURE__*/ new WeakMap(), E = /*#__PURE__*/ new WeakMap(), D = /*#__PURE__*/ new WeakMap(), O = /*#__PURE__*/ new WeakMap(), k = /*#__PURE__*/ new WeakMap(), A = /*#__PURE__*/ new WeakMap(), K = (N = c({
	type: String,
	reflect: !0
}), F = d(), L = d(), z = d(), V = a({
	context: x,
	subscribe: !0
}), U = m("solid-ui-dialog"), "issuerUrl"), w = class extends l {
	constructor(...e) {
		super(...e), q(this, T, (j(this), P(this, ""))), q(this, E, I(this, "")), q(this, D, R(this, !1)), q(this, O, B(this, !1)), q(this, k, H(this, b)), q(this, A, W(this, null));
	}
	get [K]() {
		return Y(T, this);
	}
	set issuerUrl(e) {
		J(T, this, e);
	}
	get issuerInputValue() {
		return Y(E, this);
	}
	set issuerInputValue(e) {
		J(E, this, e);
	}
	get failed() {
		return Y(D, this);
	}
	set failed(e) {
		J(D, this, e);
	}
	get submitting() {
		return Y(O, this);
	}
	set submitting(e) {
		J(O, this, e);
	}
	get auth() {
		return Y(k, this);
	}
	set auth(e) {
		J(k, this, e);
	}
	get dialog() {
		return Y(A, this);
	}
	set dialog(e) {
		J(A, this, e);
	}
	connectedCallback() {
		super.connectedCallback(), this.issuerInputValue = typeof localStorage < "u" && localStorage.getItem("loginIssuer") || this.issuerUrl || _()[0]?.uri || "";
	}
	render() {
		let e = _();
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
}, {e: [P, I, R, B, H, W, j], c: [$, ee]} = ne(w, [
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
		L,
		1,
		"failed"
	],
	[
		z,
		1,
		"submitting"
	],
	[
		V,
		1,
		"auth"
	],
	[
		U,
		1,
		"dialog"
	]
], M, 0, void 0, l), w), C = class extends oe {
	constructor() {
		super($), Z(this, "styles", S), ee();
	}
}, Z(C, G, void 0), C)();
//#endregion
//#region src/components/login-modal/index.ts
var se = $, ce = "https://solidproject.org/get_a_pod";
function le(n) {
	let r = t.store, i = r.sym(n), a = r.any(i, e.sioc("avatar")) || r.any(i, e.foaf("img")) || r.any(i, e.vcard("logo")) || r.any(i, e.vcard("hasPhoto")) || r.any(i, e.vcard("photo")) || r.any(i, e.foaf("depiction"));
	return a ? a.value : void 0;
}
var ue = class {
	_initialized = !1;
	profileLoaded = !1;
	listeners = [];
	constructor(e = ce) {
		this.signupUrl = e;
	}
	async initialize() {
		r.events.on("sessionRestore", () => {
			t.store.updater.flagAuthorizationMetadata();
		}), n(r.events, () => {
			r.info?.isLoggedIn && window.location.reload();
		}), await i.checkUser(), this._initialized = !0, this.listeners.forEach((e) => e());
	}
	async loadProfile() {
		!this.profileLoaded && this.account && (this.profileLoaded = !0, await t.profile.loadMe(), this.listeners.forEach((e) => e()));
	}
	get initialized() {
		return this._initialized;
	}
	get account() {
		let e = r.webId ?? r.info?.webId;
		return !(r.isActive ?? r.info?.isLoggedIn ?? !!e) || !e ? null : new v(e, le(e));
	}
	async login(e) {
		if (!e) {
			h(se);
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
export { b as a, v as c, $ as i, _ as l, ue as n, x as o, se as r, y as s, ce as t };

//# sourceMappingURL=auth-DfCfMOuM.js.map