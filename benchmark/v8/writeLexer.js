var fs = require('fs')
  , Fragment = require('../../lib/fragment')
    // All javascript keywords as of ES6
  , keywords = require('../js-keywords.json')
  , automaton = new Fragment('')

for(var i=0, ii=keywords.length; i<ii; ++i) {
  automaton.union(new Fragment(keywords[i]))
}

fs.writeFileSync(__dirname + '/_lexer.js'
  , automaton.toString() + ';module.exports=lexer;')
