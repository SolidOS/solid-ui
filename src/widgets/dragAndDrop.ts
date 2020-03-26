/* Drag and drop common functionality
 */
import { log } from '../debug'

const mime = require('mime-types')

// const UI = require('../index.js') // this package
/**
 * @ignore
 */
class FileObject extends File {
  lastModifiedDate?: Date
}
export function makeDropTarget (ele: HTMLElement, droppedURIHandler: any, droppedFileHandler: any) {
  const dragoverListener = function (e: DragEvent) {
    e.preventDefault() // Neeed else drop does not work [sic]
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy'
    }
  }

  const dragenterListener = function (this: any, e: DragEvent) {
    if (e.dataTransfer) {
      log('dragenter event dropEffect: ' + e.dataTransfer.dropEffect)
    }
    if (this.style) {
      //  necessary not sure when
      if (!this.savedStyle) {
        this.savedStyle = {}
        this.savedStyle.border = this.style.border
        this.savedStyle.backgroundColor = this.style.backgroundColor
        this.savedStyle.borderRadius = this.style.borderRadius
      }
      this.style.backgroundColor = '#ccc'
      this.style.border = '0.25em dashed black'
      this.style.borderRadius = '0.3em'
    }
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'link'
      log('dragenter event dropEffect 2: ' + e.dataTransfer.dropEffect)
    }
  }
  const dragleaveListener = function (this: any, e: DragEvent) {
    if (e.dataTransfer) {
      log('dragleave event dropEffect: ' + e.dataTransfer.dropEffect)
    }
    if (this.savedStyle) {
      this.style.border = this.savedStyle.border
      this.style.backgroundColor = this.savedStyle.backgroundColor
      this.style.borderRadius = this.savedStyle.borderRadius
    } else {
      this.style.backgroundColor = 'white'
      this.style.border = '0em solid black'
    }
  }

  const dropListener = function (this: any, e: DragEvent) {
    if (e.preventDefault) e.preventDefault() // stops the browser from redirecting off to the text.
    if (e.dataTransfer) {
      log('Drop event. dropEffect: ' + e.dataTransfer.dropEffect)
      log(
        'Drop event. types: ' +
        (e.dataTransfer.types ? e.dataTransfer.types.join(', ') : 'NOPE')
      )

      let uris: string[] | null = null
      let text

      if (e.dataTransfer.types) {
        for (let t = 0; t < e.dataTransfer.types.length; t++) {
          const type = e.dataTransfer.types[t]
          if (type === 'text/uri-list') {
            uris = e.dataTransfer.getData(type).split('\n') // @ ignore those starting with #
            log('Dropped text/uri-list: ' + uris)
          } else if (type === 'text/plain') {
            text = e.dataTransfer.getData(type)
          } else if (type === 'Files' && droppedFileHandler) {
            const files = e.dataTransfer.files // FileList object.
            for (let i = 0; files[i]; i++) {
              const f: any = files[i]
              log(
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
          log("Waring: Poor man's drop: using text for URI") // chrome disables text/uri-list??
        }
      } else {
        // ... however, if we're IE, we don't have the .types property, so we'll just get the Text value
        uris = [e.dataTransfer.getData('Text')]
        log('WARNING non-standard drop event: ' + uris[0])
      }
      log('Dropped URI list (2): ' + uris)
      if (uris) {
        droppedURIHandler(uris)
      }
      this.style.backgroundColor = 'white' // restore style
      return false
    } // e.dataTransfer not null
  } // dropListener

  const addTargetListeners = function (ele: HTMLElement) {
    if (!ele) {
      log('@@@ addTargetListeners: ele ' + ele)
    }
    ele.addEventListener('dragover', dragoverListener)
    ele.addEventListener('dragenter', dragenterListener)
    ele.addEventListener('dragleave', dragleaveListener)
    ele.addEventListener('drop', dropListener)
  }
  // addTargetListeners(ele, droppedURIHandler)
  addTargetListeners(ele)
} // listen for dropped URIs

// Make an HTML element draggable as a URI-identified thing
//
// Possibly later set the drag image too?
//
export function makeDraggable (tr: HTMLTableRowElement, obj: any) {
  tr.setAttribute('draggable', 'true') // Stop the image being dragged instead - just the TR

  tr.addEventListener(
    'dragstart',
    function (e) {
      tr.style.fontWeight = 'bold'
      if (e.dataTransfer) {
        e.dataTransfer.setData('text/uri-list', obj.uri)
        e.dataTransfer.setData('text/plain', obj.uri)
        e.dataTransfer.setData('text/html', tr.outerHTML)
        log(
          'Dragstart: ' + tr + ' -> ' + obj + 'de: ' + e.dataTransfer.dropEffect
        )
      }
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
      if (e.dataTransfer) {
        log('Dragend dropeffect: ' + e.dataTransfer.dropEffect)
        log('Dragend: ' + tr + ' -> ' + obj)
      }
    },
    false
  )
}

/* uploadFiles
 **
 **  Generic uploader of local files to the web
 **   typically called from dropped file handler
 ** Params
 **  fetcher   instance of class Fetcher as in kb.fetcher
 **  files      Array of file objects
 **  fileBase   URI of folder in which to put files (except images) (no trailing slash)
 **  imageBase  URI of folder in which to put images
 **  successHandler(file, uploadedURI)    Called after each success upload
 **                              With file object an final URI as params
 */
export function uploadFiles (fetcher: any, files: any, fileBase: string, imageBase: string, successHandler: any) {
  for (let i = 0; files[i]; i++) {
    const f: FileObject = files[i]
    log(
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
        log(' File read byteLength : ' + data.byteLength)
        let contentType = theFile.type
        if (!theFile.type || theFile.type === '') {
          // Not known by browser
          contentType = mime.lookup(theFile.name)
          if (!contentType) {
            const msg =
              'Filename needs to have an extension which gives a type we know: ' +
              theFile.name
            log(msg)
            alert(msg)
            throw new Error(msg)
          }
        } else {
          const extension = mime.extension(theFile.type)
          if (theFile.type !== mime.lookup(theFile.name)) {
            suffix = '_.' + extension
            log('MIME TYPE MISMATCH -- adding extension: ' + suffix)
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
            data: data,
            contentType: contentType
          })
          .then(
            _response => {
              log(' Upload: put OK: ' + destURI)
              successHandler(theFile, destURI)
            },
            error => {
              const msg = ' Upload: FAIL ' + destURI + ', Error: ' + error
              log(msg)
              alert(msg)
              throw new Error(msg)
            }
          )
      }
    })(f)
    reader.readAsArrayBuffer(f)
  }
}
