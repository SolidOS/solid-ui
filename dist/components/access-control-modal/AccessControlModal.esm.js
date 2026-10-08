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
import { sym as o } from "rdflib";
import { ACCESS_ROLES as s, DEFAULT_DIRECTORY_SOURCES as c, solidLogicSingleton as l } from "solid-logic";
import { html as u, nothing as d } from "lit";
import { property as f, query as p, state as m } from "lit/decorators.js";
//#region src/components/access-control-modal/AccessControlModal.ts
var h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, ee, te, ne, re, M, ie, ae, N, P, F, I, L, R, z, B, V, H, U, W, G, K, q, J, oe, se, ce;
function Y(e, t, n) {
	le(e, t), t.set(e, n);
}
function le(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function X(e, t, n) {
	return e.set(ue(e, t), n), n;
}
function Z(e, t) {
	return e.get(ue(e, t));
}
function ue(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function Q(e, t, n) {
	return (t = fe(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function de(e, t, n, r, i, a) {
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
				get: me(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || me(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return he(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : fe(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function fe(e) {
	var t = pe(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function pe(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function me(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function he(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function ge(e) {
	return e;
}
j = [n("solid-ui-access-control-modal")];
var $;
new (se = (_ = /*#__PURE__*/ new WeakMap(), v = /*#__PURE__*/ new WeakMap(), y = /*#__PURE__*/ new WeakMap(), b = /*#__PURE__*/ new WeakMap(), x = /*#__PURE__*/ new WeakMap(), S = /*#__PURE__*/ new WeakMap(), C = /*#__PURE__*/ new WeakMap(), w = /*#__PURE__*/ new WeakMap(), T = /*#__PURE__*/ new WeakMap(), E = /*#__PURE__*/ new WeakMap(), D = /*#__PURE__*/ new WeakMap(), O = /*#__PURE__*/ new WeakMap(), ce = (ee = f({ attribute: !1 }), ne = f({ attribute: !1 }), M = m(), ae = m(), P = m(), I = m(), R = m(), B = m(), H = m(), W = m(), K = m(), J = p("solid-ui-dialog"), "subjectUri"), g = class extends r {
	constructor(...e) {
		super(...e), Y(this, _, (k(this), te(this, void 0))), Y(this, v, re(this, void 0)), Y(this, y, ie(this, "")), Y(this, b, N(this, "Viewer")), Y(this, x, F(this, "No Access")), Y(this, S, L(this, "")), Y(this, C, z(this, !1)), Y(this, w, V(this, !1)), Y(this, T, U(this, [])), Y(this, E, G(this, [])), Y(this, D, q(this, [])), Y(this, O, oe(this, null)), Q(this, "accessPrincipleOptionsProvider", i(async (e) => {
			let t = this.getPrincipleSearchTerm(e), n = this.isHttpUri(t) ? await this.createUrlOption(t) : void 0, r = this.dedupeComboboxOptions([n].filter((e) => !!e));
			if (t.length < 2) return r.length ? r : [{
				label: "Type at least 2 characters to search",
				value: "",
				selectable: !1
			}];
			let i = [];
			try {
				i = await l.directory.search({
					query: t,
					sources: c
				});
			} catch (e) {
				if (!n) throw e;
			}
			let a = i.map((e) => this.directoryEntryToOption(e));
			return [...r, ...a];
		}));
	}
	get [ce]() {
		return Z(_, this);
	}
	set subjectUri(e) {
		X(_, this, e);
	}
	get accessGrants() {
		return Z(v, this);
	}
	set accessGrants(e) {
		X(v, this, e);
	}
	get principalInputValue() {
		return Z(y, this);
	}
	set principalInputValue(e) {
		X(y, this, e);
	}
	get addAccessRoleValue() {
		return Z(b, this);
	}
	set addAccessRoleValue(e) {
		X(b, this, e);
	}
	get sharedAccessRoleValue() {
		return Z(x, this);
	}
	set sharedAccessRoleValue(e) {
		X(x, this, e);
	}
	get searchValue() {
		return Z(S, this);
	}
	set searchValue(e) {
		X(S, this, e);
	}
	get failed() {
		return Z(C, this);
	}
	set failed(e) {
		X(C, this, e);
	}
	get submitting() {
		return Z(w, this);
	}
	set submitting(e) {
		X(w, this, e);
	}
	get pendingAccessGrants() {
		return Z(T, this);
	}
	set pendingAccessGrants(e) {
		X(T, this, e);
	}
	get accessGrantRoles() {
		return Z(E, this);
	}
	set accessGrantRoles(e) {
		X(E, this, e);
	}
	get accessGrantLabels() {
		return Z(D, this);
	}
	set accessGrantLabels(e) {
		X(D, this, e);
	}
	get dialog() {
		return Z(O, this);
	}
	set dialog(e) {
		X(O, this, e);
	}
	willUpdate(e) {
		super.willUpdate(e), e.has("accessGrants") && (this.accessGrantRoles = this.accessGrants?.map((e) => this.getAuthorizationRole(e)) ?? [], this.refreshAccessGrantLabels());
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
				await l.store.fetcher.load(o(t).doc());
			} catch {}
			return this.getAuthorizationSubjectLabel(e);
		}));
		this.accessGrants === e && (this.accessGrantLabels = t);
	}
	getAccessGrantEntries() {
		return (this.accessGrants ?? []).map((e, t) => ({
			authorization: e,
			index: t,
			role: this.accessGrantRoles[t] ?? this.getAuthorizationRole(e),
			subjectLabel: this.accessGrantLabels[t] ?? this.getAuthorizationSubjectLabel(e)
		})).sort((e, t) => {
			let n = e.role === "Owner", r = t.role === "Owner";
			return n && !r ? -1 : !n && r ? 1 : e.index - t.index;
		});
	}
	renderAccessGrants() {
		let e = this.searchValue.trim().toLowerCase(), t = this.getAccessGrantEntries().filter(({ subjectLabel: t }) => !e || t.toLowerCase().includes(e));
		return u`
      <ul>
        ${t.length > 0 ? t.map(({ authorization: e, index: t }) => this.renderAccessGrant(e, t)) : u`<li>No access grants</li>`}
      </ul>
    `;
	}
	renderAccessGrant(e, t) {
		let n = this.getAuthorizationBadge(e), r = this.accessGrantRoles[t] ?? this.getAuthorizationRole(e), i = this.accessGrantLabels[t] ?? this.getAuthorizationSubjectLabel(e);
		return u`
      <li>
        ${this.renderAuthorizationBadge(n)}
        <h3>${i}</h3>
        ${this.renderAuthorizationRole(r, t)}  
      </li>
    `;
	}
	getAuthorizationBadge(e) {
		let n = e.agent[0];
		if (n) {
			let r = t(o(n));
			return {
				kind: "agent",
				image: r,
				text: r ? "" : this.getInitials(this.getAuthorizationSubjectLabel(e), 2)
			};
		}
		if (e.agentGroup[0]) return {
			kind: "group",
			text: this.getInitials(this.getAuthorizationSubjectLabel(e), 1)
		};
		let r = e.agentClass[0];
		if (r) {
			let n = t(o(r));
			return {
				kind: "agentClass",
				image: n,
				text: n ? "" : this.getInitials(this.getAuthorizationSubjectLabel(e), 2)
			};
		}
		return {
			kind: "unknown",
			text: "?"
		};
	}
	renderAuthorizationBadge(e) {
		return u`
      <div class="access-grants-image access-grants-image--${e.kind}">
        ${e.image ? u`<img src=${e.image} alt="" aria-hidden="true" />` : u`<span aria-hidden="true">${e.text}</span>`}
      </div>
    `;
	}
	getInitials(e, t = 2) {
		return (e.split(/\s+/).filter(Boolean).slice(0, t).map((e) => e[0]).join("") || e.slice(0, t)).toUpperCase();
	}
	getAuthorizationSubjects(e) {
		return [
			...e.agent,
			...e.agentGroup,
			...e.agentClass
		];
	}
	getAuthorizationSubjectLabel(t) {
		let n = this.getAuthorizationSubjects(t);
		return n.length ? n.map((t) => e(o(t))).join(", ") : "Unknown access holder";
	}
	getAuthorizationRole(e) {
		return l.acl.roleFromModes(e.mode);
	}
	getRoleValueFromEvent(e, t = "Viewer") {
		let n = e.detail?.option?.value;
		if (typeof n == "string") return n;
		let r = e.currentTarget;
		return typeof r?.value == "string" ? r.value : t;
	}
	renderAuthorizationRole(e, t) {
		return e === "Owner" ? u`<span class="access-grants-role access-grants-role--owner">${e}</span>` : u`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-grants-role access-grants-role--editable"
        .value=${e}
        @change=${(e) => this.onAccessGrantRoleInput(t, e)}
      >
        ${this.renderGrantRoleOptions()}
      </solid-ui-combobox>
    `;
	}
	renderModeSelector(e = "add") {
		let t = e === "add" ? "access-role-select access-role-select--top" : "access-role-select access-role-select--compact", n = e === "add" ? this.addAccessRoleValue : this.sharedAccessRoleValue;
		return u`
      <solid-ui-combobox
        class=${t}
        .value=${n}
        @change=${e === "add" ? this.onAddAccessRoleInput : this.onSharedAccessRoleInput}
      >
        ${e === "add" ? this.renderAddRoleOptions() : this.renderGeneralRoleOptions()}
      </solid-ui-combobox>
    `;
	}
	renderAddRoleOptions() {
		return s.filter((e) => e !== "No Access").map((e) => u`
        <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
      `);
	}
	renderGeneralRoleOptions() {
		return s.map((e) => u`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `);
	}
	renderGrantRoleOptions() {
		return s.map((e) => u`
      <solid-ui-combobox-option value=${e}>${e === "No Access" ? "Remove" : e}</solid-ui-combobox-option>
    `);
	}
	renderAddAccessForm() {
		return u`
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
		return this.pendingAccessGrants.length ? u`
      <div class="access-grants-pending">
        ${this.pendingAccessGrants.map((e, t) => u`
          <div class="access-grants-pending-item">
            <span class="access-grants-pending-item-label">${e.label}</span>
            <solid-ui-button
              type="button"
              variant="ghost"
              class="access-grants-pending-item-remove"
              @click=${() => this.removePendingAccessGrant(t)}
            >
              <span class="sr-only">Remove ${e.label}</span>
              <icon-lucide-circle-x slot="icon"></icon-lucide-circle-x>
            </solid-ui-button>
          </div>
        `)}
      </div>
    ` : d;
	}
	renderAccessGrantsSection() {
		let e = this.getAccessGrantSearchOptions();
		return u`
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
          ${e.map((e) => u`
            <solid-ui-combobox-option .value=${e.value}>
              ${e.label}
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
		return u`
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
          ${this.renderModeSelector("general")}
        </div>
      </div>
    `;
	}
	renderGeneralAccessIcon() {
		return u`
      <div class="access-grants-general-share-icon">
        <div class="access-grants-general-share-icon-inner">
          <icon-lucide-globe class="access-grants-general-share-icon-image"></icon-lucide-globe>
        </div>
      </div>
    `;
	}
	getRoleModes(e) {
		return l.acl.modesFromRole(e);
	}
	getDialogTitle() {
		let t = this.subjectUri ? o(this.subjectUri) : void 0, n = t ? e(t).trim() : "";
		return !n || n === "this resource" ? "Share this resource" : `Share "${n}"`;
	}
	render() {
		let e = this.getDialogTitle();
		return u`
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
                    ?disabled=${!this.pendingAccessGrants.length && !this.principalInputValue.trim() || this.submitting}
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
		e.preventDefault(), !this.submitting && await this.commitPrinciplesFromInput();
	}
	async onSaveClick() {
		this.submitting || (this.principalInputValue.trim() && await this.commitPrinciplesFromInput(), await this.savePendingAccessGrants());
	}
	onCancelClick() {
		this.dialog?.close();
	}
	async savePendingAccessGrants() {
		if (!this.submitting) {
			if (!this.pendingAccessGrants.length) this.failed = !0;
			else if (!this.subjectUri) this.failed = !0;
			else {
				this.submitting = !0, this.failed = !1;
				try {
					for (let e of this.pendingAccessGrants) {
						let t = {
							type: e.subjectType,
							iri: e.subjectValue
						}, n = e.role === "No Access" ? await l.acl.planRevoke(this.subjectUri, t) : await l.acl.planGrant(this.subjectUri, t, this.getRoleModes(e.role));
						await l.acl.applyPlan(n);
					}
					this.principalInputValue = "", this.pendingAccessGrants = [], this.dialog?.close();
				} catch (e) {
					this.failed = !0, console.error("Failed to save access changes", e);
				} finally {
					this.submitting = !1;
				}
			}
		}
	}
	onPrincipalInput(e) {
		let t = e.currentTarget;
		this.principalInputValue = t?.value ?? "";
	}
	onPrincipalSelect(e) {
		let t = e.detail?.option;
		t && typeof t.value == "string" && t.value && this.queuePendingPrinciples([t.value], this.addAccessRoleValue, t.label);
	}
	onSearchInput(e) {
		let t = e.currentTarget;
		this.searchValue = t?.value ?? "";
	}
	onSearchSelect(e) {
		let t = e.detail?.option;
		t && typeof t.label == "string" && (this.searchValue = t.label);
	}
	onAddAccessRoleInput(e) {
		let t = this.getRoleValueFromEvent(e);
		this.addAccessRoleValue = t, this.pendingAccessGrants = this.pendingAccessGrants.map((e) => ({
			...e,
			role: t
		}));
	}
	onSharedAccessRoleInput(e) {
		let t = this.getRoleValueFromEvent(e);
		this.sharedAccessRoleValue = t;
	}
	onAccessGrantRoleInput(e, t) {
		let n = this.getRoleValueFromEvent(t);
		this.accessGrantRoles = this.accessGrantRoles.map((t, r) => r === e ? n : t);
	}
	removePendingAccessGrant(e) {
		this.pendingAccessGrants = this.pendingAccessGrants.filter((t, n) => n !== e);
	}
	async commitPrinciplesFromInput() {
		let e = this.principalInputValue.trim();
		return e ? (await this.queuePendingPrinciples([e], this.addAccessRoleValue, void 0, e), !0) : !1;
	}
	async queuePendingPrinciples(e, t = this.addAccessRoleValue, n, r) {
		let i = r ?? this.principalInputValue.trim(), a = (await Promise.all(e.map(async (e) => this.createPendingAccessGrant(e, t, n)))).filter((e) => !!e);
		if (!a.length) return;
		let o = [...this.pendingAccessGrants, ...a];
		this.pendingAccessGrants = this.dedupePendingAccessGrants(o), this.principalInputValue.trim() === i && (this.principalInputValue = "");
	}
	async createPendingAccessGrant(e, t = this.addAccessRoleValue, n) {
		let r = this.normalizeAccessPrincipleInput(e), i = await l.acl.classifyAccessControlSubject(r), a = this.isHttpUri(e) ? "agent" : void 0, o = i?.kind ?? a, s = i?.subjectValue ?? r;
		if (!o) console.error(`Could not classify access target: ${e}`);
		else if (o === "origin") console.error(`Origin access grants are not supported yet: ${e}`);
		else return {
			subjectType: o,
			subjectValue: s,
			role: t,
			label: n ?? await this.resolvePendingAccessGrantLabel(s, e)
		};
	}
	async resolvePendingAccessGrantLabel(t, n) {
		try {
			let r = o(t);
			return await l.store.fetcher.load(r.doc()), e(r).trim() || n;
		} catch {
			return e(o(t)) || n;
		}
	}
	dedupePendingAccessGrants(e) {
		let t = /* @__PURE__ */ new Set();
		return e.filter((e) => {
			let n = `${e.subjectType}:${e.subjectValue}`;
			return !t.has(n) && (t.add(n), !0);
		});
	}
	async createUrlOption(e) {
		try {
			await l.store.fetcher.load(o(e).doc());
		} catch {
			return;
		}
		let t = await this.resolvePendingAccessGrantLabel(e, e);
		return {
			label: t === e ? `Use ${e}` : t,
			value: e
		};
	}
	dedupeComboboxOptions(e) {
		let t = /* @__PURE__ */ new Set();
		return e.filter((e) => typeof e.value != "string" || !e.value || t.has(e.value) ? !1 : (t.add(e.value), !0));
	}
	directoryEntryToOption(e) {
		return {
			label: e.label,
			value: e.uri,
			template: this.directoryEntryToOptionTemplate(e)
		};
	}
	directoryEntryToOptionTemplate(e) {
		return u`
      <span style="display: inline-flex; align-items: center; gap: 8px; line-height: 1;">
        ${this.renderDirectoryEntryIcon(e)}
        <span>${e.label}</span>
      </span>
    `;
	}
	renderDirectoryEntryIcon(e) {
		return e.sources.includes("contacts") || e.sources.includes("groups") ? u`<icon-lucide-book-user style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-book-user>` : e.sources.includes("friends") ? u`<icon-lucide-users style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-users>` : e.sources.includes("catalog") ? u`<icon-lucide-user-round style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-user-round>` : d;
	}
	getAccessGrantSearchOptions() {
		return this.getAccessGrantEntries().map(({ subjectLabel: e }) => ({
			label: e,
			value: e
		}));
	}
	getPrincipleSearchTerm(e) {
		let t = e.lastIndexOf(",");
		return t < 0 ? e.trim() : e.slice(t + 1).trim();
	}
	isHttpUri(e) {
		return e.startsWith("http://") || e.startsWith("https://");
	}
	normalizeAccessPrincipleInput(e) {
		return e.trim();
	}
	async onCopyLinkClick(e) {
		if (e.preventDefault(), this.subjectUri) try {
			await navigator.clipboard.writeText(this.subjectUri);
		} catch (e) {
			console.error("Failed to copy resource link", e);
		}
	}
}, {e: [te, re, ie, N, F, L, z, V, U, G, q, oe, k], c: [$, A]} = de(g, [
	[
		ee,
		1,
		"subjectUri"
	],
	[
		ne,
		1,
		"accessGrants"
	],
	[
		M,
		1,
		"principalInputValue"
	],
	[
		ae,
		1,
		"addAccessRoleValue"
	],
	[
		P,
		1,
		"sharedAccessRoleValue"
	],
	[
		I,
		1,
		"searchValue"
	],
	[
		R,
		1,
		"failed"
	],
	[
		B,
		1,
		"submitting"
	],
	[
		H,
		1,
		"pendingAccessGrants"
	],
	[
		W,
		1,
		"accessGrantRoles"
	],
	[
		K,
		1,
		"accessGrantLabels"
	],
	[
		J,
		1,
		"dialog"
	]
], j, 0, void 0, r), g), h = class extends ge {
	constructor() {
		super($), Q(this, "styles", a), A();
	}
}, Q(h, se, void 0), h)();
//#endregion
export { $ as default };

//# sourceMappingURL=AccessControlModal.esm.js.map