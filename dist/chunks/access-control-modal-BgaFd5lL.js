import { a as e, i as t, m as n, w as r } from "./index.esm-DuVwfs7W.js";
import { u as i } from "./style-DfjbIweW.js";
import { p as a } from "./widgets-CzLq6CRy.js";
import { c as o, g as s, i as c, o as l, p as u, r as d, u as f } from "./components-Bdqizu8x.js";
import { t as p } from "./query-BYu9q8lA.js";
import "./chevron-down-ujxRg3MD.js";
import "./dialog-BsH5KSvu.js";
import "./button-lol95DqR.js";
import "./dialog-content-jx08y2Oa.js";
import "./dialog-footer-Bhl8k1PX.js";
import { r as m } from "./combobox-CusD7f09.js";
import "./combobox-option-B-Hksiq2.js";
//#region ~icons/lucide/link
var h = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></g></svg>";
	}
};
customElements.get("icon-lucide-link") || customElements.define("icon-lucide-link", h);
//#endregion
//#region ~icons/lucide/globe
var g = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20\"/></g></svg>";
	}
};
customElements.get("icon-lucide-globe") || customElements.define("icon-lucide-globe", g);
//#endregion
//#region ~icons/lucide/book-user
var _ = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15 13a3 3 0 1 0-6 0\"/><path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\"/><circle cx=\"12\" cy=\"8\" r=\"2\"/></g></svg>";
	}
};
customElements.get("icon-lucide-book-user") || customElements.define("icon-lucide-book-user", _);
//#endregion
//#region ~icons/lucide/user-round
var v = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"8\" r=\"5\"/><path d=\"M20 21a8 8 0 0 0-16 0\"/></g></svg>";
	}
};
customElements.get("icon-lucide-user-round") || customElements.define("icon-lucide-user-round", v);
//#endregion
//#region ~icons/lucide/users
var y = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/></g></svg>";
	}
};
customElements.get("icon-lucide-users") || customElements.define("icon-lucide-users", y);
//#endregion
//#region ~icons/lucide/circle-x
var b = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m15 9l-6 6m0-6l6 6\"/></g></svg>";
	}
};
customElements.get("icon-lucide-circle-x") || customElements.define("icon-lucide-circle-x", b);
//#endregion
//#region src/components/access-control-modal/AccessControlModal.styles.css
var x = u`:host{& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);font-weight:600}& .access-grants-form{font-size:var(--solid-ui-font-size-sm,.875rem);--access-role-select-width:129px;flex-direction:column;align-self:stretch;align-items:flex-start;gap:10px;padding:10px;display:flex;& p{color:var(--solid-ui-color-gray-600,#4a5565);line-height:1.5}& .access-grants-form-main{align-self:stretch;align-items:flex-start;gap:10px;display:flex;& .access-grants-input{border:1px solid var(--solid-ui-color-slate-200,#e2e8f0);background:var(--solid-ui-color-white,#fff);border-radius:5px;flex-direction:column;flex:auto;align-items:flex-start;gap:12px;min-width:0;padding:10px 15px;display:flex;& solid-ui-combobox{--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0);width:100%}}}& .access-grants-pending{flex-wrap:wrap;align-items:center;gap:8px;min-height:42px;display:flex}& .access-grants-pending-item{border:1px solid var(--solid-ui-color-gray-300,#d1d5dc);background:var(--solid-ui-color-gray-50,#f9fafb);max-width:100%;color:var(--solid-ui-color-gray-700,#374151);border-radius:5px;align-items:center;gap:6px;padding:5px 10px;display:flex}& .access-grants-pending-item-label{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--solid-ui-color-gray-500,#6a7282);font-size:var(--solid-ui-font-size-xs,.75rem);line-height:1;overflow:hidden}& .access-grants-pending-item-remove{color:var(--solid-ui-color-gray-300,#d1d5dc);cursor:pointer;background:0 0;border:none;border-radius:999px;justify-content:center;align-items:center;padding:0;display:inline-flex}& .access-grants-pending-item-remove icon-lucide-circle-x{width:14px;height:14px}}& .access-grants-header,& .access-grants-list,& .access-grants-general{align-self:stretch;padding:0 10px}& .access-grants-header{justify-content:space-between;align-items:center;gap:15px;display:flex;& .access-grants-search-input{--solid-ui-input-border-color:transparent;flex:none;width:12ch;min-width:12ch}}& .access-grants-list{align-items:flex-start;gap:20px;display:flex;& ul{box-sizing:border-box;border:1px solid var(--solid-ui-color-gray-200,#e5e7eb);border-radius:10px;flex-direction:column;flex:1 0 0;align-items:flex-start;gap:15px;height:195px;min-height:0;padding:15px;display:flex;overflow:hidden auto}& li{flex:none;align-items:center;gap:10px;width:100%;display:flex;& .access-grants-image{aspect-ratio:1;width:30px;height:30px;color:var(--solid-ui-color-white,#fff);text-align:center;font-size:var(--solid-ui-font-size-xs,.75rem);border-radius:999px;flex:0 0 30px;justify-content:center;align-items:center;font-weight:500;display:flex;overflow:hidden;& img{object-fit:cover;border-radius:999px;width:100%;height:100%;display:flex}& span{justify-content:center;align-items:center;width:100%;height:100%;line-height:1;display:flex}}& .access-grants-image--group{background:var(--solid-ui-color-blue-900,#083575)}& .access-grants-image--agent,& .access-grants-image--agentClass{background:var(--solid-ui-color-lavender-300,#e6dcff)}& .access-grants-image--origin{background:var(--solid-ui-color-gray-200,#e5e7eb)}& .access-grants-image--unknown{background:var(--solid-ui-color-gray-300,#d1d5db)}& h3{min-width:0;color:var(--solid-ui-color-gray-800,#1e2939);font-size:var(--solid-ui-font-size-xs,.75rem);flex:auto;font-weight:600}& span{text-align:right;flex:none;margin-left:auto}& .access-grants-role{font-size:var(--solid-ui-font-size-xs,.75rem);flex:none;margin-left:auto}& .access-grants-role--owner{color:var(--solid-ui-color-gray-400,#99a1af);font-size:var(--solid-ui-font-size-xs,.75rem)}& .access-grants-role--editable{max-width:100%}}}& .access-grants-general{--access-role-select-width:110px;flex-direction:column;align-items:flex-start;gap:10px;display:flex;& solid-ui-combobox,& solid-ui-input{--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0)}& .access-grants-general-header{flex-direction:row;justify-content:space-between;align-self:stretch;align-items:center;gap:15px;display:flex}& .access-grants-general-share{align-self:stretch;align-items:center;gap:15px;display:flex;& .access-grants-general-share-content{flex-direction:row;flex:1 0 0;align-items:flex-start;gap:10px;display:flex;& .access-grants-general-share-icon{aspect-ratio:1;background:var(--solid-ui-color-violet-50,#f5f3ff);border-radius:50px;justify-content:center;align-items:center;width:30px;height:30px;padding:5px;display:flex}& .access-grants-general-share-icon-inner{aspect-ratio:1;flex-shrink:0;justify-content:center;align-items:center;width:20px;height:20px;padding:1.25px;display:flex;& icon-lucide-globe{aspect-ratio:1;flex-shrink:0;width:17.5px;height:17.5px}}& .access-grants-general-share-text{flex:auto;min-width:0;& .access-grants-general-share-text-title{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-sm,.875rem);font-weight:600}& .access-grants-general-share-text-description{color:var(--solid-ui-color-gray-700,#364153);font-size:var(--solid-ui-font-size-sm,.875rem)}}}}}& .access-role-select{max-width:100%;width:var(--access-role-select-width);--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0);flex:none;margin-top:25px;display:block}& .access-role-select--top{margin-top:0}& .access-role-select--compact{--solid-ui-input-border-color:transparent;flex:0 0 110px;width:110px;min-width:110px;max-width:100%;margin-top:0}& .access-grants-list li .access-role-select--compact{flex:0 0 110px;width:110px;min-width:110px}& .access-control-footer-actions{justify-content:flex-end;align-items:center;gap:15px;width:100%;display:flex;&>solid-ui-button{min-width:132px}}}`, S, C, w, T, E, D, O, k, A, j, M, N, P, F, ee, te, ne, re, ie, ae, oe, I, L, R, z, B, V, H, U, W, G, K, q, se, ce, J, le, ue, de, fe, pe, me, he;
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
ne = [s("solid-ui-access-control-modal")];
var $;
new (me = (w = /*#__PURE__*/ new WeakMap(), T = /*#__PURE__*/ new WeakMap(), E = /*#__PURE__*/ new WeakMap(), D = /*#__PURE__*/ new WeakMap(), O = /*#__PURE__*/ new WeakMap(), k = /*#__PURE__*/ new WeakMap(), A = /*#__PURE__*/ new WeakMap(), j = /*#__PURE__*/ new WeakMap(), M = /*#__PURE__*/ new WeakMap(), N = /*#__PURE__*/ new WeakMap(), P = /*#__PURE__*/ new WeakMap(), F = /*#__PURE__*/ new WeakMap(), he = (re = c({ attribute: !1 }), ae = c({ attribute: !1 }), I = d(), R = d(), B = d(), H = d(), W = d(), K = d(), se = d(), J = d(), ue = d(), fe = p("solid-ui-dialog"), "subjectUri"), C = class extends l {
	constructor(...n) {
		super(...n), Y(this, w, (ee(this), ie(this, void 0))), Y(this, T, oe(this, void 0)), Y(this, E, L(this, "")), Y(this, D, z(this, "Viewer")), Y(this, O, V(this, "No Access")), Y(this, k, U(this, "")), Y(this, A, G(this, !1)), Y(this, j, q(this, !1)), Y(this, M, ce(this, [])), Y(this, N, le(this, [])), Y(this, P, de(this, [])), Y(this, F, pe(this, null)), Q(this, "accessPrincipleOptionsProvider", m(async (n) => {
			let r = this.getPrincipleSearchTerm(n), i = this.isHttpUri(r) ? await this.createUrlOption(r) : void 0, a = this.dedupeComboboxOptions([i].filter((e) => !!e));
			if (r.length < 2) return a.length ? a : [{
				label: "Type at least 2 characters to search",
				value: "",
				selectable: !1
			}];
			let o = [];
			try {
				o = await t.directory.search({
					query: r,
					sources: e
				});
			} catch (e) {
				if (!i) throw e;
			}
			let s = o.map((e) => this.directoryEntryToOption(e));
			return [...a, ...s];
		}));
	}
	get [he]() {
		return Z(w, this);
	}
	set subjectUri(e) {
		X(w, this, e);
	}
	get accessGrants() {
		return Z(T, this);
	}
	set accessGrants(e) {
		X(T, this, e);
	}
	get principalInputValue() {
		return Z(E, this);
	}
	set principalInputValue(e) {
		X(E, this, e);
	}
	get addAccessRoleValue() {
		return Z(D, this);
	}
	set addAccessRoleValue(e) {
		X(D, this, e);
	}
	get sharedAccessRoleValue() {
		return Z(O, this);
	}
	set sharedAccessRoleValue(e) {
		X(O, this, e);
	}
	get searchValue() {
		return Z(k, this);
	}
	set searchValue(e) {
		X(k, this, e);
	}
	get failed() {
		return Z(A, this);
	}
	set failed(e) {
		X(A, this, e);
	}
	get submitting() {
		return Z(j, this);
	}
	set submitting(e) {
		X(j, this, e);
	}
	get pendingAccessGrants() {
		return Z(M, this);
	}
	set pendingAccessGrants(e) {
		X(M, this, e);
	}
	get accessGrantRoles() {
		return Z(N, this);
	}
	set accessGrantRoles(e) {
		X(N, this, e);
	}
	get accessGrantLabels() {
		return Z(P, this);
	}
	set accessGrantLabels(e) {
		X(P, this, e);
	}
	get dialog() {
		return Z(F, this);
	}
	set dialog(e) {
		X(F, this, e);
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
		let n = await Promise.all(e.map(async (e) => {
			let n = e.agentGroup[0];
			if (n) try {
				await t.store.fetcher.load(r(n).doc());
			} catch {}
			return this.getAuthorizationSubjectLabel(e);
		}));
		this.accessGrants === e && (this.accessGrantLabels = n);
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
		return f`
      <ul>
        ${t.length > 0 ? t.map(({ authorization: e, index: t }) => this.renderAccessGrant(e, t)) : f`<li>No access grants</li>`}
      </ul>
    `;
	}
	renderAccessGrant(e, t) {
		let n = this.getAuthorizationBadge(e), r = this.accessGrantRoles[t] ?? this.getAuthorizationRole(e), i = this.accessGrantLabels[t] ?? this.getAuthorizationSubjectLabel(e);
		return f`
      <li>
        ${this.renderAuthorizationBadge(n)}
        <h3>${i}</h3>
        ${this.renderAuthorizationRole(r, t)}  
      </li>
    `;
	}
	getAuthorizationBadge(e) {
		let t = e.agent[0];
		if (t) {
			let n = a(r(t));
			return {
				kind: "agent",
				image: n,
				text: n ? "" : this.getInitials(this.getAuthorizationSubjectLabel(e), 2)
			};
		}
		if (e.agentGroup[0]) return {
			kind: "group",
			text: this.getInitials(this.getAuthorizationSubjectLabel(e), 1)
		};
		let n = e.agentClass[0];
		if (n) {
			let t = a(r(n));
			return {
				kind: "agentClass",
				image: t,
				text: t ? "" : this.getInitials(this.getAuthorizationSubjectLabel(e), 2)
			};
		}
		return {
			kind: "unknown",
			text: "?"
		};
	}
	renderAuthorizationBadge(e) {
		return f`
      <div class="access-grants-image access-grants-image--${e.kind}">
        ${e.image ? f`<img src=${e.image} alt="" aria-hidden="true" />` : f`<span aria-hidden="true">${e.text}</span>`}
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
	getAuthorizationSubjectLabel(e) {
		let t = this.getAuthorizationSubjects(e);
		return t.length ? t.map((e) => i(r(e))).join(", ") : "Unknown access holder";
	}
	getAuthorizationRole(e) {
		return t.acl.roleFromModes(e.mode);
	}
	getRoleValueFromEvent(e, t = "Viewer") {
		let n = e.detail?.option?.value;
		if (typeof n == "string") return n;
		let r = e.currentTarget;
		return typeof r?.value == "string" ? r.value : t;
	}
	renderAuthorizationRole(e, t) {
		return e === "Owner" ? f`<span class="access-grants-role access-grants-role--owner">${e}</span>` : f`
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
		return f`
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
		return n.filter((e) => e !== "No Access").map((e) => f`
        <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
      `);
	}
	renderGeneralRoleOptions() {
		return n.map((e) => f`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `);
	}
	renderGrantRoleOptions() {
		return n.map((e) => f`
      <solid-ui-combobox-option value=${e}>${e === "No Access" ? "Remove" : e}</solid-ui-combobox-option>
    `);
	}
	renderAddAccessForm() {
		return f`
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
		return this.pendingAccessGrants.length ? f`
      <div class="access-grants-pending">
        ${this.pendingAccessGrants.map((e, t) => f`
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
    ` : o;
	}
	renderAccessGrantsSection() {
		let e = this.getAccessGrantSearchOptions();
		return f`
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
          ${e.map((e) => f`
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
		return f`
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
		return f`
      <div class="access-grants-general-share-icon">
        <div class="access-grants-general-share-icon-inner">
          <icon-lucide-globe class="access-grants-general-share-icon-image"></icon-lucide-globe>
        </div>
      </div>
    `;
	}
	getRoleModes(e) {
		return t.acl.modesFromRole(e);
	}
	getDialogTitle() {
		let e = this.subjectUri ? r(this.subjectUri) : void 0, t = e ? i(e).trim() : "";
		return !t || t === "this resource" ? "Share this resource" : `Share "${t}"`;
	}
	render() {
		let e = this.getDialogTitle();
		return f`
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
						let n = {
							type: e.subjectType,
							iri: e.subjectValue
						}, r = e.role === "No Access" ? await t.acl.planRevoke(this.subjectUri, n) : await t.acl.planGrant(this.subjectUri, n, this.getRoleModes(e.role));
						await t.acl.applyPlan(r);
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
	async createPendingAccessGrant(e, n = this.addAccessRoleValue, r) {
		let i = this.normalizeAccessPrincipleInput(e), a = await t.acl.classifyAccessControlSubject(i), o = this.isHttpUri(e) ? "agent" : void 0, s = a?.kind ?? o, c = a?.subjectValue ?? i;
		if (!s) console.error(`Could not classify access target: ${e}`);
		else if (s === "origin") console.error(`Origin access grants are not supported yet: ${e}`);
		else return {
			subjectType: s,
			subjectValue: c,
			role: n,
			label: r ?? await this.resolvePendingAccessGrantLabel(c, e)
		};
	}
	async resolvePendingAccessGrantLabel(e, n) {
		try {
			let a = r(e);
			return await t.store.fetcher.load(a.doc()), i(a).trim() || n;
		} catch {
			return i(r(e)) || n;
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
			await t.store.fetcher.load(r(e).doc());
		} catch {
			return;
		}
		let n = await this.resolvePendingAccessGrantLabel(e, e);
		return {
			label: n === e ? `Use ${e}` : n,
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
		return f`
      <span style="display: inline-flex; align-items: center; gap: 8px; line-height: 1;">
        ${this.renderDirectoryEntryIcon(e)}
        <span>${e.label}</span>
      </span>
    `;
	}
	renderDirectoryEntryIcon(e) {
		return e.sources.includes("contacts") || e.sources.includes("groups") ? f`<icon-lucide-book-user style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-book-user>` : e.sources.includes("friends") ? f`<icon-lucide-users style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-users>` : e.sources.includes("catalog") ? f`<icon-lucide-user-round style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-user-round>` : o;
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
}, {e: [ie, oe, L, z, V, U, G, q, ce, le, de, pe, ee], c: [$, te]} = ve(C, [
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
		I,
		1,
		"principalInputValue"
	],
	[
		R,
		1,
		"addAccessRoleValue"
	],
	[
		B,
		1,
		"sharedAccessRoleValue"
	],
	[
		H,
		1,
		"searchValue"
	],
	[
		W,
		1,
		"failed"
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
		J,
		1,
		"accessGrantRoles"
	],
	[
		ue,
		1,
		"accessGrantLabels"
	],
	[
		fe,
		1,
		"dialog"
	]
], ne, 0, void 0, l), C), S = class extends Ce {
	constructor() {
		super($), Q(this, "styles", x), te();
	}
}, Q(S, me, void 0), S)();
//#endregion
//#region src/components/access-control-modal/index.ts
var we = $;
//#endregion
export { $ as n, we as t };

//# sourceMappingURL=access-control-modal-BgaFd5lL.js.map