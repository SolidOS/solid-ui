import { describe, expect, it } from 'vitest'
import { silenceDebugMessages } from './helpers/debugger'
import * as Index from '../../src/index'

silenceDebugMessages()

describe('Index', () => {
  it('exists', () => {
    expect(Object.keys(Index).sort()).toEqual([
      'Account',
      'CloseDialogEvent',
      'CodeEditor',
      'DEFAULT_AUTH_CONTEXT',
      'DEFAULT_DIALOG_CONTEXT',
      'DEFAULT_DISCOVER_CLASS',
      'DEFAULT_SIGNUP_URL',
      'DEFAULT_STORE',
      'Dialog',
      'DialogComponent',
      'DialogTrait',
      'FormControlComponent',
      'FormControlTrait',
      'NoopAuth',
      'NoopStore',
      'ShowDialogEvent',
      'SolidAuth',
      'WebComponent',
      'acl',
      'aclControl',
      'authContext',
      'buildResourceActionsMenuBindings',
      'create',
      'createTypes',
      'customElement',
      'dialogContext',
      'dom',
      'fileExplorerContext',
      'generateId',
      'getRelevantPane',
      'getRelevantPanes',
      'getResourceDeleteLabel',
      'icons',
      'infiniteMessageArea',
      'initFooter',
      'initHeader',
      'language',
      'loadDiscoveryState',
      'log',
      'login',
      'matrix',
      'media',
      'messageArea',
      'ns',
      'pad',
      'participation',
      'preferences',
      'showDialog',
      'storeContext',
      'style',
      'table',
      'tabs',
      'toggleDiscoveryState',
      'utils',
      'widgets'
    ])
  })
  // make sure none of them are undefined:
  Object.keys(Index).forEach(key => expect(Index[key] && key).toEqual(key))
})
