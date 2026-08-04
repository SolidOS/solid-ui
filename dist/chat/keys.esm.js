import e from "../lib/ns.esm.js";
import { log as t } from "../lib/debug.esm.js";
import { getExistingPrivateKey as n, getExistingPublicKey as r, privKeyUrl as i, pubKeyUrl as a } from "../utils/keyHelpers/accessData.esm.js";
import { keyAclBody as o, keyContainerAclBody as s, setAcl as c } from "../utils/keyHelpers/acl.esm.js";
import * as l from "rdflib";
import { store as u } from "solid-logic";
import { schnorr as d } from "@noble/curves/secp256k1.js";
import { bytesToHex as f, hexToBytes as p } from "@noble/hashes/utils.js";
//#region src/chat/keys.ts
function m() {
	return f(d.utils.randomSecretKey());
}
function h(e) {
	return f(d.getPublicKey(p(e)));
}
async function g(t) {
	await u.fetcher.load(t);
	let n = await a(t);
	try {
		return await u.fetcher.load(n), u.any(t, e.solid("publicKey"))?.value;
	} catch {
		return;
	}
}
async function _(o) {
	await u.fetcher.load(o);
	let d = await a(o), f = await i(o), p = await r(o, d), g = await n(o, f), _ = !0;
	if (g && p !== h(g) && confirm("This is strange the publicKey is not valid for\n" + o?.uri + "'shall we repair keeping the private key ?") && (_ = !1), !g || !p || !_) {
		let n = [], r = [];
		if (g || (g = m(), r = [l.st(o, e.solid("privateKey"), l.literal(g), u.sym(f))], await y(f, [], r, o.uri)), !p || !_) {
			n = [], p && (n = [l.st(o, e.solid("publicKey"), l.lit(p), u.sym(d))], t("delete invalid publicKey " + n));
			let i = h(g);
			r = [l.st(o, e.solid("publicKey"), l.literal(i), u.sym(d))], await y(d, n, r);
		}
		let i = f.substring(0, f.lastIndexOf("/") + 1);
		await c(i, s(o.uri));
	}
	return g;
}
var v = async (e) => {
	await u.fetcher.load(e);
	let n = u.any(u.sym(e), u.sym("http://www.iana.org/assignments/link-relations/acl"));
	if (n) try {
		let e = await u.fetcher.webOperation("DELETE", n.value);
		t("delete keyAcl" + n.value + " " + e.status);
	} catch (e) {
		if (e.response.status !== 404) throw Error(e);
		t("delete keyAcl" + n.value + " " + e.response.status);
	}
};
async function y(e, t, n, r = "") {
	await v(e), await u.updater.updateMany(t, n);
	let i = o(e, r);
	await c(e, i);
}
//#endregion
export { m as generatePrivateKey, h as generatePublicKey, _ as getPrivateKey, g as getPublicKey };

//# sourceMappingURL=keys.esm.js.map