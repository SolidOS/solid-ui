import { log as e, warn as t } from "../lib/debug.esm.js";
import { label as n } from "../utils/label.esm.js";
import { icons as r } from "../lib/iconBase.esm.js";
import i from "../lib/ns.esm.js";
import { errorMessageBlock as a } from "../widgets/error.esm.js";
import * as o from "rdflib";
import "../utils/index.esm.js";
import { button as s, cancelButton as c, deleteButtonWithCheck as l, refreshTree as u } from "../widgets/buttons.esm.js";
import { newThing as d } from "../widgets/forms.esm.js";
import "../widgets/index.esm.js";
import { renderBookmarksButton as f } from "./bookmarks.esm.js";
import { authn as p, store as m } from "solid-logic";
import { allVersions as h, isDeleted as g, mostRecentVersion as _ } from "./chatLogic.esm.js";
import { switchToEditor as v } from "./message.esm.js";
// src/chat/messageTools.js
var y = window.document, b = "noun_253504.svg", x = "noun_1384132.svg", S = "noun_1384135.svg", C = "noun-reply-5506924.svg", w = {};
w[i.schema("AgreeAction")] = "👍", w[i.schema("DisagreeAction")] = "👎", w[i.schema("EndorseAction")] = "⭐️", w[i.schema("LikeAction")] = "❤️";
async function T(t, n) {
	let r = y.createElement("span");
	async function a() {
		if (r.innerHTML = "", g(t)) return r;
		let e = (await h(t)).map((e) => m.each(null, i.schema("target"), e, n)).flat();
		if (e.length === 0) return r;
		let a = e.map((e) => [
			m.any(e, i.rdf("type"), null, n),
			m.any(e, i.sioc("content"), null, n),
			m.any(e, i.schema("agent"), null, n)
		]);
		a.sort(), a.forEach((e) => {
			let [t, n, i] = e, a;
			i ? (a = y.createElement("a"), a.setAttribute("href", i.uri)) : a = y.createTextNode(""), a.textContent = n || w[t] || "⬜️", r.appendChild(a);
		});
	}
	return a().then(e("sentimentStripLinked: sentimentStripLinked async refreshed")), r.refresh = a, r;
}
async function E(e, h, g, w) {
	async function T() {
		let n = m.any(e, i.foaf("maker"));
		if (!j) alert("You can't delete the message, you are not logged in.");
		else if (j.sameTerm(n)) {
			try {
				await w.deleteMessage(e);
			} catch (e) {
				let n = "Error deleting messaage " + e;
				t(n), alert(n), (g.statusArea || h.parentNode).appendChild(a(y, n));
			}
			h.parentNode.removeChild(h);
		} else alert("You can't delete the message, you are not logged in as the author, " + n);
		k();
	}
	async function E(t) {
		j.value === m.any(e, i.foaf("maker")).value && (k(), await v(t, e, w, g));
	}
	async function D() {
		let t = await w.createThread(e), n = g.chatOptions;
		if (!n) throw Error("replyInThread: missing options");
		n.showThread(t, n), k();
	}
	let O = y.createElement("div");
	if (await _(e).value === i.schema("dateDeleted").value) return O;
	function k() {
		O.parentElement.parentElement.removeChild(O.parentElement);
	}
	async function A(e) {
		await m.updater.update(m.connectedStatements(e), []);
	}
	let j = p.currentUser();
	j && m.holds(e, i.foaf("maker"), j) && (O.appendChild(l(y, O, "message", T)), O.appendChild(s(y, r.iconBase + b, "edit", () => E(h)))), f(g).then((e) => {
		e && O.appendChild(e);
	});
	function M(e, t, r, a, c, l) {
		function f() {
			p.style.backgroundColor = v ? "yellow" : "white";
		}
		let p = s(y, r, n(a), async function(n) {
			if (v) await A(v), v = null, f();
			else {
				v = d(c);
				let n = [
					o.st(v, i.schema("agent"), e.me, c),
					o.st(v, i.rdf("type"), a, c),
					o.st(v, i.schema("target"), t, c)
				];
				if (await m.updater.update([], n), f(), l) {
					let e = !1;
					for (let t = 0; t < l.length; t++) {
						let n = g(l[t]);
						n && (await A(n), e = !0);
					}
					e && u(h);
				}
			}
		});
		function g(n) {
			let r = m.each(null, i.schema("agent"), e.me, c).filter((e) => m.holds(e, i.rdf("type"), n, c)).filter((e) => m.holds(e, i.schema("target"), t, c));
			return r.length ? r[0] : null;
		}
		function _() {
			v = g(a), f();
		}
		let v;
		return p.refresh = _, _(), p;
	}
	if (j = p.currentUser(), j && await _(e).value !== i.schema("dateDeleted").value) {
		let t = {
			me: j,
			dom: y,
			div: O
		};
		O.appendChild(M(t, e, r.iconBase + x, i.schema("AgreeAction"), e.doc(), [i.schema("DisagreeAction")])), O.appendChild(M(t, e, r.iconBase + S, i.schema("DisagreeAction"), e.doc(), [i.schema("AgreeAction")]));
	}
	m.any(e, i.dct("created")) && O.appendChild(s(y, r.iconBase + C, "Reply in thread", async () => {
		await D();
	}));
	let N = O.appendChild(c(y));
	return N.style.float = "right", N.firstChild.style.opacity = "0.3", N.addEventListener("click", k), O;
}
export { E as messageToolbar, T as sentimentStripLinked };

//# sourceMappingURL=messageTools.esm.js.map