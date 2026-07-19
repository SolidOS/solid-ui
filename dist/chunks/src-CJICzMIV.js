import { a as e, i as t, n, r, t as i } from "./rolldown-runtime-B1bRi_D7.js";
import { A as a, C as o, D as s, E as c, F as l, I as u, L as d, M as f, N as p, O as m, P as h, R as g, S as _, T as v, _ as y, a as b, b as x, c as S, d as C, f as w, g as T, h as E, i as D, j as O, k, l as ee, m as A, n as te, o as ne, p as j, r as re, s as ie, t as ae, u as oe, v as se, w as ce, x as le, y as ue, z as de } from "./solid-logic.esm-BrMdCG2_.js";
import { i as fe, n as pe, r as me, t as he } from "./headerFooterHelpers-CPd5d20q.js";
import "./auth-Knq99zZ9.js";
import "./components-BD458q30.js";
import "./dialogs-DEuwXC46.js";
//#region src/lib/log.ts
var ge = /* @__PURE__ */ r({
	LogLevel: () => we,
	alert: () => Fe,
	clear: () => Ie,
	debug: () => M,
	dumpHTML: () => Re,
	error: () => Ne,
	escapeForXML: () => Ve,
	info: () => Me,
	logAscending: () => ze,
	logDescending: () => Be,
	msg: () => Ae,
	setInternals: () => He,
	setLevel: () => Le,
	success: () => Pe,
	warn: () => je
}), _e = 1, ve = 2, ye = 4, be = 8, xe = 16, Se = 32, Ce = 63, we = /*#__PURE__*/ function(e) {
	return e[e.Error = 1] = "Error", e[e.Warning = 2] = "Warning", e[e.Message = 4] = "Message", e[e.Success = 8] = "Success", e[e.Info = 16] = "Info", e[e.Debug = 32] = "Debug", e[e.All = 63] = "All", e;
}({}), Te = 7, Ee = !1, De = document, Oe = window;
function ke(e, t = ye, n = "mesg") {
	if (Te & t) if (De !== void 0) {
		let t = De.getElementById("status");
		if (!t) return;
		let r = De.createElement("span");
		r.setAttribute("class", n);
		let i = /* @__PURE__ */ new Date();
		r.innerHTML = `${i.getHours()}:${i.getMinutes()}:${i.getSeconds()} [${n}] ${Ve(e)}<br/>`, Ee ? t.insertBefore(r, t.firstChild) : t.appendChild(r);
	} else typeof console < "u" && console.log(e);
}
function Ae(e) {
	ke(e);
}
function je(e) {
	ke(e, ve, "warn");
}
function M(e) {
	ke(e, Se, "dbug");
}
function Me(e) {
	ke(e, xe, "info");
}
function Ne(e) {
	ke(e, _e, "eror");
}
function Pe(e) {
	ke(e, be, "good");
}
function Fe(e) {
	Oe && Oe.alert !== void 0 ? Oe.alert(e) : je(e);
}
function Ie() {
	let e = De?.getElementById("status");
	e && (e.innerHTML = "");
}
function Le(e) {
	Te = Ce, M("Log level is now " + e), Te = e;
}
function Re() {
	if (!De) return;
	let e = Te;
	Te = Ce, M(De?.body?.innerHTML || ""), Te = e;
}
function ze() {
	Ee = !0;
}
function Be() {
	Ee = !1;
}
function Ve(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function He(e, t) {
	Oe = e, De = t;
}
//#endregion
//#region src/utils/label.ts
var Ue = {
	log: ge,
	ns: E,
	rdf: T
};
function N(e, t = !1) {
	function n(e) {
		return t ? e.slice(0, 1).toUpperCase() + e.slice(1) : e;
	}
	function r(e) {
		let t = "";
		e.slice(-1) === "/" && (e = e.slice(0, -1));
		for (let n = 0; n < e.length; n++) {
			if (e[n] === "_" || e[n] === "-") {
				t += " ";
				continue;
			}
			t += e[n], n + 1 < e.length && e[n].toUpperCase() !== e[n] && e[n + 1].toLowerCase() !== e[n + 1] && (t += " ");
		}
		return t.slice(0, 4) === "has " && (t = t.slice(4)), n(t);
	}
	let i = Ge(e);
	if (i) return n(i.value);
	if (e.termType === "BlankNode") return "...";
	if (e.termType === "Collection") return "(" + e.elements.length + ")";
	let a = e.uri;
	if (a === void 0) return e.toString();
	try {
		a = a.split("/").map(decodeURIComponent).join("/");
	} catch {
		for (let e = a.length - 3; e > 0; e--) {
			let t = "0123456789abcefABCDEF";
			for (; a[e] === "%" && t.indexOf(a[e + 1]) >= 0 && t.indexOf(a[e + 2]) >= 0;) a = a.slice(0, e) + String.fromCharCode(parseInt(a.slice(e + 1, e + 3), 16)) + a.slice(e + 3);
		}
	}
	a = We(a, "/profile/card#me"), a = We(a, "#this"), a = We(a, "#me");
	let o = a.indexOf("#");
	if (o >= 0) return r(a.slice(o + 1));
	let s = a.lastIndexOf("/", a.length - 2);
	return s >= 0 && s < e.uri.length ? r(a.slice(s + 1)) : n(decodeURIComponent(e.uri));
}
function We(e, t) {
	let n = t.length * -1;
	return e.slice(n) === t ? e.slice(0, n) : e;
}
function Ge(e) {
	return A.any(e, Ue.ns.ui("label")) || A.any(e, Ue.ns.link("message")) || A.any(e, Ue.ns.vcard("fn")) || A.any(e, Ue.ns.foaf("name")) || A.any(e, Ue.ns.dct("title")) || A.any(e, Ue.ns.dc("title")) || A.any(e, Ue.ns.rss("title")) || A.any(e, Ue.ns.contact("fullName")) || A.any(e, A.sym("http://www.w3.org/2001/04/roadmap/org#name")) || A.any(e, Ue.ns.cal("summary")) || A.any(e, Ue.ns.foaf("nick")) || A.any(e, Ue.ns.as("name")) || A.any(e, Ue.ns.schema("name")) || A.any(e, Ue.ns.rdfs("label")) || A.any(e, A.sym("http://www.w3.org/2004/02/skos/core#prefLabel"));
}
//#endregion
//#region src/utils/index.js
var Ke = /* @__PURE__ */ r({
	AJARImage: () => pt,
	RDFComparePredicateObject: () => xt,
	RDFComparePredicateSubject: () => St,
	addLoadEvent: () => ut,
	ancestor: () => ot,
	beep: () => Qe,
	clearVariableNames: () => Xe,
	emptyNode: () => it,
	escapeForXML: () => _t,
	findPos: () => dt,
	genUuid: () => et,
	getAbout: () => st,
	getEyeFocus: () => ft,
	getTarget: () => at,
	getTerm: () => ct,
	hashColor: () => $e,
	include: () => lt,
	label: () => N,
	labelForXML: () => vt,
	labelWithOntology: () => gt,
	newVariableName: () => Ye,
	ontologyLabel: () => ht,
	predParentOf: () => Ct,
	predicateLabel: () => bt,
	predicateLabelForXML: () => yt,
	shortName: () => mt,
	stackString: () => rt,
	syncTableToArray: () => tt,
	syncTableToArrayReOrdered: () => nt
}), qe = {
	log: ge,
	ns: E,
	rdf: T
}, Je = 0;
function Ye() {
	return "v" + Je++;
}
function Xe() {
	Je = 0;
}
var Ze;
typeof AudioContext < "u" ? Ze = AudioContext : typeof window < "u" && (Ze = window.AudioContext || window.webkitAudioContext);
function Qe() {
	if (!Ze) return;
	let e = new Ze();
	return function(t, n, r, i) {
		t = +(t || .3), r ||= "sine", typeof i != "function" && (i = function() {});
		let a = e.createOscillator();
		a.type = r, a.frequency.value = n || 256, a.connect(e.destination), a.start(0), a.stop(t);
	};
}
function $e(e) {
	return e = e.uri || e, "#" + (function(e) {
		return e.split("").reduce(function(e, t) {
			return e = (e << 5) - e + t.charCodeAt(0), e & e;
		}, 0);
	}(e) & 16777215 | 12632256).toString(16);
}
function et() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
		let t = Math.random() * 16 | 0;
		return (e === "x" ? t : t & 3 | 8).toString(16);
	});
}
function tt(e, t, n, r) {
	let i, a, o;
	for (o = 0; o < e.children.length; o++) a = e.children[o], a.trashMe = !0;
	for (let s = 0; s < t.length; s++) {
		let c = t[s];
		for (i = !1, o = 0; o < e.children.length; o++) if (a = e.children[o], a.subject && a.subject.sameTerm(c)) {
			if (r) {
				let e = r(a, c);
				e && e !== a && (a.parentNode.replaceChild(e, a), e.subject = c, a = e);
			}
			a.trashMe = !1, i = !0;
			break;
		}
		if (!i) {
			let t = n(c);
			if (s >= e.children.length) e.appendChild(t);
			else {
				let n = e.children[s];
				e.insertBefore(t, n);
			}
			t.subject = c;
		}
	}
	for (o = 0; o < e.children.length; o++) a = e.children[o], a.trashMe && e.removeChild(a);
}
function nt(e, t, n) {
	let r = {};
	for (let t = 0; t < e.children.length; t++) {
		let n = e.children[t];
		r[n.subject.toNT()] = n;
	}
	for (let i = 0; i < t.length; i++) {
		let a = t[i];
		if (i >= e.children.length) {
			let t = n(a);
			t.subject = a, e.appendChild(t);
		} else {
			let t = e.children[i];
			if (!t.subject.sameTerm(a)) {
				let i = r[a.toNT()];
				if (i) e.removeChild(i), e.insertBefore(i, t);
				else {
					let e = n(a);
					t.before(e), e.subject = a;
				}
			}
		}
	}
	for (; e.children.length > t.length;) e.removeChild(e.children[e.children.length - 1]);
}
function rt(e) {
	let t = "" + e + "\n", n;
	if (!e.stack) return t + "No stack available.\n";
	let r = e.stack.toString().split("\n"), i = [];
	for (n = 0; n < r.length; n++) {
		let e = r[n];
		if (e.indexOf("ecmaunit.js") > -1) break;
		e.charAt(0) === "(" && (e = "function" + e);
		let t = e.split("@");
		i.push(t);
	}
	for (n = 0; n < i.length; n++) t += "  " + i[n][1] + "\n    " + i[n][0];
	return t;
}
function it(e) {
	let t = e.childNodes, n = t.length;
	for (let r = n - 1; r >= 0; r--) e.removeChild(t[r]);
	return e;
}
function at(e) {
	let t;
	return e ||= window.event, e.target ? t = e.target : e.srcElement && (t = e.srcElement), t.nodeType === 3 && (t = t.parentNode), t;
}
function ot(e, t) {
	let n;
	for (n = e; n; n = n.parentNode) try {
		if (n.tagName === t) return n;
	} catch {
		return;
	}
}
function st(e, t) {
	let n, r;
	for (n = t; n && n.nodeType === 1; n = n.parentNode) if (r = n.getAttribute("about"), r) return e.fromNT(r);
	qe.log.debug("getAbout: No about found");
}
function ct(e) {
	let t = e.parentNode, n = t ? t.AJAR_statement : void 0;
	switch (n ? e.className : "") {
		case "pred":
		case "pred selected": return n.predicate;
		case "obj":
		case "obj selected": return t.AJAR_inverse ? n.subject : n.object;
		case "":
		case "selected": return st(A, e);
		case "undetermined selected": return e.nextSibling ? n.predicate : t.AJAR_inverse ? n.subject : n.object;
	}
}
function lt(e, t) {
	let n = e.createElement("script");
	return n.setAttribute("type", "text/javascript"), n.setAttribute("src", t), n;
}
function ut(e) {
	let t = window.onload;
	typeof window.onload == "function" ? window.onload = function() {
		t(), e();
	} : window.onload = e;
}
function dt(e) {
	let t = e.ownerDocument.documentElement.getBoundingClientRect(), n = e.getBoundingClientRect();
	return [n.left - t.left, n.top - t.top];
}
function ft(e, t, n, r) {
	r ||= window;
	let i = dt(e)[1], a = window.SolidAppContext || {}, o = i - (a && a.scroll || 52) - r.scrollY;
	if (t) {
		if (n) {
			r.scrollBy(0, i + e.clientHeight - (r.scrollY + r.innerHeight));
			return;
		}
		r.scrollBy(0, o);
		return;
	}
	let s = r.setInterval(l, 50), c = 0;
	function l() {
		r.scrollBy(0, o / 10), c++, c === 10 && r.clearInterval(s);
	}
}
function pt(e, t, n, r) {
	r ||= document;
	let i = r.createElement("img");
	return i.setAttribute("src", e), i.addEventListener("copy", function(e) {
		e.clipboardData.setData("text/plain", ""), e.clipboardData.setData("text/html", ""), e.preventDefault();
	}), n !== void 0 && i.setAttribute("title", n), i;
}
function mt(e) {
	let t = e;
	"#/".indexOf(t[t.length - 1]) >= 0 && (t = t.slice(0, -1));
	let n = [];
	for (let e in this.prefixes) n[this.prefixes[e]] = e;
	let r, i = function(e) {
		return e === "ns" ? !1 : (r = e, !0);
	}, a, o = t.lastIndexOf("#");
	for (o >= 0 && (t = t.slice(o - 1));;) {
		let e = t.lastIndexOf("/");
		for (e >= 0 && (t = t.slice(e + 1)), a = 0; a < t.length && this.prefixchars.indexOf(t[a]);) a++;
		if (t = t.slice(0, a), t.length < 6 && i(t) || i(t.slice(0, 3)) || i(t.slice(0, 2)) || i(t.slice(0, 4)) || i(t.slice(0, 1)) || i(t.slice(0, 5))) return r;
		for (a = 0;; a++) if (i(t.slice(0, 3) + a)) return r;
	}
}
function ht(e) {
	if (e.uri === void 0) return "??";
	let t = e.uri, n = [], r = t.lastIndexOf("#"), i;
	if (r >= 0) t = t.slice(0, r + 1);
	else if (r = t.lastIndexOf("/"), r >= 0) t = t.slice(0, r + 1);
	else return e.uri + "?!";
	for (let e in qe.ns) n[qe.ns[e]] = e;
	try {
		return n[t];
	} catch {}
	for (t = t.slice(0, -1); t;) if (r = t.lastIndexOf("/"), r >= 0) {
		if (i = t.slice(r + 1), t = t.slice(0, r), i !== "ns" && "0123456789".indexOf(i[0]) < 0) return i;
	} else return e.uri + "!?";
}
function gt(e, t) {
	let n = A.findTypeURIs(e);
	return n[qe.ns.rdf("Predicate").uri] || n[qe.ns.rdfs("Class").uri] ? N(e, t) + " (" + ht(e) + ")" : N(e, t);
}
function _t(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}
function vt(e) {
	return _t(N(e));
}
function yt(e, t) {
	return _t(bt(e, t));
}
function bt(e, t) {
	let n = N(e);
	if (t) {
		let t = A.any(e, qe.ns.owl("inverseOf")) || A.any(void 0, qe.ns.owl("inverseOf"), e);
		return t ? N(t) : n === "type" ? "..." : "is " + n + " of";
	}
	return n;
}
function xt(e, t) {
	let n = e.predicate.compareTerm(t.predicate);
	return n === 0 ? e.object.compareTerm(t.object) : n;
}
function St(e, t) {
	let n = e.predicate.compareTerm(t.predicate);
	return n === 0 ? e.subject.compareTerm(t.subject) : n;
}
function Ct(e) {
	let t = e;
	for (;;) if (t.getAttribute("predTR")) return t;
	else if (t.previousSibling && t.previousSibling.nodeName === "TR") t = t.previousSibling;
	else return qe.log.error("Could not find predParent"), e;
}
//#endregion
//#region src/lib/debug.ts
function P(...e) {
	console.log(...e);
}
function F(...e) {
	console.warn(...e);
}
function I(...e) {
	console.error(...e);
}
function wt(...e) {
	console.trace(...e);
}
//#endregion
//#region src/acl/acl.ts
var L = w.store;
function Tt(e, t, n, r) {
	let i = E.acl, a = e.uri.slice(-1) === "/", s = L.each(void 0, i("default"), n, r).concat(L.each(void 0, i("defaultForNew"), n, r)).reduce((t, n) => t.concat(L.statementsMatching(n, E.rdf("type"), i("Authorization"), r)).concat(L.statementsMatching(n, i("agent"), void 0, r)).concat(L.statementsMatching(n, i("agentClass"), void 0, r)).concat(L.statementsMatching(n, i("agentGroup"), void 0, r)).concat(L.statementsMatching(n, i("origin"), void 0, r)).concat(L.statementsMatching(n, i("originClass"), void 0, r)).concat(L.statementsMatching(n, i("mode"), void 0, r)).concat(o(n, i("accessTo"), e, r)).concat(a ? o(n, i("default"), e, r) : []), []), c = ue();
	return s.forEach((e) => c.add(l(e.subject), l(e.predicate), l(e.object), _(t.uri))), c;
	function l(e) {
		let n = r.uri.length;
		return _(e.uri.slice(0, n) === r.uri ? t.uri + e.uri.slice(n) : e.uri);
	}
}
function Et(e, t, n = L, r = !1) {
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
function Dt(e, t) {
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
function Ot(e) {
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
function kt(e, t) {
	let n = [], r = function(e) {
		e.length ? Vt(e.shift().doc(), function(i, a, o, s, c, l) {
			let u = !a;
			if (!i || !c || !l) return t(i, s);
			let d = u ? Et(c, l) : Et(o, s);
			n.push(d), r(e.slice(1));
		}) : t(!0, Ot(n));
	};
	r(e);
}
function At(e) {
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
function jt(e, t, n, r) {
	return Mt(e, t, At(n), r);
}
function Mt(e, t, n, r, i, a) {
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
function Nt(e) {
	return Pt(At(e));
}
function Pt(e) {
	let t = "";
	for (let n in e) {
		let r = n.split("\n").map(function(e) {
			return e.split("#")[1][0];
		}).join("");
		t += r + ":";
		let i = e[n];
		for (let e = 0; e < i.length; e++) {
			let n = i[e][0], r = _(i[e][1]);
			t += n === "agent" ? "@" : "", t += r.sameTerm(E.foaf("Agent")) ? "*" : N(r), e < i.length - 1 && (t += ",");
		}
		t += ";";
	}
	return "{" + t.slice(0, -1) + "}";
}
function Ft(e, t, n) {
	let r = ue();
	return jt(r, e, t, n), O(n, r, n.uri, "text/turtle") || "";
}
function It(e, t, n, r, i) {
	return Lt(e, t, At(n), r, i);
}
function Lt(e, t, n, r, i) {
	let a = ue();
	Mt(a, t, n, r, !0), e.updater?.put(r, a.statementsMatching(void 0, void 0, void 0, r), "text/turtle", function(a, o, s) {
		o ? (e.fetcher?.unload(r), Mt(e, t, n, r, !0), e.fetcher.requested[r.uri] = "done", i(o)) : i(o, s);
	});
}
function Rt(e, t, n) {
	let r = L.each(void 0, E.vcard("hasMember"), e);
	r ? zt(e, r, t, n) : (t("This card is in no groups"), n(!0));
}
function zt(e, t, n, r) {
	n ||= P;
	let i = e.doc();
	Vt(i, function(a, o, s, c, l, u) {
		if (!a || !l || !u) return r(!1, c);
		let d = o ? Et(s, c) : Et(l, u);
		kt(t, function(t, a) {
			if (!t) return r(!1, a);
			Dt(a, d) ? n("Nice - same ACL. no change " + N(e) + " " + i) : (n("Group ACLs differ for " + N(e) + " " + i), It(L, s, a, c, r));
		});
	});
}
function Bt(e, t, n) {
	let r = L.any(e, ae);
	if (!L.fetcher) throw Error("Store has no fetcher");
	r ? L.fetcher.webOperation("PUT", r.value, {
		data: t,
		contentType: "text/turtle"
	}).then((e) => {
		n(e.ok, e.error || "");
	}) : L.fetcher.nowOrWhenFetched(e, void 0, function(r, i) {
		if (!r) return n(r, "Gettting headers for ACL: " + i);
		let a = L.any(e, ae);
		if (!a) n(!1, "No Link rel=ACL header for " + e);
		else {
			if (!L.fetcher) throw Error("Store has no fetcher");
			L.fetcher.webOperation("PUT", a.value, {
				data: t,
				contentType: "text/turtle"
			}).then((e) => {
				n(e.ok, e.error || "");
			});
		}
	});
}
function Vt(e, t) {
	Ht(e, function(n, r, i, a) {
		let o = E.acl;
		if (!n) return t(!1, !1, r, a);
		let s = function(n) {
			n.slice(-1) === "/" && (n = n.slice(0, -1));
			let r = n.lastIndexOf("/");
			if (n.indexOf("/", n.indexOf("//") + 2) > r) return t(!1, !0, 404, "Found no ACL resource");
			n = n.slice(0, r + 1);
			let a = _(n);
			Ht(a, function(r, c, l) {
				return r ? c === 403 ? t(!1, !0, c, `( default ACL file FORBIDDEN. Stop.${n})`) : c === 404 ? s(n) : c === 200 ? L.each(void 0, o("default"), L.sym(n), l).concat(L.each(void 0, o("defaultForNew"), L.sym(n), l)).length ? t(!0, !1, e, i, L.sym(n), l) : s(n) : t(!1, !0, c, `Error status '${c}' searching for default for ${a}`) : t(!1, !0, c, `( No ACL pointer ${n} ${c})${l}`);
			});
		};
		if (!n) return t(!1, !1, r, `Error accessing Access Control information for ${e}) ${a}`);
		if (r === 404) s(e.uri);
		else if (r === 403) return t(!1, !1, r, `(Sharing not available to you)${a}`);
		else if (r !== 200) return t(!1, !1, r, `Error ${r} accessing Access Control information for ${e}: ${a}`);
		else return t(!0, !0, e, i);
	});
}
function Ht(e, t) {
	if (!L.fetcher) throw Error("kb has no fetcher");
	L.fetcher.nowOrWhenFetched(e, void 0, function(n, r) {
		if (!n) return t(n, `Can't get headers to find ACL for ${e}: ${r}`);
		let i = L.any(e, ae);
		if (!i) t(!1, 900, `No Link rel=ACL header for ${e}`);
		else {
			if (!L.fetcher) throw Error("kb has no fetcher");
			if (L.fetcher.nonexistent[i.value]) return t(!0, 404, i, `ACL file ${i} does not exist.`);
			L.fetcher.nowOrWhenFetched(i, void 0, function(e, n, r) {
				e ? t(!0, 200, i) : t(!0, r.status, i, `Can't read Access Control File ${i}: ${n}`);
			});
		}
	});
}
async function Ut(e) {
	return new Promise((t, n) => Vt(_(e), (r, i, a, o, s) => r ? t(i ? a : s) : n(/* @__PURE__ */ Error(`Error loading ${e}`))));
}
//#endregion
//#region node_modules/escape-html/index.js
var Wt = /* @__PURE__ */ i(((e, t) => {
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
})), R = [];
for (let e = 0; e < 256; ++e) R.push((e + 256).toString(16).slice(1));
function Gt(e, t = 0) {
	return (R[e[t + 0]] + R[e[t + 1]] + R[e[t + 2]] + R[e[t + 3]] + "-" + R[e[t + 4]] + R[e[t + 5]] + "-" + R[e[t + 6]] + R[e[t + 7]] + "-" + R[e[t + 8]] + R[e[t + 9]] + "-" + R[e[t + 10]] + R[e[t + 11]] + R[e[t + 12]] + R[e[t + 13]] + R[e[t + 14]] + R[e[t + 15]]).toLowerCase();
}
//#endregion
//#region node_modules/uuid/dist/rng.js
var Kt = /* @__PURE__ */ new Uint8Array(16);
function qt() {
	return crypto.getRandomValues(Kt);
}
//#endregion
//#region node_modules/uuid/dist/v4.js
function Jt(e, t, n) {
	return !t && !e && crypto.randomUUID ? crypto.randomUUID() : Yt(e, t, n);
}
function Yt(e, t, n) {
	e ||= {};
	let r = e.random ?? e.rng?.() ?? qt();
	if (r.length < 16) throw Error("Random bytes length must be >= 16");
	if (r[6] = r[6] & 15 | 64, r[8] = r[8] & 63 | 128, t) {
		if (n ||= 0, n < 0 || n + 16 > t.length) throw RangeError(`UUID byte range ${n}:${n + 15} is out of buffer bounds`);
		for (let e = 0; e < 16; ++e) t[n + e] = r[e];
		return t;
	}
	return Gt(r);
}
//#endregion
//#region node_modules/mime-db/db.json
var Xt = /* @__PURE__ */ r({ default: () => Zt }), Zt, Qt = n((() => {
	Zt = {
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
})), $t = /* @__PURE__ */ i(((e, n) => {
	n.exports = (Qt(), t(Xt).default);
})), en = /* @__PURE__ */ i(((e, t) => {
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
})), tn = /* @__PURE__ */ i(((e, t) => {
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
})), nn = /* @__PURE__ */ i(((e) => {
	var t = $t(), n = en().extname, r = tn(), i = /^\s*([^;\s]*)(?:;|\s|$)/, a = /^text\//i;
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
})), z = /* @__PURE__ */ e(Wt()), rn = /* @__PURE__ */ e(nn()), B = {
	highlightColor: "#7C4DFF",
	formBorderColor: "#888888",
	formHeadingColor: "#888888",
	lowProfileLinkColor: "#3B5998",
	formFieldNameBoxWidth: "8em",
	mediaModuleCanvasWidth: "640",
	mediaModuleCanvasHeight: "480",
	textInputSize: 20,
	tabBorderRadius: "0.2em",
	textInputBackgroundColor: "#eef",
	textInputBackgroundColorUneditable: "#fff",
	textInputColor: "#000",
	textInputColorPending: "#888",
	defaultErrorBackgroundColor: "#fee",
	participationDefaultBackground: "white",
	basicMaxLength: "4096"
}, V = {
	checkboxStyle: "color: black; font-size: 100%; padding-left: 0.5 em; padding-right: 0.5 em;",
	checkboxInputStyle: "font-size: 150%; height: 1.2em; width: 1.2em; background-color: #eef; border-radius:0.2em; margin: 0.1em;",
	fieldLabelStyle: "color: #3B5998; text-decoration: none;",
	formSelectStyle: "background-color: #eef; padding: 0.5em;  border: .05em solid #88c; border-radius:0.2em; font-size: 100%; margin:0.4em;",
	textInputStyle: "background-color: #eef; padding: 0.5em;  border: .05em solid #88c; border-radius:0.2em; font-size: 100%; margin:0.4em;",
	textInputStyleUneditable: "background-color: white; padding: 0.5em;  border: .05em solid white; border-radius:0.2em; font-size: 100%; margin:0.4em;",
	buttonStyle: "background-color: #fff; padding: 0.7em;  border: .01em solid white; border-radius:0.2em; font-size: 100%; margin: 0.3em;",
	commentStyle: "padding: 0.7em;  border: none; font-size: 100%; white-space: pre-wrap;",
	iconStyle: "width: 3em; height: 3em; margin: 0.1em; border-radius: 1em;",
	smallButtonStyle: "margin: 0.2em; width: 1em; height:1em;",
	classIconStyle: "width: 3em; height: 3em; margin: 0.1em; border-radius: 0.2em; border: 0.1em solid green; padding: 0.2em; background-color: #efe;",
	confirmPopupStyle: "padding: 0.7em; border-radius: 0.2em; border: 0.1em solid orange; background-color: white; box-shadow: 0.5em 0.9em #888;",
	messageBodyStyle: "white-space: pre-wrap; width: 99%; font-size:100%; border: 0.07em solid #eee; border-radius:0.2em; padding: .3em 0.5em; margin: 0.1em;",
	pendingeditModifier: "color: #bbb;",
	personaBarStyle: "width: 100%; height: 4em; background-color: #eee; vertical-align: middle;",
	searchInputStyle: "border: 0.1em solid #444; border-radius: 0.2em; width: 100%; font-size: 100%; padding: 0.1em 0.6em; margin 0.2em;",
	autocompleteRowStyle: "border: 0.2em solid straw;",
	signInAndUpButtonStyle: "padding: 1em; border-radius:0.2em; font-size: 100%;",
	headerBannerLoginInput: "margin: 0.75em 0 0.75em 0.5em !important; padding: 0.5em !important;",
	signUpBackground: "background-color: #eef;",
	signInBackground: "background-color: #efe;",
	heading1Style: "font-size: 180%; font-weight: bold; color: #888888; padding: 0.5em; margin: 0.7em 0.0m;",
	heading2Style: "font-size: 130%; font-weight: bold; color: #888888; padding: 0.4em; margin: 0.7em 0.0em;",
	heading3Style: "font-size: 120%; font-weight: bold; color: #888888; padding: 0.3em; margin: 0.7em 0.0em;",
	heading4Style: "font-size: 110%; font-weight: bold; color: #888888; padding: 0.2em; margin: 0.7em 0.0em;",
	formHeadingStyle: "font-size: 110%; font-weight: bold; color: #888888; padding: 0.2em;  margin: 0.7em 0.0em;",
	formTextInput: "font-size: 100%; margin: 0.1em; padding: 0.1em;",
	formGroupStyle: [
		`padding-left: 0em; border: 0.0em solid ${B.formBorderColor}; border-radius: 0.2em;`,
		`padding-left: 2em; border: 0.05em solid ${B.formBorderColor}; border-radius: 0.2em;`,
		`padding-left: 2em; border: 0.1em solid ${B.formBorderColor}; border-radius: 0.2em;`,
		`padding-left: 2em; border: 0.2em solid ${B.formBorderColor}; border-radius: 0.2em;`
	],
	formFieldLabelStyle: `color: ${B.lowProfileLinkColor}; text-decoration: none;`,
	formFieldNameBoxStyle: `padding: 0.3em; vertical-align: middle; width:${B.formFieldNameBoxWidth};`,
	multilineTextInputStyle: "font-size:100%; white-space: pre-wrap; background-color: #eef; border: 0.07em solid gray; padding: 1em 0.5em; margin: 1em 1em;",
	renderAsDivStyle: "display: flex; align-items: center; justify-content: space-between; height: 2.5em; padding: 1em;",
	imageDivStyle: "width:2.5em; padding:0.5em; height: 2.5em;",
	linkDivStyle: "width:2em; padding:0.5em; height: 4em;",
	aclControlBoxContainer: "margin: 1em;",
	aclControlBoxHeader: "font-size: 120%; margin: 0 0 1rem;",
	aclControlBoxStatus: "display: none; margin: 1rem 0;",
	aclControlBoxStatusRevealed: "display: block;",
	aclGroupContent: "maxWidth: 650;",
	accessGroupList: "display: grid; grid-template-columns: 1fr; margin: 1em; width: 100%;",
	accessGroupListItem: "display: grid; grid-template-columns: 100px auto 30%;",
	defaultsController: "display: flex;",
	defaultsControllerNotice: "color: #888; flexGrow: 1; fontSize: 80%;",
	bigButton: "background-color: white; color: black; text-wrap: pretty; border: 0.1em solid #888; border-radius: 0.3em; max-width: 50%; padding-bottom: 1em; padding-top: 1em;",
	group: "color: #888;",
	group1: "color: green;",
	group2: "color: #cc0;",
	group3: "color: orange;",
	group5: "color: red;",
	group9: "color: blue;",
	group13: "color: purple;",
	trustedAppAddApplicationsTable: "background-color: #eee;",
	trustedAppCancelButton: "float: right;",
	trustedAppControllerI: "border-color: orange; border-radius: 1em; border-width: 0.1em;",
	temporaryStatusInit: "background: green;",
	temporaryStatusEnd: "background: transparent; transition: background 5s linear;",
	headerUserMenuLink: "background: none; border: 0; color: black; cursor: pointer; display: block; font-family: Arial; font-size: 1em; text-align: left; padding: 1em;  width: 100%; text-decoration: none;",
	headerUserMenuLinkHover: "background: none; border: 0; color: black; cursor: pointer; display: block; font-family: Arial; font-size: 1em; text-align: left; padding: 1em;  width: 100%; text-decoration: none; background-image: linear-gradient(to right, #7C4DFF 0%, #18A9E6 50%, #01C9EA 100%);",
	headerUserMenuTrigger: "background: none; border: 0; cursor: pointer; width: 60px; height: 60px;",
	headerUserMenuTriggerImg: "border-radius: 50%; height: 56px; width: 28px !important;",
	headerUserMenuButton: "background: none; border: 0; color: black; cursor: pointer; display: block; font-family: Arial; font-size: 1em; text-align: left; padding: 1em; width: 100%;",
	headerUserMenuButtonHover: "background: none; border: 0; color: black; cursor: pointer; display: block; font-family: Arial; font-size: 1em; text-align: left; padding: 1em; width: 100%; background-image: linear-gradient(to right, #7C4DFF 0%, #18A9E6 50%, #01C9EA 100%);",
	headerUserMenuList: "list-style: none; margin: 0; padding: 0;",
	headerUserMenuListDisplay: "list-style: none; margin: 0; padding: 0; display:true;",
	headerUserMenuNavigationMenu: "background: white; border: solid 1px #000000; border-right: 0; position: absolute; right: 0; top: 60px; width: 200px; z-index: 1; display: true;",
	headerUserMenuNavigationMenuNotDisplayed: "background: white; border: solid 1px #000000; border-right: 0; position: absolute; right: 0; top: 60px; width: 200px; z-index: 1; display: none;",
	headerUserMenuListItem: "border-bottom: solid 1px #000000;",
	headerUserMenuPhoto: "border-radius: 50%; background-position: center; background-repeat: no-repeat; background-size: cover; height: 50px; width: 50px;",
	headerBanner: "box-shadow: 0px 1px 4px #000000; display: flex; justify-content: space-between; padding: 0 1.5em; margin-bottom: 4px;",
	headerBannerLink: "display: block;",
	headerBannerRightMenu: "display: flex;",
	headerBannerLogin: "margin-left: auto;",
	allChildrenVisible: "display:true;",
	headerBannerUserMenu: "border-left: solid 1px #000000; margin-left: auto;",
	headerBannerHelpMenu: "border-left: solid 1px #000000; margin-left: auto;",
	headerBannerIcon: "background-size: 65px 60px !important; height: 60px !important; width: 65px !important;",
	footer: "border-top: solid 1px $divider-color; font-size: 0.9em; padding: 0.5em 1.5em;",
	primaryButton: "background-color: #7c4dff; color: #ffffff; font-family: Raleway, Roboto, sans-serif; border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none;",
	primaryButtonHover: "background-color: #9f7dff; color: #ffffff; font-family: Raleway, Roboto, sans-serif;border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none; transition: 0.25s all ease-in-out;",
	primaryButtonNoBorder: "background-color: #ffffff; color: #7c4dff; font-family: Raleway, Roboto, sans-serif;border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none;",
	primaryButtonNoBorderHover: "background-color: #7c4dff; color: #ffffff; font-family: Raleway, Roboto, sans-serif; border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none; transition: 0.25s all ease-in-out;",
	secondaryButton: "background-color: #01c9ea; color: #ffffff; font-family: Raleway, Roboto, sans-serif;border-radius: 0.25em; border-color: #01c9ea; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none;",
	secondaryButtonHover: "background-color: #37cde6; color: #ffffff; font-family: Raleway, Roboto, sans-serif;border-radius: 0.25em; border-color: #7c4dff; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none; transition: 0.25s all ease-in-out;",
	secondaryButtonNoBorder: "background-color: #ffffff; color: #01c9ea; font-family: Raleway, Roboto, sans-serif; border-radius: 0.25em; border-color: #01c9ea; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none;",
	secondaryButtonNoBorderHover: "background-color: #01c9ea; color: #ffffff; font-family: Raleway, Roboto, sans-serif; border-radius: 0.25em; border-color: #01c9ea; border: 1px solid; cursor: pointer; font-size: .8em; text-decoration: none; padding: 0.5em 4em; transition: 0.25s all ease-in-out; outline: none; transition: 0.25s all ease-in-out;",
	controlStyle: `border-radius: 0.5em; margin: 0.8em; width:${B.mediaModuleCanvasWidth}; height:${B.mediaModuleCanvasHeight};`,
	dragEvent: "background-color: #ccc; border: 0.25em dashed black; border-radius: 0.3em;",
	dropEvent: "background-color: white; border: 0em solid black;",
	restoreStyle: "background-color: white;",
	errorCancelButton: "width: 2em; height: 2em; align: right;",
	errorMessageBlockStyle: "margin: 0.1em; padding: 0.5em; border: 0.05em solid gray; color:black;",
	notepadStyle: "padding: 1em; overflow: auto; resize: horizontal; min-width: 40em;",
	upstreamStatus: "width: 50%;",
	downstreamStatus: "width: 50%;",
	baseStyle: "font-size: 100%; font-family: monospace; width: 100%; border: none; white-space: pre-wrap;",
	headingCore: "font-family: sans-serif; font-weight: bold;  border: none;",
	headingStyle: [
		"font-size: 110%; padding-top: 0.5em; padding-bottom: 0.5em; width: 100%;",
		"font-size: 120%; padding-top: 1em; padding-bottom: 1em; width: 100%;",
		"font-size: 150%; padding-top: 1em; padding-bottom: 1em; width: 100%;"
	],
	participantsStyle: "margin: 0.8em;",
	participantsBlock: "height: 1.5em; width: 1.5em; margin: 0.3em; border 0.01em solid #888;",
	personTableTD: "vertical-align: middle;",
	tabsNavElement: "margin: 0;",
	tabsRootElement: "display: flex; height: 100%; width: 100%;",
	tabsMainElement: "margin: 0; width:100%; height: 100%;",
	tabContainer: "list-style-type: none; display: flex; height: 100%; width: 100%; margin: 0; padding: 0;",
	makeNewSlot: "background: none; border: none; font: inherit; cursor: pointer;",
	ellipsis: "position: absolute; right: 0; bottom: 0; width: 20%; background: none; color: inherit; border: none; padding: 0; font: inherit; cursor: pointer; outline: inherit;"
};
V.setStyle = function(e, t) {
	e.style = V[t];
};
//#endregion
//#region src/widgets/dragAndDrop.js
function an(e, t, n) {
	let r = function(e) {
		return e.split("\n").map((e) => e.trim()).filter((e) => e && e[0] !== "#");
	}, i = function(e) {
		e.preventDefault(), e.stopPropagation(), e.dataTransfer.dropEffect = "copy";
	}, a = function(e) {
		e.preventDefault(), e.stopPropagation(), P("dragenter event dropEffect: " + e.dataTransfer.dropEffect), this.localStyle && (this.savedStyle ||= V.dragEvent), e.dataTransfer.dropEffect = "link", P("dragenter event dropEffect 2: " + e.dataTransfer.dropEffect);
	}, o = function(e) {
		e.stopPropagation(), P("dragleave event dropEffect: " + e.dataTransfer.dropEffect), this.savedStyle ? this.localStyle = this.savedStyle : this.localStyle = V.dropEvent;
	}, s = function(e) {
		e.preventDefault && e.preventDefault(), e.stopPropagation && e.stopPropagation(), P("Drop event. dropEffect: " + e.dataTransfer.dropEffect), P("Drop event. types: " + (e.dataTransfer.types ? e.dataTransfer.types.join(", ") : "NOPE"));
		let i = null, a;
		if (e.dataTransfer.types) {
			for (let t = 0; t < e.dataTransfer.types.length; t++) {
				let o = e.dataTransfer.types[t];
				if (o === "text/uri-list") i = r(e.dataTransfer.getData(o)), P("Dropped text/uri-list: " + i);
				else if (o === "text/plain") a = e.dataTransfer.getData(o);
				else if (o === "Files" && n) {
					let t = e.dataTransfer.files;
					for (let e = 0; t[e]; e++) {
						let n = t[e];
						P("Filename: " + n.name + ", type: " + (n.type || "n/a") + " size: " + n.size + " bytes, last modified: " + (n.lastModifiedDate ? n.lastModifiedDate.toLocaleDateString() : "n/a"));
					}
					n(t);
				}
			}
			let t = a ? a.trim() : "";
			i === null && t && t.slice(0, 4) === "http" && (i = [t], P("Warning: Poor man's drop: using text for URI"));
		} else i = r(e.dataTransfer.getData("Text")), P("WARNING non-standard drop event: " + i[0]);
		return P("Dropped URI list (2): " + i), i && t(i), this.localStyle = V.restoreStyle, !1;
	};
	(function(e) {
		e || P("@@@ addTargetListeners: ele " + e), e.addEventListener("dragover", i), e.addEventListener("dragenter", a), e.addEventListener("dragleave", o), e.addEventListener("drop", s);
	})(e, t);
}
function on(e, t) {
	e.setAttribute("draggable", "true"), e.addEventListener("dragstart", function(n) {
		e.style.fontWeight = "bold", n.dataTransfer.setData("text/uri-list", t.uri), n.dataTransfer.setData("text/plain", t.uri), n.dataTransfer.setData("text/html", e.outerHTML), P("Dragstart: " + e + " -> " + t + "de: " + n.dataTransfer.dropEffect);
	}, !1), e.addEventListener("drag", function(e) {
		e.preventDefault(), e.stopPropagation();
	}, !1), e.addEventListener("dragend", function(n) {
		e.style.fontWeight = "normal", P("Dragend dropeffect: " + n.dataTransfer.dropEffect), P("Dragend: " + e + " -> " + t);
	}, !1);
}
function sn(e, t, n, r, i) {
	for (let a = 0; t[a]; a++) {
		let o = t[a];
		P(" dropped: Filename: " + o.name + ", type: " + (o.type || "n/a") + " size: " + o.size + " bytes, last modified: " + (o.lastModifiedDate ? o.lastModifiedDate.toLocaleDateString() : "n/a"));
		let s = new FileReader();
		s.onload = function(t) {
			return function(a) {
				let o = a.target.result, s = "";
				P(" File read byteLength : " + o.byteLength);
				let c = t.type;
				if (!t.type || t.type === "") {
					if (c = rn.lookup(t.name), !c) {
						let e = "Filename needs to have an extension which gives a type we know: " + t.name;
						throw P(e), alert(e), Error(e);
					}
				} else {
					let e = rn.extension(t.type);
					e && e !== "false" && !t.name.endsWith("." + e) && t.type !== rn.lookup(t.name) && (s = "_." + e);
				}
				let l = t.type.startsWith("image/") && r || n, u = l + (l.endsWith("/") ? "" : "/") + encodeURIComponent(t.name) + s;
				e.webOperation("PUT", u, {
					data: o,
					contentType: c
				}).then((e) => {
					P(" Upload: put OK: " + u), i(t, u);
				}, (e) => {
					let t = " Upload: FAIL " + u + ", Error: " + e;
					throw P(t), alert(t), Error(t);
				});
			};
		}(o), s.readAsArrayBuffer(o);
	}
}
//#endregion
//#region src/widgets/error.ts
function H(e, t, n, r) {
	let i = e.createElement("div"), a = r || t instanceof Error ? t : null;
	return a ? (console.error(`errorMessageBlock: ${a} at: ${a.stack || "??"}`, a), i.textContent = a.message) : i.textContent = t, i.appendChild(Kn(e, () => {
		i.parentNode && i.parentNode.removeChild(i);
	})).style = V.errorCancelButton, i.setAttribute("style", V.errorMessageBlockStyle), i.style.backgroundColor = n || B.defaultErrorBackgroundColor, i;
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
P("   icons.iconBase is set to : " + U.iconBase);
var cn = U.iconBase, ln = U.originalIconBase, W = w.store, un = class {
	constructor(e, t, n, r) {
		this.options = r || {}, this.element = e, this.typeIndex = t, this.groupPickedCb = n, this.selectedgroup = this.options.selectedgroup, this.onSelectGroup = this.onSelectGroup.bind(this);
	}
	render() {
		let e = document.createElement("div");
		if (e.style.maxWidth = "350px", e.style.minHeight = "200px", e.style.outline = "1px solid black", e.style.display = "flex", this.selectedgroup) {
			e.style.flexDirection = "column";
			let t = document.createElement("div");
			new fn(t, this.selectedgroup).render();
			let n = document.createElement("button");
			n.textContent = (0, z.default)("Change group"), n.addEventListener("click", (e) => {
				this.selectedgroup = null, this.render();
			}), e.appendChild(t), e.appendChild(n);
		} else this.findAddressBook(this.typeIndex).then(({ book: t }) => {
			let n = document.createElement("button");
			n.textContent = (0, z.default)("Pick an existing group"), n.style.margin = "auto", n.addEventListener("click", (n) => {
				new dn(e, t, this.onSelectGroup).render();
			});
			let r = document.createElement("button");
			r.textContent = (0, z.default)("Create a new group"), r.style.margin = "auto", r.addEventListener("click", (e) => {
				this.createNewGroup(t, this.options.defaultNewGroupName).then(({ group: e }) => {
					new pn(this.element, t, e, this.onSelectGroup).render();
				}).catch((e) => {
					this.element.appendChild(H(document, (0, z.default)(`Error creating a new group. (${e})`)));
				});
			}), e.appendChild(n), e.appendChild(r), this.element.innerHTML = "", this.element.appendChild(e);
		}).catch((e) => {
			this.element.appendChild(H(document, (0, z.default)(`Could find your groups. (${e})`)));
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
		let { groupIndex: n, groupContainer: r } = _n(e), i = _(`${r.uri}${Jt().slice(0, 8)}.ttl#this`), a = t || "Untitled Group", s = [i.doc(), n].map((t) => {
			let r = o(i, E.rdf("type"), E.vcard("Group"), t), s = o(i, E.vcard("fn"), a, i.doc(), t), c = o(e, E.vcard("includesGroup"), i, t), l = t.equals(n) ? [
				r,
				s,
				c
			] : [r, s];
			return gn(t.uri, { toIns: l }).then(() => {
				l.forEach((e) => {
					W.add(e);
				});
			});
		});
		return Promise.all(s).then(() => ({ group: i })).catch((e) => {
			throw P("Could not create new group.  PATCH failed " + e), Error(`Couldn't create new group.  PATCH failed for (${e.xhr ? e.xhr.responseURL : ""} )`);
		});
	}
	onSelectGroup(e) {
		this.selectedgroup = e, this.groupPickedCb(e), this.render();
	}
}, dn = class {
	constructor(e, t, n) {
		this.element = e, this.book = t, this.onSelectGroup = n;
	}
	render() {
		return this.loadGroups().then((e) => {
			let t = document.createElement("div");
			t.style.display = "flex", t.style.flexDirection = "column", e.forEach((e) => {
				let n = document.createElement("button");
				n.addEventListener("click", this.handleClickGroup(e)), new fn(n, e).render(), t.appendChild(n);
			}), this.element.innerHTML = "", this.element.appendChild(t);
		}).catch((e) => {
			this.element.appendChild(H(document, (0, z.default)(`There was an error loading your groups. (${e})`)));
		}), this;
	}
	loadGroups() {
		return new Promise((e, t) => {
			let { groupIndex: n } = _n(this.book);
			W.fetcher.nowOrWhenFetched(n, (n, r) => n ? e(W.each(this.book, E.vcard("includesGroup"))) : t(r));
		});
	}
	handleClickGroup(e) {
		return (t) => {
			this.onSelectGroup(e);
		};
	}
}, fn = class {
	constructor(e, t) {
		this.element = e, this.group = t;
	}
	render() {
		let e = document.createElement("div");
		return e.textContent = (0, z.default)(hn(this.group, E.vcard("fn"), `[${this.group.value}]`)), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
}, pn = class {
	constructor(e, t, n, r, i) {
		this.element = e, this.book = t, this.group = n, this.onGroupChanged = (e, t, n) => {
			i && i(e, t, n);
		}, this.groupChangedCb = i, this.doneBuildingCb = r;
	}
	refresh() {}
	render() {
		let e = document.createElement("div");
		e.style.maxWidth = "350px", e.style.minHeight = "200px", e.style.outline = "1px solid black", e.style.display = "flex", e.style.flexDirection = "column", an(e, (e) => {
			e.forEach((e) => {
				this.add(e).catch((e) => {
					this.element.appendChild(H(document, (0, z.default)(`Could not add the given WebId. (${e})`)));
				});
			});
		});
		let t = document.createElement("input");
		t.type = "text", t.value = hn(this.group, E.vcard("fn"), "Untitled Group"), t.addEventListener("change", (e) => {
			this.setGroupName(e.target.value).catch((e) => {
				this.element.appendChild(H(document, `Error changing group name. (${e})`));
			});
		});
		let n = document.createElement("label");
		if (n.textContent = (0, z.default)("Group Name:"), n.appendChild(t), e.appendChild(n), W.any(this.group, E.vcard("hasMember"))) W.match(this.group, E.vcard("hasMember")).forEach((t) => {
			let n = t.object, r = document.createElement("div");
			new mn(r, n, this.handleRemove(n)).render(), e.appendChild(r);
		});
		else {
			let t = document.createElement("p");
			t.textContent = z.default`
        To add someone to this group, drag and drop their WebID URL onto the box.
      `, e.appendChild(t);
		}
		let r = document.createElement("button");
		return r.textContent = (0, z.default)("Done"), r.addEventListener("click", (e) => {
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
			return W.holdsStatement(t) ? e : gn(this.group.doc().uri, { toIns: [t] }).then(() => {
				t.why = this.group.doc(), W.add(t), this.onGroupChanged(null, "added", e), this.render();
			});
		});
	}
	handleRemove(e) {
		return (t) => {
			let n = o(this.group, E.vcard("hasMember"), e);
			return gn(this.group.doc().uri, { toDel: [n] }).then(() => (W.remove(n), this.onGroupChanged(null, "removed", e), this.render(), !0)).catch((t) => {
				let n = W.any(e, E.foaf("name")), r = n && n.value ? `Could not remove ${n.value}. (${t})` : `Could not remove ${e.value}. (${t})`;
				throw Error(r);
			});
		};
	}
	setGroupName(e) {
		let { groupIndex: t } = _n(this.book), n = [this.group.doc(), t].map((t) => {
			let n = W.match(this.group, E.vcard("fn"), null, t), r = o(this.group, E.vcard("fn"), le(e));
			return gn(t.value, {
				toDel: n,
				toIns: [r]
			}).then((e) => {
				W.removeStatements(n), r.why = t, W.add(r);
			});
		});
		return Promise.all(n);
	}
}, mn = class {
	constructor(e, t, n) {
		this.webIdNode = t, this.element = e, this.handleRemove = n;
	}
	render() {
		let e = document.createElement("div");
		e.style.display = "flex";
		let t = hn(this.webIdNode, E.foaf("img"), cn + "noun_15059.svg"), n = document.createElement("img");
		n.src = (0, z.default)(t), n.width = "50", n.height = "50", n.style.margin = "5px";
		let r = hn(this.webIdNode, E.foaf("name"), `[${this.webIdNode}]`), i = document.createElement("span");
		i.innerHTML = (0, z.default)(r), i.style.flexGrow = "1", i.style.margin = "auto 0";
		let a = document.createElement("button");
		return a.textContent = "Remove", a.addEventListener("click", (e) => this.handleRemove().catch((e) => {
			this.element.appendChild(H(document, (0, z.default)(`${e}`)));
		})), a.style.margin = "5px", e.appendChild(n), e.appendChild(i), e.appendChild(a), this.element.innerHTML = "", this.element.appendChild(e), this;
	}
};
function hn(e, t, n) {
	let r = W.any(e, t);
	return r ? r.value : n;
}
function gn(e, { toDel: t, toIns: n }) {
	return new Promise((e, r) => {
		W.updater.update(t, n, (t, n, i) => {
			if (!n) return r(/* @__PURE__ */ Error(`PATCH failed for resource <${t}>: ${i}`));
			e();
		});
	});
}
function _n(e) {
	return {
		groupIndex: W.any(e, E.vcard("groupIndex")),
		groupContainer: W.sym(e.dir().uri + "Group/")
	};
}
//#endregion
//#region src/lib/newperson.js
var vn = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjAxNTcgOS4yNzM2M0MxNC4yOTU0IDguMzQwMzEgMTUuMTI4OCA2LjgyOTg0IDE1LjEyODggNS4xMjgyQzE1LjEyODggMi4zMDA1MSAxMi44MjgzIDAgMTAuMDAwNiAwQzcuMTcyODkgMCA0Ljg3MjM4IDIuMzAwNTEgNC44NzIzOCA1LjEyODJDNC44NzIzOCA2LjgyOTg0IDUuNzA1NyA4LjM0MDMxIDYuOTg1NDcgOS4yNzM2M0MzLjgwNDIyIDEwLjQ5MSAxLjUzOTA2IDEzLjU3NTQgMS41MzkwNiAxNy4xNzk1QzEuNTM5MDYgMTguNzM0NyAyLjgwNDM0IDIwIDQuMzU5NTcgMjBIMTUuNjQxNkMxNy4xOTY4IDIwIDE4LjQ2MjEgMTguNzM0NyAxOC40NjIxIDE3LjE3OTVDMTguNDYyMSAxMy41NzU0IDE2LjE5NyAxMC40OTEgMTMuMDE1NyA5LjI3MzYzWk02LjQxMDg2IDUuMTI4MkM2LjQxMDg2IDMuMTQ4ODMgOC4wMjEyMSAxLjUzODQ4IDEwLjAwMDYgMS41Mzg0OEMxMS45OCAxLjUzODQ4IDEzLjU5MDMgMy4xNDg4MyAxMy41OTAzIDUuMTI4MkMxMy41OTAzIDcuMTA3NTggMTEuOTggOC43MTc5NyAxMC4wMDA2IDguNzE3OTdDOC4wMjEyMSA4LjcxNzk3IDYuNDEwODYgNy4xMDc1OCA2LjQxMDg2IDUuMTI4MlpNMTUuNjQxNiAxOC40NjE1SDQuMzU5NTdDMy42NTI2NiAxOC40NjE1IDMuMDc3NTQgMTcuODg2NCAzLjA3NzU0IDE3LjE3OTVDMy4wNzc1NCAxMy4zNjIgNi4xODMxNiAxMC4yNTY0IDEwLjAwMDYgMTAuMjU2NEMxMy44MTgxIDEwLjI1NjQgMTYuOTIzNyAxMy4zNjIgMTYuOTIzNyAxNy4xNzk1QzE2LjkyMzcgMTcuODg2NCAxNi4zNDg2IDE4LjQ2MTUgMTUuNjQxNiAxOC40NjE1WiIgZmlsbD0iIzMxNDE1OCIvPgo8L3N2Zz4K", yn = (e, t, n) => {
	let r = e.createElement("tr");
	return r.appendChild(e.createElement("td")).appendChild(t), r.subject = n, r;
}, bn = (e, t) => {
	e.addEventListener("click", t);
}, xn = (e, t, n) => {
	let r = t.appendChild(e.createElement("div"));
	r.setAttribute("style", V.imageDivStyle), r.appendChild(n), n.setAttribute("draggable", "false");
};
//#endregion
//#region src/widgets/buttons/iconLinks.ts
function Sn(e, t, n) {
	let r = e.createElement("a");
	r.setAttribute("href", t.uri), t.uri.startsWith("http") && r.setAttribute("target", "_blank");
	let i = r.appendChild(e.createElement("img"));
	return i.setAttribute("src", n || ln + "go-to-this.png"), i.setAttribute("style", "margin: 0.3em;"), r;
}
var Cn = (e, t, n) => {
	let r = Sn(e, n);
	t.appendChild(r).classList.add("HoverControlHide"), t.appendChild(e.createElement("br"));
}, { iconBase: wn } = U, Tn = wn + "noun_1180156.svg", En = wn + "noun_1180158.svg";
function Dn(e) {
	let t = e && e.statusArea || e && e.div || null;
	if (t) return t;
	let n = e && e.dom;
	if (!n && typeof document < "u" && (n = document), n) {
		let r = n.getElementsByTagName("body")[0];
		return t = n.createElement("div"), r.insertBefore(t, r.firstElementChild), e && (e.statusArea = t), t;
	}
	return null;
}
function On(e, t) {
	if (!t) return;
	let n = Dn(e);
	P("Complaint: " + t), n ? n.appendChild(H(e && e.dom || document, t)) : alert(t);
}
function kn(e) {
	for (; e.firstChild;) e.removeChild(e.firstChild);
	return e;
}
function An(e) {
	let t = e.search(/logFile=/), n = e.search(/&rulesFile=/);
	return e.substring(t + 8, n);
}
function jn(e, t) {
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
function Mn(e, t) {
	return t.split("{").map(function(t) {
		let n = t.split("}")[0];
		return t ? ("000" + (e["get" + n]() + ({ Month: 1 }[n] || 0))).slice(-({
			Milliseconds: 3,
			FullYear: 4
		}[n] || 2)) + t.split("}")[1] : "";
	}).join("");
}
function Nn() {
	return Mn(/* @__PURE__ */ new Date(), "{FullYear}-{Month}-{Date}T{Hours}:{Minutes}:{Seconds}.{Milliseconds}");
}
function Pn() {
	return Mn(/* @__PURE__ */ new Date(), "{Hours}:{Minutes}:{Seconds}.{Milliseconds}");
}
function Fn(e, t) {
	let n = A, r = function(e) {
		let t = n.any(e, E.vcard("fn")) || n.any(e, E.foaf("name")) || n.any(e, E.vcard("organization-name"));
		return t ? t.value : null;
	}, i = t.sameTerm(E.foaf("Agent")) ? "Everyone" : r(t);
	if (e.textContent = i || N(t), !i && t.uri) {
		if (!n.fetcher) throw Error("kb has no fetcher");
		n.fetcher.nowOrWhenFetched(t.doc(), void 0, function(n) {
			e.textContent = r(t) || N(t);
		});
	}
}
function In(e, t) {
	return t.each(e, E.sioc("avatar")).concat(t.each(e, E.foaf("img"))).concat(t.each(e, E.vcard("logo"))).concat(t.each(e, E.vcard("hasPhoto"))).concat(t.each(e, E.vcard("photo"))).concat(t.each(e, E.foaf("depiction")));
}
var Ln = {
	"solid:AppProviderClass": "noun_144.svg",
	"solid:AppProvider": "noun_15177.svg",
	"solid:Pod": "noun_Cabinet_1434380.svg",
	"vcard:Group": "noun_339237.svg",
	"vcard:Organization": "noun_143899.svg",
	"vcard:Individual": vn,
	"schema:Person": vn,
	"foaf:Person": vn,
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
function Rn(e) {
	let t = e.uri.split("#")[0], n = t.indexOf("//");
	if (n < 0) throw Error("This URI does not have a web site part (origin)");
	let r = t.indexOf("/", n + 2);
	return r < 0 ? t.slice(0) + "/" : t.slice(0, r + 1);
}
function zn(e) {
	let t = wn;
	return typeof e != "string" && e.uri ? e.uri.split("/").length === 4 && !e.uri.split("/")[1] && !e.uri.split("/")[3] ? t + "noun_15177.svg" : e.uri.startsWith("message:") || e.uri.startsWith("mid:") ? t + "noun_480183.svg" : e.uri.startsWith("mailto:") ? t + "noun_567486.svg" : e.uri.startsWith("https:") && e.uri.indexOf("#") < 0 ? Rn(e) + "favicon.ico" : null : t + "noun_10636_grey.svg";
}
function Bn(e) {
	let t = A, n = wn;
	if (e.sameTerm(E.foaf("Agent")) || e.sameTerm(E.rdf("Resource"))) return n + "noun_98053.svg";
	let r = t.any(e, E.sioc("avatar")) || t.any(e, E.foaf("img")) || t.any(e, E.vcard("logo")) || t.any(e, E.vcard("hasPhoto")) || t.any(e, E.vcard("photo")) || t.any(e, E.foaf("depiction"));
	return r ? r.uri : null;
}
function Vn(e, t, n) {
	let r = A, i = Bn(t);
	if (i) return e.setAttribute("src", i), !0;
	let a = n[t.uri];
	if (a) return e.setAttribute("src", a), e.style = V.classIconStyle, !0;
	let o = zn(t);
	if (o) return e.setAttribute("src", o), !0;
	let s = r.findTypeURIs(t);
	for (let t in s) if (n[t]) return e.setAttribute("src", n[t]), !1;
	return e.setAttribute("src", wn + "noun_10636_grey.svg"), !1;
}
function Hn(e, t) {
	let n = A, r = {};
	for (let e in Ln) {
		let t = e.split(":")[0], n = e.split(":")[1], i = E[t](n), a = Ln[e];
		a.startsWith("data:") ? r[i.uri] = a : r[i.uri] = h(a, wn);
	}
	if (!Vn(e, t, r) && t.uri) {
		if (!n.fetcher) throw Error("kb has no fetcher");
		n.fetcher.nowOrWhenFetched(t.doc(), void 0, (n) => {
			n && Vn(e, t, r);
		});
	}
}
function Un(e, t) {
	let n = e.createElement("img");
	if (n.style = V.iconStyle, n.setAttribute("src", wn + (function(e) {
		if (!e.uri) return !1;
		let t = e.uri.split("/");
		return t.length === 3 || t.length === 4 && t[3] === "";
	}(t) ? "noun_15177.svg" : "noun_681601.svg")), t.uri && t.uri.startsWith("https:") && t.uri.indexOf("#") < 0) {
		let r = e.createElement("object");
		return r.setAttribute("data", Rn(t) + "favicon.ico"), r.setAttribute("type", "image/x-icon"), r.appendChild(n), r;
	} else return Hn(n, t), n;
}
function Wn(e, t, n, r) {
	function i() {
		t.parentElement.removeChild(t);
	}
	function a() {
		i(), r();
	}
	let o = e.createElement("div");
	o.style = V.confirmPopupStyle, o.style.position = "absolute", o.style.top = "-1em", o.style.display = "grid", o.style.gridTemplateColumns = "auto auto";
	let s = e.createElement("div");
	s.style.gridColumn = "1/2", s.style.gridRow = "1";
	let c = e.createElement("div");
	c.style.gridColumn = "1/2", c.style.gridRow = "2";
	let l = Kn(e, i);
	o.appendChild(l), l.style.gridColumn = "1", l.style.gridRow = "2";
	let u = o.appendChild(e.createElement("button"));
	u.style = V.buttonStyle, u.style.gridRow = "2", u.style.gridColumn = "2", u.textContent = "Cancel";
	let d = G(e, U.iconBase + "noun_925021.svg", "Delete it");
	o.appendChild(d), d.style.gridRow = "1", d.style.gridColumn = "1";
	let f = o.appendChild(e.createElement("button"));
	return f.style = V.buttonStyle, f.style.gridRow = "1", f.style.gridColumn = "2", f.textContent = n, o.appendChild(f), d.addEventListener("click", a), f.addEventListener("click", a), u.addEventListener("click", i), o;
}
function Gn(e, t, n, r) {
	function i() {
		let n = e.createElement("div");
		t.insertBefore(n, o), n.style.position = "relative", n.appendChild(Wn(e, n, s, r));
	}
	let a = wn + "noun_2188_red.svg", o = e.createElement("img");
	o.setAttribute("src", a), o.setAttribute("style", V.smallButtonStyle), o.style.float = "right";
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
		r.setAttribute("src", t), r.setAttribute("style", "width: 2em; height: 2em;"), r.title = n, a.setAttribute("style", V.buttonStyle);
	} else a.textContent = n.toLocaleUpperCase(), a.onmouseover = function() {
		i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", V.secondaryButtonNoBorderHover) : a.setAttribute("style", V.secondaryButtonHover) : i.needsBorder ? a.setAttribute("style", V.primaryButtonNoBorderHover) : a.setAttribute("style", V.primaryButtonHover);
	}, a.onmouseout = function() {
		i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", V.secondaryButtonNoBorder) : a.setAttribute("style", V.secondaryButton) : i.needsBorder ? a.setAttribute("style", V.primaryButtonNoBorder) : a.setAttribute("style", V.primaryButton);
	}, i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", V.secondaryButtonNoBorder) : a.setAttribute("style", V.secondaryButton) : i.needsBorder ? a.setAttribute("style", V.primaryButtonNoBorder) : a.setAttribute("style", V.primaryButton);
	return r && a.addEventListener("click", r, !1), a;
}
function Kn(e, t) {
	let n = G(e, Tn, "Cancel", t);
	return n.firstChild && (n.firstChild.style.opacity = "0.3"), n;
}
function qn(e, t) {
	return G(e, En, "Continue", t);
}
function Jn(e, t, n, r, i, a) {
	return new Promise(function(t, o) {
		let s = e.createElement("div");
		r ||= E.foaf("name"), a ||= i ? N(i) : "  ";
		let c = a + " " + N(r) + ": ";
		s.appendChild(e.createElement("p")).textContent = c;
		let l = e.createElement("input");
		l.setAttribute("type", "text"), l.setAttribute("size", "100"), l.setAttribute("maxLength", "2048"), l.setAttribute("style", V.textInputStyle), l.select(), s.appendChild(l), n.appendChild(s);
		function u() {
			s.parentNode.removeChild(s), t(l.value.trim());
		}
		l.addEventListener("keyup", function(e) {
			e.keyCode === 13 && u();
		}, !1), s.appendChild(e.createElement("br")), s.appendChild(Kn(e, function(e) {
			s.parentNode.removeChild(s), t(null);
		})), s.appendChild(qn(e, function(e) {
			u();
		})), l.focus();
	});
}
var Yn = Xn;
function Xn(e, t, n, r) {
	let i = e.createElement("tr");
	r ||= {};
	let a = i.appendChild(e.createElement("td")), o = i.appendChild(e.createElement("td")), s = i.appendChild(e.createElement("td")), c = r.image || Un(e, n);
	a.setAttribute("style", "vertical-align: middle; width:2.5em; padding:0.5em; height: 2.5em;"), o.setAttribute("style", "vertical-align: middle; text-align:left;"), s.setAttribute("style", "vertical-align: middle; width:2em; padding:0.5em; height: 4em;"), a.appendChild(c);
	let l = o.appendChild(e.createElement("div")), u = l.appendChild(e.createElement("span"));
	if (r.title ? u.textContent = r.title : Fn(u, n), typeof r.renderNameSuffix == "function") {
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
	return r.deleteFunction && Gn(e, s, r.noun || "one", r.deleteFunction), n.uri && (r.link !== !1 && (s.appendChild(Sn(e, n)).classList.add("HoverControlHide"), s.appendChild(e.createElement("br"))), r.draggable !== !1 && (c.setAttribute("draggable", "false"), on(i, n))), i.subject = n, i;
}
function Zn(e, t, n, r) {
	let i = t.appendChild(e.createElement("div"));
	n ? i.textContent = n : Fn(i, r);
}
function Qn(e, t, n, r) {
	let i = t.appendChild(e.createElement("div"));
	i.setAttribute("style", V.linkDivStyle), r.deleteFunction && Gn(e, i, r.noun || "one", r.deleteFunction), n.uri && (r.link !== !1 && Cn(e, i, n), on(t, n));
}
function $n(e, t, n) {
	let r = e.createElement("div");
	return r.setAttribute("style", V.renderAsDivStyle), n ||= {}, xn(e, r, n.image || Un(e, t)), Zn(e, r, n.title, t), Qn(e, r, t, n), n.clickable && n.onClickFunction && bn(r, n.onClickFunction), n.wrapInATR ? yn(e, r, t) : r;
}
function er(e) {
	if (e.refresh) {
		e.refresh();
		return;
	}
	for (let t = 0; t < e.children.length; t++) er(e.children[t]);
}
function tr(e, t, n, r = {}) {
	let i = /* @__PURE__ */ new Set(), a = !!(r.renderSupportingInfo || r.renderNameSuffix), s = r.refreshOnDocumentLoad ?? !0, c = function(e) {
		if (!y.updater) throw Error("kb has no updater");
		y.updater.update(o(t, g, e, p), [], function(e, t, n, r) {
			t ? u() : On(void 0, "Error deleting one: " + n);
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
		}), Yn(e, g, t, o);
	}
	let u = function() {
		let e = y.each(t, g);
		e.sort(), tt(C, e, l, a ? function(e, t) {
			return l(t);
		} : void 0);
	};
	function d(e) {
		let n = [];
		if (e.forEach(function(e) {
			let r = _(e);
			P("Dropped on attachemnt " + e), n.push(o(t, g, r, p));
		}), !y.updater) throw Error("kb has no updater");
		y.updater.update([], n, function(e, t, n, r) {
			t ? u() : On(void 0, "Error adding one: " + n);
		});
	}
	function f(e) {
		sn(y.fetcher, e, r.uploadFolder?.uri, r.uploadFolder?.uri, function(e, n) {
			let r = [o(t, g, y.sym(n), p)];
			if (!y.updater) throw Error("kb has no updater");
			y.updater.update([], r, function(e, t, n, r) {
				t ? u() : On(void 0, "Error adding link to uploaded file: " + n);
			});
		});
	}
	let p = r.doc || t.doc();
	r.modify === void 0 && (r.modify = !0);
	let m = r.modify, h = r.promptIcon || wn + "noun_748003.svg", g = r.predicate || E.wf("attachment"), v = r.noun || "attachment", y = A, b = n.appendChild(e.createElement("table"));
	b.setAttribute("style", "margin-top: 1em; margin-bottom: 1em;");
	let x = b.appendChild(e.createElement("tr")), S = x.appendChild(e.createElement("td")), C = x.appendChild(e.createElement("td")).appendChild(e.createElement("table"));
	if (C.appendChild(e.createElement("tr")), b.refresh = u, u(), m) {
		let t = G(e, h, "Drop attachments here");
		S.appendChild(t);
		let n = r.uploadFolder ? f : null;
		an(t, d, n);
		let i = t.querySelector("img");
		if (i && an(i, d, n), an(S, d, n), r.uploadFolder) {
			let t = yr(e, f);
			S.appendChild(t);
		}
	}
	return b;
}
function nr(e) {
	e.preventDefault(), e.stopPropagation();
	let t = at(e).getAttribute("href");
	if (!t) return P("openHrefInOutlineMode: No href found!\n");
	let n = window.document;
	n.outlineManager ? n.outlineManager.GotoSubject(A.sym(t), !0, void 0, !0, void 0) : window && window.panes && window.panes.getOutliner ? window.panes.getOutliner().GotoSubject(A.sym(t), !0, void 0, !0, void 0) : P("ERROR: Can't access outline manager in this config");
}
function rr(e) {
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
function ir() {
	let e = {};
	return A.statementsMatching(void 0, E.rdf("type"), void 0).forEach(function(t) {
		t.object.value && (e[t.object.value] = !0);
	}), A.statementsMatching(void 0, E.rdfs("subClassOf"), void 0).forEach(function(t) {
		t.object.value && (e[t.object.value] = !0), t.subject.value && (e[t.subject.value] = !0);
	}), A.each(void 0, E.rdf("type"), E.rdfs("Class")).forEach(function(t) {
		t.value && (e[t.value] = !0);
	}), e;
}
function ar(e) {
	let t = {}, n = {}, r = {}, i = 0, a = 0, o = 0, s = e.predicateIndex;
	for (let e in s) s[e][0].object.termType === "Literal" ? (n[e] = !0, a++) : (r[e] = !0, i++);
	let c = e.each(void 0, E.rdf("type"), E.rdf("Property"));
	for (let e = 0; e < c.length; e++) {
		let t = c[e].toNT();
		!r[t] && !n[t] && (n[t] = !0, r[t] = !0, o++);
	}
	return t.op = r, t.dp = n, Me(`propertyTriage: ${i} non-lit, ${a} literal. ${o} unknown.`), t;
}
function or(e, t) {
	let n = e.createElement("button");
	return n.setAttribute("type", "button"), n.textContent = "Goto " + N(t), n.addEventListener("click", function(n) {
		e.outlineManager.GotoSubject(t, !0, void 0, !0, void 0);
	}, !0), n;
}
function sr(e, t) {
	let n = e.createElement("button");
	return n.setAttribute("type", "button"), n.textContent = "✕", n.addEventListener("click", function(e) {
		t.parentNode.removeChild(t);
	}, !0), n;
}
function cr(e, t, n, r, i, a, o, s, c) {
	return lr(e.createElement("div"), e, t, n, r, i, a, o, s, c);
}
function lr(e, t, n, r, i, a, o, s, c, l) {
	let u = "border: 0.1em solid #ddd; border-bottom: none; width: 95%; height: 2em; padding: 0.5em;", d = null;
	e.innerHTML = "";
	let f = function(e, o) {
		let f, p, m = function() {
			let e = a ? n.each(void 0, i, o) : n.each(o, i);
			_.setAttribute("class", e.length === 0 ? "hideTillHover" : ""), p.setAttribute("src", s.connectIcon || wn + "noun_25830.svg"), p.setAttribute("title", e.length ? e.length : "attach");
		};
		f = ur.twoLine.widgetForClass(r)(t, o), f.setAttribute("style", u);
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
var ur = {};
function dr(e, t) {
	let n = e.createElement("div");
	return n.textContent = N(t), n;
}
function fr(e) {
	let t = ur.twoLine[e.uri], n = A;
	if (t) return t;
	let r = n.findSuperClassesNT(e);
	for (let e in r) if (t = ur.twoLine[n.fromNT(e).uri], t) return t;
	return ur.twoLine[""];
}
function pr(e, t) {
	let n = "", r = function(e) {
		let r = A.any(t, E.qu(e));
		return r || (n += "@@ No value for " + e + "! "), r ? _t(r.value) : "?";
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
        <td><a href="${_t(t.uri)}">${_t(n)}</a></td>
      </tr>`), i;
}
function mr(e, t) {
	let n = function(e) {
		let n = A.any(t, e);
		return n ? _t(n.value) : "?";
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
function hr(e, t) {
	let n = e.querySelectorAll("link");
	for (let e = 0; e < n.length; e++) if ((n[e].getAttribute("rel") || "") === "stylesheet" && (n[e].getAttribute("href") || "") === t) return;
	let r = e.createElement("link");
	r.setAttribute("rel", "stylesheet"), r.setAttribute("type", "text/css"), r.setAttribute("href", t), e.getElementsByTagName("head")[0].appendChild(r);
}
function gr(e) {
	return vr(e, "audio");
}
function _r(e) {
	return vr(e, "video");
}
function vr(e, t) {
	let n = {
		audio: "http://purl.org/dc/dcmitype/Sound",
		image: "http://purl.org/dc/dcmitype/Image",
		video: "http://purl.org/dc/dcmitype/MovingImage"
	}, r = t || "image", i = A.findTypeURIs(e), a = f(r + "/*").uri.split("*")[0];
	for (let e in i) if (e.startsWith(a)) return !0;
	return n[r] in i;
}
function yr(e, t) {
	let n = e.createElement("div"), r = n.appendChild(e.createElement("input"));
	return r.setAttribute("type", "file"), r.setAttribute("multiple", "true"), r.addEventListener("change", (e) => {
		P("File drop event: ", e), e.files ? t(e.files) : e.target && e.target.files ? t(e.target.files) : alert("Sorry no files .. internal error?");
	}, !1), r.style = "display:none", an(n.appendChild(G(e, wn + "noun_Upload_76574_000000.svg", "Upload files", (e) => {
		r.click();
	})), null, t), n;
}
ur = {
	line: {},
	twoLine: {
		"": dr,
		"http://www.w3.org/2000/10/swap/pim/qif#Transaction": pr,
		"http://www.w3.org/ns/pim/trip#Trip": mr,
		widgetForClass: fr
	}
};
//#endregion
//#region src/widgets/forms/fieldParams.ts
var br = {
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
	[E.ui("Group").uri]: { style: V.formGroupStyle },
	[E.ui("Comment").uri]: {
		element: "p",
		style: V.commentStyle
	},
	[E.ui("Heading").uri]: {
		element: "h3",
		style: V.formHeadingStyle
	}
}, xr = w.store, K = {};
function Sr(e) {
	let t = xr, n = t.findTypeURIs(e), r = t.bottomTypeURIs(n), i = [];
	for (let e in r) i.push(e);
	return i[0];
}
function Cr(e, t) {
	let n = Sr(t), r = K[n];
	return M("paneUtils: Going to implement field " + t + " of type " + n), r || function(e, r) {
		let i = H(e, "No handler for field " + t + " of type " + n);
		return r && r.appendChild(i), i;
	};
}
//#endregion
//#region src/widgets/forms/formStyle.ts
var wr = "https://www.w3.org/ns/css#";
function Tr(e, t) {
	let n = br[Sr(t)] || {}, r = A.any(t, E.ui("style"));
	if (!r) {
		n.style && e.setAttribute("style", n.style);
		return;
	}
	r.termType === "Literal" ? r && e.setAttribute("style", r.value) : A.statementsMatching(r, null, null, t.doc()).forEach((t) => {
		if (t.predicate.uri && t.predicate.uri.startsWith(wr)) {
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
var Er = w.store;
function Dr(e, t, n, r, i) {
	n.style.display = "flex", n.style.flexDirection = "row";
	let a = n.appendChild(e.createElement("div"));
	a.style.width = B.formFieldNameBoxWidth;
	let o = n.appendChild(e.createElement("div"));
	return a.setAttribute("class", "formFieldName"), a.setAttribute("style", V.formFieldNameBoxStyle), o.setAttribute("class", "formFieldValue"), i ? a.appendChild(e.createTextNode(i)) : t.any(r, E.ui("property")) ? a.appendChild(Or(e, t.any(r, E.ui("property")), r)) : (o.appendChild(H(e, "No property or label given for form field: " + r)), a.appendChild(e.createTextNode("???"))), o;
}
function Or(e, t, n) {
	let r = Er.any(n, E.ui("label"));
	if (r ||= N(t, !0), t === void 0) return e.createTextNode("@@Internal error: undefined property");
	let i = e.createElement("a");
	return t.uri && i.setAttribute("href", t.uri), i.setAttribute("style", "color: #3B5998; text-decoration: none;"), i.textContent = r, i;
}
function kr(e, t, n) {
	let r = Er.statementsMatching(e, t);
	if (r.length === 0) return n;
	if (!Er.updater) throw Error("Store has no updater");
	return r.length > 0 && r[0].why.value && Er.updater.editable(r[0].why.value, Er) ? Er.sym(r[0].why.value) : n;
}
function q(e, t, n, r, i, a, s) {
	let c = Er, l = i.doc ? i.doc() : null, u = e.createElement("div"), f = c.any(i, E.ui("property"));
	if (t && t.appendChild(u), !f) return u.appendChild(H(e, "Error: No property given for text field: " + i));
	let p = Dr(e, c, u, i), m = c.anyJS(i, E.ui("suppressEmptyUneditable"), null, l), h = br[Sr(i)];
	h === void 0 && (h = { style: "" });
	let g = h.style || "", _ = V.textInputStyle + g, v = e.createElement("input");
	v.style = _, p.appendChild(v), v.setAttribute("type", h.type ? h.type : "text");
	let y = (v.getAttribute("type") || "").toLowerCase(), b = y === "date" || y === "datetime-local", x = c.anyJS(i, E.ui("size")) || B.textInputSize || 20;
	v.setAttribute("size", x);
	let S = c.any(i, E.ui("maxLength"));
	v.setAttribute("maxLength", S ? "" + S : B.basicMaxLength), a ||= kr(r, f, a);
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
	}, !0), u) : (v.readOnly = !0, v.style = V.textInputStyleUneditable + g, m && v.value === "" && (u.style.display = "none"), u);
}
//#endregion
//#region src/widgets/forms/autocomplete/language.ts
var Ar = /* @__PURE__ */ r({
	addDefaults: () => Nr,
	defaultPreferredLanguages: () => Mr,
	filterByLanguage: () => Ir,
	getPreferredLanguages: () => Fr,
	getPreferredLanguagesFor: () => Pr,
	languageCodeURIBase: () => jr
}), jr = "https://www.w3.org/ns/iana/language-code/", Mr = [
	"en",
	"fr",
	"de",
	"it",
	"ar"
];
function Nr(e) {
	return e ||= [], e.concat(Mr.filter((t) => !e.includes(t)));
}
async function Pr(e) {
	let t = e.doc();
	await A.fetcher?.load(t);
	let n = A.any(e, E.schema("knowsLanguage"), null, t);
	if (!n) return Mr;
	let r = [];
	return n.elements.forEach((e) => {
		let n = A.any(e, E.solid("publicId"), null, t);
		if (!n) {
			console.warn("getPreferredLanguages: No publiID of language.");
			return;
		}
		if (!n.value.startsWith("https://www.w3.org/ns/iana/language-code/")) {
			console.error(`What should be a language code ${n.value} does not start with ${jr}`);
			return;
		}
		let i = n.value.slice(41);
		r.push(i);
	}), r.length > 0 ? (console.log(`     User knows languages with codes: "${r.join(",")}"`), Nr(r)) : null;
}
async function Fr() {
	let e = await S.currentUser();
	if (e) {
		let t = await Pr(e);
		if (t) return t;
	}
	if (typeof navigator < "u") {
		if (navigator.languages) return Nr(navigator.languages.map((e) => e.split("-")[0]));
		if (navigator.language) return Nr([navigator.language.split("-")[0]]);
	}
	return Mr;
}
function Ir(e, t) {
	let n = {};
	e.forEach((e) => {
		let t = e.subject.value;
		n[t] = n[t] || [], n[t].push(e);
	});
	let r = t || Mr;
	r.reverse();
	let i = [];
	for (let e in n) {
		let t = n[e].map((e) => {
			let t = e.name["xml:lang"];
			return [r.indexOf(t), e];
		});
		t.sort(), t.reverse(), i.push(t[0][1]);
	}
	return P(` Filter by language: ${e.length} -> ${i.length}`), i;
}
//#endregion
//#region src/widgets/forms/autocomplete/publicData.ts
var Lr = /* @__PURE__ */ r({
	AUTOCOMPLETE_LIMIT: () => 200,
	ESCOResultToBindings: () => Zr,
	bindingToTerm: () => Yr,
	dbPediaTypeMap: () => Wr,
	dbpediaParameters: () => Ur,
	escoParameters: () => Hr,
	fetcherOptionsJsonPublicData: () => Vr,
	getDbpediaDetails: () => si,
	getWikidataDetails: () => ii,
	getWikidataDetailsOld: () => ai,
	getWikidataLocation: () => oi,
	instituteDetailsWikidataQuery: () => Br,
	loadFromBindings: () => Xr,
	loadPublicDataThing: () => ri,
	queryESCODataByName: () => Qr,
	queryPublicDataByName: () => ei,
	queryPublicDataConstruct: () => ni,
	queryPublicDataSelect: () => ti,
	variableNameToPredicateMap: () => Jr,
	wikidataClasses: () => zr,
	wikidataIncomingClassMap: () => qr,
	wikidataOutgoingClassMap: () => Gr,
	wikidataParameters: () => Kr
}), Rr = /\$\(subject\)/g, zr = {
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
}, Br = "prefix vcard: <http://www.w3.org/2006/vcard/ns#>\nCONSTRUCT\n{  wd:Q49108 vcard:fn ?itemLabel.\nwd:Q49108 rdf:type ?klass. ?klass rdfs:label ?klassLabel; rdfs:comment ?klassDescription .\nwd:Q49108 schema:logo ?logo;\n   schema:image ?image;\n   schema:logo  ?sealImage;\n   schema:subOrganization  ?subsidiary .\n      ?subsidiary rdfs:label ?subsidiaryLabel .\n ?supersidiary schema:subOrganization wd:Q49108 .\n      ?supersidiary rdfs:label ?supersidiaryLabel .\n  wd:Q49108 schema:location ?location .\n     ?location  schema:elevation  ?elevation .\n     ?location  wdt:P131  ?region .  ?region rdfs:label ?regionLabel .\n     ?location wdt:P625 ?coordinates .\n     ?location  schema:country  ?country . ?country rdfs:label ?countryLabel .\n}\nWHERE\n{  optional {wd:Q49108 rdfs:label ?itemLabel} .\n  optional {wd:Q49108 wdt:P154 ?logo .}\n  optional {wd:Q49108 wdt:P31 ?klass .}\n  optional {wd:Q49108 wdt:P158  ?sealImage .}\n  optional {wd:Q49108 wdt:P18 ?image .}\n\n  optional { wd:Q49108       wdt:P355 ?subsidiary . }\n  optional { ?supersidiary   wdt:P355 wd:Q49108. }\n\n  optional { wd:Q49108 wdt:P276 ?location .\n\n    optional { ?location  schema:eleveation  ?elevation }\n    optional { ?location  wdt:P131  ?region }\n    optional { ?location wdt:P625 ?coordinates }\n    optional {  ?location  wdt:P17  ?country }\n  }\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\". }\n}", Vr = {
	credentials: "omit",
	headers: new Headers({ Accept: "application/json" })
}, Hr = {
	label: "ESCO",
	logo: A.sym("https://ec.europa.eu/esco/portal/static_resource2/images/logo/logo_en.gif"),
	searchByNameURI: "https://ec.europa.eu/esco/api/search?language=$(language)&type=occupation&text=$(name)"
}, Ur = {
	label: "DBPedia",
	logo: A.sym("https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/DBpediaLogo.svg/263px-DBpediaLogo.svg.png"),
	searchByNameQuery: "select distinct ?subject, ?name where {\n    ?subject a $(targetClass); rdfs:label ?name\n    FILTER regex(?name, \"$(name)\", \"i\")\n  } LIMIT $(limit)",
	endpoint: "https://dbpedia.org/sparql/"
}, Wr = { AcademicInsitution: "http://umbel.org/umbel/rc/EducationalOrganization" }, Gr = {
	AcademicInsitution: "http://www.wikidata.org/entity/Q4671277",
	Enterprise: "http://www.wikidata.org/entity/Q6881511",
	Business: "http://www.wikidata.org/entity/Q4830453",
	NGO: "http://www.wikidata.org/entity/Q79913",
	CharitableOrganization: "http://www.wikidata.org/entity/Q708676",
	Insitute: "http://www.wikidata.org/entity/Q1664720"
}, Kr = {
	label: "WikiData",
	limit: 3e3,
	logo: A.sym("https://www.wikimedia.org/static/images/project-logos/wikidatawiki.png"),
	endpoint: "https://query.wikidata.org/sparql",
	searchByNameQuery: "SELECT ?subject ?name\n  WHERE {\n    ?klass wdt:P279* $(targetClass) .\n    ?subject wdt:P31 ?klass .\n    ?subject rdfs:label ?name.\n    FILTER regex(?name, \"$(name)\", \"i\")\n  } LIMIT $(limit) ",
	insitituteDetailsQuery: "CONSTRUCT\n{  wd:Q49108 schema:name ?itemLabel;\n             schema:logo ?logo;\n              schema:logo  ?sealImage;\n             schema:subOrganization  ?subsidiary .\n                 ?subsidiary schema:name ?subsidiaryLabel .\n}\nWHERE\n{\n   wd:Q49108 # rdfs:label ?itemLabel ;\n             wdt:P154 ?logo;\n              wdt:P158  ?sealImage ;\n             wdt:P355  ?subsidiary .\n          #  ?subsidiary rdfs:label ?subsidiaryLabel .\n\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE], fr\". }\n}"
}, qr = {
	"http://www.wikidata.org/entity/Q15936437": E.schema("CollegeOrUniversity"),
	"http://www.wikidata.org/entity/Q1664720": E.schema("EducationalOrganization"),
	"http://www.wikidata.org/entity/Q43229": E.schema("Organization"),
	"http://www.wikidata.org/entity/Q3918": E.schema("CollegeOrUniversity"),
	"http://www.wikidata.org/entity/Q170584": E.schema("Project"),
	"http://www.wikidata.org/entity/Q327333": E.schema("GovernmentOrganization"),
	"http://www.wikidata.org/entity/Q2221906": E.schema("Place"),
	"http://www.wikidata.org/entity/Q167037": E.schema("Corporation")
}, Jr = {
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
function Yr(e) {
	let t = e.type.toLowerCase();
	if (t === "uri" || t === "iri") return A.sym(e.value);
	if (t === "literal") return e["xml:lang"] ? new d(e.value, e["xml:lang"]) : new d(e.value);
	throw Error(`bindingToTerm: Unexpected type "${e.type}" in sparql binding}`);
}
function Xr(e, t, n, r, i = Jr) {
	let a = {};
	P(`loadFromBindings:  subject: ${t}`), P(`                       doc: ${r}`), n.forEach((e) => {
		for (let t in e) {
			let n = e[t], r = JSON.stringify(n);
			a[t] = a[t] || /* @__PURE__ */ new Set(), a[t].add(r);
		}
	});
	for (let n in a) {
		let o = a[n];
		P(`    results ${n} -> ${o}`), o.forEach((a) => {
			let o = JSON.parse(a), { type: s, value: c } = o, l;
			if (s === "uri") l = e.sym(c);
			else if (s === "literal") l = new d(c, o.language, o.datatype);
			else throw Error(`loadFromBindings:  unexpected type: ${s}`);
			if (n === "type") qr[c] ? l = qr[c] : F("Unmapped Wikidata Class: " + c);
			else if (n === "coordinates") {
				P("         @@@ hey a point: " + c);
				let n = /.*\(([-0-9.-]*) ([-0-9.-]*)\)/.exec(c);
				if (n) {
					let i = E.xsd("float"), a = new d(n[1], null, i), o = new d(n[2], null, i);
					e.add(t, E.schema("longitude"), o, r), e.add(t, E.schema("latitude"), a, r);
				} else P("Bad coordinates syntax: " + c);
			} else {
				let a = i[n] || E.schema(n);
				e.add(t, a, l, r), P(`  public data ${a} ${l}.`);
			}
		});
	}
}
function Zr(e) {
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
async function Qr(e, t, n) {
	if (!n.searchByNameURI) throw Error("Missing queryTarget.searchByNameURI on queryESCODataByName");
	let r = n.limit || 200, i = n.searchByNameURI.replace("$(name)", e).replace("$(limit)", "" + r).replace("$(targetClass)", t.toNT());
	P("Querying ESCO data - uri: " + i);
	let a = (await A.fetcher?.webOperation("GET", i, Vr))?.responseText || "";
	if (P("    Query result  text" + a.slice(0, 500) + "..."), a.length === 0) throw Error("Wot no text back from ESCO query " + i);
	let o = JSON.parse(a);
	return P("    ESCO Query result JSON" + JSON.stringify(o, null, 4).slice(0, 500) + "..."), Zr(o);
}
function $r(e) {
	let t = e.indexOf("SPARQL-QUERY");
	if (t < 0) return e;
	F("  ### Fixing JSON with wikidata error code injection " + e.slice(t, t + 200));
	let n = e.lastIndexOf("}, {");
	return e.slice(0, n) + " } ] } } ";
}
async function ei(e, t, n, r) {
	function i(n) {
		let i = r.limit || 200;
		return n.replace("$(name)", e).replace("$(limit)", "" + i).replace("$(language)", a).replace("$(targetClass)", t.toNT());
	}
	if (!t) throw Error("queryPublicDataByName: No class provided");
	let a = (await Fr() || Mr)[0] || "en";
	if (r.searchByNameQuery) {
		let e = i(r.searchByNameQuery);
		return P("Querying public data - sparql: " + e), ti(e, r);
	} else if (r.searchByNameURI) {
		let e = i(r.searchByNameURI), t;
		try {
			t = await A.fetcher?.webOperation("GET", e, Vr);
		} catch (t) {
			throw Error(`Exception when trying to fetch ${e} \n ${t}`);
		}
		let n = t.responseText || "";
		if (t.status !== 200) throw Error(`HTTP error status ${t.status} trying to fetch ${e} `);
		if (P("    Query result  text" + n.slice(0, 500) + "..."), n.length === 0) throw Error("queryPublicDataByName: No text back from public data query " + e);
		let a = $r(n), o = JSON.parse(a);
		if (P("    API Query result JSON" + JSON.stringify(o, null, 4).slice(0, 500) + "..."), o._embedded) return P("      Looks like ESCO"), Zr(o);
		throw alert("Code me: unrecognized API return format"), Error(`*** Need to add code to parse unrecognized API JSON return\n${JSON.stringify(o, null, 4)}`);
	} else throw Error("Query source must have either rest API or SPARQL endpoint.");
}
async function ti(e, t) {
	if (!t.endpoint) throw Error("Missing queryTarget.endpoint required for queryPublicDataSelect");
	let n = new URL(t.endpoint);
	n.searchParams.append("query", e);
	let r = n.href;
	P(" queryPublicDataSelect uri: " + r);
	let i = new Headers();
	i.append("Accept", "application/json");
	let a = {
		credentials: "omit",
		headers: i
	}, o = (await A.fetcher?.webOperation("GET", r, a))?.responseText || "";
	if (o.length === 0) throw Error("No text back from query " + r);
	let s = $r(o), c = JSON.parse(s);
	return P("    Query result JSON" + JSON.stringify(c, null, 4).slice(0, 100) + "..."), c.results.bindings;
}
async function ni(e, t, n) {
	if (P("queryPublicDataConstruct: sparql:", e), !n.endpoint) throw Error("Missing queryTarget.endpoint required for queryPublicDataConstruct");
	let r = new URL(n.endpoint);
	r.searchParams.append("query", e);
	let i = r.href;
	P(" queryPublicDataConstruct uri: " + i);
	let a = new Headers();
	a.append("Accept", "text/turtle");
	let o = {
		credentials: "omit",
		headers: a
	}, s = (await A.fetcher?.webOperation("GET", i, o))?.responseText || "No response text?";
	if (P("    queryPublicDataConstruct result text:" + (s.length > 500 ? s.slice(0, 200) + " ... " + s.slice(-200) : s)), s.length === 0) throw Error("queryPublicDataConstruct: No text back from construct query:" + i);
	m(s, A, t.uri, "text/turtle");
}
async function ri(e, t, n) {
	if (n.uri.startsWith("https://dbpedia.org/resource/")) return si(e, t, n);
	if (n.uri.match(/^https?:\/\/www\.wikidata\.org\/entity\/.*/)) await ii(e, t, n);
	else {
		let t = n.uri.startsWith("http:") ? e.sym("https:" + n.uri.slice(5)) : n, r = new Headers();
		return r.append("Accept", "text/turtle"), e.fetcher.load(t, {
			credentials: "omit",
			headers: r
		});
	}
}
async function ii(e, t, n) {
	await ni(Br.replace(/wd:Q49108/g, n.toNT()), n, Kr), P("getWikidataDetails: loaded.", n);
}
async function ai(e, t, n) {
	Xr(e, n, await ti("select distinct *  where {\n  optional { $(subject)  wdt:P31  ?targetClass } # instance of\n  optional { $(subject)  wdt:P154  ?logo }\n  optional { $(subject)  wdt:P158  ?sealImage }\n# optional { $(subject)  wdt:P159  ?headquartersLocation }\n\noptional { $(subject)  wdt:P17  ?country }\noptional { $(subject)  wdt:P18  ?image }\noptional { $(subject)  wdt:P1813  ?shortName }\n\noptional { $(subject)  wdt:P355  ?subsidiary }\n# SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\" }\n}".replace(Rr, n.toNT()), Kr), n.doc());
}
async function oi(e, t, n) {
	let r = "select distinct *  where {\n\n  $(subject) wdt:P276 ?location .\n\n  optional { ?location  wdt:P2044  ?elevation }\n  optional { ?location  wdt:P131  ?region }\n  optional { ?location wdt:P625 ?coordinates }\noptional {  ?location  wdt:P17  ?country }\n\n# SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\" }\n}".replace(Rr, n.toNT());
	P(" location query sparql:" + r);
	let i = await ti(r, Kr);
	P(" location query bindings:", i), Xr(e, n, i, n.doc());
}
async function si(e, t, n) {
	Xr(e, n, await ti(`select distinct ?city, ?state, ?country, ?homepage, ?logo, ?lat, ?long,  WHERE {
    OPTIONAL { <${n}> <http://dbpedia.org/ontology/city> ?city }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/state> ?state }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/country> ?country }
    OPTIONAL { ${n} foaf:homepage ?homepage }
    OPTIONAL { ${n} foaf:lat ?lat; foaf:long ?long }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/country> ?country }
   }`, Ur), n.doc()), P("Finished getDbpediaDetails.");
}
//#endregion
//#region src/widgets/forms/autocomplete/autocompletePicker.ts
var ci = 4, li = 20, ui = 40;
function J(e, t) {
	e.style.display = t ? "" : "none";
}
async function di(e, t, n, r) {
	function i(t) {
		let n = E.appendChild(e.createElement("tr"));
		P(t);
		let r = Error(t);
		n.appendChild(H(e, r, "pink")), V.setStyle(n, "autocompleteRowStyle"), n.style.padding = "1em";
	}
	function a(e, n) {
		P("Auto complete: finish! " + e), e.termType === "Literal" && t.queryParams.objectURIBase && (e = A.sym(t.queryParams.objectURIBase.value + e.value)), u(), r(e, n);
	}
	async function o(e, t) {
		if (n.acceptButton) {
			n.acceptButton.disbaled = !1, J(n.acceptButton, !0), O.value = t.value, w = t, T = e, P("Auto complete: name: " + t), P("Auto complete: waiting for accept " + e), u();
			return;
		}
		J(n.cancelButton, !0), a(e, t);
	}
	async function s(e) {
		w && O.value === w.value && a(T, w);
	}
	async function c(e) {
		P("Auto complete: Canceled by user! "), t.permanent ? h() : C.parentNode && C.parentNode.removeChild(C);
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
			r = await ei(e, g, n || Mr, t.queryParams);
		} catch (e) {
			i("Error querying db of organizations: " + e), y = !1;
			return;
		}
		return v = r.length < 200, x = v ? e : void 0, u(), Ir(r, n);
	}
	function p(e, t) {
		return t.filter((t) => l(e, t.name.value));
	}
	async function m() {
		function t(t) {
			let n = e.createElement("tr");
			V.setStyle(n, "autocompleteRowStyle"), n.setAttribute("style", "padding: 0.3em;"), n.style.color = b ? "#080" : "#088", n.textContent = t.name.value;
			let r = Yr(t.subject), i = Yr(t.name);
			return n.addEventListener("click", async (e) => {
				P("       click row textContent: " + n.textContent), P("       click name: " + i.value), r && i && o(r, i);
			}), n;
		}
		function n(e, t) {
			return t.name.value > e.name.value ? 1 : t.name.name < e.name.value ? -1 : 0;
		}
		if (y) {
			P(`Ignoring "${O.value}" because of lock `);
			return;
		}
		P(`Setting lock at "${O.value}"`), y = !0;
		let r = await Fr(), i = O.value.trim().toLowerCase();
		if (i.length < ci) u(), S = li;
		else {
			(!b || !x || !i.startsWith(x)) && (P(`   Querying database at "${i}" cf last "${x}".`), _ = await f(i, r));
			let e = p(i, _);
			v && e.length <= ui && (S = e.length), b = v && e.length <= S, P(` Filter:"${i}" lastBindings: ${_.length}, slimmed to ${e.length}; rows: ${S}, Enough? ${v}, All displayed? ${b}`);
			let a = e.slice(0, S);
			a.sort(n), u();
			for (let e of a) E.appendChild(t(e));
			e.length === 1 && o(Yr(e[0].subject), Yr(e[0].name));
		}
		y = !1;
	}
	function h() {
		t.currentObject ? (O.value = t.currentName ? t.currentName.value : "??? wot no name for " + t.currentObject, w = t.currentName, x = t.currentName ? t.currentName.value : void 0, T = t.currentObject) : (O.value = "", x = void 0, T = void 0), n.deleteButton && J(n.deleteButton, !!t.currentObject), n.acceptButton && J(n.acceptButton, !1), n.editButton && J(n.editButton, !0), n.cancelButton && J(n.cancelButton, !1), y = !1, u();
	}
	let g = t.targetClass;
	if (!g) throw Error("renderAutoComplete: missing targetClass");
	n.acceptButton && n.acceptButton.addEventListener("click", s, !1), n.cancelButton && n.cancelButton.addEventListener("click", c, !1);
	let _, v = !1, y = !1, b = !1, x, S = li, C = e.createElement("div"), w, T, E = C.appendChild(e.createElement("table"));
	E.setAttribute("data-testid", "autocomplete-table"), E.setAttribute("style", "max-width: 30em; margin: 0.5em;");
	let D = E.appendChild(e.createElement("tr"));
	V.setStyle(D, "autocompleteRowStyle");
	let O = D.appendChild(e.createElement("td")).appendChild(e.createElement("input"));
	O.setAttribute("type", "text"), h();
	let k = t.size || B.textInputSize || 20;
	O.setAttribute("size", k), O.setAttribute("data-testid", "autocomplete-input");
	let ee = V.textInputStyle || "border: 0.1em solid #444; border-radius: 0.5em; width: 100%; font-size: 100%; padding: 0.1em 0.6em";
	return O.setAttribute("style", ee), O.addEventListener("keyup", function(e) {
		e.keyCode === 13 && s(e);
	}, !1), O.addEventListener("input", d), C;
}
//#endregion
//#region src/widgets/forms/autocomplete/autocompleteBar.ts
var fi = "Solid ID", pi = U.iconBase + "noun_34653_green.svg", mi = U.iconBase + "noun_Search_875351.svg", hi = U.iconBase + "noun_253504.svg";
async function gi(e, t, n, r, i, a) {
	async function o(e, t) {
		return r.permanent ? (J(g, !0), J(f, !1), J(p, !1)) : c(), i(e, t);
	}
	async function s(n) {
		let r = await Jn(e, A, x, E.vcard("url"), void 0, fi);
		if (r) return i(t, r);
	}
	function c() {
		b &&= (x.removeChild(b), void 0);
	}
	async function l() {
		b = e.createElement("div"), b.setAttribute("style", "display: flex; flex-flow: wrap;"), b.appendChild(await di(e, r, y, o)), b.appendChild(f), b.appendChild(p), b.appendChild(g), b.appendChild(m), x.appendChild(b);
	}
	async function u(e) {
		b ? (x.removeChild(b), b = void 0) : await l();
	}
	async function d(e) {
		for (let n of e) await i(t, n);
	}
	let f = qn(e);
	f.setAttribute("data-testid", "accept-button");
	let p = Kn(e);
	p.setAttribute("data-testid", "cancel-button");
	let m = e.createElement("div"), h = Gn(e, m, r.targetClass ? N(r.targetClass) : "item", a);
	h.setAttribute("data-testid", "delete-button");
	let g = G(e, hi, "Edit", (e) => {
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
	return x.style.display = "flex", x.style.flexDirection = "row", (r.permanent || r.currentObject) && await l(), n.editable && (x.style.width = "100%", n.manualURIEntry && an(x.appendChild(G(e, pi, n.idNoun, s)), d, void 0), n.dbLookup && !r.currentObject && !r.permanent && x.appendChild(G(e, mi, n.idNoun, u))), v(), x;
}
//#endregion
//#region src/widgets/forms/autocomplete/autocompleteField.ts
function _i(e, t, n, r, i, a, s) {
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
	p.setAttribute("class", "formFieldName"), p.setAttribute("style", V.formFieldNameBoxStyle), f.appendChild(p);
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
	return p.appendChild(Or(e, h, i)), gi(e, r, {
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
var vi = class {
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
}, yi = "✓", bi = "✕", xi = "-", Si = A;
K[E.ui("AutocompleteField").uri] = _i;
function Ci(e, t, n, r, i, a, o) {
	let s = a.children;
	for (let c = 0; c < o.length; c++) {
		let l = o[c];
		if (Sr(l) === E.ui("Options").uri) {
			let o = Cr(e, l)(e, null, t, n, l, r, i);
			P("Refreshing Options field by replacing it."), a.insertBefore(o, s[c]), a.removeChild(s[c + 1]);
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
	let d = i.doc ? i.doc() : null, f = Si.any(i, c("weight"), null, d), p = f ? Number(f.value) : 1;
	if (p > 3 || p < 0) return s.appendChild(H(e, `Form Group weight ${p} should be 0-3`));
	s.setAttribute("style", V.formGroupStyle[p]), s.style.display = "flex", s.style.flexDirection = "column", s.class = "form-weight-" + p;
	let m = Si.any(i, c("parts"), null, d), h;
	if (m ? h = m.elements : (m = Si.each(i, c("part"), null, d), h = ji(m)), !m) return s.appendChild(H(e, "No parts to form! "));
	for (let t = 0; t < h.length; t++) {
		let i = h[t], c = Cr(e, i);
		s.appendChild(c(e, null, u, r, i, a, function(t, i) {
			t && i && i.widget && i.widget === "select" && Ci(e, n, r, a, o, s, h), o(t, {
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
			if (t) Di(e, c, n, r, t, a, o);
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
				g.appendChild(H(e, n)), I(n);
			}
			ne();
		}
	}
	function f(t) {
		async function i() {
			if (b) {
				P("pre delete: " + l(O.elements));
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
			P("pre move: " + l(O.elements));
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
			P(`Item done callback for item ${t.toString()}`), e || I("  Item done callback: Error: " + n), c(e, n);
		}
		M("Multiple: render object: " + t);
		let d = Cr(e, T)(e, null, n, t, T, s, u);
		if (d.subject = t, m.updater.editable(s.uri) && (Gn(e, d, C, i), b)) {
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
	C ||= N(x);
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
		P("save list: " + l(O.elements)), ee();
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
		nt(D, e, f);
	}
	D.refresh = ne, ne();
	async function j() {
		let e = w - k.length;
		if (e > 0) {
			for (let t = 0; t < e; t++) P("Adding extra: min " + w), await d();
			await te();
		}
	}
	return j().then(() => {
		P(" Multiple render: async stuff ok");
	}, (e) => {
		I(" Multiple render: async stuff fails. #### ", e);
	}), _;
}, K[E.ui("PhoneField").uri] = q, K[E.ui("EmailField").uri] = q, K[E.ui("ColorField").uri] = q, K[E.ui("DateField").uri] = q, K[E.ui("DateTimeField").uri] = q, K[E.ui("TimeField").uri] = q, K[E.ui("NumericField").uri] = q, K[E.ui("IntegerField").uri] = q, K[E.ui("DecimalField").uri] = q, K[E.ui("FloatField").uri] = q, K[E.ui("TextField").uri] = q, K[E.ui("SingleLineTextField").uri] = q, K[E.ui("NamedNodeURIField").uri] = q, K[E.ui("MultiLineTextField").uri] = function(e, t, n, r, i, a, o) {
	let s = E.ui, c = A, l = i.doc ? i.doc() : null, u = c.any(i, s("property"));
	if (!u) return H(e, "No property to text field: " + i);
	let d = e.createElement("div");
	d.style.display = "flex", d.style.flexDirection = "row";
	let f = d.appendChild(e.createElement("div"));
	f.style.width = B.formFieldNameBoxWidth;
	let p = d.appendChild(e.createElement("div"));
	f.appendChild(Or(e, u, i)), a = kr(r, u, a);
	let m = c.anyJS(r, u, null, a) || "", h = c.updater.editable(a.uri), g = i && c.anyJS(i, E.ui("suppressEmptyUneditable"), null, l);
	!h && g && m === "" && (d.style.display = "none");
	let _ = Fi(e, c, r, u, a, o);
	return p.appendChild(_), t && t.appendChild(d), d;
};
function wi(e, t, n, r, i, a, s, c) {
	let l = E.ui, u = A, d = u.any(i, l("property"));
	if (!d) {
		let n = H(e, "No property to boolean field: " + i);
		return t && t.appendChild(n), n;
	}
	let f = u.any(i, l("label"));
	f ||= N(d, !0), a = kr(r, d, a);
	let p = u.any(r, d);
	p === void 0 && (p = !1);
	let m = o(r, d, !0, a), h = o(r, d, !1, a), g = Bi(e, u, f, h, m, i, a, c);
	return t && t.appendChild(g), g;
}
K[E.ui("BooleanField").uri] = function(e, t, n, r, i, a, o) {
	return wi(e, t, n, r, i, a, o, !1);
}, K[E.ui("TristateField").uri] = function(e, t, n, r, i, a, o) {
	return wi(e, t, n, r, i, a, o, !0);
}, K[E.ui("Classifier").uri] = function(e, t, n, r, i, a, o) {
	let s = A, c = E.ui, l = s.any(i, c("category"));
	if (!l) return H(e, "No category for classifier: " + i);
	M("Classifier: dataDoc=" + a);
	let u = function(e, t) {
		return o(e || e, t);
	}, d = e.createElement("div");
	d.setAttribute("class", "classifierBox");
	let f = e.createElement("div");
	f.setAttribute("class", "formFieldName classifierBox-label"), f.appendChild(Or(e, l, i)), d.appendChild(f);
	let p = e.createElement("div");
	p.setAttribute("class", "formFieldValue classifierBox-selectBox");
	let m = zi(e, s, r, l, a, u);
	if (m && m.querySelectorAll) {
		let e = m.querySelectorAll("select");
		e.length && !s.updater.editable(a.uri) && e.forEach((e) => {
			e.readOnly = !0, e.style = V.textInputStyleUneditable;
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
	p.appendChild(Or(e, h, i));
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
		for (let n in Ui(l, g, e)) t.push(l.fromNT(n));
		if (g.sameTerm(E.rdfs("Class"))) for (d in ir()) t.push(l.sym(d));
		else if (g.sameTerm(E.rdf("Property"))) {
			for (d in n = ar(l), n.op) t.push(l.fromNT(d));
			for (d in n.dp) t.push(l.fromNT(d));
			y.disambiguate = !0;
		} else if (g.sameTerm(E.owl("ObjectProperty"))) {
			for (d in n = ar(l), n.op) t.push(l.fromNT(d));
			y.disambiguate = !0;
		} else if (g.sameTerm(E.owl("DatatypeProperty"))) {
			for (d in n = ar(l), n.dp) t.push(l.fromNT(d));
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
		if (n.push(t), n = Mi(n), C = Vi(e, m, l, r, h, n, t, g, y, a, s), m.innerHTML = "", m.appendChild(C), x) {
			let n = new vi({
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
					i.push(o(r, h, l.sym(n), a)), g && i.push(o(n, E.rdf("type"), l.sym(g), a)), v && Ti(e, m, {}, _(n), v, a, function(r, a) {
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
function Ti(e, t, n, r, i, a, o) {
	Cr(e, i)(e, t, n, r, i, a, o);
}
K[E.ui("Comment").uri] = K[E.ui("Heading").uri] = function(e, t, n, r, i, a, o) {
	let s = E.ui, c = A, l = c.any(i, s("contents"));
	l ||= "Error: No contents in comment field.";
	let u = i.doc ? i.doc() : null, d = br[Sr(i)] || {}, f = e.createElement("div");
	t && t.appendChild(f);
	let p = f.appendChild(e.createElement(d.element));
	p.textContent = l, Tr(p, i);
	let m = c.anyJS(i, E.ui("suppressIfUneditable"), null, u), h = c.updater.editable(a.uri);
	return m && !h && (f.style.display = "none"), f;
};
function Ei(e, t, n, r, i) {
	let a = e.createElement("button");
	return a.setAttribute("type", "button"), a.innerHTML = "Edit " + N(E.ui("Form")), a.addEventListener("click", function(o) {
		Di(e, t, {}, n, E.ui("FormForm"), r, i).setAttribute("style", E.ui("FormForm").sameTerm(n) ? "background-color: #fee;" : "background-color: #ffffe7;"), a.parentNode.removeChild(a);
	}, !0), a;
}
function Di(e, t, n, r, i, a, o) {
	return Cr(e, i)(e, t, n, r, i, a, o);
}
function Oi(e, t) {
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
function ki(e, t, n) {
	let r = [e.sym(t)];
	for (; r.length > 0;) {
		let t = r.shift(), i = e.each(t, n);
		if (M("Lists for " + t + ", " + n + ": " + i.length), i.length !== 0) return i;
		let a = e.each(t, E.rdfs("subClassOf"));
		for (let e = 0; e < a.length; e++) r.push(a[e]), M("findClosest: add super: " + a[e]);
	}
	return [];
}
function Ai(e) {
	let t = A;
	M("formsFor: subject=" + e);
	let n = t.findTypeURIs(e), r;
	for (r in n) M("   type: " + r);
	let i = t.bottomTypeURIs(n), a = [];
	for (let e in i) M("candidatesFor: trying bottom type =" + e), a = a.concat(ki(t, e, E.ui("creationForm"))), a = a.concat(ki(t, e, E.ui("annotationForm")));
	return a;
}
function ji(e) {
	let t = e.map(function(e) {
		return [Si.any(e, E.ui("sequence")) || 9999, e];
	});
	return t.sort(function(e, t) {
		return e[0] - t[0];
	}), t.map(function(e) {
		return e[1];
	});
}
function Mi(e) {
	let t = e.map(function(e) {
		return [N(e).toLowerCase(), e];
	});
	return t.sort(), t.map(function(e) {
		return e[1];
	});
}
function Ni(e, t, n, r, i, a, o, s) {
	let c = e.createElement("button");
	return c.setAttribute("type", "button"), c.innerHTML = "New " + N(i), c.addEventListener("click", function(l) {
		c.parentNode.appendChild(Pi(e, t, n, r, i, a, o, s));
	}, !1), c;
}
function Pi(e, t, n, r, i, a, s, c) {
	let l = e.createElement("form");
	if (!a) {
		let n = ki(t, i.uri, E.ui("creationForm"));
		if (n.length === 0) {
			let t = l.appendChild(e.createElement("p"));
			t.textContent = "I am sorry, you need to provide information about a " + N(i) + " but I don't know enough information about those to ask you.";
			let n = l.appendChild(e.createElement("button"));
			return n.setAttribute("type", "button"), n.setAttribute("style", "float: right;"), n.innerHTML = "Goto " + N(i), n.addEventListener("click", function(t) {
				e.outlineManager.GotoSubject(i, !0, void 0, !0, void 0);
			}, !1), l;
		}
		M("lists[0] is " + n[0]), a = n[0];
	}
	M("form is " + a), l.setAttribute("style", `border: 0.05em solid ${B.formBorderColor}; color: ${B.formBorderColor}`), l.innerHTML = "<h3>New " + N(i) + "</h3>";
	let u = Cr(e, a), d = X(s), f = !1, p = function(a, u) {
		if (!a) return c(a, u);
		let p = [];
		n && !t.holds(n, r, d, s) && p.push(o(n, r, d, s)), n && !t.holds(d, E.rdf("type"), i, s) && p.push(o(d, E.rdf("type"), i, s)), p.length ? t.updater.update([], p, m) : c(!0, u), f ||= l.appendChild(or(e, d));
	};
	function m(e, t, n) {
		return c(t, n);
	}
	return Me("paneUtils Object is " + d), sr(e, u(e, l, {}, d, a, s, p)).setAttribute("style", "float: right;"), l.AJAR_subject = d, l;
}
function Fi(e, t, n, r, i, a) {
	let s = e.createElement("div"), c = t.anyJS(n, r, null, i) || "", l = e.createElement("textarea");
	s.appendChild(l), l.rows = c ? c.split("\n").length + 2 : 2, l.cols = 80, l.setAttribute("style", V.multilineTextInputStyle), c === null ? l.select() : l.value = c, s.refresh = function() {
		let e = t.any(n, r, null, i);
		e && e.value !== l.value && (l.value = e.value);
	};
	function u(c) {
		f.disabled = !0, f.setAttribute("style", "visibility: hidden; float: right;"), l.disabled = !0, l.style.color = B.textInputColorPending;
		let u = t.statementsMatching(n, r, null, i), d = o(n, r, l.value, i);
		t.updater.update(u, d, function(t, n, r) {
			n ? (l.style.color = B.textInputColor, l.disabled = !1) : s.appendChild(H(e, "Error (while saving change to " + i.uri + "): " + r)), a && a(n, r);
		});
	}
	let d = t.updater.editable(i.uri), f;
	return d ? (f = qn(e, u), f.disabled = !0, f.style.visibility = "hidden", f.style.float = "right", s.appendChild(f), l.addEventListener("keyup", function(e) {
		l.style.color = "green", f && (f.disabled = !1, f.style.visibility = "");
	}, !0), l.addEventListener("change", u, !0)) : (l.disabled = !0, l.style.backgroundColor = B.textInputBackgroundColorUneditable), s;
}
function Ii(e, t, n, r, i, a, s, c) {
	M("Select list length now " + i.length);
	let l = 0, u = {}, d = t.updater.editable(s.uri);
	for (let e = 0; e < i.length; e++) {
		let t = i[e];
		t.uri || F(`makeSelectForClassifierOptions: option does not have an uri: ${t}, with predicate: ${r}`), !(!t.uri || t.uri in u) && (u[t.uri] = !0, l++);
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
					let i = Pi(e, t, n, r, a.mintClass, null, s, function(e, t) {
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
		Me("makeSelectForClassifierOptions: data doc = " + s), t.updater.update(l, u, function(t, n, r) {
			if (f = p(), n) h.disabled = !1, m && Cr(e, a.subForm)(e, h.parentNode, {}, m, a.subForm, s, _);
			else return h.parentNode.appendChild(H(e, "Error updating data in select: " + r));
			c && c(n, {
				widget: "select",
				event: "change"
			});
		});
	}, h = e.createElement("select");
	h.setAttribute("style", V.formSelectStyle), a.multiple && h.setAttribute("multiple", "true"), h.currentURI = null, h.refresh = function() {
		f = p();
		for (let e = 0; e < h.children.length; e++) {
			let t = h.children[e];
			t.AJAR_uri && (t.selected = t.AJAR_uri in f);
		}
		h.disabled = !1;
	};
	for (let n in u) {
		let r = t.sym(n), i = e.createElement("option");
		a.disambiguate ? i.appendChild(e.createTextNode(gt(r, !0))) : i.appendChild(e.createTextNode(N(r, !0)));
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
function Li(e, t, n, r, i, a, s, c) {
	M("Select list length now " + i.length);
	let l = 0, u = {}, d = t.updater.editable(s.uri);
	for (let e = 0; e < i.length; e++) {
		let t = i[e];
		t.uri || F(`makeSelectForOptions: option does not have an uri: ${t}, with predicate: ${r}`), !(!t.uri || t.uri in u) && (u[t.uri] = !0, l++);
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
		Me("selectForOptions: data doc = " + s), t.updater.update(a, l, function(t, n, r) {
			if (f = p(), n) h.disabled = !1;
			else return h.parentNode.appendChild(H(e, "Error updating data in select: " + r));
			c && c(n, {
				widget: "select",
				event: "change"
			});
		});
	}, h = e.createElement("select");
	h.setAttribute("style", V.formSelectStyle), h.currentURI = null, h.refresh = function() {
		f = p();
		for (let e = 0; e < h.children.length; e++) {
			let t = h.children[e];
			t.AJAR_uri && (t.selected = t.AJAR_uri in f);
		}
		h.disabled = !1;
	};
	for (let n in u) {
		let r = t.sym(n), i = e.createElement("option");
		a.disambiguate ? i.appendChild(e.createTextNode(gt(r, !0))) : i.appendChild(e.createTextNode(N(r, !0)));
		let o = t.any(r, t.sym("http://www.w3.org/ns/ui#backgroundColor"));
		o && i.setAttribute("style", "background-color: " + o.value + "; "), i.AJAR_uri = n, n in f && (i.setAttribute("selected", "true"), h.currentURI = n), h.appendChild(i);
	}
	if (!h.currentURI) {
		let t = e.createElement("option");
		t.appendChild(e.createTextNode(a.nullLabel)), h.insertBefore(t, h.firstChild), t.selected = !0;
	}
	return d && h.addEventListener("change", m, !1), h;
}
function Ri(e, t, n, r, i, a) {
	let o = t.any(r, E.owl("disjointUnionOf")), s, c = !1;
	return o ? s = o.elements : (s = t.each(void 0, E.rdfs("subClassOf"), r), c = !0), M("Select list length " + s.length), s.length === 0 ? H(e, "Can't do " + (c ? "multiple " : "") + "selector with no subclasses of category: " + r) : s.length === 1 ? H(e, "Can't do " + (c ? "multiple " : "") + "selector with only 1 subclass of category: " + r + ":" + s[1]) : Ii(e, t, n, E.rdf("type"), s, {
		multiple: c,
		nullLabel: "* Select type *"
	}, i, a);
}
function zi(e, t, n, r, i, a) {
	function o() {
		c &&= (s.removeChild(c), null), u.currentURI && t.any(t.sym(u.currentURI), E.owl("disjointUnionOf")) && (c = zi(e, t, n, t.sym(u.currentURI), i, a), u.subSelect = c.firstChild, u.subSelect.superSelect = u, s.appendChild(c));
	}
	let s = e.createElement("span"), c = null;
	function l(e, t) {
		e && o(), a(e, t);
	}
	let u = Ri(e, t, n, r, i, l);
	return s.appendChild(u), o(), s;
}
function Bi(e, t, n, r, i, a, o, s) {
	let c = e.createElement("div"), l = Dr(e, t, c, a, n), u = t.updater.editable(o.uri), d = e.createElement("button"), f = d;
	d.style = V.checkboxInputStyle, l.appendChild(d);
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
			true: yi,
			false: s ? bi : " ",
			null: xi
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
		P(`  Deleting  ${u}`), P(`  Inserting ${p}`);
		try {
			let e = t.updater.update(u, p, function(e, n, r) {
				o() && (n ? (f.style.color = "#000", d.state = d.newState, d.textContent = {
					true: yi,
					false: bi,
					null: xi
				}[d.state]) : (u.why && t.holds(u.subject, u.predicate, u.object, u.why) && P(" @@@@@ weird if 409 - does hold statement"), l(r)));
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
function Vi(e, t, n, r, i, a, s, c, l, u, d) {
	let f = {}, p = n.updater.editable(u.uri);
	for (let e = 0; e < a.length; e++) {
		let t = a[e];
		!t.uri || t.uri in f || (f[t.uri] = !0);
	}
	if (Object.keys(f).length === 0 && !l.mint) return H(e, "Can't do selector with no options, subject= " + r + " property = " + i + ".");
	M("makeSelectForChoice: dataDoc=" + u);
	function m() {
		let e = "--- choice ---";
		return i && i.termType !== "BlankNode" && (e = "* Select for property: " + N(i) + " *"), r && r.termType !== "BlankNode" && (e = "* Select for " + N(r, !0) + " *"), e;
	}
	function h() {
		let t = e.createElement("option");
		return t.appendChild(e.createTextNode(m())), t.disabled = !0, t.value = !0, t.hidden = !0, t.selected = !0, t;
	}
	let g = function(e) {
		t.removeChild(t.lastChild), v.refresh();
	}, v = e.createElement("select");
	v.setAttribute("style", V.formSelectStyle), v.setAttribute("id", "formSelect"), v.currentURI = null;
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
		for (let e of m) Hi(e, s) || f(_(e));
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
					let t = Pi(e, n, r, i, c, l.subForm, u, function(e, t) {
						e || d(e, t, { change: "new" });
					});
					v.parentNode.appendChild(t), f = t.AJAR_subject;
				} else f = X(u);
				a.push(o(r, i, n.sym(f), u)), c && a.push(o(f, E.rdf("type"), n.sym(c), u)), l.mintStatementsFun && (a = a.concat(l.mintStatementsFun(f))), v.currentURI = f;
			}
			p.AJAR_uri && (p.selected && Hi(p.AJAR_uri, s) && (v.currentURI = p.AJAR_uri), Hi(p.AJAR_uri, s) || p.removeAttribute("selected"), Hi(p.AJAR_uri, s) && p.setAttribute("selected", "true"));
		}
		Me("selectForOptions: data doc = " + u), v.currentURI && l.subForm && !l.multiSelect && Ti(e, t, {}, _(v.currentURI), l.subForm, u, function(r, i) {
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
		a = l.disambiguate ? gt(i, !0) : N(i, !0), r.appendChild(e.createTextNode(a)), r.setAttribute("value", t);
		let o = n.any(i, n.sym("http://www.w3.org/ns/ui#backgroundColor"));
		return o && r.setAttribute("style", "background-color: " + o.value + "; "), r.AJAR_uri = t, Hi(i.value, s) && r.setAttribute("selected", "true"), r;
	}
	return p && v.addEventListener("change", g, !1), v;
}
function Hi(e, t) {
	let n;
	for (n = 0; n < t.length; n++) if (t[n] === e) return !0;
	return !1;
}
function Ui(e, t, n) {
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
var Wi = /* @__PURE__ */ r({
	Group: () => fn,
	GroupBuilder: () => pn,
	GroupPicker: () => dn,
	PeoplePicker: () => un,
	Person: () => mn,
	addStyleSheet: () => hr,
	allClassURIs: () => ir,
	appendForm: () => Di,
	askName: () => Jn,
	attachmentList: () => tr,
	basicField: () => q,
	buildCheckboxForm: () => Bi,
	button: () => G,
	cancelButton: () => Kn,
	clearElement: () => kn,
	complain: () => On,
	continueButton: () => qn,
	createLinkDiv: () => Qn,
	createLinkForURI: () => Cn,
	createNameDiv: () => Zn,
	defaultAnnotationStore: () => rr,
	deleteButtonWithCheck: () => Gn,
	editFormButton: () => Ei,
	errorMessageBlock: () => H,
	extractLogURI: () => An,
	faviconOrDefault: () => Un,
	field: () => K,
	fieldFunction: () => Cr,
	fieldLabel: () => Or,
	fieldParams: () => br,
	fieldStore: () => kr,
	fileUploadButtonDiv: () => yr,
	findClosest: () => ki,
	findImage: () => Bn,
	findImageFromURI: () => zn,
	formatDateTime: () => Mn,
	formsFor: () => Ai,
	iconForClass: () => Ln,
	imagesOf: () => In,
	index: () => ur,
	isAudio: () => gr,
	isImage: () => vr,
	isVideo: () => _r,
	linkButton: () => or,
	linkIcon: () => Sn,
	makeDescription: () => Fi,
	makeDraggable: () => on,
	makeDropTarget: () => an,
	makeSelectForCategory: () => Ri,
	makeSelectForChoice: () => Vi,
	makeSelectForClassifierOptions: () => Ii,
	makeSelectForNestedCategory: () => zi,
	makeSelectForOptions: () => Li,
	mostSpecificClassURI: () => Sr,
	newButton: () => Ni,
	newThing: () => X,
	openHrefInOutlineMode: () => nr,
	personTR: () => Yn,
	promptForNew: () => Pi,
	propertiesForClass: () => Oi,
	propertyTriage: () => ar,
	publicData: () => Lr,
	refreshTree: () => er,
	removeButton: () => sr,
	renderAsDiv: () => $n,
	renderAsRow: () => Xn,
	renderAutoComplete: () => di,
	renderAutocompleteControl: () => gi,
	renderNameValuePair: () => Dr,
	selectorPanel: () => cr,
	selectorPanelRefresh: () => lr,
	setImage: () => Hn,
	setName: () => Fn,
	setVisible: () => J,
	shortDate: () => jn,
	shortTime: () => Pn,
	sortByLabel: () => Mi,
	sortBySequence: () => ji,
	timestamp: () => Nn,
	uploadFiles: () => sn
}), Gi = {
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
function Ki(e) {
	this.config = e || Gi;
}
Ki.prototype.listen = function() {
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
}, Ki.prototype.signup = function(e) {
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
var qi = /* @__PURE__ */ r({
	ensureLoadedPreferences: () => ra,
	ensureLoadedProfile: () => ia,
	ensureLoggedIn: () => na,
	filterAvailablePanes: () => ga,
	findAppInstances: () => aa,
	getUserRoles: () => ha,
	loginStatusBox: () => fa,
	newAppInstance: () => ma,
	registrationControl: () => sa,
	registrationList: () => la,
	renderScopeHeadingRow: () => ca,
	renderSignInPopup: () => da,
	scopeLabel: () => oa,
	selectWorkspace: () => pa
}), Ji = w.store, { loadPreferences: Yi, loadProfile: Xi } = w.profile, { getScopedAppInstances: Zi, getRegistrations: Qi, loadAllTypeIndexes: $i, getScopedAppsFromIndex: ea, deleteTypeIndexRegistration: ta } = w.typeIndex;
function na(e) {
	let t = S.currentUser();
	return t ? (S.saveUser(t, e), Promise.resolve(e)) : new Promise((t) => {
		S.checkUser().then((n) => {
			if (n) return P(`logIn: Already logged in as ${n}`), t(e);
			if (!e.div || !e.dom) return t(e);
			let r = fa(e.dom, (n) => {
				S.saveUser(n, e), t(e);
			});
			e.div.appendChild(r);
		});
	});
}
async function ra(e) {
	if (e.preferencesFile) return Promise.resolve(e);
	try {
		e = await ia(e);
		let t = await Yi(e.me);
		e.preferencesFile = t;
	} catch (t) {
		let n;
		if (t instanceof ne) n = "Oops — you are not authenticated (properly logged in), so SolidOS cannot read your preferences file. Try logging out and then logging back in.", Fe(n);
		else if (t instanceof te) return n = `Unauthorized: Assuming preference file blocked for origin ${window.location.origin}`, e.preferencesFileError = n, e;
		else if (t instanceof b) return n = "You are not authorized to read your preference file. This may be because you are using an untrusted web app.", F(n), e;
		else if (t instanceof D) return n = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", F(n), e;
		else if (t instanceof ie) n = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", F(n);
		else if (t instanceof re) n = `Strange: Error ${t.status} trying to read your preference file.${t.message}`, Fe(n);
		else throw Error(`(via loadPrefs) ${t}`);
		e.preferencesFileError = n;
	}
	return e;
}
async function ia(e) {
	if (e.publicProfile) return e;
	try {
		let t = await na(e);
		if (!t.me) throw Error("Could not log in");
		e.publicProfile = await Xi(t.me);
	} catch (t) {
		throw e.div && e.dom && e.div.appendChild(H(e.dom, t.message)), Error(`Can't log in: ${t}`);
	}
	return e;
}
async function aa(e, t, n) {
	let r = e.me ? await Zi(t, e.me) : [];
	return n === !0 ? r = r.filter((e) => e.scope.label === "public") : n === !1 && (r = r.filter((e) => e.scope.label === "private")), e.instances = r.map((e) => e.instance), e;
}
function oa(e, t) {
	return `${e.me && e.me.sameTerm(t.agent) ? "" : N(t.agent) + " "}${t.label}`;
}
async function sa(e, t, n) {
	function r(e) {
		let r = Qi(t, n), i = r.length ? r[0] : X(e);
		return [o(i, E.solid("instance"), t, e), o(i, E.solid("forClass"), n, e)];
	}
	function i(t) {
		let n = r(t.index), i = `${oa(e, t)} link to this ${e.noun}`;
		return Bi(e.dom, w.store, i, null, n, d, t.index);
	}
	let a = e.dom;
	if (!a || !e.div) throw Error("registrationControl: need dom and div");
	let s = a.createElement("div");
	e.div.appendChild(s), e.me = S.currentUser();
	let c = e.me;
	if (!c) return s.innerHTML = "<p style=\"margin:2em;\">(Log in to save a link to this)</p>", e;
	let l;
	try {
		l = await $i(c);
	} catch (t) {
		let n;
		return e.div && e.preferencesFileError ? (n = "(Lists of stuff not available)", e.div.appendChild(a.createElement("p")).textContent = n) : e.div && (n = `registrationControl: Type indexes not available: ${t}`, e.div.appendChild(H(e.dom, t))), P(n), e;
	}
	s.innerHTML = "<table><tbody></tbody></table>", s.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;");
	let u = s.children[0].children[0], d = new de();
	for (let e of l) u.appendChild(a.createElement("tr")).appendChild(i(e));
	return e;
}
function ca(e, t, n) {
	let r = {
		private: "#fee",
		public: "#efe"
	}, { dom: i } = e, a = oa(e, n), o = i.createElement("tr"), s = o.appendChild(i.createElement("td"));
	s.setAttribute("colspan", "3"), s.style.backgoundColor = r[n.label] || "white";
	let c = s.appendChild(i.createElement("h3"));
	return c.textContent = a + " links", c.style.textAlign = "left", o;
}
async function la(e, t) {
	let n = e.dom, r = e.div, i = n.createElement("div");
	if (r.appendChild(i), e.me = S.currentUser(), !e.me) return i.innerHTML = "<p style=\"margin:2em;\">(Log in list your stuff)</p>", e;
	let a = await $i(e.me);
	i.innerHTML = "<table><tbody></tbody></table>", i.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid #eee 0.5em;");
	let o = i.firstChild.firstChild;
	for (let r of a) {
		let i = ca(e, Ji, r);
		o.appendChild(i);
		let a = await ea(r, t.type || null);
		a.length === 0 && (i.style.display = "none");
		for (let e of a) {
			let t = Yn(n, E.solid("instance"), e.instance, { deleteFunction: async () => {
				await ta(e), o.removeChild(t);
			} });
			t.children[0].style.paddingLeft = "3em", o.appendChild(t);
		}
	}
	return e;
}
function ua(e, t, n = {}) {
	n ||= {};
	let r = n.buttonStyle || V.signInAndUpButtonStyle, i = e.createElement("div"), a = "SolidSignInOrSignUpBox";
	P("widgets.signInOrSignUpBox"), i.setUserCallback = t, i.setAttribute("class", a), i.setAttribute("style", "display:flex;");
	let o = e.createElement("input");
	i.appendChild(o), o.setAttribute("type", "button"), o.setAttribute("value", "Log in"), o.setAttribute("style", `${r}${V.headerBannerLoginInput}` + V.signUpBackground), j.events.on("login", () => {
		let t = S.currentUser();
		if (t) {
			let n = t.uri, r = e.getElementsByClassName(a);
			P(`Logged in, ${r.length} panels to be serviced`);
			for (let t = 0; t < r.length; t++) {
				let i = r[t];
				if (i.setUserCallback) try {
					i.setUserCallback(n);
					let e = i.parentNode;
					e && e.removeChild(i);
				} catch (t) {
					P(`## Error satisfying login box: ${t}`), i.appendChild(H(e, t));
				}
			}
		}
	}), o.addEventListener("click", () => {
		let n = C();
		if (n) return t(n.uri);
		da(e);
	}, !1);
	let s = e.createElement("input");
	return i.appendChild(s), s.setAttribute("type", "button"), s.setAttribute("value", "Sign Up for Solid"), s.setAttribute("style", `${r}${V.headerBannerLoginInput}` + V.signInBackground), s.addEventListener("click", function(e) {
		new Ki().signup().then(function(e) {
			P("signInOrSignUpBox signed up " + e), t(e);
		});
	}, !1), i;
}
function da(e) {
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
			Fe(e.message);
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
function fa(e, t = null, n = {}) {
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
				Fe(e);
			} catch {
				window.alert(e);
			}
			i.refresh(), t && t(null);
		}, (e) => {
			Fe("Fail to log out:" + e);
		});
	}
	function s(t, n) {
		let r = n.buttonStyle || V.signInAndUpButtonStyle, i = "WebID logout";
		if (t) {
			let e = w.store.any(t, E.foaf("nick")) || w.store.any(t, E.foaf("name"));
			e && (i = "Logout " + e.value);
		}
		let a = e.createElement("input");
		return a.setAttribute("type", "button"), a.setAttribute("value", i), a.setAttribute("style", `${r}`), a.addEventListener("click", o, !1), a;
	}
	i.refresh = function() {
		let t = j.webId;
		r = t ? w.store.sym(t) : null, (r && i.me !== r.uri || !r && i.me) && (kn(i), r ? i.appendChild(s(r, n)) : i.appendChild(ua(e, a, n))), i.me = r ? r.uri : null;
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
function pa(e, t, n) {
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
		return n = t ? t.value : e.uri.split("#")[0], n.slice(-1) !== "/" && (P(`${i}: No / at end of uriPrefix ${n}`), n = `${n}/`), n += `${i}/id${(/* @__PURE__ */ new Date()).getTime()}/`, n;
	}
	function d(t) {
		async function i(n) {
			let r = m.appendChild(e.createElement("tr")).appendChild(e.createElement("td"));
			r.setAttribute("colspan", "3"), r.style.padding = "0.5em";
			let i = encodeURI(await Jn(e, w.store, r, E.solid("URL"), E.space("Workspace"), "Workspace")), a = X(t.preferencesFile), s = [o(t.me, E.space("workspace"), a, t.preferencesFile), o(a, E.space("uriPrefix"), i, t.preferencesFile)];
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
		h.setAttribute("style", V.commentStyle), h.textContent = `Where would you like to store the data for the ${r}?
    Give the URL of the folder where you would like the data stored.
    It can be anywhere in solid world - this URI is just an idea.`;
		let g = s.appendChild(e.createElement("input"));
		g.setAttribute("type", "text"), g.setAttribute("style", V.textInputStyle), g.size = 80, g.label = "base URL", g.autocomplete = "on", d && (g.value = d), t.baseField = g, s.appendChild(e.createElement("br"));
		let _ = s.appendChild(e.createElement("button"));
		_.setAttribute("style", V.buttonStyle), _.textContent = `Start new ${r} at this URI`, _.addEventListener("click", function(e) {
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
	return ra(c).then(d).catch((e) => {
		s.appendChild(H(c.dom, e));
	}), s;
}
function ma(e, t, n) {
	let r = function(e, t) {
		n(e, t);
	}, i = e.createElement("div"), a = e.createElement("button");
	return a.setAttribute("type", "button"), i.appendChild(a), a.innerHTML = `Make new ${t.noun}`, a.addEventListener("click", (n) => {
		i.appendChild(pa(e, t, r));
	}, !1), i.appendChild(a), i;
}
async function ha() {
	try {
		let { me: e, preferencesFile: t, preferencesFileError: n } = await ra({});
		if (!t || n) throw Error(n);
		return w.store.each(e, E.rdf("type"), null, t.doc());
	} catch (e) {
		F("Unable to fetch your preferences - this was the error: ", e);
	}
	return [];
}
async function ga(e) {
	let t = await ha();
	return e.filter((e) => _a(e, t));
}
function _a(e, t) {
	return (e.audience || []).reduce((e, n) => e && !!t.find((e) => e.equals(n)), !0);
}
//#endregion
//#region src/acl/add-agent-buttons.ts
var va = class {
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
		return G(this.groupList.controller.dom, U.iconBase + Ln["vcard:Individual"], "Add Person", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(E.vcard("Individual"), "person").then((e) => this.addPerson(e)).then(() => this.renderCleanup()).catch((e) => this.groupList.controller.renderStatus(e));
		});
	}
	renderGroupButton() {
		return G(this.groupList.controller.dom, U.iconBase + Ln["vcard:Group"], "Add Group", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(E.vcard("Group"), "group").then((e) => this.addGroup(e)).then(() => this.renderCleanup()).catch((e) => this.groupList.controller.renderStatus(e));
		});
	}
	renderNameForm(e, t) {
		return Jn(this.groupList.controller.dom, this.groupList.store, this.barElement, E.vcard("URI"), e, t);
	}
	renderPublicButton() {
		return G(this.groupList.controller.dom, U.iconBase + Ln["foaf:Agent"], "Add Everyone", () => this.addAgent(E.foaf("Agent").uri).then(() => this.groupList.controller.renderTemporaryStatus("Adding the general public to those who can read. Drag the globe to a different level to give them more access.")).then(() => this.renderCleanup()));
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
			t.setAttribute("style", V.trustedAppController);
			let n = Kn(this.groupList.controller.dom, () => this.renderCleanup());
			n.setAttribute("style", V.trustedAppCancelButton), t.insertBefore(n, t.firstChild), this.barElement.appendChild(t);
		}
	}
	async renderAppsTable(e) {
		await ia(e);
		let t = this.groupList.store.each(e.me, E.acl("trustedApp")), n = t.flatMap((e) => this.groupList.store.each(e, E.acl("origin")));
		return this.barElement.appendChild(this.groupList.controller.dom.createElement("p")).textContent = `You have ${n.length} selected web apps.`, new Promise((e, n) => {
			let r = this.barElement.appendChild(this.groupList.controller.dom.createElement("table"));
			r.setAttribute("style", V.trustedAppAddApplicationsTable), t.forEach((t) => {
				let i = this.groupList.store.any(t, E.acl("origin"));
				i || n(/* @__PURE__ */ Error(`Unable to pick app: ${t.value}`));
				let a = Yn(this.groupList.controller.dom, E.acl("origin"), i, {}), o = this.groupList.controller.dom.createElement("table"), s = o.appendChild(this.groupList.controller.dom.createElement("tr"));
				s.appendChild(this.groupList.controller.dom.createElement("td")).appendChild(a);
				let c = s.appendChild(this.groupList.controller.dom.createElement("td"));
				c.textContent = `Give access to ${this.groupList.controller.noun} ${N(this.groupList.controller.subject)}?`, s.appendChild(this.groupList.controller.dom.createElement("td")).appendChild(qn(this.groupList.controller.dom, () => e(i.value))), r.appendChild(o);
			});
		});
	}
	renderCleanup() {
		this.renderBar(), this.groupList.render();
	}
	async addPerson(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		P(`Adding to ACL person: ${e}`), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addGroup(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		P("Adding to ACL group: " + e), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addAgent(e) {
		await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addBot(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		P("Adding to ACL bot: " + e), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async getOriginFromName(e) {
		if (!e) return Promise.resolve();
		if (!e.match(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i)) return Promise.reject(/* @__PURE__ */ Error("Not a domain name"));
		let t = "https://" + e;
		return P("Adding to ACL origin: " + t), this.toggleBar(), t;
	}
	toggleBar() {
		this.isExpanded = !this.isExpanded;
	}
}, ya = E.acl, ba = {
	13: "Owners",
	9: "Owners (write locked)",
	5: "Editors",
	3: "Posters",
	2: "Submitters",
	1: "Viewers"
}, xa = {
	13: !0,
	5: !0,
	3: !0,
	2: !0,
	1: !0
}, Sa = {
	13: "can read, write, and control sharing.",
	9: "can read and control sharing, currently write-locked.",
	5: "can read and change information",
	3: "can add new information, and read but not change existing information",
	2: "can add new information but not read any",
	1: "can read but not change information"
}, Ca = class {
	defaults;
	byCombo;
	aclMap;
	addAgentButton;
	rootElement;
	_store;
	constructor(e, t, n, r, i = {}) {
		this.doc = e, this.aclDoc = t, this.controller = n, this._options = i, this.defaults = this._options.defaults || !1, this._store = r, this.aclMap = Et(e, t, r, this.defaults), this.byCombo = At(this.aclMap), this.addAgentButton = new va(this), this.rootElement = this.controller.dom.createElement("div"), this.rootElement.setAttribute("style", V.accessGroupList);
	}
	get store() {
		return this._store;
	}
	set store(e) {
		this._store = e, this.aclMap = Et(this.doc, this.aclDoc, e, this.defaults), this.byCombo = At(this.aclMap);
	}
	render() {
		return this.rootElement.innerHTML = "", this.renderGroups().forEach((e) => this.rootElement.appendChild(e)), this.controller.isEditable && this.rootElement.appendChild(this.addAgentButton.render()), this.rootElement;
	}
	renderGroups() {
		let e = [];
		for (let t = 15; t > 0; t--) {
			let n = wa(t);
			(this.controller.isEditable && xa[t] || this.byCombo[n]) && e.push(this.renderGroup(t, n));
		}
		return e;
	}
	renderGroup(e, t) {
		let n = this.controller.dom.createElement("div");
		return n.setAttribute("style", V.accessGroupListItem), an(n, (e) => this.handleDroppedUris(e, t).then(() => this.controller.render()).catch((e) => this.controller.renderStatus(e))), this.renderGroupElements(e, t).forEach((e) => n.appendChild(e)), n;
	}
	renderGroupElements(e, t) {
		let n = this.controller.dom.createElement("div");
		if (n.setAttribute("style", V.group), this.controller.isEditable) switch (e) {
			case 1:
				n.setAttribute("style", V.group1);
				break;
			case 2:
				n.setAttribute("style", V.group2);
				break;
			case 3:
				n.setAttribute("style", V.group3);
				break;
			case 5:
				n.setAttribute("style", V.group5);
				break;
			case 9:
				n.setAttribute("style", V.group9);
				break;
			case 13:
				n.setAttribute("style", V.group13);
				break;
			default: n.setAttribute("style", V.group);
		}
		n.innerText = ba[e] || Ta(e);
		let r = this.controller.dom.createElement("div");
		if (r.setAttribute("style", V.group), this.controller.isEditable) switch (e) {
			case 1:
				r.setAttribute("style", V.group1);
				break;
			case 2:
				r.setAttribute("style", V.group2);
				break;
			case 3:
				r.setAttribute("style", V.group3);
				break;
			case 5:
				r.setAttribute("style", V.group5);
				break;
			case 9:
				r.setAttribute("style", V.group9);
				break;
			case 13:
				r.setAttribute("style", V.group13);
				break;
			default: r.setAttribute("style", V.group);
		}
		let i = r.appendChild(this.controller.dom.createElement("table"));
		(this.byCombo[t] || []).map(([e, n]) => this.renderAgent(i, t, e, n)).forEach((e) => i.appendChild(e));
		let a = this.controller.dom.createElement("div");
		if (a.setAttribute("style", V.group), this.controller.isEditable) switch (e) {
			case 1:
				a.setAttribute("style", V.group1);
				break;
			case 2:
				a.setAttribute("style", V.group2);
				break;
			case 3:
				a.setAttribute("style", V.group3);
				break;
			case 5:
				a.setAttribute("style", V.group5);
				break;
			case 9:
				a.setAttribute("style", V.group9);
				break;
			case 13:
				a.setAttribute("style", V.group13);
				break;
			default: a.setAttribute("style", V.group);
		}
		return a.innerText = Sa[e] || "Unusual combination", [
			n,
			r,
			a
		];
	}
	renderAgent(e, t, n, r) {
		let i = Yn(this.controller.dom, ya(n), _(r), this.controller.isEditable ? { deleteFunction: () => this.deleteAgent(t, n, r).then(() => e.removeChild(i)).catch((e) => this.controller.renderStatus(e)) } : {});
		return i;
	}
	async deleteAgent(e, t, n) {
		let r = this.byCombo[e] || [], i = r.find(([e, r]) => e === t && r === n);
		i && r.splice(r.indexOf(i), 1), await this.controller.save();
	}
	async addNewURI(e) {
		await this.handleDroppedUri(e, wa(1)), await this.controller.save();
	}
	async handleDroppedUris(e, t) {
		try {
			await Promise.all(e.map((e) => this.handleDroppedUri(e, t))), await this.controller.save();
		} catch (e) {
			return Promise.reject(e);
		}
	}
	async handleDroppedUri(e, t, n = !1) {
		let r = Ea(e, this.store), i = _(e);
		if (!r && !n) {
			P(`   Not obvious: looking up dropped thing ${i}`);
			try {
				await this._store?.fetcher?.load(i.doc());
			} catch (e) {
				let t = `Ignore error looking up dropped thing: ${e}`;
				return I(t), Promise.reject(Error(t));
			}
			return this.handleDroppedUri(e, t, !0);
		} else if (!r) {
			let t = Object.keys(this.store.findTypeURIs(i)), n = t.length > 0 ? `Detected RDF types: ${t.join(", ")}` : "No RDF type was detected for this URI.", r = `Error: Failed to add access target: ${e} is not a recognized ACL target type. Expected one of: vcard:WebID, vcard:Group, foaf:Person, foaf:Agent, solid:AppProvider, solid:AppProviderClass, or recognized ACL classes. Hint: try dropping a WebID profile URI, a vcard:Group URI, or a web app origin.` + n;
			return I(r), Promise.reject(Error(r));
		}
		this.setACLCombo(t, e, r, this.controller.subject);
	}
	setACLCombo(e, t, n, r) {
		e in this.byCombo || (this.byCombo[e] = []), this.removeAgentFromCombos(t), this.byCombo[e].push([n.pred, n.obj.uri]), P(`ACL: setting access to ${r} by ${n.pred}: ${n.obj}`);
	}
	removeAgentFromCombos(e) {
		for (let t = 0; t < 16; t++) {
			let n = this.byCombo[wa(t)];
			if (n) for (let t = 0; t < n.length; t++) for (; t < n.length && n[t][1] === e;) n.splice(t, 1);
		}
	}
};
function wa(e) {
	let t = [
		"Read",
		"Append",
		"Write",
		"Control"
	], n = [];
	for (let r = 0; r < 4; r++) e & 1 << r && n.push("http://www.w3.org/ns/auth/acl#" + t[r]);
	return n.sort(), n.join("\n");
}
function Ta(e) {
	let t = "", n = [
		"Read",
		"Append",
		"Write",
		"Control"
	];
	for (let r = 0; r < 4; r++) e & 1 << r && (t += n[r]);
	return t;
}
function Ea(e, t) {
	let n = _(e), r = t.findTypeURIs(n);
	for (let e in r) P("    drop object type includes: " + e);
	if (e.startsWith("http") && e.split("/").length === 3) return {
		pred: "origin",
		obj: n
	};
	if (e.startsWith("http") && e.split("/").length === 4 && e.endsWith("/")) return P("Assuming final slash on dragged origin URI was unintended!"), {
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
	} : (P("    Triage fails for " + e), null);
}
//#endregion
//#region src/acl/access-controller.ts
var Da = class {
	mainCombo;
	defaultsCombo;
	isContainer;
	defaultsDiffer;
	rootElement;
	isUsingDefaults;
	constructor(e, t, n, r, i, a, o, s, c, l, u, d) {
		if (this.subject = e, this.noun = t, this.context = n, this.statusElement = r, this.targetIsProtected = i, this.targetDoc = a, this.targetACLDoc = o, this.defaultHolder = s, this.defaultACLDoc = c, this.prospectiveDefaultHolder = l, this.store = u, this.dom = d, this.rootElement = d.createElement("div"), this.rootElement.setAttribute("style", V.aclGroupContent), this.isContainer = a.uri.slice(-1) === "/", s && c) {
			this.isUsingDefaults = !0;
			let e = Tt(this.targetDoc, o, s, c);
			this.mainCombo = new Ca(a, o, this, e, { defaults: this.isContainer }), this.defaultsCombo = null, this.defaultsDiffer = !1;
		} else this.isUsingDefaults = !1, this.mainCombo = new Ca(a, o, this, u), this.defaultsCombo = new Ca(a, o, this, u, { defaults: this.isContainer }), this.defaultsDiffer = !Dt(this.mainCombo.aclMap, this.defaultsCombo.aclMap);
	}
	get isEditable() {
		return !this.isUsingDefaults;
	}
	render() {
		if (this.rootElement.innerHTML = "", this.isUsingDefaults) {
			if (this.renderStatus(`The sharing for this ${this.noun} is the default for folder `), this.defaultHolder) {
				let e = this.statusElement.appendChild(this.dom.createElement("a"));
				e.href = this.defaultHolder.uri, e.innerText = Na(this.defaultHolder);
			}
		} else !this.defaultsDiffer && this.isContainer ? this.renderStatus("This is also the default for things in this folder.") : this.renderStatus("");
		return this.rootElement.appendChild(this.mainCombo.render()), this.defaultsCombo && this.defaultsDiffer ? (this.rootElement.appendChild(this.renderRemoveDefaultsController()), this.rootElement.appendChild(this.defaultsCombo.render())) : this.isEditable && this.isContainer && this.rootElement.appendChild(this.renderAddDefaultsController()), !this.targetIsProtected && this.isUsingDefaults ? this.rootElement.appendChild(this.renderAddAclsController()) : this.targetIsProtected || this.rootElement.appendChild(this.renderRemoveAclsController()), this.rootElement;
	}
	renderRemoveAclsController() {
		let e = this.dom.createElement("button");
		return e.innerText = `Remove custom sharing settings for this ${this.noun} -- just use default${this.prospectiveDefaultHolder ? ` for ${N(this.prospectiveDefaultHolder)}` : ""}`, e.setAttribute("style", V.bigButton), e.addEventListener("click", () => this.removeAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderAddAclsController() {
		let e = this.dom.createElement("button");
		return e.innerText = `Set specific sharing for this ${this.noun}`, e.setAttribute("style", V.bigButton), e.addEventListener("click", () => this.addAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderAddDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", V.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Sharing for things within the folder currently tracks sharing for the folder.", t.setAttribute("style", V.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set the sharing of folder contents separately from the sharing for the folder", n.setAttribute("style", V.bigButton), n.addEventListener("click", () => this.addDefaults().then(() => this.render())), e;
	}
	renderRemoveDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", V.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Access to things within this folder:", t.setAttribute("style", V.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set default for folder contents to just track the sharing for the folder", n.setAttribute("style", V.bigButton), n.addEventListener("click", () => this.removeDefaults().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderTemporaryStatus(e) {
		this.statusElement.setAttribute("style", V.aclControlBoxStatusRevealed), this.statusElement.innerText = e, this.statusElement.setAttribute("style", V.temporaryStatusInit), setTimeout(() => {
			this.statusElement.setAttribute("style", V.temporaryStatusEnd);
		}), setTimeout(() => {
			this.statusElement.innerText = "";
		}, 5e3);
	}
	renderStatus(e) {
		e || this.statusElement.setAttribute("style", V.aclControlBoxStatusRevealed), this.statusElement.innerText = e;
	}
	async addAcls() {
		if (!this.defaultHolder || !this.defaultACLDoc) {
			let e = "Unable to find defaults to copy";
			return I(e), Promise.reject(e);
		}
		Tt(this.targetDoc, this.targetACLDoc, this.defaultHolder, this.defaultACLDoc).statements.forEach((e) => this.store.add(e.subject, e.predicate, e.object, this.targetACLDoc));
		try {
			return await this.store.fetcher.putBack(this.targetACLDoc), this.isUsingDefaults = !1, Promise.resolve();
		} catch (e) {
			let t = ` Error writing back access control file! ${e}`;
			return I(t), Promise.reject(t);
		}
	}
	async addDefaults() {
		this.defaultsCombo = new Ca(this.targetDoc, this.targetACLDoc, this, this.store, { defaults: !0 }), this.defaultsDiffer = !0;
	}
	async removeAcls() {
		try {
			await this.store.fetcher.delete(this.targetACLDoc.uri, {}), this.isUsingDefaults = !0;
			try {
				this.prospectiveDefaultHolder = await Ut(this.targetDoc.uri);
			} catch (e) {
				F(e);
			}
		} catch (e) {
			let t = `Error deleting access control file: ${this.targetACLDoc}: ${e}`;
			return I(t), Promise.reject(t);
		}
	}
	async removeDefaults() {
		let e = this.defaultsCombo;
		try {
			this.defaultsCombo = null, this.defaultsDiffer = !1, await this.save();
		} catch (t) {
			return this.defaultsCombo = e, this.defaultsDiffer = !0, I(t), Promise.reject(t);
		}
	}
	save() {
		let e = ue();
		this.isContainer ? this.defaultsCombo && this.defaultsDiffer ? (Mt(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), Mt(e, this.targetDoc, this.defaultsCombo.byCombo, this.targetACLDoc, !1, !0)) : Mt(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0, !0) : Mt(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), e.fetcher = y(e, { fetch: this.store.fetcher._fetch });
		let t = e.updater || new c(e);
		return new Promise((n, r) => {
			t.put(this.targetACLDoc, e.statementsMatching(void 0, void 0, void 0, this.targetACLDoc), "text/turtle", (t, i, a) => {
				if (!i) return r(/* @__PURE__ */ Error(`ACL file save failed: ${a}`));
				this.store.fetcher.unload(this.targetACLDoc), this.store.add(e.statements), this.store.fetcher.requested[this.targetACLDoc.uri] = "done", this.mainCombo.store = this.store, this.defaultsCombo && (this.defaultsCombo.store = this.store), this.defaultsDiffer = !!this.defaultsCombo && !Dt(this.mainCombo.aclMap, this.defaultsCombo.aclMap), P("ACL modification: success!"), n();
			});
		});
	}
}, Oa = window, ka = Symbol("prevent double triggering of drop event");
function Aa(e) {
	if (P("preventBrowserDropEvents called."), Oa !== void 0) {
		if (Oa[ka]) return;
		Oa[ka] = !0;
	}
	e.addEventListener("drop", Ma, !1), e.addEventListener("dragenter", ja, !1), e.addEventListener("dragover", ja, !1);
}
function ja(e) {
	e.stopPropagation(), e.preventDefault();
}
function Ma(e) {
	e.dataTransfer.files.length > 0 && (Oa.confirm("Are you sure you want to drop this file here? (Cancel opens it in a new tab)") || (e.stopPropagation(), e.preventDefault(), P("@@@@ document-level DROP suppressed: " + e.dataTransfer.dropEffect)));
}
function Na(e) {
	let t = e.uri;
	t.slice(-1) === "/" && (t = t.slice(0, -1));
	let n = t.lastIndexOf("/");
	return n >= 0 && (t = t.slice(n + 1)), t || "/";
}
function Pa(e, t, n, r) {
	let i = t.dom, a = e.doc(), o = i.createElement("div");
	o.setAttribute("style", V.aclControlBoxContainer);
	let s = o.appendChild(i.createElement("h1"));
	s.textContent = `Sharing for ${n} ${N(e)}`, s.setAttribute("style", V.aclControlBoxHeader);
	let c = o.appendChild(i.createElement("div"));
	c.setAttribute("style", V.aclControlBoxStatus);
	try {
		Fa(a, r, e, n, t, i, c).then((e) => o.appendChild(e.render()));
	} catch (e) {
		c.innerText = e;
	}
	return o;
}
async function Fa(e, t, n, r, i, a, o) {
	return new Promise((s, c) => Vt(e, async (e, l, u, d, f, p) => {
		if (!e) return c(/* @__PURE__ */ Error(`Error reading ${l ? "" : " default "}ACL. status ${u}: ${d}`));
		let m = Ia(u), h = La(u, d, t) || Ra(u);
		if (!h && m) try {
			return s(g(await Ut(m)));
		} catch (e) {
			F(e);
		}
		return s(g());
		function g(e) {
			return new Da(n, r, i, o, h, u, d, f, p, e, t, a);
		}
	}));
}
function Ia(e) {
	let t = e.uri.split("#")[0], n = t.slice(0, -1).lastIndexOf("/"), r = t.indexOf("//");
	return r >= 0 && n < r + 2 || n < 0 ? null : t.slice(0, n + 1);
}
function La(e, t, n) {
	return n.holds(e, E.rdf("type"), E.space("Storage"), t);
}
function Ra(e) {
	return e.uri === e.site().uri;
}
//#endregion
//#region src/acl/index.ts
var za = {
	adoptACLDefault: Tt,
	readACL: Et,
	sameACL: Dt,
	ACLunion: Ot,
	loadUnionACL: kt,
	ACLbyCombination: At,
	makeACLGraph: jt,
	makeACLGraphbyCombo: Mt,
	ACLToString: Nt,
	comboToString: Pt,
	makeACLString: Ft,
	putACLObject: It,
	putACLbyCombo: Lt,
	fixIndividualCardACL: Rt,
	fixIndividualACL: zt,
	setACL: Bt,
	getACLorDefault: Vt,
	getACL: Ht
}, Ba = {
	preventBrowserDropEvents: Aa,
	shortNameForFolder: Na,
	ACLControlBox5: Pa
}, Va = w.store;
function Ha(e, t, n) {
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
				ia(e).then((e) => {
					let s = Object.assign({
						newBase: o,
						folder: n.folder || void 0,
						workspace: i
					}, n);
					for (let e in n) s[e] = n[e];
					P(`newThingUI: Minting new ${s.pane.name} at ${s.newBase}`), n.pane.mintNew(t, s).then(function(e) {
						if (!e || !e.newInstance) throw Error("Cannot mint new - missing newInstance");
						if (e.folder) {
							let t = e.newInstance.uri.slice(e.folder.uri.length).includes("/");
							P("  new thing is packge? " + t), t ? Va.add(e.folder, E.ldp("contains"), Va.sym(e.newBase), e.folder.doc()) : Va.add(e.folder, E.ldp("contains"), e.newInstance, e.folder.doc()), e.refreshTarget && e.refreshTarget.refresh && e.refreshTarget.refresh();
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
			n.noun = l.mintClass ? N(l.mintClass) : l.name, n.appPathSegment = n.noun.slice(0, 1).toUpperCase() + n.noun.slice(1), n.folder ? Jn(r, Va, n.div, E.foaf("name"), null, n.noun).then(function(e) {
				if (!e) d();
				else {
					let t = n.folder.uri;
					t.endsWith("/") || (t += "/"), t = t + encodeURIComponent(e) + "/", s(null, t);
				}
			}) : (o = pa(r, {
				noun: n.noun,
				appPathSegment: n.appPathSegment
			}, s), n.div.appendChild(o));
		});
	}
	let p = [], m = Object.values(n).filter((e) => e.mintNew), h = m.reduce((e, t) => (t.mintClass && (e[t.mintClass.uri] = (e[t.mintClass.uri] || 0) + 1), e), {});
	m.forEach((t) => {
		let n = e.div.appendChild(r.createElement("img"));
		n.setAttribute("src", t.icon);
		let i = t.mintClass ? h[t.mintClass.uri] > 1 ? `${N(t.mintClass)} (using ${t.name} pane)` : N(t.mintClass) : t.name + " @@";
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
var Ua = { newThingUI: Ha }, Wa = w.store;
function Ga(e, t, n, r, i, a, o) {
	let s = e.createElement("table"), c = e.createElement("tr");
	c.appendChild(e.createElement("td")).setAttribute("class", "MatrixCorner"), s.appendChild(c), s.lastHeader = c;
	let l = [], u = [], d = function(e, t, n, r) {
		for (; e.firstChild;) e.removeChild(e.firstChild);
		e.setAttribute("style", ""), e.style.textAlign = "center", a.cellFunction ? a.cellFunction(e, t, n, r) : (e.textContent = N(r), e.setAttribute("style", "padding: 0.3em")), delete e.old;
	}, f = function(t) {
		let n = t.toNT();
		if (u[n]) return u[n];
		let r = e.createElement("tr"), i = r.appendChild(e.createElement("td"));
		i.setAttribute("style", "padding: 0.3em;"), i.textContent = N(t), t.termType === "NamedNode" && Wa.fetcher.nowOrWhenFetched(t.uri.split("#")[0], void 0, function(e, n, r) {
			e && (i.textContent = N(t));
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
			if (a.style.textAlign = "center", n === s.firstChild ? a.textContent = N(t) : d(a, t, se(i), null), r === l.length - 1) n.appendChild(a);
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
		m(), Wa.query(t, g, void 0, h);
	};
	let g = function(e) {
		let t = e[n.toString()], a = e[r.toString()], o = e[i.toString()], s = f(a), c = p(t), l = s.children[c + 1];
		d(l, t, a, o);
	};
	if (a.set_y) for (let e = 0; e < a.set_y.length; e++) f(a.set_y[e]);
	if (a.set_x) for (let e = 0; e < a.set_x.length; e++) p(a.set_x[e]);
	return Wa.query(t, g, void 0, o), s;
}
//#endregion
//#region src/matrix/index.ts
var Ka = { matrixForQuery: Ga }, qa = U.iconBase + "noun_Camera_1618446_000000.svg", Ja = U.iconBase + "noun_479395.svg", Ya = "image/png";
function Xa(e, t, n, r) {
	let i = e.createElement("div"), a, o, s, c, l = i.appendChild(e.createElement("table")), u = l.appendChild(e.createElement("tr")).appendChild(e.createElement("td"));
	u.setAttribute("colspan", "4");
	let d = l.appendChild(e.createElement("tr"));
	d.appendChild(e.createElement("td")).appendChild(Kn(e)).addEventListener("click", (e) => {
		b(), r(null);
	});
	let f = d.appendChild(e.createElement("td")).appendChild(G(e, Ja, "Retake"));
	f.addEventListener("click", (e) => {
		_();
	}), f.style.visibility = "collapse";
	let p = d.appendChild(e.createElement("td")).appendChild(G(e, U.iconBase + "noun_10636.svg", "Snap"));
	p.addEventListener("click", v), p.style.visibility = "collapse";
	let m = d.appendChild(e.createElement("td")).appendChild(qn(e));
	m.addEventListener("click", (e) => {
		x(o, a);
	}), m.style.visibility = "collapse";
	function h() {
		if (s = u.appendChild(e.createElement("video")), s.setAttribute("controls", "1"), s.setAttribute("autoplay", "1"), s.setAttribute("style", V.controlStyle), !navigator.mediaDevices) throw Error("navigator.mediaDevices not available");
		navigator.mediaDevices.getUserMedia(g).then((e) => {
			s.srcObject = e, p.style.visibility = "visible", m.style.visibility = "collapse", f.style.visibility = "collapse";
		});
	}
	let g = { video: !0 };
	function _() {
		u.removeChild(c), h();
	}
	function v() {
		c = e.createElement("canvas"), c.setAttribute("width", V.canvasWidth), c.setAttribute("height", V.canvasHeight), c.setAttribute("style", V.controlStyle), u.appendChild(c), c.getContext("2d").drawImage(s, 0, 0, c.width, c.height), s.parentNode.removeChild(s), c.toBlob((e) => {
			P(`got blob type ${e.type} size ${e.size}`), a = n(), o = e, y();
		}, Ya);
	}
	function y() {
		m.style.visibility = "visible", f.style.visibility = "visible", p.style.visibility = "collapse";
	}
	function b() {
		s && s.srcObject && s.srcObject.getVideoTracks().forEach((e) => e.stop());
	}
	function x(e, n) {
		let i = e.type;
		P("Putting " + e.size + " bytes of " + i + " to " + n), t.fetcher.webOperation("PUT", n.uri, {
			data: e,
			contentType: i
		}).then((e) => {
			P("ok saved " + n), b(), r(n);
		}, (e) => {
			b(), alert(e);
		});
	}
	return h(), i;
}
function Za(e, t, n, r) {
	let i = e.createElement("div"), a = G(e, qa, "Take picture"), o;
	async function s(e) {
		i.removeChild(o), i.appendChild(a), r(e);
	}
	return i.appendChild(a), a.addEventListener("click", (r) => {
		i.removeChild(a), o = Xa(e, t, n, s), i.appendChild(o);
	}), i;
}
//#endregion
//#region src/media/index.ts
var Qa = {
	cameraCaptureControl: Xa,
	cameraButton: Za
}, $a = {
	icons: U,
	ns: E,
	rdf: T,
	style: V,
	widgets: Wi
};
function eo(e, t, n, r, i) {
	t ||= w.store, r = r.doc();
	let a = $a.ns, o = p("http://www.w3.org/2005/01/wf/flow#"), s = p("http://purl.org/dc/terms/");
	i ||= {};
	let c = !!i.newestFirst, u = e.createElement("div"), d, f, m = w.store.updater, h = function(t, n) {
		let r = e.createElement("a");
		return n && n.uri && (r.setAttribute("href", n.uri), r.addEventListener("click", $a.widgets.openHrefInOutlineMode, !0), r.setAttribute("style", "color: #3B5998; text-decoration: none; ")), r.textContent = t, r;
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
				if (!r) i.appendChild($a.widgets.errorMessageBlock(e, "Error writing message: " + a));
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
			}, !1), u.innerHTML = "", h = $a.widgets.button(e, $a.icons.iconBase + "noun_383448.svg", "Send"), h.setAttribute("style", $a.style.buttonStyle + "float: right;"), h.addEventListener("click", d, !1), u.appendChild(h);
		};
		return na({
			div: c,
			dom: e
		}).then((e) => {
			f = e.me, g();
		}), i;
	};
	function b(e) {
		let t = w.store.any(e, $a.ns.foaf("nick"));
		return t ? "" + t.value : "" + N(e);
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
		l.appendChild(f), x(f, r, $a.widgets.shortDate(s), i);
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
async function to(e) {
	return await A.fetcher.load(e), !(A.statementsMatching(null, E.dct("created"), null, e).length > 0);
}
var no = class {
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
				if (e.response && e.response.status && e.response.status === 404) P("Error 404 for chat parent file " + s);
				else throw P("*** Error NON 404 for chat parent file " + s), Error(`*** ${e.message} for chat folder ${s}`);
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
				if (await to(n)) e = i, r = this.leafDocumentFromDate(e).dir();
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
			throw wt(e), Error(e);
		}
		let o = a.map((e) => [t.any(e, E.dct("created")), e]);
		return o.sort(), e && o.reverse(), o[0][1];
	}
};
//#endregion
//#region node_modules/@noble/hashes/utils.js
function ro(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in e && e.BYTES_PER_ELEMENT === 1;
}
function io(e, t = "") {
	if (typeof e != "number") {
		let n = t && `"${t}" `;
		throw TypeError(`${n}expected number, got ${typeof e}`);
	}
	if (!Number.isSafeInteger(e) || e < 0) {
		let n = t && `"${t}" `;
		throw RangeError(`${n}expected integer >= 0, got ${e}`);
	}
}
function ao(e, t, n = "") {
	let r = ro(e), i = e?.length, a = t !== void 0;
	if (!r || a && i !== t) {
		let o = n && `"${n}" `, s = a ? ` of length ${t}` : "", c = r ? `length=${i}` : `type=${typeof e}`, l = o + "expected Uint8Array" + s + ", got " + c;
		throw r ? RangeError(l) : TypeError(l);
	}
	return e;
}
function oo(e, t = !0) {
	if (e.destroyed) throw Error("Hash instance has been destroyed");
	if (t && e.finished) throw Error("Hash#digest() has already been called");
}
function so(e, t) {
	ao(e, void 0, "digestInto() output");
	let n = t.outputLen;
	if (e.length < n) throw RangeError("\"digestInto() output\" expected to be of length >=" + n);
}
function co(...e) {
	for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function lo(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function uo(e, t) {
	return e << 32 - t | e >>> t;
}
var fo = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", po = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function mo(e) {
	if (ao(e), fo) return e.toHex();
	let t = "";
	for (let n = 0; n < e.length; n++) t += po[e[n]];
	return t;
}
var ho = {
	_0: 48,
	_9: 57,
	A: 65,
	F: 70,
	a: 97,
	f: 102
};
function go(e) {
	if (e >= ho._0 && e <= ho._9) return e - ho._0;
	if (e >= ho.A && e <= ho.F) return e - (ho.A - 10);
	if (e >= ho.a && e <= ho.f) return e - (ho.a - 10);
}
function _o(e) {
	if (typeof e != "string") throw TypeError("hex string expected, got " + typeof e);
	if (fo) try {
		return Uint8Array.fromHex(e);
	} catch (e) {
		throw e instanceof SyntaxError ? RangeError(e.message) : e;
	}
	let t = e.length, n = t / 2;
	if (t % 2) throw RangeError("hex string expected, got unpadded hex of length " + t);
	let r = new Uint8Array(n);
	for (let t = 0, i = 0; t < n; t++, i += 2) {
		let n = go(e.charCodeAt(i)), a = go(e.charCodeAt(i + 1));
		if (n === void 0 || a === void 0) {
			let t = e[i] + e[i + 1];
			throw RangeError("hex string expected, got non-hex character \"" + t + "\" at index " + i);
		}
		r[t] = n * 16 + a;
	}
	return r;
}
function vo(...e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		ao(r), t += r.length;
	}
	let n = new Uint8Array(t);
	for (let t = 0, r = 0; t < e.length; t++) {
		let i = e[t];
		n.set(i, r), r += i.length;
	}
	return n;
}
function yo(e, t = {}) {
	let n = (t, n) => e(n).update(t).digest(), r = e(void 0);
	return n.outputLen = r.outputLen, n.blockLen = r.blockLen, n.canXOF = r.canXOF, n.create = (t) => e(t), Object.assign(n, t), Object.freeze(n);
}
function bo(e = 32) {
	io(e, "bytesLength");
	let t = typeof globalThis == "object" ? globalThis.crypto : null;
	if (typeof t?.getRandomValues != "function") throw Error("crypto.getRandomValues must be defined");
	if (e > 65536) throw RangeError(`"bytesLength" expected <= 65536, got ${e}`);
	return t.getRandomValues(new Uint8Array(e));
}
var xo = (e) => ({ oid: Uint8Array.from([
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
function So(e, t, n) {
	return e & t ^ ~e & n;
}
function Co(e, t, n) {
	return e & t ^ e & n ^ t & n;
}
var wo = class {
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
		this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = r, this.buffer = new Uint8Array(e), this.view = lo(this.buffer);
	}
	update(e) {
		oo(this), ao(e);
		let { view: t, buffer: n, blockLen: r } = this, i = e.length;
		for (let a = 0; a < i;) {
			let o = Math.min(r - this.pos, i - a);
			if (o === r) {
				let t = lo(e);
				for (; r <= i - a; a += r) this.process(t, a);
				continue;
			}
			n.set(e.subarray(a, a + o), this.pos), this.pos += o, a += o, this.pos === r && (this.process(t, 0), this.pos = 0);
		}
		return this.length += e.length, this.roundClean(), this;
	}
	digestInto(e) {
		oo(this), so(e, this), this.finished = !0;
		let { buffer: t, view: n, blockLen: r, isLE: i } = this, { pos: a } = this;
		t[a++] = 128, co(this.buffer.subarray(a)), this.padOffset > r - a && (this.process(n, 0), a = 0);
		for (let e = a; e < r; e++) t[e] = 0;
		n.setBigUint64(r - 8, BigInt(this.length * 8), i), this.process(n, 0);
		let o = lo(e), s = this.outputLen;
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
}, To = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]), Eo = /* @__PURE__ */ Uint32Array.from([
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
]), Do = /* @__PURE__ */ new Uint32Array(64), Oo = class extends wo {
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
		for (let n = 0; n < 16; n++, t += 4) Do[n] = e.getUint32(t, !1);
		for (let e = 16; e < 64; e++) {
			let t = Do[e - 15], n = Do[e - 2], r = uo(t, 7) ^ uo(t, 18) ^ t >>> 3;
			Do[e] = (uo(n, 17) ^ uo(n, 19) ^ n >>> 10) + Do[e - 7] + r + Do[e - 16] | 0;
		}
		let { A: n, B: r, C: i, D: a, E: o, F: s, G: c, H: l } = this;
		for (let e = 0; e < 64; e++) {
			let t = uo(o, 6) ^ uo(o, 11) ^ uo(o, 25), u = l + t + So(o, s, c) + Eo[e] + Do[e] | 0, d = (uo(n, 2) ^ uo(n, 13) ^ uo(n, 22)) + Co(n, r, i) | 0;
			l = c, c = s, s = o, o = a + u | 0, a = i, i = r, r = n, n = u + d | 0;
		}
		n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, s = s + this.F | 0, c = c + this.G | 0, l = l + this.H | 0, this.set(n, r, i, a, o, s, c, l);
	}
	roundClean() {
		co(Do);
	}
	destroy() {
		this.destroyed = !0, this.set(0, 0, 0, 0, 0, 0, 0, 0), co(this.buffer);
	}
}, ko = class extends Oo {
	A = To[0] | 0;
	B = To[1] | 0;
	C = To[2] | 0;
	D = To[3] | 0;
	E = To[4] | 0;
	F = To[5] | 0;
	G = To[6] | 0;
	H = To[7] | 0;
	constructor() {
		super(32);
	}
}, Ao = /* @__PURE__ */ yo(() => new ko(), /* @__PURE__ */ xo(1)), jo = (e, t, n) => ao(e, t, n), Mo = io, No = mo, Po = (...e) => vo(...e), Fo = (e) => _o(e), Io = /* @__PURE__ */ BigInt(0), Lo = /* @__PURE__ */ BigInt(1);
function Ro(e, t = "") {
	if (typeof e != "boolean") {
		let n = t && `"${t}" `;
		throw TypeError(n + "expected boolean, got type=" + typeof e);
	}
	return e;
}
function zo(e) {
	if (typeof e == "bigint") {
		if (!Yo(e)) throw RangeError("positive bigint expected, got " + e);
	} else Mo(e);
	return e;
}
function Bo(e, t = "") {
	if (typeof e != "number") {
		let n = t && `"${t}" `;
		throw TypeError(n + "expected number, got type=" + typeof e);
	}
	if (!Number.isSafeInteger(e)) {
		let n = t && `"${t}" `;
		throw RangeError(n + "expected safe integer, got " + e);
	}
}
function Vo(e) {
	let t = zo(e).toString(16);
	return t.length & 1 ? "0" + t : t;
}
function Ho(e) {
	if (typeof e != "string") throw TypeError("hex string expected, got " + typeof e);
	return e === "" ? Io : BigInt("0x" + e);
}
function Uo(e) {
	return Ho(mo(e));
}
function Wo(e) {
	return Ho(mo(qo(ao(e)).reverse()));
}
function Go(e, t) {
	if (io(t), t === 0) throw RangeError("zero length");
	e = zo(e);
	let n = e.toString(16);
	if (n.length > t * 2) throw RangeError("number too large");
	return _o(n.padStart(t * 2, "0"));
}
function Ko(e, t) {
	return Go(e, t).reverse();
}
function qo(e) {
	return Uint8Array.from(jo(e));
}
function Jo(e) {
	if (typeof e != "string") throw TypeError("ascii string expected, got " + typeof e);
	return Uint8Array.from(e, (t, n) => {
		let r = t.charCodeAt(0);
		if (t.length !== 1 || r > 127) throw RangeError(`string contains non-ASCII character "${e[n]}" with code ${r} at position ${n}`);
		return r;
	});
}
var Yo = (e) => typeof e == "bigint" && Io <= e;
function Xo(e, t, n) {
	return Yo(e) && Yo(t) && Yo(n) && t <= e && e < n;
}
function Zo(e, t, n, r) {
	if (!Xo(t, n, r)) throw RangeError("expected valid " + e + ": " + n + " <= n < " + r + ", got " + t);
}
function Qo(e) {
	if (e < Io) throw Error("expected non-negative bigint, got " + e);
	let t;
	for (t = 0; e > Io; e >>= Lo, t += 1);
	return t;
}
var $o = (e) => (Lo << BigInt(e)) - Lo;
function es(e, t = {}, n = {}) {
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
var Z = /* @__PURE__ */ BigInt(0), Q = /* @__PURE__ */ BigInt(1), ts = /* @__PURE__ */ BigInt(2), ns = /* @__PURE__ */ BigInt(3), rs = /* @__PURE__ */ BigInt(4), is = /* @__PURE__ */ BigInt(5), as = /* @__PURE__ */ BigInt(7), os = /* @__PURE__ */ BigInt(8), ss = /* @__PURE__ */ BigInt(9), cs = /* @__PURE__ */ BigInt(16);
function ls(e, t) {
	if (t <= Z) throw Error("mod: expected positive modulus, got " + t);
	let n = e % t;
	return n >= Z ? n : t + n;
}
function us(e, t, n) {
	if (t < Z) throw Error("pow2: expected non-negative exponent, got " + t);
	let r = e;
	for (; t-- > Z;) r *= r, r %= n;
	return r;
}
function ds(e, t) {
	if (e === Z) throw Error("invert: expected non-zero number");
	if (t <= Z) throw Error("invert: expected positive modulus, got " + t);
	let n = ls(e, t), r = t, i = Z, a = Q, o = Q, s = Z;
	for (; n !== Z;) {
		let e = r / n, t = r - n * e, c = i - o * e, l = a - s * e;
		r = n, n = t, i = o, a = s, o = c, s = l;
	}
	if (r !== Q) throw Error("invert: does not exist");
	return ls(i, t);
}
function fs(e, t, n) {
	let r = e;
	if (!r.eql(r.sqr(t), n)) throw Error("Cannot find square root");
}
function ps(e, t) {
	let n = e, r = (n.ORDER + Q) / rs, i = n.pow(t, r);
	return fs(n, i, t), i;
}
function ms(e, t) {
	let n = e, r = (n.ORDER - is) / os, i = n.mul(t, ts), a = n.pow(i, r), o = n.mul(t, a), s = n.mul(n.mul(o, ts), a), c = n.mul(o, n.sub(s, n.ONE));
	return fs(n, c, t), c;
}
function hs(e) {
	let t = Es(e), n = gs(e), r = n(t, t.neg(t.ONE)), i = n(t, r), a = n(t, t.neg(r)), o = (e + as) / cs;
	return ((e, t) => {
		let n = e, s = n.pow(t, o), c = n.mul(s, r), l = n.mul(s, i), u = n.mul(s, a), d = n.eql(n.sqr(c), t), f = n.eql(n.sqr(l), t);
		s = n.cmov(s, c, d), c = n.cmov(u, l, f);
		let p = n.eql(n.sqr(c), t), m = n.cmov(s, c, p);
		return fs(n, m, t), m;
	});
}
function gs(e) {
	if (e < ns) throw Error("sqrt is not defined for small field");
	let t = e - Q, n = 0;
	for (; t % ts === Z;) t /= ts, n++;
	let r = ts, i = Es(e);
	for (; Ss(i, r) === 1;) if (r++ > 1e3) throw Error("Cannot find square root: probably non-prime P");
	if (n === 1) return ps;
	let a = i.pow(r, t), o = (t + Q) / ts;
	return function(e, r) {
		let i = e;
		if (i.is0(r)) return r;
		if (Ss(i, r) !== 1) throw Error("Cannot find square root");
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
function _s(e) {
	return e % rs === ns ? ps : e % os === is ? ms : e % cs === ss ? hs(e) : gs(e);
}
var vs = [
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
function ys(e) {
	if (es(e, vs.reduce((e, t) => (e[t] = "function", e), {
		ORDER: "bigint",
		BYTES: "number",
		BITS: "number"
	})), Bo(e.BYTES, "BYTES"), Bo(e.BITS, "BITS"), e.BYTES < 1 || e.BITS < 1) throw Error("invalid field: expected BYTES/BITS > 0");
	if (e.ORDER <= Q) throw Error("invalid field: expected ORDER > 1, got " + e.ORDER);
	return e;
}
function bs(e, t, n) {
	let r = e;
	if (n < Z) throw Error("invalid exponent, negatives unsupported");
	if (n === Z) return r.ONE;
	if (n === Q) return t;
	let i = r.ONE, a = t;
	for (; n > Z;) n & Q && (i = r.mul(i, a)), a = r.sqr(a), n >>= Q;
	return i;
}
function xs(e, t, n = !1) {
	let r = e, i = Array(t.length).fill(n ? r.ZERO : void 0), a = t.reduce((e, t, n) => r.is0(t) ? e : (i[n] = e, r.mul(e, t)), r.ONE), o = r.inv(a);
	return t.reduceRight((e, t, n) => r.is0(t) ? e : (i[n] = r.mul(e, i[n]), r.mul(e, t)), o), i;
}
function Ss(e, t) {
	let n = e, r = (n.ORDER - Q) / ts, i = n.pow(t, r), a = n.eql(i, n.ONE), o = n.eql(i, n.ZERO), s = n.eql(i, n.neg(n.ONE));
	if (!a && !o && !s) throw Error("invalid Legendre symbol result");
	return a ? 1 : o ? 0 : -1;
}
function Cs(e, t) {
	if (t !== void 0 && Mo(t), e <= Z) throw Error("invalid n length: expected positive n, got " + e);
	if (t !== void 0 && t < 1) throw Error("invalid n length: expected positive bit length, got " + t);
	let n = Qo(e);
	if (t !== void 0 && t < n) throw Error(`invalid n length: expected bit length (${n}) >= n.length (${t})`);
	let r = t === void 0 ? n : t;
	return {
		nBitLength: r,
		nByteLength: Math.ceil(r / 8)
	};
}
var ws = /* @__PURE__ */ new WeakMap(), Ts = class {
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
		let { nBitLength: r, nByteLength: i } = Cs(e, n);
		if (i > 2048) throw Error("invalid field: expected ORDER of <= 2048 bytes");
		this.ORDER = e, this.BITS = r, this.BYTES = i, Object.freeze(this);
	}
	create(e) {
		return ls(e, this.ORDER);
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
		return ls(-e, this.ORDER);
	}
	eql(e, t) {
		return e === t;
	}
	sqr(e) {
		return ls(e * e, this.ORDER);
	}
	add(e, t) {
		return ls(e + t, this.ORDER);
	}
	sub(e, t) {
		return ls(e - t, this.ORDER);
	}
	mul(e, t) {
		return ls(e * t, this.ORDER);
	}
	pow(e, t) {
		return bs(this, e, t);
	}
	div(e, t) {
		return ls(e * ds(t, this.ORDER), this.ORDER);
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
		return ds(e, this.ORDER);
	}
	sqrt(e) {
		let t = ws.get(this);
		return t || ws.set(this, t = _s(this.ORDER)), t(this, e);
	}
	toBytes(e) {
		return this.isLE ? Ko(e, this.BYTES) : Go(e, this.BYTES);
	}
	fromBytes(e, t = !1) {
		jo(e);
		let { _lengths: n, BYTES: r, isLE: i, ORDER: a, _mod: o } = this;
		if (n) {
			if (e.length < 1 || !n.includes(e.length) || e.length > r) throw Error("Field.fromBytes: expected " + n + " bytes, got " + e.length);
			let t = new Uint8Array(r);
			t.set(e, i ? 0 : t.length - e.length), e = t;
		}
		if (e.length !== r) throw Error("Field.fromBytes: expected " + r + " bytes, got " + e.length);
		let s = i ? Wo(e) : Uo(e);
		if (o && (s = ls(s, a)), !t && !this.isValid(s)) throw Error("invalid field element: outside of range 0..ORDER");
		return s;
	}
	invertBatch(e) {
		return xs(this, e);
	}
	cmov(e, t, n) {
		return Ro(n, "condition"), n ? t : e;
	}
};
Object.freeze(Ts.prototype);
function Es(e, t = {}) {
	return new Ts(e, t);
}
function Ds(e) {
	if (typeof e != "bigint") throw Error("field order must be bigint");
	if (e <= Q) throw Error("field order must be greater than 1");
	let t = Qo(e - Q);
	return Math.ceil(t / 8);
}
function Os(e) {
	let t = Ds(e);
	return t + Math.ceil(t / 2);
}
function ks(e, t, n = !1) {
	jo(e);
	let r = e.length, i = Ds(t), a = Math.max(Os(t), 16);
	if (r < a || r > 1024) throw Error("expected " + a + "-1024 bytes of input, got " + r);
	let o = ls(n ? Wo(e) : Uo(e), t - Q) + Q;
	return n ? Ko(o, i) : Go(o, i);
}
//#endregion
//#region node_modules/@noble/curves/abstract/curve.js
var As = /* @__PURE__ */ BigInt(0), js = /* @__PURE__ */ BigInt(1);
function Ms(e, t) {
	let n = t.negate();
	return e ? n : t;
}
function Ns(e, t) {
	let n = xs(e.Fp, t.map((e) => e.Z));
	return t.map((t, r) => e.fromAffine(t.toAffine(n[r])));
}
function Ps(e, t) {
	if (!Number.isSafeInteger(e) || e <= 0 || e > t) throw Error("invalid window size, expected [1.." + t + "], got W=" + e);
}
function Fs(e, t) {
	Ps(e, t);
	let n = Math.ceil(t / e) + 1, r = 2 ** (e - 1), i = 2 ** e;
	return {
		windows: n,
		windowSize: r,
		mask: $o(e),
		maxNumber: i,
		shiftBy: BigInt(e)
	};
}
function Is(e, t, n) {
	let { windowSize: r, mask: i, maxNumber: a, shiftBy: o } = n, s = Number(e & i), c = e >> o;
	s > r && (s -= a, c += js);
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
var Ls = /* @__PURE__ */ new WeakMap(), Rs = /* @__PURE__ */ new WeakMap();
function zs(e) {
	return Rs.get(e) || 1;
}
function Bs(e) {
	if (e !== As) throw Error("invalid wNAF");
}
var Vs = class {
	BASE;
	ZERO;
	Fn;
	bits;
	constructor(e, t) {
		this.BASE = e.BASE, this.ZERO = e.ZERO, this.Fn = e.Fn, this.bits = t;
	}
	_unsafeLadder(e, t, n = this.ZERO) {
		let r = e;
		for (; t > As;) t & js && (n = n.add(r)), r = r.double(), t >>= js;
		return n;
	}
	precomputeWindow(e, t) {
		let { windows: n, windowSize: r } = Fs(t, this.bits), i = [], a = e, o = a;
		for (let e = 0; e < n; e++) {
			o = a, i.push(o);
			for (let e = 1; e < r; e++) o = o.add(a), i.push(o);
			a = o.double();
		}
		return i;
	}
	wNAF(e, t, n) {
		if (!this.Fn.isValid(n)) throw Error("invalid scalar");
		let r = this.ZERO, i = this.BASE, a = Fs(e, this.bits);
		for (let e = 0; e < a.windows; e++) {
			let { nextN: o, offset: s, isZero: c, isNeg: l, isNegF: u, offsetF: d } = Is(n, e, a);
			n = o, c ? i = i.add(Ms(u, t[d])) : r = r.add(Ms(l, t[s]));
		}
		return Bs(n), {
			p: r,
			f: i
		};
	}
	wNAFUnsafe(e, t, n, r = this.ZERO) {
		let i = Fs(e, this.bits);
		for (let e = 0; e < i.windows && n !== As; e++) {
			let { nextN: a, offset: o, isZero: s, isNeg: c } = Is(n, e, i);
			if (n = a, !s) {
				let e = t[o];
				r = r.add(c ? e.negate() : e);
			}
		}
		return Bs(n), r;
	}
	getPrecomputes(e, t, n) {
		let r = Ls.get(t);
		return r || (r = this.precomputeWindow(t, e), e !== 1 && (typeof n == "function" && (r = n(r)), Ls.set(t, r))), r;
	}
	cached(e, t, n) {
		let r = zs(e);
		return this.wNAF(r, this.getPrecomputes(r, e, n), t);
	}
	unsafe(e, t, n, r) {
		let i = zs(e);
		return i === 1 ? this._unsafeLadder(e, t, r) : this.wNAFUnsafe(i, this.getPrecomputes(i, e, n), t, r);
	}
	createCache(e, t) {
		Ps(t, this.bits), Rs.set(e, t), Ls.delete(e);
	}
	hasCache(e) {
		return zs(e) !== 1;
	}
};
function Hs(e, t, n, r) {
	let i = t, a = e.ZERO, o = e.ZERO;
	for (; n > As || r > As;) n & js && (a = a.add(i)), r & js && (o = o.add(i)), i = i.double(), n >>= js, r >>= js;
	return {
		p1: a,
		p2: o
	};
}
function Us(e, t, n) {
	if (t) {
		if (t.ORDER !== e) throw Error("Field.ORDER must match order: Fp == p, Fn == n");
		return ys(t), t;
	} else return Es(e, { isLE: n });
}
function Ws(e, t, n = {}, r) {
	if (r === void 0 && (r = e === "edwards"), !t || typeof t != "object") throw Error(`expected valid ${e} CURVE object`);
	for (let e of [
		"p",
		"n",
		"h"
	]) {
		let n = t[e];
		if (!(typeof n == "bigint" && n > As)) throw Error(`CURVE.${e} must be positive bigint`);
	}
	let i = Us(t.p, n.Fp, r), a = Us(t.n, n.Fn, r), o = [
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
function Gs(e, t) {
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
var Ks = (e, t) => (e + (e >= 0 ? t : -t) / Zs) / t;
function qs(e, t, n) {
	Zo("scalar", e, Ys, n);
	let [[r, i], [a, o]] = t, s = Ks(o * e, n), c = Ks(-i * e, n), l = e - s * r - c * a, u = -s * i - c * o, d = l < Ys, f = u < Ys;
	d && (l = -l), f && (u = -u);
	let p = $o(Math.ceil(Qo(n) / 2)) + Xs;
	if (l < Ys || l >= p || u < Ys || u >= p) throw Error("splitScalar (endomorphism): failed for k");
	return {
		k1neg: d,
		k1: l,
		k2neg: f,
		k2: u
	};
}
var Js = {
	Err: class extends Error {
		constructor(e = "") {
			super(e);
		}
	},
	_tlv: {
		encode: (e, t) => {
			let { Err: n } = Js;
			if (Bo(e, "tag"), e < 0 || e > 255) throw new n("tlv.encode: wrong tag");
			if (typeof t != "string") throw TypeError("\"data\" expected string, got type=" + typeof t);
			if (t.length & 1) throw new n("tlv.encode: unpadded data");
			let r = t.length / 2, i = Vo(r);
			if (i.length / 2 & 128) throw new n("tlv.encode: long form length too big");
			let a = r > 127 ? Vo(i.length / 2 | 128) : "";
			return Vo(e) + a + i + t;
		},
		decode(e, t) {
			let { Err: n } = Js;
			t = jo(t, void 0, "DER data");
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
			let { Err: t } = Js;
			if (zo(e), e < Ys) throw new t("integer: negative integers are not allowed");
			let n = Vo(e);
			if (Number.parseInt(n[0], 16) & 8 && (n = "00" + n), n.length & 1) throw new t("unexpected DER parsing assertion: unpadded hex");
			return n;
		},
		decode(e) {
			let { Err: t } = Js;
			if (e.length < 1) throw new t("invalid signature integer: empty");
			if (e[0] & 128) throw new t("invalid signature integer: negative");
			if (e.length > 1 && e[0] === 0 && !(e[1] & 128)) throw new t("invalid signature integer: unnecessary leading zero");
			return Uo(e);
		}
	},
	toSig(e) {
		let { Err: t, _int: n, _tlv: r } = Js, i = jo(e, void 0, "signature"), { v: a, l: o } = r.decode(48, i);
		if (o.length) throw new t("invalid signature: left bytes after parsing");
		let { v: s, l: c } = r.decode(2, a), { v: l, l: u } = r.decode(2, c);
		if (u.length) throw new t("invalid signature: left bytes after parsing");
		return {
			r: n.decode(s),
			s: n.decode(l)
		};
	},
	hexFromSig(e) {
		let { _tlv: t, _int: n } = Js, r = t.encode(2, n.encode(e.r)) + t.encode(2, n.encode(e.s));
		return t.encode(48, r);
	}
};
Object.freeze(Js._tlv), Object.freeze(Js._int), Object.freeze(Js);
var Ys = /* @__PURE__ */ BigInt(0), Xs = /* @__PURE__ */ BigInt(1), Zs = /* @__PURE__ */ BigInt(2), Qs = /* @__PURE__ */ BigInt(3), $s = /* @__PURE__ */ BigInt(4);
function ec(e, t = {}) {
	let n = Ws("weierstrass", e, t), r = n.Fp, i = n.Fn, a = n.CURVE, { h: o, n: s } = a;
	es(t, {}, {
		allowInfinityPoint: "boolean",
		clearCofactor: "function",
		isTorsionFree: "function",
		fromBytes: "function",
		toBytes: "function",
		endo: "object"
	});
	let { endo: c, allowInfinityPoint: l } = t;
	if (c && (!r.is0(a.a) || typeof c.beta != "bigint" || !Array.isArray(c.basises))) throw Error("invalid endo: expected \"beta\": bigint and \"basises\": array");
	let u = nc(r, i);
	function d() {
		if (!r.isOdd) throw Error("compression is not supported: Field does not have .isOdd()");
	}
	function f(e, t, n) {
		if (l && t.is0()) return Uint8Array.of(0);
		let { x: i, y: a } = t.toAffine(), o = r.toBytes(i);
		return Ro(n, "isCompressed"), n ? (d(), Po(tc(!r.isOdd(a)), o)) : Po(Uint8Array.of(4), o, r.toBytes(a));
	}
	function p(e) {
		jo(e, void 0, "Point");
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
	let v = r.mul(r.pow(a.a, Qs), $s), y = r.mul(r.sqr(a.b), BigInt(27));
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
		return qs(e, c.basises, i.ORDER);
	}
	function C(e, t, n, i, a) {
		return n = new w(r.mul(n.X, e), n.Y, n.Z), t = Ms(i, t), n = Ms(a, n), t.add(n);
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
			let t = w.fromAffine(h(jo(e, void 0, "point")));
			return t.assertValidity(), t;
		}
		static fromHex(e) {
			return w.fromBytes(Fo(e));
		}
		get x() {
			return this.toAffine().x;
		}
		get y() {
			return this.toAffine().y;
		}
		precompute(e = 8, t = !0) {
			return E.createCache(this, e), t || this.multiply(Qs), this;
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
			let { a: e, b: t } = a, n = r.mul(t, Qs), { X: i, Y: o, Z: s } = this, c = r.ZERO, l = r.ZERO, u = r.ZERO, d = r.mul(i, i), f = r.mul(o, o), p = r.mul(s, s), m = r.mul(i, o);
			return m = r.add(m, m), u = r.mul(i, s), u = r.add(u, u), c = r.mul(e, u), l = r.mul(n, p), l = r.add(c, l), c = r.sub(f, l), l = r.add(f, l), l = r.mul(c, l), c = r.mul(m, c), u = r.mul(n, u), p = r.mul(e, p), m = r.sub(d, p), m = r.mul(e, m), m = r.add(m, u), u = r.add(d, d), d = r.add(u, d), d = r.add(d, p), d = r.mul(d, m), l = r.add(l, d), p = r.mul(o, s), p = r.add(p, p), d = r.mul(p, m), c = r.sub(c, d), u = r.mul(p, f), u = r.add(u, u), u = r.add(u, u), new w(c, l, u);
		}
		add(e) {
			x(e);
			let { X: t, Y: n, Z: i } = this, { X: o, Y: s, Z: c } = e, l = r.ZERO, u = r.ZERO, d = r.ZERO, f = a.a, p = r.mul(a.b, Qs), m = r.mul(t, o), h = r.mul(n, s), g = r.mul(i, c), _ = r.add(t, n), v = r.add(o, s);
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
			let r, a, o = (e) => E.cached(this, e, (e) => Ns(w, e));
			if (n) {
				let { k1neg: t, k1: i, k2neg: s, k2: c } = S(e), { p: l, f: u } = o(i), { p: d, f } = o(c);
				a = u.add(f), r = C(n.beta, l, d, t, s);
			} else {
				let { p: t, f: n } = o(e);
				r = t, a = n;
			}
			return Ns(w, [r, a])[0];
		}
		multiplyUnsafe(e) {
			let { endo: n } = t, r = this, a = e;
			if (!i.isValid(a)) throw RangeError("invalid scalar: out of range");
			if (a === Ys || r.is0()) return w.ZERO;
			if (a === Xs) return r;
			if (E.hasCache(this)) return this.multiply(a);
			if (n) {
				let { k1neg: e, k1: t, k2neg: i, k2: o } = S(a), { p1: s, p2: c } = Hs(w, r, t, o);
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
			return o === Xs ? !0 : e ? e(w, this) : E.unsafe(this, s).is0();
		}
		clearCofactor() {
			let { clearCofactor: e } = t;
			return o === Xs ? this : e ? e(w, this) : this.multiplyUnsafe(o);
		}
		isSmallOrder() {
			return o === Xs ? this.is0() : this.clearCofactor().is0();
		}
		toBytes(e = !0) {
			return Ro(e, "isCompressed"), this.assertValidity(), m(w, this, e);
		}
		toHex(e = !0) {
			return No(this.toBytes(e));
		}
		toString() {
			return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
		}
	}
	let T = i.BITS, E = new Vs(w, t.endo ? Math.ceil(T / 2) : T);
	return T >= 8 && w.BASE.precompute(8), Object.freeze(w.prototype), Object.freeze(w), w;
}
function tc(e) {
	return Uint8Array.of(e ? 2 : 3);
}
function nc(e, t) {
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
var rc = {
	p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
	n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
	h: BigInt(1),
	a: BigInt(0),
	b: BigInt(7),
	Gx: BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),
	Gy: BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")
}, ic = {
	beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
	basises: [[BigInt("0x3086d221a7d46bcde86c90e49284eb15"), -BigInt("0xe4437ed6010e88286f547fa90abfe4c3")], [BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), BigInt("0x3086d221a7d46bcde86c90e49284eb15")]]
}, ac = /* @__PURE__ */ BigInt(0), oc = /* @__PURE__ */ BigInt(2);
function sc(e) {
	let t = rc.p, n = BigInt(3), r = BigInt(6), i = BigInt(11), a = BigInt(22), o = BigInt(23), s = BigInt(44), c = BigInt(88), l = e * e * e % t, u = l * l * e % t, d = us(us(us(u, n, t) * u % t, n, t) * u % t, oc, t) * l % t, f = us(d, i, t) * d % t, p = us(f, a, t) * f % t, m = us(p, s, t) * p % t, h = us(us(us(us(us(us(m, c, t) * m % t, s, t) * p % t, n, t) * u % t, o, t) * f % t, r, t) * l % t, oc, t);
	if (!cc.eql(cc.sqr(h), e)) throw Error("Cannot find square root");
	return h;
}
var cc = Es(rc.p, { sqrt: sc }), lc = /* @__PURE__ */ ec(rc, {
	Fp: cc,
	endo: ic
}), uc = {};
function dc(e, ...t) {
	let n = uc[e];
	if (n === void 0) {
		let t = Ao(Jo(e));
		n = Po(t, t), uc[e] = n;
	}
	return Ao(Po(n, ...t));
}
var fc = (e) => e.toBytes(!0).slice(1), pc = (e) => e % oc === ac;
function mc(e) {
	let { Fn: t, BASE: n } = lc, r = t.fromBytes(e), i = n.multiply(r);
	return {
		scalar: pc(i.y) ? r : t.neg(r),
		bytes: fc(i)
	};
}
function hc(e) {
	let t = cc;
	if (!t.isValidNot0(e)) throw Error("invalid x: Fail if x ≥ p");
	let n = t.create(e * e), r = t.create(n * e + BigInt(7)), i = t.sqrt(r);
	pc(i) || (i = t.neg(i));
	let a = lc.fromAffine({
		x: e,
		y: i
	});
	return a.assertValidity(), a;
}
var gc = Uo;
function _c(...e) {
	return lc.Fn.create(gc(dc("BIP0340/challenge", ...e)));
}
function vc(e) {
	return mc(e).bytes;
}
function yc(e, t, n = bo(32)) {
	let { Fn: r, BASE: i } = lc, a = jo(e, void 0, "message"), { bytes: o, scalar: s } = mc(t), c = jo(n, 32, "auxRand"), l = dc("BIP0340/nonce", r.toBytes(s ^ gc(dc("BIP0340/aux", c))), o, a), u = r.create(gc(l));
	if (u === 0n) throw Error("sign failed: k is zero");
	let d = i.multiply(u), f = pc(d.y) ? u : r.neg(u), p = fc(d), m = _c(p, o, a), h = /* @__PURE__ */ new Uint8Array(64);
	if (h.set(p, 0), h.set(r.toBytes(r.create(f + m * s)), 32), !bc(h, a, o)) throw Error("sign: Invalid signature produced");
	return h;
}
function bc(e, t, n) {
	let { Fp: r, Fn: i, BASE: a } = lc, o = jo(e, 64, "signature"), s = jo(t, void 0, "message"), c = jo(n, 32, "publicKey");
	try {
		let e = hc(gc(c)), t = gc(o.subarray(0, 32));
		if (!r.isValidNot0(t)) return !1;
		let n = gc(o.subarray(32, 64));
		if (!i.isValidNot0(n)) return !1;
		let l = _c(i.toBytes(t), fc(e), s), u = a.multiplyUnsafe(n).add(e.multiplyUnsafe(i.neg(l))), { x: d, y: f } = u.toAffine();
		return !(u.is0() || !pc(f) || d !== t);
	} catch {
		return !1;
	}
}
var xc = /* @__PURE__ */ (() => {
	let e = (e) => (e = e === void 0 ? bo(48) : e, ks(e, rc.n));
	return Object.freeze({
		keygen: Gs(e, vc),
		getPublicKey: vc,
		sign: yc,
		verify: bc,
		Point: lc,
		utils: Object.freeze({
			randomSecretKey: e,
			taggedHash: dc,
			lift_x: hc,
			pointToBytes: fc
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
var Sc = new TextEncoder(), Cc = "https://w3id.org/security#";
function wc() {
	return {
		id: "",
		created: "",
		dateDeleted: "",
		content: "",
		maker: "",
		sig: ""
	};
}
function Tc(e) {
	return JSON.stringify(e);
}
function Ec(e) {
	return mo(Ao(Sc.encode(Tc(e))));
}
function Dc(e, t, n) {
	return xc.verify(_o(e), _o(Ec(t)), _o(n));
}
function Oc(e, t) {
	return mo(xc.sign(_o(Ec(e)), _o(t)));
}
//#endregion
//#region src/utils/keyHelpers/otherHelpers.ts
var kc = (e) => {
	let t = A.any(e, E.space("preferencesFile"), null, e.doc())?.value;
	if (t = t?.split("/").slice(0, -2).join("/"), !t) throw Error(`prefererencesFile is expected to exist in ${e}`);
	return t;
}, Ac = (e) => {
	let t;
	try {
		t = `${kc(e)}/profile/keys/publicKey.ttl`;
	} catch (e) {
		I(e);
	}
	return t;
}, jc = (e) => {
	let t;
	try {
		t = `${kc(e)}/settings/keys/privateKey.ttl`;
	} catch (e) {
		I(e);
	}
	return t;
};
async function Mc(e, t) {
	return await Pc(e, t, "publicKey");
}
async function Nc(e, t) {
	return await Pc(e, t, "privateKey");
}
async function Pc(e, t, n) {
	try {
		return await A.fetcher.load(t), A.any(e, E.solid(n))?.value;
	} catch (e) {
		if (e.response.status === 404) {
			P("createIfNotExists: doc does NOT exist, will create... " + t);
			try {
				await A.fetcher.webOperation("PUT", t, {
					data: "",
					contentType: "text/turtle"
				});
			} catch (e) {
				throw P("createIfNotExists doc FAILED: " + t + ": " + e), e;
			}
			delete A.fetcher.requested[t];
			return;
		} else throw P("createIfNotExists doc FAILED: " + t + ": " + e), e;
	}
}
//#endregion
//#region src/utils/keyHelpers/acl.ts
async function Fc(e, t) {
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
		P("delete " + n.value + " " + e.response.status);
	}
}
var Ic = (e) => `
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
`, Lc = (e, t) => {
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
function Rc() {
	return mo(xc.utils.randomSecretKey());
}
function zc(e) {
	return mo(xc.getPublicKey(_o(e)));
}
async function Bc(e) {
	await A.fetcher.load(e);
	let t = await Ac(e);
	try {
		return await A.fetcher.load(t), A.any(e, E.solid("publicKey"))?.value;
	} catch {
		return;
	}
}
async function Vc(e) {
	await A.fetcher.load(e);
	let t = await Ac(e), n = await jc(e), r = await Mc(e, t), i = await Nc(e, n), a = !0;
	if (i && r !== zc(i) && confirm("This is strange the publicKey is not valid for\n" + e?.uri + "'shall we repair keeping the private key ?") && (a = !1), !i || !r || !a) {
		let s = [], c = [];
		if (i || (i = Rc(), c = [o(e, E.solid("privateKey"), le(i), A.sym(n))], await Uc(n, [], c, e.uri)), !r || !a) {
			s = [], r && (s = [o(e, E.solid("publicKey"), x(r), A.sym(t))], P("delete invalid publicKey " + s));
			let n = zc(i);
			c = [o(e, E.solid("publicKey"), le(n), A.sym(t))], await Uc(t, s, c);
		}
		await Fc(n.substring(0, n.lastIndexOf("/") + 1), Ic(e.uri));
	}
	return i;
}
var Hc = async (e) => {
	await A.fetcher.load(e);
	let t = A.any(A.sym(e), A.sym("http://www.iana.org/assignments/link-relations/acl"));
	if (t) try {
		let e = await A.fetcher.webOperation("DELETE", t.value);
		P("delete keyAcl" + t.value + " " + e.status);
	} catch (e) {
		if (e.response.status !== 404) throw Error(e);
		P("delete keyAcl" + t.value + " " + e.response.status);
	}
};
async function Uc(e, t, n, r = "") {
	await Hc(e), await A.updater.updateMany(t, n), await Fc(e, Lc(e, r));
}
//#endregion
//#region src/chat/chatLogic.js
var Wc = class {
	constructor(e, t) {
		this.channel = e, this.channelRoot = e.doc(), this.options = t, this.dateFolder = new no(this.channelRoot, "chat.ttl"), this.div = null;
	}
	async createMessage(e) {
		return this.updateMessage(e);
	}
	async updateMessage(e, t = null, n, r = null) {
		let i = [], a = /* @__PURE__ */ new Date(), s = "" + a.getTime(), c = ce(a), l = t ? t.doc() : this.dateFolder.leafDocumentFromDate(a), u = A.sym(l.uri + "#Msg" + s), d = S.currentUser(), f = wc();
		if (f.id = u.uri, t) {
			let e = A.any(t, E.foaf("maker"));
			if (e.uri === d.uri) {
				let e = await qc(t);
				i.push(o(e, E.dct("isReplacedBy"), u, l));
				let r = A.any(e, E.sioc("has_reply"));
				r && i.push(o(u, E.sioc("has_reply"), r, l)), n && i.push(o(u, E.schema("dateDeleted"), c, l));
			} else {
				let t = "Error you cannot delete/edit a message from someone else : \n" + e.uri;
				throw F(t), alert(t), Error(t);
			}
		} else i.push(o(this.channel, E.wf("message"), u, l));
		if (i.push(o(u, E.sioc("content"), A.literal(e), l)), f.content = e, i.push(o(u, E.dct("created"), c, l)), f.created = c.value, d) {
			i.push(o(u, E.foaf("maker"), d, l)), f.maker = d.uri;
			let e = Oc(f, await Vc(d));
			i.push(o(u, _(`${Cc}proofValue`), x(e), l));
		}
		r && (i.push(o(r, E.sioc("has_member"), u, l)), r.doc().sameTerm(u.doc()) || i.push(o(r, E.sioc("has_member"), u, r.doc())));
		try {
			await A.updater.updateMany([], i);
		} catch (e) {
			let t = "Error saving chat message: " + e;
			throw F(t), alert(t), Error(t);
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
async function Gc(e) {
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
async function Kc(e) {
	let t = e, n = {};
	for (; t;) {
		if (n[t.uri]) return I("originalVersion: verion loop" + e), e;
		n[t.uri] = !0, e = t, await A.fetcher.load(e), t = A.any(null, E.dct("isReplacedBy"), e, e.doc());
	}
	return e;
}
async function qc(e) {
	let t = e, n = {};
	for (; t;) {
		if (n[t.uri]) return I("mostRecentVersion: verion loop" + e), e;
		n[t.uri] = !0, e = t, await A.fetcher.load(e), t = A.any(e, E.dct("isReplacedBy"), null, e.doc());
	}
	return e;
}
function Jc(e) {
	return A.holds(e, E.schema("dateDeleted"), null, e.doc());
}
//#endregion
//#region src/lib/participation.ts
var Yc = /* @__PURE__ */ r({
	manageParticipation: () => el,
	participationObject: () => Qc,
	recordParticipation: () => $c,
	renderParticipants: () => Zc
}), Xc = w.store;
function Zc(e, t, n, r, i, a) {
	t.setAttribute("style", V.participantsStyle);
	let o = function(n) {
		let r = Xc.any(n, E.wf("participant")), i;
		if (!r) return i = e.createElement("tr"), i.textContent = "???", i;
		let o = Xc.anyValue(n, E.ui("backgroundColor")) || B.participationDefaultBackground, s = e.createElement("div");
		s.setAttribute("style", V.participantsBlock), s.style.backgroundColor = o, i = Yn(e, null, r, a), t.appendChild(i);
		let c = e.createElement("td");
		return c.setAttribute("style", V.personTableTD), c.appendChild(s), i.insertBefore(c, i.firstChild), i;
	}, s = function() {
		let e = Xc.each(r, E.wf("participation")).map(function(e) {
			return P("in participants"), [Xc.anyValue(e, E.cal("dtstart")) || "9999-12-31", e];
		});
		e.sort(), tt(t, e.map(function(e) {
			return e[1];
		}), o);
	};
	return t.refresh = s, s(), t;
}
function Qc(e, t, n) {
	return new Promise(function(r, i) {
		if (!n) throw Error("No user id");
		let a = Xc.each(e, E.wf("participation")).filter(function(e) {
			return Xc.holds(e, E.wf("participant"), n);
		});
		if (a.length > 1) {
			let e = [];
			for (let t of a) {
				let n = Xc.anyValue(t, E.cal("dtstart"));
				n && e.push([n, t]);
			}
			e.sort(), F("Multiple participation objects, picking earliest, in " + t), r(e[0][1]);
		}
		if (a.length) r(a[0]);
		else {
			let a = X(t), s = [
				o(e, E.wf("participation"), a, t),
				o(a, E.wf("participant"), n, t),
				o(a, E.cal("dtstart"), /* @__PURE__ */ new Date(), t),
				o(a, E.ui("backgroundColor"), il(n), t)
			];
			Xc.updater.update([], s, function(e, t, n) {
				t ? r(a) : i(/* @__PURE__ */ Error("Error recording your participation: " + n));
			}), r(a);
		}
	});
}
function $c(e, t, n) {
	let r = S.currentUser();
	if (!r) return;
	let i = Xc.each(e, E.wf("participation")).filter(function(e) {
		return Xc.holds(e, E.wf("participant"), r);
	});
	if (i.length > 1) throw Error("Multiple records of your participation");
	if (i.length) return i[0];
	{
		if (!Xc.updater.editable(t)) return P("Not recording participation, as no write access as " + r + " to " + t), null;
		let i = X(t), a = [
			o(e, E.wf("participation"), i, t),
			o(i, E.wf("participant"), r, t),
			o(i, E.cal("dtstart"), /* @__PURE__ */ new Date(), t),
			o(i, E.ui("backgroundColor"), il(r), t)
		];
		return Xc.updater.update([], a, function(e, t, r) {
			if (!t) throw Error("Error recording your participation: " + r);
			n && n.refresh && n.refresh();
		}), i;
	}
}
function el(e, t, n, r, i, a) {
	let o = e.createElement("table");
	t.appendChild(o), Zc(e, o, n, r, i, a);
	try {
		$c(r, n, o);
	} catch (n) {
		t.appendChild(H(e, "Error recording your participation: " + n));
	}
	return o;
}
//#endregion
//#region src/lib/pad.ts
var tl = /* @__PURE__ */ r({
	getChunks: () => ol,
	lightColorHash: () => il,
	manageParticipation: () => el,
	notepad: () => al,
	notepadToHTML: () => cl,
	participationObject: () => Qc,
	recordParticipation: () => $c,
	renderParticipants: () => Zc,
	xmlEncode: () => sl
}), nl = w.store, rl = p("http://www.w3.org/ns/pim/pad#");
function il(e) {
	return e && e.uri ? "#" + (function(e) {
		return e.split("").reduce(function(e, t) {
			return e = (e << 5) - e + t.charCodeAt(0), e & e;
		}, 0);
	}(e.uri) & 16777215 | 12632256).toString(16) : "#ffffff";
}
function al(e, t, n, r, i) {
	i ||= {};
	let a = i.exists, s = e.createElement("table"), c = nl;
	if (r && !r.uri) throw Error("UI.pad.notepad:  Invalid userid");
	let l = nl.updater, u = p("http://www.w3.org/ns/pim/pad#");
	s.setAttribute("style", V.notepadStyle);
	let d = null, f = null;
	if (i.statusArea) {
		let t = i.statusArea.appendChild(e.createElement("table")).appendChild(e.createElement("tr"));
		d = t.appendChild(e.createElement("td")), f = t.appendChild(e.createElement("td")), d && d.setAttribute("style", V.upstreamStatus), f && f.setAttribute("style", V.downstreamStatus);
	}
	let m = function(t, n = !1) {
		P(t), i.statusArea && (n ? d : f).appendChild(H(e, t, "pink"));
	}, h = function(e) {
		i.statusArea && (i.statusArea.innerHTML = "");
	}, _ = function(e, t, n) {
		let r = e.subject;
		t ||= "";
		let i = V.baseStyle, a = V.headingCore, o = V.headingStyle, s = c.any(r, E.dc("author"));
		if (!t && s) {
			let e = il(s);
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
			P("You can't delete the only line.");
			return;
		}
		let s = c.statementsMatching(r, void 0, void 0, t).concat(c.statementsMatching(void 0, void 0, r, t)), d = [o(i, u("next"), a, t)];
		if (r instanceof g && P("Deleting line " + r.uri.slice(-4)), !l) throw Error("have no updater");
		l.update(s, d, function(t, n, i, a) {
			if (n) {
				let t = e.parentNode;
				if (t) {
					let e = t.previousSibling;
					t.parentNode && t.parentNode.removeChild(t), e && e.firstChild && e.firstChild.focus();
				}
			} else if (a && a.status === 409) _(e, "color: black;  background-color: #ffd;"), e.state = 0, Qe(.5, 512), setTimeout(function() {
				k();
			}, 1e3);
			else {
				P("    removePart FAILED " + r + ": " + i), P("    removePart was deleting :'" + s), _(e, "color: black;  background-color: #fdd;");
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
			r ? _(e) : (P("Indent change FAILED '" + s + "' for " + t + ": " + i), _(e, "color: black;  background-color: #fdd;"), l.requestDownstreamAction(t, k));
		});
	}, b = function(e, n) {
		let r = null;
		e.addEventListener("keydown", function(r) {
			if (!l) throw Error("no updater");
			let i, a;
			switch (r.keyCode) {
				case 13: {
					let t = r.shiftKey;
					if (P("enter"), t ? (a = c.any(void 0, u("next"), n), i = "newlinesAfter") : (a = c.any(n, u("next")), i = "newlinesBefore"), a[i] = a[i] || 0, a[i] += 1, a[i] > 1) {
						P("    queueing newline queue = " + a[i]);
						return;
					}
					P("    go ahead line before " + a[i]), S(e, t);
					break;
				}
				case 8:
					if (e.value.length === 0) switch (P("Delete key line " + n.uri.slice(-4) + " state " + e.state), e.state) {
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
					P("escape"), l.requestDownstreamAction(t, k), r.preventDefault();
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
				if (a) h(!0), _(e), P("    Patch ok '" + r + "' -> '" + u + "' "), e.state === 4 ? (e.state = 3, v(e)) : e.state === 3 || (e.state === 2 ? (e.state = 1, i(e)) : e.state = 0);
				else if (P("    patch FAILED " + s.status + " for '" + r + "' -> '" + u + "': " + o), s.status === 409) _(e, "color: black;  background-color: #fdd;"), e.state = 0, Qe(.5, 512), setTimeout(function() {
					l.requestDownstreamAction(t, k);
				}, 1e3);
				else {
					_(e, "color: black;  background-color: #fdd;");
					let t = s?.status;
					!t || t === 502 || t === 503 ? (e.lastSent = void 0, e.state = 0, setTimeout(() => {
						(e.state === 0 || e.state === void 0) && (e.state = 1, i(e));
					}, 2e3)) : (e.state = 0, m("    Error " + t + " sending data: " + o, !0), Qe(1, 128));
				}
			});
		};
		e.addEventListener("input", function(t) {
			switch (_(e, void 0, !0), P("Input event state " + e.state + " value '" + e.value + "'"), e.state) {
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
		return l.subject = n, l.setAttribute("type", "text"), l.value = a, r ? (_(l, ""), b(l, n)) : (_(l, "color: #222; background-color: #fff"), P("Note can't add listeners - not logged in")), l;
	}, S = function(e, i) {
		let a = nl, s = 0, c = null, d, f, p, m, h;
		e ? (e.tagName.toLowerCase() !== "input" && P("return pressed when current document is: " + e.tagName), d = e.subject, s = a.any(d, u("indent")), s = s ? Number(s.value) : 0, i ? (f = a.any(void 0, u("next"), d), p = d, m = f, c = "newlinesAfter") : (f = d, p = a.any(d, u("next")), m = p, c = "newlinesBefore"), h = e.parentNode) : (f = n, p = n, h = void 0);
		let g = X(t), v = g.uri.slice(-4), y = [o(f, u("next"), p, t)], b = [
			o(f, u("next"), g, t),
			o(g, u("next"), p, t),
			o(g, E.dc("author"), r, t),
			o(g, E.sioc("content"), "", t)
		];
		if (s > 0 && b.push(o(g, u("indent"), s, t)), P("    Fresh chunk " + v + " proposed"), !l) throw Error("no updater");
		l.update(y, b, function(e, t, n, r) {
			if (!t) P("    ERROR writing new line " + v + ": " + n);
			else {
				let e = x(h, g, i);
				_(e), e.focus(), c && (P("    Fresh chunk " + v + " updated, queue = " + m[c]), --m[c], m[c] > 0 && (P("    Implementing queued newlines = " + p.newLinesBefore), S(e, i)));
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
			P(e), i.statusArea && (i.statusArea.textContent += e);
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
		P("    reloaded OK"), h(), C() ? T(s) : m("CONSISTENCY CHECK FAILED");
	}, k = function() {
		if (D) {
			P("   Already reloading - stop");
			return;
		}
		D = !0;
		let e = 1e3, n = function() {
			if (P("try reload - timeout = " + e), !l) throw Error("no updater");
			l.reload(l.store, t, function(r, i, a) {
				D = !1, r ? O() : a.status === 0 ? (m("Network error refreshing the pad. Retrying in " + e / 1e3), D = !0, e *= 2, setTimeout(n, e)) : m("Error " + a.status + "refreshing the pad:" + i + ". Stopped. " + t);
			});
		};
		n();
	};
	if (s.refresh = w, s.reloadAndSync = k, r || P("Warning: must be logged in for pad to be edited"), a) P("Existing pad."), C() ? (w(), c.holds(n, u("next"), n) && S()) : P(s.textContent = "Inconsistent data. Abort");
	else {
		P("No pad exists - making new one.");
		let e = [
			o(n, E.rdf("type"), u("Notepad"), t),
			o(n, E.dc("author"), r, t),
			o(n, E.dc("created"), /* @__PURE__ */ new Date(), t),
			o(n, u("next"), n, t)
		];
		if (!l) throw Error("no updater");
		l.update([], e, function(e, t, n) {
			t ? (P("Initial pad created"), S()) : m(n || "");
		});
	}
	return s;
}
function ol(e, t) {
	let n = [];
	for (let r = t.the(e, rl("next")); !r.sameTerm(e); r = t.the(r, rl("next"))) n.push(r);
	return n;
}
function sl(e) {
	return e.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
}
function cl(e, t) {
	let n = ol(e, t), r = "<html>\n  <head>\n", i = t.anyValue(e, E.dct("title"));
	i && (r += `    <title>${sl(i)}</title>\n`), r += "  </head>\n  <body>\n";
	let a = 0;
	function o(e) {
		for (; a < e; a++) r += "<ul>\n";
	}
	function s(e) {
		for (; a > e; a--) r += "</ul>\n";
	}
	return n.forEach((e) => {
		let n = t.anyJS(e, rl("indent")), i = t.anyJS(e, E.sioc("content"));
		if (!i) return;
		let a = sl(i);
		if (n < 0) {
			s(0);
			let e = n >= -3 ? 4 + n : 1;
			r += `\n<h${e}>${a}</h${e}>\n`;
		} else n > 0 ? (s(n), o(n), r += `<li>${a}</li>\n`) : (s(n), r += `<p>${a}</p>\n`);
	}), s(0), r += "  </body>\n</html>\n", r;
}
//#endregion
//#region src/chat/bookmarks.js
var ll = {
	icons: U,
	ns: E,
	media: Qa,
	pad: tl,
	style: V,
	utils: Ke,
	widgets: Wi
}, ul = p("http://www.w3.org/2002/01/bookmark#"), dl = "noun_45961.svg", fl = N, pl = window.document || null;
function ml(e, t) {
	return new Promise(function(n, r) {
		A.updater.update(e, t, function(e, t, i) {
			t ? n() : r(Error(i));
		});
	});
}
async function hl(e) {
	let t = ul("Bookmark");
	if (await aa(e, t, !0), e.instances && e.instances.length > 0) e.bookmarkDocument = e.instances[0], e.instances.length > 1 && F("More than one bookmark file! " + e.instances);
	else if (e.publicProfile) {
		let n = _(e.publicProfile.dir().uri + "bookmarks.ttl");
		try {
			P("Creating new bookmark file " + n), await A.fetcher.createIfNotExists(n);
		} catch (t) {
			return F("Can't make fresh bookmark file:" + t), e;
		}
		await ee.registerInTypeIndex(n, e.index, t), e.bookmarkDocument = n;
	} else F("You seem to have no bookmark file, nor even a profile file!");
	return e;
}
async function gl(e, t) {
	let n = "", r = S.currentUser();
	if (!r) throw Error("Must be logged on to add Bookmark");
	n = fl(A.any(t, E.foaf("maker"))) + ": " + A.anyValue(t, E.sioc("content")).slice(0, 80);
	let i = e.bookmarkDocument, a = ll.widgets.newThing(i, n), s = [
		o(i, ll.ns.dct("references"), a, i),
		o(a, ll.ns.rdf("type"), ul("Bookmark"), i),
		o(a, ll.ns.dct("created"), /* @__PURE__ */ new Date(), i),
		o(a, ul("recalls"), t, i),
		o(a, ll.ns.foaf("maker"), r, i),
		o(a, ll.ns.dct("title"), n, i)
	];
	try {
		await ml([], s);
	} catch (e) {
		return F("Making bookmark: " + e), null;
	}
	return a;
}
async function _l(e, t, n) {
	await A.fetcher.load(e.bookmarkDocument);
	let r = A.each(null, ul("recalls"), t, e.bookmarkDocument);
	if (r.length) {
		if (!confirm("Delete bookmark on this?" + r.length)) return;
		for (let e = 0; e < r.length; e++) try {
			await ml(A.connectedStatements(r[e]), []), n.style.backgroundColor = "white", P("Bookmark deleted: " + r[e]);
		} catch (e) {
			I("Cant delete bookmark:" + e), F("Cannot delete bookmark:" + e);
		}
	} else {
		let r = await gl(e, t);
		n.style.backgroundColor = "yellow", P("Bookmark added: " + r);
	}
}
async function vl(e, t) {
	async function n(t) {
		await A.fetcher.load(e.bookmarkDocument);
		let n = A.any(null, ul("recalls"), t.target, e.bookmarkDocument);
		t.style = ll.style.buttonStyle, n && (t.style.backgroundColor = "yellow");
	}
	let r;
	if (e.bookmarkDocument) return r = ll.widgets.button(pl, ll.icons.iconBase + dl, fl(ul("Bookmark")), () => {
		_l(e, t, r);
	}), r.target = t, await n(r), r;
}
//#endregion
//#region src/chat/messageTools.js
var yl = window.document, bl = "noun_253504.svg", xl = "noun_1384132.svg", Sl = "noun_1384135.svg", Cl = "noun-reply-5506924.svg", wl = {};
wl[E.schema("AgreeAction")] = "👍", wl[E.schema("DisagreeAction")] = "👎", wl[E.schema("EndorseAction")] = "⭐️", wl[E.schema("LikeAction")] = "❤️";
async function Tl(e, t) {
	let n = yl.createElement("span");
	async function r() {
		if (n.innerHTML = "", Jc(e)) return n;
		let r = (await Gc(e)).map((e) => A.each(null, E.schema("target"), e, t)).flat();
		if (r.length === 0) return n;
		let i = r.map((e) => [
			A.any(e, E.rdf("type"), null, t),
			A.any(e, E.sioc("content"), null, t),
			A.any(e, E.schema("agent"), null, t)
		]);
		i.sort(), i.forEach((e) => {
			let [t, r, i] = e, a;
			i ? (a = yl.createElement("a"), a.setAttribute("href", i.uri)) : a = yl.createTextNode(""), a.textContent = r || wl[t] || "⬜️", n.appendChild(a);
		});
	}
	return r().then(P("sentimentStripLinked: sentimentStripLinked async refreshed")), n.refresh = r, n;
}
async function El(e, t, n, r) {
	async function i() {
		let i = A.any(e, E.foaf("maker"));
		if (!d) alert("You can't delete the message, you are not logged in.");
		else if (d.sameTerm(i)) {
			try {
				await r.deleteMessage(e);
			} catch (e) {
				let r = "Error deleting messaage " + e;
				F(r), alert(r), (n.statusArea || t.parentNode).appendChild(H(yl, r));
			}
			t.parentNode.removeChild(t);
		} else alert("You can't delete the message, you are not logged in as the author, " + i);
		l();
	}
	async function a(t) {
		d.value === A.any(e, E.foaf("maker")).value && (l(), await Fl(t, e, r, n));
	}
	async function s() {
		let t = await r.createThread(e), i = n.chatOptions;
		if (!i) throw Error("replyInThread: missing options");
		i.showThread(t, i), l();
	}
	let c = yl.createElement("div");
	if (await qc(e).value === E.schema("dateDeleted").value) return c;
	function l() {
		c.parentElement.parentElement.removeChild(c.parentElement);
	}
	async function u(e) {
		await A.updater.update(A.connectedStatements(e), []);
	}
	let d = S.currentUser();
	d && A.holds(e, E.foaf("maker"), d) && (c.appendChild(Gn(yl, c, "message", i)), c.appendChild(G(yl, U.iconBase + bl, "edit", () => a(t)))), vl(n).then((e) => {
		e && c.appendChild(e);
	});
	function f(e, n, r, i, a, s) {
		function c() {
			l.style.backgroundColor = p ? "yellow" : "white";
		}
		let l = G(yl, r, N(i), async function(r) {
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
					e && er(t);
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
	if (d = S.currentUser(), d && await qc(e).value !== E.schema("dateDeleted").value) {
		let t = {
			me: d,
			dom: yl,
			div: c
		};
		c.appendChild(f(t, e, U.iconBase + xl, E.schema("AgreeAction"), e.doc(), [E.schema("DisagreeAction")])), c.appendChild(f(t, e, U.iconBase + Sl, E.schema("DisagreeAction"), e.doc(), [E.schema("AgreeAction")]));
	}
	A.any(e, E.dct("created")) && c.appendChild(G(yl, U.iconBase + Cl, "Reply in thread", async () => {
		await s();
	}));
	let p = c.appendChild(Kn(yl));
	return p.style.float = "right", p.firstChild.style.opacity = "0.3", p.addEventListener("click", l), c;
}
//#endregion
//#region src/chat/message.js
var $ = window.document, Dl = V.messageBodyStyle, Ol = N;
function kl(e, t) {
	let n = $.createElement("img"), r = "10";
	t.inlineImageHeightEms && (r = ("" + t.inlineImageHeightEms).trim()), n.setAttribute("style", "max-height: " + r + "em; border-radius: 1em; margin: 0.7em;"), e && n.setAttribute("src", e);
	let i = $.createElement("a");
	return i.setAttribute("href", e), i.setAttribute("target", "images"), i.appendChild(n), on(n, $rdf.sym(e)), i;
}
var Al = function(e, t) {
	let n = $.createElement("a");
	return t && t.uri && (n.setAttribute("href", t.uri), n.addEventListener("click", nr, !0), n.setAttribute("style", "color: #3B5998; text-decoration: none; ")), n.textContent = e, n;
};
function jl(e) {
	let t = A.any(e, E.foaf("nick"));
	return t ? "" + t.value : "" + Ol(e);
}
function Ml(e, t, n, r) {
	let i = e.appendChild(Al(jl(t), t));
	t.uri && A.fetcher.nowOrWhenFetched(t.doc(), void 0, function(e, n) {
		i.textContent = jl(t);
	}), e.appendChild($.createElement("br")), e.appendChild(Al(n, r));
}
function Nl(e, t, n, r) {
	let i = e.appendChild(Al(Ol(t), t));
	t.uri && A.fetcher.nowOrWhenFetched(t.doc(), void 0, function(e, n) {
		i.textContent = jl(t);
	});
	let a = e.appendChild(Al(n, r));
	a.style.fontSize = "80%", a.style.marginLeft = "1em", e.appendChild($.createElement("br"));
}
async function Pl(e, t, n, r, i) {
	let a = !1, o = r.colorizeByAuthor === "1" || r.colorizeByAuthor === !0, s = A.any(t, E.foaf("maker")), c = A.any(t, E.dct("created")), l = await qc(t), u = A.any(l, E.foaf("maker")), d = s.uri === u?.uri ? l : t, f = A.any(d, E.sioc("content")), p = await Gc(d);
	p.length > 1 && P("renderMessageRow versions: ", p.join(",  "));
	let m = p.map((e) => A.each(e, E.sioc("has_reply"))).flat(), h = null, g = [];
	for (let e of m) A.holds(e, E.rdf("type"), E.sioc("Thread")) ? (h = e, P("renderMessageRow: found thread: " + h)) : g.push(e);
	g.length > 1 && P("renderMessageRow: found normal replies: ", g), h ||= A.any(null, E.sioc("has_member"), t);
	let _ = A.any(d, $rdf.sym(`${Cc}proofValue`)), v = wc();
	v.id = d.uri, v.created = A.any(d, E.dct("created")).value, v.content = f.value, v.maker = s.uri, _?.value ? Bc(s).then((e) => {
		e || F("message is signed but " + s.uri + " is missing publicKey"), e?.match(/[0-9A-Fa-f]{6}/g) ? _?.value && !Dc(_?.value, v, e) && F("invalid signature\n" + v.id) : F("invalid publicKey hex string\n" + s.uri + "\n" + e);
	}) : (a = !0, F(d.uri + " is unsigned"));
	let y = await Kc(t), b = !t.sameTerm(y), x = A.the(y, E.dct("created"), null, y.doc()) || A.the(t, E.dct("created"), null, t.doc()), S = $.createElement("tr");
	a && S.setAttribute("style", "background-color: red"), S.AJAR_date = x.value, S.AJAR_subject = t;
	let C = $.createElement("td");
	if (S.appendChild(C), r.authorDateOnLeft) Ml(C, s, jn(x.value), t);
	else {
		let e = $.createElement("img");
		e.setAttribute("style", "max-height: 2.5em; max-width: 2.5em; border-radius: 0.5em; margin: auto;"), Hn(e, s), C.appendChild(e);
	}
	let w = jn(x.value);
	b && (w += " ... " + jn(c.value));
	let T = S.appendChild($.createElement("td"));
	r.authorDateOnLeft || Nl(T, s, w, t);
	let D = f ? f.value.trim() : "??? no content?", O = /^https?:\/[^ <>]*$/i.test(D), k = null;
	if (O) if (/\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(D) && r.expandImagesInline) {
		let e = kl(D, r);
		T.appendChild(e);
	} else {
		let e = T.appendChild($.createElement("a"));
		k = e.appendChild($.createElement("p")), e.href = D, k.textContent = D, T.appendChild(e);
	}
	else k = $.createElement("p"), T.appendChild(k), k.textContent = D;
	if (k) {
		let e = o ? il(s) : ee(n);
		k.setAttribute("style", Dl + "background-color: " + e + ";");
	}
	function ee(e) {
		return e ? "#e8ffe8" : "white";
	}
	let te = await Tl(t, t.doc());
	te.children.length && (T.appendChild($.createElement("br")), T.appendChild(te));
	let ne = $.createElement("td");
	S.appendChild(ne);
	let j = G($, U.iconBase + "noun_243787.svg", "...");
	return ne.appendChild(j), j.addEventListener("click", async function(n) {
		if (S.toolTR) {
			S.parentNode.removeChild(S.toolTR), delete S.toolTR;
			return;
		}
		let a = $.createElement("tr"), o = await El(t, S, {
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
async function Fl(e, t, n, r) {
	let i = e.parentNode, a = Il(n, i, r, n.options, await qc(t));
	i.insertBefore(a, e), a.originalRow = e, e.style.visibility = "hidden";
}
function Il(e, t, n, r, i) {
	function a(e) {
		e.originalRow.style.visibility = "visible", e.parentNode.removeChild(e);
	}
	async function o(e) {
		await s(_.value, !0);
	}
	async function s(a, o) {
		async function s(a, s) {
			if (await Rl(e, t, a, !1, r, n), i) {
				let e = p.originalRow;
				e.parentNode ? e.parentNode.removeChild(e) : (F("No parentNode on old message " + e.textContent), e.style.backgroundColor = "#fee", e.style.visibility = "hidden"), p.parentNode.removeChild(p);
			} else o && (_.value = "", _.setAttribute("style", Dl), _.disabled = !1, _.scrollIntoView(r.newestFirst), _.focus(), _.select());
		}
		o && (_.setAttribute("style", Dl + "color: #bbb;"), _.disabled = !0);
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
		sn(A.fetcher, e, n + "Files", n + "Pictures", async function(e, t) {
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
			e.setAttribute("style", V.buttonStyle + "float: right;"), g.appendChild(e);
		}
		r.menuHandler;
		let u = S.currentUser();
		if (Ml(m, u, "", null), _ = $.createElement("textarea"), h.innerHTML = "", h.appendChild(_), _.rows = 3, i && (_.value = A.anyValue(i, E.sioc("content"), null, i.doc())), _.setAttribute("style", Dl + "background-color: #eef;"), _.addEventListener("keydown", async function(e) {
			e.code === "Enter" && (!e.shiftKey && !r.shiftEnterSendsMessage || e.shiftKey && r.shiftEnterSendsMessage) && await o(e);
		}, !1), an(_, l, c), g.innerHTML = "", v = G($, f, "Send"), v.style.float = "right", v.addEventListener("click", (e) => o(), !1), g.appendChild(v), i) {
			let e = g.appendChild(Kn($));
			e.style.float = "left", e.addEventListener("click", (e) => a(p), !1), g.appendChild(e);
		}
		let d = e.dateFolder.leafDocumentFromDate(/* @__PURE__ */ new Date()), y;
		h.appendChild(Qa.cameraButton($, A, t, n)), $c(e.channel, e.channel.doc());
	}
	let d, f;
	i ? (d = A.anyValue(i, E.dct("created"), null, i.doc()), f = U.iconBase + "noun_1180158.svg") : (f = U.iconBase + "noun_383448.svg", d = "9999-01-01T00:00:00Z");
	let p = $.createElement("tr"), m = $.createElement("td"), h = $.createElement("td"), g = $.createElement("td");
	p.appendChild(m), p.appendChild(h), p.appendChild(g), p.AJAR_date = d;
	let _, v;
	return na({
		div: h,
		dom: $
	}).then((e) => {
		u(), Object.assign(e, n), hl(e).then((e) => {});
	}), p;
}
//#endregion
//#region src/chat/infinite.js
function Ll(e) {
	"Notification" in window ? Notification.permission === "granted" ? new Notification(e) : Notification.permission !== "denied" && Notification.requestPermission().then(function(t) {
		t === "granted" && new Notification(e);
	}) : F("This browser does no t support desktop notification");
}
async function Rl(e, t, n, r, i, a) {
	let o = await Pl(e, n, r, i, a);
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
async function zl(e, t, n, r) {
	async function i(e, t) {
		let n = {}, r, i;
		for (r = t.firstChild; r; r = r.nextSibling) r.AJAR_subject && (n[r.AJAR_subject.uri] = !0);
		let o = A.each(e, E.wf("message"), null, t.chatDocument), s = {};
		for (let e of o) s[e.uri] = !0, n[e.uri] || await a(e, t);
		for (r = t.firstChild; r;) i = r.nextSibling, r.AJAR_subject && !s[r.AJAR_subject.uri] && t.removeChild(r), r = i;
		for (r = t.firstChild; r; r = r.nextSibling) r.AJAR_subject && er(r);
	}
	async function a(e, t) {
		if (Jc(e) && !r.showDeletedMessages) return;
		let n = A.any(null, E.sioc("has_member"), e, e.doc()), i = A.any(e, E.sioc("id"), null, e.doc());
		if (i && !n && (n = A.any(null, E.sioc("has_member"), i, e.doc())), r.thread) {
			if (!A.holds(e, E.sioc("has_reply"), r.thread) && !(n && n.sameTerm(r.thread))) return;
		} else if (n) return;
		t.fresh || await Rl(h, t, e, t.fresh, r, y);
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
			return i.response && i.response.status && i.response.status === 404 ? await l(t, n) : (P("*** Error NON 404 for chat file " + r), a.appendChild(H(e, i, "pink")), a);
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
			let e = Il(h, c, y, r);
			m ? c.insertBefore(e, c.firstChild) : c.appendChild(e), c.inputRow = e;
		}
		{
			let n = e.createElement("tr"), i = n.appendChild(e.createElement("td"));
			i.style = "text-align: center; vertical-align: middle; color: #888; font-style: italic;", i.textContent = jn(t.toISOString(), !0);
			let a = n.appendChild(e.createElement("td"));
			r.includeRemoveButton && a.appendChild(Kn(e, (e) => {
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
			await u(/* @__PURE__ */ new Date()), await i(n, r), Ll(n);
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
	let m = r.newestFirst === "1" || r.newestFirst === !0, h = new Wc(n, r), g = h.dateFolder, _ = e.createElement("div");
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
var Bl = /* @__PURE__ */ r({
	get: () => Ul,
	getPreferencesForClass: () => Yl,
	recordPersonalDefaults: () => Kl,
	recordSharedPreferences: () => Gl,
	renderPreferencesForm: () => ql,
	set: () => Wl,
	value: () => Hl
}), Vl = A, Hl = [];
function Ul(e) {
	return Hl[e];
}
function Wl(e, t) {
	if (typeof t != "string") throw P("Non-string value of preference " + e + ": " + t), Error("Non-string value of preference " + e + ": " + t);
	this.value[e] = t;
}
function Gl(e, t) {
	return new Promise(function(n, r) {
		let i = Vl.any(e, E.ui("sharedPreferences"));
		if (i) t.sharedPreferences = i, n(t);
		else {
			Vl.updater.editable(e.doc()) || (P(` Cant make shared preferences, may not change ${e.doc}`), n(t));
			let i = _(e.doc().uri + "#SharedPreferences"), a = [o(e, E.ui("sharedPreferences"), i, e.doc())];
			P("Creating shared preferences " + i), Vl.updater.update([], a, function(e, a, o) {
				a ? (t.sharedPreferences = i, n(t)) : r(/* @__PURE__ */ Error("Error creating shared prefs: " + o));
			});
		}
	});
}
function Kl(e, t) {
	return new Promise(function(n, r) {
		ra(t).then((t) => {
			if (!t.preferencesFile) {
				P("Not doing private class preferences as no access to preferences file. " + t.preferencesFileError);
				return;
			}
			let i = Vl.each(null, E.solid("forClass"), e, t.preferencesFile), a = [], s, c;
			if (i.length) if (i.forEach((e) => {
				s ||= Vl.any(e, E.solid("personalDefaults"));
			}), s) {
				t.personalDefaults = s, n(t);
				return;
			} else s = X(t.preferencesFile), c = i[0];
			else c = X(t.preferencesFile), a = [o(c, E.rdf("type"), E.solid("TypeRegistration"), t.preferencesFile), o(c, E.solid("forClass"), e, t.preferencesFile)];
			s = X(t.preferencesFile), a.push(o(c, E.solid("personalDefaults"), s, t.preferencesFile)), Vl.updater.update([], a, function(i, a, o) {
				a ? (t.personalDefaults = s, n(t)) : r(/* @__PURE__ */ Error("Setting preferences for " + e + ": " + o));
			});
		}, (e) => {
			r(e);
		});
	});
}
function ql(e, t, n, r) {
	let i = r.dom.createElement("div");
	return Qc(e, e.doc(), r.me).then((a) => {
		let o = r.dom;
		function s(e) {
			i.appendChild(o.createElement("h5")).textContent = e;
		}
		s("My view of this " + r.noun), Di(o, i, {}, a, n, e.doc(), (e, t) => {
			e || On(r, t);
		}), s("Everyone's  view of this " + r.noun), Gl(e, r).then((r) => {
			let a = r.sharedPreferences;
			Di(o, i, {}, a, n, e.doc(), (e, t) => {
				e || On(r, t);
			}), s("My default view of any " + r.noun), Kl(t, r).then((e) => {
				Di(o, i, {}, e.personalDefaults, n, e.preferencesFile, (t, n) => {
					t || On(e, n);
				});
			}, (e) => {
				On(r, e);
			});
		});
	}, (e) => {
		i.appendChild(H(r.dom, e));
	}), i;
}
function Jl(e) {
	return e.datatype ? e.datatype.equals(E.xsd("boolean")) ? e.value === "1" : e.datatype.equals(E.xsd("dateTime")) || e.datatype.equals(E.xsd("date")) ? new Date(e.value) : e.datatype.equals(E.xsd("integer")) || e.datatype.equals(E.xsd("float")) || e.datatype.equals(E.xsd("decimal")) ? Number(e.value) : e.value : e;
}
function Yl(e, t, n, r) {
	return new Promise(function(i, a) {
		Gl(e, r).then((r) => {
			let o = r.sharedPreferences;
			if (r.me) Qc(e, e.doc(), r.me).then((e) => {
				Kl(t, r).then((t) => {
					let r = [], a = t.personalDefaults;
					n.forEach((t) => {
						let n = Vl.any(e, t) || Vl.any(o, t) || Vl.any(a, t);
						n && (r[t.uri] = Jl(n));
					}), i(r);
				}, a);
			}, a);
			else {
				let e = [];
				n.forEach((t) => {
					let n = Vl.any(o, t);
					n && (e[t.uri] = Jl(n));
				}), i(e);
			}
		});
	});
}
//#endregion
//#region src/lib/table.js
var Xl = {
	icons: U,
	log: ge,
	ns: E,
	utils: Ke,
	widgets: Wi
};
function Zl(e, t) {
	let n = t.sourceDocument, r = t.tableClass, i = t.query, a = Xl.ns, o = A, s = {}, c = {
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
		Ie(S.query, S.logicalRows, S.columns, S);
	};
	let S;
	if (i) S = ze(i), x.appendChild(S);
	else {
		let e = me();
		m = e[0], h = e[1], r || g.appendChild(ae(m, h)), y = Be(h), O(y || m);
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
		r ||= o.variable("_any"), e.pat.add(t, Xl.ns.rdf("type"), r);
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
		let n = ze(e, t);
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
			return N(this.type);
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
			return this.getHints().label ? this.getHints().label : this.predicate ? this.predicate.sameTerm(a.rdf("type")) && this.superClass ? N(this.superClass, !0) : N(this.predicate) : this.variable ? this.variable.toString() : "unlabeled column?";
		}, this.setPredicate = function(e, t, n) {
			t ? (this.inverse = e, this.constraints = this.constraints.concat(o.each(e, Xl.ns.rdfs("domain"))), e.sameTerm(a.rdfs("subClassOf")) && n.termType === "NamedNode" && (this.superClass = n, this.alternatives = o.each(void 0, a.rdfs("subClassOf"), n))) : (this.predicate = e, this.constraints = this.constraints.concat(o.each(e, Xl.ns.rdfs("range"))));
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
		let e = {}, t = o.statementsMatching(void 0, Xl.ns.rdf("type"), r, n), i = {};
		for (let n = 0; n < t.length; ++n) {
			let r = t[n].object;
			if (r.termType !== "NamedNode") continue;
			let a = ue(e, r);
			r.uri in i || (i[r.uri] = []), i[r.uri].push(t[n].subject), a.addUse();
		}
		return [i, e];
	}
	function fe(e, t) {
		let r = o.statementsMatching(e, void 0, void 0, n), i = {};
		for (let e = 0; e < r.length; ++e) {
			let n = r[e].predicate;
			if (n.uri in c) continue;
			let a = le(t, n);
			a.checkValue(r[e].object), i[n.uri] = a;
		}
		return i;
	}
	function pe(e, t) {
		let n = {};
		for (let e = 0; e < t.length; ++e) {
			let r = fe(t[e], n);
			for (let e in r) r[e].addUse();
		}
		let r = re(n);
		he(r), e.allColumns = r;
	}
	function me() {
		let e, t, n = de();
		e = n[0], t = n[1];
		for (let n in e) {
			let r = e[n], i = t[n];
			pe(i, r);
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
	function ve(e, t, n, r) {
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
	function ye(e, t) {
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
	function be(e, t) {
		for (let n = 0; n < e.length; ++n) {
			let r = e[n];
			ye(r, t);
		}
	}
	function xe(e, t, n) {
		function r(e) {
			return e ? e.termType === "Literal" ? e.value.toLowerCase() : e.termType === "NamedNode" ? N(e).toLowerCase() : e.value.toLowerCase() : "";
		}
		function i(e, t) {
			let n = r(e), i = r(t);
			return n < i ? -1 : +(n > i);
		}
		ve(e, t, i, n);
	}
	function Se(t, n, r) {
		let i = e.createElement("div"), a = e.createElement("input");
		a.setAttribute("type", "text"), a.style.width = "70%", i.appendChild(a);
		let o = e.createElement("span");
		o.appendChild(e.createTextNode("▼")), o.addEventListener("click", function() {
			xe(t, r, !1);
		}, !1), i.appendChild(o);
		let s = e.createElement("span");
		s.appendChild(e.createTextNode("▲")), s.addEventListener("click", function() {
			xe(t, r, !0);
		}, !1), i.appendChild(s);
		let c = null;
		return r.filterFunction = function(e) {
			if (!c) return !0;
			if (e) {
				let t;
				return t = e.termType === "Literal" ? e.value : e.termType === "NamedNode" ? N(e) : "", t.toLowerCase().indexOf(c) >= 0;
			} else return !1;
		}, a.addEventListener("keyup", function() {
			c = a.value === "" ? null : a.value.toLowerCase(), be(t, n);
		}, !1), i;
	}
	function Ce(t, n, r, i) {
		let a = e.createElement("div"), o = e.createElement("select"), s = {};
		for (let e = 0; e < i.length; ++e) {
			let t = i[e];
			s[t.uri] = !0;
		}
		let c = je(r).initialSelection;
		c && (s = c), o.setAttribute("multiple", "true");
		for (let e = 0; e < i.length; ++e) {
			let t = i[e], n = ie(N(t), e);
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
			be(t, n);
		}, !0), a;
	}
	function we(t, n, r) {
		let i = e.createElement("div"), a = e.createElement("input");
		a.setAttribute("type", "text"), a.style.width = "40px", i.appendChild(a);
		let o = e.createElement("input");
		o.setAttribute("type", "text"), o.style.width = "40px", i.appendChild(o);
		let s = null, c = null;
		r.filterFunction = function(e) {
			return e &&= Number(e), !(s && (!e || e < s) || c && (!e || e > c));
		};
		function l() {
			s = a.value === "" ? null : Number(a.value), c = o.value === "" ? null : Number(o.value), be(t, n);
		}
		return a.addEventListener("keyup", l, !1), o.addEventListener("keyup", l, !1), i;
	}
	function Te(e, t, n) {
		return n.checkedAnyValues && n.possiblyNumber ? we(e, t, n) : n.possiblyLiteral ? Se(e, t, n) : null;
	}
	function Ee(e, t, n) {
		if (n.superClass && n.alternatives.length > 0) return Ce(e, t, n, n.alternatives);
		let r = n.getConstraints(), i;
		for (let a = 0; a < r.length; a++) {
			if (i = r[a], n.checkedAnyValues && n.possiblyNumber || i.uri in l) return we(e, t, n);
			if (i.uri === "http://www.w3.org/2000/01/rdf-schema#Literal") return Se(e, t, n);
			let s = o.each(i, Xl.ns.owl("oneOf"));
			if (s.length > 0) return Ce(e, t, n, s.elements);
		}
		return Te(e, t, n);
	}
	function De(t, n) {
		let r = e.createElement("tr");
		r.className = "selectors", r.appendChild(e.createElement("td"));
		for (let i = 0; i < n.length; ++i) {
			let a = e.createElement("td"), o = Ee(t, n, n[i]);
			o && a.appendChild(o), r.appendChild(a);
		}
		return r;
	}
	function Oe(t, n, r) {
		r ||= {};
		let i = e.createElement("a"), a = r.linkFunction;
		return i.setAttribute("href", t), i.appendChild(e.createTextNode(n)), a ? i.addEventListener("click", function(e) {
			e.preventDefault(), e.stopPropagation();
			let t = at(e).getAttribute("href");
			t || P("No href found \n"), a(t);
		}, !0) : i.addEventListener("click", Xl.widgets.openHrefInOutlineMode, !0), i;
	}
	function ke(e, t) {
		let n = !1;
		return e.uri && (n = e.uri.match(/^mailto:(.*)/)), n ? Oe(e.uri, n[1], t) : Oe(e.uri, N(e), t);
	}
	function Ae(t) {
		let n = e.createElement("img");
		return n.setAttribute("src", t.uri), n.style.height = "40px", n;
	}
	function je(e) {
		return t && t.hints && e.variable && t.hints[e.variable.toNT()] ? t.hints[e.variable.toNT()] : {};
	}
	function M(t, n) {
		let r = je(n), i = r.cellFormat;
		if (i) switch (i) {
			case "shortDate": return e.createTextNode(Xl.widgets.shortDate(t.value));
			default:
		}
		else if (t.termType === "Literal") {
			if (t.datatype) {
				if (u[t.datatype.uri]) return e.createTextNode(Xl.widgets.shortDate(t.value));
				if (l[t.datatype.uri]) {
					let n = e.createElement("span");
					return n.textContent = t.value, n.setAttribute("style", "text-align: right"), n;
				}
			}
			return e.createTextNode(t.value);
		} else if (t.termType === "NamedNode" && n.isImageColumn()) return Ae(t);
		else if (t.termType === "NamedNode" || t.termType === "BlankNode") return ke(t, r);
		else if (t.termType === "Collection") {
			let r = e.createElement("span");
			return r.appendChild(e.createTextNode("[")), t.elements.forEach(function(t) {
				r.appendChild(M(t, n)), r.appendChild(e.createTextNode(", "));
			}), r.removeChild(r.lastChild), r.appendChild(e.createTextNode("]")), r;
		} else return e.createTextNode("unknown termtype '" + t.termType + "'!");
	}
	function Me(t, n, r, i) {
		let a = e.createElement("td");
		n._subject && "uri" in n._subject && a.appendChild(Oe(n._subject.uri, "→")), t.appendChild(a);
		for (let i = 0; i < r.length; ++i) {
			let a = r[i], o = e.createElement("td"), s, c = a.getKey();
			if (c in n.values) {
				let t = n.values[c], r = !1;
				n.originalValues && n.originalValues[c] && t.length !== n.originalValues[c].length && (r = !0);
				for (let i = 0; i < t.length; ++i) {
					let l = t[i];
					n.originalValues && n.originalValues[c] && n.originalValues[c].length > i && (s = n.originalValues[c][i], l.toString() !== s.toString() && (r = !0)), o.appendChild(M(l, a)), i !== t.length - 1 && o.appendChild(e.createTextNode(",\n")), r && (o.style.background = "#efe");
				}
			}
			t.appendChild(o);
		}
		return n._htmlRow = t, t;
	}
	function Ne(e, t) {
		let n = null;
		if (e.termType === "Literal") n = "value";
		else if (e.termType === "NamedNode") n = "uri";
		else return t.indexOf(e) >= 0;
		let r;
		for (r = 0; r < t.length; ++r) if (t[r].termType === e.termType && t[r][n] === e[n]) return !0;
		return !1;
	}
	function Pe(e, t, n) {
		let r, i = !1;
		for (r in n) {
			let t = n[r];
			r in e.values || (e.values[r] = []), Ne(t, e.values[r]) || (e.values[r].push(t), i = !0);
		}
		i && (te(e._htmlRow), Me(e._htmlRow, e, t)), ye(e, t);
	}
	function Fe(e) {
		if ("uri" in e) return e.uri;
		if ("_subject_id" in e) return e._subject_id;
		{
			let t = "" + p;
			return e._subject_id = t, ++p, t;
		}
	}
	function Ie(n, r, i, a) {
		n.running = !0;
		let c = Date.now(), l = e.createElement("tr");
		a.appendChild(l), l.textContent = "Loading ...";
		for (let e = 0; e < r.length; e++) r[e].original = !0, r[e].originalValues || (r[e].originalValues = r[e].values), r[e].values = {};
		o.query(n, function(t) {
			if (!n.running) return;
			l.textContent += ".";
			let o = null, c = null, u;
			if (f in t && (c = t[f], u = Fe(c), u in s && (o = s[u])), !o) {
				let t = e.createElement("tr");
				a.appendChild(t), o = {
					_htmlRow: t,
					_subject: c,
					values: {}
				}, r.push(o), c && (s[u] = o);
			}
			delete o.original, Pe(o, i, t);
		}, void 0, function() {
			l && l.parentNode && l.parentNode.removeChild && (l.parentNode.removeChild(l), l = null);
			let e = Date.now() - c;
			P("Query done: " + r.length + " rows, " + e + "ms");
			for (let e = r.length - 1; e >= 0; e--) if (r[e].original) {
				P("   deleting row " + r[e]._subject);
				let t = r[e]._htmlRow;
				t.parentNode.removeChild(t), delete s[Fe(r[e]._subject)], r.splice(e, 1);
			}
			t.sortBy && xe(r, ce(i, t.sortBy), t.sortReverse), t.onDone && t.onDone(b);
		});
	}
	function Le(e, t) {
		Xl.log.debug(">> processing formula");
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
		for (let n = 0; n < t.optional.length; ++n) Xl.log.debug("recurse to optional subformula " + n), Le(e, t.optional[n]);
		Xl.log.debug("<< finished processing formula");
	}
	function Re(e) {
		let t = [], n = {};
		for (let r = 0; r < e.vars.length; ++r) {
			let i = new j(), a = e.vars[r];
			Xl.log.debug("column " + r + " : " + a), i.setVariable(a), n[a] = i, t.push(i);
		}
		return Le(n, e.pat), t;
	}
	function ze(t, n) {
		let r;
		r = i ? Re(t) : n.getColumns();
		let a = [], o = e.createElement("table");
		return o.appendChild(_e(r, n)), o.appendChild(De(a, r)), o.logicalRows = a, o.columns = r, o.query = t, Ie(t, a, r, o), o;
	}
	function Be(e) {
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
var Ql = /* @__PURE__ */ r({
	TabWidgetElement: () => $l,
	tabWidget: () => tu
}), $l = class extends HTMLElement {
	bodyContainer;
	refresh;
	tabContainer;
}, eu = "#ddddcc";
function tu(e) {
	let t = e.subject, n = e.dom || document, r = parseInt(e.orientation || "0"), i = e.backgroundColor || eu, a = r & 2, o = r & 1, s = e.onClose, [c, l] = nu(i), u = `display: grid; width: auto; height: 100%; border: 0.1em; border-style: solid; border-color: ${c}; padding: 1em;`, d = n.createElement("div");
	d.setAttribute("style", V.tabsRootElement), d.style.flexDirection = (o ? "row" : "column") + (a ? "-reverse" : "");
	let f = d.appendChild(n.createElement("nav"));
	f.setAttribute("style", V.tabsNavElement);
	let p = d.appendChild(n.createElement("div"));
	p.setAttribute("style", V.tabsMainElement);
	let m = f.appendChild(n.createElement("ul"));
	m.setAttribute("style", V.tabContainer), m.style.flexDirection = `${o ? "column" : "row"}`;
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
		let r = Kn(n, s);
		r.setAttribute("style", r.getAttribute("style") + x), t.appendChild(r), e.appendChild(t), e.dataset.onCloseSet = "true";
	}
	function D() {
		return e.items ? e.items : e.ordered === !1 ? A.each(t, e.predicate) : A.the(t, e.predicate).elements;
	}
	function O(t) {
		let r = n.createElement("li");
		r.setAttribute("style", C), r.subject = t;
		let i = r.appendChild(n.createElement("button"));
		if (i.setAttribute("style", V.makeNewSlot), i.onclick = function() {
			if (ee(), te(), r.setAttribute("style", w), !r.bodyTR) return;
			r.bodyTR.setAttribute("style", T);
			let n = a(r);
			e.renderMain && r.subject && n.asSettings !== !1 && (n.innerHTML = "loading item ..." + t, e.renderMain(n, r.subject), n.asSettings = !1);
		}, e.renderTabSettings && r.subject) {
			let i = n.createElement("button");
			i.textContent = "...", i.setAttribute("style", V.ellipsis), i.onclick = function() {
				if (ee(), te(), r.setAttribute("style", w), !r.bodyTR) return;
				r.bodyTR.setAttribute("style", T);
				let n = a(r);
				e.renderTabSettings && r.subject && n.asSettings !== !0 && (n.innerHTML = "loading settings ..." + t, e.renderTabSettings(n, r.subject), n.asSettings = !0);
			}, r.appendChild(i);
		}
		return e.renderTab ? e.renderTab(i, t) : i.innerHTML = N(t), r;
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
function nu(e) {
	return iu(e) ? [ru(e, "#ffffff", .3), "#000000"] : [ru(e, "#000000", .3), "#ffffff"];
}
function ru(e, t, n) {
	let r, i, a, o = "#", s = "0123456789abcdef";
	for (let c = 0; c < 3; c++) {
		r = parseInt(e.slice(c * 2 + 1, c * 2 + 3), 16), i = parseInt(t.slice(c * 2 + 1, c * 2 + 3), 16), a = r * (1 - n) + i * n;
		let l = parseInt(("" + a).split(".")[0]), u = parseInt(("" + l / 16).split(".")[0]), d = parseInt(("" + l % 16).split(".")[0]);
		o += s[u] + s[d];
	}
	return o;
}
function iu(e) {
	let t = 0;
	for (let n = 0; n < 3; n++) t += parseInt(e.slice(n * 2 + 1, n * 2 + 3), 16);
	return t > 384;
}
//#endregion
//#region src/header/empty-profile.ts
var au = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"26\" height=\"26\" viewBox=\"0 0 26 26\" fill=\"none\">\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z\" fill=\"#D8D8D8\" stroke=\"#8B8B8B\"/>\n    <mask id=\"mask0\" mask-type=\"alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"26\" height=\"26\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z\" fill=\"white\" stroke=\"white\"/>\n    </mask>\n    <g mask=\"url(#mask0)\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.0468 10.4586C17.0468 14.4979 15.4281 16.9214 12.9999 16.9214C10.5718 16.9214 8.95298 14.4979 8.95298 10.4586C8.95298 6.41931 12.9999 6.41931 12.9999 6.41931C12.9999 6.41931 17.0468 6.41931 17.0468 10.4586ZM4.09668 23.3842C6.52483 17.7293 12.9999 17.7293 12.9999 17.7293C12.9999 17.7293 19.475 17.7293 21.9031 23.3842C21.9031 23.3842 17.8481 25 12.9999 25C8.15169 25 4.09668 23.3842 4.09668 23.3842Z\" fill=\"#8B8B8B\"/>\n    </g>\n</svg>", ou = U.iconBase + "noun_help.svg", su = "https://solidproject.org/assets/img/solid-emblem.svg";
async function cu(e, t, n) {
	let r = document.getElementById("PageHeader");
	if (!r) return;
	let i = pe();
	lu(r, e, i, t, n)(), j.events.on("logout", lu(r, e, i, t, n)), j.events.on("login", lu(r, e, i, t, n));
}
function lu(e, t, n, r, i) {
	return async () => {
		let a = S.currentUser();
		e.innerHTML = "", e.appendChild(await uu(t, n, a, r, i));
	};
}
async function uu(e, t, n, r, i) {
	let a = document.createElement("a");
	a.href = t.uri, a.setAttribute("style", V.headerBannerLink);
	let o = document.createElement("img");
	i && (o.src = i.logo ? i.logo : su), o.setAttribute("style", V.headerBannerIcon), a.appendChild(o);
	let s = n ? await hu(e, n, r) : fu(), c = document.createElement("div");
	c.setAttribute("style", V.headerBanner), c.appendChild(a);
	let l = document.createElement("div");
	if (l.setAttribute("style", V.headerBannerRightMenu), l.appendChild(s), i && i.helpMenuList) {
		let e = du(i, i.helpMenuList);
		l.appendChild(e);
	}
	return c.appendChild(l), c;
}
function du(e, t) {
	if (!t) return;
	let n = document.createElement("ul");
	n.setAttribute("style", V.headerUserMenuList), t.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? n.appendChild(gu(mu(e.label, e.url, e.target))) : n.appendChild(gu(pu(e.label, e.onclick)));
	});
	let r = document.createElement("nav");
	r.setAttribute("style", V.headerUserMenuNavigationMenuNotDisplayed), r.setAttribute("aria-hidden", "true"), r.setAttribute("id", "helperNav"), r.appendChild(n);
	let i = document.createElement("div");
	i.setAttribute("style", V.headerBannerUserMenu), i.appendChild(r);
	let a = document.createElement("button");
	a.setAttribute("style", V.headerUserMenuTrigger), a.type = "button";
	let o = document.createElement("img");
	o.src = e && e.helpIcon ? e.helpIcon : U.iconBase + ou, o.setAttribute("style", V.headerUserMenuTriggerImg), i.appendChild(a), a.appendChild(o);
	let s = fe((e) => vu(e, a, r), 50);
	a.addEventListener("click", s);
	let c = setTimeout(() => null, 0);
	return i.addEventListener("mouseover", (e) => {
		clearTimeout(c), s(e), document.getElementById("helperNav")?.setAttribute("style", V.headerUserMenuNavigationMenu);
	}), i.addEventListener("mouseout", (e) => {
		c = setTimeout(() => s(e), 200), document.getElementById("helperNav")?.setAttribute("style", V.headerUserMenuNavigationMenuNotDisplayed);
	}), i;
}
function fu() {
	let e = document.createElement("div");
	return e.setAttribute("style", V.headerBannerLogin), e.appendChild(fa(document, null, {})), e;
}
function pu(e, t) {
	let n = document.createElement("button");
	return n.setAttribute("style", V.headerUserMenuButton), n.onmouseover = function() {
		n.setAttribute("style", V.headerUserMenuButtonHover);
	}, n.onmouseout = function() {
		n.setAttribute("style", V.headerUserMenuButton);
	}, n.addEventListener("click", t), n.innerText = e, n;
}
function mu(e, t, n) {
	let r = document.createElement("a");
	return r.setAttribute("style", V.headerUserMenuLink), r.onmouseover = function() {
		r.setAttribute("style", V.headerUserMenuLinkHover);
	}, r.onmouseout = function() {
		r.setAttribute("style", V.headerUserMenuLink);
	}, r.href = t, r.innerText = e, n && (r.target = n), r;
}
async function hu(e, t, n) {
	let r = e.fetcher;
	r && await r.load(t);
	let i = document.createElement("ul");
	i.setAttribute("style", V.headerUserMenuList), n && n.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? i.appendChild(gu(mu(e.label, e.url, e.target))) : i.appendChild(gu(pu(e.label, e.onclick)));
	});
	let a = document.createElement("nav");
	a.setAttribute("style", V.headerUserMenuNavigationMenuNotDisplayed), a.setAttribute("aria-hidden", "true"), a.setAttribute("id", "loggedInNav"), a.appendChild(i);
	let o = document.createElement("button");
	o.setAttribute("style", V.headerUserMenuTrigger), o.type = "button";
	let s = _u(e, t);
	typeof s == "string" ? o.innerHTML = s : o.appendChild(s);
	let c = document.createElement("div");
	c.setAttribute("style", V.headerBannerUserMenuNotDisplayed), c.appendChild(o), c.appendChild(a);
	let l = fe((e) => vu(e, o, a), 50);
	o.addEventListener("click", l);
	let u = setTimeout(() => null, 0);
	return c.addEventListener("mouseover", (e) => {
		clearTimeout(u), l(e), document.getElementById("loggedInNav")?.setAttribute("style", V.headerUserMenuNavigationMenu);
	}), c.addEventListener("mouseout", (e) => {
		u = setTimeout(() => l(e), 200), document.getElementById("loggedInNav")?.setAttribute("style", V.headerUserMenuNavigationMenuNotDisplayed);
	}), c;
}
function gu(e) {
	let t = document.createElement("li");
	return t.setAttribute("style", V.headerUserMenuListItem), t.appendChild(e), t;
}
function _u(e, t) {
	let n = null;
	try {
		if (n = Bn(t), !n) return au;
	} catch {
		return au;
	}
	let r = document.createElement("div");
	return r.setAttribute("style", V.headerUserMenuPhoto), r.style.backgroundImage = `url(${n})`, r;
}
function vu(e, t, n) {
	let r = t.getAttribute("aria-expanded") === "true", i = e.type === "mouseover", a = e.type === "mouseout";
	r && i || !r && a || (t.setAttribute("aria-expanded", (!r).toString()), n.setAttribute("aria-hidden", r.toString()));
}
//#endregion
//#region src/footer/index.ts
var yu = "https://solidproject.org", bu = "solidproject.org";
async function xu(e, t) {
	let n = document.getElementById("PageFooter");
	if (!n) return;
	let r = pe(), i = await me(r, e);
	return Su(n, e, r, i, t), j.events.on("login", () => Su(n, e, r, i, t)), j.events.on("logout", () => Su(n, e, r, i, t)), n;
}
async function Su(e, t, n, r, i) {
	let a = S.currentUser();
	return e.innerHTML = "", e.appendChild(await Cu(t, a, n, r, i)), e;
}
function Cu(e, t, n, r, i) {
	let a = document.createElement("div");
	a.setAttribute("style", V.footer);
	let o = document.createElement("a");
	if (o.href = i && i.solidProjectUrl ? i.solidProjectUrl : yu, o.innerText = i && i.solidProjectName ? i.solidProjectName : bu, !n || !r || t && t.equals(r)) {
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
	u.href = r.uri, u.innerText = he(e, r);
	let d = document.createElement("span");
	d.innerText = ". For more info, check out ";
	let f = document.createElement("span");
	return f.innerText = ".", a.appendChild(s), a.appendChild(c), a.appendChild(l), a.appendChild(u), a.appendChild(d), a.appendChild(o), a.appendChild(f), a;
}
//#endregion
//#region src/create/types.ts
var wu = /* @__PURE__ */ r({}), Tu = typeof window < "u" ? window.document : null;
//#endregion
export { ge as C, Ke as S, qi as _, Ql as a, U as b, zl as c, eo as d, Qa as f, Ba as g, za as h, cu as i, tl as l, Ua as m, wu as n, Zl as o, Ka as p, xu as r, Bl as s, Tu as t, Yc as u, Wi as v, V as x, Ar as y };

//# sourceMappingURL=src-CJICzMIV.js.map