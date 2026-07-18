import { __exportAll as e } from "../../../_virtual/_rolldown/runtime.esm.js";
import t from "../../../lib/ns.esm.js";
import { log as n } from "../../../lib/debug.esm.js";
import { authn as r, store as i } from "solid-logic";
//#region src/widgets/forms/autocomplete/language.ts
var a = /* @__PURE__ */ e({
	addDefaults: () => c,
	defaultPreferredLanguages: () => s,
	filterByLanguage: () => d,
	getPreferredLanguages: () => u,
	getPreferredLanguagesFor: () => l,
	languageCodeURIBase: () => o
}), o = "https://www.w3.org/ns/iana/language-code/", s = [
	"en",
	"fr",
	"de",
	"it",
	"ar"
];
function c(e) {
	return e ||= [], e.concat(s.filter((t) => !e.includes(t)));
}
async function l(e) {
	let n = e.doc();
	await i.fetcher?.load(n);
	let r = i.any(e, t.schema("knowsLanguage"), null, n);
	if (!r) return s;
	let a = [];
	return r.elements.forEach((e) => {
		let r = i.any(e, t.solid("publicId"), null, n);
		if (!r) {
			console.warn("getPreferredLanguages: No publiID of language.");
			return;
		}
		if (!r.value.startsWith("https://www.w3.org/ns/iana/language-code/")) {
			console.error(`What should be a language code ${r.value} does not start with ${o}`);
			return;
		}
		let s = r.value.slice(41);
		a.push(s);
	}), a.length > 0 ? (console.log(`     User knows languages with codes: "${a.join(",")}"`), c(a)) : null;
}
async function u() {
	let e = await r.currentUser();
	if (e) {
		let t = await l(e);
		if (t) return t;
	}
	if (typeof navigator < "u") {
		if (navigator.languages) return c(navigator.languages.map((e) => e.split("-")[0]));
		if (navigator.language) return c([navigator.language.split("-")[0]]);
	}
	return s;
}
function d(e, t) {
	let r = {};
	e.forEach((e) => {
		let t = e.subject.value;
		r[t] = r[t] || [], r[t].push(e);
	});
	let i = t || s;
	i.reverse();
	let a = [];
	for (let e in r) {
		let t = r[e].map((e) => {
			let t = e.name["xml:lang"];
			return [i.indexOf(t), e];
		});
		t.sort(), t.reverse(), a.push(t[0][1]);
	}
	return n(` Filter by language: ${e.length} -> ${a.length}`), a;
}
//#endregion
export { c as addDefaults, s as defaultPreferredLanguages, d as filterByLanguage, u as getPreferredLanguages, l as getPreferredLanguagesFor, o as languageCodeURIBase, a as language_exports };

//# sourceMappingURL=language.esm.js.map