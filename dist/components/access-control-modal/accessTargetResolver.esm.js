import "../combobox/index.esm.js";
import { directoryEntryOptionIcon as e } from "./AccessControlAddAccess.esm.js";
import { defineAsyncComboboxOptionsProvider as t } from "../combobox/Combobox.esm.js";
import { label as n } from "../../utils/label.esm.js";
import { solidLogicSingleton as r } from "solid-logic";
import { sym as i } from "rdflib";
import { html as a } from "lit";
import o from "../../lib/ns.esm.js";
import "../../_virtual/~icons/lucide/globe.esm.js";
import { dedupeByKey as s, dedupeComboboxOptions as c, isAbsoluteHttpUri as l, isOriginUrl as u, normalizeOriginInput as d } from "./helpers.esm.js";
// src/components/access-control-modal/accessTargetResolver.ts
var f = [
	"contacts",
	"friends",
	"groups"
];
async function p(e) {
	let t = d(e);
	return t ? {
		kind: "origin",
		subjectValue: t
	} : u(e) ? {
		kind: "origin",
		subjectValue: new URL(e).origin
	} : await r.acl.classifyAccessControlSubject(e);
}
async function m(e, t) {
	if (!e || e.kind === "origin") return e?.subjectValue;
	let a = i(e.subjectValue);
	await r.store.fetcher.load(a.doc());
	let o = t?.trim() || n(a).trim();
	if (!o || o === e.subjectValue) throw Error("The access target has no usable display label.");
	return o;
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
		icon: e(t)
	};
}
async function v(e) {
	let t = d(e);
	if (t) return [{
		label: `Use origin ${t}`,
		value: t,
		targetKind: "origin",
		icon: a`<icon-lucide-globe></icon-lucide-globe>`
	}];
	if (!l(e)) return [];
	if (u(e)) return [{
		label: `Use origin ${new URL(e).origin}`,
		value: new URL(e).origin,
		targetKind: "origin",
		icon: a`<icon-lucide-globe></icon-lucide-globe>`
	}];
	let n = await g(e);
	return c(n ? [n] : []);
}
async function y(e) {
	try {
		let t = r.authn.currentUser();
		if (!t) return [];
		await r.profile.loadProfile(t);
		let n = r.store;
		return n.each(t, o.acl("trustedApp")).flatMap((t) => {
			let r = n.any(t, o.acl("origin"));
			if (!r || !u(r.value)) return [];
			let i = new URL(r.value).origin;
			return e && !`${i} trusted app`.toLowerCase().includes(e.toLowerCase()) ? [] : [{
				label: `Trusted app: ${i}`,
				value: i,
				targetKind: "trustedApp",
				icon: a`<icon-lucide-globe></icon-lucide-globe>`
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
	let t = e.trim(), n = await v(t), i = await y(t);
	if (t.length < 2) return s([
		...n,
		...i,
		...b(n)
	], (e) => {
		let t = e;
		return typeof t.value == "string" ? `${t.value}:${t.targetKind ?? "default"}` : void 0;
	});
	let a = [];
	try {
		a = await r.directory.search({
			query: t,
			sources: f
		});
	} catch (e) {
		if (!n.length && !i.length) throw e;
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
	return s([
		...n,
		...i,
		...o
	], (e) => {
		let t = e;
		return typeof t.value == "string" ? `${t.value}:${t.targetKind ?? "default"}` : void 0;
	});
});
export { x as accessPrincipalOptionsProvider, h as resolveAccessTarget };

//# sourceMappingURL=accessTargetResolver.esm.js.map