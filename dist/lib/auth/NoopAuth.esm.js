//#region src/lib/auth/NoopAuth.ts
var e = class {
	initialized = !1;
	account = null;
	async login() {
		throw Error("Can't use auth, missing context provider");
	}
	async signup() {
		throw Error("Can't use auth, missing context provider");
	}
	async logout() {
		throw Error("Can't use auth, missing context provider");
	}
	onSessionUpdated() {
		return () => void 0;
	}
};
//#endregion
export { e as default };

//# sourceMappingURL=NoopAuth.esm.js.map