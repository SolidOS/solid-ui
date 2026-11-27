import e from "../../lib/ns.esm.js";
import { store as t } from "solid-logic";
import { fieldParams as n } from "./fieldParams.esm.js";
import { mostSpecificClassURI as r } from "./fieldFunction.esm.js";
// src/widgets/forms/formStyle.ts
var i = "https://www.w3.org/ns/css#";
function a(a, o) {
	let s = r(o), c = n[s] || {}, l = t.any(o, e.ui("style"));
	l ? l.termType === "Literal" ? l && a.setAttribute("style", l.value) : t.statementsMatching(l, null, null, o.doc()).forEach((e) => {
		if (e.predicate.uri && e.predicate.uri.startsWith(i)) {
			let t = e.predicate.uri.slice(26);
			try {
				a.style[t] = e.object.value;
			} catch {
				console.warn(`setFieldStyle: Error setting element style ${t} to "${e.object.value}"`), console.warn(`setFieldStyle:   ... Element tagName was "${a.tagName || "???"}"`);
			}
		}
	}) : c.style && a.setAttribute("style", c.style);
}
export { a as setFieldStyle };

//# sourceMappingURL=formStyle.esm.js.map