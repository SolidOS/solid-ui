import e from "../lib/ns.esm.js";
import "../utils/index.esm.js";
import { error as t, warn as n } from "../lib/debug.esm.js";
import { DateFolder as r } from "./dateFolder.esm.js";
import { SEC as i, getBlankMsg as a, signMsg as o } from "./signature.esm.js";
import { getPrivateKey as s } from "./keys.esm.js";
import * as c from "rdflib";
import { authn as l, store as u } from "solid-logic";
//#region src/chat/chatLogic.js
var d = class {
	constructor(e, t) {
		this.channel = e, this.channelRoot = e.doc(), this.options = t, this.dateFolder = new r(this.channelRoot, "chat.ttl"), this.div = null;
	}
	async createMessage(e) {
		return this.updateMessage(e);
	}
	async updateMessage(t, r = null, d, f = null) {
		let p = [], h = /* @__PURE__ */ new Date(), g = "" + h.getTime(), _ = c.term(h), v = r ? r.doc() : this.dateFolder.leafDocumentFromDate(h), y = u.sym(v.uri + "#Msg" + g), b = l.currentUser(), x = a();
		if (x.id = y.uri, r) {
			let t = u.any(r, e.foaf("maker"));
			if (t.uri === b.uri) {
				let t = await m(r);
				p.push(c.st(t, e.dct("isReplacedBy"), y, v));
				let n = u.any(t, e.sioc("has_reply"));
				n && p.push(c.st(y, e.sioc("has_reply"), n, v)), d && p.push(c.st(y, e.schema("dateDeleted"), _, v));
			} else {
				let e = "Error you cannot delete/edit a message from someone else : \n" + t.uri;
				throw n(e), alert(e), Error(e);
			}
		} else p.push(c.st(this.channel, e.wf("message"), y, v));
		if (p.push(c.st(y, e.sioc("content"), u.literal(t), v)), x.content = t, p.push(c.st(y, e.dct("created"), _, v)), x.created = _.value, b) {
			p.push(c.st(y, e.foaf("maker"), b, v)), x.maker = b.uri;
			let t = await s(b), n = o(x, t);
			p.push(c.st(y, c.sym(`${i}proofValue`), c.lit(n), v));
		}
		f && (p.push(c.st(f, e.sioc("has_member"), y, v)), f.doc().sameTerm(y.doc()) || p.push(c.st(f, e.sioc("has_member"), y, f.doc())));
		try {
			await u.updater.updateMany([], p);
		} catch (e) {
			let t = "Error saving chat message: " + e;
			throw n(t), alert(t), Error(t);
		}
		return y;
	}
	async deleteMessage(e) {
		return this.updateMessage("(message deleted)", e, !0);
	}
	async createThread(t) {
		let n = u.each(t, e.sioc("has_reply"), null, t.doc()).filter((t) => u.holds(t, e.rdf("type"), e.sioc("Thread"), t.doc()));
		if (n.length > 0) return n[0];
		let r = c.sym(t.uri + "-thread"), i = [c.st(r, e.rdf("type"), e.sioc("Thread"), r.doc()), c.st(t, e.sioc("has_reply"), r, r.doc())];
		return await u.updater.update([], i), r;
	}
};
async function f(t) {
	let n = [t], r = {};
	r[t.uri] = !0;
	let i = t;
	for (;;) {
		let t = u.any(null, e.dct("isReplacedBy"), i, i.doc());
		if (!t || r[t.uri]) break;
		await u.fetcher.load(t), n.unshift(t), r[t.uri] = !0, i = t;
	}
	for (i = t;;) {
		let t = u.any(i, e.dct("isReplacedBy"), null, i.doc());
		if (!t || r[t.uri]) break;
		n.push(t), r[t.uri] = !0, i = t;
	}
	return n;
}
async function p(n) {
	let r = n, i = {};
	for (; r;) {
		if (i[r.uri]) return t("originalVersion: verion loop" + n), n;
		i[r.uri] = !0, n = r, await u.fetcher.load(n), r = u.any(null, e.dct("isReplacedBy"), n, n.doc());
	}
	return n;
}
async function m(n) {
	let r = n, i = {};
	for (; r;) {
		if (i[r.uri]) return t("mostRecentVersion: verion loop" + n), n;
		i[r.uri] = !0, n = r, await u.fetcher.load(n), r = u.any(n, e.dct("isReplacedBy"), null, n.doc());
	}
	return n;
}
function h(t) {
	return u.holds(t, e.schema("dateDeleted"), null, t.doc());
}
//#endregion
export { d as ChatChannel, f as allVersions, h as isDeleted, m as mostRecentVersion, p as originalVersion };

//# sourceMappingURL=chatLogic.esm.js.map