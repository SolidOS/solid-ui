import { label as e } from "../../utils/label.esm.js";
import { error as t } from "../../lib/debug.esm.js";
import { customElement as n } from "../../lib/components/decorators.esm.js";
import r from "../../lib/components/dialog-component/DialogComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../button/index.esm.js";
import "../dialog/index.esm.js";
import "../dialog-content/index.esm.js";
import "../dialog-footer/index.esm.js";
import "../combobox/index.esm.js";
import "../combobox-option/index.esm.js";
import "../../_virtual/~icons/lucide/circle-x.esm.js";
import "./AccessControlSharedAccess.esm.js";
import "./AccessControlGeneralAccess.esm.js";
import "./AccessControlErrors.esm.js";
import i from "./AccessControlModal.styles.esm.js";
import { dedupeByKey as a } from "./helpers.esm.js";
import { createAccessGrantDrafts as o, getAccessGrantIds as s, getAccessGrantViewModels as c, getAuthenticatedAccessRole as l, getAuthorizationSubjectLabel as u, getChangedAccessGrants as d, getPublicAccessRole as f, getSharedAuthorization as p } from "./accessGrantDrafts.esm.js";
import { accessPrincipalOptionsProvider as m, resolveAccessTarget as h } from "./accessTargetResolver.esm.js";
import { applyAccessChanges as g } from "./applyAccessChanges.esm.js";
import { buildAccessChanges as _ } from "./buildAccessChanges.esm.js";
import { sym as v } from "rdflib";
import { Authenticated as y, Public as b, solidLogicSingleton as x } from "solid-logic";
import { html as S } from "lit";
import { property as C, state as w } from "lit/decorators.js";
//#region src/components/access-control-modal/AccessControlModal.ts
var T, E, D, O, k, A, j, M, N, P, F, I, L, ee, te, ne, re, ie, ae, oe, R, z, B, V, H, U, W, G, K, q, se, ce, le, J, ue, de, fe, pe, me, he;
function Y(e, t, n) {
	ge(e, t), t.set(e, n);
}
function ge(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function X(e, t, n) {
	return e.set(_e(e, t), n), n;
}
function Z(e, t) {
	return e.get(_e(e, t));
}
function _e(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function Q(e, t, n) {
	return (t = ye(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ve(e, t, n, r, i, a) {
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
				get: xe(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || xe(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return Se(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : ye(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function ye(e) {
	var t = be(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function be(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function xe(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function Se(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Ce(e) {
	return e;
}
function we(e) {
	return e != null;
}
ne = [n("solid-ui-access-control-modal")];
var $;
new (me = (D = /*#__PURE__*/ new WeakMap(), O = /*#__PURE__*/ new WeakMap(), k = /*#__PURE__*/ new WeakMap(), A = /*#__PURE__*/ new WeakMap(), j = /*#__PURE__*/ new WeakMap(), M = /*#__PURE__*/ new WeakMap(), N = /*#__PURE__*/ new WeakMap(), P = /*#__PURE__*/ new WeakMap(), F = /*#__PURE__*/ new WeakMap(), I = /*#__PURE__*/ new WeakMap(), L = /*#__PURE__*/ new WeakMap(), he = (re = C({ attribute: !1 }), ae = C({ attribute: !1 }), R = w(), B = w(), H = w(), W = w(), K = w(), se = w(), le = w(), ue = w(), fe = w(), "subjectUri"), E = class extends r {
	constructor(...e) {
		super(...e), Y(this, D, (ee(this), ie(this, void 0))), Y(this, O, oe(this, void 0)), Y(this, k, z(this, "")), Y(this, A, V(this, "Viewer")), Y(this, j, U(this, "No Access")), Y(this, M, G(this, "No Access")), Y(this, N, q(this, !1)), Y(this, P, ce(this, [])), Y(this, F, J(this, [])), Y(this, I, de(this, [])), Y(this, L, pe(this, !0)), Q(this, "accessGrantLabelRequestVersion", 0);
	}
	get [he]() {
		return Z(D, this);
	}
	set subjectUri(e) {
		X(D, this, e);
	}
	get accessGrants() {
		return Z(O, this);
	}
	set accessGrants(e) {
		X(O, this, e);
	}
	get principalInputValue() {
		return Z(k, this);
	}
	set principalInputValue(e) {
		X(k, this, e);
	}
	get addAccessRoleValue() {
		return Z(A, this);
	}
	set addAccessRoleValue(e) {
		X(A, this, e);
	}
	get authenticatedAccessRoleValue() {
		return Z(j, this);
	}
	set authenticatedAccessRoleValue(e) {
		X(j, this, e);
	}
	get publicAccessRoleValue() {
		return Z(M, this);
	}
	set publicAccessRoleValue(e) {
		X(M, this, e);
	}
	get submitting() {
		return Z(N, this);
	}
	set submitting(e) {
		X(N, this, e);
	}
	get pendingAccessGrants() {
		return Z(P, this);
	}
	set pendingAccessGrants(e) {
		X(P, this, e);
	}
	get accessGrantDrafts() {
		return Z(F, this);
	}
	set accessGrantDrafts(e) {
		X(F, this, e);
	}
	get errors() {
		return Z(I, this);
	}
	set errors(e) {
		X(I, this, e);
	}
	get successfulChangesRefreshed() {
		return Z(L, this);
	}
	set successfulChangesRefreshed(e) {
		X(L, this, e);
	}
	disconnectedCallback() {
		this.accessGrantLabelRequestVersion++, this.errors = [], super.disconnectedCallback();
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
			let e = this.accessGrants ?? [];
			this.accessGrantDrafts = o(e), this.authenticatedAccessRoleValue = l(e), this.publicAccessRoleValue = f(e);
		}
	}
	updated(e) {
		super.updated(e), e.has("accessGrants") && this.refreshAccessGrantLabels().catch((e) => {
			t("Failed to refresh access grant labels", e);
		});
	}
	async refreshAccessGrantLabels() {
		let e = ++this.accessGrantLabelRequestVersion, t = this.accessGrants ?? [];
		if (!t.length) {
			this.accessGrantDrafts = [];
			return;
		}
		let n = await Promise.all(t.map(async (e) => (await Promise.all(e.agentGroup.map(async (e) => {
			try {
				await x.store.fetcher.load(v(e).doc());
			} catch {}
		})), u(p(e)))));
		if (e === this.accessGrantLabelRequestVersion && this.accessGrants === t) {
			let e = new Map(s(t).map((e, t) => [e, n[t]]));
			this.accessGrantDrafts = this.accessGrantDrafts.map((t) => ({
				...t,
				subjectLabel: e.get(t.id) ?? t.subjectLabel
			}));
		}
	}
	getDialogTitle() {
		let t = this.subjectUri ? v(this.subjectUri) : void 0, n = t ? e(t).trim() : "";
		return !n || n === "this resource" ? "Share this resource" : `Share "${n}"`;
	}
	render() {
		let e = this.getDialogTitle();
		return S`
      <solid-ui-dialog title=${e}>
        <form @submit=${this.onSubmit}>
          <solid-ui-dialog-content>
            <solid-ui-access-control-add-access
              .principalInputValue=${this.principalInputValue}
              .addAccessRoleValue=${this.addAccessRoleValue}
              .pendingAccessGrants=${this.pendingAccessGrants}
              .inputError=${this.inputError}
              .asyncOptionsProvider=${m}
              @target-input=${this.onPrincipalInput}
              @target-selected=${this.onPrincipalSelect}
              @role-changed=${this.onAddAccessRoleInput}
              @pending-grant-removed=${this.onPendingGrantRemoved}
            ></solid-ui-access-control-add-access>
            <solid-ui-access-control-shared-access
              .accessGrantViewModels=${c(this.accessGrantDrafts)}
              @access-grant-role-changed=${this.onAccessGrantRoleInput}
            ></solid-ui-access-control-shared-access>
            <solid-ui-access-control-general-access
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
                ?disabled=${!this.hasUnsavedChanges() || this.submitting || this.saveErrors.length > 0}
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
		e.preventDefault(), !this.submitting && await this.commitPrincipalFromInputSafely();
	}
	async onSaveClick() {
		this.submitting || (!this.principalInputValue.trim() || await this.commitPrincipalFromInputSafely()) && await this.saveAccessChanges();
	}
	onCancelClick() {
		this.close();
	}
	async saveAccessChanges() {
		if (this.submitting) return;
		let e = d(this.accessGrantDrafts), n = this.getGeneralAccessChanges();
		if ((this.pendingAccessGrants.length || e.length || n.length) && this.subjectUri) {
			this.submitting = !0, this.errors = this.errors.filter((e) => e.action === "input"), this.successfulChangesRefreshed = !0;
			try {
				let r = _({
					pendingAccessGrants: this.pendingAccessGrants,
					generalAccessChanges: n,
					changedAccessGrants: e
				}), i = await g(this.subjectUri, r);
				if (i.length) {
					this.errors = [...this.errors, ...i], this.principalInputValue = "", this.pendingAccessGrants = [];
					try {
						this.accessGrants = await x.acl.findAccessGrants(this.subjectUri);
					} catch (e) {
						this.successfulChangesRefreshed = !1, this.errors = [...this.errors, {
							action: "save",
							targetUri: this.subjectUri,
							label: "Shared with list",
							message: e instanceof Error ? e.message : "Unable to refresh the access list."
						}], t("Failed to refresh access grants after save errors", e);
					}
					t("Failed to save some access changes", i);
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
		this.principalInputValue = e.detail.value, this.clearInputError();
	}
	onPrincipalSelect(e) {
		this.queuePendingPrincipal(e.detail.value, this.addAccessRoleValue, e.detail.label);
	}
	getGeneralAccessChanges() {
		if (!this.subjectUri) return [];
		let e = this.accessGrants ?? [], t = l(e), n = f(e);
		return [this.authenticatedAccessRoleValue === t ? void 0 : {
			subject: y,
			role: this.authenticatedAccessRoleValue,
			label: "Authenticated users"
		}, this.publicAccessRoleValue === n ? void 0 : {
			subject: b,
			role: this.publicAccessRoleValue,
			label: "Public"
		}].filter(we);
	}
	onAddAccessRoleInput(e) {
		this.addAccessRoleValue = e.detail.role, this.pendingAccessGrants = this.pendingAccessGrants.map((t) => ({
			...t,
			role: e.detail.role
		}));
	}
	onAuthenticatedAccessRoleInput(e) {
		this.authenticatedAccessRoleValue = e.detail.role;
	}
	onPublicAccessRoleInput(e) {
		this.publicAccessRoleValue = e.detail.role;
	}
	onAccessGrantRoleInput(e) {
		this.accessGrantDrafts = this.accessGrantDrafts.map((t) => t.id === e.detail.id ? {
			...t,
			role: e.detail.role
		} : t);
	}
	onPendingGrantRemoved(e) {
		this.pendingAccessGrants = this.pendingAccessGrants.filter((t, n) => n !== e.detail.index);
	}
	hasUnsavedChanges() {
		return !!(this.pendingAccessGrants.length || this.principalInputValue.trim() || d(this.accessGrantDrafts).length || this.getGeneralAccessChanges().length);
	}
	async commitPrincipalFromInput() {
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
	async queuePendingPrincipal(e, n = this.addAccessRoleValue, r, i) {
		let a = i ?? this.principalInputValue.trim(), o = await this.createPendingAccessGrant(e, n, r);
		if ("error" in o) return this.principalInputValue.trim() === a && this.setInputError(o.error), t("Failed to add access grant:", o.error.message), !1;
		let s = [...this.pendingAccessGrants, o.grant];
		return this.pendingAccessGrants = this.dedupePendingAccessGrants(s), this.principalInputValue.trim() === a && (this.clearInputError(), this.principalInputValue = ""), !0;
	}
	async createPendingAccessGrant(e, t = this.addAccessRoleValue, n) {
		try {
			let r = e.trim(), i = await h(r, n);
			return i ? { grant: {
				subjectType: i.subjectType,
				subjectValue: i.subjectValue,
				role: t,
				label: i.label
			} } : { error: {
				action: "input",
				label: "Access target",
				targetUri: r,
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
		return a(e, (e) => `${e.subjectType}:${e.subjectValue}`);
	}
}, {e: [ie, oe, z, V, U, G, q, ce, J, de, pe, ee], c: [$, te]} = ve(E, [
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
		R,
		1,
		"principalInputValue"
	],
	[
		B,
		1,
		"addAccessRoleValue"
	],
	[
		H,
		1,
		"authenticatedAccessRoleValue"
	],
	[
		W,
		1,
		"publicAccessRoleValue"
	],
	[
		K,
		1,
		"submitting"
	],
	[
		se,
		1,
		"pendingAccessGrants"
	],
	[
		le,
		1,
		"accessGrantDrafts"
	],
	[
		ue,
		1,
		"errors"
	],
	[
		fe,
		1,
		"successfulChangesRefreshed"
	]
], ne, 0, void 0, r), E), T = class extends Ce {
	constructor() {
		super($), Q(this, "styles", i), te();
	}
}, Q(T, me, void 0), T)();
//#endregion
export { $ as default };

//# sourceMappingURL=AccessControlModal.esm.js.map