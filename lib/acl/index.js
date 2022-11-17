"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aclControl = exports.acl = void 0;
var _acl = require("./acl");
var _aclControl = require("./acl-control");
/**
 * Re-exports all the exports from the various files in the src/acl/ folder
 * @packageDocumentation
 */

var acl = {
  adoptACLDefault: _acl.adoptACLDefault,
  readACL: _acl.readACL,
  sameACL: _acl.sameACL,
  ACLunion: _acl.ACLunion,
  loadUnionACL: _acl.loadUnionACL,
  ACLbyCombination: _acl.ACLbyCombination,
  makeACLGraph: _acl.makeACLGraph,
  makeACLGraphbyCombo: _acl.makeACLGraphbyCombo,
  ACLToString: _acl.ACLToString,
  comboToString: _acl.comboToString,
  makeACLString: _acl.makeACLString,
  putACLObject: _acl.putACLObject,
  putACLbyCombo: _acl.putACLbyCombo,
  fixIndividualCardACL: _acl.fixIndividualCardACL,
  fixIndividualACL: _acl.fixIndividualACL,
  setACL: _acl.setACL,
  getACLorDefault: _acl.getACLorDefault,
  getACL: _acl.getACL
};
exports.acl = acl;
var aclControl = {
  preventBrowserDropEvents: _aclControl.preventBrowserDropEvents,
  shortNameForFolder: _aclControl.shortNameForFolder,
  ACLControlBox5: _aclControl.ACLControlBox5
};
exports.aclControl = aclControl;
//# sourceMappingURL=index.js.map