import { log_exports as e } from "../lib/log.esm.js";
import { store as t } from "solid-logic";
import n from "../lib/ns.esm.js";
import * as r from "rdflib";
// src/utils/label.ts
var i = {
	log: e,
	ns: n,
	rdf: r
};
function a(e, t = !1) {
	function n(e) {
		return t ? e.slice(0, 1).toUpperCase() + e.slice(1) : e;
	}
	function r(e) {
		let t = "";
		e.slice(-1) === "/" && (e = e.slice(0, -1));
		for (let n = 0; n < e.length; n++) e[n] === "_" || e[n] === "-" ? t += " " : (t += e[n], n + 1 < e.length && e[n].toUpperCase() !== e[n] && e[n + 1].toLowerCase() !== e[n + 1] && (t += " "));
		return t.slice(0, 4) === "has " && (t = t.slice(4)), n(t);
	}
	let i = s(e);
	if (i) return n(i.value);
	if (e.termType === "BlankNode") return "...";
	if (e.termType === "Collection") return "(" + e.elements.length + ")";
	let a = e.uri;
	if (a === void 0) return e.toString();
	try {
		a = a.split("/").map(decodeURIComponent).join("/");
	} catch {
		for (let e = a.length - 3; e > 0; e--) {
			let t = "0123456789abcefABCDEF";
			for (; a[e] === "%" && t.indexOf(a[e + 1]) >= 0 && t.indexOf(a[e + 2]) >= 0;) a = a.slice(0, e) + String.fromCharCode(parseInt(a.slice(e + 1, e + 3), 16)) + a.slice(e + 3);
		}
	}
	a = o(a, "/profile/card#me"), a = o(a, "#this"), a = o(a, "#me");
	let c = a.indexOf("#");
	if (c >= 0) return r(a.slice(c + 1));
	let l = a.lastIndexOf("/", a.length - 2);
	return l >= 0 && l < e.uri.length ? r(a.slice(l + 1)) : n(decodeURIComponent(e.uri));
}
function o(e, t) {
	let n = t.length * -1;
	return e.slice(n) === t ? e.slice(0, n) : e;
}
function s(e) {
	return t.any(e, i.ns.ui("label")) || t.any(e, i.ns.link("message")) || t.any(e, i.ns.vcard("fn")) || t.any(e, i.ns.foaf("name")) || t.any(e, i.ns.dct("title")) || t.any(e, i.ns.dc("title")) || t.any(e, i.ns.rss("title")) || t.any(e, i.ns.contact("fullName")) || t.any(e, t.sym("http://www.w3.org/2001/04/roadmap/org#name")) || t.any(e, i.ns.cal("summary")) || t.any(e, i.ns.foaf("nick")) || t.any(e, i.ns.as("name")) || t.any(e, i.ns.schema("name")) || t.any(e, i.ns.rdfs("label")) || t.any(e, t.sym("http://www.w3.org/2004/02/skos/core#prefLabel"));
}
export { a as label };

//# sourceMappingURL=label.esm.js.map