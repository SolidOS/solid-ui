//#region ~icons/svg-spinners/3-dots-fade
var e = class extends HTMLElement {
	constructor() {
		super(), this.attachShadow({ mode: "open" }).innerHTML = "<style>:host { display: inline-flex; }</style><svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\" ><circle cx=\"4\" cy=\"12\" r=\"3\" fill=\"currentColor\"><animate id=\"SVG7x14Dcom\" fill=\"freeze\" attributeName=\"opacity\" begin=\"0;SVGqSjG0dUp.end-0.25s\" dur=\"0.75s\" values=\"1;.2\"/></circle><circle cx=\"12\" cy=\"12\" r=\"3\" fill=\"currentColor\" opacity=\".4\"><animate fill=\"freeze\" attributeName=\"opacity\" begin=\"SVG7x14Dcom.begin+0.15s\" dur=\"0.75s\" values=\"1;.2\"/></circle><circle cx=\"20\" cy=\"12\" r=\"3\" fill=\"currentColor\" opacity=\".3\"><animate id=\"SVGqSjG0dUp\" fill=\"freeze\" attributeName=\"opacity\" begin=\"SVG7x14Dcom.begin+0.3s\" dur=\"0.75s\" values=\"1;.2\"/></circle></svg>";
	}
};
customElements.get("icon-svg-spinners-3-dots-fade") || customElements.define("icon-svg-spinners-3-dots-fade", e);
//#endregion
export { e as default };

//# sourceMappingURL=3-dots-fade.esm.js.map