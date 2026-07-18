import e from "../lib/ns.esm.js";
import { log_exports as t } from "../lib/log.esm.js";
import * as n from "rdflib";
import { store as r } from "solid-logic";
//#region src/utils/label.ts
var i = {
	log: t,
	ns: e,
	rdf: n
};
function a(e, t = !1) {
	function n(e) {
		return t ? e.slice(0, 1).toUpperCase() + e.slice(1) : e;
	}
	function r(e) {
		let t = "";
		e.slice(-1) === "/" && (e = e.slice(0, -1));
		for (let n = 0; n < e.length; n++) {
			if (e[n] === "_" || e[n] === "-") {
				t += " ";
				continue;
			}
			t += e[n], n + 1 < e.length && e[n].toUpperCase() !== e[n] && e[n + 1].toLowerCase() !== e[n + 1] && (t += " ");
		}
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
	return r.any(e, i.ns.ui("label")) || r.any(e, i.ns.link("message")) || r.any(e, i.ns.vcard("fn")) || r.any(e, i.ns.foaf("name")) || r.any(e, i.ns.dct("title")) || r.any(e, i.ns.dc("title")) || r.any(e, i.ns.rss("title")) || r.any(e, i.ns.contact("fullName")) || r.any(e, r.sym("http://www.w3.org/2001/04/roadmap/org#name")) || r.any(e, i.ns.cal("summary")) || r.any(e, i.ns.foaf("nick")) || r.any(e, i.ns.as("name")) || r.any(e, i.ns.schema("name")) || r.any(e, i.ns.rdfs("label")) || r.any(e, r.sym("http://www.w3.org/2004/02/skos/core#prefLabel"));
}
//#endregion
export { a as label };

//# sourceMappingURL=label.esm.js.map