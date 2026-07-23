import { a as e, i as t, n, r, t as i } from "./rolldown-runtime-B1bRi_D7.js";
import { A as a, C as o, D as s, E as c, F as l, I as u, L as d, M as f, N as p, O as m, P as h, R as g, S as _, T as v, _ as y, a as b, b as x, c as S, d as C, f as w, g as T, h as E, i as D, j as O, k, l as ee, m as A, n as te, o as ne, p as j, r as re, s as ie, t as ae, u as oe, v as se, w as ce, x as le, y as ue, z as de } from "./solid-logic.esm-BrMdCG2_.js";
import { a as fe, c as pe, d as me, f as M, i as he, l as ge, m as _e, n as N, o as ve, p as ye, r as be, s as xe, t as P, u as F } from "./style-DMYSNcEw.js";
import "./auth-CuOD2rHp.js";
import "./components-DrP7BOrs.js";
import "./dialogs-CeHuLUo5.js";
//#region src/lib/debug.ts
function I(...e) {
	console.log(...e);
}
function L(...e) {
	console.warn(...e);
}
function R(...e) {
	console.error(...e);
}
function Se(...e) {
	console.trace(...e);
}
//#endregion
//#region src/acl/acl.ts
var z = w.store;
function Ce(e, t, n, r) {
	let i = E.acl, a = e.uri.slice(-1) === "/", s = z.each(void 0, i("default"), n, r).concat(z.each(void 0, i("defaultForNew"), n, r)).reduce((t, n) => t.concat(z.statementsMatching(n, E.rdf("type"), i("Authorization"), r)).concat(z.statementsMatching(n, i("agent"), void 0, r)).concat(z.statementsMatching(n, i("agentClass"), void 0, r)).concat(z.statementsMatching(n, i("agentGroup"), void 0, r)).concat(z.statementsMatching(n, i("origin"), void 0, r)).concat(z.statementsMatching(n, i("originClass"), void 0, r)).concat(z.statementsMatching(n, i("mode"), void 0, r)).concat(o(n, i("accessTo"), e, r)).concat(a ? o(n, i("default"), e, r) : []), []), c = ue();
	return s.forEach((e) => c.add(l(e.subject), l(e.predicate), l(e.object), _(t.uri))), c;
	function l(e) {
		let n = r.uri.length;
		return _(e.uri.slice(0, n) === r.uri ? t.uri + e.uri.slice(n) : e.uri);
	}
}
function we(e, t, n = z, r = !1) {
	let i = r ? s(n, E) : n.each(void 0, E.acl("accessTo"), e), a = E.acl, o = {
		agent: {},
		agentClass: {},
		agentGroup: {},
		origin: {},
		originClass: {}
	};
	return Object.keys(o).forEach((e) => {
		i.forEach(function(t) {
			n.each(t, a("mode")).forEach(function(r) {
				n.each(t, a(e)).forEach(function(n) {
					o[e][n.uri] = o[e][n.uri] || {}, o[e][n.uri][r.uri] = t;
				});
			});
		});
	}), o;
	function s(t, n) {
		return t.each(void 0, n.acl("default"), e).concat(t.each(void 0, n.acl("defaultForNew"), e));
	}
}
function Te(e, t) {
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
function Ee(e) {
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
function De(e, t) {
	let n = [], r = function(e) {
		e.length ? ze(e.shift().doc(), function(i, a, o, s, c, l) {
			let u = !a;
			if (!i || !c || !l) return t(i, s);
			let d = u ? we(c, l) : we(o, s);
			n.push(d), r(e.slice(1));
		}) : t(!0, Ee(n));
	};
	r(e);
}
function Oe(e) {
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
function ke(e, t, n, r) {
	return Ae(e, t, Oe(n), r);
}
function Ae(e, t, n, r, i, a) {
	let o = E.acl;
	for (let s in n) {
		let c = n[s];
		if (!c.length) continue;
		let l = s.split("\n"), u = l.map(function(e) {
			return e.split("#")[1];
		}).join("");
		a && !i && (u += "Default");
		let d = e.sym(r.uri + "#" + u);
		e.add(d, E.rdf("type"), o("Authorization"), r), i && e.add(d, o("accessTo"), t, r), a && e.add(d, o("default"), t, r);
		for (let t = 0; t < l.length; t++) e.add(d, o("mode"), e.sym(l[t]), r);
		for (let t = 0; t < c.length; t++) {
			let n = c[t][0], i = c[t][1];
			e.add(d, o(n), e.sym(i), r);
		}
	}
}
function je(e) {
	return Me(Oe(e));
}
function Me(e) {
	let t = "";
	for (let n in e) {
		let r = n.split("\n").map(function(e) {
			return e.split("#")[1][0];
		}).join("");
		t += r + ":";
		let i = e[n];
		for (let e = 0; e < i.length; e++) {
			let n = i[e][0], r = _(i[e][1]);
			t += n === "agent" ? "@" : "", t += r.sameTerm(E.foaf("Agent")) ? "*" : F(r), e < i.length - 1 && (t += ",");
		}
		t += ";";
	}
	return "{" + t.slice(0, -1) + "}";
}
function Ne(e, t, n) {
	let r = ue();
	return ke(r, e, t, n), O(n, r, n.uri, "text/turtle") || "";
}
function Pe(e, t, n, r, i) {
	return Fe(e, t, Oe(n), r, i);
}
function Fe(e, t, n, r, i) {
	let a = ue();
	Ae(a, t, n, r, !0), e.updater?.put(r, a.statementsMatching(void 0, void 0, void 0, r), "text/turtle", function(a, o, s) {
		o ? (e.fetcher?.unload(r), Ae(e, t, n, r, !0), e.fetcher.requested[r.uri] = "done", i(o)) : i(o, s);
	});
}
function Ie(e, t, n) {
	let r = z.each(void 0, E.vcard("hasMember"), e);
	r ? Le(e, r, t, n) : (t("This card is in no groups"), n(!0));
}
function Le(e, t, n, r) {
	n ||= I;
	let i = e.doc();
	ze(i, function(a, o, s, c, l, u) {
		if (!a || !l || !u) return r(!1, c);
		let d = o ? we(s, c) : we(l, u);
		De(t, function(t, a) {
			if (!t) return r(!1, a);
			Te(a, d) ? n("Nice - same ACL. no change " + F(e) + " " + i) : (n("Group ACLs differ for " + F(e) + " " + i), Pe(z, s, a, c, r));
		});
	});
}
function Re(e, t, n) {
	let r = z.any(e, ae);
	if (!z.fetcher) throw Error("Store has no fetcher");
	r ? z.fetcher.webOperation("PUT", r.value, {
		data: t,
		contentType: "text/turtle"
	}).then((e) => {
		n(e.ok, e.error || "");
	}) : z.fetcher.nowOrWhenFetched(e, void 0, function(r, i) {
		if (!r) return n(r, "Gettting headers for ACL: " + i);
		let a = z.any(e, ae);
		if (!a) n(!1, "No Link rel=ACL header for " + e);
		else {
			if (!z.fetcher) throw Error("Store has no fetcher");
			z.fetcher.webOperation("PUT", a.value, {
				data: t,
				contentType: "text/turtle"
			}).then((e) => {
				n(e.ok, e.error || "");
			});
		}
	});
}
function ze(e, t) {
	Be(e, function(n, r, i, a) {
		let o = E.acl;
		if (!n) return t(!1, !1, r, a);
		let s = function(n) {
			n.slice(-1) === "/" && (n = n.slice(0, -1));
			let r = n.lastIndexOf("/");
			if (n.indexOf("/", n.indexOf("//") + 2) > r) return t(!1, !0, 404, "Found no ACL resource");
			n = n.slice(0, r + 1);
			let a = _(n);
			Be(a, function(r, c, l) {
				return r ? c === 403 ? t(!1, !0, c, `( default ACL file FORBIDDEN. Stop.${n})`) : c === 404 ? s(n) : c === 200 ? z.each(void 0, o("default"), z.sym(n), l).concat(z.each(void 0, o("defaultForNew"), z.sym(n), l)).length ? t(!0, !1, e, i, z.sym(n), l) : s(n) : t(!1, !0, c, `Error status '${c}' searching for default for ${a}`) : t(!1, !0, c, `( No ACL pointer ${n} ${c})${l}`);
			});
		};
		if (!n) return t(!1, !1, r, `Error accessing Access Control information for ${e}) ${a}`);
		if (r === 404) s(e.uri);
		else if (r === 403) return t(!1, !1, r, `(Sharing not available to you)${a}`);
		else if (r !== 200) return t(!1, !1, r, `Error ${r} accessing Access Control information for ${e}: ${a}`);
		else return t(!0, !0, e, i);
	});
}
function Be(e, t) {
	if (!z.fetcher) throw Error("kb has no fetcher");
	z.fetcher.nowOrWhenFetched(e, void 0, function(n, r) {
		if (!n) return t(n, `Can't get headers to find ACL for ${e}: ${r}`);
		let i = z.any(e, ae);
		if (!i) t(!1, 900, `No Link rel=ACL header for ${e}`);
		else {
			if (!z.fetcher) throw Error("kb has no fetcher");
			if (z.fetcher.nonexistent[i.value]) return t(!0, 404, i, `ACL file ${i} does not exist.`);
			z.fetcher.nowOrWhenFetched(i, void 0, function(e, n, r) {
				e ? t(!0, 200, i) : t(!0, r.status, i, `Can't read Access Control File ${i}: ${n}`);
			});
		}
	});
}
async function Ve(e) {
	return new Promise((t, n) => ze(_(e), (r, i, a, o, s) => r ? t(i ? a : s) : n(/* @__PURE__ */ Error(`Error loading ${e}`))));
}
//#endregion
//#region node_modules/escape-html/index.js
var He = /* @__PURE__ */ i(((e, t) => {
	var n = /["'&<>]/;
	t.exports = r;
	function r(e) {
		var t = "" + e, r = n.exec(t);
		if (!r) return t;
		var i, a = "", o = 0, s = 0;
		for (o = r.index; o < t.length; o++) {
			switch (t.charCodeAt(o)) {
				case 34:
					i = "&quot;";
					break;
				case 38:
					i = "&amp;";
					break;
				case 39:
					i = "&#39;";
					break;
				case 60:
					i = "&lt;";
					break;
				case 62:
					i = "&gt;";
					break;
				default: continue;
			}
			s !== o && (a += t.substring(s, o)), s = o + 1, a += i;
		}
		return s === o ? a : a + t.substring(s, o);
	}
})), B = [];
for (let e = 0; e < 256; ++e) B.push((e + 256).toString(16).slice(1));
function Ue(e, t = 0) {
	return (B[e[t + 0]] + B[e[t + 1]] + B[e[t + 2]] + B[e[t + 3]] + "-" + B[e[t + 4]] + B[e[t + 5]] + "-" + B[e[t + 6]] + B[e[t + 7]] + "-" + B[e[t + 8]] + B[e[t + 9]] + "-" + B[e[t + 10]] + B[e[t + 11]] + B[e[t + 12]] + B[e[t + 13]] + B[e[t + 14]] + B[e[t + 15]]).toLowerCase();
}
//#endregion
//#region node_modules/uuid/dist/rng.js
var We = /* @__PURE__ */ new Uint8Array(16);
function Ge() {
	return crypto.getRandomValues(We);
}
//#endregion
//#region node_modules/uuid/dist/v4.js
function Ke(e, t, n) {
	return !t && !e && crypto.randomUUID ? crypto.randomUUID() : qe(e, t, n);
}
function qe(e, t, n) {
	e ||= {};
	let r = e.random ?? e.rng?.() ?? Ge();
	if (r.length < 16) throw Error("Random bytes length must be >= 16");
	if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
		if (n ||= 0, n < 0 || n + 16 > t.length) throw RangeError(`UUID byte range ${n}:${n + 15} is out of buffer bounds`);
		for (let e = 0; e < 16; ++e) t[n + e] = r[e];
		return t;
	}
	return Ue(r);
}
//#endregion
//#region node_modules/mime-db/db.json
var Je = /* @__PURE__ */ r({ default: () => Ye }), Ye, Xe = n((() => {
	Ye = {
		"application/1d-interleaved-parityfec": { source: "iana" },
		"application/3gpdash-qoe-report+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/3gpp-ims+xml": {
			source: "iana",
			compressible: !0
		},
		"application/3gpphal+json": {
			source: "iana",
			compressible: !0
		},
		"application/3gpphalforms+json": {
			source: "iana",
			compressible: !0
		},
		"application/a2l": { source: "iana" },
		"application/ace+cbor": { source: "iana" },
		"application/ace+json": {
			source: "iana",
			compressible: !0
		},
		"application/ace-groupcomm+cbor": { source: "iana" },
		"application/ace-trl+cbor": { source: "iana" },
		"application/activemessage": { source: "iana" },
		"application/activity+json": {
			source: "iana",
			compressible: !0
		},
		"application/aif+cbor": { source: "iana" },
		"application/aif+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-cdni+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-cdnifilter+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-costmap+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-costmapfilter+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-directory+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-endpointcost+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-endpointcostparams+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-endpointprop+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-endpointpropparams+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-error+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-networkmap+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-networkmapfilter+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-propmap+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-propmapparams+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-tips+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-tipsparams+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-updatestreamcontrol+json": {
			source: "iana",
			compressible: !0
		},
		"application/alto-updatestreamparams+json": {
			source: "iana",
			compressible: !0
		},
		"application/aml": { source: "iana" },
		"application/andrew-inset": {
			source: "iana",
			extensions: ["ez"]
		},
		"application/appinstaller": {
			compressible: !1,
			extensions: ["appinstaller"]
		},
		"application/applefile": { source: "iana" },
		"application/applixware": {
			source: "apache",
			extensions: ["aw"]
		},
		"application/appx": {
			compressible: !1,
			extensions: ["appx"]
		},
		"application/appxbundle": {
			compressible: !1,
			extensions: ["appxbundle"]
		},
		"application/at+jwt": { source: "iana" },
		"application/atf": { source: "iana" },
		"application/atfx": { source: "iana" },
		"application/atom+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["atom"]
		},
		"application/atomcat+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["atomcat"]
		},
		"application/atomdeleted+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["atomdeleted"]
		},
		"application/atomicmail": { source: "iana" },
		"application/atomsvc+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["atomsvc"]
		},
		"application/atsc-dwd+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["dwd"]
		},
		"application/atsc-dynamic-event-message": { source: "iana" },
		"application/atsc-held+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["held"]
		},
		"application/atsc-rdt+json": {
			source: "iana",
			compressible: !0
		},
		"application/atsc-rsat+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rsat"]
		},
		"application/atxml": { source: "iana" },
		"application/auth-policy+xml": {
			source: "iana",
			compressible: !0
		},
		"application/automationml-aml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["aml"]
		},
		"application/automationml-amlx+zip": {
			source: "iana",
			compressible: !1,
			extensions: ["amlx"]
		},
		"application/bacnet-xdd+zip": {
			source: "iana",
			compressible: !1
		},
		"application/batch-smtp": { source: "iana" },
		"application/bdoc": {
			compressible: !1,
			extensions: ["bdoc"]
		},
		"application/beep+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/bufr": { source: "iana" },
		"application/c2pa": { source: "iana" },
		"application/calendar+json": {
			source: "iana",
			compressible: !0
		},
		"application/calendar+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xcs"]
		},
		"application/call-completion": { source: "iana" },
		"application/cals-1840": { source: "iana" },
		"application/captive+json": {
			source: "iana",
			compressible: !0
		},
		"application/cbor": { source: "iana" },
		"application/cbor-seq": { source: "iana" },
		"application/cccex": { source: "iana" },
		"application/ccmp+xml": {
			source: "iana",
			compressible: !0
		},
		"application/ccxml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["ccxml"]
		},
		"application/cda+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/cdfx+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["cdfx"]
		},
		"application/cdmi-capability": {
			source: "iana",
			extensions: ["cdmia"]
		},
		"application/cdmi-container": {
			source: "iana",
			extensions: ["cdmic"]
		},
		"application/cdmi-domain": {
			source: "iana",
			extensions: ["cdmid"]
		},
		"application/cdmi-object": {
			source: "iana",
			extensions: ["cdmio"]
		},
		"application/cdmi-queue": {
			source: "iana",
			extensions: ["cdmiq"]
		},
		"application/cdni": { source: "iana" },
		"application/ce+cbor": { source: "iana" },
		"application/cea": { source: "iana" },
		"application/cea-2018+xml": {
			source: "iana",
			compressible: !0
		},
		"application/cellml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/cfw": { source: "iana" },
		"application/cid-edhoc+cbor-seq": { source: "iana" },
		"application/city+json": {
			source: "iana",
			compressible: !0
		},
		"application/city+json-seq": { source: "iana" },
		"application/clr": { source: "iana" },
		"application/clue+xml": {
			source: "iana",
			compressible: !0
		},
		"application/clue_info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/cms": { source: "iana" },
		"application/cnrp+xml": {
			source: "iana",
			compressible: !0
		},
		"application/coap-eap": { source: "iana" },
		"application/coap-group+json": {
			source: "iana",
			compressible: !0
		},
		"application/coap-payload": { source: "iana" },
		"application/commonground": { source: "iana" },
		"application/concise-problem-details+cbor": { source: "iana" },
		"application/conference-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/cose": { source: "iana" },
		"application/cose-key": { source: "iana" },
		"application/cose-key-set": { source: "iana" },
		"application/cose-x509": { source: "iana" },
		"application/cpl+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["cpl"]
		},
		"application/csrattrs": { source: "iana" },
		"application/csta+xml": {
			source: "iana",
			compressible: !0
		},
		"application/cstadata+xml": {
			source: "iana",
			compressible: !0
		},
		"application/csvm+json": {
			source: "iana",
			compressible: !0
		},
		"application/cu-seeme": {
			source: "apache",
			extensions: ["cu"]
		},
		"application/cwl": {
			source: "iana",
			extensions: ["cwl"]
		},
		"application/cwl+json": {
			source: "iana",
			compressible: !0
		},
		"application/cwl+yaml": { source: "iana" },
		"application/cwt": { source: "iana" },
		"application/cybercash": { source: "iana" },
		"application/dart": { compressible: !0 },
		"application/dash+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mpd"]
		},
		"application/dash-patch+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mpp"]
		},
		"application/dashdelta": { source: "iana" },
		"application/davmount+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["davmount"]
		},
		"application/dca-rft": { source: "iana" },
		"application/dcd": { source: "iana" },
		"application/dec-dx": { source: "iana" },
		"application/dialog-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/dicom": {
			source: "iana",
			extensions: ["dcm"]
		},
		"application/dicom+json": {
			source: "iana",
			compressible: !0
		},
		"application/dicom+xml": {
			source: "iana",
			compressible: !0
		},
		"application/dii": { source: "iana" },
		"application/dit": { source: "iana" },
		"application/dns": { source: "iana" },
		"application/dns+json": {
			source: "iana",
			compressible: !0
		},
		"application/dns-message": { source: "iana" },
		"application/docbook+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["dbk"]
		},
		"application/dots+cbor": { source: "iana" },
		"application/dpop+jwt": { source: "iana" },
		"application/dskpp+xml": {
			source: "iana",
			compressible: !0
		},
		"application/dssc+der": {
			source: "iana",
			extensions: ["dssc"]
		},
		"application/dssc+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xdssc"]
		},
		"application/dvcs": { source: "iana" },
		"application/eat+cwt": { source: "iana" },
		"application/eat+jwt": { source: "iana" },
		"application/eat-bun+cbor": { source: "iana" },
		"application/eat-bun+json": {
			source: "iana",
			compressible: !0
		},
		"application/eat-ucs+cbor": { source: "iana" },
		"application/eat-ucs+json": {
			source: "iana",
			compressible: !0
		},
		"application/ecmascript": {
			source: "apache",
			compressible: !0,
			extensions: ["ecma"]
		},
		"application/edhoc+cbor-seq": { source: "iana" },
		"application/edi-consent": { source: "iana" },
		"application/edi-x12": {
			source: "iana",
			compressible: !1
		},
		"application/edifact": {
			source: "iana",
			compressible: !1
		},
		"application/efi": { source: "iana" },
		"application/elm+json": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/elm+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.cap+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/emergencycalldata.comment+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.control+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.deviceinfo+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.ecall.msd": { source: "iana" },
		"application/emergencycalldata.legacyesn+json": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.providerinfo+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.serviceinfo+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.subscriberinfo+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emergencycalldata.veds+xml": {
			source: "iana",
			compressible: !0
		},
		"application/emma+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["emma"]
		},
		"application/emotionml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["emotionml"]
		},
		"application/encaprtp": { source: "iana" },
		"application/entity-statement+jwt": { source: "iana" },
		"application/epp+xml": {
			source: "iana",
			compressible: !0
		},
		"application/epub+zip": {
			source: "iana",
			compressible: !1,
			extensions: ["epub"]
		},
		"application/eshop": { source: "iana" },
		"application/exi": {
			source: "iana",
			extensions: ["exi"]
		},
		"application/expect-ct-report+json": {
			source: "iana",
			compressible: !0
		},
		"application/express": {
			source: "iana",
			extensions: ["exp"]
		},
		"application/fastinfoset": { source: "iana" },
		"application/fastsoap": { source: "iana" },
		"application/fdf": {
			source: "iana",
			extensions: ["fdf"]
		},
		"application/fdt+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["fdt"]
		},
		"application/fhir+json": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/fhir+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/fido.trusted-apps+json": { compressible: !0 },
		"application/fits": { source: "iana" },
		"application/flexfec": { source: "iana" },
		"application/font-sfnt": { source: "iana" },
		"application/font-tdpfr": {
			source: "iana",
			extensions: ["pfr"]
		},
		"application/font-woff": {
			source: "iana",
			compressible: !1
		},
		"application/framework-attributes+xml": {
			source: "iana",
			compressible: !0
		},
		"application/geo+json": {
			source: "iana",
			compressible: !0,
			extensions: ["geojson"]
		},
		"application/geo+json-seq": { source: "iana" },
		"application/geopackage+sqlite3": { source: "iana" },
		"application/geopose+json": {
			source: "iana",
			compressible: !0
		},
		"application/geoxacml+json": {
			source: "iana",
			compressible: !0
		},
		"application/geoxacml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/gltf-buffer": { source: "iana" },
		"application/gml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["gml"]
		},
		"application/gnap-binding-jws": { source: "iana" },
		"application/gnap-binding-jwsd": { source: "iana" },
		"application/gnap-binding-rotation-jws": { source: "iana" },
		"application/gnap-binding-rotation-jwsd": { source: "iana" },
		"application/gpx+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["gpx"]
		},
		"application/grib": { source: "iana" },
		"application/gxf": {
			source: "apache",
			extensions: ["gxf"]
		},
		"application/gzip": {
			source: "iana",
			compressible: !1,
			extensions: ["gz"]
		},
		"application/h224": { source: "iana" },
		"application/held+xml": {
			source: "iana",
			compressible: !0
		},
		"application/hjson": { extensions: ["hjson"] },
		"application/hl7v2+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/http": { source: "iana" },
		"application/hyperstudio": {
			source: "iana",
			extensions: ["stk"]
		},
		"application/ibe-key-request+xml": {
			source: "iana",
			compressible: !0
		},
		"application/ibe-pkg-reply+xml": {
			source: "iana",
			compressible: !0
		},
		"application/ibe-pp-data": { source: "iana" },
		"application/iges": { source: "iana" },
		"application/im-iscomposing+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/index": { source: "iana" },
		"application/index.cmd": { source: "iana" },
		"application/index.obj": { source: "iana" },
		"application/index.response": { source: "iana" },
		"application/index.vnd": { source: "iana" },
		"application/inkml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["ink", "inkml"]
		},
		"application/iotp": { source: "iana" },
		"application/ipfix": {
			source: "iana",
			extensions: ["ipfix"]
		},
		"application/ipp": { source: "iana" },
		"application/isup": { source: "iana" },
		"application/its+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["its"]
		},
		"application/java-archive": {
			source: "iana",
			compressible: !1,
			extensions: [
				"jar",
				"war",
				"ear"
			]
		},
		"application/java-serialized-object": {
			source: "apache",
			compressible: !1,
			extensions: ["ser"]
		},
		"application/java-vm": {
			source: "apache",
			compressible: !1,
			extensions: ["class"]
		},
		"application/javascript": {
			source: "apache",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["js"]
		},
		"application/jf2feed+json": {
			source: "iana",
			compressible: !0
		},
		"application/jose": { source: "iana" },
		"application/jose+json": {
			source: "iana",
			compressible: !0
		},
		"application/jrd+json": {
			source: "iana",
			compressible: !0
		},
		"application/jscalendar+json": {
			source: "iana",
			compressible: !0
		},
		"application/jscontact+json": {
			source: "iana",
			compressible: !0
		},
		"application/json": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["json", "map"]
		},
		"application/json-patch+json": {
			source: "iana",
			compressible: !0
		},
		"application/json-seq": { source: "iana" },
		"application/json5": { extensions: ["json5"] },
		"application/jsonml+json": {
			source: "apache",
			compressible: !0,
			extensions: ["jsonml"]
		},
		"application/jsonpath": { source: "iana" },
		"application/jwk+json": {
			source: "iana",
			compressible: !0
		},
		"application/jwk-set+json": {
			source: "iana",
			compressible: !0
		},
		"application/jwk-set+jwt": { source: "iana" },
		"application/jwt": { source: "iana" },
		"application/kpml-request+xml": {
			source: "iana",
			compressible: !0
		},
		"application/kpml-response+xml": {
			source: "iana",
			compressible: !0
		},
		"application/ld+json": {
			source: "iana",
			compressible: !0,
			extensions: ["jsonld"]
		},
		"application/lgr+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["lgr"]
		},
		"application/link-format": { source: "iana" },
		"application/linkset": { source: "iana" },
		"application/linkset+json": {
			source: "iana",
			compressible: !0
		},
		"application/load-control+xml": {
			source: "iana",
			compressible: !0
		},
		"application/logout+jwt": { source: "iana" },
		"application/lost+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["lostxml"]
		},
		"application/lostsync+xml": {
			source: "iana",
			compressible: !0
		},
		"application/lpf+zip": {
			source: "iana",
			compressible: !1
		},
		"application/lxf": { source: "iana" },
		"application/mac-binhex40": {
			source: "iana",
			extensions: ["hqx"]
		},
		"application/mac-compactpro": {
			source: "apache",
			extensions: ["cpt"]
		},
		"application/macwriteii": { source: "iana" },
		"application/mads+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mads"]
		},
		"application/manifest+json": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["webmanifest"]
		},
		"application/marc": {
			source: "iana",
			extensions: ["mrc"]
		},
		"application/marcxml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mrcx"]
		},
		"application/mathematica": {
			source: "iana",
			extensions: [
				"ma",
				"nb",
				"mb"
			]
		},
		"application/mathml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mathml"]
		},
		"application/mathml-content+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mathml-presentation+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-associated-procedure-description+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-deregister+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-envelope+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-msk+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-msk-response+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-protection-description+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-reception-report+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-register+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-register-response+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-schedule+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbms-user-service-description+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mbox": {
			source: "iana",
			extensions: ["mbox"]
		},
		"application/media-policy-dataset+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mpf"]
		},
		"application/media_control+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mediaservercontrol+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mscml"]
		},
		"application/merge-patch+json": {
			source: "iana",
			compressible: !0
		},
		"application/metalink+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["metalink"]
		},
		"application/metalink4+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["meta4"]
		},
		"application/mets+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mets"]
		},
		"application/mf4": { source: "iana" },
		"application/mikey": { source: "iana" },
		"application/mipc": { source: "iana" },
		"application/missing-blocks+cbor-seq": { source: "iana" },
		"application/mmt-aei+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["maei"]
		},
		"application/mmt-usd+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["musd"]
		},
		"application/mods+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mods"]
		},
		"application/moss-keys": { source: "iana" },
		"application/moss-signature": { source: "iana" },
		"application/mosskey-data": { source: "iana" },
		"application/mosskey-request": { source: "iana" },
		"application/mp21": {
			source: "iana",
			extensions: ["m21", "mp21"]
		},
		"application/mp4": {
			source: "iana",
			extensions: [
				"mp4",
				"mpg4",
				"mp4s",
				"m4p"
			]
		},
		"application/mpeg4-generic": { source: "iana" },
		"application/mpeg4-iod": { source: "iana" },
		"application/mpeg4-iod-xmt": { source: "iana" },
		"application/mrb-consumer+xml": {
			source: "iana",
			compressible: !0
		},
		"application/mrb-publish+xml": {
			source: "iana",
			compressible: !0
		},
		"application/msc-ivr+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/msc-mixer+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/msix": {
			compressible: !1,
			extensions: ["msix"]
		},
		"application/msixbundle": {
			compressible: !1,
			extensions: ["msixbundle"]
		},
		"application/msword": {
			source: "iana",
			compressible: !1,
			extensions: ["doc", "dot"]
		},
		"application/mud+json": {
			source: "iana",
			compressible: !0
		},
		"application/multipart-core": { source: "iana" },
		"application/mxf": {
			source: "iana",
			extensions: ["mxf"]
		},
		"application/n-quads": {
			source: "iana",
			extensions: ["nq"]
		},
		"application/n-triples": {
			source: "iana",
			extensions: ["nt"]
		},
		"application/nasdata": { source: "iana" },
		"application/news-checkgroups": {
			source: "iana",
			charset: "US-ASCII"
		},
		"application/news-groupinfo": {
			source: "iana",
			charset: "US-ASCII"
		},
		"application/news-transmission": { source: "iana" },
		"application/nlsml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/node": {
			source: "iana",
			extensions: ["cjs"]
		},
		"application/nss": { source: "iana" },
		"application/oauth-authz-req+jwt": { source: "iana" },
		"application/oblivious-dns-message": { source: "iana" },
		"application/ocsp-request": { source: "iana" },
		"application/ocsp-response": { source: "iana" },
		"application/octet-stream": {
			source: "iana",
			compressible: !0,
			extensions: [
				"bin",
				"dms",
				"lrf",
				"mar",
				"so",
				"dist",
				"distz",
				"pkg",
				"bpk",
				"dump",
				"elc",
				"deploy",
				"exe",
				"dll",
				"deb",
				"dmg",
				"iso",
				"img",
				"msi",
				"msp",
				"msm",
				"buffer"
			]
		},
		"application/oda": {
			source: "iana",
			extensions: ["oda"]
		},
		"application/odm+xml": {
			source: "iana",
			compressible: !0
		},
		"application/odx": { source: "iana" },
		"application/oebps-package+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["opf"]
		},
		"application/ogg": {
			source: "iana",
			compressible: !1,
			extensions: ["ogx"]
		},
		"application/ohttp-keys": { source: "iana" },
		"application/omdoc+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["omdoc"]
		},
		"application/onenote": {
			source: "apache",
			extensions: [
				"onetoc",
				"onetoc2",
				"onetmp",
				"onepkg",
				"one",
				"onea"
			]
		},
		"application/opc-nodeset+xml": {
			source: "iana",
			compressible: !0
		},
		"application/oscore": { source: "iana" },
		"application/oxps": {
			source: "iana",
			extensions: ["oxps"]
		},
		"application/p21": { source: "iana" },
		"application/p21+zip": {
			source: "iana",
			compressible: !1
		},
		"application/p2p-overlay+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["relo"]
		},
		"application/parityfec": { source: "iana" },
		"application/passport": { source: "iana" },
		"application/patch-ops-error+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xer"]
		},
		"application/pdf": {
			source: "iana",
			compressible: !1,
			extensions: ["pdf"]
		},
		"application/pdx": { source: "iana" },
		"application/pem-certificate-chain": { source: "iana" },
		"application/pgp-encrypted": {
			source: "iana",
			compressible: !1,
			extensions: ["pgp"]
		},
		"application/pgp-keys": {
			source: "iana",
			extensions: ["asc"]
		},
		"application/pgp-signature": {
			source: "iana",
			extensions: ["sig", "asc"]
		},
		"application/pics-rules": {
			source: "apache",
			extensions: ["prf"]
		},
		"application/pidf+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/pidf-diff+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/pkcs10": {
			source: "iana",
			extensions: ["p10"]
		},
		"application/pkcs12": { source: "iana" },
		"application/pkcs7-mime": {
			source: "iana",
			extensions: ["p7m", "p7c"]
		},
		"application/pkcs7-signature": {
			source: "iana",
			extensions: ["p7s"]
		},
		"application/pkcs8": {
			source: "iana",
			extensions: ["p8"]
		},
		"application/pkcs8-encrypted": { source: "iana" },
		"application/pkix-attr-cert": {
			source: "iana",
			extensions: ["ac"]
		},
		"application/pkix-cert": {
			source: "iana",
			extensions: ["cer"]
		},
		"application/pkix-crl": {
			source: "iana",
			extensions: ["crl"]
		},
		"application/pkix-pkipath": {
			source: "iana",
			extensions: ["pkipath"]
		},
		"application/pkixcmp": {
			source: "iana",
			extensions: ["pki"]
		},
		"application/pls+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["pls"]
		},
		"application/poc-settings+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/postscript": {
			source: "iana",
			compressible: !0,
			extensions: [
				"ai",
				"eps",
				"ps"
			]
		},
		"application/ppsp-tracker+json": {
			source: "iana",
			compressible: !0
		},
		"application/private-token-issuer-directory": { source: "iana" },
		"application/private-token-request": { source: "iana" },
		"application/private-token-response": { source: "iana" },
		"application/problem+json": {
			source: "iana",
			compressible: !0
		},
		"application/problem+xml": {
			source: "iana",
			compressible: !0
		},
		"application/provenance+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["provx"]
		},
		"application/provided-claims+jwt": { source: "iana" },
		"application/prs.alvestrand.titrax-sheet": { source: "iana" },
		"application/prs.cww": {
			source: "iana",
			extensions: ["cww"]
		},
		"application/prs.cyn": {
			source: "iana",
			charset: "7-BIT"
		},
		"application/prs.hpub+zip": {
			source: "iana",
			compressible: !1
		},
		"application/prs.implied-document+xml": {
			source: "iana",
			compressible: !0
		},
		"application/prs.implied-executable": { source: "iana" },
		"application/prs.implied-object+json": {
			source: "iana",
			compressible: !0
		},
		"application/prs.implied-object+json-seq": { source: "iana" },
		"application/prs.implied-object+yaml": { source: "iana" },
		"application/prs.implied-structure": { source: "iana" },
		"application/prs.mayfile": { source: "iana" },
		"application/prs.nprend": { source: "iana" },
		"application/prs.plucker": { source: "iana" },
		"application/prs.rdf-xml-crypt": { source: "iana" },
		"application/prs.vcfbzip2": { source: "iana" },
		"application/prs.xsf+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xsf"]
		},
		"application/pskc+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["pskcxml"]
		},
		"application/pvd+json": {
			source: "iana",
			compressible: !0
		},
		"application/qsig": { source: "iana" },
		"application/raml+yaml": {
			compressible: !0,
			extensions: ["raml"]
		},
		"application/raptorfec": { source: "iana" },
		"application/rdap+json": {
			source: "iana",
			compressible: !0
		},
		"application/rdf+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rdf", "owl"]
		},
		"application/reginfo+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rif"]
		},
		"application/relax-ng-compact-syntax": {
			source: "iana",
			extensions: ["rnc"]
		},
		"application/remote-printing": { source: "apache" },
		"application/reputon+json": {
			source: "iana",
			compressible: !0
		},
		"application/resolve-response+jwt": { source: "iana" },
		"application/resource-lists+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rl"]
		},
		"application/resource-lists-diff+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rld"]
		},
		"application/rfc+xml": {
			source: "iana",
			compressible: !0
		},
		"application/riscos": { source: "iana" },
		"application/rlmi+xml": {
			source: "iana",
			compressible: !0
		},
		"application/rls-services+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rs"]
		},
		"application/route-apd+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rapd"]
		},
		"application/route-s-tsid+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["sls"]
		},
		"application/route-usd+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rusd"]
		},
		"application/rpki-checklist": { source: "iana" },
		"application/rpki-ghostbusters": {
			source: "iana",
			extensions: ["gbr"]
		},
		"application/rpki-manifest": {
			source: "iana",
			extensions: ["mft"]
		},
		"application/rpki-publication": { source: "iana" },
		"application/rpki-roa": {
			source: "iana",
			extensions: ["roa"]
		},
		"application/rpki-signed-tal": { source: "iana" },
		"application/rpki-updown": { source: "iana" },
		"application/rsd+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["rsd"]
		},
		"application/rss+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["rss"]
		},
		"application/rtf": {
			source: "iana",
			compressible: !0,
			extensions: ["rtf"]
		},
		"application/rtploopback": { source: "iana" },
		"application/rtx": { source: "iana" },
		"application/samlassertion+xml": {
			source: "iana",
			compressible: !0
		},
		"application/samlmetadata+xml": {
			source: "iana",
			compressible: !0
		},
		"application/sarif+json": {
			source: "iana",
			compressible: !0
		},
		"application/sarif-external-properties+json": {
			source: "iana",
			compressible: !0
		},
		"application/sbe": { source: "iana" },
		"application/sbml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["sbml"]
		},
		"application/scaip+xml": {
			source: "iana",
			compressible: !0
		},
		"application/scim+json": {
			source: "iana",
			compressible: !0
		},
		"application/scvp-cv-request": {
			source: "iana",
			extensions: ["scq"]
		},
		"application/scvp-cv-response": {
			source: "iana",
			extensions: ["scs"]
		},
		"application/scvp-vp-request": {
			source: "iana",
			extensions: ["spq"]
		},
		"application/scvp-vp-response": {
			source: "iana",
			extensions: ["spp"]
		},
		"application/sdp": {
			source: "iana",
			extensions: ["sdp"]
		},
		"application/secevent+jwt": { source: "iana" },
		"application/senml+cbor": { source: "iana" },
		"application/senml+json": {
			source: "iana",
			compressible: !0
		},
		"application/senml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["senmlx"]
		},
		"application/senml-etch+cbor": { source: "iana" },
		"application/senml-etch+json": {
			source: "iana",
			compressible: !0
		},
		"application/senml-exi": { source: "iana" },
		"application/sensml+cbor": { source: "iana" },
		"application/sensml+json": {
			source: "iana",
			compressible: !0
		},
		"application/sensml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["sensmlx"]
		},
		"application/sensml-exi": { source: "iana" },
		"application/sep+xml": {
			source: "iana",
			compressible: !0
		},
		"application/sep-exi": { source: "iana" },
		"application/session-info": { source: "iana" },
		"application/set-payment": { source: "iana" },
		"application/set-payment-initiation": {
			source: "iana",
			extensions: ["setpay"]
		},
		"application/set-registration": { source: "iana" },
		"application/set-registration-initiation": {
			source: "iana",
			extensions: ["setreg"]
		},
		"application/sgml": { source: "iana" },
		"application/sgml-open-catalog": { source: "iana" },
		"application/shf+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["shf"]
		},
		"application/sieve": {
			source: "iana",
			extensions: ["siv", "sieve"]
		},
		"application/simple-filter+xml": {
			source: "iana",
			compressible: !0
		},
		"application/simple-message-summary": { source: "iana" },
		"application/simplesymbolcontainer": { source: "iana" },
		"application/sipc": { source: "iana" },
		"application/slate": { source: "iana" },
		"application/smil": { source: "apache" },
		"application/smil+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["smi", "smil"]
		},
		"application/smpte336m": { source: "iana" },
		"application/soap+fastinfoset": { source: "iana" },
		"application/soap+xml": {
			source: "iana",
			compressible: !0
		},
		"application/sparql-query": {
			source: "iana",
			extensions: ["rq"]
		},
		"application/sparql-results+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["srx"]
		},
		"application/spdx+json": {
			source: "iana",
			compressible: !0
		},
		"application/spirits-event+xml": {
			source: "iana",
			compressible: !0
		},
		"application/sql": {
			source: "iana",
			extensions: ["sql"]
		},
		"application/srgs": {
			source: "iana",
			extensions: ["gram"]
		},
		"application/srgs+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["grxml"]
		},
		"application/sru+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["sru"]
		},
		"application/ssdl+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["ssdl"]
		},
		"application/sslkeylogfile": { source: "iana" },
		"application/ssml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["ssml"]
		},
		"application/st2110-41": { source: "iana" },
		"application/stix+json": {
			source: "iana",
			compressible: !0
		},
		"application/stratum": { source: "iana" },
		"application/swid+cbor": { source: "iana" },
		"application/swid+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["swidtag"]
		},
		"application/tamp-apex-update": { source: "iana" },
		"application/tamp-apex-update-confirm": { source: "iana" },
		"application/tamp-community-update": { source: "iana" },
		"application/tamp-community-update-confirm": { source: "iana" },
		"application/tamp-error": { source: "iana" },
		"application/tamp-sequence-adjust": { source: "iana" },
		"application/tamp-sequence-adjust-confirm": { source: "iana" },
		"application/tamp-status-query": { source: "iana" },
		"application/tamp-status-response": { source: "iana" },
		"application/tamp-update": { source: "iana" },
		"application/tamp-update-confirm": { source: "iana" },
		"application/tar": { compressible: !0 },
		"application/taxii+json": {
			source: "iana",
			compressible: !0
		},
		"application/td+json": {
			source: "iana",
			compressible: !0
		},
		"application/tei+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["tei", "teicorpus"]
		},
		"application/tetra_isi": { source: "iana" },
		"application/thraud+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["tfi"]
		},
		"application/timestamp-query": { source: "iana" },
		"application/timestamp-reply": { source: "iana" },
		"application/timestamped-data": {
			source: "iana",
			extensions: ["tsd"]
		},
		"application/tlsrpt+gzip": { source: "iana" },
		"application/tlsrpt+json": {
			source: "iana",
			compressible: !0
		},
		"application/tm+json": {
			source: "iana",
			compressible: !0
		},
		"application/tnauthlist": { source: "iana" },
		"application/toc+cbor": { source: "iana" },
		"application/token-introspection+jwt": { source: "iana" },
		"application/toml": {
			source: "iana",
			compressible: !0,
			extensions: ["toml"]
		},
		"application/trickle-ice-sdpfrag": { source: "iana" },
		"application/trig": {
			source: "iana",
			extensions: ["trig"]
		},
		"application/trust-chain+json": {
			source: "iana",
			compressible: !0
		},
		"application/trust-mark+jwt": { source: "iana" },
		"application/trust-mark-delegation+jwt": { source: "iana" },
		"application/ttml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["ttml"]
		},
		"application/tve-trigger": { source: "iana" },
		"application/tzif": { source: "iana" },
		"application/tzif-leap": { source: "iana" },
		"application/ubjson": {
			compressible: !1,
			extensions: ["ubj"]
		},
		"application/uccs+cbor": { source: "iana" },
		"application/ujcs+json": {
			source: "iana",
			compressible: !0
		},
		"application/ulpfec": { source: "iana" },
		"application/urc-grpsheet+xml": {
			source: "iana",
			compressible: !0
		},
		"application/urc-ressheet+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["rsheet"]
		},
		"application/urc-targetdesc+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["td"]
		},
		"application/urc-uisocketdesc+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vc": { source: "iana" },
		"application/vc+cose": { source: "iana" },
		"application/vc+jwt": { source: "iana" },
		"application/vcard+json": {
			source: "iana",
			compressible: !0
		},
		"application/vcard+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vemmi": { source: "iana" },
		"application/vividence.scriptfile": { source: "apache" },
		"application/vnd.1000minds.decision-model+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["1km"]
		},
		"application/vnd.1ob": { source: "iana" },
		"application/vnd.3gpp-prose+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp-prose-pc3a+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp-prose-pc3ach+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp-prose-pc3ch+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp-prose-pc8+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp-v2x-local-service-information": { source: "iana" },
		"application/vnd.3gpp.5gnas": { source: "iana" },
		"application/vnd.3gpp.5gsa2x": { source: "iana" },
		"application/vnd.3gpp.5gsa2x-local-service-information": { source: "iana" },
		"application/vnd.3gpp.5gsv2x": { source: "iana" },
		"application/vnd.3gpp.5gsv2x-local-service-information": { source: "iana" },
		"application/vnd.3gpp.access-transfer-events+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.bsf+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.crs+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.current-location-discovery+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.gmop+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.gtpc": { source: "iana" },
		"application/vnd.3gpp.interworking-data": { source: "iana" },
		"application/vnd.3gpp.lpp": { source: "iana" },
		"application/vnd.3gpp.mc-signalling-ear": { source: "iana" },
		"application/vnd.3gpp.mcdata-affiliation-command+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcdata-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcdata-msgstore-ctrl-request+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcdata-payload": { source: "iana" },
		"application/vnd.3gpp.mcdata-regroup+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcdata-service-config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcdata-signalling": { source: "iana" },
		"application/vnd.3gpp.mcdata-ue-config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcdata-user-profile+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-affiliation-command+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-floor-request+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-location-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-regroup+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-service-config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-signed+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-ue-config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-ue-init-config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcptt-user-profile+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-affiliation-command+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-location-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-regroup+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-service-config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-transmission-request+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-ue-config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mcvideo-user-profile+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.mid-call+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.ngap": { source: "iana" },
		"application/vnd.3gpp.pfcp": { source: "iana" },
		"application/vnd.3gpp.pic-bw-large": {
			source: "iana",
			extensions: ["plb"]
		},
		"application/vnd.3gpp.pic-bw-small": {
			source: "iana",
			extensions: ["psb"]
		},
		"application/vnd.3gpp.pic-bw-var": {
			source: "iana",
			extensions: ["pvb"]
		},
		"application/vnd.3gpp.pinapp-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.s1ap": { source: "iana" },
		"application/vnd.3gpp.seal-group-doc+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.seal-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.seal-location-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.seal-mbms-usage-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.seal-network-qos-management-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.seal-ue-config-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.seal-unicast-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.seal-user-profile-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.sms": { source: "iana" },
		"application/vnd.3gpp.sms+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.srvcc-ext+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.srvcc-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.state-and-event-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.ussd+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp.v2x": { source: "iana" },
		"application/vnd.3gpp.vae-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp2.bcmcsinfo+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.3gpp2.sms": { source: "iana" },
		"application/vnd.3gpp2.tcap": {
			source: "iana",
			extensions: ["tcap"]
		},
		"application/vnd.3lightssoftware.imagescal": { source: "iana" },
		"application/vnd.3m.post-it-notes": {
			source: "iana",
			extensions: ["pwn"]
		},
		"application/vnd.accpac.simply.aso": {
			source: "iana",
			extensions: ["aso"]
		},
		"application/vnd.accpac.simply.imp": {
			source: "iana",
			extensions: ["imp"]
		},
		"application/vnd.acm.addressxfer+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.acm.chatbot+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.acucobol": {
			source: "iana",
			extensions: ["acu"]
		},
		"application/vnd.acucorp": {
			source: "iana",
			extensions: ["atc", "acutc"]
		},
		"application/vnd.adobe.air-application-installer-package+zip": {
			source: "apache",
			compressible: !1,
			extensions: ["air"]
		},
		"application/vnd.adobe.flash.movie": { source: "iana" },
		"application/vnd.adobe.formscentral.fcdt": {
			source: "iana",
			extensions: ["fcdt"]
		},
		"application/vnd.adobe.fxp": {
			source: "iana",
			extensions: ["fxp", "fxpl"]
		},
		"application/vnd.adobe.partial-upload": { source: "iana" },
		"application/vnd.adobe.xdp+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xdp"]
		},
		"application/vnd.adobe.xfdf": {
			source: "apache",
			extensions: ["xfdf"]
		},
		"application/vnd.aether.imp": { source: "iana" },
		"application/vnd.afpc.afplinedata": { source: "iana" },
		"application/vnd.afpc.afplinedata-pagedef": { source: "iana" },
		"application/vnd.afpc.cmoca-cmresource": { source: "iana" },
		"application/vnd.afpc.foca-charset": { source: "iana" },
		"application/vnd.afpc.foca-codedfont": { source: "iana" },
		"application/vnd.afpc.foca-codepage": { source: "iana" },
		"application/vnd.afpc.modca": { source: "iana" },
		"application/vnd.afpc.modca-cmtable": { source: "iana" },
		"application/vnd.afpc.modca-formdef": { source: "iana" },
		"application/vnd.afpc.modca-mediummap": { source: "iana" },
		"application/vnd.afpc.modca-objectcontainer": { source: "iana" },
		"application/vnd.afpc.modca-overlay": { source: "iana" },
		"application/vnd.afpc.modca-pagesegment": { source: "iana" },
		"application/vnd.age": {
			source: "iana",
			extensions: ["age"]
		},
		"application/vnd.ah-barcode": { source: "apache" },
		"application/vnd.ahead.space": {
			source: "iana",
			extensions: ["ahead"]
		},
		"application/vnd.airzip.filesecure.azf": {
			source: "iana",
			extensions: ["azf"]
		},
		"application/vnd.airzip.filesecure.azs": {
			source: "iana",
			extensions: ["azs"]
		},
		"application/vnd.amadeus+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.amazon.ebook": {
			source: "apache",
			extensions: ["azw"]
		},
		"application/vnd.amazon.mobi8-ebook": { source: "iana" },
		"application/vnd.americandynamics.acc": {
			source: "iana",
			extensions: ["acc"]
		},
		"application/vnd.amiga.ami": {
			source: "iana",
			extensions: ["ami"]
		},
		"application/vnd.amundsen.maze+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.android.ota": { source: "iana" },
		"application/vnd.android.package-archive": {
			source: "apache",
			compressible: !1,
			extensions: ["apk"]
		},
		"application/vnd.anki": { source: "iana" },
		"application/vnd.anser-web-certificate-issue-initiation": {
			source: "iana",
			extensions: ["cii"]
		},
		"application/vnd.anser-web-funds-transfer-initiation": {
			source: "apache",
			extensions: ["fti"]
		},
		"application/vnd.antix.game-component": {
			source: "iana",
			extensions: ["atx"]
		},
		"application/vnd.apache.arrow.file": { source: "iana" },
		"application/vnd.apache.arrow.stream": { source: "iana" },
		"application/vnd.apache.parquet": { source: "iana" },
		"application/vnd.apache.thrift.binary": { source: "iana" },
		"application/vnd.apache.thrift.compact": { source: "iana" },
		"application/vnd.apache.thrift.json": { source: "iana" },
		"application/vnd.apexlang": { source: "iana" },
		"application/vnd.api+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.aplextor.warrp+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.apothekende.reservation+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.apple.installer+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["mpkg"]
		},
		"application/vnd.apple.keynote": {
			source: "iana",
			extensions: ["key"]
		},
		"application/vnd.apple.mpegurl": {
			source: "iana",
			extensions: ["m3u8"]
		},
		"application/vnd.apple.numbers": {
			source: "iana",
			extensions: ["numbers"]
		},
		"application/vnd.apple.pages": {
			source: "iana",
			extensions: ["pages"]
		},
		"application/vnd.apple.pkpass": {
			compressible: !1,
			extensions: ["pkpass"]
		},
		"application/vnd.arastra.swi": { source: "apache" },
		"application/vnd.aristanetworks.swi": {
			source: "iana",
			extensions: ["swi"]
		},
		"application/vnd.artisan+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.artsquare": { source: "iana" },
		"application/vnd.astraea-software.iota": {
			source: "iana",
			extensions: ["iota"]
		},
		"application/vnd.audiograph": {
			source: "iana",
			extensions: ["aep"]
		},
		"application/vnd.autodesk.fbx": { extensions: ["fbx"] },
		"application/vnd.autopackage": { source: "iana" },
		"application/vnd.avalon+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.avistar+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.balsamiq.bmml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["bmml"]
		},
		"application/vnd.balsamiq.bmpr": { source: "iana" },
		"application/vnd.banana-accounting": { source: "iana" },
		"application/vnd.bbf.usp.error": { source: "iana" },
		"application/vnd.bbf.usp.msg": { source: "iana" },
		"application/vnd.bbf.usp.msg+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.bekitzur-stech+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.belightsoft.lhzd+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.belightsoft.lhzl+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.bint.med-content": { source: "iana" },
		"application/vnd.biopax.rdf+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.blink-idb-value-wrapper": { source: "iana" },
		"application/vnd.blueice.multipass": {
			source: "iana",
			extensions: ["mpm"]
		},
		"application/vnd.bluetooth.ep.oob": { source: "iana" },
		"application/vnd.bluetooth.le.oob": { source: "iana" },
		"application/vnd.bmi": {
			source: "iana",
			extensions: ["bmi"]
		},
		"application/vnd.bpf": { source: "iana" },
		"application/vnd.bpf3": { source: "iana" },
		"application/vnd.businessobjects": {
			source: "iana",
			extensions: ["rep"]
		},
		"application/vnd.byu.uapi+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.bzip3": { source: "iana" },
		"application/vnd.c3voc.schedule+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.cab-jscript": { source: "iana" },
		"application/vnd.canon-cpdl": { source: "iana" },
		"application/vnd.canon-lips": { source: "iana" },
		"application/vnd.capasystems-pg+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.cendio.thinlinc.clientconf": { source: "iana" },
		"application/vnd.century-systems.tcp_stream": { source: "iana" },
		"application/vnd.chemdraw+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["cdxml"]
		},
		"application/vnd.chess-pgn": { source: "iana" },
		"application/vnd.chipnuts.karaoke-mmd": {
			source: "iana",
			extensions: ["mmd"]
		},
		"application/vnd.ciedi": { source: "iana" },
		"application/vnd.cinderella": {
			source: "iana",
			extensions: ["cdy"]
		},
		"application/vnd.cirpack.isdn-ext": { source: "iana" },
		"application/vnd.citationstyles.style+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["csl"]
		},
		"application/vnd.claymore": {
			source: "iana",
			extensions: ["cla"]
		},
		"application/vnd.cloanto.rp9": {
			source: "iana",
			extensions: ["rp9"]
		},
		"application/vnd.clonk.c4group": {
			source: "iana",
			extensions: [
				"c4g",
				"c4d",
				"c4f",
				"c4p",
				"c4u"
			]
		},
		"application/vnd.cluetrust.cartomobile-config": {
			source: "iana",
			extensions: ["c11amc"]
		},
		"application/vnd.cluetrust.cartomobile-config-pkg": {
			source: "iana",
			extensions: ["c11amz"]
		},
		"application/vnd.cncf.helm.chart.content.v1.tar+gzip": { source: "iana" },
		"application/vnd.cncf.helm.chart.provenance.v1.prov": { source: "iana" },
		"application/vnd.cncf.helm.config.v1+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.coffeescript": { source: "iana" },
		"application/vnd.collabio.xodocuments.document": { source: "iana" },
		"application/vnd.collabio.xodocuments.document-template": { source: "iana" },
		"application/vnd.collabio.xodocuments.presentation": { source: "iana" },
		"application/vnd.collabio.xodocuments.presentation-template": { source: "iana" },
		"application/vnd.collabio.xodocuments.spreadsheet": { source: "iana" },
		"application/vnd.collabio.xodocuments.spreadsheet-template": { source: "iana" },
		"application/vnd.collection+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.collection.doc+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.collection.next+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.comicbook+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.comicbook-rar": { source: "iana" },
		"application/vnd.commerce-battelle": { source: "iana" },
		"application/vnd.commonspace": {
			source: "iana",
			extensions: ["csp"]
		},
		"application/vnd.contact.cmsg": {
			source: "iana",
			extensions: ["cdbcmsg"]
		},
		"application/vnd.coreos.ignition+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.cosmocaller": {
			source: "iana",
			extensions: ["cmc"]
		},
		"application/vnd.crick.clicker": {
			source: "iana",
			extensions: ["clkx"]
		},
		"application/vnd.crick.clicker.keyboard": {
			source: "iana",
			extensions: ["clkk"]
		},
		"application/vnd.crick.clicker.palette": {
			source: "iana",
			extensions: ["clkp"]
		},
		"application/vnd.crick.clicker.template": {
			source: "iana",
			extensions: ["clkt"]
		},
		"application/vnd.crick.clicker.wordbank": {
			source: "iana",
			extensions: ["clkw"]
		},
		"application/vnd.criticaltools.wbs+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["wbs"]
		},
		"application/vnd.cryptii.pipe+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.crypto-shade-file": { source: "iana" },
		"application/vnd.cryptomator.encrypted": { source: "iana" },
		"application/vnd.cryptomator.vault": { source: "iana" },
		"application/vnd.ctc-posml": {
			source: "iana",
			extensions: ["pml"]
		},
		"application/vnd.ctct.ws+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.cups-pdf": { source: "iana" },
		"application/vnd.cups-postscript": { source: "iana" },
		"application/vnd.cups-ppd": {
			source: "iana",
			extensions: ["ppd"]
		},
		"application/vnd.cups-raster": { source: "iana" },
		"application/vnd.cups-raw": { source: "iana" },
		"application/vnd.curl": { source: "iana" },
		"application/vnd.curl.car": {
			source: "apache",
			extensions: ["car"]
		},
		"application/vnd.curl.pcurl": {
			source: "apache",
			extensions: ["pcurl"]
		},
		"application/vnd.cyan.dean.root+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.cybank": { source: "iana" },
		"application/vnd.cyclonedx+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.cyclonedx+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.d2l.coursepackage1p0+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.d3m-dataset": { source: "iana" },
		"application/vnd.d3m-problem": { source: "iana" },
		"application/vnd.dart": {
			source: "iana",
			compressible: !0,
			extensions: ["dart"]
		},
		"application/vnd.data-vision.rdz": {
			source: "iana",
			extensions: ["rdz"]
		},
		"application/vnd.datalog": { source: "iana" },
		"application/vnd.datapackage+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dataresource+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dbf": {
			source: "iana",
			extensions: ["dbf"]
		},
		"application/vnd.dcmp+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["dcmp"]
		},
		"application/vnd.debian.binary-package": { source: "iana" },
		"application/vnd.dece.data": {
			source: "iana",
			extensions: [
				"uvf",
				"uvvf",
				"uvd",
				"uvvd"
			]
		},
		"application/vnd.dece.ttml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["uvt", "uvvt"]
		},
		"application/vnd.dece.unspecified": {
			source: "iana",
			extensions: ["uvx", "uvvx"]
		},
		"application/vnd.dece.zip": {
			source: "iana",
			extensions: ["uvz", "uvvz"]
		},
		"application/vnd.denovo.fcselayout-link": {
			source: "iana",
			extensions: ["fe_launch"]
		},
		"application/vnd.desmume.movie": { source: "iana" },
		"application/vnd.dir-bi.plate-dl-nosuffix": { source: "iana" },
		"application/vnd.dm.delegation+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dna": {
			source: "iana",
			extensions: ["dna"]
		},
		"application/vnd.document+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dolby.mlp": {
			source: "apache",
			extensions: ["mlp"]
		},
		"application/vnd.dolby.mobile.1": { source: "iana" },
		"application/vnd.dolby.mobile.2": { source: "iana" },
		"application/vnd.doremir.scorecloud-binary-document": { source: "iana" },
		"application/vnd.dpgraph": {
			source: "iana",
			extensions: ["dpg"]
		},
		"application/vnd.dreamfactory": {
			source: "iana",
			extensions: ["dfac"]
		},
		"application/vnd.drive+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ds-keypoint": {
			source: "apache",
			extensions: ["kpxx"]
		},
		"application/vnd.dtg.local": { source: "iana" },
		"application/vnd.dtg.local.flash": { source: "iana" },
		"application/vnd.dtg.local.html": { source: "iana" },
		"application/vnd.dvb.ait": {
			source: "iana",
			extensions: ["ait"]
		},
		"application/vnd.dvb.dvbisl+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.dvbj": { source: "iana" },
		"application/vnd.dvb.esgcontainer": { source: "iana" },
		"application/vnd.dvb.ipdcdftnotifaccess": { source: "iana" },
		"application/vnd.dvb.ipdcesgaccess": { source: "iana" },
		"application/vnd.dvb.ipdcesgaccess2": { source: "iana" },
		"application/vnd.dvb.ipdcesgpdd": { source: "iana" },
		"application/vnd.dvb.ipdcroaming": { source: "iana" },
		"application/vnd.dvb.iptv.alfec-base": { source: "iana" },
		"application/vnd.dvb.iptv.alfec-enhancement": { source: "iana" },
		"application/vnd.dvb.notif-aggregate-root+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.notif-container+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.notif-generic+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.notif-ia-msglist+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.notif-ia-registration-request+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.notif-ia-registration-response+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.notif-init+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.dvb.pfr": { source: "iana" },
		"application/vnd.dvb.service": {
			source: "iana",
			extensions: ["svc"]
		},
		"application/vnd.dxr": { source: "iana" },
		"application/vnd.dynageo": {
			source: "iana",
			extensions: ["geo"]
		},
		"application/vnd.dzr": { source: "iana" },
		"application/vnd.easykaraoke.cdgdownload": { source: "iana" },
		"application/vnd.ecdis-update": { source: "iana" },
		"application/vnd.ecip.rlp": { source: "iana" },
		"application/vnd.eclipse.ditto+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ecowin.chart": {
			source: "iana",
			extensions: ["mag"]
		},
		"application/vnd.ecowin.filerequest": { source: "iana" },
		"application/vnd.ecowin.fileupdate": { source: "iana" },
		"application/vnd.ecowin.series": { source: "iana" },
		"application/vnd.ecowin.seriesrequest": { source: "iana" },
		"application/vnd.ecowin.seriesupdate": { source: "iana" },
		"application/vnd.efi.img": { source: "iana" },
		"application/vnd.efi.iso": { source: "iana" },
		"application/vnd.eln+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.emclient.accessrequest+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.enliven": {
			source: "iana",
			extensions: ["nml"]
		},
		"application/vnd.enphase.envoy": { source: "iana" },
		"application/vnd.eprints.data+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.epson.esf": {
			source: "iana",
			extensions: ["esf"]
		},
		"application/vnd.epson.msf": {
			source: "iana",
			extensions: ["msf"]
		},
		"application/vnd.epson.quickanime": {
			source: "iana",
			extensions: ["qam"]
		},
		"application/vnd.epson.salt": {
			source: "iana",
			extensions: ["slt"]
		},
		"application/vnd.epson.ssf": {
			source: "iana",
			extensions: ["ssf"]
		},
		"application/vnd.ericsson.quickcall": { source: "iana" },
		"application/vnd.erofs": { source: "iana" },
		"application/vnd.espass-espass+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.eszigno3+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["es3", "et3"]
		},
		"application/vnd.etsi.aoc+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.asic-e+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.etsi.asic-s+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.etsi.cug+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvcommand+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvdiscovery+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvprofile+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvsad-bc+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvsad-cod+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvsad-npvr+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvservice+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvsync+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.iptvueprofile+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.mcid+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.mheg5": { source: "iana" },
		"application/vnd.etsi.overload-control-policy-dataset+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.pstn+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.sci+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.simservs+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.timestamp-token": { source: "iana" },
		"application/vnd.etsi.tsl+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.etsi.tsl.der": { source: "iana" },
		"application/vnd.eu.kasparian.car+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.eudora.data": { source: "iana" },
		"application/vnd.evolv.ecig.profile": { source: "iana" },
		"application/vnd.evolv.ecig.settings": { source: "iana" },
		"application/vnd.evolv.ecig.theme": { source: "iana" },
		"application/vnd.exstream-empower+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.exstream-package": { source: "iana" },
		"application/vnd.ezpix-album": {
			source: "iana",
			extensions: ["ez2"]
		},
		"application/vnd.ezpix-package": {
			source: "iana",
			extensions: ["ez3"]
		},
		"application/vnd.f-secure.mobile": { source: "iana" },
		"application/vnd.familysearch.gedcom+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.fastcopy-disk-image": { source: "iana" },
		"application/vnd.fdf": {
			source: "apache",
			extensions: ["fdf"]
		},
		"application/vnd.fdsn.mseed": {
			source: "iana",
			extensions: ["mseed"]
		},
		"application/vnd.fdsn.seed": {
			source: "iana",
			extensions: ["seed", "dataless"]
		},
		"application/vnd.fdsn.stationxml+xml": {
			source: "iana",
			charset: "XML-BASED",
			compressible: !0
		},
		"application/vnd.ffsns": { source: "iana" },
		"application/vnd.ficlab.flb+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.filmit.zfc": { source: "iana" },
		"application/vnd.fints": { source: "iana" },
		"application/vnd.firemonkeys.cloudcell": { source: "iana" },
		"application/vnd.flographit": {
			source: "iana",
			extensions: ["gph"]
		},
		"application/vnd.fluxtime.clip": {
			source: "iana",
			extensions: ["ftc"]
		},
		"application/vnd.font-fontforge-sfd": { source: "iana" },
		"application/vnd.framemaker": {
			source: "iana",
			extensions: [
				"fm",
				"frame",
				"maker",
				"book"
			]
		},
		"application/vnd.freelog.comic": { source: "iana" },
		"application/vnd.frogans.fnc": {
			source: "apache",
			extensions: ["fnc"]
		},
		"application/vnd.frogans.ltf": {
			source: "apache",
			extensions: ["ltf"]
		},
		"application/vnd.fsc.weblaunch": {
			source: "iana",
			extensions: ["fsc"]
		},
		"application/vnd.fujifilm.fb.docuworks": { source: "iana" },
		"application/vnd.fujifilm.fb.docuworks.binder": { source: "iana" },
		"application/vnd.fujifilm.fb.docuworks.container": { source: "iana" },
		"application/vnd.fujifilm.fb.jfi+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.fujitsu.oasys": {
			source: "iana",
			extensions: ["oas"]
		},
		"application/vnd.fujitsu.oasys2": {
			source: "iana",
			extensions: ["oa2"]
		},
		"application/vnd.fujitsu.oasys3": {
			source: "iana",
			extensions: ["oa3"]
		},
		"application/vnd.fujitsu.oasysgp": {
			source: "iana",
			extensions: ["fg5"]
		},
		"application/vnd.fujitsu.oasysprs": {
			source: "iana",
			extensions: ["bh2"]
		},
		"application/vnd.fujixerox.art-ex": { source: "iana" },
		"application/vnd.fujixerox.art4": { source: "iana" },
		"application/vnd.fujixerox.ddd": {
			source: "iana",
			extensions: ["ddd"]
		},
		"application/vnd.fujixerox.docuworks": {
			source: "iana",
			extensions: ["xdw"]
		},
		"application/vnd.fujixerox.docuworks.binder": {
			source: "iana",
			extensions: ["xbd"]
		},
		"application/vnd.fujixerox.docuworks.container": { source: "iana" },
		"application/vnd.fujixerox.hbpl": { source: "iana" },
		"application/vnd.fut-misnet": { source: "iana" },
		"application/vnd.futoin+cbor": { source: "iana" },
		"application/vnd.futoin+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.fuzzysheet": {
			source: "iana",
			extensions: ["fzs"]
		},
		"application/vnd.ga4gh.passport+jwt": { source: "iana" },
		"application/vnd.genomatix.tuxedo": {
			source: "iana",
			extensions: ["txd"]
		},
		"application/vnd.genozip": { source: "iana" },
		"application/vnd.gentics.grd+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.gentoo.catmetadata+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.gentoo.ebuild": { source: "iana" },
		"application/vnd.gentoo.eclass": { source: "iana" },
		"application/vnd.gentoo.gpkg": { source: "iana" },
		"application/vnd.gentoo.manifest": { source: "iana" },
		"application/vnd.gentoo.pkgmetadata+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.gentoo.xpak": { source: "iana" },
		"application/vnd.geo+json": {
			source: "apache",
			compressible: !0
		},
		"application/vnd.geocube+xml": {
			source: "apache",
			compressible: !0
		},
		"application/vnd.geogebra.file": {
			source: "iana",
			extensions: ["ggb"]
		},
		"application/vnd.geogebra.pinboard": { source: "iana" },
		"application/vnd.geogebra.slides": {
			source: "iana",
			extensions: ["ggs"]
		},
		"application/vnd.geogebra.tool": {
			source: "iana",
			extensions: ["ggt"]
		},
		"application/vnd.geometry-explorer": {
			source: "iana",
			extensions: ["gex", "gre"]
		},
		"application/vnd.geonext": {
			source: "iana",
			extensions: ["gxt"]
		},
		"application/vnd.geoplan": {
			source: "iana",
			extensions: ["g2w"]
		},
		"application/vnd.geospace": {
			source: "iana",
			extensions: ["g3w"]
		},
		"application/vnd.gerber": { source: "iana" },
		"application/vnd.globalplatform.card-content-mgt": { source: "iana" },
		"application/vnd.globalplatform.card-content-mgt-response": { source: "iana" },
		"application/vnd.gmx": {
			source: "iana",
			extensions: ["gmx"]
		},
		"application/vnd.gnu.taler.exchange+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.gnu.taler.merchant+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.google-apps.audio": {},
		"application/vnd.google-apps.document": {
			compressible: !1,
			extensions: ["gdoc"]
		},
		"application/vnd.google-apps.drawing": {
			compressible: !1,
			extensions: ["gdraw"]
		},
		"application/vnd.google-apps.drive-sdk": { compressible: !1 },
		"application/vnd.google-apps.file": {},
		"application/vnd.google-apps.folder": { compressible: !1 },
		"application/vnd.google-apps.form": {
			compressible: !1,
			extensions: ["gform"]
		},
		"application/vnd.google-apps.fusiontable": {},
		"application/vnd.google-apps.jam": {
			compressible: !1,
			extensions: ["gjam"]
		},
		"application/vnd.google-apps.mail-layout": {},
		"application/vnd.google-apps.map": {
			compressible: !1,
			extensions: ["gmap"]
		},
		"application/vnd.google-apps.photo": {},
		"application/vnd.google-apps.presentation": {
			compressible: !1,
			extensions: ["gslides"]
		},
		"application/vnd.google-apps.script": {
			compressible: !1,
			extensions: ["gscript"]
		},
		"application/vnd.google-apps.shortcut": {},
		"application/vnd.google-apps.site": {
			compressible: !1,
			extensions: ["gsite"]
		},
		"application/vnd.google-apps.spreadsheet": {
			compressible: !1,
			extensions: ["gsheet"]
		},
		"application/vnd.google-apps.unknown": {},
		"application/vnd.google-apps.video": {},
		"application/vnd.google-earth.kml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["kml"]
		},
		"application/vnd.google-earth.kmz": {
			source: "iana",
			compressible: !1,
			extensions: ["kmz"]
		},
		"application/vnd.gov.sk.e-form+xml": {
			source: "apache",
			compressible: !0
		},
		"application/vnd.gov.sk.e-form+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.gov.sk.xmldatacontainer+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xdcf"]
		},
		"application/vnd.gpxsee.map+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.grafeq": {
			source: "iana",
			extensions: ["gqf", "gqs"]
		},
		"application/vnd.gridmp": { source: "iana" },
		"application/vnd.groove-account": {
			source: "iana",
			extensions: ["gac"]
		},
		"application/vnd.groove-help": {
			source: "iana",
			extensions: ["ghf"]
		},
		"application/vnd.groove-identity-message": {
			source: "iana",
			extensions: ["gim"]
		},
		"application/vnd.groove-injector": {
			source: "iana",
			extensions: ["grv"]
		},
		"application/vnd.groove-tool-message": {
			source: "iana",
			extensions: ["gtm"]
		},
		"application/vnd.groove-tool-template": {
			source: "iana",
			extensions: ["tpl"]
		},
		"application/vnd.groove-vcard": {
			source: "iana",
			extensions: ["vcg"]
		},
		"application/vnd.hal+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.hal+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["hal"]
		},
		"application/vnd.handheld-entertainment+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["zmm"]
		},
		"application/vnd.hbci": {
			source: "iana",
			extensions: ["hbci"]
		},
		"application/vnd.hc+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.hcl-bireports": { source: "iana" },
		"application/vnd.hdt": { source: "iana" },
		"application/vnd.heroku+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.hhe.lesson-player": {
			source: "iana",
			extensions: ["les"]
		},
		"application/vnd.hp-hpgl": {
			source: "iana",
			extensions: ["hpgl"]
		},
		"application/vnd.hp-hpid": {
			source: "iana",
			extensions: ["hpid"]
		},
		"application/vnd.hp-hps": {
			source: "iana",
			extensions: ["hps"]
		},
		"application/vnd.hp-jlyt": {
			source: "iana",
			extensions: ["jlt"]
		},
		"application/vnd.hp-pcl": {
			source: "iana",
			extensions: ["pcl"]
		},
		"application/vnd.hp-pclxl": {
			source: "iana",
			extensions: ["pclxl"]
		},
		"application/vnd.hsl": { source: "iana" },
		"application/vnd.httphone": { source: "iana" },
		"application/vnd.hydrostatix.sof-data": {
			source: "iana",
			extensions: ["sfd-hdstx"]
		},
		"application/vnd.hyper+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.hyper-item+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.hyperdrive+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.hzn-3d-crossword": { source: "iana" },
		"application/vnd.ibm.afplinedata": { source: "apache" },
		"application/vnd.ibm.electronic-media": { source: "iana" },
		"application/vnd.ibm.minipay": {
			source: "iana",
			extensions: ["mpy"]
		},
		"application/vnd.ibm.modcap": {
			source: "apache",
			extensions: [
				"afp",
				"listafp",
				"list3820"
			]
		},
		"application/vnd.ibm.rights-management": {
			source: "iana",
			extensions: ["irm"]
		},
		"application/vnd.ibm.secure-container": {
			source: "iana",
			extensions: ["sc"]
		},
		"application/vnd.iccprofile": {
			source: "iana",
			extensions: ["icc", "icm"]
		},
		"application/vnd.ieee.1905": { source: "iana" },
		"application/vnd.igloader": {
			source: "iana",
			extensions: ["igl"]
		},
		"application/vnd.imagemeter.folder+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.imagemeter.image+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.immervision-ivp": {
			source: "iana",
			extensions: ["ivp"]
		},
		"application/vnd.immervision-ivu": {
			source: "iana",
			extensions: ["ivu"]
		},
		"application/vnd.ims.imsccv1p1": { source: "iana" },
		"application/vnd.ims.imsccv1p2": { source: "iana" },
		"application/vnd.ims.imsccv1p3": { source: "iana" },
		"application/vnd.ims.lis.v2.result+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ims.lti.v2.toolconsumerprofile+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ims.lti.v2.toolproxy+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ims.lti.v2.toolproxy.id+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ims.lti.v2.toolsettings+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ims.lti.v2.toolsettings.simple+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.informedcontrol.rms+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.informix-visionary": { source: "apache" },
		"application/vnd.infotech.project": { source: "iana" },
		"application/vnd.infotech.project+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.innopath.wamp.notification": { source: "iana" },
		"application/vnd.insors.igm": {
			source: "iana",
			extensions: ["igm"]
		},
		"application/vnd.intercon.formnet": {
			source: "iana",
			extensions: ["xpw", "xpx"]
		},
		"application/vnd.intergeo": {
			source: "iana",
			extensions: ["i2g"]
		},
		"application/vnd.intertrust.digibox": { source: "iana" },
		"application/vnd.intertrust.nncp": { source: "iana" },
		"application/vnd.intu.qbo": {
			source: "iana",
			extensions: ["qbo"]
		},
		"application/vnd.intu.qfx": {
			source: "iana",
			extensions: ["qfx"]
		},
		"application/vnd.ipfs.ipns-record": { source: "iana" },
		"application/vnd.ipld.car": { source: "iana" },
		"application/vnd.ipld.dag-cbor": { source: "iana" },
		"application/vnd.ipld.dag-json": { source: "iana" },
		"application/vnd.ipld.raw": { source: "iana" },
		"application/vnd.iptc.g2.catalogitem+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.iptc.g2.conceptitem+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.iptc.g2.knowledgeitem+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.iptc.g2.newsitem+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.iptc.g2.newsmessage+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.iptc.g2.packageitem+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.iptc.g2.planningitem+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ipunplugged.rcprofile": {
			source: "iana",
			extensions: ["rcprofile"]
		},
		"application/vnd.irepository.package+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["irp"]
		},
		"application/vnd.is-xpr": {
			source: "iana",
			extensions: ["xpr"]
		},
		"application/vnd.isac.fcs": {
			source: "iana",
			extensions: ["fcs"]
		},
		"application/vnd.iso11783-10+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.jam": {
			source: "iana",
			extensions: ["jam"]
		},
		"application/vnd.japannet-directory-service": { source: "iana" },
		"application/vnd.japannet-jpnstore-wakeup": { source: "iana" },
		"application/vnd.japannet-payment-wakeup": { source: "iana" },
		"application/vnd.japannet-registration": { source: "iana" },
		"application/vnd.japannet-registration-wakeup": { source: "iana" },
		"application/vnd.japannet-setstore-wakeup": { source: "iana" },
		"application/vnd.japannet-verification": { source: "iana" },
		"application/vnd.japannet-verification-wakeup": { source: "iana" },
		"application/vnd.jcp.javame.midlet-rms": {
			source: "iana",
			extensions: ["rms"]
		},
		"application/vnd.jisp": {
			source: "iana",
			extensions: ["jisp"]
		},
		"application/vnd.joost.joda-archive": {
			source: "iana",
			extensions: ["joda"]
		},
		"application/vnd.jsk.isdn-ngn": { source: "iana" },
		"application/vnd.kahootz": {
			source: "iana",
			extensions: ["ktz", "ktr"]
		},
		"application/vnd.kde.karbon": {
			source: "iana",
			extensions: ["karbon"]
		},
		"application/vnd.kde.kchart": {
			source: "iana",
			extensions: ["chrt"]
		},
		"application/vnd.kde.kformula": {
			source: "iana",
			extensions: ["kfo"]
		},
		"application/vnd.kde.kivio": {
			source: "iana",
			extensions: ["flw"]
		},
		"application/vnd.kde.kontour": {
			source: "iana",
			extensions: ["kon"]
		},
		"application/vnd.kde.kpresenter": {
			source: "iana",
			extensions: ["kpr", "kpt"]
		},
		"application/vnd.kde.kspread": {
			source: "iana",
			extensions: ["ksp"]
		},
		"application/vnd.kde.kword": {
			source: "iana",
			extensions: ["kwd", "kwt"]
		},
		"application/vnd.kdl": { source: "iana" },
		"application/vnd.kenameaapp": {
			source: "iana",
			extensions: ["htke"]
		},
		"application/vnd.keyman.kmp+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.keyman.kmx": { source: "iana" },
		"application/vnd.kidspiration": {
			source: "iana",
			extensions: ["kia"]
		},
		"application/vnd.kinar": {
			source: "iana",
			extensions: ["kne", "knp"]
		},
		"application/vnd.koan": {
			source: "iana",
			extensions: [
				"skp",
				"skd",
				"skt",
				"skm"
			]
		},
		"application/vnd.kodak-descriptor": {
			source: "iana",
			extensions: ["sse"]
		},
		"application/vnd.las": { source: "iana" },
		"application/vnd.las.las+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.las.las+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["lasxml"]
		},
		"application/vnd.laszip": { source: "iana" },
		"application/vnd.ldev.productlicensing": { source: "iana" },
		"application/vnd.leap+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.liberty-request+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.llamagraphics.life-balance.desktop": {
			source: "iana",
			extensions: ["lbd"]
		},
		"application/vnd.llamagraphics.life-balance.exchange+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["lbe"]
		},
		"application/vnd.logipipe.circuit+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.loom": { source: "iana" },
		"application/vnd.lotus-1-2-3": {
			source: "iana",
			extensions: ["123"]
		},
		"application/vnd.lotus-approach": {
			source: "iana",
			extensions: ["apr"]
		},
		"application/vnd.lotus-freelance": {
			source: "iana",
			extensions: ["pre"]
		},
		"application/vnd.lotus-notes": {
			source: "iana",
			extensions: ["nsf"]
		},
		"application/vnd.lotus-organizer": {
			source: "iana",
			extensions: ["org"]
		},
		"application/vnd.lotus-screencam": {
			source: "iana",
			extensions: ["scm"]
		},
		"application/vnd.lotus-wordpro": {
			source: "iana",
			extensions: ["lwp"]
		},
		"application/vnd.macports.portpkg": {
			source: "iana",
			extensions: ["portpkg"]
		},
		"application/vnd.mapbox-vector-tile": {
			source: "iana",
			extensions: ["mvt"]
		},
		"application/vnd.marlin.drm.actiontoken+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.marlin.drm.conftoken+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.marlin.drm.license+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.marlin.drm.mdcf": { source: "iana" },
		"application/vnd.mason+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.maxar.archive.3tz+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.maxmind.maxmind-db": { source: "iana" },
		"application/vnd.mcd": {
			source: "iana",
			extensions: ["mcd"]
		},
		"application/vnd.mdl": { source: "iana" },
		"application/vnd.mdl-mbsdf": { source: "iana" },
		"application/vnd.medcalcdata": {
			source: "iana",
			extensions: ["mc1"]
		},
		"application/vnd.mediastation.cdkey": {
			source: "iana",
			extensions: ["cdkey"]
		},
		"application/vnd.medicalholodeck.recordxr": { source: "iana" },
		"application/vnd.meridian-slingshot": { source: "iana" },
		"application/vnd.mermaid": { source: "iana" },
		"application/vnd.mfer": {
			source: "iana",
			extensions: ["mwf"]
		},
		"application/vnd.mfmp": {
			source: "iana",
			extensions: ["mfm"]
		},
		"application/vnd.micro+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.micrografx.flo": {
			source: "iana",
			extensions: ["flo"]
		},
		"application/vnd.micrografx.igx": {
			source: "iana",
			extensions: ["igx"]
		},
		"application/vnd.microsoft.portable-executable": { source: "iana" },
		"application/vnd.microsoft.windows.thumbnail-cache": { source: "iana" },
		"application/vnd.miele+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.mif": {
			source: "iana",
			extensions: ["mif"]
		},
		"application/vnd.minisoft-hp3000-save": { source: "iana" },
		"application/vnd.mitsubishi.misty-guard.trustweb": { source: "iana" },
		"application/vnd.mobius.daf": {
			source: "iana",
			extensions: ["daf"]
		},
		"application/vnd.mobius.dis": {
			source: "iana",
			extensions: ["dis"]
		},
		"application/vnd.mobius.mbk": {
			source: "iana",
			extensions: ["mbk"]
		},
		"application/vnd.mobius.mqy": {
			source: "iana",
			extensions: ["mqy"]
		},
		"application/vnd.mobius.msl": {
			source: "iana",
			extensions: ["msl"]
		},
		"application/vnd.mobius.plc": {
			source: "iana",
			extensions: ["plc"]
		},
		"application/vnd.mobius.txf": {
			source: "iana",
			extensions: ["txf"]
		},
		"application/vnd.modl": { source: "iana" },
		"application/vnd.mophun.application": {
			source: "iana",
			extensions: ["mpn"]
		},
		"application/vnd.mophun.certificate": {
			source: "iana",
			extensions: ["mpc"]
		},
		"application/vnd.motorola.flexsuite": { source: "iana" },
		"application/vnd.motorola.flexsuite.adsi": { source: "iana" },
		"application/vnd.motorola.flexsuite.fis": { source: "iana" },
		"application/vnd.motorola.flexsuite.gotap": { source: "iana" },
		"application/vnd.motorola.flexsuite.kmr": { source: "iana" },
		"application/vnd.motorola.flexsuite.ttc": { source: "iana" },
		"application/vnd.motorola.flexsuite.wem": { source: "iana" },
		"application/vnd.motorola.iprm": { source: "iana" },
		"application/vnd.mozilla.xul+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xul"]
		},
		"application/vnd.ms-3mfdocument": { source: "iana" },
		"application/vnd.ms-artgalry": {
			source: "iana",
			extensions: ["cil"]
		},
		"application/vnd.ms-asf": { source: "iana" },
		"application/vnd.ms-cab-compressed": {
			source: "iana",
			extensions: ["cab"]
		},
		"application/vnd.ms-color.iccprofile": { source: "apache" },
		"application/vnd.ms-excel": {
			source: "iana",
			compressible: !1,
			extensions: [
				"xls",
				"xlm",
				"xla",
				"xlc",
				"xlt",
				"xlw"
			]
		},
		"application/vnd.ms-excel.addin.macroenabled.12": {
			source: "iana",
			extensions: ["xlam"]
		},
		"application/vnd.ms-excel.sheet.binary.macroenabled.12": {
			source: "iana",
			extensions: ["xlsb"]
		},
		"application/vnd.ms-excel.sheet.macroenabled.12": {
			source: "iana",
			extensions: ["xlsm"]
		},
		"application/vnd.ms-excel.template.macroenabled.12": {
			source: "iana",
			extensions: ["xltm"]
		},
		"application/vnd.ms-fontobject": {
			source: "iana",
			compressible: !0,
			extensions: ["eot"]
		},
		"application/vnd.ms-htmlhelp": {
			source: "iana",
			extensions: ["chm"]
		},
		"application/vnd.ms-ims": {
			source: "iana",
			extensions: ["ims"]
		},
		"application/vnd.ms-lrm": {
			source: "iana",
			extensions: ["lrm"]
		},
		"application/vnd.ms-office.activex+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ms-officetheme": {
			source: "iana",
			extensions: ["thmx"]
		},
		"application/vnd.ms-opentype": {
			source: "apache",
			compressible: !0
		},
		"application/vnd.ms-outlook": {
			compressible: !1,
			extensions: ["msg"]
		},
		"application/vnd.ms-package.obfuscated-opentype": { source: "apache" },
		"application/vnd.ms-pki.seccat": {
			source: "apache",
			extensions: ["cat"]
		},
		"application/vnd.ms-pki.stl": {
			source: "apache",
			extensions: ["stl"]
		},
		"application/vnd.ms-playready.initiator+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ms-powerpoint": {
			source: "iana",
			compressible: !1,
			extensions: [
				"ppt",
				"pps",
				"pot"
			]
		},
		"application/vnd.ms-powerpoint.addin.macroenabled.12": {
			source: "iana",
			extensions: ["ppam"]
		},
		"application/vnd.ms-powerpoint.presentation.macroenabled.12": {
			source: "iana",
			extensions: ["pptm"]
		},
		"application/vnd.ms-powerpoint.slide.macroenabled.12": {
			source: "iana",
			extensions: ["sldm"]
		},
		"application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
			source: "iana",
			extensions: ["ppsm"]
		},
		"application/vnd.ms-powerpoint.template.macroenabled.12": {
			source: "iana",
			extensions: ["potm"]
		},
		"application/vnd.ms-printdevicecapabilities+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ms-printing.printticket+xml": {
			source: "apache",
			compressible: !0
		},
		"application/vnd.ms-printschematicket+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.ms-project": {
			source: "iana",
			extensions: ["mpp", "mpt"]
		},
		"application/vnd.ms-tnef": { source: "iana" },
		"application/vnd.ms-visio.viewer": { extensions: ["vdx"] },
		"application/vnd.ms-windows.devicepairing": { source: "iana" },
		"application/vnd.ms-windows.nwprinting.oob": { source: "iana" },
		"application/vnd.ms-windows.printerpairing": { source: "iana" },
		"application/vnd.ms-windows.wsd.oob": { source: "iana" },
		"application/vnd.ms-wmdrm.lic-chlg-req": { source: "iana" },
		"application/vnd.ms-wmdrm.lic-resp": { source: "iana" },
		"application/vnd.ms-wmdrm.meter-chlg-req": { source: "iana" },
		"application/vnd.ms-wmdrm.meter-resp": { source: "iana" },
		"application/vnd.ms-word.document.macroenabled.12": {
			source: "iana",
			extensions: ["docm"]
		},
		"application/vnd.ms-word.template.macroenabled.12": {
			source: "iana",
			extensions: ["dotm"]
		},
		"application/vnd.ms-works": {
			source: "iana",
			extensions: [
				"wps",
				"wks",
				"wcm",
				"wdb"
			]
		},
		"application/vnd.ms-wpl": {
			source: "iana",
			extensions: ["wpl"]
		},
		"application/vnd.ms-xpsdocument": {
			source: "iana",
			compressible: !1,
			extensions: ["xps"]
		},
		"application/vnd.msa-disk-image": { source: "iana" },
		"application/vnd.mseq": {
			source: "iana",
			extensions: ["mseq"]
		},
		"application/vnd.msgpack": { source: "iana" },
		"application/vnd.msign": { source: "iana" },
		"application/vnd.multiad.creator": { source: "iana" },
		"application/vnd.multiad.creator.cif": { source: "iana" },
		"application/vnd.music-niff": { source: "iana" },
		"application/vnd.musician": {
			source: "iana",
			extensions: ["mus"]
		},
		"application/vnd.muvee.style": {
			source: "iana",
			extensions: ["msty"]
		},
		"application/vnd.mynfc": {
			source: "iana",
			extensions: ["taglet"]
		},
		"application/vnd.nacamar.ybrid+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.nato.bindingdataobject+cbor": { source: "iana" },
		"application/vnd.nato.bindingdataobject+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.nato.bindingdataobject+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["bdo"]
		},
		"application/vnd.nato.openxmlformats-package.iepd+zip": {
			source: "iana",
			compressible: !1
		},
		"application/vnd.ncd.control": { source: "iana" },
		"application/vnd.ncd.reference": { source: "iana" },
		"application/vnd.nearst.inv+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.nebumind.line": { source: "iana" },
		"application/vnd.nervana": { source: "iana" },
		"application/vnd.netfpx": { source: "iana" },
		"application/vnd.neurolanguage.nlu": {
			source: "iana",
			extensions: ["nlu"]
		},
		"application/vnd.nimn": { source: "iana" },
		"application/vnd.nintendo.nitro.rom": { source: "iana" },
		"application/vnd.nintendo.snes.rom": { source: "iana" },
		"application/vnd.nitf": {
			source: "iana",
			extensions: ["ntf", "nitf"]
		},
		"application/vnd.noblenet-directory": {
			source: "iana",
			extensions: ["nnd"]
		},
		"application/vnd.noblenet-sealer": {
			source: "iana",
			extensions: ["nns"]
		},
		"application/vnd.noblenet-web": {
			source: "iana",
			extensions: ["nnw"]
		},
		"application/vnd.nokia.catalogs": { source: "iana" },
		"application/vnd.nokia.conml+wbxml": { source: "iana" },
		"application/vnd.nokia.conml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.nokia.iptv.config+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.nokia.isds-radio-presets": { source: "iana" },
		"application/vnd.nokia.landmark+wbxml": { source: "iana" },
		"application/vnd.nokia.landmark+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.nokia.landmarkcollection+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.nokia.n-gage.ac+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["ac"]
		},
		"application/vnd.nokia.n-gage.data": {
			source: "iana",
			extensions: ["ngdat"]
		},
		"application/vnd.nokia.n-gage.symbian.install": {
			source: "apache",
			extensions: ["n-gage"]
		},
		"application/vnd.nokia.ncd": { source: "iana" },
		"application/vnd.nokia.pcd+wbxml": { source: "iana" },
		"application/vnd.nokia.pcd+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.nokia.radio-preset": {
			source: "iana",
			extensions: ["rpst"]
		},
		"application/vnd.nokia.radio-presets": {
			source: "iana",
			extensions: ["rpss"]
		},
		"application/vnd.novadigm.edm": {
			source: "iana",
			extensions: ["edm"]
		},
		"application/vnd.novadigm.edx": {
			source: "iana",
			extensions: ["edx"]
		},
		"application/vnd.novadigm.ext": {
			source: "iana",
			extensions: ["ext"]
		},
		"application/vnd.ntt-local.content-share": { source: "iana" },
		"application/vnd.ntt-local.file-transfer": { source: "iana" },
		"application/vnd.ntt-local.ogw_remote-access": { source: "iana" },
		"application/vnd.ntt-local.sip-ta_remote": { source: "iana" },
		"application/vnd.ntt-local.sip-ta_tcp_stream": { source: "iana" },
		"application/vnd.oai.workflows": { source: "iana" },
		"application/vnd.oai.workflows+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oai.workflows+yaml": { source: "iana" },
		"application/vnd.oasis.opendocument.base": { source: "iana" },
		"application/vnd.oasis.opendocument.chart": {
			source: "iana",
			extensions: ["odc"]
		},
		"application/vnd.oasis.opendocument.chart-template": {
			source: "iana",
			extensions: ["otc"]
		},
		"application/vnd.oasis.opendocument.database": {
			source: "apache",
			extensions: ["odb"]
		},
		"application/vnd.oasis.opendocument.formula": {
			source: "iana",
			extensions: ["odf"]
		},
		"application/vnd.oasis.opendocument.formula-template": {
			source: "iana",
			extensions: ["odft"]
		},
		"application/vnd.oasis.opendocument.graphics": {
			source: "iana",
			compressible: !1,
			extensions: ["odg"]
		},
		"application/vnd.oasis.opendocument.graphics-template": {
			source: "iana",
			extensions: ["otg"]
		},
		"application/vnd.oasis.opendocument.image": {
			source: "iana",
			extensions: ["odi"]
		},
		"application/vnd.oasis.opendocument.image-template": {
			source: "iana",
			extensions: ["oti"]
		},
		"application/vnd.oasis.opendocument.presentation": {
			source: "iana",
			compressible: !1,
			extensions: ["odp"]
		},
		"application/vnd.oasis.opendocument.presentation-template": {
			source: "iana",
			extensions: ["otp"]
		},
		"application/vnd.oasis.opendocument.spreadsheet": {
			source: "iana",
			compressible: !1,
			extensions: ["ods"]
		},
		"application/vnd.oasis.opendocument.spreadsheet-template": {
			source: "iana",
			extensions: ["ots"]
		},
		"application/vnd.oasis.opendocument.text": {
			source: "iana",
			compressible: !1,
			extensions: ["odt"]
		},
		"application/vnd.oasis.opendocument.text-master": {
			source: "iana",
			extensions: ["odm"]
		},
		"application/vnd.oasis.opendocument.text-master-template": { source: "iana" },
		"application/vnd.oasis.opendocument.text-template": {
			source: "iana",
			extensions: ["ott"]
		},
		"application/vnd.oasis.opendocument.text-web": {
			source: "iana",
			extensions: ["oth"]
		},
		"application/vnd.obn": { source: "iana" },
		"application/vnd.ocf+cbor": { source: "iana" },
		"application/vnd.oci.image.manifest.v1+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oftn.l10n+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.contentaccessdownload+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.contentaccessstreaming+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.cspg-hexbinary": { source: "iana" },
		"application/vnd.oipf.dae.svg+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.dae.xhtml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.mippvcontrolmessage+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.pae.gem": { source: "iana" },
		"application/vnd.oipf.spdiscovery+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.spdlist+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.ueprofile+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oipf.userprofile+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.olpc-sugar": {
			source: "iana",
			extensions: ["xo"]
		},
		"application/vnd.oma-scws-config": { source: "iana" },
		"application/vnd.oma-scws-http-request": { source: "iana" },
		"application/vnd.oma-scws-http-response": { source: "iana" },
		"application/vnd.oma.bcast.associated-procedure-parameter+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.bcast.drm-trigger+xml": {
			source: "apache",
			compressible: !0
		},
		"application/vnd.oma.bcast.imd+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.bcast.ltkm": { source: "iana" },
		"application/vnd.oma.bcast.notification+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.bcast.provisioningtrigger": { source: "iana" },
		"application/vnd.oma.bcast.sgboot": { source: "iana" },
		"application/vnd.oma.bcast.sgdd+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.bcast.sgdu": { source: "iana" },
		"application/vnd.oma.bcast.simple-symbol-container": { source: "iana" },
		"application/vnd.oma.bcast.smartcard-trigger+xml": {
			source: "apache",
			compressible: !0
		},
		"application/vnd.oma.bcast.sprov+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.bcast.stkm": { source: "iana" },
		"application/vnd.oma.cab-address-book+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.cab-feature-handler+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.cab-pcc+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.cab-subs-invite+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.cab-user-prefs+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.dcd": { source: "iana" },
		"application/vnd.oma.dcdc": { source: "iana" },
		"application/vnd.oma.dd2+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["dd2"]
		},
		"application/vnd.oma.drm.risd+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.group-usage-list+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.lwm2m+cbor": { source: "iana" },
		"application/vnd.oma.lwm2m+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.lwm2m+tlv": { source: "iana" },
		"application/vnd.oma.pal+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.poc.detailed-progress-report+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.poc.final-report+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.poc.groups+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.poc.invocation-descriptor+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.poc.optimized-progress-report+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.push": { source: "iana" },
		"application/vnd.oma.scidm.messages+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oma.xcap-directory+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.omads-email+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/vnd.omads-file+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/vnd.omads-folder+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/vnd.omaloc-supl-init": { source: "iana" },
		"application/vnd.onepager": { source: "iana" },
		"application/vnd.onepagertamp": { source: "iana" },
		"application/vnd.onepagertamx": { source: "iana" },
		"application/vnd.onepagertat": { source: "iana" },
		"application/vnd.onepagertatp": { source: "iana" },
		"application/vnd.onepagertatx": { source: "iana" },
		"application/vnd.onvif.metadata": { source: "iana" },
		"application/vnd.openblox.game+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["obgx"]
		},
		"application/vnd.openblox.game-binary": { source: "iana" },
		"application/vnd.openeye.oeb": { source: "iana" },
		"application/vnd.openofficeorg.extension": {
			source: "apache",
			extensions: ["oxt"]
		},
		"application/vnd.openstreetmap.data+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["osm"]
		},
		"application/vnd.opentimestamps.ots": { source: "iana" },
		"application/vnd.openvpi.dspx+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.custom-properties+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.drawing+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.extended-properties+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presentation": {
			source: "iana",
			compressible: !1,
			extensions: ["pptx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slide": {
			source: "iana",
			extensions: ["sldx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
			source: "iana",
			extensions: ["ppsx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.template": {
			source: "iana",
			extensions: ["potx"]
		},
		"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
			source: "iana",
			compressible: !1,
			extensions: ["xlsx"]
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
			source: "iana",
			extensions: ["xltx"]
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.theme+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.themeoverride+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.vmldrawing": { source: "iana" },
		"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
			source: "iana",
			compressible: !1,
			extensions: ["docx"]
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
			source: "iana",
			extensions: ["dotx"]
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-package.core-properties+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.openxmlformats-package.relationships+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oracle.resource+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.orange.indata": { source: "iana" },
		"application/vnd.osa.netdeploy": { source: "iana" },
		"application/vnd.osgeo.mapguide.package": {
			source: "iana",
			extensions: ["mgp"]
		},
		"application/vnd.osgi.bundle": { source: "iana" },
		"application/vnd.osgi.dp": {
			source: "iana",
			extensions: ["dp"]
		},
		"application/vnd.osgi.subsystem": {
			source: "iana",
			extensions: ["esa"]
		},
		"application/vnd.otps.ct-kip+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.oxli.countgraph": { source: "iana" },
		"application/vnd.pagerduty+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.palm": {
			source: "iana",
			extensions: [
				"pdb",
				"pqa",
				"oprc"
			]
		},
		"application/vnd.panoply": { source: "iana" },
		"application/vnd.paos.xml": { source: "iana" },
		"application/vnd.patentdive": { source: "iana" },
		"application/vnd.patientecommsdoc": { source: "iana" },
		"application/vnd.pawaafile": {
			source: "iana",
			extensions: ["paw"]
		},
		"application/vnd.pcos": { source: "iana" },
		"application/vnd.pg.format": {
			source: "iana",
			extensions: ["str"]
		},
		"application/vnd.pg.osasli": {
			source: "iana",
			extensions: ["ei6"]
		},
		"application/vnd.piaccess.application-licence": { source: "iana" },
		"application/vnd.picsel": {
			source: "iana",
			extensions: ["efif"]
		},
		"application/vnd.pmi.widget": {
			source: "iana",
			extensions: ["wg"]
		},
		"application/vnd.poc.group-advertisement+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.pocketlearn": {
			source: "iana",
			extensions: ["plf"]
		},
		"application/vnd.powerbuilder6": {
			source: "iana",
			extensions: ["pbd"]
		},
		"application/vnd.powerbuilder6-s": { source: "iana" },
		"application/vnd.powerbuilder7": { source: "iana" },
		"application/vnd.powerbuilder7-s": { source: "iana" },
		"application/vnd.powerbuilder75": { source: "iana" },
		"application/vnd.powerbuilder75-s": { source: "iana" },
		"application/vnd.preminet": { source: "iana" },
		"application/vnd.previewsystems.box": {
			source: "iana",
			extensions: ["box"]
		},
		"application/vnd.procrate.brushset": { extensions: ["brushset"] },
		"application/vnd.procreate.brush": { extensions: ["brush"] },
		"application/vnd.procreate.dream": { extensions: ["drm"] },
		"application/vnd.proteus.magazine": {
			source: "iana",
			extensions: ["mgz"]
		},
		"application/vnd.psfs": { source: "iana" },
		"application/vnd.pt.mundusmundi": { source: "iana" },
		"application/vnd.publishare-delta-tree": {
			source: "iana",
			extensions: ["qps"]
		},
		"application/vnd.pvi.ptid1": {
			source: "iana",
			extensions: ["ptid"]
		},
		"application/vnd.pwg-multiplexed": { source: "iana" },
		"application/vnd.pwg-xhtml-print+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xhtm"]
		},
		"application/vnd.qualcomm.brew-app-res": { source: "iana" },
		"application/vnd.quarantainenet": { source: "iana" },
		"application/vnd.quark.quarkxpress": {
			source: "iana",
			extensions: [
				"qxd",
				"qxt",
				"qwd",
				"qwt",
				"qxl",
				"qxb"
			]
		},
		"application/vnd.quobject-quoxdocument": { source: "iana" },
		"application/vnd.radisys.moml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-audit+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-audit-conf+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-audit-conn+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-audit-dialog+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-audit-stream+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-conf+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-dialog+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-dialog-base+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-dialog-fax-detect+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-dialog-group+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-dialog-speech+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.radisys.msml-dialog-transform+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.rainstor.data": { source: "iana" },
		"application/vnd.rapid": { source: "iana" },
		"application/vnd.rar": {
			source: "iana",
			extensions: ["rar"]
		},
		"application/vnd.realvnc.bed": {
			source: "iana",
			extensions: ["bed"]
		},
		"application/vnd.recordare.musicxml": {
			source: "iana",
			extensions: ["mxl"]
		},
		"application/vnd.recordare.musicxml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["musicxml"]
		},
		"application/vnd.relpipe": { source: "iana" },
		"application/vnd.renlearn.rlprint": { source: "iana" },
		"application/vnd.resilient.logic": { source: "iana" },
		"application/vnd.restful+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.rig.cryptonote": {
			source: "iana",
			extensions: ["cryptonote"]
		},
		"application/vnd.rim.cod": {
			source: "apache",
			extensions: ["cod"]
		},
		"application/vnd.rn-realmedia": {
			source: "apache",
			extensions: ["rm"]
		},
		"application/vnd.rn-realmedia-vbr": {
			source: "apache",
			extensions: ["rmvb"]
		},
		"application/vnd.route66.link66+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["link66"]
		},
		"application/vnd.rs-274x": { source: "iana" },
		"application/vnd.ruckus.download": { source: "iana" },
		"application/vnd.s3sms": { source: "iana" },
		"application/vnd.sailingtracker.track": {
			source: "iana",
			extensions: ["st"]
		},
		"application/vnd.sar": { source: "iana" },
		"application/vnd.sbm.cid": { source: "iana" },
		"application/vnd.sbm.mid2": { source: "iana" },
		"application/vnd.scribus": { source: "iana" },
		"application/vnd.sealed.3df": { source: "iana" },
		"application/vnd.sealed.csf": { source: "iana" },
		"application/vnd.sealed.doc": { source: "iana" },
		"application/vnd.sealed.eml": { source: "iana" },
		"application/vnd.sealed.mht": { source: "iana" },
		"application/vnd.sealed.net": { source: "iana" },
		"application/vnd.sealed.ppt": { source: "iana" },
		"application/vnd.sealed.tiff": { source: "iana" },
		"application/vnd.sealed.xls": { source: "iana" },
		"application/vnd.sealedmedia.softseal.html": { source: "iana" },
		"application/vnd.sealedmedia.softseal.pdf": { source: "iana" },
		"application/vnd.seemail": {
			source: "iana",
			extensions: ["see"]
		},
		"application/vnd.seis+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.sema": {
			source: "iana",
			extensions: ["sema"]
		},
		"application/vnd.semd": {
			source: "iana",
			extensions: ["semd"]
		},
		"application/vnd.semf": {
			source: "iana",
			extensions: ["semf"]
		},
		"application/vnd.shade-save-file": { source: "iana" },
		"application/vnd.shana.informed.formdata": {
			source: "iana",
			extensions: ["ifm"]
		},
		"application/vnd.shana.informed.formtemplate": {
			source: "iana",
			extensions: ["itp"]
		},
		"application/vnd.shana.informed.interchange": {
			source: "iana",
			extensions: ["iif"]
		},
		"application/vnd.shana.informed.package": {
			source: "iana",
			extensions: ["ipk"]
		},
		"application/vnd.shootproof+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.shopkick+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.shp": { source: "iana" },
		"application/vnd.shx": { source: "iana" },
		"application/vnd.sigrok.session": { source: "iana" },
		"application/vnd.simtech-mindmapper": {
			source: "iana",
			extensions: ["twd", "twds"]
		},
		"application/vnd.siren+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.sketchometry": { source: "iana" },
		"application/vnd.smaf": {
			source: "iana",
			extensions: ["mmf"]
		},
		"application/vnd.smart.notebook": { source: "iana" },
		"application/vnd.smart.teacher": {
			source: "iana",
			extensions: ["teacher"]
		},
		"application/vnd.smintio.portals.archive": { source: "iana" },
		"application/vnd.snesdev-page-table": { source: "iana" },
		"application/vnd.software602.filler.form+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["fo"]
		},
		"application/vnd.software602.filler.form-xml-zip": { source: "iana" },
		"application/vnd.solent.sdkm+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["sdkm", "sdkd"]
		},
		"application/vnd.spotfire.dxp": {
			source: "iana",
			extensions: ["dxp"]
		},
		"application/vnd.spotfire.sfs": {
			source: "iana",
			extensions: ["sfs"]
		},
		"application/vnd.sqlite3": { source: "iana" },
		"application/vnd.sss-cod": { source: "iana" },
		"application/vnd.sss-dtf": { source: "iana" },
		"application/vnd.sss-ntf": { source: "iana" },
		"application/vnd.stardivision.calc": {
			source: "apache",
			extensions: ["sdc"]
		},
		"application/vnd.stardivision.draw": {
			source: "apache",
			extensions: ["sda"]
		},
		"application/vnd.stardivision.impress": {
			source: "apache",
			extensions: ["sdd"]
		},
		"application/vnd.stardivision.math": {
			source: "apache",
			extensions: ["smf"]
		},
		"application/vnd.stardivision.writer": {
			source: "apache",
			extensions: ["sdw", "vor"]
		},
		"application/vnd.stardivision.writer-global": {
			source: "apache",
			extensions: ["sgl"]
		},
		"application/vnd.stepmania.package": {
			source: "iana",
			extensions: ["smzip"]
		},
		"application/vnd.stepmania.stepchart": {
			source: "iana",
			extensions: ["sm"]
		},
		"application/vnd.street-stream": { source: "iana" },
		"application/vnd.sun.wadl+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["wadl"]
		},
		"application/vnd.sun.xml.calc": {
			source: "apache",
			extensions: ["sxc"]
		},
		"application/vnd.sun.xml.calc.template": {
			source: "apache",
			extensions: ["stc"]
		},
		"application/vnd.sun.xml.draw": {
			source: "apache",
			extensions: ["sxd"]
		},
		"application/vnd.sun.xml.draw.template": {
			source: "apache",
			extensions: ["std"]
		},
		"application/vnd.sun.xml.impress": {
			source: "apache",
			extensions: ["sxi"]
		},
		"application/vnd.sun.xml.impress.template": {
			source: "apache",
			extensions: ["sti"]
		},
		"application/vnd.sun.xml.math": {
			source: "apache",
			extensions: ["sxm"]
		},
		"application/vnd.sun.xml.writer": {
			source: "apache",
			extensions: ["sxw"]
		},
		"application/vnd.sun.xml.writer.global": {
			source: "apache",
			extensions: ["sxg"]
		},
		"application/vnd.sun.xml.writer.template": {
			source: "apache",
			extensions: ["stw"]
		},
		"application/vnd.sus-calendar": {
			source: "iana",
			extensions: ["sus", "susp"]
		},
		"application/vnd.svd": {
			source: "iana",
			extensions: ["svd"]
		},
		"application/vnd.swiftview-ics": { source: "iana" },
		"application/vnd.sybyl.mol2": { source: "iana" },
		"application/vnd.sycle+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.syft+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.symbian.install": {
			source: "apache",
			extensions: ["sis", "sisx"]
		},
		"application/vnd.syncml+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["xsm"]
		},
		"application/vnd.syncml.dm+wbxml": {
			source: "iana",
			charset: "UTF-8",
			extensions: ["bdm"]
		},
		"application/vnd.syncml.dm+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["xdm"]
		},
		"application/vnd.syncml.dm.notification": { source: "iana" },
		"application/vnd.syncml.dmddf+wbxml": { source: "iana" },
		"application/vnd.syncml.dmddf+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["ddf"]
		},
		"application/vnd.syncml.dmtnds+wbxml": { source: "iana" },
		"application/vnd.syncml.dmtnds+xml": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0
		},
		"application/vnd.syncml.ds.notification": { source: "iana" },
		"application/vnd.tableschema+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.tao.intent-module-archive": {
			source: "iana",
			extensions: ["tao"]
		},
		"application/vnd.tcpdump.pcap": {
			source: "iana",
			extensions: [
				"pcap",
				"cap",
				"dmp"
			]
		},
		"application/vnd.think-cell.ppttc+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.tmd.mediaflex.api+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.tml": { source: "iana" },
		"application/vnd.tmobile-livetv": {
			source: "iana",
			extensions: ["tmo"]
		},
		"application/vnd.tri.onesource": { source: "iana" },
		"application/vnd.trid.tpt": {
			source: "iana",
			extensions: ["tpt"]
		},
		"application/vnd.triscape.mxs": {
			source: "iana",
			extensions: ["mxs"]
		},
		"application/vnd.trueapp": {
			source: "iana",
			extensions: ["tra"]
		},
		"application/vnd.truedoc": { source: "iana" },
		"application/vnd.ubisoft.webplayer": { source: "iana" },
		"application/vnd.ufdl": {
			source: "iana",
			extensions: ["ufd", "ufdl"]
		},
		"application/vnd.uic.osdm+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.uiq.theme": {
			source: "iana",
			extensions: ["utz"]
		},
		"application/vnd.umajin": {
			source: "iana",
			extensions: ["umj"]
		},
		"application/vnd.unity": {
			source: "iana",
			extensions: ["unityweb"]
		},
		"application/vnd.uoml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["uoml", "uo"]
		},
		"application/vnd.uplanet.alert": { source: "iana" },
		"application/vnd.uplanet.alert-wbxml": { source: "iana" },
		"application/vnd.uplanet.bearer-choice": { source: "iana" },
		"application/vnd.uplanet.bearer-choice-wbxml": { source: "iana" },
		"application/vnd.uplanet.cacheop": { source: "iana" },
		"application/vnd.uplanet.cacheop-wbxml": { source: "iana" },
		"application/vnd.uplanet.channel": { source: "iana" },
		"application/vnd.uplanet.channel-wbxml": { source: "iana" },
		"application/vnd.uplanet.list": { source: "iana" },
		"application/vnd.uplanet.list-wbxml": { source: "iana" },
		"application/vnd.uplanet.listcmd": { source: "iana" },
		"application/vnd.uplanet.listcmd-wbxml": { source: "iana" },
		"application/vnd.uplanet.signal": { source: "iana" },
		"application/vnd.uri-map": { source: "iana" },
		"application/vnd.valve.source.material": { source: "iana" },
		"application/vnd.vcx": {
			source: "iana",
			extensions: ["vcx"]
		},
		"application/vnd.vd-study": { source: "iana" },
		"application/vnd.vectorworks": { source: "iana" },
		"application/vnd.vel+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.veraison.tsm-report+cbor": { source: "iana" },
		"application/vnd.veraison.tsm-report+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.verimatrix.vcas": { source: "iana" },
		"application/vnd.veritone.aion+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.veryant.thin": { source: "iana" },
		"application/vnd.ves.encrypted": { source: "iana" },
		"application/vnd.vidsoft.vidconference": { source: "iana" },
		"application/vnd.visio": {
			source: "iana",
			extensions: [
				"vsd",
				"vst",
				"vss",
				"vsw",
				"vsdx",
				"vtx"
			]
		},
		"application/vnd.visionary": {
			source: "iana",
			extensions: ["vis"]
		},
		"application/vnd.vividence.scriptfile": { source: "iana" },
		"application/vnd.vocalshaper.vsp4": { source: "iana" },
		"application/vnd.vsf": {
			source: "iana",
			extensions: ["vsf"]
		},
		"application/vnd.wap.sic": { source: "iana" },
		"application/vnd.wap.slc": { source: "iana" },
		"application/vnd.wap.wbxml": {
			source: "iana",
			charset: "UTF-8",
			extensions: ["wbxml"]
		},
		"application/vnd.wap.wmlc": {
			source: "iana",
			extensions: ["wmlc"]
		},
		"application/vnd.wap.wmlscriptc": {
			source: "iana",
			extensions: ["wmlsc"]
		},
		"application/vnd.wasmflow.wafl": { source: "iana" },
		"application/vnd.webturbo": {
			source: "iana",
			extensions: ["wtb"]
		},
		"application/vnd.wfa.dpp": { source: "iana" },
		"application/vnd.wfa.p2p": { source: "iana" },
		"application/vnd.wfa.wsc": { source: "iana" },
		"application/vnd.windows.devicepairing": { source: "iana" },
		"application/vnd.wmc": { source: "iana" },
		"application/vnd.wmf.bootstrap": { source: "iana" },
		"application/vnd.wolfram.mathematica": { source: "iana" },
		"application/vnd.wolfram.mathematica.package": { source: "iana" },
		"application/vnd.wolfram.player": {
			source: "iana",
			extensions: ["nbp"]
		},
		"application/vnd.wordlift": { source: "iana" },
		"application/vnd.wordperfect": {
			source: "iana",
			extensions: ["wpd"]
		},
		"application/vnd.wqd": {
			source: "iana",
			extensions: ["wqd"]
		},
		"application/vnd.wrq-hp3000-labelled": { source: "iana" },
		"application/vnd.wt.stf": {
			source: "iana",
			extensions: ["stf"]
		},
		"application/vnd.wv.csp+wbxml": { source: "iana" },
		"application/vnd.wv.csp+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.wv.ssp+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.xacml+json": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.xara": {
			source: "iana",
			extensions: ["xar"]
		},
		"application/vnd.xarin.cpj": { source: "iana" },
		"application/vnd.xecrets-encrypted": { source: "iana" },
		"application/vnd.xfdl": {
			source: "iana",
			extensions: ["xfdl"]
		},
		"application/vnd.xfdl.webform": { source: "iana" },
		"application/vnd.xmi+xml": {
			source: "iana",
			compressible: !0
		},
		"application/vnd.xmpie.cpkg": { source: "iana" },
		"application/vnd.xmpie.dpkg": { source: "iana" },
		"application/vnd.xmpie.plan": { source: "iana" },
		"application/vnd.xmpie.ppkg": { source: "iana" },
		"application/vnd.xmpie.xlim": { source: "iana" },
		"application/vnd.yamaha.hv-dic": {
			source: "iana",
			extensions: ["hvd"]
		},
		"application/vnd.yamaha.hv-script": {
			source: "iana",
			extensions: ["hvs"]
		},
		"application/vnd.yamaha.hv-voice": {
			source: "iana",
			extensions: ["hvp"]
		},
		"application/vnd.yamaha.openscoreformat": {
			source: "iana",
			extensions: ["osf"]
		},
		"application/vnd.yamaha.openscoreformat.osfpvg+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["osfpvg"]
		},
		"application/vnd.yamaha.remote-setup": { source: "iana" },
		"application/vnd.yamaha.smaf-audio": {
			source: "iana",
			extensions: ["saf"]
		},
		"application/vnd.yamaha.smaf-phrase": {
			source: "iana",
			extensions: ["spf"]
		},
		"application/vnd.yamaha.through-ngn": { source: "iana" },
		"application/vnd.yamaha.tunnel-udpencap": { source: "iana" },
		"application/vnd.yaoweme": { source: "iana" },
		"application/vnd.yellowriver-custom-menu": {
			source: "iana",
			extensions: ["cmp"]
		},
		"application/vnd.zul": {
			source: "iana",
			extensions: ["zir", "zirz"]
		},
		"application/vnd.zzazz.deck+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["zaz"]
		},
		"application/voicexml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["vxml"]
		},
		"application/voucher-cms+json": {
			source: "iana",
			compressible: !0
		},
		"application/voucher-jws+json": {
			source: "iana",
			compressible: !0
		},
		"application/vp": { source: "iana" },
		"application/vp+cose": { source: "iana" },
		"application/vp+jwt": { source: "iana" },
		"application/vq-rtcpxr": { source: "iana" },
		"application/wasm": {
			source: "iana",
			compressible: !0,
			extensions: ["wasm"]
		},
		"application/watcherinfo+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["wif"]
		},
		"application/webpush-options+json": {
			source: "iana",
			compressible: !0
		},
		"application/whoispp-query": { source: "iana" },
		"application/whoispp-response": { source: "iana" },
		"application/widget": {
			source: "iana",
			extensions: ["wgt"]
		},
		"application/winhlp": {
			source: "apache",
			extensions: ["hlp"]
		},
		"application/wita": { source: "iana" },
		"application/wordperfect5.1": { source: "iana" },
		"application/wsdl+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["wsdl"]
		},
		"application/wspolicy+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["wspolicy"]
		},
		"application/x-7z-compressed": {
			source: "apache",
			compressible: !1,
			extensions: ["7z"]
		},
		"application/x-abiword": {
			source: "apache",
			extensions: ["abw"]
		},
		"application/x-ace-compressed": {
			source: "apache",
			extensions: ["ace"]
		},
		"application/x-amf": { source: "apache" },
		"application/x-apple-diskimage": {
			source: "apache",
			extensions: ["dmg"]
		},
		"application/x-arj": {
			compressible: !1,
			extensions: ["arj"]
		},
		"application/x-authorware-bin": {
			source: "apache",
			extensions: [
				"aab",
				"x32",
				"u32",
				"vox"
			]
		},
		"application/x-authorware-map": {
			source: "apache",
			extensions: ["aam"]
		},
		"application/x-authorware-seg": {
			source: "apache",
			extensions: ["aas"]
		},
		"application/x-bcpio": {
			source: "apache",
			extensions: ["bcpio"]
		},
		"application/x-bdoc": {
			compressible: !1,
			extensions: ["bdoc"]
		},
		"application/x-bittorrent": {
			source: "apache",
			extensions: ["torrent"]
		},
		"application/x-blender": { extensions: ["blend"] },
		"application/x-blorb": {
			source: "apache",
			extensions: ["blb", "blorb"]
		},
		"application/x-bzip": {
			source: "apache",
			compressible: !1,
			extensions: ["bz"]
		},
		"application/x-bzip2": {
			source: "apache",
			compressible: !1,
			extensions: ["bz2", "boz"]
		},
		"application/x-cbr": {
			source: "apache",
			extensions: [
				"cbr",
				"cba",
				"cbt",
				"cbz",
				"cb7"
			]
		},
		"application/x-cdlink": {
			source: "apache",
			extensions: ["vcd"]
		},
		"application/x-cfs-compressed": {
			source: "apache",
			extensions: ["cfs"]
		},
		"application/x-chat": {
			source: "apache",
			extensions: ["chat"]
		},
		"application/x-chess-pgn": {
			source: "apache",
			extensions: ["pgn"]
		},
		"application/x-chrome-extension": { extensions: ["crx"] },
		"application/x-cocoa": {
			source: "nginx",
			extensions: ["cco"]
		},
		"application/x-compress": { source: "apache" },
		"application/x-compressed": { extensions: ["rar"] },
		"application/x-conference": {
			source: "apache",
			extensions: ["nsc"]
		},
		"application/x-cpio": {
			source: "apache",
			extensions: ["cpio"]
		},
		"application/x-csh": {
			source: "apache",
			extensions: ["csh"]
		},
		"application/x-deb": { compressible: !1 },
		"application/x-debian-package": {
			source: "apache",
			extensions: ["deb", "udeb"]
		},
		"application/x-dgc-compressed": {
			source: "apache",
			extensions: ["dgc"]
		},
		"application/x-director": {
			source: "apache",
			extensions: [
				"dir",
				"dcr",
				"dxr",
				"cst",
				"cct",
				"cxt",
				"w3d",
				"fgd",
				"swa"
			]
		},
		"application/x-doom": {
			source: "apache",
			extensions: ["wad"]
		},
		"application/x-dtbncx+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["ncx"]
		},
		"application/x-dtbook+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["dtb"]
		},
		"application/x-dtbresource+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["res"]
		},
		"application/x-dvi": {
			source: "apache",
			compressible: !1,
			extensions: ["dvi"]
		},
		"application/x-envoy": {
			source: "apache",
			extensions: ["evy"]
		},
		"application/x-eva": {
			source: "apache",
			extensions: ["eva"]
		},
		"application/x-font-bdf": {
			source: "apache",
			extensions: ["bdf"]
		},
		"application/x-font-dos": { source: "apache" },
		"application/x-font-framemaker": { source: "apache" },
		"application/x-font-ghostscript": {
			source: "apache",
			extensions: ["gsf"]
		},
		"application/x-font-libgrx": { source: "apache" },
		"application/x-font-linux-psf": {
			source: "apache",
			extensions: ["psf"]
		},
		"application/x-font-pcf": {
			source: "apache",
			extensions: ["pcf"]
		},
		"application/x-font-snf": {
			source: "apache",
			extensions: ["snf"]
		},
		"application/x-font-speedo": { source: "apache" },
		"application/x-font-sunos-news": { source: "apache" },
		"application/x-font-type1": {
			source: "apache",
			extensions: [
				"pfa",
				"pfb",
				"pfm",
				"afm"
			]
		},
		"application/x-font-vfont": { source: "apache" },
		"application/x-freearc": {
			source: "apache",
			extensions: ["arc"]
		},
		"application/x-futuresplash": {
			source: "apache",
			extensions: ["spl"]
		},
		"application/x-gca-compressed": {
			source: "apache",
			extensions: ["gca"]
		},
		"application/x-glulx": {
			source: "apache",
			extensions: ["ulx"]
		},
		"application/x-gnumeric": {
			source: "apache",
			extensions: ["gnumeric"]
		},
		"application/x-gramps-xml": {
			source: "apache",
			extensions: ["gramps"]
		},
		"application/x-gtar": {
			source: "apache",
			extensions: ["gtar"]
		},
		"application/x-gzip": { source: "apache" },
		"application/x-hdf": {
			source: "apache",
			extensions: ["hdf"]
		},
		"application/x-httpd-php": {
			compressible: !0,
			extensions: ["php"]
		},
		"application/x-install-instructions": {
			source: "apache",
			extensions: ["install"]
		},
		"application/x-ipynb+json": {
			compressible: !0,
			extensions: ["ipynb"]
		},
		"application/x-iso9660-image": {
			source: "apache",
			extensions: ["iso"]
		},
		"application/x-iwork-keynote-sffkey": { extensions: ["key"] },
		"application/x-iwork-numbers-sffnumbers": { extensions: ["numbers"] },
		"application/x-iwork-pages-sffpages": { extensions: ["pages"] },
		"application/x-java-archive-diff": {
			source: "nginx",
			extensions: ["jardiff"]
		},
		"application/x-java-jnlp-file": {
			source: "apache",
			compressible: !1,
			extensions: ["jnlp"]
		},
		"application/x-javascript": { compressible: !0 },
		"application/x-keepass2": { extensions: ["kdbx"] },
		"application/x-latex": {
			source: "apache",
			compressible: !1,
			extensions: ["latex"]
		},
		"application/x-lua-bytecode": { extensions: ["luac"] },
		"application/x-lzh-compressed": {
			source: "apache",
			extensions: ["lzh", "lha"]
		},
		"application/x-makeself": {
			source: "nginx",
			extensions: ["run"]
		},
		"application/x-mie": {
			source: "apache",
			extensions: ["mie"]
		},
		"application/x-mobipocket-ebook": {
			source: "apache",
			extensions: ["prc", "mobi"]
		},
		"application/x-mpegurl": { compressible: !1 },
		"application/x-ms-application": {
			source: "apache",
			extensions: ["application"]
		},
		"application/x-ms-shortcut": {
			source: "apache",
			extensions: ["lnk"]
		},
		"application/x-ms-wmd": {
			source: "apache",
			extensions: ["wmd"]
		},
		"application/x-ms-wmz": {
			source: "apache",
			extensions: ["wmz"]
		},
		"application/x-ms-xbap": {
			source: "apache",
			extensions: ["xbap"]
		},
		"application/x-msaccess": {
			source: "apache",
			extensions: ["mdb"]
		},
		"application/x-msbinder": {
			source: "apache",
			extensions: ["obd"]
		},
		"application/x-mscardfile": {
			source: "apache",
			extensions: ["crd"]
		},
		"application/x-msclip": {
			source: "apache",
			extensions: ["clp"]
		},
		"application/x-msdos-program": { extensions: ["exe"] },
		"application/x-msdownload": {
			source: "apache",
			extensions: [
				"exe",
				"dll",
				"com",
				"bat",
				"msi"
			]
		},
		"application/x-msmediaview": {
			source: "apache",
			extensions: [
				"mvb",
				"m13",
				"m14"
			]
		},
		"application/x-msmetafile": {
			source: "apache",
			extensions: [
				"wmf",
				"wmz",
				"emf",
				"emz"
			]
		},
		"application/x-msmoney": {
			source: "apache",
			extensions: ["mny"]
		},
		"application/x-mspublisher": {
			source: "apache",
			extensions: ["pub"]
		},
		"application/x-msschedule": {
			source: "apache",
			extensions: ["scd"]
		},
		"application/x-msterminal": {
			source: "apache",
			extensions: ["trm"]
		},
		"application/x-mswrite": {
			source: "apache",
			extensions: ["wri"]
		},
		"application/x-netcdf": {
			source: "apache",
			extensions: ["nc", "cdf"]
		},
		"application/x-ns-proxy-autoconfig": {
			compressible: !0,
			extensions: ["pac"]
		},
		"application/x-nzb": {
			source: "apache",
			extensions: ["nzb"]
		},
		"application/x-perl": {
			source: "nginx",
			extensions: ["pl", "pm"]
		},
		"application/x-pilot": {
			source: "nginx",
			extensions: ["prc", "pdb"]
		},
		"application/x-pkcs12": {
			source: "apache",
			compressible: !1,
			extensions: ["p12", "pfx"]
		},
		"application/x-pkcs7-certificates": {
			source: "apache",
			extensions: ["p7b", "spc"]
		},
		"application/x-pkcs7-certreqresp": {
			source: "apache",
			extensions: ["p7r"]
		},
		"application/x-pki-message": { source: "iana" },
		"application/x-rar-compressed": {
			source: "apache",
			compressible: !1,
			extensions: ["rar"]
		},
		"application/x-redhat-package-manager": {
			source: "nginx",
			extensions: ["rpm"]
		},
		"application/x-research-info-systems": {
			source: "apache",
			extensions: ["ris"]
		},
		"application/x-sea": {
			source: "nginx",
			extensions: ["sea"]
		},
		"application/x-sh": {
			source: "apache",
			compressible: !0,
			extensions: ["sh"]
		},
		"application/x-shar": {
			source: "apache",
			extensions: ["shar"]
		},
		"application/x-shockwave-flash": {
			source: "apache",
			compressible: !1,
			extensions: ["swf"]
		},
		"application/x-silverlight-app": {
			source: "apache",
			extensions: ["xap"]
		},
		"application/x-sql": {
			source: "apache",
			extensions: ["sql"]
		},
		"application/x-stuffit": {
			source: "apache",
			compressible: !1,
			extensions: ["sit"]
		},
		"application/x-stuffitx": {
			source: "apache",
			extensions: ["sitx"]
		},
		"application/x-subrip": {
			source: "apache",
			extensions: ["srt"]
		},
		"application/x-sv4cpio": {
			source: "apache",
			extensions: ["sv4cpio"]
		},
		"application/x-sv4crc": {
			source: "apache",
			extensions: ["sv4crc"]
		},
		"application/x-t3vm-image": {
			source: "apache",
			extensions: ["t3"]
		},
		"application/x-tads": {
			source: "apache",
			extensions: ["gam"]
		},
		"application/x-tar": {
			source: "apache",
			compressible: !0,
			extensions: ["tar"]
		},
		"application/x-tcl": {
			source: "apache",
			extensions: ["tcl", "tk"]
		},
		"application/x-tex": {
			source: "apache",
			extensions: ["tex"]
		},
		"application/x-tex-tfm": {
			source: "apache",
			extensions: ["tfm"]
		},
		"application/x-texinfo": {
			source: "apache",
			extensions: ["texinfo", "texi"]
		},
		"application/x-tgif": {
			source: "apache",
			extensions: ["obj"]
		},
		"application/x-ustar": {
			source: "apache",
			extensions: ["ustar"]
		},
		"application/x-virtualbox-hdd": {
			compressible: !0,
			extensions: ["hdd"]
		},
		"application/x-virtualbox-ova": {
			compressible: !0,
			extensions: ["ova"]
		},
		"application/x-virtualbox-ovf": {
			compressible: !0,
			extensions: ["ovf"]
		},
		"application/x-virtualbox-vbox": {
			compressible: !0,
			extensions: ["vbox"]
		},
		"application/x-virtualbox-vbox-extpack": {
			compressible: !1,
			extensions: ["vbox-extpack"]
		},
		"application/x-virtualbox-vdi": {
			compressible: !0,
			extensions: ["vdi"]
		},
		"application/x-virtualbox-vhd": {
			compressible: !0,
			extensions: ["vhd"]
		},
		"application/x-virtualbox-vmdk": {
			compressible: !0,
			extensions: ["vmdk"]
		},
		"application/x-wais-source": {
			source: "apache",
			extensions: ["src"]
		},
		"application/x-web-app-manifest+json": {
			compressible: !0,
			extensions: ["webapp"]
		},
		"application/x-www-form-urlencoded": {
			source: "iana",
			compressible: !0
		},
		"application/x-x509-ca-cert": {
			source: "iana",
			extensions: [
				"der",
				"crt",
				"pem"
			]
		},
		"application/x-x509-ca-ra-cert": { source: "iana" },
		"application/x-x509-next-ca-cert": { source: "iana" },
		"application/x-xfig": {
			source: "apache",
			extensions: ["fig"]
		},
		"application/x-xliff+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["xlf"]
		},
		"application/x-xpinstall": {
			source: "apache",
			compressible: !1,
			extensions: ["xpi"]
		},
		"application/x-xz": {
			source: "apache",
			extensions: ["xz"]
		},
		"application/x-zip-compressed": { extensions: ["zip"] },
		"application/x-zmachine": {
			source: "apache",
			extensions: [
				"z1",
				"z2",
				"z3",
				"z4",
				"z5",
				"z6",
				"z7",
				"z8"
			]
		},
		"application/x400-bp": { source: "iana" },
		"application/xacml+xml": {
			source: "iana",
			compressible: !0
		},
		"application/xaml+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["xaml"]
		},
		"application/xcap-att+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xav"]
		},
		"application/xcap-caps+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xca"]
		},
		"application/xcap-diff+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xdf"]
		},
		"application/xcap-el+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xel"]
		},
		"application/xcap-error+xml": {
			source: "iana",
			compressible: !0
		},
		"application/xcap-ns+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xns"]
		},
		"application/xcon-conference-info+xml": {
			source: "iana",
			compressible: !0
		},
		"application/xcon-conference-info-diff+xml": {
			source: "iana",
			compressible: !0
		},
		"application/xenc+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xenc"]
		},
		"application/xfdf": {
			source: "iana",
			extensions: ["xfdf"]
		},
		"application/xhtml+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xhtml", "xht"]
		},
		"application/xhtml-voice+xml": {
			source: "apache",
			compressible: !0
		},
		"application/xliff+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xlf"]
		},
		"application/xml": {
			source: "iana",
			compressible: !0,
			extensions: [
				"xml",
				"xsl",
				"xsd",
				"rng"
			]
		},
		"application/xml-dtd": {
			source: "iana",
			compressible: !0,
			extensions: ["dtd"]
		},
		"application/xml-external-parsed-entity": { source: "iana" },
		"application/xml-patch+xml": {
			source: "iana",
			compressible: !0
		},
		"application/xmpp+xml": {
			source: "iana",
			compressible: !0
		},
		"application/xop+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xop"]
		},
		"application/xproc+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["xpl"]
		},
		"application/xslt+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xsl", "xslt"]
		},
		"application/xspf+xml": {
			source: "apache",
			compressible: !0,
			extensions: ["xspf"]
		},
		"application/xv+xml": {
			source: "iana",
			compressible: !0,
			extensions: [
				"mxml",
				"xhvml",
				"xvml",
				"xvm"
			]
		},
		"application/yaml": { source: "iana" },
		"application/yang": {
			source: "iana",
			extensions: ["yang"]
		},
		"application/yang-data+cbor": { source: "iana" },
		"application/yang-data+json": {
			source: "iana",
			compressible: !0
		},
		"application/yang-data+xml": {
			source: "iana",
			compressible: !0
		},
		"application/yang-patch+json": {
			source: "iana",
			compressible: !0
		},
		"application/yang-patch+xml": {
			source: "iana",
			compressible: !0
		},
		"application/yang-sid+json": {
			source: "iana",
			compressible: !0
		},
		"application/yin+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["yin"]
		},
		"application/zip": {
			source: "iana",
			compressible: !1,
			extensions: ["zip"]
		},
		"application/zip+dotlottie": { extensions: ["lottie"] },
		"application/zlib": { source: "iana" },
		"application/zstd": { source: "iana" },
		"audio/1d-interleaved-parityfec": { source: "iana" },
		"audio/32kadpcm": { source: "iana" },
		"audio/3gpp": {
			source: "iana",
			compressible: !1,
			extensions: ["3gpp"]
		},
		"audio/3gpp2": { source: "iana" },
		"audio/aac": {
			source: "iana",
			extensions: ["adts", "aac"]
		},
		"audio/ac3": { source: "iana" },
		"audio/adpcm": {
			source: "apache",
			extensions: ["adp"]
		},
		"audio/amr": {
			source: "iana",
			extensions: ["amr"]
		},
		"audio/amr-wb": { source: "iana" },
		"audio/amr-wb+": { source: "iana" },
		"audio/aptx": { source: "iana" },
		"audio/asc": { source: "iana" },
		"audio/atrac-advanced-lossless": { source: "iana" },
		"audio/atrac-x": { source: "iana" },
		"audio/atrac3": { source: "iana" },
		"audio/basic": {
			source: "iana",
			compressible: !1,
			extensions: ["au", "snd"]
		},
		"audio/bv16": { source: "iana" },
		"audio/bv32": { source: "iana" },
		"audio/clearmode": { source: "iana" },
		"audio/cn": { source: "iana" },
		"audio/dat12": { source: "iana" },
		"audio/dls": { source: "iana" },
		"audio/dsr-es201108": { source: "iana" },
		"audio/dsr-es202050": { source: "iana" },
		"audio/dsr-es202211": { source: "iana" },
		"audio/dsr-es202212": { source: "iana" },
		"audio/dv": { source: "iana" },
		"audio/dvi4": { source: "iana" },
		"audio/eac3": { source: "iana" },
		"audio/encaprtp": { source: "iana" },
		"audio/evrc": { source: "iana" },
		"audio/evrc-qcp": { source: "iana" },
		"audio/evrc0": { source: "iana" },
		"audio/evrc1": { source: "iana" },
		"audio/evrcb": { source: "iana" },
		"audio/evrcb0": { source: "iana" },
		"audio/evrcb1": { source: "iana" },
		"audio/evrcnw": { source: "iana" },
		"audio/evrcnw0": { source: "iana" },
		"audio/evrcnw1": { source: "iana" },
		"audio/evrcwb": { source: "iana" },
		"audio/evrcwb0": { source: "iana" },
		"audio/evrcwb1": { source: "iana" },
		"audio/evs": { source: "iana" },
		"audio/flac": { source: "iana" },
		"audio/flexfec": { source: "iana" },
		"audio/fwdred": { source: "iana" },
		"audio/g711-0": { source: "iana" },
		"audio/g719": { source: "iana" },
		"audio/g722": { source: "iana" },
		"audio/g7221": { source: "iana" },
		"audio/g723": { source: "iana" },
		"audio/g726-16": { source: "iana" },
		"audio/g726-24": { source: "iana" },
		"audio/g726-32": { source: "iana" },
		"audio/g726-40": { source: "iana" },
		"audio/g728": { source: "iana" },
		"audio/g729": { source: "iana" },
		"audio/g7291": { source: "iana" },
		"audio/g729d": { source: "iana" },
		"audio/g729e": { source: "iana" },
		"audio/gsm": { source: "iana" },
		"audio/gsm-efr": { source: "iana" },
		"audio/gsm-hr-08": { source: "iana" },
		"audio/ilbc": { source: "iana" },
		"audio/ip-mr_v2.5": { source: "iana" },
		"audio/isac": { source: "apache" },
		"audio/l16": { source: "iana" },
		"audio/l20": { source: "iana" },
		"audio/l24": {
			source: "iana",
			compressible: !1
		},
		"audio/l8": { source: "iana" },
		"audio/lpc": { source: "iana" },
		"audio/matroska": { source: "iana" },
		"audio/melp": { source: "iana" },
		"audio/melp1200": { source: "iana" },
		"audio/melp2400": { source: "iana" },
		"audio/melp600": { source: "iana" },
		"audio/mhas": { source: "iana" },
		"audio/midi": {
			source: "apache",
			extensions: [
				"mid",
				"midi",
				"kar",
				"rmi"
			]
		},
		"audio/midi-clip": { source: "iana" },
		"audio/mobile-xmf": {
			source: "iana",
			extensions: ["mxmf"]
		},
		"audio/mp3": {
			compressible: !1,
			extensions: ["mp3"]
		},
		"audio/mp4": {
			source: "iana",
			compressible: !1,
			extensions: [
				"m4a",
				"mp4a",
				"m4b"
			]
		},
		"audio/mp4a-latm": { source: "iana" },
		"audio/mpa": { source: "iana" },
		"audio/mpa-robust": { source: "iana" },
		"audio/mpeg": {
			source: "iana",
			compressible: !1,
			extensions: [
				"mpga",
				"mp2",
				"mp2a",
				"mp3",
				"m2a",
				"m3a"
			]
		},
		"audio/mpeg4-generic": { source: "iana" },
		"audio/musepack": { source: "apache" },
		"audio/ogg": {
			source: "iana",
			compressible: !1,
			extensions: [
				"oga",
				"ogg",
				"spx",
				"opus"
			]
		},
		"audio/opus": { source: "iana" },
		"audio/parityfec": { source: "iana" },
		"audio/pcma": { source: "iana" },
		"audio/pcma-wb": { source: "iana" },
		"audio/pcmu": { source: "iana" },
		"audio/pcmu-wb": { source: "iana" },
		"audio/prs.sid": { source: "iana" },
		"audio/qcelp": { source: "iana" },
		"audio/raptorfec": { source: "iana" },
		"audio/red": { source: "iana" },
		"audio/rtp-enc-aescm128": { source: "iana" },
		"audio/rtp-midi": { source: "iana" },
		"audio/rtploopback": { source: "iana" },
		"audio/rtx": { source: "iana" },
		"audio/s3m": {
			source: "apache",
			extensions: ["s3m"]
		},
		"audio/scip": { source: "iana" },
		"audio/silk": {
			source: "apache",
			extensions: ["sil"]
		},
		"audio/smv": { source: "iana" },
		"audio/smv-qcp": { source: "iana" },
		"audio/smv0": { source: "iana" },
		"audio/sofa": { source: "iana" },
		"audio/sp-midi": { source: "iana" },
		"audio/speex": { source: "iana" },
		"audio/t140c": { source: "iana" },
		"audio/t38": { source: "iana" },
		"audio/telephone-event": { source: "iana" },
		"audio/tetra_acelp": { source: "iana" },
		"audio/tetra_acelp_bb": { source: "iana" },
		"audio/tone": { source: "iana" },
		"audio/tsvcis": { source: "iana" },
		"audio/uemclip": { source: "iana" },
		"audio/ulpfec": { source: "iana" },
		"audio/usac": { source: "iana" },
		"audio/vdvi": { source: "iana" },
		"audio/vmr-wb": { source: "iana" },
		"audio/vnd.3gpp.iufp": { source: "iana" },
		"audio/vnd.4sb": { source: "iana" },
		"audio/vnd.audiokoz": { source: "iana" },
		"audio/vnd.celp": { source: "iana" },
		"audio/vnd.cisco.nse": { source: "iana" },
		"audio/vnd.cmles.radio-events": { source: "iana" },
		"audio/vnd.cns.anp1": { source: "iana" },
		"audio/vnd.cns.inf1": { source: "iana" },
		"audio/vnd.dece.audio": {
			source: "iana",
			extensions: ["uva", "uvva"]
		},
		"audio/vnd.digital-winds": {
			source: "iana",
			extensions: ["eol"]
		},
		"audio/vnd.dlna.adts": { source: "iana" },
		"audio/vnd.dolby.heaac.1": { source: "iana" },
		"audio/vnd.dolby.heaac.2": { source: "iana" },
		"audio/vnd.dolby.mlp": { source: "iana" },
		"audio/vnd.dolby.mps": { source: "iana" },
		"audio/vnd.dolby.pl2": { source: "iana" },
		"audio/vnd.dolby.pl2x": { source: "iana" },
		"audio/vnd.dolby.pl2z": { source: "iana" },
		"audio/vnd.dolby.pulse.1": { source: "iana" },
		"audio/vnd.dra": {
			source: "iana",
			extensions: ["dra"]
		},
		"audio/vnd.dts": {
			source: "iana",
			extensions: ["dts"]
		},
		"audio/vnd.dts.hd": {
			source: "iana",
			extensions: ["dtshd"]
		},
		"audio/vnd.dts.uhd": { source: "iana" },
		"audio/vnd.dvb.file": { source: "iana" },
		"audio/vnd.everad.plj": { source: "iana" },
		"audio/vnd.hns.audio": { source: "iana" },
		"audio/vnd.lucent.voice": {
			source: "iana",
			extensions: ["lvp"]
		},
		"audio/vnd.ms-playready.media.pya": {
			source: "iana",
			extensions: ["pya"]
		},
		"audio/vnd.nokia.mobile-xmf": { source: "iana" },
		"audio/vnd.nortel.vbk": { source: "iana" },
		"audio/vnd.nuera.ecelp4800": {
			source: "iana",
			extensions: ["ecelp4800"]
		},
		"audio/vnd.nuera.ecelp7470": {
			source: "iana",
			extensions: ["ecelp7470"]
		},
		"audio/vnd.nuera.ecelp9600": {
			source: "iana",
			extensions: ["ecelp9600"]
		},
		"audio/vnd.octel.sbc": { source: "iana" },
		"audio/vnd.presonus.multitrack": { source: "iana" },
		"audio/vnd.qcelp": { source: "apache" },
		"audio/vnd.rhetorex.32kadpcm": { source: "iana" },
		"audio/vnd.rip": {
			source: "iana",
			extensions: ["rip"]
		},
		"audio/vnd.rn-realaudio": { compressible: !1 },
		"audio/vnd.sealedmedia.softseal.mpeg": { source: "iana" },
		"audio/vnd.vmx.cvsd": { source: "iana" },
		"audio/vnd.wave": { compressible: !1 },
		"audio/vorbis": {
			source: "iana",
			compressible: !1
		},
		"audio/vorbis-config": { source: "iana" },
		"audio/wav": {
			compressible: !1,
			extensions: ["wav"]
		},
		"audio/wave": {
			compressible: !1,
			extensions: ["wav"]
		},
		"audio/webm": {
			source: "apache",
			compressible: !1,
			extensions: ["weba"]
		},
		"audio/x-aac": {
			source: "apache",
			compressible: !1,
			extensions: ["aac"]
		},
		"audio/x-aiff": {
			source: "apache",
			extensions: [
				"aif",
				"aiff",
				"aifc"
			]
		},
		"audio/x-caf": {
			source: "apache",
			compressible: !1,
			extensions: ["caf"]
		},
		"audio/x-flac": {
			source: "apache",
			extensions: ["flac"]
		},
		"audio/x-m4a": {
			source: "nginx",
			extensions: ["m4a"]
		},
		"audio/x-matroska": {
			source: "apache",
			extensions: ["mka"]
		},
		"audio/x-mpegurl": {
			source: "apache",
			extensions: ["m3u"]
		},
		"audio/x-ms-wax": {
			source: "apache",
			extensions: ["wax"]
		},
		"audio/x-ms-wma": {
			source: "apache",
			extensions: ["wma"]
		},
		"audio/x-pn-realaudio": {
			source: "apache",
			extensions: ["ram", "ra"]
		},
		"audio/x-pn-realaudio-plugin": {
			source: "apache",
			extensions: ["rmp"]
		},
		"audio/x-realaudio": {
			source: "nginx",
			extensions: ["ra"]
		},
		"audio/x-tta": { source: "apache" },
		"audio/x-wav": {
			source: "apache",
			extensions: ["wav"]
		},
		"audio/xm": {
			source: "apache",
			extensions: ["xm"]
		},
		"chemical/x-cdx": {
			source: "apache",
			extensions: ["cdx"]
		},
		"chemical/x-cif": {
			source: "apache",
			extensions: ["cif"]
		},
		"chemical/x-cmdf": {
			source: "apache",
			extensions: ["cmdf"]
		},
		"chemical/x-cml": {
			source: "apache",
			extensions: ["cml"]
		},
		"chemical/x-csml": {
			source: "apache",
			extensions: ["csml"]
		},
		"chemical/x-pdb": { source: "apache" },
		"chemical/x-xyz": {
			source: "apache",
			extensions: ["xyz"]
		},
		"font/collection": {
			source: "iana",
			extensions: ["ttc"]
		},
		"font/otf": {
			source: "iana",
			compressible: !0,
			extensions: ["otf"]
		},
		"font/sfnt": { source: "iana" },
		"font/ttf": {
			source: "iana",
			compressible: !0,
			extensions: ["ttf"]
		},
		"font/woff": {
			source: "iana",
			extensions: ["woff"]
		},
		"font/woff2": {
			source: "iana",
			extensions: ["woff2"]
		},
		"image/aces": {
			source: "iana",
			extensions: ["exr"]
		},
		"image/apng": {
			source: "iana",
			compressible: !1,
			extensions: ["apng"]
		},
		"image/avci": {
			source: "iana",
			extensions: ["avci"]
		},
		"image/avcs": {
			source: "iana",
			extensions: ["avcs"]
		},
		"image/avif": {
			source: "iana",
			compressible: !1,
			extensions: ["avif"]
		},
		"image/bmp": {
			source: "iana",
			compressible: !0,
			extensions: ["bmp", "dib"]
		},
		"image/cgm": {
			source: "iana",
			extensions: ["cgm"]
		},
		"image/dicom-rle": {
			source: "iana",
			extensions: ["drle"]
		},
		"image/dpx": {
			source: "iana",
			extensions: ["dpx"]
		},
		"image/emf": {
			source: "iana",
			extensions: ["emf"]
		},
		"image/fits": {
			source: "iana",
			extensions: ["fits"]
		},
		"image/g3fax": {
			source: "iana",
			extensions: ["g3"]
		},
		"image/gif": {
			source: "iana",
			compressible: !1,
			extensions: ["gif"]
		},
		"image/heic": {
			source: "iana",
			extensions: ["heic"]
		},
		"image/heic-sequence": {
			source: "iana",
			extensions: ["heics"]
		},
		"image/heif": {
			source: "iana",
			extensions: ["heif"]
		},
		"image/heif-sequence": {
			source: "iana",
			extensions: ["heifs"]
		},
		"image/hej2k": {
			source: "iana",
			extensions: ["hej2"]
		},
		"image/ief": {
			source: "iana",
			extensions: ["ief"]
		},
		"image/j2c": { source: "iana" },
		"image/jaii": {
			source: "iana",
			extensions: ["jaii"]
		},
		"image/jais": {
			source: "iana",
			extensions: ["jais"]
		},
		"image/jls": {
			source: "iana",
			extensions: ["jls"]
		},
		"image/jp2": {
			source: "iana",
			compressible: !1,
			extensions: ["jp2", "jpg2"]
		},
		"image/jpeg": {
			source: "iana",
			compressible: !1,
			extensions: [
				"jpg",
				"jpeg",
				"jpe"
			]
		},
		"image/jph": {
			source: "iana",
			extensions: ["jph"]
		},
		"image/jphc": {
			source: "iana",
			extensions: ["jhc"]
		},
		"image/jpm": {
			source: "iana",
			compressible: !1,
			extensions: ["jpm", "jpgm"]
		},
		"image/jpx": {
			source: "iana",
			compressible: !1,
			extensions: ["jpx", "jpf"]
		},
		"image/jxl": {
			source: "iana",
			extensions: ["jxl"]
		},
		"image/jxr": {
			source: "iana",
			extensions: ["jxr"]
		},
		"image/jxra": {
			source: "iana",
			extensions: ["jxra"]
		},
		"image/jxrs": {
			source: "iana",
			extensions: ["jxrs"]
		},
		"image/jxs": {
			source: "iana",
			extensions: ["jxs"]
		},
		"image/jxsc": {
			source: "iana",
			extensions: ["jxsc"]
		},
		"image/jxsi": {
			source: "iana",
			extensions: ["jxsi"]
		},
		"image/jxss": {
			source: "iana",
			extensions: ["jxss"]
		},
		"image/ktx": {
			source: "iana",
			extensions: ["ktx"]
		},
		"image/ktx2": {
			source: "iana",
			extensions: ["ktx2"]
		},
		"image/naplps": { source: "iana" },
		"image/pjpeg": {
			compressible: !1,
			extensions: ["jfif"]
		},
		"image/png": {
			source: "iana",
			compressible: !1,
			extensions: ["png"]
		},
		"image/prs.btif": {
			source: "iana",
			extensions: ["btif", "btf"]
		},
		"image/prs.pti": {
			source: "iana",
			extensions: ["pti"]
		},
		"image/pwg-raster": { source: "iana" },
		"image/sgi": {
			source: "apache",
			extensions: ["sgi"]
		},
		"image/svg+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["svg", "svgz"]
		},
		"image/t38": {
			source: "iana",
			extensions: ["t38"]
		},
		"image/tiff": {
			source: "iana",
			compressible: !1,
			extensions: ["tif", "tiff"]
		},
		"image/tiff-fx": {
			source: "iana",
			extensions: ["tfx"]
		},
		"image/vnd.adobe.photoshop": {
			source: "iana",
			compressible: !0,
			extensions: ["psd"]
		},
		"image/vnd.airzip.accelerator.azv": {
			source: "iana",
			extensions: ["azv"]
		},
		"image/vnd.clip": { source: "iana" },
		"image/vnd.cns.inf2": { source: "iana" },
		"image/vnd.dece.graphic": {
			source: "iana",
			extensions: [
				"uvi",
				"uvvi",
				"uvg",
				"uvvg"
			]
		},
		"image/vnd.djvu": {
			source: "iana",
			extensions: ["djvu", "djv"]
		},
		"image/vnd.dvb.subtitle": {
			source: "iana",
			extensions: ["sub"]
		},
		"image/vnd.dwg": {
			source: "iana",
			extensions: ["dwg"]
		},
		"image/vnd.dxf": {
			source: "iana",
			extensions: ["dxf"]
		},
		"image/vnd.fastbidsheet": {
			source: "iana",
			extensions: ["fbs"]
		},
		"image/vnd.fpx": {
			source: "iana",
			extensions: ["fpx"]
		},
		"image/vnd.fst": {
			source: "iana",
			extensions: ["fst"]
		},
		"image/vnd.fujixerox.edmics-mmr": {
			source: "iana",
			extensions: ["mmr"]
		},
		"image/vnd.fujixerox.edmics-rlc": {
			source: "iana",
			extensions: ["rlc"]
		},
		"image/vnd.globalgraphics.pgb": { source: "iana" },
		"image/vnd.microsoft.icon": {
			source: "iana",
			compressible: !0,
			extensions: ["ico"]
		},
		"image/vnd.mix": { source: "iana" },
		"image/vnd.mozilla.apng": { source: "iana" },
		"image/vnd.ms-dds": {
			compressible: !0,
			extensions: ["dds"]
		},
		"image/vnd.ms-modi": {
			source: "iana",
			extensions: ["mdi"]
		},
		"image/vnd.ms-photo": {
			source: "apache",
			extensions: ["wdp"]
		},
		"image/vnd.net-fpx": {
			source: "iana",
			extensions: ["npx"]
		},
		"image/vnd.pco.b16": {
			source: "iana",
			extensions: ["b16"]
		},
		"image/vnd.radiance": { source: "iana" },
		"image/vnd.sealed.png": { source: "iana" },
		"image/vnd.sealedmedia.softseal.gif": { source: "iana" },
		"image/vnd.sealedmedia.softseal.jpg": { source: "iana" },
		"image/vnd.svf": { source: "iana" },
		"image/vnd.tencent.tap": {
			source: "iana",
			extensions: ["tap"]
		},
		"image/vnd.valve.source.texture": {
			source: "iana",
			extensions: ["vtf"]
		},
		"image/vnd.wap.wbmp": {
			source: "iana",
			extensions: ["wbmp"]
		},
		"image/vnd.xiff": {
			source: "iana",
			extensions: ["xif"]
		},
		"image/vnd.zbrush.pcx": {
			source: "iana",
			extensions: ["pcx"]
		},
		"image/webp": {
			source: "iana",
			extensions: ["webp"]
		},
		"image/wmf": {
			source: "iana",
			extensions: ["wmf"]
		},
		"image/x-3ds": {
			source: "apache",
			extensions: ["3ds"]
		},
		"image/x-adobe-dng": { extensions: ["dng"] },
		"image/x-cmu-raster": {
			source: "apache",
			extensions: ["ras"]
		},
		"image/x-cmx": {
			source: "apache",
			extensions: ["cmx"]
		},
		"image/x-emf": { source: "iana" },
		"image/x-freehand": {
			source: "apache",
			extensions: [
				"fh",
				"fhc",
				"fh4",
				"fh5",
				"fh7"
			]
		},
		"image/x-icon": {
			source: "apache",
			compressible: !0,
			extensions: ["ico"]
		},
		"image/x-jng": {
			source: "nginx",
			extensions: ["jng"]
		},
		"image/x-mrsid-image": {
			source: "apache",
			extensions: ["sid"]
		},
		"image/x-ms-bmp": {
			source: "nginx",
			compressible: !0,
			extensions: ["bmp"]
		},
		"image/x-pcx": {
			source: "apache",
			extensions: ["pcx"]
		},
		"image/x-pict": {
			source: "apache",
			extensions: ["pic", "pct"]
		},
		"image/x-portable-anymap": {
			source: "apache",
			extensions: ["pnm"]
		},
		"image/x-portable-bitmap": {
			source: "apache",
			extensions: ["pbm"]
		},
		"image/x-portable-graymap": {
			source: "apache",
			extensions: ["pgm"]
		},
		"image/x-portable-pixmap": {
			source: "apache",
			extensions: ["ppm"]
		},
		"image/x-rgb": {
			source: "apache",
			extensions: ["rgb"]
		},
		"image/x-tga": {
			source: "apache",
			extensions: ["tga"]
		},
		"image/x-wmf": { source: "iana" },
		"image/x-xbitmap": {
			source: "apache",
			extensions: ["xbm"]
		},
		"image/x-xcf": { compressible: !1 },
		"image/x-xpixmap": {
			source: "apache",
			extensions: ["xpm"]
		},
		"image/x-xwindowdump": {
			source: "apache",
			extensions: ["xwd"]
		},
		"message/bhttp": { source: "iana" },
		"message/cpim": { source: "iana" },
		"message/delivery-status": { source: "iana" },
		"message/disposition-notification": {
			source: "iana",
			extensions: ["disposition-notification"]
		},
		"message/external-body": { source: "iana" },
		"message/feedback-report": { source: "iana" },
		"message/global": {
			source: "iana",
			extensions: ["u8msg"]
		},
		"message/global-delivery-status": {
			source: "iana",
			extensions: ["u8dsn"]
		},
		"message/global-disposition-notification": {
			source: "iana",
			extensions: ["u8mdn"]
		},
		"message/global-headers": {
			source: "iana",
			extensions: ["u8hdr"]
		},
		"message/http": {
			source: "iana",
			compressible: !1
		},
		"message/imdn+xml": {
			source: "iana",
			compressible: !0
		},
		"message/mls": { source: "iana" },
		"message/news": { source: "apache" },
		"message/ohttp-req": { source: "iana" },
		"message/ohttp-res": { source: "iana" },
		"message/partial": {
			source: "iana",
			compressible: !1
		},
		"message/rfc822": {
			source: "iana",
			compressible: !0,
			extensions: [
				"eml",
				"mime",
				"mht",
				"mhtml"
			]
		},
		"message/s-http": { source: "apache" },
		"message/sip": { source: "iana" },
		"message/sipfrag": { source: "iana" },
		"message/tracking-status": { source: "iana" },
		"message/vnd.si.simp": { source: "apache" },
		"message/vnd.wfa.wsc": {
			source: "iana",
			extensions: ["wsc"]
		},
		"model/3mf": {
			source: "iana",
			extensions: ["3mf"]
		},
		"model/e57": { source: "iana" },
		"model/gltf+json": {
			source: "iana",
			compressible: !0,
			extensions: ["gltf"]
		},
		"model/gltf-binary": {
			source: "iana",
			compressible: !0,
			extensions: ["glb"]
		},
		"model/iges": {
			source: "iana",
			compressible: !1,
			extensions: ["igs", "iges"]
		},
		"model/jt": {
			source: "iana",
			extensions: ["jt"]
		},
		"model/mesh": {
			source: "iana",
			compressible: !1,
			extensions: [
				"msh",
				"mesh",
				"silo"
			]
		},
		"model/mtl": {
			source: "iana",
			extensions: ["mtl"]
		},
		"model/obj": {
			source: "iana",
			extensions: ["obj"]
		},
		"model/prc": {
			source: "iana",
			extensions: ["prc"]
		},
		"model/step": {
			source: "iana",
			extensions: [
				"step",
				"stp",
				"stpnc",
				"p21",
				"210"
			]
		},
		"model/step+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["stpx"]
		},
		"model/step+zip": {
			source: "iana",
			compressible: !1,
			extensions: ["stpz"]
		},
		"model/step-xml+zip": {
			source: "iana",
			compressible: !1,
			extensions: ["stpxz"]
		},
		"model/stl": {
			source: "iana",
			extensions: ["stl"]
		},
		"model/u3d": {
			source: "iana",
			extensions: ["u3d"]
		},
		"model/vnd.bary": {
			source: "iana",
			extensions: ["bary"]
		},
		"model/vnd.cld": {
			source: "iana",
			extensions: ["cld"]
		},
		"model/vnd.collada+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["dae"]
		},
		"model/vnd.dwf": {
			source: "iana",
			extensions: ["dwf"]
		},
		"model/vnd.flatland.3dml": { source: "iana" },
		"model/vnd.gdl": {
			source: "iana",
			extensions: ["gdl"]
		},
		"model/vnd.gs-gdl": { source: "apache" },
		"model/vnd.gs.gdl": { source: "iana" },
		"model/vnd.gtw": {
			source: "iana",
			extensions: ["gtw"]
		},
		"model/vnd.moml+xml": {
			source: "iana",
			compressible: !0
		},
		"model/vnd.mts": {
			source: "iana",
			extensions: ["mts"]
		},
		"model/vnd.opengex": {
			source: "iana",
			extensions: ["ogex"]
		},
		"model/vnd.parasolid.transmit.binary": {
			source: "iana",
			extensions: ["x_b"]
		},
		"model/vnd.parasolid.transmit.text": {
			source: "iana",
			extensions: ["x_t"]
		},
		"model/vnd.pytha.pyox": {
			source: "iana",
			extensions: ["pyo", "pyox"]
		},
		"model/vnd.rosette.annotated-data-model": { source: "iana" },
		"model/vnd.sap.vds": {
			source: "iana",
			extensions: ["vds"]
		},
		"model/vnd.usda": {
			source: "iana",
			extensions: ["usda"]
		},
		"model/vnd.usdz+zip": {
			source: "iana",
			compressible: !1,
			extensions: ["usdz"]
		},
		"model/vnd.valve.source.compiled-map": {
			source: "iana",
			extensions: ["bsp"]
		},
		"model/vnd.vtu": {
			source: "iana",
			extensions: ["vtu"]
		},
		"model/vrml": {
			source: "iana",
			compressible: !1,
			extensions: ["wrl", "vrml"]
		},
		"model/x3d+binary": {
			source: "apache",
			compressible: !1,
			extensions: ["x3db", "x3dbz"]
		},
		"model/x3d+fastinfoset": {
			source: "iana",
			extensions: ["x3db"]
		},
		"model/x3d+vrml": {
			source: "apache",
			compressible: !1,
			extensions: ["x3dv", "x3dvz"]
		},
		"model/x3d+xml": {
			source: "iana",
			compressible: !0,
			extensions: ["x3d", "x3dz"]
		},
		"model/x3d-vrml": {
			source: "iana",
			extensions: ["x3dv"]
		},
		"multipart/alternative": {
			source: "iana",
			compressible: !1
		},
		"multipart/appledouble": { source: "iana" },
		"multipart/byteranges": { source: "iana" },
		"multipart/digest": { source: "iana" },
		"multipart/encrypted": {
			source: "iana",
			compressible: !1
		},
		"multipart/form-data": {
			source: "iana",
			compressible: !1
		},
		"multipart/header-set": { source: "iana" },
		"multipart/mixed": { source: "iana" },
		"multipart/multilingual": { source: "iana" },
		"multipart/parallel": { source: "iana" },
		"multipart/related": {
			source: "iana",
			compressible: !1
		},
		"multipart/report": { source: "iana" },
		"multipart/signed": {
			source: "iana",
			compressible: !1
		},
		"multipart/vnd.bint.med-plus": { source: "iana" },
		"multipart/voice-message": { source: "iana" },
		"multipart/x-mixed-replace": { source: "iana" },
		"text/1d-interleaved-parityfec": { source: "iana" },
		"text/cache-manifest": {
			source: "iana",
			compressible: !0,
			extensions: ["appcache", "manifest"]
		},
		"text/calendar": {
			source: "iana",
			extensions: ["ics", "ifb"]
		},
		"text/calender": { compressible: !0 },
		"text/cmd": { compressible: !0 },
		"text/coffeescript": { extensions: ["coffee", "litcoffee"] },
		"text/cql": { source: "iana" },
		"text/cql-expression": { source: "iana" },
		"text/cql-identifier": { source: "iana" },
		"text/css": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["css"]
		},
		"text/csv": {
			source: "iana",
			compressible: !0,
			extensions: ["csv"]
		},
		"text/csv-schema": { source: "iana" },
		"text/directory": { source: "iana" },
		"text/dns": { source: "iana" },
		"text/ecmascript": { source: "apache" },
		"text/encaprtp": { source: "iana" },
		"text/enriched": { source: "iana" },
		"text/fhirpath": { source: "iana" },
		"text/flexfec": { source: "iana" },
		"text/fwdred": { source: "iana" },
		"text/gff3": { source: "iana" },
		"text/grammar-ref-list": { source: "iana" },
		"text/hl7v2": { source: "iana" },
		"text/html": {
			source: "iana",
			compressible: !0,
			extensions: [
				"html",
				"htm",
				"shtml"
			]
		},
		"text/jade": { extensions: ["jade"] },
		"text/javascript": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["js", "mjs"]
		},
		"text/jcr-cnd": { source: "iana" },
		"text/jsx": {
			compressible: !0,
			extensions: ["jsx"]
		},
		"text/less": {
			compressible: !0,
			extensions: ["less"]
		},
		"text/markdown": {
			source: "iana",
			compressible: !0,
			extensions: ["md", "markdown"]
		},
		"text/mathml": {
			source: "nginx",
			extensions: ["mml"]
		},
		"text/mdx": {
			compressible: !0,
			extensions: ["mdx"]
		},
		"text/mizar": { source: "iana" },
		"text/n3": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["n3"]
		},
		"text/parameters": {
			source: "iana",
			charset: "UTF-8"
		},
		"text/parityfec": { source: "iana" },
		"text/plain": {
			source: "iana",
			compressible: !0,
			extensions: [
				"txt",
				"text",
				"conf",
				"def",
				"list",
				"log",
				"in",
				"ini"
			]
		},
		"text/provenance-notation": {
			source: "iana",
			charset: "UTF-8"
		},
		"text/prs.fallenstein.rst": { source: "iana" },
		"text/prs.lines.tag": {
			source: "iana",
			extensions: ["dsc"]
		},
		"text/prs.prop.logic": { source: "iana" },
		"text/prs.texi": { source: "iana" },
		"text/raptorfec": { source: "iana" },
		"text/red": { source: "iana" },
		"text/rfc822-headers": { source: "iana" },
		"text/richtext": {
			source: "iana",
			compressible: !0,
			extensions: ["rtx"]
		},
		"text/rtf": {
			source: "iana",
			compressible: !0,
			extensions: ["rtf"]
		},
		"text/rtp-enc-aescm128": { source: "iana" },
		"text/rtploopback": { source: "iana" },
		"text/rtx": { source: "iana" },
		"text/sgml": {
			source: "iana",
			extensions: ["sgml", "sgm"]
		},
		"text/shaclc": { source: "iana" },
		"text/shex": {
			source: "iana",
			extensions: ["shex"]
		},
		"text/slim": { extensions: ["slim", "slm"] },
		"text/spdx": {
			source: "iana",
			extensions: ["spdx"]
		},
		"text/strings": { source: "iana" },
		"text/stylus": { extensions: ["stylus", "styl"] },
		"text/t140": { source: "iana" },
		"text/tab-separated-values": {
			source: "iana",
			compressible: !0,
			extensions: ["tsv"]
		},
		"text/troff": {
			source: "iana",
			extensions: [
				"t",
				"tr",
				"roff",
				"man",
				"me",
				"ms"
			]
		},
		"text/turtle": {
			source: "iana",
			charset: "UTF-8",
			extensions: ["ttl"]
		},
		"text/ulpfec": { source: "iana" },
		"text/uri-list": {
			source: "iana",
			compressible: !0,
			extensions: [
				"uri",
				"uris",
				"urls"
			]
		},
		"text/vcard": {
			source: "iana",
			compressible: !0,
			extensions: ["vcard"]
		},
		"text/vnd.a": { source: "iana" },
		"text/vnd.abc": { source: "iana" },
		"text/vnd.ascii-art": { source: "iana" },
		"text/vnd.curl": {
			source: "iana",
			extensions: ["curl"]
		},
		"text/vnd.curl.dcurl": {
			source: "apache",
			extensions: ["dcurl"]
		},
		"text/vnd.curl.mcurl": {
			source: "apache",
			extensions: ["mcurl"]
		},
		"text/vnd.curl.scurl": {
			source: "apache",
			extensions: ["scurl"]
		},
		"text/vnd.debian.copyright": {
			source: "iana",
			charset: "UTF-8"
		},
		"text/vnd.dmclientscript": { source: "iana" },
		"text/vnd.dvb.subtitle": {
			source: "iana",
			extensions: ["sub"]
		},
		"text/vnd.esmertec.theme-descriptor": {
			source: "iana",
			charset: "UTF-8"
		},
		"text/vnd.exchangeable": { source: "iana" },
		"text/vnd.familysearch.gedcom": {
			source: "iana",
			extensions: ["ged"]
		},
		"text/vnd.ficlab.flt": { source: "iana" },
		"text/vnd.fly": {
			source: "iana",
			extensions: ["fly"]
		},
		"text/vnd.fmi.flexstor": {
			source: "iana",
			extensions: ["flx"]
		},
		"text/vnd.gml": { source: "iana" },
		"text/vnd.graphviz": {
			source: "iana",
			extensions: ["gv"]
		},
		"text/vnd.hans": { source: "iana" },
		"text/vnd.hgl": { source: "iana" },
		"text/vnd.in3d.3dml": {
			source: "iana",
			extensions: ["3dml"]
		},
		"text/vnd.in3d.spot": {
			source: "iana",
			extensions: ["spot"]
		},
		"text/vnd.iptc.newsml": { source: "iana" },
		"text/vnd.iptc.nitf": { source: "iana" },
		"text/vnd.latex-z": { source: "iana" },
		"text/vnd.motorola.reflex": { source: "iana" },
		"text/vnd.ms-mediapackage": { source: "iana" },
		"text/vnd.net2phone.commcenter.command": { source: "iana" },
		"text/vnd.radisys.msml-basic-layout": { source: "iana" },
		"text/vnd.senx.warpscript": { source: "iana" },
		"text/vnd.si.uricatalogue": { source: "apache" },
		"text/vnd.sosi": { source: "iana" },
		"text/vnd.sun.j2me.app-descriptor": {
			source: "iana",
			charset: "UTF-8",
			extensions: ["jad"]
		},
		"text/vnd.trolltech.linguist": {
			source: "iana",
			charset: "UTF-8"
		},
		"text/vnd.vcf": { source: "iana" },
		"text/vnd.wap.si": { source: "iana" },
		"text/vnd.wap.sl": { source: "iana" },
		"text/vnd.wap.wml": {
			source: "iana",
			extensions: ["wml"]
		},
		"text/vnd.wap.wmlscript": {
			source: "iana",
			extensions: ["wmls"]
		},
		"text/vnd.zoo.kcl": { source: "iana" },
		"text/vtt": {
			source: "iana",
			charset: "UTF-8",
			compressible: !0,
			extensions: ["vtt"]
		},
		"text/wgsl": {
			source: "iana",
			extensions: ["wgsl"]
		},
		"text/x-asm": {
			source: "apache",
			extensions: ["s", "asm"]
		},
		"text/x-c": {
			source: "apache",
			extensions: [
				"c",
				"cc",
				"cxx",
				"cpp",
				"h",
				"hh",
				"dic"
			]
		},
		"text/x-component": {
			source: "nginx",
			extensions: ["htc"]
		},
		"text/x-fortran": {
			source: "apache",
			extensions: [
				"f",
				"for",
				"f77",
				"f90"
			]
		},
		"text/x-gwt-rpc": { compressible: !0 },
		"text/x-handlebars-template": { extensions: ["hbs"] },
		"text/x-java-source": {
			source: "apache",
			extensions: ["java"]
		},
		"text/x-jquery-tmpl": { compressible: !0 },
		"text/x-lua": { extensions: ["lua"] },
		"text/x-markdown": {
			compressible: !0,
			extensions: ["mkd"]
		},
		"text/x-nfo": {
			source: "apache",
			extensions: ["nfo"]
		},
		"text/x-opml": {
			source: "apache",
			extensions: ["opml"]
		},
		"text/x-org": {
			compressible: !0,
			extensions: ["org"]
		},
		"text/x-pascal": {
			source: "apache",
			extensions: ["p", "pas"]
		},
		"text/x-processing": {
			compressible: !0,
			extensions: ["pde"]
		},
		"text/x-sass": { extensions: ["sass"] },
		"text/x-scss": { extensions: ["scss"] },
		"text/x-setext": {
			source: "apache",
			extensions: ["etx"]
		},
		"text/x-sfv": {
			source: "apache",
			extensions: ["sfv"]
		},
		"text/x-suse-ymp": {
			compressible: !0,
			extensions: ["ymp"]
		},
		"text/x-uuencode": {
			source: "apache",
			extensions: ["uu"]
		},
		"text/x-vcalendar": {
			source: "apache",
			extensions: ["vcs"]
		},
		"text/x-vcard": {
			source: "apache",
			extensions: ["vcf"]
		},
		"text/xml": {
			source: "iana",
			compressible: !0,
			extensions: ["xml"]
		},
		"text/xml-external-parsed-entity": { source: "iana" },
		"text/yaml": {
			compressible: !0,
			extensions: ["yaml", "yml"]
		},
		"video/1d-interleaved-parityfec": { source: "iana" },
		"video/3gpp": {
			source: "iana",
			extensions: ["3gp", "3gpp"]
		},
		"video/3gpp-tt": { source: "iana" },
		"video/3gpp2": {
			source: "iana",
			extensions: ["3g2"]
		},
		"video/av1": { source: "iana" },
		"video/bmpeg": { source: "iana" },
		"video/bt656": { source: "iana" },
		"video/celb": { source: "iana" },
		"video/dv": { source: "iana" },
		"video/encaprtp": { source: "iana" },
		"video/evc": { source: "iana" },
		"video/ffv1": { source: "iana" },
		"video/flexfec": { source: "iana" },
		"video/h261": {
			source: "iana",
			extensions: ["h261"]
		},
		"video/h263": {
			source: "iana",
			extensions: ["h263"]
		},
		"video/h263-1998": { source: "iana" },
		"video/h263-2000": { source: "iana" },
		"video/h264": {
			source: "iana",
			extensions: ["h264"]
		},
		"video/h264-rcdo": { source: "iana" },
		"video/h264-svc": { source: "iana" },
		"video/h265": { source: "iana" },
		"video/h266": { source: "iana" },
		"video/iso.segment": {
			source: "iana",
			extensions: ["m4s"]
		},
		"video/jpeg": {
			source: "iana",
			extensions: ["jpgv"]
		},
		"video/jpeg2000": { source: "iana" },
		"video/jpm": {
			source: "apache",
			extensions: ["jpm", "jpgm"]
		},
		"video/jxsv": { source: "iana" },
		"video/lottie+json": {
			source: "iana",
			compressible: !0
		},
		"video/matroska": { source: "iana" },
		"video/matroska-3d": { source: "iana" },
		"video/mj2": {
			source: "iana",
			extensions: ["mj2", "mjp2"]
		},
		"video/mp1s": { source: "iana" },
		"video/mp2p": { source: "iana" },
		"video/mp2t": {
			source: "iana",
			extensions: [
				"ts",
				"m2t",
				"m2ts",
				"mts"
			]
		},
		"video/mp4": {
			source: "iana",
			compressible: !1,
			extensions: [
				"mp4",
				"mp4v",
				"mpg4"
			]
		},
		"video/mp4v-es": { source: "iana" },
		"video/mpeg": {
			source: "iana",
			compressible: !1,
			extensions: [
				"mpeg",
				"mpg",
				"mpe",
				"m1v",
				"m2v"
			]
		},
		"video/mpeg4-generic": { source: "iana" },
		"video/mpv": { source: "iana" },
		"video/nv": { source: "iana" },
		"video/ogg": {
			source: "iana",
			compressible: !1,
			extensions: ["ogv"]
		},
		"video/parityfec": { source: "iana" },
		"video/pointer": { source: "iana" },
		"video/quicktime": {
			source: "iana",
			compressible: !1,
			extensions: ["qt", "mov"]
		},
		"video/raptorfec": { source: "iana" },
		"video/raw": { source: "iana" },
		"video/rtp-enc-aescm128": { source: "iana" },
		"video/rtploopback": { source: "iana" },
		"video/rtx": { source: "iana" },
		"video/scip": { source: "iana" },
		"video/smpte291": { source: "iana" },
		"video/smpte292m": { source: "iana" },
		"video/ulpfec": { source: "iana" },
		"video/vc1": { source: "iana" },
		"video/vc2": { source: "iana" },
		"video/vnd.cctv": { source: "iana" },
		"video/vnd.dece.hd": {
			source: "iana",
			extensions: ["uvh", "uvvh"]
		},
		"video/vnd.dece.mobile": {
			source: "iana",
			extensions: ["uvm", "uvvm"]
		},
		"video/vnd.dece.mp4": { source: "iana" },
		"video/vnd.dece.pd": {
			source: "iana",
			extensions: ["uvp", "uvvp"]
		},
		"video/vnd.dece.sd": {
			source: "iana",
			extensions: ["uvs", "uvvs"]
		},
		"video/vnd.dece.video": {
			source: "iana",
			extensions: ["uvv", "uvvv"]
		},
		"video/vnd.directv.mpeg": { source: "iana" },
		"video/vnd.directv.mpeg-tts": { source: "iana" },
		"video/vnd.dlna.mpeg-tts": { source: "iana" },
		"video/vnd.dvb.file": {
			source: "iana",
			extensions: ["dvb"]
		},
		"video/vnd.fvt": {
			source: "iana",
			extensions: ["fvt"]
		},
		"video/vnd.hns.video": { source: "iana" },
		"video/vnd.iptvforum.1dparityfec-1010": { source: "iana" },
		"video/vnd.iptvforum.1dparityfec-2005": { source: "iana" },
		"video/vnd.iptvforum.2dparityfec-1010": { source: "iana" },
		"video/vnd.iptvforum.2dparityfec-2005": { source: "iana" },
		"video/vnd.iptvforum.ttsavc": { source: "iana" },
		"video/vnd.iptvforum.ttsmpeg2": { source: "iana" },
		"video/vnd.motorola.video": { source: "iana" },
		"video/vnd.motorola.videop": { source: "iana" },
		"video/vnd.mpegurl": {
			source: "iana",
			extensions: ["mxu", "m4u"]
		},
		"video/vnd.ms-playready.media.pyv": {
			source: "iana",
			extensions: ["pyv"]
		},
		"video/vnd.nokia.interleaved-multimedia": { source: "iana" },
		"video/vnd.nokia.mp4vr": { source: "iana" },
		"video/vnd.nokia.videovoip": { source: "iana" },
		"video/vnd.objectvideo": { source: "iana" },
		"video/vnd.planar": { source: "iana" },
		"video/vnd.radgamettools.bink": { source: "iana" },
		"video/vnd.radgamettools.smacker": { source: "apache" },
		"video/vnd.sealed.mpeg1": { source: "iana" },
		"video/vnd.sealed.mpeg4": { source: "iana" },
		"video/vnd.sealed.swf": { source: "iana" },
		"video/vnd.sealedmedia.softseal.mov": { source: "iana" },
		"video/vnd.uvvu.mp4": {
			source: "iana",
			extensions: ["uvu", "uvvu"]
		},
		"video/vnd.vivo": {
			source: "iana",
			extensions: ["viv"]
		},
		"video/vnd.youtube.yt": { source: "iana" },
		"video/vp8": { source: "iana" },
		"video/vp9": { source: "iana" },
		"video/webm": {
			source: "apache",
			compressible: !1,
			extensions: ["webm"]
		},
		"video/x-f4v": {
			source: "apache",
			extensions: ["f4v"]
		},
		"video/x-fli": {
			source: "apache",
			extensions: ["fli"]
		},
		"video/x-flv": {
			source: "apache",
			compressible: !1,
			extensions: ["flv"]
		},
		"video/x-m4v": {
			source: "apache",
			extensions: ["m4v"]
		},
		"video/x-matroska": {
			source: "apache",
			compressible: !1,
			extensions: [
				"mkv",
				"mk3d",
				"mks"
			]
		},
		"video/x-mng": {
			source: "apache",
			extensions: ["mng"]
		},
		"video/x-ms-asf": {
			source: "apache",
			extensions: ["asf", "asx"]
		},
		"video/x-ms-vob": {
			source: "apache",
			extensions: ["vob"]
		},
		"video/x-ms-wm": {
			source: "apache",
			extensions: ["wm"]
		},
		"video/x-ms-wmv": {
			source: "apache",
			compressible: !1,
			extensions: ["wmv"]
		},
		"video/x-ms-wmx": {
			source: "apache",
			extensions: ["wmx"]
		},
		"video/x-ms-wvx": {
			source: "apache",
			extensions: ["wvx"]
		},
		"video/x-msvideo": {
			source: "apache",
			extensions: ["avi"]
		},
		"video/x-sgi-movie": {
			source: "apache",
			extensions: ["movie"]
		},
		"video/x-smv": {
			source: "apache",
			extensions: ["smv"]
		},
		"x-conference/x-cooltalk": {
			source: "apache",
			extensions: ["ice"]
		},
		"x-shader/x-fragment": { compressible: !0 },
		"x-shader/x-vertex": { compressible: !0 }
	};
})), Ze = /* @__PURE__ */ i(((e, n) => {
	n.exports = (Xe(), t(Je).default);
})), Qe = /* @__PURE__ */ i(((e, t) => {
	function n(e) {
		if (typeof e != "string") throw TypeError("Path must be a string. Received " + JSON.stringify(e));
	}
	function r(e, t) {
		for (var n = "", r = 0, i = -1, a = 0, o, s = 0; s <= e.length; ++s) {
			if (s < e.length) o = e.charCodeAt(s);
			else if (o === 47) break;
			else o = 47;
			if (o === 47) {
				if (!(i === s - 1 || a === 1)) if (i !== s - 1 && a === 2) {
					if (n.length < 2 || r !== 2 || n.charCodeAt(n.length - 1) !== 46 || n.charCodeAt(n.length - 2) !== 46) {
						if (n.length > 2) {
							var c = n.lastIndexOf("/");
							if (c !== n.length - 1) {
								c === -1 ? (n = "", r = 0) : (n = n.slice(0, c), r = n.length - 1 - n.lastIndexOf("/")), i = s, a = 0;
								continue;
							}
						} else if (n.length === 2 || n.length === 1) {
							n = "", r = 0, i = s, a = 0;
							continue;
						}
					}
					t && (n.length > 0 ? n += "/.." : n = "..", r = 2);
				} else n.length > 0 ? n += "/" + e.slice(i + 1, s) : n = e.slice(i + 1, s), r = s - i - 1;
				i = s, a = 0;
			} else o === 46 && a !== -1 ? ++a : a = -1;
		}
		return n;
	}
	function i(e, t) {
		var n = t.dir || t.root, r = t.base || (t.name || "") + (t.ext || "");
		return n ? n === t.root ? n + r : n + e + r : r;
	}
	var a = {
		resolve: function() {
			for (var e = "", t = !1, i, a = arguments.length - 1; a >= -1 && !t; a--) {
				var o;
				a >= 0 ? o = arguments[a] : (i === void 0 && (i = process.cwd()), o = i), n(o), o.length !== 0 && (e = o + "/" + e, t = o.charCodeAt(0) === 47);
			}
			return e = r(e, !t), t ? e.length > 0 ? "/" + e : "/" : e.length > 0 ? e : ".";
		},
		normalize: function(e) {
			if (n(e), e.length === 0) return ".";
			var t = e.charCodeAt(0) === 47, i = e.charCodeAt(e.length - 1) === 47;
			return e = r(e, !t), e.length === 0 && !t && (e = "."), e.length > 0 && i && (e += "/"), t ? "/" + e : e;
		},
		isAbsolute: function(e) {
			return n(e), e.length > 0 && e.charCodeAt(0) === 47;
		},
		join: function() {
			if (arguments.length === 0) return ".";
			for (var e, t = 0; t < arguments.length; ++t) {
				var r = arguments[t];
				n(r), r.length > 0 && (e === void 0 ? e = r : e += "/" + r);
			}
			return e === void 0 ? "." : a.normalize(e);
		},
		relative: function(e, t) {
			if (n(e), n(t), e === t || (e = a.resolve(e), t = a.resolve(t), e === t)) return "";
			for (var r = 1; r < e.length && e.charCodeAt(r) === 47; ++r);
			for (var i = e.length, o = i - r, s = 1; s < t.length && t.charCodeAt(s) === 47; ++s);
			for (var c = t.length - s, l = o < c ? o : c, u = -1, d = 0; d <= l; ++d) {
				if (d === l) {
					if (c > l) {
						if (t.charCodeAt(s + d) === 47) return t.slice(s + d + 1);
						if (d === 0) return t.slice(s + d);
					} else o > l && (e.charCodeAt(r + d) === 47 ? u = d : d === 0 && (u = 0));
					break;
				}
				var f = e.charCodeAt(r + d);
				if (f !== t.charCodeAt(s + d)) break;
				f === 47 && (u = d);
			}
			var p = "";
			for (d = r + u + 1; d <= i; ++d) (d === i || e.charCodeAt(d) === 47) && (p.length === 0 ? p += ".." : p += "/..");
			return p.length > 0 ? p + t.slice(s + u) : (s += u, t.charCodeAt(s) === 47 && ++s, t.slice(s));
		},
		_makeLong: function(e) {
			return e;
		},
		dirname: function(e) {
			if (n(e), e.length === 0) return ".";
			for (var t = e.charCodeAt(0), r = t === 47, i = -1, a = !0, o = e.length - 1; o >= 1; --o) if (t = e.charCodeAt(o), t === 47) {
				if (!a) {
					i = o;
					break;
				}
			} else a = !1;
			return i === -1 ? r ? "/" : "." : r && i === 1 ? "//" : e.slice(0, i);
		},
		basename: function(e, t) {
			if (t !== void 0 && typeof t != "string") throw TypeError("\"ext\" argument must be a string");
			n(e);
			var r = 0, i = -1, a = !0, o;
			if (t !== void 0 && t.length > 0 && t.length <= e.length) {
				if (t.length === e.length && t === e) return "";
				var s = t.length - 1, c = -1;
				for (o = e.length - 1; o >= 0; --o) {
					var l = e.charCodeAt(o);
					if (l === 47) {
						if (!a) {
							r = o + 1;
							break;
						}
					} else c === -1 && (a = !1, c = o + 1), s >= 0 && (l === t.charCodeAt(s) ? --s === -1 && (i = o) : (s = -1, i = c));
				}
				return r === i ? i = c : i === -1 && (i = e.length), e.slice(r, i);
			} else {
				for (o = e.length - 1; o >= 0; --o) if (e.charCodeAt(o) === 47) {
					if (!a) {
						r = o + 1;
						break;
					}
				} else i === -1 && (a = !1, i = o + 1);
				return i === -1 ? "" : e.slice(r, i);
			}
		},
		extname: function(e) {
			n(e);
			for (var t = -1, r = 0, i = -1, a = !0, o = 0, s = e.length - 1; s >= 0; --s) {
				var c = e.charCodeAt(s);
				if (c === 47) {
					if (!a) {
						r = s + 1;
						break;
					}
					continue;
				}
				i === -1 && (a = !1, i = s + 1), c === 46 ? t === -1 ? t = s : o !== 1 && (o = 1) : t !== -1 && (o = -1);
			}
			return t === -1 || i === -1 || o === 0 || o === 1 && t === i - 1 && t === r + 1 ? "" : e.slice(t, i);
		},
		format: function(e) {
			if (typeof e != "object" || !e) throw TypeError("The \"pathObject\" argument must be of type Object. Received type " + typeof e);
			return i("/", e);
		},
		parse: function(e) {
			n(e);
			var t = {
				root: "",
				dir: "",
				base: "",
				ext: "",
				name: ""
			};
			if (e.length === 0) return t;
			var r = e.charCodeAt(0), i = r === 47, a;
			i ? (t.root = "/", a = 1) : a = 0;
			for (var o = -1, s = 0, c = -1, l = !0, u = e.length - 1, d = 0; u >= a; --u) {
				if (r = e.charCodeAt(u), r === 47) {
					if (!l) {
						s = u + 1;
						break;
					}
					continue;
				}
				c === -1 && (l = !1, c = u + 1), r === 46 ? o === -1 ? o = u : d !== 1 && (d = 1) : o !== -1 && (d = -1);
			}
			return o === -1 || c === -1 || d === 0 || d === 1 && o === c - 1 && o === s + 1 ? c !== -1 && (s === 0 && i ? t.base = t.name = e.slice(1, c) : t.base = t.name = e.slice(s, c)) : (s === 0 && i ? (t.name = e.slice(1, o), t.base = e.slice(1, c)) : (t.name = e.slice(s, o), t.base = e.slice(s, c)), t.ext = e.slice(o, c)), s > 0 ? t.dir = e.slice(0, s - 1) : i && (t.dir = "/"), t;
		},
		sep: "/",
		delimiter: ":",
		win32: null,
		posix: null
	};
	a.posix = a, t.exports = a;
})), $e = /* @__PURE__ */ i(((e, t) => {
	var n = {
		"prs.": 100,
		"x-": 200,
		"x.": 300,
		"vnd.": 400,
		default: 900
	}, r = {
		nginx: 10,
		apache: 20,
		iana: 40,
		default: 30
	}, i = {
		application: 1,
		font: 2,
		audio: 2,
		video: 3,
		default: 0
	};
	t.exports = function(e, t = "default") {
		if (e === "application/octet-stream") return 0;
		let [a, o] = e.split("/"), s = n[o.replace(/(\.|x-).*/, "$1")] || n.default, c = r[t] || r.default, l = i[a] || i.default, u = 1 - e.length / 100;
		return s + c + l + u;
	};
})), et = /* @__PURE__ */ i(((e) => {
	var t = Ze(), n = Qe().extname, r = $e(), i = /^\s*([^;\s]*)(?:;|\s|$)/, a = /^text\//i;
	e.charset = o, e.charsets = { lookup: o }, e.contentType = s, e.extension = c, e.extensions = Object.create(null), e.lookup = l, e.types = Object.create(null), e._extensionConflicts = [], u(e.extensions, e.types);
	function o(e) {
		if (!e || typeof e != "string") return !1;
		var n = i.exec(e), r = n && t[n[1].toLowerCase()];
		return r && r.charset ? r.charset : n && a.test(n[1]) ? "UTF-8" : !1;
	}
	function s(t) {
		if (!t || typeof t != "string") return !1;
		var n = t.indexOf("/") === -1 ? e.lookup(t) : t;
		if (!n) return !1;
		if (n.indexOf("charset") === -1) {
			var r = e.charset(n);
			r && (n += "; charset=" + r.toLowerCase());
		}
		return n;
	}
	function c(t) {
		if (!t || typeof t != "string") return !1;
		var n = i.exec(t), r = n && e.extensions[n[1].toLowerCase()];
		return !r || !r.length ? !1 : r[0];
	}
	function l(t) {
		if (!t || typeof t != "string") return !1;
		var r = n("x." + t).toLowerCase().slice(1);
		return r && e.types[r] || !1;
	}
	function u(n, r) {
		Object.keys(t).forEach(function(i) {
			var a = t[i].extensions;
			if (!(!a || !a.length)) {
				n[i] = a;
				for (var o = 0; o < a.length; o++) {
					var s = a[o];
					r[s] = d(s, r[s], i);
					let t = f(s, r[s], i);
					t !== r[s] && e._extensionConflicts.push([
						s,
						t,
						r[s]
					]);
				}
			}
		});
	}
	function d(e, n, i) {
		return (n ? r(n, t[n].source) : 0) > (i ? r(i, t[i].source) : 0) ? n : i;
	}
	function f(n, r, i) {
		var a = [
			"nginx",
			"apache",
			void 0,
			"iana"
		], o = r ? a.indexOf(t[r].source) : 0, s = i ? a.indexOf(t[i].source) : 0;
		return e.types[c] !== "application/octet-stream" && (o > s || o === s && e.types[c]?.slice(0, 12) === "application/") || o > s ? r : i;
	}
})), V = /* @__PURE__ */ e(He()), tt = /* @__PURE__ */ e(et());
function nt(e, t, n) {
	let r = function(e) {
		return e.split("\n").map((e) => e.trim()).filter((e) => e && e[0] !== "#");
	}, i = function(e) {
		e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy";
	}, a = function(e) {
		e.preventDefault(), e.stopPropagation(), I("dragenter event dropEffect: " + e.dataTransfer.dropEffect), this.localStyle && (this.savedStyle ||= P.dragEvent), e.dataTransfer.dropEffect = "link", I("dragenter event dropEffect 2: " + e.dataTransfer.dropEffect);
	}, o = function(e) {
		e.stopPropagation(), I("dragleave event dropEffect: " + e.dataTransfer.dropEffect), this.savedStyle ? this.localStyle = this.savedStyle : this.localStyle = P.dropEvent;
	}, s = function(e) {
		e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), I("Drop event. dropEffect: " + e.dataTransfer.dropEffect), I("Drop event. types: " + (e.dataTransfer.types ? e.dataTransfer.types.join(", ") : "NOPE"));
		let i = null, a;
		if (e.dataTransfer.types) {
			for (let t = 0; t < e.dataTransfer.types.length; t++) {
				let o = e.dataTransfer.types[t];
				if (o === "text/uri-list") i = r(e.dataTransfer.getData(o)), I("Dropped text/uri-list: " + i);
				else if (o === "text/plain") a = e.dataTransfer.getData(o);
				else if (o === "Files" && n) {
					let t = e.dataTransfer.files;
					for (let e = 0; t[e]; e++) {
						let n = t[e];
						I("Filename: " + n.name + ", type: " + (n.type || "n/a") + " size: " + n.size + " bytes, last modified: " + (n.lastModifiedDate ? n.lastModifiedDate.toLocaleDateString() : "n/a"));
					}
					n(t);
				}
			}
			let t = a ? a.trim() : "";
			i === null && t && t.slice(0, 4) === "http" && (i = [t], I("Warning: Poor man's drop: using text for URI"));
		} else i = r(e.dataTransfer.getData("Text")), I("WARNING non-standard drop event: " + i[0]);
		return I("Dropped URI list (2): " + i), i && t(i), this.localStyle = P.restoreStyle, !1;
	};
	(function(e) {
		e || I("@@@ addTargetListeners: ele " + e), e.addEventListener("dragover", i), e.addEventListener("dragenter", a), e.addEventListener("dragleave", o), e.addEventListener("drop", s);
	})(e, t);
}
function rt(e, t) {
	e.setAttribute("draggable", "true"), e.addEventListener("dragstart", function(n) {
		e.style.fontWeight = "bold", n.dataTransfer.setData("text/uri-list", t.uri), n.dataTransfer.setData("text/plain", t.uri), n.dataTransfer.setData("text/html", e.outerHTML), I("Dragstart: " + e + " -> " + t + "de: " + n.dataTransfer.dropEffect);
	}, !1), e.addEventListener("drag", function(e) {
		e.preventDefault(), e.stopPropagation();
	}, !1), e.addEventListener("dragend", function(n) {
		e.style.fontWeight = "normal", I("Dragend dropeffect: " + n.dataTransfer.dropEffect), I("Dragend: " + e + " -> " + t);
	}, !1);
}
function it(e, t, n, r, i) {
	for (let a = 0; t[a]; a++) {
		let o = t[a];
		I(" dropped: Filename: " + o.name + ", type: " + (o.type || "n/a") + " size: " + o.size + " bytes, last modified: " + (o.lastModifiedDate ? o.lastModifiedDate.toLocaleDateString() : "n/a"));
		let s = new FileReader();
		s.onload = function(t) {
			return function(a) {
				let o = a.target.result, s = "";
				I(" File read byteLength : " + o.byteLength);
				let c = t.type;
				if (!t.type || t.type === "") {
					if (c = tt.lookup(t.name), !c) {
						let e = "Filename needs to have an extension which gives a type we know: " + t.name;
						throw I(e), alert(e), Error(e);
					}
				} else {
					let e = tt.extension(t.type);
					e && e !== "false" && !t.name.endsWith("." + e) && t.type !== tt.lookup(t.name) && (s = "_." + e);
				}
				let l = t.type.startsWith("image/") && r || n, u = l + (l.endsWith("/") ? "" : "/") + encodeURIComponent(t.name) + s;
				e.webOperation("PUT", u, {
					data: o,
					contentType: c
				}).then((e) => {
					I(" Upload: put OK: " + u), i(t, u);
				}, (e) => {
					let t = " Upload: FAIL " + u + ", Error: " + e;
					throw I(t), alert(t), Error(t);
				});
			};
		}(o), s.readAsArrayBuffer(o);
	}
}
//#endregion
//#region src/widgets/error.ts
function H(e, t, n, r) {
	let i = e.createElement("div"), a = r || t instanceof Error ? t : null;
	return a ? (console.error(`errorMessageBlock: ${a} at: ${a.stack || "??"}`, a), i.textContent = a.message) : i.textContent = t, i.appendChild(Ut(e, () => {
		i.parentNode && i.parentNode.removeChild(i);
	})).style = P.errorCancelButton, i.setAttribute("style", P.errorMessageBlockStyle), i.style.backgroundColor = n || N.defaultErrorBackgroundColor, i;
}
//#endregion
//#region src/lib/iconBase.ts
var U = typeof module < "u" && module.scriptURI ? {
	iconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf("/")) + "/icons/",
	originalIconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf("/")) + "/originalIcons/"
} : typeof $SolidTestEnvironment < "u" && $SolidTestEnvironment.iconBase ? {
	iconBase: $SolidTestEnvironment.iconBase,
	originalIconBase: $SolidTestEnvironment.originalIconBase
} : {
	iconBase: "https://solidos.github.io/solid-ui/src/icons/",
	originalIconBase: "https://solidos.github.io/solid-ui/src/originalIcons/"
};
I("   icons.iconBase is set to : " + U.iconBase);
var at = U.iconBase, ot = U.originalIconBase, W = w.store, st = class {
	constructor(e, t, n, r) {
		this.options = r || {}, this.element = e, this.typeIndex = t, this.groupPickedCb = n, this.selectedgroup = this.options.selectedgroup, this.onSelectGroup = this.onSelectGroup.bind(this);
	}
	render() {
		let e = document.createElement("div");
		if (e.style.maxWidth = "350px", e.style.minHeight = "200px", e.style.outline = "1px solid black", e.style.display = "flex", this.selectedgroup) {
			e.style.flexDirection = "column";
			let t = document.createElement("div");
			new lt(t, this.selectedgroup).render();
			let n = document.createElement("button");
			n.textContent = (0, V.default)("Change group"), n.addEventListener("click", (e) => {
				this.selectedgroup = null, this.render();
			}), e.appendChild(t), e.appendChild(n);
		} else this.findAddressBook(this.typeIndex).then(({ book: t }) => {
			let n = document.createElement("button");
			n.textContent = (0, V.default)("Pick an existing group"), n.style.margin = "auto", n.addEventListener("click", (n) => {
				new ct(e, t, this.onSelectGroup).render();
			});
			let r = document.createElement("button");
			r.textContent = (0, V.default)("Create a new group"), r.style.margin = "auto", r.addEventListener("click", (e) => {
				this.createNewGroup(t, this.options.defaultNewGroupName).then(({ group: e }) => {
					new ut(this.element, t, e, this.onSelectGroup).render();
				}).catch((e) => {
					this.element.appendChild(H(document, (0, V.default)(`Error creating a new group. (${e})`)));
				});
			}), e.appendChild(n), e.appendChild(r), this.element.innerHTML = "", this.element.appendChild(e);
		}).catch((e) => {
			this.element.appendChild(H(document, (0, V.default)(`Could find your groups. (${e})`)));
		});
		return this.element.innerHTML = "", this.element.appendChild(e), this;
	}
	findAddressBook(e) {
		return new Promise((t, n) => {
			W.fetcher.nowOrWhenFetched(e, (r, i) => {
				if (!r) return n(i);
				let a = W.any(null, E.solid("forClass"), E.vcard("AddressBook"));
				if (!a) return n(/* @__PURE__ */ Error("no address book registered in the solid type index " + e));
				let o = W.any(a, E.solid("instance"));
				if (!o) return n(/* @__PURE__ */ Error("incomplete address book registration"));
				W.fetcher.load(o).then(function(e) {
					return t({ book: o });
				}).catch(function(e) {
					return n(/* @__PURE__ */ Error("Could not load address book " + e));
				});
			});
		});
	}
	createNewGroup(e, t) {
		let { groupIndex: n, groupContainer: r } = mt(e), i = _(`${r.uri}${Ke().slice(0, 8)}.ttl#this`), a = t || "Untitled Group", s = [i.doc(), n].map((t) => {
			let r = o(i, E.rdf("type"), E.vcard("Group"), t), s = o(i, E.vcard("fn"), a, i.doc(), t), c = o(e, E.vcard("includesGroup"), i, t), l = t.equals(n) ? [
				r,
				s,
				c
			] : [r, s];
			return pt(t.uri, { toIns: l }).then(() => {
				l.forEach((e) => {
					W.add(e);
				});
			});
		});
		return Promise.all(s).then(() => ({ group: i })).catch((e) => {
			throw I("Could not create new group.  PATCH failed " + e), Error(`Couldn't create new group.  PATCH failed for (${e.xhr ? e.xhr.responseURL : ""} )`);
		});
	}
	onSelectGroup(e) {
		this.selectedgroup = e, this.groupPickedCb(e), this.render();
	}
}, ct = class {
	constructor(e, t, n) {
		this.element = e, this.book = t, this.onSelectGroup = n;
	}
	render() {
		return this.loadGroups().then((e) => {
			let t = document.createElement("div");
			t.style.display = "flex", t.style.flexDirection = "column", e.forEach((e) => {
				let n = document.createElement("button");
				n.addEventListener("click", this.handleClickGroup(e)), new lt(n, e).render(), t.appendChild(n);
			}), this.element.innerHTML = "", this.element.appendChild(t);
		}).catch((e) => {
			this.element.appendChild(H(document, (0, V.default)(`There was an error loading your groups. (${e})`)));
		}), this;
	}
	loadGroups() {
		return new Promise((e, t) => {
			let { groupIndex: n } = mt(this.book);
			W.fetcher.nowOrWhenFetched(n, (n, r) => n ? e(W.each(this.book, E.vcard("includesGroup"))) : t(r));
		});
	}
	handleClickGroup(e) {
		return (t) => {
			this.onSelectGroup(e);
		};
	}
}, lt = class {
	constructor(e, t) {
		this.element = e, this.group = t;
	}
	render() {
		let e = document.createElement("div");
		return e.textContent = (0, V.default)(ft(this.group, E.vcard("fn"), `[${this.group.value}]`)), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
}, ut = class {
	constructor(e, t, n, r, i) {
		this.element = e, this.book = t, this.group = n, this.onGroupChanged = (e, t, n) => {
			i && i(e, t, n);
		}, this.groupChangedCb = i, this.doneBuildingCb = r;
	}
	refresh() {}
	render() {
		let e = document.createElement("div");
		e.style.maxWidth = "350px", e.style.minHeight = "200px", e.style.outline = "1px solid black", e.style.display = "flex", e.style.flexDirection = "column", nt(e, (e) => {
			e.forEach((e) => {
				this.add(e).catch((e) => {
					this.element.appendChild(H(document, (0, V.default)(`Could not add the given WebId. (${e})`)));
				});
			});
		});
		let t = document.createElement("input");
		t.type = "text", t.value = ft(this.group, E.vcard("fn"), "Untitled Group"), t.addEventListener("change", (e) => {
			this.setGroupName(e.target.value).catch((e) => {
				this.element.appendChild(H(document, `Error changing group name. (${e})`));
			});
		});
		let n = document.createElement("label");
		if (n.textContent = (0, V.default)("Group Name:"), n.appendChild(t), e.appendChild(n), W.any(this.group, E.vcard("hasMember"))) W.match(this.group, E.vcard("hasMember")).forEach((t) => {
			let n = t.object, r = document.createElement("div");
			new dt(r, n, this.handleRemove(n)).render(), e.appendChild(r);
		});
		else {
			let t = document.createElement("p");
			t.textContent = V.default`
        To add someone to this group, drag and drop their WebID URL onto the box.
      `, e.appendChild(t);
		}
		let r = document.createElement("button");
		return r.textContent = (0, V.default)("Done"), r.addEventListener("click", (e) => {
			this.doneBuildingCb(this.group);
		}), e.appendChild(r), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
	add(e) {
		return new Promise((t, n) => {
			W.fetcher.nowOrWhenFetched(e, (r, i) => {
				if (!r) return this.onGroupChanged(i), n(i);
				let a = _(e), o = W.any(a, E.rdf("type"));
				return !o || !o.equals(E.foaf("Person")) ? n(/* @__PURE__ */ Error(`Only people supported right now. (tried to add something of type ${o.value})`)) : t(a);
			});
		}).then((e) => {
			let t = o(this.group, E.vcard("hasMember"), e);
			return W.holdsStatement(t) ? e : pt(this.group.doc().uri, { toIns: [t] }).then(() => {
				t.why = this.group.doc(), W.add(t), this.onGroupChanged(null, "added", e), this.render();
			});
		});
	}
	handleRemove(e) {
		return (t) => {
			let n = o(this.group, E.vcard("hasMember"), e);
			return pt(this.group.doc().uri, { toDel: [n] }).then(() => (W.remove(n), this.onGroupChanged(null, "removed", e), this.render(), !0)).catch((t) => {
				let n = W.any(e, E.foaf("name")), r = n && n.value ? `Could not remove ${n.value}. (${t})` : `Could not remove ${e.value}. (${t})`;
				throw Error(r);
			});
		};
	}
	setGroupName(e) {
		let { groupIndex: t } = mt(this.book), n = [this.group.doc(), t].map((t) => {
			let n = W.match(this.group, E.vcard("fn"), null, t), r = o(this.group, E.vcard("fn"), le(e));
			return pt(t.value, {
				toDel: n,
				toIns: [r]
			}).then((e) => {
				W.removeStatements(n), r.why = t, W.add(r);
			});
		});
		return Promise.all(n);
	}
}, dt = class {
	constructor(e, t, n) {
		this.webIdNode = t, this.element = e, this.handleRemove = n;
	}
	render() {
		let e = document.createElement("div");
		e.style.display = "flex";
		let t = ft(this.webIdNode, E.foaf("img"), at + "noun_15059.svg"), n = document.createElement("img");
		n.src = (0, V.default)(t), n.width = "50", n.height = "50", n.style.margin = "5px";
		let r = ft(this.webIdNode, E.foaf("name"), `[${this.webIdNode}]`), i = document.createElement("span");
		i.innerHTML = (0, V.default)(r), i.style.flexGrow = "1", i.style.margin = "auto 0";
		let a = document.createElement("button");
		return a.textContent = "Remove", a.addEventListener("click", (e) => this.handleRemove().catch((e) => {
			this.element.appendChild(H(document, (0, V.default)(`${e}`)));
		})), a.style.margin = "5px", e.appendChild(n), e.appendChild(i), e.appendChild(a), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
};
function ft(e, t, n) {
	let r = W.any(e, t);
	return r ? r.value : n;
}
function pt(e, { toDel: t, toIns: n }) {
	return new Promise((e, r) => {
		W.updater.update(t, n, (t, n, i) => {
			if (!n) return r(/* @__PURE__ */ Error(`PATCH failed for resource <${t}>: ${i}`));
			e();
		});
	});
}
function mt(e) {
	return {
		groupIndex: W.any(e, E.vcard("groupIndex")),
		groupContainer: W.sym(e.dir().uri + "Group/")
	};
}
//#endregion
//#region src/lib/newperson.js
var ht = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjAxNTcgOS4yNzM2M0MxNC4yOTU0IDguMzQwMzEgMTUuMTI4OCA2LjgyOTg0IDE1LjEyODggNS4xMjgyQzE1LjEyODggMi4zMDA1MSAxMi44MjgzIDAgMTAuMDAwNiAwQzcuMTcyODkgMCA0Ljg3MjM4IDIuMzAwNTEgNC44NzIzOCA1LjEyODJDNC44NzIzOCA2LjgyOTg0IDUuNzA1NyA4LjM0MDMxIDYuOTg1NDcgOS4yNzM2M0MzLjgwNDIyIDEwLjQ5MSAxLjUzOTA2IDEzLjU3NTQgMS41MzkwNiAxNy4xNzk1QzEuNTM5MDYgMTguNzM0NyAyLjgwNDM0IDIwIDQuMzU5NTcgMjBIMTUuNjQxNkMxNy4xOTY4IDIwIDE4LjQ2MjEgMTguNzM0NyAxOC40NjIxIDE3LjE3OTVDMTguNDYyMSAxMy41NzU0IDE2LjE5NyAxMC40OTEgMTMuMDE1NyA5LjI3MzYzWk02LjQxMDg2IDUuMTI4MkM2LjQxMDg2IDMuMTQ4ODMgOC4wMjEyMSAxLjUzODQ4IDEwLjAwMDYgMS41Mzg0OEMxMS45OCAxLjUzODQ4IDEzLjU5MDMgMy4xNDg4MyAxMy41OTAzIDUuMTI4MkMxMy41OTAzIDcuMTA3NTggMTEuOTggOC43MTc5NyAxMC4wMDA2IDguNzE3OTdDOC4wMjEyMSA4LjcxNzk3IDYuNDEwODYgNy4xMDc1OCA2LjQxMDg2IDUuMTI4MlpNMTUuNjQxNiAxOC40NjE1SDQuMzU5NTdDMy42NTI2NiAxOC40NjE1IDMuMDc3NTQgMTcuODg2NCAzLjA3NzU0IDE3LjE3OTVDMy4wNzc1NCAxMy4zNjIgNi4xODMxNiAxMC4yNTY0IDEwLjAwMDYgMTAuMjU2NEMxMy44MTgxIDEwLjI1NjQgMTYuOTIzNyAxMy4zNjIgMTYuOTIzNyAxNy4xNzk1QzE2LjkyMzcgMTcuODg2NCAxNi4zNDg2IDE4LjQ2MTUgMTUuNjQxNiAxOC40NjE1WiIgZmlsbD0iIzMxNDE1OCIvPgo8L3N2Zz4K", gt = (e, t, n) => {
	let r = e.createElement("tr");
	return r.appendChild(e.createElement("td")).appendChild(t), r.subject = n, r;
}, _t = (e, t) => {
	e.addEventListener("click", t);
}, vt = (e, t, n) => {
	let r = t.appendChild(e.createElement("div"));
	r.setAttribute("style", P.imageDivStyle), r.appendChild(n), n.setAttribute("draggable", "false");
};
//#endregion
//#region src/widgets/buttons/iconLinks.ts
function yt(e, t, n) {
	let r = e.createElement("a");
	r.setAttribute("href", t.uri), t.uri.startsWith("http") && r.setAttribute("target", "_blank");
	let i = r.appendChild(e.createElement("img"));
	return i.setAttribute("src", n || ot + "go-to-this.png"), i.setAttribute("style", "margin: 0.3em;"), r;
}
var bt = (e, t, n) => {
	let r = yt(e, n);
	t.appendChild(r).classList.add("HoverControlHide"), t.appendChild(e.createElement("br"));
}, { iconBase: xt } = U, St = xt + "noun_1180156.svg", Ct = xt + "noun_1180158.svg";
function wt(e) {
	let t = e && e.statusArea || e && e.div || null;
	if (t) return t;
	let n = e && e.dom;
	if (!n && typeof document < "u" && (n = document), n) {
		let r = n.getElementsByTagName("body")[0];
		return t = n.createElement("div"), r.insertBefore(t, r.firstElementChild), e && (e.statusArea = t), t;
	}
	return null;
}
function Tt(e, t) {
	if (!t) return;
	let n = wt(e);
	I("Complaint: " + t), n ? n.appendChild(H(e && e.dom || document, t)) : alert(t);
}
function Et(e) {
	for (; e.firstChild;) e.removeChild(e.firstChild);
	return e;
}
function Dt(e) {
	let t = e.search(/logFile=/), n = e.search(/&rulesFile=/);
	return e.substring(t + 8, n);
}
function Ot(e, t) {
	if (!e) return "???";
	let n = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	];
	try {
		let r = (/* @__PURE__ */ new Date()).toISOString();
		return e.slice(0, 10) === r.slice(0, 10) && !t ? e.slice(11, 16) : e.slice(0, 4) === r.slice(0, 4) ? n[parseInt(e.slice(5, 7), 10) - 1] + " " + parseInt(e.slice(8, 10), 10) : e.slice(0, 10);
	} catch (e) {
		return "shortdate:" + e;
	}
}
function kt(e, t) {
	return t.split("{").map(function(t) {
		let n = t.split("}")[0];
		return t ? ("000" + (e["get" + n]() + ({ Month: 1 }[n] || 0))).slice(-({
			Milliseconds: 3,
			FullYear: 4
		}[n] || 2)) + t.split("}")[1] : "";
	}).join("");
}
function At() {
	return kt(/* @__PURE__ */ new Date(), "{FullYear}-{Month}-{Date}T{Hours}:{Minutes}:{Seconds}.{Milliseconds}");
}
function jt() {
	return kt(/* @__PURE__ */ new Date(), "{Hours}:{Minutes}:{Seconds}.{Milliseconds}");
}
function Mt(e, t) {
	let n = A, r = function(e) {
		let t = n.any(e, E.vcard("fn")) || n.any(e, E.foaf("name")) || n.any(e, E.vcard("organization-name"));
		return t ? t.value : null;
	}, i = t.sameTerm(E.foaf("Agent")) ? "Everyone" : r(t);
	if (e.textContent = i || F(t), !i && t.uri) {
		if (!n.fetcher) throw Error("kb has no fetcher");
		n.fetcher.nowOrWhenFetched(t.doc(), void 0, function(n) {
			e.textContent = r(t) || F(t);
		});
	}
}
function Nt(e, t) {
	return t.each(e, E.sioc("avatar")).concat(t.each(e, E.foaf("img"))).concat(t.each(e, E.vcard("logo"))).concat(t.each(e, E.vcard("hasPhoto"))).concat(t.each(e, E.vcard("photo"))).concat(t.each(e, E.foaf("depiction")));
}
var Pt = {
	"solid:AppProviderClass": "noun_144.svg",
	"solid:AppProvider": "noun_15177.svg",
	"solid:Pod": "noun_Cabinet_1434380.svg",
	"vcard:Group": "noun_339237.svg",
	"vcard:Organization": "noun_143899.svg",
	"vcard:Individual": ht,
	"schema:Person": ht,
	"foaf:Person": ht,
	"foaf:Agent": "noun_98053.svg",
	"acl:AuthenticatedAgent": "noun_99101.svg",
	"prov:SoftwareAgent": "noun_Robot_849764.svg",
	"vcard:AddressBook": "noun_15695.svg",
	"trip:Trip": "noun_581629.svg",
	"meeting:LongChat": "noun_1689339.svg",
	"meeting:Meeting": "noun_66617.svg",
	"meeting:Project": "noun_1036577.svg",
	"ui:Form": "noun_122196.svg",
	"rdfs:Class": "class-rectangle.svg",
	"rdf:Property": "property-diamond.svg",
	"owl:Ontology": "noun_classification_1479198.svg",
	"wf:Tracker": "noun_122196.svg",
	"wf:Task": "noun_17020_gray-tick.svg",
	"wf:Open": "noun_17020_sans-tick.svg",
	"wf:Closed": "noun_17020.svg"
};
function Ft(e) {
	let t = e.uri.split("#")[0], n = t.indexOf("//");
	if (n < 0) throw Error("This URI does not have a web site part (origin)");
	let r = t.indexOf("/", n + 2);
	return r < 0 ? t.slice(0) + "/" : t.slice(0, r + 1);
}
function It(e) {
	let t = xt;
	return typeof e != "string" && e.uri ? e.uri.split("/").length === 4 && !e.uri.split("/")[1] && !e.uri.split("/")[3] ? t + "noun_15177.svg" : e.uri.startsWith("message:") || e.uri.startsWith("mid:") ? t + "noun_480183.svg" : e.uri.startsWith("mailto:") ? t + "noun_567486.svg" : e.uri.startsWith("https:") && e.uri.indexOf("#") < 0 ? Ft(e) + "favicon.ico" : null : t + "noun_10636_grey.svg";
}
function Lt(e) {
	let t = A, n = xt;
	if (e.sameTerm(E.foaf("Agent")) || e.sameTerm(E.rdf("Resource"))) return n + "noun_98053.svg";
	let r = t.any(e, E.sioc("avatar")) || t.any(e, E.foaf("img")) || t.any(e, E.vcard("logo")) || t.any(e, E.vcard("hasPhoto")) || t.any(e, E.vcard("photo")) || t.any(e, E.foaf("depiction"));
	return r ? r.uri : null;
}
function Rt(e, t, n) {
	let r = A, i = Lt(t);
	if (i) return e.setAttribute("src", i), !0;
	let a = n[t.uri];
	if (a) return e.setAttribute("src", a), e.style = P.classIconStyle, !0;
	let o = It(t);
	if (o) return e.setAttribute("src", o), !0;
	let s = r.findTypeURIs(t);
	for (let t in s) if (n[t]) return e.setAttribute("src", n[t]), !1;
	return e.setAttribute("src", xt + "noun_10636_grey.svg"), !1;
}
function zt(e, t) {
	let n = A, r = {};
	for (let e in Pt) {
		let t = e.split(":")[0], n = e.split(":")[1], i = E[t](n), a = Pt[e];
		a.startsWith("data:") ? r[i.uri] = a : r[i.uri] = h(a, xt);
	}
	if (!Rt(e, t, r) && t.uri) {
		if (!n.fetcher) throw Error("kb has no fetcher");
		n.fetcher.nowOrWhenFetched(t.doc(), void 0, (n) => {
			n && Rt(e, t, r);
		});
	}
}
function Bt(e, t) {
	let n = e.createElement("img");
	if (n.style = P.iconStyle, n.setAttribute("src", xt + (function(e) {
		if (!e.uri) return !1;
		let t = e.uri.split("/");
		return t.length === 3 || t.length === 4 && t[3] === "";
	}(t) ? "noun_15177.svg" : "noun_681601.svg")), t.uri && t.uri.startsWith("https:") && t.uri.indexOf("#") < 0) {
		let r = e.createElement("object");
		return r.setAttribute("data", Ft(t) + "favicon.ico"), r.setAttribute("type", "image/x-icon"), r.appendChild(n), r;
	} else return zt(n, t), n;
}
function Vt(e, t, n, r) {
	function i() {
		t.parentElement.removeChild(t);
	}
	function a() {
		i(), r();
	}
	let o = e.createElement("div");
	o.style = P.confirmPopupStyle, o.style.position = "absolute", o.style.top = "-1em", o.style.display = "grid", o.style.gridTemplateColumns = "auto auto";
	let s = e.createElement("div");
	s.style.gridColumn = "1/2", s.style.gridRow = "1";
	let c = e.createElement("div");
	c.style.gridColumn = "1/2", c.style.gridRow = "2";
	let l = Ut(e, i);
	o.appendChild(l), l.style.gridColumn = "1", l.style.gridRow = "2";
	let u = o.appendChild(e.createElement("button"));
	u.style = P.buttonStyle, u.style.gridRow = "2", u.style.gridColumn = "2", u.textContent = "Cancel";
	let d = G(e, U.iconBase + "noun_925021.svg", "Delete it");
	o.appendChild(d), d.style.gridRow = "1", d.style.gridColumn = "1";
	let f = o.appendChild(e.createElement("button"));
	return f.style = P.buttonStyle, f.style.gridRow = "1", f.style.gridColumn = "2", f.textContent = n, o.appendChild(f), d.addEventListener("click", a), f.addEventListener("click", a), u.addEventListener("click", i), o;
}
function Ht(e, t, n, r) {
	function i() {
		let n = e.createElement("div");
		t.insertBefore(n, o), n.style.position = "relative", n.appendChild(Vt(e, n, s, r));
	}
	let a = xt + "noun_2188_red.svg", o = e.createElement("img");
	o.setAttribute("src", a), o.setAttribute("style", P.smallButtonStyle), o.style.float = "right";
	let s = "Remove this " + n;
	return o.title = s, o.classList.add("hoverControlHide"), o.addEventListener("click", i), t.classList.add("hoverControl"), t.appendChild(o), o.setAttribute("data-testid", "deleteButtonWithCheck"), o;
}
function G(e, t, n, r, i = {
	buttonColor: "Primary",
	needsBorder: !1
}) {
	let a = e.createElement("button");
	if (a.setAttribute("type", "button"), t) {
		let r = a.appendChild(e.createElement("img"));
		r.setAttribute("src", t), r.setAttribute("style", "width: 2em; height: 2em;"), r.title = n, a.setAttribute("style", P.buttonStyle);
	} else a.textContent = n.toLocaleUpperCase(), a.onmouseover = function() {
		i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", P.secondaryButtonNoBorderHover) : a.setAttribute("style", P.secondaryButtonHover) : i.needsBorder ? a.setAttribute("style", P.primaryButtonNoBorderHover) : a.setAttribute("style", P.primaryButtonHover);
	}, a.onmouseout = function() {
		i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", P.secondaryButtonNoBorder) : a.setAttribute("style", P.secondaryButton) : i.needsBorder ? a.setAttribute("style", P.primaryButtonNoBorder) : a.setAttribute("style", P.primaryButton);
	}, i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", P.secondaryButtonNoBorder) : a.setAttribute("style", P.secondaryButton) : i.needsBorder ? a.setAttribute("style", P.primaryButtonNoBorder) : a.setAttribute("style", P.primaryButton);
	return r && a.addEventListener("click", r, !1), a;
}
function Ut(e, t) {
	let n = G(e, St, "Cancel", t);
	return n.firstChild && (n.firstChild.style.opacity = "0.3"), n;
}
function Wt(e, t) {
	return G(e, Ct, "Continue", t);
}
function Gt(e, t, n, r, i, a) {
	return new Promise(function(t, o) {
		let s = e.createElement("div");
		r ||= E.foaf("name"), a ||= i ? F(i) : "  ";
		let c = a + " " + F(r) + ": ";
		s.appendChild(e.createElement("p")).textContent = c;
		let l = e.createElement("input");
		l.setAttribute("type", "text"), l.setAttribute("size", "100"), l.setAttribute("maxLength", "2048"), l.setAttribute("style", P.textInputStyle), l.select(), s.appendChild(l), n.appendChild(s);
		function u() {
			s.parentNode.removeChild(s), t(l.value.trim());
		}
		l.addEventListener("keyup", function(e) {
			e.keyCode === 13 && u();
		}, !1), s.appendChild(e.createElement("br")), s.appendChild(Ut(e, function(e) {
			s.parentNode.removeChild(s), t(null);
		})), s.appendChild(Wt(e, function(e) {
			u();
		})), l.focus();
	});
}
var Kt = qt;
function qt(e, t, n, r) {
	let i = e.createElement("tr");
	r ||= {};
	let a = i.appendChild(e.createElement("td")), o = i.appendChild(e.createElement("td")), s = i.appendChild(e.createElement("td")), c = r.image || Bt(e, n);
	a.setAttribute("style", "vertical-align: middle; width:2.5em; padding:0.5em; height: 2.5em;"), o.setAttribute("style", "vertical-align: middle; text-align:left;"), s.setAttribute("style", "vertical-align: middle; width:2em; padding:0.5em; height: 4em;"), a.appendChild(c);
	let l = o.appendChild(e.createElement("div")), u = l.appendChild(e.createElement("span"));
	if (r.title ? u.textContent = r.title : Mt(u, n), typeof r.renderNameSuffix == "function") {
		let t = r.renderNameSuffix(n, e);
		if (t) {
			let n = l.appendChild(e.createElement("span"));
			n.setAttribute("style", "margin-left: 0.4em; opacity: 0.8;"), typeof t == "string" ? n.textContent = t : n.appendChild(t);
		}
	}
	if (typeof r.renderSupportingInfo == "function") {
		let t = r.renderSupportingInfo(n, e);
		if (t) {
			let n = o.appendChild(e.createElement("div"));
			n.setAttribute("style", "font-size: 90%; opacity: 0.8;"), typeof t == "string" ? n.textContent = t : n.appendChild(t);
		}
	}
	return r.deleteFunction && Ht(e, s, r.noun || "one", r.deleteFunction), n.uri && (r.link !== !1 && (s.appendChild(yt(e, n)).classList.add("HoverControlHide"), s.appendChild(e.createElement("br"))), r.draggable !== !1 && (c.setAttribute("draggable", "false"), rt(i, n))), i.subject = n, i;
}
function Jt(e, t, n, r) {
	let i = t.appendChild(e.createElement("div"));
	n ? i.textContent = n : Mt(i, r);
}
function Yt(e, t, n, r) {
	let i = t.appendChild(e.createElement("div"));
	i.setAttribute("style", P.linkDivStyle), r.deleteFunction && Ht(e, i, r.noun || "one", r.deleteFunction), n.uri && (r.link !== !1 && bt(e, i, n), rt(t, n));
}
function Xt(e, t, n) {
	let r = e.createElement("div");
	return r.setAttribute("style", P.renderAsDivStyle), n ||= {}, vt(e, r, n.image || Bt(e, t)), Jt(e, r, n.title, t), Yt(e, r, t, n), n.clickable && n.onClickFunction && _t(r, n.onClickFunction), n.wrapInATR ? gt(e, r, t) : r;
}
function Zt(e) {
	if (e.refresh) {
		e.refresh();
		return;
	}
	for (let t = 0; t < e.children.length; t++) Zt(e.children[t]);
}
function Qt(e, t, n, r = {}) {
	let i = /* @__PURE__ */ new Set(), a = !!(r.renderSupportingInfo || r.renderNameSuffix), s = r.refreshOnDocumentLoad ?? !0, c = function(e) {
		if (!y.updater) throw Error("kb has no updater");
		y.updater.update(o(t, g, e, p), [], function(e, t, n, r) {
			t ? u() : Tt(void 0, "Error deleting one: " + n);
		});
	};
	function l(t) {
		let n = t, o = { noun: v };
		if (o.renderSupportingInfo = r.renderSupportingInfo, o.renderNameSuffix = r.renderNameSuffix, a && s && t?.uri && y.fetcher) {
			let e = t.doc(), n = e?.uri ? y.fetcher.requested?.[e.uri] : void 0, r = n !== "done" && n !== "failed";
			e?.uri && r && !i.has(e.uri) && (i.add(e.uri), y.fetcher.nowOrWhenFetched(e, void 0, () => {
				i.delete(e.uri), u();
			}));
		}
		return m && (o.deleteFunction = function() {
			c(n);
		}), Kt(e, g, t, o);
	}
	let u = function() {
		let e = y.each(t, g);
		e.sort(), xe(C, e, l, a ? function(e, t) {
			return l(t);
		} : void 0);
	};
	function d(e) {
		let n = [];
		if (e.forEach(function(e) {
			let r = _(e);
			I("Dropped on attachemnt " + e), n.push(o(t, g, r, p));
		}), !y.updater) throw Error("kb has no updater");
		y.updater.update([], n, function(e, t, n, r) {
			t ? u() : Tt(void 0, "Error adding one: " + n);
		});
	}
	function f(e) {
		it(y.fetcher, e, r.uploadFolder?.uri, r.uploadFolder?.uri, function(e, n) {
			let r = [o(t, g, y.sym(n), p)];
			if (!y.updater) throw Error("kb has no updater");
			y.updater.update([], r, function(e, t, n, r) {
				t ? u() : Tt(void 0, "Error adding link to uploaded file: " + n);
			});
		});
	}
	let p = r.doc || t.doc();
	r.modify === void 0 && (r.modify = !0);
	let m = r.modify, h = r.promptIcon || xt + "noun_748003.svg", g = r.predicate || E.wf("attachment"), v = r.noun || "attachment", y = A, b = n.appendChild(e.createElement("table"));
	b.setAttribute("style", "margin-top: 1em; margin-bottom: 1em;");
	let x = b.appendChild(e.createElement("tr")), S = x.appendChild(e.createElement("td")), C = x.appendChild(e.createElement("td")).appendChild(e.createElement("table"));
	if (C.appendChild(e.createElement("tr")), b.refresh = u, u(), m) {
		let t = G(e, h, "Drop attachments here");
		S.appendChild(t);
		let n = r.uploadFolder ? f : null;
		nt(t, d, n);
		let i = t.querySelector("img");
		if (i && nt(i, d, n), nt(S, d, n), r.uploadFolder) {
			let t = _n(e, f);
			S.appendChild(t);
		}
	}
	return b;
}
function $t(e) {
	e.preventDefault(), e.stopPropagation();
	let t = fe(e).getAttribute("href");
	if (!t) return I("openHrefInOutlineMode: No href found!\n");
	let n = window.document;
	n.outlineManager ? n.outlineManager.GotoSubject(A.sym(t), !0, void 0, !0, void 0) : window && window.panes && window.panes.getOutliner ? window.panes.getOutliner().GotoSubject(A.sym(t), !0, void 0, !0, void 0) : I("ERROR: Can't access outline manager in this config");
}
function en(e) {
	if (e.uri === void 0) return;
	let t = e.uri;
	if (t.slice(0, 7) !== "http://") return;
	t = t.slice(7);
	let n = t.indexOf("#");
	if (n >= 0) t = t.slice(0, n);
	else {
		let e = t.lastIndexOf("/");
		if (e < 0) return;
		t = t.slice(0, e);
	}
	return A.sym("http://tabulator.org/wiki/annnotation/" + t);
}
function tn() {
	let e = {};
	return A.statementsMatching(void 0, E.rdf("type"), void 0).forEach(function(t) {
		t.object.value && (e[t.object.value] = !0);
	}), A.statementsMatching(void 0, E.rdfs("subClassOf"), void 0).forEach(function(t) {
		t.object.value && (e[t.object.value] = !0), t.subject.value && (e[t.subject.value] = !0);
	}), A.each(void 0, E.rdf("type"), E.rdfs("Class")).forEach(function(t) {
		t.value && (e[t.value] = !0);
	}), e;
}
function nn(e) {
	let t = {}, n = {}, r = {}, i = 0, a = 0, o = 0, s = e.predicateIndex;
	for (let e in s) s[e][0].object.termType === "Literal" ? (n[e] = !0, a++) : (r[e] = !0, i++);
	let c = e.each(void 0, E.rdf("type"), E.rdf("Property"));
	for (let e = 0; e < c.length; e++) {
		let t = c[e].toNT();
		!r[t] && !n[t] && (n[t] = !0, r[t] = !0, o++);
	}
	return t.op = r, t.dp = n, ye(`propertyTriage: ${i} non-lit, ${a} literal. ${o} unknown.`), t;
}
function rn(e, t) {
	let n = e.createElement("button");
	return n.setAttribute("type", "button"), n.textContent = "Goto " + F(t), n.addEventListener("click", function(n) {
		e.outlineManager.GotoSubject(t, !0, void 0, !0, void 0);
	}, !0), n;
}
function an(e, t) {
	let n = e.createElement("button");
	return n.setAttribute("type", "button"), n.textContent = "✕", n.addEventListener("click", function(e) {
		t.parentNode.removeChild(t);
	}, !0), n;
}
function on(e, t, n, r, i, a, o, s, c) {
	return sn(e.createElement("div"), e, t, n, r, i, a, o, s, c);
}
function sn(e, t, n, r, i, a, o, s, c, l) {
	let u = "border: 0.1em solid #ddd; border-bottom: none; width: 95%; height: 2em; padding: 0.5em;", d = null;
	e.innerHTML = "";
	let f = function(e, o) {
		let f, p, m = function() {
			let e = a ? n.each(void 0, i, o) : n.each(o, i);
			_.setAttribute("class", e.length === 0 ? "hideTillHover" : ""), p.setAttribute("src", s.connectIcon || xt + "noun_25830.svg"), p.setAttribute("title", e.length ? e.length : "attach");
		};
		f = cn.twoLine.widgetForClass(r)(t, o), f.setAttribute("style", u);
		let h = t.createElement("div");
		h.setAttribute("class", "hideTillHover"), h.setAttribute("style", "float:right; width:10%");
		let g = t.createElement("a");
		g.setAttribute("href", o.uri), g.setAttribute("style", "float:right"), h.appendChild(g).textContent = ">", e.appendChild(h);
		let _ = t.createElement("div");
		return _.setAttribute("style", (a ? "float:left;" : "float:right;") + " width:30px;"), p = t.createElement("img"), m(), _.appendChild(p), e.appendChild(_), f.addEventListener("click", function(e) {
			d === f ? (f.setAttribute("style", u), d = null) : (d && d.setAttribute("style", u), f.setAttribute("style", "border: 0.1em solid #ddd; border-bottom: none; width: 95%; height: 2em; padding: 0.5em;background-color: #ccc; color:black;"), d = f), c(o, e, d === f), m();
		}, !1), p.addEventListener("click", function(e) {
			l(o, e, a, m);
		}, !1), e.appendChild(f), e;
	};
	for (let n = 0; n < o.length; n++) {
		let r = t.createElement("div");
		e.appendChild(r), f(r, o[n]);
	}
	return e;
}
var cn = {};
function ln(e, t) {
	let n = e.createElement("div");
	return n.textContent = F(t), n;
}
function un(e) {
	let t = cn.twoLine[e.uri], n = A;
	if (t) return t;
	let r = n.findSuperClassesNT(e);
	for (let e in r) if (t = cn.twoLine[n.fromNT(e).uri], t) return t;
	return cn.twoLine[""];
}
function dn(e, t) {
	let n = "", r = function(e) {
		let r = A.any(t, E.qu(e));
		return r || (n += "@@ No value for " + e + "! "), r ? he(r.value) : "?";
	}, i = e.createElement("table");
	return i.innerHTML = `
      <tr>
      <td colspan="2"> ${r("payee")}</td>
      < /tr>
      < tr >
      <td>${r("date").slice(0, 10)}</td>
      <td style = "text-align: right;">${r("amount")}</td>
      </tr>`, n && (i.innerHTML = `
      <tr>
        <td><a href="${he(t.uri)}">${he(n)}</a></td>
      </tr>`), i;
}
function fn(e, t) {
	let n = function(e) {
		let n = A.any(t, e);
		return n ? he(n.value) : "?";
	}, r = e.createElement("table");
	return r.innerHTML = `
    <tr>
      <td colspan="2">${n(E.dc("title"))}</td>
    </tr>
    <tr style="color: #777">
      <td>${n(E.cal("dtstart"))}</td>
      <td>${n(E.cal("dtend"))}</td>
    </tr>`, r;
}
function pn(e, t) {
	let n = e.querySelectorAll("link");
	for (let e = 0; e < n.length; e++) if ((n[e].getAttribute("rel") || "") === "stylesheet" && (n[e].getAttribute("href") || "") === t) return;
	let r = e.createElement("link");
	r.setAttribute("rel", "stylesheet"), r.setAttribute("type", "text/css"), r.setAttribute("href", t), e.getElementsByTagName("head")[0].appendChild(r);
}
function mn(e) {
	return gn(e, "audio");
}
function hn(e) {
	return gn(e, "video");
}
function gn(e, t) {
	let n = {
		audio: "http://purl.org/dc/dcmitype/Sound",
		image: "http://purl.org/dc/dcmitype/Image",
		video: "http://purl.org/dc/dcmitype/MovingImage"
	}, r = t || "image", i = A.findTypeURIs(e), a = f(r + "/*").uri.split("*")[0];
	for (let e in i) if (e.startsWith(a)) return !0;
	return n[r] in i;
}
function _n(e, t) {
	let n = e.createElement("div"), r = n.appendChild(e.createElement("input"));
	return r.setAttribute("type", "file"), r.setAttribute("multiple", "true"), r.addEventListener("change", (e) => {
		I("File drop event: ", e), e.files ? t(e.files) : e.target && e.target.files ? t(e.target.files) : alert("Sorry no files .. internal error?");
	}, !1), r.style = "display:none", nt(n.appendChild(G(e, xt + "noun_Upload_76574_000000.svg", "Upload files", (e) => {
		r.click();
	})), null, t), n;
}
cn = {
	line: {},
	twoLine: {
		"": ln,
		"http://www.w3.org/2000/10/swap/pim/qif#Transaction": dn,
		"http://www.w3.org/ns/pim/trip#Trip": fn,
		widgetForClass: un
	}
};
//#endregion
//#region src/widgets/forms/fieldParams.ts
var vn = {
	[E.ui("ColorField").uri]: {
		size: 9,
		type: "color",
		style: "height: 3em;",
		dt: "color",
		pattern: /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/
	},
	[E.ui("DateField").uri]: {
		size: 20,
		type: "date",
		dt: "date",
		pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/
	},
	[E.ui("DateTimeField").uri]: {
		size: 20,
		type: "datetime-local",
		dt: "dateTime",
		pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/
	},
	[E.ui("TimeField").uri]: {
		size: 10,
		type: "time",
		dt: "time",
		pattern: /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/
	},
	[E.ui("IntegerField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "integer",
		pattern: /^\s*-?[0-9]+\s*$/
	},
	[E.ui("DecimalField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "decimal",
		pattern: /^\s*-?[0-9]*(\.[0-9]*)?\s*$/
	},
	[E.ui("FloatField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "float",
		pattern: /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/
	},
	[E.ui("SingleLineTextField").uri]: {},
	[E.ui("NamedNodeURIField").uri]: { namedNode: !0 },
	[E.ui("TextField").uri]: {},
	[E.ui("PhoneField").uri]: {
		size: 20,
		uriPrefix: "tel:",
		pattern: /^\+?[\d-]+[\d]*$/
	},
	[E.ui("EmailField").uri]: {
		size: 30,
		uriPrefix: "mailto:",
		pattern: /^\s*.*@.*\..*\s*$/
	},
	[E.ui("Group").uri]: { style: P.formGroupStyle },
	[E.ui("Comment").uri]: {
		element: "p",
		style: P.commentStyle
	},
	[E.ui("Heading").uri]: {
		element: "h3",
		style: P.formHeadingStyle
	}
}, yn = w.store, K = {};
function bn(e) {
	let t = yn, n = t.findTypeURIs(e), r = t.bottomTypeURIs(n), i = [];
	for (let e in r) i.push(e);
	return i[0];
}
function xn(e, t) {
	let n = bn(t), r = K[n];
	return M("paneUtils: Going to implement field " + t + " of type " + n), r || function(e, r) {
		let i = H(e, "No handler for field " + t + " of type " + n);
		return r && r.appendChild(i), i;
	};
}
//#endregion
//#region src/widgets/forms/formStyle.ts
var Sn = "https://www.w3.org/ns/css#";
function Cn(e, t) {
	let n = vn[bn(t)] || {}, r = A.any(t, E.ui("style"));
	if (!r) {
		n.style && e.setAttribute("style", n.style);
		return;
	}
	r.termType === "Literal" ? r && e.setAttribute("style", r.value) : A.statementsMatching(r, null, null, t.doc()).forEach((t) => {
		if (t.predicate.uri && t.predicate.uri.startsWith(Sn)) {
			let n = t.predicate.uri.slice(26);
			try {
				e.style[n] = t.object.value;
			} catch {
				console.warn(`setFieldStyle: Error setting element style ${n} to "${t.object.value}"`), console.warn(`setFieldStyle:   ... Element tagName was "${e.tagName || "???"}"`);
			}
		}
	});
}
//#endregion
//#region src/widgets/forms/basic.ts
var wn = w.store;
function Tn(e, t, n, r, i) {
	n.style.display = "flex", n.style.flexDirection = "row";
	let a = n.appendChild(e.createElement("div"));
	a.style.width = N.formFieldNameBoxWidth;
	let o = n.appendChild(e.createElement("div"));
	return a.setAttribute("class", "formFieldName"), a.setAttribute("style", P.formFieldNameBoxStyle), o.setAttribute("class", "formFieldValue"), i ? a.appendChild(e.createTextNode(i)) : t.any(r, E.ui("property")) ? a.appendChild(En(e, t.any(r, E.ui("property")), r)) : (o.appendChild(H(e, "No property or label given for form field: " + r)), a.appendChild(e.createTextNode("???"))), o;
}
function En(e, t, n) {
	let r = wn.any(n, E.ui("label"));
	if (r ||= F(t, !0), t === void 0) return e.createTextNode("@@Internal error: undefined property");
	let i = e.createElement("a");
	return t.uri && i.setAttribute("href", t.uri), i.setAttribute("style", "color: #3B5998; text-decoration: none;"), i.textContent = r, i;
}
function Dn(e, t, n) {
	let r = wn.statementsMatching(e, t);
	if (r.length === 0) return n;
	if (!wn.updater) throw Error("Store has no updater");
	return r.length > 0 && r[0].why.value && wn.updater.editable(r[0].why.value, wn) ? wn.sym(r[0].why.value) : n;
}
function q(e, t, n, r, i, a, s) {
	let c = wn, l = i.doc ? i.doc() : null, u = e.createElement("div"), f = c.any(i, E.ui("property"));
	if (t && t.appendChild(u), !f) return u.appendChild(H(e, "Error: No property given for text field: " + i));
	let p = Tn(e, c, u, i), m = c.anyJS(i, E.ui("suppressEmptyUneditable"), null, l), h = vn[bn(i)];
	h === void 0 && (h = { style: "" });
	let g = h.style || "", _ = P.textInputStyle + g, v = e.createElement("input");
	v.style = _, p.appendChild(v), v.setAttribute("type", h.type ? h.type : "text");
	let y = (v.getAttribute("type") || "").toLowerCase(), b = y === "date" || y === "datetime-local", x = c.anyJS(i, E.ui("size")) || N.textInputSize || 20;
	v.setAttribute("size", x);
	let S = c.any(i, E.ui("maxLength"));
	v.setAttribute("maxLength", S ? "" + S : N.basicMaxLength), a ||= Dn(r, f, a);
	let C = c.any(r, f, void 0, a);
	if (C ||= c.any(i, E.ui("default")), C && C.value && h.uriPrefix ? v.value = decodeURIComponent(C.value.replace(h.uriPrefix, "")).replace(/ /g, "") : C && (v.value = C.value || C.value || ""), v.setAttribute("style", _), !c.updater) throw Error("kb has no updater");
	return c.updater.editable(a.uri) ? (v.addEventListener("keyup", function(e) {
		h.pattern && v.setAttribute("style", _ + (v.value.match(h.pattern) ? "color: green;" : "color: red;"));
	}, !0), v.addEventListener("change", function(t) {
		if (b && e.activeElement === v) {
			v.dataset && (v.dataset.deferredChange = "true");
			return;
		}
		if (h.pattern && !v.value.match(h.pattern)) return;
		let n = !b;
		n && (v.disabled = !0), v.setAttribute("style", _ + "color: gray;");
		let i = c.statementsMatching(r, f), l;
		h.namedNode ? l = c.sym(v.value) : h.uriPrefix ? (l = encodeURIComponent(v.value.replace(/ /g, "")), l = c.sym(h.uriPrefix + v.value)) : l = h.dt ? new d(v.value.trim(), void 0, E.xsd(h.dt)) : new d(v.value);
		let p = i.map((e) => o(e.subject, e.predicate, l, e.why));
		p.length === 0 && (p = [o(r, f, l, a)]);
		function m(e, t, n) {
			let r = [];
			/* istanbul ignore next */
			if (t.forEach((e) => {
				r.includes(e.why.uri) || r.push(e.why.uri);
			}), e.forEach((e) => {
				/* istanbul ignore next */
				r.includes(e.why.uri) || r.push(e.why.uri);
			}), r.length === 0) throw Error("updateMany has no docs to patch");
			if (!c.updater) throw Error("kb has no updater");
			if (r.length === 1) return c.updater.update(e, t, n);
			let i = r.pop(), a = t.filter((e) => e.why.uri === i), o = t.filter((e) => e.why.uri !== i), s = e.filter((e) => e.why.uri === i), l = e.filter((e) => e.why.uri !== i);
			c.updater.update(s, a, function(e, t, r) {
				t ? m(l, o, n) : n(e, t, r);
			});
		}
		m(i, p, function(t, r, i) {
			r ? (n && (v.disabled = !1), v.setAttribute("style", _)) : u.appendChild(H(e, i)), s(r, i);
		});
	}, !0), v.addEventListener("blur", function(e) {
		if (b && v.dataset && v.dataset.deferredChange === "true") {
			delete v.dataset.deferredChange;
			let e = new Event("change", { bubbles: !0 });
			v.dispatchEvent(e);
		}
	}, !0), u) : (v.readOnly = !0, v.style = P.textInputStyleUneditable + g, m && v.value === "" && (u.style.display = "none"), u);
}
//#endregion
//#region src/widgets/forms/autocomplete/language.ts
var On = /* @__PURE__ */ r({
	addDefaults: () => jn,
	defaultPreferredLanguages: () => An,
	filterByLanguage: () => Pn,
	getPreferredLanguages: () => Nn,
	getPreferredLanguagesFor: () => Mn,
	languageCodeURIBase: () => kn
}), kn = "https://www.w3.org/ns/iana/language-code/", An = [
	"en",
	"fr",
	"de",
	"it",
	"ar"
];
function jn(e) {
	return e ||= [], e.concat(An.filter((t) => !e.includes(t)));
}
async function Mn(e) {
	let t = e.doc();
	await A.fetcher?.load(t);
	let n = A.any(e, E.schema("knowsLanguage"), null, t);
	if (!n) return An;
	let r = [];
	return n.elements.forEach((e) => {
		let n = A.any(e, E.solid("publicId"), null, t);
		if (!n) {
			console.warn("getPreferredLanguages: No publiID of language.");
			return;
		}
		if (!n.value.startsWith("https://www.w3.org/ns/iana/language-code/")) {
			console.error(`What should be a language code ${n.value} does not start with ${kn}`);
			return;
		}
		let i = n.value.slice(41);
		r.push(i);
	}), r.length > 0 ? (console.log(`     User knows languages with codes: "${r.join(",")}"`), jn(r)) : null;
}
async function Nn() {
	let e = await S.currentUser();
	if (e) {
		let t = await Mn(e);
		if (t) return t;
	}
	if (typeof navigator < "u") {
		if (navigator.languages) return jn(navigator.languages.map((e) => e.split("-")[0]));
		if (navigator.language) return jn([navigator.language.split("-")[0]]);
	}
	return An;
}
function Pn(e, t) {
	let n = {};
	e.forEach((e) => {
		let t = e.subject.value;
		n[t] = n[t] || [], n[t].push(e);
	});
	let r = t || An;
	r.reverse();
	let i = [];
	for (let e in n) {
		let t = n[e].map((e) => {
			let t = e.name["xml:lang"];
			return [r.indexOf(t), e];
		});
		t.sort(), t.reverse(), i.push(t[0][1]);
	}
	return I(` Filter by language: ${e.length} -> ${i.length}`), i;
}
//#endregion
//#region src/widgets/forms/autocomplete/publicData.ts
var Fn = /* @__PURE__ */ r({
	AUTOCOMPLETE_LIMIT: () => 200,
	ESCOResultToBindings: () => Yn,
	bindingToTerm: () => qn,
	dbPediaTypeMap: () => Hn,
	dbpediaParameters: () => Vn,
	escoParameters: () => Bn,
	fetcherOptionsJsonPublicData: () => zn,
	getDbpediaDetails: () => ar,
	getWikidataDetails: () => nr,
	getWikidataDetailsOld: () => rr,
	getWikidataLocation: () => ir,
	instituteDetailsWikidataQuery: () => Rn,
	loadFromBindings: () => Jn,
	loadPublicDataThing: () => tr,
	queryESCODataByName: () => Xn,
	queryPublicDataByName: () => Qn,
	queryPublicDataConstruct: () => er,
	queryPublicDataSelect: () => $n,
	variableNameToPredicateMap: () => Kn,
	wikidataClasses: () => Ln,
	wikidataIncomingClassMap: () => Gn,
	wikidataOutgoingClassMap: () => Un,
	wikidataParameters: () => Wn
}), In = /\$\(subject\)/g, Ln = {
	Corporation: "http://www.wikidata.org/entity/Q6881511",
	EducationalOrganization: "http://www.wikidata.org/entity/Q178706",
	GovernmentOrganization: "http://www.wikidata.org/entity/Q327333",
	MedicalOrganization: "http://www.wikidata.org/entity/Q4287745",
	MusicGroup: "http://www.wikidata.org/entity/Q32178211",
	NGO: "http://www.wikidata.org/entity/Q163740",
	Occupation: "http://www.wikidata.org/entity/Q28640",
	Project: "http://www.wikidata.org/entity/Q170584",
	ResearchOrganization: "http://www.wikidata.org/entity/Q31855",
	SportsOrganization: "http://www.wikidata.org/entity/Q4438121"
}, Rn = "prefix vcard: <http://www.w3.org/2006/vcard/ns#>\nCONSTRUCT\n{  wd:Q49108 vcard:fn ?itemLabel.\nwd:Q49108 rdf:type ?klass. ?klass rdfs:label ?klassLabel; rdfs:comment ?klassDescription .\nwd:Q49108 schema:logo ?logo;\n   schema:image ?image;\n   schema:logo  ?sealImage;\n   schema:subOrganization  ?subsidiary .\n      ?subsidiary rdfs:label ?subsidiaryLabel .\n ?supersidiary schema:subOrganization wd:Q49108 .\n      ?supersidiary rdfs:label ?supersidiaryLabel .\n  wd:Q49108 schema:location ?location .\n     ?location  schema:elevation  ?elevation .\n     ?location  wdt:P131  ?region .  ?region rdfs:label ?regionLabel .\n     ?location wdt:P625 ?coordinates .\n     ?location  schema:country  ?country . ?country rdfs:label ?countryLabel .\n}\nWHERE\n{  optional {wd:Q49108 rdfs:label ?itemLabel} .\n  optional {wd:Q49108 wdt:P154 ?logo .}\n  optional {wd:Q49108 wdt:P31 ?klass .}\n  optional {wd:Q49108 wdt:P158  ?sealImage .}\n  optional {wd:Q49108 wdt:P18 ?image .}\n\n  optional { wd:Q49108       wdt:P355 ?subsidiary . }\n  optional { ?supersidiary   wdt:P355 wd:Q49108. }\n\n  optional { wd:Q49108 wdt:P276 ?location .\n\n    optional { ?location  schema:eleveation  ?elevation }\n    optional { ?location  wdt:P131  ?region }\n    optional { ?location wdt:P625 ?coordinates }\n    optional {  ?location  wdt:P17  ?country }\n  }\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\". }\n}", zn = {
	credentials: "omit",
	headers: new Headers({ Accept: "application/json" })
}, Bn = {
	label: "ESCO",
	logo: A.sym("https://ec.europa.eu/esco/portal/static_resource2/images/logo/logo_en.gif"),
	searchByNameURI: "https://ec.europa.eu/esco/api/search?language=$(language)&type=occupation&text=$(name)"
}, Vn = {
	label: "DBPedia",
	logo: A.sym("https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/DBpediaLogo.svg/263px-DBpediaLogo.svg.png"),
	searchByNameQuery: "select distinct ?subject, ?name where {\n    ?subject a $(targetClass); rdfs:label ?name\n    FILTER regex(?name, \"$(name)\", \"i\")\n  } LIMIT $(limit)",
	endpoint: "https://dbpedia.org/sparql/"
}, Hn = { AcademicInsitution: "http://umbel.org/umbel/rc/EducationalOrganization" }, Un = {
	AcademicInsitution: "http://www.wikidata.org/entity/Q4671277",
	Enterprise: "http://www.wikidata.org/entity/Q6881511",
	Business: "http://www.wikidata.org/entity/Q4830453",
	NGO: "http://www.wikidata.org/entity/Q79913",
	CharitableOrganization: "http://www.wikidata.org/entity/Q708676",
	Insitute: "http://www.wikidata.org/entity/Q1664720"
}, Wn = {
	label: "WikiData",
	limit: 3e3,
	logo: A.sym("https://www.wikimedia.org/static/images/project-logos/wikidatawiki.png"),
	endpoint: "https://query.wikidata.org/sparql",
	searchByNameQuery: "SELECT ?subject ?name\n  WHERE {\n    ?klass wdt:P279* $(targetClass) .\n    ?subject wdt:P31 ?klass .\n    ?subject rdfs:label ?name.\n    FILTER regex(?name, \"$(name)\", \"i\")\n  } LIMIT $(limit) ",
	insitituteDetailsQuery: "CONSTRUCT\n{  wd:Q49108 schema:name ?itemLabel;\n             schema:logo ?logo;\n              schema:logo  ?sealImage;\n             schema:subOrganization  ?subsidiary .\n                 ?subsidiary schema:name ?subsidiaryLabel .\n}\nWHERE\n{\n   wd:Q49108 # rdfs:label ?itemLabel ;\n             wdt:P154 ?logo;\n              wdt:P158  ?sealImage ;\n             wdt:P355  ?subsidiary .\n          #  ?subsidiary rdfs:label ?subsidiaryLabel .\n\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE], fr\". }\n}"
}, Gn = {
	"http://www.wikidata.org/entity/Q15936437": E.schema("CollegeOrUniversity"),
	"http://www.wikidata.org/entity/Q1664720": E.schema("EducationalOrganization"),
	"http://www.wikidata.org/entity/Q43229": E.schema("Organization"),
	"http://www.wikidata.org/entity/Q3918": E.schema("CollegeOrUniversity"),
	"http://www.wikidata.org/entity/Q170584": E.schema("Project"),
	"http://www.wikidata.org/entity/Q327333": E.schema("GovernmentOrganization"),
	"http://www.wikidata.org/entity/Q2221906": E.schema("Place"),
	"http://www.wikidata.org/entity/Q167037": E.schema("Corporation")
}, Kn = {
	targetClass: E.rdf("type"),
	sealImage: E.schema("logo"),
	shortName: E.foaf("nick"),
	subsidiary: E.schema("subOrganization"),
	city: E.vcard("locality"),
	state: E.vcard("region"),
	country: E.vcard("country-name"),
	homepage: E.foaf("homepage"),
	lat: E.schema("latitude"),
	long: E.schema("longitude")
};
function qn(e) {
	let t = e.type.toLowerCase();
	if (t === "uri" || t === "iri") return A.sym(e.value);
	if (t === "literal") return e["xml:lang"] ? new d(e.value, e["xml:lang"]) : new d(e.value);
	throw Error(`bindingToTerm: Unexpected type "${e.type}" in sparql binding}`);
}
function Jn(e, t, n, r, i = Kn) {
	let a = {};
	I(`loadFromBindings:  subject: ${t}`), I(`                       doc: ${r}`), n.forEach((e) => {
		for (let t in e) {
			let n = e[t], r = JSON.stringify(n);
			a[t] = a[t] || /* @__PURE__ */ new Set(), a[t].add(r);
		}
	});
	for (let n in a) {
		let o = a[n];
		I(`    results ${n} -> ${o}`), o.forEach((a) => {
			let o = JSON.parse(a), { type: s, value: c } = o, l;
			if (s === "uri") l = e.sym(c);
			else if (s === "literal") l = new d(c, o.language, o.datatype);
			else throw Error(`loadFromBindings:  unexpected type: ${s}`);
			if (n === "type") Gn[c] ? l = Gn[c] : L("Unmapped Wikidata Class: " + c);
			else if (n === "coordinates") {
				I("         @@@ hey a point: " + c);
				let n = /.*\(([-0-9.-]*) ([-0-9.-]*)\)/.exec(c);
				if (n) {
					let i = E.xsd("float"), a = new d(n[1], null, i), o = new d(n[2], null, i);
					e.add(t, E.schema("longitude"), o, r), e.add(t, E.schema("latitude"), a, r);
				} else I("Bad coordinates syntax: " + c);
			} else {
				let a = i[n] || E.schema(n);
				e.add(t, a, l, r), I(`  public data ${a} ${l}.`);
			}
		});
	}
}
function Yn(e) {
	return e._embedded.results.map((e) => {
		let t = e.title, n = e.uri;
		return {
			name: {
				value: t,
				type: "literal"
			},
			subject: {
				type: "IRI",
				value: n
			}
		};
	});
}
async function Xn(e, t, n) {
	if (!n.searchByNameURI) throw Error("Missing queryTarget.searchByNameURI on queryESCODataByName");
	let r = n.limit || 200, i = n.searchByNameURI.replace("$(name)", e).replace("$(limit)", "" + r).replace("$(targetClass)", t.toNT());
	I("Querying ESCO data - uri: " + i);
	let a = (await A.fetcher?.webOperation("GET", i, zn))?.responseText || "";
	if (I("    Query result  text" + a.slice(0, 500) + "..."), a.length === 0) throw Error("Wot no text back from ESCO query " + i);
	let o = JSON.parse(a);
	return I("    ESCO Query result JSON" + JSON.stringify(o, null, 4).slice(0, 500) + "..."), Yn(o);
}
function Zn(e) {
	let t = e.indexOf("SPARQL-QUERY");
	if (t < 0) return e;
	L("  ### Fixing JSON with wikidata error code injection " + e.slice(t, t + 200));
	let n = e.lastIndexOf("}, {");
	return e.slice(0, n) + " } ] } } ";
}
async function Qn(e, t, n, r) {
	function i(n) {
		let i = r.limit || 200;
		return n.replace("$(name)", e).replace("$(limit)", "" + i).replace("$(language)", a).replace("$(targetClass)", t.toNT());
	}
	if (!t) throw Error("queryPublicDataByName: No class provided");
	let a = (await Nn() || An)[0] || "en";
	if (r.searchByNameQuery) {
		let e = i(r.searchByNameQuery);
		return I("Querying public data - sparql: " + e), $n(e, r);
	} else if (r.searchByNameURI) {
		let e = i(r.searchByNameURI), t;
		try {
			t = await A.fetcher?.webOperation("GET", e, zn);
		} catch (t) {
			throw Error(`Exception when trying to fetch ${e} \n ${t}`);
		}
		let n = t.responseText || "";
		if (t.status !== 200) throw Error(`HTTP error status ${t.status} trying to fetch ${e} `);
		if (I("    Query result  text" + n.slice(0, 500) + "..."), n.length === 0) throw Error("queryPublicDataByName: No text back from public data query " + e);
		let a = Zn(n), o = JSON.parse(a);
		if (I("    API Query result JSON" + JSON.stringify(o, null, 4).slice(0, 500) + "..."), o._embedded) return I("      Looks like ESCO"), Yn(o);
		throw alert("Code me: unrecognized API return format"), Error(`*** Need to add code to parse unrecognized API JSON return\n${JSON.stringify(o, null, 4)}`);
	} else throw Error("Query source must have either rest API or SPARQL endpoint.");
}
async function $n(e, t) {
	if (!t.endpoint) throw Error("Missing queryTarget.endpoint required for queryPublicDataSelect");
	let n = new URL(t.endpoint);
	n.searchParams.append("query", e);
	let r = n.href;
	I(" queryPublicDataSelect uri: " + r);
	let i = new Headers();
	i.append("Accept", "application/json");
	let a = {
		credentials: "omit",
		headers: i
	}, o = (await A.fetcher?.webOperation("GET", r, a))?.responseText || "";
	if (o.length === 0) throw Error("No text back from query " + r);
	let s = Zn(o), c = JSON.parse(s);
	return I("    Query result JSON" + JSON.stringify(c, null, 4).slice(0, 100) + "..."), c.results.bindings;
}
async function er(e, t, n) {
	if (I("queryPublicDataConstruct: sparql:", e), !n.endpoint) throw Error("Missing queryTarget.endpoint required for queryPublicDataConstruct");
	let r = new URL(n.endpoint);
	r.searchParams.append("query", e);
	let i = r.href;
	I(" queryPublicDataConstruct uri: " + i);
	let a = new Headers();
	a.append("Accept", "text/turtle");
	let o = {
		credentials: "omit",
		headers: a
	}, s = (await A.fetcher?.webOperation("GET", i, o))?.responseText || "No response text?";
	if (I("    queryPublicDataConstruct result text:" + (s.length > 500 ? s.slice(0, 200) + " ... " + s.slice(-200) : s)), s.length === 0) throw Error("queryPublicDataConstruct: No text back from construct query:" + i);
	m(s, A, t.uri, "text/turtle");
}
async function tr(e, t, n) {
	if (n.uri.startsWith("https://dbpedia.org/resource/")) return ar(e, t, n);
	if (n.uri.match(/^https?:\/\/www\.wikidata\.org\/entity\/.*/)) await nr(e, t, n);
	else {
		let t = n.uri.startsWith("http:") ? e.sym("https:" + n.uri.slice(5)) : n, r = new Headers();
		return r.append("Accept", "text/turtle"), e.fetcher.load(t, {
			credentials: "omit",
			headers: r
		});
	}
}
async function nr(e, t, n) {
	await er(Rn.replace(/wd:Q49108/g, n.toNT()), n, Wn), I("getWikidataDetails: loaded.", n);
}
async function rr(e, t, n) {
	Jn(e, n, await $n("select distinct *  where {\n  optional { $(subject)  wdt:P31  ?targetClass } # instance of\n  optional { $(subject)  wdt:P154  ?logo }\n  optional { $(subject)  wdt:P158  ?sealImage }\n# optional { $(subject)  wdt:P159  ?headquartersLocation }\n\noptional { $(subject)  wdt:P17  ?country }\noptional { $(subject)  wdt:P18  ?image }\noptional { $(subject)  wdt:P1813  ?shortName }\n\noptional { $(subject)  wdt:P355  ?subsidiary }\n# SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\" }\n}".replace(In, n.toNT()), Wn), n.doc());
}
async function ir(e, t, n) {
	let r = "select distinct *  where {\n\n  $(subject) wdt:P276 ?location .\n\n  optional { ?location  wdt:P2044  ?elevation }\n  optional { ?location  wdt:P131  ?region }\n  optional { ?location wdt:P625 ?coordinates }\noptional {  ?location  wdt:P17  ?country }\n\n# SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\" }\n}".replace(In, n.toNT());
	I(" location query sparql:" + r);
	let i = await $n(r, Wn);
	I(" location query bindings:", i), Jn(e, n, i, n.doc());
}
async function ar(e, t, n) {
	Jn(e, n, await $n(`select distinct ?city, ?state, ?country, ?homepage, ?logo, ?lat, ?long,  WHERE {
    OPTIONAL { <${n}> <http://dbpedia.org/ontology/city> ?city }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/state> ?state }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/country> ?country }
    OPTIONAL { ${n} foaf:homepage ?homepage }
    OPTIONAL { ${n} foaf:lat ?lat; foaf:long ?long }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/country> ?country }
   }`, Vn), n.doc()), I("Finished getDbpediaDetails.");
}
//#endregion
//#region src/widgets/forms/autocomplete/autocompletePicker.ts
var or = 4, sr = 20, cr = 40;
function J(e, t) {
	e.style.display = t ? "" : "none";
}
async function lr(e, t, n, r) {
	function i(t) {
		let n = E.appendChild(e.createElement("tr"));
		I(t);
		let r = Error(t);
		n.appendChild(H(e, r, "pink")), P.setStyle(n, "autocompleteRowStyle"), n.style.padding = "1em";
	}
	function a(e, n) {
		I("Auto complete: finish! " + e), e.termType === "Literal" && t.queryParams.objectURIBase && (e = A.sym(t.queryParams.objectURIBase.value + e.value)), u(), r(e, n);
	}
	async function o(e, t) {
		if (n.acceptButton) {
			n.acceptButton.disbaled = !1, J(n.acceptButton, !0), O.value = t.value, w = t, T = e, I("Auto complete: name: " + t), I("Auto complete: waiting for accept " + e), u();
			return;
		}
		J(n.cancelButton, !0), a(e, t);
	}
	async function s(e) {
		w && O.value === w.value && a(T, w);
	}
	async function c(e) {
		I("Auto complete: Canceled by user! "), t.permanent ? h() : C.parentNode && C.parentNode.removeChild(C);
	}
	function l(e, t) {
		let n = e.split(" ");
		for (let e = 0; e < n.length; e++) {
			let r = n[e];
			if (t.toLowerCase().indexOf(r) < 0) return !1;
		}
		return !0;
	}
	function u() {
		for (; E.children.length > 1;) E.removeChild(E.lastChild);
	}
	async function d(e) {
		J(n.cancelButton, !0), m();
	}
	async function f(e, n) {
		let r;
		try {
			r = await Qn(e, g, n || An, t.queryParams);
		} catch (e) {
			i("Error querying db of organizations: " + e), y = !1;
			return;
		}
		return v = r.length < 200, x = v ? e : void 0, u(), Pn(r, n);
	}
	function p(e, t) {
		return t.filter((t) => l(e, t.name.value));
	}
	async function m() {
		function t(t) {
			let n = e.createElement("tr");
			P.setStyle(n, "autocompleteRowStyle"), n.setAttribute("style", "padding: 0.3em;"), n.style.color = b ? "#080" : "#088", n.textContent = t.name.value;
			let r = qn(t.subject), i = qn(t.name);
			return n.addEventListener("click", async (e) => {
				I("       click row textContent: " + n.textContent), I("       click name: " + i.value), r && i && o(r, i);
			}), n;
		}
		function n(e, t) {
			return t.name.value > e.name.value ? 1 : t.name.name < e.name.value ? -1 : 0;
		}
		if (y) {
			I(`Ignoring "${O.value}" because of lock `);
			return;
		}
		I(`Setting lock at "${O.value}"`), y = !0;
		let r = await Nn(), i = O.value.trim().toLowerCase();
		if (i.length < or) u(), S = sr;
		else {
			(!b || !x || !i.startsWith(x)) && (I(`   Querying database at "${i}" cf last "${x}".`), _ = await f(i, r));
			let e = p(i, _);
			v && e.length <= cr && (S = e.length), b = v && e.length <= S, I(` Filter:"${i}" lastBindings: ${_.length}, slimmed to ${e.length}; rows: ${S}, Enough? ${v}, All displayed? ${b}`);
			let a = e.slice(0, S);
			a.sort(n), u();
			for (let e of a) E.appendChild(t(e));
			e.length === 1 && o(qn(e[0].subject), qn(e[0].name));
		}
		y = !1;
	}
	function h() {
		t.currentObject ? (O.value = t.currentName ? t.currentName.value : "??? wot no name for " + t.currentObject, w = t.currentName, x = t.currentName ? t.currentName.value : void 0, T = t.currentObject) : (O.value = "", x = void 0, T = void 0), n.deleteButton && J(n.deleteButton, !!t.currentObject), n.acceptButton && J(n.acceptButton, !1), n.editButton && J(n.editButton, !0), n.cancelButton && J(n.cancelButton, !1), y = !1, u();
	}
	let g = t.targetClass;
	if (!g) throw Error("renderAutoComplete: missing targetClass");
	n.acceptButton && n.acceptButton.addEventListener("click", s, !1), n.cancelButton && n.cancelButton.addEventListener("click", c, !1);
	let _, v = !1, y = !1, b = !1, x, S = sr, C = e.createElement("div"), w, T, E = C.appendChild(e.createElement("table"));
	E.setAttribute("data-testid", "autocomplete-table"), E.setAttribute("style", "max-width: 30em; margin: 0.5em;");
	let D = E.appendChild(e.createElement("tr"));
	P.setStyle(D, "autocompleteRowStyle");
	let O = D.appendChild(e.createElement("td")).appendChild(e.createElement("input"));
	O.setAttribute("type", "text"), h();
	let k = t.size || N.textInputSize || 20;
	O.setAttribute("size", k), O.setAttribute("data-testid", "autocomplete-input");
	let ee = P.textInputStyle || "border: 0.1em solid #444; border-radius: 0.5em; width: 100%; font-size: 100%; padding: 0.1em 0.6em";
	return O.setAttribute("style", ee), O.addEventListener("keyup", function(e) {
		e.keyCode === 13 && s(e);
	}, !1), O.addEventListener("input", d), C;
}
//#endregion
//#region src/widgets/forms/autocomplete/autocompleteBar.ts
var ur = "Solid ID", dr = U.iconBase + "noun_34653_green.svg", fr = U.iconBase + "noun_Search_875351.svg", pr = U.iconBase + "noun_253504.svg";
async function mr(e, t, n, r, i, a) {
	async function o(e, t) {
		return r.permanent ? (J(g, !0), J(f, !1), J(p, !1)) : c(), i(e, t);
	}
	async function s(n) {
		let r = await Gt(e, A, x, E.vcard("url"), void 0, ur);
		if (r) return i(t, r);
	}
	function c() {
		b &&= (x.removeChild(b), void 0);
	}
	async function l() {
		b = e.createElement("div"), b.setAttribute("style", "display: flex; flex-flow: wrap;"), b.appendChild(await lr(e, r, y, o)), b.appendChild(f), b.appendChild(p), b.appendChild(g), b.appendChild(m), x.appendChild(b);
	}
	async function u(e) {
		b ? (x.removeChild(b), b = void 0) : await l();
	}
	async function d(e) {
		for (let n of e) await i(t, n);
	}
	let f = Wt(e);
	f.setAttribute("data-testid", "accept-button");
	let p = Ut(e);
	p.setAttribute("data-testid", "cancel-button");
	let m = e.createElement("div"), h = Ht(e, m, r.targetClass ? F(r.targetClass) : "item", a);
	h.setAttribute("data-testid", "delete-button");
	let g = G(e, pr, "Edit", (e) => {
		_ = !_, v();
	});
	g.setAttribute("data-testid", "edit-button");
	let _ = !0;
	function v() {
		_ ? (J(g, !1), J(f, !1), J(p, !1)) : (J(g, !0), J(f, !1), J(p, !1));
	}
	let y = {
		acceptButton: f,
		cancelButton: p,
		editButton: g,
		deleteButton: h
	}, b, x = e.createElement("div");
	return x.style.display = "flex", x.style.flexDirection = "row", (r.permanent || r.currentObject) && await l(), n.editable && (x.style.width = "100%", n.manualURIEntry && nt(x.appendChild(G(e, dr, n.idNoun, s)), d, void 0), n.dbLookup && !r.currentObject && !r.permanent && x.appendChild(G(e, fr, n.idNoun, u))), v(), x;
}
//#endregion
//#region src/widgets/forms/autocomplete/autocompleteField.ts
function hr(e, t, n, r, i, a, s) {
	async function c(t, n) {
		if (!n) throw Error("autocompleteField:  No name set.");
		let i = u.the(r, h, null, a);
		if (i) {
			let e = u.any(i, g, null, a);
			if (i.equals(t) && e && e.sameTerm(n)) return;
		}
		let c = i ? u.statementsMatching(r, h, i, a).concat(u.statementsMatching(i, g, null, a)) : [], l = [o(r, h, t, a), o(t, g, n, a)];
		try {
			await u.updater?.updateMany(c, l);
		} catch (t) {
			s(!1, t), f.appendChild(H(e, "Autocomplete form data update error:" + t, null, t));
			return;
		}
		s(!0, "");
	}
	async function l(t, n) {
		let i = u.the(r, h, null, a);
		if (!i) {
			s(!1, "NO data to elete"), f.appendChild(H(e, "Autocomplete delete: no old data!"));
			return;
		}
		let o = u.statementsMatching(r, h, i, a).concat(u.statementsMatching(i, g, null, a)), c = [];
		try {
			await u.updater?.updateMany(o, c);
		} catch (t) {
			let n = /* @__PURE__ */ Error("Autocomplete form data delete error:" + t);
			s(!1, t), f.appendChild(H(e, n, null, t));
			return;
		}
		s(!0, "");
	}
	if (r.termType !== "NamedNode") throw Error("Sorry this field only works on NamedNode subjects (for editable)");
	let u = A, d = i.doc ? i.doc() : null, f = e.createElement("div");
	t && t.appendChild(f);
	let p = e.createElement("div");
	p.setAttribute("class", "formFieldName"), p.setAttribute("style", P.formFieldNameBoxStyle), f.appendChild(p);
	let m = e.createElement("div");
	m.setAttribute("class", "formFieldValue"), f.appendChild(m);
	let h = u.any(i, E.ui("property"));
	if (!h) return f.appendChild(H(e, "Error: No property given for autocomplete field: " + i));
	let g = u.any(i, E.ui("labelProperty")) || E.schema("name"), _ = u.any(i, E.ui("dataSource"));
	if (!_) return f.appendChild(H(e, "Error: No data source given for autocomplete field: " + i));
	let v = {
		label: u.anyJS(_, E.schema("name"), null, _.doc()),
		logo: u.any(_, E.schema("logo"), null, _.doc())
	}, y = u.any(i, E.ui("targetClass"), null, i.doc()) || u.any(_, E.ui("targetClass"), null, _.doc());
	y && (v.targetClass = y), v.objectURIBase = u.any(_, E.ui("objectURIBase"), null, _.doc()) || void 0;
	let b = u.anyJS(_, E.ui("endpoint"), null, _.doc());
	if (b) {
		if (v.endpoint = b, v.searchByNameQuery = u.anyJS(_, E.ui("searchByNameQuery"), null, _.doc()), !v.searchByNameQuery) return f.appendChild(H(e, "Error: No searchByNameQuery given for endpoint data Source: " + i));
		v.insitituteDetailsQuery = u.anyJS(_, E.ui("insitituteDetailsQuery"), null, _.doc());
	} else {
		let t = u.anyJS(_, E.ui("searchByNameURI"));
		if (!t) return f.appendChild(H(e, "Error: No searchByNameURI OR sparql endpoint given for dataSource: " + _));
		v.searchByNameURI = t;
	}
	let x = u.anyJS(i, E.ui("suppressEmptyUneditable"), null, d), S = u.updater?.editable(a.uri), C = {
		permanent: !0,
		targetClass: v.targetClass,
		queryParams: v
	};
	C.size = u.anyJS(i, E.ui("size"), null, d) || void 0;
	let w = u.any(r, h, void 0, a);
	if (w) C.currentObject = w, C.currentName = u.any(C.currentObject, g, null, a);
	else if (w = u.any(i, E.ui("default")), w) C.currentObject = w, C.currentName = u.any(C.currentObject, g, null, a);
	else if (x && !S) return f.style.display = "none", f;
	return p.appendChild(En(e, h, i)), mr(e, r, {
		editable: S,
		dbLookup: !0
	}, C, c, l).then((e) => {
		m.appendChild(e);
	}, (t) => {
		m.appendChild(H(e, `Error rendering autocomplete ${i}: ${t}`, "#fee", t));
	}), f;
}
//#endregion
//#region src/lib/style_multiSelect.js
var Y = {
	multiselect__container: "\n        -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n        background-color: #fff;\n        border-radius: 2px;\n        -webkit-box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;\n                box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;\n        -webkit-box-sizing: border-box;\n                box-sizing: border-box;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        min-height: 36px;\n        padding: 4px 8px 0 8px;\n        position: relative;\n        width: 354px;\n        margin-bottom: 5px;\n        font-size: 100%\n    ",
	multiselect__wrapper: "\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -ms-flex-wrap: wrap;\n            flex-wrap: wrap;\n        height: 100%;\n        width: 100%;\n    ",
	multiselect__clear_btn: "\n        cursor: pointer;\n        align-items: center;\n        margin-bottom: 4px;\n        margin-left: 4px;\n    ",
	multiselect__options: "\n        background-color: #f6f6f6;\n        border-radius: 2px;\n        left: 0;\n        max-height: 0;\n        overflow: hidden;\n        position: absolute;\n        top: calc(100% + 3px);\n        z-index: 9999;\n        width: 100%;\n        opacity: 0;\n        transition: max-height 0.1s ease;\n    ",
	multiselect__options_visible: "\n        background-color: #f6f6f6;\n        border-radius: 2px;\n        left: 0;\n        max-height: 0;\n        overflow: hidden;\n        position: absolute;\n        top: calc(100% + 3px);\n        z-index: 9999;\n        width: 100%;\n        opacity: 0;\n        transition: max-height 0.1s ease;\n        max-height: 200px;\n        -webkit-box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;\n        box-shadow: 0 1px 3px 0 #d1d1d2, 0 0 0 1px #d1d1d2;\n        opacity: 1;\n        transition: max-height 0.2s ease;\n    ",
	multiselect__options_ul: "\n        list-style: none;\n        margin: 0;\n        padding: 2px 0;\n        max-height: 200px;\n        overflow: auto;\n    ",
	multiselect__options_ul_li: "\n        cursor: pointer;\n        padding: 4px 8px;\n    ",
	multiselect__options_ul_li_hover: "\n        background-color: #dedede;\n    ",
	multiselect__options_ul_p_multiselect__options_no_results: "\n        margin: 0;\n        padding: 8px;\n        text-align: center;\n    ",
	multiselect__options_ul_p_multiselect__options_no_data: "\n        margin: 0;\n        padding: 8px;\n        text-align: center;\n    ",
	multiselect__options_ul_li_multiselect__options_selected: "\n        background-color: #656565;\n        color: #fff;\n    ",
	multiselect__options_ul_li_multiselect__options_selected_hover: "\n    background-color: #656565;\n    ",
	multiselect__options_ul_li_arrow_selected: "\n        border: 2px solid rgba(101, 101, 101, 0.5);\n    ",
	multiselect__selected: "\n        background-color: #656565;\n        border-radius: 2px;\n        color: #fff;\n        margin-bottom: 4px;\n        margin-right: 4px;\n        padding: 4px 8px;\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-align: center;\n        -ms-flex-align: center;\n        align-items: center;\n    ",
	multiselect__selected_multiselect__remove_btn: "\n        cursor: pointer;\n        display: flex;\n        margin-left: 6px;\n    ",
	multiselect__input: "\n        border: none;\n        -ms-flex-preferred-size: 40%;\n            flex-basis: 40%;\n        -webkit-box-flex: 1;\n            -ms-flex-positive: 1;\n                flex-grow: 1;\n        height: 5px;        \n        margin-bottom: 4px;\n        min-width: 40%;\n        outline: none;      \n    "
};
Y.setStyle = function(e, t) {
	e.style = Y[t];
};
//#endregion
//#region src/widgets/multiSelect.js
var gr = class {
	_data;
	_domElements;
	_event = () => {};
	_itemTemplate;
	_multiselect;
	_noData;
	_noResults;
	_options = [];
	_placeholder;
	_select;
	_selectContainer;
	_selectedOptions = [];
	_tagTemplate;
	_textField;
	_valueField;
	_cross = "\n    <svg\n      width=\"24\"\n      height=\"24\"\n      viewBox=\"0 0 24 24\"\n      fill=\"none\"\n      xmlns=\"http://www.w3.org/2000/svg\"\n    >\n      <path\n        d=\"M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z\"\n        fill=\"currentColor\"\n      />\n    </svg>\n    ";
	constructor({ data: e, itemTemplate: t, noData: n, noResults: r, placeholder: i, select: a, container: o, tagTemplate: s, textField: c, valueField: l }) {
		this._data = e ?? [], this._itemTemplate = t ?? null, this._noData = n ?? "No data found.", this._noResults = r ?? "No results found.", this._placeholder = i ?? "Select...", this._select = a, this._selectContainer = o, this._tagTemplate = s ?? null, this._textField = c ?? null, this._valueField = l ?? null;
	}
	init() {
		if (this._select && this._select.nodeName === "SELECT") {
			if (this._itemTemplate && this._data.length === 0) throw Error("itemTemplate must be initialized with data from the component settings");
			if (this._tagTemplate && this._data.length === 0) throw Error("tagTemplate must be initialized with data from the component settings");
			this._options = this._data.length > 0 ? this._getDataFromSettings() : this._getDataFromSelectTag(), this._renderMultiselect(), this._renderOptionsList(), this._domElements = {
				clear: this._multiselect.querySelector(".multiselect__clear-btn"),
				input: this._multiselect.querySelector(".multiselect__input"),
				optionsContainer: this._multiselect.querySelector(".multiselect__options"),
				optionsContainerList: this._multiselect.querySelector(".multiselect__options > ul"),
				options: {
					list: this._multiselect.querySelectorAll(".multiselect__options > ul > li"),
					find: function(e) {
						for (let t = 0; t < this.list.length; t++) {
							let n = this.list[t];
							if (e(n)) return n;
						}
					},
					some: function(e) {
						for (let t = 0; t < this.list.length; t++) {
							let n = this.list[t];
							if (e(n, t)) return !0;
						}
						return !1;
					}
				}
			}, this._enableEventListenners(), this._initSelectedList();
		} else throw Error(`The selector '${this._select}' did not select any valid select tag.`);
	}
	subscribe(e) {
		if (typeof e == "function") this._event = e;
		else throw Error("parameter in the subscribe method is not a function");
	}
	_addOptionToList(e, t) {
		let n = `<span class="multiselect__selected" style="${Y.multiselect__selected}" data-value="${e.value}">${this._tagTemplate ? this._processTemplate(this._tagTemplate, t) : e.text}<span class="multiselect__remove-btn" style="${Y.multiselect__remove_btn}">${this._cross}</span></span>`;
		this._domElements.input.insertAdjacentHTML("beforebegin", n);
		let { lastElementChild: r } = this._multiselect.querySelector(`span[data-value="${e.value}"]`);
		r.addEventListener("click", () => {
			let t = this._domElements.options.find((t) => t.dataset.value === e.value);
			this._handleOption(t);
		});
	}
	_clearSelection() {
		for (let e = 0; e < this._selectedOptions.length; e++) {
			let t = this._selectedOptions[e], n = this._domElements.options.find((e) => e.dataset.value === t.value);
			n.classList.remove("multiselect__options--selected"), n.setAttribute("style", Y.multiselect__options), this._removeOptionFromList(n.dataset.value);
		}
		this._selectedOptions = [], this._handleClearSelectionBtn(), this._handlePlaceholder(), this._dispatchEvent({
			action: "CLEAR_ALL_OPTIONS",
			selection: this._selectedOptions
		});
	}
	_closeList() {
		this._domElements.input.value = "", this._domElements.optionsContainer.classList.remove("visible"), this._domElements.optionsContainer.setAttribute("style", Y.multiselect__options), this._filterOptions(""), this._removeAllArrowSelected();
	}
	_dispatchEvent(e) {
		this._event(e);
	}
	_enableEventListenners() {
		document.addEventListener("mouseup", ({ target: e }) => {
			this._multiselect.contains(e) || (this._filterOptions(""), this._closeList(), this._handlePlaceholder());
		}), this._domElements.clear.addEventListener("click", () => {
			this._clearSelection();
		});
		for (let e = 0; e < this._domElements.options.list.length; e++) this._domElements.options.list[e].addEventListener("click", ({ target: e }) => {
			this._handleOption(e), this._closeList();
		});
		this._domElements.input.addEventListener("focus", () => {
			this._domElements.optionsContainer.classList.add("visible"), this._domElements.optionsContainer.setAttribute("style", Y.multiselect__options_visible);
		}), this._domElements.input.addEventListener("input", ({ target: { value: e } }) => {
			this._domElements.options.list.length > 0 && this._filterOptions(e);
		}), this._domElements.input.addEventListener("keydown", (e) => {
			this._handleArrows(e), this._handleBackspace(e), this._handleEnter(e);
		});
	}
	_filterOptions(e) {
		let t = this._domElements.optionsContainer.classList.contains("visible"), n = e.toLowerCase();
		if (!t && e.length > 0 && (this._domElements.optionsContainer.classList.add("visible"), this._domElements.optionsContainer.setAttribute("style", Y.multiselect__options_visible)), this._domElements.options.list.length > 0) {
			for (let e = 0; e < this._domElements.options.list.length; e++) {
				let t = this._domElements.options.list[e];
				(this._itemTemplate ? this._data[e][this._textField] : t.textContent).toLowerCase().substring(0, n.length) === n ? this._domElements.optionsContainerList.appendChild(t) : t.parentNode && t.parentNode.removeChild(t);
			}
			let e = this._domElements.options.some((e, t) => (this._itemTemplate ? this._data[t][this._textField] : e.textContent).toLowerCase().substring(0, n.length) === n);
			this._showNoResults(!e);
		}
	}
	_generateId(e) {
		let t = "";
		for (let n = 0; n < e; n++) t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62));
		return t;
	}
	_getDataFromSelectTag() {
		let e = [], { options: t } = this._select;
		for (let n = 0; n < t.length; n++) {
			let r = t[n];
			e.push({
				text: r.text,
				value: r.value,
				selected: r.hasAttribute("selected")
			});
		}
		return e;
	}
	_getDataFromSettings() {
		if (this._data.length > 0 && this._valueField && this._textField) {
			let e = typeof this._valueField == "string", t = typeof this._textField == "string", n = [];
			if (!e || !t) throw Error("textField and valueField must be of type string");
			for (let e = 0; e < this._data.length; e++) {
				let t = this._data[e];
				n.push({
					value: t[this._valueField],
					text: t[this._textField],
					selected: typeof t.selected == "boolean" && t.selected
				});
			}
			return n;
		} else return null;
	}
	_handleArrows(e) {
		if (e.keyCode === 40 || e.keyCode === 38) {
			e.preventDefault();
			let t = this._domElements.optionsContainer.classList.contains("visible"), n = this._multiselect.querySelector(".multiselect__options > ul");
			if (!t) this._domElements.optionsContainer.classList.add("visible"), this._domElements.optionsContainer.setAttribute("style", Y.multiselect__options_visible), n.firstElementChild.classList.add("arrow-selected"), n.firstElementChild.setAttribute("style", Y.multiselect__options_ul_li_arrow_selected), n.firstElementChild.scrollIntoView(!1);
			else {
				let t = this._multiselect.querySelector(".multiselect__options ul li.arrow-selected"), r = {
					ArrowUp: "previous",
					Up: "previous",
					ArrowDown: "next",
					Down: "next"
				};
				if (!t) {
					n.firstElementChild.classList.add("arrow-selected"), n.firstElementChild.setAttribute("style", Y.multiselect__options_ul_li_arrow_selected), n.firstElementChild.scrollIntoView(!1);
					return;
				}
				if (t.classList.remove("arrow-selected"), t.setAttribute("style", Y.multiselect__options_ul_li), t = t[r[e.key] + "ElementSibling"], !t) {
					t = n.children[r[e.key] === "next" ? 0 : n.children.length - 1], t.classList.add("arrow-selected"), t.setAttribute("style", Y.multiselect__options_ul_li_arrow_selected), this._scrollIntoView(n, t);
					return;
				}
				t.classList.add("arrow-selected"), t.setAttribute("style", Y.multiselect__options_ul_li_arrow_selected), this._scrollIntoView(n, t);
			}
		}
	}
	_handleBackspace(e) {
		if (e.keyCode === 8 && e.target.value === "") {
			let e = this._selectedOptions.length > 0 ? this._selectedOptions[this._selectedOptions.length - 1] : null;
			if (e) {
				let t = this._multiselect.querySelector(`li[data-value="${e.value}"]`);
				this._handleOption(t), this._selectedOptions.length === 0 && (this._domElements.optionsContainer.classList.remove("visible"), this._domElements.optionsContainer.setAttribute("style", Y.multiselect__options));
			}
		}
	}
	_handleClearSelectionBtn() {
		this._selectedOptions.length > 0 ? this._domElements.clear.style.display = "flex" : this._domElements.clear.style.display = "none";
	}
	_handleEnter(e) {
		if (e.keyCode === 13) {
			let e = this._multiselect.querySelector(".multiselect__options ul li.arrow-selected");
			e && (this._handleOption(e), this._closeList());
		}
	}
	_handleOption(e, t = !0) {
		for (let n = 0; n < this._selectedOptions.length; n++) if (this._selectedOptions[n].value === e.dataset.value) return e.classList.remove("multiselect__options--selected"), e.setAttribute("style", Y.multiselect__options), this._selectedOptions.splice(n, 1), this._removeOptionFromList(e.dataset.value), this._handleClearSelectionBtn(), this._handlePlaceholder(), t && this._dispatchEvent({
			action: "REMOVE_OPTION",
			value: e.dataset.value,
			selection: this._selectedOptions
		});
		for (let n = 0; n < this._options.length; n++) {
			let r = this._options[n];
			if (r.value === e.dataset.value) return e.classList.add("multiselect__options--selected"), e.setAttribute("style", Y.multiselect__options_selected), this._selectedOptions = [...this._selectedOptions, r], this._addOptionToList(r, n), this._handleClearSelectionBtn(), this._handlePlaceholder(), t && this._dispatchEvent({
				action: "ADD_OPTION",
				value: e.dataset.value,
				selection: this._selectedOptions
			});
		}
	}
	_handlePlaceholder() {
		this._domElements.input.placeholder = this._placeholder;
	}
	_initSelectedList() {
		let e = !1;
		for (let t = 0; t < this._options.length; t++) {
			let n = this._options[t];
			if (n.selected) {
				e = !0;
				let r = this._domElements.options.find((e) => e.dataset.value === n.value);
				r.classList.add("multiselect__options--selected"), r.setAttribute("style", Y.multiselect__options_selected), this._selectedOptions = [...this._selectedOptions, n], this._addOptionToList(n, t);
			}
		}
		e && this._handleClearSelectionBtn(), this._handlePlaceholder();
	}
	_processTemplate(e, t) {
		let n = e, r = e.match(/\$\{(\w+)\}/g).map((e) => e.replace(/\$\{|\}/g, ""));
		for (let e = 0; e < r.length; e++) {
			let i = r[e];
			n = n.replace(`\$\{${i}\}`, this._data[t][i] ?? "");
		}
		return n;
	}
	_removeAllArrowSelected() {
		let e = "arrow-selected", t = this._domElements.options.find((t) => t.classList.contains(e));
		t && t.classList.remove(e) && t.setAttribute("style", Y.multiselect__options_ul_li);
	}
	_removeOptionFromList(e) {
		let t = this._multiselect.querySelector(`span[data-value="${e}"]`);
		t && t.parentNode && t.parentNode.removeChild(t);
	}
	_renderOptionsList() {
		let e = `
        <div class="multiselect__options" style="${Y.multiselect__options}">
          <ul style="${Y.multiselect__options_ul}">
          ${this._options.length > 0 && !this._itemTemplate ? this._options.map((e) => `
              <li data-value="${e.value}" style="${Y.multiselect__options_ul_li}">${e.text}</li>
            `).join("") : ""}

          ${this._options.length > 0 && this._itemTemplate ? this._options.map((e, t) => `
              <li data-value="${e.value}" style="${Y.multiselect__options_ul_li}">${this._processTemplate(this._itemTemplate, t)}</li>
            `).join("") : ""}
          ${this._showNoData(this._options.length === 0)}
          </ul>
        </div>
      `;
		this._multiselect.insertAdjacentHTML("beforeend", e);
	}
	_renderMultiselect() {
		this._select.style.display = "none";
		let e = "iconic-" + this._generateId(20);
		this._multiselect = document.createElement("div"), this._multiselect.setAttribute("id", e), this._multiselect.setAttribute("class", "multiselect__container"), this._multiselect.setAttribute("style", Y.multiselect__container);
		let t = `
        <div class="multiselect__wrapper" style="${Y.multiselect__wrapper}">
          <input class="multiselect__input" style="${Y.multiselect__input}" placeholder="${this._placeholder}" />
        </div>
        <span style="display: none;" class="multiselect__clear-btn" style="${Y.multiselect__clear_btn}">${this._cross}</span>
    `;
		this._multiselect.innerHTML = t, this._selectContainer.appendChild(this._multiselect);
	}
	_scrollIntoView(e, t) {
		let n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
		n.top < r.bottom - t.offsetHeight || (e.scrollTop = t.clientHeight + (t.offsetTop - t.offsetHeight)), n.bottom > r.top + t.offsetHeight || (e.scrollTop = t.clientHeight + (t.offsetTop - t.offsetHeight) - (e.offsetHeight - (t.offsetHeight + (t.offsetHeight - t.clientHeight))));
	}
	_showNoData(e) {
		return e ? `<p class="multiselect__options--no-data" style="${Y.multiselect__options_ul_p_multiselect__options_no_data}">${this._noData}</p>` : "";
	}
	_showNoResults(e) {
		let t = this._multiselect.querySelector(".multiselect__options--no-results");
		if (e) {
			let e = `<p class="multiselect__options--no-results" style="${Y.multiselect__options_ul_p_multiselect__options_no_results}">${this._noResults}</p>`;
			!t && this._domElements.optionsContainerList.insertAdjacentHTML("beforeend", e);
		} else t && t.parentNode && t.parentNode.removeChild(t);
	}
}, _r = "✓", vr = "✕", yr = "-", br = A;
K[E.ui("AutocompleteField").uri] = hr;
function xr(e, t, n, r, i, a, o) {
	let s = a.children;
	for (let c = 0; c < o.length; c++) {
		let l = o[c];
		if (bn(l) === E.ui("Options").uri) {
			let o = xn(e, l)(e, null, t, n, l, r, i);
			I("Refreshing Options field by replacing it."), a.insertBefore(o, s[c]), a.removeChild(s[c + 1]);
		}
	}
}
K[E.ui("Form").uri] = K[E.ui("Group").uri] = function(e, t, n, r, i, a, o) {
	let s = e.createElement("div"), c = E.ui;
	if (t && t.appendChild(s), !i) return;
	let l = r.toNT() + "|" + i.toNT();
	if (n[l]) return s.appendChild(e.createTextNode("Group: see above " + l)), s;
	let u = {};
	for (let e in n) u[e] = 1;
	u[l] = 1;
	let d = i.doc ? i.doc() : null, f = br.any(i, c("weight"), null, d), p = f ? Number(f.value) : 1;
	if (p > 3 || p < 0) return s.appendChild(H(e, `Form Group weight ${p} should be 0-3`));
	s.setAttribute("style", P.formGroupStyle[p]), s.style.display = "flex", s.style.flexDirection = "column", s.class = "form-weight-" + p;
	let m = br.any(i, c("parts"), null, d), h;
	if (m ? h = m.elements : (m = br.each(i, c("part"), null, d), h = kr(m)), !m) return s.appendChild(H(e, "No parts to form! "));
	for (let t = 0; t < h.length; t++) {
		let i = h[t], c = xn(e, i);
		s.appendChild(c(e, null, u, r, i, a, function(t, i) {
			t && i && i.widget && i.widget === "select" && xr(e, n, r, a, o, s, h), o(t, {
				widget: "group",
				change: i
			});
		}));
	}
	return s;
}, K[E.ui("Options").uri] = function(e, t, n, r, i, a, o) {
	let s = A, c = e.createElement("div"), l = i.doc ? i.doc() : null, u = E.ui;
	t && t.appendChild(c);
	let d = s.any(i, u("dependingOn"));
	d ||= E.rdf("type");
	let f = s.each(i, u("case"), null, l);
	f || c.appendChild(H(e, "No cases to Options form. "));
	let p;
	p = d.sameTerm(E.rdf("type")) ? Object.keys(s.findTypeURIs(r)).map((e) => _(e)) : s.each(r, d);
	for (let t = 0; t < f.length; t++) {
		let d = f[t], m = s.each(d, u("for"), null, l), h = !1;
		for (let e = 0; e < m.length; e++) for (let t of p) {
			let n = m[e];
			(t.sameTerm(m) || t.termType === n.termType && t.value === n.value) && (h = !0);
		}
		if (h) {
			let t = s.the(d, u("use"));
			if (t) Tr(e, c, n, r, t, a, o);
			else return c.appendChild(H(e, "No \"use\" part for case in form " + i)), c;
			break;
		}
	}
	return c;
}, K[E.ui("Multiple").uri] = function(e, t, n, r, i, s, c) {
	function l(e) {
		return e.map((e) => e.toString().slice(-7)).join(", ");
	}
	async function d() {
		let t = X(s);
		if (b) ee(), O.elements.push(t), await te();
		else {
			let n = S ? [o(t, x, r, s)] : [o(r, x, t, s)];
			try {
				await m.updater.update([], n);
			} catch (t) {
				let n = "Error adding to unordered multiple: " + t;
				g.appendChild(H(e, n)), R(n);
			}
			ne();
		}
	}
	function f(t) {
		async function i() {
			if (b) {
				I("pre delete: " + l(O.elements));
				for (let e = 0; e < O.elements.length; e++) if (O.elements[e].sameTerm(t)) {
					O.elements.splice(e, 1), await te();
					return;
				}
			} else if (m.holds(r, x, t, s)) {
				let n = [o(r, x, t, s)];
				m.updater.update(n, [], function(t, n, r) {
					n ? D.removeChild(d) : D.appendChild(H(e, "Multiple: delete failed: " + r));
				});
			}
		}
		async function a(e, n) {
			I("pre move: " + l(O.elements));
			let r;
			for (r = 0; r < O.elements.length && !O.elements[r].sameTerm(t); r++);
			if (r === O.elements.length && alert("list move: not found element for " + t), n) {
				if (r === 0) {
					alert("@@ boop - already at top   -temp message");
					return;
				}
				O.elements.splice(r - 1, 2, O.elements[r], O.elements[r - 1]);
			} else {
				if (r === O.elements.length - 1) {
					alert("@@ boop - already at bottom   -temp message");
					return;
				}
				O.elements.splice(r, 2, O.elements[r + 1], O.elements[r]);
			}
			await te();
		}
		function u(e, n) {
			I(`Item done callback for item ${t.toString()}`), e || R("  Item done callback: Error: " + n), c(e, n);
		}
		M("Multiple: render object: " + t);
		let d = xn(e, T)(e, null, n, t, T, s, u);
		if (d.subject = t, m.updater.editable(s.uri) && (Ht(e, d, C, i), b)) {
			let t = e.createElement("div");
			t.style.display = "grid", t.style.gridTemplateColumns = "auto 3em", t.style.gridTemplateRows = "50% 50%";
			let n = G(e, U.iconBase + "noun_1369237.svg", "Move Up", async (e) => a(e, !0)), r = G(e, U.iconBase + "noun_1369241.svg", "Move Down", async (e) => a(e, !1)), i = e.createElement("div");
			return i.appendChild(d), t.appendChild(i), t.appendChild(n), t.appendChild(r), n.style.gridColumn = 2, r.style.gridColumn = 2, n.style.gridRow = 1, r.style.padding = "0em", n.style.padding = "0em", r.style.gridRow = 2, i.style.gridColumn = 1, i.style.gridRowStart = "span 2", t;
		}
		return d;
	}
	let p = U.iconBase + "noun_19460_green.svg", m = A, h = i.doc ? i.doc() : null, g = e.createElement("div"), _ = g, v = E.ui;
	t && t.appendChild(g);
	let y = m.any(i, v("ordered")), b = y ? a.toJS(y) : !1, x = m.any(i, v("property")), S = m.anyJS(i, v("reverse"), null, h);
	if (!x) return g.appendChild(H(e, "No property to multiple: " + i)), _;
	let C = m.any(i, v("label"));
	C ||= F(x);
	let w = m.any(i, v("min"));
	w = w ? 0 + w.value : 0;
	let T = m.any(i, v("part"));
	if (!T) return g.appendChild(H(e, "No part to multiple: " + i)), _;
	let D = g.appendChild(e.createElement("div"));
	D.style.display = "flex", D.style.flexDirection = "column";
	let O, k;
	if (k = S ? m.any(null, x, r, s) : m.any(r, x, null, s), b ? (O = S ? m.any(null, x, r, s) : m.any(r, x, null, s), k = O ? O.elements : []) : (k = S ? m.each(null, x, r, s) : m.each(r, x, null, s), O = null), m.updater.editable(s.uri)) {
		let t = g.appendChild(e.createElement("div"));
		t.style.padding = "0.5em";
		let n = t.appendChild(e.createElement("img"));
		n.setAttribute("src", p), n.setAttribute("style", "margin: 0.2em; width: 1.5em; height:1.5em"), n.title = "Click to add another " + C;
		let r = e.createElement("span");
		r.textContent = (k.length === 0 ? "Add another " : "Add ") + C, t.addEventListener("click", async (e) => {
			await d();
		}, !0), t.appendChild(r);
	}
	function ee() {
		O || (O = new u(), S ? m.add(O, x, r, s) : m.add(r, x, O, s));
	}
	async function te() {
		I("save list: " + l(O.elements)), ee();
		try {
			await m.fetcher.putBack(s);
		} catch (t) {
			g.appendChild(H(e, "Error trying to put back a list: " + t));
			return;
		}
		ne();
	}
	function ne() {
		let e;
		if (b) {
			let t = S ? m.the(null, x, r, s) : m.the(r, x, null, s);
			e = t ? t.elements : [];
		} else e = S ? m.each(null, x, r, s) : m.each(r, x, null, s), e.sort();
		pe(D, e, f);
	}
	D.refresh = ne, ne();
	async function j() {
		let e = w - k.length;
		if (e > 0) {
			for (let t = 0; t < e; t++) I("Adding extra: min " + w), await d();
			await te();
		}
	}
	return j().then(() => {
		I(" Multiple render: async stuff ok");
	}, (e) => {
		R(" Multiple render: async stuff fails. #### ", e);
	}), _;
}, K[E.ui("PhoneField").uri] = q, K[E.ui("EmailField").uri] = q, K[E.ui("ColorField").uri] = q, K[E.ui("DateField").uri] = q, K[E.ui("DateTimeField").uri] = q, K[E.ui("TimeField").uri] = q, K[E.ui("NumericField").uri] = q, K[E.ui("IntegerField").uri] = q, K[E.ui("DecimalField").uri] = q, K[E.ui("FloatField").uri] = q, K[E.ui("TextField").uri] = q, K[E.ui("SingleLineTextField").uri] = q, K[E.ui("NamedNodeURIField").uri] = q, K[E.ui("MultiLineTextField").uri] = function(e, t, n, r, i, a, o) {
	let s = E.ui, c = A, l = i.doc ? i.doc() : null, u = c.any(i, s("property"));
	if (!u) return H(e, "No property to text field: " + i);
	let d = e.createElement("div");
	d.style.display = "flex", d.style.flexDirection = "row";
	let f = d.appendChild(e.createElement("div"));
	f.style.width = N.formFieldNameBoxWidth;
	let p = d.appendChild(e.createElement("div"));
	f.appendChild(En(e, u, i)), a = Dn(r, u, a);
	let m = c.anyJS(r, u, null, a) || "", h = c.updater.editable(a.uri), g = i && c.anyJS(i, E.ui("suppressEmptyUneditable"), null, l);
	!h && g && m === "" && (d.style.display = "none");
	let _ = Nr(e, c, r, u, a, o);
	return p.appendChild(_), t && t.appendChild(d), d;
};
function Sr(e, t, n, r, i, a, s, c) {
	let l = E.ui, u = A, d = u.any(i, l("property"));
	if (!d) {
		let n = H(e, "No property to boolean field: " + i);
		return t && t.appendChild(n), n;
	}
	let f = u.any(i, l("label"));
	f ||= F(d, !0), a = Dn(r, d, a);
	let p = u.any(r, d);
	p === void 0 && (p = !1);
	let m = o(r, d, !0, a), h = o(r, d, !1, a), g = Rr(e, u, f, h, m, i, a, c);
	return t && t.appendChild(g), g;
}
K[E.ui("BooleanField").uri] = function(e, t, n, r, i, a, o) {
	return Sr(e, t, n, r, i, a, o, !1);
}, K[E.ui("TristateField").uri] = function(e, t, n, r, i, a, o) {
	return Sr(e, t, n, r, i, a, o, !0);
}, K[E.ui("Classifier").uri] = function(e, t, n, r, i, a, o) {
	let s = A, c = E.ui, l = s.any(i, c("category"));
	if (!l) return H(e, "No category for classifier: " + i);
	M("Classifier: dataDoc=" + a);
	let u = function(e, t) {
		return o(e || e, t);
	}, d = e.createElement("div");
	d.setAttribute("class", "classifierBox");
	let f = e.createElement("div");
	f.setAttribute("class", "formFieldName classifierBox-label"), f.appendChild(En(e, l, i)), d.appendChild(f);
	let p = e.createElement("div");
	p.setAttribute("class", "formFieldValue classifierBox-selectBox");
	let m = Lr(e, s, r, l, a, u);
	if (m && m.querySelectorAll) {
		let e = m.querySelectorAll("select");
		e.length && !s.updater.editable(a.uri) && e.forEach((e) => {
			e.readOnly = !0, e.style = P.textInputStyleUneditable;
		});
	}
	return p.appendChild(m), d.appendChild(p), t && t.appendChild(d), d;
}, K[E.ui("Choice").uri] = function(e, t, n, r, i, a, s) {
	let c = E.ui, l = A, u = i.doc ? i.doc() : null, d, f = e.createElement("div");
	f.setAttribute("class", "choiceBox"), t && t.appendChild(f);
	let p = e.createElement("div");
	p.setAttribute("class", "formFieldName choiceBox-label"), f.appendChild(p);
	let m = e.createElement("div");
	m.setAttribute("class", "formFieldValue choiceBox-selectBox"), f.appendChild(m);
	let h = l.any(i, c("property"));
	if (!h) return f.appendChild(H(e, "No property for Choice: " + i));
	p.appendChild(En(e, h, i));
	let g = l.any(i, c("from"));
	if (!g) return H(e, "No 'from' for Choice: " + i);
	let v = l.any(i, c("use")), y = {
		form: i,
		subForm: v,
		disambiguate: !1
	};
	function b(e) {
		let t = [], n;
		t = l.each(void 0, E.rdf("type"), g, u);
		for (let n in Vr(l, g, e)) t.push(l.fromNT(n));
		if (g.sameTerm(E.rdfs("Class"))) for (d in tn()) t.push(l.sym(d));
		else if (g.sameTerm(E.rdf("Property"))) {
			for (d in n = nn(l), n.op) t.push(l.fromNT(d));
			for (d in n.dp) t.push(l.fromNT(d));
			y.disambiguate = !0;
		} else if (g.sameTerm(E.owl("ObjectProperty"))) {
			for (d in n = nn(l), n.op) t.push(l.fromNT(d));
			y.disambiguate = !0;
		} else if (g.sameTerm(E.owl("DatatypeProperty"))) {
			for (d in n = nn(l), n.dp) t.push(l.fromNT(d));
			y.disambiguate = !0;
		}
		return t;
	}
	l.any(i, c("canMintNew")) && (y.mint = "* Create new *");
	let x = l.any(i, c("multiselect"));
	x && (y.multiSelect = !0);
	let S = l.each(i, c("search-full-store")).length ? null : a, C;
	return m.refresh = function() {
		let t = l.each(r, h, null, a).map((e) => e.value), n = b(S);
		if (n.push(t), n = Ar(n), C = zr(e, m, l, r, h, n, t, g, y, a, s), m.innerHTML = "", m.appendChild(C), x) {
			let n = new gr({
				placeholder: C.selected,
				select: C,
				container: m,
				textField: "textField",
				valueField: "valueField"
			});
			n.init(), n.subscribe(function(n) {
				if (n.action === "REMOVE_OPTION" && (t = t.filter(function(e) {
					return e !== n.value;
				})), n.action === "CLEAR_ALL_OPTIONS" && (t = []), n.action === "ADD_OPTION") if ((n.value + "").includes("Create new")) {
					let n = X(a), i = [];
					i.push(o(r, h, l.sym(n), a)), g && i.push(o(n, E.rdf("type"), l.sym(g), a)), v && Cr(e, m, {}, _(n), v, a, function(r, a) {
						r ? (l.updater.update([], i, function(t, n, r) {
							n || m.appendChild(H(e, "Error updating select: " + r));
						}), t.push(n), s && s(r, {
							widget: "select",
							event: "new"
						})) : m.appendChild(H(e, "Error updating data in field of select: " + a));
					});
				} else t.push(n.value);
				C.update(t);
			});
		}
	}, m.refresh(), C && C.refresh && C.refresh(), f;
};
function Cr(e, t, n, r, i, a, o) {
	xn(e, i)(e, t, n, r, i, a, o);
}
K[E.ui("Comment").uri] = K[E.ui("Heading").uri] = function(e, t, n, r, i, a, o) {
	let s = E.ui, c = A, l = c.any(i, s("contents"));
	l ||= "Error: No contents in comment field.";
	let u = i.doc ? i.doc() : null, d = vn[bn(i)] || {}, f = e.createElement("div");
	t && t.appendChild(f);
	let p = f.appendChild(e.createElement(d.element));
	p.textContent = l, Cn(p, i);
	let m = c.anyJS(i, E.ui("suppressIfUneditable"), null, u), h = c.updater.editable(a.uri);
	return m && !h && (f.style.display = "none"), f;
};
function wr(e, t, n, r, i) {
	let a = e.createElement("button");
	return a.setAttribute("type", "button"), a.innerHTML = "Edit " + F(E.ui("Form")), a.addEventListener("click", function(o) {
		Tr(e, t, {}, n, E.ui("FormForm"), r, i).setAttribute("style", E.ui("FormForm").sameTerm(n) ? "background-color: #fee;" : "background-color: #ffffe7;"), a.parentNode.removeChild(a);
	}, !0), a;
}
function Tr(e, t, n, r, i, a, o) {
	return xn(e, i)(e, t, n, r, i, a, o);
}
function Er(e, t) {
	let n = e.each(void 0, E.rdf("range"), t);
	[
		E.rdfs("comment"),
		E.dc("title"),
		E.foaf("name"),
		E.foaf("homepage")
	].forEach(function(e) {
		n.push(e);
	});
	let r = e.each(void 0, E.rdf("type"), t);
	r.length > 60 && (r = r.slice(0, 60));
	let i = {};
	for (let t = 0; t < (r.length > 60 ? 60 : r.length); t++) e.statementsMatching(r[t], void 0, void 0).forEach(function(e) {
		i[e.predicate.uri] = !0;
	});
	n.forEach(function(e) {
		i[e.uri] = !0;
	});
	let a = [];
	for (let t in i) a.push(e.sym(t));
	return a;
}
function Dr(e, t, n) {
	let r = [e.sym(t)];
	for (; r.length > 0;) {
		let t = r.shift(), i = e.each(t, n);
		if (M("Lists for " + t + ", " + n + ": " + i.length), i.length !== 0) return i;
		let a = e.each(t, E.rdfs("subClassOf"));
		for (let e = 0; e < a.length; e++) r.push(a[e]), M("findClosest: add super: " + a[e]);
	}
	return [];
}
function Or(e) {
	let t = A;
	M("formsFor: subject=" + e);
	let n = t.findTypeURIs(e), r;
	for (r in n) M("   type: " + r);
	let i = t.bottomTypeURIs(n), a = [];
	for (let e in i) M("candidatesFor: trying bottom type =" + e), a = a.concat(Dr(t, e, E.ui("creationForm"))), a = a.concat(Dr(t, e, E.ui("annotationForm")));
	return a;
}
function kr(e) {
	let t = e.map(function(e) {
		return [br.any(e, E.ui("sequence")) || 9999, e];
	});
	return t.sort(function(e, t) {
		return e[0] - t[0];
	}), t.map(function(e) {
		return e[1];
	});
}
function Ar(e) {
	let t = e.map(function(e) {
		return [F(e).toLowerCase(), e];
	});
	return t.sort(), t.map(function(e) {
		return e[1];
	});
}
function jr(e, t, n, r, i, a, o, s) {
	let c = e.createElement("button");
	return c.setAttribute("type", "button"), c.innerHTML = "New " + F(i), c.addEventListener("click", function(l) {
		c.parentNode.appendChild(Mr(e, t, n, r, i, a, o, s));
	}, !1), c;
}
function Mr(e, t, n, r, i, a, s, c) {
	let l = e.createElement("form");
	if (!a) {
		let n = Dr(t, i.uri, E.ui("creationForm"));
		if (n.length === 0) {
			let t = l.appendChild(e.createElement("p"));
			t.textContent = "I am sorry, you need to provide information about a " + F(i) + " but I don't know enough information about those to ask you.";
			let n = l.appendChild(e.createElement("button"));
			return n.setAttribute("type", "button"), n.setAttribute("style", "float: right;"), n.innerHTML = "Goto " + F(i), n.addEventListener("click", function(t) {
				e.outlineManager.GotoSubject(i, !0, void 0, !0, void 0);
			}, !1), l;
		}
		M("lists[0] is " + n[0]), a = n[0];
	}
	M("form is " + a), l.setAttribute("style", `border: 0.05em solid ${N.formBorderColor}; color: ${N.formBorderColor}`), l.innerHTML = "<h3>New " + F(i) + "</h3>";
	let u = xn(e, a), d = X(s), f = !1, p = function(a, u) {
		if (!a) return c(a, u);
		let p = [];
		n && !t.holds(n, r, d, s) && p.push(o(n, r, d, s)), n && !t.holds(d, E.rdf("type"), i, s) && p.push(o(d, E.rdf("type"), i, s)), p.length ? t.updater.update([], p, m) : c(!0, u), f ||= l.appendChild(rn(e, d));
	};
	function m(e, t, n) {
		return c(t, n);
	}
	return ye("paneUtils Object is " + d), an(e, u(e, l, {}, d, a, s, p)).setAttribute("style", "float: right;"), l.AJAR_subject = d, l;
}
function Nr(e, t, n, r, i, a) {
	let s = e.createElement("div"), c = t.anyJS(n, r, null, i) || "", l = e.createElement("textarea");
	s.appendChild(l), l.rows = c ? c.split("\n").length + 2 : 2, l.cols = 80, l.setAttribute("style", P.multilineTextInputStyle), c === null ? l.select() : l.value = c, s.refresh = function() {
		let e = t.any(n, r, null, i);
		e && e.value !== l.value && (l.value = e.value);
	};
	function u(c) {
		f.disabled = !0, f.setAttribute("style", "visibility: hidden; float: right;"), l.disabled = !0, l.style.color = N.textInputColorPending;
		let u = t.statementsMatching(n, r, null, i), d = o(n, r, l.value, i);
		t.updater.update(u, d, function(t, n, r) {
			n ? (l.style.color = N.textInputColor, l.disabled = !1) : s.appendChild(H(e, "Error (while saving change to " + i.uri + "): " + r)), a && a(n, r);
		});
	}
	let d = t.updater.editable(i.uri), f;
	return d ? (f = Wt(e, u), f.disabled = !0, f.style.visibility = "hidden", f.style.float = "right", s.appendChild(f), l.addEventListener("keyup", function(e) {
		l.style.color = "green", f && (f.disabled = !1, f.style.visibility = "");
	}, !0), l.addEventListener("change", u, !0)) : (l.disabled = !0, l.style.backgroundColor = N.textInputBackgroundColorUneditable), s;
}
function Pr(e, t, n, r, i, a, s, c) {
	M("Select list length now " + i.length);
	let l = 0, u = {}, d = t.updater.editable(s.uri);
	for (let e = 0; e < i.length; e++) {
		let t = i[e];
		t.uri || L(`makeSelectForClassifierOptions: option does not have an uri: ${t}, with predicate: ${r}`), !(!t.uri || t.uri in u) && (u[t.uri] = !0, l++);
	}
	if (l === 0 && !a.mint) return H(e, "Can't do selector with no options, subject= " + n + " property = " + r + ".");
	M("makeSelectForClassifierOptions: dataDoc=" + s);
	let f, p = function() {
		return f = {}, r.sameTerm(E.rdf("type")) ? f = t.findTypeURIs(n) : t.each(n, r, null, s).forEach(function(e) {
			f[e.uri] = !0;
		}), f;
	};
	f = p();
	let m = function(i) {
		h.disabled = !0;
		let l = [], u = [], d = function(e) {
			t.holds(n, r, e, s) && l.push(o(n, r, e, s));
		}, m;
		for (let i = 0; i < h.options.length; i++) {
			let l = h.options[i];
			if (l.selected && l.AJAR_mint) {
				if (a.mintClass) {
					let i = Mr(e, t, n, r, a.mintClass, null, s, function(e, t) {
						e || c(e, t, { change: "new" });
					});
					h.parentNode.appendChild(i), m = i.AJAR_subject;
				} else m = X(s);
				u.push(o(n, r, m, s)), a.mintStatementsFun && (u = u.concat(a.mintStatementsFun(m)));
			}
			l.AJAR_uri && (l.selected && !(l.AJAR_uri in f) && u.push(o(n, r, t.sym(l.AJAR_uri), s)), !l.selected && l.AJAR_uri in f && d(t.sym(l.AJAR_uri)), l.selected && (h.currentURI = l.AJAR_uri));
		}
		let g = h.subSelect;
		for (; g && g.currentURI;) d(t.sym(g.currentURI)), g = g.subSelect;
		for (g = h.superSelect; g && g.currentURI;) d(t.sym(g.currentURI)), g = g.superSelect;
		function _(e, t) {
			c(e, {
				widget: "select",
				event: "new"
			});
		}
		ye("makeSelectForClassifierOptions: data doc = " + s), t.updater.update(l, u, function(t, n, r) {
			if (f = p(), n) h.disabled = !1, m && xn(e, a.subForm)(e, h.parentNode, {}, m, a.subForm, s, _);
			else return h.parentNode.appendChild(H(e, "Error updating data in select: " + r));
			c && c(n, {
				widget: "select",
				event: "change"
			});
		});
	}, h = e.createElement("select");
	h.setAttribute("style", P.formSelectStyle), a.multiple && h.setAttribute("multiple", "true"), h.currentURI = null, h.refresh = function() {
		f = p();
		for (let e = 0; e < h.children.length; e++) {
			let t = h.children[e];
			t.AJAR_uri && (t.selected = t.AJAR_uri in f);
		}
		h.disabled = !1;
	};
	for (let n in u) {
		let r = t.sym(n), i = e.createElement("option");
		a.disambiguate ? i.appendChild(e.createTextNode(ve(r, !0))) : i.appendChild(e.createTextNode(F(r, !0)));
		let o = t.any(r, t.sym("http://www.w3.org/ns/ui#backgroundColor"));
		o && i.setAttribute("style", "background-color: " + o.value + "; "), i.AJAR_uri = n, n in f && (i.setAttribute("selected", "true"), h.currentURI = n), h.appendChild(i);
	}
	if (d && a.mint) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(a.mint)), t.AJAR_mint = !0, h.insertBefore(t, h.firstChild);
	}
	if (h.currentURI == null && !a.multiple) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(a.nullLabel)), h.insertBefore(t, h.firstChild), t.selected = !0;
	}
	return d && h.addEventListener("change", m, !1), h;
}
function Fr(e, t, n, r, i, a, s, c) {
	M("Select list length now " + i.length);
	let l = 0, u = {}, d = t.updater.editable(s.uri);
	for (let e = 0; e < i.length; e++) {
		let t = i[e];
		t.uri || L(`makeSelectForOptions: option does not have an uri: ${t}, with predicate: ${r}`), !(!t.uri || t.uri in u) && (u[t.uri] = !0, l++);
	}
	if (l === 0) return H(e, "Can't do selector with no options, subject= " + n + " property = " + r + ".");
	M("makeSelectForOptions: dataDoc=" + s);
	let f, p = function() {
		return f = {}, r.sameTerm(E.rdf("type")) ? f = t.findTypeURIs(n) : t.each(n, r, null, s).forEach(function(e) {
			e.uri && (f[e.uri] = !0);
		}), f;
	};
	f = p();
	let m = function(i) {
		h.disabled = !0;
		let a = [], l = [], u = function(e) {
			t.holds(n, r, e, s) && a.push(o(n, r, e, s));
		};
		for (let e = 0; e < h.options.length; e++) {
			let i = h.options[e];
			i.AJAR_uri && (i.selected && !(i.AJAR_uri in f) && l.push(o(n, r, t.sym(i.AJAR_uri), s)), !i.selected && i.AJAR_uri in f && u(t.sym(i.AJAR_uri)), i.selected && (h.currentURI = i.AJAR_uri));
		}
		let d = h.subSelect;
		for (; d && d.currentURI;) u(t.sym(d.currentURI)), d = d.subSelect;
		for (d = h.superSelect; d && d.currentURI;) u(t.sym(d.currentURI)), d = d.superSelect;
		ye("selectForOptions: data doc = " + s), t.updater.update(a, l, function(t, n, r) {
			if (f = p(), n) h.disabled = !1;
			else return h.parentNode.appendChild(H(e, "Error updating data in select: " + r));
			c && c(n, {
				widget: "select",
				event: "change"
			});
		});
	}, h = e.createElement("select");
	h.setAttribute("style", P.formSelectStyle), h.currentURI = null, h.refresh = function() {
		f = p();
		for (let e = 0; e < h.children.length; e++) {
			let t = h.children[e];
			t.AJAR_uri && (t.selected = t.AJAR_uri in f);
		}
		h.disabled = !1;
	};
	for (let n in u) {
		let r = t.sym(n), i = e.createElement("option");
		a.disambiguate ? i.appendChild(e.createTextNode(ve(r, !0))) : i.appendChild(e.createTextNode(F(r, !0)));
		let o = t.any(r, t.sym("http://www.w3.org/ns/ui#backgroundColor"));
		o && i.setAttribute("style", "background-color: " + o.value + "; "), i.AJAR_uri = n, n in f && (i.setAttribute("selected", "true"), h.currentURI = n), h.appendChild(i);
	}
	if (!h.currentURI) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(a.nullLabel)), h.insertBefore(t, h.firstChild), t.selected = !0;
	}
	return d && h.addEventListener("change", m, !1), h;
}
function Ir(e, t, n, r, i, a) {
	let o = t.any(r, E.owl("disjointUnionOf")), s, c = !1;
	return o ? s = o.elements : (s = t.each(void 0, E.rdfs("subClassOf"), r), c = !0), M("Select list length " + s.length), s.length === 0 ? H(e, "Can't do " + (c ? "multiple " : "") + "selector with no subclasses of category: " + r) : s.length === 1 ? H(e, "Can't do " + (c ? "multiple " : "") + "selector with only 1 subclass of category: " + r + ":" + s[1]) : Pr(e, t, n, E.rdf("type"), s, {
		multiple: c,
		nullLabel: "* Select type *"
	}, i, a);
}
function Lr(e, t, n, r, i, a) {
	function o() {
		c &&= (s.removeChild(c), null), u.currentURI && t.any(t.sym(u.currentURI), E.owl("disjointUnionOf")) && (c = Lr(e, t, n, t.sym(u.currentURI), i, a), u.subSelect = c.firstChild, u.subSelect.superSelect = u, s.appendChild(c));
	}
	let s = e.createElement("span"), c = null;
	function l(e, t) {
		e && o(), a(e, t);
	}
	let u = Ir(e, t, n, r, i, l);
	return s.appendChild(u), o(), s;
}
function Rr(e, t, n, r, i, a, o, s) {
	let c = e.createElement("div"), l = Tn(e, t, c, a, n), u = t.updater.editable(o.uri), d = e.createElement("button"), f = d;
	d.style = P.checkboxInputStyle, l.appendChild(d);
	function p(e) {
		if (!e) return [];
		if (e.object) return e.why ||= o, [e];
		if (e instanceof Array) return e;
		throw Error("buildCheckboxForm: bad param " + e);
	}
	i = p(i), r = p(r);
	function m(e) {
		return e.filter((e) => !t.holds(e.subject, e.predicate, e.object, e.why)).length === 0;
	}
	function h() {
		let n = m(i), o = n;
		if (r.length) {
			let l = m(r);
			if (n && l) return c.appendChild(H(e, "Inconsistent data in dataDoc!\n" + i + " and\n" + r)), c;
			if (!n && !l) {
				n = null;
				let e = t.any(a, E.ui("default"));
				o = e ? e.value === "1" : s ? null : !1;
			}
		}
		d.state = n, d.textContent = {
			true: _r,
			false: s ? vr : " ",
			null: yr
		}[o];
	}
	if (h(), !u) return c;
	let g = !1;
	return d.addEventListener("click", function(n) {
		if (g) return;
		g = !0, d.disabled = !0;
		let a = !1, o = function() {
			return a ? !1 : (a = !0, g = !1, d.disabled = !1, !0);
		}, l = function(t) {
			f.style.color = "#000", f.style.backgroundColor = "#fee", c.appendChild(H(e, `Checkbox: Error updating dataDoc from ${d.state} to ${d.newState}:\n\n${t}`));
		};
		f.style.color = "#bbb";
		let u = d.state === !0 ? i : d.state === !1 ? r : [];
		d.newState = d.state === null ? !0 : d.state === !0 ? !1 : !s || null;
		let p = d.newState === !0 ? i : d.newState === !1 ? r : [];
		I(`  Deleting  ${u}`), I(`  Inserting ${p}`);
		try {
			let e = t.updater.update(u, p, function(e, n, r) {
				o() && (n ? (f.style.color = "#000", d.state = d.newState, d.textContent = {
					true: _r,
					false: vr,
					null: yr
				}[d.state]) : (u.why && t.holds(u.subject, u.predicate, u.object, u.why) && I(" @@@@@ weird if 409 - does hold statement"), l(r)));
			});
			e && typeof e.then == "function" && e.catch(function(e) {
				o() && l(e instanceof Error ? e.message : e);
			}).finally(function() {
				o();
			});
		} catch (e) {
			throw o(), e;
		}
	}, !1), c;
}
function X(e) {
	let t = /* @__PURE__ */ new Date();
	return _(e.uri + "#id" + ("" + t.getTime()));
}
function zr(e, t, n, r, i, a, s, c, l, u, d) {
	let f = {}, p = n.updater.editable(u.uri);
	for (let e = 0; e < a.length; e++) {
		let t = a[e];
		!t.uri || t.uri in f || (f[t.uri] = !0);
	}
	if (Object.keys(f).length === 0 && !l.mint) return H(e, "Can't do selector with no options, subject= " + r + " property = " + i + ".");
	M("makeSelectForChoice: dataDoc=" + u);
	function m() {
		let e = "--- choice ---";
		return i && i.termType !== "BlankNode" && (e = "* Select for property: " + F(i) + " *"), r && r.termType !== "BlankNode" && (e = "* Select for " + F(r, !0) + " *"), e;
	}
	function h() {
		let t = e.createElement("option");
		return t.appendChild(e.createTextNode(m())), t.disabled = !0, t.value = !0, t.hidden = !0, t.selected = !0, t;
	}
	let g = function(e) {
		t.removeChild(t.lastChild), v.refresh();
	}, v = e.createElement("select");
	v.setAttribute("style", P.formSelectStyle), v.setAttribute("id", "formSelect"), v.currentURI = null;
	for (let e in f) v.appendChild(y(e));
	if (p && l.mint) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(l.mint)), t.AJAR_mint = !0, v.insertBefore(t, v.firstChild);
	}
	v.children.length === 0 && v.insertBefore(h(), v.firstChild), v.update = function(t) {
		s = t;
		let a = [], l = [], f = function(e) {
			n.holds(r, i, e, u) && a.push(o(r, i, e, u));
		}, p = function(e) {
			n.holds(r, i, e, u) || l.push(o(r, i, e, u)), c && !n.holds(e, E.rdf("type"), n.sym(c), u) && l.push(o(e, E.rdf("type"), n.sym(c), u));
		}, m = n.each(r, i, null, u).map((e) => e.value);
		for (let e of m) Br(e, s) || f(_(e));
		for (let e of s) e in m || p(_(e));
		n.updater.update(a, l, function(t, n, r) {
			if (!n) return v.parentNode.appendChild(H(e, "Error updating data in select: " + r));
			v.refresh(), d && d(n, {
				widget: "select",
				event: "change"
			});
		});
	}, v.refresh = function() {
		v.disabled = !0;
		let a = [], f;
		for (let t = 0; t < v.options.length; t++) {
			let p = v.options[t];
			if (p.selected && p.AJAR_mint) {
				if (l.mintClass) {
					let t = Mr(e, n, r, i, c, l.subForm, u, function(e, t) {
						e || d(e, t, { change: "new" });
					});
					v.parentNode.appendChild(t), f = t.AJAR_subject;
				} else f = X(u);
				a.push(o(r, i, n.sym(f), u)), c && a.push(o(f, E.rdf("type"), n.sym(c), u)), l.mintStatementsFun && (a = a.concat(l.mintStatementsFun(f))), v.currentURI = f;
			}
			p.AJAR_uri && (p.selected && Br(p.AJAR_uri, s) && (v.currentURI = p.AJAR_uri), Br(p.AJAR_uri, s) || p.removeAttribute("selected"), Br(p.AJAR_uri, s) && p.setAttribute("selected", "true"));
		}
		ye("selectForOptions: data doc = " + u), v.currentURI && l.subForm && !l.multiSelect && Cr(e, t, {}, _(v.currentURI), l.subForm, u, function(r, i) {
			r ? (n.updater.update([], a, function(n, r, i) {
				r || t.appendChild(H(e, "Error updating select: " + i));
			}), d && d(r, {
				widget: "select",
				event: "new"
			})) : t.appendChild(H(e, "Error updating data in field of select: " + i));
		}), v.disabled = !1;
	};
	function y(t) {
		let r = e.createElement("option"), i = n.sym(t), a;
		a = l.disambiguate ? ve(i, !0) : F(i, !0), r.appendChild(e.createTextNode(a)), r.setAttribute("value", t);
		let o = n.any(i, n.sym("http://www.w3.org/ns/ui#backgroundColor"));
		return o && r.setAttribute("style", "background-color: " + o.value + "; "), r.AJAR_uri = t, Br(i.value, s) && r.setAttribute("selected", "true"), r;
	}
	return p && v.addEventListener("change", g, !1), v;
}
function Br(e, t) {
	let n;
	for (n = 0; n < t.length; n++) if (t[n] === e) return !0;
	return !1;
}
function Vr(e, t, n) {
	let r, i, a, o, s, c, l, u, d, f, p, m = {};
	m[t.toNT()] = !0;
	let h = {}, g = e.transitiveClosure(m, e.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#subClassOf"), !0);
	for (let t in g) {
		s = e.statementsMatching(null, e.rdfFactory.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), e.fromNT(t), n);
		for (let e = 0, t = s.length; e < t; e++) f = s[e], h[f.subject.toNT()] = f;
		c = e.each(null, e.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#domain"), e.fromNT(t), n);
		for (let t = 0, i = c.length; t < i; t++) for (o = c[t], l = e.statementsMatching(null, o, null, n), a = 0, r = l.length; a < r; a++) f = l[a], h[f.subject.toNT()] = f;
		u = e.each(null, e.rdfFactory.namedNode("http://www.w3.org/2000/01/rdf-schema#range"), e.fromNT(t), n);
		for (let t = 0, r = u.length; t < r; t++) for (o = u[t], d = e.statementsMatching(null, o, null, n), p = 0, i = d.length; p < i; p++) f = d[p], h[f.object.toNT()] = f;
	}
	return h;
}
//#endregion
//#region src/widgets/index.js
var Hr = /* @__PURE__ */ r({
	Group: () => lt,
	GroupBuilder: () => ut,
	GroupPicker: () => ct,
	PeoplePicker: () => st,
	Person: () => dt,
	addStyleSheet: () => pn,
	allClassURIs: () => tn,
	appendForm: () => Tr,
	askName: () => Gt,
	attachmentList: () => Qt,
	basicField: () => q,
	buildCheckboxForm: () => Rr,
	button: () => G,
	cancelButton: () => Ut,
	clearElement: () => Et,
	complain: () => Tt,
	continueButton: () => Wt,
	createLinkDiv: () => Yt,
	createLinkForURI: () => bt,
	createNameDiv: () => Jt,
	defaultAnnotationStore: () => en,
	deleteButtonWithCheck: () => Ht,
	editFormButton: () => wr,
	errorMessageBlock: () => H,
	extractLogURI: () => Dt,
	faviconOrDefault: () => Bt,
	field: () => K,
	fieldFunction: () => xn,
	fieldLabel: () => En,
	fieldParams: () => vn,
	fieldStore: () => Dn,
	fileUploadButtonDiv: () => _n,
	findClosest: () => Dr,
	findImage: () => Lt,
	findImageFromURI: () => It,
	formatDateTime: () => kt,
	formsFor: () => Or,
	iconForClass: () => Pt,
	imagesOf: () => Nt,
	index: () => cn,
	isAudio: () => mn,
	isImage: () => gn,
	isVideo: () => hn,
	linkButton: () => rn,
	linkIcon: () => yt,
	makeDescription: () => Nr,
	makeDraggable: () => rt,
	makeDropTarget: () => nt,
	makeSelectForCategory: () => Ir,
	makeSelectForChoice: () => zr,
	makeSelectForClassifierOptions: () => Pr,
	makeSelectForNestedCategory: () => Lr,
	makeSelectForOptions: () => Fr,
	mostSpecificClassURI: () => bn,
	newButton: () => jr,
	newThing: () => X,
	openHrefInOutlineMode: () => $t,
	personTR: () => Kt,
	promptForNew: () => Mr,
	propertiesForClass: () => Er,
	propertyTriage: () => nn,
	publicData: () => Fn,
	refreshTree: () => Zt,
	removeButton: () => an,
	renderAsDiv: () => Xt,
	renderAsRow: () => qt,
	renderAutoComplete: () => lr,
	renderAutocompleteControl: () => mr,
	renderNameValuePair: () => Tn,
	selectorPanel: () => on,
	selectorPanelRefresh: () => sn,
	setImage: () => zt,
	setName: () => Mt,
	setVisible: () => J,
	shortDate: () => Ot,
	shortTime: () => jt,
	sortByLabel: () => Ar,
	sortBySequence: () => kr,
	timestamp: () => At,
	uploadFiles: () => it
}), Ur = {
	authEndpoint: "",
	fallbackAuthEndpoint: "https://databox.me/",
	signupEndpoint: "https://solidproject.org/get_a_pod",
	signupWindowHeight: 600,
	signupWindowWidth: 1024,
	key: "",
	cert: ""
};
//#endregion
//#region src/signup/signup.js
function Wr(e) {
	this.config = e || Ur;
}
Wr.prototype.listen = function() {
	return new Promise(function(e, t) {
		let n = window.addEventListener ? "addEventListener" : "attachEvent", r = window[n];
		r(n === "attachEvent" ? "onmessage" : "message", function(n) {
			let r = n.data;
			if (r.slice(0, 5) === "User:") {
				let n = r.slice(5, r.length);
				return n && n.length > 0 && n.slice(0, 4) === "http" ? e(n) : t(n);
			}
		}, !0);
	});
}, Wr.prototype.signup = function(e) {
	e ||= this.config.signupEndpoint;
	let t = this.config.signupWindowWidth, n = this.config.signupWindowHeight, r = window.screen.width / 2 - (t / 2 + 10), i = window.screen.height / 2 - (n / 2 + 50), a = e + "?origin=" + encodeURIComponent(window.location.origin), o = "resizable,scrollbars,status,width=" + t + ",height=" + n + ",left=" + r + ",top=" + i;
	window.open(a, "Solid signup", o);
	let s = this;
	return new Promise(function(e) {
		s.listen().then(function(t) {
			return e(t);
		});
	});
};
//#endregion
//#region src/login/login.ts
var Gr = /* @__PURE__ */ r({
	ensureLoadedPreferences: () => ti,
	ensureLoadedProfile: () => ni,
	ensureLoggedIn: () => ei,
	filterAvailablePanes: () => mi,
	findAppInstances: () => ri,
	getUserRoles: () => pi,
	loginStatusBox: () => ui,
	newAppInstance: () => fi,
	registrationControl: () => ai,
	registrationList: () => si,
	renderScopeHeadingRow: () => oi,
	renderSignInPopup: () => li,
	scopeLabel: () => ii,
	selectWorkspace: () => di
}), Kr = w.store, { loadPreferences: qr, loadProfile: Jr } = w.profile, { getScopedAppInstances: Yr, getRegistrations: Xr, loadAllTypeIndexes: Zr, getScopedAppsFromIndex: Qr, deleteTypeIndexRegistration: $r } = w.typeIndex;
function ei(e) {
	let t = S.currentUser();
	return t ? (S.saveUser(t, e), Promise.resolve(e)) : new Promise((t) => {
		S.checkUser().then((n) => {
			if (n) return I(`logIn: Already logged in as ${n}`), t(e);
			if (!e.div || !e.dom) return t(e);
			let r = ui(e.dom, (n) => {
				S.saveUser(n, e), t(e);
			});
			e.div.appendChild(r);
		});
	});
}
async function ti(e) {
	if (e.preferencesFile) return Promise.resolve(e);
	try {
		e = await ni(e);
		let t = await qr(e.me);
		e.preferencesFile = t;
	} catch (t) {
		let n;
		if (t instanceof ne) n = "Oops — you are not authenticated (properly logged in), so SolidOS cannot read your preferences file. Try logging out and then logging back in.", me(n);
		else if (t instanceof te) return n = `Unauthorized: Assuming preference file blocked for origin ${window.location.origin}`, e.preferencesFileError = n, e;
		else if (t instanceof b) return n = "You are not authorized to read your preference file. This may be because you are using an untrusted web app.", L(n), e;
		else if (t instanceof D) return n = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", L(n), e;
		else if (t instanceof ie) n = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", L(n);
		else if (t instanceof re) n = `Strange: Error ${t.status} trying to read your preference file.${t.message}`, me(n);
		else throw Error(`(via loadPrefs) ${t}`);
		e.preferencesFileError = n;
	}
	return e;
}
async function ni(e) {
	if (e.publicProfile) return e;
	try {
		let t = await ei(e);
		if (!t.me) throw Error("Could not log in");
		e.publicProfile = await Jr(t.me);
	} catch (t) {
		throw e.div && e.dom && e.div.appendChild(H(e.dom, t.message)), Error(`Can't log in: ${t}`);
	}
	return e;
}
async function ri(e, t, n) {
	let r = e.me ? await Yr(t, e.me) : [];
	return n === !0 ? r = r.filter((e) => e.scope.label === "public") : n === !1 && (r = r.filter((e) => e.scope.label === "private")), e.instances = r.map((e) => e.instance), e;
}
function ii(e, t) {
	return `${e.me && e.me.sameTerm(t.agent) ? "" : F(t.agent) + " "}${t.label}`;
}
async function ai(e, t, n) {
	function r(e) {
		let r = Xr(t, n), i = r.length ? r[0] : X(e);
		return [o(i, E.solid("instance"), t, e), o(i, E.solid("forClass"), n, e)];
	}
	function i(t) {
		let n = r(t.index), i = `${ii(e, t)} link to this ${e.noun}`;
		return Rr(e.dom, w.store, i, null, n, d, t.index);
	}
	let a = e.dom;
	if (!a || !e.div) throw Error("registrationControl: need dom and div");
	let s = a.createElement("div");
	e.div.appendChild(s), e.me = S.currentUser();
	let c = e.me;
	if (!c) return s.innerHTML = "<p style=\"margin:2em;\">(Log in to save a link to this)</p>", e;
	let l;
	try {
		l = await Zr(c);
	} catch (t) {
		let n;
		return e.div && e.preferencesFileError ? (n = "(Lists of stuff not available)", e.div.appendChild(a.createElement("p")).textContent = n) : e.div && (n = `registrationControl: Type indexes not available: ${t}`, e.div.appendChild(H(e.dom, t))), I(n), e;
	}
	s.innerHTML = "<table><tbody></tbody></table>", s.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;");
	let u = s.children[0].children[0], d = new de();
	for (let e of l) u.appendChild(a.createElement("tr")).appendChild(i(e));
	return e;
}
function oi(e, t, n) {
	let r = {
		private: "#fee",
		public: "#efe"
	}, { dom: i } = e, a = ii(e, n), o = i.createElement("tr"), s = o.appendChild(i.createElement("td"));
	s.setAttribute("colspan", "3"), s.style.backgoundColor = r[n.label] || "white";
	let c = s.appendChild(i.createElement("h3"));
	return c.textContent = a + " links", c.style.textAlign = "left", o;
}
async function si(e, t) {
	let n = e.dom, r = e.div, i = n.createElement("div");
	if (r.appendChild(i), e.me = S.currentUser(), !e.me) return i.innerHTML = "<p style=\"margin:2em;\">(Log in list your stuff)</p>", e;
	let a = await Zr(e.me);
	i.innerHTML = "<table><tbody></tbody></table>", i.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid #eee 0.5em;");
	let o = i.firstChild.firstChild;
	for (let r of a) {
		let i = oi(e, Kr, r);
		o.appendChild(i);
		let a = await Qr(r, t.type || null);
		a.length === 0 && (i.style.display = "none");
		for (let e of a) {
			let t = Kt(n, E.solid("instance"), e.instance, { deleteFunction: async () => {
				await $r(e), o.removeChild(t);
			} });
			t.children[0].style.paddingLeft = "3em", o.appendChild(t);
		}
	}
	return e;
}
function ci(e, t, n = {}) {
	n ||= {};
	let r = n.buttonStyle || P.signInAndUpButtonStyle, i = e.createElement("div"), a = "SolidSignInOrSignUpBox";
	I("widgets.signInOrSignUpBox"), i.setUserCallback = t, i.setAttribute("class", a), i.setAttribute("style", "display:flex;");
	let o = e.createElement("input");
	i.appendChild(o), o.setAttribute("type", "button"), o.setAttribute("value", "Log in"), o.setAttribute("style", `${r}${P.headerBannerLoginInput}` + P.signUpBackground), j.events.on("login", () => {
		let t = S.currentUser();
		if (t) {
			let n = t.uri, r = e.getElementsByClassName(a);
			I(`Logged in, ${r.length} panels to be serviced`);
			for (let t = 0; t < r.length; t++) {
				let i = r[t];
				if (i.setUserCallback) try {
					i.setUserCallback(n);
					let e = i.parentNode;
					e && e.removeChild(i);
				} catch (t) {
					I(`## Error satisfying login box: ${t}`), i.appendChild(H(e, t));
				}
			}
		}
	}), o.addEventListener("click", () => {
		let n = C();
		if (n) return t(n.uri);
		li(e);
	}, !1);
	let s = e.createElement("input");
	return i.appendChild(s), s.setAttribute("type", "button"), s.setAttribute("value", "Sign Up for Solid"), s.setAttribute("style", `${r}${P.headerBannerLoginInput}` + P.signInBackground), s.addEventListener("click", function(e) {
		new Wr().signup().then(function(e) {
			I("signInOrSignUpBox signed up " + e), t(e);
		});
	}, !1), i;
}
function li(e) {
	let t = e.createElement("div");
	t.setAttribute("style", "position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center;"), e.body.appendChild(t);
	let n = e.createElement("div");
	n.setAttribute("style", "\n      background-color: white;\n      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -moz-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      border-radius: 4px;\n      min-width: 400px;\n      padding: 10px;\n      z-index : 10;\n    "), t.appendChild(n);
	let r = e.createElement("div");
	r.setAttribute("style", "\n      border-bottom: 1px solid #DDD;\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      justify-content: space-between;\n    "), n.appendChild(r);
	let i = e.createElement("label");
	i.setAttribute("style", "margin-right: 5px; font-weight: 800"), i.innerText = "Select an identity provider";
	let a = e.createElement("button");
	a.innerHTML = "<img src=\"https://solidos.github.io/solid-ui/src/icons/noun_1180156.svg\" style=\"width: 2em; height: 2em;\" title=\"Cancel\">", a.setAttribute("style", "background-color: transparent; border: none;"), a.addEventListener("click", () => {
		t.remove();
	}), r.appendChild(i), r.appendChild(a);
	let o = async (e) => {
		try {
			w.store.updater.flagAuthorizationMetadata();
			let t = new URL(window.location.href).hash;
			t && window.localStorage.setItem("preLoginRedirectHash", t), window.localStorage.setItem("loginIssuer", e);
			let n = new URL(window.location.href);
			n.hash = "", await j.login(e, n.href);
		} catch (e) {
			me(e.message);
		}
	}, s = e.createElement("div");
	s.setAttribute("style", "\n      border-bottom: 1px solid #DDD;\n      display: flex;\n      flex-direction: column;\n      padding-top: 10px;\n    ");
	let c = e.createElement("div");
	c.setAttribute("style", "\n      display: flex;\n      flex-direction: row;\n    ");
	let l = e.createElement("label");
	l.innerText = "Enter the URL of your identity provider:", l.setAttribute("style", "color: #888");
	let u = e.createElement("input");
	u.setAttribute("type", "text"), u.setAttribute("style", "margin-left: 0 !important; flex: 1; margin-right: 5px !important"), u.setAttribute("placeholder", "https://example.com"), u.value = localStorage.getItem("loginIssuer") || "";
	let d = e.createElement("button");
	d.innerText = "Go", d.setAttribute("style", "margin-top: 12px; margin-bottom: 12px;"), d.addEventListener("click", () => {
		o(u.value);
	}), s.appendChild(l), c.appendChild(u), c.appendChild(d), s.appendChild(c), n.appendChild(s);
	let f = e.createElement("div");
	f.setAttribute("style", "\n      display: flex;\n      flex-direction: column;\n      padding-top: 10px;\n    ");
	let p = e.createElement("label");
	p.innerText = "Or pick an identity provider from the list below:", p.setAttribute("style", "color: #888"), f.appendChild(p), oe().forEach((t) => {
		let n = e.createElement("button");
		n.innerText = t.name, n.setAttribute("style", "height: 38px; margin-top: 10px"), n.addEventListener("click", () => {
			o(t.uri);
		}), f.appendChild(n);
	}), n.appendChild(f);
}
function ui(e, t = null, n = {}) {
	let r = C(), i = e.createElement("div");
	function a(e) {
		e && (r = S.saveUser(e), i.refresh(), t && t(r.uri));
	}
	function o(e) {
		let n = r;
		j.logout().then(function() {
			let e = `Your WebID was ${n}. It has been forgotten.`;
			r = null;
			try {
				me(e);
			} catch {
				window.alert(e);
			}
			i.refresh(), t && t(null);
		}, (e) => {
			me("Fail to log out:" + e);
		});
	}
	function s(t, n) {
		let r = n.buttonStyle || P.signInAndUpButtonStyle, i = "WebID logout";
		if (t) {
			let e = w.store.any(t, E.foaf("nick")) || w.store.any(t, E.foaf("name"));
			e && (i = "Logout " + e.value);
		}
		let a = e.createElement("input");
		return a.setAttribute("type", "button"), a.setAttribute("value", i), a.setAttribute("style", `${r}`), a.addEventListener("click", o, !1), a;
	}
	i.refresh = function() {
		let t = j.webId;
		r = t ? w.store.sym(t) : null, (r && i.me !== r.uri || !r && i.me) && (Et(i), r ? i.appendChild(s(r, n)) : i.appendChild(ci(e, a, n))), i.me = r ? r.uri : null;
	}, i.refresh();
	function c() {
		r = S.currentUser(), i.refresh();
	}
	return c(), j.events.on("login", c), j.events.on("logout", c), i.me = "99999", i.refresh(), i;
}
j.events.on("logout", async () => {
	let e = window.localStorage.getItem("loginIssuer");
	if (e) try {
		w.store.updater.flagAuthorizationMetadata();
		let t = new URL(e);
		t.pathname = "/.well-known/openid-configuration";
		let n = await fetch(t.toString());
		if (n.status === 200) {
			let e = await n.json();
			e && e.end_session_endpoint && await fetch(e.end_session_endpoint, { credentials: "include" });
		}
		try {
			await fetch("/.well-known/solid/logout", { credentials: "include" });
		} catch {}
	} catch {}
	window.location.reload();
});
function di(e, t, n) {
	let r = t.noun, i = t.appPathSegment, a = C(), s = e.createElement("div"), c = {
		me: a,
		dom: e,
		div: s
	};
	function l(t, n) {
		s.appendChild(H(e, t, n));
	}
	function u(e) {
		let t = w.store.any(e, E.space("uriPrefix")), n;
		return n = t ? t.value : e.uri.split("#")[0], n.slice(-1) !== "/" && (I(`${i}: No / at end of uriPrefix ${n}`), n = `${n}/`), n += `${i}/id${(/* @__PURE__ */ new Date()).getTime()}/`, n;
	}
	function d(t) {
		async function i(n) {
			let r = m.appendChild(e.createElement("tr")).appendChild(e.createElement("td"));
			r.setAttribute("colspan", "3"), r.style.padding = "0.5em";
			let i = encodeURI(await Gt(e, w.store, r, E.solid("URL"), E.space("Workspace"), "Workspace")), a = X(t.preferencesFile), s = [o(t.me, E.space("workspace"), a, t.preferencesFile), o(a, E.space("uriPrefix"), i, t.preferencesFile)];
			if (!w.store.updater) throw Error("store has no updater");
			await w.store.updater.update([], s);
		}
		let a = t.me, c = t.preferencesFile, d = null, f = w.store.each(a, E.space("workspace"), void 0, c), p = w.store.each(a, E.space("storage"));
		f.length === 0 && p && (l(`You don't seem to have any workspaces. You have ${p.length} storage spaces.`, "white"), p.map(function(e) {
			return f = f.concat(w.store.each(e, E.ldp("contains"))), f;
		}).filter((e) => e.id ? ["public", "private"].includes(e.id().toLowerCase()) : "")), f.length === 1 && (l(`Workspace used: ${f[0].uri}`, "white"), d = u(f[0]));
		let m = e.createElement("table");
		m.setAttribute("style", "border-collapse:separate; border-spacing: 0.5em;"), s.appendChild(m), s.appendChild(e.createElement("hr"));
		let h = s.appendChild(e.createElement("p"));
		h.setAttribute("style", P.commentStyle), h.textContent = `Where would you like to store the data for the ${r}?
    Give the URL of the folder where you would like the data stored.
    It can be anywhere in solid world - this URI is just an idea.`;
		let g = s.appendChild(e.createElement("input"));
		g.setAttribute("type", "text"), g.setAttribute("style", P.textInputStyle), g.size = 80, g.label = "base URL", g.autocomplete = "on", d && (g.value = d), t.baseField = g, s.appendChild(e.createElement("br"));
		let _ = s.appendChild(e.createElement("button"));
		_.setAttribute("style", P.buttonStyle), _.textContent = `Start new ${r} at this URI`, _.addEventListener("click", function(e) {
			let t = g.value.replace(" ", "%20");
			t.slice(-1) !== "/" && (t += "/"), n(null, t);
		}), f = f.filter(function(e) {
			return !w.store.holds(e, E.rdf("type"), E.space("MasterWorkspace"));
		});
		let v, y, b, x, S, C, T, D = "height: 3em; margin: 1em; padding: 1em white; border-radius: 0.3em;", O = `${D}border: 0px;`;
		for (let t = 0; t < f.length; t++) {
			S = f[t], x = e.createElement("tr"), t === 0 && (v = e.createElement("td"), v.setAttribute("rowspan", `${f.length}`), v.textContent = "Choose a workspace for this:", v.setAttribute("style", "vertical-align:middle;"), x.appendChild(v)), y = e.createElement("td"), C = w.store.anyValue(S, E.ui("style")), C ||= `color: black ; background-color: ${`#${(function(e) {
				return e.split("").reduce(function(e, t) {
					return e = (e << 5) - e + t.charCodeAt(0), e & e;
				}, 0);
			}(S.uri) & 16777215 | 12632256).toString(16)}`};`, y.setAttribute("style", O + C), x.target = S.uri;
			let r = w.store.any(S, E.rdfs("label"));
			r ||= S.uri.split("/").slice(-1)[0] || S.uri.split("/").slice(-2)[0], y.textContent = r || "???", x.appendChild(y), t === 0 && (b = e.createElement("td"), b.setAttribute("rowspan", `${f.length}1`), b.setAttribute("style", "width:50%;"), x.appendChild(b)), m.appendChild(x), T = w.store.any(S, E.rdfs("comment")), T = T ? T.value : "Use this workspace", y.addEventListener("click", function(t) {
				b.textContent = T ? T.value : "", b.setAttribute("style", O + C);
				let r = e.createElement("button");
				r.textContent = "Continue";
				let i = u(S);
				g.value = i, r.addEventListener("click", function(e) {
					r.disabled = !0, n(S, i), r.textContent = "---->";
				}, !0), b.appendChild(r);
			}, !0);
		}
		let k = e.createElement("tr");
		y = e.createElement("td"), y.setAttribute("style", D), y.textContent = "+ Make a new workspace", y.addEventListener("click", i), k.appendChild(y), m.appendChild(k);
	}
	return ti(c).then(d).catch((e) => {
		s.appendChild(H(c.dom, e));
	}), s;
}
function fi(e, t, n) {
	let r = function(e, t) {
		n(e, t);
	}, i = e.createElement("div"), a = e.createElement("button");
	return a.setAttribute("type", "button"), i.appendChild(a), a.innerHTML = `Make new ${t.noun}`, a.addEventListener("click", (n) => {
		i.appendChild(di(e, t, r));
	}, !1), i.appendChild(a), i;
}
async function pi() {
	try {
		let { me: e, preferencesFile: t, preferencesFileError: n } = await ti({});
		if (!t || n) throw Error(n);
		return w.store.each(e, E.rdf("type"), null, t.doc());
	} catch (e) {
		L("Unable to fetch your preferences - this was the error: ", e);
	}
	return [];
}
async function mi(e) {
	let t = await pi();
	return e.filter((e) => hi(e, t));
}
function hi(e, t) {
	return (e.audience || []).reduce((e, n) => e && !!t.find((e) => e.equals(n)), !0);
}
//#endregion
//#region src/acl/add-agent-buttons.ts
var gi = class {
	rootElement;
	barElement;
	isExpanded = !1;
	constructor(e) {
		this.groupList = e, this.rootElement = e.controller.dom.createElement("div"), this.barElement = e.controller.dom.createElement("div");
	}
	render() {
		return this.rootElement.innerHTML = "", this.rootElement.appendChild(this.renderAddButton()), this.rootElement.appendChild(this.barElement), this.rootElement;
	}
	renderAddButton() {
		return G(this.groupList.controller.dom, `${U.iconBase}noun_34653_green.svg`, "Add ...", () => {
			this.toggleBar(), this.renderBar();
		});
	}
	renderBar() {
		this.barElement.innerHTML = "", this.isExpanded && (this.barElement.appendChild(this.renderPersonButton()), this.barElement.appendChild(this.renderGroupButton()), this.barElement.appendChild(this.renderPublicButton()), this.barElement.appendChild(this.renderAuthenticatedAgentButton()), this.barElement.appendChild(this.renderBotButton()), this.barElement.appendChild(this.renderAppsButton()));
	}
	renderSimplifiedBar(e) {
		Array.from(this.barElement.children).filter((t) => t !== e).forEach((e) => this.barElement.removeChild(e));
	}
	renderPersonButton() {
		return G(this.groupList.controller.dom, U.iconBase + Pt["vcard:Individual"], "Add Person", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(E.vcard("Individual"), "person").then((e) => this.addPerson(e)).then(() => this.renderCleanup()).catch((e) => this.groupList.controller.renderStatus(e));
		});
	}
	renderGroupButton() {
		return G(this.groupList.controller.dom, U.iconBase + Pt["vcard:Group"], "Add Group", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(E.vcard("Group"), "group").then((e) => this.addGroup(e)).then(() => this.renderCleanup()).catch((e) => this.groupList.controller.renderStatus(e));
		});
	}
	renderNameForm(e, t) {
		return Gt(this.groupList.controller.dom, this.groupList.store, this.barElement, E.vcard("URI"), e, t);
	}
	renderPublicButton() {
		return G(this.groupList.controller.dom, U.iconBase + Pt["foaf:Agent"], "Add Everyone", () => this.addAgent(E.foaf("Agent").uri).then(() => this.groupList.controller.renderTemporaryStatus("Adding the general public to those who can read. Drag the globe to a different level to give them more access.")).then(() => this.renderCleanup()));
	}
	renderAuthenticatedAgentButton() {
		return G(this.groupList.controller.dom, `${U.iconBase}noun_99101.svg`, "Anyone logged In", () => this.addAgent(E.acl("AuthenticatedAgent").uri).then(() => this.groupList.controller.renderTemporaryStatus("Adding anyone logged in to those who can read. Drag the ID icon to a different level to give them more access.")).then(() => this.renderCleanup()));
	}
	renderBotButton() {
		return G(this.groupList.controller.dom, U.iconBase + "noun_Robot_849764.svg", "A Software Agent (bot)", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(E.schema("Application"), "bot").then((e) => this.addBot(e)).then(() => this.renderCleanup());
		});
	}
	renderAppsButton() {
		return G(this.groupList.controller.dom, `${U.iconBase}noun_15177.svg`, "A Web App (origin)", (e) => {
			this.renderSimplifiedBar(e.target);
			let t = {
				div: this.barElement,
				dom: this.groupList.controller.dom
			}, n = this.renderAppsTable(t).catch((e) => this.groupList.controller.renderStatus(e));
			this.renderAppsView();
			let r = this.renderNameForm(E.schema("WebApplication"), "webapp domain").then((e) => this.getOriginFromName(e));
			Promise.race([n, r]).then((e) => {
				e && this.groupList.addNewURI(e);
			}).then(() => this.renderCleanup());
		});
	}
	renderAppsView() {
		let e = this.groupList.controller.context.session.paneRegistry.byName("trustedApplications");
		if (e) {
			let t = e.render(null, this.groupList.controller.context);
			t.setAttribute("style", P.trustedAppController);
			let n = Ut(this.groupList.controller.dom, () => this.renderCleanup());
			n.setAttribute("style", P.trustedAppCancelButton), t.insertBefore(n, t.firstChild), this.barElement.appendChild(t);
		}
	}
	async renderAppsTable(e) {
		await ni(e);
		let t = this.groupList.store.each(e.me, E.acl("trustedApp")), n = t.flatMap((e) => this.groupList.store.each(e, E.acl("origin")));
		return this.barElement.appendChild(this.groupList.controller.dom.createElement("p")).textContent = `You have ${n.length} selected web apps.`, new Promise((e, n) => {
			let r = this.barElement.appendChild(this.groupList.controller.dom.createElement("table"));
			r.setAttribute("style", P.trustedAppAddApplicationsTable), t.forEach((t) => {
				let i = this.groupList.store.any(t, E.acl("origin"));
				i || n(/* @__PURE__ */ Error(`Unable to pick app: ${t.value}`));
				let a = Kt(this.groupList.controller.dom, E.acl("origin"), i, {}), o = this.groupList.controller.dom.createElement("table"), s = o.appendChild(this.groupList.controller.dom.createElement("tr"));
				s.appendChild(this.groupList.controller.dom.createElement("td")).appendChild(a);
				let c = s.appendChild(this.groupList.controller.dom.createElement("td"));
				c.textContent = `Give access to ${this.groupList.controller.noun} ${F(this.groupList.controller.subject)}?`, s.appendChild(this.groupList.controller.dom.createElement("td")).appendChild(Wt(this.groupList.controller.dom, () => e(i.value))), r.appendChild(o);
			});
		});
	}
	renderCleanup() {
		this.renderBar(), this.groupList.render();
	}
	async addPerson(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		I(`Adding to ACL person: ${e}`), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addGroup(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		I("Adding to ACL group: " + e), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addAgent(e) {
		await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addBot(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		I("Adding to ACL bot: " + e), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async getOriginFromName(e) {
		if (!e) return Promise.resolve();
		if (!e.match(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i)) return Promise.reject(/* @__PURE__ */ Error("Not a domain name"));
		let t = "https://" + e;
		return I("Adding to ACL origin: " + t), this.toggleBar(), t;
	}
	toggleBar() {
		this.isExpanded = !this.isExpanded;
	}
}, _i = E.acl, vi = {
	13: "Owners",
	9: "Owners (write locked)",
	5: "Editors",
	3: "Posters",
	2: "Submitters",
	1: "Viewers"
}, yi = {
	13: !0,
	5: !0,
	3: !0,
	2: !0,
	1: !0
}, bi = {
	13: "can read, write, and control sharing.",
	9: "can read and control sharing, currently write-locked.",
	5: "can read and change information",
	3: "can add new information, and read but not change existing information",
	2: "can add new information but not read any",
	1: "can read but not change information"
}, xi = class {
	defaults;
	byCombo;
	aclMap;
	addAgentButton;
	rootElement;
	_store;
	constructor(e, t, n, r, i = {}) {
		this.doc = e, this.aclDoc = t, this.controller = n, this._options = i, this.defaults = this._options.defaults || !1, this._store = r, this.aclMap = we(e, t, r, this.defaults), this.byCombo = Oe(this.aclMap), this.addAgentButton = new gi(this), this.rootElement = this.controller.dom.createElement("div"), this.rootElement.setAttribute("style", P.accessGroupList);
	}
	get store() {
		return this._store;
	}
	set store(e) {
		this._store = e, this.aclMap = we(this.doc, this.aclDoc, e, this.defaults), this.byCombo = Oe(this.aclMap);
	}
	render() {
		return this.rootElement.innerHTML = "", this.renderGroups().forEach((e) => this.rootElement.appendChild(e)), this.controller.isEditable && this.rootElement.appendChild(this.addAgentButton.render()), this.rootElement;
	}
	renderGroups() {
		let e = [];
		for (let t = 15; t > 0; t--) {
			let n = Si(t);
			(this.controller.isEditable && yi[t] || this.byCombo[n]) && e.push(this.renderGroup(t, n));
		}
		return e;
	}
	renderGroup(e, t) {
		let n = this.controller.dom.createElement("div");
		return n.setAttribute("style", P.accessGroupListItem), nt(n, (e) => this.handleDroppedUris(e, t).then(() => this.controller.render()).catch((e) => this.controller.renderStatus(e))), this.renderGroupElements(e, t).forEach((e) => n.appendChild(e)), n;
	}
	renderGroupElements(e, t) {
		let n = this.controller.dom.createElement("div");
		if (n.setAttribute("style", P.group), this.controller.isEditable) switch (e) {
			case 1:
				n.setAttribute("style", P.group1);
				break;
			case 2:
				n.setAttribute("style", P.group2);
				break;
			case 3:
				n.setAttribute("style", P.group3);
				break;
			case 5:
				n.setAttribute("style", P.group5);
				break;
			case 9:
				n.setAttribute("style", P.group9);
				break;
			case 13:
				n.setAttribute("style", P.group13);
				break;
			default: n.setAttribute("style", P.group);
		}
		n.innerText = vi[e] || Ci(e);
		let r = this.controller.dom.createElement("div");
		if (r.setAttribute("style", P.group), this.controller.isEditable) switch (e) {
			case 1:
				r.setAttribute("style", P.group1);
				break;
			case 2:
				r.setAttribute("style", P.group2);
				break;
			case 3:
				r.setAttribute("style", P.group3);
				break;
			case 5:
				r.setAttribute("style", P.group5);
				break;
			case 9:
				r.setAttribute("style", P.group9);
				break;
			case 13:
				r.setAttribute("style", P.group13);
				break;
			default: r.setAttribute("style", P.group);
		}
		let i = r.appendChild(this.controller.dom.createElement("table"));
		(this.byCombo[t] || []).map(([e, n]) => this.renderAgent(i, t, e, n)).forEach((e) => i.appendChild(e));
		let a = this.controller.dom.createElement("div");
		if (a.setAttribute("style", P.group), this.controller.isEditable) switch (e) {
			case 1:
				a.setAttribute("style", P.group1);
				break;
			case 2:
				a.setAttribute("style", P.group2);
				break;
			case 3:
				a.setAttribute("style", P.group3);
				break;
			case 5:
				a.setAttribute("style", P.group5);
				break;
			case 9:
				a.setAttribute("style", P.group9);
				break;
			case 13:
				a.setAttribute("style", P.group13);
				break;
			default: a.setAttribute("style", P.group);
		}
		return a.innerText = bi[e] || "Unusual combination", [
			n,
			r,
			a
		];
	}
	renderAgent(e, t, n, r) {
		let i = Kt(this.controller.dom, _i(n), _(r), this.controller.isEditable ? { deleteFunction: () => this.deleteAgent(t, n, r).then(() => e.removeChild(i)).catch((e) => this.controller.renderStatus(e)) } : {});
		return i;
	}
	async deleteAgent(e, t, n) {
		let r = this.byCombo[e] || [], i = r.find(([e, r]) => e === t && r === n);
		i && r.splice(r.indexOf(i), 1), await this.controller.save();
	}
	async addNewURI(e) {
		await this.handleDroppedUri(e, Si(1)), await this.controller.save();
	}
	async handleDroppedUris(e, t) {
		try {
			await Promise.all(e.map((e) => this.handleDroppedUri(e, t))), await this.controller.save();
		} catch (e) {
			return Promise.reject(e);
		}
	}
	async handleDroppedUri(e, t, n = !1) {
		let r = wi(e, this.store), i = _(e);
		if (!r && !n) {
			I(`   Not obvious: looking up dropped thing ${i}`);
			try {
				await this._store?.fetcher?.load(i.doc());
			} catch (e) {
				let t = `Ignore error looking up dropped thing: ${e}`;
				return R(t), Promise.reject(Error(t));
			}
			return this.handleDroppedUri(e, t, !0);
		} else if (!r) {
			let t = Object.keys(this.store.findTypeURIs(i)), n = t.length > 0 ? `Detected RDF types: ${t.join(", ")}` : "No RDF type was detected for this URI.", r = `Error: Failed to add access target: ${e} is not a recognized ACL target type. Expected one of: vcard:WebID, vcard:Group, foaf:Person, foaf:Agent, solid:AppProvider, solid:AppProviderClass, or recognized ACL classes. Hint: try dropping a WebID profile URI, a vcard:Group URI, or a web app origin.` + n;
			return R(r), Promise.reject(Error(r));
		}
		this.setACLCombo(t, e, r, this.controller.subject);
	}
	setACLCombo(e, t, n, r) {
		e in this.byCombo || (this.byCombo[e] = []), this.removeAgentFromCombos(t), this.byCombo[e].push([n.pred, n.obj.uri]), I(`ACL: setting access to ${r} by ${n.pred}: ${n.obj}`);
	}
	removeAgentFromCombos(e) {
		for (let t = 0; t < 16; t++) {
			let n = this.byCombo[Si(t)];
			if (n) for (let t = 0; t < n.length; t++) for (; t < n.length && n[t][1] === e;) n.splice(t, 1);
		}
	}
};
function Si(e) {
	let t = [
		"Read",
		"Append",
		"Write",
		"Control"
	], n = [];
	for (let r = 0; r < 4; r++) e & 1 << r && n.push("http://www.w3.org/ns/auth/acl#" + t[r]);
	return n.sort(), n.join("\n");
}
function Ci(e) {
	let t = "", n = [
		"Read",
		"Append",
		"Write",
		"Control"
	];
	for (let r = 0; r < 4; r++) e & 1 << r && (t += n[r]);
	return t;
}
function wi(e, t) {
	let n = _(e), r = t.findTypeURIs(n);
	for (let e in r) I("    drop object type includes: " + e);
	if (e.startsWith("http") && e.split("/").length === 3) return {
		pred: "origin",
		obj: n
	};
	if (e.startsWith("http") && e.split("/").length === 4 && e.endsWith("/")) return I("Assuming final slash on dragged origin URI was unintended!"), {
		pred: "origin",
		obj: _(e.slice(0, -1))
	};
	if (E.vcard("WebID").uri in r) return {
		pred: "agent",
		obj: n
	};
	if (E.vcard("Group").uri in r) return {
		pred: "agentGroup",
		obj: n
	};
	if (n.sameTerm(E.foaf("Agent")) || n.sameTerm(E.acl("AuthenticatedAgent")) || n.sameTerm(E.rdf("Resource")) || n.sameTerm(E.owl("Thing"))) return {
		pred: "agentClass",
		obj: n
	};
	if (E.vcard("Individual").uri in r || E.foaf("Person").uri in r || E.foaf("Agent").uri in r) {
		let e = t.any(n, E.foaf("preferredURI"));
		return e ? {
			pred: "agent",
			obj: _(e)
		} : {
			pred: "agent",
			obj: n
		};
	}
	return E.solid("AppProvider").uri in r ? {
		pred: "origin",
		obj: n
	} : E.solid("AppProviderClass").uri in r ? {
		pred: "originClass",
		obj: n
	} : (I("    Triage fails for " + e), null);
}
//#endregion
//#region src/acl/access-controller.ts
var Ti = class {
	mainCombo;
	defaultsCombo;
	isContainer;
	defaultsDiffer;
	rootElement;
	isUsingDefaults;
	constructor(e, t, n, r, i, a, o, s, c, l, u, d) {
		if (this.subject = e, this.noun = t, this.context = n, this.statusElement = r, this.targetIsProtected = i, this.targetDoc = a, this.targetACLDoc = o, this.defaultHolder = s, this.defaultACLDoc = c, this.prospectiveDefaultHolder = l, this.store = u, this.dom = d, this.rootElement = d.createElement("div"), this.rootElement.setAttribute("style", P.aclGroupContent), this.isContainer = a.uri.slice(-1) === "/", s && c) {
			this.isUsingDefaults = !0;
			let e = Ce(this.targetDoc, o, s, c);
			this.mainCombo = new xi(a, o, this, e, { defaults: this.isContainer }), this.defaultsCombo = null, this.defaultsDiffer = !1;
		} else this.isUsingDefaults = !1, this.mainCombo = new xi(a, o, this, u), this.defaultsCombo = new xi(a, o, this, u, { defaults: this.isContainer }), this.defaultsDiffer = !Te(this.mainCombo.aclMap, this.defaultsCombo.aclMap);
	}
	get isEditable() {
		return !this.isUsingDefaults;
	}
	render() {
		if (this.rootElement.innerHTML = "", this.isUsingDefaults) {
			if (this.renderStatus(`The sharing for this ${this.noun} is the default for folder `), this.defaultHolder) {
				let e = this.statusElement.appendChild(this.dom.createElement("a"));
				e.href = this.defaultHolder.uri, e.innerText = ji(this.defaultHolder);
			}
		} else !this.defaultsDiffer && this.isContainer ? this.renderStatus("This is also the default for things in this folder.") : this.renderStatus("");
		return this.rootElement.appendChild(this.mainCombo.render()), this.defaultsCombo && this.defaultsDiffer ? (this.rootElement.appendChild(this.renderRemoveDefaultsController()), this.rootElement.appendChild(this.defaultsCombo.render())) : this.isEditable && this.isContainer && this.rootElement.appendChild(this.renderAddDefaultsController()), !this.targetIsProtected && this.isUsingDefaults ? this.rootElement.appendChild(this.renderAddAclsController()) : this.targetIsProtected || this.rootElement.appendChild(this.renderRemoveAclsController()), this.rootElement;
	}
	renderRemoveAclsController() {
		let e = this.dom.createElement("button");
		return e.innerText = `Remove custom sharing settings for this ${this.noun} -- just use default${this.prospectiveDefaultHolder ? ` for ${F(this.prospectiveDefaultHolder)}` : ""}`, e.setAttribute("style", P.bigButton), e.addEventListener("click", () => this.removeAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderAddAclsController() {
		let e = this.dom.createElement("button");
		return e.innerText = `Set specific sharing for this ${this.noun}`, e.setAttribute("style", P.bigButton), e.addEventListener("click", () => this.addAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderAddDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", P.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Sharing for things within the folder currently tracks sharing for the folder.", t.setAttribute("style", P.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set the sharing of folder contents separately from the sharing for the folder", n.setAttribute("style", P.bigButton), n.addEventListener("click", () => this.addDefaults().then(() => this.render())), e;
	}
	renderRemoveDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", P.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Access to things within this folder:", t.setAttribute("style", P.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set default for folder contents to just track the sharing for the folder", n.setAttribute("style", P.bigButton), n.addEventListener("click", () => this.removeDefaults().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderTemporaryStatus(e) {
		this.statusElement.setAttribute("style", P.aclControlBoxStatusRevealed), this.statusElement.innerText = e, this.statusElement.setAttribute("style", P.temporaryStatusInit), setTimeout(() => {
			this.statusElement.setAttribute("style", P.temporaryStatusEnd);
		}), setTimeout(() => {
			this.statusElement.innerText = "";
		}, 5e3);
	}
	renderStatus(e) {
		e || this.statusElement.setAttribute("style", P.aclControlBoxStatusRevealed), this.statusElement.innerText = e;
	}
	async addAcls() {
		if (!this.defaultHolder || !this.defaultACLDoc) {
			let e = "Unable to find defaults to copy";
			return R(e), Promise.reject(e);
		}
		Ce(this.targetDoc, this.targetACLDoc, this.defaultHolder, this.defaultACLDoc).statements.forEach((e) => this.store.add(e.subject, e.predicate, e.object, this.targetACLDoc));
		try {
			return await this.store.fetcher.putBack(this.targetACLDoc), this.isUsingDefaults = !1, Promise.resolve();
		} catch (e) {
			let t = ` Error writing back access control file! ${e}`;
			return R(t), Promise.reject(t);
		}
	}
	async addDefaults() {
		this.defaultsCombo = new xi(this.targetDoc, this.targetACLDoc, this, this.store, { defaults: !0 }), this.defaultsDiffer = !0;
	}
	async removeAcls() {
		try {
			await this.store.fetcher.delete(this.targetACLDoc.uri, {}), this.isUsingDefaults = !0;
			try {
				this.prospectiveDefaultHolder = await Ve(this.targetDoc.uri);
			} catch (e) {
				L(e);
			}
		} catch (e) {
			let t = `Error deleting access control file: ${this.targetACLDoc}: ${e}`;
			return R(t), Promise.reject(t);
		}
	}
	async removeDefaults() {
		let e = this.defaultsCombo;
		try {
			this.defaultsCombo = null, this.defaultsDiffer = !1, await this.save();
		} catch (t) {
			return this.defaultsCombo = e, this.defaultsDiffer = !0, R(t), Promise.reject(t);
		}
	}
	save() {
		let e = ue();
		this.isContainer ? this.defaultsCombo && this.defaultsDiffer ? (Ae(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), Ae(e, this.targetDoc, this.defaultsCombo.byCombo, this.targetACLDoc, !1, !0)) : Ae(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0, !0) : Ae(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), e.fetcher = y(e, { fetch: this.store.fetcher._fetch });
		let t = e.updater || new c(e);
		return new Promise((n, r) => {
			t.put(this.targetACLDoc, e.statementsMatching(void 0, void 0, void 0, this.targetACLDoc), "text/turtle", (t, i, a) => {
				if (!i) return r(/* @__PURE__ */ Error(`ACL file save failed: ${a}`));
				this.store.fetcher.unload(this.targetACLDoc), this.store.add(e.statements), this.store.fetcher.requested[this.targetACLDoc.uri] = "done", this.mainCombo.store = this.store, this.defaultsCombo && (this.defaultsCombo.store = this.store), this.defaultsDiffer = !!this.defaultsCombo && !Te(this.mainCombo.aclMap, this.defaultsCombo.aclMap), I("ACL modification: success!"), n();
			});
		});
	}
}, Ei = window, Di = Symbol("prevent double triggering of drop event");
function Oi(e) {
	if (I("preventBrowserDropEvents called."), Ei !== void 0) {
		if (Ei[Di]) return;
		Ei[Di] = !0;
	}
	e.addEventListener("drop", Ai, !1), e.addEventListener("dragenter", ki, !1), e.addEventListener("dragover", ki, !1);
}
function ki(e) {
	e.stopPropagation(), e.preventDefault();
}
function Ai(e) {
	e.dataTransfer.files.length > 0 && (Ei.confirm("Are you sure you want to drop this file here? (Cancel opens it in a new tab)") || (e.stopPropagation(), e.preventDefault(), I("@@@@ document-level DROP suppressed: " + e.dataTransfer.dropEffect)));
}
function ji(e) {
	let t = e.uri;
	t.slice(-1) === "/" && (t = t.slice(0, -1));
	let n = t.lastIndexOf("/");
	return n >= 0 && (t = t.slice(n + 1)), t || "/";
}
function Mi(e, t, n, r) {
	let i = t.dom, a = e.doc(), o = i.createElement("div");
	o.setAttribute("style", P.aclControlBoxContainer);
	let s = o.appendChild(i.createElement("h1"));
	s.textContent = `Sharing for ${n} ${F(e)}`, s.setAttribute("style", P.aclControlBoxHeader);
	let c = o.appendChild(i.createElement("div"));
	c.setAttribute("style", P.aclControlBoxStatus);
	try {
		Ni(a, r, e, n, t, i, c).then((e) => o.appendChild(e.render()));
	} catch (e) {
		c.innerText = e;
	}
	return o;
}
async function Ni(e, t, n, r, i, a, o) {
	return new Promise((s, c) => ze(e, async (e, l, u, d, f, p) => {
		if (!e) return c(/* @__PURE__ */ Error(`Error reading ${l ? "" : " default "}ACL. status ${u}: ${d}`));
		let m = Pi(u), h = Fi(u, d, t) || Ii(u);
		if (!h && m) try {
			return s(g(await Ve(m)));
		} catch (e) {
			L(e);
		}
		return s(g());
		function g(e) {
			return new Ti(n, r, i, o, h, u, d, f, p, e, t, a);
		}
	}));
}
function Pi(e) {
	let t = e.uri.split("#")[0], n = t.slice(0, -1).lastIndexOf("/"), r = t.indexOf("//");
	return r >= 0 && n < r + 2 || n < 0 ? null : t.slice(0, n + 1);
}
function Fi(e, t, n) {
	return n.holds(e, E.rdf("type"), E.space("Storage"), t);
}
function Ii(e) {
	return e.uri === e.site().uri;
}
//#endregion
//#region src/acl/index.ts
var Li = {
	adoptACLDefault: Ce,
	readACL: we,
	sameACL: Te,
	ACLunion: Ee,
	loadUnionACL: De,
	ACLbyCombination: Oe,
	makeACLGraph: ke,
	makeACLGraphbyCombo: Ae,
	ACLToString: je,
	comboToString: Me,
	makeACLString: Ne,
	putACLObject: Pe,
	putACLbyCombo: Fe,
	fixIndividualCardACL: Ie,
	fixIndividualACL: Le,
	setACL: Re,
	getACLorDefault: ze,
	getACL: Be
}, Ri = {
	preventBrowserDropEvents: Oi,
	shortNameForFolder: ji,
	ACLControlBox5: Mi
}, zi = w.store;
function Bi(e, t, n) {
	let r = e.dom, i = e.div;
	if (e.me && !e.me.uri) throw Error("newThingUI:  Invalid userid: " + e.me);
	let a = "padding: 0.7em; width: 2em; height: 2em;", o = i.appendChild(r.createElement("img")), s = !1;
	o.setAttribute("src", U.iconBase + "noun_34653_green.svg"), o.setAttribute("style", a), o.setAttribute("title", "Add another tool");
	let c = function(e) {
		let t = i.appendChild(r.createElement("pre"));
		t.setAttribute("style", "background-color: pink"), t.appendChild(r.createTextNode(e));
	};
	function l(e) {
		for (let t = 0; t < p.length; t++) {
			let n = a + e;
			p[t].disabled && (n += "opacity: 0.3;"), p[t].setAttribute("style", n);
		}
	}
	function u(e) {
		l("display: none;"), e.setAttribute("style", "padding: 0.7em; width: 2em; height: 2em;background-color: yellow;");
	}
	function d(e) {
		s = !s, o.setAttribute("style", a + (s ? "background-color: yellow;" : "")), l(s ? "" : "display: none;");
	}
	o.addEventListener("click", d);
	function f(n) {
		return new Promise(function(i, a) {
			let o;
			function s(i, o) {
				ni(e).then((e) => {
					let s = Object.assign({
						newBase: o,
						folder: n.folder || void 0,
						workspace: i
					}, n);
					for (let e in n) s[e] = n[e];
					I(`newThingUI: Minting new ${s.pane.name} at ${s.newBase}`), n.pane.mintNew(t, s).then(function(e) {
						if (!e || !e.newInstance) throw Error("Cannot mint new - missing newInstance");
						if (e.folder) {
							let t = e.newInstance.uri.slice(e.folder.uri.length).includes("/");
							I("  new thing is packge? " + t), t ? zi.add(e.folder, E.ldp("contains"), zi.sym(e.newBase), e.folder.doc()) : zi.add(e.folder, E.ldp("contains"), e.newInstance, e.folder.doc()), e.refreshTarget && e.refreshTarget.refresh && e.refreshTarget.refresh();
						} else {
							let t = n.div.appendChild(r.createElement("p"));
							t.setAttribute("style", "font-size: 120%;"), t.innerHTML = "Your <a target='_blank' href='" + e.newInstance.uri + "'><b>new " + n.noun + "</b></a> is ready to be set up. <br/><br/><a target='_blank' href='" + e.newInstance.uri + "'>Go to your new " + n.noun + ".</a>";
						}
						d();
					}).catch(function(e) {
						c(e), a(e);
					});
				}, (e) => {
					c("Error logging on: " + e);
				});
			}
			let l = n.pane;
			n.noun = l.mintClass ? F(l.mintClass) : l.name, n.appPathSegment = n.noun.slice(0, 1).toUpperCase() + n.noun.slice(1), n.folder ? Gt(r, zi, n.div, E.foaf("name"), null, n.noun).then(function(e) {
				if (!e) d();
				else {
					let t = n.folder.uri;
					t.endsWith("/") || (t += "/"), t = t + encodeURIComponent(e) + "/", s(null, t);
				}
			}) : (o = di(r, {
				noun: n.noun,
				appPathSegment: n.appPathSegment
			}, s), n.div.appendChild(o));
		});
	}
	let p = [], m = Object.values(n).filter((e) => e.mintNew), h = m.reduce((e, t) => (t.mintClass && (e[t.mintClass.uri] = (e[t.mintClass.uri] || 0) + 1), e), {});
	m.forEach((t) => {
		let n = e.div.appendChild(r.createElement("img"));
		n.setAttribute("src", t.icon);
		let i = t.mintClass ? h[t.mintClass.uri] > 1 ? `${F(t.mintClass)} (using ${t.name} pane)` : F(t.mintClass) : t.name + " @@";
		n.setAttribute("title", "Make new " + i), n.setAttribute("style", "padding: 0.7em; width: 2em; height: 2em;display: none;"), p.push(n), n.disabled || n.addEventListener("click", function(r) {
			u(n), f({
				event: r,
				folder: e.folder || null,
				iconEle: n,
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
//#endregion
//#region src/create/index.ts
var Vi = { newThingUI: Bi }, Hi = w.store;
function Ui(e, t, n, r, i, a, o) {
	let s = e.createElement("table"), c = e.createElement("tr");
	c.appendChild(e.createElement("td")).setAttribute("class", "MatrixCorner"), s.appendChild(c), s.lastHeader = c;
	let l = [], u = [], d = function(e, t, n, r) {
		for (; e.firstChild;) e.removeChild(e.firstChild);
		e.setAttribute("style", ""), e.style.textAlign = "center", a.cellFunction ? a.cellFunction(e, t, n, r) : (e.textContent = F(r), e.setAttribute("style", "padding: 0.3em")), delete e.old;
	}, f = function(t) {
		let n = t.toNT();
		if (u[n]) return u[n];
		let r = e.createElement("tr"), i = r.appendChild(e.createElement("td"));
		i.setAttribute("style", "padding: 0.3em;"), i.textContent = F(t), t.termType === "NamedNode" && Hi.fetcher.nowOrWhenFetched(t.uri.split("#")[0], void 0, function(e, n, r) {
			e && (i.textContent = F(t));
		});
		for (let n = 0; n < l.length; n++) d(r.appendChild(e.createElement("td")), se(l[n]), t, null);
		r.dataValueNT = n, u[n] = r;
		for (let e = s.lastHeader.nextSibling; e; e = e.nextSibling) if (n > e.dataValueNT && a && a.yDecreasing || n < e.dataValueNT && !(a && a.yDecreasing)) return s.insertBefore(r, e);
		return s.appendChild(r);
	}, p = function(t) {
		let n = t.toNT(), r = null;
		for (let e = 0; e < l.length; e++) {
			if (l[e] === n) return e;
			if (n > l[e] && a.xDecreasing || n < l[e] && !a.xDecreasing) {
				l = l.slice(0, e).concat([n]).concat(l.slice(e)), r = e;
				break;
			}
		}
		r === null && (r = l.length, l.push(n));
		for (let n = s.firstChild; n; n = n.nextSibling) {
			let i = n.dataValueNT, a = e.createElement("td");
			if (a.style.textAlign = "center", n === s.firstChild ? a.textContent = F(t) : d(a, t, se(i), null), r === l.length - 1) n.appendChild(a);
			else {
				let e = n.firstChild;
				for (let t = 0; t < r + 1; t++) e = e.nextSibling;
				n.insertBefore(a, e);
			}
		}
		return r;
	}, m = function() {
		for (let e = 1; e < s.children.length; e++) {
			let t = s.children[e];
			for (let e = 1; e < t.children.length; e++) t.children[e].old = !0;
		}
	}, h = function() {
		let e, t, n = [], r = [];
		if (a.set_y) for (let e = 0; e < a.set_y.length; e++) r[a.set_y[e]] = !0;
		if (a.set_x) for (let e = 0; e < a.set_x.length; e++) n[p(a.set_x[e]) + 1] = !0;
		for (let i = 1; i < s.children.length; i++) {
			e = s.children[i];
			for (let i = 1; i < e.children.length; i++) if (t = e.children[i], t.old) {
				let n = se(e.dataValueNT), r = se(l[i - 1]);
				d(t, r, n, null);
			} else r[e.dataValueNT] = !0, n[i] = !0;
		}
		for (let t = 0; t < s.children.length; t++) if (e = s.children[t], t > 0 && !r[e.dataValueNT]) delete u[e.dataValueNT], s.removeChild(e);
		else for (let t = e.children.length - 1; t > 0; t--) {
			let r = e.children[t];
			n[t] || e.removeChild(r);
		}
		let i = [];
		for (let e = 0; e < l.length; e++) n[e + 1] && i.push(l[e]);
		l = i;
	};
	s.refresh = function() {
		m(), Hi.query(t, g, void 0, h);
	};
	let g = function(e) {
		let t = e[n.toString()], a = e[r.toString()], o = e[i.toString()], s = f(a), c = p(t), l = s.children[c + 1];
		d(l, t, a, o);
	};
	if (a.set_y) for (let e = 0; e < a.set_y.length; e++) f(a.set_y[e]);
	if (a.set_x) for (let e = 0; e < a.set_x.length; e++) p(a.set_x[e]);
	return Hi.query(t, g, void 0, o), s;
}
//#endregion
//#region src/matrix/index.ts
var Wi = { matrixForQuery: Ui }, Gi = U.iconBase + "noun_Camera_1618446_000000.svg", Ki = U.iconBase + "noun_479395.svg", qi = "image/png";
function Ji(e, t, n, r) {
	let i = e.createElement("div"), a, o, s, c, l = i.appendChild(e.createElement("table")), u = l.appendChild(e.createElement("tr")).appendChild(e.createElement("td"));
	u.setAttribute("colspan", "4");
	let d = l.appendChild(e.createElement("tr"));
	d.appendChild(e.createElement("td")).appendChild(Ut(e)).addEventListener("click", (e) => {
		b(), r(null);
	});
	let f = d.appendChild(e.createElement("td")).appendChild(G(e, Ki, "Retake"));
	f.addEventListener("click", (e) => {
		_();
	}), f.style.visibility = "collapse";
	let p = d.appendChild(e.createElement("td")).appendChild(G(e, U.iconBase + "noun_10636.svg", "Snap"));
	p.addEventListener("click", v), p.style.visibility = "collapse";
	let m = d.appendChild(e.createElement("td")).appendChild(Wt(e));
	m.addEventListener("click", (e) => {
		x(o, a);
	}), m.style.visibility = "collapse";
	function h() {
		if (s = u.appendChild(e.createElement("video")), s.setAttribute("controls", "1"), s.setAttribute("autoplay", "1"), s.setAttribute("style", P.controlStyle), !navigator.mediaDevices) throw Error("navigator.mediaDevices not available");
		navigator.mediaDevices.getUserMedia(g).then((e) => {
			s.srcObject = e, p.style.visibility = "visible", m.style.visibility = "collapse", f.style.visibility = "collapse";
		});
	}
	let g = { video: !0 };
	function _() {
		u.removeChild(c), h();
	}
	function v() {
		c = e.createElement("canvas"), c.setAttribute("width", P.canvasWidth), c.setAttribute("height", P.canvasHeight), c.setAttribute("style", P.controlStyle), u.appendChild(c), c.getContext("2d").drawImage(s, 0, 0, c.width, c.height), s.parentNode.removeChild(s), c.toBlob((e) => {
			I(`got blob type ${e.type} size ${e.size}`), a = n(), o = e, y();
		}, qi);
	}
	function y() {
		m.style.visibility = "visible", f.style.visibility = "visible", p.style.visibility = "collapse";
	}
	function b() {
		s && s.srcObject && s.srcObject.getVideoTracks().forEach((e) => e.stop());
	}
	function x(e, n) {
		let i = e.type;
		I("Putting " + e.size + " bytes of " + i + " to " + n), t.fetcher.webOperation("PUT", n.uri, {
			data: e,
			contentType: i
		}).then((e) => {
			I("ok saved " + n), b(), r(n);
		}, (e) => {
			b(), alert(e);
		});
	}
	return h(), i;
}
function Yi(e, t, n, r) {
	let i = e.createElement("div"), a = G(e, Gi, "Take picture"), o;
	async function s(e) {
		i.removeChild(o), i.appendChild(a), r(e);
	}
	return i.appendChild(a), a.addEventListener("click", (r) => {
		i.removeChild(a), o = Ji(e, t, n, s), i.appendChild(o);
	}), i;
}
//#endregion
//#region src/media/index.ts
var Xi = {
	cameraCaptureControl: Ji,
	cameraButton: Yi
}, Zi = {
	icons: U,
	ns: E,
	rdf: T,
	style: P,
	widgets: Hr
};
function Qi(e, t, n, r, i) {
	t ||= w.store, r = r.doc();
	let a = Zi.ns, o = p("http://www.w3.org/2005/01/wf/flow#"), s = p("http://purl.org/dc/terms/");
	i ||= {};
	let c = !!i.newestFirst, u = e.createElement("div"), d, f, m = w.store.updater, h = function(t, n) {
		let r = e.createElement("a");
		return n && n.uri && (r.setAttribute("href", n.uri), r.addEventListener("click", Zi.widgets.openHrefInOutlineMode, !0), r.setAttribute("style", "color: #3B5998; text-decoration: none; ")), r.textContent = t, r;
	}, g = function(t, n) {
		let r = e.createElement("pre");
		return r.setAttribute("style", n || "color: grey"), u.appendChild(r), r.appendChild(e.createTextNode(t)), r;
	}, _ = {
		log: function(e) {
			g(e, "color: #111;");
		},
		warn: function(e) {
			g(e, "color: #880;");
		},
		error: function(e) {
			g(e, "color: #800;");
		}
	}, y = function() {
		let i = e.createElement("tr"), o = e.createElement("td"), c = e.createElement("td"), u = e.createElement("td");
		i.appendChild(o), i.appendChild(c), i.appendChild(u), i.AJAR_date = "9999-01-01T00:00:00Z";
		let d = function() {
			p.setAttribute("class", "pendingedit"), p.disabled = !0;
			let o = [], c = /* @__PURE__ */ new Date(), u = "" + c.getTime(), d = ce(c), h = t.sym(r.uri + "#Msg" + u);
			o.push(new l(n, a.wf("message"), h, r)), o.push(new l(h, a.sioc("content"), t.literal(p.value), r)), o.push(new l(h, s("created"), d, r)), f && o.push(new l(h, a.foaf("maker"), f, r)), m.update([], o, function(n, r, a) {
				if (!r) i.appendChild(Zi.widgets.errorMessageBlock(e, "Error writing message: " + a));
				else {
					let e = {
						"?msg": h,
						"?content": t.literal(p.value),
						"?date": d,
						"?creator": f
					};
					E(e, !1), p.value = "", p.setAttribute("class", ""), p.disabled = !1;
				}
			});
		};
		i.appendChild(e.createElement("br"));
		let p, h, g = function() {
			x(o, f, "", null), p = e.createElement("textarea"), c.innerHTML = "", c.appendChild(p), p.rows = 3, p.setAttribute("style", "white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;background-color: #eef;"), p.addEventListener("keyup", function(e) {
				e.keyCode === 13 && (e.altKey || d());
			}, !1), u.innerHTML = "", h = Zi.widgets.button(e, Zi.icons.iconBase + "noun_383448.svg", "Send"), h.setAttribute("style", Zi.style.buttonStyle + "float: right;"), h.addEventListener("click", d, !1), u.appendChild(h);
		};
		return ei({
			div: c,
			dom: e
		}).then((e) => {
			f = e.me, g();
		}), i;
	};
	function b(e) {
		let t = w.store.any(e, Zi.ns.foaf("nick"));
		return t ? "" + t.value : "" + F(e);
	}
	function x(t, n, r, i) {
		let a = t.appendChild(h(b(n), n));
		n.uri && w.store.fetcher.nowOrWhenFetched(n.doc(), void 0, function(e, t) {
			a.textContent = b(n);
		}), t.appendChild(e.createElement("br")), t.appendChild(h(r, i));
	}
	function S(e, n) {
		let r = {}, i, o;
		for (i = n.firstChild; i; i = i.nextSibling) i.AJAR_subject && (r[i.AJAR_subject.uri] = !0);
		let s = t.each(e, a.wf("message")), c = {};
		for (s.forEach(function(e) {
			c[e.uri] = !0, r[e.uri] || T(e);
		}), i = n.firstChild; i;) o = i.nextSibling, i.AJAR_subject && !c[i.AJAR_subject.uri] && n.removeChild(i), i = o;
	}
	let C = function(e) {
		let r = t.statementsMatching(e).concat(t.statementsMatching(void 0, void 0, e));
		m.update(r, [], function(e, t, r) {
			t ? S(n, d) : _.error("Cant delete messages:" + r);
		});
	}, T = function(e) {
		let n = {
			"?msg": e,
			"?creator": t.any(e, a.foaf("maker")),
			"?date": t.any(e, s("created")),
			"?content": t.any(e, a.sioc("content"))
		};
		E(n, !0);
	}, E = function(t, n) {
		let r = t["?creator"], i = t["?msg"], a = t["?date"], o = t["?content"], s = a.value, l = e.createElement("tr");
		l.AJAR_date = s, l.AJAR_subject = i;
		let u = !1;
		for (let e = d.firstChild; e; e = e.nextSibling) if (s > e.AJAR_date && c || s < e.AJAR_date && !c) {
			d.insertBefore(l, e), u = !0;
			break;
		}
		u || d.appendChild(l);
		let f = e.createElement("td");
		l.appendChild(f), x(f, r, Zi.widgets.shortDate(s), i);
		let p = e.createElement("td");
		l.appendChild(p);
		let m = e.createElement("p");
		m.setAttribute("style", "white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;" + (n ? "background-color: #e8ffe8;" : "background-color: #white;")), p.appendChild(m), m.textContent = o.value;
		let h = e.createElement("td");
		l.appendChild(h);
		let g = e.createElement("button");
		h.appendChild(g), g.textContent = "-", l.setAttribute("class", "hoverControl"), g.setAttribute("class", "hoverControlHide"), g.setAttribute("style", "color: red;"), g.addEventListener("click", function(t) {
			h.removeChild(g);
			let n = e.createElement("button");
			n.textContent = "cancel", h.appendChild(n).addEventListener("click", function(e) {
				h.removeChild(r), h.removeChild(n), h.appendChild(g);
			}, !1);
			let r = e.createElement("button");
			r.textContent = "Delete message", h.appendChild(r).addEventListener("click", function(e) {
				h.removeChild(r), h.removeChild(n), C(i);
			}, !1);
		}, !1);
	};
	d = e.createElement("table"), d.fresh = !1, u.appendChild(d), d.setAttribute("style", "width: 100%;");
	let D = y();
	c ? d.insertBefore(D, d.firstChild) : d.appendChild(D);
	let O;
	if (i.query) O = i.query;
	else {
		O = new k("Messages");
		let e = {};
		[
			"msg",
			"date",
			"creator",
			"content"
		].forEach(function(t) {
			O.vars.push(e[t] = v(t));
		}), O.pat.add(n, o("message"), e.msg), O.pat.add(e.msg, a.dct("created"), e.date), O.pat.add(e.msg, a.foaf("maker"), e.creator), O.pat.add(e.msg, a.sioc("content"), e.content);
	}
	function ee() {
		d.fresh = !0;
	}
	return t.query(O, E, void 0, ee), u.refresh = function() {
		S(n, d);
	}, u;
}
//#endregion
//#region src/chat/dateFolder.js
async function $i(e) {
	return await A.fetcher.load(e), !(A.statementsMatching(null, E.dct("created"), null, e).length > 0);
}
var ea = class {
	constructor(e, t, n) {
		this.root = e, this.rootFolder = e.dir(), this.leafFileName = t || "index.ttl", this.membershipProperty = n || E.wf("leafObject");
	}
	leafDocumentFromDate(e) {
		let t = e.toISOString().split("T")[0].replace(/-/g, "/");
		return t = this.root.dir().uri + t + "/" + this.leafFileName, A.sym(t);
	}
	dateFromLeafDocument(e) {
		let t = this.rootFolder.uri.length, n = e.uri.slice(t, t + 10).replace(/\//g, "-");
		return new Date(n);
	}
	async loadPrevious(e, t) {
		async function n(e, r) {
			function i(n) {
				return !(t ? n.uri >= e.uri : n.uri <= e.uri);
			}
			function a(e) {
				let t = e.uri.slice(0, -1).split("/").slice(-1)[0];
				return !!"0123456789".includes(t[0]);
			}
			function o(e) {
				return e = e.filter(a), e.sort(), t || e.reverse(), e.pop();
			}
			let s = e.dir();
			try {
				await A.fetcher.load(s);
				let e = A.each(s, E.ldp("contains"));
				e = e.filter(i);
				let t = o(e);
				if (t) return t;
			} catch (e) {
				if (e.response && e.response.status && e.response.status === 404) I("Error 404 for chat parent file " + s);
				else throw I("*** Error NON 404 for chat parent file " + s), Error(`*** ${e.message} for chat folder ${s}`);
			}
			if (r === 0) return null;
			let c = await n(s, r - 1);
			return c ? (await A.fetcher.load(c), o(A.each(c, E.ldp("contains")))) : null;
		}
		let r = this.leafDocumentFromDate(e).dir();
		for (;;) {
			let t = await n(r, 3);
			if (t) {
				let n = A.sym(t.uri + this.leafFileName), i = this.dateFromLeafDocument(n);
				if (await $i(n)) e = i, r = this.leafDocumentFromDate(e).dir();
				else return i;
			} else return null;
		}
	}
	async firstLeaf(e) {
		let t = ue(), n = new s(t);
		async function r(r) {
			function i(e) {
				let t = e.uri.slice(0, -1).split("/").slice(-1)[0];
				return !!"0123456789".includes(t[0]);
			}
			delete n.requested[r.uri], await n.load(r, { force: !0 });
			let a = t.each(r, E.ldp("contains"));
			if (a = a.filter(i), a.length === 0) throw Error(" @@@  No children to         parent2 " + r);
			return a.sort(), e && a.reverse(), a[0];
		}
		let i = _((await r(await r(await r(this.root.dir())))).uri + "chat.ttl");
		await n.load(i);
		let a = t.each(this.root, this.membershipProperty, null, i);
		if (a.length === 0) {
			let e = "  INCONSISTENCY -- no chat leafObject in file " + i;
			throw Se(e), Error(e);
		}
		let o = a.map((e) => [t.any(e, E.dct("created")), e]);
		return o.sort(), e && o.reverse(), o[0][1];
	}
};
//#endregion
//#region node_modules/@noble/hashes/utils.js
function ta(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in e && e.BYTES_PER_ELEMENT === 1;
}
function na(e, t = "") {
	if (typeof e != "number") {
		let n = t && `"${t}" `;
		throw TypeError(`${n}expected number, got ${typeof e}`);
	}
	if (!Number.isSafeInteger(e) || e < 0) {
		let n = t && `"${t}" `;
		throw RangeError(`${n}expected integer >= 0, got ${e}`);
	}
}
function ra(e, t, n = "") {
	let r = ta(e), i = e?.length, a = t !== void 0;
	if (!r || a && i !== t) {
		let o = n && `"${n}" `, s = a ? ` of length ${t}` : "", c = r ? `length=${i}` : `type=${typeof e}`, l = o + "expected Uint8Array" + s + ", got " + c;
		throw r ? RangeError(l) : TypeError(l);
	}
	return e;
}
function ia(e, t = !0) {
	if (e.destroyed) throw Error("Hash instance has been destroyed");
	if (t && e.finished) throw Error("Hash#digest() has already been called");
}
function aa(e, t) {
	ra(e, void 0, "digestInto() output");
	let n = t.outputLen;
	if (e.length < n) throw RangeError("\"digestInto() output\" expected to be of length >=" + n);
}
function oa(...e) {
	for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function sa(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function ca(e, t) {
	return e << 32 - t | e >>> t;
}
var la = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", ua = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function da(e) {
	if (ra(e), la) return e.toHex();
	let t = "";
	for (let n = 0; n < e.length; n++) t += ua[e[n]];
	return t;
}
var fa = {
	_0: 48,
	_9: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
function pa(e) {
	if (e >= fa._0 && e <= fa._9) return e - fa._0;
	if (e >= fa.A && e <= fa.F) return e - (fa.A - 10);
	if (e >= fa.a && e <= fa.f) return e - (fa.a - 10);
}
function ma(e) {
	if (typeof e != "string") throw TypeError("hex string expected, got " + typeof e);
	if (la) try {
		return Uint8Array.fromHex(e);
	} catch (e) {
		throw e instanceof SyntaxError ? RangeError(e.message) : e;
	}
	let t = e.length, n = t / 2;
	if (t % 2) throw RangeError("hex string expected, got unpadded hex of length " + t);
	let r = new Uint8Array(n);
	for (let t = 0, i = 0; t < n; t++, i += 2) {
		let n = pa(e.charCodeAt(i)), a = pa(e.charCodeAt(i + 1));
		if (n === void 0 || a === void 0) {
			let t = e[i] + e[i + 1];
			throw RangeError("hex string expected, got non-hex character \"" + t + "\" at index " + i);
		}
		r[t] = n * 16 + a;
	}
	return r;
}
function ha(...e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		ra(r), t += r.length;
	}
	let n = new Uint8Array(t);
	for (let t = 0, r = 0; t < e.length; t++) {
		let i = e[t];
		n.set(i, r), r += i.length;
	}
	return n;
}
function ga(e, t = {}) {
	let n = (t, n) => e(n).update(t).digest(), r = e(void 0);
	return n.outputLen = r.outputLen, n.blockLen = r.blockLen, n.canXOF = r.canXOF, n.create = (t) => e(t), Object.assign(n, t), Object.freeze(n);
}
function _a(e = 32) {
	na(e, "bytesLength");
	let t = typeof globalThis == "object" ? globalThis.crypto : null;
	if (typeof t?.getRandomValues != "function") throw Error("crypto.getRandomValues must be defined");
	if (e > 65536) throw RangeError(`"bytesLength" expected <= 65536, got ${e}`);
	return t.getRandomValues(new Uint8Array(e));
}
var va = (e) => ({ oid: Uint8Array.from([
	6,
	9,
	96,
	134,
	72,
	1,
	101,
	3,
	4,
	2,
	e
]) });
//#endregion
//#region node_modules/@noble/hashes/_md.js
function ya(e, t, n) {
	return e & t ^ ~e & n;
}
function ba(e, t, n) {
	return e & t ^ e & n ^ t & n;
}
var xa = class {
	blockLen;
	outputLen;
	canXOF = !1;
	padOffset;
	isLE;
	buffer;
	view;
	finished = !1;
	length = 0;
	pos = 0;
	destroyed = !1;
	constructor(e, t, n, r) {
		this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = r, this.buffer = new Uint8Array(e), this.view = sa(this.buffer);
	}
	update(e) {
		ia(this), ra(e);
		let { view: t, buffer: n, blockLen: r } = this, i = e.length;
		for (let a = 0; a < i;) {
			let o = Math.min(r - this.pos, i - a);
			if (o === r) {
				let t = sa(e);
				for (; r <= i - a; a += r) this.process(t, a);
				continue;
			}
			n.set(e.subarray(a, a + o), this.pos), this.pos += o, a += o, this.pos === r && (this.process(t, 0), this.pos = 0);
		}
		return this.length += e.length, this.roundClean(), this;
	}
	digestInto(e) {
		ia(this), aa(e, this), this.finished = !0;
		let { buffer: t, view: n, blockLen: r, isLE: i } = this, { pos: a } = this;
		t[a++] = 128, oa(this.buffer.subarray(a)), this.padOffset > r - a && (this.process(n, 0), a = 0);
		for (let e = a; e < r; e++) t[e] = 0;
		n.setBigUint64(r - 8, BigInt(this.length * 8), i), this.process(n, 0);
		let o = sa(e), s = this.outputLen;
		if (s % 4) throw Error("_sha2: outputLen must be aligned to 32bit");
		let c = s / 4, l = this.get();
		if (c > l.length) throw Error("_sha2: outputLen bigger than state");
		for (let e = 0; e < c; e++) o.setUint32(4 * e, l[e], i);
	}
	digest() {
		let { buffer: e, outputLen: t } = this;
		this.digestInto(e);
		let n = e.slice(0, t);
		return this.destroy(), n;
	}
	_cloneInto(e) {
		e ||= new this.constructor(), e.set(...this.get());
		let { blockLen: t, buffer: n, length: r, finished: i, destroyed: a, pos: o } = this;
		return e.destroyed = a, e.finished = i, e.length = r, e.pos = o, r % t && e.buffer.set(n), e;
	}
	clone() {
		return this._cloneInto();
	}
}, Sa = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]), Ca = /* @__PURE__ */ Uint32Array.from([
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
]), wa = /* @__PURE__ */ new Uint32Array(64), Ta = class extends xa {
	constructor(e) {
		super(64, e, 8, !1);
	}
	get() {
		let { A: e, B: t, C: n, D: r, E: i, F: a, G: o, H: s } = this;
		return [
			e,
			t,
			n,
			r,
			i,
			a,
			o,
			s
		];
	}
	set(e, t, n, r, i, a, o, s) {
		this.A = e | 0, this.B = t | 0, this.C = n | 0, this.D = r | 0, this.E = i | 0, this.F = a | 0, this.G = o | 0, this.H = s | 0;
	}
	process(e, t) {
		for (let n = 0; n < 16; n++, t += 4) wa[n] = e.getUint32(t, !1);
		for (let e = 16; e < 64; e++) {
			let t = wa[e - 15], n = wa[e - 2], r = ca(t, 7) ^ ca(t, 18) ^ t >>> 3;
			wa[e] = (ca(n, 17) ^ ca(n, 19) ^ n >>> 10) + wa[e - 7] + r + wa[e - 16] | 0;
		}
		let { A: n, B: r, C: i, D: a, E: o, F: s, G: c, H: l } = this;
		for (let e = 0; e < 64; e++) {
			let t = ca(o, 6) ^ ca(o, 11) ^ ca(o, 25), u = l + t + ya(o, s, c) + Ca[e] + wa[e] | 0, d = (ca(n, 2) ^ ca(n, 13) ^ ca(n, 22)) + ba(n, r, i) | 0;
			l = c, c = s, s = o, o = a + u | 0, a = i, i = r, r = n, n = u + d | 0;
		}
		n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, s = s + this.F | 0, c = c + this.G | 0, l = l + this.H | 0, this.set(n, r, i, a, o, s, c, l);
	}
	roundClean() {
		oa(wa);
	}
	destroy() {
		this.destroyed = !0, this.set(0, 0, 0, 0, 0, 0, 0, 0), oa(this.buffer);
	}
}, Ea = class extends Ta {
	A = Sa[0] | 0;
	B = Sa[1] | 0;
	C = Sa[2] | 0;
	D = Sa[3] | 0;
	E = Sa[4] | 0;
	F = Sa[5] | 0;
	G = Sa[6] | 0;
	H = Sa[7] | 0;
	constructor() {
		super(32);
	}
}, Da = /* @__PURE__ */ ga(() => new Ea(), /* @__PURE__ */ va(1)), Oa = (e, t, n) => ra(e, t, n), ka = na, Aa = da, ja = (...e) => ha(...e), Ma = (e) => ma(e), Na = /* @__PURE__ */ BigInt(0), Pa = /* @__PURE__ */ BigInt(1);
function Fa(e, t = "") {
	if (typeof e != "boolean") {
		let n = t && `"${t}" `;
		throw TypeError(n + "expected boolean, got type=" + typeof e);
	}
	return e;
}
function Ia(e) {
	if (typeof e == "bigint") {
		if (!Ka(e)) throw RangeError("positive bigint expected, got " + e);
	} else ka(e);
	return e;
}
function La(e, t = "") {
	if (typeof e != "number") {
		let n = t && `"${t}" `;
		throw TypeError(n + "expected number, got type=" + typeof e);
	}
	if (!Number.isSafeInteger(e)) {
		let n = t && `"${t}" `;
		throw RangeError(n + "expected safe integer, got " + e);
	}
}
function Ra(e) {
	let t = Ia(e).toString(16);
	return t.length & 1 ? "0" + t : t;
}
function za(e) {
	if (typeof e != "string") throw TypeError("hex string expected, got " + typeof e);
	return e === "" ? Na : BigInt("0x" + e);
}
function Ba(e) {
	return za(da(e));
}
function Va(e) {
	return za(da(Wa(ra(e)).reverse()));
}
function Ha(e, t) {
	if (na(t), t === 0) throw RangeError("zero length");
	e = Ia(e);
	let n = e.toString(16);
	if (n.length > t * 2) throw RangeError("number too large");
	return ma(n.padStart(t * 2, "0"));
}
function Ua(e, t) {
	return Ha(e, t).reverse();
}
function Wa(e) {
	return Uint8Array.from(Oa(e));
}
function Ga(e) {
	if (typeof e != "string") throw TypeError("ascii string expected, got " + typeof e);
	return Uint8Array.from(e, (t, n) => {
		let r = t.charCodeAt(0);
		if (t.length !== 1 || r > 127) throw RangeError(`string contains non-ASCII character "${e[n]}" with code ${r} at position ${n}`);
		return r;
	});
}
var Ka = (e) => typeof e == "bigint" && Na <= e;
function qa(e, t, n) {
	return Ka(e) && Ka(t) && Ka(n) && t <= e && e < n;
}
function Ja(e, t, n, r) {
	if (!qa(t, n, r)) throw RangeError("expected valid " + e + ": " + n + " <= n < " + r + ", got " + t);
}
function Ya(e) {
	if (e < Na) throw Error("expected non-negative bigint, got " + e);
	let t;
	for (t = 0; e > Na; e >>= Pa, t += 1);
	return t;
}
var Xa = (e) => (Pa << BigInt(e)) - Pa;
function Za(e, t = {}, n = {}) {
	if (Object.prototype.toString.call(e) !== "[object Object]") throw TypeError("expected valid options object");
	function r(t, n, r) {
		if (!r && n !== "function" && !Object.hasOwn(e, t)) throw TypeError(`param "${t}" is invalid: expected own property`);
		let i = e[t];
		if (r && i === void 0) return;
		let a = typeof i;
		if (a !== n || i === null) throw TypeError(`param "${t}" is invalid: expected ${n}, got ${a}`);
	}
	let i = (e, t) => Object.entries(e).forEach(([e, n]) => r(e, n, t));
	i(t, !1), i(n, !0);
}
//#endregion
//#region node_modules/@noble/curves/abstract/modular.js
var Z = /* @__PURE__ */ BigInt(0), Q = /* @__PURE__ */ BigInt(1), Qa = /* @__PURE__ */ BigInt(2), $a = /* @__PURE__ */ BigInt(3), eo = /* @__PURE__ */ BigInt(4), to = /* @__PURE__ */ BigInt(5), no = /* @__PURE__ */ BigInt(7), ro = /* @__PURE__ */ BigInt(8), io = /* @__PURE__ */ BigInt(9), ao = /* @__PURE__ */ BigInt(16);
function oo(e, t) {
	if (t <= Z) throw Error("mod: expected positive modulus, got " + t);
	let n = e % t;
	return n >= Z ? n : t + n;
}
function so(e, t, n) {
	if (t < Z) throw Error("pow2: expected non-negative exponent, got " + t);
	let r = e;
	for (; t-- > Z;) r *= r, r %= n;
	return r;
}
function co(e, t) {
	if (e === Z) throw Error("invert: expected non-zero number");
	if (t <= Z) throw Error("invert: expected positive modulus, got " + t);
	let n = oo(e, t), r = t, i = Z, a = Q, o = Q, s = Z;
	for (; n !== Z;) {
		let e = r / n, t = r - n * e, c = i - o * e, l = a - s * e;
		r = n, n = t, i = o, a = s, o = c, s = l;
	}
	if (r !== Q) throw Error("invert: does not exist");
	return oo(i, t);
}
function lo(e, t, n) {
	let r = e;
	if (!r.eql(r.sqr(t), n)) throw Error("Cannot find square root");
}
function uo(e, t) {
	let n = e, r = (n.ORDER + Q) / eo, i = n.pow(t, r);
	return lo(n, i, t), i;
}
function fo(e, t) {
	let n = e, r = (n.ORDER - to) / ro, i = n.mul(t, Qa), a = n.pow(i, r), o = n.mul(t, a), s = n.mul(n.mul(o, Qa), a), c = n.mul(o, n.sub(s, n.ONE));
	return lo(n, c, t), c;
}
function po(e) {
	let t = wo(e), n = mo(e), r = n(t, t.neg(t.ONE)), i = n(t, r), a = n(t, t.neg(r)), o = (e + no) / ao;
	return ((e, t) => {
		let n = e, s = n.pow(t, o), c = n.mul(s, r), l = n.mul(s, i), u = n.mul(s, a), d = n.eql(n.sqr(c), t), f = n.eql(n.sqr(l), t);
		s = n.cmov(s, c, d), c = n.cmov(u, l, f);
		let p = n.eql(n.sqr(c), t), m = n.cmov(s, c, p);
		return lo(n, m, t), m;
	});
}
function mo(e) {
	if (e < $a) throw Error("sqrt is not defined for small field");
	let t = e - Q, n = 0;
	for (; t % Qa === Z;) t /= Qa, n++;
	let r = Qa, i = wo(e);
	for (; bo(i, r) === 1;) if (r++ > 1e3) throw Error("Cannot find square root: probably non-prime P");
	if (n === 1) return uo;
	let a = i.pow(r, t), o = (t + Q) / Qa;
	return function(e, r) {
		let i = e;
		if (i.is0(r)) return r;
		if (bo(i, r) !== 1) throw Error("Cannot find square root");
		let s = n, c = i.mul(i.ONE, a), l = i.pow(r, t), u = i.pow(r, o);
		for (; !i.eql(l, i.ONE);) {
			if (i.is0(l)) return i.ZERO;
			let e = 1, t = i.sqr(l);
			for (; !i.eql(t, i.ONE);) if (e++, t = i.sqr(t), e === s) throw Error("Cannot find square root");
			let n = Q << BigInt(s - e - 1), r = i.pow(c, n);
			s = e, c = i.sqr(r), l = i.mul(l, c), u = i.mul(u, r);
		}
		return u;
	};
}
function ho(e) {
	return e % eo === $a ? uo : e % ro === to ? fo : e % ao === io ? po(e) : mo(e);
}
var go = [
	"create",
	"isValid",
	"is0",
	"neg",
	"inv",
	"sqrt",
	"sqr",
	"eql",
	"add",
	"sub",
	"mul",
	"pow",
	"div",
	"addN",
	"subN",
	"mulN",
	"sqrN"
];
function _o(e) {
	if (Za(e, go.reduce((e, t) => (e[t] = "function", e), {
		ORDER: "bigint",
		BYTES: "number",
		BITS: "number"
	})), La(e.BYTES, "BYTES"), La(e.BITS, "BITS"), e.BYTES < 1 || e.BITS < 1) throw Error("invalid field: expected BYTES/BITS > 0");
	if (e.ORDER <= Q) throw Error("invalid field: expected ORDER > 1, got " + e.ORDER);
	return e;
}
function vo(e, t, n) {
	let r = e;
	if (n < Z) throw Error("invalid exponent, negatives unsupported");
	if (n === Z) return r.ONE;
	if (n === Q) return t;
	let i = r.ONE, a = t;
	for (; n > Z;) n & Q && (i = r.mul(i, a)), a = r.sqr(a), n >>= Q;
	return i;
}
function yo(e, t, n = !1) {
	let r = e, i = Array(t.length).fill(n ? r.ZERO : void 0), a = t.reduce((e, t, n) => r.is0(t) ? e : (i[n] = e, r.mul(e, t)), r.ONE), o = r.inv(a);
	return t.reduceRight((e, t, n) => r.is0(t) ? e : (i[n] = r.mul(e, i[n]), r.mul(e, t)), o), i;
}
function bo(e, t) {
	let n = e, r = (n.ORDER - Q) / Qa, i = n.pow(t, r), a = n.eql(i, n.ONE), o = n.eql(i, n.ZERO), s = n.eql(i, n.neg(n.ONE));
	if (!a && !o && !s) throw Error("invalid Legendre symbol result");
	return a ? 1 : o ? 0 : -1;
}
function xo(e, t) {
	if (t !== void 0 && ka(t), e <= Z) throw Error("invalid n length: expected positive n, got " + e);
	if (t !== void 0 && t < 1) throw Error("invalid n length: expected positive bit length, got " + t);
	let n = Ya(e);
	if (t !== void 0 && t < n) throw Error(`invalid n length: expected bit length (${n}) >= n.length (${t})`);
	let r = t === void 0 ? n : t;
	return {
		nBitLength: r,
		nByteLength: Math.ceil(r / 8)
	};
}
var So = /* @__PURE__ */ new WeakMap(), Co = class {
	ORDER;
	BITS;
	BYTES;
	isLE;
	ZERO = Z;
	ONE = Q;
	_lengths;
	_mod;
	constructor(e, t = {}) {
		if (e <= Q) throw Error("invalid field: expected ORDER > 1, got " + e);
		let n;
		this.isLE = !1, typeof t == "object" && t && (typeof t.BITS == "number" && (n = t.BITS), typeof t.sqrt == "function" && Object.defineProperty(this, "sqrt", {
			value: t.sqrt,
			enumerable: !0
		}), typeof t.isLE == "boolean" && (this.isLE = t.isLE), t.allowedLengths && (this._lengths = Object.freeze(t.allowedLengths.slice())), typeof t.modFromBytes == "boolean" && (this._mod = t.modFromBytes));
		let { nBitLength: r, nByteLength: i } = xo(e, n);
		if (i > 2048) throw Error("invalid field: expected ORDER of <= 2048 bytes");
		this.ORDER = e, this.BITS = r, this.BYTES = i, Object.freeze(this);
	}
	create(e) {
		return oo(e, this.ORDER);
	}
	isValid(e) {
		if (typeof e != "bigint") throw TypeError("invalid field element: expected bigint, got " + typeof e);
		return Z <= e && e < this.ORDER;
	}
	is0(e) {
		return e === Z;
	}
	isValidNot0(e) {
		return !this.is0(e) && this.isValid(e);
	}
	isOdd(e) {
		return (e & Q) === Q;
	}
	neg(e) {
		return oo(-e, this.ORDER);
	}
	eql(e, t) {
		return e === t;
	}
	sqr(e) {
		return oo(e * e, this.ORDER);
	}
	add(e, t) {
		return oo(e + t, this.ORDER);
	}
	sub(e, t) {
		return oo(e - t, this.ORDER);
	}
	mul(e, t) {
		return oo(e * t, this.ORDER);
	}
	pow(e, t) {
		return vo(this, e, t);
	}
	div(e, t) {
		return oo(e * co(t, this.ORDER), this.ORDER);
	}
	sqrN(e) {
		return e * e;
	}
	addN(e, t) {
		return e + t;
	}
	subN(e, t) {
		return e - t;
	}
	mulN(e, t) {
		return e * t;
	}
	inv(e) {
		return co(e, this.ORDER);
	}
	sqrt(e) {
		let t = So.get(this);
		return t || So.set(this, t = ho(this.ORDER)), t(this, e);
	}
	toBytes(e) {
		return this.isLE ? Ua(e, this.BYTES) : Ha(e, this.BYTES);
	}
	fromBytes(e, t = !1) {
		Oa(e);
		let { _lengths: n, BYTES: r, isLE: i, ORDER: a, _mod: o } = this;
		if (n) {
			if (e.length < 1 || !n.includes(e.length) || e.length > r) throw Error("Field.fromBytes: expected " + n + " bytes, got " + e.length);
			let t = new Uint8Array(r);
			t.set(e, i ? 0 : t.length - e.length), e = t;
		}
		if (e.length !== r) throw Error("Field.fromBytes: expected " + r + " bytes, got " + e.length);
		let s = i ? Va(e) : Ba(e);
		if (o && (s = oo(s, a)), !t && !this.isValid(s)) throw Error("invalid field element: outside of range 0..ORDER");
		return s;
	}
	invertBatch(e) {
		return yo(this, e);
	}
	cmov(e, t, n) {
		return Fa(n, "condition"), n ? t : e;
	}
};
Object.freeze(Co.prototype);
function wo(e, t = {}) {
	return new Co(e, t);
}
function To(e) {
	if (typeof e != "bigint") throw Error("field order must be bigint");
	if (e <= Q) throw Error("field order must be greater than 1");
	let t = Ya(e - Q);
	return Math.ceil(t / 8);
}
function Eo(e) {
	let t = To(e);
	return t + Math.ceil(t / 2);
}
function Do(e, t, n = !1) {
	Oa(e);
	let r = e.length, i = To(t), a = Math.max(Eo(t), 16);
	if (r < a || r > 1024) throw Error("expected " + a + "-1024 bytes of input, got " + r);
	let o = oo(n ? Va(e) : Ba(e), t - Q) + Q;
	return n ? Ua(o, i) : Ha(o, i);
}
//#endregion
//#region node_modules/@noble/curves/abstract/curve.js
var Oo = /* @__PURE__ */ BigInt(0), ko = /* @__PURE__ */ BigInt(1);
function Ao(e, t) {
	let n = t.negate();
	return e ? n : t;
}
function jo(e, t) {
	let n = yo(e.Fp, t.map((e) => e.Z));
	return t.map((t, r) => e.fromAffine(t.toAffine(n[r])));
}
function Mo(e, t) {
	if (!Number.isSafeInteger(e) || e <= 0 || e > t) throw Error("invalid window size, expected [1.." + t + "], got W=" + e);
}
function No(e, t) {
	Mo(e, t);
	let n = Math.ceil(t / e) + 1, r = 2 ** (e - 1), i = 2 ** e;
	return {
		windows: n,
		windowSize: r,
		mask: Xa(e),
		maxNumber: i,
		shiftBy: BigInt(e)
	};
}
function Po(e, t, n) {
	let { windowSize: r, mask: i, maxNumber: a, shiftBy: o } = n, s = Number(e & i), c = e >> o;
	s > r && (s -= a, c += ko);
	let l = t * r, u = l + Math.abs(s) - 1, d = s === 0, f = s < 0, p = t % 2 != 0;
	return {
		nextN: c,
		offset: u,
		isZero: d,
		isNeg: f,
		isNegF: p,
		offsetF: l
	};
}
var Fo = /* @__PURE__ */ new WeakMap(), Io = /* @__PURE__ */ new WeakMap();
function Lo(e) {
	return Io.get(e) || 1;
}
function Ro(e) {
	if (e !== Oo) throw Error("invalid wNAF");
}
var zo = class {
	BASE;
	ZERO;
	Fn;
	bits;
	constructor(e, t) {
		this.BASE = e.BASE, this.ZERO = e.ZERO, this.Fn = e.Fn, this.bits = t;
	}
	_unsafeLadder(e, t, n = this.ZERO) {
		let r = e;
		for (; t > Oo;) t & ko && (n = n.add(r)), r = r.double(), t >>= ko;
		return n;
	}
	precomputeWindow(e, t) {
		let { windows: n, windowSize: r } = No(t, this.bits), i = [], a = e, o = a;
		for (let e = 0; e < n; e++) {
			o = a, i.push(o);
			for (let e = 1; e < r; e++) o = o.add(a), i.push(o);
			a = o.double();
		}
		return i;
	}
	wNAF(e, t, n) {
		if (!this.Fn.isValid(n)) throw Error("invalid scalar");
		let r = this.ZERO, i = this.BASE, a = No(e, this.bits);
		for (let e = 0; e < a.windows; e++) {
			let { nextN: o, offset: s, isZero: c, isNeg: l, isNegF: u, offsetF: d } = Po(n, e, a);
			n = o, c ? i = i.add(Ao(u, t[d])) : r = r.add(Ao(l, t[s]));
		}
		return Ro(n), {
			p: r,
			f: i
		};
	}
	wNAFUnsafe(e, t, n, r = this.ZERO) {
		let i = No(e, this.bits);
		for (let e = 0; e < i.windows && n !== Oo; e++) {
			let { nextN: a, offset: o, isZero: s, isNeg: c } = Po(n, e, i);
			if (n = a, !s) {
				let e = t[o];
				r = r.add(c ? e.negate() : e);
			}
		}
		return Ro(n), r;
	}
	getPrecomputes(e, t, n) {
		let r = Fo.get(t);
		return r || (r = this.precomputeWindow(t, e), e !== 1 && (typeof n == "function" && (r = n(r)), Fo.set(t, r))), r;
	}
	cached(e, t, n) {
		let r = Lo(e);
		return this.wNAF(r, this.getPrecomputes(r, e, n), t);
	}
	unsafe(e, t, n, r) {
		let i = Lo(e);
		return i === 1 ? this._unsafeLadder(e, t, r) : this.wNAFUnsafe(i, this.getPrecomputes(i, e, n), t, r);
	}
	createCache(e, t) {
		Mo(t, this.bits), Io.set(e, t), Fo.delete(e);
	}
	hasCache(e) {
		return Lo(e) !== 1;
	}
};
function Bo(e, t, n, r) {
	let i = t, a = e.ZERO, o = e.ZERO;
	for (; n > Oo || r > Oo;) n & ko && (a = a.add(i)), r & ko && (o = o.add(i)), i = i.double(), n >>= ko, r >>= ko;
	return {
		p1: a,
		p2: o
	};
}
function Vo(e, t, n) {
	if (t) {
		if (t.ORDER !== e) throw Error("Field.ORDER must match order: Fp == p, Fn == n");
		return _o(t), t;
	} else return wo(e, { isLE: n });
}
function Ho(e, t, n = {}, r) {
	if (r === void 0 && (r = e === "edwards"), !t || typeof t != "object") throw Error(`expected valid ${e} CURVE object`);
	for (let e of [
		"p",
		"n",
		"h"
	]) {
		let n = t[e];
		if (!(typeof n == "bigint" && n > Oo)) throw Error(`CURVE.${e} must be positive bigint`);
	}
	let i = Vo(t.p, n.Fp, r), a = Vo(t.n, n.Fn, r), o = [
		"Gx",
		"Gy",
		"a",
		e === "weierstrass" ? "b" : "d"
	];
	for (let e of o) if (!i.isValid(t[e])) throw Error(`CURVE.${e} must be valid field element of CURVE.Fp`);
	return t = Object.freeze(Object.assign({}, t)), {
		CURVE: t,
		Fp: i,
		Fn: a
	};
}
function Uo(e, t) {
	return function(n) {
		let r = e(n);
		return {
			secretKey: r,
			publicKey: t(r)
		};
	};
}
//#endregion
//#region node_modules/@noble/curves/abstract/weierstrass.js
var Wo = (e, t) => (e + (e >= 0 ? t : -t) / Yo) / t;
function Go(e, t, n) {
	Ja("scalar", e, qo, n);
	let [[r, i], [a, o]] = t, s = Wo(o * e, n), c = Wo(-i * e, n), l = e - s * r - c * a, u = -s * i - c * o, d = l < qo, f = u < qo;
	d && (l = -l), f && (u = -u);
	let p = Xa(Math.ceil(Ya(n) / 2)) + Jo;
	if (l < qo || l >= p || u < qo || u >= p) throw Error("splitScalar (endomorphism): failed for k");
	return {
		k1neg: d,
		k1: l,
		k2neg: f,
		k2: u
	};
}
var Ko = {
	Err: class extends Error {
		constructor(e = "") {
			super(e);
		}
	},
	_tlv: {
		encode: (e, t) => {
			let { Err: n } = Ko;
			if (La(e, "tag"), e < 0 || e > 255) throw new n("tlv.encode: wrong tag");
			if (typeof t != "string") throw TypeError("\"data\" expected string, got type=" + typeof t);
			if (t.length & 1) throw new n("tlv.encode: unpadded data");
			let r = t.length / 2, i = Ra(r);
			if (i.length / 2 & 128) throw new n("tlv.encode: long form length too big");
			let a = r > 127 ? Ra(i.length / 2 | 128) : "";
			return Ra(e) + a + i + t;
		},
		decode(e, t) {
			let { Err: n } = Ko;
			t = Oa(t, void 0, "DER data");
			let r = 0;
			if (e < 0 || e > 255) throw new n("tlv.encode: wrong tag");
			if (t.length < 2 || t[r++] !== e) throw new n("tlv.decode: wrong tlv");
			let i = t[r++], a = !!(i & 128), o = 0;
			if (!a) o = i;
			else {
				let e = i & 127;
				if (!e) throw new n("tlv.decode(long): indefinite length not supported");
				if (e > 4) throw new n("tlv.decode(long): byte length is too big");
				let a = t.subarray(r, r + e);
				if (a.length !== e) throw new n("tlv.decode: length bytes not complete");
				if (a[0] === 0) throw new n("tlv.decode(long): zero leftmost byte");
				for (let e of a) o = o << 8 | e;
				if (r += e, o < 128) throw new n("tlv.decode(long): not minimal encoding");
			}
			let s = t.subarray(r, r + o);
			if (s.length !== o) throw new n("tlv.decode: wrong value length");
			return {
				v: s,
				l: t.subarray(r + o)
			};
		}
	},
	_int: {
		encode(e) {
			let { Err: t } = Ko;
			if (Ia(e), e < qo) throw new t("integer: negative integers are not allowed");
			let n = Ra(e);
			if (Number.parseInt(n[0], 16) & 8 && (n = "00" + n), n.length & 1) throw new t("unexpected DER parsing assertion: unpadded hex");
			return n;
		},
		decode(e) {
			let { Err: t } = Ko;
			if (e.length < 1) throw new t("invalid signature integer: empty");
			if (e[0] & 128) throw new t("invalid signature integer: negative");
			if (e.length > 1 && e[0] === 0 && !(e[1] & 128)) throw new t("invalid signature integer: unnecessary leading zero");
			return Ba(e);
		}
	},
	toSig(e) {
		let { Err: t, _int: n, _tlv: r } = Ko, i = Oa(e, void 0, "signature"), { v: a, l: o } = r.decode(48, i);
		if (o.length) throw new t("invalid signature: left bytes after parsing");
		let { v: s, l: c } = r.decode(2, a), { v: l, l: u } = r.decode(2, c);
		if (u.length) throw new t("invalid signature: left bytes after parsing");
		return {
			r: n.decode(s),
			s: n.decode(l)
		};
	},
	hexFromSig(e) {
		let { _tlv: t, _int: n } = Ko, r = t.encode(2, n.encode(e.r)) + t.encode(2, n.encode(e.s));
		return t.encode(48, r);
	}
};
Object.freeze(Ko._tlv), Object.freeze(Ko._int), Object.freeze(Ko);
var qo = /* @__PURE__ */ BigInt(0), Jo = /* @__PURE__ */ BigInt(1), Yo = /* @__PURE__ */ BigInt(2), Xo = /* @__PURE__ */ BigInt(3), Zo = /* @__PURE__ */ BigInt(4);
function Qo(e, t = {}) {
	let n = Ho("weierstrass", e, t), r = n.Fp, i = n.Fn, a = n.CURVE, { h: o, n: s } = a;
	Za(t, {}, {
		allowInfinityPoint: "boolean",
		clearCofactor: "function",
		isTorsionFree: "function",
		fromBytes: "function",
		toBytes: "function",
		endo: "object"
	});
	let { endo: c, allowInfinityPoint: l } = t;
	if (c && (!r.is0(a.a) || typeof c.beta != "bigint" || !Array.isArray(c.basises))) throw Error("invalid endo: expected \"beta\": bigint and \"basises\": array");
	let u = es(r, i);
	function d() {
		if (!r.isOdd) throw Error("compression is not supported: Field does not have .isOdd()");
	}
	function f(e, t, n) {
		if (l && t.is0()) return Uint8Array.of(0);
		let { x: i, y: a } = t.toAffine(), o = r.toBytes(i);
		return Fa(n, "isCompressed"), n ? (d(), ja($o(!r.isOdd(a)), o)) : ja(Uint8Array.of(4), o, r.toBytes(a));
	}
	function p(e) {
		Oa(e, void 0, "Point");
		let { publicKey: t, publicKeyUncompressed: n } = u, i = e.length, a = e[0], o = e.subarray(1);
		if (l && i === 1 && a === 0) return {
			x: r.ZERO,
			y: r.ZERO
		};
		if (i === t && (a === 2 || a === 3)) {
			let e = r.fromBytes(o);
			if (!r.isValid(e)) throw Error("bad point: is not on curve, wrong x");
			let t = g(e), n;
			try {
				n = r.sqrt(t);
			} catch (e) {
				let t = e instanceof Error ? ": " + e.message : "";
				throw Error("bad point: is not on curve, sqrt error" + t);
			}
			d();
			let i = r.isOdd(n);
			return (a & 1) == 1 !== i && (n = r.neg(n)), {
				x: e,
				y: n
			};
		} else if (i === n && a === 4) {
			let e = r.BYTES, t = r.fromBytes(o.subarray(0, e)), n = r.fromBytes(o.subarray(e, e * 2));
			if (!_(t, n)) throw Error("bad point: is not on curve");
			return {
				x: t,
				y: n
			};
		} else throw Error(`bad point: got length ${i}, expected compressed=${t} or uncompressed=${n}`);
	}
	let m = t.toBytes === void 0 ? f : t.toBytes, h = t.fromBytes === void 0 ? p : t.fromBytes;
	function g(e) {
		let t = r.sqr(e), n = r.mul(t, e);
		return r.add(r.add(n, r.mul(e, a.a)), a.b);
	}
	function _(e, t) {
		let n = r.sqr(t), i = g(e);
		return r.eql(n, i);
	}
	if (!_(a.Gx, a.Gy)) throw Error("bad curve params: generator point");
	let v = r.mul(r.pow(a.a, Xo), Zo), y = r.mul(r.sqr(a.b), BigInt(27));
	if (r.is0(r.add(v, y))) throw Error("bad curve params: a or b");
	function b(e, t, n = !1) {
		if (!r.isValid(t) || n && r.is0(t)) throw Error(`bad point coordinate ${e}`);
		return t;
	}
	function x(e) {
		if (!(e instanceof w)) throw Error("Weierstrass Point expected");
	}
	function S(e) {
		if (!c || !c.basises) throw Error("no endo");
		return Go(e, c.basises, i.ORDER);
	}
	function C(e, t, n, i, a) {
		return n = new w(r.mul(n.X, e), n.Y, n.Z), t = Ao(i, t), n = Ao(a, n), t.add(n);
	}
	class w {
		static BASE = new w(a.Gx, a.Gy, r.ONE);
		static ZERO = new w(r.ZERO, r.ONE, r.ZERO);
		static Fp = r;
		static Fn = i;
		X;
		Y;
		Z;
		constructor(e, t, n) {
			this.X = b("x", e), this.Y = b("y", t, !0), this.Z = b("z", n), Object.freeze(this);
		}
		static CURVE() {
			return a;
		}
		static fromAffine(e) {
			let { x: t, y: n } = e || {};
			if (!e || !r.isValid(t) || !r.isValid(n)) throw Error("invalid affine point");
			if (e instanceof w) throw Error("projective point not allowed");
			return r.is0(t) && r.is0(n) ? w.ZERO : new w(t, n, r.ONE);
		}
		static fromBytes(e) {
			let t = w.fromAffine(h(Oa(e, void 0, "point")));
			return t.assertValidity(), t;
		}
		static fromHex(e) {
			return w.fromBytes(Ma(e));
		}
		get x() {
			return this.toAffine().x;
		}
		get y() {
			return this.toAffine().y;
		}
		precompute(e = 8, t = !0) {
			return E.createCache(this, e), t || this.multiply(Xo), this;
		}
		assertValidity() {
			let e = this;
			if (e.is0()) {
				if (t.allowInfinityPoint && r.is0(e.X) && r.eql(e.Y, r.ONE) && r.is0(e.Z)) return;
				throw Error("bad point: ZERO");
			}
			let { x: n, y: i } = e.toAffine();
			if (!r.isValid(n) || !r.isValid(i)) throw Error("bad point: x or y not field elements");
			if (!_(n, i)) throw Error("bad point: equation left != right");
			if (!e.isTorsionFree()) throw Error("bad point: not in prime-order subgroup");
		}
		hasEvenY() {
			let { y: e } = this.toAffine();
			if (!r.isOdd) throw Error("Field doesn't support isOdd");
			return !r.isOdd(e);
		}
		equals(e) {
			x(e);
			let { X: t, Y: n, Z: i } = this, { X: a, Y: o, Z: s } = e, c = r.eql(r.mul(t, s), r.mul(a, i)), l = r.eql(r.mul(n, s), r.mul(o, i));
			return c && l;
		}
		negate() {
			return new w(this.X, r.neg(this.Y), this.Z);
		}
		double() {
			let { a: e, b: t } = a, n = r.mul(t, Xo), { X: i, Y: o, Z: s } = this, c = r.ZERO, l = r.ZERO, u = r.ZERO, d = r.mul(i, i), f = r.mul(o, o), p = r.mul(s, s), m = r.mul(i, o);
			return m = r.add(m, m), u = r.mul(i, s), u = r.add(u, u), c = r.mul(e, u), l = r.mul(n, p), l = r.add(c, l), c = r.sub(f, l), l = r.add(f, l), l = r.mul(c, l), c = r.mul(m, c), u = r.mul(n, u), p = r.mul(e, p), m = r.sub(d, p), m = r.mul(e, m), m = r.add(m, u), u = r.add(d, d), d = r.add(u, d), d = r.add(d, p), d = r.mul(d, m), l = r.add(l, d), p = r.mul(o, s), p = r.add(p, p), d = r.mul(p, m), c = r.sub(c, d), u = r.mul(p, f), u = r.add(u, u), u = r.add(u, u), new w(c, l, u);
		}
		add(e) {
			x(e);
			let { X: t, Y: n, Z: i } = this, { X: o, Y: s, Z: c } = e, l = r.ZERO, u = r.ZERO, d = r.ZERO, f = a.a, p = r.mul(a.b, Xo), m = r.mul(t, o), h = r.mul(n, s), g = r.mul(i, c), _ = r.add(t, n), v = r.add(o, s);
			_ = r.mul(_, v), v = r.add(m, h), _ = r.sub(_, v), v = r.add(t, i);
			let y = r.add(o, c);
			return v = r.mul(v, y), y = r.add(m, g), v = r.sub(v, y), y = r.add(n, i), l = r.add(s, c), y = r.mul(y, l), l = r.add(h, g), y = r.sub(y, l), d = r.mul(f, v), l = r.mul(p, g), d = r.add(l, d), l = r.sub(h, d), d = r.add(h, d), u = r.mul(l, d), h = r.add(m, m), h = r.add(h, m), g = r.mul(f, g), v = r.mul(p, v), h = r.add(h, g), g = r.sub(m, g), g = r.mul(f, g), v = r.add(v, g), m = r.mul(h, v), u = r.add(u, m), m = r.mul(y, v), l = r.mul(_, l), l = r.sub(l, m), m = r.mul(_, h), d = r.mul(y, d), d = r.add(d, m), new w(l, u, d);
		}
		subtract(e) {
			return x(e), this.add(e.negate());
		}
		is0() {
			return this.equals(w.ZERO);
		}
		multiply(e) {
			let { endo: n } = t;
			if (!i.isValidNot0(e)) throw RangeError("invalid scalar: out of range");
			let r, a, o = (e) => E.cached(this, e, (e) => jo(w, e));
			if (n) {
				let { k1neg: t, k1: i, k2neg: s, k2: c } = S(e), { p: l, f: u } = o(i), { p: d, f } = o(c);
				a = u.add(f), r = C(n.beta, l, d, t, s);
			} else {
				let { p: t, f: n } = o(e);
				r = t, a = n;
			}
			return jo(w, [r, a])[0];
		}
		multiplyUnsafe(e) {
			let { endo: n } = t, r = this, a = e;
			if (!i.isValid(a)) throw RangeError("invalid scalar: out of range");
			if (a === qo || r.is0()) return w.ZERO;
			if (a === Jo) return r;
			if (E.hasCache(this)) return this.multiply(a);
			if (n) {
				let { k1neg: e, k1: t, k2neg: i, k2: o } = S(a), { p1: s, p2: c } = Bo(w, r, t, o);
				return C(n.beta, s, c, e, i);
			} else return E.unsafe(r, a);
		}
		toAffine(e) {
			let t = this, n = e, { X: i, Y: a, Z: o } = t;
			if (r.eql(o, r.ONE)) return {
				x: i,
				y: a
			};
			let s = t.is0();
			n ??= s ? r.ONE : r.inv(o);
			let c = r.mul(i, n), l = r.mul(a, n), u = r.mul(o, n);
			if (s) return {
				x: r.ZERO,
				y: r.ZERO
			};
			if (!r.eql(u, r.ONE)) throw Error("invZ was invalid");
			return {
				x: c,
				y: l
			};
		}
		isTorsionFree() {
			let { isTorsionFree: e } = t;
			return o === Jo ? !0 : e ? e(w, this) : E.unsafe(this, s).is0();
		}
		clearCofactor() {
			let { clearCofactor: e } = t;
			return o === Jo ? this : e ? e(w, this) : this.multiplyUnsafe(o);
		}
		isSmallOrder() {
			return o === Jo ? this.is0() : this.clearCofactor().is0();
		}
		toBytes(e = !0) {
			return Fa(e, "isCompressed"), this.assertValidity(), m(w, this, e);
		}
		toHex(e = !0) {
			return Aa(this.toBytes(e));
		}
		toString() {
			return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
		}
	}
	let T = i.BITS, E = new zo(w, t.endo ? Math.ceil(T / 2) : T);
	return T >= 8 && w.BASE.precompute(8), Object.freeze(w.prototype), Object.freeze(w), w;
}
function $o(e) {
	return Uint8Array.of(e ? 2 : 3);
}
function es(e, t) {
	return {
		secretKey: t.BYTES,
		publicKey: 1 + e.BYTES,
		publicKeyUncompressed: 1 + 2 * e.BYTES,
		publicKeyHasPrefix: !0,
		signature: 2 * t.BYTES
	};
}
//#endregion
//#region node_modules/@noble/curves/secp256k1.js
var ts = {
	p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
	n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
	h: BigInt(1),
	a: BigInt(0),
	b: BigInt(7),
	Gx: BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),
	Gy: BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")
}, ns = {
	beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
	basises: [[BigInt("0x3086d221a7d46bcde86c90e49284eb15"), -BigInt("0xe4437ed6010e88286f547fa90abfe4c3")], [BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), BigInt("0x3086d221a7d46bcde86c90e49284eb15")]]
}, rs = /* @__PURE__ */ BigInt(0), is = /* @__PURE__ */ BigInt(2);
function as(e) {
	let t = ts.p, n = BigInt(3), r = BigInt(6), i = BigInt(11), a = BigInt(22), o = BigInt(23), s = BigInt(44), c = BigInt(88), l = e * e * e % t, u = l * l * e % t, d = so(so(so(u, n, t) * u % t, n, t) * u % t, is, t) * l % t, f = so(d, i, t) * d % t, p = so(f, a, t) * f % t, m = so(p, s, t) * p % t, h = so(so(so(so(so(so(m, c, t) * m % t, s, t) * p % t, n, t) * u % t, o, t) * f % t, r, t) * l % t, is, t);
	if (!os.eql(os.sqr(h), e)) throw Error("Cannot find square root");
	return h;
}
var os = wo(ts.p, { sqrt: as }), ss = /* @__PURE__ */ Qo(ts, {
	Fp: os,
	endo: ns
}), cs = {};
function ls(e, ...t) {
	let n = cs[e];
	if (n === void 0) {
		let t = Da(Ga(e));
		n = ja(t, t), cs[e] = n;
	}
	return Da(ja(n, ...t));
}
var us = (e) => e.toBytes(!0).slice(1), ds = (e) => e % is === rs;
function fs(e) {
	let { Fn: t, BASE: n } = ss, r = t.fromBytes(e), i = n.multiply(r);
	return {
		scalar: ds(i.y) ? r : t.neg(r),
		bytes: us(i)
	};
}
function ps(e) {
	let t = os;
	if (!t.isValidNot0(e)) throw Error("invalid x: Fail if x ≥ p");
	let n = t.create(e * e), r = t.create(n * e + BigInt(7)), i = t.sqrt(r);
	ds(i) || (i = t.neg(i));
	let a = ss.fromAffine({
		x: e,
		y: i
	});
	return a.assertValidity(), a;
}
var ms = Ba;
function hs(...e) {
	return ss.Fn.create(ms(ls("BIP0340/challenge", ...e)));
}
function gs(e) {
	return fs(e).bytes;
}
function _s(e, t, n = _a(32)) {
	let { Fn: r, BASE: i } = ss, a = Oa(e, void 0, "message"), { bytes: o, scalar: s } = fs(t), c = Oa(n, 32, "auxRand"), l = ls("BIP0340/nonce", r.toBytes(s ^ ms(ls("BIP0340/aux", c))), o, a), u = r.create(ms(l));
	if (u === 0n) throw Error("sign failed: k is zero");
	let d = i.multiply(u), f = ds(d.y) ? u : r.neg(u), p = us(d), m = hs(p, o, a), h = /* @__PURE__ */ new Uint8Array(64);
	if (h.set(p, 0), h.set(r.toBytes(r.create(f + m * s)), 32), !vs(h, a, o)) throw Error("sign: Invalid signature produced");
	return h;
}
function vs(e, t, n) {
	let { Fp: r, Fn: i, BASE: a } = ss, o = Oa(e, 64, "signature"), s = Oa(t, void 0, "message"), c = Oa(n, 32, "publicKey");
	try {
		let e = ps(ms(c)), t = ms(o.subarray(0, 32));
		if (!r.isValidNot0(t)) return !1;
		let n = ms(o.subarray(32, 64));
		if (!i.isValidNot0(n)) return !1;
		let l = hs(i.toBytes(t), us(e), s), u = a.multiplyUnsafe(n).add(e.multiplyUnsafe(i.neg(l))), { x: d, y: f } = u.toAffine();
		return !(u.is0() || !ds(f) || d !== t);
	} catch {
		return !1;
	}
}
var ys = /* @__PURE__ */ (() => {
	let e = (e) => (e = e === void 0 ? _a(48) : e, Do(e, ts.n));
	return Object.freeze({
		keygen: Uo(e, gs),
		getPublicKey: gs,
		sign: _s,
		verify: vs,
		Point: ss,
		utils: Object.freeze({
			randomSecretKey: e,
			taggedHash: ls,
			lift_x: ps,
			pointToBytes: us
		}),
		lengths: Object.freeze({
			secretKey: 32,
			publicKey: 32,
			publicKeyHasPrefix: !1,
			signature: 64,
			seed: 48
		})
	});
})();
new TextDecoder("utf-8");
var bs = new TextEncoder(), xs = "https://w3id.org/security#";
function Ss() {
	return {
		id: "",
		created: "",
		dateDeleted: "",
		content: "",
		maker: "",
		sig: ""
	};
}
function Cs(e) {
	return JSON.stringify(e);
}
function ws(e) {
	return da(Da(bs.encode(Cs(e))));
}
function Ts(e, t, n) {
	return ys.verify(ma(e), ma(ws(t)), ma(n));
}
function Es(e, t) {
	return da(ys.sign(ma(ws(e)), ma(t)));
}
//#endregion
//#region src/utils/keyHelpers/otherHelpers.ts
var Ds = (e) => {
	let t = A.any(e, E.space("preferencesFile"), null, e.doc())?.value;
	if (t = t?.split("/").slice(0, -2).join("/"), !t) throw Error(`prefererencesFile is expected to exist in ${e}`);
	return t;
}, Os = (e) => {
	let t;
	try {
		t = `${Ds(e)}/profile/keys/publicKey.ttl`;
	} catch (e) {
		R(e);
	}
	return t;
}, ks = (e) => {
	let t;
	try {
		t = `${Ds(e)}/settings/keys/privateKey.ttl`;
	} catch (e) {
		R(e);
	}
	return t;
};
async function As(e, t) {
	return await Ms(e, t, "publicKey");
}
async function js(e, t) {
	return await Ms(e, t, "privateKey");
}
async function Ms(e, t, n) {
	try {
		return await A.fetcher.load(t), A.any(e, E.solid(n))?.value;
	} catch (e) {
		if (e.response.status === 404) {
			I("createIfNotExists: doc does NOT exist, will create... " + t);
			try {
				await A.fetcher.webOperation("PUT", t, {
					data: "",
					contentType: "text/turtle"
				});
			} catch (e) {
				throw I("createIfNotExists doc FAILED: " + t + ": " + e), e;
			}
			delete A.fetcher.requested[t];
			return;
		} else throw I("createIfNotExists doc FAILED: " + t + ": " + e), e;
	}
}
//#endregion
//#region src/utils/keyHelpers/acl.ts
async function Ns(e, t) {
	await A.fetcher.load(e);
	let n = A.any(A.sym(e), A.sym("http://www.iana.org/assignments/link-relations/acl"));
	if (!n) throw Error("Key ACL doc not found!");
	try {
		await A.fetcher.webOperation("PUT", n.value, {
			data: t,
			contentType: "text/turtle"
		});
	} catch (e) {
		if (e?.response?.status !== 404) throw Error(e);
		I("delete " + n.value + " " + e.response.status);
	}
}
var Ps = (e) => `
@prefix : <#>.
@prefix acl: <http://www.w3.org/ns/auth/acl#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix key: <./>.

:ReadWrite
    a acl:Authorization;
    acl:accessTo key:;
    acl:default key:;
    acl:agent <${e}>;
    acl:mode acl:Read, acl:Write.
`, Fs = (e, t) => {
	let n = "acl:agentClass foaf:Agent";
	return t?.length && (n = `acl:agent <${t}>`), `
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix acl: <http://www.w3.org/ns/auth/acl#>.
<#Read>
    a acl:Authorization;
    ${n};
    acl:accessTo <${e.split("/").pop()}>;
    acl:mode acl:Read.
`;
};
//#endregion
//#region src/chat/keys.ts
function Is() {
	return da(ys.utils.randomSecretKey());
}
function Ls(e) {
	return da(ys.getPublicKey(ma(e)));
}
async function Rs(e) {
	await A.fetcher.load(e);
	let t = await Os(e);
	try {
		return await A.fetcher.load(t), A.any(e, E.solid("publicKey"))?.value;
	} catch {
		return;
	}
}
async function zs(e) {
	await A.fetcher.load(e);
	let t = await Os(e), n = await ks(e), r = await As(e, t), i = await js(e, n), a = !0;
	if (i && r !== Ls(i) && confirm("This is strange the publicKey is not valid for\n" + e?.uri + "'shall we repair keeping the private key ?") && (a = !1), !i || !r || !a) {
		let s = [], c = [];
		if (i || (i = Is(), c = [o(e, E.solid("privateKey"), le(i), A.sym(n))], await Vs(n, [], c, e.uri)), !r || !a) {
			s = [], r && (s = [o(e, E.solid("publicKey"), x(r), A.sym(t))], I("delete invalid publicKey " + s));
			let n = Ls(i);
			c = [o(e, E.solid("publicKey"), le(n), A.sym(t))], await Vs(t, s, c);
		}
		await Ns(n.substring(0, n.lastIndexOf("/") + 1), Ps(e.uri));
	}
	return i;
}
var Bs = async (e) => {
	await A.fetcher.load(e);
	let t = A.any(A.sym(e), A.sym("http://www.iana.org/assignments/link-relations/acl"));
	if (t) try {
		let e = await A.fetcher.webOperation("DELETE", t.value);
		I("delete keyAcl" + t.value + " " + e.status);
	} catch (e) {
		if (e.response.status !== 404) throw Error(e);
		I("delete keyAcl" + t.value + " " + e.response.status);
	}
};
async function Vs(e, t, n, r = "") {
	await Bs(e), await A.updater.updateMany(t, n), await Ns(e, Fs(e, r));
}
//#endregion
//#region src/chat/chatLogic.js
var Hs = class {
	constructor(e, t) {
		this.channel = e, this.channelRoot = e.doc(), this.options = t, this.dateFolder = new ea(this.channelRoot, "chat.ttl"), this.div = null;
	}
	async createMessage(e) {
		return this.updateMessage(e);
	}
	async updateMessage(e, t = null, n, r = null) {
		let i = [], a = /* @__PURE__ */ new Date(), s = "" + a.getTime(), c = ce(a), l = t ? t.doc() : this.dateFolder.leafDocumentFromDate(a), u = A.sym(l.uri + "#Msg" + s), d = S.currentUser(), f = Ss();
		if (f.id = u.uri, t) {
			let e = A.any(t, E.foaf("maker"));
			if (e.uri === d.uri) {
				let e = await Gs(t);
				i.push(o(e, E.dct("isReplacedBy"), u, l));
				let r = A.any(e, E.sioc("has_reply"));
				r && i.push(o(u, E.sioc("has_reply"), r, l)), n && i.push(o(u, E.schema("dateDeleted"), c, l));
			} else {
				let t = "Error you cannot delete/edit a message from someone else : \n" + e.uri;
				throw L(t), alert(t), Error(t);
			}
		} else i.push(o(this.channel, E.wf("message"), u, l));
		if (i.push(o(u, E.sioc("content"), A.literal(e), l)), f.content = e, i.push(o(u, E.dct("created"), c, l)), f.created = c.value, d) {
			i.push(o(u, E.foaf("maker"), d, l)), f.maker = d.uri;
			let e = Es(f, await zs(d));
			i.push(o(u, _(`${xs}proofValue`), x(e), l));
		}
		r && (i.push(o(r, E.sioc("has_member"), u, l)), r.doc().sameTerm(u.doc()) || i.push(o(r, E.sioc("has_member"), u, r.doc())));
		try {
			await A.updater.updateMany([], i);
		} catch (e) {
			let t = "Error saving chat message: " + e;
			throw L(t), alert(t), Error(t);
		}
		return u;
	}
	async deleteMessage(e) {
		return this.updateMessage("(message deleted)", e, !0);
	}
	async createThread(e) {
		let t = A.each(e, E.sioc("has_reply"), null, e.doc()).filter((e) => A.holds(e, E.rdf("type"), E.sioc("Thread"), e.doc()));
		if (t.length > 0) return t[0];
		let n = _(e.uri + "-thread"), r = [o(n, E.rdf("type"), E.sioc("Thread"), n.doc()), o(e, E.sioc("has_reply"), n, n.doc())];
		return await A.updater.update([], r), n;
	}
};
async function Us(e) {
	let t = [e], n = {};
	n[e.uri] = !0;
	let r = e;
	for (;;) {
		let e = A.any(null, E.dct("isReplacedBy"), r, r.doc());
		if (!e || n[e.uri]) break;
		await A.fetcher.load(e), t.unshift(e), n[e.uri] = !0, r = e;
	}
	for (r = e;;) {
		let e = A.any(r, E.dct("isReplacedBy"), null, r.doc());
		if (!e || n[e.uri]) break;
		t.push(e), n[e.uri] = !0, r = e;
	}
	return t;
}
async function Ws(e) {
	let t = e, n = {};
	for (; t;) {
		if (n[t.uri]) return R("originalVersion: verion loop" + e), e;
		n[t.uri] = !0, e = t, await A.fetcher.load(e), t = A.any(null, E.dct("isReplacedBy"), e, e.doc());
	}
	return e;
}
async function Gs(e) {
	let t = e, n = {};
	for (; t;) {
		if (n[t.uri]) return R("mostRecentVersion: verion loop" + e), e;
		n[t.uri] = !0, e = t, await A.fetcher.load(e), t = A.any(e, E.dct("isReplacedBy"), null, e.doc());
	}
	return e;
}
function Ks(e) {
	return A.holds(e, E.schema("dateDeleted"), null, e.doc());
}
//#endregion
//#region src/lib/participation.ts
var qs = /* @__PURE__ */ r({
	manageParticipation: () => Qs,
	participationObject: () => Xs,
	recordParticipation: () => Zs,
	renderParticipants: () => Ys
}), Js = w.store;
function Ys(e, t, n, r, i, a) {
	t.setAttribute("style", P.participantsStyle);
	let o = function(n) {
		let r = Js.any(n, E.wf("participant")), i;
		if (!r) return i = e.createElement("tr"), i.textContent = "???", i;
		let o = Js.anyValue(n, E.ui("backgroundColor")) || N.participationDefaultBackground, s = e.createElement("div");
		s.setAttribute("style", P.participantsBlock), s.style.backgroundColor = o, i = Kt(e, null, r, a), t.appendChild(i);
		let c = e.createElement("td");
		return c.setAttribute("style", P.personTableTD), c.appendChild(s), i.insertBefore(c, i.firstChild), i;
	}, s = function() {
		let e = Js.each(r, E.wf("participation")).map(function(e) {
			return I("in participants"), [Js.anyValue(e, E.cal("dtstart")) || "9999-12-31", e];
		});
		e.sort(), xe(t, e.map(function(e) {
			return e[1];
		}), o);
	};
	return t.refresh = s, s(), t;
}
function Xs(e, t, n) {
	return new Promise(function(r, i) {
		if (!n) throw Error("No user id");
		let a = Js.each(e, E.wf("participation")).filter(function(e) {
			return Js.holds(e, E.wf("participant"), n);
		});
		if (a.length > 1) {
			let e = [];
			for (let t of a) {
				let n = Js.anyValue(t, E.cal("dtstart"));
				n && e.push([n, t]);
			}
			e.sort(), L("Multiple participation objects, picking earliest, in " + t), r(e[0][1]);
		}
		if (a.length) r(a[0]);
		else {
			let a = X(t), s = [
				o(e, E.wf("participation"), a, t),
				o(a, E.wf("participant"), n, t),
				o(a, E.cal("dtstart"), /* @__PURE__ */ new Date(), t),
				o(a, E.ui("backgroundColor"), nc(n), t)
			];
			Js.updater.update([], s, function(e, t, n) {
				t ? r(a) : i(/* @__PURE__ */ Error("Error recording your participation: " + n));
			}), r(a);
		}
	});
}
function Zs(e, t, n) {
	let r = S.currentUser();
	if (!r) return;
	let i = Js.each(e, E.wf("participation")).filter(function(e) {
		return Js.holds(e, E.wf("participant"), r);
	});
	if (i.length > 1) throw Error("Multiple records of your participation");
	if (i.length) return i[0];
	{
		if (!Js.updater.editable(t)) return I("Not recording participation, as no write access as " + r + " to " + t), null;
		let i = X(t), a = [
			o(e, E.wf("participation"), i, t),
			o(i, E.wf("participant"), r, t),
			o(i, E.cal("dtstart"), /* @__PURE__ */ new Date(), t),
			o(i, E.ui("backgroundColor"), nc(r), t)
		];
		return Js.updater.update([], a, function(e, t, r) {
			if (!t) throw Error("Error recording your participation: " + r);
			n && n.refresh && n.refresh();
		}), i;
	}
}
function Qs(e, t, n, r, i, a) {
	let o = e.createElement("table");
	t.appendChild(o), Ys(e, o, n, r, i, a);
	try {
		Zs(r, n, o);
	} catch (n) {
		t.appendChild(H(e, "Error recording your participation: " + n));
	}
	return o;
}
//#endregion
//#region src/lib/pad.ts
var $s = /* @__PURE__ */ r({
	getChunks: () => ic,
	lightColorHash: () => nc,
	manageParticipation: () => Qs,
	notepad: () => rc,
	notepadToHTML: () => oc,
	participationObject: () => Xs,
	recordParticipation: () => Zs,
	renderParticipants: () => Ys,
	xmlEncode: () => ac
}), ec = w.store, tc = p("http://www.w3.org/ns/pim/pad#");
function nc(e) {
	return e && e.uri ? "#" + (function(e) {
		return e.split("").reduce(function(e, t) {
			return e = (e << 5) - e + t.charCodeAt(0), e & e;
		}, 0);
	}(e.uri) & 16777215 | 12632256).toString(16) : "#ffffff";
}
function rc(e, t, n, r, i) {
	i ||= {};
	let a = i.exists, s = e.createElement("table"), c = ec;
	if (r && !r.uri) throw Error("UI.pad.notepad:  Invalid userid");
	let l = ec.updater, u = p("http://www.w3.org/ns/pim/pad#");
	s.setAttribute("style", P.notepadStyle);
	let d = null, f = null;
	if (i.statusArea) {
		let t = i.statusArea.appendChild(e.createElement("table")).appendChild(e.createElement("tr"));
		d = t.appendChild(e.createElement("td")), f = t.appendChild(e.createElement("td")), d && d.setAttribute("style", P.upstreamStatus), f && f.setAttribute("style", P.downstreamStatus);
	}
	let m = function(t, n = !1) {
		I(t), i.statusArea && (n ? d : f).appendChild(H(e, t, "pink"));
	}, h = function(e) {
		i.statusArea && (i.statusArea.innerHTML = "");
	}, _ = function(e, t, n) {
		let r = e.subject;
		t ||= "";
		let i = P.baseStyle, a = P.headingCore, o = P.headingStyle, s = c.any(r, E.dc("author"));
		if (!t && s) {
			let e = nc(s);
			t = "color: " + (n ? "#888" : "black") + "; background-color: " + e + ";";
		}
		let l = c.any(r, u("indent"));
		l = l ? l.value : 0;
		let d = l >= 0 ? i + "text-indent: " + l * 3 + "em;" : a + o[-1 - l];
		e.setAttribute("style", d + t);
	}, v = function(e) {
		let r = e.subject;
		if (!r) throw Error("No chunk for line to be deleted!");
		let i = c.any(void 0, u("next"), r), a = c.any(r, u("next"));
		if (i.sameTerm(n) && a.sameTerm(n)) {
			I("You can't delete the only line.");
			return;
		}
		let s = c.statementsMatching(r, void 0, void 0, t).concat(c.statementsMatching(void 0, void 0, r, t)), d = [o(i, u("next"), a, t)];
		if (r instanceof g && I("Deleting line " + r.uri.slice(-4)), !l) throw Error("have no updater");
		l.update(s, d, function(t, n, i, a) {
			if (n) {
				let t = e.parentNode;
				if (t) {
					let e = t.previousSibling;
					t.parentNode && t.parentNode.removeChild(t), e && e.firstChild && e.firstChild.focus();
				}
			} else if (a && a.status === 409) _(e, "color: black;  background-color: #ffd;"), e.state = 0, be(.5, 512), setTimeout(function() {
				k();
			}, 1e3);
			else {
				I("    removePart FAILED " + r + ": " + i), I("    removePart was deleting :'" + s), _(e, "color: black;  background-color: #fdd;");
				let t = a ? a.status : " [no response field] ";
				m("Error " + t + " saving changes: " + String(i));
			}
		});
	}, y = function(e, n, r) {
		let i = c.statementsMatching(n, u("indent")), a = i.length ? Number(i[0].object.value) : 0;
		if (a + r < -3) return;
		let s = a + r, d = o(n, u("indent"), s, t);
		if (!l) throw Error("no updater");
		l.update(i, d, function(n, r, i) {
			r ? _(e) : (I("Indent change FAILED '" + s + "' for " + t + ": " + i), _(e, "color: black;  background-color: #fdd;"), l.requestDownstreamAction(t, k));
		});
	}, b = function(e, n) {
		let r = null;
		e.addEventListener("keydown", function(r) {
			if (!l) throw Error("no updater");
			let i, a;
			switch (r.keyCode) {
				case 13: {
					let t = r.shiftKey;
					if (I("enter"), t ? (a = c.any(void 0, u("next"), n), i = "newlinesAfter") : (a = c.any(n, u("next")), i = "newlinesBefore"), a[i] = a[i] || 0, a[i] += 1, a[i] > 1) {
						I("    queueing newline queue = " + a[i]);
						return;
					}
					I("    go ahead line before " + a[i]), S(e, t);
					break;
				}
				case 8:
					if (e.value.length === 0) switch (I("Delete key line " + n.uri.slice(-4) + " state " + e.state), e.state) {
						case 1:
						case 2:
							e.state = 4;
							return;
						case 3:
						case 4: return;
						case void 0:
						case 0:
							e.state = 3, v(e), r.preventDefault();
							break;
						default: throw Error("pad: Unexpected state " + e);
					}
					break;
				case 9: {
					let t = r.shiftKey ? -1 : 1;
					y(e, n, t), r.preventDefault();
					break;
				}
				case 27:
					I("escape"), l.requestDownstreamAction(t, k), r.preventDefault();
					break;
				case 38:
					e.parentNode.previousSibling && (e.parentNode.previousSibling.firstChild.focus(), r.preventDefault());
					break;
				case 40:
					e.parentNode.nextSibling && (e.parentNode.nextSibling.firstChild.focus(), r.preventDefault());
					break;
				default:
			}
		});
		let i = function(e) {
			let n = e.subject;
			_(e, void 0, !0);
			let r = c.any(n, E.sioc("content")).value, a = [o(n, E.sioc("content"), r, t)], s;
			e.value && (s = [o(n, E.sioc("content"), e.value, t)]);
			let u = e.value;
			if (e.lastSent && r !== e.lastSent && console.warn("Out of order, last sent expected '" + r + "' but found '" + e.lastSent + "'"), e.lastSent = u, !l) throw Error("no updater");
			l.update(a, s, function(n, a, o, s) {
				if (a) h(!0), _(e), I("    Patch ok '" + r + "' -> '" + u + "' "), e.state === 4 ? (e.state = 3, v(e)) : e.state === 3 || (e.state === 2 ? (e.state = 1, i(e)) : e.state = 0);
				else if (I("    patch FAILED " + s.status + " for '" + r + "' -> '" + u + "': " + o), s.status === 409) _(e, "color: black;  background-color: #fdd;"), e.state = 0, be(.5, 512), setTimeout(function() {
					l.requestDownstreamAction(t, k);
				}, 1e3);
				else {
					_(e, "color: black;  background-color: #fdd;");
					let t = s?.status;
					!t || t === 502 || t === 503 ? (e.lastSent = void 0, e.state = 0, setTimeout(() => {
						(e.state === 0 || e.state === void 0) && (e.state = 1, i(e));
					}, 2e3)) : (e.state = 0, m("    Error " + t + " sending data: " + o, !0), be(1, 128));
				}
			});
		};
		e.addEventListener("input", function(t) {
			switch (_(e, void 0, !0), I("Input event state " + e.state + " value '" + e.value + "'"), e.state) {
				case 3: return;
				case 4: return;
				case 2: return;
				case 1:
					e.state = 2;
					return;
				case 0:
				case void 0: r !== null && clearTimeout(r), r = setTimeout(() => {
					r = null, (e.state === 0 || e.state === void 0) && (e.state = 1, i(e));
				}, 400);
			}
		});
	}, x = function(t, n, i) {
		let a = c.any(n, E.sioc("content"));
		a = a ? a.value : "";
		let o = e.createElement("tr");
		i ? s.insertBefore(o, t) : t && t.nextSibling ? s.insertBefore(o, t.nextSibling) : s.appendChild(o);
		let l = o.appendChild(e.createElement("input"));
		return l.subject = n, l.setAttribute("type", "text"), l.value = a, r ? (_(l, ""), b(l, n)) : (_(l, "color: #222; background-color: #fff"), I("Note can't add listeners - not logged in")), l;
	}, S = function(e, i) {
		let a = ec, s = 0, c = null, d, f, p, m, h;
		e ? (e.tagName.toLowerCase() !== "input" && I("return pressed when current document is: " + e.tagName), d = e.subject, s = a.any(d, u("indent")), s = s ? Number(s.value) : 0, i ? (f = a.any(void 0, u("next"), d), p = d, m = f, c = "newlinesAfter") : (f = d, p = a.any(d, u("next")), m = p, c = "newlinesBefore"), h = e.parentNode) : (f = n, p = n, h = void 0);
		let g = X(t), v = g.uri.slice(-4), y = [o(f, u("next"), p, t)], b = [
			o(f, u("next"), g, t),
			o(g, u("next"), p, t),
			o(g, E.dc("author"), r, t),
			o(g, E.sioc("content"), "", t)
		];
		if (s > 0 && b.push(o(g, u("indent"), s, t)), I("    Fresh chunk " + v + " proposed"), !l) throw Error("no updater");
		l.update(y, b, function(e, t, n, r) {
			if (!t) I("    ERROR writing new line " + v + ": " + n);
			else {
				let e = x(h, g, i);
				_(e), e.focus(), c && (I("    Fresh chunk " + v + " updated, queue = " + m[c]), --m[c], m[c] > 0 && (I("    Implementing queued newlines = " + p.newLinesBefore), S(e, i)));
			}
		});
	}, C = function() {
		let e = {}, t = 0;
		function r(e) {
			m(e), t++;
		}
		if (!c.the(n, u("next"))) return r("No initial next pointer"), !1;
		let i = n, a;
		for (; a = c.the(i, u("next")), a || r("No next pointer from " + i), !a.sameTerm(n);) {
			i = a;
			let t = a.uri.split("#")[1];
			if (e[a.uri]) return r("Loop!"), !1;
			e[a.uri] = !0;
			let n = c.each(a, u("next")).length;
			n !== 1 && r("Should be 1 not " + n + " next pointer for " + t), n = c.each(a, u("indent")).length, n > 1 && r("Should be 0 or 1 not " + n + " indent for " + t), n = c.each(a, E.sioc("content")).length, n !== 1 && r("Should be 1 not " + n + " contents for " + t), n = c.each(a, E.dc("author")).length, n !== 1 && r("Should be 1 not " + n + " author for " + t), c.statementsMatching(void 0, E.sioc("contents")).forEach(function(t) {
				e[t.subject.value] || r("Loose chunk! " + t.subject.value);
			});
		}
		return !t;
	}, w = function() {
		if (c.each(n, u("next")).length !== 1) {
			let e = "Pad: Inconsistent data - NEXT pointers: " + c.each(n, u("next")).length;
			I(e), i.statusArea && (i.statusArea.textContent += e);
			return;
		}
		let e, t = [];
		for (let e = c.the(n, u("next")); !e.sameTerm(n); e = c.the(e, u("next"))) for (let n = 0; n < s.children.length; n++) {
			let r = s.children[n];
			r.firstChild && r.firstChild.subject.sameTerm(e) && (t[e.uri] = r.firstChild);
		}
		for (let n = s.children.length - 1; n >= 0; n--) e = s.children[n], t[e.firstChild.subject.uri] || s.removeChild(e);
		e = s.firstChild;
		for (let r = c.the(n, u("next")); !r.sameTerm(n); r = c.the(r, u("next"))) {
			let n = c.any(r, E.sioc("content")).value;
			if (e && t[r.uri]) {
				let t = e.firstChild;
				n !== t.value && (t.value = n), _(t), t.state = 0, delete t.lastSent, e = e.nextSibling;
			} else x(e, r, !0);
		}
	}, T = function(e) {
		if (e.refresh) {
			e.refresh();
			return;
		}
		for (let t = 0; t < e.children.length; t++) T(e.children[t]);
	}, D = !1, O = function() {
		I("    reloaded OK"), h(), C() ? T(s) : m("CONSISTENCY CHECK FAILED");
	}, k = function() {
		if (D) {
			I("   Already reloading - stop");
			return;
		}
		D = !0;
		let e = 1e3, n = function() {
			if (I("try reload - timeout = " + e), !l) throw Error("no updater");
			l.reload(l.store, t, function(r, i, a) {
				D = !1, r ? O() : a.status === 0 ? (m("Network error refreshing the pad. Retrying in " + e / 1e3), D = !0, e *= 2, setTimeout(n, e)) : m("Error " + a.status + "refreshing the pad:" + i + ". Stopped. " + t);
			});
		};
		n();
	};
	if (s.refresh = w, s.reloadAndSync = k, r || I("Warning: must be logged in for pad to be edited"), a) I("Existing pad."), C() ? (w(), c.holds(n, u("next"), n) && S()) : I(s.textContent = "Inconsistent data. Abort");
	else {
		I("No pad exists - making new one.");
		let e = [
			o(n, E.rdf("type"), u("Notepad"), t),
			o(n, E.dc("author"), r, t),
			o(n, E.dc("created"), /* @__PURE__ */ new Date(), t),
			o(n, u("next"), n, t)
		];
		if (!l) throw Error("no updater");
		l.update([], e, function(e, t, n) {
			t ? (I("Initial pad created"), S()) : m(n || "");
		});
	}
	return s;
}
function ic(e, t) {
	let n = [];
	for (let r = t.the(e, tc("next")); !r.sameTerm(e); r = t.the(r, tc("next"))) n.push(r);
	return n;
}
function ac(e) {
	return e.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
}
function oc(e, t) {
	let n = ic(e, t), r = "<html>\n  <head>\n", i = t.anyValue(e, E.dct("title"));
	i && (r += `    <title>${ac(i)}</title>\n`), r += "  </head>\n  <body>\n";
	let a = 0;
	function o(e) {
		for (; a < e; a++) r += "<ul>\n";
	}
	function s(e) {
		for (; a > e; a--) r += "</ul>\n";
	}
	return n.forEach((e) => {
		let n = t.anyJS(e, tc("indent")), i = t.anyJS(e, E.sioc("content"));
		if (!i) return;
		let a = ac(i);
		if (n < 0) {
			s(0);
			let e = n >= -3 ? 4 + n : 1;
			r += `\n<h${e}>${a}</h${e}>\n`;
		} else n > 0 ? (s(n), o(n), r += `<li>${a}</li>\n`) : (s(n), r += `<p>${a}</p>\n`);
	}), s(0), r += "  </body>\n</html>\n", r;
}
//#endregion
//#region src/chat/bookmarks.js
var sc = {
	icons: U,
	ns: E,
	media: Xi,
	pad: $s,
	style: P,
	utils: ge,
	widgets: Hr
}, cc = p("http://www.w3.org/2002/01/bookmark#"), lc = "noun_45961.svg", uc = F, dc = window.document || null;
function fc(e, t) {
	return new Promise(function(n, r) {
		A.updater.update(e, t, function(e, t, i) {
			t ? n() : r(Error(i));
		});
	});
}
async function pc(e) {
	let t = cc("Bookmark");
	if (await ri(e, t, !0), e.instances && e.instances.length > 0) e.bookmarkDocument = e.instances[0], e.instances.length > 1 && L("More than one bookmark file! " + e.instances);
	else if (e.publicProfile) {
		let n = _(e.publicProfile.dir().uri + "bookmarks.ttl");
		try {
			I("Creating new bookmark file " + n), await A.fetcher.createIfNotExists(n);
		} catch (t) {
			return L("Can't make fresh bookmark file:" + t), e;
		}
		await ee.registerInTypeIndex(n, e.index, t), e.bookmarkDocument = n;
	} else L("You seem to have no bookmark file, nor even a profile file!");
	return e;
}
async function mc(e, t) {
	let n = "", r = S.currentUser();
	if (!r) throw Error("Must be logged on to add Bookmark");
	n = uc(A.any(t, E.foaf("maker"))) + ": " + A.anyValue(t, E.sioc("content")).slice(0, 80);
	let i = e.bookmarkDocument, a = sc.widgets.newThing(i, n), s = [
		o(i, sc.ns.dct("references"), a, i),
		o(a, sc.ns.rdf("type"), cc("Bookmark"), i),
		o(a, sc.ns.dct("created"), /* @__PURE__ */ new Date(), i),
		o(a, cc("recalls"), t, i),
		o(a, sc.ns.foaf("maker"), r, i),
		o(a, sc.ns.dct("title"), n, i)
	];
	try {
		await fc([], s);
	} catch (e) {
		return L("Making bookmark: " + e), null;
	}
	return a;
}
async function hc(e, t, n) {
	await A.fetcher.load(e.bookmarkDocument);
	let r = A.each(null, cc("recalls"), t, e.bookmarkDocument);
	if (r.length) {
		if (!confirm("Delete bookmark on this?" + r.length)) return;
		for (let e = 0; e < r.length; e++) try {
			await fc(A.connectedStatements(r[e]), []), n.style.backgroundColor = "white", I("Bookmark deleted: " + r[e]);
		} catch (e) {
			R("Cant delete bookmark:" + e), L("Cannot delete bookmark:" + e);
		}
	} else {
		let r = await mc(e, t);
		n.style.backgroundColor = "yellow", I("Bookmark added: " + r);
	}
}
async function gc(e, t) {
	async function n(t) {
		await A.fetcher.load(e.bookmarkDocument);
		let n = A.any(null, cc("recalls"), t.target, e.bookmarkDocument);
		t.style = sc.style.buttonStyle, n && (t.style.backgroundColor = "yellow");
	}
	let r;
	if (e.bookmarkDocument) return r = sc.widgets.button(dc, sc.icons.iconBase + lc, uc(cc("Bookmark")), () => {
		hc(e, t, r);
	}), r.target = t, await n(r), r;
}
//#endregion
//#region src/chat/messageTools.js
var _c = window.document, vc = "noun_253504.svg", yc = "noun_1384132.svg", bc = "noun_1384135.svg", xc = "noun-reply-5506924.svg", Sc = {};
Sc[E.schema("AgreeAction")] = "👍", Sc[E.schema("DisagreeAction")] = "👎", Sc[E.schema("EndorseAction")] = "⭐️", Sc[E.schema("LikeAction")] = "❤️";
async function Cc(e, t) {
	let n = _c.createElement("span");
	async function r() {
		if (n.innerHTML = "", Ks(e)) return n;
		let r = (await Us(e)).map((e) => A.each(null, E.schema("target"), e, t)).flat();
		if (r.length === 0) return n;
		let i = r.map((e) => [
			A.any(e, E.rdf("type"), null, t),
			A.any(e, E.sioc("content"), null, t),
			A.any(e, E.schema("agent"), null, t)
		]);
		i.sort(), i.forEach((e) => {
			let [t, r, i] = e, a;
			i ? (a = _c.createElement("a"), a.setAttribute("href", i.uri)) : a = _c.createTextNode(""), a.textContent = r || Sc[t] || "⬜️", n.appendChild(a);
		});
	}
	return r().then(I("sentimentStripLinked: sentimentStripLinked async refreshed")), n.refresh = r, n;
}
async function wc(e, t, n, r) {
	async function i() {
		let i = A.any(e, E.foaf("maker"));
		if (!d) alert("You can't delete the message, you are not logged in.");
		else if (d.sameTerm(i)) {
			try {
				await r.deleteMessage(e);
			} catch (e) {
				let r = "Error deleting messaage " + e;
				L(r), alert(r), (n.statusArea || t.parentNode).appendChild(H(_c, r));
			}
			t.parentNode.removeChild(t);
		} else alert("You can't delete the message, you are not logged in as the author, " + i);
		l();
	}
	async function a(t) {
		d.value === A.any(e, E.foaf("maker")).value && (l(), await Nc(t, e, r, n));
	}
	async function s() {
		let t = await r.createThread(e), i = n.chatOptions;
		if (!i) throw Error("replyInThread: missing options");
		i.showThread(t, i), l();
	}
	let c = _c.createElement("div");
	if (await Gs(e).value === E.schema("dateDeleted").value) return c;
	function l() {
		c.parentElement.parentElement.removeChild(c.parentElement);
	}
	async function u(e) {
		await A.updater.update(A.connectedStatements(e), []);
	}
	let d = S.currentUser();
	d && A.holds(e, E.foaf("maker"), d) && (c.appendChild(Ht(_c, c, "message", i)), c.appendChild(G(_c, U.iconBase + vc, "edit", () => a(t)))), gc(n).then((e) => {
		e && c.appendChild(e);
	});
	function f(e, n, r, i, a, s) {
		function c() {
			l.style.backgroundColor = p ? "yellow" : "white";
		}
		let l = G(_c, r, F(i), async function(r) {
			if (p) await u(p), p = null, c();
			else {
				p = X(a);
				let r = [
					o(p, E.schema("agent"), e.me, a),
					o(p, E.rdf("type"), i, a),
					o(p, E.schema("target"), n, a)
				];
				if (await A.updater.update([], r), c(), s) {
					let e = !1;
					for (let t = 0; t < s.length; t++) {
						let n = d(s[t]);
						n && (await u(n), e = !0);
					}
					e && Zt(t);
				}
			}
		});
		function d(t) {
			let r = A.each(null, E.schema("agent"), e.me, a).filter((e) => A.holds(e, E.rdf("type"), t, a)).filter((e) => A.holds(e, E.schema("target"), n, a));
			return r.length ? r[0] : null;
		}
		function f() {
			p = d(i), c();
		}
		let p;
		return l.refresh = f, f(), l;
	}
	if (d = S.currentUser(), d && await Gs(e).value !== E.schema("dateDeleted").value) {
		let t = {
			me: d,
			dom: _c,
			div: c
		};
		c.appendChild(f(t, e, U.iconBase + yc, E.schema("AgreeAction"), e.doc(), [E.schema("DisagreeAction")])), c.appendChild(f(t, e, U.iconBase + bc, E.schema("DisagreeAction"), e.doc(), [E.schema("AgreeAction")]));
	}
	A.any(e, E.dct("created")) && c.appendChild(G(_c, U.iconBase + xc, "Reply in thread", async () => {
		await s();
	}));
	let p = c.appendChild(Ut(_c));
	return p.style.float = "right", p.firstChild.style.opacity = "0.3", p.addEventListener("click", l), c;
}
//#endregion
//#region src/chat/message.js
var $ = window.document, Tc = P.messageBodyStyle, Ec = F;
function Dc(e, t) {
	let n = $.createElement("img"), r = "10";
	t.inlineImageHeightEms && (r = ("" + t.inlineImageHeightEms).trim()), n.setAttribute("style", "max-height: " + r + "em; border-radius: 1em; margin: 0.7em;"), e && n.setAttribute("src", e);
	let i = $.createElement("a");
	return i.setAttribute("href", e), i.setAttribute("target", "images"), i.appendChild(n), rt(n, $rdf.sym(e)), i;
}
var Oc = function(e, t) {
	let n = $.createElement("a");
	return t && t.uri && (n.setAttribute("href", t.uri), n.addEventListener("click", $t, !0), n.setAttribute("style", "color: #3B5998; text-decoration: none; ")), n.textContent = e, n;
};
function kc(e) {
	let t = A.any(e, E.foaf("nick"));
	return t ? "" + t.value : "" + Ec(e);
}
function Ac(e, t, n, r) {
	let i = e.appendChild(Oc(kc(t), t));
	t.uri && A.fetcher.nowOrWhenFetched(t.doc(), void 0, function(e, n) {
		i.textContent = kc(t);
	}), e.appendChild($.createElement("br")), e.appendChild(Oc(n, r));
}
function jc(e, t, n, r) {
	let i = e.appendChild(Oc(Ec(t), t));
	t.uri && A.fetcher.nowOrWhenFetched(t.doc(), void 0, function(e, n) {
		i.textContent = kc(t);
	});
	let a = e.appendChild(Oc(n, r));
	a.style.fontSize = "80%", a.style.marginLeft = "1em", e.appendChild($.createElement("br"));
}
async function Mc(e, t, n, r, i) {
	let a = !1, o = r.colorizeByAuthor === "1" || r.colorizeByAuthor === !0, s = A.any(t, E.foaf("maker")), c = A.any(t, E.dct("created")), l = await Gs(t), u = A.any(l, E.foaf("maker")), d = s.uri === u?.uri ? l : t, f = A.any(d, E.sioc("content")), p = await Us(d);
	p.length > 1 && I("renderMessageRow versions: ", p.join(",  "));
	let m = p.map((e) => A.each(e, E.sioc("has_reply"))).flat(), h = null, g = [];
	for (let e of m) A.holds(e, E.rdf("type"), E.sioc("Thread")) ? (h = e, I("renderMessageRow: found thread: " + h)) : g.push(e);
	g.length > 1 && I("renderMessageRow: found normal replies: ", g), h ||= A.any(null, E.sioc("has_member"), t);
	let _ = A.any(d, $rdf.sym(`${xs}proofValue`)), v = Ss();
	v.id = d.uri, v.created = A.any(d, E.dct("created")).value, v.content = f.value, v.maker = s.uri, _?.value ? Rs(s).then((e) => {
		e || L("message is signed but " + s.uri + " is missing publicKey"), e?.match(/[0-9A-Fa-f]{6}/g) ? _?.value && !Ts(_?.value, v, e) && L("invalid signature\n" + v.id) : L("invalid publicKey hex string\n" + s.uri + "\n" + e);
	}) : (a = !0, L(d.uri + " is unsigned"));
	let y = await Ws(t), b = !t.sameTerm(y), x = A.the(y, E.dct("created"), null, y.doc()) || A.the(t, E.dct("created"), null, t.doc()), S = $.createElement("tr");
	a && S.setAttribute("style", "background-color: red"), S.AJAR_date = x.value, S.AJAR_subject = t;
	let C = $.createElement("td");
	if (S.appendChild(C), r.authorDateOnLeft) Ac(C, s, Ot(x.value), t);
	else {
		let e = $.createElement("img");
		e.setAttribute("style", "max-height: 2.5em; max-width: 2.5em; border-radius: 0.5em; margin: auto;"), zt(e, s), C.appendChild(e);
	}
	let w = Ot(x.value);
	b && (w += " ... " + Ot(c.value));
	let T = S.appendChild($.createElement("td"));
	r.authorDateOnLeft || jc(T, s, w, t);
	let D = f ? f.value.trim() : "??? no content?", O = /^https?:\/[^ <>]*$/i.test(D), k = null;
	if (O) if (/\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(D) && r.expandImagesInline) {
		let e = Dc(D, r);
		T.appendChild(e);
	} else {
		let e = T.appendChild($.createElement("a"));
		k = e.appendChild($.createElement("p")), e.href = D, k.textContent = D, T.appendChild(e);
	}
	else k = $.createElement("p"), T.appendChild(k), k.textContent = D;
	if (k) {
		let e = o ? nc(s) : ee(n);
		k.setAttribute("style", Tc + "background-color: " + e + ";");
	}
	function ee(e) {
		return e ? "#e8ffe8" : "white";
	}
	let te = await Cc(t, t.doc());
	te.children.length && (T.appendChild($.createElement("br")), T.appendChild(te));
	let ne = $.createElement("td");
	S.appendChild(ne);
	let j = G($, U.iconBase + "noun_243787.svg", "...");
	return ne.appendChild(j), j.addEventListener("click", async function(n) {
		if (S.toolTR) {
			S.parentNode.removeChild(S.toolTR), delete S.toolTR;
			return;
		}
		let a = $.createElement("tr"), o = await wc(t, S, {
			...i,
			chatOptions: r
		}, e);
		o.style = "border: 0.05em solid #888; border-radius: 0 0 0.7em 0.7em;  border-top: 0; height:3.5em; background-color: #fff;", S.nextSibling ? S.parentElement.insertBefore(a, S.nextSibling) : S.parentElement.appendChild(a), S.toolTR = a, a.appendChild($.createElement("td"));
		let s = a.appendChild($.createElement("td"));
		a.appendChild($.createElement("td")), s.appendChild(o);
	}), h && r.showThread && ne.appendChild(G($, U.iconBase + "noun_1180164.svg", "see thread", (e) => {
		r.showThread(h, r);
	})), S;
}
async function Nc(e, t, n, r) {
	let i = e.parentNode, a = Pc(n, i, r, n.options, await Gs(t));
	i.insertBefore(a, e), a.originalRow = e, e.style.visibility = "hidden";
}
function Pc(e, t, n, r, i) {
	function a(e) {
		e.originalRow.style.visibility = "visible", e.parentNode.removeChild(e);
	}
	async function o(e) {
		await s(_.value, !0);
	}
	async function s(a, o) {
		async function s(a, s) {
			if (await Ic(e, t, a, !1, r, n), i) {
				let e = p.originalRow;
				e.parentNode ? e.parentNode.removeChild(e) : (L("No parentNode on old message " + e.textContent), e.style.backgroundColor = "#fee", e.style.visibility = "hidden"), p.parentNode.removeChild(p);
			} else o && (_.value = "", _.setAttribute("style", Tc), _.disabled = !1, _.scrollIntoView(r.newestFirst), _.focus(), _.select());
		}
		o && (_.setAttribute("style", Tc + "color: #bbb;"), _.disabled = !0);
		let c;
		try {
			c = await e.updateMessage(a, i, null, r.thread);
		} catch (e) {
			(n.statusArea || p).appendChild(H($, "Error writing message: " + e));
			return;
		}
		await s(c, a);
	}
	function c(e) {
		let n = t.chatDocument.dir().uri;
		it(A.fetcher, e, n + "Files", n + "Pictures", async function(e, t) {
			await s(t);
		});
	}
	let l = async function(e) {
		for (let t of e) await s(t);
	};
	function u() {
		function t() {
			return y = $rdf.sym(d.dir().uri + "Image_" + Date.now() + ".png"), y;
		}
		async function n(e) {
			e && await s(e.uri);
		}
		if (r.menuHandler) {
			let e = G($, U.iconBase + "noun_243787.svg", "More");
			e.setAttribute("style", P.buttonStyle + "float: right;"), g.appendChild(e);
		}
		r.menuHandler;
		let u = S.currentUser();
		if (Ac(m, u, "", null), _ = $.createElement("textarea"), h.innerHTML = "", h.appendChild(_), _.rows = 3, i && (_.value = A.anyValue(i, E.sioc("content"), null, i.doc())), _.setAttribute("style", Tc + "background-color: #eef;"), _.addEventListener("keydown", async function(e) {
			e.code === "Enter" && (!e.shiftKey && !r.shiftEnterSendsMessage || e.shiftKey && r.shiftEnterSendsMessage) && await o(e);
		}, !1), nt(_, l, c), g.innerHTML = "", v = G($, f, "Send"), v.style.float = "right", v.addEventListener("click", (e) => o(), !1), g.appendChild(v), i) {
			let e = g.appendChild(Ut($));
			e.style.float = "left", e.addEventListener("click", (e) => a(p), !1), g.appendChild(e);
		}
		let d = e.dateFolder.leafDocumentFromDate(/* @__PURE__ */ new Date()), y;
		h.appendChild(Xi.cameraButton($, A, t, n)), Zs(e.channel, e.channel.doc());
	}
	let d, f;
	i ? (d = A.anyValue(i, E.dct("created"), null, i.doc()), f = U.iconBase + "noun_1180158.svg") : (f = U.iconBase + "noun_383448.svg", d = "9999-01-01T00:00:00Z");
	let p = $.createElement("tr"), m = $.createElement("td"), h = $.createElement("td"), g = $.createElement("td");
	p.appendChild(m), p.appendChild(h), p.appendChild(g), p.AJAR_date = d;
	let _, v;
	return ei({
		div: h,
		dom: $
	}).then((e) => {
		u(), Object.assign(e, n), pc(e).then((e) => {});
	}), p;
}
//#endregion
//#region src/chat/infinite.js
function Fc(e) {
	"Notification" in window ? Notification.permission === "granted" ? new Notification(e) : Notification.permission !== "denied" && Notification.requestPermission().then(function(t) {
		t === "granted" && new Notification(e);
	}) : L("This browser does no t support desktop notification");
}
async function Ic(e, t, n, r, i, a) {
	let o = await Mc(e, n, r, i, a);
	i.selectedMessage && i.selectedMessage.sameTerm(n) && (o.style.backgroundColor = "yellow", i.selectedElement = o, t.selectedElement = o);
	let s = !1;
	for (let e = t.firstChild; e; e = e.nextSibling) {
		let n = i.newestfirst === !0, r = o.AJAR_date;
		if (r > e.AJAR_date && n || r < e.AJAR_date && !n) {
			t.insertBefore(o, e), s = !0;
			break;
		}
	}
	s || t.appendChild(o);
}
async function Lc(e, t, n, r) {
	async function i(e, t) {
		let n = {}, r, i;
		for (r = t.firstChild; r; r = r.nextSibling) r.AJAR_subject && (n[r.AJAR_subject.uri] = !0);
		let o = A.each(e, E.wf("message"), null, t.chatDocument), s = {};
		for (let e of o) s[e.uri] = !0, n[e.uri] || await a(e, t);
		for (r = t.firstChild; r;) i = r.nextSibling, r.AJAR_subject && !s[r.AJAR_subject.uri] && t.removeChild(r), r = i;
		for (r = t.firstChild; r; r = r.nextSibling) r.AJAR_subject && Zt(r);
	}
	async function a(e, t) {
		if (Ks(e) && !r.showDeletedMessages) return;
		let n = A.any(null, E.sioc("has_member"), e, e.doc()), i = A.any(e, E.sioc("id"), null, e.doc());
		if (i && !n && (n = A.any(null, E.sioc("has_member"), i, e.doc())), r.thread) {
			if (!A.holds(e, E.sioc("has_reply"), r.thread) && !(n && n.sameTerm(r.thread))) return;
		} else if (n) return;
		t.fresh || await Ic(h, t, e, t.fresh, r, y);
	}
	async function s(e) {
		let t = e ? S : C, n = t.messageTable.date;
		if (e && S.limit && n <= S.limit) return b || await d(), !0;
		if (n = await g.loadPrevious(n, e), !n && !e && !b && await d(), !n) return !0;
		let r = !1;
		if (!e) {
			let e = g.leafDocumentFromDate(/* @__PURE__ */ new Date());
			r = g.leafDocumentFromDate(n).sameTerm(e);
		}
		let i = await c(n, r);
		return t.messageTable = i, (e ? m : !m) ? _.appendChild(i) : _.insertBefore(i, _.firstChild), r;
	}
	async function c(t, n) {
		let r = g.leafDocumentFromDate(t);
		try {
			await A.fetcher.createIfNotExists(r);
		} catch (i) {
			let a = e.createElement("table").appendChild(e.createElement("tr"));
			return i.response && i.response.status && i.response.status === 404 ? await l(t, n) : (I("*** Error NON 404 for chat file " + r), a.appendChild(H(e, i, "pink")), a);
		}
		return await l(t, n);
	}
	async function l(t, n) {
		async function i() {
			let e = await s(!0);
			return e ? c.initial = !0 : c.extendedBack = !0, e;
		}
		async function o() {
			return await s(!1);
		}
		let c = e.createElement("table");
		c.style.width = "100%", c.extendBackwards = i, c.extendForwards = o, c.date = t;
		let l = g.leafDocumentFromDate(t);
		if (c.chatDocument = l, c.fresh = !1, c.setAttribute("style", "width: 100%;"), n) {
			c.final = !0, b = c, C.messageTable = c;
			let e = Pc(h, c, y, r);
			m ? c.insertBefore(e, c.firstChild) : c.appendChild(e), c.inputRow = e;
		}
		{
			let n = e.createElement("tr"), i = n.appendChild(e.createElement("td"));
			i.style = "text-align: center; vertical-align: middle; color: #888; font-style: italic;", i.textContent = Ot(t.toISOString(), !0);
			let a = n.appendChild(e.createElement("td"));
			r.includeRemoveButton && a.appendChild(Ut(e, (e) => {
				_.parentNode.removeChild(_);
			})), c.extendedForwards = !1, m ? c.appendChild(n) : c.insertBefore(n, c.firstChild);
		}
		let u = A.statementsMatching(null, E.wf("message"), null, l);
		!n && u.length;
		for (let e of u) await a(e.object, c);
		return c.fresh = !0, c;
	}
	async function u() {
		let e = g.leafDocumentFromDate(/* @__PURE__ */ new Date());
		if (!e.sameTerm(C.messageTable.chatDocument)) {
			b.inputRow && (b.removeChild(b.inputRow), delete b.inputRow);
			let t = C.messageTable.chatDocument;
			if (await d(), !A.holds(t, E.rdfs("seeAlso"), e, t)) {
				let n = [o(t, E.rdfs("seeAlso"), e, t)];
				try {
					A.updater.update([], n);
				} catch (e) {
					alert("Unable to link old chat file to new one:" + e);
				}
			}
		}
	}
	async function d() {
		let e = /* @__PURE__ */ new Date(), t = g.leafDocumentFromDate(e), r = await c(e, !0);
		return _.appendChild(r), _.refresh = async function() {
			await u(/* @__PURE__ */ new Date()), await i(n, r), Fc(n);
		}, A.updater.addDownstreamChangeListener(t, _.refresh), b = r, C.messageTable = b, r;
	}
	async function f(e, t) {
		if (w) return;
		w = !0;
		let n = !t, i;
		for (; _.scrollTop < 150 && S.messageTable && !S.messageTable.initial && S.messageTable.extendBackwards;) {
			if (_.scrollHeight === 0) {
				setTimeout(f, 2e3), w = !1;
				return;
			}
			let e = _.scrollHeight - _.scrollTop;
			if (i = await S.messageTable.extendBackwards(), n && (_.scrollTop = _.scrollHeight - e), t && t(), i) break;
		}
		for (; r.selectedMessage && _.scrollHeight - _.scrollTop - _.clientHeight < 150 && C.messageTable && !C.messageTable.final && C.messageTable.extendForwards;) {
			let e = _.scrollTop;
			if (i = await C.messageTable.extendForwards(), n && (_.scrollTop = e), t && t(), i) break;
		}
		w = !1;
	}
	async function p() {
		function e() {
			s && s.selectedElement && s.selectedElement.scrollIntoView({ block: "center" });
		}
		function t() {
			r.selectedElement ? r.selectedElement.scrollIntoView({ block: "center" }) : b.inputRow.scrollIntoView && b.inputRow.scrollIntoView(m);
		}
		let n, i, a;
		r.selectedMessage && (i = r.selectedMessage.doc()), x && (a = x.doc());
		let o = i || a;
		if (o) {
			let e = /* @__PURE__ */ new Date();
			n = g.leafDocumentFromDate(e).sameTerm(o);
		}
		let s;
		o && !n ? (s = await c(g.dateFromLeafDocument(o), n), _.appendChild(s), S.messageTable = s, C.messageTable = s, e(), setTimeout(e, 1e3)) : (await d(), S.messageTable = b, C.messageTable = b), await f(null, t), _.addEventListener("scroll", f), r.solo && document.body.addEventListener("scroll", f);
	}
	r ||= {}, r.authorDateOnLeft = !1;
	let m = r.newestFirst === "1" || r.newestFirst === !0, h = new Hs(n, r), g = h.dateFolder, _ = e.createElement("div");
	h.div = _;
	let v = _.appendChild(e.createElement("div")), y = {
		dom: e,
		statusArea: v,
		div: v
	}, b, x, S = { messageTable: null }, C = { messageTable: null };
	if (r.thread) {
		let e = r.thread;
		if (x = A.any(null, E.sioc("has_reply"), e, e.doc()), x) {
			let e = A.any(x, E.dct("created"), null, x.doc());
			e && (S.limit = new Date(e.value));
		}
	}
	let w = !1;
	return await p(), _;
}
//#endregion
//#region src/lib/preferences.js
var Rc = /* @__PURE__ */ r({
	get: () => Vc,
	getPreferencesForClass: () => qc,
	recordPersonalDefaults: () => Wc,
	recordSharedPreferences: () => Uc,
	renderPreferencesForm: () => Gc,
	set: () => Hc,
	value: () => Bc
}), zc = A, Bc = [];
function Vc(e) {
	return Bc[e];
}
function Hc(e, t) {
	if (typeof t != "string") throw I("Non-string value of preference " + e + ": " + t), Error("Non-string value of preference " + e + ": " + t);
	this.value[e] = t;
}
function Uc(e, t) {
	return new Promise(function(n, r) {
		let i = zc.any(e, E.ui("sharedPreferences"));
		if (i) t.sharedPreferences = i, n(t);
		else {
			zc.updater.editable(e.doc()) || (I(` Cant make shared preferences, may not change ${e.doc}`), n(t));
			let i = _(e.doc().uri + "#SharedPreferences"), a = [o(e, E.ui("sharedPreferences"), i, e.doc())];
			I("Creating shared preferences " + i), zc.updater.update([], a, function(e, a, o) {
				a ? (t.sharedPreferences = i, n(t)) : r(/* @__PURE__ */ Error("Error creating shared prefs: " + o));
			});
		}
	});
}
function Wc(e, t) {
	return new Promise(function(n, r) {
		ti(t).then((t) => {
			if (!t.preferencesFile) {
				I("Not doing private class preferences as no access to preferences file. " + t.preferencesFileError);
				return;
			}
			let i = zc.each(null, E.solid("forClass"), e, t.preferencesFile), a = [], s, c;
			if (i.length) if (i.forEach((e) => {
				s ||= zc.any(e, E.solid("personalDefaults"));
			}), s) {
				t.personalDefaults = s, n(t);
				return;
			} else s = X(t.preferencesFile), c = i[0];
			else c = X(t.preferencesFile), a = [o(c, E.rdf("type"), E.solid("TypeRegistration"), t.preferencesFile), o(c, E.solid("forClass"), e, t.preferencesFile)];
			s = X(t.preferencesFile), a.push(o(c, E.solid("personalDefaults"), s, t.preferencesFile)), zc.updater.update([], a, function(i, a, o) {
				a ? (t.personalDefaults = s, n(t)) : r(/* @__PURE__ */ Error("Setting preferences for " + e + ": " + o));
			});
		}, (e) => {
			r(e);
		});
	});
}
function Gc(e, t, n, r) {
	let i = r.dom.createElement("div");
	return Xs(e, e.doc(), r.me).then((a) => {
		let o = r.dom;
		function s(e) {
			i.appendChild(o.createElement("h5")).textContent = e;
		}
		s("My view of this " + r.noun), Tr(o, i, {}, a, n, e.doc(), (e, t) => {
			e || Tt(r, t);
		}), s("Everyone's  view of this " + r.noun), Uc(e, r).then((r) => {
			let a = r.sharedPreferences;
			Tr(o, i, {}, a, n, e.doc(), (e, t) => {
				e || Tt(r, t);
			}), s("My default view of any " + r.noun), Wc(t, r).then((e) => {
				Tr(o, i, {}, e.personalDefaults, n, e.preferencesFile, (t, n) => {
					t || Tt(e, n);
				});
			}, (e) => {
				Tt(r, e);
			});
		});
	}, (e) => {
		i.appendChild(H(r.dom, e));
	}), i;
}
function Kc(e) {
	return e.datatype ? e.datatype.equals(E.xsd("boolean")) ? e.value === "1" : e.datatype.equals(E.xsd("dateTime")) || e.datatype.equals(E.xsd("date")) ? new Date(e.value) : e.datatype.equals(E.xsd("integer")) || e.datatype.equals(E.xsd("float")) || e.datatype.equals(E.xsd("decimal")) ? Number(e.value) : e.value : e;
}
function qc(e, t, n, r) {
	return new Promise(function(i, a) {
		Uc(e, r).then((r) => {
			let o = r.sharedPreferences;
			if (r.me) Xs(e, e.doc(), r.me).then((e) => {
				Wc(t, r).then((t) => {
					let r = [], a = t.personalDefaults;
					n.forEach((t) => {
						let n = zc.any(e, t) || zc.any(o, t) || zc.any(a, t);
						n && (r[t.uri] = Kc(n));
					}), i(r);
				}, a);
			}, a);
			else {
				let e = [];
				n.forEach((t) => {
					let n = zc.any(o, t);
					n && (e[t.uri] = Kc(n));
				}), i(e);
			}
		});
	});
}
//#endregion
//#region src/lib/table.js
var Jc = {
	icons: U,
	log: _e,
	ns: E,
	utils: ge,
	widgets: Hr
};
function Yc(e, t) {
	let n = t.sourceDocument, r = t.tableClass, i = t.query, a = Jc.ns, o = A, s = {}, c = {
		"http://www.w3.org/2002/07/owl#sameAs": !0,
		"http://www.w3.org/1999/02/22-rdf-syntax-ns#type": !0
	}, l = {
		"http://www.w3.org/2001/XMLSchema#decimal": !0,
		"http://www.w3.org/2001/XMLSchema#float": !0,
		"http://www.w3.org/2001/XMLSchema#double": !0,
		"http://www.w3.org/2001/XMLSchema#integer": !0,
		"http://www.w3.org/2001/XMLSchema#nonNegativeInteger": !0,
		"http://www.w3.org/2001/XMLSchema#positiveInteger": !0,
		"http://www.w3.org/2001/XMLSchema#nonPositiveInteger": !0,
		"http://www.w3.org/2001/XMLSchema#negativeInteger": !0,
		"http://www.w3.org/2001/XMLSchema#long": !0,
		"http://www.w3.org/2001/XMLSchema#int": !0,
		"http://www.w3.org/2001/XMLSchema#short": !0,
		"http://www.w3.org/2001/XMLSchema#byte": !0,
		"http://www.w3.org/2001/XMLSchema#unsignedLong": !0,
		"http://www.w3.org/2001/XMLSchema#unsignedInt": !0,
		"http://www.w3.org/2001/XMLSchema#unsignedShort": !0,
		"http://www.w3.org/2001/XMLSchema#unsignedByte": !0
	}, u = {
		"http://www.w3.org/2001/XMLSchema#dateTime": !0,
		"http://www.w3.org/2001/XMLSchema#date": !0
	}, d = {
		"http://xmlns.com/foaf/0.1/Image": !0,
		"http://purl.org/dc/terms/Image": !0
	}, f = t.keyVariable || "?_row", p = 0, m, h, g, _, v = null, y = null, b = e.createElement("div");
	b.className = "tableViewPane", b.appendChild(C());
	let x = e.createElement("div");
	b.appendChild(x), b.refresh = function() {
		Me(S.query, S.logicalRows, S.columns, S);
	};
	let S;
	if (i) S = Fe(i), x.appendChild(S);
	else {
		let e = M();
		m = e[0], h = e[1], r || g.appendChild(ae(m, h)), y = Ie(h), O(y || m);
	}
	return b;
	function C() {
		let t = e.createElement("table");
		t.setAttribute("class", "toolbar");
		let n = e.createElement("tr");
		return g = e.createElement("td"), n.appendChild(g), _ = e.createElement("td"), n.appendChild(_), t.appendChild(n), t;
	}
	function w(e, t) {
		let n = t.getColumns();
		for (let t = 0; t < n.length; ++t) {
			let r = o.variable("_col" + t);
			e.vars.push(r), n[t].setVariable(r);
		}
	}
	function T(e, t, n) {
		let r = n.type;
		r ||= o.variable("_any"), e.pat.add(t, Jc.ns.rdf("type"), r);
	}
	function E(e, t, n) {
		let r = n.getColumns();
		for (let n = 0; n < r.length; ++n) {
			let i = r[n], a = o.formula();
			a.add(t, i.predicate, i.getVariable()), e.pat.optional.push(a);
		}
	}
	function D(e) {
		let t = new k(), n = o.variable(f.slice(1));
		return w(t, e), T(t, n, e), E(t, n, e), t;
	}
	function O(e) {
		te(_), _.appendChild(se(e)), ee(D(e), e);
	}
	function ee(e, t) {
		v && (v.running = !1);
		let n = Fe(e, t);
		te(x), x.appendChild(n), v = e;
	}
	function te(e) {
		for (; e.childNodes.length > 0;) e.removeChild(e.childNodes[0]);
	}
	function ne(e) {
		this.type = e, this.columns = null, this.allColumns = [], this.useCount = 0, this.getAllColumns = function() {
			return this.allColumns;
		}, this.getColumns = function() {
			if (!this.columns) {
				let e = this.getAllColumns();
				this.columns = e.slice(0, 7);
			}
			return this.columns;
		}, this.getUnusedColumns = function() {
			let e = this.getAllColumns(), t = this.getColumns(), n = [];
			for (let r = 0; r < e.length; ++r) t.indexOf(e[r]) === -1 && n.push(e[r]);
			return n;
		}, this.addColumn = function(e) {
			this.columns.push(e);
		}, this.removeColumn = function(e) {
			this.columns = this.columns.filter(function(t) {
				return t !== e;
			});
		}, this.getLabel = function() {
			return F(this.type);
		}, this.addUse = function() {
			this.useCount += 1;
		};
	}
	function j() {
		this.useCount = 0, this.checkedAnyValues = !1, this.possiblyLiteral = !0, this.possiblyNumber = !0, this.constraints = [], this.checkValue = function(e) {
			let t = e.termType;
			this.possiblyLiteral && t !== "Literal" && t !== "NamedNode" ? (this.possiblyNumber = !1, this.possiblyLiteral = !1) : this.possiblyNumber && (t === "Literal" && e.value.match(/^-?\d+(\.\d*)?$/) || (this.possiblyNumber = !1)), this.checkedAnyValues = !0;
		}, this.getVariable = function() {
			return this.variable;
		}, this.setVariable = function(e) {
			this.variable = e;
		}, this.getKey = function() {
			return this.variable.toString();
		}, this.addUse = function() {
			this.useCount += 1;
		}, this.getHints = function() {
			return t && t.hints && this.variable && t.hints[this.variable.toNT()] ? t.hints[this.variable.toNT()] : {};
		}, this.getLabel = function() {
			return this.getHints().label ? this.getHints().label : this.predicate ? this.predicate.sameTerm(a.rdf("type")) && this.superClass ? F(this.superClass, !0) : F(this.predicate) : this.variable ? this.variable.toString() : "unlabeled column?";
		}, this.setPredicate = function(e, t, n) {
			t ? (this.inverse = e, this.constraints = this.constraints.concat(o.each(e, Jc.ns.rdfs("domain"))), e.sameTerm(a.rdfs("subClassOf")) && n.termType === "NamedNode" && (this.superClass = n, this.alternatives = o.each(void 0, a.rdfs("subClassOf"), n))) : (this.predicate = e, this.constraints = this.constraints.concat(o.each(e, Jc.ns.rdfs("range"))));
		}, this.getConstraints = function() {
			return this.constraints;
		}, this.filterFunction = function() {
			return !0;
		}, this.sortKey = function() {
			return this.getLabel().toLowerCase();
		}, this.isImageColumn = function() {
			for (let e = 0; e < this.constraints.length; e++) if (this.constraints[e].uri in d) return !0;
			return !1;
		};
	}
	function re(e, t) {
		let n = [];
		for (let r in e) {
			let i = e[r];
			(!t || t(r, i)) && n.push(i);
		}
		return n;
	}
	function ie(t, n) {
		let r = e.createElement("option");
		return r.setAttribute("value", n), r.appendChild(e.createTextNode(t)), r;
	}
	function ae(t, n) {
		let r = e.createElement("div");
		r.appendChild(e.createTextNode("Select type: "));
		let i = e.createElement("select");
		i.appendChild(ie("All types", "null"));
		for (let e in n) i.appendChild(ie(n[e].getLabel(), e));
		return i.addEventListener("click", function() {
			let e;
			e = i.value === "null" ? t : n[i.value], oe(e);
		}, !1), r.appendChild(i), r;
	}
	function oe(e) {
		O(e);
	}
	function se(t) {
		let n = e.createElement("div"), r = t.getUnusedColumns();
		if (r.sort(function(e, t) {
			let n = e.sortKey(), r = t.sortKey();
			return (n > r) - (n < r);
		}), r.length > 0) {
			n.appendChild(e.createTextNode("Add column: "));
			let i = e.createElement("select");
			i.appendChild(ie("", "-1"));
			for (let e = 0; e < r.length; ++e) {
				let t = r[e];
				i.appendChild(ie(t.getLabel(), "" + e));
			}
			n.appendChild(i), i.addEventListener("click", function() {
				let e = Number(i.value);
				e >= 0 && (t.addColumn(r[e]), O(t));
			}, !1);
		}
		return n;
	}
	function ce(e, t) {
		for (let n in e) {
			let r = e[n];
			if (r.variable.toNT() === t) return r;
		}
		throw Error(`getColumnForVariable: no column for variable ${t}`);
	}
	function le(e, t) {
		let n;
		return t.uri in e ? n = e[t.uri] : (n = new j(), n.setPredicate(t), e[t.uri] = n), n;
	}
	function ue(e, t) {
		let n;
		return t.uri in e ? n = e[t.uri] : (n = new ne(t), e[t.uri] = n), n;
	}
	function de() {
		let e = {}, t = o.statementsMatching(void 0, Jc.ns.rdf("type"), r, n), i = {};
		for (let n = 0; n < t.length; ++n) {
			let r = t[n].object;
			if (r.termType !== "NamedNode") continue;
			let a = ue(e, r);
			r.uri in i || (i[r.uri] = []), i[r.uri].push(t[n].subject), a.addUse();
		}
		return [i, e];
	}
	function pe(e, t) {
		let r = o.statementsMatching(e, void 0, void 0, n), i = {};
		for (let e = 0; e < r.length; ++e) {
			let n = r[e].predicate;
			if (n.uri in c) continue;
			let a = le(t, n);
			a.checkValue(r[e].object), i[n.uri] = a;
		}
		return i;
	}
	function me(e, t) {
		let n = {};
		for (let e = 0; e < t.length; ++e) {
			let r = pe(t[e], n);
			for (let e in r) r[e].addUse();
		}
		let r = re(n);
		he(r), e.allColumns = r;
	}
	function M() {
		let e, t, n = de();
		e = n[0], t = n[1];
		for (let n in e) {
			let r = e[n], i = t[n];
			me(i, r);
		}
		return [new ne(null), re(t)];
	}
	function he(e) {
		function t(e, t) {
			return (e.useCount < t.useCount) - (e.useCount > t.useCount);
		}
		e.sort(t);
	}
	function ge(t, n) {
		let r = e.createElement("a");
		return r.appendChild(e.createTextNode("[x]")), r.addEventListener("click", function() {
			t.removeColumn(n), O(t);
		}, !1), r;
	}
	function _e(t, n) {
		let r = e.createElement("tr"), i = e.createElement("th");
		r.appendChild(i);
		for (let i = 0; i < t.length; ++i) {
			let a = e.createElement("th"), o = t[i];
			a.appendChild(e.createTextNode(o.getLabel())), n && a.appendChild(ge(n, o)), r.appendChild(a);
		}
		return r;
	}
	function N(e, t, n, r) {
		let i = t.getKey();
		if (e.sort(function(e, t) {
			let a = null, o = null;
			i in e.values && (a = e.values[i][0]), i in t.values && (o = t.values[i][0]);
			let s = n(a, o);
			return r ? -s : s;
		}), e.length) {
			let t = e[0]._htmlRow.parentNode;
			for (let n = 0; n < e.length; ++n) t.removeChild(e[n]._htmlRow);
			for (let n = 0; n < e.length; ++n) t.appendChild(e[n]._htmlRow);
		}
	}
	function ve(e, t) {
		let n = !0;
		for (let r = 0; r < t.length; ++r) {
			let i = t[r], a = i.getKey(), o = null;
			if (a in e.values && (o = e.values[a][0]), !i.filterFunction(o)) {
				n = !1;
				break;
			}
		}
		let r = e._htmlRow;
		n ? r.style.display = "" : r.style.display = "none";
	}
	function ye(e, t) {
		for (let n = 0; n < e.length; ++n) {
			let r = e[n];
			ve(r, t);
		}
	}
	function be(e, t, n) {
		function r(e) {
			return e ? e.termType === "Literal" ? e.value.toLowerCase() : e.termType === "NamedNode" ? F(e).toLowerCase() : e.value.toLowerCase() : "";
		}
		function i(e, t) {
			let n = r(e), i = r(t);
			return n < i ? -1 : +(n > i);
		}
		N(e, t, i, n);
	}
	function xe(t, n, r) {
		let i = e.createElement("div"), a = e.createElement("input");
		a.setAttribute("type", "text"), a.style.width = "70%", i.appendChild(a);
		let o = e.createElement("span");
		o.appendChild(e.createTextNode("▼")), o.addEventListener("click", function() {
			be(t, r, !1);
		}, !1), i.appendChild(o);
		let s = e.createElement("span");
		s.appendChild(e.createTextNode("▲")), s.addEventListener("click", function() {
			be(t, r, !0);
		}, !1), i.appendChild(s);
		let c = null;
		return r.filterFunction = function(e) {
			if (!c) return !0;
			if (e) {
				let t;
				return t = e.termType === "Literal" ? e.value : e.termType === "NamedNode" ? F(e) : "", t.toLowerCase().indexOf(c) >= 0;
			} else return !1;
		}, a.addEventListener("keyup", function() {
			c = a.value === "" ? null : a.value.toLowerCase(), ye(t, n);
		}, !1), i;
	}
	function P(t, n, r, i) {
		let a = e.createElement("div"), o = e.createElement("select"), s = {};
		for (let e = 0; e < i.length; ++e) {
			let t = i[e];
			s[t.uri] = !0;
		}
		let c = Ee(r).initialSelection;
		c && (s = c), o.setAttribute("multiple", "true");
		for (let e = 0; e < i.length; ++e) {
			let t = i[e], n = ie(F(t), e);
			s[t.uri] && (n.selected = !0), o.appendChild(n);
		}
		return a.appendChild(o), r.filterFunction = function(e) {
			return !s || e && s[e.uri];
		}, o.addEventListener("click", function() {
			{
				s = {};
				let e = o.options;
				for (let t = 0; t < e.length; t++) {
					let n = e[t], r = Number(n.value);
					e[t].selected && (s[i[r].uri] = !0);
				}
			}
			ye(t, n);
		}, !0), a;
	}
	function L(t, n, r) {
		let i = e.createElement("div"), a = e.createElement("input");
		a.setAttribute("type", "text"), a.style.width = "40px", i.appendChild(a);
		let o = e.createElement("input");
		o.setAttribute("type", "text"), o.style.width = "40px", i.appendChild(o);
		let s = null, c = null;
		r.filterFunction = function(e) {
			return e &&= Number(e), !(s && (!e || e < s) || c && (!e || e > c));
		};
		function l() {
			s = a.value === "" ? null : Number(a.value), c = o.value === "" ? null : Number(o.value), ye(t, n);
		}
		return a.addEventListener("keyup", l, !1), o.addEventListener("keyup", l, !1), i;
	}
	function R(e, t, n) {
		return n.checkedAnyValues && n.possiblyNumber ? L(e, t, n) : n.possiblyLiteral ? xe(e, t, n) : null;
	}
	function Se(e, t, n) {
		if (n.superClass && n.alternatives.length > 0) return P(e, t, n, n.alternatives);
		let r = n.getConstraints(), i;
		for (let a = 0; a < r.length; a++) {
			if (i = r[a], n.checkedAnyValues && n.possiblyNumber || i.uri in l) return L(e, t, n);
			if (i.uri === "http://www.w3.org/2000/01/rdf-schema#Literal") return xe(e, t, n);
			let s = o.each(i, Jc.ns.owl("oneOf"));
			if (s.length > 0) return P(e, t, n, s.elements);
		}
		return R(e, t, n);
	}
	function z(t, n) {
		let r = e.createElement("tr");
		r.className = "selectors", r.appendChild(e.createElement("td"));
		for (let i = 0; i < n.length; ++i) {
			let a = e.createElement("td"), o = Se(t, n, n[i]);
			o && a.appendChild(o), r.appendChild(a);
		}
		return r;
	}
	function Ce(t, n, r) {
		r ||= {};
		let i = e.createElement("a"), a = r.linkFunction;
		return i.setAttribute("href", t), i.appendChild(e.createTextNode(n)), a ? i.addEventListener("click", function(e) {
			e.preventDefault(), e.stopPropagation();
			let t = fe(e).getAttribute("href");
			t || I("No href found \n"), a(t);
		}, !0) : i.addEventListener("click", Jc.widgets.openHrefInOutlineMode, !0), i;
	}
	function we(e, t) {
		let n = !1;
		return e.uri && (n = e.uri.match(/^mailto:(.*)/)), n ? Ce(e.uri, n[1], t) : Ce(e.uri, F(e), t);
	}
	function Te(t) {
		let n = e.createElement("img");
		return n.setAttribute("src", t.uri), n.style.height = "40px", n;
	}
	function Ee(e) {
		return t && t.hints && e.variable && t.hints[e.variable.toNT()] ? t.hints[e.variable.toNT()] : {};
	}
	function De(t, n) {
		let r = Ee(n), i = r.cellFormat;
		if (i) switch (i) {
			case "shortDate": return e.createTextNode(Jc.widgets.shortDate(t.value));
			default:
		}
		else if (t.termType === "Literal") {
			if (t.datatype) {
				if (u[t.datatype.uri]) return e.createTextNode(Jc.widgets.shortDate(t.value));
				if (l[t.datatype.uri]) {
					let n = e.createElement("span");
					return n.textContent = t.value, n.setAttribute("style", "text-align: right"), n;
				}
			}
			return e.createTextNode(t.value);
		} else if (t.termType === "NamedNode" && n.isImageColumn()) return Te(t);
		else if (t.termType === "NamedNode" || t.termType === "BlankNode") return we(t, r);
		else if (t.termType === "Collection") {
			let r = e.createElement("span");
			return r.appendChild(e.createTextNode("[")), t.elements.forEach(function(t) {
				r.appendChild(De(t, n)), r.appendChild(e.createTextNode(", "));
			}), r.removeChild(r.lastChild), r.appendChild(e.createTextNode("]")), r;
		} else return e.createTextNode("unknown termtype '" + t.termType + "'!");
	}
	function Oe(t, n, r, i) {
		let a = e.createElement("td");
		n._subject && "uri" in n._subject && a.appendChild(Ce(n._subject.uri, "→")), t.appendChild(a);
		for (let i = 0; i < r.length; ++i) {
			let a = r[i], o = e.createElement("td"), s, c = a.getKey();
			if (c in n.values) {
				let t = n.values[c], r = !1;
				n.originalValues && n.originalValues[c] && t.length !== n.originalValues[c].length && (r = !0);
				for (let i = 0; i < t.length; ++i) {
					let l = t[i];
					n.originalValues && n.originalValues[c] && n.originalValues[c].length > i && (s = n.originalValues[c][i], l.toString() !== s.toString() && (r = !0)), o.appendChild(De(l, a)), i !== t.length - 1 && o.appendChild(e.createTextNode(",\n")), r && (o.style.background = "#efe");
				}
			}
			t.appendChild(o);
		}
		return n._htmlRow = t, t;
	}
	function ke(e, t) {
		let n = null;
		if (e.termType === "Literal") n = "value";
		else if (e.termType === "NamedNode") n = "uri";
		else return t.indexOf(e) >= 0;
		let r;
		for (r = 0; r < t.length; ++r) if (t[r].termType === e.termType && t[r][n] === e[n]) return !0;
		return !1;
	}
	function Ae(e, t, n) {
		let r, i = !1;
		for (r in n) {
			let t = n[r];
			r in e.values || (e.values[r] = []), ke(t, e.values[r]) || (e.values[r].push(t), i = !0);
		}
		i && (te(e._htmlRow), Oe(e._htmlRow, e, t)), ve(e, t);
	}
	function je(e) {
		if ("uri" in e) return e.uri;
		if ("_subject_id" in e) return e._subject_id;
		{
			let t = "" + p;
			return e._subject_id = t, ++p, t;
		}
	}
	function Me(n, r, i, a) {
		n.running = !0;
		let c = Date.now(), l = e.createElement("tr");
		a.appendChild(l), l.textContent = "Loading ...";
		for (let e = 0; e < r.length; e++) r[e].original = !0, r[e].originalValues || (r[e].originalValues = r[e].values), r[e].values = {};
		o.query(n, function(t) {
			if (!n.running) return;
			l.textContent += ".";
			let o = null, c = null, u;
			if (f in t && (c = t[f], u = je(c), u in s && (o = s[u])), !o) {
				let t = e.createElement("tr");
				a.appendChild(t), o = {
					_htmlRow: t,
					_subject: c,
					values: {}
				}, r.push(o), c && (s[u] = o);
			}
			delete o.original, Ae(o, i, t);
		}, void 0, function() {
			l && l.parentNode && l.parentNode.removeChild && (l.parentNode.removeChild(l), l = null);
			let e = Date.now() - c;
			I("Query done: " + r.length + " rows, " + e + "ms");
			for (let e = r.length - 1; e >= 0; e--) if (r[e].original) {
				I("   deleting row " + r[e]._subject);
				let t = r[e]._htmlRow;
				t.parentNode.removeChild(t), delete s[je(r[e]._subject)], r.splice(e, 1);
			}
			t.sortBy && be(r, ce(i, t.sortBy), t.sortReverse), t.onDone && t.onDone(b);
		});
	}
	function Ne(e, t) {
		Jc.log.debug(">> processing formula");
		for (let n = 0; n < t.statements.length; ++n) {
			let r = t.statements[n];
			if (r.predicate.termType === "NamedNode" && r.object.termType === "Variable") {
				let t = r.object.toString();
				t in e && e[t].setPredicate(r.predicate, !1, r.subject);
			}
			if (r.predicate.termType === "NamedNode" && r.subject.termType === "Variable") {
				let t = r.subject.toString();
				t in e && e[t].setPredicate(r.predicate, !0, r.object);
			}
		}
		for (let n = 0; n < t.optional.length; ++n) Jc.log.debug("recurse to optional subformula " + n), Ne(e, t.optional[n]);
		Jc.log.debug("<< finished processing formula");
	}
	function Pe(e) {
		let t = [], n = {};
		for (let r = 0; r < e.vars.length; ++r) {
			let i = new j(), a = e.vars[r];
			Jc.log.debug("column " + r + " : " + a), i.setVariable(a), n[a] = i, t.push(i);
		}
		return Ne(n, e.pat), t;
	}
	function Fe(t, n) {
		let r;
		r = i ? Pe(t) : n.getColumns();
		let a = [], o = e.createElement("table");
		return o.appendChild(_e(r, n)), o.appendChild(z(a, r)), o.logicalRows = a, o.columns = r, o.query = t, Me(t, a, r, o), o;
	}
	function Ie(e) {
		let t = -1, n = null, r;
		for (r in e) {
			let i = e[r];
			i.useCount > t && (n = i, t = i.useCount);
		}
		return n;
	}
}
//#endregion
//#region src/lib/tabs.ts
var Xc = /* @__PURE__ */ r({
	TabWidgetElement: () => Zc,
	tabWidget: () => $c
}), Zc = class extends HTMLElement {
	bodyContainer;
	refresh;
	tabContainer;
}, Qc = "#ddddcc";
function $c(e) {
	let t = e.subject, n = e.dom || document, r = parseInt(e.orientation || "0"), i = e.backgroundColor || Qc, a = r & 2, o = r & 1, s = e.onClose, [c, l] = el(i), u = `display: grid; width: auto; height: 100%; border: 0.1em; border-style: solid; border-color: ${c}; padding: 1em;`, d = n.createElement("div");
	d.setAttribute("style", P.tabsRootElement), d.style.flexDirection = (o ? "row" : "column") + (a ? "-reverse" : "");
	let f = d.appendChild(n.createElement("nav"));
	f.setAttribute("style", P.tabsNavElement);
	let p = d.appendChild(n.createElement("div"));
	p.setAttribute("style", P.tabsMainElement);
	let m = f.appendChild(n.createElement("ul"));
	m.setAttribute("style", P.tabContainer), m.style.flexDirection = `${o ? "column" : "row"}`;
	let h = p;
	d.tabContainer = m, d.bodyContainer = h;
	let g = [
		"0.2em",
		"0.2em",
		"0",
		"0"
	], _ = `border-radius: ${g.concat(g).slice(r, r + 4).join(" ")};`, v = [
		"0.3em",
		"0.3em",
		"0",
		"0.3em"
	], y = v.concat(v).slice(r, r + 4), b = `margin: ${y.join(" ")};`, x = `padding: ${y.join(" ")};`, S = _ + `position: relative; padding: 0.7em; max-width: 20em; color: ${l};`, C = `${S + b} opacity: 50%; background-color: ${i};`, w = `${S + b} background-color: ${c};`, T = "height: 100%; width: 100%;";
	if (d.refresh = k, k(), !e.startEmpty && m.children.length && e.selectedTab) {
		let t = Array.from(m.children).map((e) => e.firstChild).find((t) => t.dataset.name === e.selectedTab), n = e.selectedTab.uri, r = Array.from(m.children).find((e) => e.subject && e.subject.uri && e.subject.uri === n) || t || m.children[0], i = r.firstChild;
		i?.click ? i.click() : r instanceof HTMLElement && r.click();
	} else if (!e.startEmpty) {
		let e = m.children[0], t = e?.firstChild;
		t?.click ? t.click() : e instanceof HTMLElement && e.click();
	}
	return d;
	function E(e) {
		if (e.dataset.onCloseSet) {
			let t = e.querySelector(".unstyled");
			e.removeChild(t);
		}
		let t = n.createElement("li");
		t.classList.add("unstyled");
		let r = Ut(n, s);
		r.setAttribute("style", r.getAttribute("style") + x), t.appendChild(r), e.appendChild(t), e.dataset.onCloseSet = "true";
	}
	function D() {
		return e.items ? e.items : e.ordered === !1 ? A.each(t, e.predicate) : A.the(t, e.predicate).elements;
	}
	function O(t) {
		let r = n.createElement("li");
		r.setAttribute("style", C), r.subject = t;
		let i = r.appendChild(n.createElement("button"));
		if (i.setAttribute("style", P.makeNewSlot), i.onclick = function() {
			if (ee(), te(), r.setAttribute("style", w), !r.bodyTR) return;
			r.bodyTR.setAttribute("style", T);
			let n = a(r);
			e.renderMain && r.subject && n.asSettings !== !1 && (n.innerHTML = "loading item ..." + t, e.renderMain(n, r.subject), n.asSettings = !1);
		}, e.renderTabSettings && r.subject) {
			let i = n.createElement("button");
			i.textContent = "...", i.setAttribute("style", P.ellipsis), i.onclick = function() {
				if (ee(), te(), r.setAttribute("style", w), !r.bodyTR) return;
				r.bodyTR.setAttribute("style", T);
				let n = a(r);
				e.renderTabSettings && r.subject && n.asSettings !== !0 && (n.innerHTML = "loading settings ..." + t, e.renderTabSettings(n, r.subject), n.asSettings = !0);
			}, r.appendChild(i);
		}
		return e.renderTab ? e.renderTab(i, t) : i.innerHTML = F(t), r;
		function a(e) {
			let t = e.bodyTR?.children[0];
			if (t) return t;
			let r = e.bodyTR.appendChild(n.createElement("div"));
			return r.setAttribute("style", u), r;
		}
	}
	function k() {
		let e = D(), t, r, i, a, o, c = !1;
		for (a = 0; a < m.children.length; a++) if (t = m.children[a], a >= e.length || t.subject && !t.subject.sameTerm(e[a])) {
			c = !0;
			break;
		}
		if (!c && e.length === m.children.length) return;
		for (o = m.children.length - 1; o >= 0 && (t = m.children[o], i = o - m.children.length + e.length, !(t.subject && !t.subject.sameTerm(e[i]))); o--);
		let l = e.slice(a, o - m.children.length + e.length + 1);
		for (; o >= a;) m.removeChild(m.children[a]), h.removeChild(h.children[a]), --o;
		for (r = 0; r < l.length; r++) {
			let e = O(l[r]), t = n.createElement("div");
			e.bodyTR = t, a === m.children.length ? (m.appendChild(e), h.appendChild(t)) : (m.insertBefore(e, m.children[a + r]), h.insertBefore(t, h.children[a + r]));
		}
		s && E(m);
	}
	function ee() {
		for (let e = 0; e < m.children.length; e++) {
			let t = m.children[e];
			t.classList.contains("unstyled") || t.setAttribute("style", C);
		}
	}
	function te() {
		for (let e = 0; e < h.children.length; e++) h.children[e].setAttribute("style", "height: 100%; width: 100%;display: none;");
	}
}
function el(e) {
	return nl(e) ? [tl(e, "#ffffff", .3), "#000000"] : [tl(e, "#000000", .3), "#ffffff"];
}
function tl(e, t, n) {
	let r, i, a, o = "#", s = "0123456789abcdef";
	for (let c = 0; c < 3; c++) {
		r = parseInt(e.slice(c * 2 + 1, c * 2 + 3), 16), i = parseInt(t.slice(c * 2 + 1, c * 2 + 3), 16), a = r * (1 - n) + i * n;
		let l = parseInt(("" + a).split(".")[0]), u = parseInt(("" + l / 16).split(".")[0]), d = parseInt(("" + l % 16).split(".")[0]);
		o += s[u] + s[d];
	}
	return o;
}
function nl(e) {
	let t = 0;
	for (let n = 0; n < 3; n++) t += parseInt(e.slice(n * 2 + 1, n * 2 + 3), 16);
	return t > 384;
}
//#endregion
//#region src/header/empty-profile.ts
var rl = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"26\" height=\"26\" viewBox=\"0 0 26 26\" fill=\"none\">\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z\" fill=\"#D8D8D8\" stroke=\"#8B8B8B\"/>\n    <mask id=\"mask0\" mask-type=\"alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"26\" height=\"26\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z\" fill=\"white\" stroke=\"white\"/>\n    </mask>\n    <g mask=\"url(#mask0)\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.0468 10.4586C17.0468 14.4979 15.4281 16.9214 12.9999 16.9214C10.5718 16.9214 8.95298 14.4979 8.95298 10.4586C8.95298 6.41931 12.9999 6.41931 12.9999 6.41931C12.9999 6.41931 17.0468 6.41931 17.0468 10.4586ZM4.09668 23.3842C6.52483 17.7293 12.9999 17.7293 12.9999 17.7293C12.9999 17.7293 19.475 17.7293 21.9031 23.3842C21.9031 23.3842 17.8481 25 12.9999 25C8.15169 25 4.09668 23.3842 4.09668 23.3842Z\" fill=\"#8B8B8B\"/>\n    </g>\n</svg>";
//#endregion
//#region src/utils/headerFooterHelpers.ts
function il() {
	let { origin: e, pathname: t } = document.location, n = document.body?.dataset?.appShell === "databrowser", r = t.split("/").filter(Boolean), i = r[r.length - 1] || "", a = /\.[^/]+$/.test(i);
	return n && r.length > 0 && !a ? _(`${e}/${r[0]}/`) : _(e).site();
}
async function al(e, t) {
	try {
		if (!t.any(e, null, E.ldp("Container"), e)) {
			let n = (await t.fetcher.webOperation("GET", e.uri, t.fetcher.initFetchOptions(e.uri, { headers: { accept: "text/turtle" } }))).responseText;
			m(n, t, e.uri, "text/turtle");
		}
	} catch (t) {
		return console.error("Error loading pod " + e + ": " + t), null;
	}
	if (!t.holds(e, E.rdf("type"), E.space("Storage"), e)) return console.warn("Pod  " + e + " does not declare itself as a space:Storage"), null;
	let n = t.any(e, E.solid("owner"), null, e) || t.any(null, E.space("storage"), e, e);
	if (n) {
		try {
			await t.fetcher.load(n.doc());
		} catch {
			return console.warn("Unable to load profile of pod owner " + n), null;
		}
		return t.holds(n, E.space("storage"), e, n.doc()) || console.warn(`Pod owner ${n} does NOT list pod ${e} as their storage`), n;
	} else {
		let n = _(`${e.uri}profile/card#me`);
		try {
			await t.fetcher.load(n);
		} catch {
			return console.error("Ooops. Guessed wrong pod owner webid {$guess} : can't load it."), null;
		}
		return t.holds(n, E.space("storage"), e, n.doc()) ? (console.warn("Using guessed pod owner webid but it links back."), n) : null;
	}
}
function ol(e, t) {
	return e.anyValue(t, E.vcard("fn"), null, t.doc()) || e.anyValue(t, E.foaf("name"), null, t.doc()) || t.uri;
}
function sl(e, t, n = {}) {
	let r, i, a, o = null, s = 0, c = function() {
		s = n.leading ? Date.now() : 0, o = null, a = e.apply(r, i), o || (r = i = null);
	};
	return function() {
		let l = Date.now();
		!s && !n.leading && (s = l);
		let u = t - (l - s);
		return r = this, i = arguments, u <= 0 || u > t ? (o &&= (clearTimeout(o), null), s = l, a = e.apply(r, i), o || (r = i = null)) : !o && n.trailing !== !1 && (o = setTimeout(c, u)), a;
	};
}
//#endregion
//#region src/header/index.ts
var cl = U.iconBase + "noun_help.svg", ll = "https://solidproject.org/assets/img/solid-emblem.svg";
async function ul(e, t, n) {
	let r = document.getElementById("PageHeader");
	if (!r) return;
	let i = il();
	dl(r, e, i, t, n)(), j.events.on("logout", dl(r, e, i, t, n)), j.events.on("login", dl(r, e, i, t, n));
}
function dl(e, t, n, r, i) {
	return async () => {
		let a = S.currentUser();
		e.innerHTML = "", e.appendChild(await fl(t, n, a, r, i));
	};
}
async function fl(e, t, n, r, i) {
	let a = document.createElement("a");
	a.href = t.uri, a.setAttribute("style", P.headerBannerLink);
	let o = document.createElement("img");
	i && (o.src = i.logo ? i.logo : ll), o.setAttribute("style", P.headerBannerIcon), a.appendChild(o);
	let s = n ? await _l(e, n, r) : ml(), c = document.createElement("div");
	c.setAttribute("style", P.headerBanner), c.appendChild(a);
	let l = document.createElement("div");
	if (l.setAttribute("style", P.headerBannerRightMenu), l.appendChild(s), i && i.helpMenuList) {
		let e = pl(i, i.helpMenuList);
		l.appendChild(e);
	}
	return c.appendChild(l), c;
}
function pl(e, t) {
	if (!t) return;
	let n = document.createElement("ul");
	n.setAttribute("style", P.headerUserMenuList), t.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? n.appendChild(vl(gl(e.label, e.url, e.target))) : n.appendChild(vl(hl(e.label, e.onclick)));
	});
	let r = document.createElement("nav");
	r.setAttribute("style", P.headerUserMenuNavigationMenuNotDisplayed), r.setAttribute("aria-hidden", "true"), r.setAttribute("id", "helperNav"), r.appendChild(n);
	let i = document.createElement("div");
	i.setAttribute("style", P.headerBannerUserMenu), i.appendChild(r);
	let a = document.createElement("button");
	a.setAttribute("style", P.headerUserMenuTrigger), a.type = "button";
	let o = document.createElement("img");
	o.src = e && e.helpIcon ? e.helpIcon : U.iconBase + cl, o.setAttribute("style", P.headerUserMenuTriggerImg), i.appendChild(a), a.appendChild(o);
	let s = sl((e) => bl(e, a, r), 50);
	a.addEventListener("click", s);
	let c = setTimeout(() => null, 0);
	return i.addEventListener("mouseover", (e) => {
		clearTimeout(c), s(e), document.getElementById("helperNav")?.setAttribute("style", P.headerUserMenuNavigationMenu);
	}), i.addEventListener("mouseout", (e) => {
		c = setTimeout(() => s(e), 200), document.getElementById("helperNav")?.setAttribute("style", P.headerUserMenuNavigationMenuNotDisplayed);
	}), i;
}
function ml() {
	let e = document.createElement("div");
	return e.setAttribute("style", P.headerBannerLogin), e.appendChild(ui(document, null, {})), e;
}
function hl(e, t) {
	let n = document.createElement("button");
	return n.setAttribute("style", P.headerUserMenuButton), n.onmouseover = function() {
		n.setAttribute("style", P.headerUserMenuButtonHover);
	}, n.onmouseout = function() {
		n.setAttribute("style", P.headerUserMenuButton);
	}, n.addEventListener("click", t), n.innerText = e, n;
}
function gl(e, t, n) {
	let r = document.createElement("a");
	return r.setAttribute("style", P.headerUserMenuLink), r.onmouseover = function() {
		r.setAttribute("style", P.headerUserMenuLinkHover);
	}, r.onmouseout = function() {
		r.setAttribute("style", P.headerUserMenuLink);
	}, r.href = t, r.innerText = e, n && (r.target = n), r;
}
async function _l(e, t, n) {
	let r = e.fetcher;
	r && await r.load(t);
	let i = document.createElement("ul");
	i.setAttribute("style", P.headerUserMenuList), n && n.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? i.appendChild(vl(gl(e.label, e.url, e.target))) : i.appendChild(vl(hl(e.label, e.onclick)));
	});
	let a = document.createElement("nav");
	a.setAttribute("style", P.headerUserMenuNavigationMenuNotDisplayed), a.setAttribute("aria-hidden", "true"), a.setAttribute("id", "loggedInNav"), a.appendChild(i);
	let o = document.createElement("button");
	o.setAttribute("style", P.headerUserMenuTrigger), o.type = "button";
	let s = yl(e, t);
	typeof s == "string" ? o.innerHTML = s : o.appendChild(s);
	let c = document.createElement("div");
	c.setAttribute("style", P.headerBannerUserMenuNotDisplayed), c.appendChild(o), c.appendChild(a);
	let l = sl((e) => bl(e, o, a), 50);
	o.addEventListener("click", l);
	let u = setTimeout(() => null, 0);
	return c.addEventListener("mouseover", (e) => {
		clearTimeout(u), l(e), document.getElementById("loggedInNav")?.setAttribute("style", P.headerUserMenuNavigationMenu);
	}), c.addEventListener("mouseout", (e) => {
		u = setTimeout(() => l(e), 200), document.getElementById("loggedInNav")?.setAttribute("style", P.headerUserMenuNavigationMenuNotDisplayed);
	}), c;
}
function vl(e) {
	let t = document.createElement("li");
	return t.setAttribute("style", P.headerUserMenuListItem), t.appendChild(e), t;
}
function yl(e, t) {
	let n = null;
	try {
		if (n = Lt(t), !n) return rl;
	} catch {
		return rl;
	}
	let r = document.createElement("div");
	return r.setAttribute("style", P.headerUserMenuPhoto), r.style.backgroundImage = `url(${n})`, r;
}
function bl(e, t, n) {
	let r = t.getAttribute("aria-expanded") === "true", i = e.type === "mouseover", a = e.type === "mouseout";
	r && i || !r && a || (t.setAttribute("aria-expanded", (!r).toString()), n.setAttribute("aria-hidden", r.toString()));
}
//#endregion
//#region src/footer/index.ts
var xl = "https://solidproject.org", Sl = "solidproject.org";
async function Cl(e, t) {
	let n = document.getElementById("PageFooter");
	if (!n) return;
	let r = il(), i = await al(r, e);
	return wl(n, e, r, i, t), j.events.on("login", () => wl(n, e, r, i, t)), j.events.on("logout", () => wl(n, e, r, i, t)), n;
}
async function wl(e, t, n, r, i) {
	let a = S.currentUser();
	return e.innerHTML = "", e.appendChild(await Tl(t, a, n, r, i)), e;
}
function Tl(e, t, n, r, i) {
	let a = document.createElement("div");
	a.setAttribute("style", P.footer);
	let o = document.createElement("a");
	if (o.href = i && i.solidProjectUrl ? i.solidProjectUrl : xl, o.innerText = i && i.solidProjectName ? i.solidProjectName : Sl, !n || !r || t && t.equals(r)) {
		let e = document.createElement("span");
		return e.innerText = "Powered by ", a.appendChild(e), a.appendChild(o), a;
	}
	let s = document.createElement("span");
	s.innerText = "You're visiting ";
	let c = document.createElement("a");
	c.href = n.uri, c.innerText = "the Pod";
	let l = document.createElement("span");
	l.innerText = " controlled by ";
	let u = document.createElement("a");
	u.href = r.uri, u.innerText = ol(e, r);
	let d = document.createElement("span");
	d.innerText = ". For more info, check out ";
	let f = document.createElement("span");
	return f.innerText = ".", a.appendChild(s), a.appendChild(c), a.appendChild(l), a.appendChild(u), a.appendChild(d), a.appendChild(o), a.appendChild(f), a;
}
//#endregion
//#region src/create/types.ts
var El = /* @__PURE__ */ r({}), Dl = typeof window < "u" ? window.document : null;
//#endregion
export { Gr as _, Xc as a, U as b, Lc as c, Qi as d, Xi as f, Ri as g, Li as h, ul as i, $s as l, Vi as m, El as n, Yc as o, Wi as p, Cl as r, Rc as s, Dl as t, qs as u, Hr as v, On as y };

//# sourceMappingURL=src-5pbRbXVz.js.map