import { i as e, l as t, o as n } from "./components-BD458q30.js";
import { c as r, i, n as a } from "./lit-C4H1jI4q.js";
//#region ~icons/svg-spinners/180-ring
var o = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"currentColor\" d=\"M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z\"><animateTransform attributeName=\"transform\" dur=\"0.75s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"0 12 12;360 12 12\"/></path></svg>";
	}
};
customElements.get("icon-svg-spinners-180-ring") || customElements.define("icon-svg-spinners-180-ring", o);
//#endregion
//#region src/components/button/Button.styles.css
var s = r`:host{--text-color:var(--solid-ui-color-white);--border-color:var(--solid-ui-color-primary);--background-color:var(--solid-ui-color-primary);--hover-text-color:var(--text-color);--hover-border-color:var(--solid-ui-color-tertiary);--hover-background-color:var(--solid-ui-color-tertiary);display:inline-flex;& button{font-size:var(--solid-ui-font-size-md);color:var(--text-color);background:var(--background-color);border:1px solid var(--border-color);border-radius:5px;flex:1;justify-content:center;align-items:center;gap:5px;padding:7px 12px;font-weight:600;display:flex;position:relative;&:disabled{opacity:.5;cursor:not-allowed}&:hover:not(:disabled){color:var(--hover-text-color);background:var(--hover-background-color);border-color:var(--hover-border-color)}& icon-svg-spinners-180-ring,& ::slotted([slot=left-icon]),& ::slotted([slot=right-icon]){width:var(--solid-ui-font-size-md);height:var(--solid-ui-font-size-md)}&:after{content:\"\";width:var(--solid-ui-clickable-area);height:var(--solid-ui-clickable-area);position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}}}:host([data-has-icon-slot]) button{padding:4px;& ::slotted([slot=icon]){width:var(--solid-ui-font-size-2xl);height:var(--solid-ui-font-size-2xl)}}:host([variant=secondary]) button{--text-color:var(--solid-ui-color-gray-800);--border-color:var(--solid-ui-color-slate-400);--background-color:var(--solid-ui-color-white);--hover-text-color:var(--solid-ui-color-white);--hover-background-color:var(--solid-ui-color-tertiary);--hover-border-color:var(--solid-ui-color-tertiary)}:host([variant=tertiary]) button{--text-color:var(--solid-ui-color-primary);--border-color:transparent;--background-color:transparent;--hover-text-color:var(--solid-ui-color-tertiary);--hover-border-color:var(--solid-ui-color-tertiary);--hover-background-color:transparent;border-width:0 0 1px;border-radius:0;padding:0}:host([variant=outline]) button{--text-color:currentColor;--border-color:currentColor;--background-color:transparent;--hover-text-color:currentColor;--hover-border-color:currentColor;--hover-background-color:color-mix(in srgb, currentColor 25%, transparent)}:host([variant=ghost]) button{--text-color:currentColor;--border-color:transparent;--background-color:transparent;--hover-text-color:currentColor;--hover-border-color:transparent;--hover-background-color:var(--solid-ui-color-primary-hover)}`, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E;
function D(e, t, n) {
	O(e, t), t.set(e, n);
}
function O(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function k(e, t, n) {
	return e.set(j(e, t), n), n;
}
function A(e, t) {
	return e.get(j(e, t));
}
function j(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function M(e, t, n) {
	return (t = P(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function N(e, t, n, r, i, a) {
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
				get: I(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || I(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return L(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : P(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function P(e) {
	var t = F(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function F(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function I(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function L(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function R(e) {
	return e;
}
var z = [
	"primary",
	"secondary",
	"tertiary",
	"outline",
	"ghost"
];
g = [t("solid-ui-button")];
var B;
new (T = (u = /*#__PURE__*/ new WeakMap(), d = /*#__PURE__*/ new WeakMap(), f = /*#__PURE__*/ new WeakMap(), p = /*#__PURE__*/ new WeakMap(), E = (_ = e({
	type: String,
	reflect: !0
}), y = e({
	type: String,
	reflect: !0
}), x = e({ type: Boolean }), C = e({ type: Boolean }), "variant"), l = class extends n {
	constructor(...e) {
		super(...e), D(this, u, (m(this), v(this, "primary"))), D(this, d, b(this, "button")), D(this, f, S(this, void 0)), D(this, p, w(this, !1));
	}
	get [E]() {
		return A(u, this);
	}
	set variant(e) {
		k(u, this, e);
	}
	get type() {
		return A(d, this);
	}
	set type(e) {
		k(d, this, e);
	}
	get disabled() {
		return A(f, this);
	}
	set disabled(e) {
		k(f, this, e);
	}
	get loading() {
		return A(p, this);
	}
	set loading(e) {
		k(p, this, e);
	}
	render() {
		let e = this.disabled ?? this.loading;
		return i`
        <button type=${this.type} ?disabled=${e} @click=${this.onClick}>
            ${this.loading ? i`<icon-svg-spinners-180-ring></icon-svg-spinners-180-ring>` : a}
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
			case "reset":
				this.getInternals().form?.reset();
				break;
		}
	}
}, {e: [v, b, S, w, m], c: [B, h]} = N(l, [
	[
		_,
		1,
		"variant"
	],
	[
		y,
		1,
		"type"
	],
	[
		x,
		1,
		"disabled"
	],
	[
		C,
		1,
		"loading"
	]
], g, 0, void 0, n), l), c = class extends R {
	constructor() {
		super(B), M(this, "styles", s), M(this, "formAssociated", !0), h();
	}
}, M(c, T, void 0), c)();
//#endregion
//#region src/components/button/index.ts
var V = B;
//#endregion
export { z as n, B as r, V as t };

//# sourceMappingURL=button-Dvkek1tx.js.map