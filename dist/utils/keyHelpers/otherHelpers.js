import { store } from 'solid-logic';
import ns from '../../ns';
// Will rename this file later. We will probably be using solid-logic anyway
// moved it out so I can mock
export const getRootIfPreferencesExist = (webId) => {
    var _a;
    let root = (_a = store.any(webId, ns.space('preferencesFile'), null, webId.doc())) === null || _a === void 0 ? void 0 : _a.value;
    root = root === null || root === void 0 ? void 0 : root.split('/').slice(0, -2).join('/');
    if (!root)
        throw new Error(`prefererencesFile is expected to exist in ${webId}`);
    return root;
};
//# sourceMappingURL=otherHelpers.js.map