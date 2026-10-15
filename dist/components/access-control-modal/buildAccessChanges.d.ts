import { AccessChange, ChangedAccessGrant, PendingAccessGrant } from './types';
export type AccessChangeDrafts = {
    pendingAccessGrants: PendingAccessGrant[];
    generalAccessChanges: AccessChange[];
    changedAccessGrants: ChangedAccessGrant[];
};
export declare function buildAccessChanges({ pendingAccessGrants, generalAccessChanges, changedAccessGrants }: AccessChangeDrafts): AccessChange[];
//# sourceMappingURL=buildAccessChanges.d.ts.map