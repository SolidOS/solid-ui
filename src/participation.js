/** ********************
 *   Solid-ui:  Particpation Widget and RDF data
 *
 * The participation object not only records the fact that
 * the user participated in the thing, it provdes a hook for view
 * to hang user state in the view, nick personal background color,
 * privacy level, nick name for the space, and so on.
 */

/** @module UI.participation
 */

const $rdf = require('rdflib')
var participationModule = (module.exports = {})
var UI = {
  authn: require('./authn/authn'),
  icons: require('./iconBase'),
  log: require('./log'),
  ns: require('./ns'),
  pad: require('./pad'),
  rdf: $rdf,
  store: require('./store'),
  utils: require('./utils'),
  widgets: require('./widgets')
}
const kb = UI.store
const ns = UI.ns
const utils = UI.utils

// Manage participation in this session
//
//
participationModule.renderPartipants = function (dom, table, padDoc, subject, me, options) {
  table.setAttribute('style', 'margin: 0.8em;')

  var newRowForParticpation = function (parp) {
    var person = kb.any(parp, ns.wf('participant'))
    var tr
    if (!person) {
      tr = dom.createElement('tr')
      tr.textContent = '???' // Don't crash - invalid part'n entry
      return tr
    }
    var bg = kb.anyValue(parp, ns.ui('backgroundColor')) || 'white'

    var block = dom.createElement('div')
    block.setAttribute(
      'style',
      'height: 1.5em; width: 1.5em; margin: 0.3em; border 0.01em solid #888; background-color: ' +
        bg
    )
    tr = UI.widgets.personTR(dom, null, person, options)
    table.appendChild(tr)
    var td = dom.createElement('td')
    td.setAttribute('style', 'vertical-align: middle;')
    td.appendChild(block)
    tr.insertBefore(td, tr.firstChild)
    return tr
  }

  var syncTable = function () {
    var parps = kb.each(subject, ns.wf('participation')).map(function (parp) {
      return [kb.anyValue(parp, UI.ns.cal('dtstart')) || '9999-12-31', parp]
    })
    parps.sort() // List in order of joining
    var participations = parps.map(function (p) {
      return p[1]
    })
    utils.syncTableToArray(table, participations, newRowForParticpation)
  }
  table.refresh = syncTable
  syncTable()
  return table
}

/** Record, or find old, Particpation object
 *
 * A particpaption object is a place to record things specifically about
 * subject and the user, such as preferences, start of membership, etc
 * @param {Node} subject - The thing in which the participation is happening
 * @param {NamedNode} document -  Where to record the data
 * @param {NamedNode} me - The logged in user
 *
 */
UI.participationparticipationObject = function (subject, padDoc, me) {
  return new Promise(function (resolve, reject) {
    if (!me) {
      throw new Error('Not user id')
    }

    var parps = kb.each(subject, ns.wf('participation')).filter(function (pn) {
      return kb.holds(pn, ns.wf('participant'), me)
    })
    if (parps.length > 1) {
      throw new Error('Multiple records of your participation')
    }
    if (parps.length) {
      // If I am not already recorded
      resolve(parps[0]) // returns the particpation object
    } else {
      var participation = UI.widgets.newThing(padDoc)
      var ins = [
        UI.rdf.st(subject, ns.wf('participation'), participation, padDoc),

        UI.rdf.st(participation, ns.wf('participant'), me, padDoc),
        UI.rdf.st(participation, ns.cal('dtstart'), new Date(), padDoc),
        UI.rdf.st(
          participation,
          ns.ui('backgroundColor'),
          UI.pad.lightColorHash(me),
          padDoc
        )
      ]
      kb.updater.update([], ins, function (uri, ok, errorMessage) {
        if (!ok) {
          reject(new Error('Error recording your partipation: ' + errorMessage))
        } else {
          resolve(participation)
        }
      })
      resolve(participation)
    }
  })
}

/** Record my participation and display participants
 *
 * @param {NamedNode} subject - the thing in which participation is happening
 * @param {NamedNode} padDoc - The document into which the particpation should be recorded
 * @param {DOMNode} refreshable - A DOM element whose refresh() is to be called if the change works
 *
 */
UI.participationrecordParticipation = function (subject, padDoc, refreshable) {
  var me = UI.authn.currentUser()
  if (!me) return // Not logged in

  var parps = kb.each(subject, ns.wf('participation')).filter(function (pn) {
    return kb.holds(pn, ns.wf('participant'), me)
  })
  if (parps.length > 1) {
    throw new Error('Multiple records of your participation')
  }
  if (parps.length) {
    // If I am not already recorded
    return parps[0] // returns the particpation object
  } else {
    var participation = UI.widgets.newThing(padDoc)
    var ins = [
      UI.rdf.st(subject, ns.wf('participation'), participation, padDoc),

      UI.rdf.st(participation, ns.wf('participant'), me, padDoc),
      UI.rdf.st(participation, UI.ns.cal('dtstart'), new Date(), padDoc),
      UI.rdf.st(
        participation,
        ns.ui('backgroundColor'),
        UI.pad.lightColorHash(me),
        padDoc
      )
    ]
    kb.updater.update([], ins, function (uri, ok, errorMessage) {
      if (!ok) {
        throw new Error('Error recording your partipation: ' + errorMessage)
      }
      if (refreshable && refreshable.refresh) {
        refreshable.refresh()
      }
      // UI.pad.renderPartipants(dom, table, padDoc, subject, me, options)
    })
    return participation
  }
}

// Record my participation and display participants
//
participationModule.manageParticipation = function (
  dom,
  container,
  padDoc,
  subject,
  me,
  options
) {
  var table = dom.createElement('table')
  container.appendChild(table)
  participationModule.renderPartipants(dom, table, padDoc, subject, me, options)
  try {
    participationModule.recordParticipation(subject, padDoc, table)
  } catch (e) {
    container.appendChild(
      UI.widgets.errorMessageBlock(
        dom,
        'Error recording your partipation: ' + e
      )
    ) // Clean up?
  }
  return table
}
