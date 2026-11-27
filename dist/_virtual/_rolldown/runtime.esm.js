// \0rolldown/runtime.js
var e = Object.defineProperty, t = (t, n) => {
	let r = Object.setPrototypeOf({}, null);
	for (var i in t) e(r, i, {
		get: t[i],
		enumerable: !0
	});
	return n & 1 || e(r, Symbol.toStringTag, { value: "Module" }), n & 2 ? r : Object.preventExtensions(r);
};
export { t as __exportAll };
