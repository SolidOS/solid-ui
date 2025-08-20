"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AUTOCOMPLETE_LIMIT = void 0;
exports.ESCOResultToBindings = ESCOResultToBindings;
exports.bindingToTerm = bindingToTerm;
exports.fetcherOptionsJsonPublicData = exports.escoParameters = exports.dbpediaParameters = exports.dbPediaTypeMap = void 0;
exports.getDbpediaDetails = getDbpediaDetails;
exports.getWikidataDetails = getWikidataDetails;
exports.getWikidataDetailsOld = getWikidataDetailsOld;
exports.getWikidataLocation = getWikidataLocation;
exports.instituteDetailsWikidataQuery = void 0;
exports.loadFromBindings = loadFromBindings;
exports.loadPublicDataThing = loadPublicDataThing;
exports.queryESCODataByName = queryESCODataByName;
exports.queryPublicDataByName = queryPublicDataByName;
exports.queryPublicDataConstruct = queryPublicDataConstruct;
exports.queryPublicDataSelect = queryPublicDataSelect;
exports.wikidataParameters = exports.wikidataOutgoingClassMap = exports.wikidataIncomingClassMap = exports.wikidataClasses = exports.variableNameToPredicateMap = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _rdflib = require("rdflib");
var _solidLogic = require("solid-logic");
var debug = _interopRequireWildcard(require("../../../debug"));
var ns = _interopRequireWildcard(require("../../../ns"));
var _language = require("./language");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t3 in e) "default" !== _t3 && {}.hasOwnProperty.call(e, _t3) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t3)) && (i.get || i.set) ? o(f, _t3, i) : f[_t3] = e[_t3]); return f; })(e, t); }
/* Logic to access public data stores
*
* including filtering resut by natural language etc
* See https://solidos.solidcommunity.net/public/2021/01%20Building%20Solid%20Apps%20which%20use%20Public%20Data.html
*/

var AUTOCOMPLETE_LIMIT = exports.AUTOCOMPLETE_LIMIT = 200; // How many to get from server
// With 3000 we could exceed the wikidata timeout

