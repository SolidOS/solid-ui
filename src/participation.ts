/* Manage a UI for the participation of a person in any thing
*/

// import { currentUser } from './authn/authn'
import * as debug from './debug'
import { LiveStore, NamedNode, st, UpdateManager } from 'rdflib'
import * as ns from './ns'
import { personTR, newThing, errorMessageBlock } from './widgets'
import { syncTableToArray } from './utils'
import { lightColorHash } from './pad'
import { log } from './debug'
import * as style from './style'
import styleConstants from './styleConstants'
import { solidLogicSingleton, authn } from 'solid-logic'

type ParticipationOptions = {
  deleteFunction?: () => {}
  link?: string
  draggable?: boolean
}

class ParticipationTableElement extends HTMLTableElement {
  refresh?: () => void
}
const store = solidLogicSingleton.store as LiveStore

/**  Manage participation in this session
*
*  @param {Document} dom - the web page loaded into the browser
*  @param {HTMLTableElement} table - the table element
*  @param {NamedNode} unused1/document - the document to render (this argument is no longer used, but left in for backwards compatibility)
*  @param {NamedNode} subject - the thing in which the participation is happening
*  @param {NamedNode} unused2/me - user that is logged into the pod (this argument is no longer used, but left in for backwards compatibility)
*  @param {ParticipationOptions} options - the options that can be passed in are deleteFunction, link, and draggable; these are used by the personTR button
*/
export function renderParticipants (dom: HTMLDocument, table: ParticipationTableElement, unused1: NamedNode, subject: NamedNode, unused2: NamedNode, options: ParticipationOptions) {
  table.setAttribute('style', style.participantsStyle)

  const newRowForParticipation = function (parp) {
    const person = store.any(parp, ns.wf('participant'))

    let tr
    if (!person) {
      tr = dom.createElement('tr')
      tr.textContent = '???' // Don't crash - invalid part'n entry
      return tr
    }
    const bg = store.anyValue(parp, ns.ui('backgroundColor')) || styleConstants.participationDefaultBackground

    const block = dom.createElement('div')
    block.setAttribute(
      'style', style.participantsBlock)
    block.style.backgroundColor = bg

    tr = personTR(dom, null, person, options)
    table.appendChild(tr)
    const td = dom.createElement('td')
    td.setAttribute('style', style.personTableTD)
    td.appendChild(block)
    tr.insertBefore(td, tr.firstChild)
    return tr
  }

  const syncTable = function () {
    const parps = store.each(subject, ns.wf('participation')).map(function (parp) {
      log('in participants')
      return [store.anyValue(parp as any, ns.cal('dtstart')) || '9999-12-31', parp]
    })
    parps.sort() // List in order of joining
    const participations = parps.map(function (p) {
      return p[1]
    })
    syncTableToArray(table, participations, newRowForParticipation)
  }
  table.refresh = syncTable
  syncTable()
  return table
}

/** Record, or find old, Participation object
 *
 * A participation object is a place to record things specifically about
 * subject and the user, such as preferences, start of membership, etc
 * @param {NamedNode} subject - the thing in which the participation is happening
 * @param {NamedNode} document -  where to record the data
 * @param {NamedNode} me - the logged in user
 *
 */
export function participationObject (subject: NamedNode, padDoc: NamedNode, me: NamedNode) {
  return new Promise(function (resolve, reject) {
    if (!me) {
      throw new Error('No user id')
    }

    const parps = store.each(subject, ns.wf('participation')).filter(function (pn) {
      return store.holds(pn, ns.wf('participant'), me)
    })
    if (parps.length > 1) { // This can happen. https://github.com/solidos/chat-pane/issues/71
      const candidates: (string | NamedNode) [][] = []
      for (const participation of parps) {
        const date = store.anyValue(participation as NamedNode, ns.cal('dtstart'))
        if (date) {
          candidates.push([date, participation as NamedNode])
        }
      }
      candidates.sort() // Pick the earliest
      // @@ Possibly, for extra credit, delete the others, if we have write access
      debug.warn('Multiple participation objects, picking earliest, in ' + padDoc)
      resolve(candidates[0][1])
      // throw new Error('Multiple records of your participation')
    }
    if (parps.length) {
      // If I am not already recorded
      resolve(parps[0]) // returns the participation object
    } else {
      const participation = newThing(padDoc)
      const ins = [
        st(subject, ns.wf('participation'), participation, padDoc),

        st(participation, ns.wf('participant'), me, padDoc),
        st(participation, ns.cal('dtstart'), new Date() as any, padDoc),
        st(
          participation,
          ns.ui('backgroundColor'),
          lightColorHash(me) as any,
          padDoc
        )
      ];
      (store.updater as UpdateManager).update([], ins, function (uri: string | null | undefined, ok: boolean, errorMessage?: string) {
        if (!ok) {
          reject(new Error('Error recording your participation: ' + errorMessage))
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
 * @param {NamedNode} padDoc - the document into which the participation should be recorded
 * @param {DOMNode} refreshable - a DOM element whose refresh() is to be called if the change works
 *
 */
export function recordParticipation (subject: NamedNode, padDoc: NamedNode, refreshable: any) {
  const me = authn.currentUser()
  if (!me) return // Not logged in

  const parps = store.each(subject, ns.wf('participation')).filter(function (pn) {
    return store.holds(pn, ns.wf('participant'), me)
  })
  if (parps.length > 1) {
    throw new Error('Multiple records of your participation')
  }
  if (parps.length) {
    // If I am not already recorded
    return parps[0] // returns the participation object
  } else {
    if (!(store.updater as UpdateManager).editable(padDoc)) {
      debug.log('Not recording participation, as no write access as ' + me + ' to ' + padDoc)
      return null
    }
    const participation = newThing(padDoc)
    const ins = [
      st(subject, ns.wf('participation'), participation, padDoc),

      st(participation, ns.wf('participant'), me, padDoc),
      st(participation, ns.cal('dtstart'), new Date() as any, padDoc),
      st(
        participation,
        ns.ui('backgroundColor'),
        lightColorHash(me) as any,
        padDoc
      )
    ];
    (store.updater as UpdateManager).update([], ins, function (uri: string | null | undefined, ok: boolean, errorMessage?: string) {
      if (!ok) {
        throw new Error('Error recording your participation: ' + errorMessage)
      }
      if (refreshable && refreshable.refresh) {
        refreshable.refresh()
      }
    })
    return participation
  }
}

/**  Record my participation and display participants
*
*   @param {Document} dom  - the web page loaded into the browser
*   @param {HTMLDivElement} container - the container element where the participants should be displayed
*   @param {NamedNode} document - the document into which the participation should be shown
*   @param {NamedNode} subject - the thing in which participation is happening
*   @param {NamedNode} me - the logged in user
*   @param {ParticipationOptions} options - the options that can be passed in are deleteFunction, link, and draggable; these are used by the personTR button
*
*/
export function manageParticipation (
  dom: Document,
  container: HTMLDivElement,
  padDoc: NamedNode,
  subject: NamedNode,
  me: NamedNode,
  options: ParticipationOptions
) {
  const table = dom.createElement('table')
  container.appendChild(table)
  renderParticipants(dom, table, padDoc, subject, me, options)
  let _participation
  try {
    _participation = recordParticipation(subject, padDoc, table)
  } catch (e) {
    container.appendChild(
      errorMessageBlock(
        dom,
        'Error recording your participation: ' + e
      )
    ) // Clean up?
  }
  return table
}
