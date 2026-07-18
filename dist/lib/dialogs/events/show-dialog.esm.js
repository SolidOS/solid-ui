//#region src/lib/dialogs/events/show-dialog.ts
var e = "solid-ui:show-dialog", t = class t extends Event {
	dialog;
	static eventName = e;
	constructor(e) {
		super(t.eventName, {
			bubbles: !0,
			composed: !0
		}), this.dialog = e;
	}
};
//#endregion
export { t as ShowDialogEvent };

//# sourceMappingURL=show-dialog.esm.js.map