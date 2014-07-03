var hbs = require('handlebars')
  , fs = require('fs')
  , template

hbs.registerPartial('fallbackPartial'
  , fs.readFileSync(__dirname + '/templates/fallback.hbs').toString())
hbs.registerPartial('manyTransitionsPartial'
  , fs.readFileSync(__dirname + '/templates/many.hbs').toString())
hbs.registerPartial('severalTransitionsPartial'
  , fs.readFileSync(__dirname + '/templates/several.hbs').toString())
hbs.registerPartial('oneTransitionPartial'
  , fs.readFileSync(__dirname + '/templates/one.hbs').toString())
hbs.registerPartial('noTransitionsPartial'
  , fs.readFileSync(__dirname + '/templates/none.hbs').toString())

template = hbs.compile(fs.readFileSync(__dirname + '/default.hbs').toString())

function dfa2lexer (def) {
  var i = 0
    , ii = def.transitionTable.length
    , remapped = new Array(ii)
    , k = ''
    , initialStateIsAccepted = (def.accept.indexOf(def.initial) >= 0)

  for(; i<ii; ++i) {
    var keys = Object.keys(def.transitionTable[i])

    remapped[i] = {
      isInitialState: i === def.initial
    , initialState: def.initial
    , initialStateIsAccepted: initialStateIsAccepted
    }

    if(keys.length > 1) {
      // TODO: Figure out what this magic number should really be!
      if(keys.length > 40) {
        remapped[i].manyTransitions = true
      }
      else {
        remapped[i].severalTransitions = true
      }

      remapped[i].characters = {}

      for(k in def.transitionTable[i]) {
        remapped[i].characters[k] = {
          charCode: k.charCodeAt(0)
        , chr: k.charAt(0)
        , targetState: def.transitionTable[i][k]
        , targetIsAccepted: def.accept.indexOf(def.transitionTable[i][k]) >= 0
        , initialState: def.initial
        , initialStateIsAccepted: initialStateIsAccepted
        }
      }
    }
    else if(keys.length === 1) {
      remapped[i].oneTransition = true
      remapped[i].charCode = keys[0].charCodeAt(0)
      remapped[i].targetState = def.transitionTable[i][keys[0]]
      remapped[i].targetIsAccepted = def.accept.indexOf(def.transitionTable[i][keys[0]]) >= 0
    }
    else {
      remapped[i].noTransitions = true
    }
  }

  return template({
    functionDef: def.functionDef
  , initialState: def.initial
  , initialStateIsAccepted: initialStateIsAccepted
  , transitions: remapped
  })
}

module.exports = dfa2lexer
