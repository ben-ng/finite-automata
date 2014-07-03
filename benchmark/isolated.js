/* jshint evil:true */

var fs = require('fs')
  , microtime = require('microtime')
  , Fragment = require('../lib/fragment')
    // All javascript keywords as of ES6
  , keywords = require('./js-keywords.json')
  , v8regex
  , automaton = new Fragment('')
  , i = 0
  , ii = 0
  , jquery = fs.readFileSync(__dirname + '/jquery.js', 'utf8')
  , intLexer
  , logger
  , last
  , nativ
  , ours

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
intLexer = new Function('input', automaton.toString({functionDef: true, strategy: 'switchInt'}))

last = microtime.now()

jquery.match(v8regex)

nativ = microtime.now() - last

last = microtime.now()

intLexer(jquery)

ours = microtime.now() - last

console.log(nativ + ',' + ours)
