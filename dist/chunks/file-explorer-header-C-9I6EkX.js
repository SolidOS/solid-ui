import { D as e, t } from "./solidLogicSingleton.esm-B3YqaDQ6.js";
import { b as n, c as r, g as i, i as a, o, p as s, r as c, u as l } from "./components-CVuqsI0R.js";
import { n as u, t as d } from "./context-0sxUfxf7.js";
import { t as f } from "./events-CXQHDCs2.js";
import { t as p } from "./query-DjAOg-tk.js";
import { n as m, r as h } from "./ResourceActionsMenu-DfRCVUSy.js";
import { u as g } from "./style-F5sQg8HH.js";
import { S as _ } from "./widgets-C3bLyBKj.js";
import "./button-SRkhCxlX.js";
import { t as v } from "./access-control-modal-Ff3g2jvh.js";
import { t as y } from "./dialogs-gEIIeLi6.js";
// ~icons/lucide/share-2
var b = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"18\" cy=\"5\" r=\"3\"/><circle cx=\"6\" cy=\"12\" r=\"3\"/><circle cx=\"18\" cy=\"19\" r=\"3\"/><path d=\"m8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98\"/></g></svg>";
	}
};
customElements.get("icon-lucide-share-2") || customElements.define("icon-lucide-share-2", b);
// src/components/file-explorer-header/FileExplorerHeader.styles.css
var x = s`:host{& header{box-sizing:border-box;text-align:right;border-bottom:1px solid var(--solid-ui-color-gray-200,#cbd5e1);flex-wrap:nowrap;justify-content:space-between;align-items:center;gap:6px;width:100%;padding:10px;display:flex}}`, S = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"16\" r=\"1\"/><rect width=\"18\" height=\"12\" x=\"3\" y=\"10\" rx=\"2\"/><path d=\"M7 10V7a5 5 0 0 1 10 0v3\"/></g></svg>";
	}
};
customElements.get("icon-lucide-lock-keyhole") || customElements.define("icon-lucide-lock-keyhole", S);
// ~icons/lucide/arrow-left
var C = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m12 19l-7-7l7-7m7 7H5\"/></svg>";
	}
};
customElements.get("icon-lucide-arrow-left") || customElements.define("icon-lucide-arrow-left", C);
// src/components/file-explorer-header/FileExplorerHeaderSummary.styles.css
var w = s`:host{& .file-explorer-header-summary{text-align:left;flex-wrap:wrap;flex:auto;justify-content:flex-start;align-items:center;gap:6px;min-width:0;display:flex}& h1{color:var(--solid-ui-color-gray-700,#364153);font-size:var(--solid-ui-font-size-xl,1.25rem);align-items:center;gap:8px;margin:0;font-weight:500;display:flex}& .resource-info{flex-direction:column;min-width:0;display:flex}& .container-info{flex-direction:row;gap:10px;min-width:0;display:flex}& .pane-icon{aspect-ratio:1;justify-content:center;align-items:center;width:40px;height:40px;padding:7.5px 7px 6.5px;display:flex}& .pane-icon img{object-fit:contain;width:100%;height:100%;display:block}& p{color:var(--solid-ui-gray-500,#6a7282);font-size:var(--solid-ui-font-size-xs,.75rem);align-items:center;gap:5px;font-weight:500;display:flex}& .public{color:var(--blue-400,#51a2ff);background:var(--blue-50,#eff6ff);border-radius:5px;justify-content:center;align-items:center;gap:3px;padding:2px 5px;display:flex}& icon-lucide-globe{stroke-width:1.021px;stroke:var(--blue-400,#51a2ff)}& .private{color:var(--yellow-600,#d08700);background:var(--yellow-100,#fef9c2);border-radius:5px;justify-content:center;align-items:center;gap:3px;padding:2px 5px;display:flex}& icon-lucide-lock-keyhole{stroke-width:1.021px;stroke:var(--yellow-600,#d08700)}& icon-lucide-globe,& icon-lucide-lock-keyhole{width:.875rem;height:.875rem}& .resource-date{font-size:inherit}& icon-lucide-arrow-left{width:1.125rem;height:1.125rem}@media (width<=600px){& .file-explorer-header-summary{gap:7px}& h1{font-size:14px}& .pane-icon{aspect-ratio:1;flex-shrink:0;width:18.2px;height:18.2px;padding:0}& p{font-size:14px}& .resource-date{font-size:10px}& .public,& .private{font-size:9px}& icon-lucide-arrow-left{aspect-ratio:5/6;flex-shrink:0;width:15px;height:18px}}}`, T, E, D, O, k, A, j, M, N, ee, te, ne, re, ie, ae, oe, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve;
function P(e, t, n) {
	ye(e, t), t.set(e, n);
}
function ye(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function F(e, t, n) {
	return e.set(be(e, t), n), n;
}
function I(e, t) {
	return e.get(be(e, t));
}
function be(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function L(e, t, n) {
	return (t = Se(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function xe(e, t, n, r, i, a) {
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
				get: we(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || we(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return Te(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : Se(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function Se(e) {
	var t = Ce(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Ce(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function we(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function Te(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Ee(e) {
	return e;
}
ne = [i("solid-ui-file-explorer-header-summary")];
var De;
new (_e = (D = /*#__PURE__*/ new WeakMap(), O = /*#__PURE__*/ new WeakMap(), k = /*#__PURE__*/ new WeakMap(), A = /*#__PURE__*/ new WeakMap(), j = /*#__PURE__*/ new WeakMap(), M = /*#__PURE__*/ new WeakMap(), N = /*#__PURE__*/ new WeakMap(), ve = (re = n({
	context: u,
	subscribe: !0
}), ae = a({ attribute: !1 }), se = a({ attribute: !1 }), le = a({ type: Boolean }), de = a({ attribute: !1 }), pe = c(), he = p("h1"), "_draggableSubjectUri"), E = class extends o {
	constructor(...e) {
		super(...e), L(this, ve, void ee(this)), L(this, "_paneIconGeneration", 0), P(this, D, ie(this, d)), P(this, O, oe(this)), P(this, k, ce(this)), P(this, A, ue(this, !0)), P(this, j, fe(this, {
			modified: void 0,
			isPublic: !1
		})), P(this, M, me(this, void 0)), P(this, N, ge(this, null));
	}
	get fileExplorerContext() {
		return I(D, this);
	}
	set fileExplorerContext(e) {
		F(D, this, e);
	}
	get paneIcon() {
		return I(O, this);
	}
	set paneIcon(e) {
		F(O, this, e);
	}
	get onBackClick() {
		return I(k, this);
	}
	set onBackClick(e) {
		F(k, this, e);
	}
	get showBack() {
		return I(A, this);
	}
	set showBack(e) {
		F(A, this, e);
	}
	get responseMetadata() {
		return I(j, this);
	}
	set responseMetadata(e) {
		F(j, this, e);
	}
	get resolvedPaneIcon() {
		return I(M, this);
	}
	set resolvedPaneIcon(e) {
		F(M, this, e);
	}
	get titleHeading() {
		return I(N, this);
	}
	set titleHeading(e) {
		F(N, this, e);
	}
	formatModifiedDate(e) {
		if (!e) return "";
		let t = new Date(e);
		if (Number.isNaN(t.getTime())) return e;
		let n = new Intl.DateTimeFormat("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: !0
		}).formatToParts(t), r = (e) => n.find((t) => t.type === e)?.value ?? "";
		return `${r("day")} ${r("month")}, ${r("year")} at ${r("hour")}:${r("minute")} ${r("dayPeriod").toUpperCase()}`;
	}
	willUpdate(e) {
		if (e.has("paneIcon")) {
			let e = ++this._paneIconGeneration;
			this.resolvedPaneIcon = void 0, this.resolvePaneIcon(this.paneIcon, e);
		}
	}
	updated() {
		this.titleHeading && this.fileExplorerContext?.subjectUri && this._draggableSubjectUri !== this.fileExplorerContext.subjectUri && (_(this.titleHeading, e(this.fileExplorerContext.subjectUri)), this._draggableSubjectUri = this.fileExplorerContext.subjectUri);
	}
	async resolvePaneIcon(e, t) {
		try {
			if (e == null) return;
			let n = await e;
			t === this._paneIconGeneration && (this.resolvedPaneIcon = n ?? void 0);
		} catch (e) {
			t === this._paneIconGeneration && (this.resolvedPaneIcon = void 0, console.warn("file-explorer-header-summary: failed to resolve pane icon", e));
		}
	}
	renderContainerResourceHeader(e, t) {
		let n = m(this.fileExplorerContext?.store, this.fileExplorerContext?.subjectUri) ?? 0;
		return l`
      <div class="container-info">
        <h1>
          <span>${e}</span>
        </h1>
        <p>
        ${n} items
          ${t ? l`<span class="public"><icon-lucide-globe aria-hidden="true"></icon-lucide-globe><span class="sr-only">Public</span></span>` : l`<span class="private"><icon-lucide-lock-keyhole aria-hidden="true"></icon-lucide-lock-keyhole><span class="sr-only">Private</span></span>`}
        </p>
      </div>
    `;
	}
	renderResourceHeader(e, t) {
		let n = this.formatModifiedDate(this.responseMetadata.modified);
		return l`
        <div class="resource-info">
          <h1>
            <span>${e}</span>
          </h1>
          <p><span class="resource-date">${n}</span> ${t ? l`<span class="public"><icon-lucide-globe></icon-lucide-globe> Public</span>` : l`<span class="private"><icon-lucide-lock-keyhole></icon-lucide-lock-keyhole> Private</span>`}</p>
        </div>
    `;
	}
	render() {
		let t = this.fileExplorerContext?.subjectUri ? e(this.fileExplorerContext.subjectUri) : void 0, n = t ? g(t) : "", r = this.responseMetadata.isPublic, i = h(this.fileExplorerContext?.store, this.fileExplorerContext?.subjectUri);
		return l`
      <div class="file-explorer-header-summary">
        ${this.showBack ? l`
            <solid-ui-button
              variant="ghost"
              @click=${this.onBackClick}
              title="Back"
            >
              <icon-lucide-arrow-left></icon-lucide-arrow-left>
              <span class="sr-only">Back</span>
            </solid-ui-button>
          ` : ""}
        <span class="pane-icon">
          ${this.resolvedPaneIcon ? l`<img src=${this.resolvedPaneIcon} alt="" />` : ""}
        </span>
        ${i ? this.renderContainerResourceHeader(n, r) : this.renderResourceHeader(n, r)}
      </div>
      </div>
    `;
	}
}, {e: [ie, oe, ce, ue, fe, me, ge, ee], c: [De, te]} = xe(E, [
	[
		re,
		1,
		"fileExplorerContext"
	],
	[
		ae,
		1,
		"paneIcon"
	],
	[
		se,
		1,
		"onBackClick"
	],
	[
		le,
		1,
		"showBack"
	],
	[
		de,
		1,
		"responseMetadata"
	],
	[
		pe,
		1,
		"resolvedPaneIcon"
	],
	[
		he,
		1,
		"titleHeading"
	]
], ne, 0, void 0, o), E), T = class extends Ee {
	constructor() {
		super(De), L(this, "styles", w), te();
	}
}, L(T, _e, void 0), T)();
// src/components/file-explorer-header/FileExplorerHeaderControls.styles.css
var Oe = s`:host{flex:0 auto;min-width:0;& div{text-align:right;flex:none;justify-content:flex-end;align-items:center;gap:6px;display:flex}& div>*{flex:0 auto}& .file-explorer-header-action-button{width:var(--solid-ui-clickable-area,42px);height:var(--solid-ui-clickable-area,42px);padding:0}& .dirtyIndicator{color:#92400e;white-space:nowrap;background:#fffbeb;border:1px solid #f59e0b;border-radius:999px;align-items:center;padding:4px 8px;font-size:.72rem;font-weight:600;line-height:1;display:inline-flex}& icon-lucide-user-round-cog,& icon-lucide-pencil{width:16px;height:16px}@media (width<=900px){& div{padding-right:3px}}@media (width<=600px){& div{justify-content:flex-start;gap:5px}& .file-explorer-header-action-button{display:none}& icon-lucide-ellipsis-vertical{aspect-ratio:1;flex-shrink:0;width:15.36px;height:15.36px}}}`, ke, Ae, R, z, B, je, Me, Ne, Pe, Fe, Ie, Le, Re, ze, Be, Ve, He, Ue, We, Ge, Ke, qe;
function V(e, t, n) {
	Je(e, t), t.set(e, n);
}
function Je(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function H(e, t, n) {
	return e.set(Ye(e, t), n), n;
}
function U(e, t) {
	return e.get(Ye(e, t));
}
function Ye(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function W(e, t, n) {
	return (t = Ze(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Xe(e, t, n, r, i, a) {
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
				get: $e(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || $e(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return et(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : Ze(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function Ze(e) {
	var t = Qe(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Qe(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function $e(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function et(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function tt(e) {
	return e;
}
Fe = [i("solid-ui-file-explorer-header-controls")];
var nt;
new (Ke = (R = /*#__PURE__*/ new WeakMap(), z = /*#__PURE__*/ new WeakMap(), B = /*#__PURE__*/ new WeakMap(), je = /*#__PURE__*/ new WeakMap(), Me = /*#__PURE__*/ new WeakMap(), qe = (Ie = n({
	context: u,
	subscribe: !0
}), Re = a({ attribute: !1 }), Be = a({ type: Boolean }), He = a({ type: Boolean }), We = c(), "mobileMediaQuery"), Ae = class extends o {
	constructor(...e) {
		super(...e), W(this, qe, void Ne(this)), W(this, "mobileQuery", "(max-width: 600px)"), W(this, "handleMobileMediaChange", (e) => {
			this.isMobile = e.matches;
		}), V(this, R, Le(this, d)), V(this, z, ze(this, [])), V(this, B, Ve(this, !1)), V(this, je, Ue(this, !1)), V(this, Me, Ge(this, typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(max-width: 600px)").matches)), W(this, "handleManageAccess", () => {
			let e = this.fileExplorerContext.subjectUri;
			e && y(v, { props: { subjectUri: e } });
		});
	}
	get fileExplorerContext() {
		return U(R, this);
	}
	set fileExplorerContext(e) {
		H(R, this, e);
	}
	get menuItems() {
		return U(z, this);
	}
	set menuItems(e) {
		H(z, this, e);
	}
	get canEdit() {
		return U(B, this);
	}
	set canEdit(e) {
		H(B, this, e);
	}
	get canManageAccess() {
		return U(je, this);
	}
	set canManageAccess(e) {
		H(je, this, e);
	}
	get isMobile() {
		return U(Me, this);
	}
	set isMobile(e) {
		H(Me, this, e);
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
		return this.fileExplorerContext.isDirty ? l`<span class="dirtyIndicator" title="This file has unsaved changes">Unsaved</span>` : r;
	}
	render() {
		let e = h(this.fileExplorerContext.store, this.fileExplorerContext.subjectUri), t = this.fileExplorerContext.canEdit;
		return l`
      <div>
        ${this.renderDirtyIndicator()}
        ${!e && !this.isMobile && this.canManageAccess ? l`
              <solid-ui-button
                class="file-explorer-header-action-button"
                variant="ghost"
                title="Manage Access"
                @click=${this.handleManageAccess}
              >
                <icon-lucide-user-round-cog slot="icon"></icon-lucide-user-round-cog>
                <span class="sr-only">Manage access</span>
              </solid-ui-button>
              ${t ? l`
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
                  ` : r}
            ` : r}
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
}, {e: [Le, ze, Ve, Ue, Ge, Ne], c: [nt, Pe]} = Xe(Ae, [
	[
		Ie,
		1,
		"fileExplorerContext"
	],
	[
		Re,
		1,
		"menuItems"
	],
	[
		Be,
		1,
		"canEdit"
	],
	[
		He,
		1,
		"canManageAccess"
	],
	[
		We,
		1,
		"isMobile"
	]
], Fe, 0, void 0, o), Ae), ke = class extends tt {
	constructor() {
		super(nt), W(this, "styles", Oe), Pe();
	}
}, W(ke, Ke, void 0), ke)();
// src/components/file-explorer-header/FileExplorerHeader.ts
var rt, it, G, K, q, J, Y, at, ot, st, ct, lt, ut, dt, ft, pt, mt, ht, gt, _t, vt, yt;
function X(e, t, n) {
	bt(e, t), t.set(e, n);
}
function bt(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function Z(e, t, n) {
	return e.set(xt(e, t), n), n;
}
function Q(e, t) {
	return e.get(xt(e, t));
}
function xt(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function $(e, t, n) {
	return (t = Ct(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function St(e, t, n, r, i, a) {
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
				get: Tt(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Tt(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return Et(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : Ct(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function Ct(e) {
	var t = wt(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function wt(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Tt(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function Et(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Dt(e) {
	return e;
}
st = [i("solid-ui-file-explorer-header")];
var Ot;
new (vt = (G = /*#__PURE__*/ new WeakMap(), K = /*#__PURE__*/ new WeakMap(), q = /*#__PURE__*/ new WeakMap(), J = /*#__PURE__*/ new WeakMap(), Y = /*#__PURE__*/ new WeakMap(), yt = (ct = n({
	context: u,
	subscribe: !0
}), ut = a({ attribute: !1 }), ft = a({ attribute: !1 }), mt = a({ type: Boolean }), gt = c(), "_loadedMetadataForUri"), it = class extends o {
	constructor(...e) {
		super(...e), $(this, yt, void at(this)), $(this, "_metadataGeneration", 0), X(this, G, lt(this, d)), X(this, K, dt(this, [])), X(this, q, pt(this, void 0)), X(this, J, ht(this, !0)), X(this, Y, _t(this, {
			modified: void 0,
			isPublic: !1,
			canEdit: !1,
			canManageAccess: !1,
			aclUri: void 0
		})), $(this, "handleBack", () => {
			this.dispatchEvent(new CustomEvent(f, {
				bubbles: !0,
				composed: !0,
				detail: { subjectUri: this.fileExplorerContext.subjectUri }
			}));
		});
	}
	get fileExplorerContext() {
		return Q(G, this);
	}
	set fileExplorerContext(e) {
		Z(G, this, e);
	}
	get menuItems() {
		return Q(K, this);
	}
	set menuItems(e) {
		Z(K, this, e);
	}
	get paneIcon() {
		return Q(q, this);
	}
	set paneIcon(e) {
		Z(q, this, e);
	}
	get showBack() {
		return Q(J, this);
	}
	set showBack(e) {
		Z(J, this, e);
	}
	get responseMetadata() {
		return Q(Y, this);
	}
	set responseMetadata(e) {
		Z(Y, this, e);
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
	async loadResponseMetadata(n, r) {
		try {
			let i = await t.resource.fetchMetadata(e(n));
			r === this._metadataGeneration && this.fileExplorerContext.subjectUri === n && (this.responseMetadata = {
				modified: i.modified,
				isPublic: i.access.isPublic,
				canEdit: i.access.canEdit,
				canManageAccess: i.access.canManageAccess,
				aclUri: i.aclUri
			});
		} catch (e) {
			r === this._metadataGeneration && this.fileExplorerContext.subjectUri === n && (this.responseMetadata = this.getDefaultResponseMetadata(), console.warn("Failed to load response metadata", e));
		}
	}
	render() {
		return l`
      <header>
        <solid-ui-file-explorer-header-summary
          .paneIcon=${this.paneIcon}
          .showBack=${this.showBack}
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
}, {e: [lt, dt, pt, ht, _t, at], c: [Ot, ot]} = St(it, [
	[
		ct,
		1,
		"fileExplorerContext"
	],
	[
		ut,
		1,
		"menuItems"
	],
	[
		ft,
		1,
		"paneIcon"
	],
	[
		mt,
		1,
		"showBack"
	],
	[
		gt,
		1,
		"responseMetadata"
	]
], st, 0, void 0, o), it), rt = class extends Dt {
	constructor() {
		super(Ot), $(this, "styles", x), ot();
	}
}, $(rt, vt, void 0), rt)();
// src/components/file-explorer-header/index.ts
var kt = Ot;
export { Ot as n, kt as t };

//# sourceMappingURL=file-explorer-header-C-9I6EkX.js.map