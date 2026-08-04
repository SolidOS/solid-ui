import { __exportAll as e } from "../../../_virtual/_rolldown/runtime.esm.js";
import t from "../../../lib/ns.esm.js";
import { log as n, warn as r } from "../../../lib/debug.esm.js";
import { defaultPreferredLanguages as i, getPreferredLanguages as a } from "./language.esm.js";
import { Literal as o, parse as s } from "rdflib";
import { store as c } from "solid-logic";
//#region src/widgets/forms/autocomplete/publicData.ts
var l = /* @__PURE__ */ e({
	AUTOCOMPLETE_LIMIT: () => 200,
	ESCOResultToBindings: () => C,
	bindingToTerm: () => x,
	dbPediaTypeMap: () => g,
	dbpediaParameters: () => h,
	escoParameters: () => m,
	fetcherOptionsJsonPublicData: () => p,
	getDbpediaDetails: () => N,
	getWikidataDetails: () => A,
	getWikidataDetailsOld: () => j,
	getWikidataLocation: () => M,
	instituteDetailsWikidataQuery: () => f,
	loadFromBindings: () => S,
	loadPublicDataThing: () => k,
	queryESCODataByName: () => w,
	queryPublicDataByName: () => E,
	queryPublicDataConstruct: () => O,
	queryPublicDataSelect: () => D,
	variableNameToPredicateMap: () => b,
	wikidataClasses: () => d,
	wikidataIncomingClassMap: () => y,
	wikidataOutgoingClassMap: () => _,
	wikidataParameters: () => v
}), u = /\$\(subject\)/g, d = {
	Corporation: "http://www.wikidata.org/entity/Q6881511",
	EducationalOrganization: "http://www.wikidata.org/entity/Q178706",
	GovernmentOrganization: "http://www.wikidata.org/entity/Q327333",
	MedicalOrganization: "http://www.wikidata.org/entity/Q4287745",
	MusicGroup: "http://www.wikidata.org/entity/Q32178211",
	NGO: "http://www.wikidata.org/entity/Q163740",
	Occupation: "http://www.wikidata.org/entity/Q28640",
	Project: "http://www.wikidata.org/entity/Q170584",
	ResearchOrganization: "http://www.wikidata.org/entity/Q31855",
	SportsOrganization: "http://www.wikidata.org/entity/Q4438121"
}, f = "prefix vcard: <http://www.w3.org/2006/vcard/ns#>\nCONSTRUCT\n{  wd:Q49108 vcard:fn ?itemLabel.\nwd:Q49108 rdf:type ?klass. ?klass rdfs:label ?klassLabel; rdfs:comment ?klassDescription .\nwd:Q49108 schema:logo ?logo;\n   schema:image ?image;\n   schema:logo  ?sealImage;\n   schema:subOrganization  ?subsidiary .\n      ?subsidiary rdfs:label ?subsidiaryLabel .\n ?supersidiary schema:subOrganization wd:Q49108 .\n      ?supersidiary rdfs:label ?supersidiaryLabel .\n  wd:Q49108 schema:location ?location .\n     ?location  schema:elevation  ?elevation .\n     ?location  wdt:P131  ?region .  ?region rdfs:label ?regionLabel .\n     ?location wdt:P625 ?coordinates .\n     ?location  schema:country  ?country . ?country rdfs:label ?countryLabel .\n}\nWHERE\n{  optional {wd:Q49108 rdfs:label ?itemLabel} .\n  optional {wd:Q49108 wdt:P154 ?logo .}\n  optional {wd:Q49108 wdt:P31 ?klass .}\n  optional {wd:Q49108 wdt:P158  ?sealImage .}\n  optional {wd:Q49108 wdt:P18 ?image .}\n\n  optional { wd:Q49108       wdt:P355 ?subsidiary . }\n  optional { ?supersidiary   wdt:P355 wd:Q49108. }\n\n  optional { wd:Q49108 wdt:P276 ?location .\n\n    optional { ?location  schema:eleveation  ?elevation }\n    optional { ?location  wdt:P131  ?region }\n    optional { ?location wdt:P625 ?coordinates }\n    optional {  ?location  wdt:P17  ?country }\n  }\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\". }\n}", p = {
	credentials: "omit",
	headers: new Headers({ Accept: "application/json" })
}, m = {
	label: "ESCO",
	logo: c.sym("https://ec.europa.eu/esco/portal/static_resource2/images/logo/logo_en.gif"),
	searchByNameURI: "https://ec.europa.eu/esco/api/search?language=$(language)&type=occupation&text=$(name)"
}, h = {
	label: "DBPedia",
	logo: c.sym("https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/DBpediaLogo.svg/263px-DBpediaLogo.svg.png"),
	searchByNameQuery: "select distinct ?subject, ?name where {\n    ?subject a $(targetClass); rdfs:label ?name\n    FILTER regex(?name, \"$(name)\", \"i\")\n  } LIMIT $(limit)",
	endpoint: "https://dbpedia.org/sparql/"
}, g = { AcademicInsitution: "http://umbel.org/umbel/rc/EducationalOrganization" }, _ = {
	AcademicInsitution: "http://www.wikidata.org/entity/Q4671277",
	Enterprise: "http://www.wikidata.org/entity/Q6881511",
	Business: "http://www.wikidata.org/entity/Q4830453",
	NGO: "http://www.wikidata.org/entity/Q79913",
	CharitableOrganization: "http://www.wikidata.org/entity/Q708676",
	Insitute: "http://www.wikidata.org/entity/Q1664720"
}, v = {
	label: "WikiData",
	limit: 3e3,
	logo: c.sym("https://www.wikimedia.org/static/images/project-logos/wikidatawiki.png"),
	endpoint: "https://query.wikidata.org/sparql",
	searchByNameQuery: "SELECT ?subject ?name\n  WHERE {\n    ?klass wdt:P279* $(targetClass) .\n    ?subject wdt:P31 ?klass .\n    ?subject rdfs:label ?name.\n    FILTER regex(?name, \"$(name)\", \"i\")\n  } LIMIT $(limit) ",
	insitituteDetailsQuery: "CONSTRUCT\n{  wd:Q49108 schema:name ?itemLabel;\n             schema:logo ?logo;\n              schema:logo  ?sealImage;\n             schema:subOrganization  ?subsidiary .\n                 ?subsidiary schema:name ?subsidiaryLabel .\n}\nWHERE\n{\n   wd:Q49108 # rdfs:label ?itemLabel ;\n             wdt:P154 ?logo;\n              wdt:P158  ?sealImage ;\n             wdt:P355  ?subsidiary .\n          #  ?subsidiary rdfs:label ?subsidiaryLabel .\n\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE], fr\". }\n}"
}, y = {
	"http://www.wikidata.org/entity/Q15936437": t.schema("CollegeOrUniversity"),
	"http://www.wikidata.org/entity/Q1664720": t.schema("EducationalOrganization"),
	"http://www.wikidata.org/entity/Q43229": t.schema("Organization"),
	"http://www.wikidata.org/entity/Q3918": t.schema("CollegeOrUniversity"),
	"http://www.wikidata.org/entity/Q170584": t.schema("Project"),
	"http://www.wikidata.org/entity/Q327333": t.schema("GovernmentOrganization"),
	"http://www.wikidata.org/entity/Q2221906": t.schema("Place"),
	"http://www.wikidata.org/entity/Q167037": t.schema("Corporation")
}, b = {
	targetClass: t.rdf("type"),
	sealImage: t.schema("logo"),
	shortName: t.foaf("nick"),
	subsidiary: t.schema("subOrganization"),
	city: t.vcard("locality"),
	state: t.vcard("region"),
	country: t.vcard("country-name"),
	homepage: t.foaf("homepage"),
	lat: t.schema("latitude"),
	long: t.schema("longitude")
};
function x(e) {
	let t = e.type.toLowerCase();
	if (t === "uri" || t === "iri") return c.sym(e.value);
	if (t === "literal") return e["xml:lang"] ? new o(e.value, e["xml:lang"]) : new o(e.value);
	throw Error(`bindingToTerm: Unexpected type "${e.type}" in sparql binding}`);
}
function S(e, i, a, s, c = b) {
	let l = {};
	n(`loadFromBindings:  subject: ${i}`), n(`                       doc: ${s}`), a.forEach((e) => {
		for (let t in e) {
			let n = e[t], r = JSON.stringify(n);
			l[t] = l[t] || /* @__PURE__ */ new Set(), l[t].add(r);
		}
	});
	for (let a in l) {
		let u = l[a];
		n(`    results ${a} -> ${u}`), u.forEach((l) => {
			let u = JSON.parse(l), { type: d, value: f } = u, p;
			if (d === "uri") p = e.sym(f);
			else if (d === "literal") p = new o(f, u.language, u.datatype);
			else throw Error(`loadFromBindings:  unexpected type: ${d}`);
			if (a === "type") y[f] ? p = y[f] : r("Unmapped Wikidata Class: " + f);
			else if (a === "coordinates") {
				n("         @@@ hey a point: " + f);
				let r = /.*\(([-0-9.-]*) ([-0-9.-]*)\)/.exec(f);
				if (r) {
					let n = t.xsd("float"), a = new o(r[1], null, n), c = new o(r[2], null, n);
					e.add(i, t.schema("longitude"), c, s), e.add(i, t.schema("latitude"), a, s);
				} else n("Bad coordinates syntax: " + f);
			} else {
				let r = c[a] || t.schema(a);
				e.add(i, r, p, s), n(`  public data ${r} ${p}.`);
			}
		});
	}
}
function C(e) {
	return e._embedded.results.map((e) => {
		let t = e.title, n = e.uri;
		return {
			name: {
				value: t,
				type: "literal"
			},
			subject: {
				type: "IRI",
				value: n
			}
		};
	});
}
async function w(e, t, r) {
	if (!r.searchByNameURI) throw Error("Missing queryTarget.searchByNameURI on queryESCODataByName");
	let i = r.limit || 200, a = r.searchByNameURI.replace("$(name)", e).replace("$(limit)", "" + i).replace("$(targetClass)", t.toNT());
	n("Querying ESCO data - uri: " + a);
	let o = (await c.fetcher?.webOperation("GET", a, p))?.responseText || "";
	if (n("    Query result  text" + o.slice(0, 500) + "..."), o.length === 0) throw Error("Wot no text back from ESCO query " + a);
	let s = JSON.parse(o);
	return n("    ESCO Query result JSON" + JSON.stringify(s, null, 4).slice(0, 500) + "..."), C(s);
}
function T(e) {
	let t = e.indexOf("SPARQL-QUERY");
	if (t < 0) return e;
	r("  ### Fixing JSON with wikidata error code injection " + e.slice(t, t + 200));
	let n = e.lastIndexOf("}, {");
	return e.slice(0, n) + " } ] } } ";
}
async function E(e, t, r, o) {
	function s(n) {
		let r = o.limit || 200;
		return n.replace("$(name)", e).replace("$(limit)", "" + r).replace("$(language)", l).replace("$(targetClass)", t.toNT());
	}
	if (!t) throw Error("queryPublicDataByName: No class provided");
	let l = (await a() || i)[0] || "en";
	if (o.searchByNameQuery) {
		let e = s(o.searchByNameQuery);
		return n("Querying public data - sparql: " + e), D(e, o);
	}
	if (o.searchByNameURI) {
		let e = s(o.searchByNameURI), t;
		try {
			t = await c.fetcher?.webOperation("GET", e, p);
		} catch (t) {
			throw Error(`Exception when trying to fetch ${e} \n ${t}`);
		}
		let r = t.responseText || "";
		if (t.status !== 200) throw Error(`HTTP error status ${t.status} trying to fetch ${e} `);
		if (n("    Query result  text" + r.slice(0, 500) + "..."), r.length === 0) throw Error("queryPublicDataByName: No text back from public data query " + e);
		let i = T(r), a = JSON.parse(i);
		if (n("    API Query result JSON" + JSON.stringify(a, null, 4).slice(0, 500) + "..."), a._embedded) return n("      Looks like ESCO"), C(a);
		throw alert("Code me: unrecognized API return format"), Error(`*** Need to add code to parse unrecognized API JSON return\n${JSON.stringify(a, null, 4)}`);
	}
	throw Error("Query source must have either rest API or SPARQL endpoint.");
}
async function D(e, t) {
	if (!t.endpoint) throw Error("Missing queryTarget.endpoint required for queryPublicDataSelect");
	let r = new URL(t.endpoint);
	r.searchParams.append("query", e);
	let i = r.href;
	n(" queryPublicDataSelect uri: " + i);
	let a = new Headers();
	a.append("Accept", "application/json");
	let o = {
		credentials: "omit",
		headers: a
	}, s = (await c.fetcher?.webOperation("GET", i, o))?.responseText || "";
	if (s.length === 0) throw Error("No text back from query " + i);
	let l = T(s), u = JSON.parse(l);
	return n("    Query result JSON" + JSON.stringify(u, null, 4).slice(0, 100) + "..."), u.results.bindings;
}
async function O(e, t, r) {
	if (n("queryPublicDataConstruct: sparql:", e), !r.endpoint) throw Error("Missing queryTarget.endpoint required for queryPublicDataConstruct");
	let i = new URL(r.endpoint);
	i.searchParams.append("query", e);
	let a = i.href;
	n(" queryPublicDataConstruct uri: " + a);
	let o = new Headers();
	o.append("Accept", "text/turtle");
	let l = {
		credentials: "omit",
		headers: o
	}, u = (await c.fetcher?.webOperation("GET", a, l))?.responseText || "No response text?", d = u.length > 500 ? u.slice(0, 200) + " ... " + u.slice(-200) : u;
	if (n("    queryPublicDataConstruct result text:" + d), u.length === 0) throw Error("queryPublicDataConstruct: No text back from construct query:" + a);
	s(u, c, t.uri, "text/turtle");
}
async function k(e, t, n) {
	if (n.uri.startsWith("https://dbpedia.org/resource/")) return N(e, t, n);
	if (n.uri.match(/^https?:\/\/www\.wikidata\.org\/entity\/.*/)) await A(e, t, n);
	else {
		let t = n.uri.startsWith("http:") ? e.sym("https:" + n.uri.slice(5)) : n, r = new Headers();
		return r.append("Accept", "text/turtle"), e.fetcher.load(t, {
			credentials: "omit",
			headers: r
		});
	}
}
async function A(e, t, r) {
	await O(f.replace(/wd:Q49108/g, r.toNT()), r, v), n("getWikidataDetails: loaded.", r);
}
async function j(e, t, n) {
	S(e, n, await D("select distinct *  where {\n  optional { $(subject)  wdt:P31  ?targetClass } # instance of\n  optional { $(subject)  wdt:P154  ?logo }\n  optional { $(subject)  wdt:P158  ?sealImage }\n# optional { $(subject)  wdt:P159  ?headquartersLocation }\n\noptional { $(subject)  wdt:P17  ?country }\noptional { $(subject)  wdt:P18  ?image }\noptional { $(subject)  wdt:P1813  ?shortName }\n\noptional { $(subject)  wdt:P355  ?subsidiary }\n# SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\" }\n}".replace(u, n.toNT()), v), n.doc());
}
async function M(e, t, r) {
	let i = "select distinct *  where {\n\n  $(subject) wdt:P276 ?location .\n\n  optional { ?location  wdt:P2044  ?elevation }\n  optional { ?location  wdt:P131  ?region }\n  optional { ?location wdt:P625 ?coordinates }\noptional {  ?location  wdt:P17  ?country }\n\n# SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\" }\n}".replace(u, r.toNT());
	n(" location query sparql:" + i);
	let a = await D(i, v);
	n(" location query bindings:", a), S(e, r, a, r.doc());
}
async function N(e, t, r) {
	S(e, r, await D(`select distinct ?city, ?state, ?country, ?homepage, ?logo, ?lat, ?long,  WHERE {
    OPTIONAL { <${r}> <http://dbpedia.org/ontology/city> ?city }
    OPTIONAL { ${r} <http://dbpedia.org/ontology/state> ?state }
    OPTIONAL { ${r} <http://dbpedia.org/ontology/country> ?country }
    OPTIONAL { ${r} foaf:homepage ?homepage }
    OPTIONAL { ${r} foaf:lat ?lat; foaf:long ?long }
    OPTIONAL { ${r} <http://dbpedia.org/ontology/country> ?country }
   }`, h), r.doc()), n("Finished getDbpediaDetails.");
}
//#endregion
export { C as ESCOResultToBindings, x as bindingToTerm, g as dbPediaTypeMap, h as dbpediaParameters, m as escoParameters, p as fetcherOptionsJsonPublicData, N as getDbpediaDetails, A as getWikidataDetails, j as getWikidataDetailsOld, M as getWikidataLocation, f as instituteDetailsWikidataQuery, S as loadFromBindings, k as loadPublicDataThing, l as publicData_exports, w as queryESCODataByName, E as queryPublicDataByName, O as queryPublicDataConstruct, D as queryPublicDataSelect, b as variableNameToPredicateMap, d as wikidataClasses, y as wikidataIncomingClassMap, _ as wikidataOutgoingClassMap, v as wikidataParameters };

//# sourceMappingURL=publicData.esm.js.map