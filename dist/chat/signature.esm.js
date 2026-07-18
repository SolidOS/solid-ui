import { schnorr as e } from "@noble/curves/secp256k1.js";
import { bytesToHex as t, hexToBytes as n } from "@noble/hashes/utils.js";
import { sha256 as r } from "@noble/hashes/sha2.js";
new TextDecoder("utf-8");
var i = new TextEncoder(), a = "https://w3id.org/security#";
function o() {
	return {
		id: "",
		created: "",
		dateDeleted: "",
		content: "",
		maker: "",
		sig: ""
	};
}
function s(e) {
	return JSON.stringify(e);
}
function c(e) {
	return t(r(i.encode(s(e))));
}
function l(t, r, i) {
	return e.verify(n(t), n(c(r)), n(i));
}
function u(r, i) {
	return t(e.sign(n(c(r)), n(i)));
}
//#endregion
export { a as SEC, o as getBlankMsg, c as getMsgHash, s as serializeMsg, u as signMsg, i as utf8Encoder, l as verifySignature };

//# sourceMappingURL=signature.esm.js.map