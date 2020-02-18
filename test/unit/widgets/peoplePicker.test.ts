import * as RdfLib from 'rdflib'
import { JSDOM } from 'jsdom'

import {
  PeoplePicker,
  GroupPicker,
  Group,
  GroupBuilder,
  findAddressBook
} from '../../../src/widgets/peoplePicker'
import { resolve } from 'dns'
import { SolidAuth } from 'solid-auth-client'
import { callbackify } from 'util'
jest.mock('rdflib')
jest.mock('solid-auth-client')
const kb = require('../../../src/store')
const fetcher = kb.fetcher
// jest.mock('../../../src/store')

const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document
const element = dom.createElement('div')

/* async function getMyWebId(): Promise<string | null> {
  const currentSession = await SolidAuth.currentSession()
  if (!currentSession) {
    return null
  }
  return currentSession.webId
} */

describe('FindAddressBook', () => {
  it('exists', () => {
    expect(findAddressBook).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(findAddressBook('typeIndex')).toMatchObject({})
  })

  it('working on this... ', () => {
    const spyOnNowOrWhenFetched = jest
      .spyOn(fetcher, 'nowOrWhenFetched')
      .mockReturnValueOnce(Promise.resolve('book'))
    findAddressBook('typeIndex')
    expect(spyOnNowOrWhenFetched).toBeCalled()
  })
})
describe('PeoplePicker', () => {
  it('exists', () => {
    expect(new PeoplePicker()).toBeInstanceOf(PeoplePicker)
  })
})
describe('PeoplePicker.render', () => {
  it('exists', () => {
    expect(new PeoplePicker().render).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const typeIndex = {}
    const groupPickedCb = () => {}
    const options = { selectedGroup: false }
    const element = document.createElement('p')
    const peoplePicker = new PeoplePicker(
      element,
      typeIndex,
      groupPickedCb,
      options
    )
    expect(peoplePicker.render()).toMatchInlineSnapshot(`
      PeoplePicker {
        "element": <p>
          <div
            style="max-width: 350px; min-height: 200px; outline: 1px solid black; display: flex;"
          />
        </p>,
        "groupPickedCb": [Function],
        "onSelectGroup": [Function],
        "options": Object {
          "selectedGroup": false,
        },
        "selectedgroup": undefined,
        "typeIndex": Object {},
      }
    `)
  })
  // THIS IS THE ONE I AM WORKING ON.
  // IF YOU CHECK THE CODE IN PEOPLEPICKER.JS YOU WILL SEE THAT IT CALLS
  // FINDADDRESSBOOK ..  HOW CAN I REACH THE CODE IN THE .THEN
  // SO I WAS THINKING BY RESOLVING KB.FETCHER.NOWORWHENFETCHED..  THIS
  // SHOUDLD RETURN A BOOK SO THAT THE CODE IN THIS SECTION CAN BE
  // EXECUTED AND TESTED. I CAN'T SEEM TO MOCK NOWORWHENFETCHED.  I'VE GOTTEN CLOSER
  // I THINK BY ADDING THIS CODE ABOVE const fetcher = kb.fetcher.  THIS AT
  // LEAST LET ME NOW WRITE THE MOCK WITHOUT ERROR, BUT IT STILL ISN'T USING IT
  // @@ TODO can't seem to get the findAddressBook to return anything even
  // when giving a typeIndex.  I am certain the typeIndex would be incorrect however
  // I'm not sure of the correct one
  /* ways I have tried     const spyOnNowOrWhenFetched = jest
      .spyOn(fetcher, 'nowOrWhenFetched')
      .mockReturnValueOnce(Promise.resolve('book')) */
  it('.. type index ...', () => {
    const typeIndex = 'publicTypeIndex'
    const groupPickedCb = () => {}
    const options = { selectedGroup: {} }
    const element = document.createElement('p')
    const peoplePicker = new PeoplePicker(
      element,
      typeIndex,
      groupPickedCb,
      options
    )

    const mockFindAddressBook: jest.Mock = require.requireMock(
      '../../../src/widgets/peoplePicker'
    ).findAddressBook
    mockFindAddressBook.mockResolvedValueOnce('book')
    /* jest.mock('rdflib', () => {
      nowOrWhenFetched: jest.fn(() => Promise.resolve('book'))
    }) */
    const spyAny = jest
      .spyOn(kb, 'any')
      .mockReturnValueOnce('book')
      .mockRejectedValueOnce('book')
    const spyLoad = jest.spyOn(fetcher, 'load').mockResolvedValue('book')

    const spyEle = jest.spyOn(document, 'createElement')

    debugger
    peoplePicker.render()
    // expect(spyOnNowOrWhenFetched).toBeCalled()
    // expect(spyOnNowOrWhenFetched).toReturnWith('book')
    expect(spyEle).toBeCalledTimes(1)
    // expect(spyAny).toBeCalled() // not getting called.
    // expect(spySecondAny).toBeCalled()
    // expect(spyLoad).toBeCalled()

    expect(peoplePicker.render()).toMatchInlineSnapshot(`
      PeoplePicker {
        "element": <p>
          <div
            style="max-width: 350px; min-height: 200px; outline: 1px solid black; display: flex;"
          />
        </p>,
        "groupPickedCb": [Function],
        "onSelectGroup": [Function],
        "options": Object {
          "selectedGroup": Object {},
        },
        "selectedgroup": undefined,
        "typeIndex": "publicTypeIndex",
      }
    `)
  })

  it('create Element is called .. ', () => {
    const spy = jest.spyOn(document, 'createElement')
    const typeIndex = {}
    const groupPickedCb = () => {}
    const options = { selectedGroup: true }
    const element = document.createElement('button')
    const peoplePicker = new PeoplePicker(
      element,
      typeIndex,
      groupPickedCb,
      options
    )
    peoplePicker.render()
    expect(spy).toHaveBeenCalledTimes(4)
  })
  it('runs 2', () => {
    const typeIndex = {}
    const groupPickedCb = () => {}
    const options = { selectedGroup: true }
    const element = document.createElement('p')
    const peoplePicker = new PeoplePicker(
      element,
      typeIndex,
      groupPickedCb,
      options
    )
    expect(peoplePicker.render()).toMatchInlineSnapshot(`
      PeoplePicker {
        "element": <p>
          <div
            style="max-width: 350px; min-height: 200px; outline: 1px solid black; display: flex;"
          />
        </p>,
        "groupPickedCb": [Function],
        "onSelectGroup": [Function],
        "options": Object {
          "selectedGroup": true,
        },
        "selectedgroup": undefined,
        "typeIndex": Object {},
      }
    `)
  })
  it.skip('mocking kb any for book', () => {
    const mockKbAny: jest.SpyInstance = require('../../../src/store').any
    mockKbAny.mockReturnValueOnce(null)
    const typeIndex = {}
    const groupPickedCb = () => {}
    const options = { selectedGroup: true }
    const element = document.createElement('p')
    const peoplePicker = new PeoplePicker(
      element,
      typeIndex,
      groupPickedCb,
      options
    )
    expect(peoplePicker.render()).toMatchInlineSnapshot(`
PeoplePicker {
  "element": <p>
    <div
      style="max-width: 350px; min-height: 200px; outline: 1px solid black; display: flex;"
    />
  </p>,
  "groupPickedCb": [Function],
  "onSelectGroup": [Function],
  "options": Object {
    "selectedGroup": true,
  },
  "selectedgroup": undefined,
  "typeIndex": Object {},
}
`)
  })
})

