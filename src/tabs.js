
// SOLID-compaible Tabs widget
//
// - Any Orientation = top, left, bottom, right
// - Selected bodies are hidden not deleted
// - Multiple tab select with Alt key
//
// written 2016-05-27

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
  var box = dom.createElement('div')
  var orientation = parseInt(options.orientation || '0')
  var backgroundColor = options.backgroundColor || '#ddddcc'
  var color
  var flipped = orientation & 2
  var vertical = orientation & 1
  var wholetable = box.appendChild(dom.createElement('table'))
  var mainTR, mainTD, tabTR
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
      var l = parseInt(('' + res2 % 16).split('.')[0]) // @@ ugh
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
  var bodyDivStyle = 'resize: both; overflow: scroll; margin:0; border: 0.5em; border-style: solid; border-color: ' +
          selectedColor + '; padding: 1em;  min-width: 30em; min-height: 450px; width:100%;'

  if (vertical) {
    var onlyTR = wholetable.appendChild(dom.createElement('tr'))
    mainTD = dom.createElement('td')
    mainTD.setAttribute('style', 'margin: 0;') // override tabbedtab.css
    var tabTD = dom.createElement('td')
    tabTD.setAttribute('style', 'margin: 0;')
    if (flipped) {
      onlyTR.appendChild(mainTD)
      onlyTR.appendChild(tabTD)
    } else {
      onlyTR.appendChild(tabTD)
      onlyTR.appendChild(mainTD)
    }
    tabContainer = tabTD.appendChild(dom.createElement('table'))
    tabElement = 'tr'
    // tabBar = tabTD // drop zone
    // mainTD.appendChild(bodyDiv)
  } else { // horizontal
    tabContainer = dom.createElement('tr')
    mainTR = wholetable.appendChild(dom.createElement('tr'))
    if (flipped) {
      mainTR = wholetable.appendChild(dom.createElement('tr'))
      tabTR = wholetable.appendChild(dom.createElement('tr'))
    } else {
      tabTR = wholetable.appendChild(dom.createElement('tr'))
      mainTR = wholetable.appendChild(dom.createElement('tr'))
    }
    tabContainer = tabTR
    mainTD = mainTR.appendChild(dom.createElement('td'))
    tabElement = 'td'
    // mainTD.appendChild(bodyDiv)
  }
  var bodyContainer = mainTD.appendChild(dom.createElement('table'))
  box.tabContainer = tabContainer
  box.bodyContainer = bodyContainer

  var getItems = function () {
    if (options.items) return options.items
    if (options.ordered !== false) { // default to true
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
  var unselectedStyle = tabStyle + 'opacity: 50%; margin: 0.3em; background-color: ' + backgroundColor + ';' // @@ rotate border
  var selectedStyle = tabStyle + margins + ' background-color: ' + selectedColor + ';'
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
      var bodyDiv = ele.bodyTR.firstChild
      if (!bodyDiv) {
        bodyDiv = ele.bodyTR.appendChild(dom.createElement('div'))
        bodyDiv.setAttribute('style', bodyDivStyle)
      }
      if (options.renderTabSettings && e.altKey) {
        if (bodyDiv.asSetttings !== true) {
          bodyDiv.innerHTML = 'loading settings ...' + item
          options.renderTabSettings(bodyDiv, ele.subject)
          bodyDiv.asSetttings = true
        }
      } else {
        if (bodyDiv.asSetttings !== false) {
          bodyDiv.innerHTML = 'loading item ...' + item
          options.renderMain(bodyDiv, ele.subject)
          bodyDiv.asSetttings = false
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

  var orderedSync = function () {
    var items = getItems()
    if (!vertical) {
      mainTD.setAttribute('colspan', items.length + (onClose ? 1 : 0))
    }
    var slot, i, j, left, right
    var differ = false
    // Find how many match at each end
    for (left = 0; left < tabContainer.children.length; left++) {
      slot = tabContainer.children[left]
      if (left >= items.length || (slot.subject && !slot.subject.sameTerm(items[left]))) {
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
    var insertables = items.slice(left, right - tabContainer.children.length + items.length + 1)
    while (right >= left) { // remove extra
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
      if (left === tabContainer.children.length) { // None left of original on right
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

  // UNMAINTAINED
  var unorderedSync = function () {
    var items = getItems()
    if (!vertical) {
      mainTD.setAttribute('colspan', items.length + (onClose ? 1 : 0))
    }
    var slot, i, j, found, pair
    var missing = []
    for (i = 0; i < tabContainer.children.length; i++) {
      slot = tabContainer.children[i]
      slot.deleteMe = true
    }
    for (j = 0; j < items.length; j++) {
      found = false
      for (i = 0; i < tabContainer.children.length; i++) {
        if (tabContainer.children[i].subject === items[j]) {
          found = true
        }
      }
      if (!found) {
        missing.push([j, items[j]])
      }
    }
    for (j = 0; j < missing.length; j++) {
      pair = missing[j]
      i = pair[0]
      slot = makeNewSlot(pair[1])
      if (i >= tabContainer.length) {
        tabContainer.appendChild(slot)
      } else {
        tabContainer.insertBefore(slot, tabContainer.children[i + 1])
      }
    }

    for (i = 0; i < tabContainer.children.length; i++) {
      slot = tabContainer.children[i]
      if (slot.deleteMe) {
        tabContainer.removeChild(slot)
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
      unorderedSync()
    }
  }
  box.refresh = sync
  sync()

// From select-tabs branch by hand
  if (!options.startEmpty && tabContainer.children.length && options.selectedTab) {
    var tab
    var found = false
    for (var i = 0; i < tabContainer.children.length; i++) {
      tab = tabContainer.children[i]
      if (tab.firstChild && tab.firstChild.dataset.name === options.selectedTab) {
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
  return box

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
