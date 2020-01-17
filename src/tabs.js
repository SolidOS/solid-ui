// SOLID-compaible Tabs widget
//
// - Any Orientation = top, left, bottom, right
// - Selected bodies are hidden not deleted
// - Multiple tab select with Alt key
//
// written 2016-05-27
// See https://github.com/solid/solid-ui/issues/183 for styles

var tabs = {}
module.exports = tabs

var UI = {
  icons: require('./iconBase'),
  log: require('./log'),
  ns: require('./ns'),
  store: require('./store'),
  tabs: tabs,
  widgets: require('./widgets')
}

const utils = require('./utils')

// options.subject
// options.orientation 0 top, 1 left, 2 bottom, 3 right
// options.showMain(div, subject) function to show subject in div when tab selected
// options.renderTabSettings  function(subject, domContainer)
// options.renderTabSettings  like showMain but when user has held Alt down
// options.onClose            if given, will present a cancelButton next to tabs that calls this optional method
//

UI.tabs.tabWidget = function (options) {
  var kb = UI.store
  var subject = options.subject
  var dom = options.dom
  var orientation = parseInt(options.orientation || '0')
  var backgroundColor = options.backgroundColor || '#ddddcc'
  var color
  var flipped = orientation & 2
  var vertical = orientation & 1

  var mainElement, navElement
  var tabContainer, tabElement
  var onClose = options.onClose

  var isLight = function (x) {
    var total = 0
    for (var i = 0; i < 3; i++) {
      total += parseInt(x.slice(i * 2 + 1, i * 2 + 3), 16)
    }
    return total > 128 * 3
  }
  var colorBlend = function (a, b, mix) {
    var ca, cb, res
    var str = '#'
    const hex = '0123456789abcdef'
    for (var i = 0; i < 3; i++) {
      ca = parseInt(a.slice(i * 2 + 1, i * 2 + 3), 16)
      cb = parseInt(b.slice(i * 2 + 1, i * 2 + 3), 16)
      res = ca * (1.0 - mix) + cb * mix // @@@ rounding
      var res2 = parseInt(('' + res).split('.')[0]) // @@ ugh
      var h = parseInt(('' + res2 / 16).split('.')[0]) // @@ ugh
      var l = parseInt(('' + (res2 % 16)).split('.')[0]) // @@ ugh
      str += hex[h] + hex[l]
    }
    // console.log('Blending colors ' + a + ' with ' + mix + ' of ' + b + ' to give ' + str)
    return str
  }

  var selectedColor
  if (isLight(backgroundColor)) {
    selectedColor = colorBlend(backgroundColor, '#ffffff', 0.3)
    color = '#000000'
  } else {
    selectedColor = colorBlend(backgroundColor, '#000000', 0.3)
    color = '#ffffff'
  }
  var bodyMainStyle = `flex: 2; border: 0.1em; border-style: solid; border-color: ${selectedColor}; padding: 1em;`

  /*
    'resize: both; overflow: scroll; margin:0; border: 0.1em; border-style: solid; border-color: ' +
    selectedColor +
    '; padding: 1em;  min-width: 30em; min-height: 450px; width:100%;'
*/
  const rootElement = dom.createElement('div') // 20200113c

  rootElement.style = 'display: flex; height: 100%; flex-direction: ' +
      (vertical ? 'row' : 'column') + (flipped ? '-reverse;' : ';')

  navElement = rootElement.appendChild(dom.createElement('nav'))
  navElement.setAttribute('style', 'margin: 0;')

  mainElement = rootElement.appendChild(dom.createElement('main'))

  mainElement.setAttribute('style', 'margin: 0;') // override tabbedtab.css
  tabContainer = navElement.appendChild(dom.createElement('ul'))
  tabElement = 'li'

  var bodyContainer = mainElement // .appendChild(dom.createElement('table'))
  rootElement.tabContainer = tabContainer // ussed by caller
  rootElement.bodyContainer = bodyContainer

  var getItems = function () {
    if (options.items) return options.items
    if (options.ordered !== false) {
      // default to true
      var list = kb.the(subject, options.predicate)
      return list.elements
    } else {
      return kb.each(subject, options.predicate)
    }
  }

  var corners = ['2em', '2em', '0', '0'] // top left, TR, BR, BL
  corners = corners.concat(corners).slice(orientation, orientation + 4)
  corners = 'border-radius: ' + corners.join(' ') + ';'

  var margins = ['0.3em', '0.3em', '0', '0.3em'] // top, right, bottom, left
  margins = margins.concat(margins).slice(orientation, orientation + 4)
  margins = 'margin: ' + margins.join(' ') + ';'

  var tabStyle = corners + 'padding: 0.7em; max-width: 20em;' //  border: 0.05em 0 0.5em 0.05em; border-color: grey;
  tabStyle += 'color: ' + color + ';'
  var unselectedStyle =
    tabStyle +
    'opacity: 50%; margin: 0.3em; background-color: ' +
    backgroundColor +
    ';' // @@ rotate border
  var selectedStyle =
    tabStyle + margins + ' background-color: ' + selectedColor + ';'
  var shownStyle = ''
  var hiddenStyle = shownStyle + 'display: none;'

  var resetTabStyle = function () {
    for (var i = 0; i < tabContainer.children.length; i++) {
      const tab = tabContainer.children[i]
      if (tab.classList.contains('unstyled')) {
        continue
      }
      tab.firstChild.setAttribute('style', unselectedStyle)
    }
  }
  var resetBodyStyle = function () {
    for (var i = 0; i < bodyContainer.children.length; i++) {
      bodyContainer.children[i].setAttribute('style', hiddenStyle)
    }
  }

  var makeNewSlot = function (item) {
    var ele = dom.createElement(tabElement)
    ele.subject = item
    var div = ele.appendChild(dom.createElement('div'))
    div.setAttribute('style', unselectedStyle)

    div.addEventListener('click', function (e) {
      if (!e.metaKey) {
        resetTabStyle()
        resetBodyStyle()
      }
      div.setAttribute('style', selectedStyle)
      ele.bodyTR.setAttribute('style', shownStyle)
      var bodyMain = ele.bodyTR.firstChild
      if (!bodyMain) {
        bodyMain = ele.bodyTR.appendChild(dom.createElement('main'))
        bodyMain.setAttribute('style', bodyMainStyle)
      }
      if (options.renderTabSettings && e.altKey) {
        if (bodyMain.asSetttings !== true) {
          bodyMain.innerHTML = 'loading settings ...' + item
          options.renderTabSettings(bodyMain, ele.subject)
          bodyMain.asSetttings = true
        }
      } else {
        if (bodyMain.asSetttings !== false) {
          bodyMain.innerHTML = 'loading item ...' + item
          options.renderMain(bodyMain, ele.subject)
          bodyMain.asSetttings = false
        }
      }
    })

    if (options.renderTab) {
      options.renderTab(div, item)
    } else {
      div.textContent = utils.label(item)
    }
    return ele
  }

  // @@ Use common one from utils?
  var orderedSync = function () {
    var items = getItems()
    if (!vertical) {
      // mainElement.setAttribute('colspan', items.length + (onClose ? 1 : 0))
    }
    var slot, i, j, left, right
    var differ = false
    // Find how many match at each end
    for (left = 0; left < tabContainer.children.length; left++) {
      slot = tabContainer.children[left]
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
      slot = tabContainer.children[right]
      j = right - tabContainer.children.length + items.length
      if (slot.subject && !slot.subject.sameTerm(items[j])) {
        break
      }
    }
    // The elements left ... right in tabContainer.children do not match
    var insertables = items.slice(
      left,
      right - tabContainer.children.length + items.length + 1
    )
    while (right >= left) {
      // remove extra
      tabContainer.removeChild(tabContainer.children[left])
      bodyContainer.removeChild(bodyContainer.children[left])
      right -= 1
    }
    for (i = 0; i < insertables.length; i++) {
      var newSlot = makeNewSlot(insertables[i])
      var newBodyTR = dom.createElement('tr')
      // var newBodyDiv = newBodyTR.appendChild(dom.createElement('div'))
      newSlot.bodyTR = newBodyTR
      dom.createElement('tr')
      if (left === tabContainer.children.length) {
        // None left of original on right
        tabContainer.appendChild(newSlot)
        bodyContainer.appendChild(newBodyTR)
        // console.log('   appending new ' + insertables[i])
      } else {
        // console.log('   inserting at ' + (left + i) + ' new ' + insertables[i])
        tabContainer.insertBefore(newSlot, tabContainer.children[left + i])
        bodyContainer.insertBefore(newBodyTR, bodyContainer.children[left + i])
      }
    }
    if (onClose) {
      addCancelButton(tabContainer)
    }
  }

  var sync = function () {
    if (options.ordered) {
      orderedSync()
    } else {
      // @@ SORT THE values
      orderedSync()
    }
  }
  rootElement.refresh = sync
  sync()

  // From select-tabs branch by hand
  if (
    !options.startEmpty &&
    tabContainer.children.length &&
    options.selectedTab
  ) {
    var tab
    var found = false
    for (var i = 0; i < tabContainer.children.length; i++) {
      tab = tabContainer.children[i]
      if (
        tab.firstChild &&
        tab.firstChild.dataset.name === options.selectedTab
      ) {
        tab.firstChild.click()
        found = true
      }
    }
    if (!found) {
      tabContainer.children[0].firstChild.click() // Open first tab
    }
  } else if (!options.startEmpty && tabContainer.children.length) {
    tabContainer.children[0].firstChild.click() // Open first tab
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
    if (tabElement === 'td') {
      extraTab.style.textAlign = 'right'
    }
    const cancelButton = UI.widgets.cancelButton(dom, onClose)
    extraTab.appendChild(cancelButton)
    tabContainer.appendChild(extraTab)
    tabContainer.dataset.onCloseSet = 'true'
  }
}
