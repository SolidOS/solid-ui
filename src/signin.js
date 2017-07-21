//  signin.js     Signing in, signing up, workspace selection, app spawning

var Solid = require('solid-client')

var UI = {
  icons: require('./iconBase'),
  log: require('./log'),
  ns: require('./ns'),
  store: require('./store'),
  utils: require('./utils'),
  widgets: require('./widgets')
}

// Look for and load the User who has control over it
UI.widgets.findOriginOwner = function (doc, callback) {
  var uri = doc.uri || doc
  var i = uri.indexOf('://')
  if (i < 0) return false
  var j = uri.indexOf('/', i + 3)
  if (j < 0) return false
  var origin = uri.slice(0, j + 1) // @@ TBC
  return origin
}

UI.widgets.complain = function (context, err) {
  var ele = context.statusArea || context.div
  console.log('Complaint: ' + err)
  return ele.appendChild(UI.widgets.errorMessageBlock(context.dom, err))
}

// Promises versions
//
// These pass a context object which hold various RDF symbols
// as they become available
//
//  me               RDF symbol for the users' webid
//  publicProfile    The user's public profile, iff loaded
//  preferencesFile  The user's personal preferences file, iff loaded
//  index.public     The user's public type index file
//  index.private     The user's private type index file
//   not RDF symbols:
//  noun              A string in english for the type of thing -- like "address book"
//  instance          An array of nodes which are existing instances
//  containers        An array of nodes of containers of instances
//  div               A DOM element where UI can be displayed
//  statusArea        A DOM element (opt) progress stuff can be displayed, or error messages

UI.widgets.logInLoadProfile = function (context) {
  if (context.publicProfile) return Promise.resolve(context) // already done

  var box = context.div
  var uri = tabulator.preferences.get('me')
  context.me = uri ? $rdf.sym(uri) : null

  return new Promise(function (resolve, reject) {
    var gotIDChange = function (meURI) {
      if (!meURI) return
      var me = $rdf.sym(meURI)
      context.me = me
      tabulator.preferences.set('me', me.uri)
      UI.store.fetcher.nowOrWhenFetched(me.doc(), undefined, function (ok, body) {
        if (!ok) {
          var message = "Can't load profile file " + me.doc() + ': ' + body
          box.appendChild(UI.widgets.errorMessageBlock(context.dom, message))
          reject(message)
        } else {
          context.publicProfile = me.doc()
          resolve(context)
        }
      })
    }
    box = UI.widgets.loginStatusBox(context.dom, gotIDChange)
    context.div.appendChild(box)
    if (context.me) {
      gotIDChange(context.me.uri) // trigger continuation if already set
    }
  })
}

/**
 * Loads preferences file
 * Do this after having done log in and load profile
 *
 * @param context
 *
 * @returns {Promise<context>}
 */
UI.widgets.loadPreferences = function (context) {
  if (context.preferencesFile) return Promise.resolve(context) // already done
  var kb = UI.store
  var preferencesFile = kb.any(context.me, UI.ns.space('preferencesFile'))
  var box = context.statusArea || context.div || null
  var pending

  return Promise.resolve()
    .then(() => {
      var message
      if (!preferencesFile) {
        message = "Can't find a preferences file for user: " + context.me
        UI.widgets.errorMessageBlock(context.dom, message)
        throw new Error(message)
      }

      context.preferencesFile = preferencesFile
      if (box) {
        pending = UI.widgets.errorMessageBlock(context.dom,
          '(loading preferences ' + preferencesFile + ')', 'straw')
        box.appendChild(pending)
      }

      return kb.fetcher.load(preferencesFile)
    })
    .then(() => {
      if (pending) {
        pending.parentNode.removeChild(pending)
      }

      return context
    })
    .catch(err => {
      throw new Error('Error loading preferences file. ' + err)
    })
}

/**
 * Resolves with the same context, outputting
 * output: index.public, index.private
 *
 * @see https://github.com/solid/solid/blob/master/proposals/data-discovery.md#discoverability
 *
 * @param context
 *
 * @returns {Promise<context>}
 */
