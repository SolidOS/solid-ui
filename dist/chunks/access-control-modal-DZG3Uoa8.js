import { a as e, c as t, g as n, i as r, o as i, p as a, r as o, u as s } from "./components-s2INdWKd.js";
import { u as c } from "./style-CuYGj-Cj.js";
import { T as l, p as u } from "./widgets-1XsPS-SN.js";
import { T as d, f, g as p, h as m, m as h, p as g, t as _, v } from "./solidLogicSingleton.esm-Dva9_prE.js";
import { t as y } from "./query-CsLxrTqt.js";
import "./dialog-ugztH9Dx.js";
import "./dialog-content-CNu7F_kH.js";
import "./dialog-footer-D_IrOThw.js";
import "./button-Cop1MAff.js";
import { r as b } from "./combobox-C50pXhEA.js";
import "./combobox-option-BuOSaw2V.js";
import "./error-state-DGX3Inwe.js";
// ~icons/lucide/circle-x
var x = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m15 9l-6 6m0-6l6 6\"/></g></svg>";
	}
};
customElements.get("icon-lucide-circle-x") || customElements.define("icon-lucide-circle-x", x);
// ~icons/lucide/folder
var S = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\"/></svg>";
	}
};
customElements.get("icon-lucide-folder") || customElements.define("icon-lucide-folder", S);
// ~icons/lucide/folder-open
var C = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m6 14l1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2\"/></svg>";
	}
};
customElements.get("icon-lucide-folder-open") || customElements.define("icon-lucide-folder-open", C);
// ~icons/lucide/lock-keyhole
var w = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"16\" r=\"1\"/><rect width=\"18\" height=\"12\" x=\"3\" y=\"10\" rx=\"2\"/><path d=\"M7 10V7a5 5 0 0 1 10 0v3\"/></g></svg>";
	}
};
customElements.get("icon-lucide-lock-keyhole") || customElements.define("icon-lucide-lock-keyhole", w);
// ~icons/lucide/globe
var T = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20\"/></g></svg>";
	}
};
customElements.get("icon-lucide-globe") || customElements.define("icon-lucide-globe", T);
// src/components/access-control-modal/AccessControlSharedAccess.styles.css
var E = a`:host{& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);font-weight:600}& .access-grants-header,& .access-grants-list{align-self:stretch;padding:0 10px}& .access-grants-header{justify-content:space-between;align-items:center;gap:15px;display:flex;& .access-grants-search-input{width:var(--access-role-select-width,129px);min-width:var(--access-role-select-width,129px);--solid-ui-input-border-color:transparent;color:var(--solid-ui-color-zinc-500,#71717b);font-size:var(--solid-ui-font-size-sm,.875rem);flex:none;font-weight:500}}& .access-grants-list{align-items:flex-start;gap:20px;display:flex;& ul{box-sizing:border-box;border:1px solid var(--solid-ui-color-gray-200,#e5e7eb);border-radius:10px;flex-direction:column;flex:1 0 0;align-items:flex-start;gap:15px;height:195px;min-height:0;padding:15px;display:flex;overflow:hidden auto}& li{flex:none;align-items:center;gap:10px;width:100%;display:flex;& .access-grants-image{aspect-ratio:1;width:30px;height:30px;color:var(--solid-ui-color-white,#fff);text-align:center;font-size:var(--solid-ui-font-size-xs,.75rem);border-radius:999px;flex:0 0 30px;justify-content:center;align-items:center;font-weight:500;display:flex;overflow:hidden;& img{object-fit:cover;border-radius:999px;width:100%;height:100%;display:flex}& span{justify-content:center;align-items:center;width:100%;height:100%;line-height:1;display:flex}}& .access-grants-image--agentGroup{background:var(--solid-ui-color-blue-900,#083575)}& .access-grants-image--agent,& .access-grants-image--agentClass{background:var(--solid-ui-color-lavender-300,#e6dcff)}& .access-grants-image--origin{background:var(--solid-ui-color-green-700,#15803d)}& .access-grants-image--unknown{background:var(--solid-ui-color-gray-300,#d1d5db)}& h3{min-width:0;color:var(--solid-ui-color-gray-800,#1e2939);font-size:var(--solid-ui-font-size-xs,.75rem);flex:auto;font-weight:600}& span{text-align:right;flex:none;margin-left:auto}& .access-grants-role{font-size:var(--solid-ui-font-size-xs,.75rem);flex:none;margin-left:auto}& .access-grants-role--owner{font-size:var(--solid-ui-font-size-xs,.75rem)}& .access-grants-role--editable{max-width:100%}& .access-scope-select--compact{--solid-ui-input-border-color:transparent;width:170px;min-width:170px;max-width:100%;font-size:var(--solid-ui-font-size-xs,.75rem);flex:0 0 170px}}}& .access-role-select--compact{--solid-ui-input-border-color:transparent;flex:0 0 110px;width:110px;min-width:110px;max-width:100%;margin-top:0}& .access-grants-list li .access-role-select--compact{flex:0 0 110px;width:110px;min-width:110px}& .access-scope-select--compact{margin-top:0}}`, D, O, k, A, j, ee, te, ne, re, ie, ae, oe, se, ce, le, ue, de, fe, pe, me, he, ge;
function M(e, t, n) {
	_e(e, t), t.set(e, n);
}
function _e(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function N(e, t, n) {
	return e.set(ve(e, t), n), n;
}
function P(e, t) {
	return e.get(ve(e, t));
}
function ve(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function ye(e, t, n) {
	return (t = xe(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function be(e, t, n, r, i, a) {
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
				get: Ce(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Ce(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return we(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : xe(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function xe(e) {
	var t = Se(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Se(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ce(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function we(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Te(e) {
	return e;
}
ie = [n("solid-ui-access-control-shared-access")];
var Ee;
new (he = (k = /*#__PURE__*/ new WeakMap(), A = /*#__PURE__*/ new WeakMap(), j = /*#__PURE__*/ new WeakMap(), ee = /*#__PURE__*/ new WeakMap(), te = /*#__PURE__*/ new WeakMap(), ge = (ae = r({ attribute: !1 }), se = r({ type: Boolean }), le = r({ type: Boolean }), de = r({ type: Boolean }), pe = o(), "accessGrantViewModels"), O = class extends i {
	constructor(...e) {
		super(...e), M(this, k, (ne(this), oe(this, []))), M(this, A, ce(this, !1)), M(this, j, ue(this, !1)), M(this, ee, fe(this, !1)), M(this, te, me(this, ""));
	}
	get [ge]() {
		return P(k, this);
	}
	set accessGrantViewModels(e) {
		N(k, this, e);
	}
	get disabled() {
		return P(A, this);
	}
	set disabled(e) {
		N(A, this, e);
	}
	get showContainerScope() {
		return P(j, this);
	}
	set showContainerScope(e) {
		N(j, this, e);
	}
	get advancedSharingOpen() {
		return P(ee, this);
	}
	set advancedSharingOpen(e) {
		N(ee, this, e);
	}
	get searchValue() {
		return P(te, this);
	}
	set searchValue(e) {
		N(te, this, e);
	}
	onSearchInput(e) {
		let t = e.currentTarget;
		this.searchValue = typeof t?.value == "string" ? t.value : "";
	}
	onSearchSelect(e) {
		let t = e.detail.option;
		if (typeof t.label != "string") return;
		let n = t.label.trim();
		this.searchValue = n;
	}
	onAccessGrantRoleChange(e, t) {
		let n = t.detail.option.value, r = typeof n == "string" ? f.find((e) => e === n) : void 0;
		if (!r) return;
		let i = {
			id: e,
			role: r
		};
		this.dispatchEvent(new CustomEvent("access-grant-role-changed", {
			detail: i,
			bubbles: !0,
			composed: !0
		}));
	}
	onAccessGrantScopeChange(e, t) {
		let n = t.detail.option.value;
		(n === "folder+contents" || n === "folder" || n === "contents") && this.dispatchEvent(new CustomEvent("access-grant-scope-changed", {
			detail: {
				id: e,
				scope: n
			},
			bubbles: !0,
			composed: !0
		}));
	}
	getFilteredAccessGrants() {
		let e = this.searchValue.trim().toLowerCase();
		return this.accessGrantViewModels.filter(({ subjectLabel: t, subjects: n }) => n.length ? !e || t.toLowerCase().includes(e) : !1);
	}
	renderAccessGrant(e) {
		return s`
      <li>
        ${this.renderAuthorizationBadge(e.authorization, e.subjectLabel)}
        <h3>${e.subjectLabel}</h3>
        ${this.showContainerScope && (this.advancedSharingOpen || e.scope !== "folder+contents") ? s`
            <solid-ui-combobox
              class="access-scope-select access-scope-select--compact"
              label="Applies To"
              .srOnlyLabel=${!0}
              .disabled=${this.disabled}
              .value=${e.scope ?? "folder+contents"}
              @change=${(t) => this.onAccessGrantScopeChange(e.id, t)}
            >
              <solid-ui-combobox-option value="folder+contents">Folder And Contents</solid-ui-combobox-option>
              <solid-ui-combobox-option value="folder">Folder Only</solid-ui-combobox-option>
              <solid-ui-combobox-option value="contents">Contents Only</solid-ui-combobox-option>
            </solid-ui-combobox>
          ` : t}
        ${this.renderAuthorizationRole(e.role, e.id, e.subjectLabel)}
      </li>
    `;
	}
	renderAuthorizationBadge(e, t) {
		let n = this.getAuthorizationBadge(e, t);
		return s`
      <div class="access-grants-image access-grants-image--${n.kind}">
        ${n.image ? s`<img src=${n.image} alt="" aria-hidden="true" />` : n.kind === "origin" ? s`<icon-lucide-globe aria-hidden="true"></icon-lucide-globe>` : s`<span aria-hidden="true">${n.text}</span>`}
      </div>
    `;
	}
	getAuthorizationBadge(e, t) {
		let n = e.agent[0];
		if (n) {
			let e = u(d(n));
			return {
				kind: "agent",
				image: e,
				text: e ? "" : this.getInitials(t, 2)
			};
		}
		if (e.agentGroup[0]) return {
			kind: "agentGroup",
			text: this.getInitials(t, 1)
		};
		let r = e.agentClass[0];
		if (r) {
			let e = u(d(r));
			return {
				kind: "agentClass",
				image: e,
				text: e ? "" : this.getInitials(t, 2)
			};
		}
		return e.origin[0] ? {
			kind: "origin",
			text: "O",
			image: ""
		} : {
			kind: "unknown",
			text: "?"
		};
	}
	getInitials(e, t = 2) {
		return (e.split(/\s+/).filter(Boolean).slice(0, t).map((e) => e[0]).join("") || e.slice(0, t)).toUpperCase();
	}
	renderAuthorizationRole(e, t, n) {
		return s`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-grants-role access-grants-role--editable ${e === "Owner" ? "access-grants-role--owner" : ""}"
        label="Access role for ${n}"
        .srOnlyLabel=${!0}
        .disabled=${this.disabled}
        .value=${e}
        @change=${(e) => this.onAccessGrantRoleChange(t, e)}
      >
        ${this.renderGrantRoleOptions()}
      </solid-ui-combobox>
    `;
	}
	renderGrantRoleOptions() {
		return f.map((e) => s`
      <solid-ui-combobox-option value=${e}>${e === "No Access" ? "Remove" : e}</solid-ui-combobox-option>
    `);
	}
	render() {
		let e = this.getFilteredAccessGrants();
		return s`
      <section aria-labelledby="access-grants-heading">
        <div class="access-grants-header">
          <h2 id="access-grants-heading">Shared with</h2>
          <solid-ui-combobox
            class="access-grants-search-input"
            label="Search access grants"
            .srOnlyLabel=${!0}
            .value=${this.searchValue}
            placeholder="Search"
            @input=${this.onSearchInput}
            @change=${this.onSearchSelect}
          >
            ${this.accessGrantViewModels.filter(({ subjects: e }) => e.length > 0).map(({ subjectLabel: e }) => s`
                <solid-ui-combobox-option .value=${e}>
                  ${e}
                </solid-ui-combobox-option>
              `)}
          </solid-ui-combobox>
        </div>
        <div class="access-grants-list">
          <ul>
            ${e.length > 0 ? e.map((e) => this.renderAccessGrant(e)) : s`<li>No access grants</li>`}
          </ul>
        </div>
      </section>
    `;
	}
}, {e: [oe, ce, ue, fe, me, ne], c: [Ee, re]} = be(O, [
	[
		ae,
		1,
		"accessGrantViewModels"
	],
	[
		se,
		1,
		"disabled"
	],
	[
		le,
		1,
		"showContainerScope"
	],
	[
		de,
		1,
		"advancedSharingOpen"
	],
	[
		pe,
		1,
		"searchValue"
	]
], ie, 0, void 0, i), O), D = class extends Te {
	constructor() {
		super(Ee), ye(this, "styles", E), re();
	}
}, ye(D, he, void 0), D)();
// ~icons/lucide/link
var De = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></g></svg>";
	}
};
customElements.get("icon-lucide-link") || customElements.define("icon-lucide-link", De);
// src/components/access-control-modal/AccessControlGeneralAccess.styles.css
var Oe = a`:host{& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);font-weight:600}& .access-grants-general{flex-direction:column;align-self:stretch;align-items:flex-start;gap:10px;padding:0 10px;display:flex;& solid-ui-combobox,& solid-ui-input{--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0)}& .access-grants-general-header{flex-direction:row;justify-content:space-between;align-self:stretch;align-items:center;gap:15px;display:flex;& .access-grants-copy-link-button-label{font-size:var(--solid-ui-font-size-xs,.75rem);font-weight:500}& .access-grants-copy-link-button icon-lucide-link{aspect-ratio:1;width:12px;height:12px}}& .access-grants-general-share{align-self:stretch;align-items:center;gap:10px;display:flex;& .access-grants-general-share-content{flex-direction:row;flex:1 0 0;align-items:flex-start;gap:10px;display:flex;& .access-grants-general-share-icon{aspect-ratio:1;background:var(--solid-ui-color-violet-50,#f5f3ff);border-radius:50px;justify-content:center;align-items:center;width:30px;height:30px;padding:5px;display:flex}& .access-grants-general-share-icon-inner{aspect-ratio:1;flex-shrink:0;justify-content:center;align-items:center;width:20px;height:20px;padding:1.25px;display:flex;& icon-lucide-globe{aspect-ratio:1;flex-shrink:0;width:17.5px;height:17.5px}}& .access-grants-general-share-text{flex:auto;min-width:0;& .access-grants-general-share-text-title{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-sm,.875rem);font-weight:600}& .access-grants-general-share-text-description{color:var(--solid-ui-color-gray-700,#364153);font-size:var(--solid-ui-font-size-sm,.875rem)}}}}}& .access-role-select--general{width:120px;min-width:120px;font-size:var(--solid-ui-font-size-xs,.75rem);flex:0 0 120px;font-weight:500}& .access-role-select--compact{--solid-ui-input-border-color:transparent;max-width:100%;margin-top:0;display:block}}`, ke, Ae, je, Me, Ne, Pe, Fe, Ie, Le, Re, ze, Be, Ve, He, Ue, We, Ge, Ke, qe;
function Je(e, t, n) {
	Ye(e, t), t.set(e, n);
}
function Ye(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function Xe(e, t, n) {
	return e.set(Ze(e, t), n), n;
}
function F(e, t) {
	return e.get(Ze(e, t));
}
function Ze(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function Qe(e, t, n) {
	return (t = et(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function $e(e, t, n, r, i, a) {
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
				get: nt(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || nt(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return rt(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : et(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function et(e) {
	var t = tt(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function tt(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function nt(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function rt(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function it(e) {
	return e;
}
Le = [n("solid-ui-access-control-general-access")];
var at;
new (Ke = (je = /*#__PURE__*/ new WeakMap(), Me = /*#__PURE__*/ new WeakMap(), Ne = /*#__PURE__*/ new WeakMap(), Pe = /*#__PURE__*/ new WeakMap(), qe = (Re = r({ attribute: !1 }), Be = r({ attribute: !1 }), He = r({ attribute: !1 }), We = r({ type: Boolean }), "subjectUri"), Ae = class extends i {
	constructor(...e) {
		super(...e), Je(this, je, (Fe(this), ze(this, void 0))), Je(this, Me, Ve(this, "No Access")), Je(this, Ne, Ue(this, "No Access")), Je(this, Pe, Ge(this, !1));
	}
	get [qe]() {
		return F(je, this);
	}
	set subjectUri(e) {
		Xe(je, this, e);
	}
	get authenticatedAccessRoleValue() {
		return F(Me, this);
	}
	set authenticatedAccessRoleValue(e) {
		Xe(Me, this, e);
	}
	get publicAccessRoleValue() {
		return F(Ne, this);
	}
	set publicAccessRoleValue(e) {
		Xe(Ne, this, e);
	}
	get disabled() {
		return F(Pe, this);
	}
	set disabled(e) {
		Xe(Pe, this, e);
	}
	onAuthenticatedRoleChange(e) {
		this.dispatchRoleChange("authenticated-role-changed", e, f);
	}
	onPublicRoleChange(e) {
		this.dispatchRoleChange("public-role-changed", e, h);
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
			l("Failed to copy resource link", e);
		}
	}
	renderAuthenticatedRoleOptions() {
		return f.map((e) => s`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `);
	}
	renderPublicRoleOptions() {
		return h.map((e) => s`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `);
	}
	renderAuthenticatedModeSelector() {
		return s`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-role-select--general access-grants-role access-grants-role--editable access-role-select--authenticated"
        label="Access role for logged-in users"
        .srOnlyLabel=${!0}
        .disabled=${this.disabled}
        .value=${this.authenticatedAccessRoleValue}
        @change=${this.onAuthenticatedRoleChange}
      >
        ${this.renderAuthenticatedRoleOptions()}
      </solid-ui-combobox>
    `;
	}
	renderPublicModeSelector() {
		return s`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-role-select--general access-grants-role access-grants-role--editable access-role-select--public"
        label="Access role for anyone with the link"
        .srOnlyLabel=${!0}
        .disabled=${this.disabled}
        .value=${this.publicAccessRoleValue}
        @change=${this.onPublicRoleChange}
      >
        ${this.renderPublicRoleOptions()}
      </solid-ui-combobox>
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
	renderGeneralShareRow(e) {
		return s`
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
		return s`
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
}, {e: [ze, Ve, Ue, Ge, Fe], c: [at, Ie]} = $e(Ae, [
	[
		Re,
		1,
		"subjectUri"
	],
	[
		Be,
		1,
		"authenticatedAccessRoleValue"
	],
	[
		He,
		1,
		"publicAccessRoleValue"
	],
	[
		We,
		1,
		"disabled"
	]
], Le, 0, void 0, i), Ae), ke = class extends it {
	constructor() {
		super(at), Qe(this, "styles", Oe), Ie();
	}
}, Qe(ke, Ke, void 0), ke)();
// src/components/access-control-modal/AccessControlErrors.styles.css
var ot = a`:host{contain:inline-size;width:100%;display:block;& solid-ui-error-state{contain:inline-size;width:100%;max-width:100%}& .access-control-save-errors{box-sizing:border-box;gap:8px;width:100%;margin:0;padding-left:0;list-style:none;display:grid;& li{min-width:0;color:var(--solid-ui-color-red-600,#be2e48);font-size:var(--solid-ui-font-size-sm,.875rem);grid-template-columns:minmax(0,18rem) minmax(0,1fr);align-items:baseline;gap:6px;line-height:1.4;display:grid}& .access-control-save-error-label{overflow-wrap:anywhere;font-weight:500}& .access-control-save-error-detail{overflow-wrap:anywhere;min-width:0}}@media (width<=600px){& .access-control-save-errors li{grid-template-columns:minmax(0,40%) minmax(0,1fr)}}}`, st, ct, I, L, lt, ut, dt, ft, pt, mt, ht, gt, _t;
function vt(e, t, n) {
	yt(e, t), t.set(e, n);
}
function yt(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function bt(e, t, n) {
	return e.set(St(e, t), n), n;
}
function xt(e, t) {
	return e.get(St(e, t));
}
function St(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function Ct(e, t, n) {
	return (t = Tt(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function wt(e, t, n, r, i, a) {
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
				get: Dt(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Dt(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return Ot(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : Tt(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function Tt(e) {
	var t = Et(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Et(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Dt(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function Ot(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function kt(e) {
	return e;
}
dt = [n("solid-ui-access-control-errors")];
var At;
new (gt = (I = /*#__PURE__*/ new WeakMap(), L = /*#__PURE__*/ new WeakMap(), _t = (ft = r({ attribute: !1 }), mt = r({ attribute: !1 }), "errors"), ct = class extends i {
	constructor(...e) {
		super(...e), vt(this, I, (lt(this), pt(this, []))), vt(this, L, ht(this, !0));
	}
	get [_t]() {
		return xt(I, this);
	}
	set errors(e) {
		bt(I, this, e);
	}
	get successfulChangesRefreshed() {
		return xt(L, this);
	}
	set successfulChangesRefreshed(e) {
		bt(L, this, e);
	}
	onClose(e) {
		e.stopPropagation(), this.dispatchEvent(new CustomEvent("close", {
			bubbles: !0,
			composed: !0
		}));
	}
	getScopeLabel(e) {
		return e === "folder+contents" ? "folder and contents" : e === "container" ? "folder" : e === "contents" ? "contents" : "resource";
	}
	render() {
		return this.errors.length ? s`
      <solid-ui-error-state
        title="Some access changes could not be saved"
        message=${this.successfulChangesRefreshed ? "Any successful changes are shown above. The list below shows only the changes that failed. Close this dialog and reopen it if you want to try again." : "Some changes may have been saved, but we could not refresh the Shared with list. The list below shows only the changes that failed. Close this dialog and reopen it if you want to try again."}
        @close=${this.onClose}
      >
        <ul class="access-control-save-errors">
          ${this.errors.map((e) => s`
            <li>
              <span class="access-control-save-error-label">${e.label}</span>
              <span class="access-control-save-error-detail">
                ${e.action === "grant" ? `Could not grant ${e.role ?? "access"} for ${e.scope ? this.getScopeLabel(e.scope) : "resource"}` : e.action === "revoke" ? `Could not remove access for ${e.scope ? this.getScopeLabel(e.scope) : "resource"}` : e.action === "reset" ? "Could not reset sharing" : "Could not save access changes"}
              </span>
              <span class="access-control-save-error-message">${e.message}</span>
            </li>
          `)}
        </ul>
      </solid-ui-error-state>
    ` : s``;
	}
}, {e: [pt, ht, lt], c: [At, ut]} = wt(ct, [[
	ft,
	1,
	"errors"
], [
	mt,
	1,
	"successfulChangesRefreshed"
]], dt, 0, void 0, i), ct), st = class extends kt {
	constructor() {
		super(At), Ct(this, "styles", ot), ut();
	}
}, Ct(st, gt, void 0), st)();
// src/components/access-control-modal/AccessControlModal.styles.css
var jt = a`:host{& .access-control-sharing-state,& .access-control-contents-prompt{box-sizing:border-box;min-width:0;max-width:100%;font-size:var(--solid-ui-font-size-sm,.875rem);margin-bottom:16px;padding:10px;& p{overflow-wrap:anywhere;min-width:0;max-width:100%;color:var(--solid-ui-color-gray-600,#4a5565);margin:0;line-height:1.5}}& .access-control-sharing-state-panel,& .access-control-contents-prompt{box-sizing:border-box;min-width:0;max-width:100%;font-size:var(--solid-ui-font-size-sm,.875rem);border:1px solid var(--solid-ui-color-slate-200,#e2e8f0);background:var(--solid-ui-color-white,#fff);border-radius:5px;padding:10px 15px}& .access-control-sharing-state-panel{grid-template-columns:auto minmax(0,1fr);gap:10px;display:grid;& .access-control-sharing-state-icon{width:16px;height:16px;color:var(--solid-ui-color-gray-600,#4a5565);margin-top:2px}& .access-control-sharing-state-message{gap:10px;min-width:0;display:grid}& p{overflow-wrap:anywhere;min-width:0;max-width:100%}& .access-control-sharing-state-emphasis{font-weight:600}& .access-control-sharing-state-custom-row{flex-wrap:wrap;align-items:center;gap:8px;display:flex;& p{flex:auto}& solid-ui-button{--solid-ui-font-size-md:var(--solid-ui-font-size-sm,.875rem);flex:none}}}& .access-control-sharing-guidance{justify-content:space-between;align-items:center;gap:12px;min-width:0;display:flex;& p{overflow-wrap:anywhere;min-width:0;max-width:100%}& solid-ui-button{--solid-ui-font-size-md:var(--solid-ui-font-size-sm,.875rem);flex:none}}& .access-control-sharing-state-actions{flex-direction:column;justify-content:flex-end;align-items:flex-end;gap:8px;min-width:0;margin-top:10px;display:flex;& solid-ui-button{--solid-ui-font-size-md:var(--solid-ui-font-size-sm,.875rem);max-width:100%}}@media (width<=420px){& .access-control-sharing-guidance{flex-direction:column;align-items:flex-start;gap:8px;& solid-ui-button{align-self:flex-end}}}& .access-control-contents-prompt{& .access-control-contents-prompt-actions{flex-wrap:wrap;gap:8px;min-width:0;margin-top:10px;display:flex}& solid-ui-button{--solid-ui-font-size-md:var(--solid-ui-font-size-sm,.875rem);flex:0 auto;max-width:100%}}& .access-control-contents-prompt h2{margin-bottom:4px}& .access-control-footer-actions{justify-content:flex-end;align-items:center;gap:15px;width:100%;display:flex;&>solid-ui-button{min-width:132px}}@media (width<=380px){& .access-control-footer-actions{gap:8px;&>solid-ui-button{flex:1 1 0;min-width:0}}}}`;
// src/components/access-control-modal/accessGrantDrafts.ts
function Mt(e) {
	return {
		...e,
		agentClass: e.agentClass.filter((e) => e !== m.iri && e !== p.iri)
	};
}
function Nt(e) {
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
function Pt(e) {
	return e.id ? e.id : Nt(e).map((e) => `${e.type}:${e.iri}`).sort().join("|");
}
function Ft(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = Pt(Mt(e)), r = t.get(n) ?? 0;
		return t.set(n, r + 1), r === 0 ? n : `${n}#${r}`;
	});
}
function It(e) {
	let t = [
		...e.agent,
		...e.agentGroup,
		...e.agentClass,
		...e.origin
	];
	return t.length ? t.map((e) => c(d(e))).join(", ") : "Unknown access holder";
}
function Lt(e) {
	return _.acl.roleFromModes(e.mode);
}
function Rt(e) {
	let t = Mt(e);
	return {
		id: Pt(t),
		authorization: t,
		role: Lt(t),
		initialRole: Lt(e),
		subjectLabel: It(t),
		subjects: Nt(t)
	};
}
function zt(e) {
	let t = Ft(e);
	return e.map((e, n) => ({
		...Rt(e),
		id: t[n]
	}));
}
function Bt(e) {
	return [...e].sort((t, n) => {
		let r = t.role === "Owner", i = n.role === "Owner";
		return r && !i ? -1 : !r && i ? 1 : e.indexOf(t) - e.indexOf(n);
	});
}
function Vt(e) {
	return Bt(e).filter(({ role: e, initialRole: t, scope: n, initialScope: r, subjects: i }) => (e !== t || n !== r) && i.length > 0).map(({ authorization: e, subjects: t, role: n, scope: r, initialScope: i }) => ({
		authorization: e,
		subjects: t,
		role: n,
		scope: r,
		initialScope: i
	}));
}
function Ht(e) {
	let t = e.filter((e) => e.agentClass.includes(m.iri)).flatMap((e) => e.mode);
	return t.length ? _.acl.roleFromModes(t) : "No Access";
}
function Ut(e) {
	let t = e.filter((e) => e.agentClass.includes(p.iri)).flatMap((e) => e.mode);
	return t.length ? _.acl.publicRoleFromModes(t) : "No Access";
}
function Wt(e) {
	return e.iri === m.iri ? "Authenticated users" : e.iri === p.iri ? "Public" : c(d(e.iri)).trim() || e.iri;
}
// ~icons/lucide/book-user
var Gt = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15 13a3 3 0 1 0-6 0\"/><path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\"/><circle cx=\"12\" cy=\"8\" r=\"2\"/></g></svg>";
	}
};
customElements.get("icon-lucide-book-user") || customElements.define("icon-lucide-book-user", Gt);
// ~icons/lucide/user-round
var Kt = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"8\" r=\"5\"/><path d=\"M20 21a8 8 0 0 0-16 0\"/></g></svg>";
	}
};
customElements.get("icon-lucide-user-round") || customElements.define("icon-lucide-user-round", Kt);
// ~icons/lucide/users
var qt = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/></g></svg>";
	}
};
customElements.get("icon-lucide-users") || customElements.define("icon-lucide-users", qt);
// src/components/access-control-modal/AccessControlAddAccess.styles.css
var Jt = a`:host{& .access-grants-form{font-size:var(--solid-ui-font-size-sm,.875rem);--access-role-select-width:129px;flex-direction:column;align-self:stretch;align-items:flex-start;gap:10px;padding:10px;display:flex;& p{color:var(--solid-ui-color-gray-600,#4a5565);line-height:1.5}& .access-grants-form-heading{justify-content:space-between;align-items:center;gap:12px;width:100%;display:flex}& .access-control-advanced-toggle{min-height:42px;color:var(--solid-ui-color-gray-600,#4a5565);cursor:pointer;font:inherit;background:0 0;border:0;flex:none;align-items:center;gap:8px;padding:8px 0;display:inline-flex;&:focus-visible{outline:var(--focus-indicator-width,2px) solid var(--solid-ui-color-primary,#7c4dff);outline-offset:2px}}& .access-control-switch-track{background:var(--solid-ui-color-gray-300,#d1d5dc);border-radius:999px;align-items:center;width:28px;height:16px;padding:2px;transition:background-color .12s;display:inline-flex}& .access-control-switch-thumb{background:var(--solid-ui-color-white,#fff);border-radius:50%;width:12px;height:12px;transition:transform .12s}& .access-control-advanced-toggle[aria-checked=true]{& .access-control-switch-track{background:var(--solid-ui-color-primary,#6d28d9)}& .access-control-switch-thumb{transform:translate(12px)}}& .access-grants-form-main{align-self:stretch;align-items:flex-start;gap:10px;display:flex;& .access-grants-input{border:1px solid var(--solid-ui-color-slate-200,#e2e8f0);background:var(--solid-ui-color-white,#fff);border-radius:5px;flex-direction:column;flex:auto;align-items:flex-start;gap:12px;min-width:0;padding:10px 15px;display:flex;& solid-ui-combobox{--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0);--solid-ui-combobox-option-icon-size:13px;width:100%}& .access-principal-error{color:var(--solid-ui-color-red-700,#b42318);font-size:var(--solid-ui-font-size-xs,.75rem);margin:0;line-height:1.4}}}& .access-grants-pending{flex-wrap:wrap;align-items:center;gap:8px;min-height:42px;display:flex}& .access-grants-pending-item{border:1px solid var(--solid-ui-color-gray-300,#d1d5dc);background:var(--solid-ui-color-gray-50,#f9fafb);max-width:100%;color:var(--solid-ui-color-gray-700,#374151);border-radius:5px;align-items:center;gap:6px;padding:5px 10px;display:flex}& .access-grants-pending-item-label{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--solid-ui-color-gray-500,#6a7282);font-size:var(--solid-ui-font-size-xs,.75rem);line-height:1;overflow:hidden}& .access-grants-pending-item-remove{color:var(--solid-ui-color-gray-300,#d1d5dc);cursor:pointer;background:0 0;border:none;border-radius:999px;justify-content:center;align-items:center;padding:0;display:inline-flex;& icon-lucide-circle-x{width:14px;height:14px}}}& .access-role-select{max-width:100%;width:var(--access-role-select-width);--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0);flex:none;margin-top:25px;display:block}& .access-role-select--top{margin-top:0}}`, Yt, Xt, R, z, B, V, H, U, W, G, Zt, Qt, $t, en, tn, nn, rn, an, on, sn, cn, ln, un, dn, fn, pn, mn, hn, gn, _n, vn, yn, bn, xn;
function K(e, t, n) {
	Sn(e, t), t.set(e, n);
}
function Sn(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function q(e, t, n) {
	return e.set(Cn(e, t), n), n;
}
function J(e, t) {
	return e.get(Cn(e, t));
}
function Cn(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function wn(e, t, n) {
	return (t = En(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Tn(e, t, n, r, i, a) {
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
				get: On(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || On(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return kn(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : En(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function En(e) {
	var t = Dn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Dn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function On(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function kn(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function An(e) {
	return e;
}
function jn(e) {
	if (e.sources.includes("contacts") || e.sources.includes("groups")) return s`<icon-lucide-book-user></icon-lucide-book-user>`;
	if (e.sources.includes("friends")) return s`<icon-lucide-users></icon-lucide-users>`;
	if (e.sources.includes("catalog")) return s`<icon-lucide-user-round></icon-lucide-user-round>`;
}
en = [n("solid-ui-access-control-add-access")];
var Mn;
new (bn = (R = /*#__PURE__*/ new WeakMap(), z = /*#__PURE__*/ new WeakMap(), B = /*#__PURE__*/ new WeakMap(), V = /*#__PURE__*/ new WeakMap(), H = /*#__PURE__*/ new WeakMap(), U = /*#__PURE__*/ new WeakMap(), W = /*#__PURE__*/ new WeakMap(), G = /*#__PURE__*/ new WeakMap(), Zt = /*#__PURE__*/ new WeakMap(), xn = (tn = r({ attribute: !1 }), rn = r({ attribute: !1 }), on = r({ attribute: !1 }), cn = r({ attribute: !1 }), un = r({ type: Boolean }), fn = r({ attribute: !1 }), mn = r({ type: Boolean }), gn = r({ type: Boolean }), vn = y(".access-role-select--top"), "principalInputValue"), Xt = class extends i {
	constructor(...e) {
		super(...e), K(this, R, (Qt(this), nn(this, ""))), K(this, z, an(this, "No Access")), K(this, B, sn(this, [])), K(this, V, ln(this, "")), K(this, H, dn(this, !1)), K(this, U, pn(this, null)), K(this, W, hn(this, !1)), K(this, G, _n(this, !1)), K(this, Zt, yn(this, null));
	}
	get [xn]() {
		return J(R, this);
	}
	set principalInputValue(e) {
		q(R, this, e);
	}
	get addAccessRoleValue() {
		return J(z, this);
	}
	set addAccessRoleValue(e) {
		q(z, this, e);
	}
	get pendingAccessGrants() {
		return J(B, this);
	}
	set pendingAccessGrants(e) {
		q(B, this, e);
	}
	get inputError() {
		return J(V, this);
	}
	set inputError(e) {
		q(V, this, e);
	}
	get disabled() {
		return J(H, this);
	}
	set disabled(e) {
		q(H, this, e);
	}
	get asyncOptionsProvider() {
		return J(U, this);
	}
	set asyncOptionsProvider(e) {
		q(U, this, e);
	}
	get showAdvancedToggle() {
		return J(W, this);
	}
	set showAdvancedToggle(e) {
		q(W, this, e);
	}
	get advancedSharingOpen() {
		return J(G, this);
	}
	set advancedSharingOpen(e) {
		q(G, this, e);
	}
	get roleCombobox() {
		return J(Zt, this);
	}
	set roleCombobox(e) {
		q(Zt, this, e);
	}
	updated(e) {
		super.updated(e);
		let t = this.roleCombobox;
		e.has("addAccessRoleValue") && t && t.value !== this.addAccessRoleValue && (t.value = this.addAccessRoleValue);
	}
	onAdvancedSharingToggle() {
		this.dispatchEvent(new CustomEvent("advanced-sharing-changed", {
			detail: { open: !this.advancedSharingOpen },
			bubbles: !0,
			composed: !0
		}));
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
		let t = e.detail.option.value, n = typeof t == "string" ? f.find((e) => e === t) : void 0;
		if (n && (this.dispatchEvent(new CustomEvent("role-changed", {
			detail: { role: n },
			bubbles: !0,
			composed: !0
		})), this.roleCombobox)) {
			this.roleCombobox.value = "No Access";
			let e = this.roleCombobox.shadowRoot?.querySelector("input");
			e && (e.value = "No Access");
		}
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
		return s`
      <section class="access-grants-form" aria-label="Add access">
        <div class="access-grants-form-heading">
          <p>Add person, group or software agent URL.</p>
          ${this.showAdvancedToggle ? s`
              <button
                type="button"
                class="access-control-advanced-toggle"
                role="switch"
                aria-checked=${this.advancedSharingOpen ? "true" : "false"}
                @click=${this.onAdvancedSharingToggle}
              >
                <span class="access-control-switch-track" aria-hidden="true">
                  <span class="access-control-switch-thumb"></span>
                </span>
                <span>Advanced</span>
              </button>
            ` : t}
        </div>
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
            ${this.inputError ? s`<p class="access-principal-error" role="alert">${this.inputError}</p>` : t}
            ${this.renderPendingAccessGrants()}
          </div>
          <solid-ui-combobox
            class="access-role-select access-role-select--top"
            label="Access role for added people"
            .srOnlyLabel=${!0}
            .disabled=${this.disabled || !this.pendingAccessGrants.length}
            .value=${this.addAccessRoleValue}
            @change=${this.onRoleChange}
          >
            ${f.map((e) => s`
                <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
              `)}
          </solid-ui-combobox>
        </div>
      </section>
    `;
	}
	renderPendingAccessGrants() {
		return this.pendingAccessGrants.length ? s`
      <div class="access-grants-pending">
        ${this.pendingAccessGrants.map((e, n) => s`
          <div class="access-grants-pending-item">
            <span class="access-grants-pending-item-label">
              ${e.targetKind === "trustedApp" ? s`<icon-lucide-globe style="width: 13px; height: 13px; vertical-align: -2px;"></icon-lucide-globe>` : t}
              ${e.label}
            </span>
            <solid-ui-button
              type="button"
              variant="ghost"
              class="access-grants-pending-item-remove"
              ?disabled=${this.disabled}
              @click=${() => this.onPendingGrantRemove(n)}
            >
              <span class="sr-only">Remove ${e.label}</span>
              <icon-lucide-circle-x slot="icon"></icon-lucide-circle-x>
            </solid-ui-button>
          </div>
        `)}
      </div>
    ` : t;
	}
}, {e: [nn, an, sn, ln, dn, pn, hn, _n, yn, Qt], c: [Mn, $t]} = Tn(Xt, [
	[
		tn,
		1,
		"principalInputValue"
	],
	[
		rn,
		1,
		"addAccessRoleValue"
	],
	[
		on,
		1,
		"pendingAccessGrants"
	],
	[
		cn,
		1,
		"inputError"
	],
	[
		un,
		1,
		"disabled"
	],
	[
		fn,
		1,
		"asyncOptionsProvider"
	],
	[
		mn,
		1,
		"showAdvancedToggle"
	],
	[
		gn,
		1,
		"advancedSharingOpen"
	],
	[
		vn,
		1,
		"roleCombobox"
	]
], en, 0, void 0, i), Xt), Yt = class extends An {
	constructor() {
		super(Mn), wn(this, "styles", Jt), $t();
	}
}, wn(Yt, bn, void 0), Yt)();
// src/components/access-control-modal/helpers.ts
function Nn(e) {
	try {
		let t = new URL(e);
		return (t.protocol === "http:" || t.protocol === "https:") && !!t.hostname;
	} catch {
		return !1;
	}
}
function Pn(e) {
	if (!Nn(e)) return !1;
	let t = new URL(e);
	return t.pathname === "/" && !t.search && !t.hash && !t.username && !t.password;
}
function Fn(e) {
	let t = e.trim();
	if (t && !Nn(t)) try {
		let e = new URL(`https://${t}`), n = e.protocol === "http:" || e.protocol === "https:", r = e.pathname === "/" && !e.search && !e.hash, i = e.hostname.includes(".") || e.hostname.includes(":");
		return n && r && i && !e.username && !e.password ? e.origin : void 0;
	} catch {
		return;
	}
}
function In(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = t(r);
		e && !n.has(e) && n.set(e, r);
	}
	return [...n.values()];
}
function Ln(e) {
	return In(e, (e) => e.value);
}
// src/components/access-control-modal/accessTargetResolver.ts
var Rn = [
	"contacts",
	"friends",
	"groups"
];
async function zn(e) {
	let t = Fn(e);
	return t ? {
		kind: "origin",
		subjectValue: t
	} : Pn(e) ? {
		kind: "origin",
		subjectValue: new URL(e).origin
	} : await _.acl.classifyAccessControlSubject(e);
}
async function Bn(e, t) {
	if (!e || e.kind === "origin") return e?.subjectValue;
	let n = d(e.subjectValue);
	await _.store.fetcher.load(n.doc());
	let r = t?.trim() || c(n).trim();
	if (!r || r === e.subjectValue) throw Error("The access target has no usable display label.");
	return r;
}
async function Vn(e, t) {
	let n = await zn(e);
	if (!n) return;
	let r = await Bn(n, t);
	if (r) return {
		subjectType: n.kind,
		subjectValue: n.subjectValue,
		label: r,
		targetKind: n.kind === "origin" ? "origin" : void 0
	};
}
async function Hn(e) {
	let t = await Vn(e);
	return t ? {
		label: t.label,
		value: e
	} : void 0;
}
function Un(e, t) {
	return {
		label: t,
		value: e.uri,
		icon: jn(e)
	};
}
async function Wn(e) {
	let t = Fn(e);
	if (t) return [{
		label: `Use origin ${t}`,
		value: t,
		targetKind: "origin",
		icon: s`<icon-lucide-globe></icon-lucide-globe>`
	}];
	if (!Nn(e)) return [];
	if (Pn(e)) return [{
		label: `Use origin ${new URL(e).origin}`,
		value: new URL(e).origin,
		targetKind: "origin",
		icon: s`<icon-lucide-globe></icon-lucide-globe>`
	}];
	let n = await Hn(e);
	return Ln(n ? [n] : []);
}
async function Gn(e) {
	try {
		let t = _.authn.currentUser();
		if (!t) return [];
		await _.profile.loadProfile(t);
		let n = _.store;
		return n.each(t, v.acl("trustedApp")).flatMap((t) => {
			let r = n.any(t, v.acl("origin"));
			if (!r || !Pn(r.value)) return [];
			let i = new URL(r.value).origin;
			return e && !`${i} trusted app`.toLowerCase().includes(e.toLowerCase()) ? [] : [{
				label: `Trusted app: ${i}`,
				value: i,
				targetKind: "trustedApp",
				icon: s`<icon-lucide-globe></icon-lucide-globe>`
			}];
		});
	} catch {
		return [];
	}
}
function Kn(e) {
	return e.length ? e : [{
		label: "Type at least 2 characters to search",
		value: "",
		selectable: !1
	}];
}
var qn = b(async (e) => {
	let t = e.trim(), n = await Wn(t), r = await Gn(t);
	if (t.length < 2) return In([
		...n,
		...r,
		...Kn(n)
	], (e) => {
		let t = e;
		return typeof t.value == "string" ? `${t.value}:${t.targetKind ?? "default"}` : void 0;
	});
	let i = [];
	try {
		i = await _.directory.search({
			query: t,
			sources: Rn
		});
	} catch (e) {
		if (!n.length && !r.length) throw e;
	}
	let a = (await Promise.all(i.map(async (e) => {
		try {
			let t = await Vn(e.uri, e.label);
			return t ? {
				entry: e,
				label: t.label
			} : void 0;
		} catch {
			return;
		}
	}))).filter((e) => e !== void 0).map(({ entry: e, label: t }) => Un(e, t));
	return In([
		...n,
		...r,
		...a
	], (e) => {
		let t = e;
		return typeof t.value == "string" ? `${t.value}:${t.targetKind ?? "default"}` : void 0;
	});
});
// src/components/access-control-modal/applyAccessChanges.ts
async function Jn(e, t, n = {}) {
	let r = [], i = n.containerScope ?? "file", a = new URL(e).pathname.endsWith("/");
	for (let { subject: n, label: o, role: s, scope: c, previousScope: l } of t) {
		let t = Yn(a ? c ?? i : "file"), u = a && l ? Yn(l) : "file";
		try {
			if (l && u !== t) {
				let r = u === "contents" || u === "folder+contents" && t === "container" ? await _.acl.planRevokeContainerContents(e, n) : await _.acl.planRevoke(e, n);
				await _.acl.applyPlan(r);
			}
			let r = t === "folder+contents" ? _.acl.planGrantContainerAndContents : t === "container" ? _.acl.planGrantContainer : t === "contents" ? _.acl.planGrantContainerContents : _.acl.planGrant, i = s === "No Access" ? await (t === "contents" ? _.acl.planRevokeContainerContents(e, n) : _.acl.planRevoke(e, n)) : await r(e, n, Xn(n, s));
			await _.acl.applyPlan(i);
		} catch (e) {
			r.push({
				action: s === "No Access" ? "revoke" : "grant",
				targetUri: n.iri,
				label: o,
				role: s,
				scope: t,
				message: e instanceof Error ? e.message : "Unable to apply access change."
			});
		}
	}
	return r;
}
function Yn(e) {
	return e === "folder" ? "container" : e;
}
function Xn(e, t) {
	if (e.type === "agentClass" && e.iri === p.iri) {
		let e = h.find((e) => e === t);
		if (!e) throw Error(`Public access does not support the ${t} role.`);
		return _.acl.modesFromPublicRole(e);
	}
	return _.acl.modesFromRole(t);
}
// src/components/access-control-modal/buildAccessChanges.ts
function Zn({ pendingAccessGrants: e, generalAccessChanges: t, changedAccessGrants: n }) {
	return [
		...e.map((e) => ({
			subject: {
				type: e.subjectType,
				iri: e.subjectValue
			},
			role: e.role,
			label: e.label,
			scope: e.scope
		})),
		...t,
		...n.flatMap(({ subjects: e, role: t, scope: n, initialScope: r }) => e.map((e) => ({
			subject: e,
			role: t,
			label: Wt(e),
			scope: n,
			previousScope: r === n ? void 0 : r
		})))
	];
}
// src/components/access-control-modal/AccessControlModal.ts
var Qn, $n, er, tr, nr, rr, ir, ar, or, sr, cr, lr, ur, Y, dr, fr, pr, mr, hr, gr, _r, vr, yr, br, xr, Sr, Cr, wr, Tr, Er, Dr, Or, kr, Ar, jr, Mr, Nr, Pr, Fr, Ir, Lr, Rr, zr, Br, Vr, Hr, Ur, Wr, Gr, Kr, qr, Jr, Yr, Xr, Zr, Qr, $r, ei;
function X(e, t, n) {
	ti(e, t), t.set(e, n);
}
function ti(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function Z(e, t, n) {
	return e.set(ni(e, t), n), n;
}
function Q(e, t) {
	return e.get(ni(e, t));
}
function ni(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function $(e, t, n) {
	return (t = ii(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ri(e, t, n, r, i, a) {
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
				get: oi(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || oi(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return si(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : ii(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function ii(e) {
	var t = ai(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ai(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function oi(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function si(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function ci(e) {
	return e;
}
function li(e) {
	return e != null;
}
vr = [n("solid-ui-access-control-modal")];
var ui;
new ($r = (er = /*#__PURE__*/ new WeakMap(), tr = /*#__PURE__*/ new WeakMap(), nr = /*#__PURE__*/ new WeakMap(), rr = /*#__PURE__*/ new WeakMap(), ir = /*#__PURE__*/ new WeakMap(), ar = /*#__PURE__*/ new WeakMap(), or = /*#__PURE__*/ new WeakMap(), sr = /*#__PURE__*/ new WeakMap(), cr = /*#__PURE__*/ new WeakMap(), lr = /*#__PURE__*/ new WeakMap(), ur = /*#__PURE__*/ new WeakMap(), Y = /*#__PURE__*/ new WeakMap(), dr = /*#__PURE__*/ new WeakMap(), fr = /*#__PURE__*/ new WeakMap(), pr = /*#__PURE__*/ new WeakMap(), mr = /*#__PURE__*/ new WeakMap(), hr = /*#__PURE__*/ new WeakMap(), ei = (yr = r({ attribute: !1 }), xr = r({ attribute: !1 }), Cr = o(), Tr = o(), Dr = o(), kr = o(), jr = o(), Nr = o(), Fr = o(), Lr = o(), zr = o(), Vr = o(), Ur = o(), Gr = o(), qr = o(), Yr = o(), Zr = o(), "subjectUri"), $n = class extends e {
	constructor(...e) {
		super(...e), X(this, er, (gr(this), br(this, void 0))), X(this, tr, Sr(this, void 0)), X(this, nr, wr(this, "")), X(this, rr, Er(this, "No Access")), X(this, ir, Or(this, "No Access")), X(this, ar, Ar(this, "No Access")), X(this, or, Mr(this, !1)), X(this, sr, Pr(this, [])), X(this, cr, Ir(this, [])), X(this, lr, Rr(this, [])), X(this, ur, Br(this, !0)), X(this, Y, Hr(this)), X(this, dr, Wr(this, !1)), X(this, fr, Kr(this, "")), X(this, pr, Jr(this, "folder+contents")), X(this, mr, Xr(this, !1)), X(this, hr, Qr(this, !1)), $(this, "accessGrantLabelRequestVersion", 0), $(this, "accessContextRequestVersion", 0), $(this, "accessContextSubjectUri", void 0);
	}
	get [ei]() {
		return Q(er, this);
	}
	set subjectUri(e) {
		Z(er, this, e);
	}
	get accessGrants() {
		return Q(tr, this);
	}
	set accessGrants(e) {
		Z(tr, this, e);
	}
	get principalInputValue() {
		return Q(nr, this);
	}
	set principalInputValue(e) {
		Z(nr, this, e);
	}
	get addAccessRoleValue() {
		return Q(rr, this);
	}
	set addAccessRoleValue(e) {
		Z(rr, this, e);
	}
	get authenticatedAccessRoleValue() {
		return Q(ir, this);
	}
	set authenticatedAccessRoleValue(e) {
		Z(ir, this, e);
	}
	get publicAccessRoleValue() {
		return Q(ar, this);
	}
	set publicAccessRoleValue(e) {
		Z(ar, this, e);
	}
	get submitting() {
		return Q(or, this);
	}
	set submitting(e) {
		Z(or, this, e);
	}
	get pendingAccessGrants() {
		return Q(sr, this);
	}
	set pendingAccessGrants(e) {
		Z(sr, this, e);
	}
	get accessGrantDrafts() {
		return Q(cr, this);
	}
	set accessGrantDrafts(e) {
		Z(cr, this, e);
	}
	get errors() {
		return Q(lr, this);
	}
	set errors(e) {
		Z(lr, this, e);
	}
	get successfulChangesRefreshed() {
		return Q(ur, this);
	}
	set successfulChangesRefreshed(e) {
		Z(ur, this, e);
	}
	get accessContext() {
		return Q(Y, this);
	}
	set accessContext(e) {
		Z(Y, this, e);
	}
	get accessContextLoading() {
		return Q(dr, this);
	}
	set accessContextLoading(e) {
		Z(dr, this, e);
	}
	get accessContextError() {
		return Q(fr, this);
	}
	set accessContextError(e) {
		Z(fr, this, e);
	}
	get containerScope() {
		return Q(pr, this);
	}
	set containerScope(e) {
		Z(pr, this, e);
	}
	get advancedSharingOpen() {
		return Q(mr, this);
	}
	set advancedSharingOpen(e) {
		Z(mr, this, e);
	}
	get protectedTarget() {
		return Q(hr, this);
	}
	set protectedTarget(e) {
		Z(hr, this, e);
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
			l("Failed to load access control context", e);
		})), e.has("accessGrants") && this.refreshAccessGrantLabels().catch((e) => {
			l("Failed to refresh access grant labels", e);
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
				await _.store.fetcher.load(d(e).doc());
			} catch {}
		})), It(Mt(e)))));
		if (e === this.accessGrantLabelRequestVersion && this.accessGrants === t && this.subjectUri === n && this.getScopedAccessGrants() === r) {
			let e = new Map(Ft(r).map((e, t) => [e, i[t]]));
			this.accessGrantDrafts = this.accessGrantDrafts.map((t) => ({
				...t,
				subjectLabel: e.get(t.id) ?? t.subjectLabel
			}));
		}
	}
	getDialogTitle() {
		let e = this.subjectUri ? d(this.subjectUri) : void 0, t = e ? c(e).trim() : "";
		return !t || t === "this resource" ? "Manage Access of \"this resource\"" : `Manage Access of "${t}"`;
	}
	isContainer() {
		return !!(this.subjectUri && new URL(this.subjectUri).pathname.endsWith("/"));
	}
	async loadAccessContext() {
		let e = ++this.accessContextRequestVersion, t = this.subjectUri;
		if (this.accessContext = void 0, this.accessContextSubjectUri = void 0, this.accessContextError = "", this.accessContextLoading = !!t, !t) this.accessContextLoading = !1;
		else try {
			let n = await _.acl.findEffectiveAcl(t);
			if (e !== this.accessContextRequestVersion || this.subjectUri !== t) return;
			this.accessContext = n, this.accessContextSubjectUri = t, this.accessGrants?.length || (this.accessGrants = this.accessContext.authorizations), this.refreshContainerScopeState(), this.protectedTarget = _.acl.isProtectedResource(t), this.protectedTarget && this.refreshScopedAccessGrantDrafts();
		} catch (n) {
			if (e !== this.accessContextRequestVersion || this.subjectUri !== t) return;
			this.accessContextError = n instanceof Error && n.message.trim() ? n.message : "Unable to load access settings for this resource.", l("Failed to load access control context", n);
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
		let t = d(e), n = _.resource.isStorageRoot(t), r = _.authn.currentUser(), i = (r ? _.profile.findStorage(r) : null)?.toString() === t.toString();
		return n || i ? "your main storage" : c(t);
	}
	renderSharingInformation() {
		if (!this.accessContext) return t;
		let e = this.accessContext.effectiveContainer, n = e ? this.getInheritedContainerDisplayName(e) : "the parent container.";
		return s`
      <div class="access-control-sharing-state-panel">
        <icon-lucide-lock-keyhole class="access-control-sharing-state-icon" aria-hidden="true"></icon-lucide-lock-keyhole>
        <div class="access-control-sharing-state-message">
          ${this.accessContext.inherited ? e ? s`<p>Permissions on this resource come from <span class="access-control-sharing-state-emphasis">${n}</span>.</p>` : s`<p>Permissions on this resource come from a parent folder, but no sharing rules are in place.</p>` : s`
              <div class="access-control-sharing-state-custom-row">
                <p>This resource has explicitly defined sharing permissions.</p>
                ${this.protectedTarget ? t : s`
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
          ${this.protectedTarget ? s`<p class="access-control-sharing-state-protected-message">This is a protected storage resource. Its primary access-control settings cannot be changed here.</p>` : t}
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
		return this.accessContextLoading ? s`<p role="status">Loading access settings...</p>` : this.accessContextError ? s`
        <solid-ui-error-state
          title="Could not load access settings"
          message=${this.accessContextError}
        >
          <solid-ui-button type="button" variant="secondary" @click=${this.retryAccessContext}>
            Retry
          </solid-ui-button>
        </solid-ui-error-state>
      ` : this.accessContext ? t : s`<p role="status">Access settings are not ready yet.</p>`;
	}
	getScopedAccessGrants() {
		return this.accessGrants ?? [];
	}
	refreshScopedAccessGrantDrafts() {
		let e = this.getScopedAccessGrants(), t = zt(e);
		this.accessGrantDrafts = t.map((t, n) => {
			let r = this.isContainer() && this.subjectUri ? g(this.subjectUri, e[n], this.accessContext?.inherited ?? !1) ?? "folder+contents" : void 0;
			return {
				...t,
				scope: r,
				initialScope: r
			};
		}), this.isContainer() && this.accessContext && this.accessGrantDrafts.some((e) => e.scope !== void 0 && e.scope !== "folder+contents") && (this.advancedSharingOpen = !0), this.authenticatedAccessRoleValue = Ht(e), this.publicAccessRoleValue = Ut(e);
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
		return [...Bt(this.accessGrantDrafts), ...e];
	}
	render() {
		let e = this.getDialogTitle();
		return s`
      <solid-ui-dialog title=${e}>
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
              .asyncOptionsProvider=${qn}
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
				await _.acl.resetToDefault(this.subjectUri), await this.loadAccessContext();
				let e = await _.acl.findAccessGrants(this.subjectUri);
				this.accessGrants = this.accessContext?.inherited ? this.accessContext.authorizations : e;
			} catch (e) {
				this.errors = [...this.errors, {
					action: "reset",
					targetUri: this.subjectUri,
					label: "Custom sharing",
					message: e instanceof Error ? e.message : "Unable to reset sharing."
				}], l("Failed to reset access control", e);
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
		let n = Vt(this.accessGrantDrafts), r = this.getGeneralAccessChanges();
		if ((this.pendingAccessGrants.length || n.length || r.length) && this.subjectUri) {
			this.submitting = !0, this.errors = this.errors.filter((e) => e.action === "input"), this.successfulChangesRefreshed = !0;
			try {
				let t = Zn({
					pendingAccessGrants: this.pendingAccessGrants,
					generalAccessChanges: r,
					changedAccessGrants: n
				}), i = await Jn(this.subjectUri, t, { containerScope: e });
				if (i.length) {
					this.errors = [...this.errors, ...i], this.principalInputValue = "", this.pendingAccessGrants = [];
					try {
						this.accessGrants = await _.acl.findAccessGrants(this.subjectUri);
					} catch (e) {
						this.successfulChangesRefreshed = !1, this.errors = [...this.errors, {
							action: "save",
							targetUri: this.subjectUri,
							label: "Shared with list",
							message: e instanceof Error ? e.message : "Unable to refresh the access list."
						}], l("Failed to refresh access grants after save errors", e);
					}
					l("Failed to save some access changes", i);
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
		let e = this.getScopedAccessGrants(), t = Ht(e), n = Ut(e);
		return [this.authenticatedAccessRoleValue === t ? void 0 : {
			subject: m,
			role: this.authenticatedAccessRoleValue,
			label: "Authenticated users"
		}, this.publicAccessRoleValue === n ? void 0 : {
			subject: p,
			role: this.publicAccessRoleValue,
			label: "Public"
		}].filter(li);
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
		return !!(this.pendingAccessGrants.length || this.principalInputValue.trim() || Vt(this.accessGrantDrafts).length || this.getGeneralAccessChanges().length);
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
			}), l("Failed to commit pending access grants", t), !1) : (l("Ignored stale access-target validation error", t), !1);
		}
	}
	async queuePendingPrincipal(e, t = this.addAccessRoleValue, n, r, i) {
		let a = r ?? this.principalInputValue.trim(), o = await this.createPendingAccessGrant(e, t, n, i);
		if ("error" in o) return this.principalInputValue.trim() === a && this.setInputError(o.error), l("Failed to add access grant:", o.error.message), !1;
		let s = [...this.pendingAccessGrants, o.grant];
		return this.pendingAccessGrants = this.dedupePendingAccessGrants(s), this.principalInputValue.trim() === a && (this.clearInputError(), this.principalInputValue = ""), !0;
	}
	async createPendingAccessGrant(e, t = this.addAccessRoleValue, n, r) {
		try {
			let i = e.trim(), a = await Vn(i, n);
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
}, {e: [br, Sr, wr, Er, Or, Ar, Mr, Pr, Ir, Rr, Br, Hr, Wr, Kr, Jr, Xr, Qr, gr], c: [ui, _r]} = ri($n, [
	[
		yr,
		1,
		"subjectUri"
	],
	[
		xr,
		1,
		"accessGrants"
	],
	[
		Cr,
		1,
		"principalInputValue"
	],
	[
		Tr,
		1,
		"addAccessRoleValue"
	],
	[
		Dr,
		1,
		"authenticatedAccessRoleValue"
	],
	[
		kr,
		1,
		"publicAccessRoleValue"
	],
	[
		jr,
		1,
		"submitting"
	],
	[
		Nr,
		1,
		"pendingAccessGrants"
	],
	[
		Fr,
		1,
		"accessGrantDrafts"
	],
	[
		Lr,
		1,
		"errors"
	],
	[
		zr,
		1,
		"successfulChangesRefreshed"
	],
	[
		Vr,
		1,
		"accessContext"
	],
	[
		Ur,
		1,
		"accessContextLoading"
	],
	[
		Gr,
		1,
		"accessContextError"
	],
	[
		qr,
		1,
		"containerScope"
	],
	[
		Yr,
		1,
		"advancedSharingOpen"
	],
	[
		Zr,
		1,
		"protectedTarget"
	]
], vr, 0, void 0, e), $n), Qn = class extends ci {
	constructor() {
		super(ui), $(this, "styles", jt), _r();
	}
}, $(Qn, $r, void 0), Qn)();
// src/components/access-control-modal/index.ts
var di = ui;
export { ui as n, di as t };

//# sourceMappingURL=access-control-modal-DZG3Uoa8.js.map