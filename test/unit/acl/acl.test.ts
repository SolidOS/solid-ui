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
import RdfLib, { sym, graph, UpdateManager, Fetcher } from 'rdflib'

jest.mock('rdflib')
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
    expect(ACLunion([ {} as AgentMapMap ])).toBeInstanceOf(Object)
  })
})

describe('adoptACLDefault', () => {
  it('exists', () => {
    expect(adoptACLDefault).toBeInstanceOf(Function)
  })
  it('exists', () => {
    expect(adoptACLDefault(
      sym(''),
      sym(''),
      sym(''),
      sym(''))).toBeInstanceOf(Object)
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
    expect(fixIndividualACL(sym(''), [], () => {}, () => {})).toEqual(undefined)
  })
})

describe('fixIndividualCardACL', () => {
  it('exists', () => {
    expect(fixIndividualCardACL).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(fixIndividualCardACL(sym(''), () => {}, () => {})).toEqual(undefined)
  })
})

describe('getACL', () => {
  it('exists', () => {
    expect(getACL).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(getACL(sym(''),() => {})).toEqual(undefined)
  })
})

describe('getACLorDefault', () => {
  it('exists', () => {
    expect(getACLorDefault).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(getACLorDefault(sym(''),() => {})).toEqual(undefined)
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
      graph(),
      sym(''),
      {} as AgentMapMap,
      sym('')
    )).toEqual(undefined)
  })
})

describe('makeACLGraphbyCombo', () => {
  it('exists', () => {
    expect(makeACLGraphbyCombo).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(makeACLGraphbyCombo(
      graph(),
      sym(''),
      {} as ComboList,
      sym(''),
      false,
      false
    )).toEqual(undefined)
  })
})

describe('makeACLString', () => {
  it('exists', () => {
    expect(makeACLString).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    ;(window as any).$rdf = RdfLib
    expect(makeACLString(
      sym(''),
      {} as AgentMapMap,
      sym('')
    )).toEqual(undefined)
  })
})

describe('putACLbyCombo', () => {
  it('exists', () => {
    expect(putACLbyCombo).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    ;(window as any).$rdf = RdfLib
    ;(window as any).$rdf.updater = new UpdateManager()

    expect(putACLbyCombo(
      graph(),
      sym(''),
      {} as ComboList,
      sym(''),
      () => {}
    )).toEqual(undefined)
  })
})

describe('putACLObject', () => {
  it('exists', () => {
    expect(putACLObject).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    expect(putACLObject(
      graph(),
      sym(''),
      {} as AgentMapMap,
      sym(''),
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
      sym(''),
      sym(''),
      graph(),
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
  it.skip('runs', () => {
    ;(window as any).$rdf = RdfLib
    ;(window as any).$rdf.fetcher = new Fetcher((window as any).$rdf, {})
    expect(setACL(
      sym(''),
      '',
      () => {}
    )).toEqual(true)
  })
})
