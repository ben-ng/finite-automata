var Fragment
  , StateMachine = require('./machine')

/**
* TODO: Verifying that a definition is sensible is
* pretty expensive. There should be an option that
* doesn't require such stringent checking.
*/
Fragment = function Fragment (def) {

  var err = this.validate(def)

  if(err !== true) {
    throw err
  }

  this.initial = def.initial
  this.accept = def.accept
  this.transitions = def.transitions

}

Fragment.prototype.validate = function validate (def) {

  var i, ii, k

  if(!def) {
    return new Error('Fragment needs a definition')
  }

  if(!def.initial) {
    return new Error('Fragment needs an initial state')
  }

  if(!Array.isArray(def.accept)) {
    return new Error('Fragment must have an array of accepted states')
  }

  if(typeof def.transitions != 'object') {
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

    for(i=0, ii=def.transitions[k]; i<ii; ++i) {
      if(def.transitions[def.transitions[k][i]] == null) {
      return new Error('Transitioned to ' + def.transitions[k][i] +
        ', which does not exist in the transition map')
      }
    }
  }

  return true

}

/**
* Simulates this machine on the input
*/
Fragment.prototype.test = function test (input) {
  return new StateMachine(this).accepts(input)
}

Fragment.prototype.concat = function concat (other) {
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

Fragment.prototype.states = function states () {
  return Object.keys(this.transitions)
}

/**
* Resolves collisions with `other` by renaming `this`'s states
*/
Fragment.prototype._resolveCollisions = function _resolveCollisions (other) {
  var states = other.states()
    , suffixMatcher = /`[`0-9]*$/
    , needle
    , prefix
    , suffix

  for(var i=0, ii=states.length; i<ii; ++i) {
    needle = states[i]

    if(this._hasState(needle)) {
      var matchSuffix = suffixMatcher.exec(needle)
        , level

      if(matchSuffix == null) {
        this._renameState(needle, needle + '`')
      }
      else {

        suffix = matchSuffix[0]
        level = parseInt(suffix.slice(1), 10)
        prefix = needle.slice(0, matchSuffix.index + 1)

        if(isNaN(level)) {
          level = suffix.length
        }

        ++level

        if(level < 4) {
          suffix = new Array(level).join('`')
        }
        else {
          suffix = '' + level
        }

        while(this._hasState(prefix + suffix)) {
          ++level

          if(level < 3) {
            suffix = new Array(level).join('`')
          }
          else {
            suffix = '' + level
          }
        }

        this._renameState(needle, prefix + suffix)
      }
    }
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
