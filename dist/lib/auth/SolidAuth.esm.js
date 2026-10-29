import e from "./Account.esm.js";
import t from "../ns.esm.js";
import { showDialog as n } from "../dialogs/helpers.esm.js";
import "../dialogs/index.esm.js";
import r from "../../components/login-modal/index.esm.js";
import { authSession as i, authn as a, reloadOnIdentityReplaced as o, solidLogicSingleton as s } from "solid-logic";
// src/lib/auth/SolidAuth.ts
var c = "https://solidproject.org/get_a_pod";
function l(e) {
	let n = s.store, r = n.sym(e), i = n.any(r, t.sioc("avatar")) || n.any(r, t.foaf("img")) || n.any(r, t.vcard("logo")) || n.any(r, t.vcard("hasPhoto")) || n.any(r, t.vcard("photo")) || n.any(r, t.foaf("depiction"));
	return i ? i.value : void 0;
}
var u = class {
	signupUrl;
	_initialized = !1;
	profileLoaded = !1;
	listeners = [];
	constructor(e = c) {
		this.signupUrl = e;
	}
	async initialize() {
		i.events.on("sessionRestore", () => {
			s.store.updater.flagAuthorizationMetadata();
		}), o(i.events, () => {
			i.info?.isLoggedIn && window.location.reload();
		}), await a.checkUser(), this._initialized = !0, this.listeners.forEach((e) => e());
	}
	async loadProfile() {
		!this.profileLoaded && this.account && (this.profileLoaded = !0, await s.profile.loadMe(), this.listeners.forEach((e) => e()));
	}
	get initialized() {
		return this._initialized;
	}
	get account() {
		let t = i.webId ?? i.info?.webId;
		if (!(i.isActive ?? i.info?.isLoggedIn ?? !!t) || !t) return null;
		let n = l(t);
		return new e(t, n);
	}
	async login(e) {
		if (!e) {
			n(r);
			return;
		}
		s.store.updater.flagAuthorizationMetadata();
		let t = new URL(window.location.href).hash;
		t && window.localStorage.setItem("preLoginRedirectHash", t), window.localStorage.setItem("loginIssuer", e);
		let a = new URL(window.location.href);
		a.hash = "", await i.login(e, a.href);
	}
	async signup() {
		window.open(this.signupUrl, "_blank", "noopener,noreferrer");
	}
	async logout() {
		await i.logout();
	}
	onSessionUpdated(e) {
		let t = i, n = () => {
			e();
		};
		return this.listeners.push(n), typeof t.addEventListener == "function" ? t.addEventListener("sessionStateChange", n) : (i.events.on("login", n), i.events.on("logout", n), i.events.on("sessionRestore", n)), () => {
			this.listeners = this.listeners.filter((e) => e !== n), typeof t.removeEventListener == "function" ? t.removeEventListener("sessionStateChange", n) : (i.events.off("login", n), i.events.off("logout", n), i.events.off("sessionRestore", n));
		};
	}
};
export { c as DEFAULT_SIGNUP_URL, u as default };

//# sourceMappingURL=SolidAuth.esm.js.map