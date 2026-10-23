// src/lib/file-explorer/compose-explorer.ts
function e(e, t) {
	e.context = t.context, e.subjectUri = t.subjectUri, e.pane = t.pane, e.relevantPanes = t.relevantPanes;
	let n = e.querySelector(":scope > solid-ui-file-explorer-header");
	if (t.header) {
		let r = n || e.ownerDocument.createElement("solid-ui-file-explorer-header");
		r.paneIcon = t.header.paneIcon, r.menuItems = t.header.menuItems, e.firstElementChild !== r && e.prepend(r);
	} else n?.remove();
	if (t.paneElement) {
		let n = t.paneElement;
		n.classList.add("paneDiv");
		let r = e.querySelector(":scope > .paneDiv");
		r ? r !== n && r.replaceWith(n) : e.appendChild(n);
	}
}
export { e as composeExplorer };

//# sourceMappingURL=compose-explorer.esm.js.map