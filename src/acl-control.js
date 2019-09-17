/* global confirm */
// ///////////////////////////// ACL User Interface

// See https://www.coshx.com/blog/2014/04/11/preventing-drag-and-drop-disasters-with-a-chrome-userscript/
// Without this dropping anything onto a browser page will cause chrome etc to jump to diff page
// throwing away all the user's work.

/* global alert window */
var UI = {}

UI.authn = require('./signin')
UI.acl = require('./acl')
UI.icons = require('./iconBase')
UI.ns = require('./ns')
UI.widgets = require('./widgets')
UI.style = require('./style')
UI.utils = require('./utils')

UI.aclControl = module.exports = {}

// In apps which may use drag and drop, this utility takes care of the fact
// by default in a browser, an uncuaght user drop into a browser window
// causes the bowser to lose all its work in tat window and navigate to another page
UI.aclControl.preventBrowserDropEvents = function (document) {
  console.log('preventBrowserDropEvents called.')
  if (typeof window !== 'undefined') {
    if (window.preventBrowserDropEventsDone) return
    window.preventBrowserDropEventsDone = true
  }

  function preventDrag (e) {
    e.stopPropagation()
    e.preventDefault()
  }

  function handleDrop (e) {
    if (e.dataTransfer.files.length > 0) {
      if (!confirm('Are you sure you want to drop this file here? ' +
          '(Cancel opens it in a new tab)')) {
        e.stopPropagation()
        e.preventDefault()
        console.log('@@@@ document-level DROP suppressed: ' + e.dataTransfer.dropEffect)
      }
    }
  }
  document.addEventListener('drop', handleDrop, false)
  document.addEventListener('dragenter', preventDrag, false)
  document.addEventListener('dragover', preventDrag, false)
}

UI.aclControl.shortNameForFolder = function (x) {
  var str = x.uri
  if (str.slice(-1) === '/') {
    str = str.slice(0, -1)
  }
  var slash = str.lastIndexOf('/')
  if (slash >= 0) {
    str = str.slice(slash + 1)
  }
  return str || '/'
}

