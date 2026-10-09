import { D as e, _ as t, a as n, g as r, h as i, i as a, v as o } from "./index.esm-CiBFyxq3.js";
import { u as s } from "./style-DRXEGqc8.js";
import { p as c } from "./widgets-Dlv8JeP3.js";
import { c as l, g as u, i as d, o as f, p, r as m, u as h } from "./components-Bdqizu8x.js";
import { t as g } from "./query-BYu9q8lA.js";
import "./chevron-down-ujxRg3MD.js";
import "./dialog-BsH5KSvu.js";
import "./button-lol95DqR.js";
import "./dialog-content-jx08y2Oa.js";
import "./dialog-footer-Bhl8k1PX.js";
import { r as _ } from "./combobox-a0vVnPo8.js";
import "./combobox-option-B-Hksiq2.js";
//#region ~icons/lucide/link
var v = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></g></svg>";
	}
};
customElements.get("icon-lucide-link") || customElements.define("icon-lucide-link", v);
//#endregion
//#region ~icons/lucide/globe
var y = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20\"/></g></svg>";
	}
};
customElements.get("icon-lucide-globe") || customElements.define("icon-lucide-globe", y);
//#endregion
//#region ~icons/lucide/book-user
var b = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15 13a3 3 0 1 0-6 0\"/><path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\"/><circle cx=\"12\" cy=\"8\" r=\"2\"/></g></svg>";
	}
};
customElements.get("icon-lucide-book-user") || customElements.define("icon-lucide-book-user", b);
//#endregion
//#region ~icons/lucide/user-round
var x = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"8\" r=\"5\"/><path d=\"M20 21a8 8 0 0 0-16 0\"/></g></svg>";
	}
};
customElements.get("icon-lucide-user-round") || customElements.define("icon-lucide-user-round", x);
//#endregion
//#region ~icons/lucide/users
var S = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/></g></svg>";
	}
};
customElements.get("icon-lucide-users") || customElements.define("icon-lucide-users", S);
//#endregion
//#region ~icons/lucide/circle-x
var C = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m15 9l-6 6m0-6l6 6\"/></g></svg>";
	}
};
customElements.get("icon-lucide-circle-x") || customElements.define("icon-lucide-circle-x", C);
//#endregion
//#region src/components/access-control-modal/AccessControlModal.styles.css
var w = p`:host{& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);font-weight:600}& .access-grants-form{font-size:var(--solid-ui-font-size-sm,.875rem);--access-role-select-width:129px;flex-direction:column;align-self:stretch;align-items:flex-start;gap:10px;padding:10px;display:flex;& p{color:var(--solid-ui-color-gray-600,#4a5565);line-height:1.5}& .access-grants-form-main{align-self:stretch;align-items:flex-start;gap:10px;display:flex;& .access-grants-input{border:1px solid var(--solid-ui-color-slate-200,#e2e8f0);background:var(--solid-ui-color-white,#fff);border-radius:5px;flex-direction:column;flex:auto;align-items:flex-start;gap:12px;min-width:0;padding:10px 15px;display:flex;& solid-ui-combobox{--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0);width:100%}}}& .access-grants-pending{flex-wrap:wrap;align-items:center;gap:8px;min-height:42px;display:flex}& .access-grants-pending-item{border:1px solid var(--solid-ui-color-gray-300,#d1d5dc);background:var(--solid-ui-color-gray-50,#f9fafb);max-width:100%;color:var(--solid-ui-color-gray-700,#374151);border-radius:5px;align-items:center;gap:6px;padding:5px 10px;display:flex}& .access-grants-pending-item-label{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--solid-ui-color-gray-500,#6a7282);font-size:var(--solid-ui-font-size-xs,.75rem);line-height:1;overflow:hidden}& .access-grants-pending-item-remove{color:var(--solid-ui-color-gray-300,#d1d5dc);cursor:pointer;background:0 0;border:none;border-radius:999px;justify-content:center;align-items:center;padding:0;display:inline-flex}& .access-grants-pending-item-remove icon-lucide-circle-x{width:14px;height:14px}}& .access-grants-header,& .access-grants-list,& .access-grants-general{align-self:stretch;padding:0 10px}& .access-grants-directory-entry{align-items:center;gap:8px;line-height:1;display:inline-flex}& .access-grants-header{justify-content:space-between;align-items:center;gap:15px;display:flex;& .access-grants-search-input{--solid-ui-input-border-color:transparent;width:12ch;min-width:12ch;color:var(--solid-ui-color-zinc-500,#71717b);font-size:var(--solid-ui-font-size-sm,.875rem);flex:none;font-weight:500}}& .access-grants-list{align-items:flex-start;gap:20px;display:flex;& ul{box-sizing:border-box;border:1px solid var(--solid-ui-color-gray-200,#e5e7eb);border-radius:10px;flex-direction:column;flex:1 0 0;align-items:flex-start;gap:15px;height:195px;min-height:0;padding:15px;display:flex;overflow:hidden auto}& li{flex:none;align-items:center;gap:10px;width:100%;display:flex;& .access-grants-image{aspect-ratio:1;width:30px;height:30px;color:var(--solid-ui-color-white,#fff);text-align:center;font-size:var(--solid-ui-font-size-xs,.75rem);border-radius:999px;flex:0 0 30px;justify-content:center;align-items:center;font-weight:500;display:flex;overflow:hidden;& img{object-fit:cover;border-radius:999px;width:100%;height:100%;display:flex}& span{justify-content:center;align-items:center;width:100%;height:100%;line-height:1;display:flex}}& .access-grants-image--group{background:var(--solid-ui-color-blue-900,#083575)}& .access-grants-image--agent,& .access-grants-image--agentClass{background:var(--solid-ui-color-lavender-300,#e6dcff)}& .access-grants-image--unknown{background:var(--solid-ui-color-gray-300,#d1d5db)}& h3{min-width:0;color:var(--solid-ui-color-gray-800,#1e2939);font-size:var(--solid-ui-font-size-xs,.75rem);flex:auto;font-weight:600}& span{text-align:right;flex:none;margin-left:auto}& .access-grants-role{font-size:var(--solid-ui-font-size-xs,.75rem);flex:none;margin-left:auto}& .access-grants-role--owner{font-size:var(--solid-ui-font-size-xs,.75rem)}& .access-grants-role--editable{max-width:100%}}}& .access-grants-general{flex-direction:column;align-items:flex-start;gap:10px;display:flex;& solid-ui-combobox,& solid-ui-input{--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0)}& .access-grants-general-header{flex-direction:row;justify-content:space-between;align-self:stretch;align-items:center;gap:15px;display:flex;& .access-grants-copy-link-button-label{font-size:var(--solid-ui-font-size-xs,.75rem);font-weight:500}& .access-grants-copy-link-button icon-lucide-link{aspect-ratio:1;width:12px;height:12px}}& .access-grants-general-share{align-self:stretch;align-items:center;gap:10px;display:flex;& .access-grants-general-share-content{flex-direction:row;flex:1 0 0;align-items:flex-start;gap:10px;display:flex;& .access-grants-general-share-icon{aspect-ratio:1;background:var(--solid-ui-color-violet-50,#f5f3ff);border-radius:50px;justify-content:center;align-items:center;width:30px;height:30px;padding:5px;display:flex}& .access-grants-general-share-icon-inner{aspect-ratio:1;flex-shrink:0;justify-content:center;align-items:center;width:20px;height:20px;padding:1.25px;display:flex;& icon-lucide-globe{aspect-ratio:1;flex-shrink:0;width:17.5px;height:17.5px}}& .access-grants-general-share-text{flex:auto;min-width:0;& .access-grants-general-share-text-title{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-sm,.875rem);font-weight:600}& .access-grants-general-share-text-description{color:var(--solid-ui-color-gray-700,#364153);font-size:var(--solid-ui-font-size-sm,.875rem)}}}}}& .access-role-select{max-width:100%;width:var(--access-role-select-width);--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0);flex:none;margin-top:25px;display:block}& .access-role-select--top{margin-top:0}& .access-role-select--compact{--solid-ui-input-border-color:transparent;flex:0 0 110px;width:110px;min-width:110px;max-width:100%;margin-top:0}& .access-role-select--general{width:120px;min-width:120px;font-size:var(--solid-ui-font-size-xs,.75rem);flex:0 0 120px;font-weight:500}& .access-grants-list li .access-role-select--compact{flex:0 0 110px;width:110px;min-width:110px}& .access-control-footer-actions{justify-content:flex-end;align-items:center;gap:15px;width:100%;display:flex;&>solid-ui-button{min-width:132px}}}`;
//#endregion
//#region src/components/access-control-modal/helpers.ts
function T(e) {
	return e.startsWith("http://") || e.startsWith("https://");
}
function E(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = t(r);
		e && !n.has(e) && n.set(e, r);
	}
	return [...n.values()];
}
function D(e) {
	return E(e, (e) => e.value);
}
//#endregion
//#region src/components/access-control-modal/AccessControlModal.ts
var O, k, A, j, M, N, P, F, I, L, R, z, B, V, H, ee, te, ne, re, ie, ae, oe, U, W, G, K, q, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te;
function J(e, t, n) {
	Ee(e, t), t.set(e, n);
}
function Ee(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function Y(e, t, n) {
	return e.set(De(e, t), n), n;
}
function X(e, t) {
	return e.get(De(e, t));
}
function De(e, t, n) {
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
function Oe(e, t, n, r, i, a) {
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
				get: Ae(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Ae(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return je(t) === e;
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
	var t = ke(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ke(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ae(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function je(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Me(e) {
	return e;
}
function Ne(e) {
	return e != null;
}
ne = [u("solid-ui-access-control-modal")];
var $;
new (we = (A = /*#__PURE__*/ new WeakMap(), j = /*#__PURE__*/ new WeakMap(), M = /*#__PURE__*/ new WeakMap(), N = /*#__PURE__*/ new WeakMap(), P = /*#__PURE__*/ new WeakMap(), F = /*#__PURE__*/ new WeakMap(), I = /*#__PURE__*/ new WeakMap(), L = /*#__PURE__*/ new WeakMap(), R = /*#__PURE__*/ new WeakMap(), z = /*#__PURE__*/ new WeakMap(), B = /*#__PURE__*/ new WeakMap(), V = /*#__PURE__*/ new WeakMap(), H = /*#__PURE__*/ new WeakMap(), Te = (re = d({ attribute: !1 }), ae = d({ attribute: !1 }), U = m(), G = m(), q = m(), ce = m(), ue = m(), fe = m(), me = m(), ge = m(), ve = m(), be = m(), Se = g("solid-ui-dialog"), "subjectUri"), k = class extends f {
	constructor(...e) {
		super(...e), J(this, A, (ee(this), ie(this, void 0))), J(this, j, oe(this, void 0)), J(this, M, W(this, "")), J(this, N, K(this, "Viewer")), J(this, P, se(this, "No Access")), J(this, F, le(this, "No Access")), J(this, I, de(this, "")), J(this, L, pe(this, !1)), J(this, R, he(this, !1)), J(this, z, _e(this, [])), J(this, B, ye(this, [])), J(this, V, xe(this, [])), J(this, H, Ce(this, null)), Z(this, "accessPrincipleOptionsProvider", _(async (e) => {
			let t = e.trim(), r = await this.getPreferredAccessPrincipleOptions(t);
			if (t.length < 2) return this.getShortQueryOptions(r);
			let i = [];
			try {
				i = await a.directory.search({
					query: t,
					sources: n
				});
			} catch (e) {
				if (!r.length) throw e;
			}
			let o = i.map((e) => this.directoryEntryToOption(e));
			return [...r, ...o];
		}));
	}
	get [Te]() {
		return X(A, this);
	}
	set subjectUri(e) {
		Y(A, this, e);
	}
	get accessGrants() {
		return X(j, this);
	}
	set accessGrants(e) {
		Y(j, this, e);
	}
	get principalInputValue() {
		return X(M, this);
	}
	set principalInputValue(e) {
		Y(M, this, e);
	}
	get addAccessRoleValue() {
		return X(N, this);
	}
	set addAccessRoleValue(e) {
		Y(N, this, e);
	}
	get authenticatedAccessRoleValue() {
		return X(P, this);
	}
	set authenticatedAccessRoleValue(e) {
		Y(P, this, e);
	}
	get publicAccessRoleValue() {
		return X(F, this);
	}
	set publicAccessRoleValue(e) {
		Y(F, this, e);
	}
	get searchValue() {
		return X(I, this);
	}
	set searchValue(e) {
		Y(I, this, e);
	}
	get failed() {
		return X(L, this);
	}
	set failed(e) {
		Y(L, this, e);
	}
	get submitting() {
		return X(R, this);
	}
	set submitting(e) {
		Y(R, this, e);
	}
	get pendingAccessGrants() {
		return X(z, this);
	}
	set pendingAccessGrants(e) {
		Y(z, this, e);
	}
	get accessGrantRoles() {
		return X(B, this);
	}
	set accessGrantRoles(e) {
		Y(B, this, e);
	}
	get accessGrantLabels() {
		return X(V, this);
	}
	set accessGrantLabels(e) {
		Y(V, this, e);
	}
	get dialog() {
		return X(H, this);
	}
	set dialog(e) {
		Y(H, this, e);
	}
	willUpdate(e) {
		super.willUpdate(e), e.has("accessGrants") && (this.accessGrantRoles = this.accessGrants?.map((e) => this.getAuthorizationRole(e)) ?? [], this.authenticatedAccessRoleValue = this.getAuthenticatedAccessRole(), this.publicAccessRoleValue = this.getPublicAccessRole(), this.refreshAccessGrantLabels());
	}
	async refreshAccessGrantLabels() {
		let t = this.accessGrants ?? [];
		if (!t.length) {
			this.accessGrantLabels = [];
			return;
		}
		let n = await Promise.all(t.map(async (t) => {
			let n = t.agentGroup[0];
			if (n) try {
				await a.store.fetcher.load(e(n).doc());
			} catch {}
			return this.getAuthorizationSubjectLabel(this.getSharedAuthorization(t));
		}));
		this.accessGrants === t && (this.accessGrantLabels = n);
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
		return h`
      <ul>
        ${t.length > 0 ? t.map((e) => this.renderAccessGrant(e)) : h`<li>No access grants</li>`}
      </ul>
    `;
	}
	renderAccessGrant(e) {
		return h`
      <li>
        ${this.renderAuthorizationBadge(e.badge)}
        <h3>${e.subjectLabel}</h3>
        ${this.renderAuthorizationRole(e.role, e.index)}  
      </li>
    `;
	}
	getAuthorizationBadge(t, n) {
		let r = n ?? this.getAuthorizationSubjectLabel(t), i = t.agent[0];
		if (i) {
			let t = c(e(i));
			return {
				kind: "agent",
				image: t,
				text: t ? "" : this.getInitials(r, 2)
			};
		}
		if (t.agentGroup[0]) return {
			kind: "group",
			text: this.getInitials(r, 1)
		};
		let a = t.agentClass[0];
		if (a) {
			let t = c(e(a));
			return {
				kind: "agentClass",
				image: t,
				text: t ? "" : this.getInitials(r, 2)
			};
		}
		return {
			kind: "unknown",
			text: "?"
		};
	}
	renderAuthorizationBadge(e) {
		return h`
      <div class="access-grants-image access-grants-image--${e.kind}">
        ${e.image ? h`<img src=${e.image} alt="" aria-hidden="true" />` : h`<span aria-hidden="true">${e.text}</span>`}
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
			...e.agentClass
		];
	}
	getAuthorizationSubjectLabel(t) {
		let n = this.getAuthorizationSubjectIris(t);
		return n.length ? n.map((t) => s(e(t))).join(", ") : "Unknown access holder";
	}
	getAuthorizationRole(e) {
		return a.acl.roleFromModes(e.mode);
	}
	getSharedAuthorization(e) {
		return {
			...e,
			agentClass: e.agentClass.filter((e) => e !== t.iri && e !== o.iri)
		};
	}
	getAuthenticatedAccessRole() {
		let e = (this.accessGrants ?? []).find((e) => e.agentClass.includes(t.iri));
		return e ? this.getAuthorizationRole(e) : "No Access";
	}
	getPublicAccessRole() {
		let e = (this.accessGrants ?? []).find((e) => e.agentClass.includes(o.iri));
		return e ? a.acl.publicRoleFromModes(e.mode) : "No Access";
	}
	getRoleValueFromEvent(e, t = "Viewer") {
		let n = this.getSelectedComboboxOptionValue(e);
		if (typeof n == "string") return n;
		let r = e.currentTarget;
		return typeof r?.value == "string" ? r.value : t;
	}
	renderAuthorizationRole(e, t) {
		return h`
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
		return h`
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
		return r.filter((e) => e !== "No Access").map((e) => h`
        <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
      `);
	}
	renderAuthenticatedRoleOptions() {
		return r.map((e) => h`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `);
	}
	renderPublicRoleOptions() {
		return i.map((e) => h`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `);
	}
	renderGrantRoleOptions() {
		return r.map((e) => h`
      <solid-ui-combobox-option value=${e}>${e === "No Access" ? "Remove" : e}</solid-ui-combobox-option>
    `);
	}
	renderAddAccessForm() {
		return h`
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
		return this.pendingAccessGrants.length ? h`
      <div class="access-grants-pending">
        ${this.pendingAccessGrants.map((e, t) => h`
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
    ` : l;
	}
	renderAccessGrantsSection() {
		return h`
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
          ${this.getSharedAccessGrantEntries().map(({ subjectLabel: e }) => h`
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
		return h`
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
		return h`
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
		return h`
      <div class="access-grants-general-share-icon">
        <div class="access-grants-general-share-icon-inner">
          <icon-lucide-globe class="access-grants-general-share-icon-image"></icon-lucide-globe>
        </div>
      </div>
    `;
	}
	getRoleModes(e) {
		return a.acl.modesFromRole(e);
	}
	getDialogTitle() {
		let t = this.subjectUri ? e(this.subjectUri) : void 0, n = t ? s(t).trim() : "";
		return !n || n === "this resource" ? "Share this resource" : `Share "${n}"`;
	}
	render() {
		let e = this.getDialogTitle();
		return h`
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
					let n = t === "No Access" ? await a.acl.planRevoke(this.subjectUri, e) : await a.acl.planGrant(this.subjectUri, e, e.type === "agentClass" && e.iri === o.iri ? a.acl.modesFromPublicRole(t) : this.getRoleModes(t));
					await a.acl.applyPlan(n);
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
		let e = this.getAuthenticatedAccessRole(), n = this.getPublicAccessRole();
		return [this.authenticatedAccessRoleValue === e ? void 0 : {
			subject: t,
			role: this.authenticatedAccessRoleValue
		}, this.publicAccessRoleValue === n ? void 0 : {
			subject: o,
			role: this.publicAccessRoleValue
		}].filter(Ne);
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
		}).filter(Ne);
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
			let r = e.trim(), i = await a.acl.classifyAccessControlSubject(r), o = this.isHttpUri(e) ? "agent" : void 0, s = i?.kind ?? o, c = i?.subjectValue ?? r;
			return s ? s === "origin" ? {
				principle: e,
				error: "Origin access grants are not supported yet"
			} : {
				principle: e,
				grant: {
					subjectType: s,
					subjectValue: c,
					role: t,
					label: n ?? await this.resolvePendingAccessGrantLabel(c, e)
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
			let r = e(t);
			return await a.store.fetcher.load(r.doc()), s(r).trim() || n;
		} catch {
			return s(e(t)) || n;
		}
	}
	dedupePendingAccessGrants(e) {
		return E(e, (e) => `${e.subjectType}:${e.subjectValue}`);
	}
	getShortQueryOptions(e) {
		return e.length ? e : [{
			label: "Type at least 2 characters to search",
			value: "",
			selectable: !1
		}];
	}
	async getPreferredAccessPrincipleOptions(e) {
		if (!T(e)) return [];
		let t = await this.createUrlOption(e);
		return D(t ? [t] : []);
	}
	async createUrlOption(t) {
		try {
			await a.store.fetcher.load(e(t).doc());
		} catch {
			return;
		}
		let n = await this.resolvePendingAccessGrantLabel(t);
		return {
			label: n === t ? `Use ${t}` : n,
			value: t
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
		return h`
      <span class="access-grants-directory-entry">
        <!-- This renders inside the combobox shadow DOM, so the modal stylesheet cannot reach these icons.
             If combobox supports a dedicated option icon hook, we can move this sizing there instead. -->
        ${this.renderDirectoryEntryIcon(e)}
        <span>${e.label}</span>
      </span>
    `;
	}
	renderDirectoryEntryIcon(e) {
		return e.sources.includes("contacts") || e.sources.includes("groups") ? h`<icon-lucide-book-user style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-book-user>` : e.sources.includes("friends") ? h`<icon-lucide-users style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-users>` : e.sources.includes("catalog") ? h`<icon-lucide-user-round style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-user-round>` : l;
	}
	isHttpUri(e) {
		return e.startsWith("http://") || e.startsWith("https://");
	}
	async onCopyLinkClick(e) {
		if (e.preventDefault(), this.subjectUri) try {
			await navigator.clipboard.writeText(this.subjectUri);
		} catch (e) {
			console.error("Failed to copy resource link", e);
		}
	}
}, {e: [ie, oe, W, K, se, le, de, pe, he, _e, ye, xe, Ce, ee], c: [$, te]} = Oe(k, [
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
		U,
		1,
		"principalInputValue"
	],
	[
		G,
		1,
		"addAccessRoleValue"
	],
	[
		q,
		1,
		"authenticatedAccessRoleValue"
	],
	[
		ce,
		1,
		"publicAccessRoleValue"
	],
	[
		ue,
		1,
		"searchValue"
	],
	[
		fe,
		1,
		"failed"
	],
	[
		me,
		1,
		"submitting"
	],
	[
		ge,
		1,
		"pendingAccessGrants"
	],
	[
		ve,
		1,
		"accessGrantRoles"
	],
	[
		be,
		1,
		"accessGrantLabels"
	],
	[
		Se,
		1,
		"dialog"
	]
], ne, 0, void 0, f), k), O = class extends Me {
	constructor() {
		super($), Z(this, "styles", w), te();
	}
}, Z(O, we, void 0), O)();
//#endregion
//#region src/components/access-control-modal/index.ts
var Pe = $;
//#endregion
export { $ as n, Pe as t };

//# sourceMappingURL=access-control-modal-pSVgvvU2.js.map