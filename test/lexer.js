/* jshint evil:true */

var test = require('tape')
  , Fragment = require('../lib/fragment')

test('lexer', function (t) {
  t.plan(7)

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
                      '\'', '9'
                    ]
              , '9': []
              }
            })
  , lexer = new Function('input', nfa.toString({functionDef: true, strategy: 'default'}))
  , sclexer = new Function('input', nfa.toString({functionDef: true, strategy: 'switchChar'}))
  , silexer = new Function('input', nfa.toString({functionDef: true, strategy: 'switchInt'}))
  , aclexer = new Function('input', nfa.toString({functionDef: true, strategy: 'arrayChar'}))
  , fplexer = new Function('input', nfa.toString({functionDef: true, strategy: 'functionPointer'}))
  , ffplexer = new Function('input', nfa.toString({functionDef: true, strategy: 'fastFunctionPointer'}))
    // Valid tokens
  , v0 = 'bbc\''
  , v1 = 'abc\''
  , tokens = ['  ', v0, '2 \'3', v1, '\'sf', v0, 'a\'sf', v1, v0, v1, 'turkey', v0]

  t.deepEqual(lexer(tokens.join('')), [v0, v1, v0, v1, v0, v1, v0], 'check default lexer')
  t.deepEqual(sclexer(tokens.join('')), [v0, v1, v0, v1, v0, v1, v0], 'check switch char lexer')
  t.deepEqual(silexer(tokens.join('')), [v0, v1, v0, v1, v0, v1, v0], 'check switch int lexer')
  t.deepEqual(aclexer(tokens.join('')), [v0, v1, v0, v1, v0, v1, v0], 'check array char lexer')
  t.deepEqual(fplexer(tokens.join('')), [v0, v1, v0, v1, v0, v1, v0], 'check function pointer lexer')
  t.deepEqual(ffplexer(tokens.join('')), [v0, v1, v0, v1, v0, v1, v0], 'check optimized function pointer lexer')

  // Run without options
  t.doesNotThrow(function () {
    nfa.toString()
  })
})
