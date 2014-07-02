var test = require('tape')
  , Fragment = require('../lib/fragment')

test('reg2nfa', function (t) {
  t.plan(4)

  // Example taken from:
  // http://binarysculpting.com/2012/02/15/converting-dfa-to-nfa-by-subset-construction-regular-expressions-part-2

  var nfa = new Fragment('abaa')

  t.ok(!nfa.test(''), 'Should not recognize empty string')
  t.ok(!nfa.test('aba'), 'Should not recognize wrong string')
  t.ok(nfa.test('abaa'), 'Should recognize the string')
  t.ok(!nfa.test('abaad'), 'Should not recognize wrong string')

})
