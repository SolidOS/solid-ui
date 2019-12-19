// ///////////////////////////// ACL User Interface

// See https://www.coshx.com/blog/2014/04/11/preventing-drag-and-drop-disasters-with-a-chrome-userscript/
// Without this dropping anything onto a browser page will cause chrome etc to jump to diff page
// throwing away all the user's work.

import ns from '../ns'
import utils from '../utils.js'
import { ACLbyCombination, adoptACLDefault, getACLorDefault, makeACLGraphbyCombo, readACL, sameACL } from './acl'
import widgets from '../widgets'
import icons from '../iconBase.js'
import { graph, IndexedFormula, NamedNode, sym, UpdateManager } from 'rdflib'
import { DataBrowserContext } from 'pane-registry'
import { logInLoadProfile } from '../authn/authn'

// constants used in this module
const COLLOQUIAL = {
  13: 'Owners',
  9: 'Owners (write locked)',
  5: 'Editors',
  3: 'Posters',
  2: 'Submitters',
  1: 'Viewers'
}
const RECOMMENDED = {
  13: true,
  5: true,
  3: true,
  2: true,
  1: true
}
const EXPLANATION = {
  13: 'can read, write, and control sharing.',
  9: 'can read and control sharing, currently write-locked.',
  5: 'can read and change information',
  3: 'can add new information, and read but not change existing information',
  2: 'can add new information but not read any',
  1: 'can read but not change information'
}
const KTOCOLOR = {
  13: 'purple',
  9: 'blue',
  5: 'red',
  3: 'orange',
  2: '#cc0',
  1: 'green'
}

// In apps which may use drag and drop, this utility takes care of the fact
// by default in a browser, an uncuaght user drop into a browser window
// causes the bowser to lose all its work in tat window and navigate to another page
export function preventBrowserDropEvents (document: HTMLDocument): void {
  console.log('preventBrowserDropEvents called.')
  const global: any = window
  if (typeof global !== 'undefined') {
    if (global.preventBrowserDropEventsDone) return
    global.preventBrowserDropEventsDone = true
  }

  document.addEventListener('drop', handleDrop, false)
  document.addEventListener('dragenter', preventDrag, false)
  document.addEventListener('dragover', preventDrag, false)

  function preventDrag (e) {
    e.stopPropagation()
    e.preventDefault()
  }

  function handleDrop (e) {
    if (e.dataTransfer.files.length > 0) {
      if (!confirm('Are you sure you want to drop this file here? (Cancel opens it in a new tab)')) {
        e.stopPropagation()
        e.preventDefault()
        console.log(`@@@@ document-level DROP suppressed: ${e.dataTransfer.dropEffect}`)
      }
    }
  }
}

export function shortNameForFolder (x: NamedNode): string {
  let str = x.uri
  if (str.slice(-1) === '/') {
    str = str.slice(0, -1)
  }
  const slash = str.lastIndexOf('/')
  if (slash >= 0) {
    str = str.slice(slash + 1)
  }
  return str || '/'
}

