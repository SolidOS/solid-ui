import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { silenceDebugMessages } from '../helpers/debugger'
import { AddAgentButtons } from '../../../src/acl/add-agent-buttons'
import { instantiateAccessGroups } from '../helpers/instantiateAccessGroups'
import { JSDOM } from 'jsdom'
import { solidLogicSingleton } from 'solid-logic'
import ns from '../../../src/lib/ns'

const store = solidLogicSingleton.store

silenceDebugMessages()
const dom = new JSDOM('<!DOCTYPE html><p>Hello world</p>').window.document

function instantiateAddAgentButtons () {
  const groupList = instantiateAccessGroups(dom, store)
  return new AddAgentButtons(groupList)
}

function getButtonName (element: HTMLElement): string {
  expect(element.tagName).toEqual('BUTTON')
  expect((element.childNodes[0] as HTMLElement).tagName).toEqual('IMG')
  return (element.childNodes[0] as HTMLImageElement).title
}

describe('AddAgentButtons', () => {
  it('exists', () => {
    expect(AddAgentButtons).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAddAgentButtons()).toBeInstanceOf(Object)
  })
})

describe('AddAgentButtons#render', () => {
  it('exists', () => {
    expect(instantiateAddAgentButtons().render).toBeInstanceOf(Function)
  })
  it('runs', () => {
    expect(instantiateAddAgentButtons().render()).toBeInstanceOf(Object)
  })
})

describe('AgentButtons', () => {
  let agentButtons: any
  beforeEach(() => {
    agentButtons = instantiateAddAgentButtons().render()
  })
  it('exists', () => {
    expect(agentButtons.constructor).toBeTruthy()
    expect(agentButtons.childNodes.length).toEqual(2)
  })
  it('contains an add button', () => {
    expect(getButtonName(agentButtons.childNodes[0])).toEqual('Add ...')
  })
  it('contains a bar element', () => {
    expect(agentButtons.childNodes[1].tagName).toEqual('DIV')
    expect(agentButtons.childNodes[1].innerHTML).toEqual('')
  })
})

const barButtons = [
  'Add Person',
  'Add Group',
  'Add Everyone',
  'Anyone logged In',
  'A Software Agent (bot)',
  'A Web App (origin)'
]

describe('When add button is clicked', () => {
  let bar: any
  beforeEach(() => {
    const agentButtons = instantiateAddAgentButtons().render()
    const addButton = agentButtons.childNodes[0] as HTMLButtonElement
    addButton.click()
    bar = agentButtons.childNodes[1] as HTMLDivElement
  })
  it('bar is filled', () => {
    expect(bar.childNodes.length).toEqual(barButtons.length)
  })
  for (let i = 0; i < barButtons.length; i++) {
    it(`Bar contains a "${barButtons[i]}" button`, () => {
      expect(getButtonName(bar.childNodes[i])).toEqual(barButtons[i])
    })
  }
})

describe('When "Add Person" button is clicked', () => {
  let bar
  const buttonIndex = 0
  beforeEach(() => {
    const agentButtons = instantiateAddAgentButtons().render()
    const addButton = agentButtons.childNodes[0] as HTMLButtonElement
    addButton.click()
    bar = agentButtons.childNodes[1] as HTMLDivElement
    const buttonToClick = bar.childNodes[buttonIndex] as HTMLButtonElement
    buttonToClick.click()
  })
  it('bar is simplified', () => {
    // expect(bar.childNodes.length).toEqual(1) ???
    expect(bar.childNodes.length).toEqual(2)
  })
  it('Bar still contains the button that was clicked', () => {
    expect(getButtonName(bar.childNodes[0])).toEqual(barButtons[buttonIndex])
  })
  it('Bar now contains askName form', () => {
    expect(bar.childNodes[1].tagName).toEqual('DIV')
  })
})

describe('When "Add Group" button is clicked', () => {
  let bar
  const buttonIndex = 1
  beforeEach(() => {
    const agentButtons = instantiateAddAgentButtons().render()
    const addButton = agentButtons.childNodes[0] as HTMLButtonElement
    addButton.click()
    bar = agentButtons.childNodes[1] as HTMLDivElement
    const buttonToClick = bar.childNodes[buttonIndex] as HTMLButtonElement
    buttonToClick.click()
  })
  it('bar is simplified', () => {
    expect(bar.childNodes.length).toEqual(2)
  })
  it('Bar still contains the button that was clicked', () => {
    expect(getButtonName(bar.childNodes[0])).toEqual(barButtons[buttonIndex])
  })
  it('Bar now contains askName form', () => {
    expect(bar.childNodes[1].tagName).toEqual('DIV')
  })
})

