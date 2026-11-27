import { solidLogicSingleton as e } from "solid-logic";
import { debug as t } from "../../lib/log.esm.js";
import { errorMessageBlock as n } from "../error.esm.js";
// src/widgets/forms/fieldFunction.ts
var r = e.store, i = {};
function a(e) {
	let t = r, n = t.findTypeURIs(e), i = t.bottomTypeURIs(n), a = [];
	for (let e in i) a.push(e);
	return a[0];
}
function o(e, r) {
	let o = a(r), s = i[o];
	return t("paneUtils: Going to implement field " + r + " of type " + o), s || function(e, t) {
		let i = n(e, "No handler for field " + r + " of type " + o);
		return t && t.appendChild(i), i;
	};
}
export { i as field, o as fieldFunction, a as mostSpecificClassURI };

//# sourceMappingURL=fieldFunction.esm.js.map