import { icons as e } from "../lib/iconBase.esm.js";
import { authSession as t, authn as n } from "solid-logic";
import { loginStatusBox as r } from "../login/login.esm.js";
import { findImage as i } from "../widgets/buttons.esm.js";
import "../widgets/index.esm.js";
import { style as a } from "../lib/style.esm.js";
import { emptyProfile as o } from "./empty-profile.esm.js";
import { getPod as s, throttle as c } from "../utils/headerFooterHelpers.esm.js";
// src/header/index.ts
var l = e.iconBase + "noun_help.svg", u = "https://solidproject.org/assets/img/solid-emblem.svg";
async function d(e, n, r) {
	let i = document.getElementById("PageHeader");
	if (!i) return;
	let a = s();
	f(i, e, a, n, r)(), t.events.on("logout", f(i, e, a, n, r)), t.events.on("login", f(i, e, a, n, r));
}
function f(e, t, r, i, a) {
	return async () => {
		let o = n.currentUser();
		e.innerHTML = "", e.appendChild(await p(t, r, o, i, a));
	};
}
async function p(e, t, n, r, i) {
	let o = document.createElement("a");
	o.href = t.uri, o.setAttribute("style", a.headerBannerLink);
	let s = document.createElement("img");
	i && (s.src = i.logo ? i.logo : u), s.setAttribute("style", a.headerBannerIcon), o.appendChild(s);
	let c = n ? await v(e, n, r) : h(), l = document.createElement("div");
	l.setAttribute("style", a.headerBanner), l.appendChild(o);
	let d = document.createElement("div");
	if (d.setAttribute("style", a.headerBannerRightMenu), d.appendChild(c), i && i.helpMenuList) {
		let e = m(i, i.helpMenuList);
		d.appendChild(e);
	}
	return l.appendChild(d), l;
}
function m(t, n) {
	if (!n) return;
	let r = document.createElement("ul");
	r.setAttribute("style", a.headerUserMenuList), n.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? r.appendChild(y(_(e.label, e.url, e.target))) : r.appendChild(y(g(e.label, e.onclick)));
	});
	let i = document.createElement("nav");
	i.setAttribute("style", a.headerUserMenuNavigationMenuNotDisplayed), i.setAttribute("aria-hidden", "true"), i.setAttribute("id", "helperNav"), i.appendChild(r);
	let o = document.createElement("div");
	o.setAttribute("style", a.headerBannerUserMenu), o.appendChild(i);
	let s = document.createElement("button");
	s.setAttribute("style", a.headerUserMenuTrigger), s.type = "button";
	let u = document.createElement("img");
	u.src = t && t.helpIcon ? t.helpIcon : e.iconBase + l, u.setAttribute("style", a.headerUserMenuTriggerImg), o.appendChild(s), s.appendChild(u);
	let d = c((e) => x(e, s, i), 50);
	s.addEventListener("click", d);
	let f = setTimeout(() => null, 0);
	return o.addEventListener("mouseover", (e) => {
		clearTimeout(f), d(e), document.getElementById("helperNav")?.setAttribute("style", a.headerUserMenuNavigationMenu);
	}), o.addEventListener("mouseout", (e) => {
		f = setTimeout(() => d(e), 200), document.getElementById("helperNav")?.setAttribute("style", a.headerUserMenuNavigationMenuNotDisplayed);
	}), o;
}
function h() {
	let e = document.createElement("div");
	return e.setAttribute("style", a.headerBannerLogin), e.appendChild(r(document, null, {})), e;
}
function g(e, t) {
	let n = document.createElement("button");
	return n.setAttribute("style", a.headerUserMenuButton), n.onmouseover = function() {
		n.setAttribute("style", a.headerUserMenuButtonHover);
	}, n.onmouseout = function() {
		n.setAttribute("style", a.headerUserMenuButton);
	}, n.addEventListener("click", t), n.innerText = e, n;
}
function _(e, t, n) {
	let r = document.createElement("a");
	return r.setAttribute("style", a.headerUserMenuLink), r.onmouseover = function() {
		r.setAttribute("style", a.headerUserMenuLinkHover);
	}, r.onmouseout = function() {
		r.setAttribute("style", a.headerUserMenuLink);
	}, r.href = t, r.innerText = e, n && (r.target = n), r;
}
async function v(e, t, n) {
	let r = e.fetcher;
	r && await r.load(t);
	let i = document.createElement("ul");
	i.setAttribute("style", a.headerUserMenuList), n && n.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? i.appendChild(y(_(e.label, e.url, e.target))) : i.appendChild(y(g(e.label, e.onclick)));
	});
	let o = document.createElement("nav");
	o.setAttribute("style", a.headerUserMenuNavigationMenuNotDisplayed), o.setAttribute("aria-hidden", "true"), o.setAttribute("id", "loggedInNav"), o.appendChild(i);
	let s = document.createElement("button");
	s.setAttribute("style", a.headerUserMenuTrigger), s.type = "button";
	let l = b(e, t);
	typeof l == "string" ? s.innerHTML = l : s.appendChild(l);
	let u = document.createElement("div");
	u.setAttribute("style", a.headerBannerUserMenuNotDisplayed), u.appendChild(s), u.appendChild(o);
	let d = c((e) => x(e, s, o), 50);
	s.addEventListener("click", d);
	let f = setTimeout(() => null, 0);
	return u.addEventListener("mouseover", (e) => {
		clearTimeout(f), d(e), document.getElementById("loggedInNav")?.setAttribute("style", a.headerUserMenuNavigationMenu);
	}), u.addEventListener("mouseout", (e) => {
		f = setTimeout(() => d(e), 200), document.getElementById("loggedInNav")?.setAttribute("style", a.headerUserMenuNavigationMenuNotDisplayed);
	}), u;
}
function y(e) {
	let t = document.createElement("li");
	return t.setAttribute("style", a.headerUserMenuListItem), t.appendChild(e), t;
}
function b(e, t) {
	let n = null;
	try {
		if (n = i(t), !n) return o;
	} catch {
		return o;
	}
	let r = document.createElement("div");
	return r.setAttribute("style", a.headerUserMenuPhoto), r.style.backgroundImage = `url(${n})`, r;
}
function x(e, t, n) {
	let r = t.getAttribute("aria-expanded") === "true", i = e.type === "mouseover", a = e.type === "mouseout";
	r && i || !r && a || (t.setAttribute("aria-expanded", (!r).toString()), n.setAttribute("aria-hidden", r.toString()));
}
export { p as createBanner, m as createHelpMenu, h as createLoginSignUpButtons, v as createUserMenu, g as createUserMenuButton, y as createUserMenuItem, _ as createUserMenuLink, b as getProfileImg, d as initHeader, f as rebuildHeader };

//# sourceMappingURL=index.esm.js.map