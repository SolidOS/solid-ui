/**
 * Non-UI functions for access control.
 * See https://github.com/solid/web-access-control-spec
 * for the spec that defines how ACL documents work.
 * @packageDocumentation
 */

import * as ns from '../ns'
import { solidLogicSingleton } from '../logic'
import * as utils from '../utils'
import { AgentMapMap, AgentMapUnion, ComboList } from './types'
import * as debug from '../debug'
import { graph, IndexedFormula, NamedNode, serialize, st, Statement, sym } from 'rdflib'
import { LiveStore } from 'pane-registry'
import { ACL_LINK } from 'solid-logic'

const kb = solidLogicSingleton.store

/**
 * Take the "default" ACL and convert it into the equivlent ACL
 * which the resource would have had. Return it as a new separate store.
 * The "defaultForNew" predicate is also accepted, as a deprecated
 * synonym for "default".
 */
export function adoptACLDefault (
  doc: NamedNode,
  aclDoc: NamedNode,
  defaultResource: NamedNode,
  defaultACLDoc: NamedNode
): IndexedFormula {
  const ACL = ns.acl
  const isContainer = doc.uri.slice(-1) === '/' // Give default for all directories

  const defaults = kb
    .each(undefined, ACL('default'), defaultResource, defaultACLDoc)
    .concat(kb.each(undefined, ACL('defaultForNew'), defaultResource, defaultACLDoc))

  const proposed = defaults.reduce((accumulatedStatements, da) => accumulatedStatements
    .concat(kb.statementsMatching(da as NamedNode, ns.rdf('type'), ACL('Authorization'), defaultACLDoc))
    .concat(kb.statementsMatching(da as NamedNode, ACL('agent'), undefined, defaultACLDoc))
    .concat(kb.statementsMatching(da as NamedNode, ACL('agentClass'), undefined, defaultACLDoc))
    .concat(kb.statementsMatching(da as NamedNode, ACL('agentGroup'), undefined, defaultACLDoc))
    .concat(kb.statementsMatching(da as NamedNode, ACL('origin'), undefined, defaultACLDoc))
    .concat(kb.statementsMatching(da as NamedNode, ACL('originClass'), undefined, defaultACLDoc))
    .concat(kb.statementsMatching(da as NamedNode, ACL('mode'), undefined, defaultACLDoc))
    .concat(st(da as NamedNode, ACL('accessTo'), doc, defaultACLDoc))
    .concat(isContainer ? st(da as NamedNode, ACL('default'), doc, defaultACLDoc) : []), [] as Statement[])

  const kb2 = graph() // Potential - derived is kept apart
  proposed.forEach(st => kb2.add(move(st.subject), move(st.predicate), move(st.object), sym(aclDoc.uri)))
  return kb2

  function move (symbol) {
    const y = defaultACLDoc.uri.length // The default ACL file
    return sym(
      symbol.uri.slice(0, y) === defaultACLDoc.uri
        ? aclDoc.uri + symbol.uri.slice(y)
        : symbol.uri
    )
  }
}

/**
 * Read and canonicalize the ACL for x in aclDoc
 *
 * Accumulate the access rights which each agent or class has
 */
export function readACL (
  doc: NamedNode,
  aclDoc: NamedNode,
  kb2: IndexedFormula = kb,
  getDefaults: boolean = false
): AgentMapMap {
  const auths: Array<NamedNode> = getDefaults
    ? getDefaultsFallback(kb2, ns)
    : kb2.each(undefined, ns.acl('accessTo'), doc)

  const ACL = ns.acl
  const ac = {
    agent: {},
    agentClass: {},
    agentGroup: {},
    origin: {},
    originClass: {}
  }
  Object.keys(ac).forEach(pred => {
    auths.forEach(function (a) {
      (kb2.each(a, ACL('mode')) as Array<NamedNode>).forEach(function (mode) {
        (kb2.each(a, ACL(pred)) as Array<NamedNode>).forEach(function (agent) {
          ac[pred][agent.uri] = ac[pred][agent.uri] || {}
          ac[pred][agent.uri][mode.uri] = a // could be "true" but leave pointer just in case
        })
      })
    })
  })
  return ac

  function getDefaultsFallback (kb, ns) {
    return kb
      .each(undefined, ns.acl('default'), doc)
      .concat(kb.each(undefined, ns.acl('defaultForNew'), doc))
  }
}

