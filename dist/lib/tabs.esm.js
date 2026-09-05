import { __exportAll as e } from "../_virtual/_rolldown/runtime.esm.js";
import { label as t } from "../utils/label.esm.js";
import "../utils/index.esm.js";
import { style as n } from "./style.esm.js";
import { cancelButton as r } from "../widgets/buttons.esm.js";
import "../widgets/index.esm.js";
import { store as i } from "solid-logic";
//#region src/lib/tabs.ts
var a = /* @__PURE__ */ e({
	TabWidgetElement: () => o,
	tabWidget: () => c
}), o = class extends HTMLElement {
	bodyContainer;
	refresh;
	tabContainer;
}, s = "#ddddcc";
function c(e) {
	let a = e.subject, o = e.dom || document, c = parseInt(e.orientation || "0"), u = e.backgroundColor || s, d = c & 2, f = c & 1, p = e.onClose, [m, h] = l(u), g = `display: grid; width: auto; height: 100%; border: 0.1em; border-style: solid; border-color: ${m}; padding: 1em;`, _ = o.createElement("div");
	_.setAttribute("style", n.tabsRootElement), _.style.flexDirection = (f ? "row" : "column") + (d ? "-reverse" : "");
	let v = _.appendChild(o.createElement("nav"));
	v.setAttribute("style", n.tabsNavElement);
	let y = _.appendChild(o.createElement("div"));
	y.setAttribute("style", n.tabsMainElement);
	let b = v.appendChild(o.createElement("ul"));
	b.setAttribute("style", n.tabContainer), b.style.flexDirection = `${f ? "column" : "row"}`;
	let x = y;
	_.tabContainer = b, _.bodyContainer = x;
	let S = [
		"0.2em",
		"0.2em",
		"0",
		"0"
	], C = `border-radius: ${S.concat(S).slice(c, c + 4).join(" ")};`, w = [
		"0.3em",
		"0.3em",
		"0",
		"0.3em"
	], T = w.concat(w).slice(c, c + 4), E = `margin: ${T.join(" ")};`, D = `padding: ${T.join(" ")};`, O = C + `position: relative; padding: 0.7em; max-width: 20em; color: ${h};`, k = `${O + E} opacity: 50%; background-color: ${u};`, A = `${O + E} background-color: ${m};`, j = "height: 100%; width: 100%;";
	if (_.refresh = F, F(), !e.startEmpty && b.children.length && e.selectedTab) {
		let t = Array.from(b.children).map((e) => e.firstChild).find((t) => t.dataset.name === e.selectedTab), n = e.selectedTab.uri, r = Array.from(b.children).find((e) => e.subject && e.subject.uri && e.subject.uri === n) || t || b.children[0], i = r.firstChild;
		i?.click ? i.click() : r instanceof HTMLElement && r.click();
	} else if (!e.startEmpty) {
		let e = b.children[0], t = e?.firstChild;
		t?.click ? t.click() : e instanceof HTMLElement && e.click();
	}
	return _;
	function M(e) {
		if (e.dataset.onCloseSet) {
			let t = e.querySelector(".unstyled");
			e.removeChild(t);
		}
		let t = o.createElement("li");
		t.classList.add("unstyled");
		let n = r(o, p);
		n.setAttribute("style", n.getAttribute("style") + D), t.appendChild(n), e.appendChild(t), e.dataset.onCloseSet = "true";
	}
	function N() {
		return e.items ? e.items : e.ordered === !1 ? i.each(a, e.predicate) : i.the(a, e.predicate).elements;
	}
	function P(r) {
		let i = o.createElement("li");
		i.setAttribute("style", k), i.subject = r;
		let a = i.appendChild(o.createElement("button"));
		if (a.setAttribute("style", n.makeNewSlot), a.onclick = function() {
			if (I(), L(), i.setAttribute("style", A), !i.bodyTR) return;
			i.bodyTR.setAttribute("style", j);
			let t = s(i);
			e.renderMain && i.subject && t.asSettings !== !1 && (t.innerHTML = "loading item ..." + r, e.renderMain(t, i.subject), t.asSettings = !1);
		}, e.renderTabSettings && i.subject) {
			let t = o.createElement("button");
			t.textContent = "...", t.setAttribute("style", n.ellipsis), t.onclick = function() {
				if (I(), L(), i.setAttribute("style", A), !i.bodyTR) return;
				i.bodyTR.setAttribute("style", j);
				let t = s(i);
				e.renderTabSettings && i.subject && t.asSettings !== !0 && (t.innerHTML = "loading settings ..." + r, e.renderTabSettings(t, i.subject), t.asSettings = !0);
			}, i.appendChild(t);
		}
		return e.renderTab ? e.renderTab(a, r) : a.innerHTML = t(r), i;
		function s(e) {
			let t = e.bodyTR?.children[0];
			if (t) return t;
			let n = e.bodyTR.appendChild(o.createElement("div"));
			return n.setAttribute("style", g), n;
		}
	}
	function F() {
		let e = N(), t, n, r, i, a, s = !1;
		for (i = 0; i < b.children.length; i++) if (t = b.children[i], i >= e.length || t.subject && !t.subject.sameTerm(e[i])) {
			s = !0;
			break;
		}
		if (!s && e.length === b.children.length) return;
		for (a = b.children.length - 1; a >= 0 && (t = b.children[a], r = a - b.children.length + e.length, !t.subject || t.subject.sameTerm(e[r])); a--);
		let c = e.slice(i, a - b.children.length + e.length + 1);
		for (; a >= i;) b.removeChild(b.children[i]), x.removeChild(x.children[i]), --a;
		for (n = 0; n < c.length; n++) {
			let e = P(c[n]), t = o.createElement("div");
			e.bodyTR = t, i === b.children.length ? (b.appendChild(e), x.appendChild(t)) : (b.insertBefore(e, b.children[i + n]), x.insertBefore(t, x.children[i + n]));
		}
		p && M(b);
	}
	function I() {
		for (let e = 0; e < b.children.length; e++) {
			let t = b.children[e];
			t.classList.contains("unstyled") || t.setAttribute("style", k);
		}
	}
	function L() {
		for (let e = 0; e < x.children.length; e++) x.children[e].setAttribute("style", "height: 100%; width: 100%;display: none;");
	}
}
function l(e) {
	return d(e) ? [u(e, "#ffffff", .3), "#000000"] : [u(e, "#000000", .3), "#ffffff"];
}
function u(e, t, n) {
	let r, i, a, o = "#", s = "0123456789abcdef";
	for (let c = 0; c < 3; c++) {
		r = parseInt(e.slice(c * 2 + 1, c * 2 + 3), 16), i = parseInt(t.slice(c * 2 + 1, c * 2 + 3), 16), a = r * (1 - n) + i * n;
		let l = parseInt(("" + a).split(".")[0]), u = parseInt(("" + l / 16).split(".")[0]), d = parseInt(("" + l % 16).split(".")[0]);
		o += s[u] + s[d];
	}
	return o;
}
function d(e) {
	let t = 0;
	for (let n = 0; n < 3; n++) t += parseInt(e.slice(n * 2 + 1, n * 2 + 3), 16);
	return t > 384;
}
//#endregion
export { o as TabWidgetElement, c as tabWidget, a as tabs_exports };

//# sourceMappingURL=tabs.esm.js.map