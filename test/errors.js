var test = require('tape')
  , Fragment = require('../lib/fragment')

test('errors', function (t) {

  t.plan(9)

  t.throws(function () {
    new Fragment()
  }, 'Fragment needs a definition')

  t.throws(function () {
    new Fragment({})
  }, 'Fragment needs an initial state')

  t.throws(function () {
    new Fragment({initial: 'a'})
  }, 'Fragment must have an array of accepted states')

  t.throws(function () {
    new Fragment({initial: 'a', accept: []})
  }, 'Fragment must have a map of transitions')

  t.throws(function () {
    new Fragment({initial: 'a', accept: ['q'], transitions: {}})
  }, 'Accept state "q" does not exist in the transition map')

  t.throws(function () {
    new Fragment({initial: 'a', accept: ['q'], transitions: {q: 3}})
  }, 'The transitions for q must be an array')

  t.throws(function () {
    new Fragment({initial: 'a', accept: ['q'], transitions: {q: ['a', 'f']}})
  }, 'Transitioned to f, which does not exist in the transition map')

  t.throws(function () {
    var a = new Fragment({initial: 'a', accept: ['q'], transitions: {q: []}})
    a._renameState('b', 'k')
  }, 'The state b does not exist')

  var a = new Fragment({initial: 'a', accept: ['q'], transitions: {q: []}})
  t.equal(a.toDfa('q').toString(), 'Error: Delimiter "q" collision in state "q"')

})