UI.widgets.loadTypeIndexes = function (context) {
  var ns = UI.ns
  var kb = UI.store

  return UI.widgets.logInLoadProfile(context)
    .then(UI.widgets.loadPreferences)

    .then((context) => {
      var me = context.me
      context.index = context.index || {}
      context.index.private = kb.each(me, ns.solid('privateTypeIndex'), undefined, context.preferencesFile)
      context.index.public = kb.each(me, ns.solid('publicTypeIndex'), undefined, context.publicProfile)

      var ix = context.index.private.concat(context.index.public)
      if (ix.length === 0) {
        return context
      } else {
        return kb.fetcher.load(ix)
      }
    })

    .then(() => context)

    .catch(function (e) {
      UI.widgets.complain(context, e)
      throw new Error('Error loading type indexes: ' + e)
    })
}

/**
 * Resolves with the same context, outputting
 * @see https://github.com/solid/solid/blob/master/proposals/data-discovery.md#discoverability
 *
 * @param context {Object}
 * @param context.me
 * @param context.preferencesFile
 * @param context.publicProfile
 * @param context.index
 *
 * @returns {Promise}
 */
UI.widgets.ensureTypeIndexes = function (context) {
  return new Promise(function (resolve, reject) {
    return UI.widgets.loadTypeIndexes(context)
      .then(function (context) {
        var ns = UI.ns
        var kb = UI.store
        var me = context.me
        var newIndex

        var makeIndex = function (context, visibility) {
          return new Promise(function (resolve, reject) {
            var relevant = {'private': context.preferencesFile, 'public': context.publicProfile}[visibility]

            if (context.index[visibility].length === 0) {
              newIndex = $rdf.sym(context.preferencesFile.dir().uri + visibility + 'TypeIndex.ttl')
              console.log('Linking to new fresh type index ' + newIndex)
              var addMe = [ $rdf.st(me, ns.solid(visibility + 'TypeIndex'), newIndex, relevant) ]

              UI.store.updater.update([], addMe, function (uri, ok, body) {
                if (!ok) {
                  return reject(new Error('Error saving type index link saving back ' + uri + ': ' + body))
                } else {
                  context.index[visibility].push(newIndex)
                  console.log('Creating new fresh type index ' + newIndex)
                  if (!window.confirm('Creating new list of things  ' + newIndex)) {
                    return reject(new Error('Cancelled by user: writing of ' + newIndex))
                  }

                  kb.fetcher.webOperation('PUT', newIndex, {data: '# ' + new Date() + ' Blank initial Type index\n'})
                    .then(function (xhr) {
                      resolve(context)
                    })
                    .catch(function (e) {
                      reject(new Error('Creating new index file ' + e))
                    })
                }
              })
            } else {
              resolve(context) // exists
            }
          }) // promise
        } // makeIndex

        var ps = [ makeIndex(context, 'private'), makeIndex(context, 'public') ]

        return Promise.all(ps)
          .then(() => {
            resolve(context)
          })
      }) // .then
  }) // Promise
} // ensureTypeIndexes

/**
 * Returns promise of context with arrays of symbols
 *
 * 2016-12-11 change to include forClass arc a la
 * https://github.com/solid/solid/blob/master/proposals/data-discovery.md
 *
 * @param context
 * @param context.instances
 * @param context.containers
 * @param klass
 * @returns {Promise.<TResult>}
 */
UI.widgets.findAppInstances = function (context, klass) {
  var kb = UI.store
  var ns = UI.ns
  var fetcher = UI.store.fetcher
  var registrations = kb.each(undefined, ns.solid('forClass'), klass)
  var instances = []
  var containers = []

  return UI.widgets.loadTypeIndexes(context)
    .then((indexes) => {
      // var ix = context.index.private.concat(context.index.public)

      for (var r = 0; r < registrations.length; r++) {
        instances = instances.concat(kb.each(klass, ns.solid('instance')))
        containers = containers.concat(kb.each(klass, ns.solid('instanceContainer')))
      }

      if (!containers.length) {
        return
      }

      return fetcher.load(containers)
        .then(() => {
          for (var i = 0; i < containers.length; i++) {
            var cont = containers[i]
            instances = instances.concat(kb.each(cont, ns.ldp('contains')))
          }
        })
    })
    .then(() => {
      context.instances = instances
      context.containers = containers

      return context
    })
    .catch((e) => {
      throw new Error('Error looking for instances of ' + klass + ': ' + e)
    })
}

