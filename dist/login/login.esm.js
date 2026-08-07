import { __exportAll as e } from "../_virtual/_rolldown/runtime.esm.js";
import t from "../lib/ns.esm.js";
import { alert as n } from "../lib/log.esm.js";
import { label as r } from "../utils/label.esm.js";
import "../utils/index.esm.js";
import { log as i, warn as a } from "../lib/debug.esm.js";
import { style as o } from "../lib/style.esm.js";
import { errorMessageBlock as s } from "../widgets/error.esm.js";
import { askName as c, clearElement as l, personTR as u } from "../widgets/buttons.esm.js";
import { buildCheckboxForm as d, newThing as f } from "../widgets/forms.esm.js";
import "../widgets/index.esm.js";
import { Signup as p } from "../signup/signup.esm.js";
import { BlankNode as m, st as h } from "rdflib";
import { CrossOriginForbiddenError as g, FetchError as _, NotEditableError as v, SameOriginForbiddenError as y, UnauthorizedError as b, WebOperationError as x, authSession as S, authn as C, getSuggestedIssuers as w, offlineTestID as T, solidLogicSingleton as E } from "solid-logic";
//#region src/login/login.ts
var D = /* @__PURE__ */ e({
	ensureLoadedPreferences: () => L,
	ensureLoadedProfile: () => R,
	ensureLoggedIn: () => I,
	filterAvailablePanes: () => X,
	findAppInstances: () => z,
	getUserRoles: () => Y,
	loginStatusBox: () => K,
	newAppInstance: () => J,
	registrationControl: () => V,
	registrationList: () => U,
	renderScopeHeadingRow: () => H,
	renderSignInPopup: () => G,
	scopeLabel: () => B,
	selectWorkspace: () => q
}), O = E.store, { loadPreferences: k, loadProfile: A } = E.profile, { getScopedAppInstances: j, getRegistrations: M, loadAllTypeIndexes: N, getScopedAppsFromIndex: P, deleteTypeIndexRegistration: F } = E.typeIndex;
function I(e) {
	let t = C.currentUser();
	return t ? (C.saveUser(t, e), Promise.resolve(e)) : new Promise((t) => {
		C.checkUser().then((n) => {
			if (n) return i(`logIn: Already logged in as ${n}`), t(e);
			if (!e.div || !e.dom) return t(e);
			let r = K(e.dom, (n) => {
				C.saveUser(n, e), t(e);
			});
			e.div.appendChild(r);
		}).catch((n) => {
			if (i(`logIn: session check failed, showing login (${n})`), !e.div || !e.dom) return t(e);
			let r = K(e.dom, (n) => {
				C.saveUser(n, e), t(e);
			});
			e.div.appendChild(r);
		});
	});
}
async function L(e) {
	if (e.preferencesFile) return Promise.resolve(e);
	try {
		e = await R(e);
		let t = await k(e.me);
		e.preferencesFile = t;
	} catch (t) {
		let r;
		if (t instanceof b) r = "Oops — you are not authenticated (properly logged in), so SolidOS cannot read your preferences file. Try logging out and then logging back in.", n(r);
		else if (t instanceof g) return r = `Unauthorized: Assuming preference file blocked for origin ${window.location.origin}`, e.preferencesFileError = r, e;
		else if (t instanceof y) return r = "You are not authorized to read your preference file. This may be because you are using an untrusted web app.", a(r), e;
		else if (t instanceof v) return r = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", a(r), e;
		else if (t instanceof x) r = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", a(r);
		else if (t instanceof _) r = `Strange: Error ${t.status} trying to read your preference file.${t.message}`, n(r);
		else throw Error(`(via loadPrefs) ${t}`);
		e.preferencesFileError = r;
	}
	return e;
}
async function R(e) {
	if (e.publicProfile) return e;
	try {
		let t = await I(e);
		if (!t.me) throw Error("Could not log in");
		e.publicProfile = await A(t.me);
	} catch (t) {
		throw e.div && e.dom && e.div.appendChild(s(e.dom, t.message)), Error(`Can't log in: ${t}`);
	}
	return e;
}
async function z(e, t, n) {
	let r = e.me ? await j(t, e.me) : [];
	return n === !0 ? r = r.filter((e) => e.scope.label === "public") : n === !1 && (r = r.filter((e) => e.scope.label === "private")), e.instances = r.map((e) => e.instance), e;
}
function B(e, t) {
	return `${e.me && e.me.sameTerm(t.agent) ? "" : r(t.agent) + " "}${t.label}`;
}
async function V(e, n, r) {
	function a(e) {
		let i = M(n, r), a = i.length ? i[0] : f(e);
		return [h(a, t.solid("instance"), n, e), h(a, t.solid("forClass"), r, e)];
	}
	function o(t) {
		let n = a(t.index), r = `${B(e, t)} link to this ${e.noun}`;
		return d(e.dom, E.store, r, null, n, _, t.index);
	}
	let c = e.dom;
	if (!c || !e.div) throw Error("registrationControl: need dom and div");
	let l = c.createElement("div");
	e.div.appendChild(l), e.me = C.currentUser();
	let u = e.me;
	if (!u) return l.innerHTML = "<p style=\"margin:2em;\">(Log in to save a link to this)</p>", e;
	let p;
	try {
		p = await N(u);
	} catch (t) {
		let n;
		return e.div && e.preferencesFileError ? (n = "(Lists of stuff not available)", e.div.appendChild(c.createElement("p")).textContent = n) : e.div && (n = `registrationControl: Type indexes not available: ${t}`, e.div.appendChild(s(e.dom, t))), i(n), e;
	}
	l.innerHTML = "<table><tbody></tbody></table>", l.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;");
	let g = l.children[0].children[0], _ = new m();
	for (let e of p) g.appendChild(c.createElement("tr")).appendChild(o(e));
	return e;
}
function H(e, t, n) {
	let r = {
		private: "#fee",
		public: "#efe"
	}, { dom: i } = e, a = B(e, n), o = i.createElement("tr"), s = o.appendChild(i.createElement("td"));
	s.setAttribute("colspan", "3"), s.style.backgoundColor = r[n.label] || "white";
	let c = s.appendChild(i.createElement("h3"));
	return c.textContent = a + " links", c.style.textAlign = "left", o;
}
async function U(e, n) {
	let r = e.dom, i = e.div, a = r.createElement("div");
	if (i.appendChild(a), e.me = C.currentUser(), !e.me) return a.innerHTML = "<p style=\"margin:2em;\">(Log in list your stuff)</p>", e;
	let o = await N(e.me);
	a.innerHTML = "<table><tbody></tbody></table>", a.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid #eee 0.5em;");
	let s = a.firstChild.firstChild;
	for (let i of o) {
		let a = H(e, O, i);
		s.appendChild(a);
		let o = await P(i, n.type || null);
		o.length === 0 && (a.style.display = "none");
		for (let e of o) {
			let n = u(r, t.solid("instance"), e.instance, { deleteFunction: async () => {
				await F(e), s.removeChild(n);
			} });
			n.children[0].style.paddingLeft = "3em", s.appendChild(n);
		}
	}
	return e;
}
function W(e, t, n = {}) {
	n ||= {};
	let r = n.buttonStyle || o.signInAndUpButtonStyle, a = e.createElement("div"), c = "SolidSignInOrSignUpBox";
	i("widgets.signInOrSignUpBox"), a.setUserCallback = t, a.setAttribute("class", c), a.setAttribute("style", "display:flex;");
	let l = e.createElement("input");
	a.appendChild(l), l.setAttribute("type", "button"), l.setAttribute("value", "Log in"), l.setAttribute("style", `${r}${o.headerBannerLoginInput}` + o.signUpBackground), S.events.on("login", () => {
		let t = C.currentUser();
		if (t) {
			let n = t.uri, r = e.getElementsByClassName(c);
			i(`Logged in, ${r.length} panels to be serviced`);
			for (let t = 0; t < r.length; t++) {
				let a = r[t];
				if (a.setUserCallback) try {
					a.setUserCallback(n);
					let e = a.parentNode;
					e && e.removeChild(a);
				} catch (t) {
					i(`## Error satisfying login box: ${t}`), a.appendChild(s(e, t));
				}
			}
		}
	}), l.addEventListener("click", () => {
		let n = T();
		if (n) return t(n.uri);
		G(e);
	}, !1);
	let u = e.createElement("input");
	return a.appendChild(u), u.setAttribute("type", "button"), u.setAttribute("value", "Sign Up for Solid"), u.setAttribute("style", `${r}${o.headerBannerLoginInput}` + o.signInBackground), u.addEventListener("click", function(e) {
		new p().signup().then(function(e) {
			i("signInOrSignUpBox signed up " + e), t(e);
		});
	}, !1), a;
}
function G(e) {
	let t = e.createElement("div");
	t.setAttribute("style", "position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center;"), e.body.appendChild(t);
	let r = e.createElement("div");
	r.setAttribute("style", "\n      background-color: white;\n      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -moz-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      border-radius: 4px;\n      min-width: 400px;\n      padding: 10px;\n      z-index : 10;\n    "), t.appendChild(r);
	let i = e.createElement("div");
	i.setAttribute("style", "\n      border-bottom: 1px solid #DDD;\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      justify-content: space-between;\n    "), r.appendChild(i);
	let a = e.createElement("label");
	a.setAttribute("style", "margin-right: 5px; font-weight: 800"), a.innerText = "Select an identity provider";
	let o = e.createElement("button");
	o.innerHTML = "<img src=\"https://solidos.github.io/solid-ui/src/icons/noun_1180156.svg\" style=\"width: 2em; height: 2em;\" title=\"Cancel\">", o.setAttribute("style", "background-color: transparent; border: none;"), o.addEventListener("click", () => {
		t.remove();
	}), i.appendChild(a), i.appendChild(o);
	let s = async (e) => {
		try {
			E.store.updater.flagAuthorizationMetadata();
			let t = new URL(window.location.href).hash;
			t && window.localStorage.setItem("preLoginRedirectHash", t), window.localStorage.setItem("loginIssuer", e);
			let n = new URL(window.location.href);
			n.hash = "", await S.login(e, n.href);
		} catch (e) {
			n(e.message);
		}
	}, c = e.createElement("div");
	c.setAttribute("style", "\n      border-bottom: 1px solid #DDD;\n      display: flex;\n      flex-direction: column;\n      padding-top: 10px;\n    ");
	let l = e.createElement("div");
	l.setAttribute("style", "\n      display: flex;\n      flex-direction: row;\n    ");
	let u = e.createElement("label");
	u.innerText = "Enter the URL of your identity provider:", u.setAttribute("style", "color: #888");
	let d = e.createElement("input");
	d.setAttribute("type", "text"), d.setAttribute("style", "margin-left: 0 !important; flex: 1; margin-right: 5px !important"), d.setAttribute("placeholder", "https://example.com"), d.value = localStorage.getItem("loginIssuer") || "";
	let f = e.createElement("button");
	f.innerText = "Go", f.setAttribute("style", "margin-top: 12px; margin-bottom: 12px;"), f.addEventListener("click", () => {
		s(d.value);
	}), c.appendChild(u), l.appendChild(d), l.appendChild(f), c.appendChild(l), r.appendChild(c);
	let p = e.createElement("div");
	p.setAttribute("style", "\n      display: flex;\n      flex-direction: column;\n      padding-top: 10px;\n    ");
	let m = e.createElement("label");
	m.innerText = "Or pick an identity provider from the list below:", m.setAttribute("style", "color: #888"), p.appendChild(m), w().forEach((t) => {
		let n = e.createElement("button");
		n.innerText = t.name, n.setAttribute("style", "height: 38px; margin-top: 10px"), n.addEventListener("click", () => {
			s(t.uri);
		}), p.appendChild(n);
	}), r.appendChild(p);
}
function K(e, r = null, i = {}) {
	let a = T(), s = e.createElement("div");
	function c(e) {
		e && (a = C.saveUser(e), s.refresh(), r && r(a.uri));
	}
	function u(e) {
		let t = a;
		S.logout().then(function() {
			let e = `Your WebID was ${t}. It has been forgotten.`;
			a = null;
			try {
				n(e);
			} catch {
				window.alert(e);
			}
			s.refresh(), r && r(null);
		}, (e) => {
			n("Fail to log out:" + e);
		});
	}
	function d(n, r) {
		let i = r.buttonStyle || o.signInAndUpButtonStyle, a = "WebID logout";
		if (n) {
			let e = E.store.any(n, t.foaf("nick")) || E.store.any(n, t.foaf("name"));
			e && (a = "Logout " + e.value);
		}
		let s = e.createElement("input");
		return s.setAttribute("type", "button"), s.setAttribute("value", a), s.setAttribute("style", `${i}`), s.addEventListener("click", u, !1), s;
	}
	s.refresh = function() {
		let t = S.webId;
		a = t ? E.store.sym(t) : null, (a && s.me !== a.uri || !a && s.me) && (l(s), a ? s.appendChild(d(a, i)) : s.appendChild(W(e, c, i))), s.me = a ? a.uri : null;
	}, s.refresh();
	function f() {
		a = C.currentUser(), s.refresh();
	}
	return f(), S.events.on("login", f), S.events.on("logout", f), s.me = "99999", s.refresh(), s;
}
S.events.on("logout", async () => {
	let e = window.localStorage.getItem("loginIssuer");
	if (e) try {
		E.store.updater.flagAuthorizationMetadata();
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
function q(e, n, r) {
	let a = n.noun, l = n.appPathSegment, u = T(), d = e.createElement("div"), p = {
		me: u,
		dom: e,
		div: d
	};
	function m(t, n) {
		d.appendChild(s(e, t, n));
	}
	function g(e) {
		let n = E.store.any(e, t.space("uriPrefix")), r;
		return r = n ? n.value : e.uri.split("#")[0], r.slice(-1) !== "/" && (i(`${l}: No / at end of uriPrefix ${r}`), r = `${r}/`), r += `${l}/id${(/* @__PURE__ */ new Date()).getTime()}/`, r;
	}
	function _(n) {
		async function i(r) {
			let i = v.appendChild(e.createElement("tr")).appendChild(e.createElement("td"));
			i.setAttribute("colspan", "3"), i.style.padding = "0.5em";
			let a = encodeURI(await c(e, E.store, i, t.solid("URL"), t.space("Workspace"), "Workspace")), o = f(n.preferencesFile), s = [h(n.me, t.space("workspace"), o, n.preferencesFile), h(o, t.space("uriPrefix"), a, n.preferencesFile)];
			if (!E.store.updater) throw Error("store has no updater");
			await E.store.updater.update([], s);
		}
		let s = n.me, l = n.preferencesFile, u = null, p = E.store.each(s, t.space("workspace"), void 0, l), _ = E.store.each(s, t.space("storage"));
		p.length === 0 && _ && (m(`You don't seem to have any workspaces. You have ${_.length} storage spaces.`, "white"), _.map(function(e) {
			return p = p.concat(E.store.each(e, t.ldp("contains"))), p;
		}).filter((e) => e.id ? ["public", "private"].includes(e.id().toLowerCase()) : "")), p.length === 1 && (m(`Workspace used: ${p[0].uri}`, "white"), u = g(p[0]));
		let v = e.createElement("table");
		v.setAttribute("style", "border-collapse:separate; border-spacing: 0.5em;"), d.appendChild(v), d.appendChild(e.createElement("hr"));
		let y = d.appendChild(e.createElement("p"));
		y.setAttribute("style", o.commentStyle), y.textContent = `Where would you like to store the data for the ${a}?
    Give the URL of the folder where you would like the data stored.
    It can be anywhere in solid world - this URI is just an idea.`;
		let b = d.appendChild(e.createElement("input"));
		b.setAttribute("type", "text"), b.setAttribute("style", o.textInputStyle), b.size = 80, b.label = "base URL", b.autocomplete = "on", u && (b.value = u), n.baseField = b, d.appendChild(e.createElement("br"));
		let x = d.appendChild(e.createElement("button"));
		x.setAttribute("style", o.buttonStyle), x.textContent = `Start new ${a} at this URI`, x.addEventListener("click", function(e) {
			let t = b.value.replace(" ", "%20");
			t.slice(-1) !== "/" && (t += "/"), r(null, t);
		}), p = p.filter(function(e) {
			return !E.store.holds(e, t.rdf("type"), t.space("MasterWorkspace"));
		});
		let S, C, w, T, D, O, k, A = "height: 3em; margin: 1em; padding: 1em white; border-radius: 0.3em;", j = `${A}border: 0px;`;
		for (let n = 0; n < p.length; n++) {
			D = p[n], T = e.createElement("tr"), n === 0 && (S = e.createElement("td"), S.setAttribute("rowspan", `${p.length}`), S.textContent = "Choose a workspace for this:", S.setAttribute("style", "vertical-align:middle;"), T.appendChild(S)), C = e.createElement("td"), O = E.store.anyValue(D, t.ui("style")), O ||= `color: black ; background-color: ${`#${(function(e) {
				return e.split("").reduce(function(e, t) {
					return e = (e << 5) - e + t.charCodeAt(0), e & e;
				}, 0);
			}(D.uri) & 16777215 | 12632256).toString(16)}`};`, C.setAttribute("style", j + O), T.target = D.uri;
			let i = E.store.any(D, t.rdfs("label"));
			i ||= D.uri.split("/").slice(-1)[0] || D.uri.split("/").slice(-2)[0], C.textContent = i || "???", T.appendChild(C), n === 0 && (w = e.createElement("td"), w.setAttribute("rowspan", `${p.length}1`), w.setAttribute("style", "width:50%;"), T.appendChild(w)), v.appendChild(T), k = E.store.any(D, t.rdfs("comment")), k = k ? k.value : "Use this workspace", C.addEventListener("click", function(t) {
				w.textContent = k ? k.value : "", w.setAttribute("style", j + O);
				let n = e.createElement("button");
				n.textContent = "Continue";
				let i = g(D);
				b.value = i, n.addEventListener("click", function(e) {
					n.disabled = !0, r(D, i), n.textContent = "---->";
				}, !0), w.appendChild(n);
			}, !0);
		}
		let M = e.createElement("tr");
		C = e.createElement("td"), C.setAttribute("style", A), C.textContent = "+ Make a new workspace", C.addEventListener("click", i), M.appendChild(C), v.appendChild(M);
	}
	return L(p).then(_).catch((e) => {
		d.appendChild(s(p.dom, e));
	}), d;
}
function J(e, t, n) {
	let r = function(e, t) {
		n(e, t);
	}, i = e.createElement("div"), a = e.createElement("button");
	return a.setAttribute("type", "button"), i.appendChild(a), a.innerHTML = `Make new ${t.noun}`, a.addEventListener("click", (n) => {
		i.appendChild(q(e, t, r));
	}, !1), i.appendChild(a), i;
}
async function Y() {
	try {
		let { me: e, preferencesFile: n, preferencesFileError: r } = await L({});
		if (!n || r) throw Error(r);
		return E.store.each(e, t.rdf("type"), null, n.doc());
	} catch (e) {
		a("Unable to fetch your preferences - this was the error: ", e);
	}
	return [];
}
async function X(e) {
	let t = await Y();
	return e.filter((e) => Z(e, t));
}
function Z(e, t) {
	return (e.audience || []).reduce((e, n) => e && !!t.find((e) => e.equals(n)), !0);
}
//#endregion
export { L as ensureLoadedPreferences, R as ensureLoadedProfile, I as ensureLoggedIn, X as filterAvailablePanes, z as findAppInstances, Y as getUserRoles, K as loginStatusBox, D as login_exports, J as newAppInstance, V as registrationControl, U as registrationList, H as renderScopeHeadingRow, G as renderSignInPopup, B as scopeLabel, q as selectWorkspace };

//# sourceMappingURL=login.esm.js.map