describe('Adding Everyone', () => {
  let groupList: ReturnType<typeof instantiateAccessGroups>
  let groups: HTMLElement
  let button: HTMLButtonElement
  let image: HTMLImageElement

  beforeEach(() => {
    groupList = instantiateAccessGroups(dom, store)
    vi.spyOn(groupList.controller, 'isEditable', 'get').mockReturnValue(true)
    vi.spyOn(groupList.controller, 'save').mockResolvedValue(undefined)
    vi.spyOn(groupList.controller, 'render').mockReturnValue(dom.createElement('div'))
    vi.spyOn(store.fetcher, 'load').mockRejectedValue(new Error('Unexpected RDF lookup'))
    groups = groupList.render()
    groups.querySelector<HTMLImageElement>('img[title="Add ..."]')!.click()
    image = groups.querySelector<HTMLImageElement>('img[title="Add Everyone"]')!
    button = image.parentElement as HTMLButtonElement
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it.each(['text/uri-list', 'text/plain'])('drags Everyone directly to Editors using %s without fetching the icon', async format => {
    const payload = new Map<string, string>([[format, image.src]])
    const dataTransfer = {
      types: [format],
      setData: (type: string, value: string) => payload.set(type, value),
      getData: (type: string) => payload.get(type) || ''
    }
    const dragStart = new dom.defaultView!.Event('dragstart', { bubbles: true })
    Object.defineProperty(dragStart, 'dataTransfer', { value: dataTransfer })
    button.dispatchEvent(dragStart)

    expect(dataTransfer.getData(format)).toBe(ns.foaf('Agent').uri)
    expect(button.draggable).toBe(true)
    expect(image.draggable).toBe(false)

    const editors = Array.from(groups.children).find(group =>
      (group.firstElementChild as HTMLElement)?.innerText === 'Editors')!
    const drop = new dom.defaultView!.Event('drop', { bubbles: true, cancelable: true })
    Object.defineProperty(drop, 'dataTransfer', { value: dataTransfer })
    editors.dispatchEvent(drop)

    await vi.waitFor(() => expect(groupList.controller.save).toHaveBeenCalledOnce())
    const editorModes = [ns.acl('Read').uri, ns.acl('Write').uri].join('\n')
    expect(groupList.byCombo[editorModes]).toEqual([['agentClass', ns.foaf('Agent').uri]])
    expect(store.fetcher.load).not.toHaveBeenCalled()
  })

  it('still adds Everyone as a Viewer when clicked', async () => {
    button.click()

    await vi.waitFor(() => expect(groupList.controller.save).toHaveBeenCalledOnce())
    expect(groupList.byCombo[ns.acl('Read').uri]).toEqual([['agentClass', ns.foaf('Agent').uri]])
    expect(store.fetcher.load).not.toHaveBeenCalled()
  })
})

describe('When "Add Bot" button is clicked', () => {
  let bar
  const buttonIndex = 4
  beforeEach(() => {
    const agentButtons = instantiateAddAgentButtons().render()
    const addButton = agentButtons.childNodes[0] as HTMLButtonElement
    addButton.click()
    bar = agentButtons.childNodes[1] as HTMLDivElement
    const buttonToClick = bar.childNodes[buttonIndex] as HTMLButtonElement
    buttonToClick.click()
  })
  it('bar is simplified', () => {
    expect(bar.childNodes.length).toEqual(2)
  })
  it('Bar still contains the button that was clicked', () => {
    expect(getButtonName(bar.childNodes[0])).toEqual(barButtons[buttonIndex])
  })
  it('Bar now contains askName form', () => {
    expect(bar.childNodes[1].tagName).toEqual('DIV')
  })
})
describe('When "Add App" button is clicked', () => {
  let bar
  const buttonIndex = 5
  beforeEach(() => {
    const agentButtons = instantiateAddAgentButtons().render()
    const addButton = agentButtons.childNodes[0] as HTMLButtonElement
    addButton.click()
    bar = agentButtons.childNodes[1] as HTMLDivElement
    const buttonToClick = bar.childNodes[buttonIndex] as HTMLButtonElement
    buttonToClick.click()
  })
  it('bar is simplified', () => {
    expect(bar.childNodes.length).toEqual(2)
  })
  it('Bar still contains the button that was clicked', () => {
    expect(getButtonName(bar.childNodes[0])).toEqual(barButtons[buttonIndex])
  })
  it('Bar now contains apss table', () => {
    expect(bar.childNodes[1].tagName).toEqual('DIV')
  })
})
