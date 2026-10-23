// node_modules/@lit/reactive-element/decorators/custom-element.js
var e = (e) => (t, n) => {
	n === void 0 ? customElements.define(e, t) : n.addInitializer(() => {
		customElements.define(e, t);
	});
};
export { e as t };

//# sourceMappingURL=custom-element-BW8Ua4c7.js.map