/**
 * Compare two ACLs
 */
export function sameACL (a: AgentMapMap | AgentMapUnion, b: AgentMapMap | AgentMapUnion): boolean {
  const contains = function (a, b) {
    for (const pred in {
      agent: true,
      agentClass: true,
      agentGroup: true,
      origin: true,
      originClass: true
    }) {
      if (a[pred]) {
        for (const agent in a[pred]) {
          for (const mode in a[pred][agent]) {
            if (!b[pred][agent] || !b[pred][agent][mode]) {
              return false
            }
          }
        }
      }
    }
    return true
  }
  return contains(a, b) && contains(b, a)
}

/**
 * Union N ACLs
 */
export function ACLunion (list: Array<AgentMapMap | AgentMapUnion>): AgentMapUnion {
  const b = list[0]
  let a, ag
  for (let k = 1; k < list.length; k++) {
    ;['agent', 'agentClass', 'agentGroup', 'origin', 'originClass'].forEach(
      function (pred) {
        a = list[k]
        if (a[pred]) {
          for (ag in a[pred]) {
            for (const mode in a[pred][ag]) {
              if (!b[pred][ag]) b[pred][ag] = []
              b[pred][ag][mode] = true
            }
          }
        }
      }
    )
  }
  return b as AgentMapUnion
}

type loadUnionACLCallback = (ok: boolean, message?: string | NamedNode | AgentMapUnion | AgentMapMap) => void

/**
 * Merge ACLs lists from things to form union
 */
export function loadUnionACL (subjectList: Array<NamedNode>, callbackFunction: loadUnionACLCallback): void {
  const aclList: Array<AgentMapMap> = []
  const doList = function (list) {
    if (list.length) {
      const doc = list.shift().doc()
      getACLorDefault(doc, function (
        ok,
        p2,
        targetDoc,
        targetACLDoc,
        defaultHolder,
        defaultACLDoc
      ) {
        const defa = !p2
        if (!ok || !defaultHolder || !defaultACLDoc) return callbackFunction(ok, targetACLDoc)
        const acl = defa
          ? readACL(defaultHolder, defaultACLDoc)
          : readACL(targetDoc as NamedNode, targetACLDoc as NamedNode)
        aclList.push(acl)
        doList(list.slice(1))
      })
    } else {
      // all gone
      callbackFunction(true, ACLunion(aclList))
    }
  }
  doList(subjectList)
}

/**
 * Represents these as an RDF graph by combination of modes
 *
 * Each agent can only be in one place in this model, one combination of modes.
 * Combos are like full control, read append, read only etc.
 */
export function ACLbyCombination (ac: AgentMapMap | AgentMapUnion): ComboList {
  const byCombo = {}
  ;['agent', 'agentClass', 'agentGroup', 'origin', 'originClass'].forEach(function (pred) {
    for (const agent in ac[pred]) {
      const combo: string[] = []
      for (const mode in ac[pred][agent]) {
        combo.push(mode)
      }
      combo.sort()
      const combo2 = combo.join('\n')
      if (!byCombo[combo2]) byCombo[combo2] = []
      byCombo[combo2].push([pred, agent])
    }
  })
  return byCombo
}

/**
 * Write ACL graph to store from AC
 */
export function makeACLGraph (kb: IndexedFormula, x: NamedNode, ac: AgentMapMap, aclDoc: NamedNode): void {
  const byCombo = ACLbyCombination(ac)
  return makeACLGraphbyCombo(kb, x, byCombo, aclDoc)
}

/**
 * Write ACL graph to store from combo
 */
export function makeACLGraphbyCombo (
  kb: IndexedFormula,
  x: NamedNode,
  byCombo: ComboList,
  aclDoc: NamedNode,
  main?: boolean,
  defa?: boolean
): void {
  const ACL = ns.acl
  for (const combo in byCombo) {
    const pairs = byCombo[combo]
    if (!pairs.length) continue // do not add to store when no agent
    const modeURIs = combo.split('\n')
    let short = modeURIs
      .map(function (u) {
        return u.split('#')[1]
      })
      .join('')
    if (defa && !main) short += 'Default' // don't muddle authorizations
    const a = kb.sym(aclDoc.uri + '#' + short)
    kb.add(a, ns.rdf('type'), ACL('Authorization'), aclDoc)
    if (main) {
      kb.add(a, ACL('accessTo'), x, aclDoc)
    }
    if (defa) {
      kb.add(a, ACL('default'), x, aclDoc)
    }
    for (let i = 0; i < modeURIs.length; i++) {
      kb.add(a, ACL('mode'), kb.sym(modeURIs[i]), aclDoc)
    }
    for (let i = 0; i < pairs.length; i++) {
      const pred = pairs[i][0]
      const ag = pairs[i][1]
      kb.add(a, ACL(pred), kb.sym(ag), aclDoc)
    }
  }
}

