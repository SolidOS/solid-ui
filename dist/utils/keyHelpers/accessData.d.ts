import { NamedNode } from 'rdflib';
export declare const pubKeyUrl: (webId: NamedNode) => any;
export declare const privKeyUrl: (webId: NamedNode) => any;
export declare function getExistingPublicKey(webId: NamedNode, publicKeyUrl: string): Promise<any>;
export declare function getExistingPrivateKey(webId: NamedNode, privateKeyUrl: string): Promise<any>;
type KeyType = 'publicKey' | 'privateKey';
export declare function getKeyIfExists(webId: NamedNode, keyUrl: string, keyType: KeyType): Promise<any>;
export {};
//# sourceMappingURL=accessData.d.ts.map