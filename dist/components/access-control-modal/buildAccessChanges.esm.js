import { getAccessSubjectLabel as e } from "./accessGrantDrafts.esm.js";
// src/components/access-control-modal/buildAccessChanges.ts
function t({ pendingAccessGrants: t, generalAccessChanges: n, changedAccessGrants: r }) {
	return [
		...t.map((e) => ({
			subject: {
				type: e.subjectType,
				iri: e.subjectValue
			},
			role: e.role,
			label: e.label,
			scope: e.scope
		})),
		...n,
		...r.flatMap(({ subjects: t, role: n, scope: r, initialScope: i }) => t.map((t) => ({
			subject: t,
			role: n,
			label: e(t),
			scope: r,
			previousScope: i === r ? void 0 : i
		})))
	];
}
export { t as buildAccessChanges };

//# sourceMappingURL=buildAccessChanges.esm.js.map