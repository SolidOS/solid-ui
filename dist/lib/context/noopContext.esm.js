// src/lib/context/noopContext.ts
function e(e) {
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
export { e as noopContext };

//# sourceMappingURL=noopContext.esm.js.map