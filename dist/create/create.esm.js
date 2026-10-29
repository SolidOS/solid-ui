import { log as e } from "../lib/debug.esm.js";
import { label as t } from "../utils/label.esm.js";
import { icons as n } from "../lib/iconBase.esm.js";
import { ensureLoadedProfile as r, selectWorkspace as i } from "../login/login.esm.js";
import a from "../lib/ns.esm.js";
import { askName as o } from "../widgets/buttons.esm.js";
import "../utils/index.esm.js";
import "../widgets/index.esm.js";
import { solidLogicSingleton as s } from "solid-logic";
// src/create/create.ts
var c = s.store;
function l(s, l, u) {
	let d = s.dom, f = s.div;
	if (s.me && !s.me.uri) throw Error("newThingUI:  Invalid userid: " + s.me);
	let p = "padding: 0.7em; width: 2em; height: 2em;", m = f.appendChild(d.createElement("img")), h = !1;
	m.setAttribute("src", n.iconBase + "noun_34653_green.svg"), m.setAttribute("style", p), m.setAttribute("title", "Add another tool");
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
	function b(n) {
		return new Promise(function(u, f) {
			let p;
			function m(t, i) {
				r(s).then((r) => {
					let o = Object.assign({
						newBase: i,
						folder: n.folder || void 0,
						workspace: t
					}, n);
					for (let e in n) o[e] = n[e];
					e(`newThingUI: Minting new ${o.pane.name} at ${o.newBase}`), n.pane.mintNew(l, o).then(function(t) {
						if (!t || !t.newInstance) throw Error("Cannot mint new - missing newInstance");
						if (t.folder) {
							let n = t.newInstance.uri.slice(t.folder.uri.length).includes("/");
							e("  new thing is packge? " + n), n ? c.add(t.folder, a.ldp("contains"), c.sym(t.newBase), t.folder.doc()) : c.add(t.folder, a.ldp("contains"), t.newInstance, t.folder.doc()), t.refreshTarget && t.refreshTarget.refresh && t.refreshTarget.refresh();
						} else {
							let e = n.div.appendChild(d.createElement("p"));
							e.setAttribute("style", "font-size: 120%;"), e.innerHTML = "Your <a target='_blank' href='" + t.newInstance.uri + "'><b>new " + n.noun + "</b></a> is ready to be set up. <br/><br/><a target='_blank' href='" + t.newInstance.uri + "'>Go to your new " + n.noun + ".</a>";
						}
						y();
					}).catch(function(e) {
						g(e), f(e);
					});
				}, (e) => {
					g("Error logging on: " + e);
				});
			}
			let h = n.pane;
			n.noun = h.mintClass ? t(h.mintClass) : h.name, n.appPathSegment = n.noun.slice(0, 1).toUpperCase() + n.noun.slice(1), n.folder ? o(d, c, n.div, a.foaf("name"), null, n.noun).then(function(e) {
				if (!e) y();
				else {
					let t = n.folder.uri;
					t.endsWith("/") || (t += "/"), t = t + encodeURIComponent(e) + "/", m(null, t);
				}
			}) : (p = i(d, {
				noun: n.noun,
				appPathSegment: n.appPathSegment
			}, m), n.div.appendChild(p));
		});
	}
	let x = [], S = Object.values(u).filter((e) => e.mintNew), C = S.reduce((e, t) => (t.mintClass && (e[t.mintClass.uri] = (e[t.mintClass.uri] || 0) + 1), e), {});
	S.forEach((e) => {
		let n = s.div.appendChild(d.createElement("img"));
		n.setAttribute("src", e.icon);
		let r = e.mintClass ? C[e.mintClass.uri] > 1 ? `${t(e.mintClass)} (using ${e.name} pane)` : t(e.mintClass) : e.name + " @@";
		n.setAttribute("title", "Make new " + r), n.setAttribute("style", p + "display: none;"), x.push(n), n.disabled || n.addEventListener("click", function(t) {
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
export { l as newThingUI };

//# sourceMappingURL=create.esm.js.map