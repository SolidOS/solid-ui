/**
 * Signing in, signing up, profile and preferences reloading
 * Type index management
 *
 * Many functions in this module take a context object which
 * holds various RDF symbols, add to it, and return a promise of it.
 *
 * * `me`                RDF symbol for the user's WebID
 * * `publicProfile`     The user's public profile, iff loaded
 * * `preferencesFile`   The user's personal preference file, iff loaded
 * * `index.public`      The user's public type index file
 * * `index.private`     The user's private type index file
 *
 * Not RDF symbols:
 * * `noun`            A string in english for the type of thing -- like "address book"
 * * `instance`        An array of nodes which are existing instances
 * * `containers`      An array of nodes of containers of instances
 * * `div`             A DOM element where UI can be displayed
 * * `statusArea`      A DOM element (opt) progress stuff can be displayed, or error messages
 * *
 * * Vocabulary:  "load" loads a file if it exists;
 * *  'Ensure" CREATES the file if it does not exist (if it can) and then loads it.
 * @packageDocumentation
 */
import { PaneDefinition } from 'pane-registry'
import { BlankNode, NamedNode, st, Statement } from 'rdflib'
// eslint-disable-next-line camelcase
import { Quad_Object } from 'rdflib/lib/tf-types'
import { AppDetails, AuthenticationContext, loadIndex, authn, authSession, CrossOriginForbiddenError, ensureTypeIndexes, FetchError, getSuggestedIssuers, NotFoundError, offlineTestID, SameOriginForbiddenError, solidLogicSingleton, UnauthorizedError } from 'solid-logic'
import * as debug from '../debug'
import { alert } from '../log'
import * as ns from '../ns.js'
import { Signup } from '../signup/signup.js'
import { buttonStyle, commentStyle, textInputStyle } from '../style'
import { utils } from '../utils/index'
import * as widgets from '../widgets'
import {button, ButtonType} from "../widgets";

/**
  * Resolves with the logged in user's WebID
  *
  * @param context
  */
// used to be logIn
export function ensureLoggedIn (context: AuthenticationContext): Promise<AuthenticationContext> {
  const me = authn.currentUser()
  if (me) {
    authn.saveUser(me, context)
    return Promise.resolve(context)
  }

  return new Promise(resolve => {
    authn.checkUser().then(webId => {
      // Already logged in?
      if (webId) {
        debug.log(`logIn: Already logged in as ${webId}`)
        return resolve(context)
      }
      if (!context.div || !context.dom) {
        return resolve(context)
      }
      const box = loginStatusBox(context.dom, webIdUri => {
        authn.saveUser(webIdUri, context)
        resolve(context) // always pass growing context
      })
      context.div.appendChild(box)
    })
  })
}

/**
 * Loads preference file
 * Do this after having done log in and load profile
 *
 * @private
 *
 * @param context
 */
// used to be logInLoadPreferences
export async function ensureLoadedPreferences (context: AuthenticationContext): Promise<AuthenticationContext> {
  if (context.preferencesFile) return Promise.resolve(context) // already done

  const statusArea = context.statusArea || context.div || null
  let progressDisplay
  function complain (message) {
    message = `ensureLoadedPreferences: ${message}`
    if (statusArea) {
      // statusArea.innerHTML = ''
      statusArea.appendChild(
        widgets.errorMessageBlock(context.dom, message)
      )
    }
    debug.log(message)
    // reject(new Error(message))
  }
  try {
    context = await ensureLoadedProfile(context)

    // console.log('back in Solid UI after logInLoadProfile', context)
    const preferencesFile = await solidLogicSingleton.loadPreferences(context.me as NamedNode)
    if (progressDisplay) {
      progressDisplay.parentNode.removeChild(progressDisplay)
    }
    context.preferencesFile = preferencesFile
  } catch (err) {
    let m2: string
    if (err instanceof UnauthorizedError) {
      m2 = 'Ooops - you are not authenticated (properly logged in) to for me to read your preference file.  Try loggin out and logging in?'
      alert(m2)
    } else if (err instanceof CrossOriginForbiddenError) {
      m2 = `Unauthorized: Assuming preference file blocked for origin ${window.location.origin}`
      context.preferencesFileError = m2
      return context
    } else if (err instanceof SameOriginForbiddenError) {
      m2 = 'You are not authorized to read your preference file. This may be because you are using an untrusted web app.'
      debug.warn(m2)
    } else if (err instanceof NotFoundError) {
      if (
        confirm(`You do not currently have a preference file. OK for me to create an empty one? ${(err as any).preferencesFile || ''}`)
      ) {
        // @@@ code me  ... weird to have a name of the file but no file
        alert(`Sorry; I am not prepared to do this. Please create an empty file at ${(err as any).preferencesFile || '(?)'}`)
        complain(
          new Error('Sorry; no code yet to create a preference file at ')
        )
      } else {
        throw (
          new Error(`User declined to create a preference file at ${(err as any).preferencesFile || '(?)'}`)
        )
      }
    } else if (err instanceof FetchError) {
      m2 = `Strange: Error ${err.status} trying to read your preference file.${err.message}`
      alert(m2)
    } else {
      throw new Error(`(via loadPrefs) ${err}`)
    }
  }
  return context
}

