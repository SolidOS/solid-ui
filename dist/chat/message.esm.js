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
import { ensureLoggedIn as b } from "../login/login.esm.js";
import { media as x } from "../media/index.esm.js";
import S from "../lib/ns.esm.js";
import { lightColorHash as C } from "../lib/pad.esm.js";
import { style as w } from "../lib/style.esm.js";
import { recordParticipation as T } from "../lib/participation.esm.js";
import "../utils/index.esm.js";
import "../widgets/index.esm.js";
import { SEC as E, getBlankMsg as D, verifySignature as O } from "./signature.esm.js";
import { getPublicKey as k } from "./keys.esm.js";
import { authn as A, store as j } from "solid-logic";
// src/chat/message.js
var M = window.document, N = w.messageBodyStyle, P = t;
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
	let t = j.any(e, S.foaf("nick"));
	return t ? "" + t.value : "" + P(e);
}
function R(e, t, n, r) {
	let i = e.appendChild(I(L(t), t));
	t.uri && j.fetcher.nowOrWhenFetched(t.doc(), void 0, function(e, n) {
		i.textContent = L(t);
	}), e.appendChild(M.createElement("br")), e.appendChild(I(n, r));
}
function z(e, t, n, r) {
	let i = e.appendChild(I(P(t), t));
	t.uri && j.fetcher.nowOrWhenFetched(t.doc(), void 0, function(e, n) {
		i.textContent = L(t);
	});
	let a = e.appendChild(I(n, r));
	a.style.fontSize = "80%", a.style.marginLeft = "1em", e.appendChild(M.createElement("br"));
}
async function B(e, t, i, c, l) {
	let u = !1, d = c.colorizeByAuthor === "1" || c.colorizeByAuthor === !0, h = j.any(t, S.foaf("maker")), g = j.any(t, S.dct("created")), b = await o(t), x = j.any(b, S.foaf("maker")), w = h.uri === x?.uri ? b : t, T = j.any(w, S.sioc("content")), A = await a(w);
	A.length > 1 && f("renderMessageRow versions: ", A.join(",  "));
	let P = A.map((e) => j.each(e, S.sioc("has_reply"))).flat(), I = null, L = [];
	for (let e of P) j.holds(e, S.rdf("type"), S.sioc("Thread")) ? (I = e, f("renderMessageRow: found thread: " + I)) : L.push(e);
	L.length > 1 && f("renderMessageRow: found normal replies: ", L), I ||= j.any(null, S.sioc("has_member"), t);
	let B = j.any(w, $rdf.sym(`${E}proofValue`)), V = D();
	V.id = w.uri, V.created = j.any(w, S.dct("created")).value, V.content = T.value, V.maker = h.uri, B?.value ? k(h).then((e) => {
		e || p("message is signed but " + h.uri + " is missing publicKey"), e?.match(/[0-9A-Fa-f]{6}/g) ? B?.value && !O(B?.value, V, e) && p("invalid signature\n" + V.id) : p("invalid publicKey hex string\n" + h.uri + "\n" + e);
	}) : (u = !0, p(w.uri + " is unsigned"));
	let H = await s(t), U = !t.sameTerm(H), W = j.the(H, S.dct("created"), null, H.doc()) || j.the(t, S.dct("created"), null, t.doc()), G = M.createElement("tr");
	u && G.setAttribute("style", "background-color: red"), G.AJAR_date = W.value, G.AJAR_subject = t;
	let K = M.createElement("td");
	if (G.appendChild(K), c.authorDateOnLeft) R(K, h, v(W.value), t);
	else {
		let e = M.createElement("img");
		e.setAttribute("style", "max-height: 2.5em; max-width: 2.5em; border-radius: 0.5em; margin: auto;"), _(e, h), K.appendChild(e);
	}
	let q = v(W.value);
	U && (q += " ... " + v(g.value));
	let J = G.appendChild(M.createElement("td"));
	c.authorDateOnLeft || z(J, h, q, t);
	let Y = T ? T.value.trim() : "??? no content?", ee = /^https?:\/[^ <>]*$/i.test(Y), X = null;
	if (ee) {
		if (/\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(Y) && c.expandImagesInline) {
			let e = F(Y, c);
			J.appendChild(e);
		} else {
			let e = J.appendChild(M.createElement("a"));
			X = e.appendChild(M.createElement("p")), e.href = Y, X.textContent = Y, J.appendChild(e);
		}
	} else X = M.createElement("p"), J.appendChild(X), X.textContent = Y;
	if (X) {
		let e = d ? C(h) : te(i);
		X.setAttribute("style", N + "background-color: " + e + ";");
	}
	function te(e) {
		return e ? "#e8ffe8" : "white";
	}
	let Z = await r(t, t.doc());
	Z.children.length && (J.appendChild(M.createElement("br")), J.appendChild(Z));
	let Q = M.createElement("td");
	G.appendChild(Q);
	let $ = m(M, y.iconBase + "noun_243787.svg", "...");
	return Q.appendChild($), $.addEventListener("click", async function(r) {
		if (G.toolTR) {
			G.parentNode.removeChild(G.toolTR), delete G.toolTR;
			return;
		}
		let i = M.createElement("tr"), a = await n(t, G, {
			...l,
			chatOptions: c
		}, e);
		a.style = "border: 0.05em solid #888; border-radius: 0 0 0.7em 0.7em;  border-top: 0; height:3.5em; background-color: #fff;", G.nextSibling ? G.parentElement.insertBefore(i, G.nextSibling) : G.parentElement.appendChild(i), G.toolTR = i, i.appendChild(M.createElement("td"));
		let o = i.appendChild(M.createElement("td"));
		i.appendChild(M.createElement("td")), o.appendChild(a);
	}), I && c.showThread && Q.appendChild(m(M, y.iconBase + "noun_1180164.svg", "see thread", (e) => {
		c.showThread(I, c);
	})), G;
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
				let e = D.originalRow;
				e.parentNode ? e.parentNode.removeChild(e) : (p("No parentNode on old message " + e.textContent), e.style.backgroundColor = "#fee", e.style.visibility = "hidden"), D.parentNode.removeChild(D);
			} else s && (F.value = "", F.setAttribute("style", N), F.disabled = !1, F.scrollIntoView(a.newestFirst), F.focus(), F.select());
		}
		s && (F.setAttribute("style", N + "color: #bbb;"), F.disabled = !0);
		let l;
		try {
			l = await t.updateMessage(i, o, null, a.thread);
		} catch (e) {
			(r.statusArea || D).appendChild(d(M, "Error writing message: " + e));
			return;
		}
		await c(l, i);
	}
	function g(e) {
		let t = n.chatDocument.dir().uri;
		u(j.fetcher, e, t + "Files", t + "Pictures", async function(e, t) {
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
			e.setAttribute("style", w.buttonStyle + "float: right;"), P.appendChild(e);
		}
		a.menuHandler;
		let r = A.currentUser();
		if (R(O, r, "", null), F = M.createElement("textarea"), k.innerHTML = "", k.appendChild(F), F.rows = 3, o && (F.value = j.anyValue(o, S.sioc("content"), null, o.doc())), F.setAttribute("style", N + "background-color: #eef;"), F.addEventListener("keydown", async function(e) {
			e.code === "Enter" && (!e.shiftKey && !a.shiftEnterSendsMessage || e.shiftKey && a.shiftEnterSendsMessage) && await c(e);
		}, !1), l(F, _, g), P.innerHTML = "", I = m(M, E, "Send"), I.style.float = "right", I.addEventListener("click", (e) => c(), !1), P.appendChild(I), o) {
			let e = P.appendChild(h(M));
			e.style.float = "left", e.addEventListener("click", (e) => s(D), !1), P.appendChild(e);
		}
		let i = t.dateFolder.leafDocumentFromDate(/* @__PURE__ */ new Date()), u;
		k.appendChild(x.cameraButton(M, j, e, n)), T(t.channel, t.channel.doc());
	}
	let C, E;
	o ? (C = j.anyValue(o, S.dct("created"), null, o.doc()), E = y.iconBase + "noun_1180158.svg") : (E = y.iconBase + "noun_383448.svg", C = "9999-01-01T00:00:00Z");
	let D = M.createElement("tr"), O = M.createElement("td"), k = M.createElement("td"), P = M.createElement("td");
	D.appendChild(O), D.appendChild(k), D.appendChild(P), D.AJAR_date = C;
	let F, I;
	return b({
		div: k,
		dom: M
	}).then((e) => {
		v(), Object.assign(e, r), i(e).then((e) => {});
	}), D;
}
export { R as creatorAndDate, z as creatorAndDateHorizontal, F as elementForImageURI, H as renderMessageEditor, B as renderMessageRow, V as switchToEditor };

//# sourceMappingURL=message.esm.js.map