var subjectRegexp = /\$\(subject\)/g;
// Schema.org seems to suggest NGOs are non-profit and Corporaions are for-profit
// but doesn't have explicit classes
var wikidataClasses = exports.wikidataClasses = {
  Corporation: 'http://www.wikidata.org/entity/Q6881511',
  // Enterprise is for-profit
  EducationalOrganization: 'http://www.wikidata.org/entity/Q178706',
  // insitution
  GovernmentOrganization: 'http://www.wikidata.org/entity/Q327333',
  // government agency
  MedicalOrganization: 'http://www.wikidata.org/entity/Q4287745',
  MusicGroup: 'http://www.wikidata.org/entity/Q32178211',
  // music organization
  NGO: 'http://www.wikidata.org/entity/Q163740',
  // nonprofit organization @@
  Occupation: 'http://www.wikidata.org/entity/Q28640',
  // Profession
  // Organization: 'http://www.wikidata.org/entity/Q43229',
  Project: 'http://www.wikidata.org/entity/Q170584',
  ResearchOrganization: 'http://www.wikidata.org/entity/Q31855',
  SportsOrganization: 'http://www.wikidata.org/entity/Q4438121'
};
var instituteDetailsWikidataQuery = exports.instituteDetailsWikidataQuery = "prefix vcard: <http://www.w3.org/2006/vcard/ns#>\nCONSTRUCT\n{  wd:Q49108 vcard:fn ?itemLabel.\nwd:Q49108 rdf:type ?klass. ?klass rdfs:label ?klassLabel; rdfs:comment ?klassDescription .\nwd:Q49108 schema:logo ?logo;\n   schema:image ?image;\n   schema:logo  ?sealImage;\n   schema:subOrganization  ?subsidiary .\n      ?subsidiary rdfs:label ?subsidiaryLabel .\n ?supersidiary schema:subOrganization wd:Q49108 .\n      ?supersidiary rdfs:label ?supersidiaryLabel .\n  wd:Q49108 schema:location ?location .\n     ?location  schema:elevation  ?elevation .\n     ?location  wdt:P131  ?region .  ?region rdfs:label ?regionLabel .\n     ?location wdt:P625 ?coordinates .\n     ?location  schema:country  ?country . ?country rdfs:label ?countryLabel .\n}\nWHERE\n{  optional {wd:Q49108 rdfs:label ?itemLabel} .\n  optional {wd:Q49108 wdt:P154 ?logo .}\n  optional {wd:Q49108 wdt:P31 ?klass .}\n  optional {wd:Q49108 wdt:P158  ?sealImage .}\n  optional {wd:Q49108 wdt:P18 ?image .}\n\n  optional { wd:Q49108       wdt:P355 ?subsidiary . }\n  optional { ?supersidiary   wdt:P355 wd:Q49108. }\n\n  optional { wd:Q49108 wdt:P276 ?location .\n\n    optional { ?location  schema:eleveation  ?elevation }\n    optional { ?location  wdt:P131  ?region }\n    optional { ?location wdt:P625 ?coordinates }\n    optional {  ?location  wdt:P17  ?country }\n  }\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\". }\n}";
var fetcherOptionsJsonPublicData = exports.fetcherOptionsJsonPublicData = {
  credentials: 'omit',
  // try to avoid CORS problems. Data is public so no auth
  headers: new Headers({
    Accept: 'application/json'
  })
};
var escoParameters = exports.escoParameters = {
  label: 'ESCO',
  logo: _solidLogic.store.sym('https://ec.europa.eu/esco/portal/static_resource2/images/logo/logo_en.gif'),
  searchByNameURI: 'https://ec.europa.eu/esco/api/search?language=$(language)&type=occupation&text=$(name)'
  // endpoint: undefined
  // returnFormat: 'ESCO',
  // targetClass: {}
};
var dbpediaParameters = exports.dbpediaParameters = {
  label: 'DBPedia',
  logo: _solidLogic.store.sym('https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/DBpediaLogo.svg/263px-DBpediaLogo.svg.png'),
  searchByNameQuery: "select distinct ?subject, ?name where {\n    ?subject a $(targetClass); rdfs:label ?name\n    FILTER regex(?name, \"$(name)\", \"i\")\n  } LIMIT $(limit)",
  endpoint: 'https://dbpedia.org/sparql/'
};
var dbPediaTypeMap = exports.dbPediaTypeMap = {
  AcademicInsitution: 'http://umbel.org/umbel/rc/EducationalOrganization'
};
var wikidataOutgoingClassMap = exports.wikidataOutgoingClassMap = {
  AcademicInsitution: 'http://www.wikidata.org/entity/Q4671277',
  Enterprise: 'http://www.wikidata.org/entity/Q6881511',
  Business: 'http://www.wikidata.org/entity/Q4830453',
  NGO: 'http://www.wikidata.org/entity/Q79913',
  CharitableOrganization: 'http://www.wikidata.org/entity/Q708676',
  Insitute: 'http://www.wikidata.org/entity/Q1664720'
};
var wikidataParameters = exports.wikidataParameters = {
  label: 'WikiData',
  limit: 3000,
  // Need a high one as very many items, and many languages
  logo: _solidLogic.store.sym('https://www.wikimedia.org/static/images/project-logos/wikidatawiki.png'),
  endpoint: 'https://query.wikidata.org/sparql',
  searchByNameQuery: "SELECT ?subject ?name\n  WHERE {\n    ?klass wdt:P279* $(targetClass) .\n    ?subject wdt:P31 ?klass .\n    ?subject rdfs:label ?name.\n    FILTER regex(?name, \"$(name)\", \"i\")\n  } LIMIT $(limit) ",
  // was SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en" }

  insitituteDetailsQuery: "CONSTRUCT\n{  wd:Q49108 schema:name ?itemLabel;\n             schema:logo ?logo;\n              schema:logo  ?sealImage;\n             schema:subOrganization  ?subsidiary .\n                 ?subsidiary schema:name ?subsidiaryLabel .\n}\nWHERE\n{\n   wd:Q49108 # rdfs:label ?itemLabel ;\n             wdt:P154 ?logo;\n              wdt:P158  ?sealImage ;\n             wdt:P355  ?subsidiary .\n          #  ?subsidiary rdfs:label ?subsidiaryLabel .\n\n  SERVICE wikibase:label { bd:serviceParam wikibase:language \"[AUTO_LANGUAGE], fr\". }\n}"
};
var wikidataIncomingClassMap = exports.wikidataIncomingClassMap = {
  'http://www.wikidata.org/entity/Q15936437': ns.schema('CollegeOrUniversity'),
  // research university
  'http://www.wikidata.org/entity/Q1664720': ns.schema('EducationalOrganization'),
  // insitute @@
  'http://www.wikidata.org/entity/Q43229': ns.schema('Organization'),
  // research university
  'http://www.wikidata.org/entity/Q3918': ns.schema('CollegeOrUniversity'),
  // university
  'http://www.wikidata.org/entity/Q170584': ns.schema('Project'),
  // university
  'http://www.wikidata.org/entity/Q327333': ns.schema('GovernmentOrganization'),
  // govt agency
  'http://www.wikidata.org/entity/Q2221906': ns.schema('Place'),
  // geographic location
  'http://www.wikidata.org/entity/Q167037': ns.schema('Corporation') // Corporation
};
var variableNameToPredicateMap = exports.variableNameToPredicateMap = {
  // allow other mappings to be added in theory hence var
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
  "long": ns.schema('longitude')
};
function bindingToTerm(item) {
  var typ = item.type.toLowerCase();
  if (typ === 'uri' || typ === 'iri') {
    return _solidLogic.store.sym(item.value);
  } else if (typ === 'literal') {
    if (item['xml:lang']) {
      return new _rdflib.Literal(item.value, item['xml:lang']);
    } else {
      return new _rdflib.Literal(item.value);
    }
  } else {
    throw new Error("bindingToTerm: Unexpected type \"".concat(item.type, "\" in sparql binding}"));
  }
}
function loadFromBindings(kb, solidSubject, bindings, doc) {
  var predMap = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : variableNameToPredicateMap;
  var results = {};
  debug.log("loadFromBindings:  subject: ".concat(solidSubject));
  debug.log("                       doc: ".concat(doc));
  bindings.forEach(function (binding) {
    for (var key in binding) {
      var result = binding[key];
      var combined = JSON.stringify(result); // ( result.type, result.value )
      results[key] = results[key] || new Set();
      results[key].add(combined); // remove duplicates
    }
  });
  var _loop = function _loop(key) {
    var values = results[key];
    debug.log("    results ".concat(key, " -> ").concat(values));
    values.forEach(function (combined) {
      var result = JSON.parse(combined);
      var type = result.type,
        value = result.value;
      var obj;
      if (type === 'uri') {
        obj = kb.sym(value);
      } else if (type === 'literal') {
        obj = new _rdflib.Literal(value, result.language, result.datatype);
      } else {
        throw new Error("loadFromBindings:  unexpected type: ".concat(type));
      }
      if (key === 'type') {
        if (wikidataIncomingClassMap[value]) {
          obj = wikidataIncomingClassMap[value];
        } else {
          debug.warn('Unmapped Wikidata Class: ' + value);
        }
      } else if (key === 'coordinates') {
        // const latlong = value // Like 'Point(-71.106111111 42.375)'
        debug.log('         @@@ hey a point: ' + value);
        // const regexp = /.*\(([-0-9\.-]*) ([-0-9\.-]*)\)/
        var regexp = /.*\(([-0-9.-]*) ([-0-9.-]*)\)/;
        var match = regexp.exec(value);
        if (match) {
          var _float = ns.xsd('float');
          var latitude = new _rdflib.Literal(match[1], null, _float);
          var longitude = new _rdflib.Literal(match[2], null, _float);
          kb.add(solidSubject, ns.schema('longitude'), longitude, doc);
          kb.add(solidSubject, ns.schema('latitude'), latitude, doc);
        } else {
          debug.log('Bad coordinates syntax: ' + value);
        }
      } else {
        var pred = predMap[key] || ns.schema(key); // fallback to just using schema.org
        kb.add(solidSubject, pred, obj, doc); // @@ deal with non-string and objects
        debug.log("  public data ".concat(pred, " ").concat(obj, "."));
      }
    });
  };
  for (var key in results) {
    _loop(key);
  }
}

