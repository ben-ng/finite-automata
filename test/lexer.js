/* jshint evil:true */

var test = require('tape')
  , Fragment = require('../lib/fragment')

test('lexer', function (t) {
  t.plan(1)

  // Example taken from:
  // http://binarysculpting.com/2012/02/15/converting-dfa-to-nfa-by-subset-construction-regular-expressions-part-2

  var nfa = new Fragment({
              initial: '0'
            , accept: ['9']
            , transitions: {
                '0': [
                      '\0', '1'
                    , '\0', '3'
                    ]
              , '1': [
                      'b', '2'
                    ]
              , '2': [
                      '\0', '5'
                    ]
              , '3': [
                      'a', '4'
                    ]
              , '4': [
                      '\0', '5'
                    ]
              , '5': [
                      '\0', '6'
                    , '\0', '0'
                    ]
              , '6': [
                      'b', '7'
                    ]
              , '7': [
                      'c', '8'
                    ]
              , '8': [
                      'd', '9'
                    ]
              , '9': []
              }
            })
  , lexer = new Function('input', nfa.toString({functionDef: true}))
    // Valid tokens
  , v0 = 'bbcd'
  , v1 = 'abcd'
  , tokens = ['  ', v0, '2 d3', v1, 'dsf', v0, 'adsf', v1, v0, v0, 'turkey', v0]

  t.deepEqual(lexer(tokens.join('')), [v0, v1, v0, v1, v0, v0, v0])
})
