//  signin.js     Signing in, signing up, workspace selection, app spawning

const Solid = require('solid-client')
const $rdf = require('rdflib')

var UI = {
  icons: require('./iconBase'),
  log: require('./log'),
  ns: require('./ns'),
  store: require('./store'),
  utils: require('./utils'),
  widgets: require('./widgets')
}

// Look for and load the User who has control over it
UI.widgets.findOriginOwner = function findOriginOwner (doc, callback) {
  var uri = doc.uri || doc
  var i = uri.indexOf('://')
  if (i < 0) return false
  var j = uri.indexOf('/', i + 3)
  if (j < 0) return false
  var origin = uri.slice(0, j + 1) // @@ TBC
  return origin
}

function complain (context, err) {
  var ele = context.statusArea || context.div
  console.log('Complaint: ' + err)
  return ele.appendChild(UI.widgets.errorMessageBlock(context.dom, err))
}
UI.widgets.complain = complain

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

/**
 * @param webId {NamedNode}
 * @param context {Object}
 *
 * @returns {NamedNode|null} Returns the Web ID, after setting it
 */
function setUser (webId, context) {
  context.me = webId

  tabulator.preferences.set('me', webId ? webId.uri : '')

  return webId
}

/**
 * @returns {NamedNode|null}
 */
function storedUser () {
  let webId = tabulator.preferences.get('me')
  return webId ? $rdf.sym(webId) : null
}

/**
 * Resolves with the logged in user's Web ID
 *
 * @param context
 *
 * @returns {Promise<NamedNode|null>}
 */
function logIn (context) {
  const kb = UI.store
  let webId = storedUser()

  if (webId) {
    return Promise.resolve(setUser(webId, context))
  }

  return new Promise((resolve) => {
    let box = loginStatusBox(context.dom, (webIdUri) => {
      resolve(setUser(kb.sym(webIdUri), context))
    })

    context.div.appendChild(box)
  })
}

/**
 * Logs the user in and loads their WebID profile document into the store
 *
 * @param context {Object}
 *
 * @returns {Promise<Object>} Resolves with the context after login / fetch
 */
function logInLoadProfile (context) {
  if (context.publicProfile) { return Promise.resolve(context) } // already done

  const fetcher = UI.store.fetcher
  let profileUri

  return logIn(context)
    .then(webId => {
      if (!webId) {
        throw new Error('Could not log in')
      }

      profileUri = webId.doc()

      // Load the profile into the knowledge base (fetcher.store)
      return fetcher.fetch(profileUri)
    })
    .then(result => {
      if (!result.ok) {
        throw new Error(result.error)
      }

      context.publicProfile = profileUri
      return context
    })
    .catch(err => {
      let message = 'Cannot load profile ' + profileUri + ' : ' + err
      context.div.appendChild(UI.widgets.errorMessageBlock(context.dom, message))
    })
}
UI.widgets.logInLoadProfile = logInLoadProfile

/**
 * Loads preferences file
 * Do this after having done log in and load profile
 *
 * @param context
 *
 * @returns {Promise<context>}
 */
