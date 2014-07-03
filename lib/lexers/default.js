var hbs = require('handlebars')
  , fs = require('fs')
  , template = hbs.compile(fs.readFileSync(__dirname + '/default.hbs').toString())

function dfa2lexer (def) {
  var i = 0
    , ii = def.transitionTable.length
    , remapped = new Array(ii)
    , k = ''

  for(; i<ii; ++i) {
    remapped[i] = {
      characters: {}
    , isInitialState: i === def.initial
    }

    for(k in def.transitionTable[i]) {
      remapped[i].characters[k] = {
        charCode: k.charCodeAt(0)
      , targetState: def.transitionTable[i][k]
      , targetIsAccepted: def.accept.indexOf(def.transitionTable[i][k]) >= 0
      }
    }
  }

  return template({
    functionDef: def.functionDef
  , initialState: def.initial
  , initialStateIsAccepted: (def.accept.indexOf(def.initial) >= 0)
  , transitions: remapped
  })
}

module.exports = dfa2lexer
