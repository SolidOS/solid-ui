import e from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../button/index.esm.js";
import { DEFAULT_FILE_EXPLORER_CONTEXT as t, fileExplorerContext as n } from "../../lib/file-explorer/context.esm.js";
import { FILE_EXPLORER_MANAGE_ACCESS_EVENT as r } from "../../lib/file-explorer/events.esm.js";
import "../../_virtual/~icons/lucide/pencil.esm.js";
import { isContainerSubject as i } from "../../utils/podUtils.esm.js";
import "../../_virtual/~icons/lucide/user-round-cog.esm.js";
import a from "./FileExplorerHeaderControls.styles.esm.js";
import "../resource-actions-menu/ResourceActionsMenu.esm.js";
import { consume as o } from "@lit/context";
import { html as s, nothing as c } from "lit";
import { customElement as l, property as u, state as d } from "lit/decorators.js";
// src/components/file-explorer-header/FileExplorerHeaderControls.ts
var f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N;
function P(e, t, n) {
	F(e, t), t.set(e, n);
}
function F(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function I(e, t, n) {
	return e.set(R(e, t), n), n;
}
function L(e, t) {
	return e.get(R(e, t));
}
function R(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function z(e, t, n) {
	return (t = V(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function B(e, t, n, r, i, a) {
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
				get: U(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || U(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return W(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : V(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function V(e) {
	var t = H(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function H(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function U(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function W(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function G(e) {
	return e;
}
x = [l("solid-ui-file-explorer-header-controls")];
var K;
new (M = (m = /*#__PURE__*/ new WeakMap(), h = /*#__PURE__*/ new WeakMap(), g = /*#__PURE__*/ new WeakMap(), _ = /*#__PURE__*/ new WeakMap(), v = /*#__PURE__*/ new WeakMap(), N = (S = o({
	context: n,
	subscribe: !0
}), w = u({ attribute: !1 }), E = u({ type: Boolean }), O = u({ type: Boolean }), A = d(), "mobileMediaQuery"), p = class extends e {
	constructor(...e) {
		super(...e), z(this, N, void y(this)), z(this, "mobileQuery", "(max-width: 600px)"), z(this, "handleMobileMediaChange", (e) => {
			this.isMobile = e.matches;
		}), P(this, m, C(this, t)), P(this, h, T(this, [])), P(this, g, D(this, !1)), P(this, _, k(this, !1)), P(this, v, j(this, typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(max-width: 600px)").matches)), z(this, "handleManageAccess", () => {
			let e = this.fileExplorerContext.subjectUri;
			e && this.dispatchEvent(new CustomEvent(r, {
				bubbles: !0,
				composed: !0,
				detail: { subjectUri: e }
			}));
		});
	}
	get fileExplorerContext() {
		return L(m, this);
	}
	set fileExplorerContext(e) {
		I(m, this, e);
	}
	get menuItems() {
		return L(h, this);
	}
	set menuItems(e) {
		I(h, this, e);
	}
	get canEdit() {
		return L(g, this);
	}
	set canEdit(e) {
		I(g, this, e);
	}
	get canManageAccess() {
		return L(_, this);
	}
	set canManageAccess(e) {
		I(_, this, e);
	}
	get isMobile() {
		return L(v, this);
	}
	set isMobile(e) {
		I(v, this, e);
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
		return this.fileExplorerContext.isDirty ? s`<span class="dirtyIndicator" title="This file has unsaved changes">Unsaved</span>` : c;
	}
	render() {
		let e = i(this.fileExplorerContext.store, this.fileExplorerContext.subjectUri), t = this.fileExplorerContext.canEdit;
		return s`
      <div>
        ${this.renderDirtyIndicator()}
        ${!e && !this.isMobile && this.canManageAccess ? s`
              <solid-ui-button class="file-explorer-header-action-button" variant="ghost" title="Manage Access" @click=${this.handleManageAccess}>
                <icon-lucide-user-round-cog slot="icon"></icon-lucide-user-round-cog>
                <span class="sr-only">Manage access</span>
              </solid-ui-button>
              ${t ? s`
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
                  ` : c}
            ` : c}
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
}, {e: [C, T, D, k, j, y], c: [K, b]} = B(p, [
	[
		S,
		1,
		"fileExplorerContext"
	],
	[
		w,
		1,
		"menuItems"
	],
	[
		E,
		1,
		"canEdit"
	],
	[
		O,
		1,
		"canManageAccess"
	],
	[
		A,
		1,
		"isMobile"
	]
], x, 0, void 0, e), p), f = class extends G {
	constructor() {
		super(K), z(this, "styles", a), b();
	}
}, z(f, M, void 0), f)();
export { K as default };

//# sourceMappingURL=FileExplorerHeaderControls.esm.js.map