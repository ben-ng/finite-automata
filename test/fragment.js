var test = require('tape')
  , Fragment = require('../lib/fragment')

test('construction', function (t) {

  t.plan(1)

  var frag = new Fragment({
        initial: 'q0'
      , accept: ['q2', 'q3']
      , transitions: {
          q0: [
            '\0',  'q1'
          , 'a', 'q2'
          ]
        , q1: [
            'b', 'q3'
          ]
        , q2: [
            'c', 'garbage'
          ]
        , q3: []
        , garbage: []
        }
      })

  t.ok(frag)

})

test('collisions', function (t) {
  t.plan(4)

  // q0 - "a" -> q1
  var fragment1 = new Fragment({
        initial: 'q0'
      , accept: ['q1']
      , transitions: {
          q0: [
            'a',  'q1'
          ]
        , q1: []
        }
      })
    , fragment2 = new Fragment({
        initial: 'q0'
      , accept: ['q1']
      , transitions: {
          q0: [
            'b',  'q1'
          ]
        , q1: []
        }
      })

  fragment2._resolveCollisions(fragment1)
  t.deepEqual(fragment2.states(), ['q0`', 'q1`']
    , 'Should resolve initial collision with a `')

  fragment2._resolveCollisions(fragment2)
  t.deepEqual(fragment2.states(), ['q0``', 'q1``']
    , 'Should resolve second collision with ``')

  fragment2._resolveCollisions(fragment2)
  t.deepEqual(fragment2.states(), ['q0```', 'q1```']
    , 'Should resolve third collision with ```')

  fragment2._resolveCollisions(fragment2)
  t.deepEqual(fragment2.states(), ['q0````', 'q1````']
    , 'Should resolve fourth collision with ````')
})

test('concat', function (t) {
  t.plan(4)

  // q0 - "a" -> q1
  var fragment1 = new Fragment({
        initial: 'q0'
      , accept: ['q1']
      , transitions: {
          q0: [
            'a',  'q1'
          ]
        , q1: []
        }
      })
    , fragment2 = new Fragment({
        initial: 'q0'
      , accept: ['q1']
      , transitions: {
          q0: [
            'b',  'q1'
          ]
        , q1: []
        }
      })

  fragment1.concat(fragment2)

  t.ok(!fragment1.test('a'), 'Concat should not accept solely first dfa')
  t.ok(!fragment1.test('b'), 'Concat should not accept solely second dfa')
  t.ok(fragment1.test('ab'), 'Concat should accept complete dfa')
  t.ok(!fragment1.test('abc'), 'Concat should not accept overflown dfa')
})

test('concat state labels', function (t) {
  t.plan(1)

  var fragment = new Fragment('a', 'a').concat(new Fragment('b', 'b'))
                                       .concat(new Fragment('c', 'c'))

  t.deepEqual(fragment.toDfa().accept, ['c'], 'Accept state should keep label')
})

test('union', function (t) {
  t.plan(4)

  var fragment1 = new Fragment({
        // Force a collision here
        initial: 'union`'
      , accept: ['q1']
      , transitions: {
          'union`': [
            'a',  'q1'
          ]
        , q1: []
        }
      })
    , fragment2 = new Fragment({
        initial: 'q0'
      , accept: ['q1']
      , transitions: {
          q0: [
            'b',  'q1'
          ]
        , q1: []
        }
      })

  fragment1.union(fragment2)

  t.ok(!fragment1.test(''), 'Union should not accept empty string')
  t.ok(fragment1.test('a'), 'Union should accept solely first dfa')
  t.ok(fragment1.test('b'), 'Union should accept solely second dfa')
  t.ok(!fragment1.test('ab'), 'Union should not accept concatenated dfa')
})

test('union state labels', function (t) {
  t.plan(1)

  var fragment = new Fragment('a', 'a').union(new Fragment('b', 'b'))
                                       .union(new Fragment('c', 'c'))

  t.deepEqual(fragment.toDfa().accept, ['a', 'b', 'c'], 'Accept states should keep labels')
})

