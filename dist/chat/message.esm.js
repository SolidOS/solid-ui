import e from "../lib/ns.esm.js";
import { label as t } from "../utils/label.esm.js";
import "../utils/index.esm.js";
import { log as n, warn as r } from "../lib/debug.esm.js";
import { style as i } from "../lib/style.esm.js";
import { makeDraggable as a, makeDropTarget as o, uploadFiles as s } from "../widgets/dragAndDrop.esm.js";
import { errorMessageBlock as c } from "../widgets/error.esm.js";
import { icons as l } from "../lib/iconBase.esm.js";
import { button as u, cancelButton as d, openHrefInOutlineMode as f, setImage as p, shortDate as m } from "../widgets/buttons.esm.js";
import "../widgets/index.esm.js";
import { ensureLoggedIn as h } from "../login/login.esm.js";
import { media as g } from "../media/index.esm.js";
import { SEC as _, getBlankMsg as v, verifySignature as y } from "./signature.esm.js";
import { getPublicKey as b } from "./keys.esm.js";
import { allVersions as x, mostRecentVersion as S, originalVersion as C } from "./chatLogic.esm.js";
import { recordParticipation as w } from "../lib/participation.esm.js";
import { lightColorHash as T } from "../lib/pad.esm.js";
import { findBookmarkDocument as E } from "./bookmarks.esm.js";
import { messageToolbar as D, sentimentStripLinked as O } from "./messageTools.esm.js";
import { insertMessageIntoTable as k } from "./infinite.esm.js";
import { authn as A, store as j } from "solid-logic";
//#region src/chat/message.js
var M = window.document, N = i.messageBodyStyle, P = t;
function F(e, t) {
	let n = M.createElement("img"), r = "10";
	t.inlineImageHeightEms && (r = ("" + t.inlineImageHeightEms).trim()), n.setAttribute("style", "max-height: " + r + "em; border-radius: 1em; margin: 0.7em;"), e && n.setAttribute("src", e);
	let i = M.createElement("a");
	return i.setAttribute("href", e), i.setAttribute("target", "images"), i.appendChild(n), a(n, $rdf.sym(e)), i;
}
var I = function(e, t) {
	let n = M.createElement("a");
	return t && t.uri && (n.setAttribute("href", t.uri), n.addEventListener("click", f, !0), n.setAttribute("style", "color: #3B5998; text-decoration: none; ")), n.textContent = e, n;
};
function L(t) {
	let n = j.any(t, e.foaf("nick"));
	return n ? "" + n.value : "" + P(t);
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
async function B(t, i, a, o, s) {
	let c = !1, d = o.colorizeByAuthor === "1" || o.colorizeByAuthor === !0, f = j.any(i, e.foaf("maker")), h = j.any(i, e.dct("created")), g = await S(i), w = j.any(g, e.foaf("maker")), E = f.uri === w?.uri ? g : i, k = j.any(E, e.sioc("content")), A = await x(E);
	A.length > 1 && n("renderMessageRow versions: ", A.join(",  "));
	let P = A.map((t) => j.each(t, e.sioc("has_reply"))).flat(), I = null, L = [];
	for (let t of P) j.holds(t, e.rdf("type"), e.sioc("Thread")) ? (I = t, n("renderMessageRow: found thread: " + I)) : L.push(t);
	L.length > 1 && n("renderMessageRow: found normal replies: ", L), I ||= j.any(null, e.sioc("has_member"), i);
	let B = j.any(E, $rdf.sym(`${_}proofValue`)), V = v();
	V.id = E.uri, V.created = j.any(E, e.dct("created")).value, V.content = k.value, V.maker = f.uri, B?.value ? b(f).then((e) => {
		e || r("message is signed but " + f.uri + " is missing publicKey"), e?.match(/[0-9A-Fa-f]{6}/g) ? B?.value && !y(B?.value, V, e) && r("invalid signature\n" + V.id) : r("invalid publicKey hex string\n" + f.uri + "\n" + e);
	}) : (c = !0, r(E.uri + " is unsigned"));
	let H = await C(i), ee = !i.sameTerm(H), U = j.the(H, e.dct("created"), null, H.doc()) || j.the(i, e.dct("created"), null, i.doc()), W = M.createElement("tr");
	c && W.setAttribute("style", "background-color: red"), W.AJAR_date = U.value, W.AJAR_subject = i;
	let G = M.createElement("td");
	if (W.appendChild(G), o.authorDateOnLeft) R(G, f, m(U.value), i);
	else {
		let e = M.createElement("img");
		e.setAttribute("style", "max-height: 2.5em; max-width: 2.5em; border-radius: 0.5em; margin: auto;"), p(e, f), G.appendChild(e);
	}
	let K = m(U.value);
	ee && (K += " ... " + m(h.value));
	let q = W.appendChild(M.createElement("td"));
	o.authorDateOnLeft || z(q, f, K, i);
	let J = k ? k.value.trim() : "??? no content?", Y = /^https?:\/[^ <>]*$/i.test(J), X = null;
	if (Y) if (/\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(J) && o.expandImagesInline) {
		let e = F(J, o);
		q.appendChild(e);
	} else {
		let e = q.appendChild(M.createElement("a"));
		X = e.appendChild(M.createElement("p")), e.href = J, X.textContent = J, q.appendChild(e);
	}
	else X = M.createElement("p"), q.appendChild(X), X.textContent = J;
	if (X) {
		let e = d ? T(f) : te(a);
		X.setAttribute("style", N + "background-color: " + e + ";");
	}
	function te(e) {
		return e ? "#e8ffe8" : "white";
	}
	let Z = await O(i, i.doc());
	Z.children.length && (q.appendChild(M.createElement("br")), q.appendChild(Z));
	let Q = M.createElement("td");
	W.appendChild(Q);
	let $ = u(M, l.iconBase + "noun_243787.svg", "...");
	return Q.appendChild($), $.addEventListener("click", async function(e) {
		if (W.toolTR) {
			W.parentNode.removeChild(W.toolTR), delete W.toolTR;
			return;
		}
		let n = M.createElement("tr"), r = await D(i, W, {
			...s,
			chatOptions: o
		}, t);
		r.style = "border: 0.05em solid #888; border-radius: 0 0 0.7em 0.7em;  border-top: 0; height:3.5em; background-color: #fff;", W.nextSibling ? W.parentElement.insertBefore(n, W.nextSibling) : W.parentElement.appendChild(n), W.toolTR = n, n.appendChild(M.createElement("td"));
		let a = n.appendChild(M.createElement("td"));
		n.appendChild(M.createElement("td")), a.appendChild(r);
	}), I && o.showThread && Q.appendChild(u(M, l.iconBase + "noun_1180164.svg", "see thread", (e) => {
		o.showThread(I, o);
	})), W;
}
async function V(e, t, n, r) {
	let i = e.parentNode, a = H(n, i, r, n.options, await S(t));
	i.insertBefore(a, e), a.originalRow = e, e.style.visibility = "hidden";
}
function H(t, n, a, f, p) {
	function m(e) {
		e.originalRow.style.visibility = "visible", e.parentNode.removeChild(e);
	}
	async function _(e) {
		await v(F.value, !0);
	}
	async function v(e, i) {
		async function o(e, o) {
			if (await k(t, n, e, !1, f, a), p) {
				let e = T.originalRow;
				e.parentNode ? e.parentNode.removeChild(e) : (r("No parentNode on old message " + e.textContent), e.style.backgroundColor = "#fee", e.style.visibility = "hidden"), T.parentNode.removeChild(T);
			} else i && (F.value = "", F.setAttribute("style", N), F.disabled = !1, F.scrollIntoView(f.newestFirst), F.focus(), F.select());
		}
		i && (F.setAttribute("style", N + "color: #bbb;"), F.disabled = !0);
		let s;
		try {
			s = await t.updateMessage(e, p, null, f.thread);
		} catch (e) {
			(a.statusArea || T).appendChild(c(M, "Error writing message: " + e));
			return;
		}
		await o(s, e);
	}
	function y(e) {
		let t = n.chatDocument.dir().uri;
		s(j.fetcher, e, t + "Files", t + "Pictures", async function(e, t) {
			await v(t);
		});
	}
	let b = async function(e) {
		for (let t of e) await v(t);
	};
	function x() {
		function n() {
			return c = $rdf.sym(s.dir().uri + "Image_" + Date.now() + ".png"), c;
		}
		async function r(e) {
			e && await v(e.uri);
		}
		if (f.menuHandler) {
			let e = u(M, l.iconBase + "noun_243787.svg", "More");
			e.setAttribute("style", i.buttonStyle + "float: right;"), P.appendChild(e);
		}
		f.menuHandler;
		let a = A.currentUser();
		if (R(D, a, "", null), F = M.createElement("textarea"), O.innerHTML = "", O.appendChild(F), F.rows = 3, p && (F.value = j.anyValue(p, e.sioc("content"), null, p.doc())), F.setAttribute("style", N + "background-color: #eef;"), F.addEventListener("keydown", async function(e) {
			e.code === "Enter" && (!e.shiftKey && !f.shiftEnterSendsMessage || e.shiftKey && f.shiftEnterSendsMessage) && await _(e);
		}, !1), o(F, b, y), P.innerHTML = "", I = u(M, C, "Send"), I.style.float = "right", I.addEventListener("click", (e) => _(), !1), P.appendChild(I), p) {
			let e = P.appendChild(d(M));
			e.style.float = "left", e.addEventListener("click", (e) => m(T), !1), P.appendChild(e);
		}
		let s = t.dateFolder.leafDocumentFromDate(/* @__PURE__ */ new Date()), c;
		O.appendChild(g.cameraButton(M, j, n, r)), w(t.channel, t.channel.doc());
	}
	let S, C;
	p ? (S = j.anyValue(p, e.dct("created"), null, p.doc()), C = l.iconBase + "noun_1180158.svg") : (C = l.iconBase + "noun_383448.svg", S = "9999-01-01T00:00:00Z");
	let T = M.createElement("tr"), D = M.createElement("td"), O = M.createElement("td"), P = M.createElement("td");
	T.appendChild(D), T.appendChild(O), T.appendChild(P), T.AJAR_date = S;
	let F, I;
	return h({
		div: O,
		dom: M
	}).then((e) => {
		x(), Object.assign(e, a), E(e).then((e) => {});
	}), T;
}
//#endregion
export { R as creatorAndDate, z as creatorAndDateHorizontal, F as elementForImageURI, H as renderMessageEditor, B as renderMessageRow, V as switchToEditor };

//# sourceMappingURL=message.esm.js.map