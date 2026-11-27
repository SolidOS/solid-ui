import { authSession as e, authn as t } from "solid-logic";
import { style as n } from "../lib/style.esm.js";
import { getName as r, getPod as i, getPodOwner as a } from "../utils/headerFooterHelpers.esm.js";
// src/footer/index.ts
var o = "https://solidproject.org", s = "solidproject.org";
async function c(t, n) {
	let r = document.getElementById("PageFooter");
	if (!r) return;
	let o = i(), s = await a(o, t);
	return l(r, t, o, s, n), e.events.on("login", () => l(r, t, o, s, n)), e.events.on("logout", () => l(r, t, o, s, n)), r;
}
async function l(e, n, r, i, a) {
	let o = t.currentUser();
	return e.innerHTML = "", e.appendChild(await u(n, o, r, i, a)), e;
}
function u(e, t, i, a, c) {
	let l = document.createElement("div");
	l.setAttribute("style", n.footer);
	let u = document.createElement("a");
	if (u.href = c && c.solidProjectUrl ? c.solidProjectUrl : o, u.innerText = c && c.solidProjectName ? c.solidProjectName : s, !i || !a || t && t.equals(a)) {
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
	m.href = a.uri, m.innerText = r(e, a);
	let h = document.createElement("span");
	h.innerText = ". For more info, check out ";
	let g = document.createElement("span");
	return g.innerText = ".", l.appendChild(d), l.appendChild(f), l.appendChild(p), l.appendChild(m), l.appendChild(h), l.appendChild(u), l.appendChild(g), l;
}
export { u as createControllerInfoBlock, c as initFooter, l as rebuildFooter };

//# sourceMappingURL=index.esm.js.map