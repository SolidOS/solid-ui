const e=require("../../../_virtual/_rolldown/runtime.cjs.js"),t=require("../../../lib/ns.cjs.js"),n=require("../../../lib/debug.cjs.js"),r=require("./language.cjs.js");let i=require("rdflib"),a=require("solid-logic");var o=e.__exportAll({AUTOCOMPLETE_LIMIT:()=>200,ESCOResultToBindings:()=>b,bindingToTerm:()=>v,dbPediaTypeMap:()=>p,dbpediaParameters:()=>f,escoParameters:()=>d,fetcherOptionsJsonPublicData:()=>u,getDbpediaDetails:()=>A,getWikidataDetails:()=>D,getWikidataDetailsOld:()=>O,getWikidataLocation:()=>k,instituteDetailsWikidataQuery:()=>l,loadFromBindings:()=>y,loadPublicDataThing:()=>E,queryESCODataByName:()=>x,queryPublicDataByName:()=>C,queryPublicDataConstruct:()=>T,queryPublicDataSelect:()=>w,variableNameToPredicateMap:()=>_,wikidataClasses:()=>c,wikidataIncomingClassMap:()=>g,wikidataOutgoingClassMap:()=>m,wikidataParameters:()=>h}),s=/\$\(subject\)/g,c={Corporation:`http://www.wikidata.org/entity/Q6881511`,EducationalOrganization:`http://www.wikidata.org/entity/Q178706`,GovernmentOrganization:`http://www.wikidata.org/entity/Q327333`,MedicalOrganization:`http://www.wikidata.org/entity/Q4287745`,MusicGroup:`http://www.wikidata.org/entity/Q32178211`,NGO:`http://www.wikidata.org/entity/Q163740`,Occupation:`http://www.wikidata.org/entity/Q28640`,Project:`http://www.wikidata.org/entity/Q170584`,ResearchOrganization:`http://www.wikidata.org/entity/Q31855`,SportsOrganization:`http://www.wikidata.org/entity/Q4438121`},l=`prefix vcard: <http://www.w3.org/2006/vcard/ns#>
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
}`,u={credentials:`omit`,headers:new Headers({Accept:`application/json`})},d={label:`ESCO`,logo:a.store.sym(`https://ec.europa.eu/esco/portal/static_resource2/images/logo/logo_en.gif`),searchByNameURI:`https://ec.europa.eu/esco/api/search?language=$(language)&type=occupation&text=$(name)`},f={label:`DBPedia`,logo:a.store.sym(`https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/DBpediaLogo.svg/263px-DBpediaLogo.svg.png`),searchByNameQuery:`select distinct ?subject, ?name where {
    ?subject a $(targetClass); rdfs:label ?name
    FILTER regex(?name, "$(name)", "i")
  } LIMIT $(limit)`,endpoint:`https://dbpedia.org/sparql/`},p={AcademicInsitution:`http://umbel.org/umbel/rc/EducationalOrganization`},m={AcademicInsitution:`http://www.wikidata.org/entity/Q4671277`,Enterprise:`http://www.wikidata.org/entity/Q6881511`,Business:`http://www.wikidata.org/entity/Q4830453`,NGO:`http://www.wikidata.org/entity/Q79913`,CharitableOrganization:`http://www.wikidata.org/entity/Q708676`,Insitute:`http://www.wikidata.org/entity/Q1664720`},h={label:`WikiData`,limit:3e3,logo:a.store.sym(`https://www.wikimedia.org/static/images/project-logos/wikidatawiki.png`),endpoint:`https://query.wikidata.org/sparql`,searchByNameQuery:`SELECT ?subject ?name
  WHERE {
    ?klass wdt:P279* $(targetClass) .
    ?subject wdt:P31 ?klass .
    ?subject rdfs:label ?name.
    FILTER regex(?name, "$(name)", "i")
  } LIMIT $(limit) `,insitituteDetailsQuery:`CONSTRUCT
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
}`},g={"http://www.wikidata.org/entity/Q15936437":t.default.schema(`CollegeOrUniversity`),"http://www.wikidata.org/entity/Q1664720":t.default.schema(`EducationalOrganization`),"http://www.wikidata.org/entity/Q43229":t.default.schema(`Organization`),"http://www.wikidata.org/entity/Q3918":t.default.schema(`CollegeOrUniversity`),"http://www.wikidata.org/entity/Q170584":t.default.schema(`Project`),"http://www.wikidata.org/entity/Q327333":t.default.schema(`GovernmentOrganization`),"http://www.wikidata.org/entity/Q2221906":t.default.schema(`Place`),"http://www.wikidata.org/entity/Q167037":t.default.schema(`Corporation`)},_={targetClass:t.default.rdf(`type`),sealImage:t.default.schema(`logo`),shortName:t.default.foaf(`nick`),subsidiary:t.default.schema(`subOrganization`),city:t.default.vcard(`locality`),state:t.default.vcard(`region`),country:t.default.vcard(`country-name`),homepage:t.default.foaf(`homepage`),lat:t.default.schema(`latitude`),long:t.default.schema(`longitude`)};function v(e){let t=e.type.toLowerCase();if(t===`uri`||t===`iri`)return a.store.sym(e.value);if(t===`literal`)return e[`xml:lang`]?new i.Literal(e.value,e[`xml:lang`]):new i.Literal(e.value);throw Error(`bindingToTerm: Unexpected type "${e.type}" in sparql binding}`)}function y(e,r,a,o,s=_){let c={};n.log(`loadFromBindings:  subject: ${r}`),n.log(`                       doc: ${o}`),a.forEach(e=>{for(let t in e){let n=e[t],r=JSON.stringify(n);c[t]=c[t]||new Set,c[t].add(r)}});for(let a in c){let l=c[a];n.log(`    results ${a} -> ${l}`),l.forEach(c=>{let l=JSON.parse(c),{type:u,value:d}=l,f;if(u===`uri`)f=e.sym(d);else if(u===`literal`)f=new i.Literal(d,l.language,l.datatype);else throw Error(`loadFromBindings:  unexpected type: ${u}`);if(a===`type`)g[d]?f=g[d]:n.warn(`Unmapped Wikidata Class: `+d);else if(a===`coordinates`){n.log(`         @@@ hey a point: `+d);let a=/.*\(([-0-9.-]*) ([-0-9.-]*)\)/.exec(d);if(a){let n=t.default.xsd(`float`),s=new i.Literal(a[1],null,n),c=new i.Literal(a[2],null,n);e.add(r,t.default.schema(`longitude`),c,o),e.add(r,t.default.schema(`latitude`),s,o)}else n.log(`Bad coordinates syntax: `+d)}else{let i=s[a]||t.default.schema(a);e.add(r,i,f,o),n.log(`  public data ${i} ${f}.`)}})}}function b(e){return e._embedded.results.map(e=>{let t=e.title,n=e.uri;return{name:{value:t,type:`literal`},subject:{type:`IRI`,value:n}}})}async function x(e,t,r){if(!r.searchByNameURI)throw Error(`Missing queryTarget.searchByNameURI on queryESCODataByName`);let i=r.limit||200,o=r.searchByNameURI.replace(`$(name)`,e).replace(`$(limit)`,``+i).replace(`$(targetClass)`,t.toNT());n.log(`Querying ESCO data - uri: `+o);let s=(await a.store.fetcher?.webOperation(`GET`,o,u))?.responseText||``;if(n.log(`    Query result  text`+s.slice(0,500)+`...`),s.length===0)throw Error(`Wot no text back from ESCO query `+o);let c=JSON.parse(s);return n.log(`    ESCO Query result JSON`+JSON.stringify(c,null,4).slice(0,500)+`...`),b(c)}function S(e){let t=e.indexOf(`SPARQL-QUERY`);if(t<0)return e;n.warn(`  ### Fixing JSON with wikidata error code injection `+e.slice(t,t+200));let r=e.lastIndexOf(`}, {`);return e.slice(0,r)+` } ] } } `}async function C(e,t,i,o){function s(n){let r=o.limit||200;return n.replace(`$(name)`,e).replace(`$(limit)`,``+r).replace(`$(language)`,c).replace(`$(targetClass)`,t.toNT())}if(!t)throw Error(`queryPublicDataByName: No class provided`);let c=(await r.getPreferredLanguages()||r.defaultPreferredLanguages)[0]||`en`;if(o.searchByNameQuery){let e=s(o.searchByNameQuery);return n.log(`Querying public data - sparql: `+e),w(e,o)}if(o.searchByNameURI){let e=s(o.searchByNameURI),t;try{t=await a.store.fetcher?.webOperation(`GET`,e,u)}catch(t){throw Error(`Exception when trying to fetch ${e} \n ${t}`)}let r=t.responseText||``;if(t.status!==200)throw Error(`HTTP error status ${t.status} trying to fetch ${e} `);if(n.log(`    Query result  text`+r.slice(0,500)+`...`),r.length===0)throw Error(`queryPublicDataByName: No text back from public data query `+e);let i=S(r),c=JSON.parse(i);if(n.log(`    API Query result JSON`+JSON.stringify(c,null,4).slice(0,500)+`...`),c._embedded)return n.log(`      Looks like ESCO`),b(c);throw alert(`Code me: unrecognized API return format`),Error(`*** Need to add code to parse unrecognized API JSON return\n${JSON.stringify(c,null,4)}`)}throw Error(`Query source must have either rest API or SPARQL endpoint.`)}async function w(e,t){if(!t.endpoint)throw Error(`Missing queryTarget.endpoint required for queryPublicDataSelect`);let r=new URL(t.endpoint);r.searchParams.append(`query`,e);let i=r.href;n.log(` queryPublicDataSelect uri: `+i);let o=new Headers;o.append(`Accept`,`application/json`);let s={credentials:`omit`,headers:o},c=(await a.store.fetcher?.webOperation(`GET`,i,s))?.responseText||``;if(c.length===0)throw Error(`No text back from query `+i);let l=S(c),u=JSON.parse(l);return n.log(`    Query result JSON`+JSON.stringify(u,null,4).slice(0,100)+`...`),u.results.bindings}async function T(e,t,r){if(n.log(`queryPublicDataConstruct: sparql:`,e),!r.endpoint)throw Error(`Missing queryTarget.endpoint required for queryPublicDataConstruct`);let o=new URL(r.endpoint);o.searchParams.append(`query`,e);let s=o.href;n.log(` queryPublicDataConstruct uri: `+s);let c=new Headers;c.append(`Accept`,`text/turtle`);let l={credentials:`omit`,headers:c},u=(await a.store.fetcher?.webOperation(`GET`,s,l))?.responseText||`No response text?`,d=u.length>500?u.slice(0,200)+` ... `+u.slice(-200):u;if(n.log(`    queryPublicDataConstruct result text:`+d),u.length===0)throw Error(`queryPublicDataConstruct: No text back from construct query:`+s);(0,i.parse)(u,a.store,t.uri,`text/turtle`)}async function E(e,t,n){if(n.uri.startsWith(`https://dbpedia.org/resource/`))return A(e,t,n);if(n.uri.match(/^https?:\/\/www\.wikidata\.org\/entity\/.*/))await D(e,t,n);else{let t=n.uri.startsWith(`http:`)?e.sym(`https:`+n.uri.slice(5)):n,r=new Headers;return r.append(`Accept`,`text/turtle`),e.fetcher.load(t,{credentials:`omit`,headers:r})}}async function D(e,t,r){await T(l.replace(/wd:Q49108/g,r.toNT()),r,h),n.log(`getWikidataDetails: loaded.`,r)}async function O(e,t,n){y(e,n,await w(`select distinct *  where {
  optional { $(subject)  wdt:P31  ?targetClass } # instance of
  optional { $(subject)  wdt:P154  ?logo }
  optional { $(subject)  wdt:P158  ?sealImage }
# optional { $(subject)  wdt:P159  ?headquartersLocation }

optional { $(subject)  wdt:P17  ?country }
optional { $(subject)  wdt:P18  ?image }
optional { $(subject)  wdt:P1813  ?shortName }

optional { $(subject)  wdt:P355  ?subsidiary }
# SERVICE wikibase:label { bd:serviceParam wikibase:language "fr,en,de,it" }
}`.replace(s,n.toNT()),h),n.doc())}async function k(e,t,r){let i=`select distinct *  where {

  $(subject) wdt:P276 ?location .

  optional { ?location  wdt:P2044  ?elevation }
  optional { ?location  wdt:P131  ?region }
  optional { ?location wdt:P625 ?coordinates }
optional {  ?location  wdt:P17  ?country }

# SERVICE wikibase:label { bd:serviceParam wikibase:language "fr,en,de,it" }
}`.replace(s,r.toNT());n.log(` location query sparql:`+i);let a=await w(i,h);n.log(` location query bindings:`,a),y(e,r,a,r.doc())}async function A(e,t,r){y(e,r,await w(`select distinct ?city, ?state, ?country, ?homepage, ?logo, ?lat, ?long,  WHERE {
    OPTIONAL { <${r}> <http://dbpedia.org/ontology/city> ?city }
    OPTIONAL { ${r} <http://dbpedia.org/ontology/state> ?state }
    OPTIONAL { ${r} <http://dbpedia.org/ontology/country> ?country }
    OPTIONAL { ${r} foaf:homepage ?homepage }
    OPTIONAL { ${r} foaf:lat ?lat; foaf:long ?long }
    OPTIONAL { ${r} <http://dbpedia.org/ontology/country> ?country }
   }`,f),r.doc()),n.log(`Finished getDbpediaDetails.`)}exports.ESCOResultToBindings=b,exports.bindingToTerm=v,exports.dbPediaTypeMap=p,exports.dbpediaParameters=f,exports.escoParameters=d,exports.fetcherOptionsJsonPublicData=u,exports.getDbpediaDetails=A,exports.getWikidataDetails=D,exports.getWikidataDetailsOld=O,exports.getWikidataLocation=k,exports.instituteDetailsWikidataQuery=l,exports.loadFromBindings=y,exports.loadPublicDataThing=E,Object.defineProperty(exports,"publicData_exports",{enumerable:!0,get:function(){return o}}),exports.queryESCODataByName=x,exports.queryPublicDataByName=C,exports.queryPublicDataConstruct=T,exports.queryPublicDataSelect=w,exports.variableNameToPredicateMap=_,exports.wikidataClasses=c,exports.wikidataIncomingClassMap=g,exports.wikidataOutgoingClassMap=m,exports.wikidataParameters=h;
//# sourceMappingURL=publicData.cjs.js.map