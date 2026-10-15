import { AccessRole, AccessSubject } from 'solid-logic';
import { AccessAuthorization, AccessGrantDraft, AccessGrantViewModel, ChangedAccessGrant } from './types';
export declare function getSharedAuthorization(authorization: AccessAuthorization): AccessAuthorization;
export declare function getAuthorizationSubjectEntries(authorization: AccessAuthorization): AccessSubject[];
export declare function getAccessGrantId(authorization: AccessAuthorization): string;
export declare function getAccessGrantIds(authorizations: AccessAuthorization[]): string[];
export declare function getAuthorizationSubjectLabel(authorization: AccessAuthorization): string;
export declare function getAuthorizationRole(authorization: AccessAuthorization): AccessRole;
export declare function createAccessGrantDraft(authorization: AccessAuthorization): AccessGrantDraft;
export declare function createAccessGrantDrafts(authorizations: AccessAuthorization[]): AccessGrantDraft[];
export declare function getAccessGrantViewModels(drafts: AccessGrantDraft[]): AccessGrantViewModel[];
export declare function getChangedAccessGrants(drafts: AccessGrantDraft[]): ChangedAccessGrant[];
export declare function getAuthenticatedAccessRole(accessGrants: AccessAuthorization[]): AccessRole;
export declare function getPublicAccessRole(accessGrants: AccessAuthorization[]): AccessRole;
export declare function getAccessSubjectLabel(subject: AccessSubject): string;
//# sourceMappingURL=accessGrantDrafts.d.ts.map