import e from "../lib/ns.esm.js";
import "./webIdUtils.esm.js";
import "rdflib";
import { solidLogicSingleton as t } from "solid-logic";
// src/utils/podUtils.ts
function n(t, n) {
	if (!t || !n) return !1;
	let r = t.sym(n), i = t.findTypeURIs(r);
	return !!(i[e.ldp("Container").uri] || i[e.ldp("BasicContainer").uri] || r.uri.endsWith("/"));
}
function r(n, r) {
	if (!n || !r) return 0;
	let i = n.sym(r), a = /* @__PURE__ */ new Set();
	for (let r of n.each(i, e.ldp("contains"))) if (r.termType === "NamedNode") {
		let e = r;
		t.resource.isHiddenFile(e) || a.add(e.uri);
	}
	return a.size;
}
export { r as getContainerItemCount, n as isContainerSubject };

//# sourceMappingURL=podUtils.esm.js.map