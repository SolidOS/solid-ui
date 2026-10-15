import { c as e, g as t, i as n, o as r, p as i, u as a } from "./components-Bdqizu8x.js";
import "./x-BRRkraZN.js";
import "./button-lol95DqR.js";
//#region ~icons/lucide/triangle-alert
var o = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01\"/></svg>";
	}
};
customElements.get("icon-lucide-triangle-alert") || customElements.define("icon-lucide-triangle-alert", o);
//#endregion
//#region src/components/error-state/ErrorState.styles.css
var s = i`:host{color:var(--solid-ui-color-gray-800,#334155);display:block}section{box-sizing:border-box;border:1px solid var(--solid-ui-color-pink-200,#f0d8dc);background:var(--solid-ui-color-pink-50,#fff7f8);border-radius:10px;align-items:flex-start;gap:12px;width:100%;padding:16px 18px;display:flex;position:relative;box-shadow:0 1px 2px #0f172a14}.close-button{--solid-ui-font-size-2xl:var(--solid-ui-font-size-md,1rem);color:var(--solid-ui-color-gray-500);position:absolute;top:10px;right:10px}.icon{height:28px;color:var(--solid-ui-color-red-500,#fb2c36);background:var(--solid-ui-color-pink-100,#ffe7eb);border-radius:7px;flex:0 0 28px;place-items:center;display:grid}icon-lucide-triangle-alert{width:16px;height:16px}.content{flex:1;min-width:0;max-width:100%;padding-right:28px}h2{color:var(--solid-ui-color-red-700,#b00020);font-size:var(--solid-ui-font-size-lg,1.125rem);margin:1px 0 4px;font-weight:600;line-height:1.3}p{width:100%;max-width:70ch;color:var(--solid-ui-color-gray-600,#64748b);font-size:var(--solid-ui-font-size-sm,.875rem);overflow-wrap:anywhere;margin:0 0 8px;line-height:1.5}slot:not(:empty){margin-top:8px;display:block}::slotted(*){max-width:100%;color:var(--solid-ui-error-state-slot-color,var(--solid-ui-color-gray-600,#64748b));font-size:var(--solid-ui-error-state-slot-font-size,var(--solid-ui-font-size-xs,.75rem));line-height:1.5}`, c, l, u, d, f, p, m, h, g, _, v, y, b;
function x(e, t, n) {
	S(e, t), t.set(e, n);
}
function S(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function C(e, t, n) {
	return e.set(T(e, t), n), n;
}
function w(e, t) {
	return e.get(T(e, t));
}
function T(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function E(e, t, n) {
	return (t = O(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function D(e, t, n, r, i, a) {
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
				get: A(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || A(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
					var k, j;
					O.static = u, O.private = d, d ? i === 2 ? k = function(e) {
						return h(e), b.value;
					} : (i < 4 && (k = o(b, "get", h)), i !== 3 && (j = o(b, "set", h))) : (k = function(e) {
						return e[r];
					}, (i < 2 || i === 4) && (j = function(e, t) {
						e[r] = t;
					}));
					var M = O.access = { has: d ? m.bind() : function(e) {
						return r in e;
					} };
					if (k && (M.get = k), j && (M.set = j), C = T.call(E, p ? {
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
			return j(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : O(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function O(e) {
	var t = k(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function k(e, t) {
	if (typeof e != "object" || !e) return e;
	var n;
	if (typeof Symbol < "u" && (n = e[Symbol.toPrimitive]) !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function A(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function j(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function M(e) {
	return e;
}
m = [t("solid-ui-error-state")];
var N;
new (y = (u = /*#__PURE__*/ new WeakMap(), d = /*#__PURE__*/ new WeakMap(), b = (h = n({ type: String }), _ = n({ type: String }), "title"), l = class extends r {
	constructor(...e) {
		super(...e), x(this, u, (f(this), g(this, ""))), x(this, d, v(this, ""));
	}
	get [b]() {
		return w(u, this);
	}
	set title(e) {
		C(u, this, e);
	}
	get message() {
		return w(d, this);
	}
	set message(e) {
		C(d, this, e);
	}
	render() {
		return a`
      <section role="alert">
        <solid-ui-button class="close-button" variant="ghost" @click=${this.onClose}>
          <icon-lucide-x slot="icon" aria-hidden="true"></icon-lucide-x>
          <span class="sr-only">Close</span>
        </solid-ui-button>
        <div class="icon">
          <icon-lucide-triangle-alert aria-hidden="true"></icon-lucide-triangle-alert>
        </div>
        <div class="content">
          ${this.title ? a`<h2>${this.title}</h2>` : e}
          ${this.message ? a`<p>${this.message}</p>` : e}
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
}, {e: [g, v, f], c: [N, p]} = D(l, [[
	h,
	1,
	"title"
], [
	_,
	1,
	"message"
]], m, 0, void 0, r), l), c = class extends M {
	constructor() {
		super(N), E(this, "styles", s), p();
	}
}, E(c, y, void 0), c)();
//#endregion
export { N as t };

//# sourceMappingURL=error-state-DK1x-kNd.js.map