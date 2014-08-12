var Fragment
  , StateMachine = require('./machine')
  , _minimize = require('./minimize')
  , string2dfa = require('./string2dfa')
  , nfa2dfa = require('./nfa2dfa')

/**
* TODO: Verifying that a definition is sensible is
* pretty expensive. There should be an option that
* doesn't require such stringent checking.
*/
Fragment = function Fragment (def, acceptName) {

  // OK to be a string literal, we'll construct a fragment from that
  if(typeof def == 'string') {
    def = string2dfa(def, acceptName)
  }
  // This is a shorthanded special case: the EOF character
  else if(def === -1) {
    def = {
      initial: 0
    , accept: [1]
    , transitions: {
        0: [-1, 1]
      , 1: []
      }
    }
  }

  var err = this.validate(def)

  if(err !== true) {
    throw err
  }

  this.initial = def.initial
  this.accept = def.accept
  this.transitions = def.transitions

}

Fragment.prototype.copy = function copy () {
  return {
    initial: this.initial
  , accept: JSON.parse(JSON.stringify(this.accept))
  , transitions: JSON.parse(JSON.stringify(this.transitions))
  }
}

Fragment.prototype.toDfa = function toDfa (delimiter) {
  return nfa2dfa(this.copy(), delimiter)
}

Fragment.prototype.minimize = function minimize (delimiter) {
  return _minimize(this.toDfa(delimiter))
}

Fragment.prototype.validate = function validate (def) {

  var i, ii, k

  if(!def) {
    return new Error('Fragment needs a definition')
  }

  if(def.initial == null) {
    return new Error('Fragment needs an initial state')
  }

  if(!Array.isArray(def.accept)) {
    return new Error('Fragment must have an array of accepted states')
  }

  if(def.transitions == null) {
    return new Error('Fragment must have a map of transitions')
  }

  // Make sure that accept states are in transitions
  for(i=0, ii=def.accept.length; i<ii; ++i) {
    if(def.transitions[def.accept[i]] == null) {
      return new Error('Accept state "' + def.accept[i] +
        '" does not exist in the transition map')
    }
  }

  // Make sure that transition states are in transitions
  for(k in def.transitions) {
    if(!Array.isArray(def.transitions[k])) {
      return new Error('The transitions for ' + k + ' must be an array')
    }

    for(i=1, ii=def.transitions[k].length; i<ii; i += 2) {
      if(def.transitions[def.transitions[k][i]] == null) {
      return new Error('Transitioned to ' + def.transitions[k][i] +
        ', which does not exist in the transition map')
      }
    }
  }

  return true

}

/**
* Simulates this fragment on the input
*/
Fragment.prototype.test = function test (input) {
  return new StateMachine(this.minimize()).accepts(input)
}

Fragment.prototype.concat = function concat (other) {
  other = new Fragment(other.copy())

  // When joining a to b, b should disambiguate itself from a
  other._resolveCollisions(this)

  var bInitial = other.initial

  // Point the final states of a to the initial state of b
  for(var i=0, ii=this.accept.length; i<ii; ++i) {
    this.transitions[this.accept[i]].push('\0', bInitial)
  }

  // Add all transitions from b to a
  for(var k in other.transitions) {
    this.transitions[k] = other.transitions[k]
  }

  this.accept = other.accept

  return this
}

Fragment.prototype.union = function union (other) {
  other = new Fragment(other.copy())

  // When joining a to b, b should disambiguate itself from a
  other._resolveCollisions(this)

  // Create a new initial state
  var original = 'union'
    , suffix = '`'
    , newStateKey = original + suffix
    , oldInitial = this.initial

  // Watch for collisions in both sides!
  while(this._hasState(newStateKey)) {
    suffix = suffix + '`'
    newStateKey = original + suffix
  }

  this.initial = newStateKey

  // Point new state to the other two initial states with epsilon transitions
  this.transitions[this.initial] = ['\0', oldInitial, '\0', other.initial]

  // Add all transitions from b to a
  for(var k in other.transitions) {
    this.transitions[k] = other.transitions[k]
  }

  this.accept.push.apply(this.accept, other.accept)

  return this
}

/**
* Check out: https://cloudup.com/c64GMr1lTFj
* Source: http://courses.engr.illinois.edu/cs373/sp2009/lectures/lect_06.pdf
*/
Fragment.prototype.repeat = function repeat () {

  // Create a new initial state
  var original = 'repeat'
    , suffix = '`'
    , newStateKey = original


  suffix = '`'

  newStateKey = original + suffix

  while(this._hasState(newStateKey)) {
    suffix = suffix + '`'
    newStateKey = original + suffix
  }

  // Point the final states to the initial state of b
  for(var i=0, ii=this.accept.length; i<ii; ++i) {
    this.transitions[this.accept[i]].push('\0', this.initial)
  }

  this.transitions[newStateKey] = ['\0', this.initial]

  this.initial = newStateKey
  this.accept.push(newStateKey)

  return this
}

Fragment.prototype.states = function states () {
  return Object.keys(this.transitions)
}

/**
* Resolves collisions with `other` by renaming `this`'s states
*/
Fragment.prototype._resolveCollisions = function _resolveCollisions (other) {
  var states = other.states()
    , needle
    , original
    , suffix

  for(var i=0, ii=states.length; i<ii; ++i) {
    needle = states[i]

    if(!this._hasState(needle)) {
      continue
    }

    original = needle
    suffix = '`'

    needle = original + suffix

    while(this._hasState(needle)) {
      suffix = suffix + '`'
      needle = original + suffix
    }

    this._renameState(original, needle)
  }

  return true
}

Fragment.prototype._hasState = function _hasState (needle) {
  return this.transitions[needle] != null
}

/**
* Renames the state `from` to `to`
*/
Fragment.prototype._renameState = function _renameState (from, to) {
  var t = this.transitions[from]
    , i = 0
    , ii = 0

  if(t == null) {
    throw new Error('The state ' + from + ' does not exist')
  }

  if(this.initial == from) {
    this.initial = to
  }

  delete this.transitions[from]
  this.transitions[to] = t

  for(var k in this.transitions) {
    for(i=1, ii=this.transitions[k].length; i<ii; i += 2) {
      if(this.transitions[k][i] == from) {
        this.transitions[k][i] = to
      }
    }
  }

  for(i=0, ii=this.accept.length; i<ii; ++i) {
    if(this.accept[i] == from) {
      this.accept[i] = to
    }
  }
}

module.exports = Fragment
