import { customElement as e } from "../../lib/components/decorators.esm.js";
import t from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../button/index.esm.js";
import "../../_virtual/~icons/lucide/triangle-alert.esm.js";
import "../../_virtual/~icons/lucide/x.esm.js";
import n from "./ErrorState.styles.esm.js";
import { html as r, nothing as i } from "lit";
import { property as a } from "lit/decorators.js";
// src/components/error-state/ErrorState.ts
var o, s, c, l, u, d, f, p, m, h, g, _, v;
function y(e, t, n) {
	b(e, t), t.set(e, n);
}
function b(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function x(e, t, n) {
	return e.set(C(e, t), n), n;
}
function S(e, t) {
	return e.get(C(e, t));
}
function C(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function w(e, t, n) {
	return (t = E(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function T(e, t, n, r, i, a) {
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
				get: O(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || O(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
		}
		for (var C = e, w = _.length - 1; w >= 0; w -= n ? 2 : 1) {
			var T = _[w], E = n ? _[w - 1] : void 0, D = {}, k = {
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
				if (y) (g = c(T.call(E, C, k), "class decorators", "return")) && (C = g);
				else {
					var A, j;
					k.static = u, k.private = d, d ? i === 2 ? A = function(e) {
						return h(e), b.value;
					} : (i < 4 && (A = o(b, "get", h)), i !== 3 && (j = o(b, "set", h))) : (A = function(e) {
						return e[r];
					}, (i < 2 || i === 4) && (j = function(e, t) {
						e[r] = t;
					}));
					var M = k.access = { has: d ? m.bind() : function(e) {
						return r in e;
					} };
					if (A && (M.get = A), j && (M.set = j), C = T.call(E, p ? {
						get: b.get,
						set: b.set
					} : b[S], k), p) {
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
			return k(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : E(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function E(e) {
	var t = D(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function D(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function O(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function k(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function A(e) {
	return e;
}
f = [e("solid-ui-error-state")];
var j;
new (_ = (c = /*#__PURE__*/ new WeakMap(), l = /*#__PURE__*/ new WeakMap(), v = (p = a({ type: String }), h = a({ type: String }), "title"), s = class extends t {
	constructor(...e) {
		super(...e), y(this, c, (u(this), m(this, ""))), y(this, l, g(this, ""));
	}
	get [v]() {
		return S(c, this);
	}
	set title(e) {
		x(c, this, e);
	}
	get message() {
		return S(l, this);
	}
	set message(e) {
		x(l, this, e);
	}
	render() {
		return r`
      <section role="alert">
        <solid-ui-button class="close-button" variant="ghost" @click=${this.onClose}>
          <icon-lucide-x slot="icon" aria-hidden="true"></icon-lucide-x>
          <span class="sr-only">Close</span>
        </solid-ui-button>
        <div class="icon">
          <icon-lucide-triangle-alert aria-hidden="true"></icon-lucide-triangle-alert>
        </div>
        <div class="content">
          ${this.title ? r`<h2>${this.title}</h2>` : i}
          ${this.message ? r`<p>${this.message}</p>` : i}
          <slot></slot>
        </div>
      </section>
    `;
	}
	onClose() {
		this.dispatchEvent(new CustomEvent("close", {
			bubbles: !0,
			composed: !0
		}));
	}
}, {e: [m, g, u], c: [j, d]} = T(s, [[
	p,
	1,
	"title"
], [
	h,
	1,
	"message"
]], f, 0, void 0, t), s), o = class extends A {
	constructor() {
		super(j), w(this, "styles", n), d();
	}
}, w(o, _, void 0), o)();
export { j as default };

//# sourceMappingURL=ErrorState.esm.js.map