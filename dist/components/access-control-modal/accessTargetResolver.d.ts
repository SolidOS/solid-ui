import { AsyncComboboxOptionsProvider } from '../combobox';
import { AccessControlSubjectKind } from 'solid-logic';
export type ResolvedAccessTarget = {
    subjectType: AccessControlSubjectKind;
    subjectValue: string;
    label: string;
};
export declare function resolveAccessTarget(principal: string, preferredLabel?: string): Promise<ResolvedAccessTarget | undefined>;
export declare const accessPrincipalOptionsProvider: AsyncComboboxOptionsProvider;
//# sourceMappingURL=accessTargetResolver.d.ts.map