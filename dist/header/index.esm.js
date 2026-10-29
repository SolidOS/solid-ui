import { icons as e } from "../lib/iconBase.esm.js";
import { loginStatusBox as t } from "../login/login.esm.js";
import { findImage as n } from "../widgets/buttons.esm.js";
import "../widgets/index.esm.js";
import { style as r } from "../lib/style.esm.js";
import { emptyProfile as i } from "./empty-profile.esm.js";
import { getPod as a, throttle as o } from "../utils/headerFooterHelpers.esm.js";
import { authSession as s, authn as c } from "solid-logic";
// src/header/index.ts
var l = e.iconBase + "noun_help.svg", u = "https://solidproject.org/assets/img/solid-emblem.svg";
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
async function p(e, t, n, i, a) {
	let o = document.createElement("a");
	o.href = t.uri, o.setAttribute("style", r.headerBannerLink);
	let s = document.createElement("img");
	a && (s.src = a.logo ? a.logo : u), s.setAttribute("style", r.headerBannerIcon), o.appendChild(s);
	let c = n ? await v(e, n, i) : h(), l = document.createElement("div");
	l.setAttribute("style", r.headerBanner), l.appendChild(o);
	let d = document.createElement("div");
	if (d.setAttribute("style", r.headerBannerRightMenu), d.appendChild(c), a && a.helpMenuList) {
		let e = m(a, a.helpMenuList);
		d.appendChild(e);
	}
	return l.appendChild(d), l;
}
function m(t, n) {
	if (!n) return;
	let i = document.createElement("ul");
	i.setAttribute("style", r.headerUserMenuList), n.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? i.appendChild(y(_(e.label, e.url, e.target))) : i.appendChild(y(g(e.label, e.onclick)));
	});
	let a = document.createElement("nav");
	a.setAttribute("style", r.headerUserMenuNavigationMenuNotDisplayed), a.setAttribute("aria-hidden", "true"), a.setAttribute("id", "helperNav"), a.appendChild(i);
	let s = document.createElement("div");
	s.setAttribute("style", r.headerBannerUserMenu), s.appendChild(a);
	let c = document.createElement("button");
	c.setAttribute("style", r.headerUserMenuTrigger), c.type = "button";
	let u = document.createElement("img");
	u.src = t && t.helpIcon ? t.helpIcon : e.iconBase + l, u.setAttribute("style", r.headerUserMenuTriggerImg), s.appendChild(c), c.appendChild(u);
	let d = o((e) => x(e, c, a), 50);
	c.addEventListener("click", d);
	let f = setTimeout(() => null, 0);
	return s.addEventListener("mouseover", (e) => {
		clearTimeout(f), d(e), document.getElementById("helperNav")?.setAttribute("style", r.headerUserMenuNavigationMenu);
	}), s.addEventListener("mouseout", (e) => {
		f = setTimeout(() => d(e), 200), document.getElementById("helperNav")?.setAttribute("style", r.headerUserMenuNavigationMenuNotDisplayed);
	}), s;
}
function h() {
	let e = document.createElement("div");
	return e.setAttribute("style", r.headerBannerLogin), e.appendChild(t(document, null, {})), e;
}
function g(e, t) {
	let n = document.createElement("button");
	return n.setAttribute("style", r.headerUserMenuButton), n.onmouseover = function() {
		n.setAttribute("style", r.headerUserMenuButtonHover);
	}, n.onmouseout = function() {
		n.setAttribute("style", r.headerUserMenuButton);
	}, n.addEventListener("click", t), n.innerText = e, n;
}
function _(e, t, n) {
	let i = document.createElement("a");
	return i.setAttribute("style", r.headerUserMenuLink), i.onmouseover = function() {
		i.setAttribute("style", r.headerUserMenuLinkHover);
	}, i.onmouseout = function() {
		i.setAttribute("style", r.headerUserMenuLink);
	}, i.href = t, i.innerText = e, n && (i.target = n), i;
}
async function v(e, t, n) {
	let i = e.fetcher;
	i && await i.load(t);
	let a = document.createElement("ul");
	a.setAttribute("style", r.headerUserMenuList), n && n.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? a.appendChild(y(_(e.label, e.url, e.target))) : a.appendChild(y(g(e.label, e.onclick)));
	});
	let s = document.createElement("nav");
	s.setAttribute("style", r.headerUserMenuNavigationMenuNotDisplayed), s.setAttribute("aria-hidden", "true"), s.setAttribute("id", "loggedInNav"), s.appendChild(a);
	let c = document.createElement("button");
	c.setAttribute("style", r.headerUserMenuTrigger), c.type = "button";
	let l = b(e, t);
	typeof l == "string" ? c.innerHTML = l : c.appendChild(l);
	let u = document.createElement("div");
	u.setAttribute("style", r.headerBannerUserMenuNotDisplayed), u.appendChild(c), u.appendChild(s);
	let d = o((e) => x(e, c, s), 50);
	c.addEventListener("click", d);
	let f = setTimeout(() => null, 0);
	return u.addEventListener("mouseover", (e) => {
		clearTimeout(f), d(e), document.getElementById("loggedInNav")?.setAttribute("style", r.headerUserMenuNavigationMenu);
	}), u.addEventListener("mouseout", (e) => {
		f = setTimeout(() => d(e), 200), document.getElementById("loggedInNav")?.setAttribute("style", r.headerUserMenuNavigationMenuNotDisplayed);
	}), u;
}
function y(e) {
	let t = document.createElement("li");
	return t.setAttribute("style", r.headerUserMenuListItem), t.appendChild(e), t;
}
function b(e, t) {
	let a = null;
	try {
		if (a = n(t), !a) return i;
	} catch {
		return i;
	}
	let o = document.createElement("div");
	return o.setAttribute("style", r.headerUserMenuPhoto), o.style.backgroundImage = `url(${a})`, o;
}
function x(e, t, n) {
	let r = t.getAttribute("aria-expanded") === "true", i = e.type === "mouseover", a = e.type === "mouseout";
	r && i || !r && a || (t.setAttribute("aria-expanded", (!r).toString()), n.setAttribute("aria-hidden", r.toString()));
}
export { p as createBanner, m as createHelpMenu, h as createLoginSignUpButtons, v as createUserMenu, g as createUserMenuButton, y as createUserMenuItem, _ as createUserMenuLink, b as getProfileImg, d as initHeader, f as rebuildHeader };

//# sourceMappingURL=index.esm.js.map