var nfa2dfa = require('./nfa2dfa')

function reverse (dfa) {
  var newInitial = 'rI'
    , dfaStates = Object.keys(dfa.transitions)
    , nfa
    , i = 0
    , ii = dfa.accept.length
    , state
    , trans

  while(dfaStates.indexOf(newInitial) >= 0) {
    newInitial = newInitial + '`'
  }

  nfa = {
    initial: newInitial
  , accept: [dfa.initial]
  , transitions: {}
  }

  nfa.transitions[newInitial] = []

  for (; i<ii; ++i) {
    nfa.transitions[newInitial].push('\0', dfa.accept[i])
  }

  // Reverse all transitions
  for(state in dfa.transitions) {
    trans = dfa.transitions[state]

    if(nfa.transitions[state] == null) {
      nfa.transitions[state] = []
    }

    for (i=0, ii=trans.length; i<ii; i += 2) {
      if(nfa.transitions[trans[i + 1]] == null) {
        nfa.transitions[trans[i + 1]] = []
      }

      nfa.transitions[trans[i + 1]].push(trans[i], state)
    }
  }

  return nfa
}

function minimize (dfa, delimiter) {
  // wtf this actually works??
  return nfa2dfa(reverse(nfa2dfa(reverse(nfa2dfa(dfa, delimiter)), delimiter)), delimiter)
}

module.exports = minimize
