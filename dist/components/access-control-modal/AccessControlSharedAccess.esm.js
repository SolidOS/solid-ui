import { findImage as e } from "../../widgets/buttons.esm.js";
import "../../widgets/index.esm.js";
import { customElement as t } from "../../lib/components/decorators.esm.js";
import n from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../combobox/index.esm.js";
import "../combobox-option/index.esm.js";
import "../../_virtual/~icons/lucide/globe.esm.js";
import r from "./AccessControlSharedAccess.styles.esm.js";
import { sym as i } from "rdflib";
import { ACCESS_ROLES as a } from "solid-logic";
import { html as o } from "lit";
import { property as s, state as c } from "lit/decorators.js";
// src/components/access-control-modal/AccessControlSharedAccess.ts
var l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w;
function T(e, t, n) {
	E(e, t), t.set(e, n);
}
function E(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function D(e, t, n) {
	return e.set(k(e, t), n), n;
}
function O(e, t) {
	return e.get(k(e, t));
}
function k(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function A(e, t, n) {
	return (t = M(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function j(e, t, n, r, i, a) {
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
				get: P(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || P(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return F(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : M(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function M(e) {
	var t = N(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function N(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function P(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function F(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function I(e) {
	return e;
}
g = [t("solid-ui-access-control-shared-access")];
var L;
new (C = (d = /*#__PURE__*/ new WeakMap(), f = /*#__PURE__*/ new WeakMap(), p = /*#__PURE__*/ new WeakMap(), w = (_ = s({ attribute: !1 }), y = s({ type: Boolean }), x = c(), "accessGrantViewModels"), u = class extends n {
	constructor(...e) {
		super(...e), T(this, d, (m(this), v(this, []))), T(this, f, b(this, !1)), T(this, p, S(this, ""));
	}
	get [w]() {
		return O(d, this);
	}
	set accessGrantViewModels(e) {
		D(d, this, e);
	}
	get disabled() {
		return O(f, this);
	}
	set disabled(e) {
		D(f, this, e);
	}
	get searchValue() {
		return O(p, this);
	}
	set searchValue(e) {
		D(p, this, e);
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
		let n = t.detail.option.value, r = typeof n == "string" ? a.find((e) => e === n) : void 0;
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
		return o`
      <li>
        ${this.renderAuthorizationBadge(e.authorization, e.subjectLabel)}
        <h3>${e.subjectLabel}</h3>
        ${this.renderAuthorizationRole(e.role, e.id)}
      </li>
    `;
	}
	renderAuthorizationBadge(e, t) {
		let n = this.getAuthorizationBadge(e, t);
		return o`
      <div class="access-grants-image access-grants-image--${n.kind}">
        ${n.image ? o`<img src=${n.image} alt="" aria-hidden="true" />` : n.kind === "origin" ? o`<icon-lucide-globe aria-hidden="true"></icon-lucide-globe>` : o`<span aria-hidden="true">${n.text}</span>`}
      </div>
    `;
	}
	getAuthorizationBadge(t, n) {
		let r = t.agent[0];
		if (r) {
			let t = e(i(r));
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
		let a = t.agentClass[0];
		if (a) {
			let t = e(i(a));
			return {
				kind: "agentClass",
				image: t,
				text: t ? "" : this.getInitials(n, 2)
			};
		}
		return t.origin[0] ? {
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
		return o`
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
		return a.map((e) => o`
      <solid-ui-combobox-option value=${e}>${e === "No Access" ? "Remove" : e}</solid-ui-combobox-option>
    `);
	}
	render() {
		let e = this.getFilteredAccessGrants();
		return o`
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
            ${this.accessGrantViewModels.filter(({ subjects: e }) => e.length > 0).map(({ subjectLabel: e }) => o`
                <solid-ui-combobox-option .value=${e}>
                  ${e}
                </solid-ui-combobox-option>
              `)}
          </solid-ui-combobox>
        </div>
        <div class="access-grants-list">
          <ul>
            ${e.length > 0 ? e.map((e) => this.renderAccessGrant(e)) : o`<li>No access grants</li>`}
          </ul>
        </div>
      </section>
    `;
	}
}, {e: [v, b, S, m], c: [L, h]} = j(u, [
	[
		_,
		1,
		"accessGrantViewModels"
	],
	[
		y,
		1,
		"disabled"
	],
	[
		x,
		1,
		"searchValue"
	]
], g, 0, void 0, n), u), l = class extends I {
	constructor() {
		super(L), A(this, "styles", r), h();
	}
}, A(l, C, void 0), l)();
export { L as default };

//# sourceMappingURL=AccessControlSharedAccess.esm.js.map