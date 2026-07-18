import { debug as e } from "../../lib/log.esm.js";
import { errorMessageBlock as t } from "../error.esm.js";
import { solidLogicSingleton as n } from "solid-logic";
//#region src/widgets/forms/fieldFunction.ts
var r = n.store, i = {};
function a(e) {
	let t = r, n = t.findTypeURIs(e), i = t.bottomTypeURIs(n), a = [];
	for (let e in i) a.push(e);
	return a[0];
}
function o(n, r) {
	let o = a(r), s = i[o];
	return e("paneUtils: Going to implement field " + r + " of type " + o), s || function(e, n) {
		let i = t(e, "No handler for field " + r + " of type " + o);
		return n && n.appendChild(i), i;
	};
}
//#endregion
export { i as field, o as fieldFunction, a as mostSpecificClassURI };

//# sourceMappingURL=fieldFunction.esm.js.map