/**
 * UI to control registration of instance
 *
 * @param context
 * @param instance
 * @param klass
 *
 * @returns {Promise}
 */
UI.widgets.registrationControl = function (context, instance, klass) {
  var kb = UI.store
  var ns = UI.ns
  var dom = context.dom

  var box = dom.createElement('div')
  context.div.appendChild(box)

  return UI.widgets.ensureTypeIndexes(context)
    .then(function (context) {
      box.innerHTML = '<table><tbody><tr></tr><tr></tr></tbody></table>' // tbody will be inserted anyway
      box.setAttribute('style', 'font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;')
      var tbody = box.children[0].children[0]
      var form = kb.bnode()// @@ say for now

      var registrationStatements = function (index) {
        var registrations = kb.each(undefined, ns.solid('instance'), instance)
          .filter(function (r) { return kb.holds(r, ns.solid('forClass'), klass) })
        var reg = registrations.length ? registrations[0] : UI.widgets.newThing(index)
        return [ $rdf.st(reg, ns.solid('instance'), instance, index),
          $rdf.st(reg, ns.solid('forClass'), klass, index) ]
      }

      var index, statements

      if (context.index.public && context.index.public.length > 0) {
        index = context.index.public[0]
        statements = registrationStatements(index)
        tbody.children[0].appendChild(UI.widgets.buildCheckboxForm(
          context.dom, UI.store, 'Public link to this ' + context.noun, null, statements, form, index))
      }

      if (context.index.private && context.index.private.length > 0) {
        index = context.index.private[0]
        statements = registrationStatements(index)
        tbody.children[1].appendChild(UI.widgets.buildCheckboxForm(
          context.dom, UI.store, 'Personal note of this ' + context.noun, null, statements, form, index))
      }

      // UI.widgets.buildCheckboxForm(dom, kb, lab, del, ins, form, store)
      return context
    })
}

/**
 * UI to List at all registered things
 * @param context
 * @param options
 *
 * @returns {Promise}
 */
UI.widgets.registrationList = function (context, options) {
  return new Promise(function (resolve, reject) {
    var kb = UI.store
    var ns = UI.ns
    var dom = context.dom

    var box = dom.createElement('div')
    context.div.appendChild(box)

    return UI.widgets.ensureTypeIndexes(context)
      .then(function (indexes) {
        box.innerHTML = '<table><tbody></tbody></table>' // tbody will be inserted anyway
        box.setAttribute('style', 'font-size: 120%; text-align: right; padding: 1em; border: solid #eee 0.5em;')
        var table = box.firstChild

        var ix = []
        var sts = []
        var vs = ['private', 'public']
        vs.forEach(function (visibility) {
          if (options[visibility]) {
            ix = ix.concat(context.index[visibility][0])
            sts = sts.concat(kb.statementsMatching(
              undefined, ns.solid('instance'), undefined, context.index[visibility][0]))
          }
        })

        for (var i = 0; i < sts.length; i++) {
          var statement = sts[i]
          // var cla = statement.subject
          var inst = statement.object
          // if (false) {
          //   var tr = table.appendChild(dom.createElement('tr'))
          //   var anchor = tr.appendChild(dom.createElement('a'))
          //   anchor.setAttribute('href', inst.uri)
          //   anchor.textContent = UI.utils.label(inst)
          // } else {
          // }

          var deleteInstance = function (x) {
            kb.updater.update([statement], [], function (uri, ok, errorBody) {
              if (ok) {
                console.log('Removed from index: ' + statement.subject)
              } else {
                console.log('Error: Cannot delete ' + statement + ': ' + errorBody)
              }
            })
          }
          var opts = { deleteFunction: deleteInstance }
          var tr = UI.widgets.personTR(dom, ns.solid('instance'), inst, opts)
          table.appendChild(tr)
        }

        /*
         //var containers = kb.each(klass, ns.solid('instanceContainer'));
         if (containers.length) {
         fetcher.load(containers).then(function(xhrs){
         for (var i=0; i<containers.length; i++) {
         var cont = containers[i];
         instances = instances.concat(kb.each(cont, ns.ldp('contains')));
         }
         });
         }
         */

        resolve(context)
      })
  })
}

