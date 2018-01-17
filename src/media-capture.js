
/// /////////////////////////////////////////////
//
//   Media input widget
//
//  In future this will be really simple to do when
// the HTML5 input "image capture" input element is actually deployed
// In the meantime (2017-01) this seems to be the state of the art.
//
// Workflow:
// The HTML5 functionality (on mobille) is to prompt for either
// a realtime camera capture , OR a selection from images already ont the device
// (eg camera roll). The solid alternative is to either take a phtoto
// or access cemra roll (etc) OR to access solid cloud storage of favorite photo almbums.
// (Especially latest taken ones)
//
/* global alert */
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

//  Put up a video stream and take a picture
//  In: context.div, dom

UI.media.camera = function (context, gotBlob) {
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
