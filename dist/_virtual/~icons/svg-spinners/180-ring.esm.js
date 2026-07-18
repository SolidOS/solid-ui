//#region ~icons/svg-spinners/180-ring
var e = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><path fill=\"currentColor\" d=\"M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z\"><animateTransform attributeName=\"transform\" dur=\"0.75s\" repeatCount=\"indefinite\" type=\"rotate\" values=\"0 12 12;360 12 12\"/></path></svg>";
	}
};
customElements.get("icon-svg-spinners-180-ring") || customElements.define("icon-svg-spinners-180-ring", e);
//#endregion
export { e as default };

//# sourceMappingURL=180-ring.esm.js.map