/**
 * Logs the user in and loads their WebID profile document into the store
 *
 * @param context
 *
 * @returns Resolves with the context after login / fetch
 */
// used to be logInLoadProfile
export async function ensureLoadedProfile (context: AuthenticationContext): Promise<AuthenticationContext> {
  if (context.publicProfile) {
    return context
  } // already done
  try {
    const logInContext = await ensureLoggedIn(context)
    if (!logInContext.me) {
      throw new Error('Could not log in')
    }
    context.publicProfile = await solidLogicSingleton.loadProfile(logInContext.me)
  } catch (err) {
    if (context.div && context.dom) {
      context.div.appendChild(
        widgets.errorMessageBlock(context.dom, err.message)
      )
    }
    throw new Error(`Can't log in: ${err}`)
  }
  return context
}

/**
  * Returns promise of context with arrays of symbols
  *
  * 2016-12-11 change to include forClass arc a la
  * https://github.com/solid/solid/blob/main/proposals/data-discovery.md
  */
export async function findAppInstances (
  context: AuthenticationContext,
  theClass: NamedNode,
  isPublic?: boolean
): Promise<AuthenticationContext> {
  // console.log('findAppInstances', { context, theClass, isPublic })
  if (isPublic === undefined) {
    // Then both public and private
    // console.log('finding public app instance')
    await findAppInstances(context, theClass, true)
    // console.log('finding private app instance')
    await findAppInstances(context, theClass, false)
    // console.log('found public & private app instance', context)
    return context
  }

  // Loading preferences is more than loading profile
  try {
    // console.log('calling logInLoad', isPublic)
    await (isPublic
      ? ensureLoadedProfile(context)
      : ensureLoadedPreferences(context))
    // console.log('called logInLoad', isPublic)
  } catch (err) {
    widgets.complain(context, `loadIndex: login and load problem ${err}`)
  }
  // console.log('awaited LogInLoad!', context)
  const visibility = isPublic ? 'public' : 'private'
  try {
    await loadIndex(context, isPublic)
  } catch (err) {
    debug.error(err)
  }
  const index = context.index as { [key: string]: Array<NamedNode> }
  const thisIndex = index[visibility]
  const registrations = thisIndex
    .map(ix => solidLogicSingleton.store.each(undefined, ns.solid('forClass'), theClass, ix))
    .reduce((acc, curr) => acc.concat(curr), [])
  const instances = registrations
    .map(reg => solidLogicSingleton.store.each(reg as NamedNode, ns.solid('instance')))
    .reduce((acc, curr) => acc.concat(curr), [])
  const containers = registrations
    .map(reg => solidLogicSingleton.store.each(reg as NamedNode, ns.solid('instanceContainer')))
    .reduce((acc, curr) => acc.concat(curr), [])

  function unique (arr: NamedNode[]): NamedNode[] {
    return Array.from(new Set(arr))
  }
  context.instances = context.instances || []
  context.instances = unique(context.instances.concat(instances as NamedNode[]))

  context.containers = context.containers || []
  context.containers = unique(context.containers.concat(containers as NamedNode[]))
  if (!containers.length) {
    return context
  }
  // If the index gives containers, then look up all things within them
  try {
    await solidLogicSingleton.load(containers as NamedNode[])
  } catch (err) {
    const e = new Error(`[FAI] Unable to load containers${err}`)
    debug.log(e) // complain
    widgets.complain(context, `Error looking for ${utils.label(theClass)}:  ${err}`)
    // but then ignore it
    // throw new Error(e)
  }
  for (let i = 0; i < containers.length; i++) {
    const cont = containers[i]
    context.instances = context.instances.concat(
      (await solidLogicSingleton.getContainerMembers(cont.value)).map(uri => solidLogicSingleton.store.sym(uri)) // @@ warning: uses strings not NN
    )
  }
  return context
}

/**
  * UI to control registration of instance
  */
