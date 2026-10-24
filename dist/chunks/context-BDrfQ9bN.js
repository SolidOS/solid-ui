import { x as e } from "./components-C8c2Ucm5.js";
// src/lib/context/noopContext.ts
function t(e) {
	let t = () => {
		throw Error(`Context '${e}' is missing. Is the component inside its provider?`);
	};
	return new Proxy({}, {
		get: t,
		set: t,
		has: t,
		ownKeys: t,
		getOwnPropertyDescriptor: t,
		defineProperty: t,
		deleteProperty: t
	});
}
// src/lib/file-explorer/context.ts
var n = e(Symbol("file-explorer")), r = t("file-explorer");
export { n, r as t };

//# sourceMappingURL=context-BDrfQ9bN.js.map