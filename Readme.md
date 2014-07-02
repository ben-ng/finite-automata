# Finite Automata

Unfancy Javascript state machines.

[![Build Status](https://travis-ci.org/ben-ng/finite-automata.svg?branch=master)](https://travis-ci.org/ben-ng/finite-automata)

[![browser support](https://ci.testling.com/ben-ng/finite-automata.png)
](https://ci.testling.com/ben-ng/finite-automata)


## Features

 * Concatenation `/ab/`
 * Union `/a|b/`
 * Repetition `/a*/` (Kleene Closure)
 * Simulation on input `/ab/.test('haystack')`
 * Lexer generation
 * NFA to DFA conversion (via Powerset Construction)
 * DFA minimization (via Brzozowski's algorithm)

## Usage

```javascript

var Fragment = require('finite-automata')

// Accepts "a"
var fragment1 = new Fragment({
      initial: 'q0'
    , accept: ['q1']
    , transitions: {
        q0: ['a',  'q1']
      , q1: []
      }
    })

// Accepts "b"
var fragment2 = new Fragment({
      initial: 'q0'
    , accept: ['q1']
    , transitions: {
        q0: ['b',  'q1']
      , q1: [] // Accept state
      , q2: [] // Garbage state
      }
    })

// Accepts "c"
var fragment3 = new Fragment({
      initial: 'q0'
    , accept: ['q1']
    , transitions: {
        q0: ['c',  'q1']
      , q1: []
      }
    })

// Equivalent to /(a|b)*c/
// Which matches all strings containing only a and b that end with c
fragment1.union(fragment2).repeat().concat(fragment3)

t.ok(fragment1.test('ababbc'), 'Should accept ababbc')
t.ok(!fragment1.test('ababba'), 'Should not accept ababba')

// Compile a lexer from the fragment
var lexer = new Function('input', fragment1.toString({functionDef: true}))

t.deepEqual(lexer('ababacbacc'), ['ababac', 'bac', 'c'], 'Should get all valid tokens')

```

## Fragment

A fragment is a finite automaton constructed with `initial` state, `accept` state(s), and a `transitions` map.

Epsilon transitions should be denoted with the null character `'\0'`

 * initial - {string} The initial state of the fragment
 * accept - {array} An array of strings specifying the accept states of the fragment
 * transitions - {object} An object keyed by state
   * transitions[state] - {array} An array where even indices are characters and odd indices are states
                                  e.g. `key: ['c', 'q0', 'd', 'q1', '\0', 'q2']`

Notes:

You can perform operations on two fragments even if their states collide. Collisions will be resolved by appending the '\`' character up to three times, after which the suffix will be of the form '\`n' where n is the number of collisions that happened.

## Fragment.concat()

```javascript

// a and b are Fragments
a.concat(b)

// RegExp equivalent
/ab/

```

Modifies the original fragment by concatening the argument.

## Fragment.union()

```javascript

// a and b are Fragments
a.union(b)

// RegExp equivalent
/(a|b)/

```

Modifies the original fragment by taking the union with the argument.

## Fragment.repeat()

```javascript

// a is a Fragment
a.repeat()

// RegExp equivalent
/a*/

```

Modifies the fragment, allowing it to be repeated n times where n >= 0.

## Fragment.test()

```javascript

// a is a fragment
a.test('haystack')

// RegExp equivalent
/a/.test('haystack')

```

Returns true if the fragment accepts the input string.

Notes:

This uses a state machine to simulate the fragment on the input. NFAs will be copied and converted into minimal DFAs. This is a slow method -- if you need to run the fragment multiple times, compile a lexer with `.toString()`.

## Fragment.toString()

```javascript

// Write it to a file as a module
fs.writeFile('lexer.js', a.toString() + '; module.exports = lexer', cb)

// Or use the functionDef option to only get statements
lexer = new Function('input', a.toString({functionDef: true}))
lexer('haystack') // -> produces an array of tokens

// No RegExp equivalent

```

Returns a high performance lexer for the fragment based on a minimal DFA.
