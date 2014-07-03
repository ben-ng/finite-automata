# Finite Automata

Unfancy Javascript state machines. For people who like simple, reliable tools.

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
 * 100% branch and statement coverage
 * Pretty fast for JavaScript! (Benchmarks below)

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

// Compile a lexer from the fragment
var lexer = new Function('input', fragment1.toString({functionDef: true}))

t.deepEqual(lexer('ababacbacc'), ['ababac', 'bac', 'c'], 'Should get all valid tokens')

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

#### Fragment.toString()

```javascript

// Write it to a file as a module
fs.writeFile('lexer.js', a.toString() + '; module.exports = lexer', cb)

// Or use the functionDef option to only get statements
lexer = new Function('input', a.toString({functionDef: true}))
lexer('haystack') // -> produces an array of tokens

// No RegExp equivalent

```

Returns a high performance lexer for the fragment based on a minimal DFA.

## Speed

A fair amount of effort has been put into making this module as fast as possible. This includes finding the minimal DFA for the input, carefully choosing when to use a `switch` or `array` or `if/else`, and minimizing branch misprediction. The latter has had the biggest impact on performance, resulting in a 2x speedup over a naive implementation. Check out the lexer templates, and try making it even faster!

This module comes with profiling and benchmarking tools. Here are some sample runs on my 2012 rmbp:

#### Chrome 35
```txt
finite-automata (default) x 122 ops/sec ±1.13% (60 runs sampled)
native regex (alternation) x 390 ops/sec ±0.78% (54 runs sampled)
```
Chrome 35 is 3.19 times faster than this module

#### Firefox 30
```txt
finite-automata (default) x 91.00 ops/sec ±1.79% (54 runs sampled)
native regex (alternation) x 60.66 ops/sec ±0.56% (54 runs sampled)
```
This module is 1.5 times faster than Firefox 30


#### Internet Explorer 11
```txt
finite-automata (default) x 99.62 ops/sec ±1.16% (58 runs sampled)
native regex (alternation) x 136 ops/sec ±1.17% (61 runs sampled)
```
Internet Explorer 11 is 1.37 times faster than this module

A fiddle for this run can be found [here](http://jsfiddle.net/ztRsq). (Warning: will lock up your browser for ~20 seconds)