export async function registrationControl (
  context: AuthenticationContext,
  instance,
  theClass
): Promise<AuthenticationContext | void> {
  const dom = context.dom
  if (!dom || !context.div) {
    return context
  }
  const box = dom.createElement('div')
  context.div.appendChild(box)
  context.me = authn.currentUser() // @@
  if (!context.me) {
    box.innerHTML = '<p style="margin:2em;">(Log in to save a link to this)</p>'
    return context
  }

  let context2 // @@ const
  try {
    context2 = await ensureTypeIndexes(context)
  } catch (e) {
    let msg
    if (context.div && context.preferencesFileError) {
      msg = '(Preferences not available)'
      context.div.appendChild(dom.createElement('p')).textContent = msg
    } else if (context.div) {
      msg = `registrationControl: Type indexes not available: ${e}`
      context.div.appendChild(widgets.errorMessageBlock(context.dom, e))
    }
    debug.log(msg)
  }

  box.innerHTML = '<table><tbody><tr></tr><tr></tr></tbody></table>' // tbody will be inserted anyway
  box.setAttribute('style', 'font-size: 120%; text-align: right; padding: 1em; border: solid gray 0.05em;')
  const tbody = box.children[0].children[0]
  const form = new BlankNode() // @@ say for now

  const registrationStatements = function (index) {
    const registrations = solidLogicSingleton.getRegistrations(instance, theClass)
    const reg = registrations.length
      ? registrations[0]
      : widgets.newThing(index)
    return [
      st(reg, ns.solid('instance'), instance, index),
      st(reg, ns.solid('forClass'), theClass, index)
    ]
  }

  let index, statements

  try {
    if (context2.index && context2.index.public && context2.index.public.length > 0) {
      index = context2.index.public[0]
      statements = registrationStatements(index)
      tbody.children[0].appendChild(
        widgets.buildCheckboxForm(
          context2.dom,
          solidLogicSingleton.store,
          `Public link to this ${context2.noun}`,
          null,
          statements,
          form,
          index
        )
      )
    }

    if (context2.index && context2.index.private && context2.index.private.length > 0) {
      index = context2.index.private[0]
      statements = registrationStatements(index)
      tbody.children[1].appendChild(
        widgets.buildCheckboxForm(
          context2.dom,
          solidLogicSingleton.store,
          `Personal note of this ${context2.noun}`,
          null,
          statements,
          form,
          index
        )
      )
    }
  } catch (e) {
    const msg = `registrationControl: Error making panel: ${e}`
    if (context.div) {
      context.div.appendChild(widgets.errorMessageBlock(context.dom, e))
    }
    debug.log(msg)
  }
  return context2
}

/**
  * UI to List at all registered things
  */
export async function registrationList (context0: AuthenticationContext, options: {
   private?: boolean
   public?: boolean
   type?: NamedNode
 }): Promise<AuthenticationContext> {
  const dom = context0.dom as HTMLDocument
  const div = context0.div as HTMLElement

  const box = dom.createElement('div')
  div.appendChild(box)
  context0.me = authn.currentUser() // @@
  if (!context0.me) {
    box.innerHTML = '<p style="margin:2em;">(Log in list your stuff)</p>'
    return context0
  }

  return ensureTypeIndexes(context0).then(context => {
    box.innerHTML = '<table><tbody></tbody></table>' // tbody will be inserted anyway
    box.setAttribute('style', 'font-size: 120%; text-align: right; padding: 1em; border: solid #eee 0.5em;')
    const table = box.firstChild as HTMLElement

    let ix: Array<NamedNode> = []
    let sts: Statement[] = []
    const vs = ['private', 'public']
    vs.forEach(function (visibility) {
      if (context.index && context.index[visibility].length > 0 && options[visibility]) {
        ix = ix.concat(context.index[visibility][0])
        sts = sts.concat(
          solidLogicSingleton.store.statementsMatching(
            undefined,
            ns.solid('instance'),
            undefined,
            context.index[visibility][0]
          )
        )
      }
    })

    for (let i = 0; i < sts.length; i++) {
      const statement: Statement = sts[i]
      if (options.type) { // now check  terms:forClass
        if (!solidLogicSingleton.store.holds(statement.subject, ns.solid('forClass'), options.type, statement.why)) {
          continue // skip irrelevant ones
        }
      }
      // const cla = statement.subject
      const inst = statement.object
      table.appendChild(widgets.personTR(dom, ns.solid('instance'), inst, {
        deleteFunction: function (_x) {
          if (!solidLogicSingleton.store.updater) {
            throw new Error('Cannot delete this, store has no updater')
          }
          solidLogicSingleton.store.updater.update([statement], [], function (uri, ok, errorBody) {
            if (ok) {
              debug.log(`Removed from index: ${statement.subject}`)
            } else {
              debug.log(`Error: Cannot delete ${statement}: ${errorBody}`)
            }
          })
        }
      }))
    } // registrationList

    /*
        //const containers = solidLogicSingleton.store.each(theClass, ns.solid('instanceContainer'));
        if (containers.length) {
        fetcher.load(containers).then(function(xhrs){
        for (const i=0; i<containers.length; i++) {
        const cont = containers[i];
        instances = instances.concat(solidLogicSingleton.store.each(cont, ns.ldp('contains')));
        }
        });
        }
        */

    return context
  })
}

