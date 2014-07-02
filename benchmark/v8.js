/* jshint evil:true */

var fs = require('fs')
  , Fragment = require('../lib/fragment')
    // All javascript keywords as of ES6
  , keywords = require('./js-keywords.json')
  , automaton = new Fragment('')
  , jquery = fs.readFileSync(__dirname + '/jquery.js', 'utf8')
  , ourLexer

for(var i=0, ii=keywords.length; i<ii; ++i) {
  automaton.union(new Fragment(keywords[i]))
}

ourLexer = new Function('input', automaton.toString({functionDef: true}))

ourLexer(jquery)
