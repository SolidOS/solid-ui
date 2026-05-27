import { SelectOption } from './optionTypes';
export declare function getNextEnabledIndex(currentIndex: number, options: SelectOption[], direction: 1 | -1): number;
export declare function getFirstEnabledIndex(options: SelectOption[]): number;
export declare function getLastEnabledIndex(options: SelectOption[]): number;
export declare function findOptionIndexByValue(options: SelectOption[], value?: string): number;
export declare function getListboxActionFromKey(key: string): 'open' | 'close' | 'next' | 'previous' | 'first' | 'last' | 'select' | 'none';
//# sourceMappingURL=keyboard.d.ts.map