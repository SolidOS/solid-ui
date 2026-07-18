import { o as e, r as t, t as n } from "./components-Bp5jfkEz.js";
import { c as r, i, n as a, o } from "./lit-C4H1jI4q.js";
import "./chunk.7MPIABXH-CEYdxYyt.js";
import { n as s, t as c } from "./decorators-BqWyWiL9.js";
import { t as l } from "./query-BYu9q8lA.js";
import "./chevron-down-ujxRg3MD.js";
//#region node_modules/@lit/task/task.js
var u = Symbol(), d = class {
	get taskComplete() {
		return this.t || (this.i === 1 ? this.t = new Promise(((e, t) => {
			this.o = e, this.h = t;
		})) : this.i === 3 ? this.t = Promise.reject(this.l) : this.t = Promise.resolve(this.u)), this.t;
	}
	constructor(e, t, n) {
		this.p = 0, this.i = 0, (this._ = e).addController(this);
		let r = typeof t == "object" ? t : {
			task: t,
			args: n
		};
		this.v = r.task, this.j = r.args, this.m = r.argsEqual ?? f, this.k = r.onComplete, this.A = r.onError, this.autoRun = r.autoRun ?? !0, "initialValue" in r && (this.u = r.initialValue, this.i = 2, this.O = this.T?.());
	}
	hostUpdate() {
		!0 === this.autoRun && this.S();
	}
	hostUpdated() {
		this.autoRun === "afterUpdate" && this.S();
	}
	T() {
		if (this.j === void 0) return;
		let e = this.j();
		if (!Array.isArray(e)) throw Error("The args function must return an array");
		return e;
	}
	async S() {
		let e = this.T(), t = this.O;
		this.O = e, e === t || e === void 0 || t !== void 0 && this.m(t, e) || await this.run(e);
	}
	async run(e) {
		let t, n;
		e ??= this.T(), this.O = e, this.i === 1 ? this.q?.abort() : (this.t = void 0, this.o = void 0, this.h = void 0), this.i = 1, this.autoRun === "afterUpdate" ? queueMicrotask((() => this._.requestUpdate())) : this._.requestUpdate();
		let r = ++this.p;
		this.q = new AbortController();
		let i = !1;
		try {
			t = await this.v(e, { signal: this.q.signal });
		} catch (e) {
			i = !0, n = e;
		}
		if (this.p === r) {
			if (t === u) this.i = 0;
			else {
				if (!1 === i) {
					try {
						this.k?.(t);
					} catch {}
					this.i = 2, this.o?.(t);
				} else {
					try {
						this.A?.(n);
					} catch {}
					this.i = 3, this.h?.(n);
				}
				this.u = t, this.l = n;
			}
			this._.requestUpdate();
		}
	}
	abort(e) {
		this.i === 1 && this.q?.abort(e);
	}
	get value() {
		return this.u;
	}
	get error() {
		return this.l;
	}
	get status() {
		return this.i;
	}
	render(e) {
		switch (this.i) {
			case 0: return e.initial?.();
			case 1: return e.pending?.();
			case 2: return e.complete?.(this.value);
			case 3: return e.error?.(this.error);
			default: throw Error("Unexpected status: " + this.i);
		}
	}
}, f = (e, t) => e === t || e.length === t.length && e.every(((e, n) => !o(e, t[n])));
//#endregion
//#region src/lib/timing.ts
function p(e, t) {
	let n = null, r = (...i) => {
		r.cancel(), n = setTimeout(() => t(...i), e);
	};
	return r.cancel = () => {
		n !== null && (clearTimeout(n), n = null);
	}, r;
}
//#endregion
//#region ~icons/svg-spinners/3-dots-fade
var m = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><circle cx=\"4\" cy=\"12\" r=\"3\" fill=\"currentColor\"><animate id=\"SVG7x14Dcom\" fill=\"freeze\" attributeName=\"opacity\" begin=\"0;SVGqSjG0dUp.end-0.25s\" dur=\"0.75s\" values=\"1;.2\"/></circle><circle cx=\"12\" cy=\"12\" r=\"3\" fill=\"currentColor\" opacity=\".4\"><animate fill=\"freeze\" attributeName=\"opacity\" begin=\"SVG7x14Dcom.begin+0.15s\" dur=\"0.75s\" values=\"1;.2\"/></circle><circle cx=\"20\" cy=\"12\" r=\"3\" fill=\"currentColor\" opacity=\".3\"><animate id=\"SVGqSjG0dUp\" fill=\"freeze\" attributeName=\"opacity\" begin=\"SVG7x14Dcom.begin+0.3s\" dur=\"0.75s\" values=\"1;.2\"/></circle></svg>";
	}
};
customElements.get("icon-svg-spinners-3-dots-fade") || customElements.define("icon-svg-spinners-3-dots-fade", m);
//#endregion
//#region src/components/combobox/Combobox.styles.css
var h = r`:host{flex-direction:column;align-items:flex-start;gap:5px;display:inline-flex;& label{color:var(--solid-ui-color-gray-600);font-size:var(--solid-ui-font-size-sm);font-weight:400}& wa-popup{width:100%;display:block}& wa-popup::part(popup){border:1px solid var(--solid-ui-color-gray-100);background:#fff;border-radius:5px;padding:4px;overflow:hidden;box-shadow:0 4px 16px #00000059}& .input-wrapper{width:100%;position:relative;& input{border:1px solid var(--solid-ui-color-gray-400);border-radius:5px;width:100%;padding:10px 40px 10px 10px}& icon-lucide-chevron-down{color:var(--solid-ui-color-gray-500);width:var(--solid-ui-font-size-lg);height:var(--solid-ui-font-size-lg);pointer-events:none;position:absolute;top:50%;right:15px;transform:translateY(-50%)}}& .listbox{max-height:inherit;flex-direction:column;gap:2px;display:flex;overflow:auto;& [role=option],& .non-selectable-option{color:var(--solid-ui-color-gray-700);border-radius:5px;padding:12px 8px}& [role=option]{cursor:pointer;&:hover,&[data-active]{background:var(--solid-ui-color-primary-hover)}&[aria-selected=true]{background:var(--solid-ui-color-primary-selected)}}& .non-selectable-option{justify-content:center;align-items:center;display:flex;& icon-svg-spinners-3-dots-fade{width:2rem}& .message--error{color:var(--solid-ui-color-error)}}}}`, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, N, P, ee, te, ne, re, ie, ae, oe, se, F, I, L, R, z, B, V, H, U, W, G, K, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be, xe, Se, Ce, we, Te, Ee;
function q(e, t, n) {
	De(e, t), t.set(e, n);
}
function De(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function J(e, t, n) {
	return e.set(Oe(e, t), n), n;
}
function Y(e, t) {
	return e.get(Oe(e, t));
}
function Oe(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function X(e, t, n) {
	return (t = Z(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function ke(e, t, n, r, i, a) {
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
				get: je(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || je(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return Me(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : Z(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function Z(e) {
	var t = Ae(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Ae(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function je(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function Me(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Ne(e) {
	return e;
}
var Q = class extends Error {};
function Pe(e) {
	return e;
}
ne = [e("solid-ui-combobox")];
var $;
new (Te = (v = /*#__PURE__*/ new WeakMap(), y = /*#__PURE__*/ new WeakMap(), b = /*#__PURE__*/ new WeakMap(), x = /*#__PURE__*/ new WeakMap(), S = /*#__PURE__*/ new WeakMap(), C = /*#__PURE__*/ new WeakMap(), w = /*#__PURE__*/ new WeakMap(), T = /*#__PURE__*/ new WeakMap(), E = /*#__PURE__*/ new WeakMap(), D = /*#__PURE__*/ new WeakMap(), O = /*#__PURE__*/ new WeakMap(), k = /*#__PURE__*/ new WeakMap(), A = /*#__PURE__*/ new WeakMap(), j = /*#__PURE__*/ new WeakMap(), M = /*#__PURE__*/ new WeakMap(), N = /*#__PURE__*/ new WeakMap(), P = /*#__PURE__*/ new WeakMap(), Ee = (re = s({
	type: String,
	reflect: !0
}), ae = s({
	type: String,
	reflect: !0
}), se = s(), I = s({
	type: String,
	reflect: !0
}), R = s({
	type: Boolean,
	reflect: !0
}), B = s({
	type: Boolean,
	reflect: !0,
	attribute: "select-only"
}), H = s({
	type: String,
	attribute: "async-options-url"
}), W = s({
	type: String,
	attribute: "async-options-results-field"
}), K = s({
	type: String,
	attribute: "async-options-label-field"
}), le = s({
	type: String,
	attribute: "async-options-value-field"
}), de = s({ type: Function }), pe = s({ type: Array }), he = l("input"), _e = c(), ye = c(), xe = c(), Ce = c(), "label"), _ = class extends t {
	get [Ee]() {
		return Y(v, this);
	}
	set label(e) {
		J(v, this, e);
	}
	get name() {
		return Y(y, this);
	}
	set name(e) {
		J(y, this, e);
	}
	get value() {
		return Y(b, this);
	}
	set value(e) {
		J(b, this, e);
	}
	get placeholder() {
		return Y(x, this);
	}
	set placeholder(e) {
		J(x, this, e);
	}
	get required() {
		return Y(S, this);
	}
	set required(e) {
		J(S, this, e);
	}
	get selectOnly() {
		return Y(C, this);
	}
	set selectOnly(e) {
		J(C, this, e);
	}
	get asyncOptionsUrl() {
		return Y(w, this);
	}
	set asyncOptionsUrl(e) {
		J(w, this, e);
	}
	get asyncOptionsResultsField() {
		return Y(T, this);
	}
	set asyncOptionsResultsField(e) {
		J(T, this, e);
	}
	get asyncOptionsLabelField() {
		return Y(E, this);
	}
	set asyncOptionsLabelField(e) {
		J(E, this, e);
	}
	get asyncOptionsValueField() {
		return Y(D, this);
	}
	set asyncOptionsValueField(e) {
		J(D, this, e);
	}
	get asyncOptionsProvider() {
		return Y(O, this);
	}
	set asyncOptionsProvider(e) {
		J(O, this, e);
	}
	get optionsFallback() {
		return Y(k, this);
	}
	set optionsFallback(e) {
		J(k, this, e);
	}
	get inputElement() {
		return Y(A, this);
	}
	set inputElement(e) {
		J(A, this, e);
	}
	get filter() {
		return Y(j, this);
	}
	set filter(e) {
		J(j, this, e);
	}
	get displayValue() {
		return Y(M, this);
	}
	set displayValue(e) {
		J(M, this, e);
	}
	get open() {
		return Y(N, this);
	}
	set open(e) {
		J(N, this, e);
	}
	get activeIndex() {
		return Y(P, this);
	}
	set activeIndex(e) {
		J(P, this, e);
	}
	constructor() {
		super(), q(this, v, (ee(this), ie(this, ""))), q(this, y, oe(this, "")), q(this, b, F(this, "")), q(this, x, L(this, "")), q(this, S, z(this, !1)), q(this, C, V(this, !1)), q(this, w, U(this, "")), q(this, T, G(this, "")), q(this, E, ce(this, "")), q(this, D, ue(this, "")), q(this, O, fe(this, null)), q(this, k, me(this, null)), q(this, A, ge(this, null)), q(this, j, ve(this, "")), q(this, M, be(this, "")), q(this, N, Se(this, !1)), q(this, P, we(this, -1)), X(this, "controlTrait", void 0), X(this, "openListenersAttached", !1), X(this, "updateDebouncedFilter", p(300, (e) => this.filter = e)), X(this, "asyncOptionsTask", void 0), X(this, "_selectedOption", void 0), X(this, "listboxId", void 0), X(this, "handleDocumentFocusIn", (e) => {
			e.composedPath().includes(this) || this.hide();
		}), X(this, "handleDocumentMouseDown", (e) => {
			e.composedPath().includes(this) || this.hide();
		}), this.controlTrait = this.addTrait(new n(this, {
			getControlElement: () => this.inputElement,
			getInternals: () => this.getInternals()
		})), this.listboxId = `listbox-${this.controlTrait.controlId}`;
	}
	get selectedOption() {
		return this._selectedOption;
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.removeOpenListeners();
	}
	willUpdate(e) {
		if (super.willUpdate(e), (e.has("asyncOptionsUrl") || e.has("asyncOptionsProvider")) && this.updateAsyncOptionsTask(), e.has("value")) {
			let e = this.getFilteredOptions(), t = e.find((e) => e.selectable !== !1 && e.value === this.value) ?? this.optionsFallback?.find((e) => e.value === this.value), n = t?.selectable !== !1 && t?.label;
			this.updateDisplayValue(n || this.value), this.open && (this.activeIndex = this.getInitialActiveIndex(e)), this._selectedOption && this._selectedOption.value !== this.value && (this._selectedOption = void 0);
		}
	}
	render() {
		let e = this.getFilteredOptions(), t = (this.open && this.activeIndex >= 0 ? e[this.activeIndex] : void 0) === void 0 ? void 0 : this.getOptionId(this.activeIndex), n = this.placeholder || "Combobox";
		return i`
      ${this.controlTrait.renderLabel()}
      <wa-popup
        placement="bottom"
        flip
        shift
        sync="width"
        auto-size="vertical"
        auto-size-padding="10"
        ?active=${this.open}
      >
        <div class="input-wrapper" slot="anchor" @mousedown=${this.onAnchorMouseDown}>
          <input
            id="${this.controlTrait.controlId}"
            type="text"
            name=${this.name}
            placeholder=${this.placeholder}
            role="combobox"
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-expanded=${this.open ? "true" : "false"}
            aria-controls=${this.listboxId}
            aria-activedescendant=${t ?? a}
            aria-labelledby=${this.label ? this.controlTrait.labelId : a}
            aria-label=${this.label ? a : n}
            aria-required=${this.required ? "true" : a}
            autocomplete="off"
            spellcheck="false"
            ?required=${this.required}
            .value=${this.displayValue}
            @keydown=${this.onInputKeyDown}
            @focus=${this.onInputFocus}
            @input=${() => this.selectOnly ? this.updateDisplayValue(this.inputElement?.value ?? "") : this.controlTrait.onInput()}
          />
          <icon-lucide-chevron-down></icon-lucide-chevron-down>
        </div>
        <div
          id=${this.listboxId}
          class="listbox"
          role="listbox"
          aria-orientation="vertical"
          aria-labelledby=${this.label ? this.controlTrait.labelId : a}
          aria-label=${this.label ? a : n}
          ?hidden=${!this.open}
          @mousedown=${this.onListboxMouseDown}
        >
          ${e.map((e, t) => e.selectable === !1 ? i`<div class="non-selectable-option">${e.template ?? e.label}</div>` : i`<div
                  id=${this.getOptionId(t)}
                  role="option"
                  aria-selected=${e.value === this.value ? "true" : "false"}
                  data-active=${t === this.activeIndex || a}
                  @mousemove=${() => this.setActiveIndex(t)}
                >
                  ${e.template ?? e.label}
                </div>`)}
        </div>
      </wa-popup>
    `;
	}
	getFilteredOptions() {
		return this.asyncOptionsTask ? this.asyncOptionsTask.render({
			initial: () => this.optionsFallback ?? [],
			complete: (e) => e,
			pending: () => [{
				value: "",
				label: "Loading...",
				template: i`<icon-svg-spinners-3-dots-fade></icon-svg-spinners-3-dots-fade>`,
				selectable: !1
			}],
			error: (e) => {
				let t = !(e instanceof Q), n = Object(e).message ?? "Something went wrong";
				return [{
					value: "",
					label: n,
					template: i`<span class="message message--${t ? "error" : "info"}">${n}</span>`,
					selectable: !1
				}];
			}
		}) : this.getOptionsFromDOM().filter((e) => String(e.label).toLowerCase().includes(this.filter));
	}
	getOptionsFromDOM() {
		let e = this.querySelectorAll("solid-ui-combobox-option");
		return Array.from(e).map((e) => ({
			value: e.value,
			label: e.textContent ?? ""
		}));
	}
	getOptionId(e) {
		return `${this.listboxId}-option-${e}`;
	}
	getInitialActiveIndex(e) {
		let t = e.findIndex((e) => e.value === this.value);
		return t >= 0 ? t : e.length > 0 ? 0 : -1;
	}
	getNextIndex(e, t, n) {
		return t.length === 0 ? -1 : (e + n + t.length) % t.length;
	}
	setActiveIndex(e) {
		this.activeIndex = e;
	}
	updateDisplayValue(e) {
		if (this.displayValue = String(e), this.open) {
			let e = this.displayValue.toLowerCase();
			this.asyncOptionsTask ? this.updateDebouncedFilter(e) : this.filter = e;
		}
	}
	updateAsyncOptionsTask() {
		if (!this.asyncOptionsUrl && !this.asyncOptionsProvider) {
			this.asyncOptionsTask = void 0;
			return;
		}
		this.asyncOptionsTask ??= new d(this, async ([e]) => {
			if (this.asyncOptionsProvider) {
				let t = await this.asyncOptionsProvider(e);
				if (t.length === 0) throw new Q("No results found");
				return t;
			}
			let t = await (await fetch(this.asyncOptionsUrl.replace("%search%", encodeURIComponent(e)))).json(), n = Array.from(this.asyncOptionsResultsField ? t[this.asyncOptionsResultsField] : t);
			if (n.length === 0) throw new Q("No results found");
			let r = this.asyncOptionsLabelField || "label", i = this.asyncOptionsValueField || "value";
			return n.map((e) => ({
				label: String(Object(e)[r]),
				value: Object(e)[i]
			}));
		}, () => [this.filter]);
	}
	show(e) {
		if (this.open) return;
		let t = this.getFilteredOptions();
		t.length !== 0 && (this.open = !0, this.activeIndex = e?.focusLast ? t.length - 1 : this.getInitialActiveIndex(t), this.addOpenListeners(), requestAnimationFrame(() => this.scrollActiveOptionIntoView()));
	}
	hide() {
		this.open && (this.filter = "", this.open = !1, this.activeIndex = -1, this.removeOpenListeners(), this.updateDebouncedFilter.cancel());
	}
	selectOption(e) {
		let t = this.value;
		this._selectedOption = e, this.hide(), this.controlTrait.setValue(e.value), this.inputElement?.focus({ preventScroll: !0 }), this.dispatchEvent(new CustomEvent("change", {
			bubbles: !0,
			composed: !0,
			detail: { option: e }
		})), t === this.value && this.updateDisplayValue(e.label);
	}
	scrollActiveOptionIntoView() {
		this.activeIndex < 0 || this.shadowRoot?.querySelector(`#${this.getOptionId(this.activeIndex)}`)?.scrollIntoView({ block: "nearest" });
	}
	addOpenListeners() {
		if (this.openListenersAttached) return;
		document.addEventListener("focusin", this.handleDocumentFocusIn), document.addEventListener("mousedown", this.handleDocumentMouseDown);
		let e = this.getRootNode();
		e !== document && e.addEventListener("focusin", this.handleDocumentFocusIn), this.openListenersAttached = !0;
	}
	removeOpenListeners() {
		if (!this.openListenersAttached) return;
		document.removeEventListener("focusin", this.handleDocumentFocusIn), document.removeEventListener("mousedown", this.handleDocumentMouseDown);
		let e = this.getRootNode();
		e !== document && e.removeEventListener("focusin", this.handleDocumentFocusIn), this.openListenersAttached = !1;
	}
	onAnchorMouseDown(e) {
		e.target !== this.inputElement && (e.preventDefault(), this.inputElement?.focus({ preventScroll: !0 }));
	}
	onInputFocus() {
		this.show();
	}
	openPopupFromKey(e) {
		this.open || this.show({ focusLast: e });
	}
	onInputKeyDown(e) {
		let t = this.getFilteredOptions();
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault(), this.open ? (this.activeIndex = this.getNextIndex(this.activeIndex, t, 1), this.scrollActiveOptionIntoView()) : this.openPopupFromKey(!1);
				break;
			case "ArrowUp":
				e.preventDefault(), this.open ? (this.activeIndex = this.getNextIndex(this.activeIndex, t, -1), this.scrollActiveOptionIntoView()) : this.openPopupFromKey(!0);
				break;
			case "Enter":
				this.open && this.activeIndex >= 0 && t[this.activeIndex] ? (e.preventDefault(), this.selectOption(t[this.activeIndex])) : this.open || (e.preventDefault(), this.controlTrait.onSubmit());
				break;
			case "Escape":
				this.open && (e.preventDefault(), e.stopPropagation(), this.hide(), this.inputElement?.focus({ preventScroll: !0 }));
				break;
			case "Tab":
				this.hide();
				break;
			default: this.open || this.show();
		}
	}
	onListboxMouseDown(e) {
		if (e.preventDefault(), !(e.target instanceof HTMLElement)) return;
		let t = e.target.closest("[role=\"option\"]");
		if (!t) return;
		let n = t.id, r = Number.parseInt(n.replace(`${this.listboxId}-option-`, ""), 10), i = this.getFilteredOptions()[r];
		i && this.selectOption(i);
	}
}, {e: [ie, oe, F, L, z, V, U, G, ce, ue, fe, me, ge, ve, be, Se, we, ee], c: [$, te]} = ke(_, [
	[
		re,
		1,
		"label"
	],
	[
		ae,
		1,
		"name"
	],
	[
		se,
		1,
		"value"
	],
	[
		I,
		1,
		"placeholder"
	],
	[
		R,
		1,
		"required"
	],
	[
		B,
		1,
		"selectOnly"
	],
	[
		H,
		1,
		"asyncOptionsUrl"
	],
	[
		W,
		1,
		"asyncOptionsResultsField"
	],
	[
		K,
		1,
		"asyncOptionsLabelField"
	],
	[
		le,
		1,
		"asyncOptionsValueField"
	],
	[
		de,
		1,
		"asyncOptionsProvider"
	],
	[
		pe,
		1,
		"optionsFallback"
	],
	[
		he,
		1,
		"inputElement"
	],
	[
		_e,
		1,
		"filter"
	],
	[
		ye,
		1,
		"displayValue"
	],
	[
		xe,
		1,
		"open"
	],
	[
		Ce,
		1,
		"activeIndex"
	]
], ne, 0, void 0, t), _), g = class extends Ne {
	constructor() {
		super($), X(this, "styles", h), X(this, "formAssociated", !0), te();
	}
}, X(g, Te, void 0), g)();
//#endregion
//#region src/components/combobox/index.ts
var Fe = $;
//#endregion
export { $ as n, Pe as r, Fe as t };

//# sourceMappingURL=combobox-DyO8cvOM.js.map