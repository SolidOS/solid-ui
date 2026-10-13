//#region ~icons/lucide/triangle-alert
var e = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"m21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3M12 9v4m0 4h.01\"/></svg>";
	}
};
customElements.get("icon-lucide-triangle-alert") || customElements.define("icon-lucide-triangle-alert", e);
//#endregion
export { e as default };

//# sourceMappingURL=triangle-alert.esm.js.map