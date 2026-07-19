import { customElement as e } from "../../lib/components/decorators.esm.js";
import t from "../../lib/components/form-control-component/FormControlComponent.esm.js";
import "../../lib/components/index.esm.js";
import "../../_virtual/~icons/lucide/chevron-down.esm.js";
import { debounce as n } from "../../lib/timing.esm.js";
import "../../_virtual/~icons/svg-spinners/3-dots-fade.esm.js";
import r from "./Combobox.styles.esm.js";
import { html as i, nothing as a } from "lit";
import { property as o, query as s, state as c } from "lit/decorators.js";
import { Task as l } from "@lit/task";
import "@awesome.me/webawesome/dist/components/popup/popup.js";
//#region src/components/combobox/Combobox.ts
var u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E, D, O, k, A, j, M, ee, te, ne, re, ie, ae, N, P, F, I, L, R, z, B, V, H, U, W, G, K;
function q(e, t, n) {
	oe(e, t), t.set(e, n);
}
function oe(e, t) {
	if (t.has(e)) throw TypeError("Cannot initialize the same private elements twice on an object");
}
function J(e, t, n) {
	return e.set(se(e, t), n), n;
}
function Y(e, t) {
	return e.get(se(e, t));
}
function se(e, t, n) {
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
function ce(e, t, n, r, i, a) {
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
				get: ue(function() {
					return v(this);
				}, r, "get"),
				set: function(e) {
					t[4](this, e);
				}
			} : b[S] = v, f || ue(b[S], r, i === 2 ? "" : S)) : f || (b = Object.getOwnPropertyDescriptor(e, r));
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
			return de(t) === e;
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
	var t = le(e, "string");
	return typeof t == "symbol" ? t : t + "";
}
function le(e, t) {
	if (typeof e != "object" || !e) return e;
	var n = e[Symbol.toPrimitive];
	if (n !== void 0) {
		var r = n.call(e, t || "default");
		if (typeof r != "object") return r;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (t === "string" ? String : Number)(e);
}
function ue(e, t, n) {
	typeof t == "symbol" && (t = (t = t.description) ? "[" + t + "]" : "");
	try {
		Object.defineProperty(e, "name", {
			configurable: !0,
			value: n ? n + " " + t : t
		});
	} catch {}
	return e;
}
function de(e) {
	if (Object(e) !== e) throw TypeError("right-hand side of 'in' should be an object, got " + (e === null ? "null" : typeof e));
	return e;
}
function fe(e) {
	return e;
}
var Q = class extends Error {};
function pe(e) {
	return e;
}
E = [e("solid-ui-combobox")];
var $;
new (G = (f = /*#__PURE__*/ new WeakMap(), p = /*#__PURE__*/ new WeakMap(), m = /*#__PURE__*/ new WeakMap(), h = /*#__PURE__*/ new WeakMap(), g = /*#__PURE__*/ new WeakMap(), _ = /*#__PURE__*/ new WeakMap(), v = /*#__PURE__*/ new WeakMap(), y = /*#__PURE__*/ new WeakMap(), b = /*#__PURE__*/ new WeakMap(), x = /*#__PURE__*/ new WeakMap(), S = /*#__PURE__*/ new WeakMap(), C = /*#__PURE__*/ new WeakMap(), K = (D = o({
	type: Boolean,
	reflect: !0,
	attribute: "select-only"
}), k = o({
	type: String,
	attribute: "async-options-url"
}), j = o({
	type: String,
	attribute: "async-options-results-field"
}), ee = o({
	type: String,
	attribute: "async-options-label-field"
}), ne = o({
	type: String,
	attribute: "async-options-value-field"
}), ie = o({ type: Function }), N = o({ type: Array }), F = s("input"), L = c(), z = c(), V = c(), U = c(), "selectOnly"), d = class extends t {
	get [K]() {
		return Y(f, this);
	}
	set selectOnly(e) {
		J(f, this, e);
	}
	get asyncOptionsUrl() {
		return Y(p, this);
	}
	set asyncOptionsUrl(e) {
		J(p, this, e);
	}
	get asyncOptionsResultsField() {
		return Y(m, this);
	}
	set asyncOptionsResultsField(e) {
		J(m, this, e);
	}
	get asyncOptionsLabelField() {
		return Y(h, this);
	}
	set asyncOptionsLabelField(e) {
		J(h, this, e);
	}
	get asyncOptionsValueField() {
		return Y(g, this);
	}
	set asyncOptionsValueField(e) {
		J(g, this, e);
	}
	get asyncOptionsProvider() {
		return Y(_, this);
	}
	set asyncOptionsProvider(e) {
		J(_, this, e);
	}
	get optionsFallback() {
		return Y(v, this);
	}
	set optionsFallback(e) {
		J(v, this, e);
	}
	get controlElement() {
		return Y(y, this);
	}
	set controlElement(e) {
		J(y, this, e);
	}
	get filter() {
		return Y(b, this);
	}
	set filter(e) {
		J(b, this, e);
	}
	get displayValue() {
		return Y(x, this);
	}
	set displayValue(e) {
		J(x, this, e);
	}
	get open() {
		return Y(S, this);
	}
	set open(e) {
		J(S, this, e);
	}
	get activeIndex() {
		return Y(C, this);
	}
	set activeIndex(e) {
		J(C, this, e);
	}
	constructor() {
		super(), q(this, f, (w(this), O(this, !1))), q(this, p, A(this, "")), q(this, m, M(this, "")), q(this, h, te(this, "")), q(this, g, re(this, "")), q(this, _, ae(this, null)), q(this, v, P(this, null)), q(this, y, I(this, null)), q(this, b, R(this, "")), q(this, x, B(this, "")), q(this, S, H(this, !1)), q(this, C, W(this, -1)), X(this, "openListenersAttached", !1), X(this, "updateDebouncedFilter", n(300, (e) => this.filter = e)), X(this, "asyncOptionsTask", void 0), X(this, "_selectedOption", void 0), X(this, "listboxId", void 0), X(this, "handleDocumentFocusIn", (e) => {
			e.composedPath().includes(this) || this.hide();
		}), X(this, "handleDocumentMouseDown", (e) => {
			e.composedPath().includes(this) || this.hide();
		}), this.listboxId = `listbox-${this.controlTrait.controlId}`;
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
            @input=${() => this.selectOnly ? this.updateDisplayValue(this.controlElement?.value ?? "") : this.controlTrait.onInput()}
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
		if (this.displayValue = e ? String(e) : "", this.open) {
			let e = this.displayValue.toLowerCase();
			this.asyncOptionsTask ? this.updateDebouncedFilter(e) : this.filter = e;
		}
	}
	updateAsyncOptionsTask() {
		if (!this.asyncOptionsUrl && !this.asyncOptionsProvider) {
			this.asyncOptionsTask = void 0;
			return;
		}
		this.asyncOptionsTask ??= new l(this, async ([e]) => {
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
		this._selectedOption = e, this.hide(), this.controlTrait.setValue(e.value), this.controlElement?.focus({ preventScroll: !0 }), this.dispatchEvent(new CustomEvent("change", {
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
		e.target !== this.controlElement && (e.preventDefault(), this.controlElement?.focus({ preventScroll: !0 }));
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
				this.open && (e.preventDefault(), e.stopPropagation(), this.hide(), this.controlElement?.focus({ preventScroll: !0 }));
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
}, {e: [O, A, M, te, re, ae, P, I, R, B, H, W, w], c: [$, T]} = ce(d, [
	[
		D,
		1,
		"selectOnly"
	],
	[
		k,
		1,
		"asyncOptionsUrl"
	],
	[
		j,
		1,
		"asyncOptionsResultsField"
	],
	[
		ee,
		1,
		"asyncOptionsLabelField"
	],
	[
		ne,
		1,
		"asyncOptionsValueField"
	],
	[
		ie,
		1,
		"asyncOptionsProvider"
	],
	[
		N,
		1,
		"optionsFallback"
	],
	[
		F,
		1,
		"controlElement"
	],
	[
		L,
		1,
		"filter"
	],
	[
		z,
		1,
		"displayValue"
	],
	[
		V,
		1,
		"open"
	],
	[
		U,
		1,
		"activeIndex"
	]
], E, 0, void 0, t), d), u = class extends fe {
	constructor() {
		super($), X(this, "styles", r), T();
	}
}, X(u, G, void 0), u)();
//#endregion
export { $ as default, pe as defineAsyncComboboxOptionsProvider };

//# sourceMappingURL=Combobox.esm.js.map