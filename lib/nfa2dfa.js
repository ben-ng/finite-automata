var Fragment = require('./Fragment')

function nfa2dfa (fragment, delimiter) {

  if(delimiter == null) {
    // Just some obscure char that looks like a pipe
    delimiter = String.fromCharCode(3193)
  }

  /**
  * Returns the closure of the state.
  * This means all states reachable via epsilon-transitions
  *
  * State is singular but actually an array of states
  * because the subset construction creates states
  * that are the union of other states
  */
  function closureOf (state) {
    var i = 0
      , ii = 0
      , j = 0
      , jj = 0
      , trans
      , closure = [].concat(state)
      , discoveredStates

    while(true) {
      discoveredStates = []

      for(i=0, ii=closure.length; i<ii; ++i) {
        trans = fragment.transitions[closure[i]]
        for(j=0, jj=trans.length; j<jj; j += 2) {
          // Match epsilon transitions
          if(trans[j] == '\0') {
            // Push destination state to output
            if(closure.indexOf(trans[j + 1]) < 0) {
              discoveredStates.push(trans[j + 1])
            }
          }
        }
      }

      if(discoveredStates.length === 0) {
        break
      }
      else {
        closure.push.apply(closure, discoveredStates)
      }

      discoveredStates = []
    }

    // This makes it possible to do a deep compare on macrostates quickly
    return closure.sort()
  }

  /**
  * State is singular but actually an array of states
  * because the subset construction creates states
  * that are the union of other states
  */
  function goesTo (state, chr) {
    var output = []
      , i = 0
      , ii = state.length
      , j = 0
      , jj = 0
      , trans

    for(; i<ii; ++i) {
      trans = fragment.transitions[state[i]]

      for(j=0, jj=trans.length; j<jj; j += 2) {
        if(trans[j] == chr) {
          // Push destination state onto output
          output.push(trans[j + 1])
        }
      }
    }

    return closureOf(output)
  }

  /**
  * Returns the characters that allow
  * a transition out of the state
  */
  function exits (state) {
    var chars = []
      , i = 0
      , ii = state.length
      , j = 0
      , jj = 0
      , trans

    for(; i<ii; ++i) {
      trans = fragment.transitions[state[i]]

      for(j=0, jj=trans.length; j<jj; j += 2) {
        if(trans[j] != '\0' && chars.indexOf(trans[j]) < 0) {
          chars.push(trans[j])
        }
      }
    }

    return chars
  }

  // Start algorithm by computing the closure of state 0
  var processStack = [closureOf([fragment.initial])]
    , initalStateKey = processStack[0].join(delimiter)
    , current = []
    , exitChars = []
    , i = 0
    , ii = 0
    , j = 0
    , jj = 0
    , discoveredState
    , currentStateKey = ''
    , discoveredStateKey = ''
    , transitionTable = {}
    , acceptStates = []

  // Build the transition table
  while(processStack.length > 0) {
    current = processStack.pop()
    currentStateKey = current.join(delimiter)
    transitionTable[currentStateKey] = []

    // Get all characters leaving this state
    exitChars = exits(current)

    // Run goTo on each character
    for(i=0, ii=exitChars.length; i<ii; ++i) {
      discoveredState = goesTo(current, exitChars[i])
      discoveredStateKey = discoveredState.join(delimiter)

      if(!transitionTable[discoveredStateKey] && discoveredStateKey != currentStateKey) {
        processStack.push(discoveredState)
      }

      // A macrostate is an accept state if it contains any accept microstate
      for(j=0, jj=discoveredState.length; j<jj; ++j) {
        if(fragment.accept.indexOf(discoveredState[j]) >= 0 &&
          acceptStates.indexOf(discoveredStateKey) < 0) {
          acceptStates.push(discoveredStateKey)
        }
      }

      transitionTable[currentStateKey].push(exitChars[i], discoveredStateKey)
    }
  }

  // Return the new fragment
  return new Fragment({
    initial: initalStateKey
  , accept: acceptStates
  , transitions: transitionTable
  })
}

module.exports = nfa2dfa
