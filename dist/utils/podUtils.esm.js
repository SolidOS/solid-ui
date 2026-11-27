import { solidLogicSingleton as e } from "solid-logic";
import t from "../lib/ns.esm.js";
import "rdflib";
import "./webIdUtils.esm.js";
// src/utils/podUtils.ts
function n(e, n) {
	if (!e || !n) return !1;
	let r = e.sym(n), i = e.findTypeURIs(r);
	return !!(i[t.ldp("Container").uri] || i[t.ldp("BasicContainer").uri] || r.uri.endsWith("/"));
}
function r(n, r) {
	if (!n || !r) return 0;
	let i = n.sym(r), a = /* @__PURE__ */ new Set();
	for (let r of n.each(i, t.ldp("contains"))) if (r.termType === "NamedNode") {
		let t = r;
		e.resource.isHiddenFile(t) || a.add(t.uri);
	}
	return a.size;
}
export { r as getContainerItemCount, n as isContainerSubject };

//# sourceMappingURL=podUtils.esm.js.map