import { customElement as e } from "../../lib/components/decorators.esm.js";
import t from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import { fileExplorerContext as n } from "../../lib/file-explorer/context.esm.js";
import { provide as r } from "@lit/context";
import { property as i, state as a } from "lit/decorators.js";
import { html as o } from "lit-html";
// src/components/file-explorer-provider/FileExplorerProvider.ts
var s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D;
function O(e, t, n) {
	return (t = F(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function k(e, t, n) {
	A(e, t), t.set(e, n);
}
function A(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function j(e, t, n) {
	return e.set(N(e, t), n), n;
}
function M(e, t) {
	return e.get(N(e, t));
}
function N(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function P(e, t, n, r, i, a) {
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
				get: L(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || L(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return R(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : F(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function F(e) {
	var t = I(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function I(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function L(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function R(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
u = [e("solid-ui-file-explorer-provider")];
var z, B = /*#__PURE__*/ new WeakMap(), V = /*#__PURE__*/ new WeakMap(), H = /*#__PURE__*/ new WeakMap(), U = /*#__PURE__*/ new WeakMap(), W = /*#__PURE__*/ new WeakMap(), G = /*#__PURE__*/ new WeakMap(), K = /*#__PURE__*/ new WeakMap(), q = /*#__PURE__*/ new WeakMap();
D = (d = i({ attribute: !1 }), p = i({ attribute: !1 }), h = i({ attribute: !1 }), _ = i({ attribute: !1 }), y = i({ attribute: !1 }), x = a(), C = a(), T = r({ context: n }), "context"), s = class extends t {
	constructor(...e) {
		super(...e), k(this, B, (c(this), f(this))), k(this, V, m(this)), k(this, H, g(this)), k(this, U, v(this, [])), k(this, W, b(this)), k(this, G, S(this)), k(this, K, w(this, !1)), k(this, q, E(this)), O(this, "registerEditor", (e) => (this.editor = e, () => {
			this.editor === e && (this.editor = void 0);
		}));
	}
	get [D]() {
		return M(B, this);
	}
	set context(e) {
		j(B, this, e);
	}
	get subjectUri() {
		return M(V, this);
	}
	set subjectUri(e) {
		j(V, this, e);
	}
	get pane() {
		return M(H, this);
	}
	set pane(e) {
		j(H, this, e);
	}
	get relevantPanes() {
		return M(U, this);
	}
	set relevantPanes(e) {
		j(U, this, e);
	}
	get soloPane() {
		return M(W, this);
	}
	set soloPane(e) {
		j(W, this, e);
	}
	get editor() {
		return M(G, this);
	}
	set editor(e) {
		j(G, this, e);
	}
	get isDirty() {
		return M(K, this);
	}
	set isDirty(e) {
		j(K, this, e);
	}
	get value() {
		return M(q, this);
	}
	set value(e) {
		j(q, this, e);
	}
	willUpdate() {
		this.value = {
			store: this.context?.session.store,
			subjectUri: this.subjectUri,
			pane: this.pane,
			isDirty: this.isDirty,
			canEdit: !!this.editor,
			registerEditor: this.registerEditor,
			beginEditing: () => {
				this.editor?.beginEditing();
			},
			setDirty: (e) => {
				this.isDirty = e;
			}
		};
	}
	render() {
		return o`<slot></slot>`;
	}
}, {e: [f, m, g, v, b, S, w, E, c], c: [z, l]} = P(s, [
	[
		d,
		1,
		"context"
	],
	[
		p,
		1,
		"subjectUri"
	],
	[
		h,
		1,
		"pane"
	],
	[
		_,
		1,
		"relevantPanes"
	],
	[
		y,
		1,
		"soloPane"
	],
	[
		x,
		1,
		"editor"
	],
	[
		C,
		1,
		"isDirty"
	],
	[
		T,
		1,
		"value"
	]
], u, 0, void 0, t), l();
export { z as default };

//# sourceMappingURL=FileExplorerProvider.esm.js.map