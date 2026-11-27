import e from "../lib/ns.esm.js";
import { label as t } from "../utils/label.esm.js";
import { ACL_LINK as n, solidLogicSingleton as r } from "solid-logic";
import "../utils/index.esm.js";
import { log as i } from "../lib/debug.esm.js";
import { graph as a, serialize as o, st as s, sym as c } from "rdflib";
// src/acl/acl.ts
var l = r.store;
function u(t, n, r, i) {
	let o = e.acl, u = t.uri.slice(-1) === "/", d = l.each(void 0, o("default"), r, i).concat(l.each(void 0, o("defaultForNew"), r, i)).reduce((n, r) => n.concat(l.statementsMatching(r, e.rdf("type"), o("Authorization"), i)).concat(l.statementsMatching(r, o("agent"), void 0, i)).concat(l.statementsMatching(r, o("agentClass"), void 0, i)).concat(l.statementsMatching(r, o("agentGroup"), void 0, i)).concat(l.statementsMatching(r, o("origin"), void 0, i)).concat(l.statementsMatching(r, o("originClass"), void 0, i)).concat(l.statementsMatching(r, o("mode"), void 0, i)).concat(s(r, o("accessTo"), t, i)).concat(u ? s(r, o("default"), t, i) : []), []), f = a();
	return d.forEach((e) => f.add(p(e.subject), p(e.predicate), p(e.object), c(n.uri))), f;
	function p(e) {
		let t = i.uri.length;
		return c(e.uri.slice(0, t) === i.uri ? n.uri + e.uri.slice(t) : e.uri);
	}
}
function d(t, n, r = l, i = !1) {
	let a = i ? c(r, e) : r.each(void 0, e.acl("accessTo"), t), o = e.acl, s = {
		agent: {},
		agentClass: {},
		agentGroup: {},
		origin: {},
		originClass: {}
	};
	return Object.keys(s).forEach((e) => {
		a.forEach(function(t) {
			r.each(t, o("mode")).forEach(function(n) {
				r.each(t, o(e)).forEach(function(r) {
					s[e][r.uri] = s[e][r.uri] || {}, s[e][r.uri][n.uri] = t;
				});
			});
		});
	}), s;
	function c(e, n) {
		return e.each(void 0, n.acl("default"), t).concat(e.each(void 0, n.acl("defaultForNew"), t));
	}
}
function f(e, t) {
	let n = function(e, t) {
		for (let n in {
			agent: !0,
			agentClass: !0,
			agentGroup: !0,
			origin: !0,
			originClass: !0
		}) if (e[n]) {
			for (let r in e[n]) for (let i in e[n][r]) if (!t[n][r] || !t[n][r][i]) return !1;
		}
		return !0;
	};
	return n(e, t) && n(t, e);
}
function p(e) {
	let t = e[0], n, r;
	for (let i = 1; i < e.length; i++) [
		"agent",
		"agentClass",
		"agentGroup",
		"origin",
		"originClass"
	].forEach(function(a) {
		if (n = e[i], n[a]) for (r in n[a]) for (let e in n[a][r]) t[a][r] || (t[a][r] = []), t[a][r][e] = !0;
	});
	return t;
}
function m(e, t) {
	let n = [], r = function(e) {
		e.length ? E(e.shift().doc(), function(i, a, o, s, c, l) {
			let u = !a;
			if (!i || !c || !l) return t(i, s);
			let f = u ? d(c, l) : d(o, s);
			n.push(f), r(e.slice(1));
		}) : t(!0, p(n));
	};
	r(e);
}
function h(e) {
	let t = {};
	return [
		"agent",
		"agentClass",
		"agentGroup",
		"origin",
		"originClass"
	].forEach(function(n) {
		for (let r in e[n]) {
			let i = [];
			for (let t in e[n][r]) i.push(t);
			i.sort();
			let a = i.join("\n");
			t[a] || (t[a] = []), t[a].push([n, r]);
		}
	}), t;
}
function g(e, t, n, r) {
	return _(e, t, h(n), r);
}
function _(t, n, r, i, a, o) {
	let s = e.acl;
	for (let c in r) {
		let l = r[c];
		if (!l.length) continue;
		let u = c.split("\n"), d = u.map(function(e) {
			return e.split("#")[1];
		}).join("");
		o && !a && (d += "Default");
		let f = t.sym(i.uri + "#" + d);
		t.add(f, e.rdf("type"), s("Authorization"), i), a && t.add(f, s("accessTo"), n, i), o && t.add(f, s("default"), n, i);
		for (let e = 0; e < u.length; e++) t.add(f, s("mode"), t.sym(u[e]), i);
		for (let e = 0; e < l.length; e++) {
			let n = l[e][0], r = l[e][1];
			t.add(f, s(n), t.sym(r), i);
		}
	}
}
function v(e) {
	return y(h(e));
}
function y(n) {
	let r = "";
	for (let i in n) {
		let a = i.split("\n").map(function(e) {
			return e.split("#")[1][0];
		}).join("");
		r += a + ":";
		let o = n[i];
		for (let n = 0; n < o.length; n++) {
			let i = o[n][0], a = c(o[n][1]);
			r += i === "agent" ? "@" : "", r += a.sameTerm(e.foaf("Agent")) ? "*" : t(a), n < o.length - 1 && (r += ",");
		}
		r += ";";
	}
	return "{" + r.slice(0, -1) + "}";
}
function b(e, t, n) {
	let r = a();
	return g(r, e, t, n), o(n, r, n.uri, "text/turtle") || "";
}
function x(e, t, n, r, i) {
	return S(e, t, h(n), r, i);
}
function S(e, t, n, r, i) {
	let o = a();
	_(o, t, n, r, !0), e.updater?.put(r, o.statementsMatching(void 0, void 0, void 0, r), "text/turtle", function(a, o, s) {
		o ? (e.fetcher?.unload(r), _(e, t, n, r, !0), e.fetcher.requested[r.uri] = "done", i(o)) : i(o, s);
	});
}
function C(t, n, r) {
	let i = l.each(void 0, e.vcard("hasMember"), t);
	i ? w(t, i, n, r) : (n("This card is in no groups"), r(!0));
}
function w(e, n, r, a) {
	r ||= i;
	let o = e.doc();
	E(o, function(i, s, c, u, p, h) {
		if (!i || !p || !h) return a(!1, u);
		let g = s ? d(c, u) : d(p, h);
		m(n, function(n, i) {
			if (!n) return a(!1, i);
			f(i, g) ? r("Nice - same ACL. no change " + t(e) + " " + o) : (r("Group ACLs differ for " + t(e) + " " + o), x(l, c, i, u, a));
		});
	});
}
function T(e, t, r) {
	let i = l.any(e, n);
	if (!l.fetcher) throw Error("Store has no fetcher");
	i ? l.fetcher.webOperation("PUT", i.value, {
		data: t,
		contentType: "text/turtle"
	}).then((e) => {
		r(e.ok, e.error || "");
	}) : l.fetcher.nowOrWhenFetched(e, void 0, function(i, a) {
		if (!i) return r(i, "Gettting headers for ACL: " + a);
		let o = l.any(e, n);
		if (!o) r(!1, "No Link rel=ACL header for " + e);
		else {
			if (!l.fetcher) throw Error("Store has no fetcher");
			l.fetcher.webOperation("PUT", o.value, {
				data: t,
				contentType: "text/turtle"
			}).then((e) => {
				r(e.ok, e.error || "");
			});
		}
	});
}
function E(t, n) {
	D(t, function(r, i, a, o) {
		let s = e.acl;
		if (!r) return n(!1, !1, i, o);
		let u = function(e) {
			e.slice(-1) === "/" && (e = e.slice(0, -1));
			let r = e.lastIndexOf("/");
			if (e.indexOf("/", e.indexOf("//") + 2) > r) return n(!1, !0, 404, "Found no ACL resource");
			e = e.slice(0, r + 1);
			let i = c(e);
			D(i, function(r, o, c) {
				return r ? o === 403 ? n(!1, !0, o, `( default ACL file FORBIDDEN. Stop.${e})`) : o === 404 ? u(e) : o === 200 ? l.each(void 0, s("default"), l.sym(e), c).concat(l.each(void 0, s("defaultForNew"), l.sym(e), c)).length ? n(!0, !1, t, a, l.sym(e), c) : u(e) : n(!1, !0, o, `Error status '${o}' searching for default for ${i}`) : n(!1, !0, o, `( No ACL pointer ${e} ${o})${c}`);
			});
		};
		if (!r) return n(!1, !1, i, `Error accessing Access Control information for ${t}) ${o}`);
		if (i === 404) u(t.uri);
		else if (i === 403) return n(!1, !1, i, `(Sharing not available to you)${o}`);
		else if (i !== 200) return n(!1, !1, i, `Error ${i} accessing Access Control information for ${t}: ${o}`);
		else return n(!0, !0, t, a);
	});
}
function D(e, t) {
	if (!l.fetcher) throw Error("kb has no fetcher");
	l.fetcher.nowOrWhenFetched(e, void 0, function(r, i) {
		if (!r) return t(r, `Can't get headers to find ACL for ${e}: ${i}`);
		let a = l.any(e, n);
		if (!a) t(!1, 900, `No Link rel=ACL header for ${e}`);
		else {
			if (!l.fetcher) throw Error("kb has no fetcher");
			if (l.fetcher.nonexistent[a.value]) return t(!0, 404, a, `ACL file ${a} does not exist.`);
			l.fetcher.nowOrWhenFetched(a, void 0, function(e, n, r) {
				e ? t(!0, 200, a) : t(!0, r.status, a, `Can't read Access Control File ${a}: ${n}`);
			});
		}
	});
}
async function O(e) {
	return new Promise((t, n) => E(c(e), (r, i, a, o, s) => r ? t(i ? a : s) : n(/* @__PURE__ */ Error(`Error loading ${e}`))));
}
export { v as ACLToString, h as ACLbyCombination, p as ACLunion, u as adoptACLDefault, y as comboToString, w as fixIndividualACL, C as fixIndividualCardACL, D as getACL, E as getACLorDefault, O as getProspectiveHolder, m as loadUnionACL, g as makeACLGraph, _ as makeACLGraphbyCombo, b as makeACLString, x as putACLObject, S as putACLbyCombo, d as readACL, f as sameACL, T as setACL };

//# sourceMappingURL=acl.esm.js.map