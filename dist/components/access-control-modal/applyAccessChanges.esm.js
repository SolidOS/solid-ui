import { PUBLIC_ACCESS_ROLES as e, Public as t, solidLogicSingleton as n } from "solid-logic";
// src/components/access-control-modal/applyAccessChanges.ts
async function r(e, t, r = {}) {
	let a = [], o = r.containerScope ?? "file";
	for (let { subject: r, label: s, role: c } of t) try {
		let t = o === "folder+contents" ? n.acl.planGrantContainerAndContents : o === "container" ? n.acl.planGrantContainer : o === "contents" ? n.acl.planGrantContainerContents : n.acl.planGrant, a = c === "No Access" ? await (o === "contents" ? n.acl.planRevokeContainerContents(e, r) : n.acl.planRevoke(e, r)) : await t(e, r, i(r, c));
		await n.acl.applyPlan(a);
	} catch (e) {
		a.push({
			action: c === "No Access" ? "revoke" : "grant",
			targetUri: r.iri,
			label: s,
			role: c,
			scope: o,
			message: e instanceof Error ? e.message : "Unable to apply access change."
		});
	}
	return a;
}
function i(r, i) {
	if (r.type === "agentClass" && r.iri === t.iri) {
		let t = e.find((e) => e === i);
		if (!t) throw Error(`Public access does not support the ${i} role.`);
		return n.acl.modesFromPublicRole(t);
	}
	return n.acl.modesFromRole(i);
}
export { r as applyAccessChanges };

//# sourceMappingURL=applyAccessChanges.esm.js.map