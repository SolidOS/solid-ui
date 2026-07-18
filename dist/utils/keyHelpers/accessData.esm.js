import e from "../../lib/ns.esm.js";
import { error as t, log as n } from "../../lib/debug.esm.js";
import { getRootIfPreferencesExist as r } from "./otherHelpers.esm.js";
import { store as i } from "solid-logic";
//#region src/utils/keyHelpers/accessData.ts
var a = (e) => {
	let n;
	try {
		n = `${r(e)}/profile/keys/publicKey.ttl`;
	} catch (e) {
		t(e);
	}
	return n;
}, o = (e) => {
	let n;
	try {
		n = `${r(e)}/settings/keys/privateKey.ttl`;
	} catch (e) {
		t(e);
	}
	return n;
};
async function s(e, t) {
	return await l(e, t, "publicKey");
}
async function c(e, t) {
	return await l(e, t, "privateKey");
}
async function l(t, r, a) {
	try {
		return await i.fetcher.load(r), i.any(t, e.solid(a))?.value;
	} catch (e) {
		if (e.response.status === 404) {
			n("createIfNotExists: doc does NOT exist, will create... " + r);
			try {
				await i.fetcher.webOperation("PUT", r, {
					data: "",
					contentType: "text/turtle"
				});
			} catch (e) {
				throw n("createIfNotExists doc FAILED: " + r + ": " + e), e;
			}
			delete i.fetcher.requested[r];
			return;
		} else throw n("createIfNotExists doc FAILED: " + r + ": " + e), e;
	}
}
//#endregion
export { c as getExistingPrivateKey, s as getExistingPublicKey, l as getKeyIfExists, o as privKeyUrl, a as pubKeyUrl };

//# sourceMappingURL=accessData.esm.js.map