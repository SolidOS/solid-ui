/* Logic to access public data stores
*
* including filtering resut by natural language etc
* See https://solidos.solidcommunity.net/public/2021/01%20Building%20Solid%20Apps%20which%20use%20Public%20Data.html
*/
import { Literal, parse } from 'rdflib';
import { store } from 'solid-logic';
import * as debug from '../../../debug';
import ns from '../../../ns';
import { defaultPreferredLanguages, getPreferredLanguages } from './language';
export const AUTOCOMPLETE_LIMIT = 200; // How many to get from server
// With 3000 we could exceed the wikidata timeout
const subjectRegexp = /\$\(subject\)/g;
// Schema.org seems to suggest NGOs are non-profit and Corporaions are for-profit
// but doesn't have explicit classes
export const wikidataClasses = {
    Corporation: 'http://www.wikidata.org/entity/Q6881511', // Enterprise is for-profit
    EducationalOrganization: 'http://www.wikidata.org/entity/Q178706', // insitution
    GovernmentOrganization: 'http://www.wikidata.org/entity/Q327333', // government agency
    MedicalOrganization: 'http://www.wikidata.org/entity/Q4287745',
    MusicGroup: 'http://www.wikidata.org/entity/Q32178211', // music organization
    NGO: 'http://www.wikidata.org/entity/Q163740', // nonprofit organization @@
    Occupation: 'http://www.wikidata.org/entity/Q28640', // Profession
    // Organization: 'http://www.wikidata.org/entity/Q43229',
    Project: 'http://www.wikidata.org/entity/Q170584',
    ResearchOrganization: 'http://www.wikidata.org/entity/Q31855',
    SportsOrganization: 'http://www.wikidata.org/entity/Q4438121'
};
export const instituteDetailsWikidataQuery = `prefix vcard: <http://www.w3.org/2006/vcard/ns#>
CONSTRUCT
{  wd:Q49108 vcard:fn ?itemLabel.
wd:Q49108 rdf:type ?klass. ?klass rdfs:label ?klassLabel; rdfs:comment ?klassDescription .
wd:Q49108 schema:logo ?logo;
   schema:image ?image;
   schema:logo  ?sealImage;
   schema:subOrganization  ?subsidiary .
      ?subsidiary rdfs:label ?subsidiaryLabel .
 ?supersidiary schema:subOrganization wd:Q49108 .
      ?supersidiary rdfs:label ?supersidiaryLabel .
  wd:Q49108 schema:location ?location .
     ?location  schema:elevation  ?elevation .
     ?location  wdt:P131  ?region .  ?region rdfs:label ?regionLabel .
     ?location wdt:P625 ?coordinates .
     ?location  schema:country  ?country . ?country rdfs:label ?countryLabel .
}
WHERE
{  optional {wd:Q49108 rdfs:label ?itemLabel} .
  optional {wd:Q49108 wdt:P154 ?logo .}
  optional {wd:Q49108 wdt:P31 ?klass .}
  optional {wd:Q49108 wdt:P158  ?sealImage .}
  optional {wd:Q49108 wdt:P18 ?image .}

  optional { wd:Q49108       wdt:P355 ?subsidiary . }
  optional { ?supersidiary   wdt:P355 wd:Q49108. }

  optional { wd:Q49108 wdt:P276 ?location .

    optional { ?location  schema:eleveation  ?elevation }
    optional { ?location  wdt:P131  ?region }
    optional { ?location wdt:P625 ?coordinates }
    optional {  ?location  wdt:P17  ?country }
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "fr,en,de,it". }
}`;
export const fetcherOptionsJsonPublicData = {
    credentials: 'omit', // try to avoid CORS problems. Data is public so no auth
    headers: new Headers({ Accept: 'application/json' })
};
export const escoParameters = {
    label: 'ESCO',
    logo: store.sym('https://ec.europa.eu/esco/portal/static_resource2/images/logo/logo_en.gif'),
    searchByNameURI: 'https://ec.europa.eu/esco/api/search?language=$(language)&type=occupation&text=$(name)'
    // endpoint: undefined
    // returnFormat: 'ESCO',
    // targetClass: {}
};
export const dbpediaParameters = {
    label: 'DBPedia',
    logo: store.sym('https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/DBpediaLogo.svg/263px-DBpediaLogo.svg.png'),
    searchByNameQuery: `select distinct ?subject, ?name where {
    ?subject a $(targetClass); rdfs:label ?name
    FILTER regex(?name, "$(name)", "i")
  } LIMIT $(limit)`,
    endpoint: 'https://dbpedia.org/sparql/'
};
export const dbPediaTypeMap = { AcademicInsitution: 'http://umbel.org/umbel/rc/EducationalOrganization' };
export const wikidataOutgoingClassMap = {
    AcademicInsitution: 'http://www.wikidata.org/entity/Q4671277',
    Enterprise: 'http://www.wikidata.org/entity/Q6881511',
    Business: 'http://www.wikidata.org/entity/Q4830453',
    NGO: 'http://www.wikidata.org/entity/Q79913',
    CharitableOrganization: 'http://www.wikidata.org/entity/Q708676',
    Insitute: 'http://www.wikidata.org/entity/Q1664720'
};
export const wikidataParameters = {
    label: 'WikiData',
    limit: 3000, // Need a high one as very many items, and many languages
    logo: store.sym('https://www.wikimedia.org/static/images/project-logos/wikidatawiki.png'),
    endpoint: 'https://query.wikidata.org/sparql',
    searchByNameQuery: `SELECT ?subject ?name
  WHERE {
    ?klass wdt:P279* $(targetClass) .
    ?subject wdt:P31 ?klass .
    ?subject rdfs:label ?name.
    FILTER regex(?name, "$(name)", "i")
  } LIMIT $(limit) `, // was SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }
    insitituteDetailsQuery: `CONSTRUCT
{  wd:Q49108 schema:name ?itemLabel;
             schema:logo ?logo;
              schema:logo  ?sealImage;
             schema:subOrganization  ?subsidiary .
                 ?subsidiary schema:name ?subsidiaryLabel .
}
WHERE
{
   wd:Q49108 # rdfs:label ?itemLabel ;
             wdt:P154 ?logo;
              wdt:P158  ?sealImage ;
             wdt:P355  ?subsidiary .
          #  ?subsidiary rdfs:label ?subsidiaryLabel .

  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE], fr". }
}`
};
export const wikidataIncomingClassMap = {
    'http://www.wikidata.org/entity/Q15936437': ns.schema('CollegeOrUniversity'), // research university
    'http://www.wikidata.org/entity/Q1664720': ns.schema('EducationalOrganization'), // insitute @@
    'http://www.wikidata.org/entity/Q43229': ns.schema('Organization'), // research university
    'http://www.wikidata.org/entity/Q3918': ns.schema('CollegeOrUniversity'), // university
    'http://www.wikidata.org/entity/Q170584': ns.schema('Project'), // university
    'http://www.wikidata.org/entity/Q327333': ns.schema('GovernmentOrganization'), // govt agency
    'http://www.wikidata.org/entity/Q2221906': ns.schema('Place'), // geographic location
    'http://www.wikidata.org/entity/Q167037': ns.schema('Corporation') // Corporation
};
export const variableNameToPredicateMap = {
    // wikidata:
    targetClass: ns.rdf('type'),
    // logo: ns.schema('logo'),
    sealImage: ns.schema('logo'),
    // image: ns.schema('image'),   defaults to shema
    shortName: ns.foaf('nick'),
    subsidiary: ns.schema('subOrganization'),
    // dbpedia - :
    city: ns.vcard('locality'),
    state: ns.vcard('region'),
    country: ns.vcard('country-name'),
    homepage: ns.foaf('homepage'),
    lat: ns.schema('latitude'),
    long: ns.schema('longitude')
};
export function bindingToTerm(item) {
    const typ = item.type.toLowerCase();
    if (typ === 'uri' || typ === 'iri') {
        return store.sym(item.value);
    }
    else if (typ === 'literal') {
        if (item['xml:lang']) {
            return new Literal(item.value, item['xml:lang']);
        }
        else {
            return new Literal(item.value);
        }
    }
    else {
        throw new Error(`bindingToTerm: Unexpected type "${item.type}" in sparql binding}`);
    }
}
export function loadFromBindings(kb, solidSubject, bindings, doc, predMap = variableNameToPredicateMap) {
    const results = {};
    debug.log(`loadFromBindings:  subject: ${solidSubject}`);
    debug.log(`                       doc: ${doc}`);
    bindings.forEach(binding => {
        for (const key in binding) {
            const result = binding[key];
            const combined = JSON.stringify(result); // ( result.type, result.value )
            results[key] = results[key] || new Set();
            results[key].add(combined); // remove duplicates
        }
    });
    for (const key in results) {
        const values = results[key];
        debug.log(`    results ${key} -> ${values}`);
        values.forEach(combined => {
            const result = JSON.parse(combined);
            const { type, value } = result;
            let obj;
            if (type === 'uri') {
                obj = kb.sym(value);
            }
            else if (type === 'literal') {
                obj = new Literal(value, result.language, result.datatype);
            }
            else {
                throw new Error(`loadFromBindings:  unexpected type: ${type}`);
            }
            if (key === 'type') {
                if (wikidataIncomingClassMap[value]) {
                    obj = wikidataIncomingClassMap[value];
                }
                else {
                    debug.warn('Unmapped Wikidata Class: ' + value);
                }
            }
            else if (key === 'coordinates') {
                // const latlong = value // Like 'Point(-71.106111111 42.375)'
                debug.log('         @@@ hey a point: ' + value);
                // const regexp = /.*\(([-0-9\.-]*) ([-0-9\.-]*)\)/
                const regexp = /.*\(([-0-9.-]*) ([-0-9.-]*)\)/;
                const match = regexp.exec(value);
                if (match) {
                    const float = ns.xsd('float');
                    const latitude = new Literal(match[1], null, float);
                    const longitude = new Literal(match[2], null, float);
                    kb.add(solidSubject, ns.schema('longitude'), longitude, doc);
                    kb.add(solidSubject, ns.schema('latitude'), latitude, doc);
                }
                else {
                    debug.log('Bad coordinates syntax: ' + value);
                }
            }
            else {
                const pred = predMap[key] || ns.schema(key); // fallback to just using schema.org
                kb.add(solidSubject, pred, obj, doc); // @@ deal with non-string and objects
                debug.log(`  public data ${pred} ${obj}.`);
            }
        });
    }
}
/* ESCO sopecific
*/
export function ESCOResultToBindings(json) {
    const results = json._embedded.results; // Array
    const bindings = results.map(result => {
        const name = result.title;
        const uri = result.uri; // like http://data.europa.eu/esco/occupation/57af9090-55b4-4911-b2d0-86db01c00b02
        return { name: { value: name, type: 'literal' }, subject: { type: 'IRI', value: uri } }; // simulate SPARQL bindings
    });
    return bindings;
}
/*  Query all entities of given class and partially matching name
*/
export async function queryESCODataByName(filter, theClass, queryTarget) {
    var _a;
    if (!queryTarget.searchByNameURI)
        throw new Error('Missing queryTarget.searchByNameURI on queryESCODataByName');
    const limit = queryTarget.limit || AUTOCOMPLETE_LIMIT;
    const queryURI = queryTarget.searchByNameURI
        .replace('$(name)', filter)
        .replace('$(limit)', '' + limit)
        .replace('$(targetClass)', theClass.toNT());
    debug.log('Querying ESCO data - uri: ' + queryURI);
    const response = await ((_a = store.fetcher) === null || _a === void 0 ? void 0 : _a.webOperation('GET', queryURI, fetcherOptionsJsonPublicData));
    const text = (response === null || response === void 0 ? void 0 : response.responseText) || '';
    debug.log('    Query result  text' + text.slice(0, 500) + '...');
    if (text.length === 0)
        throw new Error('Wot no text back from ESCO query ' + queryURI);
    const json = JSON.parse(text);
    // console.log('Whole JSON return object', json)
    debug.log('    ESCO Query result JSON' + JSON.stringify(json, null, 4).slice(0, 500) + '...');
    return ESCOResultToBindings(json);
}
/* Cope ithe syntax probelm in wikidata timeout responses
*
* Wikidata bug: https://phabricator.wikimedia.org/T283962
* This will not be needed whn that  WDQS bug fixed.
* This is aptured in https://github.com/solidos/solid-ui/issues/403
*/
function fixWikidataJSON(str) {
    const syntaxProblem = str.indexOf('SPARQL-QUERY');
    if (syntaxProblem < 0)
        return str;
    // console.log('@@ fixWikidataJSON FIXING')
    debug.warn('  ### Fixing JSON with wikidata error code injection ' + str.slice(syntaxProblem, syntaxProblem + 200));
    const goodness = str.lastIndexOf('}, {');
    return str.slice(0, goodness) + ' } ] } } '; // Close binding, array, bindings, results, root object
}
/*  Query all entities of given class and partially matching name
*/
export async function queryPublicDataByName(filter, theClass, languages, queryTarget) {
    var _a;
    function substituteStrings(template) {
        const limit = queryTarget.limit || AUTOCOMPLETE_LIMIT;
        const u1 = template.replace('$(name)', filter)
            .replace('$(limit)', '' + limit)
            .replace('$(language)', language);
        return u1.replace('$(targetClass)', theClass.toNT());
    }
    if (!theClass) {
        throw new Error('queryPublicDataByName: No class provided');
    }
    const languagePrefs = await getPreferredLanguages() || defaultPreferredLanguages;
    const language = languagePrefs[0] || 'en';
    if (queryTarget.searchByNameQuery) {
        const sparql = substituteStrings(queryTarget.searchByNameQuery);
        debug.log('Querying public data - sparql: ' + sparql);
        return queryPublicDataSelect(sparql, queryTarget);
    }
    else if (queryTarget.searchByNameURI) { // not sparql - random API
        const queryURI = substituteStrings(queryTarget.searchByNameURI);
        let response;
        try {
            response = await ((_a = store.fetcher) === null || _a === void 0 ? void 0 : _a.webOperation('GET', queryURI, fetcherOptionsJsonPublicData));
        }
        catch (err) {
            throw new Error(`Exception when trying to fetch ${queryURI} \n ${err}`);
        }
        const text = response.responseText || ''; // ts
        if (response.status !== 200) {
            throw new Error(`HTTP error status ${response.status} trying to fetch ${queryURI} `);
        }
        debug.log('    Query result  text' + text.slice(0, 500) + '...');
        if (text.length === 0)
            throw new Error('queryPublicDataByName: No text back from public data query ' + queryURI);
        const text2 = fixWikidataJSON(text); // Kludge: strip of interrupting error message
        const json = JSON.parse(text2);
        debug.log('    API Query result JSON' + JSON.stringify(json, null, 4).slice(0, 500) + '...');
        if (json._embedded) {
            debug.log('      Looks like ESCO');
            const bindings = ESCOResultToBindings(json);
            return bindings;
        }
        else {
            alert('Code me: unrecognized API return format');
            throw new Error(`*** Need to add code to parse unrecognized API JSON return\n${JSON.stringify(json, null, 4)}`);
        }
    }
    else {
        throw new Error('Query source must have either rest API or SPARQL endpoint.');
    }
}
/* Query a database using SPARQL SELECT
*/
export async function queryPublicDataSelect(sparql, queryTarget) {
    var _a;
    if (!queryTarget.endpoint)
        throw new Error('Missing queryTarget.endpoint required for queryPublicDataSelect');
    const myUrlWithParams = new URL(queryTarget.endpoint);
    myUrlWithParams.searchParams.append('query', sparql);
    const queryURI = myUrlWithParams.href;
    debug.log(' queryPublicDataSelect uri: ' + queryURI);
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    const options = {
        credentials: 'omit', // CORS - as we know it is public
        headers
    };
    const response = await ((_a = store.fetcher) === null || _a === void 0 ? void 0 : _a.webOperation('GET', queryURI, options));
    const text = (response === null || response === void 0 ? void 0 : response.responseText) || '';
    if (text.length === 0)
        throw new Error('No text back from query ' + queryURI);
    const text2 = fixWikidataJSON(text);
    const json = JSON.parse(text2);
    debug.log('    Query result JSON' + JSON.stringify(json, null, 4).slice(0, 100) + '...');
    const bindings = json.results.bindings;
    return bindings;
}
/* Load from a database using SPARQL CONSTRUCT
*/
export async function queryPublicDataConstruct(sparql, pubicId, queryTarget) {
    var _a;
    debug.log('queryPublicDataConstruct: sparql:', sparql);
    if (!queryTarget.endpoint)
        throw new Error('Missing queryTarget.endpoint required for queryPublicDataConstruct');
    const myUrlWithParams = new URL(queryTarget.endpoint);
    myUrlWithParams.searchParams.append('query', sparql);
    const queryURI = myUrlWithParams.href;
    debug.log(' queryPublicDataConstruct uri: ' + queryURI);
    const headers = new Headers();
    headers.append('Accept', 'text/turtle');
    const options = {
        credentials: 'omit', // CORS // @tsc pain
        headers // ({ Accept: 'text/turtle' } as Headers)
    };
    const response = await ((_a = store.fetcher) === null || _a === void 0 ? void 0 : _a.webOperation('GET', queryURI, options));
    const text = (response === null || response === void 0 ? void 0 : response.responseText) || 'No response text?';
    const report = text.length > 500 ? text.slice(0, 200) + ' ... ' + text.slice(-200) : text;
    debug.log('    queryPublicDataConstruct result text:' + report);
    if (text.length === 0)
        throw new Error('queryPublicDataConstruct: No text back from construct query:' + queryURI);
    parse(text, store, pubicId.uri, 'text/turtle');
}
export async function loadPublicDataThing(kb, subject, publicDataID) {
    if (publicDataID.uri.startsWith('https://dbpedia.org/resource/')) {
        return getDbpediaDetails(kb, subject, publicDataID);
    }
    else if (publicDataID.uri.match(/^https?:\/\/www\.wikidata\.org\/entity\/.*/)) {
        // const QId = publicDataID.uri.split('/')[4]
        // const dataURI = `http://www.wikidata.org/wiki/Special:EntityData/${QId}.ttl`
        // In fact loading the data URI gives much too much irrelevant data, from wikidata, so we do a query.
        await getWikidataDetails(kb, subject, publicDataID);
        // await getWikidataLocation(kb, subject, publicDataID)  -- should get that in the details query now
    }
    else {
        const iDToFetch = publicDataID.uri.startsWith('http:')
            ? kb.sym('https:' + publicDataID.uri.slice(5))
            : publicDataID;
        const headers = new Headers();
        headers.append('Accept', 'text/turtle');
        return kb.fetcher.load(iDToFetch, {
            credentials: 'omit',
            headers
        });
    }
}
export async function getWikidataDetails(kb, solidSubject, publicDataID) {
    const subjRegexp = /wd:Q49108/g;
    const sparql = instituteDetailsWikidataQuery.replace(subjRegexp, publicDataID.toNT());
    await queryPublicDataConstruct(sparql, publicDataID, wikidataParameters);
    debug.log('getWikidataDetails: loaded.', publicDataID);
}
export async function getWikidataDetailsOld(kb, solidSubject, publicDataID) {
    const sparql = `select distinct *  where {
  optional { $(subject)  wdt:P31  ?targetClass } # instance of
  optional { $(subject)  wdt:P154  ?logo }
  optional { $(subject)  wdt:P158  ?sealImage }
# optional { $(subject)  wdt:P159  ?headquartersLocation }

optional { $(subject)  wdt:P17  ?country }
optional { $(subject)  wdt:P18  ?image }
optional { $(subject)  wdt:P1813  ?shortName }

optional { $(subject)  wdt:P355  ?subsidiary }
# SERVICE wikibase:label { bd:serviceParam wikibase:language "fr,en,de,it" }
}`
        .replace(subjectRegexp, publicDataID.toNT());
    const bindings = await queryPublicDataSelect(sparql, wikidataParameters);
    loadFromBindings(kb, publicDataID, bindings, publicDataID.doc()); // arg2 was solidSubject
}
export async function getWikidataLocation(kb, solidSubject, publicDataID) {
    const sparql = `select distinct *  where {

  $(subject) wdt:P276 ?location .

  optional { ?location  wdt:P2044  ?elevation }
  optional { ?location  wdt:P131  ?region }
  optional { ?location wdt:P625 ?coordinates }
optional {  ?location  wdt:P17  ?country }

# SERVICE wikibase:label { bd:serviceParam wikibase:language "fr,en,de,it" }
}`.replace(subjectRegexp, publicDataID.toNT());
    debug.log(' location query sparql:' + sparql);
    const bindings = await queryPublicDataSelect(sparql, wikidataParameters);
    debug.log(' location query bindings:', bindings);
    loadFromBindings(kb, publicDataID, bindings, publicDataID.doc()); // was solidSubject
}
export async function getDbpediaDetails(kb, solidSubject, publicDataID) {
    // Note below the string form of the named node with <> works in SPARQL
    const sparql = `select distinct ?city, ?state, ?country, ?homepage, ?logo, ?lat, ?long,  WHERE {
    OPTIONAL { <${publicDataID}> <http://dbpedia.org/ontology/city> ?city }
    OPTIONAL { ${publicDataID} <http://dbpedia.org/ontology/state> ?state }
    OPTIONAL { ${publicDataID} <http://dbpedia.org/ontology/country> ?country }
    OPTIONAL { ${publicDataID} foaf:homepage ?homepage }
    OPTIONAL { ${publicDataID} foaf:lat ?lat; foaf:long ?long }
    OPTIONAL { ${publicDataID} <http://dbpedia.org/ontology/country> ?country }
   }`;
    const bindings = await queryPublicDataSelect(sparql, dbpediaParameters);
    loadFromBindings(kb, publicDataID, bindings, publicDataID.doc());
    debug.log('Finished getDbpediaDetails.');
}
//# sourceMappingURL=publicData.js.map