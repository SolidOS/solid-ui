import { Util as e, st as t, sym as n, uri as r } from "rdflib";
import { icons as i } from "../lib/iconBase.esm.js";
import a from "../lib/ns.esm.js";
import { label as o } from "../utils/label.esm.js";
import { style as s } from "../lib/style.esm.js";
import { log as c } from "../lib/debug.esm.js";
import { info as l } from "../lib/log.esm.js";
import { makeDraggable as u, makeDropTarget as d, uploadFiles as f } from "./dragAndDrop.esm.js";
import { store as p } from "solid-logic";
import { escapeForXML as m, getTarget as h, syncTableToArray as g } from "../utils/index.esm.js";
import _ from "../lib/newperson.esm.js";
import { errorMessageBlock as v } from "./error.esm.js";
import { addClickListenerToElement as y, createImageDiv as b, wrapDivInATR as x } from "./widgetHelpers.esm.js";
import { createLinkForURI as S, linkIcon as C } from "./buttons/iconLinks.esm.js";
// src/widgets/buttons.ts
var { iconBase: w } = i, T = w + "noun_1180156.svg", E = w + "noun_1180158.svg";
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
	c("Complaint: " + t), n ? n.appendChild(v(e && e.dom || document, t)) : alert(t);
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
function N(e, t) {
	let n = p, r = function(e) {
		let t = n.any(e, a.vcard("fn")) || n.any(e, a.foaf("name")) || n.any(e, a.vcard("organization-name"));
		return t ? t.value : null;
	}, i = t.sameTerm(a.foaf("Agent")) ? "Everyone" : r(t);
	if (e.textContent = i || o(t), !i && t.uri) {
		if (!n.fetcher) throw Error("kb has no fetcher");
		n.fetcher.nowOrWhenFetched(t.doc(), void 0, function(n) {
			e.textContent = r(t) || o(t);
		});
	}
}
function ne(e, t) {
	return t.each(e, a.sioc("avatar")).concat(t.each(e, a.foaf("img"))).concat(t.each(e, a.vcard("logo"))).concat(t.each(e, a.vcard("hasPhoto"))).concat(t.each(e, a.vcard("photo"))).concat(t.each(e, a.foaf("depiction")));
}
var P = {
	"solid:AppProviderClass": "noun_144.svg",
	"solid:AppProvider": "noun_15177.svg",
	"solid:Pod": "noun_Cabinet_1434380.svg",
	"vcard:Group": "noun_339237.svg",
	"vcard:Organization": "noun_143899.svg",
	"vcard:Individual": _,
	"schema:Person": _,
	"foaf:Person": _,
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
function L(e) {
	let t = p, n = w;
	if (e.sameTerm(a.foaf("Agent")) || e.sameTerm(a.rdf("Resource"))) return n + "noun_98053.svg";
	let r = t.any(e, a.sioc("avatar")) || t.any(e, a.foaf("img")) || t.any(e, a.vcard("logo")) || t.any(e, a.vcard("hasPhoto")) || t.any(e, a.vcard("photo")) || t.any(e, a.foaf("depiction"));
	return r ? r.uri : null;
}
function R(e, t, n) {
	let r = p, i = L(t);
	if (i) return e.setAttribute("src", i), !0;
	let a = n[t.uri];
	if (a) return e.setAttribute("src", a), e.style = s.classIconStyle, !0;
	let o = I(t);
	if (o) return e.setAttribute("src", o), !0;
	let c = r.findTypeURIs(t);
	for (let t in c) if (n[t]) return e.setAttribute("src", n[t]), !1;
	return e.setAttribute("src", w + "noun_10636_grey.svg"), !1;
}
function z(e, t) {
	let n = p, i = {};
	for (let e in P) {
		let t = e.split(":")[0], n = e.split(":")[1], o = a[t](n), s = P[e];
		s.startsWith("data:") ? i[o.uri] = s : i[o.uri] = r.join(s, w);
	}
	if (!R(e, t, i) && t.uri) {
		if (!n.fetcher) throw Error("kb has no fetcher");
		n.fetcher.nowOrWhenFetched(t.doc(), void 0, (n) => {
			n && R(e, t, i);
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
	}
	return z(n, t), n;
}
function re(e, t, n, r, a) {
	function o() {
		t.remove(), a();
	}
	function c() {
		o();
		let e = r();
		if (e && typeof e.then == "function") return e.then(a);
		a();
	}
	let l = e.createElement("div");
	l.style.cssText = s.confirmPopupStyle, l.style.position = "absolute", l.style.top = "-1em", l.style.display = "grid", l.style.gridTemplateColumns = "auto auto";
	let u = e.createElement("div");
	u.style.gridColumn = "1/2", u.style.gridRow = "1";
	let d = e.createElement("div");
	d.style.gridColumn = "1/2", d.style.gridRow = "2";
	let f = U(e, o);
	l.appendChild(f), f.style.gridColumn = "1", f.style.gridRow = "2";
	let p = l.appendChild(e.createElement("button"));
	p.style.cssText = s.buttonStyle, p.style.gridRow = "2", p.style.gridColumn = "2", p.textContent = "Cancel";
	let m = H(e, i.iconBase + "noun_925021.svg", "Delete it");
	l.appendChild(m), m.style.gridRow = "1", m.style.gridColumn = "1";
	let h = l.appendChild(e.createElement("button"));
	return h.style.cssText = s.buttonStyle, h.style.gridRow = "1", h.style.gridColumn = "2", h.textContent = n, l.appendChild(h), m.addEventListener("click", c), h.addEventListener("click", c), p.addEventListener("click", o), l;
}
function V(e, t, n, r, i) {
	function a() {
		let n = "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])", a = [];
		if (i) for (let e = t; e; e = e.parentElement) {
			let t = Array.from(e.querySelectorAll(n));
			a.push({
				element: e,
				index: t.indexOf(c)
			});
		}
		function o() {
			if (!i) return;
			if (c.isConnected) {
				c.focus();
				return;
			}
			for (let e of a) {
				if (!e.element.isConnected) continue;
				let t = e.element.querySelectorAll(n);
				if (t.length) {
					t[Math.min(Math.max(e.index, 0), t.length - 1)].focus();
					return;
				}
			}
			let e = a.find((e) => e.element.isConnected);
			e && (e.element.tabIndex = -1, e.element.focus());
		}
		let s = e.createElement("div");
		i ? (i.querySelector(":scope > [data-delete-confirmation]")?.remove(), s.setAttribute("data-delete-confirmation", ""), s.setAttribute("role", "dialog"), s.setAttribute("aria-label", l), i.appendChild(s)) : (t.insertBefore(s, c), s.style.position = "relative");
		let u = re(e, s, l, r, o);
		s.appendChild(u), i && (u.style.position = "static", u.style.top = "", Array.from(u.querySelectorAll("button")).find((e) => e.textContent === "Cancel")?.focus());
	}
	let o = w + "noun_2188_red.svg", c = e.createElement("img");
	c.setAttribute("src", o), c.tabIndex = 0, c.setAttribute("role", "button"), c.setAttribute("style", s.smallButtonStyle), c.style.float = "right";
	let l = "Remove this " + n;
	return c.title = l, c.setAttribute("aria-label", l), c.classList.add("hoverControlHide"), c.addEventListener("click", a), c.addEventListener("keydown", (e) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), c.click());
	}), t.classList.add("hoverControl"), t.appendChild(c), c.setAttribute("data-testid", "deleteButtonWithCheck"), c;
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
function ie(e, t, n, r, i, c) {
	return new Promise(function(t, l) {
		let u = e.createElement("div");
		r ||= a.foaf("name"), c ||= i ? o(i) : "  ";
		let d = c + " " + o(r) + ": ";
		u.appendChild(e.createElement("p")).textContent = d;
		let f = e.createElement("input");
		f.setAttribute("type", "text"), f.setAttribute("size", "100"), f.setAttribute("maxLength", "2048"), f.setAttribute("style", s.textInputStyle), f.select(), u.appendChild(f), n.appendChild(u);
		function p() {
			u.parentNode.removeChild(u), t(f.value.trim());
		}
		f.addEventListener("keyup", function(e) {
			e.keyCode === 13 && p();
		}, !1), u.appendChild(e.createElement("br")), u.appendChild(U(e, function(e) {
			u.parentNode.removeChild(u), t(null);
		})), u.appendChild(W(e, function(e) {
			p();
		})), f.focus();
	});
}
var G = K;
function K(e, t, n, r) {
	let i = e.createElement("tr");
	r ||= {};
	let a = i.appendChild(e.createElement("td")), o = i.appendChild(e.createElement("td")), s = i.appendChild(e.createElement("td")), c = r.image || B(e, n);
	a.setAttribute("style", "vertical-align: middle; width:2.5em; padding:0.5em; height: 2.5em;"), o.setAttribute("style", "vertical-align: middle; text-align:left;"), s.setAttribute("style", "vertical-align: middle; width:2em; padding:0.5em; height: 4em;"), a.appendChild(c);
	let l = o.appendChild(e.createElement("div")), d = l.appendChild(e.createElement("span"));
	if (r.title ? d.textContent = r.title : N(d, n), typeof r.renderNameSuffix == "function") {
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
	return r.deleteFunction && V(e, s, r.noun || "one", r.deleteFunction, r.confirmationContainer), n.uri && (r.link !== !1 && (s.appendChild(C(e, n)).classList.add("HoverControlHide"), s.appendChild(e.createElement("br"))), r.draggable !== !1 && (c.setAttribute("draggable", "false"), u(i, n))), i.subject = n, i;
}
function q(e, t, n, r) {
	let i = t.appendChild(e.createElement("div"));
	n ? i.textContent = n : N(i, r);
}
function J(e, t, n, r) {
	let i = t.appendChild(e.createElement("div"));
	i.setAttribute("style", s.linkDivStyle), r.deleteFunction && V(e, i, r.noun || "one", r.deleteFunction, r.confirmationContainer), n.uri && (r.link !== !1 && S(e, i, n), u(t, n));
}
function ae(e, t, n) {
	let r = e.createElement("div");
	r.setAttribute("style", s.renderAsDivStyle), n ||= {};
	let i = n.image || B(e, t);
	return b(e, r, i), q(e, r, n.title, t), J(e, r, t, n), n.clickable && n.onClickFunction && y(r, n.onClickFunction), n.wrapInATR ? x(e, r, t) : r;
}
function Y(e) {
	if (e.refresh) e.refresh();
	else for (let t = 0; t < e.children.length; t++) Y(e.children[t]);
}
function oe(e, r, i, o = {}) {
	let s = /* @__PURE__ */ new Set(), l = !!(o.renderSupportingInfo || o.renderNameSuffix), u = o.refreshOnDocumentLoad ?? !0, m = function(e) {
		let n = E.updater;
		if (!n) throw Error("kb has no updater");
		return new Promise((i) => n.update(t(r, C, e, b), [], function(e, t, n, r) {
			t ? _() : O(void 0, "Error deleting one: " + n), i();
		}));
	};
	function h(t) {
		let n = t, r = { noun: T };
		if (r.renderSupportingInfo = o.renderSupportingInfo, r.renderNameSuffix = o.renderNameSuffix, r.confirmationContainer = o.confirmationContainer, l && u && t?.uri && E.fetcher) {
			let e = t.doc(), n = e?.uri ? E.fetcher.requested?.[e.uri] : void 0, r = n !== "done" && n !== "failed";
			e?.uri && r && !s.has(e.uri) && (s.add(e.uri), E.fetcher.nowOrWhenFetched(e, void 0, () => {
				s.delete(e.uri), _();
			}));
		}
		return x && (r.deleteFunction = function() {
			return m(n);
		}), G(e, C, t, r);
	}
	let _ = function() {
		let e = E.each(r, C);
		e.sort(), g(j, e, h, l ? function(e, t) {
			return h(t);
		} : void 0);
	};
	function v(e) {
		let i = [];
		if (e.forEach(function(e) {
			let a = n(e);
			c("Dropped on attachemnt " + e), i.push(t(r, C, a, b));
		}), !E.updater) throw Error("kb has no updater");
		E.updater.update([], i, function(e, t, n, r) {
			t ? _() : O(void 0, "Error adding one: " + n);
		});
	}
	function y(e) {
		f(E.fetcher, e, o.uploadFolder?.uri, o.uploadFolder?.uri, function(e, n) {
			let i = [t(r, C, E.sym(n), b)];
			if (!E.updater) throw Error("kb has no updater");
			E.updater.update([], i, function(e, t, n, r) {
				t ? _() : O(void 0, "Error adding link to uploaded file: " + n);
			});
		});
	}
	let b = o.doc || r.doc();
	o.modify === void 0 && (o.modify = !0);
	let x = o.modify, S = o.promptIcon || w + "noun_748003.svg", C = o.predicate || a.wf("attachment"), T = o.noun || "attachment", E = p, D = i.appendChild(e.createElement("table"));
	D.setAttribute("style", "margin-top: 1em; margin-bottom: 1em;");
	let k = D.appendChild(e.createElement("tr")), A = k.appendChild(e.createElement("td")), j = k.appendChild(e.createElement("td")).appendChild(e.createElement("table"));
	if (j.appendChild(e.createElement("tr")), D.refresh = _, _(), x) {
		let t = H(e, S, "Drop attachments here");
		A.appendChild(t);
		let n = o.uploadFolder ? y : null;
		d(t, v, n);
		let r = t.querySelector("img");
		if (r && d(r, v, n), d(A, v, n), o.uploadFolder) {
			let t = $(e, y);
			A.appendChild(t);
		}
	}
	return D;
}
function se(e) {
	e.preventDefault(), e.stopPropagation();
	let t = h(e).getAttribute("href");
	if (!t) return c("openHrefInOutlineMode: No href found!\n");
	let n = window.document;
	n.outlineManager ? n.outlineManager.GotoSubject(p.sym(t), !0, void 0, !0, void 0) : window && window.panes && window.panes.getOutliner ? window.panes.getOutliner().GotoSubject(p.sym(t), !0, void 0, !0, void 0) : c("ERROR: Can't access outline manager in this config");
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
	return p.sym("http://tabulator.org/wiki/annnotation/" + t);
}
function le() {
	let e = {};
	return p.statementsMatching(void 0, a.rdf("type"), void 0).forEach(function(t) {
		t.object.value && (e[t.object.value] = !0);
	}), p.statementsMatching(void 0, a.rdfs("subClassOf"), void 0).forEach(function(t) {
		t.object.value && (e[t.object.value] = !0), t.subject.value && (e[t.subject.value] = !0);
	}), p.each(void 0, a.rdf("type"), a.rdfs("Class")).forEach(function(t) {
		t.value && (e[t.value] = !0);
	}), e;
}
function ue(e) {
	let t = {}, n = {}, r = {}, i = 0, o = 0, s = 0, c = e.predicateIndex;
	for (let e in c) c[e][0].object.termType === "Literal" ? (n[e] = !0, o++) : (r[e] = !0, i++);
	let u = e.each(void 0, a.rdf("type"), a.rdf("Property"));
	for (let e = 0; e < u.length; e++) {
		let t = u[e].toNT();
		!r[t] && !n[t] && (n[t] = !0, r[t] = !0, s++);
	}
	return t.op = r, t.dp = n, l(`propertyTriage: ${i} non-lit, ${o} literal. ${s} unknown.`), t;
}
function de(e, t) {
	let n = e.createElement("button");
	return n.setAttribute("type", "button"), n.textContent = "Goto " + o(t), n.addEventListener("click", function(n) {
		e.outlineManager.GotoSubject(t, !0, void 0, !0, void 0);
	}, !0), n;
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
			d === f ? (f.setAttribute("style", u), d = null) : (d && d.setAttribute("style", u), f.setAttribute("style", u + "background-color: #ccc; color:black;"), d = f), c(o, e, d === f), m();
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
	let n = e.createElement("div");
	return n.textContent = o(t), n;
}
function he(e) {
	let t = Z.twoLine[e.uri], n = p;
	if (t) return t;
	let r = n.findSuperClassesNT(e);
	for (let e in r) if (t = Z.twoLine[n.fromNT(e).uri], t) return t;
	return Z.twoLine[""];
}
function ge(e, t) {
	let n = "", r = function(e) {
		let r = p.any(t, a.qu(e));
		return r || (n += "@@ No value for " + e + "! "), r ? m(r.value) : "?";
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
        <td><a href="${m(t.uri)}">${m(n)}</a></td>
      </tr>`), i;
}
function _e(e, t) {
	let n = function(e) {
		let n = p.any(t, e);
		return n ? m(n.value) : "?";
	}, r = e.createElement("table");
	return r.innerHTML = `
    <tr>
      <td colspan="2">${n(a.dc("title"))}</td>
    </tr>
    <tr style="color: #777">
      <td>${n(a.cal("dtstart"))}</td>
      <td>${n(a.cal("dtend"))}</td>
    </tr>`, r;
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
function Q(t, n) {
	let r = {
		audio: "http://purl.org/dc/dcmitype/Sound",
		image: "http://purl.org/dc/dcmitype/Image",
		video: "http://purl.org/dc/dcmitype/MovingImage"
	}, i = n || "image", a = p.findTypeURIs(t), o = e.mediaTypeClass(i + "/*").uri.split("*")[0];
	for (let e in a) if (e.startsWith(o)) return !0;
	return r[i] in a;
}
function $(e, t) {
	let n = e.createElement("div"), r = n.appendChild(e.createElement("input"));
	r.setAttribute("type", "file"), r.setAttribute("multiple", "true"), r.addEventListener("change", (e) => {
		c("File drop event: ", e), e.files ? t(e.files) : e.target && e.target.files ? t(e.target.files) : alert("Sorry no files .. internal error?");
	}, !1), r.style = "display:none";
	let i = n.appendChild(H(e, w + "noun_Upload_76574_000000.svg", "Upload files", (e) => {
		r.click();
	}));
	return d(i, null, t), n;
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
export { ve as addStyleSheet, le as allClassURIs, ie as askName, oe as attachmentList, H as button, U as cancelButton, k as clearElement, O as complain, W as continueButton, J as createLinkDiv, q as createNameDiv, ce as defaultAnnotationStore, V as deleteButtonWithCheck, A as extractLogURI, B as faviconOrDefault, $ as fileUploadButtonDiv, L as findImage, I as findImageFromURI, M as formatDateTime, P as iconForClass, ne as imagesOf, Z as index, ye as isAudio, Q as isImage, be as isVideo, de as linkButton, se as openHrefInOutlineMode, G as personTR, ue as propertyTriage, Y as refreshTree, fe as removeButton, ae as renderAsDiv, K as renderAsRow, pe as selectorPanel, X as selectorPanelRefresh, z as setImage, N as setName, j as shortDate, te as shortTime, ee as timestamp };

//# sourceMappingURL=buttons.esm.js.map