import { c as e, i as t, n, t as r } from "./lit-C4H1jI4q.js";
//#region node_modules/@lit/context/lib/context-request-event.js
var i = class extends Event {
	constructor(e, t, n, r) {
		super("context-request", {
			bubbles: !0,
			composed: !0
		}), this.context = e, this.contextTarget = t, this.callback = n, this.subscribe = r ?? !1;
	}
};
//#endregion
//#region node_modules/@lit/context/lib/create-context.js
function a(e) {
	return e;
}
//#endregion
//#region node_modules/@lit/context/lib/controllers/context-consumer.js
var o = class {
	constructor(e, t, n, r) {
		if (this.subscribe = !1, this.provided = !1, this.value = void 0, this.t = (e, t) => {
			this.unsubscribe && (this.unsubscribe !== t && (this.provided = !1, this.unsubscribe()), this.subscribe || this.unsubscribe()), this.value = e, this.host.requestUpdate(), this.provided && !this.subscribe || (this.provided = !0, this.callback && this.callback(e, t)), this.unsubscribe = t;
		}, this.host = e, t.context !== void 0) {
			let e = t;
			this.context = e.context, this.callback = e.callback, this.subscribe = e.subscribe ?? !1;
		} else this.context = t, this.callback = n, this.subscribe = r ?? !1;
		this.host.addController(this);
	}
	hostConnected() {
		this.dispatchRequest();
	}
	hostDisconnected() {
		this.unsubscribe &&= (this.unsubscribe(), void 0);
	}
	dispatchRequest() {
		this.host.dispatchEvent(new i(this.context, this.host, this.t, this.subscribe));
	}
};
//#endregion
//#region node_modules/@lit/context/lib/decorators/consume.js
function s({ context: e, subscribe: t }) {
	return (n, r) => {
		typeof r == "object" ? r.addInitializer((function() {
			new o(this, {
				context: e,
				callback: (e) => {
					n.set.call(this, e);
				},
				subscribe: t
			});
		})) : n.constructor.addInitializer(((n) => {
			new o(n, {
				context: e,
				callback: (e) => {
					n[r] = e;
				},
				subscribe: t
			});
		}));
	};
}
//#endregion
//#region src/lib/components/ids.ts
function c() {
	return Math.random().toString(36).substring(2, 15);
}
//#endregion
//#region src/lib/dialogs/context.ts
var l = { id: `noop-${c()}` }, u = a(Symbol("dialog"));
//#endregion
//#region src/lib/components/decorators.ts
function d(e, t) {
	customElements.get(e) || customElements.define(e, t);
}
function f(e) {
	return (t, n) => {
		if (n) {
			n.addInitializer(() => d(e, t));
			return;
		}
		d(e, t);
	};
}
//#endregion
//#region src/lib/dialogs/events/close-dialog.ts
var p = "solid-ui:close-dialog", m = class e extends Event {
	static eventName = p;
	constructor(t, n) {
		super(e.eventName, {
			bubbles: !0,
			composed: !0
		}), this.id = t, this.data = n;
	}
};
//#endregion
//#region src/lib/components/traits/DialogTrait.ts
function h(e, t, n) {
	return (t = g(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function g(e) {
	var t = _(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function _(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var v = class {
	constructor(e, t) {
		h(this, "target", void 0), h(this, "config", void 0), this.target = e, this.config = t;
	}
	close(e) {
		window.dispatchEvent(new m(this.config.getContext().id, e));
	}
}, y = e`/*! tailwindcss v4.3.3 | MIT License | https://tailwindcss.com */\n*,:after,:before,::backdrop{box-sizing:border-box;border:0 solid}::file-selector-button{box-sizing:border-box;border:0 solid}a,abbr,address,area,article,aside,audio,b,base,bdi,bdo,blockquote,body,br,button,canvas,caption,cite,code,col,colgroup,data,datalist,dd,del,details,dfn,dialog,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,i,iframe,img,input,ins,kbd,label,legend,li,link,main,map,mark,menu,meta,meter,nav,noscript,object,ol,optgroup,option,output,p,picture,pre,progress,q,rp,rt,ruby,s,samp,script,search,section,select,slot,small,source,span,strong,style,sub,summary,sup,table,tbody,td,template,textarea,tfoot,th,thead,time,title,tr,track,u,ul,var,video,wbr,:after,:before,::backdrop{margin:0;padding:0}::file-selector-button{margin:0;padding:0}html,:host{-webkit-text-size-adjust:100%;tab-size:4;font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;line-height:1.5}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-feature-settings:normal;font-variation-settings:normal;font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}:-moz-focusring{outline:auto}progress{vertical-align:baseline}summary{display:list-item}ol,ul,menu{list-style:none}img,svg,video,canvas,audio,iframe,embed,object{vertical-align:middle;display:block}img,video{max-width:100%;height:auto}button,input,select,optgroup,textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}:where(select:is([multiple],[size])) optgroup{font-weight:bolder}:where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}::file-selector-button{margin-inline-end:4px}::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}textarea{resize:vertical}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}::-webkit-datetime-edit{display:inline-flex}::-webkit-datetime-edit-fields-wrapper{padding:0}::-webkit-datetime-edit{padding-block:0}::-webkit-datetime-edit-year-field{padding-block:0}::-webkit-datetime-edit-month-field{padding-block:0}::-webkit-datetime-edit-day-field{padding-block:0}::-webkit-datetime-edit-hour-field{padding-block:0}::-webkit-datetime-edit-minute-field{padding-block:0}::-webkit-datetime-edit-second-field{padding-block:0}::-webkit-datetime-edit-millisecond-field{padding-block:0}::-webkit-datetime-edit-meridiem-field{padding-block:0}::-webkit-calendar-picker-indicator{line-height:1}:-moz-ui-invalid{box-shadow:none}button,input:where([type=button],[type=reset],[type=submit]){appearance:button}::file-selector-button{appearance:button}::-webkit-inner-spin-button{height:auto}::-webkit-outer-spin-button{height:auto}[hidden]:where(:not([hidden=until-found])){display:none!important}.sr-only{clip:rect(0, 0, 0, 0);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}`;
//#endregion
//#region src/lib/components/web-component/WebComponent.ts
function b(e, t, n) {
	return (t = x(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function x(e) {
	var t = S(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function S(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var C = Symbol("WebComponentMetadata"), w = class extends r {
	constructor(...e) {
		super(...e), b(this, C, void 0), b(this, "internals", void 0), b(this, "globalListeners", []), b(this, "traits", []);
	}
	static finalizeStyles(e) {
		return [y, ...super.finalizeStyles(e)];
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		for (let [e, t] of this.globalListeners) window.removeEventListener(e, t);
		this.globalListeners = [];
	}
	addTrait(e) {
		return this.traits.push(e), e;
	}
	firstUpdated() {
		this.forwardMethodCall("firstUpdated");
	}
	updated(e) {
		this.forwardMethodCall("updated", e);
	}
	formResetCallback() {
		this.forwardMethodCall("formResetCallback");
	}
	willUpdate(e) {
		super.willUpdate(e);
		let t = this.static().states;
		if (t) for (let [e, n] of Object.entries(t)) this.toggleAttribute(`data-state-${e}`, !!n(this));
	}
	addGlobalEventListener(e, t) {
		this.globalListeners.push([e, t]), window.addEventListener(e, t);
	}
	render() {
		return t`<slot></slot>`;
	}
	getInternals() {
		return this.internals ??= this.attachInternals(), this.internals;
	}
	static() {
		return this.constructor;
	}
	forwardMethodCall(e, ...t) {
		for (let n of this.traits) n[e]?.(...t);
	}
};
b(w, "states", void 0);
//#endregion
//#region src/lib/components/dialog-component/DialogComponent.ts
var T, E, D, O, k;
function A(e, t, n) {
	j(e, t), t.set(e, n);
}
function j(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function M(e, t, n) {
	return (t = L(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function N(e, t, n) {
	return e.set(F(e, t), n), n;
}
function P(e, t) {
	return e.get(F(e, t));
}
function F(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function I(e, t, n, r, i, a) {
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
				get: z(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || z(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return B(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : L(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function L(e) {
	var t = R(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function R(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function z(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function B(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
var V = /*#__PURE__*/ new WeakMap();
k = (D = s({
	context: u,
	subscribe: !0
}), "dialogTrait");
var H = class extends w {
	get context() {
		return P(V, this);
	}
	set context(e) {
		N(V, this, e);
	}
	constructor() {
		super(), M(this, k, void E(this)), A(this, V, O(this, l)), this.dialogTrait = this.addTrait(new v(this, { getContext: () => this.context }));
	}
	close(e) {
		this.dialogTrait.close(e);
	}
};
T = H, [O, E] = I(T, [[
	D,
	1,
	"context"
]], [], 0, void 0, w).e;
//#endregion
//#region src/lib/components/traits/FormControlTrait.ts
function U(e, t, n) {
	return (t = W(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function W(e) {
	var t = G(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function G(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
var K = class {
	constructor(e, t) {
		U(this, "controlId", void 0), U(this, "labelId", void 0), U(this, "target", void 0), U(this, "config", void 0), this.config = t, this.controlId = `control-${c()}`, this.labelId = `label-${this.controlId}`, this.target = e;
	}
	firstUpdated() {
		this.config.getInternals().setFormValue(String(this.target.value ?? "")), this.updateValidity();
	}
	updated(e) {
		(e.has("value") || e.has("required")) && this.updateValidity();
	}
	formResetCallback() {
		this.target.value = "", this.config.getInternals().setFormValue(""), this.updateValidity();
	}
	renderLabel() {
		return this.target.label ? t`<label id="${this.labelId}" for="${this.controlId}">${this.target.label}</label>` : n;
	}
	onInput() {
		this.setValue(this.config.getControlElement()?.value);
	}
	onSubmit() {
		this.config.getInternals().form?.requestSubmit();
	}
	setValue(e) {
		this.target.value = e, this.config.getInternals().setFormValue(String(this.target.value ?? "")), this.target.dispatchEvent(new InputEvent("input", {
			bubbles: !0,
			composed: !0
		}));
	}
	updateValidity() {
		let e = this.config.getInternals();
		this.target.required && (this.target.value ?? "") === "" ? e.setValidity({ valueMissing: !0 }, "Please fill out this field.", this.config.getControlElement() ?? void 0) : e.setValidity({});
	}
};
//#endregion
export { m as a, u as c, a as d, i as f, v as i, c as l, H as n, f as o, w as r, l as s, K as t, s as u };

//# sourceMappingURL=components-Bp5jfkEz.js.map