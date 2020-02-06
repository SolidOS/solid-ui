jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import * as SolidAuthClient from 'solid-auth-client'

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

describe('ACLbyCombination', () => {
  it('exists', () => {
    expect(ACLbyCombination).toBeInstanceOf(Function)
  })
})

describe('ACLToString', () => {
  it('exists', () => {
    expect(ACLToString).toBeInstanceOf(Function)
  })
})

describe('ACLunion', () => {
  it('exists', () => {
    expect(ACLunion).toBeInstanceOf(Function)
  })
})

describe('adoptACLDefault', () => {
  it('exists', () => {
    expect(adoptACLDefault).toBeInstanceOf(Function)
  })
})

describe('comboToString', () => {
  it('exists', () => {
    expect(comboToString).toBeInstanceOf(Function)
  })
})

describe('fixIndividualACL', () => {
  it('exists', () => {
    expect(fixIndividualACL).toBeInstanceOf(Function)
  })
})

describe('fixIndividualCardACL', () => {
  it('exists', () => {
    expect(fixIndividualCardACL).toBeInstanceOf(Function)
  })
})

describe('getACL', () => {
  it('exists', () => {
    expect(getACL).toBeInstanceOf(Function)
  })
})

describe('getACLorDefault', () => {
  it('exists', () => {
    expect(getACLorDefault).toBeInstanceOf(Function)
  })
})

describe('getProspectiveHolder', () => {
  it('exists', () => {
    expect(getProspectiveHolder).toBeInstanceOf(Function)
  })
})

describe('loadUnionACL', () => {
  it('exists', () => {
    expect(loadUnionACL).toBeInstanceOf(Function)
  })
})

describe('makeACLGraph', () => {
  it('exists', () => {
    expect(makeACLGraph).toBeInstanceOf(Function)
  })
})

describe('makeACLGraphbyCombo', () => {
  it('exists', () => {
    expect(makeACLGraphbyCombo).toBeInstanceOf(Function)
  })
})

describe('makeACLString', () => {
  it('exists', () => {
    expect(makeACLString).toBeInstanceOf(Function)
  })
})

describe('putACLbyCombo', () => {
  it('exists', () => {
    expect(putACLbyCombo).toBeInstanceOf(Function)
  })
})

describe('putACLObject', () => {
  it('exists', () => {
    expect(putACLObject).toBeInstanceOf(Function)
  })
})

describe('readACL', () => {
  it('exists', () => {
    expect(readACL).toBeInstanceOf(Function)
  })
})

describe('sameACL', () => {
  it('exists', () => {
    expect(sameACL).toBeInstanceOf(Function)
  })
})

describe('setACL', () => {
  it('exists', () => {
    expect(setACL).toBeInstanceOf(Function)
  })
})
