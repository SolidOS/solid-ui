import { filterAvailablePanes as e } from "../../login/login.esm.js";
// src/lib/file-explorer/relevant-panes.ts
async function t(t, n, r = {}) {
	let i = new Set(r.excludedPaneNames || []), a = n.session.paneRegistry, o = a.list.filter((e) => !e.global && !i.has(e.name) && e.label(t, n));
	if (o.length === 0) {
		let e = r.fallbackPaneName ? a.byName(r.fallbackPaneName) : void 0;
		return e ? [e] : [];
	}
	let s = await e(o);
	return s.length === 0 ? [o[0]] : a.list.indexOf(o[0]) < a.list.indexOf(s[0]) ? [o[0]].concat(s) : s;
}
export { t as getRelevantPanes };

//# sourceMappingURL=relevant-panes.esm.js.map