/**
 * Simple Access Control
 *
 * This function sets up a simple default ACL for a resource, with
 * RWC for the owner, and a specified access (default none) for the public.
 * In all cases owner has read write control.
 * Parameter lists modes allowed to public
 *
 * @param docURI
 * @param me {NamedNode} WebID of user
 * @param options
 * @param options.public {Array<string>} eg [ 'Read', 'Write']
 * @param callback
 */
UI.widgets.setACLUserPublic = function (docURI, me, options, callback) {
  var genACLtext = function (docURI, aclURI, options) {
    options = options || {}
    var optPublic = options.public || []
    var g = $rdf.graph()
    var auth = $rdf.Namespace('http://www.w3.org/ns/auth/acl#')
    var a = g.sym(aclURI + '#a1')
    var acl = g.sym(aclURI)
    var doc = g.sym(docURI)
    g.add(a, UI.ns.rdf('type'), auth('Authorization'), acl)
    g.add(a, auth('accessTo'), doc, acl)
    if (options.defaultForNew) {
      g.add(a, auth('defaultForNew'), doc, acl)
    }
    g.add(a, auth('agent'), me, acl)
    g.add(a, auth('mode'), auth('Read'), acl)
    g.add(a, auth('mode'), auth('Write'), acl)
    g.add(a, auth('mode'), auth('Control'), acl)

    if (optPublic.length) {
      a = g.sym(aclURI + '#a2')
      g.add(a, UI.ns.rdf('type'), auth('Authorization'), acl)
      g.add(a, auth('accessTo'), doc, acl)
      g.add(a, auth('agentClass'), UI.ns.foaf('Agent'), acl)
      for (var p = 0; p < optPublic.length; p++) {
        g.add(a, auth('mode'), auth(optPublic[p]), acl) // Like 'Read' etc
      }
    }
    return $rdf.serialize(acl, g, aclURI, 'text/turtle')
  }
  var kb = UI.store
  var aclDoc = kb.any(kb.sym(docURI),
        kb.sym('http://www.iana.org/assignments/link-relations/acl')) // @@ check that this get set by web.js
  if (aclDoc) { // Great we already know where it is
    var aclText = genACLtext(docURI, aclDoc.uri, options)
    UI.widgets.webOperation('PUT', aclDoc.uri, { data: aclText, contentType: 'text/turtle' }, callback)
  } else {
    kb.fetcher.nowOrWhenFetched(docURI, undefined, function (ok, body) {
      if (!ok) return callback(ok, 'Getting headers for ACL: ' + body)
      var aclDoc = kb.any(kb.sym(docURI),
                kb.sym('http://www.iana.org/assignments/link-relations/acl')) // @@ check that this get set by web.js
      if (!aclDoc) {
                // complainIfBad(false, "No Link rel=ACL header for " + docURI);
        callback(false, 'No Link rel=ACL header for ' + docURI)
      } else {
        var aclText = genACLtext(docURI, aclDoc.uri, options)
        UI.widgets.webOperation('PUT', aclDoc.uri, { data: aclText, contentType: 'text/turtle' }, callback)
      }
    })
  }
}

UI.widgets.offlineTestID = function () {
  if (typeof $SolidTestEnvironment !== 'undefined' && $SolidTestEnvironment.username) { // Test setup
    console.log('Assuming the user is ' + $SolidTestEnvironment.username)
    return $rdf.sym($SolidTestEnvironment.username)
  }

  if (tabulator.mode === 'webapp' && typeof document !== 'undefined' &&
        document.location && ('' + document.location).slice(0, 16) === 'http://localhost') {
    var div = document.getElementById('appTarget')
    if (!div) return null
    var id = div.getAttribute('testID')
    if (!id) return null
        /* me = kb.any(subject, UI.ns.acl('owner')); // when testing on plane with no webid
        */
    console.log('Assuming user is ' + id)
    return $rdf.sym(id)
  }
  return null
}

