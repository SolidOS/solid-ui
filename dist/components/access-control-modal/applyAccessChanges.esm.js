import { Public as e, solidLogicSingleton as t } from "solid-logic";
//#region src/components/access-control-modal/applyAccessChanges.ts
async function n(n, r) {
	let i = [];
	for (let { subject: a, label: o, role: s } of r) try {
		let r = s === "No Access" ? await t.acl.planRevoke(n, a) : await t.acl.planGrant(n, a, a.type === "agentClass" && a.iri === e.iri ? t.acl.modesFromPublicRole(s) : t.acl.modesFromRole(s));
		await t.acl.applyPlan(r);
	} catch (e) {
		i.push({
			action: s === "No Access" ? "revoke" : "grant",
			targetUri: a.iri,
			label: o,
			role: s,
			message: e instanceof Error ? e.message : "Unable to apply access change."
		});
	}
	return i;
}
//#endregion
export { n as applyAccessChanges };

//# sourceMappingURL=applyAccessChanges.esm.js.map