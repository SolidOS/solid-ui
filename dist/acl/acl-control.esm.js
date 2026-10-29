import e from "../lib/ns.esm.js";
import { label as t } from "../utils/label.esm.js";
import "../utils/index.esm.js";
import { getACLorDefault as n, getProspectiveHolder as r } from "./acl.esm.js";
import { AccessController as i } from "./access-controller.esm.js";
import { style as a } from "../lib/style.esm.js";
import { log as o, warn as s } from "../lib/debug.esm.js";
// src/acl/acl-control.ts
var c = window, l = Symbol("prevent double triggering of drop event");
function u(e) {
	if (o("preventBrowserDropEvents called."), c !== void 0) {
		if (c[l]) return;
		c[l] = !0;
	}
	e.addEventListener("drop", f, !1), e.addEventListener("dragenter", d, !1), e.addEventListener("dragover", d, !1);
}
function d(e) {
	e.stopPropagation(), e.preventDefault();
}
function f(e) {
	e.dataTransfer.files.length > 0 && (c.confirm("Are you sure you want to drop this file here? (Cancel opens it in a new tab)") || (e.stopPropagation(), e.preventDefault(), o("@@@@ document-level DROP suppressed: " + e.dataTransfer.dropEffect)));
}
function p(e) {
	let t = e.uri;
	t.slice(-1) === "/" && (t = t.slice(0, -1));
	let n = t.lastIndexOf("/");
	return n >= 0 && (t = t.slice(n + 1)), t || "/";
}
function m(e, n, r, i) {
	let o = n.dom, s = e.doc(), c = o.createElement("div");
	c.setAttribute("style", a.aclControlBoxContainer);
	let l = c.appendChild(o.createElement("h1"));
	l.textContent = `Sharing for ${r} ${t(e)}`, l.setAttribute("style", a.aclControlBoxHeader);
	let u = c.appendChild(o.createElement("div"));
	u.setAttribute("style", a.aclControlBoxStatus);
	try {
		h(s, i, e, r, n, o, u).then((e) => c.appendChild(e.render()));
	} catch (e) {
		u.innerText = e;
	}
	return c;
}
async function h(e, t, a, o, c, l, u) {
	return new Promise((d, f) => n(e, async (e, n, p, m, h, y) => {
		if (!e) return f(/* @__PURE__ */ Error(`Error reading ${n ? "" : " default "}ACL. status ${p}: ${m}`));
		let b = g(p), x = _(p, m, t) || v(p);
		if (!x && b) try {
			return d(S(await r(b)));
		} catch (e) {
			s(e);
		}
		return d(S());
		function S(e) {
			return new i(a, o, c, u, x, p, m, h, y, e, t, l);
		}
	}));
}
function g(e) {
	let t = e.uri.split("#")[0], n = t.slice(0, -1).lastIndexOf("/"), r = t.indexOf("//");
	return r >= 0 && n < r + 2 || n < 0 ? null : t.slice(0, n + 1);
}
function _(t, n, r) {
	return r.holds(t, e.rdf("type"), e.space("Storage"), n);
}
function v(e) {
	return e.uri === e.site().uri;
}
export { m as ACLControlBox5, f as handleDrop, u as preventBrowserDropEvents, d as preventDrag, p as shortNameForFolder };

//# sourceMappingURL=acl-control.esm.js.map