UI.aclControl.ACLControlBox5 = function (subject, dom, noun, kb, callback) {
  var updater = kb.updater || new $rdf.UpdateManager(kb)
  var ACL = UI.ns.acl
  var doc = subject.doc() // The ACL is actually to the doc describing the thing

  var table = dom.createElement('table')
  table.setAttribute('style', 'margin: 1em; border: 0.1em #ccc ;')
  var headerRow = table.appendChild(dom.createElement('tr'))
  headerRow.textContent = 'Sharing for ' + noun + ' ' + UI.utils.label(subject)
  headerRow.setAttribute('style', 'min-width: 20em; padding: 1em; font-size: 120%; border-bottom: 0.1em solid red; margin-bottom: 2em;')

  var statusRow = table.appendChild(dom.createElement('tr'))

  var statusCell = statusRow.appendChild(dom.createElement('td'))
  var statusBlock = statusCell.appendChild(dom.createElement('div'))
  statusBlock.setAttribute('style', 'padding: 2em;')
  var MainRow = table.appendChild(dom.createElement('tr'))
  var box = MainRow.appendChild(dom.createElement('table'))
  var bottomRow = table.appendChild(dom.createElement('tr'))

  // A world button can be dragged to gve public access.
  // later, allow it to be pressed to make pubicly viewable?
  var bottomLeftCell = bottomRow.appendChild(dom.createElement('td'))
  // var bottomMiddleCell = bottomRow.appendChild(dom.createElement('td'))
  var bottomRightCell = bottomRow.appendChild(dom.createElement('td'))

  // var publicAccessButton = bottomLeftCell.appendChild(UI.widgets.button(dom, UI.icons.iconBase + 'noun_98053.svg', 'Public'))

  const bigButtonStyle = 'border-radius: 0.3em; background-color: white; border: 0.1em solid #888;'

  // This is the main function which produces an editable access control.
  // There are two of these in all iff the defaults are separate
  //
  function ACLControlEditable (box, doc, aclDoc, kb, options) {
    var defaultOrMain = options.doingDefaults ? 'default' : 'main'
    options = options || {}
    var ac = UI.acl.readACL(doc, aclDoc, kb, options.doingDefaults) // Note kb might not be normal one
    var byCombo
    box[defaultOrMain] = byCombo = UI.acl.ACLbyCombination(ac)
    var kToCombo = function (k) {
      var y = ['Read', 'Append', 'Write', 'Control']
      var combo = []
      for (var i = 0; i < 4; i++) {
        if (k & (1 << i)) {
          combo.push('http://www.w3.org/ns/auth/acl#' + y[i])
        }
      }
      combo.sort()
      combo = combo.join('\n')
      return combo
    }
    var colloquial = {13: 'Owners', 9: 'Owners (write locked)', 5: 'Editors', 3: 'Posters', 2: 'Submitters', 1: 'Viewers'}
    var recommended = {13: true, 5: true, 3: true, 2: true, 1: true}
    var explanation = {
      13: 'can read, write, and control sharing.',
      9: 'can read and control sharing, currently write-locked.',
      5: 'can read and change information',
      3: 'can add new information, and read but not change existing information',
      2: 'can add new information but not read any',
      1: 'can read but not change information'
    }

    var kToColor = {13: 'purple', 9: 'blue', 5: 'red', 3: 'orange', 2: '#cc0', 1: 'green'}

    function ktToList (k) {
      var list = ''
      var y = ['Read', 'Append', 'Write', 'Control']
      for (var i = 0; i < 4; i++) {
        if (k & (1 << i)) {
          list += y[i]
        }
      }
      return list
    }

    var removeAgentFromCombos = function (uri) {
      for (var k = 0; k < 16; k++) {
        var a = byCombo[kToCombo(k)]
        if (a) {
          for (var i = 0; i < a.length; i++) {
            while (i < a.length && a[i][1] === uri) {
              a.splice(i, 1)
            }
          }
        }
      }
    }

    function agentTriage (uri) {
      var ns = UI.ns
      var obj = $rdf.sym(uri)
      var types = kb.findTypeURIs(obj)
      for (var ty in types) {
        console.log('    drop object type includes: ' + ty)
      }
      // An Origin URI is one like https://fred.github.io eith no trailing slash
      if (uri.startsWith('http') && uri.split('/').length === 3) {  // there is no third slash
        return {pred: 'origin', obj: obj} // The only way to know an origin alas
      }
      // @@ This is an almighty kludge needed because drag and drop adds extra slashes to origins
      if (uri.startsWith('http') && uri.split('/').length === 4 && uri.endsWith('/')) {  // there  IS third slash
        console.log('Assuming final slash on dragged origin URI was unintended!')
        return {pred: 'origin', obj: $rdf.sym(uri.slice(0, -1))} // Fix a URI where the drag and drop system has added a spurious slash
      }

      if (ns.vcard('WebID').uri in types) return {pred: 'agent', obj: obj}

      if (ns.vcard('Group').uri in types) {
        return {pred: 'agentGroup', obj: obj} // @@ note vcard membership not RDFs
      }
      if (obj.sameTerm(ns.foaf('Agent')) || obj.sameTerm(ns.acl('AuthenticatedAgent')) || // AuthenticatedAgent
        obj.sameTerm(ns.rdf('Resource')) || obj.sameTerm(ns.owl('Thing'))) {
        return {pred: 'agentClass', obj: obj}
      }
      if (ns.vcard('Individual').uri in types || ns.foaf('Person').uri in types || ns.foaf('Agent').uri in types) {
        var pref = kb.any(obj, ns.foaf('preferredURI'))
        if (pref) return {pred: 'agent', obj: $rdf.sym(pref)}
        return {pred: 'agent', obj: obj}
      }
      if (ns.solid('AppProvider').uri in types) {
        return {pred: 'origin', obj: obj}
      }
      if (ns.solid('AppProviderClass').uri in types) {
        return {pred: 'originClass', obj: obj}
      }
      console.log('    Triage fails for ' + uri)
    }

    box.saveBack = function (callback) {
      var kb2 = $rdf.graph()
      if (!box.isContainer) {
        UI.acl.makeACLGraphbyCombo(kb2, doc, box.mainByCombo, aclDoc, true)
      } else if (box.defaultsDiffer) { // Pair of controls
        UI.acl.makeACLGraphbyCombo(kb2, doc, box.mainByCombo, aclDoc, true)
        UI.acl.makeACLGraphbyCombo(kb2, doc, box.defByCombo, aclDoc, false, true)
      } else { // Linked controls
        UI.acl.makeACLGraphbyCombo(kb2, doc, box.mainByCombo, aclDoc, true, true)
      }
      var updater = kb2.updater || new $rdf.UpdateManager(kb2)
      updater.put(aclDoc, kb2.statementsMatching(undefined, undefined, undefined, aclDoc),
        'text/turtle', function (uri, ok, message) {
          var error = null
          if (!ok) {
            error = 'ACL file save failed: ' + message
            console.log(error)
          } else {
            kb.fetcher.unload(aclDoc)
            kb.add(kb2.statements)
            kb.fetcher.requested[aclDoc.uri] = 'done' // missing: save headers
            console.log('ACL modification: success!')
          }
          callback(ok, error)
        })
    }

    function renderCombo (byCombo, combo) {
      var row = box.appendChild(dom.createElement('tr'))
      row.combo = combo
      row.setAttribute('style', 'color: ' +
        (options.modify ? (kToColor[k] || 'black') : '#888') + ';')

      var left = row.appendChild(dom.createElement('td'))

      left.textContent = colloquial[k] || ktToList[k]
      left.setAttribute('style', 'padding-bottom: 2em;')

      var middle = row.appendChild(dom.createElement('td'))
      var middleTable = middle.appendChild(dom.createElement('table'))
      middleTable.style.width = '100%'

      var right = row.appendChild(dom.createElement('td'))
      right.textContent = explanation[k] || 'Unusual combination'
      right.setAttribute('style', 'max-width: 30%;')

      var addAgent = function (pred, obj) {
        if (middleTable.NoneTR) {
          middleTable.removeChild(middleTable.NoneTR)
          delete middleTable.NoneTR
        }
        var opt = {}
        if (options.modify) {
          opt.deleteFunction = function deletePerson () {
            var arr = byCombo[combo]
            for (var b = 0; b < arr.length; b++) {
              if (arr[b][0] === pred && arr[b][1] === obj) {
                arr.splice(b, 1) // remove from ACL
                break
              }
            }
            box.saveBack(function (ok, error) {
              if (ok) {
                middleTable.removeChild(tr)
              } else {
                alert(error)
              }
            })
          }
        }
        var tr = middleTable.appendChild(
          UI.widgets.personTR(dom, ACL(pred), $rdf.sym(obj), opt))
        tr.predObj = [pred.uri, obj.uri]
      }

      var syncCombo = function (combo) {
        var i
        var arr = byCombo[combo]
        if (arr && arr.length) {
          var already = middleTable.children
          arr.sort()
          for (var j = 0; j < already.length; j++) {
            already[j].trashme = true
          }
          for (var a = 0; a < arr.length; a++) {
            var found = false
            for (i = 0; i < already.length; i++) {
              if (already[i].predObj && // skip NoneTR
                already[i].predObj[0] === arr[a][0] &&
                already[i].predObj[1] === arr[a][1]) {
                found = true
                delete already[i].trashme
                break
              }
            }
            if (!found) {
              addAgent(arr[a][0], arr[a][1])
            }
          }
          for (i = already.length - 1; i >= 0; i--) {
            if (already[i].trashme) {
              middleTable.removeChild(already[i])
            }
          }
        } else {
          UI.widgets.clearElement(middleTable)
          var tr = middleTable.appendChild(dom.createElement('tr'))
          tr.textContent = 'None'
          tr.setAttribute('style', 'padding: 1em;')
          middleTable.NoneTR = tr
        }
      }

      syncCombo(combo)
      row.refresh = function () {
        syncCombo(combo)
      }

      function saveAndRestoreUI () {
        box.saveBack(function (ok, error) {
          if (ok) {
            row.style.backgroundColor = 'white' // restore look to before drag
            syncPanel()
          } else {
            alert(error)
          }
        })
      }

      function handleManyDroppedURIs (uris) {
        Promise.all(uris.map(function (u) {
          return handleOneDroppedURI(u) // can add to meetingDoc but must be sync
        })).then(function (a) {
          saveAndRestoreUI()
        })
      }

      async function handleOneDroppedURI (u) {
        function setACLCombo () {
          if (!(combo in byCombo)) {
            byCombo[combo] = []
          }
          removeAgentFromCombos(u) // Combos are mutually distinct
          byCombo[combo].push([res.pred, res.obj.uri])
          console.log('ACL: setting access to ' + subject + ' by ' + res.pred + ': ' + res.obj)
        }

        var res = agentTriage(u) // eg 'agent', 'origin', agentClass'
        const thing = $rdf.sym(u)
        if (!res) {
          console.log('   Not obvious: looking up dropped thing ' + thing)
          try {
            await kb.fetcher.load(thing.doc())
          } catch (err) {
            console.log('Ignore error looking up dropped thing: ' + err)
          }
          res = agentTriage(u)
          if (!res) {
            console.log('   Error: Drop fails to drop appropriate thing! ' + u)
          } else {
            setACLCombo()
          }
        } else {
          setACLCombo()
        }
      }// handleOneDroppedURI

      async function addNewUIRI (uri) {
        await handleOneDroppedURI(uri)
        saveAndRestoreUI()
      }

      if (options.modify) {
        row.addNewURI = addNewUIRI
        UI.widgets.makeDropTarget(row, handleManyDroppedURIs)
      }
      return row
    } // renderCombo

    var syncPanel = function () {
      var kids = box.children
      for (var i = 0; i < kids.length; i++) {
        if (kids[i].refresh) {
          kids[i].refresh()
        }
      } // @@ later -- need to addd combos not in the box?
    }

    function renderAdditionTool (ele, lastRow) {
      const ns = UI.ns
      function removeOthers (button) {
        button.keep = true
        button.parentNode.keep = true
        var removeThese = []
        for (var ele of bar.children) {
          if (!ele.keep) removeThese.push(ele)
        }
        removeThese.forEach(e => bar.removeChild(e))
      }

      function removeBar () {
        ele.removeChild(ele.bar)
        ele.bar = null
      }
      if (ele.bar) { // toggle
        return removeBar()
      }
      const bar = ele.appendChild(dom.createElement('div'))
      ele.bar = bar

      /**  Buttons to add different types of theings to have access
      */

      // Person
      bar.appendChild(UI.widgets.button(dom, UI.icons.iconBase + UI.widgets.iconForClass['vcard:Individual'], 'Add Person', async event => {
        removeOthers(event.target)
        let name = await UI.widgets.askName(dom, kb, bar, ns.vcard('URI'), ns.vcard('Individual'), 'person')
        if (!name) return removeBar() // user cancelled
        const domainNameRegexp = /^https?:/i
        if (!name.match(domainNameRegexp)) { // @@ enforce in user input live like a form element
          return alert('Not a http URI')
        }
        // @@ check it actually is a person and has an owner who agrees they own it
        console.log('Adding to ACL person: ' + name)
        await lastRow.addNewURI(name)
        removeBar()
      }))

      //  Group
      bar.appendChild(UI.widgets.button(dom, UI.icons.iconBase + UI.widgets.iconForClass['vcard:Group'], 'Add Group', async event => {
        removeOthers(event.target)
        let name = await UI.widgets.askName(dom, kb, bar, ns.vcard('URI'), ns.vcard('Group'), 'group')
        if (!name) return removeBar() // user cancelled
        const domainNameRegexp = /^https?:/i
        if (!name.match(domainNameRegexp)) { // @@ enforce in user input live like a form element
          return alert('Not a http URI')
        }
        // @@ check it actually is a group and has an owner who agrees they own it
        console.log('Adding to ACL group: ' + name)
        await lastRow.addNewURI(name)
        removeBar()
      }))

      // General public
      bar.appendChild(UI.widgets.button(dom, UI.icons.iconBase + UI.widgets.iconForClass['foaf:Agent'], 'Add Everyone', async event => {
        statusBlock.textContent = 'Adding the general public to those who can read. Drag the globe to a different level to give them more access.'
        await lastRow.addNewURI(ns.foaf('Agent').uri)
        removeBar()
      }))

      // AuthenticatedAgent
      bar.appendChild(UI.widgets.button(dom, UI.icons.iconBase + 'noun_99101.svg', 'Anyone logged In', async event => {
        statusBlock.textContent = 'Adding the anyone logged in to those who can read. Drag the ID icon to a different level to give them more access.'
        await lastRow.addNewURI(ns.acl('AuthenticatedAgent').uri)
        removeBar()
      }))

      // Bots
      bar.appendChild(UI.widgets.button(dom, UI.icons.iconBase + 'noun_Robot_849764.svg', 'A Software Agent (bot)', async event => {
        removeOthers(event.target)
        let name = await UI.widgets.askName(dom, kb, bar, ns.vcard('URI'), ns.schema('Application'), 'bot')
        if (!name) return removeBar() // user cancelled
        const domainNameRegexp = /^https?:/i
        if (!name.match(domainNameRegexp)) { // @@ enforce in user input live like a form element
          return alert('Not a http URI')
        }
        // @@ check it actually is a bot and has an owner who agrees they own it
        console.log('Adding to ACL bot: ' + name)
        await lastRow.addNewURI(name)
        removeBar()
      }))

      // Web Apps
      bar.appendChild(UI.widgets.button(dom, UI.icons.iconBase + 'noun_15177.svg', 'A Web App (origin)', async event => {
        removeOthers(event.target)
        var context = {div: bar, dom}
        await UI.authn.logInLoadProfile(context)
        var trustedApps = kb.each(context.me, ns.acl('trustedApp'))
        var trustedOrigins = trustedApps.flatMap(app => kb.each(app, ns.acl('origin')))

        bar.appendChild(dom.createElement('p')).textContent = `You have ${trustedOrigins.length} selected web apps.`
        var table = bar.appendChild(dom.createElement('table'))
        trustedApps.forEach(app => {
          const origin = kb.any(app, ns.acl('origin'))
          var thingTR = UI.widgets.personTR(dom, ns.acl('origin'), origin, {})
          var innerTable = dom.createElement('table')
          var innerRow = innerTable.appendChild(dom.createElement('tr'))
          var innerLeft = innerRow.appendChild(dom.createElement('td'))
          var innerMiddle = innerRow.appendChild(dom.createElement('td'))
          var innerRight = innerRow.appendChild(dom.createElement('td'))
          innerLeft.appendChild(thingTR)
          innerMiddle.textContent = 'Give access to ' + noun + ' ' + UI.utils.label(subject) + '?'
          innerRight.appendChild(UI.widgets.continueButton(dom, async event => {
            await lastRow.addNewURI(origin.uri)
          }))
          table.appendChild(innerTable)
        })
        table.style = 'margin: em; background-color: #eee;'

        // Add the Trusted App pane for managing you set of apps
        var trustedAppControl = window.panes.trustedApplications.render(context.me, dom, {})
        trustedAppControl.style.borderColor = 'orange'
        trustedAppControl.style.borderWidth = '0.1em'
        trustedAppControl.style.borderRadius = '1em'
        bar.appendChild(trustedAppControl)
        const cancel = UI.widgets.cancelButton(dom, () => bar.removeChild(trustedAppControl))
        trustedAppControl.insertBefore(cancel, trustedAppControl.firstChild)
        cancel.style.float = 'right'

        let name = await UI.widgets.askName(dom, kb, bar, null, ns.schema('WebApplication'), 'webapp domain') // @@ hack
        if (!name) return removeBar() // user cancelled
        const domainNameRegexp = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i
        // https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch08s15.html
        if (!name.match(domainNameRegexp)) { // @@ enforce in user input live like a form element
          return alert('Not a domain name')
        }
        const origin = 'https://' + name
        console.log('Adding to ACL origin: ' + origin)
        await lastRow.addNewURI(origin)
        removeBar()
      }))
    }

    function renderAddToolBar (box, lastRow) {
      // const toolRow = box.appendChild(dom.createElement('tr'))
      bottomLeftCell.appendChild(UI.widgets.button(dom, UI.icons.iconBase + 'noun_34653_green.svg', 'Add ...', event => {
        renderAdditionTool(bottomLeftCell, lastRow)
      }))
    }

    var k, combo, lastRow
    for (k = 15; k > 0; k--) {
      combo = kToCombo(k)
      if ((options.modify && recommended[k]) || byCombo[combo]) {
        lastRow = renderCombo(byCombo, combo)
      } // if
    } // for

    if (options.modify) {
      renderAddToolBar(box, lastRow)
    }

    return byCombo
  } // ACLControlEditable

  var renderBox = function () {
    box.innerHTML = ''
    UI.acl.getACLorDefault(doc, function (ok, p2, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc) {
      var defa = !p2
      // @@ Could also set from classes ldp:Container etc etc
      if (!ok) {
        statusBlock.textContent += 'Error reading ' + (defa ? ' default ' : '') + 'ACL.' +
          ' status ' + targetDoc + ': ' + targetACLDoc
      } else {
        box.isContainer = targetDoc.uri.slice(-1) === '/' // Give default for all directories
        if (defa) {
          var defaults = kb.each(undefined, ACL('default'), defaultHolder, defaultACLDoc)
            .concat(kb.each(undefined, ACL('defaultForNew'), defaultHolder, defaultACLDoc))
          if (!defaults.length) {
            statusBlock.textContent += ' (No defaults given.)'
          } else {
            statusBlock.innerHTML = ''
            statusBlock.textContent = 'The sharing for this ' + noun + ' is the default for folder '
            var a = statusBlock.appendChild(dom.createElement('a'))
            a.setAttribute('href', defaultHolder.uri)
            a.textContent = UI.aclControl.shortNameForFolder(defaultHolder)
            var kb2 = UI.acl.adoptACLDefault(doc, targetACLDoc, defaultHolder, defaultACLDoc)
            ACLControlEditable(box, doc, targetACLDoc, kb2, {modify: false}) // Add btton to save them as actual
            box.style.cssText = 'color: #777;'

            var editPlease = bottomRightCell.appendChild(dom.createElement('button'))
            editPlease.textContent = 'Set specific sharing\nfor this ' + noun
            editPlease.style.cssText = bigButtonStyle
            editPlease.addEventListener('click', async function (event) {
              kb2.statements.forEach(st => {
                kb.add(st.subject, st.predicate, st.object, targetACLDoc)
              })
              try {
                kb.fetcher.putBack(targetACLDoc)
                  .then(function () {
                    statusBlock.textContent = ' (Now editing specific access for this ' + noun + ')'
                    bottomRightCell.removeChild(editPlease)
                    renderBox()
                  })
              } catch (e) {
                let msg = ' Error writing back access control file! ' + e
                console.error(msg)
                statusBlock.textContent += msg
                return
              }
              // kb.fetcher.requested[targetACLDoc.uri] = 'done' // cheat - say cache is now in sync
            })
          } // defaults.length
        } else { // Not using defaults
          var useDefault
          var addDefaultButton = function (prospectiveDefaultHolder) {
            useDefault = bottomRightCell.appendChild(dom.createElement('button'))
            useDefault.textContent = 'Stop specific sharing for this ' + noun +
              ' -- just use default' // + UI.utils.label(thisDefaultHolder)
            if (prospectiveDefaultHolder) {
              useDefault.textContent += ' for ' + UI.utils.label(prospectiveDefaultHolder)
            }
            useDefault.style.cssText = bigButtonStyle
            useDefault.addEventListener('click', function (event) {
              kb.fetcher.delete(targetACLDoc.uri)
                .then(function () {
                  statusBlock.textContent = ' The sharing for this ' + noun + ' is now the default.'
                  bottomRightCell.removeChild(useDefault)
                  box.style.cssText = 'color: #777;'
                  bottomLeftCell.innerHTML = ''
                  renderBox()
                })
                .catch(function (e) {
                  statusBlock.textContent += ' (Error deleting access control file: ' + targetACLDoc + ': ' + e + ')'
                })
            })
          }
          var prospectiveDefaultHolder

          var str = targetDoc.uri.split('#')[0]
          var p = str.slice(0, -1).lastIndexOf('/')
          var q = str.indexOf('//')
          var targetDocDir = ((q >= 0 && p < q + 2) || p < 0) ? null : str.slice(0, p + 1)

          // @@ TODO: The methods used for targetIsStorage are HACKs - it should not be relied upon, and work is
          // @@ underway to standardize a behavior that does not rely upon this hack
          // @@ hopefully fixed as part of https://github.com/solid/data-interoperability-panel/issues/10
          const targetIsStorage = kb.holds(targetDoc, UI.ns.rdf('type'), UI.ns.space('Storage'), targetACLDoc)
          const targetAclIsProtected = hasProtectedAcl(targetDoc)
          const targetIsProtected = targetIsStorage || targetAclIsProtected

          if (!targetIsProtected && targetDocDir) {
            UI.acl.getACLorDefault($rdf.sym(targetDocDir), function (ok2, p22, targetDoc2, targetACLDoc2, defaultHolder2, defaultACLDoc2) {
              if (ok2) {
                prospectiveDefaultHolder = p22 ? targetDoc2 : defaultHolder2
              }
              addDefaultButton(prospectiveDefaultHolder)
            })
          } else if (!targetIsProtected) {
            addDefaultButton()
          }

          box.addControlForDefaults = function () {
            box.notice.textContent = 'Access to things within this folder:'
            box.notice.style.cssText = 'font-size: 120%; color: black;'
            var mergeButton = UI.widgets.clearElement(box.offer).appendChild(dom.createElement('button'))
            mergeButton.innerHTML = '<p>Set default for folder contents to<br />just track the sharing for the folder</p>'
            mergeButton.style.cssText = bigButtonStyle
            mergeButton.addEventListener('click', function (e) {
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
            box.defByCombo = ACLControlEditable(box, targetDoc, targetACLDoc, kb, {modify: true, doingDefaults: true})
          }
          box.removeControlForDefaults = function () {
            statusBlock.textContent = 'This is also the default for things in this folder.'
            box.notice.textContent = 'Sharing for things within the folder currently tracks sharing for the folder.'
            box.notice.style.cssText = 'font-size: 80%; color: #888;'
            var splitButton = UI.widgets.clearElement(box.offer).appendChild(dom.createElement('button'))
            splitButton.innerHTML = '<p>Set the sharing of folder contents <br />separately from the sharing for the folder</p>'
            splitButton.style.cssText = bigButtonStyle
            splitButton.addEventListener('click', function (e) {
              box.addControlForDefaults()
              statusBlock.textContent = ''
            })
            while (box.divider.nextSibling) {
              box.removeChild(box.divider.nextSibling)
            }
            statusBlock.textContent = 'This is now also the default for things in this folder.'
          }

          box.mainByCombo = ACLControlEditable(box, targetDoc, targetACLDoc, kb, {modify: true}) // yes can edit
          box.divider = box.appendChild(dom.createElement('tr'))
          box.notice = box.divider.appendChild(dom.createElement('td'))
          box.notice.style.cssText = 'font-size: 80%; color: #888;'
          box.offer = box.divider.appendChild(dom.createElement('td'))
          box.notice.setAttribute('colspan', '2')

          if (box.isContainer) {
            var ac = UI.acl.readACL(targetDoc, targetACLDoc, kb)
            var acd = UI.acl.readACL(targetDoc, targetACLDoc, kb, true)
            box.defaultsDiffer = !UI.acl.sameACL(ac, acd)
            console.log('Defaults differ ACL: ' + box.defaultsDiffer)
            if (box.defaultsDiffer) {
              box.addControlForDefaults()
            } else {
              box.removeControlForDefaults()
            }
          }
        } // Not using defaults
      }
    })
  }
  renderBox()
  return table
} // ACLControlBox

function hasProtectedAcl (targetDoc) {
  // @@ TODO: This is hacky way of knowing whether or not a certain ACL file can be removed
  // Hopefully we'll find a better, standardized solution to this - https://github.com/solid/specification/issues/37
  return targetDoc.uri === targetDoc.site().uri
}
// ends
