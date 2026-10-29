import { __exportAll as e } from "../_virtual/_rolldown/runtime.esm.js";
import { log as t, warn as n } from "../lib/debug.esm.js";
import { style as r } from "../lib/style.esm.js";
import { label as i } from "../utils/label.esm.js";
import { alert as a } from "../lib/log.esm.js";
import o from "../lib/ns.esm.js";
import { Signup as s } from "../signup/signup.esm.js";
import { errorMessageBlock as c } from "../widgets/error.esm.js";
import { askName as l, clearElement as u, personTR as d } from "../widgets/buttons.esm.js";
import { buildCheckboxForm as f, newThing as p } from "../widgets/forms.esm.js";
import "../utils/index.esm.js";
import "../widgets/index.esm.js";
import { BlankNode as m, st as h } from "rdflib";
import { CrossOriginForbiddenError as g, FetchError as _, NotEditableError as v, SameOriginForbiddenError as y, UnauthorizedError as b, WebOperationError as x, authSession as S, authn as C, getSuggestedIssuers as w, offlineTestID as T, solidLogicSingleton as E } from "solid-logic";
// src/login/login.ts
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
	let n = C.currentUser();
	return n ? (C.saveUser(n, e), Promise.resolve(e)) : new Promise((n) => {
		C.checkUser().then((r) => {
			if (r) return t(`logIn: Already logged in as ${r}`), n(e);
			if (!e.div || !e.dom) return n(e);
			let i = K(e.dom, (t) => {
				C.saveUser(t, e), n(e);
			});
			e.div.appendChild(i);
		}).catch((r) => {
			if (t(`logIn: session check failed, showing login (${r})`), !e.div || !e.dom) return n(e);
			let i = K(e.dom, (t) => {
				C.saveUser(t, e), n(e);
			});
			e.div.appendChild(i);
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
		if (t instanceof b) r = "Oops — you are not authenticated (properly logged in), so SolidOS cannot read your preferences file. Try logging out and then logging back in.", a(r);
		else if (t instanceof g) return r = `Unauthorized: Assuming preference file blocked for origin ${window.location.origin}`, e.preferencesFileError = r, e;
		else if (t instanceof y) return r = "You are not authorized to read your preference file. This may be because you are using an untrusted web app.", n(r), e;
		else if (t instanceof v) return r = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", n(r), e;
		else if (t instanceof x) r = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", n(r);
		else if (t instanceof _) r = `Strange: Error ${t.status} trying to read your preference file.${t.message}`, a(r);
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
		throw e.div && e.dom && e.div.appendChild(c(e.dom, t.message)), Error(`Can't log in: ${t}`);
	}
	return e;
}
async function z(e, t, n) {
	let r = e.me ? await j(t, e.me) : [];
	return n === !0 ? r = r.filter((e) => e.scope.label === "public") : n === !1 && (r = r.filter((e) => e.scope.label === "private")), e.instances = r.map((e) => e.instance), e;
}
function B(e, t) {
	return `${e.me && e.me.sameTerm(t.agent) ? "" : i(t.agent) + " "}${t.label}`;
}
async function V(e, n, r) {
	function i(e) {
		let t = M(n, r), i = t.length ? t[0] : p(e);
		return [h(i, o.solid("instance"), n, e), h(i, o.solid("forClass"), r, e)];
	}
	function a(t) {
		let n = i(t.index), r = `${B(e, t)} link to this ${e.noun}`;
		return f(e.dom, E.store, r, null, n, _, t.index);
	}
	let s = e.dom;
	if (!s || !e.div) throw Error("registrationControl: need dom and div");
	let l = s.createElement("div");
	e.div.appendChild(l), e.me = C.currentUser();
	let u = e.me;
	if (!u) return l.innerHTML = "<p style=\"margin:2em;\">(Log in to save a link to this)</p>", e;
	let d;
	try {
		d = await N(u);
	} catch (n) {
		let r;
		return e.div && e.preferencesFileError ? (r = "(Lists of stuff not available)", e.div.appendChild(s.createElement("p")).textContent = r) : e.div && (r = `registrationControl: Type indexes not available: ${n}`, e.div.appendChild(c(e.dom, n))), t(r), e;
	}
	l.innerHTML = "<table><tbody></tbody></table>", l.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;");
	let g = l.children[0].children[0], _ = new m();
	for (let e of d) g.appendChild(s.createElement("tr")).appendChild(a(e));
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
async function U(e, t) {
	let n = e.dom, r = e.div, i = n.createElement("div");
	if (r.appendChild(i), e.me = C.currentUser(), !e.me) return i.innerHTML = "<p style=\"margin:2em;\">(Log in list your stuff)</p>", e;
	let a = await N(e.me);
	i.innerHTML = "<table><tbody></tbody></table>", i.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid #eee 0.5em;");
	let s = i.firstChild.firstChild;
	for (let r of a) {
		let i = H(e, O, r);
		s.appendChild(i);
		let a = await P(r, t.type || null);
		a.length === 0 && (i.style.display = "none");
		for (let e of a) {
			let t = d(n, o.solid("instance"), e.instance, { deleteFunction: async () => {
				await F(e), s.removeChild(t);
			} });
			t.children[0].style.paddingLeft = "3em", s.appendChild(t);
		}
	}
	return e;
}
function W(e, n, i = {}) {
	i ||= {};
	let a = i.buttonStyle || r.signInAndUpButtonStyle, o = e.createElement("div"), l = "SolidSignInOrSignUpBox";
	t("widgets.signInOrSignUpBox"), o.setUserCallback = n, o.setAttribute("class", l), o.setAttribute("style", "display:flex;");
	let u = e.createElement("input");
	o.appendChild(u), u.setAttribute("type", "button"), u.setAttribute("value", "Log in"), u.setAttribute("style", `${a}${r.headerBannerLoginInput}` + r.signUpBackground), S.events.on("login", () => {
		let n = C.currentUser();
		if (n) {
			let r = n.uri, i = e.getElementsByClassName(l);
			t(`Logged in, ${i.length} panels to be serviced`);
			for (let n = 0; n < i.length; n++) {
				let a = i[n];
				if (a.setUserCallback) try {
					a.setUserCallback(r);
					let e = a.parentNode;
					e && e.removeChild(a);
				} catch (n) {
					t(`## Error satisfying login box: ${n}`), a.appendChild(c(e, n));
				}
			}
		}
	}), u.addEventListener("click", () => {
		let t = T();
		if (t) return n(t.uri);
		G(e);
	}, !1);
	let d = e.createElement("input");
	return o.appendChild(d), d.setAttribute("type", "button"), d.setAttribute("value", "Sign Up for Solid"), d.setAttribute("style", `${a}${r.headerBannerLoginInput}` + r.signInBackground), d.addEventListener("click", function(e) {
		new s().signup().then(function(e) {
			t("signInOrSignUpBox signed up " + e), n(e);
		});
	}, !1), o;
}
function G(e) {
	let t = e.createElement("div");
	t.setAttribute("style", "position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center;"), e.body.appendChild(t);
	let n = e.createElement("div");
	n.setAttribute("style", "\n      background-color: white;\n      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -webkit-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -moz-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      -o-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);\n      border-radius: 4px;\n      min-width: 400px;\n      padding: 10px;\n      z-index : 10;\n    "), t.appendChild(n);
	let r = e.createElement("div");
	r.setAttribute("style", "\n      border-bottom: 1px solid #DDD;\n      display: flex;\n      flex-direction: row;\n      align-items: center;\n      justify-content: space-between;\n    "), n.appendChild(r);
	let i = e.createElement("label");
	i.setAttribute("style", "margin-right: 5px; font-weight: 800"), i.innerText = "Select an identity provider";
	let o = e.createElement("button");
	o.innerHTML = "<img src=\"https://solidos.github.io/solid-ui/src/icons/noun_1180156.svg\" style=\"width: 2em; height: 2em;\" title=\"Cancel\">", o.setAttribute("style", "background-color: transparent; border: none;"), o.addEventListener("click", () => {
		t.remove();
	}), r.appendChild(i), r.appendChild(o);
	let s = async (e) => {
		try {
			E.store.updater.flagAuthorizationMetadata();
			let t = new URL(window.location.href).hash;
			t && window.localStorage.setItem("preLoginRedirectHash", t), window.localStorage.setItem("loginIssuer", e);
			let n = new URL(window.location.href);
			n.hash = "", await S.login(e, n.href);
		} catch (e) {
			a(e.message);
		}
	}, c = e.createElement("div");
	c.setAttribute("style", "\n      border-bottom: 1px solid #DDD;\n      display: flex;\n      flex-direction: column;\n      padding-top: 10px;\n    ");
	let l = e.createElement("div");
	l.setAttribute("style", "\n      display: flex;\n      flex-direction: row;\n    ");
	let u = e.createElement("label");
	u.innerText = "Enter the URL of your identity provider:", u.setAttribute("style", "color: #888");
	let d = e.createElement("input");
	d.setAttribute("type", "text"), d.setAttribute("style", "margin-left: 0 !important; flex: 1; margin-right: 5px !important"), d.setAttribute("placeholder", "https://example.com"), d.value = typeof localStorage < "u" && localStorage.getItem("loginIssuer") || w()[0]?.uri || "";
	let f = e.createElement("button");
	f.innerText = "Go", f.setAttribute("style", "margin-top: 12px; margin-bottom: 12px;"), f.addEventListener("click", () => {
		s(d.value);
	}), c.appendChild(u), l.appendChild(d), l.appendChild(f), c.appendChild(l), n.appendChild(c);
	let p = e.createElement("div");
	p.setAttribute("style", "\n      display: flex;\n      flex-direction: column;\n      padding-top: 10px;\n    ");
	let m = e.createElement("label");
	m.innerText = "Or pick an identity provider from the list below:", m.setAttribute("style", "color: #888"), p.appendChild(m), w().forEach((t) => {
		let n = e.createElement("button");
		n.innerText = t.name, n.setAttribute("style", "height: 38px; margin-top: 10px"), n.addEventListener("click", () => {
			s(t.uri);
		}), p.appendChild(n);
	}), n.appendChild(p);
}
function K(e, t = null, n = {}) {
	let i = T(), s = e.createElement("div");
	function c(e) {
		e && (i = C.saveUser(e), s.refresh(), t && t(i.uri));
	}
	function l(e) {
		let n = i;
		S.logout().then(function() {
			let e = `Your WebID was ${n}. It has been forgotten.`;
			i = null;
			try {
				a(e);
			} catch {
				window.alert(e);
			}
			s.refresh(), t && t(null);
		}, (e) => {
			a("Fail to log out:" + e);
		});
	}
	function d(t, n) {
		let i = n.buttonStyle || r.signInAndUpButtonStyle, a = "WebID logout";
		if (t) {
			let e = E.store.any(t, o.foaf("nick")) || E.store.any(t, o.foaf("name"));
			e && (a = "Logout " + e.value);
		}
		let s = e.createElement("input");
		return s.setAttribute("type", "button"), s.setAttribute("value", a), s.setAttribute("style", `${i}`), s.addEventListener("click", l, !1), s;
	}
	s.refresh = function() {
		let t = S.webId;
		i = t ? E.store.sym(t) : null, (i && s.me !== i.uri || !i && s.me) && (u(s), i ? s.appendChild(d(i, n)) : s.appendChild(W(e, c, n))), s.me = i ? i.uri : null;
	}, s.refresh();
	function f() {
		i = C.currentUser(), s.refresh();
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
function q(e, n, i) {
	let a = n.noun, s = n.appPathSegment, u = T(), d = e.createElement("div"), f = {
		me: u,
		dom: e,
		div: d
	};
	function m(t, n) {
		d.appendChild(c(e, t, n));
	}
	function g(e) {
		let n = E.store.any(e, o.space("uriPrefix")), r;
		return r = n ? n.value : e.uri.split("#")[0], r.slice(-1) !== "/" && (t(`${s}: No / at end of uriPrefix ${r}`), r = `${r}/`), r += `${s}/id${(/* @__PURE__ */ new Date()).getTime()}/`, r;
	}
	function _(t) {
		async function n(n) {
			let r = v.appendChild(e.createElement("tr")).appendChild(e.createElement("td"));
			r.setAttribute("colspan", "3"), r.style.padding = "0.5em";
			let i = encodeURI(await l(e, E.store, r, o.solid("URL"), o.space("Workspace"), "Workspace")), a = p(t.preferencesFile), s = [h(t.me, o.space("workspace"), a, t.preferencesFile), h(a, o.space("uriPrefix"), i, t.preferencesFile)];
			if (!E.store.updater) throw Error("store has no updater");
			await E.store.updater.update([], s);
		}
		let s = t.me, c = t.preferencesFile, u = null, f = E.store.each(s, o.space("workspace"), void 0, c), _ = E.store.each(s, o.space("storage"));
		f.length === 0 && _ && (m(`You don't seem to have any workspaces. You have ${_.length} storage spaces.`, "white"), _.map(function(e) {
			return f = f.concat(E.store.each(e, o.ldp("contains"))), f;
		}).filter((e) => e.id ? ["public", "private"].includes(e.id().toLowerCase()) : "")), f.length === 1 && (m(`Workspace used: ${f[0].uri}`, "white"), u = g(f[0]));
		let v = e.createElement("table");
		v.setAttribute("style", "border-collapse:separate; border-spacing: 0.5em;"), d.appendChild(v), d.appendChild(e.createElement("hr"));
		let y = d.appendChild(e.createElement("p"));
		y.setAttribute("style", r.commentStyle), y.textContent = `Where would you like to store the data for the ${a}?
    Give the URL of the folder where you would like the data stored.
    It can be anywhere in solid world - this URI is just an idea.`;
		let b = d.appendChild(e.createElement("input"));
		b.setAttribute("type", "text"), b.setAttribute("style", r.textInputStyle), b.size = 80, b.label = "base URL", b.autocomplete = "on", u && (b.value = u), t.baseField = b, d.appendChild(e.createElement("br"));
		let x = d.appendChild(e.createElement("button"));
		x.setAttribute("style", r.buttonStyle), x.textContent = `Start new ${a} at this URI`, x.addEventListener("click", function(e) {
			let t = b.value.replace(" ", "%20");
			t.slice(-1) !== "/" && (t += "/"), i(null, t);
		}), f = f.filter(function(e) {
			return !E.store.holds(e, o.rdf("type"), o.space("MasterWorkspace"));
		});
		let S, C, w, T, D, O, k, A = "height: 3em; margin: 1em; padding: 1em white; border-radius: 0.3em;", j = `${A}border: 0px;`;
		for (let t = 0; t < f.length; t++) {
			D = f[t], T = e.createElement("tr"), t === 0 && (S = e.createElement("td"), S.setAttribute("rowspan", `${f.length}`), S.textContent = "Choose a workspace for this:", S.setAttribute("style", "vertical-align:middle;"), T.appendChild(S)), C = e.createElement("td"), O = E.store.anyValue(D, o.ui("style")), O ||= `color: black ; background-color: ${`#${(function(e) {
				return e.split("").reduce(function(e, t) {
					return e = (e << 5) - e + t.charCodeAt(0), e & e;
				}, 0);
			}(D.uri) & 16777215 | 12632256).toString(16)}`};`, C.setAttribute("style", j + O), T.target = D.uri;
			let n = E.store.any(D, o.rdfs("label"));
			n ||= D.uri.split("/").slice(-1)[0] || D.uri.split("/").slice(-2)[0], C.textContent = n || "???", T.appendChild(C), t === 0 && (w = e.createElement("td"), w.setAttribute("rowspan", `${f.length}1`), w.setAttribute("style", "width:50%;"), T.appendChild(w)), v.appendChild(T), k = E.store.any(D, o.rdfs("comment")), k = k ? k.value : "Use this workspace", C.addEventListener("click", function(t) {
				w.textContent = k ? k.value : "", w.setAttribute("style", j + O);
				let n = e.createElement("button");
				n.textContent = "Continue";
				let r = g(D);
				b.value = r, n.addEventListener("click", function(e) {
					n.disabled = !0, i(D, r), n.textContent = "---->";
				}, !0), w.appendChild(n);
			}, !0);
		}
		let M = e.createElement("tr");
		C = e.createElement("td"), C.setAttribute("style", A), C.textContent = "+ Make a new workspace", C.addEventListener("click", n), M.appendChild(C), v.appendChild(M);
	}
	return L(f).then(_).catch((e) => {
		d.appendChild(c(f.dom, e));
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
		let { me: e, preferencesFile: t, preferencesFileError: n } = await L({});
		if (!t || n) throw Error(n);
		return E.store.each(e, o.rdf("type"), null, t.doc());
	} catch (e) {
		n("Unable to fetch your preferences - this was the error: ", e);
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
export { L as ensureLoadedPreferences, R as ensureLoadedProfile, I as ensureLoggedIn, X as filterAvailablePanes, z as findAppInstances, Y as getUserRoles, K as loginStatusBox, D as login_exports, J as newAppInstance, V as registrationControl, U as registrationList, H as renderScopeHeadingRow, G as renderSignInPopup, B as scopeLabel, q as selectWorkspace };

//# sourceMappingURL=login.esm.js.map