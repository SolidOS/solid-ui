import { IndexedFormula, NamedNode } from 'rdflib';
export declare function isOwnWebIdProfile(subject: NamedNode): boolean;
export declare function loadProfileFromURI(uri: NamedNode): Promise<NamedNode>;
export declare function isWebIdUri(uri: NamedNode): boolean;
export declare function getNameOfPodOwner(pod: NamedNode): Promise<string>;
export declare function getName(store: IndexedFormula, ownersProfile: NamedNode): string;
//# sourceMappingURL=webIdUtils.d.ts.map