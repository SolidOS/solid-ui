import { describe, expect, it } from 'vitest'
import { silenceDebugMessages } from './helpers/debugger'
import * as Index from '../../src/index'

silenceDebugMessages()

describe('Index', () => {
  it('exists', () => {
    expect(Object.keys(Index).sort()).toEqual([
      'Account',
      'CloseDialogEvent',
      'DEFAULT_AUTH_CONTEXT',
      'DEFAULT_SIGNUP_URL',
      'Dialog',
      'NoopAuth',
      'ShowDialogEvent',
      'SolidAuth',
      'WebComponent',
      'acl',
      'aclControl',
      'authContext',
      'create',
      'createTypes',
      'customElement',
      'dialogContext',
      'dom',
      'generateId',
      'icons',
      'infiniteMessageArea',
      'initFooter',
      'initHeader',
      'language',
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
      'style',
      'table',
      'tabs',
      'utils',
      'widgets'
    ])
  })
  // make sure none of them are undefined:
  Object.keys(Index).forEach(key => expect(Index[key] && key).toEqual(key))
})
