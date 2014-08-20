var test = require('tape')
  , Fragment = require('../lib/fragment')

test('string2nfa', function (t) {
  t.plan(6)

  // Example taken from:
  // http://binarysculpting.com/2012/02/15/converting-dfa-to-nfa-by-subset-construction-regular-expressions-part-2

  var nfa1 = new Fragment('abaa')
    , nfa2 = new Fragment('abcd', 'matched')

  t.ok(!nfa1.test(''), 'Should not recognize empty string')
  t.ok(!nfa1.test('aba'), 'Should not recognize wrong string')
  t.ok(nfa1.test('abaa'), 'Should recognize the string')
  t.ok(!nfa1.test('abaad'), 'Should not recognize wrong string')

  t.ok(nfa2.test('abcd'), 'Should match string')
  t.equal(nfa2.accept[0], 'matched', 'Should have token name')

})
