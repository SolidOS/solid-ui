import { silenceDebugMessages } from '../helpers/setup'
import * as Index from '../../src/index'

silenceDebugMessages()

describe('Index', () => {
  it('exists', () => {
    expect(Object.keys(Index).sort()).toEqual([
      'acl',
      'aclControl',
      'create',
      'createTypes',
      'dom',
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
      'rdf',
      'style',
      'table',
      'tabs',
      'utils',
      'versionInfo',
      'widgets'
    ])
  })
  // make sure none of them are undefined:
  Object.keys(Index).forEach(key => expect(Index[key] && key).toEqual(key))
})
