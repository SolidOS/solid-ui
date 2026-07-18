import { log as e } from "./debug.esm.js";
//#region src/lib/iconBase.ts
var t = typeof module < "u" && module.scriptURI ? {
	iconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf("/")) + "/icons/",
	originalIconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf("/")) + "/originalIcons/"
} : typeof $SolidTestEnvironment < "u" && $SolidTestEnvironment.iconBase ? {
	iconBase: $SolidTestEnvironment.iconBase,
	originalIconBase: $SolidTestEnvironment.originalIconBase
} : {
	iconBase: "https://solidos.github.io/solid-ui/src/icons/",
	originalIconBase: "https://solidos.github.io/solid-ui/src/originalIcons/"
};
e("   icons.iconBase is set to : " + t.iconBase);
var n = t.iconBase, r = t.originalIconBase;
//#endregion
export { n as iconBase, t as icons, r as originalIconBase };

//# sourceMappingURL=iconBase.esm.js.map