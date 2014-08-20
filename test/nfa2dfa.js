var test = require('tape')
  , Fragment = require('../lib/fragment')
  , nfa2dfa = require('../lib/nfa2dfa')

test('nfa2dfa', function (t) {
  t.plan(5)

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

  nfa = new Fragment({
            initial: '0',
            accept: [ 'T\'\'->T\' $', 'T\'->T', 'T->R', 'T->a T c', 'R->', 'R->b R' ],
            transitions:
             { '0': [ 'T\'', '1', '\u0000', '2' ],
               '1': [ -1, 'T\'\'->T\' $' ],
               '2': [ 'T', 'T\'->T', '\u0000', '3', '\u0000', '4' ],
               '3': [ 'R', 'T->R', '\u0000', 'R->', '\u0000', '7' ],
               '4': [ 'a', '5' ],
               '5': [ 'T', '6', '\u0000', '3', '\u0000', '4' ],
               '6': [ 'c', 'T->a T c' ],
               '7': [ 'b', '8' ],
               '8': [ 'R', 'R->b R', '\u0000', 'R->', '\u0000', '7' ],
               'T\'\'->T\' $': [],
               'T\'->T': [],
               'T->R': [],
               'T->a T c': [],
               'R->': [],
               'R->b R': [] } })

  t.deepEqual(nfa2dfa(nfa, ',')
    , {
        initial: '0,2,3,4,7,R->',
        accept:
         [ 'T\'->T',
           'T->R',
           '3,4,5,7,R->',
           '7,8,R->',
           'R->b R',
           'T->a T c',
           'T\'\'->T\' $' ],
        transitions:
         { '1': [ -1, 'T\'\'->T\' $' ],
           '6': [ 'c', 'T->a T c' ],
           '0,2,3,4,7,R->':
            [ 'T\'',
              '1',
              'T',
              'T\'->T',
              'R',
              'T->R',
              'a',
              '3,4,5,7,R->',
              'b',
              '7,8,R->' ],
           '7,8,R->': [ 'b', '7,8,R->', 'R', 'R->b R' ],
           'R->b R': [],
           '3,4,5,7,R->': [ 'R', 'T->R', 'a', '3,4,5,7,R->', 'T', '6', 'b', '7,8,R->' ],
           'T->a T c': [],
           'T->R': [],
           'T\'->T': [],
           'T\'\'->T\' $': [] },
        aliasMap: {
          '0,2,3,4,7,R->': [ '0', '2', '3', '4', '7', 'R->' ]
        , 1: [ '1' ]
        , '3,4,5,7,R->': [ '3', '4', '5', '7', 'R->' ]
        , 6: [ '6' ]
        , '7,8,R->': [ '7', '8', 'R->' ]
        , 'R->b R': [ 'R->b R' ]
        , 'T\'\'->T\' $': [ 'T\'\'->T\' $' ]
        , 'T\'->T': [ 'T\'->T' ]
        , 'T->R': [ 'T->R' ]
        , 'T->a T c': [ 'T->a T c' ]
        }
      }
    , 'Macrostates should not collide even if they share an accept state')

  nfa = new Fragment({
            initial: 'A',
            accept: [ 'D' ],
            transitions:
            {
              A: ['\x00', 'B', '\x00', 'C']
            , B: ['a', 'D']
            , C: ['a', 'D']
            , D: []
            }
           })

  t.deepEqual(nfa2dfa(nfa, ','), {
    initial: 'A,B,C',
    accept: [ 'D' ],
    transitions: { 'A,B,C': [ 'a', 'D' ], D: [] },
    aliasMap: { 'A,B,C': [ 'A', 'B', 'C' ], D: [ 'D' ] }
  }, 'Should properly derive merged states')
})
