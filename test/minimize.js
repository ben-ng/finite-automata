var test = require('tape')
  , Fragment = require('../lib/fragment')

test('minimize', function (t) {
  t.plan(16)

  var nfa = new Fragment({
              initial: 0
            , accept: [0, 'pancake']
            , transitions: {
                0: ['a', 1]
              , 1: ['a', 4, 'b', 2]
              , 2: ['a', 3, 'b', 5]
              , 3: ['b', 1]
              , 4: ['a', 'pancake', 'b', 5]
              , 5: ['a', 7, 'b', 2]
              , pancake: ['a', 5]
              , 7: ['a', 0, 'b', 5]
              }
            })
    , minimalDfa = nfa.minimize(',')
    , dfa = new Fragment(minimalDfa)

  t.ok(nfa.test('abbbabaa'), 'nfa should accept abbbabaa')
  t.ok(nfa.test('aaa'), 'nfa should accept aaa')
  t.ok(nfa.test(''), 'nfa should accept empty string')
  t.ok(!nfa.test('a'), 'nfa should accept a')

  t.ok(dfa.test('abbbabaa'), 'minimal dfa should accept abbbabaa')
  t.ok(dfa.test('aaa'), 'minimal dfa should accept aaa')
  t.ok(dfa.test(''), 'minimal dfa should accept empty string')
  t.ok(!dfa.test('a'), 'minimal dfa should accept a')

  t.equal(dfa.initial, 'pancake', 'Should have preserved initial state')
  t.deepEqual(dfa.accept, ['pancake'], 'Should have preserved accept state')
  t.deepEqual(dfa.transitions
    , {
      '1': [ 'b', 3 ],
      '2': [ 'a', 'pancake', 'b', 3 ],
      '3': [ 'a', 2, 'b', 4 ],
      '4': [ 'a', 1, 'b', 3 ],
      pancake: [ 'a', 3 ]
    }, 'Transitions should be remapped with accept state preserved')

  nfa = new Fragment({
              initial: 'A'
            , accept: ['C']
            , transitions: {
                A: ['\x00', 'B', 'a', 'C']
              , B: ['a', 'C']
              , C: []
              }
            })

  minimalDfa = nfa.minimize(',')
  dfa = new Fragment(minimalDfa)

  t.ok(dfa.test('a'), 'minimal dfa should accept a')
  t.ok(!dfa.test('b'), 'minimal dfa should not accept b')
  t.ok(!dfa.test('aa'), 'minimal dfa should not accept aa')
  t.deepEqual(minimalDfa.aliasMap, { '1': [ 'A', 'B' ], C: [ 'C' ] }
    , 'aliasMap should survive the nfa -> dfa -> minimization process')

  nfa = new Fragment({
          initial: 'A|D|F|H|L|M',
          accept: [ 'E', 'G', 'F|H|I|L|M', 'L|M|N', 'O', 'K', 'C' ],
          transitions:
          { 'A|D|F|H|L|M': [ 'T\'', 'B', 'T', 'E', 'R', 'G', 'a', 'F|H|I|L|M', 'b', 'L|M|N' ],
          'L|M|N': [ 'b', 'L|M|N', 'R', 'O' ],
          O: [],
          'F|H|I|L|M': [ 'R', 'G', 'a', 'F|H|I|L|M', 'T', 'J', 'b', 'L|M|N' ],
          J: [ 'c', 'K' ],
          K: [],
          G: [],
          E: [],
          B: [ -1, 'C' ],
          C: [] },
          aliasMap:
          { 'A|D|F|H|L|M': [ 'A', 'D', 'F', 'H', 'L', 'M' ],
          'L|M|N': [ 'L', 'M', 'N' ],
          O: [ 'O' ],
          'F|H|I|L|M': [ 'F', 'H', 'I', 'L', 'M' ],
          J: [ 'J' ],
          K: [ 'K' ],
          G: [ 'G' ],
          E: [ 'E' ],
          B: [ 'B' ],
          C: [ 'C' ] }
        })

  minimalDfa = nfa.minimize(',')

  t.deepEqual(minimalDfa
  , {
    initial: 3,
    accept: [ 'C', 'F|H|I|L|M', 'L|M|N' ],
    transitions:
     { '3': [ 'T\'', 5, 'T', 'C', 'R', 'C', 'a', 'F|H|I|L|M', 'b', 'L|M|N' ],
       '4': [ 'c', 'C' ],
       '5': [ -1, 'C' ],
       'L|M|N': [ 'b', 'L|M|N', 'R', 'C' ],
       C: [],
       'F|H|I|L|M': [ 'R', 'C', 'a', 'F|H|I|L|M', 'T', 4, 'b', 'L|M|N' ] },
    aliasMap:
     { '3': [ 'A|D|F|H|L|M' ],
       '4': [ 'J' ],
       '5': [ 'B' ],
       'L|M|N': [ 'L|M|N' ],
       C: [ 'O', 'K', 'G', 'E', 'C' ],
       'F|H|I|L|M': [ 'F|H|I|L|M' ] }
  }, 'The aliasMap should correctly merge macrostates from the nfa->dfa stage')
})
