import { log as e, trace as t } from "../lib/debug.esm.js";
import { store as n } from "solid-logic";
import r from "../lib/ns.esm.js";
import * as i from "rdflib";
// src/chat/dateFolder.js
async function a(e) {
	return await n.fetcher.load(e), !(n.statementsMatching(null, r.dct("created"), null, e).length > 0);
}
var o = class {
	constructor(e, t, n) {
		this.root = e, this.rootFolder = e.dir(), this.leafFileName = t || "index.ttl", this.membershipProperty = n || r.wf("leafObject");
	}
	leafDocumentFromDate(e) {
		let t = e.toISOString().split("T")[0].replace(/-/g, "/");
		return t = this.root.dir().uri + t + "/" + this.leafFileName, n.sym(t);
	}
	dateFromLeafDocument(e) {
		let t = this.rootFolder.uri.length, n = e.uri.slice(t, t + 10).replace(/\//g, "-");
		return new Date(n);
	}
	async loadPrevious(t, i) {
		async function o(t, a) {
			function s(e) {
				return !(i ? e.uri >= t.uri : e.uri <= t.uri);
			}
			function c(e) {
				let t = e.uri.slice(0, -1).split("/").slice(-1)[0];
				return !!"0123456789".includes(t[0]);
			}
			function l(e) {
				return e = e.filter(c), e.sort(), i || e.reverse(), e.pop();
			}
			let u = t.dir();
			try {
				await n.fetcher.load(u);
				let e = n.each(u, r.ldp("contains"));
				e = e.filter(s);
				let t = l(e);
				if (t) return t;
			} catch (t) {
				if (t.response && t.response.status && t.response.status === 404) e("Error 404 for chat parent file " + u);
				else throw e("*** Error NON 404 for chat parent file " + u), Error(`*** ${t.message} for chat folder ${u}`);
			}
			if (a === 0) return null;
			let d = await o(u, a - 1);
			return d ? (await n.fetcher.load(d), l(n.each(d, r.ldp("contains")))) : null;
		}
		let s = this.leafDocumentFromDate(t).dir();
		for (;;) {
			let e = await o(s, 3);
			if (e) {
				let r = n.sym(e.uri + this.leafFileName), i = this.dateFromLeafDocument(r);
				if (await a(r)) t = i, s = this.leafDocumentFromDate(t).dir();
				else return i;
			} else return null;
		}
	}
	async firstLeaf(e) {
		let n = i.graph(), a = new i.Fetcher(n);
		async function o(t) {
			function i(e) {
				let t = e.uri.slice(0, -1).split("/").slice(-1)[0];
				return !!"0123456789".includes(t[0]);
			}
			delete a.requested[t.uri], await a.load(t, { force: !0 });
			let o = n.each(t, r.ldp("contains"));
			if (o = o.filter(i), o.length === 0) throw Error(" @@@  No children to         parent2 " + t);
			return o.sort(), e && o.reverse(), o[0];
		}
		let s = await o(await o(await o(this.root.dir()))), c = i.sym(s.uri + "chat.ttl");
		await a.load(c);
		let l = n.each(this.root, this.membershipProperty, null, c);
		if (l.length === 0) {
			let e = "  INCONSISTENCY -- no chat leafObject in file " + c;
			throw t(e), Error(e);
		}
		let u = l.map((e) => [n.any(e, r.dct("created")), e]);
		return u.sort(), e && u.reverse(), u[0][1];
	}
};
export { o as DateFolder, a as emptyLeaf };

//# sourceMappingURL=dateFolder.esm.js.map