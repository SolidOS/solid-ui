import "./index.esm.js";
import { style as e } from "../lib/style.esm.js";
import { cancelButton as t } from "./buttons.esm.js";
import n from "../lib/styleConstants.esm.js";
// src/widgets/error.ts
function r(r, i, a, o) {
	let s = r.createElement("div"), c = o || i instanceof Error ? i : null;
	return c ? (console.error(`errorMessageBlock: ${c} at: ${c.stack || "??"}`, c), s.textContent = c.message) : s.textContent = i, s.appendChild(t(r, () => {
		s.parentNode && s.parentNode.removeChild(s);
	})).style = e.errorCancelButton, s.setAttribute("style", e.errorMessageBlockStyle), s.style.backgroundColor = a || n.defaultErrorBackgroundColor, s;
}
export { r as errorMessageBlock };

//# sourceMappingURL=error.esm.js.map