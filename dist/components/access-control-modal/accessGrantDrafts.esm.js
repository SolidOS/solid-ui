import { label as e } from "../../utils/label.esm.js";
import { Authenticated as t, Public as n, solidLogicSingleton as r } from "solid-logic";
import { sym as i } from "rdflib";
// src/components/access-control-modal/accessGrantDrafts.ts
function a(e) {
	return {
		...e,
		agentClass: e.agentClass.filter((e) => e !== t.iri && e !== n.iri)
	};
}
function o(e) {
	return [
		{
			type: "agent",
			iris: e.agent
		},
		{
			type: "agentGroup",
			iris: e.agentGroup
		},
		{
			type: "agentClass",
			iris: e.agentClass
		},
		{
			type: "origin",
			iris: e.origin
		}
	].flatMap(({ type: e, iris: t }) => t.map((t) => ({
		type: e,
		iri: t
	})));
}
function s(e) {
	return e.id ? e.id : o(e).map((e) => `${e.type}:${e.iri}`).sort().join("|");
}
function c(e) {
	let t = /* @__PURE__ */ new Map();
	return e.map((e) => {
		let n = s(a(e)), r = t.get(n) ?? 0;
		return t.set(n, r + 1), r === 0 ? n : `${n}#${r}`;
	});
}
function l(t) {
	let n = [
		...t.agent,
		...t.agentGroup,
		...t.agentClass,
		...t.origin
	];
	return n.length ? n.map((t) => e(i(t))).join(", ") : "Unknown access holder";
}
function u(e) {
	return r.acl.roleFromModes(e.mode);
}
function d(e) {
	let t = a(e);
	return {
		id: s(t),
		authorization: t,
		role: u(t),
		initialRole: u(e),
		subjectLabel: l(t),
		subjects: o(t)
	};
}
function f(e) {
	let t = c(e);
	return e.map((e, n) => ({
		...d(e),
		id: t[n]
	}));
}
function p(e) {
	return [...e].sort((t, n) => {
		let r = t.role === "Owner", i = n.role === "Owner";
		return r && !i ? -1 : !r && i ? 1 : e.indexOf(t) - e.indexOf(n);
	});
}
function m(e) {
	return p(e).filter(({ role: e, initialRole: t, scope: n, initialScope: r, subjects: i }) => (e !== "No Access" || t !== "No Access") && (e !== t || n !== r) && i.length > 0).map(({ authorization: e, subjects: t, role: n, scope: r, initialScope: i }) => ({
		authorization: e,
		subjects: t,
		role: n,
		scope: r,
		initialScope: i
	}));
}
function h(e) {
	let n = e.filter((e) => e.agentClass.includes(t.iri)).flatMap((e) => e.mode);
	return n.length ? r.acl.roleFromModes(n) : "No Access";
}
function g(e) {
	let t = e.filter((e) => e.agentClass.includes(n.iri)).flatMap((e) => e.mode);
	return t.length ? r.acl.publicRoleFromModes(t) : "No Access";
}
function _(r) {
	return r.iri === t.iri ? "Authenticated users" : r.iri === n.iri ? "Public" : e(i(r.iri)).trim() || r.iri;
}
export { d as createAccessGrantDraft, f as createAccessGrantDrafts, s as getAccessGrantId, c as getAccessGrantIds, p as getAccessGrantViewModels, _ as getAccessSubjectLabel, h as getAuthenticatedAccessRole, u as getAuthorizationRole, o as getAuthorizationSubjectEntries, l as getAuthorizationSubjectLabel, m as getChangedAccessGrants, g as getPublicAccessRole, a as getSharedAuthorization };

//# sourceMappingURL=accessGrantDrafts.esm.js.map