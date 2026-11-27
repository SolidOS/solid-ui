import { insertMessageIntoTable as e } from "./infinite.esm.js";
import { label as t } from "../utils/label.esm.js";
import { messageToolbar as n, sentimentStripLinked as r } from "./messageTools.esm.js";
import { findBookmarkDocument as i } from "./bookmarks.esm.js";
import { allVersions as a, mostRecentVersion as o, originalVersion as s } from "./chatLogic.esm.js";
import { makeDraggable as c, makeDropTarget as l, uploadFiles as u } from "../widgets/dragAndDrop.esm.js";
import { errorMessageBlock as d } from "../widgets/error.esm.js";
import { log as f, warn as p } from "../lib/debug.esm.js";
import { button as m, cancelButton as h, openHrefInOutlineMode as g, setImage as _, shortDate as v } from "../widgets/buttons.esm.js";
import { icons as y } from "../lib/iconBase.esm.js";
import { authn as b, store as x } from "solid-logic";
import { ensureLoggedIn as S } from "../login/login.esm.js";
import { media as C } from "../media/index.esm.js";
import w from "../lib/ns.esm.js";
import { lightColorHash as T } from "../lib/pad.esm.js";
import { style as E } from "../lib/style.esm.js";
import { recordParticipation as D } from "../lib/participation.esm.js";
import "../utils/index.esm.js";
import "../widgets/index.esm.js";
import { SEC as O, getBlankMsg as k, verifySignature as A } from "./signature.esm.js";
import { getPublicKey as j } from "./keys.esm.js";
// src/chat/message.js
var M = window.document, N = E.messageBodyStyle, P = t;
function F(e, t) {
	let n = M.createElement("img"), r = "10";
	t.inlineImageHeightEms && (r = ("" + t.inlineImageHeightEms).trim()), n.setAttribute("style", "max-height: " + r + "em; border-radius: 1em; margin: 0.7em;"), e && n.setAttribute("src", e);
	let i = M.createElement("a");
	return i.setAttribute("href", e), i.setAttribute("target", "images"), i.appendChild(n), c(n, $rdf.sym(e)), i;
}
var I = function(e, t) {
	let n = M.createElement("a");
	return t && t.uri && (n.setAttribute("href", t.uri), n.addEventListener("click", g, !0), n.setAttribute("style", "color: #3B5998; text-decoration: none; ")), n.textContent = e, n;
};
function L(e) {
	let t = x.any(e, w.foaf("nick"));
	return t ? "" + t.value : "" + P(e);
}
function R(e, t, n, r) {
	let i = e.appendChild(I(L(t), t));
	t.uri && x.fetcher.nowOrWhenFetched(t.doc(), void 0, function(e, n) {
		i.textContent = L(t);
	}), e.appendChild(M.createElement("br")), e.appendChild(I(n, r));
}
function z(e, t, n, r) {
	let i = e.appendChild(I(P(t), t));
	t.uri && x.fetcher.nowOrWhenFetched(t.doc(), void 0, function(e, n) {
		i.textContent = L(t);
	});
	let a = e.appendChild(I(n, r));
	a.style.fontSize = "80%", a.style.marginLeft = "1em", e.appendChild(M.createElement("br"));
}
async function B(e, t, i, c, l) {
	let u = !1, d = c.colorizeByAuthor === "1" || c.colorizeByAuthor === !0, h = x.any(t, w.foaf("maker")), g = x.any(t, w.dct("created")), b = await o(t), S = x.any(b, w.foaf("maker")), C = h.uri === S?.uri ? b : t, E = x.any(C, w.sioc("content")), D = await a(C);
	D.length > 1 && f("renderMessageRow versions: ", D.join(",  "));
	let P = D.map((e) => x.each(e, w.sioc("has_reply"))).flat(), I = null, L = [];
	for (let e of P) x.holds(e, w.rdf("type"), w.sioc("Thread")) ? (I = e, f("renderMessageRow: found thread: " + I)) : L.push(e);
	L.length > 1 && f("renderMessageRow: found normal replies: ", L), I ||= x.any(null, w.sioc("has_member"), t);
	let B = x.any(C, $rdf.sym(`${O}proofValue`)), V = k();
	V.id = C.uri, V.created = x.any(C, w.dct("created")).value, V.content = E.value, V.maker = h.uri, B?.value ? j(h).then((e) => {
		e || p("message is signed but " + h.uri + " is missing publicKey"), e?.match(/[0-9A-Fa-f]{6}/g) ? B?.value && !A(B?.value, V, e) && p("invalid signature\n" + V.id) : p("invalid publicKey hex string\n" + h.uri + "\n" + e);
	}) : (u = !0, p(C.uri + " is unsigned"));
	let H = await s(t), ee = !t.sameTerm(H), U = x.the(H, w.dct("created"), null, H.doc()) || x.the(t, w.dct("created"), null, t.doc()), W = M.createElement("tr");
	u && W.setAttribute("style", "background-color: red"), W.AJAR_date = U.value, W.AJAR_subject = t;
	let G = M.createElement("td");
	if (W.appendChild(G), c.authorDateOnLeft) R(G, h, v(U.value), t);
	else {
		let e = M.createElement("img");
		e.setAttribute("style", "max-height: 2.5em; max-width: 2.5em; border-radius: 0.5em; margin: auto;"), _(e, h), G.appendChild(e);
	}
	let K = v(U.value);
	ee && (K += " ... " + v(g.value));
	let q = W.appendChild(M.createElement("td"));
	c.authorDateOnLeft || z(q, h, K, t);
	let J = E ? E.value.trim() : "??? no content?", Y = /^https?:\/[^ <>]*$/i.test(J), X = null;
	if (Y) {
		if (/\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(J) && c.expandImagesInline) {
			let e = F(J, c);
			q.appendChild(e);
		} else {
			let e = q.appendChild(M.createElement("a"));
			X = e.appendChild(M.createElement("p")), e.href = J, X.textContent = J, q.appendChild(e);
		}
	} else X = M.createElement("p"), q.appendChild(X), X.textContent = J;
	if (X) {
		let e = d ? T(h) : te(i);
		X.setAttribute("style", N + "background-color: " + e + ";");
	}
	function te(e) {
		return e ? "#e8ffe8" : "white";
	}
	let Z = await r(t, t.doc());
	Z.children.length && (q.appendChild(M.createElement("br")), q.appendChild(Z));
	let Q = M.createElement("td");
	W.appendChild(Q);
	let $ = m(M, y.iconBase + "noun_243787.svg", "...");
	return Q.appendChild($), $.addEventListener("click", async function(r) {
		if (W.toolTR) {
			W.parentNode.removeChild(W.toolTR), delete W.toolTR;
			return;
		}
		let i = M.createElement("tr"), a = await n(t, W, {
			...l,
			chatOptions: c
		}, e);
		a.style = "border: 0.05em solid #888; border-radius: 0 0 0.7em 0.7em;  border-top: 0; height:3.5em; background-color: #fff;", W.nextSibling ? W.parentElement.insertBefore(i, W.nextSibling) : W.parentElement.appendChild(i), W.toolTR = i, i.appendChild(M.createElement("td"));
		let o = i.appendChild(M.createElement("td"));
		i.appendChild(M.createElement("td")), o.appendChild(a);
	}), I && c.showThread && Q.appendChild(m(M, y.iconBase + "noun_1180164.svg", "see thread", (e) => {
		c.showThread(I, c);
	})), W;
}
async function V(e, t, n, r) {
	let i = e.parentNode, a = H(n, i, r, n.options, await o(t));
	i.insertBefore(a, e), a.originalRow = e, e.style.visibility = "hidden";
}
function H(t, n, r, a, o) {
	function s(e) {
		e.originalRow.style.visibility = "visible", e.parentNode.removeChild(e);
	}
	async function c(e) {
		await f(F.value, !0);
	}
	async function f(i, s) {
		async function c(i, c) {
			if (await e(t, n, i, !1, a, r), o) {
				let e = k.originalRow;
				e.parentNode ? e.parentNode.removeChild(e) : (p("No parentNode on old message " + e.textContent), e.style.backgroundColor = "#fee", e.style.visibility = "hidden"), k.parentNode.removeChild(k);
			} else s && (F.value = "", F.setAttribute("style", N), F.disabled = !1, F.scrollIntoView(a.newestFirst), F.focus(), F.select());
		}
		s && (F.setAttribute("style", N + "color: #bbb;"), F.disabled = !0);
		let l;
		try {
			l = await t.updateMessage(i, o, null, a.thread);
		} catch (e) {
			(r.statusArea || k).appendChild(d(M, "Error writing message: " + e));
			return;
		}
		await c(l, i);
	}
	function g(e) {
		let t = n.chatDocument.dir().uri;
		u(x.fetcher, e, t + "Files", t + "Pictures", async function(e, t) {
			await f(t);
		});
	}
	let _ = async function(e) {
		for (let t of e) await f(t);
	};
	function v() {
		function e() {
			return u = $rdf.sym(i.dir().uri + "Image_" + Date.now() + ".png"), u;
		}
		async function n(e) {
			e && await f(e.uri);
		}
		if (a.menuHandler) {
			let e = m(M, y.iconBase + "noun_243787.svg", "More");
			e.setAttribute("style", E.buttonStyle + "float: right;"), P.appendChild(e);
		}
		a.menuHandler;
		let r = b.currentUser();
		if (R(A, r, "", null), F = M.createElement("textarea"), j.innerHTML = "", j.appendChild(F), F.rows = 3, o && (F.value = x.anyValue(o, w.sioc("content"), null, o.doc())), F.setAttribute("style", N + "background-color: #eef;"), F.addEventListener("keydown", async function(e) {
			e.code === "Enter" && (!e.shiftKey && !a.shiftEnterSendsMessage || e.shiftKey && a.shiftEnterSendsMessage) && await c(e);
		}, !1), l(F, _, g), P.innerHTML = "", I = m(M, O, "Send"), I.style.float = "right", I.addEventListener("click", (e) => c(), !1), P.appendChild(I), o) {
			let e = P.appendChild(h(M));
			e.style.float = "left", e.addEventListener("click", (e) => s(k), !1), P.appendChild(e);
		}
		let i = t.dateFolder.leafDocumentFromDate(/* @__PURE__ */ new Date()), u;
		j.appendChild(C.cameraButton(M, x, e, n)), D(t.channel, t.channel.doc());
	}
	let T, O;
	o ? (T = x.anyValue(o, w.dct("created"), null, o.doc()), O = y.iconBase + "noun_1180158.svg") : (O = y.iconBase + "noun_383448.svg", T = "9999-01-01T00:00:00Z");
	let k = M.createElement("tr"), A = M.createElement("td"), j = M.createElement("td"), P = M.createElement("td");
	k.appendChild(A), k.appendChild(j), k.appendChild(P), k.AJAR_date = T;
	let F, I;
	return S({
		div: j,
		dom: M
	}).then((e) => {
		v(), Object.assign(e, r), i(e).then((e) => {});
	}), k;
}
export { R as creatorAndDate, z as creatorAndDateHorizontal, F as elementForImageURI, H as renderMessageEditor, B as renderMessageRow, V as switchToEditor };

//# sourceMappingURL=message.esm.js.map