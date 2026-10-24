import { customElement as e } from "../../lib/components/decorators.esm.js";
import t from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import { DEFAULT_FILE_EXPLORER_CONTEXT as n, fileExplorerContext as r } from "../../lib/file-explorer/context.esm.js";
import { FILE_EXPLORER_BACK_EVENT as i } from "../../lib/file-explorer/events.esm.js";
import "../../_virtual/~icons/lucide/share-2.esm.js";
import "../../_virtual/~icons/lucide/pencil.esm.js";
import "../../_virtual/~icons/lucide/ellipsis-vertical.esm.js";
import a from "./FileExplorerHeader.styles.esm.js";
import "./FileExplorerHeaderSummary.esm.js";
import "./FileExplorerHeaderControls.esm.js";
import { sym as o } from "rdflib";
import { solidLogicSingleton as s } from "solid-logic";
import { consume as c } from "@lit/context";
import { html as l } from "lit";
import { property as u, state as d } from "lit/decorators.js";
// src/components/file-explorer-header/FileExplorerHeader.ts
var f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A;
function j(e, t, n) {
	M(e, t), t.set(e, n);
}
function M(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function N(e, t, n) {
	return e.set(F(e, t), n), n;
}
function P(e, t) {
	return e.get(F(e, t));
}
function F(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function I(e, t, n) {
	return (t = R(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function L(e, t, n, r, i, a) {
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
				get: B(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || B(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return V(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : R(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function R(e) {
	var t = z(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function z(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function B(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function V(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function H(e) {
	return e;
}
b = [e("solid-ui-file-explorer-header")];
var U;
new (k = (m = /*#__PURE__*/ new WeakMap(), h = /*#__PURE__*/ new WeakMap(), g = /*#__PURE__*/ new WeakMap(), _ = /*#__PURE__*/ new WeakMap(), A = (x = c({
	context: r,
	subscribe: !0
}), C = u({ attribute: !1 }), T = u({ attribute: !1 }), D = d(), "_loadedMetadataForUri"), p = class extends t {
	constructor(...e) {
		super(...e), I(this, A, void v(this)), I(this, "_metadataGeneration", 0), j(this, m, S(this, n)), j(this, h, w(this, [])), j(this, g, E(this, void 0)), j(this, _, O(this, {
			modified: void 0,
			isPublic: !1,
			canEdit: !1,
			canManageAccess: !1,
			aclUri: void 0
		})), I(this, "handleBack", () => {
			this.dispatchEvent(new CustomEvent(i, {
				bubbles: !0,
				composed: !0,
				detail: { subjectUri: this.fileExplorerContext.subjectUri }
			}));
		});
	}
	get fileExplorerContext() {
		return P(m, this);
	}
	set fileExplorerContext(e) {
		N(m, this, e);
	}
	get menuItems() {
		return P(h, this);
	}
	set menuItems(e) {
		N(h, this, e);
	}
	get paneIcon() {
		return P(g, this);
	}
	set paneIcon(e) {
		N(g, this, e);
	}
	get responseMetadata() {
		return P(_, this);
	}
	set responseMetadata(e) {
		N(_, this, e);
	}
	getDefaultResponseMetadata() {
		return {
			modified: void 0,
			isPublic: !1,
			canEdit: !1,
			canManageAccess: !1,
			aclUri: void 0
		};
	}
	willUpdate() {
		let e = this.fileExplorerContext?.subjectUri;
		if (this.fileExplorerContext?.store && e && this._loadedMetadataForUri !== e) {
			this._loadedMetadataForUri = e;
			let t = ++this._metadataGeneration;
			this.responseMetadata = this.getDefaultResponseMetadata(), this.loadResponseMetadata(e, t);
		}
	}
	async loadResponseMetadata(e, t) {
		try {
			let n = await s.resource.fetchMetadata(o(e));
			t === this._metadataGeneration && this.fileExplorerContext.subjectUri === e && (this.responseMetadata = {
				modified: n.modified,
				isPublic: n.access.isPublic,
				canEdit: n.access.canEdit,
				canManageAccess: n.access.canManageAccess,
				aclUri: n.aclUri
			});
		} catch (n) {
			t === this._metadataGeneration && this.fileExplorerContext.subjectUri === e && (this.responseMetadata = this.getDefaultResponseMetadata(), console.warn("Failed to load response metadata", n));
		}
	}
	render() {
		return l`
      <header>
        <solid-ui-file-explorer-header-summary
          .paneIcon=${this.paneIcon}
          .onBackClick=${this.handleBack}
          .responseMetadata=${this.responseMetadata}
        ></solid-ui-file-explorer-header-summary>
        <solid-ui-file-explorer-header-controls
          .menuItems=${this.menuItems}
          .canEdit=${this.responseMetadata.canEdit}
          .canManageAccess=${this.responseMetadata.canManageAccess}
        ></solid-ui-file-explorer-header-controls>
      </header>
    `;
	}
}, {e: [S, w, E, O, v], c: [U, y]} = L(p, [
	[
		x,
		1,
		"fileExplorerContext"
	],
	[
		C,
		1,
		"menuItems"
	],
	[
		T,
		1,
		"paneIcon"
	],
	[
		D,
		1,
		"responseMetadata"
	]
], b, 0, void 0, t), p), f = class extends H {
	constructor() {
		super(U), I(this, "styles", a), y();
	}
}, I(f, k, void 0), f)();
export { U as default };

//# sourceMappingURL=FileExplorerHeader.esm.js.map