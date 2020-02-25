"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authn = void 0;

var _authn = require("./authn");

/**
 * Re-exports all the exports from the various files in the src/authn/ folder
 * @packageDocumentation
 */
var authn = {
  checkUser: _authn.checkUser,
  // Async
  currentUser: _authn.currentUser,
  // Sync
  defaultTestUser: _authn.defaultTestUser,
  // Sync
  filterAvailablePanes: _authn.filterAvailablePanes,
  // Async
  findAppInstances: _authn.findAppInstances,
  findOriginOwner: _authn.findOriginOwner,
  getUserRoles: _authn.getUserRoles,
  // Async
  loadTypeIndexes: _authn.loadTypeIndexes,
  logIn: _authn.logIn,
  logInLoadProfile: _authn.logInLoadProfile,
  logInLoadPreferences: _authn.logInLoadPreferences,
  loginStatusBox: _authn.loginStatusBox,
  newAppInstance: _authn.newAppInstance,
  offlineTestID: _authn.offlineTestID,
  registerInTypeIndex: _authn.registerInTypeIndex,
  registrationControl: _authn.registrationControl,
  registrationList: _authn.registrationList,
  selectWorkspace: _authn.selectWorkspace,
  setACLUserPublic: _authn.setACLUserPublic,
  saveUser: _authn.saveUser,
  solidAuthClient: _authn.solidAuthClient
};
exports.authn = authn;
//# sourceMappingURL=index.js.map