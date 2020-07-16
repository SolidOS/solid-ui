import { IndexedFormula } from 'rdflib';
interface SolidAuthorization {
    accessToken: string;
    clientId: string;
    idToken: string;
}
interface SolidClaim {
    atHash: string;
    aud: string;
    azp: string;
    cnf: {
        jwk: string;
    };
    exp: number;
    iat: number;
    iss: string;
    jti: string;
    nonce: string;
    sub: string;
}
export interface SolidSession {
    authorization: SolidAuthorization;
    credentialType: string;
    idClaims: SolidClaim;
    idp: string;
    issuer: string;
    sessionKey: string;
    webId: string;
}
declare type Menu = {
    label: string;
    url: string;
};
declare type HeaderOptions = {
    logo?: string;
    menuList?: Menu[];
};
export declare function initHeader(store: IndexedFormula, options: HeaderOptions): Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map