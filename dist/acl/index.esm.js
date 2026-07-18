import { ACLToString as e, ACLbyCombination as t, ACLunion as n, adoptACLDefault as r, comboToString as i, fixIndividualACL as a, fixIndividualCardACL as o, getACL as s, getACLorDefault as c, loadUnionACL as l, makeACLGraph as u, makeACLGraphbyCombo as d, makeACLString as f, putACLObject as p, putACLbyCombo as m, readACL as h, sameACL as g, setACL as _ } from "./acl.esm.js";
import { ACLControlBox5 as v, preventBrowserDropEvents as y, shortNameForFolder as b } from "./acl-control.esm.js";
//#region src/acl/index.ts
var x = {
	adoptACLDefault: r,
	readACL: h,
	sameACL: g,
	ACLunion: n,
	loadUnionACL: l,
	ACLbyCombination: t,
	makeACLGraph: u,
	makeACLGraphbyCombo: d,
	ACLToString: e,
	comboToString: i,
	makeACLString: f,
	putACLObject: p,
	putACLbyCombo: m,
	fixIndividualCardACL: o,
	fixIndividualACL: a,
	setACL: _,
	getACLorDefault: c,
	getACL: s
}, S = {
	preventBrowserDropEvents: y,
	shortNameForFolder: b,
	ACLControlBox5: v
};
//#endregion
export { x as acl, S as aclControl };

//# sourceMappingURL=index.esm.js.map