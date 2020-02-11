jest.mock('rdflib')
import * as RdfLib from 'rdflib'
jest.mock('solid-auth-client')
import { JSDOM } from 'jsdom'
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document
const element = dom.createElement('div')

import { PeoplePicker, GroupPicker, Group, GroupBuilder } from '../../../src/widgets/peoplePicker'

describe('PeoplePicker', () => {
  it('exists', () => {
    expect(new PeoplePicker()).toBeInstanceOf(PeoplePicker)
  })
})

describe('PeoplePicker.render', () => {
  it('exists', () => {
    expect(new PeoplePicker().render).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    const typeIndex = {}
    const groupPickedCb = () => {}
    const options = {}
    const peoplePicker = new PeoplePicker(element, typeIndex, groupPickedCb, options)
    expect(peoplePicker.render()).toBeTruthy()
  })
})

describe('PeoplePicker.findAddressBook', () => {
  it('exists', () => {
    expect(new PeoplePicker().findAddressBook).toBeInstanceOf(Function)
  })
  it('runs', () => {
    const typeIndex = {}
    const groupPickedCb = () => {}
    const options = {}
    const peoplePicker = new PeoplePicker(element, typeIndex, groupPickedCb, options)
    expect(peoplePicker.findAddressBook()).toBeTruthy()
  })
})

describe('PeoplePicker.createNewGroup', () => {
  it('exists', () => {
    expect(new PeoplePicker().createNewGroup).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    const typeIndex = {}
    const groupPickedCb = () => {}
    const options = {}
    const peoplePicker = new PeoplePicker(element, typeIndex, groupPickedCb, options)
    expect(peoplePicker.createNewGroup(RdfLib.sym(''))).toBeTruthy()
  })
})

describe('PeoplePicker.onSelectGroup', () => {
  it('exists', () => {
    expect(new PeoplePicker().onSelectGroup).toBeInstanceOf(Function)
  })
  it.skip('runs', () => {
    const typeIndex = {}
    const groupPickedCb = () => {}
    const options = {}
    const peoplePicker = new PeoplePicker(element, typeIndex, groupPickedCb, options)
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
  it.skip('runs', () => {
    const groupArg = RdfLib.sym('')
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
  it.skip('runs', () => {
    const groupArg = RdfLib.sym('')
    const book = RdfLib.sym('')
    const handler = () => {}
    const groupBuilder = new GroupBuilder(element, book, groupArg, handler, handler)
    expect(groupBuilder.render()).toBeTruthy()
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
    const groupBuilder = new GroupBuilder(element, book, groupArg, handler, handler)
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
    const groupBuilder = new GroupBuilder(element, book, groupArg, handler, handler)
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
    const groupBuilder = new GroupBuilder(element, book, groupArg, handler, handler)
    expect(groupBuilder.handleRemove()).toBeTruthy()
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
    const groupBuilder = new GroupBuilder(element, book, groupArg, handler, handler)
    expect(groupBuilder.setGroupName()).toBeTruthy()
  })
})
