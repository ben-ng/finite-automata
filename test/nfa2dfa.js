var test = require('tape')
  , Fragment = require('../lib/fragment')
  , nfa2dfa = require('../lib/nfa2dfa')

test('reg2nfa', function (t) {
  t.plan(3)

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
  , dfa = nfa2dfa(nfa, ',')

  t.equal(dfa.initial, '0,1,3', 'Initial state should be the macrostate 0,1,3')
  t.deepEqual(dfa.accept, ['9'], 'Accept state should be 9')
  // Output: https://i.cloudup.com/3wBxFiLzPp-3000x3000.png
  // Almost, anyway. '0,1,2,3,5,6,7' - a -> '0,1,3,4,5,6'
  // is not in the image. Not sure if bug, or equivalent DFAs.
  t.deepEqual(dfa.transitions
    , { '8': [ 'd', '9' ],
        '9': [],
        '0,1,3': [ 'b', '0,1,2,3,5,6', 'a', '0,1,3,4,5,6' ],
        '0,1,3,4,5,6': [ 'b', '0,1,2,3,5,6,7', 'a', '0,1,3,4,5,6' ],
        '0,1,2,3,5,6,7': [ 'b', '0,1,2,3,5,6,7', 'a', '0,1,3,4,5,6', 'c', '8' ],
        '0,1,2,3,5,6': [ 'b', '0,1,2,3,5,6,7', 'a', '0,1,3,4,5,6' ]
    }, 'The transition table should have no epsilon transitions')
})