export function ACLControlBox5 (
  subject: NamedNode,
  context: DataBrowserContext,
  noun: string,
  kb: IndexedFormula
): HTMLElement {
  const dom = context.dom
  const ACL = ns.acl
  const doc = subject.doc() // The ACL is actually to the doc describing the thing

  const table = dom.createElement('table')
  table.setAttribute('style', 'margin: 1em; border: 0.1em #ccc ;')
  const headerRow = table.appendChild(dom.createElement('tr'))
  headerRow.textContent = `Sharing for ${noun} ${utils.label(subject)}`
  headerRow.setAttribute('style', 'min-width: 20em; padding: 1em; font-size: 120%; border-bottom: 0.1em solid red; margin-bottom: 2em;')

  const statusRow = table.appendChild(dom.createElement('tr'))

  const statusCell = statusRow.appendChild(dom.createElement('td'))
  const statusBlock = statusCell.appendChild(dom.createElement('div'))
  statusBlock.setAttribute('style', 'padding: 2em;')
  const MainRow = table.appendChild(dom.createElement('tr'))
  const box: any = MainRow.appendChild(dom.createElement('table'))
  const bottomRow = table.appendChild(dom.createElement('tr'))

  // A world button can be dragged to gve public access.
  // later, allow it to be pressed to make publicly viewable?
  const bottomLeftCell = bottomRow.appendChild(dom.createElement('td'))
  // const bottomMiddleCell = bottomRow.appendChild(dom.createElement('td'))
  const bottomRightCell = bottomRow.appendChild(dom.createElement('td'))

  // const publicAccessButton = bottomLeftCell.appendChild(widgets.button(dom, icons.iconBase + 'noun_98053.svg', 'Public'))

  const bigButtonStyle = 'border-radius: 0.3em; background-color: white; border: 0.1em solid #888;'

  renderBox()
  return table

  // This is the main function which produces an editable access control.
  // There are two of these in all iff the defaults are separate
  type ACLControlEditableOptions = {
    doingDefaults?: boolean,
    modify?: boolean
  }

  function ACLControlEditable (box, doc, aclDoc, store, options: ACLControlEditableOptions = {}) {
    const ac = readACL(doc, aclDoc, store, options.doingDefaults) // Note store might not be normal one
    const byCombo = ACLbyCombination(ac)

    box.saveBack = saveBack

    let k, combo, lastRow
    for (k = 15; k > 0; k--) {
      combo = kToCombo(k)
      if ((options.modify && RECOMMENDED[k]) || byCombo[combo]) {
        lastRow = renderCombo(byCombo, combo)
      } // if
    } // for

    if (options.modify) {
      renderAddToolBar(box, lastRow)
    }

    return byCombo

    function saveBack (callback) {
      const storeToSave = graph()
      if (!box.isContainer) {
        makeACLGraphbyCombo(storeToSave, doc, box.mainByCombo, aclDoc, true)
      } else if (box.defaultsDiffer) {
        // Pair of controls
        makeACLGraphbyCombo(storeToSave, doc, box.mainByCombo, aclDoc, true)
        makeACLGraphbyCombo(storeToSave, doc, box.defByCombo, aclDoc, false, true)
      } else {
        // Linked controls
        makeACLGraphbyCombo(storeToSave, doc, box.mainByCombo, aclDoc, true, true)
      }
      const updater = storeToSave.updater || new UpdateManager(storeToSave)
      const data = storeToSave.statementsMatching(undefined, undefined, undefined, aclDoc)
      updater.put(aclDoc, data, 'text/turtle', (uri, ok, message) => {
        let error = ''
        if (!ok) {
          error = 'ACL file save failed: ' + message
          console.error(error)
        } else {
          store.fetcher.unload(aclDoc)
          store.add(storeToSave.statements)
          store.fetcher.requested[aclDoc.uri] = 'done' // missing: save headers
          console.log('ACL modification: success!')
        }
        callback(ok, error)
      })
    }

    function renderCombo (byCombo, combo) {
      const row = box.appendChild(dom.createElement('tr'))
      row.combo = combo
      row.setAttribute('style', 'color: ' + (options.modify ? KTOCOLOR[k] || 'black' : '#888') + ';')

      const left = row.appendChild(dom.createElement('td'))

      left.textContent = COLLOQUIAL[k] || ktToList[k]
      left.setAttribute('style', 'padding-bottom: 2em;')

      const middle = row.appendChild(dom.createElement('td'))
      const middleTable = middle.appendChild(dom.createElement('table'))
      middleTable.style.width = '100%'

      const right = row.appendChild(dom.createElement('td'))
      right.textContent = EXPLANATION[k] || 'Unusual combination'
      right.setAttribute('style', 'max-width: 30%;')

      syncCombo(combo)
      row.refresh = () => syncCombo(combo)

      if (options.modify) {
        row.addNewURI = addNewURI
        widgets.makeDropTarget(row, handleManyDroppedURIs)
      }
      return row

      function addAgent (pred, obj) {
        if (middleTable.NoneTR) {
          middleTable.removeChild(middleTable.NoneTR)
          delete middleTable.NoneTR
        }
        const tr = middleTable.appendChild(widgets.personTR(dom, ACL(pred), sym(obj), options.modify ? {
          deleteFunction
        } : {}))
        tr.predObj = [pred.uri, obj.uri]

        function deleteFunction () {
          const arr = byCombo[combo]
          for (let b = 0; b < arr.length; b++) {
            if (arr[b][0] === pred && arr[b][1] === obj) {
              arr.splice(b, 1) // remove from ACL
              break
            }
          }
          box.saveBack((ok, error) => {
            if (ok) {
              middleTable.removeChild(tr)
            } else {
              alert(error)
            }
          })
        }
      }

      function syncCombo (combo) {
        let i
        const acls = byCombo[combo]
        if (acls && acls.length) {
          const already = middleTable.children
          acls.sort()
          for (let j = 0; j < already.length; j++) {
            already[j].trashme = true
          }
          for (let a = 0; a < acls.length; a++) {
            let found = false
            for (i = 0; i < already.length; i++) {
              const exists = already[i].predObj && // skip NoneTR
                already[i].predObj[0] === acls[a][0] &&
                already[i].predObj[1] === acls[a][1]
              if (exists) {
                found = true
                delete already[i].trashme
                break
              }
            }
            if (!found) {
              addAgent(acls[a][0], acls[a][1])
            }
          }
          for (i = already.length - 1; i >= 0; i--) {
            if (already[i].trashme) {
              middleTable.removeChild(already[i])
            }
          }
        } else {
          widgets.clearElement(middleTable)
          const tr = middleTable.appendChild(dom.createElement('tr'))
          tr.textContent = 'None'
          tr.setAttribute('style', 'padding: 1em;')
          middleTable.NoneTR = tr
        }
      }

      function saveAndRestoreUI () {
        box.saveBack((ok, error) => {
          if (ok) {
            row.style.backgroundColor = 'white' // restore look to before drag
            syncPanel()
          } else {
            alert(error)
          }
        })
      }

      function handleManyDroppedURIs (uris) {
        Promise.all(uris.map((u) => handleOneDroppedURI(u))) // can add to meetingDoc but must be sync
          .then((_a) => saveAndRestoreUI())
      }

      async function handleOneDroppedURI (u) {
        // eg 'agent', 'origin', agentClass'
        const thing = sym(u)
        if (agentTriage(u, store)) {
          setACLCombo()
        } else {
          console.log('   Not obvious: looking up dropped thing ' + thing)
          try {
            await store.fetcher.load(thing.doc())
          } catch (err) {
            console.log('Ignore error looking up dropped thing: ' + err)
          }
          if (agentTriage(u, store)) {
            setACLCombo()
          } else {
            console.log('   Error: Drop fails to drop appropriate thing! ' + u)
          }
        }

        function setACLCombo () {
          if (!(combo in byCombo)) {
            byCombo[combo] = []
          }
          removeAgentFromCombos(u, byCombo) // Combos are mutually distinct
          // @@ TODO Remove the need for bang (!) syntax
          byCombo[combo].push([(agentTriage(u, store))!.pred, (agentTriage(u, store))!.obj.uri])
          console.log(`ACL: setting access to ${subject} by ${(agentTriage(u, store))!.pred}: ${(agentTriage(u, store))!.obj}`)
        }
      } // handleOneDroppedURI

      async function addNewURI (uri) {
        await handleOneDroppedURI(uri)
        saveAndRestoreUI()
      }
    } // renderCombo

    function syncPanel () {
      Array.from(box.children).forEach((kid: any) => kid.refresh && kid.refresh()) // @@ later -- need to add combos not in the box?
    }

    function renderAdditionTool (ele, lastRow) {
      if (ele.bar) {
        // toggle
        return removeBar(ele)
      }
      const bar = ele.appendChild(dom.createElement('div'))
      ele.bar = bar

      // Buttons to add different types of things to have access
      getButtons(ele, bar, lastRow, removeBar)
        .forEach(button => bar.appendChild(button))
    }

    function removeBar (ele: any) {
      ele.removeChild(ele.bar)
      ele.bar = null
    }

    function renderAddToolBar (box, lastRow) {
      // const toolRow = box.appendChild(dom.createElement('tr'))
      bottomLeftCell.appendChild(widgets.button(dom, icons.iconBase + 'noun_34653_green.svg', 'Add ...', _event => {
        renderAdditionTool(bottomLeftCell, lastRow)
      }))
    }
  } // ACLControlEditable

  function renderBox () {
    box.innerHTML = ''
    getACLorDefault(doc, function (
      ok,
      p2,
      targetDoc,
      targetACLDoc,
      defaultHolder,
      defaultACLDoc
    ) {
      const defa = !p2
      // @@ Could also set from classes ldp:Container etc etc
      if (ok) {
        box.isContainer = (targetDoc as NamedNode).uri.slice(-1) === '/' // Give default for all directories
        if (defa) {
          const defaults = kb
            .each(undefined, ACL('default'), defaultHolder, defaultACLDoc)
            .concat(kb.each(undefined, ACL('defaultForNew'), defaultHolder, defaultACLDoc))
          if (!defaults.length) {
            statusBlock.textContent += ' (No defaults given.)'
          } else {
            statusBlock.innerHTML = ''
            statusBlock.textContent = `The sharing for this ${noun} is the default for folder `
            const a = statusBlock.appendChild(dom.createElement('a'))
            const defaultHolder2 = defaultHolder as NamedNode
            const defaultACLDoc2 = defaultACLDoc as NamedNode
            a.setAttribute('href', defaultHolder2.uri)
            a.textContent = shortNameForFolder(defaultHolder2)
            const kb2 = adoptACLDefault(doc, targetACLDoc as NamedNode, defaultHolder2, defaultACLDoc2)
            ACLControlEditable(box, doc, targetACLDoc, kb2, { modify: false }) // Add button to save them as actual
            box.style.cssText = 'color: #777;'

            const editPlease = bottomRightCell.appendChild(dom.createElement('button'))
            editPlease.textContent = 'Set specific sharing\nfor this ' + noun
            editPlease.style.cssText = bigButtonStyle
            editPlease.addEventListener('click', async function (_event) {
              kb2.statements.forEach(st => kb.add(st.subject, st.predicate as NamedNode, st.object, targetACLDoc as NamedNode))
              try {
                // @@ TODO Remove casting of kb
                (kb as any).fetcher.putBack(targetACLDoc).then(function () {
                  statusBlock.textContent =
                    ' (Now editing specific access for this ' + noun + ')'
                  bottomRightCell.removeChild(editPlease)
                  renderBox()
                })
              } catch (e) {
                const msg = ' Error writing back access control file! ' + e
                console.error(msg)
                statusBlock.textContent += msg
              }
              // kb.fetcher.requested[targetACLDoc.uri] = 'done' // cheat - say cache is now in sync
            })
          } // defaults.length
        } else {
          // Not using defaults

          const str = (targetDoc as NamedNode).uri.split('#')[0]
          const p = str.slice(0, -1).lastIndexOf('/')
          const q = str.indexOf('//')
          const targetDocDir = (q >= 0 && p < q + 2) || p < 0 ? null : str.slice(0, p + 1)

          // @@ TODO: The methods used for targetIsStorage are HACKs - it should not be relied upon, and work is
          // @@ underway to standardize a behavior that does not rely upon this hack
          // @@ hopefully fixed as part of https://github.com/solid/data-interoperability-panel/issues/10
          const targetIsStorage = kb.holds(targetDoc as NamedNode, ns.rdf('type'), ns.space('Storage'), targetACLDoc as NamedNode)
          const targetAclIsProtected = hasProtectedAcl(targetDoc as NamedNode)
          const targetIsProtected = targetIsStorage || targetAclIsProtected

          if (!targetIsProtected && targetDocDir) {
            getACLorDefault(sym(targetDocDir), (
              ok2,
              p22,
              targetDoc2,
              targetACLDoc2,
              defaultHolder2,
              _defaultACLDoc2
            ) => {
              let prospectiveDefaultHolder
              if (ok2) {
                prospectiveDefaultHolder = p22 ? targetDoc2 : defaultHolder2
              }
              addDefaultButton(prospectiveDefaultHolder)
            })
          } else if (!targetIsProtected) {
            addDefaultButton()
          }

          box.addControlForDefaults = addControlForDefaults
          box.removeControlForDefaults = removeControlForDefaults

          box.mainByCombo = ACLControlEditable(box, targetDoc, targetACLDoc, kb, { modify: true }) // yes can edit
          box.divider = box.appendChild(dom.createElement('tr'))
          box.notice = box.divider.appendChild(dom.createElement('td'))
          box.notice.style.cssText = 'font-size: 80%; color: #888;'
          box.offer = box.divider.appendChild(dom.createElement('td'))
          box.notice.setAttribute('colspan', '2')

          if (box.isContainer) {
            const ac = readACL(targetDoc as NamedNode, targetACLDoc as NamedNode, kb)
            const acd = readACL(targetDoc as NamedNode, targetACLDoc as NamedNode, kb, true)
            box.defaultsDiffer = !sameACL(ac, acd)
            console.log(`Defaults differ ACL: ${box.defaultsDiffer}`)
            if (box.defaultsDiffer) {
              box.addControlForDefaults()
            } else {
              box.removeControlForDefaults()
            }
          }
        } // Not using defaults
      } else {
        statusBlock.textContent += `Error reading ${defa ? ' default ' : ''}ACL. status ${targetDoc}: ${targetACLDoc}`
      }

      function addDefaultButton (prospectiveDefaultHolder?) {
        const useDefault = bottomRightCell.appendChild(dom.createElement('button'))
        useDefault.textContent = `Stop specific sharing for this ${noun} -- just use default` // + utils.label(thisDefaultHolder)
        if (prospectiveDefaultHolder) {
          useDefault.textContent += ` for ${utils.label(prospectiveDefaultHolder)}`
        }
        useDefault.style.cssText = bigButtonStyle
        useDefault.addEventListener('click', function (_event) {
          // @@ TODO Remove casting of kb
          (kb as any).fetcher
            .delete((targetACLDoc as NamedNode).uri)
            .then(() => {
              statusBlock.textContent = ` The sharing for this ${noun} is now the default.`
              bottomRightCell.removeChild(useDefault)
              box.style.cssText = 'color: #777;'
              bottomLeftCell.innerHTML = ''
              renderBox()
            })
            .catch((event) => {
              statusBlock.textContent += ` (Error deleting access control file: ${targetACLDoc}: ${event})`
            })
        })
      }

      function addControlForDefaults () {
        box.notice.textContent = 'Access to things within this folder:'
        box.notice.style.cssText = 'font-size: 120%; color: black;'
        const mergeButton = widgets
          .clearElement(box.offer)
          .appendChild(dom.createElement('button'))
        mergeButton.innerHTML = '<p>Set default for folder contents to<br />just track the sharing for the folder</p>'
        mergeButton.style.cssText = bigButtonStyle
        mergeButton.addEventListener('click', (_event) => {
          delete box.defaultsDiffer
          delete box.defByCombo
          box.saveBack(function (ok, error) {
            if (ok) {
              box.removeControlForDefaults()
            } else {
              alert(error)
            }
          })
        }, false)
        box.defaultsDiffer = true
        box.defByCombo = ACLControlEditable(box, targetDoc, targetACLDoc, kb, { modify: true, doingDefaults: true })
      }

      function removeControlForDefaults () {
        statusBlock.textContent = 'This is also the default for things in this folder.'
        box.notice.textContent = 'Sharing for things within the folder currently tracks sharing for the folder.'
        box.notice.style.cssText = 'font-size: 80%; color: #888;'
        const splitButton = widgets
          .clearElement(box.offer)
          .appendChild(dom.createElement('button'))
        splitButton.innerHTML = '<p>Set the sharing of folder contents <br />separately from the sharing for the folder</p>'
        splitButton.style.cssText = bigButtonStyle
        splitButton.addEventListener('click', function (_event) {
          box.addControlForDefaults()
          statusBlock.textContent = ''
        })
        while (box.divider.nextSibling) {
          box.removeChild(box.divider.nextSibling)
        }
        statusBlock.textContent = 'This is now also the default for things in this folder.'
      }
    })
  }

  function getButtons (
    ele: HTMLElement,
    bar: HTMLElement,
    lastRow: any,
    removeBar: (ele: HTMLElement) => void
  ) {
    return [
      getPersonButton(),
      getGroupButton(),
      getPublicButton(),
      getAuthenticatedAgentButton(),
      getBotButton(),
      getAppButton()
    ]

    function getPersonButton () {
      const individualIcon = icons.iconBase + widgets.iconForClass['vcard:Individual']
      return widgets.button(dom, individualIcon, 'Add Person', async event => {
        removeOthers(event.target, bar)
        const name = await widgets.askName(dom, kb, bar, ns.vcard('URI'), ns.vcard('Individual'), 'person')
        if (!name) return removeBar(ele) // user cancelled
        const domainNameRegexp = /^https?:/i
        if (!name.match(domainNameRegexp)) {
          // @@ enforce in user input live like a form element
          return alert('Not a http URI')
        }
        // @@ check it actually is a person and has an owner who agrees they own it
        console.log('Adding to ACL person: ' + name)
        await lastRow.addNewURI(name)
        removeBar(ele)
      })
    }

    function getGroupButton () {
      const groupIcon = icons.iconBase + widgets.iconForClass['vcard:Group']
      return widgets.button(dom, groupIcon, 'Add Group', async event => {
        removeOthers(event.target, bar)
        const name = await widgets.askName(dom, kb, bar, ns.vcard('URI'), ns.vcard('Group'), 'group')
        if (!name) return removeBar(ele) // user cancelled
        const domainNameRegexp = /^https?:/i
        if (!name.match(domainNameRegexp)) {
          // @@ enforce in user input live like a form element
          return alert('Not a http URI')
        }
        // @@ check it actually is a group and has an owner who agrees they own it
        console.log('Adding to ACL group: ' + name)
        await lastRow.addNewURI(name)
        removeBar(ele)
      })
    }

    function getPublicButton () {
      const publicButtonIcon = icons.iconBase + widgets.iconForClass['foaf:Agent']
      return widgets.button(dom, publicButtonIcon, 'Add Everyone', async _event => {
        statusBlock.textContent = 'Adding the general public to those who can read. Drag the globe to a different level to give them more access.'
        await lastRow.addNewURI(ns.foaf('Agent').uri)
        removeBar(ele)
      })
    }

    function getAuthenticatedAgentButton () {
      const authenticatedAgentIcon = icons.iconBase + 'noun_99101.svg'
      return widgets.button(dom, authenticatedAgentIcon, 'Anyone logged In', async _event => {
        statusBlock.textContent = 'Adding the anyone logged in to those who can read. Drag the ID icon to a different level to give them more access.'
        await lastRow.addNewURI(ns.acl('AuthenticatedAgent').uri)
        removeBar(ele)
      })
    }

    function getBotButton () {
      const botIcon = icons.iconBase + 'noun_Robot_849764.svg'
      return widgets.button(dom, botIcon, 'A Software Agent (bot)', async event => {
        removeOthers(event.target, bar)
        const name = await widgets.askName(dom, kb, bar, ns.vcard('URI'), ns.schema('Application'), 'bot')
        if (!name) return removeBar(ele) // user cancelled
        const domainNameRegexp = /^https?:/i
        if (!name.match(domainNameRegexp)) {
          // @@ enforce in user input live like a form element
          return alert('Not a http URI')
        }
        // @@ check it actually is a bot and has an owner who agrees they own it
        console.log('Adding to ACL bot: ' + name)
        await lastRow.addNewURI(name)
        removeBar(ele)
      })
    }

    function getAppButton () {
      const appIcon = icons.iconBase + 'noun_15177.svg'
      return widgets.button(dom, appIcon, 'A Web App (origin)', async event => {
        removeOthers(event.target, bar)
        const eventContext: any = { div: bar, dom }
        await logInLoadProfile(eventContext)
        const trustedApps = kb.each(eventContext.me, ns.acl('trustedApp'))
        const trustedOrigins = trustedApps.flatMap(app => kb.each(app, ns.acl('origin')))

        bar.appendChild(dom.createElement('p')).textContent = `You have ${
          trustedOrigins.length
        } selected web apps.`
        const table = bar.appendChild(dom.createElement('table'))
        trustedApps.forEach(app => {
          const origin = kb.any(app, ns.acl('origin')) as NamedNode
          const thingTR = widgets.personTR(dom, ns.acl('origin'), origin, {})
          const innerTable = dom.createElement('table')
          const innerRow = innerTable.appendChild(dom.createElement('tr'))
          const innerLeft = innerRow.appendChild(dom.createElement('td'))
          const innerMiddle = innerRow.appendChild(dom.createElement('td'))
          const innerRight = innerRow.appendChild(dom.createElement('td'))
          innerLeft.appendChild(thingTR)
          innerMiddle.textContent = `Give access to ${noun} ${utils.label(subject)}?`
          innerRight.appendChild(widgets.continueButton(dom, async _event => {
            await lastRow.addNewURI(origin.uri)
          }))
          table.appendChild(innerTable)
        })
        table.style.backgroundColor = '#eee'

        // Add the Trusted App pane for managing you set of apps
        const trustedApplications = context.session.paneRegistry.byName('trustedApplications')
        const trustedAppControl = trustedApplications.render(eventContext.me, context)
        trustedAppControl.style.borderColor = 'orange'
        trustedAppControl.style.borderWidth = '0.1em'
        trustedAppControl.style.borderRadius = '1em'
        bar.appendChild(trustedAppControl)
        const cancel = widgets.cancelButton(dom, () => bar.removeChild(trustedAppControl))
        trustedAppControl.insertBefore(cancel, trustedAppControl.firstChild)
        cancel.style.float = 'right'

        const name = await widgets.askName(dom, kb, bar, null, ns.schema('WebApplication'), 'webapp domain') // @@ hack
        if (!name) return removeBar(ele) // user cancelled
        const domainNameRegexp = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i
        // https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s15.html
        if (!name.match(domainNameRegexp)) {
          // @@ enforce in user input live like a form element
          return alert('Not a domain name')
        }
        const origin = 'https://' + name
        console.log('Adding to ACL origin: ' + origin)
        await lastRow.addNewURI(origin)
        removeBar(ele)
      })
    }

    function removeOthers (button: any, bar: HTMLElement) {
      button.keep = true
      button.parentNode.keep = true
      Array.from(bar.children)
        .filter((ele: any) => ele.keep)
        .forEach(ele => bar.removeChild(ele))
    }
  }
} // ACLControlBox

