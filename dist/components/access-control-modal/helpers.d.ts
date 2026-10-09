import { ComboboxOptionData } from '../combobox';
export type StringComboboxOptionData = ComboboxOptionData & {
    value: string;
};
export declare function isHttpUri(possibleUri: string): boolean;
export declare function dedupeByKey<T>(items: T[], getKey: (item: T) => string | undefined): T[];
export declare function dedupeComboboxOptions(options: StringComboboxOptionData[]): StringComboboxOptionData[];
//# sourceMappingURL=helpers.d.ts.map