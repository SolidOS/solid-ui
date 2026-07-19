import { DEFAULT_AUTH_CONTEXT as e, authContext as t } from "../../lib/auth/context.esm.js";
import { customElement as n } from "../../lib/components/decorators.esm.js";
import r from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../../_virtual/~icons/lucide/chevron-down.esm.js";
import "../button/index.esm.js";
import "../dialog/index.esm.js";
import "../dialog-content/index.esm.js";
import "../dialog-footer/index.esm.js";
import "../combobox/index.esm.js";
import "../combobox-option/index.esm.js";
import i from "./LoginModal.styles.esm.js";
import "../../lib/auth/index.esm.js";
import { getSuggestedIssuers as a } from "solid-logic";
import { consume as o } from "@lit/context";
import { html as s, nothing as c } from "lit";
import { property as l, query as u, state as d } from "lit/decorators.js";
//#region src/components/login-modal/LoginModal.ts
var f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N, P, F, I;
function L(e, t, n) {
	R(e, t), t.set(e, n);
}
function R(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function z(e, t, n) {
	return e.set(V(e, t), n), n;
}
function B(e, t) {
	return e.get(V(e, t));
}
function V(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function H(e, t, n) {
	return (t = W(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function U(e, t, n, r, i, a) {
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
				get: K(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || K(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return q(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : W(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function W(e) {
	var t = G(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function G(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function K(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function q(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function J(e) {
	return e;
}
S = [n("solid-ui-login-modal")];
var Y;
new (F = (m = /*#__PURE__*/ new WeakMap(), h = /*#__PURE__*/ new WeakMap(), g = /*#__PURE__*/ new WeakMap(), _ = /*#__PURE__*/ new WeakMap(), v = /*#__PURE__*/ new WeakMap(), y = /*#__PURE__*/ new WeakMap(), I = (C = l({
	type: String,
	reflect: !0
}), T = d(), D = d(), k = d(), j = o({
	context: t,
	subscribe: !0
}), N = u("solid-ui-dialog"), "issuerUrl"), p = class extends r {
	constructor(...t) {
		super(...t), L(this, m, (b(this), w(this, ""))), L(this, h, E(this, "")), L(this, g, O(this, !1)), L(this, _, A(this, !1)), L(this, v, M(this, e)), L(this, y, P(this, null));
	}
	get [I]() {
		return B(m, this);
	}
	set issuerUrl(e) {
		z(m, this, e);
	}
	get issuerInputValue() {
		return B(h, this);
	}
	set issuerInputValue(e) {
		z(h, this, e);
	}
	get failed() {
		return B(g, this);
	}
	set failed(e) {
		z(g, this, e);
	}
	get submitting() {
		return B(_, this);
	}
	set submitting(e) {
		z(_, this, e);
	}
	get auth() {
		return B(v, this);
	}
	set auth(e) {
		z(v, this, e);
	}
	get dialog() {
		return B(y, this);
	}
	set dialog(e) {
		z(y, this, e);
	}
	connectedCallback() {
		super.connectedCallback(), this.issuerInputValue = typeof localStorage < "u" && localStorage.getItem("loginIssuer") || this.issuerUrl || "";
	}
	render() {
		let e = a();
		return s`
        <solid-ui-dialog title="Select an identity provider">
            <form @submit=${this.onSubmit}>
                <solid-ui-dialog-content>
                    <solid-ui-combobox label="Solid Identity Provider" .value=${this.issuerInputValue} @input=${this.onIssuerInputChange}>
                        ${e.map((e) => s`<solid-ui-combobox-option value="${e.uri}">${e.name}</solid-ui-combobox-option>`)}
                    </solid-ui-combobox>

                    ${this.failed ? s`<p class="error-message">Something went wrong</p>` : c}
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
}, {e: [w, E, O, A, M, P, b], c: [Y, x]} = U(p, [
	[
		C,
		1,
		"issuerUrl"
	],
	[
		T,
		1,
		"issuerInputValue"
	],
	[
		D,
		1,
		"failed"
	],
	[
		k,
		1,
		"submitting"
	],
	[
		j,
		1,
		"auth"
	],
	[
		N,
		1,
		"dialog"
	]
], S, 0, void 0, r), p), f = class extends J {
	constructor() {
		super(Y), H(this, "styles", i), x();
	}
}, H(f, F, void 0), f)();
//#endregion
export { Y as default };

//# sourceMappingURL=LoginModal.esm.js.map