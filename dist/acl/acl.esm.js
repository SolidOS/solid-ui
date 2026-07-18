import e from "../lib/ns.esm.js";
import { label as t } from "../utils/label.esm.js";
import "../utils/index.esm.js";
import { log as n } from "../lib/debug.esm.js";
import { graph as r, serialize as i, st as a, sym as o } from "rdflib";
import { ACL_LINK as s, solidLogicSingleton as c } from "solid-logic";
//#region src/acl/acl.ts
var l = c.store;
function u(t, n, i, s) {
	let c = e.acl, u = t.uri.slice(-1) === "/", d = l.each(void 0, c("default"), i, s).concat(l.each(void 0, c("defaultForNew"), i, s)).reduce((n, r) => n.concat(l.statementsMatching(r, e.rdf("type"), c("Authorization"), s)).concat(l.statementsMatching(r, c("agent"), void 0, s)).concat(l.statementsMatching(r, c("agentClass"), void 0, s)).concat(l.statementsMatching(r, c("agentGroup"), void 0, s)).concat(l.statementsMatching(r, c("origin"), void 0, s)).concat(l.statementsMatching(r, c("originClass"), void 0, s)).concat(l.statementsMatching(r, c("mode"), void 0, s)).concat(a(r, c("accessTo"), t, s)).concat(u ? a(r, c("default"), t, s) : []), []), f = r();
	return d.forEach((e) => f.add(p(e.subject), p(e.predicate), p(e.object), o(n.uri))), f;
	function p(e) {
		let t = s.uri.length;
		return o(e.uri.slice(0, t) === s.uri ? n.uri + e.uri.slice(t) : e.uri);
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
		let s = n[i];
		for (let n = 0; n < s.length; n++) {
			let i = s[n][0], a = o(s[n][1]);
			r += i === "agent" ? "@" : "", r += a.sameTerm(e.foaf("Agent")) ? "*" : t(a), n < s.length - 1 && (r += ",");
		}
		r += ";";
	}
	return "{" + r.slice(0, -1) + "}";
}
function b(e, t, n) {
	let a = r();
	return g(a, e, t, n), i(n, a, n.uri, "text/turtle") || "";
}
function x(e, t, n, r, i) {
	return S(e, t, h(n), r, i);
}
function S(e, t, n, i, a) {
	let o = r();
	_(o, t, n, i, !0), e.updater?.put(i, o.statementsMatching(void 0, void 0, void 0, i), "text/turtle", function(r, o, s) {
		o ? (e.fetcher?.unload(i), _(e, t, n, i, !0), e.fetcher.requested[i.uri] = "done", a(o)) : a(o, s);
	});
}
function C(t, n, r) {
	let i = l.each(void 0, e.vcard("hasMember"), t);
	i ? w(t, i, n, r) : (n("This card is in no groups"), r(!0));
}
function w(e, r, i, a) {
	i ||= n;
	let o = e.doc();
	E(o, function(n, s, c, u, p, h) {
		if (!n || !p || !h) return a(!1, u);
		let g = s ? d(c, u) : d(p, h);
		m(r, function(n, r) {
			if (!n) return a(!1, r);
			f(r, g) ? i("Nice - same ACL. no change " + t(e) + " " + o) : (i("Group ACLs differ for " + t(e) + " " + o), x(l, c, r, u, a));
		});
	});
}
function T(e, t, n) {
	let r = l.any(e, s);
	if (!l.fetcher) throw Error("Store has no fetcher");
	r ? l.fetcher.webOperation("PUT", r.value, {
		data: t,
		contentType: "text/turtle"
	}).then((e) => {
		n(e.ok, e.error || "");
	}) : l.fetcher.nowOrWhenFetched(e, void 0, function(r, i) {
		if (!r) return n(r, "Gettting headers for ACL: " + i);
		let a = l.any(e, s);
		if (!a) n(!1, "No Link rel=ACL header for " + e);
		else {
			if (!l.fetcher) throw Error("Store has no fetcher");
			l.fetcher.webOperation("PUT", a.value, {
				data: t,
				contentType: "text/turtle"
			}).then((e) => {
				n(e.ok, e.error || "");
			});
		}
	});
}
function E(t, n) {
	D(t, function(r, i, a, s) {
		let c = e.acl;
		if (!r) return n(!1, !1, i, s);
		let u = function(e) {
			e.slice(-1) === "/" && (e = e.slice(0, -1));
			let r = e.lastIndexOf("/");
			if (e.indexOf("/", e.indexOf("//") + 2) > r) return n(!1, !0, 404, "Found no ACL resource");
			e = e.slice(0, r + 1);
			let i = o(e);
			D(i, function(r, o, s) {
				return r ? o === 403 ? n(!1, !0, o, `( default ACL file FORBIDDEN. Stop.${e})`) : o === 404 ? u(e) : o === 200 ? l.each(void 0, c("default"), l.sym(e), s).concat(l.each(void 0, c("defaultForNew"), l.sym(e), s)).length ? n(!0, !1, t, a, l.sym(e), s) : u(e) : n(!1, !0, o, `Error status '${o}' searching for default for ${i}`) : n(!1, !0, o, `( No ACL pointer ${e} ${o})${s}`);
			});
		};
		if (!r) return n(!1, !1, i, `Error accessing Access Control information for ${t}) ${s}`);
		if (i === 404) u(t.uri);
		else if (i === 403) return n(!1, !1, i, `(Sharing not available to you)${s}`);
		else if (i !== 200) return n(!1, !1, i, `Error ${i} accessing Access Control information for ${t}: ${s}`);
		else return n(!0, !0, t, a);
	});
}
function D(e, t) {
	if (!l.fetcher) throw Error("kb has no fetcher");
	l.fetcher.nowOrWhenFetched(e, void 0, function(n, r) {
		if (!n) return t(n, `Can't get headers to find ACL for ${e}: ${r}`);
		let i = l.any(e, s);
		if (!i) t(!1, 900, `No Link rel=ACL header for ${e}`);
		else {
			if (!l.fetcher) throw Error("kb has no fetcher");
			if (l.fetcher.nonexistent[i.value]) return t(!0, 404, i, `ACL file ${i} does not exist.`);
			l.fetcher.nowOrWhenFetched(i, void 0, function(e, n, r) {
				e ? t(!0, 200, i) : t(!0, r.status, i, `Can't read Access Control File ${i}: ${n}`);
			});
		}
	});
}
async function O(e) {
	return new Promise((t, n) => E(o(e), (r, i, a, o, s) => r ? t(i ? a : s) : n(/* @__PURE__ */ Error(`Error loading ${e}`))));
}
//#endregion
export { v as ACLToString, h as ACLbyCombination, p as ACLunion, u as adoptACLDefault, y as comboToString, w as fixIndividualACL, C as fixIndividualCardACL, D as getACL, E as getACLorDefault, O as getProspectiveHolder, m as loadUnionACL, g as makeACLGraph, _ as makeACLGraphbyCombo, b as makeACLString, x as putACLObject, S as putACLbyCombo, d as readACL, f as sameACL, T as setACL };

//# sourceMappingURL=acl.esm.js.map