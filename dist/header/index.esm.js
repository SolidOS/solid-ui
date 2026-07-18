import { style as e } from "../lib/style.esm.js";
import { icons as t } from "../lib/iconBase.esm.js";
import { findImage as n } from "../widgets/buttons.esm.js";
import "../widgets/index.esm.js";
import { loginStatusBox as r } from "../login/login.esm.js";
import { emptyProfile as i } from "./empty-profile.esm.js";
import { getPod as a, throttle as o } from "../utils/headerFooterHelpers.esm.js";
import { authSession as s, authn as c } from "solid-logic";
//#region src/header/index.ts
var l = t.iconBase + "noun_help.svg", u = "https://solidproject.org/assets/img/solid-emblem.svg";
async function d(e, t, n) {
	let r = document.getElementById("PageHeader");
	if (!r) return;
	let i = a();
	f(r, e, i, t, n)(), s.events.on("logout", f(r, e, i, t, n)), s.events.on("login", f(r, e, i, t, n));
}
function f(e, t, n, r, i) {
	return async () => {
		let a = c.currentUser();
		e.innerHTML = "", e.appendChild(await p(t, n, a, r, i));
	};
}
async function p(t, n, r, i, a) {
	let o = document.createElement("a");
	o.href = n.uri, o.setAttribute("style", e.headerBannerLink);
	let s = document.createElement("img");
	a && (s.src = a.logo ? a.logo : u), s.setAttribute("style", e.headerBannerIcon), o.appendChild(s);
	let c = r ? await v(t, r, i) : h(), l = document.createElement("div");
	l.setAttribute("style", e.headerBanner), l.appendChild(o);
	let d = document.createElement("div");
	if (d.setAttribute("style", e.headerBannerRightMenu), d.appendChild(c), a && a.helpMenuList) {
		let e = m(a, a.helpMenuList);
		d.appendChild(e);
	}
	return l.appendChild(d), l;
}
function m(n, r) {
	if (!r) return;
	let i = document.createElement("ul");
	i.setAttribute("style", e.headerUserMenuList), r.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? i.appendChild(y(_(e.label, e.url, e.target))) : i.appendChild(y(g(e.label, e.onclick)));
	});
	let a = document.createElement("nav");
	a.setAttribute("style", e.headerUserMenuNavigationMenuNotDisplayed), a.setAttribute("aria-hidden", "true"), a.setAttribute("id", "helperNav"), a.appendChild(i);
	let s = document.createElement("div");
	s.setAttribute("style", e.headerBannerUserMenu), s.appendChild(a);
	let c = document.createElement("button");
	c.setAttribute("style", e.headerUserMenuTrigger), c.type = "button";
	let u = document.createElement("img");
	u.src = n && n.helpIcon ? n.helpIcon : t.iconBase + l, u.setAttribute("style", e.headerUserMenuTriggerImg), s.appendChild(c), c.appendChild(u);
	let d = o((e) => x(e, c, a), 50);
	c.addEventListener("click", d);
	let f = setTimeout(() => null, 0);
	return s.addEventListener("mouseover", (t) => {
		clearTimeout(f), d(t), document.getElementById("helperNav")?.setAttribute("style", e.headerUserMenuNavigationMenu);
	}), s.addEventListener("mouseout", (t) => {
		f = setTimeout(() => d(t), 200), document.getElementById("helperNav")?.setAttribute("style", e.headerUserMenuNavigationMenuNotDisplayed);
	}), s;
}
function h() {
	let t = document.createElement("div");
	return t.setAttribute("style", e.headerBannerLogin), t.appendChild(r(document, null, {})), t;
}
function g(t, n) {
	let r = document.createElement("button");
	return r.setAttribute("style", e.headerUserMenuButton), r.onmouseover = function() {
		r.setAttribute("style", e.headerUserMenuButtonHover);
	}, r.onmouseout = function() {
		r.setAttribute("style", e.headerUserMenuButton);
	}, r.addEventListener("click", n), r.innerText = t, r;
}
function _(t, n, r) {
	let i = document.createElement("a");
	return i.setAttribute("style", e.headerUserMenuLink), i.onmouseover = function() {
		i.setAttribute("style", e.headerUserMenuLinkHover);
	}, i.onmouseout = function() {
		i.setAttribute("style", e.headerUserMenuLink);
	}, i.href = n, i.innerText = t, r && (i.target = r), i;
}
async function v(t, n, r) {
	let i = t.fetcher;
	i && await i.load(n);
	let a = document.createElement("ul");
	a.setAttribute("style", e.headerUserMenuList), r && r.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? a.appendChild(y(_(e.label, e.url, e.target))) : a.appendChild(y(g(e.label, e.onclick)));
	});
	let s = document.createElement("nav");
	s.setAttribute("style", e.headerUserMenuNavigationMenuNotDisplayed), s.setAttribute("aria-hidden", "true"), s.setAttribute("id", "loggedInNav"), s.appendChild(a);
	let c = document.createElement("button");
	c.setAttribute("style", e.headerUserMenuTrigger), c.type = "button";
	let l = b(t, n);
	typeof l == "string" ? c.innerHTML = l : c.appendChild(l);
	let u = document.createElement("div");
	u.setAttribute("style", e.headerBannerUserMenuNotDisplayed), u.appendChild(c), u.appendChild(s);
	let d = o((e) => x(e, c, s), 50);
	c.addEventListener("click", d);
	let f = setTimeout(() => null, 0);
	return u.addEventListener("mouseover", (t) => {
		clearTimeout(f), d(t), document.getElementById("loggedInNav")?.setAttribute("style", e.headerUserMenuNavigationMenu);
	}), u.addEventListener("mouseout", (t) => {
		f = setTimeout(() => d(t), 200), document.getElementById("loggedInNav")?.setAttribute("style", e.headerUserMenuNavigationMenuNotDisplayed);
	}), u;
}
function y(t) {
	let n = document.createElement("li");
	return n.setAttribute("style", e.headerUserMenuListItem), n.appendChild(t), n;
}
function b(t, r) {
	let a = null;
	try {
		if (a = n(r), !a) return i;
	} catch {
		return i;
	}
	let o = document.createElement("div");
	return o.setAttribute("style", e.headerUserMenuPhoto), o.style.backgroundImage = `url(${a})`, o;
}
function x(e, t, n) {
	let r = t.getAttribute("aria-expanded") === "true", i = e.type === "mouseover", a = e.type === "mouseout";
	r && i || !r && a || (t.setAttribute("aria-expanded", (!r).toString()), n.setAttribute("aria-hidden", r.toString()));
}
//#endregion
export { p as createBanner, m as createHelpMenu, h as createLoginSignUpButtons, v as createUserMenu, g as createUserMenuButton, y as createUserMenuItem, _ as createUserMenuLink, b as getProfileImg, d as initHeader, f as rebuildHeader };

//# sourceMappingURL=index.esm.js.map