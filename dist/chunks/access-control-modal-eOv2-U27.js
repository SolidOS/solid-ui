import { D as e, _ as t, a as n, g as r, h as i, i as a, v as o } from "./index.esm-N8NHgFUj.js";
import { u as s } from "./style-ChFDDB1c.js";
import { T as c, p as l } from "./widgets-CVLwnfkU.js";
import { a as u, c as d, g as f, i as p, o as m, p as h, r as g, u as _ } from "./components-Bdqizu8x.js";
import "./button-lol95DqR.js";
import "./dialog-DYgcCurb.js";
import "./dialog-content-jx08y2Oa.js";
import "./dialog-footer-Bhl8k1PX.js";
import { r as v } from "./combobox-Dmv-TZtI.js";
import "./combobox-option-B-Hksiq2.js";
import "./error-state-DK1x-kNd.js";
//#region ~icons/lucide/circle-x
var y = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m15 9l-6 6m0-6l6 6\"/></g></svg>";
	}
};
customElements.get("icon-lucide-circle-x") || customElements.define("icon-lucide-circle-x", y);
//#endregion
//#region src/components/access-control-modal/AccessControlSharedAccess.styles.css
var b = h`:host{& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);font-weight:600}& .access-grants-header,& .access-grants-list{align-self:stretch;padding:0 10px}& .access-grants-header{justify-content:space-between;align-items:center;gap:15px;display:flex;& .access-grants-search-input{--solid-ui-input-border-color:transparent;width:12ch;min-width:12ch;color:var(--solid-ui-color-zinc-500,#71717b);font-size:var(--solid-ui-font-size-sm,.875rem);flex:none;font-weight:500}}& .access-grants-list{align-items:flex-start;gap:20px;display:flex;& ul{box-sizing:border-box;border:1px solid var(--solid-ui-color-gray-200,#e5e7eb);border-radius:10px;flex-direction:column;flex:1 0 0;align-items:flex-start;gap:15px;height:195px;min-height:0;padding:15px;display:flex;overflow:hidden auto}& li{flex:none;align-items:center;gap:10px;width:100%;display:flex;& .access-grants-image{aspect-ratio:1;width:30px;height:30px;color:var(--solid-ui-color-white,#fff);text-align:center;font-size:var(--solid-ui-font-size-xs,.75rem);border-radius:999px;flex:0 0 30px;justify-content:center;align-items:center;font-weight:500;display:flex;overflow:hidden;& img{object-fit:cover;border-radius:999px;width:100%;height:100%;display:flex}& span{justify-content:center;align-items:center;width:100%;height:100%;line-height:1;display:flex}}& .access-grants-image--agentGroup{background:var(--solid-ui-color-blue-900,#083575)}& .access-grants-image--agent,& .access-grants-image--agentClass{background:var(--solid-ui-color-lavender-300,#e6dcff)}& .access-grants-image--origin{background:var(--solid-ui-color-green-700,#15803d)}& .access-grants-image--unknown{background:var(--solid-ui-color-gray-300,#d1d5db)}& h3{min-width:0;color:var(--solid-ui-color-gray-800,#1e2939);font-size:var(--solid-ui-font-size-xs,.75rem);flex:auto;font-weight:600}& span{text-align:right;flex:none;margin-left:auto}& .access-grants-role{font-size:var(--solid-ui-font-size-xs,.75rem);flex:none;margin-left:auto}& .access-grants-role--owner{font-size:var(--solid-ui-font-size-xs,.75rem)}& .access-grants-role--editable{max-width:100%}}}& .access-role-select--compact{--solid-ui-input-border-color:transparent;flex:0 0 110px;width:110px;min-width:110px;max-width:100%;margin-top:0}& .access-grants-list li .access-role-select--compact{flex:0 0 110px;width:110px;min-width:110px}}`, x, S, C, w, T, E, D, O, k, A, j, ee, te;
function ne(e, t, n) {
	re(e, t), t.set(e, n);
}
function re(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function ie(e, t, n) {
	return e.set(oe(e, t), n), n;
}
function ae(e, t) {
	return e.get(oe(e, t));
}
function oe(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function se(e, t, n) {
	return (t = le(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ce(e, t, n, r, i, a) {
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
				get: de(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || de(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return fe(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : le(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function le(e) {
	var t = ue(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ue(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function de(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function fe(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function pe(e) {
	return e;
}
D = [f("solid-ui-access-control-shared-access")];
var me;
new (ee = (C = /*#__PURE__*/ new WeakMap(), w = /*#__PURE__*/ new WeakMap(), te = (O = p({ attribute: !1 }), A = g(), "accessGrantViewModels"), S = class extends m {
	constructor(...e) {
		super(...e), ne(this, C, (T(this), k(this, []))), ne(this, w, j(this, ""));
	}
	get [te]() {
		return ae(C, this);
	}
	set accessGrantViewModels(e) {
		ie(C, this, e);
	}
	get searchValue() {
		return ae(w, this);
	}
	set searchValue(e) {
		ie(w, this, e);
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
		let n = t.detail.option.value;
		if (typeof n != "string" || !r.includes(n)) return;
		let i = {
			id: e,
			role: n
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
		return _`
      <li>
        ${this.renderAuthorizationBadge(e.authorization, e.subjectLabel)}
        <h3>${e.subjectLabel}</h3>
        ${this.renderAuthorizationRole(e.role, e.id)}
      </li>
    `;
	}
	renderAuthorizationBadge(e, t) {
		let n = this.getAuthorizationBadge(e, t);
		return _`
      <div class="access-grants-image access-grants-image--${n.kind}">
        ${n.image ? _`<img src=${n.image} alt="" aria-hidden="true" />` : _`<span aria-hidden="true">${n.text}</span>`}
      </div>
    `;
	}
	getAuthorizationBadge(t, n) {
		let r = t.agent[0];
		if (r) {
			let t = l(e(r));
			return {
				kind: "agent",
				image: t,
				text: t ? "" : this.getInitials(n, 2)
			};
		}
		if (t.agentGroup[0]) return {
			kind: "agentGroup",
			text: this.getInitials(n, 1)
		};
		let i = t.agentClass[0];
		if (i) {
			let t = l(e(i));
			return {
				kind: "agentClass",
				image: t,
				text: t ? "" : this.getInitials(n, 2)
			};
		}
		return t.origin[0] ? {
			kind: "origin",
			text: "O"
		} : {
			kind: "unknown",
			text: "?"
		};
	}
	getInitials(e, t = 2) {
		return (e.split(/\s+/).filter(Boolean).slice(0, t).map((e) => e[0]).join("") || e.slice(0, t)).toUpperCase();
	}
	renderAuthorizationRole(e, t) {
		return _`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-grants-role access-grants-role--editable ${e === "Owner" ? "access-grants-role--owner" : ""}"
        .value=${e}
        @change=${(e) => this.onAccessGrantRoleChange(t, e)}
      >
        ${this.renderGrantRoleOptions()}
      </solid-ui-combobox>
    `;
	}
	renderGrantRoleOptions() {
		return r.map((e) => _`
      <solid-ui-combobox-option value=${e}>${e === "No Access" ? "Remove" : e}</solid-ui-combobox-option>
    `);
	}
	render() {
		let e = this.getFilteredAccessGrants();
		return _`
      <section aria-labelledby="access-grants-heading">
        <div class="access-grants-header">
          <h2 id="access-grants-heading">Share with</h2>
          <solid-ui-combobox
            class="access-grants-search-input"
            label="Search access grants"
            .srOnlyLabel=${!0}
            .value=${this.searchValue}
            placeholder="Search"
            @input=${this.onSearchInput}
            @change=${this.onSearchSelect}
          >
            ${this.accessGrantViewModels.filter(({ subjects: e }) => e.length > 0).map(({ subjectLabel: e }) => _`
                <solid-ui-combobox-option .value=${e}>
                  ${e}
                </solid-ui-combobox-option>
              `)}
          </solid-ui-combobox>
        </div>
        <div class="access-grants-list">
          <ul>
            ${e.length > 0 ? e.map((e) => this.renderAccessGrant(e)) : _`<li>No access grants</li>`}
          </ul>
        </div>
      </section>
    `;
	}
}, {e: [k, j, T], c: [me, E]} = ce(S, [[
	O,
	1,
	"accessGrantViewModels"
], [
	A,
	1,
	"searchValue"
]], D, 0, void 0, m), S), x = class extends pe {
	constructor() {
		super(me), se(this, "styles", b), E();
	}
}, se(x, ee, void 0), x)();
//#endregion
//#region ~icons/lucide/link
var he = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></g></svg>";
	}
};
customElements.get("icon-lucide-link") || customElements.define("icon-lucide-link", he);
//#endregion
//#region ~icons/lucide/globe
var ge = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20\"/></g></svg>";
	}
};
customElements.get("icon-lucide-globe") || customElements.define("icon-lucide-globe", ge);
//#endregion
//#region src/components/access-control-modal/AccessControlGeneralAccess.styles.css
var _e = h`:host{& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);font-weight:600}& .access-grants-general{flex-direction:column;align-self:stretch;align-items:flex-start;gap:10px;padding:0 10px;display:flex;& solid-ui-combobox,& solid-ui-input{--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0)}& .access-grants-general-header{flex-direction:row;justify-content:space-between;align-self:stretch;align-items:center;gap:15px;display:flex;& .access-grants-copy-link-button-label{font-size:var(--solid-ui-font-size-xs,.75rem);font-weight:500}& .access-grants-copy-link-button icon-lucide-link{aspect-ratio:1;width:12px;height:12px}}& .access-grants-general-share{align-self:stretch;align-items:center;gap:10px;display:flex;& .access-grants-general-share-content{flex-direction:row;flex:1 0 0;align-items:flex-start;gap:10px;display:flex;& .access-grants-general-share-icon{aspect-ratio:1;background:var(--solid-ui-color-violet-50,#f5f3ff);border-radius:50px;justify-content:center;align-items:center;width:30px;height:30px;padding:5px;display:flex}& .access-grants-general-share-icon-inner{aspect-ratio:1;flex-shrink:0;justify-content:center;align-items:center;width:20px;height:20px;padding:1.25px;display:flex;& icon-lucide-globe{aspect-ratio:1;flex-shrink:0;width:17.5px;height:17.5px}}& .access-grants-general-share-text{flex:auto;min-width:0;& .access-grants-general-share-text-title{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-sm,.875rem);font-weight:600}& .access-grants-general-share-text-description{color:var(--solid-ui-color-gray-700,#364153);font-size:var(--solid-ui-font-size-sm,.875rem)}}}}}& .access-role-select--general{width:120px;min-width:120px;font-size:var(--solid-ui-font-size-xs,.75rem);flex:0 0 120px;font-weight:500}& .access-role-select--compact{--solid-ui-input-border-color:transparent;max-width:100%;margin-top:0;display:block}}`, ve, ye, be, M, N, xe, Se, Ce, we, Te, Ee, De, Oe, ke, Ae, je;
function Me(e, t, n) {
	Ne(e, t), t.set(e, n);
}
function Ne(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function Pe(e, t, n) {
	return e.set(Ie(e, t), n), n;
}
function Fe(e, t) {
	return e.get(Ie(e, t));
}
function Ie(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function Le(e, t, n) {
	return (t = ze(t)) in e ? Object.defineProperty(e, t, {
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
				get: Ve(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Ve(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return He(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : ze(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function ze(e) {
	var t = Be(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Be(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ve(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function He(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Ue(e) {
	return e;
}
Ce = [f("solid-ui-access-control-general-access")];
var We;
new (Ae = (be = /*#__PURE__*/ new WeakMap(), M = /*#__PURE__*/ new WeakMap(), N = /*#__PURE__*/ new WeakMap(), je = (we = p({ attribute: !1 }), Ee = p({ attribute: !1 }), Oe = p({ attribute: !1 }), "subjectUri"), ye = class extends m {
	constructor(...e) {
		super(...e), Me(this, be, (xe(this), Te(this, void 0))), Me(this, M, De(this, "No Access")), Me(this, N, ke(this, "No Access"));
	}
	get [je]() {
		return Fe(be, this);
	}
	set subjectUri(e) {
		Pe(be, this, e);
	}
	get authenticatedAccessRoleValue() {
		return Fe(M, this);
	}
	set authenticatedAccessRoleValue(e) {
		Pe(M, this, e);
	}
	get publicAccessRoleValue() {
		return Fe(N, this);
	}
	set publicAccessRoleValue(e) {
		Pe(N, this, e);
	}
	onAuthenticatedRoleChange(e) {
		this.dispatchRoleChange("authenticated-role-changed", e, r);
	}
	onPublicRoleChange(e) {
		this.dispatchRoleChange("public-role-changed", e, i);
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
			c("Failed to copy resource link", e);
		}
	}
	renderAuthenticatedRoleOptions() {
		return r.map((e) => _`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `);
	}
	renderPublicRoleOptions() {
		return i.map((e) => _`
      <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
    `);
	}
	renderAuthenticatedModeSelector() {
		return _`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-role-select--general access-grants-role access-grants-role--editable access-role-select--authenticated"
        .value=${this.authenticatedAccessRoleValue}
        @change=${this.onAuthenticatedRoleChange}
      >
        ${this.renderAuthenticatedRoleOptions()}
      </solid-ui-combobox>
    `;
	}
	renderPublicModeSelector() {
		return _`
      <solid-ui-combobox
        class="access-role-select access-role-select--compact access-role-select--general access-grants-role access-grants-role--editable access-role-select--public"
        .value=${this.publicAccessRoleValue}
        @change=${this.onPublicRoleChange}
      >
        ${this.renderPublicRoleOptions()}
      </solid-ui-combobox>
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
        ${e.variant === "authenticated" ? this.renderAuthenticatedModeSelector() : this.renderPublicModeSelector()}
      </div>
    `;
	}
	render() {
		return _`
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
			title: "Share with Anyone Signed In",
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
}, {e: [Te, De, ke, xe], c: [We, Se]} = Re(ye, [
	[
		we,
		1,
		"subjectUri"
	],
	[
		Ee,
		1,
		"authenticatedAccessRoleValue"
	],
	[
		Oe,
		1,
		"publicAccessRoleValue"
	]
], Ce, 0, void 0, m), ye), ve = class extends Ue {
	constructor() {
		super(We), Le(this, "styles", _e), Se();
	}
}, Le(ve, Ae, void 0), ve)();
//#endregion
//#region src/components/access-control-modal/AccessControlErrors.styles.css
var Ge = h`:host{contain:inline-size;width:100%;display:block;& solid-ui-error-state{contain:inline-size;width:100%;max-width:100%}& .access-control-save-errors{box-sizing:border-box;gap:8px;width:100%;margin:0;padding-left:0;list-style:none;display:grid;& li{min-width:0;color:var(--solid-ui-color-red-600,#be2e48);font-size:var(--solid-ui-font-size-sm,.875rem);grid-template-columns:minmax(0,18rem) minmax(0,1fr);align-items:baseline;gap:6px;line-height:1.4;display:grid}& .access-control-save-error-label{overflow-wrap:anywhere;font-weight:500}& .access-control-save-error-detail{overflow-wrap:anywhere;min-width:0}}@media (width<=600px){& .access-control-save-errors li{grid-template-columns:minmax(0,40%) minmax(0,1fr)}}}`, Ke, qe, P, F, Je, Ye, Xe, Ze, Qe, $e, et, tt, nt;
function rt(e, t, n) {
	it(e, t), t.set(e, n);
}
function it(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function at(e, t, n) {
	return e.set(st(e, t), n), n;
}
function ot(e, t) {
	return e.get(st(e, t));
}
function st(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function ct(e, t, n) {
	return (t = ut(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function lt(e, t, n, r, i, a) {
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
				get: ft(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || ft(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return pt(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : ut(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function ut(e) {
	var t = dt(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function dt(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ft(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function pt(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function mt(e) {
	return e;
}
Xe = [f("solid-ui-access-control-errors")];
var ht;
new (tt = (P = /*#__PURE__*/ new WeakMap(), F = /*#__PURE__*/ new WeakMap(), nt = (Ze = p({ attribute: !1 }), $e = p({ attribute: !1 }), "errors"), qe = class extends m {
	constructor(...e) {
		super(...e), rt(this, P, (Je(this), Qe(this, []))), rt(this, F, et(this, !0));
	}
	get [nt]() {
		return ot(P, this);
	}
	set errors(e) {
		at(P, this, e);
	}
	get successfulChangesRefreshed() {
		return ot(F, this);
	}
	set successfulChangesRefreshed(e) {
		at(F, this, e);
	}
	onClose(e) {
		e.stopPropagation(), this.dispatchEvent(new CustomEvent("close", {
			bubbles: !0,
			composed: !0
		}));
	}
	render() {
		return this.errors.length ? _`
      <solid-ui-error-state
        title="Some access changes could not be saved"
        message=${this.successfulChangesRefreshed ? "Any successful changes are shown above. The list below shows only the changes that failed. Close this dialog and reopen it if you want to try again." : "Some changes may have been saved, but we could not refresh the Shared with list. The list below shows only the changes that failed. Close this dialog and reopen it if you want to try again."}
        @close=${this.onClose}
      >
        <ul class="access-control-save-errors">
          ${this.errors.map((e) => _`
            <li>
              <span class="access-control-save-error-label">${e.label}</span>
              <span class="access-control-save-error-detail">
                ${e.action === "grant" ? `Could not grant ${e.role ?? "access"}` : e.action === "revoke" ? "Could not remove access" : "Could not save access changes"}
              </span>
            </li>
          `)}
        </ul>
      </solid-ui-error-state>
    ` : _``;
	}
}, {e: [Qe, et, Je], c: [ht, Ye]} = lt(qe, [[
	Ze,
	1,
	"errors"
], [
	$e,
	1,
	"successfulChangesRefreshed"
]], Xe, 0, void 0, m), qe), Ke = class extends mt {
	constructor() {
		super(ht), ct(this, "styles", Ge), Ye();
	}
}, ct(Ke, tt, void 0), Ke)();
//#endregion
//#region src/components/access-control-modal/AccessControlModal.styles.css
var gt = h`:host{& .access-control-footer-actions{justify-content:flex-end;align-items:center;gap:15px;width:100%;display:flex;&>solid-ui-button{min-width:132px}}@media (width<=380px){& .access-control-footer-actions{gap:8px;&>solid-ui-button{flex:1 1 0;min-width:0}}}}`;
//#endregion
//#region src/components/access-control-modal/helpers.ts
function _t(e) {
	try {
		let t = new URL(e);
		return (t.protocol === "http:" || t.protocol === "https:") && !!t.hostname;
	} catch {
		return !1;
	}
}
function vt(e) {
	if (!_t(e)) return !1;
	let t = new URL(e);
	return t.pathname === "/" && !t.search && !t.hash && !t.username && !t.password;
}
function yt(e) {
	let t = e.trim();
	if (t && !_t(t)) try {
		let e = new URL(`https://${t}`), n = e.protocol === "http:" || e.protocol === "https:", r = e.pathname === "/" && !e.search && !e.hash, i = e.hostname.includes(".") || e.hostname.includes(":");
		return n && r && i && !e.username && !e.password ? e.origin : void 0;
	} catch {
		return;
	}
}
function bt(e, t) {
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = t(r);
		e && !n.has(e) && n.set(e, r);
	}
	return [...n.values()];
}
function xt(e) {
	return bt(e, (e) => e.value);
}
//#endregion
//#region src/components/access-control-modal/accessGrantDrafts.ts
function St(e) {
	return {
		...e,
		agentClass: e.agentClass.filter((e) => e !== t.iri && e !== o.iri)
	};
}
function Ct(e) {
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
function wt(e) {
	return Ct(e).map((e) => `${e.type}:${e.iri}`).sort().join("|");
}
function Tt(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = wt(St(e)), r = t.get(n) ?? 0;
		return t.set(n, r + 1), r === 0 ? n : `${n}#${r}`;
	});
}
function Et(t) {
	let n = [
		...t.agent,
		...t.agentGroup,
		...t.agentClass,
		...t.origin
	];
	return n.length ? n.map((t) => s(e(t))).join(", ") : "Unknown access holder";
}
function Dt(e) {
	return a.acl.roleFromModes(e.mode);
}
function Ot(e) {
	let t = St(e);
	return {
		id: wt(t),
		authorization: t,
		role: Dt(t),
		initialRole: Dt(e),
		subjectLabel: Et(t),
		subjects: Ct(t)
	};
}
function kt(e) {
	let t = Tt(e);
	return e.map((e, n) => ({
		...Ot(e),
		id: t[n]
	}));
}
function At(e) {
	return [...e].sort((t, n) => {
		let r = t.role === "Owner", i = n.role === "Owner";
		return r && !i ? -1 : !r && i ? 1 : e.indexOf(t) - e.indexOf(n);
	});
}
function jt(e) {
	return At(e).filter(({ role: e, initialRole: t, subjects: n }) => e !== t && n.length > 0).map(({ authorization: e, subjects: t, role: n }) => ({
		authorization: e,
		subjects: t,
		role: n
	}));
}
function Mt(e) {
	let n = e.find((e) => e.agentClass.includes(t.iri));
	return n ? Dt(n) : "No Access";
}
function Nt(e) {
	let t = e.find((e) => e.agentClass.includes(o.iri));
	return t ? a.acl.publicRoleFromModes(t.mode) : "No Access";
}
function Pt(n) {
	return n.iri === t.iri ? "Authenticated users" : n.iri === o.iri ? "Public" : s(e(n.iri)).trim() || n.iri;
}
//#endregion
//#region ~icons/lucide/book-user
var Ft = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M15 13a3 3 0 1 0-6 0\"/><path d=\"M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20\"/><circle cx=\"12\" cy=\"8\" r=\"2\"/></g></svg>";
	}
};
customElements.get("icon-lucide-book-user") || customElements.define("icon-lucide-book-user", Ft);
//#endregion
//#region ~icons/lucide/user-round
var It = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"8\" r=\"5\"/><path d=\"M20 21a8 8 0 0 0-16 0\"/></g></svg>";
	}
};
customElements.get("icon-lucide-user-round") || customElements.define("icon-lucide-user-round", It);
//#endregion
//#region ~icons/lucide/users
var Lt = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/></g></svg>";
	}
};
customElements.get("icon-lucide-users") || customElements.define("icon-lucide-users", Lt);
//#endregion
//#region src/components/access-control-modal/AccessControlAddAccess.styles.css
var Rt = h`:host{& .access-grants-form{font-size:var(--solid-ui-font-size-sm,.875rem);--access-role-select-width:129px;flex-direction:column;align-self:stretch;align-items:flex-start;gap:10px;padding:10px;display:flex;& p{color:var(--solid-ui-color-gray-600,#4a5565);line-height:1.5}& .access-grants-form-main{align-self:stretch;align-items:flex-start;gap:10px;display:flex;& .access-grants-input{border:1px solid var(--solid-ui-color-slate-200,#e2e8f0);background:var(--solid-ui-color-white,#fff);border-radius:5px;flex-direction:column;flex:auto;align-items:flex-start;gap:12px;min-width:0;padding:10px 15px;display:flex;& solid-ui-combobox{--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0);width:100%}& .access-principal-error{color:var(--solid-ui-color-red-700,#b42318);font-size:var(--solid-ui-font-size-xs,.75rem);margin:0;line-height:1.4}}}& .access-grants-pending{flex-wrap:wrap;align-items:center;gap:8px;min-height:42px;display:flex}& .access-grants-pending-item{border:1px solid var(--solid-ui-color-gray-300,#d1d5dc);background:var(--solid-ui-color-gray-50,#f9fafb);max-width:100%;color:var(--solid-ui-color-gray-700,#374151);border-radius:5px;align-items:center;gap:6px;padding:5px 10px;display:flex}& .access-grants-pending-item-label{text-overflow:ellipsis;white-space:nowrap;min-width:0;color:var(--solid-ui-color-gray-500,#6a7282);font-size:var(--solid-ui-font-size-xs,.75rem);line-height:1;overflow:hidden}& .access-grants-pending-item-remove{color:var(--solid-ui-color-gray-300,#d1d5dc);cursor:pointer;background:0 0;border:none;border-radius:999px;justify-content:center;align-items:center;padding:0;display:inline-flex;& icon-lucide-circle-x{width:14px;height:14px}}}& .access-grants-directory-entry{align-items:center;gap:8px;line-height:1;display:inline-flex}& .access-role-select{max-width:100%;width:var(--access-role-select-width);--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0);flex:none;margin-top:25px;display:block}& .access-role-select--top{margin-top:0}}`, zt, Bt, Vt, Ht, I, L, R, Ut, Wt, Gt, Kt, qt, Jt, Yt, Xt, Zt, Qt, $t, en, tn, nn, rn;
function z(e, t, n) {
	an(e, t), t.set(e, n);
}
function an(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function B(e, t, n) {
	return e.set(on(e, t), n), n;
}
function V(e, t) {
	return e.get(on(e, t));
}
function on(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function sn(e, t, n) {
	return (t = ln(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function cn(e, t, n, r, i, a) {
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
				get: dn(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || dn(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return fn(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : ln(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function ln(e) {
	var t = un(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function un(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function dn(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function fn(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function pn(e) {
	return e;
}
function mn(e) {
	return _`
    <span class="access-grants-directory-entry">
      ${hn(e)}
      <span>${e.label}</span>
    </span>
  `;
}
function hn(e) {
	return e.sources.includes("contacts") || e.sources.includes("groups") ? _`<icon-lucide-book-user style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-book-user>` : e.sources.includes("friends") ? _`<icon-lucide-users style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-users>` : e.sources.includes("catalog") ? _`<icon-lucide-user-round style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-user-round>` : d;
}
Gt = [f("solid-ui-access-control-add-access")];
var gn;
new (nn = (Vt = /*#__PURE__*/ new WeakMap(), Ht = /*#__PURE__*/ new WeakMap(), I = /*#__PURE__*/ new WeakMap(), L = /*#__PURE__*/ new WeakMap(), R = /*#__PURE__*/ new WeakMap(), rn = (Kt = p({ attribute: !1 }), Jt = p({ attribute: !1 }), Xt = p({ attribute: !1 }), Qt = p({ attribute: !1 }), en = p({ attribute: !1 }), "principalInputValue"), Bt = class extends m {
	constructor(...e) {
		super(...e), z(this, Vt, (Ut(this), qt(this, ""))), z(this, Ht, Yt(this, "Viewer")), z(this, I, Zt(this, [])), z(this, L, $t(this, "")), z(this, R, tn(this, null));
	}
	get [rn]() {
		return V(Vt, this);
	}
	set principalInputValue(e) {
		B(Vt, this, e);
	}
	get addAccessRoleValue() {
		return V(Ht, this);
	}
	set addAccessRoleValue(e) {
		B(Ht, this, e);
	}
	get pendingAccessGrants() {
		return V(I, this);
	}
	set pendingAccessGrants(e) {
		B(I, this, e);
	}
	get inputError() {
		return V(L, this);
	}
	set inputError(e) {
		B(L, this, e);
	}
	get asyncOptionsProvider() {
		return V(R, this);
	}
	set asyncOptionsProvider(e) {
		B(R, this, e);
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
				label: t.label
			},
			bubbles: !0,
			composed: !0
		}));
	}
	onRoleChange(e) {
		let t = e.detail.option.value;
		typeof t == "string" && r.includes(t) && this.dispatchEvent(new CustomEvent("role-changed", {
			detail: { role: t },
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
		return _`
      <section class="access-grants-form" aria-label="Add access">
        <p>Add person, group or software agent URL.</p>
        <div class="access-grants-form-main">
          <div class="access-grants-input">
            <solid-ui-combobox
              class="access-principal-combobox"
              label="Add person, group or software agent URL."
              .srOnlyLabel=${!0}
              .value=${this.principalInputValue}
              placeholder="Paste a link or enter a name"
              .asyncOptionsProvider=${this.asyncOptionsProvider}
              @input=${this.onPrincipalInput}
              @change=${this.onPrincipalSelect}
            ></solid-ui-combobox>
            ${this.inputError ? _`<p class="access-principal-error" role="alert">${this.inputError}</p>` : d}
            ${this.renderPendingAccessGrants()}
          </div>
          <solid-ui-combobox
            class="access-role-select access-role-select--top"
            .value=${this.addAccessRoleValue}
            @change=${this.onRoleChange}
          >
            ${r.filter((e) => e !== "No Access").map((e) => _`
                <solid-ui-combobox-option value=${e}>${e}</solid-ui-combobox-option>
              `)}
          </solid-ui-combobox>
        </div>
      </section>
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
              @click=${() => this.onPendingGrantRemove(t)}
            >
              <span class="sr-only">Remove ${e.label}</span>
              <icon-lucide-circle-x slot="icon"></icon-lucide-circle-x>
            </solid-ui-button>
          </div>
        `)}
      </div>
    ` : d;
	}
}, {e: [qt, Yt, Zt, $t, tn, Ut], c: [gn, Wt]} = cn(Bt, [
	[
		Kt,
		1,
		"principalInputValue"
	],
	[
		Jt,
		1,
		"addAccessRoleValue"
	],
	[
		Xt,
		1,
		"pendingAccessGrants"
	],
	[
		Qt,
		1,
		"inputError"
	],
	[
		en,
		1,
		"asyncOptionsProvider"
	]
], Gt, 0, void 0, m), Bt), zt = class extends pn {
	constructor() {
		super(gn), sn(this, "styles", Rt), Wt();
	}
}, sn(zt, nn, void 0), zt)();
//#endregion
//#region src/components/access-control-modal/accessTargetResolver.ts
async function _n(e) {
	let t = yt(e);
	return t ? {
		kind: "origin",
		subjectValue: t
	} : await a.acl.classifyAccessControlSubject(e);
}
async function vn(t, n) {
	if (!t || t.kind === "origin") return t?.subjectValue;
	let r = e(t.subjectValue);
	await a.store.fetcher.load(r.doc());
	let i = n?.trim() || s(r).trim();
	if (i && i !== t.subjectValue) return i;
}
async function yn(e, t) {
	let n = await _n(e);
	if (!n) return;
	let r = await vn(n, t);
	if (r) return {
		subjectType: n.kind,
		subjectValue: n.subjectValue,
		label: r
	};
}
async function bn(e) {
	let t = await yn(e);
	return t ? {
		label: t.label,
		value: e
	} : void 0;
}
function xn(e, t) {
	return {
		label: t,
		value: e.uri,
		template: mn({
			...e,
			label: t
		})
	};
}
async function Sn(e) {
	let t = yt(e);
	if (t) return [{
		label: `Use origin ${t}`,
		value: t
	}];
	if (!_t(e)) return [];
	if (vt(e)) return [{
		label: `Use origin ${new URL(e).origin}`,
		value: new URL(e).origin
	}];
	let n = await bn(e);
	return xt(n ? [n] : []);
}
function Cn(e) {
	return e.length ? e : [{
		label: "Type at least 2 characters to search",
		value: "",
		selectable: !1
	}];
}
var wn = v(async (e) => {
	let t = e.trim(), r = await Sn(t);
	if (t.length < 2) return Cn(r);
	let i = [];
	try {
		i = await a.directory.search({
			query: t,
			sources: n
		});
	} catch (e) {
		if (!r.length) throw e;
	}
	let o = (await Promise.all(i.map(async (e) => {
		try {
			let t = await yn(e.uri, e.label);
			return t ? {
				entry: e,
				label: t.label
			} : void 0;
		} catch {
			return;
		}
	}))).filter((e) => e !== void 0).map(({ entry: e, label: t }) => xn(e, t));
	return bt([...r, ...o], (e) => typeof e.value == "string" ? e.value : void 0);
});
//#endregion
//#region src/components/access-control-modal/applyAccessChanges.ts
async function Tn(e, t) {
	let n = [];
	for (let { subject: r, label: i, role: s } of t) try {
		let t = s === "No Access" ? await a.acl.planRevoke(e, r) : await a.acl.planGrant(e, r, r.type === "agentClass" && r.iri === o.iri ? a.acl.modesFromPublicRole(s) : a.acl.modesFromRole(s));
		await a.acl.applyPlan(t);
	} catch (e) {
		n.push({
			action: s === "No Access" ? "revoke" : "grant",
			targetUri: r.iri,
			label: i,
			role: s,
			message: e instanceof Error ? e.message : "Unable to apply access change."
		});
	}
	return n;
}
//#endregion
//#region src/components/access-control-modal/buildAccessChanges.ts
function En({ pendingAccessGrants: e, generalAccessChanges: t, changedAccessGrants: n }) {
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
			label: Pt(e)
		})))
	];
}
//#endregion
//#region src/components/access-control-modal/AccessControlModal.ts
var Dn, On, H, U, W, G, K, q, J, Y, X, kn, An, jn, Mn, Nn, Pn, Fn, In, Ln, Rn, zn, Bn, Vn, Hn, Un, Wn, Gn, Kn, qn, Jn, Yn, Xn, Zn, Qn, $n, er, tr, nr, rr;
function Z(e, t, n) {
	ir(e, t), t.set(e, n);
}
function ir(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function Q(e, t, n) {
	return e.set(ar(e, t), n), n;
}
function $(e, t) {
	return e.get(ar(e, t));
}
function ar(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function or(e, t, n) {
	return (t = cr(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function sr(e, t, n, r, i, a) {
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
				get: ur(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || ur(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return dr(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : cr(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function cr(e) {
	var t = lr(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function lr(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ur(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function dr(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function fr(e) {
	return e;
}
function pr(e) {
	return e != null;
}
Nn = [f("solid-ui-access-control-modal")];
var mr;
new (nr = (H = /*#__PURE__*/ new WeakMap(), U = /*#__PURE__*/ new WeakMap(), W = /*#__PURE__*/ new WeakMap(), G = /*#__PURE__*/ new WeakMap(), K = /*#__PURE__*/ new WeakMap(), q = /*#__PURE__*/ new WeakMap(), J = /*#__PURE__*/ new WeakMap(), Y = /*#__PURE__*/ new WeakMap(), X = /*#__PURE__*/ new WeakMap(), kn = /*#__PURE__*/ new WeakMap(), An = /*#__PURE__*/ new WeakMap(), rr = (Pn = p({ attribute: !1 }), In = p({ attribute: !1 }), Rn = g(), Bn = g(), Hn = g(), Wn = g(), Kn = g(), Jn = g(), Xn = g(), Qn = g(), er = g(), "subjectUri"), On = class extends u {
	constructor(...e) {
		super(...e), Z(this, H, (jn(this), Fn(this, void 0))), Z(this, U, Ln(this, void 0)), Z(this, W, zn(this, "")), Z(this, G, Vn(this, "Viewer")), Z(this, K, Un(this, "No Access")), Z(this, q, Gn(this, "No Access")), Z(this, J, qn(this, !1)), Z(this, Y, Yn(this, [])), Z(this, X, Zn(this, [])), Z(this, kn, $n(this, [])), Z(this, An, tr(this, !0)), or(this, "accessGrantLabelRequestVersion", 0);
	}
	get [rr]() {
		return $(H, this);
	}
	set subjectUri(e) {
		Q(H, this, e);
	}
	get accessGrants() {
		return $(U, this);
	}
	set accessGrants(e) {
		Q(U, this, e);
	}
	get principalInputValue() {
		return $(W, this);
	}
	set principalInputValue(e) {
		Q(W, this, e);
	}
	get addAccessRoleValue() {
		return $(G, this);
	}
	set addAccessRoleValue(e) {
		Q(G, this, e);
	}
	get authenticatedAccessRoleValue() {
		return $(K, this);
	}
	set authenticatedAccessRoleValue(e) {
		Q(K, this, e);
	}
	get publicAccessRoleValue() {
		return $(q, this);
	}
	set publicAccessRoleValue(e) {
		Q(q, this, e);
	}
	get submitting() {
		return $(J, this);
	}
	set submitting(e) {
		Q(J, this, e);
	}
	get pendingAccessGrants() {
		return $(Y, this);
	}
	set pendingAccessGrants(e) {
		Q(Y, this, e);
	}
	get accessGrantDrafts() {
		return $(X, this);
	}
	set accessGrantDrafts(e) {
		Q(X, this, e);
	}
	get errors() {
		return $(kn, this);
	}
	set errors(e) {
		Q(kn, this, e);
	}
	get successfulChangesRefreshed() {
		return $(An, this);
	}
	set successfulChangesRefreshed(e) {
		Q(An, this, e);
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
			this.accessGrantDrafts = kt(e), this.authenticatedAccessRoleValue = Mt(e), this.publicAccessRoleValue = Nt(e);
		}
	}
	updated(e) {
		super.updated(e), e.has("accessGrants") && this.refreshAccessGrantLabels().catch((e) => {
			c("Failed to refresh access grant labels", e);
		});
	}
	async refreshAccessGrantLabels() {
		let t = ++this.accessGrantLabelRequestVersion, n = this.accessGrants ?? [];
		if (!n.length) {
			this.accessGrantDrafts = [];
			return;
		}
		let r = await Promise.all(n.map(async (t) => (await Promise.all(t.agentGroup.map(async (t) => {
			try {
				await a.store.fetcher.load(e(t).doc());
			} catch {}
		})), Et(St(t)))));
		if (t === this.accessGrantLabelRequestVersion && this.accessGrants === n) {
			let e = new Map(Tt(n).map((e, t) => [e, r[t]]));
			this.accessGrantDrafts = this.accessGrantDrafts.map((t) => ({
				...t,
				subjectLabel: e.get(t.id) ?? t.subjectLabel
			}));
		}
	}
	getDialogTitle() {
		let t = this.subjectUri ? e(this.subjectUri) : void 0, n = t ? s(t).trim() : "";
		return !n || n === "this resource" ? "Share this resource" : `Share "${n}"`;
	}
	render() {
		let e = this.getDialogTitle();
		return _`
      <solid-ui-dialog title=${e}>
        <form @submit=${this.onSubmit}>
          <solid-ui-dialog-content>
            <solid-ui-access-control-add-access
              .principalInputValue=${this.principalInputValue}
              .addAccessRoleValue=${this.addAccessRoleValue}
              .pendingAccessGrants=${this.pendingAccessGrants}
              .inputError=${this.inputError}
              .asyncOptionsProvider=${wn}
              @target-input=${this.onPrincipalInput}
              @target-selected=${this.onPrincipalSelect}
              @role-changed=${this.onAddAccessRoleInput}
              @pending-grant-removed=${this.onPendingGrantRemoved}
            ></solid-ui-access-control-add-access>
            <solid-ui-access-control-shared-access
              .accessGrantViewModels=${At(this.accessGrantDrafts)}
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
		let e = jt(this.accessGrantDrafts), t = this.getGeneralAccessChanges();
		if ((this.pendingAccessGrants.length || e.length || t.length) && this.subjectUri) {
			this.submitting = !0, this.errors = this.errors.filter((e) => e.action === "input"), this.successfulChangesRefreshed = !0;
			try {
				let n = En({
					pendingAccessGrants: this.pendingAccessGrants,
					generalAccessChanges: t,
					changedAccessGrants: e
				}), r = await Tn(this.subjectUri, n);
				if (r.length) {
					this.errors = [...this.errors, ...r], this.principalInputValue = "", this.pendingAccessGrants = [];
					try {
						this.accessGrants = await a.acl.findAccessGrants(this.subjectUri);
					} catch (e) {
						this.successfulChangesRefreshed = !1, this.errors = [...this.errors, {
							action: "save",
							targetUri: this.subjectUri,
							label: "Shared with list",
							message: e instanceof Error ? e.message : "Unable to refresh the access list."
						}], c("Failed to refresh access grants after save errors", e);
					}
					c("Failed to save some access changes", r);
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
		let e = this.accessGrants ?? [], n = Mt(e), r = Nt(e);
		return [this.authenticatedAccessRoleValue === n ? void 0 : {
			subject: t,
			role: this.authenticatedAccessRoleValue,
			label: "Authenticated users"
		}, this.publicAccessRoleValue === r ? void 0 : {
			subject: o,
			role: this.publicAccessRoleValue,
			label: "Public"
		}].filter(pr);
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
		return !!(this.pendingAccessGrants.length || this.principalInputValue.trim() || jt(this.accessGrantDrafts).length || this.getGeneralAccessChanges().length);
	}
	async commitPrincipalFromInput() {
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
			}), c("Failed to commit pending access grants", t), !1) : (c("Ignored stale access-target validation error", t), !1);
		}
	}
	async queuePendingPrincipal(e, t = this.addAccessRoleValue, n, r) {
		let i = r ?? this.principalInputValue.trim(), a = await this.createPendingAccessGrant(e, t, n);
		if ("error" in a) return this.principalInputValue.trim() === i && this.setInputError(a.error), c("Failed to add access grant:", a.error.message), !1;
		let o = [...this.pendingAccessGrants, a.grant];
		return this.pendingAccessGrants = this.dedupePendingAccessGrants(o), this.principalInputValue.trim() === i && (this.clearInputError(), this.principalInputValue = ""), !0;
	}
	async createPendingAccessGrant(e, t = this.addAccessRoleValue, n) {
		try {
			let r = e.trim(), i = await yn(r, n);
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
		return bt(e, (e) => `${e.subjectType}:${e.subjectValue}`);
	}
}, {e: [Fn, Ln, zn, Vn, Un, Gn, qn, Yn, Zn, $n, tr, jn], c: [mr, Mn]} = sr(On, [
	[
		Pn,
		1,
		"subjectUri"
	],
	[
		In,
		1,
		"accessGrants"
	],
	[
		Rn,
		1,
		"principalInputValue"
	],
	[
		Bn,
		1,
		"addAccessRoleValue"
	],
	[
		Hn,
		1,
		"authenticatedAccessRoleValue"
	],
	[
		Wn,
		1,
		"publicAccessRoleValue"
	],
	[
		Kn,
		1,
		"submitting"
	],
	[
		Jn,
		1,
		"pendingAccessGrants"
	],
	[
		Xn,
		1,
		"accessGrantDrafts"
	],
	[
		Qn,
		1,
		"errors"
	],
	[
		er,
		1,
		"successfulChangesRefreshed"
	]
], Nn, 0, void 0, u), On), Dn = class extends fr {
	constructor() {
		super(mr), or(this, "styles", gt), Mn();
	}
}, or(Dn, nr, void 0), Dn)();
//#endregion
//#region src/components/access-control-modal/index.ts
var hr = mr;
//#endregion
export { mr as n, hr as t };

//# sourceMappingURL=access-control-modal-eOv2-U27.js.map