describe('PeoplePicker.findAddressBook', () => {
  it.skip('exists', () => {
    expect(new PeoplePicker().findAddressBook).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    const typeIndex = {}
    const groupPickedCb = () => {}
    const options = {}
    const peoplePicker = new PeoplePicker(
      element,
      typeIndex,
      groupPickedCb,
      options
    )
    expect(peoplePicker.findAddressBook()).toBeTruthy()
  })
})

describe('PeoplePicker.createNewGroup', () => {
  it('exists', () => {
    expect(new PeoplePicker().createNewGroup).toBeInstanceOf(Function)
  })
  // @@ TODO something about doc within the function has a problem
  it.skip('runs', () => {
    const typeIndex = {}
    const groupPickedCb = () => {}
    const options = {}
    const element = document.createElement('p')
    const peoplePicker = new PeoplePicker(
      element,
      typeIndex,
      groupPickedCb,
      options
    )
    expect(peoplePicker.createNewGroup(RdfLib.sym(''))).toBeTruthy()
  })
})

describe('PeoplePicker.onSelectGroup', () => {
  it('exists', () => {
    expect(new PeoplePicker().onSelectGroup).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const typeIndex = {}
    const groupPickedCb = () => {}
    const options = {}
    const element = document.createElement('p')
    const peoplePicker = new PeoplePicker(
      element,
      typeIndex,
      groupPickedCb,
      options
    )
    expect(peoplePicker.onSelectGroup(RdfLib.sym(''))).toEqual(undefined)
  })
})

describe('GroupPicker', () => {
  it('exists', () => {
    expect(new GroupPicker()).toBeInstanceOf(GroupPicker)
  })
})

