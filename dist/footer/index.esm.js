import { style as e } from "../lib/style.esm.js";
import { getName as t, getPod as n, getPodOwner as r } from "../utils/headerFooterHelpers.esm.js";
import { authSession as i, authn as a } from "solid-logic";
//#region src/footer/index.ts
var o = "https://solidproject.org", s = "solidproject.org";
async function c(e, t) {
	let a = document.getElementById("PageFooter");
	if (!a) return;
	let o = n(), s = await r(o, e);
	return l(a, e, o, s, t), i.events.on("login", () => l(a, e, o, s, t)), i.events.on("logout", () => l(a, e, o, s, t)), a;
}
async function l(e, t, n, r, i) {
	let o = a.currentUser();
	return e.innerHTML = "", e.appendChild(await u(t, o, n, r, i)), e;
}
function u(n, r, i, a, c) {
	let l = document.createElement("div");
	l.setAttribute("style", e.footer);
	let u = document.createElement("a");
	if (u.href = c && c.solidProjectUrl ? c.solidProjectUrl : o, u.innerText = c && c.solidProjectName ? c.solidProjectName : s, !i || !a || r && r.equals(a)) {
		let e = document.createElement("span");
		return e.innerText = "Powered by ", l.appendChild(e), l.appendChild(u), l;
	}
	let d = document.createElement("span");
	d.innerText = "You're visiting ";
	let f = document.createElement("a");
	f.href = i.uri, f.innerText = "the Pod";
	let p = document.createElement("span");
	p.innerText = " controlled by ";
	let m = document.createElement("a");
	m.href = a.uri, m.innerText = t(n, a);
	let h = document.createElement("span");
	h.innerText = ". For more info, check out ";
	let g = document.createElement("span");
	return g.innerText = ".", l.appendChild(d), l.appendChild(f), l.appendChild(p), l.appendChild(m), l.appendChild(h), l.appendChild(u), l.appendChild(g), l;
}
//#endregion
export { u as createControllerInfoBlock, c as initFooter, l as rebuildFooter };

//# sourceMappingURL=index.esm.js.map