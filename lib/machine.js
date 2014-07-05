var StateMachine

StateMachine = function StateMachine (def) {
  this._initial = def.initial
  this._table = this._createTable(def.transitions)
  this._accept = def.accept
}

StateMachine.prototype._createTable = function _createTable (transitions) {
  var states = Object.keys(transitions)
    , i = 0
    , ii = states.length
    , j = 0
    , jj = 0
    , chr = ''
      // char is the column, state is the row
    , fastTable = new Array(ii)

  fastTable = new Array(ii)

  for(; i<ii; ++i) {
    fastTable[i] = {}

    for(j=0, jj=transitions[i].length; j<jj; j+=2) {
      chr = transitions[i][j]

      fastTable[i][chr] = transitions[i][j + 1]
    }
  }

  return fastTable
}

StateMachine.prototype.accepts = function exec (input) {
  var i = 0
    , ii = input.length
    , result = 0

  this._state = this._initial

  for(; i<ii; ++i) {
    result = this._table[this._state][input.charAt(i)]

    if(result === undefined) {
      return false
    }
    else {
      this._state = result
    }
  }

  return this._accept.indexOf(this._state) >= 0
}

module.exports = StateMachine