/**
 * Bootstrapping identity
 *
 * @param myDocument
 * @param gotOne
 *
 * @returns {Element}
 */
UI.widgets.signInOrSignUpBox = function (myDocument, gotOne) {
  var box = myDocument.createElement('div')
  var p = myDocument.createElement('p')
  box.appendChild(p)
  box.className = 'mildNotice'
  p.innerHTML = ('You need to log in with a Web ID')
  console.log('UI.widgets.signInOrSignUpBox')

  var but = myDocument.createElement('input')
  box.appendChild(but)
  but.setAttribute('type', 'button')
  but.setAttribute('value', 'Log in')
  but.setAttribute('style', 'padding: 1em; border-radius:0.5em; margin: 2em;')
  but.addEventListener('click', function (e) {
    var offline = UI.widgets.offlineTestID()
    if (offline) return gotOne(offline.uri)
    Solid.auth.login().then(function (uri) {
      console.log('signInOrSignUpBox logged in up ' + uri)
      gotOne(uri)
    })
  }, false)

  var but2 = myDocument.createElement('input')
  box.appendChild(but2)
  but2.setAttribute('type', 'button')
  but2.setAttribute('value', 'Sign Up')
  but2.setAttribute('style', 'padding: 1em; border-radius:0.5em; margin: 2em;')
  but2.addEventListener('click', function (e) {
    Solid.auth.signup().then(function (uri) {
      console.log('signInOrSignUpBox signed up ' + uri)
      gotOne(uri)
    })
  }, false)
  return box
}

//  Check user and set 'me' if found
UI.widgets.checkUserSetMe = function (doc) {
  return UI.widgets.checkUser(doc, (user) => {
    user = user || '' // null means no login
    var uri = user.uri || user

    var meUri = tabulator.preferences.get('me')

    if (uri === meUri) return null

    var message
    if (!uri) {
            // message = "(Log in by auth with no URI - ignored)";
      message = '(NOT logged in by authentication.)'
            // This may be happen a http://localhost/ test enviroment
    } else {
      tabulator.preferences.set('me', uri)
      message = '(Logged in as ' + uri + ' by authentication.)'
    }

    console.log(message)
  })
}

// For a user authenticated using webid (or possibly other methods) it
// is not immediately available to the client which person(a) it is.
// The solid standard way is for the server to send the information back as a User: header.

UI.widgets.userCheckSite = 'https://databox.me/'

/**
 * @param doc {NamedNode} Uri of a server to ask for the User: header
 * @param setUser {Function} Callback, `setUser(webId|null)`
 * @returns {*}
 */
UI.widgets.checkUser = function (doc, setUser) {
  var kb = UI.store

  // Check for offline mode override
  if (typeof $SolidTestEnvironment !== 'undefined' && $SolidTestEnvironment.username) { // Test setup
    tabulator.preferences.set('me', $SolidTestEnvironment.username)
    return setUser($SolidTestEnvironment.username)
  }

  // Check to see if already logged in / have the WebID
  var meUri = tabulator.preferences.get('me')
  if (meUri) return setUser(meUri)

  var userMirror = kb.any(doc, UI.ns.link('userMirror'))
  if (!userMirror) userMirror = doc

  kb.fetcher.nowOrWhenFetched(userMirror.uri, undefined, function (ok, body) {
    if (!ok) {
      var message = 'checkUser: Unable to load ' + userMirror.uri + ': ' + body
      console.log(message)
      setUser(null)
    } else {
      var allUserHeaders = []
      var requests = kb.each(undefined, UI.ns.link('requestedURI'), $rdf.uri.docpart(userMirror.uri))
      requests.map(function (request) {
        var response = kb.any(request, UI.ns.link('response'))
        if (response !== undefined) {
          var userHeaders = kb.each(response, UI.ns.httph('user'))
          allUserHeaders = allUserHeaders.concat(userHeaders)
        }
      })

      if (allUserHeaders.length === 0) {
        if (userMirror.uri !== UI.widgets.userCheckSite) {
          console.log('CheckUser: non-solid server' + userMirror + ': trying ' +
            UI.widgets.userCheckSite)

          UI.widgets.checkUser(kb.sym(UI.widgets.userCheckSite), setUser)
          console.log('Fail to get username even from ' + UI.widgets.userCheckSite)
        } else {
          setUser(null) // Fail, we have even tried the userCheckSite
        }
      } else {
        var username = allUserHeaders[0].value.trim()

        if (username.slice(0, 4) !== 'dns:') {
          // dns: are pseudo-usernames from rww.io and don't count
          tabulator.preferences.set('me', username)
          setUser(username)
        } else {
          tabulator.preferences.set('me', '')
          setUser(null)
        }
      }
    }
  })
}

