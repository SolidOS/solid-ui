import { customElement as e } from "../../lib/components/decorators.esm.js";
import t from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import { showDialog as n } from "../../lib/dialogs/helpers.esm.js";
import "../../lib/dialogs/index.esm.js";
import { property as r, state as i } from "lit/decorators.js";
import { consume as a } from "@lit/context";
import { html as o, nothing as s } from "lit";
import "../button/index.esm.js";
import c from "../access-control-modal/index.esm.js";
import "../../_virtual/~icons/lucide/user-round-cog.esm.js";
import "../../_virtual/~icons/lucide/pencil.esm.js";
import l from "./FileExplorerHeaderControls.styles.css.esm.js";
import "../resource-actions-menu/ResourceActionsMenu.esm.js";
import { DEFAULT_FILE_EXPLORER_CONTEXT as u, fileExplorerContext as d } from "../../lib/file-explorer/context.esm.js";
import { isContainerSubject as f } from "../../utils/podUtils.esm.js";
// src/components/file-explorer-header/FileExplorerHeaderControls.ts
var p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N, P;
function F(e, t, n) {
	I(e, t), t.set(e, n);
}
function I(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function L(e, t, n) {
	return e.set(z(e, t), n), n;
}
function R(e, t) {
	return e.get(z(e, t));
}
function z(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function B(e, t, n) {
	return (t = H(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function V(e, t, n, r, i, a) {
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
				get: W(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || W(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return G(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : H(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function H(e) {
	var t = U(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function U(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function W(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function G(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function K(e) {
	return e;
}
S = [e("solid-ui-file-explorer-header-controls")];
var q;
new (N = (h = /*#__PURE__*/ new WeakMap(), g = /*#__PURE__*/ new WeakMap(), _ = /*#__PURE__*/ new WeakMap(), v = /*#__PURE__*/ new WeakMap(), y = /*#__PURE__*/ new WeakMap(), P = (C = a({
	context: d,
	subscribe: !0
}), T = r({ attribute: !1 }), D = r({ type: Boolean }), k = r({ type: Boolean }), j = i(), "mobileMediaQuery"), m = class extends t {
	constructor(...e) {
		super(...e), B(this, P, void b(this)), B(this, "mobileQuery", "(max-width: 600px)"), B(this, "handleMobileMediaChange", (e) => {
			this.isMobile = e.matches;
		}), F(this, h, w(this, u)), F(this, g, E(this, [])), F(this, _, O(this, !1)), F(this, v, A(this, !1)), F(this, y, M(this, typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(max-width: 600px)").matches)), B(this, "handleManageAccess", () => {
			let e = this.fileExplorerContext.subjectUri;
			e && n(c, { props: { subjectUri: e } });
		});
	}
	get fileExplorerContext() {
		return R(h, this);
	}
	set fileExplorerContext(e) {
		L(h, this, e);
	}
	get menuItems() {
		return R(g, this);
	}
	set menuItems(e) {
		L(g, this, e);
	}
	get canEdit() {
		return R(_, this);
	}
	set canEdit(e) {
		L(_, this, e);
	}
	get canManageAccess() {
		return R(v, this);
	}
	set canManageAccess(e) {
		L(v, this, e);
	}
	get isMobile() {
		return R(y, this);
	}
	set isMobile(e) {
		L(y, this, e);
	}
	connectedCallback() {
		super.connectedCallback(), typeof window < "u" && typeof window.matchMedia == "function" && (this.mobileMediaQuery = window.matchMedia(this.mobileQuery), this.isMobile = this.mobileMediaQuery.matches, this.mobileMediaQuery.addEventListener("change", this.handleMobileMediaChange));
	}
	disconnectedCallback() {
		this.mobileMediaQuery?.removeEventListener("change", this.handleMobileMediaChange), this.mobileMediaQuery = void 0, super.disconnectedCallback();
	}
	getEditTooltip() {
		return this.canEdit ? "Edit" : "No Access";
	}
	renderDirtyIndicator() {
		return this.fileExplorerContext.isDirty ? o`<span class="dirtyIndicator" title="This file has unsaved changes">Unsaved</span>` : s;
	}
	render() {
		let e = f(this.fileExplorerContext.store, this.fileExplorerContext.subjectUri), t = this.fileExplorerContext.canEdit;
		return o`
      <div>
        ${this.renderDirtyIndicator()}
        ${!e && !this.isMobile && this.canManageAccess ? o`
              <solid-ui-button
                class="file-explorer-header-action-button"
                variant="ghost"
                title="Manage Access"
                @click=${this.handleManageAccess}
              >
                <icon-lucide-user-round-cog slot="icon"></icon-lucide-user-round-cog>
                <span class="sr-only">Manage access</span>
              </solid-ui-button>
              ${t ? o`
              <solid-ui-button
                class="file-explorer-header-action-button"
                variant="ghost"
                title=${this.getEditTooltip()}
                ?disabled=${!this.canEdit}
                @click=${this.fileExplorerContext.beginEditing}
              >
                <icon-lucide-pencil slot="icon"></icon-lucide-pencil>
                <span class="sr-only">Edit</span>
              </solid-ui-button>
                  ` : s}
            ` : s}
        <solid-ui-resource-actions-menu
          .store=${this.fileExplorerContext.store}
          .handleAccessClick=${this.handleManageAccess}
          .handleEditingClick=${this.fileExplorerContext.beginEditing}
          .paneSupportsEditing=${this.fileExplorerContext.canEdit}
          .canEdit=${this.canEdit}
          .canManageAccess=${this.canManageAccess}
          .subjectUri=${this.fileExplorerContext.subjectUri}
          .menuItems=${this.menuItems}
          .isMobile=${this.isMobile}
        ></solid-ui-resource-actions-menu>
      </div>
    `;
	}
}, {e: [w, E, O, A, M, b], c: [q, x]} = V(m, [
	[
		C,
		1,
		"fileExplorerContext"
	],
	[
		T,
		1,
		"menuItems"
	],
	[
		D,
		1,
		"canEdit"
	],
	[
		k,
		1,
		"canManageAccess"
	],
	[
		j,
		1,
		"isMobile"
	]
], S, 0, void 0, t), m), p = class extends K {
	constructor() {
		super(q), B(this, "styles", l), x();
	}
}, B(p, N, void 0), p)();
export { q as default };

//# sourceMappingURL=FileExplorerHeaderControls.esm.js.map