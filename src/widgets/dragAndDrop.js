module.exports = {
  makeDropTarget: makeDropTarget,
  makeDraggable: makeDraggable
}

function makeDropTarget (ele, droppedURIHandler, droppedFileHandler) {

  var dragoverListener = function (e) {
    e.preventDefault() // Neeed else drop does not work [sic]
    e.dataTransfer.dropEffect = 'copy'
  }

  var dragenterListener = function (e) {
    console.log('dragenter event dropEffect: ' + e.dataTransfer.dropEffect)
    this.style.backgroundColor = '#ccc'
    e.dataTransfer.dropEffect = 'link'
    console.log('dragenter event dropEffect 2: ' + e.dataTransfer.dropEffect)
  }
  var dragleaveListener = function (e) {
    console.log('dragleave event dropEffect: ' + e.dataTransfer.dropEffect)
    this.style.backgroundColor = 'white'
  }

  var dropListener = function (e) {
    if (e.preventDefault) e.preventDefault() // stops the browser from redirecting off to the text.
    console.log('Drop event. dropEffect: ' + e.dataTransfer.dropEffect)
    console.log('Drop event. types: ' + (e.dataTransfer.types ? e.dataTransfer.types.join(', ') : 'NOPE'))

    var uris = null
    var text
    var thisEle = this
    if (e.dataTransfer.types) {
      for (var t = 0; t < e.dataTransfer.types.length; t++) {
        var type = e.dataTransfer.types[t]
        if (type === 'text/uri-list') {
          uris = e.dataTransfer.getData(type).split('\n') // @ ignore those starting with #
          console.log('Dropped text/uri-list: ' + uris)
        } else if (type === 'text/plain') {
          text = e.dataTransfer.getData(type)
        } else if (type === 'Files' && droppedFileHandler) {
          var files = e.dataTransfer.files; // FileList object.
          for (var i = 0, f; f = files[i]; i++) {
            console.log("Filename: " + f.name + ", type: " + (f.type || 'n/a') +
              " size: " + f.size + ' bytes, last modified: ' +
              (f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a')
              );
          }
          droppedFileHandler(files)
        }
      }
      if (uris === null && text && text.slice(0, 4) === 'http') {
        uris = text
        console.log("Waring: Poor man's drop: using text for URI") // chrome disables text/uri-list??
      }
    } else {
      // ... however, if we're IE, we don't have the .types property, so we'll just get the Text value
      uris = [ e.dataTransfer.getData('Text') ]
      console.log('WARNING non-standard drop event: ' + uris[0])
    }
    console.log('Dropped URI list (2): ' + uris)
    if (uris) {
      droppedURIHandler(uris)
    }
    this.style.backgroundColor = 'white' // restore style
    return false
  } // dropListener

  var addTargetListeners = function(ele){
    if (!ele){
      console.log("@@@ addTargetListeners: ele " + ele)
    }
    ele.addEventListener('dragover', dragoverListener)
    ele.addEventListener('dragenter', dragenterListener)
    ele.addEventListener('dragleave', dragleaveListener)
    ele.addEventListener('drop', dropListener)
  }
  addTargetListeners(ele, droppedURIHandler)
} // listen for dropped URIs


// Make an HTML element draggable as a URI-identified thing
//
// Possibly later set the drag image too?
//
function makeDraggable (tr, obj) {

  tr.setAttribute('draggable', 'true') // Stop the image being dragged instead - just the TR

  tr.addEventListener('dragstart', function (e) {
    tr.style.fontWeight = 'bold'
    e.dataTransfer.setData('text/uri-list', obj.uri)
    e.dataTransfer.setData('text/plain', obj.uri)
    e.dataTransfer.setData('text/html', tr.outerHTML)
    console.log('Dragstart: ' + tr + ' -> ' + obj + 'de: ' + e.dataTransfer.dropEffect)
  }, false)

  tr.addEventListener('drag', function (e) {
    e.preventDefault()
    e.stopPropagation()
    // console.log('Drag: dropEffect: ' + e.dataTransfer.dropEffect)
  }, false)

  tr.addEventListener('dragend', function (e) {
    tr.style.fontWeight = 'normal'
    console.log('Dragend dropeffect: ' + e.dataTransfer.dropEffect)
    console.log('Dragend: ' + tr + ' -> ' + obj)
  }, false)
}