/**
 * Debugging short strings for dumping ACL
 * and possibly in the UI
 */
export function ACLToString (ac: AgentMapMap): string {
  return comboToString(ACLbyCombination(ac))
}

/**
 * Convert a [[ComboList]] to a string
 */
export function comboToString (byCombo: ComboList): string {
  let str = ''
  for (const combo in byCombo) {
    const modeURIs = combo.split('\n')
    const initials = modeURIs
      .map(function (u) {
        return u.split('#')[1][0]
      })
      .join('')
    str += initials + ':'
    const pairs = byCombo[combo]
    for (let i = 0; i < pairs.length; i++) {
      const pred = pairs[i][0]
      const ag = sym(pairs[i][1])
      str += pred === 'agent' ? '@' : ''
      str += ag.sameTerm(ns.foaf('Agent')) ? '*' : utils.label(ag)
      if (i < pairs.length - 1) str += ','
    }
    str += ';'
  }
  return '{' + str.slice(0, -1) + '}' // drop extra semicolon
}

/**
 * Write ACL graph as Turtle
 */
export function makeACLString (x: NamedNode, ac: AgentMapMap, aclDoc: NamedNode): string {
  const kb2 = graph()
  makeACLGraph(kb2, x, ac, aclDoc)
  return serialize(aclDoc, kb2, aclDoc.uri, 'text/turtle') || ''
}

/**
 * Write ACL graph to web
 */
export function putACLObject (
  kb: LiveStore,
  x: NamedNode,
  ac: AgentMapMap | AgentMapUnion,
  aclDoc: NamedNode,
  callbackFunction: (ok: boolean, message?: string) => void
): void {
  const byCombo = ACLbyCombination(ac)
  return putACLbyCombo(kb, x, byCombo, aclDoc, callbackFunction)
}

/**
 * Write ACL graph to web from a [[ComboList]]
 */
export function putACLbyCombo (
  kb: LiveStore,
  x: NamedNode,
  byCombo: ComboList,
  aclDoc: NamedNode,
  callbackFunction: (ok: boolean, message?: string) => void
): void {
  const kb2 = graph()
  makeACLGraphbyCombo(kb2, x, byCombo, aclDoc, true)

  // const str = makeACLString = function(x, ac, aclDoc)
  kb.updater.put(
    aclDoc,
    kb2.statementsMatching(undefined, undefined, undefined, aclDoc),
    'text/turtle',
    function (uri, ok, message) {
      if (!ok) {
        callbackFunction(ok, message)
      } else {
        kb.fetcher.unload(aclDoc)
        makeACLGraphbyCombo(kb, x, byCombo, aclDoc, true)
        kb.fetcher.requested[aclDoc.uri] = 'done' // missing: save headers
        callbackFunction(ok)
      }
    }
  )
}

type fixIndividualCardACLCallback = (ok: boolean, message?: string | NamedNode | AgentMapUnion | AgentMapMap) => void
type fixIndividualACLCallback = (ok: boolean, message?: string | NamedNode | AgentMapUnion | AgentMapMap) => void

/**
 * Fix the ACl for an individual card as a function of the groups it is in
 *
 * All group files must be loaded first
 */
export function fixIndividualCardACL (person: NamedNode, log: Function, callbackFunction: fixIndividualCardACLCallback): void {
  const groups = kb.each(undefined, ns.vcard('hasMember'), person) as NamedNode[]
  // const doc = person.doc()
  if (groups) {
    fixIndividualACL(person, groups, log, callbackFunction)
  } else {
    log('This card is in no groups')
    callbackFunction(true) // fine, no requirements to access. default should be ok
  }
  // @@ if no groups, then use default for People container or the book top container.?
}

/**
 * This function is used by [[fixIndividualCardACL]]
 */
