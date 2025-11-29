import * as debug from '../../debug';
import { store } from 'solid-logic';
import ns from '../../ns';
import { getRootIfPreferencesExist } from './otherHelpers';
export const pubKeyUrl = (webId) => {
    let url;
    try {
        const root = getRootIfPreferencesExist(webId);
        url = `${root}/profile/keys/publicKey.ttl`;
    }
    catch (err) {
        debug.error(err);
    }
    return url;
};
export const privKeyUrl = (webId) => {
    let url;
    try {
        const root = getRootIfPreferencesExist(webId);
        url = `${root}/settings/keys/privateKey.ttl`;
    }
    catch (err) {
        debug.error(err);
    }
    return url;
};
export async function getExistingPublicKey(webId, publicKeyUrl) {
    // find publickey
    return await getKeyIfExists(webId, publicKeyUrl, 'publicKey');
}
export async function getExistingPrivateKey(webId, privateKeyUrl) {
    // find privateKey
    return await getKeyIfExists(webId, privateKeyUrl, 'privateKey');
}
export async function getKeyIfExists(webId, keyUrl, keyType) {
    try {
        await store.fetcher.load(keyUrl);
        const key = store.any(webId, ns.solid(keyType)); // store.sym(CERT + keyType))
        return key === null || key === void 0 ? void 0 : key.value; // as NamedNode
    }
    catch (err) {
        if (err.response.status === 404) {
            debug.log('createIfNotExists: doc does NOT exist, will create... ' + keyUrl);
            try {
                await store.fetcher.webOperation('PUT', keyUrl, {
                    data: '',
                    contentType: 'text/turtle'
                });
            }
            catch (err) {
                debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + err);
                throw err;
            }
            delete store.fetcher.requested[keyUrl]; // delete cached 404 error
            // debug.log('createIfNotExists doc created ok ' + doc)
            return undefined; // response
        }
        else {
            debug.log('createIfNotExists doc FAILED: ' + keyUrl + ': ' + err);
            throw err;
        }
    }
}
//# sourceMappingURL=accessData.js.map