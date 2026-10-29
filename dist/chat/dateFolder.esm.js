import { log as e, trace as t } from "../lib/debug.esm.js";
import n from "../lib/ns.esm.js";
import * as r from "rdflib";
import { store as i } from "solid-logic";
// src/chat/dateFolder.js
async function a(e) {
	return await i.fetcher.load(e), !(i.statementsMatching(null, n.dct("created"), null, e).length > 0);
}
var o = class {
	constructor(e, t, r) {
		this.root = e, this.rootFolder = e.dir(), this.leafFileName = t || "index.ttl", this.membershipProperty = r || n.wf("leafObject");
	}
	leafDocumentFromDate(e) {
		let t = e.toISOString().split("T")[0].replace(/-/g, "/");
		return t = this.root.dir().uri + t + "/" + this.leafFileName, i.sym(t);
	}
	dateFromLeafDocument(e) {
		let t = this.rootFolder.uri.length, n = e.uri.slice(t, t + 10).replace(/\//g, "-");
		return new Date(n);
	}
	async loadPrevious(t, r) {
		async function o(t, a) {
			function s(e) {
				return !(r ? e.uri >= t.uri : e.uri <= t.uri);
			}
			function c(e) {
				let t = e.uri.slice(0, -1).split("/").slice(-1)[0];
				return !!"0123456789".includes(t[0]);
			}
			function l(e) {
				return e = e.filter(c), e.sort(), r || e.reverse(), e.pop();
			}
			let u = t.dir();
			try {
				await i.fetcher.load(u);
				let e = i.each(u, n.ldp("contains"));
				e = e.filter(s);
				let t = l(e);
				if (t) return t;
			} catch (t) {
				if (t.response && t.response.status && t.response.status === 404) e("Error 404 for chat parent file " + u);
				else throw e("*** Error NON 404 for chat parent file " + u), Error(`*** ${t.message} for chat folder ${u}`);
			}
			if (a === 0) return null;
			let d = await o(u, a - 1);
			return d ? (await i.fetcher.load(d), l(i.each(d, n.ldp("contains")))) : null;
		}
		let s = this.leafDocumentFromDate(t).dir();
		for (;;) {
			let e = await o(s, 3);
			if (e) {
				let n = i.sym(e.uri + this.leafFileName), r = this.dateFromLeafDocument(n);
				if (await a(n)) t = r, s = this.leafDocumentFromDate(t).dir();
				else return r;
			} else return null;
		}
	}
	async firstLeaf(e) {
		let i = r.graph(), a = new r.Fetcher(i);
		async function o(t) {
			function r(e) {
				let t = e.uri.slice(0, -1).split("/").slice(-1)[0];
				return !!"0123456789".includes(t[0]);
			}
			delete a.requested[t.uri], await a.load(t, { force: !0 });
			let o = i.each(t, n.ldp("contains"));
			if (o = o.filter(r), o.length === 0) throw Error(" @@@  No children to         parent2 " + t);
			return o.sort(), e && o.reverse(), o[0];
		}
		let s = await o(await o(await o(this.root.dir()))), c = r.sym(s.uri + "chat.ttl");
		await a.load(c);
		let l = i.each(this.root, this.membershipProperty, null, c);
		if (l.length === 0) {
			let e = "  INCONSISTENCY -- no chat leafObject in file " + c;
			throw t(e), Error(e);
		}
		let u = l.map((e) => [i.any(e, n.dct("created")), e]);
		return u.sort(), e && u.reverse(), u[0][1];
	}
};
export { o as DateFolder, a as emptyLeaf };

//# sourceMappingURL=dateFolder.esm.js.map