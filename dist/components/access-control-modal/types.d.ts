import { AccessControlSubjectKind, AccessRole, AccessSubject, Authorization } from 'solid-logic';
export type AccessControlBadgeKind = 'agent' | 'group' | 'agentClass' | 'unknown';
export type PendingAccessSubjectKind = Exclude<AccessControlSubjectKind, 'origin'>;
export type AccessControlBadge = {
    kind: AccessControlBadgeKind;
    image?: string;
    text: string;
};
export type PendingAccessGrant = {
    id?: string;
    subjectType: PendingAccessSubjectKind;
    subjectValue: string;
    role: AccessRole;
    label: string;
};
export type AccessGrantEntry = {
    authorization: Authorization;
    index: number;
    role: AccessRole;
    subjectLabel: string;
    badge: AccessControlBadge;
};
export type ChangedAccessGrant = {
    authorization: Authorization;
    subjects: AccessSubject[];
    role: AccessRole;
};
export type AuthorizationSubjectSet = {
    type: PendingAccessSubjectKind;
    iris: string[];
};
export type AccessChange = {
    subject: AccessSubject;
    role: AccessRole;
};
//# sourceMappingURL=types.d.ts.map