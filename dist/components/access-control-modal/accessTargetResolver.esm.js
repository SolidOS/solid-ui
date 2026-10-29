import "../combobox/index.esm.js";
import { directoryEntryOptionTemplate as e } from "./AccessControlAddAccess.esm.js";
import { defineAsyncComboboxOptionsProvider as t } from "../combobox/Combobox.esm.js";
import { label as n } from "../../utils/label.esm.js";
import r from "../../lib/ns.esm.js";
import "../../_virtual/~icons/lucide/globe.esm.js";
import { dedupeByKey as i, dedupeComboboxOptions as a, isAbsoluteHttpUri as o, isOriginUrl as s, normalizeOriginInput as c } from "./helpers.esm.js";
import { sym as l } from "rdflib";
import { DEFAULT_DIRECTORY_SOURCES as u, solidLogicSingleton as d } from "solid-logic";
import { html as f } from "lit";
// src/components/access-control-modal/accessTargetResolver.ts
async function p(e) {
	let t = c(e);
	return t ? {
		kind: "origin",
		subjectValue: t
	} : s(e) ? {
		kind: "origin",
		subjectValue: new URL(e).origin
	} : await d.acl.classifyAccessControlSubject(e);
}
async function m(e, t) {
	if (!e || e.kind === "origin") return e?.subjectValue;
	let r = l(e.subjectValue);
	await d.store.fetcher.load(r.doc());
	let i = t?.trim() || n(r).trim();
	if (!i || i === e.subjectValue) throw Error("The access target has no usable display label.");
	return i;
}
async function h(e, t) {
	let n = await p(e);
	if (!n) return;
	let r = await m(n, t);
	if (r) return {
		subjectType: n.kind,
		subjectValue: n.subjectValue,
		label: r,
		targetKind: n.kind === "origin" ? "origin" : void 0
	};
}
async function g(e) {
	let t = await h(e);
	return t ? {
		label: t.label,
		value: e
	} : void 0;
}
function _(t, n) {
	return {
		label: n,
		value: t.uri,
		template: e({
			...t,
			label: n
		})
	};
}
async function v(e) {
	let t = c(e);
	if (t) return [{
		label: `Use origin ${t}`,
		value: t,
		targetKind: "origin",
		template: f`<span class="access-grants-directory-entry"><icon-lucide-globe style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-globe><span>Use origin ${t}</span></span>`
	}];
	if (!o(e)) return [];
	if (s(e)) return [{
		label: `Use origin ${new URL(e).origin}`,
		value: new URL(e).origin,
		targetKind: "origin",
		template: f`<span class="access-grants-directory-entry"><icon-lucide-globe style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-globe><span>Use origin ${new URL(e).origin}</span></span>`
	}];
	let n = await g(e);
	return a(n ? [n] : []);
}
async function y(e) {
	try {
		let t = d.authn.currentUser();
		if (!t) return [];
		await d.profile.loadProfile(t);
		let n = d.store;
		return n.each(t, r.acl("trustedApp")).flatMap((t) => {
			let i = n.any(t, r.acl("origin"));
			if (!i || !s(i.value)) return [];
			let a = new URL(i.value).origin;
			return e && !`${a} trusted app`.toLowerCase().includes(e.toLowerCase()) ? [] : [{
				label: `Trusted app: ${a}`,
				value: a,
				targetKind: "trustedApp",
				template: f`<span class="access-grants-directory-entry"><icon-lucide-globe style="width: 13px; height: 13px; flex: 0 0 13px;"></icon-lucide-globe><span>Trusted app: ${a}</span></span>`
			}];
		});
	} catch {
		return [];
	}
}
function b(e) {
	return e.length ? e : [{
		label: "Type at least 2 characters to search",
		value: "",
		selectable: !1
	}];
}
var x = t(async (e) => {
	let t = e.trim(), n = await v(t), r = await y(t);
	if (t.length < 2) return i([
		...n,
		...r,
		...b(n)
	], (e) => {
		let t = e;
		return typeof t.value == "string" ? `${t.value}:${t.targetKind ?? "default"}` : void 0;
	});
	let a = [];
	try {
		a = await d.directory.search({
			query: t,
			sources: u
		});
	} catch (e) {
		if (!n.length && !r.length) throw e;
	}
	let o = (await Promise.all(a.map(async (e) => {
		try {
			let t = await h(e.uri, e.label);
			return t ? {
				entry: e,
				label: t.label
			} : void 0;
		} catch {
			return;
		}
	}))).filter((e) => e !== void 0).map(({ entry: e, label: t }) => _(e, t));
	return i([
		...n,
		...r,
		...o
	], (e) => {
		let t = e;
		return typeof t.value == "string" ? `${t.value}:${t.targetKind ?? "default"}` : void 0;
	});
});
export { x as accessPrincipalOptionsProvider, h as resolveAccessTarget };

//# sourceMappingURL=accessTargetResolver.esm.js.map