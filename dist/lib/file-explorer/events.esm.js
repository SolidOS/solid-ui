// src/lib/file-explorer/events.ts
var e = "solid-ui-file-explorer-back", t = "solid-ui-file-explorer-manage-access", n = "solid-ui-file-explorer-open-pane";
function r(e, t) {
	return e.composedPath().find((e) => "localName" in e && e.localName === "solid-ui-file-explorer-provider") === t;
}
export { e as FILE_EXPLORER_BACK_EVENT, t as FILE_EXPLORER_MANAGE_ACCESS_EVENT, n as FILE_EXPLORER_OPEN_PANE_EVENT, r as isExplorerEvent };

//# sourceMappingURL=events.esm.js.map