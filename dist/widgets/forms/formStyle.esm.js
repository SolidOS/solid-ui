import e from "../../lib/ns.esm.js";
import { fieldParams as t } from "./fieldParams.esm.js";
import { mostSpecificClassURI as n } from "./fieldFunction.esm.js";
import { store as r } from "solid-logic";
//#region src/widgets/forms/formStyle.ts
var i = "https://www.w3.org/ns/css#";
function a(a, o) {
	let s = n(o), c = t[s] || {}, l = r.any(o, e.ui("style"));
	if (!l) {
		c.style && a.setAttribute("style", c.style);
		return;
	}
	l.termType === "Literal" ? l && a.setAttribute("style", l.value) : r.statementsMatching(l, null, null, o.doc()).forEach((e) => {
		if (e.predicate.uri && e.predicate.uri.startsWith(i)) {
			let t = e.predicate.uri.slice(26);
			try {
				a.style[t] = e.object.value;
			} catch {
				console.warn(`setFieldStyle: Error setting element style ${t} to "${e.object.value}"`), console.warn(`setFieldStyle:   ... Element tagName was "${a.tagName || "???"}"`);
			}
		}
	});
}
//#endregion
export { a as setFieldStyle };

//# sourceMappingURL=formStyle.esm.js.map