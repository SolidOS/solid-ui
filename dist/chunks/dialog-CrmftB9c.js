import { _ as e, c as t, g as n, i as r, m as i, o as a, p as o, u as s, y as c } from "./components-LxiwG5ae.js";
import { t as l } from "./decorators-V-B013l9.js";
import { t as u } from "./query-DjAOg-tk.js";
import "./x-D1JUUSOS.js";
import "./dialog-header-xIWIqfZK.js";
import "./button-Dy1aFjqG.js";
// src/components/dialog/Dialog.styles.css
var d = o`dialog{border-radius:5px;min-width:343px;margin:auto;box-shadow:0 4px 16px #00000059;& solid-ui-dialog-header solid-ui-button{color:var(--solid-ui-color-gray-600)}}dialog:not([open]){display:none}`, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D;
function O(e, t, n) {
	k(e, t), t.set(e, n);
}
function k(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function A(e, t, n) {
	return e.set(M(e, t), n), n;
}
function j(e, t) {
	return e.get(M(e, t));
}
function M(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function N(e, t, n) {
	return (t = F(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
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
function z(e) {
	return e;
}
y = [l("solid-ui-dialog")];
var B;
new (E = (m = /*#__PURE__*/ new WeakMap(), h = /*#__PURE__*/ new WeakMap(), g = /*#__PURE__*/ new WeakMap(), D = (b = r({
	type: String,
	reflect: !0
}), S = u("dialog"), w = c({
	context: e,
	subscribe: !0
}), "title"), p = class extends a {
	get [D]() {
		return j(m, this);
	}
	set title(e) {
		A(m, this, e);
	}
	get nativeDialog() {
		return j(h, this);
	}
	set nativeDialog(e) {
		A(h, this, e);
	}
	get context() {
		return j(g, this);
	}
	set context(e) {
		A(g, this, e);
	}
	constructor() {
		super(), O(this, m, (_(this), x(this, ""))), O(this, h, C(this, null)), O(this, g, T(this, n)), N(this, "dialogTrait", void 0), this.dialogTrait = this.addTrait(new i(this, { getContext: () => this.context }));
	}
	close(e) {
		this.dialogTrait.close(e);
	}
	firstUpdated() {
		this.nativeDialog && (typeof this.nativeDialog.showModal == "function" ? this.nativeDialog.showModal() : typeof this.nativeDialog.show == "function" ? this.nativeDialog.show() : this.nativeDialog.setAttribute("open", ""), this.nativeDialog.addEventListener("close", () => this.close()));
	}
	render() {
		let e = this.title ? s`
        <solid-ui-dialog-header>
            <h1>${this.title}</h1>

            <solid-ui-button variant="ghost" @click=${() => this.close()}>
                <span class="sr-only">Close</span>
                <icon-lucide-x slot="icon"></icon-lucide-x>
            </solid-ui-button>
        </solid-ui-dialog-header>
        ` : t;
		return s`
        <dialog>
            <slot name="header">${e}</slot>
            <slot></slot>
            <slot name="footer"></slot>
        </dialog>
    `;
	}
}, {e: [x, C, T, _], c: [B, v]} = P(p, [
	[
		b,
		1,
		"title"
	],
	[
		S,
		1,
		"nativeDialog"
	],
	[
		w,
		1,
		"context"
	]
], y, 0, void 0, a), p), f = class extends z {
	constructor() {
		super(B), N(this, "styles", d), v();
	}
}, N(f, E, void 0), f)();
// src/components/dialog/index.ts
var V = B;
export { B as n, V as t };

//# sourceMappingURL=dialog-CrmftB9c.js.map