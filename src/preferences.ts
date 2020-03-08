/* global $rdf */
//                  Solid-UI temporary preferences
//                  ==============================
//

import { st, sym } from 'rdflib'
import kb from './store'
import ns from './ns'
import { logInLoadPreferences } from './authn/authn'
import widgets from './widgets'
import { participationObject } from './participation'

// This was tabulator . preferences in the tabulator
//
module.exports = {
  // used for storing user name
  value: [],
  get: function (k) {
    // original
    return this.value[k]
  },
  set: function (k, v) {
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
function recordSharedPreferences (subject, context) {
  return new Promise(function (resolve, reject) {
    const sharedPreferences = kb.any(subject, ns.ui('sharedPreferences'))
    if (!sharedPreferences) {
      const sp = sym(subject.doc().uri + '#SharedPreferences')
      const ins = [
        st(subject, ns.ui('sharedPreferences'), sp, subject.doc())
      ]
      console.log('Creating shared preferences ' + sp)
      kb.updater.update([], ins, function (uri, ok, errorMessage) {
        if (!ok) {
          reject(new Error('Error creating shared prefs: ' + errorMessage))
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
function recordPersonalDefaults (theClass, context) {
  return new Promise(function (resolve, reject) {
    logInLoadPreferences(context).then(
      context => {
        if (!context.preferencesFile) {
          console.log(
            'Not doing private class preferences as no access to preferences file. ' +
            context.preferencesFileError
          )
          return
        }
        const regs = kb.each(
          null,
          ns.solid('forClass'),
          theClass,
          context.preferencesFile
        )
        let ins: any = []
        let prefs
        let reg
        if (regs.length) {
          // Use existing node if we can
          regs.forEach(r => {
            prefs = prefs || kb.any(r, ns.solid('personalDefaults'))
          })
          if (prefs) {
            (context as any).personalDefaults = prefs // Found one
            resolve(context)
            return
          } else {
            prefs = widgets.newThing(context.preferencesFile)
            reg = regs[0]
          }
        } else {
          // no regs fo class
          reg = widgets.newThing(context.preferencesFile)
          ins = [
            st(
              reg,
              ns.rdf('type'),
              ns.solid('TypeRegistration'),
              context.preferencesFile
            ),
            st(reg, ns.solid('forClass'), theClass, context.preferencesFile)
          ]
        }
        prefs = widgets.newThing(context.preferencesFile)
        ins.push(
          st(
            reg,
            ns.solid('personalDefaults'),
            prefs,
            context.preferencesFile
          )
        )
        kb.updater.update([], ins, function (uri, ok, errm) {
          if (!ok) {
            reject(new Error('Setting preferences for ' + theClass + ': ' + errm))
          } else {
            (context as any).personalDefaults = prefs
            resolve(context)
          }
        })
      },
      err => {
        reject(err)
      }
    )
  })
}

function renderPreferencesForm (subject, theClass, preferencesForm, context) {
  var prefContainer = context.dom.createElement('div')
  participationObject(subject, subject.doc(), context.me).then(
    participation => {
      const dom = context.dom
      function heading (text) {
        prefContainer.appendChild(dom.createElement('h5')).textContent = text
      }
      heading('My view of this ' + context.noun)
      widgets.appendForm(
        dom,
        prefContainer,
        {},
        participation,
        preferencesForm,
        subject.doc(),
        (ok, mes) => {
          if (!ok) widgets.complain(context, mes)
        }
      )

      heading("Everyone's  view of this " + context.noun)
      recordSharedPreferences(subject, context).then(context => {
        const sharedPreferences = (context as any).sharedPreferences
        widgets.appendForm(
          dom,
          prefContainer,
          {},
          sharedPreferences,
          preferencesForm,
          subject.doc(),
          (ok, mes) => {
            if (!ok) widgets.complain(context, mes)
          }
        )

        heading('My default view of any ' + (context as any).noun)
        recordPersonalDefaults(theClass, context).then(
          context => {
            widgets.appendForm(
              dom,
              prefContainer,
              {},
              (context as any).personalDefaults,
              preferencesForm,
              (context as any).preferencesFile,
              (ok, mes) => {
                if (!ok) widgets.complain(context, mes)
              }
            )
          },
          err => {
            widgets.complain(context, err)
          }
        )
      })
    },
    err => {
      // parp object fails
      prefContainer.appendChild(widgets.errorMessageBlock(context.dom, err))
    }
  )
  return prefContainer
}

// This should be part of rdflib.js ad part of the RDFJS Standard!!

function toJS (term) {
  if (!term.datatype) return term // Objects remain objects
  if (term.datatype.equals(ns.xsd('boolean'))) {
    return term.value === '1'
  }
  if (
    term.datatype.equals(ns.xsd('dateTime')) ||
    term.datatype.equals(ns.xsd('date'))
  ) {
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
function getPreferencesForClass (subject, theClass, predicates, context: any) {
  return new Promise(function (resolve, reject) {
    recordSharedPreferences(subject, context).then(context => {
      const sharedPreferences = (context as any).sharedPreferences
      if ((context as any).me) {
        participationObject(subject, subject.doc(), (context as any).me)
          .then(participation => {
            recordPersonalDefaults(theClass, context).then(context => {
              const results: any = []
              const personalDefaults = (context as any).personalDefaults
              predicates.forEach(pred => {
                // Order of preference: My settings on object, Global settings on object, my settings on class
                const v1 =
                  kb.any(participation, pred) ||
                  kb.any(sharedPreferences, pred) ||
                  kb.any(personalDefaults, pred)
                if (v1) {
                  results[pred.uri] = toJS(v1)
                }
              })
              resolve(results)
            }, reject)
          }, reject)
      } else {
        // no user defined, just use common prefs
        const results: any = []
        predicates.forEach(pred => {
          const v1 = kb.any(sharedPreferences, pred)
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