function loadPreferences (context) {
  if (context.preferencesFile) return Promise.resolve(context) // already done

  const kb = UI.store
  const box = context.statusArea || context.div || null
  let preferencesFile = kb.any(context.me, UI.ns.space('preferencesFile'))
  let pending

  return Promise.resolve()
    .then(() => {
      if (!preferencesFile) {
        let message = "Can't find a preferences file for user: " + context.me
        UI.widgets.errorMessageBlock(context.dom, message)
        throw new Error(message)
      }

      context.preferencesFile = preferencesFile
      if (box) {
        pending = UI.widgets.errorMessageBlock(context.dom,
          '(loading preferences ' + preferencesFile + ')', 'straw')
        box.appendChild(pending)
      }

      return kb.fetcher.fetch(preferencesFile)
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
UI.widgets.loadPreferences = loadPreferences

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
function loadTypeIndexes (context) {
  var ns = UI.ns
  var kb = UI.store

  return logInLoadProfile(context)
    .then(loadPreferences)

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

    .catch((e) => {
      complain(context, e)
      throw new Error('Error loading type indexes: ' + e)
    })
}
UI.widgets.loadTypeIndexes = loadTypeIndexes

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
function ensureTypeIndexes (context) {
  return new Promise(function (resolve, reject) {
    return loadTypeIndexes(context)
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
}
UI.widgets.ensureTypeIndexes = ensureTypeIndexes

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
function findAppInstances (context, klass) {
  var kb = UI.store
  var ns = UI.ns
  var fetcher = UI.store.fetcher
  var registrations = kb.each(undefined, ns.solid('forClass'), klass)
  var instances = []
  var containers = []

  return loadTypeIndexes(context)
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
UI.widgets.findAppInstances = findAppInstances

/**
 * UI to control registration of instance
 *
 * @param context
 * @param instance
 * @param klass
 *
 * @returns {Promise}
 */
function registrationControl (context, instance, klass) {
  var kb = UI.store
  var ns = UI.ns
  var dom = context.dom

  var box = dom.createElement('div')
  context.div.appendChild(box)

  return ensureTypeIndexes(context)
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
UI.widgets.registrationControl = registrationControl

/**
 * UI to List at all registered things
 * @param context
 * @param options
 *
 * @returns {Promise}
 */
function registrationList (context, options) {
  const kb = UI.store
  const ns = UI.ns
  const dom = context.dom

  var box = dom.createElement('div')
  context.div.appendChild(box)

  return ensureTypeIndexes(context)
    .then((indexes) => {
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

      return context
    })
}
UI.widgets.registrationList = registrationList

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
 * @param options.public {Array<string>} eg ['Read', 'Write']
 *
 * @returns {Promise<NamedNode>} Resolves with aclDoc uri on successful write
 */
function setACLUserPublic (docURI, me, options) {
  const kb = UI.store
  let aclDoc = kb.any(kb.sym(docURI),
    kb.sym('http://www.iana.org/assignments/link-relations/acl'))

  return Promise.resolve()
    .then(() => {
      if (aclDoc) { return aclDoc }

      return fetchACLRel(docURI)
        .catch(err => {
          throw new Error(`Error fetching rel=ACL header for ${docURI}: ${err}`)
        })
    })
    .then(aclDoc => {
      let aclText = genACLText(docURI, me, aclDoc.uri, options)

      return kb.fetcher.webOperation('PUT', aclDoc.uri,
          { data: aclText, contentType: 'text/turtle' })
        .then(result => {
          if (!result.ok) {
            throw new Error('Error writing ACL text: ' + result.error)
          }

          return aclDoc
        })
    })
}
UI.widgets.setACLUserPublic = setACLUserPublic

/**
 * @param docURI {string}
 * @returns {Promise<NamedNode|null>}
 */
function fetchACLRel (docURI) {
  const kb = UI.store
  const fetcher = kb.fetcher

  return fetcher.fetch(docURI)
    .then(result => {
      if (!result.ok) {
        throw new Error('While fetching:' + result.error)
      }

      let aclDoc = kb.any(kb.sym(docURI),
        kb.sym('http://www.iana.org/assignments/link-relations/acl'))

      if (!aclDoc) {
        throw new Error('No Link rel=ACL header for ' + docURI)
      }

      return aclDoc
    })
}

/**
 * @param docURI {string}
 * @param me {NamedNode}
 * @param aclURI {string}
 * @param options {Object}
 *
 * @returns {string} Serialized ACL
 */
function genACLText (docURI, me, aclURI, options = {}) {
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
    for (let p = 0; p < optPublic.length; p++) {
      g.add(a, auth('mode'), auth(optPublic[p]), acl) // Like 'Read' etc
    }
  }
  return $rdf.serialize(acl, g, aclURI, 'text/turtle')
}

function offlineTestID () {
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
UI.widgets.offlineTestID = offlineTestID

/**
 * Bootstrapping identity
 *
 * @param myDocument
 * @param gotOne
 *
 * @returns {Element}
 */
function signInOrSignUpBox (myDocument, gotOne) {
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
UI.widgets.signInOrSignUpBox = signInOrSignUpBox

// For a user authenticated using webid (or possibly other methods) it
// is not immediately available to the client which person(a) it is.
// The solid standard way is for the server to send the information back as a User: header.

UI.widgets.userCheckSite = 'https://databox.me/'

/**
 * @param doc {NamedNode} Uri of a server to ask for the User: header
 * @param [setUser] {Function} Optional callback, `setUser(webId|null)`
 *
 * @returns {Promise<string|null>} Resolves with web id, if no callback provided
 */
function checkUser (doc, setUser) {
  const kb = UI.store

  // Check for offline mode override
  if (typeof $SolidTestEnvironment !== 'undefined' && $SolidTestEnvironment.username) { // Test setup
    tabulator.preferences.set('me', $SolidTestEnvironment.username)
    return setUser($SolidTestEnvironment.username)
  }

  // Check to see if already logged in / have the WebID
  var meUri = tabulator.preferences.get('me')
  if (meUri) return setUser(meUri)

  doc = kb.any(doc, UI.ns.link('userMirror')) || doc

  return fetchUsername(doc)
    .catch(err => {
      console.log('Error fetching username:', err)
      return null
    })
    .then(webId => {
      // if (webId.startsWith('dns:')) {  // legacy rww.io pseudo-users
      //   webId = null
      // }
      tabulator.preferences.set('me', webId || '')

      if (webId) {
        console.log('(Logged in as ' + webId + ' by authentication.)')
      }

      if (setUser) { return setUser(webId) }

      return webId
    })
}
UI.widgets.checkUser = checkUser

/**
 * @param doc {NamedNode}
 *
 * @returns {Promise<string|null>}
 */
function fetchUsername (doc) {
  const kb = UI.store

  if (!doc) {
    return Promise.reject(new Error('Cannot fetch username for empty uri'))
  }

  return kb.fetcher.fetch(doc.uri)
    .then(response => {
      if (!response.ok) {
        let message = 'fetchUsername: Unable to load ' + doc.uri + ': ' + response
        console.log(message)
        return null
      }

      let allUserHeaders = userHeadersFor(doc)

      if (allUserHeaders.length) {
        // have the username
        return allUserHeaders[0].value.trim()
      }

      if (doc.uri !== UI.widgets.userCheckSite) {
        let newDoc = UI.widgets.userCheckSite
        console.log('fetchUsername: non-solid server' + doc + ': trying ' + newDoc)

        return fetchUsername(kb.sym(newDoc))
      }

      return null
    })
}

function userHeadersFor (doc) {
  if (!doc) { return [] }

  const kb = UI.store
  let allUserHeaders = []

  const requests = kb.each(null, UI.ns.link('requestedURI'), $rdf.uri.docpart(doc.uri))

  requests.map((request) => {
    let response = kb.any(request, UI.ns.link('response'))

    if (response) {
      let userHeaders = kb.each(response, UI.ns.httph('user'))
      allUserHeaders = allUserHeaders.concat(userHeaders)
    }
  })

  return allUserHeaders
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
function loginStatusBox (myDocument, listener) {
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
      }
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
      }
    }
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
      }
    }
    box.me = meUri
  }

  box.me = '99999'  // Force refresh
  box.refresh()

  return box
}
UI.widgets.loginStatusBox = loginStatusBox

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
function selectWorkspace (dom, appDetails, callbackWS) {
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

  logInLoadProfile(context)  // kick off async operation
    .then(loadPreferences)
    .then(displayOptions)

  return box  // return the box element, while login proceeds
} // selectWorkspace
UI.widgets.selectWorkspace = selectWorkspace

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
function newAppInstance (dom, appDetails, callback) {
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
    div.appendChild(selectWorkspace(dom, appDetails, gotWS))
  }, false)
  div.appendChild(b)
  return div
}
UI.widgets.newAppInstance = newAppInstance
