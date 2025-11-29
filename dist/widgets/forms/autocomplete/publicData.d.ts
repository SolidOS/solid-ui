import { Literal, NamedNode } from 'rdflib';
export declare const AUTOCOMPLETE_LIMIT = 200;
interface Term {
    type: string;
    value: string;
}
export interface Binding {
    subject: Term;
    name?: Term;
    location?: Term;
    coordinates?: Term;
}
type Bindings = Binding[];
export type QueryParameters = {
    label: string;
    limit?: number;
    logo?: NamedNode;
    searchByNameQuery?: string;
    searchByNameURI?: string;
    insitituteDetailsQuery?: string;
    endpoint?: string;
    objectURIBase?: NamedNode;
    targetClass?: NamedNode;
};
export declare const wikidataClasses: {
    Corporation: string;
    EducationalOrganization: string;
    GovernmentOrganization: string;
    MedicalOrganization: string;
    MusicGroup: string;
    NGO: string;
    Occupation: string;
    Project: string;
    ResearchOrganization: string;
    SportsOrganization: string;
};
export declare const instituteDetailsWikidataQuery = "prefix vcard: <http://www.w3.org/2006/vcard/ns#>\nCONSTRUCT\n{  wd:Q49108 vcard:fn ?itemLabel.\nwd:Q49108 rdf:type ?klass. ?klass rdfs:label ?klassLabel; rdfs:comment ?klassDescription .\nwd:Q49108 schema:logo ?logo;\n   schema:image ?image;\n   schema:logo  ?sealImage;\n   schema:subOrganization  ?subsidiary .\n      ?subsidiary rdfs:label ?subsidiaryLabel .\n ?supersidiary schema:subOrganization wd:Q49108 .\n      ?supersidiary rdfs:label ?supersidiaryLabel .\n  wd:Q49108 schema:location ?location .\n     ?location  schema:elevation  ?elevation .\n     ?location  wdt:P131  ?region .  ?region rdfs:label ?regionLabel .\n     ?location wdt:P625 ?coordinates .\n     ?location  schema:country  ?country . ?country rdfs:label ?countryLabel .\n}\nWHERE\n{  optional {wd:Q49108 rdfs:label ?itemLabel} .\n  optional {wd:Q49108 wdt:P154 ?logo .}\n  optional {wd:Q49108 wdt:P31 ?klass .}\n  optional {wd:Q49108 wdt:P158  ?sealImage .}\n  optional {wd:Q49108 wdt:P18 ?image .}\n\n  optional { wd:Q49108       wdt:P355 ?subsidiary . }\n  optional { ?supersidiary   wdt:P355 wd:Q49108. }\n\n  optional { wd:Q49108 wdt:P276 ?location .\n\n    optional { ?location  schema:eleveation  ?elevation }\n    optional { ?location  wdt:P131  ?region }\n    optional { ?location wdt:P625 ?coordinates }\n    optional {  ?location  wdt:P17  ?country }\n  }\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\". }\n}";
export declare const fetcherOptionsJsonPublicData: {
    credentials: "include" | "omit" | undefined;
    headers: Headers;
};
export declare const escoParameters: QueryParameters;
export declare const dbpediaParameters: QueryParameters;
export declare const dbPediaTypeMap: {
    AcademicInsitution: string;
};
export declare const wikidataOutgoingClassMap: {
    AcademicInsitution: string;
    Enterprise: string;
    Business: string;
    NGO: string;
    CharitableOrganization: string;
    Insitute: string;
};
export declare const wikidataParameters: {
    label: string;
    limit: number;
    logo: NamedNode;
    endpoint: string;
    searchByNameQuery: string;
    insitituteDetailsQuery: string;
};
export declare const wikidataIncomingClassMap: {
    'http://www.wikidata.org/entity/Q15936437': any;
    'http://www.wikidata.org/entity/Q1664720': any;
    'http://www.wikidata.org/entity/Q43229': any;
    'http://www.wikidata.org/entity/Q3918': any;
    'http://www.wikidata.org/entity/Q170584': any;
    'http://www.wikidata.org/entity/Q327333': any;
    'http://www.wikidata.org/entity/Q2221906': any;
    'http://www.wikidata.org/entity/Q167037': any;
};
export declare const variableNameToPredicateMap: {
    targetClass: any;
    sealImage: any;
    shortName: any;
    subsidiary: any;
    city: any;
    state: any;
    country: any;
    homepage: any;
    lat: any;
    long: any;
};
export declare function bindingToTerm(item: any): NamedNode | Literal;
export declare function loadFromBindings(kb: any, solidSubject: NamedNode, bindings: any, doc: any, predMap?: {
    targetClass: any;
    sealImage: any;
    shortName: any;
    subsidiary: any;
    city: any;
    state: any;
    country: any;
    homepage: any;
    lat: any;
    long: any;
}): void;
export declare function ESCOResultToBindings(json: Object): Bindings;
export declare function queryESCODataByName(filter: string, theClass: NamedNode, queryTarget: QueryParameters): Promise<Bindings>;
export declare function queryPublicDataByName(filter: string, theClass: NamedNode, languages: Array<string>, queryTarget: QueryParameters): Promise<Bindings>;
export declare function queryPublicDataSelect(sparql: string, queryTarget: QueryParameters): Promise<Bindings>;
export declare function queryPublicDataConstruct(sparql: string, pubicId: NamedNode, queryTarget: QueryParameters): Promise<void>;
export declare function loadPublicDataThing(kb: any, subject: NamedNode, publicDataID: NamedNode): Promise<any>;
export declare function getWikidataDetails(kb: any, solidSubject: NamedNode, publicDataID: NamedNode): Promise<void>;
export declare function getWikidataDetailsOld(kb: any, solidSubject: NamedNode, publicDataID: NamedNode): Promise<void>;
export declare function getWikidataLocation(kb: any, solidSubject: NamedNode, publicDataID: NamedNode): Promise<void>;
export declare function getDbpediaDetails(kb: any, solidSubject: NamedNode, publicDataID: NamedNode): Promise<void>;
export {};
//# sourceMappingURL=publicData.d.ts.map