jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')

import {
  checkUser, // Async
  currentUser, // Sync
  defaultTestUser, // Sync
  filterAvailablePanes, // Async
  findAppInstances, // Async?
  findOriginOwner,
  getUserRoles, // Async
  loadTypeIndexes,
  logIn,
  logInLoadProfile,
  logInLoadPreferences,
  loginStatusBox,
  newAppInstance,
  offlineTestID,
  registerInTypeIndex,
  registrationControl,
  registrationList,
  selectWorkspace,
  setACLUserPublic,
  saveUser,
  solidAuthClient
} from '../../../src/authn/authn'

describe('checkUser', () => {
  it('exists', () => {
    expect(checkUser).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    expect(await checkUser()).toEqual(null)
  })
})

describe('currentUser', () => {
  it('exists', () => {
    expect(currentUser).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    expect(await currentUser()).toEqual(null)
  })
})

describe('defaultTestUser', () => {
  it('exists', () => {
    expect(defaultTestUser).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    expect(await defaultTestUser()).toEqual(null)
  })
})

describe('filterAvailablePanes', () => {
  it('exists', () => {
    expect(filterAvailablePanes).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    expect(await filterAvailablePanes([])).toEqual([])
  })
})

describe('findAppInstances', () => {
  it('exists', () => {
    expect(findAppInstances).toBeInstanceOf(Function)
  })
  it('runs', async () => {
    expect(await findAppInstances({}, RdfLib.sym(''), false)).toBeInstanceOf(Object)
  })

})

describe('findOriginOwner', () => {
  it('exists', () => {
    expect(findOriginOwner).toBeInstanceOf(Function)
  })
})

describe('getUserRoles', () => {
  it('exists', () => {
    expect(getUserRoles).toBeInstanceOf(Function)
  })
})

describe('loadTypeIndexes', () => {
  it('exists', () => {
    expect(loadTypeIndexes).toBeInstanceOf(Function)
  })
})

describe('logIn', () => {
  it('exists', () => {
    expect(logIn).toBeInstanceOf(Function)
  })
})

describe('logInLoadProfile', () => {
  it('exists', () => {
    expect(logInLoadProfile).toBeInstanceOf(Function)
  })
})

describe('logInLoadPreferences', () => {
  it('exists', () => {
    expect(logInLoadPreferences).toBeInstanceOf(Function)
  })
})

describe('loginStatusBox', () => {
  it('exists', () => {
    expect(loginStatusBox).toBeInstanceOf(Function)
  })
})

describe('newAppInstance', () => {
  it('exists', () => {
    expect(newAppInstance).toBeInstanceOf(Function)
  })
})

describe('offlineTestID', () => {
  it('exists', () => {
    expect(offlineTestID).toBeInstanceOf(Function)
  })
})

describe('registerInTypeIndex', () => {
  it('exists', () => {
    expect(registerInTypeIndex).toBeInstanceOf(Function)
  })
})

describe('registrationControl', () => {
  it('exists', () => {
    expect(registrationControl).toBeInstanceOf(Function)
  })
})

describe('registrationList', () => {
  it('exists', () => {
    expect(registrationList).toBeInstanceOf(Function)
  })
})

describe('selectWorkspace', () => {
  it('exists', () => {
    expect(selectWorkspace).toBeInstanceOf(Function)
  })
})

describe('setACLUserPublic', () => {
  it('exists', () => {
    expect(setACLUserPublic).toBeInstanceOf(Function)
  })
})

describe('saveUser', () => {
  it('exists', () => {
    expect(saveUser).toBeInstanceOf(Function)
  })
})

describe('solidAuthClient', () => {
  it('exists', () => {
    expect(solidAuthClient).toBeInstanceOf(Function)
  })
})
