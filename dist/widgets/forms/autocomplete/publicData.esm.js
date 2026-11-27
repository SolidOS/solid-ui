import { __exportAll as e } from "../../../_virtual/_rolldown/runtime.esm.js";
import { Literal as t, parse as n } from "rdflib";
import { store as r } from "solid-logic";
import { log as i, warn as a } from "../../../lib/debug.esm.js";
import o from "../../../lib/ns.esm.js";
import { defaultPreferredLanguages as s, getPreferredLanguages as c } from "./language.esm.js";
// src/widgets/forms/autocomplete/publicData.ts
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
	logo: r.sym("https://ec.europa.eu/esco/portal/static_resource2/images/logo/logo_en.gif"),
	searchByNameURI: "https://ec.europa.eu/esco/api/search?language=$(language)&type=occupation&text=$(name)"
}, h = {
	label: "DBPedia",
	logo: r.sym("https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/DBpediaLogo.svg/263px-DBpediaLogo.svg.png"),
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
	logo: r.sym("https://www.wikimedia.org/static/images/project-logos/wikidatawiki.png"),
	endpoint: "https://query.wikidata.org/sparql",
	searchByNameQuery: "SELECT ?subject ?name\n  WHERE {\n    ?klass wdt:P279* $(targetClass) .\n    ?subject wdt:P31 ?klass .\n    ?subject rdfs:label ?name.\n    FILTER regex(?name, \"$(name)\", \"i\")\n  } LIMIT $(limit) ",
	insitituteDetailsQuery: "CONSTRUCT\n{  wd:Q49108 schema:name ?itemLabel;\n             schema:logo ?logo;\n              schema:logo  ?sealImage;\n             schema:subOrganization  ?subsidiary .\n                 ?subsidiary schema:name ?subsidiaryLabel .\n}\nWHERE\n{\n   wd:Q49108 # rdfs:label ?itemLabel ;\n             wdt:P154 ?logo;\n              wdt:P158  ?sealImage ;\n             wdt:P355  ?subsidiary .\n          #  ?subsidiary rdfs:label ?subsidiaryLabel .\n\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE], fr\". }\n}"
}, y = {
	"http://www.wikidata.org/entity/Q15936437": o.schema("CollegeOrUniversity"),
	"http://www.wikidata.org/entity/Q1664720": o.schema("EducationalOrganization"),
	"http://www.wikidata.org/entity/Q43229": o.schema("Organization"),
	"http://www.wikidata.org/entity/Q3918": o.schema("CollegeOrUniversity"),
	"http://www.wikidata.org/entity/Q170584": o.schema("Project"),
	"http://www.wikidata.org/entity/Q327333": o.schema("GovernmentOrganization"),
	"http://www.wikidata.org/entity/Q2221906": o.schema("Place"),
	"http://www.wikidata.org/entity/Q167037": o.schema("Corporation")
}, b = {
	targetClass: o.rdf("type"),
	sealImage: o.schema("logo"),
	shortName: o.foaf("nick"),
	subsidiary: o.schema("subOrganization"),
	city: o.vcard("locality"),
	state: o.vcard("region"),
	country: o.vcard("country-name"),
	homepage: o.foaf("homepage"),
	lat: o.schema("latitude"),
	long: o.schema("longitude")
};
function x(e) {
	let n = e.type.toLowerCase();
	if (n === "uri" || n === "iri") return r.sym(e.value);
	if (n === "literal") return e["xml:lang"] ? new t(e.value, e["xml:lang"]) : new t(e.value);
	throw Error(`bindingToTerm: Unexpected type "${e.type}" in sparql binding}`);
}
function S(e, n, r, s, c = b) {
	let l = {};
	i(`loadFromBindings:  subject: ${n}`), i(`                       doc: ${s}`), r.forEach((e) => {
		for (let t in e) {
			let n = e[t], r = JSON.stringify(n);
			l[t] = l[t] || /* @__PURE__ */ new Set(), l[t].add(r);
		}
	});
	for (let r in l) {
		let u = l[r];
		i(`    results ${r} -> ${u}`), u.forEach((l) => {
			let u = JSON.parse(l), { type: d, value: f } = u, p;
			if (d === "uri") p = e.sym(f);
			else if (d === "literal") p = new t(f, u.language, u.datatype);
			else throw Error(`loadFromBindings:  unexpected type: ${d}`);
			if (r === "type") y[f] ? p = y[f] : a("Unmapped Wikidata Class: " + f);
			else if (r === "coordinates") {
				i("         @@@ hey a point: " + f);
				let r = /.*\(([-0-9.-]*) ([-0-9.-]*)\)/.exec(f);
				if (r) {
					let i = o.xsd("float"), a = new t(r[1], null, i), c = new t(r[2], null, i);
					e.add(n, o.schema("longitude"), c, s), e.add(n, o.schema("latitude"), a, s);
				} else i("Bad coordinates syntax: " + f);
			} else {
				let t = c[r] || o.schema(r);
				e.add(n, t, p, s), i(`  public data ${t} ${p}.`);
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
async function w(e, t, n) {
	if (!n.searchByNameURI) throw Error("Missing queryTarget.searchByNameURI on queryESCODataByName");
	let a = n.limit || 200, o = n.searchByNameURI.replace("$(name)", e).replace("$(limit)", "" + a).replace("$(targetClass)", t.toNT());
	i("Querying ESCO data - uri: " + o);
	let s = (await r.fetcher?.webOperation("GET", o, p))?.responseText || "";
	if (i("    Query result  text" + s.slice(0, 500) + "..."), s.length === 0) throw Error("Wot no text back from ESCO query " + o);
	let c = JSON.parse(s);
	return i("    ESCO Query result JSON" + JSON.stringify(c, null, 4).slice(0, 500) + "..."), C(c);
}
function T(e) {
	let t = e.indexOf("SPARQL-QUERY");
	if (t < 0) return e;
	a("  ### Fixing JSON with wikidata error code injection " + e.slice(t, t + 200));
	let n = e.lastIndexOf("}, {");
	return e.slice(0, n) + " } ] } } ";
}
async function E(e, t, n, a) {
	function o(n) {
		let r = a.limit || 200;
		return n.replace("$(name)", e).replace("$(limit)", "" + r).replace("$(language)", l).replace("$(targetClass)", t.toNT());
	}
	if (!t) throw Error("queryPublicDataByName: No class provided");
	let l = (await c() || s)[0] || "en";
	if (a.searchByNameQuery) {
		let e = o(a.searchByNameQuery);
		return i("Querying public data - sparql: " + e), D(e, a);
	}
	if (a.searchByNameURI) {
		let e = o(a.searchByNameURI), t;
		try {
			t = await r.fetcher?.webOperation("GET", e, p);
		} catch (t) {
			throw Error(`Exception when trying to fetch ${e} \n ${t}`);
		}
		let n = t.responseText || "";
		if (t.status !== 200) throw Error(`HTTP error status ${t.status} trying to fetch ${e} `);
		if (i("    Query result  text" + n.slice(0, 500) + "..."), n.length === 0) throw Error("queryPublicDataByName: No text back from public data query " + e);
		let s = T(n), c = JSON.parse(s);
		if (i("    API Query result JSON" + JSON.stringify(c, null, 4).slice(0, 500) + "..."), c._embedded) return i("      Looks like ESCO"), C(c);
		throw alert("Code me: unrecognized API return format"), Error(`*** Need to add code to parse unrecognized API JSON return\n${JSON.stringify(c, null, 4)}`);
	}
	throw Error("Query source must have either rest API or SPARQL endpoint.");
}
async function D(e, t) {
	if (!t.endpoint) throw Error("Missing queryTarget.endpoint required for queryPublicDataSelect");
	let n = new URL(t.endpoint);
	n.searchParams.append("query", e);
	let a = n.href;
	i(" queryPublicDataSelect uri: " + a);
	let o = new Headers();
	o.append("Accept", "application/json");
	let s = {
		credentials: "omit",
		headers: o
	}, c = (await r.fetcher?.webOperation("GET", a, s))?.responseText || "";
	if (c.length === 0) throw Error("No text back from query " + a);
	let l = T(c), u = JSON.parse(l);
	return i("    Query result JSON" + JSON.stringify(u, null, 4).slice(0, 100) + "..."), u.results.bindings;
}
async function O(e, t, a) {
	if (i("queryPublicDataConstruct: sparql:", e), !a.endpoint) throw Error("Missing queryTarget.endpoint required for queryPublicDataConstruct");
	let o = new URL(a.endpoint);
	o.searchParams.append("query", e);
	let s = o.href;
	i(" queryPublicDataConstruct uri: " + s);
	let c = new Headers();
	c.append("Accept", "text/turtle");
	let l = {
		credentials: "omit",
		headers: c
	}, u = (await r.fetcher?.webOperation("GET", s, l))?.responseText || "No response text?", d = u.length > 500 ? u.slice(0, 200) + " ... " + u.slice(-200) : u;
	if (i("    queryPublicDataConstruct result text:" + d), u.length === 0) throw Error("queryPublicDataConstruct: No text back from construct query:" + s);
	n(u, r, t.uri, "text/turtle");
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
async function A(e, t, n) {
	await O(f.replace(/wd:Q49108/g, n.toNT()), n, v), i("getWikidataDetails: loaded.", n);
}
async function j(e, t, n) {
	S(e, n, await D("select distinct *  where {\n  optional { $(subject)  wdt:P31  ?targetClass } # instance of\n  optional { $(subject)  wdt:P154  ?logo }\n  optional { $(subject)  wdt:P158  ?sealImage }\n# optional { $(subject)  wdt:P159  ?headquartersLocation }\n\noptional { $(subject)  wdt:P17  ?country }\noptional { $(subject)  wdt:P18  ?image }\noptional { $(subject)  wdt:P1813  ?shortName }\n\noptional { $(subject)  wdt:P355  ?subsidiary }\n# SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\" }\n}".replace(u, n.toNT()), v), n.doc());
}
async function M(e, t, n) {
	let r = "select distinct *  where {\n\n  $(subject) wdt:P276 ?location .\n\n  optional { ?location  wdt:P2044  ?elevation }\n  optional { ?location  wdt:P131  ?region }\n  optional { ?location wdt:P625 ?coordinates }\noptional {  ?location  wdt:P17  ?country }\n\n# SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\" }\n}".replace(u, n.toNT());
	i(" location query sparql:" + r);
	let a = await D(r, v);
	i(" location query bindings:", a), S(e, n, a, n.doc());
}
async function N(e, t, n) {
	S(e, n, await D(`select distinct ?city, ?state, ?country, ?homepage, ?logo, ?lat, ?long,  WHERE {
    OPTIONAL { <${n}> <http://dbpedia.org/ontology/city> ?city }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/state> ?state }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/country> ?country }
    OPTIONAL { ${n} foaf:homepage ?homepage }
    OPTIONAL { ${n} foaf:lat ?lat; foaf:long ?long }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/country> ?country }
   }`, h), n.doc()), i("Finished getDbpediaDetails.");
}
export { C as ESCOResultToBindings, x as bindingToTerm, g as dbPediaTypeMap, h as dbpediaParameters, m as escoParameters, p as fetcherOptionsJsonPublicData, N as getDbpediaDetails, A as getWikidataDetails, j as getWikidataDetailsOld, M as getWikidataLocation, f as instituteDetailsWikidataQuery, S as loadFromBindings, k as loadPublicDataThing, l as publicData_exports, w as queryESCODataByName, E as queryPublicDataByName, O as queryPublicDataConstruct, D as queryPublicDataSelect, b as variableNameToPredicateMap, d as wikidataClasses, y as wikidataIncomingClassMap, _ as wikidataOutgoingClassMap, v as wikidataParameters };

//# sourceMappingURL=publicData.esm.js.map