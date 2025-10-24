import { silenceDebugMessages } from './helpers/debugger'
import * as Index from '../../src/index'

silenceDebugMessages()

describe('Index', () => {
  it('exists', () => {
    expect(Object.keys(Index).sort()).toEqual([
      'acl',
      'aclControl',
      'authn',
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
      'store',
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
