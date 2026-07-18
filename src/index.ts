// REMOVE @ts-ignore as you migrate files to TypeScript
// @ts-ignore
import ns from './lib/ns'
import { acl, aclControl } from './acl/index'
import { create } from './create/index'
// @ts-ignore
import { icons } from './lib/iconBase'
import * as language from './widgets/forms/autocomplete/language'
import * as log from './lib/log'
import { matrix } from './matrix/index'
import { media } from './media/index'
// @ts-ignore
import { messageArea } from './lib/messageArea'
// @ts-ignore
import { infiniteMessageArea } from './chat/infinite'
// @ts-ignore
import * as pad from './lib/pad'
// @ts-ignore
import * as participation from './lib/participation'
// @ts-ignore
import * as preferences from './lib/preferences'
// @ts-ignore
import { style } from './lib/style'
// @ts-ignore
import { renderTableViewPane as table } from './lib/table'
import * as tabs from './lib/tabs'
// @ts-ignore
import * as utils from './utils'
import * as login from './login/login'
import * as widgets from './widgets/index'
import { initHeader } from './header'
import { initFooter } from './footer'
import * as createTypes from './create/types'

export const dom = typeof window !== 'undefined' ? window.document : null // Idea that UI.dom can be adapted in non-browser environments

// this variables are directly used in the storybook
export {
  ns,
  acl,
  aclControl,
  create,
  createTypes,
  icons,
  language,
  log,
  login,
  matrix,
  media,
  messageArea,
  infiniteMessageArea,
  pad,
  participation,
  preferences,
  style,
  table,
  tabs,
  utils,
  widgets,
  initHeader,
  initFooter
}
// uses in solid-panes
export type { CreateContext, NewAppInstanceOptions } from './create/types'

export * from './lib/auth'
export * from './lib/components'
export * from './lib/dialogs'
