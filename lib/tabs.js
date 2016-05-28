
// Code lost -- must have never checked it in :-((
// 2016-05-27


var tabs
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

// options.orientation 0 top, 1 left, 2 bottom, 3 right

UI.tabs.tabWidget = function(subject, dom, options){
  var kb = UI.store
  var box = dom.createElement('div')
  var orientation = options.orientation || 0
  var flipped = orientation & 2
  var vertical = orientation & 1
  var wholetable = box.appendChild(dom.createElement('table'))

  var tabContainer, tabElement, mainDiv
  var bodyDiv = dom.createElement('div')
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
    tabElement = 'td'
    mainTR.appendChild(bodyDiv)
  }

  var getItems = function(){
    if (options.ordered){
      var list = kb.the(subject, options.predicate)
      return list.elements
    } else {
      return kb.each(subject, options.predicate)
    }
  }

  var sync = function(){
    var items = getItems()
    var slot, i
    for (i=0; i< tabContainer.children.length; i++){
      slot = tabContainer.children[i]
      slot.deleteMe = true
    }
  }
  box.refresh = sync
  return box
}
