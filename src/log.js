// Log of diagnostics -- node module version

var wrapper = function () {
  var logger = {}

  // ///////////////////////  Logging
  //
  // bitmask levels
  var TNONE = 0
  var TERROR = 1
  var TWARN = 2
  var TMESG = 4
  var TSUCCESS = 8
  var TINFO = 16
  var TDEBUG = 32
  var TALL = 63

  logger.level = TERROR + TWARN + TMESG
  logger.ascending = false

  logger.msg = function (str, type, typestr) {
    if (!type) {
      type = TMESG
      typestr = 'mesg'
    }

    if (!(logger.level & type)) return // bitmask

    if (typeof document !== 'undefined') {
// Not AJAX environment

      var logArea = document.getElementById('status')
      if (!logArea) return

      // Local version to reduce dependencies
      var escapeForXML = function (str) { // don't use library one in case ithasn't been loaded yet
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;')
      }

      var addendum = document.createElement('span')
      addendum.setAttribute('class', typestr)
      var now = new Date()
      addendum.innerHTML = now.getHours() + ':' + now.getMinutes() + ':' +
        now.getSeconds() + ' [' + typestr + '] ' + escapeForXML(str) + '<br/>'
      if (!logger.ascending) {
        logArea.appendChild(addendum)
      } else {
        logArea.insertBefore(addendum, logArea.firstChild)
      }
    } else if (typeof console !== 'undefined') { // node.js
      console.log(str)
    } else {
      var f = dump // || print
      if (!f) throw new Error('log: No way to output message: ' + str)
      f('Log: ' + str + '\n')
    }
  } // logger.msg

  logger.warn = function (msg) { logger.msg(msg, TWARN, 'warn') }
  logger.debug = function (msg) { logger.msg(msg, TDEBUG, 'dbug') }
  logger.info = function (msg) { logger.msg(msg, TINFO, 'info') }
  logger.error = function (msg) { logger.msg(msg, TERROR, 'eror') }
  logger.success = function (msg) { logger.msg(msg, TSUCCESS, 'good') }

  if (typeof alert !== 'undefined') {
    logger.alert = alert
  } else {
    logger.alert = logger.warn
  }

  /** clear the log window **/
  logger.clear = function () {
    var x = document.getElementById('status')
    if (!x) return
    x.innerHTML = ''
    // emptyNode(x);
  } // clearStatus

  /** set the logging level **/
  logger.setLevel = function (x) {
    logger.level = TALL
    logger.debug('Log level is now ' + x)
    logger.level = x
  }

  logger.dumpHTML = function () {
    var l = logger.level
    logger.level = TALL
    logger.debug(document.innerHTML)
    logger.level = l
  }
  return logger
}// wrapper

module.exports = wrapper()
