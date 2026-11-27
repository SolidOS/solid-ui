import { log as e } from "../lib/debug.esm.js";
import { schnorr as t } from "@noble/curves/secp256k1.js";
import { bytesToHex as n, hexToBytes as r } from "@noble/hashes/utils.js";
import i from "../lib/ns.esm.js";
import { store as a } from "solid-logic";
import * as o from "rdflib";
import { getExistingPrivateKey as s, getExistingPublicKey as c, privKeyUrl as l, pubKeyUrl as u } from "../utils/keyHelpers/accessData.esm.js";
import { keyAclBody as d, keyContainerAclBody as f, setAcl as p } from "../utils/keyHelpers/acl.esm.js";
// src/chat/keys.ts
function m() {
	return n(t.utils.randomSecretKey());
}
function h(e) {
	return n(t.getPublicKey(r(e)));
}
async function g(e) {
	await a.fetcher.load(e);
	let t = await u(e);
	try {
		return await a.fetcher.load(t), a.any(e, i.solid("publicKey"))?.value;
	} catch {
		return;
	}
}
async function _(t) {
	await a.fetcher.load(t);
	let n = await u(t), r = await l(t), d = await c(t, n), g = await s(t, r), _ = !0;
	if (g && d !== h(g) && confirm("This is strange the publicKey is not valid for\n" + t?.uri + "'shall we repair keeping the private key ?") && (_ = !1), !g || !d || !_) {
		let s = [], c = [];
		if (g || (g = m(), c = [o.st(t, i.solid("privateKey"), o.literal(g), a.sym(r))], await y(r, [], c, t.uri)), !d || !_) {
			s = [], d && (s = [o.st(t, i.solid("publicKey"), o.lit(d), a.sym(n))], e("delete invalid publicKey " + s));
			let r = h(g);
			c = [o.st(t, i.solid("publicKey"), o.literal(r), a.sym(n))], await y(n, s, c);
		}
		let l = r.substring(0, r.lastIndexOf("/") + 1);
		await p(l, f(t.uri));
	}
	return g;
}
var v = async (t) => {
	await a.fetcher.load(t);
	let n = a.any(a.sym(t), a.sym("http://www.iana.org/assignments/link-relations/acl"));
	if (n) try {
		let t = await a.fetcher.webOperation("DELETE", n.value);
		e("delete keyAcl" + n.value + " " + t.status);
	} catch (t) {
		if (t.response.status !== 404) throw Error(t);
		e("delete keyAcl" + n.value + " " + t.response.status);
	}
};
async function y(e, t, n, r = "") {
	await v(e), await a.updater.updateMany(t, n);
	let i = d(e, r);
	await p(e, i);
}
export { m as generatePrivateKey, h as generatePublicKey, _ as getPrivateKey, g as getPublicKey };

//# sourceMappingURL=keys.esm.js.map