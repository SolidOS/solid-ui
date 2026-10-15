import { getAccessSubjectLabel as e } from "./accessGrantDrafts.esm.js";
//#region src/components/access-control-modal/buildAccessChanges.ts
function t({ pendingAccessGrants: t, generalAccessChanges: n, changedAccessGrants: r }) {
	return [
		...t.map((e) => ({
			subject: {
				type: e.subjectType,
				iri: e.subjectValue
			},
			role: e.role,
			label: e.label
		})),
		...n,
		...r.flatMap(({ subjects: t, role: n }) => t.map((t) => ({
			subject: t,
			role: n,
			label: e(t)
		})))
	];
}
//#endregion
export { t as buildAccessChanges };

//# sourceMappingURL=buildAccessChanges.esm.js.map