function agentTriage (uri, kb) {
  const obj = sym(uri)
  const types = kb.findTypeURIs(obj)
  for (const ty in types) {
    console.log('    drop object type includes: ' + ty)
  }
  switch (true) {
    // An Origin URI is one like https://fred.github.io with no trailing slash
    case isOrigin():
      // there is no third slash
      return { pred: 'origin', obj } // The only way to know an origin alas
    // @@ This is an almighty kludge needed because drag and drop adds extra slashes to origins
    case isDraggedOrigin():
      // there  IS third slash
      console.log('Assuming final slash on dragged origin URI was unintended!')
      return { pred: 'origin', obj: sym(uri.slice(0, -1)) } // Fix a URI where the drag and drop system has added a spurious slash
    case isWebID():
      return { pred: 'agent', obj }
    case isGroup():
      return { pred: 'agentGroup', obj } // @@ note vcard membership not RDFs
    case isAgentClass():
      return { pred: 'agentClass', obj }
    case isIndividual():
      return getIndividualAgent()
    case isAppProvider():
      return { pred: 'origin', obj }
    case isAppProviderClass():
      return { pred: 'originClass', obj }
    default:
      console.log('    Triage fails for ' + uri)
  }

  function getIndividualAgent () {
    const pref = kb.any(obj, ns.foaf('preferredURI'))
    return pref
      ? { pred: 'agent', obj: sym(pref) }
      : { pred: 'agent', obj }
  }

  function isWebID () {
    return ns.vcard('WebID').uri in types
  }

  function isIndividual () {
    return ns.vcard('Individual').uri in types ||
      ns.foaf('Person').uri in types ||
      ns.foaf('Agent').uri in types
  }

  function isAgentClass () {
    return obj.sameTerm(ns.foaf('Agent')) ||
      obj.sameTerm(ns.acl('AuthenticatedAgent')) || // AuthenticatedAgent
      obj.sameTerm(ns.rdf('Resource')) ||
      obj.sameTerm(ns.owl('Thing'))
  }

  function isGroup () {
    return ns.vcard('Group').uri in types
  }

  function isAppProvider () {
    return ns.solid('AppProvider').uri in types
  }

  function isAppProviderClass () {
    return ns.solid('AppProviderClass').uri in types
  }

  function isDraggedOrigin () {
    return uri.startsWith('http') && uri.split('/').length === 4 && uri.endsWith('/')
  }

  function isOrigin () {
    return uri.startsWith('http') && uri.split('/').length === 3
  }
}

function kToCombo (k) {
  return ['Read', 'Append', 'Write', 'Control']
    .filter((mode, i) => k & (1 << i))
    .map(mode => 'http://www.w3.org/ns/auth/acl#' + mode)
    .sort()
    .join('\n')
}

function ktToList (k) {
  return ['Read', 'Append', 'Write', 'Control']
    .filter((mode, i) => k & (1 << i))
    .reduce((memo, mode) => memo + mode, '')
}

function removeAgentFromCombos (uri, byCombo) {
  for (let k = 0; k < 16; k++) {
    const acls = byCombo[kToCombo(k)]
    if (acls) {
      for (let i = 0; i < acls.length; i++) {
        while (i < acls.length && acls[i][1] === uri) {
          acls.splice(i, 1)
        }
      }
    }
  }
}

function hasProtectedAcl (targetDoc: NamedNode): boolean {
  // @@ TODO: This is hacky way of knowing whether or not a certain ACL file can be removed
  // Hopefully we'll find a better, standardized solution to this - https://github.com/solid/specification/issues/37
  return targetDoc.uri === targetDoc.site().uri
}

// ends
