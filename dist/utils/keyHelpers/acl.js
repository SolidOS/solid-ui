import * as debug from '../../debug';
import { store } from 'solid-logic';
/**
 * set ACL
 * @param keyDoc
 * @param aclBody
 */
export async function setAcl(keyDoc, aclBody) {
    // Some servers don't present a Link http response header
    // if the container doesn't exist yet, refetch the resource
    var _a;
    await store.fetcher.load(keyDoc);
    // FIXME: check the Why value on this quad:
    // debug.log(store.statementsMatching(store.sym(keyDoc), store.sym('http://www.iana.org/assignments/link-relations/acl')))
    const keyAclDoc = store.any(store.sym(keyDoc), store.sym('http://www.iana.org/assignments/link-relations/acl'));
    if (!keyAclDoc) {
        throw new Error('Key ACL doc not found!');
    }
    try {
        await store.fetcher.webOperation('PUT', keyAclDoc.value, {
            data: aclBody,
            contentType: 'text/turtle'
        });
    }
    catch (err) {
        if (((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.status) !== 404) {
            throw new Error(err);
        }
        debug.log('delete ' + keyAclDoc.value + ' ' + err.response.status); // should test 404 and 2xx
    }
}
/**
 * key container ACL
 * @param me
 * @returns aclBody
 */
export const keyContainerAclBody = (me) => {
    const aclBody = `
@prefix : <#>.
@prefix acl: <http://www.w3.org/ns/auth/acl#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix key: <./>.

:ReadWrite
    a acl:Authorization;
    acl:accessTo key:;
    acl:default key:;
    acl:agent <${me}>;
    acl:mode acl:Read, acl:Write.
`;
    return aclBody;
};
/**
 * Read only ACL
 * @param keyDoc
 * @param me
 * @returns aclBody
 */
export const keyAclBody = (keyDoc, me) => {
    let keyAgent = 'acl:agentClass foaf:Agent'; // publicKey
    if (me === null || me === void 0 ? void 0 : me.length)
        keyAgent = `acl:agent <${me}>`; // privateKey
    const aclBody = `
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix acl: <http://www.w3.org/ns/auth/acl#>.
<#Read>
    a acl:Authorization;
    ${keyAgent};
    acl:accessTo <${keyDoc.split('/').pop()}>;
    acl:mode acl:Read.
`;
    return aclBody;
};
//# sourceMappingURL=acl.js.map