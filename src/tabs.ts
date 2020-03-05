// SOLID-compaible Tabs widget
//
// - Any Orientation = top, left, bottom, right
// - Selected bodies are hidden not deleted
// - Multiple tab select with Alt key
//
// written 2016-05-27
// See https://github.com/solid/solid-ui/issues/183 for styles

import store from './store'
import { cancelButton } from './widgets'
import { label } from './utils'
import { NamedNode } from 'rdflib'

type TabWidgetOptions = {
  backgroundColor?: string
  dom: HTMLDocument
  items?: Array<NamedNode>
  onClose?: (event: Event) => void
  ordered?: boolean
  orientation?: '0' | '1' | '2' | '3'
  predicate?: NamedNode
  renderMain?: (bodyMain: HTMLElement, subject: NamedNode) => void
  renderTab?: (tabDiv: HTMLDivElement, subject: NamedNode) => void
  renderTabSettings?: (bodyMain: ContainerElement, subject: NamedNode) => void
  selectedTab?: string
  startEmpty?: boolean
  subject: NamedNode
}

export class TabWidgetElement extends HTMLElement {
  bodyContainer?: HTMLElement
  refresh?: () => void
  tabContainer?: HTMLElement
}

class ContainerElement extends HTMLElement {
  asSettings?: boolean
}

class TabElement extends HTMLElement {
  bodyTR?: HTMLElement
  subject?: NamedNode
}

