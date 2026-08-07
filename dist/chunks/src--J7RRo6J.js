import { a as e, i as t, n, r, t as i } from "./rolldown-runtime-Cb76FRpK.js";
import { A as a, C as o, D as s, E as c, F as l, I as u, L as d, M as f, N as p, O as m, P as h, R as g, S as _, T as v, _ as y, a as b, b as x, c as S, d as C, f as w, g as T, h as E, i as D, j as O, k, l as A, m as j, n as M, o as ee, p as te, r as N, s as ne, t as P, u as re, v as ie, w as ae, x as F, y as oe } from "./index.esm-BW2SOmt6.js";
import { l as se } from "./auth-IpQoQHJx.js";
import { a as ce, c as le, d as ue, f as I, i as de, l as fe, m as pe, n as me, o as he, p as ge, r as _e, s as ve, t as L, u as R } from "./style-_Eni1Wf8.js";
import { x as ye } from "./components-BHoVP7zE.js";
import "./dialogs-D2n-R0lI.js";
//#region src/lib/debug.ts
function z(...e) {
	console.log(...e);
}
function B(...e) {
	console.warn(...e);
}
function be(...e) {
	console.error(...e);
}
function xe(...e) {
	console.trace(...e);
}
//#endregion
//#region src/acl/acl.ts
var V = D.store;
function Se(e, t, n, r) {
	let i = j.acl, a = e.uri.slice(-1) === "/", o = V.each(void 0, i("default"), n, r).concat(V.each(void 0, i("defaultForNew"), n, r)).reduce((t, n) => t.concat(V.statementsMatching(n, j.rdf("type"), i("Authorization"), r)).concat(V.statementsMatching(n, i("agent"), void 0, r)).concat(V.statementsMatching(n, i("agentClass"), void 0, r)).concat(V.statementsMatching(n, i("agentGroup"), void 0, r)).concat(V.statementsMatching(n, i("origin"), void 0, r)).concat(V.statementsMatching(n, i("originClass"), void 0, r)).concat(V.statementsMatching(n, i("mode"), void 0, r)).concat(_(n, i("accessTo"), e, r)).concat(a ? _(n, i("default"), e, r) : []), []), s = ie();
	return o.forEach((e) => s.add(c(e.subject), c(e.predicate), c(e.object), F(t.uri))), s;
	function c(e) {
		let n = r.uri.length;
		return F(e.uri.slice(0, n) === r.uri ? t.uri + e.uri.slice(n) : e.uri);
	}
}
function Ce(e, t, n = V, r = !1) {
	let i = r ? s(n, j) : n.each(void 0, j.acl("accessTo"), e), a = j.acl, o = {
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
function we(e, t) {
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
function Te(e) {
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
function Ee(e, t) {
	let n = [], r = function(e) {
		e.length ? Re(e.shift().doc(), function(i, a, o, s, c, l) {
			let u = !a;
			if (!i || !c || !l) return t(i, s);
			let d = u ? Ce(c, l) : Ce(o, s);
			n.push(d), r(e.slice(1));
		}) : t(!0, Te(n));
	};
	r(e);
}
function De(e) {
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
function Oe(e, t, n, r) {
	return ke(e, t, De(n), r);
}
function ke(e, t, n, r, i, a) {
	let o = j.acl;
	for (let s in n) {
		let c = n[s];
		if (!c.length) continue;
		let l = s.split("\n"), u = l.map(function(e) {
			return e.split("#")[1];
		}).join("");
		a && !i && (u += "Default");
		let d = e.sym(r.uri + "#" + u);
		e.add(d, j.rdf("type"), o("Authorization"), r), i && e.add(d, o("accessTo"), t, r), a && e.add(d, o("default"), t, r);
		for (let t = 0; t < l.length; t++) e.add(d, o("mode"), e.sym(l[t]), r);
		for (let t = 0; t < c.length; t++) {
			let n = c[t][0], i = c[t][1];
			e.add(d, o(n), e.sym(i), r);
		}
	}
}
function Ae(e) {
	return je(De(e));
}
function je(e) {
	let t = "";
	for (let n in e) {
		let r = n.split("\n").map(function(e) {
			return e.split("#")[1][0];
		}).join("");
		t += r + ":";
		let i = e[n];
		for (let e = 0; e < i.length; e++) {
			let n = i[e][0], r = F(i[e][1]);
			t += n === "agent" ? "@" : "", t += r.sameTerm(j.foaf("Agent")) ? "*" : R(r), e < i.length - 1 && (t += ",");
		}
		t += ";";
	}
	return "{" + t.slice(0, -1) + "}";
}
function Me(e, t, n) {
	let r = ie();
	return Oe(r, e, t, n), a(n, r, n.uri, "text/turtle") || "";
}
function Ne(e, t, n, r, i) {
	return Pe(e, t, De(n), r, i);
}
function Pe(e, t, n, r, i) {
	let a = ie();
	ke(a, t, n, r, !0), e.updater?.put(r, a.statementsMatching(void 0, void 0, void 0, r), "text/turtle", function(a, o, s) {
		o ? (e.fetcher?.unload(r), ke(e, t, n, r, !0), e.fetcher.requested[r.uri] = "done", i(o)) : i(o, s);
	});
}
function Fe(e, t, n) {
	let r = V.each(void 0, j.vcard("hasMember"), e);
	r ? Ie(e, r, t, n) : (t("This card is in no groups"), n(!0));
}
function Ie(e, t, n, r) {
	n ||= z;
	let i = e.doc();
	Re(i, function(a, o, s, c, l, u) {
		if (!a || !l || !u) return r(!1, c);
		let d = o ? Ce(s, c) : Ce(l, u);
		Ee(t, function(t, a) {
			if (!t) return r(!1, a);
			we(a, d) ? n("Nice - same ACL. no change " + R(e) + " " + i) : (n("Group ACLs differ for " + R(e) + " " + i), Ne(V, s, a, c, r));
		});
	});
}
function Le(e, t, n) {
	let r = V.any(e, te);
	if (!V.fetcher) throw Error("Store has no fetcher");
	r ? V.fetcher.webOperation("PUT", r.value, {
		data: t,
		contentType: "text/turtle"
	}).then((e) => {
		n(e.ok, e.error || "");
	}) : V.fetcher.nowOrWhenFetched(e, void 0, function(r, i) {
		if (!r) return n(r, "Gettting headers for ACL: " + i);
		let a = V.any(e, te);
		if (!a) n(!1, "No Link rel=ACL header for " + e);
		else {
			if (!V.fetcher) throw Error("Store has no fetcher");
			V.fetcher.webOperation("PUT", a.value, {
				data: t,
				contentType: "text/turtle"
			}).then((e) => {
				n(e.ok, e.error || "");
			});
		}
	});
}
function Re(e, t) {
	ze(e, function(n, r, i, a) {
		let o = j.acl;
		if (!n) return t(!1, !1, r, a);
		let s = function(n) {
			n.slice(-1) === "/" && (n = n.slice(0, -1));
			let r = n.lastIndexOf("/");
			if (n.indexOf("/", n.indexOf("//") + 2) > r) return t(!1, !0, 404, "Found no ACL resource");
			n = n.slice(0, r + 1);
			let a = F(n);
			ze(a, function(r, c, l) {
				return r ? c === 403 ? t(!1, !0, c, `( default ACL file FORBIDDEN. Stop.${n})`) : c === 404 ? s(n) : c === 200 ? V.each(void 0, o("default"), V.sym(n), l).concat(V.each(void 0, o("defaultForNew"), V.sym(n), l)).length ? t(!0, !1, e, i, V.sym(n), l) : s(n) : t(!1, !0, c, `Error status '${c}' searching for default for ${a}`) : t(!1, !0, c, `( No ACL pointer ${n} ${c})${l}`);
			});
		};
		if (!n) return t(!1, !1, r, `Error accessing Access Control information for ${e}) ${a}`);
		if (r === 404) s(e.uri);
		else if (r === 403) return t(!1, !1, r, `(Sharing not available to you)${a}`);
		else if (r !== 200) return t(!1, !1, r, `Error ${r} accessing Access Control information for ${e}: ${a}`);
		else return t(!0, !0, e, i);
	});
}
function ze(e, t) {
	if (!V.fetcher) throw Error("kb has no fetcher");
	V.fetcher.nowOrWhenFetched(e, void 0, function(n, r) {
		if (!n) return t(n, `Can't get headers to find ACL for ${e}: ${r}`);
		let i = V.any(e, te);
		if (!i) t(!1, 900, `No Link rel=ACL header for ${e}`);
		else {
			if (!V.fetcher) throw Error("kb has no fetcher");
			if (V.fetcher.nonexistent[i.value]) return t(!0, 404, i, `ACL file ${i} does not exist.`);
			V.fetcher.nowOrWhenFetched(i, void 0, function(e, n, r) {
				e ? t(!0, 200, i) : t(!0, r.status, i, `Can't read Access Control File ${i}: ${n}`);
			});
		}
	});
}
async function Be(e) {
	return new Promise((t, n) => Re(F(e), (r, i, a, o, s) => r ? t(i ? a : s) : n(/* @__PURE__ */ Error(`Error loading ${e}`))));
}
//#endregion
//#region node_modules/escape-html/index.js
var Ve = /* @__PURE__ */ i(((e, t) => {
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
})), H = [];
for (let e = 0; e < 256; ++e) H.push((e + 256).toString(16).slice(1));
function He(e, t = 0) {
	return (H[e[t + 0]] + H[e[t + 1]] + H[e[t + 2]] + H[e[t + 3]] + "-" + H[e[t + 4]] + H[e[t + 5]] + "-" + H[e[t + 6]] + H[e[t + 7]] + "-" + H[e[t + 8]] + H[e[t + 9]] + "-" + H[e[t + 10]] + H[e[t + 11]] + H[e[t + 12]] + H[e[t + 13]] + H[e[t + 14]] + H[e[t + 15]]).toLowerCase();
}
//#endregion
//#region node_modules/uuid/dist/rng.js
var Ue = /* @__PURE__ */ new Uint8Array(16);
function We() {
	return crypto.getRandomValues(Ue);
}
//#endregion
//#region node_modules/uuid/dist/v4.js
function Ge(e, t, n) {
	return !t && !e && crypto.randomUUID ? crypto.randomUUID() : Ke(e, t, n);
}
function Ke(e, t, n) {
	e ||= {};
	let r = e.random ?? e.rng?.() ?? We();
	if (r.length < 16) throw Error("Random bytes length must be >= 16");
	if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
		if (n ||= 0, n < 0 || n + 16 > t.length) throw RangeError(`UUID byte range ${n}:${n + 15} is out of buffer bounds`);
		for (let e = 0; e < 16; ++e) t[n + e] = r[e];
		return t;
	}
	return He(r);
}
//#endregion
//#region node_modules/mime-db/db.json
var qe = /* @__PURE__ */ r({ default: () => Je }), Je, Ye = n((() => {
	Je = {
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
})), Xe = /* @__PURE__ */ i(((e, n) => {
	n.exports = (Ye(), t(qe).default);
})), Ze = /* @__PURE__ */ i(((e, t) => {
	function n(e) {
		if (typeof e != "string") throw TypeError("Path must be a string. Received " + JSON.stringify(e));
	}
	function r(e, t) {
		for (var n = "", r = 0, i = -1, a = 0, o, s = 0; s <= e.length; ++s) {
			if (s < e.length) o = e.charCodeAt(s);
			else if (o === 47) break;
			else o = 47;
			if (o === 47) {
				if (i !== s - 1 && a !== 1) {
					if (i !== s - 1 && a === 2) {
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
				}
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
			}
			for (o = e.length - 1; o >= 0; --o) if (e.charCodeAt(o) === 47) {
				if (!a) {
					r = o + 1;
					break;
				}
			} else i === -1 && (a = !1, i = o + 1);
			return i === -1 ? "" : e.slice(r, i);
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
			return o === -1 || c === -1 || d === 0 || d === 1 && o === c - 1 && o === s + 1 ? c !== -1 && (t.base = t.name = s === 0 && i ? e.slice(1, c) : e.slice(s, c)) : (s === 0 && i ? (t.name = e.slice(1, o), t.base = e.slice(1, c)) : (t.name = e.slice(s, o), t.base = e.slice(s, c)), t.ext = e.slice(o, c)), s > 0 ? t.dir = e.slice(0, s - 1) : i && (t.dir = "/"), t;
		},
		sep: "/",
		delimiter: ":",
		win32: null,
		posix: null
	};
	a.posix = a, t.exports = a;
})), Qe = /* @__PURE__ */ i(((e, t) => {
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
})), $e = /* @__PURE__ */ i(((e) => {
	var t = Xe(), n = Ze().extname, r = Qe(), i = /^\s*([^;\s]*)(?:;|\s|$)/, a = /^text\//i;
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
})), et = /* @__PURE__ */ e(Ve()), tt = /* @__PURE__ */ e($e());
function nt(e, t, n) {
	let r = function(e) {
		return e.split("\n").map((e) => e.trim()).filter((e) => e && e[0] !== "#");
	}, i = function(e) {
		e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy";
	}, a = function(e) {
		e.preventDefault(), e.stopPropagation(), z("dragenter event dropEffect: " + e.dataTransfer.dropEffect), this.localStyle && (this.savedStyle ||= L.dragEvent), e.dataTransfer.dropEffect = "link", z("dragenter event dropEffect 2: " + e.dataTransfer.dropEffect);
	}, o = function(e) {
		e.stopPropagation(), z("dragleave event dropEffect: " + e.dataTransfer.dropEffect), this.localStyle = this.savedStyle ? this.savedStyle : L.dropEvent;
	}, s = function(e) {
		e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), z("Drop event. dropEffect: " + e.dataTransfer.dropEffect), z("Drop event. types: " + (e.dataTransfer.types ? e.dataTransfer.types.join(", ") : "NOPE"));
		let i = null, a;
		if (e.dataTransfer.types) {
			for (let t = 0; t < e.dataTransfer.types.length; t++) {
				let o = e.dataTransfer.types[t];
				if (o === "text/uri-list") i = r(e.dataTransfer.getData(o)), z("Dropped text/uri-list: " + i);
				else if (o === "text/plain") a = e.dataTransfer.getData(o);
				else if (o === "Files" && n) {
					let t = e.dataTransfer.files;
					for (let e = 0; t[e]; e++) {
						let n = t[e];
						z("Filename: " + n.name + ", type: " + (n.type || "n/a") + " size: " + n.size + " bytes, last modified: " + (n.lastModifiedDate ? n.lastModifiedDate.toLocaleDateString() : "n/a"));
					}
					n(t);
				}
			}
			let t = a ? a.trim() : "";
			i === null && t && t.slice(0, 4) === "http" && (i = [t], z("Warning: Poor man's drop: using text for URI"));
		} else i = r(e.dataTransfer.getData("Text")), z("WARNING non-standard drop event: " + i[0]);
		return z("Dropped URI list (2): " + i), i && t(i), this.localStyle = L.restoreStyle, !1;
	};
	(function(e) {
		e || z("@@@ addTargetListeners: ele " + e), e.addEventListener("dragover", i), e.addEventListener("dragenter", a), e.addEventListener("dragleave", o), e.addEventListener("drop", s);
	})(e, t);
}
function rt(e, t) {
	e.setAttribute("draggable", "true"), e.addEventListener("dragstart", function(n) {
		e.style.fontWeight = "bold", n.dataTransfer.setData("text/uri-list", t.uri), n.dataTransfer.setData("text/plain", t.uri), n.dataTransfer.setData("text/html", e.outerHTML), z("Dragstart: " + e + " -> " + t + "de: " + n.dataTransfer.dropEffect);
	}, !1), e.addEventListener("drag", function(e) {
		e.preventDefault(), e.stopPropagation();
	}, !1), e.addEventListener("dragend", function(n) {
		e.style.fontWeight = "normal", z("Dragend dropeffect: " + n.dataTransfer.dropEffect), z("Dragend: " + e + " -> " + t);
	}, !1);
}
function it(e, t, n, r, i) {
	for (let a = 0; t[a]; a++) {
		let o = t[a];
		z(" dropped: Filename: " + o.name + ", type: " + (o.type || "n/a") + " size: " + o.size + " bytes, last modified: " + (o.lastModifiedDate ? o.lastModifiedDate.toLocaleDateString() : "n/a"));
		let s = new FileReader();
		s.onload = function(t) {
			return function(a) {
				let o = a.target.result, s = "";
				z(" File read byteLength : " + o.byteLength);
				let c = t.type;
				if (!t.type || t.type === "") {
					if (c = tt.lookup(t.name), !c) {
						let e = "Filename needs to have an extension which gives a type we know: " + t.name;
						throw z(e), alert(e), Error(e);
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
					z(" Upload: put OK: " + u), i(t, u);
				}, (e) => {
					let t = " Upload: FAIL " + u + ", Error: " + e;
					throw z(t), alert(t), Error(t);
				});
			};
		}(o), s.readAsArrayBuffer(o);
	}
}
//#endregion
//#region src/widgets/error.ts
function U(e, t, n, r) {
	let i = e.createElement("div"), a = r || t instanceof Error ? t : null;
	return a ? (console.error(`errorMessageBlock: ${a} at: ${a.stack || "??"}`, a), i.textContent = a.message) : i.textContent = t, i.appendChild(Ut(e, () => {
		i.parentNode && i.parentNode.removeChild(i);
	})).style = L.errorCancelButton, i.setAttribute("style", L.errorMessageBlockStyle), i.style.backgroundColor = n || me.defaultErrorBackgroundColor, i;
}
//#endregion
//#region src/lib/iconBase.ts
var W = typeof module < "u" && module.scriptURI ? {
	iconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf("/")) + "/icons/",
	originalIconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf("/")) + "/originalIcons/"
} : typeof $SolidTestEnvironment < "u" && $SolidTestEnvironment.iconBase ? {
	iconBase: $SolidTestEnvironment.iconBase,
	originalIconBase: $SolidTestEnvironment.originalIconBase
} : {
	iconBase: "https://solidos.github.io/solid-ui/src/icons/",
	originalIconBase: "https://solidos.github.io/solid-ui/src/originalIcons/"
};
z("   icons.iconBase is set to : " + W.iconBase);
var at = W.iconBase, ot = W.originalIconBase, G = D.store, st = class {
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
			n.textContent = (0, et.default)("Change group"), n.addEventListener("click", (e) => {
				this.selectedgroup = null, this.render();
			}), e.appendChild(t), e.appendChild(n);
		} else this.findAddressBook(this.typeIndex).then(({ book: t }) => {
			let n = document.createElement("button");
			n.textContent = (0, et.default)("Pick an existing group"), n.style.margin = "auto", n.addEventListener("click", (n) => {
				new ct(e, t, this.onSelectGroup).render();
			});
			let r = document.createElement("button");
			r.textContent = (0, et.default)("Create a new group"), r.style.margin = "auto", r.addEventListener("click", (e) => {
				this.createNewGroup(t, this.options.defaultNewGroupName).then(({ group: e }) => {
					new ut(this.element, t, e, this.onSelectGroup).render();
				}).catch((e) => {
					this.element.appendChild(U(document, (0, et.default)(`Error creating a new group. (${e})`)));
				});
			}), e.appendChild(n), e.appendChild(r), this.element.innerHTML = "", this.element.appendChild(e);
		}).catch((e) => {
			this.element.appendChild(U(document, (0, et.default)(`Could find your groups. (${e})`)));
		});
		return this.element.innerHTML = "", this.element.appendChild(e), this;
	}
	findAddressBook(e) {
		return new Promise((t, n) => {
			G.fetcher.nowOrWhenFetched(e, (r, i) => {
				if (!r) return n(i);
				let a = G.any(null, j.solid("forClass"), j.vcard("AddressBook"));
				if (!a) return n(/* @__PURE__ */ Error("no address book registered in the solid type index " + e));
				let o = G.any(a, j.solid("instance"));
				if (!o) return n(/* @__PURE__ */ Error("incomplete address book registration"));
				G.fetcher.load(o).then(function(e) {
					return t({ book: o });
				}).catch(function(e) {
					return n(/* @__PURE__ */ Error("Could not load address book " + e));
				});
			});
		});
	}
	createNewGroup(e, t) {
		let { groupIndex: n, groupContainer: r } = mt(e), i = F(`${r.uri}${Ge().slice(0, 8)}.ttl#this`), a = t || "Untitled Group", o = [i.doc(), n].map((t) => {
			let r = _(i, j.rdf("type"), j.vcard("Group"), t), o = _(i, j.vcard("fn"), a, i.doc(), t), s = _(e, j.vcard("includesGroup"), i, t), c = t.equals(n) ? [
				r,
				o,
				s
			] : [r, o];
			return pt(t.uri, { toIns: c }).then(() => {
				c.forEach((e) => {
					G.add(e);
				});
			});
		});
		return Promise.all(o).then(() => ({ group: i })).catch((e) => {
			throw z("Could not create new group.  PATCH failed " + e), Error(`Couldn't create new group.  PATCH failed for (${e.xhr ? e.xhr.responseURL : ""} )`);
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
			this.element.appendChild(U(document, (0, et.default)(`There was an error loading your groups. (${e})`)));
		}), this;
	}
	loadGroups() {
		return new Promise((e, t) => {
			let { groupIndex: n } = mt(this.book);
			G.fetcher.nowOrWhenFetched(n, (n, r) => n ? e(G.each(this.book, j.vcard("includesGroup"))) : t(r));
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
		return e.textContent = (0, et.default)(ft(this.group, j.vcard("fn"), `[${this.group.value}]`)), this.element.innerHTML = "", this.element.appendChild(e), this;
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
					this.element.appendChild(U(document, (0, et.default)(`Could not add the given WebId. (${e})`)));
				});
			});
		});
		let t = document.createElement("input");
		t.type = "text", t.value = ft(this.group, j.vcard("fn"), "Untitled Group"), t.addEventListener("change", (e) => {
			this.setGroupName(e.target.value).catch((e) => {
				this.element.appendChild(U(document, `Error changing group name. (${e})`));
			});
		});
		let n = document.createElement("label");
		if (n.textContent = (0, et.default)("Group Name:"), n.appendChild(t), e.appendChild(n), G.any(this.group, j.vcard("hasMember"))) G.match(this.group, j.vcard("hasMember")).forEach((t) => {
			let n = t.object, r = document.createElement("div");
			new dt(r, n, this.handleRemove(n)).render(), e.appendChild(r);
		});
		else {
			let t = document.createElement("p");
			t.textContent = et.default`
        To add someone to this group, drag and drop their WebID URL onto the box.
      `, e.appendChild(t);
		}
		let r = document.createElement("button");
		return r.textContent = (0, et.default)("Done"), r.addEventListener("click", (e) => {
			this.doneBuildingCb(this.group);
		}), e.appendChild(r), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
	add(e) {
		return new Promise((t, n) => {
			G.fetcher.nowOrWhenFetched(e, (r, i) => {
				if (!r) return this.onGroupChanged(i), n(i);
				let a = F(e), o = G.any(a, j.rdf("type"));
				return !o || !o.equals(j.foaf("Person")) ? n(/* @__PURE__ */ Error(`Only people supported right now. (tried to add something of type ${o.value})`)) : t(a);
			});
		}).then((e) => {
			let t = _(this.group, j.vcard("hasMember"), e);
			return G.holdsStatement(t) ? e : pt(this.group.doc().uri, { toIns: [t] }).then(() => {
				t.why = this.group.doc(), G.add(t), this.onGroupChanged(null, "added", e), this.render();
			});
		});
	}
	handleRemove(e) {
		return (t) => {
			let n = _(this.group, j.vcard("hasMember"), e);
			return pt(this.group.doc().uri, { toDel: [n] }).then(() => (G.remove(n), this.onGroupChanged(null, "removed", e), this.render(), !0)).catch((t) => {
				let n = G.any(e, j.foaf("name")), r = n && n.value ? `Could not remove ${n.value}. (${t})` : `Could not remove ${e.value}. (${t})`;
				throw Error(r);
			});
		};
	}
	setGroupName(e) {
		let { groupIndex: t } = mt(this.book), n = [this.group.doc(), t].map((t) => {
			let n = G.match(this.group, j.vcard("fn"), null, t), r = _(this.group, j.vcard("fn"), x(e));
			return pt(t.value, {
				toDel: n,
				toIns: [r]
			}).then((e) => {
				G.removeStatements(n), r.why = t, G.add(r);
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
		let t = ft(this.webIdNode, j.foaf("img"), at + "noun_15059.svg"), n = document.createElement("img");
		n.src = (0, et.default)(t), n.width = "50", n.height = "50", n.style.margin = "5px";
		let r = ft(this.webIdNode, j.foaf("name"), `[${this.webIdNode}]`), i = document.createElement("span");
		i.innerHTML = (0, et.default)(r), i.style.flexGrow = "1", i.style.margin = "auto 0";
		let a = document.createElement("button");
		return a.textContent = "Remove", a.addEventListener("click", (e) => this.handleRemove().catch((e) => {
			this.element.appendChild(U(document, (0, et.default)(`${e}`)));
		})), a.style.margin = "5px", e.appendChild(n), e.appendChild(i), e.appendChild(a), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
};
function ft(e, t, n) {
	let r = G.any(e, t);
	return r ? r.value : n;
}
function pt(e, { toDel: t, toIns: n }) {
	return new Promise((e, r) => {
		G.updater.update(t, n, (t, n, i) => {
			if (!n) return r(/* @__PURE__ */ Error(`PATCH failed for resource <${t}>: ${i}`));
			e();
		});
	});
}
function mt(e) {
	return {
		groupIndex: G.any(e, j.vcard("groupIndex")),
		groupContainer: G.sym(e.dir().uri + "Group/")
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
	r.setAttribute("style", L.imageDivStyle), r.appendChild(n), n.setAttribute("draggable", "false");
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
}, { iconBase: xt } = W, St = xt + "noun_1180156.svg", Ct = xt + "noun_1180158.svg";
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
	z("Complaint: " + t), n ? n.appendChild(U(e && e.dom || document, t)) : alert(t);
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
	let n = P, r = function(e) {
		let t = n.any(e, j.vcard("fn")) || n.any(e, j.foaf("name")) || n.any(e, j.vcard("organization-name"));
		return t ? t.value : null;
	}, i = t.sameTerm(j.foaf("Agent")) ? "Everyone" : r(t);
	if (e.textContent = i || R(t), !i && t.uri) {
		if (!n.fetcher) throw Error("kb has no fetcher");
		n.fetcher.nowOrWhenFetched(t.doc(), void 0, function(n) {
			e.textContent = r(t) || R(t);
		});
	}
}
function Nt(e, t) {
	return t.each(e, j.sioc("avatar")).concat(t.each(e, j.foaf("img"))).concat(t.each(e, j.vcard("logo"))).concat(t.each(e, j.vcard("hasPhoto"))).concat(t.each(e, j.vcard("photo"))).concat(t.each(e, j.foaf("depiction")));
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
	let t = P, n = xt;
	if (e.sameTerm(j.foaf("Agent")) || e.sameTerm(j.rdf("Resource"))) return n + "noun_98053.svg";
	let r = t.any(e, j.sioc("avatar")) || t.any(e, j.foaf("img")) || t.any(e, j.vcard("logo")) || t.any(e, j.vcard("hasPhoto")) || t.any(e, j.vcard("photo")) || t.any(e, j.foaf("depiction"));
	return r ? r.uri : null;
}
function Rt(e, t, n) {
	let r = P, i = Lt(t);
	if (i) return e.setAttribute("src", i), !0;
	let a = n[t.uri];
	if (a) return e.setAttribute("src", a), e.style = L.classIconStyle, !0;
	let o = It(t);
	if (o) return e.setAttribute("src", o), !0;
	let s = r.findTypeURIs(t);
	for (let t in s) if (n[t]) return e.setAttribute("src", n[t]), !1;
	return e.setAttribute("src", xt + "noun_10636_grey.svg"), !1;
}
function zt(e, t) {
	let n = P, r = {};
	for (let e in Pt) {
		let t = e.split(":")[0], n = e.split(":")[1], i = j[t](n), a = Pt[e];
		a.startsWith("data:") ? r[i.uri] = a : r[i.uri] = p(a, xt);
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
	if (n.style = L.iconStyle, n.setAttribute("src", xt + (function(e) {
		if (!e.uri) return !1;
		let t = e.uri.split("/");
		return t.length === 3 || t.length === 4 && t[3] === "";
	}(t) ? "noun_15177.svg" : "noun_681601.svg")), t.uri && t.uri.startsWith("https:") && t.uri.indexOf("#") < 0) {
		let r = e.createElement("object");
		return r.setAttribute("data", Ft(t) + "favicon.ico"), r.setAttribute("type", "image/x-icon"), r.appendChild(n), r;
	}
	return zt(n, t), n;
}
function Vt(e, t, n, r) {
	function i() {
		t.parentElement.removeChild(t);
	}
	function a() {
		i(), r();
	}
	let o = e.createElement("div");
	o.style = L.confirmPopupStyle, o.style.position = "absolute", o.style.top = "-1em", o.style.display = "grid", o.style.gridTemplateColumns = "auto auto";
	let s = e.createElement("div");
	s.style.gridColumn = "1/2", s.style.gridRow = "1";
	let c = e.createElement("div");
	c.style.gridColumn = "1/2", c.style.gridRow = "2";
	let l = Ut(e, i);
	o.appendChild(l), l.style.gridColumn = "1", l.style.gridRow = "2";
	let u = o.appendChild(e.createElement("button"));
	u.style = L.buttonStyle, u.style.gridRow = "2", u.style.gridColumn = "2", u.textContent = "Cancel";
	let d = K(e, W.iconBase + "noun_925021.svg", "Delete it");
	o.appendChild(d), d.style.gridRow = "1", d.style.gridColumn = "1";
	let f = o.appendChild(e.createElement("button"));
	return f.style = L.buttonStyle, f.style.gridRow = "1", f.style.gridColumn = "2", f.textContent = n, o.appendChild(f), d.addEventListener("click", a), f.addEventListener("click", a), u.addEventListener("click", i), o;
}
function Ht(e, t, n, r) {
	function i() {
		let n = e.createElement("div");
		t.insertBefore(n, o), n.style.position = "relative", n.appendChild(Vt(e, n, s, r));
	}
	let a = xt + "noun_2188_red.svg", o = e.createElement("img");
	o.setAttribute("src", a), o.setAttribute("style", L.smallButtonStyle), o.style.float = "right";
	let s = "Remove this " + n;
	return o.title = s, o.classList.add("hoverControlHide"), o.addEventListener("click", i), t.classList.add("hoverControl"), t.appendChild(o), o.setAttribute("data-testid", "deleteButtonWithCheck"), o;
}
function K(e, t, n, r, i = {
	buttonColor: "Primary",
	needsBorder: !1
}) {
	let a = e.createElement("button");
	if (a.setAttribute("type", "button"), t) {
		let r = a.appendChild(e.createElement("img"));
		r.setAttribute("src", t), r.setAttribute("style", "width: 2em; height: 2em;"), r.title = n, a.setAttribute("style", L.buttonStyle);
	} else a.textContent = n.toLocaleUpperCase(), a.onmouseover = function() {
		i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", L.secondaryButtonNoBorderHover) : a.setAttribute("style", L.secondaryButtonHover) : i.needsBorder ? a.setAttribute("style", L.primaryButtonNoBorderHover) : a.setAttribute("style", L.primaryButtonHover);
	}, a.onmouseout = function() {
		i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", L.secondaryButtonNoBorder) : a.setAttribute("style", L.secondaryButton) : i.needsBorder ? a.setAttribute("style", L.primaryButtonNoBorder) : a.setAttribute("style", L.primaryButton);
	}, i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", L.secondaryButtonNoBorder) : a.setAttribute("style", L.secondaryButton) : i.needsBorder ? a.setAttribute("style", L.primaryButtonNoBorder) : a.setAttribute("style", L.primaryButton);
	return r && a.addEventListener("click", r, !1), a;
}
function Ut(e, t) {
	let n = K(e, St, "Cancel", t);
	return n.firstChild && (n.firstChild.style.opacity = "0.3"), n;
}
function Wt(e, t) {
	return K(e, Ct, "Continue", t);
}
function Gt(e, t, n, r, i, a) {
	return new Promise(function(t, o) {
		let s = e.createElement("div");
		r ||= j.foaf("name"), a ||= i ? R(i) : "  ";
		let c = a + " " + R(r) + ": ";
		s.appendChild(e.createElement("p")).textContent = c;
		let l = e.createElement("input");
		l.setAttribute("type", "text"), l.setAttribute("size", "100"), l.setAttribute("maxLength", "2048"), l.setAttribute("style", L.textInputStyle), l.select(), s.appendChild(l), n.appendChild(s);
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
	i.setAttribute("style", L.linkDivStyle), r.deleteFunction && Ht(e, i, r.noun || "one", r.deleteFunction), n.uri && (r.link !== !1 && bt(e, i, n), rt(t, n));
}
function Xt(e, t, n) {
	let r = e.createElement("div");
	return r.setAttribute("style", L.renderAsDivStyle), n ||= {}, vt(e, r, n.image || Bt(e, t)), Jt(e, r, n.title, t), Yt(e, r, t, n), n.clickable && n.onClickFunction && _t(r, n.onClickFunction), n.wrapInATR ? gt(e, r, t) : r;
}
function Zt(e) {
	if (e.refresh) {
		e.refresh();
		return;
	}
	for (let t = 0; t < e.children.length; t++) Zt(e.children[t]);
}
function Qt(e, t, n, r = {}) {
	let i = /* @__PURE__ */ new Set(), a = !!(r.renderSupportingInfo || r.renderNameSuffix), o = r.refreshOnDocumentLoad ?? !0, s = function(e) {
		if (!v.updater) throw Error("kb has no updater");
		v.updater.update(_(t, h, e, f), [], function(e, t, n, r) {
			t ? l() : Tt(void 0, "Error deleting one: " + n);
		});
	};
	function c(t) {
		let n = t, c = { noun: g };
		if (c.renderSupportingInfo = r.renderSupportingInfo, c.renderNameSuffix = r.renderNameSuffix, a && o && t?.uri && v.fetcher) {
			let e = t.doc(), n = e?.uri ? v.fetcher.requested?.[e.uri] : void 0, r = n !== "done" && n !== "failed";
			e?.uri && r && !i.has(e.uri) && (i.add(e.uri), v.fetcher.nowOrWhenFetched(e, void 0, () => {
				i.delete(e.uri), l();
			}));
		}
		return p && (c.deleteFunction = function() {
			s(n);
		}), Kt(e, h, t, c);
	}
	let l = function() {
		let e = v.each(t, h);
		e.sort(), ve(S, e, c, a ? function(e, t) {
			return c(t);
		} : void 0);
	};
	function u(e) {
		let n = [];
		if (e.forEach(function(e) {
			let r = F(e);
			z("Dropped on attachemnt " + e), n.push(_(t, h, r, f));
		}), !v.updater) throw Error("kb has no updater");
		v.updater.update([], n, function(e, t, n, r) {
			t ? l() : Tt(void 0, "Error adding one: " + n);
		});
	}
	function d(e) {
		it(v.fetcher, e, r.uploadFolder?.uri, r.uploadFolder?.uri, function(e, n) {
			let r = [_(t, h, v.sym(n), f)];
			if (!v.updater) throw Error("kb has no updater");
			v.updater.update([], r, function(e, t, n, r) {
				t ? l() : Tt(void 0, "Error adding link to uploaded file: " + n);
			});
		});
	}
	let f = r.doc || t.doc();
	r.modify === void 0 && (r.modify = !0);
	let p = r.modify, m = r.promptIcon || xt + "noun_748003.svg", h = r.predicate || j.wf("attachment"), g = r.noun || "attachment", v = P, y = n.appendChild(e.createElement("table"));
	y.setAttribute("style", "margin-top: 1em; margin-bottom: 1em;");
	let b = y.appendChild(e.createElement("tr")), x = b.appendChild(e.createElement("td")), S = b.appendChild(e.createElement("td")).appendChild(e.createElement("table"));
	if (S.appendChild(e.createElement("tr")), y.refresh = l, l(), p) {
		let t = K(e, m, "Drop attachments here");
		x.appendChild(t);
		let n = r.uploadFolder ? d : null;
		nt(t, u, n);
		let i = t.querySelector("img");
		if (i && nt(i, u, n), nt(x, u, n), r.uploadFolder) {
			let t = _n(e, d);
			x.appendChild(t);
		}
	}
	return y;
}
function $t(e) {
	e.preventDefault(), e.stopPropagation();
	let t = ce(e).getAttribute("href");
	if (!t) return z("openHrefInOutlineMode: No href found!\n");
	let n = window.document;
	n.outlineManager ? n.outlineManager.GotoSubject(P.sym(t), !0, void 0, !0, void 0) : window && window.panes && window.panes.getOutliner ? window.panes.getOutliner().GotoSubject(P.sym(t), !0, void 0, !0, void 0) : z("ERROR: Can't access outline manager in this config");
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
	return P.sym("http://tabulator.org/wiki/annnotation/" + t);
}
function tn() {
	let e = {};
	return P.statementsMatching(void 0, j.rdf("type"), void 0).forEach(function(t) {
		t.object.value && (e[t.object.value] = !0);
	}), P.statementsMatching(void 0, j.rdfs("subClassOf"), void 0).forEach(function(t) {
		t.object.value && (e[t.object.value] = !0), t.subject.value && (e[t.subject.value] = !0);
	}), P.each(void 0, j.rdf("type"), j.rdfs("Class")).forEach(function(t) {
		t.value && (e[t.value] = !0);
	}), e;
}
function nn(e) {
	let t = {}, n = {}, r = {}, i = 0, a = 0, o = 0, s = e.predicateIndex;
	for (let e in s) s[e][0].object.termType === "Literal" ? (n[e] = !0, a++) : (r[e] = !0, i++);
	let c = e.each(void 0, j.rdf("type"), j.rdf("Property"));
	for (let e = 0; e < c.length; e++) {
		let t = c[e].toNT();
		!r[t] && !n[t] && (n[t] = !0, r[t] = !0, o++);
	}
	return t.op = r, t.dp = n, ge(`propertyTriage: ${i} non-lit, ${a} literal. ${o} unknown.`), t;
}
function rn(e, t) {
	let n = e.createElement("button");
	return n.setAttribute("type", "button"), n.textContent = "Goto " + R(t), n.addEventListener("click", function(n) {
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
	return n.textContent = R(t), n;
}
function un(e) {
	let t = cn.twoLine[e.uri], n = P;
	if (t) return t;
	let r = n.findSuperClassesNT(e);
	for (let e in r) if (t = cn.twoLine[n.fromNT(e).uri], t) return t;
	return cn.twoLine[""];
}
function dn(e, t) {
	let n = "", r = function(e) {
		let r = P.any(t, j.qu(e));
		return r || (n += "@@ No value for " + e + "! "), r ? de(r.value) : "?";
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
        <td><a href="${de(t.uri)}">${de(n)}</a></td>
      </tr>`), i;
}
function fn(e, t) {
	let n = function(e) {
		let n = P.any(t, e);
		return n ? de(n.value) : "?";
	}, r = e.createElement("table");
	return r.innerHTML = `
    <tr>
      <td colspan="2">${n(j.dc("title"))}</td>
    </tr>
    <tr style="color: #777">
      <td>${n(j.cal("dtstart"))}</td>
      <td>${n(j.cal("dtend"))}</td>
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
	}, r = t || "image", i = P.findTypeURIs(e), a = O(r + "/*").uri.split("*")[0];
	for (let e in i) if (e.startsWith(a)) return !0;
	return n[r] in i;
}
function _n(e, t) {
	let n = e.createElement("div"), r = n.appendChild(e.createElement("input"));
	return r.setAttribute("type", "file"), r.setAttribute("multiple", "true"), r.addEventListener("change", (e) => {
		z("File drop event: ", e), e.files ? t(e.files) : e.target && e.target.files ? t(e.target.files) : alert("Sorry no files .. internal error?");
	}, !1), r.style = "display:none", nt(n.appendChild(K(e, xt + "noun_Upload_76574_000000.svg", "Upload files", (e) => {
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
	[j.ui("ColorField").uri]: {
		size: 9,
		type: "color",
		style: "height: 3em;",
		dt: "color",
		pattern: /^\s*#[0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f][0-9a-f]([0-9a-f][0-9a-f])?\s*$/
	},
	[j.ui("DateField").uri]: {
		size: 20,
		type: "date",
		dt: "date",
		pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?Z?\s*$/
	},
	[j.ui("DateTimeField").uri]: {
		size: 20,
		type: "datetime-local",
		dt: "dateTime",
		pattern: /^\s*[0-9][0-9][0-9][0-9](-[0-1]?[0-9]-[0-3]?[0-9])?(T[0-2][0-9]:[0-5][0-9](:[0-5][0-9])?)?Z?\s*$/
	},
	[j.ui("TimeField").uri]: {
		size: 10,
		type: "time",
		dt: "time",
		pattern: /^\s*([0-2]?[0-9]:[0-5][0-9](:[0-5][0-9])?)\s*$/
	},
	[j.ui("IntegerField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "integer",
		pattern: /^\s*-?[0-9]+\s*$/
	},
	[j.ui("DecimalField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "decimal",
		pattern: /^\s*-?[0-9]*(\.[0-9]*)?\s*$/
	},
	[j.ui("FloatField").uri]: {
		size: 12,
		style: "text-align: right;",
		dt: "float",
		pattern: /^\s*-?[0-9]*(\.[0-9]*)?((e|E)-?[0-9]*)?\s*$/
	},
	[j.ui("SingleLineTextField").uri]: {},
	[j.ui("NamedNodeURIField").uri]: { namedNode: !0 },
	[j.ui("TextField").uri]: {},
	[j.ui("PhoneField").uri]: {
		size: 20,
		uriPrefix: "tel:",
		pattern: /^\+?[\d-]+[\d]*$/
	},
	[j.ui("EmailField").uri]: {
		size: 30,
		uriPrefix: "mailto:",
		pattern: /^\s*.*@.*\..*\s*$/
	},
	[j.ui("Group").uri]: { style: L.formGroupStyle },
	[j.ui("Comment").uri]: {
		element: "p",
		style: L.commentStyle
	},
	[j.ui("Heading").uri]: {
		element: "h3",
		style: L.formHeadingStyle
	}
}, yn = D.store, q = {};
function bn(e) {
	let t = yn, n = t.findTypeURIs(e), r = t.bottomTypeURIs(n), i = [];
	for (let e in r) i.push(e);
	return i[0];
}
function xn(e, t) {
	let n = bn(t), r = q[n];
	return I("paneUtils: Going to implement field " + t + " of type " + n), r || function(e, r) {
		let i = U(e, "No handler for field " + t + " of type " + n);
		return r && r.appendChild(i), i;
	};
}
//#endregion
//#region src/widgets/forms/formStyle.ts
var Sn = "https://www.w3.org/ns/css#";
function Cn(e, t) {
	let n = vn[bn(t)] || {}, r = P.any(t, j.ui("style"));
	if (!r) {
		n.style && e.setAttribute("style", n.style);
		return;
	}
	r.termType === "Literal" ? r && e.setAttribute("style", r.value) : P.statementsMatching(r, null, null, t.doc()).forEach((t) => {
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
var wn = D.store;
function Tn(e, t, n, r, i) {
	n.style.display = "flex", n.style.flexDirection = "row";
	let a = n.appendChild(e.createElement("div"));
	a.style.width = me.formFieldNameBoxWidth;
	let o = n.appendChild(e.createElement("div"));
	return a.setAttribute("class", "formFieldName"), a.setAttribute("style", L.formFieldNameBoxStyle), o.setAttribute("class", "formFieldValue"), i ? a.appendChild(e.createTextNode(i)) : t.any(r, j.ui("property")) ? a.appendChild(En(e, t.any(r, j.ui("property")), r)) : (o.appendChild(U(e, "No property or label given for form field: " + r)), a.appendChild(e.createTextNode("???"))), o;
}
function En(e, t, n) {
	let r = wn.any(n, j.ui("label"));
	if (r ||= R(t, !0), t === void 0) return e.createTextNode("@@Internal error: undefined property");
	let i = e.createElement("a");
	return t.uri && i.setAttribute("href", t.uri), i.setAttribute("style", "color: #3B5998; text-decoration: none;"), i.textContent = r, i;
}
function Dn(e, t, n) {
	let r = wn.statementsMatching(e, t);
	if (r.length === 0) return n;
	if (!wn.updater) throw Error("Store has no updater");
	return r.length > 0 && r[0].why.value && wn.updater.editable(r[0].why.value, wn) ? wn.sym(r[0].why.value) : n;
}
function On(e, t, n, r, i, a, o) {
	let s = wn, c = i.doc ? i.doc() : null, l = e.createElement("div"), d = s.any(i, j.ui("property"));
	if (t && t.appendChild(l), !d) return l.appendChild(U(e, "Error: No property given for text field: " + i));
	let f = Tn(e, s, l, i), p = s.anyJS(i, j.ui("suppressEmptyUneditable"), null, c), m = vn[bn(i)];
	m === void 0 && (m = { style: "" });
	let h = m.style || "", g = L.textInputStyle + h, v = e.createElement("input");
	v.style = g, f.appendChild(v), v.setAttribute("type", m.type ? m.type : "text");
	let y = (v.getAttribute("type") || "").toLowerCase(), b = y === "date" || y === "datetime-local", x = s.anyJS(i, j.ui("size")) || me.textInputSize || 20;
	v.setAttribute("size", x);
	let S = s.any(i, j.ui("maxLength"));
	v.setAttribute("maxLength", S ? "" + S : me.basicMaxLength), a ||= Dn(r, d, a);
	let C = s.any(r, d, void 0, a);
	if (C ||= s.any(i, j.ui("default")), C && C.value && m.uriPrefix ? v.value = decodeURIComponent(C.value.replace(m.uriPrefix, "")).replace(/ /g, "") : C && 
	/* istanbul ignore next */
	(v.value = C.value || C.value || ""), v.setAttribute("style", g), !s.updater) throw Error("kb has no updater");
	return s.updater.editable(a.uri) ? (v.addEventListener("keyup", function(e) {
		m.pattern && v.setAttribute("style", g + (v.value.match(m.pattern) ? "color: green;" : "color: red;"));
	}, !0), v.addEventListener("change", function(t) {
		if (b && e.activeElement === v) {
			v.dataset && (v.dataset.deferredChange = "true");
			return;
		}
		if (m.pattern && !v.value.match(m.pattern)) return;
		let n = !b;
		n && (v.disabled = !0), v.setAttribute("style", g + "color: gray;");
		let i = s.statementsMatching(r, d), c;
		m.namedNode ? c = s.sym(v.value) : m.uriPrefix ? (c = encodeURIComponent(v.value.replace(/ /g, "")), c = s.sym(m.uriPrefix + v.value)) : c = m.dt ? new u(v.value.trim(), void 0, j.xsd(m.dt)) : new u(v.value);
		let f = i.map((e) => _(e.subject, e.predicate, c, e.why));
		f.length === 0 && (f = [_(r, d, c, a)]);
		function p(e, t, n) {
			let r = [];
			/* istanbul ignore next */
			if (t.forEach((e) => {
				r.includes(e.why.uri) || r.push(e.why.uri);
			}), e.forEach((e) => {
				/* istanbul ignore next */
				r.includes(e.why.uri) || r.push(e.why.uri);
			}), r.length === 0) throw Error("updateMany has no docs to patch");
			if (!s.updater) throw Error("kb has no updater");
			if (r.length === 1) return s.updater.update(e, t, n);
			let i = r.pop(), a = t.filter((e) => e.why.uri === i), o = t.filter((e) => e.why.uri !== i), c = e.filter((e) => e.why.uri === i), l = e.filter((e) => e.why.uri !== i);
			s.updater.update(c, a, function(e, t, r) {
				t ? p(l, o, n) : n(e, t, r);
			});
		}
		p(i, f, function(t, r, i) {
			r ? (n && (v.disabled = !1), v.setAttribute("style", g)) : l.appendChild(U(e, i)), o(r, i);
		});
	}, !0), v.addEventListener("blur", function(e) {
		if (b && v.dataset && v.dataset.deferredChange === "true") {
			delete v.dataset.deferredChange;
			let e = new Event("change", { bubbles: !0 });
			v.dispatchEvent(e);
		}
	}, !0), l) : (v.readOnly = !0, v.style = L.textInputStyleUneditable + h, p && v.value === "" && (l.style.display = "none"), l);
}
//#endregion
//#region src/widgets/forms/autocomplete/language.ts
var kn = /* @__PURE__ */ r({
	addDefaults: () => Mn,
	defaultPreferredLanguages: () => jn,
	filterByLanguage: () => Fn,
	getPreferredLanguages: () => Pn,
	getPreferredLanguagesFor: () => Nn,
	languageCodeURIBase: () => An
}), An = "https://www.w3.org/ns/iana/language-code/", jn = [
	"en",
	"fr",
	"de",
	"it",
	"ar"
];
function Mn(e) {
	return e ||= [], e.concat(jn.filter((t) => !e.includes(t)));
}
async function Nn(e) {
	let t = e.doc();
	await P.fetcher?.load(t);
	let n = P.any(e, j.schema("knowsLanguage"), null, t);
	if (!n) return jn;
	let r = [];
	return n.elements.forEach((e) => {
		let n = P.any(e, j.solid("publicId"), null, t);
		if (!n) {
			console.warn("getPreferredLanguages: No publiID of language.");
			return;
		}
		if (!n.value.startsWith("https://www.w3.org/ns/iana/language-code/")) {
			console.error(`What should be a language code ${n.value} does not start with ${An}`);
			return;
		}
		let i = n.value.slice(41);
		r.push(i);
	}), r.length > 0 ? (console.log(`     User knows languages with codes: "${r.join(",")}"`), Mn(r)) : null;
}
async function Pn() {
	let e = await N.currentUser();
	if (e) {
		let t = await Nn(e);
		if (t) return t;
	}
	if (typeof navigator < "u") {
		if (navigator.languages) return Mn(navigator.languages.map((e) => e.split("-")[0]));
		if (navigator.language) return Mn([navigator.language.split("-")[0]]);
	}
	return jn;
}
function Fn(e, t) {
	let n = {};
	e.forEach((e) => {
		let t = e.subject.value;
		n[t] = n[t] || [], n[t].push(e);
	});
	let r = t || jn;
	r.reverse();
	let i = [];
	for (let e in n) {
		let t = n[e].map((e) => {
			let t = e.name["xml:lang"];
			return [r.indexOf(t), e];
		});
		t.sort(), t.reverse(), i.push(t[0][1]);
	}
	return z(` Filter by language: ${e.length} -> ${i.length}`), i;
}
//#endregion
//#region src/widgets/forms/autocomplete/publicData.ts
var In = /* @__PURE__ */ r({
	AUTOCOMPLETE_LIMIT: () => 200,
	ESCOResultToBindings: () => Xn,
	bindingToTerm: () => Jn,
	dbPediaTypeMap: () => Un,
	dbpediaParameters: () => Hn,
	escoParameters: () => Vn,
	fetcherOptionsJsonPublicData: () => Bn,
	getDbpediaDetails: () => or,
	getWikidataDetails: () => rr,
	getWikidataDetailsOld: () => ir,
	getWikidataLocation: () => ar,
	instituteDetailsWikidataQuery: () => zn,
	loadFromBindings: () => Yn,
	loadPublicDataThing: () => nr,
	queryESCODataByName: () => Zn,
	queryPublicDataByName: () => $n,
	queryPublicDataConstruct: () => tr,
	queryPublicDataSelect: () => er,
	variableNameToPredicateMap: () => qn,
	wikidataClasses: () => Rn,
	wikidataIncomingClassMap: () => Kn,
	wikidataOutgoingClassMap: () => Wn,
	wikidataParameters: () => Gn
}), Ln = /\$\(subject\)/g, Rn = {
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
}, zn = "prefix vcard: <http://www.w3.org/2006/vcard/ns#>\nCONSTRUCT\n{  wd:Q49108 vcard:fn ?itemLabel.\nwd:Q49108 rdf:type ?klass. ?klass rdfs:label ?klassLabel; rdfs:comment ?klassDescription .\nwd:Q49108 schema:logo ?logo;\n   schema:image ?image;\n   schema:logo  ?sealImage;\n   schema:subOrganization  ?subsidiary .\n      ?subsidiary rdfs:label ?subsidiaryLabel .\n ?supersidiary schema:subOrganization wd:Q49108 .\n      ?supersidiary rdfs:label ?supersidiaryLabel .\n  wd:Q49108 schema:location ?location .\n     ?location  schema:elevation  ?elevation .\n     ?location  wdt:P131  ?region .  ?region rdfs:label ?regionLabel .\n     ?location wdt:P625 ?coordinates .\n     ?location  schema:country  ?country . ?country rdfs:label ?countryLabel .\n}\nWHERE\n{  optional {wd:Q49108 rdfs:label ?itemLabel} .\n  optional {wd:Q49108 wdt:P154 ?logo .}\n  optional {wd:Q49108 wdt:P31 ?klass .}\n  optional {wd:Q49108 wdt:P158  ?sealImage .}\n  optional {wd:Q49108 wdt:P18 ?image .}\n\n  optional { wd:Q49108       wdt:P355 ?subsidiary . }\n  optional { ?supersidiary   wdt:P355 wd:Q49108. }\n\n  optional { wd:Q49108 wdt:P276 ?location .\n\n    optional { ?location  schema:eleveation  ?elevation }\n    optional { ?location  wdt:P131  ?region }\n    optional { ?location wdt:P625 ?coordinates }\n    optional {  ?location  wdt:P17  ?country }\n  }\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\". }\n}", Bn = {
	credentials: "omit",
	headers: new Headers({ Accept: "application/json" })
}, Vn = {
	label: "ESCO",
	logo: P.sym("https://ec.europa.eu/esco/portal/static_resource2/images/logo/logo_en.gif"),
	searchByNameURI: "https://ec.europa.eu/esco/api/search?language=$(language)&type=occupation&text=$(name)"
}, Hn = {
	label: "DBPedia",
	logo: P.sym("https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/DBpediaLogo.svg/263px-DBpediaLogo.svg.png"),
	searchByNameQuery: "select distinct ?subject, ?name where {\n    ?subject a $(targetClass); rdfs:label ?name\n    FILTER regex(?name, \"$(name)\", \"i\")\n  } LIMIT $(limit)",
	endpoint: "https://dbpedia.org/sparql/"
}, Un = { AcademicInsitution: "http://umbel.org/umbel/rc/EducationalOrganization" }, Wn = {
	AcademicInsitution: "http://www.wikidata.org/entity/Q4671277",
	Enterprise: "http://www.wikidata.org/entity/Q6881511",
	Business: "http://www.wikidata.org/entity/Q4830453",
	NGO: "http://www.wikidata.org/entity/Q79913",
	CharitableOrganization: "http://www.wikidata.org/entity/Q708676",
	Insitute: "http://www.wikidata.org/entity/Q1664720"
}, Gn = {
	label: "WikiData",
	limit: 3e3,
	logo: P.sym("https://www.wikimedia.org/static/images/project-logos/wikidatawiki.png"),
	endpoint: "https://query.wikidata.org/sparql",
	searchByNameQuery: "SELECT ?subject ?name\n  WHERE {\n    ?klass wdt:P279* $(targetClass) .\n    ?subject wdt:P31 ?klass .\n    ?subject rdfs:label ?name.\n    FILTER regex(?name, \"$(name)\", \"i\")\n  } LIMIT $(limit) ",
	insitituteDetailsQuery: "CONSTRUCT\n{  wd:Q49108 schema:name ?itemLabel;\n             schema:logo ?logo;\n              schema:logo  ?sealImage;\n             schema:subOrganization  ?subsidiary .\n                 ?subsidiary schema:name ?subsidiaryLabel .\n}\nWHERE\n{\n   wd:Q49108 # rdfs:label ?itemLabel ;\n             wdt:P154 ?logo;\n              wdt:P158  ?sealImage ;\n             wdt:P355  ?subsidiary .\n          #  ?subsidiary rdfs:label ?subsidiaryLabel .\n\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE], fr\". }\n}"
}, Kn = {
	"http://www.wikidata.org/entity/Q15936437": j.schema("CollegeOrUniversity"),
	"http://www.wikidata.org/entity/Q1664720": j.schema("EducationalOrganization"),
	"http://www.wikidata.org/entity/Q43229": j.schema("Organization"),
	"http://www.wikidata.org/entity/Q3918": j.schema("CollegeOrUniversity"),
	"http://www.wikidata.org/entity/Q170584": j.schema("Project"),
	"http://www.wikidata.org/entity/Q327333": j.schema("GovernmentOrganization"),
	"http://www.wikidata.org/entity/Q2221906": j.schema("Place"),
	"http://www.wikidata.org/entity/Q167037": j.schema("Corporation")
}, qn = {
	targetClass: j.rdf("type"),
	sealImage: j.schema("logo"),
	shortName: j.foaf("nick"),
	subsidiary: j.schema("subOrganization"),
	city: j.vcard("locality"),
	state: j.vcard("region"),
	country: j.vcard("country-name"),
	homepage: j.foaf("homepage"),
	lat: j.schema("latitude"),
	long: j.schema("longitude")
};
function Jn(e) {
	let t = e.type.toLowerCase();
	if (t === "uri" || t === "iri") return P.sym(e.value);
	if (t === "literal") return e["xml:lang"] ? new u(e.value, e["xml:lang"]) : new u(e.value);
	throw Error(`bindingToTerm: Unexpected type "${e.type}" in sparql binding}`);
}
function Yn(e, t, n, r, i = qn) {
	let a = {};
	z(`loadFromBindings:  subject: ${t}`), z(`                       doc: ${r}`), n.forEach((e) => {
		for (let t in e) {
			let n = e[t], r = JSON.stringify(n);
			a[t] = a[t] || /* @__PURE__ */ new Set(), a[t].add(r);
		}
	});
	for (let n in a) {
		let o = a[n];
		z(`    results ${n} -> ${o}`), o.forEach((a) => {
			let o = JSON.parse(a), { type: s, value: c } = o, l;
			if (s === "uri") l = e.sym(c);
			else if (s === "literal") l = new u(c, o.language, o.datatype);
			else throw Error(`loadFromBindings:  unexpected type: ${s}`);
			if (n === "type") Kn[c] ? l = Kn[c] : B("Unmapped Wikidata Class: " + c);
			else if (n === "coordinates") {
				z("         @@@ hey a point: " + c);
				let n = /.*\(([-0-9.-]*) ([-0-9.-]*)\)/.exec(c);
				if (n) {
					let i = j.xsd("float"), a = new u(n[1], null, i), o = new u(n[2], null, i);
					e.add(t, j.schema("longitude"), o, r), e.add(t, j.schema("latitude"), a, r);
				} else z("Bad coordinates syntax: " + c);
			} else {
				let a = i[n] || j.schema(n);
				e.add(t, a, l, r), z(`  public data ${a} ${l}.`);
			}
		});
	}
}
function Xn(e) {
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
async function Zn(e, t, n) {
	if (!n.searchByNameURI) throw Error("Missing queryTarget.searchByNameURI on queryESCODataByName");
	let r = n.limit || 200, i = n.searchByNameURI.replace("$(name)", e).replace("$(limit)", "" + r).replace("$(targetClass)", t.toNT());
	z("Querying ESCO data - uri: " + i);
	let a = (await P.fetcher?.webOperation("GET", i, Bn))?.responseText || "";
	if (z("    Query result  text" + a.slice(0, 500) + "..."), a.length === 0) throw Error("Wot no text back from ESCO query " + i);
	let o = JSON.parse(a);
	return z("    ESCO Query result JSON" + JSON.stringify(o, null, 4).slice(0, 500) + "..."), Xn(o);
}
function Qn(e) {
	let t = e.indexOf("SPARQL-QUERY");
	if (t < 0) return e;
	B("  ### Fixing JSON with wikidata error code injection " + e.slice(t, t + 200));
	let n = e.lastIndexOf("}, {");
	return e.slice(0, n) + " } ] } } ";
}
async function $n(e, t, n, r) {
	function i(n) {
		let i = r.limit || 200;
		return n.replace("$(name)", e).replace("$(limit)", "" + i).replace("$(language)", a).replace("$(targetClass)", t.toNT());
	}
	if (!t) throw Error("queryPublicDataByName: No class provided");
	let a = (await Pn() || jn)[0] || "en";
	if (r.searchByNameQuery) {
		let e = i(r.searchByNameQuery);
		return z("Querying public data - sparql: " + e), er(e, r);
	}
	if (r.searchByNameURI) {
		let e = i(r.searchByNameURI), t;
		try {
			t = await P.fetcher?.webOperation("GET", e, Bn);
		} catch (t) {
			throw Error(`Exception when trying to fetch ${e} \n ${t}`);
		}
		let n = t.responseText || "";
		if (t.status !== 200) throw Error(`HTTP error status ${t.status} trying to fetch ${e} `);
		if (z("    Query result  text" + n.slice(0, 500) + "..."), n.length === 0) throw Error("queryPublicDataByName: No text back from public data query " + e);
		let a = Qn(n), o = JSON.parse(a);
		if (z("    API Query result JSON" + JSON.stringify(o, null, 4).slice(0, 500) + "..."), o._embedded) return z("      Looks like ESCO"), Xn(o);
		throw alert("Code me: unrecognized API return format"), Error(`*** Need to add code to parse unrecognized API JSON return\n${JSON.stringify(o, null, 4)}`);
	}
	throw Error("Query source must have either rest API or SPARQL endpoint.");
}
async function er(e, t) {
	if (!t.endpoint) throw Error("Missing queryTarget.endpoint required for queryPublicDataSelect");
	let n = new URL(t.endpoint);
	n.searchParams.append("query", e);
	let r = n.href;
	z(" queryPublicDataSelect uri: " + r);
	let i = new Headers();
	i.append("Accept", "application/json");
	let a = {
		credentials: "omit",
		headers: i
	}, o = (await P.fetcher?.webOperation("GET", r, a))?.responseText || "";
	if (o.length === 0) throw Error("No text back from query " + r);
	let s = Qn(o), c = JSON.parse(s);
	return z("    Query result JSON" + JSON.stringify(c, null, 4).slice(0, 100) + "..."), c.results.bindings;
}
async function tr(e, t, n) {
	if (z("queryPublicDataConstruct: sparql:", e), !n.endpoint) throw Error("Missing queryTarget.endpoint required for queryPublicDataConstruct");
	let r = new URL(n.endpoint);
	r.searchParams.append("query", e);
	let i = r.href;
	z(" queryPublicDataConstruct uri: " + i);
	let a = new Headers();
	a.append("Accept", "text/turtle");
	let o = {
		credentials: "omit",
		headers: a
	}, c = (await P.fetcher?.webOperation("GET", i, o))?.responseText || "No response text?";
	if (z("    queryPublicDataConstruct result text:" + (c.length > 500 ? c.slice(0, 200) + " ... " + c.slice(-200) : c)), c.length === 0) throw Error("queryPublicDataConstruct: No text back from construct query:" + i);
	s(c, P, t.uri, "text/turtle");
}
async function nr(e, t, n) {
	if (n.uri.startsWith("https://dbpedia.org/resource/")) return or(e, t, n);
	if (n.uri.match(/^https?:\/\/www\.wikidata\.org\/entity\/.*/)) await rr(e, t, n);
	else {
		let t = n.uri.startsWith("http:") ? e.sym("https:" + n.uri.slice(5)) : n, r = new Headers();
		return r.append("Accept", "text/turtle"), e.fetcher.load(t, {
			credentials: "omit",
			headers: r
		});
	}
}
async function rr(e, t, n) {
	await tr(zn.replace(/wd:Q49108/g, n.toNT()), n, Gn), z("getWikidataDetails: loaded.", n);
}
async function ir(e, t, n) {
	Yn(e, n, await er("select distinct *  where {\n  optional { $(subject)  wdt:P31  ?targetClass } # instance of\n  optional { $(subject)  wdt:P154  ?logo }\n  optional { $(subject)  wdt:P158  ?sealImage }\n# optional { $(subject)  wdt:P159  ?headquartersLocation }\n\noptional { $(subject)  wdt:P17  ?country }\noptional { $(subject)  wdt:P18  ?image }\noptional { $(subject)  wdt:P1813  ?shortName }\n\noptional { $(subject)  wdt:P355  ?subsidiary }\n# SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\" }\n}".replace(Ln, n.toNT()), Gn), n.doc());
}
async function ar(e, t, n) {
	let r = "select distinct *  where {\n\n  $(subject) wdt:P276 ?location .\n\n  optional { ?location  wdt:P2044  ?elevation }\n  optional { ?location  wdt:P131  ?region }\n  optional { ?location wdt:P625 ?coordinates }\noptional {  ?location  wdt:P17  ?country }\n\n# SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\" }\n}".replace(Ln, n.toNT());
	z(" location query sparql:" + r);
	let i = await er(r, Gn);
	z(" location query bindings:", i), Yn(e, n, i, n.doc());
}
async function or(e, t, n) {
	Yn(e, n, await er(`select distinct ?city, ?state, ?country, ?homepage, ?logo, ?lat, ?long,  WHERE {
    OPTIONAL { <${n}> <http://dbpedia.org/ontology/city> ?city }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/state> ?state }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/country> ?country }
    OPTIONAL { ${n} foaf:homepage ?homepage }
    OPTIONAL { ${n} foaf:lat ?lat; foaf:long ?long }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/country> ?country }
   }`, Hn), n.doc()), z("Finished getDbpediaDetails.");
}
//#endregion
//#region src/widgets/forms/autocomplete/autocompletePicker.ts
var sr = 4, cr = 20, lr = 40;
function J(e, t) {
	e.style.display = t ? "" : "none";
}
async function ur(e, t, n, r) {
	function i(t) {
		let n = E.appendChild(e.createElement("tr"));
		z(t);
		let r = Error(t);
		n.appendChild(U(e, r, "pink")), L.setStyle(n, "autocompleteRowStyle"), n.style.padding = "1em";
	}
	function a(e, n) {
		z("Auto complete: finish! " + e), e.termType === "Literal" && t.queryParams.objectURIBase && (e = P.sym(t.queryParams.objectURIBase.value + e.value)), u(), r(e, n);
	}
	async function o(e, t) {
		if (n.acceptButton) {
			n.acceptButton.disbaled = !1, J(n.acceptButton, !0), O.value = t.value, w = t, T = e, z("Auto complete: name: " + t), z("Auto complete: waiting for accept " + e), u();
			return;
		}
		J(n.cancelButton, !0), a(e, t);
	}
	async function s(e) {
		w && O.value === w.value && a(T, w);
	}
	async function c(e) {
		z("Auto complete: Canceled by user! "), t.permanent ? h() : C.parentNode && C.parentNode.removeChild(C);
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
			r = await $n(e, g, n || jn, t.queryParams);
		} catch (e) {
			i("Error querying db of organizations: " + e), y = !1;
			return;
		}
		return v = r.length < 200, x = v ? e : void 0, u(), Fn(r, n);
	}
	function p(e, t) {
		return t.filter((t) => l(e, t.name.value));
	}
	async function m() {
		function t(t) {
			let n = e.createElement("tr");
			L.setStyle(n, "autocompleteRowStyle"), n.setAttribute("style", "padding: 0.3em;"), n.style.color = b ? "#080" : "#088", n.textContent = t.name.value;
			let r = Jn(t.subject), i = Jn(t.name);
			return n.addEventListener("click", async (e) => {
				z("       click row textContent: " + n.textContent), z("       click name: " + i.value), r && i && o(r, i);
			}), n;
		}
		function n(e, t) {
			return t.name.value > e.name.value ? 1 : t.name.name < e.name.value ? -1 : 0;
		}
		if (y) {
			z(`Ignoring "${O.value}" because of lock `);
			return;
		}
		z(`Setting lock at "${O.value}"`), y = !0;
		let r = await Pn(), i = O.value.trim().toLowerCase();
		if (i.length < sr) u(), S = cr;
		else {
			(!b || !x || !i.startsWith(x)) && (z(`   Querying database at "${i}" cf last "${x}".`), _ = await f(i, r));
			let e = p(i, _);
			v && e.length <= lr && (S = e.length), b = v && e.length <= S, z(` Filter:"${i}" lastBindings: ${_.length}, slimmed to ${e.length}; rows: ${S}, Enough? ${v}, All displayed? ${b}`);
			let a = e.slice(0, S);
			a.sort(n), u();
			for (let e of a) E.appendChild(t(e));
			e.length === 1 && o(Jn(e[0].subject), Jn(e[0].name));
		}
		y = !1;
	}
	function h() {
		t.currentObject ? (O.value = t.currentName ? t.currentName.value : "??? wot no name for " + t.currentObject, w = t.currentName, x = t.currentName ? t.currentName.value : void 0, T = t.currentObject) : (O.value = "", x = void 0, T = void 0), n.deleteButton && J(n.deleteButton, !!t.currentObject), n.acceptButton && J(n.acceptButton, !1), n.editButton && J(n.editButton, !0), n.cancelButton && J(n.cancelButton, !1), y = !1, u();
	}
	let g = t.targetClass;
	if (!g) throw Error("renderAutoComplete: missing targetClass");
	n.acceptButton && n.acceptButton.addEventListener("click", s, !1), n.cancelButton && n.cancelButton.addEventListener("click", c, !1);
	let _, v = !1, y = !1, b = !1, x, S = cr, C = e.createElement("div"), w, T, E = C.appendChild(e.createElement("table"));
	E.setAttribute("data-testid", "autocomplete-table"), E.setAttribute("style", "max-width: 30em; margin: 0.5em;");
	let D = E.appendChild(e.createElement("tr"));
	L.setStyle(D, "autocompleteRowStyle");
	let O = D.appendChild(e.createElement("td")).appendChild(e.createElement("input"));
	O.setAttribute("type", "text"), h();
	let k = t.size || me.textInputSize || 20;
	O.setAttribute("size", k), O.setAttribute("data-testid", "autocomplete-input");
	let A = L.textInputStyle || "border: 0.1em solid #444; border-radius: 0.5em; width: 100%; font-size: 100%; padding: 0.1em 0.6em";
	return O.setAttribute("style", A), O.addEventListener("keyup", function(e) {
		e.keyCode === 13 && s(e);
	}, !1), O.addEventListener("input", d), C;
}
//#endregion
//#region src/widgets/forms/autocomplete/autocompleteBar.ts
var dr = "Solid ID", fr = W.iconBase + "noun_34653_green.svg", pr = W.iconBase + "noun_Search_875351.svg", mr = W.iconBase + "noun_253504.svg";
async function hr(e, t, n, r, i, a) {
	async function o(e, t) {
		return r.permanent ? (J(g, !0), J(f, !1), J(p, !1)) : c(), i(e, t);
	}
	async function s(n) {
		let r = await Gt(e, P, x, j.vcard("url"), void 0, dr);
		if (r) return i(t, r);
	}
	function c() {
		b &&= (x.removeChild(b), void 0);
	}
	async function l() {
		b = e.createElement("div"), b.setAttribute("style", "display: flex; flex-flow: wrap;"), b.appendChild(await ur(e, r, y, o)), b.appendChild(f), b.appendChild(p), b.appendChild(g), b.appendChild(m), x.appendChild(b);
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
	let m = e.createElement("div"), h = Ht(e, m, r.targetClass ? R(r.targetClass) : "item", a);
	h.setAttribute("data-testid", "delete-button");
	let g = K(e, mr, "Edit", (e) => {
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
	return x.style.display = "flex", x.style.flexDirection = "row", (r.permanent || r.currentObject) && await l(), n.editable && (x.style.width = "100%", n.manualURIEntry && nt(x.appendChild(K(e, fr, n.idNoun, s)), d, void 0), n.dbLookup && !r.currentObject && !r.permanent && x.appendChild(K(e, pr, n.idNoun, u))), v(), x;
}
//#endregion
//#region src/widgets/forms/autocomplete/autocompleteField.ts
function gr(e, t, n, r, i, a, o) {
	async function s(t, n) {
		if (!n) throw Error("autocompleteField:  No name set.");
		let i = l.the(r, m, null, a);
		if (i) {
			let e = l.any(i, h, null, a);
			if (i.equals(t) && e && e.sameTerm(n)) return;
		}
		let s = i ? l.statementsMatching(r, m, i, a).concat(l.statementsMatching(i, h, null, a)) : [], c = [_(r, m, t, a), _(t, h, n, a)];
		try {
			await l.updater?.updateMany(s, c);
		} catch (t) {
			o(!1, t), d.appendChild(U(e, "Autocomplete form data update error:" + t, null, t));
			return;
		}
		o(!0, "");
	}
	async function c(t, n) {
		let i = l.the(r, m, null, a);
		if (!i) {
			o(!1, "NO data to elete"), d.appendChild(U(e, "Autocomplete delete: no old data!"));
			return;
		}
		let s = l.statementsMatching(r, m, i, a).concat(l.statementsMatching(i, h, null, a)), c = [];
		try {
			await l.updater?.updateMany(s, c);
		} catch (t) {
			let n = /* @__PURE__ */ Error("Autocomplete form data delete error:" + t);
			o(!1, t), d.appendChild(U(e, n, null, t));
			return;
		}
		o(!0, "");
	}
	if (r.termType !== "NamedNode") throw Error("Sorry this field only works on NamedNode subjects (for editable)");
	let l = P, u = i.doc ? i.doc() : null, d = e.createElement("div");
	t && t.appendChild(d);
	let f = e.createElement("div");
	f.setAttribute("class", "formFieldName"), f.setAttribute("style", L.formFieldNameBoxStyle), d.appendChild(f);
	let p = e.createElement("div");
	p.setAttribute("class", "formFieldValue"), d.appendChild(p);
	let m = l.any(i, j.ui("property"));
	if (!m) return d.appendChild(U(e, "Error: No property given for autocomplete field: " + i));
	let h = l.any(i, j.ui("labelProperty")) || j.schema("name"), g = l.any(i, j.ui("dataSource"));
	if (!g) return d.appendChild(U(e, "Error: No data source given for autocomplete field: " + i));
	let v = {
		label: l.anyJS(g, j.schema("name"), null, g.doc()),
		logo: l.any(g, j.schema("logo"), null, g.doc())
	}, y = l.any(i, j.ui("targetClass"), null, i.doc()) || l.any(g, j.ui("targetClass"), null, g.doc());
	y && (v.targetClass = y), v.objectURIBase = l.any(g, j.ui("objectURIBase"), null, g.doc()) || void 0;
	let b = l.anyJS(g, j.ui("endpoint"), null, g.doc());
	if (b) {
		if (v.endpoint = b, v.searchByNameQuery = l.anyJS(g, j.ui("searchByNameQuery"), null, g.doc()), !v.searchByNameQuery) return d.appendChild(U(e, "Error: No searchByNameQuery given for endpoint data Source: " + i));
		v.insitituteDetailsQuery = l.anyJS(g, j.ui("insitituteDetailsQuery"), null, g.doc());
	} else {
		let t = l.anyJS(g, j.ui("searchByNameURI"));
		if (!t) return d.appendChild(U(e, "Error: No searchByNameURI OR sparql endpoint given for dataSource: " + g));
		v.searchByNameURI = t;
	}
	let x = l.anyJS(i, j.ui("suppressEmptyUneditable"), null, u), S = l.updater?.editable(a.uri), C = {
		permanent: !0,
		targetClass: v.targetClass,
		queryParams: v
	};
	C.size = l.anyJS(i, j.ui("size"), null, u) || void 0;
	let w = l.any(r, m, void 0, a);
	if (w) C.currentObject = w, C.currentName = l.any(C.currentObject, h, null, a);
	else if (w = l.any(i, j.ui("default")), w) C.currentObject = w, C.currentName = l.any(C.currentObject, h, null, a);
	else if (x && !S) return d.style.display = "none", d;
	return f.appendChild(En(e, m, i)), hr(e, r, {
		editable: S,
		dbLookup: !0
	}, C, s, c).then((e) => {
		p.appendChild(e);
	}, (t) => {
		p.appendChild(U(e, `Error rendering autocomplete ${i}: ${t}`, "#fee", t));
	}), d;
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
var _r = class {
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
		}
		return null;
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
}, vr = "✓", yr = "✕", br = "-", xr = P;
q[j.ui("AutocompleteField").uri] = gr;
function Sr(e, t, n, r, i, a, o) {
	let s = a.children;
	for (let c = 0; c < o.length; c++) {
		let l = o[c];
		if (bn(l) === j.ui("Options").uri) {
			let o = xn(e, l)(e, null, t, n, l, r, i);
			z("Refreshing Options field by replacing it."), a.insertBefore(o, s[c]), a.removeChild(s[c + 1]);
		}
	}
}
q[j.ui("Form").uri] = q[j.ui("Group").uri] = function(e, t, n, r, i, a, o) {
	let s = e.createElement("div"), c = j.ui;
	if (t && t.appendChild(s), !i) return;
	let l = r.toNT() + "|" + i.toNT();
	if (n[l]) return s.appendChild(e.createTextNode("Group: see above " + l)), s;
	let u = {};
	for (let e in n) u[e] = 1;
	u[l] = 1;
	let d = i.doc ? i.doc() : null, f = xr.any(i, c("weight"), null, d), p = f ? Number(f.value) : 1;
	if (p > 3 || p < 0) return s.appendChild(U(e, `Form Group weight ${p} should be 0-3`));
	s.setAttribute("style", L.formGroupStyle[p]), s.style.display = "flex", s.style.flexDirection = "column", s.class = "form-weight-" + p;
	let m = xr.any(i, c("parts"), null, d), h;
	if (m ? h = m.elements : (m = xr.each(i, c("part"), null, d), h = Ar(m)), !m) return s.appendChild(U(e, "No parts to form! "));
	for (let t = 0; t < h.length; t++) {
		let i = h[t], c = xn(e, i);
		s.appendChild(c(e, null, u, r, i, a, function(t, i) {
			t && i && i.widget && i.widget === "select" && Sr(e, n, r, a, o, s, h), o(t, {
				widget: "group",
				change: i
			});
		}));
	}
	return s;
}, q[j.ui("Options").uri] = function(e, t, n, r, i, a, o) {
	let s = P, c = e.createElement("div"), l = i.doc ? i.doc() : null, u = j.ui;
	t && t.appendChild(c);
	let d = s.any(i, u("dependingOn"));
	d ||= j.rdf("type");
	let f = s.each(i, u("case"), null, l);
	f || c.appendChild(U(e, "No cases to Options form. "));
	let p;
	p = d.sameTerm(j.rdf("type")) ? Object.keys(s.findTypeURIs(r)).map((e) => F(e)) : s.each(r, d);
	for (let t = 0; t < f.length; t++) {
		let d = f[t], m = s.each(d, u("for"), null, l), h = !1;
		for (let e = 0; e < m.length; e++) for (let t of p) {
			let n = m[e];
			(t.sameTerm(m) || t.termType === n.termType && t.value === n.value) && (h = !0);
		}
		if (h) {
			let t = s.the(d, u("use"));
			if (t) Er(e, c, n, r, t, a, o);
			else return c.appendChild(U(e, "No \"use\" part for case in form " + i)), c;
			break;
		}
	}
	return c;
}, q[j.ui("Multiple").uri] = function(e, t, n, r, i, a, o) {
	function s(e) {
		return e.map((e) => e.toString().slice(-7)).join(", ");
	}
	async function c() {
		let t = X(a);
		if (y) O(), E.elements.push(t), await A();
		else {
			let n = x ? [_(t, b, r, a)] : [_(r, b, t, a)];
			try {
				await f.updater.update([], n);
			} catch (t) {
				let n = "Error adding to unordered multiple: " + t;
				m.appendChild(U(e, n)), be(n);
			}
			M();
		}
	}
	function u(t) {
		async function i() {
			if (y) {
				z("pre delete: " + s(E.elements));
				for (let e = 0; e < E.elements.length; e++) if (E.elements[e].sameTerm(t)) {
					E.elements.splice(e, 1), await A();
					return;
				}
			} else if (f.holds(r, b, t, a)) {
				let n = [_(r, b, t, a)];
				f.updater.update(n, [], function(t, n, r) {
					n ? T.removeChild(u) : T.appendChild(U(e, "Multiple: delete failed: " + r));
				});
			}
		}
		async function c(e, n) {
			z("pre move: " + s(E.elements));
			let r;
			for (r = 0; r < E.elements.length && !E.elements[r].sameTerm(t); r++);
			if (r === E.elements.length && alert("list move: not found element for " + t), n) {
				if (r === 0) {
					alert("@@ boop - already at top   -temp message");
					return;
				}
				E.elements.splice(r - 1, 2, E.elements[r], E.elements[r - 1]);
			} else {
				if (r === E.elements.length - 1) {
					alert("@@ boop - already at bottom   -temp message");
					return;
				}
				E.elements.splice(r, 2, E.elements[r + 1], E.elements[r]);
			}
			await A();
		}
		function l(e, n) {
			z(`Item done callback for item ${t.toString()}`), e || be("  Item done callback: Error: " + n), o(e, n);
		}
		I("Multiple: render object: " + t);
		let u = xn(e, w)(e, null, n, t, w, a, l);
		if (u.subject = t, f.updater.editable(a.uri) && (Ht(e, u, S, i), y)) {
			let t = e.createElement("div");
			t.style.display = "grid", t.style.gridTemplateColumns = "auto 3em", t.style.gridTemplateRows = "50% 50%";
			let n = K(e, W.iconBase + "noun_1369237.svg", "Move Up", async (e) => c(e, !0)), r = K(e, W.iconBase + "noun_1369241.svg", "Move Down", async (e) => c(e, !1)), i = e.createElement("div");
			return i.appendChild(u), t.appendChild(i), t.appendChild(n), t.appendChild(r), n.style.gridColumn = 2, r.style.gridColumn = 2, n.style.gridRow = 1, r.style.padding = "0em", n.style.padding = "0em", r.style.gridRow = 2, i.style.gridColumn = 1, i.style.gridRowStart = "span 2", t;
		}
		return u;
	}
	let d = W.iconBase + "noun_19460_green.svg", f = P, p = i.doc ? i.doc() : null, m = e.createElement("div"), h = m, g = j.ui;
	t && t.appendChild(m);
	let v = f.any(i, g("ordered")), y = v ? k.toJS(v) : !1, b = f.any(i, g("property")), x = f.anyJS(i, g("reverse"), null, p);
	if (!b) return m.appendChild(U(e, "No property to multiple: " + i)), h;
	let S = f.any(i, g("label"));
	S ||= R(b);
	let C = f.any(i, g("min"));
	C = C ? 0 + C.value : 0;
	let w = f.any(i, g("part"));
	if (!w) return m.appendChild(U(e, "No part to multiple: " + i)), h;
	let T = m.appendChild(e.createElement("div"));
	T.style.display = "flex", T.style.flexDirection = "column";
	let E, D;
	if (D = x ? f.any(null, b, r, a) : f.any(r, b, null, a), y ? (E = x ? f.any(null, b, r, a) : f.any(r, b, null, a), D = E ? E.elements : []) : (D = x ? f.each(null, b, r, a) : f.each(r, b, null, a), E = null), f.updater.editable(a.uri)) {
		let t = m.appendChild(e.createElement("div"));
		t.style.padding = "0.5em";
		let n = t.appendChild(e.createElement("img"));
		n.setAttribute("src", d), n.setAttribute("style", "margin: 0.2em; width: 1.5em; height:1.5em"), n.title = "Click to add another " + S;
		let r = e.createElement("span");
		r.textContent = (D.length === 0 ? "Add another " : "Add ") + S, t.addEventListener("click", async (e) => {
			await c();
		}, !0), t.appendChild(r);
	}
	function O() {
		E || (E = new l(), x ? f.add(E, b, r, a) : f.add(r, b, E, a));
	}
	async function A() {
		z("save list: " + s(E.elements)), O();
		try {
			await f.fetcher.putBack(a);
		} catch (t) {
			m.appendChild(U(e, "Error trying to put back a list: " + t));
			return;
		}
		M();
	}
	function M() {
		let e;
		if (y) {
			let t = x ? f.the(null, b, r, a) : f.the(r, b, null, a);
			e = t ? t.elements : [];
		} else e = x ? f.each(null, b, r, a) : f.each(r, b, null, a), e.sort();
		le(T, e, u);
	}
	T.refresh = M, M();
	async function ee() {
		let e = C - D.length;
		if (e > 0) {
			for (let t = 0; t < e; t++) z("Adding extra: min " + C), await c();
			await A();
		}
	}
	return ee().then(() => {
		z(" Multiple render: async stuff ok");
	}, (e) => {
		be(" Multiple render: async stuff fails. #### ", e);
	}), h;
}, q[j.ui("PhoneField").uri] = On, q[j.ui("EmailField").uri] = On, q[j.ui("ColorField").uri] = On, q[j.ui("DateField").uri] = On, q[j.ui("DateTimeField").uri] = On, q[j.ui("TimeField").uri] = On, q[j.ui("NumericField").uri] = On, q[j.ui("IntegerField").uri] = On, q[j.ui("DecimalField").uri] = On, q[j.ui("FloatField").uri] = On, q[j.ui("TextField").uri] = On, q[j.ui("SingleLineTextField").uri] = On, q[j.ui("NamedNodeURIField").uri] = On, q[j.ui("MultiLineTextField").uri] = function(e, t, n, r, i, a, o) {
	let s = j.ui, c = P, l = i.doc ? i.doc() : null, u = c.any(i, s("property"));
	if (!u) return U(e, "No property to text field: " + i);
	let d = e.createElement("div");
	d.style.display = "flex", d.style.flexDirection = "row";
	let f = d.appendChild(e.createElement("div"));
	f.style.width = me.formFieldNameBoxWidth;
	let p = d.appendChild(e.createElement("div"));
	f.appendChild(En(e, u, i)), a = Dn(r, u, a);
	let m = c.anyJS(r, u, null, a) || "", h = c.updater.editable(a.uri), g = i && c.anyJS(i, j.ui("suppressEmptyUneditable"), null, l);
	!h && g && m === "" && (d.style.display = "none");
	let _ = Pr(e, c, r, u, a, o);
	return p.appendChild(_), t && t.appendChild(d), d;
};
function Cr(e, t, n, r, i, a, o, s) {
	let c = j.ui, l = P, u = l.any(i, c("property"));
	if (!u) {
		let n = U(e, "No property to boolean field: " + i);
		return t && t.appendChild(n), n;
	}
	let d = l.any(i, c("label"));
	d ||= R(u, !0), a = Dn(r, u, a);
	let f = l.any(r, u);
	f === void 0 && (f = !1);
	let p = _(r, u, !0, a), m = _(r, u, !1, a), h = zr(e, l, d, m, p, i, a, s);
	return t && t.appendChild(h), h;
}
q[j.ui("BooleanField").uri] = function(e, t, n, r, i, a, o) {
	return Cr(e, t, n, r, i, a, o, !1);
}, q[j.ui("TristateField").uri] = function(e, t, n, r, i, a, o) {
	return Cr(e, t, n, r, i, a, o, !0);
}, q[j.ui("Classifier").uri] = function(e, t, n, r, i, a, o) {
	let s = P, c = j.ui, l = s.any(i, c("category"));
	if (!l) return U(e, "No category for classifier: " + i);
	I("Classifier: dataDoc=" + a);
	let u = function(e, t) {
		return o(e || e, t);
	}, d = e.createElement("div");
	d.setAttribute("class", "classifierBox");
	let f = e.createElement("div");
	f.setAttribute("class", "formFieldName classifierBox-label"), f.appendChild(En(e, l, i)), d.appendChild(f);
	let p = e.createElement("div");
	p.setAttribute("class", "formFieldValue classifierBox-selectBox");
	let m = Rr(e, s, r, l, a, u);
	if (m && m.querySelectorAll) {
		let e = m.querySelectorAll("select");
		e.length && !s.updater.editable(a.uri) && e.forEach((e) => {
			e.readOnly = !0, e.style = L.textInputStyleUneditable;
		});
	}
	return p.appendChild(m), d.appendChild(p), t && t.appendChild(d), d;
}, q[j.ui("Choice").uri] = function(e, t, n, r, i, a, o) {
	let s = j.ui, c = P, l = i.doc ? i.doc() : null, u, d = e.createElement("div");
	d.setAttribute("class", "choiceBox"), t && t.appendChild(d);
	let f = e.createElement("div");
	f.setAttribute("class", "formFieldName choiceBox-label"), d.appendChild(f);
	let p = e.createElement("div");
	p.setAttribute("class", "formFieldValue choiceBox-selectBox"), d.appendChild(p);
	let m = c.any(i, s("property"));
	if (!m) return d.appendChild(U(e, "No property for Choice: " + i));
	f.appendChild(En(e, m, i));
	let h = c.any(i, s("from"));
	if (!h) return U(e, "No 'from' for Choice: " + i);
	let g = c.any(i, s("use")), v = {
		form: i,
		subForm: g,
		disambiguate: !1
	};
	function y(e) {
		let t = [], n;
		t = c.each(void 0, j.rdf("type"), h, l);
		for (let n in Hr(c, h, e)) t.push(c.fromNT(n));
		if (h.sameTerm(j.rdfs("Class"))) for (u in tn()) t.push(c.sym(u));
		else if (h.sameTerm(j.rdf("Property"))) {
			for (u in n = nn(c), n.op) t.push(c.fromNT(u));
			for (u in n.dp) t.push(c.fromNT(u));
			v.disambiguate = !0;
		} else if (h.sameTerm(j.owl("ObjectProperty"))) {
			for (u in n = nn(c), n.op) t.push(c.fromNT(u));
			v.disambiguate = !0;
		} else if (h.sameTerm(j.owl("DatatypeProperty"))) {
			for (u in n = nn(c), n.dp) t.push(c.fromNT(u));
			v.disambiguate = !0;
		}
		return t;
	}
	c.any(i, s("canMintNew")) && (v.mint = "* Create new *");
	let b = c.any(i, s("multiselect"));
	b && (v.multiSelect = !0);
	let x = c.each(i, s("search-full-store")).length ? null : a, S;
	return p.refresh = function() {
		let t = c.each(r, m, null, a).map((e) => e.value), n = y(x);
		if (n.push(t), n = jr(n), S = Br(e, p, c, r, m, n, t, h, v, a, o), p.innerHTML = "", p.appendChild(S), b) {
			let n = new _r({
				placeholder: S.selected,
				select: S,
				container: p,
				textField: "textField",
				valueField: "valueField"
			});
			n.init(), n.subscribe(function(n) {
				if (n.action === "REMOVE_OPTION" && (t = t.filter(function(e) {
					return e !== n.value;
				})), n.action === "CLEAR_ALL_OPTIONS" && (t = []), n.action === "ADD_OPTION") {
					if ((n.value + "").includes("Create new")) {
						let n = X(a), i = [];
						i.push(_(r, m, c.sym(n), a)), h && i.push(_(n, j.rdf("type"), c.sym(h), a)), g && wr(e, p, {}, F(n), g, a, function(r, a) {
							r ? (c.updater.update([], i, function(t, n, r) {
								n || p.appendChild(U(e, "Error updating select: " + r));
							}), t.push(n), o && o(r, {
								widget: "select",
								event: "new"
							})) : p.appendChild(U(e, "Error updating data in field of select: " + a));
						});
					} else t.push(n.value);
				}
				S.update(t);
			});
		}
	}, p.refresh(), S && S.refresh && S.refresh(), d;
};
function wr(e, t, n, r, i, a, o) {
	xn(e, i)(e, t, n, r, i, a, o);
}
q[j.ui("Comment").uri] = q[j.ui("Heading").uri] = function(e, t, n, r, i, a, o) {
	let s = j.ui, c = P, l = c.any(i, s("contents"));
	l ||= "Error: No contents in comment field.";
	let u = i.doc ? i.doc() : null, d = vn[bn(i)] || {}, f = e.createElement("div");
	t && t.appendChild(f);
	let p = f.appendChild(e.createElement(d.element));
	p.textContent = l, Cn(p, i);
	let m = c.anyJS(i, j.ui("suppressIfUneditable"), null, u), h = c.updater.editable(a.uri);
	return m && !h && (f.style.display = "none"), f;
};
function Tr(e, t, n, r, i) {
	let a = e.createElement("button");
	return a.setAttribute("type", "button"), a.innerHTML = "Edit " + R(j.ui("Form")), a.addEventListener("click", function(o) {
		Er(e, t, {}, n, j.ui("FormForm"), r, i).setAttribute("style", j.ui("FormForm").sameTerm(n) ? "background-color: #fee;" : "background-color: #ffffe7;"), a.parentNode.removeChild(a);
	}, !0), a;
}
function Er(e, t, n, r, i, a, o) {
	return xn(e, i)(e, t, n, r, i, a, o);
}
function Dr(e, t) {
	let n = e.each(void 0, j.rdf("range"), t);
	[
		j.rdfs("comment"),
		j.dc("title"),
		j.foaf("name"),
		j.foaf("homepage")
	].forEach(function(e) {
		n.push(e);
	});
	let r = e.each(void 0, j.rdf("type"), t);
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
function Or(e, t, n) {
	let r = [e.sym(t)];
	for (; r.length > 0;) {
		let t = r.shift(), i = e.each(t, n);
		if (I("Lists for " + t + ", " + n + ": " + i.length), i.length !== 0) return i;
		let a = e.each(t, j.rdfs("subClassOf"));
		for (let e = 0; e < a.length; e++) r.push(a[e]), I("findClosest: add super: " + a[e]);
	}
	return [];
}
function kr(e) {
	let t = P;
	I("formsFor: subject=" + e);
	let n = t.findTypeURIs(e), r;
	for (r in n) I("   type: " + r);
	let i = t.bottomTypeURIs(n), a = [];
	for (let e in i) I("candidatesFor: trying bottom type =" + e), a = a.concat(Or(t, e, j.ui("creationForm"))), a = a.concat(Or(t, e, j.ui("annotationForm")));
	return a;
}
function Ar(e) {
	let t = e.map(function(e) {
		return [xr.any(e, j.ui("sequence")) || 9999, e];
	});
	return t.sort(function(e, t) {
		return e[0] - t[0];
	}), t.map(function(e) {
		return e[1];
	});
}
function jr(e) {
	let t = e.map(function(e) {
		return [R(e).toLowerCase(), e];
	});
	return t.sort(), t.map(function(e) {
		return e[1];
	});
}
function Mr(e, t, n, r, i, a, o, s) {
	let c = e.createElement("button");
	return c.setAttribute("type", "button"), c.innerHTML = "New " + R(i), c.addEventListener("click", function(l) {
		c.parentNode.appendChild(Nr(e, t, n, r, i, a, o, s));
	}, !1), c;
}
function Nr(e, t, n, r, i, a, o, s) {
	let c = e.createElement("form");
	if (!a) {
		let n = Or(t, i.uri, j.ui("creationForm"));
		if (n.length === 0) {
			let t = c.appendChild(e.createElement("p"));
			t.textContent = "I am sorry, you need to provide information about a " + R(i) + " but I don't know enough information about those to ask you.";
			let n = c.appendChild(e.createElement("button"));
			return n.setAttribute("type", "button"), n.setAttribute("style", "float: right;"), n.innerHTML = "Goto " + R(i), n.addEventListener("click", function(t) {
				e.outlineManager.GotoSubject(i, !0, void 0, !0, void 0);
			}, !1), c;
		}
		I("lists[0] is " + n[0]), a = n[0];
	}
	I("form is " + a), c.setAttribute("style", `border: 0.05em solid ${me.formBorderColor}; color: ${me.formBorderColor}`), c.innerHTML = "<h3>New " + R(i) + "</h3>";
	let l = xn(e, a), u = X(o), d = !1, f = function(a, l) {
		if (!a) return s(a, l);
		let f = [];
		n && !t.holds(n, r, u, o) && f.push(_(n, r, u, o)), n && !t.holds(u, j.rdf("type"), i, o) && f.push(_(u, j.rdf("type"), i, o)), f.length ? t.updater.update([], f, p) : s(!0, l), d ||= c.appendChild(rn(e, u));
	};
	function p(e, t, n) {
		return s(t, n);
	}
	return ge("paneUtils Object is " + u), an(e, l(e, c, {}, u, a, o, f)).setAttribute("style", "float: right;"), c.AJAR_subject = u, c;
}
function Pr(e, t, n, r, i, a) {
	let o = e.createElement("div"), s = t.anyJS(n, r, null, i) || "", c = e.createElement("textarea");
	o.appendChild(c), c.rows = s ? s.split("\n").length + 2 : 2, c.cols = 80, c.setAttribute("style", L.multilineTextInputStyle), s === null ? c.select() : c.value = s, o.refresh = function() {
		let e = t.any(n, r, null, i);
		e && e.value !== c.value && (c.value = e.value);
	};
	function l(s) {
		d.disabled = !0, d.setAttribute("style", "visibility: hidden; float: right;"), c.disabled = !0, c.style.color = me.textInputColorPending;
		let l = t.statementsMatching(n, r, null, i), u = _(n, r, c.value, i);
		t.updater.update(l, u, function(t, n, r) {
			n ? (c.style.color = me.textInputColor, c.disabled = !1) : o.appendChild(U(e, "Error (while saving change to " + i.uri + "): " + r)), a && a(n, r);
		});
	}
	let u = t.updater.editable(i.uri), d;
	return u ? (d = Wt(e, l), d.disabled = !0, d.style.visibility = "hidden", d.style.float = "right", o.appendChild(d), c.addEventListener("keyup", function(e) {
		c.style.color = "green", d && (d.disabled = !1, d.style.visibility = "");
	}, !0), c.addEventListener("change", l, !0)) : (c.disabled = !0, c.style.backgroundColor = me.textInputBackgroundColorUneditable), o;
}
function Fr(e, t, n, r, i, a, o, s) {
	I("Select list length now " + i.length);
	let c = 0, l = {}, u = t.updater.editable(o.uri);
	for (let e = 0; e < i.length; e++) {
		let t = i[e];
		t.uri || B(`makeSelectForClassifierOptions: option does not have an uri: ${t}, with predicate: ${r}`), !(!t.uri || t.uri in l) && (l[t.uri] = !0, c++);
	}
	if (c === 0 && !a.mint) return U(e, "Can't do selector with no options, subject= " + n + " property = " + r + ".");
	I("makeSelectForClassifierOptions: dataDoc=" + o);
	let d, f = function() {
		return d = {}, r.sameTerm(j.rdf("type")) ? d = t.findTypeURIs(n) : t.each(n, r, null, o).forEach(function(e) {
			d[e.uri] = !0;
		}), d;
	};
	d = f();
	let p = function(i) {
		m.disabled = !0;
		let c = [], l = [], u = function(e) {
			t.holds(n, r, e, o) && c.push(_(n, r, e, o));
		}, p;
		for (let i = 0; i < m.options.length; i++) {
			let c = m.options[i];
			if (c.selected && c.AJAR_mint) {
				if (a.mintClass) {
					let i = Nr(e, t, n, r, a.mintClass, null, o, function(e, t) {
						e || s(e, t, { change: "new" });
					});
					m.parentNode.appendChild(i), p = i.AJAR_subject;
				} else p = X(o);
				l.push(_(n, r, p, o)), a.mintStatementsFun && (l = l.concat(a.mintStatementsFun(p)));
			}
			c.AJAR_uri && (c.selected && !(c.AJAR_uri in d) && l.push(_(n, r, t.sym(c.AJAR_uri), o)), !c.selected && c.AJAR_uri in d && u(t.sym(c.AJAR_uri)), c.selected && (m.currentURI = c.AJAR_uri));
		}
		let h = m.subSelect;
		for (; h && h.currentURI;) u(t.sym(h.currentURI)), h = h.subSelect;
		for (h = m.superSelect; h && h.currentURI;) u(t.sym(h.currentURI)), h = h.superSelect;
		function g(e, t) {
			s(e, {
				widget: "select",
				event: "new"
			});
		}
		ge("makeSelectForClassifierOptions: data doc = " + o), t.updater.update(c, l, function(t, n, r) {
			if (d = f(), n) m.disabled = !1, p && xn(e, a.subForm)(e, m.parentNode, {}, p, a.subForm, o, g);
			else return m.parentNode.appendChild(U(e, "Error updating data in select: " + r));
			s && s(n, {
				widget: "select",
				event: "change"
			});
		});
	}, m = e.createElement("select");
	m.setAttribute("style", L.formSelectStyle), a.multiple && m.setAttribute("multiple", "true"), m.currentURI = null, m.refresh = function() {
		d = f();
		for (let e = 0; e < m.children.length; e++) {
			let t = m.children[e];
			t.AJAR_uri && (t.selected = t.AJAR_uri in d);
		}
		m.disabled = !1;
	};
	for (let n in l) {
		let r = t.sym(n), i = e.createElement("option");
		a.disambiguate ? i.appendChild(e.createTextNode(he(r, !0))) : i.appendChild(e.createTextNode(R(r, !0)));
		let o = t.any(r, t.sym("http://www.w3.org/ns/ui#backgroundColor"));
		o && i.setAttribute("style", "background-color: " + o.value + "; "), i.AJAR_uri = n, n in d && (i.setAttribute("selected", "true"), m.currentURI = n), m.appendChild(i);
	}
	if (u && a.mint) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(a.mint)), t.AJAR_mint = !0, m.insertBefore(t, m.firstChild);
	}
	if (m.currentURI == null && !a.multiple) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(a.nullLabel)), m.insertBefore(t, m.firstChild), t.selected = !0;
	}
	return u && m.addEventListener("change", p, !1), m;
}
function Ir(e, t, n, r, i, a, o, s) {
	I("Select list length now " + i.length);
	let c = 0, l = {}, u = t.updater.editable(o.uri);
	for (let e = 0; e < i.length; e++) {
		let t = i[e];
		t.uri || B(`makeSelectForOptions: option does not have an uri: ${t}, with predicate: ${r}`), !(!t.uri || t.uri in l) && (l[t.uri] = !0, c++);
	}
	if (c === 0) return U(e, "Can't do selector with no options, subject= " + n + " property = " + r + ".");
	I("makeSelectForOptions: dataDoc=" + o);
	let d, f = function() {
		return d = {}, r.sameTerm(j.rdf("type")) ? d = t.findTypeURIs(n) : t.each(n, r, null, o).forEach(function(e) {
			e.uri && (d[e.uri] = !0);
		}), d;
	};
	d = f();
	let p = function(i) {
		m.disabled = !0;
		let a = [], c = [], l = function(e) {
			t.holds(n, r, e, o) && a.push(_(n, r, e, o));
		};
		for (let e = 0; e < m.options.length; e++) {
			let i = m.options[e];
			i.AJAR_uri && (i.selected && !(i.AJAR_uri in d) && c.push(_(n, r, t.sym(i.AJAR_uri), o)), !i.selected && i.AJAR_uri in d && l(t.sym(i.AJAR_uri)), i.selected && (m.currentURI = i.AJAR_uri));
		}
		let u = m.subSelect;
		for (; u && u.currentURI;) l(t.sym(u.currentURI)), u = u.subSelect;
		for (u = m.superSelect; u && u.currentURI;) l(t.sym(u.currentURI)), u = u.superSelect;
		ge("selectForOptions: data doc = " + o), t.updater.update(a, c, function(t, n, r) {
			if (d = f(), n) m.disabled = !1;
			else return m.parentNode.appendChild(U(e, "Error updating data in select: " + r));
			s && s(n, {
				widget: "select",
				event: "change"
			});
		});
	}, m = e.createElement("select");
	m.setAttribute("style", L.formSelectStyle), m.currentURI = null, m.refresh = function() {
		d = f();
		for (let e = 0; e < m.children.length; e++) {
			let t = m.children[e];
			t.AJAR_uri && (t.selected = t.AJAR_uri in d);
		}
		m.disabled = !1;
	};
	for (let n in l) {
		let r = t.sym(n), i = e.createElement("option");
		a.disambiguate ? i.appendChild(e.createTextNode(he(r, !0))) : i.appendChild(e.createTextNode(R(r, !0)));
		let o = t.any(r, t.sym("http://www.w3.org/ns/ui#backgroundColor"));
		o && i.setAttribute("style", "background-color: " + o.value + "; "), i.AJAR_uri = n, n in d && (i.setAttribute("selected", "true"), m.currentURI = n), m.appendChild(i);
	}
	if (!m.currentURI) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(a.nullLabel)), m.insertBefore(t, m.firstChild), t.selected = !0;
	}
	return u && m.addEventListener("change", p, !1), m;
}
function Lr(e, t, n, r, i, a) {
	let o = t.any(r, j.owl("disjointUnionOf")), s, c = !1;
	return o ? s = o.elements : (s = t.each(void 0, j.rdfs("subClassOf"), r), c = !0), I("Select list length " + s.length), s.length === 0 ? U(e, "Can't do " + (c ? "multiple " : "") + "selector with no subclasses of category: " + r) : s.length === 1 ? U(e, "Can't do " + (c ? "multiple " : "") + "selector with only 1 subclass of category: " + r + ":" + s[1]) : Fr(e, t, n, j.rdf("type"), s, {
		multiple: c,
		nullLabel: "* Select type *"
	}, i, a);
}
function Rr(e, t, n, r, i, a) {
	function o() {
		c &&= (s.removeChild(c), null), u.currentURI && t.any(t.sym(u.currentURI), j.owl("disjointUnionOf")) && (c = Rr(e, t, n, t.sym(u.currentURI), i, a), u.subSelect = c.firstChild, u.subSelect.superSelect = u, s.appendChild(c));
	}
	let s = e.createElement("span"), c = null;
	function l(e, t) {
		e && o(), a(e, t);
	}
	let u = Lr(e, t, n, r, i, l);
	return s.appendChild(u), o(), s;
}
function zr(e, t, n, r, i, a, o, s) {
	let c = e.createElement("div"), l = Tn(e, t, c, a, n), u = t.updater.editable(o.uri), d = e.createElement("button"), f = d;
	d.style = L.checkboxInputStyle, l.appendChild(d);
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
			if (n && l) return c.appendChild(U(e, "Inconsistent data in dataDoc!\n" + i + " and\n" + r)), c;
			if (!n && !l) {
				n = null;
				let e = t.any(a, j.ui("default"));
				o = e ? e.value === "1" : s ? null : !1;
			}
		}
		d.state = n, d.textContent = {
			true: vr,
			false: s ? yr : " ",
			null: br
		}[o];
	}
	if (h(), !u) return c;
	let g = !1;
	return d.addEventListener("click", function(n) {
		if (g) return;
		g = !0, d.disabled = !0;
		let a = !1, o = function() {
			return !a && (a = !0, g = !1, d.disabled = !1, !0);
		}, l = function(t) {
			f.style.color = "#000", f.style.backgroundColor = "#fee", c.appendChild(U(e, `Checkbox: Error updating dataDoc from ${d.state} to ${d.newState}:\n\n${t}`));
		};
		f.style.color = "#bbb";
		let u = d.state === !0 ? i : d.state === !1 ? r : [];
		d.newState = d.state === null ? !0 : d.state === !0 ? !1 : !s || null;
		let p = d.newState === !0 ? i : d.newState === !1 ? r : [];
		z(`  Deleting  ${u}`), z(`  Inserting ${p}`);
		try {
			let e = t.updater.update(u, p, function(e, n, r) {
				o() && (n ? (f.style.color = "#000", d.state = d.newState, d.textContent = {
					true: vr,
					false: yr,
					null: br
				}[d.state]) : (u.why && t.holds(u.subject, u.predicate, u.object, u.why) && z(" @@@@@ weird if 409 - does hold statement"), l(r)));
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
	return F(e.uri + "#id" + ("" + t.getTime()));
}
function Br(e, t, n, r, i, a, o, s, c, l, u) {
	let d = {}, f = n.updater.editable(l.uri);
	for (let e = 0; e < a.length; e++) {
		let t = a[e];
		!t.uri || t.uri in d || (d[t.uri] = !0);
	}
	if (Object.keys(d).length === 0 && !c.mint) return U(e, "Can't do selector with no options, subject= " + r + " property = " + i + ".");
	I("makeSelectForChoice: dataDoc=" + l);
	function p() {
		let e = "--- choice ---";
		return i && i.termType !== "BlankNode" && (e = "* Select for property: " + R(i) + " *"), r && r.termType !== "BlankNode" && (e = "* Select for " + R(r, !0) + " *"), e;
	}
	function m() {
		let t = e.createElement("option");
		return t.appendChild(e.createTextNode(p())), t.disabled = !0, t.value = !0, t.hidden = !0, t.selected = !0, t;
	}
	let h = function(e) {
		t.removeChild(t.lastChild), g.refresh();
	}, g = e.createElement("select");
	g.setAttribute("style", L.formSelectStyle), g.setAttribute("id", "formSelect"), g.currentURI = null;
	for (let e in d) g.appendChild(v(e));
	if (f && c.mint) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(c.mint)), t.AJAR_mint = !0, g.insertBefore(t, g.firstChild);
	}
	g.children.length === 0 && g.insertBefore(m(), g.firstChild), g.update = function(t) {
		o = t;
		let a = [], c = [], d = function(e) {
			n.holds(r, i, e, l) && a.push(_(r, i, e, l));
		}, f = function(e) {
			n.holds(r, i, e, l) || c.push(_(r, i, e, l)), s && !n.holds(e, j.rdf("type"), n.sym(s), l) && c.push(_(e, j.rdf("type"), n.sym(s), l));
		}, p = n.each(r, i, null, l).map((e) => e.value);
		for (let e of p) Vr(e, o) || d(F(e));
		for (let e of o) e in p || f(F(e));
		n.updater.update(a, c, function(t, n, r) {
			if (!n) return g.parentNode.appendChild(U(e, "Error updating data in select: " + r));
			g.refresh(), u && u(n, {
				widget: "select",
				event: "change"
			});
		});
	}, g.refresh = function() {
		g.disabled = !0;
		let a = [], d;
		for (let t = 0; t < g.options.length; t++) {
			let f = g.options[t];
			if (f.selected && f.AJAR_mint) {
				if (c.mintClass) {
					let t = Nr(e, n, r, i, s, c.subForm, l, function(e, t) {
						e || u(e, t, { change: "new" });
					});
					g.parentNode.appendChild(t), d = t.AJAR_subject;
				} else d = X(l);
				a.push(_(r, i, n.sym(d), l)), s && a.push(_(d, j.rdf("type"), n.sym(s), l)), c.mintStatementsFun && (a = a.concat(c.mintStatementsFun(d))), g.currentURI = d;
			}
			f.AJAR_uri && (f.selected && Vr(f.AJAR_uri, o) && (g.currentURI = f.AJAR_uri), Vr(f.AJAR_uri, o) || f.removeAttribute("selected"), Vr(f.AJAR_uri, o) && f.setAttribute("selected", "true"));
		}
		ge("selectForOptions: data doc = " + l), g.currentURI && c.subForm && !c.multiSelect && wr(e, t, {}, F(g.currentURI), c.subForm, l, function(r, i) {
			r ? (n.updater.update([], a, function(n, r, i) {
				r || t.appendChild(U(e, "Error updating select: " + i));
			}), u && u(r, {
				widget: "select",
				event: "new"
			})) : t.appendChild(U(e, "Error updating data in field of select: " + i));
		}), g.disabled = !1;
	};
	function v(t) {
		let r = e.createElement("option"), i = n.sym(t), a;
		a = c.disambiguate ? he(i, !0) : R(i, !0), r.appendChild(e.createTextNode(a)), r.setAttribute("value", t);
		let s = n.any(i, n.sym("http://www.w3.org/ns/ui#backgroundColor"));
		return s && r.setAttribute("style", "background-color: " + s.value + "; "), r.AJAR_uri = t, Vr(i.value, o) && r.setAttribute("selected", "true"), r;
	}
	return f && g.addEventListener("change", h, !1), g;
}
function Vr(e, t) {
	let n;
	for (n = 0; n < t.length; n++) if (t[n] === e) return !0;
	return !1;
}
function Hr(e, t, n) {
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
var Ur = /* @__PURE__ */ r({
	Group: () => lt,
	GroupBuilder: () => ut,
	GroupPicker: () => ct,
	PeoplePicker: () => st,
	Person: () => dt,
	addStyleSheet: () => pn,
	allClassURIs: () => tn,
	appendForm: () => Er,
	askName: () => Gt,
	attachmentList: () => Qt,
	basicField: () => On,
	buildCheckboxForm: () => zr,
	button: () => K,
	cancelButton: () => Ut,
	clearElement: () => Et,
	complain: () => Tt,
	continueButton: () => Wt,
	createLinkDiv: () => Yt,
	createLinkForURI: () => bt,
	createNameDiv: () => Jt,
	defaultAnnotationStore: () => en,
	deleteButtonWithCheck: () => Ht,
	editFormButton: () => Tr,
	errorMessageBlock: () => U,
	extractLogURI: () => Dt,
	faviconOrDefault: () => Bt,
	field: () => q,
	fieldFunction: () => xn,
	fieldLabel: () => En,
	fieldParams: () => vn,
	fieldStore: () => Dn,
	fileUploadButtonDiv: () => _n,
	findClosest: () => Or,
	findImage: () => Lt,
	findImageFromURI: () => It,
	formatDateTime: () => kt,
	formsFor: () => kr,
	iconForClass: () => Pt,
	imagesOf: () => Nt,
	index: () => cn,
	isAudio: () => mn,
	isImage: () => gn,
	isVideo: () => hn,
	linkButton: () => rn,
	linkIcon: () => yt,
	makeDescription: () => Pr,
	makeDraggable: () => rt,
	makeDropTarget: () => nt,
	makeSelectForCategory: () => Lr,
	makeSelectForChoice: () => Br,
	makeSelectForClassifierOptions: () => Fr,
	makeSelectForNestedCategory: () => Rr,
	makeSelectForOptions: () => Ir,
	mostSpecificClassURI: () => bn,
	newButton: () => Mr,
	newThing: () => X,
	openHrefInOutlineMode: () => $t,
	personTR: () => Kt,
	promptForNew: () => Nr,
	propertiesForClass: () => Dr,
	propertyTriage: () => nn,
	publicData: () => In,
	refreshTree: () => Zt,
	removeButton: () => an,
	renderAsDiv: () => Xt,
	renderAsRow: () => qt,
	renderAutoComplete: () => ur,
	renderAutocompleteControl: () => hr,
	renderNameValuePair: () => Tn,
	selectorPanel: () => on,
	selectorPanelRefresh: () => sn,
	setImage: () => zt,
	setName: () => Mt,
	setVisible: () => J,
	shortDate: () => Ot,
	shortTime: () => jt,
	sortByLabel: () => jr,
	sortBySequence: () => Ar,
	timestamp: () => At,
	uploadFiles: () => it
}), Wr = {
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
function Gr(e) {
	this.config = e || Wr;
}
Gr.prototype.listen = function() {
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
}, Gr.prototype.signup = function(e) {
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
var Kr = /* @__PURE__ */ r({
	ensureLoadedPreferences: () => ni,
	ensureLoadedProfile: () => ri,
	ensureLoggedIn: () => ti,
	filterAvailablePanes: () => hi,
	findAppInstances: () => ii,
	getUserRoles: () => mi,
	loginStatusBox: () => di,
	newAppInstance: () => pi,
	registrationControl: () => oi,
	registrationList: () => ci,
	renderScopeHeadingRow: () => si,
	renderSignInPopup: () => ui,
	scopeLabel: () => ai,
	selectWorkspace: () => fi
}), qr = D.store, { loadPreferences: Jr, loadProfile: Yr } = D.profile, { getScopedAppInstances: Xr, getRegistrations: Zr, loadAllTypeIndexes: Qr, getScopedAppsFromIndex: $r, deleteTypeIndexRegistration: ei } = D.typeIndex;
function ti(e) {
	let t = N.currentUser();
	return t ? (N.saveUser(t, e), Promise.resolve(e)) : new Promise((t) => {
		N.checkUser().then((n) => {
			if (n) return z(`logIn: Already logged in as ${n}`), t(e);
			if (!e.div || !e.dom) return t(e);
			let r = di(e.dom, (n) => {
				N.saveUser(n, e), t(e);
			});
			e.div.appendChild(r);
		}).catch((n) => {
			if (z(`logIn: session check failed, showing login (${n})`), !e.div || !e.dom) return t(e);
			let r = di(e.dom, (n) => {
				N.saveUser(n, e), t(e);
			});
			e.div.appendChild(r);
		});
	});
}
async function ni(e) {
	if (e.preferencesFile) return Promise.resolve(e);
	try {
		e = await ri(e);
		let t = await Jr(e.me);
		e.preferencesFile = t;
	} catch (t) {
		let n;
		if (t instanceof C) n = "Oops — you are not authenticated (properly logged in), so SolidOS cannot read your preferences file. Try logging out and then logging back in.", ue(n);
		else if (t instanceof ne) return n = `Unauthorized: Assuming preference file blocked for origin ${window.location.origin}`, e.preferencesFileError = n, e;
		else if (t instanceof A) return n = "You are not authorized to read your preference file. This may be because you are using an untrusted web app.", B(n), e;
		else if (t instanceof ee) return n = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", B(n), e;
		else if (t instanceof S) n = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", B(n);
		else if (t instanceof re) n = `Strange: Error ${t.status} trying to read your preference file.${t.message}`, ue(n);
		else throw Error(`(via loadPrefs) ${t}`);
		e.preferencesFileError = n;
	}
	return e;
}
async function ri(e) {
	if (e.publicProfile) return e;
	try {
		let t = await ti(e);
		if (!t.me) throw Error("Could not log in");
		e.publicProfile = await Yr(t.me);
	} catch (t) {
		throw e.div && e.dom && e.div.appendChild(U(e.dom, t.message)), Error(`Can't log in: ${t}`);
	}
	return e;
}
async function ii(e, t, n) {
	let r = e.me ? await Xr(t, e.me) : [];
	return n === !0 ? r = r.filter((e) => e.scope.label === "public") : n === !1 && (r = r.filter((e) => e.scope.label === "private")), e.instances = r.map((e) => e.instance), e;
}
function ai(e, t) {
	return `${e.me && e.me.sameTerm(t.agent) ? "" : R(t.agent) + " "}${t.label}`;
}
async function oi(e, t, n) {
	function r(e) {
		let r = Zr(t, n), i = r.length ? r[0] : X(e);
		return [_(i, j.solid("instance"), t, e), _(i, j.solid("forClass"), n, e)];
	}
	function i(t) {
		let n = r(t.index), i = `${ai(e, t)} link to this ${e.noun}`;
		return zr(e.dom, D.store, i, null, n, u, t.index);
	}
	let a = e.dom;
	if (!a || !e.div) throw Error("registrationControl: need dom and div");
	let o = a.createElement("div");
	e.div.appendChild(o), e.me = N.currentUser();
	let s = e.me;
	if (!s) return o.innerHTML = "<p style=\"margin:2em;\">(Log in to save a link to this)</p>", e;
	let c;
	try {
		c = await Qr(s);
	} catch (t) {
		let n;
		return e.div && e.preferencesFileError ? (n = "(Lists of stuff not available)", e.div.appendChild(a.createElement("p")).textContent = n) : e.div && (n = `registrationControl: Type indexes not available: ${t}`, e.div.appendChild(U(e.dom, t))), z(n), e;
	}
	o.innerHTML = "<table><tbody></tbody></table>", o.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;");
	let l = o.children[0].children[0], u = new g();
	for (let e of c) l.appendChild(a.createElement("tr")).appendChild(i(e));
	return e;
}
function si(e, t, n) {
	let r = {
		private: "#fee",
		public: "#efe"
	}, { dom: i } = e, a = ai(e, n), o = i.createElement("tr"), s = o.appendChild(i.createElement("td"));
	s.setAttribute("colspan", "3"), s.style.backgoundColor = r[n.label] || "white";
	let c = s.appendChild(i.createElement("h3"));
	return c.textContent = a + " links", c.style.textAlign = "left", o;
}
async function ci(e, t) {
	let n = e.dom, r = e.div, i = n.createElement("div");
	if (r.appendChild(i), e.me = N.currentUser(), !e.me) return i.innerHTML = "<p style=\"margin:2em;\">(Log in list your stuff)</p>", e;
	let a = await Qr(e.me);
	i.innerHTML = "<table><tbody></tbody></table>", i.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid #eee 0.5em;");
	let o = i.firstChild.firstChild;
	for (let r of a) {
		let i = si(e, qr, r);
		o.appendChild(i);
		let a = await $r(r, t.type || null);
		a.length === 0 && (i.style.display = "none");
		for (let e of a) {
			let t = Kt(n, j.solid("instance"), e.instance, { deleteFunction: async () => {
				await ei(e), o.removeChild(t);
			} });
			t.children[0].style.paddingLeft = "3em", o.appendChild(t);
		}
	}
	return e;
}
function li(e, t, n = {}) {
	n ||= {};
	let r = n.buttonStyle || L.signInAndUpButtonStyle, i = e.createElement("div"), a = "SolidSignInOrSignUpBox";
	z("widgets.signInOrSignUpBox"), i.setUserCallback = t, i.setAttribute("class", a), i.setAttribute("style", "display:flex;");
	let o = e.createElement("input");
	i.appendChild(o), o.setAttribute("type", "button"), o.setAttribute("value", "Log in"), o.setAttribute("style", `${r}${L.headerBannerLoginInput}` + L.signUpBackground), M.events.on("login", () => {
		let t = N.currentUser();
		if (t) {
			let n = t.uri, r = e.getElementsByClassName(a);
			z(`Logged in, ${r.length} panels to be serviced`);
			for (let t = 0; t < r.length; t++) {
				let i = r[t];
				if (i.setUserCallback) try {
					i.setUserCallback(n);
					let e = i.parentNode;
					e && e.removeChild(i);
				} catch (t) {
					z(`## Error satisfying login box: ${t}`), i.appendChild(U(e, t));
				}
			}
		}
	}), o.addEventListener("click", () => {
		let n = w();
		if (n) return t(n.uri);
		ui(e);
	}, !1);
	let s = e.createElement("input");
	return i.appendChild(s), s.setAttribute("type", "button"), s.setAttribute("value", "Sign Up for Solid"), s.setAttribute("style", `${r}${L.headerBannerLoginInput}` + L.signInBackground), s.addEventListener("click", function(e) {
		new Gr().signup().then(function(e) {
			z("signInOrSignUpBox signed up " + e), t(e);
		});
	}, !1), i;
}
function ui(e) {
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
			D.store.updater.flagAuthorizationMetadata();
			let t = new URL(window.location.href).hash;
			t && window.localStorage.setItem("preLoginRedirectHash", t), window.localStorage.setItem("loginIssuer", e);
			let n = new URL(window.location.href);
			n.hash = "", await M.login(e, n.href);
		} catch (e) {
			ue(e.message);
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
	p.innerText = "Or pick an identity provider from the list below:", p.setAttribute("style", "color: #888"), f.appendChild(p), se().forEach((t) => {
		let n = e.createElement("button");
		n.innerText = t.name, n.setAttribute("style", "height: 38px; margin-top: 10px"), n.addEventListener("click", () => {
			o(t.uri);
		}), f.appendChild(n);
	}), n.appendChild(f);
}
function di(e, t = null, n = {}) {
	let r = w(), i = e.createElement("div");
	function a(e) {
		e && (r = N.saveUser(e), i.refresh(), t && t(r.uri));
	}
	function o(e) {
		let n = r;
		M.logout().then(function() {
			let e = `Your WebID was ${n}. It has been forgotten.`;
			r = null;
			try {
				ue(e);
			} catch {
				window.alert(e);
			}
			i.refresh(), t && t(null);
		}, (e) => {
			ue("Fail to log out:" + e);
		});
	}
	function s(t, n) {
		let r = n.buttonStyle || L.signInAndUpButtonStyle, i = "WebID logout";
		if (t) {
			let e = D.store.any(t, j.foaf("nick")) || D.store.any(t, j.foaf("name"));
			e && (i = "Logout " + e.value);
		}
		let a = e.createElement("input");
		return a.setAttribute("type", "button"), a.setAttribute("value", i), a.setAttribute("style", `${r}`), a.addEventListener("click", o, !1), a;
	}
	i.refresh = function() {
		let t = M.webId;
		r = t ? D.store.sym(t) : null, (r && i.me !== r.uri || !r && i.me) && (Et(i), r ? i.appendChild(s(r, n)) : i.appendChild(li(e, a, n))), i.me = r ? r.uri : null;
	}, i.refresh();
	function c() {
		r = N.currentUser(), i.refresh();
	}
	return c(), M.events.on("login", c), M.events.on("logout", c), i.me = "99999", i.refresh(), i;
}
M.events.on("logout", async () => {
	let e = window.localStorage.getItem("loginIssuer");
	if (e) try {
		D.store.updater.flagAuthorizationMetadata();
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
function fi(e, t, n) {
	let r = t.noun, i = t.appPathSegment, a = w(), o = e.createElement("div"), s = {
		me: a,
		dom: e,
		div: o
	};
	function c(t, n) {
		o.appendChild(U(e, t, n));
	}
	function l(e) {
		let t = D.store.any(e, j.space("uriPrefix")), n;
		return n = t ? t.value : e.uri.split("#")[0], n.slice(-1) !== "/" && (z(`${i}: No / at end of uriPrefix ${n}`), n = `${n}/`), n += `${i}/id${(/* @__PURE__ */ new Date()).getTime()}/`, n;
	}
	function u(t) {
		async function i(n) {
			let r = p.appendChild(e.createElement("tr")).appendChild(e.createElement("td"));
			r.setAttribute("colspan", "3"), r.style.padding = "0.5em";
			let i = encodeURI(await Gt(e, D.store, r, j.solid("URL"), j.space("Workspace"), "Workspace")), a = X(t.preferencesFile), o = [_(t.me, j.space("workspace"), a, t.preferencesFile), _(a, j.space("uriPrefix"), i, t.preferencesFile)];
			if (!D.store.updater) throw Error("store has no updater");
			await D.store.updater.update([], o);
		}
		let a = t.me, s = t.preferencesFile, u = null, d = D.store.each(a, j.space("workspace"), void 0, s), f = D.store.each(a, j.space("storage"));
		d.length === 0 && f && (c(`You don't seem to have any workspaces. You have ${f.length} storage spaces.`, "white"), f.map(function(e) {
			return d = d.concat(D.store.each(e, j.ldp("contains"))), d;
		}).filter((e) => e.id ? ["public", "private"].includes(e.id().toLowerCase()) : "")), d.length === 1 && (c(`Workspace used: ${d[0].uri}`, "white"), u = l(d[0]));
		let p = e.createElement("table");
		p.setAttribute("style", "border-collapse:separate; border-spacing: 0.5em;"), o.appendChild(p), o.appendChild(e.createElement("hr"));
		let m = o.appendChild(e.createElement("p"));
		m.setAttribute("style", L.commentStyle), m.textContent = `Where would you like to store the data for the ${r}?
    Give the URL of the folder where you would like the data stored.
    It can be anywhere in solid world - this URI is just an idea.`;
		let h = o.appendChild(e.createElement("input"));
		h.setAttribute("type", "text"), h.setAttribute("style", L.textInputStyle), h.size = 80, h.label = "base URL", h.autocomplete = "on", u && (h.value = u), t.baseField = h, o.appendChild(e.createElement("br"));
		let g = o.appendChild(e.createElement("button"));
		g.setAttribute("style", L.buttonStyle), g.textContent = `Start new ${r} at this URI`, g.addEventListener("click", function(e) {
			let t = h.value.replace(" ", "%20");
			t.slice(-1) !== "/" && (t += "/"), n(null, t);
		}), d = d.filter(function(e) {
			return !D.store.holds(e, j.rdf("type"), j.space("MasterWorkspace"));
		});
		let v, y, b, x, S, C, w, T = "height: 3em; margin: 1em; padding: 1em white; border-radius: 0.3em;", E = `${T}border: 0px;`;
		for (let t = 0; t < d.length; t++) {
			S = d[t], x = e.createElement("tr"), t === 0 && (v = e.createElement("td"), v.setAttribute("rowspan", `${d.length}`), v.textContent = "Choose a workspace for this:", v.setAttribute("style", "vertical-align:middle;"), x.appendChild(v)), y = e.createElement("td"), C = D.store.anyValue(S, j.ui("style")), C ||= `color: black ; background-color: ${`#${(function(e) {
				return e.split("").reduce(function(e, t) {
					return e = (e << 5) - e + t.charCodeAt(0), e & e;
				}, 0);
			}(S.uri) & 16777215 | 12632256).toString(16)}`};`, y.setAttribute("style", E + C), x.target = S.uri;
			let r = D.store.any(S, j.rdfs("label"));
			r ||= S.uri.split("/").slice(-1)[0] || S.uri.split("/").slice(-2)[0], y.textContent = r || "???", x.appendChild(y), t === 0 && (b = e.createElement("td"), b.setAttribute("rowspan", `${d.length}1`), b.setAttribute("style", "width:50%;"), x.appendChild(b)), p.appendChild(x), w = D.store.any(S, j.rdfs("comment")), w = w ? w.value : "Use this workspace", y.addEventListener("click", function(t) {
				b.textContent = w ? w.value : "", b.setAttribute("style", E + C);
				let r = e.createElement("button");
				r.textContent = "Continue";
				let i = l(S);
				h.value = i, r.addEventListener("click", function(e) {
					r.disabled = !0, n(S, i), r.textContent = "---->";
				}, !0), b.appendChild(r);
			}, !0);
		}
		let O = e.createElement("tr");
		y = e.createElement("td"), y.setAttribute("style", T), y.textContent = "+ Make a new workspace", y.addEventListener("click", i), O.appendChild(y), p.appendChild(O);
	}
	return ni(s).then(u).catch((e) => {
		o.appendChild(U(s.dom, e));
	}), o;
}
function pi(e, t, n) {
	let r = function(e, t) {
		n(e, t);
	}, i = e.createElement("div"), a = e.createElement("button");
	return a.setAttribute("type", "button"), i.appendChild(a), a.innerHTML = `Make new ${t.noun}`, a.addEventListener("click", (n) => {
		i.appendChild(fi(e, t, r));
	}, !1), i.appendChild(a), i;
}
async function mi() {
	try {
		let { me: e, preferencesFile: t, preferencesFileError: n } = await ni({});
		if (!t || n) throw Error(n);
		return D.store.each(e, j.rdf("type"), null, t.doc());
	} catch (e) {
		B("Unable to fetch your preferences - this was the error: ", e);
	}
	return [];
}
async function hi(e) {
	let t = await mi();
	return e.filter((e) => gi(e, t));
}
function gi(e, t) {
	return (e.audience || []).reduce((e, n) => e && !!t.find((e) => e.equals(n)), !0);
}
//#endregion
//#region src/acl/add-agent-buttons.ts
var _i = class {
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
		return K(this.groupList.controller.dom, `${W.iconBase}noun_34653_green.svg`, "Add ...", () => {
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
		return K(this.groupList.controller.dom, W.iconBase + Pt["vcard:Individual"], "Add Person", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(j.vcard("Individual"), "person").then((e) => this.addPerson(e)).then(() => this.renderCleanup()).catch((e) => this.groupList.controller.renderStatus(e));
		});
	}
	renderGroupButton() {
		return K(this.groupList.controller.dom, W.iconBase + Pt["vcard:Group"], "Add Group", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(j.vcard("Group"), "group").then((e) => this.addGroup(e)).then(() => this.renderCleanup()).catch((e) => this.groupList.controller.renderStatus(e));
		});
	}
	renderNameForm(e, t) {
		return Gt(this.groupList.controller.dom, this.groupList.store, this.barElement, j.vcard("URI"), e, t);
	}
	renderPublicButton() {
		return K(this.groupList.controller.dom, W.iconBase + Pt["foaf:Agent"], "Add Everyone", () => this.addAgent(j.foaf("Agent").uri).then(() => this.groupList.controller.renderTemporaryStatus("Adding the general public to those who can read. Drag the globe to a different level to give them more access.")).then(() => this.renderCleanup()));
	}
	renderAuthenticatedAgentButton() {
		return K(this.groupList.controller.dom, `${W.iconBase}noun_99101.svg`, "Anyone logged In", () => this.addAgent(j.acl("AuthenticatedAgent").uri).then(() => this.groupList.controller.renderTemporaryStatus("Adding anyone logged in to those who can read. Drag the ID icon to a different level to give them more access.")).then(() => this.renderCleanup()));
	}
	renderBotButton() {
		return K(this.groupList.controller.dom, W.iconBase + "noun_Robot_849764.svg", "A Software Agent (bot)", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(j.schema("Application"), "bot").then((e) => this.addBot(e)).then(() => this.renderCleanup());
		});
	}
	renderAppsButton() {
		return K(this.groupList.controller.dom, `${W.iconBase}noun_15177.svg`, "A Web App (origin)", (e) => {
			this.renderSimplifiedBar(e.target);
			let t = {
				div: this.barElement,
				dom: this.groupList.controller.dom
			}, n = this.renderAppsTable(t).catch((e) => this.groupList.controller.renderStatus(e));
			this.renderAppsView();
			let r = this.renderNameForm(j.schema("WebApplication"), "webapp domain").then((e) => this.getOriginFromName(e));
			Promise.race([n, r]).then((e) => {
				e && this.groupList.addNewURI(e);
			}).then(() => this.renderCleanup());
		});
	}
	renderAppsView() {
		let e = this.groupList.controller.context.session.paneRegistry.byName("trustedApplications");
		if (e) {
			let t = e.render(null, this.groupList.controller.context);
			t.setAttribute("style", L.trustedAppController);
			let n = Ut(this.groupList.controller.dom, () => this.renderCleanup());
			n.setAttribute("style", L.trustedAppCancelButton), t.insertBefore(n, t.firstChild), this.barElement.appendChild(t);
		}
	}
	async renderAppsTable(e) {
		await ri(e);
		let t = this.groupList.store.each(e.me, j.acl("trustedApp")), n = t.flatMap((e) => this.groupList.store.each(e, j.acl("origin")));
		return this.barElement.appendChild(this.groupList.controller.dom.createElement("p")).textContent = `You have ${n.length} selected web apps.`, new Promise((e, n) => {
			let r = this.barElement.appendChild(this.groupList.controller.dom.createElement("table"));
			r.setAttribute("style", L.trustedAppAddApplicationsTable), t.forEach((t) => {
				let i = this.groupList.store.any(t, j.acl("origin"));
				i || n(/* @__PURE__ */ Error(`Unable to pick app: ${t.value}`));
				let a = Kt(this.groupList.controller.dom, j.acl("origin"), i, {}), o = this.groupList.controller.dom.createElement("table"), s = o.appendChild(this.groupList.controller.dom.createElement("tr"));
				s.appendChild(this.groupList.controller.dom.createElement("td")).appendChild(a);
				let c = s.appendChild(this.groupList.controller.dom.createElement("td"));
				c.textContent = `Give access to ${this.groupList.controller.noun} ${R(this.groupList.controller.subject)}?`, s.appendChild(this.groupList.controller.dom.createElement("td")).appendChild(Wt(this.groupList.controller.dom, () => e(i.value))), r.appendChild(o);
			});
		});
	}
	renderCleanup() {
		this.renderBar(), this.groupList.render();
	}
	async addPerson(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		z(`Adding to ACL person: ${e}`), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addGroup(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		z("Adding to ACL group: " + e), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addAgent(e) {
		await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addBot(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		z("Adding to ACL bot: " + e), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async getOriginFromName(e) {
		if (!e) return Promise.resolve();
		if (!e.match(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i)) return Promise.reject(/* @__PURE__ */ Error("Not a domain name"));
		let t = "https://" + e;
		return z("Adding to ACL origin: " + t), this.toggleBar(), t;
	}
	toggleBar() {
		this.isExpanded = !this.isExpanded;
	}
}, vi = j.acl, yi = {
	13: "Owners",
	9: "Owners (write locked)",
	5: "Editors",
	3: "Posters",
	2: "Submitters",
	1: "Viewers"
}, bi = {
	13: !0,
	5: !0,
	3: !0,
	2: !0,
	1: !0
}, xi = {
	13: "can read, write, and control sharing.",
	9: "can read and control sharing, currently write-locked.",
	5: "can read and change information",
	3: "can add new information, and read but not change existing information",
	2: "can add new information but not read any",
	1: "can read but not change information"
}, Si = class {
	defaults;
	byCombo;
	aclMap;
	addAgentButton;
	rootElement;
	_store;
	constructor(e, t, n, r, i = {}) {
		this.doc = e, this.aclDoc = t, this.controller = n, this._options = i, this.defaults = this._options.defaults || !1, this._store = r, this.aclMap = Ce(e, t, r, this.defaults), this.byCombo = De(this.aclMap), this.addAgentButton = new _i(this), this.rootElement = this.controller.dom.createElement("div"), this.rootElement.setAttribute("style", L.accessGroupList);
	}
	get store() {
		return this._store;
	}
	set store(e) {
		this._store = e, this.aclMap = Ce(this.doc, this.aclDoc, e, this.defaults), this.byCombo = De(this.aclMap);
	}
	render() {
		return this.rootElement.innerHTML = "", this.renderGroups().forEach((e) => this.rootElement.appendChild(e)), this.controller.isEditable && this.rootElement.appendChild(this.addAgentButton.render()), this.rootElement;
	}
	renderGroups() {
		let e = [];
		for (let t = 15; t > 0; t--) {
			let n = Ci(t);
			(this.controller.isEditable && bi[t] || this.byCombo[n]) && e.push(this.renderGroup(t, n));
		}
		return e;
	}
	renderGroup(e, t) {
		let n = this.controller.dom.createElement("div");
		return n.setAttribute("style", L.accessGroupListItem), nt(n, (e) => this.handleDroppedUris(e, t).then(() => this.controller.render()).catch((e) => this.controller.renderStatus(e))), this.renderGroupElements(e, t).forEach((e) => n.appendChild(e)), n;
	}
	renderGroupElements(e, t) {
		let n = this.controller.dom.createElement("div");
		if (n.setAttribute("style", L.group), this.controller.isEditable) switch (e) {
			case 1:
				n.setAttribute("style", L.group1);
				break;
			case 2:
				n.setAttribute("style", L.group2);
				break;
			case 3:
				n.setAttribute("style", L.group3);
				break;
			case 5:
				n.setAttribute("style", L.group5);
				break;
			case 9:
				n.setAttribute("style", L.group9);
				break;
			case 13:
				n.setAttribute("style", L.group13);
				break;
			default: n.setAttribute("style", L.group);
		}
		n.innerText = yi[e] || wi(e);
		let r = this.controller.dom.createElement("div");
		if (r.setAttribute("style", L.group), this.controller.isEditable) switch (e) {
			case 1:
				r.setAttribute("style", L.group1);
				break;
			case 2:
				r.setAttribute("style", L.group2);
				break;
			case 3:
				r.setAttribute("style", L.group3);
				break;
			case 5:
				r.setAttribute("style", L.group5);
				break;
			case 9:
				r.setAttribute("style", L.group9);
				break;
			case 13:
				r.setAttribute("style", L.group13);
				break;
			default: r.setAttribute("style", L.group);
		}
		let i = r.appendChild(this.controller.dom.createElement("table"));
		(this.byCombo[t] || []).map(([e, n]) => this.renderAgent(i, t, e, n)).forEach((e) => i.appendChild(e));
		let a = this.controller.dom.createElement("div");
		if (a.setAttribute("style", L.group), this.controller.isEditable) switch (e) {
			case 1:
				a.setAttribute("style", L.group1);
				break;
			case 2:
				a.setAttribute("style", L.group2);
				break;
			case 3:
				a.setAttribute("style", L.group3);
				break;
			case 5:
				a.setAttribute("style", L.group5);
				break;
			case 9:
				a.setAttribute("style", L.group9);
				break;
			case 13:
				a.setAttribute("style", L.group13);
				break;
			default: a.setAttribute("style", L.group);
		}
		return a.innerText = xi[e] || "Unusual combination", [
			n,
			r,
			a
		];
	}
	renderAgent(e, t, n, r) {
		let i = Kt(this.controller.dom, vi(n), F(r), this.controller.isEditable ? { deleteFunction: () => this.deleteAgent(t, n, r).then(() => e.removeChild(i)).catch((e) => this.controller.renderStatus(e)) } : {});
		return i;
	}
	async deleteAgent(e, t, n) {
		let r = this.byCombo[e] || [], i = r.find(([e, r]) => e === t && r === n);
		i && r.splice(r.indexOf(i), 1), await this.controller.save();
	}
	async addNewURI(e) {
		await this.handleDroppedUri(e, Ci(1)), await this.controller.save();
	}
	async handleDroppedUris(e, t) {
		try {
			await Promise.all(e.map((e) => this.handleDroppedUri(e, t))), await this.controller.save();
		} catch (e) {
			return Promise.reject(e);
		}
	}
	async handleDroppedUri(e, t, n = !1) {
		let r = Ti(e, this.store), i = F(e);
		if (!r && !n) {
			z(`   Not obvious: looking up dropped thing ${i}`);
			try {
				await this._store?.fetcher?.load(i.doc());
			} catch (e) {
				let t = `Ignore error looking up dropped thing: ${e}`;
				return be(t), Promise.reject(Error(t));
			}
			return this.handleDroppedUri(e, t, !0);
		}
		if (!r) {
			let t = Object.keys(this.store.findTypeURIs(i)), n = t.length > 0 ? `Detected RDF types: ${t.join(", ")}` : "No RDF type was detected for this URI.", r = `Error: Failed to add access target: ${e} is not a recognized ACL target type. Expected one of: vcard:WebID, vcard:Group, foaf:Person, foaf:Agent, solid:AppProvider, solid:AppProviderClass, or recognized ACL classes. Hint: try dropping a WebID profile URI, a vcard:Group URI, or a web app origin.` + n;
			return be(r), Promise.reject(Error(r));
		}
		this.setACLCombo(t, e, r, this.controller.subject);
	}
	setACLCombo(e, t, n, r) {
		e in this.byCombo || (this.byCombo[e] = []), this.removeAgentFromCombos(t), this.byCombo[e].push([n.pred, n.obj.uri]), z(`ACL: setting access to ${r} by ${n.pred}: ${n.obj}`);
	}
	removeAgentFromCombos(e) {
		for (let t = 0; t < 16; t++) {
			let n = this.byCombo[Ci(t)];
			if (n) for (let t = 0; t < n.length; t++) for (; t < n.length && n[t][1] === e;) n.splice(t, 1);
		}
	}
};
function Ci(e) {
	let t = [
		"Read",
		"Append",
		"Write",
		"Control"
	], n = [];
	for (let r = 0; r < 4; r++) e & 1 << r && n.push("http://www.w3.org/ns/auth/acl#" + t[r]);
	return n.sort(), n.join("\n");
}
function wi(e) {
	let t = "", n = [
		"Read",
		"Append",
		"Write",
		"Control"
	];
	for (let r = 0; r < 4; r++) e & 1 << r && (t += n[r]);
	return t;
}
function Ti(e, t) {
	let n = F(e), r = t.findTypeURIs(n);
	for (let e in r) z("    drop object type includes: " + e);
	if (e.startsWith("http") && e.split("/").length === 3) return {
		pred: "origin",
		obj: n
	};
	if (e.startsWith("http") && e.split("/").length === 4 && e.endsWith("/")) return z("Assuming final slash on dragged origin URI was unintended!"), {
		pred: "origin",
		obj: F(e.slice(0, -1))
	};
	if (j.vcard("WebID").uri in r) return {
		pred: "agent",
		obj: n
	};
	if (j.vcard("Group").uri in r) return {
		pred: "agentGroup",
		obj: n
	};
	if (n.sameTerm(j.foaf("Agent")) || n.sameTerm(j.acl("AuthenticatedAgent")) || n.sameTerm(j.rdf("Resource")) || n.sameTerm(j.owl("Thing"))) return {
		pred: "agentClass",
		obj: n
	};
	if (j.vcard("Individual").uri in r || j.foaf("Person").uri in r || j.foaf("Agent").uri in r) {
		let e = t.any(n, j.foaf("preferredURI"));
		return e ? {
			pred: "agent",
			obj: F(e)
		} : {
			pred: "agent",
			obj: n
		};
	}
	return j.solid("AppProvider").uri in r ? {
		pred: "origin",
		obj: n
	} : j.solid("AppProviderClass").uri in r ? {
		pred: "originClass",
		obj: n
	} : (z("    Triage fails for " + e), null);
}
//#endregion
//#region src/acl/access-controller.ts
var Ei = class {
	mainCombo;
	defaultsCombo;
	isContainer;
	defaultsDiffer;
	rootElement;
	isUsingDefaults;
	constructor(e, t, n, r, i, a, o, s, c, l, u, d) {
		if (this.subject = e, this.noun = t, this.context = n, this.statusElement = r, this.targetIsProtected = i, this.targetDoc = a, this.targetACLDoc = o, this.defaultHolder = s, this.defaultACLDoc = c, this.prospectiveDefaultHolder = l, this.store = u, this.dom = d, this.rootElement = d.createElement("div"), this.rootElement.setAttribute("style", L.aclGroupContent), this.isContainer = a.uri.slice(-1) === "/", s && c) {
			this.isUsingDefaults = !0;
			let e = Se(this.targetDoc, o, s, c);
			this.mainCombo = new Si(a, o, this, e, { defaults: this.isContainer }), this.defaultsCombo = null, this.defaultsDiffer = !1;
		} else this.isUsingDefaults = !1, this.mainCombo = new Si(a, o, this, u), this.defaultsCombo = new Si(a, o, this, u, { defaults: this.isContainer }), this.defaultsDiffer = !we(this.mainCombo.aclMap, this.defaultsCombo.aclMap);
	}
	get isEditable() {
		return !this.isUsingDefaults;
	}
	render() {
		if (this.rootElement.innerHTML = "", this.isUsingDefaults) {
			if (this.renderStatus(`The sharing for this ${this.noun} is the default for folder `), this.defaultHolder) {
				let e = this.statusElement.appendChild(this.dom.createElement("a"));
				e.href = this.defaultHolder.uri, e.innerText = Mi(this.defaultHolder);
			}
		} else !this.defaultsDiffer && this.isContainer ? this.renderStatus("This is also the default for things in this folder.") : this.renderStatus("");
		return this.rootElement.appendChild(this.mainCombo.render()), this.defaultsCombo && this.defaultsDiffer ? (this.rootElement.appendChild(this.renderRemoveDefaultsController()), this.rootElement.appendChild(this.defaultsCombo.render())) : this.isEditable && this.isContainer && this.rootElement.appendChild(this.renderAddDefaultsController()), !this.targetIsProtected && this.isUsingDefaults ? this.rootElement.appendChild(this.renderAddAclsController()) : this.targetIsProtected || this.rootElement.appendChild(this.renderRemoveAclsController()), this.rootElement;
	}
	renderRemoveAclsController() {
		let e = this.dom.createElement("button");
		return e.innerText = `Remove custom sharing settings for this ${this.noun} -- just use default${this.prospectiveDefaultHolder ? ` for ${R(this.prospectiveDefaultHolder)}` : ""}`, e.setAttribute("style", L.bigButton), e.addEventListener("click", () => this.removeAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderAddAclsController() {
		let e = this.dom.createElement("button");
		return e.innerText = `Set specific sharing for this ${this.noun}`, e.setAttribute("style", L.bigButton), e.addEventListener("click", () => this.addAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderAddDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", L.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Sharing for things within the folder currently tracks sharing for the folder.", t.setAttribute("style", L.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set the sharing of folder contents separately from the sharing for the folder", n.setAttribute("style", L.bigButton), n.addEventListener("click", () => this.addDefaults().then(() => this.render())), e;
	}
	renderRemoveDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", L.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Access to things within this folder:", t.setAttribute("style", L.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set default for folder contents to just track the sharing for the folder", n.setAttribute("style", L.bigButton), n.addEventListener("click", () => this.removeDefaults().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderTemporaryStatus(e) {
		this.statusElement.setAttribute("style", L.aclControlBoxStatusRevealed), this.statusElement.innerText = e, this.statusElement.setAttribute("style", L.temporaryStatusInit), setTimeout(() => {
			this.statusElement.setAttribute("style", L.temporaryStatusEnd);
		}), setTimeout(() => {
			this.statusElement.innerText = "";
		}, 5e3);
	}
	renderStatus(e) {
		e || this.statusElement.setAttribute("style", L.aclControlBoxStatusRevealed), this.statusElement.innerText = e;
	}
	async addAcls() {
		if (!this.defaultHolder || !this.defaultACLDoc) {
			let e = "Unable to find defaults to copy";
			return be(e), Promise.reject(e);
		}
		Se(this.targetDoc, this.targetACLDoc, this.defaultHolder, this.defaultACLDoc).statements.forEach((e) => this.store.add(e.subject, e.predicate, e.object, this.targetACLDoc));
		try {
			return await this.store.fetcher.putBack(this.targetACLDoc), this.isUsingDefaults = !1, Promise.resolve();
		} catch (e) {
			let t = ` Error writing back access control file! ${e}`;
			return be(t), Promise.reject(t);
		}
	}
	async addDefaults() {
		this.defaultsCombo = new Si(this.targetDoc, this.targetACLDoc, this, this.store, { defaults: !0 }), this.defaultsDiffer = !0;
	}
	async removeAcls() {
		try {
			await this.store.fetcher.delete(this.targetACLDoc.uri, {}), this.isUsingDefaults = !0;
			try {
				this.prospectiveDefaultHolder = await Be(this.targetDoc.uri);
			} catch (e) {
				B(e);
			}
		} catch (e) {
			let t = `Error deleting access control file: ${this.targetACLDoc}: ${e}`;
			return be(t), Promise.reject(t);
		}
	}
	async removeDefaults() {
		let e = this.defaultsCombo;
		try {
			this.defaultsCombo = null, this.defaultsDiffer = !1, await this.save();
		} catch (t) {
			return this.defaultsCombo = e, this.defaultsDiffer = !0, be(t), Promise.reject(t);
		}
	}
	save() {
		let e = ie();
		this.isContainer ? this.defaultsCombo && this.defaultsDiffer ? (ke(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), ke(e, this.targetDoc, this.defaultsCombo.byCombo, this.targetACLDoc, !1, !0)) : ke(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0, !0) : ke(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), e.fetcher = T(e, { fetch: this.store.fetcher._fetch });
		let t = e.updater || new v(e);
		return new Promise((n, r) => {
			t.put(this.targetACLDoc, e.statementsMatching(void 0, void 0, void 0, this.targetACLDoc), "text/turtle", (t, i, a) => {
				if (!i) return r(/* @__PURE__ */ Error(`ACL file save failed: ${a}`));
				this.store.fetcher.unload(this.targetACLDoc), this.store.add(e.statements), this.store.fetcher.requested[this.targetACLDoc.uri] = "done", this.mainCombo.store = this.store, this.defaultsCombo && (this.defaultsCombo.store = this.store), this.defaultsDiffer = !!this.defaultsCombo && !we(this.mainCombo.aclMap, this.defaultsCombo.aclMap), z("ACL modification: success!"), n();
			});
		});
	}
}, Di = window, Oi = Symbol("prevent double triggering of drop event");
function ki(e) {
	if (z("preventBrowserDropEvents called."), Di !== void 0) {
		if (Di[Oi]) return;
		Di[Oi] = !0;
	}
	e.addEventListener("drop", ji, !1), e.addEventListener("dragenter", Ai, !1), e.addEventListener("dragover", Ai, !1);
}
function Ai(e) {
	e.stopPropagation(), e.preventDefault();
}
function ji(e) {
	e.dataTransfer.files.length > 0 && (Di.confirm("Are you sure you want to drop this file here? (Cancel opens it in a new tab)") || (e.stopPropagation(), e.preventDefault(), z("@@@@ document-level DROP suppressed: " + e.dataTransfer.dropEffect)));
}
function Mi(e) {
	let t = e.uri;
	t.slice(-1) === "/" && (t = t.slice(0, -1));
	let n = t.lastIndexOf("/");
	return n >= 0 && (t = t.slice(n + 1)), t || "/";
}
function Ni(e, t, n, r) {
	let i = t.dom, a = e.doc(), o = i.createElement("div");
	o.setAttribute("style", L.aclControlBoxContainer);
	let s = o.appendChild(i.createElement("h1"));
	s.textContent = `Sharing for ${n} ${R(e)}`, s.setAttribute("style", L.aclControlBoxHeader);
	let c = o.appendChild(i.createElement("div"));
	c.setAttribute("style", L.aclControlBoxStatus);
	try {
		Pi(a, r, e, n, t, i, c).then((e) => o.appendChild(e.render()));
	} catch (e) {
		c.innerText = e;
	}
	return o;
}
async function Pi(e, t, n, r, i, a, o) {
	return new Promise((s, c) => Re(e, async (e, l, u, d, f, p) => {
		if (!e) return c(/* @__PURE__ */ Error(`Error reading ${l ? "" : " default "}ACL. status ${u}: ${d}`));
		let m = Fi(u), h = Ii(u, d, t) || Li(u);
		if (!h && m) try {
			return s(g(await Be(m)));
		} catch (e) {
			B(e);
		}
		return s(g());
		function g(e) {
			return new Ei(n, r, i, o, h, u, d, f, p, e, t, a);
		}
	}));
}
function Fi(e) {
	let t = e.uri.split("#")[0], n = t.slice(0, -1).lastIndexOf("/"), r = t.indexOf("//");
	return r >= 0 && n < r + 2 || n < 0 ? null : t.slice(0, n + 1);
}
function Ii(e, t, n) {
	return n.holds(e, j.rdf("type"), j.space("Storage"), t);
}
function Li(e) {
	return e.uri === e.site().uri;
}
//#endregion
//#region src/acl/index.ts
var Ri = {
	adoptACLDefault: Se,
	readACL: Ce,
	sameACL: we,
	ACLunion: Te,
	loadUnionACL: Ee,
	ACLbyCombination: De,
	makeACLGraph: Oe,
	makeACLGraphbyCombo: ke,
	ACLToString: Ae,
	comboToString: je,
	makeACLString: Me,
	putACLObject: Ne,
	putACLbyCombo: Pe,
	fixIndividualCardACL: Fe,
	fixIndividualACL: Ie,
	setACL: Le,
	getACLorDefault: Re,
	getACL: ze
}, zi = {
	preventBrowserDropEvents: ki,
	shortNameForFolder: Mi,
	ACLControlBox5: Ni
}, Bi = D.store;
function Vi(e, t, n) {
	let r = e.dom, i = e.div;
	if (e.me && !e.me.uri) throw Error("newThingUI:  Invalid userid: " + e.me);
	let a = "padding: 0.7em; width: 2em; height: 2em;", o = i.appendChild(r.createElement("img")), s = !1;
	o.setAttribute("src", W.iconBase + "noun_34653_green.svg"), o.setAttribute("style", a), o.setAttribute("title", "Add another tool");
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
				ri(e).then((e) => {
					let s = Object.assign({
						newBase: o,
						folder: n.folder || void 0,
						workspace: i
					}, n);
					for (let e in n) s[e] = n[e];
					z(`newThingUI: Minting new ${s.pane.name} at ${s.newBase}`), n.pane.mintNew(t, s).then(function(e) {
						if (!e || !e.newInstance) throw Error("Cannot mint new - missing newInstance");
						if (e.folder) {
							let t = e.newInstance.uri.slice(e.folder.uri.length).includes("/");
							z("  new thing is packge? " + t), t ? Bi.add(e.folder, j.ldp("contains"), Bi.sym(e.newBase), e.folder.doc()) : Bi.add(e.folder, j.ldp("contains"), e.newInstance, e.folder.doc()), e.refreshTarget && e.refreshTarget.refresh && e.refreshTarget.refresh();
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
			n.noun = l.mintClass ? R(l.mintClass) : l.name, n.appPathSegment = n.noun.slice(0, 1).toUpperCase() + n.noun.slice(1), n.folder ? Gt(r, Bi, n.div, j.foaf("name"), null, n.noun).then(function(e) {
				if (!e) d();
				else {
					let t = n.folder.uri;
					t.endsWith("/") || (t += "/"), t = t + encodeURIComponent(e) + "/", s(null, t);
				}
			}) : (o = fi(r, {
				noun: n.noun,
				appPathSegment: n.appPathSegment
			}, s), n.div.appendChild(o));
		});
	}
	let p = [], m = Object.values(n).filter((e) => e.mintNew), h = m.reduce((e, t) => (t.mintClass && (e[t.mintClass.uri] = (e[t.mintClass.uri] || 0) + 1), e), {});
	m.forEach((t) => {
		let n = e.div.appendChild(r.createElement("img"));
		n.setAttribute("src", t.icon);
		let i = t.mintClass ? h[t.mintClass.uri] > 1 ? `${R(t.mintClass)} (using ${t.name} pane)` : R(t.mintClass) : t.name + " @@";
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
var Hi = { newThingUI: Vi }, Ui = D.store;
function Wi(e, t, n, r, i, a, o) {
	let s = e.createElement("table"), c = e.createElement("tr");
	c.appendChild(e.createElement("td")).setAttribute("class", "MatrixCorner"), s.appendChild(c), s.lastHeader = c;
	let l = [], u = [], d = function(e, t, n, r) {
		for (; e.firstChild;) e.removeChild(e.firstChild);
		e.setAttribute("style", ""), e.style.textAlign = "center", a.cellFunction ? a.cellFunction(e, t, n, r) : (e.textContent = R(r), e.setAttribute("style", "padding: 0.3em")), delete e.old;
	}, f = function(t) {
		let n = t.toNT();
		if (u[n]) return u[n];
		let r = e.createElement("tr"), i = r.appendChild(e.createElement("td"));
		i.setAttribute("style", "padding: 0.3em;"), i.textContent = R(t), t.termType === "NamedNode" && Ui.fetcher.nowOrWhenFetched(t.uri.split("#")[0], void 0, function(e, n, r) {
			e && (i.textContent = R(t));
		});
		for (let n = 0; n < l.length; n++) d(r.appendChild(e.createElement("td")), y(l[n]), t, null);
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
			if (a.style.textAlign = "center", n === s.firstChild ? a.textContent = R(t) : d(a, t, y(i), null), r === l.length - 1) n.appendChild(a);
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
				let n = y(e.dataValueNT), r = y(l[i - 1]);
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
		m(), Ui.query(t, g, void 0, h);
	};
	let g = function(e) {
		let t = e[n.toString()], a = e[r.toString()], o = e[i.toString()], s = f(a), c = p(t), l = s.children[c + 1];
		d(l, t, a, o);
	};
	if (a.set_y) for (let e = 0; e < a.set_y.length; e++) f(a.set_y[e]);
	if (a.set_x) for (let e = 0; e < a.set_x.length; e++) p(a.set_x[e]);
	return Ui.query(t, g, void 0, o), s;
}
//#endregion
//#region src/matrix/index.ts
var Gi = { matrixForQuery: Wi }, Ki = W.iconBase + "noun_Camera_1618446_000000.svg", qi = W.iconBase + "noun_479395.svg", Ji = "image/png";
function Yi(e, t, n, r) {
	let i = e.createElement("div"), a, o, s, c, l = i.appendChild(e.createElement("table")), u = l.appendChild(e.createElement("tr")).appendChild(e.createElement("td"));
	u.setAttribute("colspan", "4");
	let d = l.appendChild(e.createElement("tr"));
	d.appendChild(e.createElement("td")).appendChild(Ut(e)).addEventListener("click", (e) => {
		b(), r(null);
	});
	let f = d.appendChild(e.createElement("td")).appendChild(K(e, qi, "Retake"));
	f.addEventListener("click", (e) => {
		_();
	}), f.style.visibility = "collapse";
	let p = d.appendChild(e.createElement("td")).appendChild(K(e, W.iconBase + "noun_10636.svg", "Snap"));
	p.addEventListener("click", v), p.style.visibility = "collapse";
	let m = d.appendChild(e.createElement("td")).appendChild(Wt(e));
	m.addEventListener("click", (e) => {
		x(o, a);
	}), m.style.visibility = "collapse";
	function h() {
		if (s = u.appendChild(e.createElement("video")), s.setAttribute("controls", "1"), s.setAttribute("autoplay", "1"), s.setAttribute("style", L.controlStyle), !navigator.mediaDevices) throw Error("navigator.mediaDevices not available");
		navigator.mediaDevices.getUserMedia(g).then((e) => {
			s.srcObject = e, p.style.visibility = "visible", m.style.visibility = "collapse", f.style.visibility = "collapse";
		});
	}
	let g = { video: !0 };
	function _() {
		u.removeChild(c), h();
	}
	function v() {
		c = e.createElement("canvas"), c.setAttribute("width", L.canvasWidth), c.setAttribute("height", L.canvasHeight), c.setAttribute("style", L.controlStyle), u.appendChild(c), c.getContext("2d").drawImage(s, 0, 0, c.width, c.height), s.parentNode.removeChild(s), c.toBlob((e) => {
			z(`got blob type ${e.type} size ${e.size}`), a = n(), o = e, y();
		}, Ji);
	}
	function y() {
		m.style.visibility = "visible", f.style.visibility = "visible", p.style.visibility = "collapse";
	}
	function b() {
		s && s.srcObject && s.srcObject.getVideoTracks().forEach((e) => e.stop());
	}
	function x(e, n) {
		let i = e.type;
		z("Putting " + e.size + " bytes of " + i + " to " + n), t.fetcher.webOperation("PUT", n.uri, {
			data: e,
			contentType: i
		}).then((e) => {
			z("ok saved " + n), b(), r(n);
		}, (e) => {
			b(), alert(e);
		});
	}
	return h(), i;
}
function Xi(e, t, n, r) {
	let i = e.createElement("div"), a = K(e, Ki, "Take picture"), o;
	async function s(e) {
		i.removeChild(o), i.appendChild(a), r(e);
	}
	return i.appendChild(a), a.addEventListener("click", (r) => {
		i.removeChild(a), o = Yi(e, t, n, s), i.appendChild(o);
	}), i;
}
//#endregion
//#region src/media/index.ts
var Zi = {
	cameraCaptureControl: Yi,
	cameraButton: Xi
}, Qi = {
	icons: W,
	ns: j,
	rdf: E,
	style: L,
	widgets: Ur
};
function $i(e, t, n, r, i) {
	t ||= D.store, r = r.doc();
	let a = Qi.ns, s = f("http://www.w3.org/2005/01/wf/flow#"), c = f("http://purl.org/dc/terms/");
	i ||= {};
	let l = !!i.newestFirst, u = e.createElement("div"), d, p, g = D.store.updater, _ = function(t, n) {
		let r = e.createElement("a");
		return n && n.uri && (r.setAttribute("href", n.uri), r.addEventListener("click", Qi.widgets.openHrefInOutlineMode, !0), r.setAttribute("style", "color: #3B5998; text-decoration: none; ")), r.textContent = t, r;
	}, v = function(t, n) {
		let r = e.createElement("pre");
		return r.setAttribute("style", n || "color: grey"), u.appendChild(r), r.appendChild(e.createTextNode(t)), r;
	}, y = {
		log: function(e) {
			v(e, "color: #111;");
		},
		warn: function(e) {
			v(e, "color: #880;");
		},
		error: function(e) {
			v(e, "color: #800;");
		}
	}, b = function() {
		let i = e.createElement("tr"), s = e.createElement("td"), l = e.createElement("td"), u = e.createElement("td");
		i.appendChild(s), i.appendChild(l), i.appendChild(u), i.AJAR_date = "9999-01-01T00:00:00Z";
		let d = function() {
			f.setAttribute("class", "pendingedit"), f.disabled = !0;
			let s = [], l = /* @__PURE__ */ new Date(), u = "" + l.getTime(), d = o(l), m = t.sym(r.uri + "#Msg" + u);
			s.push(new h(n, a.wf("message"), m, r)), s.push(new h(m, a.sioc("content"), t.literal(f.value), r)), s.push(new h(m, c("created"), d, r)), p && s.push(new h(m, a.foaf("maker"), p, r)), g.update([], s, function(n, r, a) {
				if (!r) i.appendChild(Qi.widgets.errorMessageBlock(e, "Error writing message: " + a));
				else {
					let e = {
						"?msg": m,
						"?content": t.literal(f.value),
						"?date": d,
						"?creator": p
					};
					E(e, !1), f.value = "", f.setAttribute("class", ""), f.disabled = !1;
				}
			});
		};
		i.appendChild(e.createElement("br"));
		let f, m, _ = function() {
			S(s, p, "", null), f = e.createElement("textarea"), l.innerHTML = "", l.appendChild(f), f.rows = 3, f.setAttribute("style", "white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;background-color: #eef;"), f.addEventListener("keyup", function(e) {
				e.keyCode === 13 && (e.altKey || d());
			}, !1), u.innerHTML = "", m = Qi.widgets.button(e, Qi.icons.iconBase + "noun_383448.svg", "Send"), m.setAttribute("style", Qi.style.buttonStyle + "float: right;"), m.addEventListener("click", d, !1), u.appendChild(m);
		};
		return ti({
			div: l,
			dom: e
		}).then((e) => {
			p = e.me, _();
		}), i;
	};
	function x(e) {
		let t = D.store.any(e, Qi.ns.foaf("nick"));
		return t ? "" + t.value : "" + R(e);
	}
	function S(t, n, r, i) {
		let a = t.appendChild(_(x(n), n));
		n.uri && D.store.fetcher.nowOrWhenFetched(n.doc(), void 0, function(e, t) {
			a.textContent = x(n);
		}), t.appendChild(e.createElement("br")), t.appendChild(_(r, i));
	}
	function C(e, n) {
		let r = {}, i, o;
		for (i = n.firstChild; i; i = i.nextSibling) i.AJAR_subject && (r[i.AJAR_subject.uri] = !0);
		let s = t.each(e, a.wf("message")), c = {};
		for (s.forEach(function(e) {
			c[e.uri] = !0, r[e.uri] || T(e);
		}), i = n.firstChild; i;) o = i.nextSibling, i.AJAR_subject && !c[i.AJAR_subject.uri] && n.removeChild(i), i = o;
	}
	let w = function(e) {
		let r = t.statementsMatching(e).concat(t.statementsMatching(void 0, void 0, e));
		g.update(r, [], function(e, t, r) {
			t ? C(n, d) : y.error("Cant delete messages:" + r);
		});
	}, T = function(e) {
		let n = {
			"?msg": e,
			"?creator": t.any(e, a.foaf("maker")),
			"?date": t.any(e, c("created")),
			"?content": t.any(e, a.sioc("content"))
		};
		E(n, !0);
	}, E = function(t, n) {
		let r = t["?creator"], i = t["?msg"], a = t["?date"], o = t["?content"], s = a.value, c = e.createElement("tr");
		c.AJAR_date = s, c.AJAR_subject = i;
		let u = !1;
		for (let e = d.firstChild; e; e = e.nextSibling) if (s > e.AJAR_date && l || s < e.AJAR_date && !l) {
			d.insertBefore(c, e), u = !0;
			break;
		}
		u || d.appendChild(c);
		let f = e.createElement("td");
		c.appendChild(f), S(f, r, Qi.widgets.shortDate(s), i);
		let p = e.createElement("td");
		c.appendChild(p);
		let m = e.createElement("p");
		m.setAttribute("style", "white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;" + (n ? "background-color: #e8ffe8;" : "background-color: #white;")), p.appendChild(m), m.textContent = o.value;
		let h = e.createElement("td");
		c.appendChild(h);
		let g = e.createElement("button");
		h.appendChild(g), g.textContent = "-", c.setAttribute("class", "hoverControl"), g.setAttribute("class", "hoverControlHide"), g.setAttribute("style", "color: red;"), g.addEventListener("click", function(t) {
			h.removeChild(g);
			let n = e.createElement("button");
			n.textContent = "cancel", h.appendChild(n).addEventListener("click", function(e) {
				h.removeChild(r), h.removeChild(n), h.appendChild(g);
			}, !1);
			let r = e.createElement("button");
			r.textContent = "Delete message", h.appendChild(r).addEventListener("click", function(e) {
				h.removeChild(r), h.removeChild(n), w(i);
			}, !1);
		}, !1);
	};
	d = e.createElement("table"), d.fresh = !1, u.appendChild(d), d.setAttribute("style", "width: 100%;");
	let O = b();
	l ? d.insertBefore(O, d.firstChild) : d.appendChild(O);
	let k;
	if (i.query) k = i.query;
	else {
		k = new m("Messages");
		let e = {};
		[
			"msg",
			"date",
			"creator",
			"content"
		].forEach(function(t) {
			k.vars.push(e[t] = ae(t));
		}), k.pat.add(n, s("message"), e.msg), k.pat.add(e.msg, a.dct("created"), e.date), k.pat.add(e.msg, a.foaf("maker"), e.creator), k.pat.add(e.msg, a.sioc("content"), e.content);
	}
	function A() {
		d.fresh = !0;
	}
	return t.query(k, E, void 0, A), u.refresh = function() {
		C(n, d);
	}, u;
}
//#endregion
//#region src/chat/dateFolder.js
async function ea(e) {
	return await P.fetcher.load(e), !(P.statementsMatching(null, j.dct("created"), null, e).length > 0);
}
var ta = class {
	constructor(e, t, n) {
		this.root = e, this.rootFolder = e.dir(), this.leafFileName = t || "index.ttl", this.membershipProperty = n || j.wf("leafObject");
	}
	leafDocumentFromDate(e) {
		let t = e.toISOString().split("T")[0].replace(/-/g, "/");
		return t = this.root.dir().uri + t + "/" + this.leafFileName, P.sym(t);
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
				await P.fetcher.load(s);
				let e = P.each(s, j.ldp("contains"));
				e = e.filter(i);
				let t = o(e);
				if (t) return t;
			} catch (e) {
				if (e.response && e.response.status && e.response.status === 404) z("Error 404 for chat parent file " + s);
				else throw z("*** Error NON 404 for chat parent file " + s), Error(`*** ${e.message} for chat folder ${s}`);
			}
			if (r === 0) return null;
			let c = await n(s, r - 1);
			return c ? (await P.fetcher.load(c), o(P.each(c, j.ldp("contains")))) : null;
		}
		let r = this.leafDocumentFromDate(e).dir();
		for (;;) {
			let t = await n(r, 3);
			if (t) {
				let n = P.sym(t.uri + this.leafFileName), i = this.dateFromLeafDocument(n);
				if (await ea(n)) e = i, r = this.leafDocumentFromDate(e).dir();
				else return i;
			} else return null;
		}
	}
	async firstLeaf(e) {
		let t = ie(), n = new c(t);
		async function r(r) {
			function i(e) {
				let t = e.uri.slice(0, -1).split("/").slice(-1)[0];
				return !!"0123456789".includes(t[0]);
			}
			delete n.requested[r.uri], await n.load(r, { force: !0 });
			let a = t.each(r, j.ldp("contains"));
			if (a = a.filter(i), a.length === 0) throw Error(" @@@  No children to         parent2 " + r);
			return a.sort(), e && a.reverse(), a[0];
		}
		let i = await r(await r(await r(this.root.dir()))), a = F(i.uri + "chat.ttl");
		await n.load(a);
		let o = t.each(this.root, this.membershipProperty, null, a);
		if (o.length === 0) {
			let e = "  INCONSISTENCY -- no chat leafObject in file " + a;
			throw xe(e), Error(e);
		}
		let s = o.map((e) => [t.any(e, j.dct("created")), e]);
		return s.sort(), e && s.reverse(), s[0][1];
	}
}, na = (e) => e / 2 ** 32 | 0, ra = (e) => e >>> 0;
function ia(e, t, n, r) {
	let i = na(n), a = ra(n);
	e.setUint32(t, r ? a : i, r), e.setUint32(t + 4, r ? i : a, r);
}
//#endregion
//#region node_modules/@noble/hashes/utils.js
function aa(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in e && e.BYTES_PER_ELEMENT === 1;
}
var oa = (e) => e ? `"${e}" ` : "";
function sa(e, t = "") {
	if (typeof e != "number") throw TypeError(oa(t) + "expected number, got " + typeof e);
	if (!Number.isSafeInteger(e) || e < 0) throw RangeError(oa(t) + "expected integer >= 0, got " + e);
	return e;
}
function ca(e, t, n = "") {
	if (aa(e) && (t === void 0 || e.length === t)) return e;
	t !== void 0 && sa(t, "length");
	let r = aa(e), i = t === void 0 ? "" : ` of length ${t}`, a = r ? `length=${e.length}` : `type=${typeof e}`, o = oa(n) + "expected Uint8Array" + i + ", got " + a;
	throw r ? RangeError(o) : TypeError(o);
}
var la = (e, t) => {
	if (typeof e != "object" || !e || Array.isArray(e)) throw TypeError((t === "object" ? "" : `"${t}" `) + "expected object, got type=" + typeof e);
};
function ua(e, t = !0) {
	if (e.destroyed) throw Error("hash was destroyed");
	if (t && e.finished) throw Error("digest() was already called");
}
function da(e, t) {
	ca(e, void 0, "output");
	let n = t.outputLen;
	if (!(e.length >= n)) throw RangeError("\"output\" expected length >= " + n);
}
function fa(...e) {
	for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function pa(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function ma(e, t) {
	return e << 32 - t | e >>> t;
}
var ha = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", ga = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function _a(e) {
	if (ca(e), ha) return e.toHex();
	let t = "";
	for (let n = 0; n < e.length; n++) t += ga[e[n]];
	return t;
}
function va(e) {
	return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : void 0;
}
function ya(e) {
	if (typeof e != "string") throw TypeError("hex string expected, got " + typeof e);
	if (ha) try {
		return Uint8Array.fromHex(e);
	} catch (e) {
		throw e instanceof SyntaxError ? RangeError(e.message) : e;
	}
	let t = e.length, n = t / 2;
	if (t % 2) throw RangeError("hex string expected, got unpadded hex of length " + t);
	let r = new Uint8Array(n);
	for (let t = 0, i = 0; t < n; t++, i += 2) {
		let n = va(e.charCodeAt(i)), a = va(e.charCodeAt(i + 1));
		if (n === void 0 || a === void 0) {
			let t = e[i] + e[i + 1];
			throw RangeError("hex string expected, got non-hex character \"" + t + "\" at index " + i);
		}
		r[t] = n * 16 + a;
	}
	return r;
}
function ba(...e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		ca(r), t += r.length;
	}
	let n = new Uint8Array(t);
	for (let t = 0, r = 0; t < e.length; t++) {
		let i = e[t];
		n.set(i, r), r += i.length;
	}
	return n;
}
function xa(e, t, n = "opts") {
	return la(e, "defaults"), t !== void 0 && la(t, n), Object.assign(e, t);
}
function Sa(e, t = {}) {
	if (typeof e != "function") throw TypeError("\"hashCons\" expected function, got type=" + typeof e);
	t = xa({}, t, "info");
	let n = (t, n) => e(n).update(t).digest(), r = e(void 0);
	return n.outputLen = r.outputLen, n.blockLen = r.blockLen, n.canXOF = r.canXOF, n.create = (t) => e(t), Object.assign(n, t), Object.freeze(n);
}
function Ca(e = 32) {
	sa(e, "bytesLength");
	let t = typeof globalThis == "object" ? globalThis.crypto : null;
	if (typeof t?.getRandomValues != "function") throw Error("crypto.getRandomValues must be defined");
	if (e > 65536) throw RangeError(`"bytesLength" expected <= 65536, got ${e}`);
	return t.getRandomValues(new Uint8Array(e));
}
var wa = (e) => ({ oid: Uint8Array.from([
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
function Ta(e, t, n) {
	return e & t ^ ~e & n;
}
function Ea(e, t, n) {
	return e & t ^ e & n ^ t & n;
}
var Da = class {
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
		this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = r, this.buffer = new Uint8Array(e), this.view = pa(this.buffer);
	}
	update(e) {
		ua(this), ca(e);
		let { view: t, buffer: n, blockLen: r } = this, i = e.length, a = !1;
		for (let o = 0; o < i;) {
			let s = Math.min(r - this.pos, i - o);
			if (s === r) {
				let t = pa(e);
				for (; r <= i - o; o += r) this.process(t, o);
				a = !0;
				continue;
			}
			n.set(o === 0 && s === i ? e : e.subarray(o, o + s), this.pos), this.pos += s, o += s, this.pos === r && (this.process(t, 0), this.pos = 0, a = !0);
		}
		return this.length += e.length, a && this.roundClean(), this;
	}
	digestInto(e) {
		ua(this), da(e, this), this.finished = !0;
		let { buffer: t, view: n, blockLen: r, isLE: i } = this, { pos: a } = this;
		t[a++] = 128, t.fill(0, a), this.padOffset > r - a && (this.process(n, 0), t.fill(0)), ia(n, r - 8, this.length * 8, i), this.process(n, 0), this.roundClean();
		let o = e === t ? n : pa(e), s = this.outputLen, c = s / 4, l = this.get();
		if (s % 4 || c > l.length) throw Error("invalid outputLen");
		for (let e = 0; e < c; e++) o.setUint32(4 * e, l[e], i);
	}
	digest() {
		let { buffer: e, outputLen: t } = this;
		this.digestInto(e);
		let n = e.slice(0, t);
		return this.destroy(), n;
	}
	_cloneIntoMeta(e) {
		let { buffer: t, length: n, finished: r, destroyed: i, pos: a } = this;
		return e.destroyed = i, e.finished = r, e.length = n, e.pos = a, a && e.buffer.set(t), e;
	}
	clone() {
		return this._cloneInto();
	}
}, Oa = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]), ka = /* @__PURE__ */ Uint32Array.from([
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
]), Aa = /* @__PURE__ */ new Uint32Array(64), ja = class extends Da {
	A = 0;
	B = 0;
	C = 0;
	D = 0;
	E = 0;
	F = 0;
	G = 0;
	H = 0;
	constructor(e, t) {
		super(64, e, 8, !1), this.A = t[0] | 0, this.B = t[1] | 0, this.C = t[2] | 0, this.D = t[3] | 0, this.E = t[4] | 0, this.F = t[5] | 0, this.G = t[6] | 0, this.H = t[7] | 0;
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
	_cloneInto(e) {
		return (e ||= new this.constructor()).set(...this.get()), this._cloneIntoMeta(e);
	}
	process(e, t) {
		for (let n = 0; n < 16; n++, t += 4) Aa[n] = e.getUint32(t, !1);
		for (let e = 16; e < 64; e++) {
			let t = Aa[e - 15], n = Aa[e - 2], r = ma(t, 7) ^ ma(t, 18) ^ t >>> 3, i = ma(n, 17) ^ ma(n, 19) ^ n >>> 10;
			Aa[e] = i + Aa[e - 7] + r + Aa[e - 16] | 0;
		}
		let { A: n, B: r, C: i, D: a, E: o, F: s, G: c, H: l } = this;
		for (let e = 0; e < 64; e++) {
			let t = ma(o, 6) ^ ma(o, 11) ^ ma(o, 25), u = l + t + Ta(o, s, c) + ka[e] + Aa[e] | 0, d = (ma(n, 2) ^ ma(n, 13) ^ ma(n, 22)) + Ea(n, r, i) | 0;
			l = c, c = s, s = o, o = a + u | 0, a = i, i = r, r = n, n = u + d | 0;
		}
		n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, s = s + this.F | 0, c = c + this.G | 0, l = l + this.H | 0, this.set(n, r, i, a, o, s, c, l);
	}
	roundClean() {
		fa(Aa);
	}
	destroy() {
		this.destroyed = !0, this.set(0, 0, 0, 0, 0, 0, 0, 0), fa(this.buffer);
	}
}, Ma = class extends ja {
	constructor() {
		super(32, Oa);
	}
}, Na = /* @__PURE__ */ Sa(() => new Ma(), /* @__PURE__ */ wa(1));
//#endregion
//#region node_modules/@noble/curves/utils.js
function Pa(e, t, n = () => {}) {
	if (!Array.isArray(e)) throw TypeError(`"${t}" expected array, got type=${typeof e}`);
	for (let r = 0; r < e.length; r++) n(e[r], `${t}[${r}]`);
	return e;
}
var Fa = (e, t, n) => ca(e, t, n), Ia = sa;
function La(e, t = "object") {
	if (typeof e != "object" || !e || Array.isArray(e)) throw TypeError(t === "object" ? "expected valid options object" : `"${t}" expected object, got type=${typeof e}`);
	return e;
}
function Ra(e, t) {
	if (typeof e != "function") throw TypeError(`"${t}" is invalid: expected function, got ${typeof e}`);
	return e;
}
var za = _a, Ba = (...e) => ba(...e), Va = (e) => ya(e), Ha = aa, Ua = (e) => Ca(e), Wa = /* @__PURE__ */ BigInt(0), Ga = /* @__PURE__ */ BigInt(1), Ka = (e) => e ? `"${e}" ` : "";
function qa(e, t = "") {
	if (typeof e != "boolean") throw TypeError(Ka(t) + "expected boolean, got type=" + typeof e);
	return e;
}
function Ja(e) {
	if (typeof e == "bigint") {
		if (!ro(e)) throw RangeError("positive bigint expected, got " + e);
	} else Ia(e);
	return e;
}
function Ya(e, t = "") {
	if (typeof e != "number") {
		let n = t && `"${t}" `;
		throw TypeError(n + "expected number, got type=" + typeof e);
	}
	if (!Number.isSafeInteger(e)) {
		let n = t && `"${t}" `;
		throw RangeError(n + "expected safe integer, got " + e);
	}
}
function Xa(e) {
	if (typeof e != "string") throw TypeError("hex string expected, got " + typeof e);
	return e === "" ? Wa : BigInt("0x" + e);
}
function Za(e) {
	return Xa(_a(e));
}
function Qa(e) {
	return Xa(_a(to(ca(e)).reverse()));
}
function $a(e, t) {
	if (sa(t), t === 0) throw Error("zero output length is invalid");
	e = Ja(e);
	let n = t * 2, r = e.toString(16);
	if (r.length > n) throw RangeError("number is too large");
	return ya(r.padStart(n, "0"));
}
function eo(e, t) {
	return $a(e, t).reverse();
}
function to(e) {
	return Uint8Array.from(Fa(e));
}
function no(e) {
	if (typeof e != "string") throw TypeError("ascii string expected, got " + typeof e);
	return Uint8Array.from(e, (t, n) => {
		let r = t.charCodeAt(0);
		if (t.length !== 1 || r > 127) throw RangeError(`string contains non-ASCII character "${e[n]}" with code ${r} at position ${n}`);
		return r;
	});
}
function ro(e) {
	return typeof e == "bigint" && Wa <= e;
}
function io(e, t, n) {
	return ro(e) && ro(t) && ro(n) && t <= e && e < n;
}
function ao(e, t, n, r) {
	if (!io(t, n, r)) throw RangeError("expected valid " + e + ": " + n + " <= n < " + r + ", got " + t);
}
function oo(e) {
	if (e < Wa) throw Error("expected non-negative bigint, got " + e);
	return e === Wa ? 0 : e.toString(2).length;
}
var so = (e) => (Ya(e, "n"), (Ga << BigInt(e)) - Ga);
function co(e, t = {}, n = {}, r = "object") {
	La(e, r), La(t, "fields"), La(n, "optFields");
	function i(t, n, i) {
		let a = r === "object" ? `param "${String(t)}"` : `"${r}.${String(t)}"`, o = e[t];
		if (!Object.hasOwn(e, t) && (i ? o !== void 0 : n !== "function")) throw TypeError(`${a} is invalid: expected own property`);
		if (i && o === void 0) return;
		let s = typeof o;
		if (s !== n || o === null) throw TypeError(`${a} is invalid: expected ${n}, got ${s}`);
	}
	let a = (e, t) => Object.entries(e).forEach(([e, n]) => i(e, n, t));
	a(t, !1), a(n, !0);
}
//#endregion
//#region node_modules/@noble/curves/abstract/modular.js
var Z = /* @__PURE__ */ BigInt(0), Q = /* @__PURE__ */ BigInt(1), lo = /* @__PURE__ */ BigInt(2), uo = /* @__PURE__ */ BigInt(3), fo = /* @__PURE__ */ BigInt(4), po = /* @__PURE__ */ BigInt(5), mo = /* @__PURE__ */ BigInt(7), ho = /* @__PURE__ */ BigInt(8), go = /* @__PURE__ */ BigInt(9), _o = /* @__PURE__ */ BigInt(15), vo = /* @__PURE__ */ BigInt(16), yo = /* @__PURE__ */ BigInt("0x10000000000000000");
function bo(e, t) {
	if (t <= Z) throw Error("mod: expected positive modulus, got " + t);
	let n = e % t;
	return n >= Z ? n : t + n;
}
function xo(e, t, n) {
	if (n <= Q) throw Error("pow: expected modulus > 1, got " + n);
	if (typeof t != "bigint") throw TypeError("invalid exponent: expected bigint, got " + typeof t);
	if (t < Z) throw Error("invalid exponent, negatives unsupported");
	if (t === Z) return Q;
	if (t === Q) return e;
	let r = e % n;
	if (r < Z && (r += n), t < yo) {
		let e = Q;
		for (; t > Z;) t & Q && (e = e * r % n), r = r * r % n, t >>= Q;
		return e;
	}
	let i = [];
	for (; t > Z;) i.push(Number(t & _o)), t >>= fo;
	let a = Array(16);
	a[0] = Q, a[1] = r;
	for (let e = 2; e < 16; e++) a[e] = a[e - 1] * r % n;
	let o = a[i[i.length - 1]];
	for (let e = i.length - 2; e >= 0; e--) {
		o = o * o % n, o = o * o % n, o = o * o % n, o = o * o % n;
		let t = i[e];
		t !== 0 && (o = o * a[t] % n);
	}
	return o;
}
function So(e, t, n) {
	if (n <= Q) throw Error("pow2: expected modulus > 1, got " + n);
	if (t < Z) throw Error("pow2: expected non-negative exponent, got " + t);
	let r = e;
	for (; t-- > Z;) r *= r, r %= n;
	return r;
}
function Co(e, t) {
	if (e === Z) throw Error("invert: expected non-zero number");
	if (t <= Q) throw Error("invert: expected modulus > 1, got " + t);
	let n = bo(e, t), r = t, i = Z, a = Q;
	for (; n !== Z;) {
		let e = r / n, t = r - n * e, o = i - a * e;
		r = n, n = t, i = a, a = o;
	}
	if (r !== Q) throw Error("invert: does not exist");
	return bo(i, t);
}
function wo(e, t, n) {
	let r = e;
	if (!r.eql(r.sqr(t), n)) throw Error("Cannot find square root");
}
function To(e, t) {
	if ((e & Q) === Z) throw Error(t + ": expected odd modulus, got " + e);
}
function Eo(e, t) {
	let n = e, r = (n.ORDER + Q) / fo, i = n.pow(t, r);
	return wo(n, i, t), i;
}
function Do(e, t) {
	let n = e, r = (n.ORDER - po) / ho, i = n.mul(t, lo), a = n.pow(i, r), o = n.mul(t, a), s = n.mul(n.mul(o, lo), a), c = n.mul(o, n.sub(s, n.ONE));
	return wo(n, c, t), c;
}
function Oo(e) {
	let t = Ro(e), n = ko(e), r = n(t, t.neg(t.ONE)), i = n(t, r), a = n(t, t.neg(r)), o = (e + mo) / vo;
	return ((e, t) => {
		let n = e, s = n.pow(t, o), c = n.mul(s, r), l = n.mul(s, i), u = n.mul(s, a), d = n.eql(n.sqr(c), t), f = n.eql(n.sqr(l), t);
		s = n.cmov(s, c, d), c = n.cmov(u, l, f);
		let p = n.eql(n.sqr(c), t), m = n.cmov(s, c, p);
		return wo(n, m, t), m;
	});
}
function ko(e) {
	if (e < uo) throw Error("sqrt is not defined for small field");
	To(e, "tonelliShanks");
	let t = e - Q, n = 0;
	for (; t % lo === Z;) t /= lo, n++;
	let r = lo, i = Ro(e);
	for (; Po(i, r) === 1;) if (r++ > 1e3) throw Error("Cannot find square root: probably non-prime P");
	if (n === 1) return Eo;
	let a = i.pow(r, t), o = (t + Q) / lo;
	return function(e, r) {
		let i = e;
		if (i.is0(r)) return r;
		if (Po(i, r) !== 1) throw Error("Cannot find square root");
		let s = n, c = i.mul(i.ONE, a), l = i.pow(r, t), u = i.pow(r, o);
		for (; !i.eql(l, i.ONE);) {
			if (i.is0(l)) throw Error("Cannot find square root: probably non-prime P");
			let e = 1, t = i.sqr(l);
			for (; !i.eql(t, i.ONE);) if (e++, t = i.sqr(t), e === s) throw Error("Cannot find square root");
			let n = Q << BigInt(s - e - 1), r = i.pow(c, n);
			s = e, c = i.sqr(r), l = i.mul(l, c), u = i.mul(u, r);
		}
		return u;
	};
}
function Ao(e) {
	return To(e, "Fp.sqrt"), e % fo === uo ? Eo : e % ho === po ? Do : e % vo === go ? Oo(e) : ko(e);
}
var jo = [
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
function Mo(e) {
	if (La(e, "field"), typeof e.ORDER != "bigint") throw TypeError("param \"ORDER\" is invalid: expected bigint, got " + typeof e.ORDER);
	Ya(e.BYTES, "BYTES"), Ya(e.BITS, "BITS");
	for (let t of jo) Ra(e[t], "field." + t);
	if (e.BYTES < 1 || e.BITS < 1) throw Error("invalid field: expected BYTES/BITS > 0");
	if (e.ORDER <= Q) throw Error("invalid field: expected ORDER > 1, got " + e.ORDER);
	return e;
}
function No(e, t, n = !1) {
	Mo(e), Pa(t, "nums"), qa(n, "passZero");
	let r = e, i = Array(t.length).fill(n ? r.ZERO : void 0), a = t.reduce((e, t, n) => r.is0(t) ? e : (i[n] = e, r.mul(e, t)), r.ONE), o = r.inv(a);
	return t.reduceRight((e, t, n) => r.is0(t) ? e : (i[n] = r.mul(e, i[n]), r.mul(e, t)), o), i;
}
function Po(e, t) {
	Mo(e);
	let n = e;
	To(n.ORDER, "FpLegendre");
	let r = (n.ORDER - Q) / lo, i = n.pow(t, r), a = n.eql(i, n.ONE), o = n.eql(i, n.ZERO), s = n.eql(i, n.neg(n.ONE));
	if (!a && !o && !s) throw Error("invalid Legendre symbol result");
	return a ? 1 : o ? 0 : -1;
}
function Fo(e, t) {
	if (t !== void 0 && Ia(t), e <= Z) throw Error("invalid n length: expected positive n, got " + e);
	if (t !== void 0 && t < 1) throw Error("invalid n length: expected positive bit length, got " + t);
	let n = oo(e);
	if (t !== void 0 && t < n) throw Error(`invalid n length: expected nBitLength (${t}) >= bitLen(n) (${n})`);
	let r = t === void 0 ? n : t;
	return {
		nBitLength: r,
		nByteLength: Math.ceil(r / 8)
	};
}
var Io = /* @__PURE__ */ new WeakMap(), Lo = class {
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
		let { nBitLength: r, nByteLength: i } = Fo(e, n);
		if (i > 2048) throw Error("invalid field: expected ORDER of <= 2048 bytes");
		this.ORDER = e, this.BITS = r, this.BYTES = i, Object.freeze(this);
	}
	create(e) {
		return bo(e, this.ORDER);
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
		return bo(-e, this.ORDER);
	}
	eql(e, t) {
		return e === t;
	}
	sqr(e) {
		return bo(e * e, this.ORDER);
	}
	add(e, t) {
		return bo(e + t, this.ORDER);
	}
	sub(e, t) {
		return bo(e - t, this.ORDER);
	}
	mul(e, t) {
		return bo(e * t, this.ORDER);
	}
	pow(e, t) {
		return xo(e, t, this.ORDER);
	}
	div(e, t) {
		return bo(e * Co(t, this.ORDER), this.ORDER);
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
		return Co(e, this.ORDER);
	}
	sqrt(e) {
		let t = Io.get(this);
		return t || Io.set(this, t = Ao(this.ORDER)), t(this, e);
	}
	toBytes(e) {
		return this.isLE ? eo(e, this.BYTES) : $a(e, this.BYTES);
	}
	fromBytes(e, t = !1) {
		Fa(e);
		let { _lengths: n, BYTES: r, isLE: i, ORDER: a, _mod: o } = this;
		if (n) {
			if (e.length < 1 || !n.includes(e.length) || e.length > r) throw Error("Field.fromBytes: expected " + n + " bytes, got " + e.length);
			let t = new Uint8Array(r);
			t.set(e, i ? 0 : t.length - e.length), e = t;
		}
		if (e.length !== r) throw Error("Field.fromBytes: expected " + r + " bytes, got " + e.length);
		let s = i ? Qa(e) : Za(e);
		if (o && (s = bo(s, a)), !t && !this.isValid(s)) throw Error("invalid field element: outside of range 0..ORDER");
		return s;
	}
	invertBatch(e) {
		return No(this, e, !0);
	}
	cmov(e, t, n) {
		return qa(n, "condition"), n ? t : e;
	}
};
function Ro(e, t = {}) {
	return Object.freeze(Lo.prototype), new Lo(e, t);
}
function zo(e) {
	if (typeof e != "bigint") throw Error("field order must be bigint");
	if (e <= Q) throw Error("field order must be greater than 1");
	let t = oo(e - Q);
	return Math.ceil(t / 8);
}
function Bo(e) {
	let t = zo(e);
	return t + Math.ceil(t / 2);
}
function Vo(e, t, n = !1) {
	Fa(e);
	let r = e.length, i = zo(t), a = Math.max(Bo(t), 16);
	if (r < a || r > 1024) throw Error("expected " + a + "-1024 bytes of input, got " + r);
	let o = bo(n ? Qa(e) : Za(e), t - Q) + Q;
	return n ? eo(o, i) : $a(o, i);
}
//#endregion
//#region node_modules/@noble/curves/abstract/curve.js
var Ho = /* @__PURE__ */ BigInt(0), Uo = /* @__PURE__ */ BigInt(1), Wo = /* @__PURE__ */ BigInt(4), Go = 16, Ko = 128, qo = 5, Jo = 2 ** 31;
function Yo(e) {
	let t = e;
	if (typeof t != "function") throw TypeError("\"Point\" expected constructor, got type=" + typeof e);
	Ra(t.fromAffine, "Point.fromAffine"), Ra(t.fromBytes, "Point.fromBytes"), Ra(t.fromHex, "Point.fromHex"), La(t.BASE, "Point.BASE"), La(t.ZERO, "Point.ZERO"), Mo(t.Fp), Mo(t.Fn);
}
function Xo(e, t) {
	Yo(e), es(t, e);
	let n = No(e.Fp, t.map((e) => e.Z));
	return t.map((t, r) => e.fromAffine(t.toAffine(n[r])));
}
function Zo(e, t, n = 1) {
	if (!Number.isSafeInteger(e) || e < n || e > t) throw Error("invalid window size, expected [" + n + ".." + t + "], got W=" + e);
}
function Qo(e, t) {
	let n = e * (4 * t + 128);
	if (n > Jo) throw Error("invalid window size: table would need ~" + Math.ceil(n / 2 ** 20) + " MiB, max " + Jo / 2 ** 20 + " MiB");
}
function $o(e, t) {
	if (e !== void 0) {
		Ra(e, "randomBytes");
		try {
			let n = e(t);
			if (!Ha(n) || n.length !== t) return;
		} catch {
			return;
		}
		return e;
	}
}
function es(e, t) {
	Pa(e, "points"), e.forEach((e, n) => {
		if (!(e instanceof t)) throw Error("invalid point at index " + n);
	});
}
function ts(e, t, n) {
	if (!Array.isArray(e)) throw Error("array of scalars expected");
	e.forEach((e, r) => {
		if (!(n === void 0 ? t.isValid(e) : ro(e) && e < n)) throw Error("invalid scalar at index " + r);
	});
}
var ns = /* @__PURE__ */ new WeakMap();
function rs(e) {
	return ns.get(e) || 1;
}
function is(e, t) {
	let n = e.double(), r = [e];
	for (let e = 1; e < t; e++) r.push(r[e - 1].add(n));
	return r;
}
function as(e, t) {
	let n = 2 ** t, r = n / 2, i = BigInt(n - 1), a = [];
	for (; e > Ho;) {
		let t = 0;
		e & Uo && (t = Number(e & i), t >= r && (t -= n), e -= BigInt(t)), a.push(t), e >>= Uo;
	}
	return a;
}
function os(e, t, n) {
	let r = 2 ** t, i = r / 2, a = BigInt(r - 1), o = BigInt(t), s = [];
	for (let t = 0; t < n; t++) {
		let t = Number(e & a);
		e >>= o, t > i && (t -= r, e += Uo), s.push(t);
	}
	if (e !== Ho) throw Error("invalid wnaf");
	return s;
}
function ss(e, t, n) {
	let r = 0;
	for (let e of n) r = Math.max(r, e.length);
	let i = e;
	for (let e = r - 1; e >= 0; e--) {
		e !== r - 1 && (i = i.double());
		for (let r = 0; r < n.length; r++) {
			let a = n[r][e];
			if (a) {
				let e = t[r][Math.abs(a) - 1 >> 1];
				i = i.add(a < 0 ? e.negate() : e);
			}
		}
	}
	return i;
}
var cs = class {
	Point;
	BASE;
	ZERO;
	randomBytes;
	wnafPrecomputes = /* @__PURE__ */ new WeakMap();
	baseCanBeBlinded;
	bits;
	constructor(e, t) {
		Yo(e), this.randomBytes = $o(t, Go), this.Point = e, this.BASE = e.BASE, this.ZERO = e.ZERO, this.bits = e.Fn.BITS;
	}
	buildWnafTable(e, t, n) {
		let r = Math.ceil(n / t) + 1, i = 2 ** (t - 1), a = [], o = e;
		for (let e = 0; e < r; e++) {
			let e = o;
			for (let t = 0; t < i; t++) a.push(e), e = e.add(o);
			o = a[a.length - 1].double();
		}
		return {
			W: t,
			bits: n,
			windows: r,
			comp: a
		};
	}
	wnafCachedCT(e, t) {
		let { W: n, windows: r, comp: i } = e, a = 2 ** (n - 1), o = os(t, n, r), s = this.ZERO, c = this.BASE;
		for (let e = 0; e < r; e++) {
			let t = o[e], n = e * a, r = Math.abs(t) - 1, l = i[n];
			for (let e = 1; e < a; e++) l = e === r ? i[n + e] : l;
			let u = l.negate();
			t === 0 ? c = c.add(i[n]) : s = s.add(t < 0 ? u : l);
		}
		return {
			p: s,
			f: c
		};
	}
	getWnafPrecomputes(e, t, n, r) {
		let i = this.wnafPrecomputes.get(t), a = i?.find((t) => t.W === e && t.bits === n);
		return a || (a = this.buildWnafTable(t, e, n), typeof r == "function" && (a = {
			...a,
			comp: r(a.comp)
		}), i || (i = [], this.wnafPrecomputes.set(t, i)), i.push(a)), a;
	}
	assertPoint(e) {
		if (!(e instanceof this.Point)) throw TypeError("\"point\" expected Point instance, got type=" + typeof e);
	}
	validateMulInput(e, t) {
		if (this.assertPoint(e), !io(t, Uo, this.Point.Fn.ORDER)) throw Error("invalid scalar");
	}
	runCT(e, t, n, r) {
		let i = rs(e);
		return i === 1 ? this.fixedWindowCT(e, t, n) : this.wnafCachedCT(this.getWnafPrecomputes(i, e, n, r), t);
	}
	mulCT(e, t, n) {
		return this.validateMulInput(e, t), this.runCT(e, t, this.bits, n);
	}
	mulCTBlinded(e, t, n) {
		if (this.validateMulInput(e, t), this.randomBytes === void 0) throw Error("randomBytes is required for scalar blinding");
		let r = this.Point.Fn.BITS + Ko, i = this.randomBytes(Go);
		if (!Ha(i) || i.length !== Go) throw Error("randomBytes returned invalid byte array");
		i[0] = i[0] & 63 | 128;
		let a = t + Za(i) * this.Point.Fn.ORDER;
		return this.runCT(e, a, r, n);
	}
	fixedWindowCT(e, t, n) {
		let r = qo, i = so(r), a = Array(32);
		a[0] = this.ZERO;
		for (let t = 1; t < 32; t++) a[t] = a[t - 1].add(e);
		let o = Math.ceil(n / r), s = this.ZERO;
		for (let e = o - 1; e >= 0; e--) {
			if (e !== o - 1) for (let e = 0; e < r; e++) s = s.double();
			let n = Number(t >> BigInt(e * r) & i), c = a[0];
			for (let e = 1; e < 32; e++) c = e === n ? a[e] : c;
			s = s.add(c);
		}
		return {
			p: s,
			f: s
		};
	}
	shouldBlind(e, t) {
		return this.randomBytes === void 0 ? !1 : t === Uo || e === this.BASE && (this.baseCanBeBlinded === void 0 && (this.baseCanBeBlinded = this.mulUnsafe(this.BASE, this.Point.Fn.ORDER).is0()), this.baseCanBeBlinded);
	}
	mulSecret(e, t, n, r) {
		return this.shouldBlind(e, n) ? this.mulCTBlinded(e, t, r) : this.mulCT(e, t, r);
	}
	mulUnsafe(e, t, n) {
		if (this.assertPoint(e), !ro(t)) throw Error("invalid scalar");
		let r = rs(e);
		if (r === 1 || t >= this.Point.Fn.ORDER) return ls(this.Point, [e], [t], !0);
		let i = this.getWnafPrecomputes(r, e, this.bits, n);
		return this.wnafCachedCT(i, t).p;
	}
	setWindowSize(e, t) {
		this.assertPoint(e), Zo(t, this.bits), Qo((Math.ceil((this.bits + Ko) / t) + 1) * 2 ** (t - 1), this.Point.Fp.BYTES), ns.set(e, t), this.wnafPrecomputes.delete(e);
	}
	hasWindowSize(e) {
		return rs(e) !== 1;
	}
};
function ls(e, t, n, r = !1) {
	if (Yo(e), es(t, e), qa(r, "allowOversized"), ts(n, e.Fn, r ? e.Fn.ORDER ** Wo : void 0), t.length !== n.length) throw Error("arrays of points and scalars must have equal length");
	let i = t.map((e) => is(e, 4)), a = n.map((e) => as(e, 4));
	return ss(e.ZERO, i, a);
}
function us(e, t, n) {
	if (t) {
		if (t.ORDER !== e) throw Error("Field.ORDER must match order: Fp == p, Fn == n");
		return Mo(t), t;
	}
	return Ro(e, { isLE: n });
}
function ds(e, t, n = {}, r) {
	if (e !== "weierstrass" && e !== "edwards") throw Error("expected curve type \"weierstrass\" or \"edwards\"");
	if (r === void 0 && (r = e === "edwards"), !t || typeof t != "object") throw Error(`expected valid ${e} CURVE object`);
	co(n);
	for (let e of [
		"p",
		"n",
		"h"
	]) {
		let n = t[e];
		if (!(ro(n) && n !== Ho)) throw Error(`CURVE.${e} must be positive bigint`);
	}
	let i = us(t.p, n.Fp, r), a = us(t.n, n.Fn, r), o = [
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
function fs(e, t) {
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
var ps = (e, t) => (e + (e >= 0 ? t : -t) / _s) / t;
function ms(e, t, n) {
	ao("scalar", e, hs, n);
	let [[r, i], [a, o]] = t, s = ps(o * e, n), c = ps(-i * e, n), l = e - s * r - c * a, u = -s * i - c * o, d = l < hs, f = u < hs;
	d && (l = -l), f && (u = -u);
	let p = so(Math.ceil(oo(n) / 2)) + gs;
	if (l < hs || l >= p || u < hs || u >= p) throw Error("splitScalar (endomorphism): failed for k");
	return {
		k1neg: d,
		k1: l,
		k2neg: f,
		k2: u
	};
}
var hs = /* @__PURE__ */ BigInt(0), gs = /* @__PURE__ */ BigInt(1), _s = /* @__PURE__ */ BigInt(2), vs = /* @__PURE__ */ BigInt(3), ys = /* @__PURE__ */ BigInt(4);
function bs(e, t = {}) {
	let n = ds("weierstrass", e, t), r = n.Fp, i = n.Fn, a = n.CURVE, { h: o, n: s } = a;
	co(t, {}, {
		allowInfinityPoint: "boolean",
		clearCofactor: "function",
		isTorsionFree: "function",
		fromBytes: "function",
		toBytes: "function",
		endo: "object",
		randomBytes: "function"
	});
	let { endo: c, allowInfinityPoint: l } = t, u = t.randomBytes === void 0 ? Ua : t.randomBytes;
	if (c && (!r.is0(a.a) || typeof c.beta != "bigint" || !Array.isArray(c.basises))) throw Error("invalid endo: expected \"beta\": bigint and \"basises\": array");
	let d = Ss(r, i);
	function f() {
		if (!r.isOdd) throw Error("compression is not supported: Field does not have .isOdd()");
	}
	function p(e, t, n) {
		if (l && t.is0()) return Uint8Array.of(0);
		let { x: i, y: a } = t.toAffine(), o = r.toBytes(i);
		return qa(n, "isCompressed"), n ? (f(), Ba(xs(!r.isOdd(a)), o)) : Ba(Uint8Array.of(4), o, r.toBytes(a));
	}
	function m(e) {
		Fa(e, void 0, "Point");
		let { publicKey: t, publicKeyUncompressed: n } = d, i = e.length, a = e[0], o = e.subarray(1);
		if (l && i === 1 && a === 0) return {
			x: r.ZERO,
			y: r.ZERO
		};
		if (i === t && (a === 2 || a === 3)) {
			let e = r.fromBytes(o);
			if (!r.isValid(e)) throw Error("bad point: is not on curve, wrong x");
			let t = y(e), n;
			try {
				n = r.sqrt(t);
			} catch (e) {
				let t = e instanceof Error ? ": " + e.message : "";
				throw Error("bad point: is not on curve, sqrt error" + t);
			}
			f();
			let i = r.isOdd(n);
			return (a & 1) == 1 !== i && (n = r.neg(n)), {
				x: e,
				y: n
			};
		}
		if (i === n && a === 4) {
			let e = r.BYTES, t = r.fromBytes(o.subarray(0, e)), n = r.fromBytes(o.subarray(e, e * 2));
			if (!b(t, n)) throw Error("bad point: is not on curve");
			return {
				x: t,
				y: n
			};
		}
		throw Error(`bad point: got length ${i}, expected compressed=${t} or uncompressed=${n}`);
	}
	let h = t.toBytes === void 0 ? p : t.toBytes, g = t.fromBytes === void 0 ? m : t.fromBytes, _ = r.mul(a.b, vs), v = r.is0(a.a) ? (e) => r.ZERO : (e) => r.mul(a.a, e);
	function y(e) {
		let t = r.sqr(e), n = r.mul(t, e);
		return r.add(r.add(n, r.mul(e, a.a)), a.b);
	}
	function b(e, t) {
		let n = r.sqr(t), i = y(e);
		return r.eql(n, i);
	}
	if (!b(a.Gx, a.Gy)) throw Error("bad curve params: generator point");
	let x = r.mul(r.pow(a.a, vs), ys), S = r.mul(r.sqr(a.b), BigInt(27));
	if (r.is0(r.add(x, S))) throw Error("bad curve params: a or b");
	function C(e, t, n = !1) {
		if (!r.isValid(t) || n && r.is0(t)) throw Error(`bad point coordinate ${e}`);
		return t;
	}
	function w(e) {
		if (!(e instanceof O)) throw Error("Weierstrass Point expected");
	}
	function T(e) {
		if (!c || !c.basises) throw Error("no endo");
		return ms(e, c.basises, i.ORDER);
	}
	function E(e, t, n, a) {
		if (!i.isValid(a)) throw RangeError("invalid scalar: out of range");
		if (c) {
			let { k1neg: i, k1: o, k2neg: s, k2: l } = T(a), u = new O(r.mul(n.X, c.beta), n.Y, n.Z);
			e.push(i ? n.negate() : n, s ? u.negate() : u), t.push(o, l);
		} else e.push(n), t.push(a);
	}
	let D = /* @__PURE__ */ new WeakSet();
	class O {
		static BASE = new O(a.Gx, a.Gy, r.ONE);
		static ZERO = new O(r.ZERO, r.ONE, r.ZERO);
		static Fp = r;
		static Fn = i;
		X;
		Y;
		Z;
		constructor(e, t, n) {
			this.X = C("x", e), this.Y = C("y", t, !0), this.Z = C("z", n), Object.freeze(this);
		}
		static CURVE() {
			return a;
		}
		static fromAffine(e) {
			let { x: t, y: n } = e || {};
			if (!e || !r.isValid(t) || !r.isValid(n)) throw Error("invalid affine point");
			if (e instanceof O) throw Error("projective point not allowed");
			return r.is0(t) && r.is0(n) ? O.ZERO : new O(t, n, r.ONE);
		}
		static fromBytes(e) {
			let t = O.fromAffine(g(Fa(e, void 0, "point")));
			return t.assertValidity(), t;
		}
		static fromHex(e) {
			return O.fromBytes(Va(e));
		}
		get x() {
			return this.toAffine().x;
		}
		get y() {
			return this.toAffine().y;
		}
		precompute(e = 6, t = !0) {
			return A.setWindowSize(this, e), t || this.multiply(vs), this;
		}
		assertValidity() {
			let e = this;
			if (e.is0()) {
				if (t.allowInfinityPoint && r.is0(e.X) && r.eql(e.Y, r.ONE) && r.is0(e.Z)) return;
				throw Error("bad point: ZERO");
			}
			if (D.has(e)) return;
			let { x: n, y: i } = e.toAffine();
			if (!r.isValid(n) || !r.isValid(i)) throw Error("bad point: x or y not field elements");
			if (!b(n, i)) throw Error("bad point: equation left != right");
			if (!e.isTorsionFree()) throw Error("bad point: not in prime-order subgroup");
			D.add(e);
		}
		hasEvenY() {
			let { y: e } = this.toAffine();
			if (!r.isOdd) throw Error("Field doesn't support isOdd");
			return !r.isOdd(e);
		}
		equals(e) {
			w(e);
			let { X: t, Y: n, Z: i } = this, { X: a, Y: o, Z: s } = e, c = r.eql(r.mul(t, s), r.mul(a, i)), l = r.eql(r.mul(n, s), r.mul(o, i));
			return c && l;
		}
		negate() {
			return new O(this.X, r.neg(this.Y), this.Z);
		}
		double() {
			let { X: e, Y: t, Z: n } = this, i = r.ZERO, a = r.ZERO, o = r.ZERO, s = r.mul(e, e), c = r.mul(t, t), l = r.mul(n, n), u = r.mul(e, t);
			return u = r.add(u, u), o = r.mul(e, n), o = r.add(o, o), i = v(o), a = r.mul(_, l), a = r.add(i, a), i = r.sub(c, a), a = r.add(c, a), a = r.mul(i, a), i = r.mul(u, i), o = r.mul(_, o), l = v(l), u = r.sub(s, l), u = v(u), u = r.add(u, o), o = r.add(s, s), s = r.add(o, s), s = r.add(s, l), s = r.mul(s, u), a = r.add(a, s), l = r.mul(t, n), l = r.add(l, l), s = r.mul(l, u), i = r.sub(i, s), o = r.mul(l, c), o = r.add(o, o), o = r.add(o, o), new O(i, a, o);
		}
		add(e) {
			w(e);
			let { X: t, Y: n, Z: i } = this, { X: a, Y: o, Z: s } = e, c = r.ZERO, l = r.ZERO, u = r.ZERO, d = r.mul(t, a), f = r.mul(n, o), p = r.mul(i, s), m = r.add(t, n), h = r.add(a, o);
			m = r.mul(m, h), h = r.add(d, f), m = r.sub(m, h), h = r.add(t, i);
			let g = r.add(a, s);
			return h = r.mul(h, g), g = r.add(d, p), h = r.sub(h, g), g = r.add(n, i), c = r.add(o, s), g = r.mul(g, c), c = r.add(f, p), g = r.sub(g, c), u = v(h), c = r.mul(_, p), u = r.add(c, u), c = r.sub(f, u), u = r.add(f, u), l = r.mul(c, u), f = r.add(d, d), f = r.add(f, d), p = v(p), h = r.mul(_, h), f = r.add(f, p), p = r.sub(d, p), p = v(p), h = r.add(h, p), d = r.mul(f, h), l = r.add(l, d), d = r.mul(g, h), c = r.mul(m, c), c = r.sub(c, d), d = r.mul(m, f), u = r.mul(g, u), u = r.add(u, d), new O(c, l, u);
		}
		subtract(e) {
			return w(e), this.add(e.negate());
		}
		is0() {
			return this.equals(O.ZERO);
		}
		multiply(e) {
			if (!i.isValidNot0(e)) throw RangeError("invalid scalar: out of range");
			let { p: t, f: n } = A.mulSecret(this, e, o, k);
			return k([t, n])[0];
		}
		multiplyUnsafe(e) {
			let t = this, n = e;
			if (!i.isValid(n)) throw RangeError("invalid scalar: out of range");
			if (n === hs || t.is0()) return O.ZERO;
			if (n === gs) return t;
			if (A.hasWindowSize(this)) return A.mulUnsafe(t, n, k);
			let r = [], a = [];
			return E(r, a, t, n), ls(O, r, a);
		}
		mulAddUnsafe(e, t, n) {
			w(t);
			let r = [], i = [];
			return E(r, i, this, e), E(r, i, t, n), ls(O, r, i);
		}
		toAffine(e) {
			let t = this, n = e;
			if (n != null && !r.isValid(n)) throw RangeError("\"invertedZ\" expected valid field element");
			let { X: i, Y: a, Z: o } = t;
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
			return o === gs ? !0 : e ? e(O, this) : A.mulUnsafe(this, s).is0();
		}
		clearCofactor() {
			let { clearCofactor: e } = t;
			return o === gs ? this : e ? e(O, this) : this.multiplyUnsafe(o);
		}
		isSmallOrder() {
			return o === gs ? this.is0() : this.clearCofactor().is0();
		}
		toBytes(e = !0) {
			return qa(e, "isCompressed"), this.assertValidity(), h(O, this, e);
		}
		toHex(e = !0) {
			return za(this.toBytes(e));
		}
		toString() {
			return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
		}
	}
	let k = (e) => Xo(O, e), A = new cs(O, u);
	return A.bits >= 6 && O.BASE.precompute(6), Object.freeze(O.prototype), Object.freeze(O), O;
}
function xs(e) {
	return Uint8Array.of(e ? 2 : 3);
}
function Ss(e, t) {
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
var Cs = {
	p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
	n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
	h: BigInt(1),
	a: BigInt(0),
	b: BigInt(7),
	Gx: BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),
	Gy: BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")
}, ws = {
	beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
	basises: [[BigInt("0x3086d221a7d46bcde86c90e49284eb15"), -BigInt("0xe4437ed6010e88286f547fa90abfe4c3")], [BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), BigInt("0x3086d221a7d46bcde86c90e49284eb15")]]
}, Ts = /* @__PURE__ */ BigInt(0), Es = /* @__PURE__ */ BigInt(2);
function Ds(e) {
	let t = Cs.p, n = BigInt(3), r = BigInt(6), i = BigInt(11), a = BigInt(22), o = BigInt(23), s = BigInt(44), c = BigInt(88), l = e * e * e % t, u = l * l * e % t, d = So(So(So(u, n, t) * u % t, n, t) * u % t, Es, t) * l % t, f = So(d, i, t) * d % t, p = So(f, a, t) * f % t, m = So(p, s, t) * p % t, h = So(So(So(So(So(So(m, c, t) * m % t, s, t) * p % t, n, t) * u % t, o, t) * f % t, r, t) * l % t, Es, t);
	if (!Os.eql(Os.sqr(h), e)) throw Error("Cannot find square root");
	return h;
}
var Os = /* @__PURE__ */ Ro(Cs.p, { sqrt: Ds }), ks = /* @__PURE__ */ bs(Cs, {
	Fp: Os,
	endo: ws
}), As = Object.create(null);
function js(e, ...t) {
	let n = As[e];
	if (n === void 0) {
		let t = Na(no(e));
		n = Ba(t, t), As[e] = n;
	}
	return Na(Ba(n, ...t));
}
var Ms = (e) => e.toBytes(!0).slice(1), Ns = ({ x: e }) => Os.toBytes(e), Ps = (e) => !Os.isOdd(e);
function Fs(e) {
	let { Fn: t, BASE: n } = ks, r = t.fromBytes(Fa(e, 32, "secretKey")), i = n.multiply(r).toAffine();
	return {
		scalar: Ps(i.y) ? r : t.neg(r),
		bytes: Ns(i)
	};
}
function Is(e) {
	let t = Os;
	if (!t.isValidNot0(e)) throw Error("invalid x: Fail if x ≥ p");
	let n = t.sqr(e), r = t.add(t.mulN(n, e), BigInt(7)), i = t.sqrt(r);
	Ps(i) || (i = t.neg(i));
	let a = ks.fromAffine({
		x: e,
		y: i
	});
	return a.assertValidity(), a;
}
var Ls = Za;
function Rs(...e) {
	return ks.Fn.create(Ls(js("BIP0340/challenge", ...e)));
}
function zs(e) {
	return Fs(e).bytes;
}
function Bs(e, t, n = Ca(32)) {
	let { Fn: r, BASE: i } = ks, a = Fa(e, void 0, "message"), { bytes: o, scalar: s } = Fs(t), c = Fa(n, 32, "auxRand"), l = js("BIP0340/nonce", r.toBytes(s ^ Ls(js("BIP0340/aux", c))), o, a), u = r.create(Ls(l));
	if (u === Ts) throw Error("sign failed: k is zero");
	let d = i.multiply(u).toAffine(), f = Ps(d.y) ? u : r.neg(u), p = Ns(d), m = Rs(p, o, a), h = /* @__PURE__ */ new Uint8Array(64);
	if (h.set(p, 0), h.set(r.toBytes(r.create(f + m * s)), 32), !Vs(h, a, o)) throw Error("sign: Invalid signature produced");
	return h;
}
function Vs(e, t, n) {
	let { Fp: r, Fn: i, BASE: a } = ks, o = Fa(e, 64, "signature"), s = Fa(t, void 0, "message"), c = Fa(n, 32, "publicKey");
	try {
		let e = Is(Ls(c)), t = o.subarray(0, 32), n = Ls(t);
		if (!r.isValidNot0(n)) return !1;
		let l = Ls(o.subarray(32, 64));
		if (!i.isValidNot0(l)) return !1;
		let u = Rs(t, Ms(e), s), d = a.mulAddUnsafe(l, e, i.neg(u)), { x: f, y: p } = d.toAffine();
		return !(d.is0() || !Ps(p) || !r.eql(f, n));
	} catch {
		return !1;
	}
}
var Hs = /* @__PURE__ */ (() => {
	let e = (e) => (e = e === void 0 ? Ca(48) : e, Vo(Fa(e, 48, "seed"), Cs.n));
	return Object.freeze({
		keygen: fs(e, zs),
		getPublicKey: zs,
		sign: Bs,
		verify: Vs,
		Point: ks,
		utils: Object.freeze({
			randomSecretKey: e,
			taggedHash: js,
			lift_x: Is,
			pointToBytes: Ms
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
var Us = new TextEncoder(), Ws = "https://w3id.org/security#";
function Gs() {
	return {
		id: "",
		created: "",
		dateDeleted: "",
		content: "",
		maker: "",
		sig: ""
	};
}
function Ks(e) {
	return JSON.stringify(e);
}
function qs(e) {
	return _a(Na(Us.encode(Ks(e))));
}
function Js(e, t, n) {
	return Hs.verify(ya(e), ya(qs(t)), ya(n));
}
function Ys(e, t) {
	return _a(Hs.sign(ya(qs(e)), ya(t)));
}
//#endregion
//#region src/utils/keyHelpers/otherHelpers.ts
var Xs = (e) => {
	let t = P.any(e, j.space("preferencesFile"), null, e.doc())?.value;
	if (t = t?.split("/").slice(0, -2).join("/"), !t) throw Error(`prefererencesFile is expected to exist in ${e}`);
	return t;
}, Zs = (e) => {
	let t;
	try {
		t = `${Xs(e)}/profile/keys/publicKey.ttl`;
	} catch (e) {
		be(e);
	}
	return t;
}, Qs = (e) => {
	let t;
	try {
		t = `${Xs(e)}/settings/keys/privateKey.ttl`;
	} catch (e) {
		be(e);
	}
	return t;
};
async function $s(e, t) {
	return await tc(e, t, "publicKey");
}
async function ec(e, t) {
	return await tc(e, t, "privateKey");
}
async function tc(e, t, n) {
	try {
		return await P.fetcher.load(t), P.any(e, j.solid(n))?.value;
	} catch (e) {
		if (e.response.status === 404) {
			z("createIfNotExists: doc does NOT exist, will create... " + t);
			try {
				await P.fetcher.webOperation("PUT", t, {
					data: "",
					contentType: "text/turtle"
				});
			} catch (e) {
				throw z("createIfNotExists doc FAILED: " + t + ": " + e), e;
			}
			delete P.fetcher.requested[t];
			return;
		}
		throw z("createIfNotExists doc FAILED: " + t + ": " + e), e;
	}
}
//#endregion
//#region src/utils/keyHelpers/acl.ts
async function nc(e, t) {
	await P.fetcher.load(e);
	let n = P.any(P.sym(e), P.sym("http://www.iana.org/assignments/link-relations/acl"));
	if (!n) throw Error("Key ACL doc not found!");
	try {
		await P.fetcher.webOperation("PUT", n.value, {
			data: t,
			contentType: "text/turtle"
		});
	} catch (e) {
		if (e?.response?.status !== 404) throw Error(e);
		z("delete " + n.value + " " + e.response.status);
	}
}
var rc = (e) => `
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
`, ic = (e, t) => {
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
function ac() {
	return _a(Hs.utils.randomSecretKey());
}
function oc(e) {
	return _a(Hs.getPublicKey(ya(e)));
}
async function sc(e) {
	await P.fetcher.load(e);
	let t = await Zs(e);
	try {
		return await P.fetcher.load(t), P.any(e, j.solid("publicKey"))?.value;
	} catch {
		return;
	}
}
async function cc(e) {
	await P.fetcher.load(e);
	let t = await Zs(e), n = await Qs(e), r = await $s(e, t), i = await ec(e, n), a = !0;
	if (i && r !== oc(i) && confirm("This is strange the publicKey is not valid for\n" + e?.uri + "'shall we repair keeping the private key ?") && (a = !1), !i || !r || !a) {
		let o = [], s = [];
		if (i || (i = ac(), s = [_(e, j.solid("privateKey"), x(i), P.sym(n))], await uc(n, [], s, e.uri)), !r || !a) {
			o = [], r && (o = [_(e, j.solid("publicKey"), oe(r), P.sym(t))], z("delete invalid publicKey " + o));
			let n = oc(i);
			s = [_(e, j.solid("publicKey"), x(n), P.sym(t))], await uc(t, o, s);
		}
		await nc(n.substring(0, n.lastIndexOf("/") + 1), rc(e.uri));
	}
	return i;
}
var lc = async (e) => {
	await P.fetcher.load(e);
	let t = P.any(P.sym(e), P.sym("http://www.iana.org/assignments/link-relations/acl"));
	if (t) try {
		let e = await P.fetcher.webOperation("DELETE", t.value);
		z("delete keyAcl" + t.value + " " + e.status);
	} catch (e) {
		if (e.response.status !== 404) throw Error(e);
		z("delete keyAcl" + t.value + " " + e.response.status);
	}
};
async function uc(e, t, n, r = "") {
	await lc(e), await P.updater.updateMany(t, n), await nc(e, ic(e, r));
}
//#endregion
//#region src/chat/chatLogic.js
var dc = class {
	constructor(e, t) {
		this.channel = e, this.channelRoot = e.doc(), this.options = t, this.dateFolder = new ta(this.channelRoot, "chat.ttl"), this.div = null;
	}
	async createMessage(e) {
		return this.updateMessage(e);
	}
	async updateMessage(e, t = null, n, r = null) {
		let i = [], a = /* @__PURE__ */ new Date(), s = "" + a.getTime(), c = o(a), l = t ? t.doc() : this.dateFolder.leafDocumentFromDate(a), u = P.sym(l.uri + "#Msg" + s), d = N.currentUser(), f = Gs();
		if (f.id = u.uri, t) {
			let e = P.any(t, j.foaf("maker"));
			if (e.uri === d.uri) {
				let e = await mc(t);
				i.push(_(e, j.dct("isReplacedBy"), u, l));
				let r = P.any(e, j.sioc("has_reply"));
				r && i.push(_(u, j.sioc("has_reply"), r, l)), n && i.push(_(u, j.schema("dateDeleted"), c, l));
			} else {
				let t = "Error you cannot delete/edit a message from someone else : \n" + e.uri;
				throw B(t), alert(t), Error(t);
			}
		} else i.push(_(this.channel, j.wf("message"), u, l));
		if (i.push(_(u, j.sioc("content"), P.literal(e), l)), f.content = e, i.push(_(u, j.dct("created"), c, l)), f.created = c.value, d) {
			i.push(_(u, j.foaf("maker"), d, l)), f.maker = d.uri;
			let e = Ys(f, await cc(d));
			i.push(_(u, F(`${Ws}proofValue`), oe(e), l));
		}
		r && (i.push(_(r, j.sioc("has_member"), u, l)), r.doc().sameTerm(u.doc()) || i.push(_(r, j.sioc("has_member"), u, r.doc())));
		try {
			await P.updater.updateMany([], i);
		} catch (e) {
			let t = "Error saving chat message: " + e;
			throw B(t), alert(t), Error(t);
		}
		return u;
	}
	async deleteMessage(e) {
		return this.updateMessage("(message deleted)", e, !0);
	}
	async createThread(e) {
		let t = P.each(e, j.sioc("has_reply"), null, e.doc()).filter((e) => P.holds(e, j.rdf("type"), j.sioc("Thread"), e.doc()));
		if (t.length > 0) return t[0];
		let n = F(e.uri + "-thread"), r = [_(n, j.rdf("type"), j.sioc("Thread"), n.doc()), _(e, j.sioc("has_reply"), n, n.doc())];
		return await P.updater.update([], r), n;
	}
};
async function fc(e) {
	let t = [e], n = {};
	n[e.uri] = !0;
	let r = e;
	for (;;) {
		let e = P.any(null, j.dct("isReplacedBy"), r, r.doc());
		if (!e || n[e.uri]) break;
		await P.fetcher.load(e), t.unshift(e), n[e.uri] = !0, r = e;
	}
	for (r = e;;) {
		let e = P.any(r, j.dct("isReplacedBy"), null, r.doc());
		if (!e || n[e.uri]) break;
		t.push(e), n[e.uri] = !0, r = e;
	}
	return t;
}
async function pc(e) {
	let t = e, n = {};
	for (; t;) {
		if (n[t.uri]) return be("originalVersion: verion loop" + e), e;
		n[t.uri] = !0, e = t, await P.fetcher.load(e), t = P.any(null, j.dct("isReplacedBy"), e, e.doc());
	}
	return e;
}
async function mc(e) {
	let t = e, n = {};
	for (; t;) {
		if (n[t.uri]) return be("mostRecentVersion: verion loop" + e), e;
		n[t.uri] = !0, e = t, await P.fetcher.load(e), t = P.any(e, j.dct("isReplacedBy"), null, e.doc());
	}
	return e;
}
function hc(e) {
	return P.holds(e, j.schema("dateDeleted"), null, e.doc());
}
//#endregion
//#region src/lib/participation.ts
var gc = /* @__PURE__ */ r({
	manageParticipation: () => xc,
	participationObject: () => yc,
	recordParticipation: () => bc,
	renderParticipants: () => vc
}), _c = D.store;
function vc(e, t, n, r, i, a) {
	t.setAttribute("style", L.participantsStyle);
	let o = function(n) {
		let r = _c.any(n, j.wf("participant")), i;
		if (!r) return i = e.createElement("tr"), i.textContent = "???", i;
		let o = _c.anyValue(n, j.ui("backgroundColor")) || me.participationDefaultBackground, s = e.createElement("div");
		s.setAttribute("style", L.participantsBlock), s.style.backgroundColor = o, i = Kt(e, null, r, a), t.appendChild(i);
		let c = e.createElement("td");
		return c.setAttribute("style", L.personTableTD), c.appendChild(s), i.insertBefore(c, i.firstChild), i;
	}, s = function() {
		let e = _c.each(r, j.wf("participation")).map(function(e) {
			return z("in participants"), [_c.anyValue(e, j.cal("dtstart")) || "9999-12-31", e];
		});
		e.sort();
		let n = e.map(function(e) {
			return e[1];
		});
		ve(t, n, o);
	};
	return t.refresh = s, s(), t;
}
function yc(e, t, n) {
	return new Promise(function(r, i) {
		if (!n) throw Error("No user id");
		let a = _c.each(e, j.wf("participation")).filter(function(e) {
			return _c.holds(e, j.wf("participant"), n);
		});
		if (a.length > 1) {
			let e = [];
			for (let t of a) {
				let n = _c.anyValue(t, j.cal("dtstart"));
				n && e.push([n, t]);
			}
			e.sort(), B("Multiple participation objects, picking earliest, in " + t), r(e[0][1]);
		}
		if (a.length) r(a[0]);
		else {
			let a = X(t), o = [
				_(e, j.wf("participation"), a, t),
				_(a, j.wf("participant"), n, t),
				_(a, j.cal("dtstart"), /* @__PURE__ */ new Date(), t),
				_(a, j.ui("backgroundColor"), Tc(n), t)
			];
			_c.updater.update([], o, function(e, t, n) {
				t ? r(a) : i(/* @__PURE__ */ Error("Error recording your participation: " + n));
			}), r(a);
		}
	});
}
function bc(e, t, n) {
	let r = N.currentUser();
	if (!r) return;
	let i = _c.each(e, j.wf("participation")).filter(function(e) {
		return _c.holds(e, j.wf("participant"), r);
	});
	if (i.length > 1) throw Error("Multiple records of your participation");
	if (i.length) return i[0];
	{
		if (!_c.updater.editable(t)) return z("Not recording participation, as no write access as " + r + " to " + t), null;
		let i = X(t), a = [
			_(e, j.wf("participation"), i, t),
			_(i, j.wf("participant"), r, t),
			_(i, j.cal("dtstart"), /* @__PURE__ */ new Date(), t),
			_(i, j.ui("backgroundColor"), Tc(r), t)
		];
		return _c.updater.update([], a, function(e, t, r) {
			if (!t) throw Error("Error recording your participation: " + r);
			n && n.refresh && n.refresh();
		}), i;
	}
}
function xc(e, t, n, r, i, a) {
	let o = e.createElement("table");
	t.appendChild(o), vc(e, o, n, r, i, a);
	try {
		bc(r, n, o);
	} catch (n) {
		t.appendChild(U(e, "Error recording your participation: " + n));
	}
	return o;
}
//#endregion
//#region src/lib/pad.ts
var Sc = /* @__PURE__ */ r({
	getChunks: () => Dc,
	lightColorHash: () => Tc,
	manageParticipation: () => xc,
	notepad: () => Ec,
	notepadToHTML: () => kc,
	participationObject: () => yc,
	recordParticipation: () => bc,
	renderParticipants: () => vc,
	xmlEncode: () => Oc
}), Cc = D.store, wc = f("http://www.w3.org/ns/pim/pad#");
function Tc(e) {
	return e && e.uri ? "#" + (function(e) {
		return e.split("").reduce(function(e, t) {
			return e = (e << 5) - e + t.charCodeAt(0), e & e;
		}, 0);
	}(e.uri) & 16777215 | 12632256).toString(16) : "#ffffff";
}
function Ec(e, t, n, r, i) {
	i ||= {};
	let a = i.exists, o = e.createElement("table"), s = Cc;
	if (r && !r.uri) throw Error("UI.pad.notepad:  Invalid userid");
	let c = Cc.updater, l = f("http://www.w3.org/ns/pim/pad#");
	o.setAttribute("style", L.notepadStyle);
	let u = null, p = null;
	if (i.statusArea) {
		let t = i.statusArea.appendChild(e.createElement("table")).appendChild(e.createElement("tr"));
		u = t.appendChild(e.createElement("td")), p = t.appendChild(e.createElement("td")), u && u.setAttribute("style", L.upstreamStatus), p && p.setAttribute("style", L.downstreamStatus);
	}
	let m = function(t, n = !1) {
		z(t), i.statusArea && (n ? u : p).appendChild(U(e, t, "pink"));
	}, h = function(e) {
		i.statusArea && (i.statusArea.innerHTML = "");
	}, g = function(e, t, n) {
		let r = e.subject;
		t ||= "";
		let i = L.baseStyle, a = L.headingCore, o = L.headingStyle, c = s.any(r, j.dc("author"));
		if (!t && c) {
			let e = Tc(c);
			t = "color: " + (n ? "#888" : "black") + "; background-color: " + e + ";";
		}
		let u = s.any(r, l("indent"));
		u = u ? u.value : 0;
		let d = u >= 0 ? i + "text-indent: " + u * 3 + "em;" : a + o[-1 - u];
		e.setAttribute("style", d + t);
	}, v = function(e) {
		let r = e.subject;
		if (!r) throw Error("No chunk for line to be deleted!");
		let i = s.any(void 0, l("next"), r), a = s.any(r, l("next"));
		if (i.sameTerm(n) && a.sameTerm(n)) {
			z("You can't delete the only line.");
			return;
		}
		let o = s.statementsMatching(r, void 0, void 0, t).concat(s.statementsMatching(void 0, void 0, r, t)), u = [_(i, l("next"), a, t)];
		if (r instanceof d && z("Deleting line " + r.uri.slice(-4)), !c) throw Error("have no updater");
		c.update(o, u, function(t, n, i, a) {
			if (n) {
				let t = e.parentNode;
				if (t) {
					let e = t.previousSibling;
					t.parentNode && t.parentNode.removeChild(t), e && e.firstChild && e.firstChild.focus();
				}
			} else if (a && a.status === 409) g(e, "color: black;  background-color: #ffd;"), e.state = 0, _e(.5, 512), setTimeout(function() {
				O();
			}, 1e3);
			else {
				z("    removePart FAILED " + r + ": " + i), z("    removePart was deleting :'" + o), g(e, "color: black;  background-color: #fdd;");
				let t = a ? a.status : " [no response field] ";
				m("Error " + t + " saving changes: " + String(i));
			}
		});
	}, y = function(e, n, r) {
		let i = s.statementsMatching(n, l("indent")), a = i.length ? Number(i[0].object.value) : 0;
		if (a + r < -3) return;
		let o = a + r, u = _(n, l("indent"), o, t);
		if (!c) throw Error("no updater");
		c.update(i, u, function(n, r, i) {
			r ? g(e) : (z("Indent change FAILED '" + o + "' for " + t + ": " + i), g(e, "color: black;  background-color: #fdd;"), c.requestDownstreamAction(t, O));
		});
	}, b = function(e, n) {
		let r = null;
		e.addEventListener("keydown", function(r) {
			if (!c) throw Error("no updater");
			let i, a;
			switch (r.keyCode) {
				case 13: {
					let t = r.shiftKey;
					if (z("enter"), t ? (a = s.any(void 0, l("next"), n), i = "newlinesAfter") : (a = s.any(n, l("next")), i = "newlinesBefore"), a[i] = a[i] || 0, a[i] += 1, a[i] > 1) {
						z("    queueing newline queue = " + a[i]);
						return;
					}
					z("    go ahead line before " + a[i]), S(e, t);
					break;
				}
				case 8:
					if (e.value.length === 0) switch (z("Delete key line " + n.uri.slice(-4) + " state " + e.state), e.state) {
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
					z("escape"), c.requestDownstreamAction(t, O), r.preventDefault();
					break;
				case 38:
					e.parentNode.previousSibling && (e.parentNode.previousSibling.firstChild.focus(), r.preventDefault());
					break;
				case 40: e.parentNode.nextSibling && (e.parentNode.nextSibling.firstChild.focus(), r.preventDefault());
			}
		});
		let i = function(e) {
			let n = e.subject;
			g(e, void 0, !0);
			let r = s.any(n, j.sioc("content")).value, a = [_(n, j.sioc("content"), r, t)], o;
			e.value && (o = [_(n, j.sioc("content"), e.value, t)]);
			let l = e.value;
			if (e.lastSent && r !== e.lastSent && console.warn("Out of order, last sent expected '" + r + "' but found '" + e.lastSent + "'"), e.lastSent = l, !c) throw Error("no updater");
			c.update(a, o, function(n, a, o, s) {
				if (a) h(!0), g(e), z("    Patch ok '" + r + "' -> '" + l + "' "), e.state === 4 ? (e.state = 3, v(e)) : e.state === 3 || (e.state === 2 ? (e.state = 1, i(e)) : e.state = 0);
				else if (z("    patch FAILED " + s.status + " for '" + r + "' -> '" + l + "': " + o), s.status === 409) g(e, "color: black;  background-color: #fdd;"), e.state = 0, _e(.5, 512), setTimeout(function() {
					c.requestDownstreamAction(t, O);
				}, 1e3);
				else {
					g(e, "color: black;  background-color: #fdd;");
					let t = s?.status;
					!t || t === 502 || t === 503 ? (e.lastSent = void 0, e.state = 0, setTimeout(() => {
						(e.state === 0 || e.state === void 0) && (e.state = 1, i(e));
					}, 2e3)) : (e.state = 0, m("    Error " + t + " sending data: " + o, !0), _e(1, 128));
				}
			});
		};
		e.addEventListener("input", function(t) {
			switch (g(e, void 0, !0), z("Input event state " + e.state + " value '" + e.value + "'"), e.state) {
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
		let a = s.any(n, j.sioc("content"));
		a = a ? a.value : "";
		let c = e.createElement("tr");
		i ? o.insertBefore(c, t) : t && t.nextSibling ? o.insertBefore(c, t.nextSibling) : o.appendChild(c);
		let l = c.appendChild(e.createElement("input"));
		return l.subject = n, l.setAttribute("type", "text"), l.value = a, r ? (g(l, ""), b(l, n)) : (g(l, "color: #222; background-color: #fff"), z("Note can't add listeners - not logged in")), l;
	}, S = function(e, i) {
		let a = Cc, o = 0, s = null, u, d, f, p, m;
		e ? (e.tagName.toLowerCase() !== "input" && z("return pressed when current document is: " + e.tagName), u = e.subject, o = a.any(u, l("indent")), o = o ? Number(o.value) : 0, i ? (d = a.any(void 0, l("next"), u), f = u, p = d, s = "newlinesAfter") : (d = u, f = a.any(u, l("next")), p = f, s = "newlinesBefore"), m = e.parentNode) : (d = n, f = n, m = void 0);
		let h = X(t), v = h.uri.slice(-4), y = [_(d, l("next"), f, t)], b = [
			_(d, l("next"), h, t),
			_(h, l("next"), f, t),
			_(h, j.dc("author"), r, t),
			_(h, j.sioc("content"), "", t)
		];
		if (o > 0 && b.push(_(h, l("indent"), o, t)), z("    Fresh chunk " + v + " proposed"), !c) throw Error("no updater");
		c.update(y, b, function(e, t, n, r) {
			if (!t) z("    ERROR writing new line " + v + ": " + n);
			else {
				let e = x(m, h, i);
				g(e), e.focus(), s && (z("    Fresh chunk " + v + " updated, queue = " + p[s]), --p[s], p[s] > 0 && (z("    Implementing queued newlines = " + f.newLinesBefore), S(e, i)));
			}
		});
	}, C = function() {
		let e = {}, t = 0;
		function r(e) {
			m(e), t++;
		}
		if (!s.the(n, l("next"))) return r("No initial next pointer"), !1;
		let i = n, a;
		for (; a = s.the(i, l("next")), a || r("No next pointer from " + i), !a.sameTerm(n);) {
			i = a;
			let t = a.uri.split("#")[1];
			if (e[a.uri]) return r("Loop!"), !1;
			e[a.uri] = !0;
			let n = s.each(a, l("next")).length;
			n !== 1 && r("Should be 1 not " + n + " next pointer for " + t), n = s.each(a, l("indent")).length, n > 1 && r("Should be 0 or 1 not " + n + " indent for " + t), n = s.each(a, j.sioc("content")).length, n !== 1 && r("Should be 1 not " + n + " contents for " + t), n = s.each(a, j.dc("author")).length, n !== 1 && r("Should be 1 not " + n + " author for " + t), s.statementsMatching(void 0, j.sioc("contents")).forEach(function(t) {
				e[t.subject.value] || r("Loose chunk! " + t.subject.value);
			});
		}
		return !t;
	}, w = function() {
		if (s.each(n, l("next")).length !== 1) {
			let e = "Pad: Inconsistent data - NEXT pointers: " + s.each(n, l("next")).length;
			z(e), i.statusArea && (i.statusArea.textContent += e);
			return;
		}
		let e, t = [];
		for (let e = s.the(n, l("next")); !e.sameTerm(n); e = s.the(e, l("next"))) for (let n = 0; n < o.children.length; n++) {
			let r = o.children[n];
			r.firstChild && r.firstChild.subject.sameTerm(e) && (t[e.uri] = r.firstChild);
		}
		for (let n = o.children.length - 1; n >= 0; n--) e = o.children[n], t[e.firstChild.subject.uri] || o.removeChild(e);
		e = o.firstChild;
		for (let r = s.the(n, l("next")); !r.sameTerm(n); r = s.the(r, l("next"))) {
			let n = s.any(r, j.sioc("content")).value;
			if (e && t[r.uri]) {
				let t = e.firstChild;
				n !== t.value && (t.value = n), g(t), t.state = 0, delete t.lastSent, e = e.nextSibling;
			} else x(e, r, !0);
		}
	}, T = function(e) {
		if (e.refresh) {
			e.refresh();
			return;
		}
		for (let t = 0; t < e.children.length; t++) T(e.children[t]);
	}, E = !1, D = function() {
		z("    reloaded OK"), h(), C() ? T(o) : m("CONSISTENCY CHECK FAILED");
	}, O = function() {
		if (E) {
			z("   Already reloading - stop");
			return;
		}
		E = !0;
		let e = 1e3, n = function() {
			if (z("try reload - timeout = " + e), !c) throw Error("no updater");
			c.reload(c.store, t, function(r, i, a) {
				E = !1, r ? D() : a.status === 0 ? (m("Network error refreshing the pad. Retrying in " + e / 1e3), E = !0, e *= 2, setTimeout(n, e)) : m("Error " + a.status + "refreshing the pad:" + i + ". Stopped. " + t);
			});
		};
		n();
	};
	if (o.refresh = w, o.reloadAndSync = O, r || z("Warning: must be logged in for pad to be edited"), a) z("Existing pad."), C() ? (w(), s.holds(n, l("next"), n) && S()) : z(o.textContent = "Inconsistent data. Abort");
	else {
		z("No pad exists - making new one.");
		let e = [
			_(n, j.rdf("type"), l("Notepad"), t),
			_(n, j.dc("author"), r, t),
			_(n, j.dc("created"), /* @__PURE__ */ new Date(), t),
			_(n, l("next"), n, t)
		];
		if (!c) throw Error("no updater");
		c.update([], e, function(e, t, n) {
			t ? (z("Initial pad created"), S()) : m(n || "");
		});
	}
	return o;
}
function Dc(e, t) {
	let n = [];
	for (let r = t.the(e, wc("next")); !r.sameTerm(e); r = t.the(r, wc("next"))) n.push(r);
	return n;
}
function Oc(e) {
	return e.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
}
function kc(e, t) {
	let n = Dc(e, t), r = "<html>\n  <head>\n", i = t.anyValue(e, j.dct("title"));
	i && (r += `    <title>${Oc(i)}</title>\n`), r += "  </head>\n  <body>\n";
	let a = 0;
	function o(e) {
		for (; a < e; a++) r += "<ul>\n";
	}
	function s(e) {
		for (; a > e; a--) r += "</ul>\n";
	}
	return n.forEach((e) => {
		let n = t.anyJS(e, wc("indent")), i = t.anyJS(e, j.sioc("content"));
		if (!i) return;
		let a = Oc(i);
		if (n < 0) {
			s(0);
			let e = n >= -3 ? 4 + n : 1;
			r += `\n<h${e}>${a}</h${e}>\n`;
		} else n > 0 ? (s(n), o(n), r += `<li>${a}</li>\n`) : (s(n), r += `<p>${a}</p>\n`);
	}), s(0), r += "  </body>\n</html>\n", r;
}
//#endregion
//#region src/chat/bookmarks.js
var Ac = {
	icons: W,
	ns: j,
	media: Zi,
	pad: Sc,
	style: L,
	utils: fe,
	widgets: Ur
}, jc = f("http://www.w3.org/2002/01/bookmark#"), Mc = "noun_45961.svg", Nc = R, Pc = window.document || null;
function Fc(e, t) {
	return new Promise(function(n, r) {
		P.updater.update(e, t, function(e, t, i) {
			t ? n() : r(Error(i));
		});
	});
}
async function Ic(e) {
	let t = jc("Bookmark");
	if (await ii(e, t, !0), e.instances && e.instances.length > 0) e.bookmarkDocument = e.instances[0], e.instances.length > 1 && B("More than one bookmark file! " + e.instances);
	else if (e.publicProfile) {
		let n = F(e.publicProfile.dir().uri + "bookmarks.ttl");
		try {
			z("Creating new bookmark file " + n), await P.fetcher.createIfNotExists(n);
		} catch (t) {
			return B("Can't make fresh bookmark file:" + t), e;
		}
		await b.registerInTypeIndex(n, e.index, t), e.bookmarkDocument = n;
	} else B("You seem to have no bookmark file, nor even a profile file!");
	return e;
}
async function Lc(e, t) {
	let n = "", r = N.currentUser();
	if (!r) throw Error("Must be logged on to add Bookmark");
	n = Nc(P.any(t, j.foaf("maker"))) + ": " + P.anyValue(t, j.sioc("content")).slice(0, 80);
	let i = e.bookmarkDocument, a = Ac.widgets.newThing(i, n), o = [
		_(i, Ac.ns.dct("references"), a, i),
		_(a, Ac.ns.rdf("type"), jc("Bookmark"), i),
		_(a, Ac.ns.dct("created"), /* @__PURE__ */ new Date(), i),
		_(a, jc("recalls"), t, i),
		_(a, Ac.ns.foaf("maker"), r, i),
		_(a, Ac.ns.dct("title"), n, i)
	];
	try {
		await Fc([], o);
	} catch (e) {
		return B("Making bookmark: " + e), null;
	}
	return a;
}
async function Rc(e, t, n) {
	await P.fetcher.load(e.bookmarkDocument);
	let r = P.each(null, jc("recalls"), t, e.bookmarkDocument);
	if (r.length) {
		if (!confirm("Delete bookmark on this?" + r.length)) return;
		for (let e = 0; e < r.length; e++) try {
			await Fc(P.connectedStatements(r[e]), []), n.style.backgroundColor = "white", z("Bookmark deleted: " + r[e]);
		} catch (e) {
			be("Cant delete bookmark:" + e), B("Cannot delete bookmark:" + e);
		}
	} else {
		let r = await Lc(e, t);
		n.style.backgroundColor = "yellow", z("Bookmark added: " + r);
	}
}
async function zc(e, t) {
	async function n(t) {
		await P.fetcher.load(e.bookmarkDocument);
		let n = P.any(null, jc("recalls"), t.target, e.bookmarkDocument);
		t.style = Ac.style.buttonStyle, n && (t.style.backgroundColor = "yellow");
	}
	let r;
	if (e.bookmarkDocument) return r = Ac.widgets.button(Pc, Ac.icons.iconBase + Mc, Nc(jc("Bookmark")), () => {
		Rc(e, t, r);
	}), r.target = t, await n(r), r;
}
//#endregion
//#region src/chat/messageTools.js
var Bc = window.document, Vc = "noun_253504.svg", Hc = "noun_1384132.svg", Uc = "noun_1384135.svg", Wc = "noun-reply-5506924.svg", Gc = {};
Gc[j.schema("AgreeAction")] = "👍", Gc[j.schema("DisagreeAction")] = "👎", Gc[j.schema("EndorseAction")] = "⭐️", Gc[j.schema("LikeAction")] = "❤️";
async function Kc(e, t) {
	let n = Bc.createElement("span");
	async function r() {
		if (n.innerHTML = "", hc(e)) return n;
		let r = (await fc(e)).map((e) => P.each(null, j.schema("target"), e, t)).flat();
		if (r.length === 0) return n;
		let i = r.map((e) => [
			P.any(e, j.rdf("type"), null, t),
			P.any(e, j.sioc("content"), null, t),
			P.any(e, j.schema("agent"), null, t)
		]);
		i.sort(), i.forEach((e) => {
			let [t, r, i] = e, a;
			i ? (a = Bc.createElement("a"), a.setAttribute("href", i.uri)) : a = Bc.createTextNode(""), a.textContent = r || Gc[t] || "⬜️", n.appendChild(a);
		});
	}
	return r().then(z("sentimentStripLinked: sentimentStripLinked async refreshed")), n.refresh = r, n;
}
async function qc(e, t, n, r) {
	async function i() {
		let i = P.any(e, j.foaf("maker"));
		if (!u) alert("You can't delete the message, you are not logged in.");
		else if (u.sameTerm(i)) {
			try {
				await r.deleteMessage(e);
			} catch (e) {
				let r = "Error deleting messaage " + e;
				B(r), alert(r), (n.statusArea || t.parentNode).appendChild(U(Bc, r));
			}
			t.parentNode.removeChild(t);
		} else alert("You can't delete the message, you are not logged in as the author, " + i);
		c();
	}
	async function a(t) {
		u.value === P.any(e, j.foaf("maker")).value && (c(), await nl(t, e, r, n));
	}
	async function o() {
		let t = await r.createThread(e), i = n.chatOptions;
		if (!i) throw Error("replyInThread: missing options");
		i.showThread(t, i), c();
	}
	let s = Bc.createElement("div");
	if (await mc(e).value === j.schema("dateDeleted").value) return s;
	function c() {
		s.parentElement.parentElement.removeChild(s.parentElement);
	}
	async function l(e) {
		await P.updater.update(P.connectedStatements(e), []);
	}
	let u = N.currentUser();
	u && P.holds(e, j.foaf("maker"), u) && (s.appendChild(Ht(Bc, s, "message", i)), s.appendChild(K(Bc, W.iconBase + Vc, "edit", () => a(t)))), zc(n).then((e) => {
		e && s.appendChild(e);
	});
	function d(e, n, r, i, a, o) {
		function s() {
			c.style.backgroundColor = f ? "yellow" : "white";
		}
		let c = K(Bc, r, R(i), async function(r) {
			if (f) await l(f), f = null, s();
			else {
				f = X(a);
				let r = [
					_(f, j.schema("agent"), e.me, a),
					_(f, j.rdf("type"), i, a),
					_(f, j.schema("target"), n, a)
				];
				if (await P.updater.update([], r), s(), o) {
					let e = !1;
					for (let t = 0; t < o.length; t++) {
						let n = u(o[t]);
						n && (await l(n), e = !0);
					}
					e && Zt(t);
				}
			}
		});
		function u(t) {
			let r = P.each(null, j.schema("agent"), e.me, a).filter((e) => P.holds(e, j.rdf("type"), t, a)).filter((e) => P.holds(e, j.schema("target"), n, a));
			return r.length ? r[0] : null;
		}
		function d() {
			f = u(i), s();
		}
		let f;
		return c.refresh = d, d(), c;
	}
	if (u = N.currentUser(), u && await mc(e).value !== j.schema("dateDeleted").value) {
		let t = {
			me: u,
			dom: Bc,
			div: s
		};
		s.appendChild(d(t, e, W.iconBase + Hc, j.schema("AgreeAction"), e.doc(), [j.schema("DisagreeAction")])), s.appendChild(d(t, e, W.iconBase + Uc, j.schema("DisagreeAction"), e.doc(), [j.schema("AgreeAction")]));
	}
	P.any(e, j.dct("created")) && s.appendChild(K(Bc, W.iconBase + Wc, "Reply in thread", async () => {
		await o();
	}));
	let f = s.appendChild(Ut(Bc));
	return f.style.float = "right", f.firstChild.style.opacity = "0.3", f.addEventListener("click", c), s;
}
//#endregion
//#region src/chat/message.js
var $ = window.document, Jc = L.messageBodyStyle, Yc = R;
function Xc(e, t) {
	let n = $.createElement("img"), r = "10";
	t.inlineImageHeightEms && (r = ("" + t.inlineImageHeightEms).trim()), n.setAttribute("style", "max-height: " + r + "em; border-radius: 1em; margin: 0.7em;"), e && n.setAttribute("src", e);
	let i = $.createElement("a");
	return i.setAttribute("href", e), i.setAttribute("target", "images"), i.appendChild(n), rt(n, $rdf.sym(e)), i;
}
var Zc = function(e, t) {
	let n = $.createElement("a");
	return t && t.uri && (n.setAttribute("href", t.uri), n.addEventListener("click", $t, !0), n.setAttribute("style", "color: #3B5998; text-decoration: none; ")), n.textContent = e, n;
};
function Qc(e) {
	let t = P.any(e, j.foaf("nick"));
	return t ? "" + t.value : "" + Yc(e);
}
function $c(e, t, n, r) {
	let i = e.appendChild(Zc(Qc(t), t));
	t.uri && P.fetcher.nowOrWhenFetched(t.doc(), void 0, function(e, n) {
		i.textContent = Qc(t);
	}), e.appendChild($.createElement("br")), e.appendChild(Zc(n, r));
}
function el(e, t, n, r) {
	let i = e.appendChild(Zc(Yc(t), t));
	t.uri && P.fetcher.nowOrWhenFetched(t.doc(), void 0, function(e, n) {
		i.textContent = Qc(t);
	});
	let a = e.appendChild(Zc(n, r));
	a.style.fontSize = "80%", a.style.marginLeft = "1em", e.appendChild($.createElement("br"));
}
async function tl(e, t, n, r, i) {
	let a = !1, o = r.colorizeByAuthor === "1" || r.colorizeByAuthor === !0, s = P.any(t, j.foaf("maker")), c = P.any(t, j.dct("created")), l = await mc(t), u = P.any(l, j.foaf("maker")), d = s.uri === u?.uri ? l : t, f = P.any(d, j.sioc("content")), p = await fc(d);
	p.length > 1 && z("renderMessageRow versions: ", p.join(",  "));
	let m = p.map((e) => P.each(e, j.sioc("has_reply"))).flat(), h = null, g = [];
	for (let e of m) P.holds(e, j.rdf("type"), j.sioc("Thread")) ? (h = e, z("renderMessageRow: found thread: " + h)) : g.push(e);
	g.length > 1 && z("renderMessageRow: found normal replies: ", g), h ||= P.any(null, j.sioc("has_member"), t);
	let _ = P.any(d, $rdf.sym(`${Ws}proofValue`)), v = Gs();
	v.id = d.uri, v.created = P.any(d, j.dct("created")).value, v.content = f.value, v.maker = s.uri, _?.value ? sc(s).then((e) => {
		e || B("message is signed but " + s.uri + " is missing publicKey"), e?.match(/[0-9A-Fa-f]{6}/g) ? _?.value && !Js(_?.value, v, e) && B("invalid signature\n" + v.id) : B("invalid publicKey hex string\n" + s.uri + "\n" + e);
	}) : (a = !0, B(d.uri + " is unsigned"));
	let y = await pc(t), b = !t.sameTerm(y), x = P.the(y, j.dct("created"), null, y.doc()) || P.the(t, j.dct("created"), null, t.doc()), S = $.createElement("tr");
	a && S.setAttribute("style", "background-color: red"), S.AJAR_date = x.value, S.AJAR_subject = t;
	let C = $.createElement("td");
	if (S.appendChild(C), r.authorDateOnLeft) $c(C, s, Ot(x.value), t);
	else {
		let e = $.createElement("img");
		e.setAttribute("style", "max-height: 2.5em; max-width: 2.5em; border-radius: 0.5em; margin: auto;"), zt(e, s), C.appendChild(e);
	}
	let w = Ot(x.value);
	b && (w += " ... " + Ot(c.value));
	let T = S.appendChild($.createElement("td"));
	r.authorDateOnLeft || el(T, s, w, t);
	let E = f ? f.value.trim() : "??? no content?", D = /^https?:\/[^ <>]*$/i.test(E), O = null;
	if (D) {
		if (/\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(E) && r.expandImagesInline) {
			let e = Xc(E, r);
			T.appendChild(e);
		} else {
			let e = T.appendChild($.createElement("a"));
			O = e.appendChild($.createElement("p")), e.href = E, O.textContent = E, T.appendChild(e);
		}
	} else O = $.createElement("p"), T.appendChild(O), O.textContent = E;
	if (O) {
		let e = o ? Tc(s) : k(n);
		O.setAttribute("style", Jc + "background-color: " + e + ";");
	}
	function k(e) {
		return e ? "#e8ffe8" : "white";
	}
	let A = await Kc(t, t.doc());
	A.children.length && (T.appendChild($.createElement("br")), T.appendChild(A));
	let M = $.createElement("td");
	S.appendChild(M);
	let ee = K($, W.iconBase + "noun_243787.svg", "...");
	return M.appendChild(ee), ee.addEventListener("click", async function(n) {
		if (S.toolTR) {
			S.parentNode.removeChild(S.toolTR), delete S.toolTR;
			return;
		}
		let a = $.createElement("tr"), o = await qc(t, S, {
			...i,
			chatOptions: r
		}, e);
		o.style = "border: 0.05em solid #888; border-radius: 0 0 0.7em 0.7em;  border-top: 0; height:3.5em; background-color: #fff;", S.nextSibling ? S.parentElement.insertBefore(a, S.nextSibling) : S.parentElement.appendChild(a), S.toolTR = a, a.appendChild($.createElement("td"));
		let s = a.appendChild($.createElement("td"));
		a.appendChild($.createElement("td")), s.appendChild(o);
	}), h && r.showThread && M.appendChild(K($, W.iconBase + "noun_1180164.svg", "see thread", (e) => {
		r.showThread(h, r);
	})), S;
}
async function nl(e, t, n, r) {
	let i = e.parentNode, a = rl(n, i, r, n.options, await mc(t));
	i.insertBefore(a, e), a.originalRow = e, e.style.visibility = "hidden";
}
function rl(e, t, n, r, i) {
	function a(e) {
		e.originalRow.style.visibility = "visible", e.parentNode.removeChild(e);
	}
	async function o(e) {
		await s(_.value, !0);
	}
	async function s(a, o) {
		async function s(a, s) {
			if (await al(e, t, a, !1, r, n), i) {
				let e = p.originalRow;
				e.parentNode ? e.parentNode.removeChild(e) : (B("No parentNode on old message " + e.textContent), e.style.backgroundColor = "#fee", e.style.visibility = "hidden"), p.parentNode.removeChild(p);
			} else o && (_.value = "", _.setAttribute("style", Jc), _.disabled = !1, _.scrollIntoView(r.newestFirst), _.focus(), _.select());
		}
		o && (_.setAttribute("style", Jc + "color: #bbb;"), _.disabled = !0);
		let c;
		try {
			c = await e.updateMessage(a, i, null, r.thread);
		} catch (e) {
			(n.statusArea || p).appendChild(U($, "Error writing message: " + e));
			return;
		}
		await s(c, a);
	}
	function c(e) {
		let n = t.chatDocument.dir().uri;
		it(P.fetcher, e, n + "Files", n + "Pictures", async function(e, t) {
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
			let e = K($, W.iconBase + "noun_243787.svg", "More");
			e.setAttribute("style", L.buttonStyle + "float: right;"), g.appendChild(e);
		}
		r.menuHandler;
		let u = N.currentUser();
		if ($c(m, u, "", null), _ = $.createElement("textarea"), h.innerHTML = "", h.appendChild(_), _.rows = 3, i && (_.value = P.anyValue(i, j.sioc("content"), null, i.doc())), _.setAttribute("style", Jc + "background-color: #eef;"), _.addEventListener("keydown", async function(e) {
			e.code === "Enter" && (!e.shiftKey && !r.shiftEnterSendsMessage || e.shiftKey && r.shiftEnterSendsMessage) && await o(e);
		}, !1), nt(_, l, c), g.innerHTML = "", v = K($, f, "Send"), v.style.float = "right", v.addEventListener("click", (e) => o(), !1), g.appendChild(v), i) {
			let e = g.appendChild(Ut($));
			e.style.float = "left", e.addEventListener("click", (e) => a(p), !1), g.appendChild(e);
		}
		let d = e.dateFolder.leafDocumentFromDate(/* @__PURE__ */ new Date()), y;
		h.appendChild(Zi.cameraButton($, P, t, n)), bc(e.channel, e.channel.doc());
	}
	let d, f;
	i ? (d = P.anyValue(i, j.dct("created"), null, i.doc()), f = W.iconBase + "noun_1180158.svg") : (f = W.iconBase + "noun_383448.svg", d = "9999-01-01T00:00:00Z");
	let p = $.createElement("tr"), m = $.createElement("td"), h = $.createElement("td"), g = $.createElement("td");
	p.appendChild(m), p.appendChild(h), p.appendChild(g), p.AJAR_date = d;
	let _, v;
	return ti({
		div: h,
		dom: $
	}).then((e) => {
		u(), Object.assign(e, n), Ic(e).then((e) => {});
	}), p;
}
//#endregion
//#region src/chat/infinite.js
function il(e) {
	"Notification" in window ? Notification.permission === "granted" ? new Notification(e) : Notification.permission !== "denied" && Notification.requestPermission().then(function(t) {
		t === "granted" && new Notification(e);
	}) : B("This browser does no t support desktop notification");
}
async function al(e, t, n, r, i, a) {
	let o = await tl(e, n, r, i, a);
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
async function ol(e, t, n, r) {
	async function i(e, t) {
		let n = {}, r, i;
		for (r = t.firstChild; r; r = r.nextSibling) r.AJAR_subject && (n[r.AJAR_subject.uri] = !0);
		let o = P.each(e, j.wf("message"), null, t.chatDocument), s = {};
		for (let e of o) s[e.uri] = !0, n[e.uri] || await a(e, t);
		for (r = t.firstChild; r;) i = r.nextSibling, r.AJAR_subject && !s[r.AJAR_subject.uri] && t.removeChild(r), r = i;
		for (r = t.firstChild; r; r = r.nextSibling) r.AJAR_subject && Zt(r);
	}
	async function a(e, t) {
		if (hc(e) && !r.showDeletedMessages) return;
		let n = P.any(null, j.sioc("has_member"), e, e.doc()), i = P.any(e, j.sioc("id"), null, e.doc());
		if (i && !n && (n = P.any(null, j.sioc("has_member"), i, e.doc())), r.thread) {
			if (!P.holds(e, j.sioc("has_reply"), r.thread) && !(n && n.sameTerm(r.thread))) return;
		} else if (n) return;
		t.fresh || await al(m, t, e, t.fresh, r, y);
	}
	async function o(e) {
		let t = e ? S : C, n = t.messageTable.date;
		if (e && S.limit && n <= S.limit) return b || await u(), !0;
		if (n = await h.loadPrevious(n, e), !n && !e && !b && await u(), !n) return !0;
		let r = !1;
		if (!e) {
			let e = h.leafDocumentFromDate(/* @__PURE__ */ new Date());
			r = h.leafDocumentFromDate(n).sameTerm(e);
		}
		let i = await s(n, r);
		return t.messageTable = i, (e ? p : !p) ? g.appendChild(i) : g.insertBefore(i, g.firstChild), r;
	}
	async function s(t, n) {
		let r = h.leafDocumentFromDate(t);
		try {
			await P.fetcher.createIfNotExists(r);
		} catch (i) {
			let a = e.createElement("table").appendChild(e.createElement("tr"));
			return i.response && i.response.status && i.response.status === 404 ? await c(t, n) : (z("*** Error NON 404 for chat file " + r), a.appendChild(U(e, i, "pink")), a);
		}
		return await c(t, n);
	}
	async function c(t, n) {
		async function i() {
			let e = await o(!0);
			return e ? c.initial = !0 : c.extendedBack = !0, e;
		}
		async function s() {
			return await o(!1);
		}
		let c = e.createElement("table");
		c.style.width = "100%", c.extendBackwards = i, c.extendForwards = s, c.date = t;
		let l = h.leafDocumentFromDate(t);
		if (c.chatDocument = l, c.fresh = !1, c.setAttribute("style", "width: 100%;"), n) {
			c.final = !0, b = c, C.messageTable = c;
			let e = rl(m, c, y, r);
			p ? c.insertBefore(e, c.firstChild) : c.appendChild(e), c.inputRow = e;
		}
		{
			let n = e.createElement("tr"), i = n.appendChild(e.createElement("td"));
			i.style = "text-align: center; vertical-align: middle; color: #888; font-style: italic;", i.textContent = Ot(t.toISOString(), !0);
			let a = n.appendChild(e.createElement("td"));
			r.includeRemoveButton && a.appendChild(Ut(e, (e) => {
				g.parentNode.removeChild(g);
			})), c.extendedForwards = !1, p ? c.appendChild(n) : c.insertBefore(n, c.firstChild);
		}
		let u = P.statementsMatching(null, j.wf("message"), null, l);
		!n && u.length;
		for (let e of u) await a(e.object, c);
		return c.fresh = !0, c;
	}
	async function l() {
		let e = h.leafDocumentFromDate(/* @__PURE__ */ new Date());
		if (!e.sameTerm(C.messageTable.chatDocument)) {
			b.inputRow && (b.removeChild(b.inputRow), delete b.inputRow);
			let t = C.messageTable.chatDocument;
			if (await u(), !P.holds(t, j.rdfs("seeAlso"), e, t)) {
				let n = [_(t, j.rdfs("seeAlso"), e, t)];
				try {
					P.updater.update([], n);
				} catch (e) {
					alert("Unable to link old chat file to new one:" + e);
				}
			}
		}
	}
	async function u() {
		let e = /* @__PURE__ */ new Date(), t = h.leafDocumentFromDate(e), r = await s(e, !0);
		return g.appendChild(r), g.refresh = async function() {
			await l(/* @__PURE__ */ new Date()), await i(n, r), il(n);
		}, P.updater.addDownstreamChangeListener(t, g.refresh), b = r, C.messageTable = b, r;
	}
	async function d(e, t) {
		if (w) return;
		w = !0;
		let n = !t, i;
		for (; g.scrollTop < 150 && S.messageTable && !S.messageTable.initial && S.messageTable.extendBackwards;) {
			if (g.scrollHeight === 0) {
				setTimeout(d, 2e3), w = !1;
				return;
			}
			let e = g.scrollHeight - g.scrollTop;
			if (i = await S.messageTable.extendBackwards(), n && (g.scrollTop = g.scrollHeight - e), t && t(), i) break;
		}
		for (; r.selectedMessage && g.scrollHeight - g.scrollTop - g.clientHeight < 150 && C.messageTable && !C.messageTable.final && C.messageTable.extendForwards;) {
			let e = g.scrollTop;
			if (i = await C.messageTable.extendForwards(), n && (g.scrollTop = e), t && t(), i) break;
		}
		w = !1;
	}
	async function f() {
		function e() {
			c && c.selectedElement && c.selectedElement.scrollIntoView({ block: "center" });
		}
		function t() {
			r.selectedElement ? r.selectedElement.scrollIntoView({ block: "center" }) : b.inputRow.scrollIntoView && b.inputRow.scrollIntoView(p);
		}
		let n, i, a;
		r.selectedMessage && (i = r.selectedMessage.doc()), x && (a = x.doc());
		let o = i || a;
		if (o) {
			let e = /* @__PURE__ */ new Date();
			n = h.leafDocumentFromDate(e).sameTerm(o);
		}
		let c;
		o && !n ? (c = await s(h.dateFromLeafDocument(o), n), g.appendChild(c), S.messageTable = c, C.messageTable = c, e(), setTimeout(e, 1e3)) : (await u(), S.messageTable = b, C.messageTable = b), await d(null, t), g.addEventListener("scroll", d), r.solo && document.body.addEventListener("scroll", d);
	}
	r ||= {}, r.authorDateOnLeft = !1;
	let p = r.newestFirst === "1" || r.newestFirst === !0, m = new dc(n, r), h = m.dateFolder, g = e.createElement("div");
	m.div = g;
	let v = g.appendChild(e.createElement("div")), y = {
		dom: e,
		statusArea: v,
		div: v
	}, b, x, S = { messageTable: null }, C = { messageTable: null };
	if (r.thread) {
		let e = r.thread;
		if (x = P.any(null, j.sioc("has_reply"), e, e.doc()), x) {
			let e = P.any(x, j.dct("created"), null, x.doc());
			e && (S.limit = new Date(e.value));
		}
	}
	let w = !1;
	return await f(), g;
}
//#endregion
//#region src/lib/preferences.js
var sl = /* @__PURE__ */ r({
	get: () => ul,
	getPreferencesForClass: () => gl,
	recordPersonalDefaults: () => pl,
	recordSharedPreferences: () => fl,
	renderPreferencesForm: () => ml,
	set: () => dl,
	value: () => ll
}), cl = P, ll = [];
function ul(e) {
	return ll[e];
}
function dl(e, t) {
	if (typeof t != "string") throw z("Non-string value of preference " + e + ": " + t), Error("Non-string value of preference " + e + ": " + t);
	this.value[e] = t;
}
function fl(e, t) {
	return new Promise(function(n, r) {
		let i = cl.any(e, j.ui("sharedPreferences"));
		if (i) t.sharedPreferences = i, n(t);
		else {
			cl.updater.editable(e.doc()) || (z(` Cant make shared preferences, may not change ${e.doc}`), n(t));
			let i = F(e.doc().uri + "#SharedPreferences"), a = [_(e, j.ui("sharedPreferences"), i, e.doc())];
			z("Creating shared preferences " + i), cl.updater.update([], a, function(e, a, o) {
				a ? (t.sharedPreferences = i, n(t)) : r(/* @__PURE__ */ Error("Error creating shared prefs: " + o));
			});
		}
	});
}
function pl(e, t) {
	return new Promise(function(n, r) {
		ni(t).then((t) => {
			if (!t.preferencesFile) {
				z("Not doing private class preferences as no access to preferences file. " + t.preferencesFileError);
				return;
			}
			let i = cl.each(null, j.solid("forClass"), e, t.preferencesFile), a = [], o, s;
			if (i.length) {
				if (i.forEach((e) => {
					o ||= cl.any(e, j.solid("personalDefaults"));
				}), o) {
					t.personalDefaults = o, n(t);
					return;
				}
				o = X(t.preferencesFile), s = i[0];
			} else s = X(t.preferencesFile), a = [_(s, j.rdf("type"), j.solid("TypeRegistration"), t.preferencesFile), _(s, j.solid("forClass"), e, t.preferencesFile)];
			o = X(t.preferencesFile), a.push(_(s, j.solid("personalDefaults"), o, t.preferencesFile)), cl.updater.update([], a, function(i, a, s) {
				a ? (t.personalDefaults = o, n(t)) : r(/* @__PURE__ */ Error("Setting preferences for " + e + ": " + s));
			});
		}, (e) => {
			r(e);
		});
	});
}
function ml(e, t, n, r) {
	let i = r.dom.createElement("div");
	return yc(e, e.doc(), r.me).then((a) => {
		let o = r.dom;
		function s(e) {
			i.appendChild(o.createElement("h5")).textContent = e;
		}
		s("My view of this " + r.noun), Er(o, i, {}, a, n, e.doc(), (e, t) => {
			e || Tt(r, t);
		}), s("Everyone's  view of this " + r.noun), fl(e, r).then((r) => {
			let a = r.sharedPreferences;
			Er(o, i, {}, a, n, e.doc(), (e, t) => {
				e || Tt(r, t);
			}), s("My default view of any " + r.noun), pl(t, r).then((e) => {
				Er(o, i, {}, e.personalDefaults, n, e.preferencesFile, (t, n) => {
					t || Tt(e, n);
				});
			}, (e) => {
				Tt(r, e);
			});
		});
	}, (e) => {
		i.appendChild(U(r.dom, e));
	}), i;
}
function hl(e) {
	return e.datatype ? e.datatype.equals(j.xsd("boolean")) ? e.value === "1" : e.datatype.equals(j.xsd("dateTime")) || e.datatype.equals(j.xsd("date")) ? new Date(e.value) : e.datatype.equals(j.xsd("integer")) || e.datatype.equals(j.xsd("float")) || e.datatype.equals(j.xsd("decimal")) ? Number(e.value) : e.value : e;
}
function gl(e, t, n, r) {
	return new Promise(function(i, a) {
		fl(e, r).then((r) => {
			let o = r.sharedPreferences;
			if (r.me) yc(e, e.doc(), r.me).then((e) => {
				pl(t, r).then((t) => {
					let r = [], a = t.personalDefaults;
					n.forEach((t) => {
						let n = cl.any(e, t) || cl.any(o, t) || cl.any(a, t);
						n && (r[t.uri] = hl(n));
					}), i(r);
				}, a);
			}, a);
			else {
				let e = [];
				n.forEach((t) => {
					let n = cl.any(o, t);
					n && (e[t.uri] = hl(n));
				}), i(e);
			}
		});
	});
}
//#endregion
//#region src/lib/table.js
var _l = {
	icons: W,
	log: pe,
	ns: j,
	utils: fe,
	widgets: Ur
};
function vl(e, t) {
	let n = t.sourceDocument, r = t.tableClass, i = t.query, a = _l.ns, o = P, s = {}, c = {
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
	}, f = t.keyVariable || "?_row", p = 0, h, g, _, v, y = null, b = null, x = e.createElement("div");
	x.className = "tableViewPane", x.appendChild(w());
	let S = e.createElement("div");
	x.appendChild(S), x.refresh = function() {
		Ae(C.query, C.logicalRows, C.columns, C);
	};
	let C;
	if (i) C = Ne(i), S.appendChild(C);
	else {
		let e = I();
		h = e[0], g = e[1], r || _.appendChild(ne(h, g)), b = Pe(g), k(b || h);
	}
	return x;
	function w() {
		let t = e.createElement("table");
		t.setAttribute("class", "toolbar");
		let n = e.createElement("tr");
		return _ = e.createElement("td"), n.appendChild(_), v = e.createElement("td"), n.appendChild(v), t.appendChild(n), t;
	}
	function T(e, t) {
		let n = t.getColumns();
		for (let t = 0; t < n.length; ++t) {
			let r = o.variable("_col" + t);
			e.vars.push(r), n[t].setVariable(r);
		}
	}
	function E(e, t, n) {
		let r = n.type;
		r ||= o.variable("_any"), e.pat.add(t, _l.ns.rdf("type"), r);
	}
	function D(e, t, n) {
		let r = n.getColumns();
		for (let n = 0; n < r.length; ++n) {
			let i = r[n], a = o.formula();
			a.add(t, i.predicate, i.getVariable()), e.pat.optional.push(a);
		}
	}
	function O(e) {
		let t = new m(), n = o.variable(f.slice(1));
		return T(t, e), E(t, n, e), D(t, n, e), t;
	}
	function k(e) {
		j(v), v.appendChild(ie(e)), A(O(e), e);
	}
	function A(e, t) {
		y && (y.running = !1);
		let n = Ne(e, t);
		j(S), S.appendChild(n), y = e;
	}
	function j(e) {
		for (; e.childNodes.length > 0;) e.removeChild(e.childNodes[0]);
	}
	function M(e) {
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
			return R(this.type);
		}, this.addUse = function() {
			this.useCount += 1;
		};
	}
	function ee() {
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
			return this.getHints().label ? this.getHints().label : this.predicate ? this.predicate.sameTerm(a.rdf("type")) && this.superClass ? R(this.superClass, !0) : R(this.predicate) : this.variable ? this.variable.toString() : "unlabeled column?";
		}, this.setPredicate = function(e, t, n) {
			t ? (this.inverse = e, this.constraints = this.constraints.concat(o.each(e, _l.ns.rdfs("domain"))), e.sameTerm(a.rdfs("subClassOf")) && n.termType === "NamedNode" && (this.superClass = n, this.alternatives = o.each(void 0, a.rdfs("subClassOf"), n))) : (this.predicate = e, this.constraints = this.constraints.concat(o.each(e, _l.ns.rdfs("range"))));
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
	function te(e, t) {
		let n = [];
		for (let r in e) {
			let i = e[r];
			(!t || t(r, i)) && n.push(i);
		}
		return n;
	}
	function N(t, n) {
		let r = e.createElement("option");
		return r.setAttribute("value", n), r.appendChild(e.createTextNode(t)), r;
	}
	function ne(t, n) {
		let r = e.createElement("div");
		r.appendChild(e.createTextNode("Select type: "));
		let i = e.createElement("select");
		i.appendChild(N("All types", "null"));
		for (let e in n) i.appendChild(N(n[e].getLabel(), e));
		return i.addEventListener("click", function() {
			let e;
			e = i.value === "null" ? t : n[i.value], re(e);
		}, !1), r.appendChild(i), r;
	}
	function re(e) {
		k(e);
	}
	function ie(t) {
		let n = e.createElement("div"), r = t.getUnusedColumns();
		if (r.sort(function(e, t) {
			let n = e.sortKey(), r = t.sortKey();
			return (n > r) - (n < r);
		}), r.length > 0) {
			n.appendChild(e.createTextNode("Add column: "));
			let i = e.createElement("select");
			i.appendChild(N("", "-1"));
			for (let e = 0; e < r.length; ++e) {
				let t = r[e];
				i.appendChild(N(t.getLabel(), "" + e));
			}
			n.appendChild(i), i.addEventListener("click", function() {
				let e = Number(i.value);
				e >= 0 && (t.addColumn(r[e]), k(t));
			}, !1);
		}
		return n;
	}
	function ae(e, t) {
		for (let n in e) {
			let r = e[n];
			if (r.variable.toNT() === t) return r;
		}
		throw Error(`getColumnForVariable: no column for variable ${t}`);
	}
	function F(e, t) {
		let n;
		return t.uri in e ? n = e[t.uri] : (n = new ee(), n.setPredicate(t), e[t.uri] = n), n;
	}
	function oe(e, t) {
		let n;
		return t.uri in e ? n = e[t.uri] : (n = new M(t), e[t.uri] = n), n;
	}
	function se() {
		let e = {}, t = o.statementsMatching(void 0, _l.ns.rdf("type"), r, n), i = {};
		for (let n = 0; n < t.length; ++n) {
			let r = t[n].object;
			if (r.termType !== "NamedNode") continue;
			let a = oe(e, r);
			r.uri in i || (i[r.uri] = []), i[r.uri].push(t[n].subject), a.addUse();
		}
		return [i, e];
	}
	function le(e, t) {
		let r = o.statementsMatching(e, void 0, void 0, n), i = {};
		for (let e = 0; e < r.length; ++e) {
			let n = r[e].predicate;
			if (n.uri in c) continue;
			let a = F(t, n);
			a.checkValue(r[e].object), i[n.uri] = a;
		}
		return i;
	}
	function ue(e, t) {
		let n = {};
		for (let e = 0; e < t.length; ++e) {
			let r = le(t[e], n);
			for (let e in r) r[e].addUse();
		}
		let r = te(n);
		de(r), e.allColumns = r;
	}
	function I() {
		let e, t, n = se();
		e = n[0], t = n[1];
		for (let n in e) {
			let r = e[n], i = t[n];
			ue(i, r);
		}
		return [new M(null), te(t)];
	}
	function de(e) {
		function t(e, t) {
			return (e.useCount < t.useCount) - (e.useCount > t.useCount);
		}
		e.sort(t);
	}
	function fe(t, n) {
		let r = e.createElement("a");
		return r.appendChild(e.createTextNode("[x]")), r.addEventListener("click", function() {
			t.removeColumn(n), k(t);
		}, !1), r;
	}
	function pe(t, n) {
		let r = e.createElement("tr"), i = e.createElement("th");
		r.appendChild(i);
		for (let i = 0; i < t.length; ++i) {
			let a = e.createElement("th"), o = t[i];
			a.appendChild(e.createTextNode(o.getLabel())), n && a.appendChild(fe(n, o)), r.appendChild(a);
		}
		return r;
	}
	function me(e, t, n, r) {
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
	function he(e, t) {
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
	function ge(e, t) {
		for (let n = 0; n < e.length; ++n) {
			let r = e[n];
			he(r, t);
		}
	}
	function _e(e, t, n) {
		function r(e) {
			return e ? e.termType === "Literal" ? e.value.toLowerCase() : e.termType === "NamedNode" ? R(e).toLowerCase() : e.value.toLowerCase() : "";
		}
		function i(e, t) {
			let n = r(e), i = r(t);
			return n < i ? -1 : +(n > i);
		}
		me(e, t, i, n);
	}
	function ve(t, n, r) {
		let i = e.createElement("div"), a = e.createElement("input");
		a.setAttribute("type", "text"), a.style.width = "70%", i.appendChild(a);
		let o = e.createElement("span");
		o.appendChild(e.createTextNode("▼")), o.addEventListener("click", function() {
			_e(t, r, !1);
		}, !1), i.appendChild(o);
		let s = e.createElement("span");
		s.appendChild(e.createTextNode("▲")), s.addEventListener("click", function() {
			_e(t, r, !0);
		}, !1), i.appendChild(s);
		let c = null;
		return r.filterFunction = function(e) {
			if (!c) return !0;
			if (e) {
				let t;
				return t = e.termType === "Literal" ? e.value : e.termType === "NamedNode" ? R(e) : "", t.toLowerCase().indexOf(c) >= 0;
			}
			return !1;
		}, a.addEventListener("keyup", function() {
			c = a.value === "" ? null : a.value.toLowerCase(), ge(t, n);
		}, !1), i;
	}
	function L(t, n, r, i) {
		let a = e.createElement("div"), o = e.createElement("select"), s = {};
		for (let e = 0; e < i.length; ++e) {
			let t = i[e];
			s[t.uri] = !0;
		}
		let c = we(r).initialSelection;
		c && (s = c), o.setAttribute("multiple", "true");
		for (let e = 0; e < i.length; ++e) {
			let t = i[e], n = N(R(t), e);
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
			ge(t, n);
		}, !0), a;
	}
	function ye(t, n, r) {
		let i = e.createElement("div"), a = e.createElement("input");
		a.setAttribute("type", "text"), a.style.width = "40px", i.appendChild(a);
		let o = e.createElement("input");
		o.setAttribute("type", "text"), o.style.width = "40px", i.appendChild(o);
		let s = null, c = null;
		r.filterFunction = function(e) {
			return e &&= Number(e), !(s && (!e || e < s) || c && (!e || e > c));
		};
		function l() {
			s = a.value === "" ? null : Number(a.value), c = o.value === "" ? null : Number(o.value), ge(t, n);
		}
		return a.addEventListener("keyup", l, !1), o.addEventListener("keyup", l, !1), i;
	}
	function B(e, t, n) {
		return n.checkedAnyValues && n.possiblyNumber ? ye(e, t, n) : n.possiblyLiteral ? ve(e, t, n) : null;
	}
	function be(e, t, n) {
		if (n.superClass && n.alternatives.length > 0) return L(e, t, n, n.alternatives);
		let r = n.getConstraints(), i;
		for (let a = 0; a < r.length; a++) {
			if (i = r[a], n.checkedAnyValues && n.possiblyNumber || i.uri in l) return ye(e, t, n);
			if (i.uri === "http://www.w3.org/2000/01/rdf-schema#Literal") return ve(e, t, n);
			let s = o.each(i, _l.ns.owl("oneOf"));
			if (s.length > 0) return L(e, t, n, s.elements);
		}
		return B(e, t, n);
	}
	function xe(t, n) {
		let r = e.createElement("tr");
		r.className = "selectors", r.appendChild(e.createElement("td"));
		for (let i = 0; i < n.length; ++i) {
			let a = e.createElement("td"), o = be(t, n, n[i]);
			o && a.appendChild(o), r.appendChild(a);
		}
		return r;
	}
	function V(t, n, r) {
		r ||= {};
		let i = e.createElement("a"), a = r.linkFunction;
		return i.setAttribute("href", t), i.appendChild(e.createTextNode(n)), a ? i.addEventListener("click", function(e) {
			e.preventDefault(), e.stopPropagation();
			let t = ce(e).getAttribute("href");
			t || z("No href found \n"), a(t);
		}, !0) : i.addEventListener("click", _l.widgets.openHrefInOutlineMode, !0), i;
	}
	function Se(e, t) {
		let n = !1;
		return e.uri && (n = e.uri.match(/^mailto:(.*)/)), n ? V(e.uri, n[1], t) : V(e.uri, R(e), t);
	}
	function Ce(t) {
		let n = e.createElement("img");
		return n.setAttribute("src", t.uri), n.style.height = "40px", n;
	}
	function we(e) {
		return t && t.hints && e.variable && t.hints[e.variable.toNT()] ? t.hints[e.variable.toNT()] : {};
	}
	function Te(t, n) {
		let r = we(n), i = r.cellFormat;
		if (i) switch (i) {
			case "shortDate": return e.createTextNode(_l.widgets.shortDate(t.value));
		}
		else if (t.termType === "Literal") {
			if (t.datatype) {
				if (u[t.datatype.uri]) return e.createTextNode(_l.widgets.shortDate(t.value));
				if (l[t.datatype.uri]) {
					let n = e.createElement("span");
					return n.textContent = t.value, n.setAttribute("style", "text-align: right"), n;
				}
			}
			return e.createTextNode(t.value);
		} else if (t.termType === "NamedNode" && n.isImageColumn()) return Ce(t);
		else if (t.termType === "NamedNode" || t.termType === "BlankNode") return Se(t, r);
		else if (t.termType === "Collection") {
			let r = e.createElement("span");
			return r.appendChild(e.createTextNode("[")), t.elements.forEach(function(t) {
				r.appendChild(Te(t, n)), r.appendChild(e.createTextNode(", "));
			}), r.removeChild(r.lastChild), r.appendChild(e.createTextNode("]")), r;
		} else return e.createTextNode("unknown termtype '" + t.termType + "'!");
	}
	function Ee(t, n, r, i) {
		let a = e.createElement("td");
		n._subject && "uri" in n._subject && a.appendChild(V(n._subject.uri, "→")), t.appendChild(a);
		for (let i = 0; i < r.length; ++i) {
			let a = r[i], o = e.createElement("td"), s, c = a.getKey();
			if (c in n.values) {
				let t = n.values[c], r = !1;
				n.originalValues && n.originalValues[c] && t.length !== n.originalValues[c].length && (r = !0);
				for (let i = 0; i < t.length; ++i) {
					let l = t[i];
					n.originalValues && n.originalValues[c] && n.originalValues[c].length > i && (s = n.originalValues[c][i], l.toString() !== s.toString() && (r = !0)), o.appendChild(Te(l, a)), i !== t.length - 1 && o.appendChild(e.createTextNode(",\n")), r && (o.style.background = "#efe");
				}
			}
			t.appendChild(o);
		}
		return n._htmlRow = t, t;
	}
	function De(e, t) {
		let n = null;
		if (e.termType === "Literal") n = "value";
		else if (e.termType === "NamedNode") n = "uri";
		else return t.indexOf(e) >= 0;
		let r;
		for (r = 0; r < t.length; ++r) if (t[r].termType === e.termType && t[r][n] === e[n]) return !0;
		return !1;
	}
	function Oe(e, t, n) {
		let r, i = !1;
		for (r in n) {
			let t = n[r];
			r in e.values || (e.values[r] = []), De(t, e.values[r]) || (e.values[r].push(t), i = !0);
		}
		i && (j(e._htmlRow), Ee(e._htmlRow, e, t)), he(e, t);
	}
	function ke(e) {
		if ("uri" in e) return e.uri;
		if ("_subject_id" in e) return e._subject_id;
		{
			let t = "" + p;
			return e._subject_id = t, ++p, t;
		}
	}
	function Ae(n, r, i, a) {
		n.running = !0;
		let c = Date.now(), l = e.createElement("tr");
		a.appendChild(l), l.textContent = "Loading ...";
		for (let e = 0; e < r.length; e++) r[e].original = !0, r[e].originalValues || (r[e].originalValues = r[e].values), r[e].values = {};
		o.query(n, function(t) {
			if (!n.running) return;
			l.textContent += ".";
			let o = null, c = null, u;
			if (f in t && (c = t[f], u = ke(c), u in s && (o = s[u])), !o) {
				let t = e.createElement("tr");
				a.appendChild(t), o = {
					_htmlRow: t,
					_subject: c,
					values: {}
				}, r.push(o), c && (s[u] = o);
			}
			delete o.original, Oe(o, i, t);
		}, void 0, function() {
			l && l.parentNode && l.parentNode.removeChild && (l.parentNode.removeChild(l), l = null);
			let e = Date.now() - c;
			z("Query done: " + r.length + " rows, " + e + "ms");
			for (let e = r.length - 1; e >= 0; e--) if (r[e].original) {
				z("   deleting row " + r[e]._subject);
				let t = r[e]._htmlRow;
				t.parentNode.removeChild(t), delete s[ke(r[e]._subject)], r.splice(e, 1);
			}
			t.sortBy && _e(r, ae(i, t.sortBy), t.sortReverse), t.onDone && t.onDone(x);
		});
	}
	function je(e, t) {
		_l.log.debug(">> processing formula");
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
		for (let n = 0; n < t.optional.length; ++n) _l.log.debug("recurse to optional subformula " + n), je(e, t.optional[n]);
		_l.log.debug("<< finished processing formula");
	}
	function Me(e) {
		let t = [], n = {};
		for (let r = 0; r < e.vars.length; ++r) {
			let i = new ee(), a = e.vars[r];
			_l.log.debug("column " + r + " : " + a), i.setVariable(a), n[a] = i, t.push(i);
		}
		return je(n, e.pat), t;
	}
	function Ne(t, n) {
		let r;
		r = i ? Me(t) : n.getColumns();
		let a = [], o = e.createElement("table");
		return o.appendChild(pe(r, n)), o.appendChild(xe(a, r)), o.logicalRows = a, o.columns = r, o.query = t, Ae(t, a, r, o), o;
	}
	function Pe(e) {
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
var yl = /* @__PURE__ */ r({
	TabWidgetElement: () => bl,
	tabWidget: () => Sl
}), bl = class extends HTMLElement {
	bodyContainer;
	refresh;
	tabContainer;
}, xl = "#ddddcc";
function Sl(e) {
	let t = e.subject, n = e.dom || document, r = parseInt(e.orientation || "0"), i = e.backgroundColor || xl, a = r & 2, o = r & 1, s = e.onClose, [c, l] = Cl(i), u = `display: grid; width: auto; height: 100%; border: 0.1em; border-style: solid; border-color: ${c}; padding: 1em;`, d = n.createElement("div");
	d.setAttribute("style", L.tabsRootElement), d.style.flexDirection = (o ? "row" : "column") + (a ? "-reverse" : "");
	let f = d.appendChild(n.createElement("nav"));
	f.setAttribute("style", L.tabsNavElement);
	let p = d.appendChild(n.createElement("div"));
	p.setAttribute("style", L.tabsMainElement);
	let m = f.appendChild(n.createElement("ul"));
	m.setAttribute("style", L.tabContainer), m.style.flexDirection = `${o ? "column" : "row"}`;
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
		return e.items ? e.items : e.ordered === !1 ? P.each(t, e.predicate) : P.the(t, e.predicate).elements;
	}
	function O(t) {
		let r = n.createElement("li");
		r.setAttribute("style", C), r.subject = t;
		let i = r.appendChild(n.createElement("button"));
		if (i.setAttribute("style", L.makeNewSlot), i.onclick = function() {
			if (A(), j(), r.setAttribute("style", w), !r.bodyTR) return;
			r.bodyTR.setAttribute("style", T);
			let n = a(r);
			e.renderMain && r.subject && n.asSettings !== !1 && (n.innerHTML = "loading item ..." + t, e.renderMain(n, r.subject), n.asSettings = !1);
		}, e.renderTabSettings && r.subject) {
			let i = n.createElement("button");
			i.textContent = "...", i.setAttribute("style", L.ellipsis), i.onclick = function() {
				if (A(), j(), r.setAttribute("style", w), !r.bodyTR) return;
				r.bodyTR.setAttribute("style", T);
				let n = a(r);
				e.renderTabSettings && r.subject && n.asSettings !== !0 && (n.innerHTML = "loading settings ..." + t, e.renderTabSettings(n, r.subject), n.asSettings = !0);
			}, r.appendChild(i);
		}
		return e.renderTab ? e.renderTab(i, t) : i.innerHTML = R(t), r;
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
	function A() {
		for (let e = 0; e < m.children.length; e++) {
			let t = m.children[e];
			t.classList.contains("unstyled") || t.setAttribute("style", C);
		}
	}
	function j() {
		for (let e = 0; e < h.children.length; e++) h.children[e].setAttribute("style", "height: 100%; width: 100%;display: none;");
	}
}
function Cl(e) {
	return Tl(e) ? [wl(e, "#ffffff", .3), "#000000"] : [wl(e, "#000000", .3), "#ffffff"];
}
function wl(e, t, n) {
	let r, i, a, o = "#", s = "0123456789abcdef";
	for (let c = 0; c < 3; c++) {
		r = parseInt(e.slice(c * 2 + 1, c * 2 + 3), 16), i = parseInt(t.slice(c * 2 + 1, c * 2 + 3), 16), a = r * (1 - n) + i * n;
		let l = parseInt(("" + a).split(".")[0]), u = parseInt(("" + l / 16).split(".")[0]), d = parseInt(("" + l % 16).split(".")[0]);
		o += s[u] + s[d];
	}
	return o;
}
function Tl(e) {
	let t = 0;
	for (let n = 0; n < 3; n++) t += parseInt(e.slice(n * 2 + 1, n * 2 + 3), 16);
	return t > 384;
}
//#endregion
//#region src/header/empty-profile.ts
var El = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"26\" height=\"26\" viewBox=\"0 0 26 26\" fill=\"none\">\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z\" fill=\"#D8D8D8\" stroke=\"#8B8B8B\"/>\n    <mask id=\"mask0\" mask-type=\"alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"26\" height=\"26\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z\" fill=\"white\" stroke=\"white\"/>\n    </mask>\n    <g mask=\"url(#mask0)\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.0468 10.4586C17.0468 14.4979 15.4281 16.9214 12.9999 16.9214C10.5718 16.9214 8.95298 14.4979 8.95298 10.4586C8.95298 6.41931 12.9999 6.41931 12.9999 6.41931C12.9999 6.41931 17.0468 6.41931 17.0468 10.4586ZM4.09668 23.3842C6.52483 17.7293 12.9999 17.7293 12.9999 17.7293C12.9999 17.7293 19.475 17.7293 21.9031 23.3842C21.9031 23.3842 17.8481 25 12.9999 25C8.15169 25 4.09668 23.3842 4.09668 23.3842Z\" fill=\"#8B8B8B\"/>\n    </g>\n</svg>";
//#endregion
//#region src/utils/headerFooterHelpers.ts
function Dl() {
	let { origin: e, pathname: t } = document.location, n = document.body?.dataset?.appShell === "databrowser", r = t.split("/").filter(Boolean), i = r[r.length - 1] || "", a = /\.[^/]+$/.test(i);
	return n && r.length > 0 && !a ? F(`${e}/${r[0]}/`) : F(e).site();
}
async function Ol(e, t) {
	try {
		if (!t.any(e, null, j.ldp("Container"), e)) {
			let n = (await t.fetcher.webOperation("GET", e.uri, t.fetcher.initFetchOptions(e.uri, { headers: { accept: "text/turtle" } }))).responseText;
			s(n, t, e.uri, "text/turtle");
		}
	} catch (t) {
		return console.error("Error loading pod " + e + ": " + t), null;
	}
	if (!t.holds(e, j.rdf("type"), j.space("Storage"), e)) return console.warn("Pod  " + e + " does not declare itself as a space:Storage"), null;
	let n = t.any(e, j.solid("owner"), null, e) || t.any(null, j.space("storage"), e, e);
	if (n) {
		try {
			await t.fetcher.load(n.doc());
		} catch {
			return console.warn("Unable to load profile of pod owner " + n), null;
		}
		return t.holds(n, j.space("storage"), e, n.doc()) || console.warn(`Pod owner ${n} does NOT list pod ${e} as their storage`), n;
	}
	{
		let n = F(`${e.uri}profile/card#me`);
		try {
			await t.fetcher.load(n);
		} catch {
			return console.error("Ooops. Guessed wrong pod owner webid {$guess} : can't load it."), null;
		}
		return t.holds(n, j.space("storage"), e, n.doc()) ? (console.warn("Using guessed pod owner webid but it links back."), n) : null;
	}
}
function kl(e, t) {
	return e.anyValue(t, j.vcard("fn"), null, t.doc()) || e.anyValue(t, j.foaf("name"), null, t.doc()) || t.uri;
}
function Al(e, t, n = {}) {
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
var jl = W.iconBase + "noun_help.svg", Ml = "https://solidproject.org/assets/img/solid-emblem.svg";
async function Nl(e, t, n) {
	let r = document.getElementById("PageHeader");
	if (!r) return;
	let i = Dl();
	Pl(r, e, i, t, n)(), M.events.on("logout", Pl(r, e, i, t, n)), M.events.on("login", Pl(r, e, i, t, n));
}
function Pl(e, t, n, r, i) {
	return async () => {
		let a = N.currentUser();
		e.innerHTML = "", e.appendChild(await Fl(t, n, a, r, i));
	};
}
async function Fl(e, t, n, r, i) {
	let a = document.createElement("a");
	a.href = t.uri, a.setAttribute("style", L.headerBannerLink);
	let o = document.createElement("img");
	i && (o.src = i.logo ? i.logo : Ml), o.setAttribute("style", L.headerBannerIcon), a.appendChild(o);
	let s = n ? await Bl(e, n, r) : Ll(), c = document.createElement("div");
	c.setAttribute("style", L.headerBanner), c.appendChild(a);
	let l = document.createElement("div");
	if (l.setAttribute("style", L.headerBannerRightMenu), l.appendChild(s), i && i.helpMenuList) {
		let e = Il(i, i.helpMenuList);
		l.appendChild(e);
	}
	return c.appendChild(l), c;
}
function Il(e, t) {
	if (!t) return;
	let n = document.createElement("ul");
	n.setAttribute("style", L.headerUserMenuList), t.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? n.appendChild(Vl(zl(e.label, e.url, e.target))) : n.appendChild(Vl(Rl(e.label, e.onclick)));
	});
	let r = document.createElement("nav");
	r.setAttribute("style", L.headerUserMenuNavigationMenuNotDisplayed), r.setAttribute("aria-hidden", "true"), r.setAttribute("id", "helperNav"), r.appendChild(n);
	let i = document.createElement("div");
	i.setAttribute("style", L.headerBannerUserMenu), i.appendChild(r);
	let a = document.createElement("button");
	a.setAttribute("style", L.headerUserMenuTrigger), a.type = "button";
	let o = document.createElement("img");
	o.src = e && e.helpIcon ? e.helpIcon : W.iconBase + jl, o.setAttribute("style", L.headerUserMenuTriggerImg), i.appendChild(a), a.appendChild(o);
	let s = Al((e) => Ul(e, a, r), 50);
	a.addEventListener("click", s);
	let c = setTimeout(() => null, 0);
	return i.addEventListener("mouseover", (e) => {
		clearTimeout(c), s(e), document.getElementById("helperNav")?.setAttribute("style", L.headerUserMenuNavigationMenu);
	}), i.addEventListener("mouseout", (e) => {
		c = setTimeout(() => s(e), 200), document.getElementById("helperNav")?.setAttribute("style", L.headerUserMenuNavigationMenuNotDisplayed);
	}), i;
}
function Ll() {
	let e = document.createElement("div");
	return e.setAttribute("style", L.headerBannerLogin), e.appendChild(di(document, null, {})), e;
}
function Rl(e, t) {
	let n = document.createElement("button");
	return n.setAttribute("style", L.headerUserMenuButton), n.onmouseover = function() {
		n.setAttribute("style", L.headerUserMenuButtonHover);
	}, n.onmouseout = function() {
		n.setAttribute("style", L.headerUserMenuButton);
	}, n.addEventListener("click", t), n.innerText = e, n;
}
function zl(e, t, n) {
	let r = document.createElement("a");
	return r.setAttribute("style", L.headerUserMenuLink), r.onmouseover = function() {
		r.setAttribute("style", L.headerUserMenuLinkHover);
	}, r.onmouseout = function() {
		r.setAttribute("style", L.headerUserMenuLink);
	}, r.href = t, r.innerText = e, n && (r.target = n), r;
}
async function Bl(e, t, n) {
	let r = e.fetcher;
	r && await r.load(t);
	let i = document.createElement("ul");
	i.setAttribute("style", L.headerUserMenuList), n && n.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? i.appendChild(Vl(zl(e.label, e.url, e.target))) : i.appendChild(Vl(Rl(e.label, e.onclick)));
	});
	let a = document.createElement("nav");
	a.setAttribute("style", L.headerUserMenuNavigationMenuNotDisplayed), a.setAttribute("aria-hidden", "true"), a.setAttribute("id", "loggedInNav"), a.appendChild(i);
	let o = document.createElement("button");
	o.setAttribute("style", L.headerUserMenuTrigger), o.type = "button";
	let s = Hl(e, t);
	typeof s == "string" ? o.innerHTML = s : o.appendChild(s);
	let c = document.createElement("div");
	c.setAttribute("style", L.headerBannerUserMenuNotDisplayed), c.appendChild(o), c.appendChild(a);
	let l = Al((e) => Ul(e, o, a), 50);
	o.addEventListener("click", l);
	let u = setTimeout(() => null, 0);
	return c.addEventListener("mouseover", (e) => {
		clearTimeout(u), l(e), document.getElementById("loggedInNav")?.setAttribute("style", L.headerUserMenuNavigationMenu);
	}), c.addEventListener("mouseout", (e) => {
		u = setTimeout(() => l(e), 200), document.getElementById("loggedInNav")?.setAttribute("style", L.headerUserMenuNavigationMenuNotDisplayed);
	}), c;
}
function Vl(e) {
	let t = document.createElement("li");
	return t.setAttribute("style", L.headerUserMenuListItem), t.appendChild(e), t;
}
function Hl(e, t) {
	let n = null;
	try {
		if (n = Lt(t), !n) return El;
	} catch {
		return El;
	}
	let r = document.createElement("div");
	return r.setAttribute("style", L.headerUserMenuPhoto), r.style.backgroundImage = `url(${n})`, r;
}
function Ul(e, t, n) {
	let r = t.getAttribute("aria-expanded") === "true", i = e.type === "mouseover", a = e.type === "mouseout";
	r && i || !r && a || (t.setAttribute("aria-expanded", (!r).toString()), n.setAttribute("aria-hidden", r.toString()));
}
//#endregion
//#region src/footer/index.ts
var Wl = "https://solidproject.org", Gl = "solidproject.org";
async function Kl(e, t) {
	let n = document.getElementById("PageFooter");
	if (!n) return;
	let r = Dl(), i = await Ol(r, e);
	return ql(n, e, r, i, t), M.events.on("login", () => ql(n, e, r, i, t)), M.events.on("logout", () => ql(n, e, r, i, t)), n;
}
async function ql(e, t, n, r, i) {
	let a = N.currentUser();
	return e.innerHTML = "", e.appendChild(await Jl(t, a, n, r, i)), e;
}
function Jl(e, t, n, r, i) {
	let a = document.createElement("div");
	a.setAttribute("style", L.footer);
	let o = document.createElement("a");
	if (o.href = i && i.solidProjectUrl ? i.solidProjectUrl : Wl, o.innerText = i && i.solidProjectName ? i.solidProjectName : Gl, !n || !r || t && t.equals(r)) {
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
	u.href = r.uri, u.innerText = kl(e, r);
	let d = document.createElement("span");
	d.innerText = ". For more info, check out ";
	let f = document.createElement("span");
	return f.innerText = ".", a.appendChild(s), a.appendChild(c), a.appendChild(l), a.appendChild(u), a.appendChild(d), a.appendChild(o), a.appendChild(f), a;
}
//#endregion
//#region src/create/types.ts
var Yl = /* @__PURE__ */ r({}), Xl = ye(Symbol("file-explorer")), Zl = typeof window < "u" ? window.document : null;
//#endregion
export { zi as _, Nl as a, kn as b, sl as c, gc as d, $i as f, Ri as g, Hi as h, Kl as i, ol as l, Gi as m, Xl as n, yl as o, Zi as p, Yl as r, vl as s, Zl as t, Sc as u, Kr as v, W as x, Ur as y };

//# sourceMappingURL=src--J7RRo6J.js.map