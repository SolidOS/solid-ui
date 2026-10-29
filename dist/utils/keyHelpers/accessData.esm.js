import { error as e, log as t } from "../../lib/debug.esm.js";
import n from "../../lib/ns.esm.js";
import { getRootIfPreferencesExist as r } from "./otherHelpers.esm.js";
import { store as i } from "solid-logic";
// src/utils/keyHelpers/accessData.ts
var a = (t) => {
	let n;
	try {
		n = `${r(t)}/profile/keys/publicKey.ttl`;
	} catch (t) {
		e(t);
	}
	return n;
}, o = (t) => {
	let n;
	try {
		n = `${r(t)}/settings/keys/privateKey.ttl`;
	} catch (t) {
		e(t);
	}
	return n;
};
async function s(e, t) {
	return await l(e, t, "publicKey");
}
async function c(e, t) {
	return await l(e, t, "privateKey");
}
async function l(e, r, a) {
	try {
		return await i.fetcher.load(r), i.any(e, n.solid(a))?.value;
	} catch (e) {
		if (e.response.status === 404) {
			t("createIfNotExists: doc does NOT exist, will create... " + r);
			try {
				await i.fetcher.webOperation("PUT", r, {
					data: "",
					contentType: "text/turtle"
				});
			} catch (e) {
				throw t("createIfNotExists doc FAILED: " + r + ": " + e), e;
			}
			delete i.fetcher.requested[r];
			return;
		}
		throw t("createIfNotExists doc FAILED: " + r + ": " + e), e;
	}
}
export { c as getExistingPrivateKey, s as getExistingPublicKey, l as getKeyIfExists, o as privKeyUrl, a as pubKeyUrl };

//# sourceMappingURL=accessData.esm.js.map