describe('GroupPicker.render', () => {
  it('exists', () => {
    expect(new GroupPicker().render).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const container = RdfLib.sym('')
    const book = RdfLib.sym('')
    const handler = () => {}
    const groupPicker = new GroupPicker(container, book, handler)
    expect(groupPicker.render()).toBeTruthy()
  })
})

describe('GroupPicker.loadGroups', () => {
  it('exists', () => {
    expect(new GroupPicker().loadGroups).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const container = RdfLib.sym('')
    const book = RdfLib.sym('')
    const handler = () => {}
    const groupPicker = new GroupPicker(container, book, handler)
    expect(groupPicker.loadGroups()).toBeTruthy()
  })
})

describe('GroupPicker.handleClickGroup', () => {
  it('exists', () => {
    expect(new GroupPicker().handleClickGroup).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const container = RdfLib.sym('')
    const book = RdfLib.sym('')
    const handler = () => {}
    const groupPicker = new GroupPicker(container, book, handler)
    expect(groupPicker.handleClickGroup()).toBeTruthy()
  })
})

describe('Group', () => {
  it('exists', () => {
    expect(new Group()).toBeInstanceOf(Group)
  })
})

describe('Group.render', () => {
  it('exists', () => {
    expect(new Group().render).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const groupArg = RdfLib.sym('')
    const element = document.createElement('p')
    const group = new Group(element, groupArg)
    expect(group.render()).toBeTruthy()
  })
})

describe('GroupBuilder', () => {
  it('exists', () => {
    expect(new GroupBuilder()).toBeInstanceOf(GroupBuilder)
  })
})

describe('GroupBuilder.render', () => {
  it('exists', () => {
    expect(new GroupBuilder().render).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const groupArg = RdfLib.sym('')
    const book = RdfLib.sym('')
    const handler = () => {}
    const element = document.createElement('p')
    const groupBuilder = new GroupBuilder(
      element,
      book,
      groupArg,
      handler,
      handler
    )
    expect(groupBuilder.render()).toMatchInlineSnapshot(`
GroupBuilder {
  "book": Object {
    "dir": [Function],
    "doc": [Function],
    "elements": Array [],
    "sameTerm": [Function],
    "uri": "uri",
    "value": "",
  },
  "doneBuildingCb": [Function],
  "element": <p>
    <div
      style="max-width: 350px; min-height: 200px; outline: 1px solid black; display: flex; flex-direction: column;"
    >
      <label>
        Group Name:
        <input
          type="text"
        />
      </label>
      <button>
        Done
      </button>
    </div>
  </p>,
  "group": Object {
    "dir": [Function],
    "doc": [Function],
    "elements": Array [],
    "sameTerm": [Function],
    "uri": "uri",
    "value": "",
  },
  "groupChangedCb": [Function],
  "onGroupChanged": [Function],
}
`)
  })
})

describe('GroupBuilder.refresh', () => {
  it('exists', () => {
    expect(new GroupBuilder().refresh).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const groupArg = RdfLib.sym('')
    const book = RdfLib.sym('')
    const handler = () => {}
    const groupBuilder = new GroupBuilder(
      element,
      book,
      groupArg,
      handler,
      handler
    )
    expect(groupBuilder.refresh()).toEqual(undefined)
  })
})

describe('GroupBuilder.add', () => {
  it('exists', () => {
    expect(new GroupBuilder().add).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const groupArg = RdfLib.sym('')
    const book = RdfLib.sym('')
    const handler = () => {}
    const groupBuilder = new GroupBuilder(
      element,
      book,
      groupArg,
      handler,
      handler
    )
    expect(groupBuilder.add()).toBeTruthy()
  })
})

describe('GroupBuilder.handleRemove', () => {
  it('exists', () => {
    expect(new GroupBuilder().handleRemove).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const groupArg = RdfLib.sym('')
    const book = RdfLib.sym('')
    const handler = () => {}
    const element = document.createElement('p')
    const groupBuilder = new GroupBuilder(
      element,
      book,
      groupArg,
      handler,
      handler
    )
    expect(groupBuilder.handleRemove()).toMatchInlineSnapshot('[Function]')
  })
})

describe('GroupBuilder.setGroupName', () => {
  it('exists', () => {
    expect(new GroupBuilder().setGroupName).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const groupArg = RdfLib.sym('')
    const book = RdfLib.sym('')
    const handler = () => {}
    const element = document.createElement('p')
    const groupBuilder = new GroupBuilder(
      element,
      book,
      groupArg,
      handler,
      handler
    )
    expect(groupBuilder.setGroupName()).toMatchInlineSnapshot('Promise {}')
  })
})
