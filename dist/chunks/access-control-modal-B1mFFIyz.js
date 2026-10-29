import { a as e, c as t, g as n, i as r, o as i, p as a, r as o, u as s } from "./components-C8c2Ucm5.js";
import { u as c } from "./style-Dlw9-wPn.js";
import { T as l, p as u } from "./widgets-B1hBVhRL.js";
import { E as d, _ as f, d as p, g as m, h, m as g, n as _, p as v, t as y, y as b } from "./solidLogicSingleton.esm-Bvt7E7Vl.js";
import "./globe-CsCgZcy5.js";
import "./x-D1JUUSOS.js";
import "./dialog-CgYK767T.js";
import "./dialog-content-DjwRH1ci.js";
import "./dialog-footer-GQWi8lfB.js";
import "./button-D6qO2idW.js";
import { r as x } from "./combobox-DS6byaf1.js";
import "./combobox-option-DOtGuKel.js";
import "./error-state-jV9dlFX2.js";
// ~icons/lucide/circle-x
var S = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m15 9l-6 6m0-6l6 6\"/></g></svg>";
	}
};
customElements.get("icon-lucide-circle-x") || customElements.define("icon-lucide-circle-x", S);
// ~icons/lucide/folder-open
var C = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m6 14l1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2\"/></svg>";
	}
};
customElements.get("icon-lucide-folder-open") || customElements.define("icon-lucide-folder-open", C);
// src/components/access-control-modal/AccessControlSharedAccess.styles.css
var w = a`:host{& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);font-weight:600}& .access-grants-header,& .access-grants-list{align-self:stretch;padding:0 10px}& .access-grants-header{justify-content:space-between;align-items:center;gap:15px;display:flex;& .access-grants-search-input{--solid-ui-input-border-color:transparent;width:12ch;min-width:12ch;color:var(--solid-ui-color-zinc-500,#71717b);font-size:var(--solid-ui-font-size-sm,.875rem);flex:none;font-weight:500}}& .access-grants-list{align-items:flex-start;gap:20px;display:flex;& ul{box-sizing:border-box;border:1px solid var(--solid-ui-color-gray-200,#e5e7eb);border-radius:10px;flex-direction:column;flex:1 0 0;align-items:flex-start;gap:15px;height:195px;min-height:0;padding:15px;display:flex;overflow:hidden auto}& li{flex:none;align-items:center;gap:10px;width:100%;display:flex;& .access-grants-image{aspect-ratio:1;width:30px;height:30px;color:var(--solid-ui-color-white,#fff);text-align:center;font-size:var(--solid-ui-font-size-xs,.75rem);border-radius:999px;flex:0 0 30px;justify-content:center;align-items:center;font-weight:500;display:flex;overflow:hidden;& img{object-fit:cover;border-radius:999px;width:100%;height:100%;display:flex}& span{justify-content:center;align-items:center;width:100%;height:100%;line-height:1;display:flex}}& .access-grants-image--agentGroup{background:var(--solid-ui-color-blue-900,#083575)}& .access-grants-image--agent,& .access-grants-image--agentClass{background:var(--solid-ui-color-lavender-300,#e6dcff)}& .access-grants-image--origin{background:var(--solid-ui-color-green-700,#15803d)}& .access-grants-image--unknown{background:var(--solid-ui-color-gray-300,#d1d5db)}& h3{min-width:0;color:var(--solid-ui-color-gray-800,#1e2939);font-size:var(--solid-ui-font-size-xs,.75rem);flex:auto;font-weight:600}& span{text-align:right;flex:none;margin-left:auto}& .access-grants-role{font-size:var(--solid-ui-font-size-xs,.75rem);flex:none;margin-left:auto}& .access-grants-role--owner{font-size:var(--solid-ui-font-size-xs,.75rem)}& .access-grants-role--editable{max-width:100%}}}& .access-role-select--compact{--solid-ui-input-border-color:transparent;flex:0 0 110px;width:110px;min-width:110px;max-width:100%;margin-top:0}& .access-grants-list li .access-role-select--compact{flex:0 0 110px;width:110px;min-width:110px}}`, T, E, D, O, k, A, j, ee, te, ne, re, ie, ae, oe, se, ce;
function le(e, t, n) {
	ue(e, t), t.set(e, n);
}
function ue(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function de(e, t, n) {
	return e.set(pe(e, t), n), n;
}
function fe(e, t) {
	return e.get(pe(e, t));
}
function pe(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function me(e, t, n) {
	return (t = ge(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function he(e, t, n, r, i, a) {
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
				get: ve(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || ve(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return ye(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : ge(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function ge(e) {
	var t = _e(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function _e(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ve(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function ye(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function be(e) {
	return e;
}
ee = [n("solid-ui-access-control-shared-access")];
var xe;
new (se = (D = /*#__PURE__*/ new WeakMap(), O = /*#__PURE__*/ new WeakMap(), k = /*#__PURE__*/ new WeakMap(), ce = (te = r({ attribute: !1 }), re = r({ type: Boolean }), ae = o(), "accessGrantViewModels"), E = class extends i {
	constructor(...e) {
		super(...e), le(this, D, (A(this), ne(this, []))), le(this, O, ie(this, !1)), le(this, k, oe(this, ""));
	}
	get [ce]() {
		return fe(D, this);
	}
	set accessGrantViewModels(e) {
		de(D, this, e);
	}
	get disabled() {
		return fe(O, this);
	}
	set disabled(e) {
		de(O, this, e);
	}
	get searchValue() {
		return fe(k, this);
	}
	set searchValue(e) {
		de(k, this, e);
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
		let n = t.detail.option.value, r = typeof n == "string" ? v.find((e) => e === n) : void 0;
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
	getFilteredAccessGrants() {
		let e = this.searchValue.trim().toLowerCase();
		return this.accessGrantViewModels.filter(({ subjectLabel: t, subjects: n }) => n.length ? !e || t.toLowerCase().includes(e) : !1);
	}
	renderAccessGrant(e) {
		return s`
      <li>
        ${this.renderAuthorizationBadge(e.authorization, e.subjectLabel)}
        <h3>${e.subjectLabel}</h3>
        ${this.renderAuthorizationRole(e.role, e.id)}
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
	renderAuthorizationRole(e, t) {
		return s`
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
		return v.map((e) => s`
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
}, {e: [ne, ie, oe, A], c: [xe, j]} = he(E, [
	[
		te,
		1,
		"accessGrantViewModels"
	],
	[
		re,
		1,
		"disabled"
	],
	[
		ae,
		1,
		"searchValue"
	]
], ee, 0, void 0, i), E), T = class extends be {
	constructor() {
		super(xe), me(this, "styles", w), j();
	}
}, me(T, se, void 0), T)();
// ~icons/lucide/link
var Se = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></g></svg>";
	}
};
customElements.get("icon-lucide-link") || customElements.define("icon-lucide-link", Se);
// src/components/access-control-modal/AccessControlGeneralAccess.styles.css
var Ce = a`:host{& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);font-weight:600}& .access-grants-general{flex-direction:column;align-self:stretch;align-items:flex-start;gap:10px;padding:0 10px;display:flex;& solid-ui-combobox,& solid-ui-input{--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0)}& .access-grants-general-header{flex-direction:row;justify-content:space-between;align-self:stretch;align-items:center;gap:15px;display:flex;& .access-grants-copy-link-button-label{font-size:var(--solid-ui-font-size-xs,.75rem);font-weight:500}& .access-grants-copy-link-button icon-lucide-link{aspect-ratio:1;width:12px;height:12px}}& .access-grants-general-share{align-self:stretch;align-items:center;gap:10px;display:flex;& .access-grants-general-share-content{flex-direction:row;flex:1 0 0;align-items:flex-start;gap:10px;display:flex;& .access-grants-general-share-icon{aspect-ratio:1;background:var(--solid-ui-color-violet-50,#f5f3ff);border-radius:50px;justify-content:center;align-items:center;width:30px;height:30px;padding:5px;display:flex}& .access-grants-general-share-icon-inner{aspect-ratio:1;flex-shrink:0;justify-content:center;align-items:center;width:20px;height:20px;padding:1.25px;display:flex;& icon-lucide-globe{aspect-ratio:1;flex-shrink:0;width:17.5px;height:17.5px}}& .access-grants-general-share-text{flex:auto;min-width:0;& .access-grants-general-share-text-title{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-sm,.875rem);font-weight:600}& .access-grants-general-share-text-description{color:var(--solid-ui-color-gray-700,#364153);font-size:var(--solid-ui-font-size-sm,.875rem)}}}}}& .access-role-select--general{width:120px;min-width:120px;font-size:var(--solid-ui-font-size-xs,.75rem);flex:0 0 120px;font-weight:500}& .access-role-select--compact{--solid-ui-input-border-color:transparent;max-width:100%;margin-top:0;display:block}}`, we, Te, Ee, De, Oe, ke, Ae, je, Me, Ne, Pe, Fe, Ie, Le, Re, ze, Be, Ve, He;
function Ue(e, t, n) {
	We(e, t), t.set(e, n);
}
function We(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function M(e, t, n) {
	return e.set(Ge(e, t), n), n;
}
function N(e, t) {
	return e.get(Ge(e, t));
}
function Ge(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function Ke(e, t, n) {
	return (t = Je(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function qe(e, t, n, r, i, a) {
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
				get: Xe(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Xe(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return Ze(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : Je(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function Je(e) {
	var t = Ye(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Ye(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Xe(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function Ze(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Qe(e) {
	return e;
}
Me = [n("solid-ui-access-control-general-access")];
var $e;
new (Ve = (Ee = /*#__PURE__*/ new WeakMap(), De = /*#__PURE__*/ new WeakMap(), Oe = /*#__PURE__*/ new WeakMap(), ke = /*#__PURE__*/ new WeakMap(), He = (Ne = r({ attribute: !1 }), Fe = r({ attribute: !1 }), Le = r({ attribute: !1 }), ze = r({ type: Boolean }), "subjectUri"), Te = class extends i {
	constructor(...e) {
		super(...e), Ue(this, Ee, (Ae(this), Pe(this, void 0))), Ue(this, De, Ie(this, "No Access")), Ue(this, Oe, Re(this, "No Access")), Ue(this, ke, Be(this, !1));
	}
	get [He]() {
		return N(Ee, this);
	}
	set subjectUri(e) {
		M(Ee, this, e);
	}
	get authenticatedAccessRoleValue() {
		return N(De, this);
	}
	set authenticatedAccessRoleValue(e) {
		M(De, this, e);
	}
	get publicAccessRoleValue() {
		return N(Oe, this);
	}
	set publicAccessRoleValue(e) {
		M(Oe, this, e);
	}
	get disabled() {
		return N(ke, this);
	}
	set disabled(e) {
		M(ke, this, e);
	}
	onAuthenticatedRoleChange(e) {
		this.dispatchRoleChange("authenticated-role-changed", e, v);
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
		return v.map((e) => s`
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
}, {e: [Pe, Ie, Re, Be, Ae], c: [$e, je]} = qe(Te, [
	[
		Ne,
		1,
		"subjectUri"
	],
	[
		Fe,
		1,
		"authenticatedAccessRoleValue"
	],
	[
		Le,
		1,
		"publicAccessRoleValue"
	],
	[
		ze,
		1,
		"disabled"
	]
], Me, 0, void 0, i), Te), we = class extends Qe {
	constructor() {
		super($e), Ke(this, "styles", Ce), je();
	}
}, Ke(we, Ve, void 0), we)();
// src/components/access-control-modal/AccessControlErrors.styles.css
var et = a`:host{contain:inline-size;width:100%;display:block;& solid-ui-error-state{contain:inline-size;width:100%;max-width:100%}& .access-control-save-errors{box-sizing:border-box;gap:8px;width:100%;margin:0;padding-left:0;list-style:none;display:grid;& li{min-width:0;color:var(--solid-ui-color-red-600,#be2e48);font-size:var(--solid-ui-font-size-sm,.875rem);grid-template-columns:minmax(0,18rem) minmax(0,1fr);align-items:baseline;gap:6px;line-height:1.4;display:grid}& .access-control-save-error-label{overflow-wrap:anywhere;font-weight:500}& .access-control-save-error-detail{overflow-wrap:anywhere;min-width:0}}@media (width<=600px){& .access-control-save-errors li{grid-template-columns:minmax(0,40%) minmax(0,1fr)}}}`, tt, nt, P, F, rt, it, at, ot, st, ct, lt, ut, dt;
function ft(e, t, n) {
	pt(e, t), t.set(e, n);
}
function pt(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function mt(e, t, n) {
	return e.set(gt(e, t), n), n;
}
function ht(e, t) {
	return e.get(gt(e, t));
}
function gt(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function _t(e, t, n) {
	return (t = yt(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function vt(e, t, n, r, i, a) {
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
				get: xt(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || xt(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return St(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : yt(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function yt(e) {
	var t = bt(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function bt(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function xt(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function St(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Ct(e) {
	return e;
}
at = [n("solid-ui-access-control-errors")];
var wt;
new (ut = (P = /*#__PURE__*/ new WeakMap(), F = /*#__PURE__*/ new WeakMap(), dt = (ot = r({ attribute: !1 }), ct = r({ attribute: !1 }), "errors"), nt = class extends i {
	constructor(...e) {
		super(...e), ft(this, P, (rt(this), st(this, []))), ft(this, F, lt(this, !0));
	}
	get [dt]() {
		return ht(P, this);
	}
	set errors(e) {
		mt(P, this, e);
	}
	get successfulChangesRefreshed() {
		return ht(F, this);
	}
	set successfulChangesRefreshed(e) {
		mt(F, this, e);
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
}, {e: [st, lt, rt], c: [wt, it]} = vt(nt, [[
	ot,
	1,
	"errors"
], [
	ct,
	1,
	"successfulChangesRefreshed"
]], at, 0, void 0, i), nt), tt = class extends Ct {
	constructor() {
		super(wt), _t(this, "styles", et), it();
	}
}, _t(tt, ut, void 0), tt)();
// src/components/access-control-modal/AccessControlModal.styles.css
var Tt = a`:host{& .access-control-mixed-policy-warning{border:1px solid var(--solid-ui-color-red-300,#fca5a5);background:var(--solid-ui-color-red-50,#fef2f2);color:var(--solid-ui-color-red-800,#991b1b);font-size:var(--solid-ui-font-size-sm,.875rem);border-radius:5px;gap:4px;margin:0 0 16px;padding:12px 14px;line-height:1.45;display:grid;& strong{font-weight:600}}& .access-control-same-access-toggle{color:var(--solid-ui-color-gray-900,#101828);text-align:left;line-height:1.4;font:inherit;cursor:pointer;background:0 0;border:0;align-items:flex-start;gap:8px;margin-top:12px;padding:0;display:flex}& .access-control-switch-track{background:var(--solid-ui-color-slate-300,#cbd5e1);border-radius:999px;flex:none;width:34px;height:20px;margin-top:1px;padding:2px;transition:background .15s;display:inline-flex}& .access-control-same-access-toggle[aria-checked=true] .access-control-switch-track{background:var(--solid-ui-color-purple-600,#9333ea)}& .access-control-switch-thumb{background:#fff;border-radius:50%;width:16px;height:16px;transition:transform .15s;box-shadow:0 1px 2px #00000040}& .access-control-same-access-toggle[aria-checked=true] .access-control-switch-thumb{transform:translate(14px)}& .access-control-same-access-toggle>span:last-child{overflow-wrap:anywhere;min-width:0;max-width:100%}& .access-control-sharing-state,& .access-control-contents-prompt{box-sizing:border-box;min-width:0;max-width:100%;font-size:var(--solid-ui-font-size-sm,.875rem);margin-bottom:16px;padding:10px;& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);margin:0 0 10px;font-weight:600}& .access-control-advanced-sharing{box-sizing:border-box;overflow-wrap:anywhere;width:100%;min-width:0;max-width:100%;margin-top:10px;padding:10px 48px 10px 15px;position:relative;& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);margin:0 0 4px;font-weight:600}& p{overflow-wrap:anywhere;min-width:0;max-width:100%;color:var(--solid-ui-color-gray-600,#4a5565);font-size:var(--solid-ui-font-size-xs,.75rem);margin:0;line-height:1.5}& .access-control-advanced-sharing-description-line{max-width:100%;display:block}}& .access-control-advanced-sharing-options,& .access-control-advanced-sharing-actions{flex-wrap:wrap;gap:8px;min-width:0;margin-top:10px;display:flex;& solid-ui-button{--solid-ui-font-size-md:var(--solid-ui-font-size-sm,.875rem);white-space:normal;min-width:0;max-width:100%}}& .access-control-advanced-sharing-actions{justify-content:flex-end;margin-top:0;position:absolute;top:10px;right:15px;& solid-ui-button{color:var(--solid-ui-color-gray-600,#4a5565)}}& p{overflow-wrap:anywhere;min-width:0;max-width:100%;color:var(--solid-ui-color-gray-600,#4a5565);margin:0;line-height:1.5}}& .access-control-sharing-state-panel,& .access-control-contents-prompt{box-sizing:border-box;border:1px solid var(--solid-ui-color-slate-200,#e2e8f0);background:var(--solid-ui-color-white,#fff);border-radius:5px;min-width:0;max-width:100%;padding:10px 15px}& .access-control-sharing-state-panel{gap:10px;display:grid;& p{overflow-wrap:anywhere;min-width:0;max-width:100%}& .access-control-sharing-state-custom-row{flex-wrap:wrap;align-items:center;gap:8px;display:flex;& p{flex:auto}& solid-ui-button{--solid-ui-font-size-md:var(--solid-ui-font-size-sm,.875rem);flex:none}}}& .access-control-sharing-guidance{justify-content:space-between;align-items:center;gap:12px;min-width:0;display:flex;& p{overflow-wrap:anywhere;min-width:0;max-width:100%}& solid-ui-button{--solid-ui-font-size-md:var(--solid-ui-font-size-sm,.875rem);flex:none}}& .access-control-sharing-state-actions{flex-direction:column;justify-content:flex-end;align-items:flex-end;gap:8px;min-width:0;margin-top:10px;display:flex;& solid-ui-button{--solid-ui-font-size-md:var(--solid-ui-font-size-sm,.875rem);max-width:100%}}@media (width<=420px){& .access-control-sharing-guidance{flex-direction:column;align-items:flex-start;gap:8px;& solid-ui-button{align-self:flex-end}}}& .access-control-contents-prompt{& .access-control-contents-prompt-actions{flex-wrap:wrap;gap:8px;min-width:0;margin-top:10px;display:flex}& solid-ui-button{--solid-ui-font-size-md:var(--solid-ui-font-size-sm,.875rem);flex:0 auto;max-width:100%}}& .access-control-contents-prompt h2{margin-bottom:4px}& .access-control-footer-actions{justify-content:flex-end;align-items:center;gap:15px;width:100%;display:flex;&>solid-ui-button{min-width:132px}}@media (width<=380px){& .access-control-footer-actions{gap:8px;&>solid-ui-button{flex:1 1 0;min-width:0}}}}`;
// src/components/access-control-modal/accessGrantDrafts.ts
function Et(e) {
	return {
		...e,
		agentClass: e.agentClass.filter((e) => e !== m.iri && e !== f.iri)
	};
}
function Dt(e) {
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
function Ot(e) {
	return e.id ? e.id : Dt(e).map((e) => `${e.type}:${e.iri}`).sort().join("|");
}
function kt(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = Ot(Et(e)), r = t.get(n) ?? 0;
		return t.set(n, r + 1), r === 0 ? n : `${n}#${r}`;
	});
}
function At(e) {
	let t = [
		...e.agent,
		...e.agentGroup,
		...e.agentClass,
		...e.origin
	];
	return t.length ? t.map((e) => c(d(e))).join(", ") : "Unknown access holder";
}
function jt(e) {
	return y.acl.roleFromModes(e.mode);
}
function Mt(e) {
	let t = Et(e);
	return {
		id: Ot(t),
		authorization: t,
		role: jt(t),
		initialRole: jt(e),
		subjectLabel: At(t),
		subjects: Dt(t)
	};
}
function Nt(e) {
	let t = kt(e);
	return e.map((e, n) => ({
		...Mt(e),
		id: t[n]
	}));
}
function Pt(e) {
	return [...e].sort((t, n) => {
		let r = t.role === "Owner", i = n.role === "Owner";
		return r && !i ? -1 : !r && i ? 1 : e.indexOf(t) - e.indexOf(n);
	});
}
function Ft(e) {
	return Pt(e).filter(({ role: e, initialRole: t, subjects: n }) => e !== t && n.length > 0).map(({ authorization: e, subjects: t, role: n }) => ({
		authorization: e,
		subjects: t,
		role: n
	}));
}
function It(e) {
	let t = e.filter((e) => e.agentClass.includes(m.iri)).flatMap((e) => e.mode);
	return t.length ? y.acl.roleFromModes(t) : "No Access";
}
function Lt(e) {
	let t = e.filter((e) => e.agentClass.includes(f.iri)).flatMap((e) => e.mode);
	return t.length ? y.acl.publicRoleFromModes(t) : "No Access";
}
function Rt(e) {
	return e.iri === m.iri ? "Authenticated users" : e.iri === f.iri ? "Public" : c(d(e.iri)).trim() || e.iri;
}
// ~icons/lucide/book-user
var zt = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15 13a3 3 0 1 0-6 0\"/><path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\"/><circle cx=\"12\" cy=\"8\" r=\"2\"/></g></svg>";
	}
};
customElements.get("icon-lucide-book-user") || customElements.define("icon-lucide-book-user", zt);
// ~icons/lucide/user-round
var Bt = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"8\" r=\"5\"/><path d=\"M20 21a8 8 0 0 0-16 0\"/></g></svg>";
	}
};
customElements.get("icon-lucide-user-round") || customElements.define("icon-lucide-user-round", Bt);
// ~icons/lucide/users
var Vt = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/></g></svg>";
	}
};
customElements.get("icon-lucide-users") || customElements.define("icon-lucide-users", Vt);
// src/components/access-control-modal/AccessControlAddAccess.styles.css
var Ht = a`:host{& .access-grants-form{font-size:var(--solid-ui-font-size-sm,.875rem);--access-role-select-width:129px;flex-direction:column;align-self:stretch;align-items:flex-start;gap:10px;padding:10px;display:flex;& p{color:var(--solid-ui-color-gray-600,#4a5565);line-height:1.5}& .access-grants-form-main{align-self:stretch;align-items:center;gap:10px;display:flex;& .access-grants-input{border:1px solid var(--solid-ui-color-slate-200,#e2e8f0);background:var(--solid-ui-color-white,#fff);border-radius:5px;flex-direction:column;flex:auto;align-items:flex-start;gap:12px;min-width:0;padding:10px 15px;display:flex;& solid-ui-combobox{--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0);width:100%}& .access-principal-error{color:var(--solid-ui-color-red-700,#b42318);font-size:var(--solid-ui-font-size-xs,.75rem);margin:0;line-height:1.4}}}& .access-grants-pending{flex-wrap:wrap;align-items:center;gap:8px;min-height:42px;display:flex}& .access-grants-pending-item{border:1px solid var(--solid-ui-color-gray-300,#d1d5dc);background:var(--solid-ui-color-gray-50,#f9fafb);max-width:100%;color:var(--solid-ui-color-gray-700,#374151);border-radius:5px;align-items:center;gap:6px;padding:5px 10px;display:flex}& .access-grants-pending-item-label{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--solid-ui-color-gray-500,#6a7282);font-size:var(--solid-ui-font-size-xs,.75rem);line-height:1;overflow:hidden}& .access-grants-pending-item-remove{color:var(--solid-ui-color-gray-300,#d1d5dc);cursor:pointer;background:0 0;border:none;border-radius:999px;justify-content:center;align-items:center;padding:0;display:inline-flex;& icon-lucide-circle-x{width:14px;height:14px}}}& .access-grants-directory-entry{align-items:center;gap:8px;line-height:1;display:inline-flex}& .access-role-select{max-width:100%;width:var(--access-role-select-width);--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0);flex:none;margin-top:25px;display:block}& .access-role-select--top{margin-top:0}}`, Ut, Wt, I, L, R, z, B, V, Gt, Kt, qt, Jt, Yt, Xt, Zt, Qt, $t, en, tn, nn, rn, an, on, sn, cn;
function H(e, t, n) {
	ln(e, t), t.set(e, n);
}
function ln(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function U(e, t, n) {
	return e.set(un(e, t), n), n;
}
function W(e, t) {
	return e.get(un(e, t));
}
function un(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function dn(e, t, n) {
	return (t = pn(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function fn(e, t, n, r, i, a) {
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
				get: hn(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || hn(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return gn(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : pn(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function pn(e) {
	var t = mn(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function mn(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function hn(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function gn(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function _n(e) {
	return e;
}
function vn(e) {
	return s`
    <span class="access-grants-directory-entry">
      ${yn(e)}
      <span>${e.label}</span>
    </span>
  `;
}
function yn(e) {
	return e.sources.includes("contacts") || e.sources.includes("groups") ? s`<icon-lucide-book-user style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-book-user>` : e.sources.includes("friends") ? s`<icon-lucide-users style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-users>` : e.sources.includes("catalog") ? s`<icon-lucide-user-round style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-user-round>` : t;
}
qt = [n("solid-ui-access-control-add-access")];
var bn;
new (sn = (I = /*#__PURE__*/ new WeakMap(), L = /*#__PURE__*/ new WeakMap(), R = /*#__PURE__*/ new WeakMap(), z = /*#__PURE__*/ new WeakMap(), B = /*#__PURE__*/ new WeakMap(), V = /*#__PURE__*/ new WeakMap(), cn = (Jt = r({ attribute: !1 }), Xt = r({ attribute: !1 }), Qt = r({ attribute: !1 }), en = r({ attribute: !1 }), nn = r({ type: Boolean }), an = r({ attribute: !1 }), "principalInputValue"), Wt = class extends i {
	constructor(...e) {
		super(...e), H(this, I, (Gt(this), Yt(this, ""))), H(this, L, Zt(this, "Viewer")), H(this, R, $t(this, [])), H(this, z, tn(this, "")), H(this, B, rn(this, !1)), H(this, V, on(this, null));
	}
	get [cn]() {
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
		let t = e.detail.option.value, n = typeof t == "string" ? v.find((e) => e === t) : void 0;
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
		return s`
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
            ${this.inputError ? s`<p class="access-principal-error" role="alert">${this.inputError}</p>` : t}
            ${this.renderPendingAccessGrants()}
          </div>
          <solid-ui-combobox
            class="access-role-select access-role-select--top"
            .disabled=${this.disabled}
            .value=${this.addAccessRoleValue}
            @change=${this.onRoleChange}
          >
            ${v.filter((e) => e !== "No Access").map((e) => s`
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
}, {e: [Yt, Zt, $t, tn, rn, on, Gt], c: [bn, Kt]} = fn(Wt, [
	[
		Jt,
		1,
		"principalInputValue"
	],
	[
		Xt,
		1,
		"addAccessRoleValue"
	],
	[
		Qt,
		1,
		"pendingAccessGrants"
	],
	[
		en,
		1,
		"inputError"
	],
	[
		nn,
		1,
		"disabled"
	],
	[
		an,
		1,
		"asyncOptionsProvider"
	]
], qt, 0, void 0, i), Wt), Ut = class extends _n {
	constructor() {
		super(bn), dn(this, "styles", Ht), Kt();
	}
}, dn(Ut, sn, void 0), Ut)();
// src/components/access-control-modal/helpers.ts
function xn(e) {
	try {
		let t = new URL(e);
		return (t.protocol === "http:" || t.protocol === "https:") && !!t.hostname;
	} catch {
		return !1;
	}
}
function Sn(e) {
	if (!xn(e)) return !1;
	let t = new URL(e);
	return t.pathname === "/" && !t.search && !t.hash && !t.username && !t.password;
}
function Cn(e) {
	let t = e.trim();
	if (t && !xn(t)) try {
		let e = new URL(`https://${t}`), n = e.protocol === "http:" || e.protocol === "https:", r = e.pathname === "/" && !e.search && !e.hash, i = e.hostname.includes(".") || e.hostname.includes(":");
		return n && r && i && !e.username && !e.password ? e.origin : void 0;
	} catch {
		return;
	}
}
function wn(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = t(r);
		e && !n.has(e) && n.set(e, r);
	}
	return [...n.values()];
}
function Tn(e) {
	return wn(e, (e) => e.value);
}
// src/components/access-control-modal/accessTargetResolver.ts
async function En(e) {
	let t = Cn(e);
	return t ? {
		kind: "origin",
		subjectValue: t
	} : Sn(e) ? {
		kind: "origin",
		subjectValue: new URL(e).origin
	} : await y.acl.classifyAccessControlSubject(e);
}
async function Dn(e, t) {
	if (!e || e.kind === "origin") return e?.subjectValue;
	let n = d(e.subjectValue);
	await y.store.fetcher.load(n.doc());
	let r = t?.trim() || c(n).trim();
	if (!r || r === e.subjectValue) throw Error("The access target has no usable display label.");
	return r;
}
async function On(e, t) {
	let n = await En(e);
	if (!n) return;
	let r = await Dn(n, t);
	if (r) return {
		subjectType: n.kind,
		subjectValue: n.subjectValue,
		label: r,
		targetKind: n.kind === "origin" ? "origin" : void 0
	};
}
async function kn(e) {
	let t = await On(e);
	return t ? {
		label: t.label,
		value: e
	} : void 0;
}
function An(e, t) {
	return {
		label: t,
		value: e.uri,
		template: vn({
			...e,
			label: t
		})
	};
}
async function jn(e) {
	let t = Cn(e);
	if (t) return [{
		label: `Use origin ${t}`,
		value: t,
		targetKind: "origin",
		template: s`<span class="access-grants-directory-entry"><icon-lucide-globe style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-globe><span>Use origin ${t}</span></span>`
	}];
	if (!xn(e)) return [];
	if (Sn(e)) return [{
		label: `Use origin ${new URL(e).origin}`,
		value: new URL(e).origin,
		targetKind: "origin",
		template: s`<span class="access-grants-directory-entry"><icon-lucide-globe style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-globe><span>Use origin ${new URL(e).origin}</span></span>`
	}];
	let n = await kn(e);
	return Tn(n ? [n] : []);
}
async function Mn(e) {
	try {
		let t = y.authn.currentUser();
		if (!t) return [];
		await y.profile.loadProfile(t);
		let n = y.store;
		return n.each(t, b.acl("trustedApp")).flatMap((t) => {
			let r = n.any(t, b.acl("origin"));
			if (!r || !Sn(r.value)) return [];
			let i = new URL(r.value).origin;
			return e && !`${i} trusted app`.toLowerCase().includes(e.toLowerCase()) ? [] : [{
				label: `Trusted app: ${i}`,
				value: i,
				targetKind: "trustedApp",
				template: s`<span class="access-grants-directory-entry"><icon-lucide-globe style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-globe><span>Trusted app: ${i}</span></span>`
			}];
		});
	} catch {
		return [];
	}
}
function Nn(e) {
	return e.length ? e : [{
		label: "Type at least 2 characters to search",
		value: "",
		selectable: !1
	}];
}
var Pn = x(async (e) => {
	let t = e.trim(), n = await jn(t), r = await Mn(t);
	if (t.length < 2) return wn([
		...n,
		...r,
		...Nn(n)
	], (e) => {
		let t = e;
		return typeof t.value == "string" ? `${t.value}:${t.targetKind ?? "default"}` : void 0;
	});
	let i = [];
	try {
		i = await y.directory.search({
			query: t,
			sources: _
		});
	} catch (e) {
		if (!n.length && !r.length) throw e;
	}
	let a = (await Promise.all(i.map(async (e) => {
		try {
			let t = await On(e.uri, e.label);
			return t ? {
				entry: e,
				label: t.label
			} : void 0;
		} catch {
			return;
		}
	}))).filter((e) => e !== void 0).map(({ entry: e, label: t }) => An(e, t));
	return wn([
		...n,
		...r,
		...a
	], (e) => {
		let t = e;
		return typeof t.value == "string" ? `${t.value}:${t.targetKind ?? "default"}` : void 0;
	});
});
// src/components/access-control-modal/applyAccessChanges.ts
async function Fn(e, t, n = {}) {
	let r = [], i = n.containerScope ?? "file";
	for (let { subject: n, label: a, role: o } of t) try {
		let t = i === "folder+contents" ? y.acl.planGrantContainerAndContents : i === "container" ? y.acl.planGrantContainer : i === "contents" ? y.acl.planGrantContainerContents : y.acl.planGrant, r = o === "No Access" ? await (i === "contents" ? y.acl.planRevokeContainerContents(e, n) : y.acl.planRevoke(e, n)) : await t(e, n, In(n, o));
		await y.acl.applyPlan(r);
	} catch (e) {
		r.push({
			action: o === "No Access" ? "revoke" : "grant",
			targetUri: n.iri,
			label: a,
			role: o,
			scope: i,
			message: e instanceof Error ? e.message : "Unable to apply access change."
		});
	}
	return r;
}
function In(e, t) {
	if (e.type === "agentClass" && e.iri === f.iri) {
		let e = h.find((e) => e === t);
		if (!e) throw Error(`Public access does not support the ${t} role.`);
		return y.acl.modesFromPublicRole(e);
	}
	return y.acl.modesFromRole(t);
}
// src/components/access-control-modal/buildAccessChanges.ts
function Ln({ pendingAccessGrants: e, generalAccessChanges: t, changedAccessGrants: n }) {
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
			label: Rt(e)
		})))
	];
}
// src/components/access-control-modal/AccessControlModal.ts
var Rn, zn, G, K, q, J, Bn, Vn, Hn, Un, Wn, Gn, Kn, qn, Jn, Yn, Y, Xn, Zn, Qn, $n, er, tr, nr, rr, ir, ar, or, sr, cr, lr, ur, dr, fr, pr, mr, hr, gr, _r, vr, yr, br, xr, Sr, Cr, wr, Tr, Er, Dr, Or, kr, Ar, jr, Mr, Nr, Pr, Fr, Ir, Lr, Rr, zr;
function X(e, t, n) {
	Br(e, t), t.set(e, n);
}
function Br(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function Z(e, t, n) {
	return e.set(Vr(e, t), n), n;
}
function Q(e, t) {
	return e.get(Vr(e, t));
}
function Vr(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function $(e, t, n) {
	return (t = Ur(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Hr(e, t, n, r, i, a) {
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
				get: Gr(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Gr(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return Kr(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : Ur(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function Ur(e) {
	var t = Wr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Wr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Gr(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function Kr(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function qr(e) {
	return e;
}
function Jr(e) {
	return e != null;
}
tr = [n("solid-ui-access-control-modal")];
var Yr;
new (Rr = (G = /*#__PURE__*/ new WeakMap(), K = /*#__PURE__*/ new WeakMap(), q = /*#__PURE__*/ new WeakMap(), J = /*#__PURE__*/ new WeakMap(), Bn = /*#__PURE__*/ new WeakMap(), Vn = /*#__PURE__*/ new WeakMap(), Hn = /*#__PURE__*/ new WeakMap(), Un = /*#__PURE__*/ new WeakMap(), Wn = /*#__PURE__*/ new WeakMap(), Gn = /*#__PURE__*/ new WeakMap(), Kn = /*#__PURE__*/ new WeakMap(), qn = /*#__PURE__*/ new WeakMap(), Jn = /*#__PURE__*/ new WeakMap(), Yn = /*#__PURE__*/ new WeakMap(), Y = /*#__PURE__*/ new WeakMap(), Xn = /*#__PURE__*/ new WeakMap(), Zn = /*#__PURE__*/ new WeakMap(), Qn = /*#__PURE__*/ new WeakMap(), zr = (nr = r({ attribute: !1 }), ir = r({ attribute: !1 }), or = o(), cr = o(), ur = o(), fr = o(), mr = o(), gr = o(), vr = o(), br = o(), Sr = o(), wr = o(), Er = o(), Or = o(), Ar = o(), Mr = o(), Pr = o(), Ir = o(), "subjectUri"), zn = class extends e {
	constructor(...e) {
		super(...e), X(this, G, ($n(this), rr(this, void 0))), X(this, K, ar(this, void 0)), X(this, q, sr(this, "")), X(this, J, lr(this, "Viewer")), X(this, Bn, dr(this, "No Access")), X(this, Vn, pr(this, "No Access")), X(this, Hn, hr(this, !1)), X(this, Un, _r(this, [])), X(this, Wn, yr(this, [])), X(this, Gn, xr(this, [])), X(this, Kn, Cr(this, !0)), X(this, qn, Tr(this)), X(this, Jn, Dr(this, !1)), X(this, Yn, kr(this, "")), X(this, Y, jr(this, !1)), X(this, Xn, Nr(this, "folder+contents")), X(this, Zn, Fr(this)), X(this, Qn, Lr(this, !1)), $(this, "accessGrantLabelRequestVersion", 0), $(this, "accessContextRequestVersion", 0), $(this, "accessContextSubjectUri", void 0);
	}
	get [zr]() {
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
		return Q(Bn, this);
	}
	set authenticatedAccessRoleValue(e) {
		Z(Bn, this, e);
	}
	get publicAccessRoleValue() {
		return Q(Vn, this);
	}
	set publicAccessRoleValue(e) {
		Z(Vn, this, e);
	}
	get submitting() {
		return Q(Hn, this);
	}
	set submitting(e) {
		Z(Hn, this, e);
	}
	get pendingAccessGrants() {
		return Q(Un, this);
	}
	set pendingAccessGrants(e) {
		Z(Un, this, e);
	}
	get accessGrantDrafts() {
		return Q(Wn, this);
	}
	set accessGrantDrafts(e) {
		Z(Wn, this, e);
	}
	get errors() {
		return Q(Gn, this);
	}
	set errors(e) {
		Z(Gn, this, e);
	}
	get successfulChangesRefreshed() {
		return Q(Kn, this);
	}
	set successfulChangesRefreshed(e) {
		Z(Kn, this, e);
	}
	get accessContext() {
		return Q(qn, this);
	}
	set accessContext(e) {
		Z(qn, this, e);
	}
	get accessContextLoading() {
		return Q(Jn, this);
	}
	set accessContextLoading(e) {
		Z(Jn, this, e);
	}
	get accessContextError() {
		return Q(Yn, this);
	}
	set accessContextError(e) {
		Z(Yn, this, e);
	}
	get advancedSharingOpen() {
		return Q(Y, this);
	}
	set advancedSharingOpen(e) {
		Z(Y, this, e);
	}
	get containerScope() {
		return Q(Xn, this);
	}
	set containerScope(e) {
		Z(Xn, this, e);
	}
	get containerScopeAnalysis() {
		return Q(Zn, this);
	}
	set containerScopeAnalysis(e) {
		Z(Zn, this, e);
	}
	get protectedTarget() {
		return Q(Qn, this);
	}
	set protectedTarget(e) {
		Z(Qn, this, e);
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
			this.accessGrantDrafts = Nt(e), this.authenticatedAccessRoleValue = It(e), this.publicAccessRoleValue = Lt(e);
		}
	}
	updated(e) {
		super.updated(e), e.has("subjectUri") && this.loadAccessContext().catch((e) => {
			l("Failed to load access control context", e);
		}), e.has("accessGrants") && this.refreshAccessGrantLabels().catch((e) => {
			l("Failed to refresh access grant labels", e);
		}), e.has("accessContext") && !e.has("subjectUri") && this.refreshContainerScopeAnalysis();
	}
	refreshContainerScopeAnalysis() {
		this.isContainer() && this.accessContext ? (this.containerScopeAnalysis = g(this.accessContext), this.containerScope = this.containerScopeAnalysis.primaryScope, this.refreshScopedAccessGrantDrafts()) : this.containerScopeAnalysis = void 0;
	}
	async refreshAccessGrantLabels() {
		let e = ++this.accessGrantLabelRequestVersion, t = this.accessGrants, n = this.subjectUri, r = this.getSelectedContainerScope(), i = this.getScopedAccessGrants(r);
		if (!i.length) {
			this.accessGrantDrafts = [];
			return;
		}
		let a = await Promise.all(i.map(async (e) => (await Promise.all(e.agentGroup.map(async (e) => {
			try {
				await y.store.fetcher.load(d(e).doc());
			} catch {}
		})), At(Et(e)))));
		if (e === this.accessGrantLabelRequestVersion && this.accessGrants === t && this.subjectUri === n && this.getSelectedContainerScope() === r) {
			let e = new Map(kt(i).map((e, t) => [e, a[t]]));
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
			let n = await y.acl.findEffectiveAcl(t);
			if (e !== this.accessContextRequestVersion || this.subjectUri !== t) return;
			this.accessContext = n, this.accessContextSubjectUri = t, this.accessContext?.inherited && !this.accessGrants?.length && (this.accessGrants = this.accessContext.authorizations), this.refreshContainerScopeAnalysis(), this.protectedTarget = y.acl.isProtectedResource(t), this.protectedTarget && this.refreshScopedAccessGrantDrafts();
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
	renderSharingInformation() {
		if (!this.accessContext) return s``;
		let e = !this.accessContext.inherited, t = this.accessContext?.effectiveContainer, n = t ? c(d(t)).trim() : "", r = n && n !== t ? s`<strong>${n}</strong> (${t})` : s`<strong>${t ?? "the parent container"}</strong>`;
		return s`
      <div class="access-control-sharing-state-panel">
        ${e ? s`
            <div class="access-control-sharing-state-custom-row">
              <p>This resource has its own sharing settings.</p>
              ${this.protectedTarget ? s`` : s`
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
          ` : t ? s`<p>This resource inherits sharing settings from ${r}.</p>` : s`<p>This resource inherits sharing settings, but no inherited default is available.</p>`}
        ${this.protectedTarget ? s`<p class="access-control-sharing-state-protected-message">This is a protected storage resource. Its primary access-control settings cannot be reset here.</p>` : s``}
      </div>
    `;
	}
	renderSharingState() {
		return !this.accessContext || !this.advancedSharingOpen ? s`` : s`
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
		return this.accessContextLoading ? s`<p role="status">Loading access settings...</p>` : this.accessContextError ? s`
        <solid-ui-error-state
          title="Could not load access settings"
          message=${this.accessContextError}
        >
          <solid-ui-button type="button" variant="secondary" @click=${this.retryAccessContext}>
            Retry
          </solid-ui-button>
        </solid-ui-error-state>
      ` : this.accessContext ? s`` : s`<p role="status">Access settings are not ready yet.</p>`;
	}
	renderMixedContainerWarning() {
		return this.hasMixedContainerPolicy() ? s`
      <div class="access-control-mixed-policy-warning" role="alert">
        <strong>This container has different access settings for the folder and its contents.</strong>
        <span>Changing this mixed policy is an advanced feature. You can still change access for the folder or its contents separately below.</span>
      </div>
    ` : s``;
	}
	getScopedAccessGrants(e = this.getSelectedContainerScope()) {
		let t = this.accessGrants ?? [];
		return !this.isContainer() || !this.subjectUri || this.protectedTarget ? t : p(this.subjectUri, t, e, this.accessContext?.inherited ?? !1);
	}
	refreshScopedAccessGrantDrafts() {
		let e = this.getScopedAccessGrants();
		this.accessGrantDrafts = Nt(e), this.authenticatedAccessRoleValue = It(e), this.publicAccessRoleValue = Lt(e);
	}
	selectContainerScope(e) {
		this.containerScope = e, this.refreshScopedAccessGrantDrafts();
	}
	renderAdvancedSharing() {
		return this.advancedSharingOpen ? s`
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
        ${this.isContainer() ? s`
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
          ` : s``}
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
    ` : s``;
	}
	render() {
		let e = this.getDialogTitle();
		return s`
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
              .asyncOptionsProvider=${Pn}
              @target-input=${this.onPrincipalInput}
              @target-selected=${this.onPrincipalSelect}
              @role-changed=${this.onAddAccessRoleInput}
              @pending-grant-removed=${this.onPendingGrantRemoved}
            ></solid-ui-access-control-add-access>
            <solid-ui-access-control-shared-access
              .disabled=${!this.canMutate() || this.hasMixedContainerPolicy()}
              .accessGrantViewModels=${Pt(this.accessGrantDrafts)}
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
		e.preventDefault(), this.submitting || this.hasMixedContainerPolicy() || (!this.isConnected || await this.ensureAccessContext()) && await this.commitPrincipalFromInputSafely();
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
				await y.acl.resetToDefault(this.subjectUri), await this.loadAccessContext();
				let e = await y.acl.findAccessGrants(this.subjectUri);
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
	async saveAccessChanges(e = "file") {
		if (this.submitting || !this.canMutate() || this.hasMixedContainerPolicy()) return;
		let t = Ft(this.accessGrantDrafts), n = this.getGeneralAccessChanges();
		if ((this.pendingAccessGrants.length || t.length || n.length) && this.subjectUri) {
			this.submitting = !0, this.errors = this.errors.filter((e) => e.action === "input"), this.successfulChangesRefreshed = !0;
			try {
				let r = Ln({
					pendingAccessGrants: this.pendingAccessGrants,
					generalAccessChanges: n,
					changedAccessGrants: t
				}), i = await Fn(this.subjectUri, r, { containerScope: e });
				if (i.length) {
					this.errors = [...this.errors, ...i], this.principalInputValue = "", this.pendingAccessGrants = [];
					try {
						this.accessGrants = await y.acl.findAccessGrants(this.subjectUri);
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
		this.canMutate() && !this.hasMixedContainerPolicy() && (this.principalInputValue = e.detail.value, this.clearInputError());
	}
	onPrincipalSelect(e) {
		this.canMutate() && !this.hasMixedContainerPolicy() && this.queuePendingPrincipal(e.detail.value, this.addAccessRoleValue, e.detail.label, void 0, e.detail.targetKind);
	}
	getGeneralAccessChanges() {
		if (!this.subjectUri) return [];
		let e = this.getScopedAccessGrants(), t = It(e), n = Lt(e);
		return [this.authenticatedAccessRoleValue === t ? void 0 : {
			subject: m,
			role: this.authenticatedAccessRoleValue,
			label: "Authenticated users"
		}, this.publicAccessRoleValue === n ? void 0 : {
			subject: f,
			role: this.publicAccessRoleValue,
			label: "Public"
		}].filter(Jr);
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
		return !!(this.pendingAccessGrants.length || this.principalInputValue.trim() || Ft(this.accessGrantDrafts).length || this.getGeneralAccessChanges().length);
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
			let i = e.trim(), a = await On(i, n);
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
}, {e: [rr, ar, sr, lr, dr, pr, hr, _r, yr, xr, Cr, Tr, Dr, kr, jr, Nr, Fr, Lr, $n], c: [Yr, er]} = Hr(zn, [
	[
		nr,
		1,
		"subjectUri"
	],
	[
		ir,
		1,
		"accessGrants"
	],
	[
		or,
		1,
		"principalInputValue"
	],
	[
		cr,
		1,
		"addAccessRoleValue"
	],
	[
		ur,
		1,
		"authenticatedAccessRoleValue"
	],
	[
		fr,
		1,
		"publicAccessRoleValue"
	],
	[
		mr,
		1,
		"submitting"
	],
	[
		gr,
		1,
		"pendingAccessGrants"
	],
	[
		vr,
		1,
		"accessGrantDrafts"
	],
	[
		br,
		1,
		"errors"
	],
	[
		Sr,
		1,
		"successfulChangesRefreshed"
	],
	[
		wr,
		1,
		"accessContext"
	],
	[
		Er,
		1,
		"accessContextLoading"
	],
	[
		Or,
		1,
		"accessContextError"
	],
	[
		Ar,
		1,
		"advancedSharingOpen"
	],
	[
		Mr,
		1,
		"containerScope"
	],
	[
		Pr,
		1,
		"containerScopeAnalysis"
	],
	[
		Ir,
		1,
		"protectedTarget"
	]
], tr, 0, void 0, e), zn), Rn = class extends qr {
	constructor() {
		super(Yr), $(this, "styles", Tt), er();
	}
}, $(Rn, Rr, void 0), Rn)();
// src/components/access-control-modal/index.ts
var Xr = Yr;
export { Yr as n, Xr as t };

//# sourceMappingURL=access-control-modal-B1mFFIyz.js.map