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
	let p = !!l.newestFirst, m = "white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;", h = e.createElement("div"), g, _, v = s.store.updater, y = function(t, n) {
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
		let t = e.createElement("tr"), s = e.createElement("td"), l = e.createElement("td"), d = e.createElement("td");
		t.appendChild(s), t.appendChild(l), t.appendChild(d), t.AJAR_date = "9999-01-01T00:00:00Z";
		let p = function() {
			h.setAttribute("class", "pendingedit"), h.disabled = !0;
			let a = [], s = /* @__PURE__ */ new Date(), l = "" + s.getTime(), d = o.term(s), p = n.sym(i.uri + "#Msg" + l);
			a.push(new o.Statement(r, u.wf("message"), p, i)), a.push(new o.Statement(p, u.sioc("content"), n.literal(h.value), i)), a.push(new o.Statement(p, f("created"), d, i)), _ && a.push(new o.Statement(p, u.foaf("maker"), _, i)), v.update([], a, function(r, i, a) {
				if (!i) t.appendChild(c.widgets.errorMessageBlock(e, "Error writing message: " + a));
				else {
					let e = {
						"?msg": p,
						"?content": n.literal(h.value),
						"?date": d,
						"?creator": _
					};
					O(e, !1), h.value = "", h.setAttribute("class", ""), h.disabled = !1;
				}
			});
		};
		t.appendChild(e.createElement("br"));
		let h, g, y = function() {
			w(s, _, "", null), h = e.createElement("textarea"), l.innerHTML = "", l.appendChild(h), h.rows = 3, h.setAttribute("style", m + "background-color: #eef;"), h.addEventListener("keyup", function(e) {
				e.keyCode === 13 && (e.altKey || p());
			}, !1), d.innerHTML = "", g = c.widgets.button(e, c.icons.iconBase + "noun_383448.svg", "Send"), g.setAttribute("style", c.style.buttonStyle + "float: right;"), g.addEventListener("click", p, !1), d.appendChild(g);
		};
		return a({
			div: l,
			dom: e
		}).then((e) => {
			_ = e.me, y();
		}), t;
	};
	function C(e) {
		let n = s.store.any(e, c.ns.foaf("nick"));
		return n ? "" + n.value : "" + t(e);
	}
	function w(t, n, r, i) {
		let a = t.appendChild(y(C(n), n));
		n.uri && s.store.fetcher.nowOrWhenFetched(n.doc(), void 0, function(e, t) {
			a.textContent = C(n);
		}), t.appendChild(e.createElement("br")), t.appendChild(y(r, i));
	}
	function T(e, t) {
		let r = {}, i, a;
		for (i = t.firstChild; i; i = i.nextSibling) i.AJAR_subject && (r[i.AJAR_subject.uri] = !0);
		let o = n.each(e, u.wf("message")), s = {};
		for (o.forEach(function(e) {
			s[e.uri] = !0, r[e.uri] || D(e);
		}), i = t.firstChild; i;) a = i.nextSibling, i.AJAR_subject && !s[i.AJAR_subject.uri] && t.removeChild(i), i = a;
	}
	let E = function(e) {
		let t = n.statementsMatching(e).concat(n.statementsMatching(void 0, void 0, e));
		v.update(t, [], function(e, t, n) {
			t ? T(r, g) : x.error("Cant delete messages:" + n);
		});
	}, D = function(e) {
		let t = {
			"?msg": e,
			"?creator": n.any(e, u.foaf("maker")),
			"?date": n.any(e, f("created")),
			"?content": n.any(e, u.sioc("content"))
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
		A = new o.Query("Messages");
		let e = {};
		[
			"msg",
			"date",
			"creator",
			"content"
		].forEach(function(t) {
			A.vars.push(e[t] = o.variable(t));
		}), A.pat.add(r, d("message"), e.msg), A.pat.add(e.msg, u.dct("created"), e.date), A.pat.add(e.msg, u.foaf("maker"), e.creator), A.pat.add(e.msg, u.sioc("content"), e.content);
	}
	function j() {
		g.fresh = !0;
	}
	return n.query(A, O, void 0, j), h.refresh = function() {
		T(r, g);
	}, h;
}
//#endregion
export { l as messageArea };

//# sourceMappingURL=messageArea.esm.js.map