function getDefaultSignInButtonStyle (): string {
  return 'padding: 1em; border-radius:0.5em; font-size: 100%;'
}

/**
  * Bootstrapping identity
  * (Called by `loginStatusBox()`)
  *
  * @param dom
  * @param setUserCallback
  *
  * @returns
  */
function signInOrSignUpBox (
  dom: HTMLDocument,
  setUserCallback: (user: string) => void,
  options: {
    buttonStyle?: string
  } = {}
): HTMLElement {
  options = options || {}
  const signInButtonStyle = options.buttonStyle || getDefaultSignInButtonStyle()

  // @@ TODO Remove the need to cast HTML element to any
  const box: any = dom.createElement('div')
  const magicClassName = 'SolidSignInOrSignUpBox'
  debug.log('widgets.signInOrSignUpBox')
  box.setUserCallback = setUserCallback
  box.setAttribute('class', magicClassName)
  ;(box as any).style = 'display:flex;' // @@ fix all typecasts like this

  // Sign in button with PopUP
  const signInPopUpButton = dom.createElement('input') // multi
  box.appendChild(signInPopUpButton)
  signInPopUpButton.setAttribute('type', 'button')
  signInPopUpButton.setAttribute('value', 'Log in')
  signInPopUpButton.setAttribute('style', `${signInButtonStyle}background-color: #eef;`)

  authSession.onLogin(() => {
    const me = authn.currentUser()
    // const sessionInfo = authSession.info
    // if (sessionInfo && sessionInfo.isLoggedIn) {
    if (me) {
      // const webIdURI = sessionInfo.webId
      const webIdURI = me.uri
      // setUserCallback(webIdURI)
      const divs = dom.getElementsByClassName(magicClassName)
      debug.log(`Logged in, ${divs.length} panels to be serviced`)
      // At the same time, satisfy all the other login boxes
      for (let i = 0; i < divs.length; i++) {
        const div: any = divs[i]
        // @@ TODO Remove the need to manipulate HTML elements
        if (div.setUserCallback) {
          try {
            div.setUserCallback(webIdURI)
            const parent = div.parentNode
            if (parent) {
              parent.removeChild(div)
            }
          } catch (e) {
            debug.log(`## Error satisfying login box: ${e}`)
            div.appendChild(widgets.errorMessageBlock(dom, e))
          }
        }
      }
    }
  })

  signInPopUpButton.addEventListener('click', () => {
    const offline = offlineTestID()
    if (offline) return setUserCallback(offline.uri)

    renderSignInPopup(dom)
  }, false)

  // Sign up button
  const signupButton = dom.createElement('input')
  box.appendChild(signupButton)
  signupButton.setAttribute('type', 'button')
  signupButton.setAttribute('value', 'Sign Up for Solid')
  signupButton.setAttribute('style', `${signInButtonStyle}background-color: #efe;`)

  signupButton.addEventListener('click', function (_event) {
    const signupMgr = new Signup()
    signupMgr.signup().then(function (uri) {
      debug.log('signInOrSignUpBox signed up ' + uri)
      setUserCallback(uri)
    })
  }, false)
  return box
}

