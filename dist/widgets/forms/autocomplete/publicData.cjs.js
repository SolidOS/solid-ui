const e=require("../../../_virtual/_rolldown/runtime.cjs.js");let t=require("rdflib"),n=require("solid-logic");const r=require("../../../lib/debug.cjs.js"),i=require("../../../lib/ns.cjs.js"),a=require("./language.cjs.js");var o=e.__exportAll({AUTOCOMPLETE_LIMIT:()=>200,ESCOResultToBindings:()=>b,bindingToTerm:()=>v,dbPediaTypeMap:()=>p,dbpediaParameters:()=>f,escoParameters:()=>d,fetcherOptionsJsonPublicData:()=>u,getDbpediaDetails:()=>A,getWikidataDetails:()=>D,getWikidataDetailsOld:()=>O,getWikidataLocation:()=>k,instituteDetailsWikidataQuery:()=>l,loadFromBindings:()=>y,loadPublicDataThing:()=>E,queryESCODataByName:()=>x,queryPublicDataByName:()=>C,queryPublicDataConstruct:()=>T,queryPublicDataSelect:()=>w,variableNameToPredicateMap:()=>_,wikidataClasses:()=>c,wikidataIncomingClassMap:()=>g,wikidataOutgoingClassMap:()=>m,wikidataParameters:()=>h}),s=/\$\(subject\)/g,c={Corporation:`http://www.wikidata.org/entity/Q6881511`,EducationalOrganization:`http://www.wikidata.org/entity/Q178706`,GovernmentOrganization:`http://www.wikidata.org/entity/Q327333`,MedicalOrganization:`http://www.wikidata.org/entity/Q4287745`,MusicGroup:`http://www.wikidata.org/entity/Q32178211`,NGO:`http://www.wikidata.org/entity/Q163740`,Occupation:`http://www.wikidata.org/entity/Q28640`,Project:`http://www.wikidata.org/entity/Q170584`,ResearchOrganization:`http://www.wikidata.org/entity/Q31855`,SportsOrganization:`http://www.wikidata.org/entity/Q4438121`},l=`prefix vcard: <http://www.w3.org/2006/vcard/ns#>
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
}`,u={credentials:`omit`,headers:new Headers({Accept:`application/json`})},d={label:`ESCO`,logo:n.store.sym(`https://ec.europa.eu/esco/portal/static_resource2/images/logo/logo_en.gif`),searchByNameURI:`https://ec.europa.eu/esco/api/search?language=$(language)&type=occupation&text=$(name)`},f={label:`DBPedia`,logo:n.store.sym(`https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/DBpediaLogo.svg/263px-DBpediaLogo.svg.png`),searchByNameQuery:`select distinct ?subject, ?name where {
    ?subject a $(targetClass); rdfs:label ?name
    FILTER regex(?name, "$(name)", "i")
  } LIMIT $(limit)`,endpoint:`https://dbpedia.org/sparql/`},p={AcademicInsitution:`http://umbel.org/umbel/rc/EducationalOrganization`},m={AcademicInsitution:`http://www.wikidata.org/entity/Q4671277`,Enterprise:`http://www.wikidata.org/entity/Q6881511`,Business:`http://www.wikidata.org/entity/Q4830453`,NGO:`http://www.wikidata.org/entity/Q79913`,CharitableOrganization:`http://www.wikidata.org/entity/Q708676`,Insitute:`http://www.wikidata.org/entity/Q1664720`},h={label:`WikiData`,limit:3e3,logo:n.store.sym(`https://www.wikimedia.org/static/images/project-logos/wikidatawiki.png`),endpoint:`https://query.wikidata.org/sparql`,searchByNameQuery:`SELECT ?subject ?name
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
}`},g={"http://www.wikidata.org/entity/Q15936437":i.schema(`CollegeOrUniversity`),"http://www.wikidata.org/entity/Q1664720":i.schema(`EducationalOrganization`),"http://www.wikidata.org/entity/Q43229":i.schema(`Organization`),"http://www.wikidata.org/entity/Q3918":i.schema(`CollegeOrUniversity`),"http://www.wikidata.org/entity/Q170584":i.schema(`Project`),"http://www.wikidata.org/entity/Q327333":i.schema(`GovernmentOrganization`),"http://www.wikidata.org/entity/Q2221906":i.schema(`Place`),"http://www.wikidata.org/entity/Q167037":i.schema(`Corporation`)},_={targetClass:i.rdf(`type`),sealImage:i.schema(`logo`),shortName:i.foaf(`nick`),subsidiary:i.schema(`subOrganization`),city:i.vcard(`locality`),state:i.vcard(`region`),country:i.vcard(`country-name`),homepage:i.foaf(`homepage`),lat:i.schema(`latitude`),long:i.schema(`longitude`)};function v(e){let r=e.type.toLowerCase();if(r===`uri`||r===`iri`)return n.store.sym(e.value);if(r===`literal`)return e[`xml:lang`]?new t.Literal(e.value,e[`xml:lang`]):new t.Literal(e.value);throw Error(`bindingToTerm: Unexpected type "${e.type}" in sparql binding}`)}function y(e,n,a,o,s=_){let c={};r.log(`loadFromBindings:  subject: ${n}`),r.log(`                       doc: ${o}`),a.forEach(e=>{for(let t in e){let n=e[t],r=JSON.stringify(n);c[t]=c[t]||new Set,c[t].add(r)}});for(let a in c){let l=c[a];r.log(`    results ${a} -> ${l}`),l.forEach(c=>{let l=JSON.parse(c),{type:u,value:d}=l,f;if(u===`uri`)f=e.sym(d);else if(u===`literal`)f=new t.Literal(d,l.language,l.datatype);else throw Error(`loadFromBindings:  unexpected type: ${u}`);if(a===`type`)g[d]?f=g[d]:r.warn(`Unmapped Wikidata Class: `+d);else if(a===`coordinates`){r.log(`         @@@ hey a point: `+d);let a=/.*\(([-0-9.-]*) ([-0-9.-]*)\)/.exec(d);if(a){let r=i.xsd(`float`),s=new t.Literal(a[1],null,r),c=new t.Literal(a[2],null,r);e.add(n,i.schema(`longitude`),c,o),e.add(n,i.schema(`latitude`),s,o)}else r.log(`Bad coordinates syntax: `+d)}else{let t=s[a]||i.schema(a);e.add(n,t,f,o),r.log(`  public data ${t} ${f}.`)}})}}function b(e){return e._embedded.results.map(e=>{let t=e.title,n=e.uri;return{name:{value:t,type:`literal`},subject:{type:`IRI`,value:n}}})}async function x(e,t,i){if(!i.searchByNameURI)throw Error(`Missing queryTarget.searchByNameURI on queryESCODataByName`);let a=i.limit||200,o=i.searchByNameURI.replace(`$(name)`,e).replace(`$(limit)`,``+a).replace(`$(targetClass)`,t.toNT());r.log(`Querying ESCO data - uri: `+o);let s=(await n.store.fetcher?.webOperation(`GET`,o,u))?.responseText||``;if(r.log(`    Query result  text`+s.slice(0,500)+`...`),s.length===0)throw Error(`Wot no text back from ESCO query `+o);let c=JSON.parse(s);return r.log(`    ESCO Query result JSON`+JSON.stringify(c,null,4).slice(0,500)+`...`),b(c)}function S(e){let t=e.indexOf(`SPARQL-QUERY`);if(t<0)return e;r.warn(`  ### Fixing JSON with wikidata error code injection `+e.slice(t,t+200));let n=e.lastIndexOf(`}, {`);return e.slice(0,n)+` } ] } } `}async function C(e,t,i,o){function s(n){let r=o.limit||200;return n.replace(`$(name)`,e).replace(`$(limit)`,``+r).replace(`$(language)`,c).replace(`$(targetClass)`,t.toNT())}if(!t)throw Error(`queryPublicDataByName: No class provided`);let c=(await a.getPreferredLanguages()||a.defaultPreferredLanguages)[0]||`en`;if(o.searchByNameQuery){let e=s(o.searchByNameQuery);return r.log(`Querying public data - sparql: `+e),w(e,o)}if(o.searchByNameURI){let e=s(o.searchByNameURI),t;try{t=await n.store.fetcher?.webOperation(`GET`,e,u)}catch(t){throw Error(`Exception when trying to fetch ${e} \n ${t}`)}let i=t.responseText||``;if(t.status!==200)throw Error(`HTTP error status ${t.status} trying to fetch ${e} `);if(r.log(`    Query result  text`+i.slice(0,500)+`...`),i.length===0)throw Error(`queryPublicDataByName: No text back from public data query `+e);let a=S(i),c=JSON.parse(a);if(r.log(`    API Query result JSON`+JSON.stringify(c,null,4).slice(0,500)+`...`),c._embedded)return r.log(`      Looks like ESCO`),b(c);throw alert(`Code me: unrecognized API return format`),Error(`*** Need to add code to parse unrecognized API JSON return\n${JSON.stringify(c,null,4)}`)}throw Error(`Query source must have either rest API or SPARQL endpoint.`)}async function w(e,t){if(!t.endpoint)throw Error(`Missing queryTarget.endpoint required for queryPublicDataSelect`);let i=new URL(t.endpoint);i.searchParams.append(`query`,e);let a=i.href;r.log(` queryPublicDataSelect uri: `+a);let o=new Headers;o.append(`Accept`,`application/json`);let s={credentials:`omit`,headers:o},c=(await n.store.fetcher?.webOperation(`GET`,a,s))?.responseText||``;if(c.length===0)throw Error(`No text back from query `+a);let l=S(c),u=JSON.parse(l);return r.log(`    Query result JSON`+JSON.stringify(u,null,4).slice(0,100)+`...`),u.results.bindings}async function T(e,i,a){if(r.log(`queryPublicDataConstruct: sparql:`,e),!a.endpoint)throw Error(`Missing queryTarget.endpoint required for queryPublicDataConstruct`);let o=new URL(a.endpoint);o.searchParams.append(`query`,e);let s=o.href;r.log(` queryPublicDataConstruct uri: `+s);let c=new Headers;c.append(`Accept`,`text/turtle`);let l={credentials:`omit`,headers:c},u=(await n.store.fetcher?.webOperation(`GET`,s,l))?.responseText||`No response text?`,d=u.length>500?u.slice(0,200)+` ... `+u.slice(-200):u;if(r.log(`    queryPublicDataConstruct result text:`+d),u.length===0)throw Error(`queryPublicDataConstruct: No text back from construct query:`+s);(0,t.parse)(u,n.store,i.uri,`text/turtle`)}async function E(e,t,n){if(n.uri.startsWith(`https://dbpedia.org/resource/`))return A(e,t,n);if(n.uri.match(/^https?:\/\/www\.wikidata\.org\/entity\/.*/))await D(e,t,n);else{let t=n.uri.startsWith(`http:`)?e.sym(`https:`+n.uri.slice(5)):n,r=new Headers;return r.append(`Accept`,`text/turtle`),e.fetcher.load(t,{credentials:`omit`,headers:r})}}async function D(e,t,n){await T(l.replace(/wd:Q49108/g,n.toNT()),n,h),r.log(`getWikidataDetails: loaded.`,n)}async function O(e,t,n){y(e,n,await w(`select distinct *  where {
  optional { $(subject)  wdt:P31  ?targetClass } # instance of
  optional { $(subject)  wdt:P154  ?logo }
  optional { $(subject)  wdt:P158  ?sealImage }
# optional { $(subject)  wdt:P159  ?headquartersLocation }

optional { $(subject)  wdt:P17  ?country }
optional { $(subject)  wdt:P18  ?image }
optional { $(subject)  wdt:P1813  ?shortName }

optional { $(subject)  wdt:P355  ?subsidiary }
# SERVICE wikibase:label { bd:serviceParam wikibase:language "fr,en,de,it" }
}`.replace(s,n.toNT()),h),n.doc())}async function k(e,t,n){let i=`select distinct *  where {

  $(subject) wdt:P276 ?location .

  optional { ?location  wdt:P2044  ?elevation }
  optional { ?location  wdt:P131  ?region }
  optional { ?location wdt:P625 ?coordinates }
optional {  ?location  wdt:P17  ?country }

# SERVICE wikibase:label { bd:serviceParam wikibase:language "fr,en,de,it" }
}`.replace(s,n.toNT());r.log(` location query sparql:`+i);let a=await w(i,h);r.log(` location query bindings:`,a),y(e,n,a,n.doc())}async function A(e,t,n){y(e,n,await w(`select distinct ?city, ?state, ?country, ?homepage, ?logo, ?lat, ?long,  WHERE {
    OPTIONAL { <${n}> <http://dbpedia.org/ontology/city> ?city }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/state> ?state }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/country> ?country }
    OPTIONAL { ${n} foaf:homepage ?homepage }
    OPTIONAL { ${n} foaf:lat ?lat; foaf:long ?long }
    OPTIONAL { ${n} <http://dbpedia.org/ontology/country> ?country }
   }`,f),n.doc()),r.log(`Finished getDbpediaDetails.`)}exports.ESCOResultToBindings=b,exports.bindingToTerm=v,exports.dbPediaTypeMap=p,exports.dbpediaParameters=f,exports.escoParameters=d,exports.fetcherOptionsJsonPublicData=u,exports.getDbpediaDetails=A,exports.getWikidataDetails=D,exports.getWikidataDetailsOld=O,exports.getWikidataLocation=k,exports.instituteDetailsWikidataQuery=l,exports.loadFromBindings=y,exports.loadPublicDataThing=E,Object.defineProperty(exports,"publicData_exports",{enumerable:!0,get:function(){return o}}),exports.queryESCODataByName=x,exports.queryPublicDataByName=C,exports.queryPublicDataConstruct=T,exports.queryPublicDataSelect=w,exports.variableNameToPredicateMap=_,exports.wikidataClasses=c,exports.wikidataIncomingClassMap=g,exports.wikidataOutgoingClassMap=m,exports.wikidataParameters=h;
//# sourceMappingURL=publicData.cjs.js.map