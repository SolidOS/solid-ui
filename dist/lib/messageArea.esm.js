import e from "./ns.esm.js";
import { label as t } from "../utils/label.esm.js";
import "../utils/index.esm.js";
import { style as n } from "./style.esm.js";
import { icons as r } from "./iconBase.esm.js";
import { widgets_exports as i } from "../widgets/index.esm.js";
import { ensureLoggedIn as a } from "../login/login.esm.js";
import * as o from "rdflib";
import { solidLogicSingleton as s } from "solid-logic";
//#region src/lib/messageArea.js
var c = {
	icons: r,
	ns: e,
	rdf: o,
	style: n,
	widgets: i
};
function l(e, n, r, i, l) {
	n ||= s.store, i = i.doc();
	let u = c.ns, d = o.Namespace("http://www.w3.org/2005/01/wf/flow#"), f = o.Namespace("http://purl.org/dc/terms/");
	l ||= {};
	let p = !!l.newestFirst, m = e.createElement("div"), h, g, _ = s.store.updater, v = function(t, n) {
		let r = e.createElement("a");
		return n && n.uri && (r.setAttribute("href", n.uri), r.addEventListener("click", c.widgets.openHrefInOutlineMode, !0), r.setAttribute("style", "color: #3B5998; text-decoration: none; ")), r.textContent = t, r;
	}, y = function(t, n) {
		let r = e.createElement("pre");
		return r.setAttribute("style", n || "color: grey"), m.appendChild(r), r.appendChild(e.createTextNode(t)), r;
	}, b = {
		log: function(e) {
			y(e, "color: #111;");
		},
		warn: function(e) {
			y(e, "color: #880;");
		},
		error: function(e) {
			y(e, "color: #800;");
		}
	}, x = function() {
		let t = e.createElement("tr"), s = e.createElement("td"), l = e.createElement("td"), d = e.createElement("td");
		t.appendChild(s), t.appendChild(l), t.appendChild(d), t.AJAR_date = "9999-01-01T00:00:00Z";
		let p = function() {
			m.setAttribute("class", "pendingedit"), m.disabled = !0;
			let a = [], s = /* @__PURE__ */ new Date(), l = "" + s.getTime(), d = o.term(s), p = n.sym(i.uri + "#Msg" + l);
			a.push(new o.Statement(r, u.wf("message"), p, i)), a.push(new o.Statement(p, u.sioc("content"), n.literal(m.value), i)), a.push(new o.Statement(p, f("created"), d, i)), g && a.push(new o.Statement(p, u.foaf("maker"), g, i)), _.update([], a, function(r, i, a) {
				if (!i) t.appendChild(c.widgets.errorMessageBlock(e, "Error writing message: " + a));
				else {
					let e = {
						"?msg": p,
						"?content": n.literal(m.value),
						"?date": d,
						"?creator": g
					};
					D(e, !1), m.value = "", m.setAttribute("class", ""), m.disabled = !1;
				}
			});
		};
		t.appendChild(e.createElement("br"));
		let m, h, v = function() {
			C(s, g, "", null), m = e.createElement("textarea"), l.innerHTML = "", l.appendChild(m), m.rows = 3, m.setAttribute("style", "white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;background-color: #eef;"), m.addEventListener("keyup", function(e) {
				e.keyCode === 13 && (e.altKey || p());
			}, !1), d.innerHTML = "", h = c.widgets.button(e, c.icons.iconBase + "noun_383448.svg", "Send"), h.setAttribute("style", c.style.buttonStyle + "float: right;"), h.addEventListener("click", p, !1), d.appendChild(h);
		};
		return a({
			div: l,
			dom: e
		}).then((e) => {
			g = e.me, v();
		}), t;
	};
	function S(e) {
		let n = s.store.any(e, c.ns.foaf("nick"));
		return n ? "" + n.value : "" + t(e);
	}
	function C(t, n, r, i) {
		let a = t.appendChild(v(S(n), n));
		n.uri && s.store.fetcher.nowOrWhenFetched(n.doc(), void 0, function(e, t) {
			a.textContent = S(n);
		}), t.appendChild(e.createElement("br")), t.appendChild(v(r, i));
	}
	function w(e, t) {
		let r = {}, i, a;
		for (i = t.firstChild; i; i = i.nextSibling) i.AJAR_subject && (r[i.AJAR_subject.uri] = !0);
		let o = n.each(e, u.wf("message")), s = {};
		for (o.forEach(function(e) {
			s[e.uri] = !0, r[e.uri] || E(e);
		}), i = t.firstChild; i;) a = i.nextSibling, i.AJAR_subject && !s[i.AJAR_subject.uri] && t.removeChild(i), i = a;
	}
	let T = function(e) {
		let t = n.statementsMatching(e).concat(n.statementsMatching(void 0, void 0, e));
		_.update(t, [], function(e, t, n) {
			t ? w(r, h) : b.error("Cant delete messages:" + n);
		});
	}, E = function(e) {
		let t = {
			"?msg": e,
			"?creator": n.any(e, u.foaf("maker")),
			"?date": n.any(e, f("created")),
			"?content": n.any(e, u.sioc("content"))
		};
		D(t, !0);
	}, D = function(t, n) {
		let r = t["?creator"], i = t["?msg"], a = t["?date"], o = t["?content"], s = a.value, l = e.createElement("tr");
		l.AJAR_date = s, l.AJAR_subject = i;
		let u = !1;
		for (let e = h.firstChild; e; e = e.nextSibling) if (s > e.AJAR_date && p || s < e.AJAR_date && !p) {
			h.insertBefore(l, e), u = !0;
			break;
		}
		u || h.appendChild(l);
		let d = e.createElement("td");
		l.appendChild(d), C(d, r, c.widgets.shortDate(s), i);
		let f = e.createElement("td");
		l.appendChild(f);
		let m = e.createElement("p");
		m.setAttribute("style", "white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;" + (n ? "background-color: #e8ffe8;" : "background-color: #white;")), f.appendChild(m), m.textContent = o.value;
		let g = e.createElement("td");
		l.appendChild(g);
		let _ = e.createElement("button");
		g.appendChild(_), _.textContent = "-", l.setAttribute("class", "hoverControl"), _.setAttribute("class", "hoverControlHide"), _.setAttribute("style", "color: red;"), _.addEventListener("click", function(t) {
			g.removeChild(_);
			let n = e.createElement("button");
			n.textContent = "cancel", g.appendChild(n).addEventListener("click", function(e) {
				g.removeChild(r), g.removeChild(n), g.appendChild(_);
			}, !1);
			let r = e.createElement("button");
			r.textContent = "Delete message", g.appendChild(r).addEventListener("click", function(e) {
				g.removeChild(r), g.removeChild(n), T(i);
			}, !1);
		}, !1);
	};
	h = e.createElement("table"), h.fresh = !1, m.appendChild(h), h.setAttribute("style", "width: 100%;");
	let O = x();
	p ? h.insertBefore(O, h.firstChild) : h.appendChild(O);
	let k;
	if (l.query) k = l.query;
	else {
		k = new o.Query("Messages");
		let e = {};
		[
			"msg",
			"date",
			"creator",
			"content"
		].forEach(function(t) {
			k.vars.push(e[t] = o.variable(t));
		}), k.pat.add(r, d("message"), e.msg), k.pat.add(e.msg, u.dct("created"), e.date), k.pat.add(e.msg, u.foaf("maker"), e.creator), k.pat.add(e.msg, u.sioc("content"), e.content);
	}
	function A() {
		h.fresh = !0;
	}
	return n.query(k, D, void 0, A), m.refresh = function() {
		w(r, h);
	}, m;
}
//#endregion
export { l as messageArea };

//# sourceMappingURL=messageArea.esm.js.map