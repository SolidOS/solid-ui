// This module of solid-ui has a main quadstore for the app to use
//

import * as debug from './debug'
import { authn, SolidLogic } from 'solid-logic'
// import authSession from './authn/authSession'

const fetcher = async (url, requestInit) => {
  if (authn.authSession.info.webId) {
    return authn.authSession.fetch(url, requestInit)
  } else {
    return window.fetch(url, requestInit)
  }
}

export const solidLogicSingleton = new SolidLogic({ fetch: fetcher }, authn.authSession)

// Make this directly accessible as it is what you need most of the time
export const store = solidLogicSingleton.store
export const kb = store // Very commonly used synonym of store - Knowledge Base

export const authnn = solidLogicSingleton.authn
export const chat = solidLogicSingleton.chat

// export const language = solidLogicSingleton.language // Does not work

export const profile = solidLogicSingleton.profile

debug.log('Unique quadstore initialized.')

// ends