/**
 * What ID does the user use to log into the given target?
 *
 * @param context
 * @param setUser
 *
 * @returns {Promise}
 */
UI.widgets.checkUserForTarget = function (context, setUser) {
  var kb = UI.store

  return kb.fetcher.load(context.target)
    .then(() => {
      kb.each(undefined, UI.ns.link('requestedURI'), context.target.uri)
        .map(function (request) {
          var response = kb.any(request, UI.ns.link('response'))

          if (response) {
            var userHeaders = kb.each(response, UI.ns.httph('user'))
            if (userHeaders.length === 0) {
              console.log('CheckUser: non-solid server: trying ' +
                UI.widgets.userCheckSite)

              UI.widgets.checkUser(kb.sym(UI.widgets.userCheckSite), setUser)
            } else {
              userHeaders.map(function (userHeader) {
                var username = userHeader.value.trim()

                if (username.slice(0, 4) !== 'dns:') {
                  // dns: are pseudo-usernames from rww.io and don't count
                  context.me = $rdf.sym(username)
                  tabulator.preferences.set('me', username)
                }
              })
            }
          }

          return context
        })
    })
}

/**
 * Login status box
 *
 * A big sign-up/sign in box or a logout box depending on the state
 *
 * @param myDocument
 * @param listener
 *
 * @returns {Element}
 */
UI.widgets.loginStatusBox = function (myDocument, listener) {
  var meUri = tabulator.preferences.get('me')
  var me = meUri && UI.store.sym(meUri)

  var box = myDocument.createElement('div')

  var setIt = function (newidURI) {
    var uri = newidURI.uri || newidURI // Just in case
    tabulator.preferences.set('me', uri)
    me = $rdf.sym(uri)
    // var message = 'Your Web ID is now ' + me + ' .'
    box.refresh()
    if (listener) listener(me.uri)
  }

  var zapIt = function () {
    tabulator.preferences.set('me', '')
    var message = 'Your Web ID was ' + me + '. It has been forgotten.'
    meUri = ''
    me = null
    try {
      UI.log.alert(message)
    } catch (e) {
      try {
        window.alert(message)
      } catch (e) {
      };
    }
    box.refresh()
    if (listener) listener(null)
  }

  var logoutButton = function (me) {
    var logoutLabel = 'Web ID logout'
    if (me) {
      var nick = UI.store.any(me, UI.ns.foaf('nick')) ||
                UI.store.any(me, UI.ns.foaf('name'))
      if (nick) {
        logoutLabel = 'Logout ' + nick.value
      };
    };
    var signOutButton = myDocument.createElement('input')
    signOutButton.className = 'WebIDCancelButton'
    signOutButton.setAttribute('type', 'button')
    signOutButton.setAttribute('value', logoutLabel)
    signOutButton.addEventListener('click', zapIt, false)
    return signOutButton
  }

  box.refresh = function () {
    var meUri = tabulator.preferences.get('me') || ''
    var me = meUri ? UI.store.sym(meUri) : null
    if (box.me !== meUri) {
      UI.widgets.clearElement(box)
      if (me) {
        box.appendChild(logoutButton(me))
      } else {
        box.appendChild(UI.widgets.signInOrSignUpBox(myDocument, setIt))
      };
    }
    box.me = meUri
  }

  box.me = '99999'  // Force refresh
  box.refresh()

  return box
}

/**
 * Workspace selection etc
 */

