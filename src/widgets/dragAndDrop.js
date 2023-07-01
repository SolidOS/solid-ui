/* Drag and drop common functionality
 *
 * It is easy to make something draggable, or to make it a drag target!
 * Just call the functions below. In a solid world, any part of the UI which
 * represent one thing which has a URI, should be made draggable using makeDraggable
 * Any list of things should typically allow you to drag new members of the list
 * onto it.
 * The file upload function uploadFiles is provided as often as someone drags a file from the computer
 * desktop, you may want to upload it into the pod.
 */
import * as debug from '../debug'
import * as mime from 'mime-types'
import * as style from '../style'

/* global FileReader alert */

export function makeDropTarget (ele, droppedURIHandler, droppedFileHandler) {
  const dragoverListener = function (e) {
    e.preventDefault() // Need else drop does not work [sic]
    e.dataTransfer.dropEffect = 'copy'
  }

  const dragenterListener = function (e) {
    debug.log('dragenter event dropEffect: ' + e.dataTransfer.dropEffect)
    if (this.localStyle) {
      //  necessary not sure when
      if (!this.savedStyle) {
        this.savedStyle = style.dragEvent
      }
    }

    e.dataTransfer.dropEffect = 'link'
    debug.log('dragenter event dropEffect 2: ' + e.dataTransfer.dropEffect)
  }
  const dragleaveListener = function (e) {
    debug.log('dragleave event dropEffect: ' + e.dataTransfer.dropEffect)
    if (this.savedStyle) {
      this.localStyle = this.savedStyle
    } else {
      this.localStyle = style.dropEvent
    }
  }

  const dropListener = function (e) {
    if (e.preventDefault) e.preventDefault() // stops the browser from redirecting off to the text.
    debug.log('Drop event. dropEffect: ' + e.dataTransfer.dropEffect)
    debug.log(
      'Drop event. types: ' +
        (e.dataTransfer.types ? e.dataTransfer.types.join(', ') : 'NOPE')
    )

    let uris = null
    let text
    if (e.dataTransfer.types) {
      for (let t = 0; t < e.dataTransfer.types.length; t++) {
        const type = e.dataTransfer.types[t]
        if (type === 'text/uri-list') {
          uris = e.dataTransfer.getData(type).split('\n') // @ ignore those starting with #
          debug.log('Dropped text/uri-list: ' + uris)
        } else if (type === 'text/plain') {
          text = e.dataTransfer.getData(type)
        } else if (type === 'Files' && droppedFileHandler) {
          const files = e.dataTransfer.files // FileList object.
          for (let i = 0; files[i]; i++) {
            const f = files[i]
            debug.log(
              'Filename: ' +
                f.name +
                ', type: ' +
                (f.type || 'n/a') +
                ' size: ' +
                f.size +
                ' bytes, last modified: ' +
                (f.lastModifiedDate
                  ? f.lastModifiedDate.toLocaleDateString()
                  : 'n/a')
            )
          }
          droppedFileHandler(files)
        }
      }
      if (uris === null && text && text.slice(0, 4) === 'http') {
        uris = text
        debug.log("Waring: Poor man's drop: using text for URI") // chrome disables text/uri-list??
      }
    } else {
      // ... however, if we're IE, we don't have the .types property, so we'll just get the Text value
      uris = [e.dataTransfer.getData('Text')]
      debug.log('WARNING non-standard drop event: ' + uris[0])
    }
    debug.log('Dropped URI list (2): ' + uris)
    if (uris) {
      droppedURIHandler(uris)
    }
    this.localStyle = style.restoreStyle // restore style
    return false
  } // dropListener

  const addTargetListeners = function (ele) {
    if (!ele) {
      debug.log('@@@ addTargetListeners: ele ' + ele)
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
export function makeDraggable (tr, obj) {
  tr.setAttribute('draggable', 'true') // Stop the image being dragged instead - just the TR

  tr.addEventListener(
    'dragstart',
    function (e) {
      tr.style.fontWeight = 'bold'
      e.dataTransfer.setData('text/uri-list', obj.uri)
      e.dataTransfer.setData('text/plain', obj.uri)
      e.dataTransfer.setData('text/html', tr.outerHTML)
      debug.log(
        'Dragstart: ' + tr + ' -> ' + obj + 'de: ' + e.dataTransfer.dropEffect
      )
    },
    false
  )

  tr.addEventListener(
    'drag',
    function (e) {
      e.preventDefault()
      e.stopPropagation()
      // debug.log('Drag: dropEffect: ' + e.dataTransfer.dropEffect)
    },
    false
  )

  tr.addEventListener(
    'dragend',
    function (e) {
      tr.style.fontWeight = 'normal'
      debug.log('Dragend dropeffect: ' + e.dataTransfer.dropEffect)
      debug.log('Dragend: ' + tr + ' -> ' + obj)
    },
    false
  )
}

/** uploadFiles
**
**  Generic uploader of local files to the web
**   typically called from dropped file handler
**
**  @param {Fetcher} fetcher    instance of class Fetcher as in kb.fetcher
**  @param {Array<File>} files      Array of file objects
**  @param {String} fileBase    URI of folder in which to put files (except images) (no trailing slash)
**  @param {String } imageBase  URI of folder in which to put images
**  @param successHandler function(file, uploadedURI)    Called after EACH success upload
**                              With file object an final URI as params
*/

export function uploadFiles (fetcher, files, fileBase, imageBase, successHandler) {
  for (let i = 0; files[i]; i++) {
    const f = files[i]
    debug.log(
      ' dropped: Filename: ' +
        f.name +
        ', type: ' +
        (f.type || 'n/a') +
        ' size: ' +
        f.size +
        ' bytes, last modified: ' +
        (f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a')
    ) // See e.g. https://www.html5rocks.com/en/tutorials/file/dndfiles/

    // @@ Add: progress bar(s)
    const reader = new FileReader()
    reader.onload = (function (theFile) {
      return function (e) {
        const data = e.target.result
        let suffix = ''
        debug.log(' File read byteLength : ' + data.byteLength)
        let contentType = theFile.type
        if (!theFile.type || theFile.type === '') {
          // Not known by browser
          contentType = mime.lookup(theFile.name)
          if (!contentType) {
            const msg =
              'Filename needs to have an extension which gives a type we know: ' +
              theFile.name
            debug.log(msg)
            alert(msg)
            throw new Error(msg)
          }
        } else {
          const extension = mime.extension(theFile.type)
          // Note not simple: eg .mp3 => audio/mpeg; .mpga => audio/mpeg; audio/mp3 => .mp3
          if (extension && extension !== 'false' && !theFile.name.endsWith('.' + extension) && // Not already has preferred extension? and ...
            theFile.type !== mime.lookup(theFile.name)) { // the mime type of this ext is not the right one?
            suffix = '_.' + extension
            // console.log('MIME TYPE MISMATCH: ' + mime.lookup(theFile.name) + ': adding extension: ' + suffix)
          }
        }
        const folderName = theFile.type.startsWith('image/')
          ? imageBase || fileBase
          : fileBase
        const destURI =
          folderName +
          (folderName.endsWith('/') ? '' : '/') +
          encodeURIComponent(theFile.name) +
          suffix

        fetcher
          .webOperation('PUT', destURI, {
            data,
            contentType
          })
          .then(
            _response => {
              debug.log(' Upload: put OK: ' + destURI)
              successHandler(theFile, destURI)
            },
            error => {
              const msg = ' Upload: FAIL ' + destURI + ', Error: ' + error
              debug.log(msg)
              alert(msg)
              throw new Error(msg)
            }
          )
      }
    })(f)
    reader.readAsArrayBuffer(f)
  }
}
