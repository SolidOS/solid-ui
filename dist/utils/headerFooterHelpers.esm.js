import e from "../lib/ns.esm.js";
import { parse as t, sym as n } from "rdflib";
//#region src/utils/headerFooterHelpers.ts
function r() {
	let { origin: e, pathname: t } = document.location, r = document.body?.dataset?.appShell === "databrowser", i = t.split("/").filter(Boolean), a = i[i.length - 1] || "", o = /\.[^/]+$/.test(a);
	return r && i.length > 0 && !o ? n(`${e}/${i[0]}/`) : n(e).site();
}
async function i(r, i) {
	try {
		if (!i.any(r, null, e.ldp("Container"), r)) {
			let e = (await i.fetcher.webOperation("GET", r.uri, i.fetcher.initFetchOptions(r.uri, { headers: { accept: "text/turtle" } }))).responseText;
			t(e, i, r.uri, "text/turtle");
		}
	} catch (e) {
		return console.error("Error loading pod " + r + ": " + e), null;
	}
	if (!i.holds(r, e.rdf("type"), e.space("Storage"), r)) return console.warn("Pod  " + r + " does not declare itself as a space:Storage"), null;
	let a = i.any(r, e.solid("owner"), null, r) || i.any(null, e.space("storage"), r, r);
	if (a) {
		try {
			await i.fetcher.load(a.doc());
		} catch {
			return console.warn("Unable to load profile of pod owner " + a), null;
		}
		return i.holds(a, e.space("storage"), r, a.doc()) || console.warn(`Pod owner ${a} does NOT list pod ${r} as their storage`), a;
	}
	{
		let t = n(`${r.uri}profile/card#me`);
		try {
			await i.fetcher.load(t);
		} catch {
			return console.error("Ooops. Guessed wrong pod owner webid {$guess} : can't load it."), null;
		}
		return i.holds(t, e.space("storage"), r, t.doc()) ? (console.warn("Using guessed pod owner webid but it links back."), t) : null;
	}
}
function a(t, n) {
	return t.anyValue(n, e.vcard("fn"), null, n.doc()) || t.anyValue(n, e.foaf("name"), null, n.doc()) || n.uri;
}
function o(e, t, n = {}) {
	let r, i, a, o = null, s = 0, c = function() {
		s = n.leading ? Date.now() : 0, o = null, a = e.apply(r, i), o || (r = i = null);
	};
	return function() {
		let l = Date.now();
		!s && !n.leading && (s = l);
		let u = t - (l - s);
		return r = this, i = arguments, u <= 0 || u > t ? (o &&= (clearTimeout(o), null), s = l, a = e.apply(r, i), o || (r = i = null)) : !o && n.trailing !== !1 && (o = setTimeout(c, u)), a;
	};
}
//#endregion
export { a as getName, r as getPod, i as getPodOwner, o as throttle };

//# sourceMappingURL=headerFooterHelpers.esm.js.map