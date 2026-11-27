import { PUBLIC_ACCESS_ROLES as e, Public as t, solidLogicSingleton as n } from "solid-logic";
// src/components/access-control-modal/applyAccessChanges.ts
async function r(e, t, r = {}) {
	let o = [], s = r.containerScope ?? "file", c = new URL(e).pathname.endsWith("/");
	for (let { subject: r, label: l, role: u, scope: d, previousScope: f } of t) {
		let t = i(c ? d ?? s : "file"), p = c && f ? i(f) : "file";
		try {
			if (f && p !== t) {
				let i = p === "contents" || p === "folder+contents" && t === "container" ? await n.acl.planRevokeContainerContents(e, r) : await n.acl.planRevoke(e, r);
				await n.acl.applyPlan(i);
			}
			let i = t === "folder+contents" ? n.acl.planGrantContainerAndContents : t === "container" ? n.acl.planGrantContainer : t === "contents" ? n.acl.planGrantContainerContents : n.acl.planGrant, o = u === "No Access" ? await (t === "contents" ? n.acl.planRevokeContainerContents(e, r) : n.acl.planRevoke(e, r)) : await i(e, r, a(r, u));
			await n.acl.applyPlan(o);
		} catch (e) {
			o.push({
				action: u === "No Access" ? "revoke" : "grant",
				targetUri: r.iri,
				label: l,
				role: u,
				scope: t,
				message: e instanceof Error ? e.message : "Unable to apply access change."
			});
		}
	}
	return o;
}
function i(e) {
	return e === "folder" ? "container" : e;
}
function a(r, i) {
	if (r.type === "agentClass" && r.iri === t.iri) {
		let t = e.find((e) => e === i);
		if (!t) throw Error(`Public access does not support the ${i} role.`);
		return n.acl.modesFromPublicRole(t);
	}
	return n.acl.modesFromRole(i);
}
export { r as applyAccessChanges };

//# sourceMappingURL=applyAccessChanges.esm.js.map