//                  Solid-UI temporary preferences
//                  ==============================
//

// This was tabulator . preferences in the tabulator
//
module.exports = { // used for storing user name
  value: [],
  get: function (k) {
    return this.value[k]
  },
  set: function (k, v) {
    if (typeof v !== 'string') {
      console.log('Non-string value of preference ' + k + ': ' + v)
      throw new Error('Non-string value of preference ' + k + ': ' + v)
    }
    this.value[k] = v
  }
}
// ends
