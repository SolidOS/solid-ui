//#region src/lib/dialogs/events/show-dialog.ts
var e = "solid-ui:show-dialog", t = class t extends Event {
	static eventName = e;
	constructor(e) {
		super(t.eventName, {
			bubbles: !0,
			composed: !0
		}), this.dialog = e;
	}
};
//#endregion
export { t };

//# sourceMappingURL=show-dialog-eEW5yRBv.js.map