import { SubjectType } from 'solid-logic';
export declare const ACCESS_ROLES: readonly ["Owner", "Editor", "Viewer", "Poster", "Submitter", "Remove"];
export type AccessRole = typeof ACCESS_ROLES[number];
export type AccessControlBadgeKind = 'agent' | 'group' | 'agentClass' | 'origin' | 'unknown';
export type DraftGrant = {
    id?: string;
    subjectType: SubjectType;
    subjectValue: string;
    role: AccessRole;
    removed?: boolean;
};
//# sourceMappingURL=types.d.ts.map