import { label as e } from "../../utils/label.esm.js";
import "../../utils/index.esm.js";
import { makeDraggable as t } from "../../widgets/dragAndDrop.esm.js";
import "../../widgets/index.esm.js";
import n from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../button/index.esm.js";
import { DEFAULT_FILE_EXPLORER_CONTEXT as r, fileExplorerContext as i } from "../../lib/file-explorer/context.esm.js";
import "../../_virtual/~icons/lucide/folder.esm.js";
import "../../_virtual/~icons/lucide/globe.esm.js";
import "../../_virtual/~icons/lucide/lock-keyhole.esm.js";
import "../../_virtual/~icons/lucide/arrow-left.esm.js";
import a from "./FileExplorerHeaderSummary.styles.esm.js";
import { getContainerItemCount as o, isContainerSubject as s } from "../../utils/podUtils.esm.js";
import { sym as c } from "rdflib";
import { consume as l } from "@lit/context";
import { html as u } from "lit";
import { customElement as d, property as f, query as p, state as m } from "lit/decorators.js";
// src/components/file-explorer-header/FileExplorerHeaderSummary.ts
var h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N, P, F, I, L, R, z;
function B(e, t, n) {
	V(e, t), t.set(e, n);
}
function V(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function H(e, t, n) {
	return e.set(W(e, t), n), n;
}
function U(e, t) {
	return e.get(W(e, t));
}
function W(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function G(e, t, n) {
	return (t = q(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function K(e, t, n, r, i, a) {
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
				get: Y(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Y(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return X(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : q(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function q(e) {
	var t = J(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function J(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Y(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function X(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Z(e) {
	return e;
}
T = [d("solid-ui-file-explorer-header-summary")];
var Q;
new (R = (_ = /*#__PURE__*/ new WeakMap(), v = /*#__PURE__*/ new WeakMap(), y = /*#__PURE__*/ new WeakMap(), b = /*#__PURE__*/ new WeakMap(), x = /*#__PURE__*/ new WeakMap(), S = /*#__PURE__*/ new WeakMap(), z = (E = l({
	context: i,
	subscribe: !0
}), O = f({ attribute: !1 }), A = f({ attribute: !1 }), M = f({ attribute: !1 }), P = m(), I = p("h1"), "_draggableSubjectUri"), g = class extends n {
	constructor(...e) {
		super(...e), G(this, z, void C(this)), G(this, "_paneIconGeneration", 0), B(this, _, D(this, r)), B(this, v, k(this)), B(this, y, j(this)), B(this, b, N(this, {
			modified: void 0,
			isPublic: !1
		})), B(this, x, F(this, void 0)), B(this, S, L(this, null));
	}
	get fileExplorerContext() {
		return U(_, this);
	}
	set fileExplorerContext(e) {
		H(_, this, e);
	}
	get paneIcon() {
		return U(v, this);
	}
	set paneIcon(e) {
		H(v, this, e);
	}
	get onBackClick() {
		return U(y, this);
	}
	set onBackClick(e) {
		H(y, this, e);
	}
	get responseMetadata() {
		return U(b, this);
	}
	set responseMetadata(e) {
		H(b, this, e);
	}
	get resolvedPaneIcon() {
		return U(x, this);
	}
	set resolvedPaneIcon(e) {
		H(x, this, e);
	}
	get titleHeading() {
		return U(S, this);
	}
	set titleHeading(e) {
		H(S, this, e);
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
		this.titleHeading && this.fileExplorerContext?.subjectUri && this._draggableSubjectUri !== this.fileExplorerContext.subjectUri && (t(this.titleHeading, c(this.fileExplorerContext.subjectUri)), this._draggableSubjectUri = this.fileExplorerContext.subjectUri);
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
		let n = o(this.fileExplorerContext?.store, this.fileExplorerContext?.subjectUri) ?? 0;
		return u`
      <div class="container-info">
        <h1>
          <span>${e}</span>
        </h1>
        <p>
        ${n} items
          ${t ? u`<span class="public"><icon-lucide-globe aria-hidden="true"></icon-lucide-globe><span class="sr-only">Public</span></span>` : u`<span class="private"><icon-lucide-lock-keyhole aria-hidden="true"></icon-lucide-lock-keyhole><span class="sr-only">Private</span></span>`}
        </p>
      </div>
    `;
	}
	renderResourceHeader(e, t) {
		let n = this.formatModifiedDate(this.responseMetadata.modified);
		return u`
        <div class="resource-info">
          <h1>
            <span>${e}</span>
          </h1>
          <p><span class="resource-date">${n}</span> ${t ? u`<span class="public"><icon-lucide-globe></icon-lucide-globe> Public</span>` : u`<span class="private"><icon-lucide-lock-keyhole></icon-lucide-lock-keyhole> Private</span>`}</p>
        </div>
    `;
	}
	render() {
		let t = this.fileExplorerContext?.subjectUri ? c(this.fileExplorerContext.subjectUri) : void 0, n = t ? e(t) : "", r = this.responseMetadata.isPublic, i = s(this.fileExplorerContext?.store, this.fileExplorerContext?.subjectUri);
		return u`
      <div class="file-explorer-header-summary">
        <solid-ui-button
          variant="ghost"
          @click=${this.onBackClick}
          title="Back"
        >
          <icon-lucide-arrow-left></icon-lucide-arrow-left>
          <span class="sr-only">Back</span>
        </solid-ui-button>
        <span class="pane-icon">
          ${this.resolvedPaneIcon ? u`<img src=${this.resolvedPaneIcon} alt="" />` : ""}
        </span>
        ${i ? this.renderContainerResourceHeader(n, r) : this.renderResourceHeader(n, r)}
      </div>
      </div>
    `;
	}
}, {e: [D, k, j, N, F, L, C], c: [Q, w]} = K(g, [
	[
		E,
		1,
		"fileExplorerContext"
	],
	[
		O,
		1,
		"paneIcon"
	],
	[
		A,
		1,
		"onBackClick"
	],
	[
		M,
		1,
		"responseMetadata"
	],
	[
		P,
		1,
		"resolvedPaneIcon"
	],
	[
		I,
		1,
		"titleHeading"
	]
], T, 0, void 0, n), g), h = class extends Z {
	constructor() {
		super(Q), G(this, "styles", a), w();
	}
}, G(h, R, void 0), h)();
export { Q as default };

//# sourceMappingURL=FileExplorerHeaderSummary.esm.js.map