export function tabWidget (options: TabWidgetOptions) {
  const subject = options.subject
  const dom = options.dom
  const orientation = parseInt(options.orientation || '0')
  const backgroundColor = options.backgroundColor || '#ddddcc'
  const flipped = orientation & 2
  const vertical = orientation & 1
  const onClose = options.onClose

  const [selectedColor, color] = getColors(backgroundColor)
  const bodyMainStyle = `flex: 2; width: auto; height: 100%; border: 0.1em; border-style: solid; border-color: ${selectedColor}; padding: 1em;`
  const rootElement: TabWidgetElement = dom.createElement('div') // 20200117a

  rootElement.setAttribute('style', 'display: flex; height: 100%; width: 100%; flex-direction: ' +
    (vertical ? 'row' : 'column') + (flipped ? '-reverse;' : ';'))

  const navElement = rootElement.appendChild(dom.createElement('nav'))
  navElement.setAttribute('style', 'margin: 0;')

  const mainElement = rootElement.appendChild(dom.createElement('main'))

  mainElement.setAttribute('style', 'margin: 0; width:100%; height: 100%;') // override tabbedtab.css
  const tabContainer = navElement.appendChild(dom.createElement('ul'))
  tabContainer.setAttribute('style', `
    list-style-type: none;
    display: flex; 
    height: 100%; 
    width: 100%;
    padding: 0; 
    flex-direction: ${(vertical ? 'column' : 'row')}
  `)

  const tabElement = 'li'

  const bodyContainer = mainElement // .appendChild(dom.createElement('table'))
  rootElement.tabContainer = tabContainer // ussed by caller
  rootElement.bodyContainer = bodyContainer

  const corners = ['2em', '2em', '0', '0'] // top left, TR, BR, BL
  const cornersPrepped = corners.concat(corners).slice(orientation, orientation + 4)
  const cornersStyle = 'border-radius: ' + cornersPrepped.join(' ') + ';'

  const margins = ['0.3em', '0.3em', '0', '0.3em'] // top, right, bottom, left
  const marginsPrepped = margins.concat(margins).slice(orientation, orientation + 4)
  const marginsStyle = 'margin: ' + marginsPrepped.join(' ') + ';'

  const tabStyle = cornersStyle + `padding: 0.7em; max-width: 20em;color: ${color};` //  border: 0.05em 0 0.5em 0.05em; border-color: grey;
  const unselectedStyle = `${tabStyle}opacity: 50%; margin: 0.3em; background-color: ${backgroundColor};` // @@ rotate border
  const selectedStyle = tabStyle + marginsStyle + ' background-color: ' + selectedColor + ';'
  const shownStyle = 'height: 100%; width: 100%;'
  const hiddenStyle = shownStyle + 'display: none;'
  rootElement.refresh = sync
  sync()

  // From select-tabs branch by hand
  if (!options.startEmpty && tabContainer.children.length && options.selectedTab) {
    const selectedTab = Array.from(tabContainer.children)
      .map(tab => tab.firstChild as HTMLElement)
      .find(tab => tab.dataset.name === options.selectedTab)
    const tab = selectedTab || tabContainer.children[0].firstChild as HTMLButtonElement
    tab.click()
  } else if (!options.startEmpty) {
    (tabContainer.children[0].firstChild as HTMLButtonElement).click() // Open first tab
  }
  return rootElement

  function addCancelButton (tabContainer) {
    if (tabContainer.dataset.onCloseSet) {
      // @@ TODO: this is only here to make the tests work
      // Discussion at https://github.com/solid/solid-ui/pull/110#issuecomment-527080663
      const existingCancelButton = tabContainer.querySelector('.unstyled')
      tabContainer.removeChild(existingCancelButton)
    }
    const extraTab = dom.createElement(tabElement)
    extraTab.classList.add('unstyled')
    const tabCancelButton = cancelButton(dom, onClose)
    extraTab.appendChild(tabCancelButton)
    tabContainer.appendChild(extraTab)
    tabContainer.dataset.onCloseSet = 'true'
  }

  function getItems (): Array<NamedNode> {
    if (options.items) return options.items
    if (options.ordered !== false) {
      // default to true
      return store.the(subject, options.predicate).elements
    } else {
      return store.each(subject, options.predicate)
    }
  }

  function makeNewSlot (item: NamedNode) {
    const ele: TabElement = dom.createElement(tabElement)
    ele.subject = item
    const div = ele.appendChild(dom.createElement('div'))
    div.setAttribute('style', unselectedStyle)

    div.addEventListener('click', function (e) {
      if (!e.metaKey) {
        resetTabStyle()
        resetBodyStyle()
      }
      div.setAttribute('style', selectedStyle)
      if (!ele.bodyTR) return
      ele.bodyTR.setAttribute('style', shownStyle)
      let bodyMain = ele.bodyTR.children[0] as ContainerElement
      if (!bodyMain) {
        bodyMain = ele.bodyTR.appendChild(dom.createElement('main'))
        bodyMain.setAttribute('style', bodyMainStyle)
      }
      if (options.renderTabSettings && e.altKey && ele.subject) {
        if (bodyMain.asSettings !== true) {
          bodyMain.innerHTML = 'loading settings ...' + item
          options.renderTabSettings(bodyMain, ele.subject)
          bodyMain.asSettings = true
        }
      } else if (options.renderMain && ele.subject) {
        if (bodyMain.asSettings !== false) {
          bodyMain.innerHTML = 'loading item ...' + item
          options.renderMain(bodyMain, ele.subject)
          bodyMain.asSettings = false
        }
      }
    })

    if (options.renderTab) {
      options.renderTab(div, item)
    } else {
      div.textContent = label(item)
    }
    return ele
  }

  // @@ Use common one from utils?
  function orderedSync () {
    const items = getItems()
    if (!vertical) {
      // mainElement.setAttribute('colspan', items.length + (onClose ? 1 : 0))
    }
    let slot: TabElement, i, j, left, right
    let differ = false
    // Find how many match at each end
    for (left = 0; left < tabContainer.children.length; left++) {
      slot = tabContainer.children[left] as TabElement
      if (
        left >= items.length ||
        (slot.subject && !slot.subject.sameTerm(items[left]))
      ) {
        differ = true
        break
      }
    }
    if (!differ && items.length === tabContainer.children.length) {
      return // The two just match in order: a case to optimize for
    }
    for (right = tabContainer.children.length - 1; right >= 0; right--) {
      slot = tabContainer.children[right] as TabElement
      j = right - tabContainer.children.length + items.length
      if (slot.subject && !slot.subject.sameTerm(items[j])) {
        break
      }
    }
    // The elements left ... right in tabContainer.children do not match
    const insertables = items.slice(left, right - tabContainer.children.length + items.length + 1)
    while (right >= left) {
      // remove extra
      tabContainer.removeChild(tabContainer.children[left])
      bodyContainer.removeChild(bodyContainer.children[left])
      right -= 1
    }
    for (i = 0; i < insertables.length; i++) {
      const newSlot = makeNewSlot(insertables[i])
      const newBodyDiv = dom.createElement('div')
      // const newBodyDiv = newBodyDiv.appendChild(dom.createElement('div'))
      newSlot.bodyTR = newBodyDiv
      if (left === tabContainer.children.length) {
        // None left of original on right
        tabContainer.appendChild(newSlot)
        bodyContainer.appendChild(newBodyDiv)
        // console.log('   appending new ' + insertables[i])
      } else {
        // console.log('   inserting at ' + (left + i) + ' new ' + insertables[i])
        tabContainer.insertBefore(newSlot, tabContainer.children[left + i])
        bodyContainer.insertBefore(newBodyDiv, bodyContainer.children[left + i])
      }
    }
    if (onClose) {
      addCancelButton(tabContainer)
    }
  }

  function resetTabStyle () {
    for (let i = 0; i < tabContainer.children.length; i++) {
      const tab = tabContainer.children[i]
      if (tab.classList.contains('unstyled')) {
        continue
      }
      if (tab.children[0]) {
        tab.children[0].setAttribute('style', unselectedStyle)
      }
    }
  }

  function resetBodyStyle () {
    for (let i = 0; i < bodyContainer.children.length; i++) {
      bodyContainer.children[i].setAttribute('style', hiddenStyle)
    }
  }

  function sync () {
    if (options.ordered) {
      orderedSync()
    } else {
      // @@ SORT THE values
      orderedSync()
    }
  }
}

function getColors (backgroundColor: string): [string, string] {
  return isLight(backgroundColor)
    ? [colorBlend(backgroundColor, '#ffffff', 0.3), '#000000']
    : [colorBlend(backgroundColor, '#000000', 0.3), '#ffffff']
}

function colorBlend (a: string, b: string, mix: number): string {
  let ca, cb, res
  let str = '#'
  const hex = '0123456789abcdef'
  for (let i = 0; i < 3; i++) {
    ca = parseInt(a.slice(i * 2 + 1, i * 2 + 3), 16)
    cb = parseInt(b.slice(i * 2 + 1, i * 2 + 3), 16)
    res = ca * (1.0 - mix) + cb * mix // @@@ rounding
    const res2 = parseInt(('' + res).split('.')[0]) // @@ ugh
    const h = parseInt(('' + res2 / 16).split('.')[0]) // @@ ugh
    const l = parseInt(('' + (res2 % 16)).split('.')[0]) // @@ ugh
    str += hex[h] + hex[l]
  }
  // console.log('Blending colors ' + a + ' with ' + mix + ' of ' + b + ' to give ' + str)
  return str
}

function isLight (x: string): boolean {
  let total = 0
  for (let i = 0; i < 3; i++) {
    total += parseInt(x.slice(i * 2 + 1, i * 2 + 3), 16)
  }
  return total > 128 * 3
}
