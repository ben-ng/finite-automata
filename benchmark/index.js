/* jshint evil:true */

var Benchmark = require('benchmark')
  , jisonlex = require('jison-lex')
  , fs = require('fs')
  , Fragment = require('../lib/fragment')
  , suite = new Benchmark.Suite
    // All javascript keywords as of ES6
  , keywords = require('./js-keywords.json')
  , jisonGrammar = {rules: []}
  , v8regex
  , automaton = new Fragment('')
  , jquery = fs.readFileSync(__dirname + '/jquery.js', 'utf8')
  , ourLexer
  , jisonLexer
  , logger

if(window) {
  logger = function () {
    var output = Array.prototype.slice.call(arguments)
      , pre = document.getElementById('output')

    for(var i=0, ii=output.length; i<ii; ++i) {
      pre.appendChild(document.createTextNode(output[i] + '\n'))
    }
  }
}
else {
  logger = console.log
}

for(var i=0, ii=keywords.length; i<ii; ++i) {
  jisonGrammar.rules.push([keywords[i], 'return \'' + keywords[i] + '\';'])
  automaton.union(new Fragment(keywords[i]))
}

v8regex = new RegExp('(' + keywords.join('|') + ')', 'g')

ourLexer = new Function('input', automaton.toString({functionDef: true}))

jisonLexer = new jisonlex(jisonGrammar)

// add tests
suite
.add('finite-automata', function() {
  ourLexer(jquery)
})
.add('native regex (streamed)', function () {
  while ((v8regex.exec(jquery)) !== null) {}
})
.add('native regex (accumulated)', function () {
  jquery.match(v8regex)
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
