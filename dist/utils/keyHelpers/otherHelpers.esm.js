import e from "../../lib/ns.esm.js";
import { store as t } from "solid-logic";
//#region src/utils/keyHelpers/otherHelpers.ts
var n = (n) => {
	let r = t.any(n, e.space("preferencesFile"), null, n.doc())?.value;
	if (r = r?.split("/").slice(0, -2).join("/"), !r) throw Error(`prefererencesFile is expected to exist in ${n}`);
	return r;
};
//#endregion
export { n as getRootIfPreferencesExist };

//# sourceMappingURL=otherHelpers.esm.js.map