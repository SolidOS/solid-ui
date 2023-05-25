import { NamedNode } from 'rdflib';
export declare const getPodRoot: (webId: NamedNode) => Promise<NamedNode>;
export declare const pubKeyUrl: (webId: NamedNode) => Promise<string>;
export declare function getExistingPublicKey(webId: NamedNode, publicKeyUrl: string): Promise<string | undefined>;
export declare const privKeyUrl: (webId: NamedNode) => Promise<string>;
export declare function getExistingPrivateKey(webId: NamedNode, privateKeyUrl: string): Promise<string | undefined>;
type KeyType = 'publicKey' | 'privateKey';
export declare function getKeyIfExists(webId: NamedNode, keyUrl: string, keyType: KeyType): Promise<string | undefined>;
export {};
//# sourceMappingURL=accessData.d.ts.map