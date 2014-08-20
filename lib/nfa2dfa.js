function nfa2dfa (frag, delimiter) {

  if(delimiter == null) {
    // Just some obscure char that looks like a pipe
    delimiter = String.fromCharCode(3193)
  }

  // If delimiter is in any of the states, fail
  for(var k in frag.transitions) {
    if(k.indexOf(delimiter) > -1) {
      return new Error('Delimiter "' + delimiter + '" collision in state "' + k + '"')
    }
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
        trans = frag.transitions[closure[i]]
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

    // console.log('Closure Of ' + state + ': ' + closure.sort())

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
      , dest

    for(; i<ii; ++i) {
      trans = frag.transitions[state[i]]

      for(j=0, jj=trans.length; j<jj; j += 2) {
        if(trans[j] == chr) {
          dest = trans[j + 1]
          // Push destination state onto output if it is new
          if(output.indexOf(dest) < 0) {
            output.push(dest)
          }
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
      trans = frag.transitions[state[i]]

      for(j=0, jj=trans.length; j<jj; j += 2) {
        if(trans[j] != '\0' && chars.indexOf(trans[j]) < 0) {
          chars.push(trans[j])
        }
      }
    }

    return chars
  }

  // Start algorithm by computing the closure of state 0
  var processStack = [closureOf([frag.initial])]
    , initialStateKey = processStack[0].join(delimiter)
    , current = []
    , exitChars = []
    , i = 0
    , ii = 0
    , j = 0
    , jj = 0
    , replacement
    , transitions
    , discoveredState
    , currentStateKey = ''
    , discoveredStateKey = ''
    , transitionTable = {}
    , newTransitionTable = {}
    , replacementMap = {}
    , inverseReplacementMap = {}
    , acceptStates = []
    , tempAcceptStates = []
    , collisionMap = {}
    , aliasMap = {}

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
        if(frag.accept.indexOf(discoveredState[j]) >= 0 &&
          acceptStates.indexOf(discoveredStateKey) < 0) {
          acceptStates.push(discoveredStateKey)
        }
      }

      transitionTable[currentStateKey].push(exitChars[i], discoveredStateKey)
    }
  }

  /*
   * At this point we actually have a correct DFA, and the rest of this logic is just cleaning up
   * the compound states into something more human readable
   */

  /*
  * If a macrostate contains only one originally accepted state
  * then we should replace its name with the name of that state
  * so that the labels make sense
  */
  for(k in transitionTable) {
    // Build an array of states in this macrostate that are accept states
    var states = k.split(delimiter)
      , accepted = []

    for(i=0, ii=states.length; i<ii; ++i) {
      if(frag.accept.indexOf(states[i]) > -1) {
        accepted.push(states[i])
      }
    }

    // This macrostate only has one accepted state
    if(accepted.length === 1) {
      accepted = accepted[0]
      // Check for a collision
      if(collisionMap[accepted] != null) {
        delete replacementMap[collisionMap[accepted]]
      }
      else {
        replacementMap[k] = accepted
        collisionMap[accepted] = k
      }
    }
  }

  // At this point, replacementMap is {findstate: replacementstate}

  // Go on and replace findstate with replacementstate everywhere in the DFA

  replacement = replacementMap[initialStateKey]

  if(replacement != null) {
    initialStateKey = replacement
  }

  for(k in transitionTable) {
    transitions = transitionTable[k]

    for(j=1, jj=transitions.length; j<jj; j+=2) {
      replacement = replacementMap[transitions[j]]

      if(replacement != null) {
        transitions[j] = replacement
      }
    }

    replacement = replacementMap[k]

    if(replacement != null) {
      newTransitionTable[replacement] = transitions
    }
    else {
      newTransitionTable[k] = transitions
    }
  }

  for(j=0, jj=acceptStates.length; j<jj; ++j) {
    replacement = replacementMap[acceptStates[j]]
    if(replacement != null) {
      if(tempAcceptStates.indexOf(replacement) < 0) {
        tempAcceptStates.push(replacement)
      }
    }
    else if(tempAcceptStates.indexOf(acceptStates[j]) < 0) {
      tempAcceptStates.push(acceptStates[j])
    }
  }

  // Okay, now we need to tell the user what DFA states belong in each NFA state
  for(k in replacementMap) {
    if(inverseReplacementMap[k] == null) {
      inverseReplacementMap[k] = replacementMap[k].split(delimiter)
    }
    // The else case will never happen because replacementMap[k] cannot exceed 1 in length
    // Since that would be a collision and we take care of that above
  }

  // Use the inverse map to create the aliasMap
  for(k in newTransitionTable) {
    aliasMap[k] = inverseReplacementMap[k] ? inverseReplacementMap[k] : k.split(delimiter)
  }

  // Return the definition
  return {
    initial: initialStateKey
  , accept: tempAcceptStates
  , transitions: newTransitionTable
  , aliasMap: aliasMap
  }
}

module.exports = nfa2dfa
