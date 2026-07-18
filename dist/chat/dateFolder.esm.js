import e from "../lib/ns.esm.js";
import { log as t, trace as n } from "../lib/debug.esm.js";
import * as r from "rdflib";
import { store as i } from "solid-logic";
//#region src/chat/dateFolder.js
async function a(t) {
	return await i.fetcher.load(t), !(i.statementsMatching(null, e.dct("created"), null, t).length > 0);
}
var o = class {
	constructor(t, n, r) {
		this.root = t, this.rootFolder = t.dir(), this.leafFileName = n || "index.ttl", this.membershipProperty = r || e.wf("leafObject");
	}
	leafDocumentFromDate(e) {
		let t = e.toISOString().split("T")[0].replace(/-/g, "/");
		return t = this.root.dir().uri + t + "/" + this.leafFileName, i.sym(t);
	}
	dateFromLeafDocument(e) {
		let t = this.rootFolder.uri.length, n = e.uri.slice(t, t + 10).replace(/\//g, "-");
		return new Date(n);
	}
	async loadPrevious(n, r) {
		async function o(n, a) {
			function s(e) {
				return !(r ? e.uri >= n.uri : e.uri <= n.uri);
			}
			function c(e) {
				let t = e.uri.slice(0, -1).split("/").slice(-1)[0];
				return !!"0123456789".includes(t[0]);
			}
			function l(e) {
				return e = e.filter(c), e.sort(), r || e.reverse(), e.pop();
			}
			let u = n.dir();
			try {
				await i.fetcher.load(u);
				let t = i.each(u, e.ldp("contains"));
				t = t.filter(s);
				let n = l(t);
				if (n) return n;
			} catch (e) {
				if (e.response && e.response.status && e.response.status === 404) t("Error 404 for chat parent file " + u);
				else throw t("*** Error NON 404 for chat parent file " + u), Error(`*** ${e.message} for chat folder ${u}`);
			}
			if (a === 0) return null;
			let d = await o(u, a - 1);
			return d ? (await i.fetcher.load(d), l(i.each(d, e.ldp("contains")))) : null;
		}
		let s = this.leafDocumentFromDate(n).dir();
		for (;;) {
			let e = await o(s, 3);
			if (e) {
				let t = i.sym(e.uri + this.leafFileName), r = this.dateFromLeafDocument(t);
				if (await a(t)) n = r, s = this.leafDocumentFromDate(n).dir();
				else return r;
			} else return null;
		}
	}
	async firstLeaf(t) {
		let i = r.graph(), a = new r.Fetcher(i);
		async function o(n) {
			function r(e) {
				let t = e.uri.slice(0, -1).split("/").slice(-1)[0];
				return !!"0123456789".includes(t[0]);
			}
			delete a.requested[n.uri], await a.load(n, { force: !0 });
			let o = i.each(n, e.ldp("contains"));
			if (o = o.filter(r), o.length === 0) throw Error(" @@@  No children to         parent2 " + n);
			return o.sort(), t && o.reverse(), o[0];
		}
		let s = await o(await o(await o(this.root.dir()))), c = r.sym(s.uri + "chat.ttl");
		await a.load(c);
		let l = i.each(this.root, this.membershipProperty, null, c);
		if (l.length === 0) {
			let e = "  INCONSISTENCY -- no chat leafObject in file " + c;
			throw n(e), Error(e);
		}
		let u = l.map((t) => [i.any(t, e.dct("created")), t]);
		return u.sort(), t && u.reverse(), u[0][1];
	}
};
//#endregion
export { o as DateFolder, a as emptyLeaf };

//# sourceMappingURL=dateFolder.esm.js.map