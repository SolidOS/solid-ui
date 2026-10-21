import { AccessChange, AccessSaveError, AccessSaveScope } from './types';
export declare function applyAccessChanges(subjectUri: string, accessChanges: AccessChange[], options?: {
    containerScope?: AccessSaveScope;
}): Promise<AccessSaveError[]>;
//# sourceMappingURL=applyAccessChanges.d.ts.map