test('kleene closure', function (t) {
  t.plan(6)

  var fragment1 = new Fragment({
        initial: 'repeat`'
      , accept: ['q1']
      , transitions: {
          // Force a collision
          'repeat`': [
            'a',  'q1'
          ]
        , q1: []
        }
      })
    , fragment2 = new Fragment({
        initial: 'q0'
      , accept: ['q1']
      , transitions: {
          q0: [
            'b',  'q1'
          ]
        , q1: []
        }
      })

  fragment1.repeat().concat(fragment2)

  t.ok(!fragment1.test(''), 'Concat+Repeat should not accept empty string')
  t.ok(!fragment1.test('a'), 'Concat+Repeat should not accept solely first dfa')
  t.ok(fragment1.test('b'), 'Concat+Repeat should accept solely second dfa')
  t.ok(fragment1.test('ab'), 'Concat+Repeat should accept concatenated dfa')
  t.ok(fragment1.test('aab'), 'Concat+Repeat should accept concatenated dfa with repeat')
  t.ok(fragment1.test('aaab'), 'Concat+Repeat should accept concatenated dfa with repeat')
})

test('kleene closure labels', function (t) {
  t.plan(1)

  var fragment = new Fragment('a', 'a').repeat()

  t.deepEqual(fragment.toDfa().accept, ['a'], 'Accept state should keep label')
})

test('(a|b)*c*(d|e)', function (t) {
  t.plan(11)

  var a = new Fragment({
        // Force a collision here
        initial: 'repeat`'
      , accept: ['q1']
      , transitions: {
          'repeat`': [
            'a',  'q1'
          ]
        , q1: []
        }
      })
    , b = new Fragment({
        initial: 'q0'
      , accept: ['q1']
      , transitions: {
          q0: [
            'b',  'q1'
          ]
        , q1: []
        }
      })
    , c = new Fragment({
        initial: 'q0'
      , accept: ['q1']
      , transitions: {
          q0: [
            'c',  'q1'
          ]
        , q1: []
        }
      })
    , d = new Fragment({
        initial: 'q0'
      , accept: ['q1']
      , transitions: {
          q0: [
            'd',  'q1'
          ]
        , q1: []
        }
      })
    , e = new Fragment({
        initial: 'q0'
      , accept: ['q1']
      , transitions: {
          q0: [
            'e',  'q1'
          ]
        , q1: []
        }
      })

  // WOAAAH
  a.union(b).repeat().concat(c.repeat()).concat(d.union(e))

  t.ok(!a.test(''), 'DFA should not accept empty string')
  t.ok(!a.test('f'), 'DFA should not accept f')
  t.ok(!a.test('abca'), 'DFA should not accept out of order a')
  t.ok(!a.test('abcad'), 'DFA should not accept out of order a')
  t.ok(!a.test('abcde'), 'DFA should not accept both d and e')
  t.ok(!a.test('aaccdd'), 'DFA should not accept second d')
  t.ok(a.test('ace'), 'DFA should accept ace')
  t.ok(a.test('abcd'), 'DFA should accept abcd')
  t.ok(a.test('aacd'), 'DFA should accept aacd')
  t.ok(a.test('aaccd'), 'DFA should accept aaccd')
  t.ok(a.test('aacce'), 'DFA should accept aacce')
})

test('cow(dog)*(cat)*', function (t) {
  t.plan(5)

  var nfa = new Fragment('cow', 'cow')
    , dog = new Fragment('dog', 'cowdog')
    , cat = new Fragment('cat', 'cowdogcat')

  // Match cow followed by any number of dogs then any number of cats
  nfa.concat(dog.repeat()).concat(cat.repeat())

  t.ok(nfa.test('cow'))
  t.ok(nfa.test('cowdog'))
  t.ok(nfa.test('cowdogcat'))
  t.ok(nfa.test('cowcat'))
  t.ok(nfa.test('cowdogcatcat'))
})
