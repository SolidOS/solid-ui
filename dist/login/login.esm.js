import { __exportAll as e } from "../_virtual/_rolldown/runtime.esm.js";
import { BlankNode as t, st as n } from "rdflib";
import { CrossOriginForbiddenError as r, FetchError as i, NotEditableError as a, SameOriginForbiddenError as o, UnauthorizedError as s, WebOperationError as c, authSession as l, authn as u, getSuggestedIssuers as d, offlineTestID as f, solidLogicSingleton as p } from "solid-logic";
import { log as m, warn as h } from "../lib/debug.esm.js";
import { style as g } from "../lib/style.esm.js";
import { label as _ } from "../utils/label.esm.js";
import { alert as v } from "../lib/log.esm.js";
import y from "../lib/ns.esm.js";
import { Signup as b } from "../signup/signup.esm.js";
import { errorMessageBlock as x } from "../widgets/error.esm.js";
import { askName as S, clearElement as C, personTR as w } from "../widgets/buttons.esm.js";
import { buildCheckboxForm as T, newThing as E } from "../widgets/forms.esm.js";
import "../utils/index.esm.js";
import "../widgets/index.esm.js";
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
}), O = p.store, { loadPreferences: k, loadProfile: A } = p.profile, { getScopedAppInstances: j, getRegistrations: M, loadAllTypeIndexes: N, getScopedAppsFromIndex: P, deleteTypeIndexRegistration: F } = p.typeIndex;
function I(e) {
	let t = u.currentUser();
	return t ? (u.saveUser(t, e), Promise.resolve(e)) : new Promise((t) => {
		u.checkUser().then((n) => {
			if (n) return m(`logIn: Already logged in as ${n}`), t(e);
			if (!e.div || !e.dom) return t(e);
			let r = K(e.dom, (n) => {
				u.saveUser(n, e), t(e);
			});
			e.div.appendChild(r);
		}).catch((n) => {
			if (m(`logIn: session check failed, showing login (${n})`), !e.div || !e.dom) return t(e);
			let r = K(e.dom, (n) => {
				u.saveUser(n, e), t(e);
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
		let n;
		if (t instanceof s) n = "Oops — you are not authenticated (properly logged in), so SolidOS cannot read your preferences file. Try logging out and then logging back in.", v(n);
		else if (t instanceof r) return n = `Unauthorized: Assuming preference file blocked for origin ${window.location.origin}`, e.preferencesFileError = n, e;
		else if (t instanceof o) return n = "You are not authorized to read your preference file. This may be because you are using an untrusted web app.", h(n), e;
		else if (t instanceof a) return n = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", h(n), e;
		else if (t instanceof c) n = "You are not authorized to edit your preference file. This may be because you are using an untrusted web app.", h(n);
		else if (t instanceof i) n = `Strange: Error ${t.status} trying to read your preference file.${t.message}`, v(n);
		else throw Error(`(via loadPrefs) ${t}`);
		e.preferencesFileError = n;
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
		throw e.div && e.dom && e.div.appendChild(x(e.dom, t.message)), Error(`Can't log in: ${t}`);
	}
	return e;
}
async function z(e, t, n) {
	let r = e.me ? await j(t, e.me) : [];
	return n === !0 ? r = r.filter((e) => e.scope.label === "public") : n === !1 && (r = r.filter((e) => e.scope.label === "private")), e.instances = r.map((e) => e.instance), e;
}
function B(e, t) {
	return `${e.me && e.me.sameTerm(t.agent) ? "" : _(t.agent) + " "}${t.label}`;
}
async function V(e, r, i) {
	function a(e) {
		let t = M(r, i), a = t.length ? t[0] : E(e);
		return [n(a, y.solid("instance"), r, e), n(a, y.solid("forClass"), i, e)];
	}
	function o(t) {
		let n = a(t.index), r = `${B(e, t)} link to this ${e.noun}`;
		return T(e.dom, p.store, r, null, n, h, t.index);
	}
	let s = e.dom;
	if (!s || !e.div) throw Error("registrationControl: need dom and div");
	let c = s.createElement("div");
	e.div.appendChild(c), e.me = u.currentUser();
	let l = e.me;
	if (!l) return c.innerHTML = "<p style=\"margin:2em;\">(Log in to save a link to this)</p>", e;
	let d;
	try {
		d = await N(l);
	} catch (t) {
		let n;
		return e.div && e.preferencesFileError ? (n = "(Lists of stuff not available)", e.div.appendChild(s.createElement("p")).textContent = n) : e.div && (n = `registrationControl: Type indexes not available: ${t}`, e.div.appendChild(x(e.dom, t))), m(n), e;
	}
	c.innerHTML = "<table><tbody></tbody></table>", c.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;");
	let f = c.children[0].children[0], h = new t();
	for (let e of d) f.appendChild(s.createElement("tr")).appendChild(o(e));
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
	if (r.appendChild(i), e.me = u.currentUser(), !e.me) return i.innerHTML = "<p style=\"margin:2em;\">(Log in list your stuff)</p>", e;
	let a = await N(e.me);
	i.innerHTML = "<table><tbody></tbody></table>", i.setAttribute("style", "font-size: 120%; text-align: right; padding: 1em; border: solid #eee 0.5em;");
	let o = i.firstChild.firstChild;
	for (let r of a) {
		let i = H(e, O, r);
		o.appendChild(i);
		let a = await P(r, t.type || null);
		a.length === 0 && (i.style.display = "none");
		for (let e of a) {
			let t = w(n, y.solid("instance"), e.instance, { deleteFunction: async () => {
				await F(e), o.removeChild(t);
			} });
			t.children[0].style.paddingLeft = "3em", o.appendChild(t);
		}
	}
	return e;
}
function W(e, t, n = {}) {
	n ||= {};
	let r = n.buttonStyle || g.signInAndUpButtonStyle, i = e.createElement("div"), a = "SolidSignInOrSignUpBox";
	m("widgets.signInOrSignUpBox"), i.setUserCallback = t, i.setAttribute("class", a), i.setAttribute("style", "display:flex;");
	let o = e.createElement("input");
	i.appendChild(o), o.setAttribute("type", "button"), o.setAttribute("value", "Log in"), o.setAttribute("style", `${r}${g.headerBannerLoginInput}` + g.signUpBackground), l.events.on("login", () => {
		let t = u.currentUser();
		if (t) {
			let n = t.uri, r = e.getElementsByClassName(a);
			m(`Logged in, ${r.length} panels to be serviced`);
			for (let t = 0; t < r.length; t++) {
				let i = r[t];
				if (i.setUserCallback) try {
					i.setUserCallback(n);
					let e = i.parentNode;
					e && e.removeChild(i);
				} catch (t) {
					m(`## Error satisfying login box: ${t}`), i.appendChild(x(e, t));
				}
			}
		}
	}), o.addEventListener("click", () => {
		let n = f();
		if (n) return t(n.uri);
		G(e);
	}, !1);
	let s = e.createElement("input");
	return i.appendChild(s), s.setAttribute("type", "button"), s.setAttribute("value", "Sign Up for Solid"), s.setAttribute("style", `${r}${g.headerBannerLoginInput}` + g.signInBackground), s.addEventListener("click", function(e) {
		new b().signup().then(function(e) {
			m("signInOrSignUpBox signed up " + e), t(e);
		});
	}, !1), i;
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
	let a = e.createElement("button");
	a.innerHTML = "<img src=\"https://solidos.github.io/solid-ui/src/icons/noun_1180156.svg\" style=\"width: 2em; height: 2em;\" title=\"Cancel\">", a.setAttribute("style", "background-color: transparent; border: none;"), a.addEventListener("click", () => {
		t.remove();
	}), r.appendChild(i), r.appendChild(a);
	let o = async (e) => {
		try {
			p.store.updater.flagAuthorizationMetadata();
			let t = new URL(window.location.href).hash;
			t && window.localStorage.setItem("preLoginRedirectHash", t), window.localStorage.setItem("loginIssuer", e);
			let n = new URL(window.location.href);
			n.hash = "", await l.login(e, n.href);
		} catch (e) {
			v(e.message);
		}
	}, s = e.createElement("div");
	s.setAttribute("style", "\n      border-bottom: 1px solid #DDD;\n      display: flex;\n      flex-direction: column;\n      padding-top: 10px;\n    ");
	let c = e.createElement("div");
	c.setAttribute("style", "\n      display: flex;\n      flex-direction: row;\n    ");
	let u = e.createElement("label");
	u.innerText = "Enter the URL of your identity provider:", u.setAttribute("style", "color: #888");
	let f = e.createElement("input");
	f.setAttribute("type", "text"), f.setAttribute("style", "margin-left: 0 !important; flex: 1; margin-right: 5px !important"), f.setAttribute("placeholder", "https://example.com"), f.value = typeof localStorage < "u" && localStorage.getItem("loginIssuer") || d()[0]?.uri || "";
	let m = e.createElement("button");
	m.innerText = "Go", m.setAttribute("style", "margin-top: 12px; margin-bottom: 12px;"), m.addEventListener("click", () => {
		o(f.value);
	}), s.appendChild(u), c.appendChild(f), c.appendChild(m), s.appendChild(c), n.appendChild(s);
	let h = e.createElement("div");
	h.setAttribute("style", "\n      display: flex;\n      flex-direction: column;\n      padding-top: 10px;\n    ");
	let g = e.createElement("label");
	g.innerText = "Or pick an identity provider from the list below:", g.setAttribute("style", "color: #888"), h.appendChild(g), d().forEach((t) => {
		let n = e.createElement("button");
		n.innerText = t.name, n.setAttribute("style", "height: 38px; margin-top: 10px"), n.addEventListener("click", () => {
			o(t.uri);
		}), h.appendChild(n);
	}), n.appendChild(h);
}
function K(e, t = null, n = {}) {
	let r = f(), i = e.createElement("div");
	function a(e) {
		e && (r = u.saveUser(e), i.refresh(), t && t(r.uri));
	}
	function o(e) {
		let n = r;
		l.logout().then(function() {
			let e = `Your WebID was ${n}. It has been forgotten.`;
			r = null;
			try {
				v(e);
			} catch {
				window.alert(e);
			}
			i.refresh(), t && t(null);
		}, (e) => {
			v("Fail to log out:" + e);
		});
	}
	function s(t, n) {
		let r = n.buttonStyle || g.signInAndUpButtonStyle, i = "WebID logout";
		if (t) {
			let e = p.store.any(t, y.foaf("nick")) || p.store.any(t, y.foaf("name"));
			e && (i = "Logout " + e.value);
		}
		let a = e.createElement("input");
		return a.setAttribute("type", "button"), a.setAttribute("value", i), a.setAttribute("style", `${r}`), a.addEventListener("click", o, !1), a;
	}
	i.refresh = function() {
		let t = l.webId;
		r = t ? p.store.sym(t) : null, (r && i.me !== r.uri || !r && i.me) && (C(i), r ? i.appendChild(s(r, n)) : i.appendChild(W(e, a, n))), i.me = r ? r.uri : null;
	}, i.refresh();
	function c() {
		r = u.currentUser(), i.refresh();
	}
	return c(), l.events.on("login", c), l.events.on("logout", c), i.me = "99999", i.refresh(), i;
}
l.events.on("logout", async () => {
	let e = window.localStorage.getItem("loginIssuer");
	if (e) try {
		p.store.updater.flagAuthorizationMetadata();
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
function q(e, t, r) {
	let i = t.noun, a = t.appPathSegment, o = f(), s = e.createElement("div"), c = {
		me: o,
		dom: e,
		div: s
	};
	function l(t, n) {
		s.appendChild(x(e, t, n));
	}
	function u(e) {
		let t = p.store.any(e, y.space("uriPrefix")), n;
		return n = t ? t.value : e.uri.split("#")[0], n.slice(-1) !== "/" && (m(`${a}: No / at end of uriPrefix ${n}`), n = `${n}/`), n += `${a}/id${(/* @__PURE__ */ new Date()).getTime()}/`, n;
	}
	function d(t) {
		async function a(r) {
			let i = h.appendChild(e.createElement("tr")).appendChild(e.createElement("td"));
			i.setAttribute("colspan", "3"), i.style.padding = "0.5em";
			let a = encodeURI(await S(e, p.store, i, y.solid("URL"), y.space("Workspace"), "Workspace")), o = E(t.preferencesFile), s = [n(t.me, y.space("workspace"), o, t.preferencesFile), n(o, y.space("uriPrefix"), a, t.preferencesFile)];
			if (!p.store.updater) throw Error("store has no updater");
			await p.store.updater.update([], s);
		}
		let o = t.me, c = t.preferencesFile, d = null, f = p.store.each(o, y.space("workspace"), void 0, c), m = p.store.each(o, y.space("storage"));
		f.length === 0 && m && (l(`You don't seem to have any workspaces. You have ${m.length} storage spaces.`, "white"), m.map(function(e) {
			return f = f.concat(p.store.each(e, y.ldp("contains"))), f;
		}).filter((e) => e.id ? ["public", "private"].includes(e.id().toLowerCase()) : "")), f.length === 1 && (l(`Workspace used: ${f[0].uri}`, "white"), d = u(f[0]));
		let h = e.createElement("table");
		h.setAttribute("style", "border-collapse:separate; border-spacing: 0.5em;"), s.appendChild(h), s.appendChild(e.createElement("hr"));
		let _ = s.appendChild(e.createElement("p"));
		_.setAttribute("style", g.commentStyle), _.textContent = `Where would you like to store the data for the ${i}?
    Give the URL of the folder where you would like the data stored.
    It can be anywhere in solid world - this URI is just an idea.`;
		let v = s.appendChild(e.createElement("input"));
		v.setAttribute("type", "text"), v.setAttribute("style", g.textInputStyle), v.size = 80, v.label = "base URL", v.autocomplete = "on", d && (v.value = d), t.baseField = v, s.appendChild(e.createElement("br"));
		let b = s.appendChild(e.createElement("button"));
		b.setAttribute("style", g.buttonStyle), b.textContent = `Start new ${i} at this URI`, b.addEventListener("click", function(e) {
			let t = v.value.replace(" ", "%20");
			t.slice(-1) !== "/" && (t += "/"), r(null, t);
		}), f = f.filter(function(e) {
			return !p.store.holds(e, y.rdf("type"), y.space("MasterWorkspace"));
		});
		let x, C, w, T, D, O, k, A = "height: 3em; margin: 1em; padding: 1em white; border-radius: 0.3em;", j = `${A}border: 0px;`;
		for (let t = 0; t < f.length; t++) {
			D = f[t], T = e.createElement("tr"), t === 0 && (x = e.createElement("td"), x.setAttribute("rowspan", `${f.length}`), x.textContent = "Choose a workspace for this:", x.setAttribute("style", "vertical-align:middle;"), T.appendChild(x)), C = e.createElement("td"), O = p.store.anyValue(D, y.ui("style")), O ||= `color: black ; background-color: #${(function(e) {
				return e.split("").reduce(function(e, t) {
					return e = (e << 5) - e + t.charCodeAt(0), e & e;
				}, 0);
			}(D.uri) & 0xffffff | 0xc0c0c0).toString(16)};`, C.setAttribute("style", j + O), T.target = D.uri;
			let n = p.store.any(D, y.rdfs("label"));
			n ||= D.uri.split("/").slice(-1)[0] || D.uri.split("/").slice(-2)[0], C.textContent = n || "???", T.appendChild(C), t === 0 && (w = e.createElement("td"), w.setAttribute("rowspan", `${f.length}1`), w.setAttribute("style", "width:50%;"), T.appendChild(w)), h.appendChild(T), k = p.store.any(D, y.rdfs("comment")), k = k ? k.value : "Use this workspace", C.addEventListener("click", function(t) {
				w.textContent = k ? k.value : "", w.setAttribute("style", j + O);
				let n = e.createElement("button");
				n.textContent = "Continue";
				let i = u(D);
				v.value = i, n.addEventListener("click", function(e) {
					n.disabled = !0, r(D, i), n.textContent = "---->";
				}, !0), w.appendChild(n);
			}, !0);
		}
		let M = e.createElement("tr");
		C = e.createElement("td"), C.setAttribute("style", A), C.textContent = "+ Make a new workspace", C.addEventListener("click", a), M.appendChild(C), h.appendChild(M);
	}
	return L(c).then(d).catch((e) => {
		s.appendChild(x(c.dom, e));
	}), s;
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
		return p.store.each(e, y.rdf("type"), null, t.doc());
	} catch (e) {
		h("Unable to fetch your preferences - this was the error: ", e);
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