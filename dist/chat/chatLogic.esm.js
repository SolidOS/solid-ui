import { error as e, warn as t } from "../lib/debug.esm.js";
import { DateFolder as n } from "./dateFolder.esm.js";
import { authn as r, store as i } from "solid-logic";
import a from "../lib/ns.esm.js";
import * as o from "rdflib";
import "../utils/index.esm.js";
import { SEC as s, getBlankMsg as c, signMsg as l } from "./signature.esm.js";
import { getPrivateKey as u } from "./keys.esm.js";
// src/chat/chatLogic.js
var d = class {
	constructor(e, t) {
		this.channel = e, this.channelRoot = e.doc(), this.options = t, this.dateFolder = new n(this.channelRoot, "chat.ttl"), this.div = null;
	}
	async createMessage(e) {
		return this.updateMessage(e);
	}
	async updateMessage(e, n = null, d, f = null) {
		let p = [], h = /* @__PURE__ */ new Date(), g = "" + h.getTime(), _ = o.term(h), v = n ? n.doc() : this.dateFolder.leafDocumentFromDate(h), y = i.sym(v.uri + "#Msg" + g), b = r.currentUser(), x = c();
		if (x.id = y.uri, n) {
			let e = i.any(n, a.foaf("maker"));
			if (e.uri === b.uri) {
				let e = await m(n);
				p.push(o.st(e, a.dct("isReplacedBy"), y, v));
				let t = i.any(e, a.sioc("has_reply"));
				t && p.push(o.st(y, a.sioc("has_reply"), t, v)), d && p.push(o.st(y, a.schema("dateDeleted"), _, v));
			} else {
				let n = "Error you cannot delete/edit a message from someone else : \n" + e.uri;
				throw t(n), alert(n), Error(n);
			}
		} else p.push(o.st(this.channel, a.wf("message"), y, v));
		if (p.push(o.st(y, a.sioc("content"), i.literal(e), v)), x.content = e, p.push(o.st(y, a.dct("created"), _, v)), x.created = _.value, b) {
			p.push(o.st(y, a.foaf("maker"), b, v)), x.maker = b.uri;
			let e = await u(b), t = l(x, e);
			p.push(o.st(y, o.sym(`${s}proofValue`), o.lit(t), v));
		}
		f && (p.push(o.st(f, a.sioc("has_member"), y, v)), f.doc().sameTerm(y.doc()) || p.push(o.st(f, a.sioc("has_member"), y, f.doc())));
		try {
			await i.updater.updateMany([], p);
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
		let t = i.each(e, a.sioc("has_reply"), null, e.doc()).filter((e) => i.holds(e, a.rdf("type"), a.sioc("Thread"), e.doc()));
		if (t.length > 0) return t[0];
		let n = o.sym(e.uri + "-thread"), r = [o.st(n, a.rdf("type"), a.sioc("Thread"), n.doc()), o.st(e, a.sioc("has_reply"), n, n.doc())];
		return await i.updater.update([], r), n;
	}
};
async function f(e) {
	let t = [e], n = {};
	n[e.uri] = !0;
	let r = e;
	for (;;) {
		let e = i.any(null, a.dct("isReplacedBy"), r, r.doc());
		if (!e || n[e.uri]) break;
		await i.fetcher.load(e), t.unshift(e), n[e.uri] = !0, r = e;
	}
	for (r = e;;) {
		let e = i.any(r, a.dct("isReplacedBy"), null, r.doc());
		if (!e || n[e.uri]) break;
		t.push(e), n[e.uri] = !0, r = e;
	}
	return t;
}
async function p(t) {
	let n = t, r = {};
	for (; n;) {
		if (r[n.uri]) return e("originalVersion: verion loop" + t), t;
		r[n.uri] = !0, t = n, await i.fetcher.load(t), n = i.any(null, a.dct("isReplacedBy"), t, t.doc());
	}
	return t;
}
async function m(t) {
	let n = t, r = {};
	for (; n;) {
		if (r[n.uri]) return e("mostRecentVersion: verion loop" + t), t;
		r[n.uri] = !0, t = n, await i.fetcher.load(t), n = i.any(t, a.dct("isReplacedBy"), null, t.doc());
	}
	return t;
}
function h(e) {
	return i.holds(e, a.schema("dateDeleted"), null, e.doc());
}
export { d as ChatChannel, f as allVersions, h as isDeleted, m as mostRecentVersion, p as originalVersion };

//# sourceMappingURL=chatLogic.esm.js.map