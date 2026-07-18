import { originalIconBase as e } from "../../lib/iconBase.esm.js";
//#region src/widgets/buttons/iconLinks.ts
function t(t, n, r) {
	let i = t.createElement("a");
	i.setAttribute("href", n.uri), n.uri.startsWith("http") && i.setAttribute("target", "_blank");
	let a = i.appendChild(t.createElement("img"));
	return a.setAttribute("src", r || e + "go-to-this.png"), a.setAttribute("style", "margin: 0.3em;"), i;
}
var n = (e, n, r) => {
	let i = t(e, r);
	n.appendChild(i).classList.add("HoverControlHide"), n.appendChild(e.createElement("br"));
};
//#endregion
export { n as createLinkForURI, t as linkIcon };

//# sourceMappingURL=iconLinks.esm.js.map