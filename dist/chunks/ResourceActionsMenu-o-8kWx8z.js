import { t as e, y as t } from "./solidLogicSingleton.esm-BXyHD7mn.js";
import { c as n, i as r, o as i, p as a, u as o } from "./components-LxiwG5ae.js";
import { t as s } from "./custom-element-BW8Ua4c7.js";
import "./button-Dy1aFjqG.js";
import "./menu-item-CVAZyipz.js";
import "./menu-RumUciM-.js";
// ~icons/lucide/pencil
var c = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497zM15 5l4 4\"/></svg>";
	}
};
customElements.get("icon-lucide-pencil") || customElements.define("icon-lucide-pencil", c);
// ~icons/lucide/ellipsis-vertical
var l = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"12\" cy=\"5\" r=\"1\"/><circle cx=\"12\" cy=\"19\" r=\"1\"/></g></svg>";
	}
};
customElements.get("icon-lucide-ellipsis-vertical") || customElements.define("icon-lucide-ellipsis-vertical", l);
// src/utils/podUtils.ts
function u(e, n) {
	if (!e || !n) return !1;
	let r = e.sym(n), i = e.findTypeURIs(r);
	return !!(i[t.ldp("Container").uri] || i[t.ldp("BasicContainer").uri] || r.uri.endsWith("/"));
}
function d(n, r) {
	if (!n || !r) return 0;
	let i = n.sym(r), a = /* @__PURE__ */ new Set();
	for (let r of n.each(i, t.ldp("contains"))) if (r.termType === "NamedNode") {
		let t = r;
		e.resource.isHiddenFile(t) || a.add(t.uri);
	}
	return a.size;
}
// ~icons/lucide/user-round-cog
var f = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"m14.305 19.53l.923-.382m0-2.296l-.923-.383m2.547-1.241l-.383-.923m.383 6.467l-.383.924m2.679-6.468l.383-.923m-.001 7.391l-.382-.924M2 21a8 8 0 0 1 10.434-7.62m8.338 3.472l.924-.383m-.924 2.679l.924.383\"/><circle cx=\"10\" cy=\"8\" r=\"5\"/><circle cx=\"18\" cy=\"18\" r=\"3\"/></g></svg>";
	}
};
customElements.get("icon-lucide-user-round-cog") || customElements.define("icon-lucide-user-round-cog", f);
// ~icons/lucide/file
var p = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\"/><path d=\"M14 2v5a1 1 0 0 0 1 1h5\"/></g></svg>";
	}
};
customElements.get("icon-lucide-file") || customElements.define("icon-lucide-file", p);
// src/components/resource-actions-menu/ResourceActionsMenu.styles.css
var m = a`:host{& .file-explorer-header-more-button{width:var(--solid-ui-clickable-area,42px);height:var(--solid-ui-clickable-area,42px);padding:0}& .ellipsisIcon{width:16px;height:16px}}`, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, ee, M, N, te, P, F, I, L, R, z, B, V, H, U, W, G, K, q, J, Y;
function X(e, t, n) {
	ne(e, t), t.set(e, n);
}
function ne(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function Z(e, t, n) {
	return e.set(re(e, t), n), n;
}
function Q(e, t) {
	return e.get(re(e, t));
}
function re(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function ie(e, t, n) {
	return (t = oe(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ae(e, t, n, r, i, a) {
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
				get: ce(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || ce(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return le(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : oe(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function oe(e) {
	var t = se(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function se(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ce(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function le(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function ue(e) {
	return e;
}
k = [s("solid-ui-resource-actions-menu")];
var $;
new (J = (_ = /*#__PURE__*/ new WeakMap(), v = /*#__PURE__*/ new WeakMap(), y = /*#__PURE__*/ new WeakMap(), b = /*#__PURE__*/ new WeakMap(), x = /*#__PURE__*/ new WeakMap(), S = /*#__PURE__*/ new WeakMap(), C = /*#__PURE__*/ new WeakMap(), w = /*#__PURE__*/ new WeakMap(), T = /*#__PURE__*/ new WeakMap(), E = /*#__PURE__*/ new WeakMap(), Y = (A = r({ attribute: !1 }), ee = r({ type: String }), N = r({ attribute: !1 }), P = r({ attribute: !1 }), I = r({ type: Boolean }), R = r({ type: Boolean }), B = r({ type: Boolean }), H = r({ type: Boolean }), W = r({
	type: Boolean,
	attribute: "show-access-in-menu"
}), K = r({ attribute: !1 }), "store"), g = class extends i {
	constructor(...e) {
		super(...e), X(this, _, (D(this), j(this))), X(this, v, M(this)), X(this, y, te(this, void 0)), X(this, b, F(this, void 0)), X(this, x, L(this, !1)), X(this, S, z(this, !1)), X(this, C, V(this, !1)), X(this, w, U(this, !1)), X(this, T, G(this, !1)), X(this, E, q(this, []));
	}
	get [Y]() {
		return Q(_, this);
	}
	set store(e) {
		Z(_, this, e);
	}
	get subjectUri() {
		return Q(v, this);
	}
	set subjectUri(e) {
		Z(v, this, e);
	}
	get handleAccessClick() {
		return Q(y, this);
	}
	set handleAccessClick(e) {
		Z(y, this, e);
	}
	get handleEditingClick() {
		return Q(b, this);
	}
	set handleEditingClick(e) {
		Z(b, this, e);
	}
	get paneSupportsEditing() {
		return Q(x, this);
	}
	set paneSupportsEditing(e) {
		Z(x, this, e);
	}
	get canEdit() {
		return Q(S, this);
	}
	set canEdit(e) {
		Z(S, this, e);
	}
	get canManageAccess() {
		return Q(C, this);
	}
	set canManageAccess(e) {
		Z(C, this, e);
	}
	get isMobile() {
		return Q(w, this);
	}
	set isMobile(e) {
		Z(w, this, e);
	}
	get showAccessInMenu() {
		return Q(T, this);
	}
	set showAccessInMenu(e) {
		Z(T, this, e);
	}
	get menuItems() {
		return Q(E, this);
	}
	set menuItems(e) {
		Z(E, this, e);
	}
	render() {
		let e = !u(this.store, this.subjectUri) && this.isMobile && this.paneSupportsEditing && this.canEdit && !!this.handleEditingClick, t = this.canManageAccess && !!this.handleAccessClick && (this.showAccessInMenu || this.isMobile), r = this.menuItems.filter((e) => typeof e.action == "function");
		return o`
      <solid-ui-menu>
        <solid-ui-button slot="trigger" class="file-explorer-header-more-button" variant="ghost" title="More options">
          <icon-lucide-ellipsis-vertical slot="icon" class="ellipsisIcon"></icon-lucide-ellipsis-vertical>
          <span class="sr-only">More options</span>
        </solid-ui-button>
        ${r.map((e) => o`
          <solid-ui-menu-item @solid-ui-select=${(t) => e.action(t)}>
            ${typeof e.icon == "string" ? o`<img slot="left-icon" src=${e.icon} alt="">` : e.icon ?? o`<icon-lucide-file slot="left-icon" aria-hidden="true"></icon-lucide-file>`}
            ${e.label}
          </solid-ui-menu-item>
        `)}
        ${e ? o`
              <solid-ui-menu-item @solid-ui-select=${this.handleEditingClick}>
                <icon-lucide-pencil slot="left-icon"></icon-lucide-pencil>
                Edit
              </solid-ui-menu-item>
            ` : n}
        ${t ? o`
              <solid-ui-menu-item @solid-ui-select=${this.handleAccessClick}>
                <icon-lucide-user-round-cog slot="left-icon"></icon-lucide-user-round-cog>
                Manage Access
              </solid-ui-menu-item>
            ` : n}
      </solid-ui-menu>
    `;
	}
}, {e: [j, M, te, F, L, z, V, U, G, q, D], c: [$, O]} = ae(g, [
	[
		A,
		1,
		"store"
	],
	[
		ee,
		1,
		"subjectUri"
	],
	[
		N,
		1,
		"handleAccessClick"
	],
	[
		P,
		1,
		"handleEditingClick"
	],
	[
		I,
		1,
		"paneSupportsEditing"
	],
	[
		R,
		1,
		"canEdit"
	],
	[
		B,
		1,
		"canManageAccess"
	],
	[
		H,
		1,
		"isMobile"
	],
	[
		W,
		1,
		"showAccessInMenu"
	],
	[
		K,
		1,
		"menuItems"
	]
], k, 0, void 0, i), g), h = class extends ue {
	constructor() {
		super($), ie(this, "styles", m), O();
	}
}, ie(h, J, void 0), h)();
export { d as n, u as r, $ as t };

//# sourceMappingURL=ResourceActionsMenu-o-8kWx8z.js.map