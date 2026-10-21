import { customElement as e } from "../../lib/components/decorators.esm.js";
import t from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../button/index.esm.js";
import "../combobox/index.esm.js";
import "../combobox-option/index.esm.js";
import "../../_virtual/~icons/lucide/circle-x.esm.js";
import "../../_virtual/~icons/lucide/globe.esm.js";
import "../../_virtual/~icons/lucide/book-user.esm.js";
import "../../_virtual/~icons/lucide/user-round.esm.js";
import "../../_virtual/~icons/lucide/users.esm.js";
import n from "./AccessControlAddAccess.styles.esm.js";
import { ACCESS_ROLES as r } from "solid-logic";
import { html as i, nothing as a } from "lit";
import { property as o } from "lit/decorators.js";
// src/components/access-control-modal/AccessControlAddAccess.ts
var s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j;
function M(e, t, n) {
	N(e, t), t.set(e, n);
}
function N(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function P(e, t, n) {
	return e.set(I(e, t), n), n;
}
function F(e, t) {
	return e.get(I(e, t));
}
function I(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function L(e, t, n) {
	return (t = z(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function R(e, t, n, r, i, a) {
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
				get: V(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || V(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return H(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : z(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function z(e) {
	var t = B(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function B(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function V(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function H(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function U(e) {
	return e;
}
function W(e) {
	return i`
    <span class="access-grants-directory-entry">
      ${G(e)}
      <span>${e.label}</span>
    </span>
  `;
}
function G(e) {
	return e.sources.includes("contacts") || e.sources.includes("groups") ? i`<icon-lucide-book-user style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-book-user>` : e.sources.includes("friends") ? i`<icon-lucide-users style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-users>` : e.sources.includes("catalog") ? i`<icon-lucide-user-round style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-user-round>` : a;
}
_ = [e("solid-ui-access-control-add-access")];
var K;
new (A = (l = /*#__PURE__*/ new WeakMap(), u = /*#__PURE__*/ new WeakMap(), d = /*#__PURE__*/ new WeakMap(), f = /*#__PURE__*/ new WeakMap(), p = /*#__PURE__*/ new WeakMap(), m = /*#__PURE__*/ new WeakMap(), j = (v = o({ attribute: !1 }), b = o({ attribute: !1 }), S = o({ attribute: !1 }), w = o({ attribute: !1 }), E = o({ type: Boolean }), O = o({ attribute: !1 }), "principalInputValue"), c = class extends t {
	constructor(...e) {
		super(...e), M(this, l, (h(this), y(this, ""))), M(this, u, x(this, "Viewer")), M(this, d, C(this, [])), M(this, f, T(this, "")), M(this, p, D(this, !1)), M(this, m, k(this, null));
	}
	get [j]() {
		return F(l, this);
	}
	set principalInputValue(e) {
		P(l, this, e);
	}
	get addAccessRoleValue() {
		return F(u, this);
	}
	set addAccessRoleValue(e) {
		P(u, this, e);
	}
	get pendingAccessGrants() {
		return F(d, this);
	}
	set pendingAccessGrants(e) {
		P(d, this, e);
	}
	get inputError() {
		return F(f, this);
	}
	set inputError(e) {
		P(f, this, e);
	}
	get disabled() {
		return F(p, this);
	}
	set disabled(e) {
		P(p, this, e);
	}
	get asyncOptionsProvider() {
		return F(m, this);
	}
	set asyncOptionsProvider(e) {
		P(m, this, e);
	}
	onPrincipalInput(e) {
		let t = this.getEventValue(e);
		this.dispatchEvent(new CustomEvent("target-input", {
			detail: { value: t },
			bubbles: !0,
			composed: !0
		}));
	}
	onPrincipalSelect(e) {
		let t = e.detail.option;
		typeof t.value == "string" && this.dispatchEvent(new CustomEvent("target-selected", {
			detail: {
				value: t.value,
				label: t.label,
				targetKind: t.targetKind
			},
			bubbles: !0,
			composed: !0
		}));
	}
	onRoleChange(e) {
		let t = e.detail.option.value, n = typeof t == "string" ? r.find((e) => e === t) : void 0;
		n && this.dispatchEvent(new CustomEvent("role-changed", {
			detail: { role: n },
			bubbles: !0,
			composed: !0
		}));
	}
	onPendingGrantRemove(e) {
		this.dispatchEvent(new CustomEvent("pending-grant-removed", {
			detail: { index: e },
			bubbles: !0,
			composed: !0
		}));
	}
	getEventValue(e) {
		let t = e.currentTarget;
		return typeof t?.value == "string" ? t.value : "";
	}
	render() {
		return i`
      <section class="access-grants-form" aria-label="Add access">
        <p>Add person, group or software agent URL.</p>
        <div class="access-grants-form-main">
          <div class="access-grants-input">
            <solid-ui-combobox
              class="access-principal-combobox"
              .disabled=${this.disabled}
              label="Add person, group or software agent URL."
              .srOnlyLabel=${!0}
              .value=${this.principalInputValue}
              placeholder="Paste a link or enter a name"
              .asyncOptionsProvider=${this.asyncOptionsProvider}
              @input=${this.onPrincipalInput}
              @change=${this.onPrincipalSelect}
            ></solid-ui-combobox>
            ${this.inputError ? i`<p class="access-principal-error" role="alert">${this.inputError}</p>` : a}
            ${this.renderPendingAccessGrants()}
          </div>
          <solid-ui-combobox
            class="access-role-select access-role-select--top"
            .disabled=${this.disabled}
            .value=${this.addAccessRoleValue}
            @change=${this.onRoleChange}
          >
            ${r.filter((e) => e !== "No Access").map((e) => i`
                <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
              `)}
          </solid-ui-combobox>
        </div>
      </section>
    `;
	}
	renderPendingAccessGrants() {
		return this.pendingAccessGrants.length ? i`
      <div class="access-grants-pending">
        ${this.pendingAccessGrants.map((e, t) => i`
          <div class="access-grants-pending-item">
            <span class="access-grants-pending-item-label">
              ${e.targetKind === "trustedApp" ? i`<icon-lucide-globe style="width: 13px; height: 13px; vertical-align: -2px;"></icon-lucide-globe>` : a}
              ${e.label}
            </span>
            <solid-ui-button
              type="button"
              variant="ghost"
              class="access-grants-pending-item-remove"
              ?disabled=${this.disabled}
              @click=${() => this.onPendingGrantRemove(t)}
            >
              <span class="sr-only">Remove ${e.label}</span>
              <icon-lucide-circle-x slot="icon"></icon-lucide-circle-x>
            </solid-ui-button>
          </div>
        `)}
      </div>
    ` : a;
	}
}, {e: [y, x, C, T, D, k, h], c: [K, g]} = R(c, [
	[
		v,
		1,
		"principalInputValue"
	],
	[
		b,
		1,
		"addAccessRoleValue"
	],
	[
		S,
		1,
		"pendingAccessGrants"
	],
	[
		w,
		1,
		"inputError"
	],
	[
		E,
		1,
		"disabled"
	],
	[
		O,
		1,
		"asyncOptionsProvider"
	]
], _, 0, void 0, t), c), s = class extends U {
	constructor() {
		super(K), L(this, "styles", n), g();
	}
}, L(s, A, void 0), s)();
export { K as default, W as directoryEntryOptionTemplate };

//# sourceMappingURL=AccessControlAddAccess.esm.js.map