import { solidLogicSingleton as e } from "solid-logic";
import { log as t } from "../lib/debug.esm.js";
import { label as n } from "../utils/label.esm.js";
import { icons as r } from "../lib/iconBase.esm.js";
import { ensureLoadedProfile as i, selectWorkspace as a } from "../login/login.esm.js";
import o from "../lib/ns.esm.js";
import { askName as s } from "../widgets/buttons.esm.js";
import "../utils/index.esm.js";
import "../widgets/index.esm.js";
// src/create/create.ts
var c = e.store;
function l(e, l, u) {
	let d = e.dom, f = e.div;
	if (e.me && !e.me.uri) throw Error("newThingUI:  Invalid userid: " + e.me);
	let p = "padding: 0.7em; width: 2em; height: 2em;", m = f.appendChild(d.createElement("img")), h = !1;
	m.setAttribute("src", r.iconBase + "noun_34653_green.svg"), m.setAttribute("style", p), m.setAttribute("title", "Add another tool");
	let g = function(e) {
		let t = f.appendChild(d.createElement("pre"));
		t.setAttribute("style", "background-color: pink"), t.appendChild(d.createTextNode(e));
	};
	function _(e) {
		for (let t = 0; t < x.length; t++) {
			let n = p + e;
			x[t].disabled && (n += "opacity: 0.3;"), x[t].setAttribute("style", n);
		}
	}
	function v(e) {
		_("display: none;"), e.setAttribute("style", p + "background-color: yellow;");
	}
	function y(e) {
		h = !h, m.setAttribute("style", p + (h ? "background-color: yellow;" : "")), _(h ? "" : "display: none;");
	}
	m.addEventListener("click", y);
	function b(r) {
		return new Promise(function(u, f) {
			let p;
			function m(n, a) {
				i(e).then((e) => {
					let i = Object.assign({
						newBase: a,
						folder: r.folder || void 0,
						workspace: n
					}, r);
					for (let e in r) i[e] = r[e];
					t(`newThingUI: Minting new ${i.pane.name} at ${i.newBase}`), r.pane.mintNew(l, i).then(function(e) {
						if (!e || !e.newInstance) throw Error("Cannot mint new - missing newInstance");
						if (e.folder) {
							let n = e.newInstance.uri.slice(e.folder.uri.length).includes("/");
							t("  new thing is packge? " + n), n ? c.add(e.folder, o.ldp("contains"), c.sym(e.newBase), e.folder.doc()) : c.add(e.folder, o.ldp("contains"), e.newInstance, e.folder.doc()), e.refreshTarget && e.refreshTarget.refresh && e.refreshTarget.refresh();
						} else {
							let t = r.div.appendChild(d.createElement("p"));
							t.setAttribute("style", "font-size: 120%;"), t.innerHTML = "Your <a target='_blank' href='" + e.newInstance.uri + "'><b>new " + r.noun + "</b></a> is ready to be set up. <br/><br/><a target='_blank' href='" + e.newInstance.uri + "'>Go to your new " + r.noun + ".</a>";
						}
						y();
					}).catch(function(e) {
						g(e), f(e);
					});
				}, (e) => {
					g("Error logging on: " + e);
				});
			}
			let h = r.pane;
			r.noun = h.mintClass ? n(h.mintClass) : h.name, r.appPathSegment = r.noun.slice(0, 1).toUpperCase() + r.noun.slice(1), r.folder ? s(d, c, r.div, o.foaf("name"), null, r.noun).then(function(e) {
				if (!e) y();
				else {
					let t = r.folder.uri;
					t.endsWith("/") || (t += "/"), t = t + encodeURIComponent(e) + "/", m(null, t);
				}
			}) : (p = a(d, {
				noun: r.noun,
				appPathSegment: r.appPathSegment
			}, m), r.div.appendChild(p));
		});
	}
	let x = [], S = Object.values(u).filter((e) => e.mintNew), C = S.reduce((e, t) => (t.mintClass && (e[t.mintClass.uri] = (e[t.mintClass.uri] || 0) + 1), e), {});
	S.forEach((t) => {
		let r = e.div.appendChild(d.createElement("img"));
		r.setAttribute("src", t.icon);
		let i = t.mintClass ? C[t.mintClass.uri] > 1 ? `${n(t.mintClass)} (using ${t.name} pane)` : n(t.mintClass) : t.name + " @@";
		r.setAttribute("title", "Make new " + i), r.setAttribute("style", p + "display: none;"), x.push(r), r.disabled || r.addEventListener("click", function(n) {
			v(r), b({
				event: n,
				folder: e.folder || null,
				iconEle: r,
				pane: t,
				noun: i,
				noIndexHTML: !0,
				div: e.div,
				me: e.me,
				dom: e.dom,
				refreshTarget: e.refreshTarget
			});
		});
	});
}
export { l as newThingUI };

//# sourceMappingURL=create.esm.js.map