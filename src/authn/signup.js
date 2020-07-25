var defaultConfig = require('./config-default')

/**
 * Provides functionality for signing up with a Solid provider
 * @module signup
 */

/**
 * Creates a Signup UI manager
 * @class
 */
function Signup (config) {
  this.config = config || defaultConfig
}

/**
 * Sets up an event listener to monitor login messages from child window/iframe
 * @method listen
 * @return {Promise<String>} Event listener promise, resolves to user's WebID
 */
Signup.prototype.listen = function listen () {
  var promise = new Promise(function (resolve, reject) {
    var eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent'
    var eventListener = window[eventMethod]
    var messageEvent = eventMethod === 'attachEvent'
      ? 'onmessage'
      : 'message'
    eventListener(messageEvent, function (e) {
      var u = e.data
      if (u.slice(0, 5) === 'User:') {
        var user = u.slice(5, u.length)
        if (user && user.length > 0 && user.slice(0, 4) === 'http') {
          return resolve(user)
        } else {
          return reject(user)
        }
      }
    }, true)
  })
  return promise
}

/**
 * Opens a signup popup window, sets up `listen()`.
 * @method signup
 * @static
 * @param signupUrl {String} Location of a Solid server for user signup.
 * @return {Promise<String>} Returns a listener promise, resolves with signed
 *   up user's WebID.
 */
Signup.prototype.signup = function signup (signupUrl) {
  signupUrl = signupUrl || this.config.signupEndpoint
  var width = this.config.signupWindowWidth
  var height = this.config.signupWindowHeight
  // set borders
  var leftPosition = (window.screen.width / 2) - ((width / 2) + 10)
  // set title and status bars
  var topPosition = (window.screen.height / 2) - ((height / 2) + 50)
  var windowTitle = 'Solid signup'
  var windowUrl = signupUrl + '?origin=' +
    encodeURIComponent(window.location.origin)
  var windowSpecs = 'resizable,scrollbars,status,width=' + width + ',height=' +
    height + ',left=' + leftPosition + ',top=' + topPosition
  window.open(windowUrl, windowTitle, windowSpecs)
  var self = this
  return new Promise(function (resolve) {
    self.listen()
      .then(function (webid) {
        return resolve(webid)
      })
  })
}

module.exports = Signup
