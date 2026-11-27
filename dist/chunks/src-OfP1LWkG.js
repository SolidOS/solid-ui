import { A as e, C as t, D as n, E as r, H as i, I as a, M as o, O as s, P as c, R as l, S as u, T as d, V as f, W as p, a as m, b as h, c as g, d as _, i as v, j as y, k as b, n as x, o as S, r as C, s as w, t as T, u as ee, v as E, w as te, x as D, y as ne } from "./solidLogicSingleton.esm-Dva9_prE.js";
import { l as re } from "./auth-BVJCNneE.js";
import { n as O, r as k, t as A } from "./index.esm-Dla45Mcl.js";
import { a as ie, d as ae, l as oe, m as se, n as ce, r as le, s as ue, t as j, u as M } from "./style-CuYGj-Cj.js";
import { C as de, D as fe, E as N, O as pe, S as me, T as he, _ as ge, b as P, c as _e, d as ve, f as ye, g as be, h as xe, i as Se, l as Ce, m as we, n as Te, o as Ee, p as De, r as Oe, s as ke, t as Ae, u as je, v as Me, w as Ne, x as Pe, y as Fe } from "./widgets-1XsPS-SN.js";
import "./components-s2INdWKd.js";
import "./dialogs-DrjXBAEy.js";
import "./context-CR4Ueyiu.js";
// src/acl/acl.ts
var F = T.store;
function Ie(e, t, n, i) {
	let a = E.acl, o = e.uri.slice(-1) === "/", s = F.each(void 0, a("default"), n, i).concat(F.each(void 0, a("defaultForNew"), n, i)).reduce((t, n) => t.concat(F.statementsMatching(n, E.rdf("type"), a("Authorization"), i)).concat(F.statementsMatching(n, a("agent"), void 0, i)).concat(F.statementsMatching(n, a("agentClass"), void 0, i)).concat(F.statementsMatching(n, a("agentGroup"), void 0, i)).concat(F.statementsMatching(n, a("origin"), void 0, i)).concat(F.statementsMatching(n, a("originClass"), void 0, i)).concat(F.statementsMatching(n, a("mode"), void 0, i)).concat(r(n, a("accessTo"), e, i)).concat(o ? r(n, a("default"), e, i) : []), []), c = u();
	return s.forEach((e) => c.add(l(e.subject), l(e.predicate), l(e.object), d(t.uri))), c;
	function l(e) {
		let n = i.uri.length;
		return d(e.uri.slice(0, n) === i.uri ? t.uri + e.uri.slice(n) : e.uri);
	}
}
function Le(e, t, n = F, r = !1) {
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
function Re(e, t) {
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
function ze(e) {
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
function Be(e, t) {
	let n = [], r = function(e) {
		e.length ? Qe(e.shift().doc(), function(i, a, o, s, c, l) {
			let u = !a;
			if (!i || !c || !l) return t(i, s);
			let d = u ? Le(c, l) : Le(o, s);
			n.push(d), r(e.slice(1));
		}) : t(!0, ze(n));
	};
	r(e);
}
function Ve(e) {
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
function He(e, t, n, r) {
	return Ue(e, t, Ve(n), r);
}
function Ue(e, t, n, r, i, a) {
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
function We(e) {
	return Ge(Ve(e));
}
function Ge(e) {
	let t = "";
	for (let n in e) {
		let r = n.split("\n").map(function(e) {
			return e.split("#")[1][0];
		}).join("");
		t += r + ":";
		let i = e[n];
		for (let e = 0; e < i.length; e++) {
			let n = i[e][0], r = d(i[e][1]);
			t += n === "agent" ? "@" : "", t += r.sameTerm(E.foaf("Agent")) ? "*" : M(r), e < i.length - 1 && (t += ",");
		}
		t += ";";
	}
	return "{" + t.slice(0, -1) + "}";
}
function Ke(e, t, n) {
	let r = u();
	return He(r, e, t, n), c(n, r, n.uri, "text/turtle") || "";
}
function qe(e, t, n, r, i) {
	return Je(e, t, Ve(n), r, i);
}
function Je(e, t, n, r, i) {
	let a = u();
	Ue(a, t, n, r, !0), e.updater?.put(r, a.statementsMatching(void 0, void 0, void 0, r), "text/turtle", function(a, o, s) {
		o ? (e.fetcher?.unload(r), Ue(e, t, n, r, !0), e.fetcher.requested[r.uri] = "done", i(o)) : i(o, s);
	});
}
function Ye(e, t, n) {
	let r = F.each(void 0, E.vcard("hasMember"), e);
	r ? Xe(e, r, t, n) : (t("This card is in no groups"), n(!0));
}
function Xe(e, t, n, r) {
	n ||= N;
	let i = e.doc();
	Qe(i, function(a, o, s, c, l, u) {
		if (!a || !l || !u) return r(!1, c);
		let d = o ? Le(s, c) : Le(l, u);
		Be(t, function(t, a) {
			if (!t) return r(!1, a);
			Re(a, d) ? n("Nice - same ACL. no change " + M(e) + " " + i) : (n("Group ACLs differ for " + M(e) + " " + i), qe(F, s, a, c, r));
		});
	});
}
function Ze(e, t, n) {
	let r = F.any(e, _);
	if (!F.fetcher) throw Error("Store has no fetcher");
	r ? F.fetcher.webOperation("PUT", r.value, {
		data: t,
		contentType: "text/turtle"
	}).then((e) => {
		n(e.ok, e.error || "");
	}) : F.fetcher.nowOrWhenFetched(e, void 0, function(r, i) {
		if (!r) return n(r, "Gettting headers for ACL: " + i);
		let a = F.any(e, _);
		if (!a) n(!1, "No Link rel=ACL header for " + e);
		else {
			if (!F.fetcher) throw Error("Store has no fetcher");
			F.fetcher.webOperation("PUT", a.value, {
				data: t,
				contentType: "text/turtle"
			}).then((e) => {
				n(e.ok, e.error || "");
			});
		}
	});
}
function Qe(e, t) {
	$e(e, function(n, r, i, a) {
		let o = E.acl;
		if (!n) return t(!1, !1, r, a);
		let s = function(n) {
			n.slice(-1) === "/" && (n = n.slice(0, -1));
			let r = n.lastIndexOf("/");
			if (n.indexOf("/", n.indexOf("//") + 2) > r) return t(!1, !0, 404, "Found no ACL resource");
			n = n.slice(0, r + 1);
			let a = d(n);
			$e(a, function(r, c, l) {
				return r ? c === 403 ? t(!1, !0, c, `( default ACL file FORBIDDEN. Stop.${n})`) : c === 404 ? s(n) : c === 200 ? F.each(void 0, o("default"), F.sym(n), l).concat(F.each(void 0, o("defaultForNew"), F.sym(n), l)).length ? t(!0, !1, e, i, F.sym(n), l) : s(n) : t(!1, !0, c, `Error status '${c}' searching for default for ${a}`) : t(!1, !0, c, `( No ACL pointer ${n} ${c})${l}`);
			});
		};
		if (!n) return t(!1, !1, r, `Error accessing Access Control information for ${e}) ${a}`);
		if (r === 404) s(e.uri);
		else if (r === 403) return t(!1, !1, r, `(Sharing not available to you)${a}`);
		else if (r !== 200) return t(!1, !1, r, `Error ${r} accessing Access Control information for ${e}: ${a}`);
		else return t(!0, !0, e, i);
	});
}
function $e(e, t) {
	if (!F.fetcher) throw Error("kb has no fetcher");
	F.fetcher.nowOrWhenFetched(e, void 0, function(n, r) {
		if (!n) return t(n, `Can't get headers to find ACL for ${e}: ${r}`);
		let i = F.any(e, _);
		if (!i) t(!1, 900, `No Link rel=ACL header for ${e}`);
		else {
			if (!F.fetcher) throw Error("kb has no fetcher");
			if (F.fetcher.nonexistent[i.value]) return t(!0, 404, i, `ACL file ${i} does not exist.`);
			F.fetcher.nowOrWhenFetched(i, void 0, function(e, n, r) {
				e ? t(!0, 200, i) : t(!0, r.status, i, `Can't read Access Control File ${i}: ${n}`);
			});
		}
	});
}
async function et(e) {
	return new Promise((t, n) => Qe(d(e), (r, i, a, o, s) => r ? t(i ? a : s) : n(/* @__PURE__ */ Error(`Error loading ${e}`))));
}
// src/signup/config-default.js
var tt = {
	authEndpoint: "",
	fallbackAuthEndpoint: "https://databox.me/",
	signupEndpoint: "https://solidproject.org/get_a_pod",
	signupWindowHeight: 600,
	signupWindowWidth: 1024,
	key: "",
	cert: ""
};
// src/signup/signup.js
function nt(e) {
	this.config = e || tt;
}
nt.prototype.listen = function() {
	return new Promise(function(e, t) {
		let n = window.addEventListener ? "addEventListener" : "attachEvent";
		(0, window[n])(n === "attachEvent" ? "onmessage" : "message", function(n) {
			let r = n.data;
			if (r.slice(0, 5) === "User:") {
				let n = r.slice(5, r.length);
				return n && n.length > 0 && n.slice(0, 4) === "http" ? e(n) : t(n);
			}
		}, !0);
	});
}, nt.prototype.signup = function(e) {
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
// src/login/login.ts
var rt = /* @__PURE__ */ p({
	ensureLoadedPreferences: () => pt,
	ensureLoadedProfile: () => mt,
	ensureLoggedIn: () => ft,
	filterAvailablePanes: () => Et,
	findAppInstances: () => ht,
	getUserRoles: () => Tt,
	loginStatusBox: () => St,
	newAppInstance: () => wt,
	registrationControl: () => _t,
	registrationList: () => yt,
	renderScopeHeadingRow: () => vt,
	renderSignInPopup: () => xt,
	scopeLabel: () => gt,
	selectWorkspace: () => Ct
}), it = T.store, { loadPreferences: at, loadProfile: ot } = T.profile, { getScopedAppInstances: st, getRegistrations: ct, loadAllTypeIndexes: lt, getScopedAppsFromIndex: ut, deleteTypeIndexRegistration: dt } = T.typeIndex;
function ft(e) {
	let t = O.currentUser();
	return t ? (O.saveUser(t, e), Promise.resolve(e)) : new Promise((t) => {
		O.checkUser().then((n) => {
			if (n) return N(`logIn: Already logged in as ${n}`), t(e);
			if (!e.div || !e.dom) return t(e);
			let r = St(e.dom, (n) => {
				O.saveUser(n, e), t(e);
			});
			e.div.appendChild(r);
		}).catch((n) => {
			if (N(`logIn: session check failed, showing login (${n})`), !e.div || !e.dom) return t(e);
			let r = St(e.dom, (n) => {
				O.saveUser(n, e), t(e);
			});
			e.div.appendChild(r);
		});
	});
}
async function pt(e) {
	if (e.preferencesFile) return Promise.resolve(e);
	try {
		e = await mt(e);
		let t = await at(e.me);
		e.preferencesFile = t;
	} catch (t) {
		let n;
		if (t instanceof g) n = "Oops — you are not authenticated (properly logged in), so SolidOS cannot read your preferences file. Try logging out and then logging back in.", ae(n);
		else if (t instanceof v) return n = `Unauthorized: Assuming preference file blocked for origin ${window.location.origin}`, e.preferencesFileError = n, e;
		else if (t instanceof S) return n = "You are not authorized to read your preference file. This may be because you are using an untrusted web app.", pe(n), e;
		else if (t instanceof C) return n = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", pe(n), e;
		else if (t instanceof m) n = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", pe(n);
		else if (t instanceof w) n = `Strange: Error ${t.status} trying to read your preference file.${t.message}`, ae(n);
		else throw Error(`(via loadPrefs) ${t}`);
		e.preferencesFileError = n;
	}
	return e;
}
async function mt(e) {
	if (e.publicProfile) return e;
	try {
		let t = await ft(e);
		if (!t.me) throw Error("Could not log in");
		e.publicProfile = await ot(t.me);
	} catch (t) {
		throw e.div && e.dom && e.div.appendChild(Pe(e.dom, t.message)), Error(`Can't log in: ${t}`);
	}
	return e;
}
async function ht(e, t, n) {
	let r = e.me ? await st(t, e.me) : [];
	return n === !0 ? r = r.filter((e) => e.scope.label === "public") : n === !1 && (r = r.filter((e) => e.scope.label === "private")), e.instances = r.map((e) => e.instance), e;
}
function gt(e, t) {
	return `${e.me && e.me.sameTerm(t.agent) ? "" : M(t.agent) + " "}${t.label}`;
}
async function _t(e, t, n) {
	function a(e) {
		let i = ct(t, n), a = i.length ? i[0] : Se(e);
		return [r(a, E.solid("instance"), t, e), r(a, E.solid("forClass"), n, e)];
	}
	function o(t) {
		let n = a(t.index), r = `${gt(e, t)} link to this ${e.noun}`;
		return Oe(e.dom, T.store, r, null, n, f, t.index);
	}
	let s = e.dom;
	if (!s || !e.div) throw Error("registrationControl: need dom and div");
	let c = s.createElement("div");
	e.div.appendChild(c), e.me = O.currentUser();
	let l = e.me;
	if (!l) return c.innerHTML = "<p style=\"margin:2em;\">(Log in to save a link to this)</p>", e;
	let u;
	try {
		u = await lt(l);
	} catch (t) {
		let n;
		return e.div && e.preferencesFileError ? (n = "(Lists of stuff not available)", e.div.appendChild(s.createElement("p")).textContent = n) : e.div && (n = `registrationControl: Type indexes not available: ${t}`, e.div.appendChild(Pe(e.dom, t))), N(n), e;
	}
	c.innerHTML = "<table><tbody></tbody></table>", c.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;");
	let d = c.children[0].children[0], f = new i();
	for (let e of u) d.appendChild(s.createElement("tr")).appendChild(o(e));
	return e;
}
function vt(e, t, n) {
	let r = {
		private: "#fee",
		public: "#efe"
	}, { dom: i } = e, a = gt(e, n), o = i.createElement("tr"), s = o.appendChild(i.createElement("td"));
	s.setAttribute("colspan", "3"), s.style.backgoundColor = r[n.label] || "white";
	let c = s.appendChild(i.createElement("h3"));
	return c.textContent = a + " links", c.style.textAlign = "left", o;
}
async function yt(e, t) {
	let n = e.dom, r = e.div, i = n.createElement("div");
	if (r.appendChild(i), e.me = O.currentUser(), !e.me) return i.innerHTML = "<p style=\"margin:2em;\">(Log in list your stuff)</p>", e;
	let a = await lt(e.me);
	i.innerHTML = "<table><tbody></tbody></table>", i.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid #eee 0.5em;");
	let o = i.firstChild.firstChild;
	for (let r of a) {
		let i = vt(e, it, r);
		o.appendChild(i);
		let a = await ut(r, t.type || null);
		a.length === 0 && (i.style.display = "none");
		for (let e of a) {
			let t = be(n, E.solid("instance"), e.instance, { deleteFunction: async () => {
				await dt(e), o.removeChild(t);
			} });
			t.children[0].style.paddingLeft = "3em", o.appendChild(t);
		}
	}
	return e;
}
function bt(e, t, n = {}) {
	n ||= {};
	let r = n.buttonStyle || j.signInAndUpButtonStyle, i = e.createElement("div"), a = "SolidSignInOrSignUpBox";
	N("widgets.signInOrSignUpBox"), i.setUserCallback = t, i.setAttribute("class", a), i.setAttribute("style", "display:flex;");
	let o = e.createElement("input");
	i.appendChild(o), o.setAttribute("type", "button"), o.setAttribute("value", "Log in"), o.setAttribute("style", `${r}${j.headerBannerLoginInput}` + j.signUpBackground), k.events.on("login", () => {
		let t = O.currentUser();
		if (t) {
			let n = t.uri, r = e.getElementsByClassName(a);
			N(`Logged in, ${r.length} panels to be serviced`);
			for (let t = 0; t < r.length; t++) {
				let i = r[t];
				if (i.setUserCallback) try {
					i.setUserCallback(n);
					let e = i.parentNode;
					e && e.removeChild(i);
				} catch (t) {
					N(`## Error satisfying login box: ${t}`), i.appendChild(Pe(e, t));
				}
			}
		}
	}), o.addEventListener("click", () => {
		let n = ee();
		if (n) return t(n.uri);
		xt(e);
	}, !1);
	let s = e.createElement("input");
	return i.appendChild(s), s.setAttribute("type", "button"), s.setAttribute("value", "Sign Up for Solid"), s.setAttribute("style", `${r}${j.headerBannerLoginInput}` + j.signInBackground), s.addEventListener("click", function(e) {
		new nt().signup().then(function(e) {
			N("signInOrSignUpBox signed up " + e), t(e);
		});
	}, !1), i;
}
function xt(e) {
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
			T.store.updater.flagAuthorizationMetadata();
			let t = new URL(window.location.href).hash;
			t && window.localStorage.setItem("preLoginRedirectHash", t), window.localStorage.setItem("loginIssuer", e);
			let n = new URL(window.location.href);
			n.hash = "", await k.login(e, n.href);
		} catch (e) {
			ae(e.message);
		}
	}, s = e.createElement("div");
	s.setAttribute("style", "\n      border-bottom: 1px solid #DDD;\n      display: flex;\n      flex-direction: column;\n      padding-top: 10px;\n    ");
	let c = e.createElement("div");
	c.setAttribute("style", "\n      display: flex;\n      flex-direction: row;\n    ");
	let l = e.createElement("label");
	l.innerText = "Enter the URL of your identity provider:", l.setAttribute("style", "color: #888");
	let u = e.createElement("input");
	u.setAttribute("type", "text"), u.setAttribute("style", "margin-left: 0 !important; flex: 1; margin-right: 5px !important"), u.setAttribute("placeholder", "https://example.com"), u.value = typeof localStorage < "u" && localStorage.getItem("loginIssuer") || re()[0]?.uri || "";
	let d = e.createElement("button");
	d.innerText = "Go", d.setAttribute("style", "margin-top: 12px; margin-bottom: 12px;"), d.addEventListener("click", () => {
		o(u.value);
	}), s.appendChild(l), c.appendChild(u), c.appendChild(d), s.appendChild(c), n.appendChild(s);
	let f = e.createElement("div");
	f.setAttribute("style", "\n      display: flex;\n      flex-direction: column;\n      padding-top: 10px;\n    ");
	let p = e.createElement("label");
	p.innerText = "Or pick an identity provider from the list below:", p.setAttribute("style", "color: #888"), f.appendChild(p), re().forEach((t) => {
		let n = e.createElement("button");
		n.innerText = t.name, n.setAttribute("style", "height: 38px; margin-top: 10px"), n.addEventListener("click", () => {
			o(t.uri);
		}), f.appendChild(n);
	}), n.appendChild(f);
}
function St(e, t = null, n = {}) {
	let r = ee(), i = e.createElement("div");
	function a(e) {
		e && (r = O.saveUser(e), i.refresh(), t && t(r.uri));
	}
	function o(e) {
		let n = r;
		k.logout().then(function() {
			let e = `Your WebID was ${n}. It has been forgotten.`;
			r = null;
			try {
				ae(e);
			} catch {
				window.alert(e);
			}
			i.refresh(), t && t(null);
		}, (e) => {
			ae("Fail to log out:" + e);
		});
	}
	function s(t, n) {
		let r = n.buttonStyle || j.signInAndUpButtonStyle, i = "WebID logout";
		if (t) {
			let e = T.store.any(t, E.foaf("nick")) || T.store.any(t, E.foaf("name"));
			e && (i = "Logout " + e.value);
		}
		let a = e.createElement("input");
		return a.setAttribute("type", "button"), a.setAttribute("value", i), a.setAttribute("style", `${r}`), a.addEventListener("click", o, !1), a;
	}
	i.refresh = function() {
		let t = k.webId;
		r = t ? T.store.sym(t) : null, (r && i.me !== r.uri || !r && i.me) && (Ce(i), r ? i.appendChild(s(r, n)) : i.appendChild(bt(e, a, n))), i.me = r ? r.uri : null;
	}, i.refresh();
	function c() {
		r = O.currentUser(), i.refresh();
	}
	return c(), k.events.on("login", c), k.events.on("logout", c), i.me = "99999", i.refresh(), i;
}
k.events.on("logout", async () => {
	let e = window.localStorage.getItem("loginIssuer");
	if (e) try {
		T.store.updater.flagAuthorizationMetadata();
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
function Ct(e, t, n) {
	let i = t.noun, a = t.appPathSegment, o = ee(), s = e.createElement("div"), c = {
		me: o,
		dom: e,
		div: s
	};
	function l(t, n) {
		s.appendChild(Pe(e, t, n));
	}
	function u(e) {
		let t = T.store.any(e, E.space("uriPrefix")), n;
		return n = t ? t.value : e.uri.split("#")[0], n.slice(-1) !== "/" && (N(`${a}: No / at end of uriPrefix ${n}`), n = `${n}/`), n += `${a}/id${(/* @__PURE__ */ new Date()).getTime()}/`, n;
	}
	function d(t) {
		async function a(n) {
			let i = m.appendChild(e.createElement("tr")).appendChild(e.createElement("td"));
			i.setAttribute("colspan", "3"), i.style.padding = "0.5em";
			let a = encodeURI(await Ee(e, T.store, i, E.solid("URL"), E.space("Workspace"), "Workspace")), o = Se(t.preferencesFile), s = [r(t.me, E.space("workspace"), o, t.preferencesFile), r(o, E.space("uriPrefix"), a, t.preferencesFile)];
			if (!T.store.updater) throw Error("store has no updater");
			await T.store.updater.update([], s);
		}
		let o = t.me, c = t.preferencesFile, d = null, f = T.store.each(o, E.space("workspace"), void 0, c), p = T.store.each(o, E.space("storage"));
		f.length === 0 && p && (l(`You don't seem to have any workspaces. You have ${p.length} storage spaces.`, "white"), p.map(function(e) {
			return f = f.concat(T.store.each(e, E.ldp("contains"))), f;
		}).filter((e) => e.id ? ["public", "private"].includes(e.id().toLowerCase()) : "")), f.length === 1 && (l(`Workspace used: ${f[0].uri}`, "white"), d = u(f[0]));
		let m = e.createElement("table");
		m.setAttribute("style", "border-collapse:separate; border-spacing: 0.5em;"), s.appendChild(m), s.appendChild(e.createElement("hr"));
		let h = s.appendChild(e.createElement("p"));
		h.setAttribute("style", j.commentStyle), h.textContent = `Where would you like to store the data for the ${i}?
    Give the URL of the folder where you would like the data stored.
    It can be anywhere in solid world - this URI is just an idea.`;
		let g = s.appendChild(e.createElement("input"));
		g.setAttribute("type", "text"), g.setAttribute("style", j.textInputStyle), g.size = 80, g.label = "base URL", g.autocomplete = "on", d && (g.value = d), t.baseField = g, s.appendChild(e.createElement("br"));
		let _ = s.appendChild(e.createElement("button"));
		_.setAttribute("style", j.buttonStyle), _.textContent = `Start new ${i} at this URI`, _.addEventListener("click", function(e) {
			let t = g.value.replace(" ", "%20");
			t.slice(-1) !== "/" && (t += "/"), n(null, t);
		}), f = f.filter(function(e) {
			return !T.store.holds(e, E.rdf("type"), E.space("MasterWorkspace"));
		});
		let v, y, b, x, S, C, w, ee = "height: 3em; margin: 1em; padding: 1em white; border-radius: 0.3em;", te = `${ee}border: 0px;`;
		for (let t = 0; t < f.length; t++) {
			S = f[t], x = e.createElement("tr"), t === 0 && (v = e.createElement("td"), v.setAttribute("rowspan", `${f.length}`), v.textContent = "Choose a workspace for this:", v.setAttribute("style", "vertical-align:middle;"), x.appendChild(v)), y = e.createElement("td"), C = T.store.anyValue(S, E.ui("style")), C ||= `color: black ; background-color: #${(function(e) {
				return e.split("").reduce(function(e, t) {
					return e = (e << 5) - e + t.charCodeAt(0), e & e;
				}, 0);
			}(S.uri) & 0xffffff | 0xc0c0c0).toString(16)};`, y.setAttribute("style", te + C), x.target = S.uri;
			let r = T.store.any(S, E.rdfs("label"));
			r ||= S.uri.split("/").slice(-1)[0] || S.uri.split("/").slice(-2)[0], y.textContent = r || "???", x.appendChild(y), t === 0 && (b = e.createElement("td"), b.setAttribute("rowspan", `${f.length}1`), b.setAttribute("style", "width:50%;"), x.appendChild(b)), m.appendChild(x), w = T.store.any(S, E.rdfs("comment")), w = w ? w.value : "Use this workspace", y.addEventListener("click", function(t) {
				b.textContent = w ? w.value : "", b.setAttribute("style", te + C);
				let r = e.createElement("button");
				r.textContent = "Continue";
				let i = u(S);
				g.value = i, r.addEventListener("click", function(e) {
					r.disabled = !0, n(S, i), r.textContent = "---->";
				}, !0), b.appendChild(r);
			}, !0);
		}
		let D = e.createElement("tr");
		y = e.createElement("td"), y.setAttribute("style", ee), y.textContent = "+ Make a new workspace", y.addEventListener("click", a), D.appendChild(y), m.appendChild(D);
	}
	return pt(c).then(d).catch((e) => {
		s.appendChild(Pe(c.dom, e));
	}), s;
}
function wt(e, t, n) {
	let r = function(e, t) {
		n(e, t);
	}, i = e.createElement("div"), a = e.createElement("button");
	return a.setAttribute("type", "button"), i.appendChild(a), a.innerHTML = `Make new ${t.noun}`, a.addEventListener("click", (n) => {
		i.appendChild(Ct(e, t, r));
	}, !1), i.appendChild(a), i;
}
async function Tt() {
	try {
		let { me: e, preferencesFile: t, preferencesFileError: n } = await pt({});
		if (!t || n) throw Error(n);
		return T.store.each(e, E.rdf("type"), null, t.doc());
	} catch (e) {
		pe("Unable to fetch your preferences - this was the error: ", e);
	}
	return [];
}
async function Et(e) {
	let t = await Tt();
	return e.filter((e) => Dt(e, t));
}
function Dt(e, t) {
	return (e.audience || []).reduce((e, n) => e && !!t.find((e) => e.equals(n)), !0);
}
// src/acl/add-agent-buttons.ts
var Ot = class {
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
		return ke(this.groupList.controller.dom, `${P.iconBase}noun_34653_green.svg`, "Add ...", () => {
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
		return ke(this.groupList.controller.dom, P.iconBase + we["vcard:Individual"], "Add Person", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(E.vcard("Individual"), "person").then((e) => this.addPerson(e)).then(() => this.renderCleanup()).catch((e) => this.groupList.controller.renderStatus(e));
		});
	}
	renderGroupButton() {
		return ke(this.groupList.controller.dom, P.iconBase + we["vcard:Group"], "Add Group", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(E.vcard("Group"), "group").then((e) => this.addGroup(e)).then(() => this.renderCleanup()).catch((e) => this.groupList.controller.renderStatus(e));
		});
	}
	renderNameForm(e, t) {
		return Ee(this.groupList.controller.dom, this.groupList.store, this.barElement, E.vcard("URI"), e, t);
	}
	renderPublicButton() {
		let e = ke(this.groupList.controller.dom, P.iconBase + we["foaf:Agent"], "Add Everyone: anyone on the web, including people who are not logged in", () => this.addAgent(E.foaf("Agent").uri).then(() => this.groupList.controller.renderTemporaryStatus("Adding the general public to those who can read. Drag the globe to a different level to give them more access.")).then(() => this.renderCleanup()));
		return e.querySelector("img")?.setAttribute("draggable", "false"), me(e, E.foaf("Agent")), e;
	}
	renderAuthenticatedAgentButton() {
		return ke(this.groupList.controller.dom, `${P.iconBase}noun_99101.svg`, "Anyone logged In", () => this.addAgent(E.acl("AuthenticatedAgent").uri).then(() => this.groupList.controller.renderTemporaryStatus("Adding anyone logged in to those who can read. Drag the ID icon to a different level to give them more access.")).then(() => this.renderCleanup()));
	}
	renderBotButton() {
		return ke(this.groupList.controller.dom, P.iconBase + "noun_Robot_849764.svg", "A Software Agent (bot)", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(E.schema("Application"), "bot").then((e) => this.addBot(e)).then(() => this.renderCleanup());
		});
	}
	renderAppsButton() {
		return ke(this.groupList.controller.dom, `${P.iconBase}noun_15177.svg`, "A Web App (origin)", (e) => {
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
			t.setAttribute("style", j.trustedAppController);
			let n = _e(this.groupList.controller.dom, () => this.renderCleanup());
			n.setAttribute("style", j.trustedAppCancelButton), t.insertBefore(n, t.firstChild), this.barElement.appendChild(t);
		}
	}
	async renderAppsTable(e) {
		await mt(e);
		let t = this.groupList.store.each(e.me, E.acl("trustedApp")), n = t.flatMap((e) => this.groupList.store.each(e, E.acl("origin")));
		return this.barElement.appendChild(this.groupList.controller.dom.createElement("p")).textContent = `You have ${n.length} selected web apps.`, new Promise((e, n) => {
			let r = this.barElement.appendChild(this.groupList.controller.dom.createElement("table"));
			r.setAttribute("style", j.trustedAppAddApplicationsTable), t.forEach((t) => {
				let i = this.groupList.store.any(t, E.acl("origin"));
				i || n(/* @__PURE__ */ Error(`Unable to pick app: ${t.value}`));
				let a = be(this.groupList.controller.dom, E.acl("origin"), i, {}), o = this.groupList.controller.dom.createElement("table"), s = o.appendChild(this.groupList.controller.dom.createElement("tr"));
				s.appendChild(this.groupList.controller.dom.createElement("td")).appendChild(a);
				let c = s.appendChild(this.groupList.controller.dom.createElement("td"));
				c.textContent = `Give access to ${this.groupList.controller.noun} ${M(this.groupList.controller.subject)}?`, s.appendChild(this.groupList.controller.dom.createElement("td")).appendChild(ve(this.groupList.controller.dom, () => e(i.value))), r.appendChild(o);
			});
		});
	}
	renderCleanup() {
		this.renderBar(), this.groupList.render();
	}
	async addPerson(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		N(`Adding to ACL person: ${e}`), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addGroup(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		N("Adding to ACL group: " + e), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addAgent(e) {
		await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addBot(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		N("Adding to ACL bot: " + e), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async getOriginFromName(e) {
		if (!e) return Promise.resolve();
		if (!e.match(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i)) return Promise.reject(/* @__PURE__ */ Error("Not a domain name"));
		let t = "https://" + e;
		return N("Adding to ACL origin: " + t), this.toggleBar(), t;
	}
	toggleBar() {
		this.isExpanded = !this.isExpanded;
	}
}, kt = E.acl, At = {
	13: "Owners",
	9: "Admins",
	5: "Editors",
	3: "Commenters",
	2: "Appenders",
	1: "Viewers"
}, jt = {
	13: !0,
	5: !0,
	3: !0,
	2: !0,
	1: !0
}, Mt = {
	13: "can read, write, and control sharing.",
	9: "can read and control sharing, currently write-locked.",
	5: "can read and change information",
	3: "can add new information, and read but not change existing information",
	2: "can add new information but not read any",
	1: "can read but not change information"
}, Nt = class {
	defaults;
	byCombo;
	aclMap;
	addAgentButton;
	rootElement;
	_store;
	constructor(e, t, n, r, i = {}) {
		this.doc = e, this.aclDoc = t, this.controller = n, this._options = i, this.defaults = this._options.defaults || !1, this._store = r, this.aclMap = Le(e, t, r, this.defaults), this.byCombo = Ve(this.aclMap), this.addAgentButton = new Ot(this), this.rootElement = this.controller.dom.createElement("div"), this.rootElement.setAttribute("style", j.accessGroupList);
	}
	get store() {
		return this._store;
	}
	set store(e) {
		this._store = e, this.aclMap = Le(this.doc, this.aclDoc, e, this.defaults), this.byCombo = Ve(this.aclMap);
	}
	render() {
		return this.rootElement.innerHTML = "", this.renderGroups().forEach((e) => this.rootElement.appendChild(e)), this.controller.isEditable && this.rootElement.appendChild(this.addAgentButton.render()), this.rootElement;
	}
	renderGroups() {
		let e = [];
		for (let t = 15; t > 0; t--) {
			let n = Pt(t);
			(this.controller.isEditable && jt[t] || this.byCombo[n]) && e.push(this.renderGroup(t, n));
		}
		return e;
	}
	renderGroup(e, t) {
		let n = this.controller.dom.createElement("div");
		return n.setAttribute("style", j.accessGroupListItem), de(n, (e) => this.handleDroppedUris(e, t).then(() => this.controller.render()).catch((e) => this.controller.renderStatus(e))), this.renderGroupElements(e, t).forEach((e) => n.appendChild(e)), n;
	}
	renderGroupElements(e, t) {
		let n = this.controller.dom.createElement("div");
		if (n.setAttribute("style", j.group), this.controller.isEditable) switch (e) {
			case 1:
				n.setAttribute("style", j.group1);
				break;
			case 2:
				n.setAttribute("style", j.group2);
				break;
			case 3:
				n.setAttribute("style", j.group3);
				break;
			case 5:
				n.setAttribute("style", j.group5);
				break;
			case 9:
				n.setAttribute("style", j.group9);
				break;
			case 13:
				n.setAttribute("style", j.group13);
				break;
			default: n.setAttribute("style", j.group);
		}
		n.innerText = At[e] || Ft(e);
		let r = this.controller.dom.createElement("div");
		if (r.setAttribute("style", j.group), this.controller.isEditable) switch (e) {
			case 1:
				r.setAttribute("style", j.group1);
				break;
			case 2:
				r.setAttribute("style", j.group2);
				break;
			case 3:
				r.setAttribute("style", j.group3);
				break;
			case 5:
				r.setAttribute("style", j.group5);
				break;
			case 9:
				r.setAttribute("style", j.group9);
				break;
			case 13:
				r.setAttribute("style", j.group13);
				break;
			default: r.setAttribute("style", j.group);
		}
		let i = r.appendChild(this.controller.dom.createElement("table"));
		(this.byCombo[t] || []).map(([e, n]) => this.renderAgent(i, t, e, n)).forEach((e) => i.appendChild(e));
		let a = this.controller.dom.createElement("div");
		if (a.setAttribute("style", j.group), this.controller.isEditable) switch (e) {
			case 1:
				a.setAttribute("style", j.group1);
				break;
			case 2:
				a.setAttribute("style", j.group2);
				break;
			case 3:
				a.setAttribute("style", j.group3);
				break;
			case 5:
				a.setAttribute("style", j.group5);
				break;
			case 9:
				a.setAttribute("style", j.group9);
				break;
			case 13:
				a.setAttribute("style", j.group13);
				break;
			default: a.setAttribute("style", j.group);
		}
		return a.innerText = Mt[e] || "Unusual combination", [
			n,
			r,
			a
		];
	}
	renderAgent(e, t, n, r) {
		let i = be(this.controller.dom, kt(n), d(r), this.controller.isEditable ? { deleteFunction: () => this.deleteAgent(t, n, r).then(() => e.removeChild(i)).catch((e) => this.controller.renderStatus(e)) } : {});
		return i;
	}
	async deleteAgent(e, t, n) {
		let r = this.byCombo[e] || [], i = r.find(([e, r]) => e === t && r === n);
		i && r.splice(r.indexOf(i), 1), await this.controller.save();
	}
	async addNewURI(e) {
		await this.handleDroppedUri(e, Pt(1)), await this.controller.save();
	}
	async handleDroppedUris(e, t) {
		try {
			await Promise.all(e.map((e) => this.handleDroppedUri(e, t))), await this.controller.save();
		} catch (e) {
			return Promise.reject(e);
		}
	}
	async handleDroppedUri(e, t, n = !1) {
		let r = It(e, this.store), i = d(e);
		if (!r && !n) {
			N(`   Not obvious: looking up dropped thing ${i}`);
			try {
				await this._store?.fetcher?.load(i.doc());
			} catch (e) {
				let t = `Ignore error looking up dropped thing: ${e}`;
				return he(t), Promise.reject(Error(t));
			}
			return this.handleDroppedUri(e, t, !0);
		}
		if (!r) {
			let t = Object.keys(this.store.findTypeURIs(i)), n = t.length > 0 ? `Detected RDF types: ${t.join(", ")}` : "No RDF type was detected for this URI.", r = `Error: Failed to add access target: ${e} is not a recognized ACL target type. Expected one of: vcard:WebID, vcard:Group, foaf:Person, foaf:Agent, solid:AppProvider, solid:AppProviderClass, or recognized ACL classes. Hint: try dropping a WebID profile URI, a vcard:Group URI, or a web app origin.` + n;
			return he(r), Promise.reject(Error(r));
		}
		this.setACLCombo(t, e, r, this.controller.subject);
	}
	setACLCombo(e, t, n, r) {
		e in this.byCombo || (this.byCombo[e] = []), this.removeAgentFromCombos(t), this.byCombo[e].push([n.pred, n.obj.uri]), N(`ACL: setting access to ${r} by ${n.pred}: ${n.obj}`);
	}
	removeAgentFromCombos(e) {
		for (let t = 0; t < 16; t++) {
			let n = this.byCombo[Pt(t)];
			if (n) for (let t = 0; t < n.length; t++) for (; t < n.length && n[t][1] === e;) n.splice(t, 1);
		}
	}
};
function Pt(e) {
	let t = [
		"Read",
		"Append",
		"Write",
		"Control"
	], n = [];
	for (let r = 0; r < 4; r++) e & 1 << r && n.push("http://www.w3.org/ns/auth/acl#" + t[r]);
	return n.sort(), n.join("\n");
}
function Ft(e) {
	let t = "", n = [
		"Read",
		"Append",
		"Write",
		"Control"
	];
	for (let r = 0; r < 4; r++) e & 1 << r && (t += n[r]);
	return t;
}
function It(e, t) {
	let n = d(e), r = t.findTypeURIs(n);
	for (let e in r) N("    drop object type includes: " + e);
	if (e.startsWith("http") && e.split("/").length === 3) return {
		pred: "origin",
		obj: n
	};
	if (e.startsWith("http") && e.split("/").length === 4 && e.endsWith("/")) return N("Assuming final slash on dragged origin URI was unintended!"), {
		pred: "origin",
		obj: d(e.slice(0, -1))
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
			obj: d(e)
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
	} : (N("    Triage fails for " + e), null);
}
// src/acl/access-controller.ts
var Lt = class {
	mainCombo;
	defaultsCombo;
	isContainer;
	defaultsDiffer;
	rootElement;
	isUsingDefaults;
	constructor(e, t, n, r, i, a, o, s, c, l, u, d) {
		if (this.subject = e, this.noun = t, this.context = n, this.statusElement = r, this.targetIsProtected = i, this.targetDoc = a, this.targetACLDoc = o, this.defaultHolder = s, this.defaultACLDoc = c, this.prospectiveDefaultHolder = l, this.store = u, this.dom = d, this.rootElement = d.createElement("div"), this.rootElement.setAttribute("style", j.aclGroupContent), this.isContainer = a.uri.slice(-1) === "/", s && c) {
			this.isUsingDefaults = !0;
			let e = Ie(this.targetDoc, o, s, c);
			this.mainCombo = new Nt(a, o, this, e, { defaults: this.isContainer }), this.defaultsCombo = null, this.defaultsDiffer = !1;
		} else this.isUsingDefaults = !1, this.mainCombo = new Nt(a, o, this, u), this.defaultsCombo = new Nt(a, o, this, u, { defaults: this.isContainer }), this.defaultsDiffer = !Re(this.mainCombo.aclMap, this.defaultsCombo.aclMap);
	}
	get isEditable() {
		return !this.isUsingDefaults;
	}
	render() {
		if (this.rootElement.innerHTML = "", this.isUsingDefaults) {
			if (this.renderStatus(`The sharing for this ${this.noun} is the default for folder `), this.defaultHolder) {
				let e = this.statusElement.appendChild(this.dom.createElement("a"));
				e.href = this.defaultHolder.uri, e.innerText = Ut(this.defaultHolder);
			}
		} else !this.defaultsDiffer && this.isContainer ? this.renderStatus("This is also the default for things in this folder.") : this.renderStatus("");
		return this.rootElement.appendChild(this.mainCombo.render()), this.defaultsCombo && this.defaultsDiffer ? (this.rootElement.appendChild(this.renderRemoveDefaultsController()), this.rootElement.appendChild(this.defaultsCombo.render())) : this.isEditable && this.isContainer && this.rootElement.appendChild(this.renderAddDefaultsController()), !this.targetIsProtected && this.isUsingDefaults ? this.rootElement.appendChild(this.renderAddAclsController()) : this.targetIsProtected || this.rootElement.appendChild(this.renderRemoveAclsController()), this.rootElement;
	}
	renderRemoveAclsController() {
		let e = this.dom.createElement("button");
		return e.innerText = `Remove custom sharing settings for this ${this.noun} -- just use default${this.prospectiveDefaultHolder ? ` for ${M(this.prospectiveDefaultHolder)}` : ""}`, e.setAttribute("style", j.bigButton), e.addEventListener("click", () => this.removeAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderAddAclsController() {
		let e = this.dom.createElement("button");
		return e.innerText = `Set specific sharing for this ${this.noun}`, e.setAttribute("style", j.bigButton), e.addEventListener("click", () => this.addAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderAddDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", j.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Sharing for things within the folder currently tracks sharing for the folder.", t.setAttribute("style", j.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set the sharing of folder contents separately from the sharing for the folder", n.setAttribute("style", j.bigButton), n.addEventListener("click", () => this.addDefaults().then(() => this.render())), e;
	}
	renderRemoveDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", j.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Access to things within this folder:", t.setAttribute("style", j.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set default for folder contents to just track the sharing for the folder", n.setAttribute("style", j.bigButton), n.addEventListener("click", () => this.removeDefaults().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderTemporaryStatus(e) {
		this.statusElement.setAttribute("style", j.aclControlBoxStatusRevealed), this.statusElement.innerText = e, this.statusElement.setAttribute("style", j.temporaryStatusInit), setTimeout(() => {
			this.statusElement.setAttribute("style", j.temporaryStatusEnd);
		}), setTimeout(() => {
			this.statusElement.innerText = "";
		}, 5e3);
	}
	renderStatus(e) {
		e || this.statusElement.setAttribute("style", j.aclControlBoxStatusRevealed), this.statusElement.innerText = e;
	}
	async addAcls() {
		if (!this.defaultHolder || !this.defaultACLDoc) {
			let e = "Unable to find defaults to copy";
			return he(e), Promise.reject(e);
		}
		Ie(this.targetDoc, this.targetACLDoc, this.defaultHolder, this.defaultACLDoc).statements.forEach((e) => this.store.add(e.subject, e.predicate, e.object, this.targetACLDoc));
		try {
			return await this.store.fetcher.putBack(this.targetACLDoc), this.isUsingDefaults = !1, Promise.resolve();
		} catch (e) {
			let t = ` Error writing back access control file! ${e}`;
			return he(t), Promise.reject(t);
		}
	}
	async addDefaults() {
		this.defaultsCombo = new Nt(this.targetDoc, this.targetACLDoc, this, this.store, { defaults: !0 }), this.defaultsDiffer = !0;
	}
	async removeAcls() {
		try {
			await this.store.fetcher.delete(this.targetACLDoc.uri, {}), this.isUsingDefaults = !0;
			try {
				this.prospectiveDefaultHolder = await et(this.targetDoc.uri);
			} catch (e) {
				pe(e);
			}
		} catch (e) {
			let t = `Error deleting access control file: ${this.targetACLDoc}: ${e}`;
			return he(t), Promise.reject(t);
		}
	}
	async removeDefaults() {
		let e = this.defaultsCombo;
		try {
			this.defaultsCombo = null, this.defaultsDiffer = !1, await this.save();
		} catch (t) {
			return this.defaultsCombo = e, this.defaultsDiffer = !0, he(t), Promise.reject(t);
		}
	}
	save() {
		let e = u();
		this.isContainer ? this.defaultsCombo && this.defaultsDiffer ? (Ue(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), Ue(e, this.targetDoc, this.defaultsCombo.byCombo, this.targetACLDoc, !1, !0)) : Ue(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0, !0) : Ue(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), e.fetcher = h(e, { fetch: this.store.fetcher._fetch });
		let t = e.updater || new b(e);
		return new Promise((n, r) => {
			t.put(this.targetACLDoc, e.statementsMatching(void 0, void 0, void 0, this.targetACLDoc), "text/turtle", (t, i, a) => {
				if (!i) return r(/* @__PURE__ */ Error(`ACL file save failed: ${a}`));
				this.store.fetcher.unload(this.targetACLDoc), this.store.add(e.statements), this.store.fetcher.requested[this.targetACLDoc.uri] = "done", this.mainCombo.store = this.store, this.defaultsCombo && (this.defaultsCombo.store = this.store), this.defaultsDiffer = !!this.defaultsCombo && !Re(this.mainCombo.aclMap, this.defaultsCombo.aclMap), N("ACL modification: success!"), n();
			});
		});
	}
}, Rt = window, zt = Symbol("prevent double triggering of drop event");
function Bt(e) {
	if (N("preventBrowserDropEvents called."), Rt !== void 0) {
		if (Rt[zt]) return;
		Rt[zt] = !0;
	}
	e.addEventListener("drop", Ht, !1), e.addEventListener("dragenter", Vt, !1), e.addEventListener("dragover", Vt, !1);
}
function Vt(e) {
	e.stopPropagation(), e.preventDefault();
}
function Ht(e) {
	e.dataTransfer.files.length > 0 && (Rt.confirm("Are you sure you want to drop this file here? (Cancel opens it in a new tab)") || (e.stopPropagation(), e.preventDefault(), N("@@@@ document-level DROP suppressed: " + e.dataTransfer.dropEffect)));
}
function Ut(e) {
	let t = e.uri;
	t.slice(-1) === "/" && (t = t.slice(0, -1));
	let n = t.lastIndexOf("/");
	return n >= 0 && (t = t.slice(n + 1)), t || "/";
}
function Wt(e, t, n, r) {
	let i = t.dom, a = e.doc(), o = i.createElement("div");
	o.setAttribute("style", j.aclControlBoxContainer);
	let s = o.appendChild(i.createElement("h1"));
	s.textContent = `Sharing for ${n} ${M(e)}`, s.setAttribute("style", j.aclControlBoxHeader);
	let c = o.appendChild(i.createElement("div"));
	c.setAttribute("style", j.aclControlBoxStatus);
	try {
		Gt(a, r, e, n, t, i, c).then((e) => o.appendChild(e.render()));
	} catch (e) {
		c.innerText = e;
	}
	return o;
}
async function Gt(e, t, n, r, i, a, o) {
	return new Promise((s, c) => Qe(e, async (e, l, u, d, f, p) => {
		if (!e) return c(/* @__PURE__ */ Error(`Error reading ${l ? "" : " default "}ACL. status ${u}: ${d}`));
		let m = Kt(u), h = qt(u, d, t) || Jt(u);
		if (!h && m) try {
			return s(g(await et(m)));
		} catch (e) {
			pe(e);
		}
		return s(g());
		function g(e) {
			return new Lt(n, r, i, o, h, u, d, f, p, e, t, a);
		}
	}));
}
function Kt(e) {
	let t = e.uri.split("#")[0], n = t.slice(0, -1).lastIndexOf("/"), r = t.indexOf("//");
	return r >= 0 && n < r + 2 || n < 0 ? null : t.slice(0, n + 1);
}
function qt(e, t, n) {
	return n.holds(e, E.rdf("type"), E.space("Storage"), t);
}
function Jt(e) {
	return e.uri === e.site().uri;
}
// src/acl/index.ts
var Yt = {
	adoptACLDefault: Ie,
	readACL: Le,
	sameACL: Re,
	ACLunion: ze,
	loadUnionACL: Be,
	ACLbyCombination: Ve,
	makeACLGraph: He,
	makeACLGraphbyCombo: Ue,
	ACLToString: We,
	comboToString: Ge,
	makeACLString: Ke,
	putACLObject: qe,
	putACLbyCombo: Je,
	fixIndividualCardACL: Ye,
	fixIndividualACL: Xe,
	setACL: Ze,
	getACLorDefault: Qe,
	getACL: $e
}, Xt = {
	preventBrowserDropEvents: Bt,
	shortNameForFolder: Ut,
	ACLControlBox5: Wt
}, Zt = T.store;
function Qt(e, t, n) {
	let r = e.dom, i = e.div;
	if (e.me && !e.me.uri) throw Error("newThingUI:  Invalid userid: " + e.me);
	let a = "padding: 0.7em; width: 2em; height: 2em;", o = i.appendChild(r.createElement("img")), s = !1;
	o.setAttribute("src", P.iconBase + "noun_34653_green.svg"), o.setAttribute("style", a), o.setAttribute("title", "Add another tool");
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
		l("display: none;"), e.setAttribute("style", a + "background-color: yellow;");
	}
	function d(e) {
		s = !s, o.setAttribute("style", a + (s ? "background-color: yellow;" : "")), l(s ? "" : "display: none;");
	}
	o.addEventListener("click", d);
	function f(n) {
		return new Promise(function(i, a) {
			let o;
			function s(i, o) {
				mt(e).then((e) => {
					let s = Object.assign({
						newBase: o,
						folder: n.folder || void 0,
						workspace: i
					}, n);
					for (let e in n) s[e] = n[e];
					N(`newThingUI: Minting new ${s.pane.name} at ${s.newBase}`), n.pane.mintNew(t, s).then(function(e) {
						if (!e || !e.newInstance) throw Error("Cannot mint new - missing newInstance");
						if (e.folder) {
							let t = e.newInstance.uri.slice(e.folder.uri.length).includes("/");
							N("  new thing is packge? " + t), t ? Zt.add(e.folder, E.ldp("contains"), Zt.sym(e.newBase), e.folder.doc()) : Zt.add(e.folder, E.ldp("contains"), e.newInstance, e.folder.doc()), e.refreshTarget && e.refreshTarget.refresh && e.refreshTarget.refresh();
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
			n.noun = l.mintClass ? M(l.mintClass) : l.name, n.appPathSegment = n.noun.slice(0, 1).toUpperCase() + n.noun.slice(1), n.folder ? Ee(r, Zt, n.div, E.foaf("name"), null, n.noun).then(function(e) {
				if (!e) d();
				else {
					let t = n.folder.uri;
					t.endsWith("/") || (t += "/"), t = t + encodeURIComponent(e) + "/", s(null, t);
				}
			}) : (o = Ct(r, {
				noun: n.noun,
				appPathSegment: n.appPathSegment
			}, s), n.div.appendChild(o));
		});
	}
	let p = [], m = Object.values(n).filter((e) => e.mintNew), h = m.reduce((e, t) => (t.mintClass && (e[t.mintClass.uri] = (e[t.mintClass.uri] || 0) + 1), e), {});
	m.forEach((t) => {
		let n = e.div.appendChild(r.createElement("img"));
		n.setAttribute("src", t.icon);
		let i = t.mintClass ? h[t.mintClass.uri] > 1 ? `${M(t.mintClass)} (using ${t.name} pane)` : M(t.mintClass) : t.name + " @@";
		n.setAttribute("title", "Make new " + i), n.setAttribute("style", a + "display: none;"), p.push(n), n.disabled || n.addEventListener("click", function(r) {
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
// src/create/index.ts
var $t = { newThingUI: Qt }, en = T.store;
function tn(e, t, n, r, i, a, o) {
	let s = e.createElement("table"), c = e.createElement("tr");
	c.appendChild(e.createElement("td")).setAttribute("class", "MatrixCorner"), s.appendChild(c), s.lastHeader = c;
	let l = [], u = [], d = function(e, t, n, r) {
		for (; e.firstChild;) e.removeChild(e.firstChild);
		e.setAttribute("style", ""), e.style.textAlign = "center", a.cellFunction ? a.cellFunction(e, t, n, r) : (e.textContent = M(r), e.setAttribute("style", "padding: 0.3em")), delete e.old;
	}, f = function(t) {
		let n = t.toNT();
		if (u[n]) return u[n];
		let r = e.createElement("tr"), i = r.appendChild(e.createElement("td"));
		i.setAttribute("style", "padding: 0.3em;"), i.textContent = M(t), t.termType === "NamedNode" && en.fetcher.nowOrWhenFetched(t.uri.split("#")[0], void 0, function(e, n, r) {
			e && (i.textContent = M(t));
		});
		for (let n = 0; n < l.length; n++) d(r.appendChild(e.createElement("td")), D(l[n]), t, null);
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
			if (a.style.textAlign = "center", n === s.firstChild ? a.textContent = M(t) : d(a, t, D(i), null), r === l.length - 1) n.appendChild(a);
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
				let n = D(e.dataValueNT), r = D(l[i - 1]);
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
		m(), en.query(t, g, void 0, h);
	};
	let g = function(e) {
		let t = e[n.toString()], a = e[r.toString()], o = e[i.toString()], s = f(a), c = p(t), l = s.children[c + 1];
		d(l, t, a, o);
	};
	if (a.set_y) for (let e = 0; e < a.set_y.length; e++) f(a.set_y[e]);
	if (a.set_x) for (let e = 0; e < a.set_x.length; e++) p(a.set_x[e]);
	return en.query(t, g, void 0, o), s;
}
// src/matrix/index.ts
var nn = { matrixForQuery: tn }, rn = P.iconBase + "noun_Camera_1618446_000000.svg", an = P.iconBase + "noun_479395.svg", on = "image/png";
function sn(e, t, n, r) {
	let i = e.createElement("div"), a, o, s, c, l = i.appendChild(e.createElement("table")), u = l.appendChild(e.createElement("tr")).appendChild(e.createElement("td"));
	u.setAttribute("colspan", "4");
	let d = l.appendChild(e.createElement("tr"));
	d.appendChild(e.createElement("td")).appendChild(_e(e)).addEventListener("click", (e) => {
		b(), r(null);
	});
	let f = d.appendChild(e.createElement("td")).appendChild(ke(e, an, "Retake"));
	f.addEventListener("click", (e) => {
		_();
	}), f.style.visibility = "collapse";
	let p = d.appendChild(e.createElement("td")).appendChild(ke(e, P.iconBase + "noun_10636.svg", "Snap"));
	p.addEventListener("click", v), p.style.visibility = "collapse";
	let m = d.appendChild(e.createElement("td")).appendChild(ve(e));
	m.addEventListener("click", (e) => {
		x(o, a);
	}), m.style.visibility = "collapse";
	function h() {
		if (s = u.appendChild(e.createElement("video")), s.setAttribute("controls", "1"), s.setAttribute("autoplay", "1"), s.setAttribute("style", j.controlStyle), !navigator.mediaDevices) throw Error("navigator.mediaDevices not available");
		navigator.mediaDevices.getUserMedia(g).then((e) => {
			s.srcObject = e, p.style.visibility = "visible", m.style.visibility = "collapse", f.style.visibility = "collapse";
		});
	}
	let g = { video: !0 };
	function _() {
		u.removeChild(c), h();
	}
	function v() {
		c = e.createElement("canvas"), c.setAttribute("width", j.canvasWidth), c.setAttribute("height", j.canvasHeight), c.setAttribute("style", j.controlStyle), u.appendChild(c), c.getContext("2d").drawImage(s, 0, 0, c.width, c.height), s.parentNode.removeChild(s), c.toBlob((e) => {
			let t = `got blob type ${e.type} size ${e.size}`;
			N(t), a = n(), o = e, y();
		}, on);
	}
	function y() {
		m.style.visibility = "visible", f.style.visibility = "visible", p.style.visibility = "collapse";
	}
	function b() {
		s && s.srcObject && s.srcObject.getVideoTracks().forEach((e) => e.stop());
	}
	function x(e, n) {
		let i = e.type;
		N("Putting " + e.size + " bytes of " + i + " to " + n), t.fetcher.webOperation("PUT", n.uri, {
			data: e,
			contentType: i
		}).then((e) => {
			N("ok saved " + n), b(), r(n);
		}, (e) => {
			b(), alert(e);
		});
	}
	return h(), i;
}
function cn(e, t, n, r) {
	let i = e.createElement("div"), a = ke(e, rn, "Take picture"), o;
	async function s(e) {
		i.removeChild(o), i.appendChild(a), r(e);
	}
	return i.appendChild(a), a.addEventListener("click", (r) => {
		i.removeChild(a), o = sn(e, t, n, s), i.appendChild(o);
	}), i;
}
// src/media/index.ts
var ln = {
	cameraCaptureControl: sn,
	cameraButton: cn
}, un = {
	icons: P,
	ns: E,
	rdf: ne,
	style: j,
	widgets: Ae
};
function dn(e, t, r, i, c) {
	t ||= T.store, i = i.doc();
	let u = un.ns, d = a("http://www.w3.org/2005/01/wf/flow#"), f = a("http://purl.org/dc/terms/");
	c ||= {};
	let p = !!c.newestFirst, m = "white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;", h = e.createElement("div"), g, _, v = T.store.updater, y = function(t, n) {
		let r = e.createElement("a");
		return n && n.uri && (r.setAttribute("href", n.uri), r.addEventListener("click", un.widgets.openHrefInOutlineMode, !0), r.setAttribute("style", "color: #3B5998; text-decoration: none; ")), r.textContent = t, r;
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
		let a = e.createElement("tr"), o = e.createElement("td"), s = e.createElement("td"), c = e.createElement("td");
		a.appendChild(o), a.appendChild(s), a.appendChild(c), a.AJAR_date = "9999-01-01T00:00:00Z";
		let d = function() {
			p.setAttribute("class", "pendingedit"), p.disabled = !0;
			let o = [], s = /* @__PURE__ */ new Date(), c = "" + s.getTime(), d = n(s), m = t.sym(i.uri + "#Msg" + c);
			o.push(new l(r, u.wf("message"), m, i)), o.push(new l(m, u.sioc("content"), t.literal(p.value), i)), o.push(new l(m, f("created"), d, i)), _ && o.push(new l(m, u.foaf("maker"), _, i)), v.update([], o, function(n, r, i) {
				if (!r) a.appendChild(un.widgets.errorMessageBlock(e, "Error writing message: " + i));
				else {
					let e = {
						"?msg": m,
						"?content": t.literal(p.value),
						"?date": d,
						"?creator": _
					};
					D(e, !1), p.value = "", p.setAttribute("class", ""), p.disabled = !1;
				}
			});
		};
		a.appendChild(e.createElement("br"));
		let p, h, g = function() {
			w(o, _, "", null), p = e.createElement("textarea"), s.innerHTML = "", s.appendChild(p), p.rows = 3, p.setAttribute("style", m + "background-color: #eef;"), p.addEventListener("keyup", function(e) {
				e.keyCode === 13 && (e.altKey || d());
			}, !1), c.innerHTML = "", h = un.widgets.button(e, un.icons.iconBase + "noun_383448.svg", "Send"), h.setAttribute("style", un.style.buttonStyle + "float: right;"), h.addEventListener("click", d, !1), c.appendChild(h);
		};
		return ft({
			div: s,
			dom: e
		}).then((e) => {
			_ = e.me, g();
		}), a;
	};
	function C(e) {
		let t = T.store.any(e, un.ns.foaf("nick"));
		return t ? "" + t.value : "" + M(e);
	}
	function w(t, n, r, i) {
		let a = t.appendChild(y(C(n), n));
		n.uri && T.store.fetcher.nowOrWhenFetched(n.doc(), void 0, function(e, t) {
			a.textContent = C(n);
		}), t.appendChild(e.createElement("br")), t.appendChild(y(r, i));
	}
	function ee(e, n) {
		let r = {}, i, a;
		for (i = n.firstChild; i; i = i.nextSibling) i.AJAR_subject && (r[i.AJAR_subject.uri] = !0);
		let o = t.each(e, u.wf("message")), s = {};
		for (o.forEach(function(e) {
			s[e.uri] = !0, r[e.uri] || te(e);
		}), i = n.firstChild; i;) a = i.nextSibling, i.AJAR_subject && !s[i.AJAR_subject.uri] && n.removeChild(i), i = a;
	}
	let E = function(e) {
		let n = t.statementsMatching(e).concat(t.statementsMatching(void 0, void 0, e));
		v.update(n, [], function(e, t, n) {
			t ? ee(r, g) : x.error("Cant delete messages:" + n);
		});
	}, te = function(e) {
		let n = {
			"?msg": e,
			"?creator": t.any(e, u.foaf("maker")),
			"?date": t.any(e, f("created")),
			"?content": t.any(e, u.sioc("content"))
		};
		D(n, !0);
	}, D = function(t, n) {
		let r = t["?creator"], i = t["?msg"], a = t["?date"], o = t["?content"], s = a.value, c = e.createElement("tr");
		c.AJAR_date = s, c.AJAR_subject = i;
		let l = !1;
		for (let e = g.firstChild; e; e = e.nextSibling) if (s > e.AJAR_date && p || s < e.AJAR_date && !p) {
			g.insertBefore(c, e), l = !0;
			break;
		}
		l || g.appendChild(c);
		let u = e.createElement("td");
		c.appendChild(u), w(u, r, un.widgets.shortDate(s), i);
		let d = e.createElement("td");
		c.appendChild(d);
		let f = e.createElement("p");
		f.setAttribute("style", m + (n ? "background-color: #e8ffe8;" : "background-color: #white;")), d.appendChild(f), f.textContent = o.value;
		let h = e.createElement("td");
		c.appendChild(h);
		let _ = e.createElement("button");
		h.appendChild(_), _.textContent = "-", c.setAttribute("class", "hoverControl"), _.setAttribute("class", "hoverControlHide"), _.setAttribute("style", "color: red;"), _.addEventListener("click", function(t) {
			h.removeChild(_);
			let n = e.createElement("button");
			n.textContent = "cancel", h.appendChild(n).addEventListener("click", function(e) {
				h.removeChild(r), h.removeChild(n), h.appendChild(_);
			}, !1);
			let r = e.createElement("button");
			r.textContent = "Delete message", h.appendChild(r).addEventListener("click", function(e) {
				h.removeChild(r), h.removeChild(n), E(i);
			}, !1);
		}, !1);
	};
	g = e.createElement("table"), g.fresh = !1, h.appendChild(g), g.setAttribute("style", "width: 100%;");
	let ne = S();
	p ? g.insertBefore(ne, g.firstChild) : g.appendChild(ne);
	let re;
	if (c.query) re = c.query;
	else {
		re = new o("Messages");
		let e = {};
		[
			"msg",
			"date",
			"creator",
			"content"
		].forEach(function(t) {
			re.vars.push(e[t] = s(t));
		}), re.pat.add(r, d("message"), e.msg), re.pat.add(e.msg, u.dct("created"), e.date), re.pat.add(e.msg, u.foaf("maker"), e.creator), re.pat.add(e.msg, u.sioc("content"), e.content);
	}
	function O() {
		g.fresh = !0;
	}
	return t.query(re, D, void 0, O), h.refresh = function() {
		ee(r, g);
	}, h;
}
// src/chat/dateFolder.js
async function fn(e) {
	return await A.fetcher.load(e), !(A.statementsMatching(null, E.dct("created"), null, e).length > 0);
}
var pn = class {
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
				if (e.response && e.response.status && e.response.status === 404) N("Error 404 for chat parent file " + s);
				else throw N("*** Error NON 404 for chat parent file " + s), Error(`*** ${e.message} for chat folder ${s}`);
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
				if (await fn(n)) e = i, r = this.leafDocumentFromDate(e).dir();
				else return i;
			} else return null;
		}
	}
	async firstLeaf(t) {
		let n = u(), r = new e(n);
		async function i(e) {
			function i(e) {
				let t = e.uri.slice(0, -1).split("/").slice(-1)[0];
				return !!"0123456789".includes(t[0]);
			}
			delete r.requested[e.uri], await r.load(e, { force: !0 });
			let a = n.each(e, E.ldp("contains"));
			if (a = a.filter(i), a.length === 0) throw Error(" @@@  No children to         parent2 " + e);
			return a.sort(), t && a.reverse(), a[0];
		}
		let a = await i(await i(await i(this.root.dir()))), o = d(a.uri + "chat.ttl");
		await r.load(o);
		let s = n.each(this.root, this.membershipProperty, null, o);
		if (s.length === 0) {
			let e = "  INCONSISTENCY -- no chat leafObject in file " + o;
			throw fe(e), Error(e);
		}
		let c = s.map((e) => [n.any(e, E.dct("created")), e]);
		return c.sort(), t && c.reverse(), c[0][1];
	}
}, mn = (e) => e / 2 ** 32 | 0, hn = (e) => e >>> 0;
function gn(e, t, n, r) {
	let i = mn(n), a = hn(n);
	e.setUint32(t, r ? a : i, r), e.setUint32(t + 4, r ? i : a, r);
}
// node_modules/@noble/hashes/utils.js
function _n(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in e && e.BYTES_PER_ELEMENT === 1;
}
var vn = (e) => e ? `"${e}" ` : "";
function yn(e, t = "") {
	if (typeof e != "number") throw TypeError(vn(t) + "expected number, got " + typeof e);
	if (!Number.isSafeInteger(e) || e < 0) throw RangeError(vn(t) + "expected integer >= 0, got " + e);
	return e;
}
function bn(e, t, n = "") {
	if (_n(e) && (t === void 0 || e.length === t)) return e;
	t !== void 0 && yn(t, "length");
	let r = _n(e), i = t === void 0 ? "" : ` of length ${t}`, a = r ? `length=${e.length}` : `type=${typeof e}`, o = vn(n) + "expected Uint8Array" + i + ", got " + a;
	throw r ? RangeError(o) : TypeError(o);
}
var xn = (e, t) => {
	if (typeof e != "object" || !e || Array.isArray(e)) throw TypeError((t === "object" ? "" : `"${t}" `) + "expected object, got type=" + typeof e);
}, Sn = (e, t) => {
	xn(e, t);
	let n = Object.getPrototypeOf(e);
	if (n !== Object.prototype && n !== null) throw TypeError(`"${t}" expected plain object`);
	if (Object.hasOwn(e, "__proto__")) throw TypeError(`"${t}.__proto__" is not allowed`);
};
function Cn(e, t = !0) {
	if (e.destroyed) throw Error("hash was destroyed");
	if (t && e.finished) throw Error("digest() was already called");
}
function wn(e, t) {
	bn(e, void 0, "output");
	let n = t.outputLen;
	if (!(e.length >= n)) throw RangeError("\"output\" expected length >= " + n);
}
function Tn(...e) {
	for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function En(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function Dn(e, t) {
	return e << 32 - t | e >>> t;
}
var On = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", kn = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function An(e) {
	if (bn(e), On) return e.toHex();
	let t = "";
	for (let n = 0; n < e.length; n++) t += kn[e[n]];
	return t;
}
function jn(e) {
	return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : void 0;
}
function Mn(e) {
	if (typeof e != "string") throw TypeError("hex string expected, got " + typeof e);
	if (On) try {
		return Uint8Array.fromHex(e);
	} catch (e) {
		throw e instanceof SyntaxError ? RangeError(e.message) : e;
	}
	let t = e.length, n = t / 2;
	if (t % 2) throw RangeError("hex string expected, got unpadded hex of length " + t);
	let r = new Uint8Array(n);
	for (let t = 0, i = 0; t < n; t++, i += 2) {
		let n = jn(e.charCodeAt(i)), a = jn(e.charCodeAt(i + 1));
		if (n === void 0 || a === void 0) {
			let t = e[i] + e[i + 1];
			throw RangeError("hex string expected, got non-hex character \"" + t + "\" at index " + i);
		}
		r[t] = n * 16 + a;
	}
	return r;
}
function Nn(...e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		bn(r), t += r.length;
	}
	let n = new Uint8Array(t);
	for (let t = 0, r = 0; t < e.length; t++) {
		let i = e[t];
		n.set(i, r), r += i.length;
	}
	return n;
}
function Pn(e, t, n = "opts") {
	return Sn(e, "defaults"), t !== void 0 && Sn(t, n), Object.assign(Object.create(null), e, t);
}
function Fn(e, t = {}) {
	if (typeof e != "function") throw TypeError("\"hashCons\" expected function, got type=" + typeof e);
	t = Pn({}, t, "info");
	let n = (t, n) => e(n).update(t).digest(), r = e(void 0);
	return n.outputLen = r.outputLen, n.blockLen = r.blockLen, n.canXOF = r.canXOF, n.create = (t) => e(t), Object.assign(n, t), Object.freeze(n);
}
function In(e = 32) {
	yn(e, "bytesLength");
	let t = typeof globalThis == "object" ? globalThis.crypto : null;
	if (typeof t?.getRandomValues != "function") throw Error("crypto.getRandomValues must be defined");
	if (e > 65536) throw RangeError(`"bytesLength" expected <= 65536, got ${e}`);
	return t.getRandomValues(new Uint8Array(e));
}
var Ln = (e) => ({ oid: Uint8Array.from([
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
// node_modules/@noble/hashes/_md.js
function Rn(e, t, n) {
	return e & t ^ ~e & n;
}
function zn(e, t, n) {
	return e & t ^ e & n ^ t & n;
}
var Bn = class {
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
		this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = r, this.buffer = new Uint8Array(e), this.view = En(this.buffer);
	}
	update(e) {
		Cn(this), bn(e);
		let { view: t, buffer: n, blockLen: r } = this, i = e.length, a = !1;
		for (let o = 0; o < i;) {
			let s = Math.min(r - this.pos, i - o);
			if (s === r) {
				let t = En(e);
				for (; r <= i - o; o += r) this.process(t, o);
				a = !0;
			} else n.set(o === 0 && s === i ? e : e.subarray(o, o + s), this.pos), this.pos += s, o += s, this.pos === r && (this.process(t, 0), this.pos = 0, a = !0);
		}
		return this.length += e.length, a && this.roundClean(), this;
	}
	digestInto(e) {
		Cn(this), wn(e, this), this.finished = !0;
		let { buffer: t, view: n, blockLen: r, isLE: i } = this, { pos: a } = this;
		t[a++] = 128, t.fill(0, a), this.padOffset > r - a && (this.process(n, 0), t.fill(0)), gn(n, r - 8, this.length * 8, i), this.process(n, 0), this.roundClean();
		let o = e === t ? n : En(e), s = this.outputLen, c = s / 4, l = this.get();
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
}, Vn = /* @__PURE__ */ Uint32Array.from([
	0x6a09e667,
	0xbb67ae85,
	0x3c6ef372,
	0xa54ff53a,
	0x510e527f,
	0x9b05688c,
	528734635,
	0x5be0cd19
]), Hn = /* @__PURE__ */ Uint32Array.from([
	0x428a2f98,
	0x71374491,
	0xb5c0fbcf,
	0xe9b5dba5,
	961987163,
	0x59f111f1,
	0x923f82a4,
	0xab1c5ed5,
	0xd807aa98,
	310598401,
	607225278,
	0x550c7dc3,
	0x72be5d74,
	0x80deb1fe,
	0x9bdc06a7,
	0xc19bf174,
	0xe49b69c1,
	0xefbe4786,
	0xfc19dc6,
	604807628,
	770255983,
	0x4a7484aa,
	0x5cb0a9dc,
	0x76f988da,
	0x983e5152,
	0xa831c66d,
	0xb00327c8,
	0xbf597fc7,
	0xc6e00bf3,
	0xd5a79147,
	0x6ca6351,
	338241895,
	666307205,
	773529912,
	0x4d2c6dfc,
	0x53380d13,
	0x650a7354,
	0x766a0abb,
	0x81c2c92e,
	0x92722c85,
	0xa2bfe8a1,
	0xa81a664b,
	0xc24b8b70,
	0xc76c51a3,
	0xd192e819,
	0xd6990624,
	0xf40e3585,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	0x4ed8aa4a,
	0x5b9cca4f,
	0x682e6ff3,
	0x748f82ee,
	0x78a5636f,
	0x84c87814,
	0x8cc70208,
	0x90befffa,
	0xa4506ceb,
	0xbef9a3f7,
	0xc67178f2
]), Un = /* @__PURE__ */ new Uint32Array(64), Wn = class extends Bn {
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
		for (let n = 0; n < 16; n++, t += 4) Un[n] = e.getUint32(t, !1);
		for (let e = 16; e < 64; e++) {
			let t = Un[e - 15], n = Un[e - 2], r = Dn(t, 7) ^ Dn(t, 18) ^ t >>> 3, i = Dn(n, 17) ^ Dn(n, 19) ^ n >>> 10;
			Un[e] = i + Un[e - 7] + r + Un[e - 16] | 0;
		}
		let { A: n, B: r, C: i, D: a, E: o, F: s, G: c, H: l } = this;
		for (let e = 0; e < 64; e++) {
			let t = Dn(o, 6) ^ Dn(o, 11) ^ Dn(o, 25), u = l + t + Rn(o, s, c) + Hn[e] + Un[e] | 0, d = (Dn(n, 2) ^ Dn(n, 13) ^ Dn(n, 22)) + zn(n, r, i) | 0;
			l = c, c = s, s = o, o = a + u | 0, a = i, i = r, r = n, n = u + d | 0;
		}
		n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, s = s + this.F | 0, c = c + this.G | 0, l = l + this.H | 0, this.set(n, r, i, a, o, s, c, l);
	}
	roundClean() {
		Tn(Un);
	}
	destroy() {
		this.destroyed = !0, this.set(0, 0, 0, 0, 0, 0, 0, 0), Tn(this.buffer);
	}
}, Gn = class extends Wn {
	constructor() {
		super(32, Vn);
	}
}, Kn = /* @__PURE__ */ Fn(() => new Gn(), /* @__PURE__ */ Ln(1));
// node_modules/@noble/curves/utils.js
function qn(e, t, n = () => {}) {
	if (!Array.isArray(e)) throw TypeError(`"${t}" expected array, got type=${typeof e}`);
	for (let r = 0; r < e.length; r++) n(e[r], `${t}[${r}]`);
	return e;
}
var Jn = (e, t, n) => bn(e, t, n), Yn = yn;
function Xn(e, t = "object") {
	if (typeof e != "object" || !e || Array.isArray(e)) throw TypeError(t === "object" ? "expected valid options object" : `"${t}" expected object, got type=${typeof e}`);
	return e;
}
function Zn(e, t) {
	if (typeof e != "function") throw TypeError(`"${t}" is invalid: expected function, got ${typeof e}`);
	return e;
}
var Qn = An, $n = (...e) => Nn(...e), er = (e) => Mn(e), tr = _n, nr = (e) => In(e), rr = /* @__PURE__ */ BigInt(0), ir = /* @__PURE__ */ BigInt(1), ar = (e) => e ? `"${e}" ` : "";
function or(e, t = "") {
	if (typeof e != "boolean") throw TypeError(ar(t) + "expected boolean, got type=" + typeof e);
	return e;
}
function sr(e) {
	if (typeof e == "bigint") {
		if (!gr(e)) throw RangeError("positive bigint expected, got " + e);
	} else Yn(e);
	return e;
}
function cr(e, t = "") {
	if (typeof e != "number") {
		let n = t && `"${t}" `;
		throw TypeError(n + "expected number, got type=" + typeof e);
	}
	if (!Number.isSafeInteger(e)) {
		let n = t && `"${t}" `;
		throw RangeError(n + "expected safe integer, got " + e);
	}
}
function lr(e) {
	if (typeof e != "string") throw TypeError("hex string expected, got " + typeof e);
	return e === "" ? rr : BigInt("0x" + e);
}
function ur(e) {
	return lr(An(e));
}
function dr(e) {
	return lr(An(mr(bn(e)).reverse()));
}
function fr(e, t) {
	if (yn(t), t === 0) throw Error("zero output length is invalid");
	e = sr(e);
	let n = t * 2, r = e.toString(16);
	if (r.length > n) throw RangeError("number is too large");
	return Mn(r.padStart(n, "0"));
}
function pr(e, t) {
	return fr(e, t).reverse();
}
function mr(e) {
	return Uint8Array.from(Jn(e));
}
function hr(e) {
	if (typeof e != "string") throw TypeError("ascii string expected, got " + typeof e);
	return Uint8Array.from(e, (t, n) => {
		let r = t.charCodeAt(0);
		if (t.length !== 1 || r > 127) throw RangeError(`string contains non-ASCII character "${e[n]}" with code ${r} at position ${n}`);
		return r;
	});
}
function gr(e) {
	return typeof e == "bigint" && rr <= e;
}
function _r(e, t, n) {
	return gr(e) && gr(t) && gr(n) && t <= e && e < n;
}
function vr(e, t, n, r) {
	if (!_r(t, n, r)) throw RangeError("expected valid " + e + ": " + n + " <= n < " + r + ", got " + t);
}
function yr(e) {
	if (e < rr) throw Error("expected non-negative bigint, got " + e);
	return e === rr ? 0 : e.toString(2).length;
}
var br = (e) => (cr(e, "n"), (ir << BigInt(e)) - ir);
function xr(e, t = {}, n = {}, r = "object") {
	Xn(e, r), Xn(t, "fields"), Xn(n, "optFields");
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
// node_modules/@noble/curves/abstract/modular.js
var Sr = /* @__PURE__ */ BigInt(0), I = /* @__PURE__ */ BigInt(1), Cr = /* @__PURE__ */ BigInt(2), wr = /* @__PURE__ */ BigInt(3), Tr = /* @__PURE__ */ BigInt(4), Er = /* @__PURE__ */ BigInt(5), Dr = /* @__PURE__ */ BigInt(7), Or = /* @__PURE__ */ BigInt(8), kr = /* @__PURE__ */ BigInt(9), Ar = /* @__PURE__ */ BigInt(15), jr = /* @__PURE__ */ BigInt(16), Mr = /* @__PURE__ */ BigInt("0x10000000000000000");
function Nr(e, t) {
	if (t <= Sr) throw Error("mod: expected positive modulus, got " + t);
	let n = e % t;
	return n >= Sr ? n : t + n;
}
function Pr(e, t, n) {
	if (n <= I) throw Error("pow: expected modulus > 1, got " + n);
	if (typeof t != "bigint") throw TypeError("invalid exponent: expected bigint, got " + typeof t);
	if (t < Sr) throw Error("invalid exponent, negatives unsupported");
	if (t === Sr) return I;
	if (t === I) return e;
	let r = e % n;
	if (r < Sr && (r += n), t < Mr) {
		let e = I;
		for (; t > Sr;) t & I && (e = e * r % n), r = r * r % n, t >>= I;
		return e;
	}
	let i = [];
	for (; t > Sr;) i.push(Number(t & Ar)), t >>= Tr;
	let a = Array(16);
	a[0] = I, a[1] = r;
	for (let e = 2; e < 16; e++) a[e] = a[e - 1] * r % n;
	let o = a[i[i.length - 1]];
	for (let e = i.length - 2; e >= 0; e--) {
		o = o * o % n, o = o * o % n, o = o * o % n, o = o * o % n;
		let t = i[e];
		t !== 0 && (o = o * a[t] % n);
	}
	return o;
}
function Fr(e, t, n) {
	if (n <= I) throw Error("pow2: expected modulus > 1, got " + n);
	if (t < Sr) throw Error("pow2: expected non-negative exponent, got " + t);
	let r = e;
	for (; t-- > Sr;) r *= r, r %= n;
	return r;
}
function Ir(e, t) {
	if (e === Sr) throw Error("invert: expected non-zero number");
	if (t <= I) throw Error("invert: expected modulus > 1, got " + t);
	let n = Nr(e, t), r = t, i = Sr, a = I;
	for (; n !== Sr;) {
		let e = r / n, t = r - n * e, o = i - a * e;
		r = n, n = t, i = a, a = o;
	}
	if (r !== I) throw Error("invert: does not exist");
	return Nr(i, t);
}
function Lr(e, t, n) {
	let r = e;
	if (!r.eql(r.sqr(t), n)) throw Error("Cannot find square root");
}
function Rr(e, t) {
	if ((e & I) === Sr) throw Error(t + ": expected odd modulus, got " + e);
}
function zr(e, t) {
	let n = e, r = (n.ORDER + I) / Tr, i = n.pow(t, r);
	return Lr(n, i, t), i;
}
function Br(e, t) {
	let n = e, r = (n.ORDER - Er) / Or, i = n.mul(t, Cr), a = n.pow(i, r), o = n.mul(t, a), s = n.mul(n.mul(o, Cr), a), c = n.mul(o, n.sub(s, n.ONE));
	return Lr(n, c, t), c;
}
function Vr(e) {
	let t = Zr(e), n = Hr(e), r = n(t, t.neg(t.ONE)), i = n(t, r), a = n(t, t.neg(r)), o = (e + Dr) / jr;
	return ((e, t) => {
		let n = e, s = n.pow(t, o), c = n.mul(s, r), l = n.mul(s, i), u = n.mul(s, a), d = n.eql(n.sqr(c), t), f = n.eql(n.sqr(l), t);
		s = n.cmov(s, c, d), c = n.cmov(u, l, f);
		let p = n.eql(n.sqr(c), t), m = n.cmov(s, c, p);
		return Lr(n, m, t), m;
	});
}
function Hr(e) {
	if (e < wr) throw Error("sqrt is not defined for small field");
	Rr(e, "tonelliShanks");
	let t = e - I, n = 0;
	for (; t % Cr === Sr;) t /= Cr, n++;
	let r = Cr, i = Zr(e);
	for (; qr(i, r) === 1;) if (r++ > 1e3) throw Error("Cannot find square root: probably non-prime P");
	if (n === 1) return zr;
	let a = i.pow(r, t), o = (t + I) / Cr;
	return function(e, r) {
		let i = e;
		if (i.is0(r)) return r;
		if (qr(i, r) !== 1) throw Error("Cannot find square root");
		let s = n, c = i.mul(i.ONE, a), l = i.pow(r, t), u = i.pow(r, o);
		for (; !i.eql(l, i.ONE);) {
			if (i.is0(l)) throw Error("Cannot find square root: probably non-prime P");
			let e = 1, t = i.sqr(l);
			for (; !i.eql(t, i.ONE);) if (e++, t = i.sqr(t), e === s) throw Error("Cannot find square root");
			let n = I << BigInt(s - e - 1), r = i.pow(c, n);
			s = e, c = i.sqr(r), l = i.mul(l, c), u = i.mul(u, r);
		}
		return u;
	};
}
function Ur(e) {
	return Rr(e, "Fp.sqrt"), e % Tr === wr ? zr : e % Or === Er ? Br : e % jr === kr ? Vr(e) : Hr(e);
}
var Wr = [
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
function Gr(e) {
	if (Xn(e, "field"), typeof e.ORDER != "bigint") throw TypeError("param \"ORDER\" is invalid: expected bigint, got " + typeof e.ORDER);
	cr(e.BYTES, "BYTES"), cr(e.BITS, "BITS");
	for (let t of Wr) Zn(e[t], "field." + t);
	if (e.BYTES < 1 || e.BITS < 1) throw Error("invalid field: expected BYTES/BITS > 0");
	if (e.ORDER <= I) throw Error("invalid field: expected ORDER > 1, got " + e.ORDER);
	return e;
}
function Kr(e, t, n = !1) {
	Gr(e), qn(t, "nums"), or(n, "passZero");
	let r = e, i = Array(t.length).fill(n ? r.ZERO : void 0), a = t.reduce((e, t, n) => r.is0(t) ? e : (i[n] = e, r.mul(e, t)), r.ONE), o = r.inv(a);
	return t.reduceRight((e, t, n) => r.is0(t) ? e : (i[n] = r.mul(e, i[n]), r.mul(e, t)), o), i;
}
function qr(e, t) {
	Gr(e);
	let n = e;
	Rr(n.ORDER, "FpLegendre");
	let r = (n.ORDER - I) / Cr, i = n.pow(t, r), a = n.eql(i, n.ONE), o = n.eql(i, n.ZERO), s = n.eql(i, n.neg(n.ONE));
	if (!a && !o && !s) throw Error("invalid Legendre symbol result");
	return a ? 1 : o ? 0 : -1;
}
function Jr(e, t) {
	if (t !== void 0 && Yn(t), e <= Sr) throw Error("invalid n length: expected positive n, got " + e);
	if (t !== void 0 && t < 1) throw Error("invalid n length: expected positive bit length, got " + t);
	let n = yr(e);
	if (t !== void 0 && t < n) throw Error(`invalid n length: expected nBitLength (${t}) >= bitLen(n) (${n})`);
	let r = t === void 0 ? n : t;
	return {
		nBitLength: r,
		nByteLength: Math.ceil(r / 8)
	};
}
var Yr = /* @__PURE__ */ new WeakMap(), Xr = class {
	ORDER;
	BITS;
	BYTES;
	isLE;
	ZERO = Sr;
	ONE = I;
	_lengths;
	_mod;
	constructor(e, t = {}) {
		if (e <= I) throw Error("invalid field: expected ORDER > 1, got " + e);
		let n;
		this.isLE = !1, typeof t == "object" && t && (typeof t.BITS == "number" && (n = t.BITS), typeof t.sqrt == "function" && Object.defineProperty(this, "sqrt", {
			value: t.sqrt,
			enumerable: !0
		}), typeof t.isLE == "boolean" && (this.isLE = t.isLE), t.allowedLengths && (this._lengths = Object.freeze(t.allowedLengths.slice())), typeof t.modFromBytes == "boolean" && (this._mod = t.modFromBytes));
		let { nBitLength: r, nByteLength: i } = Jr(e, n);
		if (i > 2048) throw Error("invalid field: expected ORDER of <= 2048 bytes");
		this.ORDER = e, this.BITS = r, this.BYTES = i, Object.freeze(this);
	}
	create(e) {
		return Nr(e, this.ORDER);
	}
	isValid(e) {
		if (typeof e != "bigint") throw TypeError("invalid field element: expected bigint, got " + typeof e);
		return Sr <= e && e < this.ORDER;
	}
	is0(e) {
		return e === Sr;
	}
	isValidNot0(e) {
		return !this.is0(e) && this.isValid(e);
	}
	isOdd(e) {
		return (e & I) === I;
	}
	neg(e) {
		return Nr(-e, this.ORDER);
	}
	eql(e, t) {
		return e === t;
	}
	sqr(e) {
		return Nr(e * e, this.ORDER);
	}
	add(e, t) {
		return Nr(e + t, this.ORDER);
	}
	sub(e, t) {
		return Nr(e - t, this.ORDER);
	}
	mul(e, t) {
		return Nr(e * t, this.ORDER);
	}
	pow(e, t) {
		return Pr(e, t, this.ORDER);
	}
	div(e, t) {
		return Nr(e * Ir(t, this.ORDER), this.ORDER);
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
		return Ir(e, this.ORDER);
	}
	sqrt(e) {
		let t = Yr.get(this);
		return t || Yr.set(this, t = Ur(this.ORDER)), t(this, e);
	}
	toBytes(e) {
		return this.isLE ? pr(e, this.BYTES) : fr(e, this.BYTES);
	}
	fromBytes(e, t = !1) {
		Jn(e);
		let { _lengths: n, BYTES: r, isLE: i, ORDER: a, _mod: o } = this;
		if (n) {
			if (e.length < 1 || !n.includes(e.length) || e.length > r) throw Error("Field.fromBytes: expected " + n + " bytes, got " + e.length);
			let t = new Uint8Array(r);
			t.set(e, i ? 0 : t.length - e.length), e = t;
		}
		if (e.length !== r) throw Error("Field.fromBytes: expected " + r + " bytes, got " + e.length);
		let s = i ? dr(e) : ur(e);
		if (o && (s = Nr(s, a)), !t && !this.isValid(s)) throw Error("invalid field element: outside of range 0..ORDER");
		return s;
	}
	invertBatch(e) {
		return Kr(this, e, !0);
	}
	cmov(e, t, n) {
		return or(n, "condition"), n ? t : e;
	}
};
function Zr(e, t = {}) {
	return Object.freeze(Xr.prototype), new Xr(e, t);
}
function Qr(e) {
	if (typeof e != "bigint") throw Error("field order must be bigint");
	if (e <= I) throw Error("field order must be greater than 1");
	let t = yr(e - I);
	return Math.ceil(t / 8);
}
function $r(e) {
	let t = Qr(e);
	return t + Math.ceil(t / 2);
}
function ei(e, t, n = !1) {
	Jn(e);
	let r = e.length, i = Qr(t), a = Math.max($r(t), 16);
	if (r < a || r > 1024) throw Error("expected " + a + "-1024 bytes of input, got " + r);
	let o = Nr(n ? dr(e) : ur(e), t - I) + I;
	return n ? pr(o, i) : fr(o, i);
}
// node_modules/@noble/curves/abstract/curve.js
var ti = /* @__PURE__ */ BigInt(0), ni = /* @__PURE__ */ BigInt(1), ri = /* @__PURE__ */ BigInt(4), ii = 16, ai = 128, oi = 5, si = 2 ** 31;
function ci(e) {
	let t = e;
	if (typeof t != "function") throw TypeError("\"Point\" expected constructor, got type=" + typeof e);
	Zn(t.fromAffine, "Point.fromAffine"), Zn(t.fromBytes, "Point.fromBytes"), Zn(t.fromHex, "Point.fromHex"), Xn(t.BASE, "Point.BASE"), Xn(t.ZERO, "Point.ZERO"), Gr(t.Fp), Gr(t.Fn);
}
function li(e, t) {
	ci(e), pi(t, e);
	let n = Kr(e.Fp, t.map((e) => e.Z));
	return t.map((t, r) => e.fromAffine(t.toAffine(n[r])));
}
function ui(e, t, n = 1) {
	if (!Number.isSafeInteger(e) || e < n || e > t) throw Error("invalid window size, expected [" + n + ".." + t + "], got W=" + e);
}
function di(e, t) {
	let n = e * (4 * t + 128);
	if (n > si) throw Error("invalid window size: table would need ~" + Math.ceil(n / 2 ** 20) + " MiB, max " + si / 2 ** 20 + " MiB");
}
function fi(e, t) {
	if (e !== void 0) {
		Zn(e, "randomBytes");
		try {
			let n = e(t);
			if (!tr(n) || n.length !== t) return;
		} catch {
			return;
		}
		return e;
	}
}
function pi(e, t) {
	qn(e, "points"), e.forEach((e, n) => {
		if (!(e instanceof t)) throw Error("invalid point at index " + n);
	});
}
function mi(e, t, n) {
	if (!Array.isArray(e)) throw Error("array of scalars expected");
	e.forEach((e, r) => {
		if (!(n === void 0 ? t.isValid(e) : gr(e) && e < n)) throw Error("invalid scalar at index " + r);
	});
}
var hi = /* @__PURE__ */ new WeakMap();
function gi(e) {
	return hi.get(e) || 1;
}
function _i(e, t) {
	let n = e.double(), r = [e];
	for (let e = 1; e < t; e++) r.push(r[e - 1].add(n));
	return r;
}
function vi(e, t) {
	let n = 2 ** t, r = n / 2, i = BigInt(n - 1), a = [];
	for (; e > ti;) {
		let t = 0;
		e & ni && (t = Number(e & i), t >= r && (t -= n), e -= BigInt(t)), a.push(t), e >>= ni;
	}
	return a;
}
function yi(e, t, n) {
	let r = 2 ** t, i = r / 2, a = BigInt(r - 1), o = BigInt(t), s = [];
	for (let t = 0; t < n; t++) {
		let t = Number(e & a);
		e >>= o, t > i && (t -= r, e += ni), s.push(t);
	}
	if (e !== ti) throw Error("invalid wnaf");
	return s;
}
function bi(e, t, n) {
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
var xi = class {
	Point;
	BASE;
	ZERO;
	randomBytes;
	wnafPrecomputes = /* @__PURE__ */ new WeakMap();
	baseCanBeBlinded;
	bits;
	constructor(e, t) {
		ci(e), this.randomBytes = fi(t, ii), this.Point = e, this.BASE = e.BASE, this.ZERO = e.ZERO, this.bits = e.Fn.BITS;
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
		let { W: n, windows: r, comp: i } = e, a = 2 ** (n - 1), o = yi(t, n, r), s = this.ZERO, c = this.BASE;
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
		if (this.assertPoint(e), !_r(t, ni, this.Point.Fn.ORDER)) throw Error("invalid scalar");
	}
	runCT(e, t, n, r) {
		let i = gi(e);
		return i === 1 ? this.fixedWindowCT(e, t, n) : this.wnafCachedCT(this.getWnafPrecomputes(i, e, n, r), t);
	}
	mulCT(e, t, n) {
		return this.validateMulInput(e, t), this.runCT(e, t, this.bits, n);
	}
	mulCTBlinded(e, t, n) {
		if (this.validateMulInput(e, t), this.randomBytes === void 0) throw Error("randomBytes is required for scalar blinding");
		let r = this.Point.Fn.BITS + ai, i = this.randomBytes(ii);
		if (!tr(i) || i.length !== ii) throw Error("randomBytes returned invalid byte array");
		i[0] = i[0] & 63 | 128;
		let a = t + ur(i) * this.Point.Fn.ORDER;
		return this.runCT(e, a, r, n);
	}
	fixedWindowCT(e, t, n) {
		let r = oi, i = br(r), a = Array(32);
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
		return this.randomBytes === void 0 ? !1 : t === ni || e === this.BASE && (this.baseCanBeBlinded === void 0 && (this.baseCanBeBlinded = this.mulUnsafe(this.BASE, this.Point.Fn.ORDER).is0()), this.baseCanBeBlinded);
	}
	mulSecret(e, t, n, r) {
		return this.shouldBlind(e, n) ? this.mulCTBlinded(e, t, r) : this.mulCT(e, t, r);
	}
	mulUnsafe(e, t, n) {
		if (this.assertPoint(e), !gr(t)) throw Error("invalid scalar");
		let r = gi(e);
		if (r === 1 || t >= this.Point.Fn.ORDER) return Si(this.Point, [e], [t], !0);
		let i = this.getWnafPrecomputes(r, e, this.bits, n);
		return this.wnafCachedCT(i, t).p;
	}
	setWindowSize(e, t) {
		this.assertPoint(e), ui(t, this.bits), di((Math.ceil((this.bits + ai) / t) + 1) * 2 ** (t - 1), this.Point.Fp.BYTES), hi.set(e, t), this.wnafPrecomputes.delete(e);
	}
	hasWindowSize(e) {
		return gi(e) !== 1;
	}
};
function Si(e, t, n, r = !1) {
	if (ci(e), pi(t, e), or(r, "allowOversized"), mi(n, e.Fn, r ? e.Fn.ORDER ** ri : void 0), t.length !== n.length) throw Error("arrays of points and scalars must have equal length");
	let i = t.map((e) => _i(e, 4)), a = n.map((e) => vi(e, 4));
	return bi(e.ZERO, i, a);
}
function Ci(e, t, n) {
	if (t) {
		if (t.ORDER !== e) throw Error("Field.ORDER must match order: Fp == p, Fn == n");
		return Gr(t), t;
	}
	return Zr(e, { isLE: n });
}
function wi(e, t, n = {}, r) {
	if (e !== "weierstrass" && e !== "edwards") throw Error("expected curve type \"weierstrass\" or \"edwards\"");
	if (r === void 0 && (r = e === "edwards"), !t || typeof t != "object") throw Error(`expected valid ${e} CURVE object`);
	xr(n);
	for (let e of [
		"p",
		"n",
		"h"
	]) {
		let n = t[e];
		if (!(gr(n) && n !== ti)) throw Error(`CURVE.${e} must be positive bigint`);
	}
	let i = Ci(t.p, n.Fp, r), a = Ci(t.n, n.Fn, r), o = [
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
function Ti(e, t) {
	return function(n) {
		let r = e(n);
		return {
			secretKey: r,
			publicKey: t(r)
		};
	};
}
// node_modules/@noble/curves/abstract/weierstrass.js
var Ei = (e, t) => (e + (e >= 0 ? t : -t) / Ai) / t;
function Di(e, t, n) {
	vr("scalar", e, Oi, n);
	let [[r, i], [a, o]] = t, s = Ei(o * e, n), c = Ei(-i * e, n), l = e - s * r - c * a, u = -s * i - c * o, d = l < Oi, f = u < Oi;
	d && (l = -l), f && (u = -u);
	let p = br(Math.ceil(yr(n) / 2)) + ki;
	if (l < Oi || l >= p || u < Oi || u >= p) throw Error("splitScalar (endomorphism): failed for k");
	return {
		k1neg: d,
		k1: l,
		k2neg: f,
		k2: u
	};
}
var Oi = /* @__PURE__ */ BigInt(0), ki = /* @__PURE__ */ BigInt(1), Ai = /* @__PURE__ */ BigInt(2), ji = /* @__PURE__ */ BigInt(3), Mi = /* @__PURE__ */ BigInt(4);
function Ni(e, t = {}) {
	let n = wi("weierstrass", e, t), r = n.Fp, i = n.Fn, a = n.CURVE, { h: o, n: s } = a;
	xr(t, {}, {
		allowInfinityPoint: "boolean",
		clearCofactor: "function",
		isTorsionFree: "function",
		fromBytes: "function",
		toBytes: "function",
		endo: "object",
		randomBytes: "function"
	});
	let { endo: c, allowInfinityPoint: l, clearCofactor: u, isTorsionFree: d, fromBytes: f, toBytes: p } = t, m = t.randomBytes === void 0 ? nr : t.randomBytes;
	if (c && (!r.is0(a.a) || typeof c.beta != "bigint" || !Array.isArray(c.basises))) throw Error("invalid endo: expected \"beta\": bigint and \"basises\": array");
	let h = c ? {
		beta: c.beta,
		basises: c.basises.map((e) => [...e])
	} : void 0, g = Fi(r, i);
	function _() {
		if (!r.isOdd) throw Error("compression is not supported: Field does not have .isOdd()");
	}
	function v(e, t, n) {
		if (t.is0()) {
			if (!l) throw Error("bad point: ZERO");
			return Uint8Array.of(0);
		}
		let { x: i, y: a } = t.toAffine(), o = r.toBytes(i);
		return or(n, "isCompressed"), n ? (_(), $n(Pi(!r.isOdd(a)), o)) : $n(Uint8Array.of(4), o, r.toBytes(a));
	}
	function y(e) {
		Jn(e, void 0, "Point");
		let { publicKey: t, publicKeyUncompressed: n } = g, i = e.length, a = e[0], o = e.subarray(1);
		if (l && i === 1 && a === 0) return {
			x: r.ZERO,
			y: r.ZERO
		};
		if (i === t && (a === 2 || a === 3)) {
			let e = r.fromBytes(o);
			if (!r.isValid(e)) throw Error("bad point: is not on curve, wrong x");
			let t = w(e), n;
			try {
				n = r.sqrt(t);
			} catch (e) {
				let t = e instanceof Error ? ": " + e.message : "";
				throw Error("bad point: is not on curve, sqrt error" + t);
			}
			_();
			let i = r.isOdd(n);
			return (a & 1) == 1 !== i && (n = r.neg(n)), {
				x: e,
				y: n
			};
		}
		if (i === n && a === 4) {
			let e = r.BYTES, t = r.fromBytes(o.subarray(0, e)), n = r.fromBytes(o.subarray(e, e * 2));
			if (!T(t, n)) throw Error("bad point: is not on curve");
			return {
				x: t,
				y: n
			};
		}
		throw Error(`bad point: got length ${i}, expected compressed=${t} or uncompressed=${n}`);
	}
	let b = p === void 0 ? v : p, x = f === void 0 ? y : f, S = r.mul(a.b, ji), C = r.is0(a.a) ? (e) => r.ZERO : (e) => r.mul(a.a, e);
	function w(e) {
		let t = r.sqr(e), n = r.mul(t, e);
		return r.add(r.add(n, r.mul(e, a.a)), a.b);
	}
	function T(e, t) {
		let n = r.sqr(t), i = w(e);
		return r.eql(n, i);
	}
	if (!T(a.Gx, a.Gy)) throw Error("bad curve params: generator point");
	let ee = r.mul(r.pow(a.a, ji), Mi), E = r.mul(r.sqr(a.b), BigInt(27));
	if (r.is0(r.add(ee, E))) throw Error("bad curve params: a or b");
	function te(e, t, n = !1) {
		if (!r.isValid(t) || n && r.is0(t)) throw Error(`bad point coordinate ${e}`);
		return typeof t == "object" && t ? r.create(t) : t;
	}
	function D(e) {
		if (!(e instanceof k)) throw Error("Weierstrass Point expected");
	}
	function ne(e) {
		if (!h || !h.basises) throw Error("no endo");
		return Di(e, h.basises, i.ORDER);
	}
	function re(e, t, n, a) {
		if (!i.isValid(a)) throw RangeError("invalid scalar: out of range");
		if (h) {
			let { k1neg: i, k1: o, k2neg: s, k2: c } = ne(a), l = new k(r.mul(n.X, h.beta), n.Y, n.Z);
			e.push(i ? n.negate() : n, s ? l.negate() : l), t.push(o, c);
		} else e.push(n), t.push(a);
	}
	let O = /* @__PURE__ */ new WeakSet();
	class k {
		static BASE = new k(a.Gx, a.Gy, r.ONE);
		static ZERO = new k(r.ZERO, r.ONE, r.ZERO);
		static Fp = r;
		static Fn = i;
		X;
		Y;
		Z;
		constructor(e, t, n) {
			this.X = te("x", e), this.Y = te("y", t, !0), this.Z = te("z", n), Object.freeze(this);
		}
		static CURVE() {
			return a;
		}
		static fromAffine(e) {
			let { x: t, y: n } = e || {};
			if (!e || !r.isValid(t) || !r.isValid(n)) throw Error("invalid affine point");
			if (e instanceof k) throw Error("projective point not allowed");
			return r.is0(t) && r.is0(n) ? k.ZERO : new k(t, n, r.ONE);
		}
		static fromBytes(e) {
			let t = k.fromAffine(x(Jn(e, void 0, "point")));
			return t.assertValidity(), t;
		}
		static fromHex(e) {
			return k.fromBytes(er(e));
		}
		get x() {
			return this.toAffine().x;
		}
		get y() {
			return this.toAffine().y;
		}
		precompute(e = 6, t = !0) {
			return ie.setWindowSize(this, e), t || this.multiply(ji), this;
		}
		assertValidity() {
			let e = this;
			if (e.is0()) {
				if (l && r.is0(e.X) && r.eql(e.Y, r.ONE) && r.is0(e.Z)) return;
				throw Error("bad point: ZERO");
			}
			if (O.has(e)) return;
			let { x: t, y: n } = e.toAffine();
			if (!r.isValid(t) || !r.isValid(n)) throw Error("bad point: x or y not field elements");
			if (!T(t, n)) throw Error("bad point: equation left != right");
			if (!e.isTorsionFree()) throw Error("bad point: not in prime-order subgroup");
			O.add(e);
		}
		hasEvenY() {
			let { y: e } = this.toAffine();
			if (!r.isOdd) throw Error("Field doesn't support isOdd");
			return !r.isOdd(e);
		}
		equals(e) {
			D(e);
			let { X: t, Y: n, Z: i } = this, { X: a, Y: o, Z: s } = e, c = r.eql(r.mul(t, s), r.mul(a, i)), l = r.eql(r.mul(n, s), r.mul(o, i));
			return c && l;
		}
		negate() {
			return new k(this.X, r.neg(this.Y), this.Z);
		}
		double() {
			let { X: e, Y: t, Z: n } = this, i = r.ZERO, a = r.ZERO, o = r.ZERO, s = r.mul(e, e), c = r.mul(t, t), l = r.mul(n, n), u = r.mul(e, t);
			return u = r.add(u, u), o = r.mul(e, n), o = r.add(o, o), i = C(o), a = r.mul(S, l), a = r.add(i, a), i = r.sub(c, a), a = r.add(c, a), a = r.mul(i, a), i = r.mul(u, i), o = r.mul(S, o), l = C(l), u = r.sub(s, l), u = C(u), u = r.add(u, o), o = r.add(s, s), s = r.add(o, s), s = r.add(s, l), s = r.mul(s, u), a = r.add(a, s), l = r.mul(t, n), l = r.add(l, l), s = r.mul(l, u), i = r.sub(i, s), o = r.mul(l, c), o = r.add(o, o), o = r.add(o, o), new k(i, a, o);
		}
		add(e) {
			D(e);
			let { X: t, Y: n, Z: i } = this, { X: a, Y: o, Z: s } = e, c = r.ZERO, l = r.ZERO, u = r.ZERO, d = r.mul(t, a), f = r.mul(n, o), p = r.mul(i, s), m = r.add(t, n), h = r.add(a, o);
			m = r.mul(m, h), h = r.add(d, f), m = r.sub(m, h), h = r.add(t, i);
			let g = r.add(a, s);
			return h = r.mul(h, g), g = r.add(d, p), h = r.sub(h, g), g = r.add(n, i), c = r.add(o, s), g = r.mul(g, c), c = r.add(f, p), g = r.sub(g, c), u = C(h), c = r.mul(S, p), u = r.add(c, u), c = r.sub(f, u), u = r.add(f, u), l = r.mul(c, u), f = r.add(d, d), f = r.add(f, d), p = C(p), h = r.mul(S, h), f = r.add(f, p), p = r.sub(d, p), p = C(p), h = r.add(h, p), d = r.mul(f, h), l = r.add(l, d), d = r.mul(g, h), c = r.mul(m, c), c = r.sub(c, d), d = r.mul(m, f), u = r.mul(g, u), u = r.add(u, d), new k(c, l, u);
		}
		subtract(e) {
			return D(e), this.add(e.negate());
		}
		is0() {
			return this.equals(k.ZERO);
		}
		multiply(e) {
			if (!i.isValidNot0(e)) throw RangeError("invalid scalar: out of range");
			let { p: t, f: n } = ie.mulSecret(this, e, o, A);
			return A([t, n])[0];
		}
		multiplyUnsafe(e) {
			let t = this, n = e;
			if (!i.isValid(n)) throw RangeError("invalid scalar: out of range");
			if (n === Oi || t.is0()) return k.ZERO;
			if (n === ki) return t;
			if (ie.hasWindowSize(this)) return ie.mulUnsafe(t, n, A);
			let r = [], a = [];
			return re(r, a, t, n), Si(k, r, a);
		}
		mulAddUnsafe(e, t, n) {
			D(t);
			let r = [], i = [];
			return re(r, i, this, e), re(r, i, t, n), Si(k, r, i);
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
			return o === ki ? !0 : d ? d(k, this) : ie.mulUnsafe(this, s).is0();
		}
		clearCofactor() {
			return o === ki ? this : u ? u(k, this) : this.multiplyUnsafe(o);
		}
		isSmallOrder() {
			return o === ki ? this.is0() : this.clearCofactor().is0();
		}
		toBytes(e = !0) {
			return or(e, "isCompressed"), this.assertValidity(), b(k, this, e);
		}
		toHex(e = !0) {
			return Qn(this.toBytes(e));
		}
		toString() {
			return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
		}
	}
	let A = (e) => li(k, e), ie = new xi(k, m);
	return ie.bits >= 6 && k.BASE.precompute(6), Object.freeze(k.prototype), Object.freeze(k), k;
}
function Pi(e) {
	return Uint8Array.of(e ? 2 : 3);
}
function Fi(e, t) {
	return {
		secretKey: t.BYTES,
		publicKey: 1 + e.BYTES,
		publicKeyUncompressed: 1 + 2 * e.BYTES,
		publicKeyHasPrefix: !0,
		signature: 2 * t.BYTES
	};
}
// node_modules/@noble/curves/secp256k1.js
var Ii = {
	p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
	n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
	h: BigInt(1),
	a: BigInt(0),
	b: BigInt(7),
	Gx: BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),
	Gy: BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")
}, Li = {
	beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
	basises: [[BigInt("0x3086d221a7d46bcde86c90e49284eb15"), -BigInt("0xe4437ed6010e88286f547fa90abfe4c3")], [BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), BigInt("0x3086d221a7d46bcde86c90e49284eb15")]]
}, Ri = /* @__PURE__ */ BigInt(0), zi = /* @__PURE__ */ BigInt(2);
function Bi(e) {
	let t = Ii.p, n = BigInt(3), r = BigInt(6), i = BigInt(11), a = BigInt(22), o = BigInt(23), s = BigInt(44), c = BigInt(88), l = e * e * e % t, u = l * l * e % t, d = Fr(Fr(Fr(u, n, t) * u % t, n, t) * u % t, zi, t) * l % t, f = Fr(d, i, t) * d % t, p = Fr(f, a, t) * f % t, m = Fr(p, s, t) * p % t, h = Fr(Fr(Fr(Fr(Fr(Fr(m, c, t) * m % t, s, t) * p % t, n, t) * u % t, o, t) * f % t, r, t) * l % t, zi, t);
	if (!Vi.eql(Vi.sqr(h), e)) throw Error("Cannot find square root");
	return h;
}
var Vi = /* @__PURE__ */ Zr(Ii.p, { sqrt: Bi }), Hi = /* @__PURE__ */ Ni(Ii, {
	Fp: Vi,
	endo: Li
}), Ui = Object.create(null);
function Wi(e, ...t) {
	let n = Ui[e];
	if (n === void 0) {
		let t = Kn(hr(e));
		n = $n(t, t), Ui[e] = n;
	}
	return Kn($n(n, ...t));
}
var Gi = (e) => e.toBytes(!0).slice(1), Ki = ({ x: e }) => Vi.toBytes(e), qi = (e) => !Vi.isOdd(e);
function Ji(e) {
	let { Fn: t, BASE: n } = Hi, r = t.fromBytes(Jn(e, 32, "secretKey")), i = n.multiply(r).toAffine();
	return {
		scalar: qi(i.y) ? r : t.neg(r),
		bytes: Ki(i)
	};
}
function Yi(e) {
	let t = Vi;
	if (!t.isValidNot0(e)) throw Error("invalid x: Fail if x ≥ p");
	let n = t.sqr(e), r = t.add(t.mulN(n, e), BigInt(7)), i = t.sqrt(r);
	qi(i) || (i = t.neg(i));
	let a = Hi.fromAffine({
		x: e,
		y: i
	});
	return a.assertValidity(), a;
}
var Xi = ur;
function Zi(...e) {
	return Hi.Fn.create(Xi(Wi("BIP0340/challenge", ...e)));
}
function Qi(e) {
	return Ji(e).bytes;
}
function $i(e, t, n = In(32)) {
	let { Fn: r, BASE: i } = Hi, a = mr(Jn(e, void 0, "message")), { bytes: o, scalar: s } = Ji(t), c = Jn(n, 32, "auxRand"), l = Wi("BIP0340/nonce", r.toBytes(s ^ Xi(Wi("BIP0340/aux", c))), o, a), u = r.create(Xi(l));
	if (u === Ri) throw Error("sign failed: k is zero");
	let d = i.multiply(u).toAffine(), f = qi(d.y) ? u : r.neg(u), p = Ki(d), m = Zi(p, o, a), h = /* @__PURE__ */ new Uint8Array(64);
	if (h.set(p, 0), h.set(r.toBytes(r.create(f + m * s)), 32), !ea(h, a, o)) throw Error("sign: Invalid signature produced");
	return h;
}
function ea(e, t, n) {
	let { Fp: r, Fn: i, BASE: a } = Hi, o = Jn(e, 64, "signature"), s = Jn(t, void 0, "message"), c = Jn(n, 32, "publicKey");
	try {
		let e = Yi(Xi(c)), t = o.subarray(0, 32), n = Xi(t);
		if (!r.isValidNot0(n)) return !1;
		let l = Xi(o.subarray(32, 64));
		if (!i.isValidNot0(l)) return !1;
		let u = Zi(t, Gi(e), s), d = a.mulAddUnsafe(l, e, i.neg(u)), { x: f, y: p } = d.toAffine();
		return !(d.is0() || !qi(p) || !r.eql(f, n));
	} catch {
		return !1;
	}
}
var ta = /* @__PURE__ */ (() => {
	let e = (e) => (e = e === void 0 ? In(48) : e, ei(Jn(e, 48, "seed"), Ii.n));
	return Object.freeze({
		keygen: Ti(e, Qi),
		getPublicKey: Qi,
		sign: $i,
		verify: ea,
		Point: Hi,
		utils: Object.freeze({
			randomSecretKey: e,
			taggedHash: Wi,
			lift_x: Yi,
			pointToBytes: Gi
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
var na = new TextEncoder(), ra = "https://w3id.org/security#";
function ia() {
	return {
		id: "",
		created: "",
		dateDeleted: "",
		content: "",
		maker: "",
		sig: ""
	};
}
function aa(e) {
	return JSON.stringify(e);
}
function oa(e) {
	return An(Kn(na.encode(aa(e))));
}
function sa(e, t, n) {
	return ta.verify(Mn(e), Mn(oa(t)), Mn(n));
}
function ca(e, t) {
	return An(ta.sign(Mn(oa(e)), Mn(t)));
}
// src/utils/keyHelpers/otherHelpers.ts
var la = (e) => {
	let t = A.any(e, E.space("preferencesFile"), null, e.doc())?.value;
	if (t = t?.split("/").slice(0, -2).join("/"), !t) throw Error(`prefererencesFile is expected to exist in ${e}`);
	return t;
}, ua = (e) => {
	let t;
	try {
		t = `${la(e)}/profile/keys/publicKey.ttl`;
	} catch (e) {
		he(e);
	}
	return t;
}, da = (e) => {
	let t;
	try {
		t = `${la(e)}/settings/keys/privateKey.ttl`;
	} catch (e) {
		he(e);
	}
	return t;
};
async function fa(e, t) {
	return await ma(e, t, "publicKey");
}
async function pa(e, t) {
	return await ma(e, t, "privateKey");
}
async function ma(e, t, n) {
	try {
		return await A.fetcher.load(t), A.any(e, E.solid(n))?.value;
	} catch (e) {
		if (e.response.status === 404) {
			N("createIfNotExists: doc does NOT exist, will create... " + t);
			try {
				await A.fetcher.webOperation("PUT", t, {
					data: "",
					contentType: "text/turtle"
				});
			} catch (e) {
				throw N("createIfNotExists doc FAILED: " + t + ": " + e), e;
			}
			delete A.fetcher.requested[t];
			return;
		}
		throw N("createIfNotExists doc FAILED: " + t + ": " + e), e;
	}
}
// src/utils/keyHelpers/acl.ts
async function ha(e, t) {
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
		N("delete " + n.value + " " + e.response.status);
	}
}
var ga = (e) => `
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
`, _a = (e, t) => {
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
// src/chat/keys.ts
function va() {
	return An(ta.utils.randomSecretKey());
}
function ya(e) {
	return An(ta.getPublicKey(Mn(e)));
}
async function ba(e) {
	await A.fetcher.load(e);
	let t = await ua(e);
	try {
		return await A.fetcher.load(t), A.any(e, E.solid("publicKey"))?.value;
	} catch {
		return;
	}
}
async function xa(e) {
	await A.fetcher.load(e);
	let n = await ua(e), i = await da(e), a = await fa(e, n), o = await pa(e, i), s = !0;
	if (o && a !== ya(o) && confirm("This is strange the publicKey is not valid for\n" + e?.uri + "'shall we repair keeping the private key ?") && (s = !1), !o || !a || !s) {
		let c = [], l = [];
		if (o || (o = va(), l = [r(e, E.solid("privateKey"), te(o), A.sym(i))], await Ca(i, [], l, e.uri)), !a || !s) {
			c = [], a && (c = [r(e, E.solid("publicKey"), t(a), A.sym(n))], N("delete invalid publicKey " + c));
			let i = ya(o);
			l = [r(e, E.solid("publicKey"), te(i), A.sym(n))], await Ca(n, c, l);
		}
		await ha(i.substring(0, i.lastIndexOf("/") + 1), ga(e.uri));
	}
	return o;
}
var Sa = async (e) => {
	await A.fetcher.load(e);
	let t = A.any(A.sym(e), A.sym("http://www.iana.org/assignments/link-relations/acl"));
	if (t) try {
		let e = await A.fetcher.webOperation("DELETE", t.value);
		N("delete keyAcl" + t.value + " " + e.status);
	} catch (e) {
		if (e.response.status !== 404) throw Error(e);
		N("delete keyAcl" + t.value + " " + e.response.status);
	}
};
async function Ca(e, t, n, r = "") {
	await Sa(e), await A.updater.updateMany(t, n), await ha(e, _a(e, r));
}
// src/chat/chatLogic.js
var wa = class {
	constructor(e, t) {
		this.channel = e, this.channelRoot = e.doc(), this.options = t, this.dateFolder = new pn(this.channelRoot, "chat.ttl"), this.div = null;
	}
	async createMessage(e) {
		return this.updateMessage(e);
	}
	async updateMessage(e, i = null, a, o = null) {
		let s = [], c = /* @__PURE__ */ new Date(), l = "" + c.getTime(), u = n(c), f = i ? i.doc() : this.dateFolder.leafDocumentFromDate(c), p = A.sym(f.uri + "#Msg" + l), m = O.currentUser(), h = ia();
		if (h.id = p.uri, i) {
			let e = A.any(i, E.foaf("maker"));
			if (e.uri === m.uri) {
				let e = await Da(i);
				s.push(r(e, E.dct("isReplacedBy"), p, f));
				let t = A.any(e, E.sioc("has_reply"));
				t && s.push(r(p, E.sioc("has_reply"), t, f)), a && s.push(r(p, E.schema("dateDeleted"), u, f));
			} else {
				let t = "Error you cannot delete/edit a message from someone else : \n" + e.uri;
				throw pe(t), alert(t), Error(t);
			}
		} else s.push(r(this.channel, E.wf("message"), p, f));
		if (s.push(r(p, E.sioc("content"), A.literal(e), f)), h.content = e, s.push(r(p, E.dct("created"), u, f)), h.created = u.value, m) {
			s.push(r(p, E.foaf("maker"), m, f)), h.maker = m.uri;
			let e = ca(h, await xa(m));
			s.push(r(p, d(`${ra}proofValue`), t(e), f));
		}
		o && (s.push(r(o, E.sioc("has_member"), p, f)), o.doc().sameTerm(p.doc()) || s.push(r(o, E.sioc("has_member"), p, o.doc())));
		try {
			await A.updater.updateMany([], s);
		} catch (e) {
			let t = "Error saving chat message: " + e;
			throw pe(t), alert(t), Error(t);
		}
		return p;
	}
	async deleteMessage(e) {
		return this.updateMessage("(message deleted)", e, !0);
	}
	async createThread(e) {
		let t = A.each(e, E.sioc("has_reply"), null, e.doc()).filter((e) => A.holds(e, E.rdf("type"), E.sioc("Thread"), e.doc()));
		if (t.length > 0) return t[0];
		let n = d(e.uri + "-thread"), i = [r(n, E.rdf("type"), E.sioc("Thread"), n.doc()), r(e, E.sioc("has_reply"), n, n.doc())];
		return await A.updater.update([], i), n;
	}
};
async function Ta(e) {
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
async function Ea(e) {
	let t = e, n = {};
	for (; t;) {
		if (n[t.uri]) return he("originalVersion: verion loop" + e), e;
		n[t.uri] = !0, e = t, await A.fetcher.load(e), t = A.any(null, E.dct("isReplacedBy"), e, e.doc());
	}
	return e;
}
async function Da(e) {
	let t = e, n = {};
	for (; t;) {
		if (n[t.uri]) return he("mostRecentVersion: verion loop" + e), e;
		n[t.uri] = !0, e = t, await A.fetcher.load(e), t = A.any(e, E.dct("isReplacedBy"), null, e.doc());
	}
	return e;
}
function Oa(e) {
	return A.holds(e, E.schema("dateDeleted"), null, e.doc());
}
// src/lib/participation.ts
var ka = /* @__PURE__ */ p({
	manageParticipation: () => Pa,
	participationObject: () => Ma,
	recordParticipation: () => Na,
	renderParticipants: () => ja
}), Aa = T.store;
function ja(e, t, n, r, i, a) {
	t.setAttribute("style", j.participantsStyle);
	let o = function(n) {
		let r = Aa.any(n, E.wf("participant")), i;
		if (!r) return i = e.createElement("tr"), i.textContent = "???", i;
		let o = Aa.anyValue(n, E.ui("backgroundColor")) || ce.participationDefaultBackground, s = e.createElement("div");
		s.setAttribute("style", j.participantsBlock), s.style.backgroundColor = o, i = be(e, null, r, a), t.appendChild(i);
		let c = e.createElement("td");
		return c.setAttribute("style", j.personTableTD), c.appendChild(s), i.insertBefore(c, i.firstChild), i;
	}, s = function() {
		let e = Aa.each(r, E.wf("participation")).map(function(e) {
			return N("in participants"), [Aa.anyValue(e, E.cal("dtstart")) || "9999-12-31", e];
		});
		e.sort();
		let n = e.map(function(e) {
			return e[1];
		});
		ue(t, n, o);
	};
	return t.refresh = s, s(), t;
}
function Ma(e, t, n) {
	return new Promise(function(i, a) {
		if (!n) throw Error("No user id");
		let o = Aa.each(e, E.wf("participation")).filter(function(e) {
			return Aa.holds(e, E.wf("participant"), n);
		});
		if (o.length > 1) {
			let e = [];
			for (let t of o) {
				let n = Aa.anyValue(t, E.cal("dtstart"));
				n && e.push([n, t]);
			}
			e.sort(), pe("Multiple participation objects, picking earliest, in " + t), i(e[0][1]);
		}
		if (o.length) i(o[0]);
		else {
			let o = Se(t), s = [
				r(e, E.wf("participation"), o, t),
				r(o, E.wf("participant"), n, t),
				r(o, E.cal("dtstart"), /* @__PURE__ */ new Date(), t),
				r(o, E.ui("backgroundColor"), Ra(n), t)
			];
			Aa.updater.update([], s, function(e, t, n) {
				t ? i(o) : a(/* @__PURE__ */ Error("Error recording your participation: " + n));
			}), i(o);
		}
	});
}
function Na(e, t, n) {
	let i = O.currentUser();
	if (!i) return;
	let a = Aa.each(e, E.wf("participation")).filter(function(e) {
		return Aa.holds(e, E.wf("participant"), i);
	});
	if (a.length > 1) throw Error("Multiple records of your participation");
	if (a.length) return a[0];
	{
		if (!Aa.updater.editable(t)) return N("Not recording participation, as no write access as " + i + " to " + t), null;
		let a = Se(t), o = [
			r(e, E.wf("participation"), a, t),
			r(a, E.wf("participant"), i, t),
			r(a, E.cal("dtstart"), /* @__PURE__ */ new Date(), t),
			r(a, E.ui("backgroundColor"), Ra(i), t)
		];
		return Aa.updater.update([], o, function(e, t, r) {
			if (!t) throw Error("Error recording your participation: " + r);
			n && n.refresh && n.refresh();
		}), a;
	}
}
function Pa(e, t, n, r, i, a) {
	let o = e.createElement("table");
	t.appendChild(o), ja(e, o, n, r, i, a);
	try {
		Na(r, n, o);
	} catch (n) {
		t.appendChild(Pe(e, "Error recording your participation: " + n));
	}
	return o;
}
// src/lib/pad.ts
var Fa = /* @__PURE__ */ p({
	getChunks: () => Ba,
	lightColorHash: () => Ra,
	manageParticipation: () => Pa,
	notepad: () => za,
	notepadToHTML: () => Ha,
	participationObject: () => Ma,
	recordParticipation: () => Na,
	renderParticipants: () => ja,
	xmlEncode: () => Va
}), Ia = T.store, La = a("http://www.w3.org/ns/pim/pad#");
function Ra(e) {
	return e && e.uri ? "#" + (function(e) {
		return e.split("").reduce(function(e, t) {
			return e = (e << 5) - e + t.charCodeAt(0), e & e;
		}, 0);
	}(e.uri) & 0xffffff | 0xc0c0c0).toString(16) : "#ffffff";
}
function za(e, t, n, i, o) {
	o ||= {};
	let s = o.exists, c = e.createElement("table"), l = Ia;
	if (i && !i.uri) throw Error("UI.pad.notepad:  Invalid userid");
	let u = Ia.updater, d = a("http://www.w3.org/ns/pim/pad#");
	c.setAttribute("style", j.notepadStyle);
	let p = null, m = null;
	if (o.statusArea) {
		let t = o.statusArea.appendChild(e.createElement("table")).appendChild(e.createElement("tr"));
		p = t.appendChild(e.createElement("td")), m = t.appendChild(e.createElement("td")), p && p.setAttribute("style", j.upstreamStatus), m && m.setAttribute("style", j.downstreamStatus);
	}
	let h = function(t, n = !1) {
		N(t), o.statusArea && (n ? p : m).appendChild(Pe(e, t, "pink"));
	}, g = function(e) {
		o.statusArea && (o.statusArea.innerHTML = "");
	}, _ = function(e, t, n) {
		let r = e.subject;
		t ||= "";
		let i = j.baseStyle, a = j.headingCore, o = j.headingStyle, s = l.any(r, E.dc("author"));
		if (!t && s) {
			let e = Ra(s);
			t = "color: " + (n ? "#888" : "black") + "; background-color: " + e + ";";
		}
		let c = l.any(r, d("indent"));
		c = c ? c.value : 0;
		let u = c >= 0 ? i + "text-indent: " + c * 3 + "em;" : a + o[-1 - c];
		e.setAttribute("style", u + t);
	}, v = function(e) {
		let i = e.subject;
		if (!i) throw Error("No chunk for line to be deleted!");
		let a = l.any(void 0, d("next"), i), o = l.any(i, d("next"));
		if (a.sameTerm(n) && o.sameTerm(n)) {
			N("You can't delete the only line.");
			return;
		}
		let s = l.statementsMatching(i, void 0, void 0, t).concat(l.statementsMatching(void 0, void 0, i, t)), c = [r(a, d("next"), o, t)];
		if (i instanceof f) {
			let e = i.uri.slice(-4);
			N("Deleting line " + e);
		}
		if (!u) throw Error("have no updater");
		u.update(s, c, function(t, n, r, a) {
			if (n) {
				let t = e.parentNode;
				if (t) {
					let e = t.previousSibling;
					t.parentNode && t.parentNode.removeChild(t), e && e.firstChild && e.firstChild.focus();
				}
			} else if (a && a.status === 409) _(e, "color: black;  background-color: #ffd;"), e.state = 0, le(.5, 512), setTimeout(function() {
				D();
			}, 1e3);
			else {
				N("    removePart FAILED " + i + ": " + r), N("    removePart was deleting :'" + s), _(e, "color: black;  background-color: #fdd;");
				let t = a ? a.status : " [no response field] ";
				h("Error " + t + " saving changes: " + String(r));
			}
		});
	}, y = function(e, n, i) {
		let a = l.statementsMatching(n, d("indent")), o = a.length ? Number(a[0].object.value) : 0;
		if (o + i < -3) return;
		let s = o + i, c = r(n, d("indent"), s, t);
		if (!u) throw Error("no updater");
		u.update(a, c, function(n, r, i) {
			r ? _(e) : (N("Indent change FAILED '" + s + "' for " + t + ": " + i), _(e, "color: black;  background-color: #fdd;"), u.requestDownstreamAction(t, D));
		});
	}, b = function(e, n) {
		let i = null;
		e.addEventListener("keydown", function(r) {
			if (!u) throw Error("no updater");
			let i, a;
			switch (r.keyCode) {
				case 13: {
					let t = r.shiftKey;
					if (N("enter"), t ? (a = l.any(void 0, d("next"), n), i = "newlinesAfter") : (a = l.any(n, d("next")), i = "newlinesBefore"), a[i] = a[i] || 0, a[i] += 1, a[i] > 1) {
						N("    queueing newline queue = " + a[i]);
						return;
					}
					N("    go ahead line before " + a[i]), S(e, t);
					break;
				}
				case 8:
					if (e.value.length === 0) switch (N("Delete key line " + n.uri.slice(-4) + " state " + e.state), e.state) {
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
					N("escape"), u.requestDownstreamAction(t, D), r.preventDefault();
					break;
				case 38:
					e.parentNode.previousSibling && (e.parentNode.previousSibling.firstChild.focus(), r.preventDefault());
					break;
				case 40: e.parentNode.nextSibling && (e.parentNode.nextSibling.firstChild.focus(), r.preventDefault());
			}
		});
		let a = function(e) {
			let n = e.subject;
			_(e, void 0, !0);
			let i = l.any(n, E.sioc("content")).value, o = [r(n, E.sioc("content"), i, t)], s;
			e.value && (s = [r(n, E.sioc("content"), e.value, t)]);
			let c = e.value;
			if (e.lastSent && i !== e.lastSent && console.warn("Out of order, last sent expected '" + i + "' but found '" + e.lastSent + "'"), e.lastSent = c, !u) throw Error("no updater");
			u.update(o, s, function(n, r, o, s) {
				if (r) g(!0), _(e), N("    Patch ok '" + i + "' -> '" + c + "' "), e.state === 4 ? (e.state = 3, v(e)) : e.state === 3 || (e.state === 2 ? (e.state = 1, a(e)) : e.state = 0);
				else if (N("    patch FAILED " + s.status + " for '" + i + "' -> '" + c + "': " + o), s.status === 409) _(e, "color: black;  background-color: #fdd;"), e.state = 0, le(.5, 512), setTimeout(function() {
					u.requestDownstreamAction(t, D);
				}, 1e3);
				else {
					_(e, "color: black;  background-color: #fdd;");
					let t = s?.status;
					!t || t === 502 || t === 503 ? (e.lastSent = void 0, e.state = 0, setTimeout(() => {
						(e.state === 0 || e.state === void 0) && (e.state = 1, a(e));
					}, 2e3)) : (e.state = 0, h("    Error " + t + " sending data: " + o, !0), le(1, 128));
				}
			});
		};
		e.addEventListener("input", function(t) {
			switch (_(e, void 0, !0), N("Input event state " + e.state + " value '" + e.value + "'"), e.state) {
				case 3:
				case 4:
				case 2: return;
				case 1:
					e.state = 2;
					return;
				case 0:
				case void 0: i !== null && clearTimeout(i), i = setTimeout(() => {
					i = null, (e.state === 0 || e.state === void 0) && (e.state = 1, a(e));
				}, 400);
			}
		});
	}, x = function(t, n, r) {
		let a = l.any(n, E.sioc("content"));
		a = a ? a.value : "";
		let o = e.createElement("tr");
		r ? c.insertBefore(o, t) : t && t.nextSibling ? c.insertBefore(o, t.nextSibling) : c.appendChild(o);
		let s = o.appendChild(e.createElement("input"));
		return s.subject = n, s.setAttribute("type", "text"), s.value = a, i ? (_(s, ""), b(s, n)) : (_(s, "color: #222; background-color: #fff"), N("Note can't add listeners - not logged in")), s;
	}, S = function(e, a) {
		let o = Ia, s = 0, c = null, l, f, p, m, h;
		e ? (e.tagName.toLowerCase() !== "input" && N("return pressed when current document is: " + e.tagName), l = e.subject, s = o.any(l, d("indent")), s = s ? Number(s.value) : 0, a ? (f = o.any(void 0, d("next"), l), p = l, m = f, c = "newlinesAfter") : (f = l, p = o.any(l, d("next")), m = p, c = "newlinesBefore"), h = e.parentNode) : (f = n, p = n, h = void 0);
		let g = Se(t), v = g.uri.slice(-4), y = [r(f, d("next"), p, t)], b = [
			r(f, d("next"), g, t),
			r(g, d("next"), p, t),
			r(g, E.dc("author"), i, t),
			r(g, E.sioc("content"), "", t)
		];
		if (s > 0 && b.push(r(g, d("indent"), s, t)), N("    Fresh chunk " + v + " proposed"), !u) throw Error("no updater");
		u.update(y, b, function(e, t, n, r) {
			if (!t) N("    ERROR writing new line " + v + ": " + n);
			else {
				let e = x(h, g, a);
				_(e), e.focus(), c && (N("    Fresh chunk " + v + " updated, queue = " + m[c]), --m[c], m[c] > 0 && (N("    Implementing queued newlines = " + p.newLinesBefore), S(e, a)));
			}
		});
	}, C = function() {
		let e = {}, t = 0;
		function r(e) {
			h(e), t++;
		}
		if (!l.the(n, d("next"))) return r("No initial next pointer"), !1;
		let i = n, a;
		for (; a = l.the(i, d("next")), a || r("No next pointer from " + i), !a.sameTerm(n);) {
			i = a;
			let t = a.uri.split("#")[1];
			if (e[a.uri]) return r("Loop!"), !1;
			e[a.uri] = !0;
			let n = l.each(a, d("next")).length;
			n !== 1 && r("Should be 1 not " + n + " next pointer for " + t), n = l.each(a, d("indent")).length, n > 1 && r("Should be 0 or 1 not " + n + " indent for " + t), n = l.each(a, E.sioc("content")).length, n !== 1 && r("Should be 1 not " + n + " contents for " + t), n = l.each(a, E.dc("author")).length, n !== 1 && r("Should be 1 not " + n + " author for " + t), l.statementsMatching(void 0, E.sioc("contents")).forEach(function(t) {
				e[t.subject.value] || r("Loose chunk! " + t.subject.value);
			});
		}
		return !t;
	}, w = function() {
		if (l.each(n, d("next")).length !== 1) {
			let e = "Pad: Inconsistent data - NEXT pointers: " + l.each(n, d("next")).length;
			N(e), o.statusArea && (o.statusArea.textContent += e);
			return;
		}
		let e, t = [];
		for (let e = l.the(n, d("next")); !e.sameTerm(n); e = l.the(e, d("next"))) for (let n = 0; n < c.children.length; n++) {
			let r = c.children[n];
			r.firstChild && r.firstChild.subject.sameTerm(e) && (t[e.uri] = r.firstChild);
		}
		for (let n = c.children.length - 1; n >= 0; n--) e = c.children[n], t[e.firstChild.subject.uri] || c.removeChild(e);
		e = c.firstChild;
		for (let r = l.the(n, d("next")); !r.sameTerm(n); r = l.the(r, d("next"))) {
			let n = l.any(r, E.sioc("content")).value;
			if (e && t[r.uri]) {
				let t = e.firstChild;
				n !== t.value && (t.value = n), _(t), t.state = 0, delete t.lastSent, e = e.nextSibling;
			} else x(e, r, !0);
		}
	}, T = function(e) {
		if (e.refresh) e.refresh();
		else for (let t = 0; t < e.children.length; t++) T(e.children[t]);
	}, ee = !1, te = function() {
		N("    reloaded OK"), g(), C() ? T(c) : h("CONSISTENCY CHECK FAILED");
	}, D = function() {
		if (ee) {
			N("   Already reloading - stop");
			return;
		}
		ee = !0;
		let e = 1e3, n = function() {
			if (N("try reload - timeout = " + e), !u) throw Error("no updater");
			u.reload(u.store, t, function(r, i, a) {
				ee = !1, r ? te() : a.status === 0 ? (h("Network error refreshing the pad. Retrying in " + e / 1e3), ee = !0, e *= 2, setTimeout(n, e)) : h("Error " + a.status + "refreshing the pad:" + i + ". Stopped. " + t);
			});
		};
		n();
	};
	if (c.refresh = w, c.reloadAndSync = D, i || N("Warning: must be logged in for pad to be edited"), s) N("Existing pad."), C() ? (w(), l.holds(n, d("next"), n) && S()) : N(c.textContent = "Inconsistent data. Abort");
	else {
		N("No pad exists - making new one.");
		let e = [
			r(n, E.rdf("type"), d("Notepad"), t),
			r(n, E.dc("author"), i, t),
			r(n, E.dc("created"), /* @__PURE__ */ new Date(), t),
			r(n, d("next"), n, t)
		];
		if (!u) throw Error("no updater");
		u.update([], e, function(e, t, n) {
			t ? (N("Initial pad created"), S()) : h(n || "");
		});
	}
	return c;
}
function Ba(e, t) {
	let n = [];
	for (let r = t.the(e, La("next")); !r.sameTerm(e); r = t.the(r, La("next"))) n.push(r);
	return n;
}
function Va(e) {
	return e.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
}
function Ha(e, t) {
	let n = Ba(e, t), r = "<html>\n  <head>\n", i = t.anyValue(e, E.dct("title"));
	i && (r += `    <title>${Va(i)}</title>\n`), r += "  </head>\n  <body>\n";
	let a = 0;
	function o(e) {
		for (; a < e; a++) r += "<ul>\n";
	}
	function s(e) {
		for (; a > e; a--) r += "</ul>\n";
	}
	return n.forEach((e) => {
		let n = t.anyJS(e, La("indent")), i = t.anyJS(e, E.sioc("content"));
		if (!i) return;
		let a = Va(i);
		if (n < 0) {
			s(0);
			let e = n >= -3 ? 4 + n : 1;
			r += `\n<h${e}>${a}</h${e}>\n`;
		} else n > 0 ? (s(n), o(n), r += `<li>${a}</li>\n`) : (s(n), r += `<p>${a}</p>\n`);
	}), s(0), r += "  </body>\n</html>\n", r;
}
// src/chat/bookmarks.js
var Ua = {
	icons: P,
	ns: E,
	media: ln,
	pad: Fa,
	style: j,
	utils: oe,
	widgets: Ae
}, Wa = a("http://www.w3.org/2002/01/bookmark#"), Ga = "noun_45961.svg", Ka = M, qa = window.document || null;
function Ja(e, t) {
	return new Promise(function(n, r) {
		A.updater.update(e, t, function(e, t, i) {
			t ? n() : r(Error(i));
		});
	});
}
async function Ya(e) {
	let t = Wa("Bookmark");
	if (await ht(e, t, !0), e.instances && e.instances.length > 0) e.bookmarkDocument = e.instances[0], e.instances.length > 1 && pe("More than one bookmark file! " + e.instances);
	else if (e.publicProfile) {
		let n = d(e.publicProfile.dir().uri + "bookmarks.ttl");
		try {
			N("Creating new bookmark file " + n), await A.fetcher.createIfNotExists(n);
		} catch (t) {
			return pe("Can't make fresh bookmark file:" + t), e;
		}
		await x.registerInTypeIndex(n, e.index, t), e.bookmarkDocument = n;
	} else pe("You seem to have no bookmark file, nor even a profile file!");
	return e;
}
async function Xa(e, t) {
	let n = "", i = O.currentUser();
	if (!i) throw Error("Must be logged on to add Bookmark");
	n = Ka(A.any(t, E.foaf("maker"))) + ": " + A.anyValue(t, E.sioc("content")).slice(0, 80);
	let a = e.bookmarkDocument, o = Ua.widgets.newThing(a, n), s = [
		r(a, Ua.ns.dct("references"), o, a),
		r(o, Ua.ns.rdf("type"), Wa("Bookmark"), a),
		r(o, Ua.ns.dct("created"), /* @__PURE__ */ new Date(), a),
		r(o, Wa("recalls"), t, a),
		r(o, Ua.ns.foaf("maker"), i, a),
		r(o, Ua.ns.dct("title"), n, a)
	];
	try {
		await Ja([], s);
	} catch (e) {
		let t = "Making bookmark: " + e;
		return pe(t), null;
	}
	return o;
}
async function Za(e, t, n) {
	await A.fetcher.load(e.bookmarkDocument);
	let r = A.each(null, Wa("recalls"), t, e.bookmarkDocument);
	if (r.length) {
		if (!confirm("Delete bookmark on this?" + r.length)) return;
		for (let e = 0; e < r.length; e++) try {
			await Ja(A.connectedStatements(r[e]), []), n.style.backgroundColor = "white", N("Bookmark deleted: " + r[e]);
		} catch (e) {
			he("Cant delete bookmark:" + e), pe("Cannot delete bookmark:" + e);
		}
	} else {
		let r = await Xa(e, t);
		n.style.backgroundColor = "yellow", N("Bookmark added: " + r);
	}
}
async function Qa(e, t) {
	async function n(t) {
		await A.fetcher.load(e.bookmarkDocument);
		let n = A.any(null, Wa("recalls"), t.target, e.bookmarkDocument);
		t.style = Ua.style.buttonStyle, n && (t.style.backgroundColor = "yellow");
	}
	let r;
	if (e.bookmarkDocument) return r = Ua.widgets.button(qa, Ua.icons.iconBase + Ga, Ka(Wa("Bookmark")), () => {
		Za(e, t, r);
	}), r.target = t, await n(r), r;
}
// src/chat/messageTools.js
var $a = window.document, eo = "noun_253504.svg", to = "noun_1384132.svg", no = "noun_1384135.svg", ro = "noun-reply-5506924.svg", io = {};
io[E.schema("AgreeAction")] = "👍", io[E.schema("DisagreeAction")] = "👎", io[E.schema("EndorseAction")] = "⭐️", io[E.schema("LikeAction")] = "❤️";
async function ao(e, t) {
	let n = $a.createElement("span");
	async function r() {
		if (n.innerHTML = "", Oa(e)) return n;
		let r = (await Ta(e)).map((e) => A.each(null, E.schema("target"), e, t)).flat();
		if (r.length === 0) return n;
		let i = r.map((e) => [
			A.any(e, E.rdf("type"), null, t),
			A.any(e, E.sioc("content"), null, t),
			A.any(e, E.schema("agent"), null, t)
		]);
		i.sort(), i.forEach((e) => {
			let [t, r, i] = e, a;
			i ? (a = $a.createElement("a"), a.setAttribute("href", i.uri)) : a = $a.createTextNode(""), a.textContent = r || io[t] || "⬜️", n.appendChild(a);
		});
	}
	return r().then(N("sentimentStripLinked: sentimentStripLinked async refreshed")), n.refresh = r, n;
}
async function oo(e, t, n, i) {
	async function a() {
		let r = A.any(e, E.foaf("maker"));
		if (!d) alert("You can't delete the message, you are not logged in.");
		else if (d.sameTerm(r)) {
			try {
				await i.deleteMessage(e);
			} catch (e) {
				let r = "Error deleting messaage " + e;
				pe(r), alert(r), (n.statusArea || t.parentNode).appendChild(Pe($a, r));
			}
			t.parentNode.removeChild(t);
		} else alert("You can't delete the message, you are not logged in as the author, " + r);
		l();
	}
	async function o(t) {
		d.value === A.any(e, E.foaf("maker")).value && (l(), await go(t, e, i, n));
	}
	async function s() {
		let t = await i.createThread(e), r = n.chatOptions;
		if (!r) throw Error("replyInThread: missing options");
		r.showThread(t, r), l();
	}
	let c = $a.createElement("div");
	if (await Da(e).value === E.schema("dateDeleted").value) return c;
	function l() {
		c.parentElement.parentElement.removeChild(c.parentElement);
	}
	async function u(e) {
		await A.updater.update(A.connectedStatements(e), []);
	}
	let d = O.currentUser();
	d && A.holds(e, E.foaf("maker"), d) && (c.appendChild(ye($a, c, "message", a)), c.appendChild(ke($a, P.iconBase + eo, "edit", () => o(t)))), Qa(n).then((e) => {
		e && c.appendChild(e);
	});
	function f(e, n, i, a, o, s) {
		function c() {
			l.style.backgroundColor = p ? "yellow" : "white";
		}
		let l = ke($a, i, M(a), async function(i) {
			if (p) await u(p), p = null, c();
			else {
				p = Se(o);
				let i = [
					r(p, E.schema("agent"), e.me, o),
					r(p, E.rdf("type"), a, o),
					r(p, E.schema("target"), n, o)
				];
				if (await A.updater.update([], i), c(), s) {
					let e = !1;
					for (let t = 0; t < s.length; t++) {
						let n = d(s[t]);
						n && (await u(n), e = !0);
					}
					e && ge(t);
				}
			}
		});
		function d(t) {
			let r = A.each(null, E.schema("agent"), e.me, o).filter((e) => A.holds(e, E.rdf("type"), t, o)).filter((e) => A.holds(e, E.schema("target"), n, o));
			return r.length ? r[0] : null;
		}
		function f() {
			p = d(a), c();
		}
		let p;
		return l.refresh = f, f(), l;
	}
	if (d = O.currentUser(), d && await Da(e).value !== E.schema("dateDeleted").value) {
		let t = {
			me: d,
			dom: $a,
			div: c
		};
		c.appendChild(f(t, e, P.iconBase + to, E.schema("AgreeAction"), e.doc(), [E.schema("DisagreeAction")])), c.appendChild(f(t, e, P.iconBase + no, E.schema("DisagreeAction"), e.doc(), [E.schema("AgreeAction")]));
	}
	A.any(e, E.dct("created")) && c.appendChild(ke($a, P.iconBase + ro, "Reply in thread", async () => {
		await s();
	}));
	let p = c.appendChild(_e($a));
	return p.style.float = "right", p.firstChild.style.opacity = "0.3", p.addEventListener("click", l), c;
}
// src/chat/message.js
var L = window.document, so = j.messageBodyStyle, co = M;
function lo(e, t) {
	let n = L.createElement("img"), r = "10";
	t.inlineImageHeightEms && (r = ("" + t.inlineImageHeightEms).trim()), n.setAttribute("style", "max-height: " + r + "em; border-radius: 1em; margin: 0.7em;"), e && n.setAttribute("src", e);
	let i = L.createElement("a");
	return i.setAttribute("href", e), i.setAttribute("target", "images"), i.appendChild(n), me(n, $rdf.sym(e)), i;
}
var uo = function(e, t) {
	let n = L.createElement("a");
	return t && t.uri && (n.setAttribute("href", t.uri), n.addEventListener("click", xe, !0), n.setAttribute("style", "color: #3B5998; text-decoration: none; ")), n.textContent = e, n;
};
function fo(e) {
	let t = A.any(e, E.foaf("nick"));
	return t ? "" + t.value : "" + co(e);
}
function po(e, t, n, r) {
	let i = e.appendChild(uo(fo(t), t));
	t.uri && A.fetcher.nowOrWhenFetched(t.doc(), void 0, function(e, n) {
		i.textContent = fo(t);
	}), e.appendChild(L.createElement("br")), e.appendChild(uo(n, r));
}
function mo(e, t, n, r) {
	let i = e.appendChild(uo(co(t), t));
	t.uri && A.fetcher.nowOrWhenFetched(t.doc(), void 0, function(e, n) {
		i.textContent = fo(t);
	});
	let a = e.appendChild(uo(n, r));
	a.style.fontSize = "80%", a.style.marginLeft = "1em", e.appendChild(L.createElement("br"));
}
async function ho(e, t, n, r, i) {
	let a = !1, o = r.colorizeByAuthor === "1" || r.colorizeByAuthor === !0, s = A.any(t, E.foaf("maker")), c = A.any(t, E.dct("created")), l = await Da(t), u = A.any(l, E.foaf("maker")), d = s.uri === u?.uri ? l : t, f = A.any(d, E.sioc("content")), p = await Ta(d);
	p.length > 1 && N("renderMessageRow versions: ", p.join(",  "));
	let m = p.map((e) => A.each(e, E.sioc("has_reply"))).flat(), h = null, g = [];
	for (let e of m) A.holds(e, E.rdf("type"), E.sioc("Thread")) ? (h = e, N("renderMessageRow: found thread: " + h)) : g.push(e);
	g.length > 1 && N("renderMessageRow: found normal replies: ", g), h ||= A.any(null, E.sioc("has_member"), t);
	let _ = A.any(d, $rdf.sym(`${ra}proofValue`)), v = ia();
	v.id = d.uri, v.created = A.any(d, E.dct("created")).value, v.content = f.value, v.maker = s.uri, _?.value ? ba(s).then((e) => {
		e || pe("message is signed but " + s.uri + " is missing publicKey"), e?.match(/[0-9A-Fa-f]{6}/g) ? _?.value && !sa(_?.value, v, e) && pe("invalid signature\n" + v.id) : pe("invalid publicKey hex string\n" + s.uri + "\n" + e);
	}) : (a = !0, pe(d.uri + " is unsigned"));
	let y = await Ea(t), b = !t.sameTerm(y), x = A.the(y, E.dct("created"), null, y.doc()) || A.the(t, E.dct("created"), null, t.doc()), S = L.createElement("tr");
	a && S.setAttribute("style", "background-color: red"), S.AJAR_date = x.value, S.AJAR_subject = t;
	let C = L.createElement("td");
	if (S.appendChild(C), r.authorDateOnLeft) po(C, s, Fe(x.value), t);
	else {
		let e = L.createElement("img");
		e.setAttribute("style", "max-height: 2.5em; max-width: 2.5em; border-radius: 0.5em; margin: auto;"), Me(e, s), C.appendChild(e);
	}
	let w = Fe(x.value);
	b && (w += " ... " + Fe(c.value));
	let T = S.appendChild(L.createElement("td"));
	r.authorDateOnLeft || mo(T, s, w, t);
	let ee = f ? f.value.trim() : "??? no content?", te = /^https?:\/[^ <>]*$/i.test(ee), D = null;
	if (te) {
		if (/\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(ee) && r.expandImagesInline) {
			let e = lo(ee, r);
			T.appendChild(e);
		} else {
			let e = T.appendChild(L.createElement("a"));
			D = e.appendChild(L.createElement("p")), e.href = ee, D.textContent = ee, T.appendChild(e);
		}
	} else D = L.createElement("p"), T.appendChild(D), D.textContent = ee;
	if (D) {
		let e = o ? Ra(s) : ne(n);
		D.setAttribute("style", so + "background-color: " + e + ";");
	}
	function ne(e) {
		return e ? "#e8ffe8" : "white";
	}
	let re = await ao(t, t.doc());
	re.children.length && (T.appendChild(L.createElement("br")), T.appendChild(re));
	let O = L.createElement("td");
	S.appendChild(O);
	let k = ke(L, P.iconBase + "noun_243787.svg", "...");
	return O.appendChild(k), k.addEventListener("click", async function(n) {
		if (S.toolTR) {
			S.parentNode.removeChild(S.toolTR), delete S.toolTR;
			return;
		}
		let a = L.createElement("tr"), o = await oo(t, S, {
			...i,
			chatOptions: r
		}, e);
		o.style = "border: 0.05em solid #888; border-radius: 0 0 0.7em 0.7em;  border-top: 0; height:3.5em; background-color: #fff;", S.nextSibling ? S.parentElement.insertBefore(a, S.nextSibling) : S.parentElement.appendChild(a), S.toolTR = a, a.appendChild(L.createElement("td"));
		let s = a.appendChild(L.createElement("td"));
		a.appendChild(L.createElement("td")), s.appendChild(o);
	}), h && r.showThread && O.appendChild(ke(L, P.iconBase + "noun_1180164.svg", "see thread", (e) => {
		r.showThread(h, r);
	})), S;
}
async function go(e, t, n, r) {
	let i = e.parentNode, a = _o(n, i, r, n.options, await Da(t));
	i.insertBefore(a, e), a.originalRow = e, e.style.visibility = "hidden";
}
function _o(e, t, n, r, i) {
	function a(e) {
		e.originalRow.style.visibility = "visible", e.parentNode.removeChild(e);
	}
	async function o(e) {
		await s(_.value, !0);
	}
	async function s(a, o) {
		async function s(a, s) {
			if (await yo(e, t, a, !1, r, n), i) {
				let e = p.originalRow;
				e.parentNode ? e.parentNode.removeChild(e) : (pe("No parentNode on old message " + e.textContent), e.style.backgroundColor = "#fee", e.style.visibility = "hidden"), p.parentNode.removeChild(p);
			} else o && (_.value = "", _.setAttribute("style", so), _.disabled = !1, _.scrollIntoView(r.newestFirst), _.focus(), _.select());
		}
		o && (_.setAttribute("style", so + "color: #bbb;"), _.disabled = !0);
		let c;
		try {
			c = await e.updateMessage(a, i, null, r.thread);
		} catch (e) {
			(n.statusArea || p).appendChild(Pe(L, "Error writing message: " + e));
			return;
		}
		await s(c, a);
	}
	function c(e) {
		let n = t.chatDocument.dir().uri;
		Ne(A.fetcher, e, n + "Files", n + "Pictures", async function(e, t) {
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
			let e = ke(L, P.iconBase + "noun_243787.svg", "More");
			e.setAttribute("style", j.buttonStyle + "float: right;"), g.appendChild(e);
		}
		r.menuHandler;
		let u = O.currentUser();
		if (po(m, u, "", null), _ = L.createElement("textarea"), h.innerHTML = "", h.appendChild(_), _.rows = 3, i && (_.value = A.anyValue(i, E.sioc("content"), null, i.doc())), _.setAttribute("style", so + "background-color: #eef;"), _.addEventListener("keydown", async function(e) {
			e.code === "Enter" && (!e.shiftKey && !r.shiftEnterSendsMessage || e.shiftKey && r.shiftEnterSendsMessage) && await o(e);
		}, !1), de(_, l, c), g.innerHTML = "", v = ke(L, f, "Send"), v.style.float = "right", v.addEventListener("click", (e) => o(), !1), g.appendChild(v), i) {
			let e = g.appendChild(_e(L));
			e.style.float = "left", e.addEventListener("click", (e) => a(p), !1), g.appendChild(e);
		}
		let d = e.dateFolder.leafDocumentFromDate(/* @__PURE__ */ new Date()), y;
		h.appendChild(ln.cameraButton(L, A, t, n)), Na(e.channel, e.channel.doc());
	}
	let d, f;
	i ? (d = A.anyValue(i, E.dct("created"), null, i.doc()), f = P.iconBase + "noun_1180158.svg") : (f = P.iconBase + "noun_383448.svg", d = "9999-01-01T00:00:00Z");
	let p = L.createElement("tr"), m = L.createElement("td"), h = L.createElement("td"), g = L.createElement("td");
	p.appendChild(m), p.appendChild(h), p.appendChild(g), p.AJAR_date = d;
	let _, v;
	return ft({
		div: h,
		dom: L
	}).then((e) => {
		u(), Object.assign(e, n), Ya(e).then((e) => {});
	}), p;
}
// src/chat/infinite.js
function vo(e) {
	"Notification" in window ? Notification.permission === "granted" ? new Notification(e) : Notification.permission !== "denied" && Notification.requestPermission().then(function(t) {
		t === "granted" && new Notification(e);
	}) : pe("This browser does no t support desktop notification");
}
async function yo(e, t, n, r, i, a) {
	let o = await ho(e, n, r, i, a);
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
async function bo(e, t, n, i) {
	async function a(e, t) {
		let n = {}, r, i;
		for (r = t.firstChild; r; r = r.nextSibling) r.AJAR_subject && (n[r.AJAR_subject.uri] = !0);
		let a = A.each(e, E.wf("message"), null, t.chatDocument), s = {};
		for (let e of a) s[e.uri] = !0, n[e.uri] || await o(e, t);
		for (r = t.firstChild; r;) i = r.nextSibling, r.AJAR_subject && !s[r.AJAR_subject.uri] && t.removeChild(r), r = i;
		for (r = t.firstChild; r; r = r.nextSibling) r.AJAR_subject && ge(r);
	}
	async function o(e, t) {
		if (Oa(e) && !i.showDeletedMessages) return;
		let n = A.any(null, E.sioc("has_member"), e, e.doc()), r = A.any(e, E.sioc("id"), null, e.doc());
		if (r && !n && (n = A.any(null, E.sioc("has_member"), r, e.doc())), i.thread) {
			if (!A.holds(e, E.sioc("has_reply"), i.thread) && !(n && n.sameTerm(i.thread))) return;
		} else if (n) return;
		t.fresh || await yo(h, t, e, t.fresh, i, y);
	}
	async function s(e) {
		let t = e ? S : C, n = t.messageTable.date;
		if (e && S.limit && n <= S.limit) return b || await d(), !0;
		if (n = await g.loadPrevious(n, e), n || e || b || await d(), !n) return !0;
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
			return i.response && i.response.status && i.response.status === 404 ? await l(t, n) : (N("*** Error NON 404 for chat file " + r), a.appendChild(Pe(e, i, "pink")), a);
		}
		return await l(t, n);
	}
	async function l(t, n) {
		let r = e.createElement("table");
		r.style.width = "100%", r.extendBackwards = async function() {
			let e = await s(!0);
			return e ? r.initial = !0 : r.extendedBack = !0, e;
		}, r.extendForwards = async function() {
			return await s(!1);
		}, r.date = t;
		let a = g.leafDocumentFromDate(t);
		if (r.chatDocument = a, r.fresh = !1, r.setAttribute("style", "width: 100%;"), n) {
			r.final = !0, b = r, C.messageTable = r;
			let e = _o(h, r, y, i);
			m ? r.insertBefore(e, r.firstChild) : r.appendChild(e), r.inputRow = e;
		}
		{
			let n = e.createElement("tr"), a = n.appendChild(e.createElement("td"));
			a.style = "text-align: center; vertical-align: middle; color: #888; font-style: italic;", a.textContent = Fe(t.toISOString(), !0);
			let o = n.appendChild(e.createElement("td"));
			i.includeRemoveButton && o.appendChild(_e(e, (e) => {
				_.parentNode.removeChild(_);
			})), r.extendedForwards = !1, m ? r.appendChild(n) : r.insertBefore(n, r.firstChild);
		}
		let c = A.statementsMatching(null, E.wf("message"), null, a);
		!n && c.length;
		for (let e of c) await o(e.object, r);
		return r.fresh = !0, r;
	}
	async function u() {
		let e = g.leafDocumentFromDate(/* @__PURE__ */ new Date());
		if (!e.sameTerm(C.messageTable.chatDocument)) {
			b.inputRow && (b.removeChild(b.inputRow), delete b.inputRow);
			let t = C.messageTable.chatDocument;
			if (await d(), !A.holds(t, E.rdfs("seeAlso"), e, t)) {
				let n = [r(t, E.rdfs("seeAlso"), e, t)];
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
			await u(/* @__PURE__ */ new Date()), await a(n, r), vo(n);
		}, A.updater.addDownstreamChangeListener(t, _.refresh), b = r, C.messageTable = b, r;
	}
	async function f(e, t) {
		if (w) return;
		w = !0;
		let n = !t, r;
		for (; _.scrollTop < 150 && S.messageTable && !S.messageTable.initial && S.messageTable.extendBackwards;) {
			if (_.scrollHeight === 0) {
				setTimeout(f, 2e3), w = !1;
				return;
			}
			let e = _.scrollHeight - _.scrollTop;
			if (r = await S.messageTable.extendBackwards(), n && (_.scrollTop = _.scrollHeight - e), t && t(), r) break;
		}
		for (; i.selectedMessage && _.scrollHeight - _.scrollTop - _.clientHeight < 150 && C.messageTable && !C.messageTable.final && C.messageTable.extendForwards;) {
			let e = _.scrollTop;
			if (r = await C.messageTable.extendForwards(), n && (_.scrollTop = e), t && t(), r) break;
		}
		w = !1;
	}
	async function p() {
		function e() {
			s && s.selectedElement && s.selectedElement.scrollIntoView({ block: "center" });
		}
		function t() {
			i.selectedElement ? i.selectedElement.scrollIntoView({ block: "center" }) : b.inputRow.scrollIntoView && b.inputRow.scrollIntoView(m);
		}
		let n, r, a;
		i.selectedMessage && (r = i.selectedMessage.doc()), x && (a = x.doc());
		let o = r || a;
		if (o) {
			let e = /* @__PURE__ */ new Date();
			n = g.leafDocumentFromDate(e).sameTerm(o);
		}
		let s;
		o && !n ? (s = await c(g.dateFromLeafDocument(o), n), _.appendChild(s), S.messageTable = s, C.messageTable = s, e(), setTimeout(e, 1e3)) : (await d(), S.messageTable = b, C.messageTable = b), await f(null, t), _.addEventListener("scroll", f), i.solo && document.body.addEventListener("scroll", f);
	}
	i ||= {}, i.authorDateOnLeft = !1;
	let m = i.newestFirst === "1" || i.newestFirst === !0, h = new wa(n, i), g = h.dateFolder, _ = e.createElement("div");
	h.div = _;
	let v = _.appendChild(e.createElement("div")), y = {
		dom: e,
		statusArea: v,
		div: v
	}, b, x, S = { messageTable: null }, C = { messageTable: null };
	if (i.thread) {
		let e = i.thread;
		if (x = A.any(null, E.sioc("has_reply"), e, e.doc()), x) {
			let e = A.any(x, E.dct("created"), null, x.doc());
			e && (S.limit = new Date(e.value));
		}
	}
	let w = !1;
	return await p(), _;
}
// src/lib/preferences.js
var xo = /* @__PURE__ */ p({
	get: () => wo,
	getPreferencesForClass: () => Ao,
	recordPersonalDefaults: () => Do,
	recordSharedPreferences: () => Eo,
	renderPreferencesForm: () => Oo,
	set: () => To,
	value: () => Co
}), So = A, Co = [];
function wo(e) {
	return Co[e];
}
function To(e, t) {
	if (typeof t != "string") throw N("Non-string value of preference " + e + ": " + t), Error("Non-string value of preference " + e + ": " + t);
	this.value[e] = t;
}
function Eo(e, t) {
	return new Promise(function(n, i) {
		let a = So.any(e, E.ui("sharedPreferences"));
		if (a) t.sharedPreferences = a, n(t);
		else {
			So.updater.editable(e.doc()) || (N(` Cant make shared preferences, may not change ${e.doc}`), n(t));
			let a = d(e.doc().uri + "#SharedPreferences"), o = [r(e, E.ui("sharedPreferences"), a, e.doc())];
			N("Creating shared preferences " + a), So.updater.update([], o, function(e, r, o) {
				r ? (t.sharedPreferences = a, n(t)) : i(/* @__PURE__ */ Error("Error creating shared prefs: " + o));
			});
		}
	});
}
function Do(e, t) {
	return new Promise(function(n, i) {
		pt(t).then((t) => {
			if (!t.preferencesFile) {
				N("Not doing private class preferences as no access to preferences file. " + t.preferencesFileError);
				return;
			}
			let a = So.each(null, E.solid("forClass"), e, t.preferencesFile), o = [], s, c;
			if (a.length) {
				if (a.forEach((e) => {
					s ||= So.any(e, E.solid("personalDefaults"));
				}), s) {
					t.personalDefaults = s, n(t);
					return;
				}
				s = Se(t.preferencesFile), c = a[0];
			} else c = Se(t.preferencesFile), o = [r(c, E.rdf("type"), E.solid("TypeRegistration"), t.preferencesFile), r(c, E.solid("forClass"), e, t.preferencesFile)];
			s = Se(t.preferencesFile), o.push(r(c, E.solid("personalDefaults"), s, t.preferencesFile)), So.updater.update([], o, function(r, a, o) {
				a ? (t.personalDefaults = s, n(t)) : i(/* @__PURE__ */ Error("Setting preferences for " + e + ": " + o));
			});
		}, (e) => {
			i(e);
		});
	});
}
function Oo(e, t, n, r) {
	let i = r.dom.createElement("div");
	return Ma(e, e.doc(), r.me).then((a) => {
		let o = r.dom;
		function s(e) {
			i.appendChild(o.createElement("h5")).textContent = e;
		}
		s("My view of this " + r.noun), Te(o, i, {}, a, n, e.doc(), (e, t) => {
			e || je(r, t);
		}), s("Everyone's  view of this " + r.noun), Eo(e, r).then((r) => {
			let a = r.sharedPreferences;
			Te(o, i, {}, a, n, e.doc(), (e, t) => {
				e || je(r, t);
			}), s("My default view of any " + r.noun), Do(t, r).then((e) => {
				Te(o, i, {}, e.personalDefaults, n, e.preferencesFile, (t, n) => {
					t || je(e, n);
				});
			}, (e) => {
				je(r, e);
			});
		});
	}, (e) => {
		i.appendChild(Pe(r.dom, e));
	}), i;
}
function ko(e) {
	return e.datatype ? e.datatype.equals(E.xsd("boolean")) ? e.value === "1" : e.datatype.equals(E.xsd("dateTime")) || e.datatype.equals(E.xsd("date")) ? new Date(e.value) : e.datatype.equals(E.xsd("integer")) || e.datatype.equals(E.xsd("float")) || e.datatype.equals(E.xsd("decimal")) ? Number(e.value) : e.value : e;
}
function Ao(e, t, n, r) {
	return new Promise(function(i, a) {
		Eo(e, r).then((r) => {
			let o = r.sharedPreferences;
			if (r.me) Ma(e, e.doc(), r.me).then((e) => {
				Do(t, r).then((t) => {
					let r = [], a = t.personalDefaults;
					n.forEach((t) => {
						let n = So.any(e, t) || So.any(o, t) || So.any(a, t);
						n && (r[t.uri] = ko(n));
					}), i(r);
				}, a);
			}, a);
			else {
				let e = [];
				n.forEach((t) => {
					let n = So.any(o, t);
					n && (e[t.uri] = ko(n));
				}), i(e);
			}
		});
	});
}
// src/lib/table.js
var jo = {
	icons: P,
	log: se,
	ns: E,
	utils: oe,
	widgets: Ae
};
function Mo(e, t) {
	let n = t.sourceDocument, r = t.tableClass, i = t.query, a = jo.ns, s = A, c = {}, l = {
		"http://www.w3.org/2002/07/owl#sameAs": !0,
		"http://www.w3.org/1999/02/22-rdf-syntax-ns#type": !0
	}, u = {
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
	}, d = {
		"http://www.w3.org/2001/XMLSchema#dateTime": !0,
		"http://www.w3.org/2001/XMLSchema#date": !0
	}, f = {
		"http://xmlns.com/foaf/0.1/Image": !0,
		"http://purl.org/dc/terms/Image": !0
	}, p = t.keyVariable || "?_row", m = 0, h, g, _, v, y = null, b = null, x = e.createElement("div");
	x.className = "tableViewPane", x.appendChild(w());
	let S = e.createElement("div");
	x.appendChild(S), x.refresh = function() {
		Ie(C.query, C.logicalRows, C.columns, C);
	};
	let C;
	if (i) C = ze(i), S.appendChild(C);
	else {
		let e = he();
		h = e[0], g = e[1], r || _.appendChild(se(h, g)), b = Be(g), D(b || h);
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
			let r = s.variable("_col" + t);
			e.vars.push(r), n[t].setVariable(r);
		}
	}
	function ee(e, t, n) {
		let r = n.type;
		r ||= s.variable("_any"), e.pat.add(t, jo.ns.rdf("type"), r);
	}
	function E(e, t, n) {
		let r = n.getColumns();
		for (let n = 0; n < r.length; ++n) {
			let i = r[n], a = s.formula();
			a.add(t, i.predicate, i.getVariable()), e.pat.optional.push(a);
		}
	}
	function te(e) {
		let t = new o(), n = s.variable(p.slice(1));
		return T(t, e), ee(t, n, e), E(t, n, e), t;
	}
	function D(e) {
		re(v), v.appendChild(le(e)), ne(te(e), e);
	}
	function ne(e, t) {
		y && (y.running = !1);
		let n = ze(e, t);
		re(S), S.appendChild(n), y = e;
	}
	function re(e) {
		for (; e.childNodes.length > 0;) e.removeChild(e.childNodes[0]);
	}
	function O(e) {
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
			return M(this.type);
		}, this.addUse = function() {
			this.useCount += 1;
		};
	}
	function k() {
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
			return this.getHints().label ? this.getHints().label : this.predicate ? this.predicate.sameTerm(a.rdf("type")) && this.superClass ? M(this.superClass, !0) : M(this.predicate) : this.variable ? this.variable.toString() : "unlabeled column?";
		}, this.setPredicate = function(e, t, n) {
			t ? (this.inverse = e, this.constraints = this.constraints.concat(s.each(e, jo.ns.rdfs("domain"))), e.sameTerm(a.rdfs("subClassOf")) && n.termType === "NamedNode" && (this.superClass = n, this.alternatives = s.each(void 0, a.rdfs("subClassOf"), n))) : (this.predicate = e, this.constraints = this.constraints.concat(s.each(e, jo.ns.rdfs("range"))));
		}, this.getConstraints = function() {
			return this.constraints;
		}, this.filterFunction = function() {
			return !0;
		}, this.sortKey = function() {
			return this.getLabel().toLowerCase();
		}, this.isImageColumn = function() {
			for (let e = 0; e < this.constraints.length; e++) if (this.constraints[e].uri in f) return !0;
			return !1;
		};
	}
	function ae(e, t) {
		let n = [];
		for (let r in e) {
			let i = e[r];
			(!t || t(r, i)) && n.push(i);
		}
		return n;
	}
	function oe(t, n) {
		let r = e.createElement("option");
		return r.setAttribute("value", n), r.appendChild(e.createTextNode(t)), r;
	}
	function se(t, n) {
		let r = e.createElement("div");
		r.appendChild(e.createTextNode("Select type: "));
		let i = e.createElement("select");
		i.appendChild(oe("All types", "null"));
		for (let e in n) i.appendChild(oe(n[e].getLabel(), e));
		return i.addEventListener("click", function() {
			let e;
			e = i.value === "null" ? t : n[i.value], ce(e);
		}, !1), r.appendChild(i), r;
	}
	function ce(e) {
		D(e);
	}
	function le(t) {
		let n = e.createElement("div"), r = t.getUnusedColumns();
		if (r.sort(function(e, t) {
			let n = e.sortKey(), r = t.sortKey();
			return (n > r) - (n < r);
		}), r.length > 0) {
			n.appendChild(e.createTextNode("Add column: "));
			let i = e.createElement("select");
			i.appendChild(oe("", "-1"));
			for (let e = 0; e < r.length; ++e) {
				let t = r[e];
				i.appendChild(oe(t.getLabel(), "" + e));
			}
			n.appendChild(i), i.addEventListener("click", function() {
				let e = Number(i.value);
				e >= 0 && (t.addColumn(r[e]), D(t));
			}, !1);
		}
		return n;
	}
	function ue(e, t) {
		for (let n in e) {
			let r = e[n];
			if (r.variable.toNT() === t) return r;
		}
		throw Error(`getColumnForVariable: no column for variable ${t}`);
	}
	function j(e, t) {
		let n;
		return t.uri in e ? n = e[t.uri] : (n = new k(), n.setPredicate(t), e[t.uri] = n), n;
	}
	function de(e, t) {
		let n;
		return t.uri in e ? n = e[t.uri] : (n = new O(t), e[t.uri] = n), n;
	}
	function fe() {
		let e = {}, t = s.statementsMatching(void 0, jo.ns.rdf("type"), r, n), i = {};
		for (let n = 0; n < t.length; ++n) {
			let r = t[n].object;
			if (r.termType !== "NamedNode") continue;
			let a = de(e, r);
			r.uri in i || (i[r.uri] = []), i[r.uri].push(t[n].subject), a.addUse();
		}
		return [i, e];
	}
	function pe(e, t) {
		let r = s.statementsMatching(e, void 0, void 0, n), i = {};
		for (let e = 0; e < r.length; ++e) {
			let n = r[e].predicate;
			if (n.uri in l) continue;
			let a = j(t, n);
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
		let r = ae(n);
		ge(r), e.allColumns = r;
	}
	function he() {
		let e, t, n = fe();
		e = n[0], t = n[1];
		for (let n in e) {
			let r = e[n];
			me(t[n], r);
		}
		return [new O(null), ae(t)];
	}
	function ge(e) {
		function t(e, t) {
			return (e.useCount < t.useCount) - (e.useCount > t.useCount);
		}
		e.sort(t);
	}
	function P(t, n) {
		let r = e.createElement("a");
		return r.appendChild(e.createTextNode("[x]")), r.addEventListener("click", function() {
			t.removeColumn(n), D(t);
		}, !1), r;
	}
	function _e(t, n) {
		let r = e.createElement("tr"), i = e.createElement("th");
		r.appendChild(i);
		for (let i = 0; i < t.length; ++i) {
			let a = e.createElement("th"), o = t[i];
			a.appendChild(e.createTextNode(o.getLabel())), n && a.appendChild(P(n, o)), r.appendChild(a);
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
		for (let n = 0; n < e.length; ++n) ye(e[n], t);
	}
	function xe(e, t, n) {
		function r(e) {
			return e ? e.termType === "Literal" ? e.value.toLowerCase() : e.termType === "NamedNode" ? M(e).toLowerCase() : e.value.toLowerCase() : "";
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
				return t = e.termType === "Literal" ? e.value : e.termType === "NamedNode" ? M(e) : "", t.toLowerCase().indexOf(c) >= 0;
			}
			return !1;
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
			let t = i[e], n = oe(M(t), e);
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
			if (i = r[a], n.checkedAnyValues && n.possiblyNumber || i.uri in u) return we(e, t, n);
			if (i.uri === "http://www.w3.org/2000/01/rdf-schema#Literal") return Se(e, t, n);
			let o = s.each(i, jo.ns.owl("oneOf"));
			if (o.length > 0) return Ce(e, t, n, o.elements);
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
			let t = ie(e).getAttribute("href");
			t || N("No href found \n"), a(t);
		}, !0) : i.addEventListener("click", jo.widgets.openHrefInOutlineMode, !0), i;
	}
	function ke(e, t) {
		let n = !1;
		return e.uri && (n = e.uri.match(/^mailto:(.*)/)), n ? Oe(e.uri, n[1], t) : Oe(e.uri, M(e), t);
	}
	function Ae(t) {
		let n = e.createElement("img");
		return n.setAttribute("src", t.uri), n.style.height = "40px", n;
	}
	function je(e) {
		return t && t.hints && e.variable && t.hints[e.variable.toNT()] ? t.hints[e.variable.toNT()] : {};
	}
	function Me(t, n) {
		let r = je(n), i = r.cellFormat;
		if (i) switch (i) {
			case "shortDate": return e.createTextNode(jo.widgets.shortDate(t.value));
		}
		else if (t.termType === "Literal") {
			if (t.datatype) {
				if (d[t.datatype.uri]) return e.createTextNode(jo.widgets.shortDate(t.value));
				if (u[t.datatype.uri]) {
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
				r.appendChild(Me(t, n)), r.appendChild(e.createTextNode(", "));
			}), r.removeChild(r.lastChild), r.appendChild(e.createTextNode("]")), r;
		} else return e.createTextNode("unknown termtype '" + t.termType + "'!");
	}
	function Ne(t, n, r, i) {
		let a = e.createElement("td");
		n._subject && "uri" in n._subject && a.appendChild(Oe(n._subject.uri, "→")), t.appendChild(a);
		for (let i = 0; i < r.length; ++i) {
			let a = r[i], o = e.createElement("td"), s, c = a.getKey();
			if (c in n.values) {
				let t = n.values[c], r = !1;
				n.originalValues && n.originalValues[c] && t.length !== n.originalValues[c].length && (r = !0);
				for (let i = 0; i < t.length; ++i) {
					let l = t[i];
					n.originalValues && n.originalValues[c] && n.originalValues[c].length > i && (s = n.originalValues[c][i], l.toString() !== s.toString() && (r = !0)), o.appendChild(Me(l, a)), i !== t.length - 1 && o.appendChild(e.createTextNode(",\n")), r && (o.style.background = "#efe");
				}
			}
			t.appendChild(o);
		}
		return n._htmlRow = t, t;
	}
	function Pe(e, t) {
		let n = null;
		if (e.termType === "Literal") n = "value";
		else if (e.termType === "NamedNode") n = "uri";
		else return t.indexOf(e) >= 0;
		let r = 0;
		for (; r < t.length; ++r) if (t[r].termType === e.termType && t[r][n] === e[n]) return !0;
		return !1;
	}
	function Fe(e, t, n) {
		let r, i = !1;
		for (r in n) {
			let t = n[r];
			r in e.values || (e.values[r] = []), Pe(t, e.values[r]) || (e.values[r].push(t), i = !0);
		}
		i && (re(e._htmlRow), Ne(e._htmlRow, e, t)), ye(e, t);
	}
	function F(e) {
		if ("uri" in e) return e.uri;
		if ("_subject_id" in e) return e._subject_id;
		{
			let t = "" + m;
			return e._subject_id = t, ++m, t;
		}
	}
	function Ie(n, r, i, a) {
		n.running = !0;
		let o = Date.now(), l = e.createElement("tr");
		a.appendChild(l), l.textContent = "Loading ...";
		for (let e = 0; e < r.length; e++) r[e].original = !0, r[e].originalValues || (r[e].originalValues = r[e].values), r[e].values = {};
		s.query(n, function(t) {
			if (!n.running) return;
			l.textContent += ".";
			let o = null, s = null, u;
			if (p in t && (s = t[p], u = F(s), u in c && (o = c[u])), !o) {
				let t = e.createElement("tr");
				a.appendChild(t), o = {
					_htmlRow: t,
					_subject: s,
					values: {}
				}, r.push(o), s && (c[u] = o);
			}
			delete o.original, Fe(o, i, t);
		}, void 0, function() {
			l && l.parentNode && l.parentNode.removeChild && (l.parentNode.removeChild(l), l = null);
			let e = Date.now() - o;
			N("Query done: " + r.length + " rows, " + e + "ms");
			for (let e = r.length - 1; e >= 0; e--) if (r[e].original) {
				N("   deleting row " + r[e]._subject);
				let t = r[e]._htmlRow;
				t.parentNode.removeChild(t), delete c[F(r[e]._subject)], r.splice(e, 1);
			}
			t.sortBy && xe(r, ue(i, t.sortBy), t.sortReverse), t.onDone && t.onDone(x);
		});
	}
	function Le(e, t) {
		jo.log.debug(">> processing formula");
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
		for (let n = 0; n < t.optional.length; ++n) jo.log.debug("recurse to optional subformula " + n), Le(e, t.optional[n]);
		jo.log.debug("<< finished processing formula");
	}
	function Re(e) {
		let t = [], n = {};
		for (let r = 0; r < e.vars.length; ++r) {
			let i = new k(), a = e.vars[r];
			jo.log.debug("column " + r + " : " + a), i.setVariable(a), n[a] = i, t.push(i);
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
// src/lib/tabs.ts
var No = /* @__PURE__ */ p({
	TabWidgetElement: () => Po,
	tabWidget: () => Io
}), Po = class extends HTMLElement {
	bodyContainer;
	refresh;
	tabContainer;
}, Fo = "#ddddcc";
function Io(e) {
	let t = e.subject, n = e.dom || document, r = parseInt(e.orientation || "0"), i = e.backgroundColor || Fo, a = r & 2, o = r & 1, s = e.onClose, [c, l] = Lo(i), u = `display: grid; width: auto; height: 100%; border: 0.1em; border-style: solid; border-color: ${c}; padding: 1em;`, d = n.createElement("div");
	d.setAttribute("style", j.tabsRootElement), d.style.flexDirection = (o ? "row" : "column") + (a ? "-reverse" : "");
	let f = d.appendChild(n.createElement("nav"));
	f.setAttribute("style", j.tabsNavElement);
	let p = d.appendChild(n.createElement("div"));
	p.setAttribute("style", j.tabsMainElement);
	let m = f.appendChild(n.createElement("ul"));
	m.setAttribute("style", j.tabContainer), m.style.flexDirection = `${o ? "column" : "row"}`;
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
	if (d.refresh = D, D(), !e.startEmpty && m.children.length && e.selectedTab) {
		let t = Array.from(m.children).map((e) => e.firstChild).find((t) => t.dataset.name === e.selectedTab), n = e.selectedTab.uri, r = Array.from(m.children).find((e) => e.subject && e.subject.uri && e.subject.uri === n) || t || m.children[0], i = r.firstChild;
		i?.click ? i.click() : r instanceof HTMLElement && r.click();
	} else if (!e.startEmpty) {
		let e = m.children[0], t = e?.firstChild;
		t?.click ? t.click() : e instanceof HTMLElement && e.click();
	}
	return d;
	function ee(e) {
		if (e.dataset.onCloseSet) {
			let t = e.querySelector(".unstyled");
			e.removeChild(t);
		}
		let t = n.createElement("li");
		t.classList.add("unstyled");
		let r = _e(n, s);
		r.setAttribute("style", r.getAttribute("style") + x), t.appendChild(r), e.appendChild(t), e.dataset.onCloseSet = "true";
	}
	function E() {
		return e.items ? e.items : e.ordered === !1 ? A.each(t, e.predicate) : A.the(t, e.predicate).elements;
	}
	function te(t) {
		let r = n.createElement("li");
		r.setAttribute("style", C), r.subject = t;
		let i = r.appendChild(n.createElement("button"));
		if (i.setAttribute("style", j.makeNewSlot), i.onclick = function() {
			if (ne(), re(), r.setAttribute("style", w), !r.bodyTR) return;
			r.bodyTR.setAttribute("style", T);
			let n = a(r);
			e.renderMain && r.subject && n.asSettings !== !1 && (n.innerHTML = "loading item ..." + t, e.renderMain(n, r.subject), n.asSettings = !1);
		}, e.renderTabSettings && r.subject) {
			let i = n.createElement("button");
			i.textContent = "...", i.setAttribute("style", j.ellipsis), i.onclick = function() {
				if (ne(), re(), r.setAttribute("style", w), !r.bodyTR) return;
				r.bodyTR.setAttribute("style", T);
				let n = a(r);
				e.renderTabSettings && r.subject && n.asSettings !== !0 && (n.innerHTML = "loading settings ..." + t, e.renderTabSettings(n, r.subject), n.asSettings = !0);
			}, r.appendChild(i);
		}
		return e.renderTab ? e.renderTab(i, t) : i.innerHTML = M(t), r;
		function a(e) {
			let t = e.bodyTR?.children[0];
			if (t) return t;
			let r = e.bodyTR.appendChild(n.createElement("div"));
			return r.setAttribute("style", u), r;
		}
	}
	function D() {
		let e = E(), t, r, i, a, o, c = !1;
		for (a = 0; a < m.children.length; a++) if (t = m.children[a], a >= e.length || t.subject && !t.subject.sameTerm(e[a])) {
			c = !0;
			break;
		}
		if (!c && e.length === m.children.length) return;
		for (o = m.children.length - 1; o >= 0 && (t = m.children[o], i = o - m.children.length + e.length, !t.subject || t.subject.sameTerm(e[i])); o--);
		let l = e.slice(a, o - m.children.length + e.length + 1);
		for (; o >= a;) m.removeChild(m.children[a]), h.removeChild(h.children[a]), --o;
		for (r = 0; r < l.length; r++) {
			let e = te(l[r]), t = n.createElement("div");
			e.bodyTR = t, a === m.children.length ? (m.appendChild(e), h.appendChild(t)) : (m.insertBefore(e, m.children[a + r]), h.insertBefore(t, h.children[a + r]));
		}
		s && ee(m);
	}
	function ne() {
		for (let e = 0; e < m.children.length; e++) {
			let t = m.children[e];
			t.classList.contains("unstyled") || t.setAttribute("style", C);
		}
	}
	function re() {
		for (let e = 0; e < h.children.length; e++) h.children[e].setAttribute("style", "height: 100%; width: 100%;display: none;");
	}
}
function Lo(e) {
	return zo(e) ? [Ro(e, "#ffffff", .3), "#000000"] : [Ro(e, "#000000", .3), "#ffffff"];
}
function Ro(e, t, n) {
	let r, i, a, o = "#", s = "0123456789abcdef";
	for (let c = 0; c < 3; c++) {
		r = parseInt(e.slice(c * 2 + 1, c * 2 + 3), 16), i = parseInt(t.slice(c * 2 + 1, c * 2 + 3), 16), a = r * (1 - n) + i * n;
		let l = parseInt(("" + a).split(".")[0]), u = parseInt(("" + l / 16).split(".")[0]), d = parseInt(("" + l % 16).split(".")[0]);
		o += s[u] + s[d];
	}
	return o;
}
function zo(e) {
	let t = 0;
	for (let n = 0; n < 3; n++) t += parseInt(e.slice(n * 2 + 1, n * 2 + 3), 16);
	return t > 384;
}
// src/header/empty-profile.ts
var Bo = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"26\" height=\"26\" viewBox=\"0 0 26 26\" fill=\"none\">\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z\" fill=\"#D8D8D8\" stroke=\"#8B8B8B\"/>\n    <mask id=\"mask0\" mask-type=\"alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"26\" height=\"26\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z\" fill=\"white\" stroke=\"white\"/>\n    </mask>\n    <g mask=\"url(#mask0)\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.0468 10.4586C17.0468 14.4979 15.4281 16.9214 12.9999 16.9214C10.5718 16.9214 8.95298 14.4979 8.95298 10.4586C8.95298 6.41931 12.9999 6.41931 12.9999 6.41931C12.9999 6.41931 17.0468 6.41931 17.0468 10.4586ZM4.09668 23.3842C6.52483 17.7293 12.9999 17.7293 12.9999 17.7293C12.9999 17.7293 19.475 17.7293 21.9031 23.3842C21.9031 23.3842 17.8481 25 12.9999 25C8.15169 25 4.09668 23.3842 4.09668 23.3842Z\" fill=\"#8B8B8B\"/>\n    </g>\n</svg>";
// src/utils/headerFooterHelpers.ts
function Vo() {
	let { origin: e, pathname: t } = document.location, n = document.body?.dataset?.appShell === "databrowser", r = t.split("/").filter(Boolean), i = r[r.length - 1] || "", a = /\.[^/]+$/.test(i);
	return n && r.length > 0 && !a ? d(`${e}/${r[0]}/`) : d(e).site();
}
async function Ho(e, t) {
	try {
		if (!t.any(e, null, E.ldp("Container"), e)) {
			let n = (await t.fetcher.webOperation("GET", e.uri, t.fetcher.initFetchOptions(e.uri, { headers: { accept: "text/turtle" } }))).responseText;
			y(n, t, e.uri, "text/turtle");
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
	}
	{
		let n = d(`${e.uri}profile/card#me`);
		try {
			await t.fetcher.load(n);
		} catch {
			return console.error("Ooops. Guessed wrong pod owner webid {$guess} : can't load it."), null;
		}
		return t.holds(n, E.space("storage"), e, n.doc()) ? (console.warn("Using guessed pod owner webid but it links back."), n) : null;
	}
}
function Uo(e, t) {
	return e.anyValue(t, E.vcard("fn"), null, t.doc()) || e.anyValue(t, E.foaf("name"), null, t.doc()) || t.uri;
}
function Wo(e, t, n = {}) {
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
// src/header/index.ts
var Go = P.iconBase + "noun_help.svg", Ko = "https://solidproject.org/assets/img/solid-emblem.svg";
async function qo(e, t, n) {
	let r = document.getElementById("PageHeader");
	if (!r) return;
	let i = Vo();
	Jo(r, e, i, t, n)(), k.events.on("logout", Jo(r, e, i, t, n)), k.events.on("login", Jo(r, e, i, t, n));
}
function Jo(e, t, n, r, i) {
	return async () => {
		let a = O.currentUser();
		e.innerHTML = "", e.appendChild(await Yo(t, n, a, r, i));
	};
}
async function Yo(e, t, n, r, i) {
	let a = document.createElement("a");
	a.href = t.uri, a.setAttribute("style", j.headerBannerLink);
	let o = document.createElement("img");
	i && (o.src = i.logo ? i.logo : Ko), o.setAttribute("style", j.headerBannerIcon), a.appendChild(o);
	let s = n ? await es(e, n, r) : Zo(), c = document.createElement("div");
	c.setAttribute("style", j.headerBanner), c.appendChild(a);
	let l = document.createElement("div");
	if (l.setAttribute("style", j.headerBannerRightMenu), l.appendChild(s), i && i.helpMenuList) {
		let e = Xo(i, i.helpMenuList);
		l.appendChild(e);
	}
	return c.appendChild(l), c;
}
function Xo(e, t) {
	if (!t) return;
	let n = document.createElement("ul");
	n.setAttribute("style", j.headerUserMenuList), t.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? n.appendChild(ts($o(e.label, e.url, e.target))) : n.appendChild(ts(Qo(e.label, e.onclick)));
	});
	let r = document.createElement("nav");
	r.setAttribute("style", j.headerUserMenuNavigationMenuNotDisplayed), r.setAttribute("aria-hidden", "true"), r.setAttribute("id", "helperNav"), r.appendChild(n);
	let i = document.createElement("div");
	i.setAttribute("style", j.headerBannerUserMenu), i.appendChild(r);
	let a = document.createElement("button");
	a.setAttribute("style", j.headerUserMenuTrigger), a.type = "button";
	let o = document.createElement("img");
	o.src = e && e.helpIcon ? e.helpIcon : P.iconBase + Go, o.setAttribute("style", j.headerUserMenuTriggerImg), i.appendChild(a), a.appendChild(o);
	let s = Wo((e) => rs(e, a, r), 50);
	a.addEventListener("click", s);
	let c = setTimeout(() => null, 0);
	return i.addEventListener("mouseover", (e) => {
		clearTimeout(c), s(e), document.getElementById("helperNav")?.setAttribute("style", j.headerUserMenuNavigationMenu);
	}), i.addEventListener("mouseout", (e) => {
		c = setTimeout(() => s(e), 200), document.getElementById("helperNav")?.setAttribute("style", j.headerUserMenuNavigationMenuNotDisplayed);
	}), i;
}
function Zo() {
	let e = document.createElement("div");
	return e.setAttribute("style", j.headerBannerLogin), e.appendChild(St(document, null, {})), e;
}
function Qo(e, t) {
	let n = document.createElement("button");
	return n.setAttribute("style", j.headerUserMenuButton), n.onmouseover = function() {
		n.setAttribute("style", j.headerUserMenuButtonHover);
	}, n.onmouseout = function() {
		n.setAttribute("style", j.headerUserMenuButton);
	}, n.addEventListener("click", t), n.innerText = e, n;
}
function $o(e, t, n) {
	let r = document.createElement("a");
	return r.setAttribute("style", j.headerUserMenuLink), r.onmouseover = function() {
		r.setAttribute("style", j.headerUserMenuLinkHover);
	}, r.onmouseout = function() {
		r.setAttribute("style", j.headerUserMenuLink);
	}, r.href = t, r.innerText = e, n && (r.target = n), r;
}
async function es(e, t, n) {
	let r = e.fetcher;
	r && await r.load(t);
	let i = document.createElement("ul");
	i.setAttribute("style", j.headerUserMenuList), n && n.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? i.appendChild(ts($o(e.label, e.url, e.target))) : i.appendChild(ts(Qo(e.label, e.onclick)));
	});
	let a = document.createElement("nav");
	a.setAttribute("style", j.headerUserMenuNavigationMenuNotDisplayed), a.setAttribute("aria-hidden", "true"), a.setAttribute("id", "loggedInNav"), a.appendChild(i);
	let o = document.createElement("button");
	o.setAttribute("style", j.headerUserMenuTrigger), o.type = "button";
	let s = ns(e, t);
	typeof s == "string" ? o.innerHTML = s : o.appendChild(s);
	let c = document.createElement("div");
	c.setAttribute("style", j.headerBannerUserMenuNotDisplayed), c.appendChild(o), c.appendChild(a);
	let l = Wo((e) => rs(e, o, a), 50);
	o.addEventListener("click", l);
	let u = setTimeout(() => null, 0);
	return c.addEventListener("mouseover", (e) => {
		clearTimeout(u), l(e), document.getElementById("loggedInNav")?.setAttribute("style", j.headerUserMenuNavigationMenu);
	}), c.addEventListener("mouseout", (e) => {
		u = setTimeout(() => l(e), 200), document.getElementById("loggedInNav")?.setAttribute("style", j.headerUserMenuNavigationMenuNotDisplayed);
	}), c;
}
function ts(e) {
	let t = document.createElement("li");
	return t.setAttribute("style", j.headerUserMenuListItem), t.appendChild(e), t;
}
function ns(e, t) {
	let n = null;
	try {
		if (n = De(t), !n) return Bo;
	} catch {
		return Bo;
	}
	let r = document.createElement("div");
	return r.setAttribute("style", j.headerUserMenuPhoto), r.style.backgroundImage = `url(${n})`, r;
}
function rs(e, t, n) {
	let r = t.getAttribute("aria-expanded") === "true", i = e.type === "mouseover", a = e.type === "mouseout";
	r && i || !r && a || (t.setAttribute("aria-expanded", (!r).toString()), n.setAttribute("aria-hidden", r.toString()));
}
// src/footer/index.ts
var is = "https://solidproject.org", as = "solidproject.org";
async function os(e, t) {
	let n = document.getElementById("PageFooter");
	if (!n) return;
	let r = Vo(), i = await Ho(r, e);
	return ss(n, e, r, i, t), k.events.on("login", () => ss(n, e, r, i, t)), k.events.on("logout", () => ss(n, e, r, i, t)), n;
}
async function ss(e, t, n, r, i) {
	let a = O.currentUser();
	return e.innerHTML = "", e.appendChild(await cs(t, a, n, r, i)), e;
}
function cs(e, t, n, r, i) {
	let a = document.createElement("div");
	a.setAttribute("style", j.footer);
	let o = document.createElement("a");
	if (o.href = i && i.solidProjectUrl ? i.solidProjectUrl : is, o.innerText = i && i.solidProjectName ? i.solidProjectName : as, !n || !r || t && t.equals(r)) {
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
	u.href = r.uri, u.innerText = Uo(e, r);
	let d = document.createElement("span");
	d.innerText = ". For more info, check out ";
	let f = document.createElement("span");
	return f.innerText = ".", a.appendChild(s), a.appendChild(c), a.appendChild(l), a.appendChild(u), a.appendChild(d), a.appendChild(o), a.appendChild(f), a;
}
// src/create/types.ts
var ls = /* @__PURE__ */ p({});
// src/lib/file-explorer/relevant-panes.ts
async function us(e, t, n = {}) {
	let r = new Set(n.excludedPaneNames || []), i = t.session.paneRegistry, a = i.list.filter((n) => !n.global && !r.has(n.name) && n.label(e, t));
	if (a.length === 0) {
		let e = n.fallbackPaneName ? i.byName(n.fallbackPaneName) : void 0;
		return e ? [e] : [];
	}
	let o = await Et(a);
	return o.length === 0 ? [a[0]] : i.list.indexOf(a[0]) < i.list.indexOf(o[0]) ? [a[0]].concat(o) : o;
}
function ds(e, t, n) {
	let r = t.session.store, i = r.any(e, E.ui("mintClass"), void 0, e.doc()) || r.any(e.doc(), E.ui("mintClass"), void 0, e.doc());
	if (i) {
		let e = n.find((e) => e.mintClass?.sameTerm(i));
		if (e) return e;
	}
	return n.find((t) => t.shouldGetFocus?.(e)) || n[0];
}
// src/lib/file-explorer/compose-explorer.ts
function fs(e, t) {
	e.context = t.context, e.subjectUri = t.subjectUri, e.pane = t.pane, e.relevantPanes = t.relevantPanes;
	let n = e.querySelector(":scope > solid-ui-file-explorer-header");
	if (t.header) {
		let r = n || e.ownerDocument.createElement("solid-ui-file-explorer-header");
		r.paneIcon = t.header.paneIcon, r.menuItems = t.header.menuItems, r.showBack = t.header.showBack ?? !0, e.firstElementChild !== r && e.prepend(r);
	} else n?.remove();
	if (t.paneElement) {
		let n = t.paneElement;
		n.classList.add("paneDiv");
		let r = e.querySelector(":scope > .paneDiv");
		r ? r !== n && r.replaceWith(n) : e.appendChild(n);
	}
}
// src/lib/file-explorer/pane-menu-items.ts
async function ps(e, t, n, r) {
	return r ? r(t, n) : typeof e.icon == "function" ? e.icon(t, n) : e.icon;
}
async function ms(e) {
	return (await Promise.all(e.panes.map(async (t) => {
		let n = t.label(e.subject, e.context);
		if (!n) return;
		let r = await ps(t, e.subject, e.context, e.iconOverrides?.[t.name]);
		return {
			key: t.name,
			label: n,
			...r ? { icon: r } : {},
			action: (n) => e.openPane(e.subject, t.name, n)
		};
	}))).filter((e) => e !== void 0);
}
// node_modules/@marijn/find-cluster-break/src/index.js
var hs = [], gs = [];
(() => {
	let e = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,1n,9,16,o,,x,1i,3,,i,,7,a,2,t,3,1k,,,7,2,2,2,3,9,,a,2,q,,2,3,1k,,,5,4,2,2,3,3,,u,2,3,,b,3,1k,,,8,,3,,3,k,2,m,6,,3,1k,,,7,2,2,2,3,7,3,a,2,u,,1n,5,3,3,,4,9,,14,5,1j,,,7,,3,,4,7,2,b,2,t,3,1k,,,7,,3,,4,7,2,b,2,f,,c,4,1j,2,,7,,3,,4,9,,a,2,t,3,1y,,4,6,,,,8,i,2,1p,,,8,c,8,2q,,,a,b,7,21,2,r,,,,,,4,2,1d,k,,2,5,b,,10,9,,2u,b,,6,n,4,4,3,g,4,d,,,3,6,,f,,jj,3,qa,4,s,3,t,2,u,2,1s,w,9,,19,3,,,39,2,y,,3a,c,4,c,63,5,1l,a,,,,,2,o,2,,1c,1a,2,c,k,5,1b,h,12,9,c,3,u,d,1k,e,1c,k,48,3,,l,4,,6,,2,3,5i,1s,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,n,5,4,,2b,2,1e,i,q,i,d,,12,8,p,d,18,4,1b,e,10,,1v,e,c,,8,2,1a,,1f,,,3,2,2,5,2,,,15,5,5,2,6k,8,,2,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,1t,5,8t,2,25,6,1y,b,1d,4,3e,3,1h,f,15,,2,2,a,4,19,b,7,,1p,3,10,e,g,2,18,,c,3,1c,e,8,4,,2,2k,c,6,,2,,4d,c,l,4,1j,2,,7,2,2,2,3,9,,a,2,2,7,3,5,1v,9,,,2,,,4,,5,,,e,2,2a,i,n,,29,k,6j,7,2,9,r,2,2a,h,2y,d,2t,3,2,a,74,f,6t,6,,2,2,4,,,,2,3x,7,2,7,3,,s,a,14,7,,4,8,,9,b,1a,g,5i,8,5j,8,,8,2a,m,,e,3e,6,3,,,2,,7,,,1u,5,,2,,5,9n,4,9,2,,,1c,7,3,5,n,,44l,,6,f,8ug,i,1xc,5,1n,7,t4,,,1j,7,4,29,,b,2,f57,2,3mp,1a,2,n,f2,5,3,6,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,2s,,4g,7,af,,1p,4,e4,4,72,2,6r,,2,,7,2,5,,d6,7,31,7,240,5".split(",").map((e) => e ? parseInt(e, 36) : 1);
	for (let t = 0, n = 0; t < e.length; t++) (t % 2 ? gs : hs).push(n += e[t]);
})();
function _s(e) {
	if (e < 768) return !1;
	for (let t = 0, n = hs.length;;) {
		let r = t + n >> 1;
		if (e < hs[r]) n = r;
		else if (e >= gs[r]) t = r + 1;
		else return !0;
		if (t == n) return !1;
	}
}
function vs(e) {
	return e >= 127462 && e <= 127487;
}
var ys = 8205;
function bs(e, t, n = !0, r = !0) {
	return (n ? xs : Ss)(e, t, r);
}
function xs(e, t, n) {
	if (t == e.length) return t;
	t && ws(e.charCodeAt(t)) && Ts(e.charCodeAt(t - 1)) && t--;
	let r = Cs(e, t);
	for (t += Es(r); t < e.length;) {
		let i = Cs(e, t);
		if (r == ys || i == ys || n && _s(i)) t += Es(i), r = i;
		else if (vs(i)) {
			let n = 0, r = t - 2;
			for (; r >= 0 && vs(Cs(e, r));) n++, r -= 2;
			if (n % 2 == 0) break;
			t += 2;
		} else break;
	}
	return t;
}
function Ss(e, t, n) {
	for (; t > 1;) {
		let r = xs(e, t - 2, n);
		if (r < t) return r;
		t--;
	}
	return 0;
}
function Cs(e, t) {
	let n = e.charCodeAt(t);
	if (!Ts(n) || t + 1 == e.length) return n;
	let r = e.charCodeAt(t + 1);
	return ws(r) ? (n - 55296 << 10) + (r - 56320) + 65536 : n;
}
function ws(e) {
	return e >= 56320 && e < 57344;
}
function Ts(e) {
	return e >= 55296 && e < 56320;
}
function Es(e) {
	return e < 65536 ? 1 : 2;
}
// node_modules/@codemirror/state/dist/index.js
var R = class e {
	lineAt(e) {
		if (e < 0 || e > this.length) throw RangeError(`Invalid position ${e} in document of length ${this.length}`);
		return this.lineInner(e, !1, 1, 0);
	}
	line(e) {
		if (e < 1 || e > this.lines) throw RangeError(`Invalid line number ${e} in ${this.lines}-line document`);
		return this.lineInner(e, !0, 1, 0);
	}
	replace(e, t, n) {
		[e, t] = Is(this, e, t);
		let r = [];
		return this.decompose(0, e, r, 2), n.length && n.decompose(0, n.length, r, 3), this.decompose(t, this.length, r, 1), Os.from(r, this.length - (t - e) + n.length);
	}
	append(e) {
		return this.replace(this.length, this.length, e);
	}
	slice(e, t = this.length) {
		[e, t] = Is(this, e, t);
		let n = [];
		return this.decompose(e, t, n, 0), Os.from(n, t - e);
	}
	eq(e) {
		if (e == this) return !0;
		if (e.length != this.length || e.lines != this.lines) return !1;
		let t = this.scanIdentical(e, 1), n = this.length - this.scanIdentical(e, -1), r = new Ms(this), i = new Ms(e);
		for (let e = t, a = t;;) {
			if (r.next(e), i.next(e), e = 0, r.lineBreak != i.lineBreak || r.done != i.done || r.value != i.value) return !1;
			if (a += r.value.length, r.done || a >= n) return !0;
		}
	}
	iter(e = 1) {
		return new Ms(this, e);
	}
	iterRange(e, t = this.length) {
		return new Ns(this, e, t);
	}
	iterLines(e, t) {
		let n;
		if (e == null) n = this.iter();
		else {
			t ??= this.lines + 1;
			let r = this.line(e).from;
			n = this.iterRange(r, Math.max(r, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
		}
		return new Ps(n);
	}
	toString() {
		return this.sliceString(0);
	}
	toJSON() {
		let e = [];
		return this.flatten(e), e;
	}
	constructor() {}
	static of(t) {
		if (t.length == 0) throw RangeError("A document must have at least one line");
		return t.length == 1 && !t[0] ? e.empty : t.length <= 32 ? new Ds(t) : Os.from(Ds.split(t, []));
	}
}, Ds = class e extends R {
	constructor(e, t = ks(e)) {
		super(), this.text = e, this.length = t;
	}
	get lines() {
		return this.text.length;
	}
	get children() {
		return null;
	}
	lineInner(e, t, n, r) {
		for (let i = 0;; i++) {
			let a = this.text[i], o = r + a.length;
			if ((t ? n : o) >= e) return new Fs(r, o, n, a);
			r = o + 1, n++;
		}
	}
	decompose(t, n, r, i) {
		let a = t <= 0 && n >= this.length ? this : new e(js(this.text, t, n), Math.min(n, this.length) - Math.max(0, t));
		if (i & 1) {
			let t = r.pop(), n = As(a.text, t.text.slice(), 0, a.length);
			if (n.length <= 32) r.push(new e(n, t.length + a.length));
			else {
				let t = n.length >> 1;
				r.push(new e(n.slice(0, t)), new e(n.slice(t)));
			}
		} else r.push(a);
	}
	replace(t, n, r) {
		if (!(r instanceof e)) return super.replace(t, n, r);
		[t, n] = Is(this, t, n);
		let i = As(this.text, As(r.text, js(this.text, 0, t)), n), a = this.length + r.length - (n - t);
		return i.length <= 32 ? new e(i, a) : Os.from(e.split(i, []), a);
	}
	sliceString(e, t = this.length, n = "\n") {
		[e, t] = Is(this, e, t);
		let r = "";
		for (let i = 0, a = 0; i <= t && a < this.text.length; a++) {
			let o = this.text[a], s = i + o.length;
			i > e && a && (r += n), e < s && t > i && (r += o.slice(Math.max(0, e - i), t - i)), i = s + 1;
		}
		return r;
	}
	flatten(e) {
		for (let t of this.text) e.push(t);
	}
	scanIdentical() {
		return 0;
	}
	static split(t, n) {
		let r = [], i = -1;
		for (let a of t) r.push(a), i += a.length + 1, r.length == 32 && (n.push(new e(r, i)), r = [], i = -1);
		return i > -1 && n.push(new e(r, i)), n;
	}
}, Os = class e extends R {
	constructor(e, t) {
		super(), this.children = e, this.length = t, this.lines = 0;
		for (let t of e) this.lines += t.lines;
	}
	lineInner(e, t, n, r) {
		for (let i = 0;; i++) {
			let a = this.children[i], o = r + a.length, s = n + a.lines - 1;
			if ((t ? s : o) >= e) return a.lineInner(e, t, n, r);
			r = o + 1, n = s + 1;
		}
	}
	decompose(e, t, n, r) {
		for (let i = 0, a = 0; a <= t && i < this.children.length; i++) {
			let o = this.children[i], s = a + o.length;
			if (e <= s && t >= a) {
				let i = r & (a <= e | (s >= t ? 2 : 0));
				a >= e && s <= t && !i ? n.push(o) : o.decompose(e - a, t - a, n, i);
			}
			a = s + 1;
		}
	}
	replace(t, n, r) {
		if ([t, n] = Is(this, t, n), r.lines < this.lines) for (let i = 0, a = 0; i < this.children.length; i++) {
			let o = this.children[i], s = a + o.length;
			if (t >= a && n <= s) {
				let c = o.replace(t - a, n - a, r), l = this.lines - o.lines + c.lines;
				if (c.lines < l >> 4 && c.lines > l >> 6) {
					let a = this.children.slice();
					return a[i] = c, new e(a, this.length - (n - t) + r.length);
				}
				return super.replace(a, s, c);
			}
			a = s + 1;
		}
		return super.replace(t, n, r);
	}
	sliceString(e, t = this.length, n = "\n") {
		[e, t] = Is(this, e, t);
		let r = "";
		for (let i = 0, a = 0; i < this.children.length && a <= t; i++) {
			let o = this.children[i], s = a + o.length;
			a > e && i && (r += n), e < s && t > a && (r += o.sliceString(e - a, t - a, n)), a = s + 1;
		}
		return r;
	}
	flatten(e) {
		for (let t of this.children) t.flatten(e);
	}
	scanIdentical(t, n) {
		if (!(t instanceof e)) return 0;
		let r = 0, [i, a, o, s] = n > 0 ? [
			0,
			0,
			this.children.length,
			t.children.length
		] : [
			this.children.length - 1,
			t.children.length - 1,
			-1,
			-1
		];
		for (;; i += n, a += n) {
			if (i == o || a == s) return r;
			let e = this.children[i], c = t.children[a];
			if (e != c) return r + e.scanIdentical(c, n);
			r += e.length + 1;
		}
	}
	static from(t, n = t.reduce((e, t) => e + t.length + 1, -1)) {
		let r = 0;
		for (let e of t) r += e.lines;
		if (r < 32) {
			let e = [];
			for (let n of t) n.flatten(e);
			return new Ds(e, n);
		}
		let i = Math.max(32, r >> 5), a = i << 1, o = i >> 1, s = [], c = 0, l = -1, u = [];
		function d(t) {
			let n;
			if (t.lines > a && t instanceof e) for (let e of t.children) d(e);
			else t.lines > o && (c > o || !c) ? (f(), s.push(t)) : t instanceof Ds && c && (n = u[u.length - 1]) instanceof Ds && t.lines + n.lines <= 32 ? (c += t.lines, l += t.length + 1, u[u.length - 1] = new Ds(n.text.concat(t.text), n.length + 1 + t.length)) : (c + t.lines > i && f(), c += t.lines, l += t.length + 1, u.push(t));
		}
		function f() {
			c != 0 && (s.push(u.length == 1 ? u[0] : e.from(u, l)), l = -1, c = u.length = 0);
		}
		for (let e of t) d(e);
		return f(), s.length == 1 ? s[0] : new e(s, n);
	}
};
R.empty = /*@__PURE__*/ new Ds([""], 0);
function ks(e) {
	let t = -1;
	for (let n of e) t += n.length + 1;
	return t;
}
function As(e, t, n = 0, r = 1e9) {
	for (let i = 0, a = 0, o = !0; a < e.length && i <= r; a++) {
		let s = e[a], c = i + s.length;
		c >= n && (c > r && (s = s.slice(0, r - i)), i < n && (s = s.slice(n - i)), o ? (t[t.length - 1] += s, o = !1) : t.push(s)), i = c + 1;
	}
	return t;
}
function js(e, t, n) {
	return As(e, [""], t, n);
}
var Ms = class {
	constructor(e, t = 1) {
		this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof Ds ? e.text.length : e.children.length) << 1];
	}
	nextInner(e, t) {
		for (this.done = this.lineBreak = !1;;) {
			let n = this.nodes.length - 1, r = this.nodes[n], i = this.offsets[n], a = i >> 1, o = r instanceof Ds ? r.text.length : r.children.length;
			if (a == (t > 0 ? o : 0)) {
				if (n == 0) return this.done = !0, this.value = "", this;
				t > 0 && this.offsets[n - 1]++, this.nodes.pop(), this.offsets.pop();
			} else if ((i & 1) == (t > 0 ? 0 : 1)) {
				if (this.offsets[n] += t, e == 0) return this.lineBreak = !0, this.value = "\n", this;
				e--;
			} else if (r instanceof Ds) {
				let i = r.text[a + (t < 0 ? -1 : 0)];
				if (this.offsets[n] += t, i.length > Math.max(0, e)) return this.value = e == 0 ? i : t > 0 ? i.slice(e) : i.slice(0, i.length - e), this;
				e -= i.length;
			} else {
				let i = r.children[a + (t < 0 ? -1 : 0)];
				e > i.length ? (e -= i.length, this.offsets[n] += t) : (t < 0 && this.offsets[n]--, this.nodes.push(i), this.offsets.push(t > 0 ? 1 : (i instanceof Ds ? i.text.length : i.children.length) << 1));
			}
		}
	}
	next(e = 0) {
		return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
	}
}, Ns = class {
	constructor(e, t, n) {
		this.value = "", this.done = !1, this.cursor = new Ms(e, t > n ? -1 : 1), this.pos = t > n ? e.length : 0, this.from = Math.min(t, n), this.to = Math.max(t, n);
	}
	nextInner(e, t) {
		if (t < 0 ? this.pos <= this.from : this.pos >= this.to) return this.value = "", this.done = !0, this;
		e += Math.max(0, t < 0 ? this.pos - this.to : this.from - this.pos);
		let n = t < 0 ? this.pos - this.from : this.to - this.pos;
		e > n && (e = n), n -= e;
		let { value: r } = this.cursor.next(e);
		return this.pos += (r.length + e) * t, this.value = r.length <= n ? r : t < 0 ? r.slice(r.length - n) : r.slice(0, n), this.done = !this.value, this;
	}
	next(e = 0) {
		return e < 0 ? e = Math.max(e, this.from - this.pos) : e > 0 && (e = Math.min(e, this.to - this.pos)), this.nextInner(e, this.cursor.dir);
	}
	get lineBreak() {
		return this.cursor.lineBreak && this.value != "";
	}
}, Ps = class {
	constructor(e) {
		this.inner = e, this.afterBreak = !0, this.value = "", this.done = !1;
	}
	next(e = 0) {
		let { done: t, lineBreak: n, value: r } = this.inner.next(e);
		return t && this.afterBreak ? (this.value = "", this.afterBreak = !1) : t ? (this.done = !0, this.value = "") : n ? this.afterBreak ? this.value = "" : (this.afterBreak = !0, this.next()) : (this.value = r, this.afterBreak = !1), this;
	}
	get lineBreak() {
		return !1;
	}
};
typeof Symbol < "u" && (R.prototype[Symbol.iterator] = function() {
	return this.iter();
}, Ms.prototype[Symbol.iterator] = Ns.prototype[Symbol.iterator] = Ps.prototype[Symbol.iterator] = function() {
	return this;
});
var Fs = class {
	constructor(e, t, n, r) {
		this.from = e, this.to = t, this.number = n, this.text = r;
	}
	get length() {
		return this.to - this.from;
	}
};
function Is(e, t, n) {
	return t = Math.max(0, Math.min(e.length, t)), [t, Math.max(t, Math.min(e.length, n))];
}
function Ls(e, t, n = !0, r = !0) {
	return bs(e, t, n, r);
}
function Rs(e) {
	return e >= 56320 && e < 57344;
}
function zs(e) {
	return e >= 55296 && e < 56320;
}
function Bs(e, t) {
	let n = e.charCodeAt(t);
	if (!zs(n) || t + 1 == e.length) return n;
	let r = e.charCodeAt(t + 1);
	return Rs(r) ? (n - 55296 << 10) + (r - 56320) + 65536 : n;
}
function Vs(e) {
	return e < 65536 ? 1 : 2;
}
var Hs = /\r\n?|\n/, Us = /*@__PURE__*/ (function(e) {
	return e[e.Simple = 0] = "Simple", e[e.TrackDel = 1] = "TrackDel", e[e.TrackBefore = 2] = "TrackBefore", e[e.TrackAfter = 3] = "TrackAfter", e;
})(Us ||= {}), Ws = class e {
	constructor(e) {
		this.sections = e;
	}
	get length() {
		let e = 0;
		for (let t = 0; t < this.sections.length; t += 2) e += this.sections[t];
		return e;
	}
	get newLength() {
		let e = 0;
		for (let t = 0; t < this.sections.length; t += 2) {
			let n = this.sections[t + 1];
			e += n < 0 ? this.sections[t] : n;
		}
		return e;
	}
	get empty() {
		return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
	}
	iterGaps(e) {
		for (let t = 0, n = 0, r = 0; t < this.sections.length;) {
			let i = this.sections[t++], a = this.sections[t++];
			a < 0 ? (e(n, r, i), r += i) : r += a, n += i;
		}
	}
	iterChangedRanges(e, t = !1) {
		Js(this, e, t);
	}
	get invertedDesc() {
		let t = [];
		for (let e = 0; e < this.sections.length;) {
			let n = this.sections[e++], r = this.sections[e++];
			r < 0 ? t.push(n, r) : t.push(r, n);
		}
		return new e(t);
	}
	composeDesc(e) {
		return this.empty ? e : e.empty ? this : Xs(this, e);
	}
	mapDesc(e, t = !1) {
		return e.empty ? this : Ys(this, e, t);
	}
	mapPos(e, t = -1, n = Us.Simple) {
		let r = 0, i = 0;
		for (let a = 0; a < this.sections.length;) {
			let o = this.sections[a++], s = this.sections[a++], c = r + o;
			if (s < 0) {
				if (c > e) return i + (e - r);
				i += o;
			} else {
				if (n != Us.Simple && c >= e && (n == Us.TrackDel && r < e && c > e || n == Us.TrackBefore && r < e || n == Us.TrackAfter && c > e)) return null;
				if (c > e || c == e && t < 0 && !o) return e == r || t < 0 ? i : i + s;
				i += s;
			}
			r = c;
		}
		if (e > r) throw RangeError(`Position ${e} is out of range for changeset of length ${r}`);
		return i;
	}
	touchesRange(e, t = e) {
		for (let n = 0, r = 0; n < this.sections.length && r <= t;) {
			let i = this.sections[n++], a = this.sections[n++], o = r + i;
			if (a >= 0 && r <= t && o >= e) return r < e && o > t ? "cover" : !0;
			r = o;
		}
		return !1;
	}
	toString() {
		let e = "";
		for (let t = 0; t < this.sections.length;) {
			let n = this.sections[t++], r = this.sections[t++];
			e += (e ? " " : "") + n + (r >= 0 ? ":" + r : "");
		}
		return e;
	}
	toJSON() {
		return this.sections;
	}
	static fromJSON(t) {
		if (!Array.isArray(t) || t.length % 2 || t.some((e) => typeof e != "number")) throw RangeError("Invalid JSON representation of ChangeDesc");
		return new e(t);
	}
	static create(t) {
		return new e(t);
	}
}, Gs = class e extends Ws {
	constructor(e, t) {
		super(e), this.inserted = t;
	}
	apply(e) {
		if (this.length != e.length) throw RangeError("Applying change set to a document with the wrong length");
		return Js(this, (t, n, r, i, a) => e = e.replace(r, r + (n - t), a), !1), e;
	}
	mapDesc(e, t = !1) {
		return Ys(this, e, t, !0);
	}
	invert(t) {
		let n = this.sections.slice(), r = [];
		for (let e = 0, i = 0; e < n.length; e += 2) {
			let a = n[e], o = n[e + 1];
			if (o >= 0) {
				n[e] = o, n[e + 1] = a;
				let s = e >> 1;
				for (; r.length < s;) r.push(R.empty);
				r.push(a ? t.slice(i, i + a) : R.empty);
			}
			i += a;
		}
		return new e(n, r);
	}
	compose(e) {
		return this.empty ? e : e.empty ? this : Xs(this, e, !0);
	}
	map(e, t = !1) {
		return e.empty ? this : Ys(this, e, t, !0);
	}
	iterChanges(e, t = !1) {
		Js(this, e, t);
	}
	get desc() {
		return Ws.create(this.sections);
	}
	filter(t) {
		let n = [], r = [], i = [], a = new Zs(this);
		e: for (let e = 0, o = 0;;) {
			let s = e == t.length ? 1e9 : t[e++];
			for (; o < s || o == s && a.len == 0;) {
				if (a.done) break e;
				let e = Math.min(a.len, s - o);
				Ks(i, e, -1);
				let t = a.ins == -1 ? -1 : a.off == 0 ? a.ins : 0;
				Ks(n, e, t), t > 0 && qs(r, n, a.text), a.forward(e), o += e;
			}
			let c = t[e++];
			for (; o < c;) {
				if (a.done) break e;
				let e = Math.min(a.len, c - o);
				Ks(n, e, -1), Ks(i, e, a.ins == -1 ? -1 : a.off == 0 ? a.ins : 0), a.forward(e), o += e;
			}
		}
		return {
			changes: new e(n, r),
			filtered: Ws.create(i)
		};
	}
	toJSON() {
		let e = [];
		for (let t = 0; t < this.sections.length; t += 2) {
			let n = this.sections[t], r = this.sections[t + 1];
			r < 0 ? e.push(n) : r == 0 ? e.push([n]) : e.push([n].concat(this.inserted[t >> 1].toJSON()));
		}
		return e;
	}
	static of(t, n, r) {
		let i = [], a = [], o = 0, s = null;
		function c(t = !1) {
			if (!t && !i.length) return;
			o < n && Ks(i, n - o, -1);
			let r = new e(i, a);
			s = s ? s.compose(r.map(s)) : r, i = [], a = [], o = 0;
		}
		function l(t) {
			if (Array.isArray(t)) for (let e of t) l(e);
			else if (t instanceof e) {
				if (t.length != n) throw RangeError(`Mismatched change set length (got ${t.length}, expected ${n})`);
				c(), s = s ? s.compose(t.map(s)) : t;
			} else {
				let { from: e, to: s = e, insert: l } = t;
				if (e > s || e < 0 || s > n) throw RangeError(`Invalid change range ${e} to ${s} (in doc of length ${n})`);
				let u = l ? typeof l == "string" ? R.of(l.split(r || Hs)) : l : R.empty, d = u.length;
				if (e == s && d == 0) return;
				e < o && c(), e > o && Ks(i, e - o, -1), Ks(i, s - e, d), qs(a, i, u), o = s;
			}
		}
		return l(t), c(!s), s;
	}
	static empty(t) {
		return new e(t ? [t, -1] : [], []);
	}
	static fromJSON(t) {
		if (!Array.isArray(t)) throw RangeError("Invalid JSON representation of ChangeSet");
		let n = [], r = [];
		for (let e = 0; e < t.length; e++) {
			let i = t[e];
			if (typeof i == "number") n.push(i, -1);
			else if (!Array.isArray(i) || typeof i[0] != "number" || i.some((e, t) => t && typeof e != "string")) throw RangeError("Invalid JSON representation of ChangeSet");
			else if (i.length == 1) n.push(i[0], 0);
			else {
				for (; r.length < e;) r.push(R.empty);
				r[e] = R.of(i.slice(1)), n.push(i[0], r[e].length);
			}
		}
		return new e(n, r);
	}
	static createSet(t, n) {
		return new e(t, n);
	}
};
function Ks(e, t, n, r = !1) {
	if (t == 0 && n <= 0) return;
	let i = e.length - 2;
	i >= 0 && n <= 0 && n == e[i + 1] ? e[i] += t : i >= 0 && t == 0 && e[i] == 0 ? e[i + 1] += n : r ? (e[i] += t, e[i + 1] += n) : e.push(t, n);
}
function qs(e, t, n) {
	if (n.length == 0) return;
	let r = t.length - 2 >> 1;
	if (r < e.length) e[e.length - 1] = e[e.length - 1].append(n);
	else {
		for (; e.length < r;) e.push(R.empty);
		e.push(n);
	}
}
function Js(e, t, n) {
	let r = e.inserted;
	for (let i = 0, a = 0, o = 0; o < e.sections.length;) {
		let s = e.sections[o++], c = e.sections[o++];
		if (c < 0) i += s, a += s;
		else {
			let l = i, u = a, d = R.empty;
			for (; l += s, u += c, c && r && (d = d.append(r[o - 2 >> 1])), !(n || o == e.sections.length || e.sections[o + 1] < 0);) s = e.sections[o++], c = e.sections[o++];
			t(i, l, a, u, d), i = l, a = u;
		}
	}
}
function Ys(e, t, n, r = !1) {
	let i = [], a = r ? [] : null, o = new Zs(e), s = new Zs(t);
	for (let e = -1;;) if (o.done && s.len || s.done && o.len) throw Error("Mismatched change set lengths");
	else if (o.ins == -1 && s.ins == -1) {
		let e = Math.min(o.len, s.len);
		Ks(i, e, -1), o.forward(e), s.forward(e);
	} else if (s.ins >= 0 && (o.ins < 0 || e == o.i || o.off == 0 && (s.len < o.len || s.len == o.len && !n))) {
		let t = s.len;
		for (Ks(i, s.ins, -1); t;) {
			let n = Math.min(o.len, t);
			o.ins >= 0 && e < o.i && o.len <= n && (Ks(i, 0, o.ins), a && qs(a, i, o.text), e = o.i), o.forward(n), t -= n;
		}
		s.next();
	} else if (o.ins >= 0) {
		let t = 0, n = o.len;
		for (; n;) if (s.ins == -1) {
			let e = Math.min(n, s.len);
			t += e, n -= e, s.forward(e);
		} else if (s.ins == 0 && s.len < n) n -= s.len, s.next();
		else break;
		Ks(i, t, e < o.i ? o.ins : 0), a && e < o.i && qs(a, i, o.text), e = o.i, o.forward(o.len - n);
	} else if (o.done && s.done) return a ? Gs.createSet(i, a) : Ws.create(i);
	else throw Error("Mismatched change set lengths");
}
function Xs(e, t, n = !1) {
	let r = [], i = n ? [] : null, a = new Zs(e), o = new Zs(t);
	for (let e = !1;;) if (a.done && o.done) return i ? Gs.createSet(r, i) : Ws.create(r);
	else if (a.ins == 0) Ks(r, a.len, 0, e), a.next();
	else if (o.len == 0 && !o.done) Ks(r, 0, o.ins, e), i && qs(i, r, o.text), o.next();
	else if (a.done || o.done) throw Error("Mismatched change set lengths");
	else {
		let t = Math.min(a.len2, o.len), n = r.length;
		if (a.ins == -1) {
			let n = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
			Ks(r, t, n, e), i && n && qs(i, r, o.text);
		} else o.ins == -1 ? (Ks(r, a.off ? 0 : a.len, t, e), i && qs(i, r, a.textBit(t))) : (Ks(r, a.off ? 0 : a.len, o.off ? 0 : o.ins, e), i && !o.off && qs(i, r, o.text));
		e = (a.ins > t || o.ins >= 0 && o.len > t) && (e || r.length > n), a.forward2(t), o.forward(t);
	}
}
var Zs = class {
	constructor(e) {
		this.set = e, this.i = 0, this.next();
	}
	next() {
		let { sections: e } = this.set;
		this.i < e.length ? (this.len = e[this.i++], this.ins = e[this.i++]) : (this.len = 0, this.ins = -2), this.off = 0;
	}
	get done() {
		return this.ins == -2;
	}
	get len2() {
		return this.ins < 0 ? this.len : this.ins;
	}
	get text() {
		let { inserted: e } = this.set, t = this.i - 2 >> 1;
		return t >= e.length ? R.empty : e[t];
	}
	textBit(e) {
		let { inserted: t } = this.set, n = this.i - 2 >> 1;
		return n >= t.length && !e ? R.empty : t[n].slice(this.off, e == null ? void 0 : this.off + e);
	}
	forward(e) {
		e == this.len ? this.next() : (this.len -= e, this.off += e);
	}
	forward2(e) {
		this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
	}
}, Qs = class e {
	constructor(e, t, n, r) {
		this.from = e, this.to = t, this.flags = n, this.goalColumn = r;
	}
	get anchor() {
		return this.flags & 32 ? this.to : this.from;
	}
	get head() {
		return this.flags & 32 ? this.from : this.to;
	}
	get empty() {
		return this.from == this.to;
	}
	get assoc() {
		return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
	}
	get undirectional() {
		return (this.flags & 64) > 0;
	}
	get bidiLevel() {
		let e = this.flags & 7;
		return e == 7 ? null : e;
	}
	map(t, n = -1) {
		let r, i;
		return this.empty ? r = i = t.mapPos(this.from, n) : (r = t.mapPos(this.from, 1), i = t.mapPos(this.to, -1)), r == this.from && i == this.to ? this : new e(r, i, this.flags, this.goalColumn);
	}
	extend(e, t = e, n = 0) {
		if (e <= this.anchor && t >= this.anchor) return z.range(e, t, void 0, void 0, n);
		let r = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
		return z.range(this.anchor, r, void 0, void 0, n);
	}
	eq(e, t = !1) {
		return this.anchor == e.anchor && this.head == e.head && this.goalColumn == e.goalColumn && (!t || !this.empty || this.assoc == e.assoc);
	}
	toJSON() {
		return {
			anchor: this.anchor,
			head: this.head
		};
	}
	static fromJSON(e) {
		if (!e || typeof e.anchor != "number" || typeof e.head != "number") throw RangeError("Invalid JSON representation for SelectionRange");
		return z.range(e.anchor, e.head);
	}
	static create(t, n, r, i) {
		return new e(t, n, r, i);
	}
}, z = class e {
	constructor(e, t) {
		this.ranges = e, this.mainIndex = t;
	}
	map(t, n = -1) {
		return t.empty ? this : e.create(this.ranges.map((e) => e.map(t, n)), this.mainIndex);
	}
	eq(e, t = !1) {
		if (this.ranges.length != e.ranges.length || this.mainIndex != e.mainIndex) return !1;
		for (let n = 0; n < this.ranges.length; n++) if (!this.ranges[n].eq(e.ranges[n], t)) return !1;
		return !0;
	}
	get main() {
		return this.ranges[this.mainIndex];
	}
	asSingle() {
		return this.ranges.length == 1 ? this : new e([this.main], 0);
	}
	addRange(t, n = !0) {
		return e.create([t].concat(this.ranges), n ? 0 : this.mainIndex + 1);
	}
	replaceRange(t, n = this.mainIndex) {
		let r = this.ranges.slice();
		return r[n] = t, e.create(r, this.mainIndex);
	}
	toJSON() {
		return {
			ranges: this.ranges.map((e) => e.toJSON()),
			main: this.mainIndex
		};
	}
	static fromJSON(t) {
		if (!t || !Array.isArray(t.ranges) || typeof t.main != "number" || t.main >= t.ranges.length) throw RangeError("Invalid JSON representation for EditorSelection");
		return new e(t.ranges.map((e) => Qs.fromJSON(e)), t.main);
	}
	static single(t, n = t) {
		return new e([e.range(t, n)], 0);
	}
	static create(t, n = 0) {
		if (t.length == 0) throw RangeError("A selection needs at least one range");
		for (let r = 0, i = 0; i < t.length; i++) {
			let a = t[i];
			if (a.empty ? a.from <= r : a.from < r) return e.normalized(t.slice(), n);
			r = a.to;
		}
		return new e(t, n);
	}
	static cursor(e, t = 0, n, r) {
		return Qs.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (n == null ? 7 : Math.min(6, n)), r);
	}
	static range(e, t, n, r, i) {
		let a = r == null ? 7 : Math.min(6, r);
		return !i && e != t && (i = t < e ? 1 : -1), i && (a |= i < 0 ? 8 : 16), t < e ? Qs.create(t, e, a | 32, n) : Qs.create(e, t, a, n);
	}
	static undirectionalRange(e, t) {
		return Qs.create(e, t, 64, void 0);
	}
	static normalized(t, n = 0) {
		let r = t[n];
		t.sort((e, t) => e.from - t.from), n = t.indexOf(r);
		for (let r = 1; r < t.length; r++) {
			let i = t[r], a = t[r - 1];
			if (i.empty ? i.from <= a.to : i.from < a.to) {
				let o = a.from, s = Math.max(i.to, a.to);
				r <= n && n--, t.splice(--r, 2, i.anchor > i.head ? e.range(s, o) : e.range(o, s));
			}
		}
		return new e(t, n);
	}
};
function $s(e, t) {
	for (let n of e.ranges) if (n.to > t) throw RangeError("Selection points outside of document");
}
var ec = 0, B = class e {
	constructor(e, t, n, r, i) {
		this.combine = e, this.compareInput = t, this.compare = n, this.isStatic = r, this.id = ec++, this.default = e([]), this.extensions = typeof i == "function" ? i(this) : i;
	}
	get reader() {
		return this;
	}
	static define(t = {}) {
		return new e(t.combine || ((e) => e), t.compareInput || ((e, t) => e === t), t.compare || (t.combine ? (e, t) => e === t : tc), !!t.static, t.enables);
	}
	of(e) {
		return new nc([], this, 0, e);
	}
	compute(e, t) {
		if (this.isStatic) throw Error("Can't compute a static facet");
		return new nc(e, this, 1, t);
	}
	computeN(e, t) {
		if (this.isStatic) throw Error("Can't compute a static facet");
		return new nc(e, this, 2, t);
	}
	from(e, t) {
		return t ||= (e) => e, this.compute([e], (n) => t(n.field(e)));
	}
};
function tc(e, t) {
	return e == t || e.length == t.length && e.every((e, n) => e === t[n]);
}
var nc = class {
	constructor(e, t, n, r) {
		this.dependencies = e, this.facet = t, this.type = n, this.value = r, this.id = ec++;
	}
	dynamicSlot(e) {
		let t = this.value, n = this.facet.compareInput, r = this.id, i = e[r] >> 1, a = this.type == 2, o = !1, s = !1, c = [];
		for (let t of this.dependencies) t == "doc" ? o = !0 : t == "selection" ? s = !0 : (e[t.id] ?? 1) & 1 || c.push(e[t.id]);
		return {
			create(e) {
				return e.values[i] = t(e), 1;
			},
			update(e, r) {
				if (o && r.docChanged || s && (r.docChanged || r.selection) || ic(e, c)) {
					let r = t(e);
					if (a ? !rc(r, e.values[i], n) : !n(r, e.values[i])) return e.values[i] = r, 1;
				}
				return 0;
			},
			reconfigure: (e, o) => {
				let s, c = o.config.address[r];
				if (c != null) {
					let r = _c(o, c);
					if (this.dependencies.every((t) => t instanceof B ? o.facet(t) === e.facet(t) : t instanceof sc ? o.field(t, !1) == e.field(t, !1) : !0) || (a ? rc(s = t(e), r, n) : n(s = t(e), r))) return e.values[i] = r, 0;
				} else s = t(e);
				return e.values[i] = s, 1;
			}
		};
	}
	get extension() {
		return this;
	}
};
function rc(e, t, n) {
	if (e.length != t.length) return !1;
	for (let r = 0; r < e.length; r++) if (!n(e[r], t[r])) return !1;
	return !0;
}
function ic(e, t) {
	let n = !1;
	for (let r of t) gc(e, r) & 1 && (n = !0);
	return n;
}
function ac(e, t, n) {
	let r = n.map((t) => e[t.id]), i = n.map((e) => e.type), a = r.filter((e) => !(e & 1)), o = e[t.id] >> 1;
	function s(e) {
		let n = [];
		for (let t = 0; t < r.length; t++) {
			let a = _c(e, r[t]);
			if (i[t] == 2) for (let e of a) n.push(e);
			else n.push(a);
		}
		return t.combine(n);
	}
	return {
		create(e) {
			for (let t of r) gc(e, t);
			return e.values[o] = s(e), 1;
		},
		update(e, n) {
			if (!ic(e, a)) return 0;
			let r = s(e);
			return t.compare(r, e.values[o]) ? 0 : (e.values[o] = r, 1);
		},
		reconfigure(e, i) {
			let a = ic(e, r), c = i.config.facets[t.id], l = i.facet(t);
			if (c && !a && tc(n, c)) return e.values[o] = l, 0;
			let u = s(e);
			return t.compare(u, l) ? (e.values[o] = l, 0) : (e.values[o] = u, 1);
		}
	};
}
var oc = /*@__PURE__*/ B.define({ static: !0 }), sc = class e {
	constructor(e, t, n, r, i) {
		this.id = e, this.createF = t, this.updateF = n, this.compareF = r, this.spec = i, this.provides = void 0;
	}
	static define(t) {
		let n = new e(ec++, t.create, t.update, t.compare || ((e, t) => e === t), t);
		return t.provide && (n.provides = t.provide(n)), n;
	}
	create(e) {
		return (e.facet(oc).find((e) => e.field == this)?.create || this.createF)(e);
	}
	slot(e) {
		let t = e[this.id] >> 1;
		return {
			create: (e) => (e.values[t] = this.create(e), 1),
			update: (e, n) => {
				let r = e.values[t], i = this.updateF(r, n);
				return this.compareF(r, i) ? 0 : (e.values[t] = i, 1);
			},
			reconfigure: (e, n) => {
				let r = e.facet(oc), i = n.facet(oc), a;
				return (a = r.find((e) => e.field == this)) && a != i.find((e) => e.field == this) ? (e.values[t] = a.create(e), 1) : n.config.address[this.id] == null ? (e.values[t] = this.create(e), 1) : (e.values[t] = n.field(this), 0);
			}
		};
	}
	init(e) {
		return [this, oc.of({
			field: this,
			create: e
		})];
	}
	get extension() {
		return this;
	}
}, cc = {
	lowest: 4,
	low: 3,
	default: 2,
	high: 1,
	highest: 0
};
function lc(e) {
	return (t) => new dc(t, e);
}
var uc = {
	highest: /*@__PURE__*/ lc(cc.highest),
	high: /*@__PURE__*/ lc(cc.high),
	default: /*@__PURE__*/ lc(cc.default),
	low: /*@__PURE__*/ lc(cc.low),
	lowest: /*@__PURE__*/ lc(cc.lowest)
}, dc = class {
	constructor(e, t) {
		this.inner = e, this.prec = t;
	}
	get extension() {
		return this;
	}
}, fc = class e {
	of(e) {
		return new pc(this, e);
	}
	reconfigure(t) {
		return e.reconfigure.of({
			compartment: this,
			extension: t
		});
	}
	get(e) {
		return e.config.compartments.get(this);
	}
}, pc = class {
	constructor(e, t) {
		this.compartment = e, this.inner = t;
	}
	get extension() {
		return this;
	}
}, mc = class e {
	constructor(e, t, n, r, i, a) {
		for (this.base = e, this.compartments = t, this.dynamicSlots = n, this.address = r, this.staticValues = i, this.facets = a, this.statusTemplate = []; this.statusTemplate.length < n.length;) this.statusTemplate.push(0);
	}
	staticFacet(e) {
		let t = this.address[e.id];
		return t == null ? e.default : this.staticValues[t >> 1];
	}
	static resolve(t, n, r) {
		let i = [], a = Object.create(null), o = /* @__PURE__ */ new Map();
		for (let e of hc(t, n, o)) e instanceof sc ? i.push(e) : (a[e.facet.id] || (a[e.facet.id] = [])).push(e);
		let s = Object.create(null), c = [], l = [];
		for (let e of i) s[e.id] = l.length << 1, l.push((t) => e.slot(t));
		let u = r?.config.facets;
		for (let e in a) {
			let t = a[e], n = t[0].facet, i = u && u[e] || [];
			if (t.every((e) => e.type == 0)) {
				if (s[n.id] = c.length << 1 | 1, tc(i, t)) c.push(r.facet(n));
				else {
					let e = n.combine(t.map((e) => e.value));
					c.push(r && n.compare(e, r.facet(n)) ? r.facet(n) : e);
				}
			} else {
				for (let e of t) e.type == 0 ? (s[e.id] = c.length << 1 | 1, c.push(e.value)) : (s[e.id] = l.length << 1, l.push((t) => e.dynamicSlot(t)));
				s[n.id] = l.length << 1, l.push((e) => ac(e, n, t));
			}
		}
		let d = l.map((e) => e(s));
		return new e(t, o, d, s, c, a);
	}
};
function hc(e, t, n) {
	let r = [
		[],
		[],
		[],
		[],
		[]
	], i = /* @__PURE__ */ new Map();
	function a(e, o) {
		let s = i.get(e);
		if (s != null) {
			if (s <= o) return;
			let t = r[s].indexOf(e);
			t > -1 && r[s].splice(t, 1), e instanceof pc && n.delete(e.compartment);
		}
		if (i.set(e, o), Array.isArray(e)) for (let t of e) a(t, o);
		else if (e instanceof pc) {
			if (n.has(e.compartment)) throw RangeError("Duplicate use of compartment in extensions");
			let r = t.get(e.compartment) || e.inner;
			n.set(e.compartment, r), a(r, o);
		} else if (e instanceof dc) a(e.inner, e.prec);
		else if (e instanceof sc) r[o].push(e), e.provides && a(e.provides, o);
		else if (e instanceof nc) r[o].push(e), e.facet.extensions && a(e.facet.extensions, cc.default);
		else {
			let t = e.extension;
			if (!t) throw Error(`Unrecognized extension value in extension set (${e}).`);
			if (t == e) throw Error(`Unrecognized extension value in extension set (${e}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
			a(t, o);
		}
	}
	return a(e, cc.default), r.reduce((e, t) => e.concat(t));
}
function gc(e, t) {
	if (t & 1) return 2;
	let n = t >> 1, r = e.status[n];
	if (r == 4) throw Error("Cyclic dependency between fields and/or facets");
	if (r & 2) return r;
	e.status[n] = 4;
	let i = e.computeSlot(e, e.config.dynamicSlots[n]);
	return e.status[n] = 2 | i;
}
function _c(e, t) {
	return t & 1 ? e.config.staticValues[t >> 1] : e.values[t >> 1];
}
var vc = /*@__PURE__*/ B.define(), yc = /*@__PURE__*/ B.define({
	combine: (e) => e.some((e) => e),
	static: !0
}), bc = /*@__PURE__*/ B.define({
	combine: (e) => e.length ? e[0] : void 0,
	static: !0
}), xc = /*@__PURE__*/ B.define(), Sc = /*@__PURE__*/ B.define(), Cc = /*@__PURE__*/ B.define(), wc = /*@__PURE__*/ B.define({ combine: (e) => e.length ? e[0] : !1 }), Tc = class {
	constructor(e, t) {
		this.type = e, this.value = t;
	}
	static define() {
		return new Ec();
	}
}, Ec = class {
	of(e) {
		return new Tc(this, e);
	}
}, Dc = class {
	constructor(e) {
		this.map = e;
	}
	of(e) {
		return new Oc(this, e);
	}
}, Oc = class e {
	constructor(e, t) {
		this.type = e, this.value = t;
	}
	map(t) {
		let n = this.type.map(this.value, t);
		return n === void 0 ? void 0 : n == this.value ? this : new e(this.type, n);
	}
	is(e) {
		return this.type == e;
	}
	static define(e = {}) {
		return new Dc(e.map || ((e) => e));
	}
	static mapEffects(e, t) {
		if (!e.length) return e;
		let n = [];
		for (let r of e) {
			let e = r.map(t);
			e && n.push(e);
		}
		return n;
	}
};
Oc.reconfigure = /*@__PURE__*/ Oc.define(), Oc.appendConfig = /*@__PURE__*/ Oc.define();
var kc = class e {
	constructor(t, n, r, i, a, o) {
		this.startState = t, this.changes = n, this.selection = r, this.effects = i, this.annotations = a, this.scrollIntoView = o, this._doc = null, this._state = null, r && $s(r, n.newLength), a.some((t) => t.type == e.time) || (this.annotations = a.concat(e.time.of(Date.now())));
	}
	static create(t, n, r, i, a, o) {
		return new e(t, n, r, i, a, o);
	}
	get newDoc() {
		return this._doc ||= this.changes.apply(this.startState.doc);
	}
	get newSelection() {
		return this.selection || this.startState.selection.map(this.changes);
	}
	get state() {
		return this._state || this.startState.applyTransaction(this), this._state;
	}
	annotation(e) {
		for (let t of this.annotations) if (t.type == e) return t.value;
	}
	get docChanged() {
		return !this.changes.empty;
	}
	get reconfigured() {
		return this.startState.config != this.state.config;
	}
	isUserEvent(t) {
		let n = this.annotation(e.userEvent);
		return !!(n && (n == t || n.length > t.length && n.slice(0, t.length) == t && n[t.length] == "."));
	}
};
kc.time = /*@__PURE__*/ Tc.define(), kc.userEvent = /*@__PURE__*/ Tc.define(), kc.addToHistory = /*@__PURE__*/ Tc.define(), kc.remote = /*@__PURE__*/ Tc.define();
function Ac(e, t) {
	let n = [];
	for (let r = 0, i = 0;;) {
		let a, o;
		if (r < e.length && (i == t.length || t[i] >= e[r])) a = e[r++], o = e[r++];
		else if (i < t.length) a = t[i++], o = t[i++];
		else return n;
		!n.length || n[n.length - 1] < a ? n.push(a, o) : n[n.length - 1] < o && (n[n.length - 1] = o);
	}
}
function jc(e, t, n) {
	let r, i, a;
	return n ? (r = t.changes, i = Gs.empty(t.changes.length), a = e.changes.compose(t.changes)) : (r = t.changes.map(e.changes), i = e.changes.mapDesc(t.changes, !0), a = e.changes.compose(r)), {
		changes: a,
		selection: t.selection ? t.selection.map(i) : e.selection?.map(r),
		effects: Oc.mapEffects(e.effects, r).concat(Oc.mapEffects(t.effects, i)),
		annotations: e.annotations.length ? e.annotations.concat(t.annotations) : t.annotations,
		scrollIntoView: e.scrollIntoView || t.scrollIntoView
	};
}
function Mc(e, t, n) {
	let r = t.selection, i = Lc(t.annotations);
	return t.userEvent && (i = i.concat(kc.userEvent.of(t.userEvent))), {
		changes: t.changes instanceof Gs ? t.changes : Gs.of(t.changes || [], n, e.facet(bc)),
		selection: r && (r instanceof z ? r : z.single(r.anchor, r.head)),
		effects: Lc(t.effects),
		annotations: i,
		scrollIntoView: !!t.scrollIntoView
	};
}
function Nc(e, t, n) {
	let r = Mc(e, t.length ? t[0] : {}, e.doc.length);
	t.length && t[0].filter === !1 && (n = !1);
	for (let i = 1; i < t.length; i++) {
		t[i].filter === !1 && (n = !1);
		let a = !!t[i].sequential;
		r = jc(r, Mc(e, t[i], a ? r.changes.newLength : e.doc.length), a);
	}
	let i = kc.create(e, r.changes, r.selection, r.effects, r.annotations, r.scrollIntoView);
	return Fc(n ? Pc(i) : i);
}
function Pc(e) {
	let t = e.startState, n = !0;
	for (let r of t.facet(xc)) {
		let t = r(e);
		if (t === !1) {
			n = !1;
			break;
		}
		Array.isArray(t) && (n = n === !0 ? t : Ac(n, t));
	}
	if (n !== !0) {
		let r, i;
		if (n === !1) i = e.changes.invertedDesc, r = Gs.empty(t.doc.length);
		else {
			let t = e.changes.filter(n);
			r = t.changes, i = t.filtered.mapDesc(t.changes).invertedDesc;
		}
		e = kc.create(t, r, e.selection && e.selection.map(i), Oc.mapEffects(e.effects, i), e.annotations, e.scrollIntoView);
	}
	let r = t.facet(Sc);
	for (let n = r.length - 1; n >= 0; n--) {
		let i = r[n](e);
		e = i instanceof kc ? i : Array.isArray(i) && i.length == 1 && i[0] instanceof kc ? i[0] : Nc(t, Lc(i), !1);
	}
	return e;
}
function Fc(e) {
	let t = e.startState, n = t.facet(Cc), r = e;
	for (let i = n.length - 1; i >= 0; i--) {
		let a = n[i](e);
		a && Object.keys(a).length && (r = jc(r, Mc(t, a, e.changes.newLength), !0));
	}
	return r == e ? e : kc.create(t, e.changes, e.selection, r.effects, r.annotations, r.scrollIntoView);
}
var Ic = [];
function Lc(e) {
	return e == null ? Ic : Array.isArray(e) ? e : [e];
}
var Rc = /*@__PURE__*/ (function(e) {
	return e[e.Word = 0] = "Word", e[e.Space = 1] = "Space", e[e.Other = 2] = "Other", e;
})(Rc ||= {}), zc = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/, Bc;
try {
	Bc = /*@__PURE__*/ RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {}
function Vc(e) {
	if (Bc) return Bc.test(e);
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (/\w/.test(n) || n > "" && (n.toUpperCase() != n.toLowerCase() || zc.test(n))) return !0;
	}
	return !1;
}
function Hc(e) {
	return (t) => {
		if (!/\S/.test(t)) return Rc.Space;
		if (Vc(t)) return Rc.Word;
		for (let n = 0; n < e.length; n++) if (t.indexOf(e[n]) > -1) return Rc.Word;
		return Rc.Other;
	};
}
var Uc = class e {
	constructor(e, t, n, r, i, a) {
		this.config = e, this.doc = t, this.selection = n, this.values = r, this.status = e.statusTemplate.slice(), this.computeSlot = i, a && (a._state = this);
		for (let e = 0; e < this.config.dynamicSlots.length; e++) gc(this, e << 1);
		this.computeSlot = null;
	}
	field(e, t = !0) {
		let n = this.config.address[e.id];
		if (n == null) {
			if (t) throw RangeError("Field is not present in this state");
		} else return gc(this, n), _c(this, n);
	}
	update(...e) {
		return Nc(this, e, !0);
	}
	applyTransaction(t) {
		let n = this.config, { base: r, compartments: i } = n;
		for (let e of t.effects) e.is(fc.reconfigure) ? (n &&= (i = /* @__PURE__ */ new Map(), n.compartments.forEach((e, t) => i.set(t, e)), null), i.set(e.value.compartment, e.value.extension)) : e.is(Oc.reconfigure) ? (n = null, r = e.value) : e.is(Oc.appendConfig) && (n = null, r = Lc(r).concat(e.value));
		let a;
		n ? a = t.startState.values.slice() : (n = mc.resolve(r, i, this), a = new e(n, this.doc, this.selection, n.dynamicSlots.map(() => null), (e, t) => t.reconfigure(e, this), null).values);
		let o = t.startState.facet(yc) ? t.newSelection : t.newSelection.asSingle();
		new e(n, t.newDoc, o, a, (e, n) => n.update(e, t), t);
	}
	replaceSelection(e) {
		return typeof e == "string" && (e = this.toText(e)), this.changeByRange((t) => ({
			changes: {
				from: t.from,
				to: t.to,
				insert: e
			},
			range: z.cursor(t.from + e.length, -1)
		}));
	}
	changeByRange(e) {
		let t = this.selection, n = e(t.ranges[0]), r = this.changes(n.changes), i = [n.range], a = Lc(n.effects);
		for (let n = 1; n < t.ranges.length; n++) {
			let o = e(t.ranges[n]), s = this.changes(o.changes), c = s.map(r);
			for (let e = 0; e < n; e++) i[e] = i[e].map(c);
			let l = r.mapDesc(s, !0);
			i.push(o.range.map(l)), r = r.compose(c), a = Oc.mapEffects(a, c).concat(Oc.mapEffects(Lc(o.effects), l));
		}
		return {
			changes: r,
			selection: z.create(i, t.mainIndex),
			effects: a
		};
	}
	changes(t = []) {
		return t instanceof Gs ? t : Gs.of(t, this.doc.length, this.facet(e.lineSeparator));
	}
	toText(t) {
		return R.of(t.split(this.facet(e.lineSeparator) || Hs));
	}
	sliceDoc(e = 0, t = this.doc.length) {
		return this.doc.sliceString(e, t, this.lineBreak);
	}
	facet(e) {
		let t = this.config.address[e.id];
		return t == null ? e.default : (gc(this, t), _c(this, t));
	}
	toJSON(e) {
		let t = {
			doc: this.sliceDoc(),
			selection: this.selection.toJSON()
		};
		if (e) for (let n in e) {
			let r = e[n];
			r instanceof sc && this.config.address[r.id] != null && (t[n] = r.spec.toJSON(this.field(e[n]), this));
		}
		return t;
	}
	static fromJSON(t, n = {}, r) {
		if (!t || typeof t.doc != "string") throw RangeError("Invalid JSON representation for EditorState");
		let i = [];
		if (r) {
			for (let e in r) if (Object.prototype.hasOwnProperty.call(t, e)) {
				let n = r[e], a = t[e];
				i.push(n.init((e) => n.spec.fromJSON(a, e)));
			}
		}
		return e.create({
			doc: t.doc,
			selection: z.fromJSON(t.selection),
			extensions: n.extensions ? i.concat([n.extensions]) : i
		});
	}
	static create(t = {}) {
		let n = mc.resolve(t.extensions || [], /* @__PURE__ */ new Map()), r = t.doc instanceof R ? t.doc : R.of((t.doc || "").split(n.staticFacet(e.lineSeparator) || Hs)), i = t.selection ? t.selection instanceof z ? t.selection : z.single(t.selection.anchor, t.selection.head) : z.single(0);
		return $s(i, r.length), n.staticFacet(yc) || (i = i.asSingle()), new e(n, r, i, n.dynamicSlots.map(() => null), (e, t) => t.create(e), null);
	}
	get tabSize() {
		return this.facet(e.tabSize);
	}
	get lineBreak() {
		return this.facet(e.lineSeparator) || "\n";
	}
	get readOnly() {
		return this.facet(wc);
	}
	phrase(t, ...n) {
		for (let n of this.facet(e.phrases)) if (Object.prototype.hasOwnProperty.call(n, t)) {
			t = n[t];
			break;
		}
		return n.length && (t = t.replace(/\$(\$|\d*)/g, (e, t) => {
			if (t == "$") return "$";
			let r = +(t || 1);
			return !r || r > n.length ? e : n[r - 1];
		})), t;
	}
	languageDataAt(e, t, n = -1) {
		let r = [];
		for (let i of this.facet(vc)) for (let a of i(this, t, n)) Object.prototype.hasOwnProperty.call(a, e) && r.push(a[e]);
		return r;
	}
	charCategorizer(e) {
		let t = this.languageDataAt("wordChars", e);
		return Hc(t.length ? t[0] : "");
	}
	wordAt(e) {
		let { text: t, from: n, length: r } = this.doc.lineAt(e), i = this.charCategorizer(e), a = e - n, o = e - n;
		for (; a > 0;) {
			let e = Ls(t, a, !1);
			if (i(t.slice(e, a)) != Rc.Word) break;
			a = e;
		}
		for (; o < r;) {
			let e = Ls(t, o);
			if (i(t.slice(o, e)) != Rc.Word) break;
			o = e;
		}
		return a == o ? null : z.range(a + n, o + n);
	}
};
Uc.allowMultipleSelections = yc, Uc.tabSize = /*@__PURE__*/ B.define({ combine: (e) => e.length ? e[0] : 4 }), Uc.lineSeparator = bc, Uc.readOnly = wc, Uc.phrases = /*@__PURE__*/ B.define({ compare(e, t) {
	let n = Object.keys(e), r = Object.keys(t);
	return n.length == r.length && n.every((n) => e[n] == t[n]);
} }), Uc.languageData = vc, Uc.changeFilter = xc, Uc.transactionFilter = Sc, Uc.transactionExtender = Cc, fc.reconfigure = /*@__PURE__*/ Oc.define();
function Wc(e, t, n = {}) {
	let r = {};
	for (let t of e) for (let e of Object.keys(t)) {
		let i = t[e], a = r[e];
		if (a === void 0) r[e] = i;
		else if (a !== i && i !== void 0) {
			if (Object.hasOwnProperty.call(n, e)) r[e] = n[e](a, i);
			else throw Error("Config merge conflict for field " + e);
		}
	}
	for (let e in t) r[e] === void 0 && (r[e] = t[e]);
	return r;
}
var Gc = class {
	eq(e) {
		return this == e;
	}
	range(e, t = e) {
		return qc.create(e, t, this);
	}
};
Gc.prototype.startSide = Gc.prototype.endSide = 0, Gc.prototype.point = !1, Gc.prototype.mapMode = Us.TrackDel;
function Kc(e, t) {
	return e == t || e.constructor == t.constructor && e.eq(t);
}
var qc = class e {
	constructor(e, t, n) {
		this.from = e, this.to = t, this.value = n;
	}
	static create(t, n, r) {
		return new e(t, n, r);
	}
};
function Jc(e, t) {
	return e.from - t.from || e.value.startSide - t.value.startSide;
}
var Yc = class e {
	constructor(e, t, n, r) {
		this.from = e, this.to = t, this.value = n, this.maxPoint = r;
	}
	get length() {
		return Zc(this.to);
	}
	findIndex(e, t, n, r = 0) {
		let i = n ? this.to : this.from;
		for (let a = r, o = i.length;;) {
			if (a == o) return a;
			let r = a + o >> 1, s = i[r] - e || (n ? this.value[r].endSide : this.value[r].startSide) - t;
			if (r == a) return s >= 0 ? a : o;
			s >= 0 ? o = r : a = r + 1;
		}
	}
	between(e, t, n, r) {
		for (let i = this.findIndex(t, -1e9, !0), a = this.findIndex(n, 1e9, !1, i); i < a; i++) if (r(this.from[i] + e, this.to[i] + e, this.value[i]) === !1) return !1;
	}
	map(t, n, r, i, a) {
		let o = [], s = [], c = [], l = -1, u = -1;
		e: for (let e = 0; e < this.value.length; e++) {
			let d = this.value[e], f = this.from[e] + t, p = this.to[e] + t, m, h;
			if (f == p) {
				let e = n.mapPos(f, d.startSide, d.mapMode);
				if (e == null || (m = h = e, d.startSide != d.endSide && (h = n.mapPos(f, d.endSide), h < m))) continue;
			} else if (m = n.mapPos(f, d.startSide), h = n.mapPos(p, d.endSide), m > h || m == h && d.startSide > 0 && d.endSide <= 0) continue;
			if (!((h - m || d.endSide - d.startSide) < 0)) {
				if (l < 0 && (l = m), d.point && (u = Math.max(u, h - m)), (m - r || d.startSide - i) >= 0) o.push(d), s.push(m - l), c.push(h - l), r = h, i = d.endSide;
				else {
					if (m == h) for (let e = o.length; e > 0; e--) {
						if ((m - (c[e - 1] + l) || d.startSide - o[e - 1].endSide) >= 0) {
							o.splice(e, 0, d), s.splice(e, 0, m - l), c.splice(e, 0, h - l);
							continue e;
						}
						if ((m - (s[e - 1] + l) || d.endSide - o[e - 1].startSide) > 0) break;
					}
					a(m, h, d);
				}
			}
		}
		return {
			mapped: o.length ? new e(s, c, o, u) : null,
			pos: l
		};
	}
}, Xc = class e {
	constructor(e, t, n, r) {
		this.chunkPos = e, this.chunk = t, this.nextLayer = n, this.maxPoint = r;
	}
	static create(t, n, r, i) {
		return new e(t, n, r, i);
	}
	get length() {
		let e = this.chunk.length - 1;
		return e < 0 ? 0 : Math.max(this.chunkEnd(e), this.nextLayer.length);
	}
	get size() {
		if (this.isEmpty) return 0;
		let e = this.nextLayer.size;
		for (let t of this.chunk) e += t.value.length;
		return e;
	}
	chunkEnd(e) {
		return this.chunkPos[e] + this.chunk[e].length;
	}
	update(t) {
		let { add: n = [], sort: r = !1, filterFrom: i = 0, filterTo: a = this.length } = t, o = t.filter;
		if (n.length == 0 && !o) return this;
		if (r && (n = n.slice().sort(Jc)), this.isEmpty) return n.length ? e.of(n) : this;
		let s = new tl(this, null, -1).goto(0), c = 0, l = [], u = new $c();
		for (; s.value || c < n.length;) if (c < n.length && (s.from - n[c].from || s.startSide - n[c].value.startSide) >= 0) {
			let e = n[c++];
			u.addInner(e.from, e.to, e.value, !1) || l.push(e);
		} else s.rangeIndex == 1 && s.chunkIndex < this.chunk.length && (c == n.length || this.chunkEnd(s.chunkIndex) < n[c].from) && (!o || i > this.chunkEnd(s.chunkIndex) || a < this.chunkPos[s.chunkIndex]) && u.addChunk(this.chunkPos[s.chunkIndex], this.chunk[s.chunkIndex]) ? s.nextChunk() : ((!o || i > s.to || a < s.from || o(s.from, s.to, s.value)) && (u.addInner(s.from, s.to, s.value, !1) || l.push(qc.create(s.from, s.to, s.value))), s.next());
		return u.finishInner(this.nextLayer.isEmpty && !l.length ? e.empty : this.nextLayer.update({
			add: l,
			filter: o,
			filterFrom: i,
			filterTo: a
		}));
	}
	map(t) {
		if (t.empty || this.isEmpty) return this;
		let n = [], r = [], i = -1, a, o = (e, t, n) => {
			a ||= new $c(), a.addRange(e, t, n, !1);
		};
		for (let e = 0; e < this.chunk.length; e++) {
			let a = this.chunkPos[e], s = this.chunk[e], c = t.touchesRange(a, a + s.length);
			if (c === !1) i = Math.max(i, s.maxPoint), n.push(s), r.push(t.mapPos(a));
			else if (c === !0) {
				let [e, c] = n.length ? [Zc(r) + Zc(n).length, Zc(Zc(n).value).endSide] : [-1, -1], { mapped: l, pos: u } = s.map(a, t, e, c, o);
				l && (i = Math.max(i, l.maxPoint), n.push(l), r.push(u));
			}
		}
		let s = this.nextLayer.map(t);
		return a && (s = a.finishInner(s)), n.length == 0 ? s : new e(r, n, s || e.empty, i);
	}
	between(e, t, n) {
		if (!this.isEmpty) {
			for (let r = 0; r < this.chunk.length; r++) {
				let i = this.chunkPos[r], a = this.chunk[r];
				if (t >= i && e <= i + a.length && a.between(i, e - i, t - i, n) === !1) return;
			}
			this.nextLayer.between(e, t, n);
		}
	}
	iter(e = 0) {
		return nl.from([this]).goto(e);
	}
	get isEmpty() {
		return this.nextLayer == this;
	}
	static iter(e, t = 0) {
		return nl.from(e).goto(t);
	}
	static compare(e, t, n, r, i = -1) {
		let a = e.filter((e) => e.maxPoint > 0 || !e.isEmpty && e.maxPoint >= i), o = t.filter((e) => e.maxPoint > 0 || !e.isEmpty && e.maxPoint >= i), s = el(a, o, n), c = new il(a, s, i), l = new il(o, s, i);
		n.iterGaps((e, t, n) => al(c, e, l, t, n, r)), n.empty && n.length == 0 && al(c, 0, l, 0, 0, r);
	}
	static eq(e, t, n = 0, r) {
		r ??= 1e9 - 1;
		let i = e.filter((e) => !e.isEmpty && t.indexOf(e) < 0), a = t.filter((t) => !t.isEmpty && e.indexOf(t) < 0);
		if (i.length != a.length) return !1;
		if (!i.length) return !0;
		let o = el(i, a), s = new il(i, o, 0).goto(n), c = new il(a, o, 0).goto(n);
		for (;;) {
			if (s.to != c.to || !ol(s.active, c.active) || s.point && (!c.point || !Kc(s.point, c.point))) return !1;
			if (s.to > r) return !0;
			s.next(), c.next();
		}
	}
	static spans(e, t, n, r, i = -1) {
		let a = new il(e, null, i).goto(t), o = t, s = a.openStart;
		for (;;) {
			let e = Math.min(a.to, n);
			if (a.point) {
				let n = a.activeForPoint(a.to), i = a.pointFrom < t ? n.length + 1 : a.point.startSide < 0 ? n.length : Math.min(n.length, s);
				r.point(o, e, a.point, n, i, a.pointRank), s = Math.min(a.openEnd(e), n.length);
			} else e > o && (r.span(o, e, a.active, s), s = a.openEnd(e));
			if (a.to > n) return s + (a.point && a.to > n ? 1 : 0);
			o = a.to, a.next();
		}
	}
	static of(e, t = !1) {
		let n = new $c();
		for (let r of e instanceof qc ? [e] : t ? Qc(e) : e) n.add(r.from, r.to, r.value);
		return n.finish();
	}
	static join(t) {
		if (!t.length) return e.empty;
		let n = Zc(t);
		for (let r = t.length - 2; r >= 0; r--) for (let i = t[r]; i != e.empty; i = i.nextLayer) n = new e(i.chunkPos, i.chunk, n, Math.max(i.maxPoint, n.maxPoint));
		return n;
	}
};
Xc.empty = /*@__PURE__*/ new Xc([], [], null, -1);
function Zc(e) {
	return e[e.length - 1];
}
function Qc(e) {
	if (e.length > 1) for (let t = e[0], n = 1; n < e.length; n++) {
		let r = e[n];
		if (Jc(t, r) > 0) return e.slice().sort(Jc);
		t = r;
	}
	return e;
}
Xc.empty.nextLayer = Xc.empty;
var $c = class e {
	finishChunk(e) {
		this.chunks.push(new Yc(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
	}
	constructor() {
		this.chunks = [], this.chunkPos = [], this.chunkStart = -1, this.last = null, this.lastFrom = -1e9, this.lastTo = -1e9, this.from = [], this.to = [], this.value = [], this.maxPoint = -1, this.setMaxPoint = -1, this.nextLayer = null;
	}
	add(e, t, n) {
		this.addRange(e, t, n, !0);
	}
	addRange(t, n, r, i) {
		this.addInner(t, n, r, i) || (this.nextLayer ||= new e()).addRange(t, n, r, i);
	}
	addInner(e, t, n, r) {
		let i = e - this.lastTo || n.startSide - this.last.endSide;
		if (r && i <= 0 && (e - this.lastFrom || n.startSide - this.last.startSide) < 0) throw Error("Ranges must be added sorted by `from` position and `startSide`");
		return i < 0 ? !1 : (this.from.length == 250 && this.finishChunk(!0), this.chunkStart < 0 && (this.chunkStart = e), this.from.push(e - this.chunkStart), this.to.push(t - this.chunkStart), this.last = n, this.lastFrom = e, this.lastTo = t, this.value.push(n), n.point && (this.maxPoint = Math.max(this.maxPoint, t - e)), !0);
	}
	addChunk(e, t) {
		if ((e - this.lastTo || t.value[0].startSide - this.last.endSide) < 0) return !1;
		this.from.length && this.finishChunk(!0), this.setMaxPoint = Math.max(this.setMaxPoint, t.maxPoint), this.chunks.push(t), this.chunkPos.push(e);
		let n = t.value.length - 1;
		return this.last = t.value[n], this.lastFrom = t.from[n] + e, this.lastTo = t.to[n] + e, !0;
	}
	finish() {
		return this.finishInner(Xc.empty);
	}
	finishInner(e) {
		if (this.from.length && this.finishChunk(!1), this.chunks.length == 0) return e;
		let t = Xc.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
		return this.from = null, t;
	}
};
function el(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	for (let t of e) for (let e = 0; e < t.chunk.length; e++) t.chunk[e].maxPoint <= 0 && r.set(t.chunk[e], t.chunkPos[e]);
	let i = /* @__PURE__ */ new Set();
	for (let e of t) for (let t = 0; t < e.chunk.length; t++) {
		let a = r.get(e.chunk[t]);
		a != null && (n ? n.mapPos(a) : a) == e.chunkPos[t] && !n?.touchesRange(a, a + e.chunk[t].length) && i.add(e.chunk[t]);
	}
	return i;
}
var tl = class {
	constructor(e, t, n, r = 0) {
		this.layer = e, this.skip = t, this.minPoint = n, this.rank = r;
	}
	get startSide() {
		return this.value ? this.value.startSide : 0;
	}
	get endSide() {
		return this.value ? this.value.endSide : 0;
	}
	goto(e, t = -1e9) {
		return this.chunkIndex = this.rangeIndex = 0, this.gotoInner(e, t, !1), this;
	}
	gotoInner(e, t, n) {
		for (; this.chunkIndex < this.layer.chunk.length;) {
			let t = this.layer.chunk[this.chunkIndex];
			if (!(this.skip && this.skip.has(t) || this.layer.chunkEnd(this.chunkIndex) < e || t.maxPoint < this.minPoint)) break;
			this.chunkIndex++, n = !1;
		}
		if (this.chunkIndex < this.layer.chunk.length) {
			let r = this.layer.chunk[this.chunkIndex].findIndex(e - this.layer.chunkPos[this.chunkIndex], t, !0);
			(!n || this.rangeIndex < r) && this.setRangeIndex(r);
		}
		this.next();
	}
	forward(e, t) {
		(this.to - e || this.endSide - t) < 0 && this.gotoInner(e, t, !0);
	}
	next() {
		for (;;) if (this.chunkIndex == this.layer.chunk.length) {
			this.from = this.to = 1e9, this.value = null;
			break;
		} else {
			let e = this.layer.chunkPos[this.chunkIndex], t = this.layer.chunk[this.chunkIndex], n = e + t.from[this.rangeIndex];
			if (this.from = n, this.to = e + t.to[this.rangeIndex], this.value = t.value[this.rangeIndex], this.setRangeIndex(this.rangeIndex + 1), this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint) break;
		}
	}
	setRangeIndex(e) {
		if (e == this.layer.chunk[this.chunkIndex].value.length) {
			if (this.chunkIndex++, this.skip) for (; this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]);) this.chunkIndex++;
			this.rangeIndex = 0;
		} else this.rangeIndex = e;
	}
	nextChunk() {
		this.chunkIndex++, this.rangeIndex = 0, this.next();
	}
	compare(e) {
		return this.from - e.from || this.startSide - e.startSide || this.rank - e.rank || this.to - e.to || this.endSide - e.endSide;
	}
}, nl = class e {
	constructor(e) {
		this.heap = e;
	}
	static from(t, n = null, r = -1) {
		let i = [];
		for (let e = 0; e < t.length; e++) for (let a = t[e]; !a.isEmpty; a = a.nextLayer) a.maxPoint >= r && i.push(new tl(a, n, r, e));
		return i.length == 1 ? i[0] : new e(i);
	}
	get startSide() {
		return this.value ? this.value.startSide : 0;
	}
	goto(e, t = -1e9) {
		for (let n of this.heap) n.goto(e, t);
		for (let e = this.heap.length >> 1; e >= 0; e--) rl(this.heap, e);
		return this.next(), this;
	}
	forward(e, t) {
		for (let n of this.heap) n.forward(e, t);
		for (let e = this.heap.length >> 1; e >= 0; e--) rl(this.heap, e);
		(this.to - e || this.value.endSide - t) < 0 && this.next();
	}
	next() {
		if (this.heap.length == 0) this.from = this.to = 1e9, this.value = null, this.rank = -1;
		else {
			let e = this.heap[0];
			this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), rl(this.heap, 0);
		}
	}
};
function rl(e, t) {
	for (let n = e[t];;) {
		let r = (t << 1) + 1;
		if (r >= e.length) break;
		let i = e[r];
		if (r + 1 < e.length && i.compare(e[r + 1]) >= 0 && (i = e[r + 1], r++), n.compare(i) < 0) break;
		e[r] = n, e[t] = i, t = r;
	}
}
var il = class {
	constructor(e, t, n) {
		this.minPoint = n, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = nl.from(e, t, n);
	}
	goto(e, t = -1e9) {
		return this.cursor.goto(e, t), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = e, this.endSide = t, this.openStart = -1, this.next(), this;
	}
	forward(e, t) {
		for (; this.minActive > -1 && (this.activeTo[this.minActive] - e || this.active[this.minActive].endSide - t) < 0;) this.removeActive(this.minActive);
		this.cursor.forward(e, t);
	}
	removeActive(e) {
		sl(this.active, e), sl(this.activeTo, e), sl(this.activeRank, e), this.minActive = ll(this.active, this.activeTo);
	}
	addActive(e) {
		let t = 0, { value: n, to: r, rank: i } = this.cursor;
		for (; t < this.activeRank.length && (i - this.activeRank[t] || r - this.activeTo[t]) > 0;) t++;
		cl(this.active, t, n), cl(this.activeTo, t, r), cl(this.activeRank, t, i), e && cl(e, t, this.cursor.from), this.minActive = ll(this.active, this.activeTo);
	}
	next() {
		let e = this.to, t = this.point;
		this.point = null;
		let n = this.openStart < 0 ? [] : null;
		for (;;) {
			let r = this.minActive;
			if (r > -1 && (this.activeTo[r] - this.cursor.from || this.active[r].endSide - this.cursor.startSide) < 0) {
				if (this.activeTo[r] > e) {
					this.to = this.activeTo[r], this.endSide = this.active[r].endSide;
					break;
				}
				this.removeActive(r), n && sl(n, r);
			} else if (!this.cursor.value) {
				this.to = this.endSide = 1e9;
				break;
			} else if (this.cursor.from > e) {
				this.to = this.cursor.from, this.endSide = this.cursor.startSide;
				break;
			} else {
				let e = this.cursor.value;
				if (!e.point) this.addActive(n), this.cursor.next();
				else if (t && this.cursor.to == this.to && this.cursor.from < this.cursor.to) this.cursor.next();
				else {
					this.point = e, this.pointFrom = this.cursor.from, this.pointRank = this.cursor.rank, this.to = this.cursor.to, this.endSide = e.endSide, this.cursor.next(), this.forward(this.to, this.endSide);
					break;
				}
			}
		}
		if (n) {
			this.openStart = 0;
			for (let t = n.length - 1; t >= 0 && n[t] < e; t--) this.openStart++;
		}
	}
	activeForPoint(e) {
		if (!this.active.length) return this.active;
		let t = [];
		for (let n = this.active.length - 1; n >= 0 && !(this.activeRank[n] < this.pointRank); n--) (this.activeTo[n] > e || this.activeTo[n] == e && this.active[n].endSide >= this.point.endSide) && t.push(this.active[n]);
		return t.reverse();
	}
	openEnd(e) {
		let t = 0;
		for (let n = this.activeTo.length - 1; n >= 0 && this.activeTo[n] > e; n--) t++;
		return t;
	}
};
function al(e, t, n, r, i, a) {
	e.goto(t), n.goto(r);
	let o = r + i, s = r, c = r - t, l = !!a.boundChange;
	for (let t = !1;;) {
		let r = e.to + c - n.to, i = r || e.endSide - n.endSide, u = i < 0 ? e.to + c : n.to, d = Math.min(u, o);
		if (e.point || n.point ? (e.point && n.point && Kc(e.point, n.point) && ol(e.activeForPoint(e.to), n.activeForPoint(n.to)) || a.comparePoint(s, d, e.point, n.point), t = !1) : (t &&= (a.boundChange(s), !1), d > s && !ol(e.active, n.active) && a.compareRange(s, d, e.active, n.active), l && d < o && (r || e.openEnd(u) != n.openEnd(u)) && (t = !0)), u > o) break;
		s = u, i <= 0 && e.next(), i >= 0 && n.next();
	}
}
function ol(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) if (e[n] != t[n] && !Kc(e[n], t[n])) return !1;
	return !0;
}
function sl(e, t) {
	for (let n = t, r = e.length - 1; n < r; n++) e[n] = e[n + 1];
	e.pop();
}
function cl(e, t, n) {
	for (let n = e.length - 1; n >= t; n--) e[n + 1] = e[n];
	e[t] = n;
}
function ll(e, t) {
	let n = -1, r = 1e9;
	for (let i = 0; i < t.length; i++) (t[i] - r || e[i].endSide - e[n].endSide) < 0 && (n = i, r = t[i]);
	return n;
}
function ul(e, t, n = e.length) {
	let r = 0;
	for (let i = 0; i < n && i < e.length;) e.charCodeAt(i) == 9 ? (r += t - r % t, i++) : (r++, i = Ls(e, i));
	return r;
}
function dl(e, t, n, r) {
	for (let r = 0, i = 0;;) {
		if (i >= t) return r;
		if (r == e.length) break;
		i += e.charCodeAt(r) == 9 ? n - i % n : 1, r = Ls(e, r);
	}
	return r === !0 ? -1 : e.length;
}
// node_modules/style-mod/src/style-mod.js
var fl = "ͼ", pl = typeof Symbol > "u" ? "__ͼ" : Symbol.for(fl), ml = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), hl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {}, gl = class {
	constructor(e, t) {
		this.rules = [];
		let { finish: n } = t || {};
		function r(e, t, i, a) {
			let o = [], s = /^@(\w+)\b/.exec(e[0]), c = s && s[1] == "keyframes";
			if (s && t == null) return i.push(e[0] + ";");
			for (let n in t) {
				let a = t[n];
				if (/&/.test(n)) r(n.split(/,\s*/).map((t) => e.map((e) => t.replace(/&/, e))).reduce((e, t) => e.concat(t)), a, i);
				else if (a && typeof a == "object") {
					if (!s) throw RangeError("The value of a property (" + n + ") should be a primitive value.");
					r(_l(n), a, o, c);
				} else a != null && (/^--/.test(n) || (n = n.replace(/_.*/, "").replace(/[A-Z]/g, (e) => "-" + e.toLowerCase())), o.push(n + ": " + a + ";"));
			}
			(o.length || c) && i.push((n && !s && !a ? e.map(n) : e).join(", ") + " {" + o.join(" ") + "}");
		}
		for (let t in e) r(_l(t), e[t], this.rules);
	}
	getRules() {
		return this.rules.join("\n");
	}
	static newName() {
		let e = hl[pl] || 1;
		return hl[pl] = e + 1, fl + e.toString(36);
	}
	static mount(e, t, n) {
		let r = e[ml], i = n && n.nonce;
		r ? i && r.setNonce(i) : r = new yl(e, i), r.mount(Array.isArray(t) ? t : [t], e);
	}
};
function _l(e) {
	if (/^@/.test(e)) return [e];
	let t = [], n = 0, r = null, i = 0, a = 0;
	for (let o = 0; o < e.length; o++) {
		let s = e[o];
		s == "\\" ? o++ : s == "\"" || s == "'" ? s == r ? r = !1 : r ||= s : (s == "[" || s == "(") && !r ? n++ : (s == "]" || s == ")") && !r ? n-- : s == "," && !n && !r && (t.push(e.slice(a, i)), a = o + 1), /\S/.test(s) ? i = o + 1 : o == a && a++;
	}
	return t.push(e.slice(a, i)), t;
}
for (var vl = /* @__PURE__ */ new Map(), yl = class {
	constructor(e, t) {
		let n = e.ownerDocument || e, r = n.defaultView;
		if (!e.head && e.adoptedStyleSheets && r.CSSStyleSheet) {
			let t = vl.get(n);
			if (t) return e[ml] = t;
			this.sheet = new r.CSSStyleSheet(), vl.set(n, this);
		} else this.styleTag = n.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
		this.modules = [], e[ml] = this;
	}
	mount(e, t) {
		let n = this.sheet, r = 0, i = 0, a = !1;
		for (let t = 0; t < e.length; t++) {
			let o = e[t], s = this.modules.indexOf(o);
			if (s < i && s > -1 && (this.modules.splice(s, 1), a = !0, i--, s = -1), s == -1) {
				if (this.modules.splice(i++, 0, o), a = !0, n) for (let e = 0; e < o.rules.length; e++) n.insertRule(o.rules[e], r++);
			} else {
				for (; i < s;) r += this.modules[i++].rules.length;
				r += o.rules.length, i++;
			}
		}
		if (n) t.adoptedStyleSheets.indexOf(this.sheet) < 0 && (t.adoptedStyleSheets = [this.sheet, ...t.adoptedStyleSheets]);
		else {
			if (a) {
				let e = "";
				for (let t = 0; t < this.modules.length; t++) e += this.modules[t].getRules() + "\n";
				this.styleTag.textContent = e;
			}
			let e = t.head || t;
			this.styleTag.parentNode != e && e.insertBefore(this.styleTag, e.firstChild);
		}
	}
	setNonce(e) {
		this.styleTag && this.styleTag.getAttribute("nonce") != e && this.styleTag.setAttribute("nonce", e);
	}
}, bl = {
	8: "Backspace",
	9: "Tab",
	10: "Enter",
	12: "NumLock",
	13: "Enter",
	16: "Shift",
	17: "Control",
	18: "Alt",
	20: "CapsLock",
	27: "Escape",
	32: " ",
	33: "PageUp",
	34: "PageDown",
	35: "End",
	36: "Home",
	37: "ArrowLeft",
	38: "ArrowUp",
	39: "ArrowRight",
	40: "ArrowDown",
	44: "PrintScreen",
	45: "Insert",
	46: "Delete",
	59: ";",
	61: "=",
	91: "Meta",
	92: "Meta",
	106: "*",
	107: "+",
	108: ",",
	109: "-",
	110: ".",
	111: "/",
	144: "NumLock",
	145: "ScrollLock",
	160: "Shift",
	161: "Shift",
	162: "Control",
	163: "Control",
	164: "Alt",
	165: "Alt",
	173: "-",
	186: ";",
	187: "=",
	188: ",",
	189: "-",
	190: ".",
	191: "/",
	192: "`",
	219: "[",
	220: "\\",
	221: "]",
	222: "'"
}, xl = {
	48: ")",
	49: "!",
	50: "@",
	51: "#",
	52: "$",
	53: "%",
	54: "^",
	55: "&",
	56: "*",
	57: "(",
	59: ":",
	61: "+",
	173: "_",
	186: ":",
	187: "+",
	188: "<",
	189: "_",
	190: ">",
	191: "?",
	192: "~",
	219: "{",
	220: "|",
	221: "}",
	222: "\""
}, Sl = typeof navigator < "u" && /Mac/.test(navigator.platform), Cl = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), wl = 0; wl < 10; wl++) bl[48 + wl] = bl[96 + wl] = String(wl);
for (var wl = 1; wl <= 24; wl++) bl[wl + 111] = "F" + wl;
for (var wl = 65; wl <= 90; wl++) bl[wl] = String.fromCharCode(wl + 32), xl[wl] = String.fromCharCode(wl);
for (var Tl in bl) xl.hasOwnProperty(Tl) || (xl[Tl] = bl[Tl]);
function El(e) {
	var t = !(Sl && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey || Cl && e.shiftKey && e.key && e.key.length == 1 || e.key == "Unidentified") && e.key || (e.shiftKey ? xl : bl)[e.keyCode] || e.key || "Unidentified";
	return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
// node_modules/@codemirror/view/dist/index.js
var Dl = typeof navigator < "u" ? navigator : {
	userAgent: "",
	vendor: "",
	platform: ""
}, Ol = typeof document < "u" ? document : { documentElement: { style: {} } }, kl = /*@__PURE__*/ /Edge\/(\d+)/.exec(Dl.userAgent), Al = /*@__PURE__*/ /MSIE \d/.test(Dl.userAgent), jl = /*@__PURE__*/ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Dl.userAgent), Ml = !!(Al || jl || kl), Nl = !Ml && /*@__PURE__*/ /gecko\/(\d+)/i.test(Dl.userAgent), Pl = !Ml && /*@__PURE__*/ /Chrome\/(\d+)/.exec(Dl.userAgent), Fl = "webkitFontSmoothing" in Ol.documentElement.style, Il = !Ml && /*@__PURE__*/ /Apple Computer/.test(Dl.vendor), Ll = Il && (/*@__PURE__*/ /Mobile\/\w+/.test(Dl.userAgent) || Dl.maxTouchPoints > 2), V = {
	mac: Ll || /*@__PURE__*/ /Mac/.test(Dl.platform),
	windows: /*@__PURE__*/ /Win/.test(Dl.platform),
	linux: /*@__PURE__*/ /Linux|X11/.test(Dl.platform),
	ie: Ml,
	ie_version: Al ? Ol.documentMode || 6 : jl ? +jl[1] : kl ? +kl[1] : 0,
	gecko: Nl,
	gecko_version: Nl ? +(/*@__PURE__*/ /Firefox\/(\d+)/.exec(Dl.userAgent) || [0, 0])[1] : 0,
	chrome: !!Pl,
	chrome_version: Pl ? +Pl[1] : 0,
	ios: Ll,
	android: /*@__PURE__*/ /Android\b/.test(Dl.userAgent),
	webkit: Fl,
	webkit_version: Fl ? +(/*@__PURE__*/ /\bAppleWebKit\/(\d+)/.exec(Dl.userAgent) || [0, 0])[1] : 0,
	safari: Il,
	safari_version: Il ? +(/*@__PURE__*/ /\bVersion\/(\d+(\.\d+)?)/.exec(Dl.userAgent) || [0, 0])[1] : 0,
	tabSize: Ol.documentElement.style.tabSize == null ? "-moz-tab-size" : "tab-size"
};
function Rl(e, t) {
	for (let n in e) n == "class" && t.class ? t.class += " " + e.class : n == "style" && t.style ? t.style += ";" + e.style : t[n] = e[n];
	return t;
}
var zl = /*@__PURE__*/ Object.create(null);
function Bl(e, t, n) {
	if (e == t) return !0;
	e ||= zl, t ||= zl;
	let r = Object.keys(e), i = Object.keys(t);
	if (+r.length != +i.length) return !1;
	for (let a of r) if (a != n && (i.indexOf(a) == -1 || e[a] !== t[a])) return !1;
	return !0;
}
function Vl(e, t) {
	for (let n = e.attributes.length - 1; n >= 0; n--) {
		let r = e.attributes[n].name;
		t[r] ?? e.removeAttribute(r);
	}
	for (let n in t) {
		let r = t[n];
		n == "style" ? e.style.cssText = r : e.getAttribute(n) != r && e.setAttribute(n, r);
	}
}
function Hl(e, t, n) {
	let r = !1;
	if (t) for (let i in t) n && i in n || (r = !0, i == "style" ? e.style.cssText = "" : e.removeAttribute(i));
	if (n) for (let i in n) t && t[i] == n[i] || (r = !0, i == "style" ? e.style.cssText = n[i] : e.setAttribute(i, n[i]));
	return r;
}
function Ul(e) {
	let t = Object.create(null);
	for (let n = 0; n < e.attributes.length; n++) {
		let r = e.attributes[n];
		t[r.name] = r.value;
	}
	return t;
}
var Wl = class {
	eq(e) {
		return !1;
	}
	updateDOM(e, t, n) {
		return !1;
	}
	compare(e) {
		return this == e || this.constructor == e.constructor && this.eq(e);
	}
	get estimatedHeight() {
		return -1;
	}
	get lineBreaks() {
		return 0;
	}
	ignoreEvent(e) {
		return !0;
	}
	coordsAt(e, t, n) {
		return null;
	}
	get isHidden() {
		return !1;
	}
	get editable() {
		return !1;
	}
	destroy(e) {}
}, Gl = /*@__PURE__*/ (function(e) {
	return e[e.Text = 0] = "Text", e[e.WidgetBefore = 1] = "WidgetBefore", e[e.WidgetAfter = 2] = "WidgetAfter", e[e.WidgetRange = 3] = "WidgetRange", e;
})(Gl ||= {}), Kl = class extends Gc {
	constructor(e, t, n, r) {
		super(), this.startSide = e, this.endSide = t, this.widget = n, this.spec = r;
	}
	get heightRelevant() {
		return !1;
	}
	static mark(e) {
		return new ql(e);
	}
	static widget(e) {
		let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), n = !!e.block;
		return t += n && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new Yl(e, t, t, n, e.widget || null, !1);
	}
	static replace(e) {
		let t = !!e.block, n, r;
		if (e.isBlockGap) n = -5e8, r = 4e8;
		else {
			let { start: i, end: a } = Xl(e, t);
			n = (i ? t ? -3e8 : -1 : 5e8) - 1, r = (a ? t ? 2e8 : 1 : -6e8) + 1;
		}
		return new Yl(e, n, r, t, e.widget || null, !0);
	}
	static line(e) {
		return new Jl(e);
	}
	static set(e, t = !1) {
		return Xc.of(e, t);
	}
	hasHeight() {
		return this.widget ? this.widget.estimatedHeight > -1 : !1;
	}
};
Kl.none = Xc.empty;
var ql = class e extends Kl {
	constructor(e) {
		let { start: t, end: n } = Xl(e);
		super(t ? -1 : 5e8, n ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.attrs = e.class && e.attributes ? Rl(e.attributes, { class: e.class }) : e.class ? { class: e.class } : e.attributes || zl;
	}
	eq(t) {
		return this == t || t instanceof e && this.tagName == t.tagName && Bl(this.attrs, t.attrs);
	}
	range(e, t = e) {
		if (e >= t) throw RangeError("Mark decorations may not be empty");
		return super.range(e, t);
	}
};
ql.prototype.point = !1;
var Jl = class e extends Kl {
	constructor(e) {
		super(-2e8, -2e8, null, e);
	}
	eq(t) {
		return t instanceof e && this.spec.class == t.spec.class && Bl(this.spec.attributes, t.spec.attributes);
	}
	range(e, t = e) {
		if (t != e) throw RangeError("Line decoration ranges must be zero-length");
		return super.range(e, t);
	}
};
Jl.prototype.mapMode = Us.TrackBefore, Jl.prototype.point = !0;
var Yl = class e extends Kl {
	constructor(e, t, n, r, i, a) {
		super(t, n, i, e), this.block = r, this.isReplace = a, this.mapMode = r ? t <= 0 ? Us.TrackBefore : Us.TrackAfter : Us.TrackDel;
	}
	get type() {
		return this.startSide == this.endSide ? this.startSide <= 0 ? Gl.WidgetBefore : Gl.WidgetAfter : Gl.WidgetRange;
	}
	get heightRelevant() {
		return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
	}
	eq(t) {
		return t instanceof e && Zl(this.widget, t.widget) && this.block == t.block && this.startSide == t.startSide && this.endSide == t.endSide;
	}
	range(e, t = e) {
		if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0)) throw RangeError("Invalid range for replacement decoration");
		if (!this.isReplace && t != e) throw RangeError("Widget decorations can only have zero-length ranges");
		return super.range(e, t);
	}
};
Yl.prototype.point = !0;
function Xl(e, t = !1) {
	let { inclusiveStart: n, inclusiveEnd: r } = e;
	return n ??= e.inclusive, r ??= e.inclusive, {
		start: n ?? t,
		end: r ?? t
	};
}
function Zl(e, t) {
	return e == t || !!(e && t && e.compare(t));
}
function Ql(e, t, n, r = 0) {
	let i = n.length - 1;
	i >= 0 && n[i] + r >= e ? n[i] = Math.max(n[i], t) : n.push(e, t);
}
var $l = class e extends Gc {
	constructor(e, t, n) {
		super(), this.tagName = e, this.attributes = t, this.rank = n;
	}
	eq(t) {
		return t == this || t instanceof e && this.tagName == t.tagName && Bl(this.attributes, t.attributes);
	}
	static create(t) {
		return new e(t.tagName, t.attributes || zl, t.rank == null ? 50 : Math.max(0, Math.min(t.rank, 100)));
	}
	static set(e, t = !1) {
		return Xc.of(e, t);
	}
};
$l.prototype.startSide = $l.prototype.endSide = -1;
var eu = (e) => e.nodeType == 1, tu = (e) => e.nodeType == 3;
function nu(e) {
	let t;
	return t = e.nodeType == 11 ? e.getSelection ? e : e.ownerDocument : e, t.getSelection();
}
function ru(e, t) {
	return t ? e == t || e.contains(t.nodeType == 1 ? t : t.parentNode) : !1;
}
function iu(e, t) {
	if (!t.anchorNode) return !1;
	try {
		return ru(e, t.anchorNode);
	} catch {
		return !1;
	}
}
function au(e) {
	return tu(e) ? Cu(e, 0, e.nodeValue.length).getClientRects() : eu(e) ? e.getClientRects() : [];
}
function ou(e, t, n, r) {
	return n ? lu(e, t, n, r, -1) || lu(e, t, n, r, 1) : !1;
}
function su(e) {
	for (var t = 0;; t++) if (e = e.previousSibling, !e) return t;
}
function cu(e) {
	return eu(e) && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(e.nodeName);
}
function lu(e, t, n, r, i) {
	for (;;) {
		if (e == n && t == r) return !0;
		if (t == (i < 0 ? 0 : uu(e))) {
			if (e.nodeName == "DIV") return !1;
			let n = e.parentNode;
			if (!n || !eu(n)) return !1;
			t = su(e) + (i < 0 ? 0 : 1), e = n;
		} else if (eu(e)) {
			if (e = e.childNodes[t + (i < 0 ? -1 : 0)], eu(e) && (e.nodeName == "IMG" || e.nodeName == "BR" || e.contentEditable == "false")) return !1;
			t = i < 0 ? uu(e) : 0;
		} else return !1;
	}
}
function uu(e) {
	return tu(e) ? e.nodeValue.length : e.childNodes.length;
}
function du(e, t) {
	let { left: n, right: r } = e;
	if (n == r) return e;
	let i = t ? n : r;
	return {
		left: i,
		right: i,
		top: e.top,
		bottom: e.bottom
	};
}
function fu(e, t) {
	let { left: n, right: r, top: i, bottom: a } = e;
	for (let e of t) e.left != null && (n = Math.max(n, e.left)), e.right != null && (r = Math.min(r, e.right)), e.top != null && (i = Math.max(i, e.top)), e.bottom != null && (a = Math.min(a, e.bottom));
	return {
		left: n,
		right: r,
		top: i,
		bottom: a
	};
}
function pu(e) {
	let t = e.visualViewport;
	return t ? {
		left: 0,
		right: t.width,
		top: 0,
		bottom: t.height
	} : {
		left: 0,
		right: e.innerWidth,
		top: 0,
		bottom: e.innerHeight
	};
}
function mu(e, t) {
	let n = t.width / e.offsetWidth, r = t.height / e.offsetHeight;
	return (n > .995 && n < 1.005 || !isFinite(n) || Math.abs(t.width - e.offsetWidth) < 1) && (n = 1), (r > .995 && r < 1.005 || !isFinite(r) || Math.abs(t.height - e.offsetHeight) < 1) && (r = 1), {
		scaleX: n,
		scaleY: r
	};
}
function hu(e, t, n, r, i, a, o, s, c) {
	let l = e.ownerDocument, u = l.defaultView || window;
	for (let d = e, f = !1; d && !f;) if (eu(d)) {
		let e, p = d == l.body, m = 1, h = 1, g = !0, _ = !0;
		if (p) e = pu(u);
		else {
			let t = getComputedStyle(d);
			if (/^(fixed|sticky)$/.test(t.position) && (f = !0), (d.scrollHeight <= d.clientHeight || !/auto|scroll/.test(t.overflowY)) && (_ = !1), (d.scrollWidth <= d.clientWidth || !/auto|scroll/.test(t.overflowX)) && (g = !1), !g && !_) {
				d = d.assignedSlot || d.parentNode;
				continue;
			}
			let n = d.getBoundingClientRect();
			({scaleX: m, scaleY: h} = mu(d, n)), e = {
				left: n.left,
				right: n.left + d.clientWidth * m,
				top: n.top,
				bottom: n.top + d.clientHeight * h
			};
		}
		let v = fu(e, n), y = 0, b = 0;
		if (_) {
			if (a == "nearest") t.top < v.top + s ? (b = t.top - (v.top + s), r > 0 && t.bottom > v.bottom + b && (b = t.bottom - v.bottom + s)) : t.bottom > v.bottom - s && (b = t.bottom - v.bottom + s, r < 0 && t.top - b < v.top && (b = t.top - (v.top + s)));
			else {
				let e = t.bottom - t.top, n = v.bottom - v.top;
				b = (a == "center" && e <= n ? t.top + e / 2 - n / 2 : a == "start" || a == "center" && r < 0 ? t.top - s : t.bottom - n + s) - v.top;
			}
		}
		if (g && (i == "nearest" ? t.left < v.left + o ? (y = t.left - (v.left + o), r > 0 && t.right > v.right + y && (y = t.right - v.right + o)) : t.right > v.right - o && (y = t.right - v.right + o, r < 0 && t.left < v.left + y && (y = t.left - (v.left + o))) : y = (i == "center" ? t.left + (t.right - t.left) / 2 - (v.right - v.left) / 2 : i == "start" == c ? t.left - o : t.right - (v.right - v.left) + o) - v.left), y || b) {
			if (p) u.scrollBy(y, b);
			else {
				let e = 0, n = 0;
				if (b) {
					let e = d.scrollTop;
					d.scrollTop += b / h, n = (d.scrollTop - e) * h;
				}
				if (y) {
					let t = d.scrollLeft;
					d.scrollLeft += y / m, e = (d.scrollLeft - t) * m;
				}
				t = {
					left: t.left - e,
					top: t.top - n,
					right: t.right - e,
					bottom: t.bottom - n
				}, e && Math.abs(e - y) < 1 && (i = "nearest"), n && Math.abs(n - b) < 1 && (a = "nearest");
			}
		}
		if (p) break;
		(t.top < e.top || t.bottom > e.bottom || t.left < e.left || t.right > e.right) && (t = {
			left: Math.max(t.left, e.left),
			right: Math.min(t.right, e.right),
			top: Math.max(t.top, e.top),
			bottom: Math.min(t.bottom, e.bottom)
		}), n = n.filter((e) => !d.contains(e.elt)), d = d.assignedSlot || d.parentNode;
	} else if (d.nodeType == 11) d = d.host;
	else break;
}
function gu(e, t = !0) {
	let n = e.ownerDocument, r = null, i = null;
	for (let a = e.parentNode; a && !(a == n.body || (!t || r) && i);) if (eu(a)) !i && a.scrollHeight > a.clientHeight && /scroll|auto/.test(getComputedStyle(a).overflowY) && (i = a), t && !r && a.scrollWidth > a.clientWidth && /scroll|auto/.test(getComputedStyle(a).overflowX) && (r = a), a = a.assignedSlot || a.parentNode;
	else if (a.nodeType == 11) a = a.host;
	else break;
	return {
		x: r,
		y: i
	};
}
var _u = class {
	constructor() {
		this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
	}
	eq(e) {
		return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
	}
	setRange(e) {
		let { anchorNode: t, focusNode: n } = e;
		this.set(t, Math.min(e.anchorOffset, t ? uu(t) : 0), n, Math.min(e.focusOffset, n ? uu(n) : 0));
	}
	set(e, t, n, r) {
		this.anchorNode = e, this.anchorOffset = t, this.focusNode = n, this.focusOffset = r;
	}
};
function vu(e) {
	let t = [];
	for (let n = e; n; n = n.nodeType == 11 ? n.host : n.parentNode) eu(n) && t.push({
		node: n,
		left: n.scrollLeft,
		top: n.scrollTop
	});
	return t;
}
function yu(e, t = !0) {
	for (let { node: n, left: r, top: i } of e) t && n.scrollTop != i && (n.scrollTop = i), n.scrollLeft != r && (n.scrollLeft = r);
}
var bu = null;
V.safari && V.safari_version >= 26 && (bu = !1);
function xu(e) {
	if (e.setActive) return e.setActive();
	if (bu) return e.focus(bu);
	let t = vu(e);
	e.focus(bu == null ? { get preventScroll() {
		return bu = { preventScroll: !0 }, !0;
	} } : void 0), bu || (bu = !1, yu(t));
}
var Su;
function Cu(e, t, n = t) {
	let r = Su ||= document.createRange();
	return r.setEnd(e, n), r.setStart(e, t), r;
}
function wu(e, t, n, r) {
	let i = {
		key: t,
		code: t,
		keyCode: n,
		which: n,
		cancelable: !0
	};
	r && ({altKey: i.altKey, ctrlKey: i.ctrlKey, shiftKey: i.shiftKey, metaKey: i.metaKey} = r);
	let a = new KeyboardEvent("keydown", i);
	a.synthetic = !0, e.dispatchEvent(a);
	let o = new KeyboardEvent("keyup", i);
	return o.synthetic = !0, e.dispatchEvent(o), a.defaultPrevented || o.defaultPrevented;
}
function Tu(e) {
	for (; e;) {
		if (e && (e.nodeType == 9 || e.nodeType == 11 && e.host)) return e;
		e = e.assignedSlot || e.parentNode;
	}
	return null;
}
function Eu(e, t) {
	let n = t.focusNode, r = t.focusOffset;
	if (!n || t.anchorNode != n || t.anchorOffset != r) return !1;
	for (r = Math.min(r, uu(n));;) if (r) {
		if (!eu(n)) return !1;
		let e = n.childNodes[r - 1];
		e.contentEditable == "false" ? r-- : (n = e, r = uu(n));
	} else if (n == e) return !0;
	else r = su(n), n = n.parentNode;
}
function Du(e) {
	return e instanceof Window ? e.pageYOffset > Math.max(0, e.document.documentElement.scrollHeight - e.innerHeight - 4) : e.scrollTop > Math.max(1, e.scrollHeight - e.clientHeight - 4);
}
function Ou(e, t) {
	for (let n = e, r = t;;) if (tu(n) && r > 0) return {
		node: n,
		offset: r
	};
	else if (eu(n) && r > 0) {
		if (n.contentEditable == "false") return null;
		n = n.childNodes[r - 1], r = uu(n);
	} else if (n.parentNode && !cu(n)) r = su(n), n = n.parentNode;
	else return null;
}
function ku(e, t) {
	for (let n = e, r = t;;) if (tu(n) && r < n.nodeValue.length) return {
		node: n,
		offset: r
	};
	else if (eu(n) && r < n.childNodes.length) {
		if (n.contentEditable == "false") return null;
		n = n.childNodes[r], r = 0;
	} else if (n.parentNode && !cu(n)) r = su(n) + 1, n = n.parentNode;
	else return null;
}
var Au = class e {
	constructor(e, t, n = !0) {
		this.node = e, this.offset = t, this.precise = n;
	}
	static before(t, n) {
		return new e(t.parentNode, su(t), n);
	}
	static after(t, n) {
		return new e(t.parentNode, su(t) + 1, n);
	}
}, ju = /*@__PURE__*/ (function(e) {
	return e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL", e;
})(ju ||= {}), Mu = ju.LTR, Nu = ju.RTL;
function Pu(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) t.push(1 << e[n]);
	return t;
}
var Fu = /*@__PURE__*/ Pu("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), Iu = /*@__PURE__*/ Pu("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), Lu = /*@__PURE__*/ Object.create(null), Ru = [];
for (let e of [
	"()",
	"[]",
	"{}"
]) {
	let t = /*@__PURE__*/ e.charCodeAt(0), n = /*@__PURE__*/ e.charCodeAt(1);
	Lu[t] = n, Lu[n] = -t;
}
function zu(e) {
	return e <= 247 ? Fu[e] : 1424 <= e && e <= 1524 ? 2 : 1536 <= e && e <= 1785 ? Iu[e - 1536] : 1774 <= e && e <= 2220 ? 4 : 8192 <= e && e <= 8204 ? 256 : 64336 <= e && e <= 65023 ? 4 : 1;
}
var Bu = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/, Vu = class {
	get dir() {
		return this.level % 2 ? Nu : Mu;
	}
	constructor(e, t, n) {
		this.from = e, this.to = t, this.level = n;
	}
	side(e, t) {
		return this.dir == t == e ? this.to : this.from;
	}
	forward(e, t) {
		return e == (this.dir == t);
	}
	static find(e, t, n, r) {
		let i = -1;
		for (let a = 0; a < e.length; a++) {
			let o = e[a];
			if (o.from <= t && o.to >= t) {
				if (o.level == n) return a;
				(i < 0 || (r == 0 ? e[i].level > o.level : r < 0 ? o.from < t : o.to > t)) && (i = a);
			}
		}
		if (i < 0) throw RangeError("Index out of range");
		return i;
	}
};
function Hu(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = t[n];
		if (r.from != i.from || r.to != i.to || r.direction != i.direction || !Hu(r.inner, i.inner)) return !1;
	}
	return !0;
}
var H = [];
function Uu(e, t, n, r, i) {
	for (let a = 0; a <= r.length; a++) {
		let o = a ? r[a - 1].to : t, s = a < r.length ? r[a].from : n, c = a ? 256 : i;
		for (let t = o, n = c, r = c; t < s; t++) {
			let i = zu(e.charCodeAt(t));
			i == 512 ? i = n : i == 8 && r == 4 && (i = 16), H[t] = i == 4 ? 2 : i, i & 7 && (r = i), n = i;
		}
		for (let e = o, t = c, r = c; e < s; e++) {
			let i = H[e];
			if (i == 128) e < s - 1 && t == H[e + 1] && t & 24 ? i = H[e] = t : H[e] = 256;
			else if (i == 64) {
				let i = e + 1;
				for (; i < s && H[i] == 64;) i++;
				let a = e && t == 8 || i < n && H[i] == 8 ? r == 1 ? 1 : 8 : 256;
				for (let t = e; t < i; t++) H[t] = a;
				e = i - 1;
			} else i == 8 && r == 1 && (H[e] = 1);
			t = i, i & 7 && (r = i);
		}
	}
}
function Wu(e, t, n, r, i) {
	let a = i == 1 ? 2 : 1;
	for (let o = 0, s = 0, c = 0; o <= r.length; o++) {
		let l = o ? r[o - 1].to : t, u = o < r.length ? r[o].from : n;
		for (let t = l, n, r, o; t < u; t++) if (r = Lu[n = e.charCodeAt(t)]) {
			if (r < 0) {
				for (let e = s - 3; e >= 0; e -= 3) if (Ru[e + 1] == -r) {
					let n = Ru[e + 2], r = n & 2 ? i : n & 4 ? n & 1 ? a : i : 0;
					r && (H[t] = H[Ru[e]] = r), s = e;
					break;
				}
			} else if (Ru.length == 189) break;
			else Ru[s++] = t, Ru[s++] = n, Ru[s++] = c;
		} else if ((o = H[t]) == 2 || o == 1) {
			let e = o == i;
			c = +!e;
			for (let t = s - 3; t >= 0; t -= 3) {
				let n = Ru[t + 2];
				if (n & 2) break;
				if (e) Ru[t + 2] |= 2;
				else {
					if (n & 4) break;
					Ru[t + 2] |= 4;
				}
			}
		}
	}
}
function Gu(e, t, n, r) {
	for (let i = 0, a = r; i <= n.length; i++) {
		let o = i ? n[i - 1].to : e, s = i < n.length ? n[i].from : t;
		for (let c = o; c < s;) {
			let o = H[c];
			if (o == 256) {
				let o = c + 1;
				for (;;) if (o == s) {
					if (i == n.length) break;
					o = n[i++].to, s = i < n.length ? n[i].from : t;
				} else if (H[o] == 256) o++;
				else break;
				let l = a == 1, u = l == ((o < t ? H[o] : r) == 1) ? l ? 1 : 2 : r;
				for (let t = o, r = i, a = r ? n[r - 1].to : e; t > c;) t == a && (t = n[--r].from, a = r ? n[r - 1].to : e), H[--t] = u;
				c = o;
			} else a = o, c++;
		}
	}
}
function Ku(e, t, n, r, i, a, o) {
	let s = r % 2 ? 2 : 1;
	if (r % 2 == i % 2) for (let c = t, l = 0; c < n;) {
		let t = !0, u = !1;
		if (l == a.length || c < a[l].from) {
			let e = H[c];
			e != s && (t = !1, u = e == 16);
		}
		let d = !t && s == 1 ? [] : null, f = t ? r : r + 1, p = c;
		e: for (;;) if (l < a.length && p == a[l].from) {
			if (u) break;
			let m = a[l];
			if (!t) for (let e = m.to, t = l + 1;;) {
				if (e == n) break e;
				if (t < a.length && a[t].from == e) e = a[t++].to;
				else if (H[e] == s) break e;
				else break;
			}
			l++, d ? d.push(m) : (m.from > c && o.push(new Vu(c, m.from, f)), qu(e, m.direction == Mu == !(f % 2) ? r : r + 1, i, m.inner, m.from, m.to, o), c = m.to), p = m.to;
		} else if (p == n || (t ? H[p] != s : H[p] == s)) break;
		else p++;
		d ? Ku(e, c, p, r + 1, i, d, o) : c < p && o.push(new Vu(c, p, f)), c = p;
	}
	else for (let c = n, l = a.length; c > t;) {
		let n = !0, u = !1;
		if (!l || c > a[l - 1].to) {
			let e = H[c - 1];
			e != s && (n = !1, u = e == 16);
		}
		let d = !n && s == 1 ? [] : null, f = n ? r : r + 1, p = c;
		e: for (;;) if (l && p == a[l - 1].to) {
			if (u) break;
			let m = a[--l];
			if (!n) for (let e = m.from, n = l;;) {
				if (e == t) break e;
				if (n && a[n - 1].to == e) e = a[--n].from;
				else if (H[e - 1] == s) break e;
				else break;
			}
			d ? d.push(m) : (m.to < c && o.push(new Vu(m.to, c, f)), qu(e, m.direction == Mu == !(f % 2) ? r : r + 1, i, m.inner, m.from, m.to, o), c = m.from), p = m.from;
		} else if (p == t || (n ? H[p - 1] != s : H[p - 1] == s)) break;
		else p--;
		d ? Ku(e, p, c, r + 1, i, d, o) : p < c && o.push(new Vu(p, c, f)), c = p;
	}
}
function qu(e, t, n, r, i, a, o) {
	let s = t % 2 ? 2 : 1;
	Uu(e, i, a, r, s), Wu(e, i, a, r, s), Gu(i, a, r, s), Ku(e, i, a, t, n, r, o);
}
function Ju(e, t, n) {
	if (!e) return [new Vu(0, 0, +(t == Nu))];
	if (t == Mu && !n.length && !Bu.test(e)) return Yu(e.length);
	if (n.length) for (; e.length > H.length;) H[H.length] = 256;
	let r = [], i = t == Mu ? 0 : 1;
	return qu(e, i, i, n, 0, e.length, r), r;
}
function Yu(e) {
	return [new Vu(0, e, 0)];
}
var Xu = "";
function Zu(e, t, n, r, i) {
	if (!e.length) return null;
	let a = r.head - e.from, o;
	if (r.head == e.from && r.assoc < 0) {
		if (!i) return null;
		a = t[o = 0].side(!1, n);
	} else if (r.head == e.to && r.assoc > 0) {
		if (i) return null;
		a = t[o = t.length - 1].side(!0, n);
	} else o = Vu.find(t, a, r.bidiLevel ?? -1, r.assoc);
	let s = t[o], c = s.side(i, n);
	if (a == c) {
		let e = o += i ? 1 : -1;
		if (e < 0 || e >= t.length) return null;
		s = t[o = e], a = s.side(!i, n), c = s.side(i, n);
	}
	let l = Ls(e.text, a, s.forward(i, n));
	(l < s.from || l > s.to) && (l = c), Xu = e.text.slice(Math.min(a, l), Math.max(a, l));
	let u = o == (i ? t.length - 1 : 0) ? null : t[o + (i ? 1 : -1)];
	if (l == c) {
		if (!u) return i ? z.cursor(e.to, 1) : z.cursor(e.from, -1);
		if (u.level + +!i < s.level) return z.cursor(u.side(!i, n) + e.from, u.forward(i, n) ? 1 : -1, u.level);
	}
	return z.cursor(l + e.from, s.forward(i, n) ? -1 : 1, s.level);
}
function Qu(e, t, n) {
	for (let r = t; r < n; r++) {
		let t = zu(e.charCodeAt(r));
		if (t == 1) return Mu;
		if (t == 2 || t == 4) return Nu;
	}
}
var $u = /*@__PURE__*/ B.define(), ed = /*@__PURE__*/ B.define(), td = /*@__PURE__*/ B.define(), nd = /*@__PURE__*/ B.define(), rd = /*@__PURE__*/ B.define(), id = /*@__PURE__*/ B.define(), ad = /*@__PURE__*/ B.define(), od = /*@__PURE__*/ B.define(), sd = /*@__PURE__*/ B.define(), cd = /*@__PURE__*/ B.define({ combine: (e) => e.some((e) => e) }), ld = /*@__PURE__*/ B.define({ combine: (e) => e.some((e) => e) }), ud = /*@__PURE__*/ B.define(), dd = class e {
	constructor(e, t, n, r, i, a = !1) {
		this.range = e, this.y = t, this.x = n, this.yMargin = r, this.xMargin = i, this.isSnapshot = a;
	}
	map(t) {
		return t.empty ? this : new e(this.range.map(t), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
	}
	clip(t) {
		return this.range.to <= t.doc.length ? this : new e(z.cursor(t.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
	}
}, fd = /*@__PURE__*/ Oc.define({ map: (e, t) => e.map(t) }), pd = /*@__PURE__*/ Oc.define();
function md(e, t, n) {
	let r = e.facet(nd);
	r.length ? r[0](t) : window.onerror && window.onerror(String(t), n, void 0, void 0, t) || (n ? console.error(n + ":", t) : console.error(t));
}
var hd = /*@__PURE__*/ B.define({ combine: (e) => !e.length || e[0] }), gd = 0, _d = /*@__PURE__*/ B.define({ combine(e) {
	return e.filter((t, n) => {
		for (let r = 0; r < n; r++) if (e[r].plugin == t.plugin) return !1;
		return !0;
	});
} }), vd = class e {
	constructor(e, t, n, r, i) {
		this.id = e, this.create = t, this.domEventHandlers = n, this.domEventObservers = r, this.baseExtensions = i(this), this.extension = this.baseExtensions.concat(_d.of({
			plugin: this,
			arg: void 0
		}));
	}
	of(e) {
		return this.baseExtensions.concat(_d.of({
			plugin: this,
			arg: e
		}));
	}
	static define(t, n) {
		let { eventHandlers: r, eventObservers: i, provide: a, decorations: o } = n || {};
		return new e(gd++, t, r, i, (e) => {
			let t = [];
			return o && t.push(Sd.of((t) => {
				let n = t.plugin(e);
				return n ? o(n) : Kl.none;
			})), a && t.push(a(e)), t;
		});
	}
	static fromClass(t, n) {
		return e.define((e, n) => new t(e, n), n);
	}
}, yd = class {
	constructor(e) {
		this.spec = e, this.mustUpdate = null, this.value = null;
	}
	get plugin() {
		return this.spec && this.spec.plugin;
	}
	update(e) {
		if (!this.value) {
			if (this.spec) try {
				this.value = this.spec.plugin.create(e, this.spec.arg);
			} catch (t) {
				md(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
			}
		} else if (this.mustUpdate) {
			let e = this.mustUpdate;
			if (this.mustUpdate = null, this.value.update) try {
				this.value.update(e);
			} catch (t) {
				if (md(e.state, t, "CodeMirror plugin crashed"), this.value.destroy) try {
					this.value.destroy();
				} catch {}
				this.deactivate();
			}
		}
		return this;
	}
	destroy(e) {
		if (this.value?.destroy) try {
			this.value.destroy();
		} catch (t) {
			md(e.state, t, "CodeMirror plugin crashed");
		}
	}
	deactivate() {
		this.spec = this.value = null;
	}
}, bd = /*@__PURE__*/ B.define(), xd = /*@__PURE__*/ B.define(), Sd = /*@__PURE__*/ B.define(), Cd = /*@__PURE__*/ B.define(), wd = /*@__PURE__*/ B.define(), Td = /*@__PURE__*/ B.define(), Ed = /*@__PURE__*/ B.define();
function Dd(e, t) {
	let n = e.state.facet(Ed);
	if (!n.length) return n;
	let r = n.map((t) => t instanceof Function ? t(e) : t), i = [];
	return Xc.spans(r, t.from, t.to, {
		point() {},
		span(e, n, r, a) {
			let o = e - t.from, s = n - t.from, c = i;
			for (let e = r.length - 1; e >= 0; e--, a--) {
				let t = r[e].spec.bidiIsolate, n;
				if (a > 0 && c.length && (n = c[c.length - 1]).to == o && n.direction == t) n.to = s, c = n.inner;
				else {
					let e = {
						from: o,
						to: s,
						direction: t,
						inner: []
					};
					c.push(e), c = e.inner;
				}
			}
		}
	}), Od(t.text, i);
}
function Od(e, t) {
	for (let n of t) {
		if (n.direction == null) {
			for (let t = n.from, r = 0; t < n.to; r++) {
				let i = r < n.inner.length ? n.inner[r] : null, a = Qu(e, t, i ? i.from : n.to);
				if (a != null) {
					n.direction = a;
					break;
				}
				if (!i) break;
				t = i.to;
			}
			n.direction ??= ju.LTR;
		}
		Od(e, n.inner);
	}
	return t;
}
var kd = /*@__PURE__*/ B.define(), Ad = /*@__PURE__*/ B.define();
function jd(e) {
	let t = [];
	for (let n of e.state.facet(Ad)) {
		let r = n(e);
		r && t.push(r);
	}
	for (let n of e.state.facet(kd)) {
		let r = n(e);
		if (r) {
			let { win: n } = e, i = 0, a = n.innerWidth, o = 0, s = n.innerHeight;
			if (e.viewState.scrollParent) {
				let t = e.viewState.scrollParent.getBoundingClientRect();
				i = Math.max(t.left, i), a = Math.min(t.right, a), o = Math.max(t.top, o), s = Math.min(t.bottom, s);
			}
			let c = { elt: e.dom };
			r.left != null && (c.left = i + r.left), r.right != null && (c.right = a - r.right), r.top != null && (c.top = o + r.top), r.bottom != null && (c.bottom = s - r.bottom), t.push(c);
		}
	}
	return t;
}
var Md = /*@__PURE__*/ B.define(), Nd = class e {
	constructor(e, t, n, r) {
		this.fromA = e, this.toA = t, this.fromB = n, this.toB = r;
	}
	join(t) {
		return new e(Math.min(this.fromA, t.fromA), Math.max(this.toA, t.toA), Math.min(this.fromB, t.fromB), Math.max(this.toB, t.toB));
	}
	addToSet(e) {
		let t = e.length, n = this;
		for (; t > 0; t--) {
			let r = e[t - 1];
			if (!(r.fromA > n.toA)) {
				if (r.toA < n.fromA) break;
				n = n.join(r), e.splice(t - 1, 1);
			}
		}
		return e.splice(t, 0, n), e;
	}
	static extendWithRanges(t, n) {
		if (n.length == 0) return t;
		let r = [];
		for (let i = 0, a = 0, o = 0;;) {
			let s = i < t.length ? t[i].fromB : 1e9, c = a < n.length ? n[a] : 1e9, l = Math.min(s, c);
			if (l == 1e9) break;
			let u = l + o, d = l, f = u;
			for (;;) if (a < n.length && n[a] <= d) {
				let e = n[a + 1];
				a += 2, d = Math.max(d, e);
				for (let e = i; e < t.length && t[e].fromB <= d; e++) o = t[e].toA - t[e].toB;
				f = Math.max(f, e + o);
			} else if (i < t.length && t[i].fromB <= d) {
				let e = t[i++];
				d = Math.max(d, e.toB), f = Math.max(f, e.toA), o = e.toA - e.toB;
			} else break;
			r.push(new e(u, f, l, d));
		}
		return r;
	}
}, Pd = class e {
	constructor(e, t, n) {
		this.view = e, this.state = t, this.transactions = n, this.flags = 0, this.startState = e.state, this.changes = Gs.empty(this.startState.doc.length);
		for (let e of n) this.changes = this.changes.compose(e.changes);
		let r = [];
		this.changes.iterChangedRanges((e, t, n, i) => r.push(new Nd(e, t, n, i))), this.changedRanges = r;
	}
	static create(t, n, r) {
		return new e(t, n, r);
	}
	get viewportChanged() {
		return (this.flags & 4) > 0;
	}
	get viewportMoved() {
		return (this.flags & 8) > 0;
	}
	get heightChanged() {
		return (this.flags & 2) > 0;
	}
	get geometryChanged() {
		return this.docChanged || (this.flags & 18) > 0;
	}
	get focusChanged() {
		return (this.flags & 1) > 0;
	}
	get docChanged() {
		return !this.changes.empty;
	}
	get selectionSet() {
		return this.transactions.some((e) => e.selection);
	}
	get empty() {
		return this.flags == 0 && this.transactions.length == 0;
	}
}, Fd = [], Id = class {
	constructor(e, t, n = 0) {
		this.dom = e, this.length = t, this.flags = n, this.parent = null, e.cmTile = this;
	}
	get breakAfter() {
		return this.flags & 1;
	}
	get children() {
		return Fd;
	}
	isWidget() {
		return !1;
	}
	get isHidden() {
		return !1;
	}
	isComposite() {
		return !1;
	}
	isLine() {
		return !1;
	}
	isText() {
		return !1;
	}
	isBlock() {
		return !1;
	}
	get domAttrs() {
		return null;
	}
	sync(e) {
		if (this.flags |= 2, this.flags & 4) {
			this.flags &= -5;
			let e = this.domAttrs;
			e && Vl(this.dom, e);
		}
	}
	toString() {
		return this.constructor.name + (this.children.length ? `(${this.children})` : "") + (this.breakAfter ? "#" : "");
	}
	destroy() {
		this.parent = null;
	}
	setDOM(e) {
		this.dom = e, e.cmTile = this;
	}
	get posAtStart() {
		return this.parent ? this.parent.posBefore(this) : 0;
	}
	get posAtEnd() {
		return this.posAtStart + this.length;
	}
	posBefore(e, t = this.posAtStart) {
		let n = t;
		for (let t of this.children) {
			if (t == e) return n;
			n += t.length + t.breakAfter;
		}
		throw RangeError("Invalid child in posBefore");
	}
	posAfter(e) {
		return this.posBefore(e) + e.length;
	}
	covers(e) {
		return !0;
	}
	coordsIn(e, t, n) {
		return null;
	}
	domPosFor(e, t) {
		let n = su(this.dom), r = this.length ? e > 0 : t > 0;
		return new Au(this.parent.dom, n + +!!r, e == 0 || e == this.length);
	}
	markDirty(e) {
		this.flags &= -3, e && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(!1);
	}
	get overrideDOMText() {
		return null;
	}
	get root() {
		for (let e = this; e; e = e.parent) if (e instanceof zd) return e;
		return null;
	}
	static get(e) {
		return e.cmTile;
	}
}, Ld = class extends Id {
	constructor(e) {
		super(e, 0), this._children = [];
	}
	isComposite() {
		return !0;
	}
	get children() {
		return this._children;
	}
	get lastChild() {
		return this.children.length ? this.children[this.children.length - 1] : null;
	}
	append(e) {
		this.children.push(e), e.parent = this;
	}
	sync(e) {
		if (this.flags & 2) return;
		super.sync(e);
		let t = this.dom, n = null, r, i = e?.node == t ? e : null, a = 0;
		for (let o of this.children) {
			if (o.sync(e), a += o.length + o.breakAfter, r = n ? n.nextSibling : t.firstChild, i && r != o.dom && (i.written = !0), o.dom.parentNode == t) for (; r && r != o.dom;) r = Rd(r);
			else t.insertBefore(o.dom, r);
			n = o.dom;
		}
		for (r = n ? n.nextSibling : t.firstChild, i && r && (i.written = !0); r;) r = Rd(r);
		this.length = a;
	}
};
function Rd(e) {
	let t = e.nextSibling;
	return e.parentNode.removeChild(e), t;
}
var zd = class extends Ld {
	constructor(e, t) {
		super(t), this.view = e;
	}
	owns(e) {
		for (; e; e = e.parent) if (e == this) return !0;
		return !1;
	}
	isBlock() {
		return !0;
	}
	nearest(e) {
		for (;;) {
			if (!e) return null;
			let t = Id.get(e);
			if (t && this.owns(t)) return t;
			e = e.parentNode;
		}
	}
	blockTiles(e) {
		for (let t = [], n = this, r = 0, i = 0;;) if (r == n.children.length) {
			if (!t.length) return;
			n = n.parent, n.breakAfter && i++, r = t.pop();
		} else {
			let a = n.children[r++];
			if (a instanceof Bd) t.push(r), n = a, r = 0;
			else {
				let t = i + a.length, n = e(a, i);
				if (n !== void 0) return n;
				i = t + a.breakAfter;
			}
		}
	}
	resolveBlock(e, t) {
		let n, r = -1, i, a = -1;
		if (this.blockTiles((o, s) => {
			let c = s + o.length;
			if (e >= s && e <= c) {
				if (o.isWidget() && t >= -1 && t <= 1) {
					if (o.flags & 32) return !0;
					o.flags & 16 && (n = void 0);
				}
				(s < e || e == c && (t < -1 ? o.length : o.covers(1))) && (!n || !o.isWidget() && n.isWidget()) && (n = o, r = e - s), (c > e || e == s && (t > 1 ? o.length : o.covers(-1))) && (!i || !o.isWidget() && i.isWidget()) && (i = o, a = e - s);
			}
		}), !n && !i) throw Error("No tile at position " + e);
		return n && t < 0 || !i ? {
			tile: n,
			offset: r
		} : {
			tile: i,
			offset: a
		};
	}
}, Bd = class e extends Ld {
	constructor(e, t) {
		super(e), this.wrapper = t;
	}
	isBlock() {
		return !0;
	}
	covers(e) {
		return this.children.length ? e < 0 ? this.children[0].covers(-1) : this.lastChild.covers(1) : !1;
	}
	get domAttrs() {
		return this.wrapper.attributes;
	}
	static of(t, n) {
		let r = new e(n || document.createElement(t.tagName), t);
		return n || (r.flags |= 4), r;
	}
}, Vd = class e extends Ld {
	constructor(e, t) {
		super(e), this.attrs = t;
	}
	isLine() {
		return !0;
	}
	static start(t, n, r) {
		let i = new e(n || document.createElement("div"), t);
		return n && r || (i.flags |= 4), i;
	}
	get domAttrs() {
		return this.attrs;
	}
	resolveInline(e, t, n = !1) {
		let r = null, i = -1, a = null, o = -1;
		function s(e, c) {
			for (let l = 0, u = 0; l < e.children.length && u <= c; l++) {
				let d = e.children[l], f = u + d.length;
				f >= c && (d.isComposite() ? s(d, c - u) : (!a || n && a.isHidden && (t > 0 && !(a.flags & 32) || n && Ud(a, d))) && (f > c || d.flags & 32 && t <= 1) ? (a = d, o = c - u) : (u < c || d.flags & 16 && !(n && d.isHidden) && t >= -1) && (r = d, i = c - u)), u = f;
			}
		}
		s(this, e);
		let c = (t < 0 ? r : a) || r || a;
		return c ? {
			tile: c,
			offset: c == r ? i : o
		} : null;
	}
	coordsIn(e, t, n) {
		let r = this.resolveInline(e, t, !0);
		return r ? r.tile.coordsIn(Math.max(0, r.offset), t, n) : Hd(this);
	}
	domIn(e, t) {
		let n = this.resolveInline(e, t);
		if (n) {
			let { tile: e, offset: r } = n;
			if (this.dom.contains(e.dom)) return e.isText() ? new Au(e.dom, Math.min(e.dom.nodeValue.length, r)) : e.domPosFor(r, e.flags & 16 ? 1 : e.flags & 32 ? -1 : t);
			let i = n.tile.parent, a = !1;
			for (let e of i.children) {
				if (a) return new Au(e.dom, 0);
				e == n.tile && (a = !0);
			}
		}
		return new Au(this.dom, 0);
	}
};
function Hd(e) {
	let t = e.dom.lastChild;
	if (!t) return e.dom.getBoundingClientRect();
	let n = au(t);
	return n[n.length - 1] || null;
}
function Ud(e, t) {
	let n = e.coordsIn(0, 1), r = t.coordsIn(0, 1);
	return n && r && r.top < n.bottom;
}
var Wd = class e extends Ld {
	constructor(e, t) {
		super(e), this.mark = t;
	}
	get domAttrs() {
		return this.mark.attrs;
	}
	static of(t, n) {
		let r = new e(n || document.createElement(t.tagName), t);
		return n || (r.flags |= 4), r;
	}
}, Gd = class e extends Id {
	constructor(e, t) {
		super(e, t.length), this.text = t;
	}
	sync(e) {
		this.flags & 2 || (super.sync(e), this.dom.nodeValue != this.text && (e && e.node == this.dom && (e.written = !0), this.dom.nodeValue = this.text));
	}
	isText() {
		return !0;
	}
	toString() {
		return JSON.stringify(this.text);
	}
	coordsIn(e, t, n) {
		let r = this.dom.nodeValue.length;
		e > r && (e = r);
		let i = e, a = e, o = 0;
		e == 0 && t < 0 || e == r && t >= 0 ? V.chrome || V.gecko || (e ? (i--, o = 1) : a < r && (a++, o = -1)) : t < 0 ? i-- : a < r && a++;
		let s = Cu(this.dom, i, a).getClientRects();
		if (!s.length) return null;
		let c = s[(o ? o < 0 : t >= 0) ? 0 : s.length - 1];
		return V.safari && !o && c.width == 0 && (c = Array.prototype.find.call(s, (e) => e.width) || c), n == null ? c : du(c, (o ? o > 0 : t < 0) == n);
	}
	static of(t, n) {
		let r = new e(n || document.createTextNode(t), t);
		return n || (r.flags |= 2), r;
	}
}, Kd = class e extends Id {
	constructor(e, t, n, r) {
		super(e, t, r), this.widget = n;
	}
	isWidget() {
		return !0;
	}
	get isHidden() {
		return this.widget.isHidden;
	}
	covers(e) {
		return this.flags & 48 ? !1 : (this.flags & (e < 0 ? 64 : 128)) > 0;
	}
	coordsIn(e, t) {
		return this.coordsInWidget(e, t, !1);
	}
	coordsInWidget(e, t, n) {
		let r = this.widget.coordsAt(this.dom, e, t);
		if (r) return r;
		if (n) return du(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0);
		{
			let t = this.dom.getClientRects(), n = null;
			if (!t.length) return null;
			let r = this.flags & 16 ? !0 : this.flags & 32 ? !1 : e > 0;
			for (let i = r ? t.length - 1 : 0; n = t[i], !(e > 0 ? i == 0 : i == t.length - 1 || n.top < n.bottom); i += r ? -1 : 1);
			return du(n, !r);
		}
	}
	get overrideDOMText() {
		if (!this.length) return R.empty;
		let { root: e } = this;
		if (!e) return R.empty;
		let t = this.posAtStart;
		return e.view.state.doc.slice(t, t + this.length);
	}
	destroy() {
		super.destroy(), this.widget.destroy(this.dom);
	}
	static of(t, n, r, i, a) {
		return a || (a = t.toDOM(n), t.editable || (a.contentEditable = "false")), new e(a, r, t, i);
	}
}, qd = class extends Id {
	constructor(e) {
		let t = document.createElement("img");
		t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), super(t, 0, e);
	}
	get isHidden() {
		return !0;
	}
	get overrideDOMText() {
		return R.empty;
	}
	coordsIn(e, t, n) {
		let r = this.dom.getBoundingClientRect();
		return n == null ? r : du(r, t > 0 == n);
	}
}, Jd = class {
	constructor(e) {
		this.index = 0, this.beforeBreak = !1, this.parents = [], this.tile = e;
	}
	advance(e, t, n) {
		let { tile: r, index: i, beforeBreak: a, parents: o } = this;
		for (; e || t > 0;) if (!r.isComposite()) {
			let t = r.length;
			if (i < t && e) {
				let a = Math.min(e, t - i);
				n && n.skip(r, i, i + a), e -= a, i += a;
			}
			if (i == t) a = !!r.breakAfter, {tile: r, index: i} = o.pop(), i++;
			else if (!e) break;
		} else if (a) {
			if (!e) break;
			n && n.break(), e--, a = !1;
		} else if (i == r.children.length) {
			if (!e && !o.length) break;
			n && n.leave(r), a = !!r.breakAfter, {tile: r, index: i} = o.pop(), i++;
		} else {
			let s = r.children[i], c = s.breakAfter;
			(t > 0 ? s.length <= e : s.length < e) && (!n || n.skip(s, 0, s.length) !== !1 || !s.isComposite) ? (a = !!c, i++, e -= s.length) : (o.push({
				tile: r,
				index: i
			}), r = s, i = 0, n && s.isComposite() && n.enter(s));
		}
		return this.tile = r, this.index = i, this.beforeBreak = a, this;
	}
	get root() {
		return this.parents.length ? this.parents[0].tile : this.tile;
	}
}, Yd = class {
	constructor(e, t, n, r) {
		this.from = e, this.to = t, this.wrapper = n, this.rank = r;
	}
}, Xd = class {
	constructor(e, t, n) {
		this.cache = e, this.root = t, this.blockWrappers = n, this.curLine = null, this.lastBlock = null, this.afterWidget = null, this.pos = 0, this.wrappers = [], this.wrapperPos = 0;
	}
	addText(e, t, n, r) {
		this.flushBuffer();
		let i = this.ensureMarks(t, n), a = i.lastChild;
		if (a && a.isText() && !(a.flags & 8) && a.length + e.length < 512) {
			this.cache.reused.set(a, 2);
			let t = i.children[i.children.length - 1] = new Gd(a.dom, a.text + e);
			t.parent = i;
		} else i.append(r || Gd.of(e, this.cache.find(Gd)?.dom));
		this.pos += e.length, this.afterWidget = null;
	}
	addComposition(e, t) {
		let n = this.curLine;
		n.dom != t.line.dom && (n.setDOM(this.cache.reused.has(t.line) ? sf(t.line.dom) : t.line.dom), this.cache.reused.set(t.line, 2));
		let r = n;
		for (let e = t.marks.length - 1; e >= 0; e--) {
			let n = t.marks[e], i = r.lastChild;
			if (i instanceof Wd && i.mark.eq(n.mark)) i.dom != n.dom && i.setDOM(sf(n.dom)), r = i;
			else {
				let { dom: e } = n;
				this.cache.reused.get(n) && Id.get(n.dom) && (e = sf(n.dom));
				let t = Wd.of(n.mark, e);
				r.append(t), r = t;
			}
			this.cache.reused.set(n, 2);
		}
		let i = Id.get(e.text);
		i && this.cache.reused.set(i, 2);
		let a = new Gd(e.text, e.text.nodeValue);
		a.flags |= 8, this.pos = e.range.toB, r.append(a);
	}
	addInlineWidget(e, t, n) {
		let r = this.afterWidget && e.flags & 48 && (this.afterWidget.flags & 48) == (e.flags & 48);
		r || this.flushBuffer();
		let i = this.ensureMarks(t, n);
		!r && !(e.flags & 16) && i.append(this.getBuffer(1)), i.append(e), this.pos += e.length, this.afterWidget = e;
	}
	addMark(e, t, n) {
		this.flushBuffer(), this.ensureMarks(t, n).append(e), this.pos += e.length, this.afterWidget = null;
	}
	addBlockWidget(e) {
		this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
	}
	continueWidget(e) {
		let t = this.afterWidget || this.lastBlock;
		t.length += e, this.pos += e;
	}
	addLineStart(e, t) {
		e ||= rf;
		let n = Vd.start(e, t || this.cache.find(Vd)?.dom, !!t);
		this.getBlockPos().append(this.lastBlock = this.curLine = n);
	}
	addLine(e) {
		this.getBlockPos().append(e), this.pos += e.length, this.lastBlock = e, this.endLine();
	}
	addBreak() {
		this.lastBlock.flags |= 1, this.endLine(), this.pos++;
	}
	addLineStartIfNotCovered(e) {
		this.blockPosCovered() || this.addLineStart(e);
	}
	ensureLine(e) {
		this.curLine || this.addLineStart(e);
	}
	ensureMarks(e, t) {
		let n = this.curLine;
		for (let r = e.length - 1; r >= 0; r--) {
			let i = e[r], a;
			if (t > 0 && (a = n.lastChild) && a instanceof Wd && a.mark.eq(i)) n = a, t--;
			else {
				let e = Wd.of(i, this.cache.find(Wd, (e) => e.mark.eq(i))?.dom);
				n.append(e), n = e, t = 0;
			}
		}
		return n;
	}
	endLine() {
		if (this.curLine) {
			this.flushBuffer();
			let e = this.curLine.lastChild;
			(!e || !tf(this.curLine, !1) || e.dom.nodeName != "BR" && e.isWidget() && !(V.ios && tf(this.curLine, !0))) && this.curLine.append(this.cache.findWidget(lf, 0, 32) || new Kd(lf.toDOM(), 0, lf, 32)), this.curLine = this.afterWidget = null;
		}
	}
	updateBlockWrappers() {
		this.wrapperPos > this.pos + 1e4 && (this.blockWrappers.goto(this.pos), this.wrappers.length = 0);
		for (let e = this.wrappers.length - 1; e >= 0; e--) this.wrappers[e].to < this.pos && this.wrappers.splice(e, 1);
		for (let e = this.blockWrappers; e.value && e.from <= this.pos; e.next()) if (e.to >= this.pos) {
			let t = e.rank * 102 + e.value.rank, n = new Yd(e.from, e.to, e.value, t), r = this.wrappers.length;
			for (; r > 0 && (this.wrappers[r - 1].rank - n.rank || this.wrappers[r - 1].to - n.to) < 0;) r--;
			this.wrappers.splice(r, 0, n);
		}
		this.wrapperPos = this.pos;
	}
	getBlockPos() {
		this.updateBlockWrappers();
		let e = this.root;
		for (let t of this.wrappers) {
			let n = e.lastChild;
			if (t.from < this.pos && n instanceof Bd && n.wrapper.eq(t.wrapper)) e = n;
			else {
				let n = Bd.of(t.wrapper, this.cache.find(Bd, (e) => e.wrapper.eq(t.wrapper))?.dom);
				e.append(n), e = n;
			}
		}
		return e;
	}
	blockPosCovered() {
		let e = this.lastBlock;
		return e != null && !e.breakAfter && (!e.isWidget() || (e.flags & 160) > 0);
	}
	getBuffer(e) {
		let t = 2 | (e < 0 ? 16 : 32), n = this.cache.find(qd, void 0, 1);
		return n && (n.flags = t), n || new qd(t);
	}
	flushBuffer() {
		this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
	}
}, Zd = class {
	constructor(e) {
		this.skipCount = 0, this.text = "", this.textOff = 0, this.cursor = e.iter();
	}
	skip(e) {
		this.textOff + e <= this.text.length ? this.textOff += e : (this.skipCount += e - (this.text.length - this.textOff), this.text = "", this.textOff = 0);
	}
	next(e) {
		if (this.textOff == this.text.length) {
			let { value: t, lineBreak: n, done: r } = this.cursor.next(this.skipCount);
			if (this.skipCount = 0, r) throw Error("Ran out of text content when drawing inline views");
			this.text = t;
			let i = this.textOff = Math.min(e, t.length);
			return n ? null : t.slice(0, i);
		}
		let t = Math.min(this.text.length, this.textOff + e), n = this.text.slice(this.textOff, t);
		return this.textOff = t, n;
	}
}, Qd = [
	Kd,
	Vd,
	Gd,
	Wd,
	qd,
	Bd,
	zd
];
for (let e = 0; e < Qd.length; e++) Qd[e].bucket = e;
var $d = class {
	constructor(e) {
		this.view = e, this.buckets = Qd.map(() => []), this.index = Qd.map(() => 0), this.reused = /* @__PURE__ */ new Map(), this.dir = 1;
	}
	add(e) {
		let t = e.constructor.bucket, n = this.buckets[t];
		n.length < 6 ? n.push(e) : n[this.index[t] = (this.index[t] + 1) % 6] = e;
	}
	find(e, t, n = 2) {
		let r = e.bucket, i = this.buckets[r], a = this.index[r], [o, s, c] = this.dir > 0 ? [
			0,
			i.length,
			1
		] : [
			i.length - 1,
			-1,
			-1
		];
		for (let e = o; e != s; e += c) {
			let o = (e + a) % i.length, s = i[o];
			if ((!t || t(s)) && !this.reused.has(s)) return i.splice(o, 1), o < a && this.index[r]--, this.reused.set(s, n), s;
		}
		return null;
	}
	findWidget(e, t, n) {
		let r = this.buckets[0];
		if (r.length) for (let i = 0, a = 0;; i++) {
			if (i == r.length) {
				if (a) return null;
				a = 1, i = 0;
			}
			let o = r[i];
			if (!this.reused.has(o) && (a == 0 ? o.widget.compare(e) : o.widget.constructor == e.constructor && e.updateDOM(o.dom, this.view, o.widget))) return r.splice(i, 1), i < this.index[0] && this.index[0]--, o.widget == e && o.length == t && (o.flags & 497) == n ? (this.reused.set(o, 1), o) : (this.reused.set(o, 2), new Kd(o.dom, t, e, o.flags & -498 | n));
		}
	}
	reuse(e) {
		return this.reused.set(e, 1), e;
	}
	maybeReuse(e, t = 2) {
		if (!this.reused.has(e)) return this.reused.set(e, t), e.dom;
	}
	clear() {
		for (let e = 0; e < this.buckets.length; e++) this.buckets[e].length = this.index[e] = 0;
	}
}, ef = class {
	constructor(e, t, n, r, i) {
		this.view = e, this.decorations = r, this.disallowBlockEffectsFor = i, this.openWidget = !1, this.openMarks = 0, this.cache = new $d(e), this.text = new Zd(e.state.doc), this.builder = new Xd(this.cache, new zd(e, e.contentDOM), Xc.iter(n)), this.cache.reused.set(t, 2), this.old = new Jd(t), this.reuseWalker = {
			skip: (e, t, n) => {
				if (this.cache.add(e), e.isComposite()) return !1;
			},
			enter: (e) => this.cache.add(e),
			leave: () => {},
			break: () => {}
		};
	}
	run(e, t) {
		let n = t && this.getCompositionContext(t.text);
		for (let r = 0, i = 0, a = 0;;) {
			let o = a < e.length ? e[a++] : null, s = o ? o.fromA : this.old.root.length;
			if (s > r) {
				let e = s - r;
				this.cache.dir = -1, this.preserve(e, !a, !o), this.cache.dir = 1, r = s, i += e;
			}
			if (!o) break;
			t && o.fromA <= t.range.fromA && o.toA >= t.range.toA ? (this.forward(o.fromA, t.range.fromA, t.range.fromA < t.range.toA ? 1 : -1), this.emit(i, t.range.fromB), this.builder.flushBuffer(), this.cache.clear(), this.builder.addComposition(t, n), this.text.skip(t.range.toB - t.range.fromB), this.forward(t.range.fromA, o.toA), this.emit(t.range.toB, o.toB)) : (this.forward(o.fromA, o.toA), this.emit(i, o.toB)), i = o.toB, r = o.toA;
		}
		return this.builder.curLine && this.builder.endLine(), this.builder.root;
	}
	preserve(e, t, n) {
		let r = of(this.old), i = this.openMarks;
		this.old.advance(e, n ? 1 : -1, {
			skip: (e, t, n) => {
				if (e.isWidget()) {
					if (this.openWidget) this.builder.continueWidget(n - t);
					else {
						let a = n > 0 || t < e.length ? Kd.of(e.widget, this.view, n - t, e.flags & 496, this.cache.maybeReuse(e)) : this.cache.reuse(e);
						a.flags & 256 ? (a.flags &= -2, this.builder.addBlockWidget(a)) : (this.builder.ensureLine(null), this.builder.addInlineWidget(a, r, i), i = r.length);
					}
				} else if (e.isText()) this.builder.ensureLine(null), !t && n == e.length && !this.cache.reused.has(e) ? this.builder.addText(e.text, r, i, this.cache.reuse(e)) : (this.cache.add(e), this.builder.addText(e.text.slice(t, n), r, i)), i = r.length;
				else if (e.isLine()) e.flags &= -2, this.cache.reused.set(e, 1), this.builder.addLine(e);
				else if (e instanceof qd) this.cache.add(e);
				else if (e instanceof Wd) this.builder.ensureLine(null), this.builder.addMark(e, r, i), this.cache.reused.set(e, 1), i = r.length;
				else return !1;
				this.openWidget = !1;
			},
			enter: (e) => {
				e.isLine() ? this.builder.addLineStart(e.attrs, this.cache.maybeReuse(e)) : (this.cache.add(e), e instanceof Wd && r.unshift(e.mark)), this.openWidget = !1;
			},
			leave: (e) => {
				e.isLine() ? r.length &&= i = 0 : e instanceof Wd && (r.shift(), i = Math.min(i, r.length));
			},
			break: () => {
				this.builder.addBreak(), this.openWidget = !1;
			}
		}), this.text.skip(e);
	}
	emit(e, t) {
		let n = null, r = this.builder, i = -1, a = Xc.spans(this.decorations, e, t, {
			point: (e, t, a, o, s, c) => {
				if (a instanceof Yl) {
					if (this.disallowBlockEffectsFor[c]) {
						if (a.block) throw RangeError("Block decorations may not be specified via plugins");
						if (t > this.view.state.doc.lineAt(e).to) throw RangeError("Decorations that replace line breaks may not be specified via plugins");
					}
					if (i = o.length, s > o.length) r.continueWidget(t - e);
					else {
						let i = a.widget || (a.block ? cf.block : cf.inline), c = nf(a), l = this.cache.findWidget(i, t - e, c) || Kd.of(i, this.view, t - e, c);
						a.block ? (a.startSide > 0 && r.addLineStartIfNotCovered(n), r.addBlockWidget(l)) : (r.ensureLine(n), r.addInlineWidget(l, o, s));
					}
					n = null;
				} else n = af(n, a);
				t > e && this.text.skip(t - e);
			},
			span: (e, t, a, o) => {
				for (let i = e; i < t;) {
					let s = this.text.next(Math.min(512, t - i));
					s == null ? (r.addLineStartIfNotCovered(n), r.addBreak(), i++) : (r.ensureLine(n), r.addText(s, a, i == e ? o : a.length), i += s.length), n = null;
				}
				i = a.length;
			}
		});
		i > -1 && (this.openWidget = a > i), this.openWidget || r.addLineStartIfNotCovered(n), this.openMarks = a;
	}
	forward(e, t, n = 1) {
		t - e <= 10 ? this.old.advance(t - e, n, this.reuseWalker) : (this.old.advance(5, -1, this.reuseWalker), this.old.advance(t - e - 10, -1), this.old.advance(5, n, this.reuseWalker));
	}
	getCompositionContext(e) {
		let t = [], n = null;
		for (let r = e.parentNode;; r = r.parentNode) {
			let e = Id.get(r);
			if (r == this.view.contentDOM) break;
			e instanceof Wd ? t.push(e) : e?.isLine() ? n = e : e instanceof Bd || (r.nodeName == "DIV" && !n ? n = new Vd(r, rf) : n || t.push(Wd.of(new ql({
				tagName: r.nodeName.toLowerCase(),
				attributes: Ul(r)
			}), r)));
		}
		return n ? {
			line: n,
			marks: t
		} : null;
	}
};
function tf(e, t) {
	let n = (e) => {
		for (let r of e.children) if ((t ? r.isText() : r.length) || n(r)) return !0;
		return !1;
	};
	return n(e);
}
function nf(e) {
	let t = e.isReplace ? (e.startSide < 0 ? 64 : 0) | (e.endSide > 0 ? 128 : 0) : e.startSide > 0 ? 32 : 16;
	return e.block && (t |= 256), t;
}
var rf = { class: "cm-line" };
function af(e, t) {
	let n = t.spec.attributes, r = t.spec.class;
	return !n && !r || (e ||= { class: "cm-line" }, n && Rl(n, e), r && (e.class += " " + r)), e;
}
function of(e) {
	let t = [];
	for (let n = e.parents.length; n > 1; n--) {
		let r = n == e.parents.length ? e.tile : e.parents[n].tile;
		r instanceof Wd && t.push(r.mark);
	}
	return t;
}
function sf(e) {
	let t = Id.get(e);
	return t && t.setDOM(e.cloneNode()), e;
}
var cf = class extends Wl {
	constructor(e) {
		super(), this.tag = e;
	}
	eq(e) {
		return e.tag == this.tag;
	}
	toDOM() {
		return document.createElement(this.tag);
	}
	updateDOM(e) {
		return e.nodeName.toLowerCase() == this.tag;
	}
	get isHidden() {
		return !0;
	}
};
cf.inline = /*@__PURE__*/ new cf("span"), cf.block = /*@__PURE__*/ new cf("div");
var lf = /*@__PURE__*/ new class extends Wl {
	toDOM() {
		return document.createElement("br");
	}
	get isHidden() {
		return !0;
	}
	get editable() {
		return !0;
	}
}(), uf = class {
	constructor(e) {
		this.view = e, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = Kl.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new zd(e, e.contentDOM), this.updateInner([new Nd(0, 0, 0, e.state.doc.length)], null);
	}
	update(e) {
		let t = e.changedRanges;
		this.minWidth > 0 && t.length && (t.every(({ fromA: e, toA: t }) => t < this.minWidthFrom || e > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
		let n = -1;
		this.view.inputState.composing >= 0 && !this.view.observer.editContext && (this.domChanged?.newSel ? n = this.domChanged.newSel.head : !xf(e.changes, this.hasComposition) && !e.selectionSet && (n = e.state.selection.main.head));
		let r = n > -1 ? mf(this.view, e.changes, n) : null;
		if (this.domChanged = null, this.hasComposition) {
			let { from: n, to: r } = this.hasComposition;
			t = new Nd(n, r, e.changes.mapPos(n, -1), e.changes.mapPos(r, 1)).addToSet(t.slice());
		}
		this.hasComposition = r ? {
			from: r.range.fromB,
			to: r.range.toB
		} : null, (V.ie || V.chrome) && !r && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
		let i = this.decorations, a = this.blockWrappers;
		this.updateDeco();
		let o = _f(i, this.decorations, e.changes);
		o.length && (t = Nd.extendWithRanges(t, o));
		let s = yf(a, this.blockWrappers, e.changes);
		return s.length && (t = Nd.extendWithRanges(t, s)), r && !t.some((e) => e.fromA <= r.range.fromA && e.toA >= r.range.toA) && (t = r.range.addToSet(t.slice())), this.tile.flags & 2 && t.length == 0 ? !1 : (this.updateInner(t, r), e.transactions.length && (this.lastUpdate = Date.now()), !0);
	}
	updateInner(e, t) {
		this.view.viewState.setMustMeasure();
		let { observer: n } = this.view;
		n.ignore(() => {
			if (t || e.length) {
				let n = this.tile, r = new ef(this.view, n, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
				t && Id.get(t.text) && r.cache.reused.set(Id.get(t.text), 2), this.tile = r.run(e, t), df(n, r.cache.reused);
			}
			this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
			let r = V.chrome || V.ios ? {
				node: n.selectionRange.focusNode,
				written: !1
			} : void 0;
			this.tile.sync(r), r && (r.written || n.selectionRange.focusNode != r.node || !this.tile.dom.contains(r.node)) && (this.forceSelection = !0), this.tile.dom.style.height = "";
		});
		let r = [];
		if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length) for (let e of this.tile.children) e.isWidget() && e.widget instanceof Sf && r.push(e.dom);
		n.updateGaps(r);
	}
	updateEditContextFormatting(e) {
		this.editContextFormatting = this.editContextFormatting.map(e.changes);
		for (let t of e.transactions) for (let e of t.effects) e.is(pd) && (this.editContextFormatting = e.value);
	}
	updateSelection(e = !1, t = !1) {
		let { view: n } = this;
		(e || !n.observer.selectionRange.focusNode) && n.observer.readSelectionRange();
		let { dom: r } = this.tile, i = n.root.activeElement, a = i == r, o = !a && !(n.state.facet(hd) || r.tabIndex > -1) && iu(r, n.observer.selectionRange) && !(i && r.contains(i));
		if (!(a || t || o)) return;
		if (n.inputState.androidSelection > -1) {
			n.inputState.androidSelectionNeedsFlush = !0;
			return;
		}
		let s = this.forceSelection;
		this.forceSelection = !1;
		let c = n.state.selection.main, l, u;
		if (c.empty ? u = l = this.inlineDOMNearPos(c.anchor, c.assoc || 1) : (u = this.inlineDOMNearPos(c.head, c.head == c.from ? 1 : -1), l = this.inlineDOMNearPos(c.anchor, c.anchor == c.from ? 1 : -1)), V.gecko && c.empty && !this.hasComposition && ff(l)) {
			let e = document.createTextNode("");
			n.observer.ignore(() => l.node.insertBefore(e, l.node.childNodes[l.offset] || null)), l = u = new Au(e, 0), s = !0;
		}
		let d = n.observer.selectionRange;
		!s && d.focusNode && (ou(l.node, l.offset, d.anchorNode, d.anchorOffset) && ou(u.node, u.offset, d.focusNode, d.focusOffset) || this.suppressWidgetCursorChange(d, c)) || (n.observer.ignore(() => {
			V.android && V.chrome && r.contains(d.focusNode) && bf(d.focusNode, r) && (r.blur(), r.focus({ preventScroll: !0 }));
			let e = nu(n.root);
			if (e) {
				if (c.empty) {
					if (V.gecko) {
						let e = hf(l.node, l.offset);
						if (e && e != 3) {
							let t = (e == 1 ? Ou : ku)(l.node, l.offset);
							t && (l = new Au(t.node, t.offset));
						}
					}
					e.collapse(l.node, l.offset), c.bidiLevel != null && e.caretBidiLevel !== void 0 && (e.caretBidiLevel = c.bidiLevel);
				} else if (e.extend) {
					e.collapse(l.node, l.offset);
					try {
						e.extend(u.node, u.offset);
					} catch {}
				} else {
					let t = document.createRange();
					c.anchor > c.head && ([l, u] = [u, l]), t.setEnd(u.node, u.offset), t.setStart(l.node, l.offset), e.removeAllRanges(), e.addRange(t);
				}
			}
			o && n.root.activeElement == r && (r.blur(), i && i.focus());
		}), n.observer.setSelectionRange(l, u)), this.impreciseAnchor = l.precise ? null : new Au(d.anchorNode, d.anchorOffset), this.impreciseHead = u.precise ? null : new Au(d.focusNode, d.focusOffset);
	}
	suppressWidgetCursorChange(e, t) {
		return this.hasComposition && t.empty && ou(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
	}
	enforceCursorAssoc() {
		if (this.hasComposition) return;
		let { view: e } = this, t = e.state.selection.main, n = nu(e.root), { anchorNode: r, anchorOffset: i } = e.observer.selectionRange;
		if (!n || !t.empty || !t.assoc || !n.modify) return;
		let a = this.lineAt(t.head, t.assoc);
		if (!a) return;
		let o = a.posAtStart;
		if (t.head == o || t.head == o + a.length) return;
		let s = this.coordsAt(t.head, -1), c = this.coordsAt(t.head, 1);
		if (!s || !c || s.bottom > c.top) return;
		let l = this.domAtPos(t.head + t.assoc, t.assoc);
		n.collapse(l.node, l.offset), n.modify("move", t.assoc < 0 ? "forward" : "backward", "lineboundary"), e.observer.readSelectionRange();
		let u = e.observer.selectionRange;
		e.docView.posFromDOM(u.anchorNode, u.anchorOffset) != t.from && n.collapse(r, i);
	}
	posFromDOM(e, t) {
		let n = this.tile.nearest(e);
		if (!n) return this.tile.dom.compareDocumentPosition(e) & 2 ? 0 : this.view.state.doc.length;
		let r = n.posAtStart;
		if (n.isComposite()) {
			let i;
			if (e == n.dom) i = n.dom.childNodes[t];
			else {
				let r = uu(e) == 0 ? 0 : t == 0 ? -1 : 1;
				for (;;) {
					let t = e.parentNode;
					if (t == n.dom) break;
					r == 0 && t.firstChild != t.lastChild && (r = e == t.firstChild ? -1 : 1), e = t;
				}
				i = r < 0 ? e : e.nextSibling;
			}
			if (i == n.dom.firstChild) return r;
			for (; i && !Id.get(i);) i = i.nextSibling;
			if (!i) return r + n.length;
			for (let e = 0, t = r;; e++) {
				let r = n.children[e];
				if (r.dom == i) return t;
				t += r.length + r.breakAfter;
			}
		} else if (n.isText()) return e == n.dom ? r + t : r + (t ? n.length : 0);
		else return r;
	}
	domAtPos(e, t) {
		let { tile: n, offset: r } = this.tile.resolveBlock(e, t);
		return n.isWidget() ? n.domPosFor(r, t) : n.domIn(r, t);
	}
	inlineDOMNearPos(e, t) {
		let n, r = -1, i = !1, a, o = -1, s = !1;
		return this.tile.blockTiles((t, c) => {
			if (t.isWidget()) {
				if (t.flags & 32 && c >= e) return !0;
				t.flags & 16 && (i = !0);
			} else {
				let l = c + t.length;
				if (c <= e && (n = t, r = e - c, i = l < e), l >= e && !a && (a = t, o = e - c, s = c > e), c > e && a) return !0;
			}
		}), !n && !a ? this.domAtPos(e, t) : (i && a ? n = null : s && n && (a = null), n && t < 0 || !a ? n.domIn(r, t) : a.domIn(o, t));
	}
	coordsAt(e, t, n) {
		let { tile: r, offset: i } = this.tile.resolveBlock(e, t);
		return r.isWidget() ? r.widget instanceof Sf ? null : r.coordsInWidget(i, t, !0) : r.coordsIn(i, t, n);
	}
	lineAt(e, t) {
		let { tile: n } = this.tile.resolveBlock(e, t);
		return n.isLine() ? n : null;
	}
	coordsForChar(e) {
		let { tile: t, offset: n } = this.tile.resolveBlock(e, 1);
		if (!t.isLine()) return null;
		function r(e, t) {
			if (e.isComposite()) for (let n of e.children) {
				if (n.length >= t) {
					let e = r(n, t);
					if (e) return e;
				}
				if (t -= n.length, t < 0) break;
			}
			else if (e.isText() && t < e.length) {
				let n = Ls(e.text, t);
				if (n == t) return null;
				let r = Cu(e.dom, t, n).getClientRects();
				for (let e = 0; e < r.length; e++) {
					let t = r[e];
					if (e == r.length - 1 || t.top < t.bottom && t.left < t.right) return t;
				}
			}
			return null;
		}
		return r(t, n);
	}
	measureVisibleLineHeights(e) {
		let t = [], { from: n, to: r } = e, i = this.view.contentDOM.clientWidth, a = i > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, o = -1, s = this.view.textDirection == ju.LTR, c = 0, l = (e, u, d) => {
			for (let f = 0; f < e.children.length && !(u > r); f++) {
				let r = e.children[f], p = u + r.length, m = r.dom.getBoundingClientRect(), { height: h } = m;
				if (d && !f && (c += m.top - d.top), r instanceof Bd) p > n && l(r, u, m);
				else if (u >= n && (c > 0 && t.push(-c), t.push(h + c), c = 0, a)) {
					let e = r.dom.lastChild, t = e ? au(e) : [];
					if (t.length) {
						let e = t[t.length - 1], n = s ? e.right - m.left : m.right - e.left;
						n > o && (o = n, this.minWidth = i, this.minWidthFrom = u, this.minWidthTo = p);
					}
				}
				d && f == e.children.length - 1 && (c += d.bottom - m.bottom), u = p + r.breakAfter;
			}
		};
		return l(this.tile, 0, null), t;
	}
	textDirectionAt(e) {
		let { tile: t } = this.tile.resolveBlock(e, 1);
		return getComputedStyle(t.dom).direction == "rtl" ? ju.RTL : ju.LTR;
	}
	measureTextSize() {
		let e = this.tile.blockTiles((e) => {
			if (e.isLine() && e.children.length && e.length <= 20) {
				let t = 0, n;
				for (let r of e.children) {
					if (!r.isText() || /[^ -~]/.test(r.text)) return;
					let e = au(r.dom);
					if (e.length != 1) return;
					t += e[0].width, n = e[0].height;
				}
				if (t) return {
					lineHeight: e.dom.getBoundingClientRect().height,
					charWidth: t / e.length,
					textHeight: n
				};
			}
		});
		if (e) return e;
		let t = document.createElement("div"), n, r, i;
		return t.className = "cm-line", t.style.width = "99999px", t.style.position = "absolute", t.textContent = "abc def ghi jkl mno pqr stu", this.view.observer.ignore(() => {
			this.tile.dom.appendChild(t);
			let e = au(t.firstChild)[0];
			n = t.getBoundingClientRect().height, r = e && e.width ? e.width / 27 : 7, i = e && e.height ? e.height : n, t.remove();
		}), {
			lineHeight: n,
			charWidth: r,
			textHeight: i
		};
	}
	computeBlockGapDeco() {
		let e = [], t = this.view.viewState;
		for (let n = 0, r = 0;; r++) {
			let i = r == t.viewports.length ? null : t.viewports[r], a = i ? i.from - 1 : this.view.state.doc.length;
			if (a > n) {
				let r = (t.lineBlockAt(a).bottom - t.lineBlockAt(n).top) / this.view.scaleY;
				e.push(Kl.replace({
					widget: new Sf(r),
					block: !0,
					inclusive: !0,
					isBlockGap: !0
				}).range(n, a));
			}
			if (!i) break;
			n = i.to + 1;
		}
		return Kl.set(e);
	}
	updateDeco() {
		let e = 1, t = this.view.state.facet(Sd).map((t) => (this.dynamicDecorationMap[e++] = typeof t == "function") ? t(this.view) : t), n = !1, r = this.view.state.facet(wd).map((e, t) => {
			let r = typeof e == "function";
			return r && (n = !0), r ? e(this.view) : e;
		});
		for (r.length && (this.dynamicDecorationMap[e++] = n, t.push(Xc.join(r))), this.decorations = [
			this.editContextFormatting,
			...t,
			this.computeBlockGapDeco(),
			this.view.viewState.lineGapDeco
		]; e < this.decorations.length;) this.dynamicDecorationMap[e++] = !1;
		this.blockWrappers = this.view.state.facet(Cd).map((e) => typeof e == "function" ? e(this.view) : e);
	}
	scrollIntoView(e) {
		if (e.isSnapshot) {
			let t = this.view.viewState.lineBlockAt(e.range.head);
			this.view.scrollDOM.scrollTop = t.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
			return;
		}
		for (let t of this.view.state.facet(ud)) try {
			if (t(this.view, e.range, e)) return !0;
		} catch (e) {
			md(this.view.state, e, "scroll handler");
		}
		let { range: t } = e, n = this.coordsAt(t.head, t.assoc || (t.head > t.anchor ? -1 : 1)), r;
		if (!n) return;
		!t.empty && (r = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (n = {
			left: Math.min(n.left, r.left),
			top: Math.min(n.top, r.top),
			right: Math.max(n.right, r.right),
			bottom: Math.max(n.bottom, r.bottom)
		});
		let { offsetWidth: i, offsetHeight: a } = this.view.scrollDOM;
		if (hu(this.view.scrollDOM, n, jd(this.view), t.head < t.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, i), -i), Math.max(Math.min(e.yMargin, a), -a), this.view.textDirection == ju.LTR), window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (n.top > window.visualViewport.offsetTop + window.visualViewport.height || n.bottom < window.visualViewport.offsetTop)) {
			let e = this.view.docView.lineAt(t.head, 1);
			if (e) {
				let t = vu(e.dom);
				e.dom.scrollIntoView({ block: "nearest" }), yu(t, !1);
			}
		}
	}
	lineHasWidget(e) {
		let t = (e) => e.isWidget() || e.children.some(t);
		return t(this.tile.resolveBlock(e, 1).tile);
	}
	destroy() {
		df(this.tile);
	}
};
function df(e, t) {
	let n = t?.get(e);
	if (n != 1) {
		n ?? e.destroy();
		for (let n of e.children) df(n, t);
	}
}
function ff(e) {
	return eu(e.node) && e.node.firstChild && (e.offset == 0 || e.node.childNodes[e.offset - 1].contentEditable == "false") && (e.offset == e.node.childNodes.length || e.node.childNodes[e.offset].contentEditable == "false");
}
function pf(e, t) {
	let n = e.observer.selectionRange;
	if (!n.focusNode) return null;
	let r = Ou(n.focusNode, n.focusOffset), i = ku(n.focusNode, n.focusOffset), a = r || i;
	if (i && r && i.node != r.node) {
		let t = Id.get(i.node);
		if (!t || t.isText() && t.text != i.node.nodeValue) a = i;
		else if (e.docView.lastCompositionAfterCursor) {
			let e = Id.get(r.node);
			!e || e.isText() && e.text != r.node.nodeValue || (a = i);
		}
	}
	if (e.docView.lastCompositionAfterCursor = a != r, !a) return null;
	let o = t - a.offset;
	return {
		from: o,
		to: o + a.node.nodeValue.length,
		node: a.node
	};
}
function mf(e, t, n) {
	let r = pf(e, n);
	if (!r) return null;
	let { node: i, from: a, to: o } = r, s = i.nodeValue;
	if (/[\n\r]/.test(s) || e.state.doc.sliceString(r.from, r.to) != s) return null;
	let c = t.invertedDesc;
	return {
		range: new Nd(c.mapPos(a), c.mapPos(o), a, o),
		text: i
	};
}
function hf(e, t) {
	return eu(e) ? (t && e.childNodes[t - 1].contentEditable == "false" ? 1 : 0) | (t < e.childNodes.length && e.childNodes[t].contentEditable == "false" ? 2 : 0) : 0;
}
var gf = class {
	constructor() {
		this.changes = [];
	}
	compareRange(e, t) {
		Ql(e, t, this.changes);
	}
	comparePoint(e, t) {
		Ql(e, t, this.changes);
	}
	boundChange(e) {
		Ql(e, e, this.changes);
	}
};
function _f(e, t, n) {
	let r = new gf();
	return Xc.compare(e, t, n, r), r.changes;
}
var vf = class {
	constructor() {
		this.changes = [];
	}
	compareRange(e, t) {
		Ql(e, t, this.changes);
	}
	comparePoint() {}
	boundChange(e) {
		Ql(e, e, this.changes);
	}
};
function yf(e, t, n) {
	let r = new vf();
	return Xc.compare(e, t, n, r), r.changes;
}
function bf(e, t) {
	for (let n = e; n && n != t; n = n.assignedSlot || n.parentNode) if (eu(n) && n.contentEditable == "false") return !0;
	return !1;
}
function xf(e, t) {
	let n = !1;
	return t && e.iterChangedRanges((e, r) => {
		e < t.to && r > t.from && (n = !0);
	}), n;
}
var Sf = class extends Wl {
	constructor(e) {
		super(), this.height = e;
	}
	toDOM() {
		let e = document.createElement("div");
		return e.className = "cm-gap", this.updateDOM(e), e;
	}
	eq(e) {
		return e.height == this.height;
	}
	updateDOM(e) {
		return e.style.height = this.height + "px", !0;
	}
	get editable() {
		return !0;
	}
	get estimatedHeight() {
		return this.height;
	}
	ignoreEvent() {
		return !1;
	}
};
function Cf(e, t, n = 1) {
	let r = e.charCategorizer(t), i = e.doc.lineAt(t), a = t - i.from;
	if (i.length == 0) return z.cursor(t);
	a == 0 ? n = 1 : a == i.length && (n = -1);
	let o = a, s = a;
	n < 0 ? o = Ls(i.text, a, !1) : s = Ls(i.text, a);
	let c = r(i.text.slice(o, s));
	for (; o > 0;) {
		let e = Ls(i.text, o, !1);
		if (r(i.text.slice(e, o)) != c) break;
		o = e;
	}
	for (; s < i.length;) {
		let e = Ls(i.text, s);
		if (r(i.text.slice(s, e)) != c) break;
		s = e;
	}
	return z.undirectionalRange(o + i.from, s + i.from);
}
function wf(e, t, n, r, i) {
	let a = Math.round((r - t.left) * e.defaultCharacterWidth);
	if (e.lineWrapping && n.height > e.defaultLineHeight * 1.5) {
		let t = e.viewState.heightOracle.textHeight, r = Math.floor((i - n.top - (e.defaultLineHeight - t) * .5) / t);
		a += r * e.viewState.heightOracle.lineLength;
	}
	let o = e.state.sliceDoc(n.from, n.to);
	return n.from + dl(o, a, e.state.tabSize);
}
function Tf(e, t, n) {
	let r = e.lineBlockAt(t);
	if (Array.isArray(r.type)) {
		let e;
		for (let i of r.type) {
			if (i.from > t) break;
			if (!(i.to < t)) {
				if (i.from < t && i.to > t) return i;
				(!e || i.type == Gl.Text && (e.type != i.type || (n < 0 ? i.from < t : i.to > t))) && (e = i);
			}
		}
		return e || r;
	}
	return r;
}
function Ef(e, t, n, r) {
	let i = Tf(e, t.head, t.assoc || -1), a = !r || i.type != Gl.Text || !(e.lineWrapping || i.widgetLineBreaks) ? null : e.coordsAtPos(t.assoc < 0 && t.head > i.from ? t.head - 1 : t.head);
	if (a) {
		let t = e.dom.getBoundingClientRect(), r = e.textDirectionAt(i.from), o = e.posAndSideAtCoords({
			x: n == (r == ju.LTR) ? t.right - 1 : t.left + 1,
			y: (a.top + a.bottom) / 2
		});
		if (o) return z.cursor(o.pos, o.assoc);
	}
	return z.cursor(n ? i.to : i.from, n ? 1 : -1);
}
function Df(e, t, n, r) {
	let i = e.state.doc.lineAt(t.head), a = e.bidiSpans(i), o = e.textDirectionAt(i.from);
	for (let s = t, c = null;;) {
		let t = Zu(i, a, o, s, n), l = Xu;
		if (!t) {
			if (i.number == (n ? e.state.doc.lines : 1)) return s;
			l = "\n", i = e.state.doc.line(i.number + (n ? 1 : -1)), a = e.bidiSpans(i), t = n ? z.cursor(i.from, -1) : z.cursor(i.to, 1);
		}
		if (!c) {
			if (!r) return t;
			c = r(l);
		} else if (!c(l)) return s;
		s = t;
	}
}
function Of(e, t, n) {
	let r = e.state.charCategorizer(t), i = r(n);
	return (e) => {
		let t = r(e);
		return i == Rc.Space && (i = t), i == t;
	};
}
function kf(e, t, n, r) {
	let i = t.head, a = n ? 1 : -1;
	if (i == (n ? e.state.doc.length : 0)) return z.cursor(i, t.assoc);
	let o = t.goalColumn, s, c = e.contentDOM.getBoundingClientRect(), l = e.coordsAtPos(i, t.assoc || ((t.empty ? n : t.head == t.from) ? 1 : -1)), u = e.documentTop;
	if (l) o ??= l.left - c.left, s = a < 0 ? l.top : l.bottom;
	else {
		let t = e.viewState.lineBlockAt(i);
		o ??= Math.min(c.right - c.left, e.defaultCharacterWidth * (i - t.from)), s = (a < 0 ? t.top : t.bottom) + u;
	}
	let d = c.left + o, f = e.viewState.heightOracle.textHeight >> 1, p = r ?? f;
	for (let t = 0;; t += f) {
		let r = s + (p + t) * a, i = Pf(e, {
			x: d,
			y: r
		}, !1, a);
		if (n ? r > c.bottom : r < c.top) return z.cursor(i.pos, i.assoc);
		let l = e.coordsAtPos(i.pos, i.assoc), u = l ? (l.top + l.bottom) / 2 : 0;
		if (!l || (n ? u > s : u < s)) return z.cursor(i.pos, i.assoc, void 0, o);
	}
}
function Af(e, t, n) {
	for (;;) {
		let r = 0;
		for (let i of e) i.between(t - 1, t + 1, (e, i, a) => {
			if (t > e && t < i) {
				let a = r || n || (t - e < i - t ? -1 : 1);
				t = a < 0 ? e : i, r = a;
			}
		});
		if (!r) return t;
	}
}
function jf(e, t) {
	let n = null;
	for (let r = 0; r < t.ranges.length; r++) {
		let i = t.ranges[r], a = null;
		if (i.empty) {
			let t = Af(e, i.from, 0);
			t != i.from && (a = z.cursor(t, -1));
		} else {
			let t = Af(e, i.from, -1), n = Af(e, i.to, 1);
			(t != i.from || n != i.to) && (a = i.undirectional ? z.undirectionalRange(i.from, i.to) : z.range(i.from == i.anchor ? t : n, i.from == i.head ? t : n));
		}
		a && (n ||= t.ranges.slice(), n[r] = a);
	}
	return n ? z.create(n, t.mainIndex) : t;
}
function Mf(e, t, n) {
	let r = Af(e.state.facet(Td).map((t) => t(e)), n.from, t.head > n.from ? -1 : 1);
	return r == n.from ? n : z.cursor(r, r < n.from ? 1 : -1);
}
var Nf = class {
	constructor(e, t) {
		this.pos = e, this.assoc = t;
	}
};
function Pf(e, t, n, r) {
	let i = e.contentDOM.getBoundingClientRect(), a = i.top + e.viewState.paddingTop, { x: o, y: s } = t, c = s - a, l;
	for (;;) {
		if (c < 0) return new Nf(0, 1);
		if (c > e.viewState.docHeight) return new Nf(e.state.doc.length, -1);
		if (l = e.elementAtHeight(c), r == null) break;
		if (l.type == Gl.Text) {
			if (r < 0 ? l.to < e.viewport.from : l.from > e.viewport.to) break;
			let t = e.docView.coordsAt(r < 0 ? l.from : l.to, r > 0 ? -1 : 1);
			if (t && (r < 0 ? t.top <= c + a : t.bottom >= c + a)) break;
		}
		let t = e.viewState.heightOracle.textHeight / 2;
		c = r > 0 ? l.bottom + t : l.top - t;
	}
	if (e.viewport.from >= l.to || e.viewport.to <= l.from) {
		if (n) return null;
		if (l.type == Gl.Text) {
			let t = wf(e, i, l, o, s);
			return new Nf(t, t == l.from ? 1 : -1);
		}
	}
	if (l.type != Gl.Text) return c < (l.top + l.bottom) / 2 ? new Nf(l.from, 1) : new Nf(l.to, -1);
	let u = e.docView.lineAt(l.from, 2);
	return u && u.length == l.length || (u = e.docView.lineAt(l.from, -2)), new Ff(e, o, s, e.textDirectionAt(l.from)).scanTile(u, l.from);
}
var Ff = class {
	constructor(e, t, n, r) {
		this.view = e, this.x = t, this.y = n, this.baseDir = r, this.line = null, this.spans = null;
	}
	bidiSpansAt(e) {
		return (!this.line || this.line.from > e || this.line.to < e) && (this.line = this.view.state.doc.lineAt(e), this.spans = this.view.bidiSpans(this.line)), this;
	}
	baseDirAt(e, t) {
		let { line: n, spans: r } = this.bidiSpansAt(e);
		return r[Vu.find(r, e - n.from, -1, t)].level == this.baseDir;
	}
	dirAt(e, t) {
		let { line: n, spans: r } = this.bidiSpansAt(e);
		return r[Vu.find(r, e - n.from, -1, t)].dir;
	}
	bidiIn(e, t) {
		let { spans: n, line: r } = this.bidiSpansAt(e);
		return n.length > 1 || n.length && (n[0].level != this.baseDir || n[0].to + r.from < t);
	}
	scan(e, t, n = !1) {
		let r = 0, i = e.length - 1, a = /* @__PURE__ */ new Set(), o = this.bidiIn(e[0], e[i]), s, c, l = -1, u = 1e9, d;
		for (; r < i;) {
			let n = i - r, f = r + i >> 1;
			e: if (a.has(f)) {
				for (let e = 1; e < n; e++) {
					let t = f + e;
					if (t >= i && (t -= n), !a.has(t)) {
						f = t;
						break e;
					}
				}
				break;
			}
			a.add(f);
			let p = t(f), m = 0;
			if (p) for (let e = 0; e < p.length; e++) {
				let t = p[e];
				if (!(t.width == 0 && p.length > 1)) {
					if (t.bottom < this.y) (!s || s.bottom < t.bottom) && (s = t), m = 1;
					else if (t.top > this.y) (!c || c.top > t.top) && (c = t), m = -1;
					else {
						let e = t.left > this.x ? this.x - t.left : t.right < this.x ? this.x - t.right : 0, n = Math.abs(e);
						n < u && (l = f, u = n, d = t), e && (m = e < 0 == (this.baseDir == ju.LTR) ? -1 : 1);
					}
				}
			}
			m == -1 && (!o || this.baseDirAt(e[f], 1)) ? i = f : m == 1 && (!o || this.baseDirAt(e[f + 1], -1)) && (r = f + 1);
		}
		if (!d) {
			if (!c && !s) return {
				i: 0,
				after: !1
			};
			let n = s && (!c || this.y - s.bottom < c.top - this.y) ? s : c;
			return this.y = (n.top + n.bottom) / 2, this.scan(e, t, !0);
		}
		if (u && !n) {
			let { top: n, bottom: r } = d;
			if (s && s.bottom > (n + n + r) / 3) return this.y = s.bottom - 1, this.scan(e, t, !0);
			if (c && c.top < (n + r + r) / 3) return this.y = c.top + 1, this.scan(e, t, !0);
		}
		let f = (o ? this.dirAt(e[l], 1) : this.baseDir) == ju.LTR;
		return {
			i: l,
			after: this.x > (d.left + d.right) / 2 == f
		};
	}
	scanText(e, t) {
		let n = [];
		for (let r = 0; r < e.length; r = Ls(e.text, r)) n.push(t + r);
		n.push(t + e.length);
		let r = this.scan(n, (r) => {
			let i = n[r] - t, a = n[r + 1] - t;
			return Cu(e.dom, i, a).getClientRects();
		});
		return r.after ? new Nf(n[r.i + 1], -1) : new Nf(n[r.i], 1);
	}
	scanTile(e, t) {
		if (!e.length) return new Nf(t, 1);
		if (e.children.length == 1) {
			let n = e.children[0];
			if (n.isText()) return this.scanText(n, t);
			if (n.isComposite()) return this.scanTile(n, t);
		}
		let n = [t];
		for (let r = 0, i = t; r < e.children.length; r++) n.push(i += e.children[r].length);
		let r = this.scan(n, (t) => {
			let n = e.children[t];
			return n.flags & 48 ? null : (eu(n.dom) ? n.dom : Cu(n.dom, 0, n.length)).getClientRects();
		}), i = e.children[r.i], a = n[r.i];
		return i.isText() ? this.scanText(i, a) : i.isComposite() ? this.scanTile(i, a) : r.after ? new Nf(n[r.i + 1], -1) : new Nf(a, 1);
	}
}, If = "￿", Lf = class {
	constructor(e, t) {
		this.points = e, this.text = "", this.afterBreak = !0, this.lineSeparator = t.state.facet(Uc.lineSeparator);
	}
	append(e) {
		this.text += e, e.length && (this.afterBreak = !1);
	}
	lineBreak() {
		this.text += If, this.afterBreak = !0;
	}
	readRange(e, t, n) {
		for (let r = e; r;) if (t) {
			let e = r.nextSibling;
			if (!e) {
				r = r.parentNode;
				let e = Id.get(r);
				if (e && !e.parent) break;
				this.findPointAtEnd(r), (e ? e.breakAfter : cu(r) && !zf(r, n)) && this.lineBreak();
			} else if (e == n) break;
			else r = e, t = !1;
		} else {
			this.findPointBefore(r);
			let e = Id.get(r), i = e && e.overrideDOMText;
			if (i != null) {
				this.findPointInside(r, i.length);
				for (let e = i.iter(); !e.next().done;) e.lineBreak ? this.lineBreak() : this.append(e.value);
			} else if (tu(r)) this.readTextNode(r);
			else if (r.nodeName == "BR") r.nextSibling && this.lineBreak();
			else if (eu(r)) {
				(e ? e.isBlock() : cu(r)) && !this.afterBreak && this.lineBreak();
				let t = r.firstChild;
				if (t) {
					if (t == n) break;
					r = t;
					continue;
				}
				(e ? e.breakAfter : cu(r) && !zf(r, n)) && this.lineBreak();
			}
			t = !0;
		}
		return this;
	}
	readTextNode(e) {
		let t = e.nodeValue;
		for (let n of this.points) n.node == e && (n.pos = this.text.length + Math.min(n.offset, t.length));
		for (let n = 0, r = this.lineSeparator ? null : /\r\n?|\n/g;;) {
			let i = -1, a = 1, o;
			if (this.lineSeparator ? (i = t.indexOf(this.lineSeparator, n), a = this.lineSeparator.length) : (o = r.exec(t)) && (i = o.index, a = o[0].length), this.append(t.slice(n, i < 0 ? t.length : i)), i < 0) break;
			if (this.lineBreak(), a > 1) for (let t of this.points) t.node == e && t.pos > this.text.length && (t.pos -= a - 1);
			n = i + a;
		}
	}
	findPointBefore(e) {
		let t = e.parentNode;
		for (let n of this.points) n.node == t && t.childNodes[n.offset] == e && (n.pos = this.text.length);
	}
	findPointAtEnd(e) {
		for (let t of this.points) t.node == e && t.offset == e.childNodes.length && (t.pos = this.text.length);
	}
	findPointInside(e, t) {
		for (let n of this.points) (tu(e) ? n.node == e : e.contains(n.node)) && (n.pos = this.text.length + (Rf(e, n.node, n.offset) ? t : 0));
	}
};
function Rf(e, t, n) {
	for (;;) {
		if (!t || n < uu(t)) return !1;
		if (t == e) return !0;
		n = su(t) + 1, t = t.parentNode;
	}
}
function zf(e, t) {
	let n;
	for (let r = e.nextSibling; r && e != t; r = r.nextSibling) {
		let t = Id.get(e);
		if (!t?.isWidget()) return !1;
		t && (n ||= []).push(t);
	}
	if (n) {
		for (let e of n) if (e.overrideDOMText?.length) return !1;
	}
	return !0;
}
var Bf = class {
	constructor(e, t) {
		this.node = e, this.offset = t, this.pos = -1;
	}
}, Vf = class {
	constructor(e, t, n, r) {
		this.typeOver = r, this.bounds = null, this.text = "", this.domChanged = t > -1;
		let { impreciseHead: i, impreciseAnchor: a } = e.docView, o = e.state.selection;
		if (e.state.readOnly && t > -1) this.newSel = null;
		else if (t > -1 && (this.bounds = Hf(e.docView.tile, t, n))) {
			let t = i || a ? [] : qf(e), n = new Lf(t, e);
			this.bounds.startDOM ? n.readRange(this.bounds.startDOM, !0, this.bounds.endDOM) : e.contentDOM.firstChild && n.readRange(e.contentDOM.firstChild, !1, this.bounds.endDOM), this.text = n.text, this.newSel = Jf(t, this.bounds.from);
		} else {
			let t = e.observer.selectionRange, n = i && i.node == t.focusNode && i.offset == t.focusOffset || !ru(e.contentDOM, t.focusNode) ? o.main.head : e.docView.posFromDOM(t.focusNode, t.focusOffset), r = a && a.node == t.anchorNode && a.offset == t.anchorOffset || !ru(e.contentDOM, t.anchorNode) ? o.main.anchor : e.docView.posFromDOM(t.anchorNode, t.anchorOffset), s = e.viewport;
			if ((V.ios || V.chrome) && n != r && Math.min(n, r) <= o.main.from && Math.max(n, r) >= o.main.to && (s.from > 0 || s.to < e.state.doc.length)) {
				let t = Math.min(n, r), i = Math.max(n, r), a = s.from - t, o = s.to - i;
				a != 0 && a != 1 && t != 0 || o != 0 && o != -1 && i != e.state.doc.length || (n = 0, r = e.state.doc.length);
			}
			if (e.inputState.composing > -1 && o.ranges.length > 1) this.newSel = o.replaceRange(z.range(r, n));
			else if (e.lineWrapping && r == n && !(o.main.empty && o.main.head == n) && e.inputState.lastTouchTime > Date.now() - 100) {
				let t = e.coordsAtPos(n, -1), r = 0;
				t && (r = e.inputState.lastTouchY <= t.bottom ? -1 : 1), this.newSel = z.create([z.cursor(n, r)]);
			} else this.newSel = z.single(r, n);
		}
	}
};
function Hf(e, t, n) {
	let r = null, i = null, a = (e, o) => {
		for (let s = 0; s < e.children.length && !i; s++) {
			let c = e.children[s], l = o + c.length;
			c.dom.parentNode == e.dom && (l < t ? r = c : o > n ? i = c : (o < t || l > n) && a(c, o)), o = l + c.breakAfter;
		}
	};
	return a(e, 0), {
		from: r ? r.posAtEnd + r.breakAfter : 0,
		to: i ? i.posAtStart : e.length,
		startDOM: r ? r.dom : null,
		endDOM: i ? i.dom : null
	};
}
function Uf(e, t) {
	let n, { newSel: r } = t, { state: i } = e, a = i.selection.main, o = e.inputState.lastKeyTime > Date.now() - 100 ? e.inputState.lastKeyCode : -1;
	if (t.bounds) {
		let { from: e, to: r } = t.bounds, s = a.from, c = null;
		(o === 8 || V.android && t.text.length < r - e) && (s = a.to, c = "end");
		let l = i.doc.sliceString(e, r, If), u, d;
		!a.empty && a.from >= e && a.to <= r && (t.typeOver || l != t.text) && l.slice(0, a.from - e) == t.text.slice(0, a.from - e) && l.slice(a.to - e) == t.text.slice(u = t.text.length - (l.length - (a.to - e))) ? n = {
			from: a.from,
			to: a.to,
			insert: R.of(t.text.slice(a.from - e, u).split(If))
		} : (d = Kf(l, t.text, s - e, c)) && (V.chrome && o == 13 && d.toB == d.from + 2 && t.text.slice(d.from, d.toB) == "￿￿" && d.toB--, n = {
			from: e + d.from,
			to: e + d.toA,
			insert: R.of(t.text.slice(d.from, d.toB).split(If))
		});
	} else r && (!e.hasFocus && i.facet(hd) || Yf(r, a)) && (r = null);
	if (!n && !r) return !1;
	if ((V.mac || V.android) && n && n.from == n.to && n.from == a.head - 1 && /^\. ?$/.test(n.insert.toString()) && e.contentDOM.getAttribute("autocorrect") == "off" ? (r && n.insert.length == 2 && (r = z.single(r.main.anchor - 1, r.main.head - 1)), n = {
		from: n.from,
		to: n.to,
		insert: R.of([n.insert.toString().replace(".", " ")])
	}) : i.doc.lineAt(a.from).to < a.to && e.docView.lineHasWidget(a.to) && e.inputState.insertingTextAt > Date.now() - 50 ? n = {
		from: a.from,
		to: a.to,
		insert: i.toText(e.inputState.insertingText)
	} : V.chrome && n && n.from == n.to && n.from == a.head && n.insert.toString() == "\n " && e.lineWrapping && (r &&= z.single(r.main.anchor - 1, r.main.head - 1), n = {
		from: a.from,
		to: a.to,
		insert: R.of([" "])
	}), n) return Wf(e, n, r, o);
	if (r && !Yf(r, a)) {
		let t = !1, n = "select";
		return e.inputState.lastSelectionTime > Date.now() - 50 && (e.inputState.lastSelectionOrigin == "select" && (t = !0), n = e.inputState.lastSelectionOrigin, n == "select.pointer" && (r = jf(i.facet(Td).map((t) => t(e)), r))), e.dispatch({
			selection: r,
			scrollIntoView: t,
			userEvent: n
		}), !0;
	}
	return !1;
}
function Wf(e, t, n, r = -1) {
	if (V.ios && e.inputState.flushIOSKey(t)) return !0;
	let i = e.state.selection.main;
	if (V.android && (t.to == i.to && (t.from == i.from || t.from == i.from - 1 && e.state.sliceDoc(t.from, i.from) == " ") && t.insert.length == 1 && t.insert.lines == 2 && wu(e.contentDOM, "Enter", 13) || (t.from == i.from - 1 && t.to == i.to && t.insert.length == 0 || r == 8 && t.insert.length < t.to - t.from && t.to > i.head) && wu(e.contentDOM, "Backspace", 8) || t.from == i.from && t.to == i.to + 1 && t.insert.length == 0 && wu(e.contentDOM, "Delete", 46))) return !0;
	let a = t.insert.toString();
	e.inputState.composing >= 0 && e.inputState.composing++;
	let o, s = () => o ||= Gf(e, t, n);
	return e.state.facet(id).some((n) => n(e, t.from, t.to, a, s)) || e.dispatch(s()), !0;
}
function Gf(e, t, n) {
	let r, i = e.state, a = i.selection.main, o = -1;
	if (t.from == t.to && t.from < a.from || t.from > a.to) {
		let n = t.from < a.from ? -1 : 1, r = n < 0 ? a.from : a.to, s = Af(i.facet(Td).map((t) => t(e)), r, n);
		t.from == s && (o = s);
	}
	if (o > -1) r = {
		changes: t,
		selection: z.cursor(t.from + t.insert.length, -1)
	};
	else if (t.from >= a.from && t.to <= a.to && t.to - t.from >= (a.to - a.from) / 3 && (!n || n.main.empty && n.main.from == t.from + t.insert.length) && e.inputState.composing < 0) {
		let n = a.from < t.from ? i.sliceDoc(a.from, t.from) : "", o = a.to > t.to ? i.sliceDoc(t.to, a.to) : "";
		r = i.replaceSelection(e.state.toText(n + t.insert.sliceString(0, void 0, e.state.lineBreak) + o));
	} else {
		let o = i.changes(t), s = n && n.main.to <= o.newLength ? n.main : void 0;
		if (i.selection.ranges.length > 1 && (e.inputState.composing >= 0 || e.inputState.compositionPendingChange) && t.to <= a.to + 10 && t.to >= a.to - 10) {
			let c = e.state.sliceDoc(t.from, t.to), l, u = n && pf(e, n.main.head);
			if (u) {
				let e = t.insert.length - (t.to - t.from);
				l = {
					from: u.from,
					to: u.to - e
				};
			} else l = e.state.doc.lineAt(a.head);
			let d = a.to - t.to;
			r = i.changeByRange((n) => {
				if (n.from == a.from && n.to == a.to) return {
					changes: o,
					range: s || n.map(o)
				};
				let r = n.to - d, u = r - c.length;
				if (e.state.sliceDoc(u, r) != c || r >= l.from && u <= l.to) return { range: n };
				let f = i.changes({
					from: u,
					to: r,
					insert: t.insert
				}), p = n.to - a.to;
				return {
					changes: f,
					range: s ? z.range(Math.max(0, s.anchor + p), Math.max(0, s.head + p)) : n.map(f)
				};
			});
		} else r = {
			changes: o,
			selection: s && i.selection.replaceRange(s)
		};
	}
	let s = "input.type";
	return (e.composing || e.inputState.compositionPendingChange && e.inputState.compositionEndedAt > Date.now() - 50) && (e.inputState.compositionPendingChange = !1, s += ".compose", e.inputState.compositionFirstChange && (s += ".start", e.inputState.compositionFirstChange = !1)), i.update(r, {
		userEvent: s,
		scrollIntoView: !0
	});
}
function Kf(e, t, n, r) {
	let i = Math.min(e.length, t.length), a = 0;
	for (; a < i && e.charCodeAt(a) == t.charCodeAt(a);) a++;
	if (a == i && e.length == t.length) return null;
	let o = e.length, s = t.length;
	for (; o > 0 && s > 0 && e.charCodeAt(o - 1) == t.charCodeAt(s - 1);) o--, s--;
	if (r == "end") {
		let e = Math.max(0, a - Math.min(o, s));
		n -= o + e - a;
	}
	if (o < a && e.length < t.length) {
		let e = n <= a && n >= o ? a - n : 0;
		a -= e, s = a + (s - o), o = a;
	} else if (s < a) {
		let e = n <= a && n >= s ? a - n : 0;
		a -= e, o = a + (o - s), s = a;
	}
	return {
		from: a,
		toA: o,
		toB: s
	};
}
function qf(e) {
	let t = [];
	if (e.root.activeElement != e.contentDOM) return t;
	let { anchorNode: n, anchorOffset: r, focusNode: i, focusOffset: a } = e.observer.selectionRange;
	return n && (t.push(new Bf(n, r)), (i != n || a != r) && t.push(new Bf(i, a))), t;
}
function Jf(e, t) {
	if (e.length == 0) return null;
	let n = e[0].pos, r = e.length == 2 ? e[1].pos : n;
	return n < 0 || r < 0 ? null : n == r ? z.create([z.cursor(r + t, -1)]) : z.single(n + t, r + t);
}
function Yf(e, t) {
	return t.head == e.main.head && t.anchor == e.main.anchor;
}
var Xf = class {
	setSelectionOrigin(e) {
		this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
	}
	constructor(e) {
		this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.touchActive = !1, this.lastTouchTime = 0, this.lastTouchX = 0, this.lastTouchY = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.lastWheelEvent = 0, this.pendingIOSKey = void 0, this.lastIOSMomentumScroll = 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.androidSelection = -1, this.androidSelectionNeedsFlush = !1, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, V.safari && e.contentDOM.addEventListener("input", () => null), V.gecko && Pp(e.contentDOM.ownerDocument);
	}
	handleEvent(e) {
		up(this.view, e) && !this.ignoreDuringComposition(e) && (e.type == "keydown" && this.keydown(e) || (this.view.updateState == 0 ? this.runHandlers(e.type, e) : Promise.resolve().then(() => this.runHandlers(e.type, e))));
	}
	runHandlers(e, t) {
		let n = this.handlers[e];
		if (n) {
			for (let e of n.observers) e(this.view, t);
			for (let e of n.handlers) {
				if (t.defaultPrevented) break;
				if (e(this.view, t)) {
					t.preventDefault();
					break;
				}
			}
		}
	}
	ensureHandlers(e) {
		let t = $f(e), n = this.handlers, r = this.view.contentDOM;
		for (let e in t) if (e != "scroll") {
			let i = !t[e].handlers.length, a = n[e];
			a && i != !a.handlers.length && (r.removeEventListener(e, this.handleEvent), a = null), a || r.addEventListener(e, this.handleEvent, { passive: i });
		}
		for (let e in n) e != "scroll" && !t[e] && r.removeEventListener(e, this.handleEvent);
		this.handlers = t;
	}
	keydown(e) {
		if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), this.composing >= 0 && e.isComposing === !1 && Mp(this.view), e.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode)) return !0;
		if (this.tabFocusMode > 0 && e.keyCode != 27 && np.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), V.android && V.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8)) return this.view.observer.delayAndroidKey(e.key, e.keyCode), !0;
		if (V.ios && !e.synthetic && !e.altKey && !e.metaKey && (ep.some((t) => t.keyCode == e.keyCode) && !e.ctrlKey || tp.indexOf(e.key) > -1 && e.ctrlKey)) {
			let t = {
				ctrlKey: e.ctrlKey,
				altKey: e.altKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey
			};
			t.shiftKey && V.ios && !/^(off|none)$/.test(this.view.contentDOM.autocapitalize) && Zf(this.view.win) && (t.shiftKey = !1);
			let n = this.pendingIOSKey = {
				key: e.key,
				keyCode: e.keyCode,
				mods: t
			};
			return setTimeout(() => {
				this.pendingIOSKey == n && this.flushIOSKey();
			}, 50), !0;
		}
		return e.keyCode != 229 && this.view.observer.forceFlush(), !1;
	}
	flushIOSKey(e) {
		let t = this.pendingIOSKey;
		return !t || this.view.observer.pendingRecords().length || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, wu(this.view.contentDOM, t.key, t.keyCode, t.mods));
	}
	ignoreDuringComposition(e) {
		return !/^key/.test(e.type) || e.synthetic ? !1 : this.composing > 0 ? !0 : V.safari && !V.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1;
	}
	startMouseSelection(e) {
		this.mouseSelection && this.mouseSelection.destroy(), this.mouseSelection = e;
	}
	update(e) {
		this.view.observer.update(e), this.mouseSelection && this.mouseSelection.update(e), this.draggedContent && e.docChanged && (this.draggedContent = this.draggedContent.map(e.changes)), e.transactions.length && (this.lastKeyCode = this.lastSelectionTime = 0);
	}
	destroy() {
		this.mouseSelection && this.mouseSelection.destroy();
	}
	selectionchange() {
		this.androidSelection > -1 && this.scheduleAndroidSelectionEnd();
	}
	startAndroidSelection() {
		this.scheduleAndroidSelectionEnd();
	}
	scheduleAndroidSelectionEnd() {
		this.view.win.clearTimeout(this.androidSelection), this.androidSelection = this.view.win.setTimeout(() => this.endAndroidSelection(), 1e3);
	}
	endAndroidSelection() {
		this.androidSelection > -1 && (this.view.win.clearTimeout(this.androidSelection), this.androidSelection = -1, this.androidSelectionNeedsFlush && (this.androidSelectionNeedsFlush = !1, this.view.docView.updateSelection(!0)));
	}
};
function Zf(e) {
	return e.visualViewport ? e.visualViewport.height * e.visualViewport.scale / e.document.documentElement.clientHeight < .85 : !1;
}
function Qf(e, t) {
	return (n, r) => {
		try {
			return t.call(e, r, n);
		} catch (e) {
			md(n.state, e);
		}
	};
}
function $f(e) {
	let t = Object.create(null);
	function n(e) {
		return t[e] || (t[e] = {
			observers: [],
			handlers: []
		});
	}
	for (let t of e) {
		let e = t.spec, r = e && e.plugin.domEventHandlers, i = e && e.plugin.domEventObservers;
		if (r) for (let e in r) {
			let i = r[e];
			i && n(e).handlers.push(Qf(t.value, i));
		}
		if (i) for (let e in i) {
			let r = i[e];
			r && n(e).observers.push(Qf(t.value, r));
		}
	}
	for (let e in dp) n(e).handlers.push(dp[e]);
	for (let e in fp) n(e).observers.push(fp[e]);
	return t;
}
var ep = [
	{
		key: "Backspace",
		keyCode: 8,
		inputType: "deleteContentBackward"
	},
	{
		key: "Enter",
		keyCode: 13,
		inputType: "insertParagraph"
	},
	{
		key: "Enter",
		keyCode: 13,
		inputType: "insertLineBreak"
	},
	{
		key: "Delete",
		keyCode: 46,
		inputType: "deleteContentForward"
	}
], tp = "dthko", np = [
	16,
	17,
	18,
	20,
	91,
	92,
	224,
	225
], rp = 6;
function ip(e) {
	return Math.max(0, e) * .7 + 8;
}
function ap(e, t) {
	return Math.max(Math.abs(e.clientX - t.clientX), Math.abs(e.clientY - t.clientY));
}
var op = class {
	constructor(e, t, n, r) {
		this.view = e, this.startEvent = t, this.style = n, this.mustSelect = r, this.scrollSpeed = {
			x: 0,
			y: 0
		}, this.scrolling = -1, this.lastEvent = t, this.scrollParents = gu(e.contentDOM), this.atoms = e.state.facet(Td).map((t) => t(e));
		let i = e.contentDOM.ownerDocument;
		i.addEventListener("mousemove", this.move = this.move.bind(this)), i.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(Uc.allowMultipleSelections) && sp(e, t), this.dragging = lp(e, t) && Sp(t) == 1 ? null : !1;
	}
	start(e) {
		this.dragging === !1 && this.select(e);
	}
	move(e) {
		if (e.buttons == 0) return this.destroy();
		if (this.dragging || this.dragging == null && ap(this.startEvent, e) < 10) return;
		this.select(this.lastEvent = e);
		let t = 0, n = 0, r = 0, i = 0, a = this.view.win.innerWidth, o = this.view.win.innerHeight;
		this.scrollParents.x && ({left: r, right: a} = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({top: i, bottom: o} = this.scrollParents.y.getBoundingClientRect());
		let s = fu({
			left: r,
			right: a,
			top: i,
			bottom: o
		}, jd(this.view));
		e.clientX <= s.left + rp ? t = -ip(s.left - e.clientX) : e.clientX >= s.right - rp && (t = ip(e.clientX - s.right)), e.clientY <= s.top + rp ? n = -ip(s.top - e.clientY) : e.clientY >= s.bottom - rp && (n = ip(e.clientY - s.bottom)), this.setScrollSpeed(t, n);
	}
	up(e) {
		this.dragging ?? this.select(this.lastEvent), this.dragging || e.preventDefault(), this.destroy();
	}
	destroy() {
		this.setScrollSpeed(0, 0);
		let e = this.view.contentDOM.ownerDocument;
		e.removeEventListener("mousemove", this.move), e.removeEventListener("mouseup", this.up), this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
	}
	setScrollSpeed(e, t) {
		this.scrollSpeed = {
			x: e,
			y: t
		}, e || t ? this.scrolling < 0 && (this.scrolling = setInterval(() => this.scroll(), 50)) : this.scrolling > -1 && (clearInterval(this.scrolling), this.scrolling = -1);
	}
	scroll() {
		let { x: e, y: t } = this.scrollSpeed;
		e && this.scrollParents.x && (this.scrollParents.x.scrollLeft += e, e = 0), t && this.scrollParents.y && (this.scrollParents.y.scrollTop += t, t = 0), (e || t) && this.view.win.scrollBy(e, t), this.dragging === !1 && this.select(this.lastEvent);
	}
	select(e) {
		let { view: t } = this, n = jf(this.atoms, this.style.get(e, this.extend, this.multiple));
		(this.mustSelect || !n.eq(t.state.selection, this.dragging === !1)) && this.view.dispatch({
			selection: n,
			userEvent: "select.pointer"
		}), this.mustSelect = !1;
	}
	update(e) {
		e.transactions.some((e) => e.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
	}
};
function sp(e, t) {
	let n = e.state.facet($u);
	return n.length ? n[0](t) : V.mac ? t.metaKey : t.ctrlKey;
}
function cp(e, t) {
	let n = e.state.facet(ed);
	return n.length ? n[0](t) : V.mac ? !t.altKey : !t.ctrlKey;
}
function lp(e, t) {
	let { main: n } = e.state.selection;
	if (n.empty) return !1;
	let r = nu(e.root);
	if (!r || r.rangeCount == 0) return !0;
	let i = r.getRangeAt(0).getClientRects();
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		if (n.left <= t.clientX && n.right >= t.clientX && n.top <= t.clientY && n.bottom >= t.clientY) return !0;
	}
	return !1;
}
function up(e, t) {
	if (!t.bubbles) return !0;
	if (t.defaultPrevented) return !1;
	for (let n = t.target, r; n != e.contentDOM; n = n.parentNode) if (!n || n.nodeType == 11 || (r = Id.get(n)) && r.isWidget() && !r.isHidden && r.widget.ignoreEvent(t)) return !1;
	return !0;
}
var dp = /*@__PURE__*/ Object.create(null), fp = /*@__PURE__*/ Object.create(null), pp = V.ie && V.ie_version < 15 || V.ios && V.webkit_version < 604;
function mp(e) {
	let t = e.dom.parentNode;
	if (!t) return;
	let n = t.appendChild(document.createElement("textarea"));
	n.style.cssText = "position: fixed; left: -10000px; top: 10px", n.focus(), setTimeout(() => {
		e.focus(), n.remove(), gp(e, n.value);
	}, 50);
}
function hp(e, t, n) {
	for (let r of e.facet(t)) n = r(n, e);
	return n;
}
function gp(e, t) {
	t = hp(e.state, od, t);
	let { state: n } = e, r, i = 1, a = n.toText(t), o = a.lines == n.selection.ranges.length;
	if (Op != null && n.selection.ranges.every((e) => e.empty) && Op == a.toString()) {
		let e = -1;
		r = n.changeByRange((r) => {
			let s = n.doc.lineAt(r.from);
			if (s.from == e) return { range: r };
			e = s.from;
			let c = n.toText((o ? a.line(i++).text : t) + n.lineBreak);
			return {
				changes: {
					from: s.from,
					insert: c
				},
				range: z.cursor(r.from + c.length, -1)
			};
		});
	} else r = o ? n.changeByRange((e) => {
		let t = a.line(i++);
		return {
			changes: {
				from: e.from,
				to: e.to,
				insert: t.text
			},
			range: z.cursor(e.from + t.length, -1)
		};
	}) : n.replaceSelection(a);
	e.dispatch(r, {
		userEvent: "input.paste",
		scrollIntoView: !0
	});
}
fp.scroll = (e) => {
	let t = e.inputState;
	t.lastScrollTop = e.scrollDOM.scrollTop, t.lastScrollLeft = e.scrollDOM.scrollLeft, V.ios && !t.touchActive && (t.lastIOSMomentumScroll = Date.now());
}, fp.wheel = fp.mousewheel = (e) => {
	e.inputState.lastWheelEvent = Date.now();
}, dp.keydown = (e, t) => (e.inputState.setSelectionOrigin("select"), t.keyCode == 27 && e.inputState.tabFocusMode != 0 && (e.inputState.tabFocusMode = Date.now() + 2e3), !1), fp.touchstart = (e, t) => {
	let n = e.inputState, r = t.targetTouches[0];
	n.touchActive = !0, n.lastTouchTime = Date.now(), r && (n.lastTouchX = r.clientX, n.lastTouchY = r.clientY), n.setSelectionOrigin("select.pointer");
}, fp.touchmove = (e) => {
	e.inputState.setSelectionOrigin("select.pointer");
}, fp.touchend = fp.touchcancel = (e, t) => {
	e.inputState.touchActive = !1, V.chrome && V.android && t.type == "touchcancel" && e.inputState.startAndroidSelection();
}, dp.mousedown = (e, t) => {
	if (e.observer.flush(), e.inputState.lastTouchTime > Date.now() - 2e3) return !1;
	let n = null;
	for (let r of e.state.facet(td)) if (n = r(e, t), n) break;
	if (!n && t.button == 0 && (n = Cp(e, t)), n) {
		let r = !e.hasFocus;
		e.inputState.startMouseSelection(new op(e, t, n, r)), r && e.observer.ignore(() => {
			xu(e.contentDOM);
			let t = e.root.activeElement;
			t && !t.contains(e.contentDOM) && t.blur();
		});
		let i = e.inputState.mouseSelection;
		if (i) return i.start(t), i.dragging === !1;
	} else e.inputState.setSelectionOrigin("select.pointer");
	return !1;
};
function _p(e, t, n, r) {
	if (r == 1) return z.cursor(t, n);
	if (r == 2) return Cf(e.state, t, n);
	{
		let r = e.docView.lineAt(t, n), i = e.state.doc.lineAt(r ? r.posAtEnd : t), a = r ? r.posAtStart : i.from, o = r ? r.posAtEnd : i.to;
		return o < e.state.doc.length && o == i.to && o++, z.undirectionalRange(a, o);
	}
}
var vp = V.ie && V.ie_version <= 11, yp = null, bp = 0, xp = 0;
function Sp(e) {
	if (!vp) return e.detail;
	let t = yp, n = xp;
	return yp = e, xp = Date.now(), bp = !t || n > Date.now() - 400 && Math.abs(t.clientX - e.clientX) < 2 && Math.abs(t.clientY - e.clientY) < 2 ? (bp + 1) % 3 : 1;
}
function Cp(e, t) {
	let n = e.posAndSideAtCoords({
		x: t.clientX,
		y: t.clientY
	}, !1), r = Sp(t), i = e.state.selection;
	return {
		update(e) {
			e.docChanged && (n.pos = e.changes.mapPos(n.pos), i = i.map(e.changes));
		},
		get(t, a, o) {
			let s = e.posAndSideAtCoords({
				x: t.clientX,
				y: t.clientY
			}, !1), c, l = _p(e, s.pos, s.assoc, r);
			if (n.pos != s.pos && !a) {
				let t = _p(e, n.pos, n.assoc, r), i = Math.min(t.from, l.from), a = Math.max(t.to, l.to);
				l = i < l.from ? z.range(i, a, l.assoc) : z.range(a, i, l.assoc);
			}
			return a ? i.replaceRange(i.main.extend(l.from, l.to, l.assoc)) : o && r == 1 && i.ranges.length > 1 && (c = wp(i, s.pos)) ? c : o ? i.addRange(l) : z.create([l]);
		}
	};
}
function wp(e, t) {
	for (let n = 0; n < e.ranges.length; n++) {
		let { from: r, to: i } = e.ranges[n];
		if (r <= t && i >= t) return z.create(e.ranges.slice(0, n).concat(e.ranges.slice(n + 1)), e.mainIndex == n ? 0 : e.mainIndex - +(e.mainIndex > n));
	}
	return null;
}
dp.dragstart = (e, t) => {
	let { selection: { main: n } } = e.state;
	if (t.target.draggable) {
		let r = e.docView.tile.nearest(t.target);
		if (r && r.isWidget()) {
			let e = r.posAtStart, t = e + r.length;
			(e >= n.to || t <= n.from) && (n = z.undirectionalRange(e, t));
		}
	}
	let { inputState: r } = e;
	return r.mouseSelection && (r.mouseSelection.dragging = !0), r.draggedContent = n, t.dataTransfer && (t.dataTransfer.setData("Text", hp(e.state, sd, e.state.sliceDoc(n.from, n.to))), t.dataTransfer.effectAllowed = "copyMove"), !1;
}, dp.dragend = (e) => (e.inputState.draggedContent = null, !1);
function Tp(e, t, n, r) {
	if (n = hp(e.state, od, n), !n) return;
	let i = e.posAtCoords({
		x: t.clientX,
		y: t.clientY
	}, !1), { draggedContent: a } = e.inputState, o = r && a && cp(e, t) ? {
		from: a.from,
		to: a.to
	} : null, s = {
		from: i,
		insert: n
	}, c = e.state.changes(o ? [o, s] : s);
	e.focus(), e.dispatch({
		changes: c,
		selection: {
			anchor: c.mapPos(i, -1),
			head: c.mapPos(i, 1)
		},
		userEvent: o ? "move.drop" : "input.drop"
	}), e.inputState.draggedContent = null;
}
dp.drop = (e, t) => {
	if (!t.dataTransfer) return !1;
	if (e.state.readOnly) return !0;
	let n = t.dataTransfer.files;
	if (n && n.length) {
		let r = Array(n.length), i = 0, a = () => {
			++i == n.length && Tp(e, t, r.filter((e) => e != null).join(e.state.lineBreak), !1);
		};
		for (let e = 0; e < n.length; e++) {
			let t = new FileReader();
			t.onerror = a, t.onload = () => {
				/[\x00-\x08\x0e-\x1f]{2}/.test(t.result) || (r[e] = t.result), a();
			}, t.readAsText(n[e]);
		}
		return !0;
	}
	{
		let n = t.dataTransfer.getData("Text");
		if (n) return Tp(e, t, n, !0), !0;
	}
	return !1;
}, dp.paste = (e, t) => {
	if (e.state.readOnly) return !0;
	e.observer.flush();
	let n = pp ? null : t.clipboardData;
	return n ? (gp(e, n.getData("text/plain") || n.getData("text/uri-list")), !0) : (mp(e), !1);
};
function Ep(e, t) {
	let n = e.dom.parentNode;
	if (!n) return;
	let r = n.appendChild(document.createElement("textarea"));
	r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.value = t, r.focus(), r.selectionEnd = t.length, r.selectionStart = 0, setTimeout(() => {
		r.remove(), e.focus();
	}, 50);
}
function Dp(e) {
	let t = [], n = [], r = !1;
	for (let r of e.selection.ranges) r.empty || (t.push(e.sliceDoc(r.from, r.to)), n.push(r));
	if (!t.length) {
		let i = -1;
		for (let { from: r } of e.selection.ranges) {
			let a = e.doc.lineAt(r);
			a.number > i && (t.push(a.text), n.push({
				from: a.from,
				to: Math.min(e.doc.length, a.to + 1)
			})), i = a.number;
		}
		r = !0;
	}
	return {
		text: hp(e, sd, t.join(e.lineBreak)),
		ranges: n,
		linewise: r
	};
}
var Op = null;
dp.copy = dp.cut = (e, t) => {
	if (!iu(e.contentDOM, e.observer.selectionRange)) return !1;
	let { text: n, ranges: r, linewise: i } = Dp(e.state);
	if (!n && !i) return !1;
	Op = i ? n : null, t.type == "cut" && !e.state.readOnly && e.dispatch({
		changes: r,
		scrollIntoView: !0,
		userEvent: "delete.cut"
	});
	let a = pp ? null : t.clipboardData;
	return a ? (a.clearData(), a.setData("text/plain", n), !0) : (Ep(e, n), !1);
};
var kp = /*@__PURE__*/ Tc.define();
function Ap(e, t) {
	let n = [];
	for (let r of e.facet(ad)) {
		let i = r(e, t);
		i && n.push(i);
	}
	return n.length ? e.update({
		effects: n,
		annotations: kp.of(!0)
	}) : null;
}
function jp(e) {
	setTimeout(() => {
		let t = e.hasFocus;
		if (t != e.inputState.notifiedFocused) {
			let n = Ap(e.state, t);
			n ? e.dispatch(n) : e.update([]);
		}
	}, 10);
}
fp.focus = (e) => {
	e.inputState.lastFocusTime = Date.now(), !e.scrollDOM.scrollTop && (e.inputState.lastScrollTop || e.inputState.lastScrollLeft) && (e.scrollDOM.scrollTop = e.inputState.lastScrollTop, e.scrollDOM.scrollLeft = e.inputState.lastScrollLeft), jp(e);
}, fp.blur = (e) => {
	e.observer.clearSelectionRange(), jp(e);
}, fp.compositionstart = fp.compositionupdate = (e, t) => {
	if (!e.observer.editContext && (e.inputState.compositionFirstChange ?? (e.inputState.compositionFirstChange = !0), e.inputState.composing < 0)) {
		let { main: t } = e.state.selection;
		!t.empty && e.lineBlockAt(t.from).from != e.lineBlockAt(t.to).from && !e.state.readOnly && e.dispatch({
			changes: e.state.selection.ranges.filter((e) => !e.empty).map((e) => ({
				from: e.from,
				to: e.to
			})),
			userEvent: "input"
		}), e.inputState.composing = 0;
	}
};
var Mp = fp.compositionend = (e) => {
	e.observer.editContext || (e.inputState.composing = -1, e.inputState.compositionEndedAt = Date.now(), e.inputState.compositionPendingKey = !0, e.inputState.compositionPendingChange = e.observer.pendingRecords().length > 0, e.inputState.compositionFirstChange = null, V.chrome && V.android ? e.observer.flushSoon() : e.inputState.compositionPendingChange ? Promise.resolve().then(() => e.observer.flush()) : setTimeout(() => {
		e.inputState.composing < 0 && e.docView.hasComposition && e.update([]);
	}, 50));
};
fp.contextmenu = (e) => {
	e.inputState.endAndroidSelection(), e.inputState.lastContextMenu = Date.now();
}, dp.beforeinput = (e, t) => {
	if (e.inputState.composing >= 0 && t.isComposing === !1 && Mp(e), (t.inputType == "insertText" || t.inputType == "insertCompositionText") && (e.inputState.insertingText = t.data, e.inputState.insertingTextAt = Date.now()), t.inputType == "insertReplacementText" && e.observer.editContext) {
		let n = t.dataTransfer?.getData("text/plain"), r = t.getTargetRanges();
		if (n && r.length) {
			let t = r[0];
			return Wf(e, {
				from: e.posAtDOM(t.startContainer, t.startOffset),
				to: e.posAtDOM(t.endContainer, t.endOffset),
				insert: e.state.toText(n)
			}, null), !0;
		}
	}
	let n;
	if (V.chrome && V.android && (n = ep.find((e) => e.inputType == t.inputType)) && (e.observer.delayAndroidKey(n.key, n.keyCode), n.key == "Backspace" || n.key == "Delete")) {
		let t = window.visualViewport?.height || 0;
		setTimeout(() => {
			(window.visualViewport?.height || 0) > t + 10 && e.hasFocus && (e.contentDOM.blur(), e.focus());
		}, 100);
	}
	return V.ios && t.inputType == "deleteContentForward" && e.observer.flushSoon(), V.safari && t.inputType == "insertText" && e.inputState.composing >= 0 && setTimeout(() => fp.compositionend(e, t), 20), !1;
};
var Np = /*@__PURE__*/ new Set();
function Pp(e) {
	Np.has(e) || (Np.add(e), e.addEventListener("copy", () => {}), e.addEventListener("cut", () => {}));
}
var Fp = [
	"pre-wrap",
	"normal",
	"pre-line",
	"break-spaces"
], Ip = !1;
function Lp() {
	Ip = !1;
}
var Rp = class {
	constructor(e) {
		this.lineWrapping = e, this.doc = R.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
	}
	heightForGap(e, t) {
		let n = this.doc.lineAt(t).number - this.doc.lineAt(e).number + 1;
		return this.lineWrapping && (n += Math.max(0, Math.ceil((t - e - n * this.lineLength * .5) / this.lineLength))), this.lineHeight * n;
	}
	heightForLine(e) {
		return this.lineWrapping ? (1 + Math.max(0, Math.ceil((e - this.lineLength) / Math.max(1, this.lineLength - 5)))) * this.lineHeight : this.lineHeight;
	}
	setDoc(e) {
		return this.doc = e, this;
	}
	mustRefreshForWrapping(e) {
		return Fp.indexOf(e) > -1 != this.lineWrapping;
	}
	mustRefreshForHeights(e) {
		let t = !1;
		for (let n = 0; n < e.length; n++) {
			let r = e[n];
			r < 0 ? n++ : this.heightSamples[Math.floor(r * 10)] || (t = !0, this.heightSamples[Math.floor(r * 10)] = !0);
		}
		return t;
	}
	refresh(e, t, n, r, i, a) {
		let o = Fp.indexOf(e) > -1, s = Math.abs(t - this.lineHeight) > .3 || this.lineWrapping != o;
		if (this.lineWrapping = o, this.lineHeight = t, this.charWidth = n, this.textHeight = r, this.lineLength = i, s) {
			this.heightSamples = {};
			for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t < 0 ? e++ : this.heightSamples[Math.floor(t * 10)] = !0;
			}
		}
		return s;
	}
}, zp = class {
	constructor(e, t, n) {
		this.from = e, this.heights = t, this.gaps = n, this.index = 0;
	}
	get more() {
		return this.index < this.heights.length;
	}
	hasGap(e, t) {
		if (this.gaps) {
			for (let n of this.gaps) if (n.from < t && n.to > e) return !0;
		}
		return !1;
	}
}, Bp = class e {
	constructor(e, t, n, r, i) {
		this.from = e, this.length = t, this.top = n, this.height = r, this._content = i;
	}
	get type() {
		return typeof this._content == "number" ? Gl.Text : Array.isArray(this._content) ? this._content : this._content.type;
	}
	get to() {
		return this.from + this.length;
	}
	get bottom() {
		return this.top + this.height;
	}
	get widget() {
		return this._content instanceof Yl ? this._content.widget : null;
	}
	get widgetLineBreaks() {
		return typeof this._content == "number" ? this._content : 0;
	}
	join(t) {
		let n = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(t._content) ? t._content : [t]);
		return new e(this.from, this.length + t.length, this.top, this.height + t.height, n);
	}
}, U = /*@__PURE__*/ (function(e) {
	return e[e.ByPos = 0] = "ByPos", e[e.ByHeight = 1] = "ByHeight", e[e.ByPosNoHeight = 2] = "ByPosNoHeight", e;
})(U ||= {}), Vp = .001, Hp = class e {
	constructor(e, t, n = 2) {
		this.length = e, this.height = t, this.flags = n;
	}
	get outdated() {
		return (this.flags & 2) > 0;
	}
	set outdated(e) {
		this.flags = (e ? 2 : 0) | this.flags & -3;
	}
	setHeight(e) {
		this.height != e && (Math.abs(this.height - e) > Vp && (Ip = !0), this.height = e);
	}
	replace(t, n, r) {
		return e.of(r);
	}
	decomposeLeft(e, t) {
		t.push(this);
	}
	decomposeRight(e, t) {
		t.push(this);
	}
	applyChanges(e, t, n, r) {
		let i = this, a = n.doc;
		for (let o = r.length - 1; o >= 0; o--) {
			let { fromA: s, toA: c, fromB: l, toB: u } = r[o], d = i.lineAt(s, U.ByPosNoHeight, n.setDoc(t), 0, 0), f = d.to >= c ? d : i.lineAt(c, U.ByPosNoHeight, n, 0, 0);
			for (u += f.to - c, c = f.to; o > 0 && d.from <= r[o - 1].toA;) s = r[o - 1].fromA, l = r[o - 1].fromB, o--, s < d.from && (d = i.lineAt(s, U.ByPosNoHeight, n, 0, 0));
			l += d.from - s, s = d.from;
			let p = Zp.build(n.setDoc(a), e, l, u);
			i = Up(i, i.replace(s, c, p));
		}
		return i.updateHeight(n, 0);
	}
	static empty() {
		return new Kp(0, 0, 0);
	}
	static of(t) {
		if (t.length == 1) return t[0];
		let n = 0, r = t.length, i = 0, a = 0;
		for (;;) if (n == r) {
			if (i > a * 2) {
				let e = t[n - 1];
				e.break ? t.splice(--n, 1, e.left, null, e.right) : t.splice(--n, 1, e.left, e.right), r += 1 + e.break, i -= e.size;
			} else if (a > i * 2) {
				let e = t[r];
				e.break ? t.splice(r, 1, e.left, null, e.right) : t.splice(r, 1, e.left, e.right), r += 2 + e.break, a -= e.size;
			} else break;
		} else if (i < a) {
			let e = t[n++];
			e && (i += e.size);
		} else {
			let e = t[--r];
			e && (a += e.size);
		}
		let o = !1;
		return t[n - 1] == null ? (o = !0, n--) : t[n] ?? (o = !0, r++), new Jp(e.of(t.slice(0, n)), o, e.of(t.slice(r)));
	}
};
function Up(e, t) {
	return e == t ? e : (e.constructor != t.constructor && (Ip = !0), t);
}
Hp.prototype.size = 1;
var Wp = /*@__PURE__*/ Kl.replace({}), Gp = class extends Hp {
	constructor(e, t, n) {
		super(e, t), this.deco = n, this.spaceAbove = 0;
	}
	mainBlock(e, t) {
		return new Bp(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
	}
	blockAt(e, t, n, r) {
		return this.spaceAbove && e < n + this.spaceAbove ? new Bp(r, 0, n, this.spaceAbove, Wp) : this.mainBlock(n, r);
	}
	lineAt(e, t, n, r, i) {
		let a = this.mainBlock(r, i);
		return this.spaceAbove ? this.blockAt(0, n, r, i).join(a) : a;
	}
	forEachLine(e, t, n, r, i, a) {
		e <= i + this.length && t >= i && a(this.lineAt(0, U.ByPos, n, r, i));
	}
	setMeasuredHeight(e) {
		let t = e.heights[e.index++];
		t < 0 ? (this.spaceAbove = -t, t = e.heights[e.index++]) : this.spaceAbove = 0, this.setHeight(t);
	}
	updateHeight(e, t = 0, n = !1, r) {
		return r && r.from <= t && r.more && this.setMeasuredHeight(r), this.outdated = !1, this;
	}
	toString() {
		return `block(${this.length})`;
	}
}, Kp = class e extends Gp {
	constructor(e, t, n) {
		super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = n;
	}
	mainBlock(e, t) {
		return new Bp(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
	}
	replace(t, n, r) {
		let i = r[0];
		return r.length == 1 && (i instanceof e || i instanceof qp && i.flags & 4) && Math.abs(this.length - i.length) < 10 ? (i instanceof qp ? i = new e(i.length, this.height, this.spaceAbove) : i.height = this.height, this.outdated || (i.outdated = !1), i) : Hp.of(r);
	}
	updateHeight(e, t = 0, n = !1, r) {
		let i = n || this.outdated;
		return r && r.from <= t && r.more && (this.setMeasuredHeight(r), r.hasGap(t, t + this.length) && (i = !0)), i && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight)), this.outdated = !1, this;
	}
	toString() {
		return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
	}
}, qp = class e extends Hp {
	constructor(e) {
		super(e, 0);
	}
	heightMetrics(e, t) {
		let n = e.doc.lineAt(t).number, r = e.doc.lineAt(t + this.length).number, i = r - n + 1, a, o = 0;
		if (e.lineWrapping) {
			let t = Math.min(this.height, e.lineHeight * i);
			a = t / i, this.length > i + 1 && (o = (this.height - t) / (this.length - i - 1));
		} else a = this.height / i;
		return {
			firstLine: n,
			lastLine: r,
			perLine: a,
			perChar: o
		};
	}
	blockAt(e, t, n, r) {
		let { firstLine: i, lastLine: a, perLine: o, perChar: s } = this.heightMetrics(t, r);
		if (t.lineWrapping) {
			let i = r + (e < t.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (e - n) / this.height)) * this.length)), a = t.doc.lineAt(i), c = o + a.length * s, l = Math.max(n, e - c / 2);
			return new Bp(a.from, a.length, l, c, 0);
		}
		{
			let r = Math.max(0, Math.min(a - i, Math.floor((e - n) / o))), { from: s, length: c } = t.doc.line(i + r);
			return new Bp(s, c, n + o * r, o, 0);
		}
	}
	lineAt(e, t, n, r, i) {
		if (t == U.ByHeight) return this.blockAt(e, n, r, i);
		if (t == U.ByPosNoHeight) {
			let { from: t, to: r } = n.doc.lineAt(e);
			return new Bp(t, r - t, 0, 0, 0);
		}
		let { firstLine: a, perLine: o, perChar: s } = this.heightMetrics(n, i), c = n.doc.lineAt(e), l = o + c.length * s, u = c.number - a, d = r + o * u + s * (c.from - i - u);
		return new Bp(c.from, c.length, Math.max(r, Math.min(d, r + this.height - l)), l, 0);
	}
	forEachLine(e, t, n, r, i, a) {
		e = Math.max(e, i), t = Math.min(t, i + this.length);
		let { firstLine: o, perLine: s, perChar: c } = this.heightMetrics(n, i);
		for (let l = e, u = r; l <= t;) {
			let t = n.doc.lineAt(l);
			if (l == e) {
				let n = t.number - o;
				u += s * n + c * (e - i - n);
			}
			let r = s + c * t.length;
			a(new Bp(t.from, t.length, u, r, 0)), u += r, l = t.to + 1;
		}
	}
	replace(t, n, r) {
		let i = this.length - n;
		if (i > 0) {
			let t = r[r.length - 1];
			t instanceof e ? r[r.length - 1] = new e(t.length + i) : r.push(null, new e(i - 1));
		}
		if (t > 0) {
			let n = r[0];
			n instanceof e ? r[0] = new e(t + n.length) : r.unshift(new e(t - 1), null);
		}
		return Hp.of(r);
	}
	decomposeLeft(t, n) {
		n.push(new e(t - 1), null);
	}
	decomposeRight(t, n) {
		n.push(null, new e(this.length - t - 1));
	}
	updateHeight(t, n = 0, r = !1, i) {
		let a = n + this.length;
		if (i && i.from <= n + this.length && i.more) {
			let r = [], o = Math.max(n, i.from), s = -1;
			for (i.from > n && r.push(new e(i.from - n - 1).updateHeight(t, n)); o <= a && i.more;) {
				let e = t.doc.lineAt(o).length;
				r.length && r.push(null);
				let n = i.heights[i.index++], a = 0;
				n < 0 && (a = -n, n = i.heights[i.index++]), s == -1 ? s = n : Math.abs(n - s) >= Vp && (s = -2);
				let c = new Kp(e, n, a);
				c.outdated = !1, r.push(c), o += e + 1;
			}
			o <= a && r.push(null, new e(a - o).updateHeight(t, o));
			let c = Hp.of(r);
			return (s < 0 || Math.abs(c.height - this.height) >= Vp || Math.abs(s - this.heightMetrics(t, n).perLine) >= Vp) && (Ip = !0), Up(this, c);
		}
		return (r || this.outdated) && (this.setHeight(t.heightForGap(n, n + this.length)), this.outdated = !1), this;
	}
	toString() {
		return `gap(${this.length})`;
	}
}, Jp = class extends Hp {
	constructor(e, t, n) {
		super(e.length + +!!t + n.length, e.height + n.height, +!!t | (e.outdated || n.outdated ? 2 : 0)), this.left = e, this.right = n, this.size = e.size + n.size;
	}
	get break() {
		return this.flags & 1;
	}
	blockAt(e, t, n, r) {
		let i = n + this.left.height;
		return e < i ? this.left.blockAt(e, t, n, r) : this.right.blockAt(e, t, i, r + this.left.length + this.break);
	}
	lineAt(e, t, n, r, i) {
		let a = r + this.left.height, o = i + this.left.length + this.break, s = t == U.ByHeight ? e < a : e < o, c = s ? this.left.lineAt(e, t, n, r, i) : this.right.lineAt(e, t, n, a, o);
		if (this.break || (s ? c.to < o : c.from > o)) return c;
		let l = t == U.ByPosNoHeight ? U.ByPosNoHeight : U.ByPos;
		return s ? c.join(this.right.lineAt(o, l, n, a, o)) : this.left.lineAt(o, l, n, r, i).join(c);
	}
	forEachLine(e, t, n, r, i, a) {
		let o = r + this.left.height, s = i + this.left.length + this.break;
		if (this.break) e < s && this.left.forEachLine(e, t, n, r, i, a), t >= s && this.right.forEachLine(e, t, n, o, s, a);
		else {
			let c = this.lineAt(s, U.ByPos, n, r, i);
			e < c.from && this.left.forEachLine(e, Math.min(t, c.from - 1), n, r, i, a), c.to >= e && c.from <= t && a(c), t > c.to && this.right.forEachLine(Math.max(e, c.to + 1), t, n, o, s, a);
		}
	}
	replace(e, t, n) {
		let r = this.left.length + this.break;
		if (t < r) return this.balanced(this.left.replace(e, t, n), this.right);
		if (e > this.left.length) return this.balanced(this.left, this.right.replace(e - r, t - r, n));
		let i = [];
		e > 0 && this.decomposeLeft(e, i);
		let a = i.length;
		for (let e of n) i.push(e);
		if (e > 0 && Yp(i, a - 1), t < this.length) {
			let e = i.length;
			this.decomposeRight(t, i), Yp(i, e);
		}
		return Hp.of(i);
	}
	decomposeLeft(e, t) {
		let n = this.left.length;
		if (e <= n) return this.left.decomposeLeft(e, t);
		t.push(this.left), this.break && (n++, e >= n && t.push(null)), e > n && this.right.decomposeLeft(e - n, t);
	}
	decomposeRight(e, t) {
		let n = this.left.length, r = n + this.break;
		if (e >= r) return this.right.decomposeRight(e - r, t);
		e < n && this.left.decomposeRight(e, t), this.break && e < r && t.push(null), t.push(this.right);
	}
	balanced(e, t) {
		return e.size > 2 * t.size || t.size > 2 * e.size ? Hp.of(this.break ? [
			e,
			null,
			t
		] : [e, t]) : (this.left = Up(this.left, e), this.right = Up(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
	}
	updateHeight(e, t = 0, n = !1, r) {
		let { left: i, right: a } = this, o = t + i.length + this.break, s = null;
		return r && r.from <= t + i.length && r.more ? s = i = i.updateHeight(e, t, n, r) : i.updateHeight(e, t, n), r && r.from <= o + a.length && r.more ? s = a = a.updateHeight(e, o, n, r) : a.updateHeight(e, o, n), s ? this.balanced(i, a) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
	}
	toString() {
		return this.left + (this.break ? " " : "-") + this.right;
	}
};
function Yp(e, t) {
	let n, r;
	e[t] == null && (n = e[t - 1]) instanceof qp && (r = e[t + 1]) instanceof qp && e.splice(t - 1, 3, new qp(n.length + 1 + r.length));
}
var Xp = 5, Zp = class e {
	constructor(e, t) {
		this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
	}
	get isCovered() {
		return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
	}
	span(e, t) {
		if (this.lineStart > -1) {
			let e = Math.min(t, this.lineEnd), n = this.nodes[this.nodes.length - 1];
			n instanceof Kp ? n.length += e - this.pos : (e > this.pos || !this.isCovered) && this.nodes.push(new Kp(e - this.pos, -1, 0)), this.writtenTo = e, t > e && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
		}
		this.pos = t;
	}
	point(e, t, n) {
		if (e < t || n.heightRelevant) {
			let r = n.widget ? n.widget.estimatedHeight : 0, i = n.widget ? n.widget.lineBreaks : 0;
			r < 0 && (r = this.oracle.lineHeight);
			let a = t - e;
			n.block ? this.addBlock(new Gp(a, r, n)) : (a || i || r >= Xp) && this.addLineDeco(r, i, a);
		} else t > e && this.span(e, t);
		this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
	}
	enterLine() {
		if (this.lineStart > -1) return;
		let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
		this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new Kp(this.pos - e, -1, 0)), this.writtenTo = this.pos;
	}
	blankContent(e, t) {
		let n = new qp(t - e);
		return this.oracle.doc.lineAt(e).to == t && (n.flags |= 4), n;
	}
	ensureLine() {
		this.enterLine();
		let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
		if (e instanceof Kp) return e;
		let t = new Kp(0, -1, 0);
		return this.nodes.push(t), t;
	}
	addBlock(e) {
		this.enterLine();
		let t = e.deco;
		t && t.startSide > 0 && !this.isCovered && this.ensureLine(), this.nodes.push(e), this.writtenTo = this.pos += e.length, t && t.endSide > 0 && (this.covering = e);
	}
	addLineDeco(e, t, n) {
		let r = this.ensureLine();
		r.length += n, r.collapsed += n, r.widgetHeight = Math.max(r.widgetHeight, e), r.breaks += t, this.writtenTo = this.pos += n;
	}
	finish(e) {
		let t = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
		this.lineStart > -1 && !(t instanceof Kp) && !this.isCovered ? this.nodes.push(new Kp(0, -1, 0)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
		let n = e;
		for (let e of this.nodes) e instanceof Kp && e.updateHeight(this.oracle, n), n += e ? e.length : 1;
		return this.nodes;
	}
	static build(t, n, r, i) {
		let a = new e(r, t);
		return Xc.spans(n, r, i, a, 0), a.finish(r);
	}
};
function Qp(e, t, n) {
	let r = new $p();
	return Xc.compare(e, t, n, r, 0), r.changes;
}
var $p = class {
	constructor() {
		this.changes = [];
	}
	compareRange() {}
	comparePoint(e, t, n, r) {
		(e < t || n && n.heightRelevant || r && r.heightRelevant) && Ql(e, t, this.changes, 5);
	}
};
function em(e, t) {
	let n = e.getBoundingClientRect(), r = e.ownerDocument, i = r.defaultView || window, a = Math.max(0, n.left), o = Math.min(i.innerWidth, n.right), s = Math.max(0, n.top), c = Math.min(i.innerHeight, n.bottom);
	for (let t = e.parentNode; t && t != r.body;) if (eu(t)) {
		let n = window.getComputedStyle(t);
		if ((t.scrollHeight > t.clientHeight || t.scrollWidth > t.clientWidth) && n.overflow != "visible") {
			let n = t.getBoundingClientRect();
			a = Math.max(a, n.left), o = Math.min(o, n.right), s = Math.max(s, n.top), c = Math.min(t == e.parentNode ? i.innerHeight : c, n.bottom);
		}
		t = n.position == "absolute" || n.position == "fixed" ? t.offsetParent : t.parentNode;
	} else if (t.nodeType == 11) t = t.host;
	else break;
	return {
		left: a - n.left,
		right: Math.max(a, o) - n.left,
		top: s - (n.top + t),
		bottom: Math.max(s, c) - (n.top + t)
	};
}
function tm(e) {
	let t = e.getBoundingClientRect(), n = e.ownerDocument.defaultView || window;
	return t.left < n.innerWidth && t.right > 0 && t.top < n.innerHeight && t.bottom > 0;
}
function nm(e, t) {
	let n = e.getBoundingClientRect();
	return {
		left: 0,
		right: n.right - n.left,
		top: t,
		bottom: n.bottom - (n.top + t)
	};
}
var rm = class {
	constructor(e, t, n, r) {
		this.from = e, this.to = t, this.size = n, this.displaySize = r;
	}
	static same(e, t) {
		if (e.length != t.length) return !1;
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = t[n];
			if (r.from != i.from || r.to != i.to || r.size != i.size) return !1;
		}
		return !0;
	}
	draw(e, t) {
		return Kl.replace({ widget: new im(this.displaySize * (t ? e.scaleY : e.scaleX), t) }).range(this.from, this.to);
	}
}, im = class extends Wl {
	constructor(e, t) {
		super(), this.size = e, this.vertical = t;
	}
	eq(e) {
		return e.size == this.size && e.vertical == this.vertical;
	}
	toDOM() {
		let e = document.createElement("div");
		return this.vertical ? e.style.height = this.size + "px" : (e.style.width = this.size + "px", e.style.height = "2px", e.style.display = "inline-block"), e;
	}
	get estimatedHeight() {
		return this.vertical ? this.size : -1;
	}
}, am = class {
	constructor(e, t) {
		this.view = e, this.state = t, this.pixelViewport = {
			left: 0,
			right: window.innerWidth,
			top: 0,
			bottom: 0
		}, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scaleX = 1, this.scaleY = 1, this.scrollOffset = 0, this.scrolledToBottom = !1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = dm, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = ju.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
		let n = t.facet(xd).some((e) => typeof e != "function" && e.class == "cm-lineWrapping");
		this.heightOracle = new Rp(n), this.stateDeco = fm(t), this.heightMap = Hp.empty().applyChanges(this.stateDeco, R.empty, this.heightOracle.setDoc(t.doc), [new Nd(0, 0, 0, t.doc.length)]);
		for (let e = 0; e < 2 && (this.viewport = this.getViewport(0, null), this.updateForViewport()); e++);
		this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = Kl.set(this.lineGaps.map((e) => e.draw(this, n))), this.scrollParent = e.scrollDOM, this.computeVisibleRanges();
	}
	updateForViewport() {
		let e = [this.viewport], { main: t } = this.state.selection;
		for (let n = 0; n <= 1; n++) {
			let r = n ? t.head : t.anchor;
			if (!e.some(({ from: e, to: t }) => r >= e && r <= t)) {
				let { from: t, to: n } = this.lineBlockAt(r);
				e.push(new om(t, n));
			}
		}
		return this.viewports = e.sort((e, t) => e.from - t.from), this.updateScaler();
	}
	updateScaler() {
		let e = this.scaler;
		return this.scaler = this.heightMap.height <= 7e6 ? dm : pm.get(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
	}
	updateViewportLines() {
		this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
			this.viewportLines.push(mm(e, this.scaler));
		});
	}
	update(e, t = null) {
		this.state = e.state;
		let n = this.stateDeco;
		this.stateDeco = fm(this.state);
		let r = e.changedRanges, i = Nd.extendWithRanges(r, Qp(n, this.stateDeco, e ? e.changes : Gs.empty(this.state.doc.length))), a = this.heightMap.height, o = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollOffset);
		Lp(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), i), (this.heightMap.height != a || Ip) && (e.flags |= 2), o ? (this.scrollAnchorPos = e.changes.mapPos(o.from, -1), this.scrollAnchorHeight = o.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = a);
		let s = i.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
		(t && (t.range.head < s.from || t.range.head > s.to) || !this.viewportIsAppropriate(s)) && (s = this.getViewport(0, t));
		let c = s.from != this.viewport.from || s.to != this.viewport.to;
		this.viewport = s, e.flags |= this.updateForViewport(), (c || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && (e.selectionSet || e.focusChanged) && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(ld) && (this.mustEnforceCursorAssoc = !0);
	}
	measure() {
		let { view: e } = this, t = e.contentDOM, n = window.getComputedStyle(t), r = this.heightOracle, i = n.whiteSpace;
		this.defaultTextDirection = n.direction == "rtl" ? ju.RTL : ju.LTR;
		let a = this.heightOracle.mustRefreshForWrapping(i) || this.mustMeasureContent === "refresh", o = t.getBoundingClientRect(), s = a || this.mustMeasureContent || this.contentDOMHeight != o.height;
		this.contentDOMHeight = o.height, this.mustMeasureContent = !1;
		let c = 0, l = 0;
		if (o.width && o.height) {
			let { scaleX: e, scaleY: n } = mu(t, o);
			(e > .005 && Math.abs(this.scaleX - e) > .005 || n > .005 && Math.abs(this.scaleY - n) > .005) && (this.scaleX = e, this.scaleY = n, c |= 16, a = s = !0);
		}
		let u = (parseInt(n.paddingTop) || 0) * this.scaleY, d = (parseInt(n.paddingBottom) || 0) * this.scaleY;
		(this.paddingTop != u || this.paddingBottom != d) && (this.paddingTop = u, this.paddingBottom = d, c |= 18), this.editorWidth != e.scrollDOM.clientWidth && (r.lineWrapping && (s = !0), this.editorWidth = e.scrollDOM.clientWidth, c |= 16);
		let f = gu(this.view.contentDOM, !1).y;
		f != this.scrollParent && (this.scrollParent = f, this.scrollAnchorHeight = -1, this.scrollOffset = 0);
		let p = this.getScrollOffset();
		this.scrollOffset != p && (this.scrollAnchorHeight = -1, this.scrollOffset = p), this.scrolledToBottom = Du(this.scrollParent || e.win);
		let m = (this.printing ? nm : em)(t, this.paddingTop), h = m.top - this.pixelViewport.top, g = m.bottom - this.pixelViewport.bottom;
		this.pixelViewport = m;
		let _ = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
		if (_ != this.inView && (this.inView = _, _ && (s = !0)), !this.inView && !this.scrollTarget && !tm(e.dom)) return 0;
		let v = o.width, y = this.contentDOMWidth;
		if ((y != v || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = o.width, this.editorHeight = e.scrollDOM.clientHeight, c |= 16), s) {
			let t = e.docView.measureVisibleLineHeights(this.viewport);
			if (r.mustRefreshForHeights(t) && (a = !0), a || r.lineWrapping && Math.abs(v - y) > r.charWidth) {
				let { lineHeight: n, charWidth: o, textHeight: s } = e.docView.measureTextSize();
				a = n > 0 && r.refresh(i, n, o, s, Math.max(5, v / o), t), a && (e.docView.minWidth = 0, c |= 16);
			}
			h > 0 && g > 0 ? l = Math.max(h, g) : h < 0 && g < 0 && (l = Math.min(h, g)), Lp();
			for (let n of this.viewports) {
				let i = n.from == this.viewport.from ? t : e.docView.measureVisibleLineHeights(n), o = this.lineGaps.length && this.heightOracle.lineWrapping ? this.lineGaps : null;
				this.heightMap = (a ? Hp.empty().applyChanges(this.stateDeco, R.empty, this.heightOracle, [new Nd(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(r, 0, a, new zp(n.from, i, o));
			}
			Ip && (c |= 2);
		}
		let b = !this.viewportIsAppropriate(this.viewport, l) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
		return b && (c & 2 && (c |= this.updateScaler()), this.viewport = this.getViewport(l, this.scrollTarget), c |= this.updateForViewport()), (c & 2 || b) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(a ? [] : this.lineGaps, e)), c |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), c;
	}
	setMustMeasure() {
		this.mustMeasureContent ||= !0;
	}
	get visibleTop() {
		return this.scaler.fromDOM(this.pixelViewport.top);
	}
	get visibleBottom() {
		return this.scaler.fromDOM(this.pixelViewport.bottom);
	}
	getViewport(e, t) {
		let n = .5 - Math.max(-.5, Math.min(.5, e / 1e3 / 2)), r = this.heightMap, i = this.heightOracle, { visibleTop: a, visibleBottom: o } = this, s = new om(r.lineAt(a - n * 1e3, U.ByHeight, i, 0, 0).from, r.lineAt(o + (1 - n) * 1e3, U.ByHeight, i, 0, 0).to);
		if (t) {
			let { head: e } = t.range;
			if (e < s.from || e > s.to) {
				let n = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), a = r.lineAt(e, U.ByPos, i, 0, 0), o;
				o = t.y == "center" ? (a.top + a.bottom) / 2 - n / 2 : t.y == "start" || t.y == "nearest" && e < s.from ? a.top : a.bottom - n, s = new om(r.lineAt(o - 500, U.ByHeight, i, 0, 0).from, r.lineAt(o + n + 500, U.ByHeight, i, 0, 0).to);
			}
		}
		return s;
	}
	mapViewport(e, t) {
		let n = t.mapPos(e.from, -1), r = t.mapPos(e.to, 1);
		return new om(this.heightMap.lineAt(n, U.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(r, U.ByPos, this.heightOracle, 0, 0).to);
	}
	viewportIsAppropriate({ from: e, to: t }, n = 0) {
		if (!this.inView) return !0;
		let { top: r } = this.heightMap.lineAt(e, U.ByPos, this.heightOracle, 0, 0), { bottom: i } = this.heightMap.lineAt(t, U.ByPos, this.heightOracle, 0, 0), { visibleTop: a, visibleBottom: o } = this;
		return (e == 0 || r <= a - Math.max(10, Math.min(-n, 250))) && (t == this.state.doc.length || i >= o + Math.max(10, Math.min(n, 250))) && r > a - 2e3 && i < o + 2e3;
	}
	mapLineGaps(e, t) {
		if (!e.length || t.empty) return e;
		let n = [];
		for (let r of e) t.touchesRange(r.from, r.to) || n.push(new rm(t.mapPos(r.from), t.mapPos(r.to), r.size, r.displaySize));
		return n;
	}
	ensureLineGaps(e, t) {
		let n = this.heightOracle.lineWrapping, r = n ? 1e4 : 2e3, i = r >> 1, a = r << 1;
		if (this.defaultTextDirection != ju.LTR && !n) return [];
		let o = [], s = (r, a, c, l) => {
			if (a - r < i) return;
			let u = this.state.selection.main, d = [u.from];
			u.empty || d.push(u.to);
			for (let e of d) if (e > r && e < a) {
				s(r, e - 10, c, l), s(e + 10, a, c, l);
				return;
			}
			let f = um(e, (e) => e.from >= c.from && e.to <= c.to && Math.abs(e.from - r) < i && Math.abs(e.to - a) < i && !d.some((t) => e.from < t && e.to > t));
			if (!f) {
				if (a < c.to && t && n && t.visibleRanges.some((e) => e.from <= a && e.to >= a)) {
					let e = t.moveToLineBoundary(z.cursor(a), !1, !0).head;
					e > r && (a = e);
				}
				let e = this.gapSize(c, r, a, l);
				f = new rm(r, a, e, n || e < 2e6 ? e : 2e6);
			}
			o.push(f);
		}, c = (t) => {
			if (t.length < a || t.type != Gl.Text) return;
			let i = sm(t.from, t.to, this.stateDeco);
			if (i.total < a) return;
			let o = this.scrollTarget ? this.scrollTarget.range.head : null, c, l;
			if (n) {
				let e = r / this.heightOracle.lineLength * this.heightOracle.lineHeight, n, a;
				if (o != null) {
					let r = lm(i, o), s = ((this.visibleBottom - this.visibleTop) / 2 + e) / t.height;
					n = r - s, a = r + s;
				} else n = (this.visibleTop - t.top - e) / t.height, a = (this.visibleBottom - t.top + e) / t.height;
				c = cm(i, n), l = cm(i, a);
			} else {
				let n = i.total * this.heightOracle.charWidth, a = r * this.heightOracle.charWidth, s = 0;
				if (n > 2e6) for (let n of e) n.from >= t.from && n.from < t.to && n.size != n.displaySize && n.from * this.heightOracle.charWidth + s < this.pixelViewport.left && (s = n.size - n.displaySize);
				let u = this.pixelViewport.left + s, d = this.pixelViewport.right + s, f, p;
				if (o != null) {
					let e = lm(i, o), t = ((d - u) / 2 + a) / n;
					f = e - t, p = e + t;
				} else f = (u - a) / n, p = (d + a) / n;
				c = cm(i, f), l = cm(i, p);
			}
			c > t.from && s(t.from, c, t, i), l < t.to && s(l, t.to, t, i);
		};
		for (let e of this.viewportLines) Array.isArray(e.type) ? e.type.forEach(c) : c(e);
		return o;
	}
	gapSize(e, t, n, r) {
		let i = lm(r, n) - lm(r, t);
		return this.heightOracle.lineWrapping ? e.height * i : r.total * this.heightOracle.charWidth * i;
	}
	updateLineGaps(e) {
		rm.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = Kl.set(e.map((e) => e.draw(this, this.heightOracle.lineWrapping))));
	}
	computeVisibleRanges(e) {
		let t = this.stateDeco;
		this.lineGaps.length && (t = t.concat(this.lineGapDeco));
		let n = [];
		Xc.spans(t, this.viewport.from, this.viewport.to, {
			span(e, t) {
				n.push({
					from: e,
					to: t
				});
			},
			point() {}
		}, 20);
		let r = 0;
		if (n.length != this.visibleRanges.length) r = 12;
		else for (let t = 0; t < n.length && !(r & 8); t++) {
			let i = this.visibleRanges[t], a = n[t];
			(i.from != a.from || i.to != a.to) && (r |= 4, e && e.mapPos(i.from, -1) == a.from && e.mapPos(i.to, 1) == a.to || (r |= 8));
		}
		return this.visibleRanges = n, r;
	}
	lineBlockAt(e) {
		return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || mm(this.heightMap.lineAt(e, U.ByPos, this.heightOracle, 0, 0), this.scaler);
	}
	lineBlockAtHeight(e) {
		return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || mm(this.heightMap.lineAt(this.scaler.fromDOM(e), U.ByHeight, this.heightOracle, 0, 0), this.scaler);
	}
	getScrollOffset() {
		return this.scrollParent == this.view.scrollDOM ? this.scrollParent.scrollTop * this.scaleY : (this.scrollParent ? this.scrollParent.getBoundingClientRect().top : 0) - this.view.contentDOM.getBoundingClientRect().top;
	}
	scrollAnchorAt(e) {
		let t = this.lineBlockAtHeight(e + 12 - this.paddingTop);
		return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
	}
	elementAtHeight(e) {
		return mm(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
	}
	get docHeight() {
		return this.scaler.toDOM(this.heightMap.height);
	}
	get contentHeight() {
		return this.docHeight + this.paddingTop + this.paddingBottom;
	}
}, om = class {
	constructor(e, t) {
		this.from = e, this.to = t;
	}
};
function sm(e, t, n) {
	let r = [], i = e, a = 0;
	return Xc.spans(n, e, t, {
		span() {},
		point(e, t) {
			e > i && (r.push({
				from: i,
				to: e
			}), a += e - i), i = t;
		}
	}, 20), i < t && (r.push({
		from: i,
		to: t
	}), a += t - i), {
		total: a,
		ranges: r
	};
}
function cm({ total: e, ranges: t }, n) {
	if (n <= 0) return t[0].from;
	if (n >= 1) return t[t.length - 1].to;
	let r = Math.floor(e * n);
	for (let e = 0;; e++) {
		let { from: n, to: i } = t[e], a = i - n;
		if (r <= a) return n + r;
		r -= a;
	}
}
function lm(e, t) {
	let n = 0;
	for (let { from: r, to: i } of e.ranges) {
		if (t <= i) {
			n += t - r;
			break;
		}
		n += i - r;
	}
	return n / e.total;
}
function um(e, t) {
	for (let n of e) if (t(n)) return n;
}
var dm = {
	toDOM(e) {
		return e;
	},
	fromDOM(e) {
		return e;
	},
	scale: 1,
	eq(e) {
		return e == this;
	}
};
function fm(e) {
	let t = e.facet(Sd).filter((e) => typeof e != "function"), n = e.facet(wd).filter((e) => typeof e != "function");
	return n.length && t.push(Xc.join(n)), t;
}
var pm = class e {
	constructor(e, t) {
		this.scale = e, this.viewports = t;
	}
	static get(t, n, r) {
		let i = 0, a = 0, o = 0, s = r.map(({ from: e, to: r }) => {
			let a = n.lineAt(e, U.ByPos, t, 0, 0).top, o = n.lineAt(r, U.ByPos, t, 0, 0).bottom;
			return i += o - a, {
				from: e,
				to: r,
				top: a,
				bottom: o,
				domTop: 0,
				domBottom: 0
			};
		});
		if (n.height - i < 10) return dm;
		let c = (7e6 - i) / (n.height - i);
		for (let e of s) e.domTop = o + (e.top - a) * c, o = e.domBottom = e.domTop + (e.bottom - e.top), a = e.bottom;
		return new e(c, s);
	}
	toDOM(e) {
		for (let t = 0, n = 0, r = 0;; t++) {
			let i = t < this.viewports.length ? this.viewports[t] : null;
			if (!i || e < i.top) return r + (e - n) * this.scale;
			if (e <= i.bottom) return i.domTop + (e - i.top);
			n = i.bottom, r = i.domBottom;
		}
	}
	fromDOM(e) {
		for (let t = 0, n = 0, r = 0;; t++) {
			let i = t < this.viewports.length ? this.viewports[t] : null;
			if (!i || e < i.domTop) return n + (e - r) / this.scale;
			if (e <= i.domBottom) return i.top + (e - i.domTop);
			n = i.bottom, r = i.domBottom;
		}
	}
	eq(t) {
		return t instanceof e && this.scale == t.scale && this.viewports.length == t.viewports.length && this.viewports.every((e, n) => e.from == t.viewports[n].from && e.to == t.viewports[n].to);
	}
};
function mm(e, t) {
	if (t.scale == 1) return e;
	let n = t.toDOM(e.top), r = t.toDOM(e.bottom);
	return new Bp(e.from, e.length, n, r - n, Array.isArray(e._content) ? e._content.map((e) => mm(e, t)) : e._content);
}
var hm = /*@__PURE__*/ B.define({ combine: (e) => e.join(" ") }), gm = /*@__PURE__*/ B.define({ combine: (e) => e.indexOf(!0) > -1 }), _m = /*@__PURE__*/ gl.newName(), vm = /*@__PURE__*/ gl.newName(), ym = /*@__PURE__*/ gl.newName(), bm = {
	"&light": "." + vm,
	"&dark": "." + ym
};
function xm(e, t, n) {
	return new gl(t, { finish(t) {
		return /&/.test(t) ? t.replace(/&\w*/, (t) => {
			if (t == "&") return e;
			if (!n || !n[t]) throw RangeError(`Unsupported selector: ${t}`);
			return n[t];
		}) : e + " " + t;
	} });
}
var Sm = /*@__PURE__*/ xm("." + _m, {
	"&": {
		position: "relative !important",
		boxSizing: "border-box",
		"&.cm-focused": { outline: "1px dotted #212121" },
		display: "flex !important",
		flexDirection: "column"
	},
	".cm-scroller": {
		display: "flex !important",
		alignItems: "flex-start !important",
		fontFamily: "monospace",
		lineHeight: 1.4,
		height: "100%",
		overflowX: "auto",
		position: "relative",
		zIndex: 0,
		overflowAnchor: "none"
	},
	".cm-content": {
		margin: 0,
		flexGrow: 2,
		flexShrink: 0,
		display: "block",
		whiteSpace: "pre",
		wordWrap: "normal",
		boxSizing: "border-box",
		minHeight: "100%",
		padding: "4px 0",
		outline: "none",
		"&[contenteditable=true]": { WebkitUserModify: "read-write-plaintext-only" }
	},
	".cm-lineWrapping": {
		whiteSpace_fallback: "pre-wrap",
		whiteSpace: "break-spaces",
		wordBreak: "break-word",
		overflowWrap: "anywhere",
		flexShrink: 1
	},
	"&light .cm-content": { caretColor: "black" },
	"&dark .cm-content": { caretColor: "white" },
	".cm-line": {
		display: "block",
		padding: "0 2px 0 6px"
	},
	".cm-layer": {
		userSelect: "none",
		position: "absolute",
		left: 0,
		top: 0,
		contain: "size style",
		"& > *": { position: "absolute" }
	},
	"&light .cm-selectionBackground": { background: "#d9d9d9" },
	"&dark .cm-selectionBackground": { background: "#222" },
	"&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": { background: "#d7d4f0" },
	"&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": { background: "#233" },
	".cm-cursorLayer": { pointerEvents: "none" },
	"&.cm-focused > .cm-scroller > .cm-cursorLayer": { animation: "steps(1) cm-blink 1.2s infinite" },
	"@keyframes cm-blink": {
		"0%": {},
		"50%": { opacity: 0 },
		"100%": {}
	},
	"@keyframes cm-blink2": {
		"0%": {},
		"50%": { opacity: 0 },
		"100%": {}
	},
	".cm-cursor, .cm-dropCursor": {
		borderLeft: "1.2px solid black",
		marginLeft: "-0.6px",
		pointerEvents: "none"
	},
	".cm-cursor": { display: "none" },
	"&dark .cm-cursor": { borderLeftColor: "#ddd" },
	".cm-selectionHandle": {
		backgroundColor: "currentColor",
		width: "1.5px"
	},
	".cm-selectionHandle-start::before, .cm-selectionHandle-end::before": {
		content: "\"\"",
		backgroundColor: "inherit",
		borderRadius: "50%",
		width: "8px",
		height: "8px",
		position: "absolute",
		left: "-3.25px"
	},
	".cm-selectionHandle-start::before": { top: "-8px" },
	".cm-selectionHandle-end::before": { bottom: "-8px" },
	".cm-dropCursor": { position: "absolute" },
	"&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": { display: "block" },
	".cm-iso": { unicodeBidi: "isolate" },
	".cm-announced": {
		position: "fixed",
		top: "-10000px"
	},
	"@media print": { ".cm-announced": { display: "none" } },
	"&light .cm-activeLine": { backgroundColor: "#cceeff44" },
	"&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
	"&light .cm-specialChar": { color: "red" },
	"&dark .cm-specialChar": { color: "#f78" },
	".cm-gutters": {
		flexShrink: 0,
		display: "flex",
		height: "100%",
		boxSizing: "border-box",
		zIndex: 200
	},
	".cm-gutters-before": { insetInlineStart: 0 },
	".cm-gutters-after": { insetInlineEnd: 0 },
	"&light .cm-gutters": {
		backgroundColor: "#f5f5f5",
		color: "#6c6c6c",
		border: "0px solid #ddd",
		"&.cm-gutters-before": { borderRightWidth: "1px" },
		"&.cm-gutters-after": { borderLeftWidth: "1px" }
	},
	"&dark .cm-gutters": {
		backgroundColor: "#333338",
		color: "#ccc"
	},
	".cm-gutter": {
		display: "flex !important",
		flexDirection: "column",
		flexShrink: 0,
		boxSizing: "border-box",
		minHeight: "100%",
		overflow: "hidden"
	},
	".cm-gutterElement": { boxSizing: "border-box" },
	".cm-lineNumbers .cm-gutterElement": {
		padding: "0 3px 0 5px",
		minWidth: "20px",
		textAlign: "right",
		whiteSpace: "nowrap"
	},
	"&light .cm-activeLineGutter": { backgroundColor: "#e2f2ff" },
	"&dark .cm-activeLineGutter": { backgroundColor: "#222227" },
	".cm-panels": {
		boxSizing: "border-box",
		position: "sticky",
		left: 0,
		right: 0,
		zIndex: 300
	},
	"&light .cm-panels": {
		backgroundColor: "#f5f5f5",
		color: "black"
	},
	".cm-panels-top": { top: "0" },
	".cm-panels-bottom": { bottom: "0" },
	"&light .cm-panels-top": { borderBottom: "1px solid #ddd" },
	"&light .cm-panels-bottom": { borderTop: "1px solid #ddd" },
	"&dark .cm-panels": {
		backgroundColor: "#333338",
		color: "white"
	},
	".cm-dialog": {
		padding: "2px 19px 4px 6px",
		position: "relative",
		"& label": { fontSize: "80%" }
	},
	".cm-dialog-close": {
		position: "absolute",
		top: "3px",
		right: "4px",
		backgroundColor: "inherit",
		border: "none",
		font: "inherit",
		fontSize: "14px",
		padding: "0"
	},
	".cm-tab": {
		display: "inline-block",
		overflow: "hidden",
		verticalAlign: "bottom"
	},
	".cm-widgetBuffer": {
		verticalAlign: "baseline",
		height: "1em",
		width: 0,
		display: "inline"
	},
	".cm-placeholder": {
		color: "#888",
		display: "inline-block",
		verticalAlign: "top",
		userSelect: "none"
	},
	".cm-highlightSpace": {
		background: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 0) no-repeat",
		backgroundSize: ".4em",
		backgroundPosition: "calc(min(50%, 0px)) center"
	},
	".cm-highlightTab": {
		backgroundImage: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"20\"><path stroke=\"%23888\" stroke-width=\"1\" fill=\"none\" d=\"M1 10H196L190 5M190 15L196 10M197 4L197 16\"/></svg>')",
		backgroundSize: "auto 100%",
		backgroundPosition: "right 90%",
		backgroundRepeat: "no-repeat"
	},
	".cm-trailingSpace": { backgroundColor: "#ff332255" },
	".cm-button": {
		verticalAlign: "middle",
		color: "inherit",
		fontSize: "70%",
		padding: ".2em 1em",
		borderRadius: "1px"
	},
	"&light .cm-button": {
		backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
		border: "1px solid #888",
		"&:active": { backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)" }
	},
	"&dark .cm-button": {
		backgroundImage: "linear-gradient(#393939, #111)",
		border: "1px solid #888",
		"&:active": { backgroundImage: "linear-gradient(#111, #333)" }
	},
	".cm-textfield": {
		verticalAlign: "middle",
		color: "inherit",
		fontSize: "70%",
		border: "1px solid silver",
		padding: ".2em .5em"
	},
	"&light .cm-textfield": { backgroundColor: "white" },
	"&dark .cm-textfield": {
		border: "1px solid #555",
		backgroundColor: "inherit"
	}
}, bm), Cm = {
	childList: !0,
	characterData: !0,
	subtree: !0,
	attributes: !0,
	characterDataOldValue: !0
}, wm = V.ie && V.ie_version <= 11, Tm = class {
	constructor(e) {
		this.view = e, this.active = !1, this.editContext = null, this.selectionRange = new _u(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
			for (let e of t) this.queue.push(e);
			(V.ie && V.ie_version <= 11 || V.ios && e.composing) && t.some((e) => e.type == "childList" && e.removedNodes.length || e.type == "characterData" && e.oldValue.length > e.target.nodeValue.length) || V.ios && t.some((e) => e.type == "childList" && Array.prototype.some.call(e.addedNodes, cu)) ? this.flushSoon() : this.flush();
		}), window.EditContext && V.android && e.constructor.EDIT_CONTEXT !== !1 && !(V.chrome && V.chrome_version < 126) && (this.editContext = new km(e), e.state.facet(hd) && (e.contentDOM.editContext = this.editContext.editContext)), wm && (this.onCharData = (e) => {
			this.queue.push({
				target: e.target,
				type: "characterData",
				oldValue: e.prevValue
			}), this.flushSoon();
		}), this.onSelectionChange = this.onSelectionChange.bind(this), this.onResize = this.onResize.bind(this), this.onPrint = this.onPrint.bind(this), this.onScroll = this.onScroll.bind(this), window.matchMedia && (this.printQuery = window.matchMedia("print")), typeof ResizeObserver == "function" && (this.resizeScroll = new ResizeObserver(() => {
			this.view.docView?.lastUpdate < Date.now() - 75 && this.onResize();
		}), this.resizeScroll.observe(e.scrollDOM)), this.addWindowListeners(this.win = e.win), this.start(), typeof IntersectionObserver == "function" && (this.intersection = new IntersectionObserver((e) => {
			this.parentCheck < 0 && (this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3)), e.length > 0 && e[e.length - 1].intersectionRatio > 0 != this.intersecting && (this.intersecting = !this.intersecting, this.intersecting != this.view.inView && this.onScrollChanged(document.createEvent("Event")));
		}, { threshold: [0, .001] }), this.intersection.observe(this.dom), this.gapIntersection = new IntersectionObserver((e) => {
			e.length > 0 && e[e.length - 1].intersectionRatio > 0 && this.onScrollChanged(document.createEvent("Event"));
		}, {})), this.listenForScroll(), this.readSelectionRange();
	}
	onScrollChanged(e) {
		this.view.inputState.runHandlers("scroll", e), this.intersecting && this.view.measure();
	}
	onScroll(e) {
		this.intersecting && this.flush(this.pendingRecords().length > 0), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(e);
	}
	onResize() {
		this.resizeTimeout < 0 && (this.resizeTimeout = setTimeout(() => {
			this.resizeTimeout = -1, this.view.requestMeasure();
		}, 50));
	}
	onPrint(e) {
		(e.type != "change" && e.type || e.matches) && (this.view.viewState.printing = !0, this.view.measure(), setTimeout(() => {
			this.view.viewState.printing = !1, this.view.requestMeasure();
		}, 500));
	}
	updateGaps(e) {
		if (this.gapIntersection && (e.length != this.gaps.length || this.gaps.some((t, n) => t != e[n]))) {
			this.gapIntersection.disconnect();
			for (let t of e) this.gapIntersection.observe(t);
			this.gaps = e;
		}
	}
	onSelectionChange(e) {
		let t = this.selectionChanged;
		if (this.view.inputState.selectionchange(), !this.readSelectionRange() || this.delayedAndroidKey) return;
		let { view: n } = this, r = this.selectionRange;
		if (n.state.facet(hd) ? n.root.activeElement != this.dom : !iu(this.dom, r)) return;
		let i = r.anchorNode && n.docView.tile.nearest(r.anchorNode);
		i && i.isWidget() && i.widget.ignoreEvent(e) ? t || (this.selectionChanged = !1) : (V.ie && V.ie_version <= 11 || V.android && V.chrome) && !n.state.selection.main.empty && r.focusNode && ou(r.focusNode, r.focusOffset, r.anchorNode, r.anchorOffset) ? this.flushSoon() : this.flush(!1);
	}
	readSelectionRange() {
		let { view: e } = this, t = e.dom.isConnected ? nu(e.root) : null;
		if (!t) return !1;
		let n = V.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && Om(this.view, t) || t;
		if (!n || this.selectionRange.eq(n)) return !1;
		let r = iu(this.dom, n);
		return r && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && Eu(this.dom, n) && this.view.updateState == 0 ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(n), r && (this.selectionChanged = !0), !0);
	}
	setSelectionRange(e, t) {
		this.selectionRange.set(e.node, e.offset, t.node, t.offset), this.selectionChanged = !1;
	}
	clearSelectionRange() {
		this.selectionRange.set(null, 0, null, 0);
	}
	listenForScroll() {
		this.parentCheck = -1;
		let e = 0, t = null;
		for (let n = this.dom; n;) if (eu(n)) !t && e < this.scrollTargets.length && this.scrollTargets[e] == n ? e++ : t ||= this.scrollTargets.slice(0, e), t && t.push(n), n = n.assignedSlot || n.parentNode;
		else if (n.nodeType == 11) n = n.host;
		else break;
		if (e < this.scrollTargets.length && !t && (t = this.scrollTargets.slice(0, e)), t) {
			for (let e of this.scrollTargets) e.removeEventListener("scroll", this.onScroll);
			for (let e of this.scrollTargets = t) e.addEventListener("scroll", this.onScroll);
		}
	}
	ignore(e) {
		if (!this.active) return e();
		try {
			return this.stop(), e();
		} finally {
			this.start(), this.clear();
		}
	}
	start() {
		this.active ||= (this.observer.observe(this.dom, Cm), wm && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), !0);
	}
	stop() {
		this.active && (this.active = !1, this.observer.disconnect(), wm && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
	}
	clear() {
		this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
	}
	delayAndroidKey(e, t) {
		if (!this.delayedAndroidKey) {
			let e = () => {
				let e = this.delayedAndroidKey;
				e && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = e.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && e.force && wu(this.dom, e.key, e.keyCode));
			};
			this.flushingAndroidKey = this.view.win.requestAnimationFrame(e);
		}
		this.delayedAndroidKey && e != "Enter" || (this.delayedAndroidKey = {
			key: e,
			keyCode: t,
			force: this.lastChange < Date.now() - 50 || !!this.delayedAndroidKey?.force
		});
	}
	clearDelayedAndroidKey() {
		this.win.cancelAnimationFrame(this.flushingAndroidKey), this.delayedAndroidKey = null, this.flushingAndroidKey = -1;
	}
	flushSoon() {
		this.delayedFlush < 0 && (this.delayedFlush = this.view.win.requestAnimationFrame(() => {
			this.delayedFlush = -1, this.flush();
		}));
	}
	clearDelayedFlush() {
		this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1);
	}
	forceFlush() {
		this.clearDelayedFlush(), this.flush();
	}
	pendingRecords() {
		for (let e of this.observer.takeRecords()) this.queue.push(e);
		return this.queue;
	}
	processRecords() {
		let e = this.pendingRecords();
		e.length && (this.queue = [], this.view.viewState.setMustMeasure());
		let t = -1, n = -1, r = !1;
		for (let i of e) {
			let e = this.readMutation(i);
			e && (e.typeOver && (r = !0), t == -1 ? {from: t, to: n} = e : (t = Math.min(e.from, t), n = Math.max(e.to, n)));
		}
		return {
			from: t,
			to: n,
			typeOver: r
		};
	}
	readChange() {
		let { from: e, to: t, typeOver: n } = this.processRecords(), r = this.selectionChanged && iu(this.dom, this.selectionRange);
		if (e < 0 && !r) return null;
		e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
		let i = new Vf(this.view, e, t, n);
		return this.view.docView.domChanged = { newSel: i.newSel ? i.newSel.main : null }, i;
	}
	flush(e = !0) {
		if (this.delayedFlush >= 0 || this.delayedAndroidKey) return !1;
		e && this.readSelectionRange();
		let t = this.selectionChanged, n = this.readChange();
		if (!n) return this.view.requestMeasure(), !1;
		let r = this.view.state, i = Uf(this.view, n);
		return this.view.state == r && (n.domChanged || t) && this.view.update([]), i;
	}
	readMutation(e) {
		let t = this.view.docView.tile.nearest(e.target);
		if (!t || t.isWidget()) return null;
		if (t.markDirty(e.type == "attributes"), e.type == "childList") {
			let n = Em(t, e.previousSibling || e.target.previousSibling, -1), r = Em(t, e.nextSibling || e.target.nextSibling, 1);
			return {
				from: n ? t.posAfter(n) : t.posAtStart,
				to: r ? t.posBefore(r) : t.posAtEnd,
				typeOver: !1
			};
		}
		return e.type == "characterData" ? {
			from: t.posAtStart,
			to: t.posAtEnd,
			typeOver: e.target.nodeValue == e.oldValue
		} : null;
	}
	setWindow(e) {
		e != this.win && (this.removeWindowListeners(this.win), this.win = e, this.addWindowListeners(this.win));
	}
	addWindowListeners(e) {
		e.addEventListener("resize", this.onResize), this.printQuery ? this.printQuery.addEventListener ? this.printQuery.addEventListener("change", this.onPrint) : this.printQuery.addListener(this.onPrint) : e.addEventListener("beforeprint", this.onPrint), e.addEventListener("scroll", this.onScroll), e.document.addEventListener("selectionchange", this.onSelectionChange);
	}
	removeWindowListeners(e) {
		e.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onResize), this.printQuery ? this.printQuery.removeEventListener ? this.printQuery.removeEventListener("change", this.onPrint) : this.printQuery.removeListener(this.onPrint) : e.removeEventListener("beforeprint", this.onPrint), e.document.removeEventListener("selectionchange", this.onSelectionChange);
	}
	update(e) {
		this.editContext && (this.editContext.update(e), e.startState.facet(hd) != e.state.facet(hd) && (e.view.contentDOM.editContext = e.state.facet(hd) ? this.editContext.editContext : null));
	}
	destroy() {
		var e, t, n;
		this.stop(), (e = this.intersection) == null || e.disconnect(), (t = this.gapIntersection) == null || t.disconnect(), (n = this.resizeScroll) == null || n.disconnect();
		for (let e of this.scrollTargets) e.removeEventListener("scroll", this.onScroll);
		this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
	}
};
function Em(e, t, n) {
	for (; t;) {
		let r = Id.get(t);
		if (r && r.parent == e) return r;
		let i = t.parentNode;
		t = i == e.dom ? n > 0 ? t.nextSibling : t.previousSibling : i;
	}
	return null;
}
function Dm(e, t) {
	let n = t.startContainer, r = t.startOffset, i = t.endContainer, a = t.endOffset, o = e.docView.domAtPos(e.state.selection.main.anchor, 1);
	return ou(o.node, o.offset, i, a) && ([n, r, i, a] = [
		i,
		a,
		n,
		r
	]), {
		anchorNode: n,
		anchorOffset: r,
		focusNode: i,
		focusOffset: a
	};
}
function Om(e, t) {
	if (t.getComposedRanges) {
		let n = t.getComposedRanges(e.root)[0];
		if (n) return Dm(e, n);
	}
	let n = null;
	function r(e) {
		e.preventDefault(), e.stopImmediatePropagation(), n = e.getTargetRanges()[0];
	}
	return e.contentDOM.addEventListener("beforeinput", r, !0), e.dom.ownerDocument.execCommand("indent"), e.contentDOM.removeEventListener("beforeinput", r, !0), n ? Dm(e, n) : null;
}
var km = class {
	constructor(e) {
		this.from = 0, this.to = 0, this.pendingContextChange = null, this.handlers = Object.create(null), this.composing = null, this.resetRange(e.state);
		let t = this.editContext = new window.EditContext({
			text: e.state.doc.sliceString(this.from, this.to),
			selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, e.state.selection.main.anchor))),
			selectionEnd: this.toContextPos(e.state.selection.main.head)
		});
		this.handlers.textupdate = (n) => {
			let r = e.state.selection.main, { anchor: i, head: a } = r, o = this.toEditorPos(n.updateRangeStart), s = this.toEditorPos(n.updateRangeEnd);
			e.inputState.composing >= 0 && !this.composing && (this.composing = {
				contextBase: n.updateRangeStart,
				editorBase: o,
				drifted: !1
			});
			let c = s - o > n.text.length;
			o == this.from && i < this.from ? o = i : s == this.to && i > this.to && (s = i);
			let l = Kf(e.state.sliceDoc(o, s), n.text, (c ? r.from : r.to) - o, c ? "end" : null);
			if (!l) {
				let t = z.single(this.toEditorPos(n.selectionStart), this.toEditorPos(n.selectionEnd));
				Yf(t, r) || e.dispatch({
					selection: t,
					userEvent: "select"
				});
				return;
			}
			let u = {
				from: l.from + o,
				to: l.toA + o,
				insert: R.of(n.text.slice(l.from, l.toB).split("\n"))
			};
			if ((V.mac || V.android) && u.from == a - 1 && /^\. ?$/.test(n.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (u = {
				from: o,
				to: s,
				insert: R.of([n.text.replace(".", " ")])
			}), this.pendingContextChange = u, !e.state.readOnly) {
				let t = this.to - this.from + (u.to - u.from + u.insert.length);
				Wf(e, u, z.single(this.toEditorPos(n.selectionStart, t), this.toEditorPos(n.selectionEnd, t)));
			}
			this.pendingContextChange && (this.revertPending(e.state), this.setSelection(e.state)), u.from < u.to && !u.insert.length && e.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(t.text.slice(Math.max(0, n.updateRangeStart - 1), Math.min(t.text.length, n.updateRangeStart + 1))) && this.handlers.compositionend(n);
		}, this.handlers.characterboundsupdate = (n) => {
			let r = [], i = null;
			for (let t = this.toEditorPos(n.rangeStart), a = this.toEditorPos(n.rangeEnd); t < a; t++) {
				let n = e.coordsForChar(t);
				i = n && new DOMRect(n.left, n.top, n.right - n.left, n.bottom - n.top) || i || new DOMRect(), r.push(i);
			}
			t.updateCharacterBounds(n.rangeStart, r);
		}, this.handlers.textformatupdate = (t) => {
			let n = [];
			for (let e of t.getTextFormats()) {
				let t = e.underlineStyle, r = e.underlineThickness;
				if (!/none/i.test(t) && !/none/i.test(r)) {
					let i = this.toEditorPos(e.rangeStart), a = this.toEditorPos(e.rangeEnd);
					if (i < a) {
						let e = `text-decoration: underline ${/^[a-z]/.test(t) ? t + " " : t == "Dashed" ? "dashed " : t == "Squiggle" ? "wavy " : ""}${/thin/i.test(r) ? 1 : 2}px`;
						n.push(Kl.mark({ attributes: { style: e } }).range(i, a));
					}
				}
			}
			e.dispatch({ effects: pd.of(Kl.set(n)) });
		}, this.handlers.compositionstart = () => {
			e.inputState.composing < 0 && (e.inputState.composing = 0, e.inputState.compositionFirstChange = !0);
		}, this.handlers.compositionend = () => {
			if (e.inputState.composing = -1, e.inputState.compositionFirstChange = null, this.composing) {
				let { drifted: t } = this.composing;
				this.composing = null, t && this.reset(e.state);
			}
		};
		for (let e in this.handlers) t.addEventListener(e, this.handlers[e]);
		this.measureReq = { read: (e) => {
			let t = nu(e.root);
			t && t.rangeCount && this.editContext.updateSelectionBounds(t.getRangeAt(0).getBoundingClientRect());
		} };
	}
	applyEdits(e) {
		let t = 0, n = !1, r = this.pendingContextChange;
		return e.changes.iterChanges((i, a, o, s, c) => {
			if (n) return;
			let l = c.length - (a - i);
			if (r && a >= r.to) {
				if (r.from == i && r.to == a && r.insert.eq(c)) {
					r = this.pendingContextChange = null, t += l, this.to += l;
					return;
				}
				r = null, this.revertPending(e.state);
			}
			if (i += t, a += t, a <= this.from) this.from += l, this.to += l;
			else if (i < this.to) {
				if (i < this.from || a > this.to || this.to - this.from + c.length > 3e4) {
					n = !0;
					return;
				}
				this.editContext.updateText(this.toContextPos(i), this.toContextPos(a), c.toString()), this.to += l;
			}
			t += l;
		}), r && !n && this.revertPending(e.state), !n;
	}
	update(e) {
		let t = this.pendingContextChange, n = e.startState.selection.main;
		this.composing && (this.composing.drifted || !e.changes.touchesRange(n.from, n.to) && e.transactions.some((e) => !e.isUserEvent("input.type") && e.changes.touchesRange(this.from, this.to))) ? (this.composing.drifted = !0, this.composing.editorBase = e.changes.mapPos(this.composing.editorBase)) : !this.applyEdits(e) || !this.rangeIsValid(e.state) ? (this.pendingContextChange = null, this.reset(e.state)) : (e.docChanged || e.selectionSet || t) && this.setSelection(e.state), (e.geometryChanged || e.docChanged || e.selectionSet) && e.view.requestMeasure(this.measureReq);
	}
	resetRange(e) {
		let { head: t } = e.selection.main;
		this.from = Math.max(0, t - 1e4), this.to = Math.min(e.doc.length, t + 1e4);
	}
	reset(e) {
		this.resetRange(e), this.editContext.updateText(0, this.editContext.text.length, e.doc.sliceString(this.from, this.to)), this.setSelection(e);
	}
	revertPending(e) {
		let t = this.pendingContextChange;
		this.pendingContextChange = null, this.editContext.updateText(this.toContextPos(t.from), this.toContextPos(t.from + t.insert.length), e.doc.sliceString(t.from, t.to));
	}
	setSelection(e) {
		let { main: t } = e.selection, n = this.toContextPos(Math.max(this.from, Math.min(this.to, t.anchor))), r = this.toContextPos(t.head);
		(this.editContext.selectionStart != n || this.editContext.selectionEnd != r) && this.editContext.updateSelection(n, r);
	}
	rangeIsValid(e) {
		let { head: t } = e.selection.main;
		return !(this.from > 0 && t - this.from < 500 || this.to < e.doc.length && this.to - t < 500 || this.to - this.from > 3e4);
	}
	toEditorPos(e, t = this.to - this.from) {
		e = Math.min(e, t);
		let n = this.composing;
		return n && n.drifted ? n.editorBase + (e - n.contextBase) : e + this.from;
	}
	toContextPos(e) {
		let t = this.composing;
		return t && t.drifted ? t.contextBase + (e - t.editorBase) : e - this.from;
	}
	destroy() {
		for (let e in this.handlers) this.editContext.removeEventListener(e, this.handlers[e]);
	}
}, W = class e {
	get state() {
		return this.viewState.state;
	}
	get viewport() {
		return this.viewState.viewport;
	}
	get visibleRanges() {
		return this.viewState.visibleRanges;
	}
	get inView() {
		return this.viewState.inView;
	}
	get composing() {
		return !!this.inputState && this.inputState.composing > 0;
	}
	get compositionStarted() {
		return !!this.inputState && this.inputState.composing >= 0;
	}
	get root() {
		return this._root;
	}
	get win() {
		return this.dom.ownerDocument.defaultView || window;
	}
	constructor(e = {}) {
		this.plugins = [], this.pluginMap = /* @__PURE__ */ new Map(), this.editorAttrs = {}, this.contentAttrs = {}, this.bidiCache = [], this.destroyed = !1, this.updateState = 2, this.measureScheduled = -1, this.measureRequests = [], this.clearAnnouncement = -1, this.contentDOM = document.createElement("div"), this.scrollDOM = document.createElement("div"), this.scrollDOM.tabIndex = -1, this.scrollDOM.className = "cm-scroller", this.scrollDOM.appendChild(this.contentDOM), this.announceDOM = document.createElement("div"), this.announceDOM.className = "cm-announced", this.announceDOM.setAttribute("aria-live", "polite"), this.dom = document.createElement("div"), this.dom.appendChild(this.announceDOM), this.dom.appendChild(this.scrollDOM), e.parent && e.parent.appendChild(this.dom);
		let { dispatch: t } = e;
		this.dispatchTransactions = e.dispatchTransactions || t && ((e) => e.forEach((e) => t(e, this))) || ((e) => this.update(e)), this.dispatch = this.dispatch.bind(this), this._root = e.root || Tu(e.parent) || document, this.viewState = new am(this, e.state || Uc.create(e)), e.scrollTo && e.scrollTo.is(fd) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(_d).map((e) => new yd(e));
		for (let e of this.plugins) e.update(this);
		this.observer = new Tm(this), this.inputState = new Xf(this), this.inputState.ensureHandlers(this.plugins), this.docView = new uf(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), document.fonts?.ready && document.fonts.ready.then(() => {
			this.viewState.mustMeasureContent = "refresh", this.requestMeasure();
		});
	}
	dispatch(...e) {
		let t = e.length == 1 && e[0] instanceof kc ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [this.state.update(...e)];
		this.dispatchTransactions(t, this);
	}
	update(t) {
		if (this.updateState != 0) throw Error("Calls to EditorView.update are not allowed while an update is in progress");
		let n = !1, r = !1, i, a = this.state;
		for (let e of t) {
			if (e.startState != a) throw RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
			a = e.state;
		}
		if (this.destroyed) {
			this.viewState.state = a;
			return;
		}
		let o = this.hasFocus, s = 0, c = null;
		t.some((e) => e.annotation(kp)) ? (this.inputState.notifiedFocused = o, s = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, c = Ap(a, o), c || (s = 1));
		let l = this.observer.delayedAndroidKey, u = null;
		if (l ? (this.observer.clearDelayedAndroidKey(), u = this.observer.readChange()) : this.observer.delayedFlush > -1 ? (this.observer.clearDelayedFlush(), u = this.observer.readChange()) : this.observer.clear(), (u && !this.state.doc.eq(a.doc) || !this.state.selection.eq(a.selection)) && (u = null), a.facet(Uc.phrases) != this.state.facet(Uc.phrases)) return this.setState(a);
		i = Pd.create(this, a, t), i.flags |= s;
		let d = this.viewState.scrollTarget;
		try {
			this.updateState = 2;
			for (let n of t) {
				if (d &&= d.map(n.changes), n.scrollIntoView) {
					let { main: t } = n.state.selection, { x: r, y: i } = this.state.facet(e.cursorScrollMargin);
					d = new dd(t.empty ? t : z.cursor(t.head, t.head > t.anchor ? -1 : 1), "nearest", "nearest", i, r);
				}
				for (let e of n.effects) e.is(fd) && (d = e.value.clip(this.state));
			}
			this.viewState.update(i, d), this.bidiCache = Mm.update(this.bidiCache, i.changes), i.empty || (this.updatePlugins(i), this.inputState.update(i)), n = this.docView.update(i), this.state.facet(Md) != this.styleModules && this.mountStyles(), r = this.updateAttrs(), this.showAnnouncements(t), this.docView.updateSelection(n, t.some((e) => e.isUserEvent("select.pointer")));
		} finally {
			this.updateState = 0;
		}
		if (i.startState.facet(hm) != i.state.facet(hm) && this.viewState.setMustMeasure(), (n || r || d || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), n && this.docViewUpdate(), !i.empty) for (let e of this.state.facet(rd)) try {
			e(i);
		} catch (e) {
			md(this.state, e, "update listener");
		}
		(c || u) && Promise.resolve().then(() => {
			c && this.state == c.startState && this.dispatch(c), u && !Uf(this, u) && l.force && wu(this.contentDOM, l.key, l.keyCode);
		});
	}
	setState(e) {
		if (this.updateState != 0) throw Error("Calls to EditorView.setState are not allowed while an update is in progress");
		if (this.destroyed) {
			this.viewState.state = e;
			return;
		}
		this.updateState = 2;
		let t = this.hasFocus;
		try {
			for (let e of this.plugins) e.destroy(this);
			this.viewState = new am(this, e), this.plugins = e.facet(_d).map((e) => new yd(e)), this.pluginMap.clear();
			for (let e of this.plugins) e.update(this);
			this.docView.destroy(), this.docView = new uf(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
		} finally {
			this.updateState = 0;
		}
		t && this.focus(), this.requestMeasure();
	}
	updatePlugins(e) {
		let t = e.startState.facet(_d), n = e.state.facet(_d);
		if (t != n) {
			let r = [];
			for (let i of n) {
				let n = t.indexOf(i);
				if (n < 0) r.push(new yd(i));
				else {
					let t = this.plugins[n];
					t.mustUpdate = e, r.push(t);
				}
			}
			for (let t of this.plugins) t.mustUpdate != e && t.destroy(this);
			this.plugins = r, this.pluginMap.clear();
		} else for (let t of this.plugins) t.mustUpdate = e;
		for (let e = 0; e < this.plugins.length; e++) this.plugins[e].update(this);
		t != n && this.inputState.ensureHandlers(this.plugins);
	}
	docViewUpdate() {
		for (let e of this.plugins) {
			let t = e.value;
			if (t && t.docViewUpdate) try {
				t.docViewUpdate(this);
			} catch (e) {
				md(this.state, e, "doc view update listener");
			}
		}
	}
	measure(e = !0) {
		if (this.destroyed) return;
		if (this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.observer.delayedAndroidKey) {
			this.measureScheduled = -1, this.requestMeasure();
			return;
		}
		this.measureScheduled = 0, e && this.observer.forceFlush();
		let t = null, n = this.viewState.scrollParent, r = this.viewState.getScrollOffset(), { scrollAnchorPos: i, scrollAnchorHeight: a, scaleY: o } = this.viewState;
		Math.abs(r - this.viewState.scrollOffset) > 1 && (a = -1), this.viewState.scrollAnchorHeight = -1;
		try {
			for (let e = 0;; e++) {
				if (a < 0) {
					if (Du(n || this.win)) i = -1, a = this.viewState.heightMap.height / this.viewState.scaleY;
					else {
						let e = this.viewState.scrollAnchorAt(r);
						i = e.from, a = e.top;
					}
					o = this.viewState.scaleY;
				}
				this.updateState = 1;
				let s = this.viewState.measure();
				if (!s && !this.measureRequests.length && this.viewState.scrollTarget == null) break;
				if (e > 5) {
					console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
					break;
				}
				let c = [];
				s & 4 || ([this.measureRequests, c] = [c, this.measureRequests]);
				let l = c.map((e) => {
					try {
						return e.read(this);
					} catch (e) {
						return md(this.state, e), jm;
					}
				}), u = Pd.create(this, this.state, []), d = !1;
				u.flags |= s, t ? t.flags |= s : t = u, this.updateState = 2, u.empty || (this.updatePlugins(u), this.inputState.update(u), this.updateAttrs(), d = this.docView.update(u), d && this.docViewUpdate());
				for (let e = 0; e < c.length; e++) if (l[e] != jm) try {
					let t = c[e];
					t.write && t.write(l[e], this);
				} catch (e) {
					md(this.state, e);
				}
				if (d && this.docView.updateSelection(!0), !u.viewportChanged && this.measureRequests.length == 0) {
					if (this.viewState.editorHeight) {
						if (this.viewState.scrollTarget) {
							this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, a = -1;
							continue;
						}
						{
							let e = (i < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(i).top) / this.viewState.scaleY - a / o;
							if ((e > 1 || e < -1) && !(V.ios && this.inputState.lastIOSMomentumScroll > Date.now() - 100) && (n == this.scrollDOM || this.hasFocus || Math.max(this.inputState.lastWheelEvent, this.inputState.lastTouchTime) > Date.now() - 100)) {
								r += e, n ? i < 0 ? n.scrollTop = n.scrollHeight : n.scrollTop += e : this.win.scrollBy(0, e), a = -1;
								continue;
							}
						}
					}
					break;
				}
			}
		} finally {
			this.updateState = 0, this.measureScheduled = -1;
		}
		if (t && !t.empty) for (let e of this.state.facet(rd)) e(t);
	}
	get themeClasses() {
		return _m + " " + (this.state.facet(gm) ? ym : vm) + " " + this.state.facet(hm);
	}
	updateAttrs() {
		let e = Nm(this, bd, { class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses }), t = {
			spellcheck: "false",
			autocorrect: "off",
			autocapitalize: "off",
			writingsuggestions: "false",
			translate: "no",
			contenteditable: this.state.facet(hd) ? "true" : "false",
			class: "cm-content",
			style: `${V.tabSize}: ${this.state.tabSize}`,
			role: "textbox",
			"aria-multiline": "true"
		};
		this.state.readOnly && (t["aria-readonly"] = "true"), Nm(this, xd, t);
		let n = this.observer.ignore(() => {
			let n = Hl(this.contentDOM, this.contentAttrs, t), r = Hl(this.dom, this.editorAttrs, e);
			return n || r;
		});
		return this.editorAttrs = e, this.contentAttrs = t, n;
	}
	showAnnouncements(t) {
		let n = !0;
		for (let r of t) for (let t of r.effects) if (t.is(e.announce)) {
			n &&= (this.announceDOM.textContent = "", this.win.clearTimeout(this.clearAnnouncement), this.clearAnnouncement = this.win.setTimeout(() => {
				this.announceDOM.textContent = "\xA0";
			}, 200), !1);
			let e = this.announceDOM.appendChild(document.createElement("div"));
			e.textContent = t.value;
		}
	}
	mountStyles() {
		this.styleModules = this.state.facet(Md);
		let t = this.state.facet(e.cspNonce);
		gl.mount(this.root, this.styleModules.concat(Sm).reverse(), t ? { nonce: t } : void 0);
	}
	readMeasured() {
		if (this.updateState == 2) throw Error("Reading the editor layout isn't allowed during an update");
		this.updateState == 0 && this.measureScheduled > -1 && this.measure(!1);
	}
	requestMeasure(e) {
		if (this.measureScheduled < 0 && (this.measureScheduled = this.win.requestAnimationFrame(() => this.measure())), e) {
			if (this.measureRequests.indexOf(e) > -1) return;
			if (e.key != null) {
				for (let t = 0; t < this.measureRequests.length; t++) if (this.measureRequests[t].key === e.key) {
					this.measureRequests[t] = e;
					return;
				}
			}
			this.measureRequests.push(e);
		}
	}
	plugin(e) {
		let t = this.pluginMap.get(e);
		return (t === void 0 || t && t.plugin != e) && this.pluginMap.set(e, t = this.plugins.find((t) => t.plugin == e) || null), t && t.update(this).value;
	}
	get documentTop() {
		return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
	}
	get documentPadding() {
		return {
			top: this.viewState.paddingTop,
			bottom: this.viewState.paddingBottom
		};
	}
	get scaleX() {
		return this.viewState.scaleX;
	}
	get scaleY() {
		return this.viewState.scaleY;
	}
	elementAtHeight(e) {
		return this.readMeasured(), this.viewState.elementAtHeight(e);
	}
	lineBlockAtHeight(e) {
		return this.readMeasured(), this.viewState.lineBlockAtHeight(e);
	}
	get viewportLineBlocks() {
		return this.viewState.viewportLines;
	}
	lineBlockAt(e) {
		return this.viewState.lineBlockAt(e);
	}
	get contentHeight() {
		return this.viewState.contentHeight;
	}
	moveByChar(e, t, n) {
		return Mf(this, e, Df(this, e, t, n));
	}
	moveByGroup(e, t) {
		return Mf(this, e, Df(this, e, t, (t) => Of(this, e.head, t)));
	}
	visualLineSide(e, t) {
		return t ? z.cursor(e.to, 1) : z.cursor(e.from, -1);
	}
	moveToLineBoundary(e, t, n = !0) {
		return Ef(this, e, t, n);
	}
	moveVertically(e, t, n) {
		return Mf(this, e, kf(this, e, t, n));
	}
	domAtPos(e, t = 1) {
		return this.docView.domAtPos(e, t);
	}
	posAtDOM(e, t = 0) {
		return this.docView.posFromDOM(e, t);
	}
	posAtCoords(e, t = !0) {
		this.readMeasured();
		let n = Pf(this, e, t);
		return n && n.pos;
	}
	posAndSideAtCoords(e, t = !0) {
		return this.readMeasured(), Pf(this, e, t);
	}
	coordsAtPos(e, t = 1) {
		this.readMeasured();
		let n = this.state.doc.lineAt(e), r = this.bidiSpans(n), i = r[Vu.find(r, e - n.from, -1, t)];
		return n.length && (e == n.from && t < 0 || e == n.to && t > 0) && i.dir != this.textDirectionAt(n.from) && (e == n.to ? (e = n.from + i.from, t = 1) : (e = n.from + i.to, t = -1)), this.docView.coordsAt(e, t, i.dir == ju.RTL);
	}
	coordsForChar(e) {
		return this.readMeasured(), this.docView.coordsForChar(e);
	}
	get defaultCharacterWidth() {
		return this.viewState.heightOracle.charWidth;
	}
	get defaultLineHeight() {
		return this.viewState.heightOracle.lineHeight;
	}
	get textDirection() {
		return this.viewState.defaultTextDirection;
	}
	textDirectionAt(e) {
		return !this.state.facet(cd) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
	}
	get lineWrapping() {
		return this.viewState.heightOracle.lineWrapping;
	}
	bidiSpans(e) {
		if (e.length > Am) return Yu(e.length);
		let t = this.textDirectionAt(e.from), n;
		for (let r of this.bidiCache) if (r.from == e.from && r.dir == t && (r.fresh || Hu(r.isolates, n = Dd(this, e)))) return r.order;
		n ||= Dd(this, e);
		let r = Ju(e.text, t, n);
		return this.bidiCache.push(new Mm(e.from, e.to, t, n, !0, r)), r;
	}
	get hasFocus() {
		return (this.dom.ownerDocument.hasFocus() || V.safari && this.inputState?.lastContextMenu > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
	}
	focus() {
		this.observer.ignore(() => {
			xu(this.contentDOM), this.docView.updateSelection();
		});
	}
	setRoot(e) {
		this._root != e && (this._root = e, this.observer.setWindow((e.nodeType == 9 ? e : e.ownerDocument).defaultView || window), this.mountStyles());
	}
	destroy() {
		this.root.activeElement == this.contentDOM && this.contentDOM.blur();
		for (let e of this.plugins) e.destroy(this);
		this.plugins = [], this.inputState.destroy(), this.docView.destroy(), this.dom.remove(), this.observer.destroy(), this.win.clearTimeout(this.clearAnnouncement), this.measureScheduled > -1 && this.win.cancelAnimationFrame(this.measureScheduled), this.destroyed = !0;
	}
	static scrollIntoView(e, t = {}) {
		return fd.of(new dd(typeof e == "number" ? z.cursor(e) : e, t.y ?? "nearest", t.x ?? "nearest", t.yMargin ?? 5, t.xMargin ?? 5));
	}
	scrollSnapshot() {
		let { scrollTop: e, scrollLeft: t } = this.scrollDOM, n = this.viewState.scrollAnchorAt(e);
		return fd.of(new dd(z.cursor(n.from), "start", "start", n.top - e, t, !0));
	}
	setTabFocusMode(e) {
		e == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof e == "boolean" ? this.inputState.tabFocusMode = e ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + e);
	}
	static domEventHandlers(e) {
		return vd.define(() => ({}), { eventHandlers: e });
	}
	static domEventObservers(e) {
		return vd.define(() => ({}), { eventObservers: e });
	}
	static theme(e, t) {
		let n = gl.newName(), r = [hm.of(n), Md.of(xm(`.${n}`, e))];
		return t && t.dark && r.push(gm.of(!0)), r;
	}
	static baseTheme(e) {
		return uc.lowest(Md.of(xm("." + _m, e, bm)));
	}
	static findFromDOM(e) {
		let t = e.querySelector(".cm-content");
		return (t && Id.get(t) || Id.get(e))?.root?.view || null;
	}
};
W.styleModule = Md, W.inputHandler = id, W.clipboardInputFilter = od, W.clipboardOutputFilter = sd, W.scrollHandler = ud, W.focusChangeEffect = ad, W.perLineTextDirection = cd, W.exceptionSink = nd, W.updateListener = rd, W.editable = hd, W.mouseSelectionStyle = td, W.dragMovesSelection = ed, W.clickAddsSelectionRange = $u, W.decorations = Sd, W.blockWrappers = Cd, W.outerDecorations = wd, W.atomicRanges = Td, W.bidiIsolatedRanges = Ed, W.cursorScrollMargin = /*@__PURE__*/ B.define({ combine: (e) => {
	let t = 5, n = 5;
	for (let r of e) typeof r == "number" ? t = n = r : {x: t, y: n} = r;
	return {
		x: t,
		y: n
	};
} }), W.coveredMargins = Ad, W.scrollMargins = kd, W.darkTheme = gm, W.cspNonce = /*@__PURE__*/ B.define({ combine: (e) => e.length ? e[0] : "" }), W.contentAttributes = xd, W.editorAttributes = bd, W.lineWrapping = /*@__PURE__*/ W.contentAttributes.of({ class: "cm-lineWrapping" }), W.announce = /*@__PURE__*/ Oc.define();
var Am = 4096, jm = {}, Mm = class e {
	constructor(e, t, n, r, i, a) {
		this.from = e, this.to = t, this.dir = n, this.isolates = r, this.fresh = i, this.order = a;
	}
	static update(t, n) {
		if (n.empty && !t.some((e) => e.fresh)) return t;
		let r = [], i = t.length ? t[t.length - 1].dir : ju.LTR;
		for (let a = Math.max(0, t.length - 10); a < t.length; a++) {
			let o = t[a];
			o.dir == i && !n.touchesRange(o.from, o.to) && r.push(new e(n.mapPos(o.from, 1), n.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
		}
		return r;
	}
};
function Nm(e, t, n) {
	for (let r = e.state.facet(t), i = r.length - 1; i >= 0; i--) {
		let t = r[i], a = typeof t == "function" ? t(e) : t;
		a && Rl(a, n);
	}
	return n;
}
var Pm = V.mac ? "mac" : V.windows ? "win" : V.linux ? "linux" : "key";
function Fm(e, t) {
	let n = e.split(/-(?!$)/), r = n[n.length - 1];
	r == "Space" && (r = " ");
	let i, a, o, s;
	for (let e = 0; e < n.length - 1; ++e) {
		let r = n[e];
		if (/^(cmd|meta|m)$/i.test(r)) s = !0;
		else if (/^a(lt)?$/i.test(r)) i = !0;
		else if (/^(c|ctrl|control)$/i.test(r)) a = !0;
		else if (/^s(hift)?$/i.test(r)) o = !0;
		else if (/^mod$/i.test(r)) t == "mac" ? s = !0 : a = !0;
		else throw Error("Unrecognized modifier name: " + r);
	}
	return i && (r = "Alt-" + r), a && (r = "Ctrl-" + r), s && (r = "Meta-" + r), o && (r = "Shift-" + r), r;
}
function Im(e, t, n) {
	return t.altKey && (e = "Alt-" + e), t.ctrlKey && (e = "Ctrl-" + e), t.metaKey && (e = "Meta-" + e), n !== !1 && t.shiftKey && (e = "Shift-" + e), e;
}
var Lm = /*@__PURE__*/ uc.default(/*@__PURE__*/ W.domEventHandlers({ keydown(e, t) {
	return Gm(Bm(t.state), e, t, "editor");
} })), Rm = /*@__PURE__*/ B.define({ enables: Lm }), zm = /*@__PURE__*/ new WeakMap();
function Bm(e) {
	let t = e.facet(Rm), n = zm.get(t);
	return n || zm.set(t, n = Um(t.reduce((e, t) => e.concat(t), []))), n;
}
var Vm = null, Hm = 4e3;
function Um(e, t = Pm) {
	let n = Object.create(null), r = Object.create(null), i = (e, t) => {
		let n = r[e];
		if (n == null) r[e] = t;
		else if (n != t) throw Error("Key binding " + e + " is used both as a regular binding and as a multi-stroke prefix");
	}, a = (e, r, a, o, s) => {
		let c = n[e] || (n[e] = Object.create(null)), l = r.split(/ (?!$)/).map((e) => Fm(e, t));
		for (let t = 1; t < l.length; t++) {
			let n = l.slice(0, t).join(" ");
			i(n, !0), c[n] || (c[n] = {
				preventDefault: !0,
				stopPropagation: !1,
				run: [(t) => {
					let r = Vm = {
						view: t,
						prefix: n,
						scope: e
					};
					return setTimeout(() => {
						Vm == r && (Vm = null);
					}, Hm), !0;
				}]
			});
		}
		let u = l.join(" ");
		i(u, !1);
		let d = c[u] || (c[u] = {
			preventDefault: !1,
			stopPropagation: !1,
			run: (c._any?.run)?.slice() || []
		});
		a && d.run.push(a), o && (d.preventDefault = !0), s && (d.stopPropagation = !0);
	};
	for (let r of e) {
		let e = r.scope ? r.scope.split(" ") : ["editor"];
		if (r.any) for (let t of e) {
			let e = n[t] || (n[t] = Object.create(null));
			e._any ||= {
				preventDefault: !1,
				stopPropagation: !1,
				run: []
			};
			let { any: i } = r;
			for (let t in e) e[t].run.push((e) => i(e, Wm));
		}
		let i = r[t] || r.key;
		if (i) for (let t of e) a(t, i, r.run, r.preventDefault, r.stopPropagation), r.shift && a(t, "Shift-" + i, r.shift, r.preventDefault, r.stopPropagation);
	}
	return n;
}
var Wm = null;
function Gm(e, t, n, r) {
	Wm = t;
	let i = El(t), a = Vs(Bs(i, 0)) == i.length && i != " ", o = "", s = !1, c = !1, l = !1;
	Vm && Vm.view == n && Vm.scope == r && (o = Vm.prefix + " ", np.indexOf(t.keyCode) < 0 && (c = !0, Vm = null));
	let u = /* @__PURE__ */ new Set(), d = (e) => {
		if (e) {
			for (let t of e.run) if (!u.has(t) && (u.add(t), t(n))) return e.stopPropagation && (l = !0), !0;
			e.preventDefault && (e.stopPropagation && (l = !0), c = !0);
		}
		return !1;
	}, f = e[r], p, m;
	return f && (d(f[o + Im(i, t, !a)]) ? s = !0 : a && (t.altKey || t.metaKey || t.ctrlKey) && !(V.windows && t.ctrlKey && t.altKey) && !(V.mac && t.altKey && !(t.ctrlKey || t.metaKey)) && (p = bl[t.keyCode]) && p != i ? (d(f[o + Im(p, t, !0)]) || t.shiftKey && (m = xl[t.keyCode]) != i && m != p && d(f[o + Im(m, t, !1)])) && (s = !0) : a && t.shiftKey && d(f[o + Im(i, t, !0)]) && (s = !0), !s && d(f._any) && (s = !0)), c && (s = !0), s && l && t.stopPropagation(), Wm = null, s;
}
var Km = class e {
	constructor(e, t, n, r, i) {
		this.className = e, this.left = t, this.top = n, this.width = r, this.height = i;
	}
	draw() {
		let e = document.createElement("div");
		return e.className = this.className, this.adjust(e), e;
	}
	update(e, t) {
		return t.className == this.className && (this.adjust(e), !0);
	}
	adjust(e) {
		e.style.left = this.left + "px", e.style.top = this.top + "px", this.width != null && (e.style.width = this.width + "px"), e.style.height = this.height + "px";
	}
	eq(e) {
		return this.left == e.left && this.top == e.top && this.width == e.width && this.height == e.height && this.className == e.className;
	}
	static forRange(t, n, r) {
		if (r.empty) {
			let i = t.coordsAtPos(r.head, r.assoc || 1);
			if (!i) return [];
			let a = qm(t);
			return [new e(n, i.left - a.left, i.top - a.top, null, i.bottom - i.top)];
		}
		return Ym(t, n, r);
	}
};
function qm(e) {
	let t = e.scrollDOM.getBoundingClientRect();
	return {
		left: (e.textDirection == ju.LTR ? t.left : t.right - e.scrollDOM.clientWidth * e.scaleX) - e.scrollDOM.scrollLeft * e.scaleX,
		top: t.top - e.scrollDOM.scrollTop * e.scaleY
	};
}
function Jm(e, t, n, r) {
	let i = e.coordsAtPos(t, n * 2);
	if (!i) return r;
	let a = e.dom.getBoundingClientRect(), o = (i.top + i.bottom) / 2, s = e.posAtCoords({
		x: a.left + 1,
		y: o
	}), c = e.posAtCoords({
		x: a.right - 1,
		y: o
	});
	return s == null || c == null ? r : {
		from: Math.max(r.from, Math.min(s, c)),
		to: Math.min(r.to, Math.max(s, c))
	};
}
function Ym(e, t, n) {
	if (n.to <= e.viewport.from || n.from >= e.viewport.to) return [];
	let r = Math.max(n.from, e.viewport.from), i = Math.min(n.to, e.viewport.to), a = e.textDirection == ju.LTR, o = e.contentDOM, s = o.getBoundingClientRect(), c = qm(e), l = o.querySelector(".cm-line"), u = l && window.getComputedStyle(l), d = s.left + (u ? parseInt(u.paddingLeft) + Math.min(0, parseInt(u.textIndent)) : 0), f = s.right - (u ? parseInt(u.paddingRight) : 0), p = Tf(e, r, 1), m = Tf(e, i, -1), h = p.type == Gl.Text ? p : null, g = m.type == Gl.Text ? m : null;
	if (h && (e.lineWrapping || p.widgetLineBreaks) && (h = Jm(e, r, 1, h)), g && (e.lineWrapping || m.widgetLineBreaks) && (g = Jm(e, i, -1, g)), h && g && h.from == g.from && h.to == g.to) return v(y(n.from, n.to, h));
	{
		let t = h ? y(n.from, null, h) : b(p, !1), r = g ? y(null, n.to, g) : b(m, !0), i = [];
		return (h || p).to < (g || m).from - (h && g ? 1 : 0) || p.widgetLineBreaks > 1 && t.bottom + e.defaultLineHeight / 2 < r.top ? i.push(_(d, t.bottom, f, r.top)) : t.bottom < r.top && e.elementAtHeight((t.bottom + r.top) / 2).type == Gl.Text && (t.bottom = r.top = (t.bottom + r.top) / 2), v(t).concat(i).concat(v(r));
	}
	function _(e, n, r, i) {
		return new Km(t, e - c.left, n - c.top, Math.max(0, r - e), i - n);
	}
	function v({ top: e, bottom: t, horizontal: n }) {
		let r = [];
		for (let i = 0; i < n.length; i += 2) r.push(_(n[i], e, n[i + 1], t));
		return r;
	}
	function y(t, n, r) {
		let i = 1e9, o = -1e9, s = [];
		function c(t, n, c, l, u) {
			let p = e.coordsAtPos(t, t == r.to ? -2 : 2), m = e.coordsAtPos(c, c == r.from ? 2 : -2);
			p && m && (i = Math.min(p.top, m.top, i), o = Math.max(p.bottom, m.bottom, o), u == ju.LTR ? s.push(a && n ? d : p.left, a && l ? f : m.right) : s.push(!a && l ? d : m.left, !a && n ? f : p.right));
		}
		let l = t ?? r.from, u = n ?? r.to;
		for (let r of e.visibleRanges) if (r.to > l && r.from < u) for (let i = Math.max(r.from, l), a = Math.min(r.to, u);;) {
			let r = e.state.doc.lineAt(i);
			for (let o of e.bidiSpans(r)) {
				let e = o.from + r.from, s = o.to + r.from;
				if (e >= a) break;
				s > i && c(Math.max(e, i), t == null && e <= l, Math.min(s, a), n == null && s >= u, o.dir);
			}
			if (i = r.to + 1, i >= a) break;
		}
		return s.length == 0 && c(l, t == null, u, n == null, e.textDirection), {
			top: i,
			bottom: o,
			horizontal: s
		};
	}
	function b(e, t) {
		let n = s.top + (t ? e.top : e.bottom);
		return {
			top: n,
			bottom: n,
			horizontal: []
		};
	}
}
function Xm(e, t) {
	return e.constructor == t.constructor && e.eq(t);
}
var Zm = class {
	constructor(e, t) {
		this.view = e, this.layer = t, this.drawn = [], this.scaleX = 1, this.scaleY = 1, this.measureReq = {
			read: this.measure.bind(this),
			write: this.draw.bind(this)
		}, this.dom = e.scrollDOM.appendChild(document.createElement("div")), this.dom.classList.add("cm-layer"), t.above && this.dom.classList.add("cm-layer-above"), t.class && this.dom.classList.add(t.class), this.scale(), this.dom.setAttribute("aria-hidden", "true"), this.setOrder(e.state), e.requestMeasure(this.measureReq), t.mount && t.mount(this.dom, e);
	}
	update(e) {
		e.startState.facet(Qm) != e.state.facet(Qm) && this.setOrder(e.state), (this.layer.update(e, this.dom) || e.geometryChanged) && (this.scale(), e.view.requestMeasure(this.measureReq));
	}
	docViewUpdate(e) {
		this.layer.updateOnDocViewUpdate !== !1 && e.requestMeasure(this.measureReq);
	}
	setOrder(e) {
		let t = 0, n = e.facet(Qm);
		for (; t < n.length && n[t] != this.layer;) t++;
		this.dom.style.zIndex = String((this.layer.above ? 150 : -1) - t);
	}
	measure() {
		return this.layer.markers(this.view);
	}
	scale() {
		let { scaleX: e, scaleY: t } = this.view;
		(e != this.scaleX || t != this.scaleY) && (this.scaleX = e, this.scaleY = t, this.dom.style.transform = `scale(${1 / e}, ${1 / t})`);
	}
	draw(e) {
		if (e.length != this.drawn.length || e.some((e, t) => !Xm(e, this.drawn[t]))) {
			let t = this.dom.firstChild, n = 0;
			for (let r of e) r.update && t && r.constructor && this.drawn[n].constructor && r.update(t, this.drawn[n]) ? (t = t.nextSibling, n++) : this.dom.insertBefore(r.draw(), t);
			for (; t;) {
				let e = t.nextSibling;
				t.remove(), t = e;
			}
			this.drawn = e, V.webkit && (this.dom.style.display = this.dom.firstChild ? "" : "none");
		}
	}
	destroy() {
		this.layer.destroy && this.layer.destroy(this.dom, this.view), this.dom.remove();
	}
}, Qm = /*@__PURE__*/ B.define();
function $m(e) {
	return [vd.define((t) => new Zm(t, e)), Qm.of(e)];
}
var eh = !V.ios, th = /*@__PURE__*/ B.define({ combine(e) {
	return Wc(e, {
		cursorBlinkRate: 1200,
		drawRangeCursor: !0,
		iosSelectionHandles: !0
	}, {
		cursorBlinkRate: (e, t) => Math.min(e, t),
		drawRangeCursor: (e, t) => e || t
	});
} });
function nh(e = {}) {
	return [
		th.of(e),
		ih,
		oh,
		ch,
		ld.of(!0)
	];
}
function rh(e) {
	return e.startState.facet(th) != e.state.facet(th);
}
var ih = /*@__PURE__*/ $m({
	above: !0,
	markers(e) {
		let { state: t } = e, n = t.facet(th), r = [];
		for (let i of t.selection.ranges) {
			let a = i == t.selection.main;
			if (i.empty || n.drawRangeCursor && !(a && V.ios && n.iosSelectionHandles)) {
				let t = a ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary", n = i.empty ? i : z.cursor(i.head, i.assoc);
				for (let i of Km.forRange(e, t, n)) r.push(i);
			}
		}
		return r;
	},
	update(e, t) {
		e.transactions.some((e) => e.selection) && (t.style.animationName = t.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink");
		let n = rh(e);
		return n && ah(e.state, t), e.docChanged || e.selectionSet || n;
	},
	mount(e, t) {
		ah(t.state, e);
	},
	class: "cm-cursorLayer"
});
function ah(e, t) {
	t.style.animationDuration = e.facet(th).cursorBlinkRate + "ms";
}
var oh = /*@__PURE__*/ $m({
	above: !1,
	markers(e) {
		let t = [], { main: n, ranges: r } = e.state.selection;
		for (let i of r) if (!i.empty && (eh || i != n)) for (let n of Km.forRange(e, "cm-selectionBackground", i)) t.push(n);
		if (V.ios && !n.empty && e.state.facet(th).iosSelectionHandles) {
			for (let r of Km.forRange(e, "cm-selectionHandle cm-selectionHandle-start", z.cursor(n.from, 1))) t.push(r);
			for (let r of Km.forRange(e, "cm-selectionHandle cm-selectionHandle-end", z.cursor(n.to, 1))) t.push(r);
		}
		return t;
	},
	update(e, t) {
		return e.docChanged || e.selectionSet || e.viewportChanged || rh(e);
	},
	class: "cm-selectionLayer"
}), sh = V.gecko && V.gecko_version == 153 ? "#ffffff01" : "transparent", ch = /*@__PURE__*/ uc.highest(/*@__PURE__*/ W.theme({
	".cm-line": {
		...eh ? { "& ::selection, &::selection": { backgroundColor: `${sh} !important` } } : {},
		caretColor: "transparent !important"
	},
	".cm-content": {
		caretColor: "transparent !important",
		"& :focus": {
			caretColor: "initial !important",
			...eh ? { "&::selection, & ::selection": { backgroundColor: "Highlight !important" } } : {}
		}
	}
}));
/x/.unicode;
var lh = class extends Gc {
	compare(e) {
		return this == e || this.constructor == e.constructor && this.eq(e);
	}
	eq(e) {
		return !1;
	}
	destroy(e) {}
};
lh.prototype.elementClass = "", lh.prototype.toDOM = void 0, lh.prototype.mapMode = Us.TrackBefore, lh.prototype.startSide = lh.prototype.endSide = -1, lh.prototype.point = !0;
var uh = /*@__PURE__*/ B.define(), dh = /*@__PURE__*/ B.define(), fh = /*@__PURE__*/ B.define(), ph = /*@__PURE__*/ B.define({ combine: (e) => e.some((e) => e) });
function mh(e) {
	let t = [hh];
	return e && e.fixed === !1 && t.push(ph.of(!0)), t;
}
var hh = /*@__PURE__*/ vd.fromClass(class {
	constructor(e) {
		this.view = e, this.domAfter = null, this.prevViewport = e.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters cm-gutters-before", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.gutters = e.state.facet(fh).map((t) => new yh(e, t)), this.fixed = !e.state.facet(ph);
		for (let e of this.gutters) e.config.side == "after" ? this.getDOMAfter().appendChild(e.dom) : this.dom.appendChild(e.dom);
		this.fixed && (this.dom.style.position = "sticky"), this.syncGutters(!1), e.scrollDOM.insertBefore(this.dom, e.contentDOM);
	}
	getDOMAfter() {
		return this.domAfter || (this.domAfter = document.createElement("div"), this.domAfter.className = "cm-gutters cm-gutters-after", this.domAfter.setAttribute("aria-hidden", "true"), this.domAfter.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.domAfter.style.position = this.fixed ? "sticky" : "", this.view.scrollDOM.appendChild(this.domAfter)), this.domAfter;
	}
	update(e) {
		if (this.updateGutters(e)) {
			let t = this.prevViewport, n = e.view.viewport, r = Math.min(t.to, n.to) - Math.max(t.from, n.from);
			this.syncGutters(r < (n.to - n.from) * .8);
		}
		if (e.geometryChanged) {
			let e = this.view.contentHeight / this.view.scaleY + "px";
			this.dom.style.minHeight = e, this.domAfter && (this.domAfter.style.minHeight = e);
		}
		this.view.state.facet(ph) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : "", this.domAfter && (this.domAfter.style.position = this.fixed ? "sticky" : "")), this.prevViewport = e.view.viewport;
	}
	syncGutters(e) {
		let t = this.dom.nextSibling;
		e && (this.dom.remove(), this.domAfter && this.domAfter.remove());
		let n = Xc.iter(this.view.state.facet(uh), this.view.viewport.from), r = [], i = this.gutters.map((e) => new vh(e, this.view.viewport, -this.view.documentPadding.top));
		for (let e of this.view.viewportLineBlocks) if (r.length && (r = []), Array.isArray(e.type)) {
			let t = !0;
			for (let a of e.type) if (a.type == Gl.Text && t) {
				_h(n, r, a.from);
				for (let e of i) e.line(this.view, a, r);
				t = !1;
			} else if (a.widget) for (let e of i) e.widget(this.view, a);
		} else if (e.type == Gl.Text) {
			_h(n, r, e.from);
			for (let t of i) t.line(this.view, e, r);
		} else if (e.widget) for (let t of i) t.widget(this.view, e);
		for (let e of i) e.finish();
		e && (this.view.scrollDOM.insertBefore(this.dom, t), this.domAfter && this.view.scrollDOM.appendChild(this.domAfter));
	}
	updateGutters(e) {
		let t = e.startState.facet(fh), n = e.state.facet(fh), r = e.docChanged || e.heightChanged || e.viewportChanged || !Xc.eq(e.startState.facet(uh), e.state.facet(uh), e.view.viewport.from, e.view.viewport.to);
		if (t == n) for (let t of this.gutters) t.update(e) && (r = !0);
		else {
			r = !0;
			let i = [];
			for (let r of n) {
				let n = t.indexOf(r);
				n < 0 ? i.push(new yh(this.view, r)) : (this.gutters[n].update(e), i.push(this.gutters[n]));
			}
			for (let e of this.gutters) e.dom.remove(), i.indexOf(e) < 0 && e.destroy();
			for (let e of i) e.config.side == "after" ? this.getDOMAfter().appendChild(e.dom) : this.dom.appendChild(e.dom);
			this.gutters = i;
		}
		return r;
	}
	destroy() {
		for (let e of this.gutters) e.destroy();
		this.dom.remove(), this.domAfter && this.domAfter.remove();
	}
}, { provide: (e) => W.coveredMargins.of((t) => {
	let n = t.plugin(e);
	if (!n || n.gutters.length == 0 || !n.fixed) return null;
	let r = n.dom.getBoundingClientRect(), i = n.domAfter?.getBoundingClientRect();
	return t.textDirection == ju.LTR ? {
		left: r.right,
		right: i?.left,
		elt: n.dom
	} : {
		right: r.left,
		left: i?.right,
		elt: n.dom
	};
}) });
function gh(e) {
	return Array.isArray(e) ? e : [e];
}
function _h(e, t, n) {
	for (; e.value && e.from <= n;) e.from == n && t.push(e.value), e.next();
}
var vh = class {
	constructor(e, t, n) {
		this.gutter = e, this.height = n, this.i = 0, this.cursor = Xc.iter(e.markers, t.from);
	}
	addElement(e, t, n) {
		let { gutter: r } = this, i = (t.top - this.height) / e.scaleY, a = t.height / e.scaleY;
		if (this.i == r.elements.length) {
			let t = new bh(e, a, i, n);
			r.elements.push(t), r.dom.appendChild(t.dom);
		} else r.elements[this.i].update(e, a, i, n);
		this.height = t.bottom, this.i++;
	}
	line(e, t, n) {
		let r = [];
		_h(this.cursor, r, t.from), n.length && (r = r.concat(n));
		let i = this.gutter.config.lineMarker(e, t, r);
		i && r.unshift(i);
		let a = this.gutter;
		(r.length != 0 || a.config.renderEmptyElements) && this.addElement(e, t, r);
	}
	widget(e, t) {
		let n = this.gutter.config.widgetMarker(e, t.widget, t), r = n ? [n] : null;
		for (let n of e.state.facet(dh)) {
			let i = n(e, t.widget, t);
			i && (r ||= []).push(i);
		}
		r && this.addElement(e, t, r);
	}
	finish() {
		let e = this.gutter;
		for (; e.elements.length > this.i;) {
			let t = e.elements.pop();
			e.dom.removeChild(t.dom), t.destroy();
		}
	}
}, yh = class {
	constructor(e, t) {
		this.view = e, this.config = t, this.elements = [], this.spacer = null, this.dom = document.createElement("div"), this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
		for (let n in t.domEventHandlers) this.dom.addEventListener(n, (r) => {
			let i = r.target, a;
			if (i != this.dom && this.dom.contains(i)) {
				for (; i.parentNode != this.dom;) i = i.parentNode;
				let e = i.getBoundingClientRect();
				a = (e.top + e.bottom) / 2;
			} else a = r.clientY;
			let o = e.lineBlockAtHeight(a - e.documentTop);
			t.domEventHandlers[n](e, o, r) && r.preventDefault();
		});
		this.markers = gh(t.markers(e)), t.initialSpacer && (this.spacer = new bh(e, 0, 0, [t.initialSpacer(e)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
	}
	update(e) {
		let t = this.markers;
		if (this.markers = gh(this.config.markers(e.view)), this.spacer && this.config.updateSpacer) {
			let t = this.config.updateSpacer(this.spacer.markers[0], e);
			t != this.spacer.markers[0] && this.spacer.update(e.view, 0, 0, [t]);
		}
		let n = e.view.viewport;
		return !Xc.eq(this.markers, t, n.from, n.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(e) : !1);
	}
	destroy() {
		for (let e of this.elements) e.destroy();
	}
}, bh = class {
	constructor(e, t, n, r) {
		this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(e, t, n, r);
	}
	update(e, t, n, r) {
		this.height != t && (this.height = t, this.dom.style.height = t + "px"), this.above != n && (this.dom.style.marginTop = (this.above = n) ? n + "px" : ""), xh(this.markers, r) || this.setMarkers(e, r);
	}
	setMarkers(e, t) {
		let n = "cm-gutterElement", r = this.dom.firstChild;
		for (let i = 0, a = 0;;) {
			let o = a, s = i < t.length ? t[i++] : null, c = !1;
			if (s) {
				let e = s.elementClass;
				e && (n += " " + e);
				for (let e = a; e < this.markers.length; e++) if (this.markers[e].compare(s)) {
					o = e, c = !0;
					break;
				}
			} else o = this.markers.length;
			for (; a < o;) {
				let e = this.markers[a++];
				if (e.toDOM) {
					e.destroy(r);
					let t = r.nextSibling;
					r.remove(), r = t;
				}
			}
			if (!s) break;
			s.toDOM && (c ? r = r.nextSibling : this.dom.insertBefore(s.toDOM(e), r)), c && a++;
		}
		this.dom.className = n, this.markers = t;
	}
	destroy() {
		this.setMarkers(null, []);
	}
};
function xh(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) if (!e[n].compare(t[n])) return !1;
	return !0;
}
var Sh = /*@__PURE__*/ B.define(), Ch = /*@__PURE__*/ B.define(), wh = /*@__PURE__*/ B.define({ combine(e) {
	return Wc(e, {
		formatNumber: String,
		domEventHandlers: {}
	}, { domEventHandlers(e, t) {
		let n = Object.assign({}, e);
		for (let e in t) {
			let r = n[e], i = t[e];
			n[e] = r ? (e, t, n) => r(e, t, n) || i(e, t, n) : i;
		}
		return n;
	} });
} }), Th = class extends lh {
	constructor(e) {
		super(), this.number = e;
	}
	eq(e) {
		return this.number == e.number;
	}
	toDOM() {
		return document.createTextNode(this.number);
	}
};
function Eh(e, t) {
	return e.state.facet(wh).formatNumber(t, e.state);
}
var Dh = /*@__PURE__*/ fh.compute([wh], (e) => ({
	class: "cm-lineNumbers",
	renderEmptyElements: !1,
	markers(e) {
		return e.state.facet(Sh);
	},
	lineMarker(e, t, n) {
		return n.some((e) => e.toDOM) ? null : new Th(Eh(e, e.state.doc.lineAt(t.from).number));
	},
	widgetMarker: (e, t, n) => {
		for (let r of e.state.facet(Ch)) {
			let i = r(e, t, n);
			if (i) return i;
		}
		return null;
	},
	lineMarkerChange: (e) => e.startState.facet(wh) != e.state.facet(wh),
	initialSpacer(e) {
		return new Th(Eh(e, kh(e.state.doc.lines)));
	},
	updateSpacer(e, t) {
		let n = Eh(t.view, kh(t.view.state.doc.lines));
		return n == e.number ? e : new Th(n);
	},
	domEventHandlers: e.facet(wh).domEventHandlers,
	side: "before"
}));
function Oh(e = {}) {
	return [
		wh.of(e),
		mh(),
		Dh
	];
}
function kh(e) {
	let t = 9;
	for (; t < e;) t = t * 10 + 9;
	return t;
}
// node_modules/@lezer/common/dist/index.js
var Ah = 1024, jh = 0, Mh = class {
	constructor(e, t) {
		this.from = e, this.to = t;
	}
}, G = class {
	constructor(e = {}) {
		this.id = jh++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
			throw Error("This node type doesn't define a deserialize function");
		}), this.combine = e.combine || null;
	}
	add(e) {
		if (this.perNode) throw RangeError("Can't add per-node props to node types");
		return typeof e != "function" && (e = Fh.match(e)), (t) => {
			let n = e(t);
			return n === void 0 ? null : [this, n];
		};
	}
};
G.closedBy = new G({ deserialize: (e) => e.split(" ") }), G.openedBy = new G({ deserialize: (e) => e.split(" ") }), G.group = new G({ deserialize: (e) => e.split(" ") }), G.isolate = new G({ deserialize: (e) => {
	if (e && e != "rtl" && e != "ltr" && e != "auto") throw RangeError("Invalid value for isolate: " + e);
	return e || "auto";
} }), G.contextHash = new G({ perNode: !0 }), G.lookAhead = new G({ perNode: !0 }), G.mounted = new G({ perNode: !0 });
var Nh = class {
	constructor(e, t, n, r = !1) {
		this.tree = e, this.overlay = t, this.parser = n, this.bracketed = r;
	}
	static get(e) {
		return e && e.props && e.props[G.mounted.id];
	}
}, Ph = Object.create(null), Fh = class e {
	constructor(e, t, n, r = 0) {
		this.name = e, this.props = t, this.id = n, this.flags = r;
	}
	static define(t) {
		let n = t.props && t.props.length ? Object.create(null) : Ph, r = +!!t.top | (t.skipped ? 2 : 0) | (t.error ? 4 : 0) | (t.name == null ? 8 : 0), i = new e(t.name || "", n, t.id, r);
		if (t.props) {
			for (let e of t.props) if (Array.isArray(e) || (e = e(i)), e) {
				if (e[0].perNode) throw RangeError("Can't store a per-node prop on a node type");
				n[e[0].id] = e[1];
			}
		}
		return i;
	}
	prop(e) {
		return this.props[e.id];
	}
	get isTop() {
		return (this.flags & 1) > 0;
	}
	get isSkipped() {
		return (this.flags & 2) > 0;
	}
	get isError() {
		return (this.flags & 4) > 0;
	}
	get isAnonymous() {
		return (this.flags & 8) > 0;
	}
	is(e) {
		if (typeof e == "string") {
			if (this.name == e) return !0;
			let t = this.prop(G.group);
			return t ? t.indexOf(e) > -1 : !1;
		}
		return this.id == e;
	}
	static match(e) {
		let t = Object.create(null);
		for (let n in e) for (let r of n.split(" ")) t[r] = e[n];
		return (e) => {
			for (let n = e.prop(G.group), r = -1; r < (n ? n.length : 0); r++) {
				let i = t[r < 0 ? e.name : n[r]];
				if (i) return i;
			}
		};
	}
};
Fh.none = new Fh("", Object.create(null), 0, 8);
var Ih = class e {
	constructor(e) {
		this.types = e;
		for (let t = 0; t < e.length; t++) if (e[t].id != t) throw RangeError("Node type ids should correspond to array positions when creating a node set");
	}
	extend(...t) {
		let n = [];
		for (let e of this.types) {
			let r = null;
			for (let n of t) {
				let t = n(e);
				if (t) {
					r ||= Object.assign({}, e.props);
					let n = t[1], i = t[0];
					i.combine && i.id in r && (n = i.combine(r[i.id], n)), r[i.id] = n;
				}
			}
			n.push(r ? new Fh(e.name, r, e.id, e.flags) : e);
		}
		return new e(n);
	}
}, Lh = /* @__PURE__ */ new WeakMap(), Rh = /* @__PURE__ */ new WeakMap(), K;
(function(e) {
	e[e.ExcludeBuffers = 1] = "ExcludeBuffers", e[e.IncludeAnonymous = 2] = "IncludeAnonymous", e[e.IgnoreMounts = 4] = "IgnoreMounts", e[e.IgnoreOverlays = 8] = "IgnoreOverlays", e[e.EnterBracketed = 16] = "EnterBracketed";
})(K ||= {});
var q = class e {
	constructor(e, t, n, r, i) {
		if (this.type = e, this.children = t, this.positions = n, this.length = r, this.props = null, i && i.length) {
			this.props = Object.create(null);
			for (let [e, t] of i) this.props[typeof e == "number" ? e : e.id] = t;
		}
	}
	toString() {
		let e = Nh.get(this);
		if (e && !e.overlay) return e.tree.toString();
		let t = "";
		for (let e of this.children) {
			let n = e.toString();
			n && (t && (t += ","), t += n);
		}
		return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
	}
	cursor(e = 0) {
		return new Qh(this.topNode, e);
	}
	cursorAt(e, t = 0, n = 0) {
		let r = new Qh(Lh.get(this) || this.topNode);
		return r.moveTo(e, t), Lh.set(this, r._tree), r;
	}
	get topNode() {
		return new Wh(this, 0, 0, null);
	}
	resolve(e, t = 0) {
		let n = Hh(Lh.get(this) || this.topNode, e, t, !1);
		return Lh.set(this, n), n;
	}
	resolveInner(e, t = 0) {
		let n = Hh(Rh.get(this) || this.topNode, e, t, !0);
		return Rh.set(this, n), n;
	}
	resolveStack(e, t = 0) {
		return Zh(this, e, t);
	}
	iterate(e) {
		let { enter: t, leave: n, from: r = 0, to: i = this.length } = e, a = e.mode || 0, o = (a & K.IncludeAnonymous) > 0;
		for (let e = this.cursor(a | K.IncludeAnonymous);;) {
			let a = !1;
			if (e.from <= i && e.to >= r && (!o && e.type.isAnonymous || t(e) !== !1)) {
				if (e.firstChild()) continue;
				a = !0;
			}
			for (; a && n && (o || !e.type.isAnonymous) && n(e), !e.nextSibling();) {
				if (!e.parent()) return;
				a = !0;
			}
		}
	}
	prop(e) {
		return e.perNode ? this.props ? this.props[e.id] : void 0 : this.type.prop(e);
	}
	get propValues() {
		let e = [];
		if (this.props) for (let t in this.props) e.push([+t, this.props[t]]);
		return e;
	}
	balance(t = {}) {
		return this.children.length <= 8 ? this : rg(Fh.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, n, r) => new e(this.type, t, n, r, this.propValues), t.makeTree || ((t, n, r) => new e(Fh.none, t, n, r)));
	}
	static build(e) {
		return eg(e);
	}
};
q.empty = new q(Fh.none, [], [], 0);
var zh = class e {
	constructor(e, t) {
		this.buffer = e, this.index = t;
	}
	get id() {
		return this.buffer[this.index - 4];
	}
	get start() {
		return this.buffer[this.index - 3];
	}
	get end() {
		return this.buffer[this.index - 2];
	}
	get size() {
		return this.buffer[this.index - 1];
	}
	get pos() {
		return this.index;
	}
	next() {
		this.index -= 4;
	}
	fork() {
		return new e(this.buffer, this.index);
	}
}, Bh = class e {
	constructor(e, t, n) {
		this.buffer = e, this.length = t, this.set = n;
	}
	get type() {
		return Fh.none;
	}
	toString() {
		let e = [];
		for (let t = 0; t < this.buffer.length;) e.push(this.childString(t)), t = this.buffer[t + 3];
		return e.join(",");
	}
	childString(e) {
		let t = this.buffer[e], n = this.buffer[e + 3], r = this.set.types[t], i = r.name;
		if (/\W/.test(i) && !r.isError && (i = JSON.stringify(i)), e += 4, n == e) return i;
		let a = [];
		for (; e < n;) a.push(this.childString(e)), e = this.buffer[e + 3];
		return i + "(" + a.join(",") + ")";
	}
	findChild(e, t, n, r, i) {
		let { buffer: a } = this, o = -1;
		for (let s = e; s != t && !(Vh(i, r, a[s + 1], a[s + 2]) && (o = s, n > 0)); s = a[s + 3]);
		return o;
	}
	slice(t, n, r) {
		let i = this.buffer, a = new Uint16Array(n - t), o = 0;
		for (let e = t, s = 0; e < n;) {
			a[s++] = i[e++], a[s++] = i[e++] - r;
			let n = a[s++] = i[e++] - r;
			a[s++] = i[e++] - t, o = Math.max(o, n);
		}
		return new e(a, o, this.set);
	}
};
function Vh(e, t, n, r) {
	switch (e) {
		case -2: return n < t;
		case -1: return r >= t && n < t;
		case 0: return n < t && r > t;
		case 1: return n <= t && r > t;
		case 2: return r > t;
		case 4: return !0;
	}
}
function Hh(e, t, n, r) {
	for (; e.from == e.to || (n < 1 ? e.from >= t : e.from > t) || (n > -1 ? e.to <= t : e.to < t);) {
		let t = !r && e instanceof Wh && e.index < 0 ? null : e.parent;
		if (!t) return e;
		e = t;
	}
	let i = r ? 0 : K.IgnoreOverlays;
	if (r) for (let r = e, a = r.parent; a; r = a, a = r.parent) r instanceof Wh && r.index < 0 && a.enter(t, n, i)?.from != r.from && (e = a);
	for (;;) {
		let r = e.enter(t, n, i);
		if (!r) return e;
		e = r;
	}
}
var Uh = class {
	cursor(e = 0) {
		return new Qh(this, e);
	}
	getChild(e, t = null, n = null) {
		let r = Gh(this, e, t, n);
		return r.length ? r[0] : null;
	}
	getChildren(e, t = null, n = null) {
		return Gh(this, e, t, n);
	}
	resolve(e, t = 0) {
		return Hh(this, e, t, !1);
	}
	resolveInner(e, t = 0) {
		return Hh(this, e, t, !0);
	}
	matchContext(e) {
		return Kh(this.parent, e);
	}
	enterUnfinishedNodesBefore(e) {
		let t = this.childBefore(e), n = this;
		for (; t;) {
			let e = t.lastChild;
			if (!e || e.to != t.to) break;
			e.type.isError && e.from == e.to ? (n = t, t = e.prevSibling) : t = e;
		}
		return n;
	}
	get node() {
		return this;
	}
	get next() {
		return this.parent;
	}
}, Wh = class e extends Uh {
	constructor(e, t, n, r) {
		super(), this._tree = e, this.from = t, this.index = n, this._parent = r;
	}
	get type() {
		return this._tree.type;
	}
	get name() {
		return this._tree.type.name;
	}
	get to() {
		return this.from + this._tree.length;
	}
	nextChild(t, n, r, i, a = 0) {
		for (let o = this;;) {
			for (let { children: s, positions: c } = o._tree, l = n > 0 ? s.length : -1; t != l; t += n) {
				let l = s[t], u = c[t] + o.from, d;
				if (a & K.EnterBracketed && l instanceof q && (d = Nh.get(l)) && !d.overlay && d.bracketed && r >= u && r <= u + l.length || Vh(i, r, u, u + l.length)) {
					if (l instanceof Bh) {
						if (a & K.ExcludeBuffers) continue;
						let e = l.findChild(0, l.buffer.length, n, r - u, i);
						if (e > -1) return new Jh(new qh(o, l, t, u), null, e);
					} else if (a & K.IncludeAnonymous || !l.type.isAnonymous || $h(l)) {
						let s;
						if (!(a & K.IgnoreMounts) && (s = Nh.get(l)) && !s.overlay) return new e(s.tree, u, t, o);
						let c = new e(l, u, t, o);
						return a & K.IncludeAnonymous || !c.type.isAnonymous ? c : c.nextChild(n < 0 ? l.children.length - 1 : 0, n, r, i, a);
					}
				}
			}
			if (a & K.IncludeAnonymous || !o.type.isAnonymous || (t = o.index >= 0 ? o.index + n : n < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o)) return null;
		}
	}
	get firstChild() {
		return this.nextChild(0, 1, 0, 4);
	}
	get lastChild() {
		return this.nextChild(this._tree.children.length - 1, -1, 0, 4);
	}
	childAfter(e) {
		return this.nextChild(0, 1, e, 2);
	}
	childBefore(e) {
		return this.nextChild(this._tree.children.length - 1, -1, e, -2);
	}
	prop(e) {
		return this._tree.prop(e);
	}
	enter(t, n, r = 0) {
		let i;
		if (!(r & K.IgnoreOverlays) && (i = Nh.get(this._tree)) && i.overlay) {
			let a = t - this.from, o = r & K.EnterBracketed && i.bracketed;
			for (let { from: t, to: r } of i.overlay) if ((n > 0 || o ? t <= a : t < a) && (n < 0 || o ? r >= a : r > a)) return new e(i.tree, i.overlay[0].from + this.from, -1, this);
		}
		return this.nextChild(0, 1, t, n, r);
	}
	nextSignificantParent() {
		let e = this;
		for (; e.type.isAnonymous && e._parent;) e = e._parent;
		return e;
	}
	get parent() {
		return this._parent ? this._parent.nextSignificantParent() : null;
	}
	get nextSibling() {
		return this._parent && this.index >= 0 ? this._parent.nextChild(this.index + 1, 1, 0, 4) : null;
	}
	get prevSibling() {
		return this._parent && this.index >= 0 ? this._parent.nextChild(this.index - 1, -1, 0, 4) : null;
	}
	get tree() {
		return this._tree;
	}
	toTree() {
		return this._tree;
	}
	toString() {
		return this._tree.toString();
	}
};
function Gh(e, t, n, r) {
	let i = e.cursor(), a = [];
	if (!i.firstChild()) return a;
	if (n != null) {
		for (let e = !1; !e;) if (e = i.type.is(n), !i.nextSibling()) return a;
	}
	for (;;) {
		if (r != null && i.type.is(r)) return a;
		if (i.type.is(t) && a.push(i.node), !i.nextSibling()) return r == null ? a : [];
	}
}
function Kh(e, t, n = t.length - 1) {
	for (let r = e; n >= 0; r = r.parent) {
		if (!r) return !1;
		if (!r.type.isAnonymous) {
			if (t[n] && t[n] != r.name) return !1;
			n--;
		}
	}
	return !0;
}
var qh = class {
	constructor(e, t, n, r) {
		this.parent = e, this.buffer = t, this.index = n, this.start = r;
	}
}, Jh = class e extends Uh {
	get name() {
		return this.type.name;
	}
	get from() {
		return this.context.start + this.context.buffer.buffer[this.index + 1];
	}
	get to() {
		return this.context.start + this.context.buffer.buffer[this.index + 2];
	}
	constructor(e, t, n) {
		super(), this.context = e, this._parent = t, this.index = n, this.type = e.buffer.set.types[e.buffer.buffer[n]];
	}
	child(t, n, r) {
		let { buffer: i } = this.context, a = i.findChild(this.index + 4, i.buffer[this.index + 3], t, n - this.context.start, r);
		return a < 0 ? null : new e(this.context, this, a);
	}
	get firstChild() {
		return this.child(1, 0, 4);
	}
	get lastChild() {
		return this.child(-1, 0, 4);
	}
	childAfter(e) {
		return this.child(1, e, 2);
	}
	childBefore(e) {
		return this.child(-1, e, -2);
	}
	prop(e) {
		return this.type.prop(e);
	}
	enter(t, n, r = 0) {
		if (r & K.ExcludeBuffers) return null;
		let { buffer: i } = this.context, a = i.findChild(this.index + 4, i.buffer[this.index + 3], n > 0 ? 1 : -1, t - this.context.start, n);
		return a < 0 ? null : new e(this.context, this, a);
	}
	get parent() {
		return this._parent || this.context.parent.nextSignificantParent();
	}
	externalSibling(e) {
		return this._parent ? null : this.context.parent.nextChild(this.context.index + e, e, 0, 4);
	}
	get nextSibling() {
		let { buffer: t } = this.context, n = t.buffer[this.index + 3];
		return n < (this._parent ? t.buffer[this._parent.index + 3] : t.buffer.length) ? new e(this.context, this._parent, n) : this.externalSibling(1);
	}
	get prevSibling() {
		let { buffer: t } = this.context, n = this._parent ? this._parent.index + 4 : 0;
		return this.index == n ? this.externalSibling(-1) : new e(this.context, this._parent, t.findChild(n, this.index, -1, 0, 4));
	}
	get tree() {
		return null;
	}
	toTree() {
		let e = [], t = [], { buffer: n } = this.context, r = this.index + 4, i = n.buffer[this.index + 3];
		if (i > r) {
			let a = n.buffer[this.index + 1];
			e.push(n.slice(r, i, a)), t.push(0);
		}
		return new q(this.type, e, t, this.to - this.from);
	}
	toString() {
		return this.context.buffer.childString(this.index);
	}
};
function Yh(e) {
	if (!e.length) return null;
	let t = 0, n = e[0];
	for (let r = 1; r < e.length; r++) {
		let i = e[r];
		(i.from > n.from || i.to < n.to) && (n = i, t = r);
	}
	let r = n instanceof Wh && n.index < 0 ? null : n.parent, i = e.slice();
	return r ? i[t] = r : i.splice(t, 1), new Xh(i, n);
}
var Xh = class {
	constructor(e, t) {
		this.heads = e, this.node = t;
	}
	get next() {
		return Yh(this.heads);
	}
};
function Zh(e, t, n) {
	let r = e.resolveInner(t, n), i = null;
	for (let e = r instanceof Wh ? r : r.context.parent; e; e = e.parent) if (e.index < 0) {
		let a = e.parent;
		(i ||= [r]).push(a.resolve(t, n)), e = a;
	} else {
		let a = Nh.get(e.tree);
		if (a && a.overlay && a.overlay[0].from <= t && a.overlay[a.overlay.length - 1].to >= t) {
			let o = new Wh(a.tree, a.overlay[0].from + e.from, -1, e);
			(i ||= [r]).push(Hh(o, t, n, !1));
		}
	}
	return i ? Yh(i) : r;
}
var Qh = class {
	get name() {
		return this.type.name;
	}
	constructor(e, t = 0) {
		if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~K.EnterBracketed, e instanceof Wh) this.yieldNode(e);
		else {
			this._tree = e.context.parent, this.buffer = e.context;
			for (let t = e._parent; t; t = t._parent) this.stack.unshift(t.index);
			this.bufferNode = e, this.yieldBuf(e.index);
		}
	}
	yieldNode(e) {
		return e ? (this._tree = e, this.type = e.type, this.from = e.from, this.to = e.to, !0) : !1;
	}
	yieldBuf(e, t) {
		this.index = e;
		let { start: n, buffer: r } = this.buffer;
		return this.type = t || r.set.types[r.buffer[e]], this.from = n + r.buffer[e + 1], this.to = n + r.buffer[e + 2], !0;
	}
	yield(e) {
		return e ? e instanceof Wh ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
	}
	toString() {
		return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
	}
	enterChild(e, t, n) {
		if (!this.buffer) return this.yield(this._tree.nextChild(e < 0 ? this._tree._tree.children.length - 1 : 0, e, t, n, this.mode));
		let { buffer: r } = this.buffer, i = r.findChild(this.index + 4, r.buffer[this.index + 3], e, t - this.buffer.start, n);
		return i < 0 ? !1 : (this.stack.push(this.index), this.yieldBuf(i));
	}
	firstChild() {
		return this.enterChild(1, 0, 4);
	}
	lastChild() {
		return this.enterChild(-1, 0, 4);
	}
	childAfter(e) {
		return this.enterChild(1, e, 2);
	}
	childBefore(e) {
		return this.enterChild(-1, e, -2);
	}
	enter(e, t, n = this.mode) {
		return this.buffer ? n & K.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, n));
	}
	parent() {
		if (!this.buffer) return this.yieldNode(this.mode & K.IncludeAnonymous ? this._tree._parent : this._tree.parent);
		if (this.stack.length) return this.yieldBuf(this.stack.pop());
		let e = this.mode & K.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
		return this.buffer = null, this.yieldNode(e);
	}
	sibling(e) {
		if (!this.buffer) return this._tree._parent ? this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + e, e, 0, 4, this.mode)) : !1;
		let { buffer: t } = this.buffer, n = this.stack.length - 1;
		if (e < 0) {
			let e = n < 0 ? 0 : this.stack[n] + 4;
			if (this.index != e) return this.yieldBuf(t.findChild(e, this.index, -1, 0, 4));
		} else {
			let e = t.buffer[this.index + 3];
			if (e < (n < 0 ? t.buffer.length : t.buffer[this.stack[n] + 3])) return this.yieldBuf(e);
		}
		return n < 0 && this.yield(this.buffer.parent.nextChild(this.buffer.index + e, e, 0, 4, this.mode));
	}
	nextSibling() {
		return this.sibling(1);
	}
	prevSibling() {
		return this.sibling(-1);
	}
	atLastNode(e) {
		let t, n, { buffer: r } = this;
		if (r) {
			if (e > 0) {
				if (this.index < r.buffer.buffer.length) return !1;
			} else for (let e = 0; e < this.index; e++) if (r.buffer.buffer[e + 3] < this.index) return !1;
			({index: t, parent: n} = r);
		} else ({index: t, _parent: n} = this._tree);
		for (; n; {index: t, _parent: n} = n) if (t > -1) for (let r = t + e, i = e < 0 ? -1 : n._tree.children.length; r != i; r += e) {
			let e = n._tree.children[r];
			if (this.mode & K.IncludeAnonymous || e instanceof Bh || !e.type.isAnonymous || $h(e)) return !1;
		}
		return !0;
	}
	move(e, t) {
		if (t && this.enterChild(e, 0, 4)) return !0;
		for (;;) {
			if (this.sibling(e)) return !0;
			if (this.atLastNode(e) || !this.parent()) return !1;
		}
	}
	next(e = !0) {
		return this.move(1, e);
	}
	prev(e = !0) {
		return this.move(-1, e);
	}
	moveTo(e, t = 0) {
		for (; (this.from == this.to || (t < 1 ? this.from >= e : this.from > e) || (t > -1 ? this.to <= e : this.to < e)) && this.parent(););
		for (; this.enterChild(1, e, t););
		return this;
	}
	get node() {
		if (!this.buffer) return this._tree;
		let e = this.bufferNode, t = null, n = 0;
		if (e && e.context == this.buffer) e: for (let r = this.index, i = this.stack.length; i >= 0;) {
			for (let a = e; a; a = a._parent) if (a.index == r) {
				if (r == this.index) return a;
				t = a, n = i + 1;
				break e;
			}
			r = this.stack[--i];
		}
		for (let e = n; e < this.stack.length; e++) t = new Jh(this.buffer, t, this.stack[e]);
		return this.bufferNode = new Jh(this.buffer, t, this.index);
	}
	get tree() {
		return this.buffer ? null : this._tree._tree;
	}
	iterate(e, t) {
		for (let n = 0;;) {
			let r = !1;
			if (this.type.isAnonymous || e(this) !== !1) {
				if (this.firstChild()) {
					n++;
					continue;
				}
				this.type.isAnonymous || (r = !0);
			}
			for (;;) {
				if (r && t && t(this), r = this.type.isAnonymous, !n) return;
				if (this.nextSibling()) break;
				this.parent(), n--, r = !0;
			}
		}
	}
	matchContext(e) {
		if (!this.buffer) return Kh(this.node.parent, e);
		let { buffer: t } = this.buffer, { types: n } = t.set;
		for (let r = e.length - 1, i = this.stack.length - 1; r >= 0; i--) {
			if (i < 0) return Kh(this._tree, e, r);
			let a = n[t.buffer[this.stack[i]]];
			if (!a.isAnonymous) {
				if (e[r] && e[r] != a.name) return !1;
				r--;
			}
		}
		return !0;
	}
};
function $h(e) {
	return e.children.some((e) => e instanceof Bh || !e.type.isAnonymous || $h(e));
}
function eg(e) {
	let { buffer: t, nodeSet: n, maxBufferLength: r = Ah, reused: i = [], minRepeatType: a = n.types.length } = e, o = Array.isArray(t) ? new zh(t, t.length) : t, s = n.types, c = 0, l = 0;
	function u(e, t, _, v, y, b) {
		let { id: x, start: S, end: C, size: w } = o;
		if (w < 0) {
			if (o.next(), w == -1) {
				let t = i[x];
				_.push(t), v.push(S - e);
				return;
			}
			if (w == -3) {
				c = x;
				return;
			}
			if (w == -4) {
				l = x;
				return;
			}
			throw RangeError(`Unrecognized record size: ${w}`);
		}
		let T = s[x], ee, E, te = S - e;
		if (C - S <= r && (E = h(o.pos - t, y))) {
			let t = new Uint16Array(E.size - E.skip), r = o.pos - E.size, i = t.length;
			for (; o.pos > r;) i = g(E.start, t, i);
			ee = new Bh(t, C - E.start, n), te = E.start - e;
		} else {
			let e = l, t = c, s = o.pos - w;
			o.next();
			let h = [], g = [], _ = x >= a ? x : -1, v = 0, y = C, E = e;
			for (; o.pos > s;) _ >= 0 && o.id == _ && o.size >= 0 ? (o.end <= y - r && (p(h, g, S, v, o.end, y, _, E, c), v = h.length, y = o.end, E = l), o.next()) : b > 2500 ? d(S, s, h, g) : (_ >= 0 && o.size == -1 && i[o.id].type == n.types[_] && (v < h.length && p(h, g, S, v, o.end, y, _, E, c), v = h.length + 1, y = o.start, E = l), u(S, s, h, g, _, b + 1));
			if (_ >= 0 && v > 0 && v < h.length && p(h, g, S, v, S, y, _, E, c), h.reverse(), g.reverse(), _ > -1 && v > 0) {
				let e = f(T);
				ee = rg(T, h, g, 0, h.length, 0, C - S, e, e);
			} else ee = m(T, h, g, C - S, e - C, t);
		}
		_.push(ee), v.push(te);
	}
	function d(e, t, i, a) {
		let s = [], c = 0, l = -1;
		for (; o.pos > t;) {
			let { id: e, start: t, end: n, size: i } = o;
			if (i > 4) o.next();
			else if (l > -1 && t < l) break;
			else l < 0 && (l = n - r), s.push(e, t, n), c++, o.next();
		}
		if (c) {
			let t = new Uint16Array(c * 4), r = s[s.length - 2];
			for (let e = s.length - 3, n = 0; e >= 0; e -= 3) t[n++] = s[e], t[n++] = s[e + 1] - r, t[n++] = s[e + 2] - r, t[n++] = n;
			i.push(new Bh(t, s[2] - r, n)), a.push(r - e);
		}
	}
	function f(e) {
		return (t, n, r) => {
			let i = 0, a = t.length - 1, o, s;
			if (a >= 0 && (o = t[a]) instanceof q) {
				if (!a && o.type == e && o.length == r) return o;
				(s = o.prop(G.lookAhead)) && (i = n[a] + o.length + s - r);
			}
			let c = 0;
			for (let e = 0; e < t.length; e++) if (t[e] instanceof q) {
				c = t[e].prop(G.contextHash) ?? 0;
				break;
			}
			return m(e, t, n, r, i, c);
		};
	}
	function p(e, t, r, i, a, o, s, c, l) {
		let u = [], d = [];
		for (; e.length > i;) u.push(e.pop()), d.push(t.pop() + r - a);
		e.push(m(n.types[s], u, d, o - a, c - o, l)), t.push(a - r);
	}
	function m(e, t, n, r, i, a, o) {
		if (a) {
			let e = [G.contextHash, a];
			o = o ? [e].concat(o) : [e];
		}
		if (i > 25) {
			let e = [G.lookAhead, i];
			o = o ? [e].concat(o) : [e];
		}
		return new q(e, t, n, r, o);
	}
	function h(e, t) {
		let n = o.fork(), i = 0, s = 0, c = 0, l = n.end - r, u = {
			size: 0,
			start: 0,
			skip: 0
		};
		e: for (let r = n.pos - e; n.pos > r;) {
			let e = n.size;
			if (n.id == t && e >= 0) {
				u.size = i, u.start = s, u.skip = c, c += 4, i += 4, n.next();
				continue;
			}
			let o = n.pos - e;
			if (e < 0 || o < r || n.start < l) break;
			let d = n.id >= a ? 4 : 0, f = n.start;
			for (n.next(); n.pos > o;) {
				if (n.size < 0) {
					if (n.size == -3 || n.size == -4) d += 4;
					else break e;
				} else n.id >= a && (d += 4);
				n.next();
			}
			s = f, i += e, c += d;
		}
		return (t < 0 || i == e) && (u.size = i, u.start = s, u.skip = c), u.size > 4 ? u : void 0;
	}
	function g(e, t, n) {
		let { id: r, start: i, end: s, size: u } = o;
		if (o.next(), u >= 0 && r < a) {
			let a = n;
			if (u > 4) {
				let r = o.pos - (u - 4);
				for (; o.pos > r;) n = g(e, t, n);
			}
			t[--n] = a, t[--n] = s - e, t[--n] = i - e, t[--n] = r;
		} else u == -3 ? c = r : u == -4 && (l = r);
		return n;
	}
	let _ = [], v = [];
	for (; o.pos > 0;) u(e.start || 0, e.bufferStart || 0, _, v, -1, 0);
	let y = e.length ?? (_.length ? v[0] + _[0].length : 0);
	return new q(s[e.topID], _.reverse(), v.reverse(), y);
}
var tg = /* @__PURE__ */ new WeakMap();
function ng(e, t) {
	if (!e.isAnonymous || t instanceof Bh || t.type != e) return 1;
	let n = tg.get(t);
	if (n == null) {
		n = 1;
		for (let r of t.children) {
			if (r.type != e || !(r instanceof q)) {
				n = 1;
				break;
			}
			n += ng(e, r);
		}
		tg.set(t, n);
	}
	return n;
}
function rg(e, t, n, r, i, a, o, s, c) {
	let l = 0;
	for (let n = r; n < i; n++) l += ng(e, t[n]);
	let u = Math.ceil(l * 1.5 / 8), d = [], f = [];
	function p(t, n, r, i, o) {
		for (let s = r; s < i;) {
			let r = s, l = n[s], m = ng(e, t[s]);
			for (s++; s < i; s++) {
				let n = ng(e, t[s]);
				if (m + n >= u) break;
				m += n;
			}
			if (s == r + 1) {
				if (m > u) {
					let e = t[r];
					p(e.children, e.positions, 0, e.children.length, n[r] + o);
					continue;
				}
				d.push(t[r]);
			} else {
				let i = n[s - 1] + t[s - 1].length - l;
				d.push(rg(e, t, n, r, s, l, i, null, c));
			}
			f.push(l + o - a);
		}
	}
	return p(t, n, r, i, 0), (s || c)(d, f, o);
}
var ig = class {
	constructor() {
		this.map = /* @__PURE__ */ new WeakMap();
	}
	setBuffer(e, t, n) {
		let r = this.map.get(e);
		r || this.map.set(e, r = /* @__PURE__ */ new Map()), r.set(t, n);
	}
	getBuffer(e, t) {
		let n = this.map.get(e);
		return n && n.get(t);
	}
	set(e, t) {
		e instanceof Jh ? this.setBuffer(e.context.buffer, e.index, t) : e instanceof Wh && this.map.set(e.tree, t);
	}
	get(e) {
		return e instanceof Jh ? this.getBuffer(e.context.buffer, e.index) : e instanceof Wh ? this.map.get(e.tree) : void 0;
	}
	cursorSet(e, t) {
		e.buffer ? this.setBuffer(e.buffer.buffer, e.index, t) : this.map.set(e.tree, t);
	}
	cursorGet(e) {
		return e.buffer ? this.getBuffer(e.buffer.buffer, e.index) : this.map.get(e.tree);
	}
}, ag = class e {
	constructor(e, t, n, r, i = !1, a = !1) {
		this.from = e, this.to = t, this.tree = n, this.offset = r, this.open = !!i | (a ? 2 : 0);
	}
	get openStart() {
		return (this.open & 1) > 0;
	}
	get openEnd() {
		return (this.open & 2) > 0;
	}
	static addTree(t, n = [], r = !1) {
		let i = [new e(0, t.length, t, 0, !1, r)];
		for (let e of n) e.to > t.length && i.push(e);
		return i;
	}
	static applyChanges(t, n, r = 128) {
		if (!n.length) return t;
		let i = [], a = 1, o = t.length ? t[0] : null;
		for (let s = 0, c = 0, l = 0;; s++) {
			let u = s < n.length ? n[s] : null, d = u ? u.fromA : 1e9;
			if (d - c >= r) for (; o && o.from < d;) {
				let n = o;
				if (c >= n.from || d <= n.to || l) {
					let t = Math.max(n.from, c) - l, r = Math.min(n.to, d) - l;
					n = t >= r ? null : new e(t, r, n.tree, n.offset + l, n.openStart || s > 0, n.openEnd || !!u);
				}
				if (n && i.push(n), o.to > d) break;
				o = a < t.length ? t[a++] : null;
			}
			if (!u) break;
			c = u.toA, l = u.toA - u.toB;
		}
		return i;
	}
}, og = class {
	startParse(e, t, n) {
		return typeof e == "string" && (e = new sg(e)), n = n ? n.length ? n.map((e) => new Mh(e.from, e.to)) : [new Mh(0, 0)] : [new Mh(0, e.length)], this.createParse(e, t || [], n);
	}
	parse(e, t, n) {
		let r = this.startParse(e, t, n);
		for (;;) {
			let e = r.advance();
			if (e) return e;
		}
	}
}, sg = class {
	constructor(e) {
		this.string = e;
	}
	get length() {
		return this.string.length;
	}
	chunk(e) {
		return this.string.slice(e);
	}
	get lineChunks() {
		return !1;
	}
	read(e, t) {
		return this.string.slice(e, t);
	}
};
function cg(e) {
	return (t, n, r, i) => new mg(t, e, n, r, i);
}
var lg = class {
	constructor(e, t, n, r, i, a) {
		this.parser = e, this.parse = t, this.overlay = n, this.bracketed = r, this.target = i, this.from = a;
	}
};
function ug(e) {
	if (!e.length || e.some((e) => e.from >= e.to)) throw RangeError("Invalid inner parse ranges given: " + JSON.stringify(e));
}
var dg = class {
	constructor(e, t, n, r, i, a, o, s) {
		this.parser = e, this.predicate = t, this.mounts = n, this.index = r, this.start = i, this.bracketed = a, this.target = o, this.prev = s, this.depth = 0, this.ranges = [];
	}
}, fg = new G({ perNode: !0 }), pg = class {
	constructor(e, t) {
		this.cursor = t, this.overlay = null, this.covered = null, this.fragmentCursor = new bg(e);
	}
}, mg = class {
	constructor(e, t, n, r, i) {
		this.nest = t, this.input = n, this.fragments = r, this.ranges = i, this.inner = [], this.innerDone = 0, this.baseTree = null, this.scan = null, this.stoppedAt = null, this.baseParse = e;
	}
	advance() {
		if (this.baseParse) {
			let e = this.baseParse.advance();
			if (!e) return null;
			this.baseParse = null, this.baseTree = e, this.scan = new pg(this.fragments, new Qh(new Wh(e, this.ranges[0].from, 0, null), K.IncludeAnonymous | K.IgnoreMounts));
		}
		if (this.scan) {
			if (!this.scanInner()) return null;
			if (this.scan = null, this.stoppedAt != null) for (let e of this.inner) e.parse.stopAt(this.stoppedAt);
		}
		if (this.innerDone == this.inner.length) {
			let e = this.baseTree;
			return this.stoppedAt != null && (e = new q(e.type, e.children, e.positions, e.length, e.propValues.concat([[fg, this.stoppedAt]]))), e;
		}
		let e = this.inner[this.innerDone], t = e.parse.advance();
		if (t) {
			this.innerDone++;
			let n = Object.assign(Object.create(null), e.target.props);
			n[G.mounted.id] = new Nh(t, e.overlay, e.parser, e.bracketed), e.target.props = n;
		}
		return null;
	}
	get parsedPos() {
		if (this.baseParse) return 0;
		let e = this.input.length;
		if (this.scan) {
			e = this.scan.cursor.from;
			for (let t = this.scan.overlay; t; t = t.prev) e = Math.min(e, t.start);
		}
		for (let t = this.innerDone; t < this.inner.length; t++) this.inner[t].from < e && (e = Math.min(e, this.inner[t].parse.parsedPos));
		return e;
	}
	stopAt(e) {
		if (this.stoppedAt = e, this.baseParse) this.baseParse.stopAt(e);
		else for (let t = this.innerDone; t < this.inner.length; t++) this.inner[t].parse.stopAt(e);
	}
	scanInner() {
		let e = this.scan, { fragmentCursor: t, cursor: n } = e, { overlay: r, covered: i } = e, a = 0;
		e: for (let o, s;;) {
			if (a >= 2e3) return e.overlay = r, e.covered = i, !1;
			a++;
			let c = !0, l;
			if (this.stoppedAt != null && n.from >= this.stoppedAt) c = !1;
			else if (t.hasNode(n)) {
				if (r) {
					let e = r.mounts.find((e) => e.frag.from <= n.from && e.frag.to >= n.to && e.mount.overlay);
					if (e) for (let t of e.mount.overlay) {
						let i = t.from + e.pos, a = t.to + e.pos;
						i >= n.from && a <= n.to && !r.ranges.some((e) => e.from < a && e.to > i) && r.ranges.push({
							from: i,
							to: a
						});
					}
				}
				c = !1;
			} else if (i && (s = hg(i.ranges, n.from, n.to))) c = s != 2;
			else if (!n.type.isAnonymous && (o = this.nest(n, this.input)) && (n.from < n.to || !o.overlay)) {
				n.tree || (_g(n), r && r.depth++, i && i.depth++);
				let e = t.findMounts(n.from, o.parser);
				if (typeof o.overlay == "function") r = new dg(o.parser, o.overlay, e, this.inner.length, n.from, !!o.bracketed, n.tree, r);
				else {
					let t = xg(this.ranges, o.overlay || (n.from < n.to ? [new Mh(n.from, n.to)] : []));
					t.length && (ug(t), a += 20), (t.length || !o.overlay) && this.inner.push(new lg(o.parser, t.length ? o.parser.startParse(this.input, Cg(e, t), t) : o.parser.startParse(""), o.overlay ? o.overlay.map((e) => new Mh(e.from - n.from, e.to - n.from)) : null, !!o.bracketed, n.tree, t.length ? t[0].from : n.from)), o.overlay ? t.length && (i = {
						ranges: t,
						depth: 0,
						prev: i
					}) : c = !1;
				}
			} else if (r && (l = r.predicate(n)) && (l === !0 && (l = new Mh(n.from, n.to)), l.from < l.to)) {
				let e = r.ranges.length - 1;
				e >= 0 && r.ranges[e].to == l.from ? r.ranges[e] = {
					from: r.ranges[e].from,
					to: l.to
				} : r.ranges.push(l);
			}
			if (c && n.firstChild()) r && r.depth++, i && i.depth++;
			else for (; !n.nextSibling();) {
				if (!n.parent()) break e;
				if (r && !--r.depth) {
					let e = xg(this.ranges, r.ranges);
					e.length && (ug(e), a += 20, this.inner.splice(r.index, 0, new lg(r.parser, r.parser.startParse(this.input, Cg(r.mounts, e), e), r.ranges.map((e) => new Mh(e.from - r.start, e.to - r.start)), r.bracketed, r.target, e[0].from))), r = r.prev;
				}
				i && !--i.depth && (i = i.prev);
			}
		}
		return !0;
	}
};
function hg(e, t, n) {
	for (let r of e) {
		if (r.from >= n) break;
		if (r.to > t) return r.from <= t && r.to >= n ? 2 : 1;
	}
	return 0;
}
function gg(e, t, n, r, i, a) {
	if (t < n) {
		let o = e.buffer[t + 1];
		r.push(e.slice(t, n, o)), i.push(o - a);
	}
}
function _g(e) {
	let { node: t } = e, n = [], r = t.context.buffer;
	do
		n.push(e.index), e.parent();
	while (!e.tree);
	let i = e.tree, a = i.children.indexOf(r), o = i.children[a], s = o.buffer, c = [a];
	function l(e, r, i, a, u, d) {
		let f = n[d], p = [], m = [];
		gg(o, e, f, p, m, a);
		let h = s[f + 1], g = s[f + 2];
		c.push(p.length);
		let _ = d ? l(f + 4, s[f + 3], o.set.types[s[f]], h, g - h, d - 1) : t.toTree();
		return p.push(_), m.push(h - a), gg(o, s[f + 3], r, p, m, a), new q(i, p, m, u);
	}
	i.children[a] = l(0, s.length, Fh.none, 0, o.length, n.length - 1);
	for (let t of c) {
		let n = e.tree.children[t], r = e.tree.positions[t];
		e.yield(new Wh(n, r + e.from, t, e._tree));
	}
}
var vg = class {
	constructor(e, t) {
		this.offset = t, this.done = !1, this.cursor = e.cursor(K.IncludeAnonymous | K.IgnoreMounts | K.ExcludeBuffers);
	}
	moveTo(e) {
		let { cursor: t } = this, n = e - this.offset;
		for (; !this.done && t.from < n;) if (!(t.to >= n && t.enter(n, 1, K.IncludeAnonymous | K.IgnoreMounts | K.IgnoreOverlays | K.ExcludeBuffers))) {
			if (t.to <= n) t.next(!1) || (this.done = !0);
			else break;
		}
	}
	hasNode(e) {
		if (this.moveTo(e.from), !this.done && this.cursor.from + this.offset == e.from && this.cursor.tree) for (let t = this.cursor.tree;;) {
			if (t == e.tree) return !0;
			if (t.children.length && t.positions[0] == 0 && t.children[0] instanceof q) t = t.children[0];
			else break;
		}
		return !1;
	}
};
function yg(e) {
	let t = e.tree.prop(fg);
	return t == null ? e.to : Math.min(e.to, t - e.offset);
}
var bg = class {
	constructor(e) {
		if (this.fragments = e, this.curTo = 0, this.fragI = 0, e.length) {
			let t = this.curFrag = e[0];
			this.curTo = yg(t), this.inner = new vg(t.tree, -t.offset);
		} else this.curFrag = this.inner = null;
	}
	hasNode(e) {
		for (; this.curFrag && e.from >= this.curTo;) this.nextFrag();
		return this.curFrag && this.curFrag.from <= e.from && this.curTo >= e.to && this.inner.hasNode(e);
	}
	nextFrag() {
		if (this.fragI++, this.fragI == this.fragments.length) this.curFrag = this.inner = null;
		else {
			let e = this.curFrag = this.fragments[this.fragI];
			this.curTo = yg(e), this.inner = new vg(e.tree, -e.offset);
		}
	}
	findMounts(e, t) {
		let n = [];
		if (this.inner) {
			this.inner.cursor.moveTo(e, 1);
			for (let e = this.inner.cursor.node; e; e = e.parent) {
				let r = e.tree?.prop(G.mounted);
				if (r && r.parser == t) for (let t = this.fragI; t < this.fragments.length; t++) {
					let i = this.fragments[t];
					if (i.from >= e.to) break;
					i.tree == this.curFrag.tree && n.push({
						frag: i,
						pos: e.from - i.offset,
						mount: r
					});
				}
			}
		}
		return n;
	}
};
function xg(e, t) {
	let n = null, r = t;
	for (let i = 1, a = 0; i < e.length; i++) {
		let o = e[i - 1].to, s = e[i].from;
		for (; a < r.length; a++) {
			let e = r[a];
			if (e.from >= s) break;
			e.to <= o || (n || (r = n = t.slice()), e.from < o ? (n[a] = new Mh(e.from, o), e.to > s && n.splice(a + 1, 0, new Mh(s, e.to))) : e.to > s ? n[a--] = new Mh(s, e.to) : n.splice(a--, 1));
		}
	}
	return r;
}
function Sg(e, t, n, r) {
	let i = 0, a = 0, o = !1, s = !1, c = -1e9, l = [];
	for (;;) {
		let u = i == e.length ? 1e9 : o ? e[i].to : e[i].from, d = a == t.length ? 1e9 : s ? t[a].to : t[a].from;
		if (o != s) {
			let e = Math.max(c, n), t = Math.min(u, d, r);
			e < t && l.push(new Mh(e, t));
		}
		if (c = Math.min(u, d), c == 1e9) break;
		u == c && (o ? (o = !1, i++) : o = !0), d == c && (s ? (s = !1, a++) : s = !0);
	}
	return l;
}
function Cg(e, t) {
	let n = [];
	for (let { pos: r, mount: i, frag: a } of e) {
		let e = r + (i.overlay ? i.overlay[0].from : 0), o = e + i.tree.length, s = Math.max(a.from, e), c = Math.min(a.to, o);
		if (i.overlay) {
			let o = Sg(t, i.overlay.map((e) => new Mh(e.from + r, e.to + r)), s, c);
			for (let t = 0, r = s;; t++) {
				let s = t == o.length, l = s ? c : o[t].from;
				if (l > r && n.push(new ag(r, l, i.tree, -e, a.from >= r || a.openStart, a.to <= l || a.openEnd)), s) break;
				r = o[t].to;
			}
		} else n.push(new ag(s, c, i.tree, -e, a.from >= e || a.openStart, a.to <= o || a.openEnd));
	}
	return n;
}
// node_modules/@lezer/highlight/dist/index.js
var wg = 0, Tg = class e {
	constructor(e, t, n, r) {
		this.name = e, this.set = t, this.base = n, this.modified = r, this.id = wg++;
	}
	toString() {
		let { name: e } = this;
		for (let t of this.modified) t.name && (e = `${t.name}(${e})`);
		return e;
	}
	static define(t, n) {
		let r = typeof t == "string" ? t : "?";
		if (t instanceof e && (n = t), n?.base) throw Error("Can not derive from a modified tag");
		let i = new e(r, [], null, []);
		if (i.set.push(i), n) for (let e of n.set) i.set.push(e);
		return i;
	}
	static defineModifier(e) {
		let t = new Dg(e);
		return (e) => e.modified.indexOf(t) > -1 ? e : Dg.get(e.base || e, e.modified.concat(t).sort((e, t) => e.id - t.id));
	}
}, Eg = 0, Dg = class e {
	constructor(e) {
		this.name = e, this.instances = [], this.id = Eg++;
	}
	static get(t, n) {
		if (!n.length) return t;
		let r = n[0].instances.find((e) => e.base == t && Og(n, e.modified));
		if (r) return r;
		let i = [], a = new Tg(t.name, i, t, n);
		for (let e of n) e.instances.push(a);
		let o = kg(n);
		for (let n of t.set) if (!n.modified.length) for (let t of o) i.push(e.get(n, t));
		return a;
	}
};
function Og(e, t) {
	return e.length == t.length && e.every((e, n) => e == t[n]);
}
function kg(e) {
	let t = [[]];
	for (let n = 0; n < e.length; n++) for (let r = 0, i = t.length; r < i; r++) t.push(t[r].concat(e[n]));
	return t.sort((e, t) => t.length - e.length);
}
function Ag(e) {
	let t = Object.create(null);
	for (let n in e) {
		let r = e[n];
		Array.isArray(r) || (r = [r]);
		for (let e of n.split(" ")) if (e) {
			let n = [], i = 2, a = e;
			for (let t = 0;;) {
				if (a == "..." && t > 0 && t + 3 == e.length) {
					i = 1;
					break;
				}
				let r = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(a);
				if (!r) throw RangeError("Invalid path: " + e);
				if (n.push(r[0] == "*" ? "" : r[0][0] == "\"" ? JSON.parse(r[0]) : r[0]), t += r[0].length, t == e.length) break;
				let o = e[t++];
				if (t == e.length && o == "!") {
					i = 0;
					break;
				}
				if (o != "/") throw RangeError("Invalid path: " + e);
				a = e.slice(t);
			}
			let o = n.length - 1, s = n[o];
			if (!s) throw RangeError("Invalid path: " + e);
			t[s] = new Mg(r, i, o > 0 ? n.slice(0, o) : null).sort(t[s]);
		}
	}
	return jg.add(t);
}
var jg = new G({ combine(e, t) {
	let n, r, i;
	for (; e || t;) {
		if (!e || t && e.depth <= t.depth ? (i = t, t = t.next) : (i = e, e = e.next), n && n.mode == i.mode && !i.context && !n.context) continue;
		let a = new Mg(i.tags, i.mode, i.context);
		n ? n.next = a : r = a, n = a;
	}
	return r;
} }), Mg = class {
	constructor(e, t, n, r) {
		this.tags = e, this.mode = t, this.context = n, this.next = r;
	}
	get opaque() {
		return this.mode == 0;
	}
	get inherit() {
		return this.mode == 1;
	}
	sort(e) {
		return !e || e.depth < this.depth ? (this.next = e, this) : (e.next = this.sort(e.next), e);
	}
	get depth() {
		return this.context ? this.context.length : 0;
	}
};
Mg.empty = new Mg([], 2, null);
function Ng(e, t) {
	let n = Object.create(null);
	for (let t of e) if (!Array.isArray(t.tag)) n[t.tag.id] = t.class;
	else for (let e of t.tag) n[e.id] = t.class;
	let { scope: r, all: i = null } = t || {};
	return {
		style: (e) => {
			let t = i;
			for (let r of e) for (let e of r.set) {
				let r = n[e.id];
				if (r) {
					t = t ? t + " " + r : r;
					break;
				}
			}
			return t;
		},
		scope: r
	};
}
function Pg(e, t) {
	let n = null;
	for (let r of e) {
		let e = r.style(t);
		e && (n = n ? n + " " + e : e);
	}
	return n;
}
function Fg(e, t, n, r = 0, i = e.length) {
	let a = new Ig(r, Array.isArray(t) ? t : [t], n);
	a.highlightRange(e.cursor(), r, i, "", a.highlighters), a.flush(i);
}
var Ig = class {
	constructor(e, t, n) {
		this.at = e, this.highlighters = t, this.span = n, this.class = "";
	}
	startSpan(e, t) {
		t != this.class && (this.flush(e), e > this.at && (this.at = e), this.class = t);
	}
	flush(e) {
		e > this.at && this.class && this.span(this.at, e, this.class);
	}
	highlightRange(e, t, n, r, i) {
		let { type: a, from: o, to: s } = e;
		if (o >= n || s <= t) return;
		a.isTop && (i = this.highlighters.filter((e) => !e.scope || e.scope(a)));
		let c = r, l = Lg(e) || Mg.empty, u = Pg(i, l.tags);
		if (u && (c && (c += " "), c += u, l.mode == 1 && (r += (r ? " " : "") + u)), this.startSpan(Math.max(t, o), c), l.opaque) return;
		let d = e.tree && e.tree.prop(G.mounted);
		if (d && d.overlay) {
			let a = e.node.enter(d.overlay[0].from + o, 1), l = this.highlighters.filter((e) => !e.scope || e.scope(d.tree.type)), u = e.firstChild();
			for (let f = 0, p = o;; f++) {
				let m = f < d.overlay.length ? d.overlay[f] : null, h = m ? m.from + o : s, g = Math.max(t, p), _ = Math.min(n, h);
				if (g < _ && u) for (; e.from < _ && (this.highlightRange(e, g, _, r, i), this.startSpan(Math.min(_, e.to), c), !(e.to >= h || !e.nextSibling())););
				if (!m || h > n) break;
				p = m.to + o, p > t && (this.highlightRange(a.cursor(), Math.max(t, m.from + o), Math.min(n, p), "", l), this.startSpan(Math.min(n, p), c));
			}
			u && e.parent();
		} else if (e.firstChild()) {
			d && (r = "");
			do
				if (!(e.to <= t)) {
					if (e.from >= n) break;
					this.highlightRange(e, t, n, r, i), this.startSpan(Math.min(n, e.to), c);
				}
			while (e.nextSibling());
			e.parent();
		}
	}
};
function Lg(e) {
	let t = e.type.prop(jg);
	for (; t && t.context && !e.matchContext(t.context);) t = t.next;
	return t || null;
}
var J = Tg.define, Rg = J(), zg = J(), Bg = J(zg), Vg = J(zg), Hg = J(), Ug = J(Hg), Wg = J(Hg), Gg = J(), Kg = J(Gg), qg = J(), Jg = J(), Yg = J(), Xg = J(Yg), Zg = J(), Y = {
	comment: Rg,
	lineComment: J(Rg),
	blockComment: J(Rg),
	docComment: J(Rg),
	name: zg,
	variableName: J(zg),
	typeName: Bg,
	tagName: J(Bg),
	propertyName: Vg,
	attributeName: J(Vg),
	className: J(zg),
	labelName: J(zg),
	namespace: J(zg),
	macroName: J(zg),
	literal: Hg,
	string: Ug,
	docString: J(Ug),
	character: J(Ug),
	attributeValue: J(Ug),
	number: Wg,
	integer: J(Wg),
	float: J(Wg),
	bool: J(Hg),
	regexp: J(Hg),
	escape: J(Hg),
	color: J(Hg),
	url: J(Hg),
	keyword: qg,
	self: J(qg),
	null: J(qg),
	atom: J(qg),
	unit: J(qg),
	modifier: J(qg),
	operatorKeyword: J(qg),
	controlKeyword: J(qg),
	definitionKeyword: J(qg),
	moduleKeyword: J(qg),
	operator: Jg,
	derefOperator: J(Jg),
	arithmeticOperator: J(Jg),
	logicOperator: J(Jg),
	bitwiseOperator: J(Jg),
	compareOperator: J(Jg),
	updateOperator: J(Jg),
	definitionOperator: J(Jg),
	typeOperator: J(Jg),
	controlOperator: J(Jg),
	punctuation: Yg,
	separator: J(Yg),
	bracket: Xg,
	angleBracket: J(Xg),
	squareBracket: J(Xg),
	paren: J(Xg),
	brace: J(Xg),
	content: Gg,
	heading: Kg,
	heading1: J(Kg),
	heading2: J(Kg),
	heading3: J(Kg),
	heading4: J(Kg),
	heading5: J(Kg),
	heading6: J(Kg),
	contentSeparator: J(Gg),
	list: J(Gg),
	quote: J(Gg),
	emphasis: J(Gg),
	strong: J(Gg),
	link: J(Gg),
	monospace: J(Gg),
	strikethrough: J(Gg),
	inserted: J(),
	deleted: J(),
	changed: J(),
	invalid: J(),
	meta: Zg,
	documentMeta: J(Zg),
	annotation: J(Zg),
	processingInstruction: J(Zg),
	definition: Tg.defineModifier("definition"),
	constant: Tg.defineModifier("constant"),
	function: Tg.defineModifier("function"),
	standard: Tg.defineModifier("standard"),
	local: Tg.defineModifier("local"),
	special: Tg.defineModifier("special")
};
for (let e in Y) {
	let t = Y[e];
	t instanceof Tg && (t.name = e);
}
Ng([
	{
		tag: Y.link,
		class: "tok-link"
	},
	{
		tag: Y.heading,
		class: "tok-heading"
	},
	{
		tag: Y.emphasis,
		class: "tok-emphasis"
	},
	{
		tag: Y.strong,
		class: "tok-strong"
	},
	{
		tag: Y.keyword,
		class: "tok-keyword"
	},
	{
		tag: Y.atom,
		class: "tok-atom"
	},
	{
		tag: Y.bool,
		class: "tok-bool"
	},
	{
		tag: Y.url,
		class: "tok-url"
	},
	{
		tag: Y.labelName,
		class: "tok-labelName"
	},
	{
		tag: Y.inserted,
		class: "tok-inserted"
	},
	{
		tag: Y.deleted,
		class: "tok-deleted"
	},
	{
		tag: Y.literal,
		class: "tok-literal"
	},
	{
		tag: Y.string,
		class: "tok-string"
	},
	{
		tag: Y.number,
		class: "tok-number"
	},
	{
		tag: [
			Y.regexp,
			Y.escape,
			Y.special(Y.string)
		],
		class: "tok-string2"
	},
	{
		tag: Y.variableName,
		class: "tok-variableName"
	},
	{
		tag: Y.local(Y.variableName),
		class: "tok-variableName tok-local"
	},
	{
		tag: Y.definition(Y.variableName),
		class: "tok-variableName tok-definition"
	},
	{
		tag: Y.special(Y.variableName),
		class: "tok-variableName2"
	},
	{
		tag: Y.definition(Y.propertyName),
		class: "tok-propertyName tok-definition"
	},
	{
		tag: Y.typeName,
		class: "tok-typeName"
	},
	{
		tag: Y.namespace,
		class: "tok-namespace"
	},
	{
		tag: Y.className,
		class: "tok-className"
	},
	{
		tag: Y.macroName,
		class: "tok-macroName"
	},
	{
		tag: Y.propertyName,
		class: "tok-propertyName"
	},
	{
		tag: Y.operator,
		class: "tok-operator"
	},
	{
		tag: Y.comment,
		class: "tok-comment"
	},
	{
		tag: Y.meta,
		class: "tok-meta"
	},
	{
		tag: Y.invalid,
		class: "tok-invalid"
	},
	{
		tag: Y.punctuation,
		class: "tok-punctuation"
	}
]);
// node_modules/@codemirror/streamparser/dist/index.js
function Qg(e, t, n, r = 0, i = 0) {
	t ?? (t = e.search(/[^\s\u00a0]/), t == -1 && (t = e.length));
	let a = i;
	for (let i = r; i < t; i++) e.charCodeAt(i) == 9 ? a += n - a % n : a++;
	return a;
}
var $g = class {
	constructor(e, t, n, r) {
		this.string = e, this.tabSize = t, this.indentUnit = n, this.overrideIndent = r, this.pos = 0, this.start = 0, this.lastColumnPos = 0, this.lastColumnValue = 0;
	}
	eol() {
		return this.pos >= this.string.length;
	}
	sol() {
		return this.pos == 0;
	}
	peek() {
		return this.string.charAt(this.pos) || void 0;
	}
	next() {
		if (this.pos < this.string.length) return this.string.charAt(this.pos++);
	}
	eat(e) {
		let t = this.string.charAt(this.pos), n;
		if (n = typeof e == "string" ? t == e : t && (e instanceof RegExp ? e.test(t) : e(t)), n) return ++this.pos, t;
	}
	eatWhile(e) {
		let t = this.pos;
		for (; this.eat(e););
		return this.pos > t;
	}
	eatSpace() {
		let e = this.pos;
		for (; /[\s\u00a0]/.test(this.string.charAt(this.pos));) ++this.pos;
		return this.pos > e;
	}
	skipToEnd() {
		this.pos = this.string.length;
	}
	skipTo(e) {
		let t = this.string.indexOf(e, this.pos);
		if (t > -1) return this.pos = t, !0;
	}
	backUp(e) {
		this.pos -= e;
	}
	column() {
		return this.lastColumnPos < this.start && (this.lastColumnValue = Qg(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue;
	}
	indentation() {
		return this.overrideIndent ?? Qg(this.string, null, this.tabSize);
	}
	match(e, t, n) {
		if (typeof e == "string") {
			let r = (e) => n ? e.toLowerCase() : e;
			return r(this.string.substr(this.pos, e.length)) == r(e) ? (t !== !1 && (this.pos += e.length), !0) : null;
		}
		{
			let n = this.string.slice(this.pos).match(e);
			return n && n.index > 0 ? null : (n && t !== !1 && (this.pos += n[0].length), n);
		}
	}
	current() {
		return this.string.slice(this.start, this.pos);
	}
}, e_ = /*@__PURE__*/ new G();
function t_(e) {
	return B.define({ combine: e ? (t) => t.concat(e) : void 0 });
}
var n_ = /*@__PURE__*/ new G(), r_ = class {
	constructor(e, t, n = [], r = "") {
		this.data = e, this.name = r, Uc.prototype.hasOwnProperty("tree") || Object.defineProperty(Uc.prototype, "tree", { get() {
			return o_(this);
		} }), this.parser = t, this.extension = [h_.of(this), Uc.languageData.of((e, t, n) => {
			let r = i_(e, t, n), i = r.type.prop(e_);
			if (!i) return [];
			let a = e.facet(i), o = r.type.prop(n_);
			if (o) {
				let i = r.resolve(t - r.from, n);
				for (let t of o) if (t.test(i, e)) {
					let n = e.facet(t.facet);
					return t.type == "replace" ? n : n.concat(a);
				}
			}
			return a;
		})].concat(n);
	}
	isActiveAt(e, t, n = -1) {
		return i_(e, t, n).type.prop(e_) == this.data;
	}
	findRegions(e) {
		let t = e.facet(h_);
		if (t?.data == this.data) return [{
			from: 0,
			to: e.doc.length
		}];
		if (!t || !t.allowsNesting) return [];
		let n = [], r = (e, t) => {
			if (e.prop(e_) == this.data) {
				n.push({
					from: t,
					to: t + e.length
				});
				return;
			}
			let i = e.prop(G.mounted);
			if (i) {
				if (i.tree.prop(e_) == this.data) {
					if (i.overlay) for (let e of i.overlay) n.push({
						from: e.from + t,
						to: e.to + t
					});
					else n.push({
						from: t,
						to: t + e.length
					});
					return;
				}
				if (i.overlay) {
					let e = n.length;
					if (r(i.tree, i.overlay[0].from + t), n.length > e) return;
				}
			}
			for (let n = 0; n < e.children.length; n++) {
				let i = e.children[n];
				i instanceof q && r(i, e.positions[n] + t);
			}
		};
		return r(o_(e), 0), n;
	}
	get allowsNesting() {
		return !0;
	}
};
r_.setState = /*@__PURE__*/ Oc.define();
function i_(e, t, n) {
	let r = e.facet(h_), i = o_(e).topNode;
	if (!r || r.allowsNesting) for (let e = i; e; e = e.enter(t, n, K.ExcludeBuffers | K.EnterBracketed)) e.type.isTop && (i = e);
	return i;
}
var a_ = class e extends r_ {
	constructor(e, t, n) {
		super(e, t, [], n), this.parser = t;
	}
	static define(t) {
		let n = t_(t.languageData);
		return new e(n, t.parser.configure({ props: [e_.add((e) => e.isTop ? n : void 0)] }), t.name);
	}
	configure(t, n) {
		return new e(this.data, this.parser.configure(t), n || this.name);
	}
	get allowsNesting() {
		return this.parser.hasWrappers();
	}
};
function o_(e) {
	let t = e.field(r_.state, !1);
	return t ? t.tree : q.empty;
}
var s_ = class {
	constructor(e) {
		this.doc = e, this.cursorPos = 0, this.string = "", this.cursor = e.iter();
	}
	get length() {
		return this.doc.length;
	}
	syncTo(e) {
		return this.string = this.cursor.next(e - this.cursorPos).value, this.cursorPos = e + this.string.length, this.cursorPos - this.string.length;
	}
	chunk(e) {
		return this.syncTo(e), this.string;
	}
	get lineChunks() {
		return !0;
	}
	read(e, t) {
		let n = this.cursorPos - this.string.length;
		return e < n || t >= this.cursorPos ? this.doc.sliceString(e, t) : this.string.slice(e - n, t - n);
	}
}, c_ = null, l_ = class e {
	constructor(e, t, n = [], r, i, a, o, s) {
		this.parser = e, this.state = t, this.fragments = n, this.tree = r, this.treeLen = i, this.viewport = a, this.skipped = o, this.scheduleOn = s, this.parse = null, this.tempSkipped = [];
	}
	static create(t, n, r) {
		return new e(t, n, [], q.empty, 0, r, [], null);
	}
	startParse() {
		return this.parser.startParse(new s_(this.state.doc), this.fragments);
	}
	work(e, t) {
		return t != null && t >= this.state.doc.length && (t = void 0), this.tree != q.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
			if (typeof e == "number") {
				let t = Date.now() + e;
				e = () => Date.now() > t;
			}
			for (this.parse ||= this.startParse(), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t);;) {
				let n = this.parse.advance();
				if (n) {
					if (this.fragments = this.withoutTempSkipped(ag.addTree(n, this.fragments, this.parse.stoppedAt != null)), this.treeLen = this.parse.stoppedAt ?? this.state.doc.length, this.tree = n, this.parse = null, this.treeLen < (t ?? this.state.doc.length)) this.parse = this.startParse();
					else return !0;
				}
				if (e()) return !1;
			}
		});
	}
	takeTree() {
		let e, t;
		this.parse && (e = this.parse.parsedPos) >= this.treeLen && ((this.parse.stoppedAt == null || this.parse.stoppedAt > e) && this.parse.stopAt(e), this.withContext(() => {
			for (; !(t = this.parse.advance()););
		}), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(ag.addTree(this.tree, this.fragments, !0)), this.parse = null);
	}
	withContext(e) {
		let t = c_;
		c_ = this;
		try {
			return e();
		} finally {
			c_ = t;
		}
	}
	withoutTempSkipped(e) {
		for (let t; t = this.tempSkipped.pop();) e = u_(e, t.from, t.to);
		return e;
	}
	changes(t, n) {
		let { fragments: r, tree: i, treeLen: a, viewport: o, skipped: s } = this;
		if (this.takeTree(), !t.empty) {
			let e = [];
			if (t.iterChangedRanges((t, n, r, i) => e.push({
				fromA: t,
				toA: n,
				fromB: r,
				toB: i
			})), r = ag.applyChanges(r, e), i = q.empty, a = 0, o = {
				from: t.mapPos(o.from, -1),
				to: t.mapPos(o.to, 1)
			}, this.skipped.length) {
				s = [];
				for (let e of this.skipped) {
					let n = t.mapPos(e.from, 1), r = t.mapPos(e.to, -1);
					n < r && s.push({
						from: n,
						to: r
					});
				}
			}
		}
		return new e(this.parser, n, r, i, a, o, s, this.scheduleOn);
	}
	updateViewport(e) {
		if (this.viewport.from == e.from && this.viewport.to == e.to) return !1;
		this.viewport = e;
		let t = this.skipped.length;
		for (let t = 0; t < this.skipped.length; t++) {
			let { from: n, to: r } = this.skipped[t];
			n < e.to && r > e.from && (this.fragments = u_(this.fragments, n, r), this.skipped.splice(t--, 1));
		}
		return this.skipped.length >= t ? !1 : (this.reset(), !0);
	}
	reset() {
		this.parse &&= (this.takeTree(), null);
	}
	skipUntilInView(e, t) {
		this.skipped.push({
			from: e,
			to: t
		});
	}
	static getSkippingParser(e) {
		return new class extends og {
			createParse(t, n, r) {
				let i = r[0].from, a = r[r.length - 1].to;
				return {
					parsedPos: i,
					advance() {
						let t = c_;
						if (t) {
							for (let e of r) t.tempSkipped.push(e);
							e && (t.scheduleOn = t.scheduleOn ? Promise.all([t.scheduleOn, e]) : e);
						}
						return this.parsedPos = a, new q(Fh.none, [], [], a - i);
					},
					stoppedAt: null,
					stopAt() {}
				};
			}
		}();
	}
	isDone(e) {
		e = Math.min(e, this.state.doc.length);
		let t = this.fragments;
		return this.treeLen >= e && t.length && t[0].from == 0 && t[0].to >= e;
	}
	static get() {
		return c_;
	}
};
function u_(e, t, n) {
	return ag.applyChanges(e, [{
		fromA: t,
		toA: n,
		fromB: t,
		toB: n
	}]);
}
var d_ = class e {
	constructor(e) {
		this.context = e, this.tree = e.tree;
	}
	apply(t) {
		if (!t.docChanged && this.tree == this.context.tree) return this;
		let n = this.context.changes(t.changes, t.state), r = this.context.treeLen == t.startState.doc.length ? void 0 : Math.max(t.changes.mapPos(this.context.treeLen), n.viewport.to);
		return n.work(20, r) || n.takeTree(), new e(n);
	}
	static init(t) {
		let n = Math.min(3e3, t.doc.length), r = l_.create(t.facet(h_).parser, t, {
			from: 0,
			to: n
		});
		return r.work(20, n) || r.takeTree(), new e(r);
	}
};
r_.state = /*@__PURE__*/ sc.define({
	create: d_.init,
	update(e, t) {
		for (let e of t.effects) if (e.is(r_.setState)) return e.value;
		return t.startState.facet(h_) == t.state.facet(h_) ? e.apply(t) : d_.init(t.state);
	}
});
var f_ = (e) => {
	let t = setTimeout(() => e(), 500);
	return () => clearTimeout(t);
};
typeof requestIdleCallback < "u" && (f_ = (e) => {
	let t = -1, n = setTimeout(() => {
		t = requestIdleCallback(e, { timeout: 400 });
	}, 100);
	return () => t < 0 ? clearTimeout(n) : cancelIdleCallback(t);
});
var p_ = typeof navigator < "u" && navigator.scheduling?.isInputPending ? () => navigator.scheduling.isInputPending() : null, m_ = /*@__PURE__*/ vd.fromClass(class {
	constructor(e) {
		this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
	}
	update(e) {
		let t = this.view.state.field(r_.state).context;
		(t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
	}
	scheduleWork() {
		if (this.working) return;
		let { state: e } = this.view, t = e.field(r_.state);
		t.tree == t.context.tree && t.context.isDone(e.doc.length) || (this.working = f_(this.work));
	}
	work(e) {
		this.working = null;
		let t = Date.now();
		if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0) return;
		let { state: n, viewport: { to: r } } = this.view, i = n.field(r_.state);
		if (i.tree == i.context.tree && i.context.isDone(r + 1e5)) return;
		let a = Date.now() + Math.min(this.chunkBudget, 100, e && !p_ ? Math.max(25, e.timeRemaining() - 5) : 1e9), o = i.context.treeLen < r && n.doc.length > r + 1e3, s = i.context.work(() => p_ && p_() || Date.now() > a, r + (o ? 0 : 1e5));
		this.chunkBudget -= Date.now() - t, (s || this.chunkBudget <= 0) && (i.context.takeTree(), this.view.dispatch({ effects: r_.setState.of(new d_(i.context)) })), this.chunkBudget > 0 && (!s || o) && this.scheduleWork(), this.checkAsyncSchedule(i.context);
	}
	checkAsyncSchedule(e) {
		e.scheduleOn &&= (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((e) => md(this.view.state, e)).then(() => this.workScheduled--), null);
	}
	destroy() {
		this.working && this.working();
	}
	isWorking() {
		return !!(this.working || this.workScheduled > 0);
	}
}, { eventHandlers: { focus() {
	this.scheduleWork();
} } }), h_ = /*@__PURE__*/ B.define({
	combine(e) {
		return e.length ? e[0] : null;
	},
	enables: (e) => [
		r_.state,
		m_,
		W.contentAttributes.compute([e], (t) => {
			let n = t.facet(e);
			return n && n.name ? { "data-language": n.name } : {};
		})
	]
}), g_ = class {
	constructor(e, t = []) {
		this.language = e, this.support = t, this.extension = [e, t];
	}
}, __ = class e {
	constructor(e, t, n, r, i, a = void 0) {
		this.name = e, this.alias = t, this.extensions = n, this.filename = r, this.loadFunc = i, this.support = a, this.loading = null;
	}
	load() {
		return this.loading ||= this.loadFunc().then((e) => this.support = e, (e) => {
			throw this.loading = null, e;
		});
	}
	static of(t) {
		let { load: n, support: r } = t;
		if (!n) {
			if (!r) throw RangeError("Must pass either 'load' or 'support' to LanguageDescription.of");
			n = () => Promise.resolve(r);
		}
		return new e(t.name, (t.alias || []).concat(t.name).map((e) => e.toLowerCase()), t.extensions || [], t.filename, n, r);
	}
	static matchFilename(e, t) {
		for (let n of e) if (n.filename && n.filename.test(t)) return n;
		let n = /\.([^.]+)$/.exec(t);
		if (n) {
			for (let t of e) if (t.extensions.indexOf(n[1]) > -1) return t;
		}
		return null;
	}
	static matchLanguageName(e, t, n = !0) {
		t = t.toLowerCase();
		for (let n of e) if (n.alias.some((e) => e == t)) return n;
		if (n) for (let n of e) for (let e of n.alias) {
			let r = t.indexOf(e);
			if (r > -1 && (e.length > 2 || !/\w/.test(t[r - 1]) && !/\w/.test(t[r + e.length]))) return n;
		}
		return null;
	}
}, v_ = /*@__PURE__*/ B.define(), y_ = /*@__PURE__*/ B.define({ combine: (e) => {
	if (!e.length) return "  ";
	let t = e[0];
	if (!t || /\S/.test(t) || Array.from(t).some((e) => e != t[0])) throw Error("Invalid indent unit: " + JSON.stringify(e[0]));
	return t;
} });
function b_(e) {
	let t = e.facet(y_);
	return t.charCodeAt(0) == 9 ? e.tabSize * t.length : t.length;
}
function x_(e, t) {
	let n = "", r = e.tabSize, i = e.facet(y_)[0];
	if (i == "	") {
		for (; t >= r;) n += "	", t -= r;
		i = " ";
	}
	for (let e = 0; e < t; e++) n += i;
	return n;
}
function S_(e, t) {
	e instanceof Uc && (e = new C_(e));
	for (let n of e.state.facet(v_)) {
		let r = n(e, t);
		if (r !== void 0) return r;
	}
	let n = o_(e.state);
	return n.length >= t ? T_(e, n, t) : null;
}
var C_ = class {
	constructor(e, t = {}) {
		this.state = e, this.options = t, this.unit = b_(e);
	}
	lineAt(e, t = 1) {
		let n = this.state.doc.lineAt(e), { simulateBreak: r, simulateDoubleBreak: i } = this.options;
		return r != null && r >= n.from && r <= n.to ? i && r == e ? {
			text: "",
			from: e
		} : (t < 0 ? r < e : r <= e) ? {
			text: n.text.slice(r - n.from),
			from: r
		} : {
			text: n.text.slice(0, r - n.from),
			from: n.from
		} : n;
	}
	textAfterPos(e, t = 1) {
		if (this.options.simulateDoubleBreak && e == this.options.simulateBreak) return "";
		let { text: n, from: r } = this.lineAt(e, t);
		return n.slice(e - r, Math.min(n.length, e + 100 - r));
	}
	column(e, t = 1) {
		let { text: n, from: r } = this.lineAt(e, t), i = this.countColumn(n, e - r), a = this.options.overrideIndentation ? this.options.overrideIndentation(r) : -1;
		return a > -1 && (i += a - this.countColumn(n, n.search(/\S|$/))), i;
	}
	countColumn(e, t = e.length) {
		return ul(e, this.state.tabSize, t);
	}
	lineIndent(e, t = 1) {
		let { text: n, from: r } = this.lineAt(e, t), i = this.options.overrideIndentation;
		if (i) {
			let e = i(r);
			if (e > -1) return e;
		}
		return this.countColumn(n, n.search(/\S|$/));
	}
	get simulatedBreak() {
		return this.options.simulateBreak || null;
	}
}, w_ = /*@__PURE__*/ new G();
function T_(e, t, n) {
	let r = t.resolveStack(n), i = t.resolveInner(n, -1).resolve(n, 0).enterUnfinishedNodesBefore(n);
	if (i != r.node) {
		let e = [];
		for (let t = i; t && !(t.from < r.node.from || t.to > r.node.to || t.from == r.node.from && t.type == r.node.type); t = t.parent) e.push(t);
		for (let t = e.length - 1; t >= 0; t--) r = {
			node: e[t],
			next: r
		};
	}
	return E_(r, e, n);
}
function E_(e, t, n) {
	for (let r = e; r; r = r.next) {
		let e = O_(r.node);
		if (e) return e(A_.create(t, n, r));
	}
	return 0;
}
function D_(e) {
	return e.pos == e.options.simulateBreak && e.options.simulateDoubleBreak;
}
function O_(e) {
	let t = e.type.prop(w_);
	if (t) return t;
	let n = e.firstChild, r;
	if (n && (r = n.type.prop(G.closedBy))) {
		let t = e.lastChild, n = t && r.indexOf(t.name) > -1;
		return (e) => P_(e, !0, 1, void 0, n && !D_(e) ? t.from : void 0);
	}
	return e.parent == null ? k_ : null;
}
function k_() {
	return 0;
}
var A_ = class e extends C_ {
	constructor(e, t, n) {
		super(e.state, e.options), this.base = e, this.pos = t, this.context = n;
	}
	get node() {
		return this.context.node;
	}
	static create(t, n, r) {
		return new e(t, n, r);
	}
	get textAfter() {
		return this.textAfterPos(this.pos);
	}
	get baseIndent() {
		return this.baseIndentFor(this.node);
	}
	baseIndentFor(e) {
		let t = this.state.doc.lineAt(e.from);
		for (;;) {
			let n = e.resolve(t.from);
			for (; n.parent && n.parent.from == n.from;) n = n.parent;
			if (j_(n, e)) break;
			t = this.state.doc.lineAt(n.from);
		}
		return this.lineIndent(t.from);
	}
	continue() {
		return E_(this.context.next, this.base, this.pos);
	}
};
function j_(e, t) {
	for (let n = t; n; n = n.parent) if (e == n) return !0;
	return !1;
}
function M_(e) {
	let t = e.node, n = t.childAfter(t.from), r = t.lastChild;
	if (!n) return null;
	let i = e.options.simulateBreak, a = e.state.doc.lineAt(n.from), o = i == null || i <= a.from ? a.to : Math.min(a.to, i);
	for (let e = n.to;;) {
		let i = t.childAfter(e);
		if (!i || i == r) return null;
		if (!i.type.isSkipped) {
			if (i.from >= o) return null;
			let e = /^ */.exec(a.text.slice(n.to - a.from))[0].length;
			return {
				from: n.from,
				to: n.to + e
			};
		}
		e = i.to;
	}
}
function N_({ closing: e, align: t = !0, units: n = 1 }) {
	return (r) => P_(r, t, n, e);
}
function P_(e, t, n, r, i) {
	let a = e.textAfter, o = a.match(/^\s*/)[0].length, s = r && a.slice(o, o + r.length) == r || i == e.pos + o, c = t ? M_(e) : null;
	return c ? s ? e.column(c.from) : e.column(c.to) : e.baseIndent + (s ? 0 : e.unit * n);
}
var F_ = (e) => e.baseIndent;
function I_({ except: e, units: t = 1 } = {}) {
	return (n) => {
		let r = e && e.test(n.textAfter);
		return n.baseIndent + (r ? 0 : t * n.unit);
	};
}
var L_ = /*@__PURE__*/ B.define(), R_ = /*@__PURE__*/ new G();
function z_(e) {
	let t = e.firstChild, n = e.lastChild;
	return t && t.to < n.from ? {
		from: t.to,
		to: n.type.isError ? e.to : n.from
	} : null;
}
var B_ = class e {
	constructor(e, t) {
		this.specs = e;
		let n;
		function r(e) {
			let t = gl.newName();
			return (n ||= Object.create(null))["." + t] = e, t;
		}
		let i = typeof t.all == "string" ? t.all : t.all ? r(t.all) : void 0, a = t.scope;
		this.scope = a instanceof r_ ? (e) => e.prop(e_) == a.data : a ? (e) => e == a : void 0, this.style = Ng(e.map((e) => ({
			tag: e.tag,
			class: e.class || r(Object.assign({}, e, { tag: null }))
		})), { all: i }).style, this.module = n ? new gl(n) : null, this.themeType = t.themeType;
	}
	static define(t, n) {
		return new e(t, n || {});
	}
}, V_ = /*@__PURE__*/ B.define(), H_ = /*@__PURE__*/ B.define({ combine(e) {
	return e.length ? [e[0]] : null;
} });
function U_(e) {
	let t = e.facet(V_);
	return t.length ? t : e.facet(H_);
}
function W_(e, t) {
	let n = [K_], r;
	return e instanceof B_ && (e.module && n.push(W.styleModule.of(e.module)), r = e.themeType), t?.fallback ? n.push(H_.of(e)) : r ? n.push(V_.computeN([W.darkTheme], (t) => t.facet(W.darkTheme) == (r == "dark") ? [e] : [])) : n.push(V_.of(e)), n;
}
var G_ = class {
	constructor(e) {
		this.markCache = Object.create(null), this.tree = o_(e.state), this.decorations = this.buildDeco(e, U_(e.state)), this.decoratedTo = e.viewport.to;
	}
	update(e) {
		let t = o_(e.state), n = U_(e.state), r = n != U_(e.startState), { viewport: i } = e.view, a = e.changes.mapPos(this.decoratedTo, 1);
		t.length < i.to && !r && t.type == this.tree.type && a >= i.to ? (this.decorations = this.decorations.map(e.changes), this.decoratedTo = a) : (t != this.tree || e.viewportChanged || r) && (this.tree = t, this.decorations = this.buildDeco(e.view, n), this.decoratedTo = i.to);
	}
	buildDeco(e, t) {
		if (!t || !this.tree.length) return Kl.none;
		let n = new $c();
		for (let { from: r, to: i } of e.visibleRanges) Fg(this.tree, t, (e, t, r) => {
			n.add(e, t, this.markCache[r] || (this.markCache[r] = Kl.mark({ class: r })));
		}, r, i);
		return n.finish();
	}
}, K_ = /*@__PURE__*/ uc.high(/*@__PURE__*/ vd.fromClass(G_, { decorations: (e) => e.decorations })), q_ = /*@__PURE__*/ B_.define([
	{
		tag: Y.meta,
		color: "#404740"
	},
	{
		tag: Y.link,
		textDecoration: "underline"
	},
	{
		tag: Y.heading,
		textDecoration: "underline",
		fontWeight: "bold"
	},
	{
		tag: Y.emphasis,
		fontStyle: "italic"
	},
	{
		tag: Y.strong,
		fontWeight: "bold"
	},
	{
		tag: Y.strikethrough,
		textDecoration: "line-through"
	},
	{
		tag: Y.keyword,
		color: "#708"
	},
	{
		tag: [
			Y.atom,
			Y.bool,
			Y.url,
			Y.contentSeparator,
			Y.labelName
		],
		color: "#219"
	},
	{
		tag: [Y.literal, Y.inserted],
		color: "#164"
	},
	{
		tag: [Y.string, Y.deleted],
		color: "#a11"
	},
	{
		tag: [
			Y.regexp,
			Y.escape,
			/*@__PURE__*/ Y.special(Y.string)
		],
		color: "#e40"
	},
	{
		tag: /*@__PURE__*/ Y.definition(Y.variableName),
		color: "#00f"
	},
	{
		tag: /*@__PURE__*/ Y.local(Y.variableName),
		color: "#30a"
	},
	{
		tag: [Y.typeName, Y.namespace],
		color: "#085"
	},
	{
		tag: Y.className,
		color: "#167"
	},
	{
		tag: [/*@__PURE__*/ Y.special(Y.variableName), Y.macroName],
		color: "#256"
	},
	{
		tag: /*@__PURE__*/ Y.definition(Y.propertyName),
		color: "#00c"
	},
	{
		tag: Y.comment,
		color: "#940"
	},
	{
		tag: Y.invalid,
		color: "#f00"
	}
]), J_ = 1e4, Y_ = "()[]{}", X_ = /*@__PURE__*/ new G();
function Z_(e, t, n) {
	let r = e.prop(t < 0 ? G.openedBy : G.closedBy);
	if (r) return r;
	if (e.name.length == 1) {
		let r = n.indexOf(e.name);
		if (r > -1 && r % 2 == +(t < 0)) return [n[r + t]];
	}
	return null;
}
function Q_(e) {
	let t = e.type.prop(X_);
	return t ? t(e.node) : e;
}
function $_(e, t, n, r = {}) {
	let i = r.maxScanDistance || J_, a = r.brackets || Y_, o = o_(e), s = o.resolveInner(t, n);
	for (let r = s; r; r = r.parent) {
		let i = Z_(r.type, n, a);
		if (i && r.from < r.to) {
			let o = Q_(r);
			if (o && (n > 0 ? t >= o.from && t < o.to : t > o.from && t <= o.to)) return e1(e, t, n, r, o, i, a);
		}
	}
	return t1(e, t, n, o, s.type, i, a);
}
function e1(e, t, n, r, i, a, o) {
	let s = r.parent, c = {
		from: i.from,
		to: i.to
	}, l = 0, u = s?.cursor();
	if (u && (n < 0 ? u.childBefore(r.from) : u.childAfter(r.to))) do
		if (n < 0 ? u.to <= r.from : u.from >= r.to) {
			if (l == 0 && a.indexOf(u.type.name) > -1 && u.from < u.to) {
				let e = Q_(u);
				return {
					start: c,
					end: e ? {
						from: e.from,
						to: e.to
					} : void 0,
					matched: !0
				};
			}
			if (Z_(u.type, n, o)) l++;
			else if (Z_(u.type, -n, o)) {
				if (l == 0) {
					let e = Q_(u);
					return {
						start: c,
						end: e && e.from < e.to ? {
							from: e.from,
							to: e.to
						} : void 0,
						matched: !1
					};
				}
				l--;
			}
		}
	while (n < 0 ? u.prevSibling() : u.nextSibling());
	return {
		start: c,
		matched: !1
	};
}
function t1(e, t, n, r, i, a, o) {
	if (n < 0 ? !t : t == e.doc.length) return null;
	let s = n < 0 ? e.sliceDoc(t - 1, t) : e.sliceDoc(t, t + 1), c = o.indexOf(s);
	if (c < 0 || c % 2 == 0 != n > 0) return null;
	let l = {
		from: n < 0 ? t - 1 : t,
		to: n > 0 ? t + 1 : t
	}, u = e.doc.iterRange(t, n > 0 ? e.doc.length : 0), d = 0;
	for (let e = 0; !u.next().done && e <= a;) {
		let a = u.value;
		n < 0 && (e += a.length);
		let s = t + e * n;
		for (let e = n > 0 ? 0 : a.length - 1, t = n > 0 ? a.length : -1; e != t; e += n) {
			let t = o.indexOf(a[e]);
			if (!(t < 0 || r.resolveInner(s + e, 1).type != i)) {
				if (t % 2 == 0 == n > 0) d++;
				else if (d == 1) return {
					start: l,
					end: {
						from: s + e,
						to: s + e + 1
					},
					matched: t >> 1 == c >> 1
				};
				else d--;
			}
		}
		n > 0 && (e += a.length);
	}
	return u.done ? {
		start: l,
		matched: !1
	} : null;
}
function n1(e) {
	return {
		name: e.name || "",
		token: e.token,
		blankLine: e.blankLine || (() => {}),
		startState: e.startState || (() => !0),
		copyState: e.copyState || r1,
		indent: e.indent || (() => null),
		languageData: e.languageData || {},
		tokenTable: e.tokenTable || d1,
		mergeTokens: e.mergeTokens !== !1
	};
}
function r1(e) {
	if (typeof e != "object") return e;
	let t = {};
	for (let n in e) {
		let r = e[n];
		t[n] = r instanceof Array ? r.slice() : r;
	}
	return t;
}
var i1 = /*@__PURE__*/ new WeakMap(), a1 = class e extends r_ {
	constructor(e) {
		let t = t_(e.languageData), n = n1(e), r, i = new class extends og {
			createParse(e, t, n) {
				return new l1(r, e, t, n);
			}
		}();
		super(t, i, [], e.name), this.topNode = x1(t, this), r = this, this.streamParser = n, this.stateAfter = new G({ perNode: !0 }), this.tokenTable = e.tokenTable ? new _1(n.tokenTable) : v1;
	}
	static define(t) {
		return new e(t);
	}
	getIndent(e) {
		let t, { overrideIndentation: n } = e.options;
		n && (t = i1.get(e.state), t != null && t < e.pos - 1e4 && (t = void 0));
		let r = o1(this, e.node.tree, e.node.from, e.node.from, t ?? e.pos), i, a;
		if (r ? (a = r.state, i = r.pos + 1) : (a = this.streamParser.startState(e.unit), i = e.node.from), e.pos - i > 1e4) return null;
		for (; i < e.pos;) {
			let t = e.state.doc.lineAt(i), r = Math.min(e.pos, t.to);
			if (t.length) {
				let i = n ? n(t.from) : -1, o = new $g(t.text, e.state.tabSize, e.unit, i < 0 ? void 0 : i);
				for (; o.pos < r - t.from;) u1(this.streamParser.token, o, a);
			} else this.streamParser.blankLine(a, e.unit);
			if (r == e.pos) break;
			i = t.to + 1;
		}
		let o = e.lineAt(e.pos);
		return n && t == null && i1.set(e.state, o.from), this.streamParser.indent(a, /^\s*(.*)/.exec(o.text)[1], e);
	}
	get allowsNesting() {
		return !1;
	}
};
function o1(e, t, n, r, i) {
	let a = n >= r && n + t.length <= i && t.prop(e.stateAfter);
	if (a) return {
		state: e.streamParser.copyState(a),
		pos: n + t.length
	};
	for (let a = t.children.length - 1; a >= 0; a--) {
		let o = t.children[a], s = n + t.positions[a], c = o instanceof q && s < i && o1(e, o, s, r, i);
		if (c) return c;
	}
	return null;
}
function s1(e, t, n, r, i) {
	if (i && n <= 0 && r >= t.length) return t;
	!i && n == 0 && t.type == e.topNode && (i = !0);
	for (let a = t.children.length - 1; a >= 0; a--) {
		let o = t.positions[a], s = t.children[a], c;
		if (o < r && s instanceof q) {
			if (!(c = s1(e, s, n - o, r - o, i))) break;
			return i ? new q(t.type, t.children.slice(0, a).concat(c), t.positions.slice(0, a + 1), o + c.length) : c;
		}
	}
	return null;
}
function c1(e, t, n, r, i) {
	for (let i of t) {
		let t = i.from + (i.openStart ? 25 : 0), a = i.to - (i.openEnd ? 25 : 0), o = t <= n && a > n && o1(e, i.tree, 0 - i.offset, n, a), s;
		if (o && o.pos <= r && (s = s1(e, i.tree, n + i.offset, o.pos + i.offset, !1))) return {
			state: o.state,
			tree: s
		};
	}
	return {
		state: e.streamParser.startState(i ? b_(i) : 4),
		tree: q.empty
	};
}
var l1 = class {
	constructor(e, t, n, r) {
		this.lang = e, this.input = t, this.fragments = n, this.ranges = r, this.stoppedAt = null, this.chunks = [], this.chunkPos = [], this.chunk = [], this.chunkReused = void 0, this.rangeIndex = 0, this.to = r[r.length - 1].to;
		let i = l_.get(), a = r[0].from, { state: o, tree: s } = c1(e, n, a, this.to, i?.state);
		this.state = o, this.parsedPos = this.chunkStart = a + s.length;
		for (let e = 0; e < s.children.length; e++) this.chunks.push(s.children[e]), this.chunkPos.push(s.positions[e]);
		i && this.parsedPos < i.viewport.from - 1e5 && r.some((e) => e.from <= i.viewport.from && e.to >= i.viewport.from) && (this.state = this.lang.streamParser.startState(b_(i.state)), i.skipUntilInView(this.parsedPos, i.viewport.from), this.parsedPos = i.viewport.from), this.moveRangeIndex();
	}
	advance() {
		let e = l_.get(), t = this.stoppedAt == null ? this.to : Math.min(this.to, this.stoppedAt), n = Math.min(t, this.chunkStart + 512);
		for (e && (n = Math.min(n, e.viewport.to)); this.parsedPos < n;) this.parseLine(e);
		return this.chunkStart < this.parsedPos && this.finishChunk(), this.parsedPos >= t ? this.finish() : e && this.parsedPos >= e.viewport.to ? (e.skipUntilInView(this.parsedPos, t), this.finish()) : null;
	}
	stopAt(e) {
		this.stoppedAt = e;
	}
	lineAfter(e) {
		let t = this.input.chunk(e);
		if (this.input.lineChunks) t == "\n" && (t = "");
		else {
			let e = t.indexOf("\n");
			e > -1 && (t = t.slice(0, e));
		}
		return e + t.length <= this.to ? t : t.slice(0, this.to - e);
	}
	nextLine() {
		let e = this.parsedPos, t = this.lineAfter(e), n = e + t.length;
		for (let e = this.rangeIndex;;) {
			let r = this.ranges[e].to;
			if (r >= n || (t = t.slice(0, r - (n - t.length)), e++, e == this.ranges.length)) break;
			let i = this.ranges[e].from, a = this.lineAfter(i);
			t += a, n = i + a.length;
		}
		return {
			line: t,
			end: n
		};
	}
	skipGapsTo(e, t, n) {
		for (;;) {
			let r = this.ranges[this.rangeIndex].to, i = e + t;
			if (n > 0 ? r > i : r >= i) break;
			let a = this.ranges[++this.rangeIndex].from;
			t += a - r;
		}
		return t;
	}
	moveRangeIndex() {
		for (; this.ranges[this.rangeIndex].to < this.parsedPos;) this.rangeIndex++;
	}
	emitToken(e, t, n, r) {
		let i = 4;
		if (this.ranges.length > 1) {
			r = this.skipGapsTo(t, r, 1), t += r;
			let e = this.chunk.length;
			r = this.skipGapsTo(n, r, -1), n += r, i += this.chunk.length - e;
		}
		let a = this.chunk.length - 4;
		return this.lang.streamParser.mergeTokens && i == 4 && a >= 0 && this.chunk[a] == e && this.chunk[a + 2] == t ? this.chunk[a + 2] = n : this.chunk.push(e, t, n, i), r;
	}
	parseLine(e) {
		let { line: t, end: n } = this.nextLine(), r = 0, { streamParser: i } = this.lang, a = new $g(t, e ? e.state.tabSize : 4, e ? b_(e.state) : 2);
		if (a.eol()) i.blankLine(this.state, a.indentUnit);
		else for (; !a.eol();) {
			let e = u1(i.token, a, this.state);
			if (e && (r = this.emitToken(this.lang.tokenTable.resolve(e), this.parsedPos + a.start, this.parsedPos + a.pos, r)), a.start > 1e4) break;
		}
		this.parsedPos = n, this.moveRangeIndex(), this.parsedPos < this.to && this.parsedPos++;
	}
	finishChunk() {
		let e = q.build({
			buffer: this.chunk,
			start: this.chunkStart,
			length: this.parsedPos - this.chunkStart,
			nodeSet: p1,
			topID: 0,
			maxBufferLength: 512,
			reused: this.chunkReused
		});
		e = new q(e.type, e.children, e.positions, e.length, [[this.lang.stateAfter, this.lang.streamParser.copyState(this.state)]]), this.chunks.push(e), this.chunkPos.push(this.chunkStart - this.ranges[0].from), this.chunk = [], this.chunkReused = void 0, this.chunkStart = this.parsedPos;
	}
	finish() {
		return new q(this.lang.topNode, this.chunks, this.chunkPos, this.parsedPos - this.ranges[0].from).balance();
	}
};
function u1(e, t, n) {
	t.start = t.pos;
	for (let r = 0; r < 10; r++) {
		let r = e(t, n);
		if (t.pos > t.start) return r;
	}
	throw Error("Stream parser failed to advance stream.");
}
var d1 = /*@__PURE__*/ Object.create(null), f1 = [Fh.none], p1 = /*@__PURE__*/ new Ih(f1), m1 = [], h1 = /*@__PURE__*/ Object.create(null), g1 = /*@__PURE__*/ Object.create(null);
for (let [e, t] of [
	["variable", "variableName"],
	["variable-2", "variableName.special"],
	["string-2", "string.special"],
	["def", "variableName.definition"],
	["tag", "tagName"],
	["attribute", "attributeName"],
	["type", "typeName"],
	["builtin", "variableName.standard"],
	["qualifier", "modifier"],
	["error", "invalid"],
	["header", "heading"],
	["property", "propertyName"]
]) g1[e] = /*@__PURE__*/ b1(d1, t);
var _1 = class {
	constructor(e) {
		this.extra = e, this.table = Object.assign(Object.create(null), g1);
	}
	resolve(e) {
		return e ? this.table[e] || (this.table[e] = b1(this.extra, e)) : 0;
	}
}, v1 = /*@__PURE__*/ new _1(d1);
function y1(e, t) {
	m1.indexOf(e) > -1 || (m1.push(e), console.warn(t));
}
function b1(e, t) {
	let n = [];
	for (let r of t.split(" ")) {
		let t = [];
		for (let n of r.split(".")) {
			let r = e[n] || Y[n];
			r ? typeof r == "function" ? t.length ? t = t.map(r) : y1(n, `Modifier ${n} used at start of tag`) : t.length ? y1(n, `Tag ${n} used as modifier`) : t = Array.isArray(r) ? r : [r] : y1(n, `Unknown highlighting tag ${n}`);
		}
		for (let e of t) n.push(e);
	}
	if (!n.length) return 0;
	let r = t.replace(/ /g, "_"), i = r + " " + n.map((e) => e.id), a = h1[i];
	if (a) return a.id;
	let o = h1[i] = Fh.define({
		id: f1.length,
		name: r,
		props: [Ag({ [r]: n })]
	});
	return f1.push(o), o.id;
}
function x1(e, t) {
	let n = Fh.define({
		id: f1.length,
		name: "Document",
		props: [e_.add(() => e), w_.add(() => (e) => t.getIndent(e))],
		top: !0
	});
	return f1.push(n), n;
}
ju.RTL, ju.LTR;
// node_modules/@codemirror/commands/dist/index.js
var S1 = (e) => {
	let { state: t } = e, n = t.doc.lineAt(t.selection.main.from), r = D1(e.state, n.from);
	return r.line ? w1(e) : r.block ? E1(e) : !1;
};
function C1(e, t) {
	return ({ state: n, dispatch: r }) => {
		if (n.readOnly) return !1;
		let i = e(t, n);
		return i ? (r(n.update(i)), !0) : !1;
	};
}
var w1 = /*@__PURE__*/ C1(M1, 0), T1 = /*@__PURE__*/ C1(j1, 0), E1 = /*@__PURE__*/ C1((e, t) => j1(e, t, A1(t)), 0);
function D1(e, t) {
	let n = e.languageDataAt("commentTokens", t, 1);
	return n.length ? n[0] : {};
}
var O1 = 50;
function k1(e, { open: t, close: n }, r, i) {
	let a = e.sliceDoc(r - O1, r), o = e.sliceDoc(i, i + O1), s = /\s*$/.exec(a)[0].length, c = /^\s*/.exec(o)[0].length, l = a.length - s;
	if (a.slice(l - t.length, l) == t && o.slice(c, c + n.length) == n) return {
		open: {
			pos: r - s,
			margin: s && 1
		},
		close: {
			pos: i + c,
			margin: c && 1
		}
	};
	let u, d;
	i - r <= 100 ? u = d = e.sliceDoc(r, i) : (u = e.sliceDoc(r, r + O1), d = e.sliceDoc(i - O1, i));
	let f = /^\s*/.exec(u)[0].length, p = /\s*$/.exec(d)[0].length, m = d.length - p - n.length;
	return u.slice(f, f + t.length) == t && d.slice(m, m + n.length) == n ? {
		open: {
			pos: r + f + t.length,
			margin: +!!/\s/.test(u.charAt(f + t.length))
		},
		close: {
			pos: i - p - n.length,
			margin: +!!/\s/.test(d.charAt(m - 1))
		}
	} : null;
}
function A1(e) {
	let t = [];
	for (let n of e.selection.ranges) {
		let r = e.doc.lineAt(n.from), i = n.to <= r.to ? r : e.doc.lineAt(n.to);
		i.from > r.from && i.from == n.to && (i = n.to == r.to + 1 ? r : e.doc.lineAt(n.to - 1));
		let a = t.length - 1;
		a >= 0 && t[a].to > r.from ? t[a].to = i.to : t.push({
			from: r.from + /^\s*/.exec(r.text)[0].length,
			to: i.to
		});
	}
	return t;
}
function j1(e, t, n = t.selection.ranges) {
	let r = n.map((e) => D1(t, e.from).block);
	if (!r.every((e) => e)) return null;
	let i = n.map((e, n) => k1(t, r[n], e.from, e.to));
	if (e != 2 && !i.every((e) => e)) return { changes: t.changes(n.map((e, t) => i[t] ? [] : [{
		from: e.from,
		insert: r[t].open + " "
	}, {
		from: e.to,
		insert: " " + r[t].close
	}])) };
	if (e != 1 && i.some((e) => e)) {
		let e = [];
		for (let t = 0, n; t < i.length; t++) if (n = i[t]) {
			let i = r[t], { open: a, close: o } = n;
			e.push({
				from: a.pos - i.open.length,
				to: a.pos + a.margin
			}, {
				from: o.pos - o.margin,
				to: o.pos + i.close.length
			});
		}
		return { changes: e };
	}
	return null;
}
function M1(e, t, n = t.selection.ranges) {
	let r = [], i = -1;
	e: for (let { from: e, to: a } of n) {
		let n = r.length, o = 1e9, s;
		for (let n = e; n <= a;) {
			let c = t.doc.lineAt(n);
			if (s == null && (s = D1(t, c.from).line, !s)) continue e;
			if (c.from > i && (e == a || a > c.from)) {
				i = c.from;
				let e = /^\s*/.exec(c.text)[0].length, t = e == c.length, n = c.text.slice(e, e + s.length) == s ? e : -1;
				e < c.text.length && e < o && (o = e), r.push({
					line: c,
					comment: n,
					token: s,
					indent: e,
					empty: t,
					single: !1
				});
			}
			n = c.to + 1;
		}
		if (o < 1e9) for (let e = n; e < r.length; e++) r[e].indent < r[e].line.text.length && (r[e].indent = o);
		r.length == n + 1 && (r[n].single = !0);
	}
	if (e != 2 && r.some((e) => e.comment < 0 && (!e.empty || e.single))) {
		let e = [];
		for (let { line: t, token: n, indent: i, empty: a, single: o } of r) (o || !a) && e.push({
			from: t.from + i,
			insert: n + " "
		});
		let n = t.changes(e);
		return {
			changes: n,
			selection: t.selection.map(n, 1)
		};
	}
	if (e != 1 && r.some((e) => e.comment >= 0)) {
		let e = [];
		for (let { line: t, comment: n, token: i } of r) if (n >= 0) {
			let r = t.from + n, a = r + i.length;
			t.text[a - t.from] == " " && a++, e.push({
				from: r,
				to: a
			});
		}
		return { changes: e };
	}
	return null;
}
var N1 = /*@__PURE__*/ Tc.define(), P1 = /*@__PURE__*/ Tc.define(), F1 = /*@__PURE__*/ B.define(), I1 = /*@__PURE__*/ B.define({ combine(e) {
	return Wc(e, {
		minDepth: 100,
		newGroupDelay: 500,
		joinToEvent: (e, t) => t
	}, {
		minDepth: Math.max,
		newGroupDelay: Math.min,
		joinToEvent: (e, t) => (n, r) => e(n, r) || t(n, r)
	});
} }), L1 = /*@__PURE__*/ sc.define({
	create() {
		return n0.empty;
	},
	update(e, t) {
		let n = t.state.facet(I1), r = t.annotation(N1);
		if (r) {
			let i = W1.fromTransaction(t, r.selection), a = r.side, o = a == 0 ? e.undone : e.done;
			return o = i ? G1(o, o.length, n.minDepth, i) : Z1(o, t.startState.selection), new n0(a == 0 ? r.rest : o, a == 0 ? o : r.rest);
		}
		let i = t.annotation(P1);
		if ((i == "full" || i == "before") && (e = e.isolate()), t.annotation(kc.addToHistory) === !1) return t.changes.empty ? e : e.addMapping(t.changes.desc);
		let a = W1.fromTransaction(t), o = t.annotation(kc.time), s = t.annotation(kc.userEvent);
		return a ? e = e.addChanges(a, o, s, n, t) : t.selection && (e = e.addSelection(t.startState.selection, o, s, n.newGroupDelay)), (i == "full" || i == "after") && (e = e.isolate()), e;
	},
	toJSON(e) {
		return {
			done: e.done.map((e) => e.toJSON()),
			undone: e.undone.map((e) => e.toJSON())
		};
	},
	fromJSON(e) {
		return new n0(e.done.map(W1.fromJSON), e.undone.map(W1.fromJSON));
	}
});
function R1(e = {}) {
	return [
		L1,
		I1.of(e),
		W.domEventHandlers({ beforeinput(e, t) {
			let n = e.inputType == "historyUndo" ? B1 : e.inputType == "historyRedo" ? V1 : null;
			return n ? (e.preventDefault(), n(t)) : !1;
		} })
	];
}
function z1(e, t) {
	return function({ state: n, dispatch: r }) {
		if (!t && n.readOnly) return !1;
		let i = n.field(L1, !1);
		if (!i) return !1;
		let a = i.pop(e, n, t);
		return a ? (r(a), !0) : !1;
	};
}
var B1 = /*@__PURE__*/ z1(0, !1), V1 = /*@__PURE__*/ z1(1, !1), H1 = /*@__PURE__*/ z1(0, !0), U1 = /*@__PURE__*/ z1(1, !0), W1 = class e {
	constructor(e, t, n, r, i) {
		this.changes = e, this.effects = t, this.mapped = n, this.startSelection = r, this.selectionsAfter = i;
	}
	setSelAfter(t) {
		return new e(this.changes, this.effects, this.mapped, this.startSelection, t);
	}
	toJSON() {
		return {
			changes: this.changes?.toJSON(),
			mapped: this.mapped?.toJSON(),
			startSelection: this.startSelection?.toJSON(),
			selectionsAfter: this.selectionsAfter.map((e) => e.toJSON())
		};
	}
	static fromJSON(t) {
		return new e(t.changes && Gs.fromJSON(t.changes), [], t.mapped && Ws.fromJSON(t.mapped), t.startSelection && z.fromJSON(t.startSelection), t.selectionsAfter.map(z.fromJSON));
	}
	static fromTransaction(t, n) {
		let r = Y1;
		for (let e of t.startState.facet(F1)) {
			let n = e(t);
			n.length && (r = r.concat(n));
		}
		return !r.length && t.changes.empty ? null : new e(t.changes.invert(t.startState.doc), r, void 0, n || t.startState.selection, Y1);
	}
	static selection(t) {
		return new e(void 0, Y1, void 0, void 0, t);
	}
};
function G1(e, t, n, r) {
	let i = t + 1 > n + 20 ? t - n - 1 : 0, a = e.slice(i, t);
	return a.push(r), a;
}
function K1(e, t) {
	let n = [], r = !1;
	return e.iterChangedRanges((e, t) => n.push(e, t)), t.iterChangedRanges((e, t, i, a) => {
		for (let e = 0; e < n.length;) {
			let t = n[e++], o = n[e++];
			a >= t && i <= o && (r = !0);
		}
	}), r;
}
function q1(e, t) {
	return e.ranges.length == t.ranges.length && e.ranges.filter((e, n) => e.empty != t.ranges[n].empty).length === 0;
}
function J1(e, t) {
	return e.length ? t.length ? e.concat(t) : e : t;
}
var Y1 = [], X1 = 200;
function Z1(e, t) {
	if (e.length) {
		let n = e[e.length - 1], r = n.selectionsAfter.slice(Math.max(0, n.selectionsAfter.length - X1));
		return r.length && r[r.length - 1].eq(t) ? e : (r.push(t), G1(e, e.length - 1, 1e9, n.setSelAfter(r)));
	}
	return [W1.selection([t])];
}
function Q1(e) {
	let t = e[e.length - 1], n = e.slice();
	return n[e.length - 1] = t.setSelAfter(t.selectionsAfter.slice(0, t.selectionsAfter.length - 1)), n;
}
function $1(e, t) {
	if (!e.length) return e;
	let n = e.length, r = Y1;
	for (; n;) {
		let i = e0(e[n - 1], t, r);
		if (i.changes && !i.changes.empty || i.effects.length) {
			let t = e.slice(0, n);
			return t[n - 1] = i, t;
		}
		t = i.mapped, n--, r = i.selectionsAfter;
	}
	return r.length ? [W1.selection(r)] : Y1;
}
function e0(e, t, n) {
	let r = J1(e.selectionsAfter.length ? e.selectionsAfter.map((e) => e.map(t)) : Y1, n);
	if (!e.changes) return W1.selection(r);
	let i = e.changes.map(t), a = t.mapDesc(e.changes, !0), o = e.mapped ? e.mapped.composeDesc(a) : a;
	return new W1(i, Oc.mapEffects(e.effects, t), o, e.startSelection.map(a), r);
}
var t0 = /^(input\.type|delete)($|\.)/, n0 = class e {
	constructor(e, t, n = 0, r = void 0) {
		this.done = e, this.undone = t, this.prevTime = n, this.prevUserEvent = r;
	}
	isolate() {
		return this.prevTime ? new e(this.done, this.undone) : this;
	}
	addChanges(t, n, r, i, a) {
		let o = this.done, s = o[o.length - 1];
		return o = s && s.changes && !s.changes.empty && t.changes && (!r || t0.test(r)) && (!s.selectionsAfter.length && n - this.prevTime < i.newGroupDelay && i.joinToEvent(a, K1(s.changes, t.changes)) || r == "input.type.compose") ? G1(o, o.length - 1, i.minDepth, new W1(t.changes.compose(s.changes), J1(Oc.mapEffects(t.effects, s.changes), s.effects), s.mapped, s.startSelection, Y1)) : G1(o, o.length, i.minDepth, t), new e(o, Y1, n, r);
	}
	addSelection(t, n, r, i) {
		let a = this.done.length ? this.done[this.done.length - 1].selectionsAfter : Y1;
		return a.length > 0 && n - this.prevTime < i && r == this.prevUserEvent && r && /^select($|\.)/.test(r) && q1(a[a.length - 1], t) ? this : new e(Z1(this.done, t), this.undone, n, r);
	}
	addMapping(t) {
		return new e($1(this.done, t), $1(this.undone, t), this.prevTime, this.prevUserEvent);
	}
	pop(e, t, n) {
		let r = e == 0 ? this.done : this.undone;
		if (r.length == 0) return null;
		let i = r[r.length - 1], a = i.selectionsAfter[0] || (i.startSelection ? i.startSelection.map(i.changes.invertedDesc, 1) : t.selection);
		if (n && i.selectionsAfter.length) return t.update({
			selection: i.selectionsAfter[i.selectionsAfter.length - 1],
			annotations: N1.of({
				side: e,
				rest: Q1(r),
				selection: a
			}),
			userEvent: e == 0 ? "select.undo" : "select.redo",
			scrollIntoView: !0
		});
		if (i.changes) {
			let n = r.length == 1 ? Y1 : r.slice(0, r.length - 1);
			return i.mapped && (n = $1(n, i.mapped)), t.update({
				changes: i.changes,
				selection: i.startSelection,
				effects: i.effects,
				annotations: N1.of({
					side: e,
					rest: n,
					selection: a
				}),
				filter: !1,
				userEvent: e == 0 ? "undo" : "redo",
				scrollIntoView: !0
			});
		}
		return null;
	}
};
n0.empty = /*@__PURE__*/ new n0(Y1, Y1);
var r0 = [
	{
		key: "Mod-z",
		run: B1,
		preventDefault: !0
	},
	{
		key: "Mod-y",
		mac: "Mod-Shift-z",
		run: V1,
		preventDefault: !0
	},
	{
		linux: "Ctrl-Shift-z",
		run: V1,
		preventDefault: !0
	},
	{
		key: "Mod-u",
		run: H1,
		preventDefault: !0
	},
	{
		key: "Alt-u",
		mac: "Mod-Shift-u",
		run: U1,
		preventDefault: !0
	}
];
function i0(e, t) {
	return z.create(e.ranges.map(t), e.mainIndex);
}
function a0(e, t) {
	return e.update({
		selection: t,
		scrollIntoView: !0,
		userEvent: "select"
	});
}
function o0({ state: e, dispatch: t }, n) {
	let r = i0(e.selection, n);
	return !r.eq(e.selection, !0) && (t(a0(e, r)), !0);
}
function s0(e, t) {
	return z.cursor(t ? e.to : e.from);
}
function c0(e, t) {
	return o0(e, (n) => n.empty ? e.moveByChar(n, t) : s0(n, t));
}
function l0(e) {
	return e.textDirectionAt(e.state.selection.main.head) == ju.LTR;
}
var u0 = (e) => c0(e, !l0(e)), d0 = (e) => c0(e, l0(e));
function f0(e, t) {
	return o0(e, (n) => n.empty ? e.moveByGroup(n, t) : s0(n, t));
}
var p0 = (e) => f0(e, !l0(e)), m0 = (e) => f0(e, l0(e));
typeof Intl < "u" && Intl.Segmenter;
function h0(e, t, n) {
	if (t.type.prop(n)) return !0;
	let r = t.to - t.from;
	return r && (r > 2 || /[^\s,.;:]/.test(e.sliceDoc(t.from, t.to))) || t.firstChild;
}
function g0(e, t, n) {
	let r = o_(e).resolveInner(t.head), i = n ? G.closedBy : G.openedBy;
	for (let a = t.head;;) {
		let t = n ? r.childAfter(a) : r.childBefore(a);
		if (!t) break;
		h0(e, t, i) ? r = t : a = n ? t.to : t.from;
	}
	let a = r.type.prop(i), o, s;
	return s = a && (o = n ? $_(e, r.from, 1) : $_(e, r.to, -1)) && o.matched ? n ? o.end.to : o.end.from : n ? r.to : r.from, z.cursor(s, n ? -1 : 1);
}
var _0 = (e) => o0(e, (t) => g0(e.state, t, !l0(e))), v0 = (e) => o0(e, (t) => g0(e.state, t, l0(e)));
function y0(e, t) {
	return o0(e, (n) => {
		if (!n.empty) return s0(n, t);
		let r = e.moveVertically(n, t);
		return r.head == n.head ? e.moveToLineBoundary(n, t) : r;
	});
}
var b0 = (e) => y0(e, !1), x0 = (e) => y0(e, !0);
function S0(e) {
	let t = e.scrollDOM.clientHeight < e.scrollDOM.scrollHeight - 2, n = 0, r = 0, i;
	if (t) {
		for (let t of e.state.facet(W.scrollMargins)) {
			let i = t(e);
			i?.top && (n = Math.max(i?.top, n)), i?.bottom && (r = Math.max(i?.bottom, r));
		}
		i = e.scrollDOM.clientHeight - n - r;
	} else i = (e.dom.ownerDocument.defaultView || window).innerHeight;
	return {
		marginTop: n,
		marginBottom: r,
		selfScroll: t,
		height: Math.max(e.defaultLineHeight, i - 5)
	};
}
function C0(e, t) {
	let n = S0(e), { state: r } = e, i = i0(r.selection, (r) => r.empty ? e.moveVertically(r, t, n.height) : s0(r, t));
	if (i.eq(r.selection)) return !1;
	let a;
	if (n.selfScroll) {
		let t = e.coordsAtPos(r.selection.main.head), o = e.scrollDOM.getBoundingClientRect(), s = o.top + n.marginTop, c = o.bottom - n.marginBottom;
		t && t.top > s && t.bottom < c && (a = W.scrollIntoView(i.main.head, {
			y: "start",
			yMargin: t.top - s
		}));
	}
	return e.dispatch(a0(r, i), { effects: a }), !0;
}
var w0 = (e) => C0(e, !1), T0 = (e) => C0(e, !0);
function E0(e, t, n) {
	let r = e.lineBlockAt(t.head), i = e.moveToLineBoundary(t, n);
	if (i.head == t.head && i.head != (n ? r.to : r.from) && (i = e.moveToLineBoundary(t, n, !1)), !n && i.head == r.from && r.length) {
		let n = /^\s*/.exec(e.state.sliceDoc(r.from, Math.min(r.from + 100, r.to)))[0].length;
		n && t.head != r.from + n && (i = z.cursor(r.from + n));
	}
	return i;
}
var D0 = (e) => o0(e, (t) => E0(e, t, !0)), O0 = (e) => o0(e, (t) => E0(e, t, !1)), k0 = (e) => o0(e, (t) => E0(e, t, !l0(e))), A0 = (e) => o0(e, (t) => E0(e, t, l0(e))), j0 = (e) => o0(e, (t) => e.moveToLineBoundary(t, !1, !1)), M0 = (e) => o0(e, (t) => e.moveToLineBoundary(t, !0, !1));
function N0(e, t, n) {
	let r = !1, i = i0(e.selection, (t) => {
		let i = $_(e, t.head, -1) || $_(e, t.head, 1) || t.head > 0 && $_(e, t.head - 1, 1) || t.head < e.doc.length && $_(e, t.head + 1, -1);
		if (!i || !i.end) return t;
		r = !0;
		let a = i.start.from == t.head ? i.end.to : i.end.from;
		return n ? z.range(t.anchor, a) : z.cursor(a);
	});
	return r ? (t(a0(e, i)), !0) : !1;
}
var P0 = ({ state: e, dispatch: t }) => N0(e, t, !1);
function F0(e, t, n) {
	let r = i0(e.state.selection, (e) => {
		e.undirectional && e.head >= e.anchor != t && (e = z.range(e.head, e.anchor));
		let r = n(e);
		return z.range(e.anchor, r.head, r.goalColumn, r.bidiLevel || void 0, r.assoc);
	});
	return !r.eq(e.state.selection) && (e.dispatch(a0(e.state, r)), !0);
}
function I0(e, t) {
	return F0(e, t, (n) => e.moveByChar(n, t));
}
var L0 = (e) => I0(e, !l0(e)), R0 = (e) => I0(e, l0(e));
function z0(e, t) {
	return F0(e, t, (n) => e.moveByGroup(n, t));
}
var B0 = (e) => z0(e, !l0(e)), V0 = (e) => z0(e, l0(e)), H0 = (e) => {
	let t = !l0(e);
	return F0(e, t, (n) => g0(e.state, n, t));
}, U0 = (e) => {
	let t = l0(e);
	return F0(e, t, (n) => g0(e.state, n, t));
};
function W0(e, t) {
	return F0(e, t, (n) => e.moveVertically(n, t));
}
var G0 = (e) => W0(e, !1), K0 = (e) => W0(e, !0);
function q0(e, t) {
	return F0(e, t, (n) => e.moveVertically(n, t, S0(e).height));
}
var J0 = (e) => q0(e, !1), Y0 = (e) => q0(e, !0), X0 = (e) => F0(e, !0, (t) => E0(e, t, !0)), Z0 = (e) => F0(e, !1, (t) => E0(e, t, !1)), Q0 = (e) => {
	let t = !l0(e);
	return F0(e, t, (n) => E0(e, n, t));
}, $0 = (e) => {
	let t = l0(e);
	return F0(e, t, (n) => E0(e, n, t));
}, ev = (e) => F0(e, !1, (t) => z.cursor(e.lineBlockAt(t.head).from)), tv = (e) => F0(e, !0, (t) => z.cursor(e.lineBlockAt(t.head).to)), nv = ({ state: e, dispatch: t }) => (t(a0(e, { anchor: 0 })), !0), rv = ({ state: e, dispatch: t }) => (t(a0(e, { anchor: e.doc.length })), !0), iv = ({ state: e, dispatch: t }) => (t(a0(e, {
	anchor: e.selection.main.anchor,
	head: 0
})), !0), av = ({ state: e, dispatch: t }) => (t(a0(e, {
	anchor: e.selection.main.anchor,
	head: e.doc.length
})), !0), ov = ({ state: e, dispatch: t }) => (t(e.update({
	selection: {
		anchor: 0,
		head: e.doc.length
	},
	userEvent: "select"
})), !0), sv = ({ state: e, dispatch: t }) => {
	let n = Ev(e).map(({ from: t, to: n }) => z.undirectionalRange(t, Math.min(n + 1, e.doc.length)));
	return t(e.update({
		selection: z.create(n),
		userEvent: "select"
	})), !0;
}, cv = ({ state: e, dispatch: t }) => {
	let n = i0(e.selection, (t) => {
		let n = o_(e), r = n.resolveStack(t.from, 1);
		if (t.empty) {
			let e = n.resolveStack(t.from, -1);
			e.node.from >= r.node.from && e.node.to <= r.node.to && (r = e);
		}
		for (let e = r; e; e = e.next) {
			let { node: n } = e;
			if ((n.from < t.from && n.to >= t.to || n.to > t.to && n.from <= t.from) && e.next) return z.undirectionalRange(n.from, n.to);
		}
		return t;
	});
	return !n.eq(e.selection) && (t(a0(e, n)), !0);
};
function lv(e, t) {
	let { state: n } = e, r = n.selection, i = n.selection.ranges.slice();
	for (let r of n.selection.ranges) {
		let a = n.doc.lineAt(r.head);
		if (t ? a.to < e.state.doc.length : a.from > 0) for (let n = r;;) {
			let r = e.moveVertically(n, t);
			if (r.head < a.from || r.head > a.to) {
				i.some((e) => e.head == r.head) || i.push(r);
				break;
			}
			if (r.head == n.head) break;
			n = r;
		}
	}
	return i.length != r.ranges.length && (e.dispatch(a0(n, z.create(i, i.length - 1))), !0);
}
var uv = (e) => lv(e, !1), dv = (e) => lv(e, !0), fv = ({ state: e, dispatch: t }) => {
	let n = e.selection, r = null;
	return n.ranges.length > 1 ? r = z.create([n.main]) : n.main.empty || (r = z.create([z.cursor(n.main.head)])), r ? (t(a0(e, r)), !0) : !1;
};
function pv(e, t) {
	if (e.state.readOnly) return !1;
	let n = "delete.selection", { state: r } = e, i = r.changeByRange((r) => {
		let { from: i, to: a } = r;
		if (i == a) {
			let o = t(r);
			o < i ? (n = "delete.backward", o = mv(e, o, !1)) : o > i && (n = "delete.forward", o = mv(e, o, !0)), i = Math.min(i, o), a = Math.max(a, o);
		} else i = mv(e, i, !1), a = mv(e, a, !0);
		return i == a ? { range: r } : {
			changes: {
				from: i,
				to: a
			},
			range: z.cursor(i, i < r.head ? -1 : 1)
		};
	});
	return !i.changes.empty && (e.dispatch(r.update(i, {
		scrollIntoView: !0,
		userEvent: n,
		effects: n == "delete.selection" ? W.announce.of(r.phrase("Selection deleted")) : void 0
	})), !0);
}
function mv(e, t, n) {
	if (e instanceof W) for (let r of e.state.facet(W.atomicRanges).map((t) => t(e))) r.between(t, t, (e, r) => {
		e < t && r > t && (t = n ? r : e);
	});
	return t;
}
var hv = (e, t, n) => pv(e, (r) => {
	let i = r.from, { state: a } = e, o = a.doc.lineAt(i), s, c;
	if (n && !t && i > o.from && i < o.from + 200 && !/[^ \t]/.test(s = o.text.slice(0, i - o.from))) {
		if (s[s.length - 1] == "	") return i - 1;
		let e = ul(s, a.tabSize) % b_(a) || b_(a);
		for (let t = 0; t < e && s[s.length - 1 - t] == " "; t++) i--;
		c = i;
	} else c = Ls(o.text, i - o.from, t, t) + o.from, c == i && o.number != (t ? a.doc.lines : 1) ? c += t ? 1 : -1 : !t && /[\ufe00-\ufe0f]/.test(o.text.slice(c - o.from, i - o.from)) && (c = Ls(o.text, c - o.from, !1, !1) + o.from);
	return c;
}), gv = (e) => hv(e, !1, !0), _v = (e) => hv(e, !0, !1), vv = (e, t) => pv(e, (n) => {
	let r = n.head, { state: i } = e, a = i.doc.lineAt(r), o = i.charCategorizer(r);
	for (let e = null;;) {
		if (r == (t ? a.to : a.from)) {
			r == n.head && a.number != (t ? i.doc.lines : 1) && (r += t ? 1 : -1);
			break;
		}
		let s = Ls(a.text, r - a.from, t) + a.from, c = a.text.slice(Math.min(r, s) - a.from, Math.max(r, s) - a.from), l = o(c);
		if (e != null && l != e) break;
		(c != " " || r != n.head) && (e = l), r = s;
	}
	return r;
}), yv = (e) => vv(e, !1), bv = (e) => vv(e, !0), xv = (e) => pv(e, (t) => {
	let n = e.lineBlockAt(t.head).to;
	return t.head < n ? n : Math.min(e.state.doc.length, t.head + 1);
}), Sv = (e) => pv(e, (t) => {
	let n = e.moveToLineBoundary(t, !1).head;
	return t.head > n ? n : Math.max(0, t.head - 1);
}), Cv = (e) => pv(e, (t) => {
	let n = e.moveToLineBoundary(t, !0).head;
	return t.head < n ? n : Math.min(e.state.doc.length, t.head + 1);
}), wv = ({ state: e, dispatch: t }) => {
	if (e.readOnly) return !1;
	let n = e.changeByRange((e) => ({
		changes: {
			from: e.from,
			to: e.to,
			insert: R.of(["", ""])
		},
		range: z.cursor(e.from)
	}));
	return t(e.update(n, {
		scrollIntoView: !0,
		userEvent: "input"
	})), !0;
}, Tv = ({ state: e, dispatch: t }) => {
	if (e.readOnly) return !1;
	let n = e.changeByRange((t) => {
		if (!t.empty || t.from == 0 || t.from == e.doc.length) return { range: t };
		let n = t.from, r = e.doc.lineAt(n), i = n == r.from ? n - 1 : Ls(r.text, n - r.from, !1) + r.from, a = n == r.to ? n + 1 : Ls(r.text, n - r.from, !0) + r.from;
		return {
			changes: {
				from: i,
				to: a,
				insert: e.doc.slice(n, a).append(e.doc.slice(i, n))
			},
			range: z.cursor(a)
		};
	});
	return !n.changes.empty && (t(e.update(n, {
		scrollIntoView: !0,
		userEvent: "move.character"
	})), !0);
};
function Ev(e) {
	let t = [], n = -1;
	for (let r of e.selection.ranges) {
		let i = e.doc.lineAt(r.from), a = e.doc.lineAt(r.to);
		if (!r.empty && r.to == a.from && (a = e.doc.lineAt(r.to - 1)), n >= i.number) {
			let e = t[t.length - 1];
			e.to = a.to, e.ranges.push(r);
		} else t.push({
			from: i.from,
			to: a.to,
			ranges: [r]
		});
		n = a.number + 1;
	}
	return t;
}
function Dv(e, t, n) {
	if (e.readOnly) return !1;
	let r = [], i = [];
	for (let t of Ev(e)) {
		if (n ? t.to == e.doc.length : t.from == 0) continue;
		let a = e.doc.lineAt(n ? t.to + 1 : t.from - 1), o = a.length + 1;
		if (n) {
			r.push({
				from: t.to,
				to: a.to
			}, {
				from: t.from,
				insert: a.text + e.lineBreak
			});
			for (let n of t.ranges) i.push(z.range(Math.min(e.doc.length, n.anchor + o), Math.min(e.doc.length, n.head + o)));
		} else {
			r.push({
				from: a.from,
				to: t.from
			}, {
				from: t.to,
				insert: e.lineBreak + a.text
			});
			for (let e of t.ranges) i.push(z.range(e.anchor - o, e.head - o));
		}
	}
	return r.length ? (t(e.update({
		changes: r,
		scrollIntoView: !0,
		selection: z.create(i, e.selection.mainIndex),
		userEvent: "move.line"
	})), !0) : !1;
}
var Ov = ({ state: e, dispatch: t }) => Dv(e, t, !1), kv = ({ state: e, dispatch: t }) => Dv(e, t, !0);
function Av(e, t, n) {
	if (e.readOnly) return !1;
	let r = [];
	for (let t of Ev(e)) n ? r.push({
		from: t.from,
		insert: e.doc.slice(t.from, t.to) + e.lineBreak
	}) : r.push({
		from: t.to,
		insert: e.lineBreak + e.doc.slice(t.from, t.to)
	});
	let i = e.changes(r);
	return t(e.update({
		changes: i,
		selection: e.selection.map(i, n ? 1 : -1),
		scrollIntoView: !0,
		userEvent: "input.copyline"
	})), !0;
}
var jv = ({ state: e, dispatch: t }) => Av(e, t, !1), Mv = ({ state: e, dispatch: t }) => Av(e, t, !0), Nv = (e) => {
	if (e.state.readOnly) return !1;
	let { state: t } = e, n = t.changes(Ev(t).map(({ from: e, to: n }) => (e > 0 ? e-- : n < t.doc.length && n++, {
		from: e,
		to: n
	}))), r = i0(t.selection, (t) => {
		let n;
		if (e.lineWrapping) {
			let r = e.lineBlockAt(t.head), i = e.coordsAtPos(t.head, t.assoc || 1);
			i && (n = r.bottom + e.documentTop - i.bottom + e.defaultLineHeight / 2);
		}
		return e.moveVertically(t, !0, n);
	}).map(n);
	return e.dispatch({
		changes: n,
		selection: r,
		scrollIntoView: !0,
		userEvent: "delete.line"
	}), !0;
};
function Pv(e, t) {
	if (/\(\)|\[\]|\{\}/.test(e.sliceDoc(t - 1, t + 1))) return {
		from: t,
		to: t
	};
	let n = o_(e).resolveInner(t), r = n.childBefore(t), i = n.childAfter(t), a;
	return r && i && r.to <= t && i.from >= t && (a = r.type.prop(G.closedBy)) && a.indexOf(i.name) > -1 && e.doc.lineAt(r.to).from == e.doc.lineAt(i.from).from && !/\S/.test(e.sliceDoc(r.to, i.from)) ? {
		from: r.to,
		to: i.from
	} : null;
}
var Fv = /*@__PURE__*/ Lv(!1), Iv = /*@__PURE__*/ Lv(!0);
function Lv(e) {
	return ({ state: t, dispatch: n }) => {
		if (t.readOnly) return !1;
		let r = t.changeByRange((n) => {
			let { from: r, to: i } = n, a = t.doc.lineAt(r), o = !e && r == i && Pv(t, r);
			e && (r = i = (i <= a.to ? a : t.doc.lineAt(i)).to);
			let s = new C_(t, {
				simulateBreak: r,
				simulateDoubleBreak: !!o
			}), c = S_(s, r);
			for (c ??= ul(/^\s*/.exec(t.doc.lineAt(r).text)[0], t.tabSize); i < a.to && /\s/.test(a.text[i - a.from]);) i++;
			o ? {from: r, to: i} = o : r > a.from && r < a.from + 100 && !/\S/.test(a.text.slice(0, r)) && (r = a.from);
			let l = ["", x_(t, c)];
			return o && l.push(x_(t, s.lineIndent(a.from, -1))), {
				changes: {
					from: r,
					to: i,
					insert: R.of(l)
				},
				range: z.cursor(r + 1 + l[1].length)
			};
		});
		return n(t.update(r, {
			scrollIntoView: !0,
			userEvent: "input"
		})), !0;
	};
}
function Rv(e, t) {
	let n = -1;
	return e.changeByRange((r) => {
		let i = [];
		for (let a = r.from; a <= r.to;) {
			let o = e.doc.lineAt(a);
			o.number > n && (r.empty || r.to > o.from) && (t(o, i, r), n = o.number), a = o.to + 1;
		}
		let a = e.changes(i);
		return {
			changes: i,
			range: z.range(a.mapPos(r.anchor, 1), a.mapPos(r.head, 1))
		};
	});
}
var zv = ({ state: e, dispatch: t }) => {
	if (e.readOnly) return !1;
	let n = Object.create(null), r = new C_(e, { overrideIndentation: (e) => n[e] ?? -1 }), i = Rv(e, (t, i, a) => {
		let o = S_(r, t.from);
		if (o == null) return;
		/\S/.test(t.text) || (o = 0);
		let s = /^\s*/.exec(t.text)[0], c = x_(e, o);
		(s != c || a.from < t.from + s.length) && (n[t.from] = o, i.push({
			from: t.from,
			to: t.from + s.length,
			insert: c
		}));
	});
	return i.changes.empty || t(e.update(i, { userEvent: "indent" })), !0;
}, Bv = ({ state: e, dispatch: t }) => !e.readOnly && (t(e.update(Rv(e, (t, n) => {
	n.push({
		from: t.from,
		insert: e.facet(y_)
	});
}), { userEvent: "input.indent" })), !0), Vv = ({ state: e, dispatch: t }) => !e.readOnly && (t(e.update(Rv(e, (t, n) => {
	let r = /^\s*/.exec(t.text)[0];
	if (!r) return;
	let i = ul(r, e.tabSize), a = 0, o = x_(e, Math.max(0, i - b_(e)));
	for (; a < r.length && a < o.length && r.charCodeAt(a) == o.charCodeAt(a);) a++;
	n.push({
		from: t.from + a,
		to: t.from + r.length,
		insert: o.slice(a)
	});
}), { userEvent: "delete.dedent" })), !0), Hv = (e) => (e.setTabFocusMode(), !0), Uv = [
	{
		key: "Ctrl-b",
		run: u0,
		shift: L0,
		preventDefault: !0
	},
	{
		key: "Ctrl-f",
		run: d0,
		shift: R0
	},
	{
		key: "Ctrl-p",
		run: b0,
		shift: G0
	},
	{
		key: "Ctrl-n",
		run: x0,
		shift: K0
	},
	{
		key: "Ctrl-a",
		run: j0,
		shift: ev
	},
	{
		key: "Ctrl-e",
		run: M0,
		shift: tv
	},
	{
		key: "Ctrl-d",
		run: _v
	},
	{
		key: "Ctrl-h",
		run: gv
	},
	{
		key: "Ctrl-k",
		run: xv
	},
	{
		key: "Ctrl-Alt-h",
		run: yv
	},
	{
		key: "Ctrl-o",
		run: wv
	},
	{
		key: "Ctrl-t",
		run: Tv
	},
	{
		key: "Ctrl-v",
		run: T0
	}
], Wv = /*@__PURE__*/ [
	{
		key: "ArrowLeft",
		run: u0,
		shift: L0,
		preventDefault: !0
	},
	{
		key: "Mod-ArrowLeft",
		mac: "Alt-ArrowLeft",
		run: p0,
		shift: B0,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowLeft",
		run: k0,
		shift: Q0,
		preventDefault: !0
	},
	{
		key: "ArrowRight",
		run: d0,
		shift: R0,
		preventDefault: !0
	},
	{
		key: "Mod-ArrowRight",
		mac: "Alt-ArrowRight",
		run: m0,
		shift: V0,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowRight",
		run: A0,
		shift: $0,
		preventDefault: !0
	},
	{
		key: "ArrowUp",
		run: b0,
		shift: G0,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowUp",
		run: nv,
		shift: iv
	},
	{
		mac: "Ctrl-ArrowUp",
		run: w0,
		shift: J0
	},
	{
		key: "ArrowDown",
		run: x0,
		shift: K0,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowDown",
		run: rv,
		shift: av
	},
	{
		mac: "Ctrl-ArrowDown",
		run: T0,
		shift: Y0
	},
	{
		key: "PageUp",
		run: w0,
		shift: J0
	},
	{
		key: "PageDown",
		run: T0,
		shift: Y0
	},
	{
		key: "Home",
		run: O0,
		shift: Z0,
		preventDefault: !0
	},
	{
		key: "Mod-Home",
		run: nv,
		shift: iv
	},
	{
		key: "End",
		run: D0,
		shift: X0,
		preventDefault: !0
	},
	{
		key: "Mod-End",
		run: rv,
		shift: av
	},
	{
		key: "Enter",
		run: Fv,
		shift: Fv
	},
	{
		key: "Mod-a",
		run: ov
	},
	{
		key: "Backspace",
		run: gv,
		shift: gv,
		preventDefault: !0
	},
	{
		key: "Delete",
		run: _v,
		preventDefault: !0
	},
	{
		key: "Mod-Backspace",
		mac: "Alt-Backspace",
		run: yv,
		preventDefault: !0
	},
	{
		key: "Mod-Delete",
		mac: "Alt-Delete",
		run: bv,
		preventDefault: !0
	},
	{
		mac: "Mod-Backspace",
		run: Sv,
		preventDefault: !0
	},
	{
		mac: "Mod-Delete",
		run: Cv,
		preventDefault: !0
	}
].concat(/*@__PURE__*/ Uv.map((e) => ({
	mac: e.key,
	run: e.run,
	shift: e.shift
}))), Gv = /*@__PURE__*/ [
	{
		key: "Alt-ArrowLeft",
		mac: "Ctrl-ArrowLeft",
		run: _0,
		shift: H0
	},
	{
		key: "Alt-ArrowRight",
		mac: "Ctrl-ArrowRight",
		run: v0,
		shift: U0
	},
	{
		key: "Alt-ArrowUp",
		run: Ov
	},
	{
		key: "Shift-Alt-ArrowUp",
		run: jv
	},
	{
		key: "Alt-ArrowDown",
		run: kv
	},
	{
		key: "Shift-Alt-ArrowDown",
		run: Mv
	},
	{
		key: "Mod-Alt-ArrowUp",
		run: uv
	},
	{
		key: "Mod-Alt-ArrowDown",
		run: dv
	},
	{
		key: "Escape",
		run: fv
	},
	{
		key: "Mod-Enter",
		run: Iv
	},
	{
		key: "Alt-l",
		mac: "Ctrl-l",
		run: sv
	},
	{
		key: "Mod-i",
		run: cv,
		preventDefault: !0
	},
	{
		key: "Mod-[",
		run: Vv
	},
	{
		key: "Mod-]",
		run: Bv
	},
	{
		key: "Mod-Alt-\\",
		run: zv
	},
	{
		key: "Shift-Mod-k",
		run: Nv
	},
	{
		key: "Shift-Mod-\\",
		run: P0
	},
	{
		key: "Mod-/",
		run: S1
	},
	{
		key: "Alt-A",
		mac: "Ctrl-A",
		run: T1
	},
	{
		key: "Ctrl-m",
		mac: "Shift-Alt-m",
		run: Hv
	}
].concat(Wv), Kv = {
	key: "Tab",
	run: Bv,
	shift: Vv
}, qv = class e {
	constructor(e, t, n, r, i, a, o, s, c, l = 0, u) {
		this.p = e, this.stack = t, this.state = n, this.reducePos = r, this.pos = i, this.score = a, this.buffer = o, this.bufferBase = s, this.curContext = c, this.lookAhead = l, this.parent = u;
	}
	toString() {
		return `[${this.stack.filter((e, t) => t % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
	}
	static start(t, n, r = 0) {
		let i = t.parser.context;
		return new e(t, [], n, r, r, 0, [], 0, i ? new Jv(i, i.start) : null, 0, null);
	}
	get context() {
		return this.curContext ? this.curContext.context : null;
	}
	pushState(e, t) {
		this.stack.push(this.state, t, this.bufferBase + this.buffer.length), this.state = e;
	}
	reduce(e) {
		let t = e >> 19, n = e & 65535, { parser: r } = this.p, i = this.reducePos < this.pos - 25 && this.setLookAhead(this.pos), a = r.dynamicPrecedence(n);
		if (a && (this.score += a), t == 0) {
			n < r.minRepeatTerm && this.reducePos < this.pos && (this.reducePos = this.pos), this.pushState(r.getGoto(this.state, n, !0), this.reducePos), n < r.minRepeatTerm && this.storeNode(n, this.reducePos, this.reducePos, i ? 8 : 4, !0), this.reduceContext(n, this.reducePos);
			return;
		}
		let o = this.stack.length - (t - 1) * 3 - (e & 262144 ? 6 : 0), s = o ? this.stack[o - 2] : this.p.ranges[0].from;
		n < r.minRepeatTerm && s == this.reducePos && this.reducePos < this.pos && (this.reducePos = this.pos);
		let c = this.reducePos - s;
		c >= 2e3 && !this.p.parser.nodeSet.types[n]?.isAnonymous && (s == this.p.lastBigReductionStart ? (this.p.bigReductionCount++, this.p.lastBigReductionSize = c) : this.p.lastBigReductionSize < c && (this.p.bigReductionCount = 1, this.p.lastBigReductionStart = s, this.p.lastBigReductionSize = c));
		let l = o ? this.stack[o - 1] : 0, u = this.bufferBase + this.buffer.length - l;
		if (n < r.minRepeatTerm || e & 131072) {
			let e = r.stateFlag(this.state, 1) ? this.pos : this.reducePos;
			this.storeNode(n, s, e, u + 4, !0);
		}
		if (e & 262144) this.state = this.stack[o];
		else {
			let e = this.stack[o - 3];
			this.state = r.getGoto(e, n, !0);
		}
		for (; this.stack.length > o;) this.stack.pop();
		this.reduceContext(n, s);
	}
	storeNode(e, t, n, r = 4, i = !1) {
		if (e == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
			let e = this.buffer.length;
			if (e > 0 && this.buffer[e - 4] == 0 && this.buffer[e - 1] > -1) {
				if (t == n) return;
				if (this.buffer[e - 2] >= t) {
					this.buffer[e - 2] = n;
					return;
				}
			}
		}
		if (!i || this.pos == n) this.buffer.push(e, t, n, r);
		else {
			let i = this.buffer.length;
			if (i > 0 && (this.buffer[i - 4] != 0 || this.buffer[i - 1] < 0)) {
				let e = !1;
				for (let t = i; t > 0 && this.buffer[t - 2] > n; t -= 4) if (this.buffer[t - 1] >= 0) {
					e = !0;
					break;
				}
				if (e) for (; i > 0 && this.buffer[i - 2] > n;) this.buffer[i] = this.buffer[i - 4], this.buffer[i + 1] = this.buffer[i - 3], this.buffer[i + 2] = this.buffer[i - 2], this.buffer[i + 3] = this.buffer[i - 1], i -= 4, r > 4 && (r -= 4);
			}
			this.buffer[i] = e, this.buffer[i + 1] = t, this.buffer[i + 2] = n, this.buffer[i + 3] = r;
		}
	}
	shift(e, t, n, r) {
		if (e & 131072) this.pushState(e & 65535, this.pos);
		else if (e & 262144) this.pos = r, this.shiftContext(t, n), t <= this.p.parser.maxNode && this.buffer.push(t, n, r, 4);
		else {
			let i = e, { parser: a } = this.p;
			this.pos = r;
			let o = a.stateFlag(i, 1);
			!o && (r > n || t <= a.maxNode) && (this.reducePos = r), this.pushState(i, o ? n : Math.min(n, this.reducePos)), this.shiftContext(t, n), t <= a.maxNode && this.buffer.push(t, n, r, 4);
		}
	}
	apply(e, t, n, r) {
		e & 65536 ? this.reduce(e) : this.shift(e, t, n, r);
	}
	useNode(e, t, n) {
		let r = this.p.reused.length - 1;
		(r < 0 || this.p.reused[r] != e) && (this.p.reused.push(e), r++);
		let i = this.reducePos = this.pos = n + e.length;
		this.pushState(t, n), this.buffer.push(r, n, i, -1), this.curContext && this.updateContext(this.curContext.tracker.reuse(this.curContext.context, e, this, this.p.stream, this.pos - e.length));
	}
	split() {
		let t = this, n = t.buffer.length;
		for (n && t.buffer[n - 4] == 0 && (n -= 4); n > 0 && t.buffer[n - 2] > t.reducePos;) n -= 4;
		let r = t.buffer.slice(n), i = t.bufferBase + n;
		for (; t && i == t.bufferBase;) t = t.parent;
		return new e(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, r, i, this.curContext, this.lookAhead, t);
	}
	recoverByDelete(e, t) {
		let n = e <= this.p.parser.maxNode;
		n && this.storeNode(e, this.pos, t, 4), this.storeNode(0, this.pos, t, n ? 8 : 4), this.pos = this.reducePos = t, this.score -= 190;
	}
	canShift(e) {
		for (let t = new Yv(this);;) {
			let n = this.p.parser.stateSlot(t.state, 4) || this.p.parser.hasAction(t.state, e);
			if (n == 0) return !1;
			if (!(n & 65536)) return !0;
			t.reduce(n);
		}
	}
	recoverByInsert(e) {
		if (this.stack.length >= 300) return [];
		let t = this.p.parser.nextStates(this.state);
		if (t.length > 8 || this.stack.length >= 120) {
			let n = [];
			for (let r = 0, i; r < t.length; r += 2) (i = t[r + 1]) != this.state && this.p.parser.hasAction(i, e) && n.push(t[r], i);
			if (this.stack.length < 120) for (let e = 0; n.length < 8 && e < t.length; e += 2) {
				let r = t[e + 1];
				n.some((e, t) => t & 1 && e == r) || n.push(t[e], r);
			}
			t = n;
		}
		let n = [];
		for (let e = 0; e < t.length && n.length < 4; e += 2) {
			let r = t[e + 1];
			if (r == this.state) continue;
			let i = this.split();
			i.pushState(r, this.pos), i.storeNode(0, i.pos, i.pos, 4, !0), i.shiftContext(t[e], this.pos), i.reducePos = this.pos, i.score -= 200, n.push(i);
		}
		return n;
	}
	forceReduce() {
		let { parser: e } = this.p, t = e.stateSlot(this.state, 5);
		if (!(t & 65536)) return !1;
		if (!e.validAction(this.state, t)) {
			let n = t >> 19, r = t & 65535, i = this.stack.length - n * 3;
			if (i < 0 || e.getGoto(this.stack[i], r, !1) < 0) {
				let e = this.findForcedReduction();
				if (e == null) return !1;
				t = e;
			}
			this.storeNode(0, this.pos, this.pos, 4, !0), this.score -= 100;
		}
		return this.reducePos = this.pos, this.reduce(t), !0;
	}
	findForcedReduction() {
		let { parser: e } = this.p, t = [], n = (r, i) => {
			if (!t.includes(r)) return t.push(r), e.allActions(r, (t) => {
				if (!(t & 393216)) {
					if (t & 65536) {
						let n = (t >> 19) - i;
						if (n > 1) {
							let r = t & 65535, i = this.stack.length - n * 3;
							if (i >= 0 && e.getGoto(this.stack[i], r, !1) >= 0) return n << 19 | 65536 | r;
						}
					} else {
						let e = n(t, i + 1);
						if (e != null) return e;
					}
				}
			});
		};
		return n(this.state, 0);
	}
	forceAll() {
		for (; !this.p.parser.stateFlag(this.state, 2);) if (!this.forceReduce()) {
			this.storeNode(0, this.pos, this.pos, 4, !0);
			break;
		}
		return this;
	}
	get deadEnd() {
		if (this.stack.length != 3) return !1;
		let { parser: e } = this.p;
		return e.data[e.stateSlot(this.state, 1)] == 65535 && !e.stateSlot(this.state, 4);
	}
	restart() {
		this.storeNode(0, this.pos, this.pos, 4, !0), this.state = this.stack[0], this.stack.length = 0;
	}
	sameState(e) {
		if (this.state != e.state || this.stack.length != e.stack.length) return !1;
		for (let t = 0; t < this.stack.length; t += 3) if (this.stack[t] != e.stack[t]) return !1;
		return !0;
	}
	get parser() {
		return this.p.parser;
	}
	dialectEnabled(e) {
		return this.p.parser.dialect.flags[e];
	}
	shiftContext(e, t) {
		this.curContext && this.updateContext(this.curContext.tracker.shift(this.curContext.context, e, this, this.p.stream, t));
	}
	reduceContext(e, t) {
		this.curContext && this.updateContext(this.curContext.tracker.reduce(this.curContext.context, e, this, this.p.stream, t));
	}
	emitContext() {
		let e = this.buffer.length - 1;
		(e < 0 || this.buffer[e] != -3) && this.storeNode(this.curContext.hash, this.reducePos, this.reducePos, -3, !0);
	}
	emitLookAhead() {
		let e = this.buffer.length - 1;
		(e < 0 || this.buffer[e] != -4) && this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
	}
	updateContext(e) {
		if (e != this.curContext.context) {
			let t = new Jv(this.curContext.tracker, e);
			t.hash != this.curContext.hash && this.emitContext(), this.curContext = t;
		}
	}
	setLookAhead(e) {
		return e <= this.lookAhead ? !1 : (this.emitLookAhead(), this.lookAhead = e, !0);
	}
	close() {
		this.curContext && this.curContext.tracker.strict && this.emitContext(), this.lookAhead > 0 && this.emitLookAhead();
	}
}, Jv = class {
	constructor(e, t) {
		this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
	}
}, Yv = class {
	constructor(e) {
		this.start = e, this.state = e.state, this.stack = e.stack, this.base = this.stack.length;
	}
	reduce(e) {
		let t = e & 65535, n = e >> 19;
		n == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (n - 1) * 3;
		let r = this.start.p.parser.getGoto(this.stack[this.base - 3], t, !0);
		this.state = r;
	}
}, Xv = class e {
	constructor(e, t, n) {
		this.stack = e, this.pos = t, this.index = n, this.buffer = e.buffer, this.index == 0 && this.maybeNext();
	}
	static create(t, n = t.bufferBase + t.buffer.length) {
		return new e(t, n, n - t.bufferBase);
	}
	maybeNext() {
		let e = this.stack.parent;
		e != null && (this.index = this.stack.bufferBase - e.bufferBase, this.stack = e, this.buffer = e.buffer);
	}
	get id() {
		return this.buffer[this.index - 4];
	}
	get start() {
		return this.buffer[this.index - 3];
	}
	get end() {
		return this.buffer[this.index - 2];
	}
	get size() {
		return this.buffer[this.index - 1];
	}
	next() {
		this.index -= 4, this.pos -= 4, this.index == 0 && this.maybeNext();
	}
	fork() {
		return new e(this.stack, this.pos, this.index);
	}
};
function Zv(e, t = Uint16Array) {
	if (typeof e != "string") return e;
	let n = null;
	for (let r = 0, i = 0; r < e.length;) {
		let a = 0;
		for (;;) {
			let t = e.charCodeAt(r++), n = !1;
			if (t == 126) {
				a = 65535;
				break;
			}
			t >= 92 && t--, t >= 34 && t--;
			let i = t - 32;
			if (i >= 46 && (i -= 46, n = !0), a += i, n) break;
			a *= 46;
		}
		n ? n[i++] = a : n = new t(a);
	}
	return n;
}
var Qv = class {
	constructor() {
		this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
	}
}, $v = new Qv(), ey = class {
	constructor(e, t) {
		this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = $v, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
	}
	resolveOffset(e, t) {
		let n = this.range, r = this.rangeIndex, i = this.pos + e;
		for (; i < n.from;) {
			if (!r) return null;
			let e = this.ranges[--r];
			i -= n.from - e.to, n = e;
		}
		for (; t < 0 ? i > n.to : i >= n.to;) {
			if (r == this.ranges.length - 1) return null;
			let e = this.ranges[++r];
			i += e.from - n.to, n = e;
		}
		return i;
	}
	clipPos(e) {
		if (e >= this.range.from && e < this.range.to) return e;
		for (let t of this.ranges) if (t.to > e) return Math.max(e, t.from);
		return this.end;
	}
	peek(e) {
		let t = this.chunkOff + e, n, r;
		if (t >= 0 && t < this.chunk.length) n = this.pos + e, r = this.chunk.charCodeAt(t);
		else {
			let t = this.resolveOffset(e, 1);
			if (t == null) return -1;
			if (n = t, n >= this.chunk2Pos && n < this.chunk2Pos + this.chunk2.length) r = this.chunk2.charCodeAt(n - this.chunk2Pos);
			else {
				let e = this.rangeIndex, t = this.range;
				for (; t.to <= n;) t = this.ranges[++e];
				this.chunk2 = this.input.chunk(this.chunk2Pos = n), n + this.chunk2.length > t.to && (this.chunk2 = this.chunk2.slice(0, t.to - n)), r = this.chunk2.charCodeAt(0);
			}
		}
		return n >= this.token.lookAhead && (this.token.lookAhead = n + 1), r;
	}
	acceptToken(e, t = 0) {
		let n = t ? this.resolveOffset(t, -1) : this.pos;
		if (n == null || n < this.token.start) throw RangeError("Token end out of bounds");
		this.token.value = e, this.token.end = n;
	}
	acceptTokenTo(e, t) {
		this.token.value = e, this.token.end = t;
	}
	getChunk() {
		if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
			let { chunk: e, chunkPos: t } = this;
			this.chunk = this.chunk2, this.chunkPos = this.chunk2Pos, this.chunk2 = e, this.chunk2Pos = t, this.chunkOff = this.pos - this.chunkPos;
		} else {
			this.chunk2 = this.chunk, this.chunk2Pos = this.chunkPos;
			let e = this.input.chunk(this.pos), t = this.pos + e.length;
			this.chunk = t > this.range.to ? e.slice(0, this.range.to - this.pos) : e, this.chunkPos = this.pos, this.chunkOff = 0;
		}
	}
	readNext() {
		return this.next = this.chunkOff >= this.chunk.length && (this.getChunk(), this.chunkOff == this.chunk.length) ? -1 : this.chunk.charCodeAt(this.chunkOff);
	}
	advance(e = 1) {
		for (this.chunkOff += e; this.pos + e >= this.range.to;) {
			if (this.rangeIndex == this.ranges.length - 1) return this.setDone();
			e -= this.range.to - this.pos, this.range = this.ranges[++this.rangeIndex], this.pos = this.range.from;
		}
		return this.pos += e, this.pos >= this.token.lookAhead && (this.token.lookAhead = this.pos + 1), this.readNext();
	}
	setDone() {
		return this.pos = this.chunkPos = this.end, this.range = this.ranges[this.rangeIndex = this.ranges.length - 1], this.chunk = "", this.next = -1;
	}
	reset(e, t) {
		if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = $v, this.pos != e) {
			if (this.pos = e, e == this.end) return this.setDone(), this;
			for (; e < this.range.from;) this.range = this.ranges[--this.rangeIndex];
			for (; e >= this.range.to;) this.range = this.ranges[++this.rangeIndex];
			e >= this.chunkPos && e < this.chunkPos + this.chunk.length ? this.chunkOff = e - this.chunkPos : (this.chunk = "", this.chunkOff = 0), this.readNext();
		}
		return this;
	}
	read(e, t) {
		if (e >= this.chunkPos && t <= this.chunkPos + this.chunk.length) return this.chunk.slice(e - this.chunkPos, t - this.chunkPos);
		if (e >= this.chunk2Pos && t <= this.chunk2Pos + this.chunk2.length) return this.chunk2.slice(e - this.chunk2Pos, t - this.chunk2Pos);
		if (e >= this.range.from && t <= this.range.to) return this.input.read(e, t);
		let n = "";
		for (let r of this.ranges) {
			if (r.from >= t) break;
			r.to > e && (n += this.input.read(Math.max(r.from, e), Math.min(r.to, t)));
		}
		return n;
	}
}, ty = class {
	constructor(e, t) {
		this.data = e, this.id = t;
	}
	token(e, t) {
		let { parser: n } = t.p;
		iy(this.data, e, t, this.id, n.data, n.tokenPrecTable);
	}
};
ty.prototype.contextual = ty.prototype.fallback = ty.prototype.extend = !1;
var ny = class {
	constructor(e, t, n) {
		this.precTable = t, this.elseToken = n, this.data = typeof e == "string" ? Zv(e) : e;
	}
	token(e, t) {
		let n = e.pos, r = 0;
		for (;;) {
			let n = e.next < 0, i = e.resolveOffset(1, 1);
			if (iy(this.data, e, t, 0, this.data, this.precTable), e.token.value > -1) break;
			if (this.elseToken == null) return;
			if (n || r++, i == null) break;
			e.reset(i, e.token);
		}
		r && (e.reset(n, e.token), e.acceptToken(this.elseToken, r));
	}
};
ny.prototype.contextual = ty.prototype.fallback = ty.prototype.extend = !1;
var ry = class {
	constructor(e, t = {}) {
		this.token = e, this.contextual = !!t.contextual, this.fallback = !!t.fallback, this.extend = !!t.extend;
	}
};
function iy(e, t, n, r, i, a) {
	let o = 0, s = 1 << r, { dialect: c } = n.p.parser;
	e: for (; (s & e[o]) != 0;) {
		let n = e[o + 1];
		for (let r = o + 3; r < n; r += 2) if ((e[r + 1] & s) > 0) {
			let n = e[r];
			if (c.allows(n) && (t.token.value == -1 || t.token.value == n || oy(n, t.token.value, i, a))) {
				t.acceptToken(n);
				break;
			}
		}
		let r = t.next, l = 0, u = e[o + 2];
		if (t.next < 0 && u > l && e[n + u * 3 - 3] == 65535) o = e[n + u * 3 - 1];
		else {
			for (; l < u;) {
				let i = l + u >> 1, a = n + i + (i << 1), s = e[a], c = e[a + 1] || 65536;
				if (r < s) u = i;
				else if (r >= c) l = i + 1;
				else {
					o = e[a + 2], t.advance();
					continue e;
				}
			}
			break;
		}
	}
}
function ay(e, t, n) {
	for (let r = t, i; (i = e[r]) != 65535; r++) if (i == n) return r - t;
	return -1;
}
function oy(e, t, n, r) {
	let i = ay(n, r, t);
	return i < 0 || ay(n, r, e) < i;
}
var sy = typeof process < "u" && process.env && /\bparse\b/.test(process.env.LOG), cy = null;
function ly(e, t, n) {
	let r = e.cursor(K.IncludeAnonymous);
	for (r.moveTo(t);;) if (!(n < 0 ? r.childBefore(t) : r.childAfter(t))) for (;;) {
		if ((n < 0 ? r.to < t : r.from > t) && !r.type.isError) return n < 0 ? Math.max(0, Math.min(r.to - 1, t - 25)) : Math.min(e.length, Math.max(r.from + 1, t + 25));
		if (n < 0 ? r.prevSibling() : r.nextSibling()) break;
		if (!r.parent()) return n < 0 ? 0 : e.length;
	}
}
var uy = class {
	constructor(e, t) {
		this.fragments = e, this.minRepeat = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.lastRepeat = null, this.lastRepeatPos = -1, this.nextFragment();
	}
	nextFragment() {
		let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
		if (e) {
			for (this.safeFrom = e.openStart ? ly(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? ly(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length;) this.trees.pop(), this.start.pop(), this.index.pop();
			this.trees.push(e.tree), this.start.push(-e.offset), this.index.push(0), this.nextStart = this.safeFrom;
		} else this.nextStart = 1e9;
	}
	nodeAt(e) {
		if (e < this.nextStart) return null;
		for (; this.fragment && this.safeTo <= e;) this.nextFragment();
		if (!this.fragment) return null;
		for (;;) {
			let t = this.trees.length - 1;
			if (t < 0) return this.nextFragment(), null;
			if (e < this.safeFrom) return null;
			let n = this.trees[t], r = this.index[t];
			if (r == n.children.length) {
				this.trees.pop(), this.start.pop(), this.index.pop();
				continue;
			}
			let i = n.children[r], a = this.start[t] + n.positions[r];
			if (a > e) return this.nextStart = a, null;
			if (i instanceof q) {
				let n = a > this.lastRepeatPos && i.type.id >= this.minRepeat;
				if (a == e || n) {
					let t = a + i.length, r;
					if (a >= this.safeFrom && t <= this.safeTo && (!(r = i.prop(G.lookAhead)) || t + r < this.fragment.to) && (n && (this.lastRepeat = i, this.lastRepeatPos = a), a == e)) return i;
				}
				this.index[t]++, a + i.length >= Math.max(this.safeFrom, e) && (this.trees.push(i), this.start.push(a), this.index.push(0));
			} else this.index[t]++, this.nextStart = a + i.length;
		}
	}
}, dy = class {
	constructor(e, t) {
		this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((e) => new Qv());
	}
	getActions(e) {
		let t = 0, n = null, { parser: r } = e.p, { tokenizers: i } = r, a = r.stateSlot(e.state, 3), o = e.curContext ? e.curContext.hash : 0, s = 0;
		for (let r = 0; r < i.length; r++) {
			if (!(1 << r & a)) continue;
			let c = i[r], l = this.tokens[r];
			if ((!n || c.fallback) && ((c.contextual || l.start != e.pos || l.mask != a || l.context != o) && (this.updateCachedToken(l, c, e), l.mask = a, l.context = o), l.lookAhead > l.end + 25 && (s = Math.max(l.lookAhead, s)), l.value != 0)) {
				let r = t;
				if (l.extended > -1 && (t = this.addActions(e, l.extended, l.end, t)), t = this.addActions(e, l.value, l.end, t), !c.extend && (n = l, t > r)) break;
			}
		}
		for (; this.actions.length > t;) this.actions.pop();
		return s && e.setLookAhead(s), !n && e.pos == this.stream.end && (n = new Qv(), n.value = e.p.parser.eofTerm, n.start = n.end = e.pos, t = this.addActions(e, n.value, n.end, t)), this.mainToken = n, this.actions;
	}
	getMainToken(e) {
		if (this.mainToken) return this.mainToken;
		let t = new Qv(), { pos: n, p: r } = e;
		return t.start = n, t.end = Math.min(n + 1, r.stream.end), t.value = n == r.stream.end ? r.parser.eofTerm : 0, t;
	}
	updateCachedToken(e, t, n) {
		let r = this.stream.clipPos(n.pos);
		if (t.token(this.stream.reset(r, e), n), e.value > -1) {
			let { parser: t } = n.p;
			for (let r = 0; r < t.specialized.length; r++) if (t.specialized[r] == e.value) {
				let i = t.specializers[r](this.stream.read(e.start, e.end), n);
				if (i >= 0 && n.p.parser.dialect.allows(i >> 1)) {
					i & 1 ? e.extended = i >> 1 : e.value = i >> 1;
					break;
				}
			}
		} else e.value = 0, e.end = this.stream.clipPos(r + 1);
	}
	putAction(e, t, n, r) {
		for (let t = 0; t < r; t += 3) if (this.actions[t] == e) return r;
		return this.actions[r++] = e, this.actions[r++] = t, this.actions[r++] = n, r;
	}
	addActions(e, t, n, r) {
		let { state: i } = e, { parser: a } = e.p, { data: o } = a;
		for (let e = 0; e < 2; e++) for (let s = a.stateSlot(i, e ? 2 : 1);; s += 3) {
			if (o[s] == 65535) {
				if (o[s + 1] == 1) s = yy(o, s + 2);
				else {
					r == 0 && o[s + 1] == 2 && (r = this.putAction(yy(o, s + 2), t, n, r));
					break;
				}
			}
			o[s] == t && (r = this.putAction(yy(o, s + 1), t, n, r));
		}
		return r;
	}
}, fy = class {
	constructor(e, t, n, r) {
		this.parser = e, this.input = t, this.ranges = r, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.lastBigReductionStart = -1, this.lastBigReductionSize = 0, this.bigReductionCount = 0, this.stream = new ey(t, r), this.tokens = new dy(e, this.stream), this.topTerm = e.top[1];
		let { from: i } = r[0];
		this.stacks = [qv.start(this, e.top[0], i)], this.fragments = n.length && this.stream.end - i > e.bufferLength * 4 ? new uy(n, e.minRepeatTerm) : null;
	}
	get parsedPos() {
		return this.minStackPos;
	}
	advance() {
		let e = this.stacks, t = this.minStackPos, n = this.stacks = [], r, i;
		if (this.bigReductionCount > 300 && e.length == 1) {
			let [t] = e;
			for (; t.forceReduce() && t.stack.length && t.stack[t.stack.length - 2] >= this.lastBigReductionStart;);
			this.bigReductionCount = this.lastBigReductionSize = 0;
		}
		for (let a = 0; a < e.length; a++) {
			let o = e[a];
			for (;;) {
				if (this.tokens.mainToken = null, o.pos > t) n.push(o);
				else if (this.advanceStack(o, n, e)) continue;
				else {
					r || (r = [], i = []), r.push(o);
					let e = this.tokens.getMainToken(o);
					i.push(e.value, e.end);
				}
				break;
			}
		}
		if (!n.length) {
			let e = r && by(r);
			if (e) return sy && console.log("Finish with " + this.stackID(e)), this.stackToTree(e);
			if (this.parser.strict) throw sy && r && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), SyntaxError("No parse at " + t);
			this.recovering ||= 5;
		}
		if (this.recovering && r) {
			let e = this.stoppedAt != null && r[0].pos > this.stoppedAt ? r[0] : this.runRecovery(r, i, n);
			if (e) return sy && console.log("Force-finish " + this.stackID(e)), this.stackToTree(e.forceAll());
		}
		if (this.recovering) {
			let e = this.recovering == 1 ? 1 : this.recovering * 3;
			if (n.length > e) for (n.sort((e, t) => t.score - e.score); n.length > e;) n.pop();
			n.some((e) => e.reducePos > t) && this.recovering--;
		} else if (n.length > 1) {
			e: for (let e = 0; e < n.length - 1; e++) {
				let t = n[e];
				for (let r = e + 1; r < n.length; r++) {
					let i = n[r];
					if (t.sameState(i) || t.buffer.length > 500 && i.buffer.length > 500) {
						if ((t.score - i.score || t.buffer.length - i.buffer.length) > 0) n.splice(r--, 1);
						else {
							n.splice(e--, 1);
							continue e;
						}
					}
				}
			}
			n.length > 12 && (n.sort((e, t) => t.score - e.score), n.splice(12, n.length - 12));
		}
		this.minStackPos = n[0].pos;
		for (let e = 1; e < n.length; e++) n[e].pos < this.minStackPos && (this.minStackPos = n[e].pos);
		return null;
	}
	stopAt(e) {
		if (this.stoppedAt != null && this.stoppedAt < e) throw RangeError("Can't move stoppedAt forward");
		this.stoppedAt = e;
	}
	tryReuse(e, t, n, r) {
		if (!n) return null;
		let i = e.curContext && e.curContext.tracker.strict, a = i ? e.curContext.hash : 0;
		for (; n;) {
			let o = this.parser.nodeSet.types[n.type.id] == n.type ? this.parser.getGoto(e.state, n.type.id) : -1;
			if (o > -1 && n.length && (!i || (n.prop(G.contextHash) || 0) == a)) return e.useNode(n, o, t), n;
			if (n.children.length == 0 || n.positions[0] > 0) break;
			let s = n.children[0];
			if (s instanceof q && (!r || s.type.id >= this.parser.minRepeatTerm)) n = s;
			else break;
		}
		return null;
	}
	advanceStack(e, t, n) {
		let r = e.pos, { parser: i } = this, a = sy ? this.stackID(e) + " -> " : "";
		if (this.stoppedAt != null && r > this.stoppedAt) return e.forceReduce() ? e : null;
		if (this.fragments) {
			let t = e.reducePos < r && e.buffer.length && e.buffer[e.buffer.length - 2] <= e.reducePos && this.fragments.lastRepeatPos == e.reducePos && this.tryReuse(e, e.reducePos, this.fragments.lastRepeat, !0) || this.tryReuse(e, r, this.fragments.nodeAt(r), !1);
			if (t) return sy && console.log(a + this.stackID(e) + ` (via reuse of ${i.getName(t.type.id)})`), !0;
		}
		let o = i.stateSlot(e.state, 4);
		if (o > 0) return e.reduce(o), sy && console.log(a + this.stackID(e) + ` (via always-reduce ${i.getName(o & 65535)})`), !0;
		if (e.stack.length >= 8400) for (; e.stack.length > 6e3 && e.forceReduce(););
		let s = this.tokens.getActions(e);
		for (let o = 0; o < s.length;) {
			let c = s[o++], l = s[o++], u = s[o++], d = o == s.length || !n, f = d ? e : e.split(), p = this.tokens.mainToken;
			if (f.apply(c, l, p ? p.start : f.pos, u), sy && console.log(a + this.stackID(f) + ` (via ${c & 65536 ? `reduce of ${i.getName(c & 65535)}` : "shift"} for ${i.getName(l)} @ ${r}${f == e ? "" : ", split"})`), d) return !0;
			f.pos > r ? t.push(f) : n.push(f);
		}
		return !1;
	}
	advanceFully(e, t) {
		let n = e.pos;
		for (;;) {
			if (!this.advanceStack(e, null, null)) return !1;
			if (e.pos > n) return py(e, t), !0;
		}
	}
	runRecovery(e, t, n) {
		let r = null, i = !1;
		for (let a = 0; a < e.length; a++) {
			let o = e[a], s = t[a << 1], c = t[(a << 1) + 1], l = sy ? this.stackID(o) + " -> " : "";
			if (o.deadEnd && (i || (i = !0, o.restart(), sy && console.log(l + this.stackID(o) + " (restarted)"), this.advanceFully(o, n)))) continue;
			let u = o.split(), d = l;
			for (let e = 0; e < 10 && u.forceReduce() && (sy && console.log(d + this.stackID(u) + " (via force-reduce)"), !this.advanceFully(u, n)); e++) sy && (d = this.stackID(u) + " -> ");
			for (let e of o.recoverByInsert(s)) sy && console.log(l + this.stackID(e) + " (via recover-insert)"), this.advanceFully(e, n);
			this.stream.end > o.pos ? (c == o.pos && (c++, s = 0), o.recoverByDelete(s, c), sy && console.log(l + this.stackID(o) + ` (via recover-delete ${this.parser.getName(s)})`), py(o, n)) : (!r || r.score < u.score) && (r = u);
		}
		return r;
	}
	stackToTree(e) {
		return e.close(), q.build({
			buffer: Xv.create(e),
			nodeSet: this.parser.nodeSet,
			topID: this.topTerm,
			maxBufferLength: this.parser.bufferLength,
			reused: this.reused,
			start: this.ranges[0].from,
			length: e.pos - this.ranges[0].from,
			minRepeatType: this.parser.minRepeatTerm
		});
	}
	stackID(e) {
		let t = (cy ||= /* @__PURE__ */ new WeakMap()).get(e);
		return t || cy.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
	}
};
function py(e, t) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (r.pos == e.pos && r.sameState(e)) {
			t[n].score < e.score && (t[n] = e);
			return;
		}
	}
	t.push(e);
}
var my = class {
	constructor(e, t, n) {
		this.source = e, this.flags = t, this.disabled = n;
	}
	allows(e) {
		return !this.disabled || this.disabled[e] == 0;
	}
}, hy = (e) => e;
function gy(e) {
	return e ? e.length < 3 ? e : (t, n, r, i, a) => e(t, n, r, i.reset(a)) : hy;
}
var _y = class {
	constructor(e) {
		this.start = e.start, this.shift = gy(e.shift), this.reduce = gy(e.reduce), this.reuse = gy(e.reuse), this.hash = e.hash || (() => 0), this.strict = e.strict !== !1;
	}
}, vy = class e extends og {
	constructor(e) {
		if (super(), this.wrappers = [], e.version != 14) throw RangeError(`Parser version (${e.version}) doesn't match runtime version (14)`);
		let t = e.nodeNames.split(" ");
		this.minRepeatTerm = t.length;
		for (let n = 0; n < e.repeatNodeCount; n++) t.push("");
		let n = Object.keys(e.topRules).map((t) => e.topRules[t][1]), r = [];
		for (let e = 0; e < t.length; e++) r.push([]);
		function i(e, t, n) {
			r[e].push([t, t.deserialize(String(n))]);
		}
		if (e.nodeProps) for (let t of e.nodeProps) {
			let e = t[0];
			typeof e == "string" && (e = G[e]);
			for (let n = 1; n < t.length;) {
				let r = t[n++];
				if (r >= 0) i(r, e, t[n++]);
				else {
					let a = t[n + -r];
					for (let o = -r; o > 0; o--) i(t[n++], e, a);
					n++;
				}
			}
		}
		this.nodeSet = new Ih(t.map((t, i) => Fh.define({
			name: i >= this.minRepeatTerm ? void 0 : t,
			id: i,
			props: r[i],
			top: n.indexOf(i) > -1,
			error: i == 0,
			skipped: e.skippedNodes && e.skippedNodes.indexOf(i) > -1
		}))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = !1, this.bufferLength = Ah;
		let a = Zv(e.tokenData);
		this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
		for (let e = 0; e < this.specializerSpecs.length; e++) this.specialized[e] = this.specializerSpecs[e].term;
		this.specializers = this.specializerSpecs.map(xy), this.states = Zv(e.states, Uint32Array), this.data = Zv(e.stateData), this.goto = Zv(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((e) => typeof e == "number" ? new ty(a, e) : e), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
	}
	createParse(e, t, n) {
		let r = new fy(this, e, t, n);
		for (let i of this.wrappers) r = i(r, e, t, n);
		return r;
	}
	getGoto(e, t, n = !1) {
		let r = this.goto;
		if (t >= r[0]) return -1;
		for (let i = r[t + 1];;) {
			let t = r[i++], a = t & 1, o = r[i++];
			if (a && n) return o;
			for (let n = i + (t >> 1); i < n; i++) if (r[i] == e) return o;
			if (a) return -1;
		}
	}
	hasAction(e, t) {
		let n = this.data;
		for (let r = 0; r < 2; r++) for (let i = this.stateSlot(e, r ? 2 : 1), a;; i += 3) {
			if ((a = n[i]) == 65535) {
				if (n[i + 1] == 1) a = n[i = yy(n, i + 2)];
				else if (n[i + 1] == 2) return yy(n, i + 2);
				else break;
			}
			if (a == t || a == 0) return yy(n, i + 1);
		}
		return 0;
	}
	stateSlot(e, t) {
		return this.states[e * 6 + t];
	}
	stateFlag(e, t) {
		return (this.stateSlot(e, 0) & t) > 0;
	}
	validAction(e, t) {
		return !!this.allActions(e, (e) => e == t || null);
	}
	allActions(e, t) {
		let n = this.stateSlot(e, 4), r = n ? t(n) : void 0;
		for (let n = this.stateSlot(e, 1); r == null; n += 3) {
			if (this.data[n] == 65535) {
				if (this.data[n + 1] == 1) n = yy(this.data, n + 2);
				else break;
			}
			r = t(yy(this.data, n + 1));
		}
		return r;
	}
	nextStates(e) {
		let t = [];
		for (let n = this.stateSlot(e, 1);; n += 3) {
			if (this.data[n] == 65535) {
				if (this.data[n + 1] == 1) n = yy(this.data, n + 2);
				else break;
			}
			if (!(this.data[n + 2] & 1)) {
				let e = this.data[n + 1];
				t.some((t, n) => n & 1 && t == e) || t.push(this.data[n], e);
			}
		}
		return t;
	}
	configure(t) {
		let n = Object.assign(Object.create(e.prototype), this);
		if (t.props && (n.nodeSet = this.nodeSet.extend(...t.props)), t.top) {
			let e = this.topRules[t.top];
			if (!e) throw RangeError(`Invalid top rule name ${t.top}`);
			n.top = e;
		}
		return t.tokenizers && (n.tokenizers = this.tokenizers.map((e) => {
			let n = t.tokenizers.find((t) => t.from == e);
			return n ? n.to : e;
		})), t.specializers && (n.specializers = this.specializers.slice(), n.specializerSpecs = this.specializerSpecs.map((e, r) => {
			let i = t.specializers.find((t) => t.from == e.external);
			if (!i) return e;
			let a = Object.assign(Object.assign({}, e), { external: i.to });
			return n.specializers[r] = xy(a), a;
		})), t.contextTracker && (n.context = t.contextTracker), t.dialect && (n.dialect = this.parseDialect(t.dialect)), t.strict != null && (n.strict = t.strict), t.wrap && (n.wrappers = n.wrappers.concat(t.wrap)), t.bufferLength != null && (n.bufferLength = t.bufferLength), n;
	}
	hasWrappers() {
		return this.wrappers.length > 0;
	}
	getName(e) {
		return this.termNames ? this.termNames[e] : String(e <= this.maxNode && this.nodeSet.types[e].name || e);
	}
	get eofTerm() {
		return this.maxNode + 1;
	}
	get topNode() {
		return this.nodeSet.types[this.top[1]];
	}
	dynamicPrecedence(e) {
		let t = this.dynamicPrecedences;
		return t == null ? 0 : t[e] || 0;
	}
	parseDialect(e) {
		let t = Object.keys(this.dialects), n = t.map(() => !1);
		if (e) for (let r of e.split(" ")) {
			let e = t.indexOf(r);
			e >= 0 && (n[e] = !0);
		}
		let r = null;
		for (let e = 0; e < t.length; e++) if (!n[e]) for (let n = this.dialects[t[e]], i; (i = this.data[n++]) != 65535;) (r ||= new Uint8Array(this.maxTerm + 1))[i] = 1;
		return new my(e, n, r);
	}
	static deserialize(t) {
		return new e(t);
	}
};
function yy(e, t) {
	return e[t] | e[t + 1] << 16;
}
function by(e) {
	let t = null;
	for (let n of e) {
		let e = n.p.stoppedAt;
		(n.pos == n.p.stream.end || e != null && n.pos > e) && n.p.parser.stateFlag(n.state, 2) && (!t || t.score < n.score) && (t = n);
	}
	return t;
}
function xy(e) {
	if (e.external) {
		let t = +!!e.extend;
		return (n, r) => e.external(n, r) << 1 | t;
	}
	return e.get;
}
// node_modules/@lezer/css/dist/index.js
var Sy = 148, Cy = 1, wy = 149, Ty = 150, Ey = 2, Dy = 151, Oy = 3, ky = 4, Ay = 152, jy = [
	9,
	10,
	11,
	12,
	13,
	32,
	133,
	160,
	5760,
	8192,
	8193,
	8194,
	8195,
	8196,
	8197,
	8198,
	8199,
	8200,
	8201,
	8202,
	8232,
	8233,
	8239,
	8287,
	12288
], My = 58, Ny = 40, Py = 95, Fy = 91, Iy = 45, Ly = 46, Ry = 35, zy = 37, By = 38, Vy = 92, Hy = 10, Uy = 42;
function Wy(e) {
	return e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 161;
}
function Gy(e) {
	return e >= 48 && e <= 57;
}
function Ky(e) {
	return Gy(e) || e >= 97 && e <= 102 || e >= 65 && e <= 70;
}
var qy = (e, t, n) => (r, i) => {
	for (let a = !1, o = 0, s = 0;; s++) {
		let { next: c } = r;
		if (Wy(c) || c == Iy || c == Py || a && Gy(c)) !a && (c != Iy || s > 0) && (a = !0), o === s && c == Iy && o++, r.advance();
		else if (c == Vy && r.peek(1) != Hy) {
			if (r.advance(), Ky(r.next)) {
				do
					r.advance();
				while (Ky(r.next));
				r.next == 32 && r.advance();
			} else r.next > -1 && r.advance();
			a = !0;
		} else {
			a && r.acceptToken(o >= 2 && i.canShift(Ey) ? t : c == Ny ? n : e);
			break;
		}
	}
}, Jy = new ry(qy(wy, Ey, Ty), { contextual: !0 }), Yy = new ry(qy(Dy, Oy, ky), { contextual: !0 }), Xy = new ry((e) => {
	if (jy.includes(e.peek(-1))) {
		let { next: t } = e;
		(Wy(t) || t == Py || t == Ry || t == Ly || t == Uy || t == Fy || t == My && Wy(e.peek(1)) || t == Iy || t == By) && e.acceptToken(Sy);
	}
}), Zy = new ry((e) => {
	if (!jy.includes(e.peek(-1))) {
		let { next: t } = e;
		if (t == zy && (e.advance(), e.acceptToken(Cy)), Wy(t)) {
			do
				e.advance();
			while (Wy(e.next) || Gy(e.next));
			e.acceptToken(Cy);
		}
	}
});
function Qy(e) {
	let t = e.length;
	return (t == 4 || t == 5 || t == 7 || t == 9) && /^#[a-f\d]+$/i.test(e) ? Ay : -1;
}
var $y = Ag({
	"AtKeyword import charset namespace keyframes media supports font-feature-values": Y.definitionKeyword,
	"from to selector scope MatchFlag": Y.keyword,
	NamespaceName: Y.namespace,
	KeyframeName: Y.labelName,
	KeyframeRangeName: Y.operatorKeyword,
	TagName: Y.tagName,
	ClassName: Y.className,
	PseudoClassName: Y.constant(Y.className),
	IdName: Y.labelName,
	"FeatureName PropertyName": Y.propertyName,
	AttributeName: Y.attributeName,
	NumberLiteral: Y.number,
	KeywordQuery: Y.keyword,
	UnaryQueryOp: Y.operatorKeyword,
	"CallTag ValueName FontName": Y.atom,
	VariableName: Y.variableName,
	Callee: Y.operatorKeyword,
	Unit: Y.unit,
	"UniversalSelector NestingSelector": Y.definitionOperator,
	"MatchOp CompareOp": Y.compareOperator,
	"ChildOp SiblingOp, LogicOp": Y.logicOperator,
	BinOp: Y.arithmeticOperator,
	Important: Y.modifier,
	Comment: Y.blockComment,
	ColorLiteral: Y.color,
	"ParenthesizedContent StringLiteral": Y.string,
	":": Y.punctuation,
	PseudoOp: Y.derefOperator,
	"; , |": Y.separator,
	"( )": Y.paren,
	"[ ]": Y.squareBracket,
	"{ }": Y.brace
}), e2 = {
	__proto__: null,
	lang: 44,
	"nth-child": 44,
	"nth-last-child": 44,
	"nth-of-type": 44,
	"nth-last-of-type": 44,
	dir: 44,
	"host-context": 44,
	if: 88,
	url: 158,
	"url-prefix": 158,
	domain: 158,
	regexp: 158
}, t2 = {
	__proto__: null,
	or: 102,
	and: 102,
	not: 112,
	only: 112,
	layer: 212
}, n2 = {
	__proto__: null,
	selector: 118,
	style: 124,
	layer: 208
}, r2 = {
	__proto__: null,
	"@import": 204,
	"@media": 216,
	"@charset": 220,
	"@namespace": 224,
	"@keyframes": 230,
	"@supports": 242,
	"@scope": 246,
	"@font-feature-values": 252
}, i2 = {
	__proto__: null,
	to: 249
}, a2 = vy.deserialize({
	version: 14,
	states: "MrQYQdOOO$TQdOOP$[O`OOO%XQaO'#CfOOQP'#Ce'#CeO%`QdO'#CgO%eQ`O'#CgO%jQaO'#FrO&eQdO'#CkO'XQaO'#CcO'cQdO'#CnOOQP'#ES'#ESOOQP'#ER'#ERO'nQdO'#ETO'yQdO'#E[O'yQdO'#E_OOQP'#Fr'#FrO)`QhO'#FQOOQS'#Fq'#FqOOQS'#FT'#FTQYQdOOO)gQdO'#EeO*vQhO'#EkO)gQdO'#EmO*}QdO'#EoO+YQdO'#ErO*[QhO'#ExO+bQdO'#EzO+mQdO'#E}O+rQaO'#CfO+yQ`O'#EbO,OQ`O'#GPO,ZQdO'#GPQOQ`OOP,eO&jO'#CaPOOO)CAa)CAaOOQP'#Ci'#CiOOQP,59R,59RO%`QdO,59ROOQP'#Cm'#CmOOQP,59V,59VO&eQdO,59VO,pQdO,59YOOQP,5:m,5:mO'nQdO,5:oO'yQdO,5:vO'yQdO,5:xO'yQdO,5:yO'yQdO'#F[O,{Q`O,58}O-TQdO'#EaOOQS,58},58}OOQP'#Cq'#CqOOQO'#EP'#EPOOQP,59Y,59YO-[Q`O,59YO-aQ`O,59YO-fQpO'#EUO-qQdO'#EVO-vQ`O'#EVO-{QpO,5:oO.iQaO,5:vO/PQaO,5:yOOQW'#D]'#D]O0OQhO'#DgO0cQhO,5;lO*[QhO'#DeO0pQ`O'#DnO0uQhO'#D{OOQW'#Fx'#FxOOQS,5;l,5;lO0zQ`O'#DhO1PQ`O'#DkOOQS-E9R-E9ROOQ['#Cv'#CvO1UQdO'#CwO1iQdO'#C|O1|QdO'#DPOOQ['#DQ'#DQO2aQ!pO'#DRO4jQ!jO,5;POOQO'#DW'#DWO-aQ`O'#DVO4zQ!nO'#FuO6}Q`O'#DXO7SQ`O'#D|OOQ['#Fu'#FuO7XQhO'#GSO7gQ`O,5;VO7lQ!bO,5;XOOQS'#Eq'#EqO7tQ`O,5;ZO7yQdO,5;ZOOQO'#Et'#EtO8RQ`O,5;^O8WQhO,5;dO'yQdO'#DjOOQS,5;f,5;fO0zQ`O,5;fO8`QdO,5;fOOQS'#Fc'#FcO8hQdO'#FPO7gQ`O,5;iO8pQdO,5:|O9QQdO'#F^O9_Q`O,5<kO9_Q`O,5<kPOOO'#FS'#FSP9jO&jO,58{POOO,58{,58{OOQP1G.m1G.mOOQP1G.q1G.qOOQP1G.t1G.tO-[Q`O1G.tO-aQ`O1G.tO9uQpO1G0ZO9}QaO1G0bO:eQaO1G0dO:{QaO1G0eO;cQaO,5;vOOQO-E9Y-E9YOOQS1G.i1G.iO;mQ`O,5:{O;rQdO'#EQO;yQdO'#CuOOQO'#EX'#EXOOQO,5:q,5:qO-qQdO,5:qOOQP1G0Z1G0ZO)gQdO1G0ZO<QQ!jO'#D]O<`Q!bO,59xO<hQhO,5:ROOQO'#Dc'#DcOOQO'#Fy'#FyO<cQ!bO,59|O<pQhO'#FdO*[QhO,59zO*[QhO'#FdO=hQhO1G1WOOQS1G1W1G1WO=rQhO,5:PO>mQhO'#DoOOQW,5:Y,5:YOOQW,5:g,5:gOOQW,5:S,5:SO>wQhO,5:VO?cQ!fO'#FvOOQS'#Fv'#FvOOQS'#FV'#FVO@pQdO,59cOOQ[,59c,59cOATQdO,59hOOQ[,59h,59hOAhQdO,59kOOQ[,59k,59kOOQ[,59m,59mO)gQdO,59oOA{QhO'#EgOOQW'#Eg'#EgOBjQ`O1G0kO4sQhO1G0kOOQ[,59q,59qO*[QhO'#DZOOQ[,59s,59sOBoQ#tO,5:hOBzQhO'#F`OCXQ`O,5<nOOQS1G0q1G0qOOQS1G0s1G0sOOQS1G0u1G0uOCdQ`O1G0uOCiQdO'#EuOOQS1G0x1G0xOOQS1G1O1G1OOCtQaO,5:UO7gQ`O1G1QOOQS1G1Q1G1QO0zQ`O1G1QOOQS-E9a-E9aOOQS1G1T1G1TOC{Q!fO1G0hODcQ`O'#EdOOQO1G0h1G0hOOQO,5;x,5;xODhQdO,5;xOOQO-E9[-E9[ODuQ`O1G2VPOOO-E9Q-E9QPOOO1G.g1G.gOOQP7+$`7+$`OOQP7+%u7+%uO)gQdO7+%uOOQS1G0g1G0gOEQQaO'#F}OE[Q`O,5:lOEaQ!fO'#FUOF_QdO'#FtOFiQ`O,59aOOQO1G0]1G0]OFnQ!bO7+%uO)gQdO1G/dOFyQhO1G/hOOQW1G/m1G/mOOQW1G/f1G/fOG[QhO,5<OOOQW-E9b-E9bOOQS7+&r7+&rOHSQhO'#D]OHbQhO'#F|OHmQ`O'#F|OHrQ`O,5:ZOHwQ!bO'#D_O>wQhO'#DmOISQhO'#DsOI[QhO'#DuOIaQ!jO'#F{OOQO'#F{'#F{OIlQ`O'#DxOItQ!bO'#DzOOQO'#Fz'#FzOIyQ`O1G/qOOQS-E9T-E9TOOQ[1G.}1G.}OOQ[1G/S1G/SOOQ[1G/V1G/VOOQ[1G/Z1G/ZOJOQdO,5;ROOQS7+&V7+&VOJTQ`O7+&VOJYQhO'#D[OJbQ`O,59uO*[QhO,59uOOQ[1G0S1G0SOJjQ`O1G0SOJoQhO,5;zOOQO-E9^-E9^OOQS7+&a7+&aOJ}QbO'#DROOQO'#Ew'#EwOK]Q`O'#EvOOQO'#Ev'#EvOKhQ`O'#FaOKpQdO,5;aOOQS,5;a,5;aOOQ[1G/p1G/pOOQS7+&l7+&lO7gQ`O7+&lOK{Q!fO'#F]O)gQdO'#F]OMSQdO7+&SOOQO7+&S7+&SOOQO,5;O,5;OOOQO1G1d1G1dOMgQ!bO<<IaOMrQdO'#FZOM|Q`O,5<iOOQP1G0W1G0WOOQS-E9S-E9SONUQdO'#FYON`Q`O,5<`OOQ]1G.{1G.{OOQP<<Ia<<IaONhQ`O<<IaONmQdO7+%OOOQO'#D_'#D_ONtQ!bO7+%SON|QhO'#FXO! ZQ`O,5<hO)gQdO,5<hOOQW1G/u1G/uO! cQ`O,5:XO>wQhO'#DtOOQO,5:_,5:_O! hQhO,5:aO! pQhO,5:fO)gQdO,5:dOOQW7+%]7+%]OOQO'#Ei'#EiO! wQ`O1G0mOOQS<<Iq<<IqO)gQdO,59vO!!kQhO1G/aOOQ[1G/a1G/aO!!rQ`O1G/aOOQW-E9U-E9UOOQ[7+%n7+%nOOQO,5;b,5;bOClQdO'#FbOKhQ`O,5;{OOQS,5;{,5;{OOQS-E9_-E9_OOQS1G0{1G0{OOQS<<JW<<JWO!!zQ!fO,5;wOOQS-E9Z-E9ZOOQO<<In<<InOOQPAN>{AN>{O!$RQ`OAN>{O!$WQaO,5;uOOQO-E9X-E9XO!$bQdO,5;tOOQO-E9W-E9WOOQW<<Hj<<HjOOQW<<Hn<<HnO!$lQhO<<HnO!$}QhO'#D]O!%]QhO,5;sO!%hQ`O,5;sOOQO-E9V-E9VO!%mQdO1G2SO!%wQhO1G/sO!&PQ`O,5:`O>wQhO'#DwOOQO1G/{1G/{O!&UQ!bO1G0QO!&^QdO1G0OOJOQdO'#F_O!&eQ`O7+&XOOQW7+&X7+&XO!&mQ!bO1G/bOOQ[7+${7+${O!&xQhO7+${P!'PQ`O'#FWOOQO,5;|,5;|OOQO-E9`-E9`OOQS1G1g1G1gOOQPG24gG24gO!'UQ`OAN>YO)gQdO1G1_O!'ZQ`O7+'nOOQO1G/z1G/zO!'cQ`O,5:cO!'hQhO7+%lOOQO,5;y,5;yOOQO-E9]-E9]OOQW<<Is<<IsOOQ[<<Hg<<HgPOQW,5;r,5;rOOQWG23tG23tO!'oQdO7+&yOOQO1G/}1G/}OOQO<<IW<<IW",
	stateData: "!(R~O$`OS$aQQ~OWVO^`O`WOcYOdYOlaOo]O#P^O#S_O#YeO#`fO#bgO#dhO#giO#mjO#okO#rlO$ZRO$^ZO$gTO$rZO~OQnOWVO^`O`WOcYOdYOlaOo]O#P^O#S_O#YeO#`fO#bgO#dhO#giO#mjO#okO#rlO$ZmO$^ZO$gTO$rZO~O$X$sP~P!mO$arO~O`YXcYXdYXoYXrYX!eYX#PYX#SYX$YYX$^YX$g[X$rYX~OgYX~P$aO$ZtO~O$gvO~O$gvO`$fXc$fXd$fXo$fXr$fX!e$fX#P$fX#S$fX$Y$fX$^$fX$r$fXg$fX~O$ZwO~O`yOczOdzOo|O#P}O#S!PO$Y!OO$^ZO$rZO~Or!SO!e!QO~P&jOf!YO$Z!UO$[!VO~OW!]O$Z!ZO$g![O~OWVO^`O`WOcYOdYOo]O#P^O#S_O$ZRO$^ZO$gTO$rZO~OS!eOc!fOd!fOh!bOr!SO!Y!dO!]!iO!`!jO$]!aO~Om!hO~P(qOQ!uOh!mOo!nOr!oOv!xO|!vO!q!wO$Z!lO$[!sO$^!pO$k!qO~OS!eOc!fOd!fOh!bO!Y!dO!]!iO!`!jO$]!aO~Or$vP~P*[Ov!}O!q!wO$Z!|O~Ov#PO$Z#PO~Oh#SOr!SO#p#UO~O$Z#WO~Oc#VX~P$aOc#ZO~Om#[O$X$sXq$sX~O$X$sXq$sX~P!mO$b#_O$c#_O$d#aO~Of#fO$Z!UO$[!VO~Or!SO!e!QO~Oq$sP~P!mOh#oO~Oh#pO~On!xX!|!xX$g!zX~O$Z#qO~O$g#sO~On#tO!|#uO~O`yOczOdzOo|O$^ZO$rZO~Or#Oa!e#Oa#P#Oa#S#Oa$Y#Oag#Oa~P.TOr#Ra!e#Ra#P#Ra#S#Ra$Y#Rag#Ra~P.TOS!eOc!fOd!fOh!bO!Y!dO!]!iO!`!jO~OR#zOv#zO$]#vO$^#yO$k!qO~P/gOm$QO!T#}O!e$OO~P(qOh$SO~O$]$UO~Oh#SO~Oh$WO~O`$YOc$YOg$]Ol$YOm$YO~P)gO`$YOc$YOl$YOm$YOn$_O~P)gO`$YOc$YOl$YOm$YOq$aO~P)gOP$bOSuXcuXduXhuXmuXxuX!YuX!]uX!`uX#[uX#^uX$]uX!WuXQuX`uXguXluXouXruXvuX|uX!quX$ZuX$[uX$^uX$kuXnuXquX!euX$XuX$uuX!}uX~Ox$cO#[$dO#^$eOm$vP~P*[Oh#pOS$iXc$iXd$iXm$iXx$iX!Y$iX!]$iX!`$iX#[$iX#^$iX$]$iXQ$iX`$iXg$iXl$iXo$iXr$iXv$iX|$iX!q$iX$Z$iX$[$iX$^$iX$k$iXn$iXq$iX!e$iX$X$iX$u$iX!}$iX~Oh$iO~Oh$kO~O!T#}O!e$lOr$vXm$vX~Or!SO~Om$oOx$cO~Om$pO~Ov$qO!q!wO~Or$rO~Or!SO!T#}O~Or!SO#p$xO~O$Z#WOr#sX~O$u$|Om#Ua$X#Uaq#Ua~P)gOm$QX$X$QXq$QX~P!mOm#[O$X$saq$sa~O$b#_O$c#_O$d%TO~On%VO!|%WO~Or#Oi!e#Oi#P#Oi#S#Oi$Y#Oig#Oi~P.TOr#Qi!e#Qi#P#Qi#S#Qi$Y#Qig#Qi~P.TOr#Ri!e#Ri#P#Ri#S#Ri$Y#Rig#Ri~P.TOr$Oa!e$Oa~P&jOq%XO~Og$qP~P'yOg$hP~P)gOc!RXg!PX!T!PX!W!RX~Oc%aO!W%bO~Og%cO!T#}O~O!T#}OS$WXc$WXd$WXh$WXm$WXr$WX!Y$WX!]$WX!`$WX!e$WX$]$WX~Om%gO!e$OO~P(qO!T#}OS!Xac!Xad!Xah!Xam!Xar!Xa!Y!Xa!]!Xa!`!Xa!e!Xa$]!Xag!Xa~O$]%hOg$pP~P/gOR#zOS!eOh%mOv#zO!Y%nO$]%lO$^#yO$k!qO~Ox$cOQ$jX`$jXc$jXg$jXh$jXl$jXm$jXo$jXr$jXv$jX|$jX!q$jX$Z$jX$[$jX$^$jX$k$jXn$jXq$jX~O`$YOc$YOg%wOl$YOm$YO~P)gO`$YOc$YOl$YOm$YOn%xO~P)gO`$YOc$YOl$YOm$YOq%yO~P)gOh%{OS#ZXc#ZXd#ZXm#ZX!Y#ZX!]#ZX!`#ZX$]#ZX~Om%|O~Og&ROv&SO!r&SO~Or$SX!e$SXm$SX~P*[O!e$lOr$vam$va~Om&VO~Oq&^O$Z&XO$k&WO~Og&_O~P&jOx$cO!e&cO$u$|Om#Ui$X#Uiq#Ui~P)gO$t&fO~Om$Qa$X$Qaq$Qa~P!mOm#[O$X$siq$si~O!e&iOg$qX~P&jOg&kO~Ox$cOQ#xXg#xXh#xXo#xXr#xXv#xX|#xX!e#xX!q#xX$Z#xX$[#xX$^#xX$k#xX~O!e&mOg$hX~P)gOg&oO~On&pOx$cO!}&qO~OR#zOv#zO$]&sO$^#yO$k!qO~O!T#}OS$Wac$Wad$Wah$Wam$War$Wa!Y$Wa!]$Wa!`$Wa!e$Wa$]$Wa~Oc!dXg!PX!T!PX!e!PX~O!T#}O!e&uOg$pX~Oc&wO~Og&xO~Oc!mXg!mX!W!RX~OS!eOh&zO~O!T&|O~O!T&|O!W&}Og$oX~Oc'OOg!lX~O!W&}O~Og'PO~O$Z'QO~Om'SO~Oc'TO!T#}O~Og'VOm'UO~Og'YO~O!T#}Or$Sa!e$Sam$Sa~OP$bOruX!euXguX~O$k&WOr#jX!e#jX~Or!SO!e'[O~Oq'`O$Z&XO$k&WO~Ox$cOQ$PXh$PXm$PXo$PXr$PXv$PX|$PX!e$PX!q$PX$X$PX$Z$PX$[$PX$^$PX$k$PX$u$PXq$PX~O!e&cO$u$|Om#Uq$X#Uqq#Uq~P)gOn'eOx$cO!}'fO~Og#}X!e#}X~P'yO!e&iOg$qa~Og#|X!e#|X~P)gO!e&mOg$ha~On'eO~Og'kO~P)gOg'lO!W'mO~O$]'nOg#{X!e#{X~P/gO!e&uOg$pa~Og'sO~OS!eOh'uO~OS!eO~PFyO`'yOg'{O~OS#zac#zad#zah#za!Y#za!]#za!`#za$]#za~Og'}O~P!!POg'}Om(OO~Ox$cOQ$Pah$Pam$Pao$Par$Pav$Pa|$Pa!e$Pa!q$Pa$X$Pa$Z$Pa$[$Pa$^$Pa$k$Pa$u$Paq$Pa~On(TO~Og#}a!e#}a~P&jOg#|a!e#|a~P)gOR#zOv#zO$]&sO$^#yO$k&WO~Oc!fXg!PX!T!PX!e!PX~O!T#}Og#{a!e#{a~Oc(VO~O!e&uOg$pi~P)gOg!ai!T!ji~Og(XO~O!W(ZOg!ni~Og!li~P)gO`'yOg(^O~Ox$cOg!Oim!Oi~Og(_O~P!!POm(`O~Og(aO~O!e&uOg$pq~Og(cO~OS!eO~P!$lOg#{q!e#{q~P)gO$`!r$a$k`x#S~",
	goto: "8^$wPPPPP$xP${P%U%h%U%z&^P%UP&d%UPP&jPPP&p&z&zPPPP&zPP&z&z'jP&zP&z(m&zP)])`)f)f)x)fP)f*_P)fP)f)fP*j)fP*v*|+r+uP+x*v+{*v,O,U,X,_,X)f,ePP-Z-a%U-g%U.V.V.].aPP%UP%U%UP.g/c/p/w${P0QP0TP${P${P${P0Z${P0^0a0d0k${P${PP${P0p${P0s0y1Y1t2S2Y2d2j2p2v2|3W3^3d3j3p3vPPPPPPPPPPPP3|4VP4{5O6SP6[7U7k,X7w7zP7}PP8TRsQ_bOPdp!S#[%Pq`OP^_dp}!O!P!Q!S#S#[#o%P&iqSOP^_dp}!O!P!Q!S#S#[#o%P&iqUOP^_dp}!O!P!Q!S#S#[#o%P&iQuTR#bvQxWR#cyQ!WYR#dzQ#d!YS$h!t!uR%U#f!Z!xeg!m!n!o#Z#p#u$[$^$`$c${%W%]%a&c&d&m&r&w'O'T'i'r'x(V(b!Y!xeg!m!n!o#Z#p#u$[$^$`$c${%W%]%a&c&d&m&r&w'O'T'i'r'x(V(bb#z!b$W%b%m&z&}'m'u(ZU&Z$r&]'[R'Z&Y!Z!teg!m!n!o#Z#p#u$[$^$`$c${%W%]%a&c&d&m&r&w'O'T'i'r'x(V(bR$j!vQ&P$iR'W&Qq!gafj!b!c!d!r#}$O$P$S$g$i$l&Q&uQ#w!bW%s$W%m&z'uQ&t%bQ'w&}Q(U'mR(d(Zc#z!b$W%b%m&z&}'m'u(ZQ#VkQ$V!iQ$v#UR&a$xX%q$W%m&z'up!gafj!b!c!d!r#}$O$P$S$g$i$l&Q&uW%p$W%m&z'uQ&{%nQ'v&|Q'w&}R(d(ZR$T!eR%j$SR'p&uR&{%nX%o$W%m&z'uR'v&|X%t$W%m&z'uX%r$W%m&z'u!Y!xeg!m!n!o#Z#p#u$[$^$`$c${%W%]%a&c&d&m&r&w'O'T'i'r'x(V(bQ!}hR$q#OQ!XYR#ezQ#d!XR%U#ep[OP^_dp}!O!P!Q!S#S#[#o%P&ie{X!_!`#h#i#j#k$u%Y'gQ!^]R#g|T!]]|Q#r![R%_#sQ!TXQ!haQ#TkQ#m!RQ$Q!cQ$n!zQ$t#RQ$w#VQ$z#YQ%g$PQ&`$vQ'^&[Q'a&aR(S']SoP!SQ#^pQ%O#[R&g%PZnPp!S#[%PQ$}#ZQ&e${R'd&dR$g!rQ'R%{R(['yR#OhR#QiR$s#QS&[$r&]R(Q'[V&Y$r&]'[R#YlQ#`rR%S#`QdOSpP!SU!kdp%PR%P#[Q%]#p[&l%]&r'i'r'x(bQ&r%aQ'i&mQ'r&wQ'x'OR(b(VQ$[!mQ$^!nQ$`!oV%v$[$^$`Q&Q$iR'X&QQ&v%iS'q&v(WR(W'rQ&n%]R'j&nQ&j%YR'h&jQ!RXR#l!RQ&d${R'c&dQ#]oS%Q#]%RR%R#^Q'z'RR(]'zQ$m!yR&U$mQ&]$rR'_&]Q']&[R(R']Q#XlR$y#XQ$P!cR%f$P_cOPdp!S#[%P^XOPdp!S#[%PQ!_^Q!`_Q#h}Q#i!OQ#j!PQ#k!QQ$u#SQ%Y#oR'g&iR%^#pQ!reQ!{g[$X!m!n!o$[$^$`Q${#Zh%[#p%]%a&m&r&w'O'i'r'x(V(bQ%`#uQ%z$cS&b${&dQ&h%WQ'b&cR'|'T]$Z!m!n!o$[$^$`Q!caU!yf!r$gQ#RjQ#x!bS#|!c$PQ$R!dQ%d#}Q%e$OQ%i$SS&O$i&QQ&T$lR'o&uQ#{!bW%s$W%m&z'uQ&t%bQ'w&}Q(U'mR(d(ZQ%u$WQ&y%mQ't&zR(Y'uR%k$SR%Z#oQqPR#n!SQ!zfQ$f!rR%}$g",
	nodeNames: "⚠ Unit VariableName VariableName QueryCallee Comment StyleSheet RuleSet UniversalSelector TagSelector TagName NamespacedTagSelector NamespaceName TagName NestingSelector ClassSelector . ClassName PseudoClassSelector : :: PseudoClassName PseudoClassName ) ( ArgList ValueName ParenthesizedValue AtKeyword ; ] [ BracketedValue } { BracedValue ColorLiteral NumberLiteral StringLiteral BinaryExpression BinOp CallExpression Callee IfExpression if ArgList IfBranch KeywordQuery FeatureQuery FeatureName BinaryQuery LogicOp ComparisonQuery ColorLiteral CompareOp UnaryQuery UnaryQueryOp ParenthesizedQuery SelectorQuery selector ParenthesizedSelector StyleQuery style ParenthesedQuery CallQuery ArgList PropertyName , PropertyName UnaryQuery ParenthesedQuery BinaryQuery ParenthesedQuery ParenthesedQuery StyleFeature PropertyName StyleRange PseudoQuery CallLiteral CallTag ParenthesizedContent PseudoClassName ArgList IdSelector IdName AttributeSelector AttributeName NamespacedAttribute NamespaceName AttributeName MatchOp MatchFlag ChildSelector ChildOp DescendantSelector SiblingSelector SiblingOp Block Declaration PropertyName Important ImportStatement import Layer layer LayerName layer MediaStatement media CharsetStatement charset NamespaceStatement namespace NamespaceName KeyframesStatement keyframes KeyframeName KeyframeList KeyframeSelector KeyframeRangeName SupportsStatement supports ScopeStatement scope to FontFeatureStatement font-feature-values FontName AtRule Styles",
	maxTerm: 176,
	nodeProps: [
		[
			"isolate",
			-2,
			5,
			38,
			""
		],
		[
			"openedBy",
			23,
			"(",
			30,
			"[",
			33,
			"{"
		],
		[
			"closedBy",
			24,
			")",
			31,
			"]",
			34,
			"}"
		]
	],
	propSources: [$y],
	skippedNodes: [
		0,
		5,
		130
	],
	repeatNodeCount: 17,
	tokenData: "IO~R!bOX%ZX^&R^p%Zpq&Rqr)ers)vst+jtu/wuv%Zvw0qwx1Sxy2qyz3Sz{3X{|3r|}8e}!O8v!O!P9e!P!Q9|!Q![:u![!];p!]!^<l!^!_<}!_!`=y!`!a>^!a!b%Z!b!c?_!c!k%Z!k!lAl!l!u%Z!u!vAl!v!}%Z!}#OA}#O#P%Z#P#QB`#Q#R/w#R#]%Z#]#^Bq#^#g%Z#g#hAl#h#o%Z#o#pGU#p#qGg#q#rHO#r#sHa#s#y%Z#y#z&R#z$f%Z$f$g&R$g#BY%Z#BY#BZ&R#BZ$IS%Z$IS$I_&R$I_$I|%Z$I|$JO&R$JO$JT%Z$JT$JU&R$JU$KV%Z$KV$KW&R$KW&FU%Z&FU&FV&R&FV;'S%Z;'S;=`Hx<%lO%Z`%^SOy%jz;'S%j;'S;=`%{<%lO%j`%oS!r`Oy%jz;'S%j;'S;=`%{<%lO%j`&OP;=`<%l%j~&Wh$`~OX%jX^'r^p%jpq'rqy%jz#y%j#y#z'r#z$f%j$f$g'r$g#BY%j#BY#BZ'r#BZ$IS%j$IS$I_'r$I_$I|%j$I|$JO'r$JO$JT%j$JT$JU'r$JU$KV%j$KV$KW'r$KW&FU%j&FU&FV'r&FV;'S%j;'S;=`%{<%lO%j~'yh$`~!r`OX%jX^'r^p%jpq'rqy%jz#y%j#y#z'r#z$f%j$f$g'r$g#BY%j#BY#BZ'r#BZ$IS%j$IS$I_'r$I_$I|%j$I|$JO'r$JO$JT%j$JT$JU'r$JU$KV%j$KV$KW'r$KW&FU%j&FU&FV'r&FV;'S%j;'S;=`%{<%lO%jj)jS$uYOy%jz;'S%j;'S;=`%{<%lO%j~)yWOY)vZr)vrs*cs#O)v#O#P*h#P;'S)v;'S;=`+d<%lO)v~*hOv~~*kRO;'S)v;'S;=`*t;=`O)v~*wXOY)vZr)vrs*cs#O)v#O#P*h#P;'S)v;'S;=`+d;=`<%l)v<%lO)v~+gP;=`<%l)vj+maOy%jz}%j}!O,r!O!Q%j!Q![,r![!c%j!c!},r!}#O%j#O#P.O#P#R%j#R#S,r#S#T%j#T#o,r#o$g%j$g;'S,r;'S;=`/q<%lO,rj,ya$rY!r`Oy%jz}%j}!O,r!O!Q%j!Q![,r![!c%j!c!},r!}#O%j#O#P.O#P#R%j#R#S,r#S#T%j#T#o,r#o$g%j$g;'S,r;'S;=`/q<%lO,rj.TV!r`OY,rYZ%jZy,ryz.jz;'S,r;'S;=`/q<%lO,rY.oX$rY}!O.j!Q![.j!c!}.j#O#P/[#R#S.j#T#o.j$g;'S.j;'S;=`/k<%lO.jY/_SOY.jZ;'S.j;'S;=`/k<%lO.jY/nP;=`<%l.jj/tP;=`<%l,rd/zUOy%jz!_%j!_!`0^!`;'S%j;'S;=`%{<%lO%jd0eS!|S!r`Oy%jz;'S%j;'S;=`%{<%lO%jb0vS^QOy%jz;'S%j;'S;=`%{<%lO%j~1VWOY1SZw1Swx*cx#O1S#O#P1o#P;'S1S;'S;=`2k<%lO1S~1rRO;'S1S;'S;=`1{;=`O1S~2OXOY1SZw1Swx*cx#O1S#O#P1o#P;'S1S;'S;=`2k;=`<%l1S<%lO1S~2nP;=`<%l1Sj2vShYOy%jz;'S%j;'S;=`%{<%lO%j~3XOg~n3`UWQxWOy%jz!_%j!_!`0^!`;'S%j;'S;=`%{<%lO%jj3yWxW#SQOy%jz!O%j!O!P4c!P!Q%j!Q![7h![;'S%j;'S;=`%{<%lO%jj4hU!r`Oy%jz!Q%j!Q![4z![;'S%j;'S;=`%{<%lO%jj5RY!r`$kYOy%jz!Q%j!Q![4z![!g%j!g!h5q!h#X%j#X#Y5q#Y;'S%j;'S;=`%{<%lO%jj5vY!r`Oy%jz{%j{|6f|}%j}!O6f!O!Q%j!Q![6}![;'S%j;'S;=`%{<%lO%jj6kU!r`Oy%jz!Q%j!Q![6}![;'S%j;'S;=`%{<%lO%jj7UU!r`$kYOy%jz!Q%j!Q![6}![;'S%j;'S;=`%{<%lO%jj7o[!r`$kYOy%jz!O%j!O!P4z!P!Q%j!Q![7h![!g%j!g!h5q!h#X%j#X#Y5q#Y;'S%j;'S;=`%{<%lO%jj8jS!eYOy%jz;'S%j;'S;=`%{<%lO%jj8{WxWOy%jz!O%j!O!P4c!P!Q%j!Q![7h![;'S%j;'S;=`%{<%lO%jj9jU`YOy%jz!Q%j!Q![4z![;'S%j;'S;=`%{<%lO%j~:RTxWOy%jz{:b{;'S%j;'S;=`%{<%lO%j~:iS!r`$a~Oy%jz;'S%j;'S;=`%{<%lO%jj:z[$kYOy%jz!O%j!O!P4z!P!Q%j!Q![7h![!g%j!g!h5q!h#X%j#X#Y5q#Y;'S%j;'S;=`%{<%lO%jj;uUcYOy%jz![%j![!]<X!];'S%j;'S;=`%{<%lO%jj<`SdY!r`Oy%jz;'S%j;'S;=`%{<%lO%jj<qSmYOy%jz;'S%j;'S;=`%{<%lO%jh=SU!WWOy%jz!_%j!_!`=f!`;'S%j;'S;=`%{<%lO%jh=mS!WW!r`Oy%jz;'S%j;'S;=`%{<%lO%jl>QS!WW!|SOy%jz;'S%j;'S;=`%{<%lO%jj>eV#PQ!WWOy%jz!_%j!_!`=f!`!a>z!a;'S%j;'S;=`%{<%lO%jb?RS#PQ!r`Oy%jz;'S%j;'S;=`%{<%lO%jj?bYOy%jz}%j}!O@Q!O!c%j!c!}@o!}#T%j#T#o@o#o;'S%j;'S;=`%{<%lO%jj@VW!r`Oy%jz!c%j!c!}@o!}#T%j#T#o@o#o;'S%j;'S;=`%{<%lO%jj@v[lY!r`Oy%jz}%j}!O@o!O!Q%j!Q![@o![!c%j!c!}@o!}#T%j#T#o@o#o;'S%j;'S;=`%{<%lO%jhAqS!}WOy%jz;'S%j;'S;=`%{<%lO%jjBSSoYOy%jz;'S%j;'S;=`%{<%lO%jnBeSn^Oy%jz;'S%j;'S;=`%{<%lO%jjBvU!}WOy%jz#a%j#a#bCY#b;'S%j;'S;=`%{<%lO%jbC_U!r`Oy%jz#d%j#d#eCq#e;'S%j;'S;=`%{<%lO%jbCvU!r`Oy%jz#c%j#c#dDY#d;'S%j;'S;=`%{<%lO%jbD_U!r`Oy%jz#f%j#f#gDq#g;'S%j;'S;=`%{<%lO%jbDvU!r`Oy%jz#h%j#h#iEY#i;'S%j;'S;=`%{<%lO%jbE_U!r`Oy%jz#T%j#T#UEq#U;'S%j;'S;=`%{<%lO%jbEvU!r`Oy%jz#b%j#b#cFY#c;'S%j;'S;=`%{<%lO%jbF_U!r`Oy%jz#h%j#h#iFq#i;'S%j;'S;=`%{<%lO%jbFxS$tQ!r`Oy%jz;'S%j;'S;=`%{<%lO%jjGZSrYOy%jz;'S%j;'S;=`%{<%lO%jfGlU$gUOy%jz!_%j!_!`0^!`;'S%j;'S;=`%{<%lO%jjHTSqYOy%jz;'S%j;'S;=`%{<%lO%jfHfU#SQOy%jz!_%j!_!`0^!`;'S%j;'S;=`%{<%lO%j`H{P;=`<%l%Z",
	tokenizers: [
		Xy,
		Zy,
		Jy,
		Yy,
		1,
		2,
		3,
		4,
		new ny("m~RRYZ[z{a~~g~aO$c~~dP!P!Qg~lO$d~~", 28, 156)
	],
	topRules: {
		StyleSheet: [0, 6],
		Styles: [1, 129]
	},
	dynamicPrecedences: { 97: 1 },
	specialized: [
		{
			term: 172,
			get: (e, t) => Qy(e) << 1,
			external: Qy
		},
		{
			term: 150,
			get: (e) => e2[e] || -1
		},
		{
			term: 151,
			get: (e) => t2[e] || -1
		},
		{
			term: 4,
			get: (e) => n2[e] || -1
		},
		{
			term: 28,
			get: (e) => r2[e] || -1
		},
		{
			term: 149,
			get: (e) => i2[e] || -1
		}
	],
	tokenPrec: 2433
}), o2 = null;
function s2() {
	if (!o2 && typeof document == "object" && document.body) {
		let { style: e } = document.body, t = [], n = /* @__PURE__ */ new Set();
		for (let r in e) r != "cssText" && r != "cssFloat" && typeof e[r] == "string" && (/[A-Z]/.test(r) && (r = r.replace(/[A-Z]/g, (e) => "-" + e.toLowerCase())), n.has(r) || (t.push(r), n.add(r)));
		o2 = t.sort().map((e) => ({
			type: "property",
			label: e,
			apply: e + ": "
		}));
	}
	return o2 || [];
}
var c2 = /*@__PURE__*/ (/* @__PURE__ */ "active.after.any-link.autofill.backdrop.before.checked.cue.default.defined.disabled.empty.enabled.file-selector-button.first.first-child.first-letter.first-line.first-of-type.focus.focus-visible.focus-within.fullscreen.has.host.host-context.hover.in-range.indeterminate.invalid.is.lang.last-child.last-of-type.left.link.marker.modal.not.nth-child.nth-last-child.nth-last-of-type.nth-of-type.only-child.only-of-type.optional.out-of-range.part.placeholder.placeholder-shown.read-only.read-write.required.right.root.scope.selection.slotted.target.target-text.valid.visited.where".split(".")).map((e) => ({
	type: "class",
	label: e
})), l2 = /*@__PURE__*/ (/* @__PURE__ */ "above.absolute.activeborder.additive.activecaption.after-white-space.ahead.alias.all.all-scroll.alphabetic.alternate.always.antialiased.appworkspace.asterisks.attr.auto.auto-flow.avoid.avoid-column.avoid-page.avoid-region.axis-pan.background.backwards.baseline.below.bidi-override.blink.block.block-axis.bold.bolder.border.border-box.both.bottom.break.break-all.break-word.bullets.button.button-bevel.buttonface.buttonhighlight.buttonshadow.buttontext.calc.capitalize.caps-lock-indicator.caption.captiontext.caret.cell.center.checkbox.circle.cjk-decimal.clear.clip.close-quote.col-resize.collapse.color.color-burn.color-dodge.column.column-reverse.compact.condensed.contain.content.contents.content-box.context-menu.continuous.copy.counter.counters.cover.crop.cross.crosshair.currentcolor.cursive.cyclic.darken.dashed.decimal.decimal-leading-zero.default.default-button.dense.destination-atop.destination-in.destination-out.destination-over.difference.disc.discard.disclosure-closed.disclosure-open.document.dot-dash.dot-dot-dash.dotted.double.down.e-resize.ease.ease-in.ease-in-out.ease-out.element.ellipse.ellipsis.embed.end.ethiopic-abegede-gez.ethiopic-halehame-aa-er.ethiopic-halehame-gez.ew-resize.exclusion.expanded.extends.extra-condensed.extra-expanded.fantasy.fast.fill.fill-box.fixed.flat.flex.flex-end.flex-start.footnotes.forwards.from.geometricPrecision.graytext.grid.groove.hand.hard-light.help.hidden.hide.higher.highlight.highlighttext.horizontal.hsl.hsla.hue.icon.ignore.inactiveborder.inactivecaption.inactivecaptiontext.infinite.infobackground.infotext.inherit.initial.inline.inline-axis.inline-block.inline-flex.inline-grid.inline-table.inset.inside.intrinsic.invert.italic.justify.keep-all.landscape.large.larger.left.level.lighter.lighten.line-through.linear.linear-gradient.lines.list-item.listbox.listitem.local.logical.loud.lower.lower-hexadecimal.lower-latin.lower-norwegian.lowercase.ltr.luminosity.manipulation.match.matrix.matrix3d.medium.menu.menutext.message-box.middle.min-intrinsic.mix.monospace.move.multiple.multiple_mask_images.multiply.n-resize.narrower.ne-resize.nesw-resize.no-close-quote.no-drop.no-open-quote.no-repeat.none.normal.not-allowed.nowrap.ns-resize.numbers.numeric.nw-resize.nwse-resize.oblique.opacity.open-quote.optimizeLegibility.optimizeSpeed.outset.outside.outside-shape.overlay.overline.padding.padding-box.painted.page.paused.perspective.pinch-zoom.plus-darker.plus-lighter.pointer.polygon.portrait.pre.pre-line.pre-wrap.preserve-3d.progress.push-button.radial-gradient.radio.read-only.read-write.read-write-plaintext-only.rectangle.region.relative.repeat.repeating-linear-gradient.repeating-radial-gradient.repeat-x.repeat-y.reset.reverse.rgb.rgba.ridge.right.rotate.rotate3d.rotateX.rotateY.rotateZ.round.row.row-resize.row-reverse.rtl.run-in.running.s-resize.sans-serif.saturation.scale.scale3d.scaleX.scaleY.scaleZ.screen.scroll.scrollbar.scroll-position.se-resize.self-start.self-end.semi-condensed.semi-expanded.separate.serif.show.single.skew.skewX.skewY.skip-white-space.slide.slider-horizontal.slider-vertical.sliderthumb-horizontal.sliderthumb-vertical.slow.small.small-caps.small-caption.smaller.soft-light.solid.source-atop.source-in.source-out.source-over.space.space-around.space-between.space-evenly.spell-out.square.start.static.status-bar.stretch.stroke.stroke-box.sub.subpixel-antialiased.svg_masks.super.sw-resize.symbolic.symbols.system-ui.table.table-caption.table-cell.table-column.table-column-group.table-footer-group.table-header-group.table-row.table-row-group.text.text-bottom.text-top.textarea.textfield.thick.thin.threeddarkshadow.threedface.threedhighlight.threedlightshadow.threedshadow.to.top.transform.translate.translate3d.translateX.translateY.translateZ.transparent.ultra-condensed.ultra-expanded.underline.unidirectional-pan.unset.up.upper-latin.uppercase.url.var.vertical.vertical-text.view-box.visible.visibleFill.visiblePainted.visibleStroke.visual.w-resize.wait.wave.wider.window.windowframe.windowtext.words.wrap.wrap-reverse.x-large.x-small.xor.xx-large.xx-small".split(".")).map((e) => ({
	type: "keyword",
	label: e
})).concat(/*@__PURE__*/ (/* @__PURE__ */ "aliceblue.antiquewhite.aqua.aquamarine.azure.beige.bisque.black.blanchedalmond.blue.blueviolet.brown.burlywood.cadetblue.chartreuse.chocolate.coral.cornflowerblue.cornsilk.crimson.cyan.darkblue.darkcyan.darkgoldenrod.darkgray.darkgreen.darkkhaki.darkmagenta.darkolivegreen.darkorange.darkorchid.darkred.darksalmon.darkseagreen.darkslateblue.darkslategray.darkturquoise.darkviolet.deeppink.deepskyblue.dimgray.dodgerblue.firebrick.floralwhite.forestgreen.fuchsia.gainsboro.ghostwhite.gold.goldenrod.gray.grey.green.greenyellow.honeydew.hotpink.indianred.indigo.ivory.khaki.lavender.lavenderblush.lawngreen.lemonchiffon.lightblue.lightcoral.lightcyan.lightgoldenrodyellow.lightgray.lightgreen.lightpink.lightsalmon.lightseagreen.lightskyblue.lightslategray.lightsteelblue.lightyellow.lime.limegreen.linen.magenta.maroon.mediumaquamarine.mediumblue.mediumorchid.mediumpurple.mediumseagreen.mediumslateblue.mediumspringgreen.mediumturquoise.mediumvioletred.midnightblue.mintcream.mistyrose.moccasin.navajowhite.navy.oldlace.olive.olivedrab.orange.orangered.orchid.palegoldenrod.palegreen.paleturquoise.palevioletred.papayawhip.peachpuff.peru.pink.plum.powderblue.purple.rebeccapurple.red.rosybrown.royalblue.saddlebrown.salmon.sandybrown.seagreen.seashell.sienna.silver.skyblue.slateblue.slategray.snow.springgreen.steelblue.tan.teal.thistle.tomato.turquoise.violet.wheat.white.whitesmoke.yellow.yellowgreen".split(".")).map((e) => ({
	type: "constant",
	label: e
}))), u2 = /*@__PURE__*/ (/* @__PURE__ */ "a.abbr.address.article.aside.b.bdi.bdo.blockquote.body.br.button.canvas.caption.cite.code.col.colgroup.dd.del.details.dfn.dialog.div.dl.dt.em.figcaption.figure.footer.form.header.hgroup.h1.h2.h3.h4.h5.h6.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.meter.nav.ol.output.p.pre.ruby.section.select.small.source.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.tr.u.ul".split(".")).map((e) => ({
	type: "type",
	label: e
})), d2 = /*@__PURE__*/ [
	"@charset",
	"@color-profile",
	"@container",
	"@counter-style",
	"@font-face",
	"@font-feature-values",
	"@font-palette-values",
	"@import",
	"@keyframes",
	"@layer",
	"@media",
	"@namespace",
	"@page",
	"@position-try",
	"@property",
	"@scope",
	"@starting-style",
	"@supports",
	"@view-transition"
].map((e) => ({
	type: "keyword",
	label: e
})), f2 = /^(\w[\w-]*|-\w[\w-]*|)$/, p2 = /^-(-[\w-]*)?$/;
function m2(e, t) {
	if ((e.name == "(" || e.type.isError) && (e = e.parent || e), e.name != "ArgList") return !1;
	let n = e.parent?.firstChild;
	return n?.name == "Callee" && t.sliceString(n.from, n.to) == "var";
}
var h2 = /*@__PURE__*/ new ig(), g2 = ["Declaration"];
function _2(e) {
	for (let t = e;;) {
		if (t.type.isTop) return t;
		if (!(t = t.parent)) return e;
	}
}
function v2(e, t, n) {
	if (t.to - t.from > 4096) {
		let r = h2.get(t);
		if (r) return r;
		let i = [], a = /* @__PURE__ */ new Set(), o = t.cursor(K.IncludeAnonymous);
		if (o.firstChild()) do
			for (let t of v2(e, o.node, n)) a.has(t.label) || (a.add(t.label), i.push(t));
		while (o.nextSibling());
		return h2.set(t, i), i;
	}
	{
		let r = [], i = /* @__PURE__ */ new Set();
		return t.cursor().iterate((t) => {
			if (n(t) && t.matchContext(g2) && t.node.nextSibling?.name == ":") {
				let n = e.sliceString(t.from, t.to);
				i.has(n) || (i.add(n), r.push({
					label: n,
					type: "variable"
				}));
			}
		}), r;
	}
}
var y2 = /*@__PURE__*/ ((e) => (t) => {
	let { state: n, pos: r } = t, i = o_(n).resolveInner(r, -1), a = i.type.isError && i.from == i.to - 1 && n.doc.sliceString(i.from, i.to) == "-";
	if (i.name == "PropertyName" || (a || i.name == "TagName") && /^(Block|Styles)$/.test(i.resolve(i.to).name)) return {
		from: i.from,
		options: s2(),
		validFor: f2
	};
	if (i.name == "ValueName") return {
		from: i.from,
		options: l2,
		validFor: f2
	};
	if (i.name == "PseudoClassName") return {
		from: i.from,
		options: c2,
		validFor: f2
	};
	if (e(i) || (t.explicit || a) && m2(i, n.doc)) return {
		from: e(i) || a ? i.from : r,
		options: v2(n.doc, _2(i), e),
		validFor: p2
	};
	if (i.name == "TagName") {
		for (let { parent: e } = i; e; e = e.parent) if (e.name == "Block") return {
			from: i.from,
			options: s2(),
			validFor: f2
		};
		return {
			from: i.from,
			options: u2,
			validFor: f2
		};
	}
	if (i.name == "AtKeyword") return {
		from: i.from,
		options: d2,
		validFor: f2
	};
	if (!t.explicit) return null;
	let o = i.resolve(r), s = o.childBefore(r);
	return s && s.name == ":" && o.name == "PseudoClassSelector" ? {
		from: r,
		options: c2,
		validFor: f2
	} : s && s.name == ":" && o.name == "Declaration" || o.name == "ArgList" ? {
		from: r,
		options: l2,
		validFor: f2
	} : o.name == "Block" || o.name == "Styles" ? {
		from: r,
		options: s2(),
		validFor: f2
	} : null;
})((e) => e.name == "VariableName"), b2 = /*@__PURE__*/ a_.define({
	name: "css",
	parser: /*@__PURE__*/ a2.configure({ props: [/*@__PURE__*/ w_.add({ Declaration: /*@__PURE__*/ I_() }), /*@__PURE__*/ R_.add({ "Block KeyframeList": z_ })] }),
	languageData: {
		commentTokens: { block: {
			open: "/*",
			close: "*/"
		} },
		indentOnInput: /^\s*\}$/,
		wordChars: "-"
	}
});
function x2() {
	return new g_(b2, b2.data.of({ autocomplete: y2 }));
}
// node_modules/@lezer/html/dist/index.js
var S2 = 55, C2 = 1, w2 = 56, T2 = 2, E2 = 57, D2 = 3, O2 = 4, k2 = 5, A2 = 6, j2 = 7, M2 = 8, N2 = 9, P2 = 10, F2 = 11, I2 = 12, L2 = 13, R2 = 58, z2 = 14, B2 = 15, V2 = 59, H2 = 21, U2 = 23, W2 = 24, G2 = 25, K2 = 27, q2 = 28, J2 = 29, Y2 = 32, X2 = 35, Z2 = 37, Q2 = 38, $2 = 0, e4 = 1, t4 = {
	area: !0,
	base: !0,
	br: !0,
	col: !0,
	command: !0,
	embed: !0,
	frame: !0,
	hr: !0,
	img: !0,
	input: !0,
	keygen: !0,
	link: !0,
	meta: !0,
	param: !0,
	source: !0,
	track: !0,
	wbr: !0,
	menuitem: !0
}, n4 = {
	dd: !0,
	li: !0,
	optgroup: !0,
	option: !0,
	p: !0,
	rp: !0,
	rt: !0,
	tbody: !0,
	td: !0,
	tfoot: !0,
	th: !0,
	tr: !0
}, r4 = {
	dd: {
		dd: !0,
		dt: !0
	},
	dt: {
		dd: !0,
		dt: !0
	},
	li: { li: !0 },
	option: {
		option: !0,
		optgroup: !0
	},
	optgroup: { optgroup: !0 },
	p: {
		address: !0,
		article: !0,
		aside: !0,
		blockquote: !0,
		dir: !0,
		div: !0,
		dl: !0,
		fieldset: !0,
		footer: !0,
		form: !0,
		h1: !0,
		h2: !0,
		h3: !0,
		h4: !0,
		h5: !0,
		h6: !0,
		header: !0,
		hgroup: !0,
		hr: !0,
		menu: !0,
		nav: !0,
		ol: !0,
		p: !0,
		pre: !0,
		section: !0,
		table: !0,
		ul: !0
	},
	rp: {
		rp: !0,
		rt: !0
	},
	rt: {
		rp: !0,
		rt: !0
	},
	tbody: {
		tbody: !0,
		tfoot: !0
	},
	td: {
		td: !0,
		th: !0
	},
	tfoot: { tbody: !0 },
	th: {
		td: !0,
		th: !0
	},
	thead: {
		tbody: !0,
		tfoot: !0
	},
	tr: { tr: !0 }
};
function i4(e) {
	return e == 45 || e == 46 || e == 58 || e >= 65 && e <= 90 || e == 95 || e >= 97 && e <= 122 || e >= 161;
}
var a4 = null, o4 = null, s4 = 0;
function c4(e, t) {
	let n = e.pos + t;
	if (s4 == n && o4 == e) return a4;
	let r = e.peek(t), i = "";
	for (; i4(r);) i += String.fromCharCode(r), r = e.peek(++t);
	return o4 = e, s4 = n, a4 = i ? i.toLowerCase() : r == f4 || r == p4 ? void 0 : null;
}
var l4 = 60, u4 = 62, d4 = 47, f4 = 63, p4 = 33, m4 = 45;
function h4(e, t) {
	this.name = e, this.parent = t;
}
var g4 = [
	A2,
	P2,
	j2,
	M2,
	N2
], _4 = new _y({
	start: null,
	shift(e, t, n, r) {
		return g4.indexOf(t) > -1 ? new h4(c4(r, 1) || "", e) : e;
	},
	reduce(e, t) {
		return t == H2 && e ? e.parent : e;
	},
	reuse(e, t, n, r) {
		let i = t.type.id;
		return i == A2 || i == Z2 ? new h4(c4(r, 1) || "", e) : e;
	},
	strict: !1
}), v4 = new ry((e, t) => {
	if (e.next != l4) {
		e.next < 0 && t.context && e.acceptToken(R2);
		return;
	}
	e.advance();
	let n = e.next == d4;
	n && e.advance();
	let r = c4(e, 0);
	if (r === void 0) return;
	if (!r) return e.acceptToken(n ? B2 : z2);
	let i = t.context ? t.context.name : null;
	if (n) {
		if (r == i) return e.acceptToken(F2);
		if (i && n4[i]) return e.acceptToken(R2, -2);
		if (t.dialectEnabled($2)) return e.acceptToken(I2);
		for (let e = t.context; e; e = e.parent) if (e.name == r) return;
		e.acceptToken(L2);
	} else {
		if (r == "script") return e.acceptToken(j2);
		if (r == "style") return e.acceptToken(M2);
		if (r == "textarea") return e.acceptToken(N2);
		if (t4.hasOwnProperty(r)) return e.acceptToken(P2);
		i && r4[i] && r4[i][r] ? e.acceptToken(R2, -1) : e.acceptToken(A2);
	}
}, { contextual: !0 }), y4 = new ry((e) => {
	for (let t = 0, n = 0;; n++) {
		if (e.next < 0) {
			n && e.acceptToken(V2);
			break;
		}
		if (e.next == m4) t++;
		else if (e.next == u4 && t >= 2) {
			n >= 3 && e.acceptToken(V2, -2);
			break;
		} else t = 0;
		e.advance();
	}
});
function b4(e) {
	for (; e; e = e.parent) if (e.name == "svg" || e.name == "math") return !0;
	return !1;
}
var x4 = new ry((e, t) => {
	if (e.next == d4 && e.peek(1) == u4) {
		let n = t.dialectEnabled(e4) || b4(t.context);
		e.acceptToken(n ? k2 : O2, 2);
	} else e.next == u4 && e.acceptToken(O2, 1);
});
function S4(e, t, n) {
	let r = 2 + e.length;
	return new ry((i) => {
		for (let a = 0, o = 0, s = 0;; s++) {
			if (i.next < 0) {
				s && i.acceptToken(t);
				break;
			}
			if (a == 0 && i.next == l4 || a == 1 && i.next == d4 || a >= 2 && a < r && i.next == e.charCodeAt(a - 2)) a++, o++;
			else if (a == r && i.next == u4) {
				s > o ? i.acceptToken(t, -o) : i.acceptToken(n, -(o - 2));
				break;
			} else if ((i.next == 10 || i.next == 13) && s) {
				i.acceptToken(t, 1);
				break;
			} else a = o = 0;
			i.advance();
		}
	});
}
var C4 = S4("script", S2, C2), w4 = S4("style", w2, T2), T4 = S4("textarea", E2, D2), E4 = Ag({
	"Text RawText IncompleteTag IncompleteCloseTag": Y.content,
	"StartTag StartCloseTag SelfClosingEndTag EndTag": Y.angleBracket,
	TagName: Y.tagName,
	"MismatchedCloseTag/TagName": [Y.tagName, Y.invalid],
	AttributeName: Y.attributeName,
	"AttributeValue UnquotedAttributeValue": Y.attributeValue,
	Is: Y.definitionOperator,
	"EntityReference CharacterReference": Y.character,
	Comment: Y.blockComment,
	ProcessingInst: Y.processingInstruction,
	DoctypeDecl: Y.documentMeta
}), D4 = vy.deserialize({
	version: 14,
	states: ",xOVO!rOOO!ZQ#tO'#CrO!`Q#tO'#C{O!eQ#tO'#DOO!jQ#tO'#DRO!oQ#tO'#DTO!tOaO'#CqO#PObO'#CqO#[OdO'#CqO$kO!rO'#CqOOO`'#Cq'#CqO$rO$fO'#DUO$zQ#tO'#DWO%PQ#tO'#DXOOO`'#Dl'#DlOOO`'#DZ'#DZQVO!rOOO%UQ&rO,59^O%aQ&rO,59gO%lQ&rO,59jO%wQ&rO,59mO&SQ&rO,59oOOOa'#D_'#D_O&_OaO'#CyO&jOaO,59]OOOb'#D`'#D`O&rObO'#C|O&}ObO,59]OOOd'#Da'#DaO'VOdO'#DPO'bOdO,59]OOO`'#Db'#DbO'jO!rO,59]O'qQ#tO'#DSOOO`,59],59]OOOp'#Dc'#DcO'vO$fO,59pOOO`,59p,59pO(OQ#|O,59rO(TQ#|O,59sOOO`-E7X-E7XO(YQ&rO'#CtOOQW'#D['#D[O(hQ&rO1G.xOOOa1G.x1G.xOOO`1G/Z1G/ZO(sQ&rO1G/ROOOb1G/R1G/RO)OQ&rO1G/UOOOd1G/U1G/UO)ZQ&rO1G/XOOO`1G/X1G/XO)fQ&rO1G/ZOOOa-E7]-E7]O)qQ#tO'#CzOOO`1G.w1G.wOOOb-E7^-E7^O)vQ#tO'#C}OOOd-E7_-E7_O){Q#tO'#DQOOO`-E7`-E7`O*QQ#|O,59nOOOp-E7a-E7aOOO`1G/[1G/[OOO`1G/^1G/^OOO`1G/_1G/_O*VQ,UO,59`OOQW-E7Y-E7YOOOa7+$d7+$dOOO`7+$u7+$uOOOb7+$m7+$mOOOd7+$p7+$pOOO`7+$s7+$sO*bQ#|O,59fO*gQ#|O,59iO*lQ#|O,59lOOO`1G/Y1G/YO*qO7[O'#CwO+SOMhO'#CwOOQW1G.z1G.zOOO`1G/Q1G/QOOO`1G/T1G/TOOO`1G/W1G/WOOOO'#D]'#D]O+eO7[O,59cOOQW,59c,59cOOOO'#D^'#D^O+vOMhO,59cOOOO-E7Z-E7ZOOQW1G.}1G.}OOOO-E7[-E7[",
	stateData: ",c~O!_OS~OUSOVPOWQOXROYTO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O|_O!eZO~OgaO~OgbO~OgcO~OgdO~OgeO~O!XfOPmP![mP~O!YiOQpP![pP~O!ZlORsP![sP~OUSOVPOWQOXROYTOZqO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O!eZO~O![rO~P#gO!]sO!fuO~OgvO~OgwO~OS|OT}OiyO~OS!POT}OiyO~OS!ROT}OiyO~OS!TOT}OiyO~OS}OT}OiyO~O!XfOPmX![mX~OP!WO![!XO~O!YiOQpX![pX~OQ!ZO![!XO~O!ZlORsX![sX~OR!]O![!XO~O![!XO~P#gOg!_O~O!]sO!f!aO~OS!bO~OS!cO~Oj!dOShXThXihX~OS!fOT!gOiyO~OS!hOT!gOiyO~OS!iOT!gOiyO~OS!jOT!gOiyO~OS!gOT!gOiyO~Og!kO~Og!lO~Og!mO~OS!nO~Ol!qO!a!oO!c!pO~OS!rO~OS!sO~OS!tO~Ob!uOc!uOd!uO!a!wO!b!uO~Ob!xOc!xOd!xO!c!wO!d!xO~Ob!uOc!uOd!uO!a!{O!b!uO~Ob!xOc!xOd!xO!c!{O!d!xO~OT~cbd!ey|!e~",
	goto: "%q!aPPPPPPPPPPPPPPPPPPPPP!b!hP!nPP!zP!}#Q#T#Z#^#a#g#j#m#s#y!bP!b!bP$P$V$m$s$y%P%V%]%cPPPPPPPP%iX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",
	nodeNames: "⚠ StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",
	maxTerm: 68,
	context: _4,
	nodeProps: [
		[
			"closedBy",
			-10,
			1,
			2,
			3,
			7,
			8,
			9,
			10,
			11,
			12,
			13,
			"EndTag",
			6,
			"EndTag SelfClosingEndTag",
			-4,
			22,
			31,
			34,
			37,
			"CloseTag"
		],
		[
			"openedBy",
			4,
			"StartTag StartCloseTag",
			5,
			"StartTag",
			-4,
			30,
			33,
			36,
			38,
			"OpenTag"
		],
		[
			"group",
			-10,
			14,
			15,
			18,
			19,
			20,
			21,
			40,
			41,
			42,
			43,
			"Entity",
			17,
			"Entity TextContent",
			-3,
			29,
			32,
			35,
			"TextContent Entity"
		],
		[
			"isolate",
			-11,
			22,
			30,
			31,
			33,
			34,
			36,
			37,
			38,
			39,
			42,
			43,
			"ltr",
			-3,
			27,
			28,
			40,
			""
		]
	],
	propSources: [E4],
	skippedNodes: [0],
	repeatNodeCount: 9,
	tokenData: "!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|caPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bXaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UVaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pTaPOv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!dpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({WaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!b`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!b`!dpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYlWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]`aP!b`!dp!_^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebiSlWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXiSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vciSaP!b`!dpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!ahaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WiiSlWd!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zblWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOb!R!R7tP;=`<%l7S!Z8OYlWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{iiSlWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbiSlWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QciSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXiSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TalWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOc!R!RAwP;=`<%lAY!ZBRYlWc!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbiSlWc!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbiSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXiSc!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!cxaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYliSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_kiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_XaP!b`!dp!fQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZiSgQaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!b`!dpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!b`!dp!ePOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!b`!dpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!b`!dpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!b`!dpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!b`!dpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!b`!dpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!b`!dpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!b`!dpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!dpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO|PP!-nP;=`<%l!-Sq!-xS!dp|POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!b`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!b`|POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!b`!dp|POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!b`!dpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!b`!dpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!b`!dpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!b`!dpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!b`!dpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!b`!dpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!dpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOyPP!7TP;=`<%l!6Vq!7]V!dpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!dpyPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!b`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!b`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!b`yPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!b`!dpyPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXjSaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",
	tokenizers: [
		C4,
		w4,
		T4,
		x4,
		v4,
		y4,
		0,
		1,
		2,
		3,
		4,
		5
	],
	topRules: { Document: [0, 16] },
	dialects: {
		noMatch: 0,
		selfClosing: 515
	},
	tokenPrec: 517
});
function O4(e, t) {
	let n = Object.create(null);
	for (let r of e.getChildren(W2)) {
		let e = r.getChild(G2), i = r.getChild(K2) || r.getChild(q2);
		e && (n[t.read(e.from, e.to)] = i ? i.type.id == K2 ? t.read(i.from + 1, i.to - 1) : t.read(i.from, i.to) : "");
	}
	return n;
}
function k4(e, t) {
	let n = e.getChild(U2);
	return n ? t.read(n.from, n.to) : " ";
}
function A4(e, t, n) {
	let r;
	for (let i of n) if (!i.attrs || i.attrs(r ||= O4(e.node.parent.firstChild, t))) return {
		parser: i.parser,
		bracketed: !0
	};
	return null;
}
function j4(e = [], t = []) {
	let n = [], r = [], i = [], a = [];
	for (let t of e) (t.tag == "script" ? n : t.tag == "style" ? r : t.tag == "textarea" ? i : a).push(t);
	let o = t.length ? Object.create(null) : null;
	for (let e of t) (o[e.name] || (o[e.name] = [])).push(e);
	return cg((e, t) => {
		let s = e.type.id;
		if (s == J2) return A4(e, t, n);
		if (s == Y2) return A4(e, t, r);
		if (s == X2) return A4(e, t, i);
		if (s == H2 && a.length) {
			let n = e.node, r = n.firstChild, i = r && k4(r, t), o;
			if (i) {
				for (let e of a) if (e.tag == i && (!e.attrs || e.attrs(o ||= O4(r, t)))) {
					let t = n.lastChild, i = t.type.id == Q2 ? t.from : n.to;
					if (i > r.to) return {
						parser: e.parser,
						overlay: [{
							from: r.to,
							to: i
						}]
					};
				}
			}
		}
		if (o && s == W2) {
			let n = e.node, r;
			if (r = n.firstChild) {
				let e = o[t.read(r.from, r.to)];
				if (e) for (let r of e) {
					if (r.tagName && r.tagName != k4(n.parent, t)) continue;
					let e = n.lastChild;
					if (e.type.id == K2) {
						let t = e.from + 1, n = e.lastChild, i = e.to - (n && n.isError ? 0 : 1);
						if (i > t) return {
							parser: r.parser,
							overlay: [{
								from: t,
								to: i
							}],
							bracketed: !0
						};
					} else if (e.type.id == q2) return {
						parser: r.parser,
						overlay: [{
							from: e.from,
							to: e.to
						}]
					};
				}
			}
		}
		return null;
	});
}
// node_modules/@lezer/javascript/dist/index.js
var M4 = 317, N4 = 318, P4 = 1, F4 = 2, I4 = 3, L4 = 4, R4 = 319, z4 = 321, B4 = 322, V4 = 5, H4 = 6, U4 = 0, W4 = [
	9,
	10,
	11,
	12,
	13,
	32,
	133,
	160,
	5760,
	8192,
	8193,
	8194,
	8195,
	8196,
	8197,
	8198,
	8199,
	8200,
	8201,
	8202,
	8232,
	8233,
	8239,
	8287,
	12288
], G4 = 125, K4 = 59, q4 = 47, J4 = 42, Y4 = 43, X4 = 45, Z4 = 60, Q4 = 44, $4 = 63, e3 = 46, t3 = 91, n3 = new _y({
	start: !1,
	shift(e, t) {
		return t == V4 || t == H4 || t == z4 ? e : t == B4;
	},
	strict: !1
}), r3 = new ry((e, t) => {
	let { next: n } = e;
	(n == G4 || n == -1 || t.context) && e.acceptToken(R4);
}, {
	contextual: !0,
	fallback: !0
}), i3 = new ry((e, t) => {
	let { next: n } = e, r;
	W4.indexOf(n) > -1 || (n != q4 || (r = e.peek(1)) != q4 && r != J4) && n != G4 && n != K4 && n != -1 && !t.context && e.acceptToken(M4);
}, { contextual: !0 }), a3 = new ry((e, t) => {
	e.next == t3 && !t.context && e.acceptToken(N4);
}, { contextual: !0 }), o3 = new ry((e, t) => {
	let { next: n } = e;
	if (n == Y4 || n == X4) {
		if (e.advance(), n == e.next) {
			e.advance();
			let n = !t.context && t.canShift(P4);
			e.acceptToken(n ? P4 : F4);
		}
	} else n == $4 && e.peek(1) == e3 && (e.advance(), e.advance(), (e.next < 48 || e.next > 57) && e.acceptToken(I4));
}, { contextual: !0 });
function s3(e, t) {
	return e >= 65 && e <= 90 || e >= 97 && e <= 122 || e == 95 || e >= 192 || !t && e >= 48 && e <= 57;
}
var c3 = new ry((e, t) => {
	if (e.next != Z4 || !t.dialectEnabled(U4) || (e.advance(), e.next == q4)) return;
	let n = 0;
	for (; W4.indexOf(e.next) > -1;) e.advance(), n++;
	if (s3(e.next, !0)) {
		for (e.advance(), n++; s3(e.next, !1);) e.advance(), n++;
		for (; W4.indexOf(e.next) > -1;) e.advance(), n++;
		if (e.next == Q4) return;
		for (let t = 0;; t++) {
			if (t == 7) {
				if (!s3(e.next, !0)) return;
				break;
			}
			if (e.next != "extends".charCodeAt(t)) break;
			e.advance(), n++;
		}
	}
	e.acceptToken(L4, -n);
}), l3 = Ag({
	"get set async static": Y.modifier,
	"for while do if else switch try catch finally return throw break continue default case defer": Y.controlKeyword,
	"in of await yield void typeof delete instanceof as satisfies": Y.operatorKeyword,
	"let var const using function class extends": Y.definitionKeyword,
	"import export from": Y.moduleKeyword,
	"with debugger new": Y.keyword,
	TemplateString: Y.special(Y.string),
	super: Y.atom,
	BooleanLiteral: Y.bool,
	this: Y.self,
	null: Y.null,
	Star: Y.modifier,
	VariableName: Y.variableName,
	"CallExpression/VariableName TaggedTemplateExpression/VariableName": Y.function(Y.variableName),
	VariableDefinition: Y.definition(Y.variableName),
	Label: Y.labelName,
	PropertyName: Y.propertyName,
	PrivatePropertyName: Y.special(Y.propertyName),
	"CallExpression/MemberExpression/PropertyName": Y.function(Y.propertyName),
	"FunctionDeclaration/VariableDefinition": Y.function(Y.definition(Y.variableName)),
	"ClassDeclaration/VariableDefinition": Y.definition(Y.className),
	"NewExpression/VariableName": Y.className,
	PropertyDefinition: Y.definition(Y.propertyName),
	PrivatePropertyDefinition: Y.definition(Y.special(Y.propertyName)),
	UpdateOp: Y.updateOperator,
	"LineComment Hashbang": Y.lineComment,
	BlockComment: Y.blockComment,
	Number: Y.number,
	String: Y.string,
	Escape: Y.escape,
	ArithOp: Y.arithmeticOperator,
	LogicOp: Y.logicOperator,
	BitOp: Y.bitwiseOperator,
	CompareOp: Y.compareOperator,
	RegExp: Y.regexp,
	Equals: Y.definitionOperator,
	Arrow: Y.function(Y.punctuation),
	": Spread": Y.punctuation,
	"( )": Y.paren,
	"[ ]": Y.squareBracket,
	"{ }": Y.brace,
	"InterpolationStart InterpolationEnd": Y.special(Y.brace),
	".": Y.derefOperator,
	", ;": Y.separator,
	"@": Y.meta,
	TypeName: Y.typeName,
	TypeDefinition: Y.definition(Y.typeName),
	"type enum interface implements namespace module declare": Y.definitionKeyword,
	"abstract global Privacy readonly override": Y.modifier,
	"is keyof unique infer asserts": Y.operatorKeyword,
	JSXAttributeValue: Y.attributeValue,
	JSXText: Y.content,
	"JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": Y.angleBracket,
	"JSXIdentifier JSXNameSpacedName": Y.tagName,
	"JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": Y.attributeName,
	"JSXBuiltin/JSXIdentifier": Y.standard(Y.tagName)
}), u3 = {
	__proto__: null,
	export: 20,
	as: 25,
	from: 33,
	default: 36,
	async: 41,
	function: 42,
	in: 52,
	out: 55,
	const: 56,
	extends: 60,
	this: 64,
	true: 72,
	false: 72,
	null: 84,
	void: 88,
	typeof: 92,
	super: 108,
	new: 142,
	delete: 154,
	yield: 163,
	await: 167,
	class: 172,
	public: 237,
	private: 237,
	protected: 237,
	readonly: 239,
	instanceof: 258,
	satisfies: 261,
	import: 294,
	keyof: 351,
	unique: 355,
	infer: 361,
	asserts: 397,
	is: 399,
	abstract: 419,
	implements: 421,
	type: 423,
	let: 426,
	var: 428,
	using: 431,
	interface: 437,
	enum: 441,
	namespace: 447,
	module: 449,
	declare: 453,
	global: 457,
	defer: 473,
	for: 478,
	of: 487,
	while: 490,
	with: 494,
	do: 498,
	if: 502,
	else: 504,
	switch: 508,
	case: 514,
	try: 520,
	catch: 524,
	finally: 528,
	return: 532,
	throw: 536,
	break: 540,
	continue: 544,
	debugger: 548
}, d3 = {
	__proto__: null,
	async: 129,
	get: 131,
	set: 133,
	declare: 195,
	public: 197,
	private: 197,
	protected: 197,
	static: 199,
	abstract: 201,
	override: 203,
	readonly: 209,
	accessor: 211,
	new: 403
}, f3 = {
	__proto__: null,
	"<": 193
}, p3 = vy.deserialize({
	version: 14,
	states: "$GSQ%TQlOOO%[QlOOO'_QpOOP(lO`OOO*zQ!0MxO'#CiO+RO#tO'#CjO+aO&jO'#CjO+oO#@ItO'#DaO.QQlO'#DgO.bQlO'#DrO%[QlO'#DzO0fQlO'#ESOOQ!0Lf'#E['#E[O1PQ`O'#EXOOQO'#Ep'#EpOOQO'#Im'#ImO1XQ`O'#GtO1dQ`O'#EoO1iQ`O'#EoO3hQ!0MxO'#JsO6[Q!0MxO'#JtO6uQ`O'#F^O6zQ,UO'#FuOOQ!0Lf'#Fg'#FgO7VO7dO'#FgO9XQMhO'#F}O9`Q`O'#F|OOQ!0Lf'#Jt'#JtOOQ!0Lb'#Js'#JsO9eQ`O'#GxOOQ['#K`'#K`O9pQ`O'#IZO9uQ!0LrO'#I[OOQ['#Ja'#JaOOQ['#I`'#I`Q`QlOOQ`QlOOO9}Q!L^O'#DvO:UQlO'#EOO:]QlO'#EQO9kQ`O'#GtO:dQMhO'#CoO:rQ`O'#EnO:}Q`O'#EzO;hQMhO'#FfO;xQ`O'#GtOOQO'#Ka'#KaO;}Q`O'#KaO<]Q`O'#G|O<]Q`O'#G}O<]Q`O'#HPO<bQ`O'#HSO=_Q`O'#HVO>vQ`O'#CeO?WQ`O'#HdO?`Q`O'#HjO?`Q`O'#HlO`QlO'#HnO?`Q`O'#HpO?`Q`O'#HsO?eQ`O'#HyO?jQ!0LsO'#IPO%[QlO'#IRO?uQ!0LsO'#ITO@QQ!0LsO'#IVO9uQ!0LrO'#IXO@]Q!0MxO'#CiOA_QpO'#DlQOQ`OOO%[QlO'#EQOAuQ`O'#ETO:dQMhO'#EnOBQQ`O'#EnOB]Q!bO'#FfOOQ['#Cg'#CgOOQ!0Lb'#Dq'#DqOOQ!0Lb'#Jw'#JwO%[QlO'#JwOOQO'#Jz'#JzOOQO'#Ii'#IiOC]QpO'#EgOOQ!0Lb'#Ef'#EfOOQ!0Lb'#KO'#KOODXQ!0MSO'#EgODcQpO'#EWOOQO'#Jy'#JyODwQpO'#JzOFUQpO'#EWODcQpO'#EgPFcO&2DjO'#CbPOOO)CEO)CEOOOOO'#Ia'#IaOFnO#tO,59UOOQ!0Lh,59U,59UOOOO'#Ib'#IbOF|O&jO,59UOG[Q!L^O'#DcOOOO'#Id'#IdOGcO#@ItO,59{OOQ!0Lf,59{,59{OGqQlO'#IeOHUQ`O'#JuOJTQ!fO'#JuO+}QlO'#JuOJ[Q`O,5:ROJrQ`O'#EpOKPQ`O'#KUOK[Q`O'#KTOK[Q`O'#KTOKdQ`O,5;^OKiQ`O'#KSOOQ!0Ln,5:^,5:^OKpQlO,5:^OMnQ!0MxO,5:fON_Q`O,5:nONxQ!0LrO'#KRO! PQ`O'#KQO9eQ`O'#KQO! eQ`O'#KQO! mQ`O,5;]O! rQ`O'#KQO!#wQ!fO'#JtOOQ!0Lh'#Ci'#CiO%[QlO'#ESO!$gQ!fO,5:sOOQS'#J{'#J{OOQO-E<k-E<kO9kQ`O,5=`O!$}Q`O,5=`O!%SQlO,5;ZO!'VQMhO'#EkO!(pQ`O,5;ZO!(uQlO'#DyO!)PQpO,5;eO!)XQpO,5;eO%[QlO,5;eOOQ['#FU'#FUOOQ['#FW'#FWO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fOOQ['#F['#F[O!)gQlO,5;uOOQ!0Lf,5;z,5;zOOQ!0Lf,5;{,5;{OOQ!0Lf,5;},5;}O%[QlO'#IqO!+jQ!0LrO,5<jO%[QlO,5;fO!'VQMhO,5;fO!,XQMhO,5;fO!-yQMhO'#E^O%[QlO,5;xOOQ!0Lf,5;|,5;|O!.QQ,UO'#FkO!.}Q,UO'#KYO!.iQ,UO'#KYO!/UQ,UO'#KYOOQO'#KY'#KYO!/jQ,UO,5<TOOOW,5<a,5<aO!/{QlO'#FwOOOW'#Ip'#IpO7VO7dO,5<RO!0SQ,UO'#FyOOQ!0Lf,5<R,5<RO!0sQ$IUO'#CyOOQ!0Lh'#C}'#C}O!1WO#@ItO'#DRO!1tQMjO,5<fO!1{Q`O,5<iO!3eQ(CWO'#GYO!3uQ`O'#GZO!3zQ`O'#GZO!5jQ(CWO'#G_O!6oQpO'#GcOOQO'#Go'#GoO!,`QMhO'#GnOOQO'#Gq'#GqO!,`QMhO'#GpO!7bQ$IUO'#JmOOQ!0Lh'#Jm'#JmO!7lQ`O'#JlO!7zQ`O'#JkO!8SQ`O'#CuOOQ!0Lh'#C{'#C{O!8eQ`O'#C}OOQ!0Lh'#DV'#DVOOQ!0Lh'#DX'#DXO!8jQ`O,5<fO1SQ`O'#DZO!,`QMhO'#GQO!,`QMhO'#GSO!8rQ`O'#GUO!8wQ`O'#GVO!3zQ`O'#G]O!,`QMhO'#GbO<]Q`O'#JlO!8|Q`O'#EqO!9kQ`O,5<hOOQ!0Lb'#Cr'#CrO!9sQ`O'#ErO!:mQpO'#EsOOQ!0Lb'#KS'#KSO!:tQ!0LrO'#KbO9uQ!0LrO,5=dO`QlO,5>uOOQ['#Ji'#JiOOQ[,5>v,5>vOOQ[-E<^-E<^O!<sQ!0MxO,5:bO!=gQpO,5:`O!?cQ!0MxO,5:jO%[QlO,5:jO!AyQ!0MxO,5:lOOQO,5@{,5@{O!BjQMhO,5=`O!BxQ!0LrO'#JjO9`Q`O'#JjO!CZQ!0LrO,59ZO!CfQpO,59ZO!CnQMhO,59ZO:dQMhO,59ZO!CyQ`O,5;ZO!DRQ`O'#HcO!DgQ`O'#KeO%[QlO,5<OO!=gQpO,5<QO!DoQ`O,5={O!DtQ`O,5={O!DyQ`O,5={O!EXQ`O,5={O9uQ!0LrO,5={O<]Q`O,5=kOOQO'#Cy'#CyO!E`QpO,5=hO!EhQMhO,5=iO!EsQ`O,5=kO!ExQ!bO,5=nO!FQQ`O'#KaO?eQ`O'#HXO9kQ`O'#HZO!FVQ`O'#HZO:dQMhO'#H]O!F[Q`O'#H]OOQ[,5=q,5=qO!FaQ`O'#H^O!FrQ`O'#CoO!FwQ`O,59PO!GRQ`O,59PO!IWQlO,59POOQ[,59P,59PO!IhQ!0LrO,59PO%[QlO,59PO!KsQlO'#HfOOQ['#Hg'#HgOOQ['#Hh'#HhO`QlO,5>OO!LZQ`O,5>OO`QlO,5>UO`QlO,5>WO!L`Q`O,5>YO`QlO,5>[O!LeQ`O,5>_O!LjQlO,5>eOOQ[,5>k,5>kO%[QlO,5>kO9uQ!0LrO,5>mOOQ[,5>o,5>oO#!tQ`O,5>oOOQ[,5>q,5>qO#!tQ`O,5>qOOQ[,5>s,5>sO##bQpO'#D_O%[QlO'#JwO##lQpO'#JwO#$WQpO'#DmO#$iQpO'#DmO#&zQlO'#DmO#'RQ`O'#JvO#'ZQ`O,5:WO#'`Q`O'#EtO#'kQ`O'#EtO#'pQ`O'#KVO#'xQ`O,5;_O#'}QpO'#DmO#([QpO'#EVOOQ!0Lf,5:o,5:oO%[QlO,5:oO#(cQ`O,5:oO?eQ`O,5;YO!CfQpO,5;YO!CnQMhO,5;YO:dQMhO,5;YO#(kQ`O,5@cO#(pQ07dO,5:sOOQO-E<g-E<gO#)vQ!0MSO,5;RODcQpO,5:rO#*QQpO,5:rODcQpO,5;RO!CZQ!0LrO,5:rOOQ!0Lb'#Ej'#EjOOQO,5;R,5;RO%[QlO,5;RO#*_Q!0LrO,5;RO#*jQ!0LrO,5;RO!CfQpO,5:rOOQO,5;X,5;XO#*xQ!0LrO,5;RPOOO'#I_'#I_P#+^O&2DjO,58|POOO,58|,58|OOOO-E<_-E<_OOQ!0Lh1G.p1G.pOOOO-E<`-E<`OOOO,59},59}O#+iQ!bO,59}OOOO-E<b-E<bOOQ!0Lf1G/g1G/gO#+nQ!fO,5?PO+}QlO,5?POOQO,5?V,5?VO#+xQlO'#IeOOQO-E<c-E<cO#,VQ`O,5@aO#,_Q!fO,5@aO#,fQ`O,5@oOOQ!0Lf1G/m1G/mO%[QlO,5@pO#,nQ`O'#IkOOQO-E<i-E<iO#,fQ`O,5@oOOQ!0Lb1G0x1G0xOOQ!0Ln1G/x1G/xOOQ!0Ln1G0Y1G0YO%[QlO,5@mO#-SQ!0LrO,5@mO#-eQ!0LrO,5@mO#-lQ`O,5@lO9eQ`O,5@lO#-tQ`O,5@lO#.SQ`O'#InO#-lQ`O,5@lOOQ!0Lb1G0w1G0wO!)PQpO,5:uO!)[QpO,5:uOOQS,5:w,5:wO#.tQdO,5:wO#.|QMhO1G2zO9kQ`O1G2zOOQ!0Lf1G0u1G0uO#/[Q!0MxO1G0uO#0aQ!0MvO,5;VOOQ!0Lh'#GX'#GXO#0}Q!0MzO'#JmO!%SQlO1G0uO#3YQ!fO'#JxO%[QlO'#JxO#3dQ`O,5:eOOQ!0Lh'#D_'#D_OOQ!0Lf1G1P1G1PO%[QlO1G1POOQ!0Lf1G1g1G1gO#3iQ`O1G1PO#5}Q!0MxO1G1QO#6UQ!0MxO1G1QO#8lQ!0MxO1G1QO#8sQ!0MxO1G1QO#;ZQ!0MxO1G1QO#=qQ!0MxO1G1QO#=xQ!0MxO1G1QO#>PQ!0MxO1G1QO#@gQ!0MxO1G1QO#@nQ!0MxO1G1QO#B{Q?MtO'#CiO#DvQ?MtO1G1aO#D}Q?MtO'#JtO#EbQ!0MxO,5?]OOQ!0Lb-E<o-E<oO#GoQ!0MxO1G1QO#HlQ!0MzO1G1QOOQ!0Lf1G1Q1G1QO#IoQMjO'#J}O#IyQ`O,5:xO#JOQ!0MxO1G1dO#JrQ,UO,5<XO#JzQ,UO,5<YO#KSQ,UO'#FpO#KkQ`O'#FoOOQO'#KZ'#KZOOQO'#Io'#IoO#KpQ,UO1G1oOOQ!0Lf1G1o1G1oOOOW1G1z1G1zO#LRQ?MtO'#JsO#L]Q`O,5<cO!)gQlO,5<cOOOW-E<n-E<nOOQ!0Lf1G1m1G1mO#LbQpO'#KYOOQ!0Lf,5<e,5<eO#LjQpO,5<eO#LoQMhO'#DTOOOO'#Ic'#IcO#LvO#@ItO,59mOOQ!0Lh,59m,59mO%[QlO1G2QO!8wQ`O'#IsO#MRQ`O,5<{OOQ!0Lh,5<x,5<xO!,`QMhO'#IvO#MoQMjO,5=YO!,`QMhO'#IxO#NbQMjO,5=[O!'VQMhO,5=^OOQO1G2T1G2TO#NlQ!dO'#CrO$ PQ(CWO'#ErO$!XQpO'#GcO$!oQ!dO,5<tO$!vQ`O'#K]O9eQ`O'#K]O$#UQ`O,5<vO$#lQ!dO'#C{O!,`QMhO,5<uO$#vQ`O'#G[O$$[Q`O,5<uO$$aQ!dO'#GXO$$nQ!dO'#K^O$$xQ`O'#K^O!'VQMhO'#K^O$$}Q`O,5<yO$%SQlO'#JwO$%^QpO'#GdO#$iQpO'#GdO$%oQ`O'#GhO!3zQ`O'#GlO$%tQ!0LrO'#IuO$&PQpO,5<}OOQ!0Lp,5<},5<}O$&WQpO'#GdO$&eQpO'#GeO$&vQpO'#GeO$&{QMjO,5=YO$']QMjO,5=[OOQ!0Lh,5=_,5=_O!,`QMhO,5@WO!,`QMhO,5@WO$'mQ`O'#IzO$(RQ`O,5@VO$(ZQ`O,59aOOQ!0Lh,59i,59iO$(`Q`O,5@WO$)`Q$IYO,59uOOQ!0Lh'#Jq'#JqO$*RQMjO,5<lO$*tQMjO,5<nO<eQ`O,5<pOOQ!0Lh,5<q,5<qO$+OQ`O,5<wO$+TQMjO,5<|O$+eQ`O'#KQO!%SQlO1G2SO$+jQ`O1G2SO9eQ`O'#KTO$+oQ`O'#D_O9eQ`O'#EtO%[QlO'#EtO9eQ`O'#I|O$+}Q!0LrO,5@|OOQ[1G3O1G3OOOQ[1G4a1G4aOOQ!0Lf1G/|1G/|OOQ!0Lf1G/z1G/zO$.PQ!0MxO1G0UOOQ[1G2z1G2zO!'VQMhO1G2zO%[QlO1G2zO#/PQ`O1G2zO$0TQMhO'#EkOOQ!0Lb,5@U,5@UO$0bQ!0LrO,5@UOOQ[1G.u1G.uO!CZQ!0LrO1G.uO!CfQpO1G.uO!CnQMhO1G.uO$0sQ`O1G0uO$0xQ`O'#CiO$1TQ`O'#KfO$1]Q`O,5=}O$1bQ`O'#KfO$1gQ`O'#KfO$1uQ`O'#JSO$2TQ`O,5APO$2]Q!fO1G1jOOQ!0Lf1G1l1G1lO9kQ`O1G3gO<eQ`O1G3gO$2dQ`O1G3gO$2iQ`O1G3gO!DyQ`O1G3gO9uQ!0LrO1G3gOOQ[1G3g1G3gO!EsQ`O1G3VO!'VQMhO1G3SO$2nQ`O1G3SOOQ[1G3T1G3TO!'VQMhO1G3TO$2sQ`O1G3TO$2{QpO'#HROOQ[1G3V1G3VO!6jQpO'#JOO!ExQ!bO1G3YOOQ[1G3Y1G3YOOQ[,5=s,5=sO$3TQMhO,5=uO9kQ`O,5=uO$%oQ`O,5=wO9`Q`O,5=wO!CfQpO,5=wO!CnQMhO,5=wO:dQMhO,5=wO$3cQ`O'#KdO$3nQ`O,5=xOOQ[1G.k1G.kO$3sQ!0LrO1G.kO<eQ`O1G.kO$4OQ`O1G.kO9uQ!0LrO1G.kO$6WQ!fO,5ARO$6eQ`O,5ARO9eQ`O,5ARO$6pQlO,5>QO$6wQ`O,5>QOOQ[1G3j1G3jO`QlO1G3jOOQ[1G3p1G3pOOQ[1G3r1G3rO?`Q`O1G3tO$6|QlO1G3vO$;QQlO'#HuOOQ[1G3y1G3yO$;_Q`O'#H{O?eQ`O'#H}OOQ[1G4P1G4PO$;gQlO1G4PO9uQ!0LrO1G4VOOQ[1G4X1G4XOOQ!0Lb'#G`'#G`O9uQ!0LrO1G4ZO9uQ!0LrO1G4]O$?nQ`O,5@cO9eQ`O,5;`O?eQ`O,5:XO!)gQlO,5:XO!CfQpO,5:XO$?sQ?MtO,5:XOOQO,5;`,5;`O$?}QpO'#IfO$@eQ`O,5@bOOQ!0Lf1G/r1G/rO!)gQlO,5;`O$@mQpO'#IlO$@wQ`O,5@qOOQ!0Lb1G0y1G0yO#$iQpO,5:XOOQO'#Ih'#IhO$APQpO,5:qOOQ!0Ln,5:q,5:qO#(fQ`O1G0ZOOQ!0Lf1G0Z1G0ZO%[QlO1G0ZOOQ!0Lf1G0t1G0tO?eQ`O1G0tO!CfQpO1G0tO!CnQMhO1G0tOOQ!0Lb1G5}1G5}O!CZQ!0LrO1G0^OOQO1G0m1G0mO%[QlO1G0mO$AWQ!0LrO1G0mO$AcQ!0LrO1G0mO!CfQpO1G0^ODcQpO1G0^O$AqQ!0LrO1G0mOOQO1G0^1G0^O$BVQ!0MxO1G0mPOOO-E<]-E<]POOO1G.h1G.hOOOO1G/i1G/iO$BaQ!bO,5<jO$BiQ!fO1G4kOOQO1G4q1G4qO%[QlO,5?PO$BsQ`O1G5{O$B{Q`O1G6ZO$CTQ!fO1G6[O9eQ`O,5?VO$C_Q!0MxO1G6XO%[QlO1G6XO$CoQ!0LrO1G6XO$DQQ`O1G6WO$DQQ`O1G6WO9eQ`O1G6WO$DYQ`O,5?YO9eQ`O,5?YOOQO,5?Y,5?YO$DnQ`O,5?YO$+eQ`O,5?YOOQO-E<l-E<lOOQS1G0a1G0aOOQS1G0c1G0cO#.wQ`O1G0cOOQ[7+(f7+(fO!'VQMhO7+(fO%[QlO7+(fO$D|Q`O7+(fO$EXQMhO7+(fO$EgQ!0MzO,5=YO$GrQ!0MzO,5=[O$I}Q!0MzO,5=YO$L`Q!0MzO,5=[O$NqQ!0MzO,59uO%!vQ!0MzO,5<lO%%RQ!0MzO,5<nO%'^Q!0MzO,5<|OOQ!0Lf7+&a7+&aO%)oQ!0MxO7+&aO%*cQlO'#IgO%*pQ`O,5@dO%*xQ!fO,5@dOOQ!0Lf1G0P1G0PO%+SQ`O7+&kOOQ!0Lf7+&k7+&kO%+XQ?MtO,5:fO%[QlO7+&{O%+cQ?MtO,5:bO%+pQ?MtO,5:jO%+zQ?MtO,5:lO%,UQMhO'#IjO%,`Q`O,5@iOOQ!0Lh1G0d1G0dOOQO1G1s1G1sOOQO1G1t1G1tO%,hQ!jO,5<[O!)gQlO,5<ZOOQO-E<m-E<mOOQ!0Lf7+'Z7+'ZOOOW7+'f7+'fOOOW1G1}1G1}O%,sQ`O1G1}OOQ!0Lf1G2P1G2POOOO,59o,59oO%,xQ!dO,59oOOOO-E<a-E<aOOQ!0Lh1G/X1G/XO%-PQ!0MxO7+'lOOQ!0Lh,5?_,5?_O%-sQMhO1G2gP%-zQ`O'#IsPOQ!0Lh-E<q-E<qO%.hQMjO,5?bOOQ!0Lh-E<t-E<tO%/ZQMjO,5?dOOQ!0Lh-E<v-E<vO%/eQ!dO1G2xO%/lQ!dO'#CrO%0SQMhO'#KTO$%SQlO'#JwOOQ!0Lh1G2`1G2`O%0^Q`O'#IrO%0uQ`O,5@wO%0uQ`O,5@wO%0}Q`O,5@wO%1YQ`O,5@wOOQO1G2b1G2bO%1hQMjO1G2aO$+eQ`O'#K]O!,`QMhO1G2aO%1xQ(CWO'#ItO%2VQ`O,5@xO!'VQMhO,5@xO%2_Q!dO,5@xOOQ!0Lh1G2e1G2eO%4oQ!fO'#CiO%4yQ`O,5=QOOQ!0Lb,5=O,5=OO%5RQpO,5=OOOQ!0Lb,5=P,5=PODSQ`O,5=OO%5^QpO,5=OOOQ!0Lb,5=S,5=SO$+eQ`O,5=WOOQO,5?a,5?aOOQO-E<s-E<sOOQ!0Lp1G2i1G2iO#$iQpO,5=OO$%SQlO,5=QO%5lQ`O,5=PO%5wQpO,5=PO!,`QMhO'#IvO%6qQMjO1G2tO!,`QMhO'#IxO%7dQMjO1G2vO%7nQMjO1G5rO%7xQMjO1G5rOOQO,5?f,5?fOOQO-E<x-E<xOOQO1G.{1G.{O!,`QMhO1G5rO!,`QMhO1G5rO!=gQpO,59wO%[QlO,59wOOQ!0Lh,5<k,5<kO%8VQ`O1G2[O!,`QMhO1G2cO%8[Q!0MxO7+'nOOQ!0Lf7+'n7+'nO!%SQlO7+'nO%9OQ`O,5;`OOQ!0Lb,5?h,5?hOOQ!0Lb-E<z-E<zO%9TQ!dO'#K_O#(fQ`O7+(fO4UQ!fO7+(fO$EPQ`O7+(fO%9_Q!0MvO'#CiO%9rQ!0MvO,5=TO%:VQ`O,5=TO%:_Q`O,5=TOOQ!0Lb1G5p1G5pOOQ[7+$a7+$aO!CZQ!0LrO7+$aO!CfQpO7+$aO!%SQlO7+&aO%:dQ`O'#JRO%:{Q`O,5AQOOQO1G3i1G3iO9kQ`O,5AQO%:{Q`O,5AQO%;TQ`O,5AQOOQO,5?n,5?nOOQO-E=Q-E=QOOQ!0Lf7+'U7+'UO%;YQ`O7+)RO9uQ!0LrO7+)RO9kQ`O7+)RO<eQ`O7+)RO%;_Q`O7+)ROOQ[7+)R7+)ROOQ[7+(q7+(qO%;dQ!0MvO7+(nO!'VQMhO7+(nO!EnQ`O7+(oOOQ[7+(o7+(oO!'VQMhO7+(oO%;nQ`O'#KcO%;yQ`O,5=mOOQO,5?j,5?jOOQO-E<|-E<|OOQ[7+(t7+(tO%=]QpO'#H[OOQ[1G3a1G3aO!'VQMhO1G3aO%[QlO1G3aO%=dQ`O1G3aO%=oQMhO1G3aO9uQ!0LrO1G3cO$%oQ`O1G3cO9`Q`O1G3cO!CfQpO1G3cO!CnQMhO1G3cO%=}Q`O'#JQO%>cQ`O,5AOO%>kQpO,5AOOOQ!0Lb1G3d1G3dOOQ[7+$V7+$VO<eQ`O7+$VO9uQ!0LrO7+$VO%>vQ`O7+$VO%[QlO1G6mO%[QlO1G6nO%>{Q!0LrO1G6mO%?VQlO1G3lO%?^Q`O1G3lO%?cQlO1G3lOOQ[7+)U7+)UO9uQ!0LrO7+)`O`QlO7+)bOOQ['#Ki'#KiOOQ['#JT'#JTO%?jQlO,5>aOOQ[,5>a,5>aO%[QlO'#HvO%?wQ`O'#HxOOQ[,5>g,5>gO9eQ`O,5>gOOQ[,5>i,5>iOOQ[7+)k7+)kOOQ[7+)q7+)qOOQ[7+)u7+)uOOQ[7+)w7+)wO%?|QpO1G5}O%@hQ`O1G0zOOQO1G/s1G/sO%@sQ?MtO1G/sO?eQ`O1G/sO!)gQlO'#DmOOQO,5?Q,5?QOOQO-E<d-E<dO%@}Q?MtO1G0zOOQO,5?W,5?WOOQO-E<j-E<jO!CfQpO1G/sOOQO-E<f-E<fOOQ!0Ln1G0]1G0]OOQ!0Lf7+%u7+%uO#(fQ`O7+%uOOQ!0Lf7+&`7+&`O?eQ`O7+&`O!CfQpO7+&`OOQO7+%x7+%xO$BVQ!0MxO7+&XOOQO7+&X7+&XO%[QlO7+&XO%AXQ!0LrO7+&XO!CZQ!0LrO7+%xO!CfQpO7+%xO%AdQ!0LrO7+&XO%ArQ!0MxO7++sO%[QlO7++sO%BSQ`O7++rO%BSQ`O7++rOOQO1G4t1G4tO9eQ`O1G4tO%B[Q`O1G4tOOQS7+%}7+%}O#(fQ`O<<LQO4UQ!fO<<LQO%BjQ`O<<LQOOQ[<<LQ<<LQO!'VQMhO<<LQO%[QlO<<LQO%BrQ`O<<LQO%B}Q!0MzO,5?bO%EYQ!0MzO,5?dO%GeQ!0MzO1G2aO%IvQ!0MzO1G2tO%LRQ!0MzO1G2vO%N^Q!fO,5?RO%[QlO,5?ROOQO-E<e-E<eO%NhQ`O1G6OOOQ!0Lf<<JV<<JVO%NpQ?MtO1G0uO&!wQ?MtO1G1QO&#OQ?MtO1G1QO&%PQ?MtO1G1QO&%WQ?MtO1G1QO&'XQ?MtO1G1QO&)YQ?MtO1G1QO&)aQ?MtO1G1QO&)hQ?MtO1G1QO&+iQ?MtO1G1QO&+pQ?MtO1G1QO&+wQ!0MxO<<JgO&-oQ?MtO1G1QO&.lQ?MvO1G1QO&/oQ?MvO'#JmO&1uQ?MtO1G1dO&2SQ?MtO1G0UO&2^QMjO,5?UOOQO-E<h-E<hO!)gQlO'#FrOOQO'#K['#K[OOQO1G1v1G1vO&2hQ`O1G1uO&2mQ?MtO,5?]OOOW7+'i7+'iOOOO1G/Z1G/ZO&2wQ!dO1G4yOOQ!0Lh7+(R7+(RP!'VQMhO,5?_O!,`QMhO7+(dO&3OQ`O,5?^O9eQ`O,5?^O$+eQ`O,5?^OOQO-E<p-E<pO&3^Q`O1G6cO&3^Q`O1G6cO&3fQ`O1G6cO&3qQMjO7+'{O&4RQ!dO,5?`O&4]Q`O,5?`O!'VQMhO,5?`OOQO-E<r-E<rO&4bQ!dO1G6dO&4lQ`O1G6dO&4tQ`O1G2lO!'VQMhO1G2lOOQ!0Lb1G2j1G2jOOQ!0Lb1G2k1G2kO%5RQpO1G2jO!CfQpO1G2jODSQ`O1G2jOOQ!0Lb1G2r1G2rO&4yQpO1G2jO&5XQ`O1G2lO$+eQ`O1G2kODSQ`O1G2kO$%SQlO1G2lO&5aQ`O1G2kO&6TQMjO,5?bOOQ!0Lh-E<u-E<uO&6vQMjO,5?dOOQ!0Lh-E<w-E<wO!,`QMhO7++^O&7QQMjO7++^O&7[QMjO7++^OOQ!0Lh1G/c1G/cO&7iQ`O1G/cOOQ!0Lh7+'v7+'vO&7nQMjO7+'}O&8OQ!0MxO<<KYOOQ!0Lf<<KY<<KYO&8rQ`O1G0zO!'VQMhO'#I{O&8wQ`O,5@yO&:yQ!fO<<LQO!'VQMhO1G2oO&;QQ!0LrO1G2oOOQ[<<G{<<G{O!CZQ!0LrO<<G{O&;cQ!0MxO<<I{OOQ!0Lf<<I{<<I{OOQO,5?m,5?mO&<VQ`O,5?mO&<[Q`O,5?mOOQO-E=P-E=PO&<jQ`O1G6lO&<jQ`O1G6lO9kQ`O1G6lO<eQ`O<<LmOOQ[<<Lm<<LmO&<rQ`O<<LmO9uQ!0LrO<<LmO9kQ`O<<LmOOQ[<<LY<<LYO%;dQ!0MvO<<LYOOQ[<<LZ<<LZO!EnQ`O<<LZO&<wQpO'#I}O&=SQ`O,5@}O!)gQlO,5@}OOQ[1G3X1G3XOOQO'#JP'#JPO9uQ!0LrO'#JPO&=[QpO,5=vOOQ[,5=v,5=vO&=cQpO'#EgO&=jQpO'#GfO&=oQ`O7+({O&=tQ`O7+({OOQ[7+({7+({O!'VQMhO7+({O%[QlO7+({O&=|Q`O7+({OOQ[7+(}7+(}O9uQ!0LrO7+(}O$%oQ`O7+(}O9`Q`O7+(}O!CfQpO7+(}O&>XQ`O,5?lOOQO-E=O-E=OOOQO'#H_'#H_O&>dQ`O1G6jO9uQ!0LrO<<GqOOQ[<<Gq<<GqO<eQ`O<<GqO&>lQ`O7+,XO&>qQ`O7+,YO%[QlO7+,XO%[QlO7+,YOOQ[7+)W7+)WO&>vQ`O7+)WO&>{QlO7+)WO&?SQ`O7+)WOOQ[<<Lz<<LzOOQ[<<L|<<L|OOQ[-E=R-E=ROOQ[1G3{1G3{O&?XQ`O,5>bOOQ[,5>d,5>dO&?^Q`O1G4RO9eQ`O7+&fO!)gQlO7+&fOOQO7+%_7+%_O&?cQ?MtO1G6[O?eQ`O7+%_OOQ!0Lf<<Ia<<IaOOQ!0Lf<<Iz<<IzO?eQ`O<<IzOOQO<<Is<<IsO$BVQ!0MxO<<IsO%[QlO<<IsOOQO<<Id<<IdO!CZQ!0LrO<<IdO&?mQ!0LrO<<IsO&?xQ!0MxO<= _O&@YQ`O<= ^OOQO7+*`7+*`O9eQ`O7+*`OOQ[ANAlANAlO&@bQ!fOANAlO!'VQMhOANAlO#(fQ`OANAlO4UQ!fOANAlO&@iQ`OANAlO%[QlOANAlO&@qQ!0MzO7+'{O&CSQ!0MzO,5?bO&E_Q!0MzO,5?dO&GjQ!0MzO7+'}O&I{Q!fO1G4mO&JVQ?MtO7+&aO&LZQ?MvO,5=YO&NbQ?MvO,5=[O&NrQ?MvO,5=YO' SQ?MvO,5=[O' dQ?MvO,59uO'#jQ?MvO,5<lO'%mQ?MvO,5<nO'(RQ?MvO,5<|O')wQ?MtO7+'lO'*UQ?MtO7+'nO'*cQ`O,5<^OOQO7+'a7+'aOOQ!0Lh7+*e7+*eO'*hQMjO<<LOOOQO1G4x1G4xO'*oQ`O1G4xO'*zQ`O1G4xO'+YQ`O7++}O'+YQ`O7++}O!'VQMhO1G4zO'+bQ!dO1G4zO'+lQ`O7+,OO'+tQ`O7+(WO',PQ!dO7+(WOOQ!0Lb7+(U7+(UOOQ!0Lb7+(V7+(VO!CfQpO7+(UODSQ`O7+(UO',ZQ`O7+(WO!'VQMhO7+(WO$+eQ`O7+(VO',`Q`O7+(WODSQ`O7+(VO',hQMjO<<NxO!,`QMhO<<NxOOQ!0Lh7+$}7+$}O',rQ!dO,5?gOOQO-E<y-E<yO',|Q!0MvO7+(ZO!'VQMhO7+(ZOOQ[AN=gAN=gO9kQ`O1G5XOOQO1G5X1G5XO'-^Q`O1G5XO'-cQ`O7+,WO'-cQ`O7+,WO9uQ!0LrOANBXO<eQ`OANBXOOQ[ANBXANBXO'-kQ`OANBXOOQ[ANAtANAtOOQ[ANAuANAuO'-pQ`O,5?iOOQO-E<{-E<{O'-{Q?MtO1G6iOOQO,5?k,5?kOOQO-E<}-E<}OOQ[1G3b1G3bO'.VQ`O,5=QOOQ[<<Lg<<LgO!'VQMhO<<LgO&=oQ`O<<LgO'.[Q`O<<LgO%[QlO<<LgOOQ[<<Li<<LiO9uQ!0LrO<<LiO$%oQ`O<<LiO9`Q`O<<LiO'.dQpO1G5WO'.oQ`O7+,UOOQ[AN=]AN=]O9uQ!0LrOAN=]OOQ[<= s<= sOOQ[<= t<= tO'.wQ`O<= sO'.|Q`O<= tOOQ[<<Lr<<LrO'/RQ`O<<LrO'/WQlO<<LrOOQ[1G3|1G3|O?eQ`O7+)mO'/_Q`O<<JQO'/jQ?MtO<<JQOOQO<<Hy<<HyOOQ!0LfAN?fAN?fOOQOAN?_AN?_O$BVQ!0MxOAN?_OOQOAN?OAN?OO%[QlOAN?_OOQO<<Mz<<MzOOQ[G27WG27WO!'VQMhOG27WO#(fQ`OG27WO'/tQ!fOG27WO4UQ!fOG27WO'/{Q`OG27WO'0TQ?MtO<<JgO'0bQ?MvO1G2aO'2WQ?MvO,5?bO'4ZQ?MvO,5?dO'6^Q?MvO1G2tO'8aQ?MvO1G2vO':dQ?MtO<<KYO':qQ?MtO<<I{OOQO1G1x1G1xO!,`QMhOANAjOOQO7+*d7+*dO';OQ`O7+*dO';ZQ`O<= iO';cQ!dO7+*fOOQ!0Lb<<Kr<<KrO$+eQ`O<<KrODSQ`O<<KrO';mQ`O<<KrO!'VQMhO<<KrOOQ!0Lb<<Kp<<KpO!CfQpO<<KpO';xQ!dO<<KrOOQ!0Lb<<Kq<<KqO'<SQ`O<<KrO!'VQMhO<<KrO$+eQ`O<<KqO'<XQMjOANDdO'<cQ!0MvO<<KuOOQO7+*s7+*sO9kQ`O7+*sO'<sQ`O<= rOOQ[G27sG27sO9uQ!0LrOG27sO<eQ`OG27sO!)gQlO1G5TO'<{Q`O7+,TO'=TQ`O1G2lO&=oQ`OANBROOQ[ANBRANBRO!'VQMhOANBRO'=YQ`OANBROOQ[ANBTANBTO9uQ!0LrOANBTO$%oQ`OANBTOOQO'#H`'#H`OOQO7+*r7+*rOOQ[G22wG22wOOQ[ANE_ANE_OOQ[ANE`ANE`OOQ[ANB^ANB^O'=bQ`OANB^OOQ[<<MX<<MXO!)gQlOAN?lOOQOG24yG24yO$BVQ!0MxOG24yO#(fQ`OLD,rOOQ[LD,rLD,rO!'VQMhOLD,rO'=gQ!fOLD,rO'=nQ?MvO7+'{O'?dQ?MvO,5?bO'AgQ?MvO,5?dO'CjQ?MvO7+'}O'E`QMjOG27UOOQO<<NO<<NOOOQ!0LbANA^ANA^O$+eQ`OANA^ODSQ`OANA^O'EpQ!dOANA^OOQ!0LbANA[ANA[O'EwQ`OANA^O!'VQMhOANA^O'FSQ!dOANA^OOQ!0LbANA]ANA]OOQO<<N_<<N_OOQ[LD-_LD-_O9uQ!0LrOLD-_O'F^Q?MtO7+*oOOQO'#Gg'#GgOOQ[G27mG27mO&=oQ`OG27mO!'VQMhOG27mOOQ[G27oG27oO9uQ!0LrOG27oOOQ[G27xG27xO'FhQ?MtOG25WOOQOLD*eLD*eOOQ[!$(!^!$(!^O#(fQ`O!$(!^O!'VQMhO!$(!^O'FrQ!0MzOG27UOOQ!0LbG26xG26xO$+eQ`OG26xO'ITQ`OG26xODSQ`OG26xO'I`Q!dOG26xO!'VQMhOG26xOOQ[!$(!y!$(!yOOQ[LD-XLD-XO&=oQ`OLD-XOOQ[LD-ZLD-ZOOQ[!)9Ex!)9ExO#(fQ`O!)9ExOOQ!0LbLD,dLD,dO$+eQ`OLD,dODSQ`OLD,dO'IgQ`OLD,dO'IrQ!dOLD,dOOQ[!$(!s!$(!sOOQ[!.K;d!.K;dO'IyQ?MvOG27UOOQ!0Lb!$(!O!$(!OO$+eQ`O!$(!OODSQ`O!$(!OO'KoQ`O!$(!OOOQ!0Lb!)9Ej!)9EjO$+eQ`O!)9EjODSQ`O!)9EjOOQ!0Lb!.K;U!.K;UO$+eQ`O!.K;UOOQ!0Lb!4/0p!4/0pO!)gQlO'#DzO1PQ`O'#EXO'KzQ!fO'#JsO'LRQ!L^O'#DvO'LYQlO'#EOO'LaQ!fO'#CiO'NwQ!fO'#CiO!)gQlO'#EQO( XQlO,5;ZO!)gQlO,5;fO!)gQlO,5;fO!)gQlO,5;fO!)gQlO,5;fO!)gQlO,5;fO!)gQlO,5;fO!)gQlO,5;fO!)gQlO,5;fO!)gQlO,5;fO!)gQlO,5;fO!)gQlO'#IqO(#[Q`O,5<jO!)gQlO,5;fO(#dQMhO,5;fO($}QMhO,5;fO!)gQlO,5;xO!'VQMhO'#GnO(#dQMhO'#GnO!'VQMhO'#GpO(#dQMhO'#GpO1SQ`O'#DZO1SQ`O'#DZO!'VQMhO'#GQO(#dQMhO'#GQO!'VQMhO'#GSO(#dQMhO'#GSO!'VQMhO'#GbO(#dQMhO'#GbO!)gQlO,5:jO(%UQpO'#D_O!)gQlO,5@pO( XQlO1G0uO(%`Q?MtO'#CiO!)gQlO1G2QO!'VQMhO'#IvO(#dQMhO'#IvO!'VQMhO'#IxO(#dQMhO'#IxO(%jQ!dO'#CrO!'VQMhO,5<uO(#dQMhO,5<uO( XQlO1G2SO!)gQlO7+&{O!'VQMhO1G2aO(#dQMhO1G2aO!'VQMhO'#IvO(#dQMhO'#IvO!'VQMhO'#IxO(#dQMhO'#IxO!'VQMhO1G2cO(#dQMhO1G2cO( XQlO7+'nO( XQlO7+&aO!'VQMhOANAjO(#dQMhOANAjO(%}Q`O'#EoO(&SQ`O'#EoO(&[Q`O'#F^O(&aQ`O'#EzO(&fQ`O'#KUO(&qQ`O'#KSO(&|Q`O,5;ZO('RQMjO,5<fO('YQ`O'#GZO('_Q`O'#GZO('dQ`O,5<fO('lQ`O,5<hO('tQ`O,5;ZO('|Q?MtO1G1aO((TQ`O,5<uO((YQ`O,5<uO((_Q`O,5<wO((dQ`O,5<wO((iQ`O1G2SO((nQ`O1G0uO((sQMjO<<LOO((zQMjO<<LOO()RQMhO'#F}O9`Q`O'#F|OBQQ`O'#EnO!)gQlO,5;uO!3zQ`O'#GZO!3zQ`O'#GZO!3zQ`O'#G]O!3zQ`O'#G]O!,`QMhO7+(dO!,`QMhO7+(dO%/eQ!dO1G2xO%/eQ!dO1G2xO!'VQMhO,5=^O!'VQMhO,5=^",
	stateData: "(*W~O'}OS(OOSTOS(PRQ~OPYOQYOSfOY!VOaqOdzOeyOl!POpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!uwO!xxO!|]O$X|O$oiO%i}O%k!QO%m!OO%n!OO%o!OO%r!RO%t!SO%w!TO%x!TO%z!UO&X!WO&_!XO&a!YO&c!ZO&e![O&h!]O&n!^O&t!_O&v!`O&x!aO&z!bO&|!cO(USO(WTO(ZUO(bVO(p[O~OWtO~P`OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$X!kO$oiO(U!dO(WTO(ZUO(bVO(p[O~Oa!wOs!nO!S!oO!b!yO!c!vO!d!vO!|<XO#T!pO#U!pO#V!xO#W!pO#X!pO#[!zO#]!zO(V!lO(WTO(ZUO(f!mO(p!sO~O(P!{O~OP]XR]X[]Xa]Xj]Xr]X!Q]X!S]X!]]X!l]X!p]X#R]X#S]X#`]X#lfX#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#w]X#y]X#{]X#|]X$R]X'{]X(b]X(s]X(z]X({]X~O!g%SX~P(qO_!}O(W#PO(X!}O(Y#PO~O_#QO(Y#PO(Z#PO([#QO~Ox#SO!U#TO(c#TO(d#VO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$X!kO$oiO(U<]O(WTO(ZUO(bVO(p[O~O![#ZO!]#WO!Y(iP!Y(wP~P+}O!^#cO~P`OPYOQYOSfOd!jOe!iOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$X!kO$oiO(WTO(ZUO(bVO(p[O~Op#mO![#iO!|]O#j#lO#k#iO(U<^O!k(tP~P.iO!l#oO(U#nO~O!x#sO!|]O%i#tO~O#l#uO~O!g#vO#l#uO~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!]$_O!l#xO!p$[O#R$RO#o$OO#p$PO#q$PO#r$PO#s$QO#t$RO#u$RO#v$bO#w$SO#y$UO#{$WO#|$XO(bVO(s$YO(z#|O({#}O~Oa(gX'{(gX'x(gX!k(gX!Y(gX!_(gX%j(gX!g(gX~P1qO#S$dO#`$eO$R$eOP(hXR(hX[(hXj(hXr(hX!Q(hX!S(hX!](hX!l(hX!p(hX#R(hX#o(hX#p(hX#q(hX#r(hX#s(hX#t(hX#u(hX#v(hX#w(hX#y(hX#{(hX#|(hX(b(hX(s(hX(z(hX({(hX!_(hX%j(hX~Oa(hX'{(hX'x(hX!Y(hX!k(hXv(hX!g(hX~P4UO#`$eO~O$^$hO$`$gO$g$mO~OSfO!_$nO$j$oO$l$qO~Oh%VOj%dOk%dOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#k%cO$X%`O$u%^O$w%_O$z%aO(U$sO(WTO(ZUO(b$uO(z$}O({%POg(_P~Ol%[O~P7eO!l%eO~O!S%hO!_%iO(U%gO~O!g%mO~Oa%nO'{%nO~O!Q%rO~P%[O(V!lO~P%[O%o%vO~P%[Oh%VO!l%eO(U%gO(V!lO~Oe%}O!l%eO(U%gO~Oj$RO~O!_&PO(U%gO(V!lO(WTO(ZUO`)XP~O!Q&SO!l&RO%k&VO&U&WO~P;SO!x#sO~O%t&YO!S)TX!_)TX(U)TX~O(U&ZO~O(U%gO(WTO(ZUO~Ol!PO!u&`O%k!QO%m!OO%n!OO%o!OO%r!RO%t!SO%w!TO%x!TO~Od&eOe&dO!x&bO%i&cO%|&aO~P<mOd&hOeyOl!PO!_&gO!u&`O!xxO!|]O%i}O%m!OO%n!OO%o!OO%r!RO%t!SO%w!TO%x!TO%z!UO~Ob&kO#`&nO%k&iO(V!lO~P=rO!l&oO!u&sO~O!l#oO~O!_XO~Oa%nO'y&{O'{%nO~Oa%nO'y'OO'{%nO~Oa%nO'y'QO'{%nO~O'x]X!Y]Xv]X!k]X&]]X!_]X%j]X!g]X~P(qO!b'`O!c'WO!d'WO(V!lO(WTO(ZUO~Os'UO!S'TO!['XO(f'SO!^(jP!^(yP~P@yOn'cO!_'aO(U%gO~Oe'hO!l%eO(U%gO~O!Q&SO!l&RO~Os!nO!S!oO!|<XO#T!pO#U!pO#W!pO#X!pO(V!lO(WTO(ZUO(f!mO(p!sO~O!b'nO!c'mO!d'mO#V!pO#['oO#]'oO~PBeOa%nOh%VO!g#vO!l%eO'{%nO(s'qO~O!p'uO#`'sO~PCsOs!nO!S!oO(WTO(ZUO(f!mO(p!sO~O!_XOs(nX!S(nX!b(nX!c(nX!d(nX!|(nX#T(nX#U(nX#V(nX#W(nX#X(nX#[(nX#](nX(V(nX(W(nX(Z(nX(f(nX(p(nX~O!c'mO!d'mO(V!lO~PDcO(Q'yO(R'yO(S'{O~O_!}O(W'}O(X!}O(Y'}O~O_#QO(Y'}O(Z'}O([#QO~Ov(PO~P%[Ox#SO!U#TO(c#TO(d(SO~O![(UO!Y'XX!Y'_X!]'XX!]'_X~P+}O!](WO!Y(iX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!](WO!l#xO!p$[O#R$RO#o$OO#p$PO#q$PO#r$PO#s$QO#t$RO#u$RO#v$bO#w$SO#y$UO#{$WO#|$XO(bVO(s$YO(z#|O({#}O~O!Y(iX~PH^O!Y(]O~O!Y(vX!](vX!g(vX!k(vX(s(vX~O#`(vX#l#dX!^(vX~PJaO#`(^O!Y(xX!](xX~O!](_O!Y(wX~O!Y(bO~O#`$eO~PJaO!^(cO~P`OR#zO!Q#yO!S#{O!l#xO(bVOP!na[!naj!nar!na!]!na!p!na#R!na#o!na#p!na#q!na#r!na#s!na#t!na#u!na#v!na#w!na#y!na#{!na#|!na(s!na(z!na({!na~Oa!na'{!na'x!na!Y!na!k!nav!na!_!na%j!na!g!na~PKwO!k(dO~O!g#vO#`(eO(s'qO!](uXa(uX'{(uX~O!k(uX~PNdO!S%hO!_%iO!|]O#j(jO#k(iO(U%gO~O!](kO!k(tX~O!k(mO~O!S%hO!_%iO#k(iO(U%gO~OP(hXR(hX[(hXj(hXr(hX!Q(hX!S(hX!](hX!l(hX!p(hX#R(hX#o(hX#p(hX#q(hX#r(hX#s(hX#t(hX#u(hX#v(hX#w(hX#y(hX#{(hX#|(hX(b(hX(s(hX(z(hX({(hX~O!g#vO!k(hX~P!!QOR(oO!Q(nO!l#xO#S$dO!|!{a!S!{a~O!x!{a%i!{a!_!{a#j!{a#k!{a(U!{a~P!$RO!x(sO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$X!kO$oiO(U!dO(WTO(ZUO(bVO(p[O~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<uO!S${O!_$|O!i>WO!l$xO#k<{O$X%`O$u<wO$w<yO$z%aO(U(wO(WTO(ZUO(b$uO(z$}O({%PO~O#l(yO~O![({O!k(lP~P%[O(f(}O(p[O~O!S)PO!l#xO(f(}O(p[O~OP<WOQ<WOSfOd>SOe!iOpkOr<WOskOtkOzkO|<WO!O<WO!SWO!WkO!XkO!_!eO!i<ZO!lZO!o<WO!p<WO!q<WO!s<[O!u<_O!x!hO$X!kO$o>QO(U)^O(WTO(ZUO(bVO(p[O~O!]$_Oa$ra'{$ra'x$ra!k$ra!Y$ra!_$ra%j$ra!g$ra~Ol)eO~P!'VOh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#k%cO$X%`O$u%^O$w%_O$z%aO(U(wO(WTO(ZUO(b$uO(z$}O({%PO~Og(qP~P!,`O!Q)jO!g)iO!_$_X$[$_X$^$_X$`$_X$g$_X~O!g)iO!_(|X$[(|X$^(|X$`(|X$g(|X~O!Q)jO~P!.iO!Q)jO!_(|X$[(|X$^(|X$`(|X$g(|X~O!_)lO$[)pO$^)kO$`)kO$g)qO~O![)tO~P!)gO$^$hO$`$gO$g)xO~On${X!Q${X#S${X'z${X(z${X({${X~OgmXg${XnmX!]mX#`mX~P!0_Ox)zO(c){O(d)}O~On*WO!Q*PO'z*QO(z$}O({%PO~Og*OO~P!1cOg*XO~Oh%VOr%XOs$tOt$tOz%YO|%ZO!O<uO!S*ZO!_*[O!i>WO!l$xO#k<{O$X%`O$u<wO$w<yO$z%aO(WTO(ZUO(b$uO(z$}O({%PO~Op*aO![*_O(U*YO!k)PP~P!2QO#l*bO~O!l*cO~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<uO!S${O!_$|O!i>WO!l$xO#k<{O$X%`O$u<wO$w<yO$z%aO(U*eO(WTO(ZUO(b$uO(z$}O({%PO~O![*hO!Y)QP~P!4POr*tOs!nO!S*jO!b*rO!c*lO!d*lO!l*cO#[*sO%a*nO(V!lO(WTO(ZUO(f!mO~O!^*qO~P!5tO#S$dOn(aX!Q(aX'z(aX(z(aX({(aX!](aX#`(aX~Og(aX$P(aX~P!6vOn*yO#`*xOg(`X!](`X~O!]*zOg(_X~Oj%dOk%dOl%dO(U&ZOg(_P~Os*}O~Og*OO(U&ZO~O!l+TO~O(U(wO~Op+XO!S%hO![#iO!_%iO!|]O#j#lO#k#iO(U%gO!k(tP~O!g#vO#l+YO~O!S%hO![+[O!](_O!_%iO(U%gO!Y(wP~Os']O!S+_O![+^O(WTO(ZUO(f+]O~O!^(yP~P!:XO!]+`Oa)UX'{)UX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#o$OO#p$PO#q$PO#r$PO#s$QO#t$RO#u$RO#v$bO#w$SO#y$UO#{$WO#|$XO(bVO(s$YO(z#|O({#}O~Oa!ja!]!ja'{!ja'x!ja!Y!ja!k!jav!ja!_!ja%j!ja!g!ja~P!;PO(f(}O~OR#zO!Q#yO!S#{O!l#xO(bVOP!ra[!raj!rar!ra!]!ra!p!ra#R!ra#o!ra#p!ra#q!ra#r!ra#s!ra#t!ra#u!ra#v!ra#w!ra#y!ra#{!ra#|!ra(s!ra(z!ra({!ra~Oa!ra'{!ra'x!ra!Y!ra!k!rav!ra!_!ra%j!ra!g!ra~P!=lOR#zO!Q#yO!S#{O!l#xO(bVOP!ta[!taj!tar!ta!]!ta!p!ta#R!ta#o!ta#p!ta#q!ta#r!ta#s!ta#t!ta#u!ta#v!ta#w!ta#y!ta#{!ta#|!ta(s!ta(z!ta({!ta~Oa!ta'{!ta'x!ta!Y!ta!k!tav!ta!_!ta%j!ta!g!ta~P!@SOh%VOn+iO!_'aO%j+hO~O!g+kOa(^X!_(^X'{(^X!](^X~Oa%nO!_XO'{%nO~Oh%VO!l%eO~Oh%VO!l%eO(U%gO~O!g#vO#l(yO~Ob+vO%k+wO(U+sO(WTO(ZUO!^)YP~O!]+xO`)XX~O[+|O~O`+}O~O!_&PO(U%gO(V!lO`)XP~O%k,QO~P;SOh%VO#`,UO~Oh%VOn,XO!_$|O~O!_,ZO~O!Q,]O!_XO~O%o%vO~O!x,bO~Oe,gO~Ob,hO(U#nO(WTO(ZUO!^)WP~Oe%}O~O%k!QO(U&ZO~P=rO[,mO`,lO~OPYOQYOSfOdzOeyOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!iuO!lZO!oYO!pYO!qYO!svO!xxO!|]O$oiO%i}O(WTO(ZUO(bVO(p[O~O!_!eO!u!gO$X!kO(U!dO~P!GZO`,lOa%nO'{%nO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!x!hO$X!kO$oiO(U!dO(WTO(ZUO(bVO(p[O~Oa,rOl!OO!uwO%m!OO%n!OO%o!OO~P!IsO!l&oO~O&_,xO~O!_,zO~O&p,|O&r,}OP&maQ&maS&maY&maa&mad&mae&mal&map&mar&mas&mat&maz&ma|&ma!O&ma!S&ma!W&ma!X&ma!_&ma!i&ma!l&ma!o&ma!p&ma!q&ma!s&ma!u&ma!x&ma!|&ma$X&ma$o&ma%i&ma%k&ma%m&ma%n&ma%o&ma%r&ma%t&ma%w&ma%x&ma%z&ma&X&ma&_&ma&a&ma&c&ma&e&ma&h&ma&n&ma&t&ma&v&ma&x&ma&z&ma&|&ma'x&ma(U&ma(W&ma(Z&ma(b&ma(p&ma!^&ma&f&mab&ma&k&ma~O(U-SO~Oh!eX!]#iX!^#iX!g!RX!g!eX!l!eX#`#iX~O!]!eX!^!eX~P#!yO!g-WOh(kX!](kX!^(kX!g(kX!l(kXr(kX(s(kX~Oh%VO!g-YO!l%eO!]!aX!^!aX~Os!nO!S!oO(WTO(ZUO(f!mO~OP<WOQ<WOSfOd>SOe!iOpkOr<WOskOtkOzkO|<WO!O<WO!SWO!WkO!XkO!_!eO!i<ZO!lZO!o<WO!p<WO!q<WO!s<[O!u<_O!x!hO$X!kO$o>QO(WTO(ZUO(bVO(p[O~O(U=RO~P#$zO!]-^O!^(jX~O!^-`O~O#`-aO!]#hX!^#hX~O!g-WO~O!]-bO!^(yX~O!^-dO~O!c-eO!d-eO(V!lO~P#$iO!^-hO~P'_On-kO!_'aO~O!Y-pO~Os!{a!b!{a!c!{a!d!{a#T!{a#U!{a#V!{a#W!{a#X!{a#[!{a#]!{a(V!{a(W!{a(Z!{a(f!{a(p!{a~P!$RO!p-uO#`-sO~PCsO!c-wO!d-wO(V!lO~PDcOa%nO#`-sO'{%nO~Oa%nO!g#vO#`-sO'{%nO~Oa%nO!g#vO!p-uO#`-sO'{%nO(s'qO~O(Q'yO(R'yO(S-|O~Ov-}O~O!Y'Xa!]'Xa~P!;PO![.RO!Y'XX!]'XX~P%[O!](WO!Y(ia~O!Y(ia~PH^O!](_O!Y(wa~O!S%hO![.VO!_%iO(U%gO!Y'_X!]'_X~O#`.XO!](ua!k(uaa(ua'{(ua~O!g#vO~P#-SO!](kO!k(ta~O!S%hO!_%iO#k.]O(U%gO~Op.bO!S%hO![._O!_%iO!|]O#j.aO#k._O(U%gO!]'bX!k'bX~OR.fO!l#xO~Oh%VOn.iO!_'aO%j.hO~Oa#ci!]#ci'{#ci'x#ci!Y#ci!k#civ#ci!_#ci%j#ci!g#ci~P!;POn>^O!Q*PO'z*QO(z$}O({%PO~O#l#_aa#_a#`#_a'{#_a!]#_a!k#_a!_#_a!Y#_a~P#0OO#l(aXP(aXR(aX[(aXa(aXj(aXr(aX!S(aX!l(aX!p(aX#R(aX#o(aX#p(aX#q(aX#r(aX#s(aX#t(aX#u(aX#v(aX#w(aX#y(aX#{(aX#|(aX'{(aX(b(aX(s(aX!k(aX!Y(aX'x(aXv(aX!_(aX%j(aX!g(aX~P!6vO!].vO!k(lX~P!;PO!k.yO~O!Y.{O~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(bVO[#nia#nij#nir#ni!]#ni#R#ni#p#ni#q#ni#r#ni#s#ni#t#ni#u#ni#v#ni#w#ni#y#ni#{#ni#|#ni'{#ni(s#ni(z#ni({#ni'x#ni!Y#ni!k#niv#ni!_#ni%j#ni!g#ni~O#o#ni~P#3nO#o$OO~P#3nOP$[OR#zOr$aO!Q#yO!S#{O!l#xO!p$[O#o$OO#p$PO#q$PO#r$PO(bVO[#nia#nij#ni!]#ni#R#ni#t#ni#u#ni#v#ni#w#ni#y#ni#{#ni#|#ni'{#ni(s#ni(z#ni({#ni'x#ni!Y#ni!k#niv#ni!_#ni%j#ni!g#ni~O#s#ni~P#6]O#s$QO~P#6]OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#o$OO#p$PO#q$PO#r$PO#s$QO#t$RO#u$RO#v$bO(bVOa#ni!]#ni#y#ni#{#ni#|#ni'{#ni(s#ni(z#ni({#ni'x#ni!Y#ni!k#niv#ni!_#ni%j#ni!g#ni~O#w#ni~P#8zOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#o$OO#p$PO#q$PO#r$PO#s$QO#t$RO#u$RO#v$bO#w$SO(bVO({#}Oa#ni!]#ni#{#ni#|#ni'{#ni(s#ni(z#ni'x#ni!Y#ni!k#niv#ni!_#ni%j#ni!g#ni~O#y$UO~P#;bO#y#ni~P#;bO#w$SO~P#8zOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#o$OO#p$PO#q$PO#r$PO#s$QO#t$RO#u$RO#v$bO#w$SO#y$UO(bVO(z#|O({#}Oa#ni!]#ni#|#ni'{#ni(s#ni'x#ni!Y#ni!k#niv#ni!_#ni%j#ni!g#ni~O#{#ni~P#>WO#{$WO~P#>WOP]XR]X[]Xj]Xr]X!Q]X!S]X!l]X!p]X#R]X#S]X#`]X#lfX#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#w]X#y]X#{]X#|]X$R]X(b]X(s]X(z]X({]X!]]X!^]X~O$P]X~P#@uOP$[OR#zO[<oOj<dOr<mO!Q#yO!S#{O!l#xO!p$[O#R<dO#o<aO#p<bO#q<bO#r<bO#s<cO#t<dO#u<dO#v<nO#w<eO#y<gO#{<iO#|<jO(bVO(s$YO(z#|O({#}O~O$P.}O~P#CSO#S$dO#`<pO$R<pO$P(hX!^(hX~P!!QOa'ea!]'ea'{'ea'x'ea!k'ea!Y'eav'ea!_'ea%j'ea!g'ea~P!;PO[#nia#nij#nir#ni!]#ni#R#ni#s#ni#t#ni#u#ni#v#ni#w#ni#y#ni#{#ni#|#ni'{#ni(s#ni'x#ni!Y#ni!k#niv#ni!_#ni%j#ni!g#ni~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#o$OO#p$PO#q$PO#r$PO(bVO(z#ni({#ni~P#FUOn>^O!Q*PO'z*QO(z$}O({%POP#niR#ni!S#ni!l#ni!p#ni#o#ni#p#ni#q#ni#r#ni(b#ni~P#FUO!]/ROg(qX~P!1cOg/TO~Oa$Qi!]$Qi'{$Qi'x$Qi!Y$Qi!k$Qiv$Qi!_$Qi%j$Qi!g$Qi~P!;PO$^/UO$`/UO~O$^/VO$`/VO~O!g)iO#`/WO!_$dX$[$dX$^$dX$`$dX$g$dX~O![/XO~O!_)lO$[/ZO$^)kO$`)kO$g/[O~O!]<kO!^(gX~P#CSO!^/]O~O!g)iO$g(|X~O$g/_O~Ov/`O~P!'VOx)zO(c){O(d/cO~O!S/fO~O(z$}On%ba!Q%ba'z%ba({%ba!]%ba#`%ba~Og%ba$P%ba~P#MWO({%POn%da!Q%da'z%da(z%da!]%da#`%da~Og%da$P%da~P#MyO!]fX!gfX!kfX!k${X(sfX~P!0_Op%WO![/oO!](_O(U/nO!Y(wP!Y)QP~P!2QOr*tO!b*rO!c*lO!d*lO!l*cO#[*sO%a*nO(V!lO(WTO(ZUO~Os'UO!S/pO![+^O!^*qO(f=OO!^(yP~P$ gO!k/qO~P#0OO!]/rO!g#vO(s'qO!k)PX~O!k/wO~OnoX!QoX'zoX(zoX({oX~O!g#vO!koX~P$#ZOp/yO!S%hO![*_O!_%iO(U%gO!k)PP~O#l/zO~O!Y${X!]${X!g%SX~P!0_O!]/{O!Y)QX~P#0OO!g/}O~O!Y0PO~OpkO(U0QO~P.iOh%VOr0VO!g#vO!l%eO(s'qO~O!g+kO~Oa%nO!]0ZO'{%nO~O!^0]O~P!5tO!c0^O!d0^O(V!lO~P#$iOs!nO!S0_O(WTO(ZUO(f!mO~O#[0aO~Og%ba!]%ba#`%ba$P%ba~P!1cOg%da!]%da#`%da$P%da~P!1cOj%dOk%dOl%dO(U&ZOg'nX!]'nX~O!]*zOg(_a~Og0jO~On0lO#`0kOg(`a!](`a~OR0mO!Q0mO!S0nO#S$dOn}a'z}a(z}a({}a!]}a#`}a~Og}a$P}a~P$(nO!Q*PO'z*QOn$ta(z$ta({$ta!]$ta#`$ta~Og$ta$P$ta~P$)jO!Q*PO'z*QOn$va(z$va({$va!]$va#`$va~Og$va$P$va~P$*]O#l0qO~Og%Ua!]%Ua#`%Ua$P%Ua~P!1cO!g#vO~O#l0tO~O!]#iX!^#iX!g!RX#`#iX~O!]+`Oa)Ua'{)Ua~OR#zO!Q#yO!S#{O!l#xO(bVOP!ri[!rij!rir!ri!]!ri!p!ri#R!ri#o!ri#p!ri#q!ri#r!ri#s!ri#t!ri#u!ri#v!ri#w!ri#y!ri#{!ri#|!ri(s!ri(z!ri({!ri~Oa!ri'{!ri'x!ri!Y!ri!k!riv!ri!_!ri%j!ri!g!ri~P$,YOh%VOr%XOs$tOt$tOz%YO|%ZO!O<uO!S${O!_$|O!i>WO!l$xO#k<{O$X%`O$u<wO$w<yO$z%aO(WTO(ZUO(b$uO(z$}O({%PO~Op0}O%^1OO(U0|O~P$.pO!g+kOa(^a!_(^a'{(^a!](^a~O#l1UO~O[]X!]fX!^fX~O!]1VO!^)YX~O!^1XO~O[1YO~Ob1[O(U+sO(WTO(ZUO~O!_&PO(U%gO`'vX!]'vX~O!]+xO`)Xa~O!k1_O~P!;PO[1bO~O`1cO~O#`1hO~On1kO!_$|O~O(f(}O!^)VP~Oh%VOn1tO!_1qO%j1sO~O[2OO!]1|O!^)WX~O!^2PO~O`2ROa%nO'{%nO~O(U#nO(WTO(ZUO~O#S$dO#`$eO$R$eOP(hXR(hX[(hXr(hX!Q(hX!S(hX!](hX!l(hX!p(hX#R(hX#o(hX#p(hX#q(hX#r(hX#s(hX#t(hX#u(hX#v(hX#w(hX#y(hX#{(hX#|(hX(b(hX(s(hX(z(hX({(hX~Oj2UO&]2VOa(hX~P$4ZOj2UO#`$eO&]2VO~Oa2XO~P%[Oa2ZO~O&f2^OP&diQ&diS&diY&dia&did&die&dil&dip&dir&dis&dit&diz&di|&di!O&di!S&di!W&di!X&di!_&di!i&di!l&di!o&di!p&di!q&di!s&di!u&di!x&di!|&di$X&di$o&di%i&di%k&di%m&di%n&di%o&di%r&di%t&di%w&di%x&di%z&di&X&di&_&di&a&di&c&di&e&di&h&di&n&di&t&di&v&di&x&di&z&di&|&di'x&di(U&di(W&di(Z&di(b&di(p&di!^&dib&di&k&di~Ob2dO!^2bO&k2cO~P`O!_XO!l2fO~O&r,}OP&miQ&miS&miY&mia&mid&mie&mil&mip&mir&mis&mit&miz&mi|&mi!O&mi!S&mi!W&mi!X&mi!_&mi!i&mi!l&mi!o&mi!p&mi!q&mi!s&mi!u&mi!x&mi!|&mi$X&mi$o&mi%i&mi%k&mi%m&mi%n&mi%o&mi%r&mi%t&mi%w&mi%x&mi%z&mi&X&mi&_&mi&a&mi&c&mi&e&mi&h&mi&n&mi&t&mi&v&mi&x&mi&z&mi&|&mi'x&mi(U&mi(W&mi(Z&mi(b&mi(p&mi!^&mi&f&mib&mi&k&mi~O!Y2lO~O!]!aa!^!aa~P#CSOs!nO!S!oO![2qO(f!mO!]'YX!^'YX~P@yO!]-^O!^(ja~O!]'`X!^'`X~P!:XO!]-bO!^(ya~O!^2yO~P'_Oa%nO#`3SO'{%nO~Oa%nO!g#vO#`3SO'{%nO~Oa%nO!g#vO!p3WO#`3SO'{%nO(s'qO~Oa%nO'{%nO~P!;PO!]$_Ov$ra~O!Y'Xi!]'Xi~P!;PO!](WO!Y(ii~O!](_O!Y(wi~O!Y(xi!](xi~P!;PO!](ui!k(uia(ui'{(ui~P!;PO#`3YO!](ui!k(uia(ui'{(ui~O!](kO!k(ti~O!S%hO!_%iO!|]O#j3_O#k3^O(U%gO~O!S%hO!_%iO#k3^O(U%gO~On3fO!_'aO%j3eO~Oh%VOn3fO!_'aO%j3eO~O#l%baP%baR%ba[%baa%baj%bar%ba!S%ba!l%ba!p%ba#R%ba#o%ba#p%ba#q%ba#r%ba#s%ba#t%ba#u%ba#v%ba#w%ba#y%ba#{%ba#|%ba'{%ba(b%ba(s%ba!k%ba!Y%ba'x%bav%ba!_%ba%j%ba!g%ba~P#MWO#l%daP%daR%da[%daa%daj%dar%da!S%da!l%da!p%da#R%da#o%da#p%da#q%da#r%da#s%da#t%da#u%da#v%da#w%da#y%da#{%da#|%da'{%da(b%da(s%da!k%da!Y%da'x%dav%da!_%da%j%da!g%da~P#MyO#l%baP%baR%ba[%baa%baj%bar%ba!S%ba!]%ba!l%ba!p%ba#R%ba#o%ba#p%ba#q%ba#r%ba#s%ba#t%ba#u%ba#v%ba#w%ba#y%ba#{%ba#|%ba'{%ba(b%ba(s%ba!k%ba!Y%ba'x%ba#`%bav%ba!_%ba%j%ba!g%ba~P#0OO#l%daP%daR%da[%daa%daj%dar%da!S%da!]%da!l%da!p%da#R%da#o%da#p%da#q%da#r%da#s%da#t%da#u%da#v%da#w%da#y%da#{%da#|%da'{%da(b%da(s%da!k%da!Y%da'x%da#`%dav%da!_%da%j%da!g%da~P#0OO#l}aP}a[}aa}aj}ar}a!l}a!p}a#R}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#w}a#y}a#{}a#|}a'{}a(b}a(s}a!k}a!Y}a'x}av}a!_}a%j}a!g}a~P$(nO#l$taP$taR$ta[$taa$taj$tar$ta!S$ta!l$ta!p$ta#R$ta#o$ta#p$ta#q$ta#r$ta#s$ta#t$ta#u$ta#v$ta#w$ta#y$ta#{$ta#|$ta'{$ta(b$ta(s$ta!k$ta!Y$ta'x$tav$ta!_$ta%j$ta!g$ta~P$)jO#l$vaP$vaR$va[$vaa$vaj$var$va!S$va!l$va!p$va#R$va#o$va#p$va#q$va#r$va#s$va#t$va#u$va#v$va#w$va#y$va#{$va#|$va'{$va(b$va(s$va!k$va!Y$va'x$vav$va!_$va%j$va!g$va~P$*]O#l%UaP%UaR%Ua[%Uaa%Uaj%Uar%Ua!S%Ua!]%Ua!l%Ua!p%Ua#R%Ua#o%Ua#p%Ua#q%Ua#r%Ua#s%Ua#t%Ua#u%Ua#v%Ua#w%Ua#y%Ua#{%Ua#|%Ua'{%Ua(b%Ua(s%Ua!k%Ua!Y%Ua'x%Ua#`%Uav%Ua!_%Ua%j%Ua!g%Ua~P#0OOa#cq!]#cq'{#cq'x#cq!Y#cq!k#cqv#cq!_#cq%j#cq!g#cq~P!;PO![3nO!]'ZX!k'ZX~P%[O!].vO!k(la~O!].vO!k(la~P!;PO!Y3qO~O$P!na!^!na~PKwO$P!ja!]!ja!^!ja~P#CSO$P!ra!^!ra~P!=lO$P!ta!^!ta~P!@SOg'^X!]'^X~P!,`O!]/ROg(qa~OSfO!_4VO$e4WO~O!^4[O~Ov4]O~P#0OOa$nq!]$nq'{$nq'x$nq!Y$nq!k$nqv$nq!_$nq%j$nq!g$nq~P!;PO!Y4_O~P!'VO!S4`O~O!Q*PO'z*QO({%POn'ja(z'ja!]'ja#`'ja~Og'ja$P'ja~P%.PO!Q*PO'z*QOn'la(z'la({'la!]'la#`'la~Og'la$P'la~P%.rO(s$YO~P#0OO!YfX!Y${X!]fX!]${X!g%SX#`fX~P!0_Op%WO(U=XO~P!2QOp4dO!S%hO![4cO!_%iO(U%gO!]'fX!k'fX~O!]/rO!k)Pa~O!]/rO!g#vO!k)Pa~O!]/rO!g#vO(s'qO!k)Pa~Og$}i!]$}i#`$}i$P$}i~P!1cO![4lO!Y'hX!]'hX~P!4PO!]/{O!Y)Qa~O!]/{O!Y)Qa~P#0OOP]XR]X[]Xj]Xr]X!Q]X!S]X!Y]X!]]X!l]X!p]X#R]X#S]X#`]X#lfX#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#w]X#y]X#{]X#|]X$R]X(b]X(s]X(z]X({]X~Oj%ZX!g%ZX~P%2iOj4qO!g#vO~Oh%VO!g#vO!l%eO~Oh%VOr4vO!l%eO(s'qO~Or4{O!g#vO(s'qO~Os!nO!S4|O(WTO(ZUO(f!mO~O(z$}On%bi!Q%bi'z%bi({%bi!]%bi#`%bi~Og%bi$P%bi~P%6YO({%POn%di!Q%di'z%di(z%di!]%di#`%di~Og%di$P%di~P%6{Og(`i!](`i~P!1cO#`5SOg(`i!](`i~P!1cO!k5XO~Oa$pq!]$pq'{$pq'x$pq!Y$pq!k$pqv$pq!_$pq%j$pq!g$pq~P!;PO!Y5]O~O!]5^O!_)RX~P#0OOa${X!_${X%_]X'{${X!]${X~P!0_O%_5aOaoX!_oX'{oX!]oX~P$#ZOp5bO(U#nO~O%_5aO~Ob5hO%k5iO(U+sO(WTO(ZUO!]'uX!^'uX~O!]1VO!^)Ya~O[5mO~O`5nO~O[5rO~Oa%nO'{%nO~P#0OO!]5wO#`5yO!^)VX~O!^5zO~Or6QOs!nO!S*jO!b!yO!c!vO!d!vO!|<XO#T!pO#U!pO#V!pO#W!pO#X!pO#[6PO#]!zO(V!lO(WTO(ZUO(f!mO(p!sO~O!^6OO~P%<OOn6VO!_1qO%j6UO~Oh%VOn6VO!_1qO%j6UO~Ob6^O(U#nO(WTO(ZUO!]'tX!^'tX~O!]1|O!^)Wa~O(WTO(ZUO(f6`O~O`6dO~Oj6gO&]6hO~PNdO!k6iO~P%[Oa6kO~Oa6kO~P%[Ob2dO!^6pO&k2cO~P`O!g6rO~O!g6tOh(ki!](ki!^(ki!g(ki!l(kir(ki(s(ki~O#`6uO!]#hi!^#hi~O!]!ai!^!ai~P#CSO!]#hi!^#hi~P#CSOa%nO#`7OO'{%nO~Oa%nO!g#vO#`7OO'{%nO~O!](uq!k(uqa(uq'{(uq~P!;PO!](kO!k(tq~O!S%hO!_%iO#k7VO(U%gO~O!_'aO%j7YO~On7^O!_'aO%j7YO~O#l'jaP'jaR'ja['jaa'jaj'jar'ja!S'ja!l'ja!p'ja#R'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#w'ja#y'ja#{'ja#|'ja'{'ja(b'ja(s'ja!k'ja!Y'ja'x'jav'ja!_'ja%j'ja!g'ja~P%.PO#l'laP'laR'la['laa'laj'lar'la!S'la!l'la!p'la#R'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#w'la#y'la#{'la#|'la'{'la(b'la(s'la!k'la!Y'la'x'lav'la!_'la%j'la!g'la~P%.rO#l$}iP$}iR$}i[$}ia$}ij$}ir$}i!S$}i!]$}i!l$}i!p$}i#R$}i#o$}i#p$}i#q$}i#r$}i#s$}i#t$}i#u$}i#v$}i#w$}i#y$}i#{$}i#|$}i'{$}i(b$}i(s$}i!k$}i!Y$}i'x$}i#`$}iv$}i!_$}i%j$}i!g$}i~P#0OO#l%biP%biR%bi[%bia%bij%bir%bi!S%bi!l%bi!p%bi#R%bi#o%bi#p%bi#q%bi#r%bi#s%bi#t%bi#u%bi#v%bi#w%bi#y%bi#{%bi#|%bi'{%bi(b%bi(s%bi!k%bi!Y%bi'x%biv%bi!_%bi%j%bi!g%bi~P%6YO#l%diP%diR%di[%dia%dij%dir%di!S%di!l%di!p%di#R%di#o%di#p%di#q%di#r%di#s%di#t%di#u%di#v%di#w%di#y%di#{%di#|%di'{%di(b%di(s%di!k%di!Y%di'x%div%di!_%di%j%di!g%di~P%6{O!]'Za!k'Za~P!;PO!].vO!k(li~O$P#ci!]#ci!^#ci~P#CSOP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(bVO[#nij#nir#ni#R#ni#p#ni#q#ni#r#ni#s#ni#t#ni#u#ni#v#ni#w#ni#y#ni#{#ni#|#ni$P#ni(s#ni(z#ni({#ni!]#ni!^#ni~O#o#ni~P%N}O#o<aO~P%N}OP$[OR#zOr<mO!Q#yO!S#{O!l#xO!p$[O#o<aO#p<bO#q<bO#r<bO(bVO[#nij#ni#R#ni#t#ni#u#ni#v#ni#w#ni#y#ni#{#ni#|#ni$P#ni(s#ni(z#ni({#ni!]#ni!^#ni~O#s#ni~P&#VO#s<cO~P&#VOP$[OR#zO[<oOj<dOr<mO!Q#yO!S#{O!l#xO!p$[O#R<dO#o<aO#p<bO#q<bO#r<bO#s<cO#t<dO#u<dO#v<nO(bVO#y#ni#{#ni#|#ni$P#ni(s#ni(z#ni({#ni!]#ni!^#ni~O#w#ni~P&%_OP$[OR#zO[<oOj<dOr<mO!Q#yO!S#{O!l#xO!p$[O#R<dO#o<aO#p<bO#q<bO#r<bO#s<cO#t<dO#u<dO#v<nO#w<eO(bVO({#}O#{#ni#|#ni$P#ni(s#ni(z#ni!]#ni!^#ni~O#y<gO~P&'`O#y#ni~P&'`O#w<eO~P&%_OP$[OR#zO[<oOj<dOr<mO!Q#yO!S#{O!l#xO!p$[O#R<dO#o<aO#p<bO#q<bO#r<bO#s<cO#t<dO#u<dO#v<nO#w<eO#y<gO(bVO(z#|O({#}O#|#ni$P#ni(s#ni!]#ni!^#ni~O#{#ni~P&)oO#{<iO~P&)oOa#}y!]#}y'{#}y'x#}y!Y#}y!k#}yv#}y!_#}y%j#}y!g#}y~P!;PO[#nij#nir#ni#R#ni#s#ni#t#ni#u#ni#v#ni#w#ni#y#ni#{#ni#|#ni$P#ni(s#ni!]#ni!^#ni~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#o<aO#p<bO#q<bO#r<bO(bVO(z#ni({#ni~P&,kOn>_O!Q*PO'z*QO(z$}O({%POP#niR#ni!S#ni!l#ni!p#ni#o#ni#p#ni#q#ni#r#ni(b#ni~P&,kO#S$dOP(aXR(aX[(aXj(aXn(aXr(aX!Q(aX!S(aX!l(aX!p(aX#R(aX#o(aX#p(aX#q(aX#r(aX#s(aX#t(aX#u(aX#v(aX#w(aX#y(aX#{(aX#|(aX$P(aX'z(aX(b(aX(s(aX(z(aX({(aX!](aX!^(aX~O$P$Qi!]$Qi!^$Qi~P#CSO$P!ri!^!ri~P$,YOg'^a!]'^a~P!1cO!^7pO~O!]'ea!^'ea~P#CSO!Y7qO~P#0OO!g#vO(s'qO!]'fa!k'fa~O!]/rO!k)Pi~O!]/rO!g#vO!k)Pi~Og$}q!]$}q#`$}q$P$}q~P!1cO!Y'ha!]'ha~P#0OO!g7xO~O!]/{O!Y)Qi~P#0OO!]/{O!Y)Qi~O!Y7{O~Oh%VOr8QO!l%eO(s'qO~Oj8SO!g#vO~Or8VO!g#vO(s'qO~O!Q*PO'z*QO({%POn'ka(z'ka!]'ka#`'ka~Og'ka$P'ka~P&5lO!Q*PO'z*QOn'ma(z'ma({'ma!]'ma#`'ma~Og'ma$P'ma~P&6_Og(`q!](`q~P!1cO#`8XOg(`q!](`q~P!1cO!Y8YO~Og%Pq!]%Pq#`%Pq$P%Pq~P!1cOa$py!]$py'{$py'x$py!Y$py!k$pyv$py!_$py%j$py!g$py~P!;PO!g6tO~O!]5^O!_)Ra~O!_'aOP$UaR$Ua[$Uaj$Uar$Ua!Q$Ua!S$Ua!]$Ua!l$Ua!p$Ua#R$Ua#o$Ua#p$Ua#q$Ua#r$Ua#s$Ua#t$Ua#u$Ua#v$Ua#w$Ua#y$Ua#{$Ua#|$Ua(b$Ua(s$Ua(z$Ua({$Ua~O%j7YO~P&9PO%_8^Oa%]i!_%]i'{%]i!]%]i~Oa#cy!]#cy'{#cy'x#cy!Y#cy!k#cyv#cy!_#cy%j#cy!g#cy~P!;PO[8`O~Ob8bO(U+sO(WTO(ZUO~O!]1VO!^)Yi~O`8fO~O(f(}O!]'qX!^'qX~O!]5wO!^)Va~O!^8pO~P%<OO(p!sO~P$&eO#[8qO~O!_1qO~O!_1qO%j8sO~On8vO!_1qO%j8sO~O[8{O!]'ta!^'ta~O!]1|O!^)Wi~O!k9PO~O!k9QO~O!k9TO~O!k9TO~P%[Oa9VO~O!g9WO~O!k9XO~O!](xi!^(xi~P#CSOa%nO#`9aO'{%nO~O!](uy!k(uya(uy'{(uy~P!;PO!](kO!k(ty~O%j9dO~P&9PO!_'aO%j9dO~O#l$}qP$}qR$}q[$}qa$}qj$}qr$}q!S$}q!]$}q!l$}q!p$}q#R$}q#o$}q#p$}q#q$}q#r$}q#s$}q#t$}q#u$}q#v$}q#w$}q#y$}q#{$}q#|$}q'{$}q(b$}q(s$}q!k$}q!Y$}q'x$}q#`$}qv$}q!_$}q%j$}q!g$}q~P#0OO#l'kaP'kaR'ka['kaa'kaj'kar'ka!S'ka!l'ka!p'ka#R'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#w'ka#y'ka#{'ka#|'ka'{'ka(b'ka(s'ka!k'ka!Y'ka'x'kav'ka!_'ka%j'ka!g'ka~P&5lO#l'maP'maR'ma['maa'maj'mar'ma!S'ma!l'ma!p'ma#R'ma#o'ma#p'ma#q'ma#r'ma#s'ma#t'ma#u'ma#v'ma#w'ma#y'ma#{'ma#|'ma'{'ma(b'ma(s'ma!k'ma!Y'ma'x'mav'ma!_'ma%j'ma!g'ma~P&6_O#l%PqP%PqR%Pq[%Pqa%Pqj%Pqr%Pq!S%Pq!]%Pq!l%Pq!p%Pq#R%Pq#o%Pq#p%Pq#q%Pq#r%Pq#s%Pq#t%Pq#u%Pq#v%Pq#w%Pq#y%Pq#{%Pq#|%Pq'{%Pq(b%Pq(s%Pq!k%Pq!Y%Pq'x%Pq#`%Pqv%Pq!_%Pq%j%Pq!g%Pq~P#0OO!]'Zi!k'Zi~P!;PO$P#cq!]#cq!^#cq~P#CSO(z$}OP%baR%ba[%baj%bar%ba!S%ba!l%ba!p%ba#R%ba#o%ba#p%ba#q%ba#r%ba#s%ba#t%ba#u%ba#v%ba#w%ba#y%ba#{%ba#|%ba$P%ba(b%ba(s%ba!]%ba!^%ba~On%ba!Q%ba'z%ba({%ba~P&JdO({%POP%daR%da[%daj%dar%da!S%da!l%da!p%da#R%da#o%da#p%da#q%da#r%da#s%da#t%da#u%da#v%da#w%da#y%da#{%da#|%da$P%da(b%da(s%da!]%da!^%da~On%da!Q%da'z%da(z%da~P&LkOn>_O!Q*PO'z*QO({%PO~P&JdOn>_O!Q*PO'z*QO(z$}O~P&LkOR0mO!Q0mO!S0nO#S$dOP}a[}aj}an}ar}a!l}a!p}a#R}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#w}a#y}a#{}a#|}a$P}a'z}a(b}a(s}a(z}a({}a!]}a!^}a~O!Q*PO'z*QOP$taR$ta[$taj$tan$tar$ta!S$ta!l$ta!p$ta#R$ta#o$ta#p$ta#q$ta#r$ta#s$ta#t$ta#u$ta#v$ta#w$ta#y$ta#{$ta#|$ta$P$ta(b$ta(s$ta(z$ta({$ta!]$ta!^$ta~O!Q*PO'z*QOP$vaR$va[$vaj$van$var$va!S$va!l$va!p$va#R$va#o$va#p$va#q$va#r$va#s$va#t$va#u$va#v$va#w$va#y$va#{$va#|$va$P$va(b$va(s$va(z$va({$va!]$va!^$va~On>_O!Q*PO'z*QO(z$}O({%PO~OP%UaR%Ua[%Uaj%Uar%Ua!S%Ua!l%Ua!p%Ua#R%Ua#o%Ua#p%Ua#q%Ua#r%Ua#s%Ua#t%Ua#u%Ua#v%Ua#w%Ua#y%Ua#{%Ua#|%Ua$P%Ua(b%Ua(s%Ua!]%Ua!^%Ua~P''pO$P$nq!]$nq!^$nq~P#CSO$P$pq!]$pq!^$pq~P#CSO!^9qO~O$P9rO~P!1cO!g#vO!]'fi!k'fi~O!g#vO(s'qO!]'fi!k'fi~O!]/rO!k)Pq~O!Y'hi!]'hi~P#0OO!]/{O!Y)Qq~Or9yO!g#vO(s'qO~O[9{O!Y9zO~P#0OO!Y9zO~Oj:RO!g#vO~Og(`y!](`y~P!1cO!]'oa!_'oa~P#0OOa%]q!_%]q'{%]q!]%]q~P#0OO[:WO~O!]1VO!^)Yq~O`:[O~O#`:]O!]'qa!^'qa~O!]5wO!^)Vi~P#CSO!S:_O~O!_1qO%j:bO~O(WTO(ZUO(f:gO~O!]1|O!^)Wq~O!k:jO~O!k:kO~O!k:lO~O!k:lO~P%[O#`:oO!]#hy!^#hy~O!]#hy!^#hy~P#CSO%j:tO~P&9PO!_'aO%j:tO~O$P#}y!]#}y!^#}y~P#CSOP$}iR$}i[$}ij$}ir$}i!S$}i!l$}i!p$}i#R$}i#o$}i#p$}i#q$}i#r$}i#s$}i#t$}i#u$}i#v$}i#w$}i#y$}i#{$}i#|$}i$P$}i(b$}i(s$}i!]$}i!^$}i~P''pO!Q*PO'z*QO({%POP'jaR'ja['jaj'jan'jar'ja!S'ja!l'ja!p'ja#R'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#w'ja#y'ja#{'ja#|'ja$P'ja(b'ja(s'ja(z'ja!]'ja!^'ja~O!Q*PO'z*QOP'laR'la['laj'lan'lar'la!S'la!l'la!p'la#R'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#w'la#y'la#{'la#|'la$P'la(b'la(s'la(z'la({'la!]'la!^'la~O(z$}OP%biR%bi[%bij%bin%bir%bi!Q%bi!S%bi!l%bi!p%bi#R%bi#o%bi#p%bi#q%bi#r%bi#s%bi#t%bi#u%bi#v%bi#w%bi#y%bi#{%bi#|%bi$P%bi'z%bi(b%bi(s%bi({%bi!]%bi!^%bi~O({%POP%diR%di[%dij%din%dir%di!Q%di!S%di!l%di!p%di#R%di#o%di#p%di#q%di#r%di#s%di#t%di#u%di#v%di#w%di#y%di#{%di#|%di$P%di'z%di(b%di(s%di(z%di!]%di!^%di~O$P$py!]$py!^$py~P#CSO$P#cy!]#cy!^#cy~P#CSO!g#vO!]'fq!k'fq~O!]/rO!k)Py~O!Y'hq!]'hq~P#0OOr;OO!g#vO(s'qO~O[;SO!Y;RO~P#0OO!Y;RO~Og(`!R!](`!R~P!1cOa%]y!_%]y'{%]y!]%]y~P#0OO!]1VO!^)Yy~O!]5wO!^)Vq~O(U;ZO~O!_1qO%j;^O~O!k;aO~O%j;fO~P&9POP$}qR$}q[$}qj$}qr$}q!S$}q!l$}q!p$}q#R$}q#o$}q#p$}q#q$}q#r$}q#s$}q#t$}q#u$}q#v$}q#w$}q#y$}q#{$}q#|$}q$P$}q(b$}q(s$}q!]$}q!^$}q~P''pO!Q*PO'z*QO({%POP'kaR'ka['kaj'kan'kar'ka!S'ka!l'ka!p'ka#R'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#w'ka#y'ka#{'ka#|'ka$P'ka(b'ka(s'ka(z'ka!]'ka!^'ka~O!Q*PO'z*QOP'maR'ma['maj'man'mar'ma!S'ma!l'ma!p'ma#R'ma#o'ma#p'ma#q'ma#r'ma#s'ma#t'ma#u'ma#v'ma#w'ma#y'ma#{'ma#|'ma$P'ma(b'ma(s'ma(z'ma({'ma!]'ma!^'ma~OP%PqR%Pq[%Pqj%Pqr%Pq!S%Pq!l%Pq!p%Pq#R%Pq#o%Pq#p%Pq#q%Pq#r%Pq#s%Pq#t%Pq#u%Pq#v%Pq#w%Pq#y%Pq#{%Pq#|%Pq$P%Pq(b%Pq(s%Pq!]%Pq!^%Pq~P''pOg%f!Z!]%f!Z#`%f!Z$P%f!Z~P!1cO!Y;jO~P#0OOr;kO!g#vO(s'qO~O[;mO!Y;jO~P#0OO!]'qq!^'qq~P#CSO!]#h!Z!^#h!Z~P#CSO#l%f!ZP%f!ZR%f!Z[%f!Za%f!Zj%f!Zr%f!Z!S%f!Z!]%f!Z!l%f!Z!p%f!Z#R%f!Z#o%f!Z#p%f!Z#q%f!Z#r%f!Z#s%f!Z#t%f!Z#u%f!Z#v%f!Z#w%f!Z#y%f!Z#{%f!Z#|%f!Z'{%f!Z(b%f!Z(s%f!Z!k%f!Z!Y%f!Z'x%f!Z#`%f!Zv%f!Z!_%f!Z%j%f!Z!g%f!Z~P#0OOr;vO!g#vO(s'qO~O!Y;wO~P#0OOr<OO!g#vO(s'qO~O!Y<PO~P#0OOP%f!ZR%f!Z[%f!Zj%f!Zr%f!Z!S%f!Z!l%f!Z!p%f!Z#R%f!Z#o%f!Z#p%f!Z#q%f!Z#r%f!Z#s%f!Z#t%f!Z#u%f!Z#v%f!Z#w%f!Z#y%f!Z#{%f!Z#|%f!Z$P%f!Z(b%f!Z(s%f!Z!]%f!Z!^%f!Z~P''pOr<SO!g#vO(s'qO~Ov(gX~P1qO!Q%rO~P!)gO(V!lO~P!)gO!YfX!]fX#`fX~P%2iOP]XR]X[]Xj]Xr]X!Q]X!S]X!]]X!]fX!l]X!p]X#R]X#S]X#`]X#`fX#lfX#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#w]X#y]X#{]X#|]X$R]X(b]X(s]X(z]X({]X~O!gfX!k]X!kfX(sfX~P'LnOP<WOQ<WOSfOd>SOe!iOpkOr<WOskOtkOzkO|<WO!O<WO!SWO!WkO!XkO!_XO!i<ZO!lZO!o<WO!p<WO!q<WO!s<[O!u<_O!x!hO$X!kO$o>QO(U)^O(WTO(ZUO(bVO(p[O~O!]<kO!^$ra~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<vO!S${O!_$|O!i>XO!l$xO#k<|O$X%`O$u<xO$w<zO$z%aO(U(wO(WTO(ZUO(b$uO(z$}O({%PO~Ol)eO~P(#dOr!eX(s!eX~P#!yO!^]X!^fX~P'LnO!YfX!Y${X!]fX!]${X#`fX~P!0_O#l<`O~O!g#vO#l<`O~O#`<pO~Oj<dO~O#`=PO!](xX!^(xX~O#`<pO!](vX!^(vX~O#l=QO~Og=SO~P!1cO#l=YO~O#l=ZO~Og=SO(U&ZO~O!g#vO#l=[O~O!g#vO#l=QO~O$P=]O~P#CSO#l=^O~O#l=_O~O#l=dO~O#l=eO~O#l=fO~O#l=gO~O$P=hO~P!1cO$P=iO~P!1cOl=tO~P7eOk#S#T#U#W#X#[#j#k#v$o$u$w$z%^%_%i%j%k%r%t%w%x%z%|~(PT#p!X'}(V#qs#o#rr!Q(O$^(U$`(f~",
	goto: "$9b)^PPPPPP)_PP)bP)sP+X/^PPPP6oPP7VPP=SPPP@vPA`PA`PPPA`PChPA`PA`PA`PClPCqPD`PIYPPPI^PPPPI^LaPPPLgMXPI^PI^PP! gI^PPPI^PI^P!#nI^P!'U!(Z!(dP!)W!)[!)W!,iPPPPPPP!-Y!(ZPP!-j!/[P!2kI^I^!2p!5|!:j!:j!>i!>qPPP!>wI^PPPPPPPPP!BWP!CePPI^!DvPI^PI^I^I^I^I^PI^!FYP!IdP!LjP!Ln!Lx!L|!L|P!IaP!MQ!MQP#!WP#![I^PI^#!b#%gClA`PA`PA`A`P#&tA`A`#)WA`#,OA`#.[A`A`#.z#1`#1`#1e#1n#1`#1yPP#1`PA`#2cA`#6bA`A`6oPPP#:gPPP#;Q#;QP#;QP#;h#;QPP#;nP#;eP#;e#<R#;e#<m#<s#<v)bP#<y)bP#=S#=S#=SP)bP)bP)bP)bPP)bP#=Y#=]P#=])bP#=aP#=dP)bP)bP)bP)bP)bP)b)bPP#=j#=p#={#>R#>X#>_#>e#>s#>y#?T#?Z#?e#?k#?{#@R#@s#AV#A]#Ac#Aq#BW#C{#DZ#Db#E|#F[#G|#H[#Hb#Hh#Hn#Hx#IO#IU#I`#Ir#IxPPPPPPPPPPP#JOPPPPPPP#Js#NQ$ j$ q$ yPPP$'eP$'n$*g$1Q$1T$1W$2V$2Y$2a$2iP$2o$2rP$3`$3d$4[$5j$5o$6VPP$6[$6b$6f$6i$6m$6q$7m$8U$8m$8q$8t$8w$9R$9U$9Y$9^R!|RoqOXst!Z#d%m&r&t&u&w,u,z2^2aY!vQ'a-g1q5}Q%tvQ%|yQ&T|Q&j!VS'W!e-^Q'g!iS'm!r!yU*l$|*[*pQ+q%}S,O&V&WQ,f&dQ-e'`Q-o'hQ-w'nQ0^*rQ1d,QQ1{,gR<}<[%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'c's(U(W(^(e(y({)P*O*j+Y+_,r,u,z-k-s.R.X.v.}/p0_0n0t1U1t2U2V2X2Z2^2a2c3S3Y3n4|6V6g6h6k7O8v9V9aS#q]<X!r)`$Z$n'X)t-Y-a/X2q4V5y6u:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TU+Q%]<u<vQ+v&PQ,h&gQ,o&oQ0z+iQ1P+kQ1[+wQ2T,mQ3b.iQ5b1OQ5h1VQ6^1|Q7[3fQ8b5iR9g7^'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'c's(U(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>T!S!nQ!r!v!y!z$|'W'`'a'm'n'o*l*p*r*s-^-e-g-w0^0a1q5}6P%[$ti#v$b$c$d$x${%O%Q%^%_%c)z*S*U*W*Z*b*h*x*y+h+k,U,X.h/R/f/o/z/{/}0b0d0k0l0q1h1k1s3e4`4a4l4q5S5^5a6U7Y7x8S8X8^8s9d9r9{:R:b:t;S;^;f;m<n<o<q<r<s<t<w<x<y<z<{<|=T=U=V=W=Y=Z=^=_=`=a=b=c=d=e=h=i>Q>Y>Z>^>_Q&X|Q&_!TS'U!e*[S']%i-bQ+v&PQ,R&WQ,h&gQ0p+TQ1[+wQ1a+}Q2S,lQ2T,mQ5h1VQ5q1cQ6^1|Q6a2OQ6b2RQ8b5iQ8e5nQ9O6dQ:Z8fQ:h8{R;X:[rnOXst!V!Z#d%m&i&r&t&u&w,u,z2^2aR,j&k&z^OPXYstuvwz!Z!`!g!j!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'c's(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>S>T[#]WZ#W#Z'X(U!b%jm#h#i#l$x%e%h(_(i(j(k*Z*_*c+[+^+`,q-W.V.].^._.a/o/r2f3^3_4c6t7VQ%wxQ%{yW&Q|&V&W,QQ&_!TQ'd!hQ'f!iQ(r#sS+p%|%}Q+t&PQ,a&bQ,e&dS-n'g'hQ.k(sQ1T+qQ1Z+wQ1]+xQ1`+|Q1v,bS1z,f,gQ3O-oQ5g1VQ5k1YQ5p1bQ6]1{Q8a5iQ8d5mQ8h5rQ:V8`R;V:W!U$zi$d%O%Q%^%_%c*S*U*b*x*y/R/z0b0d0k0l0q4a5S8X9r>Q>Y>Z!^%yy!i!u%{%|%}'V'f'g'h'l'v*k+p+q-Z-n-o-v0T0W1T2w3O3V4t4u4x8P9}Q+j%wQ,V&[Q,Y&]Q,d&dQ.j(rQ1u,aU1y,e,f,gQ3g.kQ6W1vS6[1z1{Q8z6]#f>U#v$b$c$x${)z*W*Z*h+h+k,U,X.h/f/o/{/}1h1k1s3e4`4l4q5^5a6U7Y7x8S8^8s9d9{:R:b:t;S;^;f;m<q<s<w<y<{=T=V=Y=^=`=b=d=h>^>_o>V<n<o<r<t<x<z<|=U=W=Z=_=a=c=e=iW%Ti%V*z>QS&[!Q&iQ&]!RQ&^!SU+O%[%d=tR,T&Y%]%Si#v$b$c$d$x${%O%Q%^%_%c)z*S*U*W*Z*b*h*x*y+h+k,U,X.h/R/f/o/z/{/}0b0d0k0l0q1h1k1s3e4`4a4l4q5S5^5a6U7Y7x8S8X8^8s9d9r9{:R:b:t;S;^;f;m<n<o<q<r<s<t<w<x<y<z<{<|=T=U=V=W=Y=Z=^=_=`=a=b=c=d=e=h=i>Q>Y>Z>^>_T){$u)|V+Q%]<u<vW']!e%i*[-bS)O#y#zQ+e%rQ+{&SS.d(n(oQ1l,ZQ5V0mR8k5w'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'c's(U(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>T$i$^c#Y#e%q%s%u(T(Z(u(z)S)T)U)V)W)X)Y)Z)[)])_)a)c)h)r+f+z-[-z.P.U.W.u.x.|/O/P/Q/d0r2o2t3Q3X3m3r3s3t3u3v3w3x3y3z3{3|3}4O4R4S4Z5Z5e6w6}7S7c7d7m7n8m9Z9_9i9o9p:q;Y;b<Y=wT#TV#U'RkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'c's(U(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TQ'Y!eR2r-^!W!nQ!e!r!v!y!z$|'W'`'a'm'n'o*[*l*p*r*s-^-e-g-w0^0a1q5}6PR1n,]nqOXst!Z#d%m&r&t&u&w,u,z2^2aQ&y!^Q'w!xS(t#u<`Q+n%zQ,_&_Q,`&aQ-l'eQ-y'pS.t(y=QS0s+Y=[Q1R+oQ1p,^Q2e,|Q2g,}Q2n-XQ2|-mQ3P-qS5[0t=fQ5c1SS5f1U=gQ6v2pQ6z2}Q7P3UQ8_5dQ9[6xQ9]6{Q9`7QR:n9X$d$]c#Y#e%s%u(T(Z(u(z)S)T)U)V)W)X)Y)Z)[)])_)a)c)h)r+f+z-[-z.P.U.W.u.x.|/P/Q/d0r2o2t3Q3X3m3r3s3t3u3v3w3x3y3z3{3|3}4O4R4S4Z5Z5e6w6}7S7c7d7m7n8m9Z9_9i9o9p:q;Y;b<Y=wS(p#p'jQ)Q#zS+d%q/OS.e(o(qR3`.f'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'c's(U(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TS#q]<XQ&t!XQ&u!YQ&w![Q&x!]R2],xQ'b!hQ+g%wQ-j'dS.g(r+jQ2z-iW3d.j.k0y0{Q6y2{W7W3a3c3g5`U9c7X7Z7]U:s9e9f9hS;d:r:uQ;r;eR;z;sU!wQ'a-gT5{1q5}!Q_OXZ`st!V!Z#d#h%e%m&i&k&r&t&u&w(k,u,z.^2^2a]!pQ!r'a-g1q5}T#q]<X%^{OPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'c's(U(W(^(e(y({)P*O*j+Y+_+i,r,u,z-k-s.R.X.i.v.}/p0_0n0t1U1t2U2V2X2Z2^2a2c3S3Y3f3n4|6V6g6h6k7O7^8v9V9aS)O#y#zS.d(n(o!s=m$Z$n'X)t-Y-a/X2q4V5y6u:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TU$fd)`,oS(q#p'jU*w%R(x4QU0o+P.p7iQ5`0zQ7X3bQ9f7[R:u9gm!tQ!r!v!y!z'a'm'n'o-g-w1q5}6PQ'u!uS(g#g2WS-u'l'xQ/u*^Q0T*kQ3W-xQ4h/vQ4t0VQ4u0WQ4z0`Q7t4bS8P4v4xS8T4{4}Q9t7uQ9x7{Q9}8QQ:S8VS:}9y9zS;i;O;RS;u;j;kS;};v;wS<R<O<PR<U<SQ#wbQ't!uS(f#g2WS(h#m+XQ+Z%fQ+l%xQ+r&OU-t'l'u'xQ.Y(gU/t*^*a/yQ0U*kQ0X*mQ1Q+mQ1w,cS3T-u-xQ3].bS4g/u/vQ4p0RS4s0T0`Q4w0YQ6Y1xQ7R3WS7s4b4dQ7w4hU8O4t4z4}Q8R4yQ8x6ZS9s7t7uQ9w7{Q:P8TQ:Q8UQ:e8yQ:{9tS:|9x9zQ;U:SQ;`:fS;h:};RS;t;i;jS;|;u;wS<Q;}<PQ<T<RQ<V<UQ=p=kQ=|=uR=}=vV!wQ'a-g%^aOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'c's(U(W(^(e(y({)P*O*j+Y+_+i,r,u,z-k-s.R.X.i.v.}/p0_0n0t1U1t2U2V2X2Z2^2a2c3S3Y3f3n4|6V6g6h6k7O7^8v9V9aS#wz!j!r=j$Z$n'X)t-Y-a/X2q4V5y6u:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TR=p>S%^bOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'c's(U(W(^(e(y({)P*O*j+Y+_+i,r,u,z-k-s.R.X.i.v.}/p0_0n0t1U1t2U2V2X2Z2^2a2c3S3Y3f3n4|6V6g6h6k7O7^8v9V9aQ%fj!^%xy!i!u%{%|%}'V'f'g'h'l'v*k+p+q-Z-n-o-v0T0W1T2w3O3V4t4u4x8P9}S&Oz!jQ+m%yQ,c&dW1x,d,e,f,gU6Z1y1z1{S8y6[6]Q:f8z!r=k$Z$n'X)t-Y-a/X2q4V5y6u:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TQ=u>RR=v>S%QeOPXYstuvw!Z!`!g!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'c's(W(^(e(y({)P*O*j+Y+_+i,r,u,z-k-s.R.X.i.v.}/p0_0n0t1U1t2U2V2X2Z2^2a2c3S3Y3f3n4|6V6g6h6k7O7^8v9V9aY#bWZ#W#Z(U!b%jm#h#i#l$x%e%h(_(i(j(k*Z*_*c+[+^+`,q-W.V.].^._.a/o/r2f3^3_4c6t7VQ,p&o!p=l$Z$n)t-Y-a/X2q4V5y6u:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TR=o'XU'^!e%i*[R2u-bX'[!e%i*[-b%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'c's(U(W(^(e(y({)P*O*j+Y+_,r,u,z-k-s.R.X.v.}/p0_0n0t1U1t2U2V2X2Z2^2a2c3S3Y3n4|6V6g6h6k7O8v9V9a!r)`$Z$n'X)t-Y-a/X2q4V5y6u:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TQ,o&oQ0z+iQ3b.iQ7[3fR9g7^!b$Tc#Y%q(T(Z(u(z)[)])a)h+z-z.P.U.W.u.x/d0r3Q3X3m3}5Z5e6}7S7c9_:q<Y!P<f)_)r-[/O2o2t3r3{3|4R4Z6w7d7m7n8m9Z9i9o9p;Y;b=w!f$Vc#Y%q(T(Z(u(z)X)Y)[)])a)h+z-z.P.U.W.u.x/d0r3Q3X3m3}5Z5e6}7S7c9_:q<Y!T<h)_)r-[/O2o2t3r3x3y3{3|4R4Z6w7d7m7n8m9Z9i9o9p;Y;b=w!^$Zc#Y%q(T(Z(u(z)a)h+z-z.P.U.W.u.x/d0r3Q3X3m3}5Z5e6}7S7c9_:q<YQ4a/mz>T)_)r-[/O2o2t3r4R4Z6w7d7m7n8m9Z9i9o9p;Y;b=wQ>Y>[R>Z>]'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'c's(U(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TS$oh$pR4W/W'XgOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'c's(U(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/W/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TT$kf$qQ$ifS)k$l)oR)w$qT$jf$qT)m$l)o'XhOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'c's(U(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/W/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TT$oh$pQ$rhR)v$p%^jOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'c's(U(W(^(e(y({)P*O*j+Y+_+i,r,u,z-k-s.R.X.i.v.}/p0_0n0t1U1t2U2V2X2Z2^2a2c3S3Y3f3n4|6V6g6h6k7O7^8v9V9a!s>R$Z$n'X)t-Y-a/X2q4V5y6u:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>T#glOPXZst!Z!`!o#S#d#o#{$n%m&k&n&o&r&t&u&w&{'T'c)P)t*j+_+i,r,u,z-k.i/X/p0_0n1t2U2V2X2Z2^2a2c3f4V4|6V6g6h6k7^8v9V!U%Ri$d%O%Q%^%_%c*S*U*b*x*y/R/z0b0d0k0l0q4a5S8X9r>Q>Y>Z#f(x#v$b$c$x${)z*W*Z*h+h+k,U,X.h/f/o/{/}1h1k1s3e4`4l4q5^5a6U7Y7x8S8^8s9d9{:R:b:t;S;^;f;m<q<s<w<y<{=T=V=Y=^=`=b=d=h>^>_Q+U%aQ/e*Po4Q<n<o<r<t<x<z<|=U=W=Z=_=a=c=e=i!U$yi$d%O%Q%^%_%c*S*U*b*x*y/R/z0b0d0k0l0q4a5S8X9r>Q>Y>ZQ*d$zU*m$|*[*pQ+V%bQ0Y*n#f=r#v$b$c$x${)z*W*Z*h+h+k,U,X.h/f/o/{/}1h1k1s3e4`4l4q5^5a6U7Y7x8S8^8s9d9{:R:b:t;S;^;f;m<q<s<w<y<{=T=V=Y=^=`=b=d=h>^>_n=s<n<o<r<t<x<z<|=U=W=Z=_=a=c=e=iQ=x>UQ=y>VQ=z>WR={>X!U%Ri$d%O%Q%^%_%c*S*U*b*x*y/R/z0b0d0k0l0q4a5S8X9r>Q>Y>Z#f(x#v$b$c$x${)z*W*Z*h+h+k,U,X.h/f/o/{/}1h1k1s3e4`4l4q5^5a6U7Y7x8S8^8s9d9{:R:b:t;S;^;f;m<q<s<w<y<{=T=V=Y=^=`=b=d=h>^>_o4Q<n<o<r<t<x<z<|=U=W=Z=_=a=c=e=inoOXst!Z#d%m&r&t&u&w,u,z2^2aS*g${*ZQ-T'OQ-U'QR4k/{%[%Si#v$b$c$d$x${%O%Q%^%_%c)z*S*U*W*Z*b*h*x*y+h+k,U,X.h/R/f/o/z/{/}0b0d0k0l0q1h1k1s3e4`4a4l4q5S5^5a6U7Y7x8S8X8^8s9d9r9{:R:b:t;S;^;f;m<n<o<q<r<s<t<w<x<y<z<{<|=T=U=V=W=Y=Z=^=_=`=a=b=c=d=e=h=i>Q>Y>Z>^>_Q,W&]Q1j,YQ5u1iR8j5vV*o$|*[*pU*o$|*[*pT5|1q5}S0R*j/pQ4y0_T8U4|:_Q+l%xQ0X*mQ1Q+mQ1w,cQ6Y1xQ8x6ZQ:e8yR;`:f!U%Oi$d%O%Q%^%_%c*S*U*b*x*y/R/z0b0d0k0l0q4a5S8X9r>Q>Y>Zx*S$v)f*T*v+W/x0f0g4T4i5T5U5Y7r8W:T:z=q>O>PS0b*u0c#f<q#v$b$c$x${)z*W*Z*h+h+k,U,X.h/f/o/{/}1h1k1s3e4`4l4q5^5a6U7Y7x8S8^8s9d9{:R:b:t;S;^;f;m<q<s<w<y<{=T=V=Y=^=`=b=d=h>^>_n<r<n<o<r<t<x<z<|=U=W=Z=_=a=c=e=i!d=T(v)d*]*f.l.o.s/a/m0O0x1g3j4^4j4n5t7_7b7y7|8Z8]9v:O:U;P;T;g;l;x>[>]`=U4P7e7h7l9j:v:y;{S=`.n3kT=a7g9m!U%Qi$d%O%Q%^%_%c*S*U*b*x*y/R/z0b0d0k0l0q4a5S8X9r>Q>Y>Z|*U$v)f*V*u+W/i/x0f0g4T4i5O5T5U5Y7r8W:T:z=q>O>PS0d*v0e#f<s#v$b$c$x${)z*W*Z*h+h+k,U,X.h/f/o/{/}1h1k1s3e4`4l4q5^5a6U7Y7x8S8^8s9d9{:R:b:t;S;^;f;m<q<s<w<y<{=T=V=Y=^=`=b=d=h>^>_n<t<n<o<r<t<x<z<|=U=W=Z=_=a=c=e=i!h=V(v)d*]*f.m.n.s/a/m0O0x1g3h3j4^4j4n5t7_7`7b7y7|8Z8]9v:O:U;P;T;g;l;x>[>]d=W4P7f7g7l9j9k:v:w:y;{S=b.o3lT=c7h9nrnOXst!V!Z#d%m&i&r&t&u&w,u,z2^2aQ&f!UR,r&ornOXst!V!Z#d%m&i&r&t&u&w,u,z2^2aR&f!UQ,[&^R1f,TsnOXst!V!Z#d%m&i&r&t&u&w,u,z2^2aQ1r,aS6T1u1vU8r6R6S6WS:a8t8uS;[:`:cQ;o;]R;y;pQ&m!VR,k&iR6a2OR:h8{W&Q|&V&W,QR1]+xQ&r!WR,u&sR,{&xT2_,z2aR-P&yQ-O&yR2h-PQ'z!{R-{'zSsOtQ#dXT%ps#dQ#OTR'|#OQ#RUR(O#RQ)|$uR/b)|Q#UVR(R#UQ#XWU(X#X(Y.SQ(Y#YR.S(ZQ-_'YR2s-_Q.w(zS3o.w3pR3p.xQ-g'aR2x-gY!rQ'a-g1q5}R'k!rQ/S)fR4U/SU#_W%h*ZU(`#_(a.TQ(a#`R.T([Q-c'^R2v-ct`OXst!V!Z#d%m&i&k&r&t&u&w,u,z2^2aS#hZ%eU#r`#h.^R.^(kQ(l#jQ.Z(hW.c(l.Z3Z7TQ3Z.[R7T3[Q)o$lR/Y)oQ$phR)u$pQ$`cU)b$`.O<lQ.O<YR<l)rQ/s*^W4e/s4f7v9uU4f/t/u/vS7v4g4hR9u7w$e*R$v(v)d)f*]*f*u*v+R+S+W.n.o.q.r.s/a/i/k/m/x0O0f0g0x1g3h3i3j4P4T4^4i4j4n5O5Q5T5U5Y5t7_7`7a7b7g7h7j7k7l7r7y7|8W8Z8]9j9k9l9v:O:T:U:v:w:x:y:z;P;T;g;l;x;{=q>O>P>[>]Q/|*fU4m/|4o7zQ4o0OR7z4nS*p$|*[R0[*px*T$v)f*u*v+W/x0f0g4T4i5T5U5Y7r8W:T:z=q>O>P!d.l(v)d*]*f.n.o.s/a/m0O0x1g3j4^4j4n5t7_7b7y7|8Z8]9v:O:U;P;T;g;l;x>[>]U/j*T.l7ea7e4P7g7h7l9j:v:y;{Q0c*uQ3k.nU5P0c3k9mR9m7g|*V$v)f*u*v+W/i/x0f0g4T4i5O5T5U5Y7r8W:T:z=q>O>P!h.m(v)d*]*f.n.o.s/a/m0O0x1g3h3j4^4j4n5t7_7`7b7y7|8Z8]9v:O:U;P;T;g;l;x>[>]U/l*V.m7fe7f4P7g7h7l9j9k:v:w:y;{Q0e*vQ3l.oU5R0e3l9nR9n7hQ*{%UR0i*{Q5_0xR8[5_Q+a%kR0w+aQ5x1lS8l5x:^R:^8mQ,^&_R1o,^Q5}1qR8o5}Q1},hS6_1}8|R8|6aQ1W+tW5j1W5l8c:XQ5l1ZQ8c5kR:X8dQ+y&QR1^+yQ2a,zR6o2aYrOXst#dQ&v!ZQ+c%mQ,t&rQ,v&tQ,w&uQ,y&wQ2[,uS2_,z2aR6n2^Q%opQ&z!_Q&}!aQ'P!bQ'R!cQ'r!uQ+b%lQ+n%zQ,S&XQ,j&mQ-R&|W-r'l't'u'xQ-y'pQ0Z*oQ1R+oQ1e,RS2Q,k,nQ2i-QQ2j-TQ2k-UQ3P-qW3R-t-u-x-zQ5c1SQ5o1aQ5s1gQ6X1wQ6c2SQ6m2]U6|3Q3T3WQ7P3UQ8_5dQ8g5qQ8i5tQ8n5|Q8w6YQ8}6bS9^6}7RQ9`7QQ:Y8eQ:d8xQ:i9OQ:p9_Q;W:ZQ;_:eQ;c:qQ;n;XR;q;`Q%zyQ'e!iQ'p!uU+o%{%|%}Q-X'VU-m'f'g'hS-q'l'vQ0S*kS1S+p+qQ2p-ZS2}-n-oQ3U-vS4r0T0WQ5d1TQ6x2wQ6{3OQ7Q3VU7}4t4u4xQ9|8PR;Q9}S$wi>QR*|%VU%Ui%V>QR0h*zQ$viS(v#v+kS)d$b$cQ)f$dQ*]$xS*f${*ZQ*u%OQ*v%QQ+R%^Q+S%_Q+W%cQ.n<qQ.o<sQ.q<wQ.r<yQ.s<{Q/a)zQ/i*SQ/k*UQ/m*WQ/x*bS0O*h/oQ0f*xQ0g*yl0x+h,X.h1k1s3e6U7Y8s9d:b:t;^;fQ1g,UQ3h=TQ3i=VQ3j=YS4P<n<oQ4T/RS4^/f4`Q4i/zQ4j/{Q4n/}Q5O0bQ5Q0dQ5T0kQ5U0lQ5Y0qQ5t1hQ7_=^Q7`=`Q7a=bQ7b=dQ7g<rQ7h<tQ7j<xQ7k<zQ7l<|Q7r4aQ7y4lQ7|4qQ8W5SQ8Z5^Q8]5aQ9j=ZQ9k=UQ9l=WQ9v7xQ:O8SQ:T8XQ:U8^Q:v=_Q:w=aQ:x=cQ:y=eQ:z9rQ;P9{Q;T:RQ;g=hQ;l;SQ;x;mQ;{=iQ=q>QQ>O>YQ>P>ZQ>[>^R>]>_Q+P%]Q.p<uR7i<vnpOXst!Z#d%m&r&t&u&w,u,z2^2aQ!fPS#fZ#oQ&|!`W'i!o*j0_4|Q(Q#SQ)R#{Q)s$nS,n&k&nQ,s&oQ-Q&{S-V'T/pQ-i'cQ.z)PQ/^)tQ0u+_Q0{+iQ2Y,rQ2{-kQ3c.iQ4Y/XQ5W0nQ6S1tQ6e2UQ6f2VQ6j2XQ6l2ZQ6q2cQ7]3fQ7o4VQ8u6VQ9R6gQ9S6hQ9U6kQ9h7^Q:c8vR:m9V#[cOPXZst!Z!`!o#d#o#{%m&k&n&o&r&t&u&w&{'T'c)P*j+_+i,r,u,z-k.i/p0_0n1t2U2V2X2Z2^2a2c3f4|6V6g6h6k7^8v9VQ#YWQ#eYQ%quQ%svS%uw!gS(T#W(WQ(Z#ZQ(u#uQ(z#xQ)S$OQ)T$PQ)U$QQ)V$RQ)W$SQ)X$TQ)Y$UQ)Z$VQ)[$WQ)]$XQ)_$ZQ)a$_Q)c$aQ)h$eW)r$n)t/X4VQ+f%tQ+z&RS-['X2qQ-z'sS.P(U.RQ.U(^Q.W(eQ.u(yQ.x({Q.|<WQ/O<ZQ/P<[Q/Q<_Q/d*OQ0r+YQ2o-YQ2t-aQ3Q-sQ3X.XQ3m.vQ3r<`Q3s<aQ3t<bQ3u<cQ3v<dQ3w<eQ3x<fQ3y<gQ3z<hQ3{<iQ3|<jQ3}.}Q4O<mQ4R<pQ4S<}Q4Z<kQ5Z0tQ5e1UQ6w=PQ6}3SQ7S3YQ7c3nQ7d=QQ7m=SQ7n=[Q8m5yQ9Z6uQ9_7OQ9i=]Q9o=fQ9p=gQ:q9aQ;Y:]Q;b:oQ<Y#SR=w>TR#[WR'Z!el!tQ!r!v!y!z'a'm'n'o-g-w1q5}6PS'V!e-^U*k$|*[*pS-Z'W'`S0W*l*rQ0`*sQ2w-eQ4x0^R4}0aR(|#xQ!fQT-f'a-g]!qQ!r'a-g1q5}Q#p]R'j<XR)g$dY!uQ'a-g1q5}Q'l!rS'v!v!yS'x!z6PS-v'm'nQ-x'oR3V-wT#kZ%eS#jZ%eS%km,qU(h#h#i#lS.[(i(jQ.`(kQ0v+`Q3[.]U3].^._.aS7U3^3_R9b7Vd#^W#W#Z%h(U(_*Z+[.V/or#gZm#h#i#l%e(i(j(k+`.].^._.a3^3_7VS*^$x*cQ/v*_Q2W,qQ2m-WQ4b/rQ6s2fQ7u4cQ9Y6tT=n'X+^V#aW%h*ZU#`W%h*ZS(V#W(_U([#Z+[/oS-]'X+^T.Q(U.VV'_!e%i*[Q$lfR)y$qT)n$l)oR4X/WT*`$x*cT*i${*ZQ0y+hQ1i,XQ3a.hQ5v1kQ6R1sQ7Z3eQ8t6UQ9e7YQ:`8sQ:r9dQ;]:bQ;e:tQ;p;^R;s;fnqOXst!Z#d%m&r&t&u&w,u,z2^2aQ&l!VR,j&itmOXst!U!V!Z#d%m&i&r&t&u&w,u,z2^2aR,q&oT%lm,qR1m,ZR,i&gQ&U|S,P&V&WR1`,QR+u&PT&p!W&sT&q!W&sT2`,z2a",
	nodeNames: "⚠ ArithOp ArithOp ?. JSXStartTag LineComment BlockComment Script Hashbang ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > < TypeParamList in out const TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewTarget new NewExpression ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression TypeArgList CompareOp < declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty VariableDefinition Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression InstantiationExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast < ArrowFunction TypeParamList SequenceExpression InstantiationExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate asserts is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration defer ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem",
	maxTerm: 381,
	context: n3,
	nodeProps: [
		[
			"isolate",
			-8,
			5,
			6,
			14,
			37,
			39,
			51,
			53,
			55,
			""
		],
		[
			"group",
			-26,
			9,
			17,
			19,
			68,
			208,
			212,
			216,
			217,
			219,
			222,
			225,
			235,
			238,
			244,
			246,
			248,
			250,
			253,
			259,
			265,
			267,
			269,
			271,
			273,
			275,
			276,
			"Statement",
			-34,
			13,
			14,
			32,
			35,
			36,
			42,
			51,
			54,
			55,
			57,
			62,
			70,
			72,
			76,
			80,
			82,
			84,
			85,
			110,
			111,
			121,
			122,
			137,
			140,
			142,
			143,
			144,
			145,
			146,
			148,
			149,
			168,
			170,
			172,
			"Expression",
			-23,
			31,
			33,
			37,
			41,
			43,
			45,
			174,
			176,
			178,
			179,
			181,
			182,
			183,
			185,
			186,
			187,
			189,
			190,
			191,
			202,
			204,
			206,
			207,
			"Type",
			-3,
			88,
			103,
			109,
			"ClassItem"
		],
		[
			"openedBy",
			23,
			"<",
			38,
			"InterpolationStart",
			56,
			"[",
			60,
			"{",
			73,
			"(",
			161,
			"JSXStartCloseTag"
		],
		[
			"closedBy",
			-2,
			24,
			169,
			">",
			40,
			"InterpolationEnd",
			50,
			"]",
			61,
			"}",
			74,
			")",
			166,
			"JSXEndTag"
		]
	],
	propSources: [l3],
	skippedNodes: [
		0,
		5,
		6,
		279
	],
	repeatNodeCount: 37,
	tokenData: "$Fq07[R!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tuEruvJSvwLkwx! Yxy!'iyz!(sz{!)}{|!,q|}!.O}!O!,q!O!P!/Y!P!Q!9j!Q!R#:O!R![#<_![!]#I_!]!^#Jk!^!_#Ku!_!`$![!`!a$$v!a!b$*T!b!c$,r!c!}Er!}#O$-|#O#P$/W#P#Q$4o#Q#R$5y#R#SEr#S#T$7W#T#o$8b#o#p$<r#p#q$=h#q#r$>x#r#s$@U#s$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$I|Er$I|$I}$Dk$I}$JO$Dk$JO$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr(n%d_$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$j&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$j&j([!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU([!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$j&j(XpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU(XpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX(Xp([!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z07[+rq$j&j(Xp([!b'}0/lOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z07[.ST(Y#S$j&j(O0/lO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c07[.n_$j&j(Xp([!b(O0/lOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)3p/x`$j&j!p),Q(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW1V`#w(Ch$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW2d_#w(Ch$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At3l_(W':f$j&j([!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k(^4r_$j&j([!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k&z5vX$j&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q&z6jT$e`$j&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c`6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y`7bO$e``7eP;=`<%l6y&z7kP;=`<%l5q(^7w]$e`$j&j([!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!r8uZ([!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p!r9oU$e`([!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!r:UP;=`<%l8p(^:[P;=`<%l4k%9[:hh$j&j(Xp([!bOY%ZYZ&cZq%Zqr<Srs&}st%ZtuCruw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr(r<__WS$j&j(Xp([!bOY<SYZ&cZr<Srs=^sw<Swx@nx!^<S!^!_Bm!_#O<S#O#P>`#P#o<S#o#pBm#p;'S<S;'S;=`Cl<%lO<S(Q=g]WS$j&j([!bOY=^YZ&cZw=^wx>`x!^=^!^!_?q!_#O=^#O#P>`#P#o=^#o#p?q#p;'S=^;'S;=`@h<%lO=^&n>gXWS$j&jOY>`YZ&cZ!^>`!^!_?S!_#o>`#o#p?S#p;'S>`;'S;=`?k<%lO>`S?XSWSOY?SZ;'S?S;'S;=`?e<%lO?SS?hP;=`<%l?S&n?nP;=`<%l>`!f?xWWS([!bOY?qZw?qwx?Sx#O?q#O#P?S#P;'S?q;'S;=`@b<%lO?q!f@eP;=`<%l?q(Q@kP;=`<%l=^'`@w]WS$j&j(XpOY@nYZ&cZr@nrs>`s!^@n!^!_Ap!_#O@n#O#P>`#P#o@n#o#pAp#p;'S@n;'S;=`Bg<%lO@ntAwWWS(XpOYApZrAprs?Ss#OAp#O#P?S#P;'SAp;'S;=`Ba<%lOAptBdP;=`<%lAp'`BjP;=`<%l@n#WBvYWS(Xp([!bOYBmZrBmrs?qswBmwxApx#OBm#O#P?S#P;'SBm;'S;=`Cf<%lOBm#WCiP;=`<%lBm(rCoP;=`<%l<S%9[C}i$j&j(p%1l(Xp([!bOY%ZYZ&cZr%Zrs&}st%ZtuCruw%Zwx(rx!Q%Z!Q![Cr![!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr%9[EoP;=`<%lCr07[FRk$j&j(Xp([!b$^#t(U,2j(f$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr+dHRk$j&j(Xp([!b$^#tOY%ZYZ&cZr%Zrs&}st%ZtuGvuw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Gv![!^%Z!^!_*g!_!c%Z!c!}Gv!}#O%Z#O#P&c#P#R%Z#R#SGv#S#T%Z#T#oGv#o#p*g#p$g%Z$g;'SGv;'S;=`Iv<%lOGv+dIyP;=`<%lGv07[JPP;=`<%lEr(KWJ_`$j&j(Xp([!b#q(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWKl_$j&j$R(Ch(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,#xLva({+JY$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sv%ZvwM{wx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWNW`$j&j#{(Ch(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At! c_(Z';W$j&j(XpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b'l!!i_$j&j(XpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b&z!#mX$j&jOw!#hwx6cx!^!#h!^!_!$Y!_#o!#h#o#p!$Y#p;'S!#h;'S;=`!$r<%lO!#h`!$]TOw!$Ywx7]x;'S!$Y;'S;=`!$l<%lO!$Y`!$oP;=`<%l!$Y&z!$uP;=`<%l!#h'l!%R]$e`$j&j(XpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r!Q!&PZ(XpOY!%zYZ!$YZr!%zrs!$Ysw!%zwx!&rx#O!%z#O#P!$Y#P;'S!%z;'S;=`!']<%lO!%z!Q!&yU$e`(XpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r!Q!'`P;=`<%l!%z'l!'fP;=`<%l!!b/5|!'t_!l/.^$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&U!)O_!k!Lf$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z-!n!*[b$j&j(Xp([!b(V%&f#r(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!+d{!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW!+o`$j&j(Xp([!b#o(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;x!,|`$j&j(Xp([!br+4YOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,$U!.Z_!]+Jf$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!/ec$j&j(Xp([!b!Q.2^OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!0p!P!Q%Z!Q![!3Y![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!0ya$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!2O!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!2Z_![!L^$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!3eg$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!3Y![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S!3Y#S#X%Z#X#Y!4|#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!5Vg$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!6n|}%Z}!O!6n!O!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!6wc$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!8_c$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!9uf$j&j(Xp([!b#p(ChOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcxz!;Zz{#-}{!P!;Z!P!Q#/d!Q!^!;Z!^!_#(i!_!`#7S!`!a#8i!a!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z?O!;fb$j&j(Xp([!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z>^!<w`$j&j([!b!X7`OY!<nYZ&cZw!<nwx!=yx!P!<n!P!Q!Eq!Q!^!<n!^!_!Gr!_!}!<n!}#O!KS#O#P!Dy#P#o!<n#o#p!Gr#p;'S!<n;'S;=`!L]<%lO!<n<z!>Q^$j&j!X7`OY!=yYZ&cZ!P!=y!P!Q!>|!Q!^!=y!^!_!@c!_!}!=y!}#O!CW#O#P!Dy#P#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!?Td$j&j!X7`O!^&c!_#W&c#W#X!>|#X#Z&c#Z#[!>|#[#]&c#]#^!>|#^#a&c#a#b!>|#b#g&c#g#h!>|#h#i&c#i#j!>|#j#k!>|#k#m&c#m#n!>|#n#o&c#p;'S&c;'S;=`&w<%lO&c7`!@hX!X7`OY!@cZ!P!@c!P!Q!AT!Q!}!@c!}#O!Ar#O#P!Bq#P;'S!@c;'S;=`!CQ<%lO!@c7`!AYW!X7`#W#X!AT#Z#[!AT#]#^!AT#a#b!AT#g#h!AT#i#j!AT#j#k!AT#m#n!AT7`!AuVOY!ArZ#O!Ar#O#P!B[#P#Q!@c#Q;'S!Ar;'S;=`!Bk<%lO!Ar7`!B_SOY!ArZ;'S!Ar;'S;=`!Bk<%lO!Ar7`!BnP;=`<%l!Ar7`!BtSOY!@cZ;'S!@c;'S;=`!CQ<%lO!@c7`!CTP;=`<%l!@c<z!C][$j&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#O!CW#O#P!DR#P#Q!=y#Q#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DWX$j&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DvP;=`<%l!CW<z!EOX$j&jOY!=yYZ&cZ!^!=y!^!_!@c!_#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!EnP;=`<%l!=y>^!Ezl$j&j([!b!X7`OY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#W&}#W#X!Eq#X#Z&}#Z#[!Eq#[#]&}#]#^!Eq#^#a&}#a#b!Eq#b#g&}#g#h!Eq#h#i&}#i#j!Eq#j#k!Eq#k#m&}#m#n!Eq#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}8r!GyZ([!b!X7`OY!GrZw!Grwx!@cx!P!Gr!P!Q!Hl!Q!}!Gr!}#O!JU#O#P!Bq#P;'S!Gr;'S;=`!J|<%lO!Gr8r!Hse([!b!X7`OY'}Zw'}x#O'}#P#W'}#W#X!Hl#X#Z'}#Z#[!Hl#[#]'}#]#^!Hl#^#a'}#a#b!Hl#b#g'}#g#h!Hl#h#i'}#i#j!Hl#j#k!Hl#k#m'}#m#n!Hl#n;'S'};'S;=`(f<%lO'}8r!JZX([!bOY!JUZw!JUwx!Arx#O!JU#O#P!B[#P#Q!Gr#Q;'S!JU;'S;=`!Jv<%lO!JU8r!JyP;=`<%l!JU8r!KPP;=`<%l!Gr>^!KZ^$j&j([!bOY!KSYZ&cZw!KSwx!CWx!^!KS!^!_!JU!_#O!KS#O#P!DR#P#Q!<n#Q#o!KS#o#p!JU#p;'S!KS;'S;=`!LV<%lO!KS>^!LYP;=`<%l!KS>^!L`P;=`<%l!<n=l!Ll`$j&j(Xp!X7`OY!LcYZ&cZr!Lcrs!=ys!P!Lc!P!Q!Mn!Q!^!Lc!^!_# o!_!}!Lc!}#O#%P#O#P!Dy#P#o!Lc#o#p# o#p;'S!Lc;'S;=`#&Y<%lO!Lc=l!Mwl$j&j(Xp!X7`OY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#W(r#W#X!Mn#X#Z(r#Z#[!Mn#[#](r#]#^!Mn#^#a(r#a#b!Mn#b#g(r#g#h!Mn#h#i(r#i#j!Mn#j#k!Mn#k#m(r#m#n!Mn#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r8Q# vZ(Xp!X7`OY# oZr# ors!@cs!P# o!P!Q#!i!Q!}# o!}#O#$R#O#P!Bq#P;'S# o;'S;=`#$y<%lO# o8Q#!pe(Xp!X7`OY)rZr)rs#O)r#P#W)r#W#X#!i#X#Z)r#Z#[#!i#[#])r#]#^#!i#^#a)r#a#b#!i#b#g)r#g#h#!i#h#i)r#i#j#!i#j#k#!i#k#m)r#m#n#!i#n;'S)r;'S;=`*Z<%lO)r8Q#$WX(XpOY#$RZr#$Rrs!Ars#O#$R#O#P!B[#P#Q# o#Q;'S#$R;'S;=`#$s<%lO#$R8Q#$vP;=`<%l#$R8Q#$|P;=`<%l# o=l#%W^$j&j(XpOY#%PYZ&cZr#%Prs!CWs!^#%P!^!_#$R!_#O#%P#O#P!DR#P#Q!Lc#Q#o#%P#o#p#$R#p;'S#%P;'S;=`#&S<%lO#%P=l#&VP;=`<%l#%P=l#&]P;=`<%l!Lc?O#&kn$j&j(Xp([!b!X7`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#W%Z#W#X#&`#X#Z%Z#Z#[#&`#[#]%Z#]#^#&`#^#a%Z#a#b#&`#b#g%Z#g#h#&`#h#i%Z#i#j#&`#j#k#&`#k#m%Z#m#n#&`#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z9d#(r](Xp([!b!X7`OY#(iZr#(irs!Grsw#(iwx# ox!P#(i!P!Q#)k!Q!}#(i!}#O#+`#O#P!Bq#P;'S#(i;'S;=`#,`<%lO#(i9d#)th(Xp([!b!X7`OY*gZr*grs'}sw*gwx)rx#O*g#P#W*g#W#X#)k#X#Z*g#Z#[#)k#[#]*g#]#^#)k#^#a*g#a#b#)k#b#g*g#g#h#)k#h#i*g#i#j#)k#j#k#)k#k#m*g#m#n#)k#n;'S*g;'S;=`+Z<%lO*g9d#+gZ(Xp([!bOY#+`Zr#+`rs!JUsw#+`wx#$Rx#O#+`#O#P!B[#P#Q#(i#Q;'S#+`;'S;=`#,Y<%lO#+`9d#,]P;=`<%l#+`9d#,cP;=`<%l#(i?O#,o`$j&j(Xp([!bOY#,fYZ&cZr#,frs!KSsw#,fwx#%Px!^#,f!^!_#+`!_#O#,f#O#P!DR#P#Q!;Z#Q#o#,f#o#p#+`#p;'S#,f;'S;=`#-q<%lO#,f?O#-tP;=`<%l#,f?O#-zP;=`<%l!;Z07[#.[b$j&j(Xp([!b(P0/l!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z07[#/o_$j&j(Xp([!bT0/lOY#/dYZ&cZr#/drs#0nsw#/dwx#4Ox!^#/d!^!_#5}!_#O#/d#O#P#1p#P#o#/d#o#p#5}#p;'S#/d;'S;=`#6|<%lO#/d06j#0w]$j&j([!bT0/lOY#0nYZ&cZw#0nwx#1px!^#0n!^!_#3R!_#O#0n#O#P#1p#P#o#0n#o#p#3R#p;'S#0n;'S;=`#3x<%lO#0n05W#1wX$j&jT0/lOY#1pYZ&cZ!^#1p!^!_#2d!_#o#1p#o#p#2d#p;'S#1p;'S;=`#2{<%lO#1p0/l#2iST0/lOY#2dZ;'S#2d;'S;=`#2u<%lO#2d0/l#2xP;=`<%l#2d05W#3OP;=`<%l#1p01O#3YW([!bT0/lOY#3RZw#3Rwx#2dx#O#3R#O#P#2d#P;'S#3R;'S;=`#3r<%lO#3R01O#3uP;=`<%l#3R06j#3{P;=`<%l#0n05x#4X]$j&j(XpT0/lOY#4OYZ&cZr#4Ors#1ps!^#4O!^!_#5Q!_#O#4O#O#P#1p#P#o#4O#o#p#5Q#p;'S#4O;'S;=`#5w<%lO#4O00^#5XW(XpT0/lOY#5QZr#5Qrs#2ds#O#5Q#O#P#2d#P;'S#5Q;'S;=`#5q<%lO#5Q00^#5tP;=`<%l#5Q05x#5zP;=`<%l#4O01p#6WY(Xp([!bT0/lOY#5}Zr#5}rs#3Rsw#5}wx#5Qx#O#5}#O#P#2d#P;'S#5};'S;=`#6v<%lO#5}01p#6yP;=`<%l#5}07[#7PP;=`<%l#/d)3h#7ab$j&j$R(Ch(Xp([!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;ZAt#8vb$[#t$j&j(Xp([!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z'Ad#:Zp$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#U%Z#U#V#?i#V#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#d#Bq#d#l%Z#l#m#Es#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#<jk$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#>j_$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#?rd$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#A]f$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Bzc$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Dbe$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#E|g$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Gpi$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x#Il_!g$b$j&j$P)Lv(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Jv_al$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f#LS^h#)`#R-<U(Xp([!b$o7`OY*gZr*grs'}sw*gwx)rx!P*g!P!Q#MO!Q!^*g!^!_#Mt!_!`$ f!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#MXX$l&j(Xp([!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El#M}Z#s(Ch(Xp([!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Np!`#O*g#P;'S*g;'S;=`+Z<%lO*g(El#NyX$R(Ch(Xp([!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El$ oX#t(Ch(Xp([!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g*)x$!ga#`*!Y$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a$#l!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(K[$#w_#l(Cl$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x$%Vag!*r#t(Ch$g#|$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`$&[!`!a$'f!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$&g_#t(Ch$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$'qa#s(Ch$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`!a$(v!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$)R`#s(Ch$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(Kd$*`a(s(Ct$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!a%Z!a!b$+e!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$+p`$j&j#|(Ch(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`$,}_!|$Ip$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f$.X_!S0,v$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$/]Z$j&jO!^$0O!^!_$0f!_#i$0O#i#j$0k#j#l$0O#l#m$2^#m#o$0O#o#p$0f#p;'S$0O;'S;=`$4i<%lO$0O(n$0VT_#S$j&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$0kO_#S(n$0p[$j&jO!Q&c!Q![$1f![!^&c!_!c&c!c!i$1f!i#T&c#T#Z$1f#Z#o&c#o#p$3|#p;'S&c;'S;=`&w<%lO&c(n$1kZ$j&jO!Q&c!Q![$2^![!^&c!_!c&c!c!i$2^!i#T&c#T#Z$2^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$2cZ$j&jO!Q&c!Q![$3U![!^&c!_!c&c!c!i$3U!i#T&c#T#Z$3U#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$3ZZ$j&jO!Q&c!Q![$0O![!^&c!_!c&c!c!i$0O!i#T&c#T#Z$0O#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$4PR!Q![$4Y!c!i$4Y#T#Z$4Y#S$4]S!Q![$4Y!c!i$4Y#T#Z$4Y#q#r$0f(n$4lP;=`<%l$0O#1[$4z_!Y#)l$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$6U`#y(Ch$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;p$7c_$j&j(Xp([!b(b+4QOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$8qk$j&j(Xp([!b(U,2j$`#t(f$I[OY%ZYZ&cZr%Zrs&}st%Ztu$8buw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$8b![!^%Z!^!_*g!_!c%Z!c!}$8b!}#O%Z#O#P&c#P#R%Z#R#S$8b#S#T%Z#T#o$8b#o#p*g#p$g%Z$g;'S$8b;'S;=`$<l<%lO$8b+d$:qk$j&j(Xp([!b$`#tOY%ZYZ&cZr%Zrs&}st%Ztu$:fuw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$:f![!^%Z!^!_*g!_!c%Z!c!}$:f!}#O%Z#O#P&c#P#R%Z#R#S$:f#S#T%Z#T#o$:f#o#p*g#p$g%Z$g;'S$:f;'S;=`$<f<%lO$:f+d$<iP;=`<%l$:f07[$<oP;=`<%l$8b#Jf$<{X!_#Hb(Xp([!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g,#x$=sa(z+JY$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$+e#q;'S%Z;'S;=`+a<%lO%Z)>v$?V_!^(CdvBr$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z?O$@a_!q7`$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$Aq|$j&j(Xp([!b'}0/l$^#t(U,2j(f$I[OX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr07[$D|k$j&j(Xp([!b(O0/l$^#t(U,2j(f$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr",
	tokenizers: [
		i3,
		a3,
		o3,
		c3,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		r3,
		new ny("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOx~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!U~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(d~~", 141, 341),
		new ny("j~RQYZXz{^~^O(R~~aP!P!Qd~iO(S~~", 25, 324)
	],
	topRules: {
		Script: [0, 7],
		SingleExpression: [1, 277],
		SingleClassItem: [2, 278]
	},
	dialects: {
		jsx: 0,
		ts: 15190
	},
	dynamicPrecedences: {
		80: 1,
		82: 1,
		94: 1,
		170: 1,
		200: 1
	},
	specialized: [
		{
			term: 328,
			get: (e) => u3[e] || -1
		},
		{
			term: 344,
			get: (e) => d3[e] || -1
		},
		{
			term: 95,
			get: (e) => f3[e] || -1
		}
	],
	tokenPrec: 15216
}), m3 = class {
	constructor(e, t, n, r) {
		this.state = e, this.pos = t, this.explicit = n, this.view = r, this.abortListeners = [], this.abortOnDocChange = !1;
	}
	tokenBefore(e) {
		let t = o_(this.state).resolveInner(this.pos, -1);
		for (; t && e.indexOf(t.name) < 0;) t = t.parent;
		return t ? {
			from: t.from,
			to: this.pos,
			text: this.state.sliceDoc(t.from, this.pos),
			type: t.type
		} : null;
	}
	matchBefore(e) {
		let t = this.state.doc.lineAt(this.pos), n = Math.max(t.from, this.pos - 250), r = t.text.slice(n - t.from, this.pos - t.from), i = r.search(y3(e, !1));
		return i < 0 ? null : {
			from: n + i,
			to: this.pos,
			text: r.slice(i)
		};
	}
	get aborted() {
		return this.abortListeners == null;
	}
	addEventListener(e, t, n) {
		e == "abort" && this.abortListeners && (this.abortListeners.push(t), n && n.onDocChange && (this.abortOnDocChange = !0));
	}
};
function h3(e) {
	let t = Object.keys(e).join(""), n = /\w/.test(t);
	return n && (t = t.replace(/\w/g, "")), `[${n ? "\\w" : ""}${t.replace(/[^\w\s]/g, "\\$&")}]`;
}
function g3(e) {
	let t = Object.create(null), n = Object.create(null);
	for (let { label: r } of e) {
		t[r[0]] = !0;
		for (let e = 1; e < r.length; e++) n[r[e]] = !0;
	}
	let r = h3(t) + h3(n) + "*$";
	return [RegExp("^" + r), new RegExp(r)];
}
function _3(e) {
	let t = e.map((e) => typeof e == "string" ? { label: e } : e), [n, r] = t.every((e) => /^\w+$/.test(e.label)) ? [/\w*$/, /\w+$/] : g3(t);
	return (e) => {
		let i = e.matchBefore(r);
		return i || e.explicit ? {
			from: i ? i.from : e.pos,
			options: t,
			validFor: n
		} : null;
	};
}
function v3(e, t) {
	return (n) => {
		for (let t = o_(n.state).resolveInner(n.pos, -1); t; t = t.parent) {
			if (e.indexOf(t.name) > -1) return null;
			if (t.type.isTop) break;
		}
		return t(n);
	};
}
function y3(e, t) {
	let { source: n } = e, r = t && n[0] != "^", i = n[n.length - 1] != "$";
	return !r && !i ? e : RegExp(`${r ? "^" : ""}(?:${n})${i ? "$" : ""}`, e.flags ?? (e.ignoreCase ? "i" : ""));
}
var b3 = /*@__PURE__*/ Tc.define();
typeof navigator == "object" && navigator.platform;
var x3 = /*@__PURE__*/ W.baseTheme({
	".cm-tooltip.cm-tooltip-autocomplete": { "& > ul": {
		fontFamily: "monospace",
		whiteSpace: "nowrap",
		overflow: "hidden auto",
		maxWidth_fallback: "700px",
		maxWidth: "min(700px, 95vw)",
		minWidth: "250px",
		maxHeight: "10em",
		height: "100%",
		listStyle: "none",
		margin: 0,
		padding: 0,
		"& > li, & > completion-section": {
			padding: "1px 3px",
			lineHeight: 1.2
		},
		"& > li": {
			overflowX: "hidden",
			textOverflow: "ellipsis",
			cursor: "pointer"
		},
		"& > completion-section": {
			display: "list-item",
			borderBottom: "1px solid silver",
			paddingLeft: "0.5em",
			opacity: .7
		}
	} },
	"&light .cm-tooltip-autocomplete ul li[aria-selected]": {
		background: "#17c",
		color: "white"
	},
	"&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": { background: "#777" },
	"&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
		background: "#347",
		color: "white"
	},
	"&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": { background: "#444" },
	".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
		content: "\"···\"",
		opacity: .5,
		display: "block",
		textAlign: "center",
		cursor: "pointer"
	},
	".cm-tooltip.cm-completionInfo": {
		position: "absolute",
		padding: "3px 9px",
		width: "max-content",
		maxWidth: "400px",
		boxSizing: "border-box",
		whiteSpace: "pre-line"
	},
	".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
	".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
	".cm-completionInfo.cm-completionInfo-left-narrow": { right: "30px" },
	".cm-completionInfo.cm-completionInfo-right-narrow": { left: "30px" },
	"&light .cm-snippetField": { backgroundColor: "#00000022" },
	"&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
	".cm-snippetFieldPosition": {
		verticalAlign: "text-top",
		width: 0,
		height: "1.15em",
		display: "inline-block",
		margin: "0 -0.7px -.7em",
		borderLeft: "1.4px dotted #888"
	},
	".cm-completionMatchedText": { textDecoration: "underline" },
	".cm-completionDetail": {
		marginLeft: "0.5em",
		fontStyle: "italic"
	},
	".cm-completionIcon": {
		fontSize: "90%",
		width: ".8em",
		display: "inline-block",
		textAlign: "center",
		paddingRight: ".6em",
		opacity: "0.6",
		boxSizing: "content-box"
	},
	".cm-completionIcon-function, .cm-completionIcon-method": { "&:after": { content: "'ƒ'" } },
	".cm-completionIcon-class": { "&:after": { content: "'○'" } },
	".cm-completionIcon-interface": { "&:after": { content: "'◌'" } },
	".cm-completionIcon-variable": { "&:after": { content: "'𝑥'" } },
	".cm-completionIcon-constant": { "&:after": { content: "'𝐶'" } },
	".cm-completionIcon-type": { "&:after": { content: "'𝑡'" } },
	".cm-completionIcon-enum": { "&:after": { content: "'∪'" } },
	".cm-completionIcon-property": { "&:after": { content: "'□'" } },
	".cm-completionIcon-keyword": { "&:after": { content: "'🔑︎'" } },
	".cm-completionIcon-namespace": { "&:after": { content: "'▢'" } },
	".cm-completionIcon-text": { "&:after": {
		content: "'abc'",
		fontSize: "50%",
		verticalAlign: "middle"
	} }
}), S3 = class {
	constructor(e, t, n, r) {
		this.field = e, this.line = t, this.from = n, this.to = r;
	}
}, C3 = class e {
	constructor(e, t, n) {
		this.field = e, this.from = t, this.to = n;
	}
	map(t) {
		let n = t.mapPos(this.from, -1, Us.TrackDel), r = t.mapPos(this.to, 1, Us.TrackDel);
		return n == null || r == null ? null : new e(this.field, n, r);
	}
}, w3 = class e {
	constructor(e, t) {
		this.lines = e, this.fieldPositions = t;
	}
	instantiate(e, t) {
		let n = [], r = [t], i = e.doc.lineAt(t), a = /^\s*/.exec(i.text)[0];
		for (let i of this.lines) {
			if (n.length) {
				let n = a, o = /^\t*/.exec(i)[0].length;
				for (let t = 0; t < o; t++) n += e.facet(y_);
				r.push(t + n.length - o), i = n + i.slice(o);
			}
			n.push(i), t += i.length + 1;
		}
		return {
			text: n,
			ranges: this.fieldPositions.map((e) => new C3(e.field, r[e.line] + e.from, r[e.line] + e.to))
		};
	}
	static parse(t) {
		let n = [], r = [], i = [], a;
		for (let e of t.split(/\r\n?|\n/)) {
			for (; a = /[#$]\{(?:(\d+)(?::([^{}]*))?|((?:\\[{}]|[^{}])*))\}/.exec(e);) {
				let t = a[1] ? +a[1] : null, o = a[2] || a[3] || "", s = -1;
				t === 0 && (t = 1e9);
				let c = o.replace(/\\[{}]/g, (e) => e[1]);
				for (let e = 0; e < n.length; e++) (t == null ? c && n[e].name == c : n[e].seq == t) && (s = e);
				if (s < 0) {
					let e = 0;
					for (; e < n.length && (t == null || n[e].seq != null && n[e].seq < t);) e++;
					n.splice(e, 0, {
						seq: t,
						name: c
					}), s = e;
					for (let e of i) e.field >= s && e.field++;
				}
				for (let e of i) if (e.line == r.length && e.from > a.index) {
					let t = a[2] ? 3 + (a[1] || "").length : 2;
					e.from -= t, e.to -= t;
				}
				i.push(new S3(s, r.length, a.index, a.index + c.length)), e = e.slice(0, a.index) + o + e.slice(a.index + a[0].length);
			}
			e = e.replace(/\\([{}])/g, (e, t, n) => {
				for (let e of i) e.line == r.length && e.from > n && (e.from--, e.to--);
				return t;
			}), r.push(e);
		}
		return new e(r, i);
	}
}, T3 = /*@__PURE__*/ Kl.widget({ widget: /*@__PURE__*/ new class extends Wl {
	toDOM() {
		let e = document.createElement("span");
		return e.className = "cm-snippetFieldPosition", e;
	}
	ignoreEvent() {
		return !1;
	}
}() }), E3 = /*@__PURE__*/ Kl.mark({ class: "cm-snippetField" }), D3 = class e {
	constructor(e, t) {
		this.ranges = e, this.active = t, this.deco = Kl.set(e.map((e) => (e.from == e.to ? T3 : E3).range(e.from, e.to)), !0);
	}
	map(t) {
		let n = [];
		for (let e of this.ranges) {
			let r = e.map(t);
			if (!r) return null;
			n.push(r);
		}
		return new e(n, this.active);
	}
	selectionInsideField(e) {
		return e.ranges.every((e) => this.ranges.some((t) => t.field == this.active && t.from <= e.from && t.to >= e.to));
	}
}, O3 = /*@__PURE__*/ Oc.define({ map(e, t) {
	return e && e.map(t);
} }), k3 = /*@__PURE__*/ Oc.define(), A3 = /*@__PURE__*/ sc.define({
	create() {
		return null;
	},
	update(e, t) {
		for (let n of t.effects) {
			if (n.is(O3)) return n.value;
			if (n.is(k3) && e) return new D3(e.ranges, n.value);
		}
		return e && t.docChanged && (e = e.map(t.changes)), e && t.selection && !e.selectionInsideField(t.selection) && (e = null), e;
	},
	provide: (e) => W.decorations.from(e, (e) => e ? e.deco : Kl.none)
});
function j3(e, t) {
	return z.create(e.filter((e) => e.field == t).map((e) => z.range(e.from, e.to)));
}
function M3(e) {
	let t = w3.parse(e);
	return (e, n, r, i) => {
		let { text: a, ranges: o } = t.instantiate(e.state, r), { main: s } = e.state.selection, c = {
			changes: {
				from: r,
				to: i == s.from ? s.to : i,
				insert: R.of(a)
			},
			scrollIntoView: !0,
			annotations: n ? [b3.of(n), kc.userEvent.of("input.complete")] : void 0
		};
		if (o.length && (c.selection = j3(o, 0)), o.some((e) => e.field > 0)) {
			let t = new D3(o, 0), n = c.effects = [O3.of(t)];
			e.state.field(A3, !1) === void 0 && n.push(Oc.appendConfig.of([
				A3,
				I3,
				R3,
				x3
			]));
		}
		e.dispatch(e.state.update(c));
	};
}
function N3(e) {
	return ({ state: t, dispatch: n }) => {
		let r = t.field(A3, !1);
		if (!r || e < 0 && r.active == 0) return !1;
		let i = r.active + e, a = e > 0 && !r.ranges.some((t) => t.field == i + e);
		return n(t.update({
			selection: j3(r.ranges, i),
			effects: O3.of(a ? null : new D3(r.ranges, i)),
			scrollIntoView: !0
		})), !0;
	};
}
var P3 = [{
	key: "Tab",
	run: /* @__PURE__ */ N3(1),
	shift: /* @__PURE__ */ N3(-1)
}, {
	key: "Escape",
	run: ({ state: e, dispatch: t }) => e.field(A3, !1) ? (t(e.update({ effects: O3.of(null) })), !0) : !1
}], F3 = /*@__PURE__*/ B.define({ combine(e) {
	return e.length ? e[0] : P3;
} }), I3 = /*@__PURE__*/ uc.highest(/*@__PURE__*/ Rm.compute([F3], (e) => e.facet(F3)));
function L3(e, t) {
	return {
		...t,
		apply: M3(e)
	};
}
var R3 = /*@__PURE__*/ W.domEventHandlers({ mousedown(e, t) {
	let n = t.state.field(A3, !1), r;
	if (!n || (r = t.posAtCoords({
		x: e.clientX,
		y: e.clientY
	})) == null) return !1;
	let i = n.ranges.find((e) => e.from <= r && e.to >= r);
	return !i || i.field == n.active ? !1 : (t.dispatch({
		selection: j3(n.ranges, i.field),
		effects: O3.of(n.ranges.some((e) => e.field > i.field) ? new D3(n.ranges, i.field) : null),
		scrollIntoView: !0
	}), !0);
} }), z3 = /*@__PURE__*/ new class extends Gc {}();
z3.startSide = 1, z3.endSide = -1, typeof navigator == "object" && navigator.userAgent;
// node_modules/@codemirror/lang-javascript/dist/index.js
var B3 = [
	/*@__PURE__*/ L3("function ${name}(${params}) {\n	${}\n}", {
		label: "function",
		detail: "definition",
		type: "keyword"
	}),
	/*@__PURE__*/ L3("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
		label: "for",
		detail: "loop",
		type: "keyword"
	}),
	/*@__PURE__*/ L3("for (let ${name} of ${collection}) {\n	${}\n}", {
		label: "for",
		detail: "of loop",
		type: "keyword"
	}),
	/*@__PURE__*/ L3("do {\n	${}\n} while (${})", {
		label: "do",
		detail: "loop",
		type: "keyword"
	}),
	/*@__PURE__*/ L3("while (${}) {\n	${}\n}", {
		label: "while",
		detail: "loop",
		type: "keyword"
	}),
	/*@__PURE__*/ L3("try {\n	${}\n} catch (${error}) {\n	${}\n}", {
		label: "try",
		detail: "/ catch block",
		type: "keyword"
	}),
	/*@__PURE__*/ L3("if (${}) {\n	${}\n}", {
		label: "if",
		detail: "block",
		type: "keyword"
	}),
	/*@__PURE__*/ L3("if (${}) {\n	${}\n} else {\n	${}\n}", {
		label: "if",
		detail: "/ else block",
		type: "keyword"
	}),
	/*@__PURE__*/ L3("class ${name} {\n	constructor(${params}) {\n		${}\n	}\n}", {
		label: "class",
		detail: "definition",
		type: "keyword"
	}),
	/*@__PURE__*/ L3("import {${names}} from \"${module}\"\n${}", {
		label: "import",
		detail: "named",
		type: "keyword"
	}),
	/*@__PURE__*/ L3("import ${name} from \"${module}\"\n${}", {
		label: "import",
		detail: "default",
		type: "keyword"
	})
], V3 = /*@__PURE__*/ B3.concat([
	/*@__PURE__*/ L3("interface ${name} {\n	${}\n}", {
		label: "interface",
		detail: "definition",
		type: "keyword"
	}),
	/*@__PURE__*/ L3("type ${name} = ${type}", {
		label: "type",
		detail: "definition",
		type: "keyword"
	}),
	/*@__PURE__*/ L3("enum ${name} {\n	${}\n}", {
		label: "enum",
		detail: "definition",
		type: "keyword"
	})
]), H3 = /*@__PURE__*/ new ig(), U3 = /*@__PURE__*/ new Set([
	"Script",
	"Block",
	"FunctionExpression",
	"FunctionDeclaration",
	"ArrowFunction",
	"MethodDeclaration",
	"ForStatement"
]);
function W3(e) {
	return (t, n) => {
		let r = t.node.getChild("VariableDefinition");
		return r && n(r, e), !0;
	};
}
var G3 = ["FunctionDeclaration"], K3 = {
	FunctionDeclaration: /*@__PURE__*/ W3("function"),
	ClassDeclaration: /*@__PURE__*/ W3("class"),
	ClassExpression: () => !0,
	EnumDeclaration: /*@__PURE__*/ W3("constant"),
	TypeAliasDeclaration: /*@__PURE__*/ W3("type"),
	NamespaceDeclaration: /*@__PURE__*/ W3("namespace"),
	VariableDefinition(e, t) {
		e.matchContext(G3) || t(e, "variable");
	},
	TypeDefinition(e, t) {
		t(e, "type");
	},
	__proto__: null
};
function q3(e, t) {
	let n = H3.get(t);
	if (n) return n;
	let r = [], i = !0;
	function a(t, n) {
		let i = e.sliceString(t.from, t.to);
		r.push({
			label: i,
			type: n
		});
	}
	return t.cursor(K.IncludeAnonymous).iterate((t) => {
		if (i) i = !1;
		else if (t.name) {
			let e = K3[t.name];
			if (e && e(t, a) || U3.has(t.name)) return !1;
		} else if (t.to - t.from > 8192) {
			for (let n of q3(e, t.node)) r.push(n);
			return !1;
		}
	}), H3.set(t, r), r;
}
var J3 = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, Y3 = [
	"TemplateString",
	"String",
	"RegExp",
	"LineComment",
	"BlockComment",
	"VariableDefinition",
	"TypeDefinition",
	"Label",
	"PropertyDefinition",
	"PropertyName",
	"PrivatePropertyDefinition",
	"PrivatePropertyName",
	"JSXText",
	"JSXAttributeValue",
	"JSXOpenTag",
	"JSXCloseTag",
	"JSXSelfClosingTag",
	".",
	"?."
];
function X3(e) {
	let t = o_(e.state).resolveInner(e.pos, -1);
	if (Y3.indexOf(t.name) > -1) return null;
	let n = t.name == "VariableName" || t.to - t.from < 20 && J3.test(e.state.sliceDoc(t.from, t.to));
	if (!n && !e.explicit) return null;
	let r = [];
	for (let n = t; n; n = n.parent) U3.has(n.name) && (r = r.concat(q3(e.state.doc, n)));
	return {
		options: r,
		from: n ? t.from : e.pos,
		validFor: J3
	};
}
var Z3 = /*@__PURE__*/ a_.define({
	name: "javascript",
	parser: /*@__PURE__*/ p3.configure({ props: [/*@__PURE__*/ w_.add({
		IfStatement: /*@__PURE__*/ I_({ except: /^\s*({|else\b)/ }),
		TryStatement: /*@__PURE__*/ I_({ except: /^\s*({|catch\b|finally\b)/ }),
		LabeledStatement: F_,
		SwitchBody: (e) => {
			let t = e.textAfter, n = /^\s*\}/.test(t), r = /^\s*(case|default)\b/.test(t);
			return e.baseIndent + (n ? 0 : r ? 1 : 2) * e.unit;
		},
		Block: /*@__PURE__*/ N_({ closing: "}" }),
		ArrowFunction: (e) => e.baseIndent + e.unit,
		"TemplateString BlockComment": () => null,
		"Statement Property": /*@__PURE__*/ I_({ except: /^\s*{/ }),
		JSXElement(e) {
			let t = /^\s*<\//.test(e.textAfter);
			return e.lineIndent(e.node.from) + (t ? 0 : e.unit);
		},
		JSXEscape(e) {
			let t = /\s*\}/.test(e.textAfter);
			return e.lineIndent(e.node.from) + (t ? 0 : e.unit);
		},
		"JSXOpenTag JSXSelfClosingTag"(e) {
			return e.column(e.node.from) + e.unit;
		}
	}), /*@__PURE__*/ R_.add({
		"Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": z_,
		BlockComment(e) {
			return {
				from: e.from + 2,
				to: e.to - 2
			};
		},
		JSXElement(e) {
			let t = e.firstChild;
			if (!t || t.name == "JSXSelfClosingTag") return null;
			let n = e.lastChild;
			return {
				from: t.to,
				to: n.type.isError ? e.to : n.from
			};
		},
		"JSXSelfClosingTag JSXOpenTag"(e) {
			let t = e.firstChild?.nextSibling, n = e.lastChild;
			return !t || t.type.isError ? null : {
				from: t.to,
				to: n.type.isError ? e.to : n.from
			};
		}
	})] }),
	languageData: {
		closeBrackets: { brackets: [
			"(",
			"[",
			"{",
			"'",
			"\"",
			"`"
		] },
		commentTokens: {
			line: "//",
			block: {
				open: "/*",
				close: "*/"
			}
		},
		indentOnInput: /^\s*(?:case |default:|\{|\}|<\/)$/,
		wordChars: "$"
	}
}), Q3 = {
	test: (e) => /^JSX/.test(e.name),
	facet: /*@__PURE__*/ t_({ commentTokens: { block: {
		open: "{/*",
		close: "*/}"
	} } })
}, $3 = /*@__PURE__*/ Z3.configure({ dialect: "ts" }, "typescript"), e6 = /*@__PURE__*/ Z3.configure({
	dialect: "jsx",
	props: [/*@__PURE__*/ n_.add((e) => e.isTop ? [Q3] : void 0)]
}), t6 = /*@__PURE__*/ Z3.configure({
	dialect: "jsx ts",
	props: [/*@__PURE__*/ n_.add((e) => e.isTop ? [Q3] : void 0)]
}, "typescript"), n6 = (e) => ({
	label: e,
	type: "keyword"
}), r6 = /*@__PURE__*/ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(n6), i6 = /*@__PURE__*/ r6.concat(/*@__PURE__*/ [
	"declare",
	"implements",
	"private",
	"protected",
	"public"
].map(n6));
function a6(e = {}) {
	let t = e.jsx ? e.typescript ? t6 : e6 : e.typescript ? $3 : Z3, n = e.typescript ? V3.concat(i6) : B3.concat(r6);
	return new g_(t, [
		Z3.data.of({ autocomplete: v3(Y3, _3(n)) }),
		Z3.data.of({ autocomplete: X3 }),
		e.jsx ? l6 : []
	]);
}
function o6(e) {
	for (;;) {
		if (e.name == "JSXOpenTag" || e.name == "JSXSelfClosingTag" || e.name == "JSXFragmentTag") return e;
		if (e.name == "JSXEscape" || !e.parent) return null;
		e = e.parent;
	}
}
function s6(e, t, n = e.length) {
	for (let r = t?.firstChild; r; r = r.nextSibling) if (r.name == "JSXIdentifier" || r.name == "JSXBuiltin" || r.name == "JSXNamespacedName" || r.name == "JSXMemberExpression") return e.sliceString(r.from, Math.min(r.to, n));
	return "";
}
var c6 = typeof navigator == "object" && /*@__PURE__*/ /Android\b/.test(navigator.userAgent), l6 = /*@__PURE__*/ W.inputHandler.of((e, t, n, r, i) => {
	if ((c6 ? e.composing : e.compositionStarted) || e.state.readOnly || t != n || r != ">" && r != "/" || !Z3.isActiveAt(e.state, t, -1)) return !1;
	let a = i(), { state: o } = a, s = o.changeByRange((e) => {
		let { head: t } = e, n = o_(o).resolveInner(t - 1, -1), i;
		if (n.name == "JSXStartTag" && (n = n.parent), !(o.doc.sliceString(t - 1, t) != r || n.name == "JSXAttributeValue" && n.to > t)) {
			if (r == ">" && n.name == "JSXFragmentTag") return {
				range: e,
				changes: {
					from: t,
					insert: "</>"
				}
			};
			if (r == "/" && n.name == "JSXStartCloseTag") {
				let e = n.parent, r = e.parent;
				if (r && e.from == t - 2 && ((i = s6(o.doc, r.firstChild, t)) || r.firstChild?.name == "JSXFragmentTag")) {
					let e = `${i}>`;
					return {
						range: z.cursor(t + e.length, -1),
						changes: {
							from: t,
							insert: e
						}
					};
				}
			} else if (r == ">") {
				let r = o6(n);
				if (r && r.name == "JSXOpenTag" && !/^\/?>|^<\//.test(o.doc.sliceString(t, t + 2)) && (i = s6(o.doc, r, t))) return {
					range: e,
					changes: {
						from: t,
						insert: `</${i}>`
					}
				};
			}
		}
		return { range: e };
	});
	return !s.changes.empty && (e.dispatch([a, o.update(s, {
		userEvent: "input.complete",
		scrollIntoView: !0
	})]), !0);
}), u6 = [
	"_blank",
	"_self",
	"_top",
	"_parent"
], d6 = [
	"ascii",
	"utf-8",
	"utf-16",
	"latin1",
	"latin1"
], f6 = [
	"get",
	"post",
	"put",
	"delete"
], p6 = [
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain"
], m6 = ["true", "false"], X = {}, h6 = {
	a: { attrs: {
		href: null,
		ping: null,
		type: null,
		media: null,
		target: u6,
		hreflang: null
	} },
	abbr: X,
	address: X,
	area: { attrs: {
		alt: null,
		coords: null,
		href: null,
		target: null,
		ping: null,
		media: null,
		hreflang: null,
		type: null,
		shape: [
			"default",
			"rect",
			"circle",
			"poly"
		]
	} },
	article: X,
	aside: X,
	audio: { attrs: {
		src: null,
		mediagroup: null,
		crossorigin: ["anonymous", "use-credentials"],
		preload: [
			"none",
			"metadata",
			"auto"
		],
		autoplay: ["autoplay"],
		loop: ["loop"],
		controls: ["controls"]
	} },
	b: X,
	base: { attrs: {
		href: null,
		target: u6
	} },
	bdi: X,
	bdo: X,
	blockquote: { attrs: { cite: null } },
	body: X,
	br: X,
	button: { attrs: {
		form: null,
		formaction: null,
		name: null,
		value: null,
		autofocus: ["autofocus"],
		disabled: ["autofocus"],
		formenctype: p6,
		formmethod: f6,
		formnovalidate: ["novalidate"],
		formtarget: u6,
		type: [
			"submit",
			"reset",
			"button"
		]
	} },
	canvas: { attrs: {
		width: null,
		height: null
	} },
	caption: X,
	center: X,
	cite: X,
	code: X,
	col: { attrs: { span: null } },
	colgroup: { attrs: { span: null } },
	command: { attrs: {
		type: [
			"command",
			"checkbox",
			"radio"
		],
		label: null,
		icon: null,
		radiogroup: null,
		command: null,
		title: null,
		disabled: ["disabled"],
		checked: ["checked"]
	} },
	data: { attrs: { value: null } },
	datagrid: { attrs: {
		disabled: ["disabled"],
		multiple: ["multiple"]
	} },
	datalist: { attrs: { data: null } },
	dd: X,
	del: { attrs: {
		cite: null,
		datetime: null
	} },
	details: { attrs: { open: ["open"] } },
	dfn: X,
	div: X,
	dl: X,
	dt: X,
	em: X,
	embed: { attrs: {
		src: null,
		type: null,
		width: null,
		height: null
	} },
	eventsource: { attrs: { src: null } },
	fieldset: { attrs: {
		disabled: ["disabled"],
		form: null,
		name: null
	} },
	figcaption: X,
	figure: X,
	footer: X,
	form: { attrs: {
		action: null,
		name: null,
		"accept-charset": d6,
		autocomplete: ["on", "off"],
		enctype: p6,
		method: f6,
		novalidate: ["novalidate"],
		target: u6
	} },
	h1: X,
	h2: X,
	h3: X,
	h4: X,
	h5: X,
	h6: X,
	head: { children: [
		"title",
		"base",
		"link",
		"style",
		"meta",
		"script",
		"noscript",
		"command"
	] },
	header: X,
	hgroup: X,
	hr: X,
	html: { attrs: { manifest: null } },
	i: X,
	iframe: { attrs: {
		src: null,
		srcdoc: null,
		name: null,
		width: null,
		height: null,
		sandbox: [
			"allow-top-navigation",
			"allow-same-origin",
			"allow-forms",
			"allow-scripts"
		],
		seamless: ["seamless"]
	} },
	img: { attrs: {
		alt: null,
		src: null,
		ismap: null,
		usemap: null,
		width: null,
		height: null,
		crossorigin: ["anonymous", "use-credentials"]
	} },
	input: { attrs: {
		alt: null,
		dirname: null,
		form: null,
		formaction: null,
		height: null,
		list: null,
		max: null,
		maxlength: null,
		min: null,
		name: null,
		pattern: null,
		placeholder: null,
		size: null,
		src: null,
		step: null,
		value: null,
		width: null,
		accept: [
			"audio/*",
			"video/*",
			"image/*"
		],
		autocomplete: ["on", "off"],
		autofocus: ["autofocus"],
		checked: ["checked"],
		disabled: ["disabled"],
		formenctype: p6,
		formmethod: f6,
		formnovalidate: ["novalidate"],
		formtarget: u6,
		multiple: ["multiple"],
		readonly: ["readonly"],
		required: ["required"],
		type: [
			"hidden",
			"text",
			"search",
			"tel",
			"url",
			"email",
			"password",
			"datetime",
			"date",
			"month",
			"week",
			"time",
			"datetime-local",
			"number",
			"range",
			"color",
			"checkbox",
			"radio",
			"file",
			"submit",
			"image",
			"reset",
			"button"
		]
	} },
	ins: { attrs: {
		cite: null,
		datetime: null
	} },
	kbd: X,
	keygen: { attrs: {
		challenge: null,
		form: null,
		name: null,
		autofocus: ["autofocus"],
		disabled: ["disabled"],
		keytype: ["RSA"]
	} },
	label: { attrs: {
		for: null,
		form: null
	} },
	legend: X,
	li: { attrs: { value: null } },
	link: { attrs: {
		href: null,
		type: null,
		hreflang: null,
		media: null,
		sizes: [
			"all",
			"16x16",
			"16x16 32x32",
			"16x16 32x32 64x64"
		]
	} },
	map: { attrs: { name: null } },
	mark: X,
	menu: { attrs: {
		label: null,
		type: [
			"list",
			"context",
			"toolbar"
		]
	} },
	meta: { attrs: {
		content: null,
		charset: d6,
		name: [
			"viewport",
			"application-name",
			"author",
			"description",
			"generator",
			"keywords"
		],
		"http-equiv": [
			"content-language",
			"content-type",
			"default-style",
			"refresh"
		]
	} },
	meter: { attrs: {
		value: null,
		min: null,
		low: null,
		high: null,
		max: null,
		optimum: null
	} },
	nav: X,
	noscript: X,
	object: { attrs: {
		data: null,
		type: null,
		name: null,
		usemap: null,
		form: null,
		width: null,
		height: null,
		typemustmatch: ["typemustmatch"]
	} },
	ol: {
		attrs: {
			reversed: ["reversed"],
			start: null,
			type: [
				"1",
				"a",
				"A",
				"i",
				"I"
			]
		},
		children: [
			"li",
			"script",
			"template",
			"ul",
			"ol"
		]
	},
	optgroup: { attrs: {
		disabled: ["disabled"],
		label: null
	} },
	option: { attrs: {
		disabled: ["disabled"],
		label: null,
		selected: ["selected"],
		value: null
	} },
	output: { attrs: {
		for: null,
		form: null,
		name: null
	} },
	p: X,
	param: { attrs: {
		name: null,
		value: null
	} },
	pre: X,
	progress: { attrs: {
		value: null,
		max: null
	} },
	q: { attrs: { cite: null } },
	rp: X,
	rt: X,
	ruby: X,
	samp: X,
	script: { attrs: {
		type: ["text/javascript"],
		src: null,
		async: ["async"],
		defer: ["defer"],
		charset: d6
	} },
	section: X,
	select: { attrs: {
		form: null,
		name: null,
		size: null,
		autofocus: ["autofocus"],
		disabled: ["disabled"],
		multiple: ["multiple"]
	} },
	slot: { attrs: { name: null } },
	small: X,
	source: { attrs: {
		src: null,
		type: null,
		media: null
	} },
	span: X,
	strong: X,
	style: { attrs: {
		type: ["text/css"],
		media: null,
		scoped: null
	} },
	sub: X,
	summary: X,
	sup: X,
	table: X,
	tbody: X,
	td: { attrs: {
		colspan: null,
		rowspan: null,
		headers: null
	} },
	template: X,
	textarea: { attrs: {
		dirname: null,
		form: null,
		maxlength: null,
		name: null,
		placeholder: null,
		rows: null,
		cols: null,
		autofocus: ["autofocus"],
		disabled: ["disabled"],
		readonly: ["readonly"],
		required: ["required"],
		wrap: ["soft", "hard"]
	} },
	tfoot: X,
	th: { attrs: {
		colspan: null,
		rowspan: null,
		headers: null,
		scope: [
			"row",
			"col",
			"rowgroup",
			"colgroup"
		]
	} },
	thead: X,
	time: { attrs: { datetime: null } },
	title: X,
	tr: X,
	track: { attrs: {
		src: null,
		label: null,
		default: null,
		kind: [
			"subtitles",
			"captions",
			"descriptions",
			"chapters",
			"metadata"
		],
		srclang: null
	} },
	ul: { children: [
		"li",
		"script",
		"template",
		"ul",
		"ol"
	] },
	var: X,
	video: { attrs: {
		src: null,
		poster: null,
		width: null,
		height: null,
		crossorigin: ["anonymous", "use-credentials"],
		preload: [
			"auto",
			"metadata",
			"none"
		],
		autoplay: ["autoplay"],
		mediagroup: ["movie"],
		muted: ["muted"],
		controls: ["controls"]
	} },
	wbr: X
}, g6 = {
	accesskey: null,
	class: null,
	contenteditable: m6,
	contextmenu: null,
	dir: [
		"ltr",
		"rtl",
		"auto"
	],
	draggable: [
		"true",
		"false",
		"auto"
	],
	dropzone: [
		"copy",
		"move",
		"link",
		"string:",
		"file:"
	],
	hidden: ["hidden"],
	id: null,
	inert: ["inert"],
	itemid: null,
	itemprop: null,
	itemref: null,
	itemscope: ["itemscope"],
	itemtype: null,
	lang: [
		"ar",
		"bn",
		"de",
		"en-GB",
		"en-US",
		"es",
		"fr",
		"hi",
		"id",
		"ja",
		"pa",
		"pt",
		"ru",
		"tr",
		"zh"
	],
	spellcheck: m6,
	autocorrect: m6,
	autocapitalize: m6,
	style: null,
	tabindex: null,
	title: null,
	translate: ["yes", "no"],
	rel: [
		"stylesheet",
		"alternate",
		"author",
		"bookmark",
		"help",
		"license",
		"next",
		"nofollow",
		"noreferrer",
		"prefetch",
		"prev",
		"search",
		"tag"
	],
	role: /*@__PURE__*/ "alert application article banner button cell checkbox complementary contentinfo dialog document feed figure form grid gridcell heading img list listbox listitem main navigation region row rowgroup search switch tab table tabpanel textbox timer".split(" "),
	"aria-activedescendant": null,
	"aria-atomic": m6,
	"aria-autocomplete": [
		"inline",
		"list",
		"both",
		"none"
	],
	"aria-busy": m6,
	"aria-checked": [
		"true",
		"false",
		"mixed",
		"undefined"
	],
	"aria-controls": null,
	"aria-describedby": null,
	"aria-disabled": m6,
	"aria-dropeffect": null,
	"aria-expanded": [
		"true",
		"false",
		"undefined"
	],
	"aria-flowto": null,
	"aria-grabbed": [
		"true",
		"false",
		"undefined"
	],
	"aria-haspopup": m6,
	"aria-hidden": m6,
	"aria-invalid": [
		"true",
		"false",
		"grammar",
		"spelling"
	],
	"aria-label": null,
	"aria-labelledby": null,
	"aria-level": null,
	"aria-live": [
		"off",
		"polite",
		"assertive"
	],
	"aria-multiline": m6,
	"aria-multiselectable": m6,
	"aria-owns": null,
	"aria-posinset": null,
	"aria-pressed": [
		"true",
		"false",
		"mixed",
		"undefined"
	],
	"aria-readonly": m6,
	"aria-relevant": null,
	"aria-required": m6,
	"aria-selected": [
		"true",
		"false",
		"undefined"
	],
	"aria-setsize": null,
	"aria-sort": [
		"ascending",
		"descending",
		"none",
		"other"
	],
	"aria-valuemax": null,
	"aria-valuemin": null,
	"aria-valuenow": null,
	"aria-valuetext": null
}, _6 = /*@__PURE__*/ "beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload".split(" ").map((e) => "on" + e);
for (let e of _6) g6[e] = null;
var v6 = class {
	constructor(e, t) {
		this.tags = {
			...h6,
			...e
		}, this.globalAttrs = {
			...g6,
			...t
		}, this.allTags = Object.keys(this.tags), this.globalAttrNames = Object.keys(this.globalAttrs);
	}
};
v6.default = /*@__PURE__*/ new v6();
function y6(e, t, n = e.length) {
	if (!t) return "";
	let r = t.firstChild, i = r && r.getChild("TagName");
	return i ? e.sliceString(i.from, Math.min(i.to, n)) : "";
}
function b6(e, t = !1) {
	for (; e; e = e.parent) if (e.name == "Element") {
		if (t) t = !1;
		else return e;
	}
	return null;
}
function x6(e, t, n) {
	return n.tags[y6(e, b6(t))]?.children || n.allTags;
}
function S6(e, t) {
	let n = [];
	for (let r = b6(t); r && !r.type.isTop; r = b6(r.parent)) {
		let i = y6(e, r);
		if (i && r.lastChild.name == "CloseTag") break;
		i && n.indexOf(i) < 0 && (t.name == "EndTag" || t.from >= r.firstChild.to) && n.push(i);
	}
	return n;
}
var C6 = /^[:\-\.\w\u00b7-\uffff]*$/;
function w6(e, t, n, r, i) {
	let a = /\s*>/.test(e.sliceDoc(i, i + 5)) ? "" : ">", o = b6(n, n.name == "StartTag" || n.name == "TagName");
	return {
		from: r,
		to: i,
		options: x6(e.doc, o, t).map((e) => ({
			label: e,
			type: "type"
		})).concat(S6(e.doc, n).map((e, t) => ({
			label: "/" + e,
			apply: "/" + e + a,
			type: "type",
			boost: 99 - t
		}))),
		validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/
	};
}
function T6(e, t, n, r) {
	let i = /\s*>/.test(e.sliceDoc(r, r + 5)) ? "" : ">";
	return {
		from: n,
		to: r,
		options: S6(e.doc, t).map((e, t) => ({
			label: e,
			apply: e + i,
			type: "type",
			boost: 99 - t
		})),
		validFor: C6
	};
}
function E6(e, t, n, r) {
	let i = [], a = 0;
	for (let r of x6(e.doc, n, t)) i.push({
		label: "<" + r,
		type: "type"
	});
	for (let t of S6(e.doc, n)) i.push({
		label: "</" + t + ">",
		type: "type",
		boost: 99 - a++
	});
	return {
		from: r,
		to: r,
		options: i,
		validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/
	};
}
function D6(e, t, n, r, i) {
	let a = b6(n), o = a ? t.tags[y6(e.doc, a)] : null, s = o && o.attrs ? Object.keys(o.attrs) : [];
	return {
		from: r,
		to: i,
		options: (o && o.globalAttrs === !1 ? s : s.length ? s.concat(t.globalAttrNames) : t.globalAttrNames).map((e) => ({
			label: e,
			type: "property"
		})),
		validFor: C6
	};
}
function O6(e, t, n, r, i) {
	let a = n.parent?.getChild("AttributeName"), o = [], s;
	if (a) {
		let c = e.sliceDoc(a.from, a.to), l = t.globalAttrs[c];
		if (!l) {
			let r = b6(n), i = r ? t.tags[y6(e.doc, r)] : null;
			l = i?.attrs && i.attrs[c];
		}
		if (l) {
			let t = e.sliceDoc(r, i).toLowerCase(), n = "\"", a = "\"";
			/^['"]/.test(t) ? (s = t[0] == "\"" ? /^[^"]*$/ : /^[^']*$/, n = "", a = e.sliceDoc(i, i + 1) == t[0] ? "" : t[0], t = t.slice(1), r++) : s = /^[^\s<>='"]*$/;
			for (let e of l) o.push({
				label: e,
				apply: n + e + a,
				type: "constant"
			});
		}
	}
	return {
		from: r,
		to: i,
		options: o,
		validFor: s
	};
}
function k6(e, t) {
	let { state: n, pos: r } = t, i = o_(n).resolveInner(r, -1), a = i.resolve(r);
	for (let e = r, t; a == i && (t = i.childBefore(e));) {
		let n = t.lastChild;
		if (!n || !n.type.isError || n.from < n.to) break;
		a = i = t, e = n.from;
	}
	return i.name == "TagName" ? i.parent && /CloseTag$/.test(i.parent.name) ? T6(n, i, i.from, r) : w6(n, e, i, i.from, r) : i.name == "StartTag" || i.name == "IncompleteTag" ? w6(n, e, i, r, r) : i.name == "StartCloseTag" || i.name == "IncompleteCloseTag" ? T6(n, i, r, r) : i.name == "OpenTag" || i.name == "SelfClosingTag" || i.name == "AttributeName" ? D6(n, e, i, i.name == "AttributeName" ? i.from : r, r) : i.name == "Is" || i.name == "AttributeValue" || i.name == "UnquotedAttributeValue" ? O6(n, e, i, i.name == "Is" ? r : i.from, r) : t.explicit && (a.name == "Element" || a.name == "Text" || a.name == "Document") ? E6(n, e, i, r) : null;
}
function A6(e) {
	return k6(v6.default, e);
}
function j6(e) {
	let { extraTags: t, extraGlobalAttributes: n } = e, r = n || t ? new v6(t, n) : v6.default;
	return (e) => k6(r, e);
}
var M6 = /*@__PURE__*/ Z3.parser.configure({ top: "SingleExpression" }), N6 = [
	{
		tag: "script",
		attrs: (e) => e.type == "text/typescript" || e.lang == "ts",
		parser: $3.parser
	},
	{
		tag: "script",
		attrs: (e) => e.type == "text/babel" || e.type == "text/jsx",
		parser: e6.parser
	},
	{
		tag: "script",
		attrs: (e) => e.type == "text/typescript-jsx",
		parser: t6.parser
	},
	{
		tag: "script",
		attrs(e) {
			return /^(importmap|speculationrules|application\/(.+\+)?json)$/i.test(e.type);
		},
		parser: M6
	},
	{
		tag: "script",
		attrs(e) {
			return !e.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(e.type);
		},
		parser: Z3.parser
	},
	{
		tag: "style",
		attrs(e) {
			return (!e.lang || e.lang == "css") && (!e.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(e.type));
		},
		parser: b2.parser
	}
], P6 = /*@__PURE__*/ [{
	name: "style",
	parser: /*@__PURE__*/ b2.parser.configure({ top: "Styles" })
}].concat(/*@__PURE__*/ _6.map((e) => ({
	name: e,
	parser: Z3.parser
}))), F6 = /*@__PURE__*/ a_.define({
	name: "html",
	parser: /*@__PURE__*/ D4.configure({ props: [
		/*@__PURE__*/ w_.add({
			Element(e) {
				let t = /^(\s*)(<\/)?/.exec(e.textAfter);
				return e.node.to <= e.pos + t[0].length ? e.continue() : e.lineIndent(e.node.from) + (t[2] ? 0 : e.unit);
			},
			"OpenTag CloseTag SelfClosingTag"(e) {
				return e.column(e.node.from) + e.unit;
			},
			Document(e) {
				if (e.pos + /\s*/.exec(e.textAfter)[0].length < e.node.to) return e.continue();
				let t = null, n;
				for (let n = e.node;;) {
					let e = n.lastChild;
					if (!e || e.name != "Element" || e.to != n.to) break;
					t = n = e;
				}
				return t && !((n = t.lastChild) && (n.name == "CloseTag" || n.name == "SelfClosingTag")) ? e.lineIndent(t.from) + e.unit : null;
			}
		}),
		/*@__PURE__*/ R_.add({ Element(e) {
			let t = e.firstChild, n = e.lastChild;
			return !t || t.name != "OpenTag" ? null : {
				from: t.to,
				to: n.name == "CloseTag" ? n.from : e.to
			};
		} }),
		/*@__PURE__*/ X_.add({ "OpenTag CloseTag": (e) => e.getChild("TagName") })
	] }),
	languageData: {
		commentTokens: { block: {
			open: "<!--",
			close: "-->"
		} },
		indentOnInput: /^\s*<\/\w+\W$/,
		wordChars: "-_"
	}
}), I6 = /*@__PURE__*/ F6.configure({ wrap: /*@__PURE__*/ j4(N6, P6) });
function L6(e = {}) {
	let t = "", n;
	return e.matchClosingTags === !1 && (t = "noMatch"), e.selfClosingTags === !0 && (t = (t ? t + " " : "") + "selfClosing"), (e.nestedLanguages && e.nestedLanguages.length || e.nestedAttributes && e.nestedAttributes.length) && (n = j4((e.nestedLanguages || []).concat(N6), (e.nestedAttributes || []).concat(P6))), new g_(n ? F6.configure({
		wrap: n,
		dialect: t
	}) : t ? I6.configure({ dialect: t }) : I6, [
		I6.data.of({ autocomplete: j6(e) }),
		e.autoCloseTags === !1 ? [] : B6,
		a6().support,
		x2().support
	]);
}
var R6 = /*@__PURE__*/ new Set(/*@__PURE__*/ "area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" "));
function z6(e, t, n) {
	for (;;) {
		if (t.lastChild?.name != "CloseTag") return !1;
		let r = t.parent;
		if (!r || y6(e, r) != n) return !0;
		t = r;
	}
}
var B6 = /*@__PURE__*/ W.inputHandler.of((e, t, n, r, i) => {
	if (e.composing || e.state.readOnly || t != n || r != ">" && r != "/" || !I6.isActiveAt(e.state, t, -1)) return !1;
	let a = i(), { state: o } = a, s = o.changeByRange((e) => {
		let t = o.doc.sliceString(e.from - 1, e.to) == r, { head: n } = e, i = o_(o).resolveInner(n, -1), a;
		if (t && r == ">" && i.name == "EndTag") {
			let t = i.parent;
			if ((a = y6(o.doc, t.parent, n)) && !R6.has(a) && !z6(o.doc, t.parent, a)) return {
				range: e,
				changes: {
					from: n,
					to: n + +(o.doc.sliceString(n, n + 1) === ">"),
					insert: `</${a}>`
				}
			};
		} else if (t && r == "/" && i.name == "IncompleteCloseTag") {
			let e = i.parent;
			if (i.from == n - 2 && e.lastChild?.name != "CloseTag" && (a = y6(o.doc, e, n)) && !R6.has(a)) {
				let e = n + +(o.doc.sliceString(n, n + 1) === ">"), t = `${a}>`;
				return {
					range: z.cursor(n + t.length, -1),
					changes: {
						from: n,
						to: e,
						insert: t
					}
				};
			}
		}
		return { range: e };
	});
	return !s.changes.empty && (e.dispatch([a, o.update(s, {
		userEvent: "input.complete",
		scrollIntoView: !0
	})]), !0);
}), V6 = Ag({
	String: Y.string,
	Number: Y.number,
	"True False": Y.bool,
	PropertyName: Y.propertyName,
	Null: Y.null,
	", :": Y.separator,
	"[ ]": Y.squareBracket,
	"{ }": Y.brace
}), H6 = vy.deserialize({
	version: 14,
	states: "$bOVQPOOOOQO'#Cb'#CbOnQPO'#CeOvQPO'#ClOOQO'#Cr'#CrQOQPOOOOQO'#Cg'#CgO}QPO'#CfO!SQPO'#CtOOQO,59P,59PO![QPO,59PO!aQPO'#CuOOQO,59W,59WO!iQPO,59WOVQPO,59QOqQPO'#CmO!nQPO,59`OOQO1G.k1G.kOVQPO'#CnO!vQPO,59aOOQO1G.r1G.rOOQO1G.l1G.lOOQO,59X,59XOOQO-E6k-E6kOOQO,59Y,59YOOQO-E6l-E6l",
	stateData: "#O~OeOS~OQSORSOSSOTSOWQO_ROgPO~OVXOgUO~O^[O~PVO[^O~O]_OVhX~OVaO~O]bO^iX~O^dO~O]_OVha~O]bO^ia~O",
	goto: "!kjPPPPPPkPPkqwPPPPk{!RPPP!XP!e!hXSOR^bQWQRf_TVQ_Q`WRg`QcZRicQTOQZRQe^RhbRYQR]R",
	nodeNames: "⚠ JsonText True False Null Number String } { Object Property PropertyName : , ] [ Array",
	maxTerm: 25,
	nodeProps: [
		[
			"isolate",
			-2,
			6,
			11,
			""
		],
		[
			"openedBy",
			7,
			"{",
			14,
			"["
		],
		[
			"closedBy",
			8,
			"}",
			15,
			"]"
		]
	],
	propSources: [V6],
	skippedNodes: [0],
	repeatNodeCount: 2,
	tokenData: "(|~RaXY!WYZ!W]^!Wpq!Wrs!]|}$u}!O$z!Q!R%T!R![&c![!]&t!}#O&y#P#Q'O#Y#Z'T#b#c'r#h#i(Z#o#p(r#q#r(w~!]Oe~~!`Wpq!]qr!]rs!xs#O!]#O#P!}#P;'S!];'S;=`$o<%lO!]~!}Og~~#QXrs!]!P!Q!]#O#P!]#U#V!]#Y#Z!]#b#c!]#f#g!]#h#i!]#i#j#m~#pR!Q![#y!c!i#y#T#Z#y~#|R!Q![$V!c!i$V#T#Z$V~$YR!Q![$c!c!i$c#T#Z$c~$fR!Q![!]!c!i!]#T#Z!]~$rP;=`<%l!]~$zO]~~$}Q!Q!R%T!R![&c~%YRT~!O!P%c!g!h%w#X#Y%w~%fP!Q![%i~%nRT~!Q![%i!g!h%w#X#Y%w~%zR{|&T}!O&T!Q![&Z~&WP!Q![&Z~&`PT~!Q![&Z~&hST~!O!P%c!Q![&c!g!h%w#X#Y%w~&yO[~~'OO_~~'TO^~~'WP#T#U'Z~'^P#`#a'a~'dP#g#h'g~'jP#X#Y'm~'rOR~~'uP#i#j'x~'{P#`#a(O~(RP#`#a(U~(ZOS~~(^P#f#g(a~(dP#i#j(g~(jP#X#Y(m~(rOQ~~(wOW~~(|OV~",
	tokenizers: [0],
	topRules: { JsonText: [0, 1] },
	tokenPrec: 0
}), U6 = /*@__PURE__*/ a_.define({
	name: "json",
	parser: /*@__PURE__*/ H6.configure({ props: [/*@__PURE__*/ w_.add({
		Object: /*@__PURE__*/ I_({ except: /^\s*\}/ }),
		Array: /*@__PURE__*/ I_({ except: /^\s*\]/ })
	}), /*@__PURE__*/ R_.add({ "Object Array": z_ })] }),
	languageData: {
		closeBrackets: { brackets: [
			"[",
			"{",
			"\""
		] },
		indentOnInput: /^\s*[\}\]]$/
	}
});
function W6() {
	return new g_(U6);
}
// node_modules/@lezer/markdown/dist/index.js
var G6 = class e {
	static create(t, n, r, i, a) {
		let o = i + (i << 8) + t + (n << 4) | 0;
		return new e(t, n, r, o, a, [], []);
	}
	constructor(e, t, n, r, i, a, o) {
		this.type = e, this.value = t, this.from = n, this.hash = r, this.end = i, this.children = a, this.positions = o, this.blankFirstLine = !1, this.hashProp = [[G.contextHash, r]];
	}
	addChild(e, t) {
		e.prop(G.contextHash) != this.hash && (e = new q(e.type, e.children, e.positions, e.length, this.hashProp)), this.children.push(e), this.positions.push(t);
	}
	toTree(e, t = this.end) {
		let n = this.children.length - 1;
		return n >= 0 && (t = Math.max(t, this.positions[n] + this.children[n].length + this.from)), new q(e.types[this.type], this.children, this.positions, t - this.from).balance({ makeTree: (e, t, n) => new q(Fh.none, e, t, n, this.hashProp) });
	}
}, Z;
(function(e) {
	e[e.Document = 1] = "Document", e[e.CodeBlock = 2] = "CodeBlock", e[e.FencedCode = 3] = "FencedCode", e[e.Blockquote = 4] = "Blockquote", e[e.HorizontalRule = 5] = "HorizontalRule", e[e.BulletList = 6] = "BulletList", e[e.OrderedList = 7] = "OrderedList", e[e.ListItem = 8] = "ListItem", e[e.ATXHeading1 = 9] = "ATXHeading1", e[e.ATXHeading2 = 10] = "ATXHeading2", e[e.ATXHeading3 = 11] = "ATXHeading3", e[e.ATXHeading4 = 12] = "ATXHeading4", e[e.ATXHeading5 = 13] = "ATXHeading5", e[e.ATXHeading6 = 14] = "ATXHeading6", e[e.SetextHeading1 = 15] = "SetextHeading1", e[e.SetextHeading2 = 16] = "SetextHeading2", e[e.HTMLBlock = 17] = "HTMLBlock", e[e.LinkReference = 18] = "LinkReference", e[e.Paragraph = 19] = "Paragraph", e[e.CommentBlock = 20] = "CommentBlock", e[e.ProcessingInstructionBlock = 21] = "ProcessingInstructionBlock", e[e.Escape = 22] = "Escape", e[e.Entity = 23] = "Entity", e[e.HardBreak = 24] = "HardBreak", e[e.Emphasis = 25] = "Emphasis", e[e.StrongEmphasis = 26] = "StrongEmphasis", e[e.Link = 27] = "Link", e[e.Image = 28] = "Image", e[e.InlineCode = 29] = "InlineCode", e[e.HTMLTag = 30] = "HTMLTag", e[e.Comment = 31] = "Comment", e[e.ProcessingInstruction = 32] = "ProcessingInstruction", e[e.Autolink = 33] = "Autolink", e[e.HeaderMark = 34] = "HeaderMark", e[e.QuoteMark = 35] = "QuoteMark", e[e.ListMark = 36] = "ListMark", e[e.LinkMark = 37] = "LinkMark", e[e.EmphasisMark = 38] = "EmphasisMark", e[e.CodeMark = 39] = "CodeMark", e[e.CodeText = 40] = "CodeText", e[e.CodeInfo = 41] = "CodeInfo", e[e.LinkTitle = 42] = "LinkTitle", e[e.LinkLabel = 43] = "LinkLabel", e[e.URL = 44] = "URL";
})(Z ||= {});
var K6 = class {
	constructor(e, t) {
		this.start = e, this.content = t, this.marks = [], this.parsers = [];
	}
}, q6 = class {
	constructor() {
		this.text = "", this.baseIndent = 0, this.basePos = 0, this.depth = 0, this.markers = [], this.pos = 0, this.indent = 0, this.next = -1;
	}
	forward() {
		this.basePos > this.pos && this.forwardInner();
	}
	forwardInner() {
		let e = this.skipSpace(this.basePos);
		this.indent = this.countIndent(e, this.pos, this.indent), this.pos = e, this.next = e == this.text.length ? -1 : this.text.charCodeAt(e);
	}
	skipSpace(e) {
		return Z6(this.text, e);
	}
	reset(e) {
		for (this.text = e, this.baseIndent = this.basePos = this.pos = this.indent = 0, this.forwardInner(), this.depth = 1; this.markers.length;) this.markers.pop();
	}
	moveBase(e) {
		this.basePos = e, this.baseIndent = this.countIndent(e, this.pos, this.indent);
	}
	moveBaseColumn(e) {
		this.baseIndent = e, this.basePos = this.findColumn(e);
	}
	addMarker(e) {
		this.markers.push(e);
	}
	countIndent(e, t = 0, n = 0) {
		for (let r = t; r < e; r++) n += this.text.charCodeAt(r) == 9 ? 4 - n % 4 : 1;
		return n;
	}
	findColumn(e) {
		let t = 0;
		for (let n = 0; t < this.text.length && n < e; t++) n += this.text.charCodeAt(t) == 9 ? 4 - n % 4 : 1;
		return t;
	}
	scrub() {
		if (!this.baseIndent) return this.text;
		let e = "";
		for (let t = 0; t < this.basePos; t++) e += " ";
		return e + this.text.slice(this.basePos);
	}
};
function J6(e, t, n) {
	if (n.pos == n.text.length || e != t.block && n.indent >= t.stack[n.depth + 1].value + n.baseIndent) return !0;
	if (n.indent >= n.baseIndent + 4) return !1;
	let r = (e.type == Z.OrderedList ? ib : rb)(n, t, !1);
	return r > 0 && (e.type != Z.BulletList || tb(n, t, !1) < 0) && n.text.charCodeAt(n.pos + r - 1) == e.value;
}
var Y6 = {
	[Z.Blockquote](e, t, n) {
		return n.next == 62 && (n.markers.push(Q(Z.QuoteMark, t.lineStart + n.pos, t.lineStart + n.pos + 1)), n.moveBase(n.pos + (X6(n.text.charCodeAt(n.pos + 1)) ? 2 : 1)), e.end = t.lineStart + n.text.length, !0);
	},
	[Z.ListItem](e, t, n) {
		return !(n.next < 0 ? e.blankFirstLine && e.children.length == 1 : n.indent < n.baseIndent + e.value) && (n.moveBaseColumn(n.baseIndent + e.value), !0);
	},
	[Z.OrderedList]: J6,
	[Z.BulletList]: J6,
	[Z.Document]() {
		return !0;
	}
};
function X6(e) {
	return e == 32 || e == 9 || e == 10 || e == 13;
}
function Z6(e, t = 0) {
	for (; t < e.length && X6(e.charCodeAt(t));) t++;
	return t;
}
function Q6(e, t, n) {
	for (; t > n && X6(e.charCodeAt(t - 1));) t--;
	return t;
}
function $6(e) {
	if (e.next != 96 && e.next != 126) return -1;
	let t = e.pos + 1;
	for (; t < e.text.length && e.text.charCodeAt(t) == e.next;) t++;
	if (t < e.pos + 3) return -1;
	if (e.next == 96) {
		for (let n = t; n < e.text.length; n++) if (e.text.charCodeAt(n) == 96) return -1;
	}
	return t;
}
function eb(e) {
	return e.next == 62 ? e.text.charCodeAt(e.pos + 1) == 32 ? 2 : 1 : -1;
}
function tb(e, t, n) {
	if (e.next != 42 && e.next != 45 && e.next != 95) return -1;
	let r = 1;
	for (let t = e.pos + 1; t < e.text.length; t++) {
		let n = e.text.charCodeAt(t);
		if (n == e.next) r++;
		else if (!X6(n)) return -1;
	}
	return n && e.next == 45 && ob(e) > -1 && e.depth == t.stack.length && t.parser.leafBlockParsers.indexOf(vb.SetextHeading) > -1 || r < 3 ? -1 : 1;
}
function nb(e, t) {
	for (let n = e.stack.length - 1; n >= 0; n--) if (e.stack[n].type == t) return !0;
	return !1;
}
function rb(e, t, n) {
	return (e.next == 45 || e.next == 43 || e.next == 42) && (e.pos == e.text.length - 1 || X6(e.text.charCodeAt(e.pos + 1))) && (!n || nb(t, Z.BulletList) || e.skipSpace(e.pos + 2) < e.text.length) ? 1 : -1;
}
function ib(e, t, n) {
	let r = e.pos, i = e.next;
	for (; i >= 48 && i <= 57;) {
		if (r++, r == e.text.length) return -1;
		i = e.text.charCodeAt(r);
	}
	return r == e.pos || r > e.pos + 9 || i != 46 && i != 41 || r < e.text.length - 1 && !X6(e.text.charCodeAt(r + 1)) || n && !nb(t, Z.OrderedList) && (e.skipSpace(r + 1) == e.text.length || r > e.pos + 1 || e.next != 49) ? -1 : r + 1 - e.pos;
}
function ab(e) {
	if (e.next != 35) return -1;
	let t = e.pos + 1;
	for (; t < e.text.length && e.text.charCodeAt(t) == 35;) t++;
	if (t < e.text.length && !X6(e.text.charCodeAt(t))) return -1;
	let n = t - e.pos;
	return n > 6 ? -1 : n;
}
function ob(e) {
	if (e.next != 45 && e.next != 61 || e.indent >= e.baseIndent + 4) return -1;
	let t = e.pos + 1;
	for (; t < e.text.length && e.text.charCodeAt(t) == e.next;) t++;
	let n = t;
	for (; t < e.text.length && X6(e.text.charCodeAt(t));) t++;
	return t == e.text.length ? n : -1;
}
var sb = /^[ \t]*$/, cb = /-->/, lb = /\?>/, ub = [
	[/^<(?:script|pre|style|textarea)(?:\s|>|$)/i, /<\/(?:script|pre|style|textarea)>/i],
	[/^\s*<!--/, cb],
	[/^\s*<\?/, lb],
	[/^\s*<![A-Z]/, />/],
	[/^\s*<!\[CDATA\[/, /\]\]>/],
	[/^\s*<\/?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|\/?>|$)/i, sb],
	[/^\s*(?:<\/[a-z][\w-]*\s*>|<[a-z][\w-]*(\s+[a-z:_][\w-.]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*>)\s*$/i, sb]
];
function db(e, t, n) {
	if (e.next != 60) return -1;
	let r = e.text.slice(e.pos);
	for (let e = 0, t = ub.length - +!!n; e < t; e++) if (ub[e][0].test(r)) return e;
	return -1;
}
function fb(e, t) {
	let n = e.countIndent(t, e.pos, e.indent), r = e.skipSpace(t), i = e.countIndent(r, t, n);
	return i >= n + 5 || r == e.text.length ? n + 1 : i;
}
function pb(e, t, n) {
	let r = e.length - 1;
	r >= 0 && e[r].to == t && e[r].type == Z.CodeText ? e[r].to = n : e.push(Q(Z.CodeText, t, n));
}
var mb = {
	LinkReference: void 0,
	IndentedCode(e, t) {
		let n = t.baseIndent + 4;
		if (t.indent < n) return !1;
		let r = t.findColumn(n), i = e.lineStart + r, a = e.lineStart + t.text.length, o = [], s = [];
		for (pb(o, i, a); e.nextLine() && t.depth >= e.stack.length;) if (t.pos == t.text.length) {
			pb(s, e.lineStart - 1, e.lineStart);
			for (let e of t.markers) s.push(e);
		} else if (t.indent < n) break;
		else {
			if (s.length) {
				for (let e of s) e.type == Z.CodeText ? pb(o, e.from, e.to) : o.push(e);
				s = [];
			}
			pb(o, e.lineStart - 1, e.lineStart);
			for (let e of t.markers) o.push(e);
			a = e.lineStart + t.text.length;
			let n = e.lineStart + t.findColumn(t.baseIndent + 4);
			n < a && pb(o, n, a);
		}
		return s.length && (s = s.filter((e) => e.type != Z.CodeText), s.length && (t.markers = s.concat(t.markers))), e.addNode(e.buffer.writeElements(o, -i).finish(Z.CodeBlock, a - i), i), !0;
	},
	FencedCode(e, t) {
		let n = $6(t);
		if (n < 0) return !1;
		let r = e.lineStart + t.pos, i = t.next, a = n - t.pos, o = t.skipSpace(n), s = Q6(t.text, t.text.length, o), c = [Q(Z.CodeMark, r, r + a)];
		o < s && c.push(Q(Z.CodeInfo, e.lineStart + o, e.lineStart + s));
		for (let n = !0, r = !0, o = !1; e.nextLine() && t.depth >= e.stack.length; n = !1) {
			let s = t.pos;
			if (t.indent - t.baseIndent < 4) for (; s < t.text.length && t.text.charCodeAt(s) == i;) s++;
			if (s - t.pos >= a && t.skipSpace(s) == t.text.length) {
				for (let e of t.markers) c.push(e);
				r && o && pb(c, e.lineStart - 1, e.lineStart), c.push(Q(Z.CodeMark, e.lineStart + t.pos, e.lineStart + s)), e.nextLine();
				break;
			}
			{
				o = !0, n || (pb(c, e.lineStart - 1, e.lineStart), r = !1);
				for (let e of t.markers) c.push(e);
				let i = e.lineStart + t.basePos, a = e.lineStart + t.text.length;
				i < a && (pb(c, i, a), r = !1);
			}
		}
		return e.addNode(e.buffer.writeElements(c, -r).finish(Z.FencedCode, e.prevLineEnd() - r), r), !0;
	},
	Blockquote(e, t) {
		let n = eb(t);
		return n < 0 ? !1 : (e.startContext(Z.Blockquote, t.pos), e.addNode(Z.QuoteMark, e.lineStart + t.pos, e.lineStart + t.pos + 1), t.moveBase(t.pos + n), null);
	},
	HorizontalRule(e, t) {
		if (tb(t, e, !1) < 0) return !1;
		let n = e.lineStart + t.pos;
		return e.nextLine(), e.addNode(Z.HorizontalRule, n), !0;
	},
	BulletList(e, t) {
		let n = rb(t, e, !1);
		if (n < 0) return !1;
		e.block.type != Z.BulletList && e.startContext(Z.BulletList, t.basePos, t.next);
		let r = fb(t, t.pos + 1);
		return e.startContext(Z.ListItem, t.basePos, r - t.baseIndent), e.addNode(Z.ListMark, e.lineStart + t.pos, e.lineStart + t.pos + n), t.moveBaseColumn(r), e.block.blankFirstLine = r >= t.text.length, null;
	},
	OrderedList(e, t) {
		let n = ib(t, e, !1);
		if (n < 0) return !1;
		e.block.type != Z.OrderedList && e.startContext(Z.OrderedList, t.basePos, t.text.charCodeAt(t.pos + n - 1));
		let r = fb(t, t.pos + n);
		return e.startContext(Z.ListItem, t.basePos, r - t.baseIndent), e.addNode(Z.ListMark, e.lineStart + t.pos, e.lineStart + t.pos + n), t.moveBaseColumn(r), e.block.blankFirstLine = r == t.text.length, null;
	},
	ATXHeading(e, t) {
		let n = ab(t);
		if (n < 0) return !1;
		let r = t.pos, i = e.lineStart + r, a = Q6(t.text, t.text.length, r), o = a;
		for (; o > r && t.text.charCodeAt(o - 1) == t.next;) o--;
		o != a && o != r && X6(t.text.charCodeAt(o - 1)) || (o = t.text.length);
		let s = e.buffer.write(Z.HeaderMark, 0, n).writeElements(e.parser.parseInline(t.text.slice(r + n + 1, o), i + n + 1), -i);
		o < t.text.length && s.write(Z.HeaderMark, o - r, a - r);
		let c = s.finish(Z.ATXHeading1 - 1 + n, t.text.length - r);
		return e.nextLine(), e.addNode(c, i), !0;
	},
	HTMLBlock(e, t) {
		let n = db(t, e, !1);
		if (n < 0) return !1;
		let r = e.lineStart + t.pos, i = ub[n][1], a = [], o = i != sb;
		for (; !i.test(t.text) && e.nextLine();) {
			if (t.depth < e.stack.length) {
				o = !1;
				break;
			}
			for (let e of t.markers) a.push(e);
		}
		o && e.nextLine();
		let s = i == cb ? Z.CommentBlock : i == lb ? Z.ProcessingInstructionBlock : Z.HTMLBlock, c = e.prevLineEnd();
		return e.addNode(e.buffer.writeElements(a, -r).finish(s, c - r), r), !0;
	},
	SetextHeading: void 0
}, hb = class {
	constructor(e) {
		this.stage = 0, this.elts = [], this.pos = 0, this.start = e.start, this.advance(e.content);
	}
	nextLine(e, t, n) {
		if (this.stage == -1) return !1;
		let r = n.content + "\n" + t.scrub(), i = this.advance(r);
		return i > -1 && i < r.length && this.complete(e, n, i);
	}
	finish(e, t) {
		return (this.stage == 2 || this.stage == 3) && Z6(t.content, this.pos) == t.content.length && this.complete(e, t, t.content.length);
	}
	complete(e, t, n) {
		return e.addLeafElement(t, Q(Z.LinkReference, this.start, this.start + n, this.elts)), !0;
	}
	nextStage(e) {
		return e ? (this.pos = e.to - this.start, this.elts.push(e), this.stage++, !0) : (e === !1 && (this.stage = -1), !1);
	}
	advance(e) {
		for (;;) if (this.stage == -1) return -1;
		else if (this.stage == 0) {
			if (!this.nextStage(Ub(e, this.pos, this.start, !0))) return -1;
			if (e.charCodeAt(this.pos) != 58) return this.stage = -1;
			this.elts.push(Q(Z.LinkMark, this.pos + this.start, this.pos + this.start + 1)), this.pos++;
		} else if (this.stage == 1) {
			if (!this.nextStage(Vb(e, Z6(e, this.pos), this.start))) return -1;
		} else if (this.stage == 2) {
			let t = Z6(e, this.pos), n = 0;
			if (t > this.pos) {
				let r = Hb(e, t, this.start);
				if (r) {
					let t = gb(e, r.to - this.start);
					t > 0 && (this.nextStage(r), n = t);
				}
			}
			return n ||= gb(e, this.pos), n > 0 && n < e.length ? n : -1;
		} else return gb(e, this.pos);
	}
};
function gb(e, t) {
	for (; t < e.length; t++) {
		let n = e.charCodeAt(t);
		if (n == 10) break;
		if (!X6(n)) return -1;
	}
	return t;
}
var _b = class {
	nextLine(e, t, n) {
		let r = t.depth < e.stack.length ? -1 : ob(t), i = t.next;
		if (r < 0) return !1;
		let a = Q(Z.HeaderMark, e.lineStart + t.pos, e.lineStart + r);
		for (let e of t.markers) n.marks.push(e);
		return e.nextLine(), e.addLeafElement(n, Q(i == 61 ? Z.SetextHeading1 : Z.SetextHeading2, n.start, e.prevLineEnd(), [...e.parser.parseInline(n.content, n.start), a])), !0;
	}
	finish() {
		return !1;
	}
}, vb = {
	LinkReference(e, t) {
		return t.content.charCodeAt(0) == 91 ? new hb(t) : null;
	},
	SetextHeading() {
		return new _b();
	}
}, yb = [
	(e, t) => ab(t) >= 0,
	(e, t) => $6(t) >= 0,
	(e, t) => eb(t) >= 0,
	(e, t) => rb(t, e, !0) >= 0,
	(e, t) => ib(t, e, !0) >= 0,
	(e, t) => tb(t, e, !0) >= 0,
	(e, t) => db(t, e, !0) >= 0
], bb = {
	text: "",
	end: 0
}, xb = class {
	constructor(e, t, n, r) {
		this.parser = e, this.input = t, this.ranges = r, this.line = new q6(), this.atEnd = !1, this.reusePlaceholders = /* @__PURE__ */ new Map(), this.stoppedAt = null, this.rangeI = 0, this.to = r[r.length - 1].to, this.lineStart = this.absoluteLineStart = this.absoluteLineEnd = r[0].from, this.block = G6.create(Z.Document, 0, this.lineStart, 0, 0), this.stack = [this.block], this.fragments = n.length ? new Jb(n, t) : null, this.readLine();
	}
	get parsedPos() {
		return this.absoluteLineStart;
	}
	advance() {
		if (this.stoppedAt != null && this.absoluteLineStart > this.stoppedAt) return this.finish();
		let { line: e } = this;
		for (;;) {
			for (let t = 0;;) {
				let n = e.depth < this.stack.length ? this.stack[this.stack.length - 1] : null;
				for (; t < e.markers.length && (!n || e.markers[t].from < n.end);) {
					let n = e.markers[t++];
					this.addNode(n.type, n.from, n.to);
				}
				if (!n) break;
				this.finishContext();
			}
			if (e.pos < e.text.length) break;
			if (!this.nextLine()) return this.finish();
		}
		if (this.fragments && this.reuseFragment(e.basePos)) return null;
		e: for (;;) {
			for (let t of this.parser.blockParsers) if (t) {
				let n = t(this, e);
				if (n != 0) {
					if (n == 1) return null;
					e.forward();
					continue e;
				}
			}
			break;
		}
		if (e.pos == e.text.length) return this.nextLine() ? null : this.finish();
		let t = new K6(this.lineStart + e.pos, e.text.slice(e.pos));
		for (let e of this.parser.leafBlockParsers) if (e) {
			let n = e(this, t);
			n && t.parsers.push(n);
		}
		e: for (; this.nextLine() && e.pos != e.text.length;) {
			if (e.indent < e.baseIndent + 4) {
				for (let n of this.parser.endLeafBlock) if (n(this, e, t)) break e;
			}
			for (let n of t.parsers) if (n.nextLine(this, e, t)) return null;
			t.content += "\n" + e.scrub();
			for (let n of e.markers) t.marks.push(n);
		}
		return this.finishLeaf(t), null;
	}
	stopAt(e) {
		if (this.stoppedAt != null && this.stoppedAt < e) throw RangeError("Can't move stoppedAt forward");
		this.stoppedAt = e;
	}
	reuseFragment(e) {
		if (!this.fragments.moveTo(this.absoluteLineStart + e, this.absoluteLineStart) || !this.fragments.matches(this.block.hash)) return !1;
		let t = this.fragments.takeNodes(this);
		return t ? (this.absoluteLineStart += t, this.lineStart = Xb(this.absoluteLineStart, this.ranges), this.moveRangeI(), this.absoluteLineStart < this.to ? (this.lineStart++, this.absoluteLineStart++, this.readLine()) : (this.atEnd = !0, this.readLine()), !0) : !1;
	}
	get depth() {
		return this.stack.length;
	}
	parentType(e = this.depth - 1) {
		return this.parser.nodeSet.types[this.stack[e].type];
	}
	nextLine() {
		return this.lineStart += this.line.text.length, this.absoluteLineEnd >= this.to ? (this.absoluteLineStart = this.absoluteLineEnd, this.atEnd = !0, this.readLine(), !1) : (this.lineStart++, this.absoluteLineStart = this.absoluteLineEnd + 1, this.moveRangeI(), this.readLine(), !0);
	}
	peekLine() {
		return this.scanLine(this.absoluteLineEnd + 1).text;
	}
	moveRangeI() {
		for (; this.rangeI < this.ranges.length - 1 && this.absoluteLineStart >= this.ranges[this.rangeI].to;) this.rangeI++, this.absoluteLineStart = Math.max(this.absoluteLineStart, this.ranges[this.rangeI].from);
	}
	scanLine(e) {
		let t = bb;
		if (t.end = e, e >= this.to) t.text = "";
		else if (t.text = this.lineChunkAt(e), t.end += t.text.length, this.ranges.length > 1) {
			let e = this.absoluteLineStart, n = this.rangeI;
			for (; this.ranges[n].to < t.end;) {
				n++;
				let r = this.ranges[n].from, i = this.lineChunkAt(r);
				t.end = r + i.length, t.text = t.text.slice(0, this.ranges[n - 1].to - e) + i, e = t.end - t.text.length;
			}
		}
		return t;
	}
	readLine() {
		let { line: e } = this, { text: t, end: n } = this.scanLine(this.absoluteLineStart);
		for (this.absoluteLineEnd = n, e.reset(t); e.depth < this.stack.length; e.depth++) {
			let t = this.stack[e.depth], n = this.parser.skipContextMarkup[t.type];
			if (!n) throw Error("Unhandled block context " + Z[t.type]);
			let r = this.line.markers.length;
			if (!n(t, this, e)) {
				this.line.markers.length > r && (t.end = this.line.markers[this.line.markers.length - 1].to), e.forward();
				break;
			}
			e.forward();
		}
	}
	lineChunkAt(e) {
		let t = this.input.chunk(e), n;
		if (this.input.lineChunks) n = t == "\n" ? "" : t;
		else {
			let e = t.indexOf("\n");
			n = e < 0 ? t : t.slice(0, e);
		}
		return e + n.length > this.to ? n.slice(0, this.to - e) : n;
	}
	prevLineEnd() {
		return this.atEnd ? this.lineStart : this.lineStart - 1;
	}
	startContext(e, t, n = 0) {
		this.block = G6.create(e, n, this.lineStart + t, this.block.hash, this.lineStart + this.line.text.length), this.stack.push(this.block);
	}
	startComposite(e, t, n = 0) {
		this.startContext(this.parser.getNodeType(e), t, n);
	}
	addNode(e, t, n) {
		typeof e == "number" && (e = new q(this.parser.nodeSet.types[e], Ob, Ob, (n ?? this.prevLineEnd()) - t)), this.block.addChild(e, t - this.block.from);
	}
	addElement(e) {
		this.block.addChild(e.toTree(this.parser.nodeSet), e.from - this.block.from);
	}
	addLeafElement(e, t) {
		this.addNode(this.buffer.writeElements(Gb(t.children, e.marks), -t.from).finish(t.type, t.to - t.from), t.from);
	}
	finishContext() {
		let e = this.stack.pop(), t = this.stack[this.stack.length - 1];
		t.addChild(e.toTree(this.parser.nodeSet), e.from - t.from), this.block = t;
	}
	finish() {
		for (; this.stack.length > 1;) this.finishContext();
		return this.addGaps(this.block.toTree(this.parser.nodeSet, this.lineStart));
	}
	addGaps(e) {
		return this.ranges.length > 1 ? Sb(this.ranges, 0, e.topNode, this.ranges[0].from, this.reusePlaceholders) : e;
	}
	finishLeaf(e) {
		for (let t of e.parsers) if (t.finish(this, e)) return;
		let t = Gb(this.parser.parseInline(e.content, e.start), e.marks);
		this.addNode(this.buffer.writeElements(t, -e.start).finish(Z.Paragraph, e.content.length), e.start);
	}
	elt(e, t, n, r) {
		return typeof e == "string" ? Q(this.parser.getNodeType(e), t, n, r) : new jb(e, t);
	}
	get buffer() {
		return new kb(this.parser.nodeSet);
	}
};
function Sb(e, t, n, r, i) {
	let a = e[t].to, o = [], s = [], c = n.from + r;
	function l(n, i) {
		for (; i ? n >= a : n > a;) {
			let i = e[t + 1].from - a;
			r += i, n += i, t++, a = e[t].to;
		}
	}
	for (let u = n.firstChild; u; u = u.nextSibling) {
		l(u.from + r, !0);
		let n = u.from + r, d, f = i.get(u.tree);
		f ? d = f : u.to + r > a ? (d = Sb(e, t, u, r, i), l(u.to + r, !1)) : d = u.toTree(), o.push(d), s.push(n - c);
	}
	return l(n.to + r, !1), new q(n.type, o, s, n.to + r - c, n.tree ? n.tree.propValues : void 0);
}
var Cb = class e extends og {
	constructor(e, t, n, r, i, a, o, s, c) {
		super(), this.nodeSet = e, this.blockParsers = t, this.leafBlockParsers = n, this.blockNames = r, this.endLeafBlock = i, this.skipContextMarkup = a, this.inlineParsers = o, this.inlineNames = s, this.wrappers = c, this.nodeTypes = Object.create(null);
		for (let t of e.types) this.nodeTypes[t.name] = t.id;
	}
	createParse(e, t, n) {
		let r = new xb(this, e, t, n);
		for (let i of this.wrappers) r = i(r, e, t, n);
		return r;
	}
	configure(t) {
		let n = Tb(t);
		if (!n) return this;
		let { nodeSet: r, skipContextMarkup: i } = this, a = this.blockParsers.slice(), o = this.leafBlockParsers.slice(), s = this.blockNames.slice(), c = this.inlineParsers.slice(), l = this.inlineNames.slice(), u = this.endLeafBlock.slice(), d = this.wrappers;
		if (wb(n.defineNodes)) {
			i = Object.assign({}, i);
			let e = r.types.slice(), t;
			for (let r of n.defineNodes) {
				let { name: n, block: a, composite: o, style: s } = typeof r == "string" ? { name: r } : r;
				if (e.some((e) => e.name == n)) continue;
				o && (i[e.length] = (e, t, n) => o(t, n, e.value));
				let c = e.length, l = o ? ["Block", "BlockContext"] : a ? c >= Z.ATXHeading1 && c <= Z.SetextHeading2 ? [
					"Block",
					"LeafBlock",
					"Heading"
				] : ["Block", "LeafBlock"] : void 0;
				e.push(Fh.define({
					id: c,
					name: n,
					props: l && [[G.group, l]]
				})), s && (t ||= {}, Array.isArray(s) || s instanceof Tg ? t[n] = s : Object.assign(t, s));
			}
			r = new Ih(e), t && (r = r.extend(Ag(t)));
		}
		if (wb(n.props) && (r = r.extend(...n.props)), wb(n.remove)) for (let e of n.remove) {
			let t = this.blockNames.indexOf(e), n = this.inlineNames.indexOf(e);
			t > -1 && (a[t] = o[t] = void 0), n > -1 && (c[n] = void 0);
		}
		if (wb(n.parseBlock)) for (let e of n.parseBlock) {
			let t = s.indexOf(e.name);
			if (t > -1) a[t] = e.parse, o[t] = e.leaf;
			else {
				let t = e.before ? Eb(s, e.before) : e.after ? Eb(s, e.after) + 1 : s.length - 1;
				a.splice(t, 0, e.parse), o.splice(t, 0, e.leaf), s.splice(t, 0, e.name);
			}
			e.endLeaf && u.push(e.endLeaf);
		}
		if (wb(n.parseInline)) for (let e of n.parseInline) {
			let t = l.indexOf(e.name);
			if (t > -1) c[t] = e.parse;
			else {
				let t = e.before ? Eb(l, e.before) : e.after ? Eb(l, e.after) + 1 : l.length - 1;
				c.splice(t, 0, e.parse), l.splice(t, 0, e.name);
			}
		}
		return n.wrap && (d = d.concat(n.wrap)), new e(r, a, o, s, u, i, c, l, d);
	}
	getNodeType(e) {
		let t = this.nodeTypes[e];
		if (t == null) throw RangeError(`Unknown node type '${e}'`);
		return t;
	}
	parseInline(e, t) {
		let n = new Wb(this, e, t);
		e: for (let e = t; e < n.end;) {
			let t = n.char(e);
			for (let r of this.inlineParsers) if (r) {
				let i = r(n, t, e);
				if (i >= 0) {
					e = i;
					continue e;
				}
			}
			e++;
		}
		return n.resolveMarkers(0);
	}
};
function wb(e) {
	return e != null && e.length > 0;
}
function Tb(e) {
	if (!Array.isArray(e)) return e;
	if (e.length == 0) return null;
	let t = Tb(e[0]);
	if (e.length == 1) return t;
	let n = Tb(e.slice(1));
	if (!n || !t) return t || n;
	let r = (e, t) => (e || Ob).concat(t || Ob), i = t.wrap, a = n.wrap;
	return {
		props: r(t.props, n.props),
		defineNodes: r(t.defineNodes, n.defineNodes),
		parseBlock: r(t.parseBlock, n.parseBlock),
		parseInline: r(t.parseInline, n.parseInline),
		remove: r(t.remove, n.remove),
		wrap: i ? a ? (e, t, n, r) => i(a(e, t, n, r), t, n, r) : i : a
	};
}
function Eb(e, t) {
	let n = e.indexOf(t);
	if (n < 0) throw RangeError(`Position specified relative to unknown parser ${t}`);
	return n;
}
var Db = [Fh.none];
for (let e = 1, t; t = Z[e]; e++) Db[e] = Fh.define({
	id: e,
	name: t,
	props: e >= Z.Escape ? [] : [[G.group, e in Y6 ? ["Block", "BlockContext"] : ["Block", "LeafBlock"]]],
	top: t == "Document"
});
var Ob = [], kb = class {
	constructor(e) {
		this.nodeSet = e, this.content = [], this.nodes = [];
	}
	write(e, t, n, r = 0) {
		return this.content.push(e, t, n, 4 + r * 4), this;
	}
	writeElements(e, t = 0) {
		for (let n of e) n.writeTo(this, t);
		return this;
	}
	finish(e, t) {
		return q.build({
			buffer: this.content,
			nodeSet: this.nodeSet,
			reused: this.nodes,
			topID: e,
			length: t
		});
	}
}, Ab = class {
	constructor(e, t, n, r = Ob) {
		this.type = e, this.from = t, this.to = n, this.children = r;
	}
	writeTo(e, t) {
		let n = e.content.length;
		e.writeElements(this.children, t), e.content.push(this.type, this.from + t, this.to + t, e.content.length + 4 - n);
	}
	toTree(e) {
		return new kb(e).writeElements(this.children, -this.from).finish(this.type, this.to - this.from);
	}
}, jb = class {
	constructor(e, t) {
		this.tree = e, this.from = t;
	}
	get to() {
		return this.from + this.tree.length;
	}
	get type() {
		return this.tree.type.id;
	}
	get children() {
		return Ob;
	}
	writeTo(e, t) {
		e.nodes.push(this.tree), e.content.push(e.nodes.length - 1, this.from + t, this.to + t, -1);
	}
	toTree() {
		return this.tree;
	}
};
function Q(e, t, n, r) {
	return new Ab(e, t, n, r);
}
var Mb = {
	resolve: "Emphasis",
	mark: "EmphasisMark"
}, Nb = {
	resolve: "Emphasis",
	mark: "EmphasisMark"
}, Pb = {}, Fb = {}, Ib = class {
	constructor(e, t, n, r, i = n - t) {
		this.type = e, this.from = t, this.to = n, this.side = r, this.size = i;
	}
}, Lb = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~", Rb = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\u2010-\u2027]/;
try {
	Rb = /* @__PURE__ */ RegExp("[\\p{S}|\\p{P}]", "u");
} catch {}
var zb = {
	Escape(e, t, n) {
		if (t != 92 || n == e.end - 1) return -1;
		let r = e.char(n + 1);
		for (let t = 0; t < 32; t++) if (Lb.charCodeAt(t) == r) return e.append(Q(Z.Escape, n, n + 2));
		return -1;
	},
	Entity(e, t, n) {
		if (t != 38) return -1;
		let r = /^(?:#\d+|#x[a-f\d]+|\w+);/i.exec(e.slice(n + 1, n + 31));
		return r ? e.append(Q(Z.Entity, n, n + 1 + r[0].length)) : -1;
	},
	InlineCode(e, t, n) {
		if (t != 96 || n && e.char(n - 1) == 96) return -1;
		let r = n + 1;
		for (; r < e.end && e.char(r) == 96;) r++;
		let i = r - n, a = 0;
		for (; r < e.end; r++) if (e.char(r) == 96) {
			if (a++, a == i && e.char(r + 1) != 96) return e.append(Q(Z.InlineCode, n, r + 1, [Q(Z.CodeMark, n, n + i), Q(Z.CodeMark, r + 1 - i, r + 1)]));
		} else a = 0;
		return -1;
	},
	HTMLTag(e, t, n) {
		if (t != 60 || n == e.end - 1) return -1;
		let r = e.slice(n + 1, e.end), i = /^(?:[a-z][-\w+.]+:[^\s>]+|[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*)>/i.exec(r);
		if (i) return e.append(Q(Z.Autolink, n, n + 1 + i[0].length, [
			Q(Z.LinkMark, n, n + 1),
			Q(Z.URL, n + 1, n + i[0].length),
			Q(Z.LinkMark, n + i[0].length, n + 1 + i[0].length)
		]));
		let a = /^!--(?:-?>|[^]*?-->)/.exec(r);
		if (a) return e.append(Q(Z.Comment, n, n + 1 + a[0].length));
		let o = /^\?[^]*?\?>/.exec(r);
		if (o) return e.append(Q(Z.ProcessingInstruction, n, n + 1 + o[0].length));
		let s = /^(?:![A-Z][^]*?>|!\[CDATA\[[^]*?\]\]>|\/[a-zA-Z][\w-]*\s*>|[a-zA-Z][\w-]*(\s+[a-zA-Z:_][\w-.:]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*\/?>)/.exec(r);
		return s ? e.append(Q(Z.HTMLTag, n, n + 1 + s[0].length)) : -1;
	},
	Emphasis(e, t, n) {
		if (t != 95 && t != 42) return -1;
		let r = n + 1;
		for (; e.char(r) == t;) r++;
		let i = e.slice(n - 1, n), a = e.slice(r, r + 1), o = Rb.test(i), s = Rb.test(a), c = /\s|^$/.test(i), l = /\s|^$/.test(a), u = !l && (!s || c || o), d = !c && (!o || l || s), f = u && (t == 42 || !d || o), p = d && (t == 42 || !u || s);
		return e.append(new Ib(t == 95 ? Mb : Nb, n, r, !!f | (p ? 2 : 0)));
	},
	HardBreak(e, t, n) {
		if (t == 92 && e.char(n + 1) == 10) return e.append(Q(Z.HardBreak, n, n + 2));
		if (t == 32) {
			let t = n + 1;
			for (; e.char(t) == 32;) t++;
			if (e.char(t) == 10 && t >= n + 2) return e.append(Q(Z.HardBreak, n, t + 1));
		}
		return -1;
	},
	Link(e, t, n) {
		return t == 91 ? e.append(new Ib(Pb, n, n + 1, 1)) : -1;
	},
	Image(e, t, n) {
		return t == 33 && e.char(n + 1) == 91 ? e.append(new Ib(Fb, n, n + 2, 1)) : -1;
	},
	LinkEnd(e, t, n) {
		if (t != 93) return -1;
		for (let t = e.parts.length - 1; t >= 0; t--) {
			let r = e.parts[t];
			if (r instanceof Ib && (r.type == Pb || r.type == Fb)) {
				if (!r.side || e.skipSpace(r.to) == n && !/[(\[]/.test(e.slice(n + 1, n + 2))) return e.parts[t] = null, -1;
				let i = e.takeContent(t), a = e.parts[t] = Bb(e, i, r.type == Pb ? Z.Link : Z.Image, r.from, n + 1);
				if (r.type == Pb) for (let n = 0; n < t; n++) {
					let t = e.parts[n];
					t instanceof Ib && t.type == Pb && (t.side = 0);
				}
				return a.to;
			}
		}
		return -1;
	}
};
function Bb(e, t, n, r, i) {
	let { text: a } = e, o = e.char(i), s = i;
	if (t.unshift(Q(Z.LinkMark, r, r + (n == Z.Image ? 2 : 1))), t.push(Q(Z.LinkMark, i - 1, i)), o == 40) {
		let n = e.skipSpace(i + 1), r = Vb(a, n - e.offset, e.offset), o;
		r && (n = e.skipSpace(r.to), n != r.to && (o = Hb(a, n - e.offset, e.offset), o && (n = e.skipSpace(o.to)))), e.char(n) == 41 && (t.push(Q(Z.LinkMark, i, i + 1)), s = n + 1, r && t.push(r), o && t.push(o), t.push(Q(Z.LinkMark, n, s)));
	} else if (o == 91) {
		let n = Ub(a, i - e.offset, e.offset, !1);
		n && (t.push(n), s = n.to);
	}
	return Q(n, r, s, t);
}
function Vb(e, t, n) {
	if (e.charCodeAt(t) == 60) {
		for (let r = t + 1, i = !1; r < e.length; r++) {
			let a = e.charCodeAt(r);
			if (a == 62 && !i) return Q(Z.URL, t + n, r + 1 + n);
			if (a == 60 && !i || a == 10) return !1;
			i = a == 92;
		}
		return null;
	}
	{
		let r = 0, i = t;
		for (let t = !1; i < e.length; i++) {
			let n = e.charCodeAt(i);
			if (X6(n)) break;
			if (t) t = !1;
			else if (n == 40) r++;
			else if (n == 41) {
				if (!r) break;
				r--;
			} else n == 92 && (t = !0);
		}
		return i > t ? Q(Z.URL, t + n, i + n) : i == e.length && null;
	}
}
function Hb(e, t, n) {
	let r = e.charCodeAt(t);
	if (r != 39 && r != 34 && r != 40) return !1;
	let i = r == 40 ? 41 : r;
	for (let r = t + 1, a = !1; r < e.length; r++) {
		let o = e.charCodeAt(r);
		if (a) a = !1;
		else if (o == i) return Q(Z.LinkTitle, t + n, r + 1 + n);
		else o == 92 && (a = !0);
	}
	return null;
}
function Ub(e, t, n, r) {
	for (let i = !1, a = t + 1, o = Math.min(e.length, a + 1e3); a < o; a++) {
		let o = e.charCodeAt(a);
		if (i) i = !1;
		else if (o == 93) return !r && Q(Z.LinkLabel, t + n, a + 1 + n);
		else {
			if (r && !X6(o) && (r = !1), o == 91) return !1;
			o == 92 && (i = !0);
		}
	}
	return null;
}
var Wb = class {
	constructor(e, t, n) {
		this.parser = e, this.text = t, this.offset = n, this.parts = [];
	}
	char(e) {
		return e >= this.end ? -1 : this.text.charCodeAt(e - this.offset);
	}
	get end() {
		return this.offset + this.text.length;
	}
	slice(e, t) {
		return this.text.slice(e - this.offset, t - this.offset);
	}
	append(e) {
		return this.parts.push(e), e.to;
	}
	addDelimiter(e, t, n, r, i) {
		return this.append(new Ib(e, t, n, !!r | (i ? 2 : 0)));
	}
	get hasOpenLink() {
		for (let e = this.parts.length - 1; e >= 0; e--) {
			let t = this.parts[e];
			if (t instanceof Ib && (t.type == Pb || t.type == Fb)) return !0;
		}
		return !1;
	}
	addElement(e) {
		return this.append(e);
	}
	resolveMarkers(e) {
		for (let t = e; t < this.parts.length; t++) {
			let n = this.parts[t];
			if (!(n instanceof Ib && n.type.resolve && n.side & 2)) continue;
			let r = n.type == Mb || n.type == Nb, i = n.to - n.from, a, o = t - 1;
			for (; o >= e; o--) {
				let e = this.parts[o];
				if (e instanceof Ib && e.side & 1 && e.type == n.type && !(r && (n.side & 1 || e.side & 2) && (e.size + n.size) % 3 == 0 && (e.size % 3 || n.size % 3))) {
					a = e;
					break;
				}
			}
			if (!a) continue;
			let s = n.type.resolve, c = [], l = a.from, u = n.to;
			if (r) {
				let e = Math.min(2, a.to - a.from, i);
				l = a.to - e, u = n.from + e, s = e == 1 ? "Emphasis" : "StrongEmphasis";
			}
			a.type.mark && c.push(this.elt(a.type.mark, l, a.to));
			for (let e = o + 1; e < t; e++) this.parts[e] instanceof Ab && c.push(this.parts[e]), this.parts[e] = null;
			n.type.mark && c.push(this.elt(n.type.mark, n.from, u));
			let d = this.elt(s, l, u, c);
			this.parts[o] = r && a.from != l ? new Ib(a.type, a.from, l, a.side, a.size) : null, (this.parts[t] = r && n.to != u ? new Ib(n.type, u, n.to, n.side, n.size) : null) ? this.parts.splice(t, 0, d) : this.parts[t] = d;
		}
		let t = [];
		for (let n = e; n < this.parts.length; n++) {
			let e = this.parts[n];
			e instanceof Ab && t.push(e);
		}
		return t;
	}
	findOpeningDelimiter(e) {
		for (let t = this.parts.length - 1; t >= 0; t--) {
			let n = this.parts[t];
			if (n instanceof Ib && n.type == e && n.side & 1) return t;
		}
		return null;
	}
	takeContent(e) {
		let t = this.resolveMarkers(e);
		return this.parts.length = e, t;
	}
	getDelimiterAt(e) {
		let t = this.parts[e];
		return t instanceof Ib ? t : null;
	}
	skipSpace(e) {
		return Z6(this.text, e - this.offset) + this.offset;
	}
	elt(e, t, n, r) {
		return typeof e == "string" ? Q(this.parser.getNodeType(e), t, n, r) : new jb(e, t);
	}
};
Wb.linkStart = Pb, Wb.imageStart = Fb, Wb.emphasisAsterisk = Nb, Wb.emphasisUnderscore = Mb;
function Gb(e, t) {
	if (!t.length) return e;
	if (!e.length) return t;
	let n = e.slice(), r = 0;
	for (let e of t) {
		for (; r < n.length && n[r].to < e.to;) r++;
		if (r < n.length && n[r].from < e.from) {
			let t = n[r];
			t instanceof Ab && (n[r] = new Ab(t.type, t.from, t.to, Gb(t.children, [e])));
		} else n.splice(r++, 0, e);
	}
	return n;
}
function Kb(e, t, n) {
	for (let r = t, i = !1; r > e;) {
		let t = Math.max(e, r - 256), a = n.read(t, r);
		for (let e = a.length - 1; e >= 0; e--) {
			let n = a.charCodeAt(e);
			if (n == 10) {
				if (i) return t + e;
				i = !0;
			} else !X6(n) && n != 62 && (i = !1);
		}
		r = t;
	}
	return e;
}
var qb = [
	Z.CodeBlock,
	Z.ListItem,
	Z.OrderedList,
	Z.BulletList
], Jb = class {
	constructor(e, t) {
		this.fragments = e, this.input = t, this.i = 0, this.fragment = null, this.fragmentEnd = -1, this.cursor = null, e.length && (this.fragment = e[this.i++]);
	}
	nextFragment() {
		this.fragment = this.i < this.fragments.length ? this.fragments[this.i++] : null, this.cursor = null, this.fragmentEnd = -1;
	}
	moveTo(e, t) {
		for (; this.fragment && this.fragment.to <= e;) this.nextFragment();
		if (!this.fragment || this.fragment.from > (e ? e - 1 : 0)) return !1;
		this.fragmentEnd < 0 && (this.fragmentEnd = this.fragment.openEnd ? Kb(this.fragment.from, this.fragment.to, this.input) : this.fragment.to);
		let n = this.cursor;
		n || (n = this.cursor = this.fragment.tree.cursor(K.IncludeAnonymous | K.IgnoreMounts), n.firstChild());
		let r = e + this.fragment.offset;
		for (; n.to <= r;) if (!n.parent()) return !1;
		for (;;) {
			if (n.from >= r) return this.fragment.from <= t;
			if (!n.childAfter(r)) return !1;
		}
	}
	matches(e) {
		let t = this.cursor.tree;
		for (; t && t.type.isAnonymous && t.children[0] instanceof q;) t = t.children[0];
		return t && t.prop(G.contextHash) == e;
	}
	takeNodes(e) {
		let t = this.cursor, n = this.fragment.offset, r = this.fragmentEnd - +!!this.fragment.openEnd, i = e.absoluteLineStart, a = i, o = e.block.children.length, s = e.lineStart - e.block.from >> 2, c = a, l = o;
		e: for (;;) {
			if (t.to - n > Math.min(r, e.to) || t.type.isAnonymous && t.tree && (t.to - t.from > s || !Yb(t.tree))) {
				if (t.type.isAnonymous && t.firstChild()) continue;
				break;
			}
			let i = Xb(t.from - n, e.ranges);
			if (t.to - n <= e.ranges[e.rangeI].to) e.addNode(t.tree, i);
			else {
				let n = new q(e.parser.nodeSet.types[Z.Paragraph], [], [], 0, e.block.hashProp);
				e.reusePlaceholders.set(n, t.tree), e.addNode(n, i);
			}
			for ((t.type.isAnonymous || t.type.is("Block")) && (t.type.isAnonymous || qb.indexOf(t.type.id) < 0 ? (a = c = t.to - n, o = l = e.block.children.length) : (a = c, o = l, t.type.id == Z.ListItem && (c = t.to - n, l = e.block.children.length)));;) {
				if (t.nextSibling()) continue e;
				if (!t.parent() || !t.type.isAnonymous) break e;
			}
		}
		for (; e.block.children.length > o;) e.block.children.pop(), e.block.positions.pop();
		return a - i;
	}
};
function Yb(e) {
	for (; e.type.isAnonymous;) {
		let t = e.children[e.children.length - 1];
		if (t instanceof q) e = t;
		else return !1;
	}
	return e.type.is("Block") && qb.indexOf(e.type.id) < 0;
}
function Xb(e, t) {
	let n = e;
	for (let r = 1; r < t.length; r++) {
		let i = t[r - 1].to, a = t[r].from;
		i < e && (n -= a - i);
	}
	return n;
}
var Zb = Ag({
	"Blockquote/...": Y.quote,
	HorizontalRule: Y.contentSeparator,
	"ATXHeading1/... SetextHeading1/...": Y.heading1,
	"ATXHeading2/... SetextHeading2/...": Y.heading2,
	"ATXHeading3/...": Y.heading3,
	"ATXHeading4/...": Y.heading4,
	"ATXHeading5/...": Y.heading5,
	"ATXHeading6/...": Y.heading6,
	"Comment CommentBlock": Y.comment,
	Escape: Y.escape,
	Entity: Y.character,
	"Emphasis/...": Y.emphasis,
	"StrongEmphasis/...": Y.strong,
	"Link/... Image/...": Y.link,
	"OrderedList/... BulletList/...": Y.list,
	"BlockQuote/...": Y.quote,
	"InlineCode CodeText": Y.monospace,
	"URL Autolink": Y.url,
	"HeaderMark HardBreak QuoteMark ListMark LinkMark EmphasisMark CodeMark": Y.processingInstruction,
	"CodeInfo LinkLabel": Y.labelName,
	LinkTitle: Y.string,
	Paragraph: Y.content
}), Qb = new Cb(new Ih(Db).extend(Zb), Object.keys(mb).map((e) => mb[e]), Object.keys(mb).map((e) => vb[e]), Object.keys(mb), yb, Y6, Object.keys(zb).map((e) => zb[e]), Object.keys(zb), []);
function $b(e, t, n) {
	let r = [];
	for (let i = e.firstChild, a = t;; i = i.nextSibling) {
		let e = i ? i.from : n;
		if (e > a && r.push({
			from: a,
			to: e
		}), !i) break;
		a = i.to;
	}
	return r;
}
function e8(e) {
	let { codeParser: t, htmlParser: n } = e;
	return { wrap: cg((e, r) => {
		let i = e.type.id;
		if (t && (i == Z.CodeBlock || i == Z.FencedCode)) {
			let n = "";
			if (i == Z.FencedCode) {
				let t = e.node.getChild(Z.CodeInfo);
				t && (n = r.read(t.from, t.to));
			}
			let a = t(n);
			if (a) return {
				parser: a,
				overlay: (e) => e.type.id == Z.CodeText,
				bracketed: i == Z.FencedCode
			};
		} else if (n && (i == Z.HTMLBlock || i == Z.HTMLTag || i == Z.CommentBlock)) return {
			parser: n,
			overlay: $b(e.node, e.from, e.to)
		};
		return null;
	}) };
}
var t8 = {
	resolve: "Strikethrough",
	mark: "StrikethroughMark"
}, n8 = {
	defineNodes: [{
		name: "Strikethrough",
		style: { "Strikethrough/...": Y.strikethrough }
	}, {
		name: "StrikethroughMark",
		style: Y.processingInstruction
	}],
	parseInline: [{
		name: "Strikethrough",
		parse(e, t, n) {
			if (t != 126 || e.char(n + 1) != 126 || e.char(n + 2) == 126) return -1;
			let r = e.slice(n - 1, n), i = e.slice(n + 2, n + 3), a = /\s|^$/.test(r), o = /\s|^$/.test(i), s = Rb.test(r), c = Rb.test(i);
			return e.addDelimiter(t8, n, n + 2, !o && (!c || a || s), !a && (!s || o || c));
		},
		after: "Emphasis"
	}]
};
function r8(e, t, n = 0, r, i = 0) {
	let a = 0, o = !0, s = -1, c = -1, l = !1, u = () => {
		r.push(e.elt("TableCell", i + s, i + c, e.parser.parseInline(t.slice(s, c), i + s)));
	};
	for (let d = n; d < t.length; d++) {
		let n = t.charCodeAt(d);
		n == 124 && !l ? ((!o || s > -1) && a++, o = !1, r && (s > -1 && u(), r.push(e.elt("TableDelimiter", d + i, d + i + 1))), s = c = -1) : (l || n != 32 && n != 9) && (s < 0 && (s = d), c = d + 1), l = !l && n == 92;
	}
	return s > -1 && (a++, r && u()), a;
}
function i8(e, t) {
	for (let n = t; n < e.length; n++) {
		let t = e.charCodeAt(n);
		if (t == 124) return !0;
		t == 92 && n++;
	}
	return !1;
}
var a8 = /^[>\s]*\|?(\s*:?-+:?\s*\|)+(\s*:?-+:?\s*)?$/, o8 = class {
	constructor() {
		this.rows = null;
	}
	nextLine(e, t, n) {
		if (this.rows == null) {
			this.rows = !1;
			let r;
			if ((t.next == 45 || t.next == 58 || t.next == 124) && a8.test(r = t.text.slice(t.pos))) {
				let i = [];
				r8(e, n.content, 0, i, n.start) == r8(e, r, 0) && (this.rows = [e.elt("TableHeader", n.start, n.start + n.content.length, i), e.elt("TableDelimiter", e.lineStart + t.pos, e.lineStart + t.text.length)]);
			}
		} else if (this.rows) {
			let n = [];
			r8(e, t.text, t.pos, n, e.lineStart), this.rows.push(e.elt("TableRow", e.lineStart + t.pos, e.lineStart + t.text.length, n));
		}
		return !1;
	}
	finish(e, t) {
		return this.rows ? (e.addLeafElement(t, e.elt("Table", t.start, t.start + t.content.length, this.rows)), !0) : !1;
	}
}, s8 = {
	defineNodes: [
		{
			name: "Table",
			block: !0
		},
		{
			name: "TableHeader",
			style: { "TableHeader/...": Y.heading }
		},
		"TableRow",
		{
			name: "TableCell",
			style: Y.content
		},
		{
			name: "TableDelimiter",
			style: Y.processingInstruction
		}
	],
	parseBlock: [{
		name: "Table",
		leaf(e, t) {
			return i8(t.content, 0) ? new o8() : null;
		},
		endLeaf(e, t, n) {
			if (n.parsers.some((e) => e instanceof o8) || !i8(t.text, t.basePos)) return !1;
			let r = e.peekLine();
			return a8.test(r) && r8(e, t.text, t.basePos) == r8(e, r, t.basePos);
		},
		before: "SetextHeading"
	}]
}, c8 = class {
	nextLine() {
		return !1;
	}
	finish(e, t) {
		return e.addLeafElement(t, e.elt("Task", t.start, t.start + t.content.length, [e.elt("TaskMarker", t.start, t.start + 3), ...e.parser.parseInline(t.content.slice(3), t.start + 3)])), !0;
	}
}, l8 = {
	defineNodes: [{
		name: "Task",
		block: !0,
		style: Y.list
	}, {
		name: "TaskMarker",
		style: Y.atom
	}],
	parseBlock: [{
		name: "TaskList",
		leaf(e, t) {
			return /^\[[ xX]\][ \t]/.test(t.content) && e.parentType().name == "ListItem" ? new c8() : null;
		},
		after: "SetextHeading"
	}]
}, u8 = /(www\.)|(https?:\/\/)|([\w.+-]{1,100}@)|(mailto:|xmpp:)/gy, d8 = /[\w-]+(\.[\w-]+)+(:\d+)?(\/[^\s<]*)?/gy, f8 = /[\w-]+\.[\w-]+($|[/:])/, p8 = /[\w.+-]+@[\w-]+(\.[\w.-]+)+/gy, m8 = /\/[a-zA-Z\d@.]+/gy;
function h8(e, t, n, r) {
	let i = 0;
	for (let a = t; a < n; a++) e[a] == r && i++;
	return i;
}
function g8(e, t) {
	d8.lastIndex = t;
	let n = d8.exec(e);
	if (!n || f8.exec(n[0])[0].indexOf("_") > -1) return -1;
	let r = t + n[0].length;
	for (;;) {
		let n = e[r - 1], i;
		if (/[?!.,:*_~]/.test(n) || n == ")" && h8(e, t, r, ")") > h8(e, t, r, "(")) r--;
		else if (n == ";" && (i = /&(?:#\d+|#x[a-f\d]+|\w+);$/.exec(e.slice(t, r)))) r = t + i.index;
		else break;
	}
	return r;
}
function _8(e, t) {
	p8.lastIndex = t;
	let n = p8.exec(e);
	if (!n) return -1;
	let r = n[0][n[0].length - 1];
	return r == "_" || r == "-" ? -1 : t + n[0].length - +(r == ".");
}
var v8 = [
	s8,
	l8,
	n8,
	{ parseInline: [{
		name: "Autolink",
		parse(e, t, n) {
			let r = n - e.offset;
			if (r && /\w/.test(e.text[r - 1])) return -1;
			u8.lastIndex = r;
			let i = u8.exec(e.text), a = -1;
			return !i || (i[1] || i[2] ? (a = g8(e.text, r + i[0].length), a > -1 && e.hasOpenLink && (a = r + /([^\[\]]|\[[^\]]*\])*/.exec(e.text.slice(r, a))[0].length)) : i[3] ? a = _8(e.text, r) : (a = _8(e.text, r + i[0].length), a > -1 && i[0] == "xmpp:" && (m8.lastIndex = a, i = m8.exec(e.text), i && (a = i.index + i[0].length))), a < 0) ? -1 : (e.addElement(e.elt("URL", n, a + e.offset)), a + e.offset);
		}
	}] }
];
function y8(e, t, n) {
	return (r, i, a) => {
		if (i != e || r.char(a + 1) == e) return -1;
		let o = [r.elt(n, a, a + 1)];
		for (let i = a + 1; i < r.end; i++) {
			let s = r.char(i);
			if (s == e) return r.addElement(r.elt(t, a, i + 1, o.concat(r.elt(n, i, i + 1))));
			if (s == 92 && o.push(r.elt("Escape", i, i++ + 2)), X6(s)) break;
		}
		return -1;
	};
}
var b8 = {
	defineNodes: [{
		name: "Superscript",
		style: Y.special(Y.content)
	}, {
		name: "SuperscriptMark",
		style: Y.processingInstruction
	}],
	parseInline: [{
		name: "Superscript",
		parse: y8(94, "Superscript", "SuperscriptMark")
	}]
}, x8 = {
	defineNodes: [{
		name: "Subscript",
		style: Y.special(Y.content)
	}, {
		name: "SubscriptMark",
		style: Y.processingInstruction
	}],
	parseInline: [{
		name: "Subscript",
		parse: y8(126, "Subscript", "SubscriptMark")
	}]
}, S8 = {
	defineNodes: [{
		name: "Emoji",
		style: Y.character
	}],
	parseInline: [{
		name: "Emoji",
		parse(e, t, n) {
			let r;
			return t != 58 || !(r = /^[a-zA-Z_0-9]+:/.exec(e.slice(n + 1, e.end))) ? -1 : e.addElement(e.elt("Emoji", n, n + 1 + r[0].length));
		}
	}]
}, C8 = /*@__PURE__*/ t_({ commentTokens: { block: {
	open: "<!--",
	close: "-->"
} } }), w8 = /*@__PURE__*/ new G(), T8 = /*@__PURE__*/ Qb.configure({ props: [
	/*@__PURE__*/ R_.add((e) => !e.is("Block") || e.is("Document") || E8(e) != null || D8(e) ? void 0 : (e, t) => ({
		from: t.doc.lineAt(e.from).to,
		to: e.to
	})),
	/*@__PURE__*/ w8.add(E8),
	/*@__PURE__*/ w_.add({ Document: () => null }),
	/*@__PURE__*/ e_.add({ Document: C8 })
] });
function E8(e) {
	let t = /^(?:ATX|Setext)Heading(\d)$/.exec(e.name);
	return t ? +t[1] : void 0;
}
function D8(e) {
	return e.name == "OrderedList" || e.name == "BulletList";
}
function O8(e, t) {
	let n = e;
	for (;;) {
		let e = n.nextSibling, r;
		if (!e || (r = E8(e.type)) != null && r <= t) break;
		n = e;
	}
	return n.to;
}
var k8 = /*@__PURE__*/ L_.of((e, t, n) => {
	for (let r = o_(e).resolveInner(n, -1); r && !(r.from < t); r = r.parent) {
		let e = r.type.prop(w8);
		if (e == null) continue;
		let t = O8(r, e);
		if (t > n) return {
			from: n,
			to: t
		};
	}
	return null;
});
function A8(e) {
	return new r_(C8, e, [], "markdown");
}
var j8 = /*@__PURE__*/ A8(T8), M8 = /*@__PURE__*/ A8(/* @__PURE__ */ T8.configure([
	v8,
	x8,
	b8,
	S8,
	{ props: [/*@__PURE__*/ R_.add({ Table: (e, t) => ({
		from: t.doc.lineAt(e.from).to,
		to: e.to
	}) })] }
]));
function N8(e, t) {
	return (n) => {
		if (n && e) {
			let t = null;
			if (n = /\S*/.exec(n)[0], t = typeof e == "function" ? e(n) : __.matchLanguageName(e, n, !0), t instanceof __) return t.support ? t.support.language.parser : l_.getSkippingParser(t.load());
			if (t) return t.parser;
		}
		return t ? t.parser : null;
	};
}
var P8 = class {
	constructor(e, t, n, r, i, a, o) {
		this.node = e, this.from = t, this.to = n, this.spaceBefore = r, this.spaceAfter = i, this.type = a, this.item = o;
	}
	blank(e, t = !0) {
		let n = this.spaceBefore + (this.node.name == "Blockquote" ? ">" : "");
		if (e != null) {
			for (; n.length < e;) n += " ";
			return n;
		}
		for (let e = this.to - this.from - n.length - this.spaceAfter.length; e > 0; e--) n += " ";
		return n + (t ? this.spaceAfter : "");
	}
	marker(e, t) {
		let n = this.node.name == "OrderedList" ? String(+I8(this.item, e)[2] + t) : "";
		return this.spaceBefore + n + this.type + this.spaceAfter;
	}
};
function F8(e, t) {
	let n = [], r = [];
	for (let t = e; t; t = t.parent) {
		if (t.name == "FencedCode") return r;
		(t.name == "ListItem" || t.name == "Blockquote") && n.push(t);
	}
	for (let e = n.length - 1; e >= 0; e--) {
		let i = n[e], a, o = t.lineAt(i.from), s = i.from - o.from;
		if (i.name == "Blockquote" && (a = /^ *>( ?)/.exec(o.text.slice(s)))) r.push(new P8(i, s, s + a[0].length, "", a[1], ">", null));
		else if (i.name == "ListItem" && i.parent.name == "OrderedList" && (a = /^( *)\d+([.)])( *)/.exec(o.text.slice(s)))) {
			let e = a[3], t = a[0].length;
			e.length >= 4 && (e = e.slice(0, e.length - 4), t -= 4), r.push(new P8(i.parent, s, s + t, a[1], e, a[2], i));
		} else if (i.name == "ListItem" && i.parent.name == "BulletList" && (a = /^( *)([-+*])( {1,4}\[[ xX]\])?( +)/.exec(o.text.slice(s)))) {
			let e = a[4], t = a[0].length;
			e.length > 4 && (e = e.slice(0, e.length - 4), t -= 4);
			let n = a[2];
			a[3] && (n += a[3].replace(/[xX]/, " ")), r.push(new P8(i.parent, s, s + t, a[1], e, n, i));
		}
	}
	return r;
}
function I8(e, t) {
	return /^(\s*)(\d+)(?=[.)])/.exec(t.sliceString(e.from, e.from + 10));
}
function L8(e, t, n, r = 0) {
	for (let i = -1, a = e;;) {
		if (a.name == "ListItem") {
			let e = I8(a, t), o = +e[2];
			if (i >= 0) {
				if (o != i + 1) return;
				n.push({
					from: a.from + e[1].length,
					to: a.from + e[0].length,
					insert: String(i + 2 + r)
				});
			}
			i = o;
		}
		let e = a.nextSibling;
		if (!e) break;
		a = e;
	}
}
function R8(e, t) {
	let n = /^[ \t]*/.exec(e)[0].length;
	if (!n || t.facet(y_) != "	") return e;
	let r = ul(e, 4, n), i = "";
	for (let e = r; e > 0;) e >= 4 ? (i += "	", e -= 4) : (i += " ", e--);
	return i + e.slice(n);
}
var z8 = /*@__PURE__*/ ((e = {}) => ({ state: t, dispatch: n }) => {
	let r = o_(t), { doc: i } = t, a = null, o = t.changeByRange((n) => {
		if (!n.empty || !M8.isActiveAt(t, n.from, -1) && !M8.isActiveAt(t, n.from, 1)) return a = { range: n };
		let o = n.from, s = i.lineAt(o), c = F8(r.resolveInner(o, -1), i);
		for (; c.length && c[c.length - 1].from > o - s.from;) c.pop();
		if (!c.length) return a = { range: n };
		let l = c[c.length - 1];
		if (l.to - l.spaceAfter.length > o - s.from) return a = { range: n };
		let u = o >= l.to - l.spaceAfter.length && !/\S/.test(s.text.slice(l.to));
		if (l.item && u) {
			if (l.item.from < s.from && !/^[\s>]*$/.test(s.text.slice(0, l.to))) return a = { range: n };
			let r = l.node.firstChild, u = l.node.getChild("ListItem", "ListItem");
			if (r.to >= o || u && u.to < o || s.from > 0 && !/[^\s>]/.test(i.lineAt(s.from - 1).text) || e.nonTightLists === !1) {
				let e = c.length > 1 ? c[c.length - 2] : null, t, n = "";
				e && e.item ? (t = s.from + e.from, n = e.marker(i, 1)) : t = s.from + (e ? e.to : 0);
				let r = [{
					from: t,
					to: o,
					insert: n
				}];
				return l.node.name == "OrderedList" && L8(l.item, i, r, -2), e && e.node.name == "OrderedList" && L8(e.item, i, r), {
					range: z.cursor(t + n.length),
					changes: r
				};
			}
			{
				let e = H8(c, t, s);
				return {
					range: z.cursor(o + e.length + 1),
					changes: {
						from: s.from,
						insert: e + t.lineBreak
					}
				};
			}
		}
		if (l.node.name == "Blockquote" && u && s.from) {
			let e = i.lineAt(s.from - 1), r = />\s*$/.exec(e.text);
			if (r && r.index == l.from) {
				let i = t.changes([{
					from: e.from + r.index,
					to: e.to
				}, {
					from: s.from + l.from,
					to: s.to
				}]);
				return {
					range: n.map(i),
					changes: i
				};
			}
		}
		let d = [];
		l.node.name == "OrderedList" && L8(l.item, i, d);
		let f = l.item && l.item.from < s.from, p = "";
		if (!f || /^[\s\d.)\-+*>]*/.exec(s.text)[0].length >= l.to) for (let e = 0, t = c.length - 1; e <= t; e++) p += e == t && !f ? c[e].marker(i, 1) : c[e].blank(e < t ? ul(s.text, 4, c[e + 1].from) - p.length : null);
		let m = o;
		for (; m > s.from && /\s/.test(s.text.charAt(m - s.from - 1));) m--;
		return p = R8(p, t), V8(l.node, t.doc) && (p = H8(c, t, s) + t.lineBreak + p), d.push({
			from: m,
			to: o,
			insert: t.lineBreak + p
		}), {
			range: z.cursor(m + p.length + 1),
			changes: d
		};
	});
	return !a && (n(t.update(o, {
		scrollIntoView: !0,
		userEvent: "input"
	})), !0);
})();
function B8(e) {
	return e.name == "QuoteMark" || e.name == "ListMark";
}
function V8(e, t) {
	if (e.name != "OrderedList" && e.name != "BulletList") return !1;
	let n = e.firstChild, r = e.getChild("ListItem", "ListItem");
	if (!r) return !1;
	let i = t.lineAt(n.to), a = t.lineAt(r.from), o = /^[\s>]*$/.test(i.text);
	return i.number + +!o < a.number;
}
function H8(e, t, n) {
	let r = "";
	for (let t = 0, i = e.length - 2; t <= i; t++) r += e[t].blank(t < i ? ul(n.text, 4, e[t + 1].from) - r.length : null, t < i);
	return R8(r, t);
}
function U8(e, t) {
	let n = e.resolveInner(t, -1), r = t;
	B8(n) && (r = n.from, n = n.parent);
	for (let e; e = n.childBefore(r);) if (B8(e)) r = e.from;
	else if (e.name == "OrderedList" || e.name == "BulletList") n = e.lastChild, r = n.to;
	else break;
	return n;
}
var W8 = [{
	key: "Enter",
	run: z8
}, {
	key: "Backspace",
	run: ({ state: e, dispatch: t }) => {
		let n = o_(e), r = null, i = e.changeByRange((t) => {
			let i = t.from, { doc: a } = e;
			if (t.empty && M8.isActiveAt(e, t.from)) {
				let t = a.lineAt(i), r = F8(U8(n, i), a);
				if (r.length) {
					let n = r[r.length - 1], a = n.to - n.spaceAfter.length + +!!n.spaceAfter;
					if (i - t.from > a && !/\S/.test(t.text.slice(a, i - t.from))) return {
						range: z.cursor(t.from + a),
						changes: {
							from: t.from + a,
							to: i
						}
					};
					if (i - t.from == a && (n.item && t.from <= n.item.from || /^[\s>]*$/.test(t.text.slice(0, n.to)))) {
						let r = t.from + n.from;
						if (n.item && n.node.from < n.item.from && /\S/.test(t.text.slice(n.from, n.to))) {
							let i = n.blank(ul(t.text, 4, n.to) - ul(t.text, 4, n.from));
							return r == t.from && (i = R8(i, e)), {
								range: z.cursor(r + i.length),
								changes: {
									from: r,
									to: t.from + n.to,
									insert: i
								}
							};
						}
						if (r < i) return {
							range: z.cursor(r),
							changes: {
								from: r,
								to: i
							}
						};
					}
				}
			}
			return r = { range: t };
		});
		return !r && (t(e.update(i, {
			scrollIntoView: !0,
			userEvent: "delete"
		})), !0);
	}
}], G8 = /*@__PURE__*/ L6({ matchClosingTags: !1 });
function K8(e = {}) {
	let { codeLanguages: t, defaultCodeLanguage: n, addKeymap: r = !0, base: { parser: i } = j8, completeHTMLTags: a = !0, pasteURLAsLink: o = !0, htmlTagLanguage: s = G8 } = e;
	if (!(i instanceof Cb)) throw RangeError("Base parser provided to `markdown` should be a Markdown parser");
	let c = e.extensions ? [e.extensions] : [], l = [s.support, k8], u;
	o && l.push(Z8), n instanceof g_ ? (l.push(n.support), u = n.language) : n && (u = n);
	let d = t || u ? N8(t, u) : void 0;
	c.push(e8({
		codeParser: d,
		htmlParser: s.language.parser
	})), r && l.push(uc.high(Rm.of(W8)));
	let f = A8(i.configure(c));
	return a && l.push(f.data.of({ autocomplete: q8 })), new g_(f, l);
}
function q8(e) {
	let { state: t, pos: n } = e, r = /<[:\-\.\w\u00b7-\uffff]*$/.exec(t.sliceDoc(n - 25, n));
	if (!r) return null;
	let i = o_(t).resolveInner(n, -1);
	for (; i && !i.type.isTop;) {
		if (i.name == "CodeBlock" || i.name == "FencedCode" || i.name == "ProcessingInstructionBlock" || i.name == "CommentBlock" || i.name == "Link" || i.name == "Image") return null;
		i = i.parent;
	}
	return {
		from: n - r[0].length,
		to: n,
		options: Y8(),
		validFor: /^<[:\-\.\w\u00b7-\uffff]*$/
	};
}
var J8 = null;
function Y8() {
	if (J8) return J8;
	let e = A6(new m3(Uc.create({ extensions: G8 }), 0, !0));
	return J8 = e ? e.options : [];
}
var X8 = /code|horizontalrule|html|link|comment|processing|escape|entity|image|mark|url/i, Z8 = /*@__PURE__*/ W.domEventHandlers({ paste: (e, t) => {
	let { main: n } = t.state.selection;
	if (n.empty) return !1;
	let r = e.clipboardData?.getData("text/plain");
	if (!r || !/^(https?:\/\/|mailto:|xmpp:|www\.)/.test(r) || (/^www\./.test(r) && (r = "https://" + r), !M8.isActiveAt(t.state, n.from, 1))) return !1;
	let i = o_(t.state), a = !1;
	return i.iterate({
		from: n.from,
		to: n.to,
		enter: (e) => {
			(e.from > n.from || X8.test(e.name)) && (a = !0);
		},
		leave: (e) => {
			e.to < n.to && (a = !0);
		}
	}), !a && (t.dispatch({
		changes: [{
			from: n.from,
			insert: "["
		}, {
			from: n.to,
			insert: `](${r})`
		}],
		userEvent: "input.paste",
		scrollIntoView: !0
	}), !0);
} }), Q8 = 1, $8 = 2, ex = 3, tx = 4, nx = 5, rx = 36, ix = 37, ax = 38, ox = 11, sx = 13;
function cx(e) {
	return e == 45 || e == 46 || e == 58 || e >= 65 && e <= 90 || e == 95 || e >= 97 && e <= 122 || e >= 161;
}
function lx(e) {
	return e == 9 || e == 10 || e == 13 || e == 32;
}
var ux = null, dx = null, fx = 0;
function px(e, t) {
	let n = e.pos + t;
	if (dx == e && fx == n) return ux;
	for (; lx(e.peek(t));) t++;
	let r = "";
	for (;;) {
		let n = e.peek(t);
		if (!cx(n)) break;
		r += String.fromCharCode(n), t++;
	}
	return dx = e, fx = n, ux = r || null;
}
function mx(e, t) {
	this.name = e, this.parent = t;
}
var hx = new _y({
	start: null,
	shift(e, t, n, r) {
		return t == Q8 ? new mx(px(r, 1) || "", e) : e;
	},
	reduce(e, t) {
		return t == ox && e ? e.parent : e;
	},
	reuse(e, t, n, r) {
		let i = t.type.id;
		return i == Q8 || i == sx ? new mx(px(r, 1) || "", e) : e;
	},
	strict: !1
}), gx = new ry((e, t) => {
	if (e.next == 60) {
		if (e.advance(), e.next == 47) {
			e.advance();
			let n = px(e, 0);
			if (!n) return e.acceptToken(nx);
			if (t.context && n == t.context.name) return e.acceptToken($8);
			for (let r = t.context; r; r = r.parent) if (r.name == n) return e.acceptToken(ex, -2);
			e.acceptToken(tx);
		} else if (e.next != 33 && e.next != 63) return e.acceptToken(Q8);
	}
}, { contextual: !0 });
function _x(e, t) {
	return new ry((n) => {
		let r = 0, i = t.charCodeAt(0);
		e: for (; !(n.next < 0); n.advance(), r++) if (n.next == i) {
			for (let e = 1; e < t.length; e++) if (n.peek(e) != t.charCodeAt(e)) continue e;
			break;
		}
		r && n.acceptToken(e);
	});
}
var vx = _x(rx, "-->"), yx = _x(ix, "?>"), bx = _x(ax, "]]>"), xx = Ag({
	Text: Y.content,
	"StartTag StartCloseTag EndTag SelfCloseEndTag": Y.angleBracket,
	TagName: Y.tagName,
	"MismatchedCloseTag/TagName": [Y.tagName, Y.invalid],
	AttributeName: Y.attributeName,
	AttributeValue: Y.attributeValue,
	Is: Y.definitionOperator,
	"EntityReference CharacterReference": Y.character,
	Comment: Y.blockComment,
	ProcessingInst: Y.processingInstruction,
	DoctypeDecl: Y.documentMeta,
	Cdata: Y.special(Y.string)
}), Sx = vy.deserialize({
	version: 14,
	states: ",lOQOaOOOrOxO'#CfOzOpO'#CiO!tOaO'#CgOOOP'#Cg'#CgO!{OrO'#CrO#TOtO'#CsO#]OpO'#CtOOOP'#DT'#DTOOOP'#Cv'#CvQQOaOOOOOW'#Cw'#CwO#eOxO,59QOOOP,59Q,59QOOOO'#Cx'#CxO#mOpO,59TO#uO!bO,59TOOOP'#C|'#C|O$TOaO,59RO$[OpO'#CoOOOP,59R,59ROOOQ'#C}'#C}O$dOrO,59^OOOP,59^,59^OOOS'#DO'#DOO$lOtO,59_OOOP,59_,59_O$tOpO,59`O$|OpO,59`OOOP-E6t-E6tOOOW-E6u-E6uOOOP1G.l1G.lOOOO-E6v-E6vO%UO!bO1G.oO%UO!bO1G.oO%dOpO'#CkO%lO!bO'#CyO%zO!bO1G.oOOOP1G.o1G.oOOOP1G.w1G.wOOOP-E6z-E6zOOOP1G.m1G.mO&VOpO,59ZO&_OpO,59ZOOOQ-E6{-E6{OOOP1G.x1G.xOOOS-E6|-E6|OOOP1G.y1G.yO&gOpO1G.zO&gOpO1G.zOOOP1G.z1G.zO&oO!bO7+$ZO&}O!bO7+$ZOOOP7+$Z7+$ZOOOP7+$c7+$cO'YOpO,59VO'bOpO,59VO'mO!bO,59eOOOO-E6w-E6wO'{OpO1G.uO'{OpO1G.uOOOP1G.u1G.uO(TOpO7+$fOOOP7+$f7+$fO(]O!bO<<GuOOOP<<Gu<<GuOOOP<<G}<<G}O'bOpO1G.qO'bOpO1G.qO(hO#tO'#CnO(vO&jO'#CnOOOO1G.q1G.qO)UOpO7+$aOOOP7+$a7+$aOOOP<<HQ<<HQOOOPAN=aAN=aOOOPAN=iAN=iO'bOpO7+$]OOOO7+$]7+$]OOOO'#Cz'#CzO)^O#tO,59YOOOO,59Y,59YOOOO'#C{'#C{O)lO&jO,59YOOOP<<G{<<G{OOOO<<Gw<<GwOOOO-E6x-E6xOOOO1G.t1G.tOOOO-E6y-E6y",
	stateData: ")z~OPQOSVOTWOVWOWWOXWOiXOyPO!QTO!SUO~OvZOx]O~O^`Oz^O~OPQOQcOSVOTWOVWOWWOXWOyPO!QTO!SUO~ORdO~P!SOteO!PgO~OuhO!RjO~O^lOz^O~OvZOxoO~O^qOz^O~O[vO`sOdwOz^O~ORyO~P!SO^{Oz^O~OteO!P}O~OuhO!R!PO~O^!QOz^O~O[!SOz^O~O[!VO`sOd!WOz^O~Oa!YOz^O~Oz^O[mX`mXdmX~O[!VO`sOd!WO~O^!]Oz^O~O[!_Oz^O~O[!aOz^O~O[!cO`sOd!dOz^O~O[!cO`sOd!dO~Oa!eOz^O~Oz^O{!gO}!hO~Oz^O[ma`madma~O[!kOz^O~O[!lOz^O~O[!mO`sOd!nO~OW!qOX!qO{!sO|!qO~OW!tOX!tO}!sO!O!tO~O[!vOz^O~OW!qOX!qO{!yO|!qO~OW!tOX!tO}!yO!O!tO~O",
	goto: "%cxPPPPPPPPPPyyP!PP!VPP!`!jP!pyyyP!v!|#S$[$k$q$w$}%TPPPP%ZXWORYbXRORYb_t`qru!T!U!bQ!i!YS!p!e!fR!w!oQdRRybXSORYbQYORmYQ[PRn[Q_QQkVjp_krz!R!T!X!Z!^!`!f!j!oQr`QzcQ!RlQ!TqQ!XsQ!ZtQ!^{Q!`!QQ!f!YQ!j!]R!o!eQu`S!UqrU![u!U!bR!b!TQ!r!gR!x!rQ!u!hR!z!uQbRRxbQfTR|fQiUR!OiSXOYTaRb",
	nodeNames: "⚠ StartTag StartCloseTag MissingCloseTag StartCloseTag StartCloseTag Document Text EntityReference CharacterReference Cdata Element EndTag OpenTag TagName Attribute AttributeName Is AttributeValue CloseTag SelfCloseEndTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag DoctypeDecl",
	maxTerm: 50,
	context: hx,
	nodeProps: [
		[
			"closedBy",
			1,
			"SelfCloseEndTag EndTag",
			13,
			"CloseTag MissingCloseTag"
		],
		[
			"openedBy",
			12,
			"StartTag StartCloseTag",
			19,
			"OpenTag",
			20,
			"StartTag"
		],
		[
			"isolate",
			-6,
			13,
			18,
			19,
			21,
			22,
			24,
			""
		]
	],
	propSources: [xx],
	skippedNodes: [0],
	repeatNodeCount: 9,
	tokenData: "!)v~R!YOX$qXY)iYZ)iZ]$q]^)i^p$qpq)iqr$qrs*vsv$qvw+fwx/ix}$q}!O0[!O!P$q!P!Q2z!Q![$q![!]4n!]!^$q!^!_8U!_!`!#t!`!a!$l!a!b!%d!b!c$q!c!}4n!}#P$q#P#Q!'W#Q#R$q#R#S4n#S#T$q#T#o4n#o%W$q%W%o4n%o%p$q%p&a4n&a&b$q&b1p4n1p4U$q4U4d4n4d4e$q4e$IS4n$IS$I`$q$I`$Ib4n$Ib$Kh$q$Kh%#t4n%#t&/x$q&/x&Et4n&Et&FV$q&FV;'S4n;'S;:j8O;:j;=`)c<%l?&r$q?&r?Ah4n?Ah?BY$q?BY?Mn4n?MnO$qi$zXVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qa%nVVP!O`Ov%gwx&Tx!^%g!^!_&o!_;'S%g;'S;=`'W<%lO%gP&YTVPOv&Tw!^&T!_;'S&T;'S;=`&i<%lO&TP&lP;=`<%l&T`&tS!O`Ov&ox;'S&o;'S;=`'Q<%lO&o`'TP;=`<%l&oa'ZP;=`<%l%gX'eWVP|WOr'^rs&Tsv'^w!^'^!^!_'}!_;'S'^;'S;=`(i<%lO'^W(ST|WOr'}sv'}w;'S'};'S;=`(c<%lO'}W(fP;=`<%l'}X(lP;=`<%l'^h(vV|W!O`Or(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(oh)`P;=`<%l(oi)fP;=`<%l$qo)t`VP|W!O`zUOX$qXY)iYZ)iZ]$q]^)i^p$qpq)iqr$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qk+PV{YVP!O`Ov%gwx&Tx!^%g!^!_&o!_;'S%g;'S;=`'W<%lO%g~+iast,n![!]-r!c!}-r#R#S-r#T#o-r%W%o-r%p&a-r&b1p-r4U4d-r4e$IS-r$I`$Ib-r$Kh%#t-r&/x&Et-r&FV;'S-r;'S;:j/c?&r?Ah-r?BY?Mn-r~,qQ!Q![,w#l#m-V~,zQ!Q![,w!]!^-Q~-VOX~~-YR!Q![-c!c!i-c#T#Z-c~-fS!Q![-c!]!^-Q!c!i-c#T#Z-c~-ug}!O-r!O!P-r!Q![-r![!]-r!]!^/^!c!}-r#R#S-r#T#o-r$}%O-r%W%o-r%p&a-r&b1p-r1p4U-r4U4d-r4e$IS-r$I`$Ib-r$Je$Jg-r$Kh%#t-r&/x&Et-r&FV;'S-r;'S;:j/c?&r?Ah-r?BY?Mn-r~/cOW~~/fP;=`<%l-rk/rW}bVP|WOr'^rs&Tsv'^w!^'^!^!_'}!_;'S'^;'S;=`(i<%lO'^k0eZVP|W!O`Or$qrs%gsv$qwx'^x}$q}!O1W!O!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qk1aZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_!`$q!`!a2S!a;'S$q;'S;=`)c<%lO$qk2_X!PQVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qm3TZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_!`$q!`!a3v!a;'S$q;'S;=`)c<%lO$qm4RXdSVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qo4{!P`S^QVP|W!O`Or$qrs%gsv$qwx'^x}$q}!O4n!O!P4n!P!Q$q!Q![4n![!]4n!]!^$q!^!_(o!_!c$q!c!}4n!}#R$q#R#S4n#S#T$q#T#o4n#o$}$q$}%O4n%O%W$q%W%o4n%o%p$q%p&a4n&a&b$q&b1p4n1p4U4n4U4d4n4d4e$q4e$IS4n$IS$I`$q$I`$Ib4n$Ib$Je$q$Je$Jg4n$Jg$Kh$q$Kh%#t4n%#t&/x$q&/x&Et4n&Et&FV$q&FV;'S4n;'S;:j8O;:j;=`)c<%l?&r$q?&r?Ah4n?Ah?BY$q?BY?Mn4n?MnO$qo8RP;=`<%l4ni8]Y|W!O`Oq(oqr8{rs&osv(owx'}x!a(o!a!b!#U!b;'S(o;'S;=`)]<%lO(oi9S_|W!O`Or(ors&osv(owx'}x}(o}!O:R!O!f(o!f!g;e!g!}(o!}#ODh#O#W(o#W#XLp#X;'S(o;'S;=`)]<%lO(oi:YX|W!O`Or(ors&osv(owx'}x}(o}!O:u!O;'S(o;'S;=`)]<%lO(oi;OV!QP|W!O`Or(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(oi;lX|W!O`Or(ors&osv(owx'}x!q(o!q!r<X!r;'S(o;'S;=`)]<%lO(oi<`X|W!O`Or(ors&osv(owx'}x!e(o!e!f<{!f;'S(o;'S;=`)]<%lO(oi=SX|W!O`Or(ors&osv(owx'}x!v(o!v!w=o!w;'S(o;'S;=`)]<%lO(oi=vX|W!O`Or(ors&osv(owx'}x!{(o!{!|>c!|;'S(o;'S;=`)]<%lO(oi>jX|W!O`Or(ors&osv(owx'}x!r(o!r!s?V!s;'S(o;'S;=`)]<%lO(oi?^X|W!O`Or(ors&osv(owx'}x!g(o!g!h?y!h;'S(o;'S;=`)]<%lO(oi@QY|W!O`Or?yrs@psv?yvwA[wxBdx!`?y!`!aCr!a;'S?y;'S;=`Db<%lO?ya@uV!O`Ov@pvxA[x!`@p!`!aAy!a;'S@p;'S;=`B^<%lO@pPA_TO!`A[!`!aAn!a;'SA[;'S;=`As<%lOA[PAsOiPPAvP;=`<%lA[aBQSiP!O`Ov&ox;'S&o;'S;=`'Q<%lO&oaBaP;=`<%l@pXBiX|WOrBdrsA[svBdvwA[w!`Bd!`!aCU!a;'SBd;'S;=`Cl<%lOBdXC]TiP|WOr'}sv'}w;'S'};'S;=`(c<%lO'}XCoP;=`<%lBdiC{ViP|W!O`Or(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(oiDeP;=`<%l?yiDoZ|W!O`Or(ors&osv(owx'}x!e(o!e!fEb!f#V(o#V#WIr#W;'S(o;'S;=`)]<%lO(oiEiX|W!O`Or(ors&osv(owx'}x!f(o!f!gFU!g;'S(o;'S;=`)]<%lO(oiF]X|W!O`Or(ors&osv(owx'}x!c(o!c!dFx!d;'S(o;'S;=`)]<%lO(oiGPX|W!O`Or(ors&osv(owx'}x!v(o!v!wGl!w;'S(o;'S;=`)]<%lO(oiGsX|W!O`Or(ors&osv(owx'}x!c(o!c!dH`!d;'S(o;'S;=`)]<%lO(oiHgX|W!O`Or(ors&osv(owx'}x!}(o!}#OIS#O;'S(o;'S;=`)]<%lO(oiI]V|W!O`yPOr(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(oiIyX|W!O`Or(ors&osv(owx'}x#W(o#W#XJf#X;'S(o;'S;=`)]<%lO(oiJmX|W!O`Or(ors&osv(owx'}x#T(o#T#UKY#U;'S(o;'S;=`)]<%lO(oiKaX|W!O`Or(ors&osv(owx'}x#h(o#h#iK|#i;'S(o;'S;=`)]<%lO(oiLTX|W!O`Or(ors&osv(owx'}x#T(o#T#UH`#U;'S(o;'S;=`)]<%lO(oiLwX|W!O`Or(ors&osv(owx'}x#c(o#c#dMd#d;'S(o;'S;=`)]<%lO(oiMkX|W!O`Or(ors&osv(owx'}x#V(o#V#WNW#W;'S(o;'S;=`)]<%lO(oiN_X|W!O`Or(ors&osv(owx'}x#h(o#h#iNz#i;'S(o;'S;=`)]<%lO(oi! RX|W!O`Or(ors&osv(owx'}x#m(o#m#n! n#n;'S(o;'S;=`)]<%lO(oi! uX|W!O`Or(ors&osv(owx'}x#d(o#d#e!!b#e;'S(o;'S;=`)]<%lO(oi!!iX|W!O`Or(ors&osv(owx'}x#X(o#X#Y?y#Y;'S(o;'S;=`)]<%lO(oi!#_V!SP|W!O`Or(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(ok!$PXaQVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qo!$wX[UVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qk!%mZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_!`$q!`!a!&`!a;'S$q;'S;=`)c<%lO$qk!&kX!RQVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qk!'aZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_#P$q#P#Q!(S#Q;'S$q;'S;=`)c<%lO$qk!(]ZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_!`$q!`!a!)O!a;'S$q;'S;=`)c<%lO$qk!)ZXxQVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$q",
	tokenizers: [
		gx,
		vx,
		yx,
		bx,
		0,
		1,
		2,
		3,
		4
	],
	topRules: { Document: [0, 6] },
	tokenPrec: 0
});
// node_modules/@codemirror/lang-xml/dist/index.js
function Cx(e, t) {
	let n = t && t.getChild("TagName");
	return n ? e.sliceString(n.from, n.to) : "";
}
function wx(e, t) {
	let n = t && t.firstChild;
	return !n || n.name != "OpenTag" ? "" : Cx(e, n);
}
function Tx(e, t, n) {
	let r = t && t.getChildren("Attribute").find((e) => e.from <= n && e.to >= n), i = r && r.getChild("AttributeName");
	return i ? e.sliceString(i.from, i.to) : "";
}
function Ex(e) {
	for (let t = e && e.parent; t; t = t.parent) if (t.name == "Element") return t;
	return null;
}
function Dx(e, t) {
	let n = o_(e).resolveInner(t, -1), r = null;
	for (let e = n; !r && e.parent; e = e.parent) (e.name == "OpenTag" || e.name == "CloseTag" || e.name == "SelfClosingTag" || e.name == "MismatchedCloseTag") && (r = e);
	if (r && (r.to > t || r.lastChild.type.isError)) {
		let e = r.parent;
		if (n.name == "TagName") return r.name == "CloseTag" || r.name == "MismatchedCloseTag" ? {
			type: "closeTag",
			from: n.from,
			context: e
		} : {
			type: "openTag",
			from: n.from,
			context: Ex(e)
		};
		if (n.name == "AttributeName") return {
			type: "attrName",
			from: n.from,
			context: r
		};
		if (n.name == "AttributeValue") return {
			type: "attrValue",
			from: n.from,
			context: r
		};
		let i = n == r || n.name == "Attribute" ? n.childBefore(t) : n;
		return i?.name == "StartTag" ? {
			type: "openTag",
			from: t,
			context: Ex(e)
		} : i?.name == "StartCloseTag" && i.to <= t ? {
			type: "closeTag",
			from: t,
			context: e
		} : i?.name == "Is" ? {
			type: "attrValue",
			from: t,
			context: r
		} : i ? {
			type: "attrName",
			from: t,
			context: r
		} : null;
	}
	if (n.name == "StartCloseTag") return {
		type: "closeTag",
		from: t,
		context: n.parent
	};
	for (; n.parent && n.to == t && !n.lastChild?.type.isError;) n = n.parent;
	return n.name == "Element" || n.name == "Text" || n.name == "Document" ? {
		type: "tag",
		from: t,
		context: n.name == "Element" ? n : Ex(n)
	} : null;
}
var Ox = class {
	constructor(e, t, n) {
		this.attrs = t, this.attrValues = n, this.children = [], this.name = e.name, this.completion = Object.assign(Object.assign({ type: "type" }, e.completion || {}), { label: this.name }), this.openCompletion = Object.assign(Object.assign({}, this.completion), { label: "<" + this.name }), this.closeCompletion = Object.assign(Object.assign({}, this.completion), {
			label: "</" + this.name + ">",
			boost: 2
		}), this.closeNameCompletion = Object.assign(Object.assign({}, this.completion), { label: this.name + ">" }), this.text = e.textContent ? e.textContent.map((e) => ({
			label: e,
			type: "text"
		})) : [];
	}
}, kx = /^[:\-\.\w\u00b7-\uffff]*$/;
function Ax(e) {
	return Object.assign(Object.assign({ type: "property" }, e.completion || {}), { label: e.name });
}
function jx(e) {
	return typeof e == "string" ? {
		label: `"${e}"`,
		type: "constant"
	} : /^"/.test(e.label) ? e : Object.assign(Object.assign({}, e), { label: `"${e.label}"` });
}
function Mx(e, t) {
	let n = [], r = [], i = Object.create(null);
	for (let e of t) {
		let t = Ax(e);
		n.push(t), e.global && r.push(t), e.values && (i[e.name] = e.values.map(jx));
	}
	let a = [], o = [], s = Object.create(null);
	for (let t of e) {
		let e = r, c = i;
		t.attributes && (e = e.concat(t.attributes.map((e) => typeof e == "string" ? n.find((t) => t.label == e) || {
			label: e,
			type: "property"
		} : (e.values && (c == i && (c = Object.create(c)), c[e.name] = e.values.map(jx)), Ax(e)))));
		let l = new Ox(t, e, c);
		s[l.name] = l, a.push(l), t.top && o.push(l);
	}
	o.length || (o = a);
	for (let t = 0; t < a.length; t++) {
		let n = e[t], r = a[t];
		if (n.children) for (let e of n.children) s[e] && r.children.push(s[e]);
		else r.children = a;
	}
	return (e) => {
		let { doc: t } = e.state, n = Dx(e.state, e.pos);
		if (!n || n.type == "tag" && !e.explicit) return null;
		let { type: c, from: l, context: u } = n;
		if (c == "openTag") {
			let e = o, n = wx(t, u);
			return n && (e = s[n]?.children || a), {
				from: l,
				options: e.map((e) => e.completion),
				validFor: kx
			};
		}
		if (c == "closeTag") {
			let n = wx(t, u);
			return n ? {
				from: l,
				to: e.pos + +(t.sliceString(e.pos, e.pos + 1) == ">"),
				options: [s[n]?.closeNameCompletion || {
					label: n + ">",
					type: "type"
				}],
				validFor: kx
			} : null;
		}
		if (c == "attrName") return {
			from: l,
			options: s[Cx(t, u)]?.attrs || r,
			validFor: kx
		};
		if (c == "attrValue") {
			let n = Tx(t, u, l);
			if (!n) return null;
			let r = (s[Cx(t, u)]?.attrValues || i)[n];
			return !r || !r.length ? null : {
				from: l,
				to: e.pos + +(t.sliceString(e.pos, e.pos + 1) == "\""),
				options: r,
				validFor: /^"[^"]*"?$/
			};
		}
		if (c == "tag") {
			let n = wx(t, u), r = s[n], i = [], c = u && u.lastChild;
			n && (!c || c.name != "CloseTag" || Cx(t, c) != n) && i.push(r ? r.closeCompletion : {
				label: "</" + n + ">",
				type: "type",
				boost: 2
			});
			let d = i.concat((r?.children || (u ? a : o)).map((e) => e.openCompletion));
			if (u && r?.text.length) {
				let t = u.firstChild;
				t.to > e.pos - 20 && !/\S/.test(e.state.sliceDoc(t.to, e.pos)) && (d = d.concat(r.text));
			}
			return {
				from: l,
				options: d,
				validFor: /^<\/?[:\-\.\w\u00b7-\uffff]*$/
			};
		}
		return null;
	};
}
var Nx = /*@__PURE__*/ a_.define({
	name: "xml",
	parser: /*@__PURE__*/ Sx.configure({ props: [
		/*@__PURE__*/ w_.add({
			Element(e) {
				let t = /^\s*<\//.test(e.textAfter);
				return e.lineIndent(e.node.from) + (t ? 0 : e.unit);
			},
			"OpenTag CloseTag SelfClosingTag"(e) {
				return e.column(e.node.from) + e.unit;
			}
		}),
		/*@__PURE__*/ R_.add({ Element(e) {
			let t = e.firstChild, n = e.lastChild;
			return !t || t.name != "OpenTag" ? null : {
				from: t.to,
				to: n.name == "CloseTag" ? n.from : e.to
			};
		} }),
		/*@__PURE__*/ X_.add({ "OpenTag CloseTag": (e) => e.getChild("TagName") })
	] }),
	languageData: {
		commentTokens: { block: {
			open: "<!--",
			close: "-->"
		} },
		indentOnInput: /^\s*<\/$/
	}
});
function Px(e = {}) {
	let t = [Nx.data.of({ autocomplete: Mx(e.elements || [], e.attributes || []) })];
	return e.autoCloseTags !== !1 && t.push(Ix), new g_(Nx, t);
}
function Fx(e, t, n = e.length) {
	if (!t) return "";
	let r = t.firstChild, i = r && r.getChild("TagName");
	return i ? e.sliceString(i.from, Math.min(i.to, n)) : "";
}
var Ix = /*@__PURE__*/ W.inputHandler.of((e, t, n, r, i) => {
	if (e.composing || e.state.readOnly || t != n || r != ">" && r != "/" || !Nx.isActiveAt(e.state, t, -1)) return !1;
	let a = i(), { state: o } = a, s = o.changeByRange((e) => {
		let { head: t } = e, n = o.doc.sliceString(t - 1, t) == r, i = o_(o).resolveInner(t, -1), a;
		if (n && r == ">" && i.name == "EndTag") {
			let n = i.parent;
			if (n.parent?.lastChild?.name != "CloseTag" && (a = Fx(o.doc, n.parent, t))) return {
				range: e,
				changes: {
					from: t,
					to: t + +(o.doc.sliceString(t, t + 1) === ">"),
					insert: `</${a}>`
				}
			};
		} else if (n && r == "/" && i.name == "StartCloseTag") {
			let e = i.parent;
			if (i.from == t - 2 && e.lastChild?.name != "CloseTag" && (a = Fx(o.doc, e, t))) {
				let e = t + +(o.doc.sliceString(t, t + 1) === ">"), n = `${a}>`;
				return {
					range: z.cursor(t + n.length, -1),
					changes: {
						from: t,
						to: e,
						insert: n
					}
				};
			}
		}
		return { range: e };
	});
	return !s.changes.empty && (e.dispatch([a, o.update(s, {
		userEvent: "input.complete",
		scrollIntoView: !0
	})]), !0);
});
// node_modules/@babel/runtime/helpers/esm/extends.js
function Lx() {
	return Lx = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, Lx.apply(null, arguments);
}
// node_modules/@uiw/codemirror-themes/esm/index.js
var Rx = (e) => {
	var t = e.theme, n = e.settings, r = n === void 0 ? {} : n, i = e.styles, a = i === void 0 ? [] : i, o = { ".cm-gutters": {} }, s = {};
	r.background && (s.backgroundColor = r.background), r.backgroundImage && (s.backgroundImage = r.backgroundImage), r.foreground && (s.color = r.foreground), r.fontSize && (s.fontSize = r.fontSize), (r.background || r.foreground) && (o["&"] = s), r.fontFamily && (o["&.cm-editor .cm-scroller"] = { fontFamily: r.fontFamily }), r.gutterBackground && (o[".cm-gutters"].backgroundColor = r.gutterBackground), r.gutterForeground && (o[".cm-gutters"].color = r.gutterForeground), r.gutterBorder && (o[".cm-gutters"].borderRightColor = r.gutterBorder), r.caret && (o[".cm-content"] = { caretColor: r.caret }, o[".cm-cursor, .cm-dropCursor"] = { borderLeftColor: r.caret });
	var c = {};
	return r.gutterActiveForeground && (c.color = r.gutterActiveForeground), r.lineHighlight && (o[".cm-activeLine"] = { backgroundColor: r.lineHighlight }, c.backgroundColor = r.lineHighlight), o[".cm-activeLineGutter"] = c, r.selection && (o["&.cm-focused .cm-selectionBackground, & .cm-line::selection, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection"] = { background: r.selection + " !important" }), r.selectionMatch && (o["& .cm-selectionMatch"] = { backgroundColor: r.selectionMatch }), [W.theme(o, { dark: t === "dark" }), W_(B_.define(a))];
}, zx = {
	background: "#ffffff",
	foreground: "#383a42",
	caret: "#000",
	selection: "#add6ff",
	selectionMatch: "#a8ac94",
	lineHighlight: "#99999926",
	gutterBackground: "#fff",
	gutterForeground: "#237893",
	gutterActiveForeground: "#0b216f",
	fontFamily: "Menlo, Monaco, Consolas, \"Andale Mono\", \"Ubuntu Mono\", \"Courier New\", monospace"
}, Bx = [
	{
		tag: [
			Y.keyword,
			Y.operatorKeyword,
			Y.modifier,
			Y.color,
			Y.constant(Y.name),
			Y.standard(Y.name),
			Y.standard(Y.tagName),
			Y.special(Y.brace),
			Y.atom,
			Y.bool,
			Y.special(Y.variableName)
		],
		color: "#0000ff"
	},
	{
		tag: [Y.moduleKeyword, Y.controlKeyword],
		color: "#af00db"
	},
	{
		tag: [
			Y.name,
			Y.deleted,
			Y.character,
			Y.macroName,
			Y.propertyName,
			Y.variableName,
			Y.labelName,
			Y.definition(Y.name)
		],
		color: "#0070c1"
	},
	{
		tag: Y.heading,
		fontWeight: "bold",
		color: "#0070c1"
	},
	{
		tag: [
			Y.typeName,
			Y.className,
			Y.tagName,
			Y.number,
			Y.changed,
			Y.annotation,
			Y.self,
			Y.namespace
		],
		color: "#267f99"
	},
	{
		tag: [Y.function(Y.variableName), Y.function(Y.propertyName)],
		color: "#795e26"
	},
	{
		tag: [Y.number],
		color: "#098658"
	},
	{
		tag: [
			Y.operator,
			Y.punctuation,
			Y.separator,
			Y.url,
			Y.escape,
			Y.regexp
		],
		color: "#383a42"
	},
	{
		tag: [Y.regexp],
		color: "#af00db"
	},
	{
		tag: [
			Y.special(Y.string),
			Y.processingInstruction,
			Y.string,
			Y.inserted
		],
		color: "#a31515"
	},
	{
		tag: [Y.angleBracket],
		color: "#383a42"
	},
	{
		tag: Y.strong,
		fontWeight: "bold"
	},
	{
		tag: Y.emphasis,
		fontStyle: "italic"
	},
	{
		tag: Y.strikethrough,
		textDecoration: "line-through"
	},
	{
		tag: [Y.meta, Y.comment],
		color: "#008000"
	},
	{
		tag: Y.link,
		color: "#4078f2",
		textDecoration: "underline"
	},
	{
		tag: Y.invalid,
		color: "#e45649"
	}
];
function Vx(e) {
	var t = e || {}, n = t.theme, r = n === void 0 ? "light" : n, i = t.settings, a = i === void 0 ? {} : i, o = t.styles, s = o === void 0 ? [] : o;
	return Rx({
		theme: r,
		settings: Lx({}, zx, a),
		styles: [...Bx, ...s]
	});
}
var Hx = Vx(), Ux = {
	background: "#1e1e1e",
	foreground: "#9cdcfe",
	caret: "#c6c6c6",
	selection: "#6199ff2f",
	selectionMatch: "#72a1ff59",
	lineHighlight: "#ffffff0f",
	gutterBackground: "#1e1e1e",
	gutterForeground: "#838383",
	gutterActiveForeground: "#fff",
	fontFamily: "Menlo, Monaco, Consolas, \"Andale Mono\", \"Ubuntu Mono\", \"Courier New\", monospace"
}, Wx = [
	{
		tag: [
			Y.keyword,
			Y.operatorKeyword,
			Y.modifier,
			Y.color,
			Y.constant(Y.name),
			Y.standard(Y.name),
			Y.standard(Y.tagName),
			Y.special(Y.brace),
			Y.atom,
			Y.bool,
			Y.special(Y.variableName)
		],
		color: "#569cd6"
	},
	{
		tag: [Y.controlKeyword, Y.moduleKeyword],
		color: "#c586c0"
	},
	{
		tag: [
			Y.name,
			Y.deleted,
			Y.character,
			Y.macroName,
			Y.propertyName,
			Y.variableName,
			Y.labelName,
			Y.definition(Y.name)
		],
		color: "#9cdcfe"
	},
	{
		tag: Y.heading,
		fontWeight: "bold",
		color: "#9cdcfe"
	},
	{
		tag: [
			Y.typeName,
			Y.className,
			Y.tagName,
			Y.number,
			Y.changed,
			Y.annotation,
			Y.self,
			Y.namespace
		],
		color: "#4ec9b0"
	},
	{
		tag: [Y.function(Y.variableName), Y.function(Y.propertyName)],
		color: "#dcdcaa"
	},
	{
		tag: [Y.number],
		color: "#b5cea8"
	},
	{
		tag: [
			Y.operator,
			Y.punctuation,
			Y.separator,
			Y.url,
			Y.escape,
			Y.regexp
		],
		color: "#d4d4d4"
	},
	{
		tag: [Y.regexp],
		color: "#d16969"
	},
	{
		tag: [
			Y.special(Y.string),
			Y.processingInstruction,
			Y.string,
			Y.inserted
		],
		color: "#ce9178"
	},
	{
		tag: [Y.angleBracket],
		color: "#808080"
	},
	{
		tag: Y.strong,
		fontWeight: "bold"
	},
	{
		tag: Y.emphasis,
		fontStyle: "italic"
	},
	{
		tag: Y.strikethrough,
		textDecoration: "line-through"
	},
	{
		tag: [Y.meta, Y.comment],
		color: "#6a9955"
	},
	{
		tag: Y.link,
		color: "#6a9955",
		textDecoration: "underline"
	},
	{
		tag: Y.invalid,
		color: "#ff0000"
	}
];
function Gx(e) {
	var t = e || {}, n = t.theme, r = n === void 0 ? "dark" : n, i = t.settings, a = i === void 0 ? {} : i, o = t.styles, s = o === void 0 ? [] : o;
	return Rx({
		theme: r,
		settings: Lx({}, Ux, a),
		styles: [...Wx, ...s]
	});
}
var Kx = Gx(), qx;
function Jx(e) {
	return RegExp("^(?:" + e.join("|") + ")$", "i");
}
Jx([]);
var Yx = Jx([
	"@prefix",
	"@base",
	"a"
]), Xx = /[*+\-<>=&|]/;
function Zx(e, t) {
	var n = e.next();
	if (qx = null, n == "<" && !e.match(/^[\s\u00a0=]/, !1)) return e.match(/^[^\s\u00a0>]*>?/), "atom";
	if (n == "\"" || n == "'") return t.tokenize = Qx(n), t.tokenize(e, t);
	if (/[{}\(\),\.;\[\]]/.test(n)) return qx = n, null;
	if (n == "#") return e.skipToEnd(), "comment";
	if (Xx.test(n)) return e.eatWhile(Xx), null;
	if (n == ":") return "operator";
	if (e.eatWhile(/[_\w\d]/), e.peek() == ":") return "variableName.special";
	var r = e.current();
	return Yx.test(r) ? "meta" : n >= "A" && n <= "Z" ? "comment" : "keyword";
	var r;
}
function Qx(e) {
	return function(t, n) {
		for (var r = !1, i; (i = t.next()) != null;) {
			if (i == e && !r) {
				n.tokenize = Zx;
				break;
			}
			r = !r && i == "\\";
		}
		return "string";
	};
}
function $x(e, t, n) {
	e.context = {
		prev: e.context,
		indent: e.indent,
		col: n,
		type: t
	};
}
function e5(e) {
	e.indent = e.context.indent, e.context = e.context.prev;
}
var t5 = {
	name: "turtle",
	startState: function() {
		return {
			tokenize: Zx,
			context: null,
			indent: 0,
			col: 0
		};
	},
	token: function(e, t) {
		if (e.sol() && (t.context && t.context.align == null && (t.context.align = !1), t.indent = e.indentation()), e.eatSpace()) return null;
		var n = t.tokenize(e, t);
		if (n != "comment" && t.context && t.context.align == null && t.context.type != "pattern" && (t.context.align = !0), qx == "(") $x(t, ")", e.column());
		else if (qx == "[") $x(t, "]", e.column());
		else if (qx == "{") $x(t, "}", e.column());
		else if (/[\]\}\)]/.test(qx)) {
			for (; t.context && t.context.type == "pattern";) e5(t);
			t.context && qx == t.context.type && e5(t);
		} else qx == "." && t.context && t.context.type == "pattern" ? e5(t) : /atom|string|variable/.test(n) && t.context && (/[\}\]]/.test(t.context.type) ? $x(t, "pattern", e.column()) : t.context.type == "pattern" && !t.context.align && (t.context.align = !0, t.context.col = e.column()));
		return n;
	},
	indent: function(e, t, n) {
		var r = t && t.charAt(0), i = e.context;
		if (/[\]\}]/.test(r)) for (; i && i.type == "pattern";) i = i.prev;
		var a = i && r == i.type;
		return i ? i.type == "pattern" ? i.col : i.align ? i.col + +!a : i.indent + (a ? 0 : n.unit) : 0;
	},
	languageData: { commentTokens: { line: "#" } }
}, n5;
function r5(e) {
	return RegExp("^(?:" + e.join("|") + ")$", "i");
}
var i5 = r5(/* @__PURE__ */ "str.lang.langmatches.datatype.bound.sameterm.isiri.isuri.iri.uri.bnode.count.sum.min.max.avg.sample.group_concat.rand.abs.ceil.floor.round.concat.substr.strlen.replace.ucase.lcase.encode_for_uri.contains.strstarts.strends.strbefore.strafter.year.month.day.hours.minutes.seconds.timezone.tz.now.uuid.struuid.md5.sha1.sha256.sha384.sha512.coalesce.if.strlang.strdt.isnumeric.regex.exists.isblank.isliteral.a.bind".split(".")), a5 = r5(/* @__PURE__ */ "base.prefix.select.distinct.reduced.construct.describe.ask.from.named.where.order.limit.offset.filter.optional.graph.by.asc.desc.as.having.undef.values.group.minus.in.not.service.silent.using.insert.delete.union.true.false.with.data.copy.to.move.add.create.drop.clear.load.into".split(".")), o5 = /[*+\-<>=&|\^\/!\?]/, s5 = "[A-Za-z_\\-0-9]", c5 = /* @__PURE__ */ RegExp("[A-Za-z]"), l5 = RegExp("((" + s5 + "|\\.)*(" + s5 + "))?:");
function u5(e, t) {
	var n = e.next();
	if (n5 = null, n == "$" || n == "?") return n == "?" && e.match(/\s/, !1) ? "operator" : (e.match(/^[A-Za-z0-9_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][A-Za-z0-9_\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]*/), "variableName.local");
	if (n == "<" && !e.match(/^[\s\u00a0=]/, !1)) return e.match(/^[^\s\u00a0>]*>?/), "atom";
	if (n == "\"" || n == "'") return t.tokenize = f5(n), t.tokenize(e, t);
	if (/[{}\(\),\.;\[\]]/.test(n)) return n5 = n, "bracket";
	if (n == "#") return e.skipToEnd(), "comment";
	if (o5.test(n)) return "operator";
	if (n == ":") return d5(e), "atom";
	if (n == "@") return e.eatWhile(/[a-z\d\-]/i), "meta";
	if (c5.test(n) && e.match(l5)) return d5(e), "atom";
	e.eatWhile(/[_\w\d]/);
	var r = e.current();
	return i5.test(r) ? "builtin" : a5.test(r) ? "keyword" : "variable";
}
function d5(e) {
	e.match(/(\.(?=[\w_\-\\%])|[:\w_-]|\\[-\\_~.!$&'()*+,;=/?#@%]|%[a-f\d][a-f\d])+/i);
}
function f5(e) {
	return function(t, n) {
		for (var r = !1, i; (i = t.next()) != null;) {
			if (i == e && !r) {
				n.tokenize = u5;
				break;
			}
			r = !r && i == "\\";
		}
		return "string";
	};
}
function p5(e, t, n) {
	e.context = {
		prev: e.context,
		indent: e.indent,
		col: n,
		type: t
	};
}
function m5(e) {
	e.indent = e.context.indent, e.context = e.context.prev;
}
var h5 = {
	name: "sparql",
	startState: function() {
		return {
			tokenize: u5,
			context: null,
			indent: 0,
			col: 0
		};
	},
	token: function(e, t) {
		if (e.sol() && (t.context && t.context.align == null && (t.context.align = !1), t.indent = e.indentation()), e.eatSpace()) return null;
		var n = t.tokenize(e, t);
		if (n != "comment" && t.context && t.context.align == null && t.context.type != "pattern" && (t.context.align = !0), n5 == "(") p5(t, ")", e.column());
		else if (n5 == "[") p5(t, "]", e.column());
		else if (n5 == "{") p5(t, "}", e.column());
		else if (/[\]\}\)]/.test(n5)) {
			for (; t.context && t.context.type == "pattern";) m5(t);
			t.context && n5 == t.context.type && (m5(t), n5 == "}" && t.context && t.context.type == "pattern" && m5(t));
		} else n5 == "." && t.context && t.context.type == "pattern" ? m5(t) : /atom|string|variable/.test(n) && t.context && (/[\}\]]/.test(t.context.type) ? p5(t, "pattern", e.column()) : t.context.type == "pattern" && !t.context.align && (t.context.align = !0, t.context.col = e.column()));
		return n;
	},
	indent: function(e, t, n) {
		var r = t && t.charAt(0), i = e.context;
		if (/[\]\}]/.test(r)) for (; i && i.type == "pattern";) i = i.prev;
		var a = i && r == i.type;
		return i ? i.type == "pattern" ? i.col : i.align ? i.col + +!a : i.indent + (a ? 0 : n.unit) : 0;
	},
	languageData: { commentTokens: { line: "#" } }
}, $ = {
	PRE_SUBJECT: 0,
	WRITING_SUB_URI: 1,
	WRITING_BNODE_URI: 2,
	PRE_PRED: 3,
	WRITING_PRED_URI: 4,
	PRE_OBJ: 5,
	WRITING_OBJ_URI: 6,
	WRITING_OBJ_BNODE: 7,
	WRITING_OBJ_LITERAL: 8,
	WRITING_LIT_LANG: 9,
	WRITING_LIT_TYPE: 10,
	POST_OBJ: 11,
	ERROR: 12
};
function g5(e, t) {
	var n = e.location;
	e.location = n == $.PRE_SUBJECT && t == "<" ? $.WRITING_SUB_URI : n == $.PRE_SUBJECT && t == "_" ? $.WRITING_BNODE_URI : n == $.PRE_PRED && t == "<" ? $.WRITING_PRED_URI : n == $.PRE_OBJ && t == "<" ? $.WRITING_OBJ_URI : n == $.PRE_OBJ && t == "_" ? $.WRITING_OBJ_BNODE : n == $.PRE_OBJ && t == "\"" ? $.WRITING_OBJ_LITERAL : n == $.WRITING_SUB_URI && t == ">" || n == $.WRITING_BNODE_URI && t == " " ? $.PRE_PRED : n == $.WRITING_PRED_URI && t == ">" ? $.PRE_OBJ : n == $.WRITING_OBJ_URI && t == ">" || n == $.WRITING_OBJ_BNODE && t == " " || n == $.WRITING_OBJ_LITERAL && t == "\"" || n == $.WRITING_LIT_LANG && t == " " || n == $.WRITING_LIT_TYPE && t == ">" ? $.POST_OBJ : n == $.WRITING_OBJ_LITERAL && t == "@" ? $.WRITING_LIT_LANG : n == $.WRITING_OBJ_LITERAL && t == "^" ? $.WRITING_LIT_TYPE : t == " " && (n == $.PRE_SUBJECT || n == $.PRE_PRED || n == $.PRE_OBJ || n == $.POST_OBJ) ? n : n == $.POST_OBJ && t == "." ? $.PRE_SUBJECT : $.ERROR;
}
var _5 = {
	name: "ntriples",
	startState: function() {
		return {
			location: $.PRE_SUBJECT,
			uris: [],
			anchors: [],
			bnodes: [],
			langs: [],
			types: []
		};
	},
	token: function(e, t) {
		var n = e.next();
		if (n == "<") {
			g5(t, n);
			var r = "";
			return e.eatWhile(function(e) {
				return e != "#" && e != ">" && (r += e, !0);
			}), t.uris.push(r), e.match("#", !1) || (e.next(), g5(t, ">")), "variable";
		}
		if (n == "#") {
			var i = "";
			return e.eatWhile(function(e) {
				return e != ">" && e != " " && (i += e, !0);
			}), t.anchors.push(i), "url";
		}
		if (n == ">") return g5(t, ">"), "variable";
		if (n == "_") {
			g5(t, n);
			var a = "";
			return e.eatWhile(function(e) {
				return e != " " && (a += e, !0);
			}), t.bnodes.push(a), e.next(), g5(t, " "), "builtin";
		}
		if (n == "\"") return g5(t, n), e.eatWhile(function(e) {
			return e != "\"";
		}), e.next(), e.peek() != "@" && e.peek() != "^" && g5(t, "\""), "string";
		if (n == "@") {
			g5(t, "@");
			var o = "";
			return e.eatWhile(function(e) {
				return e != " " && (o += e, !0);
			}), t.langs.push(o), e.next(), g5(t, " "), "string.special";
		}
		if (n == "^") {
			e.next(), g5(t, "^");
			var s = "";
			return e.eatWhile(function(e) {
				return e != ">" && (s += e, !0);
			}), t.types.push(s), e.next(), g5(t, ">"), "variable";
		}
		n == " " && g5(t, n), n == "." && g5(t, n);
	}
}, v5 = class {
	_view = null;
	_languageCompartment = null;
	_editableCompartment = null;
	_readOnlyCompartment = null;
	_accessibilityCompartment = null;
	_onDirtyChange;
	_isDirty = !1;
	async initialize(e, t = "", n = "text/turtle", r = "dark", i, a) {
		this._view && this._view.destroy(), this._languageCompartment = new fc(), this._editableCompartment = new fc(), this._readOnlyCompartment = new fc(), this._accessibilityCompartment = new fc(), this._onDirtyChange = i, this._isDirty = !1;
		let o = await this._getLanguageExtension(n), s = Uc.create({
			doc: t,
			extensions: [
				r === "dark" ? Kx : Hx,
				W.theme({ "&": { minHeight: "6lh" } }),
				this._languageCompartment.of(o),
				this._editableCompartment.of(W.editable.of(!0)),
				this._readOnlyCompartment.of(Uc.readOnly.of(!1)),
				this._accessibilityCompartment.of(W.contentAttributes.of({
					...a?.label ? { "aria-label": a.label } : {},
					...a?.description ? { "aria-description": a.description } : {}
				})),
				W_(q_, { fallback: !0 }),
				Oh(),
				R1(),
				nh(),
				W.lineWrapping,
				W.updateListener.of((e) => {
					e.docChanged && !this._isDirty && (this._isDirty = !0, this._onDirtyChange?.(!0));
				}),
				Rm.of([
					Kv,
					...Gv,
					...r0
				])
			]
		});
		this._view = new W({
			state: s,
			parent: e
		});
	}
	destroy() {
		this._view?.destroy(), this._view = null, this._isDirty = !1;
	}
	getValue() {
		return this._view ? this._view.state.doc.toString() : "";
	}
	replaceContent(e) {
		this._view && this._view.state.doc.toString() !== e && this._view.dispatch({ changes: {
			from: 0,
			to: this._view.state.doc.length,
			insert: e
		} });
	}
	resetDirtyState() {
		this._isDirty = !1;
	}
	setReadOnly(e) {
		if (!this._view) return;
		let t = this._editableCompartment, n = this._readOnlyCompartment;
		t && n && this._view.dispatch({ effects: [t.reconfigure(W.editable.of(!e)), n.reconfigure(Uc.readOnly.of(e))] });
	}
	setAccessibility(e) {
		this._view && this._accessibilityCompartment && this._view.dispatch({ effects: this._accessibilityCompartment.reconfigure(W.contentAttributes.of({
			...e.label ? { "aria-label": e.label } : {},
			...e.description ? { "aria-description": e.description } : {}
		})) });
	}
	focusEditor() {
		this._view?.focus();
	}
	async setLanguage(e) {
		if (!this._view) return;
		let t = this._languageCompartment;
		if (!t) return;
		let n = await this._getLanguageExtension(e);
		this._view.dispatch({ effects: t.reconfigure(n) });
	}
	async _getLanguageExtension(e) {
		switch (e) {
			case "text/turtle":
			case "text/n3": return a1.define(t5);
			case "application/sparql-update":
			case "application/sparql-query": return a1.define(h5);
			case "application/nquads":
			case "application/n-quads":
			case "application/n-triples": return a1.define(_5);
			case "application/json":
			case "application/ld+json": return W6();
			case "text/html":
			case "application/xhtml+xml": return L6();
			case "text/markdown":
			case "text/x-markdown":
			case "text/md": return K8();
			case "application/rdf+xml":
			case "application/xml": return Px();
			case "text/css": return x2();
			case "text/javascript":
			case "application/javascript":
			case "application/ecmascript": return a6();
			default: return [];
		}
	}
}, y5 = typeof window < "u" ? window.document : null;
export { rt as S, ln as _, ds as a, Yt as b, os as c, Mo as d, xo as f, dn as g, ka as h, fs as i, qo as l, Fa as m, v5 as n, us as o, bo as p, ms as r, ls as s, y5 as t, No as u, nn as v, Xt as x, $t as y };

//# sourceMappingURL=src-OfP1LWkG.js.map