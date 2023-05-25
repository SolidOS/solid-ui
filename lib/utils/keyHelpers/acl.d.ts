/**
 * set ACL
 * @param keyDoc
 * @param aclBody
 */
export declare function setAcl(keyDoc: string, aclBody: string): Promise<void>;
/**
 * key container ACL
 * @param me
 * @returns aclBody
 */
export declare const keyContainerAclBody: (me: string) => string;
/**
 * Read only ACL
 * @param keyDoc
 * @param me
 * @returns aclBody
 */
export declare const keyAclBody: (keyDoc: any, me: any) => string;
//# sourceMappingURL=acl.d.ts.map