import { error as e, warn as t } from "../lib/debug.esm.js";
import { DateFolder as n } from "./dateFolder.esm.js";
import r from "../lib/ns.esm.js";
import "../utils/index.esm.js";
import { SEC as i, getBlankMsg as a, signMsg as o } from "./signature.esm.js";
import { getPrivateKey as s } from "./keys.esm.js";
import * as c from "rdflib";
import { authn as l, store as u } from "solid-logic";
// src/chat/chatLogic.js
var d = class {
	constructor(e, t) {
		this.channel = e, this.channelRoot = e.doc(), this.options = t, this.dateFolder = new n(this.channelRoot, "chat.ttl"), this.div = null;
	}
	async createMessage(e) {
		return this.updateMessage(e);
	}
	async updateMessage(e, n = null, d, f = null) {
		let p = [], h = /* @__PURE__ */ new Date(), g = "" + h.getTime(), _ = c.term(h), v = n ? n.doc() : this.dateFolder.leafDocumentFromDate(h), y = u.sym(v.uri + "#Msg" + g), b = l.currentUser(), x = a();
		if (x.id = y.uri, n) {
			let e = u.any(n, r.foaf("maker"));
			if (e.uri === b.uri) {
				let e = await m(n);
				p.push(c.st(e, r.dct("isReplacedBy"), y, v));
				let t = u.any(e, r.sioc("has_reply"));
				t && p.push(c.st(y, r.sioc("has_reply"), t, v)), d && p.push(c.st(y, r.schema("dateDeleted"), _, v));
			} else {
				let n = "Error you cannot delete/edit a message from someone else : \n" + e.uri;
				throw t(n), alert(n), Error(n);
			}
		} else p.push(c.st(this.channel, r.wf("message"), y, v));
		if (p.push(c.st(y, r.sioc("content"), u.literal(e), v)), x.content = e, p.push(c.st(y, r.dct("created"), _, v)), x.created = _.value, b) {
			p.push(c.st(y, r.foaf("maker"), b, v)), x.maker = b.uri;
			let e = await s(b), t = o(x, e);
			p.push(c.st(y, c.sym(`${i}proofValue`), c.lit(t), v));
		}
		f && (p.push(c.st(f, r.sioc("has_member"), y, v)), f.doc().sameTerm(y.doc()) || p.push(c.st(f, r.sioc("has_member"), y, f.doc())));
		try {
			await u.updater.updateMany([], p);
		} catch (e) {
			let n = "Error saving chat message: " + e;
			throw t(n), alert(n), Error(n);
		}
		return y;
	}
	async deleteMessage(e) {
		return this.updateMessage("(message deleted)", e, !0);
	}
	async createThread(e) {
		let t = u.each(e, r.sioc("has_reply"), null, e.doc()).filter((e) => u.holds(e, r.rdf("type"), r.sioc("Thread"), e.doc()));
		if (t.length > 0) return t[0];
		let n = c.sym(e.uri + "-thread"), i = [c.st(n, r.rdf("type"), r.sioc("Thread"), n.doc()), c.st(e, r.sioc("has_reply"), n, n.doc())];
		return await u.updater.update([], i), n;
	}
};
async function f(e) {
	let t = [e], n = {};
	n[e.uri] = !0;
	let i = e;
	for (;;) {
		let e = u.any(null, r.dct("isReplacedBy"), i, i.doc());
		if (!e || n[e.uri]) break;
		await u.fetcher.load(e), t.unshift(e), n[e.uri] = !0, i = e;
	}
	for (i = e;;) {
		let e = u.any(i, r.dct("isReplacedBy"), null, i.doc());
		if (!e || n[e.uri]) break;
		t.push(e), n[e.uri] = !0, i = e;
	}
	return t;
}
async function p(t) {
	let n = t, i = {};
	for (; n;) {
		if (i[n.uri]) return e("originalVersion: verion loop" + t), t;
		i[n.uri] = !0, t = n, await u.fetcher.load(t), n = u.any(null, r.dct("isReplacedBy"), t, t.doc());
	}
	return t;
}
async function m(t) {
	let n = t, i = {};
	for (; n;) {
		if (i[n.uri]) return e("mostRecentVersion: verion loop" + t), t;
		i[n.uri] = !0, t = n, await u.fetcher.load(t), n = u.any(t, r.dct("isReplacedBy"), null, t.doc());
	}
	return t;
}
function h(e) {
	return u.holds(e, r.schema("dateDeleted"), null, e.doc());
}
export { d as ChatChannel, f as allVersions, h as isDeleted, m as mostRecentVersion, p as originalVersion };

//# sourceMappingURL=chatLogic.esm.js.map