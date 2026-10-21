import "../../_virtual/~icons/lucide/square-arrow-out-up-right.esm.js";
// src/widgets/buttons/iconLinks.ts
function e(e, t, n) {
	let r = e.createElement("a");
	if (r.setAttribute("href", t.uri), t.uri.startsWith("http") && r.setAttribute("target", "_blank"), n) {
		let t = r.appendChild(e.createElement("img"));
		t.setAttribute("src", n), t.setAttribute("style", "margin: 0.3em;");
	} else {
		r.setAttribute("aria-label", "Open resource");
		let t = r.appendChild(e.createElement("icon-lucide-square-arrow-out-up-right"));
		t.setAttribute("aria-hidden", "true"), t.setAttribute("style", "display: inline-block; width: 1em; height: 1em; margin: 0.2em; color: var(--color-text-secondary, #4A5565);");
	}
	return r;
}
var t = (t, n, r) => {
	let i = e(t, r);
	n.appendChild(i).classList.add("HoverControlHide"), n.appendChild(t.createElement("br"));
};
export { t as createLinkForURI, e as linkIcon };

//# sourceMappingURL=iconLinks.esm.js.map