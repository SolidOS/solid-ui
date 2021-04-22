// This module of solid-ui has a main quadstore for the app to use
//

import * as debug from './debug'
import auth from 'solid-auth-client'
import { SolidLogic } from 'solid-logic'

export const solidLogicSingleton = new SolidLogic({ fetch: auth.fetch }, auth)

// Make this directly accessible as it is what you need most of the time
export const store = solidLogicSingleton.store
export const kb = store // Very commonly used synonym of store - Knowledge Base

debug.log('Unique quadstore initialized.')

// ends
