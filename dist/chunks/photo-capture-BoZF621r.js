import { i as e, l as t, t as n } from "./components-BD458q30.js";
import { i as r } from "./lit-C4H1jI4q.js";
import { t as i } from "./dialogs-DEuwXC46.js";
import { t as a } from "./photo-capture-modal-BLZtHDj1.js";
//#region src/components/photo-capture/PhotoCapture.ts
var o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N, P, ee, F;
function te(e, t, n) {
	return (t = ie(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function I(e, t, n) {
	ne(e, t), t.set(e, n);
}
function ne(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function L(e, t, n) {
	return e.set(z(e, t), n), n;
}
function R(e, t) {
	return e.get(z(e, t));
}
function z(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function re(e, t, n, r, i, a) {
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
				get: oe(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || oe(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return se(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : ie(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function ie(e) {
	var t = ae(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function ae(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function oe(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function se(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
l = [t("solid-ui-photo-capture")];
var B, V = /*#__PURE__*/ new WeakMap(), H = /*#__PURE__*/ new WeakMap(), U = /*#__PURE__*/ new WeakMap(), W = /*#__PURE__*/ new WeakMap(), G = /*#__PURE__*/ new WeakMap(), K = /*#__PURE__*/ new WeakMap(), q = /*#__PURE__*/ new WeakMap(), J = /*#__PURE__*/ new WeakMap(), Y = /*#__PURE__*/ new WeakMap(), X = /*#__PURE__*/ new WeakMap(), Z = /*#__PURE__*/ new WeakMap(), Q = /*#__PURE__*/ new WeakMap(), $ = /*#__PURE__*/ new WeakMap();
F = (u = e({
	type: String,
	reflect: !0
}), f = e({
	type: String,
	reflect: !0
}), m = e({
	type: String,
	attribute: "capture-label",
	reflect: !0
}), g = e({
	type: String,
	attribute: "confirm-label",
	reflect: !0
}), v = e({
	type: String,
	attribute: "retake-label",
	reflect: !0
}), b = e({
	type: String,
	attribute: "cancel-label",
	reflect: !0
}), S = e({
	type: String,
	attribute: "facing-mode",
	reflect: !0
}), w = e({
	type: String,
	reflect: !0
}), E = e({
	type: String,
	attribute: "capture-format",
	reflect: !0
}), O = e({
	type: Number,
	attribute: "capture-quality"
}), A = e({
	type: Boolean,
	attribute: "show-cancel-button",
	reflect: !0
}), M = e({
	type: String,
	attribute: "file-name-prefix",
	reflect: !0
}), P = e({ attribute: !1 }), "label"), o = class extends n {
	constructor(...e) {
		super(...e), I(this, V, (s(this), d(this, "Take Photo"))), I(this, H, p(this, "Take a photo")), I(this, U, h(this, "Take Photo")), I(this, W, _(this, "Use Photo")), I(this, G, y(this, "Retake")), I(this, K, x(this, "Cancel")), I(this, q, C(this, "user")), I(this, J, T(this, "")), I(this, Y, D(this, "image/png")), I(this, X, k(this, void 0)), I(this, Z, j(this, !0)), I(this, Q, N(this, "")), I(this, $, ee(this, void 0)), te(this, "controlElement", null);
	}
	get [F]() {
		return R(V, this);
	}
	set label(e) {
		L(V, this, e);
	}
	get heading() {
		return R(H, this);
	}
	set heading(e) {
		L(H, this, e);
	}
	get captureLabel() {
		return R(U, this);
	}
	set captureLabel(e) {
		L(U, this, e);
	}
	get confirmLabel() {
		return R(W, this);
	}
	set confirmLabel(e) {
		L(W, this, e);
	}
	get retakeLabel() {
		return R(G, this);
	}
	set retakeLabel(e) {
		L(G, this, e);
	}
	get cancelLabel() {
		return R(K, this);
	}
	set cancelLabel(e) {
		L(K, this, e);
	}
	get facingMode() {
		return R(q, this);
	}
	set facingMode(e) {
		L(q, this, e);
	}
	get constraints() {
		return R(J, this);
	}
	set constraints(e) {
		L(J, this, e);
	}
	get captureFormat() {
		return R(Y, this);
	}
	set captureFormat(e) {
		L(Y, this, e);
	}
	get captureQuality() {
		return R(X, this);
	}
	set captureQuality(e) {
		L(X, this, e);
	}
	get showCancelButton() {
		return R(Z, this);
	}
	set showCancelButton(e) {
		L(Z, this, e);
	}
	get fileNamePrefix() {
		return R(Q, this);
	}
	set fileNamePrefix(e) {
		L(Q, this, e);
	}
	get mediaConstraints() {
		return R($, this);
	}
	set mediaConstraints(e) {
		L($, this, e);
	}
	render() {
		return r`
        <slot name="trigger" @click=${this.onClick}>
            <solid-ui-button ?disabled="${this.disabled}">${this.label}</solid-ui-button>
        </slot>
    `;
	}
	onClick() {
		i(a, {
			props: {
				name: this.name,
				heading: this.heading,
				captureLabel: this.captureLabel,
				confirmLabel: this.confirmLabel,
				retakeLabel: this.retakeLabel,
				cancelLabel: this.cancelLabel,
				fileNamePrefix: this.fileNamePrefix,
				mediaConstraints: this.mediaConstraints,
				constraints: this.constraints,
				captureFormat: this.captureFormat,
				captureQuality: this.captureQuality,
				showCancelButton: this.showCancelButton,
				facingMode: this.facingMode
			},
			onClose: (e) => this.controlTrait.setValue(e ?? null)
		});
	}
}, {e: [d, p, h, _, y, x, C, T, D, k, j, N, ee, s], c: [B, c]} = re(o, [
	[
		u,
		1,
		"label"
	],
	[
		f,
		1,
		"heading"
	],
	[
		m,
		1,
		"captureLabel"
	],
	[
		g,
		1,
		"confirmLabel"
	],
	[
		v,
		1,
		"retakeLabel"
	],
	[
		b,
		1,
		"cancelLabel"
	],
	[
		S,
		1,
		"facingMode"
	],
	[
		w,
		1,
		"constraints"
	],
	[
		E,
		1,
		"captureFormat"
	],
	[
		O,
		1,
		"captureQuality"
	],
	[
		A,
		1,
		"showCancelButton"
	],
	[
		M,
		1,
		"fileNamePrefix"
	],
	[
		P,
		1,
		"mediaConstraints"
	]
], l, 0, void 0, n), c();
//#endregion
//#region src/components/photo-capture/index.ts
var ce = B;
//#endregion
export { B as n, ce as t };

//# sourceMappingURL=photo-capture-BoZF621r.js.map