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

There are three ways to construct a fragment.

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


#### Fragment(string, tokenName)

```javascript
// Matches "1010" in a shorthand way
var binary = new Fragment('1010')

binary.test('1010') // => true
```

If you supply a string to the constructor, it will be turned into a DFA that only recognizes that string. `tokenName` is an optional argument that will be used to name the accepting state, which is useful for lexing.

Notes:

You can perform operations on two fragments even if their states collide. Collisions will be resolved by appending the '\`' character.

#### Fragment(-1)

```javascript
// Matches the end of file in a shorthand way
var EOF = new Fragment(-1)

EOF.test(-1) // => true
```

If you supply exactly `-1` to the constructor, it will be turned into a DFA that only recognizes the end of a file. `-1` is used because it is never a valid character code. The EOF fragment is probably only useful when building a parser, where you would want to know if the input stream has ended.

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

This uses a state machine to simulate the fragment on the input. NFAs will be copied and converted into minimal DFAs. This is a slow method -- if you need to run the fragment multiple times, you might want to create a lexer with [grass](https://www.npmjs.org/package/grass).

#### Fragment.toDfa([delimiter])

```javascript

// a is a fragment
a.minimize(',')

```

Returns a DFA equivalent to the fragment. Uses powerset construction, which will likely create compound states. If you want a minimal DFA, use `Fragment.minimize()`.

Notes:

The process of creating a DFA from an NFA results in compound states. These compound states will be named by joining the sorted names of the sub states using an optional delimiter. If exactly one of the sub states is an accepted state, the macrostate will be named after that accepting state. This makes it possible to create larger fragments from smaller, labeled fragments.

Example:
```javascript

// Take the union of the three labeled fragments
var fragment = new Fragment('a', 'a').union(new Fragment('b', 'b'))
                                     .union(new Fragment('c', 'c'))

// The accept states retain their labels
assert.deepEqual(fragment.toDfa().accept, ['a', 'b', 'c'])

```

#### Fragment.minimize([delimiter])

```javascript

// a is a fragment
a.minimize(',')

```

Returns a minimal DFA equivalent to the fragment.
