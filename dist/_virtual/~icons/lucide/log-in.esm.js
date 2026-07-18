//#region ~icons/lucide/log-in
var e = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m10 17l5-5l-5-5m5 5H3m12-9h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4\"/></svg>";
	}
};
customElements.get("icon-lucide-log-in") || customElements.define("icon-lucide-log-in", e);
//#endregion
export { e as default };

//# sourceMappingURL=log-in.esm.js.map