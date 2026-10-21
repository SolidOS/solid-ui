import { S as e, _ as t, a as n, b as r, g as i, i as a, k as o, m as s, v as c, y as l } from "./index.esm-CECfD0e9.js";
import { u } from "./style-w0Fl0xnd.js";
import { T as d, p as f } from "./widgets-BWpm5CPx.js";
import { a as p, c as m, g as h, i as g, o as _, p as v, r as y, u as b } from "./components-C8c2Ucm5.js";
import "./x-D1JUUSOS.js";
import "./button-D6qO2idW.js";
import "./dialog-CgYK767T.js";
import "./dialog-content-DjwRH1ci.js";
import "./dialog-footer-GQWi8lfB.js";
import { r as x } from "./combobox-fSTp9qoT.js";
import "./combobox-option-DOtGuKel.js";
import "./error-state-BD4_Wrkz.js";
// ~icons/lucide/circle-x
var S = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m15 9l-6 6m0-6l6 6\"/></g></svg>";
	}
};
customElements.get("icon-lucide-circle-x") || customElements.define("icon-lucide-circle-x", S);
// ~icons/lucide/folder
var C = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\"/></svg>";
	}
};
customElements.get("icon-lucide-folder") || customElements.define("icon-lucide-folder", C);
// ~icons/lucide/folder-open
var w = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m6 14l1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2\"/></svg>";
	}
};
customElements.get("icon-lucide-folder-open") || customElements.define("icon-lucide-folder-open", w);
// ~icons/lucide/globe
var T = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20\"/></g></svg>";
	}
};
customElements.get("icon-lucide-globe") || customElements.define("icon-lucide-globe", T);
// src/components/access-control-modal/AccessControlSharedAccess.styles.css
var E = v`:host{& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);font-weight:600}& .access-grants-header,& .access-grants-list{align-self:stretch;padding:0 10px}& .access-grants-header{justify-content:space-between;align-items:center;gap:15px;display:flex;& .access-grants-search-input{--solid-ui-input-border-color:transparent;width:12ch;min-width:12ch;color:var(--solid-ui-color-zinc-500,#71717b);font-size:var(--solid-ui-font-size-sm,.875rem);flex:none;font-weight:500}}& .access-grants-list{align-items:flex-start;gap:20px;display:flex;& ul{box-sizing:border-box;border:1px solid var(--solid-ui-color-gray-200,#e5e7eb);border-radius:10px;flex-direction:column;flex:1 0 0;align-items:flex-start;gap:15px;height:195px;min-height:0;padding:15px;display:flex;overflow:hidden auto}& li{flex:none;align-items:center;gap:10px;width:100%;display:flex;& .access-grants-image{aspect-ratio:1;width:30px;height:30px;color:var(--solid-ui-color-white,#fff);text-align:center;font-size:var(--solid-ui-font-size-xs,.75rem);border-radius:999px;flex:0 0 30px;justify-content:center;align-items:center;font-weight:500;display:flex;overflow:hidden;& img{object-fit:cover;border-radius:999px;width:100%;height:100%;display:flex}& span{justify-content:center;align-items:center;width:100%;height:100%;line-height:1;display:flex}}& .access-grants-image--agentGroup{background:var(--solid-ui-color-blue-900,#083575)}& .access-grants-image--agent,& .access-grants-image--agentClass{background:var(--solid-ui-color-lavender-300,#e6dcff)}& .access-grants-image--origin{background:var(--solid-ui-color-green-700,#15803d)}& .access-grants-image--unknown{background:var(--solid-ui-color-gray-300,#d1d5db)}& h3{min-width:0;color:var(--solid-ui-color-gray-800,#1e2939);font-size:var(--solid-ui-font-size-xs,.75rem);flex:auto;font-weight:600}& span{text-align:right;flex:none;margin-left:auto}& .access-grants-role{font-size:var(--solid-ui-font-size-xs,.75rem);flex:none;margin-left:auto}& .access-grants-role--owner{font-size:var(--solid-ui-font-size-xs,.75rem)}& .access-grants-role--editable{max-width:100%}}}& .access-role-select--compact{--solid-ui-input-border-color:transparent;flex:0 0 110px;width:110px;min-width:110px;max-width:100%;margin-top:0}& .access-grants-list li .access-role-select--compact{flex:0 0 110px;width:110px;min-width:110px}}`, D, O, k, A, j, ee, te, ne, re, ie, ae, oe, se, ce, le, ue;
function de(e, t, n) {
	fe(e, t), t.set(e, n);
}
function fe(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function pe(e, t, n) {
	return e.set(he(e, t), n), n;
}
function me(e, t) {
	return e.get(he(e, t));
}
function he(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function ge(e, t, n) {
	return (t = ve(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function _e(e, t, n, r, i, a) {
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
				get: be(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || be(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return xe(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : ve(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function ve(e) {
	var t = ye(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ye(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function be(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function xe(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Se(e) {
	return e;
}
ne = [h("solid-ui-access-control-shared-access")];
var Ce;
new (le = (k = /*#__PURE__*/ new WeakMap(), A = /*#__PURE__*/ new WeakMap(), j = /*#__PURE__*/ new WeakMap(), ue = (re = g({ attribute: !1 }), ae = g({ type: Boolean }), se = y(), "accessGrantViewModels"), O = class extends _ {
	constructor(...e) {
		super(...e), de(this, k, (ee(this), ie(this, []))), de(this, A, oe(this, !1)), de(this, j, ce(this, ""));
	}
	get [ue]() {
		return me(k, this);
	}
	set accessGrantViewModels(e) {
		pe(k, this, e);
	}
	get disabled() {
		return me(A, this);
	}
	set disabled(e) {
		pe(A, this, e);
	}
	get searchValue() {
		return me(j, this);
	}
	set searchValue(e) {
		pe(j, this, e);
	}
	onSearchInput(e) {
		let t = e.currentTarget;
		this.searchValue = typeof t?.value == "string" ? t.value : "";
	}
	onSearchSelect(e) {
		let t = e.detail.option;
		typeof t.label == "string" && (this.searchValue = t.label);
	}
	onAccessGrantRoleChange(e, t) {
		let n = t.detail.option.value, r = typeof n == "string" ? i.find((e) => e === n) : void 0;
		if (!r) return;
		let a = {
			id: e,
			role: r
		};
		this.dispatchEvent(new CustomEvent("access-grant-role-changed", {
			detail: a,
			bubbles: !0,
			composed: !0
		}));
	}
	getFilteredAccessGrants() {
		let e = this.searchValue.trim().toLowerCase();
		return this.accessGrantViewModels.filter(({ subjectLabel: t, subjects: n }) => n.length ? !e || t.toLowerCase().includes(e) : !1);
	}
	renderAccessGrant(e) {
		return b`
      <li>
        ${this.renderAuthorizationBadge(e.authorization, e.subjectLabel)}
        <h3>${e.subjectLabel}</h3>
        ${this.renderAuthorizationRole(e.role, e.id)}
      </li>
    `;
	}
	renderAuthorizationBadge(e, t) {
		let n = this.getAuthorizationBadge(e, t);
		return b`
      <div class="access-grants-image access-grants-image--${n.kind}">
        ${n.image ? b`<img src=${n.image} alt="" aria-hidden="true" />` : n.kind === "origin" ? b`<icon-lucide-globe aria-hidden="true"></icon-lucide-globe>` : b`<span aria-hidden="true">${n.text}</span>`}
      </div>
    `;
	}
	getAuthorizationBadge(e, t) {
		let n = e.agent[0];
		if (n) {
			let e = f(o(n));
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
			let e = f(o(r));
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
	renderAuthorizationRole(e, t) {
		return b`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-grants-role access-grants-role--editable ${e === "Owner" ? "access-grants-role--owner" : ""}"
        .disabled=${this.disabled}
        .value=${e}
        @change=${(e) => this.onAccessGrantRoleChange(t, e)}
      >
        ${this.renderGrantRoleOptions()}
      </solid-ui-combobox>
    `;
	}
	renderGrantRoleOptions() {
		return i.map((e) => b`
      <solid-ui-combobox-option value=${e}>${e === "No Access" ? "Remove" : e}</solid-ui-combobox-option>
    `);
	}
	render() {
		let e = this.getFilteredAccessGrants();
		return b`
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
            ${this.accessGrantViewModels.filter(({ subjects: e }) => e.length > 0).map(({ subjectLabel: e }) => b`
                <solid-ui-combobox-option .value=${e}>
                  ${e}
                </solid-ui-combobox-option>
              `)}
          </solid-ui-combobox>
        </div>
        <div class="access-grants-list">
          <ul>
            ${e.length > 0 ? e.map((e) => this.renderAccessGrant(e)) : b`<li>No access grants</li>`}
          </ul>
        </div>
      </section>
    `;
	}
}, {e: [ie, oe, ce, ee], c: [Ce, te]} = _e(O, [
	[
		re,
		1,
		"accessGrantViewModels"
	],
	[
		ae,
		1,
		"disabled"
	],
	[
		se,
		1,
		"searchValue"
	]
], ne, 0, void 0, _), O), D = class extends Se {
	constructor() {
		super(Ce), ge(this, "styles", E), te();
	}
}, ge(D, le, void 0), D)();
// ~icons/lucide/link
var we = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></g></svg>";
	}
};
customElements.get("icon-lucide-link") || customElements.define("icon-lucide-link", we);
// src/components/access-control-modal/AccessControlGeneralAccess.styles.css
var Te = v`:host{& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);font-weight:600}& .access-grants-general{flex-direction:column;align-self:stretch;align-items:flex-start;gap:10px;padding:0 10px;display:flex;& solid-ui-combobox,& solid-ui-input{--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0)}& .access-grants-general-header{flex-direction:row;justify-content:space-between;align-self:stretch;align-items:center;gap:15px;display:flex;& .access-grants-copy-link-button-label{font-size:var(--solid-ui-font-size-xs,.75rem);font-weight:500}& .access-grants-copy-link-button icon-lucide-link{aspect-ratio:1;width:12px;height:12px}}& .access-grants-general-share{align-self:stretch;align-items:center;gap:10px;display:flex;& .access-grants-general-share-content{flex-direction:row;flex:1 0 0;align-items:flex-start;gap:10px;display:flex;& .access-grants-general-share-icon{aspect-ratio:1;background:var(--solid-ui-color-violet-50,#f5f3ff);border-radius:50px;justify-content:center;align-items:center;width:30px;height:30px;padding:5px;display:flex}& .access-grants-general-share-icon-inner{aspect-ratio:1;flex-shrink:0;justify-content:center;align-items:center;width:20px;height:20px;padding:1.25px;display:flex;& icon-lucide-globe{aspect-ratio:1;flex-shrink:0;width:17.5px;height:17.5px}}& .access-grants-general-share-text{flex:auto;min-width:0;& .access-grants-general-share-text-title{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-sm,.875rem);font-weight:600}& .access-grants-general-share-text-description{color:var(--solid-ui-color-gray-700,#364153);font-size:var(--solid-ui-font-size-sm,.875rem)}}}}}& .access-role-select--general{width:120px;min-width:120px;font-size:var(--solid-ui-font-size-xs,.75rem);flex:0 0 120px;font-weight:500}& .access-role-select--compact{--solid-ui-input-border-color:transparent;max-width:100%;margin-top:0;display:block}}`, Ee, De, Oe, ke, Ae, je, Me, Ne, Pe, Fe, Ie, Le, Re, ze, Be, Ve, He, Ue, We;
function Ge(e, t, n) {
	Ke(e, t), t.set(e, n);
}
function Ke(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function M(e, t, n) {
	return e.set(qe(e, t), n), n;
}
function N(e, t) {
	return e.get(qe(e, t));
}
function qe(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function Je(e, t, n) {
	return (t = Xe(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Ye(e, t, n, r, i, a) {
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
				get: Qe(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Qe(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return $e(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : Xe(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function Xe(e) {
	var t = Ze(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Ze(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Qe(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function $e(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function et(e) {
	return e;
}
Pe = [h("solid-ui-access-control-general-access")];
var tt;
new (Ue = (Oe = /*#__PURE__*/ new WeakMap(), ke = /*#__PURE__*/ new WeakMap(), Ae = /*#__PURE__*/ new WeakMap(), je = /*#__PURE__*/ new WeakMap(), We = (Fe = g({ attribute: !1 }), Le = g({ attribute: !1 }), ze = g({ attribute: !1 }), Ve = g({ type: Boolean }), "subjectUri"), De = class extends _ {
	constructor(...e) {
		super(...e), Ge(this, Oe, (Me(this), Ie(this, void 0))), Ge(this, ke, Re(this, "No Access")), Ge(this, Ae, Be(this, "No Access")), Ge(this, je, He(this, !1));
	}
	get [We]() {
		return N(Oe, this);
	}
	set subjectUri(e) {
		M(Oe, this, e);
	}
	get authenticatedAccessRoleValue() {
		return N(ke, this);
	}
	set authenticatedAccessRoleValue(e) {
		M(ke, this, e);
	}
	get publicAccessRoleValue() {
		return N(Ae, this);
	}
	set publicAccessRoleValue(e) {
		M(Ae, this, e);
	}
	get disabled() {
		return N(je, this);
	}
	set disabled(e) {
		M(je, this, e);
	}
	onAuthenticatedRoleChange(e) {
		this.dispatchRoleChange("authenticated-role-changed", e, i);
	}
	onPublicRoleChange(e) {
		this.dispatchRoleChange("public-role-changed", e, c);
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
			d("Failed to copy resource link", e);
		}
	}
	renderAuthenticatedRoleOptions() {
		return i.map((e) => b`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `);
	}
	renderPublicRoleOptions() {
		return c.map((e) => b`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `);
	}
	renderAuthenticatedModeSelector() {
		return b`
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
		return b`
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
		return b`
      <div class="access-grants-general-share-icon">
        <div class="access-grants-general-share-icon-inner">
          <icon-lucide-globe class="access-grants-general-share-icon-image"></icon-lucide-globe>
        </div>
      </div>
    `;
	}
	renderGeneralShareRow(e) {
		return b`
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
		return b`
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
}, {e: [Ie, Re, Be, He, Me], c: [tt, Ne]} = Ye(De, [
	[
		Fe,
		1,
		"subjectUri"
	],
	[
		Le,
		1,
		"authenticatedAccessRoleValue"
	],
	[
		ze,
		1,
		"publicAccessRoleValue"
	],
	[
		Ve,
		1,
		"disabled"
	]
], Pe, 0, void 0, _), De), Ee = class extends et {
	constructor() {
		super(tt), Je(this, "styles", Te), Ne();
	}
}, Je(Ee, Ue, void 0), Ee)();
// src/components/access-control-modal/AccessControlErrors.styles.css
var nt = v`:host{contain:inline-size;width:100%;display:block;& solid-ui-error-state{contain:inline-size;width:100%;max-width:100%}& .access-control-save-errors{box-sizing:border-box;gap:8px;width:100%;margin:0;padding-left:0;list-style:none;display:grid;& li{min-width:0;color:var(--solid-ui-color-red-600,#be2e48);font-size:var(--solid-ui-font-size-sm,.875rem);grid-template-columns:minmax(0,18rem) minmax(0,1fr);align-items:baseline;gap:6px;line-height:1.4;display:grid}& .access-control-save-error-label{overflow-wrap:anywhere;font-weight:500}& .access-control-save-error-detail{overflow-wrap:anywhere;min-width:0}}@media (width<=600px){& .access-control-save-errors li{grid-template-columns:minmax(0,40%) minmax(0,1fr)}}}`, rt, it, P, F, at, ot, st, ct, lt, ut, dt, ft, pt;
function mt(e, t, n) {
	ht(e, t), t.set(e, n);
}
function ht(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function gt(e, t, n) {
	return e.set(vt(e, t), n), n;
}
function _t(e, t) {
	return e.get(vt(e, t));
}
function vt(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function yt(e, t, n) {
	return (t = xt(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function bt(e, t, n, r, i, a) {
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
				get: Ct(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Ct(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return wt(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : xt(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function xt(e) {
	var t = St(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function St(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ct(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function wt(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Tt(e) {
	return e;
}
st = [h("solid-ui-access-control-errors")];
var Et;
new (ft = (P = /*#__PURE__*/ new WeakMap(), F = /*#__PURE__*/ new WeakMap(), pt = (ct = g({ attribute: !1 }), ut = g({ attribute: !1 }), "errors"), it = class extends _ {
	constructor(...e) {
		super(...e), mt(this, P, (at(this), lt(this, []))), mt(this, F, dt(this, !0));
	}
	get [pt]() {
		return _t(P, this);
	}
	set errors(e) {
		gt(P, this, e);
	}
	get successfulChangesRefreshed() {
		return _t(F, this);
	}
	set successfulChangesRefreshed(e) {
		gt(F, this, e);
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
		return this.errors.length ? b`
      <solid-ui-error-state
        title="Some access changes could not be saved"
        message=${this.successfulChangesRefreshed ? "Any successful changes are shown above. The list below shows only the changes that failed. Close this dialog and reopen it if you want to try again." : "Some changes may have been saved, but we could not refresh the Shared with list. The list below shows only the changes that failed. Close this dialog and reopen it if you want to try again."}
        @close=${this.onClose}
      >
        <ul class="access-control-save-errors">
          ${this.errors.map((e) => b`
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
    ` : b``;
	}
}, {e: [lt, dt, at], c: [Et, ot]} = bt(it, [[
	ct,
	1,
	"errors"
], [
	ut,
	1,
	"successfulChangesRefreshed"
]], st, 0, void 0, _), it), rt = class extends Tt {
	constructor() {
		super(Et), yt(this, "styles", nt), ot();
	}
}, yt(rt, ft, void 0), rt)();
// src/components/access-control-modal/AccessControlModal.styles.css
var Dt = v`:host{& .access-control-mixed-policy-warning{border:1px solid var(--solid-ui-color-red-300,#fca5a5);background:var(--solid-ui-color-red-50,#fef2f2);color:var(--solid-ui-color-red-800,#991b1b);font-size:var(--solid-ui-font-size-sm,.875rem);border-radius:5px;gap:4px;margin:0 0 16px;padding:12px 14px;line-height:1.45;display:grid;& strong{font-weight:600}}& .access-control-same-access-toggle{color:var(--solid-ui-color-gray-900,#101828);text-align:left;line-height:1.4;font:inherit;cursor:pointer;background:0 0;border:0;align-items:flex-start;gap:8px;margin-top:12px;padding:0;display:flex}& .access-control-switch-track{background:var(--solid-ui-color-slate-300,#cbd5e1);border-radius:999px;flex:none;width:34px;height:20px;margin-top:1px;padding:2px;transition:background .15s;display:inline-flex}& .access-control-same-access-toggle[aria-checked=true] .access-control-switch-track{background:var(--solid-ui-color-purple-600,#9333ea)}& .access-control-switch-thumb{background:#fff;border-radius:50%;width:16px;height:16px;transition:transform .15s;box-shadow:0 1px 2px #00000040}& .access-control-same-access-toggle[aria-checked=true] .access-control-switch-thumb{transform:translate(14px)}& .access-control-same-access-toggle>span:last-child{overflow-wrap:anywhere;min-width:0;max-width:100%}& .access-control-sharing-state,& .access-control-contents-prompt{box-sizing:border-box;min-width:0;max-width:100%;font-size:var(--solid-ui-font-size-sm,.875rem);margin-bottom:16px;padding:10px;& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);margin:0 0 10px;font-weight:600}& .access-control-advanced-sharing{box-sizing:border-box;overflow-wrap:anywhere;width:100%;min-width:0;max-width:100%;margin-top:10px;padding:10px 48px 10px 15px;position:relative;& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);margin:0 0 4px;font-weight:600}& p{overflow-wrap:anywhere;min-width:0;max-width:100%;color:var(--solid-ui-color-gray-600,#4a5565);font-size:var(--solid-ui-font-size-xs,.75rem);margin:0;line-height:1.5}& .access-control-advanced-sharing-description-line{max-width:100%;display:block}}& .access-control-advanced-sharing-options,& .access-control-advanced-sharing-actions{flex-wrap:wrap;gap:8px;min-width:0;margin-top:10px;display:flex;& solid-ui-button{--solid-ui-font-size-md:var(--solid-ui-font-size-sm,.875rem);white-space:normal;min-width:0;max-width:100%}}& .access-control-advanced-sharing-actions{justify-content:flex-end;margin-top:0;position:absolute;top:10px;right:15px;& solid-ui-button{color:var(--solid-ui-color-gray-600,#4a5565)}}& p{overflow-wrap:anywhere;min-width:0;max-width:100%;color:var(--solid-ui-color-gray-600,#4a5565);margin:0;line-height:1.5}}& .access-control-sharing-state-panel,& .access-control-contents-prompt{box-sizing:border-box;border:1px solid var(--solid-ui-color-slate-200,#e2e8f0);background:var(--solid-ui-color-white,#fff);border-radius:5px;min-width:0;max-width:100%;padding:10px 15px}& .access-control-sharing-state-panel{gap:10px;display:grid;& p{overflow-wrap:anywhere;min-width:0;max-width:100%}& .access-control-sharing-state-custom-row{flex-wrap:wrap;align-items:center;gap:8px;display:flex;& p{flex:auto}& solid-ui-button{--solid-ui-font-size-md:var(--solid-ui-font-size-sm,.875rem);flex:none}}}& .access-control-sharing-guidance{justify-content:space-between;align-items:center;gap:12px;min-width:0;display:flex;& p{overflow-wrap:anywhere;min-width:0;max-width:100%}& solid-ui-button{--solid-ui-font-size-md:var(--solid-ui-font-size-sm,.875rem);flex:none}}& .access-control-sharing-state-actions{flex-direction:column;justify-content:flex-end;align-items:flex-end;gap:8px;min-width:0;margin-top:10px;display:flex;& solid-ui-button{--solid-ui-font-size-md:var(--solid-ui-font-size-sm,.875rem);max-width:100%}}@media (width<=420px){& .access-control-sharing-guidance{flex-direction:column;align-items:flex-start;gap:8px;& solid-ui-button{align-self:flex-end}}}& .access-control-contents-prompt{& .access-control-contents-prompt-actions{flex-wrap:wrap;gap:8px;min-width:0;margin-top:10px;display:flex}& solid-ui-button{--solid-ui-font-size-md:var(--solid-ui-font-size-sm,.875rem);flex:0 auto;max-width:100%}}& .access-control-contents-prompt h2{margin-bottom:4px}& .access-control-footer-actions{justify-content:flex-end;align-items:center;gap:15px;width:100%;display:flex;&>solid-ui-button{min-width:132px}}@media (width<=380px){& .access-control-footer-actions{gap:8px;&>solid-ui-button{flex:1 1 0;min-width:0}}}}`;
// src/components/access-control-modal/accessGrantDrafts.ts
function Ot(e) {
	return {
		...e,
		agentClass: e.agentClass.filter((e) => e !== l.iri && e !== r.iri)
	};
}
function kt(e) {
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
function At(e) {
	return e.id ? e.id : kt(e).map((e) => `${e.type}:${e.iri}`).sort().join("|");
}
function jt(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = At(Ot(e)), r = t.get(n) ?? 0;
		return t.set(n, r + 1), r === 0 ? n : `${n}#${r}`;
	});
}
function Mt(e) {
	let t = [
		...e.agent,
		...e.agentGroup,
		...e.agentClass,
		...e.origin
	];
	return t.length ? t.map((e) => u(o(e))).join(", ") : "Unknown access holder";
}
function Nt(e) {
	return a.acl.roleFromModes(e.mode);
}
function Pt(e) {
	let t = Ot(e);
	return {
		id: At(t),
		authorization: t,
		role: Nt(t),
		initialRole: Nt(e),
		subjectLabel: Mt(t),
		subjects: kt(t)
	};
}
function Ft(e) {
	let t = jt(e);
	return e.map((e, n) => ({
		...Pt(e),
		id: t[n]
	}));
}
function It(e) {
	return [...e].sort((t, n) => {
		let r = t.role === "Owner", i = n.role === "Owner";
		return r && !i ? -1 : !r && i ? 1 : e.indexOf(t) - e.indexOf(n);
	});
}
function Lt(e) {
	return It(e).filter(({ role: e, initialRole: t, subjects: n }) => e !== t && n.length > 0).map(({ authorization: e, subjects: t, role: n }) => ({
		authorization: e,
		subjects: t,
		role: n
	}));
}
function Rt(e) {
	let t = e.filter((e) => e.agentClass.includes(l.iri)).flatMap((e) => e.mode);
	return t.length ? a.acl.roleFromModes(t) : "No Access";
}
function zt(e) {
	let t = e.filter((e) => e.agentClass.includes(r.iri)).flatMap((e) => e.mode);
	return t.length ? a.acl.publicRoleFromModes(t) : "No Access";
}
function Bt(e) {
	return e.iri === l.iri ? "Authenticated users" : e.iri === r.iri ? "Public" : u(o(e.iri)).trim() || e.iri;
}
// ~icons/lucide/book-user
var Vt = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15 13a3 3 0 1 0-6 0\"/><path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\"/><circle cx=\"12\" cy=\"8\" r=\"2\"/></g></svg>";
	}
};
customElements.get("icon-lucide-book-user") || customElements.define("icon-lucide-book-user", Vt);
// ~icons/lucide/user-round
var Ht = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"8\" r=\"5\"/><path d=\"M20 21a8 8 0 0 0-16 0\"/></g></svg>";
	}
};
customElements.get("icon-lucide-user-round") || customElements.define("icon-lucide-user-round", Ht);
// ~icons/lucide/users
var Ut = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/></g></svg>";
	}
};
customElements.get("icon-lucide-users") || customElements.define("icon-lucide-users", Ut);
// src/components/access-control-modal/AccessControlAddAccess.styles.css
var Wt = v`:host{& .access-grants-form{font-size:var(--solid-ui-font-size-sm,.875rem);--access-role-select-width:129px;flex-direction:column;align-self:stretch;align-items:flex-start;gap:10px;padding:10px;display:flex;& p{color:var(--solid-ui-color-gray-600,#4a5565);line-height:1.5}& .access-grants-form-main{align-self:stretch;align-items:center;gap:10px;display:flex;& .access-grants-input{border:1px solid var(--solid-ui-color-slate-200,#e2e8f0);background:var(--solid-ui-color-white,#fff);border-radius:5px;flex-direction:column;flex:auto;align-items:flex-start;gap:12px;min-width:0;padding:10px 15px;display:flex;& solid-ui-combobox{--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0);width:100%}& .access-principal-error{color:var(--solid-ui-color-red-700,#b42318);font-size:var(--solid-ui-font-size-xs,.75rem);margin:0;line-height:1.4}}}& .access-grants-pending{flex-wrap:wrap;align-items:center;gap:8px;min-height:42px;display:flex}& .access-grants-pending-item{border:1px solid var(--solid-ui-color-gray-300,#d1d5dc);background:var(--solid-ui-color-gray-50,#f9fafb);max-width:100%;color:var(--solid-ui-color-gray-700,#374151);border-radius:5px;align-items:center;gap:6px;padding:5px 10px;display:flex}& .access-grants-pending-item-label{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--solid-ui-color-gray-500,#6a7282);font-size:var(--solid-ui-font-size-xs,.75rem);line-height:1;overflow:hidden}& .access-grants-pending-item-remove{color:var(--solid-ui-color-gray-300,#d1d5dc);cursor:pointer;background:0 0;border:none;border-radius:999px;justify-content:center;align-items:center;padding:0;display:inline-flex;& icon-lucide-circle-x{width:14px;height:14px}}}& .access-grants-directory-entry{align-items:center;gap:8px;line-height:1;display:inline-flex}& .access-role-select{max-width:100%;width:var(--access-role-select-width);--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0);flex:none;margin-top:25px;display:block}& .access-role-select--top{margin-top:0}}`, Gt, Kt, I, L, R, z, B, V, qt, Jt, Yt, Xt, Zt, Qt, $t, en, tn, nn, rn, an, on, sn, cn, ln, un;
function H(e, t, n) {
	dn(e, t), t.set(e, n);
}
function dn(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function U(e, t, n) {
	return e.set(fn(e, t), n), n;
}
function W(e, t) {
	return e.get(fn(e, t));
}
function fn(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function pn(e, t, n) {
	return (t = hn(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function mn(e, t, n, r, i, a) {
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
				get: _n(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || _n(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return vn(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : hn(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function hn(e) {
	var t = gn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function gn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function _n(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function vn(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function yn(e) {
	return e;
}
function bn(e) {
	return b`
    <span class="access-grants-directory-entry">
      ${xn(e)}
      <span>${e.label}</span>
    </span>
  `;
}
function xn(e) {
	return e.sources.includes("contacts") || e.sources.includes("groups") ? b`<icon-lucide-book-user style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-book-user>` : e.sources.includes("friends") ? b`<icon-lucide-users style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-users>` : e.sources.includes("catalog") ? b`<icon-lucide-user-round style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-user-round>` : m;
}
Yt = [h("solid-ui-access-control-add-access")];
var Sn;
new (ln = (I = /*#__PURE__*/ new WeakMap(), L = /*#__PURE__*/ new WeakMap(), R = /*#__PURE__*/ new WeakMap(), z = /*#__PURE__*/ new WeakMap(), B = /*#__PURE__*/ new WeakMap(), V = /*#__PURE__*/ new WeakMap(), un = (Xt = g({ attribute: !1 }), Qt = g({ attribute: !1 }), en = g({ attribute: !1 }), nn = g({ attribute: !1 }), an = g({ type: Boolean }), sn = g({ attribute: !1 }), "principalInputValue"), Kt = class extends _ {
	constructor(...e) {
		super(...e), H(this, I, (qt(this), Zt(this, ""))), H(this, L, $t(this, "Viewer")), H(this, R, tn(this, [])), H(this, z, rn(this, "")), H(this, B, on(this, !1)), H(this, V, cn(this, null));
	}
	get [un]() {
		return W(I, this);
	}
	set principalInputValue(e) {
		U(I, this, e);
	}
	get addAccessRoleValue() {
		return W(L, this);
	}
	set addAccessRoleValue(e) {
		U(L, this, e);
	}
	get pendingAccessGrants() {
		return W(R, this);
	}
	set pendingAccessGrants(e) {
		U(R, this, e);
	}
	get inputError() {
		return W(z, this);
	}
	set inputError(e) {
		U(z, this, e);
	}
	get disabled() {
		return W(B, this);
	}
	set disabled(e) {
		U(B, this, e);
	}
	get asyncOptionsProvider() {
		return W(V, this);
	}
	set asyncOptionsProvider(e) {
		U(V, this, e);
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
		let t = e.detail.option.value, n = typeof t == "string" ? i.find((e) => e === t) : void 0;
		n && this.dispatchEvent(new CustomEvent("role-changed", {
			detail: { role: n },
			bubbles: !0,
			composed: !0
		}));
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
		return b`
      <section class="access-grants-form" aria-label="Add access">
        <p>Add person, group or software agent URL.</p>
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
            ${this.inputError ? b`<p class="access-principal-error" role="alert">${this.inputError}</p>` : m}
            ${this.renderPendingAccessGrants()}
          </div>
          <solid-ui-combobox
            class="access-role-select access-role-select--top"
            .disabled=${this.disabled}
            .value=${this.addAccessRoleValue}
            @change=${this.onRoleChange}
          >
            ${i.filter((e) => e !== "No Access").map((e) => b`
                <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
              `)}
          </solid-ui-combobox>
        </div>
      </section>
    `;
	}
	renderPendingAccessGrants() {
		return this.pendingAccessGrants.length ? b`
      <div class="access-grants-pending">
        ${this.pendingAccessGrants.map((e, t) => b`
          <div class="access-grants-pending-item">
            <span class="access-grants-pending-item-label">
              ${e.targetKind === "trustedApp" ? b`<icon-lucide-globe style="width: 13px; height: 13px; vertical-align: -2px;"></icon-lucide-globe>` : m}
              ${e.label}
            </span>
            <solid-ui-button
              type="button"
              variant="ghost"
              class="access-grants-pending-item-remove"
              ?disabled=${this.disabled}
              @click=${() => this.onPendingGrantRemove(t)}
            >
              <span class="sr-only">Remove ${e.label}</span>
              <icon-lucide-circle-x slot="icon"></icon-lucide-circle-x>
            </solid-ui-button>
          </div>
        `)}
      </div>
    ` : m;
	}
}, {e: [Zt, $t, tn, rn, on, cn, qt], c: [Sn, Jt]} = mn(Kt, [
	[
		Xt,
		1,
		"principalInputValue"
	],
	[
		Qt,
		1,
		"addAccessRoleValue"
	],
	[
		en,
		1,
		"pendingAccessGrants"
	],
	[
		nn,
		1,
		"inputError"
	],
	[
		an,
		1,
		"disabled"
	],
	[
		sn,
		1,
		"asyncOptionsProvider"
	]
], Yt, 0, void 0, _), Kt), Gt = class extends yn {
	constructor() {
		super(Sn), pn(this, "styles", Wt), Jt();
	}
}, pn(Gt, ln, void 0), Gt)();
// src/components/access-control-modal/helpers.ts
function Cn(e) {
	try {
		let t = new URL(e);
		return (t.protocol === "http:" || t.protocol === "https:") && !!t.hostname;
	} catch {
		return !1;
	}
}
function wn(e) {
	if (!Cn(e)) return !1;
	let t = new URL(e);
	return t.pathname === "/" && !t.search && !t.hash && !t.username && !t.password;
}
function Tn(e) {
	let t = e.trim();
	if (t && !Cn(t)) try {
		let e = new URL(`https://${t}`), n = e.protocol === "http:" || e.protocol === "https:", r = e.pathname === "/" && !e.search && !e.hash, i = e.hostname.includes(".") || e.hostname.includes(":");
		return n && r && i && !e.username && !e.password ? e.origin : void 0;
	} catch {
		return;
	}
}
function En(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = t(r);
		e && !n.has(e) && n.set(e, r);
	}
	return [...n.values()];
}
function Dn(e) {
	return En(e, (e) => e.value);
}
// src/components/access-control-modal/accessTargetResolver.ts
async function On(e) {
	let t = Tn(e);
	return t ? {
		kind: "origin",
		subjectValue: t
	} : wn(e) ? {
		kind: "origin",
		subjectValue: new URL(e).origin
	} : await a.acl.classifyAccessControlSubject(e);
}
async function kn(e, t) {
	if (!e || e.kind === "origin") return e?.subjectValue;
	let n = o(e.subjectValue);
	await a.store.fetcher.load(n.doc());
	let r = t?.trim() || u(n).trim();
	if (!r || r === e.subjectValue) throw Error("The access target has no usable display label.");
	return r;
}
async function An(e, t) {
	let n = await On(e);
	if (!n) return;
	let r = await kn(n, t);
	if (r) return {
		subjectType: n.kind,
		subjectValue: n.subjectValue,
		label: r,
		targetKind: n.kind === "origin" ? "origin" : void 0
	};
}
async function jn(e) {
	let t = await An(e);
	return t ? {
		label: t.label,
		value: e
	} : void 0;
}
function Mn(e, t) {
	return {
		label: t,
		value: e.uri,
		template: bn({
			...e,
			label: t
		})
	};
}
async function Nn(e) {
	let t = Tn(e);
	if (t) return [{
		label: `Use origin ${t}`,
		value: t,
		targetKind: "origin",
		template: b`<span class="access-grants-directory-entry"><icon-lucide-globe style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-globe><span>Use origin ${t}</span></span>`
	}];
	if (!Cn(e)) return [];
	if (wn(e)) return [{
		label: `Use origin ${new URL(e).origin}`,
		value: new URL(e).origin,
		targetKind: "origin",
		template: b`<span class="access-grants-directory-entry"><icon-lucide-globe style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-globe><span>Use origin ${new URL(e).origin}</span></span>`
	}];
	let n = await jn(e);
	return Dn(n ? [n] : []);
}
async function Pn(t) {
	try {
		let n = a.authn.currentUser();
		if (!n) return [];
		await a.profile.loadProfile(n);
		let r = a.store;
		return r.each(n, e.acl("trustedApp")).flatMap((n) => {
			let i = r.any(n, e.acl("origin"));
			if (!i || !wn(i.value)) return [];
			let a = new URL(i.value).origin;
			return t && !`${a} trusted app`.toLowerCase().includes(t.toLowerCase()) ? [] : [{
				label: `Trusted app: ${a}`,
				value: a,
				targetKind: "trustedApp",
				template: b`<span class="access-grants-directory-entry"><icon-lucide-globe style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-globe><span>Trusted app: ${a}</span></span>`
			}];
		});
	} catch {
		return [];
	}
}
function Fn(e) {
	return e.length ? e : [{
		label: "Type at least 2 characters to search",
		value: "",
		selectable: !1
	}];
}
var In = x(async (e) => {
	let t = e.trim(), r = await Nn(t), i = await Pn(t);
	if (t.length < 2) return En([
		...r,
		...i,
		...Fn(r)
	], (e) => {
		let t = e;
		return typeof t.value == "string" ? `${t.value}:${t.targetKind ?? "default"}` : void 0;
	});
	let o = [];
	try {
		o = await a.directory.search({
			query: t,
			sources: n
		});
	} catch (e) {
		if (!r.length && !i.length) throw e;
	}
	let s = (await Promise.all(o.map(async (e) => {
		try {
			let t = await An(e.uri, e.label);
			return t ? {
				entry: e,
				label: t.label
			} : void 0;
		} catch {
			return;
		}
	}))).filter((e) => e !== void 0).map(({ entry: e, label: t }) => Mn(e, t));
	return En([
		...r,
		...i,
		...s
	], (e) => {
		let t = e;
		return typeof t.value == "string" ? `${t.value}:${t.targetKind ?? "default"}` : void 0;
	});
});
// src/components/access-control-modal/applyAccessChanges.ts
async function Ln(e, t, n = {}) {
	let r = [], i = n.containerScope ?? "file";
	for (let { subject: n, label: o, role: s } of t) try {
		let t = i === "folder+contents" ? a.acl.planGrantContainerAndContents : i === "container" ? a.acl.planGrantContainer : i === "contents" ? a.acl.planGrantContainerContents : a.acl.planGrant, r = s === "No Access" ? await (i === "contents" ? a.acl.planRevokeContainerContents(e, n) : a.acl.planRevoke(e, n)) : await t(e, n, Rn(n, s));
		await a.acl.applyPlan(r);
	} catch (e) {
		r.push({
			action: s === "No Access" ? "revoke" : "grant",
			targetUri: n.iri,
			label: o,
			role: s,
			scope: i,
			message: e instanceof Error ? e.message : "Unable to apply access change."
		});
	}
	return r;
}
function Rn(e, t) {
	if (e.type === "agentClass" && e.iri === r.iri) {
		let e = c.find((e) => e === t);
		if (!e) throw Error(`Public access does not support the ${t} role.`);
		return a.acl.modesFromPublicRole(e);
	}
	return a.acl.modesFromRole(t);
}
// src/components/access-control-modal/buildAccessChanges.ts
function zn({ pendingAccessGrants: e, generalAccessChanges: t, changedAccessGrants: n }) {
	return [
		...e.map((e) => ({
			subject: {
				type: e.subjectType,
				iri: e.subjectValue
			},
			role: e.role,
			label: e.label
		})),
		...t,
		...n.flatMap(({ subjects: e, role: t }) => e.map((e) => ({
			subject: e,
			role: t,
			label: Bt(e)
		})))
	];
}
// src/components/access-control-modal/AccessControlModal.ts
var Bn, Vn, G, K, q, J, Hn, Un, Wn, Gn, Kn, qn, Jn, Yn, Xn, Zn, Y, Qn, $n, er, tr, nr, rr, ir, ar, or, sr, cr, lr, ur, dr, fr, pr, mr, hr, gr, _r, vr, yr, br, xr, Sr, Cr, wr, Tr, Er, Dr, Or, kr, Ar, jr, Mr, Nr, Pr, Fr, Ir, Lr, Rr, zr, Br, Vr;
function X(e, t, n) {
	Hr(e, t), t.set(e, n);
}
function Hr(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function Z(e, t, n) {
	return e.set(Ur(e, t), n), n;
}
function Q(e, t) {
	return e.get(Ur(e, t));
}
function Ur(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function $(e, t, n) {
	return (t = Gr(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Wr(e, t, n, r, i, a) {
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
				get: qr(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || qr(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return Jr(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : Gr(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function Gr(e) {
	var t = Kr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Kr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function qr(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function Jr(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Yr(e) {
	return e;
}
function Xr(e) {
	return e != null;
}
rr = [h("solid-ui-access-control-modal")];
var Zr;
new (Br = (G = /*#__PURE__*/ new WeakMap(), K = /*#__PURE__*/ new WeakMap(), q = /*#__PURE__*/ new WeakMap(), J = /*#__PURE__*/ new WeakMap(), Hn = /*#__PURE__*/ new WeakMap(), Un = /*#__PURE__*/ new WeakMap(), Wn = /*#__PURE__*/ new WeakMap(), Gn = /*#__PURE__*/ new WeakMap(), Kn = /*#__PURE__*/ new WeakMap(), qn = /*#__PURE__*/ new WeakMap(), Jn = /*#__PURE__*/ new WeakMap(), Yn = /*#__PURE__*/ new WeakMap(), Xn = /*#__PURE__*/ new WeakMap(), Zn = /*#__PURE__*/ new WeakMap(), Y = /*#__PURE__*/ new WeakMap(), Qn = /*#__PURE__*/ new WeakMap(), $n = /*#__PURE__*/ new WeakMap(), er = /*#__PURE__*/ new WeakMap(), Vr = (ir = g({ attribute: !1 }), or = g({ attribute: !1 }), cr = y(), ur = y(), fr = y(), mr = y(), gr = y(), vr = y(), br = y(), Sr = y(), wr = y(), Er = y(), Or = y(), Ar = y(), Mr = y(), Pr = y(), Ir = y(), Rr = y(), "subjectUri"), Vn = class extends p {
	constructor(...e) {
		super(...e), X(this, G, (tr(this), ar(this, void 0))), X(this, K, sr(this, void 0)), X(this, q, lr(this, "")), X(this, J, dr(this, "Viewer")), X(this, Hn, pr(this, "No Access")), X(this, Un, hr(this, "No Access")), X(this, Wn, _r(this, !1)), X(this, Gn, yr(this, [])), X(this, Kn, xr(this, [])), X(this, qn, Cr(this, [])), X(this, Jn, Tr(this, !0)), X(this, Yn, Dr(this)), X(this, Xn, kr(this, !1)), X(this, Zn, jr(this, "")), X(this, Y, Nr(this, !1)), X(this, Qn, Fr(this, "folder+contents")), X(this, $n, Lr(this)), X(this, er, zr(this, !1)), $(this, "accessGrantLabelRequestVersion", 0), $(this, "accessContextRequestVersion", 0), $(this, "accessContextSubjectUri", void 0);
	}
	get [Vr]() {
		return Q(G, this);
	}
	set subjectUri(e) {
		Z(G, this, e);
	}
	get accessGrants() {
		return Q(K, this);
	}
	set accessGrants(e) {
		Z(K, this, e);
	}
	get principalInputValue() {
		return Q(q, this);
	}
	set principalInputValue(e) {
		Z(q, this, e);
	}
	get addAccessRoleValue() {
		return Q(J, this);
	}
	set addAccessRoleValue(e) {
		Z(J, this, e);
	}
	get authenticatedAccessRoleValue() {
		return Q(Hn, this);
	}
	set authenticatedAccessRoleValue(e) {
		Z(Hn, this, e);
	}
	get publicAccessRoleValue() {
		return Q(Un, this);
	}
	set publicAccessRoleValue(e) {
		Z(Un, this, e);
	}
	get submitting() {
		return Q(Wn, this);
	}
	set submitting(e) {
		Z(Wn, this, e);
	}
	get pendingAccessGrants() {
		return Q(Gn, this);
	}
	set pendingAccessGrants(e) {
		Z(Gn, this, e);
	}
	get accessGrantDrafts() {
		return Q(Kn, this);
	}
	set accessGrantDrafts(e) {
		Z(Kn, this, e);
	}
	get errors() {
		return Q(qn, this);
	}
	set errors(e) {
		Z(qn, this, e);
	}
	get successfulChangesRefreshed() {
		return Q(Jn, this);
	}
	set successfulChangesRefreshed(e) {
		Z(Jn, this, e);
	}
	get accessContext() {
		return Q(Yn, this);
	}
	set accessContext(e) {
		Z(Yn, this, e);
	}
	get accessContextLoading() {
		return Q(Xn, this);
	}
	set accessContextLoading(e) {
		Z(Xn, this, e);
	}
	get accessContextError() {
		return Q(Zn, this);
	}
	set accessContextError(e) {
		Z(Zn, this, e);
	}
	get advancedSharingOpen() {
		return Q(Y, this);
	}
	set advancedSharingOpen(e) {
		Z(Y, this, e);
	}
	get containerScope() {
		return Q(Qn, this);
	}
	set containerScope(e) {
		Z(Qn, this, e);
	}
	get containerScopeAnalysis() {
		return Q($n, this);
	}
	set containerScopeAnalysis(e) {
		Z($n, this, e);
	}
	get protectedTarget() {
		return Q(er, this);
	}
	set protectedTarget(e) {
		Z(er, this, e);
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
			this.accessGrantDrafts = Ft(e), this.authenticatedAccessRoleValue = Rt(e), this.publicAccessRoleValue = zt(e);
		}
	}
	updated(e) {
		super.updated(e), e.has("subjectUri") && this.loadAccessContext().catch((e) => {
			d("Failed to load access control context", e);
		}), e.has("accessGrants") && this.refreshAccessGrantLabels().catch((e) => {
			d("Failed to refresh access grant labels", e);
		}), e.has("accessContext") && !e.has("subjectUri") && this.refreshContainerScopeAnalysis();
	}
	refreshContainerScopeAnalysis() {
		this.isContainer() && this.accessContext ? (this.containerScopeAnalysis = t(this.accessContext), this.containerScope = this.containerScopeAnalysis.primaryScope, this.refreshScopedAccessGrantDrafts()) : this.containerScopeAnalysis = void 0;
	}
	async refreshAccessGrantLabels() {
		let e = ++this.accessGrantLabelRequestVersion, t = this.accessGrants, n = this.subjectUri, r = this.getSelectedContainerScope(), i = this.getScopedAccessGrants(r);
		if (!i.length) {
			this.accessGrantDrafts = [];
			return;
		}
		let s = await Promise.all(i.map(async (e) => (await Promise.all(e.agentGroup.map(async (e) => {
			try {
				await a.store.fetcher.load(o(e).doc());
			} catch {}
		})), Mt(Ot(e)))));
		if (e === this.accessGrantLabelRequestVersion && this.accessGrants === t && this.subjectUri === n && this.getSelectedContainerScope() === r) {
			let e = new Map(jt(i).map((e, t) => [e, s[t]]));
			this.accessGrantDrafts = this.accessGrantDrafts.map((t) => ({
				...t,
				subjectLabel: e.get(t.id) ?? t.subjectLabel
			}));
		}
	}
	getDialogTitle() {
		let e = this.subjectUri ? o(this.subjectUri) : void 0, t = e ? u(e).trim() : "";
		return !t || t === "this resource" ? "Manage Access of \"this resource\"" : `Manage Access of "${t}"`;
	}
	isContainer() {
		return !!(this.subjectUri && new URL(this.subjectUri).pathname.endsWith("/"));
	}
	async loadAccessContext() {
		let e = ++this.accessContextRequestVersion, t = this.subjectUri;
		if (this.accessContext = void 0, this.accessContextSubjectUri = void 0, this.accessContextError = "", this.accessContextLoading = !!t, !t) this.accessContextLoading = !1;
		else try {
			let n = await a.acl.findEffectiveAcl(t);
			if (e !== this.accessContextRequestVersion || this.subjectUri !== t) return;
			this.accessContext = n, this.accessContextSubjectUri = t, this.accessContext?.inherited && !this.accessGrants?.length && (this.accessGrants = this.accessContext.authorizations), this.refreshContainerScopeAnalysis(), this.protectedTarget = a.acl.isProtectedResource(t), this.protectedTarget && this.refreshScopedAccessGrantDrafts();
		} catch (n) {
			if (e !== this.accessContextRequestVersion || this.subjectUri !== t) return;
			this.accessContextError = n instanceof Error && n.message.trim() ? n.message : "Unable to load access settings for this resource.", d("Failed to load access control context", n);
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
	renderSharingInformation() {
		if (!this.accessContext) return b``;
		let e = !this.accessContext.inherited, t = this.accessContext?.effectiveContainer, n = t ? u(o(t)).trim() : "", r = n && n !== t ? b`<strong>${n}</strong> (${t})` : b`<strong>${t ?? "the parent container"}</strong>`;
		return b`
      <div class="access-control-sharing-state-panel">
        ${e ? b`
            <div class="access-control-sharing-state-custom-row">
              <p>This resource has its own sharing settings.</p>
              ${this.protectedTarget ? b`` : b`
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
          ` : t ? b`<p>This resource inherits sharing settings from ${r}.</p>` : b`<p>This resource inherits sharing settings, but no inherited default is available.</p>`}
        ${this.protectedTarget ? b`<p class="access-control-sharing-state-protected-message">This is a protected storage resource. Its primary access-control settings cannot be reset here.</p>` : b``}
      </div>
    `;
	}
	renderSharingState() {
		return !this.accessContext || !this.advancedSharingOpen ? b`` : b`
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
		return this.accessContextLoading ? b`<p role="status">Loading access settings...</p>` : this.accessContextError ? b`
        <solid-ui-error-state
          title="Could not load access settings"
          message=${this.accessContextError}
        >
          <solid-ui-button type="button" variant="secondary" @click=${this.retryAccessContext}>
            Retry
          </solid-ui-button>
        </solid-ui-error-state>
      ` : this.accessContext ? b`` : b`<p role="status">Access settings are not ready yet.</p>`;
	}
	renderMixedContainerWarning() {
		return this.hasMixedContainerPolicy() ? b`
      <div class="access-control-mixed-policy-warning" role="alert">
        <strong>This container has different access settings for the folder and its contents.</strong>
        <span>Changing this mixed policy is an advanced feature and will be available in the next release. Access changes are disabled for now.</span>
      </div>
    ` : b``;
	}
	getScopedAccessGrants(e = this.getSelectedContainerScope()) {
		let t = this.accessGrants ?? [];
		return !this.isContainer() || !this.subjectUri || this.protectedTarget ? t : s(this.subjectUri, t, e, this.accessContext?.inherited ?? !1);
	}
	refreshScopedAccessGrantDrafts() {
		let e = this.getScopedAccessGrants();
		this.accessGrantDrafts = Ft(e), this.authenticatedAccessRoleValue = Rt(e), this.publicAccessRoleValue = zt(e);
	}
	selectContainerScope(e) {
		this.containerScope = e, this.refreshScopedAccessGrantDrafts();
	}
	renderAdvancedSharing() {
		return this.advancedSharingOpen ? b`
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
        ${this.isContainer() ? b`
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
          ` : b``}
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
    ` : b``;
	}
	render() {
		let e = this.getDialogTitle();
		return b`
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
              .asyncOptionsProvider=${In}
              @target-input=${this.onPrincipalInput}
              @target-selected=${this.onPrincipalSelect}
              @role-changed=${this.onAddAccessRoleInput}
              @pending-grant-removed=${this.onPendingGrantRemoved}
            ></solid-ui-access-control-add-access>
            <solid-ui-access-control-shared-access
              .disabled=${!this.canMutate() || this.hasMixedContainerPolicy()}
              .accessGrantViewModels=${It(this.accessGrantDrafts)}
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
				await a.acl.resetToDefault(this.subjectUri), await this.loadAccessContext();
				let e = await a.acl.findAccessGrants(this.subjectUri);
				this.accessGrants = this.accessContext?.inherited ? this.accessContext.authorizations : e;
			} catch (e) {
				this.errors = [...this.errors, {
					action: "reset",
					targetUri: this.subjectUri,
					label: "Custom sharing",
					message: e instanceof Error ? e.message : "Unable to reset sharing."
				}], d("Failed to reset access control", e);
			} finally {
				this.submitting = !1;
			}
		}
	}
	async saveAccessChanges(e = "file") {
		if (this.submitting || !this.canMutate() || this.hasMixedContainerPolicy()) return;
		let t = Lt(this.accessGrantDrafts), n = this.getGeneralAccessChanges();
		if ((this.pendingAccessGrants.length || t.length || n.length) && this.subjectUri) {
			this.submitting = !0, this.errors = this.errors.filter((e) => e.action === "input"), this.successfulChangesRefreshed = !0;
			try {
				let r = zn({
					pendingAccessGrants: this.pendingAccessGrants,
					generalAccessChanges: n,
					changedAccessGrants: t
				}), i = await Ln(this.subjectUri, r, { containerScope: e });
				if (i.length) {
					this.errors = [...this.errors, ...i], this.principalInputValue = "", this.pendingAccessGrants = [];
					try {
						this.accessGrants = await a.acl.findAccessGrants(this.subjectUri);
					} catch (e) {
						this.successfulChangesRefreshed = !1, this.errors = [...this.errors, {
							action: "save",
							targetUri: this.subjectUri,
							label: "Shared with list",
							message: e instanceof Error ? e.message : "Unable to refresh the access list."
						}], d("Failed to refresh access grants after save errors", e);
					}
					d("Failed to save some access changes", i);
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
		let e = this.getScopedAccessGrants(), t = Rt(e), n = zt(e);
		return [this.authenticatedAccessRoleValue === t ? void 0 : {
			subject: l,
			role: this.authenticatedAccessRoleValue,
			label: "Authenticated users"
		}, this.publicAccessRoleValue === n ? void 0 : {
			subject: r,
			role: this.publicAccessRoleValue,
			label: "Public"
		}].filter(Xr);
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
		return !!(this.pendingAccessGrants.length || this.principalInputValue.trim() || Lt(this.accessGrantDrafts).length || this.getGeneralAccessChanges().length);
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
		} catch (t) {
			return this.principalInputValue.trim() === e ? (this.setInputError({
				action: "input",
				label: "Access target",
				targetUri: this.principalInputValue.trim(),
				message: "We could not verify this access target. Check the value and try again."
			}), d("Failed to commit pending access grants", t), !1) : (d("Ignored stale access-target validation error", t), !1);
		}
	}
	async queuePendingPrincipal(e, t = this.addAccessRoleValue, n, r, i) {
		let a = r ?? this.principalInputValue.trim(), o = await this.createPendingAccessGrant(e, t, n, i);
		if ("error" in o) return this.principalInputValue.trim() === a && this.setInputError(o.error), d("Failed to add access grant:", o.error.message), !1;
		let s = [...this.pendingAccessGrants, o.grant];
		return this.pendingAccessGrants = this.dedupePendingAccessGrants(s), this.principalInputValue.trim() === a && (this.clearInputError(), this.principalInputValue = ""), !0;
	}
	async createPendingAccessGrant(e, t = this.addAccessRoleValue, n, r) {
		try {
			let i = e.trim(), a = await An(i, n);
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
}, {e: [ar, sr, lr, dr, pr, hr, _r, yr, xr, Cr, Tr, Dr, kr, jr, Nr, Fr, Lr, zr, tr], c: [Zr, nr]} = Wr(Vn, [
	[
		ir,
		1,
		"subjectUri"
	],
	[
		or,
		1,
		"accessGrants"
	],
	[
		cr,
		1,
		"principalInputValue"
	],
	[
		ur,
		1,
		"addAccessRoleValue"
	],
	[
		fr,
		1,
		"authenticatedAccessRoleValue"
	],
	[
		mr,
		1,
		"publicAccessRoleValue"
	],
	[
		gr,
		1,
		"submitting"
	],
	[
		vr,
		1,
		"pendingAccessGrants"
	],
	[
		br,
		1,
		"accessGrantDrafts"
	],
	[
		Sr,
		1,
		"errors"
	],
	[
		wr,
		1,
		"successfulChangesRefreshed"
	],
	[
		Er,
		1,
		"accessContext"
	],
	[
		Or,
		1,
		"accessContextLoading"
	],
	[
		Ar,
		1,
		"accessContextError"
	],
	[
		Mr,
		1,
		"advancedSharingOpen"
	],
	[
		Pr,
		1,
		"containerScope"
	],
	[
		Ir,
		1,
		"containerScopeAnalysis"
	],
	[
		Rr,
		1,
		"protectedTarget"
	]
], rr, 0, void 0, p), Vn), Bn = class extends Yr {
	constructor() {
		super(Zr), $(this, "styles", Dt), nr();
	}
}, $(Bn, Br, void 0), Bn)();
// src/components/access-control-modal/index.ts
var Qr = Zr;
export { Zr as n, Qr as t };

//# sourceMappingURL=access-control-modal-Dcg6-f4V.js.map