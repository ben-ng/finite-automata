var test = require('tape')
  , Fragment = require('../lib/fragment')

test('minimize', function (t) {
  t.plan(11)

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
    , dfa = new Fragment(nfa.minimize())

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
  t.end()
})
