import {
  ACLbyCombination,
  ACLToString,
  ACLunion,
  adoptACLDefault,
  comboToString,
  fixIndividualACL,
  fixIndividualCardACL,
  getACL,
  getACLorDefault,
  getProspectiveHolder,
  loadUnionACL,
  makeACLGraph,
  makeACLGraphbyCombo,
  makeACLString,
  putACLbyCombo,
  putACLObject,
  readACL,
  sameACL,
  setACL
} from '../../../src/acl/acl'
import { AgentMapMap, ComboList } from '../../../src/acl/types'
import { sym } from 'rdflib'
import { createLiveStore } from '../helpers/createLiveStore'

jest.mock('solid-auth-client')

describe('ACLbyCombination', () => {
  it('exists', () => {
    expect(ACLbyCombination).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(ACLbyCombination({} as AgentMapMap)).toBeInstanceOf(Object)
  })
})

describe('ACLToString', () => {
  it('exists', () => {
    expect(ACLToString).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(ACLToString({} as AgentMapMap)).toEqual('{}')
  })
})

describe('ACLunion', () => {
  it('exists', () => {
    expect(ACLunion).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(ACLunion([{} as AgentMapMap])).toBeInstanceOf(Object)
  })
})

describe('adoptACLDefault', () => {
  it('exists', () => {
    expect(adoptACLDefault).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(adoptACLDefault(
      sym('https://test.test'),
      sym('https://test.test'),
      sym('https://test.test'),
      sym('https://test.test'))).toBeInstanceOf(Object)
  })
  it.skip('returns default ACL values', () => {
    // ;(kb as any).mockStatements = [
    //   { s: 'some', p: ns.acl('default'), o: sym('defaultResource'), g: sym('defaultACLDoc') }
    // ]
    expect(adoptACLDefault(
      sym('https://test.test#doc'),
      sym('https://test.test#aclDoc'),
      sym('https://test.test#defaultResource'),
      sym('https://test.test#defaultACLDoc'))).toBeInstanceOf(Object)
  })
})

describe('comboToString', () => {
  it('exists', () => {
    expect(comboToString).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(comboToString({} as ComboList)).toEqual('{}')
  })
})

describe('fixIndividualACL', () => {
  it('exists', () => {
    expect(fixIndividualACL).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(fixIndividualACL(sym('https://test.test#'), [], () => {}, () => {})).toEqual(undefined)
  })
})

describe('fixIndividualCardACL', () => {
  it('exists', () => {
    expect(fixIndividualCardACL).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(fixIndividualCardACL(sym('https://test.test#'), () => {}, () => {})).toEqual(undefined)
  })
})

describe('getACL', () => {
  it('exists', () => {
    expect(getACL).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(getACL(sym('https://test.test#'), () => {})).toEqual(undefined)
  })
})

describe('getACLorDefault', () => {
  it('exists', () => {
    expect(getACLorDefault).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(getACLorDefault(sym('https://test.test#'), () => {})).toEqual(undefined)
  })
})

describe('getProspectiveHolder', () => {
  it('exists', () => {
    expect(getProspectiveHolder).toBeInstanceOf(Function)
  })
  it.skip('runs', async () => {
    expect(await getProspectiveHolder('')).toEqual(undefined)
  })
})

describe('loadUnionACL', () => {
  it('exists', () => {
    expect(loadUnionACL).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(loadUnionACL([], () => {})).toEqual(undefined)
  })
})

describe('makeACLGraph', () => {
  it('exists', () => {
    expect(makeACLGraph).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(makeACLGraph(
      createLiveStore(),
      sym('https://test.test#'),
      {} as AgentMapMap,
      sym('https://test.test#')
    )).toEqual(undefined)
  })
})

describe('makeACLGraphbyCombo', () => {
  it('exists', () => {
    expect(makeACLGraphbyCombo).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(makeACLGraphbyCombo(
      createLiveStore(),
      sym('https://test.test#'),
      {} as ComboList,
      sym('https://test.test#'),
      false,
      false
    )).toEqual(undefined)
  })
})

describe('makeACLString', () => {
  it('exists', () => {
    expect(makeACLString).toBeInstanceOf(Function)
  })
  it.skip('runs', () => { // skipping this until serialize is typed correctly
    expect(makeACLString(
      sym('https://test.test#'),
      {} as AgentMapMap,
      sym('https://test.test#')
    )).toEqual(undefined)
  })
})

describe('putACLbyCombo', () => {
  it('exists', () => {
    expect(putACLbyCombo).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(putACLbyCombo(
      createLiveStore(),
      sym('https://test.test#'),
      {} as ComboList,
      sym('https://test.test#'),
      () => {}
    )).toEqual(undefined)
  })
})

describe('putACLObject', () => {
  it('exists', () => {
    expect(putACLObject).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(putACLObject(
      createLiveStore(),
      sym('https://test.test#'),
      {} as AgentMapMap,
      sym('https://test.test#'),
      () => {}
    )).toEqual(undefined)
  })
})

describe('readACL', () => {
  it('exists', () => {
    expect(readACL).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(readACL(
      sym('https://test.test#'),
      sym('https://test.test#'),
      createLiveStore(),
      false
    )).toBeTruthy()
  })
})

describe('sameACL', () => {
  it('exists', () => {
    expect(sameACL).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(sameACL(
      {} as AgentMapMap,
      {} as AgentMapMap
    )).toEqual(true)
  })
})

describe('setACL', () => {
  it('exists', () => {
    expect(setACL).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(setACL(
      sym('https://test.test#'),
      '',
      () => {}
    )).toBeUndefined()
  })
})