export function renderSignInPopup (dom: HTMLDocument) {
  /**
    * Issuer Menu
    */
  const issuerPopup = dom.createElement('div')
  issuerPopup.setAttribute('style', 'position: fixed; top: 0; left: 0; right: 0; bottom: 0; display: flex; justify-content: center; align-items: center;')
  dom.body.appendChild(issuerPopup)
  const issuerPopupBox = dom.createElement('div')
  issuerPopupBox.setAttribute('style', `
      background-color: white;
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
      -webkit-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
      -moz-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
      -o-box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      min-width: 400px;
      padding: 10px;
    `)
  issuerPopup.appendChild(issuerPopupBox)
  const issuerPopupBoxTopMenu = dom.createElement('div')
  issuerPopupBoxTopMenu.setAttribute('style', `
      border-bottom: 1px solid #DDD;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    `)
  issuerPopupBox.appendChild(issuerPopupBoxTopMenu)
  const issuerPopupBoxLabel = dom.createElement('label')
  issuerPopupBoxLabel.setAttribute('style', 'margin-right: 5px; font-weight: 800')
  issuerPopupBoxLabel.innerText = 'Select an identity provider'
  const issuerPopupBoxCloseButton = dom.createElement('button')
  issuerPopupBoxCloseButton.innerHTML = '<img src="https://solid.github.io/solid-ui/src/icons/noun_1180156.svg" style="width: 2em; height: 2em;" title="Cancel">'
  issuerPopupBoxCloseButton.setAttribute('style', 'background-color: transparent; border: none;')
  issuerPopupBoxCloseButton.addEventListener('click', () => {
    issuerPopup.remove()
  })
  issuerPopupBoxTopMenu.appendChild(issuerPopupBoxLabel)
  issuerPopupBoxTopMenu.appendChild(issuerPopupBoxCloseButton)

  const loginToIssuer = async (issuerUri: string) => {
    try {
      // Save hash
      const preLoginRedirectHash = new URL(window.location.href).hash
      if (preLoginRedirectHash) {
        window.localStorage.setItem('preLoginRedirectHash', preLoginRedirectHash)
      }
      window.localStorage.setItem('loginIssuer', issuerUri)
      // Login
      await authSession.login({
        redirectUrl: window.location.href,
        oidcIssuer: issuerUri
      })
    } catch (err) {
      alert(err.message)
    }
  }

  /**
     * Text-based idp selection
     */
  const issuerTextContainer = dom.createElement('div')
  issuerTextContainer.setAttribute('style', `
      border-bottom: 1px solid #DDD;
      display: flex;
      flex-direction: column;
      padding-top: 10px;
    `)
  const issuerTextInputContainer = dom.createElement('div')
  issuerTextInputContainer.setAttribute('style', `
      display: flex;
      flex-direction: row;
    `)
  const issuerTextLabel = dom.createElement('label')
  issuerTextLabel.innerText = 'Enter the URL of your identity provider:'
  issuerTextLabel.setAttribute('style', 'color: #888')
  const issuerTextInput = dom.createElement('input')
  issuerTextInput.setAttribute('type', 'text')
  issuerTextInput.setAttribute('style', 'margin-left: 0 !important; flex: 1; margin-right: 5px !important')
  issuerTextInput.setAttribute('placeholder', 'https://example.com')
  issuerTextInput.value = localStorage.getItem('loginIssuer') || ''
  const issuerTextGoButton = dom.createElement('button')
  issuerTextGoButton.innerText = 'Go'
  issuerTextGoButton.setAttribute('style', 'margin-top: 12px; margin-bottom: 12px;')
  issuerTextGoButton.addEventListener('click', () => {
    loginToIssuer(issuerTextInput.value)
  })
  issuerTextContainer.appendChild(issuerTextLabel)
  issuerTextInputContainer.appendChild(issuerTextInput)
  issuerTextInputContainer.appendChild(issuerTextGoButton)
  issuerTextContainer.appendChild(issuerTextInputContainer)
  issuerPopupBox.appendChild(issuerTextContainer)

  /**
     * Button-based idp selection
     */
  const issuerButtonContainer = dom.createElement('div')
  issuerButtonContainer.setAttribute('style', `
      display: flex;
      flex-direction: column;
      padding-top: 10px;
    `)
  const issuerBottonLabel = dom.createElement('label')
  issuerBottonLabel.innerText = 'Or pick an identity provider from the list below:'
  issuerBottonLabel.setAttribute('style', 'color: #888')
  issuerButtonContainer.appendChild(issuerBottonLabel)
  getSuggestedIssuers().forEach((issuerInfo) => {
    const issuerButton = dom.createElement('button')
    issuerButton.innerText = issuerInfo.name
    issuerButton.setAttribute('style', 'height: 38px; margin-top: 10px')
    issuerButton.addEventListener('click', () => {
      loginToIssuer(issuerInfo.uri)
    })
    issuerButtonContainer.appendChild(issuerButton)
  })
  issuerPopupBox.appendChild(issuerButtonContainer)
}

/**
  * Login status box
  *
  * A big sign-up/sign in box or a logout box depending on the state
  *
  * @param dom
  * @param listener
  *
  * @returns
  */
