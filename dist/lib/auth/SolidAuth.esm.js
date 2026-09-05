import e from "../ns.esm.js";
import t from "./Account.esm.js";
import { showDialog as n } from "../dialogs/helpers.esm.js";
import "../dialogs/index.esm.js";
import r from "../../components/login-modal/index.esm.js";
import { authSession as i, authn as a, solidLogicSingleton as o } from "solid-logic";
//#region src/lib/auth/SolidAuth.ts
var s = "https://solidproject.org/get_a_pod";
function c(t) {
	let n = o.store, r = n.sym(t), i = n.any(r, e.sioc("avatar")) || n.any(r, e.foaf("img")) || n.any(r, e.vcard("logo")) || n.any(r, e.vcard("hasPhoto")) || n.any(r, e.vcard("photo")) || n.any(r, e.foaf("depiction"));
	return i ? i.value : void 0;
}
var l = class {
	signupUrl;
	_initialized = !1;
	profileLoaded = !1;
	listeners = [];
	constructor(e = s) {
		this.signupUrl = e;
	}
	async initialize() {
		await a.checkUser(), this._initialized = !0, this.listeners.forEach((e) => e());
	}
	async loadProfile() {
		!this.profileLoaded && this.account && (this.profileLoaded = !0, await o.profile.loadMe(), this.listeners.forEach((e) => e()));
	}
	get initialized() {
		return this._initialized;
	}
	get account() {
		let e = i.webId ?? i.info?.webId;
		if (!(i.isActive ?? i.info?.isLoggedIn ?? !!e) || !e) return null;
		let n = c(e);
		return new t(e, n);
	}
	async login(e) {
		if (!e) {
			n(r);
			return;
		}
		o.store.updater.flagAuthorizationMetadata();
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
//#endregion
export { s as DEFAULT_SIGNUP_URL, l as default };

//# sourceMappingURL=SolidAuth.esm.js.map