//#region src/lib/dialogs/events/close-dialog.ts
var e = "solid-ui:close-dialog", t = class t extends Event {
	id;
	data;
	static eventName = e;
	constructor(e, n) {
		super(t.eventName, {
			bubbles: !0,
			composed: !0
		}), this.id = e, this.data = n;
	}
};
//#endregion
export { t as CloseDialogEvent };

//# sourceMappingURL=close-dialog.esm.js.map