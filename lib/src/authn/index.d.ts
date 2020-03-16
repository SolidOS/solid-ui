/**
 * Re-exports all the exports from the various files in the src/authn/ folder
 * @packageDocumentation
 */
import { checkUser, // Async
currentUser, // Sync
defaultTestUser, // Sync
filterAvailablePanes, // Async
findAppInstances, findOriginOwner, getUserRoles, // Async
loadTypeIndexes, logIn, logInLoadProfile, logInLoadPreferences, loginStatusBox, newAppInstance, offlineTestID, registerInTypeIndex, registrationControl, registrationList, selectWorkspace, setACLUserPublic, saveUser } from './authn';
export declare const authn: {
    checkUser: typeof checkUser;
    currentUser: typeof currentUser;
    defaultTestUser: typeof defaultTestUser;
    filterAvailablePanes: typeof filterAvailablePanes;
    findAppInstances: typeof findAppInstances;
    findOriginOwner: typeof findOriginOwner;
    getUserRoles: typeof getUserRoles;
    loadTypeIndexes: typeof loadTypeIndexes;
    logIn: typeof logIn;
    logInLoadProfile: typeof logInLoadProfile;
    logInLoadPreferences: typeof logInLoadPreferences;
    loginStatusBox: typeof loginStatusBox;
    newAppInstance: typeof newAppInstance;
    offlineTestID: typeof offlineTestID;
    registerInTypeIndex: typeof registerInTypeIndex;
    registrationControl: typeof registrationControl;
    registrationList: typeof registrationList;
    selectWorkspace: typeof selectWorkspace;
    setACLUserPublic: typeof setACLUserPublic;
    saveUser: typeof saveUser;
    solidAuthClient: any;
};
//# sourceMappingURL=index.d.ts.map