import { NamedNode } from 'rdflib';
export declare function generatePrivateKey(): string;
export declare function generatePublicKey(privateKey: string): string;
/**
 * getPublicKey
 * used for displaying messages in chat, therefore does not
 * create a new key if not found
 * @param webId
 * @returns string | undefined
 */
export declare function getPublicKey(webId: NamedNode): Promise<string | undefined>;
export declare function getPrivateKey(webId: NamedNode): Promise<string>;
//# sourceMappingURL=keys.d.ts.map