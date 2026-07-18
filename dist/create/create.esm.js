import e from "../lib/ns.esm.js";
import { label as t } from "../utils/label.esm.js";
import "../utils/index.esm.js";
import { log as n } from "../lib/debug.esm.js";
import { icons as r } from "../lib/iconBase.esm.js";
import { askName as i } from "../widgets/buttons.esm.js";
import "../widgets/index.esm.js";
import { ensureLoadedProfile as a, selectWorkspace as o } from "../login/login.esm.js";
import { solidLogicSingleton as s } from "solid-logic";
//#region src/create/create.ts
var c = s.store;
function l(s, l, u) {
	let d = s.dom, f = s.div;
	if (s.me && !s.me.uri) throw Error("newThingUI:  Invalid userid: " + s.me);
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
		_("display: none;"), e.setAttribute("style", "padding: 0.7em; width: 2em; height: 2em;background-color: yellow;");
	}
	function y(e) {
		h = !h, m.setAttribute("style", p + (h ? "background-color: yellow;" : "")), _(h ? "" : "display: none;");
	}
	m.addEventListener("click", y);
	function b(r) {
		return new Promise(function(u, f) {
			let p;
			function m(t, i) {
				a(s).then((a) => {
					let o = Object.assign({
						newBase: i,
						folder: r.folder || void 0,
						workspace: t
					}, r);
					for (let e in r) o[e] = r[e];
					n(`newThingUI: Minting new ${o.pane.name} at ${o.newBase}`), r.pane.mintNew(l, o).then(function(t) {
						if (!t || !t.newInstance) throw Error("Cannot mint new - missing newInstance");
						if (t.folder) {
							let r = t.newInstance.uri.slice(t.folder.uri.length).includes("/");
							n("  new thing is packge? " + r), r ? c.add(t.folder, e.ldp("contains"), c.sym(t.newBase), t.folder.doc()) : c.add(t.folder, e.ldp("contains"), t.newInstance, t.folder.doc()), t.refreshTarget && t.refreshTarget.refresh && t.refreshTarget.refresh();
						} else {
							let e = r.div.appendChild(d.createElement("p"));
							e.setAttribute("style", "font-size: 120%;"), e.innerHTML = "Your <a target='_blank' href='" + t.newInstance.uri + "'><b>new " + r.noun + "</b></a> is ready to be set up. <br/><br/><a target='_blank' href='" + t.newInstance.uri + "'>Go to your new " + r.noun + ".</a>";
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
			r.noun = h.mintClass ? t(h.mintClass) : h.name, r.appPathSegment = r.noun.slice(0, 1).toUpperCase() + r.noun.slice(1), r.folder ? i(d, c, r.div, e.foaf("name"), null, r.noun).then(function(e) {
				if (!e) y();
				else {
					let t = r.folder.uri;
					t.endsWith("/") || (t += "/"), t = t + encodeURIComponent(e) + "/", m(null, t);
				}
			}) : (p = o(d, {
				noun: r.noun,
				appPathSegment: r.appPathSegment
			}, m), r.div.appendChild(p));
		});
	}
	let x = [], S = Object.values(u).filter((e) => e.mintNew), C = S.reduce((e, t) => (t.mintClass && (e[t.mintClass.uri] = (e[t.mintClass.uri] || 0) + 1), e), {});
	S.forEach((e) => {
		let n = s.div.appendChild(d.createElement("img"));
		n.setAttribute("src", e.icon);
		let r = e.mintClass ? C[e.mintClass.uri] > 1 ? `${t(e.mintClass)} (using ${e.name} pane)` : t(e.mintClass) : e.name + " @@";
		n.setAttribute("title", "Make new " + r), n.setAttribute("style", "padding: 0.7em; width: 2em; height: 2em;display: none;"), x.push(n), n.disabled || n.addEventListener("click", function(t) {
			v(n), b({
				event: t,
				folder: s.folder || null,
				iconEle: n,
				pane: e,
				noun: r,
				noIndexHTML: !0,
				div: s.div,
				me: s.me,
				dom: s.dom,
				refreshTarget: s.refreshTarget
			});
		});
	});
}
//#endregion
export { l as newThingUI };

//# sourceMappingURL=create.esm.js.map