import e from "../lib/ns.esm.js";
import { label as t } from "../utils/label.esm.js";
import { utils_exports as n } from "../utils/index.esm.js";
import { error as r, log as i, warn as a } from "../lib/debug.esm.js";
import { style as o } from "../lib/style.esm.js";
import { icons as s } from "../lib/iconBase.esm.js";
import { widgets_exports as c } from "../widgets/index.esm.js";
import { findAppInstances as l } from "../login/login.esm.js";
import { media as u } from "../media/index.esm.js";
import { pad_exports as d } from "../lib/pad.esm.js";
import * as f from "rdflib";
import { authn as p, createTypeIndexLogic as m, store as h } from "solid-logic";
//#region src/chat/bookmarks.js
var g = {
	icons: s,
	ns: e,
	media: u,
	pad: d,
	style: o,
	utils: n,
	widgets: c
}, _ = f.Namespace("http://www.w3.org/2002/01/bookmark#"), v = "noun_45961.svg", y = t, b = window.document || null;
function x(e, t) {
	return new Promise(function(n, r) {
		h.updater.update(e, t, function(e, t, i) {
			t ? n() : r(Error(i));
		});
	});
}
async function S(e) {
	let t = _("Bookmark");
	if (await l(e, t, !0), e.instances && e.instances.length > 0) e.bookmarkDocument = e.instances[0], e.instances.length > 1 && a("More than one bookmark file! " + e.instances);
	else if (e.publicProfile) {
		let n = f.sym(e.publicProfile.dir().uri + "bookmarks.ttl");
		try {
			i("Creating new bookmark file " + n), await h.fetcher.createIfNotExists(n);
		} catch (t) {
			return a("Can't make fresh bookmark file:" + t), e;
		}
		await m.registerInTypeIndex(n, e.index, t), e.bookmarkDocument = n;
	} else a("You seem to have no bookmark file, nor even a profile file!");
	return e;
}
async function C(t, n) {
	let r = "", i = p.currentUser();
	if (!i) throw Error("Must be logged on to add Bookmark");
	r = y(h.any(n, e.foaf("maker"))) + ": " + h.anyValue(n, e.sioc("content")).slice(0, 80);
	let o = t.bookmarkDocument, s = g.widgets.newThing(o, r), c = [
		f.st(o, g.ns.dct("references"), s, o),
		f.st(s, g.ns.rdf("type"), _("Bookmark"), o),
		f.st(s, g.ns.dct("created"), /* @__PURE__ */ new Date(), o),
		f.st(s, _("recalls"), n, o),
		f.st(s, g.ns.foaf("maker"), i, o),
		f.st(s, g.ns.dct("title"), r, o)
	];
	try {
		await x([], c);
	} catch (e) {
		let t = "Making bookmark: " + e;
		return a(t), null;
	}
	return s;
}
async function w(e, t, n) {
	await h.fetcher.load(e.bookmarkDocument);
	let o = h.each(null, _("recalls"), t, e.bookmarkDocument);
	if (o.length) {
		if (!confirm("Delete bookmark on this?" + o.length)) return;
		for (let e = 0; e < o.length; e++) try {
			await x(h.connectedStatements(o[e]), []), n.style.backgroundColor = "white", i("Bookmark deleted: " + o[e]);
		} catch (e) {
			r("Cant delete bookmark:" + e), a("Cannot delete bookmark:" + e);
		}
	} else {
		let r = await C(e, t);
		n.style.backgroundColor = "yellow", i("Bookmark added: " + r);
	}
}
async function T(e, t) {
	async function n(t) {
		await h.fetcher.load(e.bookmarkDocument);
		let n = h.any(null, _("recalls"), t.target, e.bookmarkDocument);
		t.style = g.style.buttonStyle, n && (t.style.backgroundColor = "yellow");
	}
	let r;
	if (e.bookmarkDocument) return r = g.widgets.button(b, g.icons.iconBase + v, y(_("Bookmark")), () => {
		w(e, t, r);
	}), r.target = t, await n(r), r;
}
//#endregion
export { S as findBookmarkDocument, T as renderBookmarksButton, w as toggleBookmark };

//# sourceMappingURL=bookmarks.esm.js.map