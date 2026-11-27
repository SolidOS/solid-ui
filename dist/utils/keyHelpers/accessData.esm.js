import { error as e, log as t } from "../../lib/debug.esm.js";
import { store as n } from "solid-logic";
import r from "../../lib/ns.esm.js";
import { getRootIfPreferencesExist as i } from "./otherHelpers.esm.js";
// src/utils/keyHelpers/accessData.ts
var a = (t) => {
	let n;
	try {
		n = `${i(t)}/profile/keys/publicKey.ttl`;
	} catch (t) {
		e(t);
	}
	return n;
}, o = (t) => {
	let n;
	try {
		n = `${i(t)}/settings/keys/privateKey.ttl`;
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
async function l(e, i, a) {
	try {
		return await n.fetcher.load(i), n.any(e, r.solid(a))?.value;
	} catch (e) {
		if (e.response.status === 404) {
			t("createIfNotExists: doc does NOT exist, will create... " + i);
			try {
				await n.fetcher.webOperation("PUT", i, {
					data: "",
					contentType: "text/turtle"
				});
			} catch (e) {
				throw t("createIfNotExists doc FAILED: " + i + ": " + e), e;
			}
			delete n.fetcher.requested[i];
			return;
		}
		throw t("createIfNotExists doc FAILED: " + i + ": " + e), e;
	}
}
export { c as getExistingPrivateKey, s as getExistingPublicKey, l as getKeyIfExists, o as privKeyUrl, a as pubKeyUrl };

//# sourceMappingURL=accessData.esm.js.map