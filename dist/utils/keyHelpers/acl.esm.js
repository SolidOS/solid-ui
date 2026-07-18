import { log as e } from "../../lib/debug.esm.js";
import { store as t } from "solid-logic";
//#region src/utils/keyHelpers/acl.ts
async function n(n, r) {
	await t.fetcher.load(n);
	let i = t.any(t.sym(n), t.sym("http://www.iana.org/assignments/link-relations/acl"));
	if (!i) throw Error("Key ACL doc not found!");
	try {
		await t.fetcher.webOperation("PUT", i.value, {
			data: r,
			contentType: "text/turtle"
		});
	} catch (t) {
		if (t?.response?.status !== 404) throw Error(t);
		e("delete " + i.value + " " + t.response.status);
	}
}
var r = (e) => `
@prefix : <#>.
@prefix acl: <http://www.w3.org/ns/auth/acl#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix key: <./>.

:ReadWrite
    a acl:Authorization;
    acl:accessTo key:;
    acl:default key:;
    acl:agent <${e}>;
    acl:mode acl:Read, acl:Write.
`, i = (e, t) => {
	let n = "acl:agentClass foaf:Agent";
	return t?.length && (n = `acl:agent <${t}>`), `
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix acl: <http://www.w3.org/ns/auth/acl#>.
<#Read>
    a acl:Authorization;
    ${n};
    acl:accessTo <${e.split("/").pop()}>;
    acl:mode acl:Read.
`;
};
//#endregion
export { i as keyAclBody, r as keyContainerAclBody, n as setAcl };

//# sourceMappingURL=acl.esm.js.map