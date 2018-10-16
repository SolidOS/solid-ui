
/// /////////////////////////////////////////////
//
//   Media input widget
//
//
// Workflow:
// The HTML5 functionality (on mobille) is to prompt for either
// a realtime camera capture , OR a selection from images already ont the device
// (eg camera roll). The solid alternative is to either take a phtoto
// or access cemra roll (etc) OR to access solid cloud storage of favorite photo almbums.
// (Especially latest taken ones)
//
/* global alert confirm */

/** @module mediaCapture */

var $rdf = require('rdflib')
var media = module.exports = {}

var UI = {
  icons: require('./iconBase'),
  log: require('./log'),
  ns: require('./ns'),
  pad: require('./pad'),
  media: media,
  rdf: $rdf,
  store: require('./store'),
  utils: require('./utils'),
  widgets: require('./widgets')
}

/** A control to capture a picture using camera
 * @param {Docuemnt} dom - The Document object
 * @param {IndexedForumla} store - The quadstore to store data in
 * @param {NamedNode} destination - NN of the image file to be created
 * @param {function} doneCallback - Called when a picture has been taken
 */
function cameraCaptureControl (dom, store, destination, doneCallback) {
  const div = dom.createElement('div')
  const player = div.appendChild(dom.createElement('video'))
  const controlStyle = 'border-radius: 0.5em; margin: 0.8em; width: 320; height:240;'
  const contentType = 'image/png'
  // player.setAttribute('controls', '1')
  player.setAttribute('autoplay', '1')
  const button = div.appendChild(dom.createElement('button'))
  button.textContent = 'Capture'
  player.setAttribute('style', controlStyle)
  var canvas

  const constraints = {
    video: true
  }

  function grabCanvas () {
    // Draw the video frame to the canvas.
    canvas = dom.createElement('canvas')
    canvas.setAttribute('width', '320')
    canvas.setAttribute('height', '240')
    canvas.setAttribute('style', controlStyle)
    player.parentNode.appendChild(canvas)

    const context = canvas.getContext('2d')
    context.drawImage(player, 0, 0, canvas.width, canvas.height)

    // Stop all video streams.
    player.srcObject.getVideoTracks().forEach(track => track.stop())
    player.parentNode.removeChild(player)

    canvas.toBlob(blob => {
      let msg = `got blob type ${blob.type} size ${blob.size}`
      console.log(msg)
      saveBlob(blob, destination)
      alert(msg)
    }, contentType) // toBlob
  }

  function saveBlob (blob, destination) {
    let contentType = blob.type
    if (!confirm('Save picture to ' + destination + ' ?')) return
    console.log('Putting ' + blob.size + ' bytes of ' + contentType + ' to ' + destination)
    store.fetcher.webOperation('PUT', destination.uri, {data: blob, contentType: contentType}).then(resp => {
      console.log('ok saved ' + destination)
      alert('saved ok: ' + destination)
    }, err => {
      alert(err)
    })
  }

  button.addEventListener('click', grabCanvas)

  // Attach the video stream to the video element and autoplay.
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      player.srcObject = stream
    })
  return div
}

/** A button to capture a picture using camera
 * @param {Docuemnt} dom - The Document object
 * @param {IndexedForumla} store - The quadstore to store data in
 * @param {NamedNode} destination - NN of the image file to be created
 * @returns {DomElement} - A div element with the buton in it
 *
 * This expacts the buttton to a large control when it is pressed
 */
function cameraButton (dom, store, destination) {
  const div = dom.createElement('div')
  const but = UI.widgets.button(dom, UI.icons.iconBase + 'noun_383448.svg', 'Take picture')
  var control
  function restoreButton () {
    div.removeChild(control)
    div.appendChild(but)
  }
  div.appendChild(but)
  but.addEventListener('click', event => {
    div.removeChild(but)
    control = control || cameraCaptureControl(dom, store, destination, restoreButton)
    div.appendChild(control)
  })
  return div
}

media.cameraButton = cameraButton
media.cameraCaptureControl = cameraCaptureControl

/// /////////////////////////////////////// OLD BROKEN

//  Put up a video stream and take a picture
//  In: context.div, dom

UI.media.cameraOLD = function (context, gotBlob) {
  function takeSnapshot () {
    var dom = context.dom
    var img = dom.createElement('img')
    var ctx
    var width = video.offsetWidth
    var height = video.offsetHeight

    var canvas = context.canvas || document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, width, height)

    img.src = canvas.toDataURL('image/png') // @@@
    context.div.appendChild(img)
  }

  var video = context.dom.createElement('video')
  context.div.appendChild(video)
  // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
  navigator.mediaDevices.getUserMedia({video: true})
  .then(function (stream) {
    video.src = window.URL.createObjectURL(stream)
    video.addEventListener('click', takeSnapshot)
  })
  .catch(function (error) {
    alert('Could not access the camera. Error: ' + error.name)
  })
  return video
}
