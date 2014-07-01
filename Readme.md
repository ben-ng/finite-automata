# Finite Automata

A dependable building block for more ambitious modules

[![Build Status](https://travis-ci.org/ben-ng/finite-automata.svg?branch=master)](https://travis-ci.org/ben-ng/finite-automata)

[![browser support](https://ci.testling.com/ben-ng/finite-automata.png)
](https://ci.testling.com/ben-ng/finite-automata)


## Features
 * Concatenation
 * Simulation on input
 * NFA to DFA conversion

Coming soon:

 * Union
 * Keene Closure

## Usage

```javascript

var Fragment = require('finite-automata')

var fragment1 = new Fragment({
      initial: 'q0'
    , accept: ['q1']
    , transitions: {
        q0: [ //Initial state
          'a',  'q1'
        ]
      , q1: [] // Accept state
      }
    })
  , fragment2 = new Fragment({
      initial: 'q0'
    , accept: ['q1']
    , transitions: {
        q0: [ // Initial state
          'b',  'q1'
        , 'd', 'q2'
        ]
      , q1: [] // Accept state
      , q2: [] // Garbage state
      }
    })

fragment1.concat(fragment2)

t.ok(!fragment1.accepts('a'), 'Concat should not accept solely first dfa')
t.ok(!fragment1.accepts('b'), 'Concat should not accept solely second dfa')
t.ok(fragment1.accepts('ab'), 'Concat should accept complete dfa')
t.ok(!fragment1.accepts('abc'), 'Concat should not accept overflown dfa')

```

## Fragment

A fragment is a finite automaton constructed with `initial` state, `accept` state(s), and a `transitions` map.

Epsilon transitions should be denoted with the null character `'\0'`

 * initial - {string} The initial state of the fragment
 * accept - {array} An array of strings specifying the accept states of the fragment
 * transitions - {object} An object keyed by state
   * transitions[state] - {array} An array where even indices are characters and odd indices are states
                                  e.g. `key: ['c', 'q0', 'd', 'q1', '\0', 'q2']`

## Fragment.concat()

```javascript

// a and b are Fragments
a.concat(b)

// RegExp equivalent
/ab/

```

Modifies the original fragment by concatening the argument.

Notes:

You can concatenate two fragments even if their states collide. Collisions will be resolved by appending the '\`' character up to three times, after which the suffix will be of the form '\`n' where n is the number of collisions that happened.

This will always result in a NFA.

## Fragment.test()

```javascript

// a is a fragment
a.test('haystack')

// RegExp equivalent
/a/.test('haystack')

```

Returns true if the fragment accepts the input string.

Notes:

This uses a state machine to simulate the fragment on the input. NFAs will be copied and converted to DFAs.
