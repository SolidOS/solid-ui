import e from "./Account.esm.js";
import t from "../ns.esm.js";
import { showDialog as n } from "../dialogs/helpers.esm.js";
import { authSession as r, authn as i, reloadOnIdentityReplaced as a, solidLogicSingleton as o } from "solid-logic";
import "../dialogs/index.esm.js";
import s from "../../components/login-modal/index.esm.js";
// src/lib/auth/SolidAuth.ts
var c = "https://solidproject.org/get_a_pod";
function l(e) {
	let n = o.store, r = n.sym(e), i = n.any(r, t.sioc("avatar")) || n.any(r, t.foaf("img")) || n.any(r, t.vcard("logo")) || n.any(r, t.vcard("hasPhoto")) || n.any(r, t.vcard("photo")) || n.any(r, t.foaf("depiction"));
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
		r.events.on("sessionRestore", () => {
			o.store.updater.flagAuthorizationMetadata();
		}), a(r.events, () => {
			r.info?.isLoggedIn && window.location.reload();
		}), await i.checkUser(), this._initialized = !0, this.listeners.forEach((e) => e());
	}
	async loadProfile() {
		!this.profileLoaded && this.account && (this.profileLoaded = !0, await o.profile.loadMe(), this.listeners.forEach((e) => e()));
	}
	get initialized() {
		return this._initialized;
	}
	get account() {
		let t = r.webId ?? r.info?.webId;
		if (!(r.isActive ?? r.info?.isLoggedIn ?? !!t) || !t) return null;
		let n = l(t);
		return new e(t, n);
	}
	async login(e) {
		if (!e) {
			n(s);
			return;
		}
		o.store.updater.flagAuthorizationMetadata();
		let t = new URL(window.location.href).hash;
		t && window.localStorage.setItem("preLoginRedirectHash", t), window.localStorage.setItem("loginIssuer", e);
		let i = new URL(window.location.href);
		i.hash = "", await r.login(e, i.href);
	}
	async signup() {
		window.open(this.signupUrl, "_blank", "noopener,noreferrer");
	}
	async logout() {
		await r.logout();
	}
	onSessionUpdated(e) {
		let t = r, n = () => {
			e();
		};
		return this.listeners.push(n), typeof t.addEventListener == "function" ? t.addEventListener("sessionStateChange", n) : (r.events.on("login", n), r.events.on("logout", n), r.events.on("sessionRestore", n)), () => {
			this.listeners = this.listeners.filter((e) => e !== n), typeof t.removeEventListener == "function" ? t.removeEventListener("sessionStateChange", n) : (r.events.off("login", n), r.events.off("logout", n), r.events.off("sessionRestore", n));
		};
	}
};
export { c as DEFAULT_SIGNUP_URL, u as default };

//# sourceMappingURL=SolidAuth.esm.js.map