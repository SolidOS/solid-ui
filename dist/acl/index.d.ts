/**
 * Re-exports all the exports from the various files in the src/acl/ folder
 * @packageDocumentation
 */
import { ACLbyCombination, ACLToString, ACLunion, adoptACLDefault, comboToString, fixIndividualACL, fixIndividualCardACL, getACL, getACLorDefault, loadUnionACL, makeACLGraph, makeACLGraphbyCombo, makeACLString, putACLbyCombo, putACLObject, readACL, sameACL, setACL } from './acl';
import { ACLControlBox5, preventBrowserDropEvents, shortNameForFolder } from './acl-control';
export declare const acl: {
    adoptACLDefault: typeof adoptACLDefault;
    readACL: typeof readACL;
    sameACL: typeof sameACL;
    ACLunion: typeof ACLunion;
    loadUnionACL: typeof loadUnionACL;
    ACLbyCombination: typeof ACLbyCombination;
    makeACLGraph: typeof makeACLGraph;
    makeACLGraphbyCombo: typeof makeACLGraphbyCombo;
    ACLToString: typeof ACLToString;
    comboToString: typeof comboToString;
    makeACLString: typeof makeACLString;
    putACLObject: typeof putACLObject;
    putACLbyCombo: typeof putACLbyCombo;
    fixIndividualCardACL: typeof fixIndividualCardACL;
    fixIndividualACL: typeof fixIndividualACL;
    setACL: typeof setACL;
    getACLorDefault: typeof getACLorDefault;
    getACL: typeof getACL;
};
export declare const aclControl: {
    preventBrowserDropEvents: typeof preventBrowserDropEvents;
    shortNameForFolder: typeof shortNameForFolder;
    ACLControlBox5: typeof ACLControlBox5;
};
//# sourceMappingURL=index.d.ts.map