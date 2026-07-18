import e from "../lib/ns.esm.js";
import { label as t } from "../utils/label.esm.js";
import "../utils/index.esm.js";
import { log as n, warn as r } from "../lib/debug.esm.js";
import { getACLorDefault as i, getProspectiveHolder as a } from "./acl.esm.js";
import { style as o } from "../lib/style.esm.js";
import { AccessController as s } from "./access-controller.esm.js";
//#region src/acl/acl-control.ts
var c = window, l = Symbol("prevent double triggering of drop event");
function u(e) {
	if (n("preventBrowserDropEvents called."), c !== void 0) {
		if (c[l]) return;
		c[l] = !0;
	}
	e.addEventListener("drop", f, !1), e.addEventListener("dragenter", d, !1), e.addEventListener("dragover", d, !1);
}
function d(e) {
	e.stopPropagation(), e.preventDefault();
}
function f(e) {
	e.dataTransfer.files.length > 0 && (c.confirm("Are you sure you want to drop this file here? (Cancel opens it in a new tab)") || (e.stopPropagation(), e.preventDefault(), n("@@@@ document-level DROP suppressed: " + e.dataTransfer.dropEffect)));
}
function p(e) {
	let t = e.uri;
	t.slice(-1) === "/" && (t = t.slice(0, -1));
	let n = t.lastIndexOf("/");
	return n >= 0 && (t = t.slice(n + 1)), t || "/";
}
function m(e, n, r, i) {
	let a = n.dom, s = e.doc(), c = a.createElement("div");
	c.setAttribute("style", o.aclControlBoxContainer);
	let l = c.appendChild(a.createElement("h1"));
	l.textContent = `Sharing for ${r} ${t(e)}`, l.setAttribute("style", o.aclControlBoxHeader);
	let u = c.appendChild(a.createElement("div"));
	u.setAttribute("style", o.aclControlBoxStatus);
	try {
		h(s, i, e, r, n, a, u).then((e) => c.appendChild(e.render()));
	} catch (e) {
		u.innerText = e;
	}
	return c;
}
async function h(e, t, n, o, c, l, u) {
	return new Promise((d, f) => i(e, async (e, i, p, m, h, y) => {
		if (!e) return f(/* @__PURE__ */ Error(`Error reading ${i ? "" : " default "}ACL. status ${p}: ${m}`));
		let b = g(p), x = _(p, m, t) || v(p);
		if (!x && b) try {
			return d(S(await a(b)));
		} catch (e) {
			r(e);
		}
		return d(S());
		function S(e) {
			return new s(n, o, c, u, x, p, m, h, y, e, t, l);
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
//#endregion
export { m as ACLControlBox5, f as handleDrop, u as preventBrowserDropEvents, d as preventDrag, p as shortNameForFolder };

//# sourceMappingURL=acl-control.esm.js.map