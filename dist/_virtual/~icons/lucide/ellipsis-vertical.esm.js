// ~icons/lucide/ellipsis-vertical
var e = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"12\" cy=\"5\" r=\"1\"/><circle cx=\"12\" cy=\"19\" r=\"1\"/></g></svg>";
	}
};
customElements.get("icon-lucide-ellipsis-vertical") || customElements.define("icon-lucide-ellipsis-vertical", e);
export { e as default };

//# sourceMappingURL=ellipsis-vertical.esm.js.map