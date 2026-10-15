import { ComboboxOptionData } from '../combobox';
export type StringComboboxOptionData = ComboboxOptionData & {
    value: string;
};
export declare function isAbsoluteHttpUri(value: string): boolean;
export declare function isOriginUrl(value: string): boolean;
export declare function normalizeOriginInput(value: string): string | undefined;
export declare function dedupeByKey<T>(items: T[], getKey: (item: T) => string | undefined): T[];
export declare function dedupeComboboxOptions(options: StringComboboxOptionData[]): StringComboboxOptionData[];
//# sourceMappingURL=helpers.d.ts.map