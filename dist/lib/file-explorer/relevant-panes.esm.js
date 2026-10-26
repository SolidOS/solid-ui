import e from "../ns.esm.js";
import { filterAvailablePanes as t } from "../../login/login.esm.js";
// src/lib/file-explorer/relevant-panes.ts
async function n(e, n, r = {}) {
	let i = new Set(r.excludedPaneNames || []), a = n.session.paneRegistry, o = a.list.filter((t) => !t.global && !i.has(t.name) && t.label(e, n));
	if (o.length === 0) {
		let e = r.fallbackPaneName ? a.byName(r.fallbackPaneName) : void 0;
		return e ? [e] : [];
	}
	let s = await t(o);
	return s.length === 0 ? [o[0]] : a.list.indexOf(o[0]) < a.list.indexOf(s[0]) ? [o[0]].concat(s) : s;
}
function r(t, n, r) {
	let i = n.session.store, a = i.any(t, e.ui("mintClass"), void 0, t.doc()) || i.any(t.doc(), e.ui("mintClass"), void 0, t.doc());
	if (a) {
		let e = r.find((e) => e.mintClass?.sameTerm(a));
		if (e) return e;
	}
	return r.find((e) => e.shouldGetFocus?.(t)) || r[0];
}
export { r as getPreferredPane, n as getRelevantPanes };

//# sourceMappingURL=relevant-panes.esm.js.map