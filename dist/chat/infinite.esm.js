import * as e from "rdflib";
import { store as t } from "solid-logic";
import { log as n, warn as r } from "../lib/debug.esm.js";
import "../lib/iconBase.esm.js";
import { errorMessageBlock as i } from "../widgets/error.esm.js";
import a from "../lib/ns.esm.js";
import { cancelButton as o, refreshTree as s, shortDate as c } from "../widgets/buttons.esm.js";
import "../widgets/index.esm.js";
import { ChatChannel as l, isDeleted as u } from "./chatLogic.esm.js";
import { renderMessageEditor as d, renderMessageRow as f } from "./message.esm.js";
// src/chat/infinite.js
function p(e) {
	"Notification" in window ? Notification.permission === "granted" ? new Notification(e) : Notification.permission !== "denied" && Notification.requestPermission().then(function(t) {
		t === "granted" && new Notification(e);
	}) : r("This browser does no t support desktop notification");
}
async function m(e, t, n, r, i, a) {
	let o = await f(e, n, r, i, a);
	i.selectedMessage && i.selectedMessage.sameTerm(n) && (o.style.backgroundColor = "yellow", i.selectedElement = o, t.selectedElement = o);
	let s = !1;
	for (let e = t.firstChild; e; e = e.nextSibling) {
		let n = i.newestfirst === !0, r = o.AJAR_date;
		if (r > e.AJAR_date && n || r < e.AJAR_date && !n) {
			t.insertBefore(o, e), s = !0;
			break;
		}
	}
	s || t.appendChild(o);
}
async function h(r, f, h, g) {
	async function _(e, n) {
		let r = {}, i, o;
		for (i = n.firstChild; i; i = i.nextSibling) i.AJAR_subject && (r[i.AJAR_subject.uri] = !0);
		let c = t.each(e, a.wf("message"), null, n.chatDocument), l = {};
		for (let e of c) l[e.uri] = !0, r[e.uri] || await v(e, n);
		for (i = n.firstChild; i;) o = i.nextSibling, i.AJAR_subject && !l[i.AJAR_subject.uri] && n.removeChild(i), i = o;
		for (i = n.firstChild; i; i = i.nextSibling) i.AJAR_subject && s(i);
	}
	async function v(e, n) {
		if (u(e) && !g.showDeletedMessages) return;
		let r = t.any(null, a.sioc("has_member"), e, e.doc()), i = t.any(e, a.sioc("id"), null, e.doc());
		if (i && !r && (r = t.any(null, a.sioc("has_member"), i, e.doc())), g.thread) {
			if (!t.holds(e, a.sioc("has_reply"), g.thread) && !(r && r.sameTerm(g.thread))) return;
		} else if (r) return;
		n.fresh || await m(D, n, e, n.fresh, g, j);
	}
	async function y(e) {
		let t = e ? P : F, n = t.messageTable.date;
		if (e && P.limit && n <= P.limit) return M || await C(), !0;
		if (n = await O.loadPrevious(n, e), n || e || M || await C(), !n) return !0;
		let r = !1;
		if (!e) {
			let e = O.leafDocumentFromDate(/* @__PURE__ */ new Date());
			r = O.leafDocumentFromDate(n).sameTerm(e);
		}
		let i = await b(n, r);
		return t.messageTable = i, (e ? E : !E) ? k.appendChild(i) : k.insertBefore(i, k.firstChild), r;
	}
	async function b(e, a) {
		let o = O.leafDocumentFromDate(e);
		try {
			await t.fetcher.createIfNotExists(o);
		} catch (t) {
			let s = r.createElement("table").appendChild(r.createElement("tr"));
			return t.response && t.response.status && t.response.status === 404 ? await x(e, a) : (n("*** Error NON 404 for chat file " + o), s.appendChild(i(r, t, "pink")), s);
		}
		return await x(e, a);
	}
	async function x(e, n) {
		let i = r.createElement("table");
		i.style.width = "100%", i.extendBackwards = async function() {
			let e = await y(!0);
			return e ? i.initial = !0 : i.extendedBack = !0, e;
		}, i.extendForwards = async function() {
			return await y(!1);
		}, i.date = e;
		let s = O.leafDocumentFromDate(e);
		if (i.chatDocument = s, i.fresh = !1, i.setAttribute("style", "width: 100%;"), n) {
			i.final = !0, M = i, F.messageTable = i;
			let e = d(D, i, j, g);
			E ? i.insertBefore(e, i.firstChild) : i.appendChild(e), i.inputRow = e;
		}
		{
			let t = r.createElement("tr"), n = t.appendChild(r.createElement("td"));
			n.style = "text-align: center; vertical-align: middle; color: #888; font-style: italic;", n.textContent = c(e.toISOString(), !0);
			let a = t.appendChild(r.createElement("td"));
			g.includeRemoveButton && a.appendChild(o(r, (e) => {
				k.parentNode.removeChild(k);
			})), i.extendedForwards = !1, E ? i.appendChild(t) : i.insertBefore(t, i.firstChild);
		}
		let l = t.statementsMatching(null, a.wf("message"), null, s);
		!n && l.length;
		for (let e of l) await v(e.object, i);
		return i.fresh = !0, i;
	}
	async function S() {
		let n = O.leafDocumentFromDate(/* @__PURE__ */ new Date());
		if (!n.sameTerm(F.messageTable.chatDocument)) {
			M.inputRow && (M.removeChild(M.inputRow), delete M.inputRow);
			let r = F.messageTable.chatDocument;
			if (await C(), !t.holds(r, a.rdfs("seeAlso"), n, r)) {
				let i = [e.st(r, a.rdfs("seeAlso"), n, r)];
				try {
					t.updater.update([], i);
				} catch (e) {
					alert("Unable to link old chat file to new one:" + e);
				}
			}
		}
	}
	async function C() {
		let e = /* @__PURE__ */ new Date(), n = O.leafDocumentFromDate(e), r = await b(e, !0);
		return k.appendChild(r), k.refresh = async function() {
			await S(/* @__PURE__ */ new Date()), await _(h, r), p(h);
		}, t.updater.addDownstreamChangeListener(n, k.refresh), M = r, F.messageTable = M, r;
	}
	async function w(e, t) {
		if (I) return;
		I = !0;
		let n = !t, r;
		for (; k.scrollTop < 150 && P.messageTable && !P.messageTable.initial && P.messageTable.extendBackwards;) {
			if (k.scrollHeight === 0) {
				setTimeout(w, 2e3), I = !1;
				return;
			}
			let e = k.scrollHeight - k.scrollTop;
			if (r = await P.messageTable.extendBackwards(), n && (k.scrollTop = k.scrollHeight - e), t && t(), r) break;
		}
		for (; g.selectedMessage && k.scrollHeight - k.scrollTop - k.clientHeight < 150 && F.messageTable && !F.messageTable.final && F.messageTable.extendForwards;) {
			let e = k.scrollTop;
			if (r = await F.messageTable.extendForwards(), n && (k.scrollTop = e), t && t(), r) break;
		}
		I = !1;
	}
	async function T() {
		function e() {
			o && o.selectedElement && o.selectedElement.scrollIntoView({ block: "center" });
		}
		function t() {
			g.selectedElement ? g.selectedElement.scrollIntoView({ block: "center" }) : M.inputRow.scrollIntoView && M.inputRow.scrollIntoView(E);
		}
		let n, r, i;
		g.selectedMessage && (r = g.selectedMessage.doc()), N && (i = N.doc());
		let a = r || i;
		if (a) {
			let e = /* @__PURE__ */ new Date();
			n = O.leafDocumentFromDate(e).sameTerm(a);
		}
		let o;
		a && !n ? (o = await b(O.dateFromLeafDocument(a), n), k.appendChild(o), P.messageTable = o, F.messageTable = o, e(), setTimeout(e, 1e3)) : (await C(), P.messageTable = M, F.messageTable = M), await w(null, t), k.addEventListener("scroll", w), g.solo && document.body.addEventListener("scroll", w);
	}
	g ||= {}, g.authorDateOnLeft = !1;
	let E = g.newestFirst === "1" || g.newestFirst === !0, D = new l(h, g), O = D.dateFolder, k = r.createElement("div");
	D.div = k;
	let A = k.appendChild(r.createElement("div")), j = {
		dom: r,
		statusArea: A,
		div: A
	}, M, N, P = { messageTable: null }, F = { messageTable: null };
	if (g.thread) {
		let e = g.thread;
		if (N = t.any(null, a.sioc("has_reply"), e, e.doc()), N) {
			let e = t.any(N, a.dct("created"), null, N.doc());
			e && (P.limit = new Date(e.value));
		}
	}
	let I = !1;
	return await T(), k;
}
export { p as desktopNotification, h as infiniteMessageArea, m as insertMessageIntoTable };

//# sourceMappingURL=infinite.esm.js.map