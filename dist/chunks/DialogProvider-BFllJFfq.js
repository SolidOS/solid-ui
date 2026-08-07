import { S as e, g as t, i as n, o as r, v as i } from "./components-BHoVP7zE.js";
//#region node_modules/@lit/context/lib/value-notifier.js
var a = class {
	get value() {
		return this.o;
	}
	set value(e) {
		this.setValue(e);
	}
	setValue(e, t = !1) {
		let n = t || !Object.is(e, this.o);
		this.o = e, n && this.updateObservers();
	}
	constructor(e) {
		this.subscriptions = /* @__PURE__ */ new Map(), this.updateObservers = () => {
			for (let [e, { disposer: t }] of this.subscriptions) e(this.o, t);
		}, e !== void 0 && (this.value = e);
	}
	addCallback(e, t, n) {
		if (!n) return void e(this.value);
		this.subscriptions.has(e) || this.subscriptions.set(e, {
			disposer: () => {
				this.subscriptions.delete(e);
			},
			consumerHost: t
		});
		let { disposer: r } = this.subscriptions.get(e);
		e(this.value, r);
	}
	clearCallbacks() {
		this.subscriptions.clear();
	}
}, o = class extends Event {
	constructor(e, t) {
		super("context-provider", {
			bubbles: !0,
			composed: !0
		}), this.context = e, this.contextTarget = t;
	}
}, s = class extends a {
	constructor(t, n, r) {
		super(n.context === void 0 ? r : n.initialValue), this.onContextRequest = (e) => {
			if (e.context !== this.context) return;
			let t = e.contextTarget ?? e.composedPath()[0];
			t !== this.host && (e.stopPropagation(), this.addCallback(e.callback, t, e.subscribe));
		}, this.onProviderRequest = (t) => {
			if (t.context !== this.context || (t.contextTarget ?? t.composedPath()[0]) === this.host) return;
			let n = /* @__PURE__ */ new Set();
			for (let [t, { consumerHost: r }] of this.subscriptions) n.has(t) || (n.add(t), r.dispatchEvent(new e(this.context, r, t, !0)));
			t.stopPropagation();
		}, this.host = t, this.context = n.context === void 0 ? n : n.context, this.attachListeners(), this.host.addController?.(this);
	}
	attachListeners() {
		this.host.addEventListener("context-request", this.onContextRequest), this.host.addEventListener("context-provider", this.onProviderRequest);
	}
	hostConnected() {
		this.host.dispatchEvent(new o(this.context, this.host));
	}
};
//#endregion
//#region node_modules/@lit/context/lib/decorators/provide.js
function c({ context: e }) {
	return (t, n) => {
		let r = /* @__PURE__ */ new WeakMap();
		if (typeof n == "object") return {
			get() {
				return t.get.call(this);
			},
			set(e) {
				return r.get(this).setValue(e), t.set.call(this, e);
			},
			init(t) {
				return r.set(this, new s(this, {
					context: e,
					initialValue: t
				})), t;
			}
		};
		{
			t.constructor.addInitializer(((t) => {
				r.set(t, new s(t, { context: e }));
			}));
			let i = Object.getOwnPropertyDescriptor(t, n), a;
			if (i === void 0) {
				let e = /* @__PURE__ */ new WeakMap();
				a = {
					get() {
						return e.get(this);
					},
					set(t) {
						r.get(this).setValue(t), e.set(this, t);
					},
					configurable: !0,
					enumerable: !0
				};
			} else {
				let e = i.set;
				a = {
					...i,
					set(t) {
						r.get(this).setValue(t), e?.call(this, t);
					}
				};
			}
			Object.defineProperty(t, n, a);
			return;
		}
	};
}
//#endregion
//#region src/components/dialog-provider/DialogProvider.ts
var l, u, d, f, p, m, h, g, _;
function v(e, t, n) {
	y(e, t), t.set(e, n);
}
function y(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function b(e, t, n) {
	return e.set(S(e, t), n), n;
}
function x(e, t) {
	return e.get(S(e, t));
}
function S(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function C(e, t, n, r, i, a) {
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
				get: E(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || E(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
		}
		for (var C = e, w = _.length - 1; w >= 0; w -= n ? 2 : 1) {
			var T = _[w], D = n ? _[w - 1] : void 0, O = {}, k = {
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
				}.bind(null, O)
			};
			try {
				if (y) (g = c(T.call(D, C, k), "class decorators", "return")) && (C = g);
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
					if (A && (M.get = A), j && (M.set = j), C = T.call(D, p ? {
						get: b.get,
						set: b.set
					} : b[S], k), p) {
						if (typeof C == "object" && C) (g = c(C.get, "accessor.get")) && (b.get = g), (g = c(C.set, "accessor.set")) && (b.set = g), (g = c(C.init, "accessor.init")) && x.push(g);
						else if (C !== void 0) throw TypeError("accessor decorators must return an object with get, set, or init properties or void 0");
					} else c(C, (f ? "field" : "method") + " decorators", "return") && (f ? x.push(C) : b[S] = C);
				}
			} finally {
				O.v = !0;
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
			return D(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : w(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function w(e) {
	var t = T(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function T(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function E(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function D(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
f = [t("solid-ui-dialog-provider")];
var O, k = /*#__PURE__*/ new WeakMap(), A = /*#__PURE__*/ new WeakMap();
_ = (p = n({
	type: String,
	reflect: !0
}), h = c({ context: i }), "dialogId"), l = class extends r {
	constructor(...e) {
		super(...e), v(this, k, (u(this), m(this))), v(this, A, g(this, { id: "" }));
	}
	get [_]() {
		return x(k, this);
	}
	set dialogId(e) {
		b(k, this, e);
	}
	get dialog() {
		return x(A, this);
	}
	set dialog(e) {
		b(A, this, e);
	}
	willUpdate(e) {
		super.willUpdate(e), e.has("dialogId") && this.dialogId && (this.dialog = { id: this.dialogId });
	}
	firstUpdated() {
		let e = this.shadowRoot?.querySelector("slot");
		this.dispatchEvent(new CustomEvent("mounted", {
			bubbles: !0,
			composed: !0,
			detail: e?.assignedElements()[0]
		}));
	}
}, {e: [m, g, u], c: [O, d]} = C(l, [[
	p,
	1,
	"dialogId"
], [
	h,
	1,
	"dialog"
]], f, 0, void 0, r), d();
//#endregion
export { c as n, O as t };

//# sourceMappingURL=DialogProvider-BFllJFfq.js.map