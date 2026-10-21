import { log as e } from "./debug.esm.js";
// src/lib/iconBase.ts
var t = "https://solidos.github.io/solid-ui/src", n = typeof module < "u" && module.scriptURI ? {
	iconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf("/")) + "/icons/",
	originalIconBase: module.scriptURI.slice(0, module.scriptURI.lastIndexOf("/")) + "/originalIcons/"
} : typeof $SolidTestEnvironment < "u" && $SolidTestEnvironment.iconBase ? {
	iconBase: $SolidTestEnvironment.iconBase,
	originalIconBase: $SolidTestEnvironment.originalIconBase
} : {
	iconBase: t + "/icons/",
	originalIconBase: t + "/originalIcons/"
};
e("   icons.iconBase is set to : " + n.iconBase);
var r = n.iconBase;
n.originalIconBase;
export { r as iconBase, n as icons };

//# sourceMappingURL=iconBase.esm.js.map