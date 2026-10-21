import { label as e } from "../../utils/label.esm.js";
import { sym as t } from "rdflib";
import { Authenticated as n, Public as r, solidLogicSingleton as i } from "solid-logic";
// src/components/access-control-modal/accessGrantDrafts.ts
function a(e) {
	return {
		...e,
		agentClass: e.agentClass.filter((e) => e !== n.iri && e !== r.iri)
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
function l(n) {
	let r = [
		...n.agent,
		...n.agentGroup,
		...n.agentClass,
		...n.origin
	];
	return r.length ? r.map((n) => e(t(n))).join(", ") : "Unknown access holder";
}
function u(e) {
	return i.acl.roleFromModes(e.mode);
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
	return p(e).filter(({ role: e, initialRole: t, subjects: n }) => e !== t && n.length > 0).map(({ authorization: e, subjects: t, role: n }) => ({
		authorization: e,
		subjects: t,
		role: n
	}));
}
function h(e) {
	let t = e.filter((e) => e.agentClass.includes(n.iri)).flatMap((e) => e.mode);
	return t.length ? i.acl.roleFromModes(t) : "No Access";
}
function g(e) {
	let t = e.filter((e) => e.agentClass.includes(r.iri)).flatMap((e) => e.mode);
	return t.length ? i.acl.publicRoleFromModes(t) : "No Access";
}
function _(i) {
	return i.iri === n.iri ? "Authenticated users" : i.iri === r.iri ? "Public" : e(t(i.iri)).trim() || i.iri;
}
export { d as createAccessGrantDraft, f as createAccessGrantDrafts, s as getAccessGrantId, c as getAccessGrantIds, p as getAccessGrantViewModels, _ as getAccessSubjectLabel, h as getAuthenticatedAccessRole, u as getAuthorizationRole, o as getAuthorizationSubjectEntries, l as getAuthorizationSubjectLabel, m as getChangedAccessGrants, g as getPublicAccessRole, a as getSharedAuthorization };

//# sourceMappingURL=accessGrantDrafts.esm.js.map