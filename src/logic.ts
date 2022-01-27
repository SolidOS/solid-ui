// This module of solid-ui has a main quadstore for the app to use
//

import * as debug from './debug'
import authSession from './authn/authSession'
import { SolidLogic } from 'solid-logic'

async function thisFetch (url, requestInit) {
  const omitCreds = requestInit && requestInit.credentials && requestInit.credentials == 'omit'
  if (authSession.info.webId && !omitCreds) { // see https://github.com/solid/solidos/issues/114
    // In fact ftech should respect crentials omit itself
    return authSession.fetch(url, requestInit)
  } else {
    return window.fetch(url, requestInit)
  }
}

export const solidLogicSingleton = new SolidLogic({ fetch: thisFetch }, authSession)

// Make this directly accessible as it is what you need most of the time
export const store = solidLogicSingleton.store
export const kb = store // Very commonly used synonym of store - Knowledge Base

export const authn = solidLogicSingleton.authn
export const chat = solidLogicSingleton.chat

// export const language = solidLogicSingleton.language // Does not work

export const profile = solidLogicSingleton.profile

debug.log('Unique quadstore initialized.')

// ends
