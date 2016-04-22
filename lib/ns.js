// thisModule = {}

var thisModule

$rdf = require('rdflib')

thisModule = function (prefixed) {
  var pair = prefixed.split(':')
  if (pair.length === 0) throw 'Prefixed name has no colon: ' + prefixed
  if (!(pair[0] in thisModule)) throw 'Unregistered namespace prefix in: ' + prefixed
  return thisModule[pair[0]](pair[1])
}

thisModule.auth = $rdf.Namespace('http://www.w3.org/ns/auth/acl#'); // @@ obsolete - use acl:
thisModule.acl = $rdf.Namespace('http://www.w3.org/ns/auth/acl#')
thisModule.arg = $rdf.Namespace('http://www.w3.org/ns/pim/arg#')
thisModule.cal = $rdf.Namespace('http://www.w3.org/2002/12/cal/ical#')
thisModule.contact = $rdf.Namespace('http://www.w3.org/2000/10/swap/pim/contact#')
thisModule.dc = $rdf.Namespace('http://purl.org/dc/elements/1.1/')
thisModule.dct = $rdf.Namespace('http://purl.org/dc/terms/')
thisModule.doap = $rdf.Namespace('http://usefulinc.com/ns/doap#')
thisModule.foaf = $rdf.Namespace('http://xmlns.com/foaf/0.1/')
thisModule.http = $rdf.Namespace('http://www.w3.org/2007/ont/http#')
thisModule.httph = $rdf.Namespace('http://www.w3.org/2007/ont/httph#')
thisModule.ical = $rdf.Namespace('http://www.w3.org/2002/12/cal/icaltzd#')
thisModule.ldp = $rdf.Namespace('http://www.w3.org/ns/ldp#')
thisModule.link = thisModule.tab = thisModule.tabont = $rdf.Namespace('http://www.w3.org/2007/ont/link#')
thisModule.log = $rdf.Namespace('http://www.w3.org/2000/10/swap/log#')
thisModule.mo = $rdf.Namespace('http://purl.org/ontology/mo/')
thisModule.owl = $rdf.Namespace('http://www.w3.org/2002/07/owl#')
thisModule.patch = $rdf.Namespace('http://www.w3.org/ns/pim/patch#')
thisModule.qu = $rdf.Namespace('http://www.w3.org/2000/10/swap/pim/qif#')
thisModule.trip = $rdf.Namespace('http://www.w3.org/ns/pim/trip#')
thisModule.rdf = $rdf.Namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#')
thisModule.rdfs = $rdf.Namespace('http://www.w3.org/2000/01/rdf-schema#')
thisModule.rss = $rdf.Namespace('http://purl.org/rss/1.0/')
thisModule.sched = $rdf.Namespace('http://www.w3.org/ns/pim/schedule#')
thisModule.schema = $rdf.Namespace('http:/schema.org/'); // @@ beware confusion with documents no 303
thisModule.sioc = $rdf.Namespace('http://rdfs.org/sioc/ns#')
// was - thisModule.xsd = $rdf.Namespace('http://www.w3.org/TR/2004/REC-xmlschema-2-20041028/#dt-')
thisModule.solid = $rdf.Namespace('https://www.w3.org/ns/solid/terms#')
thisModule.space = $rdf.Namespace('http://www.w3.org/ns/pim/space#')
thisModule.stat = $rdf.Namespace('http://www.w3.org/ns/posix/stat#')
thisModule.ui = $rdf.Namespace('http://www.w3.org/ns/ui#')
thisModule.vcard = $rdf.Namespace('http://www.w3.org/2006/vcard/ns#')
thisModule.wf = $rdf.Namespace('http://www.w3.org/2005/01/wf/flow#')
thisModule.xsd = $rdf.Namespace('http://www.w3.org/2001/XMLSchema#')

module.exports = thisModule
