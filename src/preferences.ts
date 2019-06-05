//                  Solid-UI temporary preferences
//                  ==============================
//
import $rdf from 'rdflib'
const kb = require('./store')
import ns from './ns'
const authn = require('./signin')
const widgets = require('./widgets')
import pad from './pad'

// This was tabulator . preferences in the tabulator
//
const preferences = { // used for storing user name
  value: [] as string[],
  get: function (k: number) { // original
    return this.value[k]
  },
  set: function (k: number, v: string) {
    if (typeof v !== 'string') {
      console.log('Non-string value of preference ' + k + ': ' + v)
      throw new Error('Non-string value of preference ' + k + ': ' + v)
    }
    this.value[k] = v
  },
  renderPreferencesForm,
  recordSharedPreferences,
  getPreferencesForClass
}
// In a solid world, Preferences are stored in the web
//
// Make an RDF node for recording the common view preferences for any object
// (maybe make it in a separate file?)
function recordSharedPreferences (subject: $rdf.NamedNode, context: { sharedPreferences: unknown }) {
  return new Promise(function (resolve, reject) {
    var sharedPreferences = kb.any(subject, ns.ui('sharedPreferences'))
    if (!sharedPreferences) {
      let sp = $rdf.sym(subject.doc().uri + '#SharedPreferences')
      let ins = [$rdf.st(subject, ns.ui('sharedPreferences'), sp, subject.doc())]
      console.log('Creating shared preferences ' + sp)
      kb.updater.update([], ins, function (uri: string, ok: boolean, errorMessage: string) {
        if (!ok) {
          reject(new Error('create shard prefs: ' + errorMessage))
        } else {
          context.sharedPreferences = sp
          resolve(context)
        }
      })
    } else {
      context.sharedPreferences = sharedPreferences
      resolve(context)
    }
  })
}

// Construct a personal defaults node in the preferences file for a given class of object
//
interface PersonalDefaultsContext {
  preferencesFile: $rdf.Node;
  personalDefaults: unknown;
}
function recordPersonalDefaults (
  klass: $rdf.Node,
  context: PersonalDefaultsContext
) {
  return new Promise(function (resolve, reject) {
    authn.logInLoadPreferences(context).then((context: PersonalDefaultsContext) => {
      var regs = kb.each(null, ns.solid('forClass'), klass)
      var ins: $rdf.Statement[] = []
      var prefs: $rdf.Node | undefined = undefined
      var reg
      if (regs.length) { // Use existing node if we can
        regs.forEach((r: $rdf.Node) => {
          prefs = prefs || kb.any(r, ns.solid('personalDefaults'))
        })
        if (prefs) {
          context.personalDefaults = prefs // Found one
          resolve(context)
          return
        } else {
          prefs = widgets.newThing(context.preferencesFile)
          reg = regs[0]
        }
      } else { // no regs fo class
        reg = widgets.newThing(context.preferencesFile)
        ins = [ $rdf.st(reg, ns.rdf('type'), ns.solid('TypeRegistration'), context.preferencesFile),
          $rdf.st(reg, ns.solid('forClass'), klass, context.preferencesFile)]
      }
      prefs = widgets.newThing(context.preferencesFile)
      ins.push($rdf.st(reg, ns.solid('personalDefaults'), prefs!, context.preferencesFile))
      kb.updater.update([], ins, function (uri: string, ok: boolean, errm: string) {
        if (!ok) {
          reject(new Error('Setting preferences for ' + klass + ': ' + errm))
        } else {
          context.personalDefaults = prefs
          resolve(context)
        }
      })
    }, (err: Error) => {
      reject(err)
    })
  })
}

function renderPreferencesForm (
  subject: $rdf.NamedNode,
  klass: $rdf.Node,
  preferencesForm: unknown,
  context: any
) {
  var prefContainer = context.dom.createElement('div')
  pad.participationObject(subject, subject.doc(), context.me).then(participation => {
    let dom = context.dom
    function heading (text: string) {
      prefContainer.appendChild(dom.createElement('h5')).textContent = text
    }
    heading('My view of this ' + context.noun)
    widgets.appendForm(dom, prefContainer, {}, participation, preferencesForm, subject.doc(),
      (ok: boolean, mes: string) => { if (!ok) widgets.complain(context, mes) })

    heading('Everyone\'s  view of this ' + context.noun)
    recordSharedPreferences(subject, context).then((context: any) => {
      var sharedPreferences = context.sharedPreferences
      widgets.appendForm(dom, prefContainer, {}, sharedPreferences, preferencesForm, subject.doc(),
      (ok: boolean, mes: string) => { if (!ok) widgets.complain(context, mes) })

      heading('My default view of any ' + context.noun)
      recordPersonalDefaults(klass, context).then((context: any) => {
        widgets.appendForm(dom, prefContainer, {}, context.personalDefaults, preferencesForm, context.preferencesFile,
        (ok: boolean, mes: string) => { if (!ok) widgets.complain(context, mes) })
      }, err => {
        widgets.complain(context, err)
      })
    })
  }, err => { // parp object fails
    prefContainer.appendChild(widgets.errorMessageBlock(context.dom, err))
  })
  return prefContainer
}

// This should be part of rdflib.js ad part of the RDFJS Standard!!

function toJS (term: any) {
  if (!term.datatype) return term // Objects remain objects
  if (term.datatype.equals(ns.xsd('boolean'))) {
    return term.value === '1'
  }
  if (term.datatype.equals(ns.xsd('dateTime')) ||
    term.datatype.equals(ns.xsd('date'))) {
    return new Date(term.value)
  }
  if (
    term.datatype.equals(ns.xsd('integer')) ||
    term.datatype.equals(ns.xsd('float')) ||
    term.datatype.equals(ns.xsd('decimal'))
  ) {
    return Number(term.value)
  }
  return term.value
}

// This is the function which acuakly reads and combines the preferences
//
//  @@ make it much more tolerant of missing buts of prefernces
function getPreferencesForClass (
  subject: $rdf.NamedNode,
  klass: $rdf.Node,
  predicates: $rdf.NamedNode[],
  context: any
) {
  return new Promise(function (resolve, reject) {
    recordSharedPreferences(subject, context).then((context: any) => {
      var sharedPreferences = context.sharedPreferences
      if (context.me) {
        pad.participationObject(subject, subject.doc(), context.me).then(participation => {
          recordPersonalDefaults(klass, context).then((context: any) => {
            var results: {[index: string]: any} = {};
            var personalDefaults = context.personalDefaults
            predicates.forEach(pred => {
              // Order of preference: My settings on object, Global settings on object, my settings on class
              let v1 = kb.any(participation, pred) || kb.any(sharedPreferences, pred) || kb.any(personalDefaults, pred)
              if (v1) {
                results[pred.uri] = toJS(v1)
              }
            })
            resolve(results)
          }, reject)
        }, reject)
      } else { // no user defined, just use common prefs
        var results: {[index: string]: any} = {};
        predicates.forEach(pred => {
          let v1 = kb.any(sharedPreferences, pred)
          if (v1) {
            results[pred.uri] = toJS(v1)
          }
        })
        resolve(results)
      }
    })
  })
}

// ends

module.exports = preferences
export default preferences