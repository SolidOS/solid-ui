import { store as e } from "solid-logic";
import t from "../../lib/ns.esm.js";
// src/utils/keyHelpers/otherHelpers.ts
var n = (n) => {
	let r = e.any(n, t.space("preferencesFile"), null, n.doc())?.value;
	if (r = r?.split("/").slice(0, -2).join("/"), !r) throw Error(`prefererencesFile is expected to exist in ${n}`);
	return r;
};
export { n as getRootIfPreferencesExist };

//# sourceMappingURL=otherHelpers.esm.js.map