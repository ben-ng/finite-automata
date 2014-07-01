var StateMachine
  , nfa2dfa = require('./nfa2dfa')

StateMachine = function StateMachine (fragment) {
  var dfa = nfa2dfa(fragment)
    , tableDesc = this._createTable(dfa.transitions)
    , i = 0
    , ii = dfa.accept.length

  this._stateMap = tableDesc[0]
  this._table = tableDesc[1]
  this._initial = this._stateMap[dfa.initial]
  this._accept = []

  for(; i<ii; ++i) {
    this._accept.push(this._stateMap[dfa.accept[i]])
  }
}

StateMachine.prototype._createTable = function _createTable (transitions) {
  var states = Object.keys(transitions).sort()
    , i = 0
    , ii = states.length
    , j = 0
    , jj = 0
    , state = ''
    , chr = ''
      // char is the column, state is the row
    , fastTable = {}
    , stateMap = {}

  // Add all states to the map
  for(; i<ii; ++i) {
    stateMap[states[i]] = i
  }

  fastTable = new Array(states.length)

  for(state in transitions) {
    if(fastTable[stateMap[state]] == null) {
      fastTable[stateMap[state]] = {}
    }

    for(j=0, jj=transitions[state].length; j<jj; j+=2) {
      chr = transitions[state][j]

      fastTable[stateMap[state]][chr] = stateMap[transitions[state][j + 1]]
    }
  }

  return [stateMap, fastTable]
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
