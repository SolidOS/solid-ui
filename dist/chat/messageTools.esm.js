import e from "../lib/ns.esm.js";
import { label as t } from "../utils/label.esm.js";
import "../utils/index.esm.js";
import { log as n, warn as r } from "../lib/debug.esm.js";
import { errorMessageBlock as i } from "../widgets/error.esm.js";
import { icons as a } from "../lib/iconBase.esm.js";
import { button as o, cancelButton as s, deleteButtonWithCheck as c, refreshTree as l } from "../widgets/buttons.esm.js";
import { newThing as u } from "../widgets/forms.esm.js";
import "../widgets/index.esm.js";
import { allVersions as d, isDeleted as f, mostRecentVersion as p } from "./chatLogic.esm.js";
import { renderBookmarksButton as m } from "./bookmarks.esm.js";
import { switchToEditor as h } from "./message.esm.js";
import * as g from "rdflib";
import { authn as _, store as v } from "solid-logic";
//#region src/chat/messageTools.js
var y = window.document, b = "noun_253504.svg", x = "noun_1384132.svg", S = "noun_1384135.svg", C = "noun-reply-5506924.svg", w = {};
w[e.schema("AgreeAction")] = "👍", w[e.schema("DisagreeAction")] = "👎", w[e.schema("EndorseAction")] = "⭐️", w[e.schema("LikeAction")] = "❤️";
async function T(t, r) {
	let i = y.createElement("span");
	async function a() {
		if (i.innerHTML = "", f(t)) return i;
		let n = (await d(t)).map((t) => v.each(null, e.schema("target"), t, r)).flat();
		if (n.length === 0) return i;
		let a = n.map((t) => [
			v.any(t, e.rdf("type"), null, r),
			v.any(t, e.sioc("content"), null, r),
			v.any(t, e.schema("agent"), null, r)
		]);
		a.sort(), a.forEach((e) => {
			let [t, n, r] = e, a;
			r ? (a = y.createElement("a"), a.setAttribute("href", r.uri)) : a = y.createTextNode(""), a.textContent = n || w[t] || "⬜️", i.appendChild(a);
		});
	}
	return a().then(n("sentimentStripLinked: sentimentStripLinked async refreshed")), i.refresh = a, i;
}
async function E(n, d, f, w) {
	async function T() {
		let t = v.any(n, e.foaf("maker"));
		if (!j) alert("You can't delete the message, you are not logged in.");
		else if (j.sameTerm(t)) {
			try {
				await w.deleteMessage(n);
			} catch (e) {
				let t = "Error deleting messaage " + e;
				r(t), alert(t), (f.statusArea || d.parentNode).appendChild(i(y, t));
			}
			d.parentNode.removeChild(d);
		} else alert("You can't delete the message, you are not logged in as the author, " + t);
		k();
	}
	async function E(t) {
		j.value === v.any(n, e.foaf("maker")).value && (k(), await h(t, n, w, f));
	}
	async function D() {
		let e = await w.createThread(n), t = f.chatOptions;
		if (!t) throw Error("replyInThread: missing options");
		t.showThread(e, t), k();
	}
	let O = y.createElement("div");
	if (await p(n).value === e.schema("dateDeleted").value) return O;
	function k() {
		O.parentElement.parentElement.removeChild(O.parentElement);
	}
	async function A(e) {
		await v.updater.update(v.connectedStatements(e), []);
	}
	let j = _.currentUser();
	j && v.holds(n, e.foaf("maker"), j) && (O.appendChild(c(y, O, "message", T)), O.appendChild(o(y, a.iconBase + b, "edit", () => E(d)))), m(f).then((e) => {
		e && O.appendChild(e);
	});
	function M(n, r, i, a, s, c) {
		function f() {
			p.style.backgroundColor = _ ? "yellow" : "white";
		}
		let p = o(y, i, t(a), async function(t) {
			if (_) await A(_), _ = null, f();
			else {
				_ = u(s);
				let t = [
					g.st(_, e.schema("agent"), n.me, s),
					g.st(_, e.rdf("type"), a, s),
					g.st(_, e.schema("target"), r, s)
				];
				if (await v.updater.update([], t), f(), c) {
					let e = !1;
					for (let t = 0; t < c.length; t++) {
						let n = m(c[t]);
						n && (await A(n), e = !0);
					}
					e && l(d);
				}
			}
		});
		function m(t) {
			let i = v.each(null, e.schema("agent"), n.me, s).filter((n) => v.holds(n, e.rdf("type"), t, s)).filter((t) => v.holds(t, e.schema("target"), r, s));
			return i.length ? i[0] : null;
		}
		function h() {
			_ = m(a), f();
		}
		let _;
		return p.refresh = h, h(), p;
	}
	if (j = _.currentUser(), j && await p(n).value !== e.schema("dateDeleted").value) {
		let t = {
			me: j,
			dom: y,
			div: O
		};
		O.appendChild(M(t, n, a.iconBase + x, e.schema("AgreeAction"), n.doc(), [e.schema("DisagreeAction")])), O.appendChild(M(t, n, a.iconBase + S, e.schema("DisagreeAction"), n.doc(), [e.schema("AgreeAction")]));
	}
	v.any(n, e.dct("created")) && O.appendChild(o(y, a.iconBase + C, "Reply in thread", async () => {
		await D();
	}));
	let N = O.appendChild(s(y));
	return N.style.float = "right", N.firstChild.style.opacity = "0.3", N.addEventListener("click", k), O;
}
//#endregion
export { E as messageToolbar, T as sentimentStripLinked };

//# sourceMappingURL=messageTools.esm.js.map