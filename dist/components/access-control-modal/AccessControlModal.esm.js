import { label as e } from "../../utils/label.esm.js";
import { error as t } from "../../lib/debug.esm.js";
import { customElement as n } from "../../lib/components/decorators.esm.js";
import r from "../../lib/components/dialog-component/DialogComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../../_virtual/~icons/lucide/x.esm.js";
import "../button/index.esm.js";
import "../dialog/index.esm.js";
import "../dialog-content/index.esm.js";
import "../dialog-footer/index.esm.js";
import "../combobox/index.esm.js";
import "../combobox-option/index.esm.js";
import "../../_virtual/~icons/lucide/circle-x.esm.js";
import "../../_virtual/~icons/lucide/folder.esm.js";
import "../../_virtual/~icons/lucide/folder-open.esm.js";
import "./AccessControlSharedAccess.esm.js";
import "./AccessControlGeneralAccess.esm.js";
import "./AccessControlErrors.esm.js";
import i from "./AccessControlModal.styles.esm.js";
import { createAccessGrantDrafts as a, getAccessGrantIds as o, getAccessGrantViewModels as s, getAuthenticatedAccessRole as c, getAuthorizationSubjectLabel as l, getChangedAccessGrants as u, getPublicAccessRole as d, getSharedAuthorization as f } from "./accessGrantDrafts.esm.js";
import { accessPrincipalOptionsProvider as p, resolveAccessTarget as m } from "./accessTargetResolver.esm.js";
import { applyAccessChanges as h } from "./applyAccessChanges.esm.js";
import { buildAccessChanges as g } from "./buildAccessChanges.esm.js";
import { sym as _ } from "rdflib";
import { Authenticated as v, Public as y, analyzeContainerAccessScope as b, filterAuthorizationsByContainerScope as x, solidLogicSingleton as S } from "solid-logic";
import { html as C } from "lit";
import { property as w, state as T } from "lit/decorators.js";
// src/components/access-control-modal/AccessControlModal.ts
var E, D, O, k, A, j, M, N, P, F, I, L, R, z, B, V, H, U, W, G, ee, te, ne, re, ie, ae, oe, K, q, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee, De, Oe, ke, Ae, je, Me, Ne, Pe, Fe, J, Ie, Le;
function Y(e, t, n) {
	Re(e, t), t.set(e, n);
}
function Re(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function X(e, t, n) {
	return e.set(ze(e, t), n), n;
}
function Z(e, t) {
	return e.get(ze(e, t));
}
function ze(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function Q(e, t, n) {
	return (t = Ve(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Be(e, t, n, r, i, a) {
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
				get: Ue(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Ue(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return We(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : Ve(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function Ve(e) {
	var t = He(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function He(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ue(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function We(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Ge(e) {
	return e;
}
function Ke(e) {
	return e != null;
}
ne = [n("solid-ui-access-control-modal")];
var $;
new (Ie = (O = /*#__PURE__*/ new WeakMap(), k = /*#__PURE__*/ new WeakMap(), A = /*#__PURE__*/ new WeakMap(), j = /*#__PURE__*/ new WeakMap(), M = /*#__PURE__*/ new WeakMap(), N = /*#__PURE__*/ new WeakMap(), P = /*#__PURE__*/ new WeakMap(), F = /*#__PURE__*/ new WeakMap(), I = /*#__PURE__*/ new WeakMap(), L = /*#__PURE__*/ new WeakMap(), R = /*#__PURE__*/ new WeakMap(), z = /*#__PURE__*/ new WeakMap(), B = /*#__PURE__*/ new WeakMap(), V = /*#__PURE__*/ new WeakMap(), H = /*#__PURE__*/ new WeakMap(), U = /*#__PURE__*/ new WeakMap(), W = /*#__PURE__*/ new WeakMap(), G = /*#__PURE__*/ new WeakMap(), Le = (re = w({ attribute: !1 }), ae = w({ attribute: !1 }), K = T(), se = T(), le = T(), de = T(), pe = T(), he = T(), _e = T(), ye = T(), xe = T(), Ce = T(), Te = T(), De = T(), ke = T(), je = T(), Ne = T(), Fe = T(), "subjectUri"), D = class extends r {
	constructor(...e) {
		super(...e), Y(this, O, (ee(this), ie(this, void 0))), Y(this, k, oe(this, void 0)), Y(this, A, q(this, "")), Y(this, j, ce(this, "Viewer")), Y(this, M, ue(this, "No Access")), Y(this, N, fe(this, "No Access")), Y(this, P, me(this, !1)), Y(this, F, ge(this, [])), Y(this, I, ve(this, [])), Y(this, L, be(this, [])), Y(this, R, Se(this, !0)), Y(this, z, we(this)), Y(this, B, Ee(this, !1)), Y(this, V, Oe(this, "")), Y(this, H, Ae(this, !1)), Y(this, U, Me(this, "folder+contents")), Y(this, W, Pe(this)), Y(this, G, J(this, !1)), Q(this, "accessGrantLabelRequestVersion", 0), Q(this, "accessContextRequestVersion", 0), Q(this, "accessContextSubjectUri", void 0);
	}
	get [Le]() {
		return Z(O, this);
	}
	set subjectUri(e) {
		X(O, this, e);
	}
	get accessGrants() {
		return Z(k, this);
	}
	set accessGrants(e) {
		X(k, this, e);
	}
	get principalInputValue() {
		return Z(A, this);
	}
	set principalInputValue(e) {
		X(A, this, e);
	}
	get addAccessRoleValue() {
		return Z(j, this);
	}
	set addAccessRoleValue(e) {
		X(j, this, e);
	}
	get authenticatedAccessRoleValue() {
		return Z(M, this);
	}
	set authenticatedAccessRoleValue(e) {
		X(M, this, e);
	}
	get publicAccessRoleValue() {
		return Z(N, this);
	}
	set publicAccessRoleValue(e) {
		X(N, this, e);
	}
	get submitting() {
		return Z(P, this);
	}
	set submitting(e) {
		X(P, this, e);
	}
	get pendingAccessGrants() {
		return Z(F, this);
	}
	set pendingAccessGrants(e) {
		X(F, this, e);
	}
	get accessGrantDrafts() {
		return Z(I, this);
	}
	set accessGrantDrafts(e) {
		X(I, this, e);
	}
	get errors() {
		return Z(L, this);
	}
	set errors(e) {
		X(L, this, e);
	}
	get successfulChangesRefreshed() {
		return Z(R, this);
	}
	set successfulChangesRefreshed(e) {
		X(R, this, e);
	}
	get accessContext() {
		return Z(z, this);
	}
	set accessContext(e) {
		X(z, this, e);
	}
	get accessContextLoading() {
		return Z(B, this);
	}
	set accessContextLoading(e) {
		X(B, this, e);
	}
	get accessContextError() {
		return Z(V, this);
	}
	set accessContextError(e) {
		X(V, this, e);
	}
	get advancedSharingOpen() {
		return Z(H, this);
	}
	set advancedSharingOpen(e) {
		X(H, this, e);
	}
	get containerScope() {
		return Z(U, this);
	}
	set containerScope(e) {
		X(U, this, e);
	}
	get containerScopeAnalysis() {
		return Z(W, this);
	}
	set containerScopeAnalysis(e) {
		X(W, this, e);
	}
	get protectedTarget() {
		return Z(G, this);
	}
	set protectedTarget(e) {
		X(G, this, e);
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
		if (super.willUpdate(e), e.has("accessGrants")) {
			let e = this.getScopedAccessGrants();
			this.accessGrantDrafts = a(e), this.authenticatedAccessRoleValue = c(e), this.publicAccessRoleValue = d(e);
		}
	}
	updated(e) {
		super.updated(e), e.has("subjectUri") && this.loadAccessContext().catch((e) => {
			t("Failed to load access control context", e);
		}), e.has("accessGrants") && this.refreshAccessGrantLabels().catch((e) => {
			t("Failed to refresh access grant labels", e);
		}), e.has("accessContext") && !e.has("subjectUri") && this.refreshContainerScopeAnalysis();
	}
	refreshContainerScopeAnalysis() {
		this.isContainer() && this.accessContext ? (this.containerScopeAnalysis = b(this.accessContext), this.containerScope = this.containerScopeAnalysis.primaryScope, this.refreshScopedAccessGrantDrafts()) : this.containerScopeAnalysis = void 0;
	}
	async refreshAccessGrantLabels() {
		let e = ++this.accessGrantLabelRequestVersion, t = this.accessGrants, n = this.subjectUri, r = this.getSelectedContainerScope(), i = this.getScopedAccessGrants(r);
		if (!i.length) {
			this.accessGrantDrafts = [];
			return;
		}
		let a = await Promise.all(i.map(async (e) => (await Promise.all(e.agentGroup.map(async (e) => {
			try {
				await S.store.fetcher.load(_(e).doc());
			} catch {}
		})), l(f(e)))));
		if (e === this.accessGrantLabelRequestVersion && this.accessGrants === t && this.subjectUri === n && this.getSelectedContainerScope() === r) {
			let e = new Map(o(i).map((e, t) => [e, a[t]]));
			this.accessGrantDrafts = this.accessGrantDrafts.map((t) => ({
				...t,
				subjectLabel: e.get(t.id) ?? t.subjectLabel
			}));
		}
	}
	getDialogTitle() {
		let t = this.subjectUri ? _(this.subjectUri) : void 0, n = t ? e(t).trim() : "";
		return !n || n === "this resource" ? "Manage Access of \"this resource\"" : `Manage Access of "${n}"`;
	}
	isContainer() {
		return !!(this.subjectUri && new URL(this.subjectUri).pathname.endsWith("/"));
	}
	async loadAccessContext() {
		let e = ++this.accessContextRequestVersion, n = this.subjectUri;
		if (this.accessContext = void 0, this.accessContextSubjectUri = void 0, this.accessContextError = "", this.accessContextLoading = !!n, !n) this.accessContextLoading = !1;
		else try {
			let t = await S.acl.findEffectiveAcl(n);
			if (e !== this.accessContextRequestVersion || this.subjectUri !== n) return;
			this.accessContext = t, this.accessContextSubjectUri = n, this.accessContext?.inherited && !this.accessGrants?.length && (this.accessGrants = this.accessContext.authorizations), this.refreshContainerScopeAnalysis(), this.protectedTarget = S.acl.isProtectedResource(n), this.protectedTarget && this.refreshScopedAccessGrantDrafts();
		} catch (r) {
			if (e !== this.accessContextRequestVersion || this.subjectUri !== n) return;
			this.accessContextError = r instanceof Error && r.message.trim() ? r.message : "Unable to load access settings for this resource.", t("Failed to load access control context", r);
		} finally {
			e === this.accessContextRequestVersion && this.subjectUri === n && (this.accessContextLoading = !1);
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
	renderSharingInformation() {
		if (!this.accessContext) return C``;
		let t = !this.accessContext.inherited, n = this.accessContext?.effectiveContainer, r = n ? e(_(n)).trim() : "", i = r && r !== n ? C`<strong>${r}</strong> (${n})` : C`<strong>${n ?? "the parent container"}</strong>`;
		return C`
      <div class="access-control-sharing-state-panel">
        ${t ? C`
            <div class="access-control-sharing-state-custom-row">
              <p>This resource has its own sharing settings.</p>
              ${this.protectedTarget ? C`` : C`
                  <solid-ui-button
                    type="button"
                    variant="tertiary"
                    aria-label="Reset custom sharing to default"
                    @click=${this.onResetToDefault}
                  >
                    Reset to default
                  </solid-ui-button>
                `}
            </div>
          ` : n ? C`<p>This resource inherits sharing settings from ${i}.</p>` : C`<p>This resource inherits sharing settings, but no inherited default is available.</p>`}
        ${this.protectedTarget ? C`<p class="access-control-sharing-state-protected-message">This is a protected storage resource. Its primary access-control settings cannot be reset here.</p>` : C``}
      </div>
    `;
	}
	renderSharingState() {
		return !this.accessContext || !this.advancedSharingOpen ? C`` : C`
      <section
        class="access-control-sharing-state"
        aria-labelledby="access-control-advanced-sharing-heading"
      >
        ${this.renderSharingInformation()}
        ${this.renderAdvancedSharing()}
      </section>
    `;
	}
	getSelectedContainerScope() {
		return this.containerScope;
	}
	hasMixedContainerPolicy() {
		return this.isContainer() && this.containerScopeAnalysis?.mixed === !0;
	}
	renderAccessContextState() {
		return this.accessContextLoading ? C`<p role="status">Loading access settings...</p>` : this.accessContextError ? C`
        <solid-ui-error-state
          title="Could not load access settings"
          message=${this.accessContextError}
        >
          <solid-ui-button type="button" variant="secondary" @click=${this.retryAccessContext}>
            Retry
          </solid-ui-button>
        </solid-ui-error-state>
      ` : this.accessContext ? C`` : C`<p role="status">Access settings are not ready yet.</p>`;
	}
	renderMixedContainerWarning() {
		return this.hasMixedContainerPolicy() ? C`
      <div class="access-control-mixed-policy-warning" role="alert">
        <strong>This container has different access settings for the folder and its contents.</strong>
        <span>Changing this mixed policy is an advanced feature and will be available in the next release. Access changes are disabled for now.</span>
      </div>
    ` : C``;
	}
	getScopedAccessGrants(e = this.getSelectedContainerScope()) {
		let t = this.accessGrants ?? [];
		return !this.isContainer() || !this.subjectUri || this.protectedTarget ? t : x(this.subjectUri, t, e, this.accessContext?.inherited ?? !1);
	}
	refreshScopedAccessGrantDrafts() {
		let e = this.getScopedAccessGrants();
		this.accessGrantDrafts = a(e), this.authenticatedAccessRoleValue = c(e), this.publicAccessRoleValue = d(e);
	}
	selectContainerScope(e) {
		this.containerScope = e, this.refreshScopedAccessGrantDrafts();
	}
	renderAdvancedSharing() {
		return this.advancedSharingOpen ? C`
      <section
        id="access-control-advanced-sharing"
        class="access-control-advanced-sharing"
        role="group"
        aria-labelledby="access-control-advanced-sharing-heading"
        aria-describedby="access-control-advanced-sharing-description"
      >
        <h2 id="access-control-advanced-sharing-heading">Advanced sharing</h2>
        <p id="access-control-advanced-sharing-description">
          <span class="access-control-advanced-sharing-description-line">Use this option when the folder and its contents have different access requirements.</span>
          <span class="access-control-advanced-sharing-description-line">Choose which access settings to edit.</span>
          <span class="access-control-advanced-sharing-description-line">Save Changes applies your current edits only to that scope.</span>
        </p>
        ${this.isContainer() ? C`
            <button
              type="button"
              class="access-control-same-access-toggle"
              role="switch"
              aria-checked=${this.containerScope === "folder+contents" ? "true" : "false"}
              @click=${() => {
			let e = this.containerScope !== "folder+contents";
			this.selectContainerScope(e ? "folder+contents" : this.containerScope === "contents" ? "contents" : "folder");
		}}
            >
              <span class="access-control-switch-track" aria-hidden="true">
                <span class="access-control-switch-thumb"></span>
              </span>
              <span>Use the same access for this folder and its contents</span>
            </button>
            <div class="access-control-advanced-sharing-options">
              <solid-ui-button
                type="button"
                variant=${this.containerScope === "folder" ? "primary" : "secondary"}
                aria-pressed=${this.containerScope === "folder" ? "true" : "false"}
                @click=${() => {
			this.selectContainerScope("folder");
		}}
              >
                Folder Only
              </solid-ui-button>
              <solid-ui-button
                type="button"
                variant=${this.containerScope === "contents" ? "primary" : "secondary"}
                aria-pressed=${this.containerScope === "contents" ? "true" : "false"}
                @click=${() => {
			this.selectContainerScope("contents");
		}}
              >
                Contents Only
              </solid-ui-button>
            </div>
          ` : C``}
        <div class="access-control-advanced-sharing-actions">
          <solid-ui-button
            type="button"
            variant="ghost"
            aria-label="Close advanced sharing"
            title="Close advanced sharing"
            @click=${this.closeAdvancedSharing}
          >
            <icon-lucide-x slot="icon" aria-hidden="true"></icon-lucide-x>
            <span class="sr-only">Close</span>
          </solid-ui-button>
        </div>
      </section>
    ` : C``;
	}
	render() {
		let e = this.getDialogTitle();
		return C`
      <solid-ui-dialog title=${e}>
        <form @submit=${this.onSubmit}>
          <solid-ui-dialog-content>
            ${this.renderAccessContextState()}
            ${this.renderMixedContainerWarning()}
          <solid-ui-access-control-add-access
              .disabled=${!this.canMutate() || this.hasMixedContainerPolicy()}
              .principalInputValue=${this.principalInputValue}
              .addAccessRoleValue=${this.addAccessRoleValue}
              .pendingAccessGrants=${this.pendingAccessGrants}
              .inputError=${this.inputError}
              .asyncOptionsProvider=${p}
              @target-input=${this.onPrincipalInput}
              @target-selected=${this.onPrincipalSelect}
              @role-changed=${this.onAddAccessRoleInput}
              @pending-grant-removed=${this.onPendingGrantRemoved}
            ></solid-ui-access-control-add-access>
            <solid-ui-access-control-shared-access
              .disabled=${!this.canMutate() || this.hasMixedContainerPolicy()}
              .accessGrantViewModels=${s(this.accessGrantDrafts)}
              @access-grant-role-changed=${this.onAccessGrantRoleInput}
            ></solid-ui-access-control-shared-access>
            <solid-ui-access-control-general-access
              .disabled=${!this.canMutate() || this.hasMixedContainerPolicy()}
              .subjectUri=${this.subjectUri}
              .authenticatedAccessRoleValue=${this.authenticatedAccessRoleValue}
              .publicAccessRoleValue=${this.publicAccessRoleValue}
              @authenticated-role-changed=${this.onAuthenticatedAccessRoleInput}
              @public-role-changed=${this.onPublicAccessRoleInput}
            ></solid-ui-access-control-general-access>
            <solid-ui-access-control-errors
              .errors=${this.saveErrors}
              .successfulChangesRefreshed=${this.successfulChangesRefreshed}
              @close=${this.onCancelClick}
            ></solid-ui-access-control-errors>
            ${this.renderSharingState()}
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
                ?disabled=${!this.canMutate() || !this.hasUnsavedChanges() || this.submitting || this.saveErrors.length > 0 || this.hasMixedContainerPolicy()}
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
		e.preventDefault(), this.submitting || this.hasMixedContainerPolicy() || this.isConnected && !await this.ensureAccessContext() || await this.commitPrincipalFromInputSafely();
	}
	async onSaveClick() {
		if (this.submitting || this.hasMixedContainerPolicy() || this.isConnected && !await this.ensureAccessContext() || this.principalInputValue.trim() && !await this.commitPrincipalFromInputSafely()) return;
		let e = this.isContainer() && !this.protectedTarget ? this.getSelectedContainerScope() : "file";
		await this.saveAccessChanges(e === "folder" ? "container" : e);
	}
	onCancelClick() {
		this.close();
	}
	closeAdvancedSharing() {
		this.advancedSharingOpen = !1;
	}
	async onResetToDefault() {
		if (this.subjectUri && this.canMutate() && this.accessContext && !this.accessContext.inherited && !this.submitting && !this.hasMixedContainerPolicy()) {
			this.submitting = !0, this.errors = this.errors.filter((e) => e.action === "input");
			try {
				await S.acl.resetToDefault(this.subjectUri), await this.loadAccessContext();
				let e = await S.acl.findAccessGrants(this.subjectUri);
				this.accessGrants = this.accessContext?.inherited ? this.accessContext.authorizations : e;
			} catch (e) {
				this.errors = [...this.errors, {
					action: "reset",
					targetUri: this.subjectUri,
					label: "Custom sharing",
					message: e instanceof Error ? e.message : "Unable to reset sharing."
				}], t("Failed to reset access control", e);
			} finally {
				this.submitting = !1;
			}
		}
	}
	async saveAccessChanges(e = "file") {
		if (this.submitting || !this.canMutate() || this.hasMixedContainerPolicy()) return;
		let n = u(this.accessGrantDrafts), r = this.getGeneralAccessChanges();
		if ((this.pendingAccessGrants.length || n.length || r.length) && this.subjectUri) {
			this.submitting = !0, this.errors = this.errors.filter((e) => e.action === "input"), this.successfulChangesRefreshed = !0;
			try {
				let i = g({
					pendingAccessGrants: this.pendingAccessGrants,
					generalAccessChanges: r,
					changedAccessGrants: n
				}), a = await h(this.subjectUri, i, { containerScope: e });
				if (a.length) {
					this.errors = [...this.errors, ...a], this.principalInputValue = "", this.pendingAccessGrants = [];
					try {
						this.accessGrants = await S.acl.findAccessGrants(this.subjectUri);
					} catch (e) {
						this.successfulChangesRefreshed = !1, this.errors = [...this.errors, {
							action: "save",
							targetUri: this.subjectUri,
							label: "Shared with list",
							message: e instanceof Error ? e.message : "Unable to refresh the access list."
						}], t("Failed to refresh access grants after save errors", e);
					}
					t("Failed to save some access changes", a);
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
		this.canMutate() && !this.hasMixedContainerPolicy() && (this.principalInputValue = e.detail.value, this.clearInputError());
	}
	onPrincipalSelect(e) {
		this.canMutate() && !this.hasMixedContainerPolicy() && this.queuePendingPrincipal(e.detail.value, this.addAccessRoleValue, e.detail.label, void 0, e.detail.targetKind);
	}
	getGeneralAccessChanges() {
		if (!this.subjectUri) return [];
		let e = this.getScopedAccessGrants(), t = c(e), n = d(e);
		return [this.authenticatedAccessRoleValue === t ? void 0 : {
			subject: v,
			role: this.authenticatedAccessRoleValue,
			label: "Authenticated users"
		}, this.publicAccessRoleValue === n ? void 0 : {
			subject: y,
			role: this.publicAccessRoleValue,
			label: "Public"
		}].filter(Ke);
	}
	onAddAccessRoleInput(e) {
		this.canMutate() && !this.hasMixedContainerPolicy() && (this.addAccessRoleValue = e.detail.role, this.pendingAccessGrants = this.pendingAccessGrants.map((t) => ({
			...t,
			role: e.detail.role
		})));
	}
	onAuthenticatedAccessRoleInput(e) {
		this.canMutate() && !this.hasMixedContainerPolicy() && (this.authenticatedAccessRoleValue = e.detail.role);
	}
	onPublicAccessRoleInput(e) {
		this.canMutate() && !this.hasMixedContainerPolicy() && (this.publicAccessRoleValue = e.detail.role);
	}
	onAccessGrantRoleInput(e) {
		this.canMutate() && !this.hasMixedContainerPolicy() && (this.accessGrantDrafts = this.accessGrantDrafts.map((t) => t.id === e.detail.id ? {
			...t,
			role: e.detail.role
		} : t));
	}
	onPendingGrantRemoved(e) {
		this.canMutate() && !this.hasMixedContainerPolicy() && (this.pendingAccessGrants = this.pendingAccessGrants.filter((t, n) => n !== e.detail.index));
	}
	hasUnsavedChanges() {
		return !!(this.pendingAccessGrants.length || this.principalInputValue.trim() || u(this.accessGrantDrafts).length || this.getGeneralAccessChanges().length);
	}
	async commitPrincipalFromInput() {
		if (!this.canMutate() || this.hasMixedContainerPolicy()) return !1;
		let e = this.principalInputValue.trim();
		return e ? this.queuePendingPrincipal(e, this.addAccessRoleValue, void 0, e) : !1;
	}
	async commitPrincipalFromInputSafely() {
		let e = this.principalInputValue.trim();
		try {
			return await this.commitPrincipalFromInput();
		} catch (n) {
			return this.principalInputValue.trim() === e ? (this.setInputError({
				action: "input",
				label: "Access target",
				targetUri: this.principalInputValue.trim(),
				message: "We could not verify this access target. Check the value and try again."
			}), t("Failed to commit pending access grants", n), !1) : (t("Ignored stale access-target validation error", n), !1);
		}
	}
	async queuePendingPrincipal(e, n = this.addAccessRoleValue, r, i, a) {
		let o = i ?? this.principalInputValue.trim(), s = await this.createPendingAccessGrant(e, n, r, a);
		if ("error" in s) return this.principalInputValue.trim() === o && this.setInputError(s.error), t("Failed to add access grant:", s.error.message), !1;
		let c = [...this.pendingAccessGrants, s.grant];
		return this.pendingAccessGrants = this.dedupePendingAccessGrants(c), this.principalInputValue.trim() === o && (this.clearInputError(), this.principalInputValue = ""), !0;
	}
	async createPendingAccessGrant(e, t = this.addAccessRoleValue, n, r) {
		try {
			let i = e.trim(), a = await m(i, n);
			return a ? { grant: {
				subjectType: a.subjectType,
				subjectValue: a.subjectValue,
				role: t,
				label: a.label,
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
}, {e: [ie, oe, q, ce, ue, fe, me, ge, ve, be, Se, we, Ee, Oe, Ae, Me, Pe, J, ee], c: [$, te]} = Be(D, [
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
		K,
		1,
		"principalInputValue"
	],
	[
		se,
		1,
		"addAccessRoleValue"
	],
	[
		le,
		1,
		"authenticatedAccessRoleValue"
	],
	[
		de,
		1,
		"publicAccessRoleValue"
	],
	[
		pe,
		1,
		"submitting"
	],
	[
		he,
		1,
		"pendingAccessGrants"
	],
	[
		_e,
		1,
		"accessGrantDrafts"
	],
	[
		ye,
		1,
		"errors"
	],
	[
		xe,
		1,
		"successfulChangesRefreshed"
	],
	[
		Ce,
		1,
		"accessContext"
	],
	[
		Te,
		1,
		"accessContextLoading"
	],
	[
		De,
		1,
		"accessContextError"
	],
	[
		ke,
		1,
		"advancedSharingOpen"
	],
	[
		je,
		1,
		"containerScope"
	],
	[
		Ne,
		1,
		"containerScopeAnalysis"
	],
	[
		Fe,
		1,
		"protectedTarget"
	]
], ne, 0, void 0, r), D), E = class extends Ge {
	constructor() {
		super($), Q(this, "styles", i), te();
	}
}, Q(E, Ie, void 0), E)();
export { $ as default };

//# sourceMappingURL=AccessControlModal.esm.js.map