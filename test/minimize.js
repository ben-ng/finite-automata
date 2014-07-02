var test = require('tape')
  , Fragment = require('../lib/fragment')
  , minimize = require('../lib/minimize')

test('minimize', function (t) {
  t.plan(3)

  // Example taken from:
  // http://binarysculpting.com/2012/02/15/converting-dfa-to-nfa-by-subset-construction-regular-expressions-part-2

  var nfa = new Fragment({
              initial: 'A'
            , accept: ['E']
            , transitions: {
                'A': [
                      '0', 'B'
                    , '1', 'C'
                    ]
              , 'B': [
                      '0', 'D'
                    , '1', 'D'
                    ]
              , 'C': [
                      '0', 'D'
                    , '1', 'D'
                    ]
              , 'D': [
                      '0', 'E'
                    , '1', 'E'
                    ]
              , 'E': []
              }
            })
  , dfa = minimize(nfa, ',')

  t.equal(dfa.initial, 'A,rI', 'New initial state should be the reversed initial A')
  t.deepEqual(dfa.accept, ['E,rI'], 'New accept state should be the reversed initial E')
  // Output: https://i.cloudup.com/3wBxFiLzPp-3000x3000.png
  // Almost, anyway. '0,1,2,3,5,6,7' - a -> '0,1,3,4,5,6'
  // is not in the image. Not sure if bug, or equivalent DFAs.
  t.deepEqual(dfa.transitions
    , {
      'A,rI': [ '0', 'B,C', '1', 'B,C' ],
      'B,C': [ '0', 'D', '1', 'D' ],
      'D': [ '0', 'E,rI', '1', 'E,rI' ],
      'E,rI': []
    }, 'The transition table should have four states')
})
