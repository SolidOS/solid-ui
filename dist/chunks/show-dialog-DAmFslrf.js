// src/lib/dialogs/events/show-dialog.ts
var e = "solid-ui:show-dialog", t = class t extends Event {
	static eventName = e;
	constructor(e) {
		super(t.eventName, {
			bubbles: !0,
			composed: !0
		}), this.dialog = e;
	}
};
export { t };

//# sourceMappingURL=show-dialog-DAmFslrf.js.map