export function fixIndividualACL (item: NamedNode, subjects: Array<NamedNode>, log: Function, callbackFunction: fixIndividualACLCallback): void {
  log = log || debug.log
  const doc = item.doc()
  getACLorDefault(doc, function (
    ok,
    exists,
    targetDoc,
    targetACLDoc,
    defaultHolder,
    defaultACLDoc
  ) {
    if (!ok || !defaultHolder || !defaultACLDoc) return callbackFunction(false, targetACLDoc) // ie message
    const ac = exists
      ? readACL(targetDoc as NamedNode, targetACLDoc as NamedNode)
      : readACL(defaultHolder, defaultACLDoc)
    loadUnionACL(subjects, function (ok, union) {
      if (!ok) return callbackFunction(false, union)
      if (sameACL(union as AgentMapMap | AgentMapUnion, ac)) {
        log('Nice - same ACL. no change ' + utils.label(item) + ' ' + doc)
      } else {
        log('Group ACLs differ for ' + utils.label(item) + ' ' + doc)

        // log("Group ACLs: " + makeACLString(targetDoc, union, targetACLDoc))
        // log((exists ? "Previous set" : "Default") + " ACLs: " +
        // makeACLString(targetDoc, ac, targetACLDoc))

        putACLObject(
          kb as unknown as LiveStore,
          targetDoc as NamedNode,
          union as AgentMapMap | AgentMapUnion,
          targetACLDoc as NamedNode,
          callbackFunction
        )
      }
    })
  })
}

/**
 * Set an ACL
 */
export function setACL (
  docURI: NamedNode,
  aclText: string,
  callbackFunction: (ok: boolean, message: string) => void
): void {
  const aclDoc = kb.any(
    docURI,
    ACL_LINK
  ) // @@ check that this get set by web.js
  if (!kb.fetcher) {
    throw new Error('Store has no fetcher')
  }
  if (aclDoc) {
    // Great we already know where it is
    kb.fetcher
      .webOperation('PUT', aclDoc.value, {
        data: aclText,
        contentType: 'text/turtle'
      })
      .then((res) => {
        callbackFunction(res.ok, res.error || '')
      }) // @@@ check params
  } else {
    kb.fetcher.nowOrWhenFetched(docURI, undefined, function (ok, body) {
      if (!ok) return callbackFunction(ok, 'Gettting headers for ACL: ' + body)
      const aclDoc = kb.any(
        docURI,
        ACL_LINK
      ) // @@ check that this get set by web.js
      if (!aclDoc) {
        // complainIfBad(false, "No Link rel=ACL header for " + docURI)
        callbackFunction(false, 'No Link rel=ACL header for ' + docURI)
      } else {
        if (!kb.fetcher) {
          throw new Error('Store has no fetcher')
        }
        kb.fetcher
          .webOperation('PUT', aclDoc.value, {
            data: aclText,
            contentType: 'text/turtle'
          })
          .then((res) => {
            callbackFunction(res.ok, res.error || '')
          })
      }
    })
  }
}

/**
 * Get ACL file or default if necessary
 *
 * @param callbackFunction  Will be called in the following ways, in the following cases:
 * * `callbackFunction(true, true, doc, aclDoc)` if the ACL did exist
 * * `callbackFunction(true, false, doc, aclDoc, defaultHolder, defaultACLDoc)` if the ACL file did not exist but a default did
 * * `callbackFunction(false, false, status, message)` when there was an error getting the original
 * * `callbackFunction(false, true, status, message)` when there was an error getting the default
 */
