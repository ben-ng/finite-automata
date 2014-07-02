var fs = require('fs')
  , jquery = fs.readFileSync(__dirname + '/../jquery.js', 'utf8')
  , ourLexer = require('./_lexer.js')

ourLexer(jquery)
