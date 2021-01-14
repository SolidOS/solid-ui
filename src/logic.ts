// This module of solid-ui has a main quadstore for the app to use
//

import * as debug from './debug'
import { fetch } from 'solid-auth-client'
// import { SolidLogic } from 'solid-logic'
import { SolidLogic } from 'solid-logic'

export const solidLogicSingleton = new SolidLogic({ fetch })

debug.log('Unique quadstore initialized.')

// ends
