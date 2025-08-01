"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cameraButton = cameraButton;
exports.cameraCaptureControl = cameraCaptureControl;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var debug = _interopRequireWildcard(require("../debug"));
var _iconBase = require("../iconBase");
var style = _interopRequireWildcard(require("../style"));
var widgets = _interopRequireWildcard(require("../widgets"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
//
//   Media input widget
//
//
// Workflow:
// The HTML5 functionality (on mobile) is to prompt for either
// a realtime camera capture, OR a selection from images already on the device
// (eg camera roll).
//
// The solid alternative is to either take a photo
// or access camera roll (etc) OR to access solid cloud storage of favorite photo albums.
// (Especially latest taken ones)
//

/** @module mediaCapture */

var cameraIcon = _iconBase.icons.iconBase + 'noun_Camera_1618446_000000.svg'; // Get it from github
var retakeIcon = _iconBase.icons.iconBase + 'noun_479395.svg'; // Get it from github

var contentType = 'image/png';

/** A control to capture a picture using camera
 * @param {Docuemnt} dom - The Document object
 * @param {IndexedForumla} store - The quadstore to store data in
 * @param {NamedNode} getImageDoc() - NN of the image file to be created
 * @param {function} doneCallback - Called when a picture has been taken
 */
function cameraCaptureControl(dom, store, getImageDoc, doneCallback) {
  var div = dom.createElement('div');
  var destination, imageBlob, player, canvas;
  var table = div.appendChild(dom.createElement('table'));
  var mainTR = table.appendChild(dom.createElement('tr'));
  var main = mainTR.appendChild(dom.createElement('td'));
  main.setAttribute('colspan', '4');
  var buttons = table.appendChild(dom.createElement('tr'));
  buttons.appendChild(dom.createElement('td')) // Cancel button
  .appendChild(widgets.cancelButton(dom)).addEventListener('click', function (_event) {
    stopVideo();
    doneCallback(null);
  });
  var retakeButton = buttons.appendChild(dom.createElement('td')) // Retake button
  .appendChild(widgets.button(dom, retakeIcon, 'Retake'));
  retakeButton.addEventListener('click', function (_event) {
    retake();
  });
  retakeButton.style.visibility = 'collapse'; // Hide for now

  var shutterButton = buttons.appendChild(dom.createElement('td')) // Trigger capture button
  .appendChild(widgets.button(dom, _iconBase.icons.iconBase + 'noun_10636.svg', 'Snap'));
  shutterButton.addEventListener('click', grabCanvas);
  shutterButton.style.visibility = 'collapse'; // Hide for now

  var sendButton = buttons.appendChild(dom.createElement('td')) // Confirm and save button
  .appendChild(widgets.continueButton(dom)); // @@ or send icon??
  sendButton.addEventListener('click', function (_event) {
    saveBlob(imageBlob, destination);
  });
  sendButton.style.visibility = 'collapse'; // Hide for now

  function displayPlayer() {
    player = main.appendChild(dom.createElement('video'));
    player.setAttribute('controls', '1');
    player.setAttribute('autoplay', '1');
    player.setAttribute('style', style.controlStyle);
    if (!navigator.mediaDevices) {
      throw new Error('navigator.mediaDevices not available');
    }
    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      player.srcObject = stream;
      shutterButton.style.visibility = 'visible'; // Enable
      sendButton.style.visibility = 'collapse';
      retakeButton.style.visibility = 'collapse';
    });
  }
  var constraints = {
    video: true
  };
  function retake() {
    main.removeChild(canvas);
    displayPlayer(); // Make new one as old one is stuck black
  }
  function grabCanvas() {
    // Draw the video frame to the canvas.
    canvas = dom.createElement('canvas');
    canvas.setAttribute('width', style.canvasWidth);
    canvas.setAttribute('height', style.canvasHeight);
    canvas.setAttribute('style', style.controlStyle);
    main.appendChild(canvas);
    var context = canvas.getContext('2d');
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    player.parentNode.removeChild(player);
    canvas.toBlob(function (blob) {
      var msg = "got blob type ".concat(blob.type, " size ").concat(blob.size);
      debug.log(msg);
      destination = getImageDoc();
      imageBlob = blob; // save for review
      reviewImage();
      // alert(msg)
    }, contentType); // toBlob
  }
  function reviewImage() {
    sendButton.style.visibility = 'visible';
    retakeButton.style.visibility = 'visible';
    shutterButton.style.visibility = 'collapse'; // Hide for now
  }
  function stopVideo() {
    if (player && player.srcObject) {
      player.srcObject.getVideoTracks().forEach(function (track) {
        return track.stop();
      });
    }
  }
  function saveBlob(blob, destination) {
    var contentType = blob.type;
    // if (!confirm('Save picture to ' + destination + ' ?')) return
    debug.log('Putting ' + blob.size + ' bytes of ' + contentType + ' to ' + destination)
    // @@ TODO Remove casting
    ;
    store.fetcher.webOperation('PUT', destination.uri, {
      data: blob,
      contentType: contentType
    }).then(function (_resp) {
      debug.log('ok saved ' + destination);
      stopVideo();
      doneCallback(destination);
    }, function (err) {
      stopVideo();
      alert(err);
    });
  }

  // Attach the video stream to the video element and autoplay.
  displayPlayer();
  return div;
}

/** A button to capture a picture using camera
 * @param {Docuemnt} dom - The Document object
 * @param {IndexedForumla} store - The quadstore to store data in
 * @param {fuunction} getImageDoc - returns NN of the image file to be created
 * @param {function<Node>} doneCallback - called with the image taken
 * @returns {DomElement} - A div element with the button in it
 *
 * This expands the button to a large control when it is pressed
 */

function cameraButton(dom, store, getImageDoc, doneCallback) {
  var div = dom.createElement('div');
  var but = widgets.button(dom, cameraIcon, 'Take picture');
  var control;
  function restoreButton(_x) {
    return _restoreButton.apply(this, arguments);
  }
  function _restoreButton() {
    _restoreButton = (0, _asyncToGenerator2["default"])(/*#__PURE__*/_regenerator["default"].mark(function _callee(imageDoc) {
      return _regenerator["default"].wrap(function (_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            div.removeChild(control);
            div.appendChild(but);
            doneCallback(imageDoc);
          case 1:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return _restoreButton.apply(this, arguments);
  }
  div.appendChild(but);
  but.addEventListener('click', function (_event) {
    div.removeChild(but);
    control = cameraCaptureControl(dom, store, getImageDoc, restoreButton);
    div.appendChild(control);
  });
  return div;
}
//# sourceMappingURL=media-capture.js.map