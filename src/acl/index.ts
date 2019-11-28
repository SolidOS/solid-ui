import {
  ACLbyCombination,
  ACLToString,
  ACLunion,
  adoptACLDefault,
  comboToString,
  fixIndividualACL,
  fixIndividualCardACL,
  getACL,
  getACLorDefault,
  loadUnionACL,
  makeACLGraph,
  makeACLGraphbyCombo,
  makeACLString,
  putACLbyCombo,
  putACLObject,
  readACL,
  sameACL, setACL
} from './acl'
import {
  ACLControlBox5,
  preventBrowserDropEvents,
  shortNameForFolder
} from './acl-control'

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
}

export const aclControl = {
  preventBrowserDropEvents,
  shortNameForFolder,
  ACLControlBox5
}
