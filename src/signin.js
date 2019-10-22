/**
 * signin.js
 *
 * Signing in, signing up, profile and preferences reloading
 * Type index management
 *
 *  Many functions in this module take a context object, add to it, and return a promise of it.
 */
 /* global  localStorage confirm alert */

// const Solid = require('solid-client')
const SolidTls = require('solid-auth-tls')
const $rdf = require('rdflib')
// const error = require('./widgets/error')
const widgets = require('./widgets/index')
// const utils = require('./utils')
const solidAuthClient = require('solid-auth-client')

const UI = {
  authn: require('./signin'),
  icons: require('./iconBase'),
  log: require('./log'),
  ns: require('./ns'),
  store: require('./store'),
  style: require('./style'),
  utils: require('./utils'),
  widgets: require('./widgets') // 2018-07-31
}

const ns = UI.ns
const kb = UI.store

module.exports = {
  checkUser,   // Async
  currentUser, // Sync
  defaultTestUser, // Sync
  filterAvailablePanes, // Async
  findAppInstances,
  findOriginOwner,
  getUserRoles, // Async
  loadTypeIndexes,
  logIn,
  logInLoadProfile,
  logInLoadPreferences,
  loginStatusBox,
  newAppInstance,
  offlineTestID,
  registerInTypeIndex,
  registrationControl,
  registrationList,
  selectWorkspace,
  setACLUserPublic,
  saveUser,
  solidAuthClient
}

// const userCheckSite = 'https://databox.me/'

