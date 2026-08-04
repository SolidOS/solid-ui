import { customElement as e } from "../../lib/components/decorators.esm.js";
import t from "../../lib/components/web-component/WebComponent.esm.js";
import "../../lib/components/index.esm.js";
import n from "./Menu.styles.esm.js";
import { html as r } from "lit";
import { property as i, query as a, state as o } from "lit/decorators.js";
import "@awesome.me/webawesome/dist/components/dropdown/dropdown.js";
import "@awesome.me/webawesome/dist/components/dropdown-item/dropdown-item.js";
//#region src/components/menu/Menu.ts
var s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T;
function E(e, t, n) {
	D(e, t), t.set(e, n);
}
function D(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function O(e, t, n) {
	return e.set(A(e, t), n), n;
}
function k(e, t) {
	return e.get(A(e, t));
}
function A(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function j(e, t, n) {
	return (t = N(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function M(e, t, n, r, i, a) {
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
				get: F(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || F(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return I(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : N(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function N(e) {
	var t = P(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function P(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function F(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function I(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function L(e) {
	return e;
}
h = [e("solid-ui-menu")];
var R;
new (w = (l = /*#__PURE__*/ new WeakMap(), u = /*#__PURE__*/ new WeakMap(), d = /*#__PURE__*/ new WeakMap(), f = /*#__PURE__*/ new WeakMap(), T = (g = i({
	type: String,
	reflect: !0
}), v = i({
	type: Number,
	reflect: !0
}), b = a("wa-dropdown"), S = o(), "placement"), c = class extends t {
	constructor(...e) {
		super(...e), E(this, l, (p(this), _(this, "bottom-start"))), E(this, u, y(this, 5)), E(this, d, x(this, null)), E(this, f, C(this, [])), j(this, "observer", new MutationObserver(() => this.syncItems()));
	}
	get [T]() {
		return k(l, this);
	}
	set placement(e) {
		O(l, this, e);
	}
	get distance() {
		return k(u, this);
	}
	set distance(e) {
		O(u, this, e);
	}
	get dropdown() {
		return k(d, this);
	}
	set dropdown(e) {
		O(d, this, e);
	}
	get items() {
		return k(f, this);
	}
	set items(e) {
		O(f, this, e);
	}
	connectedCallback() {
		super.connectedCallback(), this.syncItems(), this.observer.observe(this, { childList: !0 });
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.observer.disconnect();
	}
	render() {
		return r`
      <wa-dropdown
        placement=${this.placement}
        distance=${this.distance}
        @wa-select=${this.onWaSelect}
      >
        <slot name="trigger" slot="trigger"></slot>

        ${this.items.map((e) => r`<wa-dropdown-item @click=${this.onItemClick}>
                <slot name=${e.slot}></slot>
            </wa-dropdown-item>`)}
      </wa-dropdown>
    `;
	}
	syncItems() {
		let e = Array.from(this.children).filter((e) => e.getAttribute("slot") !== "trigger");
		this.items = e.map((e, t) => {
			let n = `menu-item-${t}`;
			return e.getAttribute("slot") !== n && e.setAttribute("slot", n), { slot: n };
		});
	}
	onItemClick(e) {
		let t = e.currentTarget;
		e.stopPropagation(), !t.disabled && (this.dispatchSelectEvent(t).defaultPrevented || !this.dropdown || (this.dropdown.open = !1));
	}
	onWaSelect(e) {
		if (this.dispatchSelectEvent(e.detail.item).defaultPrevented) {
			e.preventDefault();
			return;
		}
		let t = e.detail.item.children[0].getAttribute("name");
		this.querySelector(`[slot="${t}"]`)?.click?.();
	}
	dispatchSelectEvent(e) {
		let t = e.children[0].getAttribute("name"), n = this.querySelector(`[slot="${t}"]`), r = new CustomEvent("solid-ui-select", {
			bubbles: !0,
			composed: !0,
			cancelable: !0
		});
		return n?.dispatchEvent(r), r;
	}
}, {e: [_, y, x, C, p], c: [R, m]} = M(c, [
	[
		g,
		1,
		"placement"
	],
	[
		v,
		1,
		"distance"
	],
	[
		b,
		1,
		"dropdown"
	],
	[
		S,
		1,
		"items"
	]
], h, 0, void 0, t), c), s = class extends L {
	constructor() {
		super(R), j(this, "styles", n), m();
	}
}, j(s, w, void 0), s)();
//#endregion
export { R as default };

//# sourceMappingURL=Menu.esm.js.map