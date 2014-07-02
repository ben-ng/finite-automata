var Benchmark = require('benchmark')
  , jisonlex = require('jison-lex')
  , suite = new Benchmark.Suite
    // All javascript keywords as of ES6
  , keywords= [
      'break'
    , 'case'
    , 'class'
    , 'catch'
    , 'const'
    , 'continue'
    , 'debugger'
    , 'default'
    , 'delete'
    , 'do'
    , 'else'
    , 'export'
    , 'extends'
    , 'finally'
    , 'for'
    , 'function'
    , 'if'
    , 'import'
    , 'in'
    , 'instanceof'
    , 'let'
    , 'new'
    , 'return'
    , 'super'
    , 'switch'
    , 'this'
    , 'throw'
    , 'try'
    , 'typeof'
    , 'var'
    , 'void'
    , 'while'
    , 'with'
    , 'yield']

// add tests
suite.add('jison-lex', function() {
  /o/.test('Hello World!')
})
.add('finite-automata', function() {
  'Hello World!'.indexOf('o') > -1
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target))
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'))
})
// run async
.run({ 'async': true })
