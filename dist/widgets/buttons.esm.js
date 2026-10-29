import { icons as e } from "../lib/iconBase.esm.js";
import t from "../lib/ns.esm.js";
import { label as n } from "../utils/label.esm.js";
import { style as r } from "../lib/style.esm.js";
import { log as i } from "../lib/debug.esm.js";
import { info as a } from "../lib/log.esm.js";
import { makeDraggable as o, makeDropTarget as s, uploadFiles as c } from "./dragAndDrop.esm.js";
import { escapeForXML as l, getTarget as u, syncTableToArray as d } from "../utils/index.esm.js";
import f from "../lib/newperson.esm.js";
import { errorMessageBlock as p } from "./error.esm.js";
import { addClickListenerToElement as m, createImageDiv as h, wrapDivInATR as g } from "./widgetHelpers.esm.js";
import { createLinkForURI as _, linkIcon as v } from "./buttons/iconLinks.esm.js";
import { Util as y, st as b, sym as x, uri as S } from "rdflib";
import { store as C } from "solid-logic";
// src/widgets/buttons.ts
var { iconBase: w } = e, T = w + "noun_1180156.svg", E = w + "noun_1180158.svg";
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
	i("Complaint: " + t), n ? n.appendChild(p(e && e.dom || document, t)) : alert(t);
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
function N(e, r) {
	let i = C, a = function(e) {
		let n = i.any(e, t.vcard("fn")) || i.any(e, t.foaf("name")) || i.any(e, t.vcard("organization-name"));
		return n ? n.value : null;
	}, o = r.sameTerm(t.foaf("Agent")) ? "Everyone" : a(r);
	if (e.textContent = o || n(r), !o && r.uri) {
		if (!i.fetcher) throw Error("kb has no fetcher");
		i.fetcher.nowOrWhenFetched(r.doc(), void 0, function(t) {
			e.textContent = a(r) || n(r);
		});
	}
}
function ne(e, n) {
	return n.each(e, t.sioc("avatar")).concat(n.each(e, t.foaf("img"))).concat(n.each(e, t.vcard("logo"))).concat(n.each(e, t.vcard("hasPhoto"))).concat(n.each(e, t.vcard("photo"))).concat(n.each(e, t.foaf("depiction")));
}
var P = {
	"solid:AppProviderClass": "noun_144.svg",
	"solid:AppProvider": "noun_15177.svg",
	"solid:Pod": "noun_Cabinet_1434380.svg",
	"vcard:Group": "noun_339237.svg",
	"vcard:Organization": "noun_143899.svg",
	"vcard:Individual": f,
	"schema:Person": f,
	"foaf:Person": f,
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
	let n = C, r = w;
	if (e.sameTerm(t.foaf("Agent")) || e.sameTerm(t.rdf("Resource"))) return r + "noun_98053.svg";
	let i = n.any(e, t.sioc("avatar")) || n.any(e, t.foaf("img")) || n.any(e, t.vcard("logo")) || n.any(e, t.vcard("hasPhoto")) || n.any(e, t.vcard("photo")) || n.any(e, t.foaf("depiction"));
	return i ? i.uri : null;
}
function R(e, t, n) {
	let i = C, a = L(t);
	if (a) return e.setAttribute("src", a), !0;
	let o = n[t.uri];
	if (o) return e.setAttribute("src", o), e.style = r.classIconStyle, !0;
	let s = I(t);
	if (s) return e.setAttribute("src", s), !0;
	let c = i.findTypeURIs(t);
	for (let t in c) if (n[t]) return e.setAttribute("src", n[t]), !1;
	return e.setAttribute("src", w + "noun_10636_grey.svg"), !1;
}
function z(e, n) {
	let r = C, i = {};
	for (let e in P) {
		let n = e.split(":")[0], r = e.split(":")[1], a = t[n](r), o = P[e];
		o.startsWith("data:") ? i[a.uri] = o : i[a.uri] = S.join(o, w);
	}
	if (!R(e, n, i) && n.uri) {
		if (!r.fetcher) throw Error("kb has no fetcher");
		r.fetcher.nowOrWhenFetched(n.doc(), void 0, (t) => {
			t && R(e, n, i);
		});
	}
}
function B(e, t) {
	let n = e.createElement("img");
	if (n.style = r.iconStyle, n.setAttribute("src", w + (function(e) {
		if (!e.uri) return !1;
		let t = e.uri.split("/");
		return t.length === 3 || t.length === 4 && t[3] === "";
	}(t) ? "noun_15177.svg" : "noun_681601.svg")), t.uri && t.uri.startsWith("https:") && t.uri.indexOf("#") < 0) {
		let r = e.createElement("object");
		return r.setAttribute("data", F(t) + "favicon.ico"), r.setAttribute("type", "image/x-icon"), r.appendChild(n), r;
	}
	return z(n, t), n;
}
function re(t, n, i, a, o) {
	function s() {
		n.remove(), o();
	}
	function c() {
		s();
		let e = a();
		if (e && typeof e.then == "function") return e.then(o);
		o();
	}
	let l = t.createElement("div");
	l.style.cssText = r.confirmPopupStyle, l.style.position = "absolute", l.style.top = "-1em", l.style.display = "grid", l.style.gridTemplateColumns = "auto auto";
	let u = t.createElement("div");
	u.style.gridColumn = "1/2", u.style.gridRow = "1";
	let d = t.createElement("div");
	d.style.gridColumn = "1/2", d.style.gridRow = "2";
	let f = U(t, s);
	l.appendChild(f), f.style.gridColumn = "1", f.style.gridRow = "2";
	let p = l.appendChild(t.createElement("button"));
	p.style.cssText = r.buttonStyle, p.style.gridRow = "2", p.style.gridColumn = "2", p.textContent = "Cancel";
	let m = H(t, e.iconBase + "noun_925021.svg", "Delete it");
	l.appendChild(m), m.style.gridRow = "1", m.style.gridColumn = "1";
	let h = l.appendChild(t.createElement("button"));
	return h.style.cssText = r.buttonStyle, h.style.gridRow = "1", h.style.gridColumn = "2", h.textContent = i, l.appendChild(h), m.addEventListener("click", c), h.addEventListener("click", c), p.addEventListener("click", s), l;
}
function V(e, t, n, i, a) {
	function o() {
		let n = "button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"])", r = [];
		if (a) for (let e = t; e; e = e.parentElement) {
			let t = Array.from(e.querySelectorAll(n));
			r.push({
				element: e,
				index: t.indexOf(c)
			});
		}
		function o() {
			if (!a) return;
			if (c.isConnected) {
				c.focus();
				return;
			}
			for (let e of r) {
				if (!e.element.isConnected) continue;
				let t = e.element.querySelectorAll(n);
				if (t.length) {
					t[Math.min(Math.max(e.index, 0), t.length - 1)].focus();
					return;
				}
			}
			let e = r.find((e) => e.element.isConnected);
			e && (e.element.tabIndex = -1, e.element.focus());
		}
		let s = e.createElement("div");
		a ? (a.querySelector(":scope > [data-delete-confirmation]")?.remove(), s.setAttribute("data-delete-confirmation", ""), s.setAttribute("role", "dialog"), s.setAttribute("aria-label", l), a.appendChild(s)) : (t.insertBefore(s, c), s.style.position = "relative");
		let u = re(e, s, l, i, o);
		s.appendChild(u), a && (u.style.position = "static", u.style.top = "", Array.from(u.querySelectorAll("button")).find((e) => e.textContent === "Cancel")?.focus());
	}
	let s = w + "noun_2188_red.svg", c = e.createElement("img");
	c.setAttribute("src", s), c.tabIndex = 0, c.setAttribute("role", "button"), c.setAttribute("style", r.smallButtonStyle), c.style.float = "right";
	let l = "Remove this " + n;
	return c.title = l, c.setAttribute("aria-label", l), c.classList.add("hoverControlHide"), c.addEventListener("click", o), c.addEventListener("keydown", (e) => {
		(e.key === "Enter" || e.key === " ") && (e.preventDefault(), c.click());
	}), t.classList.add("hoverControl"), t.appendChild(c), c.setAttribute("data-testid", "deleteButtonWithCheck"), c;
}
function H(e, t, n, i, a = {
	buttonColor: "Primary",
	needsBorder: !1
}) {
	let o = e.createElement("button");
	if (o.setAttribute("type", "button"), t) {
		let i = o.appendChild(e.createElement("img"));
		i.setAttribute("src", t), i.setAttribute("style", "width: 2em; height: 2em;"), i.title = n, o.setAttribute("style", r.buttonStyle);
	} else o.textContent = n.toLocaleUpperCase(), o.onmouseover = function() {
		a.buttonColor === "Secondary" ? a.needsBorder ? o.setAttribute("style", r.secondaryButtonNoBorderHover) : o.setAttribute("style", r.secondaryButtonHover) : a.needsBorder ? o.setAttribute("style", r.primaryButtonNoBorderHover) : o.setAttribute("style", r.primaryButtonHover);
	}, o.onmouseout = function() {
		a.buttonColor === "Secondary" ? a.needsBorder ? o.setAttribute("style", r.secondaryButtonNoBorder) : o.setAttribute("style", r.secondaryButton) : a.needsBorder ? o.setAttribute("style", r.primaryButtonNoBorder) : o.setAttribute("style", r.primaryButton);
	}, a.buttonColor === "Secondary" ? a.needsBorder ? o.setAttribute("style", r.secondaryButtonNoBorder) : o.setAttribute("style", r.secondaryButton) : a.needsBorder ? o.setAttribute("style", r.primaryButtonNoBorder) : o.setAttribute("style", r.primaryButton);
	return i && o.addEventListener("click", i, !1), o;
}
function U(e, t) {
	let n = H(e, T, "Cancel", t);
	return n.firstChild && (n.firstChild.style.opacity = "0.3"), n;
}
function W(e, t) {
	return H(e, E, "Continue", t);
}
function ie(e, i, a, o, s, c) {
	return new Promise(function(i, l) {
		let u = e.createElement("div");
		o ||= t.foaf("name"), c ||= s ? n(s) : "  ";
		let d = c + " " + n(o) + ": ";
		u.appendChild(e.createElement("p")).textContent = d;
		let f = e.createElement("input");
		f.setAttribute("type", "text"), f.setAttribute("size", "100"), f.setAttribute("maxLength", "2048"), f.setAttribute("style", r.textInputStyle), f.select(), u.appendChild(f), a.appendChild(u);
		function p() {
			u.parentNode.removeChild(u), i(f.value.trim());
		}
		f.addEventListener("keyup", function(e) {
			e.keyCode === 13 && p();
		}, !1), u.appendChild(e.createElement("br")), u.appendChild(U(e, function(e) {
			u.parentNode.removeChild(u), i(null);
		})), u.appendChild(W(e, function(e) {
			p();
		})), f.focus();
	});
}
var G = K;
function K(e, t, n, r) {
	let i = e.createElement("tr");
	r ||= {};
	let a = i.appendChild(e.createElement("td")), s = i.appendChild(e.createElement("td")), c = i.appendChild(e.createElement("td")), l = r.image || B(e, n);
	a.setAttribute("style", "vertical-align: middle; width:2.5em; padding:0.5em; height: 2.5em;"), s.setAttribute("style", "vertical-align: middle; text-align:left;"), c.setAttribute("style", "vertical-align: middle; width:2em; padding:0.5em; height: 4em;"), a.appendChild(l);
	let u = s.appendChild(e.createElement("div")), d = u.appendChild(e.createElement("span"));
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
			let n = s.appendChild(e.createElement("div"));
			n.setAttribute("style", "font-size: 90%; opacity: 0.8;"), typeof t == "string" ? n.textContent = t : n.appendChild(t);
		}
	}
	return r.deleteFunction && V(e, c, r.noun || "one", r.deleteFunction, r.confirmationContainer), n.uri && (r.link !== !1 && (c.appendChild(v(e, n)).classList.add("HoverControlHide"), c.appendChild(e.createElement("br"))), r.draggable !== !1 && (l.setAttribute("draggable", "false"), o(i, n))), i.subject = n, i;
}
function q(e, t, n, r) {
	let i = t.appendChild(e.createElement("div"));
	n ? i.textContent = n : N(i, r);
}
function J(e, t, n, i) {
	let a = t.appendChild(e.createElement("div"));
	a.setAttribute("style", r.linkDivStyle), i.deleteFunction && V(e, a, i.noun || "one", i.deleteFunction, i.confirmationContainer), n.uri && (i.link !== !1 && _(e, a, n), o(t, n));
}
function ae(e, t, n) {
	let i = e.createElement("div");
	i.setAttribute("style", r.renderAsDivStyle), n ||= {};
	let a = n.image || B(e, t);
	return h(e, i, a), q(e, i, n.title, t), J(e, i, t, n), n.clickable && n.onClickFunction && m(i, n.onClickFunction), n.wrapInATR ? g(e, i, t) : i;
}
function Y(e) {
	if (e.refresh) e.refresh();
	else for (let t = 0; t < e.children.length; t++) Y(e.children[t]);
}
function oe(e, n, r, a = {}) {
	let o = /* @__PURE__ */ new Set(), l = !!(a.renderSupportingInfo || a.renderNameSuffix), u = a.refreshOnDocumentLoad ?? !0, f = function(e) {
		let t = E.updater;
		if (!t) throw Error("kb has no updater");
		return new Promise((r) => t.update(b(n, S, e, _), [], function(e, t, n, i) {
			t ? m() : O(void 0, "Error deleting one: " + n), r();
		}));
	};
	function p(t) {
		let n = t, r = { noun: T };
		if (r.renderSupportingInfo = a.renderSupportingInfo, r.renderNameSuffix = a.renderNameSuffix, r.confirmationContainer = a.confirmationContainer, l && u && t?.uri && E.fetcher) {
			let e = t.doc(), n = e?.uri ? E.fetcher.requested?.[e.uri] : void 0, r = n !== "done" && n !== "failed";
			e?.uri && r && !o.has(e.uri) && (o.add(e.uri), E.fetcher.nowOrWhenFetched(e, void 0, () => {
				o.delete(e.uri), m();
			}));
		}
		return v && (r.deleteFunction = function() {
			return f(n);
		}), G(e, S, t, r);
	}
	let m = function() {
		let e = E.each(n, S);
		e.sort(), d(j, e, p, l ? function(e, t) {
			return p(t);
		} : void 0);
	};
	function h(e) {
		let t = [];
		if (e.forEach(function(e) {
			let r = x(e);
			i("Dropped on attachemnt " + e), t.push(b(n, S, r, _));
		}), !E.updater) throw Error("kb has no updater");
		E.updater.update([], t, function(e, t, n, r) {
			t ? m() : O(void 0, "Error adding one: " + n);
		});
	}
	function g(e) {
		c(E.fetcher, e, a.uploadFolder?.uri, a.uploadFolder?.uri, function(e, t) {
			let r = [b(n, S, E.sym(t), _)];
			if (!E.updater) throw Error("kb has no updater");
			E.updater.update([], r, function(e, t, n, r) {
				t ? m() : O(void 0, "Error adding link to uploaded file: " + n);
			});
		});
	}
	let _ = a.doc || n.doc();
	a.modify === void 0 && (a.modify = !0);
	let v = a.modify, y = a.promptIcon || w + "noun_748003.svg", S = a.predicate || t.wf("attachment"), T = a.noun || "attachment", E = C, D = r.appendChild(e.createElement("table"));
	D.setAttribute("style", "margin-top: 1em; margin-bottom: 1em;");
	let k = D.appendChild(e.createElement("tr")), A = k.appendChild(e.createElement("td")), j = k.appendChild(e.createElement("td")).appendChild(e.createElement("table"));
	if (j.appendChild(e.createElement("tr")), D.refresh = m, m(), v) {
		let t = H(e, y, "Drop attachments here");
		A.appendChild(t);
		let n = a.uploadFolder ? g : null;
		s(t, h, n);
		let r = t.querySelector("img");
		if (r && s(r, h, n), s(A, h, n), a.uploadFolder) {
			let t = $(e, g);
			A.appendChild(t);
		}
	}
	return D;
}
function se(e) {
	e.preventDefault(), e.stopPropagation();
	let t = u(e).getAttribute("href");
	if (!t) return i("openHrefInOutlineMode: No href found!\n");
	let n = window.document;
	n.outlineManager ? n.outlineManager.GotoSubject(C.sym(t), !0, void 0, !0, void 0) : window && window.panes && window.panes.getOutliner ? window.panes.getOutliner().GotoSubject(C.sym(t), !0, void 0, !0, void 0) : i("ERROR: Can't access outline manager in this config");
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
	let e = {};
	return C.statementsMatching(void 0, t.rdf("type"), void 0).forEach(function(t) {
		t.object.value && (e[t.object.value] = !0);
	}), C.statementsMatching(void 0, t.rdfs("subClassOf"), void 0).forEach(function(t) {
		t.object.value && (e[t.object.value] = !0), t.subject.value && (e[t.subject.value] = !0);
	}), C.each(void 0, t.rdf("type"), t.rdfs("Class")).forEach(function(t) {
		t.value && (e[t.value] = !0);
	}), e;
}
function ue(e) {
	let n = {}, r = {}, i = {}, o = 0, s = 0, c = 0, l = e.predicateIndex;
	for (let e in l) l[e][0].object.termType === "Literal" ? (r[e] = !0, s++) : (i[e] = !0, o++);
	let u = e.each(void 0, t.rdf("type"), t.rdf("Property"));
	for (let e = 0; e < u.length; e++) {
		let t = u[e].toNT();
		!i[t] && !r[t] && (r[t] = !0, i[t] = !0, c++);
	}
	return n.op = i, n.dp = r, a(`propertyTriage: ${o} non-lit, ${s} literal. ${c} unknown.`), n;
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
function ge(e, n) {
	let r = "", i = function(e) {
		let i = C.any(n, t.qu(e));
		return i || (r += "@@ No value for " + e + "! "), i ? l(i.value) : "?";
	}, a = e.createElement("table");
	return a.innerHTML = `
      <tr>
      <td colspan="2"> ${i("payee")}</td>
      < /tr>
      < tr >
      <td>${i("date").slice(0, 10)}</td>
      <td style = "text-align: right;">${i("amount")}</td>
      </tr>`, r && (a.innerHTML = `
      <tr>
        <td><a href="${l(n.uri)}">${l(r)}</a></td>
      </tr>`), a;
}
function _e(e, n) {
	let r = function(e) {
		let t = C.any(n, e);
		return t ? l(t.value) : "?";
	}, i = e.createElement("table");
	return i.innerHTML = `
    <tr>
      <td colspan="2">${r(t.dc("title"))}</td>
    </tr>
    <tr style="color: #777">
      <td>${r(t.cal("dtstart"))}</td>
      <td>${r(t.cal("dtend"))}</td>
    </tr>`, i;
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
	r.setAttribute("type", "file"), r.setAttribute("multiple", "true"), r.addEventListener("change", (e) => {
		i("File drop event: ", e), e.files ? t(e.files) : e.target && e.target.files ? t(e.target.files) : alert("Sorry no files .. internal error?");
	}, !1), r.style = "display:none";
	let a = n.appendChild(H(e, w + "noun_Upload_76574_000000.svg", "Upload files", (e) => {
		r.click();
	}));
	return s(a, null, t), n;
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