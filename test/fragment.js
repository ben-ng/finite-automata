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
  t.plan(8)

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
  t.deepEqual(fragment2.states(), ['q0`4', 'q1`4']
    , 'Should resolve fourth collision with `4')

  fragment2._resolveCollisions(fragment2)
  t.deepEqual(fragment2.states(), ['q0`5', 'q1`5']
    , 'Should resolve fifth collision with `5')

  fragment2._resolveCollisions(fragment2)
  t.deepEqual(fragment2.states(), ['q0`6', 'q1`6']
    , 'Should resolve sixth collision with `6')

  fragment1._renameState('q0', 'q0`5')
  fragment1._resolveCollisions(fragment2)
  t.deepEqual(fragment1.states(), ['q1', 'q0`5']
    , 'Should not collide')

  fragment1._renameState('q0`5', 'q0`6')
  fragment1._resolveCollisions(fragment2)
  t.deepEqual(fragment1.states(), ['q1', 'q0`7']
    , 'Should collide with q0`6')

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
