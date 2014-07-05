/* jshint evil:true */

var test = require('tape')
  , Fragment = require('../lib/fragment')

test('readme demo', function (t) {
  t.plan(2)

  // Accepts "a"
  var fragment1 = new Fragment('a')

  // Accepts "b"
  var fragment2 = new Fragment('b')

  // Accepts "c"
  var fragment3 = new Fragment('c')

  // Equivalent to /(a|b)*c/
  // Which matches all strings containing only a and b that end with c
  fragment1.union(fragment2).repeat().concat(fragment3)

  t.ok(fragment1.test('ababbc'), 'Should accept ababbc')
  t.ok(!fragment1.test('ababba'), 'Should not accept ababba')

})
