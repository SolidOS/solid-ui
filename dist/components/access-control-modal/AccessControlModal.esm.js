import "../../lib/components/index.esm.js";
import { html as e, nothing as t } from "lit";
import { property as n, state as r } from "lit/decorators.js";
import { label as i } from "../../utils/label.esm.js";
import { customElement as a } from "../../lib/components/decorators.esm.js";
import o from "../../lib/components/dialog-component/DialogComponent.esm.js";
import { error as s } from "../../lib/debug.esm.js";
import { Authenticated as c, Public as l, classifyAuthorizationScope as u, solidLogicSingleton as d } from "solid-logic";
import { sym as f } from "rdflib";
import "../../_virtual/~icons/lucide/circle-x.esm.js";
import "../../_virtual/~icons/lucide/folder.esm.js";
import "../../_virtual/~icons/lucide/folder-open.esm.js";
import "../../_virtual/~icons/lucide/lock-keyhole.esm.js";
import "../dialog/index.esm.js";
import "../dialog-content/index.esm.js";
import "../dialog-footer/index.esm.js";
import "../button/index.esm.js";
import "../combobox/index.esm.js";
import "../combobox-option/index.esm.js";
import "./AccessControlSharedAccess.esm.js";
import "./AccessControlGeneralAccess.esm.js";
import "./AccessControlErrors.esm.js";
import p from "./AccessControlModal.styles.css.esm.js";
import { createAccessGrantDrafts as m, getAccessGrantIds as h, getAccessGrantViewModels as g, getAuthenticatedAccessRole as _, getAuthorizationSubjectLabel as v, getChangedAccessGrants as y, getPublicAccessRole as b, getSharedAuthorization as x } from "./accessGrantDrafts.esm.js";
import { accessPrincipalOptionsProvider as S, resolveAccessTarget as C } from "./accessTargetResolver.esm.js";
import { applyAccessChanges as w } from "./applyAccessChanges.esm.js";
import { buildAccessChanges as T } from "./buildAccessChanges.esm.js";
// src/components/access-control-modal/AccessControlModal.ts
var E, D, O, k, A, j, M, N, P, F, I, L, R, z, B, V, H, U, W, ee, te, ne, re, ie, ae, oe, G, K, q, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, Oe, ke, Ae, je, Me, Ne, Pe, Fe;
function J(e, t, n) {
	Ie(e, t), t.set(e, n);
}
function Ie(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function Y(e, t, n) {
	return e.set(Le(e, t), n), n;
}
function X(e, t) {
	return e.get(Le(e, t));
}
function Le(e, t, n) {
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
function Re(e, t, n, r, i, a) {
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
				get: Be(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Be(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return Ve(t) === e;
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
	var t = ze(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ze(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Be(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function Ve(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function He(e) {
	return e;
}
function Ue(e) {
	return e != null;
}
ne = [a("solid-ui-access-control-modal")];
var $;
new (Pe = (O = /*#__PURE__*/ new WeakMap(), k = /*#__PURE__*/ new WeakMap(), A = /*#__PURE__*/ new WeakMap(), j = /*#__PURE__*/ new WeakMap(), M = /*#__PURE__*/ new WeakMap(), N = /*#__PURE__*/ new WeakMap(), P = /*#__PURE__*/ new WeakMap(), F = /*#__PURE__*/ new WeakMap(), I = /*#__PURE__*/ new WeakMap(), L = /*#__PURE__*/ new WeakMap(), R = /*#__PURE__*/ new WeakMap(), z = /*#__PURE__*/ new WeakMap(), B = /*#__PURE__*/ new WeakMap(), V = /*#__PURE__*/ new WeakMap(), H = /*#__PURE__*/ new WeakMap(), U = /*#__PURE__*/ new WeakMap(), W = /*#__PURE__*/ new WeakMap(), Fe = (re = n({ attribute: !1 }), ae = n({ attribute: !1 }), G = r(), q = r(), ce = r(), ue = r(), fe = r(), me = r(), ge = r(), ve = r(), be = r(), Se = r(), we = r(), Ee = r(), Oe = r(), Ae = r(), Me = r(), "subjectUri"), D = class extends o {
	constructor(...e) {
		super(...e), J(this, O, (ee(this), ie(this, void 0))), J(this, k, oe(this, void 0)), J(this, A, K(this, "")), J(this, j, se(this, "No Access")), J(this, M, le(this, "No Access")), J(this, N, de(this, "No Access")), J(this, P, pe(this, !1)), J(this, F, he(this, [])), J(this, I, _e(this, [])), J(this, L, ye(this, [])), J(this, R, xe(this, !0)), J(this, z, Ce(this)), J(this, B, Te(this, !1)), J(this, V, De(this, "")), J(this, H, ke(this, "folder+contents")), J(this, U, je(this, !1)), J(this, W, Ne(this, !1)), Z(this, "accessGrantLabelRequestVersion", 0), Z(this, "accessContextRequestVersion", 0), Z(this, "accessContextSubjectUri", void 0);
	}
	get [Fe]() {
		return X(O, this);
	}
	set subjectUri(e) {
		Y(O, this, e);
	}
	get accessGrants() {
		return X(k, this);
	}
	set accessGrants(e) {
		Y(k, this, e);
	}
	get principalInputValue() {
		return X(A, this);
	}
	set principalInputValue(e) {
		Y(A, this, e);
	}
	get addAccessRoleValue() {
		return X(j, this);
	}
	set addAccessRoleValue(e) {
		Y(j, this, e);
	}
	get authenticatedAccessRoleValue() {
		return X(M, this);
	}
	set authenticatedAccessRoleValue(e) {
		Y(M, this, e);
	}
	get publicAccessRoleValue() {
		return X(N, this);
	}
	set publicAccessRoleValue(e) {
		Y(N, this, e);
	}
	get submitting() {
		return X(P, this);
	}
	set submitting(e) {
		Y(P, this, e);
	}
	get pendingAccessGrants() {
		return X(F, this);
	}
	set pendingAccessGrants(e) {
		Y(F, this, e);
	}
	get accessGrantDrafts() {
		return X(I, this);
	}
	set accessGrantDrafts(e) {
		Y(I, this, e);
	}
	get errors() {
		return X(L, this);
	}
	set errors(e) {
		Y(L, this, e);
	}
	get successfulChangesRefreshed() {
		return X(R, this);
	}
	set successfulChangesRefreshed(e) {
		Y(R, this, e);
	}
	get accessContext() {
		return X(z, this);
	}
	set accessContext(e) {
		Y(z, this, e);
	}
	get accessContextLoading() {
		return X(B, this);
	}
	set accessContextLoading(e) {
		Y(B, this, e);
	}
	get accessContextError() {
		return X(V, this);
	}
	set accessContextError(e) {
		Y(V, this, e);
	}
	get containerScope() {
		return X(H, this);
	}
	set containerScope(e) {
		Y(H, this, e);
	}
	get advancedSharingOpen() {
		return X(U, this);
	}
	set advancedSharingOpen(e) {
		Y(U, this, e);
	}
	get protectedTarget() {
		return X(W, this);
	}
	set protectedTarget(e) {
		Y(W, this, e);
	}
	disconnectedCallback() {
		this.accessGrantLabelRequestVersion++, this.accessContextRequestVersion++, this.errors = [], super.disconnectedCallback();
	}
	get inputError() {
		return this.errors.find((e) => e.action === "input")?.message ?? "";
	}
	get saveErrors() {
		return this.errors.filter((e) => e.action !== "input");
	}
	setInputError(e) {
		this.errors = [...this.errors.filter((e) => e.action !== "input"), e];
	}
	clearInputError() {
		this.errors = this.errors.filter((e) => e.action !== "input");
	}
	willUpdate(e) {
		super.willUpdate(e), e.has("accessGrants") && this.refreshScopedAccessGrantDrafts();
	}
	updated(e) {
		super.updated(e), e.has("subjectUri") && (this.advancedSharingOpen = !1, this.loadAccessContext().catch((e) => {
			s("Failed to load access control context", e);
		})), e.has("accessGrants") && this.refreshAccessGrantLabels().catch((e) => {
			s("Failed to refresh access grant labels", e);
		}), e.has("accessContext") && !e.has("subjectUri") && this.refreshContainerScopeState();
	}
	refreshContainerScopeState() {
		this.isContainer() && this.accessContext && (this.containerScope = "folder+contents", this.refreshScopedAccessGrantDrafts());
	}
	async refreshAccessGrantLabels() {
		let e = ++this.accessGrantLabelRequestVersion, t = this.accessGrants, n = this.subjectUri, r = this.getScopedAccessGrants();
		if (!r.length) {
			this.accessGrantDrafts = [];
			return;
		}
		let i = await Promise.all(r.map(async (e) => (await Promise.all(e.agentGroup.map(async (e) => {
			try {
				await d.store.fetcher.load(f(e).doc());
			} catch {}
		})), v(x(e)))));
		if (e === this.accessGrantLabelRequestVersion && this.accessGrants === t && this.subjectUri === n && this.getScopedAccessGrants() === r) {
			let e = new Map(h(r).map((e, t) => [e, i[t]]));
			this.accessGrantDrafts = this.accessGrantDrafts.map((t) => ({
				...t,
				subjectLabel: e.get(t.id) ?? t.subjectLabel
			}));
		}
	}
	getDialogTitle() {
		let e = this.subjectUri ? f(this.subjectUri) : void 0, t = e ? i(e).trim() : "";
		return !t || t === "this resource" ? "Manage Access of \"this resource\"" : `Manage Access of "${t}"`;
	}
	isContainer() {
		return !!(this.subjectUri && new URL(this.subjectUri).pathname.endsWith("/"));
	}
	async loadAccessContext() {
		let e = ++this.accessContextRequestVersion, t = this.subjectUri;
		if (this.accessContext = void 0, this.accessContextSubjectUri = void 0, this.accessContextError = "", this.accessContextLoading = !!t, !t) this.accessContextLoading = !1;
		else try {
			let n = await d.acl.findEffectiveAcl(t);
			if (e !== this.accessContextRequestVersion || this.subjectUri !== t) return;
			this.accessContext = n, this.accessContextSubjectUri = t, this.accessGrants?.length || (this.accessGrants = this.accessContext.authorizations), this.refreshContainerScopeState(), this.protectedTarget = d.acl.isProtectedResource(t), this.protectedTarget && this.refreshScopedAccessGrantDrafts();
		} catch (n) {
			if (e !== this.accessContextRequestVersion || this.subjectUri !== t) return;
			this.accessContextError = n instanceof Error && n.message.trim() ? n.message : "Unable to load access settings for this resource.", s("Failed to load access control context", n);
		} finally {
			e === this.accessContextRequestVersion && this.subjectUri === t && (this.accessContextLoading = !1);
		}
	}
	async ensureAccessContext() {
		return this.subjectUri ? !this.isConnected || this.accessContextSubjectUri === this.subjectUri && this.accessContext && !this.accessContextError ? !0 : (await this.loadAccessContext(), this.accessContextSubjectUri === this.subjectUri && !!this.accessContext && !this.accessContextError) : !1;
	}
	canMutate() {
		return !this.isConnected || !this.subjectUri || !(!this.subjectUri || this.accessContextSubjectUri !== this.subjectUri || !this.accessContext || this.accessContextLoading || this.accessContextError);
	}
	async retryAccessContext() {
		await this.loadAccessContext();
	}
	getInheritedContainerDisplayName(e) {
		let t = f(e), n = d.resource.isStorageRoot(t), r = d.authn.currentUser(), a = (r ? d.profile.findStorage(r) : null)?.toString() === t.toString();
		return n || a ? "your main storage" : i(t);
	}
	renderSharingInformation() {
		if (!this.accessContext) return t;
		let n = this.accessContext.effectiveContainer, r = n ? this.getInheritedContainerDisplayName(n) : "the parent container.";
		return e`
      <div class="access-control-sharing-state-panel">
        <icon-lucide-lock-keyhole class="access-control-sharing-state-icon" aria-hidden="true"></icon-lucide-lock-keyhole>
        <div class="access-control-sharing-state-message">
          ${this.accessContext.inherited ? n ? e`<p>Permissions on this resource come from <span class="access-control-sharing-state-emphasis">${r}</span>.</p>` : e`<p>Permissions on this resource come from a parent folder, but no sharing rules are in place.</p>` : e`
              <div class="access-control-sharing-state-custom-row">
                <p>This resource has explicitly defined sharing permissions.</p>
                ${this.protectedTarget ? t : e`
                    <solid-ui-button
                      type="button"
                      variant="tertiary"
                      aria-label="Reset sharing"
                      @click=${this.onResetToDefault}
                    >
                      Reset
                    </solid-ui-button>
                  `}
              </div>
            `}
          ${this.protectedTarget ? e`<p class="access-control-sharing-state-protected-message">This is a protected storage resource. Its primary access-control settings cannot be changed here.</p>` : t}
        </div>
      </div>
    `;
	}
	getSelectedContainerScope() {
		return this.containerScope;
	}
	shouldShowContainerScope() {
		let e = this.getSharedAccessViewModels().some((e) => e.scope !== void 0 && e.scope !== "folder+contents");
		return this.isContainer() && !this.protectedTarget && (e || this.advancedSharingOpen);
	}
	renderAccessContextState() {
		return this.accessContextLoading ? e`<p role="status">Loading access settings...</p>` : this.accessContextError ? e`
        <solid-ui-error-state
          title="Could not load access settings"
          message=${this.accessContextError}
        >
          <solid-ui-button type="button" variant="secondary" @click=${this.retryAccessContext}>
            Retry
          </solid-ui-button>
        </solid-ui-error-state>
      ` : this.accessContext ? t : e`<p role="status">Access settings are not ready yet.</p>`;
	}
	getScopedAccessGrants() {
		return this.accessGrants ?? [];
	}
	refreshScopedAccessGrantDrafts() {
		let e = this.getScopedAccessGrants(), t = m(e);
		this.accessGrantDrafts = t.map((t, n) => {
			let r = this.isContainer() && this.subjectUri ? u(this.subjectUri, e[n], this.accessContext?.inherited ?? !1) ?? "folder+contents" : void 0;
			return {
				...t,
				scope: r,
				initialScope: r
			};
		}), this.isContainer() && this.accessContext && this.accessGrantDrafts.some((e) => e.scope !== void 0 && e.scope !== "folder+contents") && (this.advancedSharingOpen = !0), this.authenticatedAccessRoleValue = _(e), this.publicAccessRoleValue = b(e);
	}
	getSharedAccessViewModels() {
		let e = this.pendingAccessGrants.filter((e) => e.role !== "No Access").map((e) => ({
			id: `pending:${e.subjectType}:${e.subjectValue}`,
			authorization: {
				agent: e.subjectType === "agent" ? [e.subjectValue] : [],
				agentGroup: e.subjectType === "agentGroup" ? [e.subjectValue] : [],
				agentClass: [],
				origin: e.subjectType === "origin" ? [e.subjectValue] : [],
				mode: []
			},
			role: e.role,
			initialRole: e.role,
			initialScope: e.scope,
			scope: e.scope ?? "folder+contents",
			subjectLabel: e.label,
			subjects: [{
				type: e.subjectType,
				iri: e.subjectValue
			}]
		}));
		return [...g(this.accessGrantDrafts), ...e];
	}
	render() {
		let t = this.getDialogTitle();
		return e`
      <solid-ui-dialog title=${t}>
        <form @submit=${this.onSubmit}>
          <solid-ui-dialog-content>
            ${this.renderAccessContextState()}
          <solid-ui-access-control-add-access
              .disabled=${!this.canMutate()}
              .principalInputValue=${this.principalInputValue}
              .addAccessRoleValue=${this.addAccessRoleValue}
              .pendingAccessGrants=${this.pendingAccessGrants}
              .showAdvancedToggle=${this.isContainer() && !this.protectedTarget}
              .advancedSharingOpen=${this.advancedSharingOpen}
              .inputError=${this.inputError}
              .asyncOptionsProvider=${S}
              @target-input=${this.onPrincipalInput}
              @target-selected=${this.onPrincipalSelect}
              @role-changed=${this.onAddAccessRoleInput}
              @pending-grant-removed=${this.onPendingGrantRemoved}
              @advanced-sharing-changed=${this.onAdvancedSharingChanged}
            ></solid-ui-access-control-add-access>
            <solid-ui-access-control-shared-access
              .disabled=${!this.canMutate()}
              .accessGrantViewModels=${this.getSharedAccessViewModels()}
              .showContainerScope=${this.shouldShowContainerScope()}
              .advancedSharingOpen=${this.advancedSharingOpen}
              @access-grant-role-changed=${this.onAccessGrantRoleInput}
              @access-grant-scope-changed=${this.onAccessGrantScopeInput}
            ></solid-ui-access-control-shared-access>
            <solid-ui-access-control-general-access
              .disabled=${!this.canMutate()}
              .subjectUri=${this.subjectUri}
              .authenticatedAccessRoleValue=${this.authenticatedAccessRoleValue}
              .publicAccessRoleValue=${this.publicAccessRoleValue}
              @authenticated-role-changed=${this.onAuthenticatedAccessRoleInput}
              @public-role-changed=${this.onPublicAccessRoleInput}
            ></solid-ui-access-control-general-access>
            ${this.renderSharingInformation()}
            <solid-ui-access-control-errors
              .errors=${this.saveErrors}
              .successfulChangesRefreshed=${this.successfulChangesRefreshed}
              @close=${this.onCancelClick}
            ></solid-ui-access-control-errors>
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
                ?disabled=${!this.canMutate() || !this.hasUnsavedChanges() || this.submitting || this.saveErrors.length > 0}
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
		e.preventDefault(), this.submitting || (!this.isConnected || await this.ensureAccessContext()) && await this.commitPrincipalFromInputSafely();
	}
	async onSaveClick() {
		if (this.submitting || this.isConnected && !await this.ensureAccessContext() || this.principalInputValue.trim() && !await this.commitPrincipalFromInputSafely()) return;
		let e = this.isContainer() && !this.protectedTarget ? this.getSelectedContainerScope() : "file";
		await this.saveAccessChanges(e === "folder" ? "container" : e);
	}
	onCancelClick() {
		this.close();
	}
	async onResetToDefault() {
		if (this.subjectUri && this.canMutate() && this.accessContext && !this.accessContext.inherited && !this.submitting) {
			this.submitting = !0, this.errors = this.errors.filter((e) => e.action === "input");
			try {
				await d.acl.resetToDefault(this.subjectUri), await this.loadAccessContext();
				let e = await d.acl.findAccessGrants(this.subjectUri);
				this.accessGrants = this.accessContext?.inherited ? this.accessContext.authorizations : e;
			} catch (e) {
				this.errors = [...this.errors, {
					action: "reset",
					targetUri: this.subjectUri,
					label: "Custom sharing",
					message: e instanceof Error ? e.message : "Unable to reset sharing."
				}], s("Failed to reset access control", e);
			} finally {
				this.submitting = !1;
			}
		}
	}
	onAdvancedSharingChanged(e) {
		this.advancedSharingOpen = e.detail.open;
	}
	onAccessGrantScopeInput(e) {
		if (this.canMutate()) {
			if (e.detail.id.startsWith("pending:")) {
				let t = e.detail.id.slice(8);
				this.pendingAccessGrants = this.pendingAccessGrants.map((n) => `${n.subjectType}:${n.subjectValue}` === t ? {
					...n,
					scope: e.detail.scope
				} : n);
			} else this.accessGrantDrafts = this.accessGrantDrafts.map((t) => t.id === e.detail.id ? {
				...t,
				scope: e.detail.scope
			} : t);
		}
	}
	async saveAccessChanges(e = "file") {
		if (this.submitting || !this.canMutate()) return;
		let t = this.pendingAccessGrants.find((e) => e.role === "No Access");
		if (t) {
			this.setInputError({
				action: "input",
				targetUri: t.subjectValue,
				label: t.label,
				message: "Choose an access role for the pending additions before saving."
			});
			return;
		}
		let n = y(this.accessGrantDrafts), r = this.getGeneralAccessChanges();
		if ((this.pendingAccessGrants.length || n.length || r.length) && this.subjectUri) {
			this.submitting = !0, this.errors = this.errors.filter((e) => e.action === "input"), this.successfulChangesRefreshed = !0;
			try {
				let t = T({
					pendingAccessGrants: this.pendingAccessGrants,
					generalAccessChanges: r,
					changedAccessGrants: n
				}), i = await w(this.subjectUri, t, { containerScope: e });
				if (i.length) {
					this.errors = [...this.errors, ...i], this.principalInputValue = "", this.pendingAccessGrants = [];
					try {
						this.accessGrants = await d.acl.findAccessGrants(this.subjectUri);
					} catch (e) {
						this.successfulChangesRefreshed = !1, this.errors = [...this.errors, {
							action: "save",
							targetUri: this.subjectUri,
							label: "Shared with list",
							message: e instanceof Error ? e.message : "Unable to refresh the access list."
						}], s("Failed to refresh access grants after save errors", e);
					}
					s("Failed to save some access changes", i);
					return;
				}
				this.principalInputValue = "", this.pendingAccessGrants = [], this.close();
			} catch (e) {
				this.errors = [...this.errors, {
					action: "save",
					targetUri: this.subjectUri ?? "",
					label: "Access changes",
					message: e instanceof Error ? e.message : "Unexpected error while saving access changes."
				}];
			} finally {
				this.submitting = !1;
			}
		}
	}
	onPrincipalInput(e) {
		this.canMutate() && (this.principalInputValue = e.detail.value, this.clearInputError());
	}
	onPrincipalSelect(e) {
		this.canMutate() && this.queuePendingPrincipal(e.detail.value, this.addAccessRoleValue, e.detail.label, void 0, e.detail.targetKind);
	}
	getGeneralAccessChanges() {
		if (!this.subjectUri) return [];
		let e = this.getScopedAccessGrants(), t = _(e), n = b(e);
		return [this.authenticatedAccessRoleValue === t ? void 0 : {
			subject: c,
			role: this.authenticatedAccessRoleValue,
			label: "Authenticated users"
		}, this.publicAccessRoleValue === n ? void 0 : {
			subject: l,
			role: this.publicAccessRoleValue,
			label: "Public"
		}].filter(Ue);
	}
	onAddAccessRoleInput(e) {
		if (!this.canMutate()) return;
		let t = e.detail.role;
		if (t === "No Access" || !this.pendingAccessGrants.length) {
			this.addAccessRoleValue = t;
			return;
		}
		let n = this.pendingAccessGrants.map((e) => ({
			id: `staged:${e.subjectType}:${e.subjectValue}`,
			authorization: {
				agent: e.subjectType === "agent" ? [e.subjectValue] : [],
				agentGroup: e.subjectType === "agentGroup" ? [e.subjectValue] : [],
				agentClass: [],
				origin: e.subjectType === "origin" ? [e.subjectValue] : [],
				mode: []
			},
			role: t,
			initialRole: "No Access",
			initialScope: e.scope,
			scope: e.scope ?? "folder+contents",
			subjectLabel: e.label,
			subjects: [{
				type: e.subjectType,
				iri: e.subjectValue
			}]
		})), r = new Map(this.accessGrantDrafts.map((e) => [e.id, e]));
		for (let e of n) {
			let t = r.get(e.id);
			r.set(e.id, t ? {
				...t,
				role: e.role
			} : e);
		}
		this.accessGrantDrafts = [...r.values()], this.pendingAccessGrants = [], this.addAccessRoleValue = "No Access";
	}
	onAuthenticatedAccessRoleInput(e) {
		this.canMutate() && (this.authenticatedAccessRoleValue = e.detail.role);
	}
	onPublicAccessRoleInput(e) {
		this.canMutate() && (this.publicAccessRoleValue = e.detail.role);
	}
	onAccessGrantRoleInput(e) {
		if (this.canMutate()) {
			if (e.detail.id.startsWith("pending:")) {
				let t = e.detail.id.slice(8);
				this.pendingAccessGrants = this.pendingAccessGrants.map((n) => `${n.subjectType}:${n.subjectValue}` === t ? {
					...n,
					role: e.detail.role
				} : n), this.addAccessRoleValue = e.detail.role;
			} else this.accessGrantDrafts = this.accessGrantDrafts.map((t) => t.id === e.detail.id ? {
				...t,
				role: e.detail.role
			} : t);
		}
	}
	onPendingGrantRemoved(e) {
		this.canMutate() && (this.pendingAccessGrants = this.pendingAccessGrants.filter((t, n) => n !== e.detail.index));
	}
	hasUnsavedChanges() {
		return !!(this.pendingAccessGrants.length || this.principalInputValue.trim() || y(this.accessGrantDrafts).length || this.getGeneralAccessChanges().length);
	}
	async commitPrincipalFromInput() {
		if (!this.canMutate()) return !1;
		let e = this.principalInputValue.trim();
		return e ? this.queuePendingPrincipal(e, this.addAccessRoleValue, void 0, e) : !1;
	}
	async commitPrincipalFromInputSafely() {
		let e = this.principalInputValue.trim();
		try {
			return await this.commitPrincipalFromInput();
		} catch (t) {
			return this.principalInputValue.trim() === e ? (this.setInputError({
				action: "input",
				label: "Access target",
				targetUri: this.principalInputValue.trim(),
				message: "We could not verify this access target. Check the value and try again."
			}), s("Failed to commit pending access grants", t), !1) : (s("Ignored stale access-target validation error", t), !1);
		}
	}
	async queuePendingPrincipal(e, t = this.addAccessRoleValue, n, r, i) {
		let a = r ?? this.principalInputValue.trim(), o = await this.createPendingAccessGrant(e, t, n, i);
		if ("error" in o) return this.principalInputValue.trim() === a && this.setInputError(o.error), s("Failed to add access grant:", o.error.message), !1;
		let c = [...this.pendingAccessGrants, o.grant];
		return this.pendingAccessGrants = this.dedupePendingAccessGrants(c), this.principalInputValue.trim() === a && (this.clearInputError(), this.principalInputValue = ""), !0;
	}
	async createPendingAccessGrant(e, t = this.addAccessRoleValue, n, r) {
		try {
			let i = e.trim(), a = await C(i, n);
			return a ? { grant: {
				subjectType: a.subjectType,
				subjectValue: a.subjectValue,
				role: t,
				label: a.label,
				scope: this.isContainer() && !this.protectedTarget ? this.containerScope : void 0,
				targetKind: r ?? a.targetKind
			} } : { error: {
				action: "input",
				label: "Access target",
				targetUri: i,
				message: "Could not verify this access target"
			} };
		} catch (t) {
			return { error: {
				action: "input",
				label: "Access target",
				targetUri: e,
				message: t instanceof Error && t.message.trim() ? t.message : "Could not verify this access target"
			} };
		}
	}
	dedupePendingAccessGrants(e) {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(`${n.subjectType}:${n.subjectValue}`, n);
		return [...t.values()];
	}
}, {e: [ie, oe, K, se, le, de, pe, he, _e, ye, xe, Ce, Te, De, ke, je, Ne, ee], c: [$, te]} = Re(D, [
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
		G,
		1,
		"principalInputValue"
	],
	[
		q,
		1,
		"addAccessRoleValue"
	],
	[
		ce,
		1,
		"authenticatedAccessRoleValue"
	],
	[
		ue,
		1,
		"publicAccessRoleValue"
	],
	[
		fe,
		1,
		"submitting"
	],
	[
		me,
		1,
		"pendingAccessGrants"
	],
	[
		ge,
		1,
		"accessGrantDrafts"
	],
	[
		ve,
		1,
		"errors"
	],
	[
		be,
		1,
		"successfulChangesRefreshed"
	],
	[
		Se,
		1,
		"accessContext"
	],
	[
		we,
		1,
		"accessContextLoading"
	],
	[
		Ee,
		1,
		"accessContextError"
	],
	[
		Oe,
		1,
		"containerScope"
	],
	[
		Ae,
		1,
		"advancedSharingOpen"
	],
	[
		Me,
		1,
		"protectedTarget"
	]
], ne, 0, void 0, o), D), E = class extends He {
	constructor() {
		super($), Z(this, "styles", p), te();
	}
}, Z(E, Pe, void 0), E)();
export { $ as default };

//# sourceMappingURL=AccessControlModal.esm.js.map