import e from "../lib/ns.esm.js";
import { info as t } from "../lib/log.esm.js";
import { label as n } from "../utils/label.esm.js";
import { escapeForXML as r, getTarget as i, syncTableToArray as a } from "../utils/index.esm.js";
import { log as o } from "../lib/debug.esm.js";
import { style as s } from "../lib/style.esm.js";
import { makeDraggable as c, makeDropTarget as l, uploadFiles as u } from "./dragAndDrop.esm.js";
import { errorMessageBlock as d } from "./error.esm.js";
import { icons as f } from "../lib/iconBase.esm.js";
import p from "../lib/newperson.esm.js";
import { addClickListenerToElement as m, createImageDiv as h, wrapDivInATR as g } from "./widgetHelpers.esm.js";
import { createLinkForURI as _, linkIcon as v } from "./buttons/iconLinks.esm.js";
import { Util as y, st as b, sym as x, uri as S } from "rdflib";
import { store as C } from "solid-logic";
//#region src/widgets/buttons.ts
var { iconBase: w } = f, T = w + "noun_1180156.svg", E = w + "noun_1180158.svg";
function D(e) {
	let t = e && e.statusArea || e && e.div || null;
	if (t) return t;
	let n = e && e.dom;
	if (!n && typeof document < "u" && (n = document), n) {
		let r = n.getElementsByTagName("body")[0];
		return t = n.createElement("div"), r.insertBefore(t, r.firstElementChild), e && (e.statusArea = t), t;
	}
	return null;
}
function O(e, t) {
	if (!t) return;
	let n = D(e);
	o("Complaint: " + t), n ? n.appendChild(d(e && e.dom || document, t)) : alert(t);
}
function k(e) {
	for (; e.firstChild;) e.removeChild(e.firstChild);
	return e;
}
function A(e) {
	let t = e.search(/logFile=/), n = e.search(/&rulesFile=/);
	return e.substring(t + 8, n);
}
function j(e, t) {
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
function M(e, t) {
	return t.split("{").map(function(t) {
		let n = t.split("}")[0];
		return t ? ("000" + (e["get" + n]() + ({ Month: 1 }[n] || 0))).slice(-({
			Milliseconds: 3,
			FullYear: 4
		}[n] || 2)) + t.split("}")[1] : "";
	}).join("");
}
function ee() {
	return M(/* @__PURE__ */ new Date(), "{FullYear}-{Month}-{Date}T{Hours}:{Minutes}:{Seconds}.{Milliseconds}");
}
function te() {
	return M(/* @__PURE__ */ new Date(), "{Hours}:{Minutes}:{Seconds}.{Milliseconds}");
}
function N(t, r) {
	let i = C, a = function(t) {
		let n = i.any(t, e.vcard("fn")) || i.any(t, e.foaf("name")) || i.any(t, e.vcard("organization-name"));
		return n ? n.value : null;
	}, o = r.sameTerm(e.foaf("Agent")) ? "Everyone" : a(r);
	if (t.textContent = o || n(r), !o && r.uri) {
		if (!i.fetcher) throw Error("kb has no fetcher");
		i.fetcher.nowOrWhenFetched(r.doc(), void 0, function(e) {
			t.textContent = a(r) || n(r);
		});
	}
}
function ne(t, n) {
	return n.each(t, e.sioc("avatar")).concat(n.each(t, e.foaf("img"))).concat(n.each(t, e.vcard("logo"))).concat(n.each(t, e.vcard("hasPhoto"))).concat(n.each(t, e.vcard("photo"))).concat(n.each(t, e.foaf("depiction")));
}
var P = {
	"solid:AppProviderClass": "noun_144.svg",
	"solid:AppProvider": "noun_15177.svg",
	"solid:Pod": "noun_Cabinet_1434380.svg",
	"vcard:Group": "noun_339237.svg",
	"vcard:Organization": "noun_143899.svg",
	"vcard:Individual": p,
	"schema:Person": p,
	"foaf:Person": p,
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
function F(e) {
	let t = e.uri.split("#")[0], n = t.indexOf("//");
	if (n < 0) throw Error("This URI does not have a web site part (origin)");
	let r = t.indexOf("/", n + 2);
	return r < 0 ? t.slice(0) + "/" : t.slice(0, r + 1);
}
function I(e) {
	let t = w;
	return typeof e != "string" && e.uri ? e.uri.split("/").length === 4 && !e.uri.split("/")[1] && !e.uri.split("/")[3] ? t + "noun_15177.svg" : e.uri.startsWith("message:") || e.uri.startsWith("mid:") ? t + "noun_480183.svg" : e.uri.startsWith("mailto:") ? t + "noun_567486.svg" : e.uri.startsWith("https:") && e.uri.indexOf("#") < 0 ? F(e) + "favicon.ico" : null : t + "noun_10636_grey.svg";
}
function L(t) {
	let n = C, r = w;
	if (t.sameTerm(e.foaf("Agent")) || t.sameTerm(e.rdf("Resource"))) return r + "noun_98053.svg";
	let i = n.any(t, e.sioc("avatar")) || n.any(t, e.foaf("img")) || n.any(t, e.vcard("logo")) || n.any(t, e.vcard("hasPhoto")) || n.any(t, e.vcard("photo")) || n.any(t, e.foaf("depiction"));
	return i ? i.uri : null;
}
function R(e, t, n) {
	let r = C, i = L(t);
	if (i) return e.setAttribute("src", i), !0;
	let a = n[t.uri];
	if (a) return e.setAttribute("src", a), e.style = s.classIconStyle, !0;
	let o = I(t);
	if (o) return e.setAttribute("src", o), !0;
	let c = r.findTypeURIs(t);
	for (let t in c) if (n[t]) return e.setAttribute("src", n[t]), !1;
	return e.setAttribute("src", w + "noun_10636_grey.svg"), !1;
}
function z(t, n) {
	let r = C, i = {};
	for (let t in P) {
		let n = t.split(":")[0], r = t.split(":")[1], a = e[n](r), o = P[t];
		o.startsWith("data:") ? i[a.uri] = o : i[a.uri] = S.join(o, w);
	}
	if (!R(t, n, i) && n.uri) {
		if (!r.fetcher) throw Error("kb has no fetcher");
		r.fetcher.nowOrWhenFetched(n.doc(), void 0, (e) => {
			e && R(t, n, i);
		});
	}
}
function B(e, t) {
	let n = e.createElement("img");
	if (n.style = s.iconStyle, n.setAttribute("src", w + (function(e) {
		if (!e.uri) return !1;
		let t = e.uri.split("/");
		return t.length === 3 || t.length === 4 && t[3] === "";
	}(t) ? "noun_15177.svg" : "noun_681601.svg")), t.uri && t.uri.startsWith("https:") && t.uri.indexOf("#") < 0) {
		let r = e.createElement("object");
		return r.setAttribute("data", F(t) + "favicon.ico"), r.setAttribute("type", "image/x-icon"), r.appendChild(n), r;
	} else return z(n, t), n;
}
function re(e, t, n, r) {
	function i() {
		t.parentElement.removeChild(t);
	}
	function a() {
		i(), r();
	}
	let o = e.createElement("div");
	o.style = s.confirmPopupStyle, o.style.position = "absolute", o.style.top = "-1em", o.style.display = "grid", o.style.gridTemplateColumns = "auto auto";
	let c = e.createElement("div");
	c.style.gridColumn = "1/2", c.style.gridRow = "1";
	let l = e.createElement("div");
	l.style.gridColumn = "1/2", l.style.gridRow = "2";
	let u = U(e, i);
	o.appendChild(u), u.style.gridColumn = "1", u.style.gridRow = "2";
	let d = o.appendChild(e.createElement("button"));
	d.style = s.buttonStyle, d.style.gridRow = "2", d.style.gridColumn = "2", d.textContent = "Cancel";
	let p = H(e, f.iconBase + "noun_925021.svg", "Delete it");
	o.appendChild(p), p.style.gridRow = "1", p.style.gridColumn = "1";
	let m = o.appendChild(e.createElement("button"));
	return m.style = s.buttonStyle, m.style.gridRow = "1", m.style.gridColumn = "2", m.textContent = n, o.appendChild(m), p.addEventListener("click", a), m.addEventListener("click", a), d.addEventListener("click", i), o;
}
function V(e, t, n, r) {
	function i() {
		let n = e.createElement("div");
		t.insertBefore(n, o), n.style.position = "relative", n.appendChild(re(e, n, c, r));
	}
	let a = w + "noun_2188_red.svg", o = e.createElement("img");
	o.setAttribute("src", a), o.setAttribute("style", s.smallButtonStyle), o.style.float = "right";
	let c = "Remove this " + n;
	return o.title = c, o.classList.add("hoverControlHide"), o.addEventListener("click", i), t.classList.add("hoverControl"), t.appendChild(o), o.setAttribute("data-testid", "deleteButtonWithCheck"), o;
}
function H(e, t, n, r, i = {
	buttonColor: "Primary",
	needsBorder: !1
}) {
	let a = e.createElement("button");
	if (a.setAttribute("type", "button"), t) {
		let r = a.appendChild(e.createElement("img"));
		r.setAttribute("src", t), r.setAttribute("style", "width: 2em; height: 2em;"), r.title = n, a.setAttribute("style", s.buttonStyle);
	} else a.textContent = n.toLocaleUpperCase(), a.onmouseover = function() {
		i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", s.secondaryButtonNoBorderHover) : a.setAttribute("style", s.secondaryButtonHover) : i.needsBorder ? a.setAttribute("style", s.primaryButtonNoBorderHover) : a.setAttribute("style", s.primaryButtonHover);
	}, a.onmouseout = function() {
		i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", s.secondaryButtonNoBorder) : a.setAttribute("style", s.secondaryButton) : i.needsBorder ? a.setAttribute("style", s.primaryButtonNoBorder) : a.setAttribute("style", s.primaryButton);
	}, i.buttonColor === "Secondary" ? i.needsBorder ? a.setAttribute("style", s.secondaryButtonNoBorder) : a.setAttribute("style", s.secondaryButton) : i.needsBorder ? a.setAttribute("style", s.primaryButtonNoBorder) : a.setAttribute("style", s.primaryButton);
	return r && a.addEventListener("click", r, !1), a;
}
function U(e, t) {
	let n = H(e, T, "Cancel", t);
	return n.firstChild && (n.firstChild.style.opacity = "0.3"), n;
}
function W(e, t) {
	return H(e, E, "Continue", t);
}
function ie(t, r, i, a, o, c) {
	return new Promise(function(r, l) {
		let u = t.createElement("div");
		a ||= e.foaf("name"), c ||= o ? n(o) : "  ";
		let d = c + " " + n(a) + ": ";
		u.appendChild(t.createElement("p")).textContent = d;
		let f = t.createElement("input");
		f.setAttribute("type", "text"), f.setAttribute("size", "100"), f.setAttribute("maxLength", "2048"), f.setAttribute("style", s.textInputStyle), f.select(), u.appendChild(f), i.appendChild(u);
		function p() {
			u.parentNode.removeChild(u), r(f.value.trim());
		}
		f.addEventListener("keyup", function(e) {
			e.keyCode === 13 && p();
		}, !1), u.appendChild(t.createElement("br")), u.appendChild(U(t, function(e) {
			u.parentNode.removeChild(u), r(null);
		})), u.appendChild(W(t, function(e) {
			p();
		})), f.focus();
	});
}
var G = K;
function K(e, t, n, r) {
	let i = e.createElement("tr");
	r ||= {};
	let a = i.appendChild(e.createElement("td")), o = i.appendChild(e.createElement("td")), s = i.appendChild(e.createElement("td")), l = r.image || B(e, n);
	a.setAttribute("style", "vertical-align: middle; width:2.5em; padding:0.5em; height: 2.5em;"), o.setAttribute("style", "vertical-align: middle; text-align:left;"), s.setAttribute("style", "vertical-align: middle; width:2em; padding:0.5em; height: 4em;"), a.appendChild(l);
	let u = o.appendChild(e.createElement("div")), d = u.appendChild(e.createElement("span"));
	if (r.title ? d.textContent = r.title : N(d, n), typeof r.renderNameSuffix == "function") {
		let t = r.renderNameSuffix(n, e);
		if (t) {
			let n = u.appendChild(e.createElement("span"));
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
	return r.deleteFunction && V(e, s, r.noun || "one", r.deleteFunction), n.uri && (r.link !== !1 && (s.appendChild(v(e, n)).classList.add("HoverControlHide"), s.appendChild(e.createElement("br"))), r.draggable !== !1 && (l.setAttribute("draggable", "false"), c(i, n))), i.subject = n, i;
}
function q(e, t, n, r) {
	let i = t.appendChild(e.createElement("div"));
	n ? i.textContent = n : N(i, r);
}
function J(e, t, n, r) {
	let i = t.appendChild(e.createElement("div"));
	i.setAttribute("style", s.linkDivStyle), r.deleteFunction && V(e, i, r.noun || "one", r.deleteFunction), n.uri && (r.link !== !1 && _(e, i, n), c(t, n));
}
function ae(e, t, n) {
	let r = e.createElement("div");
	return r.setAttribute("style", s.renderAsDivStyle), n ||= {}, h(e, r, n.image || B(e, t)), q(e, r, n.title, t), J(e, r, t, n), n.clickable && n.onClickFunction && m(r, n.onClickFunction), n.wrapInATR ? g(e, r, t) : r;
}
function Y(e) {
	if (e.refresh) {
		e.refresh();
		return;
	}
	for (let t = 0; t < e.children.length; t++) Y(e.children[t]);
}
function oe(t, n, r, i = {}) {
	let s = /* @__PURE__ */ new Set(), c = !!(i.renderSupportingInfo || i.renderNameSuffix), d = i.refreshOnDocumentLoad ?? !0, f = function(e) {
		if (!E.updater) throw Error("kb has no updater");
		E.updater.update(b(n, S, e, _), [], function(e, t, n, r) {
			t ? m() : O(void 0, "Error deleting one: " + n);
		});
	};
	function p(e) {
		let n = e, r = { noun: T };
		if (r.renderSupportingInfo = i.renderSupportingInfo, r.renderNameSuffix = i.renderNameSuffix, c && d && e?.uri && E.fetcher) {
			let t = e.doc(), n = t?.uri ? E.fetcher.requested?.[t.uri] : void 0, r = n !== "done" && n !== "failed";
			t?.uri && r && !s.has(t.uri) && (s.add(t.uri), E.fetcher.nowOrWhenFetched(t, void 0, () => {
				s.delete(t.uri), m();
			}));
		}
		return v && (r.deleteFunction = function() {
			f(n);
		}), G(t, S, e, r);
	}
	let m = function() {
		let e = E.each(n, S);
		e.sort(), a(j, e, p, c ? function(e, t) {
			return p(t);
		} : void 0);
	};
	function h(e) {
		let t = [];
		if (e.forEach(function(e) {
			let r = x(e);
			o("Dropped on attachemnt " + e), t.push(b(n, S, r, _));
		}), !E.updater) throw Error("kb has no updater");
		E.updater.update([], t, function(e, t, n, r) {
			t ? m() : O(void 0, "Error adding one: " + n);
		});
	}
	function g(e) {
		u(E.fetcher, e, i.uploadFolder?.uri, i.uploadFolder?.uri, function(e, t) {
			let r = [b(n, S, E.sym(t), _)];
			if (!E.updater) throw Error("kb has no updater");
			E.updater.update([], r, function(e, t, n, r) {
				t ? m() : O(void 0, "Error adding link to uploaded file: " + n);
			});
		});
	}
	let _ = i.doc || n.doc();
	i.modify === void 0 && (i.modify = !0);
	let v = i.modify, y = i.promptIcon || w + "noun_748003.svg", S = i.predicate || e.wf("attachment"), T = i.noun || "attachment", E = C, D = r.appendChild(t.createElement("table"));
	D.setAttribute("style", "margin-top: 1em; margin-bottom: 1em;");
	let k = D.appendChild(t.createElement("tr")), A = k.appendChild(t.createElement("td")), j = k.appendChild(t.createElement("td")).appendChild(t.createElement("table"));
	if (j.appendChild(t.createElement("tr")), D.refresh = m, m(), v) {
		let e = H(t, y, "Drop attachments here");
		A.appendChild(e);
		let n = i.uploadFolder ? g : null;
		l(e, h, n);
		let r = e.querySelector("img");
		if (r && l(r, h, n), l(A, h, n), i.uploadFolder) {
			let e = $(t, g);
			A.appendChild(e);
		}
	}
	return D;
}
function se(e) {
	e.preventDefault(), e.stopPropagation();
	let t = i(e).getAttribute("href");
	if (!t) return o("openHrefInOutlineMode: No href found!\n");
	let n = window.document;
	n.outlineManager ? n.outlineManager.GotoSubject(C.sym(t), !0, void 0, !0, void 0) : window && window.panes && window.panes.getOutliner ? window.panes.getOutliner().GotoSubject(C.sym(t), !0, void 0, !0, void 0) : o("ERROR: Can't access outline manager in this config");
}
function ce(e) {
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
	return C.sym("http://tabulator.org/wiki/annnotation/" + t);
}
function le() {
	let t = {};
	return C.statementsMatching(void 0, e.rdf("type"), void 0).forEach(function(e) {
		e.object.value && (t[e.object.value] = !0);
	}), C.statementsMatching(void 0, e.rdfs("subClassOf"), void 0).forEach(function(e) {
		e.object.value && (t[e.object.value] = !0), e.subject.value && (t[e.subject.value] = !0);
	}), C.each(void 0, e.rdf("type"), e.rdfs("Class")).forEach(function(e) {
		e.value && (t[e.value] = !0);
	}), t;
}
function ue(n) {
	let r = {}, i = {}, a = {}, o = 0, s = 0, c = 0, l = n.predicateIndex;
	for (let e in l) l[e][0].object.termType === "Literal" ? (i[e] = !0, s++) : (a[e] = !0, o++);
	let u = n.each(void 0, e.rdf("type"), e.rdf("Property"));
	for (let e = 0; e < u.length; e++) {
		let t = u[e].toNT();
		!a[t] && !i[t] && (i[t] = !0, a[t] = !0, c++);
	}
	return r.op = a, r.dp = i, t(`propertyTriage: ${o} non-lit, ${s} literal. ${c} unknown.`), r;
}
function de(e, t) {
	let r = e.createElement("button");
	return r.setAttribute("type", "button"), r.textContent = "Goto " + n(t), r.addEventListener("click", function(n) {
		e.outlineManager.GotoSubject(t, !0, void 0, !0, void 0);
	}, !0), r;
}
function fe(e, t) {
	let n = e.createElement("button");
	return n.setAttribute("type", "button"), n.textContent = "✕", n.addEventListener("click", function(e) {
		t.parentNode.removeChild(t);
	}, !0), n;
}
function pe(e, t, n, r, i, a, o, s, c) {
	return X(e.createElement("div"), e, t, n, r, i, a, o, s, c);
}
function X(e, t, n, r, i, a, o, s, c, l) {
	let u = "border: 0.1em solid #ddd; border-bottom: none; width: 95%; height: 2em; padding: 0.5em;", d = null;
	e.innerHTML = "";
	let f = function(e, o) {
		let f, p, m = function() {
			let e = a ? n.each(void 0, i, o) : n.each(o, i);
			_.setAttribute("class", e.length === 0 ? "hideTillHover" : ""), p.setAttribute("src", s.connectIcon || w + "noun_25830.svg"), p.setAttribute("title", e.length ? e.length : "attach");
		};
		f = Z.twoLine.widgetForClass(r)(t, o), f.setAttribute("style", u);
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
var Z = {};
function me(e, t) {
	let r = e.createElement("div");
	return r.textContent = n(t), r;
}
function he(e) {
	let t = Z.twoLine[e.uri], n = C;
	if (t) return t;
	let r = n.findSuperClassesNT(e);
	for (let e in r) if (t = Z.twoLine[n.fromNT(e).uri], t) return t;
	return Z.twoLine[""];
}
function ge(t, n) {
	let i = "", a = function(t) {
		let a = C.any(n, e.qu(t));
		return a || (i += "@@ No value for " + t + "! "), a ? r(a.value) : "?";
	}, o = t.createElement("table");
	return o.innerHTML = `
      <tr>
      <td colspan="2"> ${a("payee")}</td>
      < /tr>
      < tr >
      <td>${a("date").slice(0, 10)}</td>
      <td style = "text-align: right;">${a("amount")}</td>
      </tr>`, i && (o.innerHTML = `
      <tr>
        <td><a href="${r(n.uri)}">${r(i)}</a></td>
      </tr>`), o;
}
function _e(t, n) {
	let i = function(e) {
		let t = C.any(n, e);
		return t ? r(t.value) : "?";
	}, a = t.createElement("table");
	return a.innerHTML = `
    <tr>
      <td colspan="2">${i(e.dc("title"))}</td>
    </tr>
    <tr style="color: #777">
      <td>${i(e.cal("dtstart"))}</td>
      <td>${i(e.cal("dtend"))}</td>
    </tr>`, a;
}
function ve(e, t) {
	let n = e.querySelectorAll("link");
	for (let e = 0; e < n.length; e++) if ((n[e].getAttribute("rel") || "") === "stylesheet" && (n[e].getAttribute("href") || "") === t) return;
	let r = e.createElement("link");
	r.setAttribute("rel", "stylesheet"), r.setAttribute("type", "text/css"), r.setAttribute("href", t), e.getElementsByTagName("head")[0].appendChild(r);
}
function ye(e) {
	return Q(e, "audio");
}
function be(e) {
	return Q(e, "video");
}
function Q(e, t) {
	let n = {
		audio: "http://purl.org/dc/dcmitype/Sound",
		image: "http://purl.org/dc/dcmitype/Image",
		video: "http://purl.org/dc/dcmitype/MovingImage"
	}, r = t || "image", i = C.findTypeURIs(e), a = y.mediaTypeClass(r + "/*").uri.split("*")[0];
	for (let e in i) if (e.startsWith(a)) return !0;
	return n[r] in i;
}
function $(e, t) {
	let n = e.createElement("div"), r = n.appendChild(e.createElement("input"));
	return r.setAttribute("type", "file"), r.setAttribute("multiple", "true"), r.addEventListener("change", (e) => {
		o("File drop event: ", e), e.files ? t(e.files) : e.target && e.target.files ? t(e.target.files) : alert("Sorry no files .. internal error?");
	}, !1), r.style = "display:none", l(n.appendChild(H(e, w + "noun_Upload_76574_000000.svg", "Upload files", (e) => {
		r.click();
	})), null, t), n;
}
Z = {
	line: {},
	twoLine: {
		"": me,
		"http://www.w3.org/2000/10/swap/pim/qif#Transaction": ge,
		"http://www.w3.org/ns/pim/trip#Trip": _e,
		widgetForClass: he
	}
};
//#endregion
export { ve as addStyleSheet, le as allClassURIs, ie as askName, oe as attachmentList, H as button, U as cancelButton, k as clearElement, O as complain, W as continueButton, J as createLinkDiv, q as createNameDiv, ce as defaultAnnotationStore, V as deleteButtonWithCheck, A as extractLogURI, B as faviconOrDefault, $ as fileUploadButtonDiv, L as findImage, I as findImageFromURI, M as formatDateTime, P as iconForClass, ne as imagesOf, Z as index, ye as isAudio, Q as isImage, be as isVideo, de as linkButton, se as openHrefInOutlineMode, G as personTR, ue as propertyTriage, Y as refreshTree, fe as removeButton, ae as renderAsDiv, K as renderAsRow, pe as selectorPanel, X as selectorPanelRefresh, z as setImage, N as setName, j as shortDate, te as shortTime, ee as timestamp };

//# sourceMappingURL=buttons.esm.js.map