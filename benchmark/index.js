/* jshint evil:true */

var Benchmark = require('benchmark')
  , fs = require('fs')
  , Fragment = require('../lib/fragment')
  , suite = new Benchmark.Suite
    // All javascript keywords as of ES6
  , keywords = require('./js-keywords.json')
  , v8regex
  , automaton = new Fragment('')
  , i = 0
  , ii = 0
  , jquery = fs.readFileSync(__dirname + '/jquery.js', 'utf8')
  , testString = jquery
  , charLexer
  , intLexer
  , arrayCharLexer
  , functionPointerLexer
  , fastFunctionPointerLexer
  , defaultLexer
  , logger
  , max = keywords.length - 1
  , min = 0

try {
  if(window) {
    logger = function () {
      var output = Array.prototype.slice.call(arguments)
        , pre = document.getElementById('output')

      for(i=0, ii=output.length; i<ii; ++i) {
        pre.appendChild(document.createTextNode(output[i] + '\n'))
      }
    }
  }
}
catch (e) {
  logger = console.log
}

for(i=0, ii=keywords.length; i<ii; ++i) {
  automaton.union(new Fragment(keywords[i]))
}

v8regex = new RegExp('(' + keywords.join('|') + ')', 'g')

arrayCharLexer = new Function('input', automaton.toString({functionDef: true, strategy: 'arrayChar'}))
charLexer = new Function('input', automaton.toString({functionDef: true, strategy: 'switchChar'}))
intLexer = new Function('input', automaton.toString({functionDef: true, strategy: 'switchInt'}))
functionPointerLexer = new Function('input', automaton.toString({functionDef: true, strategy: 'functionPointer'}))
fastFunctionPointerLexer = new Function('input', automaton.toString({functionDef: true, strategy: 'fastFunctionPointer'}))
defaultLexer = new Function('input', automaton.toString({functionDef: true, strategy: 'default'}))

// add tests
suite
.add('finite-automata (switch char)', function() {
  // Make sure v8 can't cheat
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  charLexer(testString)
})
.add('finite-automata (switch int)', function() {
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  intLexer(testString)
})
.add('finite-automata (array[int][char])', function() {
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  arrayCharLexer(testString)
})
.add('finite-automata (array[function])', function() {
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  functionPointerLexer(testString)
})
.add('finite-automata (array[function] w/ micro-optimizations)', function() {
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  fastFunctionPointerLexer(testString)
})
.add('finite-automata (default)', function() {
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  defaultLexer(testString)
})
.add('native regex (repeated)', function () {
  // Make sure v8 can't cheat
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  for(var i=0, ii=keywords.length; i<ii; ++i) {
    var keywordRegex = new RegExp(keywords[i], 'g')
    testString.match(keywordRegex)
  }
})
.add('native regex (streamed)', function () {
  // Make sure v8 can't cheat
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  while ((v8regex.exec(testString)) !== null) {}
})
.add('native regex (accumulated)', function () {
  // Make sure v8 can't cheat
  var randWord = keywords[Math.floor(Math.random() * (max - min + 1)) + min]
  testString = randWord + jquery
  testString.match(v8regex)
})
/*
.add('jison-lex', function() {
  jisonLexer.setInput(jquery)
  logger(jisonLexer.lex())
})
*/
// add listeners
.on('cycle', function(event) {
  logger(String(event.target))
})
.on('complete', function() {
  logger('Fastest is ' + this.filter('fastest').pluck('name'))
})
// run async
.run({ 'async': false })
