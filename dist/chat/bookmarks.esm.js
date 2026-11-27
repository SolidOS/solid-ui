import { error as e, log as t, warn as n } from "../lib/debug.esm.js";
import { label as r } from "../utils/label.esm.js";
import { icons as i } from "../lib/iconBase.esm.js";
import { media as a } from "../media/index.esm.js";
import o from "../lib/ns.esm.js";
import { pad_exports as s } from "../lib/pad.esm.js";
import * as c from "rdflib";
import { style as l } from "../lib/style.esm.js";
import { utils_exports as u } from "../utils/index.esm.js";
import { widgets_exports as d } from "../widgets/index.esm.js";
import { authn as f, createTypeIndexLogic as p, store as m } from "solid-logic";
import { findAppInstances as h } from "../login/login.esm.js";
// src/chat/bookmarks.js
var g = {
	icons: i,
	ns: o,
	media: a,
	pad: s,
	style: l,
	utils: u,
	widgets: d
}, _ = c.Namespace("http://www.w3.org/2002/01/bookmark#"), v = "noun_45961.svg", y = r, b = window.document || null;
function x(e, t) {
	return new Promise(function(n, r) {
		m.updater.update(e, t, function(e, t, i) {
			t ? n() : r(Error(i));
		});
	});
}
async function S(e) {
	let r = _("Bookmark");
	if (await h(e, r, !0), e.instances && e.instances.length > 0) e.bookmarkDocument = e.instances[0], e.instances.length > 1 && n("More than one bookmark file! " + e.instances);
	else if (e.publicProfile) {
		let i = c.sym(e.publicProfile.dir().uri + "bookmarks.ttl");
		try {
			t("Creating new bookmark file " + i), await m.fetcher.createIfNotExists(i);
		} catch (t) {
			return n("Can't make fresh bookmark file:" + t), e;
		}
		await p.registerInTypeIndex(i, e.index, r), e.bookmarkDocument = i;
	} else n("You seem to have no bookmark file, nor even a profile file!");
	return e;
}
async function C(e, t) {
	let r = "", i = f.currentUser();
	if (!i) throw Error("Must be logged on to add Bookmark");
	r = y(m.any(t, o.foaf("maker"))) + ": " + m.anyValue(t, o.sioc("content")).slice(0, 80);
	let a = e.bookmarkDocument, s = g.widgets.newThing(a, r), l = [
		c.st(a, g.ns.dct("references"), s, a),
		c.st(s, g.ns.rdf("type"), _("Bookmark"), a),
		c.st(s, g.ns.dct("created"), /* @__PURE__ */ new Date(), a),
		c.st(s, _("recalls"), t, a),
		c.st(s, g.ns.foaf("maker"), i, a),
		c.st(s, g.ns.dct("title"), r, a)
	];
	try {
		await x([], l);
	} catch (e) {
		let t = "Making bookmark: " + e;
		return n(t), null;
	}
	return s;
}
async function w(r, i, a) {
	await m.fetcher.load(r.bookmarkDocument);
	let o = m.each(null, _("recalls"), i, r.bookmarkDocument);
	if (o.length) {
		if (!confirm("Delete bookmark on this?" + o.length)) return;
		for (let r = 0; r < o.length; r++) try {
			await x(m.connectedStatements(o[r]), []), a.style.backgroundColor = "white", t("Bookmark deleted: " + o[r]);
		} catch (t) {
			e("Cant delete bookmark:" + t), n("Cannot delete bookmark:" + t);
		}
	} else {
		let e = await C(r, i);
		a.style.backgroundColor = "yellow", t("Bookmark added: " + e);
	}
}
async function T(e, t) {
	async function n(t) {
		await m.fetcher.load(e.bookmarkDocument);
		let n = m.any(null, _("recalls"), t.target, e.bookmarkDocument);
		t.style = g.style.buttonStyle, n && (t.style.backgroundColor = "yellow");
	}
	let r;
	if (e.bookmarkDocument) return r = g.widgets.button(b, g.icons.iconBase + v, y(_("Bookmark")), () => {
		w(e, t, r);
	}), r.target = t, await n(r), r;
}
export { S as findBookmarkDocument, T as renderBookmarksButton, w as toggleBookmark };

//# sourceMappingURL=bookmarks.esm.js.map