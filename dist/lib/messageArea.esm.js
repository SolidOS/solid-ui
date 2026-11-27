import { icons as e } from "./iconBase.esm.js";
import { label as t } from "../utils/label.esm.js";
import { ensureLoggedIn as n } from "../login/login.esm.js";
import { solidLogicSingleton as r } from "solid-logic";
import i from "./ns.esm.js";
import * as a from "rdflib";
import { style as o } from "./style.esm.js";
import "../utils/index.esm.js";
import { widgets_exports as s } from "../widgets/index.esm.js";
// src/lib/messageArea.js
var c = {
	icons: e,
	ns: i,
	rdf: a,
	style: o,
	widgets: s
};
function l(e, i, o, s, l) {
	i ||= r.store, s = s.doc();
	let u = c.ns, d = a.Namespace("http://www.w3.org/2005/01/wf/flow#"), f = a.Namespace("http://purl.org/dc/terms/");
	l ||= {};
	let p = !!l.newestFirst, m = "white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;", h = e.createElement("div"), g, _, v = r.store.updater, y = function(t, n) {
		let r = e.createElement("a");
		return n && n.uri && (r.setAttribute("href", n.uri), r.addEventListener("click", c.widgets.openHrefInOutlineMode, !0), r.setAttribute("style", "color: #3B5998; text-decoration: none; ")), r.textContent = t, r;
	}, b = function(t, n) {
		let r = e.createElement("pre");
		return r.setAttribute("style", n || "color: grey"), h.appendChild(r), r.appendChild(e.createTextNode(t)), r;
	}, x = {
		log: function(e) {
			b(e, "color: #111;");
		},
		warn: function(e) {
			b(e, "color: #880;");
		},
		error: function(e) {
			b(e, "color: #800;");
		}
	}, S = function() {
		let t = e.createElement("tr"), r = e.createElement("td"), l = e.createElement("td"), d = e.createElement("td");
		t.appendChild(r), t.appendChild(l), t.appendChild(d), t.AJAR_date = "9999-01-01T00:00:00Z";
		let p = function() {
			h.setAttribute("class", "pendingedit"), h.disabled = !0;
			let n = [], r = /* @__PURE__ */ new Date(), l = "" + r.getTime(), d = a.term(r), p = i.sym(s.uri + "#Msg" + l);
			n.push(new a.Statement(o, u.wf("message"), p, s)), n.push(new a.Statement(p, u.sioc("content"), i.literal(h.value), s)), n.push(new a.Statement(p, f("created"), d, s)), _ && n.push(new a.Statement(p, u.foaf("maker"), _, s)), v.update([], n, function(n, r, a) {
				if (!r) t.appendChild(c.widgets.errorMessageBlock(e, "Error writing message: " + a));
				else {
					let e = {
						"?msg": p,
						"?content": i.literal(h.value),
						"?date": d,
						"?creator": _
					};
					O(e, !1), h.value = "", h.setAttribute("class", ""), h.disabled = !1;
				}
			});
		};
		t.appendChild(e.createElement("br"));
		let h, g, y = function() {
			w(r, _, "", null), h = e.createElement("textarea"), l.innerHTML = "", l.appendChild(h), h.rows = 3, h.setAttribute("style", m + "background-color: #eef;"), h.addEventListener("keyup", function(e) {
				e.keyCode === 13 && (e.altKey || p());
			}, !1), d.innerHTML = "", g = c.widgets.button(e, c.icons.iconBase + "noun_383448.svg", "Send"), g.setAttribute("style", c.style.buttonStyle + "float: right;"), g.addEventListener("click", p, !1), d.appendChild(g);
		};
		return n({
			div: l,
			dom: e
		}).then((e) => {
			_ = e.me, y();
		}), t;
	};
	function C(e) {
		let n = r.store.any(e, c.ns.foaf("nick"));
		return n ? "" + n.value : "" + t(e);
	}
	function w(t, n, i, a) {
		let o = t.appendChild(y(C(n), n));
		n.uri && r.store.fetcher.nowOrWhenFetched(n.doc(), void 0, function(e, t) {
			o.textContent = C(n);
		}), t.appendChild(e.createElement("br")), t.appendChild(y(i, a));
	}
	function T(e, t) {
		let n = {}, r, a;
		for (r = t.firstChild; r; r = r.nextSibling) r.AJAR_subject && (n[r.AJAR_subject.uri] = !0);
		let o = i.each(e, u.wf("message")), s = {};
		for (o.forEach(function(e) {
			s[e.uri] = !0, n[e.uri] || D(e);
		}), r = t.firstChild; r;) a = r.nextSibling, r.AJAR_subject && !s[r.AJAR_subject.uri] && t.removeChild(r), r = a;
	}
	let E = function(e) {
		let t = i.statementsMatching(e).concat(i.statementsMatching(void 0, void 0, e));
		v.update(t, [], function(e, t, n) {
			t ? T(o, g) : x.error("Cant delete messages:" + n);
		});
	}, D = function(e) {
		let t = {
			"?msg": e,
			"?creator": i.any(e, u.foaf("maker")),
			"?date": i.any(e, f("created")),
			"?content": i.any(e, u.sioc("content"))
		};
		O(t, !0);
	}, O = function(t, n) {
		let r = t["?creator"], i = t["?msg"], a = t["?date"], o = t["?content"], s = a.value, l = e.createElement("tr");
		l.AJAR_date = s, l.AJAR_subject = i;
		let u = !1;
		for (let e = g.firstChild; e; e = e.nextSibling) if (s > e.AJAR_date && p || s < e.AJAR_date && !p) {
			g.insertBefore(l, e), u = !0;
			break;
		}
		u || g.appendChild(l);
		let d = e.createElement("td");
		l.appendChild(d), w(d, r, c.widgets.shortDate(s), i);
		let f = e.createElement("td");
		l.appendChild(f);
		let h = e.createElement("p");
		h.setAttribute("style", m + (n ? "background-color: #e8ffe8;" : "background-color: #white;")), f.appendChild(h), h.textContent = o.value;
		let _ = e.createElement("td");
		l.appendChild(_);
		let v = e.createElement("button");
		_.appendChild(v), v.textContent = "-", l.setAttribute("class", "hoverControl"), v.setAttribute("class", "hoverControlHide"), v.setAttribute("style", "color: red;"), v.addEventListener("click", function(t) {
			_.removeChild(v);
			let n = e.createElement("button");
			n.textContent = "cancel", _.appendChild(n).addEventListener("click", function(e) {
				_.removeChild(r), _.removeChild(n), _.appendChild(v);
			}, !1);
			let r = e.createElement("button");
			r.textContent = "Delete message", _.appendChild(r).addEventListener("click", function(e) {
				_.removeChild(r), _.removeChild(n), E(i);
			}, !1);
		}, !1);
	};
	g = e.createElement("table"), g.fresh = !1, h.appendChild(g), g.setAttribute("style", "width: 100%;");
	let k = S();
	p ? g.insertBefore(k, g.firstChild) : g.appendChild(k);
	let A;
	if (l.query) A = l.query;
	else {
		A = new a.Query("Messages");
		let e = {};
		[
			"msg",
			"date",
			"creator",
			"content"
		].forEach(function(t) {
			A.vars.push(e[t] = a.variable(t));
		}), A.pat.add(o, d("message"), e.msg), A.pat.add(e.msg, u.dct("created"), e.date), A.pat.add(e.msg, u.foaf("maker"), e.creator), A.pat.add(e.msg, u.sioc("content"), e.content);
	}
	function j() {
		g.fresh = !0;
	}
	return i.query(A, O, void 0, j), h.refresh = function() {
		T(o, g);
	}, h;
}
export { l as messageArea };

//# sourceMappingURL=messageArea.esm.js.map