import { LiveStore, NamedNode } from 'rdflib';
export declare function getPodStorages(url: NamedNode): Promise<NamedNode[]>;
export declare function loadContainerRepresentation(subject: any): Promise<void>;
export declare function isContainerSubject(store: LiveStore | undefined, subjectUri: string | undefined): boolean;
export declare function getContainerItemCount(store: LiveStore | undefined, subjectUri: string | undefined): number;
//# sourceMappingURL=podUtils.d.ts.map