export function loginStatusBox (
  dom: HTMLDocument,
  listener: ((uri: string | null) => void) | null = null,
  options: {
    buttonStyle?: string
   } = {}
): HTMLElement {
  // 20190630
  let me = offlineTestID()
  // @@ TODO Remove the need to cast HTML element to any
  const box: any = dom.createElement('div')

  function setIt (newidURI) {
    if (!newidURI) {
      return
    }

    // const uri = newidURI.uri || newidURI
    // me = sym(uri)
    me = authn.saveUser(newidURI)
    box.refresh()
    if (listener) listener(me!.uri)
  }

  function logoutButtonHandler (_event) {
    const oldMe = me
    authSession.logout().then(
      function () {
        const message = `Your WebID was ${oldMe}. It has been forgotten.`
        me = null
        try {
          alert(message)
        } catch (e) {
          window.alert(message)
        }
        box.refresh()
        if (listener) listener(null)
      },
      err => {
        alert('Fail to log out:' + err)
      }
    )
  }

  function logoutButton (me, options) {
    const signInButtonStyle = options.buttonStyle || getDefaultSignInButtonStyle()
    let logoutLabel = 'WebID logout'
    if (me) {
      const nick =
        solidLogicSingleton.store.any(me, ns.foaf('nick')) ||
        solidLogicSingleton.store.any(me, ns.foaf('name'))
      if (nick) {
        logoutLabel = 'Logout ' + nick.value
      }
    }
    const signOutButton = dom.createElement('input')
    // signOutButton.className = 'WebIDCancelButton'
    signOutButton.setAttribute('type', 'button')
    signOutButton.setAttribute('value', logoutLabel)
    signOutButton.setAttribute('style', `${signInButtonStyle}background-color: #eee;`)
    signOutButton.addEventListener('click', logoutButtonHandler, false)
    return signOutButton
  }

  box.refresh = function () {
    me = authn.currentUser()
    if ((me && box.me !== me.uri) || (!me && box.me)) {
      widgets.clearElement(box)
      if (me) {
        box.appendChild(logoutButton(me, options))
      } else {
        box.appendChild(signInOrSignUpBox(dom, setIt, options))
      }
    }
    box.me = me ? me.uri : null
  }
  box.refresh()

  function trackSession () {
    me = authn.currentUser()
    box.refresh()
  }
  trackSession()

  authSession.onLogin(trackSession)
  authSession.onLogout(trackSession)
  box.me = '99999' // Force refresh
  box.refresh()
  return box
}

authSession.onLogout(async () => {
  const issuer = window.localStorage.getItem('loginIssuer')
  if (issuer) {
    try {
      const wellKnownUri = new URL(issuer)
      wellKnownUri.pathname = '/.well-known/openid-configuration'
      const wellKnownResult = await fetch(wellKnownUri.toString())
      if (wellKnownResult.status === 200) {
        const openidConfiguration = await wellKnownResult.json()
        if (openidConfiguration && openidConfiguration.end_session_endpoint) {
          await fetch(openidConfiguration.end_session_endpoint, { credentials: 'include' })
        }
      }
    } catch (err) {
      // Do nothing
    }
  }
  window.location.reload()
})

/**
  * Workspace selection etc
  * See https://github.com/solid/userguide/issues/16
  */

/**
  * Returns a UI object which, if it selects a workspace,
  * will callback(workspace, newBase).
  * See https://github.com/solid/userguide/issues/16 for more info on workspaces.
  *
  * If necessary, will get an account, preference file, etc. In sequence:
  *
  *   - If not logged in, log in.
  *   - Load preference file
  *   - Prompt user for workspaces
  *   - Allows the user to just type in a URI by hand
  *
  * Calls back with the workspace and the base URI
  *
  * @param dom
  * @param appDetails
  * @param callbackWS
  */
