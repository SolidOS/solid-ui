// ~icons/lucide/arrow-left
var e = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m12 19l-7-7l7-7m7 7H5\"/></svg>";
	}
};
customElements.get("icon-lucide-arrow-left") || customElements.define("icon-lucide-arrow-left", e);
export { e as default };

//# sourceMappingURL=arrow-left.esm.js.map