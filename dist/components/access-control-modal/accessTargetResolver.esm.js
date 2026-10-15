import { label as e } from "../../utils/label.esm.js";
import { defineAsyncComboboxOptionsProvider as t } from "../combobox/Combobox.esm.js";
import "../combobox/index.esm.js";
import { dedupeByKey as n, dedupeComboboxOptions as r, isAbsoluteHttpUri as i, isOriginUrl as a, normalizeOriginInput as o } from "./helpers.esm.js";
import { directoryEntryOptionTemplate as s } from "./AccessControlAddAccess.esm.js";
import { sym as c } from "rdflib";
import { DEFAULT_DIRECTORY_SOURCES as l, solidLogicSingleton as u } from "solid-logic";
//#region src/components/access-control-modal/accessTargetResolver.ts
async function d(e) {
	let t = o(e);
	return t ? {
		kind: "origin",
		subjectValue: t
	} : await u.acl.classifyAccessControlSubject(e);
}
async function f(t, n) {
	if (!t || t.kind === "origin") return t?.subjectValue;
	let r = c(t.subjectValue);
	await u.store.fetcher.load(r.doc());
	let i = n?.trim() || e(r).trim();
	if (i && i !== t.subjectValue) return i;
}
async function p(e, t) {
	let n = await d(e);
	if (!n) return;
	let r = await f(n, t);
	if (r) return {
		subjectType: n.kind,
		subjectValue: n.subjectValue,
		label: r
	};
}
async function m(e) {
	let t = await p(e);
	return t ? {
		label: t.label,
		value: e
	} : void 0;
}
function h(e, t) {
	return {
		label: t,
		value: e.uri,
		template: s({
			...e,
			label: t
		})
	};
}
async function g(e) {
	let t = o(e);
	if (t) return [{
		label: `Use origin ${t}`,
		value: t
	}];
	if (!i(e)) return [];
	if (a(e)) return [{
		label: `Use origin ${new URL(e).origin}`,
		value: new URL(e).origin
	}];
	let n = await m(e);
	return r(n ? [n] : []);
}
function _(e) {
	return e.length ? e : [{
		label: "Type at least 2 characters to search",
		value: "",
		selectable: !1
	}];
}
var v = t(async (e) => {
	let t = e.trim(), r = await g(t);
	if (t.length < 2) return _(r);
	let i = [];
	try {
		i = await u.directory.search({
			query: t,
			sources: l
		});
	} catch (e) {
		if (!r.length) throw e;
	}
	let a = (await Promise.all(i.map(async (e) => {
		try {
			let t = await p(e.uri, e.label);
			return t ? {
				entry: e,
				label: t.label
			} : void 0;
		} catch {
			return;
		}
	}))).filter((e) => e !== void 0).map(({ entry: e, label: t }) => h(e, t));
	return n([...r, ...a], (e) => typeof e.value == "string" ? e.value : void 0);
});
//#endregion
export { v as accessPrincipalOptionsProvider, p as resolveAccessTarget };

//# sourceMappingURL=accessTargetResolver.esm.js.map