export function selectWorkspace (
  dom: HTMLDocument,
  appDetails: AppDetails,
  callbackWS: (workspace: string | null, newBase: string) => void
): HTMLElement {
  const noun = appDetails.noun
  const appPathSegment = appDetails.appPathSegment

  const me = offlineTestID()
  const box = dom.createElement('div')
  const context: AuthenticationContext = { me, dom, div: box }

  function say (s, background) {
    box.appendChild(widgets.errorMessageBlock(dom, s, background))
  }

  function figureOutBase (ws) {
    const newBaseNode: NamedNode = solidLogicSingleton.store.any(ws, ns.space('uriPrefix')) as NamedNode
    let newBaseString: string
    if (!newBaseNode) {
      newBaseString = ws.uri.split('#')[0]
    } else {
      newBaseString = newBaseNode.value
    }
    if (newBaseString.slice(-1) !== '/') {
      debug.log(`${appPathSegment}: No / at end of uriPrefix ${newBaseString}`) // @@ paramater?
      newBaseString = `${newBaseString}/`
    }
    const now = new Date()
    newBaseString += `${appPathSegment}/id${now.getTime()}/` // unique id
    return newBaseString
  }

  function displayOptions (context) {
    // console.log('displayOptions!', context)
    async function makeNewWorkspace (_event) {
      const row = table.appendChild(dom.createElement('tr'))
      const cell = row.appendChild(dom.createElement('td'))
      cell.setAttribute('colspan', '3')
      cell.style.padding = '0.5em'
      const newBase = encodeURI(await widgets.askName(dom, solidLogicSingleton.store, cell, ns.solid('URL'), ns.space('Workspace'), 'Workspace'))
      const newWs = widgets.newThing(context.preferencesFile)
      const newData = [st(context.me, ns.space('workspace'), newWs, context.preferencesFile),
        // eslint-disable-next-line camelcase
        st(newWs, ns.space('uriPrefix'), newBase as unknown as Quad_Object, context.preferencesFile)]
      if (!solidLogicSingleton.store.updater) {
        throw new Error('store has no updater')
      }
      await solidLogicSingleton.store.updater.update([], newData)
      // @@ now refresh list of workspaces
    }

    // const status = ''
    const id = context.me
    const preferencesFile = context.preferencesFile
    let newBase: any = null

    // A workspace specifically defined in the private preference file:
    let w: any = solidLogicSingleton.store.each(id, ns.space('workspace'), undefined, preferencesFile) // Only trust preference file here

    // A workspace in a storage in the public profile:
    const storages = solidLogicSingleton.store.each(id, ns.space('storage')) // @@ No provenance requirement at the moment
    if (w.length === 0 && storages) {
      say(`You don't seem to have any workspaces. You have ${storages.length} storage spaces.`, 'white')
      storages.map(function (s: any) {
        w = w.concat(solidLogicSingleton.store.each(s, ns.ldp('contains')))
        return w
      }).filter(file => {
        return (file.id) ? ['public', 'private'].includes(file.id().toLowerCase()) : ''
      })
    }

    if (w.length === 1) {
      say(`Workspace used: ${w[0].uri}`, 'white') // @@ allow user to see URI
      newBase = figureOutBase(w[0])
      // callbackWS(w[0], newBase)
      // } else if (w.length === 0) {
    }

    // Prompt for ws selection or creation
    // say( w.length + " workspaces for " + id + "Choose one.");
    const table = dom.createElement('table')
    table.setAttribute('style', 'border-collapse:separate; border-spacing: 0.5em;')

    // const popup = window.open(undefined, '_blank', { height: 300, width:400 }, false)
    box.appendChild(table)

    //  Add a field for directly adding the URI yourself

    // const hr = box.appendChild(dom.createElement('hr')) // @@
    box.appendChild(dom.createElement('hr')) // @@

    const p = box.appendChild(dom.createElement('p'))
    ;(p as any).style = commentStyle
    p.textContent = `Where would you like to store the data for the ${noun}?
    Give the URL of the folder where you would like the data stored.
    It can be anywhere in solid world - this URI is just an idea.`
    // @@ TODO Remove the need to cast baseField to any
    const baseField: any = box.appendChild(dom.createElement('input'))
    baseField.setAttribute('type', 'text')
    ;(baseField as any).style = textInputStyle
    baseField.size = 80 // really a string
    baseField.label = 'base URL'
    baseField.autocomplete = 'on'
    if (newBase) {
      // set to default
      baseField.value = newBase
    }

    context.baseField = baseField

    box.appendChild(dom.createElement('br')) // @@

    const button = box.appendChild(dom.createElement('button'))
    ;(button as any).style = buttonStyle
    button.textContent = `Start new ${noun} at this URI`
    button.addEventListener('click', function (_event) {
      let newBase = baseField.value.replace(' ', '%20') // do not re-encode in general, as % encodings may exist
      if (newBase.slice(-1) !== '/') {
        newBase += '/'
      }
      callbackWS(null, newBase)
    })

    // Now go set up the table of spaces

    // const row = 0
    w = w.filter(function (x) {
      return !solidLogicSingleton.store.holds(
        x,
        ns.rdf('type'), // Ignore master workspaces
        ns.space('MasterWorkspace')
      )
    })
    let col1, col2, col3, tr, ws, style, comment
    const cellStyle = 'height: 3em; margin: 1em; padding: 1em white; border-radius: 0.3em;'
    const deselectedStyle = `${cellStyle}border: 0px;`
    // const selectedStyle = cellStyle + 'border: 1px solid black;'
    for (let i = 0; i < w.length; i++) {
      ws = w[i]
      tr = dom.createElement('tr')
      if (i === 0) {
        col1 = dom.createElement('td')
        col1.setAttribute('rowspan', `${w.length}`)
        col1.textContent = 'Choose a workspace for this:'
        col1.setAttribute('style', 'vertical-align:middle;')
        tr.appendChild(col1)
      }
      col2 = dom.createElement('td')
      style = solidLogicSingleton.store.anyValue(ws, ns.ui('style'))
      if (!style) {
        // Otherwise make up arbitrary colour
        const hash = function (x) {
          return x.split('').reduce(function (a, b) {
            a = (a << 5) - a + b.charCodeAt(0)
            return a & a
          }, 0)
        }
        const bgcolor = `#${((hash(ws.uri) & 0xffffff) | 0xc0c0c0).toString(16)}` // c0c0c0  forces pale
        style = `color: black ; background-color: ${bgcolor};`
      }
      col2.setAttribute('style', deselectedStyle + style)
      tr.target = ws.uri
      let label = solidLogicSingleton.store.any(ws, ns.rdfs('label'))
      if (!label) {
        label = ws.uri.split('/').slice(-1)[0] || ws.uri.split('/').slice(-2)[0]
      }
      col2.textContent = label || '???'
      tr.appendChild(col2)
      if (i === 0) {
        col3 = dom.createElement('td')
        col3.setAttribute('rowspan', `${w.length}1`)
        // col3.textContent = '@@@@@ remove';
        col3.setAttribute('style', 'width:50%;')
        tr.appendChild(col3)
      }
      table.appendChild(tr)

      comment = solidLogicSingleton.store.any(ws, ns.rdfs('comment'))
      comment = comment ? comment.value : 'Use this workspace'
      col2.addEventListener('click', function (_event) {
        col3.textContent = comment ? comment.value : ''
        col3.setAttribute('style', deselectedStyle + style)
        const button = dom.createElement('button')
        button.textContent = 'Continue'
        // button.setAttribute('style', style);
        const newBase = figureOutBase(ws)
        baseField.value = newBase // show user proposed URI

        button.addEventListener('click', function (_event) {
          button.disabled = true
          callbackWS(ws, newBase)
          button.textContent = '---->'
        }, true) // capture vs bubble
        col3.appendChild(button)
      }, true) // capture vs bubble
    }

    // last line with "Make new workspace"
    const trLast = dom.createElement('tr')
    col2 = dom.createElement('td')
    col2.setAttribute('style', cellStyle)
    col2.textContent = '+ Make a new workspace'
    col2.addEventListener('click', makeNewWorkspace)
    trLast.appendChild(col2)
    table.appendChild(trLast)
  } // displayOptions

  // console.log('kicking off async operation')
  ensureLoadedPreferences(context) // kick off async operation
    .then(displayOptions)
    .catch(err => {
      // console.log("err from async op")
      box.appendChild(widgets.errorMessageBlock(context.dom, err))
    })

  return box // return the box element, while login proceeds
} // selectWorkspace

