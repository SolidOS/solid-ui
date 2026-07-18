import e from "../lib/ns.esm.js";
import { log as t, warn as n } from "../lib/debug.esm.js";
import { errorMessageBlock as r } from "../widgets/error.esm.js";
import "../lib/iconBase.esm.js";
import { cancelButton as i, refreshTree as a, shortDate as o } from "../widgets/buttons.esm.js";
import "../widgets/index.esm.js";
import { ChatChannel as s, isDeleted as c } from "./chatLogic.esm.js";
import { renderMessageEditor as l, renderMessageRow as u } from "./message.esm.js";
import * as d from "rdflib";
import { store as f } from "solid-logic";
//#region src/chat/infinite.js
function p(e) {
	"Notification" in window ? Notification.permission === "granted" ? new Notification(e) : Notification.permission !== "denied" && Notification.requestPermission().then(function(t) {
		t === "granted" && new Notification(e);
	}) : n("This browser does no t support desktop notification");
}
async function m(e, t, n, r, i, a) {
	let o = await u(e, n, r, i, a);
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
async function h(n, u, h, g) {
	async function _(t, n) {
		let r = {}, i, o;
		for (i = n.firstChild; i; i = i.nextSibling) i.AJAR_subject && (r[i.AJAR_subject.uri] = !0);
		let s = f.each(t, e.wf("message"), null, n.chatDocument), c = {};
		for (let e of s) c[e.uri] = !0, r[e.uri] || await v(e, n);
		for (i = n.firstChild; i;) o = i.nextSibling, i.AJAR_subject && !c[i.AJAR_subject.uri] && n.removeChild(i), i = o;
		for (i = n.firstChild; i; i = i.nextSibling) i.AJAR_subject && a(i);
	}
	async function v(t, n) {
		if (c(t) && !g.showDeletedMessages) return;
		let r = f.any(null, e.sioc("has_member"), t, t.doc()), i = f.any(t, e.sioc("id"), null, t.doc());
		if (i && !r && (r = f.any(null, e.sioc("has_member"), i, t.doc())), g.thread) {
			if (!f.holds(t, e.sioc("has_reply"), g.thread) && !(r && r.sameTerm(g.thread))) return;
		} else if (r) return;
		n.fresh || await m(D, n, t, n.fresh, g, j);
	}
	async function y(e) {
		let t = e ? P : F, n = t.messageTable.date;
		if (e && P.limit && n <= P.limit) return M || await C(), !0;
		if (n = await O.loadPrevious(n, e), !n && !e && !M && await C(), !n) return !0;
		let r = !1;
		if (!e) {
			let e = O.leafDocumentFromDate(/* @__PURE__ */ new Date());
			r = O.leafDocumentFromDate(n).sameTerm(e);
		}
		let i = await b(n, r);
		return t.messageTable = i, (e ? E : !E) ? k.appendChild(i) : k.insertBefore(i, k.firstChild), r;
	}
	async function b(e, i) {
		let a = O.leafDocumentFromDate(e);
		try {
			await f.fetcher.createIfNotExists(a);
		} catch (o) {
			let s = n.createElement("table").appendChild(n.createElement("tr"));
			return o.response && o.response.status && o.response.status === 404 ? await x(e, i) : (t("*** Error NON 404 for chat file " + a), s.appendChild(r(n, o, "pink")), s);
		}
		return await x(e, i);
	}
	async function x(t, r) {
		async function a() {
			let e = await y(!0);
			return e ? c.initial = !0 : c.extendedBack = !0, e;
		}
		async function s() {
			return await y(!1);
		}
		let c = n.createElement("table");
		c.style.width = "100%", c.extendBackwards = a, c.extendForwards = s, c.date = t;
		let u = O.leafDocumentFromDate(t);
		if (c.chatDocument = u, c.fresh = !1, c.setAttribute("style", "width: 100%;"), r) {
			c.final = !0, M = c, F.messageTable = c;
			let e = l(D, c, j, g);
			E ? c.insertBefore(e, c.firstChild) : c.appendChild(e), c.inputRow = e;
		}
		{
			let e = n.createElement("tr"), r = e.appendChild(n.createElement("td"));
			r.style = "text-align: center; vertical-align: middle; color: #888; font-style: italic;", r.textContent = o(t.toISOString(), !0);
			let a = e.appendChild(n.createElement("td"));
			g.includeRemoveButton && a.appendChild(i(n, (e) => {
				k.parentNode.removeChild(k);
			})), c.extendedForwards = !1, E ? c.appendChild(e) : c.insertBefore(e, c.firstChild);
		}
		let d = f.statementsMatching(null, e.wf("message"), null, u);
		!r && d.length;
		for (let e of d) await v(e.object, c);
		return c.fresh = !0, c;
	}
	async function S() {
		let t = O.leafDocumentFromDate(/* @__PURE__ */ new Date());
		if (!t.sameTerm(F.messageTable.chatDocument)) {
			M.inputRow && (M.removeChild(M.inputRow), delete M.inputRow);
			let n = F.messageTable.chatDocument;
			if (await C(), !f.holds(n, e.rdfs("seeAlso"), t, n)) {
				let r = [d.st(n, e.rdfs("seeAlso"), t, n)];
				try {
					f.updater.update([], r);
				} catch (e) {
					alert("Unable to link old chat file to new one:" + e);
				}
			}
		}
	}
	async function C() {
		let e = /* @__PURE__ */ new Date(), t = O.leafDocumentFromDate(e), n = await b(e, !0);
		return k.appendChild(n), k.refresh = async function() {
			await S(/* @__PURE__ */ new Date()), await _(h, n), p(h);
		}, f.updater.addDownstreamChangeListener(t, k.refresh), M = n, F.messageTable = M, n;
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
	let E = g.newestFirst === "1" || g.newestFirst === !0, D = new s(h, g), O = D.dateFolder, k = n.createElement("div");
	D.div = k;
	let A = k.appendChild(n.createElement("div")), j = {
		dom: n,
		statusArea: A,
		div: A
	}, M, N, P = { messageTable: null }, F = { messageTable: null };
	if (g.thread) {
		let t = g.thread;
		if (N = f.any(null, e.sioc("has_reply"), t, t.doc()), N) {
			let t = f.any(N, e.dct("created"), null, N.doc());
			t && (P.limit = new Date(t.value));
		}
	}
	let I = !1;
	return await T(), k;
}
//#endregion
export { p as desktopNotification, h as infiniteMessageArea, m as insertMessageIntoTable };

//# sourceMappingURL=infinite.esm.js.map