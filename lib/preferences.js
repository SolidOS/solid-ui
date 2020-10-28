"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var debug = _interopRequireWildcard(require("./debug"));

//                  Solid-UI temporary preferences
//                  ==============================
//
var kb = require('./store');

var ns = require('./ns');

var authn = require('./authn/authn');

var widgets = require('./widgets');

var pad = require('./pad');

var participation = require('./participation');

var $rdf = require('rdflib'); // This was tabulator . preferences in the tabulator
//


module.exports = {
  // used for storing user name
  value: [],
  get: function get(k) {
    // original
    return this.value[k];
  },
  set: function set(k, v) {
    if (typeof v !== 'string') {
      debug.log('Non-string value of preference ' + k + ': ' + v);
      throw new Error('Non-string value of preference ' + k + ': ' + v);
    }

    this.value[k] = v;
  },
  renderPreferencesForm: renderPreferencesForm,
  recordSharedPreferences: recordSharedPreferences,
  getPreferencesForClass: getPreferencesForClass
}; // In a solid world, Preferences are stored in the web
//
// Make an RDF node for recording the common view preferences for any object
// (maybe make it in a separate file?)

function recordSharedPreferences(subject, context) {
  return new Promise(function (resolve, reject) {
    var sharedPreferences = kb.any(subject, ns.ui('sharedPreferences'));

    if (!sharedPreferences) {
      var sp = $rdf.sym(subject.doc().uri + '#SharedPreferences');
      var ins = [$rdf.st(subject, ns.ui('sharedPreferences'), sp, subject.doc())];
      debug.log('Creating shared preferences ' + sp);
      kb.updater.update([], ins, function (uri, ok, errorMessage) {
        if (!ok) {
          reject(new Error('Error creating shared prefs: ' + errorMessage));
        } else {
          context.sharedPreferences = sp;
          resolve(context);
        }
      });
    } else {
      context.sharedPreferences = sharedPreferences;
      resolve(context);
    }
  });
} // Construct a personal defaults node in the preferences file for a given class of object
//


function recordPersonalDefaults(theClass, context) {
  return new Promise(function (resolve, reject) {
    authn.logInLoadPreferences(context).then(function (context) {
      if (!context.preferencesFile) {
        debug.log('Not doing private class preferences as no access to preferences file. ' + context.preferencesFileError);
        return;
      }

      var regs = kb.each(null, ns.solid('forClass'), theClass, context.preferencesFile);
      var ins = [];
      var prefs;
      var reg;

      if (regs.length) {
        // Use existing node if we can
        regs.forEach(function (r) {
          prefs = prefs || kb.any(r, ns.solid('personalDefaults'));
        });

        if (prefs) {
          context.personalDefaults = prefs; // Found one

          resolve(context);
          return;
        } else {
          prefs = widgets.newThing(context.preferencesFile);
          reg = regs[0];
        }
      } else {
        // no regs fo class
        reg = widgets.newThing(context.preferencesFile);
        ins = [$rdf.st(reg, ns.rdf('type'), ns.solid('TypeRegistration'), context.preferencesFile), $rdf.st(reg, ns.solid('forClass'), theClass, context.preferencesFile)];
      }

      prefs = widgets.newThing(context.preferencesFile);
      ins.push($rdf.st(reg, ns.solid('personalDefaults'), prefs, context.preferencesFile));
      kb.updater.update([], ins, function (uri, ok, errm) {
        if (!ok) {
          reject(new Error('Setting preferences for ' + theClass + ': ' + errm));
        } else {
          context.personalDefaults = prefs;
          resolve(context);
        }
      });
    }, function (err) {
      reject(err);
    });
  });
}

function renderPreferencesForm(subject, theClass, preferencesForm, context) {
  var prefContainer = context.dom.createElement('div');
  participation.participationObject(subject, subject.doc(), context.me).then(function (participation) {
    var dom = context.dom;

    function heading(text) {
      prefContainer.appendChild(dom.createElement('h5')).textContent = text;
    }

    heading('My view of this ' + context.noun);
    widgets.appendForm(dom, prefContainer, {}, participation, preferencesForm, subject.doc(), function (ok, mes) {
      if (!ok) widgets.complain(context, mes);
    });
    heading("Everyone's  view of this " + context.noun);
    recordSharedPreferences(subject, context).then(function (context) {
      var sharedPreferences = context.sharedPreferences;
      widgets.appendForm(dom, prefContainer, {}, sharedPreferences, preferencesForm, subject.doc(), function (ok, mes) {
        if (!ok) widgets.complain(context, mes);
      });
      heading('My default view of any ' + context.noun);
      recordPersonalDefaults(theClass, context).then(function (context) {
        widgets.appendForm(dom, prefContainer, {}, context.personalDefaults, preferencesForm, context.preferencesFile, function (ok, mes) {
          if (!ok) widgets.complain(context, mes);
        });
      }, function (err) {
        widgets.complain(context, err);
      });
    });
  }, function (err) {
    // parp object fails
    prefContainer.appendChild(widgets.errorMessageBlock(context.dom, err));
  });
  return prefContainer;
} // This should be part of rdflib.js ad part of the RDFJS Standard!!


function toJS(term) {
  if (!term.datatype) return term; // Objects remain objects

  if (term.datatype.equals(ns.xsd('boolean'))) {
    return term.value === '1';
  }

  if (term.datatype.equals(ns.xsd('dateTime')) || term.datatype.equals(ns.xsd('date'))) {
    return new Date(term.value);
  }

  if (term.datatype.equals(ns.xsd('integer')) || term.datatype.equals(ns.xsd('float')) || term.datatype.equals(ns.xsd('decimal'))) {
    return Number(term.value);
  }

  return term.value;
} // This is the function which acuakly reads and combines the preferences
//
//  @@ make it much more tolerant of missing buts of prefernces


function getPreferencesForClass(subject, theClass, predicates, context) {
  return new Promise(function (resolve, reject) {
    recordSharedPreferences(subject, context).then(function (context) {
      var sharedPreferences = context.sharedPreferences;

      if (context.me) {
        participation.participationObject(subject, subject.doc(), context.me).then(function (participation) {
          recordPersonalDefaults(theClass, context).then(function (context) {
            var results = [];
            var personalDefaults = context.personalDefaults;
            predicates.forEach(function (pred) {
              // Order of preference: My settings on object, Global settings on object, my settings on class
              var v1 = kb.any(participation, pred) || kb.any(sharedPreferences, pred) || kb.any(personalDefaults, pred);

              if (v1) {
                results[pred.uri] = toJS(v1);
              }
            });
            resolve(results);
          }, reject);
        }, reject);
      } else {
        // no user defined, just use common prefs
        var results = [];
        predicates.forEach(function (pred) {
          var v1 = kb.any(sharedPreferences, pred);

          if (v1) {
            results[pred.uri] = toJS(v1);
          }
        });
        resolve(results);
      }
    });
  });
} // ends
//# sourceMappingURL=preferences.js.map