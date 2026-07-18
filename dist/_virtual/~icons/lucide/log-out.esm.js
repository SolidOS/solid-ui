//#region ~icons/lucide/log-out
var e = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m16 17l5-5l-5-5m5 5H9m0 9H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/></svg>";
	}
};
customElements.get("icon-lucide-log-out") || customElements.define("icon-lucide-log-out", e);
//#endregion
export { e as default };

//# sourceMappingURL=log-out.esm.js.map