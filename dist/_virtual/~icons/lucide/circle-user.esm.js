//#region ~icons/lucide/circle-user
var e = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><g fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/><path d=\"M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662\"/></g></svg>";
	}
};
customElements.get("icon-lucide-circle-user") || customElements.define("icon-lucide-circle-user", e);
//#endregion
export { e as default };

//# sourceMappingURL=circle-user.esm.js.map