export function getACLorDefault (
  doc: NamedNode,
  callbackFunction: (
    a: boolean,
    b: boolean,
    statusOrMessage: number | NamedNode,
    message: string | NamedNode,
    c?: NamedNode,
    d?: NamedNode
  ) => void
): void {
  getACL(doc, function (ok, status, aclDoc, message): string | void {
    const ACL = ns.acl
    if (!ok) return callbackFunction(false, false, status as number, message as string)

    // Recursively search for the ACL file which gives default access
    const tryParent = function (uri) {
      if (uri.slice(-1) === '/') {
        uri = uri.slice(0, -1)
      }
      const right = uri.lastIndexOf('/')
      const left = uri.indexOf('/', uri.indexOf('//') + 2)
      if (left > right) {
        return callbackFunction(false, true, 404, 'Found no ACL resource')
      }
      uri = uri.slice(0, right + 1)
      const doc2 = sym(uri)
      getACL(doc2, function (ok, status, defaultACLDoc: any): NamedNode | void {
        if (!ok) {
          return callbackFunction(
            false,
            true,
            status as number,
            `( No ACL pointer ${uri} ${status})${defaultACLDoc}`
          ) as void
        } else if (status === 403) {
          return callbackFunction(
            false,
            true,
            status,
            `( default ACL file FORBIDDEN. Stop.${uri})`
          )
        } else if (status === 404) {
          return tryParent(uri)
        } else if (status !== 200) {
          return callbackFunction(
            false,
            true,
            status as number,
            `Error status '${status}' searching for default for ${doc2}`
          )
        }
        // 200
        // statusBlock.textContent += (" ACCESS set at " + uri + ". End search.")
        const defaults = kb
          .each(undefined, ACL('default'), kb.sym(uri), defaultACLDoc)
          .concat(
            kb.each(undefined, ACL('defaultForNew'), kb.sym(uri), defaultACLDoc)
          )
        if (!defaults.length) {
          return tryParent(uri) // Keep searching
        }
        const defaultHolder = kb.sym(uri)
        return callbackFunction(
          true,
          false,
          doc,
          aclDoc as NamedNode,
          defaultHolder,
          defaultACLDoc as NamedNode
        )
      })
    } // tryParent

    if (!ok) {
      return callbackFunction(
        false,
        false,
        status as number,
        `Error accessing Access Control information for ${doc}) ${message}`
      )
    } else if (status === 404) {
      tryParent(doc.uri) //  @@ construct default one - the server should do that
    } else if (status === 403) {
      return callbackFunction(
        false,
        false,
        status,
        `(Sharing not available to you)${message}`
      )
    } else if (status !== 200) {
      return callbackFunction(
        false,
        false,
        status as number,
        `Error ${status} accessing Access Control information for ${doc}: ${message}`
      )
    } else {
      // 200
      return callbackFunction(true, true, doc, aclDoc as NamedNode)
    }
  }) // Call to getACL
}

/**
 * Calls back `(ok, status, acldoc, message)` as follows
 *
 * * `(false, 900, errormessage)` if no link header
 * * `(true, 403, documentSymbol, fileaccesserror)` if not authorized
 * * `(true, 404, documentSymbol, fileaccesserror)` if does not exist
 * * `(true, 200, documentSymbol)` if file exists and read OK
 */
export function getACL (
  doc: NamedNode,
  callbackFunction: (
    ok: boolean,
    messageOrStatus: number | string,
    messageOrDoc?: NamedNode | string,
    message?: string
  ) => void
): void {
  if (!kb.fetcher) {
    throw new Error('kb has no fetcher')
  }
  kb.fetcher.nowOrWhenFetched(doc, undefined, function (ok, body) {
    if (!ok) {
      return callbackFunction(ok, `Can't get headers to find ACL for ${doc}: ${body}`)
    }
    const aclDoc = kb.any(
      doc,
      ACL_LINK
    ) // @@ check that this get set by web.js
    if (!aclDoc) {
      callbackFunction(false, 900, `No Link rel=ACL header for ${doc}`)
    } else {
      if (!kb.fetcher) {
        throw new Error('kb has no fetcher')
      }
      if (kb.fetcher.nonexistent[aclDoc.value]) {
        return callbackFunction(
          true,
          404,
          aclDoc as NamedNode,
          `ACL file ${aclDoc} does not exist.`
        )
      }
      kb.fetcher.nowOrWhenFetched(aclDoc as NamedNode, undefined, function (
        ok,
        message,
        response
      ) {
        if (!ok) {
          callbackFunction(
            true,
            response.status,
            aclDoc as NamedNode,
            `Can't read Access Control File ${aclDoc}: ${message}`
          )
        } else {
          callbackFunction(true, 200, aclDoc as NamedNode)
        }
      })
    }
  })
}

/**
 * Calls [[getACLorDefault]] and then (?)
 */
export async function getProspectiveHolder (targetDirectory: string): Promise<NamedNode | undefined> {
  return new Promise((resolve, reject) => getACLorDefault(sym(targetDirectory), (
    ok,
    isDirectACL,
    targetDoc,
    targetACLDoc,
    defaultHolder
  ) => {
    if (ok) {
      return resolve((isDirectACL ? targetDoc : defaultHolder) as NamedNode)
    }
    return reject(new Error(`Error loading ${targetDirectory}`))
  }))
}
