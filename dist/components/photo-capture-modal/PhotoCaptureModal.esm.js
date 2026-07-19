import { customElement as e } from "../../lib/components/decorators.esm.js";
import t from "../../lib/components/dialog-component/DialogComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../button/index.esm.js";
import "../dialog/index.esm.js";
import "../dialog-content/index.esm.js";
import "../dialog-footer/index.esm.js";
import n from "./PhotoCaptureModal.styles.esm.js";
import { html as r, nothing as i } from "lit";
import { property as a, state as o } from "lit/decorators.js";
//#region src/components/photo-capture-modal/PhotoCaptureModal.ts
var s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, ee, te, ne, re, M, ie, ae, N, P, F, I, L, R, z, B, V, H, U, W, G, K, q, J, oe, se, ce, le, ue, de, fe, pe, me, he;
function Y(e, t, n) {
	ge(e, t), t.set(e, n);
}
function ge(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function X(e, t, n) {
	return e.set(_e(e, t), n), n;
}
function Z(e, t) {
	return e.get(_e(e, t));
}
function _e(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function Q(e, t, n) {
	return (t = ye(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ve(e, t, n, r, i, a) {
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
				get: xe(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || xe(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return Se(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : ye(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function ye(e) {
	var t = be(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function be(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function xe(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function Se(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Ce(e) {
	return e;
}
O = [e("solid-ui-photo-capture-modal")];
var $;
new (me = (l = /*#__PURE__*/ new WeakMap(), u = /*#__PURE__*/ new WeakMap(), d = /*#__PURE__*/ new WeakMap(), f = /*#__PURE__*/ new WeakMap(), p = /*#__PURE__*/ new WeakMap(), m = /*#__PURE__*/ new WeakMap(), h = /*#__PURE__*/ new WeakMap(), g = /*#__PURE__*/ new WeakMap(), _ = /*#__PURE__*/ new WeakMap(), v = /*#__PURE__*/ new WeakMap(), y = /*#__PURE__*/ new WeakMap(), b = /*#__PURE__*/ new WeakMap(), x = /*#__PURE__*/ new WeakMap(), S = /*#__PURE__*/ new WeakMap(), C = /*#__PURE__*/ new WeakMap(), w = /*#__PURE__*/ new WeakMap(), T = /*#__PURE__*/ new WeakMap(), he = (k = a({
	type: String,
	reflect: !0
}), j = a({
	type: String,
	reflect: !0
}), te = a({
	type: String,
	reflect: !0
}), re = a({
	type: String,
	reflect: !0
}), ie = a({
	type: String,
	reflect: !0
}), N = a({
	type: String,
	attribute: "cancel-label",
	reflect: !0
}), F = a({
	type: String,
	attribute: "file-name-prefix",
	reflect: !0
}), L = a({ attribute: !1 }), z = a({
	type: String,
	reflect: !0
}), V = a({
	type: String,
	attribute: "capture-format",
	reflect: !0
}), U = a({
	type: Number,
	attribute: "capture-quality"
}), G = a({
	type: Boolean,
	attribute: "show-cancel-button",
	reflect: !0
}), q = a({
	type: String,
	attribute: "facing-mode",
	reflect: !0
}), oe = o(), ce = o(), ue = o(), fe = o(), "name"), c = class extends t {
	constructor(...e) {
		super(...e), Y(this, l, (E(this), A(this, ""))), Y(this, u, ee(this, "Take a photo")), Y(this, d, ne(this, "Take Photo")), Y(this, f, M(this, "Use Photo")), Y(this, p, ae(this, "Retake")), Y(this, m, P(this, "Cancel")), Y(this, h, I(this, "")), Y(this, g, R(this, void 0)), Y(this, _, B(this, "")), Y(this, v, H(this, "image/png")), Y(this, y, W(this, void 0)), Y(this, b, K(this, !0)), Y(this, x, J(this, "user")), Y(this, S, se(this, "")), Y(this, C, le(this, "")), Y(this, w, de(this, !1)), Y(this, T, pe(this, null)), Q(this, "stream", null);
	}
	get [he]() {
		return Z(l, this);
	}
	set name(e) {
		X(l, this, e);
	}
	get heading() {
		return Z(u, this);
	}
	set heading(e) {
		X(u, this, e);
	}
	get captureLabel() {
		return Z(d, this);
	}
	set captureLabel(e) {
		X(d, this, e);
	}
	get confirmLabel() {
		return Z(f, this);
	}
	set confirmLabel(e) {
		X(f, this, e);
	}
	get retakeLabel() {
		return Z(p, this);
	}
	set retakeLabel(e) {
		X(p, this, e);
	}
	get cancelLabel() {
		return Z(m, this);
	}
	set cancelLabel(e) {
		X(m, this, e);
	}
	get fileNamePrefix() {
		return Z(h, this);
	}
	set fileNamePrefix(e) {
		X(h, this, e);
	}
	get mediaConstraints() {
		return Z(g, this);
	}
	set mediaConstraints(e) {
		X(g, this, e);
	}
	get constraints() {
		return Z(_, this);
	}
	set constraints(e) {
		X(_, this, e);
	}
	get captureFormat() {
		return Z(v, this);
	}
	set captureFormat(e) {
		X(v, this, e);
	}
	get captureQuality() {
		return Z(y, this);
	}
	set captureQuality(e) {
		X(y, this, e);
	}
	get showCancelButton() {
		return Z(b, this);
	}
	set showCancelButton(e) {
		X(b, this, e);
	}
	get facingMode() {
		return Z(x, this);
	}
	set facingMode(e) {
		X(x, this, e);
	}
	get errorMessage() {
		return Z(S, this);
	}
	set errorMessage(e) {
		X(S, this, e);
	}
	get previewUrl() {
		return Z(C, this);
	}
	set previewUrl(e) {
		X(C, this, e);
	}
	get startingPreview() {
		return Z(w, this);
	}
	set startingPreview(e) {
		X(w, this, e);
	}
	get value() {
		return Z(T, this);
	}
	set value(e) {
		X(T, this, e);
	}
	disconnectedCallback() {
		this.stopStream(), this.revokePreviewUrl(), super.disconnectedCallback();
	}
	willUpdate(e) {
		if (super.willUpdate(e), e.has("value")) {
			let e = this.value instanceof File ? this.value : null;
			if (e !== this.value) {
				this.value = e;
				return;
			}
			this.syncPreviewFromValue(e);
		}
	}
	updated(e) {
		if (!this.value && !this.stream && !this.startingPreview && (e.has("previewUrl") || e.has("value")) && this.queuePreviewStart(), this.stream) {
			let e = this.shadowRoot?.querySelector("video");
			e && e.srcObject !== this.stream && (e.srcObject = this.stream);
		}
	}
	render() {
		return r`
        <solid-ui-dialog title=${this.heading}>
            <solid-ui-dialog-content>
                ${this.renderViewport()}
                ${this.renderStatus()}
            </solid-ui-dialog-content>
            <solid-ui-dialog-footer>
                ${this.showCancelButton ? r`<solid-ui-button variant="secondary" @click=${() => this.close()}>${this.cancelLabel}</solid-ui-button>` : i}

                ${this.value ? r`
                    <solid-ui-button @click=${this.onRetake}>${this.retakeLabel}</solid-ui-button>
                    <solid-ui-button @click=${this.onConfirm}>${this.confirmLabel}</solid-ui-button>
                  ` : r`
                    <solid-ui-button
                        ?disabled=${this.startingPreview || !this.stream}
                        @click=${this.onCapture}
                    >
                        ${this.captureLabel}
                    </solid-ui-button>
                  `}
            </solid-ui-dialog-footer>
        </solid-ui-dialog>
    `;
	}
	renderViewport() {
		return r`<div class="viewport">${this.previewUrl ? r`<img src="${this.previewUrl}" alt="Captured photo preview" />` : r`<video autoplay playsinline muted></video>`}</div>`;
	}
	renderStatus() {
		return this.errorMessage ? r`<div class="status error">${this.errorMessage}</div>` : this.startingPreview ? r`<div class="status">Opening camera…</div>` : this.value ? r`<div class="status">Review the photo before confirming it.</div>` : r`<div class="status">Preview the camera and take a photo when ready.</div>`;
	}
	onRetake() {
		this.clearValue(), this.queuePreviewStart();
	}
	onConfirm() {
		this.value && this.close(this.value);
	}
	async onCapture() {
		let e = this.shadowRoot?.querySelector("video");
		if (!e) return;
		let t = e.videoWidth || e.clientWidth || 640, n = e.videoHeight || e.clientHeight || 480, r = document.createElement("canvas");
		r.width = t, r.height = n;
		let i = r.getContext("2d");
		if (!i) {
			this.errorMessage = "Unable to capture a photo in this browser";
			return;
		}
		i.drawImage(e, 0, 0, t, n);
		let a = await new Promise((e) => {
			r.toBlob(e, this.captureFormat, this.captureQuality);
		});
		if (!a) {
			this.errorMessage = "Unable to create an image from the current camera frame";
			return;
		}
		this.value = this.createFileFromBlob(a), this.errorMessage = "";
	}
	createFileFromBlob(e) {
		let t = e.type || this.captureFormat, n = this.fileExtensionForMimeType(t), r = (this.fileNamePrefix || this.name || "photo").trim() || "photo";
		return new File([e], `${r}-${Date.now()}.${n}`, { type: t });
	}
	fileExtensionForMimeType(e) {
		switch (e) {
			case "image/jpeg": return "jpg";
			case "image/webp": return "webp";
			case "image/gif": return "gif";
			default: return "png";
		}
	}
	queuePreviewStart() {
		this.startPreview().catch(() => void 0);
	}
	stopStream() {
		if (!this.stream) return;
		this.stream.getTracks().forEach((e) => e.stop()), this.stream = null;
		let e = this.shadowRoot?.querySelector("video");
		e && (e.srcObject = null);
	}
	syncPreviewFromValue(e) {
		this.revokePreviewUrl(), e && (this.stopStream(), this.previewUrl = URL.createObjectURL(e));
	}
	clearValue() {
		this.value = null, this.errorMessage = "";
	}
	revokePreviewUrl() {
		this.previewUrl && URL.revokeObjectURL(this.previewUrl), this.previewUrl = "";
	}
	async startPreview() {
		if (!(this.value || this.startingPreview)) {
			if (!navigator.mediaDevices?.getUserMedia) {
				this.errorMessage = "Camera access is not available in this browser";
				return;
			}
			this.startingPreview = !0, this.errorMessage = "";
			try {
				let e = await navigator.mediaDevices.getUserMedia(this.resolveMediaConstraints());
				this.stream = e, this.requestUpdate(), await this.updateComplete;
				let t = this.shadowRoot?.querySelector("video");
				t && (t.srcObject = e, await t.play?.().catch(() => void 0));
			} catch (e) {
				this.errorMessage = e?.message || "Unable to start the camera preview";
			} finally {
				this.startingPreview = !1;
			}
		}
	}
	resolveMediaConstraints() {
		if (this.mediaConstraints) return this.mediaConstraints;
		if (this.constraints) try {
			return JSON.parse(this.constraints);
		} catch (e) {
			throw Error(`Invalid constraints JSON: ${e.message}`);
		}
		return { video: !this.facingMode || { facingMode: { ideal: this.facingMode } } };
	}
}, {e: [A, ee, ne, M, ae, P, I, R, B, H, W, K, J, se, le, de, pe, E], c: [$, D]} = ve(c, [
	[
		k,
		1,
		"name"
	],
	[
		j,
		1,
		"heading"
	],
	[
		te,
		1,
		"captureLabel"
	],
	[
		re,
		1,
		"confirmLabel"
	],
	[
		ie,
		1,
		"retakeLabel"
	],
	[
		N,
		1,
		"cancelLabel"
	],
	[
		F,
		1,
		"fileNamePrefix"
	],
	[
		L,
		1,
		"mediaConstraints"
	],
	[
		z,
		1,
		"constraints"
	],
	[
		V,
		1,
		"captureFormat"
	],
	[
		U,
		1,
		"captureQuality"
	],
	[
		G,
		1,
		"showCancelButton"
	],
	[
		q,
		1,
		"facingMode"
	],
	[
		oe,
		1,
		"errorMessage"
	],
	[
		ce,
		1,
		"previewUrl"
	],
	[
		ue,
		1,
		"startingPreview"
	],
	[
		fe,
		1,
		"value"
	]
], O, 0, void 0, t), c), s = class extends Ce {
	constructor() {
		super($), Q(this, "styles", n), D();
	}
}, Q(s, me, void 0), s)();
//#endregion
export { $ as default };

//# sourceMappingURL=PhotoCaptureModal.esm.js.map