import e from "../lib/styleConstants.esm.js";
import { style as t } from "../lib/style.esm.js";
import { cancelButton as n } from "./buttons.esm.js";
import "./index.esm.js";
//#region src/widgets/error.ts
function r(r, i, a, o) {
	let s = r.createElement("div"), c = o || i instanceof Error ? i : null;
	return c ? (console.error(`errorMessageBlock: ${c} at: ${c.stack || "??"}`, c), s.textContent = c.message) : s.textContent = i, s.appendChild(n(r, () => {
		s.parentNode && s.parentNode.removeChild(s);
	})).style = t.errorCancelButton, s.setAttribute("style", t.errorMessageBlockStyle), s.style.backgroundColor = a || e.defaultErrorBackgroundColor, s;
}
//#endregion
export { r as errorMessageBlock };

//# sourceMappingURL=error.esm.js.map