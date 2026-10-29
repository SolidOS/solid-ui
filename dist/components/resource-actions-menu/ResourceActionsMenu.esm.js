import { customElement as e } from "../../lib/components/decorators.esm.js";
import t from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../button/index.esm.js";
import "../menu/index.esm.js";
import "../menu-item/index.esm.js";
import "../../_virtual/~icons/lucide/ellipsis-vertical.esm.js";
import "../../_virtual/~icons/lucide/user-round-cog.esm.js";
import "../../_virtual/~icons/lucide/pencil.esm.js";
import "../../_virtual/~icons/lucide/file.esm.js";
import n from "./ResourceActionsMenu.styles.esm.js";
import { isContainerSubject as r } from "../../utils/podUtils.esm.js";
import { html as i, nothing as a } from "lit";
import { property as o } from "lit/decorators.js";
// src/components/resource-actions-menu/ResourceActionsMenu.ts
var s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, L, R, z, B, V, H, U;
function W(e, t, n) {
	G(e, t), t.set(e, n);
}
function G(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function K(e, t, n) {
	return e.set(J(e, t), n), n;
}
function q(e, t) {
	return e.get(J(e, t));
}
function J(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function Y(e, t, n) {
	return (t = Z(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function X(e, t, n, r, i, a) {
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
				get: Q(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Q(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return te(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : Z(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function Z(e) {
	var t = ee(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ee(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Q(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function te(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function ne(e) {
	return e;
}
x = [e("solid-ui-resource-actions-menu")];
var $;
new (H = (l = /*#__PURE__*/ new WeakMap(), u = /*#__PURE__*/ new WeakMap(), d = /*#__PURE__*/ new WeakMap(), f = /*#__PURE__*/ new WeakMap(), p = /*#__PURE__*/ new WeakMap(), m = /*#__PURE__*/ new WeakMap(), h = /*#__PURE__*/ new WeakMap(), g = /*#__PURE__*/ new WeakMap(), _ = /*#__PURE__*/ new WeakMap(), v = /*#__PURE__*/ new WeakMap(), U = (S = o({ attribute: !1 }), w = o({ type: String }), E = o({ attribute: !1 }), O = o({ attribute: !1 }), A = o({ type: Boolean }), M = o({ type: Boolean }), P = o({ type: Boolean }), I = o({ type: Boolean }), R = o({
	type: Boolean,
	attribute: "show-access-in-menu"
}), B = o({ attribute: !1 }), "store"), c = class extends t {
	constructor(...e) {
		super(...e), W(this, l, (y(this), C(this))), W(this, u, T(this)), W(this, d, D(this, void 0)), W(this, f, k(this, void 0)), W(this, p, j(this, !1)), W(this, m, N(this, !1)), W(this, h, F(this, !1)), W(this, g, L(this, !1)), W(this, _, z(this, !1)), W(this, v, V(this, []));
	}
	get [U]() {
		return q(l, this);
	}
	set store(e) {
		K(l, this, e);
	}
	get subjectUri() {
		return q(u, this);
	}
	set subjectUri(e) {
		K(u, this, e);
	}
	get handleAccessClick() {
		return q(d, this);
	}
	set handleAccessClick(e) {
		K(d, this, e);
	}
	get handleEditingClick() {
		return q(f, this);
	}
	set handleEditingClick(e) {
		K(f, this, e);
	}
	get paneSupportsEditing() {
		return q(p, this);
	}
	set paneSupportsEditing(e) {
		K(p, this, e);
	}
	get canEdit() {
		return q(m, this);
	}
	set canEdit(e) {
		K(m, this, e);
	}
	get canManageAccess() {
		return q(h, this);
	}
	set canManageAccess(e) {
		K(h, this, e);
	}
	get isMobile() {
		return q(g, this);
	}
	set isMobile(e) {
		K(g, this, e);
	}
	get showAccessInMenu() {
		return q(_, this);
	}
	set showAccessInMenu(e) {
		K(_, this, e);
	}
	get menuItems() {
		return q(v, this);
	}
	set menuItems(e) {
		K(v, this, e);
	}
	render() {
		let e = !r(this.store, this.subjectUri) && this.isMobile && this.paneSupportsEditing && this.canEdit && !!this.handleEditingClick, t = this.canManageAccess && !!this.handleAccessClick && (this.showAccessInMenu || this.isMobile), n = this.menuItems.filter((e) => typeof e.action == "function");
		return i`
      <solid-ui-menu>
        <solid-ui-button slot="trigger" class="file-explorer-header-more-button" variant="ghost" title="More options">
          <icon-lucide-ellipsis-vertical slot="icon" class="ellipsisIcon"></icon-lucide-ellipsis-vertical>
          <span class="sr-only">More options</span>
        </solid-ui-button>
        ${n.map((e) => i`
          <solid-ui-menu-item @solid-ui-select=${(t) => e.action(t)}>
            ${typeof e.icon == "string" ? i`<img slot="left-icon" src=${e.icon} alt="">` : e.icon ?? i`<icon-lucide-file slot="left-icon" aria-hidden="true"></icon-lucide-file>`}
            ${e.label}
          </solid-ui-menu-item>
        `)}
        ${e ? i`
              <solid-ui-menu-item @solid-ui-select=${this.handleEditingClick}>
                <icon-lucide-pencil slot="left-icon"></icon-lucide-pencil>
                Edit
              </solid-ui-menu-item>
            ` : a}
        ${t ? i`
              <solid-ui-menu-item @solid-ui-select=${this.handleAccessClick}>
                <icon-lucide-user-round-cog slot="left-icon"></icon-lucide-user-round-cog>
                Manage Access
              </solid-ui-menu-item>
            ` : a}
      </solid-ui-menu>
    `;
	}
}, {e: [C, T, D, k, j, N, F, L, z, V, y], c: [$, b]} = X(c, [
	[
		S,
		1,
		"store"
	],
	[
		w,
		1,
		"subjectUri"
	],
	[
		E,
		1,
		"handleAccessClick"
	],
	[
		O,
		1,
		"handleEditingClick"
	],
	[
		A,
		1,
		"paneSupportsEditing"
	],
	[
		M,
		1,
		"canEdit"
	],
	[
		P,
		1,
		"canManageAccess"
	],
	[
		I,
		1,
		"isMobile"
	],
	[
		R,
		1,
		"showAccessInMenu"
	],
	[
		B,
		1,
		"menuItems"
	]
], x, 0, void 0, t), c), s = class extends ne {
	constructor() {
		super($), Y(this, "styles", n), b();
	}
}, Y(s, H, void 0), s)();
export { $ as default };

//# sourceMappingURL=ResourceActionsMenu.esm.js.map