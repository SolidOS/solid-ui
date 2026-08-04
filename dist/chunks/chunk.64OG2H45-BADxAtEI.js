import { i as e, l as t, p as n, s as r, u as i } from "./components-DrP7BOrs.js";
import { t as a } from "./query-BYu9q8lA.js";
//#region node_modules/@lit/reactive-element/decorators/custom-element.js
var o = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
}, s = class extends Event {
	constructor() {
		super("wa-reposition", {
			bubbles: !0,
			cancelable: !1,
			composed: !0
		});
	}
}, c = n`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`, l = Object.defineProperty, u = Object.getOwnPropertyDescriptor, d = (e) => {
	throw TypeError(e);
}, f = (e, t, n, r) => {
	for (var i = r > 1 ? void 0 : r ? u(t, n) : t, a = e.length - 1, o; a >= 0; a--) (o = e[a]) && (i = (r ? o(t, n, i) : o(i)) || i);
	return r && i && l(t, n, i), i;
}, p = (e, t, n) => t.has(e) || d("Cannot " + n), m = (e, t, n) => (p(e, t, "read from private field"), n ? n.call(e) : t.get(e)), h = (e, t, n) => t.has(e) ? d("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), g = (e, t, n, r) => (p(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n), _ = n`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden],
  :host([hidden]) {
    display: none !important;
  }
`, v = /;\s+$/;
function y(e) {
	return e.replace(/[A-Z]/g, (e) => `-${e.toLowerCase()}`);
}
function b(e) {
	let { property: t, value: n, element: r } = e;
	if (n) {
		let e = r.getAttribute("style") || "";
		e && (e.match(v) || (e += ";"), e += " ");
		let i = `${t}: ${n}`;
		return e.includes(i) ? void 0 : `${e}${i};`;
	}
	return null;
}
var x, S = class extends r {
	constructor() {
		super(), h(this, x, !1), this.initialReflectedProperties = /* @__PURE__ */ new Map(), this.didSSR = !!this.shadowRoot, this.customStates = {
			set: (e, t) => {
				if (this.internals?.states) try {
					t ? this.internals.states.add(e) : this.internals.states.delete(e);
				} catch (e) {
					if (String(e).includes("must start with '--'")) console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");
					else throw e;
				}
			},
			has: (e) => {
				if (!this.internals?.states) return !1;
				try {
					return this.internals.states.has(e);
				} catch {
					return !1;
				}
			}
		};
		try {
			this.internals = this.attachInternals();
		} catch {
			console.error("Element internals are not supported in your browser. Consider using a polyfill");
		}
		this.customStates.set("wa-defined", !0);
		let e = this.constructor;
		for (let [t, n] of e.elementProperties) n.default === "inherit" && n.initial !== void 0 && typeof t == "string" && this.customStates.set(`initial-${t}-${n.initial}`, !0);
	}
	static get styles() {
		return [_, ...Array.isArray(this.css) ? this.css : this.css ? [this.css] : []];
	}
	connectedCallback() {
		super.connectedCallback(), this.didSSR || this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-", "")} `)), this.didSSR && this.updateComplete.then(() => {
			this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-", "")} `));
		});
	}
	attributeChangedCallback(e, t, n) {
		m(this, x) || (this.constructor.elementProperties.forEach((e, t) => {
			e.reflect && this[t] != null && this.initialReflectedProperties.set(t, this[t]);
		}), g(this, x, !0)), super.attributeChangedCallback(e, t, n);
	}
	willUpdate(e) {
		super.willUpdate(e), this.initialReflectedProperties.forEach((t, n) => {
			e.has(n) && this[n] == null && (this[n] = t);
		});
	}
	firstUpdated(e) {
		super.firstUpdated(e), this.didSSR && this.shadowRoot?.querySelectorAll("slot").forEach((e) => {
			e.dispatchEvent(new Event("slotchange", {
				bubbles: !0,
				composed: !1,
				cancelable: !1
			}));
		});
	}
	update(e) {
		try {
			super.update(e);
		} catch (e) {
			if (this.didSSR && !this.hasUpdated) {
				let t = new Event("lit-hydration-error", {
					bubbles: !0,
					composed: !0,
					cancelable: !1
				});
				t.error = e, this.dispatchEvent(t);
			}
			throw e;
		}
	}
	setStyle(e, t) {
		if (!this.style) {
			let n = b({
				property: y(e),
				value: t,
				element: this
			});
			n && this.setAttribute("style", n);
			return;
		}
		this.style[e] = t;
	}
	setStyleProperty(e, t) {
		if (!this.style) {
			let n = b({
				property: e,
				value: t,
				element: this
			});
			n && this.setAttribute("style", n);
			return;
		}
		this.style.setProperty(e, t);
	}
	relayNativeEvent(e, t) {
		e.stopImmediatePropagation(), this.dispatchEvent(new e.constructor(e.type, {
			...e,
			...t
		}));
	}
};
x = /* @__PURE__ */ new WeakMap(), f([e()], S.prototype, "dir", 2), f([e()], S.prototype, "lang", 2), f([e({
	type: Boolean,
	reflect: !0,
	attribute: "did-ssr"
})], S.prototype, "didSSR", 2);
//#endregion
//#region node_modules/@shoelace-style/localize/dist/index.js
var C = /* @__PURE__ */ new Set(), w = /* @__PURE__ */ new Map(), T, E = "ltr", D = "en", ee = typeof MutationObserver < "u" && typeof document < "u" && document.documentElement !== void 0;
if (ee) {
	let e = new MutationObserver(k);
	E = document.documentElement.dir || "ltr", D = document.documentElement.lang || navigator.language, e.observe(document.documentElement, {
		attributes: !0,
		attributeFilter: ["dir", "lang"]
	});
}
function O(...e) {
	e.map((e) => {
		let t = e.$code.toLowerCase();
		w.has(t) ? w.set(t, Object.assign(Object.assign({}, w.get(t)), e)) : w.set(t, e), T ||= e;
	}), k();
}
function k() {
	ee && (E = document.documentElement.dir || "ltr", D = document.documentElement.lang || navigator.language), [...C.keys()].map((e) => {
		typeof e.requestUpdate == "function" && e.requestUpdate();
	});
}
var A = class {
	constructor(e) {
		this.host = e, this.host.addController(this);
	}
	hostConnected() {
		C.add(this.host);
	}
	hostDisconnected() {
		C.delete(this.host);
	}
	dir() {
		return `${this.host.dir || E}`.toLowerCase();
	}
	lang() {
		let e = `${this.host.lang || D}`.toLowerCase().replace(/_/g, "-");
		try {
			return new Intl.Locale(e), e;
		} catch {
			return T ? T.$code.toLowerCase() : "en";
		}
	}
	getTranslationData(e) {
		let t;
		try {
			t = new Intl.Locale(e.replace(/_/g, "-"));
		} catch {
			return {
				locale: void 0,
				language: "",
				region: "",
				primary: void 0,
				secondary: void 0
			};
		}
		let n = t.language.toLowerCase(), r = t.region?.toLowerCase() ?? "", i = w.get(`${n}-${r}`), a = w.get(n);
		return {
			locale: t,
			language: n,
			region: r,
			primary: i,
			secondary: a
		};
	}
	exists(e, t) {
		let { primary: n, secondary: r } = this.getTranslationData(t.lang ?? this.lang());
		return t = Object.assign({ includeFallback: !1 }, t), !!(n && n[e] || r && r[e] || t.includeFallback && T && T[e]);
	}
	term(e, ...t) {
		let { primary: n, secondary: r } = this.getTranslationData(this.lang()), i;
		if (n && n[e]) i = n[e];
		else if (r && r[e]) i = r[e];
		else if (T && T[e]) i = T[e];
		else return console.error(`No translation found for: ${String(e)}`), String(e);
		return typeof i == "function" ? i(...t) : i;
	}
	date(e, t) {
		return e = new Date(e), new Intl.DateTimeFormat(this.lang(), t).format(e);
	}
	number(e, t) {
		return e = Number(e), isNaN(e) ? "" : new Intl.NumberFormat(this.lang(), t).format(e);
	}
	relativeTime(e, t, n) {
		return new Intl.RelativeTimeFormat(this.lang(), n).format(e, t);
	}
}, j = {
	$code: "en",
	$name: "English",
	$dir: "ltr",
	am: "AM",
	autosizeColumn: "Autosize column",
	captions: "Captions",
	carousel: "Carousel",
	chooseDate: "Choose date",
	chooseDecade: "Choose decade",
	chooseMonth: "Choose month",
	chooseTime: "Choose time",
	chooseYear: "Choose year",
	clearEntry: "Clear entry",
	clearFilter: "Clear filter",
	clearSort: "Clear sort",
	close: "Close",
	closeCalendar: "Close calendar",
	closeTimeInput: "Close time picker",
	collapseRow: "Collapse row",
	columnMenu: "Column options",
	columnMovedToPosition: (e, t, n) => `${e} moved to position ${t} of ${n}`,
	columns: "Columns",
	compactPageXOfY: (e, t) => `${e} of ${t}`,
	copied: "Copied",
	copy: "Copy",
	createOption: (e) => `Create "${e}"`,
	currentlyPlaying: "currently playing",
	currentValue: "Current value",
	date: "Date",
	datePickerKeyboardHelp: "Use arrow keys to change values; press Alt+Down Arrow to open the calendar.",
	day: "Day",
	dayPeriod: "AM/PM",
	decrement: "Decrement",
	deselectAllRows: "Deselect all rows",
	dropFileHere: "Drop file here or click to browse",
	dropFilesHere: "Drop files here or click to browse",
	empty: "Empty",
	endDate: "End date",
	enterFullscreen: "Enter fullscreen",
	error: "Error",
	exitFullscreen: "Exit fullscreen",
	expandRow: "Expand row",
	filterByColumn: (e) => `Filter by ${e}`,
	filterFrom: "From",
	filterMax: "Max",
	filterMin: "Min",
	filterTo: "To",
	firstPage: "First page",
	goToSlide: (e, t) => `Go to slide ${e} of ${t}`,
	hideColumn: "Hide column",
	hidePassword: "Hide password",
	hour: "Hour",
	incompleteDate: "Enter a valid date.",
	increment: "Increment",
	jumpBackwardX: (e) => `Jump back ${e} pages`,
	jumpForwardX: (e) => `Jump forward ${e} pages`,
	lastPage: "Last page",
	loading: "Loading",
	minute: "Minute",
	month: "Month",
	moreOptions: "More Options",
	mute: "Mute",
	nextDecade: "Next decade",
	nextMonth: "Next month",
	nextPage: "Next page",
	nextSlide: "Next slide",
	nextVideo: "Next Video",
	nextYear: "Next year",
	noData: "No data",
	noResults: "No matching results",
	now: "Now",
	numCharacters: (e) => e === 1 ? "1 character" : `${e} characters`,
	numCharactersRemaining: (e) => e === 1 ? "1 character remaining" : `${e} characters remaining`,
	numOptionsSelected: (e) => e === 0 ? "No options selected" : e === 1 ? "1 option selected" : `${e} options selected`,
	numRowsCopied: (e) => e === 1 ? "1 row copied" : `${e} rows copied`,
	numRowsSelected: (e) => e === 1 ? "1 row selected" : `${e} rows selected`,
	pageXOfY: (e, t) => `Page ${e} of ${t}`,
	pagination: "Pagination",
	pause: "Pause",
	pauseAnimation: "Pause animation",
	pictureInPicture: "Picture in picture",
	pinLeft: "Pin left",
	pinRight: "Pin right",
	play: "Play",
	playAnimation: "Play animation",
	playbackSpeed: "Playback speed",
	playlist: "Playlist",
	pm: "PM",
	previousDecade: "Previous decade",
	previousMonth: "Previous month",
	previousPage: "Previous page",
	previousSlide: "Previous slide",
	previousVideo: "Previous video",
	previousYear: "Previous year",
	progress: "Progress",
	rangeTooLong: (e) => e === 1 ? "Select a range no longer than 1 day" : `Select a range no longer than ${e} days`,
	rangeTooShort: (e) => e === 1 ? "Select a range at least 1 day long" : `Select a range at least ${e} days long`,
	readonly: "Read-only",
	remove: "Remove",
	resetColumns: "Reset columns",
	resize: "Resize",
	resizeColumn: "Resize column",
	rowsPerPage: "Rows per page",
	scrollableRegion: "Scrollable region",
	scrollToEnd: "Scroll to end",
	scrollToStart: "Scroll to start",
	search: "Search",
	second: "Second",
	seek: "Seek",
	seekProgress: (e, t) => `${e} of ${t}`,
	selectAColorFromTheScreen: "Select a color from the screen",
	selectAllRows: "Select all rows",
	selected: "Selected",
	selectedDateLabel: (e) => `Selected: ${e}`,
	selectedRangeLabel: (e) => `Selected range: ${e}`,
	selectGroup: "Select group",
	selectionCleared: "Selection cleared",
	selectRow: "Select row",
	showingNofMRows: (e, t) => `Showing ${e} of ${t} rows`,
	showingXtoYofZ: (e, t, n) => `${e}\u2013${t} of ${n}`,
	showPassword: "Show password",
	slideNum: (e) => `Slide ${e}`,
	sortAscending: "Sort ascending",
	sortColumn: "Sort column",
	sortDescending: "Sort descending",
	startDate: "Start date",
	time: "Time",
	timeInputKeyboardHelp: "Use arrow keys to change values; press Alt+Down Arrow to open the time picker.",
	today: "Today",
	toggleColorFormat: "Toggle color format",
	unmute: "Unmute",
	unpin: "Unpin",
	unpinColumn: "Unpin column",
	videoPlayer: "Video player",
	volume: "Volume",
	year: "Year",
	zoomIn: "Zoom in",
	zoomOut: "Zoom out"
};
O(j);
var te = j, ne = class extends A {
	lang() {
		return this.host.didSSR && !this.host.hasUpdated ? this.host.lang || "en" : super.lang();
	}
};
O(te);
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var M = Math.min, N = Math.max, re = Math.round, ie = Math.floor, P = (e) => ({
	x: e,
	y: e
}), ae = {
	left: "right",
	right: "left",
	bottom: "top",
	top: "bottom"
};
function oe(e, t, n) {
	return N(e, M(t, n));
}
function F(e, t) {
	return typeof e == "function" ? e(t) : e;
}
function I(e) {
	return e.split("-")[0];
}
function L(e) {
	return e.split("-")[1];
}
function se(e) {
	return e === "x" ? "y" : "x";
}
function ce(e) {
	return e === "y" ? "height" : "width";
}
function R(e) {
	let t = e[0];
	return t === "t" || t === "b" ? "y" : "x";
}
function le(e) {
	return se(R(e));
}
function ue(e, t, n) {
	n === void 0 && (n = !1);
	let r = L(e), i = le(e), a = ce(i), o = i === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
	return t.reference[a] > t.floating[a] && (o = z(o)), [o, z(o)];
}
function de(e) {
	let t = z(e);
	return [
		fe(e),
		t,
		fe(t)
	];
}
function fe(e) {
	return e.includes("start") ? e.replace("start", "end") : e.replace("end", "start");
}
var pe = ["left", "right"], me = ["right", "left"], he = ["top", "bottom"], ge = ["bottom", "top"];
function _e(e, t, n) {
	switch (e) {
		case "top":
		case "bottom": return n ? t ? me : pe : t ? pe : me;
		case "left":
		case "right": return t ? he : ge;
		default: return [];
	}
}
function ve(e, t, n, r) {
	let i = L(e), a = _e(I(e), n === "start", r);
	return i && (a = a.map((e) => e + "-" + i), t && (a = a.concat(a.map(fe)))), a;
}
function z(e) {
	let t = I(e);
	return ae[t] + e.slice(t.length);
}
function ye(e) {
	return {
		top: e.top ?? 0,
		right: e.right ?? 0,
		bottom: e.bottom ?? 0,
		left: e.left ?? 0
	};
}
function be(e) {
	return typeof e == "number" ? {
		top: e,
		right: e,
		bottom: e,
		left: e
	} : ye(e);
}
function B(e) {
	let { x: t, y: n, width: r, height: i } = e;
	return {
		width: r,
		height: i,
		top: n,
		left: t,
		right: t + r,
		bottom: n + i,
		x: t,
		y: n
	};
}
//#endregion
//#region node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function xe(e, t, n) {
	let { reference: r, floating: i } = e, a = R(t), o = le(t), s = ce(o), c = I(t), l = a === "y", u = r.x + r.width / 2 - i.width / 2, d = r.y + r.height / 2 - i.height / 2, f = r[s] / 2 - i[s] / 2, p;
	switch (c) {
		case "top":
			p = {
				x: u,
				y: r.y - i.height
			};
			break;
		case "bottom":
			p = {
				x: u,
				y: r.y + r.height
			};
			break;
		case "right":
			p = {
				x: r.x + r.width,
				y: d
			};
			break;
		case "left":
			p = {
				x: r.x - i.width,
				y: d
			};
			break;
		default: p = {
			x: r.x,
			y: r.y
		};
	}
	let m = L(t);
	return m && (p[o] += f * (m === "end" ? 1 : -1) * (n && l ? -1 : 1)), p;
}
async function Se(e, t) {
	t === void 0 && (t = {});
	let { x: n, y: r, platform: i, rects: a, elements: o, strategy: s } = e, { boundary: c = "clippingAncestors", rootBoundary: l = "viewport", elementContext: u = "floating", altBoundary: d = !1, padding: f = 0 } = F(t, e), p = be(f), m = o[d ? u === "floating" ? "reference" : "floating" : u], h = B(await i.getClippingRect({
		element: await (i.isElement == null ? void 0 : i.isElement(m)) ?? !0 ? m : m.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(o.floating)),
		boundary: c,
		rootBoundary: l,
		strategy: s
	})), g = u === "floating" ? {
		x: n,
		y: r,
		width: a.floating.width,
		height: a.floating.height
	} : a.reference, _ = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(o.floating)), v = await (i.isElement == null ? void 0 : i.isElement(_)) && await (i.getScale == null ? void 0 : i.getScale(_)) || {
		x: 1,
		y: 1
	}, y = B(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
		elements: o,
		rect: g,
		offsetParent: _,
		strategy: s
	}) : g);
	return {
		top: (h.top - y.top + p.top) / v.y,
		bottom: (y.bottom - h.bottom + p.bottom) / v.y,
		left: (h.left - y.left + p.left) / v.x,
		right: (y.right - h.right + p.right) / v.x
	};
}
var Ce = 50, we = async (e, t, n) => {
	let { placement: r = "bottom", strategy: i = "absolute", middleware: a = [], platform: o } = n, s = o.detectOverflow ? o : {
		...o,
		detectOverflow: Se
	}, c = await (o.isRTL == null ? void 0 : o.isRTL(t)), l = await o.getElementRects({
		reference: e,
		floating: t,
		strategy: i
	}), { x: u, y: d } = xe(l, r, c), f = r, p = 0, m = {};
	for (let n = 0; n < a.length; n++) {
		let h = a[n];
		if (!h) continue;
		let { name: g, fn: _ } = h, { x: v, y, data: b, reset: x } = await _({
			x: u,
			y: d,
			initialPlacement: r,
			placement: f,
			strategy: i,
			middlewareData: m,
			rects: l,
			platform: s,
			elements: {
				reference: e,
				floating: t
			}
		});
		u = v ?? u, d = y ?? d, m[g] = {
			...m[g],
			...b
		}, x && p < Ce && (p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await o.getElementRects({
			reference: e,
			floating: t,
			strategy: i
		}) : x.rects), {x: u, y: d} = xe(l, f, c)), n = -1);
	}
	return {
		x: u,
		y: d,
		placement: f,
		strategy: i,
		middlewareData: m
	};
}, Te = (e) => ({
	name: "arrow",
	options: e,
	async fn(t) {
		let { x: n, y: r, placement: i, rects: a, platform: o, elements: s, middlewareData: c } = t, { element: l, padding: u = 0 } = F(e, t) || {};
		if (l == null) return {};
		let d = be(u), f = {
			x: n,
			y: r
		}, p = le(i), m = ce(p), h = await o.getDimensions(l), g = p === "y", _ = g ? "top" : "left", v = g ? "bottom" : "right", y = g ? "clientHeight" : "clientWidth", b = a.reference[m] + a.reference[p] - f[p] - a.floating[m], x = f[p] - a.reference[p], S = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(l)), C = S ? S[y] : 0;
		(!C || !await (o.isElement == null ? void 0 : o.isElement(S))) && (C = s.floating[y] || a.floating[m]);
		let w = b / 2 - x / 2, T = C / 2 - h[m] / 2 - 1, E = M(d[_], T), D = M(d[v], T), ee = C - h[m] - D, O = C / 2 - h[m] / 2 + w, k = oe(E, O, ee), A = !c.arrow && L(i) != null && O !== k && a.reference[m] / 2 - (O < E ? E : D) - h[m] / 2 < 0, j = A ? O < E ? O - E : O - ee : 0;
		return {
			[p]: f[p] + j,
			data: {
				[p]: k,
				centerOffset: O - k - j,
				...A && { alignmentOffset: j }
			},
			reset: A
		};
	}
}), Ee = function(e) {
	return e === void 0 && (e = {}), {
		name: "flip",
		options: e,
		async fn(t) {
			var n;
			let { placement: r, middlewareData: i, rects: a, initialPlacement: o, platform: s, elements: c } = t, { mainAxis: l = !0, crossAxis: u = !0, fallbackPlacements: d, fallbackStrategy: f = "bestFit", fallbackAxisSideDirection: p = "none", flipAlignment: m = !0, ...h } = F(e, t);
			if ((n = i.arrow) != null && n.alignmentOffset) return {};
			let g = I(r), _ = R(o), v = I(o) === o, y = await (s.isRTL == null ? void 0 : s.isRTL(c.floating)), b = d || (v || !m ? [z(o)] : de(o)), x = p !== "none";
			!d && x && b.push(...ve(o, m, p, y));
			let S = [o, ...b], C = await s.detectOverflow(t, h), w = [], T = i.flip?.overflows || [];
			if (l && w.push(C[g]), u) {
				let e = ue(r, a, y);
				w.push(C[e[0]], C[e[1]]);
			}
			if (T = [...T, {
				placement: r,
				overflows: w
			}], !w.every((e) => e <= 0)) {
				let e = (i.flip?.index || 0) + 1, t = S[e];
				if (t && (u !== "alignment" || _ === R(t) || T.every((e) => R(e.placement) !== _ || e.overflows[0] > 0))) return {
					data: {
						index: e,
						overflows: T
					},
					reset: { placement: t }
				};
				let n = T.filter((e) => e.overflows[0] <= 0).sort((e, t) => e.overflows[1] - t.overflows[1])[0]?.placement;
				if (!n) switch (f) {
					case "bestFit": {
						let e = T.filter((e) => {
							if (x) {
								let t = R(e.placement);
								return t === _ || t === "y";
							}
							return !0;
						}).map((e) => [e.placement, e.overflows.filter((e) => e > 0).reduce((e, t) => e + t, 0)]).sort((e, t) => e[1] - t[1])[0]?.[0];
						e && (n = e);
						break;
					}
					case "initialPlacement": n = o;
				}
				if (r !== n) return { reset: { placement: n } };
			}
			return {};
		}
	};
}, De = /*#__PURE__*/ new Set(["left", "top"]);
async function Oe(e, t) {
	let { placement: n, platform: r, elements: i } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(i.floating)), o = I(n), s = L(n), c = R(n) === "y", l = De.has(o) ? -1 : 1, u = a && c ? -1 : 1, d = F(t, e), { mainAxis: f, crossAxis: p, alignmentAxis: m } = typeof d == "number" ? {
		mainAxis: d,
		crossAxis: 0,
		alignmentAxis: null
	} : {
		mainAxis: d.mainAxis || 0,
		crossAxis: d.crossAxis || 0,
		alignmentAxis: d.alignmentAxis
	};
	return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), c ? {
		x: p * u,
		y: f * l
	} : {
		x: f * l,
		y: p * u
	};
}
var ke = function(e) {
	return e === void 0 && (e = 0), {
		name: "offset",
		options: e,
		async fn(t) {
			var n;
			let { x: r, y: i, placement: a, middlewareData: o } = t, s = await Oe(t, e);
			return a === o.offset?.placement && (n = o.arrow) != null && n.alignmentOffset ? {} : {
				x: r + s.x,
				y: i + s.y,
				data: {
					...s,
					placement: a
				}
			};
		}
	};
}, Ae = function(e) {
	return e === void 0 && (e = {}), {
		name: "shift",
		options: e,
		async fn(t) {
			let { x: n, y: r, placement: i, platform: a } = t, { mainAxis: o = !0, crossAxis: s = !1, limiter: c = { fn: (e) => {
				let { x: t, y: n } = e;
				return {
					x: t,
					y: n
				};
			} }, ...l } = F(e, t), u = {
				x: n,
				y: r
			}, d = await a.detectOverflow(t, l), f = R(i), p = se(f), m = u[p], h = u[f], g = (e, t) => oe(t + d[e === "y" ? "top" : "left"], t, t - d[e === "y" ? "bottom" : "right"]);
			o && (m = g(p, m)), s && (h = g(f, h));
			let _ = c.fn({
				...t,
				[p]: m,
				[f]: h
			});
			return {
				..._,
				data: {
					x: _.x - n,
					y: _.y - r,
					enabled: {
						[p]: o,
						[f]: s
					}
				}
			};
		}
	};
}, je = function(e) {
	return e === void 0 && (e = {}), {
		name: "size",
		options: e,
		async fn(t) {
			let { placement: n, rects: r, platform: i, elements: a } = t, { apply: o = () => {}, ...s } = F(e, t), c = await i.detectOverflow(t, s), l = I(n), u = L(n), d = R(n) === "y", { width: f, height: p } = r.floating, m, h;
			l === "top" || l === "bottom" ? (m = l, h = u === (await (i.isRTL == null ? void 0 : i.isRTL(a.floating)) ? "start" : "end") ? "left" : "right") : (h = l, m = u === "end" ? "top" : "bottom");
			let g = p - c.top - c.bottom, _ = f - c.left - c.right, v = M(p - c[m], g), y = M(f - c[h], _), b = t.middlewareData.shift, x = !b, S = v, C = y;
			b != null && b.enabled.x && (C = _), b != null && b.enabled.y && (S = g), x && !u && (d ? C = f - 2 * N(c.left, c.right) : S = p - 2 * N(c.top, c.bottom)), await o({
				...t,
				availableWidth: C,
				availableHeight: S
			});
			let w = await i.getDimensions(a.floating);
			return f !== w.width || p !== w.height ? { reset: { rects: !0 } } : {};
		}
	};
};
//#endregion
//#region node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function Me() {
	return typeof window < "u";
}
function V(e) {
	return Ne(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function H(e) {
	var t;
	return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function U(e) {
	return ((Ne(e) ? e.ownerDocument : e.document) || window.document)?.documentElement;
}
function Ne(e) {
	return Me() ? e instanceof Node || e instanceof H(e).Node : !1;
}
function W(e) {
	return Me() ? e instanceof Element || e instanceof H(e).Element : !1;
}
function G(e) {
	return Me() ? e instanceof HTMLElement || e instanceof H(e).HTMLElement : !1;
}
function Pe(e) {
	return !Me() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof H(e).ShadowRoot;
}
function Fe(e) {
	let { overflow: t, overflowX: n, overflowY: r, display: i } = J(e);
	return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && i !== "inline" && i !== "contents";
}
function Ie(e) {
	return /^(table|td|th)$/.test(V(e));
}
function Le(e) {
	try {
		if (e.matches(":popover-open")) return !0;
	} catch {}
	try {
		return e.matches(":modal");
	} catch {
		return !1;
	}
}
var Re = /transform|translate|scale|rotate|perspective|filter/, ze = /paint|layout|strict|content/, K = (e) => !!e && e !== "none", Be;
function Ve(e) {
	let t = W(e) ? J(e) : e;
	return K(t.transform) || K(t.translate) || K(t.scale) || K(t.rotate) || K(t.perspective) || !Ue() && (K(t.backdropFilter) || K(t.filter)) || Re.test(t.willChange || "") || ze.test(t.contain || "");
}
function He(e) {
	let t = Y(e);
	for (; G(t) && !q(t);) {
		if (Ve(t)) return t;
		if (Le(t)) return null;
		t = Y(t);
	}
	return null;
}
function Ue() {
	return Be ??= typeof CSS < "u" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none"), Be;
}
function q(e) {
	return /^(html|body|#document)$/.test(V(e));
}
function J(e) {
	return H(e).getComputedStyle(e);
}
function We(e) {
	return W(e) ? {
		scrollLeft: e.scrollLeft,
		scrollTop: e.scrollTop
	} : {
		scrollLeft: e.scrollX,
		scrollTop: e.scrollY
	};
}
function Y(e) {
	if (V(e) === "html") return e;
	let t = e.assignedSlot || e.parentNode || Pe(e) && e.host || U(e);
	return Pe(t) ? t.host : t;
}
function Ge(e) {
	let t = Y(e);
	return q(t) ? (e.ownerDocument || e).body : G(t) && Fe(t) ? t : Ge(t);
}
function X(e, t, n) {
	t === void 0 && (t = []), n === void 0 && (n = !0);
	let r = Ge(e), i = r === e.ownerDocument?.body, a = H(r);
	if (i) {
		let e = Ke(a);
		return t.concat(a, a.visualViewport || [], Fe(r) ? r : [], e && n ? X(e) : []);
	}
	return t.concat(r, X(r, [], n));
}
function Ke(e) {
	return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
//#endregion
//#region node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function qe(e) {
	let t = J(e), n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0, i = G(e), a = i ? e.offsetWidth : n, o = i ? e.offsetHeight : r, s = re(n) !== a || re(r) !== o;
	return s && (n = a, r = o), {
		width: n,
		height: r,
		$: s
	};
}
function Je(e) {
	return W(e) ? e : e.contextElement;
}
function Z(e) {
	let t = Je(e);
	if (!G(t)) return P(1);
	let n = t.getBoundingClientRect(), { width: r, height: i, $: a } = qe(t), o = (a ? re(n.width) : n.width) / r, s = (a ? re(n.height) : n.height) / i;
	return (!o || !Number.isFinite(o)) && (o = 1), (!s || !Number.isFinite(s)) && (s = 1), {
		x: o,
		y: s
	};
}
var Ye = /*#__PURE__*/ P(0);
function Xe(e) {
	let t = H(e);
	return !Ue() || !t.visualViewport ? Ye : {
		x: t.visualViewport.offsetLeft,
		y: t.visualViewport.offsetTop
	};
}
function Ze(e, t, n) {
	return t === void 0 && (t = !1), !!n && t && n === H(e);
}
function Q(e, t, n, r) {
	t === void 0 && (t = !1), n === void 0 && (n = !1);
	let i = e.getBoundingClientRect(), a = Je(e), o = P(1);
	t && (r ? W(r) && (o = Z(r)) : o = Z(e));
	let s = Ze(a, n, r) ? Xe(a) : P(0), c = (i.left + s.x) / o.x, l = (i.top + s.y) / o.y, u = i.width / o.x, d = i.height / o.y;
	if (a && r) {
		let e = H(a), t = W(r) ? H(r) : r, n = e, i = Ke(n);
		for (; i && t !== n;) {
			let e = Z(i), t = i.getBoundingClientRect(), r = J(i), a = t.left + (i.clientLeft + parseFloat(r.paddingLeft)) * e.x, o = t.top + (i.clientTop + parseFloat(r.paddingTop)) * e.y;
			c *= e.x, l *= e.y, u *= e.x, d *= e.y, c += a, l += o, n = H(i), i = Ke(n);
		}
	}
	return B({
		width: u,
		height: d,
		x: c,
		y: l
	});
}
function Qe(e, t) {
	let n = We(e).scrollLeft;
	return t ? t.left + n : Q(U(e)).left + n;
}
function $e(e, t) {
	let n = e.getBoundingClientRect();
	return {
		x: n.left + t.scrollLeft - Qe(e, n),
		y: n.top + t.scrollTop
	};
}
function et(e) {
	let { elements: t, rect: n, offsetParent: r, strategy: i } = e, a = i === "fixed", o = U(r), s = t ? Le(t.floating) : !1;
	if (r === o || s && a) return n;
	let c = {
		scrollLeft: 0,
		scrollTop: 0
	}, l = P(1), u = P(0), d = G(r);
	if ((d || !a) && ((V(r) !== "body" || Fe(o)) && (c = We(r)), d)) {
		let e = Q(r);
		l = Z(r), u.x = e.x + r.clientLeft, u.y = e.y + r.clientTop;
	}
	let f = o && !d && !a ? $e(o, c) : P(0);
	return {
		width: n.width * l.x,
		height: n.height * l.y,
		x: n.x * l.x - c.scrollLeft * l.x + u.x + f.x,
		y: n.y * l.y - c.scrollTop * l.y + u.y + f.y
	};
}
function tt(e) {
	return e.getClientRects ? Array.from(e.getClientRects()) : [];
}
function nt(e) {
	let t = We(e), n = e.ownerDocument.body, r = N(e.scrollWidth, e.clientWidth, n.scrollWidth, n.clientWidth), i = N(e.scrollHeight, e.clientHeight, n.scrollHeight, n.clientHeight), a = -t.scrollLeft + Qe(e), o = -t.scrollTop;
	return J(n).direction === "rtl" && (a += N(e.clientWidth, n.clientWidth) - r), {
		width: r,
		height: i,
		x: a,
		y: o
	};
}
var rt = 25;
function it(e, t, n) {
	n === void 0 && (n = "viewport");
	let r = n === "layoutViewport", i = H(e), a = U(e), o = i.visualViewport, s = a.clientWidth, c = a.clientHeight, l = 0, u = 0;
	if (o) {
		let e = !Ue() || t === "fixed";
		r ? e || (l = -o.offsetLeft, u = -o.offsetTop) : (s = o.width, c = o.height, e && (l = o.offsetLeft, u = o.offsetTop));
	}
	if (Qe(a) <= 0) {
		let e = a.ownerDocument, t = e.body, n = getComputedStyle(t), r = e.compatMode === "CSS1Compat" && parseFloat(n.marginLeft) + parseFloat(n.marginRight) || 0, i = Math.abs(a.clientWidth - t.clientWidth - r), o = getComputedStyle(a).scrollbarGutter === "stable both-edges" ? i / 2 : i;
		o <= rt && (s -= o);
	}
	return {
		width: s,
		height: c,
		x: l,
		y: u
	};
}
function at(e, t) {
	let n = Q(e, !0, t === "fixed"), r = n.top + e.clientTop, i = n.left + e.clientLeft, a = Z(e);
	return {
		width: e.clientWidth * a.x,
		height: e.clientHeight * a.y,
		x: i * a.x,
		y: r * a.y
	};
}
function ot(e, t, n) {
	let r;
	if (t === "viewport" || t === "layoutViewport") r = it(e, n, t);
	else if (t === "document") r = nt(U(e));
	else if (W(t)) r = at(t, n);
	else {
		let n = Xe(e);
		r = {
			x: t.x - n.x,
			y: t.y - n.y,
			width: t.width,
			height: t.height
		};
	}
	return B(r);
}
function st(e, t) {
	let n = t.get(e);
	if (n) return n;
	let r = X(e, [], !1).filter((e) => W(e) && V(e) !== "body"), i = null, a = J(e).position === "fixed", o = a ? Y(e) : e;
	for (; W(o) && !q(o);) {
		let e = J(o), t = Ve(o), n = i ? i.position : a ? "fixed" : "";
		!t && (n === "fixed" || n === "absolute" && e.position === "static") ? r = r.filter((e) => e !== o) : i = e, o = Y(o);
	}
	return t.set(e, r), r;
}
function ct(e) {
	let { element: t, boundary: n, rootBoundary: r, strategy: i } = e, a = [...n === "clippingAncestors" ? Le(t) ? [] : st(t, this._c) : [].concat(n), r], o = ot(t, a[0], i), s = o.top, c = o.right, l = o.bottom, u = o.left;
	for (let e = 1; e < a.length; e++) {
		let n = ot(t, a[e], i);
		s = N(n.top, s), c = M(n.right, c), l = M(n.bottom, l), u = N(n.left, u);
	}
	return {
		width: c - u,
		height: l - s,
		x: u,
		y: s
	};
}
function lt(e) {
	let { width: t, height: n } = qe(e);
	return {
		width: t,
		height: n
	};
}
function ut(e, t, n) {
	let r = G(t), i = U(t), a = n === "fixed", o = Q(e, !0, a, t), s = {
		scrollLeft: 0,
		scrollTop: 0
	}, c = P(0);
	if ((r || !a) && ((V(t) !== "body" || Fe(i)) && (s = We(t)), r)) {
		let e = Q(t, !0, a, t);
		c.x = e.x + t.clientLeft, c.y = e.y + t.clientTop;
	}
	!r && i && (c.x = Qe(i));
	let l = i && !r && !a ? $e(i, s) : P(0);
	return {
		x: o.left + s.scrollLeft - c.x - l.x,
		y: o.top + s.scrollTop - c.y - l.y,
		width: o.width,
		height: o.height
	};
}
function dt(e) {
	return J(e).position === "static";
}
function ft(e, t) {
	if (!G(e) || J(e).position === "fixed") return null;
	if (t) return t(e);
	let n = e.offsetParent;
	return U(e) === n && (n = n.ownerDocument.body), n;
}
function pt(e, t) {
	let n = H(e);
	if (Le(e)) return n;
	if (!G(e)) {
		let t = Y(e);
		for (; t && !q(t);) {
			if (W(t) && !dt(t)) return t;
			t = Y(t);
		}
		return n;
	}
	let r = ft(e, t);
	for (; r && Ie(r) && dt(r);) r = ft(r, t);
	return r && q(r) && dt(r) && !Ve(r) ? n : r || He(e) || n;
}
var mt = async function(e) {
	let t = this.getOffsetParent || pt, n = this.getDimensions, r = await n(e.floating);
	return {
		reference: ut(e.reference, await t(e.floating), e.strategy),
		floating: {
			x: 0,
			y: 0,
			width: r.width,
			height: r.height
		}
	};
};
function ht(e) {
	return J(e).direction === "rtl";
}
var gt = {
	convertOffsetParentRelativeRectToViewportRelativeRect: et,
	getDocumentElement: U,
	getClippingRect: ct,
	getOffsetParent: pt,
	getElementRects: mt,
	getClientRects: tt,
	getDimensions: lt,
	getScale: Z,
	isElement: W,
	isRTL: ht
};
function _t(e, t) {
	return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function vt(e, t, n) {
	let r = null, i, a = U(e);
	function o() {
		var e;
		clearTimeout(i), (e = r) == null || e.disconnect(), r = null;
	}
	function s(n, c) {
		n === void 0 && (n = !1), c === void 0 && (c = 1), o();
		let l = e.getBoundingClientRect(), { left: u, top: d, width: f, height: p } = l;
		if (n || t(), !f || !p) return;
		let m = ie(d), h = ie(a.clientWidth - (u + f)), g = ie(a.clientHeight - (d + p)), _ = ie(u), v = {
			rootMargin: -m + "px " + -h + "px " + -g + "px " + -_ + "px",
			threshold: N(0, M(1, c)) || 1
		}, y = !0;
		function b(t) {
			let n = t[0].intersectionRatio;
			if (!_t(l, e.getBoundingClientRect())) return s();
			if (n !== c) {
				if (!y) return s();
				n ? s(!1, n) : i = setTimeout(() => {
					s(!1, 1e-7);
				}, 1e3);
			}
			y = !1;
		}
		try {
			r = new IntersectionObserver(b, {
				...v,
				root: a.ownerDocument
			});
		} catch {
			r = new IntersectionObserver(b, v);
		}
		r.observe(e);
	}
	let c = H(e), l = () => s(n);
	return c.addEventListener("resize", l), s(!0), () => {
		c.removeEventListener("resize", l), o();
	};
}
function yt(e, t, n, r) {
	r === void 0 && (r = {});
	let { ancestorScroll: i = !0, ancestorResize: a = !0, elementResize: o = typeof ResizeObserver == "function", layoutShift: s = typeof IntersectionObserver == "function", animationFrame: c = !1 } = r, l = Je(e), u = i || a ? [...l ? X(l) : [], ...t ? X(t) : []] : [];
	u.forEach((e) => {
		i && e.addEventListener("scroll", n), a && e.addEventListener("resize", n);
	});
	let d = l && s ? vt(l, n, a) : null, f = -1, p = null;
	o && (p = new ResizeObserver((e) => {
		let [r] = e;
		r && r.target === l && p && t && (p.unobserve(t), cancelAnimationFrame(f), f = requestAnimationFrame(() => {
			var e;
			(e = p) == null || e.observe(t);
		})), n();
	}), l && !c && p.observe(l), t && p.observe(t));
	let m, h = c ? Q(e) : null;
	c && g();
	function g() {
		let t = Q(e);
		h && !_t(h, t) && n(), h = t, m = requestAnimationFrame(g);
	}
	return n(), () => {
		var e;
		u.forEach((e) => {
			i && e.removeEventListener("scroll", n), a && e.removeEventListener("resize", n);
		}), d?.(), (e = p) == null || e.disconnect(), p = null, c && cancelAnimationFrame(m);
	};
}
var bt = ke, xt = Ae, St = Ee, Ct = je, wt = Te, Tt = (e, t, n) => {
	let r = /* @__PURE__ */ new Map(), i = n ?? {}, a = {
		...gt,
		...i.platform,
		_c: r
	};
	return we(e, t, {
		...i,
		platform: a
	});
};
//#endregion
//#region node_modules/composed-offset-position/dist/composed-offset-position.browser.min.mjs
function Et(e) {
	return Ot(e);
}
function Dt(e) {
	return e.assignedSlot ? e.assignedSlot : e.parentNode instanceof ShadowRoot ? e.parentNode.host : e.parentNode;
}
function Ot(e) {
	for (let t = e; t; t = Dt(t)) if (t instanceof Element && getComputedStyle(t).display === "none") return null;
	for (let t = Dt(e); t; t = Dt(t)) {
		if (!(t instanceof Element)) continue;
		let e = getComputedStyle(t);
		if (e.display !== "contents" && (e.position !== "static" || Ve(e) || t.tagName === "BODY")) return t;
	}
	return null;
}
//#endregion
//#region node_modules/lit-html/directive.js
var kt = {
	ATTRIBUTE: 1,
	CHILD: 2,
	PROPERTY: 3,
	BOOLEAN_ATTRIBUTE: 4,
	EVENT: 5,
	ELEMENT: 6
}, At = (e) => (...t) => ({
	_$litDirective$: e,
	values: t
}), jt = class {
	constructor(e) {}
	get _$AU() {
		return this._$AM._$AU;
	}
	_$AT(e, t, n) {
		this._$Ct = e, this._$AM = t, this._$Ci = n;
	}
	_$AS(e, t) {
		return this.update(e, t);
	}
	update(e, t) {
		return this.render(...t);
	}
}, Mt = At(class extends jt {
	constructor(e) {
		if (super(e), e.type !== kt.ATTRIBUTE || e.name !== "class" || e.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
	}
	render(e) {
		return " " + Object.keys(e).filter((t) => e[t]).join(" ") + " ";
	}
	update(e, [n]) {
		if (this.st === void 0) {
			this.st = /* @__PURE__ */ new Set(), e.strings !== void 0 && (this.nt = new Set(e.strings.join(" ").split(/\s/).filter((e) => e !== "")));
			for (let e in n) n[e] && !this.nt?.has(e) && this.st.add(e);
			return this.render(n);
		}
		let r = e.element.classList;
		for (let e of this.st) e in n || (r.remove(e), this.st.delete(e));
		for (let e in n) {
			let t = !!n[e];
			t === this.st.has(e) || this.nt?.has(e) || (t ? (r.add(e), this.st.add(e)) : (r.remove(e), this.st.delete(e)));
		}
		return t;
	}
});
//#endregion
//#region node_modules/@awesome.me/webawesome/dist/chunks/chunk.64OG2H45.js
function Nt(e) {
	return typeof e == "object" && !!e && "getBoundingClientRect" in e && ("contextElement" in e ? e instanceof Element : !0);
}
var Pt = !!globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"), $ = class extends S {
	constructor() {
		super(...arguments), this.localize = new ne(this), this.SUPPORTS_POPOVER = !1, this.active = !1, this.placement = "top", this.boundary = "viewport", this.distance = 0, this.skidding = 0, this.arrow = !1, this.arrowPlacement = "anchor", this.arrowPadding = 10, this.flip = !1, this.flipFallbackPlacements = "", this.flipFallbackStrategy = "best-fit", this.flipPadding = 0, this.shift = !1, this.shiftPadding = 0, this.autoSizePadding = 0, this.hoverBridge = !1, this.updateHoverBridge = () => {
			if (this.hoverBridge && this.anchorEl && this.popup) {
				let e = this.anchorEl.getBoundingClientRect(), t = this.popup.getBoundingClientRect(), n = this.placement.includes("top") || this.placement.includes("bottom"), r = 0, i = 0, a = 0, o = 0, s = 0, c = 0, l = 0, u = 0;
				n ? e.top < t.top ? (r = e.left, i = e.bottom, a = e.right, o = e.bottom, s = t.left, c = t.top, l = t.right, u = t.top) : (r = t.left, i = t.bottom, a = t.right, o = t.bottom, s = e.left, c = e.top, l = e.right, u = e.top) : e.left < t.left ? (r = e.right, i = e.top, a = t.left, o = t.top, s = e.right, c = e.bottom, l = t.left, u = t.bottom) : (r = t.right, i = t.top, a = e.left, o = e.top, s = t.right, c = t.bottom, l = e.left, u = e.bottom), this.style.setProperty("--hover-bridge-top-left-x", `${r}px`), this.style.setProperty("--hover-bridge-top-left-y", `${i}px`), this.style.setProperty("--hover-bridge-top-right-x", `${a}px`), this.style.setProperty("--hover-bridge-top-right-y", `${o}px`), this.style.setProperty("--hover-bridge-bottom-left-x", `${s}px`), this.style.setProperty("--hover-bridge-bottom-left-y", `${c}px`), this.style.setProperty("--hover-bridge-bottom-right-x", `${l}px`), this.style.setProperty("--hover-bridge-bottom-right-y", `${u}px`);
			}
		};
	}
	async connectedCallback() {
		super.connectedCallback(), await this.updateComplete, this.SUPPORTS_POPOVER = Pt, this.start();
	}
	disconnectedCallback() {
		super.disconnectedCallback(), this.stop();
	}
	async updated(e) {
		super.updated(e), e.has("active") && (this.active ? this.start() : this.stop()), e.has("anchor") && this.handleAnchorChange(), this.active && (await this.updateComplete, this.reposition());
	}
	async handleAnchorChange() {
		if (await this.stop(), this.anchor && typeof this.anchor == "string") {
			let e = this.getRootNode();
			this.anchorEl = e.getElementById(this.anchor);
		} else this.anchorEl = this.anchor instanceof Element || Nt(this.anchor) ? this.anchor : this.querySelector("[slot=\"anchor\"]");
		this.anchorEl instanceof HTMLSlotElement && (this.anchorEl = this.anchorEl.assignedElements({ flatten: !0 })[0]), this.anchorEl && this.start();
	}
	start() {
		!this.anchorEl || !this.active || !this.isConnected || (this.popup?.showPopover?.(), this.cleanup = yt(this.anchorEl, this.popup, () => {
			this.reposition();
		}));
	}
	async stop() {
		return new Promise((e) => {
			this.popup?.hidePopover?.(), this.cleanup ? (this.cleanup(), this.cleanup = void 0, this.removeAttribute("data-current-placement"), this.style.removeProperty("--auto-size-available-width"), this.style.removeProperty("--auto-size-available-height"), requestAnimationFrame(() => e())) : e();
		});
	}
	reposition() {
		if (!this.active || !this.anchorEl || !this.popup) return;
		let e = [bt({
			mainAxis: this.distance,
			crossAxis: this.skidding
		})];
		this.sync ? e.push(Ct({ apply: ({ rects: e }) => {
			let t = this.sync === "width" || this.sync === "both", n = this.sync === "height" || this.sync === "both";
			this.popup.style.width = t ? `${e.reference.width}px` : "", this.popup.style.height = n ? `${e.reference.height}px` : "";
		} })) : (this.popup.style.width = "", this.popup.style.height = "");
		let t;
		this.SUPPORTS_POPOVER && !Nt(this.anchor) && this.boundary === "scroll" && (t = X(this.anchorEl).filter((e) => e instanceof Element)), this.flip && e.push(St({
			boundary: this.flipBoundary || t,
			fallbackPlacements: this.flipFallbackPlacements,
			fallbackStrategy: this.flipFallbackStrategy === "best-fit" ? "bestFit" : "initialPlacement",
			padding: this.flipPadding
		})), this.shift && e.push(xt({
			boundary: this.shiftBoundary || t,
			padding: this.shiftPadding
		})), this.autoSize ? e.push(Ct({
			boundary: this.autoSizeBoundary || t,
			padding: this.autoSizePadding,
			apply: ({ availableWidth: e, availableHeight: t }) => {
				this.autoSize === "vertical" || this.autoSize === "both" ? this.style.setProperty("--auto-size-available-height", `${t}px`) : this.style.removeProperty("--auto-size-available-height"), this.autoSize === "horizontal" || this.autoSize === "both" ? this.style.setProperty("--auto-size-available-width", `${e}px`) : this.style.removeProperty("--auto-size-available-width");
			}
		})) : (this.style.removeProperty("--auto-size-available-width"), this.style.removeProperty("--auto-size-available-height")), this.arrow && e.push(wt({
			element: this.arrowEl,
			padding: this.arrowPadding
		}));
		let n = this.SUPPORTS_POPOVER ? (e) => gt.getOffsetParent(e, Et) : gt.getOffsetParent;
		Tt(this.anchorEl, this.popup, {
			placement: this.placement,
			middleware: e,
			strategy: this.SUPPORTS_POPOVER ? "absolute" : "fixed",
			platform: {
				...gt,
				getOffsetParent: n
			}
		}).then(({ x: e, y: t, middlewareData: n, placement: r }) => {
			let i = this.localize.dir() === "rtl", a = {
				top: "bottom",
				right: "left",
				bottom: "top",
				left: "right"
			}[r.split("-")[0]];
			if (this.setAttribute("data-current-placement", r), Object.assign(this.popup.style, {
				left: `${e}px`,
				top: `${t}px`
			}), this.arrow) {
				let e = n.arrow.x, t = n.arrow.y, r = "", o = "", s = "", c = "";
				if (this.arrowPlacement === "start") {
					let n = typeof e == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
					r = typeof t == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "", o = i ? n : "", c = i ? "" : n;
				} else if (this.arrowPlacement === "end") {
					let n = typeof e == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
					o = i ? "" : n, c = i ? n : "", s = typeof t == "number" ? `calc(${this.arrowPadding}px - var(--arrow-padding-offset))` : "";
				} else this.arrowPlacement === "center" ? (c = typeof e == "number" ? "calc(50% - var(--arrow-size-diagonal))" : "", r = typeof t == "number" ? "calc(50% - var(--arrow-size-diagonal))" : "") : (c = typeof e == "number" ? `${e}px` : "", r = typeof t == "number" ? `${t}px` : "");
				Object.assign(this.arrowEl.style, {
					top: r,
					right: o,
					bottom: s,
					left: c,
					[a]: "calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"
				});
			}
		}), requestAnimationFrame(() => this.updateHoverBridge()), this.dispatchEvent(new s());
	}
	render() {
		return i`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${Mt({
			"popup-hover-bridge": !0,
			"popup-hover-bridge-visible": this.hoverBridge && this.active
		})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${Mt({
			popup: !0,
			"popup-active": this.active,
			"popup-fixed": !this.SUPPORTS_POPOVER,
			"popup-has-arrow": this.arrow
		})}
      >
        <slot></slot>
        ${this.arrow ? i`<div part="arrow" class="arrow" role="presentation"></div>` : ""}
      </div>
    `;
	}
};
$.css = c, f([a(".popup")], $.prototype, "popup", 2), f([a(".arrow")], $.prototype, "arrowEl", 2), f([e({
	attribute: !1,
	type: Boolean
})], $.prototype, "SUPPORTS_POPOVER", 2), f([e()], $.prototype, "anchor", 2), f([e({
	type: Boolean,
	reflect: !0
})], $.prototype, "active", 2), f([e({ reflect: !0 })], $.prototype, "placement", 2), f([e()], $.prototype, "boundary", 2), f([e({ type: Number })], $.prototype, "distance", 2), f([e({ type: Number })], $.prototype, "skidding", 2), f([e({ type: Boolean })], $.prototype, "arrow", 2), f([e({ attribute: "arrow-placement" })], $.prototype, "arrowPlacement", 2), f([e({
	attribute: "arrow-padding",
	type: Number
})], $.prototype, "arrowPadding", 2), f([e({ type: Boolean })], $.prototype, "flip", 2), f([e({
	attribute: "flip-fallback-placements",
	converter: {
		fromAttribute: (e) => e.split(" ").map((e) => e.trim()).filter((e) => e !== ""),
		toAttribute: (e) => e.join(" ")
	}
})], $.prototype, "flipFallbackPlacements", 2), f([e({ attribute: "flip-fallback-strategy" })], $.prototype, "flipFallbackStrategy", 2), f([e({ type: Object })], $.prototype, "flipBoundary", 2), f([e({
	attribute: "flip-padding",
	type: Number
})], $.prototype, "flipPadding", 2), f([e({ type: Boolean })], $.prototype, "shift", 2), f([e({ type: Object })], $.prototype, "shiftBoundary", 2), f([e({
	attribute: "shift-padding",
	type: Number
})], $.prototype, "shiftPadding", 2), f([e({ attribute: "auto-size" })], $.prototype, "autoSize", 2), f([e()], $.prototype, "sync", 2), f([e({ type: Object })], $.prototype, "autoSizeBoundary", 2), f([e({
	attribute: "auto-size-padding",
	type: Number
})], $.prototype, "autoSizePadding", 2), f([e({
	attribute: "hover-bridge",
	type: Boolean
})], $.prototype, "hoverBridge", 2), $ = f([o("wa-popup")], $);
//#endregion
export { xt as a, f as c, bt as i, o as l, Tt as n, ne as o, St as r, S as s, yt as t };

//# sourceMappingURL=chunk.64OG2H45-BADxAtEI.js.map