import { V as e, h as t, m as n, t as r } from "./index.esm-Bw45lU2x.js";
//#region src/lib/log.ts
var i = /* @__PURE__ */ e({
	LogLevel: () => ee,
	alert: () => b,
	clear: () => ie,
	debug: () => v,
	dumpHTML: () => S,
	error: () => ne,
	escapeForXML: () => T,
	info: () => y,
	logAscending: () => C,
	logDescending: () => w,
	msg: () => te,
	setInternals: () => E,
	setLevel: () => x,
	success: () => re,
	warn: () => _
}), a = 1, o = 2, s = 4, c = 8, l = 16, u = 32, d = 63, ee = /*#__PURE__*/ function(e) {
	return e[e.Error = 1] = "Error", e[e.Warning = 2] = "Warning", e[e.Message = 4] = "Message", e[e.Success = 8] = "Success", e[e.Info = 16] = "Info", e[e.Debug = 32] = "Debug", e[e.All = 63] = "All", e;
}({}), f = 7, p = !1, m = document, h = window;
function g(e, t = s, n = "mesg") {
	if (f & t) {
		if (m !== void 0) {
			let t = m.getElementById("status");
			if (!t) return;
			let r = m.createElement("span");
			r.setAttribute("class", n);
			let i = /* @__PURE__ */ new Date();
			r.innerHTML = `${i.getHours()}:${i.getMinutes()}:${i.getSeconds()} [${n}] ${T(e)}<br/>`, p ? t.insertBefore(r, t.firstChild) : t.appendChild(r);
		} else typeof console < "u" && console.log(e);
	}
}
function te(e) {
	g(e);
}
function _(e) {
	g(e, o, "warn");
}
function v(e) {
	g(e, u, "dbug");
}
function y(e) {
	g(e, l, "info");
}
function ne(e) {
	g(e, a, "eror");
}
function re(e) {
	g(e, c, "good");
}
function b(e) {
	h && h.alert !== void 0 ? h.alert(e) : _(e);
}
function ie() {
	let e = m?.getElementById("status");
	e && (e.innerHTML = "");
}
function x(e) {
	f = d, v("Log level is now " + e), f = e;
}
function S() {
	if (!m) return;
	let e = f;
	f = d, v(m?.body?.innerHTML || ""), f = e;
}
function C() {
	p = !0;
}
function w() {
	p = !1;
}
function T(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function E(e, t) {
	h = e, m = t;
}
//#endregion
//#region src/utils/label.ts
var D = {
	log: i,
	ns: n,
	rdf: t
};
function O(e, t = !1) {
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
	let i = ae(e);
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
	a = k(a, "/profile/card#me"), a = k(a, "#this"), a = k(a, "#me");
	let o = a.indexOf("#");
	if (o >= 0) return r(a.slice(o + 1));
	let s = a.lastIndexOf("/", a.length - 2);
	return s >= 0 && s < e.uri.length ? r(a.slice(s + 1)) : n(decodeURIComponent(e.uri));
}
function k(e, t) {
	let n = t.length * -1;
	return e.slice(n) === t ? e.slice(0, n) : e;
}
function ae(e) {
	return r.any(e, D.ns.ui("label")) || r.any(e, D.ns.link("message")) || r.any(e, D.ns.vcard("fn")) || r.any(e, D.ns.foaf("name")) || r.any(e, D.ns.dct("title")) || r.any(e, D.ns.dc("title")) || r.any(e, D.ns.rss("title")) || r.any(e, D.ns.contact("fullName")) || r.any(e, r.sym("http://www.w3.org/2001/04/roadmap/org#name")) || r.any(e, D.ns.cal("summary")) || r.any(e, D.ns.foaf("nick")) || r.any(e, D.ns.as("name")) || r.any(e, D.ns.schema("name")) || r.any(e, D.ns.rdfs("label")) || r.any(e, r.sym("http://www.w3.org/2004/02/skos/core#prefLabel"));
}
//#endregion
//#region src/utils/index.js
var oe = /* @__PURE__ */ e({
	AJARImage: () => ue,
	RDFComparePredicateObject: () => pe,
	RDFComparePredicateSubject: () => me,
	addLoadEvent: () => ce,
	ancestor: () => H,
	beep: () => P,
	clearVariableNames: () => M,
	emptyNode: () => B,
	escapeForXML: () => Y,
	findPos: () => K,
	genUuid: () => I,
	getAbout: () => U,
	getEyeFocus: () => le,
	getTarget: () => V,
	getTerm: () => W,
	hashColor: () => F,
	include: () => G,
	label: () => O,
	labelForXML: () => fe,
	labelWithOntology: () => J,
	newVariableName: () => se,
	ontologyLabel: () => q,
	predParentOf: () => he,
	predicateLabel: () => Z,
	predicateLabelForXML: () => X,
	shortName: () => de,
	stackString: () => z,
	syncTableToArray: () => L,
	syncTableToArrayReOrdered: () => R
}), A = {
	log: i,
	ns: n,
	rdf: t
}, j = 0;
function se() {
	return "v" + j++;
}
function M() {
	j = 0;
}
var N;
typeof AudioContext < "u" ? N = AudioContext : typeof window < "u" && (N = window.AudioContext || window.webkitAudioContext);
function P() {
	if (!N) return;
	let e = new N();
	return function(t, n, r, i) {
		t = +(t || .3), r ||= "sine", typeof i != "function" && (i = function() {});
		let a = e.createOscillator();
		a.type = r, a.frequency.value = n || 256, a.connect(e.destination), a.start(0), a.stop(t);
	};
}
function F(e) {
	return e = e.uri || e, "#" + (function(e) {
		return e.split("").reduce(function(e, t) {
			return e = (e << 5) - e + t.charCodeAt(0), e & e;
		}, 0);
	}(e) & 16777215 | 12632256).toString(16);
}
function I() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
		let t = Math.random() * 16 | 0;
		return (e === "x" ? t : t & 3 | 8).toString(16);
	});
}
function L(e, t, n, r) {
	let i, a, o = 0;
	for (; o < e.children.length; o++) a = e.children[o], a.trashMe = !0;
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
function R(e, t, n) {
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
function z(e) {
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
function B(e) {
	let t = e.childNodes, n = t.length;
	for (let r = n - 1; r >= 0; r--) e.removeChild(t[r]);
	return e;
}
function V(e) {
	let t;
	return e ||= window.event, e.target ? t = e.target : e.srcElement && (t = e.srcElement), t.nodeType === 3 && (t = t.parentNode), t;
}
function H(e, t) {
	let n;
	for (n = e; n; n = n.parentNode) try {
		if (n.tagName === t) return n;
	} catch {
		return;
	}
}
function U(e, t) {
	let n, r;
	for (n = t; n && n.nodeType === 1; n = n.parentNode) if (r = n.getAttribute("about"), r) return e.fromNT(r);
	A.log.debug("getAbout: No about found");
}
function W(e) {
	let t = e.parentNode, n = t ? t.AJAR_statement : void 0;
	switch (n ? e.className : "") {
		case "pred":
		case "pred selected": return n.predicate;
		case "obj":
		case "obj selected": return t.AJAR_inverse ? n.subject : n.object;
		case "":
		case "selected": return U(r, e);
		case "undetermined selected": return e.nextSibling ? n.predicate : t.AJAR_inverse ? n.subject : n.object;
	}
}
function G(e, t) {
	let n = e.createElement("script");
	return n.setAttribute("type", "text/javascript"), n.setAttribute("src", t), n;
}
function ce(e) {
	let t = window.onload;
	typeof window.onload == "function" ? window.onload = function() {
		t(), e();
	} : window.onload = e;
}
function K(e) {
	let t = e.ownerDocument.documentElement.getBoundingClientRect(), n = e.getBoundingClientRect();
	return [n.left - t.left, n.top - t.top];
}
function le(e, t, n, r) {
	r ||= window;
	let i = K(e)[1], a = window.SolidAppContext || {}, o = i - (a && a.scroll || 52) - r.scrollY;
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
function ue(e, t, n, r) {
	r ||= document;
	let i = r.createElement("img");
	return i.setAttribute("src", e), i.addEventListener("copy", function(e) {
		e.clipboardData.setData("text/plain", ""), e.clipboardData.setData("text/html", ""), e.preventDefault();
	}), n !== void 0 && i.setAttribute("title", n), i;
}
function de(e) {
	let t = e;
	"#/".indexOf(t[t.length - 1]) >= 0 && (t = t.slice(0, -1));
	let n = [];
	for (let e in this.prefixes) n[this.prefixes[e]] = e;
	let r, i = function(e) {
		return e !== "ns" && (r = e, !0);
	}, a, o = t.lastIndexOf("#");
	for (o >= 0 && (t = t.slice(o - 1));;) {
		let e = t.lastIndexOf("/");
		for (e >= 0 && (t = t.slice(e + 1)), a = 0; a < t.length && this.prefixchars.indexOf(t[a]);) a++;
		if (t = t.slice(0, a), t.length < 6 && i(t) || i(t.slice(0, 3)) || i(t.slice(0, 2)) || i(t.slice(0, 4)) || i(t.slice(0, 1)) || i(t.slice(0, 5))) return r;
		for (a = 0;; a++) if (i(t.slice(0, 3) + a)) return r;
	}
}
function q(e) {
	if (e.uri === void 0) return "??";
	let t = e.uri, n = [], r = t.lastIndexOf("#"), i;
	if (r >= 0) t = t.slice(0, r + 1);
	else if (r = t.lastIndexOf("/"), r >= 0) t = t.slice(0, r + 1);
	else return e.uri + "?!";
	for (let e in A.ns) n[A.ns[e]] = e;
	try {
		return n[t];
	} catch {}
	for (t = t.slice(0, -1); t;) if (r = t.lastIndexOf("/"), r >= 0) {
		if (i = t.slice(r + 1), t = t.slice(0, r), i !== "ns" && "0123456789".indexOf(i[0]) < 0) return i;
	} else return e.uri + "!?";
}
function J(e, t) {
	let n = r.findTypeURIs(e);
	return n[A.ns.rdf("Predicate").uri] || n[A.ns.rdfs("Class").uri] ? O(e, t) + " (" + q(e) + ")" : O(e, t);
}
function Y(e) {
	return e.replace(/&/g, "&amp;").replace(/</g, "&lt;");
}
function fe(e) {
	return Y(O(e));
}
function X(e, t) {
	return Y(Z(e, t));
}
function Z(e, t) {
	let n = O(e);
	if (t) {
		let t = r.any(e, A.ns.owl("inverseOf")) || r.any(void 0, A.ns.owl("inverseOf"), e);
		return t ? O(t) : n === "type" ? "..." : "is " + n + " of";
	}
	return n;
}
function pe(e, t) {
	let n = e.predicate.compareTerm(t.predicate);
	return n === 0 ? e.object.compareTerm(t.object) : n;
}
function me(e, t) {
	let n = e.predicate.compareTerm(t.predicate);
	return n === 0 ? e.subject.compareTerm(t.subject) : n;
}
function he(e) {
	let t = e;
	for (;;) if (t.getAttribute("predTR")) return t;
	else if (t.previousSibling && t.previousSibling.nodeName === "TR") t = t.previousSibling;
	else return A.log.error("Could not find predParent"), e;
}
//#endregion
//#region src/lib/styleConstants.js
var Q = {
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
}, $ = {
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
		`padding-left: 0em; border: 0.0em solid ${Q.formBorderColor}; border-radius: 0.2em;`,
		`padding-left: 2em; border: 0.05em solid ${Q.formBorderColor}; border-radius: 0.2em;`,
		`padding-left: 2em; border: 0.1em solid ${Q.formBorderColor}; border-radius: 0.2em;`,
		`padding-left: 2em; border: 0.2em solid ${Q.formBorderColor}; border-radius: 0.2em;`
	],
	formFieldLabelStyle: `color: ${Q.lowProfileLinkColor}; text-decoration: none;`,
	formFieldNameBoxStyle: `padding: 0.3em; vertical-align: middle; width:${Q.formFieldNameBoxWidth};`,
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
	controlStyle: `border-radius: 0.5em; margin: 0.8em; width:${Q.mediaModuleCanvasWidth}; height:${Q.mediaModuleCanvasHeight};`,
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
$.setStyle = function(e, t) {
	e.style = $[t];
};
//#endregion
export { V as a, R as c, b as d, v as f, Y as i, oe as l, i as m, Q as n, J as o, y as p, P as r, L as s, $ as t, O as u };

//# sourceMappingURL=style-hKLNZ2t9.js.map