var fs = require('fs')
  , jquery = fs.readFileSync(__dirname + '/../jquery.js', 'utf8')
  , ourLexer = require('./_lexer.js')
  , i = 0

for(i=0; i<1000; ++i) {
  ourLexer(jquery)
}
