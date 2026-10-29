import "../../lib/components/index.esm.js";
import { customElement as e } from "../../lib/components/decorators.esm.js";
import t from "../../lib/components/web-component/WebComponent.esm.js";
import { error as n } from "../../lib/debug.esm.js";
import "../../_virtual/~icons/lucide/link.esm.js";
import "../../_virtual/~icons/lucide/globe.esm.js";
import "../button/index.esm.js";
import "../combobox/index.esm.js";
import "../combobox-option/index.esm.js";
import r from "./AccessControlGeneralAccess.styles.esm.js";
import { ACCESS_ROLES as i, PUBLIC_ACCESS_ROLES as a } from "solid-logic";
import { html as o } from "lit";
import { property as s } from "lit/decorators.js";
// src/components/access-control-modal/AccessControlGeneralAccess.ts
var c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E;
function D(e, t, n) {
	O(e, t), t.set(e, n);
}
function O(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function k(e, t, n) {
	return e.set(j(e, t), n), n;
}
function A(e, t) {
	return e.get(j(e, t));
}
function j(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function M(e, t, n) {
	return (t = P(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function N(e, t, n, r, i, a) {
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
				get: I(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || I(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return L(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : P(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function P(e) {
	var t = F(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function F(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function I(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function L(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function R(e) {
	return e;
}
g = [e("solid-ui-access-control-general-access")];
var z;
new (T = (u = /*#__PURE__*/ new WeakMap(), d = /*#__PURE__*/ new WeakMap(), f = /*#__PURE__*/ new WeakMap(), p = /*#__PURE__*/ new WeakMap(), E = (_ = s({ attribute: !1 }), y = s({ attribute: !1 }), x = s({ attribute: !1 }), C = s({ type: Boolean }), "subjectUri"), l = class extends t {
	constructor(...e) {
		super(...e), D(this, u, (m(this), v(this, void 0))), D(this, d, b(this, "No Access")), D(this, f, S(this, "No Access")), D(this, p, w(this, !1));
	}
	get [E]() {
		return A(u, this);
	}
	set subjectUri(e) {
		k(u, this, e);
	}
	get authenticatedAccessRoleValue() {
		return A(d, this);
	}
	set authenticatedAccessRoleValue(e) {
		k(d, this, e);
	}
	get publicAccessRoleValue() {
		return A(f, this);
	}
	set publicAccessRoleValue(e) {
		k(f, this, e);
	}
	get disabled() {
		return A(p, this);
	}
	set disabled(e) {
		k(p, this, e);
	}
	onAuthenticatedRoleChange(e) {
		this.dispatchRoleChange("authenticated-role-changed", e, i);
	}
	onPublicRoleChange(e) {
		this.dispatchRoleChange("public-role-changed", e, a);
	}
	dispatchRoleChange(e, t, n) {
		let r = t.detail.option.value;
		if (typeof r != "string" || !n.includes(r)) return;
		let i = { role: r };
		this.dispatchEvent(new CustomEvent(e, {
			detail: i,
			bubbles: !0,
			composed: !0
		}));
	}
	async onCopyLinkClick(e) {
		if (e.preventDefault(), this.subjectUri) try {
			await navigator.clipboard.writeText(this.subjectUri);
		} catch (e) {
			n("Failed to copy resource link", e);
		}
	}
	renderAuthenticatedRoleOptions() {
		return i.map((e) => o`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `);
	}
	renderPublicRoleOptions() {
		return a.map((e) => o`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `);
	}
	renderAuthenticatedModeSelector() {
		return o`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-role-select--general access-grants-role access-grants-role--editable access-role-select--authenticated"
        .disabled=${this.disabled}
        .value=${this.authenticatedAccessRoleValue}
        @change=${this.onAuthenticatedRoleChange}
      >
        ${this.renderAuthenticatedRoleOptions()}
      </solid-ui-combobox>
    `;
	}
	renderPublicModeSelector() {
		return o`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-role-select--general access-grants-role access-grants-role--editable access-role-select--public"
        .disabled=${this.disabled}
        .value=${this.publicAccessRoleValue}
        @change=${this.onPublicRoleChange}
      >
        ${this.renderPublicRoleOptions()}
      </solid-ui-combobox>
    `;
	}
	renderGeneralAccessIcon() {
		return o`
      <div class="access-grants-general-share-icon">
        <div class="access-grants-general-share-icon-inner">
          <icon-lucide-globe class="access-grants-general-share-icon-image"></icon-lucide-globe>
        </div>
      </div>
    `;
	}
	renderGeneralShareRow(e) {
		return o`
      <div class="access-grants-general-share">
        <div class="access-grants-general-share-content">
          ${this.renderGeneralAccessIcon()}
          <div class="access-grants-general-share-text">
            <p class="access-grants-general-share-text-title">${e.title}</p>
            <p class="access-grants-general-share-text-description">${e.description}</p>
          </div>
        </div>
        ${e.variant === "authenticated" ? this.renderAuthenticatedModeSelector() : this.renderPublicModeSelector()}
      </div>
    `;
	}
	render() {
		return o`
      <section class="access-grants-general" aria-labelledby="general-access-heading">
        <div class="access-grants-general-header">
          <h2 id="general-access-heading">General Access</h2>
          <solid-ui-button
            class="access-grants-copy-link-button"
            variant="tertiary"
            @click=${this.onCopyLinkClick}
          >
            <icon-lucide-link slot="left-icon"></icon-lucide-link>
            <span class="access-grants-copy-link-button-label">Copy Link</span>
          </solid-ui-button>
        </div>
        ${this.renderGeneralShareRow({
			title: "Only logged in users with the link",
			description: "Users must sign in to SolidOS to access this shared item using the link.",
			variant: "authenticated"
		})}
        ${this.renderGeneralShareRow({
			title: "Anyone with the Link",
			description: "Anyone on the internet with the link can view.",
			variant: "public"
		})}
      </section>
    `;
	}
}, {e: [v, b, S, w, m], c: [z, h]} = N(l, [
	[
		_,
		1,
		"subjectUri"
	],
	[
		y,
		1,
		"authenticatedAccessRoleValue"
	],
	[
		x,
		1,
		"publicAccessRoleValue"
	],
	[
		C,
		1,
		"disabled"
	]
], g, 0, void 0, t), l), c = class extends R {
	constructor() {
		super(z), M(this, "styles", r), h();
	}
}, M(c, T, void 0), c)();
export { z as default };

//# sourceMappingURL=AccessControlGeneralAccess.esm.js.map