/* jshint evil:true */

var test = require('tape')
  , Fragment = require('../lib/fragment')

test('readme demo', function (t) {
  t.plan(3)

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

})
