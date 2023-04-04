//                  Solid-UI preferences
//                  =====================
//

import * as $rdf from 'rdflib' // pull in first avoid cross-refs
import { store } from 'solid-logic'
import * as debug from './debug'
import { ensureLoadedPreferences } from './login/login'
import * as ns from './ns'
import * as participation from './participation' // @ts-ignore
import * as widgets from './widgets'

const kb = store

// This was tabulator . preferences in the tabulator
//  Is this functionality used anywhere?
//

// used for storing user name
// @@ Deprocate these functions.  They were used for
// communication around the tabulator functionality about the user session

export const value = []
export function get (k) {
  return value[k]
}

export function set (k, v) {
  if (typeof v !== 'string') {
    debug.log('Non-string value of preference ' + k + ': ' + v)
    throw new Error('Non-string value of preference ' + k + ': ' + v)
  }
  this.value[k] = v
}

// In a solid world, Preferences are stored in the web
//
// Make an RDF node for recording the common view preferences for any object
// (maybe make it in a separate file?)
export function recordSharedPreferences (subject, context) {
  return new Promise(function (resolve, reject) {
    const sharedPreferences = kb.any(subject, ns.ui('sharedPreferences'))
    if (!sharedPreferences) {
      if (!kb.updater.editable(subject.doc())) {
          console.log(` Cant make shared preferences, may not change ${subject.doc}`)
          resolve(context)
      }
      const sp = $rdf.sym(subject.doc().uri + '#SharedPreferences')
      const ins = [
        $rdf.st(subject, ns.ui('sharedPreferences'), sp, subject.doc())
      ]
      debug.log('Creating shared preferences ' + sp)
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
export function recordPersonalDefaults (theClass, context) {
  return new Promise(function (resolve, reject) {
    ensureLoadedPreferences(context).then(
      context => {
        if (!context.preferencesFile) {
          debug.log(
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
        let ins = []
        let prefs
        let reg
        if (regs.length) {
          // Use existing node if we can
          regs.forEach(r => {
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
        } else {
          // no regs fo class
          reg = widgets.newThing(context.preferencesFile)
          ins = [
            $rdf.st(
              reg,
              ns.rdf('type'),
              ns.solid('TypeRegistration'),
              context.preferencesFile
            ),
            $rdf.st(reg, ns.solid('forClass'), theClass, context.preferencesFile)
          ]
        }
        prefs = widgets.newThing(context.preferencesFile)
        ins.push(
          $rdf.st(
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
            context.personalDefaults = prefs
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

export function renderPreferencesForm (subject, theClass, preferencesForm, context) {
  const prefContainer = context.dom.createElement('div')
  participation.participationObject(subject, subject.doc(), context.me).then(
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
        const sharedPreferences = context.sharedPreferences
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

        heading('My default view of any ' + context.noun)
        recordPersonalDefaults(theClass, context).then(
          context => {
            widgets.appendForm(
              dom,
              prefContainer,
              {},
              context.personalDefaults,
              preferencesForm,
              context.preferencesFile,
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
export function getPreferencesForClass (subject, theClass, predicates, context) {
  return new Promise(function (resolve, reject) {
    recordSharedPreferences(subject, context).then(context => {
      const sharedPreferences = context.sharedPreferences
      if (context.me) {
        participation
          .participationObject(subject, subject.doc(), context.me)
          .then(participation => {
            recordPersonalDefaults(theClass, context).then(context => {
              const results = []
              const personalDefaults = context.personalDefaults
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
        const results = []
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
