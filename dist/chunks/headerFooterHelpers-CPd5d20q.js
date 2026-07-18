import { O as e, S as t, h as n } from "./solid-logic.esm-BrMdCG2_.js";
//#region src/utils/headerFooterHelpers.ts
function r() {
	let { origin: e, pathname: n } = document.location, r = document.body?.dataset?.appShell === "databrowser", i = n.split("/").filter(Boolean), a = i[i.length - 1] || "", o = /\.[^/]+$/.test(a);
	return r && i.length > 0 && !o ? t(`${e}/${i[0]}/`) : t(e).site();
}
async function i(r, i) {
	try {
		if (!i.any(r, null, n.ldp("Container"), r)) {
			let t = (await i.fetcher.webOperation("GET", r.uri, i.fetcher.initFetchOptions(r.uri, { headers: { accept: "text/turtle" } }))).responseText;
			e(t, i, r.uri, "text/turtle");
		}
	} catch (e) {
		return console.error("Error loading pod " + r + ": " + e), null;
	}
	if (!i.holds(r, n.rdf("type"), n.space("Storage"), r)) return console.warn("Pod  " + r + " does not declare itself as a space:Storage"), null;
	let a = i.any(r, n.solid("owner"), null, r) || i.any(null, n.space("storage"), r, r);
	if (a) {
		try {
			await i.fetcher.load(a.doc());
		} catch {
			return console.warn("Unable to load profile of pod owner " + a), null;
		}
		return i.holds(a, n.space("storage"), r, a.doc()) || console.warn(`Pod owner ${a} does NOT list pod ${r} as their storage`), a;
	} else {
		let e = t(`${r.uri}profile/card#me`);
		try {
			await i.fetcher.load(e);
		} catch {
			return console.error("Ooops. Guessed wrong pod owner webid {$guess} : can't load it."), null;
		}
		return i.holds(e, n.space("storage"), r, e.doc()) ? (console.warn("Using guessed pod owner webid but it links back."), e) : null;
	}
}
function a(e, t) {
	return e.anyValue(t, n.vcard("fn"), null, t.doc()) || e.anyValue(t, n.foaf("name"), null, t.doc()) || t.uri;
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
export { o as i, r as n, i as r, a as t };

//# sourceMappingURL=headerFooterHelpers-CPd5d20q.js.map