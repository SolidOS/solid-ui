import { customElement as e } from "../../lib/components/decorators.esm.js";
import t from "../../lib/components/web-component/WebComponent.esm.js";
import n from "../../lib/components/traits/FormControlTrait.esm.js";
import "../../lib/components/index.esm.js";
import "../../_virtual/~icons/lucide/chevron-down.esm.js";
import { debounce as r } from "../../lib/timing.esm.js";
import "../../_virtual/~icons/svg-spinners/3-dots-fade.esm.js";
import i from "./Combobox.styles.esm.js";
import { html as a, nothing as o } from "lit";
import { property as s, query as c, state as l } from "lit/decorators.js";
import { Task as u } from "@lit/task";
import "@awesome.me/webawesome/dist/components/popup/popup.js";
//#region src/components/combobox/Combobox.ts
var d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, ee, te, ne, re, ie, ae, oe, N, P, F, I, L, R, z, B, V, H, U, W, G, K, q, se, ce, le, ue, de, fe, pe, me, he, ge, _e, ve, ye, be;
function J(e, t, n) {
	xe(e, t), t.set(e, n);
}
function xe(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function Y(e, t, n) {
	return e.set(Se(e, t), n), n;
}
function X(e, t) {
	return e.get(Se(e, t));
}
function Se(e, t, n) {
	if (typeof e == "function" ? e === t : e.has(t)) return arguments.length < 3 ? t : n;
	throw TypeError("Private element is not present on this object");
}
function Z(e, t, n) {
	return (t = we(t)) in e ? Object.defineProperty(e, t, {
		value: n,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = n, e;
}
function Ce(e, t, n, r, i, a) {
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
				get: Ee(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || Ee(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return De(t) === e;
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
				l(v ? e : e.prototype, p, _, g ? "#" + h : we(h), m, r, v ? a ||= [] : i ||= [], o, v, g, y, m === 1, v && g ? c : n);
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
function we(e) {
	var t = Te(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function Te(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function Ee(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function De(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function Oe(e) {
	return e;
}
var Q = class extends Error {};
function ke(e) {
	return e;
}
M = [e("solid-ui-combobox")];
var $;
new (ye = (p = /*#__PURE__*/ new WeakMap(), m = /*#__PURE__*/ new WeakMap(), h = /*#__PURE__*/ new WeakMap(), g = /*#__PURE__*/ new WeakMap(), _ = /*#__PURE__*/ new WeakMap(), v = /*#__PURE__*/ new WeakMap(), y = /*#__PURE__*/ new WeakMap(), b = /*#__PURE__*/ new WeakMap(), x = /*#__PURE__*/ new WeakMap(), S = /*#__PURE__*/ new WeakMap(), C = /*#__PURE__*/ new WeakMap(), w = /*#__PURE__*/ new WeakMap(), T = /*#__PURE__*/ new WeakMap(), E = /*#__PURE__*/ new WeakMap(), D = /*#__PURE__*/ new WeakMap(), O = /*#__PURE__*/ new WeakMap(), k = /*#__PURE__*/ new WeakMap(), be = (ee = s({
	type: String,
	reflect: !0
}), ne = s({
	type: String,
	reflect: !0
}), ie = s(), oe = s({
	type: String,
	reflect: !0
}), P = s({
	type: Boolean,
	reflect: !0
}), I = s({
	type: Boolean,
	reflect: !0,
	attribute: "select-only"
}), R = s({
	type: String,
	attribute: "async-options-url"
}), B = s({
	type: String,
	attribute: "async-options-results-field"
}), H = s({
	type: String,
	attribute: "async-options-label-field"
}), W = s({
	type: String,
	attribute: "async-options-value-field"
}), K = s({ type: Function }), se = s({ type: Array }), le = c("input"), de = l(), pe = l(), he = l(), _e = l(), "label"), f = class extends t {
	get [be]() {
		return X(p, this);
	}
	set label(e) {
		Y(p, this, e);
	}
	get name() {
		return X(m, this);
	}
	set name(e) {
		Y(m, this, e);
	}
	get value() {
		return X(h, this);
	}
	set value(e) {
		Y(h, this, e);
	}
	get placeholder() {
		return X(g, this);
	}
	set placeholder(e) {
		Y(g, this, e);
	}
	get required() {
		return X(_, this);
	}
	set required(e) {
		Y(_, this, e);
	}
	get selectOnly() {
		return X(v, this);
	}
	set selectOnly(e) {
		Y(v, this, e);
	}
	get asyncOptionsUrl() {
		return X(y, this);
	}
	set asyncOptionsUrl(e) {
		Y(y, this, e);
	}
	get asyncOptionsResultsField() {
		return X(b, this);
	}
	set asyncOptionsResultsField(e) {
		Y(b, this, e);
	}
	get asyncOptionsLabelField() {
		return X(x, this);
	}
	set asyncOptionsLabelField(e) {
		Y(x, this, e);
	}
	get asyncOptionsValueField() {
		return X(S, this);
	}
	set asyncOptionsValueField(e) {
		Y(S, this, e);
	}
	get asyncOptionsProvider() {
		return X(C, this);
	}
	set asyncOptionsProvider(e) {
		Y(C, this, e);
	}
	get optionsFallback() {
		return X(w, this);
	}
	set optionsFallback(e) {
		Y(w, this, e);
	}
	get inputElement() {
		return X(T, this);
	}
	set inputElement(e) {
		Y(T, this, e);
	}
	get filter() {
		return X(E, this);
	}
	set filter(e) {
		Y(E, this, e);
	}
	get displayValue() {
		return X(D, this);
	}
	set displayValue(e) {
		Y(D, this, e);
	}
	get open() {
		return X(O, this);
	}
	set open(e) {
		Y(O, this, e);
	}
	get activeIndex() {
		return X(k, this);
	}
	set activeIndex(e) {
		Y(k, this, e);
	}
	constructor() {
		super(), J(this, p, (A(this), te(this, ""))), J(this, m, re(this, "")), J(this, h, ae(this, "")), J(this, g, N(this, "")), J(this, _, F(this, !1)), J(this, v, L(this, !1)), J(this, y, z(this, "")), J(this, b, V(this, "")), J(this, x, U(this, "")), J(this, S, G(this, "")), J(this, C, q(this, null)), J(this, w, ce(this, null)), J(this, T, ue(this, null)), J(this, E, fe(this, "")), J(this, D, me(this, "")), J(this, O, ge(this, !1)), J(this, k, ve(this, -1)), Z(this, "controlTrait", void 0), Z(this, "openListenersAttached", !1), Z(this, "updateDebouncedFilter", r(300, (e) => this.filter = e)), Z(this, "asyncOptionsTask", void 0), Z(this, "_selectedOption", void 0), Z(this, "listboxId", void 0), Z(this, "handleDocumentFocusIn", (e) => {
			e.composedPath().includes(this) || this.hide();
		}), Z(this, "handleDocumentMouseDown", (e) => {
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
		return a`
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
            aria-activedescendant=${t ?? o}
            aria-labelledby=${this.label ? this.controlTrait.labelId : o}
            aria-label=${this.label ? o : n}
            aria-required=${this.required ? "true" : o}
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
          aria-labelledby=${this.label ? this.controlTrait.labelId : o}
          aria-label=${this.label ? o : n}
          ?hidden=${!this.open}
          @mousedown=${this.onListboxMouseDown}
        >
          ${e.map((e, t) => e.selectable === !1 ? a`<div class="non-selectable-option">${e.template ?? e.label}</div>` : a`<div
                  id=${this.getOptionId(t)}
                  role="option"
                  aria-selected=${e.value === this.value ? "true" : "false"}
                  data-active=${t === this.activeIndex || o}
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
				template: a`<icon-svg-spinners-3-dots-fade></icon-svg-spinners-3-dots-fade>`,
				selectable: !1
			}],
			error: (e) => {
				let t = !(e instanceof Q), n = Object(e).message ?? "Something went wrong";
				return [{
					value: "",
					label: n,
					template: a`<span class="message message--${t ? "error" : "info"}">${n}</span>`,
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
		this.asyncOptionsTask ??= new u(this, async ([e]) => {
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
}, {e: [te, re, ae, N, F, L, z, V, U, G, q, ce, ue, fe, me, ge, ve, A], c: [$, j]} = Ce(f, [
	[
		ee,
		1,
		"label"
	],
	[
		ne,
		1,
		"name"
	],
	[
		ie,
		1,
		"value"
	],
	[
		oe,
		1,
		"placeholder"
	],
	[
		P,
		1,
		"required"
	],
	[
		I,
		1,
		"selectOnly"
	],
	[
		R,
		1,
		"asyncOptionsUrl"
	],
	[
		B,
		1,
		"asyncOptionsResultsField"
	],
	[
		H,
		1,
		"asyncOptionsLabelField"
	],
	[
		W,
		1,
		"asyncOptionsValueField"
	],
	[
		K,
		1,
		"asyncOptionsProvider"
	],
	[
		se,
		1,
		"optionsFallback"
	],
	[
		le,
		1,
		"inputElement"
	],
	[
		de,
		1,
		"filter"
	],
	[
		pe,
		1,
		"displayValue"
	],
	[
		he,
		1,
		"open"
	],
	[
		_e,
		1,
		"activeIndex"
	]
], M, 0, void 0, t), f), d = class extends Oe {
	constructor() {
		super($), Z(this, "styles", i), Z(this, "formAssociated", !0), j();
	}
}, Z(d, ye, void 0), d)();
//#endregion
export { $ as default, ke as defineAsyncComboboxOptionsProvider };

//# sourceMappingURL=Combobox.esm.js.map