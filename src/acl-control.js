/* global confirm */
// ///////////////////////////// ACL User Interface

// See https://www.coshx.com/blog/2014/04/11/preventing-drag-and-drop-disasters-with-a-chrome-userscript/
// Without this dropping anything onto a browser page will cause chrome etc to jump to diff page
// throwing away all the user's work.
var UI = {}

UI.acl = require('./acl')
UI.ns = require('./ns')
UI.widgets = require('./widgets')
UI.utils = require('./utils')
UI.aclControl = module.exports = {}

// In apps which may use drag and drop, this utility takes care of the fact
// by default in a browser, an uncuaght user drop into a browser window
// causes the bowser to lose all its work in tat window and navigate to another page
UI.aclControl.preventBrowserDropEvents = function (document) {
  console.log('preventBrowserDropEvents called.')
  if (typeof tabulator !== 'undefined') {
    if (tabulator.preventBrowserDropEventsDone) return
    tabulator.preventBrowserDropEventsDone = true
  }

  function preventDrag (e) {
    e.stopPropagation()
    e.preventDefault()
  // console.log("@@@@ document-level drag suppressed: " + e.dataTransfer.dropEffect)
  }

  function handleDrop (e) {
    if (e.dataTransfer.files.length > 0) {
      if (!confirm('Are you sure you want to drop this file here? ' +
          '(Cancel opens it in a new tab)')) {
        e.stopPropagation()
        e.preventDefault()
        console.log('@@@@ document-level DROP suppressed: ' + e.dataTransfer.dropEffect)
      /*
              var file = e.dataTransfer.files[0]
              var reader = new FileReader()

              reader.onload = function (event) {
                window.open(reader.result)
              }
              reader.readAsDataURL(file)
      */
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
  var statusBlock = statusRow.appendChild(dom.createElement('div'))
  statusBlock.setAttribute('style', 'padding: 2em;')
  var MainRow = table.appendChild(dom.createElement('tr'))
  var box = MainRow.appendChild(dom.createElement('table'))
  var bottomRow = table.appendChild(dom.createElement('tr'))

  var bigButtonStyle = 'border-radius: 0.3em; background-color: white; border: 0.01em solid #888;'

  var ACLControlEditable = function (box, doc, aclDoc, kb, options) {
    var defaultOrMain = options.doingDefault ? 'default' : 'main'
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

    var ktToList = function (k) {
      var list = ''
      var y = ['Read', 'Append', 'Write', 'Control']
      for (var i = 0; i < 4; i++) {
        if (k & (1 << i)) {
          list += y[i]
        }
      }
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

    //
    var agentTriage = function (uri) {
      var ns = UI.ns
      var obj = $rdf.sym(uri)
      var types = kb.findTypeURIs(obj)
      for (var ty in types) {
        console.log('    drop object type includes: ' + ty)
      }
      // An Origin URI is one like https://fred.github.io eith no trailing slash
      if (uri.startsWith('http') && uri.split('/').length === 3)) {  // there is no third slash
        return {pred: 'origin', obj: obj} // The only way to know an origin alas
      }

      if (ns.vcard('WebID').uri in types) return {pred: 'agent', obj: obj}

      if (ns.vcard('Group').uri in types) {
        return {pred: 'agentGroup', obj: obj} // @@ note vcard membership not RDFs
      }
      if (obj.sameTerm(ns.foaf('Agent')) ||
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
          if (!ok) {
            console.log('ACL file save failed: ' + message)
          } else {
            kb.fetcher.unload(aclDoc)
            kb.add(kb2.statements)
            kb.fetcher.requested[aclDoc.uri] = 'done' // missing: save headers
            console.log('ACL modification: success!')
          }
          callback(ok)
        })
    }

    var renderCombo = function (byCombo, combo) {
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
            box.saveBack(function (ok) {
              if (ok) {
                middleTable.removeChild(tr)
              } // @@ else
            })
          }
        }
        var tr = middleTable.appendChild(
          UI.widgets.personTR(dom, ACL(pred), $rdf.sym(obj), opt))
        tr.predObj = [pred.uri, obj.uri]

      }

      var syncCombo = function (combo) {
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
          for (var i = already.length - 1; i >= 0; i--) {
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

      if (options.modify) {
        // see http://html5demos.com/drag-anything
        row.addEventListener('dragover', function (e) {
          e.preventDefault() // Neeed else drop does not work [sic]
          e.dataTransfer.dropEffect = 'copy'
        // console.log('dragover event') // millions of them
        })

        row.addEventListener('dragenter', function (e) {
          console.log('dragenter event dropEffect: ' + e.dataTransfer.dropEffect)
          this.style.backgroundColor = '#ccc'
          e.dataTransfer.dropEffect = 'link'
          console.log('dragenter event dropEffect 2: ' + e.dataTransfer.dropEffect)
        })
        row.addEventListener('dragleave', function (e) {
          console.log('dragleave event dropEffect: ' + e.dataTransfer.dropEffect)
          this.style.backgroundColor = 'white'
        })

        row.addEventListener('drop', function (e) {
          if (e.preventDefault) e.preventDefault() // stops the browser from redirecting off to the text.
          console.log('Drop event. dropEffect: ' + e.dataTransfer.dropEffect)
          console.log('Drop event. types: ' + (e.dataTransfer.types ? e.dataTransfer.types.join(', ') : 'NOPE'))

          var uris = null
          var text
          var thisEle = this
          if (e.dataTransfer.types) {
            for (var t = 0; t < e.dataTransfer.types.length; t++) {
              var type = e.dataTransfer.types[t]
              if (type === 'text/uri-list') {
                uris = e.dataTransfer.getData(type).split('\n') // @ ignore those starting with #
                console.log('Dropped text/uri-list: ' + uris)
              } else if (type === 'text/plain') {
                text = e.dataTransfer.getData(type)
              }
            }
            if (uris === null && text && text.slice(0, 4) === 'http') {
              uris = text
              console.log("Waring: Poor man's drop: using text for URI") // chrome disables text/uri-list??
            }
          } else {
            // ... however, if we're IE, we don't have the .types property, so we'll just get the Text value
            uris = [ e.dataTransfer.getData('Text') ]
            console.log('@@ WARNING non-standrad drop event: ' + uris[0])
          }
          console.log('Dropped URI list (2): ' + uris)
          if (uris) {
            uris.map(function (u) {
              var saveAndRestoreUI = function () {
                if (!(combo in byCombo)) {
                  byCombo[combo] = []
                }
                removeAgentFromCombos(u) // Combos are mutually distinct
                byCombo[combo].push([res.pred, res.obj.uri])
                console.log('ACL: setting access to ' + subject + ' by ' + res.pred + ': ' + res.obj)
                box.saveBack(function (ok) {
                  if (ok) {
                    thisEle.style.backgroundColor = 'white' // restore look to before drag
                    syncPanel()
                  }
                })
              }

              var res = agentTriage(u) // eg 'agent', 'origin', agentClass'
              if (!res) {
                console.log('   looking up dropped thing ' + u)
                kb.fetcher.nowOrWhenFetched(u, function (ok, mess) {
                  if (!ok) {
                    console.log('Error looking up dropped thing ' + u + ': ' + mess)
                  } else {
                    res = agentTriage(u)
                    if (!res) {
                      console.log('Error: Drop fails to drop appropriate thing! ' + u)
                    } else {
                      saveAndRestoreUI()
                    }
                  }
                })
                return
              } else {
                saveAndRestoreUI()
              }
            })
          }
          return false
        })
      } // if modify
    }
    var syncPanel = function () {
      var kids = box.children
      for (var i = 0; i < kids.length; i++) {
        if (kids[i].refresh) {
          kids[i].refresh()
        }
      } // @@ later -- need to addd combos not in the box?
    }

    var k, combo
    for (k = 15; k > 0; k--) {
      combo = kToCombo(k)
      if ((options.modify && recommended[k]) || byCombo[combo]) {
        renderCombo(byCombo, combo)
      } // if
    } // for
    return byCombo
  } // ACLControlEditable

  UI.acl.getACLorDefault(doc, function (ok, p2, targetDoc, targetACLDoc, defaultHolder, defaultACLDoc) {
    var defa = !p2
    // @@ Could also set from classes ldp:Container etc etc
    if (!ok) {
      statusBlock.textContent += 'Error reading ' + (defa ? ' default ' : '') + 'ACL.' +
        ' status ' + targetDoc + ': ' + targetACLDoc
    } else {
      box.isContainer = targetDoc.uri.slice(-1) === '/' // Give default for all directories
      if (defa) {
        var defaults = kb.each(undefined, ACL('defaultForNew'), defaultHolder, defaultACLDoc)
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
          box.style = 'color: #777;'

          var editPlease = bottomRow.appendChild(dom.createElement('button'))
          editPlease.textContent = 'Set specific sharing\nfor this ' + noun
          editPlease.style = bigButtonStyle
          editPlease.addEventListener('click', function (event) {
            updater.put(targetACLDoc, kb2.statements,
              'text/turtle', function (uri, ok, message) {
                if (!ok) {
                  statusBlock.textContent += ' (Error writing back access control file: ' + message + ')'
                } else {
                  statusBlock.textContent = ' (Now editing specific access for this ' + noun + ')'
                  // box.style = 'color: black;'
                  bottomRow.removeChild(editPlease)
                }
              })
          })
        } // defaults.length
      } else { // Not using defaults
        var useDefault
        var addDefaultButton = function (prospectiveDefaultHolder) {
          useDefault = bottomRow.appendChild(dom.createElement('button'))
          useDefault.textContent = 'Stop specific sharing for this ' + noun +
            ' -- just use default' // + UI.utils.label(thisDefaultHolder)
          if (prospectiveDefaultHolder) {
            useDefault.textContent += ' for ' + UI.utils.label(prospectiveDefaultHolder)
          }
          useDefault.style = bigButtonStyle
          useDefault.addEventListener('click', function (event) {
            kb.fetcher.webOperation('DELETE', targetACLDoc)
              .then(function (xhr) {
                kb.fetcher.requested[targetACLDoc.uri] = 404
                kb.fetcher.nonexistant[xhr.resource.uri] = true
                kb.fetcher.unload(targetACLDoc)
                statusBlock.textContent = ' The sharing for this ' + noun + ' is now the default.'
                bottomRow.removeChild(useDefault)
                box.style = 'color: #777;'
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

        if (targetDocDir) {
          UI.acl.getACLorDefault($rdf.sym(targetDocDir), function (ok2, p22, targetDoc2, targetACLDoc2, defaultHolder2, defaultACLDoc2) {
            if (ok2) {
              prospectiveDefaultHolder = p22 ? targetDoc2 : defaultHolder2
            }
            addDefaultButton(prospectiveDefaultHolder)
          })
        } else {
          addDefaultButton()
        }

        box.addControlForDefaults = function () {
          box.notice.textContent = 'Access to things within this folder:'
          box.notice.style = 'font-size: 120%; color: black;'
          var mergeButton = UI.widgets.clearElement(box.offer).appendChild(dom.createElement('button'))
          mergeButton.innerHTML = '<p>Set default for folder contents to<br />just track the sharing for the folder</p>'
          mergeButton.style = bigButtonStyle
          mergeButton.addEventListener('click', function (e) {
            delete box.defaultsDiffer
            delete box.defByCombo
            box.saveBack(function (ok) {
              if (ok) {
                box.removeControlForDefaults()
              }
            })
          }, false)
          box.defaultsDiffer = true
          box.defByCombo = ACLControlEditable(box, targetDoc, targetACLDoc, kb, {modify: true, doingDefaults: true})
        }
        box.removeControlForDefaults = function () {
          statusBlock.textContent = 'This is also the default for things in this folder.'
          box.notice.textContent = 'Sharing for things within the folder currently tracks sharing for the folder.'
          box.notice.style = 'font-size: 80%; color: #888;'
          var splitButton = UI.widgets.clearElement(box.offer).appendChild(dom.createElement('button'))
          splitButton.innerHTML = '<p>Set the sharing of folder contets <br />separately from the sharing for the folder</p>'
          splitButton.style = bigButtonStyle
          splitButton.addEventListener('click', function (e) {
            box.addControlForDefaults()
            statusBlock.textContent = ''
          })
          while (box.divider.nextSibling) {
            box.removeChild(box.divider.nextSibling)
          }
          statusBlock.textContent = 'This is now also the default for things in this folder.'
        }

        if (box.isContainer) {
          var ac = UI.acl.readACL(targetDoc, targetACLDoc, kb)
          var acd = UI.acl.readACL(targetDoc, targetACLDoc, kb, true)
          box.defaultsDiffer = !UI.acl.sameACL(ac, acd)
          console.log('Defaults differ ACL: ' + box.defaultsDiffer)
        }
        box.mainByCombo = ACLControlEditable(box, targetDoc, targetACLDoc, kb, {modify: true}) // yes can edit
        box.divider = box.appendChild(dom.createElement('tr'))
        box.notice = box.divider.appendChild(dom.createElement('td'))
        box.notice.style = 'font-size: 80%; color: #888;'
        box.offer = box.divider.appendChild(dom.createElement('td'))
        box.notice.setAttribute('colspan', '2')

        if (box.defaultsDiffer) {
          box.addControlForDefaults()
        } else {
          box.removeControlForDefaults()
        }
      } // Not using defaults
    }
  })
  return table
} // ACLControlBox
// ends