interface newAppInstanceOptions {
  useSolidUIButton: boolean,
  buttonStyle: ButtonType
}
/**
  * Creates a new instance of an app.
  *
  * An instance of an app could be e.g. an issue tracker for a given project,
  * or a chess game, or calendar, or a health/fitness record for a person.
  *
  * Note that this use of the term 'app' refers more to entries in the user's
  * type index than to actual software applications that use the personal data
  * to which these entries point.
  *
  * @param dom
  * @param appDetails
  * @param callback
  *
  * @returns A div with a button in it for making a new app instance
  */
export function newAppInstance (
  dom: HTMLDocument,
  appDetails: AppDetails,
  callback: (workspace: string | null, newBase: string) => void,
  options: newAppInstanceOptions
): HTMLElement {
  const gotWS = function (ws, base) {
    // log.debug("newAppInstance: Selected workspace = " + (ws? ws.uri : 'none'))
    callback(ws, base)
  }
  const div = dom.createElement('div')
  const newAppClickHandler = _event => {
    div.appendChild(selectWorkspace(dom, appDetails, gotWS))
  }
  let b
  if (options.useSolidUIButton) {
    b = button(dom, undefined, `Make new ${appDetails.noun}`, newAppClickHandler, options.buttonStyle)
  } else {
    b = dom.createElement('button')
    b.setAttribute('type', 'button')
    div.appendChild(b)
    b.innerHTML = `Make new ${appDetails.noun}`
    b.addEventListener('click', _event => {
      div.appendChild(selectWorkspace(dom, appDetails, gotWS))
    }, false)
  }
  div.appendChild(b)
  return div
}
/**
 * Retrieves whether the currently logged in user is a power user
 * and/or a developer
 */
export async function getUserRoles (): Promise<Array<NamedNode>> {
  try {
    const {
      me,
      preferencesFile,
      preferencesFileError
    } = await ensureLoadedPreferences({})
    if (!preferencesFile || preferencesFileError) {
      throw new Error(preferencesFileError)
    }
    return solidLogicSingleton.store.each(me, ns.rdf('type'), null, preferencesFile.doc()) as NamedNode[]
  } catch (error) {
    debug.warn('Unable to fetch your preferences - this was the error: ', error)
  }
  return []
}

/**
 * Filters which panes should be available, based on the result of [[getUserRoles]]
 */
export async function filterAvailablePanes (panes: Array<PaneDefinition>): Promise<Array<PaneDefinition>> {
  const userRoles = await getUserRoles()
  return panes.filter(pane => isMatchingAudience(pane, userRoles))
}

function isMatchingAudience (pane: PaneDefinition, userRoles: Array<NamedNode>): boolean {
  const audience = pane.audience || []
  return audience.reduce(
    (isMatch, audienceRole) => isMatch && !!userRoles.find(role => role.equals(audienceRole)),
    true as boolean
  )
}