/**
 * Returns a UI object which, if it selects a workspace,
 * will callback(workspace, newBase).
 *
 * If necessary, will get an account, preferences file, etc. In sequence:
 *
 *   - If not logged in, log in.
 *   - Load preferences file
 *   - Prompt user for workspaces
 *   - Allows the user to just type in a URI by hand
 *
 * Calls back with the ws and the base URI
 *
 * @param dom
 * @param appDetails
 * @param callbackWS
 * @returns {Element}
 */
UI.widgets.selectWorkspace = function (dom, appDetails, callbackWS) {
  var noun = appDetails.noun
  var appPathSegment = appDetails.appPathSegment

  var meUri = tabulator.preferences.get('me')
  var me = meUri && UI.store.sym(meUri)
  var kb = UI.store
  var box = dom.createElement('div')
  var context = { me: me, dom: dom, div: box }

  var say = function (s) { box.appendChild(UI.widgets.errorMessageBlock(dom, s)) }

  var figureOutBase = function (ws) {
    var newBase = kb.any(ws, UI.ns.space('uriPrefix'))
    if (!newBase) {
      newBase = ws.uri.split('#')[0]
    } else {
      newBase = newBase.value
    }
    if (newBase.slice(-1) !== '/') {
      console.log(appPathSegment + ': No / at end of uriPrefix ' + newBase) // @@ paramater?
      newBase = newBase + '/'
    }
    var now = new Date()
    newBase += appPathSegment + '/id' + now.getTime() + '/' // unique id

    callbackWS(ws, newBase)
  }

  var displayOptions = function (context) {
    // var status = ''
    var id = context.me
    var preferencesFile = context.preferencesFile

    // A workspace specifically defined in the private preferences file:
    var w = kb.statementsMatching(id, UI.ns.space('workspace'), // Only trust prefs file here
      undefined, preferencesFile).map(function (st) { return st.object })

    // A workspace in a storage in the public profile:
    var storages = kb.each(id, UI.ns.space('storage'))  // @@ No provenance requirement at the moment
    storages.map(function (s) {
      w = w.concat(kb.each(s, UI.ns.ldp('contains')))
    })

    // if (pending !== undefined) pending.parentNode.removeChild(pending);
    if (w.length === 1) {
      say('Workspace used: ' + w[0].uri)  // @@ allow user to see URI
      var newBase = figureOutBase(w[0])
      callbackWS(w[0], newBase)
    } else if (w.length === 0) {
      say("You don't seem to have any workspaces. You have " + storages.length + ' storages.')
      say('@@ code me: create new workspace.')
    } else {
      // Prompt for ws selection or creation
      // say( w.length + " workspaces for " + id + "Chose one.");
      var table = dom.createElement('table')
      table.setAttribute('style', 'border-collapse:separate; border-spacing: 0.5em;')

      // var popup = window.open(undefined, '_blank', { height: 300, width:400 }, false)
      box.appendChild(table)

      //  Add a field for directly adding the URI yourself

      // var hr = box.appendChild(dom.createElement('hr')) // @@
      box.appendChild(dom.createElement('hr')) // @@

      var p = box.appendChild(dom.createElement('p'))
      p.textContent = 'Where would you like to store the data for the ' + noun + '?  ' +
        'Give the URL of the directory where you would like the data stored.'
      var baseField = box.appendChild(dom.createElement('input'))
      baseField.setAttribute('type', 'text')
      baseField.size = 80 // really a string
      baseField.label = 'base URL'
      baseField.autocomplete = 'on'

      context.baseField = baseField

      box.appendChild(dom.createElement('br')) // @@

      var button = box.appendChild(dom.createElement('button'))
      button.textContent = 'Start new ' + noun + ' at this URI'
      button.addEventListener('click', function (e) {
        var newBase = baseField.value
        if (newBase.slice(-1) !== '/') {
          newBase += '/'
        }
        callbackWS(null, newBase)
      })

      // Now go set up the table of spaces

      // var row = 0
      w = w.filter(function (x) {
        return !(kb.holds(x, UI.ns.rdf('type'), // Ignore master workspaces
          UI.ns.space('MasterWorkspace')))
      })
      var col1, col2, col3, tr, ws, style, comment
      var cellStyle = 'height: 3em; margin: 1em; padding: 1em white; border-radius: 0.3em;'
      var deselectedStyle = cellStyle + 'border: 0px;'
      // var selectedStyle = cellStyle + 'border: 1px solid black;'
      for (var i = 0; i < w.length; i++) {
        ws = w[i]
        tr = dom.createElement('tr')
        if (i === 0) {
          col1 = dom.createElement('td')
          col1.setAttribute('rowspan', '' + w.length + 1)
          tr.appendChild(col1)
        }
        col2 = dom.createElement('td')
        style = kb.any(ws, UI.ns.ui('style'))
        if (style) {
          style = style.value
        } else { // Otherise make up arbitrary colour
          var hash = function (x) { return x.split('').reduce(function (a, b) { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0) }
          var bgcolor = '#' + ((hash(ws.uri) & 0xffffff) | 0xc0c0c0).toString(16) // c0c0c0  forces pale
          style = 'color: black ; background-color: ' + bgcolor + ';'
        }
        col2.setAttribute('style', deselectedStyle + style)
        tr.target = ws.uri
        var label = kb.any(ws, UI.ns.rdfs('label'))
        if (!label) {
          label = ws.uri.split('/').slice(-1)[0] || ws.uri.split('/').slice(-2)[0]
        }
        col2.textContent = label || '???'
        tr.appendChild(col2)
        if (i === 0) {
          col3 = dom.createElement('td')
          col3.setAttribute('rowspan', '' + w.length + 1)
          // col3.textContent = '@@@@@ remove';
          col3.setAttribute('style', 'width:50%;')
          tr.appendChild(col3)
        }
        table.appendChild(tr)

        var addMyListener = function (container, detail, style, ws1) {
          container.addEventListener('click', function (e) {
            col3.textContent = detail
            col3.setAttribute('style', style)
            col3.appendChild(addContinueButton(ws1))
          }, true) // capture vs bubble
        }

        var addContinueButton = function (selectedWorkspace) {
          var button = dom.createElement('button')
          button.textContent = 'Continue'
          // button.setAttribute('style', style);
          var newBase = figureOutBase(selectedWorkspace)
          // @@ show the user the URI
          button.addEventListener('click', function (e) {
            button.disabled = true
            callbackWS(selectedWorkspace, newBase)
            button.textContent = '---->'
          }, true) // capture vs bubble
          return button
        }

        comment = kb.any(ws, UI.ns.rdfs('comment'))
        comment = comment ? comment.value : 'Use this workspace'
        addMyListener(col2, comment ? comment.value : '', deselectedStyle + style, ws)
      }

      col1.textContent = 'Chose a workspace for this:'
      col1.setAttribute('style', 'vertical-align:middle;')

      // last line with "Make new workspace"
      var trLast = dom.createElement('tr')
      col2 = dom.createElement('td')
      col2.setAttribute('style', cellStyle)
      col2.textContent = '+ Make a new workspace'
      addMyListener(col2, 'Set up a new workspace', '')
      trLast.appendChild(col2)
      table.appendChild(trLast)
    }
  }

  UI.widgets.logInLoadProfile(context)
    .then(UI.widgets.loadPreferences)
    .then(displayOptions)
  return box
} // selectWorkspace

/**
 * Creates a new instance of an app.
 *
 * An instance of an app could be e.g. an issue tracker for a given project,
 * or a chess game, or calendar, or a health/fitness record for a person.
 *
 * @param dom
 * @param appDetails
 * @param callback
 *
 * @returns {Element} A div with a button in it for making a new app instance
 */
UI.widgets.newAppInstance = function (dom, appDetails, callback) {
  var gotWS = function (ws, base) {
        // $rdf.log.debug("newAppInstance: Selected workspace = " + (ws? ws.uri : 'none'))
    callback(ws, base)
  }
  var div = dom.createElement('div')
  var b = dom.createElement('button')
  b.setAttribute('type', 'button')
  div.appendChild(b)
  b.innerHTML = 'Make new ' + appDetails.noun
    // b.setAttribute('style', 'float: right; margin: 0.5em 1em;'); // Caller should set
  b.addEventListener('click', function (e) {
    div.appendChild(UI.widgets.selectWorkspace(dom, appDetails, gotWS))
  }, false)
  div.appendChild(b)
  return div
}
