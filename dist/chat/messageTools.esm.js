import { log as e, warn as t } from "../lib/debug.esm.js";
import { label as n } from "../utils/label.esm.js";
import { icons as r } from "../lib/iconBase.esm.js";
import i from "../lib/ns.esm.js";
import { errorMessageBlock as a } from "../widgets/error.esm.js";
import "../utils/index.esm.js";
import { button as o, cancelButton as s, deleteButtonWithCheck as c, refreshTree as l } from "../widgets/buttons.esm.js";
import { newThing as u } from "../widgets/forms.esm.js";
import "../widgets/index.esm.js";
import { renderBookmarksButton as d } from "./bookmarks.esm.js";
import { allVersions as f, isDeleted as p, mostRecentVersion as m } from "./chatLogic.esm.js";
import { switchToEditor as h } from "./message.esm.js";
import * as g from "rdflib";
import { authn as _, store as v } from "solid-logic";
// src/chat/messageTools.js
var y = window.document, b = "noun_253504.svg", x = "noun_1384132.svg", S = "noun_1384135.svg", C = "noun-reply-5506924.svg", w = {};
w[i.schema("AgreeAction")] = "👍", w[i.schema("DisagreeAction")] = "👎", w[i.schema("EndorseAction")] = "⭐️", w[i.schema("LikeAction")] = "❤️";
async function T(t, n) {
	let r = y.createElement("span");
	async function a() {
		if (r.innerHTML = "", p(t)) return r;
		let e = (await f(t)).map((e) => v.each(null, i.schema("target"), e, n)).flat();
		if (e.length === 0) return r;
		let a = e.map((e) => [
			v.any(e, i.rdf("type"), null, n),
			v.any(e, i.sioc("content"), null, n),
			v.any(e, i.schema("agent"), null, n)
		]);
		a.sort(), a.forEach((e) => {
			let [t, n, i] = e, a;
			i ? (a = y.createElement("a"), a.setAttribute("href", i.uri)) : a = y.createTextNode(""), a.textContent = n || w[t] || "⬜️", r.appendChild(a);
		});
	}
	return a().then(e("sentimentStripLinked: sentimentStripLinked async refreshed")), r.refresh = a, r;
}
async function E(e, f, p, w) {
	async function T() {
		let n = v.any(e, i.foaf("maker"));
		if (!j) alert("You can't delete the message, you are not logged in.");
		else if (j.sameTerm(n)) {
			try {
				await w.deleteMessage(e);
			} catch (e) {
				let n = "Error deleting messaage " + e;
				t(n), alert(n), (p.statusArea || f.parentNode).appendChild(a(y, n));
			}
			f.parentNode.removeChild(f);
		} else alert("You can't delete the message, you are not logged in as the author, " + n);
		k();
	}
	async function E(t) {
		j.value === v.any(e, i.foaf("maker")).value && (k(), await h(t, e, w, p));
	}
	async function D() {
		let t = await w.createThread(e), n = p.chatOptions;
		if (!n) throw Error("replyInThread: missing options");
		n.showThread(t, n), k();
	}
	let O = y.createElement("div");
	if (await m(e).value === i.schema("dateDeleted").value) return O;
	function k() {
		O.parentElement.parentElement.removeChild(O.parentElement);
	}
	async function A(e) {
		await v.updater.update(v.connectedStatements(e), []);
	}
	let j = _.currentUser();
	j && v.holds(e, i.foaf("maker"), j) && (O.appendChild(c(y, O, "message", T)), O.appendChild(o(y, r.iconBase + b, "edit", () => E(f)))), d(p).then((e) => {
		e && O.appendChild(e);
	});
	function M(e, t, r, a, s, c) {
		function d() {
			p.style.backgroundColor = _ ? "yellow" : "white";
		}
		let p = o(y, r, n(a), async function(n) {
			if (_) await A(_), _ = null, d();
			else {
				_ = u(s);
				let n = [
					g.st(_, i.schema("agent"), e.me, s),
					g.st(_, i.rdf("type"), a, s),
					g.st(_, i.schema("target"), t, s)
				];
				if (await v.updater.update([], n), d(), c) {
					let e = !1;
					for (let t = 0; t < c.length; t++) {
						let n = m(c[t]);
						n && (await A(n), e = !0);
					}
					e && l(f);
				}
			}
		});
		function m(n) {
			let r = v.each(null, i.schema("agent"), e.me, s).filter((e) => v.holds(e, i.rdf("type"), n, s)).filter((e) => v.holds(e, i.schema("target"), t, s));
			return r.length ? r[0] : null;
		}
		function h() {
			_ = m(a), d();
		}
		let _;
		return p.refresh = h, h(), p;
	}
	if (j = _.currentUser(), j && await m(e).value !== i.schema("dateDeleted").value) {
		let t = {
			me: j,
			dom: y,
			div: O
		};
		O.appendChild(M(t, e, r.iconBase + x, i.schema("AgreeAction"), e.doc(), [i.schema("DisagreeAction")])), O.appendChild(M(t, e, r.iconBase + S, i.schema("DisagreeAction"), e.doc(), [i.schema("AgreeAction")]));
	}
	v.any(e, i.dct("created")) && O.appendChild(o(y, r.iconBase + C, "Reply in thread", async () => {
		await D();
	}));
	let N = O.appendChild(s(y));
	return N.style.float = "right", N.firstChild.style.opacity = "0.3", N.addEventListener("click", k), O;
}
export { E as messageToolbar, T as sentimentStripLinked };

//# sourceMappingURL=messageTools.esm.js.map