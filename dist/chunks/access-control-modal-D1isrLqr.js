import { S as e, i as t } from "./index.esm-DcSx1Io1.js";
import { u as n } from "./style-Dmilq1oC.js";
import { p as r } from "./widgets-qe0GoUXi.js";
import { c as i, g as a, i as o, o as s, p as c, r as l, u } from "./components-E_0B75Q2.js";
import { t as d } from "./query-BYu9q8lA.js";
import "./chevron-down-ujxRg3MD.js";
import "./dialog-DbrYOxpr.js";
import "./button-CrFLSY42.js";
import "./dialog-content-XVfQu7M3.js";
import "./dialog-footer-BtXheU8B.js";
import "./combobox-CJzxwqBK.js";
import "./combobox-option-zinXH5Px.js";
import "./input-CRRs1crh.js";
//#region ~icons/lucide/link
var f = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></g></svg>";
	}
};
customElements.get("icon-lucide-link") || customElements.define("icon-lucide-link", f);
//#endregion
//#region ~icons/lucide/search
var p = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"m21 21l-4.34-4.34\"/><circle cx=\"11\" cy=\"11\" r=\"8\"/></g></svg>";
	}
};
customElements.get("icon-lucide-search") || customElements.define("icon-lucide-search", p);
//#endregion
//#region ~icons/lucide/globe
var m = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a14.5 14.5 0 0 0 0 20a14.5 14.5 0 0 0 0-20M2 12h20\"/></g></svg>";
	}
};
customElements.get("icon-lucide-globe") || customElements.define("icon-lucide-globe", m);
//#endregion
//#region src/components/access-control-modal/AccessControlModal.styles.css
var h = c`:host{& h2{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-md,1rem);font-weight:600}& .access-grants-form{--access-role-select-width:129px;flex-direction:row;align-self:stretch;align-items:flex-start;gap:10px;padding:10px;display:flex;& solid-ui-input{--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0);flex:auto;min-width:0}}& .access-grants-header,& .access-grants-list,& .access-grants-general{align-self:stretch;padding:0 10px}& .access-grants-header{justify-content:space-between;align-items:center;gap:15px;display:flex;& .access-grants-search-input{--solid-ui-input-border-color:transparent;flex:none;width:12ch;min-width:12ch}}& .access-grants-list{align-items:flex-start;gap:20px;display:flex;& ul{border:1px solid var(--solid-ui-color-gray-200,#e5e7eb);border-radius:10px;flex-direction:column;flex:1 0 0;align-items:flex-start;gap:15px;height:195px;padding:15px;display:flex}& li{flex:none;align-items:center;gap:10px;width:100%;display:flex;& .access-grants-image{aspect-ratio:1;width:30px;height:30px;color:var(--solid-ui-color-white,#fff);text-align:center;font-size:var(--solid-ui-font-size-xs,.75rem);border-radius:999px;flex:0 0 30px;justify-content:center;align-items:center;font-weight:500;display:flex;overflow:hidden;& img{object-fit:cover;border-radius:999px;width:100%;height:100%;display:flex}& span{line-height:1}}& .access-grants-image--group{background:var(--solid-ui-color-blue-900,#083575)}& .access-grants-image--agent,& .access-grants-image--agentClass{background:var(--solid-ui-color-lavender-300,#e6dcff)}& .access-grants-image--origin{background:var(--solid-ui-color-gray-200,#e5e7eb)}& .access-grants-image--unknown{background:var(--solid-ui-color-gray-300,#d1d5db)}& h3{min-width:0;color:var(--solid-ui-color-gray-800,#1e2939);font-size:var(--solid-ui-font-size-xs,.75rem);flex:auto;font-weight:600}& span{text-align:right;flex:none;margin-left:auto}& .access-grants-role{font-size:var(--solid-ui-font-size-xs,.75rem);flex:none;margin-left:auto}& .access-grants-role--owner{color:var(--solid-ui-color-gray-400,#99a1af);font-size:var(--solid-ui-font-size-xs,.75rem)}& .access-grants-role--editable{width:fit-content;max-width:100%}}}& .access-grants-general{--access-role-select-width:110px;flex-direction:column;align-items:flex-start;gap:10px;display:flex;& solid-ui-combobox,& solid-ui-input{--solid-ui-input-border-color:var(--solid-ui-color-slate-200,#e2e8f0)}& .access-grants-general-header{flex-direction:row;justify-content:space-between;align-self:stretch;align-items:center;gap:15px;display:flex}& .access-grants-general-share{align-self:stretch;align-items:center;gap:15px;display:flex;& .access-grants-general-share-content{flex-direction:row;flex:1 0 0;align-items:flex-start;gap:10px;display:flex;& .access-grants-general-share-icon{aspect-ratio:1;background:var(--solid-ui-color-violet-50,#f5f3ff);border-radius:50px;justify-content:center;align-items:center;width:30px;height:30px;padding:5px;display:flex}& .access-grants-general-share-icon-inner{aspect-ratio:1;flex-shrink:0;justify-content:center;align-items:center;width:20px;height:20px;padding:1.25px;display:flex;& icon-lucide-globe{aspect-ratio:1;flex-shrink:0;width:17.5px;height:17.5px}}& .access-grants-general-share-text{flex:auto;min-width:0;& .access-grants-general-share-text-title{color:var(--solid-ui-color-gray-900,#101828);font-size:var(--solid-ui-font-size-sm,.875rem);font-weight:600}& .access-grants-general-share-text-description{color:var(--solid-ui-color-gray-700,#364153);font-size:var(--solid-ui-font-size-sm,.875rem)}}}}}& .access-role-select{max-width:100%;width:var(--access-role-select-width);flex:none;margin-top:25px;display:block}& .access-control-footer-actions{justify-content:flex-end;align-items:center;gap:15px;width:100%;display:flex;&>solid-ui-button{min-width:132px}}}`, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, ee, M, N, P, F, I, L, R, z, B, V, H, U, W, G, K, q, J;
function Y(e, t, n) {
	te(e, t), t.set(e, n);
}
function te(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function X(e, t, n) {
	return e.set(Q(e, t), n), n;
}
function Z(e, t) {
	return e.get(Q(e, t));
}
function Q(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function ne(e, t, n) {
	return (t = ie(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function re(e, t, n, r, i, a) {
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
				get: oe(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || oe(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return se(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : ie(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function ie(e) {
	var t = ae(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ae(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function oe(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function se(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function ce(e) {
	return e;
}
var le = [
	{
		modes: ["Control"],
		label: "Owner"
	},
	{
		modes: ["Write"],
		label: "Editor"
	},
	{
		modes: ["Append", "Read"],
		label: "Poster"
	},
	{
		modes: ["Append"],
		label: "Submitter"
	},
	{
		modes: ["Read"],
		label: "Viewer"
	}
];
k = [a("solid-ui-access-control-modal")];
var $;
new (q = (v = /*#__PURE__*/ new WeakMap(), y = /*#__PURE__*/ new WeakMap(), b = /*#__PURE__*/ new WeakMap(), x = /*#__PURE__*/ new WeakMap(), S = /*#__PURE__*/ new WeakMap(), C = /*#__PURE__*/ new WeakMap(), w = /*#__PURE__*/ new WeakMap(), T = /*#__PURE__*/ new WeakMap(), E = /*#__PURE__*/ new WeakMap(), J = (A = o({ attribute: !1 }), ee = o({ attribute: !1 }), N = l(), F = l(), L = l(), z = l(), V = l(), U = l(), G = d("solid-ui-dialog"), "subjectUri"), _ = class extends s {
	constructor(...e) {
		super(...e), Y(this, v, (D(this), j(this, void 0))), Y(this, y, M(this, void 0)), Y(this, b, P(this, "")), Y(this, x, I(this, "Viewer")), Y(this, S, R(this, "")), Y(this, C, B(this, !1)), Y(this, w, H(this, !1)), Y(this, T, W(this, [])), Y(this, E, K(this, null));
	}
	get [J]() {
		return Z(v, this);
	}
	set subjectUri(e) {
		X(v, this, e);
	}
	get accessGrants() {
		return Z(y, this);
	}
	set accessGrants(e) {
		X(y, this, e);
	}
	get principleInputValue() {
		return Z(b, this);
	}
	set principleInputValue(e) {
		X(b, this, e);
	}
	get roleValue() {
		return Z(x, this);
	}
	set roleValue(e) {
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
	get accessGrantRoles() {
		return Z(T, this);
	}
	set accessGrantRoles(e) {
		X(T, this, e);
	}
	get dialog() {
		return Z(E, this);
	}
	set dialog(e) {
		X(E, this, e);
	}
	connectedCallback() {
		super.connectedCallback();
	}
	willUpdate(e) {
		super.willUpdate(e), e.has("accessGrants") && (this.accessGrantRoles = this.accessGrants?.map((e) => this.getAuthorizationRole(e)) ?? []);
	}
	renderAccessGrants() {
		return u`
      <ul>
        ${!this.accessGrants || this.accessGrants.length === 0 ? u`<li>No access grants</li>` : i}
        ${this.accessGrants?.map((e, t) => this.renderAccessGrant(e, t))}
      </ul>
    `;
	}
	renderAccessGrant(e, t) {
		let n = this.getAuthorizationBadge(e), r = this.accessGrantRoles[t] ?? this.getAuthorizationRole(e);
		return u`
      <li>
        ${this.renderAuthorizationBadge(n)}
        <h3>${this.renderAuthorizationSubjects(e)}</h3>
        ${this.renderAuthorizationRole(r, t)}  
      </li>
    `;
	}
	getAuthorizationBadge(t) {
		let n = t.agent[0];
		if (n) {
			let i = r(e(n));
			return {
				kind: "agent",
				image: i,
				text: i ? "" : this.getInitials(this.renderAuthorizationSubjects(t), 2)
			};
		}
		if (t.agentGroup[0]) return {
			kind: "group",
			text: this.getInitials(this.renderAuthorizationSubjects(t), 1)
		};
		let i = t.agentClass[0];
		if (i) {
			let n = r(e(i));
			return {
				kind: "agentClass",
				image: n,
				text: n ? "" : this.getInitials(this.renderAuthorizationSubjects(t), 2)
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
	renderAuthorizationSubjects(t) {
		let r = [
			...t.agent,
			...t.agentGroup,
			...t.agentClass,
			...t.origin
		];
		return r.length ? r.map((t) => n(e(t))).join(", ") : "Unknown access holder";
	}
	getAuthorizationRole(e) {
		let t = new Set(e.mode);
		return le.find((e) => e.modes.every((e) => t.has(e)))?.label ?? "Viewer";
	}
	renderAuthorizationRole(e, t) {
		return e === "Owner" ? u`<span class="access-grants-role access-grants-role--owner">${e}</span>` : u`
      <solid-ui-combobox
        class="access-grants-role access-grants-role--editable"
        .value=${e}
        @input=${(e) => this.onAccessGrantRoleInput(t, e)}
      >
        <solid-ui-combobox-option value="Editor">Editor</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Viewer">Viewer</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Poster">Poster</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Submitter">Submitter</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Remove">Remove</solid-ui-combobox-option>
      </solid-ui-combobox>
    `;
	}
	renderModeSelector() {
		return u`
      <solid-ui-combobox
        class="access-role-select"
        .value=${this.roleValue}
        @input=${this.onRoleInput}
      >
        <solid-ui-combobox-option value="Owner">Owner</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Editor">Editor</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Viewer">Viewer</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Poster">Poster</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Submitter">Submitter</solid-ui-combobox-option>
        <solid-ui-combobox-option value="Remove">Remove</solid-ui-combobox-option>
      </solid-ui-combobox>
    `;
	}
	renderAddAccessForm() {
		return u`
      <div class="access-grants-form">
        <solid-ui-input
          label="Add person, group or software agent URL."
          .value=${this.principleInputValue}
          placeholder="Paste a link or enter names (use commas to add multiple)"
          @input=${this.onPrincipleInput}
        ></solid-ui-input>
        ${this.renderModeSelector()}
      </div>
    `;
	}
	renderAccessGrantsSection() {
		return u`
      <div class="access-grants-header">
        <h2>Share with</h2>
        <solid-ui-input
          id="access-grants-search"
          class="access-grants-search-input"
          label="Search access grants"
          .hideLabel=${!0}
          .value=${this.searchValue}
          placeholder="Search"
          @input=${this.onSearchInput}
        >
          <icon-lucide-search slot="left-icon"></icon-lucide-search>
        </solid-ui-input>
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
          ${this.renderModeSelector()}
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
		return [...le.find((t) => t.label === e)?.modes ?? []];
	}
	parsePrincipleInput() {
		let e = this.principleInputValue.trim();
		if (!e) return;
		let n = e.split(",").map((e) => e.trim()).filter((e) => e);
		if (n.length) return n.map((e) => ({
			subjectType: t.resource.isWebId(e) ? "agent" : "agentGroup",
			subjectValue: e,
			role: this.roleValue
		}));
	}
	getDialogTitle() {
		let t = this.subjectUri ? e(this.subjectUri) : void 0;
		return `Share ${(t ? n(t) : "") || "this resource"}`;
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
                    @click="${() => this.dialog?.close()}"
                  >
                    Cancel
                  </solid-ui-button>
                  <solid-ui-button
                    ?disabled=${!this.principleInputValue || this.submitting}
                    ?loading=${this.submitting}
                    type="submit"
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
		e.preventDefault(), this.failed = !1;
		let n = this.parsePrincipleInput();
		if (n?.length) {
			if (!this.subjectUri) {
				this.failed = !0;
				return;
			}
			this.submitting = !0;
			try {
				for (let e of n) {
					let n = {
						type: e.subjectType,
						iri: e.subjectValue
					}, r = this.roleValue === "Remove" ? await t.acl.planRevoke(this.subjectUri, n) : await t.acl.planGrant(this.subjectUri, n, this.getRoleModes(e.role));
					await t.acl.applyPlan(r);
				}
				this.principleInputValue = "", this.dialog?.close();
			} catch (e) {
				this.failed = !0, console.error("Failed to save access changes", e);
			} finally {
				this.submitting = !1;
			}
		}
	}
	onPrincipleInput(e) {
		let t = e.currentTarget;
		this.principleInputValue = t?.value ?? "";
	}
	onSearchInput(e) {
		let t = e.currentTarget;
		this.searchValue = t?.value ?? "";
	}
	onRoleInput(e) {
		let t = e.currentTarget;
		this.roleValue = t?.value ?? "Viewer";
	}
	onAccessGrantRoleInput(e, t) {
		let n = t.currentTarget?.value;
		n && (this.accessGrantRoles = this.accessGrantRoles.map((t, r) => r === e ? n : t));
	}
	async onCopyLinkClick(e) {
		if (e.preventDefault(), this.subjectUri) try {
			await navigator.clipboard.writeText(this.subjectUri);
		} catch (e) {
			console.error("Failed to copy resource link", e);
		}
	}
}, {e: [j, M, P, I, R, B, H, W, K, D], c: [$, O]} = re(_, [
	[
		A,
		1,
		"subjectUri"
	],
	[
		ee,
		1,
		"accessGrants"
	],
	[
		N,
		1,
		"principleInputValue"
	],
	[
		F,
		1,
		"roleValue"
	],
	[
		L,
		1,
		"searchValue"
	],
	[
		z,
		1,
		"failed"
	],
	[
		V,
		1,
		"submitting"
	],
	[
		U,
		1,
		"accessGrantRoles"
	],
	[
		G,
		1,
		"dialog"
	]
], k, 0, void 0, s), _), g = class extends ce {
	constructor() {
		super($), ne(this, "styles", h), O();
	}
}, ne(g, q, void 0), g)();
//#endregion
//#region src/components/access-control-modal/index.ts
var ue = $;
//#endregion
export { $ as n, ue as t };

//# sourceMappingURL=access-control-modal-D1isrLqr.js.map