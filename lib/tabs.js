
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
  var orientation = parseInt(options.orientation || "0")
  var flipped = orientation & 2
  var vertical = orientation & 1
  var wholetable = box.appendChild(dom.createElement('table'))

  var tabContainer, tabElement, mainDiv
  //var bodyDiv = dom.createElement('div')
  var bodyDivStyle = 'resize: both; margin:0; border: 0.5em; border-style: solid; border-color: #eed; padding: 1em;  min-width: 30em; min-height: 20em; width:100%;'
  //bodyDiv.setAttribute('style', )
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
    //mainTD.appendChild(bodyDiv)

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
    //mainTD.appendChild(bodyDiv)
  }
  var bodyContainer = mainTD.appendChild(dom.createElement('table'))

  var getItems = function(){
    if (options.ordered){
      var list = kb.the(subject, options.predicate)
      return list.elements
    } else {
      return kb.each(subject, options.predicate)
    }
  }

  var corners = ["2em", "2em", "0", "0"] // top left, TR, BR, BL
  corners = corners.concat(corners).slice(orientation, orientation + 4)
  corners = 'border-radius: ' + corners.join(' ') + ';'
  var tabStyle = corners + 'margin: 0.3em; padding: 0.7em;'
  var unselectedStyle = tabStyle + ' background-color: #eed;  border: 0.05em 0 0.5em 0.05em; border-color: grey;' // @@ rotate border
  var selectedStyle = tabStyle + ' background-color: #ddc;'
  var shownStyle = ''
  var hiddenStyle = shownStyle + 'display: none;'

  var resetTabStyle = function() {
    for (var i = 0; i < tabContainer.children.length; i++){
      tabContainer.children[i].firstChild.setAttribute('style', unselectedStyle)
    }
  }
  var resetBodyStyle = function() {
    for (var i = 0; i < bodyContainer.children.length; i++){
      bodyContainer.children[i].setAttribute('style', hiddenStyle)
    }
  }


  var makeNewSlot = function(item){
    var ele = dom.createElement(tabElement)
    ele.subject = item
    var div = ele.appendChild(dom.createElement('div'))
    div.setAttribute('style', unselectedStyle)
    div.addEventListener('click', function(e){
      var bodyDiv
      if (!e.altKey){
        resetTabStyle()
        resetBodyStyle()
      }
      div.setAttribute('style', selectedStyle)
      ele.bodyTR.setAttribute('style', shownStyle)
      if (!ele.bodyTR.firstChild) {
        bodyDiv = ele.bodyTR.appendChild(dom.createElement('div'))
        bodyDiv.setAttribute('style', bodyDivStyle)
        bodyDiv.innerHTML = 'loading item ...' + item
        options.showMain(bodyDiv, ele.subject)
      }
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
      bodyContainer.removeChild(bodyContainer.children[left])
      right -= 1
    }
    for (i=0; i< insertables.length; i++){
      var newSlot = makeNewSlot(insertables[i])
      var newBodyTR = dom.createElement('tr')
      //var newBodyDiv = newBodyTR.appendChild(dom.createElement('div'))
      newSlot.bodyTR = newBodyTR
      dom.createElement('tr')
      if (left === tabContainer.children.length) { // None left of original on right
        tabContainer.appendChild(newSlot)
        bodyContainer.appendChild(newBodyTR)
        console.log('   appending new ' + insertables[i])
      } else {
        console.log('   inserting at ' + (left + i) + ' new ' + insertables[i])
        tabContainer.insertBefore(newSlot, tabContainer.children[left + i])
        bodyContainer.insertBefore(newBodyTR, bodyContainer.children[left + i])
      }
    }
  }

// UNMAINTAINED
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
