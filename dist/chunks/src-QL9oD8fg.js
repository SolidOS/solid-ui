import { C as e, D as t, E as n, F as r, H as i, N as a, O as o, R as s, S as c, T as l, _ as u, a as d, b as f, c as p, d as m, f as h, g, h as _, i as v, j as y, k as b, l as x, n as S, o as C, p as w, r as T, s as E, t as D, u as ee, v as O, w as te, x as ne, y as re, z as k } from "./index.esm-DcSx1Io1.js";
import { l as ie } from "./auth-gVmF5cc3.js";
import { a as ae, d as oe, l as se, m as ce, n as le, r as ue, s as de, t as A, u as j } from "./style-Dmilq1oC.js";
import { C as fe, D as pe, E as M, O as me, S as he, T as ge, _ as _e, b as N, c as ve, d as ye, f as be, g as xe, h as Se, i as Ce, l as we, m as Te, n as Ee, o as De, p as Oe, r as ke, s as Ae, t as je, u as Me, v as Ne, w as Pe, x as Fe, y as Ie } from "./widgets-qe0GoUXi.js";
import { x as Le } from "./components-E_0B75Q2.js";
import "./dialogs-B78Xz7vF.js";
//#region src/acl/acl.ts
var P = v.store;
function Re(t, n, r, i) {
	let a = _.acl, o = t.uri.slice(-1) === "/", s = P.each(void 0, a("default"), r, i).concat(P.each(void 0, a("defaultForNew"), r, i)).reduce((n, r) => n.concat(P.statementsMatching(r, _.rdf("type"), a("Authorization"), i)).concat(P.statementsMatching(r, a("agent"), void 0, i)).concat(P.statementsMatching(r, a("agentClass"), void 0, i)).concat(P.statementsMatching(r, a("agentGroup"), void 0, i)).concat(P.statementsMatching(r, a("origin"), void 0, i)).concat(P.statementsMatching(r, a("originClass"), void 0, i)).concat(P.statementsMatching(r, a("mode"), void 0, i)).concat(e(r, a("accessTo"), t, i)).concat(o ? e(r, a("default"), t, i) : []), []), l = re();
	return s.forEach((e) => l.add(u(e.subject), u(e.predicate), u(e.object), c(n.uri))), l;
	function u(e) {
		let t = i.uri.length;
		return c(e.uri.slice(0, t) === i.uri ? n.uri + e.uri.slice(t) : e.uri);
	}
}
function ze(e, t, n = P, r = !1) {
	let i = r ? s(n, _) : n.each(void 0, _.acl("accessTo"), e), a = _.acl, o = {
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
function Be(e, t) {
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
function Ve(e) {
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
function He(e, t) {
	let n = [], r = function(e) {
		e.length ? et(e.shift().doc(), function(i, a, o, s, c, l) {
			let u = !a;
			if (!i || !c || !l) return t(i, s);
			let d = u ? ze(c, l) : ze(o, s);
			n.push(d), r(e.slice(1));
		}) : t(!0, Ve(n));
	};
	r(e);
}
function Ue(e) {
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
function We(e, t, n, r) {
	return Ge(e, t, Ue(n), r);
}
function Ge(e, t, n, r, i, a) {
	let o = _.acl;
	for (let s in n) {
		let c = n[s];
		if (!c.length) continue;
		let l = s.split("\n"), u = l.map(function(e) {
			return e.split("#")[1];
		}).join("");
		a && !i && (u += "Default");
		let d = e.sym(r.uri + "#" + u);
		e.add(d, _.rdf("type"), o("Authorization"), r), i && e.add(d, o("accessTo"), t, r), a && e.add(d, o("default"), t, r);
		for (let t = 0; t < l.length; t++) e.add(d, o("mode"), e.sym(l[t]), r);
		for (let t = 0; t < c.length; t++) {
			let n = c[t][0], i = c[t][1];
			e.add(d, o(n), e.sym(i), r);
		}
	}
}
function Ke(e) {
	return qe(Ue(e));
}
function qe(e) {
	let t = "";
	for (let n in e) {
		let r = n.split("\n").map(function(e) {
			return e.split("#")[1][0];
		}).join("");
		t += r + ":";
		let i = e[n];
		for (let e = 0; e < i.length; e++) {
			let n = i[e][0], r = c(i[e][1]);
			t += n === "agent" ? "@" : "", t += r.sameTerm(_.foaf("Agent")) ? "*" : j(r), e < i.length - 1 && (t += ",");
		}
		t += ";";
	}
	return "{" + t.slice(0, -1) + "}";
}
function Je(e, t, n) {
	let r = re();
	return We(r, e, t, n), y(n, r, n.uri, "text/turtle") || "";
}
function Ye(e, t, n, r, i) {
	return Xe(e, t, Ue(n), r, i);
}
function Xe(e, t, n, r, i) {
	let a = re();
	Ge(a, t, n, r, !0), e.updater?.put(r, a.statementsMatching(void 0, void 0, void 0, r), "text/turtle", function(a, o, s) {
		o ? (e.fetcher?.unload(r), Ge(e, t, n, r, !0), e.fetcher.requested[r.uri] = "done", i(o)) : i(o, s);
	});
}
function Ze(e, t, n) {
	let r = P.each(void 0, _.vcard("hasMember"), e);
	r ? Qe(e, r, t, n) : (t("This card is in no groups"), n(!0));
}
function Qe(e, t, n, r) {
	n ||= M;
	let i = e.doc();
	et(i, function(a, o, s, c, l, u) {
		if (!a || !l || !u) return r(!1, c);
		let d = o ? ze(s, c) : ze(l, u);
		He(t, function(t, a) {
			if (!t) return r(!1, a);
			Be(a, d) ? n("Nice - same ACL. no change " + j(e) + " " + i) : (n("Group ACLs differ for " + j(e) + " " + i), Ye(P, s, a, c, r));
		});
	});
}
function $e(e, t, n) {
	let r = P.any(e, w);
	if (!P.fetcher) throw Error("Store has no fetcher");
	r ? P.fetcher.webOperation("PUT", r.value, {
		data: t,
		contentType: "text/turtle"
	}).then((e) => {
		n(e.ok, e.error || "");
	}) : P.fetcher.nowOrWhenFetched(e, void 0, function(r, i) {
		if (!r) return n(r, "Gettting headers for ACL: " + i);
		let a = P.any(e, w);
		if (!a) n(!1, "No Link rel=ACL header for " + e);
		else {
			if (!P.fetcher) throw Error("Store has no fetcher");
			P.fetcher.webOperation("PUT", a.value, {
				data: t,
				contentType: "text/turtle"
			}).then((e) => {
				n(e.ok, e.error || "");
			});
		}
	});
}
function et(e, t) {
	tt(e, function(n, r, i, a) {
		let o = _.acl;
		if (!n) return t(!1, !1, r, a);
		let s = function(n) {
			n.slice(-1) === "/" && (n = n.slice(0, -1));
			let r = n.lastIndexOf("/");
			if (n.indexOf("/", n.indexOf("//") + 2) > r) return t(!1, !0, 404, "Found no ACL resource");
			n = n.slice(0, r + 1);
			let a = c(n);
			tt(a, function(r, c, l) {
				return r ? c === 403 ? t(!1, !0, c, `( default ACL file FORBIDDEN. Stop.${n})`) : c === 404 ? s(n) : c === 200 ? P.each(void 0, o("default"), P.sym(n), l).concat(P.each(void 0, o("defaultForNew"), P.sym(n), l)).length ? t(!0, !1, e, i, P.sym(n), l) : s(n) : t(!1, !0, c, `Error status '${c}' searching for default for ${a}`) : t(!1, !0, c, `( No ACL pointer ${n} ${c})${l}`);
			});
		};
		if (!n) return t(!1, !1, r, `Error accessing Access Control information for ${e}) ${a}`);
		if (r === 404) s(e.uri);
		else if (r === 403) return t(!1, !1, r, `(Sharing not available to you)${a}`);
		else if (r !== 200) return t(!1, !1, r, `Error ${r} accessing Access Control information for ${e}: ${a}`);
		else return t(!0, !0, e, i);
	});
}
function tt(e, t) {
	if (!P.fetcher) throw Error("kb has no fetcher");
	P.fetcher.nowOrWhenFetched(e, void 0, function(n, r) {
		if (!n) return t(n, `Can't get headers to find ACL for ${e}: ${r}`);
		let i = P.any(e, w);
		if (!i) t(!1, 900, `No Link rel=ACL header for ${e}`);
		else {
			if (!P.fetcher) throw Error("kb has no fetcher");
			if (P.fetcher.nonexistent[i.value]) return t(!0, 404, i, `ACL file ${i} does not exist.`);
			P.fetcher.nowOrWhenFetched(i, void 0, function(e, n, r) {
				e ? t(!0, 200, i) : t(!0, r.status, i, `Can't read Access Control File ${i}: ${n}`);
			});
		}
	});
}
async function nt(e) {
	return new Promise((t, n) => et(c(e), (r, i, a, o, s) => r ? t(i ? a : s) : n(/* @__PURE__ */ Error(`Error loading ${e}`))));
}
//#endregion
//#region src/signup/config-default.js
var rt = {
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
function it(e) {
	this.config = e || rt;
}
it.prototype.listen = function() {
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
}, it.prototype.signup = function(e) {
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
var at = /* @__PURE__ */ i({
	ensureLoadedPreferences: () => ht,
	ensureLoadedProfile: () => gt,
	ensureLoggedIn: () => mt,
	filterAvailablePanes: () => Ot,
	findAppInstances: () => _t,
	getUserRoles: () => Dt,
	loginStatusBox: () => wt,
	newAppInstance: () => Et,
	registrationControl: () => yt,
	registrationList: () => xt,
	renderScopeHeadingRow: () => bt,
	renderSignInPopup: () => Ct,
	scopeLabel: () => vt,
	selectWorkspace: () => Tt
}), ot = v.store, { loadPreferences: st, loadProfile: ct } = v.profile, { getScopedAppInstances: lt, getRegistrations: ut, loadAllTypeIndexes: dt, getScopedAppsFromIndex: ft, deleteTypeIndexRegistration: pt } = v.typeIndex;
function mt(e) {
	let t = T.currentUser();
	return t ? (T.saveUser(t, e), Promise.resolve(e)) : new Promise((t) => {
		T.checkUser().then((n) => {
			if (n) return M(`logIn: Already logged in as ${n}`), t(e);
			if (!e.div || !e.dom) return t(e);
			let r = wt(e.dom, (n) => {
				T.saveUser(n, e), t(e);
			});
			e.div.appendChild(r);
		}).catch((n) => {
			if (M(`logIn: session check failed, showing login (${n})`), !e.div || !e.dom) return t(e);
			let r = wt(e.dom, (n) => {
				T.saveUser(n, e), t(e);
			});
			e.div.appendChild(r);
		});
	});
}
async function ht(e) {
	if (e.preferencesFile) return Promise.resolve(e);
	try {
		e = await gt(e);
		let t = await st(e.me);
		e.preferencesFile = t;
	} catch (t) {
		let n;
		if (t instanceof m) n = "Oops — you are not authenticated (properly logged in), so SolidOS cannot read your preferences file. Try logging out and then logging back in.", oe(n);
		else if (t instanceof E) return n = `Unauthorized: Assuming preference file blocked for origin ${window.location.origin}`, e.preferencesFileError = n, e;
		else if (t instanceof x) return n = "You are not authorized to read your preference file. This may be because you are using an untrusted web app.", me(n), e;
		else if (t instanceof C) return n = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", me(n), e;
		else if (t instanceof p) n = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", me(n);
		else if (t instanceof ee) n = `Strange: Error ${t.status} trying to read your preference file.${t.message}`, oe(n);
		else throw Error(`(via loadPrefs) ${t}`);
		e.preferencesFileError = n;
	}
	return e;
}
async function gt(e) {
	if (e.publicProfile) return e;
	try {
		let t = await mt(e);
		if (!t.me) throw Error("Could not log in");
		e.publicProfile = await ct(t.me);
	} catch (t) {
		throw e.div && e.dom && e.div.appendChild(Fe(e.dom, t.message)), Error(`Can't log in: ${t}`);
	}
	return e;
}
async function _t(e, t, n) {
	let r = e.me ? await lt(t, e.me) : [];
	return n === !0 ? r = r.filter((e) => e.scope.label === "public") : n === !1 && (r = r.filter((e) => e.scope.label === "private")), e.instances = r.map((e) => e.instance), e;
}
function vt(e, t) {
	return `${e.me && e.me.sameTerm(t.agent) ? "" : j(t.agent) + " "}${t.label}`;
}
async function yt(t, n, r) {
	function i(t) {
		let i = ut(n, r), a = i.length ? i[0] : Ce(t);
		return [e(a, _.solid("instance"), n, t), e(a, _.solid("forClass"), r, t)];
	}
	function a(e) {
		let n = i(e.index), r = `${vt(t, e)} link to this ${t.noun}`;
		return ke(t.dom, v.store, r, null, n, d, e.index);
	}
	let o = t.dom;
	if (!o || !t.div) throw Error("registrationControl: need dom and div");
	let s = o.createElement("div");
	t.div.appendChild(s), t.me = T.currentUser();
	let c = t.me;
	if (!c) return s.innerHTML = "<p style=\"margin:2em;\">(Log in to save a link to this)</p>", t;
	let l;
	try {
		l = await dt(c);
	} catch (e) {
		let n;
		return t.div && t.preferencesFileError ? (n = "(Lists of stuff not available)", t.div.appendChild(o.createElement("p")).textContent = n) : t.div && (n = `registrationControl: Type indexes not available: ${e}`, t.div.appendChild(Fe(t.dom, e))), M(n), t;
	}
	s.innerHTML = "<table><tbody></tbody></table>", s.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;");
	let u = s.children[0].children[0], d = new k();
	for (let e of l) u.appendChild(o.createElement("tr")).appendChild(a(e));
	return t;
}
function bt(e, t, n) {
	let r = {
		private: "#fee",
		public: "#efe"
	}, { dom: i } = e, a = vt(e, n), o = i.createElement("tr"), s = o.appendChild(i.createElement("td"));
	s.setAttribute("colspan", "3"), s.style.backgoundColor = r[n.label] || "white";
	let c = s.appendChild(i.createElement("h3"));
	return c.textContent = a + " links", c.style.textAlign = "left", o;
}
async function xt(e, t) {
	let n = e.dom, r = e.div, i = n.createElement("div");
	if (r.appendChild(i), e.me = T.currentUser(), !e.me) return i.innerHTML = "<p style=\"margin:2em;\">(Log in list your stuff)</p>", e;
	let a = await dt(e.me);
	i.innerHTML = "<table><tbody></tbody></table>", i.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid #eee 0.5em;");
	let o = i.firstChild.firstChild;
	for (let r of a) {
		let i = bt(e, ot, r);
		o.appendChild(i);
		let a = await ft(r, t.type || null);
		a.length === 0 && (i.style.display = "none");
		for (let e of a) {
			let t = xe(n, _.solid("instance"), e.instance, { deleteFunction: async () => {
				await pt(e), o.removeChild(t);
			} });
			t.children[0].style.paddingLeft = "3em", o.appendChild(t);
		}
	}
	return e;
}
function St(e, t, n = {}) {
	n ||= {};
	let r = n.buttonStyle || A.signInAndUpButtonStyle, i = e.createElement("div"), a = "SolidSignInOrSignUpBox";
	M("widgets.signInOrSignUpBox"), i.setUserCallback = t, i.setAttribute("class", a), i.setAttribute("style", "display:flex;");
	let o = e.createElement("input");
	i.appendChild(o), o.setAttribute("type", "button"), o.setAttribute("value", "Log in"), o.setAttribute("style", `${r}${A.headerBannerLoginInput}` + A.signUpBackground), S.events.on("login", () => {
		let t = T.currentUser();
		if (t) {
			let n = t.uri, r = e.getElementsByClassName(a);
			M(`Logged in, ${r.length} panels to be serviced`);
			for (let t = 0; t < r.length; t++) {
				let i = r[t];
				if (i.setUserCallback) try {
					i.setUserCallback(n);
					let e = i.parentNode;
					e && e.removeChild(i);
				} catch (t) {
					M(`## Error satisfying login box: ${t}`), i.appendChild(Fe(e, t));
				}
			}
		}
	}), o.addEventListener("click", () => {
		let n = h();
		if (n) return t(n.uri);
		Ct(e);
	}, !1);
	let s = e.createElement("input");
	return i.appendChild(s), s.setAttribute("type", "button"), s.setAttribute("value", "Sign Up for Solid"), s.setAttribute("style", `${r}${A.headerBannerLoginInput}` + A.signInBackground), s.addEventListener("click", function(e) {
		new it().signup().then(function(e) {
			M("signInOrSignUpBox signed up " + e), t(e);
		});
	}, !1), i;
}
function Ct(e) {
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
			v.store.updater.flagAuthorizationMetadata();
			let t = new URL(window.location.href).hash;
			t && window.localStorage.setItem("preLoginRedirectHash", t), window.localStorage.setItem("loginIssuer", e);
			let n = new URL(window.location.href);
			n.hash = "", await S.login(e, n.href);
		} catch (e) {
			oe(e.message);
		}
	}, s = e.createElement("div");
	s.setAttribute("style", "\n      border-bottom: 1px solid #DDD;\n      display: flex;\n      flex-direction: column;\n      padding-top: 10px;\n    ");
	let c = e.createElement("div");
	c.setAttribute("style", "\n      display: flex;\n      flex-direction: row;\n    ");
	let l = e.createElement("label");
	l.innerText = "Enter the URL of your identity provider:", l.setAttribute("style", "color: #888");
	let u = e.createElement("input");
	u.setAttribute("type", "text"), u.setAttribute("style", "margin-left: 0 !important; flex: 1; margin-right: 5px !important"), u.setAttribute("placeholder", "https://example.com"), u.value = typeof localStorage < "u" && localStorage.getItem("loginIssuer") || ie()[0]?.uri || "";
	let d = e.createElement("button");
	d.innerText = "Go", d.setAttribute("style", "margin-top: 12px; margin-bottom: 12px;"), d.addEventListener("click", () => {
		o(u.value);
	}), s.appendChild(l), c.appendChild(u), c.appendChild(d), s.appendChild(c), n.appendChild(s);
	let f = e.createElement("div");
	f.setAttribute("style", "\n      display: flex;\n      flex-direction: column;\n      padding-top: 10px;\n    ");
	let p = e.createElement("label");
	p.innerText = "Or pick an identity provider from the list below:", p.setAttribute("style", "color: #888"), f.appendChild(p), ie().forEach((t) => {
		let n = e.createElement("button");
		n.innerText = t.name, n.setAttribute("style", "height: 38px; margin-top: 10px"), n.addEventListener("click", () => {
			o(t.uri);
		}), f.appendChild(n);
	}), n.appendChild(f);
}
function wt(e, t = null, n = {}) {
	let r = h(), i = e.createElement("div");
	function a(e) {
		e && (r = T.saveUser(e), i.refresh(), t && t(r.uri));
	}
	function o(e) {
		let n = r;
		S.logout().then(function() {
			let e = `Your WebID was ${n}. It has been forgotten.`;
			r = null;
			try {
				oe(e);
			} catch {
				window.alert(e);
			}
			i.refresh(), t && t(null);
		}, (e) => {
			oe("Fail to log out:" + e);
		});
	}
	function s(t, n) {
		let r = n.buttonStyle || A.signInAndUpButtonStyle, i = "WebID logout";
		if (t) {
			let e = v.store.any(t, _.foaf("nick")) || v.store.any(t, _.foaf("name"));
			e && (i = "Logout " + e.value);
		}
		let a = e.createElement("input");
		return a.setAttribute("type", "button"), a.setAttribute("value", i), a.setAttribute("style", `${r}`), a.addEventListener("click", o, !1), a;
	}
	i.refresh = function() {
		let t = S.webId;
		r = t ? v.store.sym(t) : null, (r && i.me !== r.uri || !r && i.me) && (we(i), r ? i.appendChild(s(r, n)) : i.appendChild(St(e, a, n))), i.me = r ? r.uri : null;
	}, i.refresh();
	function c() {
		r = T.currentUser(), i.refresh();
	}
	return c(), S.events.on("login", c), S.events.on("logout", c), i.me = "99999", i.refresh(), i;
}
S.events.on("logout", async () => {
	let e = window.localStorage.getItem("loginIssuer");
	if (e) try {
		v.store.updater.flagAuthorizationMetadata();
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
function Tt(t, n, r) {
	let i = n.noun, a = n.appPathSegment, o = h(), s = t.createElement("div"), c = {
		me: o,
		dom: t,
		div: s
	};
	function l(e, n) {
		s.appendChild(Fe(t, e, n));
	}
	function u(e) {
		let t = v.store.any(e, _.space("uriPrefix")), n;
		return n = t ? t.value : e.uri.split("#")[0], n.slice(-1) !== "/" && (M(`${a}: No / at end of uriPrefix ${n}`), n = `${n}/`), n += `${a}/id${(/* @__PURE__ */ new Date()).getTime()}/`, n;
	}
	function d(n) {
		async function a(r) {
			let i = m.appendChild(t.createElement("tr")).appendChild(t.createElement("td"));
			i.setAttribute("colspan", "3"), i.style.padding = "0.5em";
			let a = encodeURI(await De(t, v.store, i, _.solid("URL"), _.space("Workspace"), "Workspace")), o = Ce(n.preferencesFile), s = [e(n.me, _.space("workspace"), o, n.preferencesFile), e(o, _.space("uriPrefix"), a, n.preferencesFile)];
			if (!v.store.updater) throw Error("store has no updater");
			await v.store.updater.update([], s);
		}
		let o = n.me, c = n.preferencesFile, d = null, f = v.store.each(o, _.space("workspace"), void 0, c), p = v.store.each(o, _.space("storage"));
		f.length === 0 && p && (l(`You don't seem to have any workspaces. You have ${p.length} storage spaces.`, "white"), p.map(function(e) {
			return f = f.concat(v.store.each(e, _.ldp("contains"))), f;
		}).filter((e) => e.id ? ["public", "private"].includes(e.id().toLowerCase()) : "")), f.length === 1 && (l(`Workspace used: ${f[0].uri}`, "white"), d = u(f[0]));
		let m = t.createElement("table");
		m.setAttribute("style", "border-collapse:separate; border-spacing: 0.5em;"), s.appendChild(m), s.appendChild(t.createElement("hr"));
		let h = s.appendChild(t.createElement("p"));
		h.setAttribute("style", A.commentStyle), h.textContent = `Where would you like to store the data for the ${i}?
    Give the URL of the folder where you would like the data stored.
    It can be anywhere in solid world - this URI is just an idea.`;
		let g = s.appendChild(t.createElement("input"));
		g.setAttribute("type", "text"), g.setAttribute("style", A.textInputStyle), g.size = 80, g.label = "base URL", g.autocomplete = "on", d && (g.value = d), n.baseField = g, s.appendChild(t.createElement("br"));
		let y = s.appendChild(t.createElement("button"));
		y.setAttribute("style", A.buttonStyle), y.textContent = `Start new ${i} at this URI`, y.addEventListener("click", function(e) {
			let t = g.value.replace(" ", "%20");
			t.slice(-1) !== "/" && (t += "/"), r(null, t);
		}), f = f.filter(function(e) {
			return !v.store.holds(e, _.rdf("type"), _.space("MasterWorkspace"));
		});
		let b, x, S, C, w, T, E, D = "height: 3em; margin: 1em; padding: 1em white; border-radius: 0.3em;", ee = `${D}border: 0px;`;
		for (let e = 0; e < f.length; e++) {
			w = f[e], C = t.createElement("tr"), e === 0 && (b = t.createElement("td"), b.setAttribute("rowspan", `${f.length}`), b.textContent = "Choose a workspace for this:", b.setAttribute("style", "vertical-align:middle;"), C.appendChild(b)), x = t.createElement("td"), T = v.store.anyValue(w, _.ui("style")), T ||= `color: black ; background-color: ${`#${(function(e) {
				return e.split("").reduce(function(e, t) {
					return e = (e << 5) - e + t.charCodeAt(0), e & e;
				}, 0);
			}(w.uri) & 16777215 | 12632256).toString(16)}`};`, x.setAttribute("style", ee + T), C.target = w.uri;
			let n = v.store.any(w, _.rdfs("label"));
			n ||= w.uri.split("/").slice(-1)[0] || w.uri.split("/").slice(-2)[0], x.textContent = n || "???", C.appendChild(x), e === 0 && (S = t.createElement("td"), S.setAttribute("rowspan", `${f.length}1`), S.setAttribute("style", "width:50%;"), C.appendChild(S)), m.appendChild(C), E = v.store.any(w, _.rdfs("comment")), E = E ? E.value : "Use this workspace", x.addEventListener("click", function(e) {
				S.textContent = E ? E.value : "", S.setAttribute("style", ee + T);
				let n = t.createElement("button");
				n.textContent = "Continue";
				let i = u(w);
				g.value = i, n.addEventListener("click", function(e) {
					n.disabled = !0, r(w, i), n.textContent = "---->";
				}, !0), S.appendChild(n);
			}, !0);
		}
		let O = t.createElement("tr");
		x = t.createElement("td"), x.setAttribute("style", D), x.textContent = "+ Make a new workspace", x.addEventListener("click", a), O.appendChild(x), m.appendChild(O);
	}
	return ht(c).then(d).catch((e) => {
		s.appendChild(Fe(c.dom, e));
	}), s;
}
function Et(e, t, n) {
	let r = function(e, t) {
		n(e, t);
	}, i = e.createElement("div"), a = e.createElement("button");
	return a.setAttribute("type", "button"), i.appendChild(a), a.innerHTML = `Make new ${t.noun}`, a.addEventListener("click", (n) => {
		i.appendChild(Tt(e, t, r));
	}, !1), i.appendChild(a), i;
}
async function Dt() {
	try {
		let { me: e, preferencesFile: t, preferencesFileError: n } = await ht({});
		if (!t || n) throw Error(n);
		return v.store.each(e, _.rdf("type"), null, t.doc());
	} catch (e) {
		me("Unable to fetch your preferences - this was the error: ", e);
	}
	return [];
}
async function Ot(e) {
	let t = await Dt();
	return e.filter((e) => kt(e, t));
}
function kt(e, t) {
	return (e.audience || []).reduce((e, n) => e && !!t.find((e) => e.equals(n)), !0);
}
//#endregion
//#region src/acl/add-agent-buttons.ts
var At = class {
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
		return Ae(this.groupList.controller.dom, `${N.iconBase}noun_34653_green.svg`, "Add ...", () => {
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
		return Ae(this.groupList.controller.dom, N.iconBase + Te["vcard:Individual"], "Add Person", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(_.vcard("Individual"), "person").then((e) => this.addPerson(e)).then(() => this.renderCleanup()).catch((e) => this.groupList.controller.renderStatus(e));
		});
	}
	renderGroupButton() {
		return Ae(this.groupList.controller.dom, N.iconBase + Te["vcard:Group"], "Add Group", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(_.vcard("Group"), "group").then((e) => this.addGroup(e)).then(() => this.renderCleanup()).catch((e) => this.groupList.controller.renderStatus(e));
		});
	}
	renderNameForm(e, t) {
		return De(this.groupList.controller.dom, this.groupList.store, this.barElement, _.vcard("URI"), e, t);
	}
	renderPublicButton() {
		return Ae(this.groupList.controller.dom, N.iconBase + Te["foaf:Agent"], "Add Everyone", () => this.addAgent(_.foaf("Agent").uri).then(() => this.groupList.controller.renderTemporaryStatus("Adding the general public to those who can read. Drag the globe to a different level to give them more access.")).then(() => this.renderCleanup()));
	}
	renderAuthenticatedAgentButton() {
		return Ae(this.groupList.controller.dom, `${N.iconBase}noun_99101.svg`, "Anyone logged In", () => this.addAgent(_.acl("AuthenticatedAgent").uri).then(() => this.groupList.controller.renderTemporaryStatus("Adding anyone logged in to those who can read. Drag the ID icon to a different level to give them more access.")).then(() => this.renderCleanup()));
	}
	renderBotButton() {
		return Ae(this.groupList.controller.dom, N.iconBase + "noun_Robot_849764.svg", "A Software Agent (bot)", (e) => {
			this.renderSimplifiedBar(e.target), this.renderNameForm(_.schema("Application"), "bot").then((e) => this.addBot(e)).then(() => this.renderCleanup());
		});
	}
	renderAppsButton() {
		return Ae(this.groupList.controller.dom, `${N.iconBase}noun_15177.svg`, "A Web App (origin)", (e) => {
			this.renderSimplifiedBar(e.target);
			let t = {
				div: this.barElement,
				dom: this.groupList.controller.dom
			}, n = this.renderAppsTable(t).catch((e) => this.groupList.controller.renderStatus(e));
			this.renderAppsView();
			let r = this.renderNameForm(_.schema("WebApplication"), "webapp domain").then((e) => this.getOriginFromName(e));
			Promise.race([n, r]).then((e) => {
				e && this.groupList.addNewURI(e);
			}).then(() => this.renderCleanup());
		});
	}
	renderAppsView() {
		let e = this.groupList.controller.context.session.paneRegistry.byName("trustedApplications");
		if (e) {
			let t = e.render(null, this.groupList.controller.context);
			t.setAttribute("style", A.trustedAppController);
			let n = ve(this.groupList.controller.dom, () => this.renderCleanup());
			n.setAttribute("style", A.trustedAppCancelButton), t.insertBefore(n, t.firstChild), this.barElement.appendChild(t);
		}
	}
	async renderAppsTable(e) {
		await gt(e);
		let t = this.groupList.store.each(e.me, _.acl("trustedApp")), n = t.flatMap((e) => this.groupList.store.each(e, _.acl("origin")));
		return this.barElement.appendChild(this.groupList.controller.dom.createElement("p")).textContent = `You have ${n.length} selected web apps.`, new Promise((e, n) => {
			let r = this.barElement.appendChild(this.groupList.controller.dom.createElement("table"));
			r.setAttribute("style", A.trustedAppAddApplicationsTable), t.forEach((t) => {
				let i = this.groupList.store.any(t, _.acl("origin"));
				i || n(/* @__PURE__ */ Error(`Unable to pick app: ${t.value}`));
				let a = xe(this.groupList.controller.dom, _.acl("origin"), i, {}), o = this.groupList.controller.dom.createElement("table"), s = o.appendChild(this.groupList.controller.dom.createElement("tr"));
				s.appendChild(this.groupList.controller.dom.createElement("td")).appendChild(a);
				let c = s.appendChild(this.groupList.controller.dom.createElement("td"));
				c.textContent = `Give access to ${this.groupList.controller.noun} ${j(this.groupList.controller.subject)}?`, s.appendChild(this.groupList.controller.dom.createElement("td")).appendChild(ye(this.groupList.controller.dom, () => e(i.value))), r.appendChild(o);
			});
		});
	}
	renderCleanup() {
		this.renderBar(), this.groupList.render();
	}
	async addPerson(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		M(`Adding to ACL person: ${e}`), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addGroup(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		M("Adding to ACL group: " + e), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addAgent(e) {
		await this.groupList.addNewURI(e), this.toggleBar();
	}
	async addBot(e) {
		if (!e) return this.toggleBar();
		if (!e.match(/^https?:/i)) return Promise.reject(/* @__PURE__ */ Error("Not a http URI"));
		M("Adding to ACL bot: " + e), await this.groupList.addNewURI(e), this.toggleBar();
	}
	async getOriginFromName(e) {
		if (!e) return Promise.resolve();
		if (!e.match(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i)) return Promise.reject(/* @__PURE__ */ Error("Not a domain name"));
		let t = "https://" + e;
		return M("Adding to ACL origin: " + t), this.toggleBar(), t;
	}
	toggleBar() {
		this.isExpanded = !this.isExpanded;
	}
}, jt = _.acl, Mt = {
	13: "Owners",
	9: "Owners (write locked)",
	5: "Editors",
	3: "Posters",
	2: "Submitters",
	1: "Viewers"
}, Nt = {
	13: !0,
	5: !0,
	3: !0,
	2: !0,
	1: !0
}, Pt = {
	13: "can read, write, and control sharing.",
	9: "can read and control sharing, currently write-locked.",
	5: "can read and change information",
	3: "can add new information, and read but not change existing information",
	2: "can add new information but not read any",
	1: "can read but not change information"
}, Ft = class {
	defaults;
	byCombo;
	aclMap;
	addAgentButton;
	rootElement;
	_store;
	constructor(e, t, n, r, i = {}) {
		this.doc = e, this.aclDoc = t, this.controller = n, this._options = i, this.defaults = this._options.defaults || !1, this._store = r, this.aclMap = ze(e, t, r, this.defaults), this.byCombo = Ue(this.aclMap), this.addAgentButton = new At(this), this.rootElement = this.controller.dom.createElement("div"), this.rootElement.setAttribute("style", A.accessGroupList);
	}
	get store() {
		return this._store;
	}
	set store(e) {
		this._store = e, this.aclMap = ze(this.doc, this.aclDoc, e, this.defaults), this.byCombo = Ue(this.aclMap);
	}
	render() {
		return this.rootElement.innerHTML = "", this.renderGroups().forEach((e) => this.rootElement.appendChild(e)), this.controller.isEditable && this.rootElement.appendChild(this.addAgentButton.render()), this.rootElement;
	}
	renderGroups() {
		let e = [];
		for (let t = 15; t > 0; t--) {
			let n = It(t);
			(this.controller.isEditable && Nt[t] || this.byCombo[n]) && e.push(this.renderGroup(t, n));
		}
		return e;
	}
	renderGroup(e, t) {
		let n = this.controller.dom.createElement("div");
		return n.setAttribute("style", A.accessGroupListItem), fe(n, (e) => this.handleDroppedUris(e, t).then(() => this.controller.render()).catch((e) => this.controller.renderStatus(e))), this.renderGroupElements(e, t).forEach((e) => n.appendChild(e)), n;
	}
	renderGroupElements(e, t) {
		let n = this.controller.dom.createElement("div");
		if (n.setAttribute("style", A.group), this.controller.isEditable) switch (e) {
			case 1:
				n.setAttribute("style", A.group1);
				break;
			case 2:
				n.setAttribute("style", A.group2);
				break;
			case 3:
				n.setAttribute("style", A.group3);
				break;
			case 5:
				n.setAttribute("style", A.group5);
				break;
			case 9:
				n.setAttribute("style", A.group9);
				break;
			case 13:
				n.setAttribute("style", A.group13);
				break;
			default: n.setAttribute("style", A.group);
		}
		n.innerText = Mt[e] || Lt(e);
		let r = this.controller.dom.createElement("div");
		if (r.setAttribute("style", A.group), this.controller.isEditable) switch (e) {
			case 1:
				r.setAttribute("style", A.group1);
				break;
			case 2:
				r.setAttribute("style", A.group2);
				break;
			case 3:
				r.setAttribute("style", A.group3);
				break;
			case 5:
				r.setAttribute("style", A.group5);
				break;
			case 9:
				r.setAttribute("style", A.group9);
				break;
			case 13:
				r.setAttribute("style", A.group13);
				break;
			default: r.setAttribute("style", A.group);
		}
		let i = r.appendChild(this.controller.dom.createElement("table"));
		(this.byCombo[t] || []).map(([e, n]) => this.renderAgent(i, t, e, n)).forEach((e) => i.appendChild(e));
		let a = this.controller.dom.createElement("div");
		if (a.setAttribute("style", A.group), this.controller.isEditable) switch (e) {
			case 1:
				a.setAttribute("style", A.group1);
				break;
			case 2:
				a.setAttribute("style", A.group2);
				break;
			case 3:
				a.setAttribute("style", A.group3);
				break;
			case 5:
				a.setAttribute("style", A.group5);
				break;
			case 9:
				a.setAttribute("style", A.group9);
				break;
			case 13:
				a.setAttribute("style", A.group13);
				break;
			default: a.setAttribute("style", A.group);
		}
		return a.innerText = Pt[e] || "Unusual combination", [
			n,
			r,
			a
		];
	}
	renderAgent(e, t, n, r) {
		let i = xe(this.controller.dom, jt(n), c(r), this.controller.isEditable ? { deleteFunction: () => this.deleteAgent(t, n, r).then(() => e.removeChild(i)).catch((e) => this.controller.renderStatus(e)) } : {});
		return i;
	}
	async deleteAgent(e, t, n) {
		let r = this.byCombo[e] || [], i = r.find(([e, r]) => e === t && r === n);
		i && r.splice(r.indexOf(i), 1), await this.controller.save();
	}
	async addNewURI(e) {
		await this.handleDroppedUri(e, It(1)), await this.controller.save();
	}
	async handleDroppedUris(e, t) {
		try {
			await Promise.all(e.map((e) => this.handleDroppedUri(e, t))), await this.controller.save();
		} catch (e) {
			return Promise.reject(e);
		}
	}
	async handleDroppedUri(e, t, n = !1) {
		let r = Rt(e, this.store), i = c(e);
		if (!r && !n) {
			M(`   Not obvious: looking up dropped thing ${i}`);
			try {
				await this._store?.fetcher?.load(i.doc());
			} catch (e) {
				let t = `Ignore error looking up dropped thing: ${e}`;
				return ge(t), Promise.reject(Error(t));
			}
			return this.handleDroppedUri(e, t, !0);
		}
		if (!r) {
			let t = Object.keys(this.store.findTypeURIs(i)), n = t.length > 0 ? `Detected RDF types: ${t.join(", ")}` : "No RDF type was detected for this URI.", r = `Error: Failed to add access target: ${e} is not a recognized ACL target type. Expected one of: vcard:WebID, vcard:Group, foaf:Person, foaf:Agent, solid:AppProvider, solid:AppProviderClass, or recognized ACL classes. Hint: try dropping a WebID profile URI, a vcard:Group URI, or a web app origin.` + n;
			return ge(r), Promise.reject(Error(r));
		}
		this.setACLCombo(t, e, r, this.controller.subject);
	}
	setACLCombo(e, t, n, r) {
		e in this.byCombo || (this.byCombo[e] = []), this.removeAgentFromCombos(t), this.byCombo[e].push([n.pred, n.obj.uri]), M(`ACL: setting access to ${r} by ${n.pred}: ${n.obj}`);
	}
	removeAgentFromCombos(e) {
		for (let t = 0; t < 16; t++) {
			let n = this.byCombo[It(t)];
			if (n) for (let t = 0; t < n.length; t++) for (; t < n.length && n[t][1] === e;) n.splice(t, 1);
		}
	}
};
function It(e) {
	let t = [
		"Read",
		"Append",
		"Write",
		"Control"
	], n = [];
	for (let r = 0; r < 4; r++) e & 1 << r && n.push("http://www.w3.org/ns/auth/acl#" + t[r]);
	return n.sort(), n.join("\n");
}
function Lt(e) {
	let t = "", n = [
		"Read",
		"Append",
		"Write",
		"Control"
	];
	for (let r = 0; r < 4; r++) e & 1 << r && (t += n[r]);
	return t;
}
function Rt(e, t) {
	let n = c(e), r = t.findTypeURIs(n);
	for (let e in r) M("    drop object type includes: " + e);
	if (e.startsWith("http") && e.split("/").length === 3) return {
		pred: "origin",
		obj: n
	};
	if (e.startsWith("http") && e.split("/").length === 4 && e.endsWith("/")) return M("Assuming final slash on dragged origin URI was unintended!"), {
		pred: "origin",
		obj: c(e.slice(0, -1))
	};
	if (_.vcard("WebID").uri in r) return {
		pred: "agent",
		obj: n
	};
	if (_.vcard("Group").uri in r) return {
		pred: "agentGroup",
		obj: n
	};
	if (n.sameTerm(_.foaf("Agent")) || n.sameTerm(_.acl("AuthenticatedAgent")) || n.sameTerm(_.rdf("Resource")) || n.sameTerm(_.owl("Thing"))) return {
		pred: "agentClass",
		obj: n
	};
	if (_.vcard("Individual").uri in r || _.foaf("Person").uri in r || _.foaf("Agent").uri in r) {
		let e = t.any(n, _.foaf("preferredURI"));
		return e ? {
			pred: "agent",
			obj: c(e)
		} : {
			pred: "agent",
			obj: n
		};
	}
	return _.solid("AppProvider").uri in r ? {
		pred: "origin",
		obj: n
	} : _.solid("AppProviderClass").uri in r ? {
		pred: "originClass",
		obj: n
	} : (M("    Triage fails for " + e), null);
}
//#endregion
//#region src/acl/access-controller.ts
var zt = class {
	mainCombo;
	defaultsCombo;
	isContainer;
	defaultsDiffer;
	rootElement;
	isUsingDefaults;
	constructor(e, t, n, r, i, a, o, s, c, l, u, d) {
		if (this.subject = e, this.noun = t, this.context = n, this.statusElement = r, this.targetIsProtected = i, this.targetDoc = a, this.targetACLDoc = o, this.defaultHolder = s, this.defaultACLDoc = c, this.prospectiveDefaultHolder = l, this.store = u, this.dom = d, this.rootElement = d.createElement("div"), this.rootElement.setAttribute("style", A.aclGroupContent), this.isContainer = a.uri.slice(-1) === "/", s && c) {
			this.isUsingDefaults = !0;
			let e = Re(this.targetDoc, o, s, c);
			this.mainCombo = new Ft(a, o, this, e, { defaults: this.isContainer }), this.defaultsCombo = null, this.defaultsDiffer = !1;
		} else this.isUsingDefaults = !1, this.mainCombo = new Ft(a, o, this, u), this.defaultsCombo = new Ft(a, o, this, u, { defaults: this.isContainer }), this.defaultsDiffer = !Be(this.mainCombo.aclMap, this.defaultsCombo.aclMap);
	}
	get isEditable() {
		return !this.isUsingDefaults;
	}
	render() {
		if (this.rootElement.innerHTML = "", this.isUsingDefaults) {
			if (this.renderStatus(`The sharing for this ${this.noun} is the default for folder `), this.defaultHolder) {
				let e = this.statusElement.appendChild(this.dom.createElement("a"));
				e.href = this.defaultHolder.uri, e.innerText = Gt(this.defaultHolder);
			}
		} else !this.defaultsDiffer && this.isContainer ? this.renderStatus("This is also the default for things in this folder.") : this.renderStatus("");
		return this.rootElement.appendChild(this.mainCombo.render()), this.defaultsCombo && this.defaultsDiffer ? (this.rootElement.appendChild(this.renderRemoveDefaultsController()), this.rootElement.appendChild(this.defaultsCombo.render())) : this.isEditable && this.isContainer && this.rootElement.appendChild(this.renderAddDefaultsController()), !this.targetIsProtected && this.isUsingDefaults ? this.rootElement.appendChild(this.renderAddAclsController()) : this.targetIsProtected || this.rootElement.appendChild(this.renderRemoveAclsController()), this.rootElement;
	}
	renderRemoveAclsController() {
		let e = this.dom.createElement("button");
		return e.innerText = `Remove custom sharing settings for this ${this.noun} -- just use default${this.prospectiveDefaultHolder ? ` for ${j(this.prospectiveDefaultHolder)}` : ""}`, e.setAttribute("style", A.bigButton), e.addEventListener("click", () => this.removeAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderAddAclsController() {
		let e = this.dom.createElement("button");
		return e.innerText = `Set specific sharing for this ${this.noun}`, e.setAttribute("style", A.bigButton), e.addEventListener("click", () => this.addAcls().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderAddDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", A.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Sharing for things within the folder currently tracks sharing for the folder.", t.setAttribute("style", A.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set the sharing of folder contents separately from the sharing for the folder", n.setAttribute("style", A.bigButton), n.addEventListener("click", () => this.addDefaults().then(() => this.render())), e;
	}
	renderRemoveDefaultsController() {
		let e = this.dom.createElement("div");
		e.setAttribute("style", A.defaultsController);
		let t = e.appendChild(this.dom.createElement("div"));
		t.innerText = "Access to things within this folder:", t.setAttribute("style", A.defaultsControllerNotice);
		let n = e.appendChild(this.dom.createElement("button"));
		return n.innerText = "Set default for folder contents to just track the sharing for the folder", n.setAttribute("style", A.bigButton), n.addEventListener("click", () => this.removeDefaults().then(() => this.render()).catch((e) => this.renderStatus(e))), e;
	}
	renderTemporaryStatus(e) {
		this.statusElement.setAttribute("style", A.aclControlBoxStatusRevealed), this.statusElement.innerText = e, this.statusElement.setAttribute("style", A.temporaryStatusInit), setTimeout(() => {
			this.statusElement.setAttribute("style", A.temporaryStatusEnd);
		}), setTimeout(() => {
			this.statusElement.innerText = "";
		}, 5e3);
	}
	renderStatus(e) {
		e || this.statusElement.setAttribute("style", A.aclControlBoxStatusRevealed), this.statusElement.innerText = e;
	}
	async addAcls() {
		if (!this.defaultHolder || !this.defaultACLDoc) {
			let e = "Unable to find defaults to copy";
			return ge(e), Promise.reject(e);
		}
		Re(this.targetDoc, this.targetACLDoc, this.defaultHolder, this.defaultACLDoc).statements.forEach((e) => this.store.add(e.subject, e.predicate, e.object, this.targetACLDoc));
		try {
			return await this.store.fetcher.putBack(this.targetACLDoc), this.isUsingDefaults = !1, Promise.resolve();
		} catch (e) {
			let t = ` Error writing back access control file! ${e}`;
			return ge(t), Promise.reject(t);
		}
	}
	async addDefaults() {
		this.defaultsCombo = new Ft(this.targetDoc, this.targetACLDoc, this, this.store, { defaults: !0 }), this.defaultsDiffer = !0;
	}
	async removeAcls() {
		try {
			await this.store.fetcher.delete(this.targetACLDoc.uri, {}), this.isUsingDefaults = !0;
			try {
				this.prospectiveDefaultHolder = await nt(this.targetDoc.uri);
			} catch (e) {
				me(e);
			}
		} catch (e) {
			let t = `Error deleting access control file: ${this.targetACLDoc}: ${e}`;
			return ge(t), Promise.reject(t);
		}
	}
	async removeDefaults() {
		let e = this.defaultsCombo;
		try {
			this.defaultsCombo = null, this.defaultsDiffer = !1, await this.save();
		} catch (t) {
			return this.defaultsCombo = e, this.defaultsDiffer = !0, ge(t), Promise.reject(t);
		}
	}
	save() {
		let e = re();
		this.isContainer ? this.defaultsCombo && this.defaultsDiffer ? (Ge(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), Ge(e, this.targetDoc, this.defaultsCombo.byCombo, this.targetACLDoc, !1, !0)) : Ge(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0, !0) : Ge(e, this.targetDoc, this.mainCombo.byCombo, this.targetACLDoc, !0), e.fetcher = u(e, { fetch: this.store.fetcher._fetch });
		let t = e.updater || new n(e);
		return new Promise((n, r) => {
			t.put(this.targetACLDoc, e.statementsMatching(void 0, void 0, void 0, this.targetACLDoc), "text/turtle", (t, i, a) => {
				if (!i) return r(/* @__PURE__ */ Error(`ACL file save failed: ${a}`));
				this.store.fetcher.unload(this.targetACLDoc), this.store.add(e.statements), this.store.fetcher.requested[this.targetACLDoc.uri] = "done", this.mainCombo.store = this.store, this.defaultsCombo && (this.defaultsCombo.store = this.store), this.defaultsDiffer = !!this.defaultsCombo && !Be(this.mainCombo.aclMap, this.defaultsCombo.aclMap), M("ACL modification: success!"), n();
			});
		});
	}
}, Bt = window, Vt = Symbol("prevent double triggering of drop event");
function Ht(e) {
	if (M("preventBrowserDropEvents called."), Bt !== void 0) {
		if (Bt[Vt]) return;
		Bt[Vt] = !0;
	}
	e.addEventListener("drop", Wt, !1), e.addEventListener("dragenter", Ut, !1), e.addEventListener("dragover", Ut, !1);
}
function Ut(e) {
	e.stopPropagation(), e.preventDefault();
}
function Wt(e) {
	e.dataTransfer.files.length > 0 && (Bt.confirm("Are you sure you want to drop this file here? (Cancel opens it in a new tab)") || (e.stopPropagation(), e.preventDefault(), M("@@@@ document-level DROP suppressed: " + e.dataTransfer.dropEffect)));
}
function Gt(e) {
	let t = e.uri;
	t.slice(-1) === "/" && (t = t.slice(0, -1));
	let n = t.lastIndexOf("/");
	return n >= 0 && (t = t.slice(n + 1)), t || "/";
}
function Kt(e, t, n, r) {
	let i = t.dom, a = e.doc(), o = i.createElement("div");
	o.setAttribute("style", A.aclControlBoxContainer);
	let s = o.appendChild(i.createElement("h1"));
	s.textContent = `Sharing for ${n} ${j(e)}`, s.setAttribute("style", A.aclControlBoxHeader);
	let c = o.appendChild(i.createElement("div"));
	c.setAttribute("style", A.aclControlBoxStatus);
	try {
		qt(a, r, e, n, t, i, c).then((e) => o.appendChild(e.render()));
	} catch (e) {
		c.innerText = e;
	}
	return o;
}
async function qt(e, t, n, r, i, a, o) {
	return new Promise((s, c) => et(e, async (e, l, u, d, f, p) => {
		if (!e) return c(/* @__PURE__ */ Error(`Error reading ${l ? "" : " default "}ACL. status ${u}: ${d}`));
		let m = Jt(u), h = Yt(u, d, t) || Xt(u);
		if (!h && m) try {
			return s(g(await nt(m)));
		} catch (e) {
			me(e);
		}
		return s(g());
		function g(e) {
			return new zt(n, r, i, o, h, u, d, f, p, e, t, a);
		}
	}));
}
function Jt(e) {
	let t = e.uri.split("#")[0], n = t.slice(0, -1).lastIndexOf("/"), r = t.indexOf("//");
	return r >= 0 && n < r + 2 || n < 0 ? null : t.slice(0, n + 1);
}
function Yt(e, t, n) {
	return n.holds(e, _.rdf("type"), _.space("Storage"), t);
}
function Xt(e) {
	return e.uri === e.site().uri;
}
//#endregion
//#region src/acl/index.ts
var Zt = {
	adoptACLDefault: Re,
	readACL: ze,
	sameACL: Be,
	ACLunion: Ve,
	loadUnionACL: He,
	ACLbyCombination: Ue,
	makeACLGraph: We,
	makeACLGraphbyCombo: Ge,
	ACLToString: Ke,
	comboToString: qe,
	makeACLString: Je,
	putACLObject: Ye,
	putACLbyCombo: Xe,
	fixIndividualCardACL: Ze,
	fixIndividualACL: Qe,
	setACL: $e,
	getACLorDefault: et,
	getACL: tt
}, Qt = {
	preventBrowserDropEvents: Ht,
	shortNameForFolder: Gt,
	ACLControlBox5: Kt
}, $t = v.store;
function en(e, t, n) {
	let r = e.dom, i = e.div;
	if (e.me && !e.me.uri) throw Error("newThingUI:  Invalid userid: " + e.me);
	let a = "padding: 0.7em; width: 2em; height: 2em;", o = i.appendChild(r.createElement("img")), s = !1;
	o.setAttribute("src", N.iconBase + "noun_34653_green.svg"), o.setAttribute("style", a), o.setAttribute("title", "Add another tool");
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
				gt(e).then((e) => {
					let s = Object.assign({
						newBase: o,
						folder: n.folder || void 0,
						workspace: i
					}, n);
					for (let e in n) s[e] = n[e];
					M(`newThingUI: Minting new ${s.pane.name} at ${s.newBase}`), n.pane.mintNew(t, s).then(function(e) {
						if (!e || !e.newInstance) throw Error("Cannot mint new - missing newInstance");
						if (e.folder) {
							let t = e.newInstance.uri.slice(e.folder.uri.length).includes("/");
							M("  new thing is packge? " + t), t ? $t.add(e.folder, _.ldp("contains"), $t.sym(e.newBase), e.folder.doc()) : $t.add(e.folder, _.ldp("contains"), e.newInstance, e.folder.doc()), e.refreshTarget && e.refreshTarget.refresh && e.refreshTarget.refresh();
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
			n.noun = l.mintClass ? j(l.mintClass) : l.name, n.appPathSegment = n.noun.slice(0, 1).toUpperCase() + n.noun.slice(1), n.folder ? De(r, $t, n.div, _.foaf("name"), null, n.noun).then(function(e) {
				if (!e) d();
				else {
					let t = n.folder.uri;
					t.endsWith("/") || (t += "/"), t = t + encodeURIComponent(e) + "/", s(null, t);
				}
			}) : (o = Tt(r, {
				noun: n.noun,
				appPathSegment: n.appPathSegment
			}, s), n.div.appendChild(o));
		});
	}
	let p = [], m = Object.values(n).filter((e) => e.mintNew), h = m.reduce((e, t) => (t.mintClass && (e[t.mintClass.uri] = (e[t.mintClass.uri] || 0) + 1), e), {});
	m.forEach((t) => {
		let n = e.div.appendChild(r.createElement("img"));
		n.setAttribute("src", t.icon);
		let i = t.mintClass ? h[t.mintClass.uri] > 1 ? `${j(t.mintClass)} (using ${t.name} pane)` : j(t.mintClass) : t.name + " @@";
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
//#endregion
//#region src/create/index.ts
var tn = { newThingUI: en }, nn = v.store;
function rn(e, t, n, r, i, a, o) {
	let s = e.createElement("table"), c = e.createElement("tr");
	c.appendChild(e.createElement("td")).setAttribute("class", "MatrixCorner"), s.appendChild(c), s.lastHeader = c;
	let l = [], u = [], d = function(e, t, n, r) {
		for (; e.firstChild;) e.removeChild(e.firstChild);
		e.setAttribute("style", ""), e.style.textAlign = "center", a.cellFunction ? a.cellFunction(e, t, n, r) : (e.textContent = j(r), e.setAttribute("style", "padding: 0.3em")), delete e.old;
	}, f = function(t) {
		let n = t.toNT();
		if (u[n]) return u[n];
		let r = e.createElement("tr"), i = r.appendChild(e.createElement("td"));
		i.setAttribute("style", "padding: 0.3em;"), i.textContent = j(t), t.termType === "NamedNode" && nn.fetcher.nowOrWhenFetched(t.uri.split("#")[0], void 0, function(e, n, r) {
			e && (i.textContent = j(t));
		});
		for (let n = 0; n < l.length; n++) d(r.appendChild(e.createElement("td")), O(l[n]), t, null);
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
			if (a.style.textAlign = "center", n === s.firstChild ? a.textContent = j(t) : d(a, t, O(i), null), r === l.length - 1) n.appendChild(a);
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
				let n = O(e.dataValueNT), r = O(l[i - 1]);
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
		m(), nn.query(t, g, void 0, h);
	};
	let g = function(e) {
		let t = e[n.toString()], a = e[r.toString()], o = e[i.toString()], s = f(a), c = p(t), l = s.children[c + 1];
		d(l, t, a, o);
	};
	if (a.set_y) for (let e = 0; e < a.set_y.length; e++) f(a.set_y[e]);
	if (a.set_x) for (let e = 0; e < a.set_x.length; e++) p(a.set_x[e]);
	return nn.query(t, g, void 0, o), s;
}
//#endregion
//#region src/matrix/index.ts
var an = { matrixForQuery: rn }, on = N.iconBase + "noun_Camera_1618446_000000.svg", sn = N.iconBase + "noun_479395.svg", cn = "image/png";
function ln(e, t, n, r) {
	let i = e.createElement("div"), a, o, s, c, l = i.appendChild(e.createElement("table")), u = l.appendChild(e.createElement("tr")).appendChild(e.createElement("td"));
	u.setAttribute("colspan", "4");
	let d = l.appendChild(e.createElement("tr"));
	d.appendChild(e.createElement("td")).appendChild(ve(e)).addEventListener("click", (e) => {
		b(), r(null);
	});
	let f = d.appendChild(e.createElement("td")).appendChild(Ae(e, sn, "Retake"));
	f.addEventListener("click", (e) => {
		_();
	}), f.style.visibility = "collapse";
	let p = d.appendChild(e.createElement("td")).appendChild(Ae(e, N.iconBase + "noun_10636.svg", "Snap"));
	p.addEventListener("click", v), p.style.visibility = "collapse";
	let m = d.appendChild(e.createElement("td")).appendChild(ye(e));
	m.addEventListener("click", (e) => {
		x(o, a);
	}), m.style.visibility = "collapse";
	function h() {
		if (s = u.appendChild(e.createElement("video")), s.setAttribute("controls", "1"), s.setAttribute("autoplay", "1"), s.setAttribute("style", A.controlStyle), !navigator.mediaDevices) throw Error("navigator.mediaDevices not available");
		navigator.mediaDevices.getUserMedia(g).then((e) => {
			s.srcObject = e, p.style.visibility = "visible", m.style.visibility = "collapse", f.style.visibility = "collapse";
		});
	}
	let g = { video: !0 };
	function _() {
		u.removeChild(c), h();
	}
	function v() {
		c = e.createElement("canvas"), c.setAttribute("width", A.canvasWidth), c.setAttribute("height", A.canvasHeight), c.setAttribute("style", A.controlStyle), u.appendChild(c), c.getContext("2d").drawImage(s, 0, 0, c.width, c.height), s.parentNode.removeChild(s), c.toBlob((e) => {
			let t = `got blob type ${e.type} size ${e.size}`;
			M(t), a = n(), o = e, y();
		}, cn);
	}
	function y() {
		m.style.visibility = "visible", f.style.visibility = "visible", p.style.visibility = "collapse";
	}
	function b() {
		s && s.srcObject && s.srcObject.getVideoTracks().forEach((e) => e.stop());
	}
	function x(e, n) {
		let i = e.type;
		M("Putting " + e.size + " bytes of " + i + " to " + n), t.fetcher.webOperation("PUT", n.uri, {
			data: e,
			contentType: i
		}).then((e) => {
			M("ok saved " + n), b(), r(n);
		}, (e) => {
			b(), alert(e);
		});
	}
	return h(), i;
}
function un(e, t, n, r) {
	let i = e.createElement("div"), a = Ae(e, on, "Take picture"), o;
	async function s(e) {
		i.removeChild(o), i.appendChild(a), r(e);
	}
	return i.appendChild(a), a.addEventListener("click", (r) => {
		i.removeChild(a), o = ln(e, t, n, s), i.appendChild(o);
	}), i;
}
//#endregion
//#region src/media/index.ts
var dn = {
	cameraCaptureControl: ln,
	cameraButton: un
}, fn = {
	icons: N,
	ns: _,
	rdf: g,
	style: A,
	widgets: je
};
function pn(e, t, n, i, o) {
	t ||= v.store, i = i.doc();
	let s = fn.ns, c = a("http://www.w3.org/2005/01/wf/flow#"), u = a("http://purl.org/dc/terms/");
	o ||= {};
	let d = !!o.newestFirst, f = "white-space: pre-wrap; width: 90%; font-size:100%; border: 0.07em solid #eee; padding: .2em 0.5em; margin: 0.1em 1em 0.1em 1em;", p = e.createElement("div"), m, h, g = v.store.updater, _ = function(t, n) {
		let r = e.createElement("a");
		return n && n.uri && (r.setAttribute("href", n.uri), r.addEventListener("click", fn.widgets.openHrefInOutlineMode, !0), r.setAttribute("style", "color: #3B5998; text-decoration: none; ")), r.textContent = t, r;
	}, y = function(t, n) {
		let r = e.createElement("pre");
		return r.setAttribute("style", n || "color: grey"), p.appendChild(r), r.appendChild(e.createTextNode(t)), r;
	}, x = {
		log: function(e) {
			y(e, "color: #111;");
		},
		warn: function(e) {
			y(e, "color: #880;");
		},
		error: function(e) {
			y(e, "color: #800;");
		}
	}, S = function() {
		let a = e.createElement("tr"), o = e.createElement("td"), c = e.createElement("td"), l = e.createElement("td");
		a.appendChild(o), a.appendChild(c), a.appendChild(l), a.AJAR_date = "9999-01-01T00:00:00Z";
		let d = function() {
			p.setAttribute("class", "pendingedit"), p.disabled = !0;
			let o = [], c = /* @__PURE__ */ new Date(), l = "" + c.getTime(), d = te(c), f = t.sym(i.uri + "#Msg" + l);
			o.push(new r(n, s.wf("message"), f, i)), o.push(new r(f, s.sioc("content"), t.literal(p.value), i)), o.push(new r(f, u("created"), d, i)), h && o.push(new r(f, s.foaf("maker"), h, i)), g.update([], o, function(n, r, i) {
				if (!r) a.appendChild(fn.widgets.errorMessageBlock(e, "Error writing message: " + i));
				else {
					let e = {
						"?msg": f,
						"?content": t.literal(p.value),
						"?date": d,
						"?creator": h
					};
					ee(e, !1), p.value = "", p.setAttribute("class", ""), p.disabled = !1;
				}
			});
		};
		a.appendChild(e.createElement("br"));
		let p, m, _ = function() {
			w(o, h, "", null), p = e.createElement("textarea"), c.innerHTML = "", c.appendChild(p), p.rows = 3, p.setAttribute("style", f + "background-color: #eef;"), p.addEventListener("keyup", function(e) {
				e.keyCode === 13 && (e.altKey || d());
			}, !1), l.innerHTML = "", m = fn.widgets.button(e, fn.icons.iconBase + "noun_383448.svg", "Send"), m.setAttribute("style", fn.style.buttonStyle + "float: right;"), m.addEventListener("click", d, !1), l.appendChild(m);
		};
		return mt({
			div: c,
			dom: e
		}).then((e) => {
			h = e.me, _();
		}), a;
	};
	function C(e) {
		let t = v.store.any(e, fn.ns.foaf("nick"));
		return t ? "" + t.value : "" + j(e);
	}
	function w(t, n, r, i) {
		let a = t.appendChild(_(C(n), n));
		n.uri && v.store.fetcher.nowOrWhenFetched(n.doc(), void 0, function(e, t) {
			a.textContent = C(n);
		}), t.appendChild(e.createElement("br")), t.appendChild(_(r, i));
	}
	function T(e, n) {
		let r = {}, i, a;
		for (i = n.firstChild; i; i = i.nextSibling) i.AJAR_subject && (r[i.AJAR_subject.uri] = !0);
		let o = t.each(e, s.wf("message")), c = {};
		for (o.forEach(function(e) {
			c[e.uri] = !0, r[e.uri] || D(e);
		}), i = n.firstChild; i;) a = i.nextSibling, i.AJAR_subject && !c[i.AJAR_subject.uri] && n.removeChild(i), i = a;
	}
	let E = function(e) {
		let r = t.statementsMatching(e).concat(t.statementsMatching(void 0, void 0, e));
		g.update(r, [], function(e, t, r) {
			t ? T(n, m) : x.error("Cant delete messages:" + r);
		});
	}, D = function(e) {
		let n = {
			"?msg": e,
			"?creator": t.any(e, s.foaf("maker")),
			"?date": t.any(e, u("created")),
			"?content": t.any(e, s.sioc("content"))
		};
		ee(n, !0);
	}, ee = function(t, n) {
		let r = t["?creator"], i = t["?msg"], a = t["?date"], o = t["?content"], s = a.value, c = e.createElement("tr");
		c.AJAR_date = s, c.AJAR_subject = i;
		let l = !1;
		for (let e = m.firstChild; e; e = e.nextSibling) if (s > e.AJAR_date && d || s < e.AJAR_date && !d) {
			m.insertBefore(c, e), l = !0;
			break;
		}
		l || m.appendChild(c);
		let u = e.createElement("td");
		c.appendChild(u), w(u, r, fn.widgets.shortDate(s), i);
		let p = e.createElement("td");
		c.appendChild(p);
		let h = e.createElement("p");
		h.setAttribute("style", f + (n ? "background-color: #e8ffe8;" : "background-color: #white;")), p.appendChild(h), h.textContent = o.value;
		let g = e.createElement("td");
		c.appendChild(g);
		let _ = e.createElement("button");
		g.appendChild(_), _.textContent = "-", c.setAttribute("class", "hoverControl"), _.setAttribute("class", "hoverControlHide"), _.setAttribute("style", "color: red;"), _.addEventListener("click", function(t) {
			g.removeChild(_);
			let n = e.createElement("button");
			n.textContent = "cancel", g.appendChild(n).addEventListener("click", function(e) {
				g.removeChild(r), g.removeChild(n), g.appendChild(_);
			}, !1);
			let r = e.createElement("button");
			r.textContent = "Delete message", g.appendChild(r).addEventListener("click", function(e) {
				g.removeChild(r), g.removeChild(n), E(i);
			}, !1);
		}, !1);
	};
	m = e.createElement("table"), m.fresh = !1, p.appendChild(m), m.setAttribute("style", "width: 100%;");
	let O = S();
	d ? m.insertBefore(O, m.firstChild) : m.appendChild(O);
	let ne;
	if (o.query) ne = o.query;
	else {
		ne = new b("Messages");
		let e = {};
		[
			"msg",
			"date",
			"creator",
			"content"
		].forEach(function(t) {
			ne.vars.push(e[t] = l(t));
		}), ne.pat.add(n, c("message"), e.msg), ne.pat.add(e.msg, s.dct("created"), e.date), ne.pat.add(e.msg, s.foaf("maker"), e.creator), ne.pat.add(e.msg, s.sioc("content"), e.content);
	}
	function re() {
		m.fresh = !0;
	}
	return t.query(ne, ee, void 0, re), p.refresh = function() {
		T(n, m);
	}, p;
}
//#endregion
//#region src/chat/dateFolder.js
async function mn(e) {
	return await D.fetcher.load(e), !(D.statementsMatching(null, _.dct("created"), null, e).length > 0);
}
var hn = class {
	constructor(e, t, n) {
		this.root = e, this.rootFolder = e.dir(), this.leafFileName = t || "index.ttl", this.membershipProperty = n || _.wf("leafObject");
	}
	leafDocumentFromDate(e) {
		let t = e.toISOString().split("T")[0].replace(/-/g, "/");
		return t = this.root.dir().uri + t + "/" + this.leafFileName, D.sym(t);
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
				await D.fetcher.load(s);
				let e = D.each(s, _.ldp("contains"));
				e = e.filter(i);
				let t = o(e);
				if (t) return t;
			} catch (e) {
				if (e.response && e.response.status && e.response.status === 404) M("Error 404 for chat parent file " + s);
				else throw M("*** Error NON 404 for chat parent file " + s), Error(`*** ${e.message} for chat folder ${s}`);
			}
			if (r === 0) return null;
			let c = await n(s, r - 1);
			return c ? (await D.fetcher.load(c), o(D.each(c, _.ldp("contains")))) : null;
		}
		let r = this.leafDocumentFromDate(e).dir();
		for (;;) {
			let t = await n(r, 3);
			if (t) {
				let n = D.sym(t.uri + this.leafFileName), i = this.dateFromLeafDocument(n);
				if (await mn(n)) e = i, r = this.leafDocumentFromDate(e).dir();
				else return i;
			} else return null;
		}
	}
	async firstLeaf(e) {
		let n = re(), r = new t(n);
		async function i(t) {
			function i(e) {
				let t = e.uri.slice(0, -1).split("/").slice(-1)[0];
				return !!"0123456789".includes(t[0]);
			}
			delete r.requested[t.uri], await r.load(t, { force: !0 });
			let a = n.each(t, _.ldp("contains"));
			if (a = a.filter(i), a.length === 0) throw Error(" @@@  No children to         parent2 " + t);
			return a.sort(), e && a.reverse(), a[0];
		}
		let a = await i(await i(await i(this.root.dir()))), o = c(a.uri + "chat.ttl");
		await r.load(o);
		let s = n.each(this.root, this.membershipProperty, null, o);
		if (s.length === 0) {
			let e = "  INCONSISTENCY -- no chat leafObject in file " + o;
			throw pe(e), Error(e);
		}
		let l = s.map((e) => [n.any(e, _.dct("created")), e]);
		return l.sort(), e && l.reverse(), l[0][1];
	}
}, gn = (e) => e / 2 ** 32 | 0, _n = (e) => e >>> 0;
function vn(e, t, n, r) {
	let i = gn(n), a = _n(n);
	e.setUint32(t, r ? a : i, r), e.setUint32(t + 4, r ? i : a, r);
}
//#endregion
//#region node_modules/@noble/hashes/utils.js
function yn(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in e && e.BYTES_PER_ELEMENT === 1;
}
var bn = (e) => e ? `"${e}" ` : "";
function xn(e, t = "") {
	if (typeof e != "number") throw TypeError(bn(t) + "expected number, got " + typeof e);
	if (!Number.isSafeInteger(e) || e < 0) throw RangeError(bn(t) + "expected integer >= 0, got " + e);
	return e;
}
function Sn(e, t, n = "") {
	if (yn(e) && (t === void 0 || e.length === t)) return e;
	t !== void 0 && xn(t, "length");
	let r = yn(e), i = t === void 0 ? "" : ` of length ${t}`, a = r ? `length=${e.length}` : `type=${typeof e}`, o = bn(n) + "expected Uint8Array" + i + ", got " + a;
	throw r ? RangeError(o) : TypeError(o);
}
var Cn = (e, t) => {
	if (typeof e != "object" || !e || Array.isArray(e)) throw TypeError((t === "object" ? "" : `"${t}" `) + "expected object, got type=" + typeof e);
}, wn = (e, t) => {
	Cn(e, t);
	let n = Object.getPrototypeOf(e);
	if (n !== Object.prototype && n !== null) throw TypeError(`"${t}" expected plain object`);
	if (Object.hasOwn(e, "__proto__")) throw TypeError(`"${t}.__proto__" is not allowed`);
};
function Tn(e, t = !0) {
	if (e.destroyed) throw Error("hash was destroyed");
	if (t && e.finished) throw Error("digest() was already called");
}
function En(e, t) {
	Sn(e, void 0, "output");
	let n = t.outputLen;
	if (!(e.length >= n)) throw RangeError("\"output\" expected length >= " + n);
}
function Dn(...e) {
	for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function On(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function kn(e, t) {
	return e << 32 - t | e >>> t;
}
var An = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", jn = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Mn(e) {
	if (Sn(e), An) return e.toHex();
	let t = "";
	for (let n = 0; n < e.length; n++) t += jn[e[n]];
	return t;
}
function Nn(e) {
	return e >= 48 && e <= 57 ? e - 48 : e >= 65 && e <= 70 ? e - 55 : e >= 97 && e <= 102 ? e - 87 : void 0;
}
function Pn(e) {
	if (typeof e != "string") throw TypeError("hex string expected, got " + typeof e);
	if (An) try {
		return Uint8Array.fromHex(e);
	} catch (e) {
		throw e instanceof SyntaxError ? RangeError(e.message) : e;
	}
	let t = e.length, n = t / 2;
	if (t % 2) throw RangeError("hex string expected, got unpadded hex of length " + t);
	let r = new Uint8Array(n);
	for (let t = 0, i = 0; t < n; t++, i += 2) {
		let n = Nn(e.charCodeAt(i)), a = Nn(e.charCodeAt(i + 1));
		if (n === void 0 || a === void 0) {
			let t = e[i] + e[i + 1];
			throw RangeError("hex string expected, got non-hex character \"" + t + "\" at index " + i);
		}
		r[t] = n * 16 + a;
	}
	return r;
}
function Fn(...e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) {
		let r = e[n];
		Sn(r), t += r.length;
	}
	let n = new Uint8Array(t);
	for (let t = 0, r = 0; t < e.length; t++) {
		let i = e[t];
		n.set(i, r), r += i.length;
	}
	return n;
}
function In(e, t, n = "opts") {
	return wn(e, "defaults"), t !== void 0 && wn(t, n), Object.assign(Object.create(null), e, t);
}
function Ln(e, t = {}) {
	if (typeof e != "function") throw TypeError("\"hashCons\" expected function, got type=" + typeof e);
	t = In({}, t, "info");
	let n = (t, n) => e(n).update(t).digest(), r = e(void 0);
	return n.outputLen = r.outputLen, n.blockLen = r.blockLen, n.canXOF = r.canXOF, n.create = (t) => e(t), Object.assign(n, t), Object.freeze(n);
}
function Rn(e = 32) {
	xn(e, "bytesLength");
	let t = typeof globalThis == "object" ? globalThis.crypto : null;
	if (typeof t?.getRandomValues != "function") throw Error("crypto.getRandomValues must be defined");
	if (e > 65536) throw RangeError(`"bytesLength" expected <= 65536, got ${e}`);
	return t.getRandomValues(new Uint8Array(e));
}
var zn = (e) => ({ oid: Uint8Array.from([
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
function Bn(e, t, n) {
	return e & t ^ ~e & n;
}
function Vn(e, t, n) {
	return e & t ^ e & n ^ t & n;
}
var Hn = class {
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
		this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = r, this.buffer = new Uint8Array(e), this.view = On(this.buffer);
	}
	update(e) {
		Tn(this), Sn(e);
		let { view: t, buffer: n, blockLen: r } = this, i = e.length, a = !1;
		for (let o = 0; o < i;) {
			let s = Math.min(r - this.pos, i - o);
			if (s === r) {
				let t = On(e);
				for (; r <= i - o; o += r) this.process(t, o);
				a = !0;
				continue;
			}
			n.set(o === 0 && s === i ? e : e.subarray(o, o + s), this.pos), this.pos += s, o += s, this.pos === r && (this.process(t, 0), this.pos = 0, a = !0);
		}
		return this.length += e.length, a && this.roundClean(), this;
	}
	digestInto(e) {
		Tn(this), En(e, this), this.finished = !0;
		let { buffer: t, view: n, blockLen: r, isLE: i } = this, { pos: a } = this;
		t[a++] = 128, t.fill(0, a), this.padOffset > r - a && (this.process(n, 0), t.fill(0)), vn(n, r - 8, this.length * 8, i), this.process(n, 0), this.roundClean();
		let o = e === t ? n : On(e), s = this.outputLen, c = s / 4, l = this.get();
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
}, Un = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]), Wn = /* @__PURE__ */ Uint32Array.from([
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
]), Gn = /* @__PURE__ */ new Uint32Array(64), Kn = class extends Hn {
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
		for (let n = 0; n < 16; n++, t += 4) Gn[n] = e.getUint32(t, !1);
		for (let e = 16; e < 64; e++) {
			let t = Gn[e - 15], n = Gn[e - 2], r = kn(t, 7) ^ kn(t, 18) ^ t >>> 3, i = kn(n, 17) ^ kn(n, 19) ^ n >>> 10;
			Gn[e] = i + Gn[e - 7] + r + Gn[e - 16] | 0;
		}
		let { A: n, B: r, C: i, D: a, E: o, F: s, G: c, H: l } = this;
		for (let e = 0; e < 64; e++) {
			let t = kn(o, 6) ^ kn(o, 11) ^ kn(o, 25), u = l + t + Bn(o, s, c) + Wn[e] + Gn[e] | 0, d = (kn(n, 2) ^ kn(n, 13) ^ kn(n, 22)) + Vn(n, r, i) | 0;
			l = c, c = s, s = o, o = a + u | 0, a = i, i = r, r = n, n = u + d | 0;
		}
		n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, s = s + this.F | 0, c = c + this.G | 0, l = l + this.H | 0, this.set(n, r, i, a, o, s, c, l);
	}
	roundClean() {
		Dn(Gn);
	}
	destroy() {
		this.destroyed = !0, this.set(0, 0, 0, 0, 0, 0, 0, 0), Dn(this.buffer);
	}
}, qn = class extends Kn {
	constructor() {
		super(32, Un);
	}
}, Jn = /* @__PURE__ */ Ln(() => new qn(), /* @__PURE__ */ zn(1));
//#endregion
//#region node_modules/@noble/curves/utils.js
function Yn(e, t, n = () => {}) {
	if (!Array.isArray(e)) throw TypeError(`"${t}" expected array, got type=${typeof e}`);
	for (let r = 0; r < e.length; r++) n(e[r], `${t}[${r}]`);
	return e;
}
var Xn = (e, t, n) => Sn(e, t, n), Zn = xn;
function Qn(e, t = "object") {
	if (typeof e != "object" || !e || Array.isArray(e)) throw TypeError(t === "object" ? "expected valid options object" : `"${t}" expected object, got type=${typeof e}`);
	return e;
}
function $n(e, t) {
	if (typeof e != "function") throw TypeError(`"${t}" is invalid: expected function, got ${typeof e}`);
	return e;
}
var er = Mn, tr = (...e) => Fn(...e), nr = (e) => Pn(e), rr = yn, ir = (e) => Rn(e), ar = /* @__PURE__ */ BigInt(0), or = /* @__PURE__ */ BigInt(1), sr = (e) => e ? `"${e}" ` : "";
function cr(e, t = "") {
	if (typeof e != "boolean") throw TypeError(sr(t) + "expected boolean, got type=" + typeof e);
	return e;
}
function lr(e) {
	if (typeof e == "bigint") {
		if (!vr(e)) throw RangeError("positive bigint expected, got " + e);
	} else Zn(e);
	return e;
}
function ur(e, t = "") {
	if (typeof e != "number") {
		let n = t && `"${t}" `;
		throw TypeError(n + "expected number, got type=" + typeof e);
	}
	if (!Number.isSafeInteger(e)) {
		let n = t && `"${t}" `;
		throw RangeError(n + "expected safe integer, got " + e);
	}
}
function dr(e) {
	if (typeof e != "string") throw TypeError("hex string expected, got " + typeof e);
	return e === "" ? ar : BigInt("0x" + e);
}
function fr(e) {
	return dr(Mn(e));
}
function pr(e) {
	return dr(Mn(gr(Sn(e)).reverse()));
}
function mr(e, t) {
	if (xn(t), t === 0) throw Error("zero output length is invalid");
	e = lr(e);
	let n = t * 2, r = e.toString(16);
	if (r.length > n) throw RangeError("number is too large");
	return Pn(r.padStart(n, "0"));
}
function hr(e, t) {
	return mr(e, t).reverse();
}
function gr(e) {
	return Uint8Array.from(Xn(e));
}
function _r(e) {
	if (typeof e != "string") throw TypeError("ascii string expected, got " + typeof e);
	return Uint8Array.from(e, (t, n) => {
		let r = t.charCodeAt(0);
		if (t.length !== 1 || r > 127) throw RangeError(`string contains non-ASCII character "${e[n]}" with code ${r} at position ${n}`);
		return r;
	});
}
function vr(e) {
	return typeof e == "bigint" && ar <= e;
}
function yr(e, t, n) {
	return vr(e) && vr(t) && vr(n) && t <= e && e < n;
}
function br(e, t, n, r) {
	if (!yr(t, n, r)) throw RangeError("expected valid " + e + ": " + n + " <= n < " + r + ", got " + t);
}
function xr(e) {
	if (e < ar) throw Error("expected non-negative bigint, got " + e);
	return e === ar ? 0 : e.toString(2).length;
}
var Sr = (e) => (ur(e, "n"), (or << BigInt(e)) - or);
function Cr(e, t = {}, n = {}, r = "object") {
	Qn(e, r), Qn(t, "fields"), Qn(n, "optFields");
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
var wr = /* @__PURE__ */ BigInt(0), F = /* @__PURE__ */ BigInt(1), Tr = /* @__PURE__ */ BigInt(2), Er = /* @__PURE__ */ BigInt(3), Dr = /* @__PURE__ */ BigInt(4), Or = /* @__PURE__ */ BigInt(5), kr = /* @__PURE__ */ BigInt(7), Ar = /* @__PURE__ */ BigInt(8), jr = /* @__PURE__ */ BigInt(9), Mr = /* @__PURE__ */ BigInt(15), Nr = /* @__PURE__ */ BigInt(16), Pr = /* @__PURE__ */ BigInt("0x10000000000000000");
function Fr(e, t) {
	if (t <= wr) throw Error("mod: expected positive modulus, got " + t);
	let n = e % t;
	return n >= wr ? n : t + n;
}
function Ir(e, t, n) {
	if (n <= F) throw Error("pow: expected modulus > 1, got " + n);
	if (typeof t != "bigint") throw TypeError("invalid exponent: expected bigint, got " + typeof t);
	if (t < wr) throw Error("invalid exponent, negatives unsupported");
	if (t === wr) return F;
	if (t === F) return e;
	let r = e % n;
	if (r < wr && (r += n), t < Pr) {
		let e = F;
		for (; t > wr;) t & F && (e = e * r % n), r = r * r % n, t >>= F;
		return e;
	}
	let i = [];
	for (; t > wr;) i.push(Number(t & Mr)), t >>= Dr;
	let a = Array(16);
	a[0] = F, a[1] = r;
	for (let e = 2; e < 16; e++) a[e] = a[e - 1] * r % n;
	let o = a[i[i.length - 1]];
	for (let e = i.length - 2; e >= 0; e--) {
		o = o * o % n, o = o * o % n, o = o * o % n, o = o * o % n;
		let t = i[e];
		t !== 0 && (o = o * a[t] % n);
	}
	return o;
}
function Lr(e, t, n) {
	if (n <= F) throw Error("pow2: expected modulus > 1, got " + n);
	if (t < wr) throw Error("pow2: expected non-negative exponent, got " + t);
	let r = e;
	for (; t-- > wr;) r *= r, r %= n;
	return r;
}
function Rr(e, t) {
	if (e === wr) throw Error("invert: expected non-zero number");
	if (t <= F) throw Error("invert: expected modulus > 1, got " + t);
	let n = Fr(e, t), r = t, i = wr, a = F;
	for (; n !== wr;) {
		let e = r / n, t = r - n * e, o = i - a * e;
		r = n, n = t, i = a, a = o;
	}
	if (r !== F) throw Error("invert: does not exist");
	return Fr(i, t);
}
function zr(e, t, n) {
	let r = e;
	if (!r.eql(r.sqr(t), n)) throw Error("Cannot find square root");
}
function Br(e, t) {
	if ((e & F) === wr) throw Error(t + ": expected odd modulus, got " + e);
}
function Vr(e, t) {
	let n = e, r = (n.ORDER + F) / Dr, i = n.pow(t, r);
	return zr(n, i, t), i;
}
function Hr(e, t) {
	let n = e, r = (n.ORDER - Or) / Ar, i = n.mul(t, Tr), a = n.pow(i, r), o = n.mul(t, a), s = n.mul(n.mul(o, Tr), a), c = n.mul(o, n.sub(s, n.ONE));
	return zr(n, c, t), c;
}
function Ur(e) {
	let t = $r(e), n = Wr(e), r = n(t, t.neg(t.ONE)), i = n(t, r), a = n(t, t.neg(r)), o = (e + kr) / Nr;
	return ((e, t) => {
		let n = e, s = n.pow(t, o), c = n.mul(s, r), l = n.mul(s, i), u = n.mul(s, a), d = n.eql(n.sqr(c), t), f = n.eql(n.sqr(l), t);
		s = n.cmov(s, c, d), c = n.cmov(u, l, f);
		let p = n.eql(n.sqr(c), t), m = n.cmov(s, c, p);
		return zr(n, m, t), m;
	});
}
function Wr(e) {
	if (e < Er) throw Error("sqrt is not defined for small field");
	Br(e, "tonelliShanks");
	let t = e - F, n = 0;
	for (; t % Tr === wr;) t /= Tr, n++;
	let r = Tr, i = $r(e);
	for (; Yr(i, r) === 1;) if (r++ > 1e3) throw Error("Cannot find square root: probably non-prime P");
	if (n === 1) return Vr;
	let a = i.pow(r, t), o = (t + F) / Tr;
	return function(e, r) {
		let i = e;
		if (i.is0(r)) return r;
		if (Yr(i, r) !== 1) throw Error("Cannot find square root");
		let s = n, c = i.mul(i.ONE, a), l = i.pow(r, t), u = i.pow(r, o);
		for (; !i.eql(l, i.ONE);) {
			if (i.is0(l)) throw Error("Cannot find square root: probably non-prime P");
			let e = 1, t = i.sqr(l);
			for (; !i.eql(t, i.ONE);) if (e++, t = i.sqr(t), e === s) throw Error("Cannot find square root");
			let n = F << BigInt(s - e - 1), r = i.pow(c, n);
			s = e, c = i.sqr(r), l = i.mul(l, c), u = i.mul(u, r);
		}
		return u;
	};
}
function Gr(e) {
	return Br(e, "Fp.sqrt"), e % Dr === Er ? Vr : e % Ar === Or ? Hr : e % Nr === jr ? Ur(e) : Wr(e);
}
var Kr = [
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
function qr(e) {
	if (Qn(e, "field"), typeof e.ORDER != "bigint") throw TypeError("param \"ORDER\" is invalid: expected bigint, got " + typeof e.ORDER);
	ur(e.BYTES, "BYTES"), ur(e.BITS, "BITS");
	for (let t of Kr) $n(e[t], "field." + t);
	if (e.BYTES < 1 || e.BITS < 1) throw Error("invalid field: expected BYTES/BITS > 0");
	if (e.ORDER <= F) throw Error("invalid field: expected ORDER > 1, got " + e.ORDER);
	return e;
}
function Jr(e, t, n = !1) {
	qr(e), Yn(t, "nums"), cr(n, "passZero");
	let r = e, i = Array(t.length).fill(n ? r.ZERO : void 0), a = t.reduce((e, t, n) => r.is0(t) ? e : (i[n] = e, r.mul(e, t)), r.ONE), o = r.inv(a);
	return t.reduceRight((e, t, n) => r.is0(t) ? e : (i[n] = r.mul(e, i[n]), r.mul(e, t)), o), i;
}
function Yr(e, t) {
	qr(e);
	let n = e;
	Br(n.ORDER, "FpLegendre");
	let r = (n.ORDER - F) / Tr, i = n.pow(t, r), a = n.eql(i, n.ONE), o = n.eql(i, n.ZERO), s = n.eql(i, n.neg(n.ONE));
	if (!a && !o && !s) throw Error("invalid Legendre symbol result");
	return a ? 1 : o ? 0 : -1;
}
function Xr(e, t) {
	if (t !== void 0 && Zn(t), e <= wr) throw Error("invalid n length: expected positive n, got " + e);
	if (t !== void 0 && t < 1) throw Error("invalid n length: expected positive bit length, got " + t);
	let n = xr(e);
	if (t !== void 0 && t < n) throw Error(`invalid n length: expected nBitLength (${t}) >= bitLen(n) (${n})`);
	let r = t === void 0 ? n : t;
	return {
		nBitLength: r,
		nByteLength: Math.ceil(r / 8)
	};
}
var Zr = /* @__PURE__ */ new WeakMap(), Qr = class {
	ORDER;
	BITS;
	BYTES;
	isLE;
	ZERO = wr;
	ONE = F;
	_lengths;
	_mod;
	constructor(e, t = {}) {
		if (e <= F) throw Error("invalid field: expected ORDER > 1, got " + e);
		let n;
		this.isLE = !1, typeof t == "object" && t && (typeof t.BITS == "number" && (n = t.BITS), typeof t.sqrt == "function" && Object.defineProperty(this, "sqrt", {
			value: t.sqrt,
			enumerable: !0
		}), typeof t.isLE == "boolean" && (this.isLE = t.isLE), t.allowedLengths && (this._lengths = Object.freeze(t.allowedLengths.slice())), typeof t.modFromBytes == "boolean" && (this._mod = t.modFromBytes));
		let { nBitLength: r, nByteLength: i } = Xr(e, n);
		if (i > 2048) throw Error("invalid field: expected ORDER of <= 2048 bytes");
		this.ORDER = e, this.BITS = r, this.BYTES = i, Object.freeze(this);
	}
	create(e) {
		return Fr(e, this.ORDER);
	}
	isValid(e) {
		if (typeof e != "bigint") throw TypeError("invalid field element: expected bigint, got " + typeof e);
		return wr <= e && e < this.ORDER;
	}
	is0(e) {
		return e === wr;
	}
	isValidNot0(e) {
		return !this.is0(e) && this.isValid(e);
	}
	isOdd(e) {
		return (e & F) === F;
	}
	neg(e) {
		return Fr(-e, this.ORDER);
	}
	eql(e, t) {
		return e === t;
	}
	sqr(e) {
		return Fr(e * e, this.ORDER);
	}
	add(e, t) {
		return Fr(e + t, this.ORDER);
	}
	sub(e, t) {
		return Fr(e - t, this.ORDER);
	}
	mul(e, t) {
		return Fr(e * t, this.ORDER);
	}
	pow(e, t) {
		return Ir(e, t, this.ORDER);
	}
	div(e, t) {
		return Fr(e * Rr(t, this.ORDER), this.ORDER);
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
		return Rr(e, this.ORDER);
	}
	sqrt(e) {
		let t = Zr.get(this);
		return t || Zr.set(this, t = Gr(this.ORDER)), t(this, e);
	}
	toBytes(e) {
		return this.isLE ? hr(e, this.BYTES) : mr(e, this.BYTES);
	}
	fromBytes(e, t = !1) {
		Xn(e);
		let { _lengths: n, BYTES: r, isLE: i, ORDER: a, _mod: o } = this;
		if (n) {
			if (e.length < 1 || !n.includes(e.length) || e.length > r) throw Error("Field.fromBytes: expected " + n + " bytes, got " + e.length);
			let t = new Uint8Array(r);
			t.set(e, i ? 0 : t.length - e.length), e = t;
		}
		if (e.length !== r) throw Error("Field.fromBytes: expected " + r + " bytes, got " + e.length);
		let s = i ? pr(e) : fr(e);
		if (o && (s = Fr(s, a)), !t && !this.isValid(s)) throw Error("invalid field element: outside of range 0..ORDER");
		return s;
	}
	invertBatch(e) {
		return Jr(this, e, !0);
	}
	cmov(e, t, n) {
		return cr(n, "condition"), n ? t : e;
	}
};
function $r(e, t = {}) {
	return Object.freeze(Qr.prototype), new Qr(e, t);
}
function ei(e) {
	if (typeof e != "bigint") throw Error("field order must be bigint");
	if (e <= F) throw Error("field order must be greater than 1");
	let t = xr(e - F);
	return Math.ceil(t / 8);
}
function ti(e) {
	let t = ei(e);
	return t + Math.ceil(t / 2);
}
function ni(e, t, n = !1) {
	Xn(e);
	let r = e.length, i = ei(t), a = Math.max(ti(t), 16);
	if (r < a || r > 1024) throw Error("expected " + a + "-1024 bytes of input, got " + r);
	let o = Fr(n ? pr(e) : fr(e), t - F) + F;
	return n ? hr(o, i) : mr(o, i);
}
//#endregion
//#region node_modules/@noble/curves/abstract/curve.js
var ri = /* @__PURE__ */ BigInt(0), ii = /* @__PURE__ */ BigInt(1), ai = /* @__PURE__ */ BigInt(4), oi = 16, si = 128, ci = 5, li = 2 ** 31;
function ui(e) {
	let t = e;
	if (typeof t != "function") throw TypeError("\"Point\" expected constructor, got type=" + typeof e);
	$n(t.fromAffine, "Point.fromAffine"), $n(t.fromBytes, "Point.fromBytes"), $n(t.fromHex, "Point.fromHex"), Qn(t.BASE, "Point.BASE"), Qn(t.ZERO, "Point.ZERO"), qr(t.Fp), qr(t.Fn);
}
function di(e, t) {
	ui(e), hi(t, e);
	let n = Jr(e.Fp, t.map((e) => e.Z));
	return t.map((t, r) => e.fromAffine(t.toAffine(n[r])));
}
function fi(e, t, n = 1) {
	if (!Number.isSafeInteger(e) || e < n || e > t) throw Error("invalid window size, expected [" + n + ".." + t + "], got W=" + e);
}
function pi(e, t) {
	let n = e * (4 * t + 128);
	if (n > li) throw Error("invalid window size: table would need ~" + Math.ceil(n / 2 ** 20) + " MiB, max " + li / 2 ** 20 + " MiB");
}
function mi(e, t) {
	if (e !== void 0) {
		$n(e, "randomBytes");
		try {
			let n = e(t);
			if (!rr(n) || n.length !== t) return;
		} catch {
			return;
		}
		return e;
	}
}
function hi(e, t) {
	Yn(e, "points"), e.forEach((e, n) => {
		if (!(e instanceof t)) throw Error("invalid point at index " + n);
	});
}
function gi(e, t, n) {
	if (!Array.isArray(e)) throw Error("array of scalars expected");
	e.forEach((e, r) => {
		if (!(n === void 0 ? t.isValid(e) : vr(e) && e < n)) throw Error("invalid scalar at index " + r);
	});
}
var _i = /* @__PURE__ */ new WeakMap();
function vi(e) {
	return _i.get(e) || 1;
}
function yi(e, t) {
	let n = e.double(), r = [e];
	for (let e = 1; e < t; e++) r.push(r[e - 1].add(n));
	return r;
}
function bi(e, t) {
	let n = 2 ** t, r = n / 2, i = BigInt(n - 1), a = [];
	for (; e > ri;) {
		let t = 0;
		e & ii && (t = Number(e & i), t >= r && (t -= n), e -= BigInt(t)), a.push(t), e >>= ii;
	}
	return a;
}
function xi(e, t, n) {
	let r = 2 ** t, i = r / 2, a = BigInt(r - 1), o = BigInt(t), s = [];
	for (let t = 0; t < n; t++) {
		let t = Number(e & a);
		e >>= o, t > i && (t -= r, e += ii), s.push(t);
	}
	if (e !== ri) throw Error("invalid wnaf");
	return s;
}
function Si(e, t, n) {
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
var Ci = class {
	Point;
	BASE;
	ZERO;
	randomBytes;
	wnafPrecomputes = /* @__PURE__ */ new WeakMap();
	baseCanBeBlinded;
	bits;
	constructor(e, t) {
		ui(e), this.randomBytes = mi(t, oi), this.Point = e, this.BASE = e.BASE, this.ZERO = e.ZERO, this.bits = e.Fn.BITS;
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
		let { W: n, windows: r, comp: i } = e, a = 2 ** (n - 1), o = xi(t, n, r), s = this.ZERO, c = this.BASE;
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
		if (this.assertPoint(e), !yr(t, ii, this.Point.Fn.ORDER)) throw Error("invalid scalar");
	}
	runCT(e, t, n, r) {
		let i = vi(e);
		return i === 1 ? this.fixedWindowCT(e, t, n) : this.wnafCachedCT(this.getWnafPrecomputes(i, e, n, r), t);
	}
	mulCT(e, t, n) {
		return this.validateMulInput(e, t), this.runCT(e, t, this.bits, n);
	}
	mulCTBlinded(e, t, n) {
		if (this.validateMulInput(e, t), this.randomBytes === void 0) throw Error("randomBytes is required for scalar blinding");
		let r = this.Point.Fn.BITS + si, i = this.randomBytes(oi);
		if (!rr(i) || i.length !== oi) throw Error("randomBytes returned invalid byte array");
		i[0] = i[0] & 63 | 128;
		let a = t + fr(i) * this.Point.Fn.ORDER;
		return this.runCT(e, a, r, n);
	}
	fixedWindowCT(e, t, n) {
		let r = ci, i = Sr(r), a = Array(32);
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
		return this.randomBytes === void 0 ? !1 : t === ii || e === this.BASE && (this.baseCanBeBlinded === void 0 && (this.baseCanBeBlinded = this.mulUnsafe(this.BASE, this.Point.Fn.ORDER).is0()), this.baseCanBeBlinded);
	}
	mulSecret(e, t, n, r) {
		return this.shouldBlind(e, n) ? this.mulCTBlinded(e, t, r) : this.mulCT(e, t, r);
	}
	mulUnsafe(e, t, n) {
		if (this.assertPoint(e), !vr(t)) throw Error("invalid scalar");
		let r = vi(e);
		if (r === 1 || t >= this.Point.Fn.ORDER) return wi(this.Point, [e], [t], !0);
		let i = this.getWnafPrecomputes(r, e, this.bits, n);
		return this.wnafCachedCT(i, t).p;
	}
	setWindowSize(e, t) {
		this.assertPoint(e), fi(t, this.bits), pi((Math.ceil((this.bits + si) / t) + 1) * 2 ** (t - 1), this.Point.Fp.BYTES), _i.set(e, t), this.wnafPrecomputes.delete(e);
	}
	hasWindowSize(e) {
		return vi(e) !== 1;
	}
};
function wi(e, t, n, r = !1) {
	if (ui(e), hi(t, e), cr(r, "allowOversized"), gi(n, e.Fn, r ? e.Fn.ORDER ** ai : void 0), t.length !== n.length) throw Error("arrays of points and scalars must have equal length");
	let i = t.map((e) => yi(e, 4)), a = n.map((e) => bi(e, 4));
	return Si(e.ZERO, i, a);
}
function Ti(e, t, n) {
	if (t) {
		if (t.ORDER !== e) throw Error("Field.ORDER must match order: Fp == p, Fn == n");
		return qr(t), t;
	}
	return $r(e, { isLE: n });
}
function Ei(e, t, n = {}, r) {
	if (e !== "weierstrass" && e !== "edwards") throw Error("expected curve type \"weierstrass\" or \"edwards\"");
	if (r === void 0 && (r = e === "edwards"), !t || typeof t != "object") throw Error(`expected valid ${e} CURVE object`);
	Cr(n);
	for (let e of [
		"p",
		"n",
		"h"
	]) {
		let n = t[e];
		if (!(vr(n) && n !== ri)) throw Error(`CURVE.${e} must be positive bigint`);
	}
	let i = Ti(t.p, n.Fp, r), a = Ti(t.n, n.Fn, r), o = [
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
function Di(e, t) {
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
var Oi = (e, t) => (e + (e >= 0 ? t : -t) / Mi) / t;
function ki(e, t, n) {
	br("scalar", e, Ai, n);
	let [[r, i], [a, o]] = t, s = Oi(o * e, n), c = Oi(-i * e, n), l = e - s * r - c * a, u = -s * i - c * o, d = l < Ai, f = u < Ai;
	d && (l = -l), f && (u = -u);
	let p = Sr(Math.ceil(xr(n) / 2)) + ji;
	if (l < Ai || l >= p || u < Ai || u >= p) throw Error("splitScalar (endomorphism): failed for k");
	return {
		k1neg: d,
		k1: l,
		k2neg: f,
		k2: u
	};
}
var Ai = /* @__PURE__ */ BigInt(0), ji = /* @__PURE__ */ BigInt(1), Mi = /* @__PURE__ */ BigInt(2), Ni = /* @__PURE__ */ BigInt(3), Pi = /* @__PURE__ */ BigInt(4);
function Fi(e, t = {}) {
	let n = Ei("weierstrass", e, t), r = n.Fp, i = n.Fn, a = n.CURVE, { h: o, n: s } = a;
	Cr(t, {}, {
		allowInfinityPoint: "boolean",
		clearCofactor: "function",
		isTorsionFree: "function",
		fromBytes: "function",
		toBytes: "function",
		endo: "object",
		randomBytes: "function"
	});
	let { endo: c, allowInfinityPoint: l, clearCofactor: u, isTorsionFree: d, fromBytes: f, toBytes: p } = t, m = t.randomBytes === void 0 ? ir : t.randomBytes;
	if (c && (!r.is0(a.a) || typeof c.beta != "bigint" || !Array.isArray(c.basises))) throw Error("invalid endo: expected \"beta\": bigint and \"basises\": array");
	let h = c ? {
		beta: c.beta,
		basises: c.basises.map((e) => [...e])
	} : void 0, g = Li(r, i);
	function _() {
		if (!r.isOdd) throw Error("compression is not supported: Field does not have .isOdd()");
	}
	function v(e, t, n) {
		if (t.is0()) {
			if (!l) throw Error("bad point: ZERO");
			return Uint8Array.of(0);
		}
		let { x: i, y: a } = t.toAffine(), o = r.toBytes(i);
		return cr(n, "isCompressed"), n ? (_(), tr(Ii(!r.isOdd(a)), o)) : tr(Uint8Array.of(4), o, r.toBytes(a));
	}
	function y(e) {
		Xn(e, void 0, "Point");
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
	let b = p === void 0 ? v : p, x = f === void 0 ? y : f, S = r.mul(a.b, Ni), C = r.is0(a.a) ? (e) => r.ZERO : (e) => r.mul(a.a, e);
	function w(e) {
		let t = r.sqr(e), n = r.mul(t, e);
		return r.add(r.add(n, r.mul(e, a.a)), a.b);
	}
	function T(e, t) {
		let n = r.sqr(t), i = w(e);
		return r.eql(n, i);
	}
	if (!T(a.Gx, a.Gy)) throw Error("bad curve params: generator point");
	let E = r.mul(r.pow(a.a, Ni), Pi), D = r.mul(r.sqr(a.b), BigInt(27));
	if (r.is0(r.add(E, D))) throw Error("bad curve params: a or b");
	function ee(e, t, n = !1) {
		if (!r.isValid(t) || n && r.is0(t)) throw Error(`bad point coordinate ${e}`);
		return typeof t == "object" && t ? r.create(t) : t;
	}
	function O(e) {
		if (!(e instanceof k)) throw Error("Weierstrass Point expected");
	}
	function te(e) {
		if (!h || !h.basises) throw Error("no endo");
		return ki(e, h.basises, i.ORDER);
	}
	function ne(e, t, n, a) {
		if (!i.isValid(a)) throw RangeError("invalid scalar: out of range");
		if (h) {
			let { k1neg: i, k1: o, k2neg: s, k2: c } = te(a), l = new k(r.mul(n.X, h.beta), n.Y, n.Z);
			e.push(i ? n.negate() : n, s ? l.negate() : l), t.push(o, c);
		} else e.push(n), t.push(a);
	}
	let re = /* @__PURE__ */ new WeakSet();
	class k {
		static BASE = new k(a.Gx, a.Gy, r.ONE);
		static ZERO = new k(r.ZERO, r.ONE, r.ZERO);
		static Fp = r;
		static Fn = i;
		X;
		Y;
		Z;
		constructor(e, t, n) {
			this.X = ee("x", e), this.Y = ee("y", t, !0), this.Z = ee("z", n), Object.freeze(this);
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
			let t = k.fromAffine(x(Xn(e, void 0, "point")));
			return t.assertValidity(), t;
		}
		static fromHex(e) {
			return k.fromBytes(nr(e));
		}
		get x() {
			return this.toAffine().x;
		}
		get y() {
			return this.toAffine().y;
		}
		precompute(e = 6, t = !0) {
			return ae.setWindowSize(this, e), t || this.multiply(Ni), this;
		}
		assertValidity() {
			let e = this;
			if (e.is0()) {
				if (l && r.is0(e.X) && r.eql(e.Y, r.ONE) && r.is0(e.Z)) return;
				throw Error("bad point: ZERO");
			}
			if (re.has(e)) return;
			let { x: t, y: n } = e.toAffine();
			if (!r.isValid(t) || !r.isValid(n)) throw Error("bad point: x or y not field elements");
			if (!T(t, n)) throw Error("bad point: equation left != right");
			if (!e.isTorsionFree()) throw Error("bad point: not in prime-order subgroup");
			re.add(e);
		}
		hasEvenY() {
			let { y: e } = this.toAffine();
			if (!r.isOdd) throw Error("Field doesn't support isOdd");
			return !r.isOdd(e);
		}
		equals(e) {
			O(e);
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
			O(e);
			let { X: t, Y: n, Z: i } = this, { X: a, Y: o, Z: s } = e, c = r.ZERO, l = r.ZERO, u = r.ZERO, d = r.mul(t, a), f = r.mul(n, o), p = r.mul(i, s), m = r.add(t, n), h = r.add(a, o);
			m = r.mul(m, h), h = r.add(d, f), m = r.sub(m, h), h = r.add(t, i);
			let g = r.add(a, s);
			return h = r.mul(h, g), g = r.add(d, p), h = r.sub(h, g), g = r.add(n, i), c = r.add(o, s), g = r.mul(g, c), c = r.add(f, p), g = r.sub(g, c), u = C(h), c = r.mul(S, p), u = r.add(c, u), c = r.sub(f, u), u = r.add(f, u), l = r.mul(c, u), f = r.add(d, d), f = r.add(f, d), p = C(p), h = r.mul(S, h), f = r.add(f, p), p = r.sub(d, p), p = C(p), h = r.add(h, p), d = r.mul(f, h), l = r.add(l, d), d = r.mul(g, h), c = r.mul(m, c), c = r.sub(c, d), d = r.mul(m, f), u = r.mul(g, u), u = r.add(u, d), new k(c, l, u);
		}
		subtract(e) {
			return O(e), this.add(e.negate());
		}
		is0() {
			return this.equals(k.ZERO);
		}
		multiply(e) {
			if (!i.isValidNot0(e)) throw RangeError("invalid scalar: out of range");
			let { p: t, f: n } = ae.mulSecret(this, e, o, ie);
			return ie([t, n])[0];
		}
		multiplyUnsafe(e) {
			let t = this, n = e;
			if (!i.isValid(n)) throw RangeError("invalid scalar: out of range");
			if (n === Ai || t.is0()) return k.ZERO;
			if (n === ji) return t;
			if (ae.hasWindowSize(this)) return ae.mulUnsafe(t, n, ie);
			let r = [], a = [];
			return ne(r, a, t, n), wi(k, r, a);
		}
		mulAddUnsafe(e, t, n) {
			O(t);
			let r = [], i = [];
			return ne(r, i, this, e), ne(r, i, t, n), wi(k, r, i);
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
			return o === ji ? !0 : d ? d(k, this) : ae.mulUnsafe(this, s).is0();
		}
		clearCofactor() {
			return o === ji ? this : u ? u(k, this) : this.multiplyUnsafe(o);
		}
		isSmallOrder() {
			return o === ji ? this.is0() : this.clearCofactor().is0();
		}
		toBytes(e = !0) {
			return cr(e, "isCompressed"), this.assertValidity(), b(k, this, e);
		}
		toHex(e = !0) {
			return er(this.toBytes(e));
		}
		toString() {
			return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
		}
	}
	let ie = (e) => di(k, e), ae = new Ci(k, m);
	return ae.bits >= 6 && k.BASE.precompute(6), Object.freeze(k.prototype), Object.freeze(k), k;
}
function Ii(e) {
	return Uint8Array.of(e ? 2 : 3);
}
function Li(e, t) {
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
var Ri = {
	p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),
	n: BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),
	h: BigInt(1),
	a: BigInt(0),
	b: BigInt(7),
	Gx: BigInt("0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798"),
	Gy: BigInt("0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8")
}, zi = {
	beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
	basises: [[BigInt("0x3086d221a7d46bcde86c90e49284eb15"), -BigInt("0xe4437ed6010e88286f547fa90abfe4c3")], [BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"), BigInt("0x3086d221a7d46bcde86c90e49284eb15")]]
}, Bi = /* @__PURE__ */ BigInt(0), Vi = /* @__PURE__ */ BigInt(2);
function Hi(e) {
	let t = Ri.p, n = BigInt(3), r = BigInt(6), i = BigInt(11), a = BigInt(22), o = BigInt(23), s = BigInt(44), c = BigInt(88), l = e * e * e % t, u = l * l * e % t, d = Lr(Lr(Lr(u, n, t) * u % t, n, t) * u % t, Vi, t) * l % t, f = Lr(d, i, t) * d % t, p = Lr(f, a, t) * f % t, m = Lr(p, s, t) * p % t, h = Lr(Lr(Lr(Lr(Lr(Lr(m, c, t) * m % t, s, t) * p % t, n, t) * u % t, o, t) * f % t, r, t) * l % t, Vi, t);
	if (!Ui.eql(Ui.sqr(h), e)) throw Error("Cannot find square root");
	return h;
}
var Ui = /* @__PURE__ */ $r(Ri.p, { sqrt: Hi }), Wi = /* @__PURE__ */ Fi(Ri, {
	Fp: Ui,
	endo: zi
}), Gi = Object.create(null);
function Ki(e, ...t) {
	let n = Gi[e];
	if (n === void 0) {
		let t = Jn(_r(e));
		n = tr(t, t), Gi[e] = n;
	}
	return Jn(tr(n, ...t));
}
var qi = (e) => e.toBytes(!0).slice(1), Ji = ({ x: e }) => Ui.toBytes(e), Yi = (e) => !Ui.isOdd(e);
function Xi(e) {
	let { Fn: t, BASE: n } = Wi, r = t.fromBytes(Xn(e, 32, "secretKey")), i = n.multiply(r).toAffine();
	return {
		scalar: Yi(i.y) ? r : t.neg(r),
		bytes: Ji(i)
	};
}
function Zi(e) {
	let t = Ui;
	if (!t.isValidNot0(e)) throw Error("invalid x: Fail if x ≥ p");
	let n = t.sqr(e), r = t.add(t.mulN(n, e), BigInt(7)), i = t.sqrt(r);
	Yi(i) || (i = t.neg(i));
	let a = Wi.fromAffine({
		x: e,
		y: i
	});
	return a.assertValidity(), a;
}
var Qi = fr;
function $i(...e) {
	return Wi.Fn.create(Qi(Ki("BIP0340/challenge", ...e)));
}
function ea(e) {
	return Xi(e).bytes;
}
function ta(e, t, n = Rn(32)) {
	let { Fn: r, BASE: i } = Wi, a = gr(Xn(e, void 0, "message")), { bytes: o, scalar: s } = Xi(t), c = Xn(n, 32, "auxRand"), l = Ki("BIP0340/nonce", r.toBytes(s ^ Qi(Ki("BIP0340/aux", c))), o, a), u = r.create(Qi(l));
	if (u === Bi) throw Error("sign failed: k is zero");
	let d = i.multiply(u).toAffine(), f = Yi(d.y) ? u : r.neg(u), p = Ji(d), m = $i(p, o, a), h = /* @__PURE__ */ new Uint8Array(64);
	if (h.set(p, 0), h.set(r.toBytes(r.create(f + m * s)), 32), !na(h, a, o)) throw Error("sign: Invalid signature produced");
	return h;
}
function na(e, t, n) {
	let { Fp: r, Fn: i, BASE: a } = Wi, o = Xn(e, 64, "signature"), s = Xn(t, void 0, "message"), c = Xn(n, 32, "publicKey");
	try {
		let e = Zi(Qi(c)), t = o.subarray(0, 32), n = Qi(t);
		if (!r.isValidNot0(n)) return !1;
		let l = Qi(o.subarray(32, 64));
		if (!i.isValidNot0(l)) return !1;
		let u = $i(t, qi(e), s), d = a.mulAddUnsafe(l, e, i.neg(u)), { x: f, y: p } = d.toAffine();
		return !(d.is0() || !Yi(p) || !r.eql(f, n));
	} catch {
		return !1;
	}
}
var ra = /* @__PURE__ */ (() => {
	let e = (e) => (e = e === void 0 ? Rn(48) : e, ni(Xn(e, 48, "seed"), Ri.n));
	return Object.freeze({
		keygen: Di(e, ea),
		getPublicKey: ea,
		sign: ta,
		verify: na,
		Point: Wi,
		utils: Object.freeze({
			randomSecretKey: e,
			taggedHash: Ki,
			lift_x: Zi,
			pointToBytes: qi
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
var ia = new TextEncoder(), aa = "https://w3id.org/security#";
function oa() {
	return {
		id: "",
		created: "",
		dateDeleted: "",
		content: "",
		maker: "",
		sig: ""
	};
}
function sa(e) {
	return JSON.stringify(e);
}
function ca(e) {
	return Mn(Jn(ia.encode(sa(e))));
}
function la(e, t, n) {
	return ra.verify(Pn(e), Pn(ca(t)), Pn(n));
}
function ua(e, t) {
	return Mn(ra.sign(Pn(ca(e)), Pn(t)));
}
//#endregion
//#region src/utils/keyHelpers/otherHelpers.ts
var da = (e) => {
	let t = D.any(e, _.space("preferencesFile"), null, e.doc())?.value;
	if (t = t?.split("/").slice(0, -2).join("/"), !t) throw Error(`prefererencesFile is expected to exist in ${e}`);
	return t;
}, fa = (e) => {
	let t;
	try {
		t = `${da(e)}/profile/keys/publicKey.ttl`;
	} catch (e) {
		ge(e);
	}
	return t;
}, pa = (e) => {
	let t;
	try {
		t = `${da(e)}/settings/keys/privateKey.ttl`;
	} catch (e) {
		ge(e);
	}
	return t;
};
async function ma(e, t) {
	return await ga(e, t, "publicKey");
}
async function ha(e, t) {
	return await ga(e, t, "privateKey");
}
async function ga(e, t, n) {
	try {
		return await D.fetcher.load(t), D.any(e, _.solid(n))?.value;
	} catch (e) {
		if (e.response.status === 404) {
			M("createIfNotExists: doc does NOT exist, will create... " + t);
			try {
				await D.fetcher.webOperation("PUT", t, {
					data: "",
					contentType: "text/turtle"
				});
			} catch (e) {
				throw M("createIfNotExists doc FAILED: " + t + ": " + e), e;
			}
			delete D.fetcher.requested[t];
			return;
		}
		throw M("createIfNotExists doc FAILED: " + t + ": " + e), e;
	}
}
//#endregion
//#region src/utils/keyHelpers/acl.ts
async function _a(e, t) {
	await D.fetcher.load(e);
	let n = D.any(D.sym(e), D.sym("http://www.iana.org/assignments/link-relations/acl"));
	if (!n) throw Error("Key ACL doc not found!");
	try {
		await D.fetcher.webOperation("PUT", n.value, {
			data: t,
			contentType: "text/turtle"
		});
	} catch (e) {
		if (e?.response?.status !== 404) throw Error(e);
		M("delete " + n.value + " " + e.response.status);
	}
}
var va = (e) => `
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
`, ya = (e, t) => {
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
function ba() {
	return Mn(ra.utils.randomSecretKey());
}
function xa(e) {
	return Mn(ra.getPublicKey(Pn(e)));
}
async function Sa(e) {
	await D.fetcher.load(e);
	let t = await fa(e);
	try {
		return await D.fetcher.load(t), D.any(e, _.solid("publicKey"))?.value;
	} catch {
		return;
	}
}
async function Ca(t) {
	await D.fetcher.load(t);
	let n = await fa(t), r = await pa(t), i = await ma(t, n), a = await ha(t, r), o = !0;
	if (a && i !== xa(a) && confirm("This is strange the publicKey is not valid for\n" + t?.uri + "'shall we repair keeping the private key ?") && (o = !1), !a || !i || !o) {
		let s = [], c = [];
		if (a || (a = ba(), c = [e(t, _.solid("privateKey"), ne(a), D.sym(r))], await Ta(r, [], c, t.uri)), !i || !o) {
			s = [], i && (s = [e(t, _.solid("publicKey"), f(i), D.sym(n))], M("delete invalid publicKey " + s));
			let r = xa(a);
			c = [e(t, _.solid("publicKey"), ne(r), D.sym(n))], await Ta(n, s, c);
		}
		await _a(r.substring(0, r.lastIndexOf("/") + 1), va(t.uri));
	}
	return a;
}
var wa = async (e) => {
	await D.fetcher.load(e);
	let t = D.any(D.sym(e), D.sym("http://www.iana.org/assignments/link-relations/acl"));
	if (t) try {
		let e = await D.fetcher.webOperation("DELETE", t.value);
		M("delete keyAcl" + t.value + " " + e.status);
	} catch (e) {
		if (e.response.status !== 404) throw Error(e);
		M("delete keyAcl" + t.value + " " + e.response.status);
	}
};
async function Ta(e, t, n, r = "") {
	await wa(e), await D.updater.updateMany(t, n), await _a(e, ya(e, r));
}
//#endregion
//#region src/chat/chatLogic.js
var Ea = class {
	constructor(e, t) {
		this.channel = e, this.channelRoot = e.doc(), this.options = t, this.dateFolder = new hn(this.channelRoot, "chat.ttl"), this.div = null;
	}
	async createMessage(e) {
		return this.updateMessage(e);
	}
	async updateMessage(t, n = null, r, i = null) {
		let a = [], o = /* @__PURE__ */ new Date(), s = "" + o.getTime(), l = te(o), u = n ? n.doc() : this.dateFolder.leafDocumentFromDate(o), d = D.sym(u.uri + "#Msg" + s), p = T.currentUser(), m = oa();
		if (m.id = d.uri, n) {
			let t = D.any(n, _.foaf("maker"));
			if (t.uri === p.uri) {
				let t = await ka(n);
				a.push(e(t, _.dct("isReplacedBy"), d, u));
				let i = D.any(t, _.sioc("has_reply"));
				i && a.push(e(d, _.sioc("has_reply"), i, u)), r && a.push(e(d, _.schema("dateDeleted"), l, u));
			} else {
				let e = "Error you cannot delete/edit a message from someone else : \n" + t.uri;
				throw me(e), alert(e), Error(e);
			}
		} else a.push(e(this.channel, _.wf("message"), d, u));
		if (a.push(e(d, _.sioc("content"), D.literal(t), u)), m.content = t, a.push(e(d, _.dct("created"), l, u)), m.created = l.value, p) {
			a.push(e(d, _.foaf("maker"), p, u)), m.maker = p.uri;
			let t = ua(m, await Ca(p));
			a.push(e(d, c(`${aa}proofValue`), f(t), u));
		}
		i && (a.push(e(i, _.sioc("has_member"), d, u)), i.doc().sameTerm(d.doc()) || a.push(e(i, _.sioc("has_member"), d, i.doc())));
		try {
			await D.updater.updateMany([], a);
		} catch (e) {
			let t = "Error saving chat message: " + e;
			throw me(t), alert(t), Error(t);
		}
		return d;
	}
	async deleteMessage(e) {
		return this.updateMessage("(message deleted)", e, !0);
	}
	async createThread(t) {
		let n = D.each(t, _.sioc("has_reply"), null, t.doc()).filter((e) => D.holds(e, _.rdf("type"), _.sioc("Thread"), e.doc()));
		if (n.length > 0) return n[0];
		let r = c(t.uri + "-thread"), i = [e(r, _.rdf("type"), _.sioc("Thread"), r.doc()), e(t, _.sioc("has_reply"), r, r.doc())];
		return await D.updater.update([], i), r;
	}
};
async function Da(e) {
	let t = [e], n = {};
	n[e.uri] = !0;
	let r = e;
	for (;;) {
		let e = D.any(null, _.dct("isReplacedBy"), r, r.doc());
		if (!e || n[e.uri]) break;
		await D.fetcher.load(e), t.unshift(e), n[e.uri] = !0, r = e;
	}
	for (r = e;;) {
		let e = D.any(r, _.dct("isReplacedBy"), null, r.doc());
		if (!e || n[e.uri]) break;
		t.push(e), n[e.uri] = !0, r = e;
	}
	return t;
}
async function Oa(e) {
	let t = e, n = {};
	for (; t;) {
		if (n[t.uri]) return ge("originalVersion: verion loop" + e), e;
		n[t.uri] = !0, e = t, await D.fetcher.load(e), t = D.any(null, _.dct("isReplacedBy"), e, e.doc());
	}
	return e;
}
async function ka(e) {
	let t = e, n = {};
	for (; t;) {
		if (n[t.uri]) return ge("mostRecentVersion: verion loop" + e), e;
		n[t.uri] = !0, e = t, await D.fetcher.load(e), t = D.any(e, _.dct("isReplacedBy"), null, e.doc());
	}
	return e;
}
function Aa(e) {
	return D.holds(e, _.schema("dateDeleted"), null, e.doc());
}
//#endregion
//#region src/lib/participation.ts
var ja = /* @__PURE__ */ i({
	manageParticipation: () => Ia,
	participationObject: () => Pa,
	recordParticipation: () => Fa,
	renderParticipants: () => Na
}), Ma = v.store;
function Na(e, t, n, r, i, a) {
	t.setAttribute("style", A.participantsStyle);
	let o = function(n) {
		let r = Ma.any(n, _.wf("participant")), i;
		if (!r) return i = e.createElement("tr"), i.textContent = "???", i;
		let o = Ma.anyValue(n, _.ui("backgroundColor")) || le.participationDefaultBackground, s = e.createElement("div");
		s.setAttribute("style", A.participantsBlock), s.style.backgroundColor = o, i = xe(e, null, r, a), t.appendChild(i);
		let c = e.createElement("td");
		return c.setAttribute("style", A.personTableTD), c.appendChild(s), i.insertBefore(c, i.firstChild), i;
	}, s = function() {
		let e = Ma.each(r, _.wf("participation")).map(function(e) {
			return M("in participants"), [Ma.anyValue(e, _.cal("dtstart")) || "9999-12-31", e];
		});
		e.sort();
		let n = e.map(function(e) {
			return e[1];
		});
		de(t, n, o);
	};
	return t.refresh = s, s(), t;
}
function Pa(t, n, r) {
	return new Promise(function(i, a) {
		if (!r) throw Error("No user id");
		let o = Ma.each(t, _.wf("participation")).filter(function(e) {
			return Ma.holds(e, _.wf("participant"), r);
		});
		if (o.length > 1) {
			let e = [];
			for (let t of o) {
				let n = Ma.anyValue(t, _.cal("dtstart"));
				n && e.push([n, t]);
			}
			e.sort(), me("Multiple participation objects, picking earliest, in " + n), i(e[0][1]);
		}
		if (o.length) i(o[0]);
		else {
			let o = Ce(n), s = [
				e(t, _.wf("participation"), o, n),
				e(o, _.wf("participant"), r, n),
				e(o, _.cal("dtstart"), /* @__PURE__ */ new Date(), n),
				e(o, _.ui("backgroundColor"), Ba(r), n)
			];
			Ma.updater.update([], s, function(e, t, n) {
				t ? i(o) : a(/* @__PURE__ */ Error("Error recording your participation: " + n));
			}), i(o);
		}
	});
}
function Fa(t, n, r) {
	let i = T.currentUser();
	if (!i) return;
	let a = Ma.each(t, _.wf("participation")).filter(function(e) {
		return Ma.holds(e, _.wf("participant"), i);
	});
	if (a.length > 1) throw Error("Multiple records of your participation");
	if (a.length) return a[0];
	{
		if (!Ma.updater.editable(n)) return M("Not recording participation, as no write access as " + i + " to " + n), null;
		let a = Ce(n), o = [
			e(t, _.wf("participation"), a, n),
			e(a, _.wf("participant"), i, n),
			e(a, _.cal("dtstart"), /* @__PURE__ */ new Date(), n),
			e(a, _.ui("backgroundColor"), Ba(i), n)
		];
		return Ma.updater.update([], o, function(e, t, n) {
			if (!t) throw Error("Error recording your participation: " + n);
			r && r.refresh && r.refresh();
		}), a;
	}
}
function Ia(e, t, n, r, i, a) {
	let o = e.createElement("table");
	t.appendChild(o), Na(e, o, n, r, i, a);
	try {
		Fa(r, n, o);
	} catch (n) {
		t.appendChild(Fe(e, "Error recording your participation: " + n));
	}
	return o;
}
//#endregion
//#region src/lib/pad.ts
var La = /* @__PURE__ */ i({
	getChunks: () => Ha,
	lightColorHash: () => Ba,
	manageParticipation: () => Ia,
	notepad: () => Va,
	notepadToHTML: () => Wa,
	participationObject: () => Pa,
	recordParticipation: () => Fa,
	renderParticipants: () => Na,
	xmlEncode: () => Ua
}), Ra = v.store, za = a("http://www.w3.org/ns/pim/pad#");
function Ba(e) {
	return e && e.uri ? "#" + (function(e) {
		return e.split("").reduce(function(e, t) {
			return e = (e << 5) - e + t.charCodeAt(0), e & e;
		}, 0);
	}(e.uri) & 16777215 | 12632256).toString(16) : "#ffffff";
}
function Va(t, n, r, i, o) {
	o ||= {};
	let c = o.exists, l = t.createElement("table"), u = Ra;
	if (i && !i.uri) throw Error("UI.pad.notepad:  Invalid userid");
	let d = Ra.updater, f = a("http://www.w3.org/ns/pim/pad#");
	l.setAttribute("style", A.notepadStyle);
	let p = null, m = null;
	if (o.statusArea) {
		let e = o.statusArea.appendChild(t.createElement("table")).appendChild(t.createElement("tr"));
		p = e.appendChild(t.createElement("td")), m = e.appendChild(t.createElement("td")), p && p.setAttribute("style", A.upstreamStatus), m && m.setAttribute("style", A.downstreamStatus);
	}
	let h = function(e, n = !1) {
		M(e), o.statusArea && (n ? p : m).appendChild(Fe(t, e, "pink"));
	}, g = function(e) {
		o.statusArea && (o.statusArea.innerHTML = "");
	}, v = function(e, t, n) {
		let r = e.subject;
		t ||= "";
		let i = A.baseStyle, a = A.headingCore, o = A.headingStyle, s = u.any(r, _.dc("author"));
		if (!t && s) {
			let e = Ba(s);
			t = "color: " + (n ? "#888" : "black") + "; background-color: " + e + ";";
		}
		let c = u.any(r, f("indent"));
		c = c ? c.value : 0;
		let l = c >= 0 ? i + "text-indent: " + c * 3 + "em;" : a + o[-1 - c];
		e.setAttribute("style", l + t);
	}, y = function(t) {
		let i = t.subject;
		if (!i) throw Error("No chunk for line to be deleted!");
		let a = u.any(void 0, f("next"), i), o = u.any(i, f("next"));
		if (a.sameTerm(r) && o.sameTerm(r)) {
			M("You can't delete the only line.");
			return;
		}
		let c = u.statementsMatching(i, void 0, void 0, n).concat(u.statementsMatching(void 0, void 0, i, n)), l = [e(a, f("next"), o, n)];
		if (i instanceof s) {
			let e = i.uri.slice(-4);
			M("Deleting line " + e);
		}
		if (!d) throw Error("have no updater");
		d.update(c, l, function(e, n, r, a) {
			if (n) {
				let e = t.parentNode;
				if (e) {
					let t = e.previousSibling;
					e.parentNode && e.parentNode.removeChild(e), t && t.firstChild && t.firstChild.focus();
				}
			} else if (a && a.status === 409) v(t, "color: black;  background-color: #ffd;"), t.state = 0, ue(.5, 512), setTimeout(function() {
				O();
			}, 1e3);
			else {
				M("    removePart FAILED " + i + ": " + r), M("    removePart was deleting :'" + c), v(t, "color: black;  background-color: #fdd;");
				let e = a ? a.status : " [no response field] ";
				h("Error " + e + " saving changes: " + String(r));
			}
		});
	}, b = function(t, r, i) {
		let a = u.statementsMatching(r, f("indent")), o = a.length ? Number(a[0].object.value) : 0;
		if (o + i < -3) return;
		let s = o + i, c = e(r, f("indent"), s, n);
		if (!d) throw Error("no updater");
		d.update(a, c, function(e, r, i) {
			r ? v(t) : (M("Indent change FAILED '" + s + "' for " + n + ": " + i), v(t, "color: black;  background-color: #fdd;"), d.requestDownstreamAction(n, O));
		});
	}, x = function(t, r) {
		let i = null;
		t.addEventListener("keydown", function(e) {
			if (!d) throw Error("no updater");
			let i, a;
			switch (e.keyCode) {
				case 13: {
					let n = e.shiftKey;
					if (M("enter"), n ? (a = u.any(void 0, f("next"), r), i = "newlinesAfter") : (a = u.any(r, f("next")), i = "newlinesBefore"), a[i] = a[i] || 0, a[i] += 1, a[i] > 1) {
						M("    queueing newline queue = " + a[i]);
						return;
					}
					M("    go ahead line before " + a[i]), C(t, n);
					break;
				}
				case 8:
					if (t.value.length === 0) switch (M("Delete key line " + r.uri.slice(-4) + " state " + t.state), t.state) {
						case 1:
						case 2:
							t.state = 4;
							return;
						case 3:
						case 4: return;
						case void 0:
						case 0:
							t.state = 3, y(t), e.preventDefault();
							break;
						default: throw Error("pad: Unexpected state " + t);
					}
					break;
				case 9: {
					let n = e.shiftKey ? -1 : 1;
					b(t, r, n), e.preventDefault();
					break;
				}
				case 27:
					M("escape"), d.requestDownstreamAction(n, O), e.preventDefault();
					break;
				case 38:
					t.parentNode.previousSibling && (t.parentNode.previousSibling.firstChild.focus(), e.preventDefault());
					break;
				case 40: t.parentNode.nextSibling && (t.parentNode.nextSibling.firstChild.focus(), e.preventDefault());
			}
		});
		let a = function(t) {
			let r = t.subject;
			v(t, void 0, !0);
			let i = u.any(r, _.sioc("content")).value, o = [e(r, _.sioc("content"), i, n)], s;
			t.value && (s = [e(r, _.sioc("content"), t.value, n)]);
			let c = t.value;
			if (t.lastSent && i !== t.lastSent && console.warn("Out of order, last sent expected '" + i + "' but found '" + t.lastSent + "'"), t.lastSent = c, !d) throw Error("no updater");
			d.update(o, s, function(e, r, o, s) {
				if (r) g(!0), v(t), M("    Patch ok '" + i + "' -> '" + c + "' "), t.state === 4 ? (t.state = 3, y(t)) : t.state === 3 || (t.state === 2 ? (t.state = 1, a(t)) : t.state = 0);
				else if (M("    patch FAILED " + s.status + " for '" + i + "' -> '" + c + "': " + o), s.status === 409) v(t, "color: black;  background-color: #fdd;"), t.state = 0, ue(.5, 512), setTimeout(function() {
					d.requestDownstreamAction(n, O);
				}, 1e3);
				else {
					v(t, "color: black;  background-color: #fdd;");
					let e = s?.status;
					!e || e === 502 || e === 503 ? (t.lastSent = void 0, t.state = 0, setTimeout(() => {
						(t.state === 0 || t.state === void 0) && (t.state = 1, a(t));
					}, 2e3)) : (t.state = 0, h("    Error " + e + " sending data: " + o, !0), ue(1, 128));
				}
			});
		};
		t.addEventListener("input", function(e) {
			switch (v(t, void 0, !0), M("Input event state " + t.state + " value '" + t.value + "'"), t.state) {
				case 3: return;
				case 4: return;
				case 2: return;
				case 1:
					t.state = 2;
					return;
				case 0:
				case void 0: i !== null && clearTimeout(i), i = setTimeout(() => {
					i = null, (t.state === 0 || t.state === void 0) && (t.state = 1, a(t));
				}, 400);
			}
		});
	}, S = function(e, n, r) {
		let a = u.any(n, _.sioc("content"));
		a = a ? a.value : "";
		let o = t.createElement("tr");
		r ? l.insertBefore(o, e) : e && e.nextSibling ? l.insertBefore(o, e.nextSibling) : l.appendChild(o);
		let s = o.appendChild(t.createElement("input"));
		return s.subject = n, s.setAttribute("type", "text"), s.value = a, i ? (v(s, ""), x(s, n)) : (v(s, "color: #222; background-color: #fff"), M("Note can't add listeners - not logged in")), s;
	}, C = function(t, a) {
		let o = Ra, s = 0, c = null, l, u, p, m, h;
		t ? (t.tagName.toLowerCase() !== "input" && M("return pressed when current document is: " + t.tagName), l = t.subject, s = o.any(l, f("indent")), s = s ? Number(s.value) : 0, a ? (u = o.any(void 0, f("next"), l), p = l, m = u, c = "newlinesAfter") : (u = l, p = o.any(l, f("next")), m = p, c = "newlinesBefore"), h = t.parentNode) : (u = r, p = r, h = void 0);
		let g = Ce(n), y = g.uri.slice(-4), b = [e(u, f("next"), p, n)], x = [
			e(u, f("next"), g, n),
			e(g, f("next"), p, n),
			e(g, _.dc("author"), i, n),
			e(g, _.sioc("content"), "", n)
		];
		if (s > 0 && x.push(e(g, f("indent"), s, n)), M("    Fresh chunk " + y + " proposed"), !d) throw Error("no updater");
		d.update(b, x, function(e, t, n, r) {
			if (!t) M("    ERROR writing new line " + y + ": " + n);
			else {
				let e = S(h, g, a);
				v(e), e.focus(), c && (M("    Fresh chunk " + y + " updated, queue = " + m[c]), --m[c], m[c] > 0 && (M("    Implementing queued newlines = " + p.newLinesBefore), C(e, a)));
			}
		});
	}, w = function() {
		let e = {}, t = 0;
		function n(e) {
			h(e), t++;
		}
		if (!u.the(r, f("next"))) return n("No initial next pointer"), !1;
		let i = r, a;
		for (; a = u.the(i, f("next")), a || n("No next pointer from " + i), !a.sameTerm(r);) {
			i = a;
			let t = a.uri.split("#")[1];
			if (e[a.uri]) return n("Loop!"), !1;
			e[a.uri] = !0;
			let r = u.each(a, f("next")).length;
			r !== 1 && n("Should be 1 not " + r + " next pointer for " + t), r = u.each(a, f("indent")).length, r > 1 && n("Should be 0 or 1 not " + r + " indent for " + t), r = u.each(a, _.sioc("content")).length, r !== 1 && n("Should be 1 not " + r + " contents for " + t), r = u.each(a, _.dc("author")).length, r !== 1 && n("Should be 1 not " + r + " author for " + t), u.statementsMatching(void 0, _.sioc("contents")).forEach(function(t) {
				e[t.subject.value] || n("Loose chunk! " + t.subject.value);
			});
		}
		return !t;
	}, T = function() {
		if (u.each(r, f("next")).length !== 1) {
			let e = "Pad: Inconsistent data - NEXT pointers: " + u.each(r, f("next")).length;
			M(e), o.statusArea && (o.statusArea.textContent += e);
			return;
		}
		let e, t = [];
		for (let e = u.the(r, f("next")); !e.sameTerm(r); e = u.the(e, f("next"))) for (let n = 0; n < l.children.length; n++) {
			let r = l.children[n];
			r.firstChild && r.firstChild.subject.sameTerm(e) && (t[e.uri] = r.firstChild);
		}
		for (let n = l.children.length - 1; n >= 0; n--) e = l.children[n], t[e.firstChild.subject.uri] || l.removeChild(e);
		e = l.firstChild;
		for (let n = u.the(r, f("next")); !n.sameTerm(r); n = u.the(n, f("next"))) {
			let r = u.any(n, _.sioc("content")).value;
			if (e && t[n.uri]) {
				let t = e.firstChild;
				r !== t.value && (t.value = r), v(t), t.state = 0, delete t.lastSent, e = e.nextSibling;
			} else S(e, n, !0);
		}
	}, E = function(e) {
		if (e.refresh) {
			e.refresh();
			return;
		}
		for (let t = 0; t < e.children.length; t++) E(e.children[t]);
	}, D = !1, ee = function() {
		M("    reloaded OK"), g(), w() ? E(l) : h("CONSISTENCY CHECK FAILED");
	}, O = function() {
		if (D) {
			M("   Already reloading - stop");
			return;
		}
		D = !0;
		let e = 1e3, t = function() {
			if (M("try reload - timeout = " + e), !d) throw Error("no updater");
			d.reload(d.store, n, function(r, i, a) {
				D = !1, r ? ee() : a.status === 0 ? (h("Network error refreshing the pad. Retrying in " + e / 1e3), D = !0, e *= 2, setTimeout(t, e)) : h("Error " + a.status + "refreshing the pad:" + i + ". Stopped. " + n);
			});
		};
		t();
	};
	if (l.refresh = T, l.reloadAndSync = O, i || M("Warning: must be logged in for pad to be edited"), c) M("Existing pad."), w() ? (T(), u.holds(r, f("next"), r) && C()) : M(l.textContent = "Inconsistent data. Abort");
	else {
		M("No pad exists - making new one.");
		let t = [
			e(r, _.rdf("type"), f("Notepad"), n),
			e(r, _.dc("author"), i, n),
			e(r, _.dc("created"), /* @__PURE__ */ new Date(), n),
			e(r, f("next"), r, n)
		];
		if (!d) throw Error("no updater");
		d.update([], t, function(e, t, n) {
			t ? (M("Initial pad created"), C()) : h(n || "");
		});
	}
	return l;
}
function Ha(e, t) {
	let n = [];
	for (let r = t.the(e, za("next")); !r.sameTerm(e); r = t.the(r, za("next"))) n.push(r);
	return n;
}
function Ua(e) {
	return e.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
}
function Wa(e, t) {
	let n = Ha(e, t), r = "<html>\n  <head>\n", i = t.anyValue(e, _.dct("title"));
	i && (r += `    <title>${Ua(i)}</title>\n`), r += "  </head>\n  <body>\n";
	let a = 0;
	function o(e) {
		for (; a < e; a++) r += "<ul>\n";
	}
	function s(e) {
		for (; a > e; a--) r += "</ul>\n";
	}
	return n.forEach((e) => {
		let n = t.anyJS(e, za("indent")), i = t.anyJS(e, _.sioc("content"));
		if (!i) return;
		let a = Ua(i);
		if (n < 0) {
			s(0);
			let e = n >= -3 ? 4 + n : 1;
			r += `\n<h${e}>${a}</h${e}>\n`;
		} else n > 0 ? (s(n), o(n), r += `<li>${a}</li>\n`) : (s(n), r += `<p>${a}</p>\n`);
	}), s(0), r += "  </body>\n</html>\n", r;
}
//#endregion
//#region src/chat/bookmarks.js
var Ga = {
	icons: N,
	ns: _,
	media: dn,
	pad: La,
	style: A,
	utils: se,
	widgets: je
}, Ka = a("http://www.w3.org/2002/01/bookmark#"), qa = "noun_45961.svg", Ja = j, Ya = window.document || null;
function Xa(e, t) {
	return new Promise(function(n, r) {
		D.updater.update(e, t, function(e, t, i) {
			t ? n() : r(Error(i));
		});
	});
}
async function Za(e) {
	let t = Ka("Bookmark");
	if (await _t(e, t, !0), e.instances && e.instances.length > 0) e.bookmarkDocument = e.instances[0], e.instances.length > 1 && me("More than one bookmark file! " + e.instances);
	else if (e.publicProfile) {
		let n = c(e.publicProfile.dir().uri + "bookmarks.ttl");
		try {
			M("Creating new bookmark file " + n), await D.fetcher.createIfNotExists(n);
		} catch (t) {
			return me("Can't make fresh bookmark file:" + t), e;
		}
		await d.registerInTypeIndex(n, e.index, t), e.bookmarkDocument = n;
	} else me("You seem to have no bookmark file, nor even a profile file!");
	return e;
}
async function Qa(t, n) {
	let r = "", i = T.currentUser();
	if (!i) throw Error("Must be logged on to add Bookmark");
	r = Ja(D.any(n, _.foaf("maker"))) + ": " + D.anyValue(n, _.sioc("content")).slice(0, 80);
	let a = t.bookmarkDocument, o = Ga.widgets.newThing(a, r), s = [
		e(a, Ga.ns.dct("references"), o, a),
		e(o, Ga.ns.rdf("type"), Ka("Bookmark"), a),
		e(o, Ga.ns.dct("created"), /* @__PURE__ */ new Date(), a),
		e(o, Ka("recalls"), n, a),
		e(o, Ga.ns.foaf("maker"), i, a),
		e(o, Ga.ns.dct("title"), r, a)
	];
	try {
		await Xa([], s);
	} catch (e) {
		let t = "Making bookmark: " + e;
		return me(t), null;
	}
	return o;
}
async function $a(e, t, n) {
	await D.fetcher.load(e.bookmarkDocument);
	let r = D.each(null, Ka("recalls"), t, e.bookmarkDocument);
	if (r.length) {
		if (!confirm("Delete bookmark on this?" + r.length)) return;
		for (let e = 0; e < r.length; e++) try {
			await Xa(D.connectedStatements(r[e]), []), n.style.backgroundColor = "white", M("Bookmark deleted: " + r[e]);
		} catch (e) {
			ge("Cant delete bookmark:" + e), me("Cannot delete bookmark:" + e);
		}
	} else {
		let r = await Qa(e, t);
		n.style.backgroundColor = "yellow", M("Bookmark added: " + r);
	}
}
async function eo(e, t) {
	async function n(t) {
		await D.fetcher.load(e.bookmarkDocument);
		let n = D.any(null, Ka("recalls"), t.target, e.bookmarkDocument);
		t.style = Ga.style.buttonStyle, n && (t.style.backgroundColor = "yellow");
	}
	let r;
	if (e.bookmarkDocument) return r = Ga.widgets.button(Ya, Ga.icons.iconBase + qa, Ja(Ka("Bookmark")), () => {
		$a(e, t, r);
	}), r.target = t, await n(r), r;
}
//#endregion
//#region src/chat/messageTools.js
var to = window.document, no = "noun_253504.svg", ro = "noun_1384132.svg", io = "noun_1384135.svg", ao = "noun-reply-5506924.svg", oo = {};
oo[_.schema("AgreeAction")] = "👍", oo[_.schema("DisagreeAction")] = "👎", oo[_.schema("EndorseAction")] = "⭐️", oo[_.schema("LikeAction")] = "❤️";
async function so(e, t) {
	let n = to.createElement("span");
	async function r() {
		if (n.innerHTML = "", Aa(e)) return n;
		let r = (await Da(e)).map((e) => D.each(null, _.schema("target"), e, t)).flat();
		if (r.length === 0) return n;
		let i = r.map((e) => [
			D.any(e, _.rdf("type"), null, t),
			D.any(e, _.sioc("content"), null, t),
			D.any(e, _.schema("agent"), null, t)
		]);
		i.sort(), i.forEach((e) => {
			let [t, r, i] = e, a;
			i ? (a = to.createElement("a"), a.setAttribute("href", i.uri)) : a = to.createTextNode(""), a.textContent = r || oo[t] || "⬜️", n.appendChild(a);
		});
	}
	return r().then(M("sentimentStripLinked: sentimentStripLinked async refreshed")), n.refresh = r, n;
}
async function co(t, n, r, i) {
	async function a() {
		let e = D.any(t, _.foaf("maker"));
		if (!d) alert("You can't delete the message, you are not logged in.");
		else if (d.sameTerm(e)) {
			try {
				await i.deleteMessage(t);
			} catch (e) {
				let t = "Error deleting messaage " + e;
				me(t), alert(t), (r.statusArea || n.parentNode).appendChild(Fe(to, t));
			}
			n.parentNode.removeChild(n);
		} else alert("You can't delete the message, you are not logged in as the author, " + e);
		l();
	}
	async function o(e) {
		d.value === D.any(t, _.foaf("maker")).value && (l(), await vo(e, t, i, r));
	}
	async function s() {
		let e = await i.createThread(t), n = r.chatOptions;
		if (!n) throw Error("replyInThread: missing options");
		n.showThread(e, n), l();
	}
	let c = to.createElement("div");
	if (await ka(t).value === _.schema("dateDeleted").value) return c;
	function l() {
		c.parentElement.parentElement.removeChild(c.parentElement);
	}
	async function u(e) {
		await D.updater.update(D.connectedStatements(e), []);
	}
	let d = T.currentUser();
	d && D.holds(t, _.foaf("maker"), d) && (c.appendChild(be(to, c, "message", a)), c.appendChild(Ae(to, N.iconBase + no, "edit", () => o(n)))), eo(r).then((e) => {
		e && c.appendChild(e);
	});
	function f(t, r, i, a, o, s) {
		function c() {
			l.style.backgroundColor = p ? "yellow" : "white";
		}
		let l = Ae(to, i, j(a), async function(i) {
			if (p) await u(p), p = null, c();
			else {
				p = Ce(o);
				let i = [
					e(p, _.schema("agent"), t.me, o),
					e(p, _.rdf("type"), a, o),
					e(p, _.schema("target"), r, o)
				];
				if (await D.updater.update([], i), c(), s) {
					let e = !1;
					for (let t = 0; t < s.length; t++) {
						let n = d(s[t]);
						n && (await u(n), e = !0);
					}
					e && _e(n);
				}
			}
		});
		function d(e) {
			let n = D.each(null, _.schema("agent"), t.me, o).filter((t) => D.holds(t, _.rdf("type"), e, o)).filter((e) => D.holds(e, _.schema("target"), r, o));
			return n.length ? n[0] : null;
		}
		function f() {
			p = d(a), c();
		}
		let p;
		return l.refresh = f, f(), l;
	}
	if (d = T.currentUser(), d && await ka(t).value !== _.schema("dateDeleted").value) {
		let e = {
			me: d,
			dom: to,
			div: c
		};
		c.appendChild(f(e, t, N.iconBase + ro, _.schema("AgreeAction"), t.doc(), [_.schema("DisagreeAction")])), c.appendChild(f(e, t, N.iconBase + io, _.schema("DisagreeAction"), t.doc(), [_.schema("AgreeAction")]));
	}
	D.any(t, _.dct("created")) && c.appendChild(Ae(to, N.iconBase + ao, "Reply in thread", async () => {
		await s();
	}));
	let p = c.appendChild(ve(to));
	return p.style.float = "right", p.firstChild.style.opacity = "0.3", p.addEventListener("click", l), c;
}
//#endregion
//#region src/chat/message.js
var I = window.document, lo = A.messageBodyStyle, uo = j;
function fo(e, t) {
	let n = I.createElement("img"), r = "10";
	t.inlineImageHeightEms && (r = ("" + t.inlineImageHeightEms).trim()), n.setAttribute("style", "max-height: " + r + "em; border-radius: 1em; margin: 0.7em;"), e && n.setAttribute("src", e);
	let i = I.createElement("a");
	return i.setAttribute("href", e), i.setAttribute("target", "images"), i.appendChild(n), he(n, $rdf.sym(e)), i;
}
var po = function(e, t) {
	let n = I.createElement("a");
	return t && t.uri && (n.setAttribute("href", t.uri), n.addEventListener("click", Se, !0), n.setAttribute("style", "color: #3B5998; text-decoration: none; ")), n.textContent = e, n;
};
function mo(e) {
	let t = D.any(e, _.foaf("nick"));
	return t ? "" + t.value : "" + uo(e);
}
function ho(e, t, n, r) {
	let i = e.appendChild(po(mo(t), t));
	t.uri && D.fetcher.nowOrWhenFetched(t.doc(), void 0, function(e, n) {
		i.textContent = mo(t);
	}), e.appendChild(I.createElement("br")), e.appendChild(po(n, r));
}
function go(e, t, n, r) {
	let i = e.appendChild(po(uo(t), t));
	t.uri && D.fetcher.nowOrWhenFetched(t.doc(), void 0, function(e, n) {
		i.textContent = mo(t);
	});
	let a = e.appendChild(po(n, r));
	a.style.fontSize = "80%", a.style.marginLeft = "1em", e.appendChild(I.createElement("br"));
}
async function _o(e, t, n, r, i) {
	let a = !1, o = r.colorizeByAuthor === "1" || r.colorizeByAuthor === !0, s = D.any(t, _.foaf("maker")), c = D.any(t, _.dct("created")), l = await ka(t), u = D.any(l, _.foaf("maker")), d = s.uri === u?.uri ? l : t, f = D.any(d, _.sioc("content")), p = await Da(d);
	p.length > 1 && M("renderMessageRow versions: ", p.join(",  "));
	let m = p.map((e) => D.each(e, _.sioc("has_reply"))).flat(), h = null, g = [];
	for (let e of m) D.holds(e, _.rdf("type"), _.sioc("Thread")) ? (h = e, M("renderMessageRow: found thread: " + h)) : g.push(e);
	g.length > 1 && M("renderMessageRow: found normal replies: ", g), h ||= D.any(null, _.sioc("has_member"), t);
	let v = D.any(d, $rdf.sym(`${aa}proofValue`)), y = oa();
	y.id = d.uri, y.created = D.any(d, _.dct("created")).value, y.content = f.value, y.maker = s.uri, v?.value ? Sa(s).then((e) => {
		e || me("message is signed but " + s.uri + " is missing publicKey"), e?.match(/[0-9A-Fa-f]{6}/g) ? v?.value && !la(v?.value, y, e) && me("invalid signature\n" + y.id) : me("invalid publicKey hex string\n" + s.uri + "\n" + e);
	}) : (a = !0, me(d.uri + " is unsigned"));
	let b = await Oa(t), x = !t.sameTerm(b), S = D.the(b, _.dct("created"), null, b.doc()) || D.the(t, _.dct("created"), null, t.doc()), C = I.createElement("tr");
	a && C.setAttribute("style", "background-color: red"), C.AJAR_date = S.value, C.AJAR_subject = t;
	let w = I.createElement("td");
	if (C.appendChild(w), r.authorDateOnLeft) ho(w, s, Ie(S.value), t);
	else {
		let e = I.createElement("img");
		e.setAttribute("style", "max-height: 2.5em; max-width: 2.5em; border-radius: 0.5em; margin: auto;"), Ne(e, s), w.appendChild(e);
	}
	let T = Ie(S.value);
	x && (T += " ... " + Ie(c.value));
	let E = C.appendChild(I.createElement("td"));
	r.authorDateOnLeft || go(E, s, T, t);
	let ee = f ? f.value.trim() : "??? no content?", O = /^https?:\/[^ <>]*$/i.test(ee), te = null;
	if (O) {
		if (/\.(gif|jpg|jpeg|tiff|png|svg)$/i.test(ee) && r.expandImagesInline) {
			let e = fo(ee, r);
			E.appendChild(e);
		} else {
			let e = E.appendChild(I.createElement("a"));
			te = e.appendChild(I.createElement("p")), e.href = ee, te.textContent = ee, E.appendChild(e);
		}
	} else te = I.createElement("p"), E.appendChild(te), te.textContent = ee;
	if (te) {
		let e = o ? Ba(s) : ne(n);
		te.setAttribute("style", lo + "background-color: " + e + ";");
	}
	function ne(e) {
		return e ? "#e8ffe8" : "white";
	}
	let re = await so(t, t.doc());
	re.children.length && (E.appendChild(I.createElement("br")), E.appendChild(re));
	let k = I.createElement("td");
	C.appendChild(k);
	let ie = Ae(I, N.iconBase + "noun_243787.svg", "...");
	return k.appendChild(ie), ie.addEventListener("click", async function(n) {
		if (C.toolTR) {
			C.parentNode.removeChild(C.toolTR), delete C.toolTR;
			return;
		}
		let a = I.createElement("tr"), o = await co(t, C, {
			...i,
			chatOptions: r
		}, e);
		o.style = "border: 0.05em solid #888; border-radius: 0 0 0.7em 0.7em;  border-top: 0; height:3.5em; background-color: #fff;", C.nextSibling ? C.parentElement.insertBefore(a, C.nextSibling) : C.parentElement.appendChild(a), C.toolTR = a, a.appendChild(I.createElement("td"));
		let s = a.appendChild(I.createElement("td"));
		a.appendChild(I.createElement("td")), s.appendChild(o);
	}), h && r.showThread && k.appendChild(Ae(I, N.iconBase + "noun_1180164.svg", "see thread", (e) => {
		r.showThread(h, r);
	})), C;
}
async function vo(e, t, n, r) {
	let i = e.parentNode, a = yo(n, i, r, n.options, await ka(t));
	i.insertBefore(a, e), a.originalRow = e, e.style.visibility = "hidden";
}
function yo(e, t, n, r, i) {
	function a(e) {
		e.originalRow.style.visibility = "visible", e.parentNode.removeChild(e);
	}
	async function o(e) {
		await s(v.value, !0);
	}
	async function s(a, o) {
		async function s(a, s) {
			if (await xo(e, t, a, !1, r, n), i) {
				let e = p.originalRow;
				e.parentNode ? e.parentNode.removeChild(e) : (me("No parentNode on old message " + e.textContent), e.style.backgroundColor = "#fee", e.style.visibility = "hidden"), p.parentNode.removeChild(p);
			} else o && (v.value = "", v.setAttribute("style", lo), v.disabled = !1, v.scrollIntoView(r.newestFirst), v.focus(), v.select());
		}
		o && (v.setAttribute("style", lo + "color: #bbb;"), v.disabled = !0);
		let c;
		try {
			c = await e.updateMessage(a, i, null, r.thread);
		} catch (e) {
			(n.statusArea || p).appendChild(Fe(I, "Error writing message: " + e));
			return;
		}
		await s(c, a);
	}
	function c(e) {
		let n = t.chatDocument.dir().uri;
		Pe(D.fetcher, e, n + "Files", n + "Pictures", async function(e, t) {
			await s(t);
		});
	}
	let l = async function(e) {
		for (let t of e) await s(t);
	};
	function u() {
		function t() {
			return b = $rdf.sym(d.dir().uri + "Image_" + Date.now() + ".png"), b;
		}
		async function n(e) {
			e && await s(e.uri);
		}
		if (r.menuHandler) {
			let e = Ae(I, N.iconBase + "noun_243787.svg", "More");
			e.setAttribute("style", A.buttonStyle + "float: right;"), g.appendChild(e);
		}
		r.menuHandler;
		let u = T.currentUser();
		if (ho(m, u, "", null), v = I.createElement("textarea"), h.innerHTML = "", h.appendChild(v), v.rows = 3, i && (v.value = D.anyValue(i, _.sioc("content"), null, i.doc())), v.setAttribute("style", lo + "background-color: #eef;"), v.addEventListener("keydown", async function(e) {
			e.code === "Enter" && (!e.shiftKey && !r.shiftEnterSendsMessage || e.shiftKey && r.shiftEnterSendsMessage) && await o(e);
		}, !1), fe(v, l, c), g.innerHTML = "", y = Ae(I, f, "Send"), y.style.float = "right", y.addEventListener("click", (e) => o(), !1), g.appendChild(y), i) {
			let e = g.appendChild(ve(I));
			e.style.float = "left", e.addEventListener("click", (e) => a(p), !1), g.appendChild(e);
		}
		let d = e.dateFolder.leafDocumentFromDate(/* @__PURE__ */ new Date()), b;
		h.appendChild(dn.cameraButton(I, D, t, n)), Fa(e.channel, e.channel.doc());
	}
	let d, f;
	i ? (d = D.anyValue(i, _.dct("created"), null, i.doc()), f = N.iconBase + "noun_1180158.svg") : (f = N.iconBase + "noun_383448.svg", d = "9999-01-01T00:00:00Z");
	let p = I.createElement("tr"), m = I.createElement("td"), h = I.createElement("td"), g = I.createElement("td");
	p.appendChild(m), p.appendChild(h), p.appendChild(g), p.AJAR_date = d;
	let v, y;
	return mt({
		div: h,
		dom: I
	}).then((e) => {
		u(), Object.assign(e, n), Za(e).then((e) => {});
	}), p;
}
//#endregion
//#region src/chat/infinite.js
function bo(e) {
	"Notification" in window ? Notification.permission === "granted" ? new Notification(e) : Notification.permission !== "denied" && Notification.requestPermission().then(function(t) {
		t === "granted" && new Notification(e);
	}) : me("This browser does no t support desktop notification");
}
async function xo(e, t, n, r, i, a) {
	let o = await _o(e, n, r, i, a);
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
async function So(t, n, r, i) {
	async function a(e, t) {
		let n = {}, r, i;
		for (r = t.firstChild; r; r = r.nextSibling) r.AJAR_subject && (n[r.AJAR_subject.uri] = !0);
		let a = D.each(e, _.wf("message"), null, t.chatDocument), s = {};
		for (let e of a) s[e.uri] = !0, n[e.uri] || await o(e, t);
		for (r = t.firstChild; r;) i = r.nextSibling, r.AJAR_subject && !s[r.AJAR_subject.uri] && t.removeChild(r), r = i;
		for (r = t.firstChild; r; r = r.nextSibling) r.AJAR_subject && _e(r);
	}
	async function o(e, t) {
		if (Aa(e) && !i.showDeletedMessages) return;
		let n = D.any(null, _.sioc("has_member"), e, e.doc()), r = D.any(e, _.sioc("id"), null, e.doc());
		if (r && !n && (n = D.any(null, _.sioc("has_member"), r, e.doc())), i.thread) {
			if (!D.holds(e, _.sioc("has_reply"), i.thread) && !(n && n.sameTerm(i.thread))) return;
		} else if (n) return;
		t.fresh || await xo(h, t, e, t.fresh, i, b);
	}
	async function s(e) {
		let t = e ? C : w, n = t.messageTable.date;
		if (e && C.limit && n <= C.limit) return x || await d(), !0;
		if (n = await g.loadPrevious(n, e), !n && !e && !x && await d(), !n) return !0;
		let r = !1;
		if (!e) {
			let e = g.leafDocumentFromDate(/* @__PURE__ */ new Date());
			r = g.leafDocumentFromDate(n).sameTerm(e);
		}
		let i = await c(n, r);
		return t.messageTable = i, (e ? m : !m) ? v.appendChild(i) : v.insertBefore(i, v.firstChild), r;
	}
	async function c(e, n) {
		let r = g.leafDocumentFromDate(e);
		try {
			await D.fetcher.createIfNotExists(r);
		} catch (i) {
			let a = t.createElement("table").appendChild(t.createElement("tr"));
			return i.response && i.response.status && i.response.status === 404 ? await l(e, n) : (M("*** Error NON 404 for chat file " + r), a.appendChild(Fe(t, i, "pink")), a);
		}
		return await l(e, n);
	}
	async function l(e, n) {
		async function r() {
			let e = await s(!0);
			return e ? c.initial = !0 : c.extendedBack = !0, e;
		}
		async function a() {
			return await s(!1);
		}
		let c = t.createElement("table");
		c.style.width = "100%", c.extendBackwards = r, c.extendForwards = a, c.date = e;
		let l = g.leafDocumentFromDate(e);
		if (c.chatDocument = l, c.fresh = !1, c.setAttribute("style", "width: 100%;"), n) {
			c.final = !0, x = c, w.messageTable = c;
			let e = yo(h, c, b, i);
			m ? c.insertBefore(e, c.firstChild) : c.appendChild(e), c.inputRow = e;
		}
		{
			let n = t.createElement("tr"), r = n.appendChild(t.createElement("td"));
			r.style = "text-align: center; vertical-align: middle; color: #888; font-style: italic;", r.textContent = Ie(e.toISOString(), !0);
			let a = n.appendChild(t.createElement("td"));
			i.includeRemoveButton && a.appendChild(ve(t, (e) => {
				v.parentNode.removeChild(v);
			})), c.extendedForwards = !1, m ? c.appendChild(n) : c.insertBefore(n, c.firstChild);
		}
		let u = D.statementsMatching(null, _.wf("message"), null, l);
		!n && u.length;
		for (let e of u) await o(e.object, c);
		return c.fresh = !0, c;
	}
	async function u() {
		let t = g.leafDocumentFromDate(/* @__PURE__ */ new Date());
		if (!t.sameTerm(w.messageTable.chatDocument)) {
			x.inputRow && (x.removeChild(x.inputRow), delete x.inputRow);
			let n = w.messageTable.chatDocument;
			if (await d(), !D.holds(n, _.rdfs("seeAlso"), t, n)) {
				let r = [e(n, _.rdfs("seeAlso"), t, n)];
				try {
					D.updater.update([], r);
				} catch (e) {
					alert("Unable to link old chat file to new one:" + e);
				}
			}
		}
	}
	async function d() {
		let e = /* @__PURE__ */ new Date(), t = g.leafDocumentFromDate(e), n = await c(e, !0);
		return v.appendChild(n), v.refresh = async function() {
			await u(/* @__PURE__ */ new Date()), await a(r, n), bo(r);
		}, D.updater.addDownstreamChangeListener(t, v.refresh), x = n, w.messageTable = x, n;
	}
	async function f(e, t) {
		if (T) return;
		T = !0;
		let n = !t, r;
		for (; v.scrollTop < 150 && C.messageTable && !C.messageTable.initial && C.messageTable.extendBackwards;) {
			if (v.scrollHeight === 0) {
				setTimeout(f, 2e3), T = !1;
				return;
			}
			let e = v.scrollHeight - v.scrollTop;
			if (r = await C.messageTable.extendBackwards(), n && (v.scrollTop = v.scrollHeight - e), t && t(), r) break;
		}
		for (; i.selectedMessage && v.scrollHeight - v.scrollTop - v.clientHeight < 150 && w.messageTable && !w.messageTable.final && w.messageTable.extendForwards;) {
			let e = v.scrollTop;
			if (r = await w.messageTable.extendForwards(), n && (v.scrollTop = e), t && t(), r) break;
		}
		T = !1;
	}
	async function p() {
		function e() {
			s && s.selectedElement && s.selectedElement.scrollIntoView({ block: "center" });
		}
		function t() {
			i.selectedElement ? i.selectedElement.scrollIntoView({ block: "center" }) : x.inputRow.scrollIntoView && x.inputRow.scrollIntoView(m);
		}
		let n, r, a;
		i.selectedMessage && (r = i.selectedMessage.doc()), S && (a = S.doc());
		let o = r || a;
		if (o) {
			let e = /* @__PURE__ */ new Date();
			n = g.leafDocumentFromDate(e).sameTerm(o);
		}
		let s;
		o && !n ? (s = await c(g.dateFromLeafDocument(o), n), v.appendChild(s), C.messageTable = s, w.messageTable = s, e(), setTimeout(e, 1e3)) : (await d(), C.messageTable = x, w.messageTable = x), await f(null, t), v.addEventListener("scroll", f), i.solo && document.body.addEventListener("scroll", f);
	}
	i ||= {}, i.authorDateOnLeft = !1;
	let m = i.newestFirst === "1" || i.newestFirst === !0, h = new Ea(r, i), g = h.dateFolder, v = t.createElement("div");
	h.div = v;
	let y = v.appendChild(t.createElement("div")), b = {
		dom: t,
		statusArea: y,
		div: y
	}, x, S, C = { messageTable: null }, w = { messageTable: null };
	if (i.thread) {
		let e = i.thread;
		if (S = D.any(null, _.sioc("has_reply"), e, e.doc()), S) {
			let e = D.any(S, _.dct("created"), null, S.doc());
			e && (C.limit = new Date(e.value));
		}
	}
	let T = !1;
	return await p(), v;
}
//#endregion
//#region src/lib/preferences.js
var Co = /* @__PURE__ */ i({
	get: () => Eo,
	getPreferencesForClass: () => Mo,
	recordPersonalDefaults: () => ko,
	recordSharedPreferences: () => Oo,
	renderPreferencesForm: () => Ao,
	set: () => Do,
	value: () => To
}), wo = D, To = [];
function Eo(e) {
	return To[e];
}
function Do(e, t) {
	if (typeof t != "string") throw M("Non-string value of preference " + e + ": " + t), Error("Non-string value of preference " + e + ": " + t);
	this.value[e] = t;
}
function Oo(t, n) {
	return new Promise(function(r, i) {
		let a = wo.any(t, _.ui("sharedPreferences"));
		if (a) n.sharedPreferences = a, r(n);
		else {
			wo.updater.editable(t.doc()) || (M(` Cant make shared preferences, may not change ${t.doc}`), r(n));
			let a = c(t.doc().uri + "#SharedPreferences"), o = [e(t, _.ui("sharedPreferences"), a, t.doc())];
			M("Creating shared preferences " + a), wo.updater.update([], o, function(e, t, o) {
				t ? (n.sharedPreferences = a, r(n)) : i(/* @__PURE__ */ Error("Error creating shared prefs: " + o));
			});
		}
	});
}
function ko(t, n) {
	return new Promise(function(r, i) {
		ht(n).then((n) => {
			if (!n.preferencesFile) {
				M("Not doing private class preferences as no access to preferences file. " + n.preferencesFileError);
				return;
			}
			let a = wo.each(null, _.solid("forClass"), t, n.preferencesFile), o = [], s, c;
			if (a.length) {
				if (a.forEach((e) => {
					s ||= wo.any(e, _.solid("personalDefaults"));
				}), s) {
					n.personalDefaults = s, r(n);
					return;
				}
				s = Ce(n.preferencesFile), c = a[0];
			} else c = Ce(n.preferencesFile), o = [e(c, _.rdf("type"), _.solid("TypeRegistration"), n.preferencesFile), e(c, _.solid("forClass"), t, n.preferencesFile)];
			s = Ce(n.preferencesFile), o.push(e(c, _.solid("personalDefaults"), s, n.preferencesFile)), wo.updater.update([], o, function(e, a, o) {
				a ? (n.personalDefaults = s, r(n)) : i(/* @__PURE__ */ Error("Setting preferences for " + t + ": " + o));
			});
		}, (e) => {
			i(e);
		});
	});
}
function Ao(e, t, n, r) {
	let i = r.dom.createElement("div");
	return Pa(e, e.doc(), r.me).then((a) => {
		let o = r.dom;
		function s(e) {
			i.appendChild(o.createElement("h5")).textContent = e;
		}
		s("My view of this " + r.noun), Ee(o, i, {}, a, n, e.doc(), (e, t) => {
			e || Me(r, t);
		}), s("Everyone's  view of this " + r.noun), Oo(e, r).then((r) => {
			let a = r.sharedPreferences;
			Ee(o, i, {}, a, n, e.doc(), (e, t) => {
				e || Me(r, t);
			}), s("My default view of any " + r.noun), ko(t, r).then((e) => {
				Ee(o, i, {}, e.personalDefaults, n, e.preferencesFile, (t, n) => {
					t || Me(e, n);
				});
			}, (e) => {
				Me(r, e);
			});
		});
	}, (e) => {
		i.appendChild(Fe(r.dom, e));
	}), i;
}
function jo(e) {
	return e.datatype ? e.datatype.equals(_.xsd("boolean")) ? e.value === "1" : e.datatype.equals(_.xsd("dateTime")) || e.datatype.equals(_.xsd("date")) ? new Date(e.value) : e.datatype.equals(_.xsd("integer")) || e.datatype.equals(_.xsd("float")) || e.datatype.equals(_.xsd("decimal")) ? Number(e.value) : e.value : e;
}
function Mo(e, t, n, r) {
	return new Promise(function(i, a) {
		Oo(e, r).then((r) => {
			let o = r.sharedPreferences;
			if (r.me) Pa(e, e.doc(), r.me).then((e) => {
				ko(t, r).then((t) => {
					let r = [], a = t.personalDefaults;
					n.forEach((t) => {
						let n = wo.any(e, t) || wo.any(o, t) || wo.any(a, t);
						n && (r[t.uri] = jo(n));
					}), i(r);
				}, a);
			}, a);
			else {
				let e = [];
				n.forEach((t) => {
					let n = wo.any(o, t);
					n && (e[t.uri] = jo(n));
				}), i(e);
			}
		});
	});
}
//#endregion
//#region src/lib/table.js
var No = {
	icons: N,
	log: ce,
	ns: _,
	utils: se,
	widgets: je
};
function Po(e, t) {
	let n = t.sourceDocument, r = t.tableClass, i = t.query, a = No.ns, o = D, s = {}, c = {
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
	}, f = t.keyVariable || "?_row", p = 0, m, h, g, _, v = null, y = null, x = e.createElement("div");
	x.className = "tableViewPane", x.appendChild(w());
	let S = e.createElement("div");
	x.appendChild(S), x.refresh = function() {
		P(C.query, C.logicalRows, C.columns, C);
	};
	let C;
	if (i) C = Be(i), S.appendChild(C);
	else {
		let e = ge();
		m = e[0], h = e[1], r || g.appendChild(ce(m, h)), y = Ve(h), te(y || m);
	}
	return x;
	function w() {
		let t = e.createElement("table");
		t.setAttribute("class", "toolbar");
		let n = e.createElement("tr");
		return g = e.createElement("td"), n.appendChild(g), _ = e.createElement("td"), n.appendChild(_), t.appendChild(n), t;
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
		r ||= o.variable("_any"), e.pat.add(t, No.ns.rdf("type"), r);
	}
	function ee(e, t, n) {
		let r = n.getColumns();
		for (let n = 0; n < r.length; ++n) {
			let i = r[n], a = o.formula();
			a.add(t, i.predicate, i.getVariable()), e.pat.optional.push(a);
		}
	}
	function O(e) {
		let t = new b(), n = o.variable(f.slice(1));
		return T(t, e), E(t, n, e), ee(t, n, e), t;
	}
	function te(e) {
		re(_), _.appendChild(ue(e)), ne(O(e), e);
	}
	function ne(e, t) {
		v && (v.running = !1);
		let n = Be(e, t);
		re(S), S.appendChild(n), v = e;
	}
	function re(e) {
		for (; e.childNodes.length > 0;) e.removeChild(e.childNodes[0]);
	}
	function k(e) {
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
			return j(this.type);
		}, this.addUse = function() {
			this.useCount += 1;
		};
	}
	function ie() {
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
			return this.getHints().label ? this.getHints().label : this.predicate ? this.predicate.sameTerm(a.rdf("type")) && this.superClass ? j(this.superClass, !0) : j(this.predicate) : this.variable ? this.variable.toString() : "unlabeled column?";
		}, this.setPredicate = function(e, t, n) {
			t ? (this.inverse = e, this.constraints = this.constraints.concat(o.each(e, No.ns.rdfs("domain"))), e.sameTerm(a.rdfs("subClassOf")) && n.termType === "NamedNode" && (this.superClass = n, this.alternatives = o.each(void 0, a.rdfs("subClassOf"), n))) : (this.predicate = e, this.constraints = this.constraints.concat(o.each(e, No.ns.rdfs("range"))));
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
	function oe(e, t) {
		let n = [];
		for (let r in e) {
			let i = e[r];
			(!t || t(r, i)) && n.push(i);
		}
		return n;
	}
	function se(t, n) {
		let r = e.createElement("option");
		return r.setAttribute("value", n), r.appendChild(e.createTextNode(t)), r;
	}
	function ce(t, n) {
		let r = e.createElement("div");
		r.appendChild(e.createTextNode("Select type: "));
		let i = e.createElement("select");
		i.appendChild(se("All types", "null"));
		for (let e in n) i.appendChild(se(n[e].getLabel(), e));
		return i.addEventListener("click", function() {
			let e;
			e = i.value === "null" ? t : n[i.value], le(e);
		}, !1), r.appendChild(i), r;
	}
	function le(e) {
		te(e);
	}
	function ue(t) {
		let n = e.createElement("div"), r = t.getUnusedColumns();
		if (r.sort(function(e, t) {
			let n = e.sortKey(), r = t.sortKey();
			return (n > r) - (n < r);
		}), r.length > 0) {
			n.appendChild(e.createTextNode("Add column: "));
			let i = e.createElement("select");
			i.appendChild(se("", "-1"));
			for (let e = 0; e < r.length; ++e) {
				let t = r[e];
				i.appendChild(se(t.getLabel(), "" + e));
			}
			n.appendChild(i), i.addEventListener("click", function() {
				let e = Number(i.value);
				e >= 0 && (t.addColumn(r[e]), te(t));
			}, !1);
		}
		return n;
	}
	function de(e, t) {
		for (let n in e) {
			let r = e[n];
			if (r.variable.toNT() === t) return r;
		}
		throw Error(`getColumnForVariable: no column for variable ${t}`);
	}
	function A(e, t) {
		let n;
		return t.uri in e ? n = e[t.uri] : (n = new ie(), n.setPredicate(t), e[t.uri] = n), n;
	}
	function fe(e, t) {
		let n;
		return t.uri in e ? n = e[t.uri] : (n = new k(t), e[t.uri] = n), n;
	}
	function pe() {
		let e = {}, t = o.statementsMatching(void 0, No.ns.rdf("type"), r, n), i = {};
		for (let n = 0; n < t.length; ++n) {
			let r = t[n].object;
			if (r.termType !== "NamedNode") continue;
			let a = fe(e, r);
			r.uri in i || (i[r.uri] = []), i[r.uri].push(t[n].subject), a.addUse();
		}
		return [i, e];
	}
	function me(e, t) {
		let r = o.statementsMatching(e, void 0, void 0, n), i = {};
		for (let e = 0; e < r.length; ++e) {
			let n = r[e].predicate;
			if (n.uri in c) continue;
			let a = A(t, n);
			a.checkValue(r[e].object), i[n.uri] = a;
		}
		return i;
	}
	function he(e, t) {
		let n = {};
		for (let e = 0; e < t.length; ++e) {
			let r = me(t[e], n);
			for (let e in r) r[e].addUse();
		}
		let r = oe(n);
		_e(r), e.allColumns = r;
	}
	function ge() {
		let e, t, n = pe();
		e = n[0], t = n[1];
		for (let n in e) {
			let r = e[n], i = t[n];
			he(i, r);
		}
		return [new k(null), oe(t)];
	}
	function _e(e) {
		function t(e, t) {
			return (e.useCount < t.useCount) - (e.useCount > t.useCount);
		}
		e.sort(t);
	}
	function N(t, n) {
		let r = e.createElement("a");
		return r.appendChild(e.createTextNode("[x]")), r.addEventListener("click", function() {
			t.removeColumn(n), te(t);
		}, !1), r;
	}
	function ve(t, n) {
		let r = e.createElement("tr"), i = e.createElement("th");
		r.appendChild(i);
		for (let i = 0; i < t.length; ++i) {
			let a = e.createElement("th"), o = t[i];
			a.appendChild(e.createTextNode(o.getLabel())), n && a.appendChild(N(n, o)), r.appendChild(a);
		}
		return r;
	}
	function ye(e, t, n, r) {
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
	function be(e, t) {
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
	function xe(e, t) {
		for (let n = 0; n < e.length; ++n) {
			let r = e[n];
			be(r, t);
		}
	}
	function Se(e, t, n) {
		function r(e) {
			return e ? e.termType === "Literal" ? e.value.toLowerCase() : e.termType === "NamedNode" ? j(e).toLowerCase() : e.value.toLowerCase() : "";
		}
		function i(e, t) {
			let n = r(e), i = r(t);
			return n < i ? -1 : +(n > i);
		}
		ye(e, t, i, n);
	}
	function Ce(t, n, r) {
		let i = e.createElement("div"), a = e.createElement("input");
		a.setAttribute("type", "text"), a.style.width = "70%", i.appendChild(a);
		let o = e.createElement("span");
		o.appendChild(e.createTextNode("▼")), o.addEventListener("click", function() {
			Se(t, r, !1);
		}, !1), i.appendChild(o);
		let s = e.createElement("span");
		s.appendChild(e.createTextNode("▲")), s.addEventListener("click", function() {
			Se(t, r, !0);
		}, !1), i.appendChild(s);
		let c = null;
		return r.filterFunction = function(e) {
			if (!c) return !0;
			if (e) {
				let t;
				return t = e.termType === "Literal" ? e.value : e.termType === "NamedNode" ? j(e) : "", t.toLowerCase().indexOf(c) >= 0;
			}
			return !1;
		}, a.addEventListener("keyup", function() {
			c = a.value === "" ? null : a.value.toLowerCase(), xe(t, n);
		}, !1), i;
	}
	function we(t, n, r, i) {
		let a = e.createElement("div"), o = e.createElement("select"), s = {};
		for (let e = 0; e < i.length; ++e) {
			let t = i[e];
			s[t.uri] = !0;
		}
		let c = Me(r).initialSelection;
		c && (s = c), o.setAttribute("multiple", "true");
		for (let e = 0; e < i.length; ++e) {
			let t = i[e], n = se(j(t), e);
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
			xe(t, n);
		}, !0), a;
	}
	function Te(t, n, r) {
		let i = e.createElement("div"), a = e.createElement("input");
		a.setAttribute("type", "text"), a.style.width = "40px", i.appendChild(a);
		let o = e.createElement("input");
		o.setAttribute("type", "text"), o.style.width = "40px", i.appendChild(o);
		let s = null, c = null;
		r.filterFunction = function(e) {
			return e &&= Number(e), !(s && (!e || e < s) || c && (!e || e > c));
		};
		function l() {
			s = a.value === "" ? null : Number(a.value), c = o.value === "" ? null : Number(o.value), xe(t, n);
		}
		return a.addEventListener("keyup", l, !1), o.addEventListener("keyup", l, !1), i;
	}
	function Ee(e, t, n) {
		return n.checkedAnyValues && n.possiblyNumber ? Te(e, t, n) : n.possiblyLiteral ? Ce(e, t, n) : null;
	}
	function De(e, t, n) {
		if (n.superClass && n.alternatives.length > 0) return we(e, t, n, n.alternatives);
		let r = n.getConstraints(), i;
		for (let a = 0; a < r.length; a++) {
			if (i = r[a], n.checkedAnyValues && n.possiblyNumber || i.uri in l) return Te(e, t, n);
			if (i.uri === "http://www.w3.org/2000/01/rdf-schema#Literal") return Ce(e, t, n);
			let s = o.each(i, No.ns.owl("oneOf"));
			if (s.length > 0) return we(e, t, n, s.elements);
		}
		return Ee(e, t, n);
	}
	function Oe(t, n) {
		let r = e.createElement("tr");
		r.className = "selectors", r.appendChild(e.createElement("td"));
		for (let i = 0; i < n.length; ++i) {
			let a = e.createElement("td"), o = De(t, n, n[i]);
			o && a.appendChild(o), r.appendChild(a);
		}
		return r;
	}
	function ke(t, n, r) {
		r ||= {};
		let i = e.createElement("a"), a = r.linkFunction;
		return i.setAttribute("href", t), i.appendChild(e.createTextNode(n)), a ? i.addEventListener("click", function(e) {
			e.preventDefault(), e.stopPropagation();
			let t = ae(e).getAttribute("href");
			t || M("No href found \n"), a(t);
		}, !0) : i.addEventListener("click", No.widgets.openHrefInOutlineMode, !0), i;
	}
	function Ae(e, t) {
		let n = !1;
		return e.uri && (n = e.uri.match(/^mailto:(.*)/)), n ? ke(e.uri, n[1], t) : ke(e.uri, j(e), t);
	}
	function je(t) {
		let n = e.createElement("img");
		return n.setAttribute("src", t.uri), n.style.height = "40px", n;
	}
	function Me(e) {
		return t && t.hints && e.variable && t.hints[e.variable.toNT()] ? t.hints[e.variable.toNT()] : {};
	}
	function Ne(t, n) {
		let r = Me(n), i = r.cellFormat;
		if (i) switch (i) {
			case "shortDate": return e.createTextNode(No.widgets.shortDate(t.value));
		}
		else if (t.termType === "Literal") {
			if (t.datatype) {
				if (u[t.datatype.uri]) return e.createTextNode(No.widgets.shortDate(t.value));
				if (l[t.datatype.uri]) {
					let n = e.createElement("span");
					return n.textContent = t.value, n.setAttribute("style", "text-align: right"), n;
				}
			}
			return e.createTextNode(t.value);
		} else if (t.termType === "NamedNode" && n.isImageColumn()) return je(t);
		else if (t.termType === "NamedNode" || t.termType === "BlankNode") return Ae(t, r);
		else if (t.termType === "Collection") {
			let r = e.createElement("span");
			return r.appendChild(e.createTextNode("[")), t.elements.forEach(function(t) {
				r.appendChild(Ne(t, n)), r.appendChild(e.createTextNode(", "));
			}), r.removeChild(r.lastChild), r.appendChild(e.createTextNode("]")), r;
		} else return e.createTextNode("unknown termtype '" + t.termType + "'!");
	}
	function Pe(t, n, r, i) {
		let a = e.createElement("td");
		n._subject && "uri" in n._subject && a.appendChild(ke(n._subject.uri, "→")), t.appendChild(a);
		for (let i = 0; i < r.length; ++i) {
			let a = r[i], o = e.createElement("td"), s, c = a.getKey();
			if (c in n.values) {
				let t = n.values[c], r = !1;
				n.originalValues && n.originalValues[c] && t.length !== n.originalValues[c].length && (r = !0);
				for (let i = 0; i < t.length; ++i) {
					let l = t[i];
					n.originalValues && n.originalValues[c] && n.originalValues[c].length > i && (s = n.originalValues[c][i], l.toString() !== s.toString() && (r = !0)), o.appendChild(Ne(l, a)), i !== t.length - 1 && o.appendChild(e.createTextNode(",\n")), r && (o.style.background = "#efe");
				}
			}
			t.appendChild(o);
		}
		return n._htmlRow = t, t;
	}
	function Fe(e, t) {
		let n = null;
		if (e.termType === "Literal") n = "value";
		else if (e.termType === "NamedNode") n = "uri";
		else return t.indexOf(e) >= 0;
		let r = 0;
		for (; r < t.length; ++r) if (t[r].termType === e.termType && t[r][n] === e[n]) return !0;
		return !1;
	}
	function Ie(e, t, n) {
		let r, i = !1;
		for (r in n) {
			let t = n[r];
			r in e.values || (e.values[r] = []), Fe(t, e.values[r]) || (e.values[r].push(t), i = !0);
		}
		i && (re(e._htmlRow), Pe(e._htmlRow, e, t)), be(e, t);
	}
	function Le(e) {
		if ("uri" in e) return e.uri;
		if ("_subject_id" in e) return e._subject_id;
		{
			let t = "" + p;
			return e._subject_id = t, ++p, t;
		}
	}
	function P(n, r, i, a) {
		n.running = !0;
		let c = Date.now(), l = e.createElement("tr");
		a.appendChild(l), l.textContent = "Loading ...";
		for (let e = 0; e < r.length; e++) r[e].original = !0, r[e].originalValues || (r[e].originalValues = r[e].values), r[e].values = {};
		o.query(n, function(t) {
			if (!n.running) return;
			l.textContent += ".";
			let o = null, c = null, u;
			if (f in t && (c = t[f], u = Le(c), u in s && (o = s[u])), !o) {
				let t = e.createElement("tr");
				a.appendChild(t), o = {
					_htmlRow: t,
					_subject: c,
					values: {}
				}, r.push(o), c && (s[u] = o);
			}
			delete o.original, Ie(o, i, t);
		}, void 0, function() {
			l && l.parentNode && l.parentNode.removeChild && (l.parentNode.removeChild(l), l = null);
			let e = Date.now() - c;
			M("Query done: " + r.length + " rows, " + e + "ms");
			for (let e = r.length - 1; e >= 0; e--) if (r[e].original) {
				M("   deleting row " + r[e]._subject);
				let t = r[e]._htmlRow;
				t.parentNode.removeChild(t), delete s[Le(r[e]._subject)], r.splice(e, 1);
			}
			t.sortBy && Se(r, de(i, t.sortBy), t.sortReverse), t.onDone && t.onDone(x);
		});
	}
	function Re(e, t) {
		No.log.debug(">> processing formula");
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
		for (let n = 0; n < t.optional.length; ++n) No.log.debug("recurse to optional subformula " + n), Re(e, t.optional[n]);
		No.log.debug("<< finished processing formula");
	}
	function ze(e) {
		let t = [], n = {};
		for (let r = 0; r < e.vars.length; ++r) {
			let i = new ie(), a = e.vars[r];
			No.log.debug("column " + r + " : " + a), i.setVariable(a), n[a] = i, t.push(i);
		}
		return Re(n, e.pat), t;
	}
	function Be(t, n) {
		let r;
		r = i ? ze(t) : n.getColumns();
		let a = [], o = e.createElement("table");
		return o.appendChild(ve(r, n)), o.appendChild(Oe(a, r)), o.logicalRows = a, o.columns = r, o.query = t, P(t, a, r, o), o;
	}
	function Ve(e) {
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
var Fo = /* @__PURE__ */ i({
	TabWidgetElement: () => Io,
	tabWidget: () => Ro
}), Io = class extends HTMLElement {
	bodyContainer;
	refresh;
	tabContainer;
}, Lo = "#ddddcc";
function Ro(e) {
	let t = e.subject, n = e.dom || document, r = parseInt(e.orientation || "0"), i = e.backgroundColor || Lo, a = r & 2, o = r & 1, s = e.onClose, [c, l] = zo(i), u = `display: grid; width: auto; height: 100%; border: 0.1em; border-style: solid; border-color: ${c}; padding: 1em;`, d = n.createElement("div");
	d.setAttribute("style", A.tabsRootElement), d.style.flexDirection = (o ? "row" : "column") + (a ? "-reverse" : "");
	let f = d.appendChild(n.createElement("nav"));
	f.setAttribute("style", A.tabsNavElement);
	let p = d.appendChild(n.createElement("div"));
	p.setAttribute("style", A.tabsMainElement);
	let m = f.appendChild(n.createElement("ul"));
	m.setAttribute("style", A.tabContainer), m.style.flexDirection = `${o ? "column" : "row"}`;
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
	if (d.refresh = te, te(), !e.startEmpty && m.children.length && e.selectedTab) {
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
		let r = ve(n, s);
		r.setAttribute("style", r.getAttribute("style") + x), t.appendChild(r), e.appendChild(t), e.dataset.onCloseSet = "true";
	}
	function ee() {
		return e.items ? e.items : e.ordered === !1 ? D.each(t, e.predicate) : D.the(t, e.predicate).elements;
	}
	function O(t) {
		let r = n.createElement("li");
		r.setAttribute("style", C), r.subject = t;
		let i = r.appendChild(n.createElement("button"));
		if (i.setAttribute("style", A.makeNewSlot), i.onclick = function() {
			if (ne(), re(), r.setAttribute("style", w), !r.bodyTR) return;
			r.bodyTR.setAttribute("style", T);
			let n = a(r);
			e.renderMain && r.subject && n.asSettings !== !1 && (n.innerHTML = "loading item ..." + t, e.renderMain(n, r.subject), n.asSettings = !1);
		}, e.renderTabSettings && r.subject) {
			let i = n.createElement("button");
			i.textContent = "...", i.setAttribute("style", A.ellipsis), i.onclick = function() {
				if (ne(), re(), r.setAttribute("style", w), !r.bodyTR) return;
				r.bodyTR.setAttribute("style", T);
				let n = a(r);
				e.renderTabSettings && r.subject && n.asSettings !== !0 && (n.innerHTML = "loading settings ..." + t, e.renderTabSettings(n, r.subject), n.asSettings = !0);
			}, r.appendChild(i);
		}
		return e.renderTab ? e.renderTab(i, t) : i.innerHTML = j(t), r;
		function a(e) {
			let t = e.bodyTR?.children[0];
			if (t) return t;
			let r = e.bodyTR.appendChild(n.createElement("div"));
			return r.setAttribute("style", u), r;
		}
	}
	function te() {
		let e = ee(), t, r, i, a, o, c = !1;
		for (a = 0; a < m.children.length; a++) if (t = m.children[a], a >= e.length || t.subject && !t.subject.sameTerm(e[a])) {
			c = !0;
			break;
		}
		if (!c && e.length === m.children.length) return;
		for (o = m.children.length - 1; o >= 0 && (t = m.children[o], i = o - m.children.length + e.length, !t.subject || t.subject.sameTerm(e[i])); o--);
		let l = e.slice(a, o - m.children.length + e.length + 1);
		for (; o >= a;) m.removeChild(m.children[a]), h.removeChild(h.children[a]), --o;
		for (r = 0; r < l.length; r++) {
			let e = O(l[r]), t = n.createElement("div");
			e.bodyTR = t, a === m.children.length ? (m.appendChild(e), h.appendChild(t)) : (m.insertBefore(e, m.children[a + r]), h.insertBefore(t, h.children[a + r]));
		}
		s && E(m);
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
function zo(e) {
	return Vo(e) ? [Bo(e, "#ffffff", .3), "#000000"] : [Bo(e, "#000000", .3), "#ffffff"];
}
function Bo(e, t, n) {
	let r, i, a, o = "#", s = "0123456789abcdef";
	for (let c = 0; c < 3; c++) {
		r = parseInt(e.slice(c * 2 + 1, c * 2 + 3), 16), i = parseInt(t.slice(c * 2 + 1, c * 2 + 3), 16), a = r * (1 - n) + i * n;
		let l = parseInt(("" + a).split(".")[0]), u = parseInt(("" + l / 16).split(".")[0]), d = parseInt(("" + l % 16).split(".")[0]);
		o += s[u] + s[d];
	}
	return o;
}
function Vo(e) {
	let t = 0;
	for (let n = 0; n < 3; n++) t += parseInt(e.slice(n * 2 + 1, n * 2 + 3), 16);
	return t > 384;
}
//#endregion
//#region src/header/empty-profile.ts
var Ho = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"26\" height=\"26\" viewBox=\"0 0 26 26\" fill=\"none\">\n    <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z\" fill=\"#D8D8D8\" stroke=\"#8B8B8B\"/>\n    <mask id=\"mask0\" mask-type=\"alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"26\" height=\"26\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M13 25C19.6274 25 25 19.6274 25 13C25 6.37258 19.6274 1 13 1C6.37258 1 1 6.37258 1 13C1 19.6274 6.37258 25 13 25Z\" fill=\"white\" stroke=\"white\"/>\n    </mask>\n    <g mask=\"url(#mask0)\">\n        <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.0468 10.4586C17.0468 14.4979 15.4281 16.9214 12.9999 16.9214C10.5718 16.9214 8.95298 14.4979 8.95298 10.4586C8.95298 6.41931 12.9999 6.41931 12.9999 6.41931C12.9999 6.41931 17.0468 6.41931 17.0468 10.4586ZM4.09668 23.3842C6.52483 17.7293 12.9999 17.7293 12.9999 17.7293C12.9999 17.7293 19.475 17.7293 21.9031 23.3842C21.9031 23.3842 17.8481 25 12.9999 25C8.15169 25 4.09668 23.3842 4.09668 23.3842Z\" fill=\"#8B8B8B\"/>\n    </g>\n</svg>";
//#endregion
//#region src/utils/headerFooterHelpers.ts
function Uo() {
	let { origin: e, pathname: t } = document.location, n = document.body?.dataset?.appShell === "databrowser", r = t.split("/").filter(Boolean), i = r[r.length - 1] || "", a = /\.[^/]+$/.test(i);
	return n && r.length > 0 && !a ? c(`${e}/${r[0]}/`) : c(e).site();
}
async function Wo(e, t) {
	try {
		if (!t.any(e, null, _.ldp("Container"), e)) {
			let n = (await t.fetcher.webOperation("GET", e.uri, t.fetcher.initFetchOptions(e.uri, { headers: { accept: "text/turtle" } }))).responseText;
			o(n, t, e.uri, "text/turtle");
		}
	} catch (t) {
		return console.error("Error loading pod " + e + ": " + t), null;
	}
	if (!t.holds(e, _.rdf("type"), _.space("Storage"), e)) return console.warn("Pod  " + e + " does not declare itself as a space:Storage"), null;
	let n = t.any(e, _.solid("owner"), null, e) || t.any(null, _.space("storage"), e, e);
	if (n) {
		try {
			await t.fetcher.load(n.doc());
		} catch {
			return console.warn("Unable to load profile of pod owner " + n), null;
		}
		return t.holds(n, _.space("storage"), e, n.doc()) || console.warn(`Pod owner ${n} does NOT list pod ${e} as their storage`), n;
	}
	{
		let n = c(`${e.uri}profile/card#me`);
		try {
			await t.fetcher.load(n);
		} catch {
			return console.error("Ooops. Guessed wrong pod owner webid {$guess} : can't load it."), null;
		}
		return t.holds(n, _.space("storage"), e, n.doc()) ? (console.warn("Using guessed pod owner webid but it links back."), n) : null;
	}
}
function Go(e, t) {
	return e.anyValue(t, _.vcard("fn"), null, t.doc()) || e.anyValue(t, _.foaf("name"), null, t.doc()) || t.uri;
}
function Ko(e, t, n = {}) {
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
var qo = N.iconBase + "noun_help.svg", Jo = "https://solidproject.org/assets/img/solid-emblem.svg";
async function Yo(e, t, n) {
	let r = document.getElementById("PageHeader");
	if (!r) return;
	let i = Uo();
	Xo(r, e, i, t, n)(), S.events.on("logout", Xo(r, e, i, t, n)), S.events.on("login", Xo(r, e, i, t, n));
}
function Xo(e, t, n, r, i) {
	return async () => {
		let a = T.currentUser();
		e.innerHTML = "", e.appendChild(await Zo(t, n, a, r, i));
	};
}
async function Zo(e, t, n, r, i) {
	let a = document.createElement("a");
	a.href = t.uri, a.setAttribute("style", A.headerBannerLink);
	let o = document.createElement("img");
	i && (o.src = i.logo ? i.logo : Jo), o.setAttribute("style", A.headerBannerIcon), a.appendChild(o);
	let s = n ? await ns(e, n, r) : $o(), c = document.createElement("div");
	c.setAttribute("style", A.headerBanner), c.appendChild(a);
	let l = document.createElement("div");
	if (l.setAttribute("style", A.headerBannerRightMenu), l.appendChild(s), i && i.helpMenuList) {
		let e = Qo(i, i.helpMenuList);
		l.appendChild(e);
	}
	return c.appendChild(l), c;
}
function Qo(e, t) {
	if (!t) return;
	let n = document.createElement("ul");
	n.setAttribute("style", A.headerUserMenuList), t.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? n.appendChild(rs(ts(e.label, e.url, e.target))) : n.appendChild(rs(es(e.label, e.onclick)));
	});
	let r = document.createElement("nav");
	r.setAttribute("style", A.headerUserMenuNavigationMenuNotDisplayed), r.setAttribute("aria-hidden", "true"), r.setAttribute("id", "helperNav"), r.appendChild(n);
	let i = document.createElement("div");
	i.setAttribute("style", A.headerBannerUserMenu), i.appendChild(r);
	let a = document.createElement("button");
	a.setAttribute("style", A.headerUserMenuTrigger), a.type = "button";
	let o = document.createElement("img");
	o.src = e && e.helpIcon ? e.helpIcon : N.iconBase + qo, o.setAttribute("style", A.headerUserMenuTriggerImg), i.appendChild(a), a.appendChild(o);
	let s = Ko((e) => as(e, a, r), 50);
	a.addEventListener("click", s);
	let c = setTimeout(() => null, 0);
	return i.addEventListener("mouseover", (e) => {
		clearTimeout(c), s(e), document.getElementById("helperNav")?.setAttribute("style", A.headerUserMenuNavigationMenu);
	}), i.addEventListener("mouseout", (e) => {
		c = setTimeout(() => s(e), 200), document.getElementById("helperNav")?.setAttribute("style", A.headerUserMenuNavigationMenuNotDisplayed);
	}), i;
}
function $o() {
	let e = document.createElement("div");
	return e.setAttribute("style", A.headerBannerLogin), e.appendChild(wt(document, null, {})), e;
}
function es(e, t) {
	let n = document.createElement("button");
	return n.setAttribute("style", A.headerUserMenuButton), n.onmouseover = function() {
		n.setAttribute("style", A.headerUserMenuButtonHover);
	}, n.onmouseout = function() {
		n.setAttribute("style", A.headerUserMenuButton);
	}, n.addEventListener("click", t), n.innerText = e, n;
}
function ts(e, t, n) {
	let r = document.createElement("a");
	return r.setAttribute("style", A.headerUserMenuLink), r.onmouseover = function() {
		r.setAttribute("style", A.headerUserMenuLinkHover);
	}, r.onmouseout = function() {
		r.setAttribute("style", A.headerUserMenuLink);
	}, r.href = t, r.innerText = e, n && (r.target = n), r;
}
async function ns(e, t, n) {
	let r = e.fetcher;
	r && await r.load(t);
	let i = document.createElement("ul");
	i.setAttribute("style", A.headerUserMenuList), n && n.forEach(function(e) {
		(e.url ? "url" : "onclick") == "url" ? i.appendChild(rs(ts(e.label, e.url, e.target))) : i.appendChild(rs(es(e.label, e.onclick)));
	});
	let a = document.createElement("nav");
	a.setAttribute("style", A.headerUserMenuNavigationMenuNotDisplayed), a.setAttribute("aria-hidden", "true"), a.setAttribute("id", "loggedInNav"), a.appendChild(i);
	let o = document.createElement("button");
	o.setAttribute("style", A.headerUserMenuTrigger), o.type = "button";
	let s = is(e, t);
	typeof s == "string" ? o.innerHTML = s : o.appendChild(s);
	let c = document.createElement("div");
	c.setAttribute("style", A.headerBannerUserMenuNotDisplayed), c.appendChild(o), c.appendChild(a);
	let l = Ko((e) => as(e, o, a), 50);
	o.addEventListener("click", l);
	let u = setTimeout(() => null, 0);
	return c.addEventListener("mouseover", (e) => {
		clearTimeout(u), l(e), document.getElementById("loggedInNav")?.setAttribute("style", A.headerUserMenuNavigationMenu);
	}), c.addEventListener("mouseout", (e) => {
		u = setTimeout(() => l(e), 200), document.getElementById("loggedInNav")?.setAttribute("style", A.headerUserMenuNavigationMenuNotDisplayed);
	}), c;
}
function rs(e) {
	let t = document.createElement("li");
	return t.setAttribute("style", A.headerUserMenuListItem), t.appendChild(e), t;
}
function is(e, t) {
	let n = null;
	try {
		if (n = Oe(t), !n) return Ho;
	} catch {
		return Ho;
	}
	let r = document.createElement("div");
	return r.setAttribute("style", A.headerUserMenuPhoto), r.style.backgroundImage = `url(${n})`, r;
}
function as(e, t, n) {
	let r = t.getAttribute("aria-expanded") === "true", i = e.type === "mouseover", a = e.type === "mouseout";
	r && i || !r && a || (t.setAttribute("aria-expanded", (!r).toString()), n.setAttribute("aria-hidden", r.toString()));
}
//#endregion
//#region src/footer/index.ts
var os = "https://solidproject.org", ss = "solidproject.org";
async function cs(e, t) {
	let n = document.getElementById("PageFooter");
	if (!n) return;
	let r = Uo(), i = await Wo(r, e);
	return ls(n, e, r, i, t), S.events.on("login", () => ls(n, e, r, i, t)), S.events.on("logout", () => ls(n, e, r, i, t)), n;
}
async function ls(e, t, n, r, i) {
	let a = T.currentUser();
	return e.innerHTML = "", e.appendChild(await us(t, a, n, r, i)), e;
}
function us(e, t, n, r, i) {
	let a = document.createElement("div");
	a.setAttribute("style", A.footer);
	let o = document.createElement("a");
	if (o.href = i && i.solidProjectUrl ? i.solidProjectUrl : os, o.innerText = i && i.solidProjectName ? i.solidProjectName : ss, !n || !r || t && t.equals(r)) {
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
	u.href = r.uri, u.innerText = Go(e, r);
	let d = document.createElement("span");
	d.innerText = ". For more info, check out ";
	let f = document.createElement("span");
	return f.innerText = ".", a.appendChild(s), a.appendChild(c), a.appendChild(l), a.appendChild(u), a.appendChild(d), a.appendChild(o), a.appendChild(f), a;
}
//#endregion
//#region src/create/types.ts
var ds = /* @__PURE__ */ i({}), fs = Le(Symbol("file-explorer")), ps = [], ms = [];
(() => {
	let e = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,1n,9,16,o,,x,1i,3,,i,,7,a,2,t,3,1k,,,7,2,2,2,3,9,,a,2,q,,2,3,1k,,,5,4,2,2,3,3,,u,2,3,,b,3,1k,,,8,,3,,3,k,2,m,6,,3,1k,,,7,2,2,2,3,7,3,a,2,u,,1n,5,3,3,,4,9,,14,5,1j,,,7,,3,,4,7,2,b,2,t,3,1k,,,7,,3,,4,7,2,b,2,f,,c,4,1j,2,,7,,3,,4,9,,a,2,t,3,1y,,4,6,,,,8,i,2,1p,,,8,c,8,2q,,,a,b,7,21,2,r,,,,,,4,2,1d,k,,2,5,b,,10,9,,2u,b,,6,n,4,4,3,g,4,d,,,3,6,,f,,jj,3,qa,4,s,3,t,2,u,2,1s,w,9,,19,3,,,39,2,y,,3a,c,4,c,63,5,1l,a,,,,,2,o,2,,1c,1a,2,c,k,5,1b,h,12,9,c,3,u,d,1k,e,1c,k,48,3,,l,4,,6,,2,3,5i,1s,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,n,5,4,,2b,2,1e,i,q,i,d,,12,8,p,d,18,4,1b,e,10,,1v,e,c,,8,2,1a,,1f,,,3,2,2,5,2,,,15,5,5,2,6k,8,,2,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,1t,5,8t,2,25,6,1y,b,1d,4,3e,3,1h,f,15,,2,2,a,4,19,b,7,,1p,3,10,e,g,2,18,,c,3,1c,e,8,4,,2,2k,c,6,,2,,4d,c,l,4,1j,2,,7,2,2,2,3,9,,a,2,2,7,3,5,1v,9,,,2,,,4,,5,,,e,2,2a,i,n,,29,k,6j,7,2,9,r,2,2a,h,2y,d,2t,3,2,a,74,f,6t,6,,2,2,4,,,,2,3x,7,2,7,3,,s,a,14,7,,4,8,,9,b,1a,g,5i,8,5j,8,,8,2a,m,,e,3e,6,3,,,2,,7,,,1u,5,,2,,5,9n,4,9,2,,,1c,7,3,5,n,,44l,,6,f,8ug,i,1xc,5,1n,7,t4,,,1j,7,4,29,,b,2,f57,2,3mp,1a,2,n,f2,5,3,6,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,2s,,4g,7,af,,1p,4,e4,4,72,2,6r,,2,,7,2,5,,d6,7,31,7,240,5".split(",").map((e) => e ? parseInt(e, 36) : 1);
	for (let t = 0, n = 0; t < e.length; t++) (t % 2 ? ms : ps).push(n += e[t]);
})();
function hs(e) {
	if (e < 768) return !1;
	for (let t = 0, n = ps.length;;) {
		let r = t + n >> 1;
		if (e < ps[r]) n = r;
		else if (e >= ms[r]) t = r + 1;
		else return !0;
		if (t == n) return !1;
	}
}
function gs(e) {
	return e >= 127462 && e <= 127487;
}
var _s = 8205;
function vs(e, t, n = !0, r = !0) {
	return (n ? ys : bs)(e, t, r);
}
function ys(e, t, n) {
	if (t == e.length) return t;
	t && Ss(e.charCodeAt(t)) && Cs(e.charCodeAt(t - 1)) && t--;
	let r = xs(e, t);
	for (t += ws(r); t < e.length;) {
		let i = xs(e, t);
		if (r == _s || i == _s || n && hs(i)) t += ws(i), r = i;
		else if (gs(i)) {
			let n = 0, r = t - 2;
			for (; r >= 0 && gs(xs(e, r));) n++, r -= 2;
			if (n % 2 == 0) break;
			t += 2;
		} else break;
	}
	return t;
}
function bs(e, t, n) {
	for (; t > 1;) {
		let r = ys(e, t - 2, n);
		if (r < t) return r;
		t--;
	}
	return 0;
}
function xs(e, t) {
	let n = e.charCodeAt(t);
	if (!Cs(n) || t + 1 == e.length) return n;
	let r = e.charCodeAt(t + 1);
	return Ss(r) ? (n - 55296 << 10) + (r - 56320) + 65536 : n;
}
function Ss(e) {
	return e >= 56320 && e < 57344;
}
function Cs(e) {
	return e >= 55296 && e < 56320;
}
function ws(e) {
	return e < 65536 ? 1 : 2;
}
//#endregion
//#region node_modules/@codemirror/state/dist/index.js
var L = class e {
	lineAt(e) {
		if (e < 0 || e > this.length) throw RangeError(`Invalid position ${e} in document of length ${this.length}`);
		return this.lineInner(e, !1, 1, 0);
	}
	line(e) {
		if (e < 1 || e > this.lines) throw RangeError(`Invalid line number ${e} in ${this.lines}-line document`);
		return this.lineInner(e, !0, 1, 0);
	}
	replace(e, t, n) {
		[e, t] = Ps(this, e, t);
		let r = [];
		return this.decompose(0, e, r, 2), n.length && n.decompose(0, n.length, r, 3), this.decompose(t, this.length, r, 1), Es.from(r, this.length - (t - e) + n.length);
	}
	append(e) {
		return this.replace(this.length, this.length, e);
	}
	slice(e, t = this.length) {
		[e, t] = Ps(this, e, t);
		let n = [];
		return this.decompose(e, t, n, 0), Es.from(n, t - e);
	}
	eq(e) {
		if (e == this) return !0;
		if (e.length != this.length || e.lines != this.lines) return !1;
		let t = this.scanIdentical(e, 1), n = this.length - this.scanIdentical(e, -1), r = new As(this), i = new As(e);
		for (let e = t, a = t;;) {
			if (r.next(e), i.next(e), e = 0, r.lineBreak != i.lineBreak || r.done != i.done || r.value != i.value) return !1;
			if (a += r.value.length, r.done || a >= n) return !0;
		}
	}
	iter(e = 1) {
		return new As(this, e);
	}
	iterRange(e, t = this.length) {
		return new js(this, e, t);
	}
	iterLines(e, t) {
		let n;
		if (e == null) n = this.iter();
		else {
			t ??= this.lines + 1;
			let r = this.line(e).from;
			n = this.iterRange(r, Math.max(r, t == this.lines + 1 ? this.length : t <= 1 ? 0 : this.line(t - 1).to));
		}
		return new Ms(n);
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
		return t.length == 1 && !t[0] ? e.empty : t.length <= 32 ? new Ts(t) : Es.from(Ts.split(t, []));
	}
}, Ts = class e extends L {
	constructor(e, t = Ds(e)) {
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
			if ((t ? n : o) >= e) return new Ns(r, o, n, a);
			r = o + 1, n++;
		}
	}
	decompose(t, n, r, i) {
		let a = t <= 0 && n >= this.length ? this : new e(ks(this.text, t, n), Math.min(n, this.length) - Math.max(0, t));
		if (i & 1) {
			let t = r.pop(), n = Os(a.text, t.text.slice(), 0, a.length);
			if (n.length <= 32) r.push(new e(n, t.length + a.length));
			else {
				let t = n.length >> 1;
				r.push(new e(n.slice(0, t)), new e(n.slice(t)));
			}
		} else r.push(a);
	}
	replace(t, n, r) {
		if (!(r instanceof e)) return super.replace(t, n, r);
		[t, n] = Ps(this, t, n);
		let i = Os(this.text, Os(r.text, ks(this.text, 0, t)), n), a = this.length + r.length - (n - t);
		return i.length <= 32 ? new e(i, a) : Es.from(e.split(i, []), a);
	}
	sliceString(e, t = this.length, n = "\n") {
		[e, t] = Ps(this, e, t);
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
}, Es = class e extends L {
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
		if ([t, n] = Ps(this, t, n), r.lines < this.lines) for (let i = 0, a = 0; i < this.children.length; i++) {
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
		[e, t] = Ps(this, e, t);
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
			return new Ts(e, n);
		}
		let i = Math.max(32, r >> 5), a = i << 1, o = i >> 1, s = [], c = 0, l = -1, u = [];
		function d(t) {
			let n;
			if (t.lines > a && t instanceof e) for (let e of t.children) d(e);
			else t.lines > o && (c > o || !c) ? (f(), s.push(t)) : t instanceof Ts && c && (n = u[u.length - 1]) instanceof Ts && t.lines + n.lines <= 32 ? (c += t.lines, l += t.length + 1, u[u.length - 1] = new Ts(n.text.concat(t.text), n.length + 1 + t.length)) : (c + t.lines > i && f(), c += t.lines, l += t.length + 1, u.push(t));
		}
		function f() {
			c != 0 && (s.push(u.length == 1 ? u[0] : e.from(u, l)), l = -1, c = u.length = 0);
		}
		for (let e of t) d(e);
		return f(), s.length == 1 ? s[0] : new e(s, n);
	}
};
L.empty = /*@__PURE__*/ new Ts([""], 0);
function Ds(e) {
	let t = -1;
	for (let n of e) t += n.length + 1;
	return t;
}
function Os(e, t, n = 0, r = 1e9) {
	for (let i = 0, a = 0, o = !0; a < e.length && i <= r; a++) {
		let s = e[a], c = i + s.length;
		c >= n && (c > r && (s = s.slice(0, r - i)), i < n && (s = s.slice(n - i)), o ? (t[t.length - 1] += s, o = !1) : t.push(s)), i = c + 1;
	}
	return t;
}
function ks(e, t, n) {
	return Os(e, [""], t, n);
}
var As = class {
	constructor(e, t = 1) {
		this.dir = t, this.done = !1, this.lineBreak = !1, this.value = "", this.nodes = [e], this.offsets = [t > 0 ? 1 : (e instanceof Ts ? e.text.length : e.children.length) << 1];
	}
	nextInner(e, t) {
		for (this.done = this.lineBreak = !1;;) {
			let n = this.nodes.length - 1, r = this.nodes[n], i = this.offsets[n], a = i >> 1, o = r instanceof Ts ? r.text.length : r.children.length;
			if (a == (t > 0 ? o : 0)) {
				if (n == 0) return this.done = !0, this.value = "", this;
				t > 0 && this.offsets[n - 1]++, this.nodes.pop(), this.offsets.pop();
			} else if ((i & 1) == (t > 0 ? 0 : 1)) {
				if (this.offsets[n] += t, e == 0) return this.lineBreak = !0, this.value = "\n", this;
				e--;
			} else if (r instanceof Ts) {
				let i = r.text[a + (t < 0 ? -1 : 0)];
				if (this.offsets[n] += t, i.length > Math.max(0, e)) return this.value = e == 0 ? i : t > 0 ? i.slice(e) : i.slice(0, i.length - e), this;
				e -= i.length;
			} else {
				let i = r.children[a + (t < 0 ? -1 : 0)];
				e > i.length ? (e -= i.length, this.offsets[n] += t) : (t < 0 && this.offsets[n]--, this.nodes.push(i), this.offsets.push(t > 0 ? 1 : (i instanceof Ts ? i.text.length : i.children.length) << 1));
			}
		}
	}
	next(e = 0) {
		return e < 0 && (this.nextInner(-e, -this.dir), e = this.value.length), this.nextInner(e, this.dir);
	}
}, js = class {
	constructor(e, t, n) {
		this.value = "", this.done = !1, this.cursor = new As(e, t > n ? -1 : 1), this.pos = t > n ? e.length : 0, this.from = Math.min(t, n), this.to = Math.max(t, n);
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
}, Ms = class {
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
typeof Symbol < "u" && (L.prototype[Symbol.iterator] = function() {
	return this.iter();
}, As.prototype[Symbol.iterator] = js.prototype[Symbol.iterator] = Ms.prototype[Symbol.iterator] = function() {
	return this;
});
var Ns = class {
	constructor(e, t, n, r) {
		this.from = e, this.to = t, this.number = n, this.text = r;
	}
	get length() {
		return this.to - this.from;
	}
};
function Ps(e, t, n) {
	return t = Math.max(0, Math.min(e.length, t)), [t, Math.max(t, Math.min(e.length, n))];
}
function Fs(e, t, n = !0, r = !0) {
	return vs(e, t, n, r);
}
function Is(e) {
	return e >= 56320 && e < 57344;
}
function Ls(e) {
	return e >= 55296 && e < 56320;
}
function Rs(e, t) {
	let n = e.charCodeAt(t);
	if (!Ls(n) || t + 1 == e.length) return n;
	let r = e.charCodeAt(t + 1);
	return Is(r) ? (n - 55296 << 10) + (r - 56320) + 65536 : n;
}
function zs(e) {
	return e < 65536 ? 1 : 2;
}
var Bs = /\r\n?|\n/, Vs = /*@__PURE__*/ (function(e) {
	return e[e.Simple = 0] = "Simple", e[e.TrackDel = 1] = "TrackDel", e[e.TrackBefore = 2] = "TrackBefore", e[e.TrackAfter = 3] = "TrackAfter", e;
})(Vs ||= {}), Hs = class e {
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
		Ks(this, e, t);
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
		return this.empty ? e : e.empty ? this : Js(this, e);
	}
	mapDesc(e, t = !1) {
		return e.empty ? this : qs(this, e, t);
	}
	mapPos(e, t = -1, n = Vs.Simple) {
		let r = 0, i = 0;
		for (let a = 0; a < this.sections.length;) {
			let o = this.sections[a++], s = this.sections[a++], c = r + o;
			if (s < 0) {
				if (c > e) return i + (e - r);
				i += o;
			} else {
				if (n != Vs.Simple && c >= e && (n == Vs.TrackDel && r < e && c > e || n == Vs.TrackBefore && r < e || n == Vs.TrackAfter && c > e)) return null;
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
}, Us = class e extends Hs {
	constructor(e, t) {
		super(e), this.inserted = t;
	}
	apply(e) {
		if (this.length != e.length) throw RangeError("Applying change set to a document with the wrong length");
		return Ks(this, (t, n, r, i, a) => e = e.replace(r, r + (n - t), a), !1), e;
	}
	mapDesc(e, t = !1) {
		return qs(this, e, t, !0);
	}
	invert(t) {
		let n = this.sections.slice(), r = [];
		for (let e = 0, i = 0; e < n.length; e += 2) {
			let a = n[e], o = n[e + 1];
			if (o >= 0) {
				n[e] = o, n[e + 1] = a;
				let s = e >> 1;
				for (; r.length < s;) r.push(L.empty);
				r.push(a ? t.slice(i, i + a) : L.empty);
			}
			i += a;
		}
		return new e(n, r);
	}
	compose(e) {
		return this.empty ? e : e.empty ? this : Js(this, e, !0);
	}
	map(e, t = !1) {
		return e.empty ? this : qs(this, e, t, !0);
	}
	iterChanges(e, t = !1) {
		Ks(this, e, t);
	}
	get desc() {
		return Hs.create(this.sections);
	}
	filter(t) {
		let n = [], r = [], i = [], a = new Ys(this);
		done: for (let e = 0, o = 0;;) {
			let s = e == t.length ? 1e9 : t[e++];
			for (; o < s || o == s && a.len == 0;) {
				if (a.done) break done;
				let e = Math.min(a.len, s - o);
				Ws(i, e, -1);
				let t = a.ins == -1 ? -1 : a.off == 0 ? a.ins : 0;
				Ws(n, e, t), t > 0 && Gs(r, n, a.text), a.forward(e), o += e;
			}
			let c = t[e++];
			for (; o < c;) {
				if (a.done) break done;
				let e = Math.min(a.len, c - o);
				Ws(n, e, -1), Ws(i, e, a.ins == -1 ? -1 : a.off == 0 ? a.ins : 0), a.forward(e), o += e;
			}
		}
		return {
			changes: new e(n, r),
			filtered: Hs.create(i)
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
			o < n && Ws(i, n - o, -1);
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
				let u = l ? typeof l == "string" ? L.of(l.split(r || Bs)) : l : L.empty, d = u.length;
				if (e == s && d == 0) return;
				e < o && c(), e > o && Ws(i, e - o, -1), Ws(i, s - e, d), Gs(a, i, u), o = s;
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
				for (; r.length < e;) r.push(L.empty);
				r[e] = L.of(i.slice(1)), n.push(i[0], r[e].length);
			}
		}
		return new e(n, r);
	}
	static createSet(t, n) {
		return new e(t, n);
	}
};
function Ws(e, t, n, r = !1) {
	if (t == 0 && n <= 0) return;
	let i = e.length - 2;
	i >= 0 && n <= 0 && n == e[i + 1] ? e[i] += t : i >= 0 && t == 0 && e[i] == 0 ? e[i + 1] += n : r ? (e[i] += t, e[i + 1] += n) : e.push(t, n);
}
function Gs(e, t, n) {
	if (n.length == 0) return;
	let r = t.length - 2 >> 1;
	if (r < e.length) e[e.length - 1] = e[e.length - 1].append(n);
	else {
		for (; e.length < r;) e.push(L.empty);
		e.push(n);
	}
}
function Ks(e, t, n) {
	let r = e.inserted;
	for (let i = 0, a = 0, o = 0; o < e.sections.length;) {
		let s = e.sections[o++], c = e.sections[o++];
		if (c < 0) i += s, a += s;
		else {
			let l = i, u = a, d = L.empty;
			for (; l += s, u += c, c && r && (d = d.append(r[o - 2 >> 1])), !(n || o == e.sections.length || e.sections[o + 1] < 0);) s = e.sections[o++], c = e.sections[o++];
			t(i, l, a, u, d), i = l, a = u;
		}
	}
}
function qs(e, t, n, r = !1) {
	let i = [], a = r ? [] : null, o = new Ys(e), s = new Ys(t);
	for (let e = -1;;) if (o.done && s.len || s.done && o.len) throw Error("Mismatched change set lengths");
	else if (o.ins == -1 && s.ins == -1) {
		let e = Math.min(o.len, s.len);
		Ws(i, e, -1), o.forward(e), s.forward(e);
	} else if (s.ins >= 0 && (o.ins < 0 || e == o.i || o.off == 0 && (s.len < o.len || s.len == o.len && !n))) {
		let t = s.len;
		for (Ws(i, s.ins, -1); t;) {
			let n = Math.min(o.len, t);
			o.ins >= 0 && e < o.i && o.len <= n && (Ws(i, 0, o.ins), a && Gs(a, i, o.text), e = o.i), o.forward(n), t -= n;
		}
		s.next();
	} else if (o.ins >= 0) {
		let t = 0, n = o.len;
		for (; n;) if (s.ins == -1) {
			let e = Math.min(n, s.len);
			t += e, n -= e, s.forward(e);
		} else if (s.ins == 0 && s.len < n) n -= s.len, s.next();
		else break;
		Ws(i, t, e < o.i ? o.ins : 0), a && e < o.i && Gs(a, i, o.text), e = o.i, o.forward(o.len - n);
	} else if (o.done && s.done) return a ? Us.createSet(i, a) : Hs.create(i);
	else throw Error("Mismatched change set lengths");
}
function Js(e, t, n = !1) {
	let r = [], i = n ? [] : null, a = new Ys(e), o = new Ys(t);
	for (let e = !1;;) if (a.done && o.done) return i ? Us.createSet(r, i) : Hs.create(r);
	else if (a.ins == 0) Ws(r, a.len, 0, e), a.next();
	else if (o.len == 0 && !o.done) Ws(r, 0, o.ins, e), i && Gs(i, r, o.text), o.next();
	else if (a.done || o.done) throw Error("Mismatched change set lengths");
	else {
		let t = Math.min(a.len2, o.len), n = r.length;
		if (a.ins == -1) {
			let n = o.ins == -1 ? -1 : o.off ? 0 : o.ins;
			Ws(r, t, n, e), i && n && Gs(i, r, o.text);
		} else o.ins == -1 ? (Ws(r, a.off ? 0 : a.len, t, e), i && Gs(i, r, a.textBit(t))) : (Ws(r, a.off ? 0 : a.len, o.off ? 0 : o.ins, e), i && !o.off && Gs(i, r, o.text));
		e = (a.ins > t || o.ins >= 0 && o.len > t) && (e || r.length > n), a.forward2(t), o.forward(t);
	}
}
var Ys = class {
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
		return t >= e.length ? L.empty : e[t];
	}
	textBit(e) {
		let { inserted: t } = this.set, n = this.i - 2 >> 1;
		return n >= t.length && !e ? L.empty : t[n].slice(this.off, e == null ? void 0 : this.off + e);
	}
	forward(e) {
		e == this.len ? this.next() : (this.len -= e, this.off += e);
	}
	forward2(e) {
		this.ins == -1 ? this.forward(e) : e == this.ins ? this.next() : (this.ins -= e, this.off += e);
	}
}, Xs = class e {
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
		if (e <= this.anchor && t >= this.anchor) return R.range(e, t, void 0, void 0, n);
		let r = Math.abs(e - this.anchor) > Math.abs(t - this.anchor) ? e : t;
		return R.range(this.anchor, r, void 0, void 0, n);
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
		return R.range(e.anchor, e.head);
	}
	static create(t, n, r, i) {
		return new e(t, n, r, i);
	}
}, R = class e {
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
		return new e(t.ranges.map((e) => Xs.fromJSON(e)), t.main);
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
		return Xs.create(e, e, (t == 0 ? 0 : t < 0 ? 8 : 16) | (n == null ? 7 : Math.min(6, n)), r);
	}
	static range(e, t, n, r, i) {
		let a = r == null ? 7 : Math.min(6, r);
		return !i && e != t && (i = t < e ? 1 : -1), i && (a |= i < 0 ? 8 : 16), t < e ? Xs.create(t, e, a | 32, n) : Xs.create(e, t, a, n);
	}
	static undirectionalRange(e, t) {
		return Xs.create(e, t, 64, void 0);
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
function Zs(e, t) {
	for (let n of e.ranges) if (n.to > t) throw RangeError("Selection points outside of document");
}
var Qs = 0, z = class e {
	constructor(e, t, n, r, i) {
		this.combine = e, this.compareInput = t, this.compare = n, this.isStatic = r, this.id = Qs++, this.default = e([]), this.extensions = typeof i == "function" ? i(this) : i;
	}
	get reader() {
		return this;
	}
	static define(t = {}) {
		return new e(t.combine || ((e) => e), t.compareInput || ((e, t) => e === t), t.compare || (t.combine ? (e, t) => e === t : $s), !!t.static, t.enables);
	}
	of(e) {
		return new ec([], this, 0, e);
	}
	compute(e, t) {
		if (this.isStatic) throw Error("Can't compute a static facet");
		return new ec(e, this, 1, t);
	}
	computeN(e, t) {
		if (this.isStatic) throw Error("Can't compute a static facet");
		return new ec(e, this, 2, t);
	}
	from(e, t) {
		return t ||= (e) => e, this.compute([e], (n) => t(n.field(e)));
	}
};
function $s(e, t) {
	return e == t || e.length == t.length && e.every((e, n) => e === t[n]);
}
var ec = class {
	constructor(e, t, n, r) {
		this.dependencies = e, this.facet = t, this.type = n, this.value = r, this.id = Qs++;
	}
	dynamicSlot(e) {
		let t = this.value, n = this.facet.compareInput, r = this.id, i = e[r] >> 1, a = this.type == 2, o = !1, s = !1, c = [];
		for (let t of this.dependencies) t == "doc" ? o = !0 : t == "selection" ? s = !0 : (e[t.id] ?? 1) & 1 || c.push(e[t.id]);
		return {
			create(e) {
				return e.values[i] = t(e), 1;
			},
			update(e, r) {
				if (o && r.docChanged || s && (r.docChanged || r.selection) || nc(e, c)) {
					let r = t(e);
					if (a ? !tc(r, e.values[i], n) : !n(r, e.values[i])) return e.values[i] = r, 1;
				}
				return 0;
			},
			reconfigure: (e, o) => {
				let s, c = o.config.address[r];
				if (c != null) {
					let r = hc(o, c);
					if (this.dependencies.every((t) => t instanceof z ? o.facet(t) === e.facet(t) : t instanceof ac ? o.field(t, !1) == e.field(t, !1) : !0) || (a ? tc(s = t(e), r, n) : n(s = t(e), r))) return e.values[i] = r, 0;
				} else s = t(e);
				return e.values[i] = s, 1;
			}
		};
	}
	get extension() {
		return this;
	}
};
function tc(e, t, n) {
	if (e.length != t.length) return !1;
	for (let r = 0; r < e.length; r++) if (!n(e[r], t[r])) return !1;
	return !0;
}
function nc(e, t) {
	let n = !1;
	for (let r of t) mc(e, r) & 1 && (n = !0);
	return n;
}
function rc(e, t, n) {
	let r = n.map((t) => e[t.id]), i = n.map((e) => e.type), a = r.filter((e) => !(e & 1)), o = e[t.id] >> 1;
	function s(e) {
		let n = [];
		for (let t = 0; t < r.length; t++) {
			let a = hc(e, r[t]);
			if (i[t] == 2) for (let e of a) n.push(e);
			else n.push(a);
		}
		return t.combine(n);
	}
	return {
		create(e) {
			for (let t of r) mc(e, t);
			return e.values[o] = s(e), 1;
		},
		update(e, n) {
			if (!nc(e, a)) return 0;
			let r = s(e);
			return t.compare(r, e.values[o]) ? 0 : (e.values[o] = r, 1);
		},
		reconfigure(e, i) {
			let a = nc(e, r), c = i.config.facets[t.id], l = i.facet(t);
			if (c && !a && $s(n, c)) return e.values[o] = l, 0;
			let u = s(e);
			return t.compare(u, l) ? (e.values[o] = l, 0) : (e.values[o] = u, 1);
		}
	};
}
var ic = /*@__PURE__*/ z.define({ static: !0 }), ac = class e {
	constructor(e, t, n, r, i) {
		this.id = e, this.createF = t, this.updateF = n, this.compareF = r, this.spec = i, this.provides = void 0;
	}
	static define(t) {
		let n = new e(Qs++, t.create, t.update, t.compare || ((e, t) => e === t), t);
		return t.provide && (n.provides = t.provide(n)), n;
	}
	create(e) {
		return (e.facet(ic).find((e) => e.field == this)?.create || this.createF)(e);
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
				let r = e.facet(ic), i = n.facet(ic), a;
				return (a = r.find((e) => e.field == this)) && a != i.find((e) => e.field == this) ? (e.values[t] = a.create(e), 1) : n.config.address[this.id] == null ? (e.values[t] = this.create(e), 1) : (e.values[t] = n.field(this), 0);
			}
		};
	}
	init(e) {
		return [this, ic.of({
			field: this,
			create: e
		})];
	}
	get extension() {
		return this;
	}
}, oc = {
	lowest: 4,
	low: 3,
	default: 2,
	high: 1,
	highest: 0
};
function sc(e) {
	return (t) => new lc(t, e);
}
var cc = {
	highest: /*@__PURE__*/ sc(oc.highest),
	high: /*@__PURE__*/ sc(oc.high),
	default: /*@__PURE__*/ sc(oc.default),
	low: /*@__PURE__*/ sc(oc.low),
	lowest: /*@__PURE__*/ sc(oc.lowest)
}, lc = class {
	constructor(e, t) {
		this.inner = e, this.prec = t;
	}
	get extension() {
		return this;
	}
}, uc = class e {
	of(e) {
		return new dc(this, e);
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
}, dc = class {
	constructor(e, t) {
		this.compartment = e, this.inner = t;
	}
	get extension() {
		return this;
	}
}, fc = class e {
	constructor(e, t, n, r, i, a) {
		for (this.base = e, this.compartments = t, this.dynamicSlots = n, this.address = r, this.staticValues = i, this.facets = a, this.statusTemplate = []; this.statusTemplate.length < n.length;) this.statusTemplate.push(0);
	}
	staticFacet(e) {
		let t = this.address[e.id];
		return t == null ? e.default : this.staticValues[t >> 1];
	}
	static resolve(t, n, r) {
		let i = [], a = Object.create(null), o = /* @__PURE__ */ new Map();
		for (let e of pc(t, n, o)) e instanceof ac ? i.push(e) : (a[e.facet.id] || (a[e.facet.id] = [])).push(e);
		let s = Object.create(null), c = [], l = [];
		for (let e of i) s[e.id] = l.length << 1, l.push((t) => e.slot(t));
		let u = r?.config.facets;
		for (let e in a) {
			let t = a[e], n = t[0].facet, i = u && u[e] || [];
			if (t.every((e) => e.type == 0)) {
				if (s[n.id] = c.length << 1 | 1, $s(i, t)) c.push(r.facet(n));
				else {
					let e = n.combine(t.map((e) => e.value));
					c.push(r && n.compare(e, r.facet(n)) ? r.facet(n) : e);
				}
			} else {
				for (let e of t) e.type == 0 ? (s[e.id] = c.length << 1 | 1, c.push(e.value)) : (s[e.id] = l.length << 1, l.push((t) => e.dynamicSlot(t)));
				s[n.id] = l.length << 1, l.push((e) => rc(e, n, t));
			}
		}
		let d = l.map((e) => e(s));
		return new e(t, o, d, s, c, a);
	}
};
function pc(e, t, n) {
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
			t > -1 && r[s].splice(t, 1), e instanceof dc && n.delete(e.compartment);
		}
		if (i.set(e, o), Array.isArray(e)) for (let t of e) a(t, o);
		else if (e instanceof dc) {
			if (n.has(e.compartment)) throw RangeError("Duplicate use of compartment in extensions");
			let r = t.get(e.compartment) || e.inner;
			n.set(e.compartment, r), a(r, o);
		} else if (e instanceof lc) a(e.inner, e.prec);
		else if (e instanceof ac) r[o].push(e), e.provides && a(e.provides, o);
		else if (e instanceof ec) r[o].push(e), e.facet.extensions && a(e.facet.extensions, oc.default);
		else {
			let t = e.extension;
			if (!t) throw Error(`Unrecognized extension value in extension set (${e}).`);
			if (t == e) throw Error(`Unrecognized extension value in extension set (${e}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
			a(t, o);
		}
	}
	return a(e, oc.default), r.reduce((e, t) => e.concat(t));
}
function mc(e, t) {
	if (t & 1) return 2;
	let n = t >> 1, r = e.status[n];
	if (r == 4) throw Error("Cyclic dependency between fields and/or facets");
	if (r & 2) return r;
	e.status[n] = 4;
	let i = e.computeSlot(e, e.config.dynamicSlots[n]);
	return e.status[n] = 2 | i;
}
function hc(e, t) {
	return t & 1 ? e.config.staticValues[t >> 1] : e.values[t >> 1];
}
var gc = /*@__PURE__*/ z.define(), _c = /*@__PURE__*/ z.define({
	combine: (e) => e.some((e) => e),
	static: !0
}), vc = /*@__PURE__*/ z.define({
	combine: (e) => e.length ? e[0] : void 0,
	static: !0
}), yc = /*@__PURE__*/ z.define(), bc = /*@__PURE__*/ z.define(), xc = /*@__PURE__*/ z.define(), Sc = /*@__PURE__*/ z.define({ combine: (e) => e.length ? e[0] : !1 }), Cc = class {
	constructor(e, t) {
		this.type = e, this.value = t;
	}
	static define() {
		return new wc();
	}
}, wc = class {
	of(e) {
		return new Cc(this, e);
	}
}, Tc = class {
	constructor(e) {
		this.map = e;
	}
	of(e) {
		return new Ec(this, e);
	}
}, Ec = class e {
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
		return new Tc(e.map || ((e) => e));
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
Ec.reconfigure = /*@__PURE__*/ Ec.define(), Ec.appendConfig = /*@__PURE__*/ Ec.define();
var Dc = class e {
	constructor(t, n, r, i, a, o) {
		this.startState = t, this.changes = n, this.selection = r, this.effects = i, this.annotations = a, this.scrollIntoView = o, this._doc = null, this._state = null, r && Zs(r, n.newLength), a.some((t) => t.type == e.time) || (this.annotations = a.concat(e.time.of(Date.now())));
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
Dc.time = /*@__PURE__*/ Cc.define(), Dc.userEvent = /*@__PURE__*/ Cc.define(), Dc.addToHistory = /*@__PURE__*/ Cc.define(), Dc.remote = /*@__PURE__*/ Cc.define();
function Oc(e, t) {
	let n = [];
	for (let r = 0, i = 0;;) {
		let a, o;
		if (r < e.length && (i == t.length || t[i] >= e[r])) a = e[r++], o = e[r++];
		else if (i < t.length) a = t[i++], o = t[i++];
		else return n;
		!n.length || n[n.length - 1] < a ? n.push(a, o) : n[n.length - 1] < o && (n[n.length - 1] = o);
	}
}
function kc(e, t, n) {
	let r, i, a;
	return n ? (r = t.changes, i = Us.empty(t.changes.length), a = e.changes.compose(t.changes)) : (r = t.changes.map(e.changes), i = e.changes.mapDesc(t.changes, !0), a = e.changes.compose(r)), {
		changes: a,
		selection: t.selection ? t.selection.map(i) : e.selection?.map(r),
		effects: Ec.mapEffects(e.effects, r).concat(Ec.mapEffects(t.effects, i)),
		annotations: e.annotations.length ? e.annotations.concat(t.annotations) : t.annotations,
		scrollIntoView: e.scrollIntoView || t.scrollIntoView
	};
}
function Ac(e, t, n) {
	let r = t.selection, i = Fc(t.annotations);
	return t.userEvent && (i = i.concat(Dc.userEvent.of(t.userEvent))), {
		changes: t.changes instanceof Us ? t.changes : Us.of(t.changes || [], n, e.facet(vc)),
		selection: r && (r instanceof R ? r : R.single(r.anchor, r.head)),
		effects: Fc(t.effects),
		annotations: i,
		scrollIntoView: !!t.scrollIntoView
	};
}
function jc(e, t, n) {
	let r = Ac(e, t.length ? t[0] : {}, e.doc.length);
	t.length && t[0].filter === !1 && (n = !1);
	for (let i = 1; i < t.length; i++) {
		t[i].filter === !1 && (n = !1);
		let a = !!t[i].sequential;
		r = kc(r, Ac(e, t[i], a ? r.changes.newLength : e.doc.length), a);
	}
	let i = Dc.create(e, r.changes, r.selection, r.effects, r.annotations, r.scrollIntoView);
	return Nc(n ? Mc(i) : i);
}
function Mc(e) {
	let t = e.startState, n = !0;
	for (let r of t.facet(yc)) {
		let t = r(e);
		if (t === !1) {
			n = !1;
			break;
		}
		Array.isArray(t) && (n = n === !0 ? t : Oc(n, t));
	}
	if (n !== !0) {
		let r, i;
		if (n === !1) i = e.changes.invertedDesc, r = Us.empty(t.doc.length);
		else {
			let t = e.changes.filter(n);
			r = t.changes, i = t.filtered.mapDesc(t.changes).invertedDesc;
		}
		e = Dc.create(t, r, e.selection && e.selection.map(i), Ec.mapEffects(e.effects, i), e.annotations, e.scrollIntoView);
	}
	let r = t.facet(bc);
	for (let n = r.length - 1; n >= 0; n--) {
		let i = r[n](e);
		e = i instanceof Dc ? i : Array.isArray(i) && i.length == 1 && i[0] instanceof Dc ? i[0] : jc(t, Fc(i), !1);
	}
	return e;
}
function Nc(e) {
	let t = e.startState, n = t.facet(xc), r = e;
	for (let i = n.length - 1; i >= 0; i--) {
		let a = n[i](e);
		a && Object.keys(a).length && (r = kc(r, Ac(t, a, e.changes.newLength), !0));
	}
	return r == e ? e : Dc.create(t, e.changes, e.selection, r.effects, r.annotations, r.scrollIntoView);
}
var Pc = [];
function Fc(e) {
	return e == null ? Pc : Array.isArray(e) ? e : [e];
}
var Ic = /*@__PURE__*/ (function(e) {
	return e[e.Word = 0] = "Word", e[e.Space = 1] = "Space", e[e.Other = 2] = "Other", e;
})(Ic ||= {}), Lc = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/, Rc;
try {
	Rc = /*@__PURE__*/ RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
} catch {}
function zc(e) {
	if (Rc) return Rc.test(e);
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		if (/\w/.test(n) || n > "" && (n.toUpperCase() != n.toLowerCase() || Lc.test(n))) return !0;
	}
	return !1;
}
function Bc(e) {
	return (t) => {
		if (!/\S/.test(t)) return Ic.Space;
		if (zc(t)) return Ic.Word;
		for (let n = 0; n < e.length; n++) if (t.indexOf(e[n]) > -1) return Ic.Word;
		return Ic.Other;
	};
}
var Vc = class e {
	constructor(e, t, n, r, i, a) {
		this.config = e, this.doc = t, this.selection = n, this.values = r, this.status = e.statusTemplate.slice(), this.computeSlot = i, a && (a._state = this);
		for (let e = 0; e < this.config.dynamicSlots.length; e++) mc(this, e << 1);
		this.computeSlot = null;
	}
	field(e, t = !0) {
		let n = this.config.address[e.id];
		if (n == null) {
			if (t) throw RangeError("Field is not present in this state");
			return;
		}
		return mc(this, n), hc(this, n);
	}
	update(...e) {
		return jc(this, e, !0);
	}
	applyTransaction(t) {
		let n = this.config, { base: r, compartments: i } = n;
		for (let e of t.effects) e.is(uc.reconfigure) ? (n &&= (i = /* @__PURE__ */ new Map(), n.compartments.forEach((e, t) => i.set(t, e)), null), i.set(e.value.compartment, e.value.extension)) : e.is(Ec.reconfigure) ? (n = null, r = e.value) : e.is(Ec.appendConfig) && (n = null, r = Fc(r).concat(e.value));
		let a;
		n ? a = t.startState.values.slice() : (n = fc.resolve(r, i, this), a = new e(n, this.doc, this.selection, n.dynamicSlots.map(() => null), (e, t) => t.reconfigure(e, this), null).values);
		let o = t.startState.facet(_c) ? t.newSelection : t.newSelection.asSingle();
		new e(n, t.newDoc, o, a, (e, n) => n.update(e, t), t);
	}
	replaceSelection(e) {
		return typeof e == "string" && (e = this.toText(e)), this.changeByRange((t) => ({
			changes: {
				from: t.from,
				to: t.to,
				insert: e
			},
			range: R.cursor(t.from + e.length, -1)
		}));
	}
	changeByRange(e) {
		let t = this.selection, n = e(t.ranges[0]), r = this.changes(n.changes), i = [n.range], a = Fc(n.effects);
		for (let n = 1; n < t.ranges.length; n++) {
			let o = e(t.ranges[n]), s = this.changes(o.changes), c = s.map(r);
			for (let e = 0; e < n; e++) i[e] = i[e].map(c);
			let l = r.mapDesc(s, !0);
			i.push(o.range.map(l)), r = r.compose(c), a = Ec.mapEffects(a, c).concat(Ec.mapEffects(Fc(o.effects), l));
		}
		return {
			changes: r,
			selection: R.create(i, t.mainIndex),
			effects: a
		};
	}
	changes(t = []) {
		return t instanceof Us ? t : Us.of(t, this.doc.length, this.facet(e.lineSeparator));
	}
	toText(t) {
		return L.of(t.split(this.facet(e.lineSeparator) || Bs));
	}
	sliceDoc(e = 0, t = this.doc.length) {
		return this.doc.sliceString(e, t, this.lineBreak);
	}
	facet(e) {
		let t = this.config.address[e.id];
		return t == null ? e.default : (mc(this, t), hc(this, t));
	}
	toJSON(e) {
		let t = {
			doc: this.sliceDoc(),
			selection: this.selection.toJSON()
		};
		if (e) for (let n in e) {
			let r = e[n];
			r instanceof ac && this.config.address[r.id] != null && (t[n] = r.spec.toJSON(this.field(e[n]), this));
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
			selection: R.fromJSON(t.selection),
			extensions: n.extensions ? i.concat([n.extensions]) : i
		});
	}
	static create(t = {}) {
		let n = fc.resolve(t.extensions || [], /* @__PURE__ */ new Map()), r = t.doc instanceof L ? t.doc : L.of((t.doc || "").split(n.staticFacet(e.lineSeparator) || Bs)), i = t.selection ? t.selection instanceof R ? t.selection : R.single(t.selection.anchor, t.selection.head) : R.single(0);
		return Zs(i, r.length), n.staticFacet(_c) || (i = i.asSingle()), new e(n, r, i, n.dynamicSlots.map(() => null), (e, t) => t.create(e), null);
	}
	get tabSize() {
		return this.facet(e.tabSize);
	}
	get lineBreak() {
		return this.facet(e.lineSeparator) || "\n";
	}
	get readOnly() {
		return this.facet(Sc);
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
		for (let i of this.facet(gc)) for (let a of i(this, t, n)) Object.prototype.hasOwnProperty.call(a, e) && r.push(a[e]);
		return r;
	}
	charCategorizer(e) {
		let t = this.languageDataAt("wordChars", e);
		return Bc(t.length ? t[0] : "");
	}
	wordAt(e) {
		let { text: t, from: n, length: r } = this.doc.lineAt(e), i = this.charCategorizer(e), a = e - n, o = e - n;
		for (; a > 0;) {
			let e = Fs(t, a, !1);
			if (i(t.slice(e, a)) != Ic.Word) break;
			a = e;
		}
		for (; o < r;) {
			let e = Fs(t, o);
			if (i(t.slice(o, e)) != Ic.Word) break;
			o = e;
		}
		return a == o ? null : R.range(a + n, o + n);
	}
};
Vc.allowMultipleSelections = _c, Vc.tabSize = /*@__PURE__*/ z.define({ combine: (e) => e.length ? e[0] : 4 }), Vc.lineSeparator = vc, Vc.readOnly = Sc, Vc.phrases = /*@__PURE__*/ z.define({ compare(e, t) {
	let n = Object.keys(e), r = Object.keys(t);
	return n.length == r.length && n.every((n) => e[n] == t[n]);
} }), Vc.languageData = gc, Vc.changeFilter = yc, Vc.transactionFilter = bc, Vc.transactionExtender = xc, uc.reconfigure = /*@__PURE__*/ Ec.define();
function Hc(e, t, n = {}) {
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
var Uc = class {
	eq(e) {
		return this == e;
	}
	range(e, t = e) {
		return Gc.create(e, t, this);
	}
};
Uc.prototype.startSide = Uc.prototype.endSide = 0, Uc.prototype.point = !1, Uc.prototype.mapMode = Vs.TrackDel;
function Wc(e, t) {
	return e == t || e.constructor == t.constructor && e.eq(t);
}
var Gc = class e {
	constructor(e, t, n) {
		this.from = e, this.to = t, this.value = n;
	}
	static create(t, n, r) {
		return new e(t, n, r);
	}
};
function Kc(e, t) {
	return e.from - t.from || e.value.startSide - t.value.startSide;
}
var qc = class e {
	constructor(e, t, n, r) {
		this.from = e, this.to = t, this.value = n, this.maxPoint = r;
	}
	get length() {
		return Yc(this.to);
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
		iter: for (let e = 0; e < this.value.length; e++) {
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
							continue iter;
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
}, Jc = class e {
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
		if (r && (n = n.slice().sort(Kc)), this.isEmpty) return n.length ? e.of(n) : this;
		let s = new $c(this, null, -1).goto(0), c = 0, l = [], u = new Zc();
		for (; s.value || c < n.length;) if (c < n.length && (s.from - n[c].from || s.startSide - n[c].value.startSide) >= 0) {
			let e = n[c++];
			u.addInner(e.from, e.to, e.value, !1) || l.push(e);
		} else s.rangeIndex == 1 && s.chunkIndex < this.chunk.length && (c == n.length || this.chunkEnd(s.chunkIndex) < n[c].from) && (!o || i > this.chunkEnd(s.chunkIndex) || a < this.chunkPos[s.chunkIndex]) && u.addChunk(this.chunkPos[s.chunkIndex], this.chunk[s.chunkIndex]) ? s.nextChunk() : ((!o || i > s.to || a < s.from || o(s.from, s.to, s.value)) && (u.addInner(s.from, s.to, s.value, !1) || l.push(Gc.create(s.from, s.to, s.value))), s.next());
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
			a ||= new Zc(), a.addRange(e, t, n, !1);
		};
		for (let e = 0; e < this.chunk.length; e++) {
			let a = this.chunkPos[e], s = this.chunk[e], c = t.touchesRange(a, a + s.length);
			if (c === !1) i = Math.max(i, s.maxPoint), n.push(s), r.push(t.mapPos(a));
			else if (c === !0) {
				let [e, c] = n.length ? [Yc(r) + Yc(n).length, Yc(Yc(n).value).endSide] : [-1, -1], { mapped: l, pos: u } = s.map(a, t, e, c, o);
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
		return el.from([this]).goto(e);
	}
	get isEmpty() {
		return this.nextLayer == this;
	}
	static iter(e, t = 0) {
		return el.from(e).goto(t);
	}
	static compare(e, t, n, r, i = -1) {
		let a = e.filter((e) => e.maxPoint > 0 || !e.isEmpty && e.maxPoint >= i), o = t.filter((e) => e.maxPoint > 0 || !e.isEmpty && e.maxPoint >= i), s = Qc(a, o, n), c = new nl(a, s, i), l = new nl(o, s, i);
		n.iterGaps((e, t, n) => rl(c, e, l, t, n, r)), n.empty && n.length == 0 && rl(c, 0, l, 0, 0, r);
	}
	static eq(e, t, n = 0, r) {
		r ??= 1e9 - 1;
		let i = e.filter((e) => !e.isEmpty && t.indexOf(e) < 0), a = t.filter((t) => !t.isEmpty && e.indexOf(t) < 0);
		if (i.length != a.length) return !1;
		if (!i.length) return !0;
		let o = Qc(i, a), s = new nl(i, o, 0).goto(n), c = new nl(a, o, 0).goto(n);
		for (;;) {
			if (s.to != c.to || !il(s.active, c.active) || s.point && (!c.point || !Wc(s.point, c.point))) return !1;
			if (s.to > r) return !0;
			s.next(), c.next();
		}
	}
	static spans(e, t, n, r, i = -1) {
		let a = new nl(e, null, i).goto(t), o = t, s = a.openStart;
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
		let n = new Zc();
		for (let r of e instanceof Gc ? [e] : t ? Xc(e) : e) n.add(r.from, r.to, r.value);
		return n.finish();
	}
	static join(t) {
		if (!t.length) return e.empty;
		let n = Yc(t);
		for (let r = t.length - 2; r >= 0; r--) for (let i = t[r]; i != e.empty; i = i.nextLayer) n = new e(i.chunkPos, i.chunk, n, Math.max(i.maxPoint, n.maxPoint));
		return n;
	}
};
Jc.empty = /*@__PURE__*/ new Jc([], [], null, -1);
function Yc(e) {
	return e[e.length - 1];
}
function Xc(e) {
	if (e.length > 1) for (let t = e[0], n = 1; n < e.length; n++) {
		let r = e[n];
		if (Kc(t, r) > 0) return e.slice().sort(Kc);
		t = r;
	}
	return e;
}
Jc.empty.nextLayer = Jc.empty;
var Zc = class e {
	finishChunk(e) {
		this.chunks.push(new qc(this.from, this.to, this.value, this.maxPoint)), this.chunkPos.push(this.chunkStart), this.chunkStart = -1, this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint), this.maxPoint = -1, e && (this.from = [], this.to = [], this.value = []);
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
		return this.finishInner(Jc.empty);
	}
	finishInner(e) {
		if (this.from.length && this.finishChunk(!1), this.chunks.length == 0) return e;
		let t = Jc.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(e) : e, this.setMaxPoint);
		return this.from = null, t;
	}
};
function Qc(e, t, n) {
	let r = /* @__PURE__ */ new Map();
	for (let t of e) for (let e = 0; e < t.chunk.length; e++) t.chunk[e].maxPoint <= 0 && r.set(t.chunk[e], t.chunkPos[e]);
	let i = /* @__PURE__ */ new Set();
	for (let e of t) for (let t = 0; t < e.chunk.length; t++) {
		let a = r.get(e.chunk[t]);
		a != null && (n ? n.mapPos(a) : a) == e.chunkPos[t] && !n?.touchesRange(a, a + e.chunk[t].length) && i.add(e.chunk[t]);
	}
	return i;
}
var $c = class {
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
}, el = class e {
	constructor(e) {
		this.heap = e;
	}
	static from(t, n = null, r = -1) {
		let i = [];
		for (let e = 0; e < t.length; e++) for (let a = t[e]; !a.isEmpty; a = a.nextLayer) a.maxPoint >= r && i.push(new $c(a, n, r, e));
		return i.length == 1 ? i[0] : new e(i);
	}
	get startSide() {
		return this.value ? this.value.startSide : 0;
	}
	goto(e, t = -1e9) {
		for (let n of this.heap) n.goto(e, t);
		for (let e = this.heap.length >> 1; e >= 0; e--) tl(this.heap, e);
		return this.next(), this;
	}
	forward(e, t) {
		for (let n of this.heap) n.forward(e, t);
		for (let e = this.heap.length >> 1; e >= 0; e--) tl(this.heap, e);
		(this.to - e || this.value.endSide - t) < 0 && this.next();
	}
	next() {
		if (this.heap.length == 0) this.from = this.to = 1e9, this.value = null, this.rank = -1;
		else {
			let e = this.heap[0];
			this.from = e.from, this.to = e.to, this.value = e.value, this.rank = e.rank, e.value && e.next(), tl(this.heap, 0);
		}
	}
};
function tl(e, t) {
	for (let n = e[t];;) {
		let r = (t << 1) + 1;
		if (r >= e.length) break;
		let i = e[r];
		if (r + 1 < e.length && i.compare(e[r + 1]) >= 0 && (i = e[r + 1], r++), n.compare(i) < 0) break;
		e[r] = n, e[t] = i, t = r;
	}
}
var nl = class {
	constructor(e, t, n) {
		this.minPoint = n, this.active = [], this.activeTo = [], this.activeRank = [], this.minActive = -1, this.point = null, this.pointFrom = 0, this.pointRank = 0, this.to = -1e9, this.endSide = 0, this.openStart = -1, this.cursor = el.from(e, t, n);
	}
	goto(e, t = -1e9) {
		return this.cursor.goto(e, t), this.active.length = this.activeTo.length = this.activeRank.length = 0, this.minActive = -1, this.to = e, this.endSide = t, this.openStart = -1, this.next(), this;
	}
	forward(e, t) {
		for (; this.minActive > -1 && (this.activeTo[this.minActive] - e || this.active[this.minActive].endSide - t) < 0;) this.removeActive(this.minActive);
		this.cursor.forward(e, t);
	}
	removeActive(e) {
		al(this.active, e), al(this.activeTo, e), al(this.activeRank, e), this.minActive = sl(this.active, this.activeTo);
	}
	addActive(e) {
		let t = 0, { value: n, to: r, rank: i } = this.cursor;
		for (; t < this.activeRank.length && (i - this.activeRank[t] || r - this.activeTo[t]) > 0;) t++;
		ol(this.active, t, n), ol(this.activeTo, t, r), ol(this.activeRank, t, i), e && ol(e, t, this.cursor.from), this.minActive = sl(this.active, this.activeTo);
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
				this.removeActive(r), n && al(n, r);
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
function rl(e, t, n, r, i, a) {
	e.goto(t), n.goto(r);
	let o = r + i, s = r, c = r - t, l = !!a.boundChange;
	for (let t = !1;;) {
		let r = e.to + c - n.to, i = r || e.endSide - n.endSide, u = i < 0 ? e.to + c : n.to, d = Math.min(u, o);
		if (e.point || n.point ? (e.point && n.point && Wc(e.point, n.point) && il(e.activeForPoint(e.to), n.activeForPoint(n.to)) || a.comparePoint(s, d, e.point, n.point), t = !1) : (t &&= (a.boundChange(s), !1), d > s && !il(e.active, n.active) && a.compareRange(s, d, e.active, n.active), l && d < o && (r || e.openEnd(u) != n.openEnd(u)) && (t = !0)), u > o) break;
		s = u, i <= 0 && e.next(), i >= 0 && n.next();
	}
}
function il(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) if (e[n] != t[n] && !Wc(e[n], t[n])) return !1;
	return !0;
}
function al(e, t) {
	for (let n = t, r = e.length - 1; n < r; n++) e[n] = e[n + 1];
	e.pop();
}
function ol(e, t, n) {
	for (let n = e.length - 1; n >= t; n--) e[n + 1] = e[n];
	e[t] = n;
}
function sl(e, t) {
	let n = -1, r = 1e9;
	for (let i = 0; i < t.length; i++) (t[i] - r || e[i].endSide - e[n].endSide) < 0 && (n = i, r = t[i]);
	return n;
}
function cl(e, t, n = e.length) {
	let r = 0;
	for (let i = 0; i < n && i < e.length;) e.charCodeAt(i) == 9 ? (r += t - r % t, i++) : (r++, i = Fs(e, i));
	return r;
}
function ll(e, t, n, r) {
	for (let r = 0, i = 0;;) {
		if (i >= t) return r;
		if (r == e.length) break;
		i += e.charCodeAt(r) == 9 ? n - i % n : 1, r = Fs(e, r);
	}
	return r === !0 ? -1 : e.length;
}
for (var ul = "ͼ", dl = typeof Symbol > "u" ? "__ͼ" : Symbol.for(ul), fl = typeof Symbol > "u" ? "__styleSet" + Math.floor(Math.random() * 1e8) : Symbol("styleSet"), pl = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : {}, ml = class {
	constructor(e, t) {
		this.rules = [];
		let { finish: n } = t || {};
		function r(e) {
			return /^@/.test(e) ? [e] : e.split(/,\s*/);
		}
		function i(e, t, a, o) {
			let s = [], c = /^@(\w+)\b/.exec(e[0]), l = c && c[1] == "keyframes";
			if (c && t == null) return a.push(e[0] + ";");
			for (let n in t) {
				let o = t[n];
				if (/&/.test(n)) i(n.split(/,\s*/).map((t) => e.map((e) => t.replace(/&/, e))).reduce((e, t) => e.concat(t)), o, a);
				else if (o && typeof o == "object") {
					if (!c) throw RangeError("The value of a property (" + n + ") should be a primitive value.");
					i(r(n), o, s, l);
				} else o != null && s.push(n.replace(/_.*/, "").replace(/[A-Z]/g, (e) => "-" + e.toLowerCase()) + ": " + o + ";");
			}
			(s.length || l) && a.push((n && !c && !o ? e.map(n) : e).join(", ") + " {" + s.join(" ") + "}");
		}
		for (let t in e) i(r(t), e[t], this.rules);
	}
	getRules() {
		return this.rules.join("\n");
	}
	static newName() {
		let e = pl[dl] || 1;
		return pl[dl] = e + 1, ul + e.toString(36);
	}
	static mount(e, t, n) {
		let r = e[fl], i = n && n.nonce;
		r ? i && r.setNonce(i) : r = new gl(e, i), r.mount(Array.isArray(t) ? t : [t], e);
	}
}, hl = /* @__PURE__ */ new Map(), gl = class {
	constructor(e, t) {
		let n = e.ownerDocument || e, r = n.defaultView;
		if (!e.head && e.adoptedStyleSheets && r.CSSStyleSheet) {
			let t = hl.get(n);
			if (t) return e[fl] = t;
			this.sheet = new r.CSSStyleSheet(), hl.set(n, this);
		} else this.styleTag = n.createElement("style"), t && this.styleTag.setAttribute("nonce", t);
		this.modules = [], e[fl] = this;
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
}, _l = {
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
}, vl = {
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
}, yl = typeof navigator < "u" && /Mac/.test(navigator.platform), bl = typeof navigator < "u" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent), xl = 0; xl < 10; xl++) _l[48 + xl] = _l[96 + xl] = String(xl);
for (var xl = 1; xl <= 24; xl++) _l[xl + 111] = "F" + xl;
for (var xl = 65; xl <= 90; xl++) _l[xl] = String.fromCharCode(xl + 32), vl[xl] = String.fromCharCode(xl);
for (var Sl in _l) vl.hasOwnProperty(Sl) || (vl[Sl] = _l[Sl]);
function Cl(e) {
	var t = !(yl && e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey || bl && e.shiftKey && e.key && e.key.length == 1 || e.key == "Unidentified") && e.key || (e.shiftKey ? vl : _l)[e.keyCode] || e.key || "Unidentified";
	return t == "Esc" && (t = "Escape"), t == "Del" && (t = "Delete"), t == "Left" && (t = "ArrowLeft"), t == "Up" && (t = "ArrowUp"), t == "Right" && (t = "ArrowRight"), t == "Down" && (t = "ArrowDown"), t;
}
//#endregion
//#region node_modules/@codemirror/view/dist/index.js
var wl = typeof navigator < "u" ? navigator : {
	userAgent: "",
	vendor: "",
	platform: ""
}, Tl = typeof document < "u" ? document : { documentElement: { style: {} } }, El = /*@__PURE__*/ /Edge\/(\d+)/.exec(wl.userAgent), Dl = /*@__PURE__*/ /MSIE \d/.test(wl.userAgent), Ol = /*@__PURE__*/ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(wl.userAgent), kl = !!(Dl || Ol || El), Al = !kl && /*@__PURE__*/ /gecko\/(\d+)/i.test(wl.userAgent), jl = !kl && /*@__PURE__*/ /Chrome\/(\d+)/.exec(wl.userAgent), Ml = "webkitFontSmoothing" in Tl.documentElement.style, Nl = !kl && /*@__PURE__*/ /Apple Computer/.test(wl.vendor), Pl = Nl && (/*@__PURE__*/ /Mobile\/\w+/.test(wl.userAgent) || wl.maxTouchPoints > 2), B = {
	mac: Pl || /*@__PURE__*/ /Mac/.test(wl.platform),
	windows: /*@__PURE__*/ /Win/.test(wl.platform),
	linux: /*@__PURE__*/ /Linux|X11/.test(wl.platform),
	ie: kl,
	ie_version: Dl ? Tl.documentMode || 6 : Ol ? +Ol[1] : El ? +El[1] : 0,
	gecko: Al,
	gecko_version: Al ? +(/*@__PURE__*/ /Firefox\/(\d+)/.exec(wl.userAgent) || [0, 0])[1] : 0,
	chrome: !!jl,
	chrome_version: jl ? +jl[1] : 0,
	ios: Pl,
	android: /*@__PURE__*/ /Android\b/.test(wl.userAgent),
	webkit: Ml,
	webkit_version: Ml ? +(/*@__PURE__*/ /\bAppleWebKit\/(\d+)/.exec(wl.userAgent) || [0, 0])[1] : 0,
	safari: Nl,
	safari_version: Nl ? +(/*@__PURE__*/ /\bVersion\/(\d+(\.\d+)?)/.exec(wl.userAgent) || [0, 0])[1] : 0,
	tabSize: Tl.documentElement.style.tabSize == null ? "-moz-tab-size" : "tab-size"
};
function Fl(e, t) {
	for (let n in e) n == "class" && t.class ? t.class += " " + e.class : n == "style" && t.style ? t.style += ";" + e.style : t[n] = e[n];
	return t;
}
var Il = /*@__PURE__*/ Object.create(null);
function Ll(e, t, n) {
	if (e == t) return !0;
	e ||= Il, t ||= Il;
	let r = Object.keys(e), i = Object.keys(t);
	if (r.length - (n && r.indexOf(n) > -1 ? 1 : 0) != i.length - (n && i.indexOf(n) > -1 ? 1 : 0)) return !1;
	for (let a of r) if (a != n && (i.indexOf(a) == -1 || e[a] !== t[a])) return !1;
	return !0;
}
function Rl(e, t) {
	for (let n = e.attributes.length - 1; n >= 0; n--) {
		let r = e.attributes[n].name;
		t[r] ?? e.removeAttribute(r);
	}
	for (let n in t) {
		let r = t[n];
		n == "style" ? e.style.cssText = r : e.getAttribute(n) != r && e.setAttribute(n, r);
	}
}
function zl(e, t, n) {
	let r = !1;
	if (t) for (let i in t) n && i in n || (r = !0, i == "style" ? e.style.cssText = "" : e.removeAttribute(i));
	if (n) for (let i in n) t && t[i] == n[i] || (r = !0, i == "style" ? e.style.cssText = n[i] : e.setAttribute(i, n[i]));
	return r;
}
function Bl(e) {
	let t = Object.create(null);
	for (let n = 0; n < e.attributes.length; n++) {
		let r = e.attributes[n];
		t[r.name] = r.value;
	}
	return t;
}
var Vl = class {
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
}, Hl = /*@__PURE__*/ (function(e) {
	return e[e.Text = 0] = "Text", e[e.WidgetBefore = 1] = "WidgetBefore", e[e.WidgetAfter = 2] = "WidgetAfter", e[e.WidgetRange = 3] = "WidgetRange", e;
})(Hl ||= {}), Ul = class extends Uc {
	constructor(e, t, n, r) {
		super(), this.startSide = e, this.endSide = t, this.widget = n, this.spec = r;
	}
	get heightRelevant() {
		return !1;
	}
	static mark(e) {
		return new Wl(e);
	}
	static widget(e) {
		let t = Math.max(-1e4, Math.min(1e4, e.side || 0)), n = !!e.block;
		return t += n && !e.inlineOrder ? t > 0 ? 3e8 : -4e8 : t > 0 ? 1e8 : -1e8, new Kl(e, t, t, n, e.widget || null, !1);
	}
	static replace(e) {
		let t = !!e.block, n, r;
		if (e.isBlockGap) n = -5e8, r = 4e8;
		else {
			let { start: i, end: a } = ql(e, t);
			n = (i ? t ? -3e8 : -1 : 5e8) - 1, r = (a ? t ? 2e8 : 1 : -6e8) + 1;
		}
		return new Kl(e, n, r, t, e.widget || null, !0);
	}
	static line(e) {
		return new Gl(e);
	}
	static set(e, t = !1) {
		return Jc.of(e, t);
	}
	hasHeight() {
		return this.widget ? this.widget.estimatedHeight > -1 : !1;
	}
};
Ul.none = Jc.empty;
var Wl = class e extends Ul {
	constructor(e) {
		let { start: t, end: n } = ql(e);
		super(t ? -1 : 5e8, n ? 1 : -6e8, null, e), this.tagName = e.tagName || "span", this.attrs = e.class && e.attributes ? Fl(e.attributes, { class: e.class }) : e.class ? { class: e.class } : e.attributes || Il;
	}
	eq(t) {
		return this == t || t instanceof e && this.tagName == t.tagName && Ll(this.attrs, t.attrs);
	}
	range(e, t = e) {
		if (e >= t) throw RangeError("Mark decorations may not be empty");
		return super.range(e, t);
	}
};
Wl.prototype.point = !1;
var Gl = class e extends Ul {
	constructor(e) {
		super(-2e8, -2e8, null, e);
	}
	eq(t) {
		return t instanceof e && this.spec.class == t.spec.class && Ll(this.spec.attributes, t.spec.attributes);
	}
	range(e, t = e) {
		if (t != e) throw RangeError("Line decoration ranges must be zero-length");
		return super.range(e, t);
	}
};
Gl.prototype.mapMode = Vs.TrackBefore, Gl.prototype.point = !0;
var Kl = class e extends Ul {
	constructor(e, t, n, r, i, a) {
		super(t, n, i, e), this.block = r, this.isReplace = a, this.mapMode = r ? t <= 0 ? Vs.TrackBefore : Vs.TrackAfter : Vs.TrackDel;
	}
	get type() {
		return this.startSide == this.endSide ? this.startSide <= 0 ? Hl.WidgetBefore : Hl.WidgetAfter : Hl.WidgetRange;
	}
	get heightRelevant() {
		return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
	}
	eq(t) {
		return t instanceof e && Jl(this.widget, t.widget) && this.block == t.block && this.startSide == t.startSide && this.endSide == t.endSide;
	}
	range(e, t = e) {
		if (this.isReplace && (e > t || e == t && this.startSide > 0 && this.endSide <= 0)) throw RangeError("Invalid range for replacement decoration");
		if (!this.isReplace && t != e) throw RangeError("Widget decorations can only have zero-length ranges");
		return super.range(e, t);
	}
};
Kl.prototype.point = !0;
function ql(e, t = !1) {
	let { inclusiveStart: n, inclusiveEnd: r } = e;
	return n ??= e.inclusive, r ??= e.inclusive, {
		start: n ?? t,
		end: r ?? t
	};
}
function Jl(e, t) {
	return e == t || !!(e && t && e.compare(t));
}
function Yl(e, t, n, r = 0) {
	let i = n.length - 1;
	i >= 0 && n[i] + r >= e ? n[i] = Math.max(n[i], t) : n.push(e, t);
}
var Xl = class e extends Uc {
	constructor(e, t, n) {
		super(), this.tagName = e, this.attributes = t, this.rank = n;
	}
	eq(t) {
		return t == this || t instanceof e && this.tagName == t.tagName && Ll(this.attributes, t.attributes);
	}
	static create(t) {
		return new e(t.tagName, t.attributes || Il, t.rank == null ? 50 : Math.max(0, Math.min(t.rank, 100)));
	}
	static set(e, t = !1) {
		return Jc.of(e, t);
	}
};
Xl.prototype.startSide = Xl.prototype.endSide = -1;
function Zl(e) {
	let t;
	return t = e.nodeType == 11 ? e.getSelection ? e : e.ownerDocument : e, t.getSelection();
}
function Ql(e, t) {
	return t ? e == t || e.contains(t.nodeType == 1 ? t : t.parentNode) : !1;
}
function $l(e, t) {
	if (!t.anchorNode) return !1;
	try {
		return Ql(e, t.anchorNode);
	} catch {
		return !1;
	}
}
function eu(e) {
	return e.nodeType == 3 ? _u(e, 0, e.nodeValue.length).getClientRects() : e.nodeType == 1 ? e.getClientRects() : [];
}
function tu(e, t, n, r) {
	return n ? iu(e, t, n, r, -1) || iu(e, t, n, r, 1) : !1;
}
function nu(e) {
	for (var t = 0;; t++) if (e = e.previousSibling, !e) return t;
}
function ru(e) {
	return e.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(e.nodeName);
}
function iu(e, t, n, r, i) {
	for (;;) {
		if (e == n && t == r) return !0;
		if (t == (i < 0 ? 0 : au(e))) {
			if (e.nodeName == "DIV") return !1;
			let n = e.parentNode;
			if (!n || n.nodeType != 1) return !1;
			t = nu(e) + (i < 0 ? 0 : 1), e = n;
		} else if (e.nodeType == 1) {
			if (e = e.childNodes[t + (i < 0 ? -1 : 0)], e.nodeType == 1 && e.contentEditable == "false") return !1;
			t = i < 0 ? au(e) : 0;
		} else return !1;
	}
}
function au(e) {
	return e.nodeType == 3 ? e.nodeValue.length : e.childNodes.length;
}
function ou(e, t) {
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
function su(e) {
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
function cu(e, t) {
	let n = t.width / e.offsetWidth, r = t.height / e.offsetHeight;
	return (n > .995 && n < 1.005 || !isFinite(n) || Math.abs(t.width - e.offsetWidth) < 1) && (n = 1), (r > .995 && r < 1.005 || !isFinite(r) || Math.abs(t.height - e.offsetHeight) < 1) && (r = 1), {
		scaleX: n,
		scaleY: r
	};
}
function lu(e, t, n, r, i, a, o, s) {
	let c = e.ownerDocument, l = c.defaultView || window;
	for (let u = e, d = !1; u && !d;) if (u.nodeType == 1) {
		let e, f = u == c.body, p = 1, m = 1;
		if (f) e = su(l);
		else {
			if (/^(fixed|sticky)$/.test(getComputedStyle(u).position) && (d = !0), u.scrollHeight <= u.clientHeight && u.scrollWidth <= u.clientWidth) {
				u = u.assignedSlot || u.parentNode;
				continue;
			}
			let t = u.getBoundingClientRect();
			({scaleX: p, scaleY: m} = cu(u, t)), e = {
				left: t.left,
				right: t.left + u.clientWidth * p,
				top: t.top,
				bottom: t.top + u.clientHeight * m
			};
		}
		let h = 0, g = 0;
		if (i == "nearest") t.top < e.top + o ? (g = t.top - (e.top + o), n > 0 && t.bottom > e.bottom + g && (g = t.bottom - e.bottom + o)) : t.bottom > e.bottom - o && (g = t.bottom - e.bottom + o, n < 0 && t.top - g < e.top && (g = t.top - (e.top + o)));
		else {
			let r = t.bottom - t.top, a = e.bottom - e.top;
			g = (i == "center" && r <= a ? t.top + r / 2 - a / 2 : i == "start" || i == "center" && n < 0 ? t.top - o : t.bottom - a + o) - e.top;
		}
		if (r == "nearest" ? t.left < e.left + a ? (h = t.left - (e.left + a), n > 0 && t.right > e.right + h && (h = t.right - e.right + a)) : t.right > e.right - a && (h = t.right - e.right + a, n < 0 && t.left < e.left + h && (h = t.left - (e.left + a))) : h = (r == "center" ? t.left + (t.right - t.left) / 2 - (e.right - e.left) / 2 : r == "start" == s ? t.left - a : t.right - (e.right - e.left) + a) - e.left, h || g) {
			if (f) l.scrollBy(h, g);
			else {
				let e = 0, n = 0;
				if (g) {
					let e = u.scrollTop;
					u.scrollTop += g / m, n = (u.scrollTop - e) * m;
				}
				if (h) {
					let t = u.scrollLeft;
					u.scrollLeft += h / p, e = (u.scrollLeft - t) * p;
				}
				t = {
					left: t.left - e,
					top: t.top - n,
					right: t.right - e,
					bottom: t.bottom - n
				}, e && Math.abs(e - h) < 1 && (r = "nearest"), n && Math.abs(n - g) < 1 && (i = "nearest");
			}
		}
		if (f) break;
		(t.top < e.top || t.bottom > e.bottom || t.left < e.left || t.right > e.right) && (t = {
			left: Math.max(t.left, e.left),
			right: Math.min(t.right, e.right),
			top: Math.max(t.top, e.top),
			bottom: Math.min(t.bottom, e.bottom)
		}), u = u.assignedSlot || u.parentNode;
	} else if (u.nodeType == 11) u = u.host;
	else break;
}
function uu(e, t = !0) {
	let n = e.ownerDocument, r = null, i = null;
	for (let a = e.parentNode; a && !(a == n.body || (!t || r) && i);) if (a.nodeType == 1) !i && a.scrollHeight > a.clientHeight && (i = a), t && !r && a.scrollWidth > a.clientWidth && (r = a), a = a.assignedSlot || a.parentNode;
	else if (a.nodeType == 11) a = a.host;
	else break;
	return {
		x: r,
		y: i
	};
}
var du = class {
	constructor() {
		this.anchorNode = null, this.anchorOffset = 0, this.focusNode = null, this.focusOffset = 0;
	}
	eq(e) {
		return this.anchorNode == e.anchorNode && this.anchorOffset == e.anchorOffset && this.focusNode == e.focusNode && this.focusOffset == e.focusOffset;
	}
	setRange(e) {
		let { anchorNode: t, focusNode: n } = e;
		this.set(t, Math.min(e.anchorOffset, t ? au(t) : 0), n, Math.min(e.focusOffset, n ? au(n) : 0));
	}
	set(e, t, n, r) {
		this.anchorNode = e, this.anchorOffset = t, this.focusNode = n, this.focusOffset = r;
	}
};
function fu(e) {
	let t = [];
	for (let n = e; n; n = n.nodeType == 11 ? n.host : n.parentNode) n.nodeType == 1 && t.push({
		node: n,
		left: n.scrollLeft,
		top: n.scrollTop
	});
	return t;
}
function pu(e, t = !0) {
	for (let { node: n, left: r, top: i } of e) t && n.scrollTop != i && (n.scrollTop = i), n.scrollLeft != r && (n.scrollLeft = r);
}
var mu = null;
B.safari && B.safari_version >= 26 && (mu = !1);
function hu(e) {
	if (e.setActive) return e.setActive();
	if (mu) return e.focus(mu);
	let t = fu(e);
	e.focus(mu == null ? { get preventScroll() {
		return mu = { preventScroll: !0 }, !0;
	} } : void 0), mu || (mu = !1, pu(t));
}
var gu;
function _u(e, t, n = t) {
	let r = gu ||= document.createRange();
	return r.setEnd(e, n), r.setStart(e, t), r;
}
function vu(e, t, n, r) {
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
function yu(e) {
	for (; e;) {
		if (e && (e.nodeType == 9 || e.nodeType == 11 && e.host)) return e;
		e = e.assignedSlot || e.parentNode;
	}
	return null;
}
function bu(e, t) {
	let n = t.focusNode, r = t.focusOffset;
	if (!n || t.anchorNode != n || t.anchorOffset != r) return !1;
	for (r = Math.min(r, au(n));;) if (r) {
		if (n.nodeType != 1) return !1;
		let e = n.childNodes[r - 1];
		e.contentEditable == "false" ? r-- : (n = e, r = au(n));
	} else if (n == e) return !0;
	else r = nu(n), n = n.parentNode;
}
function xu(e) {
	return e instanceof Window ? e.pageYOffset > Math.max(0, e.document.documentElement.scrollHeight - e.innerHeight - 4) : e.scrollTop > Math.max(1, e.scrollHeight - e.clientHeight - 4);
}
function Su(e, t) {
	for (let n = e, r = t;;) if (n.nodeType == 3 && r > 0) return {
		node: n,
		offset: r
	};
	else if (n.nodeType == 1 && r > 0) {
		if (n.contentEditable == "false") return null;
		n = n.childNodes[r - 1], r = au(n);
	} else if (n.parentNode && !ru(n)) r = nu(n), n = n.parentNode;
	else return null;
}
function Cu(e, t) {
	for (let n = e, r = t;;) if (n.nodeType == 3 && r < n.nodeValue.length) return {
		node: n,
		offset: r
	};
	else if (n.nodeType == 1 && r < n.childNodes.length) {
		if (n.contentEditable == "false") return null;
		n = n.childNodes[r], r = 0;
	} else if (n.parentNode && !ru(n)) r = nu(n) + 1, n = n.parentNode;
	else return null;
}
var wu = class e {
	constructor(e, t, n = !0) {
		this.node = e, this.offset = t, this.precise = n;
	}
	static before(t, n) {
		return new e(t.parentNode, nu(t), n);
	}
	static after(t, n) {
		return new e(t.parentNode, nu(t) + 1, n);
	}
}, Tu = /*@__PURE__*/ (function(e) {
	return e[e.LTR = 0] = "LTR", e[e.RTL = 1] = "RTL", e;
})(Tu ||= {}), Eu = Tu.LTR, Du = Tu.RTL;
function Ou(e) {
	let t = [];
	for (let n = 0; n < e.length; n++) t.push(1 << e[n]);
	return t;
}
var ku = /*@__PURE__*/ Ou("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008"), Au = /*@__PURE__*/ Ou("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333"), ju = /*@__PURE__*/ Object.create(null), Mu = [];
for (let e of [
	"()",
	"[]",
	"{}"
]) {
	let t = /*@__PURE__*/ e.charCodeAt(0), n = /*@__PURE__*/ e.charCodeAt(1);
	ju[t] = n, ju[n] = -t;
}
function Nu(e) {
	return e <= 247 ? ku[e] : 1424 <= e && e <= 1524 ? 2 : 1536 <= e && e <= 1785 ? Au[e - 1536] : 1774 <= e && e <= 2220 ? 4 : 8192 <= e && e <= 8204 ? 256 : 64336 <= e && e <= 65023 ? 4 : 1;
}
var Pu = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/, Fu = class {
	get dir() {
		return this.level % 2 ? Du : Eu;
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
function Iu(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) {
		let r = e[n], i = t[n];
		if (r.from != i.from || r.to != i.to || r.direction != i.direction || !Iu(r.inner, i.inner)) return !1;
	}
	return !0;
}
var V = [];
function Lu(e, t, n, r, i) {
	for (let a = 0; a <= r.length; a++) {
		let o = a ? r[a - 1].to : t, s = a < r.length ? r[a].from : n, c = a ? 256 : i;
		for (let t = o, n = c, r = c; t < s; t++) {
			let i = Nu(e.charCodeAt(t));
			i == 512 ? i = n : i == 8 && r == 4 && (i = 16), V[t] = i == 4 ? 2 : i, i & 7 && (r = i), n = i;
		}
		for (let e = o, t = c, r = c; e < s; e++) {
			let i = V[e];
			if (i == 128) e < s - 1 && t == V[e + 1] && t & 24 ? i = V[e] = t : V[e] = 256;
			else if (i == 64) {
				let i = e + 1;
				for (; i < s && V[i] == 64;) i++;
				let a = e && t == 8 || i < n && V[i] == 8 ? r == 1 ? 1 : 8 : 256;
				for (let t = e; t < i; t++) V[t] = a;
				e = i - 1;
			} else i == 8 && r == 1 && (V[e] = 1);
			t = i, i & 7 && (r = i);
		}
	}
}
function Ru(e, t, n, r, i) {
	let a = i == 1 ? 2 : 1;
	for (let o = 0, s = 0, c = 0; o <= r.length; o++) {
		let l = o ? r[o - 1].to : t, u = o < r.length ? r[o].from : n;
		for (let t = l, n, r, o; t < u; t++) if (r = ju[n = e.charCodeAt(t)]) {
			if (r < 0) {
				for (let e = s - 3; e >= 0; e -= 3) if (Mu[e + 1] == -r) {
					let n = Mu[e + 2], r = n & 2 ? i : n & 4 ? n & 1 ? a : i : 0;
					r && (V[t] = V[Mu[e]] = r), s = e;
					break;
				}
			} else if (Mu.length == 189) break;
			else Mu[s++] = t, Mu[s++] = n, Mu[s++] = c;
		} else if ((o = V[t]) == 2 || o == 1) {
			let e = o == i;
			c = +!e;
			for (let t = s - 3; t >= 0; t -= 3) {
				let n = Mu[t + 2];
				if (n & 2) break;
				if (e) Mu[t + 2] |= 2;
				else {
					if (n & 4) break;
					Mu[t + 2] |= 4;
				}
			}
		}
	}
}
function zu(e, t, n, r) {
	for (let i = 0, a = r; i <= n.length; i++) {
		let o = i ? n[i - 1].to : e, s = i < n.length ? n[i].from : t;
		for (let c = o; c < s;) {
			let o = V[c];
			if (o == 256) {
				let o = c + 1;
				for (;;) if (o == s) {
					if (i == n.length) break;
					o = n[i++].to, s = i < n.length ? n[i].from : t;
				} else if (V[o] == 256) o++;
				else break;
				let l = a == 1, u = l == ((o < t ? V[o] : r) == 1) ? l ? 1 : 2 : r;
				for (let t = o, r = i, a = r ? n[r - 1].to : e; t > c;) t == a && (t = n[--r].from, a = r ? n[r - 1].to : e), V[--t] = u;
				c = o;
			} else a = o, c++;
		}
	}
}
function Bu(e, t, n, r, i, a, o) {
	let s = r % 2 ? 2 : 1;
	if (r % 2 == i % 2) for (let c = t, l = 0; c < n;) {
		let t = !0, u = !1;
		if (l == a.length || c < a[l].from) {
			let e = V[c];
			e != s && (t = !1, u = e == 16);
		}
		let d = !t && s == 1 ? [] : null, f = t ? r : r + 1, p = c;
		run: for (;;) if (l < a.length && p == a[l].from) {
			if (u) break run;
			let m = a[l];
			if (!t) for (let e = m.to, t = l + 1;;) {
				if (e == n) break run;
				if (t < a.length && a[t].from == e) e = a[t++].to;
				else if (V[e] == s) break run;
				else break;
			}
			l++, d ? d.push(m) : (m.from > c && o.push(new Fu(c, m.from, f)), Vu(e, m.direction == Eu == !(f % 2) ? r : r + 1, i, m.inner, m.from, m.to, o), c = m.to), p = m.to;
		} else if (p == n || (t ? V[p] != s : V[p] == s)) break;
		else p++;
		d ? Bu(e, c, p, r + 1, i, d, o) : c < p && o.push(new Fu(c, p, f)), c = p;
	}
	else for (let c = n, l = a.length; c > t;) {
		let n = !0, u = !1;
		if (!l || c > a[l - 1].to) {
			let e = V[c - 1];
			e != s && (n = !1, u = e == 16);
		}
		let d = !n && s == 1 ? [] : null, f = n ? r : r + 1, p = c;
		run: for (;;) if (l && p == a[l - 1].to) {
			if (u) break run;
			let m = a[--l];
			if (!n) for (let e = m.from, n = l;;) {
				if (e == t) break run;
				if (n && a[n - 1].to == e) e = a[--n].from;
				else if (V[e - 1] == s) break run;
				else break;
			}
			d ? d.push(m) : (m.to < c && o.push(new Fu(m.to, c, f)), Vu(e, m.direction == Eu == !(f % 2) ? r : r + 1, i, m.inner, m.from, m.to, o), c = m.from), p = m.from;
		} else if (p == t || (n ? V[p - 1] != s : V[p - 1] == s)) break;
		else p--;
		d ? Bu(e, p, c, r + 1, i, d, o) : p < c && o.push(new Fu(p, c, f)), c = p;
	}
}
function Vu(e, t, n, r, i, a, o) {
	let s = t % 2 ? 2 : 1;
	Lu(e, i, a, r, s), Ru(e, i, a, r, s), zu(i, a, r, s), Bu(e, i, a, t, n, r, o);
}
function Hu(e, t, n) {
	if (!e) return [new Fu(0, 0, +(t == Du))];
	if (t == Eu && !n.length && !Pu.test(e)) return Uu(e.length);
	if (n.length) for (; e.length > V.length;) V[V.length] = 256;
	let r = [], i = t == Eu ? 0 : 1;
	return Vu(e, i, i, n, 0, e.length, r), r;
}
function Uu(e) {
	return [new Fu(0, e, 0)];
}
var Wu = "";
function Gu(e, t, n, r, i) {
	if (!e.length) return null;
	let a = r.head - e.from, o;
	if (r.head == e.from && r.assoc < 0) {
		if (!i) return null;
		a = t[o = 0].side(!1, n);
	} else if (r.head == e.to && r.assoc > 0) {
		if (i) return null;
		a = t[o = t.length - 1].side(!0, n);
	} else o = Fu.find(t, a, r.bidiLevel ?? -1, r.assoc);
	let s = t[o], c = s.side(i, n);
	if (a == c) {
		let e = o += i ? 1 : -1;
		if (e < 0 || e >= t.length) return null;
		s = t[o = e], a = s.side(!i, n), c = s.side(i, n);
	}
	let l = Fs(e.text, a, s.forward(i, n));
	(l < s.from || l > s.to) && (l = c), Wu = e.text.slice(Math.min(a, l), Math.max(a, l));
	let u = o == (i ? t.length - 1 : 0) ? null : t[o + (i ? 1 : -1)];
	if (l == c) {
		if (!u) return i ? R.cursor(e.to, 1) : R.cursor(e.from, -1);
		if (u.level + +!i < s.level) return R.cursor(u.side(!i, n) + e.from, u.forward(i, n) ? 1 : -1, u.level);
	}
	return R.cursor(l + e.from, s.forward(i, n) ? -1 : 1, s.level);
}
function Ku(e, t, n) {
	for (let r = t; r < n; r++) {
		let t = Nu(e.charCodeAt(r));
		if (t == 1) return Eu;
		if (t == 2 || t == 4) return Du;
	}
	return Eu;
}
var qu = /*@__PURE__*/ z.define(), Ju = /*@__PURE__*/ z.define(), Yu = /*@__PURE__*/ z.define(), Xu = /*@__PURE__*/ z.define(), Zu = /*@__PURE__*/ z.define(), Qu = /*@__PURE__*/ z.define(), $u = /*@__PURE__*/ z.define(), ed = /*@__PURE__*/ z.define(), td = /*@__PURE__*/ z.define(), nd = /*@__PURE__*/ z.define({ combine: (e) => e.some((e) => e) }), rd = /*@__PURE__*/ z.define({ combine: (e) => e.some((e) => e) }), id = /*@__PURE__*/ z.define(), ad = class e {
	constructor(e, t, n, r, i, a = !1) {
		this.range = e, this.y = t, this.x = n, this.yMargin = r, this.xMargin = i, this.isSnapshot = a;
	}
	map(t) {
		return t.empty ? this : new e(this.range.map(t), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
	}
	clip(t) {
		return this.range.to <= t.doc.length ? this : new e(R.cursor(t.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
	}
}, od = /*@__PURE__*/ Ec.define({ map: (e, t) => e.map(t) }), sd = /*@__PURE__*/ Ec.define();
function cd(e, t, n) {
	let r = e.facet(Xu);
	r.length ? r[0](t) : window.onerror && window.onerror(String(t), n, void 0, void 0, t) || (n ? console.error(n + ":", t) : console.error(t));
}
var ld = /*@__PURE__*/ z.define({ combine: (e) => !e.length || e[0] }), ud = 0, dd = /*@__PURE__*/ z.define({ combine(e) {
	return e.filter((t, n) => {
		for (let r = 0; r < n; r++) if (e[r].plugin == t.plugin) return !1;
		return !0;
	});
} }), fd = class e {
	constructor(e, t, n, r, i) {
		this.id = e, this.create = t, this.domEventHandlers = n, this.domEventObservers = r, this.baseExtensions = i(this), this.extension = this.baseExtensions.concat(dd.of({
			plugin: this,
			arg: void 0
		}));
	}
	of(e) {
		return this.baseExtensions.concat(dd.of({
			plugin: this,
			arg: e
		}));
	}
	static define(t, n) {
		let { eventHandlers: r, eventObservers: i, provide: a, decorations: o } = n || {};
		return new e(ud++, t, r, i, (e) => {
			let t = [];
			return o && t.push(gd.of((t) => {
				let n = t.plugin(e);
				return n ? o(n) : Ul.none;
			})), a && t.push(a(e)), t;
		});
	}
	static fromClass(t, n) {
		return e.define((e, n) => new t(e, n), n);
	}
}, pd = class {
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
				cd(e.state, t, "CodeMirror plugin crashed"), this.deactivate();
			}
		} else if (this.mustUpdate) {
			let e = this.mustUpdate;
			if (this.mustUpdate = null, this.value.update) try {
				this.value.update(e);
			} catch (t) {
				if (cd(e.state, t, "CodeMirror plugin crashed"), this.value.destroy) try {
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
			cd(e.state, t, "CodeMirror plugin crashed");
		}
	}
	deactivate() {
		this.spec = this.value = null;
	}
}, md = /*@__PURE__*/ z.define(), hd = /*@__PURE__*/ z.define(), gd = /*@__PURE__*/ z.define(), _d = /*@__PURE__*/ z.define(), vd = /*@__PURE__*/ z.define(), yd = /*@__PURE__*/ z.define(), bd = /*@__PURE__*/ z.define();
function xd(e, t) {
	let n = e.state.facet(bd);
	if (!n.length) return n;
	let r = n.map((t) => t instanceof Function ? t(e) : t), i = [];
	return Jc.spans(r, t.from, t.to, {
		point() {},
		span(e, n, r, a) {
			let o = e - t.from, s = n - t.from, c = i;
			for (let e = r.length - 1; e >= 0; e--, a--) {
				let n = r[e].spec.bidiIsolate, i;
				if (n ??= Ku(t.text, o, s), a > 0 && c.length && (i = c[c.length - 1]).to == o && i.direction == n) i.to = s, c = i.inner;
				else {
					let e = {
						from: o,
						to: s,
						direction: n,
						inner: []
					};
					c.push(e), c = e.inner;
				}
			}
		}
	}), i;
}
var Sd = /*@__PURE__*/ z.define();
function Cd(e) {
	let t = 0, n = 0, r = 0, i = 0;
	for (let a of e.state.facet(Sd)) {
		let o = a(e);
		o && (o.left != null && (t = Math.max(t, o.left)), o.right != null && (n = Math.max(n, o.right)), o.top != null && (r = Math.max(r, o.top)), o.bottom != null && (i = Math.max(i, o.bottom)));
	}
	return {
		left: t,
		right: n,
		top: r,
		bottom: i
	};
}
var wd = /*@__PURE__*/ z.define(), Td = class e {
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
}, Ed = class e {
	constructor(e, t, n) {
		this.view = e, this.state = t, this.transactions = n, this.flags = 0, this.startState = e.state, this.changes = Us.empty(this.startState.doc.length);
		for (let e of n) this.changes = this.changes.compose(e.changes);
		let r = [];
		this.changes.iterChangedRanges((e, t, n, i) => r.push(new Td(e, t, n, i))), this.changedRanges = r;
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
}, Dd = [], Od = class {
	constructor(e, t, n = 0) {
		this.dom = e, this.length = t, this.flags = n, this.parent = null, e.cmTile = this;
	}
	get breakAfter() {
		return this.flags & 1;
	}
	get children() {
		return Dd;
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
			e && Rl(this.dom, e);
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
		let n = nu(this.dom), r = this.length ? e > 0 : t > 0;
		return new wu(this.parent.dom, n + +!!r, e == 0 || e == this.length);
	}
	markDirty(e) {
		this.flags &= -3, e && (this.flags |= 4), this.parent && this.parent.flags & 2 && this.parent.markDirty(!1);
	}
	get overrideDOMText() {
		return null;
	}
	get root() {
		for (let e = this; e; e = e.parent) if (e instanceof jd) return e;
		return null;
	}
	static get(e) {
		return e.cmTile;
	}
}, kd = class extends Od {
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
			if (o.sync(e), a += o.length + o.breakAfter, r = n ? n.nextSibling : t.firstChild, i && r != o.dom && (i.written = !0), o.dom.parentNode == t) for (; r && r != o.dom;) r = Ad(r);
			else t.insertBefore(o.dom, r);
			n = o.dom;
		}
		for (r = n ? n.nextSibling : t.firstChild, i && r && (i.written = !0); r;) r = Ad(r);
		this.length = a;
	}
};
function Ad(e) {
	let t = e.nextSibling;
	return e.parentNode.removeChild(e), t;
}
var jd = class extends kd {
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
			let t = Od.get(e);
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
			if (a instanceof Md) t.push(r), n = a, r = 0;
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
}, Md = class e extends kd {
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
}, Nd = class e extends kd {
	constructor(e, t) {
		super(e), this.attrs = t;
	}
	isLine() {
		return !0;
	}
	static start(t, n, r) {
		let i = new e(n || document.createElement("div"), t);
		return (!n || !r) && (i.flags |= 4), i;
	}
	get domAttrs() {
		return this.attrs;
	}
	resolveInline(e, t, n) {
		let r = null, i = -1, a = null, o = -1;
		function s(e, c) {
			for (let l = 0, u = 0; l < e.children.length && u <= c; l++) {
				let d = e.children[l], f = u + d.length;
				f >= c && (d.isComposite() ? s(d, c - u) : (!a || a.isHidden && (t > 0 && !(a.flags & 32) || n && Fd(a, d))) && (f > c || d.flags & 32 && t <= 1) ? (a = d, o = c - u) : (u < c || d.flags & 16 && !d.isHidden && t >= -1) && (r = d, i = c - u)), u = f;
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
		return r ? r.tile.coordsIn(Math.max(0, r.offset), t, n) : Pd(this);
	}
	domIn(e, t) {
		let n = this.resolveInline(e, t);
		if (n) {
			let { tile: e, offset: r } = n;
			if (this.dom.contains(e.dom)) return e.isText() ? new wu(e.dom, Math.min(e.dom.nodeValue.length, r)) : e.domPosFor(r, e.flags & 16 ? 1 : e.flags & 32 ? -1 : t);
			let i = n.tile.parent, a = !1;
			for (let e of i.children) {
				if (a) return new wu(e.dom, 0);
				e == n.tile && (a = !0);
			}
		}
		return new wu(this.dom, 0);
	}
};
function Pd(e) {
	let t = e.dom.lastChild;
	if (!t) return e.dom.getBoundingClientRect();
	let n = eu(t);
	return n[n.length - 1] || null;
}
function Fd(e, t) {
	let n = e.coordsIn(0, 1), r = t.coordsIn(0, 1);
	return n && r && r.top < n.bottom;
}
var Id = class e extends kd {
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
}, Ld = class e extends Od {
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
		e == 0 && t < 0 || e == r && t >= 0 ? B.chrome || B.gecko || (e ? (i--, o = 1) : a < r && (a++, o = -1)) : t < 0 ? i-- : a < r && a++;
		let s = _u(this.dom, i, a).getClientRects();
		if (!s.length) return null;
		let c = s[(o ? o < 0 : t >= 0) ? 0 : s.length - 1];
		return B.safari && !o && c.width == 0 && (c = Array.prototype.find.call(s, (e) => e.width) || c), n == null ? c : ou(c, (o ? o > 0 : t < 0) == n);
	}
	static of(t, n) {
		let r = new e(n || document.createTextNode(t), t);
		return n || (r.flags |= 2), r;
	}
}, Rd = class e extends Od {
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
		if (n) return ou(this.dom.getBoundingClientRect(), this.length ? e == 0 : t <= 0);
		{
			let t = this.dom.getClientRects(), n = null;
			if (!t.length) return null;
			let r = this.flags & 16 ? !0 : this.flags & 32 ? !1 : e > 0;
			for (let i = r ? t.length - 1 : 0; n = t[i], !(e > 0 ? i == 0 : i == t.length - 1 || n.top < n.bottom); i += r ? -1 : 1);
			return ou(n, !r);
		}
	}
	get overrideDOMText() {
		if (!this.length) return L.empty;
		let { root: e } = this;
		if (!e) return L.empty;
		let t = this.posAtStart;
		return e.view.state.doc.slice(t, t + this.length);
	}
	destroy() {
		super.destroy(), this.widget.destroy(this.dom);
	}
	static of(t, n, r, i, a) {
		return a || (a = t.toDOM(n), t.editable || (a.contentEditable = "false")), new e(a, r, t, i);
	}
}, zd = class extends Od {
	constructor(e) {
		let t = document.createElement("img");
		t.className = "cm-widgetBuffer", t.setAttribute("aria-hidden", "true"), super(t, 0, e);
	}
	get isHidden() {
		return !0;
	}
	get overrideDOMText() {
		return L.empty;
	}
	coordsIn(e, t, n) {
		let r = this.dom.getBoundingClientRect();
		return n == null ? r : ou(r, t > 0 == n);
	}
}, Bd = class {
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
}, Vd = class {
	constructor(e, t, n, r) {
		this.from = e, this.to = t, this.wrapper = n, this.rank = r;
	}
}, Hd = class {
	constructor(e, t, n) {
		this.cache = e, this.root = t, this.blockWrappers = n, this.curLine = null, this.lastBlock = null, this.afterWidget = null, this.pos = 0, this.wrappers = [], this.wrapperPos = 0;
	}
	addText(e, t, n, r) {
		this.flushBuffer();
		let i = this.ensureMarks(t, n), a = i.lastChild;
		if (a && a.isText() && !(a.flags & 8) && a.length + e.length < 512) {
			this.cache.reused.set(a, 2);
			let t = i.children[i.children.length - 1] = new Ld(a.dom, a.text + e);
			t.parent = i;
		} else i.append(r || Ld.of(e, this.cache.find(Ld)?.dom));
		this.pos += e.length, this.afterWidget = null;
	}
	addComposition(e, t) {
		let n = this.curLine;
		n.dom != t.line.dom && (n.setDOM(this.cache.reused.has(t.line) ? Qd(t.line.dom) : t.line.dom), this.cache.reused.set(t.line, 2));
		let r = n;
		for (let e = t.marks.length - 1; e >= 0; e--) {
			let n = t.marks[e], i = r.lastChild;
			if (i instanceof Id && i.mark.eq(n.mark)) i.dom != n.dom && i.setDOM(Qd(n.dom)), r = i;
			else {
				let { dom: e } = n;
				this.cache.reused.get(n) && Od.get(n.dom) && (e = Qd(n.dom));
				let t = Id.of(n.mark, e);
				r.append(t), r = t;
			}
			this.cache.reused.set(n, 2);
		}
		let i = Od.get(e.text);
		i && this.cache.reused.set(i, 2);
		let a = new Ld(e.text, e.text.nodeValue);
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
		e ||= Yd;
		let n = Nd.start(e, t || this.cache.find(Nd)?.dom, !!t);
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
			if (t > 0 && (a = n.lastChild) && a instanceof Id && a.mark.eq(i)) n = a, t--;
			else {
				let e = Id.of(i, this.cache.find(Id, (e) => e.mark.eq(i))?.dom);
				n.append(e), n = e, t = 0;
			}
		}
		return n;
	}
	endLine() {
		if (this.curLine) {
			this.flushBuffer();
			let e = this.curLine.lastChild;
			(!e || !qd(this.curLine, !1) || e.dom.nodeName != "BR" && e.isWidget() && !(B.ios && qd(this.curLine, !0))) && this.curLine.append(this.cache.findWidget(ef, 0, 32) || new Rd(ef.toDOM(), 0, ef, 32)), this.curLine = this.afterWidget = null;
		}
	}
	updateBlockWrappers() {
		this.wrapperPos > this.pos + 1e4 && (this.blockWrappers.goto(this.pos), this.wrappers.length = 0);
		for (let e = this.wrappers.length - 1; e >= 0; e--) this.wrappers[e].to < this.pos && this.wrappers.splice(e, 1);
		for (let e = this.blockWrappers; e.value && e.from <= this.pos; e.next()) if (e.to >= this.pos) {
			let t = e.rank * 102 + e.value.rank, n = new Vd(e.from, e.to, e.value, t), r = this.wrappers.length;
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
			if (t.from < this.pos && n instanceof Md && n.wrapper.eq(t.wrapper)) e = n;
			else {
				let n = Md.of(t.wrapper, this.cache.find(Md, (e) => e.wrapper.eq(t.wrapper))?.dom);
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
		let t = 2 | (e < 0 ? 16 : 32), n = this.cache.find(zd, void 0, 1);
		return n && (n.flags = t), n || new zd(t);
	}
	flushBuffer() {
		this.afterWidget && !(this.afterWidget.flags & 32) && (this.afterWidget.parent.append(this.getBuffer(-1)), this.afterWidget = null);
	}
}, Ud = class {
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
}, Wd = [
	Rd,
	Nd,
	Ld,
	Id,
	zd,
	Md,
	jd
];
for (let e = 0; e < Wd.length; e++) Wd[e].bucket = e;
var Gd = class {
	constructor(e) {
		this.view = e, this.buckets = Wd.map(() => []), this.index = Wd.map(() => 0), this.reused = /* @__PURE__ */ new Map();
	}
	add(e) {
		let t = e.constructor.bucket, n = this.buckets[t];
		n.length < 6 ? n.push(e) : n[this.index[t] = (this.index[t] + 1) % 6] = e;
	}
	find(e, t, n = 2) {
		let r = e.bucket, i = this.buckets[r], a = this.index[r];
		for (let e = 0; e < i.length; e++) {
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
			if (!this.reused.has(o) && (a == 0 ? o.widget.compare(e) : o.widget.constructor == e.constructor && e.updateDOM(o.dom, this.view, o.widget))) return r.splice(i, 1), i < this.index[0] && this.index[0]--, o.widget == e && o.length == t && (o.flags & 497) == n ? (this.reused.set(o, 1), o) : (this.reused.set(o, 2), new Rd(o.dom, t, e, o.flags & -498 | n));
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
}, Kd = class {
	constructor(e, t, n, r, i) {
		this.view = e, this.decorations = r, this.disallowBlockEffectsFor = i, this.openWidget = !1, this.openMarks = 0, this.cache = new Gd(e), this.text = new Ud(e.state.doc), this.builder = new Hd(this.cache, new jd(e, e.contentDOM), Jc.iter(n)), this.cache.reused.set(t, 2), this.old = new Bd(t), this.reuseWalker = {
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
				this.preserve(e, !a, !o), r = s, i += e;
			}
			if (!o) break;
			t && o.fromA <= t.range.fromA && o.toA >= t.range.toA ? (this.forward(o.fromA, t.range.fromA, t.range.fromA < t.range.toA ? 1 : -1), this.emit(i, t.range.fromB), this.builder.flushBuffer(), this.cache.clear(), this.builder.addComposition(t, n), this.text.skip(t.range.toB - t.range.fromB), this.forward(t.range.fromA, o.toA), this.emit(t.range.toB, o.toB)) : (this.forward(o.fromA, o.toA), this.emit(i, o.toB)), i = o.toB, r = o.toA;
		}
		return this.builder.curLine && this.builder.endLine(), this.builder.root;
	}
	preserve(e, t, n) {
		let r = Zd(this.old), i = this.openMarks;
		this.old.advance(e, n ? 1 : -1, {
			skip: (e, t, n) => {
				if (e.isWidget()) {
					if (this.openWidget) this.builder.continueWidget(n - t);
					else {
						let a = n > 0 || t < e.length ? Rd.of(e.widget, this.view, n - t, e.flags & 496, this.cache.maybeReuse(e)) : this.cache.reuse(e);
						a.flags & 256 ? (a.flags &= -2, this.builder.addBlockWidget(a)) : (this.builder.ensureLine(null), this.builder.addInlineWidget(a, r, i), i = r.length);
					}
				} else if (e.isText()) this.builder.ensureLine(null), !t && n == e.length && !this.cache.reused.has(e) ? this.builder.addText(e.text, r, i, this.cache.reuse(e)) : (this.cache.add(e), this.builder.addText(e.text.slice(t, n), r, i)), i = r.length;
				else if (e.isLine()) e.flags &= -2, this.cache.reused.set(e, 1), this.builder.addLine(e);
				else if (e instanceof zd) this.cache.add(e);
				else if (e instanceof Id) this.builder.ensureLine(null), this.builder.addMark(e, r, i), this.cache.reused.set(e, 1), i = r.length;
				else return !1;
				this.openWidget = !1;
			},
			enter: (e) => {
				e.isLine() ? this.builder.addLineStart(e.attrs, this.cache.maybeReuse(e)) : (this.cache.add(e), e instanceof Id && r.unshift(e.mark)), this.openWidget = !1;
			},
			leave: (e) => {
				e.isLine() ? r.length &&= i = 0 : e instanceof Id && (r.shift(), i = Math.min(i, r.length));
			},
			break: () => {
				this.builder.addBreak(), this.openWidget = !1;
			}
		}), this.text.skip(e);
	}
	emit(e, t) {
		let n = null, r = this.builder, i = -1, a = Jc.spans(this.decorations, e, t, {
			point: (e, t, a, o, s, c) => {
				if (a instanceof Kl) {
					if (this.disallowBlockEffectsFor[c]) {
						if (a.block) throw RangeError("Block decorations may not be specified via plugins");
						if (t > this.view.state.doc.lineAt(e).to) throw RangeError("Decorations that replace line breaks may not be specified via plugins");
					}
					if (i = o.length, s > o.length) r.continueWidget(t - e);
					else {
						let i = a.widget || (a.block ? $d.block : $d.inline), c = Jd(a), l = this.cache.findWidget(i, t - e, c) || Rd.of(i, this.view, t - e, c);
						a.block ? (a.startSide > 0 && r.addLineStartIfNotCovered(n), r.addBlockWidget(l)) : (r.ensureLine(n), r.addInlineWidget(l, o, s));
					}
					n = null;
				} else n = Xd(n, a);
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
			let e = Od.get(r);
			if (r == this.view.contentDOM) break;
			e instanceof Id ? t.push(e) : e?.isLine() ? n = e : e instanceof Md || (r.nodeName == "DIV" && !n ? n = new Nd(r, Yd) : n || t.push(Id.of(new Wl({
				tagName: r.nodeName.toLowerCase(),
				attributes: Bl(r)
			}), r)));
		}
		return n ? {
			line: n,
			marks: t
		} : null;
	}
};
function qd(e, t) {
	let n = (e) => {
		for (let r of e.children) if ((t ? r.isText() : r.length) || n(r)) return !0;
		return !1;
	};
	return n(e);
}
function Jd(e) {
	let t = e.isReplace ? (e.startSide < 0 ? 64 : 0) | (e.endSide > 0 ? 128 : 0) : e.startSide > 0 ? 32 : 16;
	return e.block && (t |= 256), t;
}
var Yd = { class: "cm-line" };
function Xd(e, t) {
	let n = t.spec.attributes, r = t.spec.class;
	return !n && !r ? e : (e ||= { class: "cm-line" }, n && Fl(n, e), r && (e.class += " " + r), e);
}
function Zd(e) {
	let t = [];
	for (let n = e.parents.length; n > 1; n--) {
		let r = n == e.parents.length ? e.tile : e.parents[n].tile;
		r instanceof Id && t.push(r.mark);
	}
	return t;
}
function Qd(e) {
	let t = Od.get(e);
	return t && t.setDOM(e.cloneNode()), e;
}
var $d = class extends Vl {
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
$d.inline = /*@__PURE__*/ new $d("span"), $d.block = /*@__PURE__*/ new $d("div");
var ef = /*@__PURE__*/ new class extends Vl {
	toDOM() {
		return document.createElement("br");
	}
	get isHidden() {
		return !0;
	}
	get editable() {
		return !0;
	}
}(), tf = class {
	constructor(e) {
		this.view = e, this.decorations = [], this.blockWrappers = [], this.dynamicDecorationMap = [!1], this.domChanged = null, this.hasComposition = null, this.editContextFormatting = Ul.none, this.lastCompositionAfterCursor = !1, this.minWidth = 0, this.minWidthFrom = 0, this.minWidthTo = 0, this.impreciseAnchor = null, this.impreciseHead = null, this.forceSelection = !1, this.lastUpdate = Date.now(), this.updateDeco(), this.tile = new jd(e, e.contentDOM), this.updateInner([new Td(0, 0, 0, e.state.doc.length)], null);
	}
	update(e) {
		let t = e.changedRanges;
		this.minWidth > 0 && t.length && (t.every(({ fromA: e, toA: t }) => t < this.minWidthFrom || e > this.minWidthTo) ? (this.minWidthFrom = e.changes.mapPos(this.minWidthFrom, 1), this.minWidthTo = e.changes.mapPos(this.minWidthTo, 1)) : this.minWidth = this.minWidthFrom = this.minWidthTo = 0), this.updateEditContextFormatting(e);
		let n = -1;
		this.view.inputState.composing >= 0 && !this.view.observer.editContext && (this.domChanged?.newSel ? n = this.domChanged.newSel.head : !pf(e.changes, this.hasComposition) && !e.selectionSet && (n = e.state.selection.main.head));
		let r = n > -1 ? of(this.view, e.changes, n) : null;
		if (this.domChanged = null, this.hasComposition) {
			let { from: n, to: r } = this.hasComposition;
			t = new Td(n, r, e.changes.mapPos(n, -1), e.changes.mapPos(r, 1)).addToSet(t.slice());
		}
		this.hasComposition = r ? {
			from: r.range.fromB,
			to: r.range.toB
		} : null, (B.ie || B.chrome) && !r && e && e.state.doc.lines != e.startState.doc.lines && (this.forceSelection = !0);
		let i = this.decorations, a = this.blockWrappers;
		this.updateDeco();
		let o = lf(i, this.decorations, e.changes);
		o.length && (t = Td.extendWithRanges(t, o));
		let s = df(a, this.blockWrappers, e.changes);
		return s.length && (t = Td.extendWithRanges(t, s)), r && !t.some((e) => e.fromA <= r.range.fromA && e.toA >= r.range.toA) && (t = r.range.addToSet(t.slice())), this.tile.flags & 2 && t.length == 0 ? !1 : (this.updateInner(t, r), e.transactions.length && (this.lastUpdate = Date.now()), !0);
	}
	updateInner(e, t) {
		this.view.viewState.mustMeasureContent = !0;
		let { observer: n } = this.view;
		n.ignore(() => {
			if (t || e.length) {
				let n = this.tile, r = new Kd(this.view, n, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
				t && Od.get(t.text) && r.cache.reused.set(Od.get(t.text), 2), this.tile = r.run(e, t), nf(n, r.cache.reused);
			}
			this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px", this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
			let r = B.chrome || B.ios ? {
				node: n.selectionRange.focusNode,
				written: !1
			} : void 0;
			this.tile.sync(r), r && (r.written || n.selectionRange.focusNode != r.node || !this.tile.dom.contains(r.node)) && (this.forceSelection = !0), this.tile.dom.style.height = "";
		});
		let r = [];
		if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length) for (let e of this.tile.children) e.isWidget() && e.widget instanceof mf && r.push(e.dom);
		n.updateGaps(r);
	}
	updateEditContextFormatting(e) {
		this.editContextFormatting = this.editContextFormatting.map(e.changes);
		for (let t of e.transactions) for (let e of t.effects) e.is(sd) && (this.editContextFormatting = e.value);
	}
	updateSelection(e = !1, t = !1) {
		(e || !this.view.observer.selectionRange.focusNode) && this.view.observer.readSelectionRange();
		let { dom: n } = this.tile, r = this.view.root.activeElement, i = r == n, a = !i && !(this.view.state.facet(ld) || n.tabIndex > -1) && $l(n, this.view.observer.selectionRange) && !(r && n.contains(r));
		if (!(i || t || a)) return;
		let o = this.forceSelection;
		this.forceSelection = !1;
		let s = this.view.state.selection.main, c, l;
		if (s.empty ? l = c = this.inlineDOMNearPos(s.anchor, s.assoc || 1) : (l = this.inlineDOMNearPos(s.head, s.head == s.from ? 1 : -1), c = this.inlineDOMNearPos(s.anchor, s.anchor == s.from ? 1 : -1)), B.gecko && s.empty && !this.hasComposition && rf(c)) {
			let e = document.createTextNode("");
			this.view.observer.ignore(() => c.node.insertBefore(e, c.node.childNodes[c.offset] || null)), c = l = new wu(e, 0), o = !0;
		}
		let u = this.view.observer.selectionRange;
		(o || !u.focusNode || (!tu(c.node, c.offset, u.anchorNode, u.anchorOffset) || !tu(l.node, l.offset, u.focusNode, u.focusOffset)) && !this.suppressWidgetCursorChange(u, s)) && (this.view.observer.ignore(() => {
			B.android && B.chrome && n.contains(u.focusNode) && ff(u.focusNode, n) && (n.blur(), n.focus({ preventScroll: !0 }));
			let e = Zl(this.view.root);
			if (e) {
				if (s.empty) {
					if (B.gecko) {
						let e = sf(c.node, c.offset);
						if (e && e != 3) {
							let t = (e == 1 ? Su : Cu)(c.node, c.offset);
							t && (c = new wu(t.node, t.offset));
						}
					}
					e.collapse(c.node, c.offset), s.bidiLevel != null && e.caretBidiLevel !== void 0 && (e.caretBidiLevel = s.bidiLevel);
				} else if (e.extend) {
					e.collapse(c.node, c.offset);
					try {
						e.extend(l.node, l.offset);
					} catch {}
				} else {
					let t = document.createRange();
					s.anchor > s.head && ([c, l] = [l, c]), t.setEnd(l.node, l.offset), t.setStart(c.node, c.offset), e.removeAllRanges(), e.addRange(t);
				}
			}
			a && this.view.root.activeElement == n && (n.blur(), r && r.focus());
		}), this.view.observer.setSelectionRange(c, l)), this.impreciseAnchor = c.precise ? null : new wu(u.anchorNode, u.anchorOffset), this.impreciseHead = l.precise ? null : new wu(u.focusNode, u.focusOffset);
	}
	suppressWidgetCursorChange(e, t) {
		return this.hasComposition && t.empty && tu(e.focusNode, e.focusOffset, e.anchorNode, e.anchorOffset) && this.posFromDOM(e.focusNode, e.focusOffset) == t.head;
	}
	enforceCursorAssoc() {
		if (this.hasComposition) return;
		let { view: e } = this, t = e.state.selection.main, n = Zl(e.root), { anchorNode: r, anchorOffset: i } = e.observer.selectionRange;
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
				let r = au(e) == 0 ? 0 : t == 0 ? -1 : 1;
				for (;;) {
					let t = e.parentNode;
					if (t == n.dom) break;
					r == 0 && t.firstChild != t.lastChild && (r = e == t.firstChild ? -1 : 1), e = t;
				}
				i = r < 0 ? e : e.nextSibling;
			}
			if (i == n.dom.firstChild) return r;
			for (; i && !Od.get(i);) i = i.nextSibling;
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
		return r.isWidget() ? r.widget instanceof mf ? null : r.coordsInWidget(i, t, !0) : r.coordsIn(i, t, n);
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
				let n = Fs(e.text, t);
				if (n == t) return null;
				let r = _u(e.dom, t, n).getClientRects();
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
		let t = [], { from: n, to: r } = e, i = this.view.contentDOM.clientWidth, a = i > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1, o = -1, s = this.view.textDirection == Tu.LTR, c = 0, l = (e, u, d) => {
			for (let f = 0; f < e.children.length && !(u > r); f++) {
				let r = e.children[f], p = u + r.length, m = r.dom.getBoundingClientRect(), { height: h } = m;
				if (d && !f && (c += m.top - d.top), r instanceof Md) p > n && l(r, u, m);
				else if (u >= n && (c > 0 && t.push(-c), t.push(h + c), c = 0, a)) {
					let e = r.dom.lastChild, t = e ? eu(e) : [];
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
		return getComputedStyle(t.dom).direction == "rtl" ? Tu.RTL : Tu.LTR;
	}
	measureTextSize() {
		let e = this.tile.blockTiles((e) => {
			if (e.isLine() && e.children.length && e.length <= 20) {
				let t = 0, n;
				for (let r of e.children) {
					if (!r.isText() || /[^ -~]/.test(r.text)) return;
					let e = eu(r.dom);
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
			let e = eu(t.firstChild)[0];
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
				e.push(Ul.replace({
					widget: new mf(r),
					block: !0,
					inclusive: !0,
					isBlockGap: !0
				}).range(n, a));
			}
			if (!i) break;
			n = i.to + 1;
		}
		return Ul.set(e);
	}
	updateDeco() {
		let e = 1, t = this.view.state.facet(gd).map((t) => (this.dynamicDecorationMap[e++] = typeof t == "function") ? t(this.view) : t), n = !1, r = this.view.state.facet(vd).map((e, t) => {
			let r = typeof e == "function";
			return r && (n = !0), r ? e(this.view) : e;
		});
		for (r.length && (this.dynamicDecorationMap[e++] = n, t.push(Jc.join(r))), this.decorations = [
			this.editContextFormatting,
			...t,
			this.computeBlockGapDeco(),
			this.view.viewState.lineGapDeco
		]; e < this.decorations.length;) this.dynamicDecorationMap[e++] = !1;
		this.blockWrappers = this.view.state.facet(_d).map((e) => typeof e == "function" ? e(this.view) : e);
	}
	scrollIntoView(e) {
		if (e.isSnapshot) {
			let t = this.view.viewState.lineBlockAt(e.range.head);
			this.view.scrollDOM.scrollTop = t.top - e.yMargin, this.view.scrollDOM.scrollLeft = e.xMargin;
			return;
		}
		for (let t of this.view.state.facet(id)) try {
			if (t(this.view, e.range, e)) return !0;
		} catch (e) {
			cd(this.view.state, e, "scroll handler");
		}
		let { range: t } = e, n = this.coordsAt(t.head, t.assoc || (t.head > t.anchor ? -1 : 1)), r;
		if (!n) return;
		!t.empty && (r = this.coordsAt(t.anchor, t.anchor > t.head ? -1 : 1)) && (n = {
			left: Math.min(n.left, r.left),
			top: Math.min(n.top, r.top),
			right: Math.max(n.right, r.right),
			bottom: Math.max(n.bottom, r.bottom)
		});
		let i = Cd(this.view), a = {
			left: n.left - i.left,
			top: n.top - i.top,
			right: n.right + i.right,
			bottom: n.bottom + i.bottom
		}, { offsetWidth: o, offsetHeight: s } = this.view.scrollDOM;
		if (lu(this.view.scrollDOM, a, t.head < t.anchor ? -1 : 1, e.x, e.y, Math.max(Math.min(e.xMargin, o), -o), Math.max(Math.min(e.yMargin, s), -s), this.view.textDirection == Tu.LTR), window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (n.top > window.visualViewport.offsetTop + window.visualViewport.height || n.bottom < window.visualViewport.offsetTop)) {
			let e = this.view.docView.lineAt(t.head, 1);
			if (e) {
				let t = fu(e.dom);
				e.dom.scrollIntoView({ block: "nearest" }), pu(t, !1);
			}
		}
	}
	lineHasWidget(e) {
		let t = (e) => e.isWidget() || e.children.some(t);
		return t(this.tile.resolveBlock(e, 1).tile);
	}
	destroy() {
		nf(this.tile);
	}
};
function nf(e, t) {
	let n = t?.get(e);
	if (n != 1) {
		n ?? e.destroy();
		for (let n of e.children) nf(n, t);
	}
}
function rf(e) {
	return e.node.nodeType == 1 && e.node.firstChild && (e.offset == 0 || e.node.childNodes[e.offset - 1].contentEditable == "false") && (e.offset == e.node.childNodes.length || e.node.childNodes[e.offset].contentEditable == "false");
}
function af(e, t) {
	let n = e.observer.selectionRange;
	if (!n.focusNode) return null;
	let r = Su(n.focusNode, n.focusOffset), i = Cu(n.focusNode, n.focusOffset), a = r || i;
	if (i && r && i.node != r.node) {
		let t = Od.get(i.node);
		if (!t || t.isText() && t.text != i.node.nodeValue) a = i;
		else if (e.docView.lastCompositionAfterCursor) {
			let e = Od.get(r.node);
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
function of(e, t, n) {
	let r = af(e, n);
	if (!r) return null;
	let { node: i, from: a, to: o } = r, s = i.nodeValue;
	if (/[\n\r]/.test(s) || e.state.doc.sliceString(r.from, r.to) != s) return null;
	let c = t.invertedDesc;
	return {
		range: new Td(c.mapPos(a), c.mapPos(o), a, o),
		text: i
	};
}
function sf(e, t) {
	return e.nodeType == 1 ? (t && e.childNodes[t - 1].contentEditable == "false" ? 1 : 0) | (t < e.childNodes.length && e.childNodes[t].contentEditable == "false" ? 2 : 0) : 0;
}
var cf = class {
	constructor() {
		this.changes = [];
	}
	compareRange(e, t) {
		Yl(e, t, this.changes);
	}
	comparePoint(e, t) {
		Yl(e, t, this.changes);
	}
	boundChange(e) {
		Yl(e, e, this.changes);
	}
};
function lf(e, t, n) {
	let r = new cf();
	return Jc.compare(e, t, n, r), r.changes;
}
var uf = class {
	constructor() {
		this.changes = [];
	}
	compareRange(e, t) {
		Yl(e, t, this.changes);
	}
	comparePoint() {}
	boundChange(e) {
		Yl(e, e, this.changes);
	}
};
function df(e, t, n) {
	let r = new uf();
	return Jc.compare(e, t, n, r), r.changes;
}
function ff(e, t) {
	for (let n = e; n && n != t; n = n.assignedSlot || n.parentNode) if (n.nodeType == 1 && n.contentEditable == "false") return !0;
	return !1;
}
function pf(e, t) {
	let n = !1;
	return t && e.iterChangedRanges((e, r) => {
		e < t.to && r > t.from && (n = !0);
	}), n;
}
var mf = class extends Vl {
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
function hf(e, t, n = 1) {
	let r = e.charCategorizer(t), i = e.doc.lineAt(t), a = t - i.from;
	if (i.length == 0) return R.cursor(t);
	a == 0 ? n = 1 : a == i.length && (n = -1);
	let o = a, s = a;
	n < 0 ? o = Fs(i.text, a, !1) : s = Fs(i.text, a);
	let c = r(i.text.slice(o, s));
	for (; o > 0;) {
		let e = Fs(i.text, o, !1);
		if (r(i.text.slice(e, o)) != c) break;
		o = e;
	}
	for (; s < i.length;) {
		let e = Fs(i.text, s);
		if (r(i.text.slice(s, e)) != c) break;
		s = e;
	}
	return R.undirectionalRange(o + i.from, s + i.from);
}
function gf(e, t, n, r, i) {
	let a = Math.round((r - t.left) * e.defaultCharacterWidth);
	if (e.lineWrapping && n.height > e.defaultLineHeight * 1.5) {
		let t = e.viewState.heightOracle.textHeight, r = Math.floor((i - n.top - (e.defaultLineHeight - t) * .5) / t);
		a += r * e.viewState.heightOracle.lineLength;
	}
	let o = e.state.sliceDoc(n.from, n.to);
	return n.from + ll(o, a, e.state.tabSize);
}
function _f(e, t, n) {
	let r = e.lineBlockAt(t);
	if (Array.isArray(r.type)) {
		let e;
		for (let i of r.type) {
			if (i.from > t) break;
			if (!(i.to < t)) {
				if (i.from < t && i.to > t) return i;
				(!e || i.type == Hl.Text && (e.type != i.type || (n < 0 ? i.from < t : i.to > t))) && (e = i);
			}
		}
		return e || r;
	}
	return r;
}
function vf(e, t, n, r) {
	let i = _f(e, t.head, t.assoc || -1), a = !r || i.type != Hl.Text || !(e.lineWrapping || i.widgetLineBreaks) ? null : e.coordsAtPos(t.assoc < 0 && t.head > i.from ? t.head - 1 : t.head);
	if (a) {
		let t = e.dom.getBoundingClientRect(), r = e.textDirectionAt(i.from), o = e.posAtCoords({
			x: n == (r == Tu.LTR) ? t.right - 1 : t.left + 1,
			y: (a.top + a.bottom) / 2
		});
		if (o != null) return R.cursor(o, n ? -1 : 1);
	}
	return R.cursor(n ? i.to : i.from, n ? -1 : 1);
}
function yf(e, t, n, r) {
	let i = e.state.doc.lineAt(t.head), a = e.bidiSpans(i), o = e.textDirectionAt(i.from);
	for (let s = t, c = null;;) {
		let t = Gu(i, a, o, s, n), l = Wu;
		if (!t) {
			if (i.number == (n ? e.state.doc.lines : 1)) return s;
			l = "\n", i = e.state.doc.line(i.number + (n ? 1 : -1)), a = e.bidiSpans(i), t = n ? R.cursor(i.from, -1) : R.cursor(i.to, 1);
		}
		if (!c) {
			if (!r) return t;
			c = r(l);
		} else if (!c(l)) return s;
		s = t;
	}
}
function bf(e, t, n) {
	let r = e.state.charCategorizer(t), i = r(n);
	return (e) => {
		let t = r(e);
		return i == Ic.Space && (i = t), i == t;
	};
}
function xf(e, t, n, r) {
	let i = t.head, a = n ? 1 : -1;
	if (i == (n ? e.state.doc.length : 0)) return R.cursor(i, t.assoc);
	let o = t.goalColumn, s, c = e.contentDOM.getBoundingClientRect(), l = e.coordsAtPos(i, t.assoc || ((t.empty ? n : t.head == t.from) ? 1 : -1)), u = e.documentTop;
	if (l) o ??= l.left - c.left, s = a < 0 ? l.top : l.bottom;
	else {
		let t = e.viewState.lineBlockAt(i);
		o ??= Math.min(c.right - c.left, e.defaultCharacterWidth * (i - t.from)), s = (a < 0 ? t.top : t.bottom) + u;
	}
	let d = c.left + o, f = e.viewState.heightOracle.textHeight >> 1, p = r ?? f;
	for (let t = 0;; t += f) {
		let r = s + (p + t) * a, i = Ef(e, {
			x: d,
			y: r
		}, !1, a);
		if (n ? r > c.bottom : r < c.top) return R.cursor(i.pos, i.assoc);
		let l = e.coordsAtPos(i.pos, i.assoc), u = l ? (l.top + l.bottom) / 2 : 0;
		if (!l || (n ? u > s : u < s)) return R.cursor(i.pos, i.assoc, void 0, o);
	}
}
function Sf(e, t, n) {
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
function Cf(e, t) {
	let n = null;
	for (let r = 0; r < t.ranges.length; r++) {
		let i = t.ranges[r], a = null;
		if (i.empty) {
			let t = Sf(e, i.from, 0);
			t != i.from && (a = R.cursor(t, -1));
		} else {
			let t = Sf(e, i.from, -1), n = Sf(e, i.to, 1);
			(t != i.from || n != i.to) && (a = i.undirectional ? R.undirectionalRange(i.from, i.to) : R.range(i.from == i.anchor ? t : n, i.from == i.head ? t : n));
		}
		a && (n ||= t.ranges.slice(), n[r] = a);
	}
	return n ? R.create(n, t.mainIndex) : t;
}
function wf(e, t, n) {
	let r = Sf(e.state.facet(yd).map((t) => t(e)), n.from, t.head > n.from ? -1 : 1);
	return r == n.from ? n : R.cursor(r, r < n.from ? 1 : -1);
}
var Tf = class {
	constructor(e, t) {
		this.pos = e, this.assoc = t;
	}
};
function Ef(e, t, n, r) {
	let i = e.contentDOM.getBoundingClientRect(), a = i.top + e.viewState.paddingTop, { x: o, y: s } = t, c = s - a, l;
	for (;;) {
		if (c < 0) return new Tf(0, 1);
		if (c > e.viewState.docHeight) return new Tf(e.state.doc.length, -1);
		if (l = e.elementAtHeight(c), r == null) break;
		if (l.type == Hl.Text) {
			if (r < 0 ? l.to < e.viewport.from : l.from > e.viewport.to) break;
			let t = e.docView.coordsAt(r < 0 ? l.from : l.to, r > 0 ? -1 : 1);
			if (t && (r < 0 ? t.top <= c + a : t.bottom >= c + a)) break;
		}
		let t = e.viewState.heightOracle.textHeight / 2;
		c = r > 0 ? l.bottom + t : l.top - t;
	}
	if (e.viewport.from >= l.to || e.viewport.to <= l.from) {
		if (n) return null;
		if (l.type == Hl.Text) {
			let t = gf(e, i, l, o, s);
			return new Tf(t, t == l.from ? 1 : -1);
		}
	}
	if (l.type != Hl.Text) return c < (l.top + l.bottom) / 2 ? new Tf(l.from, 1) : new Tf(l.to, -1);
	let u = e.docView.lineAt(l.from, 2);
	return (!u || u.length != l.length) && (u = e.docView.lineAt(l.from, -2)), new Df(e, o, s, e.textDirectionAt(l.from)).scanTile(u, l.from);
}
var Df = class {
	constructor(e, t, n, r) {
		this.view = e, this.x = t, this.y = n, this.baseDir = r, this.line = null, this.spans = null;
	}
	bidiSpansAt(e) {
		return (!this.line || this.line.from > e || this.line.to < e) && (this.line = this.view.state.doc.lineAt(e), this.spans = this.view.bidiSpans(this.line)), this;
	}
	baseDirAt(e, t) {
		let { line: n, spans: r } = this.bidiSpansAt(e);
		return r[Fu.find(r, e - n.from, -1, t)].level == this.baseDir;
	}
	dirAt(e, t) {
		let { line: n, spans: r } = this.bidiSpansAt(e);
		return r[Fu.find(r, e - n.from, -1, t)].dir;
	}
	bidiIn(e, t) {
		let { spans: n, line: r } = this.bidiSpansAt(e);
		return n.length > 1 || n.length && (n[0].level != this.baseDir || n[0].to + r.from < t);
	}
	scan(e, t, n = !1) {
		let r = 0, i = e.length - 1, a = /* @__PURE__ */ new Set(), o = this.bidiIn(e[0], e[i]), s, c, l = -1, u = 1e9, d;
		search: for (; r < i;) {
			let n = i - r, f = r + i >> 1;
			adjust: if (a.has(f)) {
				for (let e = 1; e < n; e++) {
					let t = f + e;
					if (t >= i && (t -= n), !a.has(t)) {
						f = t;
						break adjust;
					}
				}
				break search;
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
						n < u && (l = f, u = n, d = t), e && (m = e < 0 == (this.baseDir == Tu.LTR) ? -1 : 1);
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
		let f = (o ? this.dirAt(e[l], 1) : this.baseDir) == Tu.LTR;
		return {
			i: l,
			after: this.x > (d.left + d.right) / 2 == f
		};
	}
	scanText(e, t) {
		let n = [];
		for (let r = 0; r < e.length; r = Fs(e.text, r)) n.push(t + r);
		n.push(t + e.length);
		let r = this.scan(n, (r) => {
			let i = n[r] - t, a = n[r + 1] - t;
			return _u(e.dom, i, a).getClientRects();
		});
		return r.after ? new Tf(n[r.i + 1], -1) : new Tf(n[r.i], 1);
	}
	scanTile(e, t) {
		if (!e.length) return new Tf(t, 1);
		if (e.children.length == 1) {
			let n = e.children[0];
			if (n.isText()) return this.scanText(n, t);
			if (n.isComposite()) return this.scanTile(n, t);
		}
		let n = [t];
		for (let r = 0, i = t; r < e.children.length; r++) n.push(i += e.children[r].length);
		let r = this.scan(n, (t) => {
			let n = e.children[t];
			return n.flags & 48 ? null : (n.dom.nodeType == 1 ? n.dom : _u(n.dom, 0, n.length)).getClientRects();
		}), i = e.children[r.i], a = n[r.i];
		return i.isText() ? this.scanText(i, a) : i.isComposite() ? this.scanTile(i, a) : r.after ? new Tf(n[r.i + 1], -1) : new Tf(a, 1);
	}
}, Of = "￿", kf = class {
	constructor(e, t) {
		this.points = e, this.view = t, this.text = "", this.lineSeparator = t.state.facet(Vc.lineSeparator);
	}
	append(e) {
		this.text += e;
	}
	lineBreak() {
		this.text += Of;
	}
	readRange(e, t) {
		if (!e) return this;
		let n = e.parentNode;
		for (let r = e;;) {
			this.findPointBefore(n, r);
			let e = this.text.length;
			this.readNode(r);
			let i = Od.get(r), a = r.nextSibling;
			if (a == t) {
				i?.breakAfter && !a && n != this.view.contentDOM && this.lineBreak();
				break;
			}
			let o = Od.get(a);
			(i && o ? i.breakAfter : (i ? i.breakAfter : ru(r)) || ru(a) && (r.nodeName != "BR" || i?.isWidget()) && this.text.length > e) && !jf(a, t) && this.lineBreak(), r = a;
		}
		return this.findPointBefore(n, t), this;
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
	readNode(e) {
		let t = Od.get(e), n = t && t.overrideDOMText;
		if (n != null) {
			this.findPointInside(e, n.length);
			for (let e = n.iter(); !e.next().done;) e.lineBreak ? this.lineBreak() : this.append(e.value);
		} else e.nodeType == 3 ? this.readTextNode(e) : e.nodeName == "BR" ? e.nextSibling && this.lineBreak() : e.nodeType == 1 && this.readRange(e.firstChild, null);
	}
	findPointBefore(e, t) {
		for (let n of this.points) n.node == e && e.childNodes[n.offset] == t && (n.pos = this.text.length);
	}
	findPointInside(e, t) {
		for (let n of this.points) (e.nodeType == 3 ? n.node == e : e.contains(n.node)) && (n.pos = this.text.length + (Af(e, n.node, n.offset) ? t : 0));
	}
};
function Af(e, t, n) {
	for (;;) {
		if (!t || n < au(t)) return !1;
		if (t == e) return !0;
		n = nu(t) + 1, t = t.parentNode;
	}
}
function jf(e, t) {
	let n;
	for (; e != t && e; e = e.nextSibling) {
		let t = Od.get(e);
		if (!t?.isWidget()) return !1;
		t && (n ||= []).push(t);
	}
	if (n) {
		for (let e of n) if (e.overrideDOMText?.length) return !1;
	}
	return !0;
}
var Mf = class {
	constructor(e, t) {
		this.node = e, this.offset = t, this.pos = -1;
	}
}, Nf = class {
	constructor(e, t, n, r) {
		this.typeOver = r, this.bounds = null, this.text = "", this.domChanged = t > -1;
		let { impreciseHead: i, impreciseAnchor: a } = e.docView, o = e.state.selection;
		if (e.state.readOnly && t > -1) this.newSel = null;
		else if (t > -1 && (this.bounds = Pf(e.docView.tile, t, n, 0))) {
			let t = i || a ? [] : zf(e), n = new kf(t, e);
			n.readRange(this.bounds.startDOM, this.bounds.endDOM), this.text = n.text, this.newSel = Bf(t, this.bounds.from);
		} else {
			let t = e.observer.selectionRange, n = i && i.node == t.focusNode && i.offset == t.focusOffset || !Ql(e.contentDOM, t.focusNode) ? o.main.head : e.docView.posFromDOM(t.focusNode, t.focusOffset), r = a && a.node == t.anchorNode && a.offset == t.anchorOffset || !Ql(e.contentDOM, t.anchorNode) ? o.main.anchor : e.docView.posFromDOM(t.anchorNode, t.anchorOffset), s = e.viewport;
			if ((B.ios || B.chrome) && n != r && Math.min(n, r) <= o.main.from && Math.max(n, r) >= o.main.to && (s.from > 0 || s.to < e.state.doc.length)) {
				let t = Math.min(n, r), i = Math.max(n, r), a = s.from - t, o = s.to - i;
				(a == 0 || a == 1 || t == 0) && (o == 0 || o == -1 || i == e.state.doc.length) && (n = 0, r = e.state.doc.length);
			}
			if (e.inputState.composing > -1 && o.ranges.length > 1) this.newSel = o.replaceRange(R.range(r, n));
			else if (e.lineWrapping && r == n && !(o.main.empty && o.main.head == n) && e.inputState.lastTouchTime > Date.now() - 100) {
				let t = e.coordsAtPos(n, -1), r = 0;
				t && (r = e.inputState.lastTouchY <= t.bottom ? -1 : 1), this.newSel = R.create([R.cursor(n, r)]);
			} else this.newSel = R.single(r, n);
		}
	}
};
function Pf(e, t, n, r) {
	if (e.isComposite()) {
		let i = -1, a = -1, o = -1, s = -1;
		for (let c = 0, l = r, u = r; c < e.children.length; c++) {
			let r = e.children[c], d = l + r.length;
			if (l < t && d > n) return Pf(r, t, n, l);
			if (d >= t && i == -1 && (i = c, a = l), l > n && r.dom.parentNode == e.dom) {
				o = c, s = u;
				break;
			}
			u = d, l = d + r.breakAfter;
		}
		return {
			from: a,
			to: s < 0 ? r + e.length : s,
			startDOM: (i ? e.children[i - 1].dom.nextSibling : null) || e.dom.firstChild,
			endDOM: o < e.children.length && o >= 0 ? e.children[o].dom : null
		};
	}
	return e.isText() ? {
		from: r,
		to: r + e.length,
		startDOM: e.dom,
		endDOM: e.dom.nextSibling
	} : null;
}
function Ff(e, t) {
	let n, { newSel: r } = t, { state: i } = e, a = i.selection.main, o = e.inputState.lastKeyTime > Date.now() - 100 ? e.inputState.lastKeyCode : -1;
	if (t.bounds) {
		let { from: e, to: r } = t.bounds, s = a.from, c = null;
		(o === 8 || B.android && t.text.length < r - e) && (s = a.to, c = "end");
		let l = i.doc.sliceString(e, r, Of), u, d;
		!a.empty && a.from >= e && a.to <= r && (t.typeOver || l != t.text) && l.slice(0, a.from - e) == t.text.slice(0, a.from - e) && l.slice(a.to - e) == t.text.slice(u = t.text.length - (l.length - (a.to - e))) ? n = {
			from: a.from,
			to: a.to,
			insert: L.of(t.text.slice(a.from - e, u).split(Of))
		} : (d = Rf(l, t.text, s - e, c)) && (B.chrome && o == 13 && d.toB == d.from + 2 && t.text.slice(d.from, d.toB) == "￿￿" && d.toB--, n = {
			from: e + d.from,
			to: e + d.toA,
			insert: L.of(t.text.slice(d.from, d.toB).split(Of))
		});
	} else r && (!e.hasFocus && i.facet(ld) || Vf(r, a)) && (r = null);
	if (!n && !r) return !1;
	if ((B.mac || B.android) && n && n.from == n.to && n.from == a.head - 1 && /^\. ?$/.test(n.insert.toString()) && e.contentDOM.getAttribute("autocorrect") == "off" ? (r && n.insert.length == 2 && (r = R.single(r.main.anchor - 1, r.main.head - 1)), n = {
		from: n.from,
		to: n.to,
		insert: L.of([n.insert.toString().replace(".", " ")])
	}) : i.doc.lineAt(a.from).to < a.to && e.docView.lineHasWidget(a.to) && e.inputState.insertingTextAt > Date.now() - 50 ? n = {
		from: a.from,
		to: a.to,
		insert: i.toText(e.inputState.insertingText)
	} : B.chrome && n && n.from == n.to && n.from == a.head && n.insert.toString() == "\n " && e.lineWrapping && (r &&= R.single(r.main.anchor - 1, r.main.head - 1), n = {
		from: a.from,
		to: a.to,
		insert: L.of([" "])
	}), n) return If(e, n, r, o);
	if (r && !Vf(r, a)) {
		let t = !1, n = "select";
		return e.inputState.lastSelectionTime > Date.now() - 50 && (e.inputState.lastSelectionOrigin == "select" && (t = !0), n = e.inputState.lastSelectionOrigin, n == "select.pointer" && (r = Cf(i.facet(yd).map((t) => t(e)), r))), e.dispatch({
			selection: r,
			scrollIntoView: t,
			userEvent: n
		}), !0;
	}
	return !1;
}
function If(e, t, n, r = -1) {
	if (B.ios && e.inputState.flushIOSKey(t)) return !0;
	let i = e.state.selection.main;
	if (B.android && (t.to == i.to && (t.from == i.from || t.from == i.from - 1 && e.state.sliceDoc(t.from, i.from) == " ") && t.insert.length == 1 && t.insert.lines == 2 && vu(e.contentDOM, "Enter", 13) || (t.from == i.from - 1 && t.to == i.to && t.insert.length == 0 || r == 8 && t.insert.length < t.to - t.from && t.to > i.head) && vu(e.contentDOM, "Backspace", 8) || t.from == i.from && t.to == i.to + 1 && t.insert.length == 0 && vu(e.contentDOM, "Delete", 46))) return !0;
	let a = t.insert.toString();
	e.inputState.composing >= 0 && e.inputState.composing++;
	let o, s = () => o ||= Lf(e, t, n);
	return e.state.facet(Qu).some((n) => n(e, t.from, t.to, a, s)) || e.dispatch(s()), !0;
}
function Lf(e, t, n) {
	let r, i = e.state, a = i.selection.main, o = -1;
	if (t.from == t.to && t.from < a.from || t.from > a.to) {
		let n = t.from < a.from ? -1 : 1, r = n < 0 ? a.from : a.to, s = Sf(i.facet(yd).map((t) => t(e)), r, n);
		t.from == s && (o = s);
	}
	if (o > -1) r = {
		changes: t,
		selection: R.cursor(t.from + t.insert.length, -1)
	};
	else if (t.from >= a.from && t.to <= a.to && t.to - t.from >= (a.to - a.from) / 3 && (!n || n.main.empty && n.main.from == t.from + t.insert.length) && e.inputState.composing < 0) {
		let n = a.from < t.from ? i.sliceDoc(a.from, t.from) : "", o = a.to > t.to ? i.sliceDoc(t.to, a.to) : "";
		r = i.replaceSelection(e.state.toText(n + t.insert.sliceString(0, void 0, e.state.lineBreak) + o));
	} else {
		let o = i.changes(t), s = n && n.main.to <= o.newLength ? n.main : void 0;
		if (i.selection.ranges.length > 1 && (e.inputState.composing >= 0 || e.inputState.compositionPendingChange) && t.to <= a.to + 10 && t.to >= a.to - 10) {
			let c = e.state.sliceDoc(t.from, t.to), l, u = n && af(e, n.main.head);
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
					range: s ? R.range(Math.max(0, s.anchor + p), Math.max(0, s.head + p)) : n.map(f)
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
function Rf(e, t, n, r) {
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
function zf(e) {
	let t = [];
	if (e.root.activeElement != e.contentDOM) return t;
	let { anchorNode: n, anchorOffset: r, focusNode: i, focusOffset: a } = e.observer.selectionRange;
	return n && (t.push(new Mf(n, r)), (i != n || a != r) && t.push(new Mf(i, a))), t;
}
function Bf(e, t) {
	if (e.length == 0) return null;
	let n = e[0].pos, r = e.length == 2 ? e[1].pos : n;
	return n < 0 || r < 0 ? null : n == r ? R.create([R.cursor(r + t, -1)]) : R.single(n + t, r + t);
}
function Vf(e, t) {
	return t.head == e.main.head && t.anchor == e.main.anchor;
}
var Hf = class {
	setSelectionOrigin(e) {
		this.lastSelectionOrigin = e, this.lastSelectionTime = Date.now();
	}
	constructor(e) {
		this.view = e, this.lastKeyCode = 0, this.lastKeyTime = 0, this.touchActive = !1, this.lastTouchTime = 0, this.lastTouchX = 0, this.lastTouchY = 0, this.lastFocusTime = 0, this.lastScrollTop = 0, this.lastScrollLeft = 0, this.lastWheelEvent = 0, this.pendingIOSKey = void 0, this.lastIOSMomentumScroll = 0, this.tabFocusMode = -1, this.lastSelectionOrigin = null, this.lastSelectionTime = 0, this.lastContextMenu = 0, this.scrollHandlers = [], this.handlers = Object.create(null), this.composing = -1, this.compositionFirstChange = null, this.compositionEndedAt = 0, this.compositionPendingKey = !1, this.compositionPendingChange = !1, this.insertingText = "", this.insertingTextAt = 0, this.mouseSelection = null, this.draggedContent = null, this.handleEvent = this.handleEvent.bind(this), this.notifiedFocused = e.hasFocus, B.safari && e.contentDOM.addEventListener("input", () => null), B.gecko && Tp(e.contentDOM.ownerDocument);
	}
	handleEvent(e) {
		np(this.view, e) && !this.ignoreDuringComposition(e) && (e.type == "keydown" && this.keydown(e) || (this.view.updateState == 0 ? this.runHandlers(e.type, e) : Promise.resolve().then(() => this.runHandlers(e.type, e))));
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
		let t = Gf(e), n = this.handlers, r = this.view.contentDOM;
		for (let e in t) if (e != "scroll") {
			let i = !t[e].handlers.length, a = n[e];
			a && i != !a.handlers.length && (r.removeEventListener(e, this.handleEvent), a = null), a || r.addEventListener(e, this.handleEvent, { passive: i });
		}
		for (let e in n) e != "scroll" && !t[e] && r.removeEventListener(e, this.handleEvent);
		this.handlers = t;
	}
	keydown(e) {
		if (this.lastKeyCode = e.keyCode, this.lastKeyTime = Date.now(), e.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode)) return !0;
		if (this.tabFocusMode > 0 && e.keyCode != 27 && Jf.indexOf(e.keyCode) < 0 && (this.tabFocusMode = -1), B.android && B.chrome && !e.synthetic && (e.keyCode == 13 || e.keyCode == 8)) return this.view.observer.delayAndroidKey(e.key, e.keyCode), !0;
		if (B.ios && !e.synthetic && !e.altKey && !e.metaKey && (Kf.some((t) => t.keyCode == e.keyCode) && !e.ctrlKey || qf.indexOf(e.key) > -1 && e.ctrlKey)) {
			let t = {
				ctrlKey: e.ctrlKey,
				altKey: e.altKey,
				metaKey: e.metaKey,
				shiftKey: e.shiftKey
			};
			t.shiftKey && B.ios && !/^(off|none)$/.test(this.view.contentDOM.autocapitalize) && Uf(this.view.win) && (t.shiftKey = !1);
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
		return !t || this.view.observer.pendingRecords().length || t.key == "Enter" && e && e.from < e.to && /^\S+$/.test(e.insert.toString()) ? !1 : (this.pendingIOSKey = void 0, vu(this.view.contentDOM, t.key, t.keyCode, t.mods));
	}
	ignoreDuringComposition(e) {
		return !/^key/.test(e.type) || e.synthetic ? !1 : this.composing > 0 ? !0 : B.safari && !B.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100 ? (this.compositionPendingKey = !1, !0) : !1;
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
};
function Uf(e) {
	return e.visualViewport ? e.visualViewport.height * e.visualViewport.scale / e.document.documentElement.clientHeight < .85 : !1;
}
function Wf(e, t) {
	return (n, r) => {
		try {
			return t.call(e, r, n);
		} catch (e) {
			cd(n.state, e);
		}
	};
}
function Gf(e) {
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
			i && n(e).handlers.push(Wf(t.value, i));
		}
		if (i) for (let e in i) {
			let r = i[e];
			r && n(e).observers.push(Wf(t.value, r));
		}
	}
	for (let e in rp) n(e).handlers.push(rp[e]);
	for (let e in ip) n(e).observers.push(ip[e]);
	return t;
}
var Kf = [
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
], qf = "dthko", Jf = [
	16,
	17,
	18,
	20,
	91,
	92,
	224,
	225
], Yf = 6;
function Xf(e) {
	return Math.max(0, e) * .7 + 8;
}
function Zf(e, t) {
	return Math.max(Math.abs(e.clientX - t.clientX), Math.abs(e.clientY - t.clientY));
}
var Qf = class {
	constructor(e, t, n, r) {
		this.view = e, this.startEvent = t, this.style = n, this.mustSelect = r, this.scrollSpeed = {
			x: 0,
			y: 0
		}, this.scrolling = -1, this.lastEvent = t, this.scrollParents = uu(e.contentDOM), this.atoms = e.state.facet(yd).map((t) => t(e));
		let i = e.contentDOM.ownerDocument;
		i.addEventListener("mousemove", this.move = this.move.bind(this)), i.addEventListener("mouseup", this.up = this.up.bind(this)), this.extend = t.shiftKey, this.multiple = e.state.facet(Vc.allowMultipleSelections) && $f(e, t), this.dragging = tp(e, t) && mp(t) == 1 ? null : !1;
	}
	start(e) {
		this.dragging === !1 && this.select(e);
	}
	move(e) {
		if (e.buttons == 0) return this.destroy();
		if (this.dragging || this.dragging == null && Zf(this.startEvent, e) < 10) return;
		this.select(this.lastEvent = e);
		let t = 0, n = 0, r = 0, i = 0, a = this.view.win.innerWidth, o = this.view.win.innerHeight;
		this.scrollParents.x && ({left: r, right: a} = this.scrollParents.x.getBoundingClientRect()), this.scrollParents.y && ({top: i, bottom: o} = this.scrollParents.y.getBoundingClientRect());
		let s = Cd(this.view);
		e.clientX - s.left <= r + Yf ? t = -Xf(r - e.clientX) : e.clientX + s.right >= a - Yf && (t = Xf(e.clientX - a)), e.clientY - s.top <= i + Yf ? n = -Xf(i - e.clientY) : e.clientY + s.bottom >= o - Yf && (n = Xf(e.clientY - o)), this.setScrollSpeed(t, n);
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
		let { view: t } = this, n = Cf(this.atoms, this.style.get(e, this.extend, this.multiple));
		(this.mustSelect || !n.eq(t.state.selection, this.dragging === !1)) && this.view.dispatch({
			selection: n,
			userEvent: "select.pointer"
		}), this.mustSelect = !1;
	}
	update(e) {
		e.transactions.some((e) => e.isUserEvent("input.type")) ? this.destroy() : this.style.update(e) && setTimeout(() => this.select(this.lastEvent), 20);
	}
};
function $f(e, t) {
	let n = e.state.facet(qu);
	return n.length ? n[0](t) : B.mac ? t.metaKey : t.ctrlKey;
}
function ep(e, t) {
	let n = e.state.facet(Ju);
	return n.length ? n[0](t) : B.mac ? !t.altKey : !t.ctrlKey;
}
function tp(e, t) {
	let { main: n } = e.state.selection;
	if (n.empty) return !1;
	let r = Zl(e.root);
	if (!r || r.rangeCount == 0) return !0;
	let i = r.getRangeAt(0).getClientRects();
	for (let e = 0; e < i.length; e++) {
		let n = i[e];
		if (n.left <= t.clientX && n.right >= t.clientX && n.top <= t.clientY && n.bottom >= t.clientY) return !0;
	}
	return !1;
}
function np(e, t) {
	if (!t.bubbles) return !0;
	if (t.defaultPrevented) return !1;
	for (let n = t.target, r; n != e.contentDOM; n = n.parentNode) if (!n || n.nodeType == 11 || (r = Od.get(n)) && r.isWidget() && !r.isHidden && r.widget.ignoreEvent(t)) return !1;
	return !0;
}
var rp = /*@__PURE__*/ Object.create(null), ip = /*@__PURE__*/ Object.create(null), ap = B.ie && B.ie_version < 15 || B.ios && B.webkit_version < 604;
function op(e) {
	let t = e.dom.parentNode;
	if (!t) return;
	let n = t.appendChild(document.createElement("textarea"));
	n.style.cssText = "position: fixed; left: -10000px; top: 10px", n.focus(), setTimeout(() => {
		e.focus(), n.remove(), cp(e, n.value);
	}, 50);
}
function sp(e, t, n) {
	for (let r of e.facet(t)) n = r(n, e);
	return n;
}
function cp(e, t) {
	t = sp(e.state, ed, t);
	let { state: n } = e, r, i = 1, a = n.toText(t), o = a.lines == n.selection.ranges.length;
	if (bp != null && n.selection.ranges.every((e) => e.empty) && bp == a.toString()) {
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
				range: R.cursor(r.from + c.length, -1)
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
			range: R.cursor(e.from + t.length, -1)
		};
	}) : n.replaceSelection(a);
	e.dispatch(r, {
		userEvent: "input.paste",
		scrollIntoView: !0
	});
}
ip.scroll = (e) => {
	let t = e.inputState;
	t.lastScrollTop = e.scrollDOM.scrollTop, t.lastScrollLeft = e.scrollDOM.scrollLeft, B.ios && !t.touchActive && (t.lastIOSMomentumScroll = Date.now());
}, ip.wheel = ip.mousewheel = (e) => {
	e.inputState.lastWheelEvent = Date.now();
}, rp.keydown = (e, t) => (e.inputState.setSelectionOrigin("select"), t.keyCode == 27 && e.inputState.tabFocusMode != 0 && (e.inputState.tabFocusMode = Date.now() + 2e3), !1), ip.touchstart = (e, t) => {
	let n = e.inputState, r = t.targetTouches[0];
	n.touchActive = !0, n.lastTouchTime = Date.now(), r && (n.lastTouchX = r.clientX, n.lastTouchY = r.clientY), n.setSelectionOrigin("select.pointer");
}, ip.touchmove = (e) => {
	e.inputState.setSelectionOrigin("select.pointer");
}, ip.touchend = (e, t) => {
	e.inputState.touchActive = !1;
}, rp.mousedown = (e, t) => {
	if (e.observer.flush(), e.inputState.lastTouchTime > Date.now() - 2e3) return !1;
	let n = null;
	for (let r of e.state.facet(Yu)) if (n = r(e, t), n) break;
	if (!n && t.button == 0 && (n = hp(e, t)), n) {
		let r = !e.hasFocus;
		e.inputState.startMouseSelection(new Qf(e, t, n, r)), r && e.observer.ignore(() => {
			hu(e.contentDOM);
			let t = e.root.activeElement;
			t && !t.contains(e.contentDOM) && t.blur();
		});
		let i = e.inputState.mouseSelection;
		if (i) return i.start(t), i.dragging === !1;
	} else e.inputState.setSelectionOrigin("select.pointer");
	return !1;
};
function lp(e, t, n, r) {
	if (r == 1) return R.cursor(t, n);
	if (r == 2) return hf(e.state, t, n);
	{
		let r = e.docView.lineAt(t, n), i = e.state.doc.lineAt(r ? r.posAtEnd : t), a = r ? r.posAtStart : i.from, o = r ? r.posAtEnd : i.to;
		return o < e.state.doc.length && o == i.to && o++, R.undirectionalRange(a, o);
	}
}
var up = B.ie && B.ie_version <= 11, dp = null, fp = 0, pp = 0;
function mp(e) {
	if (!up) return e.detail;
	let t = dp, n = pp;
	return dp = e, pp = Date.now(), fp = !t || n > Date.now() - 400 && Math.abs(t.clientX - e.clientX) < 2 && Math.abs(t.clientY - e.clientY) < 2 ? (fp + 1) % 3 : 1;
}
function hp(e, t) {
	let n = e.posAndSideAtCoords({
		x: t.clientX,
		y: t.clientY
	}, !1), r = mp(t), i = e.state.selection;
	return {
		update(e) {
			e.docChanged && (n.pos = e.changes.mapPos(n.pos), i = i.map(e.changes));
		},
		get(t, a, o) {
			let s = e.posAndSideAtCoords({
				x: t.clientX,
				y: t.clientY
			}, !1), c, l = lp(e, s.pos, s.assoc, r);
			if (n.pos != s.pos && !a) {
				let t = lp(e, n.pos, n.assoc, r), i = Math.min(t.from, l.from), a = Math.max(t.to, l.to);
				l = i < l.from ? R.range(i, a, l.assoc) : R.range(a, i, l.assoc);
			}
			return a ? i.replaceRange(i.main.extend(l.from, l.to, l.assoc)) : o && r == 1 && i.ranges.length > 1 && (c = gp(i, s.pos)) ? c : o ? i.addRange(l) : R.create([l]);
		}
	};
}
function gp(e, t) {
	for (let n = 0; n < e.ranges.length; n++) {
		let { from: r, to: i } = e.ranges[n];
		if (r <= t && i >= t) return R.create(e.ranges.slice(0, n).concat(e.ranges.slice(n + 1)), e.mainIndex == n ? 0 : e.mainIndex - +(e.mainIndex > n));
	}
	return null;
}
rp.dragstart = (e, t) => {
	let { selection: { main: n } } = e.state;
	if (t.target.draggable) {
		let r = e.docView.tile.nearest(t.target);
		if (r && r.isWidget()) {
			let e = r.posAtStart, t = e + r.length;
			(e >= n.to || t <= n.from) && (n = R.undirectionalRange(e, t));
		}
	}
	let { inputState: r } = e;
	return r.mouseSelection && (r.mouseSelection.dragging = !0), r.draggedContent = n, t.dataTransfer && (t.dataTransfer.setData("Text", sp(e.state, td, e.state.sliceDoc(n.from, n.to))), t.dataTransfer.effectAllowed = "copyMove"), !1;
}, rp.dragend = (e) => (e.inputState.draggedContent = null, !1);
function _p(e, t, n, r) {
	if (n = sp(e.state, ed, n), !n) return;
	let i = e.posAtCoords({
		x: t.clientX,
		y: t.clientY
	}, !1), { draggedContent: a } = e.inputState, o = r && a && ep(e, t) ? {
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
rp.drop = (e, t) => {
	if (!t.dataTransfer) return !1;
	if (e.state.readOnly) return !0;
	let n = t.dataTransfer.files;
	if (n && n.length) {
		let r = Array(n.length), i = 0, a = () => {
			++i == n.length && _p(e, t, r.filter((e) => e != null).join(e.state.lineBreak), !1);
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
		if (n) return _p(e, t, n, !0), !0;
	}
	return !1;
}, rp.paste = (e, t) => {
	if (e.state.readOnly) return !0;
	e.observer.flush();
	let n = ap ? null : t.clipboardData;
	return n ? (cp(e, n.getData("text/plain") || n.getData("text/uri-list")), !0) : (op(e), !1);
};
function vp(e, t) {
	let n = e.dom.parentNode;
	if (!n) return;
	let r = n.appendChild(document.createElement("textarea"));
	r.style.cssText = "position: fixed; left: -10000px; top: 10px", r.value = t, r.focus(), r.selectionEnd = t.length, r.selectionStart = 0, setTimeout(() => {
		r.remove(), e.focus();
	}, 50);
}
function yp(e) {
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
		text: sp(e, td, t.join(e.lineBreak)),
		ranges: n,
		linewise: r
	};
}
var bp = null;
rp.copy = rp.cut = (e, t) => {
	if (!$l(e.contentDOM, e.observer.selectionRange)) return !1;
	let { text: n, ranges: r, linewise: i } = yp(e.state);
	if (!n && !i) return !1;
	bp = i ? n : null, t.type == "cut" && !e.state.readOnly && e.dispatch({
		changes: r,
		scrollIntoView: !0,
		userEvent: "delete.cut"
	});
	let a = ap ? null : t.clipboardData;
	return a ? (a.clearData(), a.setData("text/plain", n), !0) : (vp(e, n), !1);
};
var xp = /*@__PURE__*/ Cc.define();
function Sp(e, t) {
	let n = [];
	for (let r of e.facet($u)) {
		let i = r(e, t);
		i && n.push(i);
	}
	return n.length ? e.update({
		effects: n,
		annotations: xp.of(!0)
	}) : null;
}
function Cp(e) {
	setTimeout(() => {
		let t = e.hasFocus;
		if (t != e.inputState.notifiedFocused) {
			let n = Sp(e.state, t);
			n ? e.dispatch(n) : e.update([]);
		}
	}, 10);
}
ip.focus = (e) => {
	e.inputState.lastFocusTime = Date.now(), !e.scrollDOM.scrollTop && (e.inputState.lastScrollTop || e.inputState.lastScrollLeft) && (e.scrollDOM.scrollTop = e.inputState.lastScrollTop, e.scrollDOM.scrollLeft = e.inputState.lastScrollLeft), Cp(e);
}, ip.blur = (e) => {
	e.observer.clearSelectionRange(), Cp(e);
}, ip.compositionstart = ip.compositionupdate = (e) => {
	if (!e.observer.editContext && (e.inputState.compositionFirstChange ?? (e.inputState.compositionFirstChange = !0), e.inputState.composing < 0)) {
		let { main: t } = e.state.selection;
		!t.empty && e.lineBlockAt(t.from).from != e.lineBlockAt(t.to).from && e.dispatch({
			changes: e.state.selection.ranges.filter((e) => !e.empty).map((e) => ({
				from: e.from,
				to: e.to
			})),
			userEvent: "input"
		}), e.inputState.composing = 0;
	}
}, ip.compositionend = (e) => {
	e.observer.editContext || (e.inputState.composing = -1, e.inputState.compositionEndedAt = Date.now(), e.inputState.compositionPendingKey = !0, e.inputState.compositionPendingChange = e.observer.pendingRecords().length > 0, e.inputState.compositionFirstChange = null, B.chrome && B.android ? e.observer.flushSoon() : e.inputState.compositionPendingChange ? Promise.resolve().then(() => e.observer.flush()) : setTimeout(() => {
		e.inputState.composing < 0 && e.docView.hasComposition && e.update([]);
	}, 50));
}, ip.contextmenu = (e) => {
	e.inputState.lastContextMenu = Date.now();
}, rp.beforeinput = (e, t) => {
	if ((t.inputType == "insertText" || t.inputType == "insertCompositionText") && (e.inputState.insertingText = t.data, e.inputState.insertingTextAt = Date.now()), t.inputType == "insertReplacementText" && e.observer.editContext) {
		let n = t.dataTransfer?.getData("text/plain"), r = t.getTargetRanges();
		if (n && r.length) {
			let t = r[0];
			return If(e, {
				from: e.posAtDOM(t.startContainer, t.startOffset),
				to: e.posAtDOM(t.endContainer, t.endOffset),
				insert: e.state.toText(n)
			}, null), !0;
		}
	}
	let n;
	if (B.chrome && B.android && (n = Kf.find((e) => e.inputType == t.inputType)) && (e.observer.delayAndroidKey(n.key, n.keyCode), n.key == "Backspace" || n.key == "Delete")) {
		let t = window.visualViewport?.height || 0;
		setTimeout(() => {
			(window.visualViewport?.height || 0) > t + 10 && e.hasFocus && (e.contentDOM.blur(), e.focus());
		}, 100);
	}
	return B.ios && t.inputType == "deleteContentForward" && e.observer.flushSoon(), B.safari && t.inputType == "insertText" && e.inputState.composing >= 0 && setTimeout(() => ip.compositionend(e, t), 20), !1;
};
var wp = /*@__PURE__*/ new Set();
function Tp(e) {
	wp.has(e) || (wp.add(e), e.addEventListener("copy", () => {}), e.addEventListener("cut", () => {}));
}
var Ep = [
	"pre-wrap",
	"normal",
	"pre-line",
	"break-spaces"
], Dp = !1;
function Op() {
	Dp = !1;
}
var kp = class {
	constructor(e) {
		this.lineWrapping = e, this.doc = L.empty, this.heightSamples = {}, this.lineHeight = 14, this.charWidth = 7, this.textHeight = 14, this.lineLength = 30;
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
		return Ep.indexOf(e) > -1 != this.lineWrapping;
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
		let o = Ep.indexOf(e) > -1, s = Math.abs(t - this.lineHeight) > .3 || this.lineWrapping != o;
		if (this.lineWrapping = o, this.lineHeight = t, this.charWidth = n, this.textHeight = r, this.lineLength = i, s) {
			this.heightSamples = {};
			for (let e = 0; e < a.length; e++) {
				let t = a[e];
				t < 0 ? e++ : this.heightSamples[Math.floor(t * 10)] = !0;
			}
		}
		return s;
	}
}, Ap = class {
	constructor(e, t) {
		this.from = e, this.heights = t, this.index = 0;
	}
	get more() {
		return this.index < this.heights.length;
	}
}, jp = class e {
	constructor(e, t, n, r, i) {
		this.from = e, this.length = t, this.top = n, this.height = r, this._content = i;
	}
	get type() {
		return typeof this._content == "number" ? Hl.Text : Array.isArray(this._content) ? this._content : this._content.type;
	}
	get to() {
		return this.from + this.length;
	}
	get bottom() {
		return this.top + this.height;
	}
	get widget() {
		return this._content instanceof Kl ? this._content.widget : null;
	}
	get widgetLineBreaks() {
		return typeof this._content == "number" ? this._content : 0;
	}
	join(t) {
		let n = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(t._content) ? t._content : [t]);
		return new e(this.from, this.length + t.length, this.top, this.height + t.height, n);
	}
}, H = /*@__PURE__*/ (function(e) {
	return e[e.ByPos = 0] = "ByPos", e[e.ByHeight = 1] = "ByHeight", e[e.ByPosNoHeight = 2] = "ByPosNoHeight", e;
})(H ||= {}), Mp = .001, Np = class e {
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
		this.height != e && (Math.abs(this.height - e) > Mp && (Dp = !0), this.height = e);
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
			let { fromA: s, toA: c, fromB: l, toB: u } = r[o], d = i.lineAt(s, H.ByPosNoHeight, n.setDoc(t), 0, 0), f = d.to >= c ? d : i.lineAt(c, H.ByPosNoHeight, n, 0, 0);
			for (u += f.to - c, c = f.to; o > 0 && d.from <= r[o - 1].toA;) s = r[o - 1].fromA, l = r[o - 1].fromB, o--, s < d.from && (d = i.lineAt(s, H.ByPosNoHeight, n, 0, 0));
			l += d.from - s, s = d.from;
			let p = Hp.build(n.setDoc(a), e, l, u);
			i = Pp(i, i.replace(s, c, p));
		}
		return i.updateHeight(n, 0);
	}
	static empty() {
		return new Lp(0, 0, 0);
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
		return t[n - 1] == null ? (o = !0, n--) : t[n] ?? (o = !0, r++), new zp(e.of(t.slice(0, n)), o, e.of(t.slice(r)));
	}
};
function Pp(e, t) {
	return e == t ? e : (e.constructor != t.constructor && (Dp = !0), t);
}
Np.prototype.size = 1;
var Fp = /*@__PURE__*/ Ul.replace({}), Ip = class extends Np {
	constructor(e, t, n) {
		super(e, t), this.deco = n, this.spaceAbove = 0;
	}
	mainBlock(e, t) {
		return new jp(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
	}
	blockAt(e, t, n, r) {
		return this.spaceAbove && e < n + this.spaceAbove ? new jp(r, 0, n, this.spaceAbove, Fp) : this.mainBlock(n, r);
	}
	lineAt(e, t, n, r, i) {
		let a = this.mainBlock(r, i);
		return this.spaceAbove ? this.blockAt(0, n, r, i).join(a) : a;
	}
	forEachLine(e, t, n, r, i, a) {
		e <= i + this.length && t >= i && a(this.lineAt(0, H.ByPos, n, r, i));
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
}, Lp = class e extends Ip {
	constructor(e, t, n) {
		super(e, t, null), this.collapsed = 0, this.widgetHeight = 0, this.breaks = 0, this.spaceAbove = n;
	}
	mainBlock(e, t) {
		return new jp(t, this.length, e + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
	}
	replace(t, n, r) {
		let i = r[0];
		return r.length == 1 && (i instanceof e || i instanceof Rp && i.flags & 4) && Math.abs(this.length - i.length) < 10 ? (i instanceof Rp ? i = new e(i.length, this.height, this.spaceAbove) : i.height = this.height, this.outdated || (i.outdated = !1), i) : Np.of(r);
	}
	updateHeight(e, t = 0, n = !1, r) {
		return r && r.from <= t && r.more ? this.setMeasuredHeight(r) : (n || this.outdated) && (this.spaceAbove = 0, this.setHeight(Math.max(this.widgetHeight, e.heightForLine(this.length - this.collapsed)) + this.breaks * e.lineHeight)), this.outdated = !1, this;
	}
	toString() {
		return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
	}
}, Rp = class e extends Np {
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
			return new jp(a.from, a.length, l, c, 0);
		}
		{
			let r = Math.max(0, Math.min(a - i, Math.floor((e - n) / o))), { from: s, length: c } = t.doc.line(i + r);
			return new jp(s, c, n + o * r, o, 0);
		}
	}
	lineAt(e, t, n, r, i) {
		if (t == H.ByHeight) return this.blockAt(e, n, r, i);
		if (t == H.ByPosNoHeight) {
			let { from: t, to: r } = n.doc.lineAt(e);
			return new jp(t, r - t, 0, 0, 0);
		}
		let { firstLine: a, perLine: o, perChar: s } = this.heightMetrics(n, i), c = n.doc.lineAt(e), l = o + c.length * s, u = c.number - a, d = r + o * u + s * (c.from - i - u);
		return new jp(c.from, c.length, Math.max(r, Math.min(d, r + this.height - l)), l, 0);
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
			a(new jp(t.from, t.length, u, r, 0)), u += r, l = t.to + 1;
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
		return Np.of(r);
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
				n < 0 && (a = -n, n = i.heights[i.index++]), s == -1 ? s = n : Math.abs(n - s) >= Mp && (s = -2);
				let c = new Lp(e, n, a);
				c.outdated = !1, r.push(c), o += e + 1;
			}
			o <= a && r.push(null, new e(a - o).updateHeight(t, o));
			let c = Np.of(r);
			return (s < 0 || Math.abs(c.height - this.height) >= Mp || Math.abs(s - this.heightMetrics(t, n).perLine) >= Mp) && (Dp = !0), Pp(this, c);
		}
		return (r || this.outdated) && (this.setHeight(t.heightForGap(n, n + this.length)), this.outdated = !1), this;
	}
	toString() {
		return `gap(${this.length})`;
	}
}, zp = class extends Np {
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
		let a = r + this.left.height, o = i + this.left.length + this.break, s = t == H.ByHeight ? e < a : e < o, c = s ? this.left.lineAt(e, t, n, r, i) : this.right.lineAt(e, t, n, a, o);
		if (this.break || (s ? c.to < o : c.from > o)) return c;
		let l = t == H.ByPosNoHeight ? H.ByPosNoHeight : H.ByPos;
		return s ? c.join(this.right.lineAt(o, l, n, a, o)) : this.left.lineAt(o, l, n, r, i).join(c);
	}
	forEachLine(e, t, n, r, i, a) {
		let o = r + this.left.height, s = i + this.left.length + this.break;
		if (this.break) e < s && this.left.forEachLine(e, t, n, r, i, a), t >= s && this.right.forEachLine(e, t, n, o, s, a);
		else {
			let c = this.lineAt(s, H.ByPos, n, r, i);
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
		if (e > 0 && Bp(i, a - 1), t < this.length) {
			let e = i.length;
			this.decomposeRight(t, i), Bp(i, e);
		}
		return Np.of(i);
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
		return e.size > 2 * t.size || t.size > 2 * e.size ? Np.of(this.break ? [
			e,
			null,
			t
		] : [e, t]) : (this.left = Pp(this.left, e), this.right = Pp(this.right, t), this.setHeight(e.height + t.height), this.outdated = e.outdated || t.outdated, this.size = e.size + t.size, this.length = e.length + this.break + t.length, this);
	}
	updateHeight(e, t = 0, n = !1, r) {
		let { left: i, right: a } = this, o = t + i.length + this.break, s = null;
		return r && r.from <= t + i.length && r.more ? s = i = i.updateHeight(e, t, n, r) : i.updateHeight(e, t, n), r && r.from <= o + a.length && r.more ? s = a = a.updateHeight(e, o, n, r) : a.updateHeight(e, o, n), s ? this.balanced(i, a) : (this.height = this.left.height + this.right.height, this.outdated = !1, this);
	}
	toString() {
		return this.left + (this.break ? " " : "-") + this.right;
	}
};
function Bp(e, t) {
	let n, r;
	e[t] == null && (n = e[t - 1]) instanceof Rp && (r = e[t + 1]) instanceof Rp && e.splice(t - 1, 3, new Rp(n.length + 1 + r.length));
}
var Vp = 5, Hp = class e {
	constructor(e, t) {
		this.pos = e, this.oracle = t, this.nodes = [], this.lineStart = -1, this.lineEnd = -1, this.covering = null, this.writtenTo = e;
	}
	get isCovered() {
		return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
	}
	span(e, t) {
		if (this.lineStart > -1) {
			let e = Math.min(t, this.lineEnd), n = this.nodes[this.nodes.length - 1];
			n instanceof Lp ? n.length += e - this.pos : (e > this.pos || !this.isCovered) && this.nodes.push(new Lp(e - this.pos, -1, 0)), this.writtenTo = e, t > e && (this.nodes.push(null), this.writtenTo++, this.lineStart = -1);
		}
		this.pos = t;
	}
	point(e, t, n) {
		if (e < t || n.heightRelevant) {
			let r = n.widget ? n.widget.estimatedHeight : 0, i = n.widget ? n.widget.lineBreaks : 0;
			r < 0 && (r = this.oracle.lineHeight);
			let a = t - e;
			n.block ? this.addBlock(new Ip(a, r, n)) : (a || i || r >= Vp) && this.addLineDeco(r, i, a);
		} else t > e && this.span(e, t);
		this.lineEnd > -1 && this.lineEnd < this.pos && (this.lineEnd = this.oracle.doc.lineAt(this.pos).to);
	}
	enterLine() {
		if (this.lineStart > -1) return;
		let { from: e, to: t } = this.oracle.doc.lineAt(this.pos);
		this.lineStart = e, this.lineEnd = t, this.writtenTo < e && ((this.writtenTo < e - 1 || this.nodes[this.nodes.length - 1] == null) && this.nodes.push(this.blankContent(this.writtenTo, e - 1)), this.nodes.push(null)), this.pos > e && this.nodes.push(new Lp(this.pos - e, -1, 0)), this.writtenTo = this.pos;
	}
	blankContent(e, t) {
		let n = new Rp(t - e);
		return this.oracle.doc.lineAt(e).to == t && (n.flags |= 4), n;
	}
	ensureLine() {
		this.enterLine();
		let e = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
		if (e instanceof Lp) return e;
		let t = new Lp(0, -1, 0);
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
		this.lineStart > -1 && !(t instanceof Lp) && !this.isCovered ? this.nodes.push(new Lp(0, -1, 0)) : (this.writtenTo < this.pos || t == null) && this.nodes.push(this.blankContent(this.writtenTo, this.pos));
		let n = e;
		for (let e of this.nodes) e instanceof Lp && e.updateHeight(this.oracle, n), n += e ? e.length : 1;
		return this.nodes;
	}
	static build(t, n, r, i) {
		let a = new e(r, t);
		return Jc.spans(n, r, i, a, 0), a.finish(r);
	}
};
function Up(e, t, n) {
	let r = new Wp();
	return Jc.compare(e, t, n, r, 0), r.changes;
}
var Wp = class {
	constructor() {
		this.changes = [];
	}
	compareRange() {}
	comparePoint(e, t, n, r) {
		(e < t || n && n.heightRelevant || r && r.heightRelevant) && Yl(e, t, this.changes, 5);
	}
};
function Gp(e, t) {
	let n = e.getBoundingClientRect(), r = e.ownerDocument, i = r.defaultView || window, a = Math.max(0, n.left), o = Math.min(i.innerWidth, n.right), s = Math.max(0, n.top), c = Math.min(i.innerHeight, n.bottom);
	for (let t = e.parentNode; t && t != r.body;) if (t.nodeType == 1) {
		let n = t, r = window.getComputedStyle(n);
		if ((n.scrollHeight > n.clientHeight || n.scrollWidth > n.clientWidth) && r.overflow != "visible") {
			let r = n.getBoundingClientRect();
			a = Math.max(a, r.left), o = Math.min(o, r.right), s = Math.max(s, r.top), c = Math.min(t == e.parentNode ? i.innerHeight : c, r.bottom);
		}
		t = r.position == "absolute" || r.position == "fixed" ? n.offsetParent : n.parentNode;
	} else if (t.nodeType == 11) t = t.host;
	else break;
	return {
		left: a - n.left,
		right: Math.max(a, o) - n.left,
		top: s - (n.top + t),
		bottom: Math.max(s, c) - (n.top + t)
	};
}
function Kp(e) {
	let t = e.getBoundingClientRect(), n = e.ownerDocument.defaultView || window;
	return t.left < n.innerWidth && t.right > 0 && t.top < n.innerHeight && t.bottom > 0;
}
function qp(e, t) {
	let n = e.getBoundingClientRect();
	return {
		left: 0,
		right: n.right - n.left,
		top: t,
		bottom: n.bottom - (n.top + t)
	};
}
var Jp = class {
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
		return Ul.replace({ widget: new Yp(this.displaySize * (t ? e.scaleY : e.scaleX), t) }).range(this.from, this.to);
	}
}, Yp = class extends Vl {
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
}, Xp = class {
	constructor(e, t) {
		this.view = e, this.state = t, this.pixelViewport = {
			left: 0,
			right: window.innerWidth,
			top: 0,
			bottom: 0
		}, this.inView = !0, this.paddingTop = 0, this.paddingBottom = 0, this.contentDOMWidth = 0, this.contentDOMHeight = 0, this.editorHeight = 0, this.editorWidth = 0, this.scaleX = 1, this.scaleY = 1, this.scrollOffset = 0, this.scrolledToBottom = !1, this.scrollAnchorPos = 0, this.scrollAnchorHeight = -1, this.scaler = nm, this.scrollTarget = null, this.printing = !1, this.mustMeasureContent = !0, this.defaultTextDirection = Tu.LTR, this.visibleRanges = [], this.mustEnforceCursorAssoc = !1;
		let n = t.facet(hd).some((e) => typeof e != "function" && e.class == "cm-lineWrapping");
		this.heightOracle = new kp(n), this.stateDeco = rm(t), this.heightMap = Np.empty().applyChanges(this.stateDeco, L.empty, this.heightOracle.setDoc(t.doc), [new Td(0, 0, 0, t.doc.length)]);
		for (let e = 0; e < 2 && (this.viewport = this.getViewport(0, null), this.updateForViewport()); e++);
		this.updateViewportLines(), this.lineGaps = this.ensureLineGaps([]), this.lineGapDeco = Ul.set(this.lineGaps.map((e) => e.draw(this, !1))), this.scrollParent = e.scrollDOM, this.computeVisibleRanges();
	}
	updateForViewport() {
		let e = [this.viewport], { main: t } = this.state.selection;
		for (let n = 0; n <= 1; n++) {
			let r = n ? t.head : t.anchor;
			if (!e.some(({ from: e, to: t }) => r >= e && r <= t)) {
				let { from: t, to: n } = this.lineBlockAt(r);
				e.push(new Zp(t, n));
			}
		}
		return this.viewports = e.sort((e, t) => e.from - t.from), this.updateScaler();
	}
	updateScaler() {
		let e = this.scaler;
		return this.scaler = this.heightMap.height <= 7e6 ? nm : new im(this.heightOracle, this.heightMap, this.viewports), e.eq(this.scaler) ? 0 : 2;
	}
	updateViewportLines() {
		this.viewportLines = [], this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (e) => {
			this.viewportLines.push(am(e, this.scaler));
		});
	}
	update(e, t = null) {
		this.state = e.state;
		let n = this.stateDeco;
		this.stateDeco = rm(this.state);
		let r = e.changedRanges, i = Td.extendWithRanges(r, Up(n, this.stateDeco, e ? e.changes : Us.empty(this.state.doc.length))), a = this.heightMap.height, o = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollOffset);
		Op(), this.heightMap = this.heightMap.applyChanges(this.stateDeco, e.startState.doc, this.heightOracle.setDoc(this.state.doc), i), (this.heightMap.height != a || Dp) && (e.flags |= 2), o ? (this.scrollAnchorPos = e.changes.mapPos(o.from, -1), this.scrollAnchorHeight = o.top) : (this.scrollAnchorPos = -1, this.scrollAnchorHeight = a);
		let s = i.length ? this.mapViewport(this.viewport, e.changes) : this.viewport;
		(t && (t.range.head < s.from || t.range.head > s.to) || !this.viewportIsAppropriate(s)) && (s = this.getViewport(0, t));
		let c = s.from != this.viewport.from || s.to != this.viewport.to;
		this.viewport = s, e.flags |= this.updateForViewport(), (c || !e.changes.empty || e.flags & 2) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, e.changes))), e.flags |= this.computeVisibleRanges(e.changes), t && (this.scrollTarget = t), !this.mustEnforceCursorAssoc && (e.selectionSet || e.focusChanged) && e.view.lineWrapping && e.state.selection.main.empty && e.state.selection.main.assoc && !e.state.facet(rd) && (this.mustEnforceCursorAssoc = !0);
	}
	measure() {
		let { view: e } = this, t = e.contentDOM, n = window.getComputedStyle(t), r = this.heightOracle, i = n.whiteSpace;
		this.defaultTextDirection = n.direction == "rtl" ? Tu.RTL : Tu.LTR;
		let a = this.heightOracle.mustRefreshForWrapping(i) || this.mustMeasureContent === "refresh", o = t.getBoundingClientRect(), s = a || this.mustMeasureContent || this.contentDOMHeight != o.height;
		this.contentDOMHeight = o.height, this.mustMeasureContent = !1;
		let c = 0, l = 0;
		if (o.width && o.height) {
			let { scaleX: e, scaleY: n } = cu(t, o);
			(e > .005 && Math.abs(this.scaleX - e) > .005 || n > .005 && Math.abs(this.scaleY - n) > .005) && (this.scaleX = e, this.scaleY = n, c |= 16, a = s = !0);
		}
		let u = (parseInt(n.paddingTop) || 0) * this.scaleY, d = (parseInt(n.paddingBottom) || 0) * this.scaleY;
		(this.paddingTop != u || this.paddingBottom != d) && (this.paddingTop = u, this.paddingBottom = d, c |= 18), this.editorWidth != e.scrollDOM.clientWidth && (r.lineWrapping && (s = !0), this.editorWidth = e.scrollDOM.clientWidth, c |= 16);
		let f = uu(this.view.contentDOM, !1).y;
		f != this.scrollParent && (this.scrollParent = f, this.scrollAnchorHeight = -1, this.scrollOffset = 0);
		let p = this.getScrollOffset();
		this.scrollOffset != p && (this.scrollAnchorHeight = -1, this.scrollOffset = p), this.scrolledToBottom = xu(this.scrollParent || e.win);
		let m = (this.printing ? qp : Gp)(t, this.paddingTop), h = m.top - this.pixelViewport.top, g = m.bottom - this.pixelViewport.bottom;
		this.pixelViewport = m;
		let _ = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
		if (_ != this.inView && (this.inView = _, _ && (s = !0)), !this.inView && !this.scrollTarget && !Kp(e.dom)) return 0;
		let v = o.width;
		if ((this.contentDOMWidth != v || this.editorHeight != e.scrollDOM.clientHeight) && (this.contentDOMWidth = o.width, this.editorHeight = e.scrollDOM.clientHeight, c |= 16), s) {
			let t = e.docView.measureVisibleLineHeights(this.viewport);
			if (r.mustRefreshForHeights(t) && (a = !0), a || r.lineWrapping && Math.abs(v - this.contentDOMWidth) > r.charWidth) {
				let { lineHeight: n, charWidth: o, textHeight: s } = e.docView.measureTextSize();
				a = n > 0 && r.refresh(i, n, o, s, Math.max(5, v / o), t), a && (e.docView.minWidth = 0, c |= 16);
			}
			h > 0 && g > 0 ? l = Math.max(h, g) : h < 0 && g < 0 && (l = Math.min(h, g)), Op();
			for (let n of this.viewports) {
				let i = n.from == this.viewport.from ? t : e.docView.measureVisibleLineHeights(n);
				this.heightMap = (a ? Np.empty().applyChanges(this.stateDeco, L.empty, this.heightOracle, [new Td(0, 0, 0, e.state.doc.length)]) : this.heightMap).updateHeight(r, 0, a, new Ap(n.from, i));
			}
			Dp && (c |= 2);
		}
		let y = !this.viewportIsAppropriate(this.viewport, l) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
		return y && (c & 2 && (c |= this.updateScaler()), this.viewport = this.getViewport(l, this.scrollTarget), c |= this.updateForViewport()), (c & 2 || y) && this.updateViewportLines(), (this.lineGaps.length || this.viewport.to - this.viewport.from > 4e3) && this.updateLineGaps(this.ensureLineGaps(a ? [] : this.lineGaps, e)), c |= this.computeVisibleRanges(), this.mustEnforceCursorAssoc && (this.mustEnforceCursorAssoc = !1, e.docView.enforceCursorAssoc()), c;
	}
	get visibleTop() {
		return this.scaler.fromDOM(this.pixelViewport.top);
	}
	get visibleBottom() {
		return this.scaler.fromDOM(this.pixelViewport.bottom);
	}
	getViewport(e, t) {
		let n = .5 - Math.max(-.5, Math.min(.5, e / 1e3 / 2)), r = this.heightMap, i = this.heightOracle, { visibleTop: a, visibleBottom: o } = this, s = new Zp(r.lineAt(a - n * 1e3, H.ByHeight, i, 0, 0).from, r.lineAt(o + (1 - n) * 1e3, H.ByHeight, i, 0, 0).to);
		if (t) {
			let { head: e } = t.range;
			if (e < s.from || e > s.to) {
				let n = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top), a = r.lineAt(e, H.ByPos, i, 0, 0), o;
				o = t.y == "center" ? (a.top + a.bottom) / 2 - n / 2 : t.y == "start" || t.y == "nearest" && e < s.from ? a.top : a.bottom - n, s = new Zp(r.lineAt(o - 500, H.ByHeight, i, 0, 0).from, r.lineAt(o + n + 500, H.ByHeight, i, 0, 0).to);
			}
		}
		return s;
	}
	mapViewport(e, t) {
		let n = t.mapPos(e.from, -1), r = t.mapPos(e.to, 1);
		return new Zp(this.heightMap.lineAt(n, H.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(r, H.ByPos, this.heightOracle, 0, 0).to);
	}
	viewportIsAppropriate({ from: e, to: t }, n = 0) {
		if (!this.inView) return !0;
		let { top: r } = this.heightMap.lineAt(e, H.ByPos, this.heightOracle, 0, 0), { bottom: i } = this.heightMap.lineAt(t, H.ByPos, this.heightOracle, 0, 0), { visibleTop: a, visibleBottom: o } = this;
		return (e == 0 || r <= a - Math.max(10, Math.min(-n, 250))) && (t == this.state.doc.length || i >= o + Math.max(10, Math.min(n, 250))) && r > a - 2e3 && i < o + 2e3;
	}
	mapLineGaps(e, t) {
		if (!e.length || t.empty) return e;
		let n = [];
		for (let r of e) t.touchesRange(r.from, r.to) || n.push(new Jp(t.mapPos(r.from), t.mapPos(r.to), r.size, r.displaySize));
		return n;
	}
	ensureLineGaps(e, t) {
		let n = this.heightOracle.lineWrapping, r = n ? 1e4 : 2e3, i = r >> 1, a = r << 1;
		if (this.defaultTextDirection != Tu.LTR && !n) return [];
		let o = [], s = (r, a, c, l) => {
			if (a - r < i) return;
			let u = this.state.selection.main, d = [u.from];
			u.empty || d.push(u.to);
			for (let e of d) if (e > r && e < a) {
				s(r, e - 10, c, l), s(e + 10, a, c, l);
				return;
			}
			let f = tm(e, (e) => e.from >= c.from && e.to <= c.to && Math.abs(e.from - r) < i && Math.abs(e.to - a) < i && !d.some((t) => e.from < t && e.to > t));
			if (!f) {
				if (a < c.to && t && n && t.visibleRanges.some((e) => e.from <= a && e.to >= a)) {
					let e = t.moveToLineBoundary(R.cursor(a), !1, !0).head;
					e > r && (a = e);
				}
				let e = this.gapSize(c, r, a, l);
				f = new Jp(r, a, e, n || e < 2e6 ? e : 2e6);
			}
			o.push(f);
		}, c = (t) => {
			if (t.length < a || t.type != Hl.Text) return;
			let i = Qp(t.from, t.to, this.stateDeco);
			if (i.total < a) return;
			let o = this.scrollTarget ? this.scrollTarget.range.head : null, c, l;
			if (n) {
				let e = r / this.heightOracle.lineLength * this.heightOracle.lineHeight, n, a;
				if (o != null) {
					let r = em(i, o), s = ((this.visibleBottom - this.visibleTop) / 2 + e) / t.height;
					n = r - s, a = r + s;
				} else n = (this.visibleTop - t.top - e) / t.height, a = (this.visibleBottom - t.top + e) / t.height;
				c = $p(i, n), l = $p(i, a);
			} else {
				let n = i.total * this.heightOracle.charWidth, a = r * this.heightOracle.charWidth, s = 0;
				if (n > 2e6) for (let n of e) n.from >= t.from && n.from < t.to && n.size != n.displaySize && n.from * this.heightOracle.charWidth + s < this.pixelViewport.left && (s = n.size - n.displaySize);
				let u = this.pixelViewport.left + s, d = this.pixelViewport.right + s, f, p;
				if (o != null) {
					let e = em(i, o), t = ((d - u) / 2 + a) / n;
					f = e - t, p = e + t;
				} else f = (u - a) / n, p = (d + a) / n;
				c = $p(i, f), l = $p(i, p);
			}
			c > t.from && s(t.from, c, t, i), l < t.to && s(l, t.to, t, i);
		};
		for (let e of this.viewportLines) Array.isArray(e.type) ? e.type.forEach(c) : c(e);
		return o;
	}
	gapSize(e, t, n, r) {
		let i = em(r, n) - em(r, t);
		return this.heightOracle.lineWrapping ? e.height * i : r.total * this.heightOracle.charWidth * i;
	}
	updateLineGaps(e) {
		Jp.same(e, this.lineGaps) || (this.lineGaps = e, this.lineGapDeco = Ul.set(e.map((e) => e.draw(this, this.heightOracle.lineWrapping))));
	}
	computeVisibleRanges(e) {
		let t = this.stateDeco;
		this.lineGaps.length && (t = t.concat(this.lineGapDeco));
		let n = [];
		Jc.spans(t, this.viewport.from, this.viewport.to, {
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
		return e >= this.viewport.from && e <= this.viewport.to && this.viewportLines.find((t) => t.from <= e && t.to >= e) || am(this.heightMap.lineAt(e, H.ByPos, this.heightOracle, 0, 0), this.scaler);
	}
	lineBlockAtHeight(e) {
		return e >= this.viewportLines[0].top && e <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((t) => t.top <= e && t.bottom >= e) || am(this.heightMap.lineAt(this.scaler.fromDOM(e), H.ByHeight, this.heightOracle, 0, 0), this.scaler);
	}
	getScrollOffset() {
		return this.scrollParent == this.view.scrollDOM ? this.scrollParent.scrollTop * this.scaleY : (this.scrollParent ? this.scrollParent.getBoundingClientRect().top : 0) - this.view.contentDOM.getBoundingClientRect().top;
	}
	scrollAnchorAt(e) {
		let t = this.lineBlockAtHeight(e + 8);
		return t.from >= this.viewport.from || this.viewportLines[0].top - e > 200 ? t : this.viewportLines[0];
	}
	elementAtHeight(e) {
		return am(this.heightMap.blockAt(this.scaler.fromDOM(e), this.heightOracle, 0, 0), this.scaler);
	}
	get docHeight() {
		return this.scaler.toDOM(this.heightMap.height);
	}
	get contentHeight() {
		return this.docHeight + this.paddingTop + this.paddingBottom;
	}
}, Zp = class {
	constructor(e, t) {
		this.from = e, this.to = t;
	}
};
function Qp(e, t, n) {
	let r = [], i = e, a = 0;
	return Jc.spans(n, e, t, {
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
function $p({ total: e, ranges: t }, n) {
	if (n <= 0) return t[0].from;
	if (n >= 1) return t[t.length - 1].to;
	let r = Math.floor(e * n);
	for (let e = 0;; e++) {
		let { from: n, to: i } = t[e], a = i - n;
		if (r <= a) return n + r;
		r -= a;
	}
}
function em(e, t) {
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
function tm(e, t) {
	for (let n of e) if (t(n)) return n;
}
var nm = {
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
function rm(e) {
	let t = e.facet(gd).filter((e) => typeof e != "function"), n = e.facet(vd).filter((e) => typeof e != "function");
	return n.length && t.push(Jc.join(n)), t;
}
var im = class e {
	constructor(e, t, n) {
		let r = 0, i = 0, a = 0;
		this.viewports = n.map(({ from: n, to: i }) => {
			let a = t.lineAt(n, H.ByPos, e, 0, 0).top, o = t.lineAt(i, H.ByPos, e, 0, 0).bottom;
			return r += o - a, {
				from: n,
				to: i,
				top: a,
				bottom: o,
				domTop: 0,
				domBottom: 0
			};
		}), this.scale = (7e6 - r) / (t.height - r);
		for (let e of this.viewports) e.domTop = a + (e.top - i) * this.scale, a = e.domBottom = e.domTop + (e.bottom - e.top), i = e.bottom;
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
function am(e, t) {
	if (t.scale == 1) return e;
	let n = t.toDOM(e.top), r = t.toDOM(e.bottom);
	return new jp(e.from, e.length, n, r - n, Array.isArray(e._content) ? e._content.map((e) => am(e, t)) : e._content);
}
var om = /*@__PURE__*/ z.define({ combine: (e) => e.join(" ") }), sm = /*@__PURE__*/ z.define({ combine: (e) => e.indexOf(!0) > -1 }), cm = /*@__PURE__*/ ml.newName(), lm = /*@__PURE__*/ ml.newName(), um = /*@__PURE__*/ ml.newName(), dm = {
	"&light": "." + lm,
	"&dark": "." + um
};
function fm(e, t, n) {
	return new ml(t, { finish(t) {
		return /&/.test(t) ? t.replace(/&\w*/, (t) => {
			if (t == "&") return e;
			if (!n || !n[t]) throw RangeError(`Unsupported selector: ${t}`);
			return n[t];
		}) : e + " " + t;
	} });
}
var pm = /*@__PURE__*/ fm("." + cm, {
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
		verticalAlign: "text-top",
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
}, dm), mm = {
	childList: !0,
	characterData: !0,
	subtree: !0,
	attributes: !0,
	characterDataOldValue: !0
}, hm = B.ie && B.ie_version <= 11, gm = class {
	constructor(e) {
		this.view = e, this.active = !1, this.editContext = null, this.selectionRange = new du(), this.selectionChanged = !1, this.delayedFlush = -1, this.resizeTimeout = -1, this.queue = [], this.delayedAndroidKey = null, this.flushingAndroidKey = -1, this.lastChange = 0, this.scrollTargets = [], this.intersection = null, this.resizeScroll = null, this.intersecting = !1, this.gapIntersection = null, this.gaps = [], this.printQuery = null, this.parentCheck = -1, this.dom = e.contentDOM, this.observer = new MutationObserver((t) => {
			for (let e of t) this.queue.push(e);
			(B.ie && B.ie_version <= 11 || B.ios && e.composing) && t.some((e) => e.type == "childList" && e.removedNodes.length || e.type == "characterData" && e.oldValue.length > e.target.nodeValue.length) ? this.flushSoon() : this.flush();
		}), window.EditContext && B.android && e.constructor.EDIT_CONTEXT !== !1 && !(B.chrome && B.chrome_version < 126) && (this.editContext = new bm(e), e.state.facet(ld) && (e.contentDOM.editContext = this.editContext.editContext)), hm && (this.onCharData = (e) => {
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
		this.intersecting && this.flush(!1), this.editContext && this.view.requestMeasure(this.editContext.measureReq), this.onScrollChanged(e);
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
		if (!this.readSelectionRange() || this.delayedAndroidKey) return;
		let { view: n } = this, r = this.selectionRange;
		if (n.state.facet(ld) ? n.root.activeElement != this.dom : !$l(this.dom, r)) return;
		let i = r.anchorNode && n.docView.tile.nearest(r.anchorNode);
		if (i && i.isWidget() && i.widget.ignoreEvent(e)) {
			t || (this.selectionChanged = !1);
			return;
		}
		(B.ie && B.ie_version <= 11 || B.android && B.chrome) && !n.state.selection.main.empty && r.focusNode && tu(r.focusNode, r.focusOffset, r.anchorNode, r.anchorOffset) ? this.flushSoon() : this.flush(!1);
	}
	readSelectionRange() {
		let { view: e } = this, t = Zl(e.root);
		if (!t) return !1;
		let n = B.safari && e.root.nodeType == 11 && e.root.activeElement == this.dom && ym(this.view, t) || t;
		if (!n || this.selectionRange.eq(n)) return !1;
		let r = $l(this.dom, n);
		return r && !this.selectionChanged && e.inputState.lastFocusTime > Date.now() - 200 && e.inputState.lastTouchTime < Date.now() - 300 && bu(this.dom, n) ? (this.view.inputState.lastFocusTime = 0, e.docView.updateSelection(), !1) : (this.selectionRange.setRange(n), r && (this.selectionChanged = !0), !0);
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
		for (let n = this.dom; n;) if (n.nodeType == 1) !t && e < this.scrollTargets.length && this.scrollTargets[e] == n ? e++ : t ||= this.scrollTargets.slice(0, e), t && t.push(n), n = n.assignedSlot || n.parentNode;
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
		this.active ||= (this.observer.observe(this.dom, mm), hm && this.dom.addEventListener("DOMCharacterDataModified", this.onCharData), !0);
	}
	stop() {
		this.active && (this.active = !1, this.observer.disconnect(), hm && this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData));
	}
	clear() {
		this.processRecords(), this.queue.length = 0, this.selectionChanged = !1;
	}
	delayAndroidKey(e, t) {
		if (!this.delayedAndroidKey) {
			let e = () => {
				let e = this.delayedAndroidKey;
				e && (this.clearDelayedAndroidKey(), this.view.inputState.lastKeyCode = e.keyCode, this.view.inputState.lastKeyTime = Date.now(), !this.flush() && e.force && vu(this.dom, e.key, e.keyCode));
			};
			this.flushingAndroidKey = this.view.win.requestAnimationFrame(e);
		}
		(!this.delayedAndroidKey || e == "Enter") && (this.delayedAndroidKey = {
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
	forceFlush() {
		this.delayedFlush >= 0 && (this.view.win.cancelAnimationFrame(this.delayedFlush), this.delayedFlush = -1), this.flush();
	}
	pendingRecords() {
		for (let e of this.observer.takeRecords()) this.queue.push(e);
		return this.queue;
	}
	processRecords() {
		let e = this.pendingRecords();
		e.length && (this.queue = []);
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
		let { from: e, to: t, typeOver: n } = this.processRecords(), r = this.selectionChanged && $l(this.dom, this.selectionRange);
		if (e < 0 && !r) return null;
		e > -1 && (this.lastChange = Date.now()), this.view.inputState.lastFocusTime = 0, this.selectionChanged = !1;
		let i = new Nf(this.view, e, t, n);
		return this.view.docView.domChanged = { newSel: i.newSel ? i.newSel.main : null }, i;
	}
	flush(e = !0) {
		if (this.delayedFlush >= 0 || this.delayedAndroidKey) return !1;
		e && this.readSelectionRange();
		let t = this.readChange();
		if (!t) return this.view.requestMeasure(), !1;
		let n = this.view.state, r = Ff(this.view, t);
		return this.view.state == n && (t.domChanged || t.newSel && !Vf(this.view.state.selection, t.newSel.main)) && this.view.update([]), r;
	}
	readMutation(e) {
		let t = this.view.docView.tile.nearest(e.target);
		if (!t || t.isWidget()) return null;
		if (t.markDirty(e.type == "attributes"), e.type == "childList") {
			let n = _m(t, e.previousSibling || e.target.previousSibling, -1), r = _m(t, e.nextSibling || e.target.nextSibling, 1);
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
		this.editContext && (this.editContext.update(e), e.startState.facet(ld) != e.state.facet(ld) && (e.view.contentDOM.editContext = e.state.facet(ld) ? this.editContext.editContext : null));
	}
	destroy() {
		var e, t, n;
		this.stop(), (e = this.intersection) == null || e.disconnect(), (t = this.gapIntersection) == null || t.disconnect(), (n = this.resizeScroll) == null || n.disconnect();
		for (let e of this.scrollTargets) e.removeEventListener("scroll", this.onScroll);
		this.removeWindowListeners(this.win), clearTimeout(this.parentCheck), clearTimeout(this.resizeTimeout), this.win.cancelAnimationFrame(this.delayedFlush), this.win.cancelAnimationFrame(this.flushingAndroidKey), this.editContext && (this.view.contentDOM.editContext = null, this.editContext.destroy());
	}
};
function _m(e, t, n) {
	for (; t;) {
		let r = Od.get(t);
		if (r && r.parent == e) return r;
		let i = t.parentNode;
		t = i == e.dom ? n > 0 ? t.nextSibling : t.previousSibling : i;
	}
	return null;
}
function vm(e, t) {
	let n = t.startContainer, r = t.startOffset, i = t.endContainer, a = t.endOffset, o = e.docView.domAtPos(e.state.selection.main.anchor, 1);
	return tu(o.node, o.offset, i, a) && ([n, r, i, a] = [
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
function ym(e, t) {
	if (t.getComposedRanges) {
		let n = t.getComposedRanges(e.root)[0];
		if (n) return vm(e, n);
	}
	let n = null;
	function r(e) {
		e.preventDefault(), e.stopImmediatePropagation(), n = e.getTargetRanges()[0];
	}
	return e.contentDOM.addEventListener("beforeinput", r, !0), e.dom.ownerDocument.execCommand("indent"), e.contentDOM.removeEventListener("beforeinput", r, !0), n ? vm(e, n) : null;
}
var bm = class {
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
			let l = Rf(e.state.sliceDoc(o, s), n.text, (c ? r.from : r.to) - o, c ? "end" : null);
			if (!l) {
				let t = R.single(this.toEditorPos(n.selectionStart), this.toEditorPos(n.selectionEnd));
				Vf(t, r) || e.dispatch({
					selection: t,
					userEvent: "select"
				});
				return;
			}
			let u = {
				from: l.from + o,
				to: l.toA + o,
				insert: L.of(n.text.slice(l.from, l.toB).split("\n"))
			};
			if ((B.mac || B.android) && u.from == a - 1 && /^\. ?$/.test(n.text) && e.contentDOM.getAttribute("autocorrect") == "off" && (u = {
				from: o,
				to: s,
				insert: L.of([n.text.replace(".", " ")])
			}), this.pendingContextChange = u, !e.state.readOnly) {
				let t = this.to - this.from + (u.to - u.from + u.insert.length);
				If(e, u, R.single(this.toEditorPos(n.selectionStart, t), this.toEditorPos(n.selectionEnd, t)));
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
						n.push(Ul.mark({ attributes: { style: e } }).range(i, a));
					}
				}
			}
			e.dispatch({ effects: sd.of(Ul.set(n)) });
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
			let t = Zl(e.root);
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
}, U = class e {
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
		this.dispatchTransactions = e.dispatchTransactions || t && ((e) => e.forEach((e) => t(e, this))) || ((e) => this.update(e)), this.dispatch = this.dispatch.bind(this), this._root = e.root || yu(e.parent) || document, this.viewState = new Xp(this, e.state || Vc.create(e)), e.scrollTo && e.scrollTo.is(od) && (this.viewState.scrollTarget = e.scrollTo.value.clip(this.viewState.state)), this.plugins = this.state.facet(dd).map((e) => new pd(e));
		for (let e of this.plugins) e.update(this);
		this.observer = new gm(this), this.inputState = new Hf(this), this.inputState.ensureHandlers(this.plugins), this.docView = new tf(this), this.mountStyles(), this.updateAttrs(), this.updateState = 0, this.requestMeasure(), document.fonts?.ready && document.fonts.ready.then(() => {
			this.viewState.mustMeasureContent = "refresh", this.requestMeasure();
		});
	}
	dispatch(...e) {
		let t = e.length == 1 && e[0] instanceof Dc ? e : e.length == 1 && Array.isArray(e[0]) ? e[0] : [this.state.update(...e)];
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
		t.some((e) => e.annotation(xp)) ? (this.inputState.notifiedFocused = o, s = 1) : o != this.inputState.notifiedFocused && (this.inputState.notifiedFocused = o, c = Sp(a, o), c || (s = 1));
		let l = this.observer.delayedAndroidKey, u = null;
		if (l ? (this.observer.clearDelayedAndroidKey(), u = this.observer.readChange(), (u && !this.state.doc.eq(a.doc) || !this.state.selection.eq(a.selection)) && (u = null)) : this.observer.clear(), a.facet(Vc.phrases) != this.state.facet(Vc.phrases)) return this.setState(a);
		i = Ed.create(this, a, t), i.flags |= s;
		let d = this.viewState.scrollTarget;
		try {
			this.updateState = 2;
			for (let n of t) {
				if (d &&= d.map(n.changes), n.scrollIntoView) {
					let { main: t } = n.state.selection, { x: r, y: i } = this.state.facet(e.cursorScrollMargin);
					d = new ad(t.empty ? t : R.cursor(t.head, t.head > t.anchor ? -1 : 1), "nearest", "nearest", i, r);
				}
				for (let e of n.effects) e.is(od) && (d = e.value.clip(this.state));
			}
			this.viewState.update(i, d), this.bidiCache = Cm.update(this.bidiCache, i.changes), i.empty || (this.updatePlugins(i), this.inputState.update(i)), n = this.docView.update(i), this.state.facet(wd) != this.styleModules && this.mountStyles(), r = this.updateAttrs(), this.showAnnouncements(t), this.docView.updateSelection(n, t.some((e) => e.isUserEvent("select.pointer")));
		} finally {
			this.updateState = 0;
		}
		if (i.startState.facet(om) != i.state.facet(om) && (this.viewState.mustMeasureContent = !0), (n || r || d || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent) && this.requestMeasure(), n && this.docViewUpdate(), !i.empty) for (let e of this.state.facet(Zu)) try {
			e(i);
		} catch (e) {
			cd(this.state, e, "update listener");
		}
		(c || u) && Promise.resolve().then(() => {
			c && this.state == c.startState && this.dispatch(c), u && !Ff(this, u) && l.force && vu(this.contentDOM, l.key, l.keyCode);
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
			this.viewState = new Xp(this, e), this.plugins = e.facet(dd).map((e) => new pd(e)), this.pluginMap.clear();
			for (let e of this.plugins) e.update(this);
			this.docView.destroy(), this.docView = new tf(this), this.inputState.ensureHandlers(this.plugins), this.mountStyles(), this.updateAttrs(), this.bidiCache = [];
		} finally {
			this.updateState = 0;
		}
		t && this.focus(), this.requestMeasure();
	}
	updatePlugins(e) {
		let t = e.startState.facet(dd), n = e.state.facet(dd);
		if (t != n) {
			let r = [];
			for (let i of n) {
				let n = t.indexOf(i);
				if (n < 0) r.push(new pd(i));
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
				cd(this.state, e, "doc view update listener");
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
					if (xu(n || this.win)) i = -1, a = this.viewState.heightMap.height / this.viewState.scaleY;
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
						return cd(this.state, e), Sm;
					}
				}), u = Ed.create(this, this.state, []), d = !1;
				u.flags |= s, t ? t.flags |= s : t = u, this.updateState = 2, u.empty || (this.updatePlugins(u), this.inputState.update(u), this.updateAttrs(), d = this.docView.update(u), d && this.docViewUpdate());
				for (let e = 0; e < c.length; e++) if (l[e] != Sm) try {
					let t = c[e];
					t.write && t.write(l[e], this);
				} catch (e) {
					cd(this.state, e);
				}
				if (d && this.docView.updateSelection(!0), !u.viewportChanged && this.measureRequests.length == 0) {
					if (this.viewState.editorHeight) {
						if (this.viewState.scrollTarget) {
							this.docView.scrollIntoView(this.viewState.scrollTarget), this.viewState.scrollTarget = null, a = -1;
							continue;
						}
						{
							let e = (i < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(i).top) / this.viewState.scaleY - a / o;
							if ((e > 1 || e < -1) && !(B.ios && this.inputState.lastIOSMomentumScroll > Date.now() - 100) && (n == this.scrollDOM || this.hasFocus || Math.max(this.inputState.lastWheelEvent, this.inputState.lastTouchTime) > Date.now() - 100)) {
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
		if (t && !t.empty) for (let e of this.state.facet(Zu)) e(t);
	}
	get themeClasses() {
		return cm + " " + (this.state.facet(sm) ? um : lm) + " " + this.state.facet(om);
	}
	updateAttrs() {
		let e = wm(this, md, { class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses }), t = {
			spellcheck: "false",
			autocorrect: "off",
			autocapitalize: "off",
			writingsuggestions: "false",
			translate: "no",
			contenteditable: this.state.facet(ld) ? "true" : "false",
			class: "cm-content",
			style: `${B.tabSize}: ${this.state.tabSize}`,
			role: "textbox",
			"aria-multiline": "true"
		};
		this.state.readOnly && (t["aria-readonly"] = "true"), wm(this, hd, t);
		let n = this.observer.ignore(() => {
			let n = zl(this.contentDOM, this.contentAttrs, t), r = zl(this.dom, this.editorAttrs, e);
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
		this.styleModules = this.state.facet(wd);
		let t = this.state.facet(e.cspNonce);
		ml.mount(this.root, this.styleModules.concat(pm).reverse(), t ? { nonce: t } : void 0);
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
		return wf(this, e, yf(this, e, t, n));
	}
	moveByGroup(e, t) {
		return wf(this, e, yf(this, e, t, (t) => bf(this, e.head, t)));
	}
	visualLineSide(e, t) {
		return t ? R.cursor(e.to, 1) : R.cursor(e.from, -1);
	}
	moveToLineBoundary(e, t, n = !0) {
		return vf(this, e, t, n);
	}
	moveVertically(e, t, n) {
		return wf(this, e, xf(this, e, t, n));
	}
	domAtPos(e, t = 1) {
		return this.docView.domAtPos(e, t);
	}
	posAtDOM(e, t = 0) {
		return this.docView.posFromDOM(e, t);
	}
	posAtCoords(e, t = !0) {
		this.readMeasured();
		let n = Ef(this, e, t);
		return n && n.pos;
	}
	posAndSideAtCoords(e, t = !0) {
		return this.readMeasured(), Ef(this, e, t);
	}
	coordsAtPos(e, t = 1) {
		this.readMeasured();
		let n = this.state.doc.lineAt(e), r = this.bidiSpans(n), i = r[Fu.find(r, e - n.from, -1, t)];
		return n.length && (e == n.from && t < 0 || e == n.to && t > 0) && i.dir != this.textDirectionAt(n.from) && (e == n.to ? (e = n.from + i.from, t = 1) : (e = n.from + i.to, t = -1)), this.docView.coordsAt(e, t, i.dir == Tu.RTL);
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
		return !this.state.facet(nd) || e < this.viewport.from || e > this.viewport.to ? this.textDirection : (this.readMeasured(), this.docView.textDirectionAt(e));
	}
	get lineWrapping() {
		return this.viewState.heightOracle.lineWrapping;
	}
	bidiSpans(e) {
		if (e.length > xm) return Uu(e.length);
		let t = this.textDirectionAt(e.from), n;
		for (let r of this.bidiCache) if (r.from == e.from && r.dir == t && (r.fresh || Iu(r.isolates, n = xd(this, e)))) return r.order;
		n ||= xd(this, e);
		let r = Hu(e.text, t, n);
		return this.bidiCache.push(new Cm(e.from, e.to, t, n, !0, r)), r;
	}
	get hasFocus() {
		return (this.dom.ownerDocument.hasFocus() || B.safari && this.inputState?.lastContextMenu > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
	}
	focus() {
		this.observer.ignore(() => {
			hu(this.contentDOM), this.docView.updateSelection();
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
		return od.of(new ad(typeof e == "number" ? R.cursor(e) : e, t.y ?? "nearest", t.x ?? "nearest", t.yMargin ?? 5, t.xMargin ?? 5));
	}
	scrollSnapshot() {
		let { scrollTop: e, scrollLeft: t } = this.scrollDOM, n = this.viewState.scrollAnchorAt(e);
		return od.of(new ad(R.cursor(n.from), "start", "start", n.top - e, t, !0));
	}
	setTabFocusMode(e) {
		e == null ? this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1 : typeof e == "boolean" ? this.inputState.tabFocusMode = e ? 0 : -1 : this.inputState.tabFocusMode != 0 && (this.inputState.tabFocusMode = Date.now() + e);
	}
	static domEventHandlers(e) {
		return fd.define(() => ({}), { eventHandlers: e });
	}
	static domEventObservers(e) {
		return fd.define(() => ({}), { eventObservers: e });
	}
	static theme(e, t) {
		let n = ml.newName(), r = [om.of(n), wd.of(fm(`.${n}`, e))];
		return t && t.dark && r.push(sm.of(!0)), r;
	}
	static baseTheme(e) {
		return cc.lowest(wd.of(fm("." + cm, e, dm)));
	}
	static findFromDOM(e) {
		let t = e.querySelector(".cm-content");
		return (t && Od.get(t) || Od.get(e))?.root?.view || null;
	}
};
U.styleModule = wd, U.inputHandler = Qu, U.clipboardInputFilter = ed, U.clipboardOutputFilter = td, U.scrollHandler = id, U.focusChangeEffect = $u, U.perLineTextDirection = nd, U.exceptionSink = Xu, U.updateListener = Zu, U.editable = ld, U.mouseSelectionStyle = Yu, U.dragMovesSelection = Ju, U.clickAddsSelectionRange = qu, U.decorations = gd, U.blockWrappers = _d, U.outerDecorations = vd, U.atomicRanges = yd, U.bidiIsolatedRanges = bd, U.cursorScrollMargin = /*@__PURE__*/ z.define({ combine: (e) => {
	let t = 5, n = 5;
	for (let r of e) typeof r == "number" ? t = n = r : {x: t, y: n} = r;
	return {
		x: t,
		y: n
	};
} }), U.scrollMargins = Sd, U.darkTheme = sm, U.cspNonce = /*@__PURE__*/ z.define({ combine: (e) => e.length ? e[0] : "" }), U.contentAttributes = hd, U.editorAttributes = md, U.lineWrapping = /*@__PURE__*/ U.contentAttributes.of({ class: "cm-lineWrapping" }), U.announce = /*@__PURE__*/ Ec.define();
var xm = 4096, Sm = {}, Cm = class e {
	constructor(e, t, n, r, i, a) {
		this.from = e, this.to = t, this.dir = n, this.isolates = r, this.fresh = i, this.order = a;
	}
	static update(t, n) {
		if (n.empty && !t.some((e) => e.fresh)) return t;
		let r = [], i = t.length ? t[t.length - 1].dir : Tu.LTR;
		for (let a = Math.max(0, t.length - 10); a < t.length; a++) {
			let o = t[a];
			o.dir == i && !n.touchesRange(o.from, o.to) && r.push(new e(n.mapPos(o.from, 1), n.mapPos(o.to, -1), o.dir, o.isolates, !1, o.order));
		}
		return r;
	}
};
function wm(e, t, n) {
	for (let r = e.state.facet(t), i = r.length - 1; i >= 0; i--) {
		let t = r[i], a = typeof t == "function" ? t(e) : t;
		a && Fl(a, n);
	}
	return n;
}
var Tm = B.mac ? "mac" : B.windows ? "win" : B.linux ? "linux" : "key";
function Em(e, t) {
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
function Dm(e, t, n) {
	return t.altKey && (e = "Alt-" + e), t.ctrlKey && (e = "Ctrl-" + e), t.metaKey && (e = "Meta-" + e), n !== !1 && t.shiftKey && (e = "Shift-" + e), e;
}
var Om = /*@__PURE__*/ cc.default(/*@__PURE__*/ U.domEventHandlers({ keydown(e, t) {
	return Im(jm(t.state), e, t, "editor");
} })), km = /*@__PURE__*/ z.define({ enables: Om }), Am = /*@__PURE__*/ new WeakMap();
function jm(e) {
	let t = e.facet(km), n = Am.get(t);
	return n || Am.set(t, n = Pm(t.reduce((e, t) => e.concat(t), []))), n;
}
var Mm = null, Nm = 4e3;
function Pm(e, t = Tm) {
	let n = Object.create(null), r = Object.create(null), i = (e, t) => {
		let n = r[e];
		if (n == null) r[e] = t;
		else if (n != t) throw Error("Key binding " + e + " is used both as a regular binding and as a multi-stroke prefix");
	}, a = (e, r, a, o, s) => {
		let c = n[e] || (n[e] = Object.create(null)), l = r.split(/ (?!$)/).map((e) => Em(e, t));
		for (let t = 1; t < l.length; t++) {
			let n = l.slice(0, t).join(" ");
			i(n, !0), c[n] || (c[n] = {
				preventDefault: !0,
				stopPropagation: !1,
				run: [(t) => {
					let r = Mm = {
						view: t,
						prefix: n,
						scope: e
					};
					return setTimeout(() => {
						Mm == r && (Mm = null);
					}, Nm), !0;
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
			for (let t in e) e[t].run.push((e) => i(e, Fm));
		}
		let i = r[t] || r.key;
		if (i) for (let t of e) a(t, i, r.run, r.preventDefault, r.stopPropagation), r.shift && a(t, "Shift-" + i, r.shift, r.preventDefault, r.stopPropagation);
	}
	return n;
}
var Fm = null;
function Im(e, t, n, r) {
	Fm = t;
	let i = Cl(t), a = zs(Rs(i, 0)) == i.length && i != " ", o = "", s = !1, c = !1, l = !1;
	Mm && Mm.view == n && Mm.scope == r && (o = Mm.prefix + " ", Jf.indexOf(t.keyCode) < 0 && (c = !0, Mm = null));
	let u = /* @__PURE__ */ new Set(), d = (e) => {
		if (e) {
			for (let t of e.run) if (!u.has(t) && (u.add(t), t(n))) return e.stopPropagation && (l = !0), !0;
			e.preventDefault && (e.stopPropagation && (l = !0), c = !0);
		}
		return !1;
	}, f = e[r], p, m;
	return f && (d(f[o + Dm(i, t, !a)]) ? s = !0 : a && (t.altKey || t.metaKey || t.ctrlKey) && !(B.windows && t.ctrlKey && t.altKey) && !(B.mac && t.altKey && !(t.ctrlKey || t.metaKey)) && (p = _l[t.keyCode]) && p != i ? (d(f[o + Dm(p, t, !0)]) || t.shiftKey && (m = vl[t.keyCode]) != i && m != p && d(f[o + Dm(m, t, !1)])) && (s = !0) : a && t.shiftKey && d(f[o + Dm(i, t, !0)]) && (s = !0), !s && d(f._any) && (s = !0)), c && (s = !0), s && l && t.stopPropagation(), Fm = null, s;
}
var Lm = class e {
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
			let a = Rm(t);
			return [new e(n, i.left - a.left, i.top - a.top, null, i.bottom - i.top)];
		}
		return Bm(t, n, r);
	}
};
function Rm(e) {
	let t = e.scrollDOM.getBoundingClientRect();
	return {
		left: (e.textDirection == Tu.LTR ? t.left : t.right - e.scrollDOM.clientWidth * e.scaleX) - e.scrollDOM.scrollLeft * e.scaleX,
		top: t.top - e.scrollDOM.scrollTop * e.scaleY
	};
}
function zm(e, t, n, r) {
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
function Bm(e, t, n) {
	if (n.to <= e.viewport.from || n.from >= e.viewport.to) return [];
	let r = Math.max(n.from, e.viewport.from), i = Math.min(n.to, e.viewport.to), a = e.textDirection == Tu.LTR, o = e.contentDOM, s = o.getBoundingClientRect(), c = Rm(e), l = o.querySelector(".cm-line"), u = l && window.getComputedStyle(l), d = s.left + (u ? parseInt(u.paddingLeft) + Math.min(0, parseInt(u.textIndent)) : 0), f = s.right - (u ? parseInt(u.paddingRight) : 0), p = _f(e, r, 1), m = _f(e, i, -1), h = p.type == Hl.Text ? p : null, g = m.type == Hl.Text ? m : null;
	if (h && (e.lineWrapping || p.widgetLineBreaks) && (h = zm(e, r, 1, h)), g && (e.lineWrapping || m.widgetLineBreaks) && (g = zm(e, i, -1, g)), h && g && h.from == g.from && h.to == g.to) return v(y(n.from, n.to, h));
	{
		let t = h ? y(n.from, null, h) : b(p, !1), r = g ? y(null, n.to, g) : b(m, !0), i = [];
		return (h || p).to < (g || m).from - (h && g ? 1 : 0) || p.widgetLineBreaks > 1 && t.bottom + e.defaultLineHeight / 2 < r.top ? i.push(_(d, t.bottom, f, r.top)) : t.bottom < r.top && e.elementAtHeight((t.bottom + r.top) / 2).type == Hl.Text && (t.bottom = r.top = (t.bottom + r.top) / 2), v(t).concat(i).concat(v(r));
	}
	function _(e, n, r, i) {
		return new Lm(t, e - c.left, n - c.top, Math.max(0, r - e), i - n);
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
			p && m && (i = Math.min(p.top, m.top, i), o = Math.max(p.bottom, m.bottom, o), u == Tu.LTR ? s.push(a && n ? d : p.left, a && l ? f : m.right) : s.push(!a && l ? d : m.left, !a && n ? f : p.right));
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
function Vm(e, t) {
	return e.constructor == t.constructor && e.eq(t);
}
var Hm = class {
	constructor(e, t) {
		this.view = e, this.layer = t, this.drawn = [], this.scaleX = 1, this.scaleY = 1, this.measureReq = {
			read: this.measure.bind(this),
			write: this.draw.bind(this)
		}, this.dom = e.scrollDOM.appendChild(document.createElement("div")), this.dom.classList.add("cm-layer"), t.above && this.dom.classList.add("cm-layer-above"), t.class && this.dom.classList.add(t.class), this.scale(), this.dom.setAttribute("aria-hidden", "true"), this.setOrder(e.state), e.requestMeasure(this.measureReq), t.mount && t.mount(this.dom, e);
	}
	update(e) {
		e.startState.facet(Um) != e.state.facet(Um) && this.setOrder(e.state), (this.layer.update(e, this.dom) || e.geometryChanged) && (this.scale(), e.view.requestMeasure(this.measureReq));
	}
	docViewUpdate(e) {
		this.layer.updateOnDocViewUpdate !== !1 && e.requestMeasure(this.measureReq);
	}
	setOrder(e) {
		let t = 0, n = e.facet(Um);
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
		if (e.length != this.drawn.length || e.some((e, t) => !Vm(e, this.drawn[t]))) {
			let t = this.dom.firstChild, n = 0;
			for (let r of e) r.update && t && r.constructor && this.drawn[n].constructor && r.update(t, this.drawn[n]) ? (t = t.nextSibling, n++) : this.dom.insertBefore(r.draw(), t);
			for (; t;) {
				let e = t.nextSibling;
				t.remove(), t = e;
			}
			this.drawn = e, B.webkit && (this.dom.style.display = this.dom.firstChild ? "" : "none");
		}
	}
	destroy() {
		this.layer.destroy && this.layer.destroy(this.dom, this.view), this.dom.remove();
	}
}, Um = /*@__PURE__*/ z.define();
function Wm(e) {
	return [fd.define((t) => new Hm(t, e)), Um.of(e)];
}
var Gm = /*@__PURE__*/ z.define({ combine(e) {
	return Hc(e, {
		cursorBlinkRate: 1200,
		drawRangeCursor: !0,
		iosSelectionHandles: !0
	}, {
		cursorBlinkRate: (e, t) => Math.min(e, t),
		drawRangeCursor: (e, t) => e || t
	});
} });
function Km(e = {}) {
	return [
		Gm.of(e),
		Jm,
		Xm,
		Qm,
		rd.of(!0)
	];
}
function qm(e) {
	return e.startState.facet(Gm) != e.state.facet(Gm);
}
var Jm = /*@__PURE__*/ Wm({
	above: !0,
	markers(e) {
		let { state: t } = e, n = t.facet(Gm), r = [];
		for (let i of t.selection.ranges) {
			let a = i == t.selection.main;
			if (i.empty || n.drawRangeCursor && !(a && B.ios && n.iosSelectionHandles)) {
				let t = a ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary", n = i.empty ? i : R.cursor(i.head, i.assoc);
				for (let i of Lm.forRange(e, t, n)) r.push(i);
			}
		}
		return r;
	},
	update(e, t) {
		e.transactions.some((e) => e.selection) && (t.style.animationName = t.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink");
		let n = qm(e);
		return n && Ym(e.state, t), e.docChanged || e.selectionSet || n;
	},
	mount(e, t) {
		Ym(t.state, e);
	},
	class: "cm-cursorLayer"
});
function Ym(e, t) {
	t.style.animationDuration = e.facet(Gm).cursorBlinkRate + "ms";
}
var Xm = /*@__PURE__*/ Wm({
	above: !1,
	markers(e) {
		let t = [], { main: n, ranges: r } = e.state.selection;
		for (let n of r) if (!n.empty) for (let r of Lm.forRange(e, "cm-selectionBackground", n)) t.push(r);
		if (B.ios && !n.empty && e.state.facet(Gm).iosSelectionHandles) {
			for (let r of Lm.forRange(e, "cm-selectionHandle cm-selectionHandle-start", R.cursor(n.from, 1))) t.push(r);
			for (let r of Lm.forRange(e, "cm-selectionHandle cm-selectionHandle-end", R.cursor(n.to, 1))) t.push(r);
		}
		return t;
	},
	update(e, t) {
		return e.docChanged || e.selectionSet || e.viewportChanged || qm(e);
	},
	class: "cm-selectionLayer"
}), Zm = B.gecko && B.gecko_version == 153 ? "#ffffff01" : "transparent", Qm = /*@__PURE__*/ cc.highest(/*@__PURE__*/ U.theme({
	".cm-line": {
		"& ::selection, &::selection": { backgroundColor: `${Zm} !important` },
		caretColor: "transparent !important"
	},
	".cm-content": {
		caretColor: "transparent !important",
		"& :focus": {
			caretColor: "initial !important",
			"&::selection, & ::selection": { backgroundColor: "Highlight !important" }
		}
	}
}));
/x/.unicode;
var $m = class extends Uc {
	compare(e) {
		return this == e || this.constructor == e.constructor && this.eq(e);
	}
	eq(e) {
		return !1;
	}
	destroy(e) {}
};
$m.prototype.elementClass = "", $m.prototype.toDOM = void 0, $m.prototype.mapMode = Vs.TrackBefore, $m.prototype.startSide = $m.prototype.endSide = -1, $m.prototype.point = !0;
var eh = /*@__PURE__*/ z.define(), th = /*@__PURE__*/ z.define(), nh = /*@__PURE__*/ z.define(), rh = /*@__PURE__*/ z.define({ combine: (e) => e.some((e) => e) });
function ih(e) {
	let t = [ah];
	return e && e.fixed === !1 && t.push(rh.of(!0)), t;
}
var ah = /*@__PURE__*/ fd.fromClass(class {
	constructor(e) {
		this.view = e, this.domAfter = null, this.prevViewport = e.viewport, this.dom = document.createElement("div"), this.dom.className = "cm-gutters cm-gutters-before", this.dom.setAttribute("aria-hidden", "true"), this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px", this.gutters = e.state.facet(nh).map((t) => new lh(e, t)), this.fixed = !e.state.facet(rh);
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
		this.view.state.facet(rh) != !this.fixed && (this.fixed = !this.fixed, this.dom.style.position = this.fixed ? "sticky" : "", this.domAfter && (this.domAfter.style.position = this.fixed ? "sticky" : "")), this.prevViewport = e.view.viewport;
	}
	syncGutters(e) {
		let t = this.dom.nextSibling;
		e && (this.dom.remove(), this.domAfter && this.domAfter.remove());
		let n = Jc.iter(this.view.state.facet(eh), this.view.viewport.from), r = [], i = this.gutters.map((e) => new ch(e, this.view.viewport, -this.view.documentPadding.top));
		for (let e of this.view.viewportLineBlocks) if (r.length && (r = []), Array.isArray(e.type)) {
			let t = !0;
			for (let a of e.type) if (a.type == Hl.Text && t) {
				sh(n, r, a.from);
				for (let e of i) e.line(this.view, a, r);
				t = !1;
			} else if (a.widget) for (let e of i) e.widget(this.view, a);
		} else if (e.type == Hl.Text) {
			sh(n, r, e.from);
			for (let t of i) t.line(this.view, e, r);
		} else if (e.widget) for (let t of i) t.widget(this.view, e);
		for (let e of i) e.finish();
		e && (this.view.scrollDOM.insertBefore(this.dom, t), this.domAfter && this.view.scrollDOM.appendChild(this.domAfter));
	}
	updateGutters(e) {
		let t = e.startState.facet(nh), n = e.state.facet(nh), r = e.docChanged || e.heightChanged || e.viewportChanged || !Jc.eq(e.startState.facet(eh), e.state.facet(eh), e.view.viewport.from, e.view.viewport.to);
		if (t == n) for (let t of this.gutters) t.update(e) && (r = !0);
		else {
			r = !0;
			let i = [];
			for (let r of n) {
				let n = t.indexOf(r);
				n < 0 ? i.push(new lh(this.view, r)) : (this.gutters[n].update(e), i.push(this.gutters[n]));
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
}, { provide: (e) => U.scrollMargins.of((t) => {
	let n = t.plugin(e);
	if (!n || n.gutters.length == 0 || !n.fixed) return null;
	let r = n.dom.offsetWidth * t.scaleX, i = n.domAfter ? n.domAfter.offsetWidth * t.scaleX : 0;
	return t.textDirection == Tu.LTR ? {
		left: r,
		right: i
	} : {
		right: r,
		left: i
	};
}) });
function oh(e) {
	return Array.isArray(e) ? e : [e];
}
function sh(e, t, n) {
	for (; e.value && e.from <= n;) e.from == n && t.push(e.value), e.next();
}
var ch = class {
	constructor(e, t, n) {
		this.gutter = e, this.height = n, this.i = 0, this.cursor = Jc.iter(e.markers, t.from);
	}
	addElement(e, t, n) {
		let { gutter: r } = this, i = (t.top - this.height) / e.scaleY, a = t.height / e.scaleY;
		if (this.i == r.elements.length) {
			let t = new uh(e, a, i, n);
			r.elements.push(t), r.dom.appendChild(t.dom);
		} else r.elements[this.i].update(e, a, i, n);
		this.height = t.bottom, this.i++;
	}
	line(e, t, n) {
		let r = [];
		sh(this.cursor, r, t.from), n.length && (r = r.concat(n));
		let i = this.gutter.config.lineMarker(e, t, r);
		i && r.unshift(i);
		let a = this.gutter;
		(r.length != 0 || a.config.renderEmptyElements) && this.addElement(e, t, r);
	}
	widget(e, t) {
		let n = this.gutter.config.widgetMarker(e, t.widget, t), r = n ? [n] : null;
		for (let n of e.state.facet(th)) {
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
}, lh = class {
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
		this.markers = oh(t.markers(e)), t.initialSpacer && (this.spacer = new uh(e, 0, 0, [t.initialSpacer(e)]), this.dom.appendChild(this.spacer.dom), this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none");
	}
	update(e) {
		let t = this.markers;
		if (this.markers = oh(this.config.markers(e.view)), this.spacer && this.config.updateSpacer) {
			let t = this.config.updateSpacer(this.spacer.markers[0], e);
			t != this.spacer.markers[0] && this.spacer.update(e.view, 0, 0, [t]);
		}
		let n = e.view.viewport;
		return !Jc.eq(this.markers, t, n.from, n.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(e) : !1);
	}
	destroy() {
		for (let e of this.elements) e.destroy();
	}
}, uh = class {
	constructor(e, t, n, r) {
		this.height = -1, this.above = 0, this.markers = [], this.dom = document.createElement("div"), this.dom.className = "cm-gutterElement", this.update(e, t, n, r);
	}
	update(e, t, n, r) {
		this.height != t && (this.height = t, this.dom.style.height = t + "px"), this.above != n && (this.dom.style.marginTop = (this.above = n) ? n + "px" : ""), dh(this.markers, r) || this.setMarkers(e, r);
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
function dh(e, t) {
	if (e.length != t.length) return !1;
	for (let n = 0; n < e.length; n++) if (!e[n].compare(t[n])) return !1;
	return !0;
}
var fh = /*@__PURE__*/ z.define(), ph = /*@__PURE__*/ z.define(), mh = /*@__PURE__*/ z.define({ combine(e) {
	return Hc(e, {
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
} }), hh = class extends $m {
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
function gh(e, t) {
	return e.state.facet(mh).formatNumber(t, e.state);
}
var _h = /*@__PURE__*/ nh.compute([mh], (e) => ({
	class: "cm-lineNumbers",
	renderEmptyElements: !1,
	markers(e) {
		return e.state.facet(fh);
	},
	lineMarker(e, t, n) {
		return n.some((e) => e.toDOM) ? null : new hh(gh(e, e.state.doc.lineAt(t.from).number));
	},
	widgetMarker: (e, t, n) => {
		for (let r of e.state.facet(ph)) {
			let i = r(e, t, n);
			if (i) return i;
		}
		return null;
	},
	lineMarkerChange: (e) => e.startState.facet(mh) != e.state.facet(mh),
	initialSpacer(e) {
		return new hh(gh(e, yh(e.state.doc.lines)));
	},
	updateSpacer(e, t) {
		let n = gh(t.view, yh(t.view.state.doc.lines));
		return n == e.number ? e : new hh(n);
	},
	domEventHandlers: e.facet(mh).domEventHandlers,
	side: "before"
}));
function vh(e = {}) {
	return [
		mh.of(e),
		ih(),
		_h
	];
}
function yh(e) {
	let t = 9;
	for (; t < e;) t = t * 10 + 9;
	return t;
}
//#endregion
//#region node_modules/@lezer/common/dist/index.js
var bh = 1024, xh = 0, Sh = class {
	constructor(e, t) {
		this.from = e, this.to = t;
	}
}, W = class {
	constructor(e = {}) {
		this.id = xh++, this.perNode = !!e.perNode, this.deserialize = e.deserialize || (() => {
			throw Error("This node type doesn't define a deserialize function");
		}), this.combine = e.combine || null;
	}
	add(e) {
		if (this.perNode) throw RangeError("Can't add per-node props to node types");
		return typeof e != "function" && (e = Th.match(e)), (t) => {
			let n = e(t);
			return n === void 0 ? null : [this, n];
		};
	}
};
W.closedBy = new W({ deserialize: (e) => e.split(" ") }), W.openedBy = new W({ deserialize: (e) => e.split(" ") }), W.group = new W({ deserialize: (e) => e.split(" ") }), W.isolate = new W({ deserialize: (e) => {
	if (e && e != "rtl" && e != "ltr" && e != "auto") throw RangeError("Invalid value for isolate: " + e);
	return e || "auto";
} }), W.contextHash = new W({ perNode: !0 }), W.lookAhead = new W({ perNode: !0 }), W.mounted = new W({ perNode: !0 });
var Ch = class {
	constructor(e, t, n, r = !1) {
		this.tree = e, this.overlay = t, this.parser = n, this.bracketed = r;
	}
	static get(e) {
		return e && e.props && e.props[W.mounted.id];
	}
}, wh = Object.create(null), Th = class e {
	constructor(e, t, n, r = 0) {
		this.name = e, this.props = t, this.id = n, this.flags = r;
	}
	static define(t) {
		let n = t.props && t.props.length ? Object.create(null) : wh, r = +!!t.top | (t.skipped ? 2 : 0) | (t.error ? 4 : 0) | (t.name == null ? 8 : 0), i = new e(t.name || "", n, t.id, r);
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
			let t = this.prop(W.group);
			return t ? t.indexOf(e) > -1 : !1;
		}
		return this.id == e;
	}
	static match(e) {
		let t = Object.create(null);
		for (let n in e) for (let r of n.split(" ")) t[r] = e[n];
		return (e) => {
			for (let n = e.prop(W.group), r = -1; r < (n ? n.length : 0); r++) {
				let i = t[r < 0 ? e.name : n[r]];
				if (i) return i;
			}
		};
	}
};
Th.none = new Th("", Object.create(null), 0, 8);
var Eh = class e {
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
			n.push(r ? new Th(e.name, r, e.id, e.flags) : e);
		}
		return new e(n);
	}
}, Dh = /* @__PURE__ */ new WeakMap(), Oh = /* @__PURE__ */ new WeakMap(), G;
(function(e) {
	e[e.ExcludeBuffers = 1] = "ExcludeBuffers", e[e.IncludeAnonymous = 2] = "IncludeAnonymous", e[e.IgnoreMounts = 4] = "IgnoreMounts", e[e.IgnoreOverlays = 8] = "IgnoreOverlays", e[e.EnterBracketed = 16] = "EnterBracketed";
})(G ||= {});
var K = class e {
	constructor(e, t, n, r, i) {
		if (this.type = e, this.children = t, this.positions = n, this.length = r, this.props = null, i && i.length) {
			this.props = Object.create(null);
			for (let [e, t] of i) this.props[typeof e == "number" ? e : e.id] = t;
		}
	}
	toString() {
		let e = Ch.get(this);
		if (e && !e.overlay) return e.tree.toString();
		let t = "";
		for (let e of this.children) {
			let n = e.toString();
			n && (t && (t += ","), t += n);
		}
		return this.type.name ? (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (t.length ? "(" + t + ")" : "") : t;
	}
	cursor(e = 0) {
		return new Hh(this.topNode, e);
	}
	cursorAt(e, t = 0, n = 0) {
		let r = new Hh(Dh.get(this) || this.topNode);
		return r.moveTo(e, t), Dh.set(this, r._tree), r;
	}
	get topNode() {
		return new Ph(this, 0, 0, null);
	}
	resolve(e, t = 0) {
		let n = Mh(Dh.get(this) || this.topNode, e, t, !1);
		return Dh.set(this, n), n;
	}
	resolveInner(e, t = 0) {
		let n = Mh(Oh.get(this) || this.topNode, e, t, !0);
		return Oh.set(this, n), n;
	}
	resolveStack(e, t = 0) {
		return Vh(this, e, t);
	}
	iterate(e) {
		let { enter: t, leave: n, from: r = 0, to: i = this.length } = e, a = e.mode || 0, o = (a & G.IncludeAnonymous) > 0;
		for (let e = this.cursor(a | G.IncludeAnonymous);;) {
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
		return this.children.length <= 8 ? this : qh(Th.none, this.children, this.positions, 0, this.children.length, 0, this.length, (t, n, r) => new e(this.type, t, n, r, this.propValues), t.makeTree || ((t, n, r) => new e(Th.none, t, n, r)));
	}
	static build(e) {
		return Wh(e);
	}
};
K.empty = new K(Th.none, [], [], 0);
var kh = class e {
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
}, Ah = class e {
	constructor(e, t, n) {
		this.buffer = e, this.length = t, this.set = n;
	}
	get type() {
		return Th.none;
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
		for (let s = e; s != t && !(jh(i, r, a[s + 1], a[s + 2]) && (o = s, n > 0)); s = a[s + 3]);
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
function jh(e, t, n, r) {
	switch (e) {
		case -2: return n < t;
		case -1: return r >= t && n < t;
		case 0: return n < t && r > t;
		case 1: return n <= t && r > t;
		case 2: return r > t;
		case 4: return !0;
	}
}
function Mh(e, t, n, r) {
	for (; e.from == e.to || (n < 1 ? e.from >= t : e.from > t) || (n > -1 ? e.to <= t : e.to < t);) {
		let t = !r && e instanceof Ph && e.index < 0 ? null : e.parent;
		if (!t) return e;
		e = t;
	}
	let i = r ? 0 : G.IgnoreOverlays;
	if (r) for (let r = e, a = r.parent; a; r = a, a = r.parent) r instanceof Ph && r.index < 0 && a.enter(t, n, i)?.from != r.from && (e = a);
	for (;;) {
		let r = e.enter(t, n, i);
		if (!r) return e;
		e = r;
	}
}
var Nh = class {
	cursor(e = 0) {
		return new Hh(this, e);
	}
	getChild(e, t = null, n = null) {
		let r = Fh(this, e, t, n);
		return r.length ? r[0] : null;
	}
	getChildren(e, t = null, n = null) {
		return Fh(this, e, t, n);
	}
	resolve(e, t = 0) {
		return Mh(this, e, t, !1);
	}
	resolveInner(e, t = 0) {
		return Mh(this, e, t, !0);
	}
	matchContext(e) {
		return Ih(this.parent, e);
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
}, Ph = class e extends Nh {
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
				if (a & G.EnterBracketed && l instanceof K && (d = Ch.get(l)) && !d.overlay && d.bracketed && r >= u && r <= u + l.length || jh(i, r, u, u + l.length)) {
					if (l instanceof Ah) {
						if (a & G.ExcludeBuffers) continue;
						let e = l.findChild(0, l.buffer.length, n, r - u, i);
						if (e > -1) return new Rh(new Lh(o, l, t, u), null, e);
					} else if (a & G.IncludeAnonymous || !l.type.isAnonymous || Uh(l)) {
						let s;
						if (!(a & G.IgnoreMounts) && (s = Ch.get(l)) && !s.overlay) return new e(s.tree, u, t, o);
						let c = new e(l, u, t, o);
						return a & G.IncludeAnonymous || !c.type.isAnonymous ? c : c.nextChild(n < 0 ? l.children.length - 1 : 0, n, r, i, a);
					}
				}
			}
			if (a & G.IncludeAnonymous || !o.type.isAnonymous || (t = o.index >= 0 ? o.index + n : n < 0 ? -1 : o._parent._tree.children.length, o = o._parent, !o)) return null;
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
		if (!(r & G.IgnoreOverlays) && (i = Ch.get(this._tree)) && i.overlay) {
			let a = t - this.from, o = r & G.EnterBracketed && i.bracketed;
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
function Fh(e, t, n, r) {
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
function Ih(e, t, n = t.length - 1) {
	for (let r = e; n >= 0; r = r.parent) {
		if (!r) return !1;
		if (!r.type.isAnonymous) {
			if (t[n] && t[n] != r.name) return !1;
			n--;
		}
	}
	return !0;
}
var Lh = class {
	constructor(e, t, n, r) {
		this.parent = e, this.buffer = t, this.index = n, this.start = r;
	}
}, Rh = class e extends Nh {
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
		if (r & G.ExcludeBuffers) return null;
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
		return new K(this.type, e, t, this.to - this.from);
	}
	toString() {
		return this.context.buffer.childString(this.index);
	}
};
function zh(e) {
	if (!e.length) return null;
	let t = 0, n = e[0];
	for (let r = 1; r < e.length; r++) {
		let i = e[r];
		(i.from > n.from || i.to < n.to) && (n = i, t = r);
	}
	let r = n instanceof Ph && n.index < 0 ? null : n.parent, i = e.slice();
	return r ? i[t] = r : i.splice(t, 1), new Bh(i, n);
}
var Bh = class {
	constructor(e, t) {
		this.heads = e, this.node = t;
	}
	get next() {
		return zh(this.heads);
	}
};
function Vh(e, t, n) {
	let r = e.resolveInner(t, n), i = null;
	for (let e = r instanceof Ph ? r : r.context.parent; e; e = e.parent) if (e.index < 0) {
		let a = e.parent;
		(i ||= [r]).push(a.resolve(t, n)), e = a;
	} else {
		let a = Ch.get(e.tree);
		if (a && a.overlay && a.overlay[0].from <= t && a.overlay[a.overlay.length - 1].to >= t) {
			let o = new Ph(a.tree, a.overlay[0].from + e.from, -1, e);
			(i ||= [r]).push(Mh(o, t, n, !1));
		}
	}
	return i ? zh(i) : r;
}
var Hh = class {
	get name() {
		return this.type.name;
	}
	constructor(e, t = 0) {
		if (this.buffer = null, this.stack = [], this.index = 0, this.bufferNode = null, this.mode = t & ~G.EnterBracketed, e instanceof Ph) this.yieldNode(e);
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
		return e ? e instanceof Ph ? (this.buffer = null, this.yieldNode(e)) : (this.buffer = e.context, this.yieldBuf(e.index, e.type)) : !1;
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
		return this.buffer ? n & G.ExcludeBuffers ? !1 : this.enterChild(1, e, t) : this.yield(this._tree.enter(e, t, n));
	}
	parent() {
		if (!this.buffer) return this.yieldNode(this.mode & G.IncludeAnonymous ? this._tree._parent : this._tree.parent);
		if (this.stack.length) return this.yieldBuf(this.stack.pop());
		let e = this.mode & G.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
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
			if (this.mode & G.IncludeAnonymous || e instanceof Ah || !e.type.isAnonymous || Uh(e)) return !1;
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
		if (e && e.context == this.buffer) scan: for (let r = this.index, i = this.stack.length; i >= 0;) {
			for (let a = e; a; a = a._parent) if (a.index == r) {
				if (r == this.index) return a;
				t = a, n = i + 1;
				break scan;
			}
			r = this.stack[--i];
		}
		for (let e = n; e < this.stack.length; e++) t = new Rh(this.buffer, t, this.stack[e]);
		return this.bufferNode = new Rh(this.buffer, t, this.index);
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
		if (!this.buffer) return Ih(this.node.parent, e);
		let { buffer: t } = this.buffer, { types: n } = t.set;
		for (let r = e.length - 1, i = this.stack.length - 1; r >= 0; i--) {
			if (i < 0) return Ih(this._tree, e, r);
			let a = n[t.buffer[this.stack[i]]];
			if (!a.isAnonymous) {
				if (e[r] && e[r] != a.name) return !1;
				r--;
			}
		}
		return !0;
	}
};
function Uh(e) {
	return e.children.some((e) => e instanceof Ah || !e.type.isAnonymous || Uh(e));
}
function Wh(e) {
	let { buffer: t, nodeSet: n, maxBufferLength: r = bh, reused: i = [], minRepeatType: a = n.types.length } = e, o = Array.isArray(t) ? new kh(t, t.length) : t, s = n.types, c = 0, l = 0;
	function u(e, t, _, v, y, b) {
		let { id: x, start: S, end: C, size: w } = o, T = l, E = c;
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
		let D = s[x], ee, O, te = S - e;
		if (C - S <= r && (O = h(o.pos - t, y))) {
			let t = new Uint16Array(O.size - O.skip), r = o.pos - O.size, i = t.length;
			for (; o.pos > r;) i = g(O.start, t, i);
			ee = new Ah(t, C - O.start, n), te = O.start - e;
		} else {
			let e = o.pos - w;
			o.next();
			let t = [], n = [], i = x >= a ? x : -1, s = 0, c = C;
			for (; o.pos > e;) i >= 0 && o.id == i && o.size >= 0 ? (o.end <= c - r && (p(t, n, S, s, o.end, c, i, T, E), s = t.length, c = o.end), o.next()) : b > 2500 ? d(S, e, t, n) : u(S, e, t, n, i, b + 1);
			if (i >= 0 && s > 0 && s < t.length && p(t, n, S, s, S, c, i, T, E), t.reverse(), n.reverse(), i > -1 && s > 0) {
				let e = f(D, E);
				ee = qh(D, t, n, 0, t.length, 0, C - S, e, e);
			} else ee = m(D, t, n, C - S, T - C, E);
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
			i.push(new Ah(t, s[2] - r, n)), a.push(r - e);
		}
	}
	function f(e, t) {
		return (n, r, i) => {
			let a = 0, o = n.length - 1, s, c;
			if (o >= 0 && (s = n[o]) instanceof K) {
				if (!o && s.type == e && s.length == i) return s;
				(c = s.prop(W.lookAhead)) && (a = r[o] + s.length + c);
			}
			return m(e, n, r, i, a, t);
		};
	}
	function p(e, t, r, i, a, o, s, c, l) {
		let u = [], d = [];
		for (; e.length > i;) u.push(e.pop()), d.push(t.pop() + r - a);
		e.push(m(n.types[s], u, d, o - a, c - o, l)), t.push(a - r);
	}
	function m(e, t, n, r, i, a, o) {
		if (a) {
			let e = [W.contextHash, a];
			o = o ? [e].concat(o) : [e];
		}
		if (i > 25) {
			let e = [W.lookAhead, i];
			o = o ? [e].concat(o) : [e];
		}
		return new K(e, t, n, r, o);
	}
	function h(e, t) {
		let n = o.fork(), i = 0, s = 0, c = 0, l = n.end - r, u = {
			size: 0,
			start: 0,
			skip: 0
		};
		scan: for (let r = n.pos - e; n.pos > r;) {
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
					else break scan;
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
	return new K(s[e.topID], _.reverse(), v.reverse(), y);
}
var Gh = /* @__PURE__ */ new WeakMap();
function Kh(e, t) {
	if (!e.isAnonymous || t instanceof Ah || t.type != e) return 1;
	let n = Gh.get(t);
	if (n == null) {
		n = 1;
		for (let r of t.children) {
			if (r.type != e || !(r instanceof K)) {
				n = 1;
				break;
			}
			n += Kh(e, r);
		}
		Gh.set(t, n);
	}
	return n;
}
function qh(e, t, n, r, i, a, o, s, c) {
	let l = 0;
	for (let n = r; n < i; n++) l += Kh(e, t[n]);
	let u = Math.ceil(l * 1.5 / 8), d = [], f = [];
	function p(t, n, r, i, o) {
		for (let s = r; s < i;) {
			let r = s, l = n[s], m = Kh(e, t[s]);
			for (s++; s < i; s++) {
				let n = Kh(e, t[s]);
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
				d.push(qh(e, t, n, r, s, l, i, null, c));
			}
			f.push(l + o - a);
		}
	}
	return p(t, n, r, i, 0), (s || c)(d, f, o);
}
var Jh = class {
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
		e instanceof Rh ? this.setBuffer(e.context.buffer, e.index, t) : e instanceof Ph && this.map.set(e.tree, t);
	}
	get(e) {
		return e instanceof Rh ? this.getBuffer(e.context.buffer, e.index) : e instanceof Ph ? this.map.get(e.tree) : void 0;
	}
	cursorSet(e, t) {
		e.buffer ? this.setBuffer(e.buffer.buffer, e.index, t) : this.map.set(e.tree, t);
	}
	cursorGet(e) {
		return e.buffer ? this.getBuffer(e.buffer.buffer, e.index) : this.map.get(e.tree);
	}
}, Yh = class e {
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
					n = t >= r ? null : new e(t, r, n.tree, n.offset + l, s > 0, !!u);
				}
				if (n && i.push(n), o.to > d) break;
				o = a < t.length ? t[a++] : null;
			}
			if (!u) break;
			c = u.toA, l = u.toA - u.toB;
		}
		return i;
	}
}, Xh = class {
	startParse(e, t, n) {
		return typeof e == "string" && (e = new Zh(e)), n = n ? n.length ? n.map((e) => new Sh(e.from, e.to)) : [new Sh(0, 0)] : [new Sh(0, e.length)], this.createParse(e, t || [], n);
	}
	parse(e, t, n) {
		let r = this.startParse(e, t, n);
		for (;;) {
			let e = r.advance();
			if (e) return e;
		}
	}
}, Zh = class {
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
function Qh(e) {
	return (t, n, r, i) => new rg(t, e, n, r, i);
}
var $h = class {
	constructor(e, t, n, r, i, a) {
		this.parser = e, this.parse = t, this.overlay = n, this.bracketed = r, this.target = i, this.from = a;
	}
};
function eg(e) {
	if (!e.length || e.some((e) => e.from >= e.to)) throw RangeError("Invalid inner parse ranges given: " + JSON.stringify(e));
}
var tg = class {
	constructor(e, t, n, r, i, a, o, s) {
		this.parser = e, this.predicate = t, this.mounts = n, this.index = r, this.start = i, this.bracketed = a, this.target = o, this.prev = s, this.depth = 0, this.ranges = [];
	}
}, ng = new W({ perNode: !0 }), rg = class {
	constructor(e, t, n, r, i) {
		this.nest = t, this.input = n, this.fragments = r, this.ranges = i, this.inner = [], this.innerDone = 0, this.baseTree = null, this.stoppedAt = null, this.baseParse = e;
	}
	advance() {
		if (this.baseParse) {
			let e = this.baseParse.advance();
			if (!e) return null;
			if (this.baseParse = null, this.baseTree = e, this.startInner(), this.stoppedAt != null) for (let e of this.inner) e.parse.stopAt(this.stoppedAt);
		}
		if (this.innerDone == this.inner.length) {
			let e = this.baseTree;
			return this.stoppedAt != null && (e = new K(e.type, e.children, e.positions, e.length, e.propValues.concat([[ng, this.stoppedAt]]))), e;
		}
		let e = this.inner[this.innerDone], t = e.parse.advance();
		if (t) {
			this.innerDone++;
			let n = Object.assign(Object.create(null), e.target.props);
			n[W.mounted.id] = new Ch(t, e.overlay, e.parser, e.bracketed), e.target.props = n;
		}
		return null;
	}
	get parsedPos() {
		if (this.baseParse) return 0;
		let e = this.input.length;
		for (let t = this.innerDone; t < this.inner.length; t++) this.inner[t].from < e && (e = Math.min(e, this.inner[t].parse.parsedPos));
		return e;
	}
	stopAt(e) {
		if (this.stoppedAt = e, this.baseParse) this.baseParse.stopAt(e);
		else for (let t = this.innerDone; t < this.inner.length; t++) this.inner[t].parse.stopAt(e);
	}
	startInner() {
		let e = new cg(this.fragments), t = null, n = null, r = new Hh(new Ph(this.baseTree, this.ranges[0].from, 0, null), G.IncludeAnonymous | G.IgnoreMounts);
		scan: for (let i, a;;) {
			let o = !0, s;
			if (this.stoppedAt != null && r.from >= this.stoppedAt) o = !1;
			else if (e.hasNode(r)) {
				if (t) {
					let e = t.mounts.find((e) => e.frag.from <= r.from && e.frag.to >= r.to && e.mount.overlay);
					if (e) for (let n of e.mount.overlay) {
						let i = n.from + e.pos, a = n.to + e.pos;
						i >= r.from && a <= r.to && !t.ranges.some((e) => e.from < a && e.to > i) && t.ranges.push({
							from: i,
							to: a
						});
					}
				}
				o = !1;
			} else if (n && (a = ig(n.ranges, r.from, r.to))) o = a != 2;
			else if (!r.type.isAnonymous && (i = this.nest(r, this.input)) && (r.from < r.to || !i.overlay)) {
				r.tree || (og(r), t && t.depth++, n && n.depth++);
				let a = e.findMounts(r.from, i.parser);
				if (typeof i.overlay == "function") t = new tg(i.parser, i.overlay, a, this.inner.length, r.from, !!i.bracketed, r.tree, t);
				else {
					let e = lg(this.ranges, i.overlay || (r.from < r.to ? [new Sh(r.from, r.to)] : []));
					e.length && eg(e), (e.length || !i.overlay) && this.inner.push(new $h(i.parser, e.length ? i.parser.startParse(this.input, dg(a, e), e) : i.parser.startParse(""), i.overlay ? i.overlay.map((e) => new Sh(e.from - r.from, e.to - r.from)) : null, !!i.bracketed, r.tree, e.length ? e[0].from : r.from)), i.overlay ? e.length && (n = {
						ranges: e,
						depth: 0,
						prev: n
					}) : o = !1;
				}
			} else if (t && (s = t.predicate(r)) && (s === !0 && (s = new Sh(r.from, r.to)), s.from < s.to)) {
				let e = t.ranges.length - 1;
				e >= 0 && t.ranges[e].to == s.from ? t.ranges[e] = {
					from: t.ranges[e].from,
					to: s.to
				} : t.ranges.push(s);
			}
			if (o && r.firstChild()) t && t.depth++, n && n.depth++;
			else for (; !r.nextSibling();) {
				if (!r.parent()) break scan;
				if (t && !--t.depth) {
					let e = lg(this.ranges, t.ranges);
					e.length && (eg(e), this.inner.splice(t.index, 0, new $h(t.parser, t.parser.startParse(this.input, dg(t.mounts, e), e), t.ranges.map((e) => new Sh(e.from - t.start, e.to - t.start)), t.bracketed, t.target, e[0].from))), t = t.prev;
				}
				n && !--n.depth && (n = n.prev);
			}
		}
	}
};
function ig(e, t, n) {
	for (let r of e) {
		if (r.from >= n) break;
		if (r.to > t) return r.from <= t && r.to >= n ? 2 : 1;
	}
	return 0;
}
function ag(e, t, n, r, i, a) {
	if (t < n) {
		let o = e.buffer[t + 1];
		r.push(e.slice(t, n, o)), i.push(o - a);
	}
}
function og(e) {
	let { node: t } = e, n = [], r = t.context.buffer;
	do
		n.push(e.index), e.parent();
	while (!e.tree);
	let i = e.tree, a = i.children.indexOf(r), o = i.children[a], s = o.buffer, c = [a];
	function l(e, r, i, a, u, d) {
		let f = n[d], p = [], m = [];
		ag(o, e, f, p, m, a);
		let h = s[f + 1], g = s[f + 2];
		c.push(p.length);
		let _ = d ? l(f + 4, s[f + 3], o.set.types[s[f]], h, g - h, d - 1) : t.toTree();
		return p.push(_), m.push(h - a), ag(o, s[f + 3], r, p, m, a), new K(i, p, m, u);
	}
	i.children[a] = l(0, s.length, Th.none, 0, o.length, n.length - 1);
	for (let t of c) {
		let n = e.tree.children[t], r = e.tree.positions[t];
		e.yield(new Ph(n, r + e.from, t, e._tree));
	}
}
var sg = class {
	constructor(e, t) {
		this.offset = t, this.done = !1, this.cursor = e.cursor(G.IncludeAnonymous | G.IgnoreMounts | G.ExcludeBuffers);
	}
	moveTo(e) {
		let { cursor: t } = this, n = e - this.offset;
		for (; !this.done && t.from < n;) if (!(t.to >= n && t.enter(n, 1, G.IncludeAnonymous | G.IgnoreOverlays | G.ExcludeBuffers))) {
			if (t.to <= n) t.next(!1) || (this.done = !0);
			else break;
		}
	}
	hasNode(e) {
		if (this.moveTo(e.from), !this.done && this.cursor.from + this.offset == e.from && this.cursor.tree) for (let t = this.cursor.tree;;) {
			if (t == e.tree) return !0;
			if (t.children.length && t.positions[0] == 0 && t.children[0] instanceof K) t = t.children[0];
			else break;
		}
		return !1;
	}
}, cg = class {
	constructor(e) {
		if (this.fragments = e, this.curTo = 0, this.fragI = 0, e.length) {
			let t = this.curFrag = e[0];
			this.curTo = t.tree.prop(ng) ?? t.to, this.inner = new sg(t.tree, -t.offset);
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
			this.curTo = e.tree.prop(ng) ?? e.to, this.inner = new sg(e.tree, -e.offset);
		}
	}
	findMounts(e, t) {
		let n = [];
		if (this.inner) {
			this.inner.cursor.moveTo(e, 1);
			for (let e = this.inner.cursor.node; e; e = e.parent) {
				let r = e.tree?.prop(W.mounted);
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
function lg(e, t) {
	let n = null, r = t;
	for (let i = 1, a = 0; i < e.length; i++) {
		let o = e[i - 1].to, s = e[i].from;
		for (; a < r.length; a++) {
			let e = r[a];
			if (e.from >= s) break;
			e.to <= o || (n || (r = n = t.slice()), e.from < o ? (n[a] = new Sh(e.from, o), e.to > s && n.splice(a + 1, 0, new Sh(s, e.to))) : e.to > s ? n[a--] = new Sh(s, e.to) : n.splice(a--, 1));
		}
	}
	return r;
}
function ug(e, t, n, r) {
	let i = 0, a = 0, o = !1, s = !1, c = -1e9, l = [];
	for (;;) {
		let u = i == e.length ? 1e9 : o ? e[i].to : e[i].from, d = a == t.length ? 1e9 : s ? t[a].to : t[a].from;
		if (o != s) {
			let e = Math.max(c, n), t = Math.min(u, d, r);
			e < t && l.push(new Sh(e, t));
		}
		if (c = Math.min(u, d), c == 1e9) break;
		u == c && (o ? (o = !1, i++) : o = !0), d == c && (s ? (s = !1, a++) : s = !0);
	}
	return l;
}
function dg(e, t) {
	let n = [];
	for (let { pos: r, mount: i, frag: a } of e) {
		let e = r + (i.overlay ? i.overlay[0].from : 0), o = e + i.tree.length, s = Math.max(a.from, e), c = Math.min(a.to, o);
		if (i.overlay) {
			let o = ug(t, i.overlay.map((e) => new Sh(e.from + r, e.to + r)), s, c);
			for (let t = 0, r = s;; t++) {
				let s = t == o.length, l = s ? c : o[t].from;
				if (l > r && n.push(new Yh(r, l, i.tree, -e, a.from >= r || a.openStart, a.to <= l || a.openEnd)), s) break;
				r = o[t].to;
			}
		} else n.push(new Yh(s, c, i.tree, -e, a.from >= e || a.openStart, a.to <= o || a.openEnd));
	}
	return n;
}
//#endregion
//#region node_modules/@lezer/highlight/dist/index.js
var fg = 0, pg = class e {
	constructor(e, t, n, r) {
		this.name = e, this.set = t, this.base = n, this.modified = r, this.id = fg++;
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
		let t = new hg(e);
		return (e) => e.modified.indexOf(t) > -1 ? e : hg.get(e.base || e, e.modified.concat(t).sort((e, t) => e.id - t.id));
	}
}, mg = 0, hg = class e {
	constructor(e) {
		this.name = e, this.instances = [], this.id = mg++;
	}
	static get(t, n) {
		if (!n.length) return t;
		let r = n[0].instances.find((e) => e.base == t && gg(n, e.modified));
		if (r) return r;
		let i = [], a = new pg(t.name, i, t, n);
		for (let e of n) e.instances.push(a);
		let o = _g(n);
		for (let n of t.set) if (!n.modified.length) for (let t of o) i.push(e.get(n, t));
		return a;
	}
};
function gg(e, t) {
	return e.length == t.length && e.every((e, n) => e == t[n]);
}
function _g(e) {
	let t = [[]];
	for (let n = 0; n < e.length; n++) for (let r = 0, i = t.length; r < i; r++) t.push(t[r].concat(e[n]));
	return t.sort((e, t) => t.length - e.length);
}
function vg(e) {
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
			t[s] = new bg(r, i, o > 0 ? n.slice(0, o) : null).sort(t[s]);
		}
	}
	return yg.add(t);
}
var yg = new W({ combine(e, t) {
	let n, r, i;
	for (; e || t;) {
		if (!e || t && e.depth <= t.depth ? (i = t, t = t.next) : (i = e, e = e.next), n && n.mode == i.mode && !i.context && !n.context) continue;
		let a = new bg(i.tags, i.mode, i.context);
		n ? n.next = a : r = a, n = a;
	}
	return r;
} }), bg = class {
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
bg.empty = new bg([], 2, null);
function xg(e, t) {
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
function Sg(e, t) {
	let n = null;
	for (let r of e) {
		let e = r.style(t);
		e && (n = n ? n + " " + e : e);
	}
	return n;
}
function Cg(e, t, n, r = 0, i = e.length) {
	let a = new wg(r, Array.isArray(t) ? t : [t], n);
	a.highlightRange(e.cursor(), r, i, "", a.highlighters), a.flush(i);
}
var wg = class {
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
		let c = r, l = Tg(e) || bg.empty, u = Sg(i, l.tags);
		if (u && (c && (c += " "), c += u, l.mode == 1 && (r += (r ? " " : "") + u)), this.startSpan(Math.max(t, o), c), l.opaque) return;
		let d = e.tree && e.tree.prop(W.mounted);
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
function Tg(e) {
	let t = e.type.prop(yg);
	for (; t && t.context && !e.matchContext(t.context);) t = t.next;
	return t || null;
}
var q = pg.define, Eg = q(), Dg = q(), Og = q(Dg), kg = q(Dg), Ag = q(), jg = q(Ag), Mg = q(Ag), Ng = q(), Pg = q(Ng), Fg = q(), Ig = q(), Lg = q(), Rg = q(Lg), zg = q(), J = {
	comment: Eg,
	lineComment: q(Eg),
	blockComment: q(Eg),
	docComment: q(Eg),
	name: Dg,
	variableName: q(Dg),
	typeName: Og,
	tagName: q(Og),
	propertyName: kg,
	attributeName: q(kg),
	className: q(Dg),
	labelName: q(Dg),
	namespace: q(Dg),
	macroName: q(Dg),
	literal: Ag,
	string: jg,
	docString: q(jg),
	character: q(jg),
	attributeValue: q(jg),
	number: Mg,
	integer: q(Mg),
	float: q(Mg),
	bool: q(Ag),
	regexp: q(Ag),
	escape: q(Ag),
	color: q(Ag),
	url: q(Ag),
	keyword: Fg,
	self: q(Fg),
	null: q(Fg),
	atom: q(Fg),
	unit: q(Fg),
	modifier: q(Fg),
	operatorKeyword: q(Fg),
	controlKeyword: q(Fg),
	definitionKeyword: q(Fg),
	moduleKeyword: q(Fg),
	operator: Ig,
	derefOperator: q(Ig),
	arithmeticOperator: q(Ig),
	logicOperator: q(Ig),
	bitwiseOperator: q(Ig),
	compareOperator: q(Ig),
	updateOperator: q(Ig),
	definitionOperator: q(Ig),
	typeOperator: q(Ig),
	controlOperator: q(Ig),
	punctuation: Lg,
	separator: q(Lg),
	bracket: Rg,
	angleBracket: q(Rg),
	squareBracket: q(Rg),
	paren: q(Rg),
	brace: q(Rg),
	content: Ng,
	heading: Pg,
	heading1: q(Pg),
	heading2: q(Pg),
	heading3: q(Pg),
	heading4: q(Pg),
	heading5: q(Pg),
	heading6: q(Pg),
	contentSeparator: q(Ng),
	list: q(Ng),
	quote: q(Ng),
	emphasis: q(Ng),
	strong: q(Ng),
	link: q(Ng),
	monospace: q(Ng),
	strikethrough: q(Ng),
	inserted: q(),
	deleted: q(),
	changed: q(),
	invalid: q(),
	meta: zg,
	documentMeta: q(zg),
	annotation: q(zg),
	processingInstruction: q(zg),
	definition: pg.defineModifier("definition"),
	constant: pg.defineModifier("constant"),
	function: pg.defineModifier("function"),
	standard: pg.defineModifier("standard"),
	local: pg.defineModifier("local"),
	special: pg.defineModifier("special")
};
for (let e in J) {
	let t = J[e];
	t instanceof pg && (t.name = e);
}
xg([
	{
		tag: J.link,
		class: "tok-link"
	},
	{
		tag: J.heading,
		class: "tok-heading"
	},
	{
		tag: J.emphasis,
		class: "tok-emphasis"
	},
	{
		tag: J.strong,
		class: "tok-strong"
	},
	{
		tag: J.keyword,
		class: "tok-keyword"
	},
	{
		tag: J.atom,
		class: "tok-atom"
	},
	{
		tag: J.bool,
		class: "tok-bool"
	},
	{
		tag: J.url,
		class: "tok-url"
	},
	{
		tag: J.labelName,
		class: "tok-labelName"
	},
	{
		tag: J.inserted,
		class: "tok-inserted"
	},
	{
		tag: J.deleted,
		class: "tok-deleted"
	},
	{
		tag: J.literal,
		class: "tok-literal"
	},
	{
		tag: J.string,
		class: "tok-string"
	},
	{
		tag: J.number,
		class: "tok-number"
	},
	{
		tag: [
			J.regexp,
			J.escape,
			J.special(J.string)
		],
		class: "tok-string2"
	},
	{
		tag: J.variableName,
		class: "tok-variableName"
	},
	{
		tag: J.local(J.variableName),
		class: "tok-variableName tok-local"
	},
	{
		tag: J.definition(J.variableName),
		class: "tok-variableName tok-definition"
	},
	{
		tag: J.special(J.variableName),
		class: "tok-variableName2"
	},
	{
		tag: J.definition(J.propertyName),
		class: "tok-propertyName tok-definition"
	},
	{
		tag: J.typeName,
		class: "tok-typeName"
	},
	{
		tag: J.namespace,
		class: "tok-namespace"
	},
	{
		tag: J.className,
		class: "tok-className"
	},
	{
		tag: J.macroName,
		class: "tok-macroName"
	},
	{
		tag: J.propertyName,
		class: "tok-propertyName"
	},
	{
		tag: J.operator,
		class: "tok-operator"
	},
	{
		tag: J.comment,
		class: "tok-comment"
	},
	{
		tag: J.meta,
		class: "tok-meta"
	},
	{
		tag: J.invalid,
		class: "tok-invalid"
	},
	{
		tag: J.punctuation,
		class: "tok-punctuation"
	}
]);
//#endregion
//#region node_modules/@codemirror/language/dist/index.js
var Bg = /*@__PURE__*/ new W();
function Vg(e) {
	return z.define({ combine: e ? (t) => t.concat(e) : void 0 });
}
var Hg = /*@__PURE__*/ new W(), Ug = class {
	constructor(e, t, n = [], r = "") {
		this.data = e, this.name = r, Vc.prototype.hasOwnProperty("tree") || Object.defineProperty(Vc.prototype, "tree", { get() {
			return Y(this);
		} }), this.parser = t, this.extension = [e_.of(this), Vc.languageData.of((e, t, n) => {
			let r = Wg(e, t, n), i = r.type.prop(Bg);
			if (!i) return [];
			let a = e.facet(i), o = r.type.prop(Hg);
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
		return Wg(e, t, n).type.prop(Bg) == this.data;
	}
	findRegions(e) {
		let t = e.facet(e_);
		if (t?.data == this.data) return [{
			from: 0,
			to: e.doc.length
		}];
		if (!t || !t.allowsNesting) return [];
		let n = [], r = (e, t) => {
			if (e.prop(Bg) == this.data) {
				n.push({
					from: t,
					to: t + e.length
				});
				return;
			}
			let i = e.prop(W.mounted);
			if (i) {
				if (i.tree.prop(Bg) == this.data) {
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
				i instanceof K && r(i, e.positions[n] + t);
			}
		};
		return r(Y(e), 0), n;
	}
	get allowsNesting() {
		return !0;
	}
};
Ug.setState = /*@__PURE__*/ Ec.define();
function Wg(e, t, n) {
	let r = e.facet(e_), i = Y(e).topNode;
	if (!r || r.allowsNesting) for (let e = i; e; e = e.enter(t, n, G.ExcludeBuffers | G.EnterBracketed)) e.type.isTop && (i = e);
	return i;
}
var Gg = class e extends Ug {
	constructor(e, t, n) {
		super(e, t, [], n), this.parser = t;
	}
	static define(t) {
		let n = Vg(t.languageData);
		return new e(n, t.parser.configure({ props: [Bg.add((e) => e.isTop ? n : void 0)] }), t.name);
	}
	configure(t, n) {
		return new e(this.data, this.parser.configure(t), n || this.name);
	}
	get allowsNesting() {
		return this.parser.hasWrappers();
	}
};
function Y(e) {
	let t = e.field(Ug.state, !1);
	return t ? t.tree : K.empty;
}
var Kg = class {
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
}, qg = null, Jg = class e {
	constructor(e, t, n = [], r, i, a, o, s) {
		this.parser = e, this.state = t, this.fragments = n, this.tree = r, this.treeLen = i, this.viewport = a, this.skipped = o, this.scheduleOn = s, this.parse = null, this.tempSkipped = [];
	}
	static create(t, n, r) {
		return new e(t, n, [], K.empty, 0, r, [], null);
	}
	startParse() {
		return this.parser.startParse(new Kg(this.state.doc), this.fragments);
	}
	work(e, t) {
		return t != null && t >= this.state.doc.length && (t = void 0), this.tree != K.empty && this.isDone(t ?? this.state.doc.length) ? (this.takeTree(), !0) : this.withContext(() => {
			if (typeof e == "number") {
				let t = Date.now() + e;
				e = () => Date.now() > t;
			}
			for (this.parse ||= this.startParse(), t != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > t) && t < this.state.doc.length && this.parse.stopAt(t);;) {
				let n = this.parse.advance();
				if (n) {
					if (this.fragments = this.withoutTempSkipped(Yh.addTree(n, this.fragments, this.parse.stoppedAt != null)), this.treeLen = this.parse.stoppedAt ?? this.state.doc.length, this.tree = n, this.parse = null, this.treeLen < (t ?? this.state.doc.length)) this.parse = this.startParse();
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
		}), this.treeLen = e, this.tree = t, this.fragments = this.withoutTempSkipped(Yh.addTree(this.tree, this.fragments, !0)), this.parse = null);
	}
	withContext(e) {
		let t = qg;
		qg = this;
		try {
			return e();
		} finally {
			qg = t;
		}
	}
	withoutTempSkipped(e) {
		for (let t; t = this.tempSkipped.pop();) e = Yg(e, t.from, t.to);
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
			})), r = Yh.applyChanges(r, e), i = K.empty, a = 0, o = {
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
			n < e.to && r > e.from && (this.fragments = Yg(this.fragments, n, r), this.skipped.splice(t--, 1));
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
		return new class extends Xh {
			createParse(t, n, r) {
				let i = r[0].from, a = r[r.length - 1].to;
				return {
					parsedPos: i,
					advance() {
						let t = qg;
						if (t) {
							for (let e of r) t.tempSkipped.push(e);
							e && (t.scheduleOn = t.scheduleOn ? Promise.all([t.scheduleOn, e]) : e);
						}
						return this.parsedPos = a, new K(Th.none, [], [], a - i);
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
		return qg;
	}
};
function Yg(e, t, n) {
	return Yh.applyChanges(e, [{
		fromA: t,
		toA: n,
		fromB: t,
		toB: n
	}]);
}
var Xg = class e {
	constructor(e) {
		this.context = e, this.tree = e.tree;
	}
	apply(t) {
		if (!t.docChanged && this.tree == this.context.tree) return this;
		let n = this.context.changes(t.changes, t.state), r = this.context.treeLen == t.startState.doc.length ? void 0 : Math.max(t.changes.mapPos(this.context.treeLen), n.viewport.to);
		return n.work(20, r) || n.takeTree(), new e(n);
	}
	static init(t) {
		let n = Math.min(3e3, t.doc.length), r = Jg.create(t.facet(e_).parser, t, {
			from: 0,
			to: n
		});
		return r.work(20, n) || r.takeTree(), new e(r);
	}
};
Ug.state = /*@__PURE__*/ ac.define({
	create: Xg.init,
	update(e, t) {
		for (let e of t.effects) if (e.is(Ug.setState)) return e.value;
		return t.startState.facet(e_) == t.state.facet(e_) ? e.apply(t) : Xg.init(t.state);
	}
});
var Zg = (e) => {
	let t = setTimeout(() => e(), 500);
	return () => clearTimeout(t);
};
typeof requestIdleCallback < "u" && (Zg = (e) => {
	let t = -1, n = setTimeout(() => {
		t = requestIdleCallback(e, { timeout: 400 });
	}, 100);
	return () => t < 0 ? clearTimeout(n) : cancelIdleCallback(t);
});
var Qg = typeof navigator < "u" && navigator.scheduling?.isInputPending ? () => navigator.scheduling.isInputPending() : null, $g = /*@__PURE__*/ fd.fromClass(class {
	constructor(e) {
		this.view = e, this.working = null, this.workScheduled = 0, this.chunkEnd = -1, this.chunkBudget = -1, this.work = this.work.bind(this), this.scheduleWork();
	}
	update(e) {
		let t = this.view.state.field(Ug.state).context;
		(t.updateViewport(e.view.viewport) || this.view.viewport.to > t.treeLen) && this.scheduleWork(), (e.docChanged || e.selectionSet) && (this.view.hasFocus && (this.chunkBudget += 50), this.scheduleWork()), this.checkAsyncSchedule(t);
	}
	scheduleWork() {
		if (this.working) return;
		let { state: e } = this.view, t = e.field(Ug.state);
		(t.tree != t.context.tree || !t.context.isDone(e.doc.length)) && (this.working = Zg(this.work));
	}
	work(e) {
		this.working = null;
		let t = Date.now();
		if (this.chunkEnd < t && (this.chunkEnd < 0 || this.view.hasFocus) && (this.chunkEnd = t + 3e4, this.chunkBudget = 3e3), this.chunkBudget <= 0) return;
		let { state: n, viewport: { to: r } } = this.view, i = n.field(Ug.state);
		if (i.tree == i.context.tree && i.context.isDone(r + 1e5)) return;
		let a = Date.now() + Math.min(this.chunkBudget, 100, e && !Qg ? Math.max(25, e.timeRemaining() - 5) : 1e9), o = i.context.treeLen < r && n.doc.length > r + 1e3, s = i.context.work(() => Qg && Qg() || Date.now() > a, r + (o ? 0 : 1e5));
		this.chunkBudget -= Date.now() - t, (s || this.chunkBudget <= 0) && (i.context.takeTree(), this.view.dispatch({ effects: Ug.setState.of(new Xg(i.context)) })), this.chunkBudget > 0 && (!s || o) && this.scheduleWork(), this.checkAsyncSchedule(i.context);
	}
	checkAsyncSchedule(e) {
		e.scheduleOn &&= (this.workScheduled++, e.scheduleOn.then(() => this.scheduleWork()).catch((e) => cd(this.view.state, e)).then(() => this.workScheduled--), null);
	}
	destroy() {
		this.working && this.working();
	}
	isWorking() {
		return !!(this.working || this.workScheduled > 0);
	}
}, { eventHandlers: { focus() {
	this.scheduleWork();
} } }), e_ = /*@__PURE__*/ z.define({
	combine(e) {
		return e.length ? e[0] : null;
	},
	enables: (e) => [
		Ug.state,
		$g,
		U.contentAttributes.compute([e], (t) => {
			let n = t.facet(e);
			return n && n.name ? { "data-language": n.name } : {};
		})
	]
}), t_ = class {
	constructor(e, t = []) {
		this.language = e, this.support = t, this.extension = [e, t];
	}
}, n_ = class e {
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
}, r_ = /*@__PURE__*/ z.define(), i_ = /*@__PURE__*/ z.define({ combine: (e) => {
	if (!e.length) return "  ";
	let t = e[0];
	if (!t || /\S/.test(t) || Array.from(t).some((e) => e != t[0])) throw Error("Invalid indent unit: " + JSON.stringify(e[0]));
	return t;
} });
function a_(e) {
	let t = e.facet(i_);
	return t.charCodeAt(0) == 9 ? e.tabSize * t.length : t.length;
}
function o_(e, t) {
	let n = "", r = e.tabSize, i = e.facet(i_)[0];
	if (i == "	") {
		for (; t >= r;) n += "	", t -= r;
		i = " ";
	}
	for (let e = 0; e < t; e++) n += i;
	return n;
}
function s_(e, t) {
	e instanceof Vc && (e = new c_(e));
	for (let n of e.state.facet(r_)) {
		let r = n(e, t);
		if (r !== void 0) return r;
	}
	let n = Y(e.state);
	return n.length >= t ? u_(e, n, t) : null;
}
var c_ = class {
	constructor(e, t = {}) {
		this.state = e, this.options = t, this.unit = a_(e);
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
		return cl(e, this.state.tabSize, t);
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
}, l_ = /*@__PURE__*/ new W();
function u_(e, t, n) {
	let r = t.resolveStack(n), i = t.resolveInner(n, -1).resolve(n, 0).enterUnfinishedNodesBefore(n);
	if (i != r.node) {
		let e = [];
		for (let t = i; t && !(t.from < r.node.from || t.to > r.node.to || t.from == r.node.from && t.type == r.node.type); t = t.parent) e.push(t);
		for (let t = e.length - 1; t >= 0; t--) r = {
			node: e[t],
			next: r
		};
	}
	return d_(r, e, n);
}
function d_(e, t, n) {
	for (let r = e; r; r = r.next) {
		let e = p_(r.node);
		if (e) return e(h_.create(t, n, r));
	}
	return 0;
}
function f_(e) {
	return e.pos == e.options.simulateBreak && e.options.simulateDoubleBreak;
}
function p_(e) {
	let t = e.type.prop(l_);
	if (t) return t;
	let n = e.firstChild, r;
	if (n && (r = n.type.prop(W.closedBy))) {
		let t = e.lastChild, n = t && r.indexOf(t.name) > -1;
		return (e) => y_(e, !0, 1, void 0, n && !f_(e) ? t.from : void 0);
	}
	return e.parent == null ? m_ : null;
}
function m_() {
	return 0;
}
var h_ = class e extends c_ {
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
			if (g_(n, e)) break;
			t = this.state.doc.lineAt(n.from);
		}
		return this.lineIndent(t.from);
	}
	continue() {
		return d_(this.context.next, this.base, this.pos);
	}
};
function g_(e, t) {
	for (let n = t; n; n = n.parent) if (e == n) return !0;
	return !1;
}
function __(e) {
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
function v_({ closing: e, align: t = !0, units: n = 1 }) {
	return (r) => y_(r, t, n, e);
}
function y_(e, t, n, r, i) {
	let a = e.textAfter, o = a.match(/^\s*/)[0].length, s = r && a.slice(o, o + r.length) == r || i == e.pos + o, c = t ? __(e) : null;
	return c ? s ? e.column(c.from) : e.column(c.to) : e.baseIndent + (s ? 0 : e.unit * n);
}
var b_ = (e) => e.baseIndent;
function x_({ except: e, units: t = 1 } = {}) {
	return (n) => {
		let r = e && e.test(n.textAfter);
		return n.baseIndent + (r ? 0 : t * n.unit);
	};
}
var S_ = /*@__PURE__*/ z.define(), C_ = /*@__PURE__*/ new W();
function w_(e) {
	let t = e.firstChild, n = e.lastChild;
	return t && t.to < n.from ? {
		from: t.to,
		to: n.type.isError ? e.to : n.from
	} : null;
}
var T_ = class e {
	constructor(e, t) {
		this.specs = e;
		let n;
		function r(e) {
			let t = ml.newName();
			return (n ||= Object.create(null))["." + t] = e, t;
		}
		let i = typeof t.all == "string" ? t.all : t.all ? r(t.all) : void 0, a = t.scope;
		this.scope = a instanceof Ug ? (e) => e.prop(Bg) == a.data : a ? (e) => e == a : void 0, this.style = xg(e.map((e) => ({
			tag: e.tag,
			class: e.class || r(Object.assign({}, e, { tag: null }))
		})), { all: i }).style, this.module = n ? new ml(n) : null, this.themeType = t.themeType;
	}
	static define(t, n) {
		return new e(t, n || {});
	}
}, E_ = /*@__PURE__*/ z.define(), D_ = /*@__PURE__*/ z.define({ combine(e) {
	return e.length ? [e[0]] : null;
} });
function O_(e) {
	let t = e.facet(E_);
	return t.length ? t : e.facet(D_);
}
function k_(e, t) {
	let n = [j_], r;
	return e instanceof T_ && (e.module && n.push(U.styleModule.of(e.module)), r = e.themeType), t?.fallback ? n.push(D_.of(e)) : r ? n.push(E_.computeN([U.darkTheme], (t) => t.facet(U.darkTheme) == (r == "dark") ? [e] : [])) : n.push(E_.of(e)), n;
}
var A_ = class {
	constructor(e) {
		this.markCache = Object.create(null), this.tree = Y(e.state), this.decorations = this.buildDeco(e, O_(e.state)), this.decoratedTo = e.viewport.to;
	}
	update(e) {
		let t = Y(e.state), n = O_(e.state), r = n != O_(e.startState), { viewport: i } = e.view, a = e.changes.mapPos(this.decoratedTo, 1);
		t.length < i.to && !r && t.type == this.tree.type && a >= i.to ? (this.decorations = this.decorations.map(e.changes), this.decoratedTo = a) : (t != this.tree || e.viewportChanged || r) && (this.tree = t, this.decorations = this.buildDeco(e.view, n), this.decoratedTo = i.to);
	}
	buildDeco(e, t) {
		if (!t || !this.tree.length) return Ul.none;
		let n = new Zc();
		for (let { from: r, to: i } of e.visibleRanges) Cg(this.tree, t, (e, t, r) => {
			n.add(e, t, this.markCache[r] || (this.markCache[r] = Ul.mark({ class: r })));
		}, r, i);
		return n.finish();
	}
}, j_ = /*@__PURE__*/ cc.high(/*@__PURE__*/ fd.fromClass(A_, { decorations: (e) => e.decorations })), M_ = /*@__PURE__*/ T_.define([
	{
		tag: J.meta,
		color: "#404740"
	},
	{
		tag: J.link,
		textDecoration: "underline"
	},
	{
		tag: J.heading,
		textDecoration: "underline",
		fontWeight: "bold"
	},
	{
		tag: J.emphasis,
		fontStyle: "italic"
	},
	{
		tag: J.strong,
		fontWeight: "bold"
	},
	{
		tag: J.strikethrough,
		textDecoration: "line-through"
	},
	{
		tag: J.keyword,
		color: "#708"
	},
	{
		tag: [
			J.atom,
			J.bool,
			J.url,
			J.contentSeparator,
			J.labelName
		],
		color: "#219"
	},
	{
		tag: [J.literal, J.inserted],
		color: "#164"
	},
	{
		tag: [J.string, J.deleted],
		color: "#a11"
	},
	{
		tag: [
			J.regexp,
			J.escape,
			/*@__PURE__*/ J.special(J.string)
		],
		color: "#e40"
	},
	{
		tag: /*@__PURE__*/ J.definition(J.variableName),
		color: "#00f"
	},
	{
		tag: /*@__PURE__*/ J.local(J.variableName),
		color: "#30a"
	},
	{
		tag: [J.typeName, J.namespace],
		color: "#085"
	},
	{
		tag: J.className,
		color: "#167"
	},
	{
		tag: [/*@__PURE__*/ J.special(J.variableName), J.macroName],
		color: "#256"
	},
	{
		tag: /*@__PURE__*/ J.definition(J.propertyName),
		color: "#00c"
	},
	{
		tag: J.comment,
		color: "#940"
	},
	{
		tag: J.invalid,
		color: "#f00"
	}
]), N_ = 1e4, P_ = "()[]{}", F_ = /*@__PURE__*/ new W();
function I_(e, t, n) {
	let r = e.prop(t < 0 ? W.openedBy : W.closedBy);
	if (r) return r;
	if (e.name.length == 1) {
		let r = n.indexOf(e.name);
		if (r > -1 && r % 2 == +(t < 0)) return [n[r + t]];
	}
	return null;
}
function L_(e) {
	let t = e.type.prop(F_);
	return t ? t(e.node) : e;
}
function R_(e, t, n, r = {}) {
	let i = r.maxScanDistance || N_, a = r.brackets || P_, o = Y(e), s = o.resolveInner(t, n);
	for (let r = s; r; r = r.parent) {
		let i = I_(r.type, n, a);
		if (i && r.from < r.to) {
			let o = L_(r);
			if (o && (n > 0 ? t >= o.from && t < o.to : t > o.from && t <= o.to)) return z_(e, t, n, r, o, i, a);
		}
	}
	return B_(e, t, n, o, s.type, i, a);
}
function z_(e, t, n, r, i, a, o) {
	let s = r.parent, c = {
		from: i.from,
		to: i.to
	}, l = 0, u = s?.cursor();
	if (u && (n < 0 ? u.childBefore(r.from) : u.childAfter(r.to))) do
		if (n < 0 ? u.to <= r.from : u.from >= r.to) {
			if (l == 0 && a.indexOf(u.type.name) > -1 && u.from < u.to) {
				let e = L_(u);
				return {
					start: c,
					end: e ? {
						from: e.from,
						to: e.to
					} : void 0,
					matched: !0
				};
			}
			if (I_(u.type, n, o)) l++;
			else if (I_(u.type, -n, o)) {
				if (l == 0) {
					let e = L_(u);
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
function B_(e, t, n, r, i, a, o) {
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
function V_(e, t, n, r = 0, i = 0) {
	t ?? (t = e.search(/[^\s\u00a0]/), t == -1 && (t = e.length));
	let a = i;
	for (let i = r; i < t; i++) e.charCodeAt(i) == 9 ? a += n - a % n : a++;
	return a;
}
var H_ = class {
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
		return this.lastColumnPos < this.start && (this.lastColumnValue = V_(this.string, this.start, this.tabSize, this.lastColumnPos, this.lastColumnValue), this.lastColumnPos = this.start), this.lastColumnValue;
	}
	indentation() {
		return this.overrideIndent ?? V_(this.string, null, this.tabSize);
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
};
function U_(e) {
	return {
		name: e.name || "",
		token: e.token,
		blankLine: e.blankLine || (() => {}),
		startState: e.startState || (() => !0),
		copyState: e.copyState || W_,
		indent: e.indent || (() => null),
		languageData: e.languageData || {},
		tokenTable: e.tokenTable || Q_,
		mergeTokens: e.mergeTokens !== !1
	};
}
function W_(e) {
	if (typeof e != "object") return e;
	let t = {};
	for (let n in e) {
		let r = e[n];
		t[n] = r instanceof Array ? r.slice() : r;
	}
	return t;
}
var G_ = /*@__PURE__*/ new WeakMap(), K_ = class e extends Ug {
	constructor(e) {
		let t = Vg(e.languageData), n = U_(e), r, i = new class extends Xh {
			createParse(e, t, n) {
				return new X_(r, e, t, n);
			}
		}();
		super(t, i, [], e.name), this.topNode = cv(t, this), r = this, this.streamParser = n, this.stateAfter = new W({ perNode: !0 }), this.tokenTable = e.tokenTable ? new iv(n.tokenTable) : av;
	}
	static define(t) {
		return new e(t);
	}
	getIndent(e) {
		let t, { overrideIndentation: n } = e.options;
		n && (t = G_.get(e.state), t != null && t < e.pos - 1e4 && (t = void 0));
		let r = q_(this, e.node.tree, e.node.from, e.node.from, t ?? e.pos), i, a;
		if (r ? (a = r.state, i = r.pos + 1) : (a = this.streamParser.startState(e.unit), i = e.node.from), e.pos - i > 1e4) return null;
		for (; i < e.pos;) {
			let t = e.state.doc.lineAt(i), r = Math.min(e.pos, t.to);
			if (t.length) {
				let i = n ? n(t.from) : -1, o = new H_(t.text, e.state.tabSize, e.unit, i < 0 ? void 0 : i);
				for (; o.pos < r - t.from;) Z_(this.streamParser.token, o, a);
			} else this.streamParser.blankLine(a, e.unit);
			if (r == e.pos) break;
			i = t.to + 1;
		}
		let o = e.lineAt(e.pos);
		return n && t == null && G_.set(e.state, o.from), this.streamParser.indent(a, /^\s*(.*)/.exec(o.text)[1], e);
	}
	get allowsNesting() {
		return !1;
	}
};
function q_(e, t, n, r, i) {
	let a = n >= r && n + t.length <= i && t.prop(e.stateAfter);
	if (a) return {
		state: e.streamParser.copyState(a),
		pos: n + t.length
	};
	for (let a = t.children.length - 1; a >= 0; a--) {
		let o = t.children[a], s = n + t.positions[a], c = o instanceof K && s < i && q_(e, o, s, r, i);
		if (c) return c;
	}
	return null;
}
function J_(e, t, n, r, i) {
	if (i && n <= 0 && r >= t.length) return t;
	!i && n == 0 && t.type == e.topNode && (i = !0);
	for (let a = t.children.length - 1; a >= 0; a--) {
		let o = t.positions[a], s = t.children[a], c;
		if (o < r && s instanceof K) {
			if (!(c = J_(e, s, n - o, r - o, i))) break;
			return i ? new K(t.type, t.children.slice(0, a).concat(c), t.positions.slice(0, a + 1), o + c.length) : c;
		}
	}
	return null;
}
function Y_(e, t, n, r, i) {
	for (let i of t) {
		let t = i.from + (i.openStart ? 25 : 0), a = i.to - (i.openEnd ? 25 : 0), o = t <= n && a > n && q_(e, i.tree, 0 - i.offset, n, a), s;
		if (o && o.pos <= r && (s = J_(e, i.tree, n + i.offset, o.pos + i.offset, !1))) return {
			state: o.state,
			tree: s
		};
	}
	return {
		state: e.streamParser.startState(i ? a_(i) : 4),
		tree: K.empty
	};
}
var X_ = class {
	constructor(e, t, n, r) {
		this.lang = e, this.input = t, this.fragments = n, this.ranges = r, this.stoppedAt = null, this.chunks = [], this.chunkPos = [], this.chunk = [], this.chunkReused = void 0, this.rangeIndex = 0, this.to = r[r.length - 1].to;
		let i = Jg.get(), a = r[0].from, { state: o, tree: s } = Y_(e, n, a, this.to, i?.state);
		this.state = o, this.parsedPos = this.chunkStart = a + s.length;
		for (let e = 0; e < s.children.length; e++) this.chunks.push(s.children[e]), this.chunkPos.push(s.positions[e]);
		i && this.parsedPos < i.viewport.from - 1e5 && r.some((e) => e.from <= i.viewport.from && e.to >= i.viewport.from) && (this.state = this.lang.streamParser.startState(a_(i.state)), i.skipUntilInView(this.parsedPos, i.viewport.from), this.parsedPos = i.viewport.from), this.moveRangeIndex();
	}
	advance() {
		let e = Jg.get(), t = this.stoppedAt == null ? this.to : Math.min(this.to, this.stoppedAt), n = Math.min(t, this.chunkStart + 512);
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
		let { line: t, end: n } = this.nextLine(), r = 0, { streamParser: i } = this.lang, a = new H_(t, e ? e.state.tabSize : 4, e ? a_(e.state) : 2);
		if (a.eol()) i.blankLine(this.state, a.indentUnit);
		else for (; !a.eol();) {
			let e = Z_(i.token, a, this.state);
			if (e && (r = this.emitToken(this.lang.tokenTable.resolve(e), this.parsedPos + a.start, this.parsedPos + a.pos, r)), a.start > 1e4) break;
		}
		this.parsedPos = n, this.moveRangeIndex(), this.parsedPos < this.to && this.parsedPos++;
	}
	finishChunk() {
		let e = K.build({
			buffer: this.chunk,
			start: this.chunkStart,
			length: this.parsedPos - this.chunkStart,
			nodeSet: ev,
			topID: 0,
			maxBufferLength: 512,
			reused: this.chunkReused
		});
		e = new K(e.type, e.children, e.positions, e.length, [[this.lang.stateAfter, this.lang.streamParser.copyState(this.state)]]), this.chunks.push(e), this.chunkPos.push(this.chunkStart - this.ranges[0].from), this.chunk = [], this.chunkReused = void 0, this.chunkStart = this.parsedPos;
	}
	finish() {
		return new K(this.lang.topNode, this.chunks, this.chunkPos, this.parsedPos - this.ranges[0].from).balance();
	}
};
function Z_(e, t, n) {
	t.start = t.pos;
	for (let r = 0; r < 10; r++) {
		let r = e(t, n);
		if (t.pos > t.start) return r;
	}
	throw Error("Stream parser failed to advance stream.");
}
var Q_ = /*@__PURE__*/ Object.create(null), $_ = [Th.none], ev = /*@__PURE__*/ new Eh($_), tv = [], nv = /*@__PURE__*/ Object.create(null), rv = /*@__PURE__*/ Object.create(null);
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
]) rv[e] = /*@__PURE__*/ sv(Q_, t);
var iv = class {
	constructor(e) {
		this.extra = e, this.table = Object.assign(Object.create(null), rv);
	}
	resolve(e) {
		return e ? this.table[e] || (this.table[e] = sv(this.extra, e)) : 0;
	}
}, av = /*@__PURE__*/ new iv(Q_);
function ov(e, t) {
	tv.indexOf(e) > -1 || (tv.push(e), console.warn(t));
}
function sv(e, t) {
	let n = [];
	for (let r of t.split(" ")) {
		let t = [];
		for (let n of r.split(".")) {
			let r = e[n] || J[n];
			r ? typeof r == "function" ? t.length ? t = t.map(r) : ov(n, `Modifier ${n} used at start of tag`) : t.length ? ov(n, `Tag ${n} used as modifier`) : t = Array.isArray(r) ? r : [r] : ov(n, `Unknown highlighting tag ${n}`);
		}
		for (let e of t) n.push(e);
	}
	if (!n.length) return 0;
	let r = t.replace(/ /g, "_"), i = r + " " + n.map((e) => e.id), a = nv[i];
	if (a) return a.id;
	let o = nv[i] = Th.define({
		id: $_.length,
		name: r,
		props: [vg({ [r]: n })]
	});
	return $_.push(o), o.id;
}
function cv(e, t) {
	let n = Th.define({
		id: $_.length,
		name: "Document",
		props: [Bg.add(() => e), l_.add(() => (e) => t.getIndent(e))],
		top: !0
	});
	return $_.push(n), n;
}
Tu.RTL, Tu.LTR;
//#endregion
//#region node_modules/@codemirror/commands/dist/index.js
var lv = (e) => {
	let { state: t } = e, n = t.doc.lineAt(t.selection.main.from), r = mv(e.state, n.from);
	return r.line ? dv(e) : r.block ? pv(e) : !1;
};
function uv(e, t) {
	return ({ state: n, dispatch: r }) => {
		if (n.readOnly) return !1;
		let i = e(t, n);
		return i ? (r(n.update(i)), !0) : !1;
	};
}
var dv = /*@__PURE__*/ uv(yv, 0), fv = /*@__PURE__*/ uv(vv, 0), pv = /*@__PURE__*/ uv((e, t) => vv(e, t, _v(t)), 0);
function mv(e, t) {
	let n = e.languageDataAt("commentTokens", t, 1);
	return n.length ? n[0] : {};
}
var hv = 50;
function gv(e, { open: t, close: n }, r, i) {
	let a = e.sliceDoc(r - hv, r), o = e.sliceDoc(i, i + hv), s = /\s*$/.exec(a)[0].length, c = /^\s*/.exec(o)[0].length, l = a.length - s;
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
	i - r <= 100 ? u = d = e.sliceDoc(r, i) : (u = e.sliceDoc(r, r + hv), d = e.sliceDoc(i - hv, i));
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
function _v(e) {
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
function vv(e, t, n = t.selection.ranges) {
	let r = n.map((e) => mv(t, e.from).block);
	if (!r.every((e) => e)) return null;
	let i = n.map((e, n) => gv(t, r[n], e.from, e.to));
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
function yv(e, t, n = t.selection.ranges) {
	let r = [], i = -1;
	ranges: for (let { from: e, to: a } of n) {
		let n = r.length, o = 1e9, s;
		for (let n = e; n <= a;) {
			let c = t.doc.lineAt(n);
			if (s == null && (s = mv(t, c.from).line, !s)) continue ranges;
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
var bv = /*@__PURE__*/ Cc.define(), xv = /*@__PURE__*/ Cc.define(), Sv = /*@__PURE__*/ z.define(), Cv = /*@__PURE__*/ z.define({ combine(e) {
	return Hc(e, {
		minDepth: 100,
		newGroupDelay: 500,
		joinToEvent: (e, t) => t
	}, {
		minDepth: Math.max,
		newGroupDelay: Math.min,
		joinToEvent: (e, t) => (n, r) => e(n, r) || t(n, r)
	});
} }), wv = /*@__PURE__*/ ac.define({
	create() {
		return Uv.empty;
	},
	update(e, t) {
		let n = t.state.facet(Cv), r = t.annotation(bv);
		if (r) {
			let i = jv.fromTransaction(t, r.selection), a = r.side, o = a == 0 ? e.undone : e.done;
			return o = i ? Mv(o, o.length, n.minDepth, i) : Rv(o, t.startState.selection), new Uv(a == 0 ? r.rest : o, a == 0 ? o : r.rest);
		}
		let i = t.annotation(xv);
		if ((i == "full" || i == "before") && (e = e.isolate()), t.annotation(Dc.addToHistory) === !1) return t.changes.empty ? e : e.addMapping(t.changes.desc);
		let a = jv.fromTransaction(t), o = t.annotation(Dc.time), s = t.annotation(Dc.userEvent);
		return a ? e = e.addChanges(a, o, s, n, t) : t.selection && (e = e.addSelection(t.startState.selection, o, s, n.newGroupDelay)), (i == "full" || i == "after") && (e = e.isolate()), e;
	},
	toJSON(e) {
		return {
			done: e.done.map((e) => e.toJSON()),
			undone: e.undone.map((e) => e.toJSON())
		};
	},
	fromJSON(e) {
		return new Uv(e.done.map(jv.fromJSON), e.undone.map(jv.fromJSON));
	}
});
function Tv(e = {}) {
	return [
		wv,
		Cv.of(e),
		U.domEventHandlers({ beforeinput(e, t) {
			let n = e.inputType == "historyUndo" ? Dv : e.inputType == "historyRedo" ? Ov : null;
			return n ? (e.preventDefault(), n(t)) : !1;
		} })
	];
}
function Ev(e, t) {
	return function({ state: n, dispatch: r }) {
		if (!t && n.readOnly) return !1;
		let i = n.field(wv, !1);
		if (!i) return !1;
		let a = i.pop(e, n, t);
		return a ? (r(a), !0) : !1;
	};
}
var Dv = /*@__PURE__*/ Ev(0, !1), Ov = /*@__PURE__*/ Ev(1, !1), kv = /*@__PURE__*/ Ev(0, !0), Av = /*@__PURE__*/ Ev(1, !0), jv = class e {
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
		return new e(t.changes && Us.fromJSON(t.changes), [], t.mapped && Hs.fromJSON(t.mapped), t.startSelection && R.fromJSON(t.startSelection), t.selectionsAfter.map(R.fromJSON));
	}
	static fromTransaction(t, n) {
		let r = Iv;
		for (let e of t.startState.facet(Sv)) {
			let n = e(t);
			n.length && (r = r.concat(n));
		}
		return !r.length && t.changes.empty ? null : new e(t.changes.invert(t.startState.doc), r, void 0, n || t.startState.selection, Iv);
	}
	static selection(t) {
		return new e(void 0, Iv, void 0, void 0, t);
	}
};
function Mv(e, t, n, r) {
	let i = t + 1 > n + 20 ? t - n - 1 : 0, a = e.slice(i, t);
	return a.push(r), a;
}
function Nv(e, t) {
	let n = [], r = !1;
	return e.iterChangedRanges((e, t) => n.push(e, t)), t.iterChangedRanges((e, t, i, a) => {
		for (let e = 0; e < n.length;) {
			let t = n[e++], o = n[e++];
			a >= t && i <= o && (r = !0);
		}
	}), r;
}
function Pv(e, t) {
	return e.ranges.length == t.ranges.length && e.ranges.filter((e, n) => e.empty != t.ranges[n].empty).length === 0;
}
function Fv(e, t) {
	return e.length ? t.length ? e.concat(t) : e : t;
}
var Iv = [], Lv = 200;
function Rv(e, t) {
	if (e.length) {
		let n = e[e.length - 1], r = n.selectionsAfter.slice(Math.max(0, n.selectionsAfter.length - Lv));
		return r.length && r[r.length - 1].eq(t) ? e : (r.push(t), Mv(e, e.length - 1, 1e9, n.setSelAfter(r)));
	}
	return [jv.selection([t])];
}
function zv(e) {
	let t = e[e.length - 1], n = e.slice();
	return n[e.length - 1] = t.setSelAfter(t.selectionsAfter.slice(0, t.selectionsAfter.length - 1)), n;
}
function Bv(e, t) {
	if (!e.length) return e;
	let n = e.length, r = Iv;
	for (; n;) {
		let i = Vv(e[n - 1], t, r);
		if (i.changes && !i.changes.empty || i.effects.length) {
			let t = e.slice(0, n);
			return t[n - 1] = i, t;
		}
		t = i.mapped, n--, r = i.selectionsAfter;
	}
	return r.length ? [jv.selection(r)] : Iv;
}
function Vv(e, t, n) {
	let r = Fv(e.selectionsAfter.length ? e.selectionsAfter.map((e) => e.map(t)) : Iv, n);
	if (!e.changes) return jv.selection(r);
	let i = e.changes.map(t), a = t.mapDesc(e.changes, !0), o = e.mapped ? e.mapped.composeDesc(a) : a;
	return new jv(i, Ec.mapEffects(e.effects, t), o, e.startSelection.map(a), r);
}
var Hv = /^(input\.type|delete)($|\.)/, Uv = class e {
	constructor(e, t, n = 0, r = void 0) {
		this.done = e, this.undone = t, this.prevTime = n, this.prevUserEvent = r;
	}
	isolate() {
		return this.prevTime ? new e(this.done, this.undone) : this;
	}
	addChanges(t, n, r, i, a) {
		let o = this.done, s = o[o.length - 1];
		return o = s && s.changes && !s.changes.empty && t.changes && (!r || Hv.test(r)) && (!s.selectionsAfter.length && n - this.prevTime < i.newGroupDelay && i.joinToEvent(a, Nv(s.changes, t.changes)) || r == "input.type.compose") ? Mv(o, o.length - 1, i.minDepth, new jv(t.changes.compose(s.changes), Fv(Ec.mapEffects(t.effects, s.changes), s.effects), s.mapped, s.startSelection, Iv)) : Mv(o, o.length, i.minDepth, t), new e(o, Iv, n, r);
	}
	addSelection(t, n, r, i) {
		let a = this.done.length ? this.done[this.done.length - 1].selectionsAfter : Iv;
		return a.length > 0 && n - this.prevTime < i && r == this.prevUserEvent && r && /^select($|\.)/.test(r) && Pv(a[a.length - 1], t) ? this : new e(Rv(this.done, t), this.undone, n, r);
	}
	addMapping(t) {
		return new e(Bv(this.done, t), Bv(this.undone, t), this.prevTime, this.prevUserEvent);
	}
	pop(e, t, n) {
		let r = e == 0 ? this.done : this.undone;
		if (r.length == 0) return null;
		let i = r[r.length - 1], a = i.selectionsAfter[0] || (i.startSelection ? i.startSelection.map(i.changes.invertedDesc, 1) : t.selection);
		if (n && i.selectionsAfter.length) return t.update({
			selection: i.selectionsAfter[i.selectionsAfter.length - 1],
			annotations: bv.of({
				side: e,
				rest: zv(r),
				selection: a
			}),
			userEvent: e == 0 ? "select.undo" : "select.redo",
			scrollIntoView: !0
		});
		if (i.changes) {
			let n = r.length == 1 ? Iv : r.slice(0, r.length - 1);
			return i.mapped && (n = Bv(n, i.mapped)), t.update({
				changes: i.changes,
				selection: i.startSelection,
				effects: i.effects,
				annotations: bv.of({
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
Uv.empty = /*@__PURE__*/ new Uv(Iv, Iv);
var Wv = [
	{
		key: "Mod-z",
		run: Dv,
		preventDefault: !0
	},
	{
		key: "Mod-y",
		mac: "Mod-Shift-z",
		run: Ov,
		preventDefault: !0
	},
	{
		linux: "Ctrl-Shift-z",
		run: Ov,
		preventDefault: !0
	},
	{
		key: "Mod-u",
		run: kv,
		preventDefault: !0
	},
	{
		key: "Alt-u",
		mac: "Mod-Shift-u",
		run: Av,
		preventDefault: !0
	}
];
function Gv(e, t) {
	return R.create(e.ranges.map(t), e.mainIndex);
}
function Kv(e, t) {
	return e.update({
		selection: t,
		scrollIntoView: !0,
		userEvent: "select"
	});
}
function qv({ state: e, dispatch: t }, n) {
	let r = Gv(e.selection, n);
	return !r.eq(e.selection, !0) && (t(Kv(e, r)), !0);
}
function Jv(e, t) {
	return R.cursor(t ? e.to : e.from);
}
function Yv(e, t) {
	return qv(e, (n) => n.empty ? e.moveByChar(n, t) : Jv(n, t));
}
function Xv(e) {
	return e.textDirectionAt(e.state.selection.main.head) == Tu.LTR;
}
var Zv = (e) => Yv(e, !Xv(e)), Qv = (e) => Yv(e, Xv(e));
function $v(e, t) {
	return qv(e, (n) => n.empty ? e.moveByGroup(n, t) : Jv(n, t));
}
var ey = (e) => $v(e, !Xv(e)), ty = (e) => $v(e, Xv(e));
typeof Intl < "u" && Intl.Segmenter;
function ny(e, t, n) {
	if (t.type.prop(n)) return !0;
	let r = t.to - t.from;
	return r && (r > 2 || /[^\s,.;:]/.test(e.sliceDoc(t.from, t.to))) || t.firstChild;
}
function ry(e, t, n) {
	let r = Y(e).resolveInner(t.head), i = n ? W.closedBy : W.openedBy;
	for (let a = t.head;;) {
		let t = n ? r.childAfter(a) : r.childBefore(a);
		if (!t) break;
		ny(e, t, i) ? r = t : a = n ? t.to : t.from;
	}
	let a = r.type.prop(i), o, s;
	return s = a && (o = n ? R_(e, r.from, 1) : R_(e, r.to, -1)) && o.matched ? n ? o.end.to : o.end.from : n ? r.to : r.from, R.cursor(s, n ? -1 : 1);
}
var iy = (e) => qv(e, (t) => ry(e.state, t, !Xv(e))), ay = (e) => qv(e, (t) => ry(e.state, t, Xv(e)));
function oy(e, t) {
	return qv(e, (n) => {
		if (!n.empty) return Jv(n, t);
		let r = e.moveVertically(n, t);
		return r.head == n.head ? e.moveToLineBoundary(n, t) : r;
	});
}
var sy = (e) => oy(e, !1), cy = (e) => oy(e, !0);
function ly(e) {
	let t = e.scrollDOM.clientHeight < e.scrollDOM.scrollHeight - 2, n = 0, r = 0, i;
	if (t) {
		for (let t of e.state.facet(U.scrollMargins)) {
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
function uy(e, t) {
	let n = ly(e), { state: r } = e, i = Gv(r.selection, (r) => r.empty ? e.moveVertically(r, t, n.height) : Jv(r, t));
	if (i.eq(r.selection)) return !1;
	let a;
	if (n.selfScroll) {
		let t = e.coordsAtPos(r.selection.main.head), o = e.scrollDOM.getBoundingClientRect(), s = o.top + n.marginTop, c = o.bottom - n.marginBottom;
		t && t.top > s && t.bottom < c && (a = U.scrollIntoView(i.main.head, {
			y: "start",
			yMargin: t.top - s
		}));
	}
	return e.dispatch(Kv(r, i), { effects: a }), !0;
}
var dy = (e) => uy(e, !1), fy = (e) => uy(e, !0);
function py(e, t, n) {
	let r = e.lineBlockAt(t.head), i = e.moveToLineBoundary(t, n);
	if (i.head == t.head && i.head != (n ? r.to : r.from) && (i = e.moveToLineBoundary(t, n, !1)), !n && i.head == r.from && r.length) {
		let n = /^\s*/.exec(e.state.sliceDoc(r.from, Math.min(r.from + 100, r.to)))[0].length;
		n && t.head != r.from + n && (i = R.cursor(r.from + n));
	}
	return i;
}
var my = (e) => qv(e, (t) => py(e, t, !0)), hy = (e) => qv(e, (t) => py(e, t, !1)), gy = (e) => qv(e, (t) => py(e, t, !Xv(e))), _y = (e) => qv(e, (t) => py(e, t, Xv(e))), vy = (e) => qv(e, (t) => e.moveToLineBoundary(t, !1, !1)), yy = (e) => qv(e, (t) => e.moveToLineBoundary(t, !0, !1));
function by(e, t, n) {
	let r = !1, i = Gv(e.selection, (t) => {
		let i = R_(e, t.head, -1) || R_(e, t.head, 1) || t.head > 0 && R_(e, t.head - 1, 1) || t.head < e.doc.length && R_(e, t.head + 1, -1);
		if (!i || !i.end) return t;
		r = !0;
		let a = i.start.from == t.head ? i.end.to : i.end.from;
		return n ? R.range(t.anchor, a) : R.cursor(a);
	});
	return r ? (t(Kv(e, i)), !0) : !1;
}
var xy = ({ state: e, dispatch: t }) => by(e, t, !1);
function Sy(e, t, n) {
	let r = Gv(e.state.selection, (e) => {
		e.undirectional && e.head >= e.anchor != t && (e = R.range(e.head, e.anchor));
		let r = n(e);
		return R.range(e.anchor, r.head, r.goalColumn, r.bidiLevel || void 0, r.assoc);
	});
	return !r.eq(e.state.selection) && (e.dispatch(Kv(e.state, r)), !0);
}
function Cy(e, t) {
	return Sy(e, t, (n) => e.moveByChar(n, t));
}
var wy = (e) => Cy(e, !Xv(e)), Ty = (e) => Cy(e, Xv(e));
function Ey(e, t) {
	return Sy(e, t, (n) => e.moveByGroup(n, t));
}
var Dy = (e) => Ey(e, !Xv(e)), Oy = (e) => Ey(e, Xv(e)), ky = (e) => {
	let t = !Xv(e);
	return Sy(e, t, (n) => ry(e.state, n, t));
}, Ay = (e) => {
	let t = Xv(e);
	return Sy(e, t, (n) => ry(e.state, n, t));
};
function jy(e, t) {
	return Sy(e, t, (n) => e.moveVertically(n, t));
}
var My = (e) => jy(e, !1), Ny = (e) => jy(e, !0);
function Py(e, t) {
	return Sy(e, t, (n) => e.moveVertically(n, t, ly(e).height));
}
var Fy = (e) => Py(e, !1), Iy = (e) => Py(e, !0), Ly = (e) => Sy(e, !0, (t) => py(e, t, !0)), Ry = (e) => Sy(e, !1, (t) => py(e, t, !1)), zy = (e) => {
	let t = !Xv(e);
	return Sy(e, t, (n) => py(e, n, t));
}, By = (e) => {
	let t = Xv(e);
	return Sy(e, t, (n) => py(e, n, t));
}, Vy = (e) => Sy(e, !1, (t) => R.cursor(e.lineBlockAt(t.head).from)), Hy = (e) => Sy(e, !0, (t) => R.cursor(e.lineBlockAt(t.head).to)), Uy = ({ state: e, dispatch: t }) => (t(Kv(e, { anchor: 0 })), !0), Wy = ({ state: e, dispatch: t }) => (t(Kv(e, { anchor: e.doc.length })), !0), Gy = ({ state: e, dispatch: t }) => (t(Kv(e, {
	anchor: e.selection.main.anchor,
	head: 0
})), !0), Ky = ({ state: e, dispatch: t }) => (t(Kv(e, {
	anchor: e.selection.main.anchor,
	head: e.doc.length
})), !0), qy = ({ state: e, dispatch: t }) => (t(e.update({
	selection: {
		anchor: 0,
		head: e.doc.length
	},
	userEvent: "select"
})), !0), Jy = ({ state: e, dispatch: t }) => {
	let n = pb(e).map(({ from: t, to: n }) => R.undirectionalRange(t, Math.min(n + 1, e.doc.length)));
	return t(e.update({
		selection: R.create(n),
		userEvent: "select"
	})), !0;
}, Yy = ({ state: e, dispatch: t }) => {
	let n = Gv(e.selection, (t) => {
		let n = Y(e), r = n.resolveStack(t.from, 1);
		if (t.empty) {
			let e = n.resolveStack(t.from, -1);
			e.node.from >= r.node.from && e.node.to <= r.node.to && (r = e);
		}
		for (let e = r; e; e = e.next) {
			let { node: n } = e;
			if ((n.from < t.from && n.to >= t.to || n.to > t.to && n.from <= t.from) && e.next) return R.undirectionalRange(n.from, n.to);
		}
		return t;
	});
	return !n.eq(e.selection) && (t(Kv(e, n)), !0);
};
function Xy(e, t) {
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
	return i.length != r.ranges.length && (e.dispatch(Kv(n, R.create(i, i.length - 1))), !0);
}
var Zy = (e) => Xy(e, !1), Qy = (e) => Xy(e, !0), $y = ({ state: e, dispatch: t }) => {
	let n = e.selection, r = null;
	return n.ranges.length > 1 ? r = R.create([n.main]) : n.main.empty || (r = R.create([R.cursor(n.main.head)])), r ? (t(Kv(e, r)), !0) : !1;
};
function eb(e, t) {
	if (e.state.readOnly) return !1;
	let n = "delete.selection", { state: r } = e, i = r.changeByRange((r) => {
		let { from: i, to: a } = r;
		if (i == a) {
			let o = t(r);
			o < i ? (n = "delete.backward", o = tb(e, o, !1)) : o > i && (n = "delete.forward", o = tb(e, o, !0)), i = Math.min(i, o), a = Math.max(a, o);
		} else i = tb(e, i, !1), a = tb(e, a, !0);
		return i == a ? { range: r } : {
			changes: {
				from: i,
				to: a
			},
			range: R.cursor(i, i < r.head ? -1 : 1)
		};
	});
	return !i.changes.empty && (e.dispatch(r.update(i, {
		scrollIntoView: !0,
		userEvent: n,
		effects: n == "delete.selection" ? U.announce.of(r.phrase("Selection deleted")) : void 0
	})), !0);
}
function tb(e, t, n) {
	if (e instanceof U) for (let r of e.state.facet(U.atomicRanges).map((t) => t(e))) r.between(t, t, (e, r) => {
		e < t && r > t && (t = n ? r : e);
	});
	return t;
}
var nb = (e, t, n) => eb(e, (r) => {
	let i = r.from, { state: a } = e, o = a.doc.lineAt(i), s, c;
	if (n && !t && i > o.from && i < o.from + 200 && !/[^ \t]/.test(s = o.text.slice(0, i - o.from))) {
		if (s[s.length - 1] == "	") return i - 1;
		let e = cl(s, a.tabSize) % a_(a) || a_(a);
		for (let t = 0; t < e && s[s.length - 1 - t] == " "; t++) i--;
		c = i;
	} else c = Fs(o.text, i - o.from, t, t) + o.from, c == i && o.number != (t ? a.doc.lines : 1) ? c += t ? 1 : -1 : !t && /[\ufe00-\ufe0f]/.test(o.text.slice(c - o.from, i - o.from)) && (c = Fs(o.text, c - o.from, !1, !1) + o.from);
	return c;
}), rb = (e) => nb(e, !1, !0), ib = (e) => nb(e, !0, !1), ab = (e, t) => eb(e, (n) => {
	let r = n.head, { state: i } = e, a = i.doc.lineAt(r), o = i.charCategorizer(r);
	for (let e = null;;) {
		if (r == (t ? a.to : a.from)) {
			r == n.head && a.number != (t ? i.doc.lines : 1) && (r += t ? 1 : -1);
			break;
		}
		let s = Fs(a.text, r - a.from, t) + a.from, c = a.text.slice(Math.min(r, s) - a.from, Math.max(r, s) - a.from), l = o(c);
		if (e != null && l != e) break;
		(c != " " || r != n.head) && (e = l), r = s;
	}
	return r;
}), ob = (e) => ab(e, !1), sb = (e) => ab(e, !0), cb = (e) => eb(e, (t) => {
	let n = e.lineBlockAt(t.head).to;
	return t.head < n ? n : Math.min(e.state.doc.length, t.head + 1);
}), lb = (e) => eb(e, (t) => {
	let n = e.moveToLineBoundary(t, !1).head;
	return t.head > n ? n : Math.max(0, t.head - 1);
}), ub = (e) => eb(e, (t) => {
	let n = e.moveToLineBoundary(t, !0).head;
	return t.head < n ? n : Math.min(e.state.doc.length, t.head + 1);
}), db = ({ state: e, dispatch: t }) => {
	if (e.readOnly) return !1;
	let n = e.changeByRange((e) => ({
		changes: {
			from: e.from,
			to: e.to,
			insert: L.of(["", ""])
		},
		range: R.cursor(e.from)
	}));
	return t(e.update(n, {
		scrollIntoView: !0,
		userEvent: "input"
	})), !0;
}, fb = ({ state: e, dispatch: t }) => {
	if (e.readOnly) return !1;
	let n = e.changeByRange((t) => {
		if (!t.empty || t.from == 0 || t.from == e.doc.length) return { range: t };
		let n = t.from, r = e.doc.lineAt(n), i = n == r.from ? n - 1 : Fs(r.text, n - r.from, !1) + r.from, a = n == r.to ? n + 1 : Fs(r.text, n - r.from, !0) + r.from;
		return {
			changes: {
				from: i,
				to: a,
				insert: e.doc.slice(n, a).append(e.doc.slice(i, n))
			},
			range: R.cursor(a)
		};
	});
	return !n.changes.empty && (t(e.update(n, {
		scrollIntoView: !0,
		userEvent: "move.character"
	})), !0);
};
function pb(e) {
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
function mb(e, t, n) {
	if (e.readOnly) return !1;
	let r = [], i = [];
	for (let t of pb(e)) {
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
			for (let n of t.ranges) i.push(R.range(Math.min(e.doc.length, n.anchor + o), Math.min(e.doc.length, n.head + o)));
		} else {
			r.push({
				from: a.from,
				to: t.from
			}, {
				from: t.to,
				insert: e.lineBreak + a.text
			});
			for (let e of t.ranges) i.push(R.range(e.anchor - o, e.head - o));
		}
	}
	return r.length ? (t(e.update({
		changes: r,
		scrollIntoView: !0,
		selection: R.create(i, e.selection.mainIndex),
		userEvent: "move.line"
	})), !0) : !1;
}
var hb = ({ state: e, dispatch: t }) => mb(e, t, !1), gb = ({ state: e, dispatch: t }) => mb(e, t, !0);
function _b(e, t, n) {
	if (e.readOnly) return !1;
	let r = [];
	for (let t of pb(e)) n ? r.push({
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
var vb = ({ state: e, dispatch: t }) => _b(e, t, !1), yb = ({ state: e, dispatch: t }) => _b(e, t, !0), bb = (e) => {
	if (e.state.readOnly) return !1;
	let { state: t } = e, n = t.changes(pb(t).map(({ from: e, to: n }) => (e > 0 ? e-- : n < t.doc.length && n++, {
		from: e,
		to: n
	}))), r = Gv(t.selection, (t) => {
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
function xb(e, t) {
	if (/\(\)|\[\]|\{\}/.test(e.sliceDoc(t - 1, t + 1))) return {
		from: t,
		to: t
	};
	let n = Y(e).resolveInner(t), r = n.childBefore(t), i = n.childAfter(t), a;
	return r && i && r.to <= t && i.from >= t && (a = r.type.prop(W.closedBy)) && a.indexOf(i.name) > -1 && e.doc.lineAt(r.to).from == e.doc.lineAt(i.from).from && !/\S/.test(e.sliceDoc(r.to, i.from)) ? {
		from: r.to,
		to: i.from
	} : null;
}
var Sb = /*@__PURE__*/ wb(!1), Cb = /*@__PURE__*/ wb(!0);
function wb(e) {
	return ({ state: t, dispatch: n }) => {
		if (t.readOnly) return !1;
		let r = t.changeByRange((n) => {
			let { from: r, to: i } = n, a = t.doc.lineAt(r), o = !e && r == i && xb(t, r);
			e && (r = i = (i <= a.to ? a : t.doc.lineAt(i)).to);
			let s = new c_(t, {
				simulateBreak: r,
				simulateDoubleBreak: !!o
			}), c = s_(s, r);
			for (c ??= cl(/^\s*/.exec(t.doc.lineAt(r).text)[0], t.tabSize); i < a.to && /\s/.test(a.text[i - a.from]);) i++;
			o ? {from: r, to: i} = o : r > a.from && r < a.from + 100 && !/\S/.test(a.text.slice(0, r)) && (r = a.from);
			let l = ["", o_(t, c)];
			return o && l.push(o_(t, s.lineIndent(a.from, -1))), {
				changes: {
					from: r,
					to: i,
					insert: L.of(l)
				},
				range: R.cursor(r + 1 + l[1].length)
			};
		});
		return n(t.update(r, {
			scrollIntoView: !0,
			userEvent: "input"
		})), !0;
	};
}
function Tb(e, t) {
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
			range: R.range(a.mapPos(r.anchor, 1), a.mapPos(r.head, 1))
		};
	});
}
var Eb = ({ state: e, dispatch: t }) => {
	if (e.readOnly) return !1;
	let n = Object.create(null), r = new c_(e, { overrideIndentation: (e) => n[e] ?? -1 }), i = Tb(e, (t, i, a) => {
		let o = s_(r, t.from);
		if (o == null) return;
		/\S/.test(t.text) || (o = 0);
		let s = /^\s*/.exec(t.text)[0], c = o_(e, o);
		(s != c || a.from < t.from + s.length) && (n[t.from] = o, i.push({
			from: t.from,
			to: t.from + s.length,
			insert: c
		}));
	});
	return i.changes.empty || t(e.update(i, { userEvent: "indent" })), !0;
}, Db = ({ state: e, dispatch: t }) => !e.readOnly && (t(e.update(Tb(e, (t, n) => {
	n.push({
		from: t.from,
		insert: e.facet(i_)
	});
}), { userEvent: "input.indent" })), !0), Ob = ({ state: e, dispatch: t }) => !e.readOnly && (t(e.update(Tb(e, (t, n) => {
	let r = /^\s*/.exec(t.text)[0];
	if (!r) return;
	let i = cl(r, e.tabSize), a = 0, o = o_(e, Math.max(0, i - a_(e)));
	for (; a < r.length && a < o.length && r.charCodeAt(a) == o.charCodeAt(a);) a++;
	n.push({
		from: t.from + a,
		to: t.from + r.length,
		insert: o.slice(a)
	});
}), { userEvent: "delete.dedent" })), !0), kb = (e) => (e.setTabFocusMode(), !0), Ab = [
	{
		key: "Ctrl-b",
		run: Zv,
		shift: wy,
		preventDefault: !0
	},
	{
		key: "Ctrl-f",
		run: Qv,
		shift: Ty
	},
	{
		key: "Ctrl-p",
		run: sy,
		shift: My
	},
	{
		key: "Ctrl-n",
		run: cy,
		shift: Ny
	},
	{
		key: "Ctrl-a",
		run: vy,
		shift: Vy
	},
	{
		key: "Ctrl-e",
		run: yy,
		shift: Hy
	},
	{
		key: "Ctrl-d",
		run: ib
	},
	{
		key: "Ctrl-h",
		run: rb
	},
	{
		key: "Ctrl-k",
		run: cb
	},
	{
		key: "Ctrl-Alt-h",
		run: ob
	},
	{
		key: "Ctrl-o",
		run: db
	},
	{
		key: "Ctrl-t",
		run: fb
	},
	{
		key: "Ctrl-v",
		run: fy
	}
], jb = /*@__PURE__*/ [
	{
		key: "ArrowLeft",
		run: Zv,
		shift: wy,
		preventDefault: !0
	},
	{
		key: "Mod-ArrowLeft",
		mac: "Alt-ArrowLeft",
		run: ey,
		shift: Dy,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowLeft",
		run: gy,
		shift: zy,
		preventDefault: !0
	},
	{
		key: "ArrowRight",
		run: Qv,
		shift: Ty,
		preventDefault: !0
	},
	{
		key: "Mod-ArrowRight",
		mac: "Alt-ArrowRight",
		run: ty,
		shift: Oy,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowRight",
		run: _y,
		shift: By,
		preventDefault: !0
	},
	{
		key: "ArrowUp",
		run: sy,
		shift: My,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowUp",
		run: Uy,
		shift: Gy
	},
	{
		mac: "Ctrl-ArrowUp",
		run: dy,
		shift: Fy
	},
	{
		key: "ArrowDown",
		run: cy,
		shift: Ny,
		preventDefault: !0
	},
	{
		mac: "Cmd-ArrowDown",
		run: Wy,
		shift: Ky
	},
	{
		mac: "Ctrl-ArrowDown",
		run: fy,
		shift: Iy
	},
	{
		key: "PageUp",
		run: dy,
		shift: Fy
	},
	{
		key: "PageDown",
		run: fy,
		shift: Iy
	},
	{
		key: "Home",
		run: hy,
		shift: Ry,
		preventDefault: !0
	},
	{
		key: "Mod-Home",
		run: Uy,
		shift: Gy
	},
	{
		key: "End",
		run: my,
		shift: Ly,
		preventDefault: !0
	},
	{
		key: "Mod-End",
		run: Wy,
		shift: Ky
	},
	{
		key: "Enter",
		run: Sb,
		shift: Sb
	},
	{
		key: "Mod-a",
		run: qy
	},
	{
		key: "Backspace",
		run: rb,
		shift: rb,
		preventDefault: !0
	},
	{
		key: "Delete",
		run: ib,
		preventDefault: !0
	},
	{
		key: "Mod-Backspace",
		mac: "Alt-Backspace",
		run: ob,
		preventDefault: !0
	},
	{
		key: "Mod-Delete",
		mac: "Alt-Delete",
		run: sb,
		preventDefault: !0
	},
	{
		mac: "Mod-Backspace",
		run: lb,
		preventDefault: !0
	},
	{
		mac: "Mod-Delete",
		run: ub,
		preventDefault: !0
	}
].concat(/*@__PURE__*/ Ab.map((e) => ({
	mac: e.key,
	run: e.run,
	shift: e.shift
}))), Mb = /*@__PURE__*/ [
	{
		key: "Alt-ArrowLeft",
		mac: "Ctrl-ArrowLeft",
		run: iy,
		shift: ky
	},
	{
		key: "Alt-ArrowRight",
		mac: "Ctrl-ArrowRight",
		run: ay,
		shift: Ay
	},
	{
		key: "Alt-ArrowUp",
		run: hb
	},
	{
		key: "Shift-Alt-ArrowUp",
		run: vb
	},
	{
		key: "Alt-ArrowDown",
		run: gb
	},
	{
		key: "Shift-Alt-ArrowDown",
		run: yb
	},
	{
		key: "Mod-Alt-ArrowUp",
		run: Zy
	},
	{
		key: "Mod-Alt-ArrowDown",
		run: Qy
	},
	{
		key: "Escape",
		run: $y
	},
	{
		key: "Mod-Enter",
		run: Cb
	},
	{
		key: "Alt-l",
		mac: "Ctrl-l",
		run: Jy
	},
	{
		key: "Mod-i",
		run: Yy,
		preventDefault: !0
	},
	{
		key: "Mod-[",
		run: Ob
	},
	{
		key: "Mod-]",
		run: Db
	},
	{
		key: "Mod-Alt-\\",
		run: Eb
	},
	{
		key: "Shift-Mod-k",
		run: bb
	},
	{
		key: "Shift-Mod-\\",
		run: xy
	},
	{
		key: "Mod-/",
		run: lv
	},
	{
		key: "Alt-A",
		mac: "Ctrl-A",
		run: fv
	},
	{
		key: "Ctrl-m",
		mac: "Shift-Alt-m",
		run: kb
	}
].concat(jb), Nb = class e {
	constructor(e, t, n, r, i, a, o, s, c, l = 0, u) {
		this.p = e, this.stack = t, this.state = n, this.reducePos = r, this.pos = i, this.score = a, this.buffer = o, this.bufferBase = s, this.curContext = c, this.lookAhead = l, this.parent = u;
	}
	toString() {
		return `[${this.stack.filter((e, t) => t % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
	}
	static start(t, n, r = 0) {
		let i = t.parser.context;
		return new e(t, [], n, r, r, 0, [], 0, i ? new Pb(i, i.start) : null, 0, null);
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
	useNode(e, t) {
		let n = this.p.reused.length - 1;
		(n < 0 || this.p.reused[n] != e) && (this.p.reused.push(e), n++);
		let r = this.pos;
		this.reducePos = this.pos = r + e.length, this.pushState(t, r), this.buffer.push(n, r, this.reducePos, -1), this.curContext && this.updateContext(this.curContext.tracker.reuse(this.curContext.context, e, this, this.p.stream.reset(this.pos - e.length)));
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
		for (let t = new Fb(this);;) {
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
		this.curContext && this.updateContext(this.curContext.tracker.shift(this.curContext.context, e, this, this.p.stream.reset(t)));
	}
	reduceContext(e, t) {
		this.curContext && this.updateContext(this.curContext.tracker.reduce(this.curContext.context, e, this, this.p.stream.reset(t)));
	}
	emitContext() {
		let e = this.buffer.length - 1;
		(e < 0 || this.buffer[e] != -3) && this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
	}
	emitLookAhead() {
		let e = this.buffer.length - 1;
		(e < 0 || this.buffer[e] != -4) && this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
	}
	updateContext(e) {
		if (e != this.curContext.context) {
			let t = new Pb(this.curContext.tracker, e);
			t.hash != this.curContext.hash && this.emitContext(), this.curContext = t;
		}
	}
	setLookAhead(e) {
		return e <= this.lookAhead ? !1 : (this.emitLookAhead(), this.lookAhead = e, !0);
	}
	close() {
		this.curContext && this.curContext.tracker.strict && this.emitContext(), this.lookAhead > 0 && this.emitLookAhead();
	}
}, Pb = class {
	constructor(e, t) {
		this.tracker = e, this.context = t, this.hash = e.strict ? e.hash(t) : 0;
	}
}, Fb = class {
	constructor(e) {
		this.start = e, this.state = e.state, this.stack = e.stack, this.base = this.stack.length;
	}
	reduce(e) {
		let t = e & 65535, n = e >> 19;
		n == 0 ? (this.stack == this.start.stack && (this.stack = this.stack.slice()), this.stack.push(this.state, 0, 0), this.base += 3) : this.base -= (n - 1) * 3;
		let r = this.start.p.parser.getGoto(this.stack[this.base - 3], t, !0);
		this.state = r;
	}
}, Ib = class e {
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
function Lb(e, t = Uint16Array) {
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
var Rb = class {
	constructor() {
		this.start = -1, this.value = -1, this.end = -1, this.extended = -1, this.lookAhead = 0, this.mask = 0, this.context = 0;
	}
}, zb = new Rb(), Bb = class {
	constructor(e, t) {
		this.input = e, this.ranges = t, this.chunk = "", this.chunkOff = 0, this.chunk2 = "", this.chunk2Pos = 0, this.next = -1, this.token = zb, this.rangeIndex = 0, this.pos = this.chunkPos = t[0].from, this.range = t[0], this.end = t[t.length - 1].to, this.readNext();
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
		if (t ? (this.token = t, t.start = e, t.lookAhead = e + 1, t.value = t.extended = -1) : this.token = zb, this.pos != e) {
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
}, Vb = class {
	constructor(e, t) {
		this.data = e, this.id = t;
	}
	token(e, t) {
		let { parser: n } = t.p;
		Wb(this.data, e, t, this.id, n.data, n.tokenPrecTable);
	}
};
Vb.prototype.contextual = Vb.prototype.fallback = Vb.prototype.extend = !1;
var Hb = class {
	constructor(e, t, n) {
		this.precTable = t, this.elseToken = n, this.data = typeof e == "string" ? Lb(e) : e;
	}
	token(e, t) {
		let n = e.pos, r = 0;
		for (;;) {
			let n = e.next < 0, i = e.resolveOffset(1, 1);
			if (Wb(this.data, e, t, 0, this.data, this.precTable), e.token.value > -1) break;
			if (this.elseToken == null) return;
			if (n || r++, i == null) break;
			e.reset(i, e.token);
		}
		r && (e.reset(n, e.token), e.acceptToken(this.elseToken, r));
	}
};
Hb.prototype.contextual = Vb.prototype.fallback = Vb.prototype.extend = !1;
var Ub = class {
	constructor(e, t = {}) {
		this.token = e, this.contextual = !!t.contextual, this.fallback = !!t.fallback, this.extend = !!t.extend;
	}
};
function Wb(e, t, n, r, i, a) {
	let o = 0, s = 1 << r, { dialect: c } = n.p.parser;
	scan: for (; (s & e[o]) != 0;) {
		let n = e[o + 1];
		for (let r = o + 3; r < n; r += 2) if ((e[r + 1] & s) > 0) {
			let n = e[r];
			if (c.allows(n) && (t.token.value == -1 || t.token.value == n || Kb(n, t.token.value, i, a))) {
				t.acceptToken(n);
				break;
			}
		}
		let r = t.next, l = 0, u = e[o + 2];
		if (t.next < 0 && u > l && e[n + u * 3 - 3] == 65535) {
			o = e[n + u * 3 - 1];
			continue scan;
		}
		for (; l < u;) {
			let i = l + u >> 1, a = n + i + (i << 1), s = e[a], c = e[a + 1] || 65536;
			if (r < s) u = i;
			else if (r >= c) l = i + 1;
			else {
				o = e[a + 2], t.advance();
				continue scan;
			}
		}
		break;
	}
}
function Gb(e, t, n) {
	for (let r = t, i; (i = e[r]) != 65535; r++) if (i == n) return r - t;
	return -1;
}
function Kb(e, t, n, r) {
	let i = Gb(n, r, t);
	return i < 0 || Gb(n, r, e) < i;
}
var qb = typeof process < "u" && process.env && /\bparse\b/.test(process.env.LOG), Jb = null;
function Yb(e, t, n) {
	let r = e.cursor(G.IncludeAnonymous);
	for (r.moveTo(t);;) if (!(n < 0 ? r.childBefore(t) : r.childAfter(t))) for (;;) {
		if ((n < 0 ? r.to < t : r.from > t) && !r.type.isError) return n < 0 ? Math.max(0, Math.min(r.to - 1, t - 25)) : Math.min(e.length, Math.max(r.from + 1, t + 25));
		if (n < 0 ? r.prevSibling() : r.nextSibling()) break;
		if (!r.parent()) return n < 0 ? 0 : e.length;
	}
}
var Xb = class {
	constructor(e, t) {
		this.fragments = e, this.nodeSet = t, this.i = 0, this.fragment = null, this.safeFrom = -1, this.safeTo = -1, this.trees = [], this.start = [], this.index = [], this.nextFragment();
	}
	nextFragment() {
		let e = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
		if (e) {
			for (this.safeFrom = e.openStart ? Yb(e.tree, e.from + e.offset, 1) - e.offset : e.from, this.safeTo = e.openEnd ? Yb(e.tree, e.to + e.offset, -1) - e.offset : e.to; this.trees.length;) this.trees.pop(), this.start.pop(), this.index.pop();
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
			let n = this.trees[t], r = this.index[t];
			if (r == n.children.length) {
				this.trees.pop(), this.start.pop(), this.index.pop();
				continue;
			}
			let i = n.children[r], a = this.start[t] + n.positions[r];
			if (a > e) return this.nextStart = a, null;
			if (i instanceof K) {
				if (a == e) {
					if (a < this.safeFrom) return null;
					let e = a + i.length;
					if (e <= this.safeTo) {
						let t = i.prop(W.lookAhead);
						if (!t || e + t < this.fragment.to) return i;
					}
				}
				this.index[t]++, a + i.length >= Math.max(this.safeFrom, e) && (this.trees.push(i), this.start.push(a), this.index.push(0));
			} else this.index[t]++, this.nextStart = a + i.length;
		}
	}
}, Zb = class {
	constructor(e, t) {
		this.stream = t, this.tokens = [], this.mainToken = null, this.actions = [], this.tokens = e.tokenizers.map((e) => new Rb());
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
		return s && e.setLookAhead(s), !n && e.pos == this.stream.end && (n = new Rb(), n.value = e.p.parser.eofTerm, n.start = n.end = e.pos, t = this.addActions(e, n.value, n.end, t)), this.mainToken = n, this.actions;
	}
	getMainToken(e) {
		if (this.mainToken) return this.mainToken;
		let t = new Rb(), { pos: n, p: r } = e;
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
				if (o[s + 1] == 1) s = ix(o, s + 2);
				else {
					r == 0 && o[s + 1] == 2 && (r = this.putAction(ix(o, s + 2), t, n, r));
					break;
				}
			}
			o[s] == t && (r = this.putAction(ix(o, s + 1), t, n, r));
		}
		return r;
	}
}, Qb = class {
	constructor(e, t, n, r) {
		this.parser = e, this.input = t, this.ranges = r, this.recovering = 0, this.nextStackID = 9812, this.minStackPos = 0, this.reused = [], this.stoppedAt = null, this.lastBigReductionStart = -1, this.lastBigReductionSize = 0, this.bigReductionCount = 0, this.stream = new Bb(t, r), this.tokens = new Zb(e, this.stream), this.topTerm = e.top[1];
		let { from: i } = r[0];
		this.stacks = [Nb.start(this, e.top[0], i)], this.fragments = n.length && this.stream.end - i > e.bufferLength * 4 ? new Xb(n, e.nodeSet) : null;
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
			let e = r && ax(r);
			if (e) return qb && console.log("Finish with " + this.stackID(e)), this.stackToTree(e);
			if (this.parser.strict) throw qb && r && console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none")), SyntaxError("No parse at " + t);
			this.recovering ||= 5;
		}
		if (this.recovering && r) {
			let e = this.stoppedAt != null && r[0].pos > this.stoppedAt ? r[0] : this.runRecovery(r, i, n);
			if (e) return qb && console.log("Force-finish " + this.stackID(e)), this.stackToTree(e.forceAll());
		}
		if (this.recovering) {
			let e = this.recovering == 1 ? 1 : this.recovering * 3;
			if (n.length > e) for (n.sort((e, t) => t.score - e.score); n.length > e;) n.pop();
			n.some((e) => e.reducePos > t) && this.recovering--;
		} else if (n.length > 1) {
			outer: for (let e = 0; e < n.length - 1; e++) {
				let t = n[e];
				for (let r = e + 1; r < n.length; r++) {
					let i = n[r];
					if (t.sameState(i) || t.buffer.length > 500 && i.buffer.length > 500) {
						if ((t.score - i.score || t.buffer.length - i.buffer.length) > 0) n.splice(r--, 1);
						else {
							n.splice(e--, 1);
							continue outer;
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
	advanceStack(e, t, n) {
		let r = e.pos, { parser: i } = this, a = qb ? this.stackID(e) + " -> " : "";
		if (this.stoppedAt != null && r > this.stoppedAt) return e.forceReduce() ? e : null;
		if (this.fragments) {
			let t = e.curContext && e.curContext.tracker.strict, n = t ? e.curContext.hash : 0;
			for (let o = this.fragments.nodeAt(r); o;) {
				let r = this.parser.nodeSet.types[o.type.id] == o.type ? i.getGoto(e.state, o.type.id) : -1;
				if (r > -1 && o.length && (!t || (o.prop(W.contextHash) || 0) == n)) return e.useNode(o, r), qb && console.log(a + this.stackID(e) + ` (via reuse of ${i.getName(o.type.id)})`), !0;
				if (!(o instanceof K) || o.children.length == 0 || o.positions[0] > 0) break;
				let s = o.children[0];
				if (s instanceof K && o.positions[0] == 0) o = s;
				else break;
			}
		}
		let o = i.stateSlot(e.state, 4);
		if (o > 0) return e.reduce(o), qb && console.log(a + this.stackID(e) + ` (via always-reduce ${i.getName(o & 65535)})`), !0;
		if (e.stack.length >= 8400) for (; e.stack.length > 6e3 && e.forceReduce(););
		let s = this.tokens.getActions(e);
		for (let o = 0; o < s.length;) {
			let c = s[o++], l = s[o++], u = s[o++], d = o == s.length || !n, f = d ? e : e.split(), p = this.tokens.mainToken;
			if (f.apply(c, l, p ? p.start : f.pos, u), qb && console.log(a + this.stackID(f) + ` (via ${c & 65536 ? `reduce of ${i.getName(c & 65535)}` : "shift"} for ${i.getName(l)} @ ${r}${f == e ? "" : ", split"})`), d) return !0;
			f.pos > r ? t.push(f) : n.push(f);
		}
		return !1;
	}
	advanceFully(e, t) {
		let n = e.pos;
		for (;;) {
			if (!this.advanceStack(e, null, null)) return !1;
			if (e.pos > n) return $b(e, t), !0;
		}
	}
	runRecovery(e, t, n) {
		let r = null, i = !1;
		for (let a = 0; a < e.length; a++) {
			let o = e[a], s = t[a << 1], c = t[(a << 1) + 1], l = qb ? this.stackID(o) + " -> " : "";
			if (o.deadEnd && (i || (i = !0, o.restart(), qb && console.log(l + this.stackID(o) + " (restarted)"), this.advanceFully(o, n)))) continue;
			let u = o.split(), d = l;
			for (let e = 0; e < 10 && u.forceReduce() && (qb && console.log(d + this.stackID(u) + " (via force-reduce)"), !this.advanceFully(u, n)); e++) qb && (d = this.stackID(u) + " -> ");
			for (let e of o.recoverByInsert(s)) qb && console.log(l + this.stackID(e) + " (via recover-insert)"), this.advanceFully(e, n);
			this.stream.end > o.pos ? (c == o.pos && (c++, s = 0), o.recoverByDelete(s, c), qb && console.log(l + this.stackID(o) + ` (via recover-delete ${this.parser.getName(s)})`), $b(o, n)) : (!r || r.score < u.score) && (r = u);
		}
		return r;
	}
	stackToTree(e) {
		return e.close(), K.build({
			buffer: Ib.create(e),
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
		let t = (Jb ||= /* @__PURE__ */ new WeakMap()).get(e);
		return t || Jb.set(e, t = String.fromCodePoint(this.nextStackID++)), t + e;
	}
};
function $b(e, t) {
	for (let n = 0; n < t.length; n++) {
		let r = t[n];
		if (r.pos == e.pos && r.sameState(e)) {
			t[n].score < e.score && (t[n] = e);
			return;
		}
	}
	t.push(e);
}
var ex = class {
	constructor(e, t, n) {
		this.source = e, this.flags = t, this.disabled = n;
	}
	allows(e) {
		return !this.disabled || this.disabled[e] == 0;
	}
}, tx = (e) => e, nx = class {
	constructor(e) {
		this.start = e.start, this.shift = e.shift || tx, this.reduce = e.reduce || tx, this.reuse = e.reuse || tx, this.hash = e.hash || (() => 0), this.strict = e.strict !== !1;
	}
}, rx = class e extends Xh {
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
			typeof e == "string" && (e = W[e]);
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
		this.nodeSet = new Eh(t.map((t, i) => Th.define({
			name: i >= this.minRepeatTerm ? void 0 : t,
			id: i,
			props: r[i],
			top: n.indexOf(i) > -1,
			error: i == 0,
			skipped: e.skippedNodes && e.skippedNodes.indexOf(i) > -1
		}))), e.propSources && (this.nodeSet = this.nodeSet.extend(...e.propSources)), this.strict = !1, this.bufferLength = bh;
		let a = Lb(e.tokenData);
		this.context = e.context, this.specializerSpecs = e.specialized || [], this.specialized = new Uint16Array(this.specializerSpecs.length);
		for (let e = 0; e < this.specializerSpecs.length; e++) this.specialized[e] = this.specializerSpecs[e].term;
		this.specializers = this.specializerSpecs.map(ox), this.states = Lb(e.states, Uint32Array), this.data = Lb(e.stateData), this.goto = Lb(e.goto), this.maxTerm = e.maxTerm, this.tokenizers = e.tokenizers.map((e) => typeof e == "number" ? new Vb(a, e) : e), this.topRules = e.topRules, this.dialects = e.dialects || {}, this.dynamicPrecedences = e.dynamicPrecedences || null, this.tokenPrecTable = e.tokenPrec, this.termNames = e.termNames || null, this.maxNode = this.nodeSet.types.length - 1, this.dialect = this.parseDialect(), this.top = this.topRules[Object.keys(this.topRules)[0]];
	}
	createParse(e, t, n) {
		let r = new Qb(this, e, t, n);
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
				if (n[i + 1] == 1) a = n[i = ix(n, i + 2)];
				else if (n[i + 1] == 2) return ix(n, i + 2);
				else break;
			}
			if (a == t || a == 0) return ix(n, i + 1);
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
				if (this.data[n + 1] == 1) n = ix(this.data, n + 2);
				else break;
			}
			r = t(ix(this.data, n + 1));
		}
		return r;
	}
	nextStates(e) {
		let t = [];
		for (let n = this.stateSlot(e, 1);; n += 3) {
			if (this.data[n] == 65535) {
				if (this.data[n + 1] == 1) n = ix(this.data, n + 2);
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
			return n.specializers[r] = ox(a), a;
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
		return new ex(e, n, r);
	}
	static deserialize(t) {
		return new e(t);
	}
};
function ix(e, t) {
	return e[t] | e[t + 1] << 16;
}
function ax(e) {
	let t = null;
	for (let n of e) {
		let e = n.p.stoppedAt;
		(n.pos == n.p.stream.end || e != null && n.pos > e) && n.p.parser.stateFlag(n.state, 2) && (!t || t.score < n.score) && (t = n);
	}
	return t;
}
function ox(e) {
	if (e.external) {
		let t = +!!e.extend;
		return (n, r) => e.external(n, r) << 1 | t;
	}
	return e.get;
}
//#endregion
//#region node_modules/@lezer/css/dist/index.js
var sx = 148, cx = 1, lx = 149, ux = 150, dx = 2, fx = 151, px = 3, mx = 4, hx = 152, gx = [
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
], _x = 58, vx = 40, yx = 95, bx = 91, xx = 45, Sx = 46, Cx = 35, wx = 37, Tx = 38, Ex = 92, Dx = 10, Ox = 42;
function kx(e) {
	return e >= 65 && e <= 90 || e >= 97 && e <= 122 || e >= 161;
}
function Ax(e) {
	return e >= 48 && e <= 57;
}
function jx(e) {
	return Ax(e) || e >= 97 && e <= 102 || e >= 65 && e <= 70;
}
var Mx = (e, t, n) => (r, i) => {
	for (let a = !1, o = 0, s = 0;; s++) {
		let { next: c } = r;
		if (kx(c) || c == xx || c == yx || a && Ax(c)) !a && (c != xx || s > 0) && (a = !0), o === s && c == xx && o++, r.advance();
		else if (c == Ex && r.peek(1) != Dx) {
			if (r.advance(), jx(r.next)) {
				do
					r.advance();
				while (jx(r.next));
				r.next == 32 && r.advance();
			} else r.next > -1 && r.advance();
			a = !0;
		} else {
			a && r.acceptToken(o >= 2 && i.canShift(dx) ? t : c == vx ? n : e);
			break;
		}
	}
}, Nx = new Ub(Mx(lx, dx, ux), { contextual: !0 }), Px = new Ub(Mx(fx, px, mx), { contextual: !0 }), Fx = new Ub((e) => {
	if (gx.includes(e.peek(-1))) {
		let { next: t } = e;
		(kx(t) || t == yx || t == Cx || t == Sx || t == Ox || t == bx || t == _x && kx(e.peek(1)) || t == xx || t == Tx) && e.acceptToken(sx);
	}
}), Ix = new Ub((e) => {
	if (!gx.includes(e.peek(-1))) {
		let { next: t } = e;
		if (t == wx && (e.advance(), e.acceptToken(cx)), kx(t)) {
			do
				e.advance();
			while (kx(e.next) || Ax(e.next));
			e.acceptToken(cx);
		}
	}
});
function Lx(e) {
	return /^#[a-f\d]{3}([a-f\d]{3}([a-f\d]{2})?)?$/i.test(e) ? hx : -1;
}
var Rx = vg({
	"AtKeyword import charset namespace keyframes media supports font-feature-values": J.definitionKeyword,
	"from to selector scope MatchFlag": J.keyword,
	NamespaceName: J.namespace,
	KeyframeName: J.labelName,
	KeyframeRangeName: J.operatorKeyword,
	TagName: J.tagName,
	ClassName: J.className,
	PseudoClassName: J.constant(J.className),
	IdName: J.labelName,
	"FeatureName PropertyName": J.propertyName,
	AttributeName: J.attributeName,
	NumberLiteral: J.number,
	KeywordQuery: J.keyword,
	UnaryQueryOp: J.operatorKeyword,
	"CallTag ValueName FontName": J.atom,
	VariableName: J.variableName,
	Callee: J.operatorKeyword,
	Unit: J.unit,
	"UniversalSelector NestingSelector": J.definitionOperator,
	"MatchOp CompareOp": J.compareOperator,
	"ChildOp SiblingOp, LogicOp": J.logicOperator,
	BinOp: J.arithmeticOperator,
	Important: J.modifier,
	Comment: J.blockComment,
	ColorLiteral: J.color,
	"ParenthesizedContent StringLiteral": J.string,
	":": J.punctuation,
	PseudoOp: J.derefOperator,
	"; , |": J.separator,
	"( )": J.paren,
	"[ ]": J.squareBracket,
	"{ }": J.brace
}), zx = {
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
}, Bx = {
	__proto__: null,
	or: 102,
	and: 102,
	not: 112,
	only: 112,
	layer: 212
}, Vx = {
	__proto__: null,
	selector: 118,
	style: 124,
	layer: 208
}, Hx = {
	__proto__: null,
	"@import": 204,
	"@media": 216,
	"@charset": 220,
	"@namespace": 224,
	"@keyframes": 230,
	"@supports": 242,
	"@scope": 246,
	"@font-feature-values": 252
}, Ux = {
	__proto__: null,
	to: 249
}, Wx = rx.deserialize({
	version: 14,
	states: "MrQYQdOOO$TQdOOP$[O`OOO%XQaO'#CfOOQP'#Ce'#CeO%`QdO'#CgO%eQ`O'#CgO%jQaO'#FrO&eQdO'#CkO'XQaO'#CcO'cQdO'#CnOOQP'#ES'#ESOOQP'#ER'#ERO'nQdO'#ETO'yQdO'#E[O'yQdO'#E_OOQP'#Fr'#FrO)`QhO'#FQOOQS'#Fq'#FqOOQS'#FT'#FTQYQdOOO)gQdO'#EeO*vQhO'#EkO)gQdO'#EmO*}QdO'#EoO+YQdO'#ErO*[QhO'#ExO+bQdO'#EzO+mQdO'#E}O+rQaO'#CfO+yQ`O'#EbO,OQ`O'#GPO,ZQdO'#GPQOQ`OOP,eO&jO'#CaPOOO)CAa)CAaOOQP'#Ci'#CiOOQP,59R,59RO%`QdO,59ROOQP'#Cm'#CmOOQP,59V,59VO&eQdO,59VO,pQdO,59YOOQP,5:m,5:mO'nQdO,5:oO'yQdO,5:vO'yQdO,5:xO'yQdO,5:yO'yQdO'#F[O,{Q`O,58}O-TQdO'#EaOOQS,58},58}OOQP'#Cq'#CqOOQO'#EP'#EPOOQP,59Y,59YO-[Q`O,59YO-aQ`O,59YO-fQpO'#EUO-qQdO'#EVO-vQ`O'#EVO-{QpO,5:oO.iQaO,5:vO/PQaO,5:yOOQW'#D]'#D]O0OQhO'#DgO0cQhO,5;lO*[QhO'#DeO0pQ`O'#DnO0uQhO'#D{OOQW'#Fx'#FxOOQS,5;l,5;lO0zQ`O'#DhO1PQ`O'#DkOOQS-E9R-E9ROOQ['#Cv'#CvO1UQdO'#CwO1iQdO'#C|O1|QdO'#DPOOQ['#DQ'#DQO2aQ!pO'#DRO4jQ!jO,5;POOQO'#DW'#DWO-aQ`O'#DVO4zQ!nO'#FuO6}Q`O'#DXO7SQ`O'#D|OOQ['#Fu'#FuO7XQhO'#GSO7gQ`O,5;VO7lQ!bO,5;XOOQS'#Eq'#EqO7tQ`O,5;ZO7yQdO,5;ZOOQO'#Et'#EtO8RQ`O,5;^O8WQhO,5;dO'yQdO'#DjOOQS,5;f,5;fO0zQ`O,5;fO8`QdO,5;fOOQS'#Fc'#FcO8hQdO'#FPO7gQ`O,5;iO8pQdO,5:|O9QQdO'#F^O9_Q`O,5<kO9_Q`O,5<kPOOO'#FS'#FSP9jO&jO,58{POOO,58{,58{OOQP1G.m1G.mOOQP1G.q1G.qOOQP1G.t1G.tO-[Q`O1G.tO-aQ`O1G.tO9uQpO1G0ZO9}QaO1G0bO:eQaO1G0dO:{QaO1G0eO;cQaO,5;vOOQO-E9Y-E9YOOQS1G.i1G.iO;mQ`O,5:{O;rQdO'#EQO;yQdO'#CuOOQO'#EX'#EXOOQO,5:q,5:qO-qQdO,5:qOOQP1G0Z1G0ZO)gQdO1G0ZO<QQ!jO'#D]O<`Q!bO,59xO<hQhO,5:ROOQO'#Dc'#DcOOQO'#Fy'#FyO<cQ!bO,59|O<pQhO'#FdO*[QhO,59zO*[QhO'#FdO=hQhO1G1WOOQS1G1W1G1WO=rQhO,5:PO>mQhO'#DoOOQW,5:Y,5:YOOQW,5:g,5:gOOQW,5:S,5:SO>wQhO,5:VO?cQ!fO'#FvOOQS'#Fv'#FvOOQS'#FV'#FVO@pQdO,59cOOQ[,59c,59cOATQdO,59hOOQ[,59h,59hOAhQdO,59kOOQ[,59k,59kOOQ[,59m,59mO)gQdO,59oOA{QhO'#EgOOQW'#Eg'#EgOBjQ`O1G0kO4sQhO1G0kOOQ[,59q,59qO*[QhO'#DZOOQ[,59s,59sOBoQ#tO,5:hOBzQhO'#F`OCXQ`O,5<nOOQS1G0q1G0qOOQS1G0s1G0sOOQS1G0u1G0uOCdQ`O1G0uOCiQdO'#EuOOQS1G0x1G0xOOQS1G1O1G1OOCtQaO,5:UO7gQ`O1G1QOOQS1G1Q1G1QO0zQ`O1G1QOOQS-E9a-E9aOOQS1G1T1G1TOC{Q!fO1G0hODcQ`O'#EdOOQO1G0h1G0hOOQO,5;x,5;xODhQdO,5;xOOQO-E9[-E9[ODuQ`O1G2VPOOO-E9Q-E9QPOOO1G.g1G.gOOQP7+$`7+$`OOQP7+%u7+%uO)gQdO7+%uOOQS1G0g1G0gOEQQaO'#F}OE[Q`O,5:lOEaQ!fO'#FUOF_QdO'#FtOFiQ`O,59aOOQO1G0]1G0]OFnQ!bO7+%uO)gQdO1G/dOFyQhO1G/hOOQW1G/m1G/mOOQW1G/f1G/fOG[QhO,5<OOOQW-E9b-E9bOOQS7+&r7+&rOHSQhO'#D]OHbQhO'#F|OHmQ`O'#F|OHrQ`O,5:ZOHwQ!bO'#D_O>wQhO'#DmOISQhO'#DsOI[QhO'#DuOIaQ!jO'#F{OOQO'#F{'#F{OIlQ`O'#DxOItQ!bO'#DzOOQO'#Fz'#FzOIyQ`O1G/qOOQS-E9T-E9TOOQ[1G.}1G.}OOQ[1G/S1G/SOOQ[1G/V1G/VOOQ[1G/Z1G/ZOJOQdO,5;ROOQS7+&V7+&VOJTQ`O7+&VOJYQhO'#D[OJbQ`O,59uO*[QhO,59uOOQ[1G0S1G0SOJjQ`O1G0SOJoQhO,5;zOOQO-E9^-E9^OOQS7+&a7+&aOJ}QbO'#DROOQO'#Ew'#EwOK]Q`O'#EvOOQO'#Ev'#EvOKhQ`O'#FaOKpQdO,5;aOOQS,5;a,5;aOOQ[1G/p1G/pOOQS7+&l7+&lO7gQ`O7+&lOK{Q!fO'#F]O)gQdO'#F]OMSQdO7+&SOOQO7+&S7+&SOOQO,5;O,5;OOOQO1G1d1G1dOMgQ!bO<<IaOMrQdO'#FZOM|Q`O,5<iOOQP1G0W1G0WOOQS-E9S-E9SONUQdO'#FYON`Q`O,5<`OOQ]1G.{1G.{OOQP<<Ia<<IaONhQ`O<<IaONmQdO7+%OOOQO'#D_'#D_ONtQ!bO7+%SON|QhO'#FXO! ZQ`O,5<hO)gQdO,5<hOOQW1G/u1G/uO! cQ`O,5:XO>wQhO'#DtOOQO,5:_,5:_O! hQhO,5:aO! pQhO,5:fO)gQdO,5:dOOQW7+%]7+%]OOQO'#Ei'#EiO! wQ`O1G0mOOQS<<Iq<<IqO)gQdO,59vO!!kQhO1G/aOOQ[1G/a1G/aO!!rQ`O1G/aOOQW-E9U-E9UOOQ[7+%n7+%nOOQO,5;b,5;bOClQdO'#FbOKhQ`O,5;{OOQS,5;{,5;{OOQS-E9_-E9_OOQS1G0{1G0{OOQS<<JW<<JWO!!zQ!fO,5;wOOQS-E9Z-E9ZOOQO<<In<<InOOQPAN>{AN>{O!$RQ`OAN>{O!$WQaO,5;uOOQO-E9X-E9XO!$bQdO,5;tOOQO-E9W-E9WOOQW<<Hj<<HjOOQW<<Hn<<HnO!$lQhO<<HnO!$}QhO'#D]O!%]QhO,5;sO!%hQ`O,5;sOOQO-E9V-E9VO!%mQdO1G2SO!%wQhO1G/sO!&PQ`O,5:`O>wQhO'#DwOOQO1G/{1G/{O!&UQ!bO1G0QO!&^QdO1G0OOJOQdO'#F_O!&eQ`O7+&XOOQW7+&X7+&XO!&mQ!bO1G/bOOQ[7+${7+${O!&xQhO7+${P!'PQ`O'#FWOOQO,5;|,5;|OOQO-E9`-E9`OOQS1G1g1G1gOOQPG24gG24gO!'UQ`OAN>YO)gQdO1G1_O!'ZQ`O7+'nOOQO1G/z1G/zO!'cQ`O,5:cO!'hQhO7+%lOOQO,5;y,5;yOOQO-E9]-E9]OOQW<<Is<<IsOOQ[<<Hg<<HgPOQW,5;r,5;rOOQWG23tG23tO!'oQdO7+&yOOQO1G/}1G/}OOQO<<IW<<IW",
	stateData: "!(S~O$`OS$aQQ~OWVO^`O`WOcYOdYOlaOo]O#P^O#S_O#YeO#`fO#bgO#dhO#giO#mjO#okO#rlO$ZRO$^ZO$gTO$rZO~OQnOWVO^`O`WOcYOdYOlaOo]O#P^O#S_O#YeO#`fO#bgO#dhO#giO#mjO#okO#rlO$ZmO$^ZO$gTO$rZO~O$X$sP~P!mO$arO~O`YXcYXdYXoYXrYX!eYX#PYX#SYX$YYX$^YX$g[X$rYX~OgYX~P$aO$ZtO~O$gvO~O$gvO`$fXc$fXd$fXo$fXr$fX!e$fX#P$fX#S$fX$Y$fX$^$fX$r$fXg$fX~O$ZwO~O`yOczOdzOo|O#P}O#S!PO$Y!OO$^ZO$rZO~Or!SO!e!QO~P&jOf!YO$Z!UO$[!VO~OW!]O$Z!ZO$g![O~OWVO^`O`WOcYOdYOo]O#P^O#S_O$ZRO$^ZO$gTO$rZO~OS!eOc!fOd!fOh!bOr!SO!Y!dO!]!iO!`!jO$]!aO~Om!hO~P(qOQ!uOh!mOo!nOr!oOv!xO|!vO!q!wO$Z!lO$[!sO$^!pO$k!qO~OS!eOc!fOd!fOh!bO!Y!dO!]!iO!`!jO$]!aO~Or$vP~P*[Ov!}O!q!wO$Z!|O~Ov#PO$Z#PO~Oh#SOr!SO#p#UO~O$Z#WO~Oc#VX~P$aOc#ZO~Om#[O$X$sXq$sX~O$X$sXq$sX~P!mO$b#_O$c#_O$d#aO~Of#fO$Z!UO$[!VO~Or!SO!e!QO~Oq$sP~P!mOh#oO~Oh#pO~On!xX!|!xX$g!zX~O$Z#qO~O$g#sO~On#tO!|#uO~O`yOczOdzOo|O$^ZO$rZO~Or#Oa!e#Oa#P#Oa#S#Oa$Y#Oag#Oa~P.TOr#Ra!e#Ra#P#Ra#S#Ra$Y#Rag#Ra~P.TOS!eOc!fOd!fOh!bO!Y!dO!]!iO!`!jO~OR#zOv#zO$]#vO$^#yO$k!qO~P/gOm$QO!T#}O!e$OO~P(qOh$SO~O$]$UO~Oh#SO~Oh$WO~O`$YOc$YOg$]Ol$YOm$YO~P)gO`$YOc$YOl$YOm$YOn$_O~P)gO`$YOc$YOl$YOm$YOq$aO~P)gOP$bOSuXcuXduXhuXmuXxuX!YuX!]uX!`uX#[uX#^uX$]uX!WuXQuX`uXguXluXouXruXvuX|uX!quX$ZuX$[uX$^uX$kuXnuXquX!euX$XuX$uuX!}uX~Ox$cO#[$dO#^$eOm$vP~P*[Oh#pOS$iXc$iXd$iXm$iXx$iX!Y$iX!]$iX!`$iX#[$iX#^$iX$]$iXQ$iX`$iXg$iXl$iXo$iXr$iXv$iX|$iX!q$iX$Z$iX$[$iX$^$iX$k$iXn$iXq$iX!e$iX$X$iX$u$iX!}$iX~Oh$iO~Oh$kO~O!T#}O!e$lOr$vXm$vX~Or!SO~Om$oOx$cO~Om$pO~Ov$qO!q!wO~Or$rO~Or!SO!T#}O~Or!SO#p$xO~O$Z#WOr#sX~O$u$|Om#Ua$X#Uaq#Ua~P)gOm$QX$X$QXq$QX~P!mOm#[O$X$saq$sa~O$b#_O$c#_O$d%TO~On%VO!|%WO~Or#Oi!e#Oi#P#Oi#S#Oi$Y#Oig#Oi~P.TOr#Qi!e#Qi#P#Qi#S#Qi$Y#Qig#Qi~P.TOr#Ri!e#Ri#P#Ri#S#Ri$Y#Rig#Ri~P.TOr$Oa!e$Oa~P&jOq%XO~Og$qP~P'yOg$hP~P)gOc!RXg!PX!T!PX!W!RX~Oc%aO!W%bO~Og%cO!T#}O~O!T#}OS$WXc$WXd$WXh$WXm$WXr$WX!Y$WX!]$WX!`$WX!e$WX$]$WX~Om%gO!e$OO~P(qO!T#}OS!Xac!Xad!Xah!Xam!Xar!Xa!Y!Xa!]!Xa!`!Xa!e!Xa$]!Xag!Xa~O$]%hOg$pP~P/gOR#zOS!eOh%mOv#zO!Y%nO$]%lO$^#yO$k!qO~Ox$cOQ$jX`$jXc$jXg$jXh$jXl$jXm$jXo$jXr$jXv$jX|$jX!q$jX$Z$jX$[$jX$^$jX$k$jXn$jXq$jX~O`$YOc$YOg%wOl$YOm$YO~P)gO`$YOc$YOl$YOm$YOn%xO~P)gO`$YOc$YOl$YOm$YOq%yO~P)gOh%{OS#ZXc#ZXd#ZXm#ZX!Y#ZX!]#ZX!`#ZX$]#ZX~Om%|O~Og&ROv&SO!r&SO~Or$SX!e$SXm$SX~P*[O!e$lOr$vam$va~Om&VO~Oq&^O$Z&XO$k&WO~Og&_O~P&jOx$cO!e&cO$u$|Om#Ui$X#Uiq#Ui~P)gO$t&fO~Om$Qa$X$Qaq$Qa~P!mOm#[O$X$siq$si~O!e&iOg$qX~P&jOg&kO~Ox$cOQ#xXg#xXh#xXo#xXr#xXv#xX|#xX!e#xX!q#xX$Z#xX$[#xX$^#xX$k#xX~O!e&mOg$hX~P)gOg&oO~On&pOx$cO!}&qO~OR#zOv#zO$]&sO$^#yO$k!qO~O!T#}OS$Wac$Wad$Wah$Wam$War$Wa!Y$Wa!]$Wa!`$Wa!e$Wa$]$Wa~Oc!dXg!PX!T!PX!e!PX~O!T#}O!e&uOg$pX~Oc&wO~Og&xO~Oc!mXg!mX!W!RX~OS!eOh&zO~O!T&|O~O!T&|O!W&}Og$oX~Oc'OOg!lX~O!W&}O~Og'PO~O$Z'QO~Om'SO~Oc'TO!T#}O~Og'VOm'UO~Og'YO~O!T#}Or$Sa!e$Sam$Sa~OP$bOruX!euXguX~O$k&WOr#jX!e#jX~Or!SO!e'[O~Oq'`O$Z&XO$k&WO~Ox$cOQ$PXh$PXm$PXo$PXr$PXv$PX|$PX!e$PX!q$PX$X$PX$Z$PX$[$PX$^$PX$k$PX$u$PXq$PX~O!e&cO$u$|Om#Uq$X#Uqq#Uq~P)gOn'eOx$cO!}'fO~Og#}X!e#}X~P'yO!e&iOg$qa~Og#|X!e#|X~P)gO!e&mOg$ha~On'eO~Og'kO~P)gOg'lO!W'mO~O$]'nOg#{X!e#{X~P/gO!e&uOg$pa~Og'sO~OS!eOh'uO~OS!eO~PFyO`'yOg'{O~OS#zac#zad#zah#za!Y#za!]#za!`#za$]#za~Og'}O~P!!POg'}Om(OO~Ox$cOQ$Pah$Pam$Pao$Par$Pav$Pa|$Pa!e$Pa!q$Pa$X$Pa$Z$Pa$[$Pa$^$Pa$k$Pa$u$Paq$Pa~On(TO~Og#}a!e#}a~P&jOg#|a!e#|a~P)gOR#zOv#zO$]&sO$^#yO$k&WO~Oc!fXg!PX!T!PX!e!PX~O!T#}Og#{a!e#{a~Oc(VO~O!e&uOg$pi~P)gOg!ai!T!ji~Og(XO~O!W(ZOg!ni~Og!li~P)gO`'yOg(^O~Ox$cOg!Oim!Oi~Og(_O~P!!POm(`O~Og(aO~O!e&uOg$pq~Og(cO~OS!eO~P!$lOg#{q!e#{q~P)gO$`!r$a$k`$kx#S~",
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
	propSources: [Rx],
	skippedNodes: [
		0,
		5,
		130
	],
	repeatNodeCount: 17,
	tokenData: "IO~R!bOX%ZX^&R^p%Zpq&Rqr)ers)vst+jtu/wuv%Zvw0qwx1Sxy2qyz3Sz{3X{|3r|}8e}!O8v!O!P9e!P!Q9|!Q![:u![!];p!]!^<l!^!_<}!_!`=y!`!a>^!a!b%Z!b!c?_!c!k%Z!k!lAl!l!u%Z!u!vAl!v!}%Z!}#OA}#O#P%Z#P#QB`#Q#R/w#R#]%Z#]#^Bq#^#g%Z#g#hAl#h#o%Z#o#pGU#p#qGg#q#rHO#r#sHa#s#y%Z#y#z&R#z$f%Z$f$g&R$g#BY%Z#BY#BZ&R#BZ$IS%Z$IS$I_&R$I_$I|%Z$I|$JO&R$JO$JT%Z$JT$JU&R$JU$KV%Z$KV$KW&R$KW&FU%Z&FU&FV&R&FV;'S%Z;'S;=`Hx<%lO%Z`%^SOy%jz;'S%j;'S;=`%{<%lO%j`%oS!r`Oy%jz;'S%j;'S;=`%{<%lO%j`&OP;=`<%l%j~&Wh$`~OX%jX^'r^p%jpq'rqy%jz#y%j#y#z'r#z$f%j$f$g'r$g#BY%j#BY#BZ'r#BZ$IS%j$IS$I_'r$I_$I|%j$I|$JO'r$JO$JT%j$JT$JU'r$JU$KV%j$KV$KW'r$KW&FU%j&FU&FV'r&FV;'S%j;'S;=`%{<%lO%j~'yh$`~!r`OX%jX^'r^p%jpq'rqy%jz#y%j#y#z'r#z$f%j$f$g'r$g#BY%j#BY#BZ'r#BZ$IS%j$IS$I_'r$I_$I|%j$I|$JO'r$JO$JT%j$JT$JU'r$JU$KV%j$KV$KW'r$KW&FU%j&FU&FV'r&FV;'S%j;'S;=`%{<%lO%jj)jS$uYOy%jz;'S%j;'S;=`%{<%lO%j~)yWOY)vZr)vrs*cs#O)v#O#P*h#P;'S)v;'S;=`+d<%lO)v~*hOv~~*kRO;'S)v;'S;=`*t;=`O)v~*wXOY)vZr)vrs*cs#O)v#O#P*h#P;'S)v;'S;=`+d;=`<%l)v<%lO)v~+gP;=`<%l)vj+maOy%jz}%j}!O,r!O!Q%j!Q![,r![!c%j!c!},r!}#O%j#O#P.O#P#R%j#R#S,r#S#T%j#T#o,r#o$g%j$g;'S,r;'S;=`/q<%lO,rj,ya$rY!r`Oy%jz}%j}!O,r!O!Q%j!Q![,r![!c%j!c!},r!}#O%j#O#P.O#P#R%j#R#S,r#S#T%j#T#o,r#o$g%j$g;'S,r;'S;=`/q<%lO,rj.TV!r`OY,rYZ%jZy,ryz.jz;'S,r;'S;=`/q<%lO,rY.oX$rY}!O.j!Q![.j!c!}.j#O#P/[#R#S.j#T#o.j$g;'S.j;'S;=`/k<%lO.jY/_SOY.jZ;'S.j;'S;=`/k<%lO.jY/nP;=`<%l.jj/tP;=`<%l,rd/zUOy%jz!_%j!_!`0^!`;'S%j;'S;=`%{<%lO%jd0eS!|S!r`Oy%jz;'S%j;'S;=`%{<%lO%jb0vS^QOy%jz;'S%j;'S;=`%{<%lO%j~1VWOY1SZw1Swx*cx#O1S#O#P1o#P;'S1S;'S;=`2k<%lO1S~1rRO;'S1S;'S;=`1{;=`O1S~2OXOY1SZw1Swx*cx#O1S#O#P1o#P;'S1S;'S;=`2k;=`<%l1S<%lO1S~2nP;=`<%l1Sj2vShYOy%jz;'S%j;'S;=`%{<%lO%j~3XOg~n3`UWQxWOy%jz!_%j!_!`0^!`;'S%j;'S;=`%{<%lO%jj3yWxW#SQOy%jz!O%j!O!P4c!P!Q%j!Q![7h![;'S%j;'S;=`%{<%lO%jj4hU!r`Oy%jz!Q%j!Q![4z![;'S%j;'S;=`%{<%lO%jj5RY!r`$kYOy%jz!Q%j!Q![4z![!g%j!g!h5q!h#X%j#X#Y5q#Y;'S%j;'S;=`%{<%lO%jj5vY!r`Oy%jz{%j{|6f|}%j}!O6f!O!Q%j!Q![6}![;'S%j;'S;=`%{<%lO%jj6kU!r`Oy%jz!Q%j!Q![6}![;'S%j;'S;=`%{<%lO%jj7UU!r`$kYOy%jz!Q%j!Q![6}![;'S%j;'S;=`%{<%lO%jj7o[!r`$kYOy%jz!O%j!O!P4z!P!Q%j!Q![7h![!g%j!g!h5q!h#X%j#X#Y5q#Y;'S%j;'S;=`%{<%lO%jj8jS!eYOy%jz;'S%j;'S;=`%{<%lO%jj8{WxWOy%jz!O%j!O!P4c!P!Q%j!Q![7h![;'S%j;'S;=`%{<%lO%jj9jU`YOy%jz!Q%j!Q![4z![;'S%j;'S;=`%{<%lO%j~:RTxWOy%jz{:b{;'S%j;'S;=`%{<%lO%j~:iS!r`$a~Oy%jz;'S%j;'S;=`%{<%lO%jj:z[$kYOy%jz!O%j!O!P4z!P!Q%j!Q![7h![!g%j!g!h5q!h#X%j#X#Y5q#Y;'S%j;'S;=`%{<%lO%jj;uUcYOy%jz![%j![!]<X!];'S%j;'S;=`%{<%lO%jj<`SdY!r`Oy%jz;'S%j;'S;=`%{<%lO%jj<qSmYOy%jz;'S%j;'S;=`%{<%lO%jh=SU!WWOy%jz!_%j!_!`=f!`;'S%j;'S;=`%{<%lO%jh=mS!WW!r`Oy%jz;'S%j;'S;=`%{<%lO%jl>QS!WW!|SOy%jz;'S%j;'S;=`%{<%lO%jj>eV#PQ!WWOy%jz!_%j!_!`=f!`!a>z!a;'S%j;'S;=`%{<%lO%jb?RS#PQ!r`Oy%jz;'S%j;'S;=`%{<%lO%jj?bYOy%jz}%j}!O@Q!O!c%j!c!}@o!}#T%j#T#o@o#o;'S%j;'S;=`%{<%lO%jj@VW!r`Oy%jz!c%j!c!}@o!}#T%j#T#o@o#o;'S%j;'S;=`%{<%lO%jj@v[lY!r`Oy%jz}%j}!O@o!O!Q%j!Q![@o![!c%j!c!}@o!}#T%j#T#o@o#o;'S%j;'S;=`%{<%lO%jhAqS!}WOy%jz;'S%j;'S;=`%{<%lO%jjBSSoYOy%jz;'S%j;'S;=`%{<%lO%jnBeSn^Oy%jz;'S%j;'S;=`%{<%lO%jjBvU!}WOy%jz#a%j#a#bCY#b;'S%j;'S;=`%{<%lO%jbC_U!r`Oy%jz#d%j#d#eCq#e;'S%j;'S;=`%{<%lO%jbCvU!r`Oy%jz#c%j#c#dDY#d;'S%j;'S;=`%{<%lO%jbD_U!r`Oy%jz#f%j#f#gDq#g;'S%j;'S;=`%{<%lO%jbDvU!r`Oy%jz#h%j#h#iEY#i;'S%j;'S;=`%{<%lO%jbE_U!r`Oy%jz#T%j#T#UEq#U;'S%j;'S;=`%{<%lO%jbEvU!r`Oy%jz#b%j#b#cFY#c;'S%j;'S;=`%{<%lO%jbF_U!r`Oy%jz#h%j#h#iFq#i;'S%j;'S;=`%{<%lO%jbFxS$tQ!r`Oy%jz;'S%j;'S;=`%{<%lO%jjGZSrYOy%jz;'S%j;'S;=`%{<%lO%jfGlU$gUOy%jz!_%j!_!`0^!`;'S%j;'S;=`%{<%lO%jjHTSqYOy%jz;'S%j;'S;=`%{<%lO%jfHfU#SQOy%jz!_%j!_!`0^!`;'S%j;'S;=`%{<%lO%j`H{P;=`<%l%Z",
	tokenizers: [
		Fx,
		Ix,
		Nx,
		Px,
		1,
		2,
		3,
		4,
		new Hb("m~RRYZ[z{a~~g~aO$c~~dP!P!Qg~lO$d~~", 28, 156)
	],
	topRules: {
		StyleSheet: [0, 6],
		Styles: [1, 129]
	},
	dynamicPrecedences: { 97: 1 },
	specialized: [
		{
			term: 172,
			get: (e, t) => Lx(e) << 1,
			external: Lx
		},
		{
			term: 150,
			get: (e) => zx[e] || -1
		},
		{
			term: 151,
			get: (e) => Bx[e] || -1
		},
		{
			term: 4,
			get: (e) => Vx[e] || -1
		},
		{
			term: 28,
			get: (e) => Hx[e] || -1
		},
		{
			term: 149,
			get: (e) => Ux[e] || -1
		}
	],
	tokenPrec: 2433
}), Gx = null;
function Kx() {
	if (!Gx && typeof document == "object" && document.body) {
		let { style: e } = document.body, t = [], n = /* @__PURE__ */ new Set();
		for (let r in e) r != "cssText" && r != "cssFloat" && typeof e[r] == "string" && (/[A-Z]/.test(r) && (r = r.replace(/[A-Z]/g, (e) => "-" + e.toLowerCase())), n.has(r) || (t.push(r), n.add(r)));
		Gx = t.sort().map((e) => ({
			type: "property",
			label: e,
			apply: e + ": "
		}));
	}
	return Gx || [];
}
var qx = /*@__PURE__*/ (/* @__PURE__ */ "active.after.any-link.autofill.backdrop.before.checked.cue.default.defined.disabled.empty.enabled.file-selector-button.first.first-child.first-letter.first-line.first-of-type.focus.focus-visible.focus-within.fullscreen.has.host.host-context.hover.in-range.indeterminate.invalid.is.lang.last-child.last-of-type.left.link.marker.modal.not.nth-child.nth-last-child.nth-last-of-type.nth-of-type.only-child.only-of-type.optional.out-of-range.part.placeholder.placeholder-shown.read-only.read-write.required.right.root.scope.selection.slotted.target.target-text.valid.visited.where".split(".")).map((e) => ({
	type: "class",
	label: e
})), Jx = /*@__PURE__*/ (/* @__PURE__ */ "above.absolute.activeborder.additive.activecaption.after-white-space.ahead.alias.all.all-scroll.alphabetic.alternate.always.antialiased.appworkspace.asterisks.attr.auto.auto-flow.avoid.avoid-column.avoid-page.avoid-region.axis-pan.background.backwards.baseline.below.bidi-override.blink.block.block-axis.bold.bolder.border.border-box.both.bottom.break.break-all.break-word.bullets.button.button-bevel.buttonface.buttonhighlight.buttonshadow.buttontext.calc.capitalize.caps-lock-indicator.caption.captiontext.caret.cell.center.checkbox.circle.cjk-decimal.clear.clip.close-quote.col-resize.collapse.color.color-burn.color-dodge.column.column-reverse.compact.condensed.contain.content.contents.content-box.context-menu.continuous.copy.counter.counters.cover.crop.cross.crosshair.currentcolor.cursive.cyclic.darken.dashed.decimal.decimal-leading-zero.default.default-button.dense.destination-atop.destination-in.destination-out.destination-over.difference.disc.discard.disclosure-closed.disclosure-open.document.dot-dash.dot-dot-dash.dotted.double.down.e-resize.ease.ease-in.ease-in-out.ease-out.element.ellipse.ellipsis.embed.end.ethiopic-abegede-gez.ethiopic-halehame-aa-er.ethiopic-halehame-gez.ew-resize.exclusion.expanded.extends.extra-condensed.extra-expanded.fantasy.fast.fill.fill-box.fixed.flat.flex.flex-end.flex-start.footnotes.forwards.from.geometricPrecision.graytext.grid.groove.hand.hard-light.help.hidden.hide.higher.highlight.highlighttext.horizontal.hsl.hsla.hue.icon.ignore.inactiveborder.inactivecaption.inactivecaptiontext.infinite.infobackground.infotext.inherit.initial.inline.inline-axis.inline-block.inline-flex.inline-grid.inline-table.inset.inside.intrinsic.invert.italic.justify.keep-all.landscape.large.larger.left.level.lighter.lighten.line-through.linear.linear-gradient.lines.list-item.listbox.listitem.local.logical.loud.lower.lower-hexadecimal.lower-latin.lower-norwegian.lowercase.ltr.luminosity.manipulation.match.matrix.matrix3d.medium.menu.menutext.message-box.middle.min-intrinsic.mix.monospace.move.multiple.multiple_mask_images.multiply.n-resize.narrower.ne-resize.nesw-resize.no-close-quote.no-drop.no-open-quote.no-repeat.none.normal.not-allowed.nowrap.ns-resize.numbers.numeric.nw-resize.nwse-resize.oblique.opacity.open-quote.optimizeLegibility.optimizeSpeed.outset.outside.outside-shape.overlay.overline.padding.padding-box.painted.page.paused.perspective.pinch-zoom.plus-darker.plus-lighter.pointer.polygon.portrait.pre.pre-line.pre-wrap.preserve-3d.progress.push-button.radial-gradient.radio.read-only.read-write.read-write-plaintext-only.rectangle.region.relative.repeat.repeating-linear-gradient.repeating-radial-gradient.repeat-x.repeat-y.reset.reverse.rgb.rgba.ridge.right.rotate.rotate3d.rotateX.rotateY.rotateZ.round.row.row-resize.row-reverse.rtl.run-in.running.s-resize.sans-serif.saturation.scale.scale3d.scaleX.scaleY.scaleZ.screen.scroll.scrollbar.scroll-position.se-resize.self-start.self-end.semi-condensed.semi-expanded.separate.serif.show.single.skew.skewX.skewY.skip-white-space.slide.slider-horizontal.slider-vertical.sliderthumb-horizontal.sliderthumb-vertical.slow.small.small-caps.small-caption.smaller.soft-light.solid.source-atop.source-in.source-out.source-over.space.space-around.space-between.space-evenly.spell-out.square.start.static.status-bar.stretch.stroke.stroke-box.sub.subpixel-antialiased.svg_masks.super.sw-resize.symbolic.symbols.system-ui.table.table-caption.table-cell.table-column.table-column-group.table-footer-group.table-header-group.table-row.table-row-group.text.text-bottom.text-top.textarea.textfield.thick.thin.threeddarkshadow.threedface.threedhighlight.threedlightshadow.threedshadow.to.top.transform.translate.translate3d.translateX.translateY.translateZ.transparent.ultra-condensed.ultra-expanded.underline.unidirectional-pan.unset.up.upper-latin.uppercase.url.var.vertical.vertical-text.view-box.visible.visibleFill.visiblePainted.visibleStroke.visual.w-resize.wait.wave.wider.window.windowframe.windowtext.words.wrap.wrap-reverse.x-large.x-small.xor.xx-large.xx-small".split(".")).map((e) => ({
	type: "keyword",
	label: e
})).concat(/*@__PURE__*/ (/* @__PURE__ */ "aliceblue.antiquewhite.aqua.aquamarine.azure.beige.bisque.black.blanchedalmond.blue.blueviolet.brown.burlywood.cadetblue.chartreuse.chocolate.coral.cornflowerblue.cornsilk.crimson.cyan.darkblue.darkcyan.darkgoldenrod.darkgray.darkgreen.darkkhaki.darkmagenta.darkolivegreen.darkorange.darkorchid.darkred.darksalmon.darkseagreen.darkslateblue.darkslategray.darkturquoise.darkviolet.deeppink.deepskyblue.dimgray.dodgerblue.firebrick.floralwhite.forestgreen.fuchsia.gainsboro.ghostwhite.gold.goldenrod.gray.grey.green.greenyellow.honeydew.hotpink.indianred.indigo.ivory.khaki.lavender.lavenderblush.lawngreen.lemonchiffon.lightblue.lightcoral.lightcyan.lightgoldenrodyellow.lightgray.lightgreen.lightpink.lightsalmon.lightseagreen.lightskyblue.lightslategray.lightsteelblue.lightyellow.lime.limegreen.linen.magenta.maroon.mediumaquamarine.mediumblue.mediumorchid.mediumpurple.mediumseagreen.mediumslateblue.mediumspringgreen.mediumturquoise.mediumvioletred.midnightblue.mintcream.mistyrose.moccasin.navajowhite.navy.oldlace.olive.olivedrab.orange.orangered.orchid.palegoldenrod.palegreen.paleturquoise.palevioletred.papayawhip.peachpuff.peru.pink.plum.powderblue.purple.rebeccapurple.red.rosybrown.royalblue.saddlebrown.salmon.sandybrown.seagreen.seashell.sienna.silver.skyblue.slateblue.slategray.snow.springgreen.steelblue.tan.teal.thistle.tomato.turquoise.violet.wheat.white.whitesmoke.yellow.yellowgreen".split(".")).map((e) => ({
	type: "constant",
	label: e
}))), Yx = /*@__PURE__*/ (/* @__PURE__ */ "a.abbr.address.article.aside.b.bdi.bdo.blockquote.body.br.button.canvas.caption.cite.code.col.colgroup.dd.del.details.dfn.dialog.div.dl.dt.em.figcaption.figure.footer.form.header.hgroup.h1.h2.h3.h4.h5.h6.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.meter.nav.ol.output.p.pre.ruby.section.select.small.source.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.tr.u.ul".split(".")).map((e) => ({
	type: "type",
	label: e
})), Xx = /*@__PURE__*/ [
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
})), Zx = /^(\w[\w-]*|-\w[\w-]*|)$/, Qx = /^-(-[\w-]*)?$/;
function $x(e, t) {
	if ((e.name == "(" || e.type.isError) && (e = e.parent || e), e.name != "ArgList") return !1;
	let n = e.parent?.firstChild;
	return n?.name == "Callee" && t.sliceString(n.from, n.to) == "var";
}
var eS = /*@__PURE__*/ new Jh(), tS = ["Declaration"];
function nS(e) {
	for (let t = e;;) {
		if (t.type.isTop) return t;
		if (!(t = t.parent)) return e;
	}
}
function rS(e, t, n) {
	if (t.to - t.from > 4096) {
		let r = eS.get(t);
		if (r) return r;
		let i = [], a = /* @__PURE__ */ new Set(), o = t.cursor(G.IncludeAnonymous);
		if (o.firstChild()) do
			for (let t of rS(e, o.node, n)) a.has(t.label) || (a.add(t.label), i.push(t));
		while (o.nextSibling());
		return eS.set(t, i), i;
	}
	{
		let r = [], i = /* @__PURE__ */ new Set();
		return t.cursor().iterate((t) => {
			if (n(t) && t.matchContext(tS) && t.node.nextSibling?.name == ":") {
				let n = e.sliceString(t.from, t.to);
				i.has(n) || (i.add(n), r.push({
					label: n,
					type: "variable"
				}));
			}
		}), r;
	}
}
var iS = /*@__PURE__*/ ((e) => (t) => {
	let { state: n, pos: r } = t, i = Y(n).resolveInner(r, -1), a = i.type.isError && i.from == i.to - 1 && n.doc.sliceString(i.from, i.to) == "-";
	if (i.name == "PropertyName" || (a || i.name == "TagName") && /^(Block|Styles)$/.test(i.resolve(i.to).name)) return {
		from: i.from,
		options: Kx(),
		validFor: Zx
	};
	if (i.name == "ValueName") return {
		from: i.from,
		options: Jx,
		validFor: Zx
	};
	if (i.name == "PseudoClassName") return {
		from: i.from,
		options: qx,
		validFor: Zx
	};
	if (e(i) || (t.explicit || a) && $x(i, n.doc)) return {
		from: e(i) || a ? i.from : r,
		options: rS(n.doc, nS(i), e),
		validFor: Qx
	};
	if (i.name == "TagName") {
		for (let { parent: e } = i; e; e = e.parent) if (e.name == "Block") return {
			from: i.from,
			options: Kx(),
			validFor: Zx
		};
		return {
			from: i.from,
			options: Yx,
			validFor: Zx
		};
	}
	if (i.name == "AtKeyword") return {
		from: i.from,
		options: Xx,
		validFor: Zx
	};
	if (!t.explicit) return null;
	let o = i.resolve(r), s = o.childBefore(r);
	return s && s.name == ":" && o.name == "PseudoClassSelector" ? {
		from: r,
		options: qx,
		validFor: Zx
	} : s && s.name == ":" && o.name == "Declaration" || o.name == "ArgList" ? {
		from: r,
		options: Jx,
		validFor: Zx
	} : o.name == "Block" || o.name == "Styles" ? {
		from: r,
		options: Kx(),
		validFor: Zx
	} : null;
})((e) => e.name == "VariableName"), aS = /*@__PURE__*/ Gg.define({
	name: "css",
	parser: /*@__PURE__*/ Wx.configure({ props: [/*@__PURE__*/ l_.add({ Declaration: /*@__PURE__*/ x_() }), /*@__PURE__*/ C_.add({ "Block KeyframeList": w_ })] }),
	languageData: {
		commentTokens: { block: {
			open: "/*",
			close: "*/"
		} },
		indentOnInput: /^\s*\}$/,
		wordChars: "-"
	}
});
function oS() {
	return new t_(aS, aS.data.of({ autocomplete: iS }));
}
//#endregion
//#region node_modules/@lezer/html/dist/index.js
var sS = 55, cS = 1, lS = 56, uS = 2, dS = 57, fS = 3, pS = 4, mS = 5, hS = 6, gS = 7, _S = 8, vS = 9, yS = 10, bS = 11, xS = 12, SS = 13, CS = 58, wS = 14, TS = 15, ES = 59, DS = 21, OS = 23, kS = 24, AS = 25, jS = 27, MS = 28, NS = 29, PS = 32, FS = 35, IS = 37, LS = 38, RS = 0, zS = 1, BS = {
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
}, VS = {
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
}, HS = {
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
function US(e) {
	return e == 45 || e == 46 || e == 58 || e >= 65 && e <= 90 || e == 95 || e >= 97 && e <= 122 || e >= 161;
}
var WS = null, GS = null, KS = 0;
function qS(e, t) {
	let n = e.pos + t;
	if (KS == n && GS == e) return WS;
	let r = e.peek(t), i = "";
	for (; US(r);) i += String.fromCharCode(r), r = e.peek(++t);
	return GS = e, KS = n, WS = i ? i.toLowerCase() : r == ZS || r == QS ? void 0 : null;
}
var JS = 60, YS = 62, XS = 47, ZS = 63, QS = 33, $S = 45;
function eC(e, t) {
	this.name = e, this.parent = t;
}
var tC = [
	hS,
	yS,
	gS,
	_S,
	vS
], nC = new nx({
	start: null,
	shift(e, t, n, r) {
		return tC.indexOf(t) > -1 ? new eC(qS(r, 1) || "", e) : e;
	},
	reduce(e, t) {
		return t == DS && e ? e.parent : e;
	},
	reuse(e, t, n, r) {
		let i = t.type.id;
		return i == hS || i == IS ? new eC(qS(r, 1) || "", e) : e;
	},
	strict: !1
}), rC = new Ub((e, t) => {
	if (e.next != JS) {
		e.next < 0 && t.context && e.acceptToken(CS);
		return;
	}
	e.advance();
	let n = e.next == XS;
	n && e.advance();
	let r = qS(e, 0);
	if (r === void 0) return;
	if (!r) return e.acceptToken(n ? TS : wS);
	let i = t.context ? t.context.name : null;
	if (n) {
		if (r == i) return e.acceptToken(bS);
		if (i && VS[i]) return e.acceptToken(CS, -2);
		if (t.dialectEnabled(RS)) return e.acceptToken(xS);
		for (let e = t.context; e; e = e.parent) if (e.name == r) return;
		e.acceptToken(SS);
	} else {
		if (r == "script") return e.acceptToken(gS);
		if (r == "style") return e.acceptToken(_S);
		if (r == "textarea") return e.acceptToken(vS);
		if (BS.hasOwnProperty(r)) return e.acceptToken(yS);
		i && HS[i] && HS[i][r] ? e.acceptToken(CS, -1) : e.acceptToken(hS);
	}
}, { contextual: !0 }), iC = new Ub((e) => {
	for (let t = 0, n = 0;; n++) {
		if (e.next < 0) {
			n && e.acceptToken(ES);
			break;
		}
		if (e.next == $S) t++;
		else if (e.next == YS && t >= 2) {
			n >= 3 && e.acceptToken(ES, -2);
			break;
		} else t = 0;
		e.advance();
	}
});
function aC(e) {
	for (; e; e = e.parent) if (e.name == "svg" || e.name == "math") return !0;
	return !1;
}
var oC = new Ub((e, t) => {
	if (e.next == XS && e.peek(1) == YS) {
		let n = t.dialectEnabled(zS) || aC(t.context);
		e.acceptToken(n ? mS : pS, 2);
	} else e.next == YS && e.acceptToken(pS, 1);
});
function sC(e, t, n) {
	let r = 2 + e.length;
	return new Ub((i) => {
		for (let a = 0, o = 0, s = 0;; s++) {
			if (i.next < 0) {
				s && i.acceptToken(t);
				break;
			}
			if (a == 0 && i.next == JS || a == 1 && i.next == XS || a >= 2 && a < r && i.next == e.charCodeAt(a - 2)) a++, o++;
			else if (a == r && i.next == YS) {
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
var cC = sC("script", sS, cS), lC = sC("style", lS, uS), uC = sC("textarea", dS, fS), dC = vg({
	"Text RawText IncompleteTag IncompleteCloseTag": J.content,
	"StartTag StartCloseTag SelfClosingEndTag EndTag": J.angleBracket,
	TagName: J.tagName,
	"MismatchedCloseTag/TagName": [J.tagName, J.invalid],
	AttributeName: J.attributeName,
	"AttributeValue UnquotedAttributeValue": J.attributeValue,
	Is: J.definitionOperator,
	"EntityReference CharacterReference": J.character,
	Comment: J.blockComment,
	ProcessingInst: J.processingInstruction,
	DoctypeDecl: J.documentMeta
}), fC = rx.deserialize({
	version: 14,
	states: ",xOVO!rOOO!ZQ#tO'#CrO!`Q#tO'#C{O!eQ#tO'#DOO!jQ#tO'#DRO!oQ#tO'#DTO!tOaO'#CqO#PObO'#CqO#[OdO'#CqO$kO!rO'#CqOOO`'#Cq'#CqO$rO$fO'#DUO$zQ#tO'#DWO%PQ#tO'#DXOOO`'#Dl'#DlOOO`'#DZ'#DZQVO!rOOO%UQ&rO,59^O%aQ&rO,59gO%lQ&rO,59jO%wQ&rO,59mO&SQ&rO,59oOOOa'#D_'#D_O&_OaO'#CyO&jOaO,59]OOOb'#D`'#D`O&rObO'#C|O&}ObO,59]OOOd'#Da'#DaO'VOdO'#DPO'bOdO,59]OOO`'#Db'#DbO'jO!rO,59]O'qQ#tO'#DSOOO`,59],59]OOOp'#Dc'#DcO'vO$fO,59pOOO`,59p,59pO(OQ#|O,59rO(TQ#|O,59sOOO`-E7X-E7XO(YQ&rO'#CtOOQW'#D['#D[O(hQ&rO1G.xOOOa1G.x1G.xOOO`1G/Z1G/ZO(sQ&rO1G/ROOOb1G/R1G/RO)OQ&rO1G/UOOOd1G/U1G/UO)ZQ&rO1G/XOOO`1G/X1G/XO)fQ&rO1G/ZOOOa-E7]-E7]O)qQ#tO'#CzOOO`1G.w1G.wOOOb-E7^-E7^O)vQ#tO'#C}OOOd-E7_-E7_O){Q#tO'#DQOOO`-E7`-E7`O*QQ#|O,59nOOOp-E7a-E7aOOO`1G/[1G/[OOO`1G/^1G/^OOO`1G/_1G/_O*VQ,UO,59`OOQW-E7Y-E7YOOOa7+$d7+$dOOO`7+$u7+$uOOOb7+$m7+$mOOOd7+$p7+$pOOO`7+$s7+$sO*bQ#|O,59fO*gQ#|O,59iO*lQ#|O,59lOOO`1G/Y1G/YO*qO7[O'#CwO+SOMhO'#CwOOQW1G.z1G.zOOO`1G/Q1G/QOOO`1G/T1G/TOOO`1G/W1G/WOOOO'#D]'#D]O+eO7[O,59cOOQW,59c,59cOOOO'#D^'#D^O+vOMhO,59cOOOO-E7Z-E7ZOOQW1G.}1G.}OOOO-E7[-E7[",
	stateData: ",c~O!_OS~OUSOVPOWQOXROYTO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O|_O!eZO~OgaO~OgbO~OgcO~OgdO~OgeO~O!XfOPmP![mP~O!YiOQpP![pP~O!ZlORsP![sP~OUSOVPOWQOXROYTOZqO[]O][O^^O_^Oa^Ob^Oc^Od^Oy^O!eZO~O![rO~P#gO!]sO!fuO~OgvO~OgwO~OS|OT}OiyO~OS!POT}OiyO~OS!ROT}OiyO~OS!TOT}OiyO~OS}OT}OiyO~O!XfOPmX![mX~OP!WO![!XO~O!YiOQpX![pX~OQ!ZO![!XO~O!ZlORsX![sX~OR!]O![!XO~O![!XO~P#gOg!_O~O!]sO!f!aO~OS!bO~OS!cO~Oj!dOShXThXihX~OS!fOT!gOiyO~OS!hOT!gOiyO~OS!iOT!gOiyO~OS!jOT!gOiyO~OS!gOT!gOiyO~Og!kO~Og!lO~Og!mO~OS!nO~Ol!qO!a!oO!c!pO~OS!rO~OS!sO~OS!tO~Ob!uOc!uOd!uO!a!wO!b!uO~Ob!xOc!xOd!xO!c!wO!d!xO~Ob!uOc!uOd!uO!a!{O!b!uO~Ob!xOc!xOd!xO!c!{O!d!xO~OT~cbd!ey|!e~",
	goto: "%q!aPPPPPPPPPPPPPPPPPPPPP!b!hP!nPP!zP!}#Q#T#Z#^#a#g#j#m#s#y!bP!b!bP$P$V$m$s$y%P%V%]%cPPPPPPPP%iX^OX`pXUOX`pezabcde{!O!Q!S!UR!q!dRhUR!XhXVOX`pRkVR!XkXWOX`pRnWR!XnXXOX`pQrXR!XpXYOX`pQ`ORx`Q{aQ!ObQ!QcQ!SdQ!UeZ!e{!O!Q!S!UQ!v!oR!z!vQ!y!pR!|!yQgUR!VgQjVR!YjQmWR![mQpXR!^pQtZR!`tS_O`ToXp",
	nodeNames: "⚠ StartCloseTag StartCloseTag StartCloseTag EndTag SelfClosingEndTag StartTag StartTag StartTag StartTag StartTag StartCloseTag StartCloseTag StartCloseTag IncompleteTag IncompleteCloseTag Document Text EntityReference CharacterReference InvalidEntity Element OpenTag TagName Attribute AttributeName Is AttributeValue UnquotedAttributeValue ScriptText CloseTag OpenTag StyleText CloseTag OpenTag TextareaText CloseTag OpenTag CloseTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag CloseTag DoctypeDecl",
	maxTerm: 68,
	context: nC,
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
	propSources: [dC],
	skippedNodes: [0],
	repeatNodeCount: 9,
	tokenData: "!<p!aR!YOX$qXY,QYZ,QZ[$q[]&X]^,Q^p$qpq,Qqr-_rs3_sv-_vw3}wxHYx}-_}!OH{!O!P-_!P!Q$q!Q![-_![!]Mz!]!^-_!^!_!$S!_!`!;x!`!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4U-_4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!Z$|caPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr$qrs&}sv$qvw+Pwx(tx!^$q!^!_*V!_!a&X!a#S$q#S#T&X#T;'S$q;'S;=`+z<%lO$q!R&bXaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&Xq'UVaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}P'pTaPOv'kw!^'k!_;'S'k;'S;=`(P<%lO'kP(SP;=`<%l'kp([S!dpOv(Vx;'S(V;'S;=`(h<%lO(Vp(kP;=`<%l(Vq(qP;=`<%l&}a({WaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t`)jT!b`Or)esv)ew;'S)e;'S;=`)y<%lO)e`)|P;=`<%l)ea*SP;=`<%l(t!Q*^V!b`!dpOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!Q*vP;=`<%l*V!R*|P;=`<%l&XW+UYlWOX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+PW+wP;=`<%l+P!Z+}P;=`<%l$q!a,]`aP!b`!dp!_^OX&XXY,QYZ,QZ]&X]^,Q^p&Xpq,Qqr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!_-ljiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q[/ebiSlWOX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+PS0rXiSqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0mS1bP;=`<%l0m[1hP;=`<%l/^!V1vciSaP!b`!dpOq&Xqr1krs&}sv1kvw0mwx(tx!P1k!P!Q&X!Q!^1k!^!_*V!_!a&X!a#s1k#s$f&X$f;'S1k;'S;=`3R<%l?Ah1k?Ah?BY&X?BY?Mn1k?MnO&X!V3UP;=`<%l1k!_3[P;=`<%l-_!Z3hV!ahaP!dpOv&}wx'kx!^&}!^!_(V!_;'S&};'S;=`(n<%lO&}!_4WiiSlWd!ROX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst>]tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^/^!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!Z5zblWOX5uXZ7SZ[5u[^7S^p5uqr5urs7Sst+Ptw5uwx7Sx!]5u!]!^7w!^!a7S!a#S5u#S#T7S#T;'S5u;'S;=`8n<%lO5u!R7VVOp7Sqs7St!]7S!]!^7l!^;'S7S;'S;=`7q<%lO7S!R7qOb!R!R7tP;=`<%l7S!Z8OYlWb!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!Z8qP;=`<%l5u!_8{iiSlWOX5uXZ7SZ[5u[^7S^p5uqr8trs7Sst/^tw8twx7Sx!P8t!P!Q5u!Q!]8t!]!^:j!^!a7S!a#S8t#S#T;{#T#s8t#s$f5u$f;'S8t;'S;=`>V<%l?Ah8t?Ah?BY5u?BY?Mn8t?MnO5u!_:sbiSlWb!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!V<QciSOp7Sqr;{rs7Sst0mtw;{wx7Sx!P;{!P!Q7S!Q!];{!]!^=]!^!a7S!a#s;{#s$f7S$f;'S;{;'S;=`>P<%l?Ah;{?Ah?BY7S?BY?Mn;{?MnO7S!V=dXiSb!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!V>SP;=`<%l;{!_>YP;=`<%l8t!_>dhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^/^!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!Z@TalWOX@OXZAYZ[@O[^AY^p@Oqr@OrsAYsw@OwxAYx!]@O!]!^Az!^!aAY!a#S@O#S#TAY#T;'S@O;'S;=`Bq<%lO@O!RA]UOpAYq!]AY!]!^Ao!^;'SAY;'S;=`At<%lOAY!RAtOc!R!RAwP;=`<%lAY!ZBRYlWc!ROX+PZ[+P^p+Pqr+Psw+Px!^+P!a#S+P#T;'S+P;'S;=`+t<%lO+P!ZBtP;=`<%l@O!_COhiSlWOX@OXZAYZ[@O[^AY^p@OqrBwrsAYswBwwxAYx!PBw!P!Q@O!Q!]Bw!]!^Dj!^!aAY!a#SBw#S#TE{#T#sBw#s$f@O$f;'SBw;'S;=`HS<%l?AhBw?Ah?BY@O?BY?MnBw?MnO@O!_DsbiSlWc!ROX+PZ[+P^p+Pqr/^sw/^x!P/^!P!Q+P!Q!^/^!a#S/^#S#T0m#T#s/^#s$f+P$f;'S/^;'S;=`1e<%l?Ah/^?Ah?BY+P?BY?Mn/^?MnO+P!VFQbiSOpAYqrE{rsAYswE{wxAYx!PE{!P!QAY!Q!]E{!]!^GY!^!aAY!a#sE{#s$fAY$f;'SE{;'S;=`G|<%l?AhE{?Ah?BYAY?BY?MnE{?MnOAY!VGaXiSc!Rqr0msw0mx!P0m!Q!^0m!a#s0m$f;'S0m;'S;=`1_<%l?Ah0m?BY?Mn0m!VHPP;=`<%lE{!_HVP;=`<%lBw!ZHcW!cxaP!b`Or(trs'ksv(tw!^(t!^!_)e!_;'S(t;'S;=`*P<%lO(t!aIYliSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OKQ!O!P-_!P!Q$q!Q!^-_!^!_*V!_!a&X!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!aK_kiSaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx!P-_!P!Q$q!Q!^-_!^!_*V!_!`&X!`!aMS!a#S-_#S#T1k#T#s-_#s$f$q$f;'S-_;'S;=`3X<%l?Ah-_?Ah?BY$q?BY?Mn-_?MnO$q!TM_XaP!b`!dp!fQOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X!aNZ!ZiSgQaPlW!b`!dpOX$qXZ&XZ[$q[^&X^p$qpq&Xqr-_rs&}sv-_vw/^wx(tx}-_}!OMz!O!PMz!P!Q$q!Q![Mz![!]Mz!]!^-_!^!_*V!_!a&X!a!c-_!c!}Mz!}#R-_#R#SMz#S#T1k#T#oMz#o#s-_#s$f$q$f$}-_$}%OMz%O%W-_%W%oMz%o%p-_%p&aMz&a&b-_&b1pMz1p4UMz4U4dMz4d4e-_4e$ISMz$IS$I`-_$I`$IbMz$Ib$Je-_$Je$JgMz$Jg$Kh-_$Kh%#tMz%#t&/x-_&/x&EtMz&Et&FV-_&FV;'SMz;'S;:j!#|;:j;=`3X<%l?&r-_?&r?AhMz?Ah?BY$q?BY?MnMz?MnO$q!a!$PP;=`<%lMz!R!$ZY!b`!dpOq*Vqr!$yrs(Vsv*Vwx)ex!a*V!a!b!4t!b;'S*V;'S;=`*s<%lO*V!R!%Q]!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!%y!O!f*V!f!g!']!g#W*V#W#X!0`#X;'S*V;'S;=`*s<%lO*V!R!&QX!b`!dpOr*Vrs(Vsv*Vwx)ex}*V}!O!&m!O;'S*V;'S;=`*s<%lO*V!R!&vV!b`!dp!ePOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!'dX!b`!dpOr*Vrs(Vsv*Vwx)ex!q*V!q!r!(P!r;'S*V;'S;=`*s<%lO*V!R!(WX!b`!dpOr*Vrs(Vsv*Vwx)ex!e*V!e!f!(s!f;'S*V;'S;=`*s<%lO*V!R!(zX!b`!dpOr*Vrs(Vsv*Vwx)ex!v*V!v!w!)g!w;'S*V;'S;=`*s<%lO*V!R!)nX!b`!dpOr*Vrs(Vsv*Vwx)ex!{*V!{!|!*Z!|;'S*V;'S;=`*s<%lO*V!R!*bX!b`!dpOr*Vrs(Vsv*Vwx)ex!r*V!r!s!*}!s;'S*V;'S;=`*s<%lO*V!R!+UX!b`!dpOr*Vrs(Vsv*Vwx)ex!g*V!g!h!+q!h;'S*V;'S;=`*s<%lO*V!R!+xY!b`!dpOr!+qrs!,hsv!+qvw!-Swx!.[x!`!+q!`!a!/j!a;'S!+q;'S;=`!0Y<%lO!+qq!,mV!dpOv!,hvx!-Sx!`!,h!`!a!-q!a;'S!,h;'S;=`!.U<%lO!,hP!-VTO!`!-S!`!a!-f!a;'S!-S;'S;=`!-k<%lO!-SP!-kO|PP!-nP;=`<%l!-Sq!-xS!dp|POv(Vx;'S(V;'S;=`(h<%lO(Vq!.XP;=`<%l!,ha!.aX!b`Or!.[rs!-Ssv!.[vw!-Sw!`!.[!`!a!.|!a;'S!.[;'S;=`!/d<%lO!.[a!/TT!b`|POr)esv)ew;'S)e;'S;=`)y<%lO)ea!/gP;=`<%l!.[!R!/sV!b`!dp|POr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!0]P;=`<%l!+q!R!0gX!b`!dpOr*Vrs(Vsv*Vwx)ex#c*V#c#d!1S#d;'S*V;'S;=`*s<%lO*V!R!1ZX!b`!dpOr*Vrs(Vsv*Vwx)ex#V*V#V#W!1v#W;'S*V;'S;=`*s<%lO*V!R!1}X!b`!dpOr*Vrs(Vsv*Vwx)ex#h*V#h#i!2j#i;'S*V;'S;=`*s<%lO*V!R!2qX!b`!dpOr*Vrs(Vsv*Vwx)ex#m*V#m#n!3^#n;'S*V;'S;=`*s<%lO*V!R!3eX!b`!dpOr*Vrs(Vsv*Vwx)ex#d*V#d#e!4Q#e;'S*V;'S;=`*s<%lO*V!R!4XX!b`!dpOr*Vrs(Vsv*Vwx)ex#X*V#X#Y!+q#Y;'S*V;'S;=`*s<%lO*V!R!4{Y!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!a!4t!a!b!:]!b;'S!4t;'S;=`!;r<%lO!4tq!5pV!dpOv!5kvx!6Vx!a!5k!a!b!7W!b;'S!5k;'S;=`!8V<%lO!5kP!6YTO!a!6V!a!b!6i!b;'S!6V;'S;=`!7Q<%lO!6VP!6lTO!`!6V!`!a!6{!a;'S!6V;'S;=`!7Q<%lO!6VP!7QOyPP!7TP;=`<%l!6Vq!7]V!dpOv!5kvx!6Vx!`!5k!`!a!7r!a;'S!5k;'S;=`!8V<%lO!5kq!7yS!dpyPOv(Vx;'S(V;'S;=`(h<%lO(Vq!8YP;=`<%l!5ka!8bX!b`Or!8]rs!6Vsv!8]vw!6Vw!a!8]!a!b!8}!b;'S!8];'S;=`!:V<%lO!8]a!9SX!b`Or!8]rs!6Vsv!8]vw!6Vw!`!8]!`!a!9o!a;'S!8];'S;=`!:V<%lO!8]a!9vT!b`yPOr)esv)ew;'S)e;'S;=`)y<%lO)ea!:YP;=`<%l!8]!R!:dY!b`!dpOr!4trs!5ksv!4tvw!6Vwx!8]x!`!4t!`!a!;S!a;'S!4t;'S;=`!;r<%lO!4t!R!;]V!b`!dpyPOr*Vrs(Vsv*Vwx)ex;'S*V;'S;=`*s<%lO*V!R!;uP;=`<%l!4t!V!<TXjSaP!b`!dpOr&Xrs&}sv&Xwx(tx!^&X!^!_*V!_;'S&X;'S;=`*y<%lO&X",
	tokenizers: [
		cC,
		lC,
		uC,
		oC,
		rC,
		iC,
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
function pC(e, t) {
	let n = Object.create(null);
	for (let r of e.getChildren(kS)) {
		let e = r.getChild(AS), i = r.getChild(jS) || r.getChild(MS);
		e && (n[t.read(e.from, e.to)] = i ? i.type.id == jS ? t.read(i.from + 1, i.to - 1) : t.read(i.from, i.to) : "");
	}
	return n;
}
function mC(e, t) {
	let n = e.getChild(OS);
	return n ? t.read(n.from, n.to) : " ";
}
function hC(e, t, n) {
	let r;
	for (let i of n) if (!i.attrs || i.attrs(r ||= pC(e.node.parent.firstChild, t))) return {
		parser: i.parser,
		bracketed: !0
	};
	return null;
}
function gC(e = [], t = []) {
	let n = [], r = [], i = [], a = [];
	for (let t of e) (t.tag == "script" ? n : t.tag == "style" ? r : t.tag == "textarea" ? i : a).push(t);
	let o = t.length ? Object.create(null) : null;
	for (let e of t) (o[e.name] || (o[e.name] = [])).push(e);
	return Qh((e, t) => {
		let s = e.type.id;
		if (s == NS) return hC(e, t, n);
		if (s == PS) return hC(e, t, r);
		if (s == FS) return hC(e, t, i);
		if (s == DS && a.length) {
			let n = e.node, r = n.firstChild, i = r && mC(r, t), o;
			if (i) {
				for (let e of a) if (e.tag == i && (!e.attrs || e.attrs(o ||= pC(r, t)))) {
					let t = n.lastChild, i = t.type.id == LS ? t.from : n.to;
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
		if (o && s == kS) {
			let n = e.node, r;
			if (r = n.firstChild) {
				let e = o[t.read(r.from, r.to)];
				if (e) for (let r of e) {
					if (r.tagName && r.tagName != mC(n.parent, t)) continue;
					let e = n.lastChild;
					if (e.type.id == jS) {
						let t = e.from + 1, n = e.lastChild, i = e.to - (n && n.isError ? 0 : 1);
						if (i > t) return {
							parser: r.parser,
							overlay: [{
								from: t,
								to: i
							}],
							bracketed: !0
						};
					} else if (e.type.id == MS) return {
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
//#endregion
//#region node_modules/@lezer/javascript/dist/index.js
var _C = 317, vC = 318, yC = 1, bC = 2, xC = 3, SC = 4, CC = 319, wC = 321, TC = 322, EC = 5, DC = 6, OC = 0, kC = [
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
], AC = 125, jC = 59, MC = 47, NC = 42, PC = 43, FC = 45, IC = 60, LC = 44, RC = 63, zC = 46, BC = 91, VC = new nx({
	start: !1,
	shift(e, t) {
		return t == EC || t == DC || t == wC ? e : t == TC;
	},
	strict: !1
}), HC = new Ub((e, t) => {
	let { next: n } = e;
	(n == AC || n == -1 || t.context) && e.acceptToken(CC);
}, {
	contextual: !0,
	fallback: !0
}), UC = new Ub((e, t) => {
	let { next: n } = e, r;
	kC.indexOf(n) > -1 || (n != MC || (r = e.peek(1)) != MC && r != NC) && n != AC && n != jC && n != -1 && !t.context && e.acceptToken(_C);
}, { contextual: !0 }), WC = new Ub((e, t) => {
	e.next == BC && !t.context && e.acceptToken(vC);
}, { contextual: !0 }), GC = new Ub((e, t) => {
	let { next: n } = e;
	if (n == PC || n == FC) {
		if (e.advance(), n == e.next) {
			e.advance();
			let n = !t.context && t.canShift(yC);
			e.acceptToken(n ? yC : bC);
		}
	} else n == RC && e.peek(1) == zC && (e.advance(), e.advance(), (e.next < 48 || e.next > 57) && e.acceptToken(xC));
}, { contextual: !0 });
function KC(e, t) {
	return e >= 65 && e <= 90 || e >= 97 && e <= 122 || e == 95 || e >= 192 || !t && e >= 48 && e <= 57;
}
var qC = new Ub((e, t) => {
	if (e.next != IC || !t.dialectEnabled(OC) || (e.advance(), e.next == MC)) return;
	let n = 0;
	for (; kC.indexOf(e.next) > -1;) e.advance(), n++;
	if (KC(e.next, !0)) {
		for (e.advance(), n++; KC(e.next, !1);) e.advance(), n++;
		for (; kC.indexOf(e.next) > -1;) e.advance(), n++;
		if (e.next == LC) return;
		for (let t = 0;; t++) {
			if (t == 7) {
				if (!KC(e.next, !0)) return;
				break;
			}
			if (e.next != "extends".charCodeAt(t)) break;
			e.advance(), n++;
		}
	}
	e.acceptToken(SC, -n);
}), JC = vg({
	"get set async static": J.modifier,
	"for while do if else switch try catch finally return throw break continue default case defer": J.controlKeyword,
	"in of await yield void typeof delete instanceof as satisfies": J.operatorKeyword,
	"let var const using function class extends": J.definitionKeyword,
	"import export from": J.moduleKeyword,
	"with debugger new": J.keyword,
	TemplateString: J.special(J.string),
	super: J.atom,
	BooleanLiteral: J.bool,
	this: J.self,
	null: J.null,
	Star: J.modifier,
	VariableName: J.variableName,
	"CallExpression/VariableName TaggedTemplateExpression/VariableName": J.function(J.variableName),
	VariableDefinition: J.definition(J.variableName),
	Label: J.labelName,
	PropertyName: J.propertyName,
	PrivatePropertyName: J.special(J.propertyName),
	"CallExpression/MemberExpression/PropertyName": J.function(J.propertyName),
	"FunctionDeclaration/VariableDefinition": J.function(J.definition(J.variableName)),
	"ClassDeclaration/VariableDefinition": J.definition(J.className),
	"NewExpression/VariableName": J.className,
	PropertyDefinition: J.definition(J.propertyName),
	PrivatePropertyDefinition: J.definition(J.special(J.propertyName)),
	UpdateOp: J.updateOperator,
	"LineComment Hashbang": J.lineComment,
	BlockComment: J.blockComment,
	Number: J.number,
	String: J.string,
	Escape: J.escape,
	ArithOp: J.arithmeticOperator,
	LogicOp: J.logicOperator,
	BitOp: J.bitwiseOperator,
	CompareOp: J.compareOperator,
	RegExp: J.regexp,
	Equals: J.definitionOperator,
	Arrow: J.function(J.punctuation),
	": Spread": J.punctuation,
	"( )": J.paren,
	"[ ]": J.squareBracket,
	"{ }": J.brace,
	"InterpolationStart InterpolationEnd": J.special(J.brace),
	".": J.derefOperator,
	", ;": J.separator,
	"@": J.meta,
	TypeName: J.typeName,
	TypeDefinition: J.definition(J.typeName),
	"type enum interface implements namespace module declare": J.definitionKeyword,
	"abstract global Privacy readonly override": J.modifier,
	"is keyof unique infer asserts": J.operatorKeyword,
	JSXAttributeValue: J.attributeValue,
	JSXText: J.content,
	"JSXStartTag JSXStartCloseTag JSXSelfCloseEndTag JSXEndTag": J.angleBracket,
	"JSXIdentifier JSXNameSpacedName": J.tagName,
	"JSXAttribute/JSXIdentifier JSXAttribute/JSXNameSpacedName": J.attributeName,
	"JSXBuiltin/JSXIdentifier": J.standard(J.tagName)
}), YC = {
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
}, XC = {
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
}, ZC = {
	__proto__: null,
	"<": 193
}, QC = rx.deserialize({
	version: 14,
	states: "$GSQ%TQlOOO%[QlOOO'_QpOOP(lO`OOO*zQ!0MxO'#CiO+RO#tO'#CjO+aO&jO'#CjO+oO#@ItO'#DaO.QQlO'#DgO.bQlO'#DrO%[QlO'#DzO0fQlO'#ESOOQ!0Lf'#E['#E[O1PQ`O'#EXOOQO'#Ep'#EpOOQO'#Im'#ImO1XQ`O'#GtO1dQ`O'#EoO1iQ`O'#EoO3hQ!0MxO'#JsO6[Q!0MxO'#JtO6uQ`O'#F^O6zQ,UO'#FuOOQ!0Lf'#Fg'#FgO7VO7dO'#FgO9XQMhO'#F}O9`Q`O'#F|OOQ!0Lf'#Jt'#JtOOQ!0Lb'#Js'#JsO9eQ`O'#GxOOQ['#K`'#K`O9pQ`O'#IZO9uQ!0LrO'#I[OOQ['#Ja'#JaOOQ['#I`'#I`Q`QlOOQ`QlOOO9}Q!L^O'#DvO:UQlO'#EOO:]QlO'#EQO9kQ`O'#GtO:dQMhO'#CoO:rQ`O'#EnO:}Q`O'#EzO;hQMhO'#FfO;xQ`O'#GtOOQO'#Ka'#KaO;}Q`O'#KaO<]Q`O'#G|O<]Q`O'#G}O<]Q`O'#HPO9kQ`O'#HSO=SQ`O'#HVO>kQ`O'#CeO>{Q`O'#HdO?TQ`O'#HjO?TQ`O'#HlO`QlO'#HnO?TQ`O'#HpO?TQ`O'#HsO?YQ`O'#HyO?_Q!0LsO'#IPO%[QlO'#IRO?jQ!0LsO'#ITO?uQ!0LsO'#IVO9uQ!0LrO'#IXO@QQ!0MxO'#CiOASQpO'#DlQOQ`OOO%[QlO'#EQOAjQ`O'#ETO:dQMhO'#EnOAuQ`O'#EnOBQQ!bO'#FfOOQ['#Cg'#CgOOQ!0Lb'#Dq'#DqOOQ!0Lb'#Jw'#JwO%[QlO'#JwOOQO'#Jz'#JzOOQO'#Ii'#IiOCQQpO'#EgOOQ!0Lb'#Ef'#EfOOQ!0Lb'#KO'#KOOC|Q!0MSO'#EgODWQpO'#EWOOQO'#Jy'#JyODlQpO'#JzOEyQpO'#EWODWQpO'#EgPFWO&2DjO'#CbPOOO)CEO)CEOOOOO'#Ia'#IaOFcO#tO,59UOOQ!0Lh,59U,59UOOOO'#Ib'#IbOFqO&jO,59UOGPQ!L^O'#DcOOOO'#Id'#IdOGWO#@ItO,59{OOQ!0Lf,59{,59{OGfQlO'#IeOGyQ`O'#JuOIxQ!fO'#JuO+}QlO'#JuOJPQ`O,5:ROJgQ`O'#EpOJtQ`O'#KUOKPQ`O'#KTOKPQ`O'#KTOKXQ`O,5;^OK^Q`O'#KSOOQ!0Ln,5:^,5:^OKeQlO,5:^OMcQ!0MxO,5:fONSQ`O,5:nONmQ!0LrO'#KRONtQ`O'#KQO9eQ`O'#KQO! YQ`O'#KQO! bQ`O,5;]O! gQ`O'#KQO!#lQ!fO'#JtOOQ!0Lh'#Ci'#CiO%[QlO'#ESO!$[Q!fO,5:sOOQS'#J{'#J{OOQO-E<k-E<kO9kQ`O,5=`O!$rQ`O,5=`O!$wQlO,5;ZO!&zQMhO'#EkO!(eQ`O,5;ZO!(jQlO'#DyO!(tQpO,5;eO!(|QpO,5;eO%[QlO,5;eOOQ['#FU'#FUOOQ['#FW'#FWO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fO%[QlO,5;fOOQ['#F['#F[O!)[QlO,5;uOOQ!0Lf,5;z,5;zOOQ!0Lf,5;{,5;{OOQ!0Lf,5;},5;}O%[QlO'#IqO!+_Q!0LrO,5<jO%[QlO,5;fO!&zQMhO,5;fO!+|QMhO,5;fO!-nQMhO'#E^O%[QlO,5;xOOQ!0Lf,5;|,5;|O!-uQ,UO'#FkO!.rQ,UO'#KYO!.^Q,UO'#KYO!.yQ,UO'#KYOOQO'#KY'#KYO!/_Q,UO,5<TOOOW,5<a,5<aO!/pQlO'#FwOOOW'#Ip'#IpO7VO7dO,5<RO!/wQ,UO'#FyOOQ!0Lf,5<R,5<RO!0hQ$IUO'#CyOOQ!0Lh'#C}'#C}O!0{O#@ItO'#DRO!1iQMjO,5<fO!1pQ`O,5<iO!3YQ(CWO'#GYO!3jQ`O'#GZO!3oQ`O'#GZO!5_Q(CWO'#G_O!6dQpO'#GcOOQO'#Go'#GoO!,TQMhO'#GnOOQO'#Gq'#GqO!,TQMhO'#GpO!7VQ$IUO'#JmOOQ!0Lh'#Jm'#JmO!7aQ`O'#JlO!7oQ`O'#JkO!7wQ`O'#CuOOQ!0Lh'#C{'#C{O!8YQ`O'#C}OOQ!0Lh'#DV'#DVOOQ!0Lh'#DX'#DXO!8_Q`O,5<fO1SQ`O'#DZO!,TQMhO'#GQO!,TQMhO'#GSO!8gQ`O'#GUO!8lQ`O'#GVO!3oQ`O'#G]O!,TQMhO'#GbO<]Q`O'#JlO!8qQ`O'#EqO!9`Q`O,5<hOOQ!0Lb'#Cr'#CrO!9hQ`O'#ErO!:bQpO'#EsOOQ!0Lb'#KS'#KSO!:iQ!0LrO'#KbO9uQ!0LrO,5=dO`QlO,5>uOOQ['#Ji'#JiOOQ[,5>v,5>vOOQ[-E<^-E<^O!<hQ!0MxO,5:bO!=[QpO,5:`O!?WQ!0MxO,5:jO%[QlO,5:jO!AnQ!0MxO,5:lOOQO,5@{,5@{O!B_QMhO,5=`O!BmQ!0LrO'#JjO9`Q`O'#JjO!COQ!0LrO,59ZO!CZQpO,59ZO!CcQMhO,59ZO:dQMhO,59ZO!CnQ`O,5;ZO!CvQ`O'#HcO!D[Q`O'#KeO%[QlO,5<OO!=[QpO,5<QO!DdQ`O,5={O!DiQ`O,5={O!DnQ`O,5={O!D|Q`O,5={O9uQ!0LrO,5={O<]Q`O,5=kOOQO'#Cy'#CyO!ETQpO,5=hO!E]QMhO,5=iO!EhQ`O,5=kO!EmQ!bO,5=nO!EuQ`O'#KaO?YQ`O'#HXO9kQ`O'#HZO!EzQ`O'#HZO:dQMhO'#H]O!FPQ`O'#H]OOQ[,5=q,5=qO!FUQ`O'#H^O!FgQ`O'#CoO!FlQ`O,59PO!FvQ`O,59PO!H{QlO,59POOQ[,59P,59PO!I]Q!0LrO,59PO%[QlO,59PO!KhQlO'#HfOOQ['#Hg'#HgOOQ['#Hh'#HhO`QlO,5>OO!LOQ`O,5>OO`QlO,5>UO`QlO,5>WO!LTQ`O,5>YO`QlO,5>[O!LYQ`O,5>_O!L_QlO,5>eOOQ[,5>k,5>kO%[QlO,5>kO9uQ!0LrO,5>mOOQ[,5>o,5>oO#!iQ`O,5>oOOQ[,5>q,5>qO#!iQ`O,5>qOOQ[,5>s,5>sO##VQpO'#D_O%[QlO'#JwO##aQpO'#JwO##{QpO'#DmO#$^QpO'#DmO#&oQlO'#DmO#&vQ`O'#JvO#'OQ`O,5:WO#'TQ`O'#EtO#'`Q`O'#EtO#'eQ`O'#KVO#'mQ`O,5;_O#'rQpO'#DmO#(PQpO'#EVOOQ!0Lf,5:o,5:oO%[QlO,5:oO#(WQ`O,5:oO?YQ`O,5;YO!CZQpO,5;YO!CcQMhO,5;YO:dQMhO,5;YO#(`Q`O,5@cO#(eQ07dO,5:sOOQO-E<g-E<gO#)kQ!0MSO,5;RODWQpO,5:rO#)uQpO,5:rODWQpO,5;RO!COQ!0LrO,5:rOOQ!0Lb'#Ej'#EjOOQO,5;R,5;RO%[QlO,5;RO#*SQ!0LrO,5;RO#*_Q!0LrO,5;RO!CZQpO,5:rOOQO,5;X,5;XO#*mQ!0LrO,5;RPOOO'#I_'#I_P#+RO&2DjO,58|POOO,58|,58|OOOO-E<_-E<_OOQ!0Lh1G.p1G.pOOOO-E<`-E<`OOOO,59},59}O#+^Q!bO,59}OOOO-E<b-E<bOOQ!0Lf1G/g1G/gO#+cQ!fO,5?PO+}QlO,5?POOQO,5?V,5?VO#+mQlO'#IeOOQO-E<c-E<cO#+zQ`O,5@aO#,SQ!fO,5@aO#,ZQ`O,5@oOOQ!0Lf1G/m1G/mO%[QlO,5@pO#,cQ`O'#IkOOQO-E<i-E<iO#,ZQ`O,5@oOOQ!0Lb1G0x1G0xOOQ!0Ln1G/x1G/xOOQ!0Ln1G0Y1G0YO%[QlO,5@mO#,wQ!0LrO,5@mO#-YQ!0LrO,5@mO#-aQ`O,5@lO9eQ`O,5@lO#-iQ`O,5@lO#-wQ`O'#InO#-aQ`O,5@lOOQ!0Lb1G0w1G0wO!(tQpO,5:uO!)PQpO,5:uOOQS,5:w,5:wO#.iQdO,5:wO#.qQMhO1G2zO9kQ`O1G2zOOQ!0Lf1G0u1G0uO#/PQ!0MxO1G0uO#0UQ!0MvO,5;VOOQ!0Lh'#GX'#GXO#0rQ!0MzO'#JmO!$wQlO1G0uO#2}Q!fO'#JxO%[QlO'#JxO#3XQ`O,5:eOOQ!0Lh'#D_'#D_OOQ!0Lf1G1P1G1PO%[QlO1G1POOQ!0Lf1G1g1G1gO#3^Q`O1G1PO#5rQ!0MxO1G1QO#5yQ!0MxO1G1QO#8aQ!0MxO1G1QO#8hQ!0MxO1G1QO#;OQ!0MxO1G1QO#=fQ!0MxO1G1QO#=mQ!0MxO1G1QO#=tQ!0MxO1G1QO#@[Q!0MxO1G1QO#@cQ!0MxO1G1QO#BpQ?MtO'#CiO#DkQ?MtO1G1aO#DrQ?MtO'#JtO#EVQ!0MxO,5?]OOQ!0Lb-E<o-E<oO#GdQ!0MxO1G1QO#HaQ!0MzO1G1QOOQ!0Lf1G1Q1G1QO#IdQMjO'#J}O#InQ`O,5:xO#IsQ!0MxO1G1dO#JgQ,UO,5<XO#JoQ,UO,5<YO#JwQ,UO'#FpO#K`Q`O'#FoOOQO'#KZ'#KZOOQO'#Io'#IoO#KeQ,UO1G1oOOQ!0Lf1G1o1G1oOOOW1G1z1G1zO#KvQ?MtO'#JsO#LQQ`O,5<cO!)[QlO,5<cOOOW-E<n-E<nOOQ!0Lf1G1m1G1mO#LVQpO'#KYOOQ!0Lf,5<e,5<eO#L_QpO,5<eO#LdQMhO'#DTOOOO'#Ic'#IcO#LkO#@ItO,59mOOQ!0Lh,59m,59mO%[QlO1G2QO!8lQ`O'#IsO#LvQ`O,5<{OOQ!0Lh,5<x,5<xO!,TQMhO'#IvO#MdQMjO,5=YO!,TQMhO'#IxO#NVQMjO,5=[O!&zQMhO,5=^OOQO1G2T1G2TO#NaQ!dO'#CrO#NtQ(CWO'#ErO$ |QpO'#GcO$!dQ!dO,5<tO$!kQ`O'#K]O9eQ`O'#K]O$!yQ`O,5<vO$#aQ!dO'#C{O!,TQMhO,5<uO$#kQ`O'#G[O$$PQ`O,5<uO$$UQ!dO'#GXO$$cQ!dO'#K^O$$mQ`O'#K^O!&zQMhO'#K^O$$rQ`O,5<yO$$wQlO'#JwO$%RQpO'#GdO#$^QpO'#GdO$%dQ`O'#GhO!3oQ`O'#GlO$%iQ!0LrO'#IuO$%tQpO,5<}OOQ!0Lp,5<},5<}O$%{QpO'#GdO$&YQpO'#GeO$&kQpO'#GeO$&pQMjO,5=YO$'QQMjO,5=[OOQ!0Lh,5=_,5=_O!,TQMhO,5@WO!,TQMhO,5@WO$'bQ`O'#IzO$'vQ`O,5@VO$(OQ`O,59aOOQ!0Lh,59i,59iO$(TQ`O,5@WO$)TQ$IYO,59uOOQ!0Lh'#Jq'#JqO$)vQMjO,5<lO$*iQMjO,5<nO@zQ`O,5<pOOQ!0Lh,5<q,5<qO$*sQ`O,5<wO$*xQMjO,5<|O$+YQ`O'#KQO!$wQlO1G2SO$+_Q`O1G2SO9eQ`O'#KTO$+dQ`O'#D_O9eQ`O'#EtO%[QlO'#EtO9eQ`O'#I|O$+rQ!0LrO,5@|OOQ[1G3O1G3OOOQ[1G4a1G4aOOQ!0Lf1G/|1G/|OOQ!0Lf1G/z1G/zO$-tQ!0MxO1G0UOOQ[1G2z1G2zO!&zQMhO1G2zO%[QlO1G2zO#.tQ`O1G2zO$/xQMhO'#EkOOQ!0Lb,5@U,5@UO$0VQ!0LrO,5@UOOQ[1G.u1G.uO!COQ!0LrO1G.uO!CZQpO1G.uO!CcQMhO1G.uO$0hQ`O1G0uO$0mQ`O'#CiO$0xQ`O'#KfO$1QQ`O,5=}O$1VQ`O'#KfO$1[Q`O'#KfO$1jQ`O'#JSO$1xQ`O,5APO$2QQ!fO1G1jOOQ!0Lf1G1l1G1lO9kQ`O1G3gO@zQ`O1G3gO$2XQ`O1G3gO$2^Q`O1G3gO!DnQ`O1G3gO9uQ!0LrO1G3gOOQ[1G3g1G3gO!EhQ`O1G3VO!&zQMhO1G3SO$2cQ`O1G3SOOQ[1G3T1G3TO!&zQMhO1G3TO$2hQ`O1G3TO$2pQpO'#HROOQ[1G3V1G3VO!6_QpO'#JOO!EmQ!bO1G3YOOQ[1G3Y1G3YOOQ[,5=s,5=sO$2xQMhO,5=uO9kQ`O,5=uO$%dQ`O,5=wO9`Q`O,5=wO!CZQpO,5=wO!CcQMhO,5=wO:dQMhO,5=wO$3WQ`O'#KdO$3cQ`O,5=xOOQ[1G.k1G.kO$3hQ!0LrO1G.kO@zQ`O1G.kO$3sQ`O1G.kO9uQ!0LrO1G.kO$5{Q!fO,5ARO$6YQ`O,5ARO9eQ`O,5ARO$6eQlO,5>QO$6lQ`O,5>QOOQ[1G3j1G3jO`QlO1G3jOOQ[1G3p1G3pOOQ[1G3r1G3rO?TQ`O1G3tO$6qQlO1G3vO$:uQlO'#HuOOQ[1G3y1G3yO$;SQ`O'#H{O?YQ`O'#H}OOQ[1G4P1G4PO$;[QlO1G4PO9uQ!0LrO1G4VOOQ[1G4X1G4XOOQ!0Lb'#G`'#G`O9uQ!0LrO1G4ZO9uQ!0LrO1G4]O$?cQ`O,5@cO9eQ`O,5;`O?YQ`O,5:XO!)[QlO,5:XO!CZQpO,5:XO$?hQ?MtO,5:XOOQO,5;`,5;`O$?rQpO'#IfO$@YQ`O,5@bOOQ!0Lf1G/r1G/rO!)[QlO,5;`O$@bQpO'#IlO$@lQ`O,5@qOOQ!0Lb1G0y1G0yO#$^QpO,5:XOOQO'#Ih'#IhO$@tQpO,5:qOOQ!0Ln,5:q,5:qO#(ZQ`O1G0ZOOQ!0Lf1G0Z1G0ZO%[QlO1G0ZOOQ!0Lf1G0t1G0tO?YQ`O1G0tO!CZQpO1G0tO!CcQMhO1G0tOOQ!0Lb1G5}1G5}O!COQ!0LrO1G0^OOQO1G0m1G0mO%[QlO1G0mO$@{Q!0LrO1G0mO$AWQ!0LrO1G0mO!CZQpO1G0^ODWQpO1G0^O$AfQ!0LrO1G0mOOQO1G0^1G0^O$AzQ!0MxO1G0mPOOO-E<]-E<]POOO1G.h1G.hOOOO1G/i1G/iO$BUQ!bO,5<jO$B^Q!fO1G4kOOQO1G4q1G4qO%[QlO,5?PO$BhQ`O1G5{O$BpQ`O1G6ZO$BxQ!fO1G6[O9eQ`O,5?VO$CSQ!0MxO1G6XO%[QlO1G6XO$CdQ!0LrO1G6XO$CuQ`O1G6WO$CuQ`O1G6WO9eQ`O1G6WO$C}Q`O,5?YO9eQ`O,5?YOOQO,5?Y,5?YO$DcQ`O,5?YO$+YQ`O,5?YOOQO-E<l-E<lOOQS1G0a1G0aOOQS1G0c1G0cO#.lQ`O1G0cOOQ[7+(f7+(fO!&zQMhO7+(fO%[QlO7+(fO$DqQ`O7+(fO$D|QMhO7+(fO$E[Q!0MzO,5=YO$GgQ!0MzO,5=[O$IrQ!0MzO,5=YO$LTQ!0MzO,5=[O$NfQ!0MzO,59uO%!kQ!0MzO,5<lO%$vQ!0MzO,5<nO%'RQ!0MzO,5<|OOQ!0Lf7+&a7+&aO%)dQ!0MxO7+&aO%*WQlO'#IgO%*eQ`O,5@dO%*mQ!fO,5@dOOQ!0Lf1G0P1G0PO%*wQ`O7+&kOOQ!0Lf7+&k7+&kO%*|Q?MtO,5:fO%[QlO7+&{O%+WQ?MtO,5:bO%+eQ?MtO,5:jO%+oQ?MtO,5:lO%+yQMhO'#IjO%,TQ`O,5@iOOQ!0Lh1G0d1G0dOOQO1G1s1G1sOOQO1G1t1G1tO%,]Q!jO,5<[O!)[QlO,5<ZOOQO-E<m-E<mOOQ!0Lf7+'Z7+'ZOOOW7+'f7+'fOOOW1G1}1G1}O%,hQ`O1G1}OOQ!0Lf1G2P1G2POOOO,59o,59oO%,mQ!dO,59oOOOO-E<a-E<aOOQ!0Lh1G/X1G/XO%,tQ!0MxO7+'lOOQ!0Lh,5?_,5?_O%-hQMhO1G2gP%-oQ`O'#IsPOQ!0Lh-E<q-E<qO%.]QMjO,5?bOOQ!0Lh-E<t-E<tO%/OQMjO,5?dOOQ!0Lh-E<v-E<vO%/YQ!dO1G2xO%/aQ!dO'#CrO%/wQMhO'#KTO$$wQlO'#JwOOQ!0Lh1G2`1G2`O%0RQ`O'#IrO%0jQ`O,5@wO%0jQ`O,5@wO%0rQ`O,5@wO%0}Q`O,5@wOOQO1G2b1G2bO%1]QMjO1G2aO$+YQ`O'#K]O!,TQMhO1G2aO%1mQ(CWO'#ItO%1zQ`O,5@xO!&zQMhO,5@xO%2SQ!dO,5@xOOQ!0Lh1G2e1G2eO%4dQ!fO'#CiO%4nQ`O,5=QOOQ!0Lb,5=O,5=OO%4vQpO,5=OOOQ!0Lb,5=P,5=POCwQ`O,5=OO%5RQpO,5=OOOQ!0Lb,5=S,5=SO$+YQ`O,5=WOOQO,5?a,5?aOOQO-E<s-E<sOOQ!0Lp1G2i1G2iO#$^QpO,5=OO$$wQlO,5=QO%5aQ`O,5=PO%5lQpO,5=PO!,TQMhO'#IvO%6fQMjO1G2tO!,TQMhO'#IxO%7XQMjO1G2vO%7cQMjO1G5rO%7mQMjO1G5rOOQO,5?f,5?fOOQO-E<x-E<xOOQO1G.{1G.{O!,TQMhO1G5rO!,TQMhO1G5rO!=[QpO,59wO%[QlO,59wOOQ!0Lh,5<k,5<kO%7zQ`O1G2[O!,TQMhO1G2cO%8PQ!0MxO7+'nOOQ!0Lf7+'n7+'nO!$wQlO7+'nO%8sQ`O,5;`OOQ!0Lb,5?h,5?hOOQ!0Lb-E<z-E<zO%8xQ!dO'#K_O#(ZQ`O7+(fO4UQ!fO7+(fO$DtQ`O7+(fO%9SQ!0MvO'#CiO%9gQ!0MvO,5=TO%9zQ`O,5=TO%:SQ`O,5=TOOQ!0Lb1G5p1G5pOOQ[7+$a7+$aO!COQ!0LrO7+$aO!CZQpO7+$aO!$wQlO7+&aO%:XQ`O'#JRO%:pQ`O,5AQOOQO1G3i1G3iO9kQ`O,5AQO%:pQ`O,5AQO%:xQ`O,5AQOOQO,5?n,5?nOOQO-E=Q-E=QOOQ!0Lf7+'U7+'UO%:}Q`O7+)RO9uQ!0LrO7+)RO9kQ`O7+)RO@zQ`O7+)RO%;SQ`O7+)ROOQ[7+)R7+)ROOQ[7+(q7+(qO%;XQ!0MvO7+(nO!&zQMhO7+(nO!EcQ`O7+(oOOQ[7+(o7+(oO!&zQMhO7+(oO%;cQ`O'#KcO%;nQ`O,5=mOOQO,5?j,5?jOOQO-E<|-E<|OOQ[7+(t7+(tO%=QQpO'#H[OOQ[1G3a1G3aO!&zQMhO1G3aO%[QlO1G3aO%=XQ`O1G3aO%=dQMhO1G3aO9uQ!0LrO1G3cO$%dQ`O1G3cO9`Q`O1G3cO!CZQpO1G3cO!CcQMhO1G3cO%=rQ`O'#JQO%>WQ`O,5AOO%>`QpO,5AOOOQ!0Lb1G3d1G3dOOQ[7+$V7+$VO@zQ`O7+$VO9uQ!0LrO7+$VO%>kQ`O7+$VO%[QlO1G6mO%[QlO1G6nO%>pQ!0LrO1G6mO%>zQlO1G3lO%?RQ`O1G3lO%?WQlO1G3lOOQ[7+)U7+)UO9uQ!0LrO7+)`O`QlO7+)bOOQ['#Ki'#KiOOQ['#JT'#JTO%?_QlO,5>aOOQ[,5>a,5>aO%[QlO'#HvO%?lQ`O'#HxOOQ[,5>g,5>gO9eQ`O,5>gOOQ[,5>i,5>iOOQ[7+)k7+)kOOQ[7+)q7+)qOOQ[7+)u7+)uOOQ[7+)w7+)wO%?qQpO1G5}O%@]Q`O1G0zOOQO1G/s1G/sO%@hQ?MtO1G/sO?YQ`O1G/sO!)[QlO'#DmOOQO,5?Q,5?QOOQO-E<d-E<dO%@rQ?MtO1G0zOOQO,5?W,5?WOOQO-E<j-E<jO!CZQpO1G/sOOQO-E<f-E<fOOQ!0Ln1G0]1G0]OOQ!0Lf7+%u7+%uO#(ZQ`O7+%uOOQ!0Lf7+&`7+&`O?YQ`O7+&`O!CZQpO7+&`OOQO7+%x7+%xO$AzQ!0MxO7+&XOOQO7+&X7+&XO%[QlO7+&XO%@|Q!0LrO7+&XO!COQ!0LrO7+%xO!CZQpO7+%xO%AXQ!0LrO7+&XO%AgQ!0MxO7++sO%[QlO7++sO%AwQ`O7++rO%AwQ`O7++rOOQO1G4t1G4tO9eQ`O1G4tO%BPQ`O1G4tOOQS7+%}7+%}O#(ZQ`O<<LQO4UQ!fO<<LQO%B_Q`O<<LQOOQ[<<LQ<<LQO!&zQMhO<<LQO%[QlO<<LQO%BgQ`O<<LQO%BrQ!0MzO,5?bO%D}Q!0MzO,5?dO%GYQ!0MzO1G2aO%IkQ!0MzO1G2tO%KvQ!0MzO1G2vO%NRQ!fO,5?RO%[QlO,5?ROOQO-E<e-E<eO%N]Q`O1G6OOOQ!0Lf<<JV<<JVO%NeQ?MtO1G0uO&!lQ?MtO1G1QO&!sQ?MtO1G1QO&$tQ?MtO1G1QO&${Q?MtO1G1QO&&|Q?MtO1G1QO&(}Q?MtO1G1QO&)UQ?MtO1G1QO&)]Q?MtO1G1QO&+^Q?MtO1G1QO&+eQ?MtO1G1QO&+lQ!0MxO<<JgO&-dQ?MtO1G1QO&.aQ?MvO1G1QO&/dQ?MvO'#JmO&1jQ?MtO1G1dO&1wQ?MtO1G0UO&2RQMjO,5?UOOQO-E<h-E<hO!)[QlO'#FrOOQO'#K['#K[OOQO1G1v1G1vO&2]Q`O1G1uO&2bQ?MtO,5?]OOOW7+'i7+'iOOOO1G/Z1G/ZO&2lQ!dO1G4yOOQ!0Lh7+(R7+(RP!&zQMhO,5?_O!,TQMhO7+(dO&2sQ`O,5?^O9eQ`O,5?^O$+YQ`O,5?^OOQO-E<p-E<pO&3RQ`O1G6cO&3RQ`O1G6cO&3ZQ`O1G6cO&3fQMjO7+'{O&3vQ!dO,5?`O&4QQ`O,5?`O!&zQMhO,5?`OOQO-E<r-E<rO&4VQ!dO1G6dO&4aQ`O1G6dO&4iQ`O1G2lO!&zQMhO1G2lOOQ!0Lb1G2j1G2jOOQ!0Lb1G2k1G2kO%4vQpO1G2jO!CZQpO1G2jOCwQ`O1G2jOOQ!0Lb1G2r1G2rO&4nQpO1G2jO&4|Q`O1G2lO$+YQ`O1G2kOCwQ`O1G2kO$$wQlO1G2lO&5UQ`O1G2kO&5xQMjO,5?bOOQ!0Lh-E<u-E<uO&6kQMjO,5?dOOQ!0Lh-E<w-E<wO!,TQMhO7++^O&6uQMjO7++^O&7PQMjO7++^OOQ!0Lh1G/c1G/cO&7^Q`O1G/cOOQ!0Lh7+'v7+'vO&7cQMjO7+'}O&7sQ!0MxO<<KYOOQ!0Lf<<KY<<KYO&8gQ`O1G0zO!&zQMhO'#I{O&8lQ`O,5@yO&:nQ!fO<<LQO!&zQMhO1G2oO&:uQ!0LrO1G2oOOQ[<<G{<<G{O!COQ!0LrO<<G{O&;WQ!0MxO<<I{OOQ!0Lf<<I{<<I{OOQO,5?m,5?mO&;zQ`O,5?mO&<PQ`O,5?mOOQO-E=P-E=PO&<_Q`O1G6lO&<_Q`O1G6lO9kQ`O1G6lO@zQ`O<<LmOOQ[<<Lm<<LmO&<gQ`O<<LmO9uQ!0LrO<<LmO9kQ`O<<LmOOQ[<<LY<<LYO%;XQ!0MvO<<LYOOQ[<<LZ<<LZO!EcQ`O<<LZO&<lQpO'#I}O&<wQ`O,5@}O!)[QlO,5@}OOQ[1G3X1G3XOOQO'#JP'#JPO9uQ!0LrO'#JPO&=PQpO,5=vOOQ[,5=v,5=vO&=WQpO'#EgO&=_QpO'#GfO&=dQ`O7+({O&=iQ`O7+({OOQ[7+({7+({O!&zQMhO7+({O%[QlO7+({O&=qQ`O7+({OOQ[7+(}7+(}O9uQ!0LrO7+(}O$%dQ`O7+(}O9`Q`O7+(}O!CZQpO7+(}O&=|Q`O,5?lOOQO-E=O-E=OOOQO'#H_'#H_O&>XQ`O1G6jO9uQ!0LrO<<GqOOQ[<<Gq<<GqO@zQ`O<<GqO&>aQ`O7+,XO&>fQ`O7+,YO%[QlO7+,XO%[QlO7+,YOOQ[7+)W7+)WO&>kQ`O7+)WO&>pQlO7+)WO&>wQ`O7+)WOOQ[<<Lz<<LzOOQ[<<L|<<L|OOQ[-E=R-E=ROOQ[1G3{1G3{O&>|Q`O,5>bOOQ[,5>d,5>dO&?RQ`O1G4RO9eQ`O7+&fO!)[QlO7+&fOOQO7+%_7+%_O&?WQ?MtO1G6[O?YQ`O7+%_OOQ!0Lf<<Ia<<IaOOQ!0Lf<<Iz<<IzO?YQ`O<<IzOOQO<<Is<<IsO$AzQ!0MxO<<IsO%[QlO<<IsOOQO<<Id<<IdO!COQ!0LrO<<IdO&?bQ!0LrO<<IsO&?mQ!0MxO<= _O&?}Q`O<= ^OOQO7+*`7+*`O9eQ`O7+*`OOQ[ANAlANAlO&@VQ!fOANAlO!&zQMhOANAlO#(ZQ`OANAlO4UQ!fOANAlO&@^Q`OANAlO%[QlOANAlO&@fQ!0MzO7+'{O&BwQ!0MzO,5?bO&ESQ!0MzO,5?dO&G_Q!0MzO7+'}O&IpQ!fO1G4mO&IzQ?MtO7+&aO&LOQ?MvO,5=YO&NVQ?MvO,5=[O&NgQ?MvO,5=YO&NwQ?MvO,5=[O' XQ?MvO,59uO'#_Q?MvO,5<lO'%bQ?MvO,5<nO''vQ?MvO,5<|O')lQ?MtO7+'lO')yQ?MtO7+'nO'*WQ`O,5<^OOQO7+'a7+'aOOQ!0Lh7+*e7+*eO'*]QMjO<<LOOOQO1G4x1G4xO'*dQ`O1G4xO'*oQ`O1G4xO'*}Q`O7++}O'*}Q`O7++}O!&zQMhO1G4zO'+VQ!dO1G4zO'+aQ`O7+,OO'+iQ`O7+(WO'+tQ!dO7+(WOOQ!0Lb7+(U7+(UOOQ!0Lb7+(V7+(VO!CZQpO7+(UOCwQ`O7+(UO',OQ`O7+(WO!&zQMhO7+(WO$+YQ`O7+(VO',TQ`O7+(WOCwQ`O7+(VO',]QMjO<<NxO!,TQMhO<<NxOOQ!0Lh7+$}7+$}O',gQ!dO,5?gOOQO-E<y-E<yO',qQ!0MvO7+(ZO!&zQMhO7+(ZOOQ[AN=gAN=gO9kQ`O1G5XOOQO1G5X1G5XO'-RQ`O1G5XO'-WQ`O7+,WO'-WQ`O7+,WO9uQ!0LrOANBXO@zQ`OANBXOOQ[ANBXANBXO'-`Q`OANBXOOQ[ANAtANAtOOQ[ANAuANAuO'-eQ`O,5?iOOQO-E<{-E<{O'-pQ?MtO1G6iOOQO,5?k,5?kOOQO-E<}-E<}OOQ[1G3b1G3bO'-zQ`O,5=QOOQ[<<Lg<<LgO!&zQMhO<<LgO&=dQ`O<<LgO'.PQ`O<<LgO%[QlO<<LgOOQ[<<Li<<LiO9uQ!0LrO<<LiO$%dQ`O<<LiO9`Q`O<<LiO'.XQpO1G5WO'.dQ`O7+,UOOQ[AN=]AN=]O9uQ!0LrOAN=]OOQ[<= s<= sOOQ[<= t<= tO'.lQ`O<= sO'.qQ`O<= tOOQ[<<Lr<<LrO'.vQ`O<<LrO'.{QlO<<LrOOQ[1G3|1G3|O?YQ`O7+)mO'/SQ`O<<JQO'/_Q?MtO<<JQOOQO<<Hy<<HyOOQ!0LfAN?fAN?fOOQOAN?_AN?_O$AzQ!0MxOAN?_OOQOAN?OAN?OO%[QlOAN?_OOQO<<Mz<<MzOOQ[G27WG27WO!&zQMhOG27WO#(ZQ`OG27WO'/iQ!fOG27WO4UQ!fOG27WO'/pQ`OG27WO'/xQ?MtO<<JgO'0VQ?MvO1G2aO'1{Q?MvO,5?bO'4OQ?MvO,5?dO'6RQ?MvO1G2tO'8UQ?MvO1G2vO':XQ?MtO<<KYO':fQ?MtO<<I{OOQO1G1x1G1xO!,TQMhOANAjOOQO7+*d7+*dO':sQ`O7+*dO';OQ`O<= iO';WQ!dO7+*fOOQ!0Lb<<Kr<<KrO$+YQ`O<<KrOCwQ`O<<KrO';bQ`O<<KrO!&zQMhO<<KrOOQ!0Lb<<Kp<<KpO!CZQpO<<KpO';mQ!dO<<KrOOQ!0Lb<<Kq<<KqO';wQ`O<<KrO!&zQMhO<<KrO$+YQ`O<<KqO';|QMjOANDdO'<WQ!0MvO<<KuOOQO7+*s7+*sO9kQ`O7+*sO'<hQ`O<= rOOQ[G27sG27sO9uQ!0LrOG27sO@zQ`OG27sO!)[QlO1G5TO'<pQ`O7+,TO'<xQ`O1G2lO&=dQ`OANBROOQ[ANBRANBRO!&zQMhOANBRO'<}Q`OANBROOQ[ANBTANBTO9uQ!0LrOANBTO$%dQ`OANBTOOQO'#H`'#H`OOQO7+*r7+*rOOQ[G22wG22wOOQ[ANE_ANE_OOQ[ANE`ANE`OOQ[ANB^ANB^O'=VQ`OANB^OOQ[<<MX<<MXO!)[QlOAN?lOOQOG24yG24yO$AzQ!0MxOG24yO#(ZQ`OLD,rOOQ[LD,rLD,rO!&zQMhOLD,rO'=[Q!fOLD,rO'=cQ?MvO7+'{O'?XQ?MvO,5?bO'A[Q?MvO,5?dO'C_Q?MvO7+'}O'ETQMjOG27UOOQO<<NO<<NOOOQ!0LbANA^ANA^O$+YQ`OANA^OCwQ`OANA^O'EeQ!dOANA^OOQ!0LbANA[ANA[O'ElQ`OANA^O!&zQMhOANA^O'EwQ!dOANA^OOQ!0LbANA]ANA]OOQO<<N_<<N_OOQ[LD-_LD-_O9uQ!0LrOLD-_O'FRQ?MtO7+*oOOQO'#Gg'#GgOOQ[G27mG27mO&=dQ`OG27mO!&zQMhOG27mOOQ[G27oG27oO9uQ!0LrOG27oOOQ[G27xG27xO'F]Q?MtOG25WOOQOLD*eLD*eOOQ[!$(!^!$(!^O#(ZQ`O!$(!^O!&zQMhO!$(!^O'FgQ!0MzOG27UOOQ!0LbG26xG26xO$+YQ`OG26xO'HxQ`OG26xOCwQ`OG26xO'ITQ!dOG26xO!&zQMhOG26xOOQ[!$(!y!$(!yOOQ[LD-XLD-XO&=dQ`OLD-XOOQ[LD-ZLD-ZOOQ[!)9Ex!)9ExO#(ZQ`O!)9ExOOQ!0LbLD,dLD,dO$+YQ`OLD,dOCwQ`OLD,dO'I[Q`OLD,dO'IgQ!dOLD,dOOQ[!$(!s!$(!sOOQ[!.K;d!.K;dO'InQ?MvOG27UOOQ!0Lb!$(!O!$(!OO$+YQ`O!$(!OOCwQ`O!$(!OO'KdQ`O!$(!OOOQ!0Lb!)9Ej!)9EjO$+YQ`O!)9EjOCwQ`O!)9EjOOQ!0Lb!.K;U!.K;UO$+YQ`O!.K;UOOQ!0Lb!4/0p!4/0pO!)[QlO'#DzO1PQ`O'#EXO'KoQ!fO'#JsO'KvQ!L^O'#DvO'K}QlO'#EOO'LUQ!fO'#CiO'NlQ!fO'#CiO!)[QlO'#EQO'N|QlO,5;ZO!)[QlO,5;fO!)[QlO,5;fO!)[QlO,5;fO!)[QlO,5;fO!)[QlO,5;fO!)[QlO,5;fO!)[QlO,5;fO!)[QlO,5;fO!)[QlO,5;fO!)[QlO,5;fO!)[QlO'#IqO(#PQ`O,5<jO!)[QlO,5;fO(#XQMhO,5;fO($rQMhO,5;fO!)[QlO,5;xO!&zQMhO'#GnO(#XQMhO'#GnO!&zQMhO'#GpO(#XQMhO'#GpO1SQ`O'#DZO1SQ`O'#DZO!&zQMhO'#GQO(#XQMhO'#GQO!&zQMhO'#GSO(#XQMhO'#GSO!&zQMhO'#GbO(#XQMhO'#GbO!)[QlO,5:jO($yQpO'#D_O!)[QlO,5@pO'N|QlO1G0uO(%TQ?MtO'#CiO!)[QlO1G2QO!&zQMhO'#IvO(#XQMhO'#IvO!&zQMhO'#IxO(#XQMhO'#IxO(%_Q!dO'#CrO!&zQMhO,5<uO(#XQMhO,5<uO'N|QlO1G2SO!)[QlO7+&{O!&zQMhO1G2aO(#XQMhO1G2aO!&zQMhO'#IvO(#XQMhO'#IvO!&zQMhO'#IxO(#XQMhO'#IxO!&zQMhO1G2cO(#XQMhO1G2cO'N|QlO7+'nO'N|QlO7+&aO!&zQMhOANAjO(#XQMhOANAjO(%rQ`O'#EoO(%wQ`O'#EoO(&PQ`O'#F^O(&UQ`O'#EzO(&ZQ`O'#KUO(&fQ`O'#KSO(&qQ`O,5;ZO(&vQMjO,5<fO(&}Q`O'#GZO('SQ`O'#GZO('XQ`O,5<fO('aQ`O,5<hO('iQ`O,5;ZO('qQ?MtO1G1aO('xQ`O,5<uO('}Q`O,5<uO((SQ`O,5<wO((XQ`O,5<wO((^Q`O1G2SO((cQ`O1G0uO((hQMjO<<LOO((oQMjO<<LOO((vQMhO'#F}O9`Q`O'#F|OAuQ`O'#EnO!)[QlO,5;uO!3oQ`O'#GZO!3oQ`O'#GZO!3oQ`O'#G]O!3oQ`O'#G]O!,TQMhO7+(dO!,TQMhO7+(dO%/YQ!dO1G2xO%/YQ!dO1G2xO!&zQMhO,5=^O!&zQMhO,5=^",
	stateData: "(){~O'}OS(OOSTOS(PRQ~OPYOQYOSfOY!VOaqOdzOeyOl!POpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!uwO!xxO!|]O$X|O$oiO%i}O%k!QO%m!OO%n!OO%o!OO%r!RO%t!SO%w!TO%x!TO%z!UO&X!WO&_!XO&a!YO&c!ZO&e![O&h!]O&n!^O&t!_O&v!`O&x!aO&z!bO&|!cO(USO(WTO(ZUO(bVO(p[O~OWtO~P`OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$X!kO$oiO(U!dO(WTO(ZUO(bVO(p[O~Oa!wOs!nO!S!oO!b!yO!c!vO!d!vO!|<XO#T!pO#U!pO#V!xO#W!pO#X!pO#[!zO#]!zO(V!lO(WTO(ZUO(f!mO(p!sO~O(P!{O~OP]XR]X[]Xa]Xj]Xr]X!Q]X!S]X!]]X!l]X!p]X#R]X#S]X#`]X#lfX#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#w]X#y]X#{]X#|]X$R]X'{]X(b]X(s]X(z]X({]X~O!g%SX~P(qO_!}O(W#PO(X!}O(Y#PO~O_#QO(Y#PO(Z#PO([#QO~Ox#SO!U#TO(c#TO(d#VO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$X!kO$oiO(U<]O(WTO(ZUO(bVO(p[O~O![#ZO!]#WO!Y(iP!Y(wP~P+}O!^#cO~P`OPYOQYOSfOd!jOe!iOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$X!kO$oiO(WTO(ZUO(bVO(p[O~Op#mO![#iO!|]O#j#lO#k#iO(U<^O!k(tP~P.iO!l#oO(U#nO~O!x#sO!|]O%i#tO~O#l#uO~O!g#vO#l#uO~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!]$_O!l#xO!p$[O#R$RO#o$OO#p$PO#q$PO#r$PO#s$QO#t$RO#u$RO#v$bO#w$SO#y$UO#{$WO#|$XO(bVO(s$YO(z#|O({#}O~Oa(gX'{(gX'x(gX!k(gX!Y(gX!_(gX%j(gX!g(gX~P1qO#S$dO#`$eO$R$eOP(hXR(hX[(hXj(hXr(hX!Q(hX!S(hX!](hX!l(hX!p(hX#R(hX#o(hX#p(hX#q(hX#r(hX#s(hX#t(hX#u(hX#v(hX#w(hX#y(hX#{(hX#|(hX(b(hX(s(hX(z(hX({(hX!_(hX%j(hX~Oa(hX'{(hX'x(hX!Y(hX!k(hXv(hX!g(hX~P4UO#`$eO~O$^$hO$`$gO$g$mO~OSfO!_$nO$j$oO$l$qO~Oh%VOj%dOk%dOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#k%cO$X%`O$u%^O$w%_O$z%aO(U$sO(WTO(ZUO(b$uO(z$}O({%POg(_P~Ol%[O~P7eO!l%eO~O!S%hO!_%iO(U%gO~O!g%mO~Oa%nO'{%nO~O!Q%rO~P%[O(V!lO~P%[O%o%vO~P%[Oh%VO!l%eO(U%gO(V!lO~Oe%}O!l%eO(U%gO~Oj$RO~O!_&PO(U%gO(V!lO(WTO(ZUO`)XP~O!Q&SO!l&RO%k&VO&U&WO~P;SO!x#sO~O%t&YO!S)TX!_)TX(U)TX~O(U&ZO~Ol!PO!u&`O%k!QO%m!OO%n!OO%o!OO%r!RO%t!SO%w!TO%x!TO~Od&eOe&dO!x&bO%i&cO%|&aO~P<bOd&hOeyOl!PO!_&gO!u&`O!xxO!|]O%i}O%m!OO%n!OO%o!OO%r!RO%t!SO%w!TO%x!TO%z!UO~Ob&kO#`&nO%k&iO(V!lO~P=gO!l&oO!u&sO~O!l#oO~O!_XO~Oa%nO'y&{O'{%nO~Oa%nO'y'OO'{%nO~Oa%nO'y'QO'{%nO~O'x]X!Y]Xv]X!k]X&]]X!_]X%j]X!g]X~P(qO!b'`O!c'WO!d'WO(V!lO(WTO(ZUO~Os'UO!S'TO!['XO(f'SO!^(jP!^(yP~P@nOn'cO!_'aO(U%gO~Oe'hO!l%eO(U%gO~O!Q&SO!l&RO~Os!nO!S!oO!|<XO#T!pO#U!pO#W!pO#X!pO(V!lO(WTO(ZUO(f!mO(p!sO~O!b'nO!c'mO!d'mO#V!pO#['oO#]'oO~PBYOa%nOh%VO!g#vO!l%eO'{%nO(s'qO~O!p'uO#`'sO~PChOs!nO!S!oO(WTO(ZUO(f!mO(p!sO~O!_XOs(nX!S(nX!b(nX!c(nX!d(nX!|(nX#T(nX#U(nX#V(nX#W(nX#X(nX#[(nX#](nX(V(nX(W(nX(Z(nX(f(nX(p(nX~O!c'mO!d'mO(V!lO~PDWO(Q'yO(R'yO(S'{O~O_!}O(W'}O(X!}O(Y'}O~O_#QO(Y'}O(Z'}O([#QO~Ov(PO~P%[Ox#SO!U#TO(c#TO(d(SO~O![(UO!Y'XX!Y'_X!]'XX!]'_X~P+}O!](WO!Y(iX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!](WO!l#xO!p$[O#R$RO#o$OO#p$PO#q$PO#r$PO#s$QO#t$RO#u$RO#v$bO#w$SO#y$UO#{$WO#|$XO(bVO(s$YO(z#|O({#}O~O!Y(iX~PHRO!Y(]O~O!Y(vX!](vX!g(vX!k(vX(s(vX~O#`(vX#l#dX!^(vX~PJUO#`(^O!Y(xX!](xX~O!](_O!Y(wX~O!Y(bO~O#`$eO~PJUO!^(cO~P`OR#zO!Q#yO!S#{O!l#xO(bVOP!na[!naj!nar!na!]!na!p!na#R!na#o!na#p!na#q!na#r!na#s!na#t!na#u!na#v!na#w!na#y!na#{!na#|!na(s!na(z!na({!na~Oa!na'{!na'x!na!Y!na!k!nav!na!_!na%j!na!g!na~PKlO!k(dO~O!g#vO#`(eO(s'qO!](uXa(uX'{(uX~O!k(uX~PNXO!S%hO!_%iO!|]O#j(jO#k(iO(U%gO~O!](kO!k(tX~O!k(mO~O!S%hO!_%iO#k(iO(U%gO~OP(hXR(hX[(hXj(hXr(hX!Q(hX!S(hX!](hX!l(hX!p(hX#R(hX#o(hX#p(hX#q(hX#r(hX#s(hX#t(hX#u(hX#v(hX#w(hX#y(hX#{(hX#|(hX(b(hX(s(hX(z(hX({(hX~O!g#vO!k(hX~P! uOR(oO!Q(nO!l#xO#S$dO!|!{a!S!{a~O!x!{a%i!{a!_!{a#j!{a#k!{a(U!{a~P!#vO!x(sO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_XO!iuO!lZO!oYO!pYO!qYO!svO!u!gO!x!hO$X!kO$oiO(U!dO(WTO(ZUO(bVO(p[O~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<uO!S${O!_$|O!i>WO!l$xO#k<{O$X%`O$u<wO$w<yO$z%aO(U(wO(WTO(ZUO(b$uO(z$}O({%PO~O#l(yO~O![({O!k(lP~P%[O(f(}O(p[O~O!S)PO!l#xO(f(}O(p[O~OP<WOQ<WOSfOd>SOe!iOpkOr<WOskOtkOzkO|<WO!O<WO!SWO!WkO!XkO!_!eO!i<ZO!lZO!o<WO!p<WO!q<WO!s<[O!u<_O!x!hO$X!kO$o>QO(U)^O(WTO(ZUO(bVO(p[O~O!]$_Oa$ra'{$ra'x$ra!k$ra!Y$ra!_$ra%j$ra!g$ra~Ol)eO~P!&zOh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O%]O!S${O!_$|O!i%bO!l$xO#k%cO$X%`O$u%^O$w%_O$z%aO(U(wO(WTO(ZUO(b$uO(z$}O({%PO~Og(qP~P!,TO!Q)jO!g)iO!_$_X$[$_X$^$_X$`$_X$g$_X~O!g)iO!_(|X$[(|X$^(|X$`(|X$g(|X~O!Q)jO~P!.^O!Q)jO!_(|X$[(|X$^(|X$`(|X$g(|X~O!_)lO$[)pO$^)kO$`)kO$g)qO~O![)tO~P!)[O$^$hO$`$gO$g)xO~On${X!Q${X#S${X'z${X(z${X({${X~OgmXg${XnmX!]mX#`mX~P!0SOx)zO(c){O(d)}O~On*WO!Q*PO'z*QO(z$}O({%PO~Og*OO~P!1WOg*XO~Oh%VOr%XOs$tOt$tOz%YO|%ZO!O<uO!S*ZO!_*[O!i>WO!l$xO#k<{O$X%`O$u<wO$w<yO$z%aO(WTO(ZUO(b$uO(z$}O({%PO~Op*aO![*_O(U*YO!k)PP~P!1uO#l*bO~O!l*cO~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<uO!S${O!_$|O!i>WO!l$xO#k<{O$X%`O$u<wO$w<yO$z%aO(U*eO(WTO(ZUO(b$uO(z$}O({%PO~O![*hO!Y)QP~P!3tOr*tOs!nO!S*jO!b*rO!c*lO!d*lO!l*cO#[*sO%a*nO(V!lO(WTO(ZUO(f!mO~O!^*qO~P!5iO#S$dOn(aX!Q(aX'z(aX(z(aX({(aX!](aX#`(aX~Og(aX$P(aX~P!6kOn*yO#`*xOg(`X!](`X~O!]*zOg(_X~Oj%dOk%dOl%dO(U&ZOg(_P~Os*}O~Og*OO(U&ZO~O!l+TO~O(U(wO~Op+XO!S%hO![#iO!_%iO!|]O#j#lO#k#iO(U%gO!k(tP~O!g#vO#l+YO~O!S%hO![+[O!](_O!_%iO(U%gO!Y(wP~Os']O!S+_O![+^O(WTO(ZUO(f+]O~O!^(yP~P!9|O!]+`Oa)UX'{)UX~OP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#o$OO#p$PO#q$PO#r$PO#s$QO#t$RO#u$RO#v$bO#w$SO#y$UO#{$WO#|$XO(bVO(s$YO(z#|O({#}O~Oa!ja!]!ja'{!ja'x!ja!Y!ja!k!jav!ja!_!ja%j!ja!g!ja~P!:tO(f(}O~OR#zO!Q#yO!S#{O!l#xO(bVOP!ra[!raj!rar!ra!]!ra!p!ra#R!ra#o!ra#p!ra#q!ra#r!ra#s!ra#t!ra#u!ra#v!ra#w!ra#y!ra#{!ra#|!ra(s!ra(z!ra({!ra~Oa!ra'{!ra'x!ra!Y!ra!k!rav!ra!_!ra%j!ra!g!ra~P!=aOR#zO!Q#yO!S#{O!l#xO(bVOP!ta[!taj!tar!ta!]!ta!p!ta#R!ta#o!ta#p!ta#q!ta#r!ta#s!ta#t!ta#u!ta#v!ta#w!ta#y!ta#{!ta#|!ta(s!ta(z!ta({!ta~Oa!ta'{!ta'x!ta!Y!ta!k!tav!ta!_!ta%j!ta!g!ta~P!?wOh%VOn+iO!_'aO%j+hO~O!g+kOa(^X!_(^X'{(^X!](^X~Oa%nO!_XO'{%nO~Oh%VO!l%eO~Oh%VO!l%eO(U%gO~O!g#vO#l(yO~Ob+vO%k+wO(U+sO(WTO(ZUO!^)YP~O!]+xO`)XX~O[+|O~O`+}O~O!_&PO(U%gO(V!lO`)XP~O%k,QO~P;SOh%VO#`,UO~Oh%VOn,XO!_$|O~O!_,ZO~O!Q,]O!_XO~O%o%vO~O!x,bO~Oe,gO~Ob,hO(U#nO(WTO(ZUO!^)WP~Oe%}O~O%k!QO(U&ZO~P=gO[,mO`,lO~OPYOQYOSfOdzOeyOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!iuO!lZO!oYO!pYO!qYO!svO!xxO!|]O$oiO%i}O(WTO(ZUO(bVO(p[O~O!_!eO!u!gO$X!kO(U!dO~P!GOO`,lOa%nO'{%nO~OPYOQYOSfOd!jOe!iOpkOrYOskOtkOzkO|YO!OYO!SWO!WkO!XkO!_!eO!iuO!lZO!oYO!pYO!qYO!svO!x!hO$X!kO$oiO(U!dO(WTO(ZUO(bVO(p[O~Oa,rOl!OO!uwO%m!OO%n!OO%o!OO~P!IhO!l&oO~O&_,xO~O!_,zO~O&p,|O&r,}OP&maQ&maS&maY&maa&mad&mae&mal&map&mar&mas&mat&maz&ma|&ma!O&ma!S&ma!W&ma!X&ma!_&ma!i&ma!l&ma!o&ma!p&ma!q&ma!s&ma!u&ma!x&ma!|&ma$X&ma$o&ma%i&ma%k&ma%m&ma%n&ma%o&ma%r&ma%t&ma%w&ma%x&ma%z&ma&X&ma&_&ma&a&ma&c&ma&e&ma&h&ma&n&ma&t&ma&v&ma&x&ma&z&ma&|&ma'x&ma(U&ma(W&ma(Z&ma(b&ma(p&ma!^&ma&f&mab&ma&k&ma~O(U-SO~Oh!eX!]#iX!^#iX!g!RX!g!eX!l!eX#`#iX~O!]!eX!^!eX~P#!nO!g-WOh(kX!](kX!^(kX!g(kX!l(kXr(kX(s(kX~Oh%VO!g-YO!l%eO!]!aX!^!aX~Os!nO!S!oO(WTO(ZUO(f!mO~OP<WOQ<WOSfOd>SOe!iOpkOr<WOskOtkOzkO|<WO!O<WO!SWO!WkO!XkO!_!eO!i<ZO!lZO!o<WO!p<WO!q<WO!s<[O!u<_O!x!hO$X!kO$o>QO(WTO(ZUO(bVO(p[O~O(U=RO~P#$oO!]-^O!^(jX~O!^-`O~O#`-aO!]#hX!^#hX~O!g-WO~O!]-bO!^(yX~O!^-dO~O!c-eO!d-eO(V!lO~P#$^O!^-hO~P'_On-kO!_'aO~O!Y-pO~Os!{a!b!{a!c!{a!d!{a#T!{a#U!{a#V!{a#W!{a#X!{a#[!{a#]!{a(V!{a(W!{a(Z!{a(f!{a(p!{a~P!#vO!p-uO#`-sO~PChO!c-wO!d-wO(V!lO~PDWOa%nO#`-sO'{%nO~Oa%nO!g#vO#`-sO'{%nO~Oa%nO!g#vO!p-uO#`-sO'{%nO(s'qO~O(Q'yO(R'yO(S-|O~Ov-}O~O!Y'Xa!]'Xa~P!:tO![.RO!Y'XX!]'XX~P%[O!](WO!Y(ia~O!Y(ia~PHRO!](_O!Y(wa~O!S%hO![.VO!_%iO(U%gO!Y'_X!]'_X~O#`.XO!](ua!k(uaa(ua'{(ua~O!g#vO~P#,wO!](kO!k(ta~O!S%hO!_%iO#k.]O(U%gO~Op.bO!S%hO![._O!_%iO!|]O#j.aO#k._O(U%gO!]'bX!k'bX~OR.fO!l#xO~Oh%VOn.iO!_'aO%j.hO~Oa#ci!]#ci'{#ci'x#ci!Y#ci!k#civ#ci!_#ci%j#ci!g#ci~P!:tOn>^O!Q*PO'z*QO(z$}O({%PO~O#l#_aa#_a#`#_a'{#_a!]#_a!k#_a!_#_a!Y#_a~P#/sO#l(aXP(aXR(aX[(aXa(aXj(aXr(aX!S(aX!l(aX!p(aX#R(aX#o(aX#p(aX#q(aX#r(aX#s(aX#t(aX#u(aX#v(aX#w(aX#y(aX#{(aX#|(aX'{(aX(b(aX(s(aX!k(aX!Y(aX'x(aXv(aX!_(aX%j(aX!g(aX~P!6kO!].vO!k(lX~P!:tO!k.yO~O!Y.{O~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(bVO[#nia#nij#nir#ni!]#ni#R#ni#p#ni#q#ni#r#ni#s#ni#t#ni#u#ni#v#ni#w#ni#y#ni#{#ni#|#ni'{#ni(s#ni(z#ni({#ni'x#ni!Y#ni!k#niv#ni!_#ni%j#ni!g#ni~O#o#ni~P#3cO#o$OO~P#3cOP$[OR#zOr$aO!Q#yO!S#{O!l#xO!p$[O#o$OO#p$PO#q$PO#r$PO(bVO[#nia#nij#ni!]#ni#R#ni#t#ni#u#ni#v#ni#w#ni#y#ni#{#ni#|#ni'{#ni(s#ni(z#ni({#ni'x#ni!Y#ni!k#niv#ni!_#ni%j#ni!g#ni~O#s#ni~P#6QO#s$QO~P#6QOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#o$OO#p$PO#q$PO#r$PO#s$QO#t$RO#u$RO#v$bO(bVOa#ni!]#ni#y#ni#{#ni#|#ni'{#ni(s#ni(z#ni({#ni'x#ni!Y#ni!k#niv#ni!_#ni%j#ni!g#ni~O#w#ni~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#o$OO#p$PO#q$PO#r$PO#s$QO#t$RO#u$RO#v$bO#w$SO(bVO({#}Oa#ni!]#ni#{#ni#|#ni'{#ni(s#ni(z#ni'x#ni!Y#ni!k#niv#ni!_#ni%j#ni!g#ni~O#y$UO~P#;VO#y#ni~P#;VO#w$SO~P#8oOP$[OR#zO[$cOj$ROr$aO!Q#yO!S#{O!l#xO!p$[O#R$RO#o$OO#p$PO#q$PO#r$PO#s$QO#t$RO#u$RO#v$bO#w$SO#y$UO(bVO(z#|O({#}Oa#ni!]#ni#|#ni'{#ni(s#ni'x#ni!Y#ni!k#niv#ni!_#ni%j#ni!g#ni~O#{#ni~P#={O#{$WO~P#={OP]XR]X[]Xj]Xr]X!Q]X!S]X!l]X!p]X#R]X#S]X#`]X#lfX#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#w]X#y]X#{]X#|]X$R]X(b]X(s]X(z]X({]X!]]X!^]X~O$P]X~P#@jOP$[OR#zO[<oOj<dOr<mO!Q#yO!S#{O!l#xO!p$[O#R<dO#o<aO#p<bO#q<bO#r<bO#s<cO#t<dO#u<dO#v<nO#w<eO#y<gO#{<iO#|<jO(bVO(s$YO(z#|O({#}O~O$P.}O~P#BwO#S$dO#`<pO$R<pO$P(hX!^(hX~P! uOa'ea!]'ea'{'ea'x'ea!k'ea!Y'eav'ea!_'ea%j'ea!g'ea~P!:tO[#nia#nij#nir#ni!]#ni#R#ni#s#ni#t#ni#u#ni#v#ni#w#ni#y#ni#{#ni#|#ni'{#ni(s#ni'x#ni!Y#ni!k#niv#ni!_#ni%j#ni!g#ni~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#o$OO#p$PO#q$PO#r$PO(bVO(z#ni({#ni~P#EyOn>^O!Q*PO'z*QO(z$}O({%POP#niR#ni!S#ni!l#ni!p#ni#o#ni#p#ni#q#ni#r#ni(b#ni~P#EyO!]/ROg(qX~P!1WOg/TO~Oa$Qi!]$Qi'{$Qi'x$Qi!Y$Qi!k$Qiv$Qi!_$Qi%j$Qi!g$Qi~P!:tO$^/UO$`/UO~O$^/VO$`/VO~O!g)iO#`/WO!_$dX$[$dX$^$dX$`$dX$g$dX~O![/XO~O!_)lO$[/ZO$^)kO$`)kO$g/[O~O!]<kO!^(gX~P#BwO!^/]O~O!g)iO$g(|X~O$g/_O~Ov/`O~P!&zOx)zO(c){O(d/cO~O!S/fO~O(z$}On%ba!Q%ba'z%ba({%ba!]%ba#`%ba~Og%ba$P%ba~P#L{O({%POn%da!Q%da'z%da(z%da!]%da#`%da~Og%da$P%da~P#MnO!]fX!gfX!kfX!k${X(sfX~P!0SOp%WO![/oO!](_O(U/nO!Y(wP!Y)QP~P!1uOr*tO!b*rO!c*lO!d*lO!l*cO#[*sO%a*nO(V!lO(WTO(ZUO~Os'UO!S/pO![+^O!^*qO(f=OO!^(yP~P$ [O!k/qO~P#/sO!]/rO!g#vO(s'qO!k)PX~O!k/wO~OnoX!QoX'zoX(zoX({oX~O!g#vO!koX~P$#OOp/yO!S%hO![*_O!_%iO(U%gO!k)PP~O#l/zO~O!Y${X!]${X!g%SX~P!0SO!]/{O!Y)QX~P#/sO!g/}O~O!Y0PO~OpkO(U0QO~P.iOh%VOr0VO!g#vO!l%eO(s'qO~O!g+kO~Oa%nO!]0ZO'{%nO~O!^0]O~P!5iO!c0^O!d0^O(V!lO~P#$^Os!nO!S0_O(WTO(ZUO(f!mO~O#[0aO~Og%ba!]%ba#`%ba$P%ba~P!1WOg%da!]%da#`%da$P%da~P!1WOj%dOk%dOl%dO(U&ZOg'nX!]'nX~O!]*zOg(_a~Og0jO~On0lO#`0kOg(`a!](`a~OR0mO!Q0mO!S0nO#S$dOn}a'z}a(z}a({}a!]}a#`}a~Og}a$P}a~P$(cO!Q*PO'z*QOn$ta(z$ta({$ta!]$ta#`$ta~Og$ta$P$ta~P$)_O!Q*PO'z*QOn$va(z$va({$va!]$va#`$va~Og$va$P$va~P$*QO#l0qO~Og%Ua!]%Ua#`%Ua$P%Ua~P!1WO!g#vO~O#l0tO~O!]#iX!^#iX!g!RX#`#iX~O!]+`Oa)Ua'{)Ua~OR#zO!Q#yO!S#{O!l#xO(bVOP!ri[!rij!rir!ri!]!ri!p!ri#R!ri#o!ri#p!ri#q!ri#r!ri#s!ri#t!ri#u!ri#v!ri#w!ri#y!ri#{!ri#|!ri(s!ri(z!ri({!ri~Oa!ri'{!ri'x!ri!Y!ri!k!riv!ri!_!ri%j!ri!g!ri~P$+}Oh%VOr%XOs$tOt$tOz%YO|%ZO!O<uO!S${O!_$|O!i>WO!l$xO#k<{O$X%`O$u<wO$w<yO$z%aO(WTO(ZUO(b$uO(z$}O({%PO~Op0}O%^1OO(U0|O~P$.eO!g+kOa(^a!_(^a'{(^a!](^a~O#l1UO~O[]X!]fX!^fX~O!]1VO!^)YX~O!^1XO~O[1YO~Ob1[O(U+sO(WTO(ZUO~O!_&PO(U%gO`'vX!]'vX~O!]+xO`)Xa~O!k1_O~P!:tO[1bO~O`1cO~O#`1hO~On1kO!_$|O~O(f(}O!^)VP~Oh%VOn1tO!_1qO%j1sO~O[2OO!]1|O!^)WX~O!^2PO~O`2ROa%nO'{%nO~O(U#nO(WTO(ZUO~O#S$dO#`$eO$R$eOP(hXR(hX[(hXr(hX!Q(hX!S(hX!](hX!l(hX!p(hX#R(hX#o(hX#p(hX#q(hX#r(hX#s(hX#t(hX#u(hX#v(hX#w(hX#y(hX#{(hX#|(hX(b(hX(s(hX(z(hX({(hX~Oj2UO&]2VOa(hX~P$4OOj2UO#`$eO&]2VO~Oa2XO~P%[Oa2ZO~O&f2^OP&diQ&diS&diY&dia&did&die&dil&dip&dir&dis&dit&diz&di|&di!O&di!S&di!W&di!X&di!_&di!i&di!l&di!o&di!p&di!q&di!s&di!u&di!x&di!|&di$X&di$o&di%i&di%k&di%m&di%n&di%o&di%r&di%t&di%w&di%x&di%z&di&X&di&_&di&a&di&c&di&e&di&h&di&n&di&t&di&v&di&x&di&z&di&|&di'x&di(U&di(W&di(Z&di(b&di(p&di!^&dib&di&k&di~Ob2dO!^2bO&k2cO~P`O!_XO!l2fO~O&r,}OP&miQ&miS&miY&mia&mid&mie&mil&mip&mir&mis&mit&miz&mi|&mi!O&mi!S&mi!W&mi!X&mi!_&mi!i&mi!l&mi!o&mi!p&mi!q&mi!s&mi!u&mi!x&mi!|&mi$X&mi$o&mi%i&mi%k&mi%m&mi%n&mi%o&mi%r&mi%t&mi%w&mi%x&mi%z&mi&X&mi&_&mi&a&mi&c&mi&e&mi&h&mi&n&mi&t&mi&v&mi&x&mi&z&mi&|&mi'x&mi(U&mi(W&mi(Z&mi(b&mi(p&mi!^&mi&f&mib&mi&k&mi~O!Y2lO~O!]!aa!^!aa~P#BwOs!nO!S!oO![2qO(f!mO!]'YX!^'YX~P@nO!]-^O!^(ja~O!]'`X!^'`X~P!9|O!]-bO!^(ya~O!^2yO~P'_Oa%nO#`3SO'{%nO~Oa%nO!g#vO#`3SO'{%nO~Oa%nO!g#vO!p3WO#`3SO'{%nO(s'qO~Oa%nO'{%nO~P!:tO!]$_Ov$ra~O!Y'Xi!]'Xi~P!:tO!](WO!Y(ii~O!](_O!Y(wi~O!Y(xi!](xi~P!:tO!](ui!k(uia(ui'{(ui~P!:tO#`3YO!](ui!k(uia(ui'{(ui~O!](kO!k(ti~O!S%hO!_%iO!|]O#j3_O#k3^O(U%gO~O!S%hO!_%iO#k3^O(U%gO~On3fO!_'aO%j3eO~Oh%VOn3fO!_'aO%j3eO~O#l%baP%baR%ba[%baa%baj%bar%ba!S%ba!l%ba!p%ba#R%ba#o%ba#p%ba#q%ba#r%ba#s%ba#t%ba#u%ba#v%ba#w%ba#y%ba#{%ba#|%ba'{%ba(b%ba(s%ba!k%ba!Y%ba'x%bav%ba!_%ba%j%ba!g%ba~P#L{O#l%daP%daR%da[%daa%daj%dar%da!S%da!l%da!p%da#R%da#o%da#p%da#q%da#r%da#s%da#t%da#u%da#v%da#w%da#y%da#{%da#|%da'{%da(b%da(s%da!k%da!Y%da'x%dav%da!_%da%j%da!g%da~P#MnO#l%baP%baR%ba[%baa%baj%bar%ba!S%ba!]%ba!l%ba!p%ba#R%ba#o%ba#p%ba#q%ba#r%ba#s%ba#t%ba#u%ba#v%ba#w%ba#y%ba#{%ba#|%ba'{%ba(b%ba(s%ba!k%ba!Y%ba'x%ba#`%bav%ba!_%ba%j%ba!g%ba~P#/sO#l%daP%daR%da[%daa%daj%dar%da!S%da!]%da!l%da!p%da#R%da#o%da#p%da#q%da#r%da#s%da#t%da#u%da#v%da#w%da#y%da#{%da#|%da'{%da(b%da(s%da!k%da!Y%da'x%da#`%dav%da!_%da%j%da!g%da~P#/sO#l}aP}a[}aa}aj}ar}a!l}a!p}a#R}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#w}a#y}a#{}a#|}a'{}a(b}a(s}a!k}a!Y}a'x}av}a!_}a%j}a!g}a~P$(cO#l$taP$taR$ta[$taa$taj$tar$ta!S$ta!l$ta!p$ta#R$ta#o$ta#p$ta#q$ta#r$ta#s$ta#t$ta#u$ta#v$ta#w$ta#y$ta#{$ta#|$ta'{$ta(b$ta(s$ta!k$ta!Y$ta'x$tav$ta!_$ta%j$ta!g$ta~P$)_O#l$vaP$vaR$va[$vaa$vaj$var$va!S$va!l$va!p$va#R$va#o$va#p$va#q$va#r$va#s$va#t$va#u$va#v$va#w$va#y$va#{$va#|$va'{$va(b$va(s$va!k$va!Y$va'x$vav$va!_$va%j$va!g$va~P$*QO#l%UaP%UaR%Ua[%Uaa%Uaj%Uar%Ua!S%Ua!]%Ua!l%Ua!p%Ua#R%Ua#o%Ua#p%Ua#q%Ua#r%Ua#s%Ua#t%Ua#u%Ua#v%Ua#w%Ua#y%Ua#{%Ua#|%Ua'{%Ua(b%Ua(s%Ua!k%Ua!Y%Ua'x%Ua#`%Uav%Ua!_%Ua%j%Ua!g%Ua~P#/sOa#cq!]#cq'{#cq'x#cq!Y#cq!k#cqv#cq!_#cq%j#cq!g#cq~P!:tO![3nO!]'ZX!k'ZX~P%[O!].vO!k(la~O!].vO!k(la~P!:tO!Y3qO~O$P!na!^!na~PKlO$P!ja!]!ja!^!ja~P#BwO$P!ra!^!ra~P!=aO$P!ta!^!ta~P!?wOg'^X!]'^X~P!,TO!]/ROg(qa~OSfO!_4VO$e4WO~O!^4[O~Ov4]O~P#/sOa$nq!]$nq'{$nq'x$nq!Y$nq!k$nqv$nq!_$nq%j$nq!g$nq~P!:tO!Y4_O~P!&zO!S4`O~O!Q*PO'z*QO({%POn'ja(z'ja!]'ja#`'ja~Og'ja$P'ja~P%-tO!Q*PO'z*QOn'la(z'la({'la!]'la#`'la~Og'la$P'la~P%.gO(s$YO~P#/sO!YfX!Y${X!]fX!]${X!g%SX#`fX~P!0SOp%WO(U=XO~P!1uOp4dO!S%hO![4cO!_%iO(U%gO!]'fX!k'fX~O!]/rO!k)Pa~O!]/rO!g#vO!k)Pa~O!]/rO!g#vO(s'qO!k)Pa~Og$}i!]$}i#`$}i$P$}i~P!1WO![4lO!Y'hX!]'hX~P!3tO!]/{O!Y)Qa~O!]/{O!Y)Qa~P#/sOP]XR]X[]Xj]Xr]X!Q]X!S]X!Y]X!]]X!l]X!p]X#R]X#S]X#`]X#lfX#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#w]X#y]X#{]X#|]X$R]X(b]X(s]X(z]X({]X~Oj%ZX!g%ZX~P%2^Oj4qO!g#vO~Oh%VO!g#vO!l%eO~Oh%VOr4vO!l%eO(s'qO~Or4{O!g#vO(s'qO~Os!nO!S4|O(WTO(ZUO(f!mO~O(z$}On%bi!Q%bi'z%bi({%bi!]%bi#`%bi~Og%bi$P%bi~P%5}O({%POn%di!Q%di'z%di(z%di!]%di#`%di~Og%di$P%di~P%6pOg(`i!](`i~P!1WO#`5SOg(`i!](`i~P!1WO!k5XO~Oa$pq!]$pq'{$pq'x$pq!Y$pq!k$pqv$pq!_$pq%j$pq!g$pq~P!:tO!Y5]O~O!]5^O!_)RX~P#/sOa${X!_${X%_]X'{${X!]${X~P!0SO%_5aOaoX!_oX'{oX!]oX~P$#OOp5bO(U#nO~O%_5aO~Ob5hO%k5iO(U+sO(WTO(ZUO!]'uX!^'uX~O!]1VO!^)Ya~O[5mO~O`5nO~O[5rO~Oa%nO'{%nO~P#/sO!]5wO#`5yO!^)VX~O!^5zO~Or6QOs!nO!S*jO!b!yO!c!vO!d!vO!|<XO#T!pO#U!pO#V!pO#W!pO#X!pO#[6PO#]!zO(V!lO(WTO(ZUO(f!mO(p!sO~O!^6OO~P%;sOn6VO!_1qO%j6UO~Oh%VOn6VO!_1qO%j6UO~Ob6^O(U#nO(WTO(ZUO!]'tX!^'tX~O!]1|O!^)Wa~O(WTO(ZUO(f6`O~O`6dO~Oj6gO&]6hO~PNXO!k6iO~P%[Oa6kO~Oa6kO~P%[Ob2dO!^6pO&k2cO~P`O!g6rO~O!g6tOh(ki!](ki!^(ki!g(ki!l(kir(ki(s(ki~O#`6uO!]#hi!^#hi~O!]!ai!^!ai~P#BwO!]#hi!^#hi~P#BwOa%nO#`7OO'{%nO~Oa%nO!g#vO#`7OO'{%nO~O!](uq!k(uqa(uq'{(uq~P!:tO!](kO!k(tq~O!S%hO!_%iO#k7VO(U%gO~O!_'aO%j7YO~On7^O!_'aO%j7YO~O#l'jaP'jaR'ja['jaa'jaj'jar'ja!S'ja!l'ja!p'ja#R'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#w'ja#y'ja#{'ja#|'ja'{'ja(b'ja(s'ja!k'ja!Y'ja'x'jav'ja!_'ja%j'ja!g'ja~P%-tO#l'laP'laR'la['laa'laj'lar'la!S'la!l'la!p'la#R'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#w'la#y'la#{'la#|'la'{'la(b'la(s'la!k'la!Y'la'x'lav'la!_'la%j'la!g'la~P%.gO#l$}iP$}iR$}i[$}ia$}ij$}ir$}i!S$}i!]$}i!l$}i!p$}i#R$}i#o$}i#p$}i#q$}i#r$}i#s$}i#t$}i#u$}i#v$}i#w$}i#y$}i#{$}i#|$}i'{$}i(b$}i(s$}i!k$}i!Y$}i'x$}i#`$}iv$}i!_$}i%j$}i!g$}i~P#/sO#l%biP%biR%bi[%bia%bij%bir%bi!S%bi!l%bi!p%bi#R%bi#o%bi#p%bi#q%bi#r%bi#s%bi#t%bi#u%bi#v%bi#w%bi#y%bi#{%bi#|%bi'{%bi(b%bi(s%bi!k%bi!Y%bi'x%biv%bi!_%bi%j%bi!g%bi~P%5}O#l%diP%diR%di[%dia%dij%dir%di!S%di!l%di!p%di#R%di#o%di#p%di#q%di#r%di#s%di#t%di#u%di#v%di#w%di#y%di#{%di#|%di'{%di(b%di(s%di!k%di!Y%di'x%div%di!_%di%j%di!g%di~P%6pO!]'Za!k'Za~P!:tO!].vO!k(li~O$P#ci!]#ci!^#ci~P#BwOP$[OR#zO!Q#yO!S#{O!l#xO!p$[O(bVO[#nij#nir#ni#R#ni#p#ni#q#ni#r#ni#s#ni#t#ni#u#ni#v#ni#w#ni#y#ni#{#ni#|#ni$P#ni(s#ni(z#ni({#ni!]#ni!^#ni~O#o#ni~P%NrO#o<aO~P%NrOP$[OR#zOr<mO!Q#yO!S#{O!l#xO!p$[O#o<aO#p<bO#q<bO#r<bO(bVO[#nij#ni#R#ni#t#ni#u#ni#v#ni#w#ni#y#ni#{#ni#|#ni$P#ni(s#ni(z#ni({#ni!]#ni!^#ni~O#s#ni~P&!zO#s<cO~P&!zOP$[OR#zO[<oOj<dOr<mO!Q#yO!S#{O!l#xO!p$[O#R<dO#o<aO#p<bO#q<bO#r<bO#s<cO#t<dO#u<dO#v<nO(bVO#y#ni#{#ni#|#ni$P#ni(s#ni(z#ni({#ni!]#ni!^#ni~O#w#ni~P&%SOP$[OR#zO[<oOj<dOr<mO!Q#yO!S#{O!l#xO!p$[O#R<dO#o<aO#p<bO#q<bO#r<bO#s<cO#t<dO#u<dO#v<nO#w<eO(bVO({#}O#{#ni#|#ni$P#ni(s#ni(z#ni!]#ni!^#ni~O#y<gO~P&'TO#y#ni~P&'TO#w<eO~P&%SOP$[OR#zO[<oOj<dOr<mO!Q#yO!S#{O!l#xO!p$[O#R<dO#o<aO#p<bO#q<bO#r<bO#s<cO#t<dO#u<dO#v<nO#w<eO#y<gO(bVO(z#|O({#}O#|#ni$P#ni(s#ni!]#ni!^#ni~O#{#ni~P&)dO#{<iO~P&)dOa#}y!]#}y'{#}y'x#}y!Y#}y!k#}yv#}y!_#}y%j#}y!g#}y~P!:tO[#nij#nir#ni#R#ni#s#ni#t#ni#u#ni#v#ni#w#ni#y#ni#{#ni#|#ni$P#ni(s#ni!]#ni!^#ni~OP$[OR#zO!Q#yO!S#{O!l#xO!p$[O#o<aO#p<bO#q<bO#r<bO(bVO(z#ni({#ni~P&,`On>_O!Q*PO'z*QO(z$}O({%POP#niR#ni!S#ni!l#ni!p#ni#o#ni#p#ni#q#ni#r#ni(b#ni~P&,`O#S$dOP(aXR(aX[(aXj(aXn(aXr(aX!Q(aX!S(aX!l(aX!p(aX#R(aX#o(aX#p(aX#q(aX#r(aX#s(aX#t(aX#u(aX#v(aX#w(aX#y(aX#{(aX#|(aX$P(aX'z(aX(b(aX(s(aX(z(aX({(aX!](aX!^(aX~O$P$Qi!]$Qi!^$Qi~P#BwO$P!ri!^!ri~P$+}Og'^a!]'^a~P!1WO!^7pO~O!]'ea!^'ea~P#BwO!Y7qO~P#/sO!g#vO(s'qO!]'fa!k'fa~O!]/rO!k)Pi~O!]/rO!g#vO!k)Pi~Og$}q!]$}q#`$}q$P$}q~P!1WO!Y'ha!]'ha~P#/sO!g7xO~O!]/{O!Y)Qi~P#/sO!]/{O!Y)Qi~O!Y7{O~Oh%VOr8QO!l%eO(s'qO~Oj8SO!g#vO~Or8VO!g#vO(s'qO~O!Q*PO'z*QO({%POn'ka(z'ka!]'ka#`'ka~Og'ka$P'ka~P&5aO!Q*PO'z*QOn'ma(z'ma({'ma!]'ma#`'ma~Og'ma$P'ma~P&6SOg(`q!](`q~P!1WO#`8XOg(`q!](`q~P!1WO!Y8YO~Og%Pq!]%Pq#`%Pq$P%Pq~P!1WOa$py!]$py'{$py'x$py!Y$py!k$pyv$py!_$py%j$py!g$py~P!:tO!g6tO~O!]5^O!_)Ra~O!_'aOP$UaR$Ua[$Uaj$Uar$Ua!Q$Ua!S$Ua!]$Ua!l$Ua!p$Ua#R$Ua#o$Ua#p$Ua#q$Ua#r$Ua#s$Ua#t$Ua#u$Ua#v$Ua#w$Ua#y$Ua#{$Ua#|$Ua(b$Ua(s$Ua(z$Ua({$Ua~O%j7YO~P&8tO%_8^Oa%]i!_%]i'{%]i!]%]i~Oa#cy!]#cy'{#cy'x#cy!Y#cy!k#cyv#cy!_#cy%j#cy!g#cy~P!:tO[8`O~Ob8bO(U+sO(WTO(ZUO~O!]1VO!^)Yi~O`8fO~O(f(}O!]'qX!^'qX~O!]5wO!^)Va~O!^8pO~P%;sO(p!sO~P$&YO#[8qO~O!_1qO~O!_1qO%j8sO~On8vO!_1qO%j8sO~O[8{O!]'ta!^'ta~O!]1|O!^)Wi~O!k9PO~O!k9QO~O!k9TO~O!k9TO~P%[Oa9VO~O!g9WO~O!k9XO~O!](xi!^(xi~P#BwOa%nO#`9aO'{%nO~O!](uy!k(uya(uy'{(uy~P!:tO!](kO!k(ty~O%j9dO~P&8tO!_'aO%j9dO~O#l$}qP$}qR$}q[$}qa$}qj$}qr$}q!S$}q!]$}q!l$}q!p$}q#R$}q#o$}q#p$}q#q$}q#r$}q#s$}q#t$}q#u$}q#v$}q#w$}q#y$}q#{$}q#|$}q'{$}q(b$}q(s$}q!k$}q!Y$}q'x$}q#`$}qv$}q!_$}q%j$}q!g$}q~P#/sO#l'kaP'kaR'ka['kaa'kaj'kar'ka!S'ka!l'ka!p'ka#R'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#w'ka#y'ka#{'ka#|'ka'{'ka(b'ka(s'ka!k'ka!Y'ka'x'kav'ka!_'ka%j'ka!g'ka~P&5aO#l'maP'maR'ma['maa'maj'mar'ma!S'ma!l'ma!p'ma#R'ma#o'ma#p'ma#q'ma#r'ma#s'ma#t'ma#u'ma#v'ma#w'ma#y'ma#{'ma#|'ma'{'ma(b'ma(s'ma!k'ma!Y'ma'x'mav'ma!_'ma%j'ma!g'ma~P&6SO#l%PqP%PqR%Pq[%Pqa%Pqj%Pqr%Pq!S%Pq!]%Pq!l%Pq!p%Pq#R%Pq#o%Pq#p%Pq#q%Pq#r%Pq#s%Pq#t%Pq#u%Pq#v%Pq#w%Pq#y%Pq#{%Pq#|%Pq'{%Pq(b%Pq(s%Pq!k%Pq!Y%Pq'x%Pq#`%Pqv%Pq!_%Pq%j%Pq!g%Pq~P#/sO!]'Zi!k'Zi~P!:tO$P#cq!]#cq!^#cq~P#BwO(z$}OP%baR%ba[%baj%bar%ba!S%ba!l%ba!p%ba#R%ba#o%ba#p%ba#q%ba#r%ba#s%ba#t%ba#u%ba#v%ba#w%ba#y%ba#{%ba#|%ba$P%ba(b%ba(s%ba!]%ba!^%ba~On%ba!Q%ba'z%ba({%ba~P&JXO({%POP%daR%da[%daj%dar%da!S%da!l%da!p%da#R%da#o%da#p%da#q%da#r%da#s%da#t%da#u%da#v%da#w%da#y%da#{%da#|%da$P%da(b%da(s%da!]%da!^%da~On%da!Q%da'z%da(z%da~P&L`On>_O!Q*PO'z*QO({%PO~P&JXOn>_O!Q*PO'z*QO(z$}O~P&L`OR0mO!Q0mO!S0nO#S$dOP}a[}aj}an}ar}a!l}a!p}a#R}a#o}a#p}a#q}a#r}a#s}a#t}a#u}a#v}a#w}a#y}a#{}a#|}a$P}a'z}a(b}a(s}a(z}a({}a!]}a!^}a~O!Q*PO'z*QOP$taR$ta[$taj$tan$tar$ta!S$ta!l$ta!p$ta#R$ta#o$ta#p$ta#q$ta#r$ta#s$ta#t$ta#u$ta#v$ta#w$ta#y$ta#{$ta#|$ta$P$ta(b$ta(s$ta(z$ta({$ta!]$ta!^$ta~O!Q*PO'z*QOP$vaR$va[$vaj$van$var$va!S$va!l$va!p$va#R$va#o$va#p$va#q$va#r$va#s$va#t$va#u$va#v$va#w$va#y$va#{$va#|$va$P$va(b$va(s$va(z$va({$va!]$va!^$va~On>_O!Q*PO'z*QO(z$}O({%PO~OP%UaR%Ua[%Uaj%Uar%Ua!S%Ua!l%Ua!p%Ua#R%Ua#o%Ua#p%Ua#q%Ua#r%Ua#s%Ua#t%Ua#u%Ua#v%Ua#w%Ua#y%Ua#{%Ua#|%Ua$P%Ua(b%Ua(s%Ua!]%Ua!^%Ua~P''eO$P$nq!]$nq!^$nq~P#BwO$P$pq!]$pq!^$pq~P#BwO!^9qO~O$P9rO~P!1WO!g#vO!]'fi!k'fi~O!g#vO(s'qO!]'fi!k'fi~O!]/rO!k)Pq~O!Y'hi!]'hi~P#/sO!]/{O!Y)Qq~Or9yO!g#vO(s'qO~O[9{O!Y9zO~P#/sO!Y9zO~Oj:RO!g#vO~Og(`y!](`y~P!1WO!]'oa!_'oa~P#/sOa%]q!_%]q'{%]q!]%]q~P#/sO[:WO~O!]1VO!^)Yq~O`:[O~O#`:]O!]'qa!^'qa~O!]5wO!^)Vi~P#BwO!S:_O~O!_1qO%j:bO~O(WTO(ZUO(f:gO~O!]1|O!^)Wq~O!k:jO~O!k:kO~O!k:lO~O!k:lO~P%[O#`:oO!]#hy!^#hy~O!]#hy!^#hy~P#BwO%j:tO~P&8tO!_'aO%j:tO~O$P#}y!]#}y!^#}y~P#BwOP$}iR$}i[$}ij$}ir$}i!S$}i!l$}i!p$}i#R$}i#o$}i#p$}i#q$}i#r$}i#s$}i#t$}i#u$}i#v$}i#w$}i#y$}i#{$}i#|$}i$P$}i(b$}i(s$}i!]$}i!^$}i~P''eO!Q*PO'z*QO({%POP'jaR'ja['jaj'jan'jar'ja!S'ja!l'ja!p'ja#R'ja#o'ja#p'ja#q'ja#r'ja#s'ja#t'ja#u'ja#v'ja#w'ja#y'ja#{'ja#|'ja$P'ja(b'ja(s'ja(z'ja!]'ja!^'ja~O!Q*PO'z*QOP'laR'la['laj'lan'lar'la!S'la!l'la!p'la#R'la#o'la#p'la#q'la#r'la#s'la#t'la#u'la#v'la#w'la#y'la#{'la#|'la$P'la(b'la(s'la(z'la({'la!]'la!^'la~O(z$}OP%biR%bi[%bij%bin%bir%bi!Q%bi!S%bi!l%bi!p%bi#R%bi#o%bi#p%bi#q%bi#r%bi#s%bi#t%bi#u%bi#v%bi#w%bi#y%bi#{%bi#|%bi$P%bi'z%bi(b%bi(s%bi({%bi!]%bi!^%bi~O({%POP%diR%di[%dij%din%dir%di!Q%di!S%di!l%di!p%di#R%di#o%di#p%di#q%di#r%di#s%di#t%di#u%di#v%di#w%di#y%di#{%di#|%di$P%di'z%di(b%di(s%di(z%di!]%di!^%di~O$P$py!]$py!^$py~P#BwO$P#cy!]#cy!^#cy~P#BwO!g#vO!]'fq!k'fq~O!]/rO!k)Py~O!Y'hq!]'hq~P#/sOr;OO!g#vO(s'qO~O[;SO!Y;RO~P#/sO!Y;RO~Og(`!R!](`!R~P!1WOa%]y!_%]y'{%]y!]%]y~P#/sO!]1VO!^)Yy~O!]5wO!^)Vq~O(U;ZO~O!_1qO%j;^O~O!k;aO~O%j;fO~P&8tOP$}qR$}q[$}qj$}qr$}q!S$}q!l$}q!p$}q#R$}q#o$}q#p$}q#q$}q#r$}q#s$}q#t$}q#u$}q#v$}q#w$}q#y$}q#{$}q#|$}q$P$}q(b$}q(s$}q!]$}q!^$}q~P''eO!Q*PO'z*QO({%POP'kaR'ka['kaj'kan'kar'ka!S'ka!l'ka!p'ka#R'ka#o'ka#p'ka#q'ka#r'ka#s'ka#t'ka#u'ka#v'ka#w'ka#y'ka#{'ka#|'ka$P'ka(b'ka(s'ka(z'ka!]'ka!^'ka~O!Q*PO'z*QOP'maR'ma['maj'man'mar'ma!S'ma!l'ma!p'ma#R'ma#o'ma#p'ma#q'ma#r'ma#s'ma#t'ma#u'ma#v'ma#w'ma#y'ma#{'ma#|'ma$P'ma(b'ma(s'ma(z'ma({'ma!]'ma!^'ma~OP%PqR%Pq[%Pqj%Pqr%Pq!S%Pq!l%Pq!p%Pq#R%Pq#o%Pq#p%Pq#q%Pq#r%Pq#s%Pq#t%Pq#u%Pq#v%Pq#w%Pq#y%Pq#{%Pq#|%Pq$P%Pq(b%Pq(s%Pq!]%Pq!^%Pq~P''eOg%f!Z!]%f!Z#`%f!Z$P%f!Z~P!1WO!Y;jO~P#/sOr;kO!g#vO(s'qO~O[;mO!Y;jO~P#/sO!]'qq!^'qq~P#BwO!]#h!Z!^#h!Z~P#BwO#l%f!ZP%f!ZR%f!Z[%f!Za%f!Zj%f!Zr%f!Z!S%f!Z!]%f!Z!l%f!Z!p%f!Z#R%f!Z#o%f!Z#p%f!Z#q%f!Z#r%f!Z#s%f!Z#t%f!Z#u%f!Z#v%f!Z#w%f!Z#y%f!Z#{%f!Z#|%f!Z'{%f!Z(b%f!Z(s%f!Z!k%f!Z!Y%f!Z'x%f!Z#`%f!Zv%f!Z!_%f!Z%j%f!Z!g%f!Z~P#/sOr;vO!g#vO(s'qO~O!Y;wO~P#/sOr<OO!g#vO(s'qO~O!Y<PO~P#/sOP%f!ZR%f!Z[%f!Zj%f!Zr%f!Z!S%f!Z!l%f!Z!p%f!Z#R%f!Z#o%f!Z#p%f!Z#q%f!Z#r%f!Z#s%f!Z#t%f!Z#u%f!Z#v%f!Z#w%f!Z#y%f!Z#{%f!Z#|%f!Z$P%f!Z(b%f!Z(s%f!Z!]%f!Z!^%f!Z~P''eOr<SO!g#vO(s'qO~Ov(gX~P1qO!Q%rO~P!)[O(V!lO~P!)[O!YfX!]fX#`fX~P%2^OP]XR]X[]Xj]Xr]X!Q]X!S]X!]]X!]fX!l]X!p]X#R]X#S]X#`]X#`fX#lfX#o]X#p]X#q]X#r]X#s]X#t]X#u]X#v]X#w]X#y]X#{]X#|]X$R]X(b]X(s]X(z]X({]X~O!gfX!k]X!kfX(sfX~P'LcOP<WOQ<WOSfOd>SOe!iOpkOr<WOskOtkOzkO|<WO!O<WO!SWO!WkO!XkO!_XO!i<ZO!lZO!o<WO!p<WO!q<WO!s<[O!u<_O!x!hO$X!kO$o>QO(U)^O(WTO(ZUO(bVO(p[O~O!]<kO!^$ra~Oh%VOp%WOr%XOs$tOt$tOz%YO|%ZO!O<vO!S${O!_$|O!i>XO!l$xO#k<|O$X%`O$u<xO$w<zO$z%aO(U(wO(WTO(ZUO(b$uO(z$}O({%PO~Ol)eO~P(#XOr!eX(s!eX~P#!nO!^]X!^fX~P'LcO!YfX!Y${X!]fX!]${X#`fX~P!0SO#l<`O~O!g#vO#l<`O~O#`<pO~Oj<dO~O#`=PO!](xX!^(xX~O#`<pO!](vX!^(vX~O#l=QO~Og=SO~P!1WO#l=YO~O#l=ZO~Og=SO(U&ZO~O!g#vO#l=[O~O!g#vO#l=QO~O$P=]O~P#BwO#l=^O~O#l=_O~O#l=dO~O#l=eO~O#l=fO~O#l=gO~O$P=hO~P!1WO$P=iO~P!1WOl=tO~P7eOk#S#T#U#W#X#[#j#k#v$o$u$w$z%^%_%i%j%k%r%t%w%x%z%|~(PT#p!X'}(V#qs#o#rr!Q(O$^(U$`(f~",
	goto: "$9_)^PPPPPP)_PP)bP)sP+X/^PPPP6lPP7SPP=PPPP@sPA]PA]PPPA]PCePA]PA]PA]PCiPCnPD]PIVPPPIZPPPPIZL^PPPLdMUPIZPIZPP! dIZPPPIZPIZP!#kIZP!'R!(W!(aP!)T!)X!)T!,fPPPPPPP!-V!(WPP!-g!/XP!2hIZIZ!2m!5y!:g!:g!>f!>nPPP!>tIZPPPPPPPPP!BTP!CbPPIZ!DsPIZPIZIZIZIZIZPIZ!FVP!IaP!LgP!Lk!Lu!Ly!LyP!I^P!L}!L}P#!TP#!XIZPIZ#!_#%dCiA]PA]PA]A]P#&qA]A]#)TA]#+{A]#.XA]A]#.w#1]#1]#1b#1k#1]#1vPP#1]PA]#2`A]#6_A]A]6lPPP#:dPPP#:}#:}P#:}P#;e#:}PP#;kP#;bP#;b#<O#;b#<j#<p#<s)bP#<v)bP#=P#=P#=PP)bP)bP)bP)bPP)bP#=V#=YP#=Y)bP#=^P#=aP)bP)bP)bP)bP)bP)b)bPP#=g#=m#=x#>O#>U#>[#>b#>p#>v#?Q#?W#?b#?h#?x#@O#@p#AS#AY#A`#An#BT#Cx#DW#D_#Ey#FX#Gy#HX#H_#He#Hk#Hu#H{#IR#I]#Io#IuPPPPPPPPPPP#I{PPPPPPP#Jp#M}$ g$ n$ vPPP$'bP$'k$*d$0}$1Q$1T$2S$2V$2^$2fP$2l$2oP$3]$3a$4X$5g$5l$6SPP$6X$6_$6c$6f$6j$6n$7j$8R$8j$8n$8q$8t$9O$9R$9V$9ZR!|RoqOXst!Z#d%m&r&t&u&w,u,z2^2aY!vQ'a-g1q5}Q%tvQ%|yQ&T|Q&j!VS'W!e-^Q'g!iS'm!r!yU*l$|*[*pQ+q%}S,O&V&WQ,f&dQ-e'`Q-o'hQ-w'nQ0^*rQ1d,QQ1{,gR<}<[%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'c's(U(W(^(e(y({)P*O*j+Y+_,r,u,z-k-s.R.X.v.}/p0_0n0t1U1t2U2V2X2Z2^2a2c3S3Y3n4|6V6g6h6k7O8v9V9aS#q]<X!r)`$Z$n'X)t-Y-a/X2q4V5y6u:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TU+Q%]<u<vQ+v&PQ,h&gQ,o&oQ0z+iQ1P+kQ1[+wQ2T,mQ3b.iQ5b1OQ5h1VQ6^1|Q7[3fQ8b5iR9g7^'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'c's(U(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>T!S!nQ!r!v!y!z$|'W'`'a'm'n'o*l*p*r*s-^-e-g-w0^0a1q5}6P%[$ti#v$b$c$d$x${%O%Q%^%_%c)z*S*U*W*Z*b*h*x*y+h+k,U,X.h/R/f/o/z/{/}0b0d0k0l0q1h1k1s3e4`4a4l4q5S5^5a6U7Y7x8S8X8^8s9d9r9{:R:b:t;S;^;f;m<n<o<q<r<s<t<w<x<y<z<{<|=T=U=V=W=Y=Z=^=_=`=a=b=c=d=e=h=i>Q>Y>Z>^>_Q&X|S'U!e*[S']%i-bQ+v&PQ,R&WQ,h&gQ0p+TQ1[+wQ1a+}Q2S,lQ2T,mQ5h1VQ5q1cQ6^1|Q6a2OQ6b2RQ8b5iQ8e5nQ9O6dQ:Z8fQ:h8{R;X:[rnOXst!V!Z#d%m&i&r&t&u&w,u,z2^2aR,j&k&z^OPXYstuvwz!Z!`!g!j!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'c's(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>S>T[#]WZ#W#Z'X(U!b%jm#h#i#l$x%e%h(_(i(j(k*Z*_*c+[+^+`,q-W.V.].^._.a/o/r2f3^3_4c6t7VQ%wxQ%{yW&Q|&V&W,QQ&_!TQ'd!hQ'f!iQ(r#sS+p%|%}Q+t&PQ,a&bQ,e&dS-n'g'hQ.k(sQ1T+qQ1Z+wQ1]+xQ1`+|Q1v,bS1z,f,gQ3O-oQ5g1VQ5k1YQ5p1bQ6]1{Q8a5iQ8d5mQ8h5rQ:V8`R;V:W!U$zi$d%O%Q%^%_%c*S*U*b*x*y/R/z0b0d0k0l0q4a5S8X9r>Q>Y>Z!^%yy!i!u%{%|%}'V'f'g'h'l'v*k+p+q-Z-n-o-v0T0W1T2w3O3V4t4u4x8P9}Q+j%wQ,V&[Q,Y&]Q,d&dQ.j(rQ1u,aU1y,e,f,gQ3g.kQ6W1vS6[1z1{Q8z6]#f>U#v$b$c$x${)z*W*Z*h+h+k,U,X.h/f/o/{/}1h1k1s3e4`4l4q5^5a6U7Y7x8S8^8s9d9{:R:b:t;S;^;f;m<q<s<w<y<{=T=V=Y=^=`=b=d=h>^>_o>V<n<o<r<t<x<z<|=U=W=Z=_=a=c=e=iW%Ti%V*z>QS&[!Q&iQ&]!RQ&^!SU+O%[%d=tR,T&Y%]%Si#v$b$c$d$x${%O%Q%^%_%c)z*S*U*W*Z*b*h*x*y+h+k,U,X.h/R/f/o/z/{/}0b0d0k0l0q1h1k1s3e4`4a4l4q5S5^5a6U7Y7x8S8X8^8s9d9r9{:R:b:t;S;^;f;m<n<o<q<r<s<t<w<x<y<z<{<|=T=U=V=W=Y=Z=^=_=`=a=b=c=d=e=h=i>Q>Y>Z>^>_T){$u)|V+Q%]<u<vW']!e%i*[-bS)O#y#zQ+e%rQ+{&SS.d(n(oQ1l,ZQ5V0mR8k5w'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'c's(U(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>T$i$^c#Y#e%q%s%u(T(Z(u(z)S)T)U)V)W)X)Y)Z)[)])_)a)c)h)r+f+z-[-z.P.U.W.u.x.|/O/P/Q/d0r2o2t3Q3X3m3r3s3t3u3v3w3x3y3z3{3|3}4O4R4S4Z5Z5e6w6}7S7c7d7m7n8m9Z9_9i9o9p:q;Y;b<Y=wT#TV#U'RkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'c's(U(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TQ'Y!eR2r-^!W!nQ!e!r!v!y!z$|'W'`'a'm'n'o*[*l*p*r*s-^-e-g-w0^0a1q5}6PR1n,]nqOXst!Z#d%m&r&t&u&w,u,z2^2aQ&y!^Q'w!xS(t#u<`Q+n%zQ,_&_Q,`&aQ-l'eQ-y'pS.t(y=QS0s+Y=[Q1R+oQ1p,^Q2e,|Q2g,}Q2n-XQ2|-mQ3P-qS5[0t=fQ5c1SS5f1U=gQ6v2pQ6z2}Q7P3UQ8_5dQ9[6xQ9]6{Q9`7QR:n9X$d$]c#Y#e%s%u(T(Z(u(z)S)T)U)V)W)X)Y)Z)[)])_)a)c)h)r+f+z-[-z.P.U.W.u.x.|/P/Q/d0r2o2t3Q3X3m3r3s3t3u3v3w3x3y3z3{3|3}4O4R4S4Z5Z5e6w6}7S7c7d7m7n8m9Z9_9i9o9p:q;Y;b<Y=wS(p#p'jQ)Q#zS+d%q/OS.e(o(qR3`.f'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'c's(U(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TS#q]<XQ&t!XQ&u!YQ&w![Q&x!]R2],xQ'b!hQ+g%wQ-j'dS.g(r+jQ2z-iW3d.j.k0y0{Q6y2{W7W3a3c3g5`U9c7X7Z7]U:s9e9f9hS;d:r:uQ;r;eR;z;sU!wQ'a-gT5{1q5}!Q_OXZ`st!V!Z#d#h%e%m&i&k&r&t&u&w(k,u,z.^2^2a]!pQ!r'a-g1q5}T#q]<X%^{OPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'c's(U(W(^(e(y({)P*O*j+Y+_+i,r,u,z-k-s.R.X.i.v.}/p0_0n0t1U1t2U2V2X2Z2^2a2c3S3Y3f3n4|6V6g6h6k7O7^8v9V9aS)O#y#zS.d(n(o!s=m$Z$n'X)t-Y-a/X2q4V5y6u:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TU$fd)`,oS(q#p'jU*w%R(x4QU0o+P.p7iQ5`0zQ7X3bQ9f7[R:u9gm!tQ!r!v!y!z'a'm'n'o-g-w1q5}6PQ'u!uS(g#g2WS-u'l'xQ/u*^Q0T*kQ3W-xQ4h/vQ4t0VQ4u0WQ4z0`Q7t4bS8P4v4xS8T4{4}Q9t7uQ9x7{Q9}8QQ:S8VS:}9y9zS;i;O;RS;u;j;kS;};v;wS<R<O<PR<U<SQ#wbQ't!uS(f#g2WS(h#m+XQ+Z%fQ+l%xQ+r&OU-t'l'u'xQ.Y(gU/t*^*a/yQ0U*kQ0X*mQ1Q+mQ1w,cS3T-u-xQ3].bS4g/u/vQ4p0RS4s0T0`Q4w0YQ6Y1xQ7R3WS7s4b4dQ7w4hU8O4t4z4}Q8R4yQ8x6ZS9s7t7uQ9w7{Q:P8TQ:Q8UQ:e8yQ:{9tS:|9x9zQ;U:SQ;`:fS;h:};RS;t;i;jS;|;u;wS<Q;}<PQ<T<RQ<V<UQ=p=kQ=|=uR=}=vV!wQ'a-g%^aOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'c's(U(W(^(e(y({)P*O*j+Y+_+i,r,u,z-k-s.R.X.i.v.}/p0_0n0t1U1t2U2V2X2Z2^2a2c3S3Y3f3n4|6V6g6h6k7O7^8v9V9aS#wz!j!r=j$Z$n'X)t-Y-a/X2q4V5y6u:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TR=p>S%^bOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'c's(U(W(^(e(y({)P*O*j+Y+_+i,r,u,z-k-s.R.X.i.v.}/p0_0n0t1U1t2U2V2X2Z2^2a2c3S3Y3f3n4|6V6g6h6k7O7^8v9V9aQ%fj!^%xy!i!u%{%|%}'V'f'g'h'l'v*k+p+q-Z-n-o-v0T0W1T2w3O3V4t4u4x8P9}S&Oz!jQ+m%yQ,c&dW1x,d,e,f,gU6Z1y1z1{S8y6[6]Q:f8z!r=k$Z$n'X)t-Y-a/X2q4V5y6u:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TQ=u>RR=v>S%QeOPXYstuvw!Z!`!g!o#S#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'c's(W(^(e(y({)P*O*j+Y+_+i,r,u,z-k-s.R.X.i.v.}/p0_0n0t1U1t2U2V2X2Z2^2a2c3S3Y3f3n4|6V6g6h6k7O7^8v9V9aY#bWZ#W#Z(U!b%jm#h#i#l$x%e%h(_(i(j(k*Z*_*c+[+^+`,q-W.V.].^._.a/o/r2f3^3_4c6t7VQ,p&o!p=l$Z$n)t-Y-a/X2q4V5y6u:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TR=o'XU'^!e%i*[R2u-bX'[!e%i*[-b%SdOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&r&t&u&w&{'T'c's(U(W(^(e(y({)P*O*j+Y+_,r,u,z-k-s.R.X.v.}/p0_0n0t1U1t2U2V2X2Z2^2a2c3S3Y3n4|6V6g6h6k7O8v9V9a!r)`$Z$n'X)t-Y-a/X2q4V5y6u:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TQ,o&oQ0z+iQ3b.iQ7[3fR9g7^!b$Tc#Y%q(T(Z(u(z)[)])a)h+z-z.P.U.W.u.x/d0r3Q3X3m3}5Z5e6}7S7c9_:q<Y!P<f)_)r-[/O2o2t3r3{3|4R4Z6w7d7m7n8m9Z9i9o9p;Y;b=w!f$Vc#Y%q(T(Z(u(z)X)Y)[)])a)h+z-z.P.U.W.u.x/d0r3Q3X3m3}5Z5e6}7S7c9_:q<Y!T<h)_)r-[/O2o2t3r3x3y3{3|4R4Z6w7d7m7n8m9Z9i9o9p;Y;b=w!^$Zc#Y%q(T(Z(u(z)a)h+z-z.P.U.W.u.x/d0r3Q3X3m3}5Z5e6}7S7c9_:q<YQ4a/mz>T)_)r-[/O2o2t3r4R4Z6w7d7m7n8m9Z9i9o9p;Y;b=wQ>Y>[R>Z>]'QkOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n%m%t&R&k&n&o&r&t&u&w&{'T'X'c's(U(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TS$oh$pR4W/W'XgOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'c's(U(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/W/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TT$kf$qQ$ifS)k$l)oR)w$qT$jf$qT)m$l)o'XhOPWXYZhstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$Z$_$a$e$n$p%m%t&R&k&n&o&r&t&u&w&{'T'X'c's(U(W(^(e(y({)P)t*O*j+Y+_+i,r,u,z-Y-a-k-s.R.X.i.v.}/W/X/p0_0n0t1U1t2U2V2X2Z2^2a2c2q3S3Y3f3n4V4|5y6V6g6h6k6u7O7^8v9V9a:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>TT$oh$pQ$rhR)v$p%^jOPWXYZstuvw!Z!`!g!o#S#W#Z#d#o#u#x#{$O$P$Q$R$S$T$U$V$W$X$_$a$e%m%t&R&k&n&o&r&t&u&w&{'T'c's(U(W(^(e(y({)P*O*j+Y+_+i,r,u,z-k-s.R.X.i.v.}/p0_0n0t1U1t2U2V2X2Z2^2a2c3S3Y3f3n4|6V6g6h6k7O7^8v9V9a!s>R$Z$n'X)t-Y-a/X2q4V5y6u:]:o<W<Z<[<_<`<a<b<c<d<e<f<g<h<i<j<k<m<p<}=P=Q=S=[=]=f=g>T#glOPXZst!Z!`!o#S#d#o#{$n%m&k&n&o&r&t&u&w&{'T'c)P)t*j+_+i,r,u,z-k.i/X/p0_0n1t2U2V2X2Z2^2a2c3f4V4|6V6g6h6k7^8v9V!U%Ri$d%O%Q%^%_%c*S*U*b*x*y/R/z0b0d0k0l0q4a5S8X9r>Q>Y>Z#f(x#v$b$c$x${)z*W*Z*h+h+k,U,X.h/f/o/{/}1h1k1s3e4`4l4q5^5a6U7Y7x8S8^8s9d9{:R:b:t;S;^;f;m<q<s<w<y<{=T=V=Y=^=`=b=d=h>^>_Q+U%aQ/e*Po4Q<n<o<r<t<x<z<|=U=W=Z=_=a=c=e=i!U$yi$d%O%Q%^%_%c*S*U*b*x*y/R/z0b0d0k0l0q4a5S8X9r>Q>Y>ZQ*d$zU*m$|*[*pQ+V%bQ0Y*n#f=r#v$b$c$x${)z*W*Z*h+h+k,U,X.h/f/o/{/}1h1k1s3e4`4l4q5^5a6U7Y7x8S8^8s9d9{:R:b:t;S;^;f;m<q<s<w<y<{=T=V=Y=^=`=b=d=h>^>_n=s<n<o<r<t<x<z<|=U=W=Z=_=a=c=e=iQ=x>UQ=y>VQ=z>WR={>X!U%Ri$d%O%Q%^%_%c*S*U*b*x*y/R/z0b0d0k0l0q4a5S8X9r>Q>Y>Z#f(x#v$b$c$x${)z*W*Z*h+h+k,U,X.h/f/o/{/}1h1k1s3e4`4l4q5^5a6U7Y7x8S8^8s9d9{:R:b:t;S;^;f;m<q<s<w<y<{=T=V=Y=^=`=b=d=h>^>_o4Q<n<o<r<t<x<z<|=U=W=Z=_=a=c=e=inoOXst!Z#d%m&r&t&u&w,u,z2^2aS*g${*ZQ-T'OQ-U'QR4k/{%[%Si#v$b$c$d$x${%O%Q%^%_%c)z*S*U*W*Z*b*h*x*y+h+k,U,X.h/R/f/o/z/{/}0b0d0k0l0q1h1k1s3e4`4a4l4q5S5^5a6U7Y7x8S8X8^8s9d9r9{:R:b:t;S;^;f;m<n<o<q<r<s<t<w<x<y<z<{<|=T=U=V=W=Y=Z=^=_=`=a=b=c=d=e=h=i>Q>Y>Z>^>_Q,W&]Q1j,YQ5u1iR8j5vV*o$|*[*pU*o$|*[*pT5|1q5}S0R*j/pQ4y0_T8U4|:_Q+l%xQ0X*mQ1Q+mQ1w,cQ6Y1xQ8x6ZQ:e8yR;`:f!U%Oi$d%O%Q%^%_%c*S*U*b*x*y/R/z0b0d0k0l0q4a5S8X9r>Q>Y>Zx*S$v)f*T*v+W/x0f0g4T4i5T5U5Y7r8W:T:z=q>O>PS0b*u0c#f<q#v$b$c$x${)z*W*Z*h+h+k,U,X.h/f/o/{/}1h1k1s3e4`4l4q5^5a6U7Y7x8S8^8s9d9{:R:b:t;S;^;f;m<q<s<w<y<{=T=V=Y=^=`=b=d=h>^>_n<r<n<o<r<t<x<z<|=U=W=Z=_=a=c=e=i!d=T(v)d*]*f.l.o.s/a/m0O0x1g3j4^4j4n5t7_7b7y7|8Z8]9v:O:U;P;T;g;l;x>[>]`=U4P7e7h7l9j:v:y;{S=`.n3kT=a7g9m!U%Qi$d%O%Q%^%_%c*S*U*b*x*y/R/z0b0d0k0l0q4a5S8X9r>Q>Y>Z|*U$v)f*V*u+W/i/x0f0g4T4i5O5T5U5Y7r8W:T:z=q>O>PS0d*v0e#f<s#v$b$c$x${)z*W*Z*h+h+k,U,X.h/f/o/{/}1h1k1s3e4`4l4q5^5a6U7Y7x8S8^8s9d9{:R:b:t;S;^;f;m<q<s<w<y<{=T=V=Y=^=`=b=d=h>^>_n<t<n<o<r<t<x<z<|=U=W=Z=_=a=c=e=i!h=V(v)d*]*f.m.n.s/a/m0O0x1g3h3j4^4j4n5t7_7`7b7y7|8Z8]9v:O:U;P;T;g;l;x>[>]d=W4P7f7g7l9j9k:v:w:y;{S=b.o3lT=c7h9nrnOXst!V!Z#d%m&i&r&t&u&w,u,z2^2aQ&f!UR,r&ornOXst!V!Z#d%m&i&r&t&u&w,u,z2^2aR&f!UQ,[&^R1f,TsnOXst!V!Z#d%m&i&r&t&u&w,u,z2^2aQ1r,aS6T1u1vU8r6R6S6WS:a8t8uS;[:`:cQ;o;]R;y;pQ&m!VR,k&iR6a2OR:h8{W&Q|&V&W,QR1]+xQ&r!WR,u&sR,{&xT2_,z2aR-P&yQ-O&yR2h-PQ'z!{R-{'zSsOtQ#dXT%ps#dQ#OTR'|#OQ#RUR(O#RQ)|$uR/b)|Q#UVR(R#UQ#XWU(X#X(Y.SQ(Y#YR.S(ZQ-_'YR2s-_Q.w(zS3o.w3pR3p.xQ-g'aR2x-gY!rQ'a-g1q5}R'k!rQ/S)fR4U/SU#_W%h*ZU(`#_(a.TQ(a#`R.T([Q-c'^R2v-ct`OXst!V!Z#d%m&i&k&r&t&u&w,u,z2^2aS#hZ%eU#r`#h.^R.^(kQ(l#jQ.Z(hW.c(l.Z3Z7TQ3Z.[R7T3[Q)o$lR/Y)oQ$phR)u$pQ$`cU)b$`.O<lQ.O<YR<l)rQ/s*^W4e/s4f7v9uU4f/t/u/vS7v4g4hR9u7w$e*R$v(v)d)f*]*f*u*v+R+S+W.n.o.q.r.s/a/i/k/m/x0O0f0g0x1g3h3i3j4P4T4^4i4j4n5O5Q5T5U5Y5t7_7`7a7b7g7h7j7k7l7r7y7|8W8Z8]9j9k9l9v:O:T:U:v:w:x:y:z;P;T;g;l;x;{=q>O>P>[>]Q/|*fU4m/|4o7zQ4o0OR7z4nS*p$|*[R0[*px*T$v)f*u*v+W/x0f0g4T4i5T5U5Y7r8W:T:z=q>O>P!d.l(v)d*]*f.n.o.s/a/m0O0x1g3j4^4j4n5t7_7b7y7|8Z8]9v:O:U;P;T;g;l;x>[>]U/j*T.l7ea7e4P7g7h7l9j:v:y;{Q0c*uQ3k.nU5P0c3k9mR9m7g|*V$v)f*u*v+W/i/x0f0g4T4i5O5T5U5Y7r8W:T:z=q>O>P!h.m(v)d*]*f.n.o.s/a/m0O0x1g3h3j4^4j4n5t7_7`7b7y7|8Z8]9v:O:U;P;T;g;l;x>[>]U/l*V.m7fe7f4P7g7h7l9j9k:v:w:y;{Q0e*vQ3l.oU5R0e3l9nR9n7hQ*{%UR0i*{Q5_0xR8[5_Q+a%kR0w+aQ5x1lS8l5x:^R:^8mQ,^&_R1o,^Q5}1qR8o5}Q1},hS6_1}8|R8|6aQ1W+tW5j1W5l8c:XQ5l1ZQ8c5kR:X8dQ+y&QR1^+yQ2a,zR6o2aYrOXst#dQ&v!ZQ+c%mQ,t&rQ,v&tQ,w&uQ,y&wQ2[,uS2_,z2aR6n2^Q%opQ&z!_Q&}!aQ'P!bQ'R!cQ'r!uQ+b%lQ+n%zQ,S&XQ,j&mQ-R&|W-r'l't'u'xQ-y'pQ0Z*oQ1R+oQ1e,RS2Q,k,nQ2i-QQ2j-TQ2k-UQ3P-qW3R-t-u-x-zQ5c1SQ5o1aQ5s1gQ6X1wQ6c2SQ6m2]U6|3Q3T3WQ7P3UQ8_5dQ8g5qQ8i5tQ8n5|Q8w6YQ8}6bS9^6}7RQ9`7QQ:Y8eQ:d8xQ:i9OQ:p9_Q;W:ZQ;_:eQ;c:qQ;n;XR;q;`Q%zyQ'e!iQ'p!uU+o%{%|%}Q-X'VU-m'f'g'hS-q'l'vQ0S*kS1S+p+qQ2p-ZS2}-n-oQ3U-vS4r0T0WQ5d1TQ6x2wQ6{3OQ7Q3VU7}4t4u4xQ9|8PR;Q9}S$wi>QR*|%VU%Ui%V>QR0h*zQ$viS(v#v+kS)d$b$cQ)f$dQ*]$xS*f${*ZQ*u%OQ*v%QQ+R%^Q+S%_Q+W%cQ.n<qQ.o<sQ.q<wQ.r<yQ.s<{Q/a)zQ/i*SQ/k*UQ/m*WQ/x*bS0O*h/oQ0f*xQ0g*yl0x+h,X.h1k1s3e6U7Y8s9d:b:t;^;fQ1g,UQ3h=TQ3i=VQ3j=YS4P<n<oQ4T/RS4^/f4`Q4i/zQ4j/{Q4n/}Q5O0bQ5Q0dQ5T0kQ5U0lQ5Y0qQ5t1hQ7_=^Q7`=`Q7a=bQ7b=dQ7g<rQ7h<tQ7j<xQ7k<zQ7l<|Q7r4aQ7y4lQ7|4qQ8W5SQ8Z5^Q8]5aQ9j=ZQ9k=UQ9l=WQ9v7xQ:O8SQ:T8XQ:U8^Q:v=_Q:w=aQ:x=cQ:y=eQ:z9rQ;P9{Q;T:RQ;g=hQ;l;SQ;x;mQ;{=iQ=q>QQ>O>YQ>P>ZQ>[>^R>]>_Q+P%]Q.p<uR7i<vnpOXst!Z#d%m&r&t&u&w,u,z2^2aQ!fPS#fZ#oQ&|!`W'i!o*j0_4|Q(Q#SQ)R#{Q)s$nS,n&k&nQ,s&oQ-Q&{S-V'T/pQ-i'cQ.z)PQ/^)tQ0u+_Q0{+iQ2Y,rQ2{-kQ3c.iQ4Y/XQ5W0nQ6S1tQ6e2UQ6f2VQ6j2XQ6l2ZQ6q2cQ7]3fQ7o4VQ8u6VQ9R6gQ9S6hQ9U6kQ9h7^Q:c8vR:m9V#[cOPXZst!Z!`!o#d#o#{%m&k&n&o&r&t&u&w&{'T'c)P*j+_+i,r,u,z-k.i/p0_0n1t2U2V2X2Z2^2a2c3f4|6V6g6h6k7^8v9VQ#YWQ#eYQ%quQ%svS%uw!gS(T#W(WQ(Z#ZQ(u#uQ(z#xQ)S$OQ)T$PQ)U$QQ)V$RQ)W$SQ)X$TQ)Y$UQ)Z$VQ)[$WQ)]$XQ)_$ZQ)a$_Q)c$aQ)h$eW)r$n)t/X4VQ+f%tQ+z&RS-['X2qQ-z'sS.P(U.RQ.U(^Q.W(eQ.u(yQ.x({Q.|<WQ/O<ZQ/P<[Q/Q<_Q/d*OQ0r+YQ2o-YQ2t-aQ3Q-sQ3X.XQ3m.vQ3r<`Q3s<aQ3t<bQ3u<cQ3v<dQ3w<eQ3x<fQ3y<gQ3z<hQ3{<iQ3|<jQ3}.}Q4O<mQ4R<pQ4S<}Q4Z<kQ5Z0tQ5e1UQ6w=PQ6}3SQ7S3YQ7c3nQ7d=QQ7m=SQ7n=[Q8m5yQ9Z6uQ9_7OQ9i=]Q9o=fQ9p=gQ:q9aQ;Y:]Q;b:oQ<Y#SR=w>TR#[WR'Z!el!tQ!r!v!y!z'a'm'n'o-g-w1q5}6PS'V!e-^U*k$|*[*pS-Z'W'`S0W*l*rQ0`*sQ2w-eQ4x0^R4}0aR(|#xQ!fQT-f'a-g]!qQ!r'a-g1q5}Q#p]R'j<XR)g$dY!uQ'a-g1q5}Q'l!rS'v!v!yS'x!z6PS-v'm'nQ-x'oR3V-wT#kZ%eS#jZ%eS%km,qU(h#h#i#lS.[(i(jQ.`(kQ0v+`Q3[.]U3].^._.aS7U3^3_R9b7Vd#^W#W#Z%h(U(_*Z+[.V/or#gZm#h#i#l%e(i(j(k+`.].^._.a3^3_7VS*^$x*cQ/v*_Q2W,qQ2m-WQ4b/rQ6s2fQ7u4cQ9Y6tT=n'X+^V#aW%h*ZU#`W%h*ZS(V#W(_U([#Z+[/oS-]'X+^T.Q(U.VV'_!e%i*[Q$lfR)y$qT)n$l)oR4X/WT*`$x*cT*i${*ZQ0y+hQ1i,XQ3a.hQ5v1kQ6R1sQ7Z3eQ8t6UQ9e7YQ:`8sQ:r9dQ;]:bQ;e:tQ;p;^R;s;fnqOXst!Z#d%m&r&t&u&w,u,z2^2aQ&l!VR,j&itmOXst!U!V!Z#d%m&i&r&t&u&w,u,z2^2aR,q&oT%lm,qR1m,ZR,i&gQ&U|S,P&V&WR1`,QR+u&PT&p!W&sT&q!W&sT2`,z2a",
	nodeNames: "⚠ ArithOp ArithOp ?. JSXStartTag LineComment BlockComment Script Hashbang ExportDeclaration export Star as VariableName String Escape from ; default FunctionDeclaration async function VariableDefinition > < TypeParamList in out const TypeDefinition extends ThisType this LiteralType ArithOp Number BooleanLiteral TemplateType InterpolationEnd Interpolation InterpolationStart NullType null VoidType void TypeofType typeof MemberExpression . PropertyName [ TemplateString Escape Interpolation super RegExp ] ArrayExpression Spread , } { ObjectExpression Property async get set PropertyDefinition Block : NewTarget new NewExpression ) ( ArgList UnaryExpression delete LogicOp BitOp YieldExpression yield AwaitExpression await ParenthesizedExpression ClassExpression class ClassBody MethodDeclaration Decorator @ MemberExpression PrivatePropertyName CallExpression TypeArgList CompareOp < declare Privacy static abstract override PrivatePropertyDefinition PropertyDeclaration readonly accessor Optional TypeAnnotation Equals StaticBlock FunctionExpression ArrowFunction ParamList ParamList ArrayPattern ObjectPattern PatternProperty VariableDefinition Privacy readonly Arrow MemberExpression BinaryExpression ArithOp ArithOp ArithOp ArithOp BitOp CompareOp instanceof satisfies CompareOp BitOp BitOp BitOp LogicOp LogicOp ConditionalExpression LogicOp LogicOp AssignmentExpression UpdateOp PostfixExpression CallExpression InstantiationExpression TaggedTemplateExpression DynamicImport import ImportMeta JSXElement JSXSelfCloseEndTag JSXSelfClosingTag JSXIdentifier JSXBuiltin JSXIdentifier JSXNamespacedName JSXMemberExpression JSXSpreadAttribute JSXAttribute JSXAttributeValue JSXEscape JSXEndTag JSXOpenTag JSXFragmentTag JSXText JSXEscape JSXStartCloseTag JSXCloseTag PrefixCast < ArrowFunction TypeParamList SequenceExpression InstantiationExpression KeyofType keyof UniqueType unique ImportType InferredType infer TypeName ParenthesizedType FunctionSignature ParamList NewSignature IndexedType TupleType Label ArrayType ReadonlyType ObjectType MethodType PropertyType IndexSignature PropertyDefinition CallSignature TypePredicate asserts is NewSignature new UnionType LogicOp IntersectionType LogicOp ConditionalType ParameterizedType ClassDeclaration abstract implements type VariableDeclaration let var using TypeAliasDeclaration InterfaceDeclaration interface EnumDeclaration enum EnumBody NamespaceDeclaration namespace module AmbientDeclaration declare GlobalDeclaration global ClassDeclaration ClassBody AmbientFunctionDeclaration ExportGroup VariableName VariableName ImportDeclaration defer ImportGroup ForStatement for ForSpec ForInSpec ForOfSpec of WhileStatement while WithStatement with DoStatement do IfStatement if else SwitchStatement switch SwitchBody CaseLabel case DefaultLabel TryStatement try CatchClause catch FinallyClause finally ReturnStatement return ThrowStatement throw BreakStatement break ContinueStatement continue DebuggerStatement debugger LabeledStatement ExpressionStatement SingleExpression SingleClassItem",
	maxTerm: 381,
	context: VC,
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
	propSources: [JC],
	skippedNodes: [
		0,
		5,
		6,
		279
	],
	repeatNodeCount: 37,
	tokenData: "$Fq07[R!bOX%ZXY+gYZ-yZ[+g[]%Z]^.c^p%Zpq+gqr/mrs3cst:_tuEruvJSvwLkwx! Yxy!'iyz!(sz{!)}{|!,q|}!.O}!O!,q!O!P!/Y!P!Q!9j!Q!R#:O!R![#<_![!]#I_!]!^#Jk!^!_#Ku!_!`$![!`!a$$v!a!b$*T!b!c$,r!c!}Er!}#O$-|#O#P$/W#P#Q$4o#Q#R$5y#R#SEr#S#T$7W#T#o$8b#o#p$<r#p#q$=h#q#r$>x#r#s$@U#s$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$I|Er$I|$I}$Dk$I}$JO$Dk$JO$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr(n%d_$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z&j&hT$j&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c&j&zP;=`<%l&c'|'U]$j&j([!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!b(SU([!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!b(iP;=`<%l'}'|(oP;=`<%l&}'[(y]$j&j(XpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(rp)wU(XpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)rp*^P;=`<%l)r'[*dP;=`<%l(r#S*nX(Xp([!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g#S+^P;=`<%l*g(n+dP;=`<%l%Z07[+rq$j&j(Xp([!b'}0/lOX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p$f%Z$f$g+g$g#BY%Z#BY#BZ+g#BZ$IS%Z$IS$I_+g$I_$JT%Z$JT$JU+g$JU$KV%Z$KV$KW+g$KW&FU%Z&FU&FV+g&FV;'S%Z;'S;=`+a<%l?HT%Z?HT?HU+g?HUO%Z07[.ST(Y#S$j&j(O0/lO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c07[.n_$j&j(Xp([!b(O0/lOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)3p/x`$j&j!p),Q(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW1V`#w(Ch$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`2X!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW2d_#w(Ch$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At3l_(W':f$j&j([!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k(^4r_$j&j([!bOY4kYZ5qZr4krs7nsw4kwx5qx!^4k!^!_8p!_#O4k#O#P5q#P#o4k#o#p8p#p;'S4k;'S;=`:X<%lO4k&z5vX$j&jOr5qrs6cs!^5q!^!_6y!_#o5q#o#p6y#p;'S5q;'S;=`7h<%lO5q&z6jT$e`$j&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c`6|TOr6yrs7]s;'S6y;'S;=`7b<%lO6y`7bO$e``7eP;=`<%l6y&z7kP;=`<%l5q(^7w]$e`$j&j([!bOY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}!r8uZ([!bOY8pYZ6yZr8prs9hsw8pwx6yx#O8p#O#P6y#P;'S8p;'S;=`:R<%lO8p!r9oU$e`([!bOY'}Zw'}x#O'}#P;'S'};'S;=`(f<%lO'}!r:UP;=`<%l8p(^:[P;=`<%l4k%9[:hh$j&j(Xp([!bOY%ZYZ&cZq%Zqr<Srs&}st%ZtuCruw%Zwx(rx!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr(r<__WS$j&j(Xp([!bOY<SYZ&cZr<Srs=^sw<Swx@nx!^<S!^!_Bm!_#O<S#O#P>`#P#o<S#o#pBm#p;'S<S;'S;=`Cl<%lO<S(Q=g]WS$j&j([!bOY=^YZ&cZw=^wx>`x!^=^!^!_?q!_#O=^#O#P>`#P#o=^#o#p?q#p;'S=^;'S;=`@h<%lO=^&n>gXWS$j&jOY>`YZ&cZ!^>`!^!_?S!_#o>`#o#p?S#p;'S>`;'S;=`?k<%lO>`S?XSWSOY?SZ;'S?S;'S;=`?e<%lO?SS?hP;=`<%l?S&n?nP;=`<%l>`!f?xWWS([!bOY?qZw?qwx?Sx#O?q#O#P?S#P;'S?q;'S;=`@b<%lO?q!f@eP;=`<%l?q(Q@kP;=`<%l=^'`@w]WS$j&j(XpOY@nYZ&cZr@nrs>`s!^@n!^!_Ap!_#O@n#O#P>`#P#o@n#o#pAp#p;'S@n;'S;=`Bg<%lO@ntAwWWS(XpOYApZrAprs?Ss#OAp#O#P?S#P;'SAp;'S;=`Ba<%lOAptBdP;=`<%lAp'`BjP;=`<%l@n#WBvYWS(Xp([!bOYBmZrBmrs?qswBmwxApx#OBm#O#P?S#P;'SBm;'S;=`Cf<%lOBm#WCiP;=`<%lBm(rCoP;=`<%l<S%9[C}i$j&j(p%1l(Xp([!bOY%ZYZ&cZr%Zrs&}st%ZtuCruw%Zwx(rx!Q%Z!Q![Cr![!^%Z!^!_*g!_!c%Z!c!}Cr!}#O%Z#O#P&c#P#R%Z#R#SCr#S#T%Z#T#oCr#o#p*g#p$g%Z$g;'SCr;'S;=`El<%lOCr%9[EoP;=`<%lCr07[FRk$j&j(Xp([!b$^#t(U,2j(f$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr+dHRk$j&j(Xp([!b$^#tOY%ZYZ&cZr%Zrs&}st%ZtuGvuw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Gv![!^%Z!^!_*g!_!c%Z!c!}Gv!}#O%Z#O#P&c#P#R%Z#R#SGv#S#T%Z#T#oGv#o#p*g#p$g%Z$g;'SGv;'S;=`Iv<%lOGv+dIyP;=`<%lGv07[JPP;=`<%lEr(KWJ_`$j&j(Xp([!b#q(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWKl_$j&j$R(Ch(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,#xLva({+JY$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sv%ZvwM{wx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KWNW`$j&j#{(Ch(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'At! c_(Z';W$j&j(XpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b'l!!i_$j&j(XpOY!!bYZ!#hZr!!brs!#hsw!!bwx!$xx!^!!b!^!_!%z!_#O!!b#O#P!#h#P#o!!b#o#p!%z#p;'S!!b;'S;=`!'c<%lO!!b&z!#mX$j&jOw!#hwx6cx!^!#h!^!_!$Y!_#o!#h#o#p!$Y#p;'S!#h;'S;=`!$r<%lO!#h`!$]TOw!$Ywx7]x;'S!$Y;'S;=`!$l<%lO!$Y`!$oP;=`<%l!$Y&z!$uP;=`<%l!#h'l!%R]$e`$j&j(XpOY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r!Q!&PZ(XpOY!%zYZ!$YZr!%zrs!$Ysw!%zwx!&rx#O!%z#O#P!$Y#P;'S!%z;'S;=`!']<%lO!%z!Q!&yU$e`(XpOY)rZr)rs#O)r#P;'S)r;'S;=`*Z<%lO)r!Q!'`P;=`<%l!%z'l!'fP;=`<%l!!b/5|!'t_!l/.^$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#&U!)O_!k!Lf$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z-!n!*[b$j&j(Xp([!b(V%&f#r(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rxz%Zz{!+d{!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW!+o`$j&j(Xp([!b#o(ChOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;x!,|`$j&j(Xp([!br+4YOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z,$U!.Z_!]+Jf$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!/ec$j&j(Xp([!b!Q.2^OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!0p!P!Q%Z!Q![!3Y![!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!0ya$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!2O!P!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z#%|!2Z_![!L^$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!3eg$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!3Y![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S!3Y#S#X%Z#X#Y!4|#Y#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!5Vg$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx{%Z{|!6n|}%Z}!O!6n!O!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!6wc$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad!8_c$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![!8S![!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S!8S#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[!9uf$j&j(Xp([!b#p(ChOY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcxz!;Zz{#-}{!P!;Z!P!Q#/d!Q!^!;Z!^!_#(i!_!`#7S!`!a#8i!a!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z?O!;fb$j&j(Xp([!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z>^!<w`$j&j([!b!X7`OY!<nYZ&cZw!<nwx!=yx!P!<n!P!Q!Eq!Q!^!<n!^!_!Gr!_!}!<n!}#O!KS#O#P!Dy#P#o!<n#o#p!Gr#p;'S!<n;'S;=`!L]<%lO!<n<z!>Q^$j&j!X7`OY!=yYZ&cZ!P!=y!P!Q!>|!Q!^!=y!^!_!@c!_!}!=y!}#O!CW#O#P!Dy#P#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!?Td$j&j!X7`O!^&c!_#W&c#W#X!>|#X#Z&c#Z#[!>|#[#]&c#]#^!>|#^#a&c#a#b!>|#b#g&c#g#h!>|#h#i&c#i#j!>|#j#k!>|#k#m&c#m#n!>|#n#o&c#p;'S&c;'S;=`&w<%lO&c7`!@hX!X7`OY!@cZ!P!@c!P!Q!AT!Q!}!@c!}#O!Ar#O#P!Bq#P;'S!@c;'S;=`!CQ<%lO!@c7`!AYW!X7`#W#X!AT#Z#[!AT#]#^!AT#a#b!AT#g#h!AT#i#j!AT#j#k!AT#m#n!AT7`!AuVOY!ArZ#O!Ar#O#P!B[#P#Q!@c#Q;'S!Ar;'S;=`!Bk<%lO!Ar7`!B_SOY!ArZ;'S!Ar;'S;=`!Bk<%lO!Ar7`!BnP;=`<%l!Ar7`!BtSOY!@cZ;'S!@c;'S;=`!CQ<%lO!@c7`!CTP;=`<%l!@c<z!C][$j&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#O!CW#O#P!DR#P#Q!=y#Q#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DWX$j&jOY!CWYZ&cZ!^!CW!^!_!Ar!_#o!CW#o#p!Ar#p;'S!CW;'S;=`!Ds<%lO!CW<z!DvP;=`<%l!CW<z!EOX$j&jOY!=yYZ&cZ!^!=y!^!_!@c!_#o!=y#o#p!@c#p;'S!=y;'S;=`!Ek<%lO!=y<z!EnP;=`<%l!=y>^!Ezl$j&j([!b!X7`OY&}YZ&cZw&}wx&cx!^&}!^!_'}!_#O&}#O#P&c#P#W&}#W#X!Eq#X#Z&}#Z#[!Eq#[#]&}#]#^!Eq#^#a&}#a#b!Eq#b#g&}#g#h!Eq#h#i&}#i#j!Eq#j#k!Eq#k#m&}#m#n!Eq#n#o&}#o#p'}#p;'S&};'S;=`(l<%lO&}8r!GyZ([!b!X7`OY!GrZw!Grwx!@cx!P!Gr!P!Q!Hl!Q!}!Gr!}#O!JU#O#P!Bq#P;'S!Gr;'S;=`!J|<%lO!Gr8r!Hse([!b!X7`OY'}Zw'}x#O'}#P#W'}#W#X!Hl#X#Z'}#Z#[!Hl#[#]'}#]#^!Hl#^#a'}#a#b!Hl#b#g'}#g#h!Hl#h#i'}#i#j!Hl#j#k!Hl#k#m'}#m#n!Hl#n;'S'};'S;=`(f<%lO'}8r!JZX([!bOY!JUZw!JUwx!Arx#O!JU#O#P!B[#P#Q!Gr#Q;'S!JU;'S;=`!Jv<%lO!JU8r!JyP;=`<%l!JU8r!KPP;=`<%l!Gr>^!KZ^$j&j([!bOY!KSYZ&cZw!KSwx!CWx!^!KS!^!_!JU!_#O!KS#O#P!DR#P#Q!<n#Q#o!KS#o#p!JU#p;'S!KS;'S;=`!LV<%lO!KS>^!LYP;=`<%l!KS>^!L`P;=`<%l!<n=l!Ll`$j&j(Xp!X7`OY!LcYZ&cZr!Lcrs!=ys!P!Lc!P!Q!Mn!Q!^!Lc!^!_# o!_!}!Lc!}#O#%P#O#P!Dy#P#o!Lc#o#p# o#p;'S!Lc;'S;=`#&Y<%lO!Lc=l!Mwl$j&j(Xp!X7`OY(rYZ&cZr(rrs&cs!^(r!^!_)r!_#O(r#O#P&c#P#W(r#W#X!Mn#X#Z(r#Z#[!Mn#[#](r#]#^!Mn#^#a(r#a#b!Mn#b#g(r#g#h!Mn#h#i(r#i#j!Mn#j#k!Mn#k#m(r#m#n!Mn#n#o(r#o#p)r#p;'S(r;'S;=`*a<%lO(r8Q# vZ(Xp!X7`OY# oZr# ors!@cs!P# o!P!Q#!i!Q!}# o!}#O#$R#O#P!Bq#P;'S# o;'S;=`#$y<%lO# o8Q#!pe(Xp!X7`OY)rZr)rs#O)r#P#W)r#W#X#!i#X#Z)r#Z#[#!i#[#])r#]#^#!i#^#a)r#a#b#!i#b#g)r#g#h#!i#h#i)r#i#j#!i#j#k#!i#k#m)r#m#n#!i#n;'S)r;'S;=`*Z<%lO)r8Q#$WX(XpOY#$RZr#$Rrs!Ars#O#$R#O#P!B[#P#Q# o#Q;'S#$R;'S;=`#$s<%lO#$R8Q#$vP;=`<%l#$R8Q#$|P;=`<%l# o=l#%W^$j&j(XpOY#%PYZ&cZr#%Prs!CWs!^#%P!^!_#$R!_#O#%P#O#P!DR#P#Q!Lc#Q#o#%P#o#p#$R#p;'S#%P;'S;=`#&S<%lO#%P=l#&VP;=`<%l#%P=l#&]P;=`<%l!Lc?O#&kn$j&j(Xp([!b!X7`OY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#W%Z#W#X#&`#X#Z%Z#Z#[#&`#[#]%Z#]#^#&`#^#a%Z#a#b#&`#b#g%Z#g#h#&`#h#i%Z#i#j#&`#j#k#&`#k#m%Z#m#n#&`#n#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z9d#(r](Xp([!b!X7`OY#(iZr#(irs!Grsw#(iwx# ox!P#(i!P!Q#)k!Q!}#(i!}#O#+`#O#P!Bq#P;'S#(i;'S;=`#,`<%lO#(i9d#)th(Xp([!b!X7`OY*gZr*grs'}sw*gwx)rx#O*g#P#W*g#W#X#)k#X#Z*g#Z#[#)k#[#]*g#]#^#)k#^#a*g#a#b#)k#b#g*g#g#h#)k#h#i*g#i#j#)k#j#k#)k#k#m*g#m#n#)k#n;'S*g;'S;=`+Z<%lO*g9d#+gZ(Xp([!bOY#+`Zr#+`rs!JUsw#+`wx#$Rx#O#+`#O#P!B[#P#Q#(i#Q;'S#+`;'S;=`#,Y<%lO#+`9d#,]P;=`<%l#+`9d#,cP;=`<%l#(i?O#,o`$j&j(Xp([!bOY#,fYZ&cZr#,frs!KSsw#,fwx#%Px!^#,f!^!_#+`!_#O#,f#O#P!DR#P#Q!;Z#Q#o#,f#o#p#+`#p;'S#,f;'S;=`#-q<%lO#,f?O#-tP;=`<%l#,f?O#-zP;=`<%l!;Z07[#.[b$j&j(Xp([!b(P0/l!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z07[#/o_$j&j(Xp([!bT0/lOY#/dYZ&cZr#/drs#0nsw#/dwx#4Ox!^#/d!^!_#5}!_#O#/d#O#P#1p#P#o#/d#o#p#5}#p;'S#/d;'S;=`#6|<%lO#/d06j#0w]$j&j([!bT0/lOY#0nYZ&cZw#0nwx#1px!^#0n!^!_#3R!_#O#0n#O#P#1p#P#o#0n#o#p#3R#p;'S#0n;'S;=`#3x<%lO#0n05W#1wX$j&jT0/lOY#1pYZ&cZ!^#1p!^!_#2d!_#o#1p#o#p#2d#p;'S#1p;'S;=`#2{<%lO#1p0/l#2iST0/lOY#2dZ;'S#2d;'S;=`#2u<%lO#2d0/l#2xP;=`<%l#2d05W#3OP;=`<%l#1p01O#3YW([!bT0/lOY#3RZw#3Rwx#2dx#O#3R#O#P#2d#P;'S#3R;'S;=`#3r<%lO#3R01O#3uP;=`<%l#3R06j#3{P;=`<%l#0n05x#4X]$j&j(XpT0/lOY#4OYZ&cZr#4Ors#1ps!^#4O!^!_#5Q!_#O#4O#O#P#1p#P#o#4O#o#p#5Q#p;'S#4O;'S;=`#5w<%lO#4O00^#5XW(XpT0/lOY#5QZr#5Qrs#2ds#O#5Q#O#P#2d#P;'S#5Q;'S;=`#5q<%lO#5Q00^#5tP;=`<%l#5Q05x#5zP;=`<%l#4O01p#6WY(Xp([!bT0/lOY#5}Zr#5}rs#3Rsw#5}wx#5Qx#O#5}#O#P#2d#P;'S#5};'S;=`#6v<%lO#5}01p#6yP;=`<%l#5}07[#7PP;=`<%l#/d)3h#7ab$j&j$R(Ch(Xp([!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;ZAt#8vb$[#t$j&j(Xp([!b!X7`OY!;ZYZ&cZr!;Zrs!<nsw!;Zwx!Lcx!P!;Z!P!Q#&`!Q!^!;Z!^!_#(i!_!}!;Z!}#O#,f#O#P!Dy#P#o!;Z#o#p#(i#p;'S!;Z;'S;=`#-w<%lO!;Z'Ad#:Zp$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#U%Z#U#V#?i#V#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#d#Bq#d#l%Z#l#m#Es#m#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#<jk$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!O%Z!O!P!3Y!P!Q%Z!Q![#<_![!^%Z!^!_*g!_!g%Z!g!h!4|!h#O%Z#O#P&c#P#R%Z#R#S#<_#S#X%Z#X#Y!4|#Y#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#>j_$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#?rd$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#A]f$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!R#AQ!R!S#AQ!S!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#AQ#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Bzc$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Dbe$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q!Y#DV!Y!^%Z!^!_*g!_#O%Z#O#P&c#P#R%Z#R#S#DV#S#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#E|g$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z'Ad#Gpi$j&j(Xp([!bs'9tOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!Q%Z!Q![#Ge![!^%Z!^!_*g!_!c%Z!c!i#Ge!i#O%Z#O#P&c#P#R%Z#R#S#Ge#S#T%Z#T#Z#Ge#Z#b%Z#b#c#>_#c#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x#Il_!g$b$j&j$P)Lv(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z)[#Jv_al$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f#LS^h#)`#R-<U(Xp([!b$o7`OY*gZr*grs'}sw*gwx)rx!P*g!P!Q#MO!Q!^*g!^!_#Mt!_!`$ f!`#O*g#P;'S*g;'S;=`+Z<%lO*g(n#MXX$l&j(Xp([!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El#M}Z#s(Ch(Xp([!bOY*gZr*grs'}sw*gwx)rx!_*g!_!`#Np!`#O*g#P;'S*g;'S;=`+Z<%lO*g(El#NyX$R(Ch(Xp([!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g(El$ oX#t(Ch(Xp([!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g*)x$!ga#`*!Y$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`0z!`!a$#l!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(K[$#w_#l(Cl$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z*)x$%Vag!*r#t(Ch$g#|$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`$&[!`!a$'f!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$&g_#t(Ch$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$'qa#s(Ch$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`!a$(v!a#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$)R`#s(Ch$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(Kd$*`a(s(Ct$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!a%Z!a!b$+e!b#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$+p`$j&j#|(Ch(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z%#`$,}_!|$Ip$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z04f$.X_!S0,v$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(n$/]Z$j&jO!^$0O!^!_$0f!_#i$0O#i#j$0k#j#l$0O#l#m$2^#m#o$0O#o#p$0f#p;'S$0O;'S;=`$4i<%lO$0O(n$0VT_#S$j&jO!^&c!_#o&c#p;'S&c;'S;=`&w<%lO&c#S$0kO_#S(n$0p[$j&jO!Q&c!Q![$1f![!^&c!_!c&c!c!i$1f!i#T&c#T#Z$1f#Z#o&c#o#p$3|#p;'S&c;'S;=`&w<%lO&c(n$1kZ$j&jO!Q&c!Q![$2^![!^&c!_!c&c!c!i$2^!i#T&c#T#Z$2^#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$2cZ$j&jO!Q&c!Q![$3U![!^&c!_!c&c!c!i$3U!i#T&c#T#Z$3U#Z#o&c#p;'S&c;'S;=`&w<%lO&c(n$3ZZ$j&jO!Q&c!Q![$0O![!^&c!_!c&c!c!i$0O!i#T&c#T#Z$0O#Z#o&c#p;'S&c;'S;=`&w<%lO&c#S$4PR!Q![$4Y!c!i$4Y#T#Z$4Y#S$4]S!Q![$4Y!c!i$4Y#T#Z$4Y#q#r$0f(n$4lP;=`<%l$0O#1[$4z_!Y#)l$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z(KW$6U`#y(Ch$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z+;p$7c_$j&j(Xp([!b(b+4QOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$8qk$j&j(Xp([!b(U,2j$`#t(f$I[OY%ZYZ&cZr%Zrs&}st%Ztu$8buw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$8b![!^%Z!^!_*g!_!c%Z!c!}$8b!}#O%Z#O#P&c#P#R%Z#R#S$8b#S#T%Z#T#o$8b#o#p*g#p$g%Z$g;'S$8b;'S;=`$<l<%lO$8b+d$:qk$j&j(Xp([!b$`#tOY%ZYZ&cZr%Zrs&}st%Ztu$:fuw%Zwx(rx}%Z}!O$:f!O!Q%Z!Q![$:f![!^%Z!^!_*g!_!c%Z!c!}$:f!}#O%Z#O#P&c#P#R%Z#R#S$:f#S#T%Z#T#o$:f#o#p*g#p$g%Z$g;'S$:f;'S;=`$<f<%lO$:f+d$<iP;=`<%l$:f07[$<oP;=`<%l$8b#Jf$<{X!_#Hb(Xp([!bOY*gZr*grs'}sw*gwx)rx#O*g#P;'S*g;'S;=`+Z<%lO*g,#x$=sa(z+JY$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_!`Ka!`#O%Z#O#P&c#P#o%Z#o#p*g#p#q$+e#q;'S%Z;'S;=`+a<%lO%Z)>v$?V_!^(CdvBr$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z?O$@a_!q7`$j&j(Xp([!bOY%ZYZ&cZr%Zrs&}sw%Zwx(rx!^%Z!^!_*g!_#O%Z#O#P&c#P#o%Z#o#p*g#p;'S%Z;'S;=`+a<%lO%Z07[$Aq|$j&j(Xp([!b'}0/l$^#t(U,2j(f$I[OX%ZXY+gYZ&cZ[+g[p%Zpq+gqr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$f%Z$f$g+g$g#BYEr#BY#BZ$A`#BZ$ISEr$IS$I_$A`$I_$JTEr$JT$JU$A`$JU$KVEr$KV$KW$A`$KW&FUEr&FU&FV$A`&FV;'SEr;'S;=`I|<%l?HTEr?HT?HU$A`?HUOEr07[$D|k$j&j(Xp([!b(O0/l$^#t(U,2j(f$I[OY%ZYZ&cZr%Zrs&}st%ZtuEruw%Zwx(rx}%Z}!OGv!O!Q%Z!Q![Er![!^%Z!^!_*g!_!c%Z!c!}Er!}#O%Z#O#P&c#P#R%Z#R#SEr#S#T%Z#T#oEr#o#p*g#p$g%Z$g;'SEr;'S;=`I|<%lOEr",
	tokenizers: [
		UC,
		WC,
		GC,
		qC,
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
		HC,
		new Hb("$S~RRtu[#O#Pg#S#T#|~_P#o#pb~gOx~~jVO#i!P#i#j!U#j#l!P#l#m!q#m;'S!P;'S;=`#v<%lO!P~!UO!U~~!XS!Q![!e!c!i!e#T#Z!e#o#p#Z~!hR!Q![!q!c!i!q#T#Z!q~!tR!Q![!}!c!i!}#T#Z!}~#QR!Q![!P!c!i!P#T#Z!P~#^R!Q![#g!c!i#g#T#Z#g~#jS!Q![#g!c!i#g#T#Z#g#q#r!P~#yP;=`<%l!P~$RO(d~~", 141, 341),
		new Hb("j~RQYZXz{^~^O(R~~aP!P!Qd~iO(S~~", 25, 324)
	],
	topRules: {
		Script: [0, 7],
		SingleExpression: [1, 277],
		SingleClassItem: [2, 278]
	},
	dialects: {
		jsx: 0,
		ts: 15179
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
			get: (e) => YC[e] || -1
		},
		{
			term: 344,
			get: (e) => XC[e] || -1
		},
		{
			term: 95,
			get: (e) => ZC[e] || -1
		}
	],
	tokenPrec: 15205
}), $C = class {
	constructor(e, t, n, r) {
		this.state = e, this.pos = t, this.explicit = n, this.view = r, this.abortListeners = [], this.abortOnDocChange = !1;
	}
	tokenBefore(e) {
		let t = Y(this.state).resolveInner(this.pos, -1);
		for (; t && e.indexOf(t.name) < 0;) t = t.parent;
		return t ? {
			from: t.from,
			to: this.pos,
			text: this.state.sliceDoc(t.from, this.pos),
			type: t.type
		} : null;
	}
	matchBefore(e) {
		let t = this.state.doc.lineAt(this.pos), n = Math.max(t.from, this.pos - 250), r = t.text.slice(n - t.from, this.pos - t.from), i = r.search(iw(e, !1));
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
function ew(e) {
	let t = Object.keys(e).join(""), n = /\w/.test(t);
	return n && (t = t.replace(/\w/g, "")), `[${n ? "\\w" : ""}${t.replace(/[^\w\s]/g, "\\$&")}]`;
}
function tw(e) {
	let t = Object.create(null), n = Object.create(null);
	for (let { label: r } of e) {
		t[r[0]] = !0;
		for (let e = 1; e < r.length; e++) n[r[e]] = !0;
	}
	let r = ew(t) + ew(n) + "*$";
	return [RegExp("^" + r), new RegExp(r)];
}
function nw(e) {
	let t = e.map((e) => typeof e == "string" ? { label: e } : e), [n, r] = t.every((e) => /^\w+$/.test(e.label)) ? [/\w*$/, /\w+$/] : tw(t);
	return (e) => {
		let i = e.matchBefore(r);
		return i || e.explicit ? {
			from: i ? i.from : e.pos,
			options: t,
			validFor: n
		} : null;
	};
}
function rw(e, t) {
	return (n) => {
		for (let t = Y(n.state).resolveInner(n.pos, -1); t; t = t.parent) {
			if (e.indexOf(t.name) > -1) return null;
			if (t.type.isTop) break;
		}
		return t(n);
	};
}
function iw(e, t) {
	let { source: n } = e, r = t && n[0] != "^", i = n[n.length - 1] != "$";
	return !r && !i ? e : RegExp(`${r ? "^" : ""}(?:${n})${i ? "$" : ""}`, e.flags ?? (e.ignoreCase ? "i" : ""));
}
var aw = /*@__PURE__*/ Cc.define();
typeof navigator == "object" && navigator.platform;
var ow = /*@__PURE__*/ U.baseTheme({
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
}), sw = class {
	constructor(e, t, n, r) {
		this.field = e, this.line = t, this.from = n, this.to = r;
	}
}, cw = class e {
	constructor(e, t, n) {
		this.field = e, this.from = t, this.to = n;
	}
	map(t) {
		let n = t.mapPos(this.from, -1, Vs.TrackDel), r = t.mapPos(this.to, 1, Vs.TrackDel);
		return n == null || r == null ? null : new e(this.field, n, r);
	}
}, lw = class e {
	constructor(e, t) {
		this.lines = e, this.fieldPositions = t;
	}
	instantiate(e, t) {
		let n = [], r = [t], i = e.doc.lineAt(t), a = /^\s*/.exec(i.text)[0];
		for (let i of this.lines) {
			if (n.length) {
				let n = a, o = /^\t*/.exec(i)[0].length;
				for (let t = 0; t < o; t++) n += e.facet(i_);
				r.push(t + n.length - o), i = n + i.slice(o);
			}
			n.push(i), t += i.length + 1;
		}
		return {
			text: n,
			ranges: this.fieldPositions.map((e) => new cw(e.field, r[e.line] + e.from, r[e.line] + e.to))
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
				i.push(new sw(s, r.length, a.index, a.index + c.length)), e = e.slice(0, a.index) + o + e.slice(a.index + a[0].length);
			}
			e = e.replace(/\\([{}])/g, (e, t, n) => {
				for (let e of i) e.line == r.length && e.from > n && (e.from--, e.to--);
				return t;
			}), r.push(e);
		}
		return new e(r, i);
	}
}, uw = /*@__PURE__*/ Ul.widget({ widget: /*@__PURE__*/ new class extends Vl {
	toDOM() {
		let e = document.createElement("span");
		return e.className = "cm-snippetFieldPosition", e;
	}
	ignoreEvent() {
		return !1;
	}
}() }), dw = /*@__PURE__*/ Ul.mark({ class: "cm-snippetField" }), fw = class e {
	constructor(e, t) {
		this.ranges = e, this.active = t, this.deco = Ul.set(e.map((e) => (e.from == e.to ? uw : dw).range(e.from, e.to)), !0);
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
}, pw = /*@__PURE__*/ Ec.define({ map(e, t) {
	return e && e.map(t);
} }), mw = /*@__PURE__*/ Ec.define(), hw = /*@__PURE__*/ ac.define({
	create() {
		return null;
	},
	update(e, t) {
		for (let n of t.effects) {
			if (n.is(pw)) return n.value;
			if (n.is(mw) && e) return new fw(e.ranges, n.value);
		}
		return e && t.docChanged && (e = e.map(t.changes)), e && t.selection && !e.selectionInsideField(t.selection) && (e = null), e;
	},
	provide: (e) => U.decorations.from(e, (e) => e ? e.deco : Ul.none)
});
function gw(e, t) {
	return R.create(e.filter((e) => e.field == t).map((e) => R.range(e.from, e.to)));
}
function _w(e) {
	let t = lw.parse(e);
	return (e, n, r, i) => {
		let { text: a, ranges: o } = t.instantiate(e.state, r), { main: s } = e.state.selection, c = {
			changes: {
				from: r,
				to: i == s.from ? s.to : i,
				insert: L.of(a)
			},
			scrollIntoView: !0,
			annotations: n ? [aw.of(n), Dc.userEvent.of("input.complete")] : void 0
		};
		if (o.length && (c.selection = gw(o, 0)), o.some((e) => e.field > 0)) {
			let t = new fw(o, 0), n = c.effects = [pw.of(t)];
			e.state.field(hw, !1) === void 0 && n.push(Ec.appendConfig.of([
				hw,
				xw,
				Cw,
				ow
			]));
		}
		e.dispatch(e.state.update(c));
	};
}
function vw(e) {
	return ({ state: t, dispatch: n }) => {
		let r = t.field(hw, !1);
		if (!r || e < 0 && r.active == 0) return !1;
		let i = r.active + e, a = e > 0 && !r.ranges.some((t) => t.field == i + e);
		return n(t.update({
			selection: gw(r.ranges, i),
			effects: pw.of(a ? null : new fw(r.ranges, i)),
			scrollIntoView: !0
		})), !0;
	};
}
var yw = [{
	key: "Tab",
	run: /* @__PURE__ */ vw(1),
	shift: /* @__PURE__ */ vw(-1)
}, {
	key: "Escape",
	run: ({ state: e, dispatch: t }) => e.field(hw, !1) ? (t(e.update({ effects: pw.of(null) })), !0) : !1
}], bw = /*@__PURE__*/ z.define({ combine(e) {
	return e.length ? e[0] : yw;
} }), xw = /*@__PURE__*/ cc.highest(/*@__PURE__*/ km.compute([bw], (e) => e.facet(bw)));
function Sw(e, t) {
	return {
		...t,
		apply: _w(e)
	};
}
var Cw = /*@__PURE__*/ U.domEventHandlers({ mousedown(e, t) {
	let n = t.state.field(hw, !1), r;
	if (!n || (r = t.posAtCoords({
		x: e.clientX,
		y: e.clientY
	})) == null) return !1;
	let i = n.ranges.find((e) => e.from <= r && e.to >= r);
	return !i || i.field == n.active ? !1 : (t.dispatch({
		selection: gw(n.ranges, i.field),
		effects: pw.of(n.ranges.some((e) => e.field > i.field) ? new fw(n.ranges, i.field) : null),
		scrollIntoView: !0
	}), !0);
} }), ww = /*@__PURE__*/ new class extends Uc {}();
ww.startSide = 1, ww.endSide = -1, typeof navigator == "object" && navigator.userAgent;
//#endregion
//#region node_modules/@codemirror/lang-javascript/dist/index.js
var Tw = [
	/*@__PURE__*/ Sw("function ${name}(${params}) {\n	${}\n}", {
		label: "function",
		detail: "definition",
		type: "keyword"
	}),
	/*@__PURE__*/ Sw("for (let ${index} = 0; ${index} < ${bound}; ${index}++) {\n	${}\n}", {
		label: "for",
		detail: "loop",
		type: "keyword"
	}),
	/*@__PURE__*/ Sw("for (let ${name} of ${collection}) {\n	${}\n}", {
		label: "for",
		detail: "of loop",
		type: "keyword"
	}),
	/*@__PURE__*/ Sw("do {\n	${}\n} while (${})", {
		label: "do",
		detail: "loop",
		type: "keyword"
	}),
	/*@__PURE__*/ Sw("while (${}) {\n	${}\n}", {
		label: "while",
		detail: "loop",
		type: "keyword"
	}),
	/*@__PURE__*/ Sw("try {\n	${}\n} catch (${error}) {\n	${}\n}", {
		label: "try",
		detail: "/ catch block",
		type: "keyword"
	}),
	/*@__PURE__*/ Sw("if (${}) {\n	${}\n}", {
		label: "if",
		detail: "block",
		type: "keyword"
	}),
	/*@__PURE__*/ Sw("if (${}) {\n	${}\n} else {\n	${}\n}", {
		label: "if",
		detail: "/ else block",
		type: "keyword"
	}),
	/*@__PURE__*/ Sw("class ${name} {\n	constructor(${params}) {\n		${}\n	}\n}", {
		label: "class",
		detail: "definition",
		type: "keyword"
	}),
	/*@__PURE__*/ Sw("import {${names}} from \"${module}\"\n${}", {
		label: "import",
		detail: "named",
		type: "keyword"
	}),
	/*@__PURE__*/ Sw("import ${name} from \"${module}\"\n${}", {
		label: "import",
		detail: "default",
		type: "keyword"
	})
], Ew = /*@__PURE__*/ Tw.concat([
	/*@__PURE__*/ Sw("interface ${name} {\n	${}\n}", {
		label: "interface",
		detail: "definition",
		type: "keyword"
	}),
	/*@__PURE__*/ Sw("type ${name} = ${type}", {
		label: "type",
		detail: "definition",
		type: "keyword"
	}),
	/*@__PURE__*/ Sw("enum ${name} {\n	${}\n}", {
		label: "enum",
		detail: "definition",
		type: "keyword"
	})
]), Dw = /*@__PURE__*/ new Jh(), Ow = /*@__PURE__*/ new Set([
	"Script",
	"Block",
	"FunctionExpression",
	"FunctionDeclaration",
	"ArrowFunction",
	"MethodDeclaration",
	"ForStatement"
]);
function kw(e) {
	return (t, n) => {
		let r = t.node.getChild("VariableDefinition");
		return r && n(r, e), !0;
	};
}
var Aw = ["FunctionDeclaration"], jw = {
	FunctionDeclaration: /*@__PURE__*/ kw("function"),
	ClassDeclaration: /*@__PURE__*/ kw("class"),
	ClassExpression: () => !0,
	EnumDeclaration: /*@__PURE__*/ kw("constant"),
	TypeAliasDeclaration: /*@__PURE__*/ kw("type"),
	NamespaceDeclaration: /*@__PURE__*/ kw("namespace"),
	VariableDefinition(e, t) {
		e.matchContext(Aw) || t(e, "variable");
	},
	TypeDefinition(e, t) {
		t(e, "type");
	},
	__proto__: null
};
function Mw(e, t) {
	let n = Dw.get(t);
	if (n) return n;
	let r = [], i = !0;
	function a(t, n) {
		let i = e.sliceString(t.from, t.to);
		r.push({
			label: i,
			type: n
		});
	}
	return t.cursor(G.IncludeAnonymous).iterate((t) => {
		if (i) i = !1;
		else if (t.name) {
			let e = jw[t.name];
			if (e && e(t, a) || Ow.has(t.name)) return !1;
		} else if (t.to - t.from > 8192) {
			for (let n of Mw(e, t.node)) r.push(n);
			return !1;
		}
	}), Dw.set(t, r), r;
}
var Nw = /^[\w$\xa1-\uffff][\w$\d\xa1-\uffff]*$/, Pw = [
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
function Fw(e) {
	let t = Y(e.state).resolveInner(e.pos, -1);
	if (Pw.indexOf(t.name) > -1) return null;
	let n = t.name == "VariableName" || t.to - t.from < 20 && Nw.test(e.state.sliceDoc(t.from, t.to));
	if (!n && !e.explicit) return null;
	let r = [];
	for (let n = t; n; n = n.parent) Ow.has(n.name) && (r = r.concat(Mw(e.state.doc, n)));
	return {
		options: r,
		from: n ? t.from : e.pos,
		validFor: Nw
	};
}
var Iw = /*@__PURE__*/ Gg.define({
	name: "javascript",
	parser: /*@__PURE__*/ QC.configure({ props: [/*@__PURE__*/ l_.add({
		IfStatement: /*@__PURE__*/ x_({ except: /^\s*({|else\b)/ }),
		TryStatement: /*@__PURE__*/ x_({ except: /^\s*({|catch\b|finally\b)/ }),
		LabeledStatement: b_,
		SwitchBody: (e) => {
			let t = e.textAfter, n = /^\s*\}/.test(t), r = /^\s*(case|default)\b/.test(t);
			return e.baseIndent + (n ? 0 : r ? 1 : 2) * e.unit;
		},
		Block: /*@__PURE__*/ v_({ closing: "}" }),
		ArrowFunction: (e) => e.baseIndent + e.unit,
		"TemplateString BlockComment": () => null,
		"Statement Property": /*@__PURE__*/ x_({ except: /^\s*{/ }),
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
	}), /*@__PURE__*/ C_.add({
		"Block ClassBody SwitchBody EnumBody ObjectExpression ArrayExpression ObjectType": w_,
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
}), Lw = {
	test: (e) => /^JSX/.test(e.name),
	facet: /*@__PURE__*/ Vg({ commentTokens: { block: {
		open: "{/*",
		close: "*/}"
	} } })
}, Rw = /*@__PURE__*/ Iw.configure({ dialect: "ts" }, "typescript"), zw = /*@__PURE__*/ Iw.configure({
	dialect: "jsx",
	props: [/*@__PURE__*/ Hg.add((e) => e.isTop ? [Lw] : void 0)]
}), Bw = /*@__PURE__*/ Iw.configure({
	dialect: "jsx ts",
	props: [/*@__PURE__*/ Hg.add((e) => e.isTop ? [Lw] : void 0)]
}, "typescript"), Vw = (e) => ({
	label: e,
	type: "keyword"
}), Hw = /*@__PURE__*/ "break case const continue default delete export extends false finally in instanceof let new return static super switch this throw true typeof var yield".split(" ").map(Vw), Uw = /*@__PURE__*/ Hw.concat(/*@__PURE__*/ [
	"declare",
	"implements",
	"private",
	"protected",
	"public"
].map(Vw));
function Ww(e = {}) {
	let t = e.jsx ? e.typescript ? Bw : zw : e.typescript ? Rw : Iw, n = e.typescript ? Ew.concat(Uw) : Tw.concat(Hw);
	return new t_(t, [
		Iw.data.of({ autocomplete: rw(Pw, nw(n)) }),
		Iw.data.of({ autocomplete: Fw }),
		e.jsx ? Jw : []
	]);
}
function Gw(e) {
	for (;;) {
		if (e.name == "JSXOpenTag" || e.name == "JSXSelfClosingTag" || e.name == "JSXFragmentTag") return e;
		if (e.name == "JSXEscape" || !e.parent) return null;
		e = e.parent;
	}
}
function Kw(e, t, n = e.length) {
	for (let r = t?.firstChild; r; r = r.nextSibling) if (r.name == "JSXIdentifier" || r.name == "JSXBuiltin" || r.name == "JSXNamespacedName" || r.name == "JSXMemberExpression") return e.sliceString(r.from, Math.min(r.to, n));
	return "";
}
var qw = typeof navigator == "object" && /*@__PURE__*/ /Android\b/.test(navigator.userAgent), Jw = /*@__PURE__*/ U.inputHandler.of((e, t, n, r, i) => {
	if ((qw ? e.composing : e.compositionStarted) || e.state.readOnly || t != n || r != ">" && r != "/" || !Iw.isActiveAt(e.state, t, -1)) return !1;
	let a = i(), { state: o } = a, s = o.changeByRange((e) => {
		let { head: t } = e, n = Y(o).resolveInner(t - 1, -1), i;
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
				if (r && e.from == t - 2 && ((i = Kw(o.doc, r.firstChild, t)) || r.firstChild?.name == "JSXFragmentTag")) {
					let e = `${i}>`;
					return {
						range: R.cursor(t + e.length, -1),
						changes: {
							from: t,
							insert: e
						}
					};
				}
			} else if (r == ">") {
				let r = Gw(n);
				if (r && r.name == "JSXOpenTag" && !/^\/?>|^<\//.test(o.doc.sliceString(t, t + 2)) && (i = Kw(o.doc, r, t))) return {
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
}), Yw = [
	"_blank",
	"_self",
	"_top",
	"_parent"
], Xw = [
	"ascii",
	"utf-8",
	"utf-16",
	"latin1",
	"latin1"
], Zw = [
	"get",
	"post",
	"put",
	"delete"
], Qw = [
	"application/x-www-form-urlencoded",
	"multipart/form-data",
	"text/plain"
], $w = ["true", "false"], X = {}, eT = {
	a: { attrs: {
		href: null,
		ping: null,
		type: null,
		media: null,
		target: Yw,
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
		target: Yw
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
		formenctype: Qw,
		formmethod: Zw,
		formnovalidate: ["novalidate"],
		formtarget: Yw,
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
		"accept-charset": Xw,
		autocomplete: ["on", "off"],
		enctype: Qw,
		method: Zw,
		novalidate: ["novalidate"],
		target: Yw
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
		formenctype: Qw,
		formmethod: Zw,
		formnovalidate: ["novalidate"],
		formtarget: Yw,
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
		charset: Xw,
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
		charset: Xw
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
}, tT = {
	accesskey: null,
	class: null,
	contenteditable: $w,
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
	spellcheck: $w,
	autocorrect: $w,
	autocapitalize: $w,
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
	"aria-atomic": $w,
	"aria-autocomplete": [
		"inline",
		"list",
		"both",
		"none"
	],
	"aria-busy": $w,
	"aria-checked": [
		"true",
		"false",
		"mixed",
		"undefined"
	],
	"aria-controls": null,
	"aria-describedby": null,
	"aria-disabled": $w,
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
	"aria-haspopup": $w,
	"aria-hidden": $w,
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
	"aria-multiline": $w,
	"aria-multiselectable": $w,
	"aria-owns": null,
	"aria-posinset": null,
	"aria-pressed": [
		"true",
		"false",
		"mixed",
		"undefined"
	],
	"aria-readonly": $w,
	"aria-relevant": null,
	"aria-required": $w,
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
}, nT = /*@__PURE__*/ "beforeunload copy cut dragstart dragover dragleave dragenter dragend drag paste focus blur change click load mousedown mouseenter mouseleave mouseup keydown keyup resize scroll unload".split(" ").map((e) => "on" + e);
for (let e of nT) tT[e] = null;
var rT = class {
	constructor(e, t) {
		this.tags = {
			...eT,
			...e
		}, this.globalAttrs = {
			...tT,
			...t
		}, this.allTags = Object.keys(this.tags), this.globalAttrNames = Object.keys(this.globalAttrs);
	}
};
rT.default = /*@__PURE__*/ new rT();
function iT(e, t, n = e.length) {
	if (!t) return "";
	let r = t.firstChild, i = r && r.getChild("TagName");
	return i ? e.sliceString(i.from, Math.min(i.to, n)) : "";
}
function aT(e, t = !1) {
	for (; e; e = e.parent) if (e.name == "Element") {
		if (t) t = !1;
		else return e;
	}
	return null;
}
function oT(e, t, n) {
	return n.tags[iT(e, aT(t))]?.children || n.allTags;
}
function sT(e, t) {
	let n = [];
	for (let r = aT(t); r && !r.type.isTop; r = aT(r.parent)) {
		let i = iT(e, r);
		if (i && r.lastChild.name == "CloseTag") break;
		i && n.indexOf(i) < 0 && (t.name == "EndTag" || t.from >= r.firstChild.to) && n.push(i);
	}
	return n;
}
var cT = /^[:\-\.\w\u00b7-\uffff]*$/;
function lT(e, t, n, r, i) {
	let a = /\s*>/.test(e.sliceDoc(i, i + 5)) ? "" : ">", o = aT(n, n.name == "StartTag" || n.name == "TagName");
	return {
		from: r,
		to: i,
		options: oT(e.doc, o, t).map((e) => ({
			label: e,
			type: "type"
		})).concat(sT(e.doc, n).map((e, t) => ({
			label: "/" + e,
			apply: "/" + e + a,
			type: "type",
			boost: 99 - t
		}))),
		validFor: /^\/?[:\-\.\w\u00b7-\uffff]*$/
	};
}
function uT(e, t, n, r) {
	let i = /\s*>/.test(e.sliceDoc(r, r + 5)) ? "" : ">";
	return {
		from: n,
		to: r,
		options: sT(e.doc, t).map((e, t) => ({
			label: e,
			apply: e + i,
			type: "type",
			boost: 99 - t
		})),
		validFor: cT
	};
}
function dT(e, t, n, r) {
	let i = [], a = 0;
	for (let r of oT(e.doc, n, t)) i.push({
		label: "<" + r,
		type: "type"
	});
	for (let t of sT(e.doc, n)) i.push({
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
function fT(e, t, n, r, i) {
	let a = aT(n), o = a ? t.tags[iT(e.doc, a)] : null, s = o && o.attrs ? Object.keys(o.attrs) : [];
	return {
		from: r,
		to: i,
		options: (o && o.globalAttrs === !1 ? s : s.length ? s.concat(t.globalAttrNames) : t.globalAttrNames).map((e) => ({
			label: e,
			type: "property"
		})),
		validFor: cT
	};
}
function pT(e, t, n, r, i) {
	let a = n.parent?.getChild("AttributeName"), o = [], s;
	if (a) {
		let c = e.sliceDoc(a.from, a.to), l = t.globalAttrs[c];
		if (!l) {
			let r = aT(n), i = r ? t.tags[iT(e.doc, r)] : null;
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
function mT(e, t) {
	let { state: n, pos: r } = t, i = Y(n).resolveInner(r, -1), a = i.resolve(r);
	for (let e = r, t; a == i && (t = i.childBefore(e));) {
		let n = t.lastChild;
		if (!n || !n.type.isError || n.from < n.to) break;
		a = i = t, e = n.from;
	}
	return i.name == "TagName" ? i.parent && /CloseTag$/.test(i.parent.name) ? uT(n, i, i.from, r) : lT(n, e, i, i.from, r) : i.name == "StartTag" || i.name == "IncompleteTag" ? lT(n, e, i, r, r) : i.name == "StartCloseTag" || i.name == "IncompleteCloseTag" ? uT(n, i, r, r) : i.name == "OpenTag" || i.name == "SelfClosingTag" || i.name == "AttributeName" ? fT(n, e, i, i.name == "AttributeName" ? i.from : r, r) : i.name == "Is" || i.name == "AttributeValue" || i.name == "UnquotedAttributeValue" ? pT(n, e, i, i.name == "Is" ? r : i.from, r) : t.explicit && (a.name == "Element" || a.name == "Text" || a.name == "Document") ? dT(n, e, i, r) : null;
}
function hT(e) {
	return mT(rT.default, e);
}
function gT(e) {
	let { extraTags: t, extraGlobalAttributes: n } = e, r = n || t ? new rT(t, n) : rT.default;
	return (e) => mT(r, e);
}
var _T = /*@__PURE__*/ Iw.parser.configure({ top: "SingleExpression" }), vT = [
	{
		tag: "script",
		attrs: (e) => e.type == "text/typescript" || e.lang == "ts",
		parser: Rw.parser
	},
	{
		tag: "script",
		attrs: (e) => e.type == "text/babel" || e.type == "text/jsx",
		parser: zw.parser
	},
	{
		tag: "script",
		attrs: (e) => e.type == "text/typescript-jsx",
		parser: Bw.parser
	},
	{
		tag: "script",
		attrs(e) {
			return /^(importmap|speculationrules|application\/(.+\+)?json)$/i.test(e.type);
		},
		parser: _T
	},
	{
		tag: "script",
		attrs(e) {
			return !e.type || /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i.test(e.type);
		},
		parser: Iw.parser
	},
	{
		tag: "style",
		attrs(e) {
			return (!e.lang || e.lang == "css") && (!e.type || /^(text\/)?(x-)?(stylesheet|css)$/i.test(e.type));
		},
		parser: aS.parser
	}
], yT = /*@__PURE__*/ [{
	name: "style",
	parser: /*@__PURE__*/ aS.parser.configure({ top: "Styles" })
}].concat(/*@__PURE__*/ nT.map((e) => ({
	name: e,
	parser: Iw.parser
}))), bT = /*@__PURE__*/ Gg.define({
	name: "html",
	parser: /*@__PURE__*/ fC.configure({ props: [
		/*@__PURE__*/ l_.add({
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
		/*@__PURE__*/ C_.add({ Element(e) {
			let t = e.firstChild, n = e.lastChild;
			return !t || t.name != "OpenTag" ? null : {
				from: t.to,
				to: n.name == "CloseTag" ? n.from : e.to
			};
		} }),
		/*@__PURE__*/ F_.add({ "OpenTag CloseTag": (e) => e.getChild("TagName") })
	] }),
	languageData: {
		commentTokens: { block: {
			open: "<!--",
			close: "-->"
		} },
		indentOnInput: /^\s*<\/\w+\W$/,
		wordChars: "-_"
	}
}), xT = /*@__PURE__*/ bT.configure({ wrap: /*@__PURE__*/ gC(vT, yT) });
function ST(e = {}) {
	let t = "", n;
	return e.matchClosingTags === !1 && (t = "noMatch"), e.selfClosingTags === !0 && (t = (t ? t + " " : "") + "selfClosing"), (e.nestedLanguages && e.nestedLanguages.length || e.nestedAttributes && e.nestedAttributes.length) && (n = gC((e.nestedLanguages || []).concat(vT), (e.nestedAttributes || []).concat(yT))), new t_(n ? bT.configure({
		wrap: n,
		dialect: t
	}) : t ? xT.configure({ dialect: t }) : xT, [
		xT.data.of({ autocomplete: gT(e) }),
		e.autoCloseTags === !1 ? [] : TT,
		Ww().support,
		oS().support
	]);
}
var CT = /*@__PURE__*/ new Set(/*@__PURE__*/ "area base br col command embed frame hr img input keygen link meta param source track wbr menuitem".split(" "));
function wT(e, t, n) {
	for (;;) {
		if (t.lastChild?.name != "CloseTag") return !1;
		let r = t.parent;
		if (!r || iT(e, r) != n) return !0;
		t = r;
	}
}
var TT = /*@__PURE__*/ U.inputHandler.of((e, t, n, r, i) => {
	if (e.composing || e.state.readOnly || t != n || r != ">" && r != "/" || !xT.isActiveAt(e.state, t, -1)) return !1;
	let a = i(), { state: o } = a, s = o.changeByRange((e) => {
		let t = o.doc.sliceString(e.from - 1, e.to) == r, { head: n } = e, i = Y(o).resolveInner(n, -1), a;
		if (t && r == ">" && i.name == "EndTag") {
			let t = i.parent;
			if ((a = iT(o.doc, t.parent, n)) && !CT.has(a) && !wT(o.doc, t.parent, a)) return {
				range: e,
				changes: {
					from: n,
					to: n + +(o.doc.sliceString(n, n + 1) === ">"),
					insert: `</${a}>`
				}
			};
		} else if (t && r == "/" && i.name == "IncompleteCloseTag") {
			let e = i.parent;
			if (i.from == n - 2 && e.lastChild?.name != "CloseTag" && (a = iT(o.doc, e, n)) && !CT.has(a)) {
				let e = n + +(o.doc.sliceString(n, n + 1) === ">"), t = `${a}>`;
				return {
					range: R.cursor(n + t.length, -1),
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
}), ET = vg({
	String: J.string,
	Number: J.number,
	"True False": J.bool,
	PropertyName: J.propertyName,
	Null: J.null,
	", :": J.separator,
	"[ ]": J.squareBracket,
	"{ }": J.brace
}), DT = rx.deserialize({
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
	propSources: [ET],
	skippedNodes: [0],
	repeatNodeCount: 2,
	tokenData: "(|~RaXY!WYZ!W]^!Wpq!Wrs!]|}$u}!O$z!Q!R%T!R![&c![!]&t!}#O&y#P#Q'O#Y#Z'T#b#c'r#h#i(Z#o#p(r#q#r(w~!]Oe~~!`Wpq!]qr!]rs!xs#O!]#O#P!}#P;'S!];'S;=`$o<%lO!]~!}Og~~#QXrs!]!P!Q!]#O#P!]#U#V!]#Y#Z!]#b#c!]#f#g!]#h#i!]#i#j#m~#pR!Q![#y!c!i#y#T#Z#y~#|R!Q![$V!c!i$V#T#Z$V~$YR!Q![$c!c!i$c#T#Z$c~$fR!Q![!]!c!i!]#T#Z!]~$rP;=`<%l!]~$zO]~~$}Q!Q!R%T!R![&c~%YRT~!O!P%c!g!h%w#X#Y%w~%fP!Q![%i~%nRT~!Q![%i!g!h%w#X#Y%w~%zR{|&T}!O&T!Q![&Z~&WP!Q![&Z~&`PT~!Q![&Z~&hST~!O!P%c!Q![&c!g!h%w#X#Y%w~&yO[~~'OO_~~'TO^~~'WP#T#U'Z~'^P#`#a'a~'dP#g#h'g~'jP#X#Y'm~'rOR~~'uP#i#j'x~'{P#`#a(O~(RP#`#a(U~(ZOS~~(^P#f#g(a~(dP#i#j(g~(jP#X#Y(m~(rOQ~~(wOW~~(|OV~",
	tokenizers: [0],
	topRules: { JsonText: [0, 1] },
	tokenPrec: 0
}), OT = /*@__PURE__*/ Gg.define({
	name: "json",
	parser: /*@__PURE__*/ DT.configure({ props: [/*@__PURE__*/ l_.add({
		Object: /*@__PURE__*/ x_({ except: /^\s*\}/ }),
		Array: /*@__PURE__*/ x_({ except: /^\s*\]/ })
	}), /*@__PURE__*/ C_.add({ "Object Array": w_ })] }),
	languageData: {
		closeBrackets: { brackets: [
			"[",
			"{",
			"\""
		] },
		indentOnInput: /^\s*[\}\]]$/
	}
});
function kT() {
	return new t_(OT);
}
//#endregion
//#region node_modules/@lezer/markdown/dist/index.js
var AT = class e {
	static create(t, n, r, i, a) {
		let o = i + (i << 8) + t + (n << 4) | 0;
		return new e(t, n, r, o, a, [], []);
	}
	constructor(e, t, n, r, i, a, o) {
		this.type = e, this.value = t, this.from = n, this.hash = r, this.end = i, this.children = a, this.positions = o, this.hashProp = [[W.contextHash, r]];
	}
	addChild(e, t) {
		e.prop(W.contextHash) != this.hash && (e = new K(e.type, e.children, e.positions, e.length, this.hashProp)), this.children.push(e), this.positions.push(t);
	}
	toTree(e, t = this.end) {
		let n = this.children.length - 1;
		return n >= 0 && (t = Math.max(t, this.positions[n] + this.children[n].length + this.from)), new K(e.types[this.type], this.children, this.positions, t - this.from).balance({ makeTree: (e, t, n) => new K(Th.none, e, t, n, this.hashProp) });
	}
}, Z;
(function(e) {
	e[e.Document = 1] = "Document", e[e.CodeBlock = 2] = "CodeBlock", e[e.FencedCode = 3] = "FencedCode", e[e.Blockquote = 4] = "Blockquote", e[e.HorizontalRule = 5] = "HorizontalRule", e[e.BulletList = 6] = "BulletList", e[e.OrderedList = 7] = "OrderedList", e[e.ListItem = 8] = "ListItem", e[e.ATXHeading1 = 9] = "ATXHeading1", e[e.ATXHeading2 = 10] = "ATXHeading2", e[e.ATXHeading3 = 11] = "ATXHeading3", e[e.ATXHeading4 = 12] = "ATXHeading4", e[e.ATXHeading5 = 13] = "ATXHeading5", e[e.ATXHeading6 = 14] = "ATXHeading6", e[e.SetextHeading1 = 15] = "SetextHeading1", e[e.SetextHeading2 = 16] = "SetextHeading2", e[e.HTMLBlock = 17] = "HTMLBlock", e[e.LinkReference = 18] = "LinkReference", e[e.Paragraph = 19] = "Paragraph", e[e.CommentBlock = 20] = "CommentBlock", e[e.ProcessingInstructionBlock = 21] = "ProcessingInstructionBlock", e[e.Escape = 22] = "Escape", e[e.Entity = 23] = "Entity", e[e.HardBreak = 24] = "HardBreak", e[e.Emphasis = 25] = "Emphasis", e[e.StrongEmphasis = 26] = "StrongEmphasis", e[e.Link = 27] = "Link", e[e.Image = 28] = "Image", e[e.InlineCode = 29] = "InlineCode", e[e.HTMLTag = 30] = "HTMLTag", e[e.Comment = 31] = "Comment", e[e.ProcessingInstruction = 32] = "ProcessingInstruction", e[e.Autolink = 33] = "Autolink", e[e.HeaderMark = 34] = "HeaderMark", e[e.QuoteMark = 35] = "QuoteMark", e[e.ListMark = 36] = "ListMark", e[e.LinkMark = 37] = "LinkMark", e[e.EmphasisMark = 38] = "EmphasisMark", e[e.CodeMark = 39] = "CodeMark", e[e.CodeText = 40] = "CodeText", e[e.CodeInfo = 41] = "CodeInfo", e[e.LinkTitle = 42] = "LinkTitle", e[e.LinkLabel = 43] = "LinkLabel", e[e.URL = 44] = "URL";
})(Z ||= {});
var jT = class {
	constructor(e, t) {
		this.start = e, this.content = t, this.marks = [], this.parsers = [];
	}
}, MT = class {
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
		return IT(this.text, e);
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
function NT(e, t, n) {
	if (n.pos == n.text.length || e != t.block && n.indent >= t.stack[n.depth + 1].value + n.baseIndent) return !0;
	if (n.indent >= n.baseIndent + 4) return !1;
	let r = (e.type == Z.OrderedList ? UT : HT)(n, t, !1);
	return r > 0 && (e.type != Z.BulletList || BT(n, t, !1) < 0) && n.text.charCodeAt(n.pos + r - 1) == e.value;
}
var PT = {
	[Z.Blockquote](e, t, n) {
		return n.next == 62 && (n.markers.push(Q(Z.QuoteMark, t.lineStart + n.pos, t.lineStart + n.pos + 1)), n.moveBase(n.pos + (FT(n.text.charCodeAt(n.pos + 1)) ? 2 : 1)), e.end = t.lineStart + n.text.length, !0);
	},
	[Z.ListItem](e, t, n) {
		return n.indent < n.baseIndent + e.value && n.next > -1 ? !1 : (n.moveBaseColumn(n.baseIndent + e.value), !0);
	},
	[Z.OrderedList]: NT,
	[Z.BulletList]: NT,
	[Z.Document]() {
		return !0;
	}
};
function FT(e) {
	return e == 32 || e == 9 || e == 10 || e == 13;
}
function IT(e, t = 0) {
	for (; t < e.length && FT(e.charCodeAt(t));) t++;
	return t;
}
function LT(e, t, n) {
	for (; t > n && FT(e.charCodeAt(t - 1));) t--;
	return t;
}
function RT(e) {
	if (e.next != 96 && e.next != 126) return -1;
	let t = e.pos + 1;
	for (; t < e.text.length && e.text.charCodeAt(t) == e.next;) t++;
	if (t < e.pos + 3) return -1;
	if (e.next == 96) {
		for (let n = t; n < e.text.length; n++) if (e.text.charCodeAt(n) == 96) return -1;
	}
	return t;
}
function zT(e) {
	return e.next == 62 ? e.text.charCodeAt(e.pos + 1) == 32 ? 2 : 1 : -1;
}
function BT(e, t, n) {
	if (e.next != 42 && e.next != 45 && e.next != 95) return -1;
	let r = 1;
	for (let t = e.pos + 1; t < e.text.length; t++) {
		let n = e.text.charCodeAt(t);
		if (n == e.next) r++;
		else if (!FT(n)) return -1;
	}
	return n && e.next == 45 && GT(e) > -1 && e.depth == t.stack.length && t.parser.leafBlockParsers.indexOf(rE.SetextHeading) > -1 || r < 3 ? -1 : 1;
}
function VT(e, t) {
	for (let n = e.stack.length - 1; n >= 0; n--) if (e.stack[n].type == t) return !0;
	return !1;
}
function HT(e, t, n) {
	return (e.next == 45 || e.next == 43 || e.next == 42) && (e.pos == e.text.length - 1 || FT(e.text.charCodeAt(e.pos + 1))) && (!n || VT(t, Z.BulletList) || e.skipSpace(e.pos + 2) < e.text.length) ? 1 : -1;
}
function UT(e, t, n) {
	let r = e.pos, i = e.next;
	for (; i >= 48 && i <= 57;) {
		if (r++, r == e.text.length) return -1;
		i = e.text.charCodeAt(r);
	}
	return r == e.pos || r > e.pos + 9 || i != 46 && i != 41 || r < e.text.length - 1 && !FT(e.text.charCodeAt(r + 1)) || n && !VT(t, Z.OrderedList) && (e.skipSpace(r + 1) == e.text.length || r > e.pos + 1 || e.next != 49) ? -1 : r + 1 - e.pos;
}
function WT(e) {
	if (e.next != 35) return -1;
	let t = e.pos + 1;
	for (; t < e.text.length && e.text.charCodeAt(t) == 35;) t++;
	if (t < e.text.length && e.text.charCodeAt(t) != 32) return -1;
	let n = t - e.pos;
	return n > 6 ? -1 : n;
}
function GT(e) {
	if (e.next != 45 && e.next != 61 || e.indent >= e.baseIndent + 4) return -1;
	let t = e.pos + 1;
	for (; t < e.text.length && e.text.charCodeAt(t) == e.next;) t++;
	let n = t;
	for (; t < e.text.length && FT(e.text.charCodeAt(t));) t++;
	return t == e.text.length ? n : -1;
}
var KT = /^[ \t]*$/, qT = /-->/, JT = /\?>/, YT = [
	[/^<(?:script|pre|style)(?:\s|>|$)/i, /<\/(?:script|pre|style)>/i],
	[/^\s*<!--/, qT],
	[/^\s*<\?/, JT],
	[/^\s*<![A-Z]/, />/],
	[/^\s*<!\[CDATA\[/, /\]\]>/],
	[/^\s*<\/?(?:address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?:\s|\/?>|$)/i, KT],
	[/^\s*(?:<\/[a-z][\w-]*\s*>|<[a-z][\w-]*(\s+[a-z:_][\w-.]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*>)\s*$/i, KT]
];
function XT(e, t, n) {
	if (e.next != 60) return -1;
	let r = e.text.slice(e.pos);
	for (let e = 0, t = YT.length - +!!n; e < t; e++) if (YT[e][0].test(r)) return e;
	return -1;
}
function ZT(e, t) {
	let n = e.countIndent(t, e.pos, e.indent), r = e.skipSpace(t), i = e.countIndent(r, t, n);
	return i >= n + 5 || r == e.text.length ? n + 1 : i;
}
function QT(e, t, n) {
	let r = e.length - 1;
	r >= 0 && e[r].to == t && e[r].type == Z.CodeText ? e[r].to = n : e.push(Q(Z.CodeText, t, n));
}
var $T = {
	LinkReference: void 0,
	IndentedCode(e, t) {
		let n = t.baseIndent + 4;
		if (t.indent < n) return !1;
		let r = t.findColumn(n), i = e.lineStart + r, a = e.lineStart + t.text.length, o = [], s = [];
		for (QT(o, i, a); e.nextLine() && t.depth >= e.stack.length;) if (t.pos == t.text.length) {
			QT(s, e.lineStart - 1, e.lineStart);
			for (let e of t.markers) s.push(e);
		} else if (t.indent < n) break;
		else {
			if (s.length) {
				for (let e of s) e.type == Z.CodeText ? QT(o, e.from, e.to) : o.push(e);
				s = [];
			}
			QT(o, e.lineStart - 1, e.lineStart);
			for (let e of t.markers) o.push(e);
			a = e.lineStart + t.text.length;
			let n = e.lineStart + t.findColumn(t.baseIndent + 4);
			n < a && QT(o, n, a);
		}
		return s.length && (s = s.filter((e) => e.type != Z.CodeText), s.length && (t.markers = s.concat(t.markers))), e.addNode(e.buffer.writeElements(o, -i).finish(Z.CodeBlock, a - i), i), !0;
	},
	FencedCode(e, t) {
		let n = RT(t);
		if (n < 0) return !1;
		let r = e.lineStart + t.pos, i = t.next, a = n - t.pos, o = t.skipSpace(n), s = LT(t.text, t.text.length, o), c = [Q(Z.CodeMark, r, r + a)];
		o < s && c.push(Q(Z.CodeInfo, e.lineStart + o, e.lineStart + s));
		for (let n = !0, r = !0, o = !1; e.nextLine() && t.depth >= e.stack.length; n = !1) {
			let s = t.pos;
			if (t.indent - t.baseIndent < 4) for (; s < t.text.length && t.text.charCodeAt(s) == i;) s++;
			if (s - t.pos >= a && t.skipSpace(s) == t.text.length) {
				for (let e of t.markers) c.push(e);
				r && o && QT(c, e.lineStart - 1, e.lineStart), c.push(Q(Z.CodeMark, e.lineStart + t.pos, e.lineStart + s)), e.nextLine();
				break;
			}
			{
				o = !0, n || (QT(c, e.lineStart - 1, e.lineStart), r = !1);
				for (let e of t.markers) c.push(e);
				let i = e.lineStart + t.basePos, a = e.lineStart + t.text.length;
				i < a && (QT(c, i, a), r = !1);
			}
		}
		return e.addNode(e.buffer.writeElements(c, -r).finish(Z.FencedCode, e.prevLineEnd() - r), r), !0;
	},
	Blockquote(e, t) {
		let n = zT(t);
		return n < 0 ? !1 : (e.startContext(Z.Blockquote, t.pos), e.addNode(Z.QuoteMark, e.lineStart + t.pos, e.lineStart + t.pos + 1), t.moveBase(t.pos + n), null);
	},
	HorizontalRule(e, t) {
		if (BT(t, e, !1) < 0) return !1;
		let n = e.lineStart + t.pos;
		return e.nextLine(), e.addNode(Z.HorizontalRule, n), !0;
	},
	BulletList(e, t) {
		let n = HT(t, e, !1);
		if (n < 0) return !1;
		e.block.type != Z.BulletList && e.startContext(Z.BulletList, t.basePos, t.next);
		let r = ZT(t, t.pos + 1);
		return e.startContext(Z.ListItem, t.basePos, r - t.baseIndent), e.addNode(Z.ListMark, e.lineStart + t.pos, e.lineStart + t.pos + n), t.moveBaseColumn(r), null;
	},
	OrderedList(e, t) {
		let n = UT(t, e, !1);
		if (n < 0) return !1;
		e.block.type != Z.OrderedList && e.startContext(Z.OrderedList, t.basePos, t.text.charCodeAt(t.pos + n - 1));
		let r = ZT(t, t.pos + n);
		return e.startContext(Z.ListItem, t.basePos, r - t.baseIndent), e.addNode(Z.ListMark, e.lineStart + t.pos, e.lineStart + t.pos + n), t.moveBaseColumn(r), null;
	},
	ATXHeading(e, t) {
		let n = WT(t);
		if (n < 0) return !1;
		let r = t.pos, i = e.lineStart + r, a = LT(t.text, t.text.length, r), o = a;
		for (; o > r && t.text.charCodeAt(o - 1) == t.next;) o--;
		(o == a || o == r || !FT(t.text.charCodeAt(o - 1))) && (o = t.text.length);
		let s = e.buffer.write(Z.HeaderMark, 0, n).writeElements(e.parser.parseInline(t.text.slice(r + n + 1, o), i + n + 1), -i);
		o < t.text.length && s.write(Z.HeaderMark, o - r, a - r);
		let c = s.finish(Z.ATXHeading1 - 1 + n, t.text.length - r);
		return e.nextLine(), e.addNode(c, i), !0;
	},
	HTMLBlock(e, t) {
		let n = XT(t, e, !1);
		if (n < 0) return !1;
		let r = e.lineStart + t.pos, i = YT[n][1], a = [], o = i != KT;
		for (; !i.test(t.text) && e.nextLine();) {
			if (t.depth < e.stack.length) {
				o = !1;
				break;
			}
			for (let e of t.markers) a.push(e);
		}
		o && e.nextLine();
		let s = i == qT ? Z.CommentBlock : i == JT ? Z.ProcessingInstructionBlock : Z.HTMLBlock, c = e.prevLineEnd();
		return e.addNode(e.buffer.writeElements(a, -r).finish(s, c - r), r), !0;
	},
	SetextHeading: void 0
}, eE = class {
	constructor(e) {
		this.stage = 0, this.elts = [], this.pos = 0, this.start = e.start, this.advance(e.content);
	}
	nextLine(e, t, n) {
		if (this.stage == -1) return !1;
		let r = n.content + "\n" + t.scrub(), i = this.advance(r);
		return i > -1 && i < r.length && this.complete(e, n, i);
	}
	finish(e, t) {
		return (this.stage == 2 || this.stage == 3) && IT(t.content, this.pos) == t.content.length && this.complete(e, t, t.content.length);
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
			if (!this.nextStage(OE(e, this.pos, this.start, !0))) return -1;
			if (e.charCodeAt(this.pos) != 58) return this.stage = -1;
			this.elts.push(Q(Z.LinkMark, this.pos + this.start, this.pos + this.start + 1)), this.pos++;
		} else if (this.stage == 1) {
			if (!this.nextStage(EE(e, IT(e, this.pos), this.start))) return -1;
		} else if (this.stage == 2) {
			let t = IT(e, this.pos), n = 0;
			if (t > this.pos) {
				let r = DE(e, t, this.start);
				if (r) {
					let t = tE(e, r.to - this.start);
					t > 0 && (this.nextStage(r), n = t);
				}
			}
			return n ||= tE(e, this.pos), n > 0 && n < e.length ? n : -1;
		} else return tE(e, this.pos);
	}
};
function tE(e, t) {
	for (; t < e.length; t++) {
		let n = e.charCodeAt(t);
		if (n == 10) break;
		if (!FT(n)) return -1;
	}
	return t;
}
var nE = class {
	nextLine(e, t, n) {
		let r = t.depth < e.stack.length ? -1 : GT(t), i = t.next;
		if (r < 0) return !1;
		let a = Q(Z.HeaderMark, e.lineStart + t.pos, e.lineStart + r);
		return e.nextLine(), e.addLeafElement(n, Q(i == 61 ? Z.SetextHeading1 : Z.SetextHeading2, n.start, e.prevLineEnd(), [...e.parser.parseInline(n.content, n.start), a])), !0;
	}
	finish() {
		return !1;
	}
}, rE = {
	LinkReference(e, t) {
		return t.content.charCodeAt(0) == 91 ? new eE(t) : null;
	},
	SetextHeading() {
		return new nE();
	}
}, iE = [
	(e, t) => WT(t) >= 0,
	(e, t) => RT(t) >= 0,
	(e, t) => zT(t) >= 0,
	(e, t) => HT(t, e, !0) >= 0,
	(e, t) => UT(t, e, !0) >= 0,
	(e, t) => BT(t, e, !0) >= 0,
	(e, t) => XT(t, e, !0) >= 0
], aE = {
	text: "",
	end: 0
}, oE = class {
	constructor(e, t, n, r) {
		this.parser = e, this.input = t, this.ranges = r, this.line = new MT(), this.atEnd = !1, this.reusePlaceholders = /* @__PURE__ */ new Map(), this.stoppedAt = null, this.rangeI = 0, this.to = r[r.length - 1].to, this.lineStart = this.absoluteLineStart = this.absoluteLineEnd = r[0].from, this.block = AT.create(Z.Document, 0, this.lineStart, 0, 0), this.stack = [this.block], this.fragments = n.length ? new ME(n, t) : null, this.readLine();
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
		start: for (;;) {
			for (let t of this.parser.blockParsers) if (t) {
				let n = t(this, e);
				if (n != 0) {
					if (n == 1) return null;
					e.forward();
					continue start;
				}
			}
			break;
		}
		if (e.pos == e.text.length) return this.nextLine() ? null : this.finish();
		let t = new jT(this.lineStart + e.pos, e.text.slice(e.pos));
		for (let e of this.parser.leafBlockParsers) if (e) {
			let n = e(this, t);
			n && t.parsers.push(n);
		}
		lines: for (; this.nextLine() && e.pos != e.text.length;) {
			if (e.indent < e.baseIndent + 4) {
				for (let n of this.parser.endLeafBlock) if (n(this, e, t)) break lines;
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
		return t ? (this.absoluteLineStart += t, this.lineStart = NE(this.absoluteLineStart, this.ranges), this.moveRangeI(), this.absoluteLineStart < this.to ? (this.lineStart++, this.absoluteLineStart++, this.readLine()) : (this.atEnd = !0, this.readLine()), !0) : !1;
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
		let t = aE;
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
		this.block = AT.create(e, n, this.lineStart + t, this.block.hash, this.lineStart + this.line.text.length), this.stack.push(this.block);
	}
	startComposite(e, t, n = 0) {
		this.startContext(this.parser.getNodeType(e), t, n);
	}
	addNode(e, t, n) {
		typeof e == "number" && (e = new K(this.parser.nodeSet.types[e], pE, pE, (n ?? this.prevLineEnd()) - t)), this.block.addChild(e, t - this.block.from);
	}
	addElement(e) {
		this.block.addChild(e.toTree(this.parser.nodeSet), e.from - this.block.from);
	}
	addLeafElement(e, t) {
		this.addNode(this.buffer.writeElements(AE(t.children, e.marks), -t.from).finish(t.type, t.to - t.from), t.from);
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
		return this.ranges.length > 1 ? sE(this.ranges, 0, e.topNode, this.ranges[0].from, this.reusePlaceholders) : e;
	}
	finishLeaf(e) {
		for (let t of e.parsers) if (t.finish(this, e)) return;
		let t = AE(this.parser.parseInline(e.content, e.start), e.marks);
		this.addNode(this.buffer.writeElements(t, -e.start).finish(Z.Paragraph, e.content.length), e.start);
	}
	elt(e, t, n, r) {
		return typeof e == "string" ? Q(this.parser.getNodeType(e), t, n, r) : new gE(e, t);
	}
	get buffer() {
		return new mE(this.parser.nodeSet);
	}
};
function sE(e, t, n, r, i) {
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
		f ? d = f : u.to + r > a ? (d = sE(e, t, u, r, i), l(u.to + r, !1)) : d = u.toTree(), o.push(d), s.push(n - c);
	}
	return l(n.to + r, !1), new K(n.type, o, s, n.to + r - c, n.tree ? n.tree.propValues : void 0);
}
var cE = class e extends Xh {
	constructor(e, t, n, r, i, a, o, s, c) {
		super(), this.nodeSet = e, this.blockParsers = t, this.leafBlockParsers = n, this.blockNames = r, this.endLeafBlock = i, this.skipContextMarkup = a, this.inlineParsers = o, this.inlineNames = s, this.wrappers = c, this.nodeTypes = Object.create(null);
		for (let t of e.types) this.nodeTypes[t.name] = t.id;
	}
	createParse(e, t, n) {
		let r = new oE(this, e, t, n);
		for (let i of this.wrappers) r = i(r, e, t, n);
		return r;
	}
	configure(t) {
		let n = uE(t);
		if (!n) return this;
		let { nodeSet: r, skipContextMarkup: i } = this, a = this.blockParsers.slice(), o = this.leafBlockParsers.slice(), s = this.blockNames.slice(), c = this.inlineParsers.slice(), l = this.inlineNames.slice(), u = this.endLeafBlock.slice(), d = this.wrappers;
		if (lE(n.defineNodes)) {
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
				e.push(Th.define({
					id: c,
					name: n,
					props: l && [[W.group, l]]
				})), s && (t ||= {}, Array.isArray(s) || s instanceof pg ? t[n] = s : Object.assign(t, s));
			}
			r = new Eh(e), t && (r = r.extend(vg(t)));
		}
		if (lE(n.props) && (r = r.extend(...n.props)), lE(n.remove)) for (let e of n.remove) {
			let t = this.blockNames.indexOf(e), n = this.inlineNames.indexOf(e);
			t > -1 && (a[t] = o[t] = void 0), n > -1 && (c[n] = void 0);
		}
		if (lE(n.parseBlock)) for (let e of n.parseBlock) {
			let t = s.indexOf(e.name);
			if (t > -1) a[t] = e.parse, o[t] = e.leaf;
			else {
				let t = e.before ? dE(s, e.before) : e.after ? dE(s, e.after) + 1 : s.length - 1;
				a.splice(t, 0, e.parse), o.splice(t, 0, e.leaf), s.splice(t, 0, e.name);
			}
			e.endLeaf && u.push(e.endLeaf);
		}
		if (lE(n.parseInline)) for (let e of n.parseInline) {
			let t = l.indexOf(e.name);
			if (t > -1) c[t] = e.parse;
			else {
				let t = e.before ? dE(l, e.before) : e.after ? dE(l, e.after) + 1 : l.length - 1;
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
		let n = new kE(this, e, t);
		outer: for (let e = t; e < n.end;) {
			let t = n.char(e);
			for (let r of this.inlineParsers) if (r) {
				let i = r(n, t, e);
				if (i >= 0) {
					e = i;
					continue outer;
				}
			}
			e++;
		}
		return n.resolveMarkers(0);
	}
};
function lE(e) {
	return e != null && e.length > 0;
}
function uE(e) {
	if (!Array.isArray(e)) return e;
	if (e.length == 0) return null;
	let t = uE(e[0]);
	if (e.length == 1) return t;
	let n = uE(e.slice(1));
	if (!n || !t) return t || n;
	let r = (e, t) => (e || pE).concat(t || pE), i = t.wrap, a = n.wrap;
	return {
		props: r(t.props, n.props),
		defineNodes: r(t.defineNodes, n.defineNodes),
		parseBlock: r(t.parseBlock, n.parseBlock),
		parseInline: r(t.parseInline, n.parseInline),
		remove: r(t.remove, n.remove),
		wrap: i ? a ? (e, t, n, r) => i(a(e, t, n, r), t, n, r) : i : a
	};
}
function dE(e, t) {
	let n = e.indexOf(t);
	if (n < 0) throw RangeError(`Position specified relative to unknown parser ${t}`);
	return n;
}
var fE = [Th.none];
for (let e = 1, t; t = Z[e]; e++) fE[e] = Th.define({
	id: e,
	name: t,
	props: e >= Z.Escape ? [] : [[W.group, e in PT ? ["Block", "BlockContext"] : ["Block", "LeafBlock"]]],
	top: t == "Document"
});
var pE = [], mE = class {
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
		return K.build({
			buffer: this.content,
			nodeSet: this.nodeSet,
			reused: this.nodes,
			topID: e,
			length: t
		});
	}
}, hE = class {
	constructor(e, t, n, r = pE) {
		this.type = e, this.from = t, this.to = n, this.children = r;
	}
	writeTo(e, t) {
		let n = e.content.length;
		e.writeElements(this.children, t), e.content.push(this.type, this.from + t, this.to + t, e.content.length + 4 - n);
	}
	toTree(e) {
		return new mE(e).writeElements(this.children, -this.from).finish(this.type, this.to - this.from);
	}
}, gE = class {
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
		return pE;
	}
	writeTo(e, t) {
		e.nodes.push(this.tree), e.content.push(e.nodes.length - 1, this.from + t, this.to + t, -1);
	}
	toTree() {
		return this.tree;
	}
};
function Q(e, t, n, r) {
	return new hE(e, t, n, r);
}
var _E = {
	resolve: "Emphasis",
	mark: "EmphasisMark"
}, vE = {
	resolve: "Emphasis",
	mark: "EmphasisMark"
}, yE = {}, bE = {}, xE = class {
	constructor(e, t, n, r) {
		this.type = e, this.from = t, this.to = n, this.side = r;
	}
}, SE = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~", CE = /[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\u2010-\u2027]/;
try {
	CE = /* @__PURE__ */ RegExp("[\\p{S}|\\p{P}]", "u");
} catch {}
var wE = {
	Escape(e, t, n) {
		if (t != 92 || n == e.end - 1) return -1;
		let r = e.char(n + 1);
		for (let t = 0; t < 32; t++) if (SE.charCodeAt(t) == r) return e.append(Q(Z.Escape, n, n + 2));
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
		let a = /^!--[^>](?:-[^-]|[^-])*?-->/i.exec(r);
		if (a) return e.append(Q(Z.Comment, n, n + 1 + a[0].length));
		let o = /^\?[^]*?\?>/.exec(r);
		if (o) return e.append(Q(Z.ProcessingInstruction, n, n + 1 + o[0].length));
		let s = /^(?:![A-Z][^]*?>|!\[CDATA\[[^]*?\]\]>|\/\s*[a-zA-Z][\w-]*\s*>|\s*[a-zA-Z][\w-]*(\s+[a-zA-Z:_][\w-.:]*(?:\s*=\s*(?:[^\s"'=<>`]+|'[^']*'|"[^"]*"))?)*\s*(\/\s*)?>)/.exec(r);
		return s ? e.append(Q(Z.HTMLTag, n, n + 1 + s[0].length)) : -1;
	},
	Emphasis(e, t, n) {
		if (t != 95 && t != 42) return -1;
		let r = n + 1;
		for (; e.char(r) == t;) r++;
		let i = e.slice(n - 1, n), a = e.slice(r, r + 1), o = CE.test(i), s = CE.test(a), c = /\s|^$/.test(i), l = /\s|^$/.test(a), u = !l && (!s || c || o), d = !c && (!o || l || s), f = u && (t == 42 || !d || o), p = d && (t == 42 || !u || s);
		return e.append(new xE(t == 95 ? _E : vE, n, r, !!f | (p ? 2 : 0)));
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
		return t == 91 ? e.append(new xE(yE, n, n + 1, 1)) : -1;
	},
	Image(e, t, n) {
		return t == 33 && e.char(n + 1) == 91 ? e.append(new xE(bE, n, n + 2, 1)) : -1;
	},
	LinkEnd(e, t, n) {
		if (t != 93) return -1;
		for (let t = e.parts.length - 1; t >= 0; t--) {
			let r = e.parts[t];
			if (r instanceof xE && (r.type == yE || r.type == bE)) {
				if (!r.side || e.skipSpace(r.to) == n && !/[(\[]/.test(e.slice(n + 1, n + 2))) return e.parts[t] = null, -1;
				let i = e.takeContent(t), a = e.parts[t] = TE(e, i, r.type == yE ? Z.Link : Z.Image, r.from, n + 1);
				if (r.type == yE) for (let n = 0; n < t; n++) {
					let t = e.parts[n];
					t instanceof xE && t.type == yE && (t.side = 0);
				}
				return a.to;
			}
		}
		return -1;
	}
};
function TE(e, t, n, r, i) {
	let { text: a } = e, o = e.char(i), s = i;
	if (t.unshift(Q(Z.LinkMark, r, r + (n == Z.Image ? 2 : 1))), t.push(Q(Z.LinkMark, i - 1, i)), o == 40) {
		let n = e.skipSpace(i + 1), r = EE(a, n - e.offset, e.offset), o;
		r && (n = e.skipSpace(r.to), n != r.to && (o = DE(a, n - e.offset, e.offset), o && (n = e.skipSpace(o.to)))), e.char(n) == 41 && (t.push(Q(Z.LinkMark, i, i + 1)), s = n + 1, r && t.push(r), o && t.push(o), t.push(Q(Z.LinkMark, n, s)));
	} else if (o == 91) {
		let n = OE(a, i - e.offset, e.offset, !1);
		n && (t.push(n), s = n.to);
	}
	return Q(n, r, s, t);
}
function EE(e, t, n) {
	if (e.charCodeAt(t) == 60) {
		for (let r = t + 1; r < e.length; r++) {
			let i = e.charCodeAt(r);
			if (i == 62) return Q(Z.URL, t + n, r + 1 + n);
			if (i == 60 || i == 10) return !1;
		}
		return null;
	}
	{
		let r = 0, i = t;
		for (let t = !1; i < e.length; i++) {
			let n = e.charCodeAt(i);
			if (FT(n)) break;
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
function DE(e, t, n) {
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
function OE(e, t, n, r) {
	for (let i = !1, a = t + 1, o = Math.min(e.length, a + 999); a < o; a++) {
		let o = e.charCodeAt(a);
		if (i) i = !1;
		else if (o == 93) return !r && Q(Z.LinkLabel, t + n, a + 1 + n);
		else {
			if (r && !FT(o) && (r = !1), o == 91) return !1;
			o == 92 && (i = !0);
		}
	}
	return null;
}
var kE = class {
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
		return this.append(new xE(e, t, n, !!r | (i ? 2 : 0)));
	}
	get hasOpenLink() {
		for (let e = this.parts.length - 1; e >= 0; e--) {
			let t = this.parts[e];
			if (t instanceof xE && (t.type == yE || t.type == bE)) return !0;
		}
		return !1;
	}
	addElement(e) {
		return this.append(e);
	}
	resolveMarkers(e) {
		for (let t = e; t < this.parts.length; t++) {
			let n = this.parts[t];
			if (!(n instanceof xE && n.type.resolve && n.side & 2)) continue;
			let r = n.type == _E || n.type == vE, i = n.to - n.from, a, o = t - 1;
			for (; o >= e; o--) {
				let e = this.parts[o];
				if (e instanceof xE && e.side & 1 && e.type == n.type && !(r && (n.side & 1 || e.side & 2) && (e.to - e.from + i) % 3 == 0 && ((e.to - e.from) % 3 || i % 3))) {
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
			for (let e = o + 1; e < t; e++) this.parts[e] instanceof hE && c.push(this.parts[e]), this.parts[e] = null;
			n.type.mark && c.push(this.elt(n.type.mark, n.from, u));
			let d = this.elt(s, l, u, c);
			this.parts[o] = r && a.from != l ? new xE(a.type, a.from, l, a.side) : null, (this.parts[t] = r && n.to != u ? new xE(n.type, u, n.to, n.side) : null) ? this.parts.splice(t, 0, d) : this.parts[t] = d;
		}
		let t = [];
		for (let n = e; n < this.parts.length; n++) {
			let e = this.parts[n];
			e instanceof hE && t.push(e);
		}
		return t;
	}
	findOpeningDelimiter(e) {
		for (let t = this.parts.length - 1; t >= 0; t--) {
			let n = this.parts[t];
			if (n instanceof xE && n.type == e && n.side & 1) return t;
		}
		return null;
	}
	takeContent(e) {
		let t = this.resolveMarkers(e);
		return this.parts.length = e, t;
	}
	getDelimiterAt(e) {
		let t = this.parts[e];
		return t instanceof xE ? t : null;
	}
	skipSpace(e) {
		return IT(this.text, e - this.offset) + this.offset;
	}
	elt(e, t, n, r) {
		return typeof e == "string" ? Q(this.parser.getNodeType(e), t, n, r) : new gE(e, t);
	}
};
kE.linkStart = yE, kE.imageStart = bE;
function AE(e, t) {
	if (!t.length) return e;
	if (!e.length) return t;
	let n = e.slice(), r = 0;
	for (let e of t) {
		for (; r < n.length && n[r].to < e.to;) r++;
		if (r < n.length && n[r].from < e.from) {
			let t = n[r];
			t instanceof hE && (n[r] = new hE(t.type, t.from, t.to, AE(t.children, [e])));
		} else n.splice(r++, 0, e);
	}
	return n;
}
var jE = [
	Z.CodeBlock,
	Z.ListItem,
	Z.OrderedList,
	Z.BulletList
], ME = class {
	constructor(e, t) {
		this.fragments = e, this.input = t, this.i = 0, this.fragment = null, this.fragmentEnd = -1, this.cursor = null, e.length && (this.fragment = e[this.i++]);
	}
	nextFragment() {
		this.fragment = this.i < this.fragments.length ? this.fragments[this.i++] : null, this.cursor = null, this.fragmentEnd = -1;
	}
	moveTo(e, t) {
		for (; this.fragment && this.fragment.to <= e;) this.nextFragment();
		if (!this.fragment || this.fragment.from > (e ? e - 1 : 0)) return !1;
		if (this.fragmentEnd < 0) {
			let e = this.fragment.to;
			for (; e > 0 && this.input.read(e - 1, e) != "\n";) e--;
			this.fragmentEnd = e ? e - 1 : 0;
		}
		let n = this.cursor;
		n || (n = this.cursor = this.fragment.tree.cursor(), n.firstChild());
		let r = e + this.fragment.offset;
		for (; n.to <= r;) if (!n.parent()) return !1;
		for (;;) {
			if (n.from >= r) return this.fragment.from <= t;
			if (!n.childAfter(r)) return !1;
		}
	}
	matches(e) {
		let t = this.cursor.tree;
		return t && t.prop(W.contextHash) == e;
	}
	takeNodes(e) {
		let t = this.cursor, n = this.fragment.offset, r = this.fragmentEnd - +!!this.fragment.openEnd, i = e.absoluteLineStart, a = i, o = e.block.children.length, s = a, c = o;
		for (;;) {
			if (t.to - n > r) {
				if (t.type.isAnonymous && t.firstChild()) continue;
				break;
			}
			let i = NE(t.from - n, e.ranges);
			if (t.to - n <= e.ranges[e.rangeI].to) e.addNode(t.tree, i);
			else {
				let n = new K(e.parser.nodeSet.types[Z.Paragraph], [], [], 0, e.block.hashProp);
				e.reusePlaceholders.set(n, t.tree), e.addNode(n, i);
			}
			if (t.type.is("Block") && (jE.indexOf(t.type.id) < 0 ? (a = t.to - n, o = e.block.children.length) : (a = s, o = c), s = t.to - n, c = e.block.children.length), !t.nextSibling()) break;
		}
		for (; e.block.children.length > o;) e.block.children.pop(), e.block.positions.pop();
		return a - i;
	}
};
function NE(e, t) {
	let n = e;
	for (let r = 1; r < t.length; r++) {
		let i = t[r - 1].to, a = t[r].from;
		i < e && (n -= a - i);
	}
	return n;
}
var PE = vg({
	"Blockquote/...": J.quote,
	HorizontalRule: J.contentSeparator,
	"ATXHeading1/... SetextHeading1/...": J.heading1,
	"ATXHeading2/... SetextHeading2/...": J.heading2,
	"ATXHeading3/...": J.heading3,
	"ATXHeading4/...": J.heading4,
	"ATXHeading5/...": J.heading5,
	"ATXHeading6/...": J.heading6,
	"Comment CommentBlock": J.comment,
	Escape: J.escape,
	Entity: J.character,
	"Emphasis/...": J.emphasis,
	"StrongEmphasis/...": J.strong,
	"Link/... Image/...": J.link,
	"OrderedList/... BulletList/...": J.list,
	"BlockQuote/...": J.quote,
	"InlineCode CodeText": J.monospace,
	"URL Autolink": J.url,
	"HeaderMark HardBreak QuoteMark ListMark LinkMark EmphasisMark CodeMark": J.processingInstruction,
	"CodeInfo LinkLabel": J.labelName,
	LinkTitle: J.string,
	Paragraph: J.content
}), FE = new cE(new Eh(fE).extend(PE), Object.keys($T).map((e) => $T[e]), Object.keys($T).map((e) => rE[e]), Object.keys($T), iE, PT, Object.keys(wE).map((e) => wE[e]), Object.keys(wE), []);
function IE(e, t, n) {
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
function LE(e) {
	let { codeParser: t, htmlParser: n } = e;
	return { wrap: Qh((e, r) => {
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
			overlay: IE(e.node, e.from, e.to)
		};
		return null;
	}) };
}
var RE = {
	resolve: "Strikethrough",
	mark: "StrikethroughMark"
}, zE = {
	defineNodes: [{
		name: "Strikethrough",
		style: { "Strikethrough/...": J.strikethrough }
	}, {
		name: "StrikethroughMark",
		style: J.processingInstruction
	}],
	parseInline: [{
		name: "Strikethrough",
		parse(e, t, n) {
			if (t != 126 || e.char(n + 1) != 126 || e.char(n + 2) == 126) return -1;
			let r = e.slice(n - 1, n), i = e.slice(n + 2, n + 3), a = /\s|^$/.test(r), o = /\s|^$/.test(i), s = CE.test(r), c = CE.test(i);
			return e.addDelimiter(RE, n, n + 2, !o && (!c || a || s), !a && (!s || o || c));
		},
		after: "Emphasis"
	}]
};
function BE(e, t, n = 0, r, i = 0) {
	let a = 0, o = !0, s = -1, c = -1, l = !1, u = () => {
		r.push(e.elt("TableCell", i + s, i + c, e.parser.parseInline(t.slice(s, c), i + s)));
	};
	for (let d = n; d < t.length; d++) {
		let n = t.charCodeAt(d);
		n == 124 && !l ? ((!o || s > -1) && a++, o = !1, r && (s > -1 && u(), r.push(e.elt("TableDelimiter", d + i, d + i + 1))), s = c = -1) : (l || n != 32 && n != 9) && (s < 0 && (s = d), c = d + 1), l = !l && n == 92;
	}
	return s > -1 && (a++, r && u()), a;
}
function VE(e, t) {
	for (let n = t; n < e.length; n++) {
		let t = e.charCodeAt(n);
		if (t == 124) return !0;
		t == 92 && n++;
	}
	return !1;
}
var HE = /^[>\s]*\|?(\s*:?-+:?\s*\|)+(\s*:?-+:?\s*)?$/, UE = class {
	constructor() {
		this.rows = null;
	}
	nextLine(e, t, n) {
		if (this.rows == null) {
			this.rows = !1;
			let r;
			if ((t.next == 45 || t.next == 58 || t.next == 124) && HE.test(r = t.text.slice(t.pos))) {
				let i = [];
				BE(e, n.content, 0, i, n.start) == BE(e, r, 0) && (this.rows = [e.elt("TableHeader", n.start, n.start + n.content.length, i), e.elt("TableDelimiter", e.lineStart + t.pos, e.lineStart + t.text.length)]);
			}
		} else if (this.rows) {
			let n = [];
			BE(e, t.text, t.pos, n, e.lineStart), this.rows.push(e.elt("TableRow", e.lineStart + t.pos, e.lineStart + t.text.length, n));
		}
		return !1;
	}
	finish(e, t) {
		return this.rows ? (e.addLeafElement(t, e.elt("Table", t.start, t.start + t.content.length, this.rows)), !0) : !1;
	}
}, WE = {
	defineNodes: [
		{
			name: "Table",
			block: !0
		},
		{
			name: "TableHeader",
			style: { "TableHeader/...": J.heading }
		},
		"TableRow",
		{
			name: "TableCell",
			style: J.content
		},
		{
			name: "TableDelimiter",
			style: J.processingInstruction
		}
	],
	parseBlock: [{
		name: "Table",
		leaf(e, t) {
			return VE(t.content, 0) ? new UE() : null;
		},
		endLeaf(e, t, n) {
			if (n.parsers.some((e) => e instanceof UE) || !VE(t.text, t.basePos)) return !1;
			let r = e.peekLine();
			return HE.test(r) && BE(e, t.text, t.basePos) == BE(e, r, t.basePos);
		},
		before: "SetextHeading"
	}]
}, GE = class {
	nextLine() {
		return !1;
	}
	finish(e, t) {
		return e.addLeafElement(t, e.elt("Task", t.start, t.start + t.content.length, [e.elt("TaskMarker", t.start, t.start + 3), ...e.parser.parseInline(t.content.slice(3), t.start + 3)])), !0;
	}
}, KE = {
	defineNodes: [{
		name: "Task",
		block: !0,
		style: J.list
	}, {
		name: "TaskMarker",
		style: J.atom
	}],
	parseBlock: [{
		name: "TaskList",
		leaf(e, t) {
			return /^\[[ xX]\][ \t]/.test(t.content) && e.parentType().name == "ListItem" ? new GE() : null;
		},
		after: "SetextHeading"
	}]
}, qE = /(www\.)|(https?:\/\/)|([\w.+-]{1,100}@)|(mailto:|xmpp:)/gy, JE = /[\w-]+(\.[\w-]+)+(:\d+)?(\/[^\s<]*)?/gy, YE = /[\w-]+\.[\w-]+($|[/:])/, XE = /[\w.+-]+@[\w-]+(\.[\w.-]+)+/gy, ZE = /\/[a-zA-Z\d@.]+/gy;
function QE(e, t, n, r) {
	let i = 0;
	for (let a = t; a < n; a++) e[a] == r && i++;
	return i;
}
function $E(e, t) {
	JE.lastIndex = t;
	let n = JE.exec(e);
	if (!n || YE.exec(n[0])[0].indexOf("_") > -1) return -1;
	let r = t + n[0].length;
	for (;;) {
		let n = e[r - 1], i;
		if (/[?!.,:*_~]/.test(n) || n == ")" && QE(e, t, r, ")") > QE(e, t, r, "(")) r--;
		else if (n == ";" && (i = /&(?:#\d+|#x[a-f\d]+|\w+);$/.exec(e.slice(t, r)))) r = t + i.index;
		else break;
	}
	return r;
}
function eD(e, t) {
	XE.lastIndex = t;
	let n = XE.exec(e);
	if (!n) return -1;
	let r = n[0][n[0].length - 1];
	return r == "_" || r == "-" ? -1 : t + n[0].length - +(r == ".");
}
var tD = [
	WE,
	KE,
	zE,
	{ parseInline: [{
		name: "Autolink",
		parse(e, t, n) {
			let r = n - e.offset;
			if (r && /\w/.test(e.text[r - 1])) return -1;
			qE.lastIndex = r;
			let i = qE.exec(e.text), a = -1;
			return !i || (i[1] || i[2] ? (a = $E(e.text, r + i[0].length), a > -1 && e.hasOpenLink && (a = r + /([^\[\]]|\[[^\]]*\])*/.exec(e.text.slice(r, a))[0].length)) : i[3] ? a = eD(e.text, r) : (a = eD(e.text, r + i[0].length), a > -1 && i[0] == "xmpp:" && (ZE.lastIndex = a, i = ZE.exec(e.text), i && (a = i.index + i[0].length))), a < 0) ? -1 : (e.addElement(e.elt("URL", n, a + e.offset)), a + e.offset);
		}
	}] }
];
function nD(e, t, n) {
	return (r, i, a) => {
		if (i != e || r.char(a + 1) == e) return -1;
		let o = [r.elt(n, a, a + 1)];
		for (let i = a + 1; i < r.end; i++) {
			let s = r.char(i);
			if (s == e) return r.addElement(r.elt(t, a, i + 1, o.concat(r.elt(n, i, i + 1))));
			if (s == 92 && o.push(r.elt("Escape", i, i++ + 2)), FT(s)) break;
		}
		return -1;
	};
}
var rD = {
	defineNodes: [{
		name: "Superscript",
		style: J.special(J.content)
	}, {
		name: "SuperscriptMark",
		style: J.processingInstruction
	}],
	parseInline: [{
		name: "Superscript",
		parse: nD(94, "Superscript", "SuperscriptMark")
	}]
}, iD = {
	defineNodes: [{
		name: "Subscript",
		style: J.special(J.content)
	}, {
		name: "SubscriptMark",
		style: J.processingInstruction
	}],
	parseInline: [{
		name: "Subscript",
		parse: nD(126, "Subscript", "SubscriptMark")
	}]
}, aD = {
	defineNodes: [{
		name: "Emoji",
		style: J.character
	}],
	parseInline: [{
		name: "Emoji",
		parse(e, t, n) {
			let r;
			return t != 58 || !(r = /^[a-zA-Z_0-9]+:/.exec(e.slice(n + 1, e.end))) ? -1 : e.addElement(e.elt("Emoji", n, n + 1 + r[0].length));
		}
	}]
}, oD = /*@__PURE__*/ Vg({ commentTokens: { block: {
	open: "<!--",
	close: "-->"
} } }), sD = /*@__PURE__*/ new W(), cD = /*@__PURE__*/ FE.configure({ props: [
	/*@__PURE__*/ C_.add((e) => !e.is("Block") || e.is("Document") || lD(e) != null || uD(e) ? void 0 : (e, t) => ({
		from: t.doc.lineAt(e.from).to,
		to: e.to
	})),
	/*@__PURE__*/ sD.add(lD),
	/*@__PURE__*/ l_.add({ Document: () => null }),
	/*@__PURE__*/ Bg.add({ Document: oD })
] });
function lD(e) {
	let t = /^(?:ATX|Setext)Heading(\d)$/.exec(e.name);
	return t ? +t[1] : void 0;
}
function uD(e) {
	return e.name == "OrderedList" || e.name == "BulletList";
}
function dD(e, t) {
	let n = e;
	for (;;) {
		let e = n.nextSibling, r;
		if (!e || (r = lD(e.type)) != null && r <= t) break;
		n = e;
	}
	return n.to;
}
var fD = /*@__PURE__*/ S_.of((e, t, n) => {
	for (let r = Y(e).resolveInner(n, -1); r && !(r.from < t); r = r.parent) {
		let e = r.type.prop(sD);
		if (e == null) continue;
		let t = dD(r, e);
		if (t > n) return {
			from: n,
			to: t
		};
	}
	return null;
});
function pD(e) {
	return new Ug(oD, e, [], "markdown");
}
var mD = /*@__PURE__*/ pD(cD), hD = /*@__PURE__*/ pD(/* @__PURE__ */ cD.configure([
	tD,
	iD,
	rD,
	aD,
	{ props: [/*@__PURE__*/ C_.add({ Table: (e, t) => ({
		from: t.doc.lineAt(e.from).to,
		to: e.to
	}) })] }
]));
function gD(e, t) {
	return (n) => {
		if (n && e) {
			let t = null;
			if (n = /\S*/.exec(n)[0], t = typeof e == "function" ? e(n) : n_.matchLanguageName(e, n, !0), t instanceof n_) return t.support ? t.support.language.parser : Jg.getSkippingParser(t.load());
			if (t) return t.parser;
		}
		return t ? t.parser : null;
	};
}
var _D = class {
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
		let n = this.node.name == "OrderedList" ? String(+yD(this.item, e)[2] + t) : "";
		return this.spaceBefore + n + this.type + this.spaceAfter;
	}
};
function vD(e, t) {
	let n = [], r = [];
	for (let t = e; t; t = t.parent) {
		if (t.name == "FencedCode") return r;
		(t.name == "ListItem" || t.name == "Blockquote") && n.push(t);
	}
	for (let e = n.length - 1; e >= 0; e--) {
		let i = n[e], a, o = t.lineAt(i.from), s = i.from - o.from;
		if (i.name == "Blockquote" && (a = /^ *>( ?)/.exec(o.text.slice(s)))) r.push(new _D(i, s, s + a[0].length, "", a[1], ">", null));
		else if (i.name == "ListItem" && i.parent.name == "OrderedList" && (a = /^( *)\d+([.)])( *)/.exec(o.text.slice(s)))) {
			let e = a[3], t = a[0].length;
			e.length >= 4 && (e = e.slice(0, e.length - 4), t -= 4), r.push(new _D(i.parent, s, s + t, a[1], e, a[2], i));
		} else if (i.name == "ListItem" && i.parent.name == "BulletList" && (a = /^( *)([-+*])( {1,4}\[[ xX]\])?( +)/.exec(o.text.slice(s)))) {
			let e = a[4], t = a[0].length;
			e.length > 4 && (e = e.slice(0, e.length - 4), t -= 4);
			let n = a[2];
			a[3] && (n += a[3].replace(/[xX]/, " ")), r.push(new _D(i.parent, s, s + t, a[1], e, n, i));
		}
	}
	return r;
}
function yD(e, t) {
	return /^(\s*)(\d+)(?=[.)])/.exec(t.sliceString(e.from, e.from + 10));
}
function bD(e, t, n, r = 0) {
	for (let i = -1, a = e;;) {
		if (a.name == "ListItem") {
			let e = yD(a, t), o = +e[2];
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
function xD(e, t) {
	let n = /^[ \t]*/.exec(e)[0].length;
	if (!n || t.facet(i_) != "	") return e;
	let r = cl(e, 4, n), i = "";
	for (let e = r; e > 0;) e >= 4 ? (i += "	", e -= 4) : (i += " ", e--);
	return i + e.slice(n);
}
var SD = /*@__PURE__*/ ((e = {}) => ({ state: t, dispatch: n }) => {
	let r = Y(t), { doc: i } = t, a = null, o = t.changeByRange((n) => {
		if (!n.empty || !hD.isActiveAt(t, n.from, -1) && !hD.isActiveAt(t, n.from, 1)) return a = { range: n };
		let o = n.from, s = i.lineAt(o), c = vD(r.resolveInner(o, -1), i);
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
				return l.node.name == "OrderedList" && bD(l.item, i, r, -2), e && e.node.name == "OrderedList" && bD(e.item, i, r), {
					range: R.cursor(t + n.length),
					changes: r
				};
			}
			{
				let e = TD(c, t, s);
				return {
					range: R.cursor(o + e.length + 1),
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
		l.node.name == "OrderedList" && bD(l.item, i, d);
		let f = l.item && l.item.from < s.from, p = "";
		if (!f || /^[\s\d.)\-+*>]*/.exec(s.text)[0].length >= l.to) for (let e = 0, t = c.length - 1; e <= t; e++) p += e == t && !f ? c[e].marker(i, 1) : c[e].blank(e < t ? cl(s.text, 4, c[e + 1].from) - p.length : null);
		let m = o;
		for (; m > s.from && /\s/.test(s.text.charAt(m - s.from - 1));) m--;
		return p = xD(p, t), wD(l.node, t.doc) && (p = TD(c, t, s) + t.lineBreak + p), d.push({
			from: m,
			to: o,
			insert: t.lineBreak + p
		}), {
			range: R.cursor(m + p.length + 1),
			changes: d
		};
	});
	return !a && (n(t.update(o, {
		scrollIntoView: !0,
		userEvent: "input"
	})), !0);
})();
function CD(e) {
	return e.name == "QuoteMark" || e.name == "ListMark";
}
function wD(e, t) {
	if (e.name != "OrderedList" && e.name != "BulletList") return !1;
	let n = e.firstChild, r = e.getChild("ListItem", "ListItem");
	if (!r) return !1;
	let i = t.lineAt(n.to), a = t.lineAt(r.from), o = /^[\s>]*$/.test(i.text);
	return i.number + +!o < a.number;
}
function TD(e, t, n) {
	let r = "";
	for (let t = 0, i = e.length - 2; t <= i; t++) r += e[t].blank(t < i ? cl(n.text, 4, e[t + 1].from) - r.length : null, t < i);
	return xD(r, t);
}
function ED(e, t) {
	let n = e.resolveInner(t, -1), r = t;
	CD(n) && (r = n.from, n = n.parent);
	for (let e; e = n.childBefore(r);) if (CD(e)) r = e.from;
	else if (e.name == "OrderedList" || e.name == "BulletList") n = e.lastChild, r = n.to;
	else break;
	return n;
}
var DD = [{
	key: "Enter",
	run: SD
}, {
	key: "Backspace",
	run: ({ state: e, dispatch: t }) => {
		let n = Y(e), r = null, i = e.changeByRange((t) => {
			let i = t.from, { doc: a } = e;
			if (t.empty && hD.isActiveAt(e, t.from)) {
				let t = a.lineAt(i), r = vD(ED(n, i), a);
				if (r.length) {
					let n = r[r.length - 1], a = n.to - n.spaceAfter.length + +!!n.spaceAfter;
					if (i - t.from > a && !/\S/.test(t.text.slice(a, i - t.from))) return {
						range: R.cursor(t.from + a),
						changes: {
							from: t.from + a,
							to: i
						}
					};
					if (i - t.from == a && (n.item && t.from <= n.item.from || /^[\s>]*$/.test(t.text.slice(0, n.to)))) {
						let r = t.from + n.from;
						if (n.item && n.node.from < n.item.from && /\S/.test(t.text.slice(n.from, n.to))) {
							let i = n.blank(cl(t.text, 4, n.to) - cl(t.text, 4, n.from));
							return r == t.from && (i = xD(i, e)), {
								range: R.cursor(r + i.length),
								changes: {
									from: r,
									to: t.from + n.to,
									insert: i
								}
							};
						}
						if (r < i) return {
							range: R.cursor(r),
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
}], OD = /*@__PURE__*/ ST({ matchClosingTags: !1 });
function kD(e = {}) {
	let { codeLanguages: t, defaultCodeLanguage: n, addKeymap: r = !0, base: { parser: i } = mD, completeHTMLTags: a = !0, pasteURLAsLink: o = !0, htmlTagLanguage: s = OD } = e;
	if (!(i instanceof cE)) throw RangeError("Base parser provided to `markdown` should be a Markdown parser");
	let c = e.extensions ? [e.extensions] : [], l = [s.support, fD], u;
	o && l.push(PD), n instanceof t_ ? (l.push(n.support), u = n.language) : n && (u = n);
	let d = t || u ? gD(t, u) : void 0;
	c.push(LE({
		codeParser: d,
		htmlParser: s.language.parser
	})), r && l.push(cc.high(km.of(DD)));
	let f = pD(i.configure(c));
	return a && l.push(f.data.of({ autocomplete: AD })), new t_(f, l);
}
function AD(e) {
	let { state: t, pos: n } = e, r = /<[:\-\.\w\u00b7-\uffff]*$/.exec(t.sliceDoc(n - 25, n));
	if (!r) return null;
	let i = Y(t).resolveInner(n, -1);
	for (; i && !i.type.isTop;) {
		if (i.name == "CodeBlock" || i.name == "FencedCode" || i.name == "ProcessingInstructionBlock" || i.name == "CommentBlock" || i.name == "Link" || i.name == "Image") return null;
		i = i.parent;
	}
	return {
		from: n - r[0].length,
		to: n,
		options: MD(),
		validFor: /^<[:\-\.\w\u00b7-\uffff]*$/
	};
}
var jD = null;
function MD() {
	if (jD) return jD;
	let e = hT(new $C(Vc.create({ extensions: OD }), 0, !0));
	return jD = e ? e.options : [];
}
var ND = /code|horizontalrule|html|link|comment|processing|escape|entity|image|mark|url/i, PD = /*@__PURE__*/ U.domEventHandlers({ paste: (e, t) => {
	let { main: n } = t.state.selection;
	if (n.empty) return !1;
	let r = e.clipboardData?.getData("text/plain");
	if (!r || !/^(https?:\/\/|mailto:|xmpp:|www\.)/.test(r) || (/^www\./.test(r) && (r = "https://" + r), !hD.isActiveAt(t.state, n.from, 1))) return !1;
	let i = Y(t.state), a = !1;
	return i.iterate({
		from: n.from,
		to: n.to,
		enter: (e) => {
			(e.from > n.from || ND.test(e.name)) && (a = !0);
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
} }), FD = 1, ID = 2, LD = 3, RD = 4, zD = 5, BD = 36, VD = 37, HD = 38, UD = 11, WD = 13;
function GD(e) {
	return e == 45 || e == 46 || e == 58 || e >= 65 && e <= 90 || e == 95 || e >= 97 && e <= 122 || e >= 161;
}
function KD(e) {
	return e == 9 || e == 10 || e == 13 || e == 32;
}
var qD = null, JD = null, YD = 0;
function XD(e, t) {
	let n = e.pos + t;
	if (JD == e && YD == n) return qD;
	for (; KD(e.peek(t));) t++;
	let r = "";
	for (;;) {
		let n = e.peek(t);
		if (!GD(n)) break;
		r += String.fromCharCode(n), t++;
	}
	return JD = e, YD = n, qD = r || null;
}
function ZD(e, t) {
	this.name = e, this.parent = t;
}
var QD = new nx({
	start: null,
	shift(e, t, n, r) {
		return t == FD ? new ZD(XD(r, 1) || "", e) : e;
	},
	reduce(e, t) {
		return t == UD && e ? e.parent : e;
	},
	reuse(e, t, n, r) {
		let i = t.type.id;
		return i == FD || i == WD ? new ZD(XD(r, 1) || "", e) : e;
	},
	strict: !1
}), $D = new Ub((e, t) => {
	if (e.next == 60) {
		if (e.advance(), e.next == 47) {
			e.advance();
			let n = XD(e, 0);
			if (!n) return e.acceptToken(zD);
			if (t.context && n == t.context.name) return e.acceptToken(ID);
			for (let r = t.context; r; r = r.parent) if (r.name == n) return e.acceptToken(LD, -2);
			e.acceptToken(RD);
		} else if (e.next != 33 && e.next != 63) return e.acceptToken(FD);
	}
}, { contextual: !0 });
function eO(e, t) {
	return new Ub((n) => {
		let r = 0, i = t.charCodeAt(0);
		scan: for (; !(n.next < 0); n.advance(), r++) if (n.next == i) {
			for (let e = 1; e < t.length; e++) if (n.peek(e) != t.charCodeAt(e)) continue scan;
			break;
		}
		r && n.acceptToken(e);
	});
}
var tO = eO(BD, "-->"), nO = eO(VD, "?>"), rO = eO(HD, "]]>"), iO = vg({
	Text: J.content,
	"StartTag StartCloseTag EndTag SelfCloseEndTag": J.angleBracket,
	TagName: J.tagName,
	"MismatchedCloseTag/TagName": [J.tagName, J.invalid],
	AttributeName: J.attributeName,
	AttributeValue: J.attributeValue,
	Is: J.definitionOperator,
	"EntityReference CharacterReference": J.character,
	Comment: J.blockComment,
	ProcessingInst: J.processingInstruction,
	DoctypeDecl: J.documentMeta,
	Cdata: J.special(J.string)
}), aO = rx.deserialize({
	version: 14,
	states: ",lOQOaOOOrOxO'#CfOzOpO'#CiO!tOaO'#CgOOOP'#Cg'#CgO!{OrO'#CrO#TOtO'#CsO#]OpO'#CtOOOP'#DT'#DTOOOP'#Cv'#CvQQOaOOOOOW'#Cw'#CwO#eOxO,59QOOOP,59Q,59QOOOO'#Cx'#CxO#mOpO,59TO#uO!bO,59TOOOP'#C|'#C|O$TOaO,59RO$[OpO'#CoOOOP,59R,59ROOOQ'#C}'#C}O$dOrO,59^OOOP,59^,59^OOOS'#DO'#DOO$lOtO,59_OOOP,59_,59_O$tOpO,59`O$|OpO,59`OOOP-E6t-E6tOOOW-E6u-E6uOOOP1G.l1G.lOOOO-E6v-E6vO%UO!bO1G.oO%UO!bO1G.oO%dOpO'#CkO%lO!bO'#CyO%zO!bO1G.oOOOP1G.o1G.oOOOP1G.w1G.wOOOP-E6z-E6zOOOP1G.m1G.mO&VOpO,59ZO&_OpO,59ZOOOQ-E6{-E6{OOOP1G.x1G.xOOOS-E6|-E6|OOOP1G.y1G.yO&gOpO1G.zO&gOpO1G.zOOOP1G.z1G.zO&oO!bO7+$ZO&}O!bO7+$ZOOOP7+$Z7+$ZOOOP7+$c7+$cO'YOpO,59VO'bOpO,59VO'mO!bO,59eOOOO-E6w-E6wO'{OpO1G.uO'{OpO1G.uOOOP1G.u1G.uO(TOpO7+$fOOOP7+$f7+$fO(]O!bO<<GuOOOP<<Gu<<GuOOOP<<G}<<G}O'bOpO1G.qO'bOpO1G.qO(hO#tO'#CnO(vO&jO'#CnOOOO1G.q1G.qO)UOpO7+$aOOOP7+$a7+$aOOOP<<HQ<<HQOOOPAN=aAN=aOOOPAN=iAN=iO'bOpO7+$]OOOO7+$]7+$]OOOO'#Cz'#CzO)^O#tO,59YOOOO,59Y,59YOOOO'#C{'#C{O)lO&jO,59YOOOP<<G{<<G{OOOO<<Gw<<GwOOOO-E6x-E6xOOOO1G.t1G.tOOOO-E6y-E6y",
	stateData: ")z~OPQOSVOTWOVWOWWOXWOiXOyPO!QTO!SUO~OvZOx]O~O^`Oz^O~OPQOQcOSVOTWOVWOWWOXWOyPO!QTO!SUO~ORdO~P!SOteO!PgO~OuhO!RjO~O^lOz^O~OvZOxoO~O^qOz^O~O[vO`sOdwOz^O~ORyO~P!SO^{Oz^O~OteO!P}O~OuhO!R!PO~O^!QOz^O~O[!SOz^O~O[!VO`sOd!WOz^O~Oa!YOz^O~Oz^O[mX`mXdmX~O[!VO`sOd!WO~O^!]Oz^O~O[!_Oz^O~O[!aOz^O~O[!cO`sOd!dOz^O~O[!cO`sOd!dO~Oa!eOz^O~Oz^O{!gO}!hO~Oz^O[ma`madma~O[!kOz^O~O[!lOz^O~O[!mO`sOd!nO~OW!qOX!qO{!sO|!qO~OW!tOX!tO}!sO!O!tO~O[!vOz^O~OW!qOX!qO{!yO|!qO~OW!tOX!tO}!yO!O!tO~O",
	goto: "%cxPPPPPPPPPPyyP!PP!VPP!`!jP!pyyyP!v!|#S$[$k$q$w$}%TPPPP%ZXWORYbXRORYb_t`qru!T!U!bQ!i!YS!p!e!fR!w!oQdRRybXSORYbQYORmYQ[PRn[Q_QQkVjp_krz!R!T!X!Z!^!`!f!j!oQr`QzcQ!RlQ!TqQ!XsQ!ZtQ!^{Q!`!QQ!f!YQ!j!]R!o!eQu`S!UqrU![u!U!bR!b!TQ!r!gR!x!rQ!u!hR!z!uQbRRxbQfTR|fQiUR!OiSXOYTaRb",
	nodeNames: "⚠ StartTag StartCloseTag MissingCloseTag StartCloseTag StartCloseTag Document Text EntityReference CharacterReference Cdata Element EndTag OpenTag TagName Attribute AttributeName Is AttributeValue CloseTag SelfCloseEndTag SelfClosingTag Comment ProcessingInst MismatchedCloseTag DoctypeDecl",
	maxTerm: 50,
	context: QD,
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
	propSources: [iO],
	skippedNodes: [0],
	repeatNodeCount: 9,
	tokenData: "!)v~R!YOX$qXY)iYZ)iZ]$q]^)i^p$qpq)iqr$qrs*vsv$qvw+fwx/ix}$q}!O0[!O!P$q!P!Q2z!Q![$q![!]4n!]!^$q!^!_8U!_!`!#t!`!a!$l!a!b!%d!b!c$q!c!}4n!}#P$q#P#Q!'W#Q#R$q#R#S4n#S#T$q#T#o4n#o%W$q%W%o4n%o%p$q%p&a4n&a&b$q&b1p4n1p4U$q4U4d4n4d4e$q4e$IS4n$IS$I`$q$I`$Ib4n$Ib$Kh$q$Kh%#t4n%#t&/x$q&/x&Et4n&Et&FV$q&FV;'S4n;'S;:j8O;:j;=`)c<%l?&r$q?&r?Ah4n?Ah?BY$q?BY?Mn4n?MnO$qi$zXVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qa%nVVP!O`Ov%gwx&Tx!^%g!^!_&o!_;'S%g;'S;=`'W<%lO%gP&YTVPOv&Tw!^&T!_;'S&T;'S;=`&i<%lO&TP&lP;=`<%l&T`&tS!O`Ov&ox;'S&o;'S;=`'Q<%lO&o`'TP;=`<%l&oa'ZP;=`<%l%gX'eWVP|WOr'^rs&Tsv'^w!^'^!^!_'}!_;'S'^;'S;=`(i<%lO'^W(ST|WOr'}sv'}w;'S'};'S;=`(c<%lO'}W(fP;=`<%l'}X(lP;=`<%l'^h(vV|W!O`Or(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(oh)`P;=`<%l(oi)fP;=`<%l$qo)t`VP|W!O`zUOX$qXY)iYZ)iZ]$q]^)i^p$qpq)iqr$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qk+PV{YVP!O`Ov%gwx&Tx!^%g!^!_&o!_;'S%g;'S;=`'W<%lO%g~+iast,n![!]-r!c!}-r#R#S-r#T#o-r%W%o-r%p&a-r&b1p-r4U4d-r4e$IS-r$I`$Ib-r$Kh%#t-r&/x&Et-r&FV;'S-r;'S;:j/c?&r?Ah-r?BY?Mn-r~,qQ!Q![,w#l#m-V~,zQ!Q![,w!]!^-Q~-VOX~~-YR!Q![-c!c!i-c#T#Z-c~-fS!Q![-c!]!^-Q!c!i-c#T#Z-c~-ug}!O-r!O!P-r!Q![-r![!]-r!]!^/^!c!}-r#R#S-r#T#o-r$}%O-r%W%o-r%p&a-r&b1p-r1p4U-r4U4d-r4e$IS-r$I`$Ib-r$Je$Jg-r$Kh%#t-r&/x&Et-r&FV;'S-r;'S;:j/c?&r?Ah-r?BY?Mn-r~/cOW~~/fP;=`<%l-rk/rW}bVP|WOr'^rs&Tsv'^w!^'^!^!_'}!_;'S'^;'S;=`(i<%lO'^k0eZVP|W!O`Or$qrs%gsv$qwx'^x}$q}!O1W!O!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qk1aZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_!`$q!`!a2S!a;'S$q;'S;=`)c<%lO$qk2_X!PQVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qm3TZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_!`$q!`!a3v!a;'S$q;'S;=`)c<%lO$qm4RXdSVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qo4{!P`S^QVP|W!O`Or$qrs%gsv$qwx'^x}$q}!O4n!O!P4n!P!Q$q!Q![4n![!]4n!]!^$q!^!_(o!_!c$q!c!}4n!}#R$q#R#S4n#S#T$q#T#o4n#o$}$q$}%O4n%O%W$q%W%o4n%o%p$q%p&a4n&a&b$q&b1p4n1p4U4n4U4d4n4d4e$q4e$IS4n$IS$I`$q$I`$Ib4n$Ib$Je$q$Je$Jg4n$Jg$Kh$q$Kh%#t4n%#t&/x$q&/x&Et4n&Et&FV$q&FV;'S4n;'S;:j8O;:j;=`)c<%l?&r$q?&r?Ah4n?Ah?BY$q?BY?Mn4n?MnO$qo8RP;=`<%l4ni8]Y|W!O`Oq(oqr8{rs&osv(owx'}x!a(o!a!b!#U!b;'S(o;'S;=`)]<%lO(oi9S_|W!O`Or(ors&osv(owx'}x}(o}!O:R!O!f(o!f!g;e!g!}(o!}#ODh#O#W(o#W#XLp#X;'S(o;'S;=`)]<%lO(oi:YX|W!O`Or(ors&osv(owx'}x}(o}!O:u!O;'S(o;'S;=`)]<%lO(oi;OV!QP|W!O`Or(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(oi;lX|W!O`Or(ors&osv(owx'}x!q(o!q!r<X!r;'S(o;'S;=`)]<%lO(oi<`X|W!O`Or(ors&osv(owx'}x!e(o!e!f<{!f;'S(o;'S;=`)]<%lO(oi=SX|W!O`Or(ors&osv(owx'}x!v(o!v!w=o!w;'S(o;'S;=`)]<%lO(oi=vX|W!O`Or(ors&osv(owx'}x!{(o!{!|>c!|;'S(o;'S;=`)]<%lO(oi>jX|W!O`Or(ors&osv(owx'}x!r(o!r!s?V!s;'S(o;'S;=`)]<%lO(oi?^X|W!O`Or(ors&osv(owx'}x!g(o!g!h?y!h;'S(o;'S;=`)]<%lO(oi@QY|W!O`Or?yrs@psv?yvwA[wxBdx!`?y!`!aCr!a;'S?y;'S;=`Db<%lO?ya@uV!O`Ov@pvxA[x!`@p!`!aAy!a;'S@p;'S;=`B^<%lO@pPA_TO!`A[!`!aAn!a;'SA[;'S;=`As<%lOA[PAsOiPPAvP;=`<%lA[aBQSiP!O`Ov&ox;'S&o;'S;=`'Q<%lO&oaBaP;=`<%l@pXBiX|WOrBdrsA[svBdvwA[w!`Bd!`!aCU!a;'SBd;'S;=`Cl<%lOBdXC]TiP|WOr'}sv'}w;'S'};'S;=`(c<%lO'}XCoP;=`<%lBdiC{ViP|W!O`Or(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(oiDeP;=`<%l?yiDoZ|W!O`Or(ors&osv(owx'}x!e(o!e!fEb!f#V(o#V#WIr#W;'S(o;'S;=`)]<%lO(oiEiX|W!O`Or(ors&osv(owx'}x!f(o!f!gFU!g;'S(o;'S;=`)]<%lO(oiF]X|W!O`Or(ors&osv(owx'}x!c(o!c!dFx!d;'S(o;'S;=`)]<%lO(oiGPX|W!O`Or(ors&osv(owx'}x!v(o!v!wGl!w;'S(o;'S;=`)]<%lO(oiGsX|W!O`Or(ors&osv(owx'}x!c(o!c!dH`!d;'S(o;'S;=`)]<%lO(oiHgX|W!O`Or(ors&osv(owx'}x!}(o!}#OIS#O;'S(o;'S;=`)]<%lO(oiI]V|W!O`yPOr(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(oiIyX|W!O`Or(ors&osv(owx'}x#W(o#W#XJf#X;'S(o;'S;=`)]<%lO(oiJmX|W!O`Or(ors&osv(owx'}x#T(o#T#UKY#U;'S(o;'S;=`)]<%lO(oiKaX|W!O`Or(ors&osv(owx'}x#h(o#h#iK|#i;'S(o;'S;=`)]<%lO(oiLTX|W!O`Or(ors&osv(owx'}x#T(o#T#UH`#U;'S(o;'S;=`)]<%lO(oiLwX|W!O`Or(ors&osv(owx'}x#c(o#c#dMd#d;'S(o;'S;=`)]<%lO(oiMkX|W!O`Or(ors&osv(owx'}x#V(o#V#WNW#W;'S(o;'S;=`)]<%lO(oiN_X|W!O`Or(ors&osv(owx'}x#h(o#h#iNz#i;'S(o;'S;=`)]<%lO(oi! RX|W!O`Or(ors&osv(owx'}x#m(o#m#n! n#n;'S(o;'S;=`)]<%lO(oi! uX|W!O`Or(ors&osv(owx'}x#d(o#d#e!!b#e;'S(o;'S;=`)]<%lO(oi!!iX|W!O`Or(ors&osv(owx'}x#X(o#X#Y?y#Y;'S(o;'S;=`)]<%lO(oi!#_V!SP|W!O`Or(ors&osv(owx'}x;'S(o;'S;=`)]<%lO(ok!$PXaQVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qo!$wX[UVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qk!%mZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_!`$q!`!a!&`!a;'S$q;'S;=`)c<%lO$qk!&kX!RQVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$qk!'aZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_#P$q#P#Q!(S#Q;'S$q;'S;=`)c<%lO$qk!(]ZVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_!`$q!`!a!)O!a;'S$q;'S;=`)c<%lO$qk!)ZXxQVP|W!O`Or$qrs%gsv$qwx'^x!^$q!^!_(o!_;'S$q;'S;=`)c<%lO$q",
	tokenizers: [
		$D,
		tO,
		nO,
		rO,
		0,
		1,
		2,
		3,
		4
	],
	topRules: { Document: [0, 6] },
	tokenPrec: 0
});
//#endregion
//#region node_modules/@codemirror/lang-xml/dist/index.js
function oO(e, t) {
	let n = t && t.getChild("TagName");
	return n ? e.sliceString(n.from, n.to) : "";
}
function sO(e, t) {
	let n = t && t.firstChild;
	return !n || n.name != "OpenTag" ? "" : oO(e, n);
}
function cO(e, t, n) {
	let r = t && t.getChildren("Attribute").find((e) => e.from <= n && e.to >= n), i = r && r.getChild("AttributeName");
	return i ? e.sliceString(i.from, i.to) : "";
}
function lO(e) {
	for (let t = e && e.parent; t; t = t.parent) if (t.name == "Element") return t;
	return null;
}
function uO(e, t) {
	let n = Y(e).resolveInner(t, -1), r = null;
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
			context: lO(e)
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
			context: lO(e)
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
		context: n.name == "Element" ? n : lO(n)
	} : null;
}
var dO = class {
	constructor(e, t, n) {
		this.attrs = t, this.attrValues = n, this.children = [], this.name = e.name, this.completion = Object.assign(Object.assign({ type: "type" }, e.completion || {}), { label: this.name }), this.openCompletion = Object.assign(Object.assign({}, this.completion), { label: "<" + this.name }), this.closeCompletion = Object.assign(Object.assign({}, this.completion), {
			label: "</" + this.name + ">",
			boost: 2
		}), this.closeNameCompletion = Object.assign(Object.assign({}, this.completion), { label: this.name + ">" }), this.text = e.textContent ? e.textContent.map((e) => ({
			label: e,
			type: "text"
		})) : [];
	}
}, fO = /^[:\-\.\w\u00b7-\uffff]*$/;
function pO(e) {
	return Object.assign(Object.assign({ type: "property" }, e.completion || {}), { label: e.name });
}
function mO(e) {
	return typeof e == "string" ? {
		label: `"${e}"`,
		type: "constant"
	} : /^"/.test(e.label) ? e : Object.assign(Object.assign({}, e), { label: `"${e.label}"` });
}
function hO(e, t) {
	let n = [], r = [], i = Object.create(null);
	for (let e of t) {
		let t = pO(e);
		n.push(t), e.global && r.push(t), e.values && (i[e.name] = e.values.map(mO));
	}
	let a = [], o = [], s = Object.create(null);
	for (let t of e) {
		let e = r, c = i;
		t.attributes && (e = e.concat(t.attributes.map((e) => typeof e == "string" ? n.find((t) => t.label == e) || {
			label: e,
			type: "property"
		} : (e.values && (c == i && (c = Object.create(c)), c[e.name] = e.values.map(mO)), pO(e)))));
		let l = new dO(t, e, c);
		s[l.name] = l, a.push(l), t.top && o.push(l);
	}
	o.length || (o = a);
	for (let t = 0; t < a.length; t++) {
		let n = e[t], r = a[t];
		if (n.children) for (let e of n.children) s[e] && r.children.push(s[e]);
		else r.children = a;
	}
	return (e) => {
		let { doc: t } = e.state, n = uO(e.state, e.pos);
		if (!n || n.type == "tag" && !e.explicit) return null;
		let { type: c, from: l, context: u } = n;
		if (c == "openTag") {
			let e = o, n = sO(t, u);
			return n && (e = s[n]?.children || a), {
				from: l,
				options: e.map((e) => e.completion),
				validFor: fO
			};
		}
		if (c == "closeTag") {
			let n = sO(t, u);
			return n ? {
				from: l,
				to: e.pos + +(t.sliceString(e.pos, e.pos + 1) == ">"),
				options: [s[n]?.closeNameCompletion || {
					label: n + ">",
					type: "type"
				}],
				validFor: fO
			} : null;
		}
		if (c == "attrName") return {
			from: l,
			options: s[oO(t, u)]?.attrs || r,
			validFor: fO
		};
		if (c == "attrValue") {
			let n = cO(t, u, l);
			if (!n) return null;
			let r = (s[oO(t, u)]?.attrValues || i)[n];
			return !r || !r.length ? null : {
				from: l,
				to: e.pos + +(t.sliceString(e.pos, e.pos + 1) == "\""),
				options: r,
				validFor: /^"[^"]*"?$/
			};
		}
		if (c == "tag") {
			let n = sO(t, u), r = s[n], i = [], c = u && u.lastChild;
			n && (!c || c.name != "CloseTag" || oO(t, c) != n) && i.push(r ? r.closeCompletion : {
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
var gO = /*@__PURE__*/ Gg.define({
	name: "xml",
	parser: /*@__PURE__*/ aO.configure({ props: [
		/*@__PURE__*/ l_.add({
			Element(e) {
				let t = /^\s*<\//.test(e.textAfter);
				return e.lineIndent(e.node.from) + (t ? 0 : e.unit);
			},
			"OpenTag CloseTag SelfClosingTag"(e) {
				return e.column(e.node.from) + e.unit;
			}
		}),
		/*@__PURE__*/ C_.add({ Element(e) {
			let t = e.firstChild, n = e.lastChild;
			return !t || t.name != "OpenTag" ? null : {
				from: t.to,
				to: n.name == "CloseTag" ? n.from : e.to
			};
		} }),
		/*@__PURE__*/ F_.add({ "OpenTag CloseTag": (e) => e.getChild("TagName") })
	] }),
	languageData: {
		commentTokens: { block: {
			open: "<!--",
			close: "-->"
		} },
		indentOnInput: /^\s*<\/$/
	}
});
function _O(e = {}) {
	let t = [gO.data.of({ autocomplete: hO(e.elements || [], e.attributes || []) })];
	return e.autoCloseTags !== !1 && t.push(yO), new t_(gO, t);
}
function vO(e, t, n = e.length) {
	if (!t) return "";
	let r = t.firstChild, i = r && r.getChild("TagName");
	return i ? e.sliceString(i.from, Math.min(i.to, n)) : "";
}
var yO = /*@__PURE__*/ U.inputHandler.of((e, t, n, r, i) => {
	if (e.composing || e.state.readOnly || t != n || r != ">" && r != "/" || !gO.isActiveAt(e.state, t, -1)) return !1;
	let a = i(), { state: o } = a, s = o.changeByRange((e) => {
		let { head: t } = e, n = o.doc.sliceString(t - 1, t) == r, i = Y(o).resolveInner(t, -1), a;
		if (n && r == ">" && i.name == "EndTag") {
			let n = i.parent;
			if (n.parent?.lastChild?.name != "CloseTag" && (a = vO(o.doc, n.parent, t))) return {
				range: e,
				changes: {
					from: t,
					to: t + +(o.doc.sliceString(t, t + 1) === ">"),
					insert: `</${a}>`
				}
			};
		} else if (n && r == "/" && i.name == "StartCloseTag") {
			let e = i.parent;
			if (i.from == t - 2 && e.lastChild?.name != "CloseTag" && (a = vO(o.doc, e, t))) {
				let e = t + +(o.doc.sliceString(t, t + 1) === ">"), n = `${a}>`;
				return {
					range: R.cursor(t + n.length, -1),
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
//#endregion
//#region node_modules/@babel/runtime/helpers/esm/extends.js
function bO() {
	return bO = Object.assign ? Object.assign.bind() : function(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = arguments[t];
			for (var r in n) ({}).hasOwnProperty.call(n, r) && (e[r] = n[r]);
		}
		return e;
	}, bO.apply(null, arguments);
}
//#endregion
//#region node_modules/@uiw/codemirror-themes/esm/index.js
var xO = (e) => {
	var t = e.theme, n = e.settings, r = n === void 0 ? {} : n, i = e.styles, a = i === void 0 ? [] : i, o = { ".cm-gutters": {} }, s = {};
	r.background && (s.backgroundColor = r.background), r.backgroundImage && (s.backgroundImage = r.backgroundImage), r.foreground && (s.color = r.foreground), r.fontSize && (s.fontSize = r.fontSize), (r.background || r.foreground) && (o["&"] = s), r.fontFamily && (o["&.cm-editor .cm-scroller"] = { fontFamily: r.fontFamily }), r.gutterBackground && (o[".cm-gutters"].backgroundColor = r.gutterBackground), r.gutterForeground && (o[".cm-gutters"].color = r.gutterForeground), r.gutterBorder && (o[".cm-gutters"].borderRightColor = r.gutterBorder), r.caret && (o[".cm-content"] = { caretColor: r.caret }, o[".cm-cursor, .cm-dropCursor"] = { borderLeftColor: r.caret });
	var c = {};
	return r.gutterActiveForeground && (c.color = r.gutterActiveForeground), r.lineHighlight && (o[".cm-activeLine"] = { backgroundColor: r.lineHighlight }, c.backgroundColor = r.lineHighlight), o[".cm-activeLineGutter"] = c, r.selection && (o["&.cm-focused .cm-selectionBackground, & .cm-line::selection, & .cm-selectionLayer .cm-selectionBackground, .cm-content ::selection"] = { background: r.selection + " !important" }), r.selectionMatch && (o["& .cm-selectionMatch"] = { backgroundColor: r.selectionMatch }), [U.theme(o, { dark: t === "dark" }), k_(T_.define(a))];
}, SO = {
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
}, CO = [
	{
		tag: [
			J.keyword,
			J.operatorKeyword,
			J.modifier,
			J.color,
			J.constant(J.name),
			J.standard(J.name),
			J.standard(J.tagName),
			J.special(J.brace),
			J.atom,
			J.bool,
			J.special(J.variableName)
		],
		color: "#0000ff"
	},
	{
		tag: [J.moduleKeyword, J.controlKeyword],
		color: "#af00db"
	},
	{
		tag: [
			J.name,
			J.deleted,
			J.character,
			J.macroName,
			J.propertyName,
			J.variableName,
			J.labelName,
			J.definition(J.name)
		],
		color: "#0070c1"
	},
	{
		tag: J.heading,
		fontWeight: "bold",
		color: "#0070c1"
	},
	{
		tag: [
			J.typeName,
			J.className,
			J.tagName,
			J.number,
			J.changed,
			J.annotation,
			J.self,
			J.namespace
		],
		color: "#267f99"
	},
	{
		tag: [J.function(J.variableName), J.function(J.propertyName)],
		color: "#795e26"
	},
	{
		tag: [J.number],
		color: "#098658"
	},
	{
		tag: [
			J.operator,
			J.punctuation,
			J.separator,
			J.url,
			J.escape,
			J.regexp
		],
		color: "#383a42"
	},
	{
		tag: [J.regexp],
		color: "#af00db"
	},
	{
		tag: [
			J.special(J.string),
			J.processingInstruction,
			J.string,
			J.inserted
		],
		color: "#a31515"
	},
	{
		tag: [J.angleBracket],
		color: "#383a42"
	},
	{
		tag: J.strong,
		fontWeight: "bold"
	},
	{
		tag: J.emphasis,
		fontStyle: "italic"
	},
	{
		tag: J.strikethrough,
		textDecoration: "line-through"
	},
	{
		tag: [J.meta, J.comment],
		color: "#008000"
	},
	{
		tag: J.link,
		color: "#4078f2",
		textDecoration: "underline"
	},
	{
		tag: J.invalid,
		color: "#e45649"
	}
];
function wO(e) {
	var t = e || {}, n = t.theme, r = n === void 0 ? "light" : n, i = t.settings, a = i === void 0 ? {} : i, o = t.styles, s = o === void 0 ? [] : o;
	return xO({
		theme: r,
		settings: bO({}, SO, a),
		styles: [...CO, ...s]
	});
}
var TO = wO(), EO = {
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
}, DO = [
	{
		tag: [
			J.keyword,
			J.operatorKeyword,
			J.modifier,
			J.color,
			J.constant(J.name),
			J.standard(J.name),
			J.standard(J.tagName),
			J.special(J.brace),
			J.atom,
			J.bool,
			J.special(J.variableName)
		],
		color: "#569cd6"
	},
	{
		tag: [J.controlKeyword, J.moduleKeyword],
		color: "#c586c0"
	},
	{
		tag: [
			J.name,
			J.deleted,
			J.character,
			J.macroName,
			J.propertyName,
			J.variableName,
			J.labelName,
			J.definition(J.name)
		],
		color: "#9cdcfe"
	},
	{
		tag: J.heading,
		fontWeight: "bold",
		color: "#9cdcfe"
	},
	{
		tag: [
			J.typeName,
			J.className,
			J.tagName,
			J.number,
			J.changed,
			J.annotation,
			J.self,
			J.namespace
		],
		color: "#4ec9b0"
	},
	{
		tag: [J.function(J.variableName), J.function(J.propertyName)],
		color: "#dcdcaa"
	},
	{
		tag: [J.number],
		color: "#b5cea8"
	},
	{
		tag: [
			J.operator,
			J.punctuation,
			J.separator,
			J.url,
			J.escape,
			J.regexp
		],
		color: "#d4d4d4"
	},
	{
		tag: [J.regexp],
		color: "#d16969"
	},
	{
		tag: [
			J.special(J.string),
			J.processingInstruction,
			J.string,
			J.inserted
		],
		color: "#ce9178"
	},
	{
		tag: [J.angleBracket],
		color: "#808080"
	},
	{
		tag: J.strong,
		fontWeight: "bold"
	},
	{
		tag: J.emphasis,
		fontStyle: "italic"
	},
	{
		tag: J.strikethrough,
		textDecoration: "line-through"
	},
	{
		tag: [J.meta, J.comment],
		color: "#6a9955"
	},
	{
		tag: J.link,
		color: "#6a9955",
		textDecoration: "underline"
	},
	{
		tag: J.invalid,
		color: "#ff0000"
	}
];
function OO(e) {
	var t = e || {}, n = t.theme, r = n === void 0 ? "dark" : n, i = t.settings, a = i === void 0 ? {} : i, o = t.styles, s = o === void 0 ? [] : o;
	return xO({
		theme: r,
		settings: bO({}, EO, a),
		styles: [...DO, ...s]
	});
}
var kO = OO(), AO;
function jO(e) {
	return RegExp("^(?:" + e.join("|") + ")$", "i");
}
jO([]);
var MO = jO([
	"@prefix",
	"@base",
	"a"
]), NO = /[*+\-<>=&|]/;
function PO(e, t) {
	var n = e.next();
	if (AO = null, n == "<" && !e.match(/^[\s\u00a0=]/, !1)) return e.match(/^[^\s\u00a0>]*>?/), "atom";
	if (n == "\"" || n == "'") return t.tokenize = FO(n), t.tokenize(e, t);
	if (/[{}\(\),\.;\[\]]/.test(n)) return AO = n, null;
	if (n == "#") return e.skipToEnd(), "comment";
	if (NO.test(n)) return e.eatWhile(NO), null;
	if (n == ":") return "operator";
	if (e.eatWhile(/[_\w\d]/), e.peek() == ":") return "variableName.special";
	var r = e.current();
	return MO.test(r) ? "meta" : n >= "A" && n <= "Z" ? "comment" : "keyword";
	var r;
}
function FO(e) {
	return function(t, n) {
		for (var r = !1, i; (i = t.next()) != null;) {
			if (i == e && !r) {
				n.tokenize = PO;
				break;
			}
			r = !r && i == "\\";
		}
		return "string";
	};
}
function IO(e, t, n) {
	e.context = {
		prev: e.context,
		indent: e.indent,
		col: n,
		type: t
	};
}
function LO(e) {
	e.indent = e.context.indent, e.context = e.context.prev;
}
var RO = {
	name: "turtle",
	startState: function() {
		return {
			tokenize: PO,
			context: null,
			indent: 0,
			col: 0
		};
	},
	token: function(e, t) {
		if (e.sol() && (t.context && t.context.align == null && (t.context.align = !1), t.indent = e.indentation()), e.eatSpace()) return null;
		var n = t.tokenize(e, t);
		if (n != "comment" && t.context && t.context.align == null && t.context.type != "pattern" && (t.context.align = !0), AO == "(") IO(t, ")", e.column());
		else if (AO == "[") IO(t, "]", e.column());
		else if (AO == "{") IO(t, "}", e.column());
		else if (/[\]\}\)]/.test(AO)) {
			for (; t.context && t.context.type == "pattern";) LO(t);
			t.context && AO == t.context.type && LO(t);
		} else AO == "." && t.context && t.context.type == "pattern" ? LO(t) : /atom|string|variable/.test(n) && t.context && (/[\}\]]/.test(t.context.type) ? IO(t, "pattern", e.column()) : t.context.type == "pattern" && !t.context.align && (t.context.align = !0, t.context.col = e.column()));
		return n;
	},
	indent: function(e, t, n) {
		var r = t && t.charAt(0), i = e.context;
		if (/[\]\}]/.test(r)) for (; i && i.type == "pattern";) i = i.prev;
		var a = i && r == i.type;
		return i ? i.type == "pattern" ? i.col : i.align ? i.col + +!a : i.indent + (a ? 0 : n.unit) : 0;
	},
	languageData: { commentTokens: { line: "#" } }
}, zO;
function BO(e) {
	return RegExp("^(?:" + e.join("|") + ")$", "i");
}
var VO = BO(/* @__PURE__ */ "str.lang.langmatches.datatype.bound.sameterm.isiri.isuri.iri.uri.bnode.count.sum.min.max.avg.sample.group_concat.rand.abs.ceil.floor.round.concat.substr.strlen.replace.ucase.lcase.encode_for_uri.contains.strstarts.strends.strbefore.strafter.year.month.day.hours.minutes.seconds.timezone.tz.now.uuid.struuid.md5.sha1.sha256.sha384.sha512.coalesce.if.strlang.strdt.isnumeric.regex.exists.isblank.isliteral.a.bind".split(".")), HO = BO(/* @__PURE__ */ "base.prefix.select.distinct.reduced.construct.describe.ask.from.named.where.order.limit.offset.filter.optional.graph.by.asc.desc.as.having.undef.values.group.minus.in.not.service.silent.using.insert.delete.union.true.false.with.data.copy.to.move.add.create.drop.clear.load.into".split(".")), UO = /[*+\-<>=&|\^\/!\?]/, WO = "[A-Za-z_\\-0-9]", GO = /* @__PURE__ */ RegExp("[A-Za-z]"), KO = RegExp("((" + WO + "|\\.)*(" + WO + "))?:");
function qO(e, t) {
	var n = e.next();
	if (zO = null, n == "$" || n == "?") return n == "?" && e.match(/\s/, !1) ? "operator" : (e.match(/^[A-Za-z0-9_\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][A-Za-z0-9_\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]*/), "variableName.local");
	if (n == "<" && !e.match(/^[\s\u00a0=]/, !1)) return e.match(/^[^\s\u00a0>]*>?/), "atom";
	if (n == "\"" || n == "'") return t.tokenize = YO(n), t.tokenize(e, t);
	if (/[{}\(\),\.;\[\]]/.test(n)) return zO = n, "bracket";
	if (n == "#") return e.skipToEnd(), "comment";
	if (UO.test(n)) return "operator";
	if (n == ":") return JO(e), "atom";
	if (n == "@") return e.eatWhile(/[a-z\d\-]/i), "meta";
	if (GO.test(n) && e.match(KO)) return JO(e), "atom";
	e.eatWhile(/[_\w\d]/);
	var r = e.current();
	return VO.test(r) ? "builtin" : HO.test(r) ? "keyword" : "variable";
}
function JO(e) {
	e.match(/(\.(?=[\w_\-\\%])|[:\w_-]|\\[-\\_~.!$&'()*+,;=/?#@%]|%[a-f\d][a-f\d])+/i);
}
function YO(e) {
	return function(t, n) {
		for (var r = !1, i; (i = t.next()) != null;) {
			if (i == e && !r) {
				n.tokenize = qO;
				break;
			}
			r = !r && i == "\\";
		}
		return "string";
	};
}
function XO(e, t, n) {
	e.context = {
		prev: e.context,
		indent: e.indent,
		col: n,
		type: t
	};
}
function ZO(e) {
	e.indent = e.context.indent, e.context = e.context.prev;
}
var QO = {
	name: "sparql",
	startState: function() {
		return {
			tokenize: qO,
			context: null,
			indent: 0,
			col: 0
		};
	},
	token: function(e, t) {
		if (e.sol() && (t.context && t.context.align == null && (t.context.align = !1), t.indent = e.indentation()), e.eatSpace()) return null;
		var n = t.tokenize(e, t);
		if (n != "comment" && t.context && t.context.align == null && t.context.type != "pattern" && (t.context.align = !0), zO == "(") XO(t, ")", e.column());
		else if (zO == "[") XO(t, "]", e.column());
		else if (zO == "{") XO(t, "}", e.column());
		else if (/[\]\}\)]/.test(zO)) {
			for (; t.context && t.context.type == "pattern";) ZO(t);
			t.context && zO == t.context.type && (ZO(t), zO == "}" && t.context && t.context.type == "pattern" && ZO(t));
		} else zO == "." && t.context && t.context.type == "pattern" ? ZO(t) : /atom|string|variable/.test(n) && t.context && (/[\}\]]/.test(t.context.type) ? XO(t, "pattern", e.column()) : t.context.type == "pattern" && !t.context.align && (t.context.align = !0, t.context.col = e.column()));
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
function $O(e, t) {
	var n = e.location;
	e.location = n == $.PRE_SUBJECT && t == "<" ? $.WRITING_SUB_URI : n == $.PRE_SUBJECT && t == "_" ? $.WRITING_BNODE_URI : n == $.PRE_PRED && t == "<" ? $.WRITING_PRED_URI : n == $.PRE_OBJ && t == "<" ? $.WRITING_OBJ_URI : n == $.PRE_OBJ && t == "_" ? $.WRITING_OBJ_BNODE : n == $.PRE_OBJ && t == "\"" ? $.WRITING_OBJ_LITERAL : n == $.WRITING_SUB_URI && t == ">" || n == $.WRITING_BNODE_URI && t == " " ? $.PRE_PRED : n == $.WRITING_PRED_URI && t == ">" ? $.PRE_OBJ : n == $.WRITING_OBJ_URI && t == ">" || n == $.WRITING_OBJ_BNODE && t == " " || n == $.WRITING_OBJ_LITERAL && t == "\"" || n == $.WRITING_LIT_LANG && t == " " || n == $.WRITING_LIT_TYPE && t == ">" ? $.POST_OBJ : n == $.WRITING_OBJ_LITERAL && t == "@" ? $.WRITING_LIT_LANG : n == $.WRITING_OBJ_LITERAL && t == "^" ? $.WRITING_LIT_TYPE : t == " " && (n == $.PRE_SUBJECT || n == $.PRE_PRED || n == $.PRE_OBJ || n == $.POST_OBJ) ? n : n == $.POST_OBJ && t == "." ? $.PRE_SUBJECT : $.ERROR;
}
var ek = {
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
			$O(t, n);
			var r = "";
			return e.eatWhile(function(e) {
				return e != "#" && e != ">" && (r += e, !0);
			}), t.uris.push(r), e.match("#", !1) ? "variable" : (e.next(), $O(t, ">"), "variable");
		}
		if (n == "#") {
			var i = "";
			return e.eatWhile(function(e) {
				return e != ">" && e != " " && (i += e, !0);
			}), t.anchors.push(i), "url";
		}
		if (n == ">") return $O(t, ">"), "variable";
		if (n == "_") {
			$O(t, n);
			var a = "";
			return e.eatWhile(function(e) {
				return e != " " && (a += e, !0);
			}), t.bnodes.push(a), e.next(), $O(t, " "), "builtin";
		}
		if (n == "\"") return $O(t, n), e.eatWhile(function(e) {
			return e != "\"";
		}), e.next(), e.peek() != "@" && e.peek() != "^" && $O(t, "\""), "string";
		if (n == "@") {
			$O(t, "@");
			var o = "";
			return e.eatWhile(function(e) {
				return e != " " && (o += e, !0);
			}), t.langs.push(o), e.next(), $O(t, " "), "string.special";
		}
		if (n == "^") {
			e.next(), $O(t, "^");
			var s = "";
			return e.eatWhile(function(e) {
				return e != ">" && (s += e, !0);
			}), t.types.push(s), e.next(), $O(t, ">"), "variable";
		}
		n == " " && $O(t, n), n == "." && $O(t, n);
	}
}, tk = class {
	_view = null;
	_languageCompartment = null;
	_editableCompartment = null;
	_onDirtyChange;
	_isDirty = !1;
	async initialize(e, t = "", n = "text/turtle", r = "dark", i) {
		this._view && this._view.destroy(), this._languageCompartment = new uc(), this._editableCompartment = new uc(), this._onDirtyChange = i, this._isDirty = !1;
		let a = await this._getLanguageExtension(n), o = Vc.create({
			doc: t,
			extensions: [
				r === "dark" ? kO : TO,
				U.theme({ "&": { minHeight: "6lh" } }),
				this._languageCompartment.of(a),
				this._editableCompartment.of(U.editable.of(!0)),
				k_(M_, { fallback: !0 }),
				vh(),
				Tv(),
				Km(),
				U.lineWrapping,
				U.updateListener.of((e) => {
					e.docChanged && !this._isDirty && (this._isDirty = !0, this._onDirtyChange?.(!0));
				}),
				km.of([...Mb, ...Wv])
			]
		});
		this._view = new U({
			state: o,
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
		let t = this._editableCompartment;
		t && this._view.dispatch({ effects: t.reconfigure(U.editable.of(!e)) });
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
			case "text/n3": return K_.define(RO);
			case "application/sparql-update":
			case "application/sparql-query": return K_.define(QO);
			case "application/nquads":
			case "application/n-quads":
			case "application/n-triples": return K_.define(ek);
			case "application/json":
			case "application/ld+json": return kT();
			case "text/html":
			case "application/xhtml+xml": return ST();
			case "text/markdown":
			case "text/x-markdown":
			case "text/md": return kD();
			case "application/rdf+xml":
			case "application/xml": return _O();
			case "text/css": return oS();
			case "text/javascript":
			case "application/javascript":
			case "application/ecmascript": return Ww();
			default: return [];
		}
	}
}, nk = typeof window < "u" ? window.document : null;
//#endregion
export { Zt as _, cs as a, Po as c, La as d, ja as f, tn as g, an as h, ds as i, Co as l, dn as m, tk as n, Yo as o, pn as p, fs as r, Fo as s, nk as t, So as u, Qt as v, at as y };

//# sourceMappingURL=src-QL9oD8fg.js.map