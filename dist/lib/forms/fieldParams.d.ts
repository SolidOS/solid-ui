export type InputType = 'hidden' | 'text' | 'search' | 'tel' | 'url' | 'email' | 'password' | 'datetime' | 'date' | 'month' | 'week' | 'time' | 'datetime-local' | 'number' | 'range' | 'color' | 'checkbox' | 'radio' | 'file' | 'submit' | 'image' | 'reset' | 'button';
export type FieldParamsObject = {
    size?: number;
    type?: InputType;
    element?: string;
    style?: string;
    dt?: string;
    defaultInputValue?: string;
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