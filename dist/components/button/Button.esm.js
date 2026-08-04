import { customElement as e } from "../../lib/components/decorators.esm.js";
import t from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../../_virtual/~icons/svg-spinners/180-ring.esm.js";
import n from "./Button.styles.esm.js";
import { html as r, nothing as i } from "lit";
import { property as a } from "lit/decorators.js";
//#region src/components/button/Button.ts
var o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w;
function T(e, t, n) {
	E(e, t), t.set(e, n);
}
function E(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function D(e, t, n) {
	return e.set(k(e, t), n), n;
}
function O(e, t) {
	return e.get(k(e, t));
}
function k(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function A(e, t, n) {
	return (t = M(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function j(e, t, n, r, i, a) {
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
				get: P(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || P(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return F(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : M(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function M(e) {
	var t = N(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function N(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function P(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function F(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function I(e) {
	return e;
}
var L = [
	"primary",
	"secondary",
	"tertiary",
	"outline",
	"ghost"
];
m = [e("solid-ui-button")];
var R;
new (C = (c = /*#__PURE__*/ new WeakMap(), l = /*#__PURE__*/ new WeakMap(), u = /*#__PURE__*/ new WeakMap(), d = /*#__PURE__*/ new WeakMap(), w = (h = a({
	type: String,
	reflect: !0
}), _ = a({
	type: String,
	reflect: !0
}), y = a({ type: Boolean }), x = a({ type: Boolean }), "variant"), s = class extends t {
	constructor(...e) {
		super(...e), T(this, c, (f(this), g(this, "primary"))), T(this, l, v(this, "button")), T(this, u, b(this, void 0)), T(this, d, S(this, !1));
	}
	get [w]() {
		return O(c, this);
	}
	set variant(e) {
		D(c, this, e);
	}
	get type() {
		return O(l, this);
	}
	set type(e) {
		D(l, this, e);
	}
	get disabled() {
		return O(u, this);
	}
	set disabled(e) {
		D(u, this, e);
	}
	get loading() {
		return O(d, this);
	}
	set loading(e) {
		D(d, this, e);
	}
	render() {
		let e = this.disabled ?? this.loading;
		return r`
        <button type=${this.type} ?disabled=${e} @click=${this.onClick}>
            ${this.loading ? r`<icon-svg-spinners-180-ring></icon-svg-spinners-180-ring>` : i}
            <slot name="left-icon"></slot>
            <slot @slotchange=${this.onIconSlotChange} name="icon"></slot>
            <slot></slot>
            <slot name="right-icon"></slot>
        </button>
    `;
	}
	onIconSlotChange(e) {
		let t = e.target;
		this.toggleAttribute("data-has-icon-slot", t.assignedElements().length > 0);
	}
	onClick() {
		switch (this.type) {
			case "submit":
				this.getInternals().form?.requestSubmit();
				break;
			case "reset": this.getInternals().form?.reset();
		}
	}
}, {e: [g, v, b, S, f], c: [R, p]} = j(s, [
	[
		h,
		1,
		"variant"
	],
	[
		_,
		1,
		"type"
	],
	[
		y,
		1,
		"disabled"
	],
	[
		x,
		1,
		"loading"
	]
], m, 0, void 0, t), s), o = class extends I {
	constructor() {
		super(R), A(this, "styles", n), A(this, "formAssociated", !0), p();
	}
}, A(o, C, void 0), o)();
//#endregion
export { L as BUTTON_VARIANTS, R as default };

//# sourceMappingURL=Button.esm.js.map