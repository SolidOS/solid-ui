export type FieldParamsObject = {
    size?: number;
    type?: string;
    element?: string;
    style?: string;
    dt?: string;
    uriPrefix?: string;
    namedNode?: boolean;
    pattern?: RegExp;
};
/**
 * The fieldParams object defines various constants
 * for use in various form fields. Depending on the
 * field in questions, different values may be read
 * from here.
 */
export declare const fieldParams: {
    [fieldUri: string]: FieldParamsObject;
};
//# sourceMappingURL=fieldParams.d.ts.map