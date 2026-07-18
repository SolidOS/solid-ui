import { style as e } from "../lib/style.esm.js";
//#region src/widgets/widgetHelpers.ts
var t = (e, t, n) => {
	let r = e.createElement("tr");
	return r.appendChild(e.createElement("td")).appendChild(t), r.subject = n, r;
}, n = (e, t) => {
	e.addEventListener("click", t);
}, r = (t, n, r) => {
	let i = n.appendChild(t.createElement("div"));
	i.setAttribute("style", e.imageDivStyle), i.appendChild(r), r.setAttribute("draggable", "false");
};
//#endregion
export { n as addClickListenerToElement, r as createImageDiv, t as wrapDivInATR };

//# sourceMappingURL=widgetHelpers.esm.js.map