/* ESCO sopecific
*/
function ESCOResultToBindings(json) {
  var results = json._embedded.results; // Array
  var bindings = results.map(function (result) {
    var name = result.title;
    var uri = result.uri; // like http://data.europa.eu/esco/occupation/57af9090-55b4-4911-b2d0-86db01c00b02
    return {
      name: {
        value: name,
        type: 'literal'
      },
      subject: {
        type: 'IRI',
        value: uri
      }
    }; // simulate SPARQL bindings
  });
  return bindings;
}

/*  Query all entities of given class and partially matching name
*/
function queryESCODataByName(_x, _x2, _x3) {
  return _queryESCODataByName.apply(this, arguments);
}
/* Cope ithe syntax probelm in wikidata timeout responses
*
* Wikidata bug: https://phabricator.wikimedia.org/T283962
* This will not be needed whn that  WDQS bug fixed.
* This is aptured in https://github.com/solidos/solid-ui/issues/403
*/
function _queryESCODataByName() {
  _queryESCODataByName = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(filter, theClass, queryTarget) {
    var _store$fetcher;
    var limit, queryURI, response, text, json;
    return _regenerator["default"].wrap(function (_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (queryTarget.searchByNameURI) {
            _context.next = 1;
            break;
          }
          throw new Error('Missing queryTarget.searchByNameURI on queryESCODataByName');
        case 1:
          limit = queryTarget.limit || AUTOCOMPLETE_LIMIT;
          queryURI = queryTarget.searchByNameURI.replace('$(name)', filter).replace('$(limit)', '' + limit).replace('$(targetClass)', theClass.toNT());
          debug.log('Querying ESCO data - uri: ' + queryURI);
          _context.next = 2;
          return (_store$fetcher = _solidLogic.store.fetcher) === null || _store$fetcher === void 0 ? void 0 : _store$fetcher.webOperation('GET', queryURI, fetcherOptionsJsonPublicData);
        case 2:
          response = _context.sent;
          text = (response === null || response === void 0 ? void 0 : response.responseText) || '';
          debug.log('    Query result  text' + text.slice(0, 500) + '...');
          if (!(text.length === 0)) {
            _context.next = 3;
            break;
          }
          throw new Error('Wot no text back from ESCO query ' + queryURI);
        case 3:
          json = JSON.parse(text); // console.log('Whole JSON return object', json)
          debug.log('    ESCO Query result JSON' + JSON.stringify(json, null, 4).slice(0, 500) + '...');
          return _context.abrupt("return", ESCOResultToBindings(json));
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _queryESCODataByName.apply(this, arguments);
}
function fixWikidataJSON(str) {
  var syntaxProblem = str.indexOf('SPARQL-QUERY');
  if (syntaxProblem < 0) return str;
  // console.log('@@ fixWikidataJSON FIXING')
  debug.warn('  ### Fixing JSON with wikidata error code injection ' + str.slice(syntaxProblem, syntaxProblem + 200));
  var goodness = str.lastIndexOf('}, {');
  return str.slice(0, goodness) + ' } ] } } '; // Close binding, array, bindings, results, root object
}
/*  Query all entities of given class and partially matching name
*/
function queryPublicDataByName(_x4, _x5, _x6, _x7) {
  return _queryPublicDataByName.apply(this, arguments);
}
/* Query a database using SPARQL SELECT
*/
function _queryPublicDataByName() {
  _queryPublicDataByName = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee2(filter, theClass, languages, queryTarget) {
    var substituteStrings, languagePrefs, language, sparql, queryURI, response, _store$fetcher2, text, text2, json, bindings, _t, _t2;
    return _regenerator["default"].wrap(function (_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          substituteStrings = function _substituteStrings(template) {
            var limit = queryTarget.limit || AUTOCOMPLETE_LIMIT;
            var u1 = template.replace('$(name)', filter).replace('$(limit)', '' + limit).replace('$(language)', language);
            return u1.replace('$(targetClass)', theClass.toNT());
          };
          if (theClass) {
            _context2.next = 1;
            break;
          }
          throw new Error('queryPublicDataByName: No class provided');
        case 1:
          _context2.next = 2;
          return (0, _language.getPreferredLanguages)();
        case 2:
          _t = _context2.sent;
          if (_t) {
            _context2.next = 3;
            break;
          }
          _t = _language.defaultPreferredLanguages;
        case 3:
          languagePrefs = _t;
          language = languagePrefs[0] || 'en';
          if (!queryTarget.searchByNameQuery) {
            _context2.next = 4;
            break;
          }
          sparql = substituteStrings(queryTarget.searchByNameQuery);
          debug.log('Querying public data - sparql: ' + sparql);
          return _context2.abrupt("return", queryPublicDataSelect(sparql, queryTarget));
        case 4:
          if (!queryTarget.searchByNameURI) {
            _context2.next = 13;
            break;
          }
          // not sparql - random API
          queryURI = substituteStrings(queryTarget.searchByNameURI);
          _context2.prev = 5;
          _context2.next = 6;
          return (_store$fetcher2 = _solidLogic.store.fetcher) === null || _store$fetcher2 === void 0 ? void 0 : _store$fetcher2.webOperation('GET', queryURI, fetcherOptionsJsonPublicData);
        case 6:
          response = _context2.sent;
          _context2.next = 8;
          break;
        case 7:
          _context2.prev = 7;
          _t2 = _context2["catch"](5);
          throw new Error("Exception when trying to fetch ".concat(queryURI, " \n ").concat(_t2));
        case 8:
          text = response.responseText || ''; // ts
          if (!(response.status !== 200)) {
            _context2.next = 9;
            break;
          }
          throw new Error("HTTP error status ".concat(response.status, " trying to fetch ").concat(queryURI, " "));
        case 9:
          debug.log('    Query result  text' + text.slice(0, 500) + '...');
          if (!(text.length === 0)) {
            _context2.next = 10;
            break;
          }
          throw new Error('queryPublicDataByName: No text back from public data query ' + queryURI);
        case 10:
          text2 = fixWikidataJSON(text); // Kludge: strip of interrupting error message
          json = JSON.parse(text2);
          debug.log('    API Query result JSON' + JSON.stringify(json, null, 4).slice(0, 500) + '...');
          if (!json._embedded) {
            _context2.next = 11;
            break;
          }
          debug.log('      Looks like ESCO');
          bindings = ESCOResultToBindings(json);
          return _context2.abrupt("return", bindings);
        case 11:
          alert('Code me: unrecognized API return format');
          throw new Error("*** Need to add code to parse unrecognized API JSON return\n".concat(JSON.stringify(json, null, 4)));
        case 12:
          _context2.next = 14;
          break;
        case 13:
          throw new Error('Query source must have either rest API or SPARQL endpoint.');
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[5, 7]]);
  }));
  return _queryPublicDataByName.apply(this, arguments);
}
function queryPublicDataSelect(_x8, _x9) {
  return _queryPublicDataSelect.apply(this, arguments);
}
/* Load from a database using SPARQL CONSTRUCT
*/
function _queryPublicDataSelect() {
  _queryPublicDataSelect = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee3(sparql, queryTarget) {
    var _store$fetcher3;
    var myUrlWithParams, queryURI, headers, options, response, text, text2, json, bindings;
    return _regenerator["default"].wrap(function (_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          if (queryTarget.endpoint) {
            _context3.next = 1;
            break;
          }
          throw new Error('Missing queryTarget.endpoint required for queryPublicDataSelect');
        case 1:
          myUrlWithParams = new URL(queryTarget.endpoint);
          myUrlWithParams.searchParams.append('query', sparql);
          queryURI = myUrlWithParams.href;
          debug.log(' queryPublicDataSelect uri: ' + queryURI);
          headers = new Headers();
          headers.append('Accept', 'application/json');
          options = {
            credentials: 'omit',
            // CORS - as we know it is public
            headers: headers
          };
          _context3.next = 2;
          return (_store$fetcher3 = _solidLogic.store.fetcher) === null || _store$fetcher3 === void 0 ? void 0 : _store$fetcher3.webOperation('GET', queryURI, options);
        case 2:
          response = _context3.sent;
          text = (response === null || response === void 0 ? void 0 : response.responseText) || '';
          if (!(text.length === 0)) {
            _context3.next = 3;
            break;
          }
          throw new Error('No text back from query ' + queryURI);
        case 3:
          text2 = fixWikidataJSON(text);
          json = JSON.parse(text2);
          debug.log('    Query result JSON' + JSON.stringify(json, null, 4).slice(0, 100) + '...');
          bindings = json.results.bindings;
          return _context3.abrupt("return", bindings);
        case 4:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _queryPublicDataSelect.apply(this, arguments);
}
function queryPublicDataConstruct(_x0, _x1, _x10) {
  return _queryPublicDataConstruct.apply(this, arguments);
}
function _queryPublicDataConstruct() {
  _queryPublicDataConstruct = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee4(sparql, pubicId, queryTarget) {
    var _store$fetcher4;
    var myUrlWithParams, queryURI, headers, options, response, text, report;
    return _regenerator["default"].wrap(function (_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          debug.log('queryPublicDataConstruct: sparql:', sparql);
          if (queryTarget.endpoint) {
            _context4.next = 1;
            break;
          }
          throw new Error('Missing queryTarget.endpoint required for queryPublicDataConstruct');
        case 1:
          myUrlWithParams = new URL(queryTarget.endpoint);
          myUrlWithParams.searchParams.append('query', sparql);
          queryURI = myUrlWithParams.href;
          debug.log(' queryPublicDataConstruct uri: ' + queryURI);
          headers = new Headers();
          headers.append('Accept', 'text/turtle');
          options = {
            credentials: 'omit',
            // CORS // @tsc pain
            headers: headers // ({ Accept: 'text/turtle' } as Headers)
          };
          _context4.next = 2;
          return (_store$fetcher4 = _solidLogic.store.fetcher) === null || _store$fetcher4 === void 0 ? void 0 : _store$fetcher4.webOperation('GET', queryURI, options);
        case 2:
          response = _context4.sent;
          text = (response === null || response === void 0 ? void 0 : response.responseText) || 'No response text?';
          report = text.length > 500 ? text.slice(0, 200) + ' ... ' + text.slice(-200) : text;
          debug.log('    queryPublicDataConstruct result text:' + report);
          if (!(text.length === 0)) {
            _context4.next = 3;
            break;
          }
          throw new Error('queryPublicDataConstruct: No text back from construct query:' + queryURI);
        case 3:
          (0, _rdflib.parse)(text, _solidLogic.store, pubicId.uri, 'text/turtle');
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _queryPublicDataConstruct.apply(this, arguments);
}
function loadPublicDataThing(_x11, _x12, _x13) {
  return _loadPublicDataThing.apply(this, arguments);
}
function _loadPublicDataThing() {
  _loadPublicDataThing = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee5(kb, subject, publicDataID) {
    var iDToFetch, headers;
    return _regenerator["default"].wrap(function (_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          if (!publicDataID.uri.startsWith('https://dbpedia.org/resource/')) {
            _context5.next = 1;
            break;
          }
          return _context5.abrupt("return", getDbpediaDetails(kb, subject, publicDataID));
        case 1:
          if (!publicDataID.uri.match(/^https?:\/\/www\.wikidata\.org\/entity\/.*/)) {
            _context5.next = 3;
            break;
          }
          _context5.next = 2;
          return getWikidataDetails(kb, subject, publicDataID);
        case 2:
          _context5.next = 4;
          break;
        case 3:
          iDToFetch = publicDataID.uri.startsWith('http:') ? kb.sym('https:' + publicDataID.uri.slice(5)) : publicDataID;
          headers = new Headers();
          headers.append('Accept', 'text/turtle');
          return _context5.abrupt("return", kb.fetcher.load(iDToFetch, {
            credentials: 'omit',
            headers: headers
          }));
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _loadPublicDataThing.apply(this, arguments);
}
function getWikidataDetails(_x14, _x15, _x16) {
  return _getWikidataDetails.apply(this, arguments);
}
function _getWikidataDetails() {
  _getWikidataDetails = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee6(kb, solidSubject, publicDataID) {
    var subjRegexp, sparql;
    return _regenerator["default"].wrap(function (_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          subjRegexp = /wd:Q49108/g;
          sparql = instituteDetailsWikidataQuery.replace(subjRegexp, publicDataID.toNT());
          _context6.next = 1;
          return queryPublicDataConstruct(sparql, publicDataID, wikidataParameters);
        case 1:
          debug.log('getWikidataDetails: loaded.', publicDataID);
        case 2:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _getWikidataDetails.apply(this, arguments);
}
function getWikidataDetailsOld(_x17, _x18, _x19) {
  return _getWikidataDetailsOld.apply(this, arguments);
}
function _getWikidataDetailsOld() {
  _getWikidataDetailsOld = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee7(kb, solidSubject, publicDataID) {
    var sparql, bindings;
    return _regenerator["default"].wrap(function (_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          sparql = "select distinct *  where {\n  optional { $(subject)  wdt:P31  ?targetClass } # instance of\n  optional { $(subject)  wdt:P154  ?logo }\n  optional { $(subject)  wdt:P158  ?sealImage }\n# optional { $(subject)  wdt:P159  ?headquartersLocation }\n\noptional { $(subject)  wdt:P17  ?country }\noptional { $(subject)  wdt:P18  ?image }\noptional { $(subject)  wdt:P1813  ?shortName }\n\noptional { $(subject)  wdt:P355  ?subsidiary }\n# SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\" }\n}".replace(subjectRegexp, publicDataID.toNT());
          _context7.next = 1;
          return queryPublicDataSelect(sparql, wikidataParameters);
        case 1:
          bindings = _context7.sent;
          loadFromBindings(kb, publicDataID, bindings, publicDataID.doc()); // arg2 was solidSubject
        case 2:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _getWikidataDetailsOld.apply(this, arguments);
}
function getWikidataLocation(_x20, _x21, _x22) {
  return _getWikidataLocation.apply(this, arguments);
}
function _getWikidataLocation() {
  _getWikidataLocation = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee8(kb, solidSubject, publicDataID) {
    var sparql, bindings;
    return _regenerator["default"].wrap(function (_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          sparql = "select distinct *  where {\n\n  $(subject) wdt:P276 ?location .\n\n  optional { ?location  wdt:P2044  ?elevation }\n  optional { ?location  wdt:P131  ?region }\n  optional { ?location wdt:P625 ?coordinates }\noptional {  ?location  wdt:P17  ?country }\n\n# SERVICE wikibase:label { bd:serviceParam wikibase:language \"fr,en,de,it\" }\n}".replace(subjectRegexp, publicDataID.toNT());
          debug.log(' location query sparql:' + sparql);
          _context8.next = 1;
          return queryPublicDataSelect(sparql, wikidataParameters);
        case 1:
          bindings = _context8.sent;
          debug.log(' location query bindings:', bindings);
          loadFromBindings(kb, publicDataID, bindings, publicDataID.doc()); // was solidSubject
        case 2:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _getWikidataLocation.apply(this, arguments);
}
function getDbpediaDetails(_x23, _x24, _x25) {
  return _getDbpediaDetails.apply(this, arguments);
}
function _getDbpediaDetails() {
  _getDbpediaDetails = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee9(kb, solidSubject, publicDataID) {
    var sparql, bindings;
    return _regenerator["default"].wrap(function (_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          // Note below the string form of the named node with <> works in SPARQL
          sparql = "select distinct ?city, ?state, ?country, ?homepage, ?logo, ?lat, ?long,  WHERE {\n    OPTIONAL { <".concat(publicDataID, "> <http://dbpedia.org/ontology/city> ?city }\n    OPTIONAL { ").concat(publicDataID, " <http://dbpedia.org/ontology/state> ?state }\n    OPTIONAL { ").concat(publicDataID, " <http://dbpedia.org/ontology/country> ?country }\n    OPTIONAL { ").concat(publicDataID, " foaf:homepage ?homepage }\n    OPTIONAL { ").concat(publicDataID, " foaf:lat ?lat; foaf:long ?long }\n    OPTIONAL { ").concat(publicDataID, " <http://dbpedia.org/ontology/country> ?country }\n   }");
          _context9.next = 1;
          return queryPublicDataSelect(sparql, dbpediaParameters);
        case 1:
          bindings = _context9.sent;
          loadFromBindings(kb, publicDataID, bindings, publicDataID.doc());
          debug.log('Finished getDbpediaDetails.');
        case 2:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _getDbpediaDetails.apply(this, arguments);
}
//# sourceMappingURL=publicData.js.map