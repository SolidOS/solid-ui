/**
 * Contains types for src/acl/
 * @packageDocumentation
 */
import { NamedNode } from 'rdflib';
export declare type AppDetails = {
    noun: string;
    appPathSegment: string;
};
export declare type AuthenticationContext = {
    containers?: Array<NamedNode>;
    div?: HTMLElement;
    dom?: HTMLDocument;
    index?: {
        [key: string]: Array<NamedNode>;
    };
    instances?: Array<NamedNode>;
    me?: NamedNode | null;
    noun?: string;
    preferencesFile?: NamedNode;
    preferencesFileError?: string;
    publicProfile?: NamedNode;
    statusArea?: HTMLElement;
};
//# sourceMappingURL=types.d.ts.map