// Look for and load the User who has control over it
function findOriginOwner (doc, callback) {
  var uri = doc.uri || doc
  var i = uri.indexOf('://')
  if (i < 0) return false
  var j = uri.indexOf('/', i + 3)
  if (j < 0) return false
  var origin = uri.slice(0, j + 1) // @@ TBC
  return origin
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

/**
 * @param webId {NamedNode}
 * @param context {Object}
 *
 * @returns {NamedNode|null} Returns the Web ID, after setting it
 */
function saveUser (webId, context) {
  let webIdUri, me
  if (webId) {
    webIdUri = webId.uri || webId
    let me = $rdf.namedNode(webIdUri)
    if (context) {
      context.me = me
    }
    return me
  }
  return me || null
}

/**
 * @returns {NamedNode|null}
 */
function defaultTestUser () {
  // Check for offline override
  let offlineId = offlineTestID()

  if (offlineId) {
    return offlineId
  }

  return null
}

/** Checks syncronously whether user is logged in
 *
 * @returns Named Node or null
*/
function currentUser () {
  let str = localStorage['solid-auth-client']
  if (str) {
    let da = JSON.parse(str)
    if (da.session && da.session.webId) {
      // @@ check has not expired
      return $rdf.sym(da.session.webId)
    }
  }
  return offlineTestID() // null unless testing
  // JSON.parse(localStorage['solid-auth-client']).session.webId
}

/**
 * Resolves with the logged in user's Web ID
 *
 * @param context
 *
 * @returns {Promise<context>}
 */
function logIn (context) {
  let me = defaultTestUser()  // me is a NamedNode or null

  if (me) {
    context.me = me
    return Promise.resolve(context)
  }

  return new Promise((resolve) => {
    checkUser().then(webId => { // Already logged in?
      if (webId) {
        context.me = $rdf.sym(webId)
        console.log('logIn: Already logged in as ' + context.me)
        return resolve(context)
      }
      if (!context.div || !context.dom) {
        return resolve(context)
      }
      const box = loginStatusBox(context.dom, (webIdUri) => {
        saveUser(webIdUri, context)
        resolve(context) // always pass growing context
      })
      context.div.appendChild(box)
    })
  })
}

/**
 * Logs the user in and loads their WebID profile document into the store
 *
 * @private
 *
 * @param context {Object}
 *
 * @returns {Promise<Object>} Resolves with the context after login / fetch
 */
function logInLoadProfile (context) {
  if (context.publicProfile) { return Promise.resolve(context) } // already done
  const fetcher = UI.store.fetcher
  var profileDocument
  return new Promise(function (resolve, reject) {
    return logIn(context)
      .then(context => {
        let webID = context.me
        if (!webID) {
          return reject(new Error('Could not log in'))
        }
        profileDocument = webID.doc()
        // Load the profile into the knowledge base (fetcher.store)
        //   withCredentials: Web arch should let us just load by turning off creds helps CORS
        //   reload: Gets around a specifc old Chrome bug caching/origin/cors
        fetcher.load(profileDocument, {withCredentials: false, cache: 'reload'})
          .then(response => {
            context.publicProfile = profileDocument
            resolve(context)
          })
          .catch(err => {
            let message = 'Logged in but cannot load profile ' + profileDocument + ' : ' + err
            if (context.div && context.dom) {
              context.div.appendChild(UI.widgets.errorMessageBlock(context.dom, message))
            }
            reject(message)
          })
      })
      .catch(err => { reject(new Error("Can't log in: " + err)) })
  })
}

/**
 * Loads preferences file
 * Do this after having done log in and load profile
 *
 * @private
 *
 * @param context
 *
 * @returns {Promise<context>}
 */
function logInLoadPreferences (context) {
  if (context.preferencesFile) return Promise.resolve(context) // already done

  const kb = UI.store
  const statusArea = context.statusArea || context.div || null
  var progressDisplay
  return new Promise(function (resolve, reject) {
    return logInLoadProfile(context)
      .then(context => {
        let preferencesFile = kb.any(context.me, UI.ns.space('preferencesFile'))
        function complain (message) {
          message = 'logInLoadPreferences: ' + message
          if (statusArea) {
            // statusArea.innerHTML = ''
            statusArea.appendChild(UI.widgets.errorMessageBlock(context.dom, message))
          }
          console.log(message)
          reject(new Error(message))
        }

        /** Are we working cross-origin?
        *
        * @returns {Boolean} True if we are in a webapp at an origin, and the file origin is different
        */
        function differentOrigin () {
          return window.location && (window.location.origin + '/' !== preferencesFile.site().uri)
        }

        if (!preferencesFile) {
          let message = "Can't find a preferences file pointer in profile " + context.publicProfile
          return reject(new Error(message))
        }

        // //// Load preferences file
        return kb.fetcher
          .load(preferencesFile, {withCredentials: true})
          .then(function () {
            if (progressDisplay) {
              progressDisplay.parentNode.removeChild(progressDisplay)
            }
            context.preferencesFile = preferencesFile
            return resolve(context)
          })
          .catch(function (err) { // Really important to look at why
            let status = err.status
            let message = err.message
            console.log('HTTP status ' + status + ' for pref file ' + preferencesFile)
            let m2
            if (status === 401) {
              m2 = 'Strange - you are not authenticated (properly logged on) to read preferences file.'
              alert(m2)
            } else if (status === 403) {
              if (differentOrigin()) {
                m2 = 'Unauthorized: Assuming prefs file blocked for origin ' + window.location.origin
                context.preferencesFileError = m2
                return resolve(context)
              }
              m2 = 'You are not authorized to read your preferences file. This may be because you are using an untrusted web app.'
              console.warn(m2)
            } else if (status === 404) {
              if (confirm('You do not currently have a Preferences file. Ok for me to create an empty one? ' + preferencesFile)) {
                // @@@ code me  ... weird to have a name o fthe file but no file
                alert('Sorry; I am not prepared to do this. Please create an empty file at ' + preferencesFile)
                return complain(new Error('Sorry; no code yet to create a preferences file at '))
              } else {
                reject(new Error('User declined to create a preferences file at ' + preferencesFile))
              }
            } else {
              m2 = 'Strange: Error ' + status + ' trying to read your preferences file.' + message
              alert(m2)
            }
          }) // load prefs file then
      })
      .catch(err => { // Fail initial login load prefs
        reject(new Error('(via loadPrefs) ' + err))
      })
  })
}

/**
 * Resolves with the same context, outputting
 * output: index.public, index.private
 *
 * @see https://github.com/solid/solid/blob/master/proposals/data-discovery.md#discoverability
 *
 * @param context
 * @param context.div - place to put UI
 *
 * @returns {Promise<context>}
 */
async function loadTypeIndexes (context) {
  await loadPublicTypeIndex(context)
  await loadPrivateTypeIndex(context)
}

async function loadPublicTypeIndex (context) {
  return loadIndex(context, ns.solid('publicTypeIndex'), true)
}
async function loadPrivateTypeIndex (context) {
  return loadIndex(context, ns.solid('privateTypeIndex'), false)
}
async function loadOneTypeIndex (context, isPublic) {
  let predicate = isPublic ? ns.solid('publicTypeIndex') : ns.solid('privateTypeIndex')
  return loadIndex(context, predicate, isPublic)
}

async function loadIndex (context, predicate, isPublic) {
  var ns = UI.ns
  var kb = UI.store

 // Loading preferences is more than loading profile
  try {
    await isPublic ? logInLoadProfile(context) : logInLoadPreferences(context)
  } catch (err) {
    UI.widgets.complain(context, 'loadPubicIndex: login and load problem ' + err)
  }
  var me = context.me
  var ixs
  context.index = context.index || {}

  if (isPublic) {
    ixs = kb.each(me, predicate, undefined, context.publicProfile)
    context.index.public = ixs
  } else {
    if (!context.preferencesFileError) {
      ixs = kb.each(me, ns.solid('privateTypeIndex'), undefined, context.preferencesFile)
      context.index.private = ixs
      if (ixs.length === 0) {
        UI.widgets.complain('Your preference file ' + context.preferencesFile + ' does not point to a private type index.')
        return context
      }
    } else {
      console.log('We know your preferences file is noty available, so not bothering with private type indexes.')
    }
  }

  try {
    await kb.fetcher.load(ixs)
  } catch (err) {
    UI.widgets.complain(context, 'loadPubicIndex: loading public type index ' + err)
  }
  return context
}

/**
 * Resolves with the same context, outputting
 * @see https://github.com/solid/solid/blob/master/proposals/data-discovery.md#discoverability
 *
 * @private
 *
 * @param context {Object}
 * @param context.me
 * @param context.preferencesFile
 * @param context.preferencesFileError - Set if preferences file is blocked at theis origin so don't use it
 * @param context.publicProfile
 * @param context.index
 *
 * @returns {Promise}
 */
async function ensureTypeIndexes (context) {
  await ensureOneTypeIndex(context, true)
  await ensureOneTypeIndex(context, false)
  // return context
}

/* Load or create ONE type index
 * Find one or mke one or fail
 * Many reasons for filing including script not having permission etc
 *
*/
/**
 *  Adds it output to the context
 * @see https://github.com/solid/solid/blob/master/proposals/data-discovery.md#discoverability
 *
 * @private
 *
 * @param context {Object}
 * @param context.me
 * @param context.preferencesFile
 * @param context.preferencesFileError - Set if preferences file is blocked at theis origin so don't use it
 * @param context.publicProfile
 * @param context.index
 *
 * @returns {Promise}
 */

async function ensureOneTypeIndex (context, isPublic) {
  async function makeIndexIfNecesary (context, isPublic) {
    var relevant = isPublic ? context.publicProfile : context.preferencesFile
    const visibility = isPublic ? 'public' : 'private'

    async function putIndex (newIndex) {
      try {
        await kb.fetcher.webOperation('PUT', newIndex.uri, {
          data: '# ' + new Date() + ' Blank initial Type index\n',
          contentType: 'text/turtle'})
        return context
      } catch (e) {
        let msg = 'Error creating new index ' + e
        widgets.complain(context, msg)
      }
    } // putIndex

    context.index = context.index || {}
    context.index[visibility] = context.index[visibility] || []
    var newIndex
    if (context.index[visibility].length === 0) {
      newIndex = $rdf.sym(relevant.dir().uri + visibility + 'TypeIndex.ttl')
      console.log('Linking to new fresh type index ' + newIndex)
      if (!confirm('Ok to create a new empty index file at ' + newIndex + ', overwriting anything that was there?')) {
        throw (new Error('cancelled by user'))
      }
      console.log('Linking to new fresh type index ' + newIndex)
      var addMe = [ $rdf.st(context.me, ns.solid(visibility + 'TypeIndex'), newIndex, relevant) ]
      try {
        await updatePromise([], addMe)
      } catch (err) {
        let msg = 'Error saving type index link saving back ' + newIndex + ': ' + err
        UI.widgets.complain(context, msg)
        return context
      }

      console.log('Creating new fresh type index file' + newIndex)
      await putIndex(newIndex)
      context.index[visibility].push(newIndex) // @@ wait
    } else {  // officially exists
      var ixs = context.index[visibility]
      try {
        await kb.fetcher.load(ixs)
      } catch (err) {
        UI.widgets.complain(context, 'ensureOneTypeIndex: loading indexes ' + err)
      }
    }
  } // makeIndexIfNecesary

  try {
    await loadOneTypeIndex(context, isPublic)
    console.log('ensureOneTypeIndex: Type index exists already ' + isPublic ? context.index.public[0] : context.index.private[0])
    return context
  } catch (error) {
    await makeIndexIfNecesary(context, isPublic)
    // UI.widgets.complain(context, 'calling loadOneTypeIndex:' + error)
  }
}

/**
 * Returns promise of context with arrays of symbols
 *
 * 2016-12-11 change to include forClass arc a la
 * https://github.com/solid/solid/blob/master/proposals/data-discovery.md
 *
 * @param context.div - inuput - Place to put UI for login
 * @param context.instances - output - array of instances
 * @param context.containers - output - array of containers to look in
 * @param klass
 * @returns {Promise}  of context
 */
async function findAppInstances (context, klass, isPublic) {
  var kb = UI.store
  var ns = UI.ns
  var fetcher = UI.store.fetcher
  if (isPublic === undefined) { // Then both public and private
    await findAppInstances(context, klass, true)
    await findAppInstances(context, klass, false)
    return context
  }

  const visibility = isPublic ? 'public' : 'private'
  try {
    await loadOneTypeIndex(context, isPublic)
  } catch (err) {

  }

  var thisIndex = context.index[visibility]
  var registrations = thisIndex.map(ix => kb.each(undefined, ns.solid('forClass'), klass, ix)).flat()
  var instances = registrations.map(reg => kb.each(reg, ns.solid('instance'))).flat()
  var containers = registrations.map(reg => kb.each(reg, ns.solid('instanceContainer'))).flat()

  context.instances = context.instances || []
  context.instances = context.instances.concat(instances)

  context.containers = context.containers || []
  context.containers = context.containers.concat(containers)
  if (!containers.length) {
    return context
  }
  // If the index gives containers, then look up all things within them
  try {
    await fetcher.load(containers)
  } catch (err) {
    var e = new Error('[FAI] Unable to load containers' + err)
    console.log(e) // complain
    UI.widgets.complain(context, `Error looking for ${UI.utils.label(klass)}:  ${err}`)
    // but then ignoire it
    // throw new Error(e)
  }
  for (var i = 0; i < containers.length; i++) {
    var cont = containers[i]
    context.instances = context.instances.concat(kb.each(cont, ns.ldp('contains')))
  }
  return context
}

// @@@@ use teh one in rdflib.js when it is avaiable and delete this
function updatePromise (updater, del, ins) {
  return new Promise(function (resolve, reject) {
    updater.update(del, ins, function (uri, ok, errorBody) {
      if (!ok) {
        reject(new Error(errorBody))
      } else {
        resolve()
      }
    }) // callback
  }) // promise
}
/* Register a new app in a type index
*/
async function registerInTypeIndex (context, instance, klass, isPublic) {
  const kb = UI.store
  const ns = UI.ns
  await ensureOneTypeIndex(context, isPublic)
  const indexes = isPublic ? context.index.public : context.index.private
  if (!indexes.length) throw new Error('registerInTypeIndex: What no type index?')
  const index = indexes[0]
  const registration = UI.widgets.newThing(index)
  const ins = [ // See https://github.com/solid/solid/blob/master/proposals/data-discovery.md
    $rdf.st(registration, ns.rdf('type'), ns.solid('TypeRegistration'), index),
    $rdf.st(registration, ns.solid('forClass'), klass, index),
    $rdf.st(registration, ns.solid('instance'), instance, index)
  ]
  try {
    await updatePromise(kb.updater, [], ins)
  } catch (e) {
    console.log(e)
    alert(e)
  }
  return context
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
function registrationControl (context, instance, klass) {
  var kb = UI.store
  var ns = UI.ns
  var dom = context.dom

  var box = dom.createElement('div')
  context.div.appendChild(box)

  return ensureTypeIndexes(context)
    .then(function () {
      box.innerHTML = '<table><tbody><tr></tr><tr></tr></tbody></table>' // tbody will be inserted anyway
      box.setAttribute('style', 'font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;')
      var tbody = box.children[0].children[0]
      var form = kb.bnode()// @@ say for now

      var registrationStatements = function (index) {
        var registrations = kb.each(undefined, ns.solid('instance'), instance)
          .filter(function (r) { return kb.holds(r, ns.solid('forClass'), klass) })
        var reg = registrations.length ? registrations[0] : widgets.newThing(index)
        return [ $rdf.st(reg, ns.solid('instance'), instance, index),
          $rdf.st(reg, ns.solid('forClass'), klass, index) ]
      }

      var index, statements

      if (context.index.public && context.index.public.length > 0) {
        index = context.index.public[0]
        statements = registrationStatements(index)
        tbody.children[0].appendChild(widgets.buildCheckboxForm(
          context.dom, UI.store, 'Public link to this ' + context.noun, null, statements, form, index))
      }

      if (context.index.private && context.index.private.length > 0) {
        index = context.index.private[0]
        statements = registrationStatements(index)
        tbody.children[1].appendChild(widgets.buildCheckboxForm(
          context.dom, UI.store, 'Personal note of this ' + context.noun, null, statements, form, index))
      }
      return context
    },
    function (e) {
      var msg
      if (context.preferencesFileError) {
        msg = '(Preferences not available)'
        context.div.appendChild(dom.createElement('p')).textContent = msg
      } else {
        msg = 'registrationControl: Type indexes not available: ' + e
        context.div.appendChild(UI.widgets.errorMessageBlock(context.dom, e))
      }
      console.log(msg)
    })
    .catch(function (e) {
      var msg = 'registrationControl: Error making panel:' + e
      context.div.appendChild(UI.widgets.errorMessageBlock(context.dom, e))
      console.log(msg)
    })
}

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
        //   anchor.textContent = utils.label(inst)
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
        var tr = widgets.personTR(dom, ns.solid('instance'), inst, opts)
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

/**
 * @param docURI {string}
 * @returns {Promise<NamedNode|null>}
 */
function fetchACLRel (docURI) {
  const kb = UI.store
  const fetcher = kb.fetcher

  return fetcher.load(docURI)
    .then(result => {
      if (!result.ok) {
        throw new Error('fetchACLRel: While loading:' + result.error)
      }

      let aclDoc = kb.any(kb.sym(docURI),
        kb.sym('http://www.iana.org/assignments/link-relations/acl'))

      if (!aclDoc) {
        throw new Error('fetchACLRel: No Link rel=ACL header for ' + docURI)
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
    // TODO: Should this be auth('default') instead?
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

/**
 * @returns {NamedNode|null}
 */
function offlineTestID () {
  if (typeof $SolidTestEnvironment !== 'undefined' && $SolidTestEnvironment.username) { // Test setup
    console.log('Assuming the user is ' + $SolidTestEnvironment.username)
    return $rdf.sym($SolidTestEnvironment.username)
  }

  if (typeof document !== 'undefined' &&
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
 * (Called by `loginStatusBox()`)
 * @private
 *
 * @param dom
 * @param setUserCallback(user: object)
 *
 * @returns {Element}
 */

function getDefaultSignInButtonStyle () {
  return 'padding: 1em; border-radius:0.5em; margin: 2em; font-size: 100%;'
}

function signInOrSignUpBox (dom, setUserCallback, options) {
  options = options || {}
  const signInButtonStyle = options.buttonStyle || getDefaultSignInButtonStyle()

  var box = dom.createElement('div')
  const magicClassName = 'SolidSignInOrSignUpBox'
  console.log('widgets.signInOrSignUpBox')
  box.setUserCallback = setUserCallback
  box.setAttribute('class', magicClassName)
  box.style = 'display:flex;'

  // Sign in button with PopUP
  let signInPopUpButton = dom.createElement('input') // multi
  box.appendChild(signInPopUpButton)
  signInPopUpButton.setAttribute('type', 'button')
  signInPopUpButton.setAttribute('value', 'Log in')
  signInPopUpButton.setAttribute('style', signInButtonStyle + 'background-color: #eef;')

  signInPopUpButton.addEventListener('click', () => {
    var offline = offlineTestID()
    if (offline) return setUserCallback(offline.uri)
    return solidAuthClient.popupLogin()
      .then(session => {
        let webIdURI = session.webId
        // setUserCallback(webIdURI)
        var divs = dom.getElementsByClassName(magicClassName)
        console.log('Logged in, ' + divs.length + ' panels to be serviced')
        // At the same time, satiffy all the other login boxes
        for (let i = 0; i < divs.length; i++) {
          let div = divs[i]
          if (div.setUserCallback) {
            try {
              div.setUserCallback(webIdURI)
              let parent = div.parentNode
              if (parent) {
                parent.removeChild(div)
              }
            } catch (e) {
              console.log('## Error satisfying login box: ' + e)
              div.appendChild(UI.widgets.errorMessageBlock(dom, e))
            }
          }
        }
      })
  }, false)

  // Sign up button
  let signupButton = dom.createElement('input')
  box.appendChild(signupButton)
  signupButton.setAttribute('type', 'button')
  signupButton.setAttribute('value', 'Sign Up for Solid')
  signupButton.setAttribute('style', signInButtonStyle + 'background-color: #efe;')

  signupButton.addEventListener('click', function (e) {
    let signupMgr = new SolidTls.Signup()
    signupMgr.signup().then(function (uri) {
      console.log('signInOrSignUpBox signed up ' + uri)
      setUserCallback(uri)
    })
  }, false)
  return box
}

/**
 * @returns {Promise<string|null>} Resolves with WebID URI or null
 */
function webIdFromSession (session) {
  var webId = session ? session.webId : null
  if (webId) {
    saveUser(webId)
  }
  return webId
}

/**
 * @returns {Promise<string|null>} Resolves with WebID URI or null
 */
 /*
function checkCurrentUser () {
  return checkUser()
}
*/

/**
 * @param [setUserCallback] {Function} Optional callback, `setUserCallback(webId|null)`
 *
 * @returns {Promise<string|null>} Resolves with web id uri, if no callback provided
 */
function checkUser (setUserCallback) {
  // Check to see if already logged in / have the WebID
  var me = defaultTestUser()
  if (me) {
    return Promise.resolve(setUserCallback ? setUserCallback(me) : me)
  }

  // doc = kb.any(doc, UI.ns.link('userMirror')) || doc

  return solidAuthClient.currentSession()

    .then(webIdFromSession,
      err => {
        console.log('Error fetching currentSession:', err)
        return null
      })

    .then(webId => {
      // if (webId.startsWith('dns:')) {  // legacy rww.io pseudo-users
      //   webId = null
      // }
      var me = saveUser(webId)

      if (me) {
        console.log('(Logged in as ' + me + ' by authentication)')
      }

      return setUserCallback ? setUserCallback(me) : me
    })
}

/**
 * Login status box
 *
 * A big sign-up/sign in box or a logout box depending on the state
 *
 * @param dom
 * @param listener(uri)
 *
 * @returns {Element}
 */
function loginStatusBox (dom, listener, options) { // 20190630
  var me = defaultTestUser()
  var box = dom.createElement('div')

  function setIt (newidURI) {
    if (!newidURI) { return }

    let uri = newidURI.uri || newidURI
//    UI.preferences.set('me', uri)
    me = $rdf.sym(uri)
    box.refresh()
    if (listener) listener(me.uri)
  }

  function logoutButtonHandler (event) {
    // UI.preferences.set('me', '')
    solidAuthClient.logout().then(function () {
      var message = 'Your Web ID was ' + me + '. It has been forgotten.'
      me = null
      try {
        UI.log.alert(message)
      } catch (e) {
        window.alert(message)
      }
      box.refresh()
      if (listener) listener(null)
    }, err => {
      alert('Fail to log out:' + err)
    })
  }

  var logoutButton = function (me, options) {
    options = options || {}
    const signInButtonStyle = options.buttonStyle || getDefaultSignInButtonStyle()
    var logoutLabel = 'Web ID logout'
    if (me) {
      var nick = UI.store.any(me, UI.ns.foaf('nick')) ||
        UI.store.any(me, UI.ns.foaf('name'))
      if (nick) {
        logoutLabel = 'Logout ' + nick.value
      }
    }
    var signOutButton = dom.createElement('input')
    // signOutButton.className = 'WebIDCancelButton'
    signOutButton.setAttribute('type', 'button')
    signOutButton.setAttribute('value', logoutLabel)
    signOutButton.setAttribute('style', signInButtonStyle + 'background-color: #eee;')
    signOutButton.addEventListener('click', logoutButtonHandler, false)
    return signOutButton
  }

  box.refresh = function () {
    solidAuthClient.currentSession().then(session => {
      if (session && session.webId) {
        me = $rdf.sym(session.webId)
      } else {
        me = null
      }
      if ((me && box.me !== me.uri) || (!me && box.me)) {
        widgets.clearElement(box)
        if (me) {
          box.appendChild(logoutButton(me, options))
        } else {
          box.appendChild(signInOrSignUpBox(dom, setIt, options))
        }
      }
      box.me = me ? me.uri : null
    }, err => {
      alert('loginStatusBox: ' + err)
    })
  }

  if (solidAuthClient.trackSession) {
    solidAuthClient.trackSession(session => {
      if (session && session.webId) {
        me = $rdf.sym(session.webId)
      } else {
        me = null
      }
      box.refresh()
    })
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
function selectWorkspace (dom, appDetails, callbackWS) {
  var noun = appDetails.noun
  var appPathSegment = appDetails.appPathSegment

  var me = defaultTestUser()
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
    return newBase
  }

  var displayOptions = function (context) {
    // var status = ''
    var id = context.me
    var preferencesFile = context.preferencesFile
    var newBase = null

    // A workspace specifically defined in the private preferences file:
    var w = kb.statementsMatching(id, UI.ns.space('workspace'), // Only trust prefs file here
      undefined, preferencesFile).map(function (st) { return st.object })

    // A workspace in a storage in the public profile:
    var storages = kb.each(id, UI.ns.space('storage'))  // @@ No provenance requirement at the moment
    storages.map(function (s) {
      w = w.concat(kb.each(s, UI.ns.ldp('contains')))
    })

    if (w.length === 1) {
      say('Workspace used: ' + w[0].uri)  // @@ allow user to see URI
      newBase = figureOutBase(w[0])
      // callbackWS(w[0], newBase)
    } else if (w.length === 0) {
      say("You don't seem to have any workspaces. You have " + storages.length + ' storages.')
    }

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
    if (newBase) { // set to default
      baseField.value = newBase
    }

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
        col1.textContent = 'Chose a workspace for this:'
        col1.setAttribute('style', 'vertical-align:middle;')
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
        baseField.value = newBase // show user proposed URI

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

    // last line with "Make new workspace"
    var trLast = dom.createElement('tr')
    col2 = dom.createElement('td')
    col2.setAttribute('style', cellStyle)
    col2.textContent = '+ Make a new workspace'
    // addMyListener(col2, 'Set up a new workspace', '') // @@ TBD
    trLast.appendChild(col2)
    table.appendChild(trLast)
  } // displayOptions

  logInLoadPreferences(context)  // kick off async operation
    .then(displayOptions)
    .catch(err => {
      box.appendChild(UI.widgets.errorMessageBlock(err))
    })

  return box  // return the box element, while login proceeds
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
  b.addEventListener('click', (e) => {
    div.appendChild(selectWorkspace(dom, appDetails, gotWS))
  }, false)
  div.appendChild(b)
  return div
}

async function getUserRoles () {
  try {
    const { me, preferencesFile } = await logInLoadPreferences({})
    return UI.store.each(me, ns.rdf('type'), null, preferencesFile.doc())
  } catch (error) {
    console.warn('Unable to fetch your preferences - this was the error: ', error)
  }
  return []
}

async function filterAvailablePanes (panes) {
  const userRoles = await getUserRoles()
  return Object.values(panes).filter(pane => isMatchingAudience(pane, userRoles))
}

function isMatchingAudience (pane, userRoles) {
  const audience = pane.audience || []
  return audience.reduce((isMatch, audienceRole) => isMatch && userRoles.find(role => role.equals(audienceRole)), true)
}
