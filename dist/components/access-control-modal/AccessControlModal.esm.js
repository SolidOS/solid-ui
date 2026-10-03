import { label as e } from "../../utils/label.esm.js";
import { findImage as t } from "../../widgets/buttons.esm.js";
import "../../widgets/index.esm.js";
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
import "../../_virtual/~icons/lucide/link.esm.js";
import "../../_virtual/~icons/lucide/search.esm.js";
import "../../_virtual/~icons/lucide/globe.esm.js";
import "../input/index.esm.js";
import i from "./AccessControlModal.styles.esm.js";
import { sym as a } from "rdflib";
import { solidLogicSingleton as o } from "solid-logic";
import { html as s, nothing as c } from "lit";
import { property as l, query as u, state as d } from "lit/decorators.js";
//#region src/components/access-control-modal/AccessControlModal.ts
var f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N, P, F, ee, I, L, R, z, B, V, H, U, W;
function G(e, t, n) {
	te(e, t), t.set(e, n);
}
function te(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function K(e, t, n) {
	return e.set(J(e, t), n), n;
}
function q(e, t) {
	return e.get(J(e, t));
}
function J(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function Y(e, t, n) {
	return (t = X(t)) in e ? Object.defineProperty(e, t, {
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
				get: Z(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Z(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : X(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function X(e) {
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
function Z(e, t, n) {
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
var Q = [
	{
		modes: ["Control"],
		label: "Owner"
	},
	{
		modes: ["Write"],
		label: "Editor"
	},
	{
		modes: ["Append", "Read"],
		label: "Poster"
	},
	{
		modes: ["Append"],
		label: "Submitter"
	},
	{
		modes: ["Read"],
		label: "Viewer"
	}
];
T = [n("solid-ui-access-control-modal")];
var $;
new (U = (m = /*#__PURE__*/ new WeakMap(), h = /*#__PURE__*/ new WeakMap(), g = /*#__PURE__*/ new WeakMap(), _ = /*#__PURE__*/ new WeakMap(), v = /*#__PURE__*/ new WeakMap(), y = /*#__PURE__*/ new WeakMap(), b = /*#__PURE__*/ new WeakMap(), x = /*#__PURE__*/ new WeakMap(), S = /*#__PURE__*/ new WeakMap(), W = (E = l({ attribute: !1 }), O = l({ attribute: !1 }), A = d(), M = d(), P = d(), ee = d(), L = d(), z = d(), V = u("solid-ui-dialog"), "subjectUri"), p = class extends r {
	constructor(...e) {
		super(...e), G(this, m, (C(this), D(this, void 0))), G(this, h, k(this, void 0)), G(this, g, j(this, "")), G(this, _, N(this, "Viewer")), G(this, v, F(this, "")), G(this, y, I(this, !1)), G(this, b, R(this, !1)), G(this, x, B(this, [])), G(this, S, H(this, null));
	}
	get [W]() {
		return q(m, this);
	}
	set subjectUri(e) {
		K(m, this, e);
	}
	get accessGrants() {
		return q(h, this);
	}
	set accessGrants(e) {
		K(h, this, e);
	}
	get principleInputValue() {
		return q(g, this);
	}
	set principleInputValue(e) {
		K(g, this, e);
	}
	get roleValue() {
		return q(_, this);
	}
	set roleValue(e) {
		K(_, this, e);
	}
	get searchValue() {
		return q(v, this);
	}
	set searchValue(e) {
		K(v, this, e);
	}
	get failed() {
		return q(y, this);
	}
	set failed(e) {
		K(y, this, e);
	}
	get submitting() {
		return q(b, this);
	}
	set submitting(e) {
		K(b, this, e);
	}
	get accessGrantRoles() {
		return q(x, this);
	}
	set accessGrantRoles(e) {
		K(x, this, e);
	}
	get dialog() {
		return q(S, this);
	}
	set dialog(e) {
		K(S, this, e);
	}
	connectedCallback() {
		super.connectedCallback();
	}
	willUpdate(e) {
		super.willUpdate(e), e.has("accessGrants") && (this.accessGrantRoles = this.accessGrants?.map((e) => this.getAuthorizationRole(e)) ?? []);
	}
	renderAccessGrants() {
		return s`
      <ul>
        ${!this.accessGrants || this.accessGrants.length === 0 ? s`<li>No access grants</li>` : c}
        ${this.accessGrants?.map((e, t) => this.renderAccessGrant(e, t))}
      </ul>
    `;
	}
	renderAccessGrant(e, t) {
		let n = this.getAuthorizationBadge(e), r = this.accessGrantRoles[t] ?? this.getAuthorizationRole(e);
		return s`
      <li>
        ${this.renderAuthorizationBadge(n)}
        <h3>${this.renderAuthorizationSubjects(e)}</h3>
        ${this.renderAuthorizationRole(r, t)}  
      </li>
    `;
	}
	getAuthorizationBadge(e) {
		let n = e.agent[0];
		if (n) {
			let r = t(a(n));
			return {
				kind: "agent",
				image: r,
				text: r ? "" : this.getInitials(this.renderAuthorizationSubjects(e), 2)
			};
		}
		if (e.agentGroup[0]) return {
			kind: "group",
			text: this.getInitials(this.renderAuthorizationSubjects(e), 1)
		};
		let r = e.agentClass[0];
		if (r) {
			let n = t(a(r));
			return {
				kind: "agentClass",
				image: n,
				text: n ? "" : this.getInitials(this.renderAuthorizationSubjects(e), 2)
			};
		}
		return e.origin[0] ? {
			kind: "origin",
			text: "O"
		} : {
			kind: "unknown",
			text: "?"
		};
	}
	renderAuthorizationBadge(e) {
		return s`
      <div class="access-grants-image access-grants-image--${e.kind}">
        ${e.image ? s`<img src=${e.image} alt="" aria-hidden="true" />` : s`<span aria-hidden="true">${e.text}</span>`}
      </div>
    `;
	}
	getInitials(e, t = 2) {
		return (e.split(/\s+/).filter(Boolean).slice(0, t).map((e) => e[0]).join("") || e.slice(0, t)).toUpperCase();
	}
	renderAuthorizationSubjects(t) {
		let n = [
			...t.agent,
			...t.agentGroup,
			...t.agentClass,
			...t.origin
		];
		return n.length ? n.map((t) => e(a(t))).join(", ") : "Unknown access holder";
	}
	getAuthorizationRole(e) {
		let t = new Set(e.mode);
		return Q.find((e) => e.modes.every((e) => t.has(e)))?.label ?? "Viewer";
	}
	renderAuthorizationRole(e, t) {
		return e === "Owner" ? s`<span class="access-grants-role access-grants-role--owner">${e}</span>` : s`
      <solid-ui-combobox
        class="access-grants-role access-grants-role--editable"
        .value=${e}
        @input=${(e) => this.onAccessGrantRoleInput(t, e)}
      >
        <solid-ui-combobox-option value="Editor">Editor</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Viewer">Viewer</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Poster">Poster</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Submitter">Submitter</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Remove">Remove</solid-ui-combobox-option>
      </solid-ui-combobox>
    `;
	}
	renderModeSelector() {
		return s`
      <solid-ui-combobox
        class="access-role-select"
        .value=${this.roleValue}
        @input=${this.onRoleInput}
      >
        <solid-ui-combobox-option value="Owner">Owner</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Editor">Editor</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Viewer">Viewer</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Poster">Poster</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Submitter">Submitter</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Remove">Remove</solid-ui-combobox-option>
      </solid-ui-combobox>
    `;
	}
	renderAddAccessForm() {
		return s`
      <div class="access-grants-form">
        <solid-ui-input
          label="Add person, group or software agent URL."
          .value=${this.principleInputValue}
          placeholder="Paste a link or enter names (use commas to add multiple)"
          @input=${this.onPrincipleInput}
        ></solid-ui-input>
        ${this.renderModeSelector()}
      </div>
    `;
	}
	renderAccessGrantsSection() {
		return s`
      <div class="access-grants-header">
        <h2>Share with</h2>
        <solid-ui-input
          id="access-grants-search"
          class="access-grants-search-input"
          label="Search access grants"
          .hideLabel=${!0}
          .value=${this.searchValue}
          placeholder="Search"
          @input=${this.onSearchInput}
        >
          <icon-lucide-search slot="left-icon"></icon-lucide-search>
        </solid-ui-input>
      </div>
      <div class="access-grants-list">
        ${this.renderAccessGrants()}
      </div>
    `;
	}
	renderGeneralAccessSection() {
		return s`
      <div class="access-grants-general">
        <div class="access-grants-general-header">
          <h2>General Access</h2>
          <solid-ui-button
            class="access-grants-copy-link-button"
            variant="tertiary"
            @click=${this.onCopyLinkClick}
          >
            <icon-lucide-link slot="left-icon"></icon-lucide-link>
            Copy Link
          </solid-ui-button>
        </div>
        <div class="access-grants-general-share">
          <div class="access-grants-general-share-content">
            ${this.renderGeneralAccessIcon()}
            <div class="access-grants-general-share-text">
              <p class="access-grants-general-share-text-title">Share with Anyone Signed In</p>
              <p class="access-grants-general-share-text-description">Users must sign in to SolidOS to access this shared item using the link.</p>
            </div>
          </div>
          ${this.renderModeSelector()}
        </div>
      </div>
    `;
	}
	renderGeneralAccessIcon() {
		return s`
      <div class="access-grants-general-share-icon">
        <div class="access-grants-general-share-icon-inner">
          <icon-lucide-globe class="access-grants-general-share-icon-image"></icon-lucide-globe>
        </div>
      </div>
    `;
	}
	getRoleModes(e) {
		return [...Q.find((t) => t.label === e)?.modes ?? []];
	}
	parsePrincipleInput() {
		let e = this.principleInputValue.trim();
		if (!e) return;
		let t = e.split(",").map((e) => e.trim()).filter((e) => e);
		if (t.length) return t.map((e) => ({
			subjectType: o.resource.isWebId(e) ? "agent" : "agentGroup",
			subjectValue: e,
			role: this.roleValue
		}));
	}
	getDialogTitle() {
		let t = this.subjectUri ? a(this.subjectUri) : void 0;
		return `Share ${(t ? e(t) : "") || "this resource"}`;
	}
	render() {
		let e = this.getDialogTitle();
		return s`
        <solid-ui-dialog title=${e}>
            <form @submit=${this.onSubmit}>
              <solid-ui-dialog-content>
                ${this.renderAddAccessForm()}
                ${this.renderAccessGrantsSection()}
                ${this.renderGeneralAccessSection()}
              </solid-ui-dialog-content>

              <solid-ui-dialog-footer>
                <div class="access-control-footer-actions">
                  <solid-ui-button
                    variant="secondary"
                    @click="${() => this.dialog?.close()}"
                  >
                    Cancel
                  </solid-ui-button>
                  <solid-ui-button
                    ?disabled=${!this.principleInputValue || this.submitting}
                    ?loading=${this.submitting}
                    type="submit"
                  >
                    Save Changes
                  </solid-ui-button>
                </div>
              </solid-ui-dialog-footer>
            </form>
        </solid-ui-dialog>
    `;
	}
	async onSubmit(e) {
		e.preventDefault(), this.failed = !1;
		let t = this.parsePrincipleInput();
		if (t?.length) {
			if (!this.subjectUri) {
				this.failed = !0;
				return;
			}
			this.submitting = !0;
			try {
				for (let e of t) {
					let t = {
						type: e.subjectType,
						iri: e.subjectValue
					}, n = this.roleValue === "Remove" ? await o.acl.planRevoke(this.subjectUri, t) : await o.acl.planGrant(this.subjectUri, t, this.getRoleModes(e.role));
					await o.acl.applyPlan(n);
				}
				this.principleInputValue = "", this.dialog?.close();
			} catch (e) {
				this.failed = !0, console.error("Failed to save access changes", e);
			} finally {
				this.submitting = !1;
			}
		}
	}
	onPrincipleInput(e) {
		let t = e.currentTarget;
		this.principleInputValue = t?.value ?? "";
	}
	onSearchInput(e) {
		let t = e.currentTarget;
		this.searchValue = t?.value ?? "";
	}
	onRoleInput(e) {
		let t = e.currentTarget;
		this.roleValue = t?.value ?? "Viewer";
	}
	onAccessGrantRoleInput(e, t) {
		let n = t.currentTarget?.value;
		n && (this.accessGrantRoles = this.accessGrantRoles.map((t, r) => r === e ? n : t));
	}
	async onCopyLinkClick(e) {
		if (e.preventDefault(), this.subjectUri) try {
			await navigator.clipboard.writeText(this.subjectUri);
		} catch (e) {
			console.error("Failed to copy resource link", e);
		}
	}
}, {e: [D, k, j, N, F, I, R, B, H, C], c: [$, w]} = ne(p, [
	[
		E,
		1,
		"subjectUri"
	],
	[
		O,
		1,
		"accessGrants"
	],
	[
		A,
		1,
		"principleInputValue"
	],
	[
		M,
		1,
		"roleValue"
	],
	[
		P,
		1,
		"searchValue"
	],
	[
		ee,
		1,
		"failed"
	],
	[
		L,
		1,
		"submitting"
	],
	[
		z,
		1,
		"accessGrantRoles"
	],
	[
		V,
		1,
		"dialog"
	]
], T, 0, void 0, r), p), f = class extends ae {
	constructor() {
		super($), Y(this, "styles", i), w();
	}
}, Y(f, U, void 0), f)();
//#endregion
export { $ as default };

//# sourceMappingURL=AccessControlModal.esm.js.map