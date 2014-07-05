# Finite Automata

An unfancy JavaScript state machine for your more ambitious project.

[![Build Status](https://travis-ci.org/ben-ng/finite-automata.svg?branch=master)](https://travis-ci.org/ben-ng/finite-automata)

[![browser support](https://ci.testling.com/ben-ng/finite-automata.png)
](https://ci.testling.com/ben-ng/finite-automata)

## Features

 * Concatenation `/ab/`
 * Union `/a|b/`
 * Repetition `/a*/` (Kleene Closure)
 * Simulation on input `/ab/.test('haystack')`
 * NFA to DFA conversion (via Powerset Construction)
 * DFA minimization (via Partitioning)
 * 100% branch and statement coverage

## Usage

```javascript

var Fragment = require('finite-automata')

// Accepts "a"
var fragment1 = new Fragment('a')

// Accepts "b"
var fragment2 = new Fragment('b')

// Accepts "c"
var fragment3 = new Fragment('c')

// Equivalent to /(a|b)*c/
// Which matches all strings containing only a and b that end with c
fragment1.union(fragment2).repeat().concat(fragment3)

t.ok(fragment1.test('ababbc'), 'Should accept ababbc')
t.ok(!fragment1.test('ababba'), 'Should not accept ababba')

```

## Fragment

There are two ways to construct a fragment.

#### Fragment({initial, accept, transitions})

```javascript
// Matches the string "1010"
var binary = new Fragment({
      initial: 0
    , accept: [4]
    , transitions: {
        0: ['1',  1]
      , 1: ['0',  2]
      , 2: ['1',  3]
      , 3: ['0',  4]
      , 4: [] // accept state
      }
    })
```

A fragment is a finite automaton constructed with `initial` state, `accept` state(s), and a `transitions` map.

Epsilon transitions should be denoted with the null character `'\0'`

 * initial - {string} The initial state of the fragment
 * accept - {array} An array of strings specifying the accept states of the fragment
 * transitions - {object} An object keyed by state
   * transitions[state] - {array} An array where even indices are characters and odd indices are states
                                  e.g. `key: ['c', 'q0', 'd', 'q1', '\0', 'q2']`


#### Fragment(string)

```javascript
// Matches "1010" in a shorthand way
var binary = new Fragment('1010')

binary.test('1010') // => true
```

If you supply a string to the constructor, it will be turned into a DFA that only recognizes that string.

Notes:

You can perform operations on two fragments even if their states collide. Collisions will be resolved by appending the '\`' character.

#### Fragment.concat()

```javascript

// a and b are Fragments
a.concat(b)

// RegExp equivalent
/ab/

```

Modifies the original fragment by concatening the argument.

#### Fragment.union()

```javascript

// a and b are Fragments
a.union(b)

// RegExp equivalent
/(a|b)/

```

Modifies the original fragment by taking the union with the argument.

#### Fragment.repeat()

```javascript

// a is a Fragment
a.repeat()

// RegExp equivalent
/a*/

```

Modifies the fragment, allowing it to be repeated n times where n >= 0.

#### Fragment.test()

```javascript

// a is a fragment
a.test('haystack')

// RegExp equivalent
/a/.test('haystack')

```

Returns true if the fragment accepts the input string.

Notes:

This uses a state machine to simulate the fragment on the input. NFAs will be copied and converted into minimal DFAs. This is a slow method -- if you need to run the fragment multiple times, compile a lexer with `.toString()`.
