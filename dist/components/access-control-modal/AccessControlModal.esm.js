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
import { defineAsyncComboboxOptionsProvider as i } from "../combobox/Combobox.esm.js";
import "../combobox/index.esm.js";
import "../combobox-option/index.esm.js";
import "../../_virtual/~icons/lucide/link.esm.js";
import "../../_virtual/~icons/lucide/globe.esm.js";
import "../../_virtual/~icons/lucide/book-user.esm.js";
import "../../_virtual/~icons/lucide/user-round.esm.js";
import "../../_virtual/~icons/lucide/users.esm.js";
import "../../_virtual/~icons/lucide/circle-x.esm.js";
import a from "./AccessControlModal.styles.esm.js";
import { dedupeByKey as o, dedupeComboboxOptions as s, isAbsoluteHttpUri as c, isOriginUrl as l } from "./helpers.esm.js";
import { sym as u } from "rdflib";
import { ACCESS_ROLES as d, Authenticated as f, DEFAULT_DIRECTORY_SOURCES as p, PUBLIC_ACCESS_ROLES as m, Public as h, solidLogicSingleton as g } from "solid-logic";
import { html as _, nothing as v } from "lit";
import { property as y, query as b, state as x } from "lit/decorators.js";
//#region src/components/access-control-modal/AccessControlModal.ts
var S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, ee, te, ne, re, ie, ae, oe, L, R, z, B, V, H, U, W, G, K, q, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye;
function J(e, t, n) {
	be(e, t), t.set(e, n);
}
function be(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function Y(e, t, n) {
	return e.set(xe(e, t), n), n;
}
function X(e, t) {
	return e.get(xe(e, t));
}
function xe(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function Z(e, t, n) {
	return (t = Ce(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Se(e, t, n, r, i, a) {
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
			return Te(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : Ce(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function Ce(e) {
	var t = we(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function we(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
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
function Te(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Ee(e) {
	return e;
}
function De(e) {
	return e != null;
}
ne = [n("solid-ui-access-control-modal")];
var $;
new (ve = (w = /*#__PURE__*/ new WeakMap(), T = /*#__PURE__*/ new WeakMap(), E = /*#__PURE__*/ new WeakMap(), D = /*#__PURE__*/ new WeakMap(), O = /*#__PURE__*/ new WeakMap(), k = /*#__PURE__*/ new WeakMap(), A = /*#__PURE__*/ new WeakMap(), j = /*#__PURE__*/ new WeakMap(), M = /*#__PURE__*/ new WeakMap(), N = /*#__PURE__*/ new WeakMap(), P = /*#__PURE__*/ new WeakMap(), F = /*#__PURE__*/ new WeakMap(), I = /*#__PURE__*/ new WeakMap(), ye = (re = y({ attribute: !1 }), ae = y({ attribute: !1 }), L = x(), z = x(), V = x(), U = x(), G = x(), q = x(), ce = x(), ue = x(), fe = x(), me = x(), ge = b("solid-ui-dialog"), "subjectUri"), C = class extends r {
	constructor(...e) {
		super(...e), J(this, w, (ee(this), ie(this, void 0))), J(this, T, oe(this, void 0)), J(this, E, R(this, "")), J(this, D, B(this, "Viewer")), J(this, O, H(this, "No Access")), J(this, k, W(this, "No Access")), J(this, A, K(this, "")), J(this, j, se(this, !1)), J(this, M, le(this, !1)), J(this, N, de(this, [])), J(this, P, pe(this, [])), J(this, F, he(this, [])), J(this, I, _e(this, null)), Z(this, "accessPrincipleOptionsProvider", i(async (e) => {
			let t = e.trim(), n = await this.getPreferredAccessPrincipleOptions(t);
			if (t.length < 2) return this.getShortQueryOptions(n);
			let r = [];
			try {
				r = await g.directory.search({
					query: t,
					sources: p
				});
			} catch (e) {
				if (!n.length) throw e;
			}
			let i = r.map((e) => this.directoryEntryToOption(e));
			return [...n, ...i];
		}));
	}
	get [ye]() {
		return X(w, this);
	}
	set subjectUri(e) {
		Y(w, this, e);
	}
	get accessGrants() {
		return X(T, this);
	}
	set accessGrants(e) {
		Y(T, this, e);
	}
	get principalInputValue() {
		return X(E, this);
	}
	set principalInputValue(e) {
		Y(E, this, e);
	}
	get addAccessRoleValue() {
		return X(D, this);
	}
	set addAccessRoleValue(e) {
		Y(D, this, e);
	}
	get authenticatedAccessRoleValue() {
		return X(O, this);
	}
	set authenticatedAccessRoleValue(e) {
		Y(O, this, e);
	}
	get publicAccessRoleValue() {
		return X(k, this);
	}
	set publicAccessRoleValue(e) {
		Y(k, this, e);
	}
	get searchValue() {
		return X(A, this);
	}
	set searchValue(e) {
		Y(A, this, e);
	}
	get failed() {
		return X(j, this);
	}
	set failed(e) {
		Y(j, this, e);
	}
	get submitting() {
		return X(M, this);
	}
	set submitting(e) {
		Y(M, this, e);
	}
	get pendingAccessGrants() {
		return X(N, this);
	}
	set pendingAccessGrants(e) {
		Y(N, this, e);
	}
	get accessGrantRoles() {
		return X(P, this);
	}
	set accessGrantRoles(e) {
		Y(P, this, e);
	}
	get accessGrantLabels() {
		return X(F, this);
	}
	set accessGrantLabels(e) {
		Y(F, this, e);
	}
	get dialog() {
		return X(I, this);
	}
	set dialog(e) {
		Y(I, this, e);
	}
	willUpdate(e) {
		super.willUpdate(e), e.has("accessGrants") && (this.accessGrantRoles = this.accessGrants?.map((e) => this.getAuthorizationRole(e)) ?? [], this.authenticatedAccessRoleValue = this.getAuthenticatedAccessRole(), this.publicAccessRoleValue = this.getPublicAccessRole(), this.refreshAccessGrantLabels());
	}
	async refreshAccessGrantLabels() {
		let e = this.accessGrants ?? [];
		if (!e.length) {
			this.accessGrantLabels = [];
			return;
		}
		let t = await Promise.all(e.map(async (e) => {
			let t = e.agentGroup[0];
			if (t) try {
				await g.store.fetcher.load(u(t).doc());
			} catch {}
			return this.getAuthorizationSubjectLabel(this.getSharedAuthorization(e));
		}));
		this.accessGrants === e && (this.accessGrantLabels = t);
	}
	getAccessGrantEntries() {
		return (this.accessGrants ?? []).map((e, t) => {
			e = this.getSharedAuthorization(e);
			let n = this.getAccessGrantSubjectLabel(e, t);
			return {
				authorization: e,
				index: t,
				role: this.accessGrantRoles[t] ?? this.getAuthorizationRole(e),
				subjectLabel: n,
				badge: this.getAuthorizationBadge(e, n)
			};
		}).sort((e, t) => {
			let n = e.role === "Owner", r = t.role === "Owner";
			return n && !r ? -1 : !n && r ? 1 : e.index - t.index;
		});
	}
	getSharedAccessGrantEntries() {
		return this.getAccessGrantEntries().filter(({ authorization: e }) => this.getAuthorizationSubjectIris(e).length > 0);
	}
	renderAccessGrants() {
		let e = this.searchValue.trim().toLowerCase(), t = this.getSharedAccessGrantEntries().filter(({ subjectLabel: t }) => !e || t.toLowerCase().includes(e));
		return _`
      <ul>
        ${t.length > 0 ? t.map((e) => this.renderAccessGrant(e)) : _`<li>No access grants</li>`}
      </ul>
    `;
	}
	renderAccessGrant(e) {
		return _`
      <li>
        ${this.renderAuthorizationBadge(e.badge)}
        <h3>${e.subjectLabel}</h3>
        ${this.renderAuthorizationRole(e.role, e.index)}  
      </li>
    `;
	}
	getAuthorizationBadge(e, n) {
		let r = n ?? this.getAuthorizationSubjectLabel(e), i = e.agent[0];
		if (i) {
			let e = t(u(i));
			return {
				kind: "agent",
				image: e,
				text: e ? "" : this.getInitials(r, 2)
			};
		}
		if (e.agentGroup[0]) return {
			kind: "agentGroup",
			text: this.getInitials(r, 1)
		};
		let a = e.agentClass[0];
		if (a) {
			let e = t(u(a));
			return {
				kind: "agentClass",
				image: e,
				text: e ? "" : this.getInitials(r, 2)
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
		return _`
      <div class="access-grants-image access-grants-image--${e.kind}">
        ${e.image ? _`<img src=${e.image} alt="" aria-hidden="true" />` : _`<span aria-hidden="true">${e.text}</span>`}
      </div>
    `;
	}
	getInitials(e, t = 2) {
		return (e.split(/\s+/).filter(Boolean).slice(0, t).map((e) => e[0]).join("") || e.slice(0, t)).toUpperCase();
	}
	getAuthorizationSubjectIris(e) {
		return [
			...e.agent,
			...e.agentGroup,
			...e.agentClass,
			...e.origin
		];
	}
	getAuthorizationSubjectLabel(t) {
		let n = this.getAuthorizationSubjectIris(t);
		return n.length ? n.map((t) => e(u(t))).join(", ") : "Unknown access holder";
	}
	getAuthorizationRole(e) {
		return g.acl.roleFromModes(e.mode);
	}
	getSharedAuthorization(e) {
		return {
			...e,
			agentClass: e.agentClass.filter((e) => e !== f.iri && e !== h.iri)
		};
	}
	getAuthenticatedAccessRole() {
		let e = (this.accessGrants ?? []).find((e) => e.agentClass.includes(f.iri));
		return e ? this.getAuthorizationRole(e) : "No Access";
	}
	getPublicAccessRole() {
		let e = (this.accessGrants ?? []).find((e) => e.agentClass.includes(h.iri));
		return e ? g.acl.publicRoleFromModes(e.mode) : "No Access";
	}
	getRoleValueFromEvent(e, t = "Viewer") {
		let n = this.getSelectedComboboxOptionValue(e);
		if (typeof n == "string") return n;
		let r = e.currentTarget;
		return typeof r?.value == "string" ? r.value : t;
	}
	renderAuthorizationRole(e, t) {
		return _`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-grants-role access-grants-role--editable ${e === "Owner" ? "access-grants-role--owner" : ""}"
        .value=${e}
        @change=${(e) => this.onAccessGrantRoleInput(t, e)}
      >
        ${this.renderGrantRoleOptions()}
      </solid-ui-combobox>
    `;
	}
	renderModeSelector(e = "add") {
		let t = e === "add" ? "access-role-select access-role-select--top" : e === "authenticated" ? "access-role-select access-role-select--compact access-role-select--general access-grants-role access-grants-role--editable access-role-select--authenticated" : "access-role-select access-role-select--compact access-role-select--general access-grants-role access-grants-role--editable access-role-select--public", n = e === "add" ? this.addAccessRoleValue : e === "authenticated" ? this.authenticatedAccessRoleValue : this.publicAccessRoleValue, r = e === "add" ? this.onAddAccessRoleInput : e === "authenticated" ? this.onAuthenticatedAccessRoleInput : this.onPublicAccessRoleInput;
		return _`
      <solid-ui-combobox
        class=${t}
        .value=${n}
        @change=${r}
      >
        ${e === "add" ? this.renderAddRoleOptions() : e === "authenticated" ? this.renderAuthenticatedRoleOptions() : this.renderPublicRoleOptions()}
      </solid-ui-combobox>
    `;
	}
	renderAddRoleOptions() {
		return d.filter((e) => e !== "No Access").map((e) => _`
        <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
      `);
	}
	renderAuthenticatedRoleOptions() {
		return d.map((e) => _`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `);
	}
	renderPublicRoleOptions() {
		return m.map((e) => _`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `);
	}
	renderGrantRoleOptions() {
		return d.map((e) => _`
      <solid-ui-combobox-option value=${e}>${e === "No Access" ? "Remove" : e}</solid-ui-combobox-option>
    `);
	}
	renderAddAccessForm() {
		return _`
      <div class="access-grants-form">
        <p>Add person, group or software agent URL.</p>
        <div class="access-grants-form-main">
          <div class="access-grants-input">
            <solid-ui-combobox
              class="access-principal-combobox"
              label="Add person, group or software agent URL."
              .srOnlyLabel=${!0}
              .value=${this.principalInputValue}
              placeholder="Paste a link or enter a name"
              .asyncOptionsProvider=${this.accessPrincipleOptionsProvider}
              @input=${this.onPrincipalInput}
              @change=${this.onPrincipalSelect}
            ></solid-ui-combobox>
            ${this.renderPendingAccessGrants()}
          </div>
          ${this.renderModeSelector("add")}
        </div> 
      </div>
    `;
	}
	renderPendingAccessGrants() {
		return this.pendingAccessGrants.length ? _`
      <div class="access-grants-pending">
        ${this.pendingAccessGrants.map((e, t) => _`
          <div class="access-grants-pending-item">
            <span class="access-grants-pending-item-label">${e.label}</span>
            <solid-ui-button
              type="button"
              variant="ghost"
              class="access-grants-pending-item-remove"
              data-pending-grant-index=${t}
              @click=${this.onRemovePendingAccessGrantClick}
            >
              <span class="sr-only">Remove ${e.label}</span>
              <icon-lucide-circle-x slot="icon"></icon-lucide-circle-x>
            </solid-ui-button>
          </div>
        `)}
      </div>
    ` : v;
	}
	renderAccessGrantsSection() {
		return _`
      <div class="access-grants-header">
        <h2>Share with</h2>
        <solid-ui-combobox
          class="access-grants-search-input"
          label="Search access grants"
          .srOnlyLabel=${!0}
          .value=${this.searchValue}
          placeholder="Search"
          @input=${this.onSearchInput}
          @change=${this.onSearchSelect}
        >
          ${this.getSharedAccessGrantEntries().map(({ subjectLabel: e }) => _`
            <solid-ui-combobox-option 
              .value=${e}>
              ${e}
            </solid-ui-combobox-option>
          `)}
        </solid-ui-combobox>
      </div>
      <div class="access-grants-list">
        ${this.renderAccessGrants()}
      </div>
    `;
	}
	renderGeneralAccessSection() {
		return _`
      <div class="access-grants-general">
        <div class="access-grants-general-header">
          <h2>General Access</h2>
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
			title: "Share with Anyone Signed In",
			description: "Users must sign in to SolidOS to access this shared item using the link.",
			variant: "authenticated"
		})}
        ${this.renderGeneralShareRow({
			title: "Anyone with the Link",
			description: "Anyone on the internet with the link can view.",
			variant: "public"
		})}
      </div>
    `;
	}
	renderGeneralShareRow(e) {
		return _`
      <div class="access-grants-general-share">
        <div class="access-grants-general-share-content">
          ${this.renderGeneralAccessIcon()}
          <div class="access-grants-general-share-text">
            <p class="access-grants-general-share-text-title">${e.title}</p>
            <p class="access-grants-general-share-text-description">${e.description}</p>
          </div>
        </div>
        ${this.renderModeSelector(e.variant)}
      </div>
    `;
	}
	renderGeneralAccessIcon() {
		return _`
      <div class="access-grants-general-share-icon">
        <div class="access-grants-general-share-icon-inner">
          <icon-lucide-globe class="access-grants-general-share-icon-image"></icon-lucide-globe>
        </div>
      </div>
    `;
	}
	getRoleModes(e) {
		return g.acl.modesFromRole(e);
	}
	getDialogTitle() {
		let t = this.subjectUri ? u(this.subjectUri) : void 0, n = t ? e(t).trim() : "";
		return !n || n === "this resource" ? "Share this resource" : `Share "${n}"`;
	}
	render() {
		let e = this.getDialogTitle();
		return _`
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
                @click=${this.onCancelClick}
              >
                Cancel
              </solid-ui-button>
              <solid-ui-button
                ?disabled=${!this.hasUnsavedChanges() || this.submitting}
                ?loading=${this.submitting}
                type="button"
                @click=${this.onSaveClick}
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
		e.preventDefault(), !this.submitting && await this.commitPrinciplesFromInputSafely();
	}
	async onSaveClick() {
		this.submitting || (!this.principalInputValue.trim() || await this.commitPrinciplesFromInputSafely()) && await this.saveAccessChanges();
	}
	onCancelClick() {
		this.dialog?.close();
	}
	async saveAccessChanges() {
		if (this.submitting) return;
		let e = this.getChangedAccessGrants(), t = this.getGeneralAccessChanges();
		if (!this.pendingAccessGrants.length && !e.length && !t.length) this.failed = !0;
		else if (!this.subjectUri) this.failed = !0;
		else {
			this.submitting = !0, this.failed = !1;
			try {
				let n = [
					...this.pendingAccessGrants.map((e) => ({
						subject: this.createAccessSubject(e.subjectType, e.subjectValue),
						role: e.role
					})),
					...t,
					...e.flatMap(({ subjects: e, role: t }) => e.map((e) => ({
						subject: e,
						role: t
					})))
				];
				for (let { subject: e, role: t } of n) {
					let n = t === "No Access" ? await g.acl.planRevoke(this.subjectUri, e) : await g.acl.planGrant(this.subjectUri, e, e.type === "agentClass" && e.iri === h.iri ? g.acl.modesFromPublicRole(t) : this.getRoleModes(t));
					await g.acl.applyPlan(n);
				}
				this.principalInputValue = "", this.pendingAccessGrants = [], this.dialog?.close();
			} catch (e) {
				this.failed = !0, console.error("Failed to save access changes", e);
			} finally {
				this.submitting = !1;
			}
		}
	}
	onPrincipalInput(e) {
		this.principalInputValue = this.getEventValue(e);
	}
	onPrincipalSelect(e) {
		let t = this.getSelectedStringComboboxOption(e);
		t && this.queuePendingPrinciples([t.value], this.addAccessRoleValue, t.label);
	}
	onSearchInput(e) {
		this.searchValue = this.getEventValue(e);
	}
	onSearchSelect(e) {
		let t = this.getSelectedComboboxOption(e);
		t && (this.searchValue = t.label);
	}
	getGeneralAccessChanges() {
		if (!this.subjectUri) return [];
		let e = this.getAuthenticatedAccessRole(), t = this.getPublicAccessRole();
		return [this.authenticatedAccessRoleValue === e ? void 0 : {
			subject: f,
			role: this.authenticatedAccessRoleValue
		}, this.publicAccessRoleValue === t ? void 0 : {
			subject: h,
			role: this.publicAccessRoleValue
		}].filter(De);
	}
	onAddAccessRoleInput(e) {
		let t = this.getRoleValueFromEvent(e);
		this.addAccessRoleValue = t, this.pendingAccessGrants = this.pendingAccessGrants.map((e) => ({
			...e,
			role: t
		}));
	}
	onAuthenticatedAccessRoleInput(e) {
		let t = this.getRoleValueFromEvent(e);
		this.authenticatedAccessRoleValue = t;
	}
	onPublicAccessRoleInput(e) {
		let t = this.getRoleValueFromEvent(e, "No Access");
		this.publicAccessRoleValue = t;
	}
	onAccessGrantRoleInput(e, t) {
		let n = this.getRoleValueFromEvent(t);
		this.accessGrantRoles = this.accessGrantRoles.map((t, r) => r === e ? n : t);
	}
	removePendingAccessGrant(e) {
		this.pendingAccessGrants = this.pendingAccessGrants.filter((t, n) => n !== e);
	}
	onRemovePendingAccessGrantClick(e) {
		let t = e.currentTarget?.dataset.pendingGrantIndex;
		t !== void 0 && this.removePendingAccessGrant(Number.parseInt(t, 10));
	}
	hasUnsavedChanges() {
		return !!(this.pendingAccessGrants.length || this.principalInputValue.trim() || this.getChangedAccessGrants().length || this.getGeneralAccessChanges().length);
	}
	getAccessGrantSubjectLabel(e, t) {
		return this.accessGrantLabels[t] ?? this.getAuthorizationSubjectLabel(e);
	}
	getChangedAccessGrants() {
		let e = this.getInitialAccessGrantRoles();
		return (this.accessGrants ?? []).map((t, n) => {
			let r = this.accessGrantRoles[n] ?? this.getAuthorizationRole(t);
			if (r === (e[n] ?? this.getAuthorizationRole(t))) return;
			let i = this.getAuthorizationSubjectEntries(this.getSharedAuthorization(t));
			if (i.length) return {
				authorization: t,
				subjects: i,
				role: r
			};
		}).filter(De);
	}
	getInitialAccessGrantRoles() {
		return this.accessGrants?.map((e) => this.getAuthorizationRole(e)) ?? [];
	}
	getAuthorizationSubjectEntries(e) {
		return [
			{
				type: "agent",
				iris: e.agent
			},
			{
				type: "agentGroup",
				iris: e.agentGroup
			},
			{
				type: "agentClass",
				iris: e.agentClass
			},
			{
				type: "origin",
				iris: e.origin
			}
		].flatMap(({ type: e, iris: t }) => t.map((t) => ({
			type: e,
			iri: t
		})));
	}
	createAccessSubject(e, t) {
		return {
			type: e,
			iri: t
		};
	}
	getEventValue(e, t = "") {
		let n = e.currentTarget;
		return typeof n?.value == "string" ? n.value : t;
	}
	getSelectedComboboxOption(e) {
		return e.detail?.option;
	}
	getSelectedStringComboboxOption(e) {
		let t = this.getSelectedComboboxOption(e);
		return this.isStringComboboxOptionData(t) ? t : void 0;
	}
	getSelectedComboboxOptionValue(e) {
		return this.getSelectedComboboxOption(e)?.value;
	}
	isStringComboboxOptionData(e) {
		return typeof e?.value == "string";
	}
	async commitPrinciplesFromInput() {
		let e = this.principalInputValue.trim();
		return e ? this.queuePendingPrinciples([e], this.addAccessRoleValue, void 0, e) : !1;
	}
	async commitPrinciplesFromInputSafely() {
		try {
			return await this.commitPrinciplesFromInput();
		} catch (e) {
			return this.failed = !0, console.error("Failed to commit pending access grants", e), !1;
		}
	}
	async queuePendingPrinciples(e, t = this.addAccessRoleValue, n, r) {
		let i = r ?? this.principalInputValue.trim(), a = await Promise.all(e.map(async (e) => this.createPendingAccessGrant(e, t, n))), o = a.flatMap((e) => "grant" in e ? [e.grant] : []), s = a.filter((e) => "error" in e).map((e) => `${e.principle} (${e.error})`);
		if (!o.length) return s.length && (this.failed = !0), this.logPendingGrantFailures(s, !1), !1;
		let c = [...this.pendingAccessGrants, ...o];
		return this.pendingAccessGrants = this.dedupePendingAccessGrants(c), s.length && (this.failed = !0), this.logPendingGrantFailures(s, !0), !s.length && this.principalInputValue.trim() === i && (this.principalInputValue = ""), s.length === 0;
	}
	async createPendingAccessGrant(e, t = this.addAccessRoleValue, n) {
		try {
			let r = e.trim(), i = this.normalizeOriginInput(r), a = i ? {
				kind: "origin",
				subjectValue: i
			} : await g.acl.classifyAccessControlSubject(r), o = c(e) ? "agent" : void 0, s = a?.kind ?? o, l = a?.subjectValue ?? r;
			return s ? {
				principle: e,
				grant: {
					subjectType: s,
					subjectValue: l,
					role: t,
					label: n ?? await this.resolvePendingAccessGrantLabel(l, e)
				}
			} : {
				principle: e,
				error: "Could not classify access target"
			};
		} catch (t) {
			return {
				principle: e,
				error: String(t)
			};
		}
	}
	logPendingGrantFailures(e, t) {
		e.length && console.error(t ? "Failed to add some access grants:" : "Failed to add access grants:", e);
	}
	async resolvePendingAccessGrantLabel(t, n = t) {
		try {
			let r = u(t);
			return await g.store.fetcher.load(r.doc()), e(r).trim() || n;
		} catch {
			return e(u(t)) || n;
		}
	}
	dedupePendingAccessGrants(e) {
		return o(e, (e) => `${e.subjectType}:${e.subjectValue}`);
	}
	getShortQueryOptions(e) {
		return e.length ? e : [{
			label: "Type at least 2 characters to search",
			value: "",
			selectable: !1
		}];
	}
	async getPreferredAccessPrincipleOptions(e) {
		let t = this.normalizeOriginInput(e);
		if (t) return [{
			label: `Use origin ${t}`,
			value: t
		}];
		if (!c(e)) return [];
		if (l(e)) return [{
			label: `Use origin ${new URL(e).origin}`,
			value: new URL(e).origin
		}];
		let n = await this.createUrlOption(e);
		return s(n ? [n] : []);
	}
	normalizeOriginInput(e) {
		let t = e.trim();
		if (t && !c(t)) try {
			let e = new URL(`https://${t}`), n = e.protocol === "http:" || e.protocol === "https:", r = e.pathname === "/" && !e.search && !e.hash, i = e.hostname.includes(".") || e.hostname.includes(":");
			return n && r && i && !e.username && !e.password ? e.origin : void 0;
		} catch {
			return;
		}
	}
	async createUrlOption(e) {
		try {
			await g.store.fetcher.load(u(e).doc());
		} catch {
			return;
		}
		let t = await this.resolvePendingAccessGrantLabel(e);
		return {
			label: t === e ? `Use ${e}` : t,
			value: e
		};
	}
	directoryEntryToOption(e) {
		return {
			label: e.label,
			value: e.uri,
			template: this.directoryEntryToOptionTemplate(e)
		};
	}
	directoryEntryToOptionTemplate(e) {
		return _`
      <span class="access-grants-directory-entry">
        <!-- This renders inside the combobox shadow DOM, so the modal stylesheet cannot reach these icons.
             If combobox supports a dedicated option icon hook, we can move this sizing there instead. -->
        ${this.renderDirectoryEntryIcon(e)}
        <span>${e.label}</span>
      </span>
    `;
	}
	renderDirectoryEntryIcon(e) {
		return e.sources.includes("contacts") || e.sources.includes("groups") ? _`<icon-lucide-book-user style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-book-user>` : e.sources.includes("friends") ? _`<icon-lucide-users style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-users>` : e.sources.includes("catalog") ? _`<icon-lucide-user-round style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-user-round>` : v;
	}
	async onCopyLinkClick(e) {
		if (e.preventDefault(), this.subjectUri) try {
			await navigator.clipboard.writeText(this.subjectUri);
		} catch (e) {
			console.error("Failed to copy resource link", e);
		}
	}
}, {e: [ie, oe, R, B, H, W, K, se, le, de, pe, he, _e, ee], c: [$, te]} = Se(C, [
	[
		re,
		1,
		"subjectUri"
	],
	[
		ae,
		1,
		"accessGrants"
	],
	[
		L,
		1,
		"principalInputValue"
	],
	[
		z,
		1,
		"addAccessRoleValue"
	],
	[
		V,
		1,
		"authenticatedAccessRoleValue"
	],
	[
		U,
		1,
		"publicAccessRoleValue"
	],
	[
		G,
		1,
		"searchValue"
	],
	[
		q,
		1,
		"failed"
	],
	[
		ce,
		1,
		"submitting"
	],
	[
		ue,
		1,
		"pendingAccessGrants"
	],
	[
		fe,
		1,
		"accessGrantRoles"
	],
	[
		me,
		1,
		"accessGrantLabels"
	],
	[
		ge,
		1,
		"dialog"
	]
], ne, 0, void 0, r), C), S = class extends Ee {
	constructor() {
		super($), Z(this, "styles", a), te();
	}
}, Z(S, ve, void 0), S)();
//#endregion
export { $ as default };

//# sourceMappingURL=AccessControlModal.esm.js.map