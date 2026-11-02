// src/lib/file-explorer/pane-menu-items.ts
async function e(e, t, n, r) {
	return r ? r(t, n) : typeof e.icon == "function" ? e.icon(t, n) : e.icon;
}
async function t(t) {
	return (await Promise.all(t.panes.map(async (n) => {
		let r = n.label(t.subject, t.context);
		if (!r) return;
		let i = await e(n, t.subject, t.context, t.iconOverrides?.[n.name]);
		return {
			key: n.name,
			label: r,
			...i ? { icon: i } : {},
			action: (e) => t.openPane(t.subject, n.name, e)
		};
	}))).filter((e) => e !== void 0);
}
export { t as preparePaneMenuItems };

//# sourceMappingURL=pane-menu-items.esm.js.map