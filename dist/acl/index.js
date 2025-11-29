/**
 * Re-exports all the exports from the various files in the src/acl/ folder
 * @packageDocumentation
 */
import { ACLbyCombination, ACLToString, ACLunion, adoptACLDefault, comboToString, fixIndividualACL, fixIndividualCardACL, getACL, getACLorDefault, loadUnionACL, makeACLGraph, makeACLGraphbyCombo, makeACLString, putACLbyCombo, putACLObject, readACL, sameACL, setACL } from './acl';
import { ACLControlBox5, preventBrowserDropEvents, shortNameForFolder } from './acl-control';
export const acl = {
    adoptACLDefault,
    readACL,
    sameACL,
    ACLunion,
    loadUnionACL,
    ACLbyCombination,
    makeACLGraph,
    makeACLGraphbyCombo,
    ACLToString,
    comboToString,
    makeACLString,
    putACLObject,
    putACLbyCombo,
    fixIndividualCardACL,
    fixIndividualACL,
    setACL,
    getACLorDefault,
    getACL
};
export const aclControl = {
    preventBrowserDropEvents,
    shortNameForFolder,
    ACLControlBox5
};
//# sourceMappingURL=index.js.map