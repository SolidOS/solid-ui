
// Code lost -- must have never checked it in :-((
// 2016-05-27


var tabs = {}
module.exports = tabs

var UI = {
  icons: require('./iconBase.js'),
  log: require('./log'),
  ns: require('./ns'),
  store: require('./store'),
  utils: require('./utils'),
  tabs: tabs,
  widgets: require('./widgets')
}

// options.subject
// options.orientation 0 top, 1 left, 2 bottom, 3 right
// options.showMain(div, subject) function to show subject in div when tab selected
// options.showMain  function(subject, domContainer)
//

UI.tabs.tabWidget = function(options){
  var kb = UI.store
  var subject = options.subject
  var dom= options.dom
  var box = dom.createElement('div')
  var orientation = options.orientation || 0
  var flipped = orientation & 2
  var vertical = orientation & 1
  var wholetable = box.appendChild(dom.createElement('table'))

  var tabContainer, tabElement, mainDiv
  var bodyDiv = dom.createElement('div')
  bodyDiv.setAttribute('style', 'margin:0; min-width: 50em; min-height: 50em; width:100%; height: 100%;')
  if (vertical){
    var onlyTR = wholetable.appendChild(dom.createElement('tr'))
    var mainTD = dom.createElement('td')
    var tabTD = dom.createElement('td')
    if (flipped){
      onlyTR.appendChild(mainTD)
      onlyTR.appendChild(tabTD)
    } else {
      onlyTR.appendChild(tabTD)
      onlyTR.appendChild(mainTD)
    }
    tabContainer =  tabTD.appendChild(dom.createElement('table'))
    tabElement = 'tr'
    mainTD.appendChild(bodyDiv)

  } else { // horizontal
    tabContainer = dom.createElement('tr')
    var mainTR =  wholetable.appendChild(dom.createElement('tr'))
    if (flipped){
      var mainTR =  wholetable.appendChild(dom.createElement('tr'))
      var tabTR =  wholetable.appendChild(dom.createElement('tr'))
    }else {
      var tabTR =  wholetable.appendChild(dom.createElement('tr'))
      var mainTR =  wholetable.appendChild(dom.createElement('tr'))
    }
    tabContainer = tabTR
    var mainTD = mainTR.appendChild(dom.createElement('td'))
    tabElement = 'td'
    mainTD.appendChild(bodyDiv)
  }

  var getItems = function(){
    if (options.ordered){
      var list = kb.the(subject, options.predicate)
      return list.elements
    } else {
      return kb.each(subject, options.predicate)
    }
  }

  var makeNewSlot = function(item){
    var ele = dom.createElement(tabElement)
    ele.subject = item
    var div = ele.appendChild(dom.createElement('div'))
    div.setAttribute('style', 'margin: 0.7em; padding: 0.5em; xborder: 0.05em solid grey; border-radius: 0.3em; background-color: #eed;')
    div.addEventListener('click', function(e){
      bodyDiv.innerHTML = 'loading item ...' + item
      options.showMain(bodyDiv, ele.subject)
    })
    div.textContent = UI.utils.label(item)
    return ele
  }

  var orderedSync = function(){
    var items = getItems()
    if (!vertical) {
      mainTD.setAttribute('colspan', items.length)
    }
    var slot, i, j, left, right
    var differ = false
    // Find how many match at each end
    for (left = 0; left < tabContainer.children.length; left++){
      slot = tabContainer.children[left]
      if (left >= items.length || !slot.subject.sameTerm(items[left])){
        differ = true;
        break;
      }
    }
    if (!differ && items.length === tabContainer.children.length){
      return; // The two just match in order: a case to optimize for
    }
    for (right = tabContainer.children.length - 1; right >= 0; right--){
      slot = tabContainer.children[right]
      j = right - tabContainer.children.length + items.length
      if (!slot.subject.sameTerm(items[j])){
        break;
      }
    }
    // The elements left ... right in tabContainer.children do not match
    var insertables = items.slice(left, right - tabContainer.children.length + items.length + 1)
    while (right >= left) { // remove extra
      tabContainer.removeChild(tabContainer.children[left])
      right -= 1
    }
    for (i=0; i< insertables.length; i++){
      if (left === tabContainer.children.length) { // None left of original on right
        tabContainer.appendChild(makeNewSlot(insertables[i]))
        console.log('   appending new ' + insertables[i])
      } else {
        console.log('   inserting at ' + (left + i) + ' new ' + insertables[i])
        tabContainer.insertBefore(makeNewSlot(insertables[i]),tabContainer.children[left + i])
      }
    }
  }

  var unorderedSync = function(){
    var items = getItems()
    if (!vertical) {
      mainTD.setAttribute('colspan', items.length)
    }
    var slot, i, j, found, pair
    var missing = []
    for (i=0; i< tabContainer.children.length; i++){
      slot = tabContainer.children[i]
      slot.deleteMe = true
    }
    for (j = 0; j< items.length; j++){
      found = false
      for (i=0; i< tabContainer.children.length; i++){
        if (tabContainer.children[i].subject === items[j]) {
          found = true
        }
      }
      if (!found){
        missing.push([j, items[j]])
      }
    }
    for (j = 0; j< missing.length; j++){
      pair = missing[j]
      i = pair[0]
      slot = makeNewSlot(pair[1])
      if (i >= tabContainer.length){
        tabContainer.appendChild(slot)
      } else {
        tabContainer.insertBefore(slot, tabContainer.children[i + 1])
      }
    }

    for (i=0; i< tabContainer.children.length; i++){
      slot = tabContainer.children[i]
      if (slot.deleteMe){
        tabContainer.removeChild(slot)
      }
    }
  }

  var sync = function(){
    if (options.ordered) {
      orderedSync()
    } else {
      unorderedSync()
    }
  }
  box.refresh = sync
  sync()
  return box
}
