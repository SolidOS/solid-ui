//#region src/lib/timing.ts
function e(e, t) {
	let n = null, r = (...i) => {
		r.cancel(), n = setTimeout(() => t(...i), e);
	};
	return r.cancel = () => {
		n !== null && (clearTimeout(n), n = null);
	}, r;
}
//#endregion
export { e as debounce };

//# sourceMappingURL=timing.esm.js.map