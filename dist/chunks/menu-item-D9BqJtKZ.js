import { i as e, l as t, o as n } from "./components-BD458q30.js";
import { c as r, i } from "./lit-C4H1jI4q.js";
import { t as a } from "./query-BYu9q8lA.js";
//#region src/components/menu-item/MenuItem.styles.css
var o = r`:host{&>a,&>div{width:100%;color:var(--solid-ui-color-gray-600);font-weight:500;font-size:var(--solid-ui-font-size-md);border-radius:5px;justify-content:flex-start;align-items:center;gap:5px;padding:10px;display:flex;position:relative;&[data-selected]{background:var(--solid-ui-color-primary-selected)}}& ::slotted([slot=left-icon]),& ::slotted([slot=right-icon]){width:var(--solid-ui-font-size-xl);height:var(--solid-ui-font-size-xl)}& a:after{content:\"\";width:100%;height:100%;position:absolute;top:0;left:0}}`, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S;
function C(e, t, n) {
	w(e, t), t.set(e, n);
}
function w(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function T(e, t, n) {
	return e.set(D(e, t), n), n;
}
function E(e, t) {
	return e.get(D(e, t));
}
function D(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function O(e, t, n) {
	return (t = A(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function k(e, t, n, r, i, a) {
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
				get: M(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || M(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return N(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : A(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function A(e) {
	var t = j(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function j(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function M(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function N(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function P(e) {
	return e;
}
m = [t("solid-ui-menu-item")];
var F;
new (x = (l = /*#__PURE__*/ new WeakMap(), u = /*#__PURE__*/ new WeakMap(), d = /*#__PURE__*/ new WeakMap(), S = (h = e({
	type: String,
	reflect: !0
}), _ = e({
	type: Boolean,
	reflect: !0
}), y = a("a"), "href"), c = class extends n {
	constructor(...e) {
		super(...e), C(this, l, (f(this), g(this))), C(this, u, v(this, !1)), C(this, d, b(this, null));
	}
	get [S]() {
		return E(l, this);
	}
	set href(e) {
		T(l, this, e);
	}
	get selected() {
		return E(u, this);
	}
	set selected(e) {
		T(u, this, e);
	}
	get anchor() {
		return E(d, this);
	}
	set anchor(e) {
		T(d, this, e);
	}
	render() {
		return this.href ? i`
        <a href="${this.href}" target="_blank" rel="noopener noreferrer" ?data-selected=${this.selected}>
            <slot name="left-icon"></slot>
            <slot></slot>
            <slot name="right-icon"></slot>
        </a>
      ` : i`
        <div ?data-selected=${this.selected}>
            <slot name="left-icon"></slot>
            <slot></slot>
            <slot name="right-icon"></slot>
        </div>
    `;
	}
	click() {
		this.anchor?.click();
	}
}, {e: [g, v, b, f], c: [F, p]} = k(c, [
	[
		h,
		1,
		"href"
	],
	[
		_,
		1,
		"selected"
	],
	[
		y,
		1,
		"anchor"
	]
], m, 0, void 0, n), c), s = class extends P {
	constructor() {
		super(F), O(this, "styles", o), p();
	}
}, O(s, x, void 0), s)();
//#endregion
//#region src/components/menu-item/index.ts
var I = F;
//#endregion
export { F as n, I as t };

//# sourceMappingURL=menu-item-D9BqJtKZ.js.map